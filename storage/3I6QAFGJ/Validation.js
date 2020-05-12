PreviewApp.module("Validation", function(Validation, PreviewApp, Backbone, Marionette){
	/**
	 * The following view will display a single errors from a validation report
	 */
	Validation.ValidationSingleErrorView = Marionette.ItemView.extend({
		template : Handlebars.compile($("#validation-error-template").html()),
	});
	Validation.ValidationAllSingleErrorsView = Marionette.CollectionView.extend({
		childView: Validation.ValidationSingleErrorView,		
		tagName: "li",
	});
	/**
	 * The following view will display a single warning from a validation report
	 */
	Validation.ValidationSingleWarningView = Marionette.ItemView.extend({
		template : Handlebars.compile($("#validation-error-template").html()),
	});
	Validation.ValidationAllSingleWarningsView = Marionette.CollectionView.extend({
		childView: Validation.ValidationSingleWarningView,		
		tagName: "li",
	});
	/**
	 * The following view will display all the errors of a specified type from a validation report
	 */
	Validation.ValidationErrorsByTypeView = Marionette.LayoutView.extend({
		template : Handlebars.compile($("#validation-errors-by-type-template").html()),	
		regions : {
			list : '.errors-list'
		},			
		renderCollection: function(){						
			var collectionView = new Validation.ValidationAllSingleErrorsView({
				collection : this.model.getErrors(),				
			});
			this.list.show(collectionView);			
		},	
		onRender : function() {
			this.renderCollection();
		},	
	});
	/**
	 * The following view will display all the errors from a validation report
	 */
	Validation.ValidationErrorsView = Marionette.CollectionView.extend({
		childView: Validation.ValidationErrorsByTypeView,		
		tagName: "div",
	});
	/**
	 * This view will display the validation report, after a validation has been performed
	 */
	Validation.ValidationReportView = Marionette.LayoutView.extend({
		template: Handlebars.compile($("#validation-template").html()),
		regions: {
			list: '.validation-errors-list'
		},
		templateHelpers: function () {
			return {
				validationResult: this.model.hasErrors() ? 'Validation unsuccessful' : 'Validation successful',
				validationClass: this.model.getClass(),
				charactersCount: this.model.getCharactersCount(),
			};
		},
		ui: {
			btnSkip: '#skip-warnings-btn'
		},
		initialize: function (options) {
			this.globalChannel = Backbone.Radio.channel('global');
			this.documentId = this.globalChannel.request('document:id');
			this.documentModel = this.globalChannel.request('document:model');
			this.popupChannel = Backbone.Radio.channel('popup');
			this.allowSkipBtn = options.allowSkip;
			this.submissionModel = options.submissionModel;
		},
		events : function(){
			return {
				'click @ui.btnSkip': 'skipBtn',
				'click .close-btn' : "closePopup",
				'click .instance' : function(e){
					if(this.isDestroyed){
						return;
					}
					this.closePopup();
					var actionType = $(e.target).data('action-type');
					if(actionType == 1) {
						/*
						 * In case of TE Feedback unresolved questions => show TE Feedback popup
						 */
						LayerGeneralPopUp('get_document_te_feedback_popup', '&document_id=' + this.documentId);
					} else {
						this.popupChannel.trigger('instance:popup:open', $(e.target).data('instance-id'), null, {filter_subinstance_id: $(e.target).data('filter-subinstance-id')});
					}
					
					return false;
				}.bind(this)
			};
		},
		closePopup : function(){
			if(this.isDestroyed){
				return;
			}
			popUp(POPUP_OPERS.close, 'popup-wrapper', 'popup-wrapper');
			this.destroy();
		},
		skipBtn: function () {
			if(this.isDestroyed) {
				return;
			}
			popUp(POPUP_OPERS.close, 'popup-wrapper', 'popup-wrapper');
			this.globalChannel.trigger('document:submit', this.submissionModel.getType(), true, 0);
			this.destroy();
		},
		renderCollection: function () {
			var collectionView = new Validation.ValidationErrorsView({
				collection: this.model.getContent(),
			});
			this.list.show(collectionView);
		},
		onRender : function() {
			if(!this.model.hasErrors() && this.model.hasWarnings() && this.allowSkipBtn) {
				this.ui.btnSkip.show();
			} else {
				this.ui.btnSkip.hide();
			}
			
			this.renderCollection();
		},	
		//Here we will not remove the $el because it may be needed later. Instead we will empty its content
	    remove: function() {
	      this.$el.html('');
	      this.stopListening();
	      return this;
	    },
	});
	/**
	 * This controller will handle tasks associated with validation and submission of the currently edited document
	 */
	Validation.Controller = Marionette.Object.extend({
		initialize : function(options){
			this.globalChannel = Backbone.Radio.channel('global');
			this.contentChannel = Backbone.Radio.channel('content');			
			this.documentId = this.globalChannel.request('document:id');
			this.globalChannel.on('preview:ready', function(){
				this.globalChannel.on('document:validate', this.validateDocument.bind(this));
				this.globalChannel.on('document:validatation:report:show', this.showValidationReport.bind(this, false));
				this.globalChannel.on('document:submit', this.submitDocument.bind(this));
				this.globalChannel.on('document:update_doi', this.updateDocumentReferenceDoi.bind(this));
			}.bind(this));
			
		},
		onShowLoading : function(){
//			$('body').css({'overflow' : 'hidden'});
			$.blockUI({
				message: '<div class="dialog-loading-spinner"></div>',
				overlayCSS: {
					opacity: 0.3,
				},
				css: {
					width: '100%',
					height: '100%',
					top: '0px',
					left: '0px',
					background:'transparent',
				}
			});
			$('body').find('.dialog-loading-spinner').spin({});
		},
		onHideLoading : function(){
			$.unblockUI();	
		},
		/**
		 * Checks whether the document is ready for validation.
		 * Currently the only condition for validation is the document 
		 * not to have tracked changes 
		 */
		_checkIfDocumentIsReadyForValidation : function(){
			return true;
			var hasUnprocessedChanges = this.globalChannel.request('document:has:unprocessed:changes');
			return !hasUnprocessedChanges;
		},
		/**
		 * Validates the document and displays a summary of the validation
		 */
		validateDocument : function(){
			if(!this._checkIfDocumentIsReadyForValidation()){
				alert('Document has unprocessed changes and cannot be validated.');
				return;
			}			
			this.validationModel = new PreviewApp.Model.Validation([],{documentId : this.documentId});
			this.triggerMethod('show:loading');			
			this.validationModel.fetch().always(this.showValidationReport.bind(this, false));
		},
		/**
		 * Submits the document to the journal system. If this is a newly created document
		 * it submits it for validation by the editorial secretary
		 */
		submitDocument : function(submissionType, allowSkip, submittedReviews){
			if(!this._checkIfDocumentIsReadyForValidation()){
				alert('Document has unprocessed changes and cannot be validated.');
				return;
			}
			if(submissionType == '4'){
				LayerTeFeedbackFrm(this.documentId);
				return;
			}
			var confirmText = this._getSubmissionConfirmText(submissionType, submittedReviews);
			if(!_.isUndefined(confirmText) && confirmText){
				if(!confirm(confirmText)){
					return;
				}
			}
			this.triggerMethod('show:loading');			
			this.submissionModel = new PreviewApp.Model.Submission({type : String(submissionType), allowSkip : allowSkip}, {documentId : this.documentId});
			this.submissionModel.save().always(this._submissionCb.bind(this));
		},
		/**
		 * Updates the document's references DOI numbers via the CrossRef API
		 */
		updateDocumentReferenceDoi : function(){			
			this.updateDoiModel = new PreviewApp.Model.UpdateDOI({documentId : this.documentId});
			this.triggerMethod('show:loading');
			this.updateDoiModel.update();				
		},
		_getSubmissionConfirmText : function(submissionType, submittedReviews){
			var texts = {
				"1" : 'You are about to submit this manuscript for pre-submission technical review. You will receive an email from us with our feedback / approval.',
				"2" : 'Are you sure you want to approve this paper?',
				"3" : 'You are about to submit this manuscript to the journal system. Please note that you will not be able to make any changes to the manuscript until you receive an editorial decision.',
				"4" : 'Are you sure you want to send feedback for this paper?',
				"5" : 'Your manuscript has been reviewed by ' + submittedReviews + ' reviewer(s). \n\rWould you like to send request(s) for final statement?',
				"6" : 'You are about to return this manuscript to Draft state. \n\rAre you sure you want to proceed?\n\r',
				"7" : 'Please note that some of the reviewers have not submitted their final statements yet. If you choose to proceed with submission, these reviewers will no longer be able to send a final statement for your manuscript.',
				"8" : 'Your manuscript has been reviewed by ' + submittedReviews + ' reviewer(s). We strongly advise to ask your reviewer(s) to provide Final Review Statement(s) through the "Request Final Statement" button. Final Review Statements are not mandatory, however they give reviewers the opportunity to check, if you have considered their comments. \n\rWould you like to proceed with submission?',
				"9" : 'Are you sure you want to send this manuscript for Editorial decision?. Please note that you will not be able to make any changes to the manuscript until you receive an editorial decision.',
				"10" : 'You are about to submit this manuscript to the journal system. Please note that you will not be able to make any changes to the manuscript until you receive an editorial decision.',
				"11" : 'Are you sure you want to reject this paper?',
				"12" : 'You are about to return this manuscript to Draft state. \n\r An email will be sent to the author. \n\rAre you sure you want to proceed?\n\r',
			};
			return texts[submissionType];
		},
		/**
		 * Show the validation report, after a validation has been performed, or after an 
		 * unsuccessful submission, which has failed due to a validation error
		 * @returns
		 */
		showValidationReport: function (allowSkip) {
			this.triggerMethod('hide:loading');
			if(!this.validationModel.getIsSuccessful()) {
				return false;
			}
			if(_.isUndefined(this.validationModel)) {
				return this.validateDocument();
			}
			$('.show-validation-report-btn').show();
			var view = new Validation.ValidationReportView({
				$el: $('#popup-content'),
				el: $('#popup-content'),
				model: this.validationModel,
				submissionModel: this.submissionModel,
				allowSkip: allowSkip
			});
			view.render();
			$('#' + gPopupId).removeClass('P-PopUp');
			$('#' + gPopupId).removeClass('New-Element-Popup');
			popUp(POPUP_OPERS.open, 'popup-wrapper', 'popup-wrapper');
		},
		_submissionCb : function(){	
			var evalExecJs = this.submissionModel.getEvalJs();
			if(evalExecJs) {
				this.triggerMethod('hide:loading');
				eval(evalExecJs);
				return;
			}

			if(this.submissionModel.getIsSuccessful()) {
				var redirectUrl = this.submissionModel.getRedirectUrl();
				if(!_.isUndefined(redirectUrl) && redirectUrl) {
					window.location.href = redirectUrl;
				} else {
					window.location.reload();
				}
			} else {
				this.triggerMethod('hide:loading');
				var submissionError = this.submissionModel.getErrorMsg();
				if(submissionError) {
					alert(submissionError);
				}
				this.validationModel = this.submissionModel.getValidation();
				
				if(this.validationModel.hasErrors() || this.validationModel.hasWarnings()) {
					this.showValidationReport(true);
				}
			}
		},
	});
	
	

});
