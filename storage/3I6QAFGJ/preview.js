//~ jQuery.namespace("preview");
(function () {
	
	PreviewApp.on("start",function(options) {
		this.globalChannel = Backbone.Radio.channel('global');
		this.documentModel = options.model;
		this.globalChannel.reply('document:model', function(){
			return options.model;
		 }.bind(this));
		this.globalChannel.reply('document:id', function(){
			return options.model.getId();
		 }.bind(this));
		this.globalChannel.reply('document:userId', function(){
			return options.model.getUserId();
		}.bind(this));
		this.globalChannel.reply('document:userName', function(){
			return options.model.getUserName();
		}.bind(this));
		this.globalChannel.reply('document:photoId', function(){
			return options.model.getPhotoId();
		}.bind(this));

		this.contentController = new PreviewApp.Content.Controller();
		if(this.documentModel.getIsEditable()){			
			this.actionsController = new PreviewApp.Actions.Controller({
				documentModel : options.model
			});
			this.popupController = new PreviewApp.Popup.Controller({
				documentModel : options.model
			});
		}
		
		this.navController = new PreviewApp.Nav.Controller({
			documentModel : options.model
		});
		
		
		var navView = new PreviewApp.Nav.NavView({
			documentModel: options.model
		});

		var documentTypeView = new PreviewApp.Nav.documentTypeView({
			documentModel: options.model
		});
		
		this.loadingController = new PreviewApp.Loading.Controller();
		this.left.show(navView);	
		this.documentType.show(documentTypeView);	

		this.commentsController	= new PreviewApp.Comments.Controller();
	});
	
	Marionette.Behaviors.behaviorsLookup = function() {
	    return PreviewApp.Behaviors;
	};
	
	
})();



StartPreviewApp = function (documentId, previewAppParams) {
	$(document).ready(function () {
		var model = new PreviewApp.Model.DocumentModel({
			id: documentId,
			isEditable: previewAppParams['preview_can_be_edited'],
			userId: previewAppParams['current_user_id'],
			photoId: previewAppParams['current_photo_id'],
			userName: previewAppParams['current_user_name'],
			roleMode: previewAppParams['current_user_role'],
			documentType: previewAppParams['document_type'],
			userIsAdmin: previewAppParams['current_user_is_admin'],
			userIsCreator: previewAppParams['current_user_is_creator'],
			documentState: previewAppParams['document_state'],
			pjsDocumentState: previewAppParams['pjs_document_state'],
			finalStatementStatus: previewAppParams['final_statement_status'],
			canTechnicalApprove: previewAppParams['can_technical_approve'],
			hideTechnicalDecisionBtns: previewAppParams['hide_technical_decision_btns'],
			isRejected: previewAppParams['is_rejected'],
			finalStatementsWarning: previewAppParams['show_document_final_statements_warning'],
			submittedReviews: previewAppParams['submitted_reviews'],
			sourceDocumentId: previewAppParams['source_document_id'],
			documentSEid: previewAppParams['document_se_id'],
			editorialDecision: previewAppParams['editorial_decision'],
			userIsJournalAdmin: previewAppParams['current_user_is_journal_admin'],
			userIsTechnicalEvaluator: previewAppParams['current_user_is_technical_evaluator'],
			canComment: previewAppParams['can_comment'],
			showJournalSubsections: previewAppParams['show_journal_subsections'],
			papertypeChangeAllowed: previewAppParams['papertype_change_allowed'],
			editorConfigDate: previewAppParams['ckeditor_config_date'],
			"_trackChanges": previewAppParams['track_changes'],
			teFlagToBeApprovedIsChecked: previewAppParams['te_flag_to_be_approved_is_checked'],
			teFlagToBeRejectedIsChecked: previewAppParams['te_flag_to_be_rejected_is_checked'],
			teFlagToDoIsChecked: previewAppParams['te_flag_to_do_is_checked'],
		});
		PreviewApp.start({model: model});
	});



};