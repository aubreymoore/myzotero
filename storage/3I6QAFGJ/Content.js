//~ jQuery.namespace("preview");
var gAutosaveTimeoutDuration = 30000;
var gCommentPreviewElementClass = 'P-Preview-Comment';
var gActiveCommentTextClass  = 'Active-Comment-Text';
var gActiveChangeClass = 'P-Active-Change';
var gInstanceFieldNameSeparator  = '__';

var gAcceptedInsertChangeNodeName = 'accepted-insert';
var gAcceptedDeleteChangeNodeName = 'accepted-delete';
var gFakeInsertChangeNodeName = 'fake-insert';
var gFakeDeleteChangeNodeName = 'fake-delete';
var gDeleteChangeNodeName = 'delete';
var gInsertChangeNodeName = 'insert';
var gChangeUserIdsAttrName = 'data-userid';
var gChangeUserNamesAttrName = 'data-username';
var gChangeUserIdsSeparator = ', ';
var gVersionsAjaxSrv = '/lib/ajax_srv/version_srv.php';
var gPageIsUnloading = false;
var gPreviewHolderId = 'previewHolder';
var gAuthorRoleId = 2;
var gSERoleId = 12;
var gCERoleId = 18;
var gCurrentInlineCKEInstance = null;

PreviewApp.module("Content", function(Content, PreviewApp, Backbone, Marionette){
	/**
	 * This controller will handle tasks associated with citable elements
	 * (e.g. reorder citations, adding a new figure/table)
	 */
	Content.CitationsController = Marionette.Object.extend({
		initialize : function(options){
			this.globalChannel = Backbone.Radio.channel('global');
			this.loadingChannel = Backbone.Radio.channel('loading');
			this.contentChannel = Backbone.Radio.channel('content');
			this.actionsChannel = Backbone.Radio.channel('actions');
			this.documentId = this.globalChannel.request('document:id');
			this.citationWrapperNodeName = 'citation-elements';
			this.listenTo(this.actionsChannel, 'instance:updated', this._onInstanceUpdated.bind(this));
			this.listenTo(this.contentChannel, 'figures:reload', this.reloadFigures.bind(this));
			this.listenTo(this.contentChannel, 'tables:reload', this.reloadTables.bind(this));
			this.listenTo(this.contentChannel, 'figures:reorder', this.reorderFigures.bind(this));
			this.listenTo(this.contentChannel, 'tables:reorder', this.reorderTables.bind(this));
			
			var $figuresWrapper = GetPreviewContent().find('#previewHolder ' + this.citeCongifs.figures.wrapperSelector);			
			var figuresWrapperInstanceId = $figuresWrapper.attr('instance_id');
			this.citeCongifs.figures.wrapperInstanceId = figuresWrapperInstanceId; 
			
			
			var $tablesWrapper = GetPreviewContent().find('#previewHolder ' + this.citeCongifs.tables.wrapperSelector);
			var tablesWrapperInstanceId = $tablesWrapper.attr('instance_id');
			this.citeCongifs.tables.wrapperInstanceId = tablesWrapperInstanceId;
			
			if(figuresWrapperInstanceId || tablesWrapperInstanceId){
				this.listenTo(this.contentChannel, 'instance:preview:loaded', function(instanceId){
					if(instanceId == figuresWrapperInstanceId){
						this.reorderFigures();
					}
					if(instanceId == tablesWrapperInstanceId){
						this.reorderTables();
					}
				}.bind(this));
				this.listenTo(this.contentChannel, 'instance:preview:after:replace', function(instanceId){
					if(instanceId == figuresWrapperInstanceId){
						this._removePositionedCitableElements('figures');
					}
					if(instanceId == tablesWrapperInstanceId){
						this._removePositionedCitableElements('tables');
					}
				}.bind(this));
				
			}
		},
		
		citeCongifs : {
			figures : {
				//FIXME extract to constant
				citationType : 1,
				wrapperSelector : '.figures-wrapper',
				citeableElementSelector : 'div[figure_position]',
				citeableElementNumberAttribute : 'figure_position',
				citationNumberAttrbibute : 'fignumber',
				citationSelector : 'cite xref:not([ignore-citation])',
				citationWrapperSelector : 'cite',
				citationWrapperSelectorClass : 'P-Figure-Citation-Holder',
				wrapperInstanceId : false,
			},
			tables : {
				//FIXME extract to constant
				citationType : 2,
				wrapperSelector : '.tables-wrapper',
				citeableElementSelector : 'div[table_position]',
				citeableElementNumberAttribute : 'table_position',
				citationNumberAttrbibute : 'tblnumber',
				citationSelector : 'cite xref:not([ignore-citation])',
				citationWrapperSelector : 'cite',
				citationWrapperSelectorClass : 'P-Tables-Citation-Holder',
				wrapperInstanceId : false,
			},
			references: {
				//FIXME extract to constant
				citationType : 3,																	
				citationSelector : 'cite xref:not([ignore-citation])',
				citationWrapperSelector : 'cite',
				citationWrapperSelectorClass : 'P-References-Citation-Holder',
				wrapperInstanceId : false,
			}
		},
		reloadFigures : function(){
			this._reloadCitations('figures');
		},
		reloadTables : function(){
			this._reloadCitations('tables');
		},
		reorderFigures : function(){
			var citationType = 'figures';
			this._updateCitationPreviews(citationType).done(function(){
				this._reorderCitedElements(citationType);
			}.bind(this));			
		},
		reorderTables : function(){
			var citationType = 'tables';
			this._updateCitationPreviews(citationType).done(function(){
				this._reorderCitedElements(citationType);
			}.bind(this));			
		},
		/**
		 * Reloads all the citation and citable elements of the specified type
		 * and reorders them
		 * @param citationType
		 */
		_reloadCitations : function(citationType){
			var config = this.citeCongifs[citationType];
			if(!config.wrapperInstanceId){
				return;
			}
			this.contentChannel.trigger('instance:refresh', config.wrapperInstanceId);			
		},
		/**
		 * Updates the previews of all the citations. This is necessary for 2 reasons.
		 * One - the labels of the figures should be correct(i.e. when the citation says fig 1 it should be fig 1)
		 * Two - the number attributes must be correct because we pick the citated elements by them
		 * 		instead of ids (because the later could be difficult with plates and plate parts)
		 * @returns {Deferred} returns a deferred object, as the previews are loaded with ajax
		 */
		_updateCitationPreviews : function(citationType){
			var result = $.Deferred();
			var config = this.citeCongifs[citationType];
			this.loadingChannel.trigger('ui:block');
			$.ajax({
				url : gCitationsSrv,
				dataType : 'json',
				data :{
					action : 'get_document_citations_by_type',
					document_id : this.documentId,
					citation_type : config.citationType
				},
				success : function(ajaxRes){
					var citations = GetPreviewContent().find('#previewHolder ' + config.citationWrapperSelector + '[class="'+config.citationWrapperSelectorClass+'"]');
					var citationsData = ajaxRes.citations;
					if(!_.isUndefined(citationsData)){
						for(var i = 0; i < citations.length; ++i){
							var citation = citations[i];
							var $citation = $(citation);
							var citationId = $citation.attr('data-citation-id');
							var citationData = citationsData[citationId];
							if(_.isUndefined(citationData)){
								//The citation is not present any more - remove it
								$citation.remove();
							}else{
								$citation.html(citationData['preview']);
								updateInstanceCitationData(citationData['instance_id'], citationData['field_id'], config.citationType, citationId, citationData);
							}
						}
					}
					
					result.resolve();
				},
				error : function(){
					result.reject();
				},
			});
			result.always(function(){
				this.loadingChannel.trigger('ui:unblock');
			}.bind(this));
			return result.promise();
		},
		/**
		 * Updates the previews of all the citations of the citable instance
		 */
		_updateCitableInstanceCitations : function(instanceId){
			var result = $.Deferred();			
			this.loadingChannel.trigger('ui:block');
			$.ajax({
				url : gCitationsSrv,
				dataType : 'json',
				data :{
					action : 'get_document_citated_instance_citations',
					document_id : this.documentId,
					instance_id : instanceId
				},
				success : function(ajaxRes){										
					var citations = ajaxRes.citations;
					if(!_.isUndefined(citations)){
						for(var i = 0; i < citations.length; ++i){
							var citation = citations[i];
							var citationId = citation.citation_id;
							var citationType = citation.citation_type;
							var $citation = GetPreviewContent().find('cite[data-citation-id=' + citationId + ']');							
							$citation.html(citation['preview']);
							//Remove unnecessary attributes
							delete citation['citation_id'];
							delete citation['citation_type'];
							updateInstanceCitationData(citation['instance_id'], citation['field_id'], citationType, citationId, citation);
						}
					}
					
					result.resolve();
				},
				error : function(){
					result.reject();
				},
			});
			result.always(function(){
				this.loadingChannel.trigger('ui:unblock');
			}.bind(this));
			return result.promise();
		},
		/**
		 * Replace cached instance field citation with new generated one
		 */
		_addNewCitationToInstanceCitationsCache : function (instanceId, fieldId, newCitation) {
			var citationType = newCitation['citation_type'];
			var citationId = newCitation['data-citation-id'];
			var currentWindow = window;
			while (currentWindow !== currentWindow.parent) {
				currentWindow = currentWindow.parent;
			}
			if(currentWindow.gInstanceCitations && currentWindow.gInstanceCitations[instanceId]) {
				
				if(!currentWindow.gInstanceCitations[instanceId][fieldId]) {
					currentWindow.gInstanceCitations[instanceId][fieldId] = {};
				}
				if(!currentWindow.gInstanceCitations[instanceId][fieldId][citationType]) {
					currentWindow.gInstanceCitations[instanceId][fieldId][citationType] = {};
				}
				currentWindow.gInstanceCitations[instanceId][fieldId][citationType][citationId] = newCitation;
			}
		},
		/**
		 * Returns the node after which to place the citated element for the specified citation.
		 * Usually that is the paragraph in which the citation is located. If the citation is in 
		 * a citable element (i.e. citation in table or figure) the citable element is returned.
		 * 
		 * @param {DomNode} citation -  the citation node
		 * @returns {DomNode} - the node after which the cited element should be placed
		 */
		_getElementAfterWhichToPlaceCitedElement : function(citationNode){
			//First check if the citation is in a citable element, after that for ID Key parent
			//and if there are none such parents search for a block lvl parent
			var parentSelectors = ['*[figure_id],*[table_id]', 'table[identification_key_table]', 'p,ul,ol,table'];
			for(var i = 0; i < parentSelectors.length; ++i){
				var parent = $(citationNode).closest(parentSelectors[i]);
				if(parent.length){
					return parent[0];
				}
			}			
		},
		/**
		 * Moves the node citableElementNode after the reference node refNode
		 * The citable elements are placed in wrappers with name citation-elements which are removed after all moving
		 * is complete
		 * @param {DomNode} citableElementNode
		 * @param {DomNode} refNode
		 */
		_moveCitableElementAfterNode : function(citableElementNode, refNode){
			if(_.isUndefined(citableElementNode) || _.isNull(citableElementNode) || _.isUndefined(refNode) || _.isNull(refNode)){
				return;
			}
			var citationWrapper;
			if(refNode.nodeName.toLowerCase() == this.citationWrapperNodeName.toLowerCase()){
				citationWrapper = refNode;
			}else if(refNode.parentNode && refNode.parentNode.nodeName.toLowerCase() == this.citationWrapperNodeName.toLowerCase()){
				citationWrapper = refNode.parentNode;
			}else if(refNode.nextSibling && refNode.nextSibling.nodeName.toLowerCase() == this.citationWrapperNodeName.toLowerCase()){
				citationWrapper = refNode.nextSibling;
			}else{
				citationWrapper = refNode.ownerDocument.createElement(this.citationWrapperNodeName);
				if(_.isUndefined(refNode.parentNode) || _.isNull(refNode.parentNode)){
					return;
				}
				if(refNode.nextSibling){
					citationWrapper = refNode.parentNode.insertBefore(citationWrapper, refNode.nextSibling);
				}else{
					citationWrapper = refNode.parentNode.appendChild(citationWrapper);
				}
			}
			if(_.isUndefined(citationWrapper) || _.isNull(citationWrapper)){
				return;
			}
			$(citationWrapper).append($(citableElementNode));
		},
		/**
		 * Removes the citable wrapper nodes created in _moveCitableElementAfterNode
		 */
		_removeCitationWrappers : function(){
			var wrappers = GetPreviewContent().find('#previewHolder ' + this.citationWrapperNodeName);
			$(wrappers).replaceWith(function() {
			    return $( this ).contents();
			});
		},
		/**
		 * Removes all the citable elements whicha are not in the wrapper
		 */
		_removePositionedCitableElements: function(citationType){
			var config = this.citeCongifs[citationType];
			if(!config.wrapperInstanceId){
				return;
			}
			var $wrapperCiteableElements = GetPreviewContent().find('#previewHolder ' + config.wrapperSelector + ' ' + config.citeableElementSelector);					
			var $citeableElements = GetPreviewContent().find('#previewHolder ' + config.citeableElementSelector);
			//Remove all the citable elements which are not in the wrapper
			$citeableElements.not($wrapperCiteableElements).remove();
		},
		/**
		 * This function places the citeable elements at their proper places. It assumes
		 * that the citeable elements wrapper has just been refreshed (all the need citeable
		 * elements are in it) and deletes the other citeable elements of this type, if any
		 * (i.e. the wrapper refresh doesnt remove the previous citeable elements which
		 * have been positioned across the document) 
		 * @param citationType
		 */
		_reorderCitedElements : function(citationType){
			var config = this.citeCongifs[citationType];
			if(!config.wrapperInstanceId){
				return;
			}
			this._removePositionedCitableElements(citationType);
			
			
			var citations = GetPreviewContent().find('#previewHolder ' + config.citationSelector);
			if(!citations){
				return;
			}
			//The number of the last processed citation element
			//The elements are processed in increasing order only once
			var lastProcessedNumber = 0;
			this.loadingChannel.trigger('ui:block');
			for(var i = 0; i < citations.length; ++i){
				var citation = citations[i];
				var $citation = $(citation);
				var citationNum = $citation.attr(config.citationNumberAttrbibute); 
				citationNum = parseInt(citationNum, 10);
				if(!citationNum || lastProcessedNumber >= citationNum){
					continue;
				}
				var selector = '#previewHolder ' + config.citeableElementSelector;
				selector += '[' + config.citeableElementNumberAttribute + '="' + citationNum + '"]';
				var $citableElement = GetPreviewContent().find(selector); 
				if(!$citableElement.length){
					continue;
				}
				var nodeAfterWhichToPlaceElement = this._getElementAfterWhichToPlaceCitedElement(citation);
				if(_.isUndefined(nodeAfterWhichToPlaceElement) || _.isNull(nodeAfterWhichToPlaceElement)){
					continue;
				}	
				for(var j = lastProcessedNumber + 1; j < citationNum ; ++j){
					var selector = '#previewHolder ' + config.citeableElementSelector;
					var currentSelector = selector + '[' + config.citeableElementNumberAttribute + '="' + j + '"]';
					var $currentCitableElement = GetPreviewContent().find(currentSelector); 
					if(!$currentCitableElement.length){
						continue;
					}
					var previousSelector = selector + '[' + config.citeableElementNumberAttribute + '="' + lastProcessedNumber + '"]';
					var $prevCitableElement = GetPreviewContent().find(previousSelector);
					if(!$prevCitableElement.length){
						$prevCitableElement = $(nodeAfterWhichToPlaceElement);
					}
					this._moveCitableElementAfterNode($currentCitableElement[0], $prevCitableElement[0]);
					lastProcessedNumber = j;
				}
				this._moveCitableElementAfterNode($citableElement[0], nodeAfterWhichToPlaceElement);
				lastProcessedNumber = citationNum;
			}
			this._removeCitationWrappers();
			this.contentChannel.trigger('citations:reordered', citationType);
			this.loadingChannel.trigger('ui:unblock');
		},
		/**
		 * Call this method when deleting an instance which is a citation
		 * then generate deleted citation previews, replace them in preview, and cache
		 */
		_updateDeletedCitationPreviews: function (citationIds) {
			if(!citationIds) {
				return false;
			}
			var result = $.Deferred();
			this.loadingChannel.trigger('ui:block');
			var _this = this;
			$.ajax({
				url: gCitationsSrv,
				dataType: 'json',
				data: {
					action: 'get_deleted_citation_instance_previews',
					document_id: this.documentId,
					citation_ids: citationIds
				},
				success: function (ajaxRes) {
					var citationsData = ajaxRes.citations;
					if(!_.isUndefined(citationsData)) {
						$.each(citationsData, function (citationId, citationObj) {
							GetPreviewContent().find('#previewHolder cite[data-citation-id="' + citationId + '"]').each(function (i, node) {
								_this._addNewCitationToInstanceCitationsCache(citationObj['instance_id'], citationObj['field_id'], citationObj);
								$(node).html(citationObj['preview']);
							});
						});
					}
					result.resolve();
				},
				error: function () {
					result.reject();
				},
			});
			result.always(function () {
				this.loadingChannel.trigger('ui:unblock');
			}.bind(this));
			return result.promise();
		},
		_onInstanceUpdated: function(instanceId){
			var instanceModel = this._getInstanceActionsModel(instanceId);
			if(!instanceModel || instanceModel.getObjectId() != gReferenceObjectId){
				return;
			}
			//If a reference is updated - we have to update the citations of the ref
			this._updateCitableInstanceCitations(instanceId);
		},
		
		_getInstanceActionsModel : function(instanceId){
			return this.actionsChannel.request('instance:model:get', instanceId)
		},	
	});
	/**
	 * This controller will handle tasks associated with ice changes
	 * (e.g. set the user display names of each change, hide/show changes of a specified user, etc)
	 */
	Content.ChangesController = Marionette.Object.extend({
		initialize : function(options){
			this.globalChannel = Backbone.Radio.channel('global');
			this.contentChannel = Backbone.Radio.channel('content');			
			this.documentId = this.globalChannel.request('document:id');			
			this.loadUserNames();
			this._initControlEvents();
		},
		/**
		 * Loads the display of all the users that have changes/comments to the specified version
		 */
		loadUserNames : function(){
			this.userNamesAreLoaded = false;
			this.userNames = new PreviewApp.Model.VersionUserNames([], {
				documentId : this.documentId
			});
			this.userNames.fetch().done(function(){
				this.userNamesAreLoaded = true;
				this.contentChannel.trigger('user:names:loaded');
			}.bind(this));
		},
		_getPreviewIframeHolder : function(){
			return GetPreviewContent().find('#' + gPreviewHolderId);
		},
		/**
		 * Inits the events for the checkbox/radio buttons which control 
		 * 		whether to display changes or not
		 * 		whose user changes to display
		 */
		_initControlEvents : function(){
			var instance = this;
			$('input:radio[name=changes_display]').on('change', function(){
				if($(this).is(':checked') && $(this).val() == '1'){
					instance.showChanges();
				}else{
					instance.hideChanges();
				}
			});
			$('input[name="display_user_change"]').on('change', function(){
				if($(this).is(':checked')){
					instance.showUserChanges($(this).val());
				}else{
					instance.hideUserChanges($(this).val());
				}
			});
		},
		
		/**
		 * Shows all changes
		 */
		showChanges : function(){
			this._getPreviewIframeHolder().removeClass('hideChanges');			
		},
		/**
		 * Shows all changes based on the value of the radio button for showing changes
		 */
		hideChanges : function(){
			this._getPreviewIframeHolder().addClass('hideChanges');			
		},
		/**
		 * Shows all the changes of the specified user
		 */
		showUserChanges : function(userId){
			this._getPreviewIframeHolder().removeClass('hideChange' + userId);
		},
		/**
		 * Hides all the changes of the specified user
		 */
		hideUserChanges : function(userId){
			this._getPreviewIframeHolder().addClass('hideChange' + userId);
		},		
		
		/**
		 * Sets the user names for all the change nodes in the specified tracker
		 * @param CKEditor tracker
		 * @param LITE lite
		 */
		processTrackerChangenodes : function(tracker, lite){
			//If the user names are not loaded, load the change nodes after the names have been loaded
			if(!this.userNamesAreLoaded){
				this.contentChannel.on('user:names:loaded', function(){
					this.processTrackerChangenodes(tracker, lite);
				}.bind(this));
				return;
			}			
			var changes = [];
			if(tracker.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ){
				changes = tracker.element.find(gAcceptedInsertChangeNodeName + ',' + gAcceptedDeleteChangeNodeName + ',' + gFakeInsertChangeNodeName + ',' + gFakeDeleteChangeNodeName + ',' + gDeleteChangeNodeName + ',' + gInsertChangeNodeName).$;
			}else{
				changes = tracker.document.find(gAcceptedInsertChangeNodeName + ',' + gAcceptedDeleteChangeNodeName + ',' + gFakeInsertChangeNodeName + ',' + gFakeDeleteChangeNodeName + ',' + gDeleteChangeNodeName + ',' + gInsertChangeNodeName).$;
			} 
		    for(var i = 0; i < changes.length; ++i){
		    	var changeNode = changes[i];
//		    	var changeId = changeNode.getAttribute(lite.props.attributes.changeId);
		    	var changeId = changeNode.getAttribute(lite._tracker.attributes.changeId);
		    	var change = lite._tracker.getChange(changeId);
		    	this._setChangeUserNames(changeNode, change);
		    }			    
		},
		/**
		 * Gets the displayed name of the specified user. This may not be the real user name
		 * but "Reviewer 1" for example, if the user has chosen to hide their real name
		 */
		_getUserDisplayName : function(userId){
			if(!this.userNamesAreLoaded){
				return '';
			}
			var user = this.userNames.get(userId);
			if(_.isUndefined(user)){
				return '';
			}
			return user.getName();
		},
		/**
		 * Sets the title attribute of the changenode with the names of all the user
		 * who created this node and updates the change properties
		 * @param DomNode changeNode
		 * @param object change - this is the change object in the LITE object. We have to change it too
		 * 	because it is used is some cases
		 */
		_setChangeUserNames : function(changeNode, change){
			var changeUserIds = $(changeNode).attr(gChangeUserIdsAttrName);
			var changeUserNameAttr = $(changeNode).attr(gChangeUserNamesAttrName);
			if(changeUserIds == '') {
				return;
			}
			var changeUserIdArr = changeUserIds.split(gChangeUserIdsSeparator);
			var changeUserNames = '';
			var authorCnt = 0;
			for (var i = 0; i < changeUserIdArr.length; ++i) {
				var userId = parseInt(changeUserIdArr[i]);
				var authorName = this._getUserDisplayName(userId);
				if(authorName != '') {
					if(authorCnt > 0) {
						changeUserNames += gChangeUserIdsSeparator;
					}
					changeUserNames += authorName;
					authorCnt++;
				}
				$(changeNode).attr(gChangeUserNamesAttrName, (changeUserNames || changeUserNameAttr));

				if(change) {
					change.username = (changeUserNames || changeUserNameAttr);
					change.userid = changeUserIds;
				}
			}
			var changeIsInsert = false;
			if(changeNode.nodeName.toLowerCase() == gAcceptedInsertChangeNodeName || changeNode.nodeName.toLowerCase() == gInsertChangeNodeName) {
				changeIsInsert = true;
			}
			var title = (changeUserNames || changeUserNameAttr);
			if(changeIsInsert) {
				title += ' inserted this text.';
			} else {
				title += ' deleted this text.';
			}
			$(changeNode).attr('title', title);
		},
	});
	/**
	 * This controller will handle tasks associated with field nodes
	 * (e.g. create trackers for each field, communicate with the changes controller, 
	 * init the field nodes events, get the field clean content, etc)
	 */
	Content.EditorController = Marionette.Object.extend({
		initialize : function(options){
			this.globalChannel = Backbone.Radio.channel('global');
			this.contentChannel = Backbone.Radio.channel('content');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.documentId = this.globalChannel.request('document:id');
			this.documentModel = this.globalChannel.request('document:model');
			this.iframe = $('#' + gPreviewIframeId); 
			this.documentIsEditable = this.documentModel.getIsEditable();			
			this.versionRoleMode = this.documentModel.getRoleMode();
			this.userName = this.documentModel.getUserName();
			this.userId = this.documentModel.getUserId();	
			this.CKEWithChangesCount = 0;
			this.changesController = new Content.ChangesController();			
			this.contentChannel.on('change:accept', this.acceptChange.bind(this));
			this.contentChannel.on('change:reject', this.rejectChange.bind(this));
			this.contentChannel.on('instance:content:removed', this._checkIfChangesExist.bind(this));
			this.contentChannel.on('instance:content:changed', this._checkIfChangesExist.bind(this));
			this.contentChannel.on('instance:preview:loaded', this._checkIfChangesExist.bind(this));
			this.contentChannel.on('citations:reordered', this._onCitationsReordered.bind(this));
			this.contentChannel.on('lite:editor:init', this.onLiteEditorInit.bind(this));
			this.contentChannel.on('lite:editor:track:change', this.onLiteEditorTrackChange.bind(this));
			
			
		},
		getTrackChanges: function(){
			return this.documentModel.getTrackChanges();
		},
		/**
		 * Checks whether there are unprocessed changes in the document.
		 * Some instance fields should not be checked (e.g. when the advanced edit popup is opened
		 * and the data in the document preview is not updated, because it updates on popup close) 
		 * instanceFieldsToSkip -  an object in the format
		 * 	instanceId => array(fieldIds)
		 * 
		 * 
		 */
		documentHasUnprocessedChanges : function(instanceFieldsToSkip){			
			var contentEditableNodes = this._getAllContentEditableNodes();
			if(instanceFieldsToSkip){
				contentEditableNodes = contentEditableNodes.filter(function(idx, element){
					var elInstanceId = element.getAttribute('data-instance-id');
					var elFieldId = element.getAttribute('data-field-id');
					return !instanceFieldsToSkip[elInstanceId] ||
						instanceFieldsToSkip[elInstanceId].indexOf(elFieldId) == -1
					;
				});
			}
			return contentEditableNodes.find(gAcceptedInsertChangeNodeName + ',' + gAcceptedDeleteChangeNodeName + ',' + gFakeInsertChangeNodeName + ',' + gFakeDeleteChangeNodeName + ',' + gDeleteChangeNodeName + ',' + gInsertChangeNodeName).length > 0;
		},		
		/**
		 * Returns a cloned copy of the children nodes of the specified node, which is to be 
		 * used when saving the field value. If the node has a CKEditor associated, the contents
		 * of the editor are used, otherwise the direct children of the node are returned
		 * @param node - a node, part of a field node (may be the whole node, if the field does not have parts)
		 * @returns array of all the children
		 */
		_getNodeClonedChildren : function(node){
			var res;
			try{
				var editor = $(node).data('tracker');
				var data = editor.getData();
				var tmp = $('<div></div>');
				tmp.html(data);
				res = tmp[0].childNodes;
			}catch(e){
				res = node.cloneNode(true).childNodes;
			}
			if(_.isUndefined(res) || _.isNull(res)){
				return [];
			}
			//Convert the nodelist to array
			return Array.prototype.slice.call(res);
		},
		/**
		 * Gets the cleaned content(e.g. combining multiple field nodes, removing the cited elements and removing the comment nodes
		 * ) for the specified field which can be used directly for saving
		 * @param instanceId
		 * @param fieldId
		 */
		getFieldCleanContent : function(instanceId, fieldId){
			if(!instanceId || !fieldId){
				return;
			}
			var lFieldNodes = this._getFieldAllPartNodes(instanceId, fieldId);
			// console.log(lFieldNodes.html());
			if(!lFieldNodes.length){		
				return;
			}
			var nodeCopy = $('<div></div>')[0];
			for(var i = 0; i < lFieldNodes.length; ++i){
				var fieldPart = lFieldNodes[i];
				var children = this._getNodeClonedChildren(fieldPart);
				// console.log(fieldPart);
				while(children.length ){
					nodeCopy.appendChild(children.shift());
				}
			}
			// console.log(nodeCopy); 
			var lContent = this._cleanContent(nodeCopy);
			// console.log(lContent);
			return lContent;
		},
		/**
		 * The same logic as getFieldCleanContent
		 * @param instanceId
		 * @param fieldId
		 */
		getReadOnlyFieldCleanContent: function (instanceId, fieldId) {
			if(!instanceId || !fieldId) {
				return;
			}
			var lFieldNodes = this._getReadOnlyFieldAllPartNodes(instanceId, fieldId);
			if(!lFieldNodes.length) {
				return;
			}
			var nodeCopy = $('<div></div>')[0];
			for (var i = 0; i < lFieldNodes.length; ++i) {
				var fieldPart = lFieldNodes[i];
				var children = this._getNodeClonedChildren(fieldPart);
				while (children.length) {
					nodeCopy.appendChild(children.shift());
				}
			}

			var lContent = this._cleanContent(nodeCopy);
			return lContent;
		},
		/**
		 * Returns a list with all the node parts of a specified field.
		 * (e.g. if a field has citable elements in itself it is split into multiple parts) 
		 * @param instanceId
		 * @param fieldId
		 */
		_getReadOnlyFieldAllPartNodes : function(instanceId, fieldId){
			if(!instanceId || !fieldId) {
				return;
			}
			var fieldNodes = GetPreviewContent().find('#previewHolder *[instance_id="' + instanceId + '"] [field_id="' + fieldId + '"]');
			return fieldNodes;
		},
		/**
		 * Returns all the contenteditable nodes in the whole preview, which have a field
		 * If a contenteditable node does not have a field attribute it is considered non field
		 * node and it is ignorred(i.e. trackers are not created for it and content changes in it 
		 * are not saved)
		 * @returns
		 */
		_getAllContentEditableNodes : function(){
			return GetPreviewContent().find('#previewHolder *[contenteditable="true"][field_id]:lt(500000)');
		},
		/**
		 * Returns all the contenteditable nodes in the whole preview, which have a field
		 * If a contenteditable node does not have a field attribute it is considered non field
		 * node and it is ignorred(i.e. trackers are not created for it and content changes in it 
		 * are not saved)
		 * @returns
		 */
		_getNodeAllContentEditableChildrenNodes : function(node){
			return $(node).find('*[contenteditable="true"][field_id]');
		},
		/**
		 * Returns a list with all the node parts of a specified field.
		 * (e.g. if a field has citable elements in itself it is split into multiple parts) 
		 * @param instanceId
		 * @param fieldId
		 */
		_getFieldAllPartNodes : function(instanceId, fieldId){
			if(!instanceId || !fieldId){
				return;
			}
			var fieldNodes = GetPreviewContent().find('#previewHolder *[contenteditable="true"][field_id][data-instance-id="' + instanceId + '"][data-field-id="' + fieldId + '"]');			
			return fieldNodes;
		},
		//Looks for non closed brs and <br></br>. They are not handled correctly by CKEditor, so we have to make them self-closed
		_cleanBrRegExp : new RegExp("<br\\s*>(?!<\/br>)", "g"),
		_cleanImgRegExp : new RegExp("<img([^>]*)>", "g"),
		_cleanImgReplace : function(matchedStr, group1){
			if(group1[group1.length - 1] == '/'){
		    	return matchedStr;
		    }
			return matchedStr + '</img>';
		},
		/**
		 * Cleans the content for the specified node
		 * 
		 * First all the cited elements are removed, after that comments markers are removed
		 * and finally closing tags are inserted for img/br tags which have not been closed  
		 * @param contentNode
		 * @returns string
		 */
		_cleanContent : function(contentNode){
			var itemHolderBaseSelector = 'div';
			var figureHolderSelector = itemHolderBaseSelector + '.figure[figure_id]';
			var plateHolderSelector = itemHolderBaseSelector + '.figure[plate_id]';
			var tableHolderSelector = itemHolderBaseSelector + '.table[table_id]';
			// Remove all the cited figures/tables/plates
			$(contentNode).find(figureHolderSelector + ', ' +  plateHolderSelector + ', ' +  tableHolderSelector).remove();
			

//			$(contentNode).find('.' + gCommentPreviewElementClass).removeClass(gCommentPreviewElementClass);
			$(contentNode).find('*[class^="' + gCommentPreviewElementClass + '"]').removeAttr('class');
			$(contentNode).find('*[comment_id]').removeAttr('comment_id');
			$(contentNode).find('.' + gActiveCommentTextClass).removeClass(gActiveCommentTextClass);
			$(contentNode).find('.' + gActiveChangeClass).removeClass(gActiveChangeClass);
			
			//Remove all the spans which have neither class nor style
			$(contentNode).find('span').not('*[style][style!=""],*[class][class!=""]').each(function(i, node){
				$(node).replaceWith($(node).contents());
			});
			//Remove all the spans from rangy restore selection
			$(contentNode).find('span[class="rangySelectionBoundary"]').each(function(i, node){
				$(node).remove();
			});
			
				
			//Remove the contents of all the citation nodes
			var citationElements = ['fig-citation', 'tbls-citation', 'reference-citation', 'sup-files-citation', 'cite'];
			$(contentNode).find(citationElements.join(',')).html('');	

			//Remove the changes username attributes and title
//			var changesSelector = gAcceptedInsertChangeNodeName + ',' + gAcceptedDeleteChangeNodeName + ',' + gDeleteChangeNodeName + ',' + gInsertChangeNodeName;
//			$(contentNode).find(changesSelector).each(function(i, node){
//				$(node).attr('title', '');
//				$(node).attr(gChangeUserNamesAttrName, '');
//			});
			
			var result = $(contentNode).html();
			result = result.replace(this._cleanBrRegExp, '<br/>');	
			result = result.replace(this._cleanImgRegExp, this._cleanImgReplace);
			result = result.replace(/[\u200B-\u200D\uFEFF]/g, '');
			return result;
		},
		
		/**
		 * Inits the events for all field nodes
		 */
		initNodes : function(){
			this._getAllContentEditableNodes().each(function(pIdx, pNode){
				this.initFieldNodeEvents(pNode);
			}.bind(this));	
			if(this.getTrackChanges() || this.documentHasUnprocessedChanges()){
				this._initAllTrackersWithChanges();
			}
			this._checkIfChangesExist();
		},
		/**
		 * Inits the events for all the field children nodes of the specified node
		 * @param node
		 */
		initNodeEvents : function(node){
			this._getNodeAllContentEditableChildrenNodes(node).each(function(pIdx, pNode){
				this.initFieldNodeEvents(pNode);
			}.bind(this));	
		},
		/**
		 * Inits the trackers for all fields which have changes so that
		 * we can handle the cases the user chooses to perform acceptall/rejectall changes
		 */
		_initAllTrackersWithChanges : function(){
			this.CKEWithChangesCount =	this._getAllContentEditableNodes().filter(function(idx, node){
				return $(node).find(gAcceptedInsertChangeNodeName + ',' + gAcceptedDeleteChangeNodeName + ',' + gFakeInsertChangeNodeName + ',' + gFakeDeleteChangeNodeName + ',' + gDeleteChangeNodeName + ',' + gInsertChangeNodeName).length > 0;
			}).length;
			if(this.CKEWithChangesCount == 0) {
				this.commentChannel.trigger('init:comments');
			}
			this._getAllContentEditableNodes().filter(function(idx, node){
				return $(node).find(gAcceptedInsertChangeNodeName + ',' + gAcceptedDeleteChangeNodeName + ',' + gFakeInsertChangeNodeName + ',' + gFakeDeleteChangeNodeName + ',' + gDeleteChangeNodeName + ',' + gInsertChangeNodeName).length > 0;
			}).each(function(pIdx, pNode) {
				this._initNodeTracker(pNode, pIdx + 1);
			}.bind(this));
		},
		/**
		 * Init the specific events for the specified field node
		 * The events which are set are:
		 * 		on blur - save the instance field; hide the actions of the instance;
		 * 		on focus - init a ckeditor tracker if necessary; show the actions of the instance
		 * If the field contains citable elements(i.e. table/figure) it is split into different parts -
		 * a part before the citable element and a part after the element(this is done because ckeditor
		 * doesnt handle nested inline editables too well).
		 * @param node - a node of a instance field which is content editable
		 * @param forced - used for initing events and splitting nodes later after the events have been inited
		 * 		initialy (e.g. after figs/tables reordering node splitting may be necessary)
		 */
		initFieldNodeEvents : function(node, forced){
			var $node = $(node);
			if($node.data('eventsInited') && !forced){
				return;
			}
			$node.data('eventsInited', 1);
			var lFieldId = $node.attr('field_id');
			var lInstanceId = $node.closest('*[instance_id]').attr('instance_id');
			if(!this.documentIsEditable || !lFieldId || !lInstanceId){
				$node.removeAttr('contenteditable');
				return;
			}
					
			var partIdx = 1;
			//prev returns the immidiately preceding part(i.e. the last of all the previous parts)
			var prevPart = $node.prev('*[data-part-idx][data-is-field-node][data-field-id="' 
				+ lFieldId + '"][data-instance-id="' + lInstanceId + '"]');
			if(prevPart.length){
				partIdx = parseInt(prevPart.attr('data-part-idx'), 10) + 1;
			}
			var followingParts = $node.nextAll('*[data-part-idx][data-is-field-node][data-field-id="' + lFieldId + '"][data-instance-id="' + lInstanceId + '"]');
			$node.attr('data-instance-id', lInstanceId);
			$node.attr('data-field-id', lFieldId);
			$node.attr('data-part-idx', partIdx++);
			$node.attr('data-is-field-node', 1);
			
			
			var citedElementChildren = $node.children('*[figure_id],*[table_id]');
			if(citedElementChildren.length){
				var parent = node.parentNode;
				var nodeNextSibling = node.nextSibling;
				for(var i = 0; i < citedElementChildren.length; ++i){
					var curCitedElement = citedElementChildren[i];
					var nextCitedElement = citedElementChildren[i + 1];
					var nextSibling = curCitedElement.nextSibling;
					var holder = node.ownerDocument.createElement('div');
					
					
					while(nextSibling && nextSibling != nextCitedElement){
						var tmp = nextSibling;
						nextSibling = nextSibling.nextSibling;
						holder.appendChild(tmp);
					}
					if(nodeNextSibling){
						parent.insertBefore(curCitedElement, nodeNextSibling);
					}else{
						parent.appendChild(curCitedElement);
					}
					var holderContent = $(holder).html();
					if($.trim(holderContent) != ''){
						var attributesToCopy = ['field_id', 'instance_id', 'contenteditable', 'data-control-type', 'data-instance-id', 'data-field-id', 'commentable'];
						for(var j = 0; j < attributesToCopy.length; ++j){
							var attrName = attributesToCopy[j];
							if($node.attr(attrName)){
								$(holder).attr(attrName, $node.attr(attrName));
							}
							$(holder).attr('data-part-idx', partIdx++);
						}			
						if(nodeNextSibling){
							parent.insertBefore(holder, nodeNextSibling);
						}else{
							holder = parent.appendChild(holder);
						}
						this.initFieldNodeEvents(holder, forced);
					}
				}
			}
			//increment the part idx of all the following parts
			for(var i = 0; i < followingParts.length; ++i){
				var $followingPart = $(followingParts[i]);
				$followingPart.attr('data-part-idx', partIdx++);
			}
			if(!$node.data('eventsBound')){
				$node.data('eventsBound', 1);
				$node.bind('blur', function(pEvent) {
					this.contentChannel.trigger('node:blur', node);					
				}.bind(this));
				/**
				 * keyup event replaces focus event, 
				 * because of selection reposition in click/mouseup
				 * in focus event we can not get selection to restore
				 */
				$node.bind('keyup', function(pEvent) {
					this._initNodeTracker(node);
				}.bind(this));
				/**
				 * call init node tracker if not initialized
				 * save cursor position/selection
				 * and restore it after ckeditor instace is ready
				 */
				$node.bind('click', function(pEvent) {
					this._fixCursorInCitation(node);
					if(!$(node).data('tracker') && $.trim($(node).text())) {
						var selection = rangy.saveSelection($('#' + gPreviewIframeId)[0]);
						this._initNodeTracker(node);
						if($(node).data('tracker')) {
							$(node).data('tracker').on('instanceReady', function (evt) {
								rangy.restoreSelection(selection, true);
							});
						} else {
							$node.find('span[class="rangySelectionBoundary"]').each(function (i, node) {
								$(node).remove();
							});
						}
					}					
				}.bind(this));
				$node.bind('focus', function(pEvent) {
//					this._initNodeTracker(node);
					this.contentChannel.trigger('node:focus', node, pEvent);
				}.bind(this));
				$node.bind('mousedown', function(pEvent) {
					this.contentChannel.trigger('node:click', node, pEvent);
				}.bind(this));
			}
			
		},
		/**
		 * Move cursor to the end of the citation in track changes mode
		 */
		_fixCursorInCitation: function (node) {
			var $node = $(node);
			var tracker = $node.data('tracker');
			if(!tracker) {
				return;
			}
			var selected = tracker.getSelection().getStartElement().getName();
			if(selected == 'xref') {
				var sel = tracker.getSelection(),
					element = sel.getStartElement(),
					range = tracker.getSelection().getRanges()[0];
//				console.log(range.getNextEditableNode().getText());
//				range.moveToPosition(element, CKEDITOR.POSITION_BEFORE_START);
				range.moveToPosition(element, CKEDITOR.POSITION_AFTER_END);
				sel.selectRanges([range]);
//				console.log(range.getNextEditableNode().getText());
			}
		},
		/**
		 * Creates an editor tracker for the specified node.
		 * The tracker is created only one type and if it has already 
		 * been created for the specified node no additional actions are performed. 
		 * @param node
		 */
		_initNodeTracker : function(node, idx) {
			var $node = $(node);
			var instanceId = $node.attr('data-instance-id');
			var fieldId = $node.attr('data-field-id');
			if(!instanceId || !fieldId){
				return;
			}
			var tracker = $node.data('tracker');
			if(tracker){				
				return;
			}
			var toolbarType = this._getCKEditorToolbarType($node.attr('data-control-type'));			
			var tracker = this._createIceCKEditor(node, toolbarType, idx);;
			
			$node.data('tracker', tracker);	
			tmpTracker = tracker;
		},
		/**
		 * Returns the toolbarName which is used for editors of the specified controlType
		 * @param controlType
		 * @returns {String}
		 */
		_getCKEditorToolbarType : function (controlType){	
			switch(parseInt(controlType, 10)){
				default:
					return '';
				case 3:		
				case 33:
				case 34:
				case 35:
				case 36:
					return 'FullToolbar';			
				case 5:
				case 60:
					return 'SmallToolbar';
				case 37:
					return 'ModerateToolbar';
				case 43:
					return 'ReferenceCitationToolbar';
				case 61:
					return 'FigureCitationToolbar';
				case 62:
					return 'FileCitationToolbar';
				case 53:
					return 'ModerateTableToolbar';
				case 54:
					return 'floatingtools_Material';
				case 55:
					return 'floatingtools_Reference';
				case 56:
				case 64:
					return 'floatingtools_SectionTitle';
				case 57:
					return 'floatingtools_PlateDescription';
			}
		},
		/**
		 * Gets the ckeditor instance which will create the editor trackers.
		 * We use the CKEditor of the iframe, because ckeditor doesn't handle well
		 * inline nodes in an iframe
		 * @returns
		 */
		_getCKEditorInstance : function(){
			if(!this.iter){
				this.iter = 0;
			}
			this.iter++;
//			if(this.iter%2){
//				return CKEDITOR;
//			}
			return $('#previewIframe')[0].contentWindow.CKEDITOR;
		},
		/**
		 * Creates a regular (i.e. non-ice) editor for the specified field
		 * This editor is used when changes are not tracked and the document does not have
		 * unprocessed changes 
		 * @param node - the node for which we are creating the editor
		 * @param toolbarType - the toolbar type used for the editor creation 
		 * 		(i.e. in the ckeditor config.js there has to be a toolbar definition
		 * 		with the name toolbar_{toolbarType} 
		 * @returns
		 */
		_createRegularCKEditor : function(node, toolbarType){
			if(toolbarType == ''){
				return;
			}
			var citablePluginsNames = this._getCKEditorCitatablePlugins(toolbarType);
			this._getCKEditorInstance().timestamp = this.documentModel.getEditorConfigDate();
			var editor = this._getCKEditorInstance().inline( node, {	    
			    extraPlugins : 'lite,undo,justify,removeformat,widget,lineutils,paste_custom,sharedspace,toolbar,tableresize,tableselection,autogrow,floatingspace,clipboard,citecontextmenu' + citablePluginsNames,
			    allowedContent : true,
				toolbar: toolbarType,
				lite: {
					isTracking: this.getTrackChanges(),
					tooltips: {
						show: false,
						events: true,
					}
				}
			});

			editor.on('focus', function (evt) {
				InitReferenceCitationPreviews(2, $(node));
				gCurrentInlineCKEInstanceName = editor.name;
			}.bind(this));
			return editor;
		},
		
		onLiteEditorInit: function(editor){
			var lite = this._getTrackerLite(editor);
		    lite._tracker.mode = this.versionRoleMode == gAuthorRoleId ? gAuthorRoleViewMode : gSERoleViewMode;
		    lite.setUserInfo({ name: this.userName, id: this.userId});		    
		    lite.toggleTracking(this.getTrackChanges(), false);
		    
		    this.changesController.processTrackerChangenodes(editor, lite);
		},
		
		onLiteEditorTrackChange: function(editor){			
			var lite = this._getTrackerLite(editor);
			this.documentModel.modifyTrackChanges(lite._isTracking);
			this.contentChannel.trigger('change:tracking:changed', this.getTrackChanges(), editor);
		},
		
//		onEditorFocus: function(editor){
//			var lite = this._getTrackerLite(editor);
//			lite.toggleTracking(this.trackChanges, false);
//		},
		/**
		 * Creates an ice editor (CKEditor with track changes plugin) for the specified field
		 * This editor is used when changes are tracked or the document has any unprocessed changes 
		 * @param node - the node for which we are creating the editor
		 * @param toolbarType - the toolbar type used for the editor creation 
		 * 		(i.e. in the ckeditor config.js there has to be a toolbar definition
		 * 		with the name toolbar_{toolbarType} 
		 * @returns
		 */
		_createIceCKEditor : function(node, toolbarType, idx){
			var $node = $(node);
			var instanceId = $node.attr('data-instance-id');
			var fieldId = $node.attr('data-field-id');
			var emptyChangeNodes = $node.find(gAcceptedInsertChangeNodeName + ':empty,' + gAcceptedDeleteChangeNodeName + ':empty,' + gFakeInsertChangeNodeName + ':empty,' + gFakeDeleteChangeNodeName + ':empty,' + gDeleteChangeNodeName + ':empty,' + gInsertChangeNodeName + ':empty');
		    var emptyChangeExists = emptyChangeNodes.length;
		    if(emptyChangeNodes.length){	    	
				emptyChangeNodes.remove();	
			}	
		    var extraPlugins = 'undo,floatingspace,clipboard,paste_custom,lite,toolbar,tableresize,tableselection';
		    var toolbarName = 'TrackChanges';
		    if(this.versionRoleMode == gAuthorRoleId){
		    	var citablePluginsNames = this._getCKEditorCitatablePlugins(toolbarType);
		    	extraPlugins = 'lite,undo,justify,removeformat,widget,lineutils,paste_custom,sharedspace,toolbar,tableresize,tableselection,autogrow,floatingspace,clipboard' + citablePluginsNames,
		    	toolbarName = toolbarType;
		    }
			var editor = this._getCKEditorInstance().inline( node, {	 
				extraPlugins : extraPlugins,		
			    allowedContent : true,
				toolbar: toolbarName,
				lite: {
					isTracking: this.getTrackChanges(),
					tooltips: {
						show: false,
						events: true,
					}
				}				
			});
			
			/**
			 * Check if editors with changes are loaded -> then init comments load
			 */
			editor.on('instanceReady', function (evt) {
				if(this.CKEWithChangesCount == idx) {
					this.commentChannel.trigger('init:comments');
				}
			}.bind(this));
			editor.on('focus', function (evt) {
				InitReferenceCitationPreviews(2, $(node));
				gCurrentInlineCKEInstanceName = editor.name;				
				if(editor._tracker){
					var lite = this._getTrackerLite(editor);
					lite.toggleTracking(this.getTrackChanges(), false);
				}
			}.bind(this));
			
			editor.on(LITE.Events.ACCEPT, function(event) {
				this.contentChannel.request('field:save', instanceId, fieldId);
			}.bind(this));
			editor.on(LITE.Events.REJECT, function(event) {
				this.contentChannel.request('field:save', instanceId, fieldId);
			}.bind(this));
			editor.on(LITE.Events.TRACKING, this.onLiteEditorTrackChange.bind(this, editor));
			editor.on(LITE.Events.CHANGE, this._checkIfChangesExist.bind(this));
			editor.on(LITE.Events.INIT, function(event) {				
				if(emptyChangeExists){
					this.contentChannel.request('field:save', instanceId, fieldId);
				}
				this.onLiteEditorInit(editor);
			}.bind(this));
			
			return editor;
		},
		/**
		 * Checks which plugins need to be used for an editor with the passed toolbarType.
		 * This is an optimization because the citable plugins may be slow for a large number
		 * of field nodes and some editortypes dont need all the citable plugins
		 * @param toolbarType
		 * @returns {String}
		 */
		_getCKEditorCitatablePlugins : function(toolbarType){
			var result = '';	
			switch(toolbarType){
				case 'ModerateTableToolbar':  
					result += ',figs,refs,sup_files,endnotes';
					break;
				case 'floatingtools_PlateDescription':  
					result += ',tbls,refs,sup_files,endnotes';
					break;
				case 'FullToolbar':
					result += ',figs,tbls,refs,sup_files,endnotes,mathjax';
					break;
				case 'ReferenceCitationToolbar':
					result += ',refs';
					break;			
				case 'FigureCitationToolbar':
					result += ',figs';
					break;			
				case 'FileCitationToolbar':
					result += ',sup_files';
					break;			
			}
			return result;
		},
		/**
		 * Returns all the trackers which contain changes
		 */
		_getAllTrackerWithChanges : function(){
			var result = []; 
			this._getAllContentEditableNodes().filter(function(idx, node){
				return $(node).find(gAcceptedInsertChangeNodeName + ',' + gAcceptedDeleteChangeNodeName + ',' + gFakeInsertChangeNodeName + ',' + gFakeDeleteChangeNodeName + ',' + gDeleteChangeNodeName + ',' + gInsertChangeNodeName).length > 0;
			}).each(function(idx, node) {
				var tracker = $(node).data('tracker');
				if(tracker){
					result.push(tracker);
				}
			});
			return result;
		},
		/**
		 * Executed after the citations have been reordered. 
		 * Some field part nodes may need to be splitted to parts
		 */
		_onCitationsReordered : function(){
			var fieldsThatNeedToBeSplit = GetPreviewContent().find('*[data-part-idx]:has(*[figure_id],*[table_id])');
			for(var i = 0; i < fieldsThatNeedToBeSplit.length; ++i){
				this.initFieldNodeEvents(fieldsThatNeedToBeSplit[i], 1);
			}
			this.contentChannel.trigger('citations:reorder:init:finished');
		},
		/**
		 * Accepts all changes in all the editors
		 */
		acceptAllChanges : function(){
			var trackers = this._getAllTrackerWithChanges();
			for( var i = 0; i < trackers.length; ++i){
				this._singleTrackerAcceptAllChanges(trackers[i]);
			}
		},
		/**
		 * Rejects all changes in all the editors
		 */
		rejectAllChanges : function(){
			var trackers = this._getAllTrackerWithChanges();
			for( var i = 0; i < trackers.length; ++i){
				this._singleTrackerRejectAllChanges(trackers[i]);
			}
		},
		/**
		 * Accepts all changes in the specified tracker
		 * @param CKEditor tracker
		 */
		_singleTrackerAcceptAllChanges : function(tracker){
			var lite = this._getTrackerLite(tracker);
			lite.acceptAll();
		},
		/**
		 * Rejects all changes in the specified tracker
		 * @param CKEditor tracker
		 */
		_singleTrackerRejectAllChanges : function(tracker){
			var lite = this._getTrackerLite(tracker);
			lite.rejectAll();
		},
		/**
		 * Returns the LITE object for the specified tracker
		 * For info on the LITE object check the track changes ckeditor plugin's documentation
		 * @param CKEditor tracker
		 */
		_getTrackerLite : function(tracker){
			return tracker.plugins.lite.findPlugin(tracker);
		},
		/**
		 * Accepts the specified change node
		 * (i.e. if the change is insert the changenode is replaced with its contents,
		 * if it is a delete node - the node is removed)
		 * @param DomNode changeNode
		 */
		acceptChange : function(changeNode){
			this._acceptRejectChange(changeNode, true);
		},
		/**
		 * Rejects the specified change node
		 * (i.e. if the change is insert the changenode is deleted,
		 * if it is a delete node - the node is replaced with its contents)
		 * @param DomNode changeNode
		 */
		rejectChange : function(changeNode){
			this._acceptRejectChange(changeNode, false);
		},
		/**
		 * Accepts or rejects the specified change node
		 * 
		 * @param DomNode changeNode - the node which is to be accepted/rejected
		 * @param boolean accept - whether to accept or to reject the change
		 */
		_acceptRejectChange : function(changeNode, accept){
			var trackerNode = $(changeNode).closest('*[field_id]');			
			if(!trackerNode.length){
				return;
			}
			var tracker = trackerNode.data('tracker');
			var instanceId = trackerNode.attr('data-instance-id');
			var fieldId = trackerNode.attr('data-field-id');
			if(!tracker || !instanceId || !fieldId){
				return;
			}
			
			var lite = this._getTrackerLite(tracker);
			if(accept){
				lite.acceptChange(changeNode);
			}else{
				lite.rejectChange(changeNode);
			}	
			this._checkIfChangesExist();
		},
		/**
		 * This function checks if there are any changes and hides/shows the changes menu
		 * (i.e. the menu for reject/accept change) respectively
		 */
		_checkIfChangesExist : function(){
			/**
			 * Hide Accept and legend info sections in changes menu
			 */
			if(this.documentModel.getRoleMode() == gCERoleId) {
				$('#' + gLegendChangeBtnId).hide();
				$('#' + gAcceptChangeBtnId).hide();
			}
			var changesMenu = $('#docEditHeader');
			if(!changesMenu.length){
				return;
			}
			if(this.documentHasUnprocessedChanges()){
				changesMenu.show();
				$("#previewIframe").load(function(){
					var lArticlePreviewHolder = $(this).contents().find('#P-Article-Preview-Content');
					var lHeight = changesMenu.height() + 57;
					lArticlePreviewHolder.attr('style', 'padding-top: ' + lHeight + 'px !important');
				});
				this.iframe.addClass('previewIframeWithUnprocessedChanges');
			}else{
				changesMenu.hide();
				this.iframe.removeClass('previewIframeWithUnprocessedChanges');
			}
		}
	});
	
	/**
	 * A manager which will handle all tasks associated with content manipulation 
	 * in the preview iframe
	 */
	Content.Controller = Marionette.Object.extend({
		initialize : function(options){		
			this.globalChannel = Backbone.Radio.channel('global');
			this.actionsChannel = Backbone.Radio.channel('actions');
			this.contentChannel = Backbone.Radio.channel('content');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.loadingChannel = Backbone.Radio.channel('loading');
			this.popupChannel = Backbone.Radio.channel('popup');
			
			this.documentId = this.globalChannel.request('document:id');
			this.documentModel = this.globalChannel.request('document:model');	
			
			this.showJournalSubsectionsPopup = this.documentModel.getShowJournalSubsections();
			this.documentIsEditable = this.documentModel.getIsEditable();
			this.iframe = $('#' + gPreviewIframeId); 
			this.previewIsLoaded = false;
			this.controllers = {};

			this.trackChanges = (this.documentModel.getRoleMode() == gSERoleId || this.documentModel.getRoleMode() == gCERoleId);
			this.editorController = new Content.EditorController({
				trackChanges : this.trackChanges
			});
			this.validationController = new PreviewApp.Validation.Controller();
			this.importController = new PreviewApp.Import.Controller();
			this.globalChannel.on('preview:ready', this._onPreviewIframeReady.bind(this));
			this.globalChannel.on('preview:loaded', this._onPreviewIframeLoaded.bind(this));
			this.globalChannel.reply('document:has:unprocessed:changes', this.documentHasUnprocessedChanges.bind(this));
			this.globalChannel.reply('show:predefined:sections', this.getShowJournalSubsectionsPopup.bind(this));
			this.globalChannel.on('disable:predefined:sections', this.disableShowJournalSubsectionsPopup.bind(this));
			
			//FIXME Extract to constant
			this.actionsPos = 2;						
			this.fieldModels = new PreviewApp.Model.InstanceFields([]);		
			this.fieldsBeingSaved = new PreviewApp.Model.InstanceFields([]);
			this._addUnloadListener();
			gDocumentId = this.documentId;
			AutoSendDocumentLockSignal();
		},
		getTrackChanges: function(){
			return this.documentModel.getTrackChanges();
		},
		getShowJournalSubsectionsPopup: function() {
			return this.showJournalSubsectionsPopup;
		},
		disableShowJournalSubsectionsPopup: function() {
			this.showJournalSubsectionsPopup = false;
		},
		/**
		 * Adds a listener which checks if there are fields that are being saved
		 * before unloading(e.g. closing) the page and warns the user that some 
		 * changes might be lost
		 */
		_addUnloadListener : function(){
			window.onbeforeunload = function (e) {				  
				  if(this.fieldsBeingSaved.length){
					  return 'Are you sure you want to leave this page, some fields are currently being saved and you may lose data?';
				  }
				  gPageIsUnloading = true;
				  unlock_document();
//				  return null;                                //Webkit, Safari, Chrome etc.
			}.bind(this);
		},
		/**
		 * After the iframe content has been loaded we start listening for all 
		 * the content events(e.g. instance update/delete, field blur/focus, etc).
		 * and init all the field nodes events
		 */
		_onPreviewIframeReady : function(){
			this.previewIsLoaded = true;
			this.actionsChannel.on('instance:updated', this._onInstanceUpdated.bind(this));			
			this.actionsChannel.on('instance:deleted', this._onInstanceDeleted.bind(this));
			this.actionsChannel.on('root:instances:swapped', this._onInstancesSwapped.bind(this));
			
			this.contentChannel.on('instance:refresh', this._onInstanceUpdated.bind(this));
			this.contentChannel.on('node:blur', this._onNodeBlur.bind(this));
			this.contentChannel.on('node:focus', this._onNodeFocus.bind(this));

			this.contentChannel.reply('field:save', this.saveInstanceField.bind(this));
			this.contentChannel.on('instance:content:removed', this._onPreviewChanged.bind(this));
			this.contentChannel.on('instance:preview:loaded', this._onPreviewChanged.bind(this));
			this.contentChannel.on('instance:navigate', this._onInstanceNavigate.bind(this));
			this.editorController.initNodes();
			if(!this.getTrackChanges() && !this.documentHasUnprocessedChanges()){
				this.commentChannel.trigger('init:comments');
			}
						
			this.citationsController = new Content.CitationsController();
			//fix changes toobar width
			this._onPreviewResize();
			$(window).resize(function () {
				this._onPreviewResize();
			}.bind(this));
		},
		_onPreviewResize : function () {
			var lToolbarSpacer = GetPreviewContent().find("#editorToolbarSpacer");
			$("#docEditHeader").width(lToolbarSpacer.width());
		},
		_onPreviewIframeLoaded : function(){
			
			if(!this.documentIsEditable) {
				this.contentChannel.on('instance:navigate', this._onInstanceNavigate.bind(this));
				this.commentChannel.trigger('init:comments');
			} else {
				/**
				 * Create empty CKEditor instance to show a disabled toolbar
				 */
				GetPreviewContent().find('#emptyCKEEditor').each(function (pIdx, pNode) {
					var editor = this.editorController._createRegularCKEditor(pNode, 'FullToolbar');
					editor.on('instanceReady', function (evt) {
						GetPreviewContent().find('#cke_emptyCKEEditor').show();
						var el = GetPreviewContent().find("#editorToolbarSpacer");
						if(el) {
							el.css({
								top: $(window).scrollTop()
							});
						}
						editor.setReadOnly(true);
					}.bind(this));
				}.bind(this));
			}
			this.contentChannel.reply('field:save:readonly', this.saveReadOnlyInstanceField.bind(this));
			if(this.showJournalSubsectionsPopup == 1) {
				this.popupChannel.trigger('subsections:popup:open', {
					action : 'show_subsections_popup',
					document_id : this.documentId
				});
			}
			var previewContents = $('#' + gPreviewIframeId).contents();
			previewContents.find("body").key('ctrl+alt+m', function () {
				this.commentChannel.trigger('add:hotkey:comment');
			}.bind(this));
			var lLinks = previewContents.contents().find('a[href][data-d4science]');
			lLinks.each(function (pIdx, pLink) {
				$(pLink).bind('click', function(e) {
					parent.CommonPopUpAction("show_d4science_model_popup", "url=" + $(pLink).attr('href'), 1);
					e.preventDefault();
					e.stopPropagation();
				});
			});
		},
		/**
		 * When the preview has changed we need to resize the iframe
		 */
		_onPreviewChanged : function(){
			resizePreviewIframe(gPreviewIframeId);
		},
		
		/**
		 * Returns whether there are unprocessed changes or not
		 * @returns
		 */
		documentHasUnprocessedChanges : function(instanceFieldsToSkip){
			if(!this.previewIsLoaded){
				return false;				
			}		
			return this.editorController.documentHasUnprocessedChanges(instanceFieldsToSkip);
		},
		/**
		 * Returns the div wrapper containing the content of the specified instance
		 * When we refresh/delete the instance we replace this node 
		 * @param instanceId
		 */
		_getInstanceWrapper : function(instanceId){
			return GetPreviewContent().find('#previewHolder *[instance_id="' + instanceId + '"]')[0];			
		},
		/**
		 * Moves the cited elements(figs/tables) which are in the specified node
		 * after the node. This is needed when an instance preview is refreshed
		 * or an instance is deleted so that the instance wrapper can be safely refreshed/deleted
		 * without losing cited elements.
		 */
		_moveCitedElementFromElement : function(node){
			var $node = $(node);
			var citedElements = $node.find('*[figure_id],*[table_id]');
			var followingSibling = node.nextSibling;
			for(var i = citedElements.length - 1; i >= 0; --i){
				if(followingSibling){
					node.parentNode.insertBefore(citedElements[i], followingSibling);
				}else{
					node.parentNode.appendChild(citedElements[i]);
				}				
			}
		},
		_getInstanceActionsModel : function(instanceId){
			return this.actionsChannel.request('instance:model:get', instanceId)
		},	
		/**
		 * Refreshes the preview of both instances
		 * (N.B. the instances here will be root instances, because otherwise
		 * we mark the parent as updated instead) 
		 * @param instanceId
		 * @param swapInstanceId
		 */
		_onInstancesSwapped : function(instanceId, swapInstanceId){
			var model = this._getInstanceActionsModel(instanceId, true);
			model.setUpdateTime();	
			var swapModel = this._getInstanceActionsModel(swapInstanceId, true);
			swapModel.setUpdateTime();	
			var wrapper = this._getInstanceWrapper(instanceId);
			var swapWrapper = this._getInstanceWrapper(swapInstanceId);
			if(_.isUndefined(wrapper) || wrapper == null || _.isUndefined(swapWrapper) || swapWrapper == null){				
				return;
			}
			
			var parent1, next1,
		        parent2, next2;

		    parent1 = wrapper.parentNode;
		    next1   = wrapper.nextSibling;
		    parent2 = swapWrapper.parentNode;
		    next2   = swapWrapper.nextSibling;

		    parent1.insertBefore(swapWrapper, next1);
		    parent2.insertBefore(wrapper, next2);			    
		},
		/**
		 * Refreshes the preview of the specified instance after it has been modified
		 * (e.g. via popup update). If the wrapper of the instance is not found 
		 * the closest ancestor whose wrapper is found is updated
		 * @param instanceId
		 */
		_onInstanceUpdated : function(instanceId){
			if(!instanceId){
				return;
			}
			//On update of tables and figs wrapper if not forced - do 
			
			var wrapper = this._getInstanceWrapper(instanceId);
			//Loop through ancestors and refresh the first found
			var model = this._getInstanceActionsModel(instanceId);		
			var cb = function(dontSetLoadTime){				
				if(!dontSetLoadTime){
					model.setLoadTime();
				}
				var id = instanceId;
				var ancestorIds = model.getAncestorIds();
				var i = 0;
				if(_.isUndefined(wrapper) || wrapper == null){
					if(ancestorIds.length){
						var parentWrapper = this._getInstanceWrapper(ancestorIds[0]);
						if(parentWrapper){
							var newHolder = $(parentWrapper).find('.new-elements-holder[data-object-id="' + model.getObjectId() + '"]');
							if(newHolder.length){
								wrapper = $('<div instance_id="' + instanceId + '">');
								newHolder.append(wrapper);
							}							
						}						  
					}else{
						var newHolder = GetPreviewContent().find('.new-elements-holder[data-object-id="' + model.getObjectId() + '"]');
						if(newHolder.length){
							wrapper = $('<div instance_id="' + instanceId + '">');
							newHolder.append(wrapper);
						}
					}
					//If the instance has been added look for a new objects holder in the parent 
				}
				while((_.isUndefined(wrapper) || wrapper == null) && i < ancestorIds.length){
					id = ancestorIds[i];
					i++;
					wrapper = this._getInstanceWrapper(id);
				}
				if(_.isUndefined(wrapper) || wrapper == null){
					this.loadingChannel.trigger('ui:unblock');
					return;
				}
				var $wrapper = $(wrapper);
				this._moveCitedElementFromElement(wrapper);
				var instancePreviewModel = new PreviewApp.Model.InstancePreview({
					id : id
				});
				instancePreviewModel.fetch().done(function(){
					var newContent = $(instancePreviewModel.getPreview());
					for(var i = 0; i < newContent.length; ++i){
						this.editorController.initNodeEvents(newContent[i]);
					}
										
					$wrapper.replaceWith(newContent);
					this.contentChannel.trigger('instance:preview:after:replace', id);

					this.commentChannel.trigger('get:comments:by:instance', newContent);
					this.commentChannel.trigger('init:aftersave:events', newContent);
					this.contentChannel.trigger('instance:preview:loaded', id);
					InitReferenceCitationPreviews(2);
					
				}.bind(this)).always(function(){
					this.loadingChannel.trigger('ui:unblock');					
				}.bind(this));
			};
			this.loadingChannel.trigger('ui:block');
			if(model.loadTime != false){
				cb.call(this, 1);
			}else{				
				model.fetch().done(cb.bind(this));
			}
		},
		/**
		 * Removes the instance preview from the preview page after the 
		 * instance has been deleted(e.g. via delete action). If the wrapper of the instance
		 * is not found the closest ancestor whose wrapper is found is updated
		 * @param instanceId
		 */
		_onInstanceDeleted : function(instanceId, citationIds){
			this.citationsController._updateDeletedCitationPreviews(citationIds);
			var wrapper = this._getInstanceWrapper(instanceId);
			if(!_.isUndefined(wrapper) && wrapper != null){
				this._moveCitedElementFromElement(wrapper);
				$(wrapper).remove();
				this.contentChannel.trigger('instance:content:removed', instanceId);
				return;
			}
			//There is no wrapper			
			//Find the parent and refresh it
			var model = this._getInstanceActionsModel(instanceId);
			var cb = function(dontSetLoadTime){
				this.loadingChannel.trigger('ui:unblock');
				if(!dontSetLoadTime){
					model.setLoadTime();
				}
				var ancestorIds = model.getAncestorIds();
				if(!ancestorIds.length){
					return;
				}
				return this._onInstanceUpdated(ancestorIds[0]);
			}
			if(model.loadTime != false){
				cb.call(this, 1);
			}else{
				this.loadingChannel.trigger('ui:block');
				model.fetch().done(cb.bind(this));
			}		
		},
		/**
		 * Scrolls the page so that the wrapper of the specified instance is on top
		 * If the wrapper is not visible (e.g. the instance is empty) or is not present
		 * nothing occurrs
		 * @param instanceId
		 */
		_onInstanceNavigate : function(instanceId){
			var wrapper = this._getInstanceWrapper(instanceId);
			if(_.isUndefined(wrapper) || wrapper == null){
				return;
			}
			
			if(!$(wrapper).is(':visible') || $.trim($(wrapper).text()) == '') {
				var elem = $('*[data-id="' + instanceId + '"]');
				if(elem.hasClass('P-Article-Tables') || elem.hasClass('P-Article-Figures')) { //trigger edit
					this.actionsChannel.trigger('instance:actions:perform', instanceId, 142, null);//142 -> trigger edit action
				} else {
					var tooltip = $('#' + gBaloonId);
					var pos = elem.position();
					var offset = elem.offset();

					tooltip.html('No content in this section');
					tooltip.css({
						position: "fixed",
						top: pos.top + 125 + "px",
						left: (offset.left) + "px"
					}).fadeIn().delay(500).fadeOut('slow', function () {
						tooltip.html('');
					});
				}
				
				return;
			}
			$('html, body').animate({
			    scrollTop: $(wrapper).offset().top - 40
			}, 20);			
		},
		/**
		 * This handles the case when a field node is blurred in the preview.
		 * Autosave is stopped and the actions of the instance are hidden
		 * @param node
		 */
		_onNodeBlur : function(node){
			//Resize the iframe because the content may have changed its actual size
			if(typeof window.parent.resizePreviewIframe != 'undefined'){
				window.parent.resizePreviewIframe(window.parent.gPreviewIframeId);
			}
			var $node = $(node);
			var instanceId = $node.attr('data-instance-id');
			var fieldId = $node.attr('data-field-id');
			if(!instanceId || !fieldId){
				return;
			}
			this.actionsChannel.trigger('instance:actions:hide', instanceId, this.actionsPos);
						
			this._disableFieldAutosave();
			this.saveInstanceField(instanceId, fieldId);
		},
		/**
		 * This handles the case when a field node is focused in the preview.
		 * Autosave is scheduled and the actions of the instance are shown next to 
		 * the field node
		 * @param node
		 */
		_onNodeFocus : function(node, event){
			var $node = $(node);
			var instanceId = $node.attr('data-instance-id');
			var fieldId = $node.attr('data-field-id');
			if(!instanceId || !fieldId){
				return;
			}	
			//console.log('_onNodeFocus');
			//this.showCommentBtn($node, event);
			this._enableFieldAutosave(instanceId, fieldId);
			this.actionsChannel.trigger('instance:actions:show', instanceId, this.actionsPos, $(node));
			
		},
		/**
		 * Starts a field autosave - schedules a timer which saves
		 * the field value every 30 seconds
		 * @param instanceId
		 * @param fieldId
		 */
		_enableFieldAutosave : function(instanceId, fieldId){
			if(!this.documentIsEditable || !instanceId || !fieldId){
				return;
			}		
			this.autosaveInterval = setInterval(function(){
				this.saveInstanceField(instanceId, fieldId);
			}.bind(this), gAutosaveTimeoutDuration);
		},
		/**
		 * Stops a field autosave - clears the timer responsible for autosaving
		 * @param instanceId
		 * @param fieldId
		 */
		_disableFieldAutosave : function(){
			clearInterval(this.autosaveInterval);
		},		
		/**
		 * Sends a reject/accept all changes request to the server
		 * This is needed because when all the accept/reject changes buttons are pressed
		 * we do not send save requests for all the fields because it is unnecessery - only the 
		 * changes themselves are processed and we need to ensure that the backend server knows
		 * that all changes have been accepted/rejected.  
		 */
		_sendAcceptRejectAllChangesRequest : function(isAccept){
			if(!this.documentIsEditable){
				return;
			}
			$.ajax({
				url : gVersionsAjaxSrv,
				async : true,
				dataType : 'json',
				type : 'POST',
				data : {
					action : isAccept ? 'accept_all_changes' : 'reject_all_changes',
					document_id : this.documentId
				},
				success : function(pAjaxResult) {
					if(!pAjaxResult['action_is_successful']){						
						alert('Error occurred');
					}
				},
				error : function(){					
					alert('Error occurred');					
				}
			});
		},
		/**
		 * Accepts all the changes in all the fields 
		 */
		acceptAllChanges : function(){
			this.editorController.acceptAllChanges();
			this._sendAcceptRejectAllChangesRequest(true);
		},
		/**
		 * Rejects all the changes in all the fields 
		 */
		rejectAllChanges : function(){
			this.editorController.rejectAllChanges();
			this._sendAcceptRejectAllChangesRequest(false);
		},
		/**
		 * Returns the model for the specified field. Used in "saveInstanceField"
		 * @param instanceId
		 * @param fieldId
		 * @returns
		 */
		_getFieldModel : function(instanceId, fieldId, commentId){
			var model = this.fieldModels.get(instanceId + '_'  + fieldId);
			if(_.isUndefined(model)){
				model = new PreviewApp.Model.InstanceField({
					instanceId : instanceId,
					fieldId : fieldId,
					commentId : commentId,
					documentId : this.documentId + "",//Autocast to string
					id : instanceId + '_'  + fieldId
				});
				this.fieldModels.add(model);
			} else {
				model.setCommentId(commentId);
			}
			return model;
		},
		/**
		 * Saves the value of the specified field
		 * @param instanceId
		 * @param fieldId
		 */
		saveInstanceField : function(instanceId, fieldId){
			var dfd = $.Deferred();
			if(!this.documentIsEditable || !instanceId || !fieldId){
				dfd.reject();
				return dfd.promise();
			}
			var fieldContent = this.editorController.getFieldCleanContent(instanceId, fieldId);
//			console.log(fieldContent);
			var fieldModel = this._getFieldModel(instanceId, fieldId);
			fieldModel.setContent(fieldContent);
			this.fieldsBeingSaved.add(fieldModel);
			fieldModel.save().done(function(result){
				this.commentChannel.trigger('instance:saved', result['comments']);
				this.contentChannel.trigger('instance:autosaved', instanceId);
				this.fieldsBeingSaved.remove(fieldModel);
				dfd.resolve();			
			}.bind(this));	
			return dfd.promise();		
		},
		/**
		 * In Read-only mode
		 * Saves the value of the specified field
		 * @param instanceId
		 * @param fieldId
		 */
		saveReadOnlyInstanceField : function(instanceId, fieldId, commentId){
			var fieldContent = this.editorController.getReadOnlyFieldCleanContent(instanceId, fieldId);
			var fieldModel = this._getFieldModel(instanceId, fieldId, commentId);
			fieldModel.setContent(fieldContent);
			this.fieldsBeingSaved.add(fieldModel);
			fieldModel.save().done(function(){
				this.contentChannel.trigger('instance:autosaved', instanceId);
				this.fieldsBeingSaved.remove(fieldModel);				
			}.bind(this));			
		}
	});
	
	

});
