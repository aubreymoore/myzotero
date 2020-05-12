//~ jQuery.namespace("preview");
/**
 * This module will implement all logic for the 
 * left menu in the preview page
 * (a.k.a contents menu)
 */

var gFlagByTypeContent = '.P-Flag-Dropdown-Content';
var gFlagByType = '.P-Flag-By-Type';
var gFlagDropdown = '.P-Flag-Drop-Down';
var gVersionsAjaxSrv = '/lib/ajax_srv/version_srv.php';

PreviewApp.module("Nav", function(Nav, PreviewApp, Backbone, Marionette){
	/**
	 * A view which displays a single menu element
	 * (and its children)(e.g. Article metadata and
	 * all its children - title & authors, Abstract & keywords, etc.)
	 * The element is displayed in a li and if it has
	 * children - the children are displayed in a ul 
	 */
	Nav.NavSingleElementView = Marionette.LayoutView.extend({
		tagName: "li",
		template : Handlebars.compile($("#nav-row-template").html()),
		initialize : function(options){			
			this.actionsChannel = Backbone.Radio.channel('actions');
			this.contentChannel = Backbone.Radio.channel('content');
			this.navChannel = Backbone.Radio.channel('nav');
			//FIXME extract to constant
			this.actionsPos = options.actionsPos || 1;
			this.listenTo(this.model, 'itemUpdated', function(){				
				this.render();
			}.bind(this));
			this.listenTo(this.model, 'destroy', function(){				
				this.destroy();
			}.bind(this));
			this.listenTo(this.navChannel, 'instance:state:change', function(instanceId){
				if(instanceId == this.model.getId()){
					this.displayOpenState();
				}
			}.bind(this));
		},				
		_checkTriggerActionEvents : function(){
			var dontTriggerActionEvents = this.getOption('dontTriggerActionEvents');
			if(_.isUndefined(dontTriggerActionEvents) || !dontTriggerActionEvents){
				return true;
			}			
			return false;
		},
		onMouseOver : function(event){
			if(!this._checkTriggerActionEvents() || this.model.getId() < 0){
				return;
			}
			this.actionsChannel.trigger('instance:actions:show', this.model.getId(), this.actionsPos, this.$('.P-Article-Holder'));
		},
		onMouseOut : function(event){
			if(!this._checkTriggerActionEvents() || this.model.getId() < 0){
				return;
			}
			this.actionsChannel.trigger('instance:actions:hide', this.model.getId(), this.actionsPos);
		},
		onClick : function(event){
			if(!this._checkTriggerActionEvents()){
				return;
			}
			if(this.model.getId() > 0){
				this.contentChannel.trigger('instance:navigate', this.model.getId());
			}else{
				//FIXME extract actionid to constant
				var actionId = 4;				
				if(this.model.getCreateInPopup()){
					actionId = 143;
					this.actionsChannel.trigger('instance:actions:perform', null, actionId, {'object_id' : Math.abs(this.model.getId())});
				}else{
					this.actionsChannel.trigger('instance:actions:perform', this.model.getId(), actionId, {'add_param1' : this.model.getId()});
				}
				
			}
		},
		templateHelpers : function(){
			var additionalClass = ' nav-' + this.model.getId() + ' ';
			if(this.model.getId() < 0){
				additionalClass += ' P-Available-Element ';
			}
			switch(this.model.getObjectId()){
				case '21' :
					additionalClass += 'nav-references';
					break;
				case '56' :
					additionalClass += 'nav-supplementary';
					break;
				case '236' :
					additionalClass += 'P-Article-Figures';
					break;
				case '237' :
					additionalClass += 'P-Article-Tables';
					break;
				case '565' :
					additionalClass += 'P-Article-Endnotes';
					break;
			}
			return {
				hasChildren : this.hasChildren,
				additionalClass : additionalClass
			};
		},
		regions : {
			children : '.children-list'
		},
		ui : {
			arrow : '.P-Arrow'
		},
		events: function(){
			var res = {
				'click @ui.arrow': 'toggleOpenState',			
		    };
			res['mouseover .nav-' + this.model.getId()] = 'onMouseOver';
			res['click .nav-' + this.model.getId()] = 'onClick';
			res['mouseleave .nav-' + this.model.getId()] = 'onMouseOut';
			return res;
		},		
	    toggleOpenState : function(){
	    	if(this.isDestroyed){
	    		return;
	    	}
	    	this.model.toggleOpenState();
	    	this.navChannel.trigger('instance:state:change', this.model.getId());
	    	this.displayOpenState();
	    	return false;
	    },
	    displayOpenState : function(){
	    	var arrow = this.ui.arrow;
	    	if(this.model.getIsOpen()){
	    		arrow.addClass('P-Down-Arrow');
	    		arrow.removeClass('P-Right-Arrow');
	    		this.children.$el.show();
	    	}else{
	    		arrow.removeClass('P-Down-Arrow');
	    		arrow.addClass('P-Right-Arrow');
	    		this.children.$el.hide();
	    	}
	    },
	    render : function(){
	    	this.hasChildren = this.model.getChildren().length > 0;
	    	this.children.reset();
	    	Marionette.LayoutView.prototype.render.call(this);
	    	if(!this.hasChildren){	    		
				return this;
			}
			var childrenElements = [];
			var children = this.model.getChildren();
			var allItems = this.getOption('allItems');
			var documentId = this.getOption('documentId');
			for(var i = 0; i < children.length; ++i){
				var child = allItems.get(children[i]);
				childrenElements.push(child);
			}
			var childrenCollection = new PreviewApp.Model.NavItems(childrenElements, {documentId : documentId});
			var childrenView = new NavCollectionView({
				collection : childrenCollection,
				childViewOptions : {
					allItems : allItems,
					documentId : documentId,
					dontTriggerActionEvents : this.getOption('dontTriggerActionEvents'),
				},
			});
			this.listenToOnce(childrenCollection, 'update', this.render.bind(this));
			
			this.children.show(childrenView);
			this.displayOpenState();	
			return this;
	    },		
	});

	Nav.TEFlagsSingleElementView = Marionette.LayoutView.extend({
		tagName: "div",
		className: 'P-Header-Document-Type-Content',
		template: Handlebars.compile($("#te-flag-row-template").html()),
		initialize: function (options) {
			this.globalChannel = Backbone.Radio.channel('global');
			this.documentId = this.globalChannel.request('document:id');
		},
		ui: {
			checkbox: '.flags_input',
		},
		events: {
			'change @ui.checkbox': 'UpdateTeFlags'
		},
		UpdateTeFlags : function(flags){
			var flags = [];
			$('input[name="te_flag"]:checked').each(function () {
				flags.push($(this).val());
			});
			this.UpdateTeFlags = new PreviewApp.Model.UpdateTeFlags({documentId: this.documentId, flags: flags});
			this.UpdateTeFlags.update();
		 },
	});
	
	var NavCollectionView = Marionette.CollectionView.extend({
		childView: Nav.NavSingleElementView,		
		tagName: "ul",
	});
	
	Nav.TeFlagsCollectionView = Marionette.CollectionView.extend({
		childView: Nav.TEFlagsSingleElementView,
		tagName: "div",
	});
	
	Nav.Controller = Marionette.Controller.extend({
		 initialize: function(options){
			 this.globalChannel = Backbone.Radio.channel('global');
			 this.documentId = this.globalChannel.request('document:id');
			 this.navItems = new PreviewApp.Model.NavItems([], {documentId : this.documentId});
			 this.navItems.fetch().done(function(){
				this.onItemsFetched();
			 }.bind(this));
			 this.TEFlagsItems = new PreviewApp.Model.TEFlagsItems([], {documentId : this.documentId});
			 this.TEFlagsItems.fetch().done(function(){
				this.onItemsFetched();
			 }.bind(this));
			 this.navChannel = Backbone.Radio.channel('nav');
			 this.actionsChannel = Backbone.Radio.channel('actions');
			 this.collectionIsFetched = false;
			 this.navChannel.reply('items:get', function(){
				return this.navItems;
			 }.bind(this));
			 this.navChannel.reply('te:flags:get', function(){
				return this.TEFlagsItems;
			 }.bind(this));
			 this.navChannel.reply('collection:fetch:check', function(){
				return this.collectionIsFetched;
			 }.bind(this));
			 this.actionsChannel.on('instance:updated', this.onInstanceUpdated.bind(this));
			 this.actionsChannel.on('instance:nav:updated', this.onInstanceUpdated.bind(this));
			 this.actionsChannel.on('instance:deleted', this.onInstanceDeleted.bind(this));
			 this.actionsChannel.on('root:instances:swapped', this._reloadCollection.bind(this));
		 },
		 _reloadCollection : function(){
			 this.collectionIsFetched = false;
			 this.navItems.fetch().done(function(){
				this.onItemsFetched();
			 }.bind(this));
		 },
		 onInstanceUpdated : function(instanceId){
			 if(!instanceId){
				 return;
			 }
			 var collection = new PreviewApp.Model.NavItems([], {documentId : this.documentId, instanceId : instanceId});
			 collection.fetch().done(this.onInstanceCollectionFetched.bind(this, instanceId, collection));
		 },
		 onInstanceDeleted : function(instanceId, dontUpdateParent){
			 if(!instanceId){
				 return;
			 }
			 var navItem = this.navItems.get(instanceId);
			 if(_.isUndefined(navItem)){				 
				 return;
			 }
			 var children = navItem.getChildren();
			 _.each(children, function(childrenId){
				 this.onInstanceDeleted(childrenId, 1);
			 }, this);
			 navItem.destroy();
			 var parent = this.navItems.get(navItem.getParentId());
			 if(!navItem.getParentId()){
				 this._reloadCollection();
			 }
			 if(!_.isUndefined(parent) && !dontUpdateParent){
				 var children = parent.getChildren();
				 if(_.isArray(children)){
					 children.splice(children.indexOf(instanceId), 1);
				 }
				 parent.trigger('itemUpdated');
				 return;
			 }
		 },
		 onInstanceCollectionFetched : function(instanceId, collection){
			 var prevNavItem = this.navItems.get(instanceId);
			 collection.each(function(item){
				 var navItem = this.navItems.get(item.getId());
				 if(_.isUndefined(navItem)){
					 this.navItems.add(item);
					 return;
				 }
				 navItem.set(item.attributes);
			 }, this);
			 var navItem = this.navItems.get(instanceId);
			 if(!_.isUndefined(navItem) && _.isUndefined(prevNavItem)){
				 //Object has been added
				 var parentId = navItem.getParentId();
				 if(_.isUndefined(parentId) || _.isNull(parentId)){
					 //Added root item - update the whole nav
					 this._reloadCollection();
					 return;
				 }
			 }
			 
			 if(!_.isUndefined(navItem)){
				 navItem.trigger('itemUpdated');				
			 }
			 this.navChannel.trigger('instance:items:fetched', instanceId);
		 },
		 onItemsFetched : function(){
			 this.collectionIsFetched = true;
			 this.navChannel.trigger('items:fetched');
		 },
	});
	
	Nav.NavView = Marionette.LayoutView.extend({
		template : Handlebars.compile($("#nav-template").html()),
		regions : {
			list : '.nav-list',
			flags_list_box: '.P-Flag-By-Type',
		},
		ui : {
			buttons : '.P-Article-Buttons',
			btnFlagDrop: '.P-Flag-Dropdown-Content',
		},
		behaviors: {
			LoadingBehaviour: {	
				blockElSelector : '.P-Article-Structures'
		    }
		 },
		templateHelpers : function(){
			return {
				documentId : this.documentModel.getId(),
				documentType : this.documentModel.getDocumentType(),
				documentIsEditable : this.documentModel.getIsEditable(),
				userIsAdmin : this.documentModel.getUserIsAdmin(),
				userIsJournalAdmin : this.documentModel.getUserIsJournalAdmin(),
				userIsTechnicalEvaluator : this.documentModel.getUserIsTechnicalEvaluator(),
				userIsCreator : this.documentModel.getUserIsCreator(),
				canTechnicalApprove : this.documentModel.getCanTechnicalApprove(),
				hideTechnicalDecisionBtns : this.documentModel.getHideTechnicalDecisionBtns(),
				//isRejected : this.documentModel.getIsRejected(),
				finalStatementsWarning : this.documentModel.getFinalStatementsWarning(),
				//Fixme extract to constants
				documentIsInPresubmitState : this.documentModel.getDocumentState() == 5,
				documentNotInSEReviewState : this.documentModel.getDocumentState() != 9,
				documentIsInNewState : this.documentModel.getDocumentState() == 1 || this.documentModel.getDocumentState() == 14,
				documentIsRejected : this.documentModel.getDocumentState() == 15,
				documentIsDeleted : this.documentModel.getDocumentState() == 4,
				documentIsIncompleteInPjs : this.documentModel.getDocumentState() == 2 && this.documentModel.getPjsDocumentState() == 1,
				documentCanBeSubmitted : ((this.documentModel.getDocumentState() == 6 || this.documentModel.getDocumentState() == 3) && 	this.documentModel.getUserIsCreator() && ($.inArray(this.documentModel.getFinalStatementStatus(), [0,3]) !== -1)) || (this.documentModel.getSourceDocumentId() && !this.documentModel.getDocumentSEid()),		
				finalStatementWaitingNotificationStatus : this.documentModel.getFinalStatementStatus() === 1,
				finalStatementWaitingReviewersStatus : this.documentModel.getFinalStatementStatus() === 2,
				documentState : this.documentModel.getDocumentState(),
				sourceDocumentId : this.documentModel.getSourceDocumentId(),
				documentSEid : this.documentModel.getDocumentSEid(),
				editorialDecision : this.documentModel.getEditorialDecision(),				
			};
		},
		events: function(){
			var res = {
				'click .crossref_update_doi-btn': function(){
					this.globalChannel.trigger('document:update_doi');
				}.bind(this),
				'click .validate-btn': function(){
					this.globalChannel.trigger('document:validate');
				}.bind(this),
				'click .show-validation-report-btn': function(){
					this.globalChannel.trigger('document:validatation:report:show');
				}.bind(this),
				'click .submit-btn': function(e){
					var submissionType = $(e.target).closest('.submit-btn').data('submit-type');
					if(!submissionType){
						return;
					}
					var submittedReviewsCnt = this.documentModel.getSubmittedReviews();
					this.globalChannel.trigger('document:submit', submissionType, false, submittedReviewsCnt);
				}.bind(this),
				'click .P-TE-Flags' : function() {
					var _icon = this.ui.btnFlagDrop.find(gFlagDropdown);
					var _dropdown = this.ui.btnFlagDrop.find(gFlagByType);
					var lIsVisible = _dropdown.is(":visible");
					if(lIsVisible) {
						_icon.removeClass('P-Flag-Drop-Down-On');
						_dropdown.slideUp(300);
					} else {
						_icon.addClass('P-Flag-Drop-Down-On');
						_dropdown.slideDown(300);
					}
				}.bind(this),
		    };
			return res;
		},	
		initialize : function(options){		
			this.globalChannel = Backbone.Radio.channel('global');
			this.documentId = this.globalChannel.request('document:id');
			this.documentModel = this.globalChannel.request('document:model');
			this.navChannel = Backbone.Radio.channel('nav');
			this.navItems = this.navChannel.request('items:get');	
			this.TEFlagsItems = this.navChannel.request('te:flags:get');
			this.globalChannel.on('preview:loaded', this._onPreviewIframeLoaded.bind(this));
			this.globalChannel.reply('nav:loadedflag', this.getNavViewLoaded.bind(this));
			this.navLoaded = false;
		},
		getNavViewLoaded: function() {
			return this.navLoaded;
		},
		/**
		 * Show actions buttons after preview
		 * @returns {undefined}
		 */
		_onPreviewIframeLoaded: function () {
			this.ui.buttons.show();
		},		
		renderCollection: function(){
			this.triggerMethod('hide:loading');
			var firstLevelElements = this.navItems.filter(function(element){
				var parentId = element.getParentId();
				return _.isUndefined(parentId) || _.isNull(parentId) || parentId == '';
			});
			var collectionView = new NavCollectionView({
				collection : new PreviewApp.Model.NavItems(firstLevelElements, {documentId : this.documentId}),
				childViewOptions : {
					allItems : this.navItems,
					documentId : this.documentId
				}
			});
			var TEcollectionView = new Nav.TeFlagsCollectionView({
				collection : this.TEFlagsItems
			});

			if((this.documentModel.getUserIsTechnicalEvaluator() || this.documentModel.getCanTechnicalApprove() || this.documentModel.getUserIsAdmin()) && this.documentModel.getDocumentState() == 5 && this.documentModel.getIsEditable()) {
				this.flags_list_box.show(TEcollectionView);
			}
			this.list.show(collectionView);
			
		},	
		onShow : function() {
			var collectionIsFetched = this.navChannel.request('collection:fetch:check');
			if(collectionIsFetched){
				this.renderCollection();
				this.globalChannel.trigger('nav:loaded');
			}else{
				this.triggerMethod('show:loading');
				this.navChannel.on('items:fetched', function(){
					this.renderCollection();
					if(!this.navLoaded) {
						this.navLoaded = true;
						this.globalChannel.trigger('nav:loaded');
					}
				}.bind(this));
			}
		},
	});
	/**
	 * This class renders the navigation in a popup with navigation
	 */
	Nav.PopupNavView = Nav.NavView.extend({
		template : Handlebars.compile($("#nav-popup-template").html()),
		regions : {
			list : '.nav-popup-list'
		},
		behaviors: {
			LoadingBehaviour: {	
				blockElSelector : '.P-Article-Structures',				
		    }
		 },
		initialize : function(options){		
			this.globalChannel = Backbone.Radio.channel('global');
			this.documentId = this.globalChannel.request('document:id');
			this.documentModel = this.globalChannel.request('document:model');
			this.navChannel = Backbone.Radio.channel('nav');
			this.navItems = this.navChannel.request('items:get');
			this.rootInstanceId = options.rootInstanceId;
			this.instanceId = options.instanceId;			
			this.listenTo(this.navChannel, 'instance:items:fetched', function(instanceId){
				if(this.rootInstanceId == instanceId){
					this.renderCollection();
				}
			}.bind(this));
		},		
		renderCollection: function(){			
			var firstLevelElement = this.navItems.get(this.rootInstanceId);
			var elements = [];
			if(!_.isUndefined(firstLevelElement)){				
				elements.push(firstLevelElement);
				this.trigger('non:empty:nav');
			}else{
				this.trigger('empty:nav');				
			}
			this.triggerMethod('hide:loading');
			var collectionView = new NavCollectionView({
				collection : new PreviewApp.Model.NavItems(elements, {documentId : this.documentId}),
				childViewOptions : {
					allItems : this.navItems,
					documentId : this.documentId,
					dontTriggerActionEvents : true
				}
			});
			this.list.show(collectionView);
			this.markSelectedInstanceId(this.instanceId);			
		},	
		events :{
			'click .P-Article-Holder' : "_onItemSelected",
		},
		markSelectedInstanceId : function(instanceId){
			this.instanceId = instanceId;
			this.$('.P-Article-Active').removeClass('P-Article-Active');
			this.$('.P-Article-Holder[data-id="' + instanceId + '"]').addClass('P-Article-Active');
		},
		_onItemSelected : function(event){
			var target = event.target;
			var elem = $(target).closest('.P-Article-Holder');
			if(!elem.length || !elem.attr('data-id')){
				return false;
			}			
			this.markSelectedInstanceId(elem.attr('data-id'));
			this.trigger('instance:selected', elem.attr('data-id'));
		},
		onRender : function() {
			var collectionIsFetched = this.navChannel.request('collection:fetch:check');
			if(collectionIsFetched){				
				this.renderCollection();
			}else{
				this.triggerMethod('show:loading');
				this.navChannel.on('items:fetched', function(){
					this.renderCollection();
				}.bind(this));
			}			
			this.delegateEvents();
			
			/**
			 * expand navigation
			 * fixme
			 */
			setTimeout(function () {
				if($('#popup-wrapper .P-Article-Holder').first().find('.P-Arrow').hasClass('P-Right-Arrow')) {
					$('#popup-wrapper .P-Article-Holder').first().find('.P-Arrow').trigger('click');
				}
			}, 500);
		},

	});
	Nav.documentTypeView = Marionette.LayoutView.extend({
		tagName: 'div',
		className: 'P-Header-Document-Type-Content',
		template: Handlebars.compile($("#document-type-template").html()),
		templateHelpers: function () {
			return {
				documentType: this.documentModel.getDocumentType()
			};
		},
		initialize: function (options) {
			this.globalChannel = Backbone.Radio.channel('global');
			this.actionsChannel = Backbone.Radio.channel('actions');
			this.popupChannel = Backbone.Radio.channel('popup');
			this.documentId = this.globalChannel.request('document:id');
			this.documentModel = this.globalChannel.request('document:model');
			/**
			 * Only author of the document in New state can change the type for now
			 */
			this.isDocumentCreator = this.documentModel.getUserIsCreator();
			this.documentStateIsNew = (this.documentModel.getDocumentState() == 1);
			this.userIsAdmin = this.documentModel.getUserIsAdmin();
			this.userIsJournalAdmin = this.documentModel.getUserIsJournalAdmin();
			this.papertypeChangeAllowed = this.documentModel.getPapertypeChangeAllowed();
		},
		ui: {
			editbtn: '.P-Edit-Btn'
		},
		events: {
			'mouseover': 'onMouseOver',
			'mouseout': 'onMouseOut',
			'click': 'onClick',
			'click @ui.editbtn': 'editDocumentTypePopUp',
		},
		editDocumentTypePopUp: function () {
			this.popupChannel.trigger('doctype:popup:open', {
				action: 'change_document_type_popup',
				document_id: this.documentId
			});
		},
		onMouseOver: function () {
			if((this.isDocumentCreator || this.userIsAdmin || this.userIsJournalAdmin) && this.documentStateIsNew && this.papertypeChangeAllowed) {
				this.ui.editbtn.show();
			} else {
				return false;
			}
		},
		onMouseOut: function () {
			this.ui.editbtn.hide();
		},
		onClick: function () {
		},
		onRender: function () {
		}
	});
});
