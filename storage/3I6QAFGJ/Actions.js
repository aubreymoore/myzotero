/**
 * This module will be responsible for displaying available actions
 * of the instances (both in preview and nav) and the execution of 
 * instance actions (e.g. move up/down, delete instance, etc.)
 */
PreviewApp.module("Actions", function(Actions, PreviewApp, Backbone, Marionette){
	/**
	 * A view displaying a single instance action.
	 * When the element of the action is clicked
	 * a 
	 */
	var SingleActionView = Marionette.LayoutView.extend({
		tagName: 'div',		
		className : function(){
			return 'P-Instance-Action-' + this.model.getId() + ' P-Instance-Action';
		},
		initialize: function(options){
			this.model = options.model;
			this.instanceId = options.instanceId;	
			this.originalInstanceId = options.originalInstanceId;
			this.pos = options.pos;
			this.actionsChannel = Backbone.Radio.channel('actions');	
			this.popupChannel = Backbone.Radio.channel('popup');
			this.$el.attr('title', this.model.getName());
			var params = this.model.getParams();
			var paramsAsHash = {};
			if(!_.isUndefined(params)){
				for(var i = 0; i < params.length; ++i){
					var param = params.at(i);
					paramsAsHash[param.getName()] = param.getValue();
				}
			}
			this.paramsAsHash = paramsAsHash;
		},
		template : false,
		events: {
			'click' : 'onClick'
		},
		onClick : function(){
			this.actionsChannel.trigger('instance:actions:hide', this.originalInstanceId || this.instanceId, this.pos);
			this.actionsChannel.trigger('instance:actions:perform', this.instanceId, this.model.getId(), this.paramsAsHash);
		},	
	});
	
	var ActionsCollectionView = Marionette.CollectionView.extend({
		childView: SingleActionView,		
		onRenderCollection : function(){
			this.$el.append('<div class="P-Clear">');
		}
	});
	
	/**
	 * This view displays all the actions of a single instance
	 */
	Actions.InstanceActionsView = Marionette.LayoutView.extend({
		initialize: function(options){
			this.model = options.model;
			this.originalInstanceId = this.model.getId();
			this.pos = options.pos;
			this.relativeContainer = $(options.relativeContainer);
			this.$el = $('<div class="instance-actions instance-actions-' + this.pos + '"><div class="instance-actions-inner"></div></div>').appendTo('body');
			this.actionsChannel = Backbone.Radio.channel('actions');
			this.triggerMethod('show');							
			$( window ).scroll(function() {
			  this.positionView();
			}.bind(this));
			$( window ).resize(function() {
				  this.positionView();
				}.bind(this));
		},
		behaviors: {
			LoadingBehaviour: {	
				spinnerOptions :{
					radius : 5,
					length : 5,
					width : 2,
				}
		    }
		 },
		events : {
			'mouseover' : 'onMouseOver',
			'mouseout' : 'onMouseOut',
		},
		onMouseOver : function(){
			if(this.pos == 1){
				this.actionsChannel.trigger('instance:actions:show', this.originalInstanceId, this.pos, this.relativeContainer);
			}
			
		},
		onMouseOut : function(){			
			if(this.pos == 1){
				this.actionsChannel.trigger('instance:actions:hide', this.originalInstanceId, this.pos);
			}
		},
		onShow : function(){	
			this.regionManager.addRegion('actions', {
				el : this.$('.instance-actions-inner')
			});			
			this.positionView();
			//this.showLoading();
			this.renderActions();
		},
		/**
		 * Positions the element of the view 
		 * accordingly to the relativeContainer
		 */
		positionView : function(){
			var el = this.$el;
			var containerOffset = this.relativeContainer.offset();
			var containerWidth = this.relativeContainer.outerWidth();
			var containerHeight = this.relativeContainer.outerHeight();
			var iframePaddingTop = 0;
			var pageFooterHeight = 0;//35;
			var actionsContainerWidth = 35;
			switch(this.pos){
				default:
					//Nav actions - display the actions on the right of the relativeContainer
					el.css({
						top : containerOffset.top,
						left : containerOffset.left + containerWidth
					});
					break;
				case 2 :
					var previewIframe = $('#previewIframe');
					//var previewContainer = $('#previewIframe').contents().find('.P-Article-Preview');
					if(containerOffset.top + containerHeight + iframePaddingTop < $(window).scrollTop() ||
							containerOffset.top > $(window).scrollTop() + $(window).outerHeight() - previewIframe.offset().top - pageFooterHeight	){
						el.hide();
						break;
					}
					el.show();
					var top = containerOffset.top + previewIframe.offset().top;
					
					if(top - $(window).scrollTop() < previewIframe.offset().top - iframePaddingTop){
						top = $(window).scrollTop() + previewIframe.offset().top - iframePaddingTop + 42;//+40px for the cke toolbar
					}
					if(top + el.outerHeight() - $(window).scrollTop() > $(window).outerHeight() - pageFooterHeight ){
						top = $(window).scrollTop() + $(window).outerHeight() - el.outerHeight() - pageFooterHeight;
					}						
					//Nav actions - display the actions on the right of the relativeContainer
					el.css({
						top : top,
						left : previewIframe.offset().left + containerOffset.left 
							  - actionsContainerWidth - 8,
					});
					break;
			}			
		},
		setRelativeContainer : function(relativeContainer){
			if(relativeContainer === this.relativeContainer){
				return;
			}
			this.relativeContainer = relativeContainer;
			this.positionView();
		},
		renderActions : function(){			
//			this.showLoading();
			this.triggerMethod('show:loading');
//			
			var modelIsValid = this.actionsChannel.request('instance:actions:check', this.model.getId());
			if(modelIsValid){
				this._fetchCB();
			}else{
				this.model.fetch().always(this._fetchCB.bind(this, true));
			}
		},
		/**
		 * If an instance is configured to display the actions of another instance
		 * (e.g. a child to display the actions of a parent, when the child is not a
		 * meaningful object by itself - for example the material fields are organized in
		 * groups) we will change the model to the model of the new instance, but we will 
		 * we will use the originalInstanceId when triggering events for it
		 * (e.g. when the actions need to be hidden)
		 */ 
		_changeInstanceModel : function(){
			//Failsafe - should not occur
			if(this.model.getId() == this.model.getActionsInstanceId()){
				return this._fetchCB();
			}
			this.model = this.actionsChannel.request('instance:model:get', this.model.getActionsInstanceId());
			//Reload the model if necessary
			this.renderActions();
			
		},
		_fetchCB : function(updateModelLoadTime){
			//If the view has been destroyed during fetch
			//Dont do anything
			if(this.isDestroyed){
				return;
			}
			if(updateModelLoadTime){
				this.model.setLoadTime();
			}			
			if(this.model.getId() != this.model.getActionsInstanceId()){
				return this._changeInstanceModel();
			}
//			this.hideLoading();
			this.triggerMethod('hide:loading');
			var actions = this.model.getActions();
			if(_.isUndefined(actions) || !actions.length){
				//No actions allowed - hide the view
				return this.destroy();
			}
			var actionsView = new ActionsCollectionView({
				collection : actions,
				childViewOptions : {
					instanceId : this.model.getId(),
					originalInstanceId : this.originalInstanceId,
					pos : this.pos,
				},								
			});
			this.actions.show(actionsView);
//			this.hideLoading();
		},
		template : false
		
	});
	
	/**
	 * A manager which will handle all tasks associated with actions - 
	 * displaying instance actions, executing actions, etc.
	 */
	Actions.Controller = Marionette.Controller.extend({
		template : false,
		regions : {
			
		},
		/**
		 * In this hash we will keep references 
		 * to the views of all the currently displayed instance actions
		 */
		instanceViews : {},
		/**
		 * In this hash we will keep references
		 * to the timeouts responsible for hiding the actions
		 */
		instanceTimeouts : {},
		initialize : function(options){		
			this.documentModel = options.documentModel;
			this.documentId = this.documentModel.getId();	
			this.instancesCollection = new PreviewApp.Model.InstancesWithActions();
			this.globalChannel = Backbone.Radio.channel('global');
			this.actionsChannel = Backbone.Radio.channel('actions');
			this.popupChannel = Backbone.Radio.channel('popup');
			this.contentChannel = Backbone.Radio.channel('content');
			var instance = this;
			//We will handle all the events after the preview has been displayed
			this.globalChannel.on('preview:ready', this._onPreviewReady.bind(this));
		},		
		_onPreviewReady : function(){
			if(this.documentModel.getRoleMode() == gSERoleId){
				//No actions in se mode
				return;
			}
			var instance = this;
			this.actionsChannel.on('instance:actions:show', function(instanceId, pos, relativeContainer) {
				instance.showInstanceActions(instanceId, pos, relativeContainer);
			});			
			this.actionsChannel.on('instance:actions:hide', function(instanceId, pos) {
				instance.hideInstanceActions(instanceId, pos);
			});
			this.actionsChannel.on('instance:updated', function(instanceId) {
				instance.onInstanceUpdated(instanceId);
			});	
			this.contentChannel.on('instance:autosaved', function(instanceId) {
				instance.onInstanceUpdated(instanceId);
			});	
			this.actionsChannel.on('instance:modified', function(instanceId) {
				instance.onInstanceModified(instanceId);
			});	
			this.actionsChannel.on('instance:actions:perform', function(instanceId, actionId, actionParams) {
				instance.performInstanceAction(instanceId, actionId, actionParams);
			});	
			this.actionsChannel.on('create:subsections:structure', function(subsectionId) {
				instance.createSubsectionStructure(subsectionId);
			});	
			this.actionsChannel.on('change:document:type', function(documentTypeId, additionalName) {
				instance.changeDocumentType(documentTypeId, additionalName);
			});	
			this.actionsChannel.reply('instance:actions:check', function(instanceId) {
				return instance.areInstanceActionsValid(instanceId);
			}.bind(this));
			this.actionsChannel.reply('instance:model:get', function(instanceId) {
				return this._getInstanceModel(instanceId, true);
			}.bind(this));
		},
		//Checks whether the actions of the instance are valid or need to be reloaded
		areInstanceActionsValid : function(instanceId){
			var model = this._getInstanceModel(instanceId, false);
			if(_.isUndefined(model) || _.isNull(model)){
				return false;
			}
			//The actions have not been loaded
			if(!model.loadTime){
				return false;
			}
			var loadTime = model.loadTime;
			//The instance has been updated after the actions have been loaded
			if(model.updateTime && model.updateTime > loadTime){
				return false;
			}			
			//Now we have to check whether there has been a change in any of the ancestors
			var ancestorIds = model.getAncestorIds();
			for(var i = 0; i < ancestorIds.length; ++i){
				var ancestorId = ancestorIds[i];
				var ancestorModel = this._getInstanceModel(ancestorId, false);
				if(_.isUndefined(ancestorModel) || _.isNull(ancestorModel)){
					//This ancestor has not been loaded and has not been updated
					//(if it has been updated it would have been created)
					continue;
				}
				//If the ancestor has been updated after the current instance actions 
				//have been loaded - we need to reload them
				if(ancestorModel.updateTime && ancestorModel.updateTime > loadTime){
					return false;
				}
			}
			return true;
		},
		_getInstanceModel : function(instanceId, createIfMissing){
			var instanceModel = this.instancesCollection.get(instanceId);
			if(createIfMissing && (_.isUndefined(instanceModel) || _.isNull(instanceModel))){
				instanceModel = new PreviewApp.Model.InstanceWithActions({id : instanceId});	
				this.instancesCollection.add(instanceModel);
			}
			return instanceModel;
		},
		onInstanceModified : function(instanceId){
			var model = this._getInstanceModel(instanceId, true);
			var cb = function(dontSetLoadTime){
				if(!dontSetLoadTime){
					model.setLoadTime();
				}
				var updatedInstanceId = model.getUpdateInstanceId() || instanceId;
				this.actionsChannel.trigger('instance:updated', updatedInstanceId);
			};
			if(!model.loadTime){
				model.fetch().done(cb.bind(this));
			}else{
				cb.call(this, true);
			}
				
		},
		onInstanceUpdated : function(instanceId){
			var model = this._getInstanceModel(instanceId, true);
			model.setUpdateTime();	
			var cb = function(dontSetLoadTime){
				if(!dontSetLoadTime){
					model.setLoadTime();
				}
				var updateNavInstanceId = model.getUpdateNavInstanceId() || instanceId;
				var modelParent = this._getInstanceModel(updateNavInstanceId, true);
				modelParent.setUpdateTime();
				this.actionsChannel.trigger('instance:nav:updated', updateNavInstanceId);
			};
			if(!model.loadTime){
				model.fetch().done(cb.bind(this));
			}else{
				cb.call(this, true);
			}
		},
		performInstanceAction : function(instanceId, actionId, actionParams){
			//Change the instance id if the action specifically says so
			//(e.g. when the action is to open the popup of a parent 
			//we will have the instanceId of the parent in the params)
			instanceId = _.has(actionParams, 'instanceId') ? actionParams['instanceId'] : instanceId;			
			return $.ajax({
				url : gDocumentAjaxSrv,
				dataType : 'json',
				async : false,
				data :{
					action : 'get_action_details',
					instance_id : instanceId,
					document_id : this.documentId,
					action_id : actionId,
					mode : 2,//FIXME extract this to constant
				},
				success : this._loadActionDetails.bind(this, instanceId, actionId, actionParams)
			});
		},
		createSubsectionStructure : function(subsectionId){
			return $.ajax({
				url: gDocumentAjaxSrv,
				dataType: 'json',
				async: false,
				data: {
					action: 'create_document_subsection_structure',
					document_id: this.documentId,
					subsection_id: subsectionId
				},
				success: function (pAjaxResult) {
//					if(pAjaxResult['result'] == 1) {
						window.location.reload();
//					}
//					this.globalChannel.trigger('disable:predefined:sections');
				}.bind(this),
				error: function(jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
					window.location.reload();
				}.bind(this)
			});
		},
		changeDocumentType : function(papertypeId, additionalName){
			return $.ajax({
				url: gDocumentAjaxSrv,
				dataType: 'json',
				async: false,
				data: {
					action: 'change_document_type',
					document_id: this.documentId,
					papertype_id: papertypeId,
					additional_name: additionalName
				},
				success: function (pAjaxResult) {
					window.location.reload();
				}.bind(this),
				error: function(jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
					window.location.reload();
				}.bind(this)
			});
		},
		_loadActionDetails : function(instanceId, actionId, actionParams, actionDetails){
			if(actionId == 3) { //remove instance confirmation
				if (!confirm(LANG['js.pwt.confirm.delete'])) {
					return false;
				}
				if(actionDetails['confirm_child_delete']) {
					if(!confirm("Are you sure you want to delete this section?\n\nPlease note that with this action you will also delete ALL content and subsections within the selected section.")) {
						return false;
					}
				}
			}
			
			if(actionDetails['err_cnt']){
				alert(actionDetails['err_msg']);			
				this._onActionCompleted.call(this, instanceId, actionId, false);
				return;
			}
			var callbackCode = actionDetails['callback'];
			var evalReturnType = actionDetails['eval_return_type'];
			var dataForAjax = _.extend(actionParams || {}, {
					instance_id : instanceId,
					action_id : actionId,
					document_id : this.documentId,
				});
			var callbackData = {
				instanceId : instanceId,
				actionId : actionId,
				dataForAjax : dataForAjax,		
				callbackCode : callbackCode,
			};
			//If the action has no php eval code - just execute the callback			
			if(!actionDetails['has_eval_code']){
				return this._onActionCompleted(callbackData, true);
			}
			return $.ajax({
				url : gActionAjaxSrv,
				dataType : evalReturnType,				
				data :dataForAjax,
				success :  this._onActionCompleted.bind(this, callbackData, true),
				error : this._onActionCompleted.bind(this, callbackData),				
			});		
		},
		_onActionCompleted : function(actionData, success, actionResult){
			var instanceId = actionData['instanceId'];
			var actionId = actionData['actionId'];
			var dataForAjax = actionData['dataForAjax'];
			var callbackCode = actionData['callbackCode'];
			if(!success){
				//If the action has not been successful - do nothing
				return;
			}
			if(!_.isUndefined(callbackCode) && !_.isNull(callbackCode) && callbackCode != ''){
				var lTempFunction = new Function("pAjaxResult", "lDataForAjax", "pInstanceId", "pActionId", callbackCode).bind(this);
				lTempFunction(actionResult, dataForAjax, instanceId, actionId);
			}					
		},
		
		showInstanceActions : function(instanceId, pos, relativeContainer){
			if(_.isUndefined(relativeContainer) || _.isNull(relativeContainer)){
				return false;
			}			
			var instanceViews = this.instanceViews;
			var instanceTimeouts = this.instanceTimeouts;
			//Check if there currently is a timeout for hiding the view and abort it
			if(!_.isUndefined(instanceTimeouts[instanceId]) && !_.isUndefined(instanceTimeouts[instanceId][pos])){ 
				//Remove the timeout so that the view wont be hidden
				clearTimeout(instanceTimeouts[instanceId][pos]);
				delete instanceTimeouts[instanceId][pos];
			}
			if(!_.isUndefined(instanceViews[instanceId]) && !_.isUndefined(instanceViews[instanceId][pos])){
				instanceViews[instanceId][pos].setRelativeContainer(relativeContainer);
				//The view is currently displayed
				return false;
			}
//			console.log('Show 1', instanceId);
			var instanceModel = this._getInstanceModel(instanceId, true);
			var view = new Actions.InstanceActionsView({
				model : instanceModel,
				pos : pos,
				relativeContainer : relativeContainer,				
			});
			this.listenTo(view, 'destroy', function(){
				delete instanceViews[instanceId][pos];
			}.bind(this));
			if(_.isUndefined(instanceViews[instanceId])){
				instanceViews[instanceId] = {};
			}
			instanceViews[instanceId][pos] = view;
			return true;
		},
		_hideTimeoutCb : function(instanceId, pos){
//			console.log('Hide ', instanceId);
			var instanceTimeouts = this.instanceTimeouts;
			var instanceViews = this.instanceViews;
			if(!_.isUndefined(instanceTimeouts[instanceId]) && !_.isUndefined(instanceTimeouts[instanceId][pos])){ 				
				delete instanceTimeouts[instanceId][pos];
			}
			//Check if there currently is a timeout for hiding the view and abort it
			if(_.isUndefined(instanceViews[instanceId]) || _.isUndefined(instanceViews[instanceId][pos])){ 
				//There is no such view
				return false;
			}
			instanceViews[instanceId][pos].destroy();
		},
		/**
		 * Hides the actions of this instance. 
		 * By default a callback is used. If instantHide is passed the 
		 * actions will be hidden instantly without the use of callbacks
		 */
		hideInstanceActions : function(instanceId, pos, instantHide){	
//			return;
			var instanceTimeouts = this.instanceTimeouts;
			var instanceViews = this.instanceViews;
			//Check if there currently is a timeout for hiding the view and abort it
			if(_.isUndefined(instanceViews[instanceId]) || _.isUndefined(instanceViews[instanceId][pos])){ 
				//There is no such view
				return false;
			}
			if(instantHide){
				this._hideTimeoutCb(instanceId, pos);
				return;
			}
			if(_.isUndefined(instanceTimeouts[instanceId])){
				instanceTimeouts[instanceId] = {};
			}
			instanceTimeouts[instanceId][pos] = setTimeout(this._hideTimeoutCb.bind(this, instanceId, pos), 150);
		},
	});
		
});