/**
 * This module will be responsible for displaying popups
 */
PreviewApp.module("Popup", function(Popup, PreviewApp, Backbone, Marionette){	
	/**
	 * A base view which opens a popup and displays in it 
	 * another view
	 */
	Popup.BasePopupView = Marionette.ItemView.extend({
		behaviors: {
			LoadingBehaviour: {	
				blockElSelector : '#popup-wrapper',				
		    }
		},
		_clearPopupContent : function(){
			$('#popup-wrapper').removeClass('popup-with-nav');
			var lPopup = $('#' + gPopupId);										
			if(lPopup.length){
				lPopup.html('');
			}else{
				$('#popup-content').html('');
			}
		},
		initialize : function(options){
			this.documentModel = options.documentModel;
			this.documentId = this.documentModel.getId();	
			this.popupChannel = Backbone.Radio.channel('popup');
			_.bindAll(this, "_reloadPopup");
			this.innerView = options.innerView;
			if(!_.isUndefined(this.innerView)){
				this.listenTo(this.innerView, 'destroy', this._closePopup.bind(this))
			}			
		},
		_closePopup : function(taskAction){
			this.triggerMethod('hide:loading');
			popUp(POPUP_OPERS.close, 'popup-wrapper', 'popup-wrapper');
			this._clearPopupContent();
			this.destroy(null, null, taskAction, null);
		},
		/**
		 * Handles instance:popup:close event
		 * @param performSave - not meaningful for non instance popups
		 * 		(e.g. if cancel has been chosen) 
		 * @param taskAction - the name of the task action to perform
		 * 		(currently the only tasks available are for sending mail
		 * 		after an author/contributor has been added)
		 */
		onPopupClose : function(performSave, taskAction){	
			this._closePopup(taskAction);		
		},		
		render : function(){
			this._loadPopupContent();			
			return this;
		},		
		_reloadPopup : function(){			
			this._loadPopupContent();
		},
		_loadPopupContent : function(){			
			this._clearPopupContent();
			popUp(POPUP_OPERS.open, 'popup-wrapper', 'popup-wrapper');			
			this.innerView.render();
			positionPopup('popup-wrapper', 'popup-wrapper');
		},
	});
	
	/**
	 * A base view for an instance popup
	 * (i.e. instance advanced edit mode popup)
	 */
	Popup.InstancePopupView = Popup.BasePopupView.extend({
		template : false,
		initialize : function(options){
			Popup.BasePopupView.prototype.initialize.call(this, options);
			this.instanceId = options.instanceId;
			this.ajaxOptions = options.ajaxOptions;
			this.ajaxCustomOptions = options.ajaxCustomOptions;
			if (_.isUndefined(this.ajaxOptions) || _.isNull(this.ajaxOptions)) {
				if (!_.isUndefined(this.ajaxCustomOptions) && !_.isNull(this.ajaxCustomOptions)) {
					this.ajaxOptions = $.extend(this.ajaxCustomOptions, this.defaultAjaxOptions());
				} else {
					this.ajaxOptions = this.defaultAjaxOptions();
				}
			}
			this.inEditor = this.ajaxOptions.inEditor;
			this.actionsChannel = Backbone.Radio.channel('actions');
			this.parentInstanceId = this.ajaxOptions && this.ajaxOptions.parent_instance_id;			
		},
		
		defaultAjaxOptions : function(){
			return {
				action : 'open_edit_popup',
				instance_id : this.instanceId,
				parent_instance_id : this.instanceId
			};
		},
		
		_loadPopupContent : function(){			
			this.stopListening(this.popupChannel, 'current:popup:reload', this._reloadPopup);
			var ajaxOptions = this.ajaxOptions;
			this._clearPopupContent();
			popUp(POPUP_OPERS.open, 'popup-wrapper', 'popup-wrapper');			
			this.triggerMethod('show:loading');
			ajaxOptions.document_id = this.documentId;
			// hide comment btn when popup opens
			$('#showCommentBtnBubble').hide();
			
			$.ajax({
				url : gPopupAjaxSrv,
				dataType : 'json',				
				data : ajaxOptions,
				success : this._loadCb.bind(this),
				failure : this._closePopup.bind(this),
			});
		},
		/**
		 * A method to be called when changing the popup instance
		 * (e.g. when clicking on an item in the popup nav menu)
		 */
		onChangePopupInstance : function(instanceId){
			if(!instanceId || instanceId == this.instanceId){
				return;
			}
			this.instanceId = instanceId;
			this.render();
		},
		/**
		 * This function is triggered after a popup
		 * with nav is saved successfully. It will change the instance of the popup
		 * to the next element(e.g. when creating a treatment, after save we will go
		 * to the taxon name page) if possible, or refresh the current instance
		 */
		_moveToNextElement : function(taskAction){
			var instance = this;
			$.ajax({
				url : gDocumentAjaxSrv,
				async : true,
				dataType : 'json',
				type : 'POST',
				data : {
					action : 'get_next_instance_id',
					instance_id : instance.instanceId,					
				},
				success : function(pAjaxResult) {
					var nextInstanceId = pAjaxResult['next_instance_id'];
					if(nextInstanceId){
						instance._onNavInstanceSelected(nextInstanceId);
					}else{
						instance._closePopup(taskAction);
//						instance.render();
					}
				},
				error : function(){					
					instance.render();					
				}
			});
		},
		_loadCb : function(pAjaxResult){
			this.triggerMethod('hide:loading');
			if(pAjaxResult['err_cnt'] || (!pAjaxResult['new_instance_id'] && !pAjaxResult['ignore_new_instance_id'])){				
				alert(pAjaxResult['err_msg'] || 'Internal error');
				this.triggerMethod('popup:close');
				return;
			}
			this.instanceId = pAjaxResult['new_instance_id'];
			if(this.instanceId){
				this.ajaxOptions = this.defaultAjaxOptions();				
			}			
			this.navInstanceId = pAjaxResult['nav_instance_id'];
			this.parentInstanceId = pAjaxResult['parent_instance_id'];
			if(this.navInstanceId){				
//				$('#popup-wrapper').addClass('popup-with-nav');
				if(_.isUndefined(this.navView)){
					$('#popup-nav').html('<div>');
					this.navView = new PreviewApp.Nav.PopupNavView({
						rootInstanceId : this.navInstanceId,
						instanceId : this.instanceId,
						el : $('#popup-nav').find('div')
					});
					this.listenTo(this.navView, 'empty:nav', function(){
						$('#popup-wrapper').removeClass('popup-with-nav');
						positionPopup('popup-wrapper', 'popup-wrapper');
					}.bind(this));
					this.listenTo(this.navView, 'non:empty:nav', function(){
						$('#popup-wrapper').addClass('popup-with-nav');
						positionPopup('popup-wrapper', 'popup-wrapper');
					}.bind(this));
					this.listenTo(this.navView, 'instance:selected', this._onNavInstanceSelected.bind(this));
					this.navView.render();
				}else{
					this.navView.render();
					this.navView.markSelectedInstanceId(this.instanceId);
				}
			}else{
				$('#popup-wrapper').removeClass('popup-with-nav');
			}
			
			var lPopup = $('#' + gPopupId);										
			if(lPopup.length){
				lPopup.replaceWith(pAjaxResult['html']);
			}else{
				$('#popup-content').html(pAjaxResult['html']);
			}
			$('#' + gPopupId).removeClass('P-PopUp');
			$('#' + gPopupId).removeClass('New-Element-Popup');
			positionPopup('popup-wrapper', 'popup-wrapper');
			loadLazyImages($('#popup-wrapper'));					
			this.delegateEvents();
			this.listenTo(this.popupChannel, 'current:popup:reload', this._reloadPopup);
		},
		_onNavInstanceSelected : function(instanceId){
			if(instanceId == this.instanceId){
				return;
			}
			this.instanceId = instanceId;
			this.ajaxOptions = this.defaultAjaxOptions();
			this._reloadPopup();
		},
		_closePopup : function(taskAction){
			this.triggerMethod('hide:loading');
			popUp(POPUP_OPERS.close, 'popup-wrapper', 'popup-wrapper');
			var modifiedInstanceId = this.instanceId;
			if(!_.isUndefined(this.navInstanceId) && !_.isNull(this.navInstanceId)){
				modifiedInstanceId = this.navInstanceId;
			}
			this._clearPopupContent();
			this.destroy(modifiedInstanceId, this.parentInstanceId, taskAction, this.inEditor);
		},
		onDestroy : function(){
			if(this.navView){
				this.navView.destroy();
			}
		},
		/**
		 * Handles instance:popup:close event
		 * @param performSave whether to save the data of the popup or not 
		 * 		(e.g. if cancel has been chosen) 
		 * @param taskAction - the name of the task action to perform
		 * 		(currently the only tasks available are for sending mail
		 * 		after an author/contributor has been added)
		 */
		onPopupClose : function(performSave, taskAction){			
			if(performSave){
				this.triggerMethod('show:loading');
				var saveSuccessCb = function(){
					if(!_.isUndefined(this.navInstanceId) && !_.isNull(this.navInstanceId)){
						this.actionsChannel.trigger('instance:modified', this.navInstanceId);
						this._moveToNextElement(taskAction);
					}else{
						this._closePopup(taskAction);
					}
				}.bind(this);
				SaveInstance(this.instanceId, gInstanceViewMode, saveSuccessCb, 1, function(){
					this.triggerMethod('hide:loading');
				}.bind(this));
			}else{
				this._closePopup(taskAction);
			}			
		},
		onPopupSetInstanceId : function(instanceId){
			this.instanceId = instanceId;
		},
	});
	
	/**
	 * A manager which will handle all tasks associated with popups
	 */
	Popup.Controller = Marionette.Controller.extend({
		template : false,
		regions : {
			
		},
		initialize : function(options){		
			this.documentModel = options.documentModel;
			this.documentId = this.documentModel.getId();	
			this.popupChannel = Backbone.Radio.channel('popup');
			this.actionsChannel = Backbone.Radio.channel('actions');
			this.globalChannel = Backbone.Radio.channel('global');
			this.popupChannel.on('editor:popup:close', function() {
			  this._showVisibleActions();
			}.bind(this));
			this.popupChannel.on('editor:popup:open', function () {
				$('#showCommentBtnBubble').hide();
				this._hideVisibleActions();
			}.bind(this));
			
			this.popupChannel.on('instance:popup:open', function(instanceId, ajaxOptions, customAjaxOptions) {
			  this.showInstancePopup(instanceId, ajaxOptions, customAjaxOptions);
			}.bind(this));
			this.popupChannel.on('subsections:popup:open', function(ajaxOptions) {
			  this.showGeneralInstancePopup(ajaxOptions);
			}.bind(this));
			this.popupChannel.on('doctype:popup:open', function(ajaxOptions) {
			  this.showGeneralInstancePopup(ajaxOptions);
			}.bind(this));
			this.popupChannel.on('base:popup:open', function(innerView) {
				  this.showBasePopup(innerView);
				}.bind(this));			
			this.popupChannel.on('instance:popup:set:instance:id', function(instanceId) {
				  this.setCurrentPopupInstanceId(instanceId);			  
				}.bind(this));	
			this.popupChannel.on('instance:popup:close', function(performSave, taskAction) {
				  this.closeCurrentPopup(performSave, taskAction);			  
				}.bind(this));	
			this.popupChannel.on('popup:last:open', function() {
				  this.displayLastOpenedPopup();			  
				}.bind(this));
			this.autosaveInterval = false;
			//When an import job report is closed, if there is an opened popup
			//it should be reloaded
			this.globalChannel.on('document:import:report:closed', function(jobId){
				this.popupChannel.trigger('current:popup:reload');
			}.bind(this));
			$('.P-Wrapper-Container').append('<div id="popup-wrapper" style="display:none" class="P-PopUp New-Element-Popup"><div class="popup-inner-wrapper"><div id="popup-nav"><div class="nav-popup-list"></div></div><div id="popup-content"></div><div class="P-Clear"></div></div></div>');
			this.openPopups = [];
		},
		/**
		 * When all the popups(both instance popups and ckeditor popups) are closed
		 * we need to show the instance actions which were hidden when the popups 
		 * were opened
		 */
		_showVisibleActions : function(){
			if(this.openPopups.length){//If there are other open popups - do nothing
				return;
			}
			$('.instance-actions').show();
		},
		/**
		 * When a popup is shown(both instance popup or ckeditor popup)
		 * we need to hide all currently visible actions  
		 */
		_hideVisibleActions : function(){
			$('.instance-actions').hide();
		},
		//When there is an open popup we should autosave its contents regularly
		_enableAutosave : function(){
			if(!this.autosaveInterval){
				this.autosaveInterval = setInterval(autoSaveInstance, gAutosaveTimeoutDuration);
			}
		},
		//When there are no more open popups we should remove the autosave interval
		_disableAutosave : function(){
			clearInterval(this.autosaveInterval);
			this.autosaveInterval = false;
		},	
		//Open an edit popup for the specified instance
		showInstancePopup : function(instanceId, ajaxOptions, ajaxCustomOptions){
			gActiveInstanceFormName = gPopupFormName;
			gPopupIsOpened = true;
			var popupView = new Popup.InstancePopupView({
				instanceId : instanceId, 
				documentModel : this.documentModel,
				$el : $('#' + gPopupId),
				ajaxOptions : ajaxOptions,
				ajaxCustomOptions : ajaxCustomOptions
			});
			this.openPopups.push(popupView);
			popupView.render();			
			this._enableAutosave();
			this._hideVisibleActions();
			this.listenTo(popupView, 'destroy', this.onPopupClosed);
		},	
		showGeneralInstancePopup : function(ajaxOptions){
			gActiveInstanceFormName = gPopupFormName;
			gPopupIsOpened = true;
			var popupView = new Popup.InstancePopupView({
				documentModel : this.documentModel,
				$el : $('#' + gPopupId),
				ajaxOptions : ajaxOptions
			});
			this.openPopups.push(popupView);
			popupView.render();
			this.listenTo(popupView, 'destroy', this.onPopupClosed);
		},	
		//Open an edit popup for the specified instance
		showBasePopup : function(innerView){
			gActiveInstanceFormName = gPopupFormName;
			gPopupIsOpened = true;
			var popupView = new Popup.BasePopupView({				
				documentModel : this.documentModel,
				$el : $('#' + gPopupId),
				innerView : innerView,
			});
			this.openPopups.push(popupView);
			popupView.render();						
			this._hideVisibleActions();
			this.listenTo(popupView, 'destroy', this.onPopupClosed);
		},	
		/**
		 * Sends a signal to the popup to initialize closing
		 * @param performSave
		 * @param taskAction
		 */
		closeCurrentPopup : function(performSave, taskAction){
			if(!this.openPopups.length){
				return;
			}
			var popup = this.openPopups[this.openPopups.length - 1];
			popup.triggerMethod('popup:close', performSave, taskAction);
		},
		setCurrentPopupInstanceId : function(instanceId){
			if(!this.openPopups.length){
				return;
			}
			var popup = this.openPopups[this.openPopups.length - 1];
			popup.triggerMethod('popup:set:instance:id', instanceId);
		},
		displayLastOpenedPopup : function(){
			if(!this.openPopups.length){
				return;
			}
			var popup = this.openPopups[this.openPopups.length - 1];				
			popup.render();
		},
		/**
		 * Triggered after the popup has been closed
		 * @param instanceId
		 * @param parentInstanceId
		 * @param taskAction
		 * @returns
		 */
		onPopupClosed : function(instanceId, parentInstanceId, taskAction, inEditor){
			if(instanceId){
				this.actionsChannel.trigger('instance:modified', instanceId);
			}
			this.openPopups.pop();
			//If a task has to be created - it has the highest priority
			if(taskAction && instanceId){
				return CreateTask(instanceId, taskAction, this.documentId);
			}
			if(inEditor){
				//If there is an active CKEditor dialog -  
				//open it and dont open another popup
				return showCKEditorDialogIfNecessary(1);
			}
			this._showVisibleActions();
			//If there is an open popup (i.e. popups have been nested) - open it
			if(this.openPopups.length){
				this.displayLastOpenedPopup();
			}else{
				this._disableAutosave();				
				gActiveInstanceFormName = gDocumentFormName;
				gPopupIsOpened = false;
			}
		},
		
		
	});
		
});