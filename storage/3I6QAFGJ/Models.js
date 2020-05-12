var gImportJobSuccessfulState = 4;
var gImportJobFailedState = 5;
var gImportJobProcessingState = 3;
var gImportJobReadyForProcessingState = 2;
var gDetailFailedState = 4;
var gDetailSuccessfulState = 3;
var gReferenceObjectId = 95;

PreviewApp.module("Model", function(Model, PreviewApp, Backbone, Marionette){
	Model.Describable = {
		namedAttributes : {
			name : 'string'
		}	
	};
	
	/**
	 * Model for the document used in the preview page
	 */
	Model.DocumentModel = Brace.Model.extend({
		namedAttributes: {
			id : Number,
			isEditable : "boolean",
			userId : Number,
			photoId: Number,
			userName : "string",
			userIsAdmin : "boolean",
			userIsJournalAdmin : "boolean",
			userIsTechnicalEvaluator : "boolean",
			userIsCreator : "boolean",			
			documentState : "string",
			pjsDocumentState : "string",
			roleMode : Number,
			documentType : "string",
			finalStatementStatus : Number,
			canTechnicalApprove : "boolean",
			hideTechnicalDecisionBtns : "boolean",
			isRejected : Number,
			finalStatementsWarning : Number,
			submittedReviews : Number,
			sourceDocumentId : Number,
			documentSEid : Number,
			editorialDecision : Number,
			canComment : Number,
			showJournalSubsections : Number,
			papertypeChangeAllowed : Number,
			editorConfigDate : Number,
			'_trackChanges': "boolean",
			teFlagToBeApprovedIsChecked : "boolean",
			teFlagToBeRejectedIsChecked : "boolean",
			teFlagToDoIsChecked : "boolean",
		},
		modifyTrackChanges: function(track){
			if(this.getRoleMode() == gSERoleId || this.get("_trackChanges") === track){
				return;
			}
			$.ajax({
				url : gDocumentAjaxSrv,				
				dataType : 'json',
				data :{
					action: 'modify_change_tracking',
					document_id: this.getId(),
					track_changes : track ? 1 : 0
				},				
			});
			this.set("_trackChanges", track);
		},
		getTrackChanges: function(){
			return this.getRoleMode() == gSERoleId || this.get("_trackChanges");
		}, 
	
	});
	
	Model.NavItem = Brace.Model.extend({
		mixins : [Model.Describable],		
		namedAttributes: {
			parentId : 'string',
			objectId : 'string',
			children : ['string'],
			isOpen : 'boolean',
			createInPopup : 'boolean'
		},
		defaults : {
			children : [],
			createInPopup : false,
		},
		persistOpenState: function(){
			$.ajax({
				url : gActiveMenuTabSrv,
				async: false,
				dataType : 'json',
				data :{
					tab_id : this.getId(),
					is_active : this.getIsOpen() ? 1 : 0
				},				
			});
		},
		toggleOpenState : function(){
			if(this.getIsOpen()){
				this.close();
			}else{
				this.open();
			}			
		},
		open : function(){
			this.setIsOpen(true);
			this.persistOpenState();
		},
		close : function(){
			this.setIsOpen(false);
			this.persistOpenState();
		}
	});

	Model.TEFlagItem = Brace.Model.extend({
		mixins: [Model.Describable],
		namedAttributes: {
			id: 'string',
			name: 'string',
			label_for: 'string',
			ischecked: Number
		},
		defaults: {
			ischecked: 0
		}
	});
	
	Model.NavItems = Brace.Collection.extend({
		documentId : false,
		initialize : function(models, options){
			this.documentId = options.documentId;
			this.instanceId = options.instanceId;
			return Brace.Collection.prototype.initialize.call(this, models, options);
		},		
		url : function(){
			var res = '/rest/nav_tree/' + this.documentId;
			if(this.instanceId){
				res += '/' + this.instanceId;
			}
			return res;
		},
		getDocumentId : function(){
			return this.documentId;
		},
		model : Model.NavItem,
	});	
	
	Model.TEFlagsItems = Brace.Collection.extend({
		documentId: false,
		initialize: function (models, options) {
			this.documentId = options.documentId;
			return Brace.Collection.prototype.initialize.call(this, models, options);
		},
		url: function () {
			var res = '/rest/te_flags/' + this.documentId;
			return res;
		},
		getDocumentId: function () {
			return this.documentId;
		},
		model: Model.TEFlagItem,
	});	
	
	Model.ActionParam = Brace.Model.extend({
		mixins : [Model.Describable],
		namedAttributes: {
			value : 'string',					
		},
	});
	Model.ActionParams = Brace.Collection.extend({
		model:Model.ActionParam
	});
	Model.Action = Brace.Model.extend({
		mixins : [Model.Describable],
		namedAttributes: {
			html : 'string',
			jsCode : 'string',	
			params : Model.ActionParams
		},
		
	});
	Model.Actions = Brace.Collection.extend({
		model : Model.Action
	});
	
	//FIXME split to 2 models - one with the base info and one with all the actions
	//so that each can be fetched faster and to avoid unncessary queries when reloading 
	//the actions
	Model.InstanceWithActions = Brace.Model.extend({
		updateTime : false,//The time when the instance was last updated
		loadTime : false,//The time when the instance actions were last loaded
		setLoadTime : function(){
			this.loadTime = getCurrentTime();
		},
		setUpdateTime : function(){
			this.updateTime = getCurrentTime();
		},		
		namedAttributes: {
			actions : Model.Actions,
			//If an instance shows the actions of another instance this field will have the id of the other instance
			//otherwise the id of the current instance will be here
			actionsInstanceId : "string",
			//If an instance update refreshes another instance this field will have the id of the other instance
			updateInstanceId : "string",
			//If an instance update refreshes the nav of another instance(instead of its parent) this field will have the id of the other instance
			updateNavInstanceId : "string",
			objectId : "string",
			ancestorIds : ['string']
		},
		defaults : {
			ancestorIds : [],
			actions : new Model.Actions([]),
		},
		url : function(){
			return '/rest/instance_actions/' + this.getId();
		},	
	});
	Model.InstancesWithActions = Brace.Collection.extend({
		model : Model.InstanceWithActions
	});	
	Model.InstancePreview = Brace.Model.extend({
		namedAttributes: {
			preview : "string",			
		},
		defaults : {
			preview : "",
		},
		url : function(){
			return '/rest/instance_preview/' + this.getId();
		},	
	});
	
	Model.InstanceField = Brace.Model.extend({
		isSaving: false,
		needsNewSave: false,
		saveDeferredObject: false,
		namedAttributes: {
			content: 'string',
			instanceId: 'string',
			fieldId: 'string',
			documentId: 'string',
			commentId : Number
		},
		logFailedSave: function () {
			if(gPageIsUnloading) {
				return;
			}			
			alert("Autosave failed due to one of the following reasons:\n\
					• Your login session has expired \n\
					• Internet connectivity problems \n\
					Please go to login or check your internet connectivity.");
		},
		save : function(){
			if(this.isSaving){
				this.needsNewSave = true;
				return this.saveDeferredObject;
			}
			if(!this.saveDeferredObject){
				this.saveDeferredObject = $.Deferred();
			}
			this.isSaving = true;
			$.ajax({
				url : gVersionsAjaxSrv,
				async : true,
				dataType : 'json',
				type : 'POST',
				data : {
					document_id : this.getDocumentId(),
					instance_id : this.getInstanceId(),
					field_id : this.getFieldId(),
					comment_id : this.getCommentId(),
					content : this.getContent(),
					action : 'save_version_change',
				},
				success : function(pAjaxResult) {
					this.isSaving = false;
					if(!pAjaxResult['action_is_successful']){
						this.logFailedSave();						
					}else{
						if(!this.needsNewSave){
							this.saveDeferredObject.resolve(pAjaxResult);
							this.saveDeferredObject = false;							
							return;
						}
					}
					//If the save is unsuccessful or the field needs new save - save again
					this.needsNewSave = false;
					this.save();
				}.bind(this),
				error : function(){
					this.isSaving = false;
					this.needsNewSave = false;
					this.logFailedSave();
					this.save();
				}.bind(this)
			});
			return this.saveDeferredObject;
		},
	});
	Model.InstanceFields = Brace.Collection.extend({
		model : Model.InstanceField
	});
	Model.VersionUserName = Brace.Model.extend({
		namedAttributes: {
			name : "string"
		},
		defaults : {
			name : "",
		},
		
	});
	Model.VersionUserNames = Brace.Collection.extend({
		model : Model.VersionUserName,
		documentId : false,
		initialize : function(models, options){
			this.documentId = options.documentId;
			return Brace.Collection.prototype.initialize.call(this, models, options);
		},		
		url : function(){
			var res = '/rest/version_user_names/' + this.documentId;			
			return res;
		},
	});
	
	Model.ValidationError = Brace.Model.extend({
		namedAttributes: {
			error : "string",
			instanceId : "string",
			actionType : "string",
			filterSubInstanceId : "string",
			commentId : "string"
		},
	});
	Model.ValidationErrors = Brace.Collection.extend({
		model : Model.ValidationError,
	});
	Model.ValidationErrorsByType = Brace.Model.extend({
		namedAttributes: {
			errors : Model.ValidationErrors,
			type : "string",			
		},
		defaults : {
			errors : new Model.ValidationErrors([]),
		}
	});
	Model.ValidationErrorsCollection = Brace.Collection.extend({
		model: Model.ValidationErrorsByType,
	});
	Model.Validation = Brace.Model.extend({
		namedAttributes: {
			content: Model.ValidationErrorsCollection,
			errors: Number,
			errCount: Number,
			charactersCountNumber: Number,
			warnings: Number,
			isSuccessful: "boolean"
		},
		defaults: {
			content: new Model.ValidationErrorsCollection([]),
			errors: 0,
			errCount: 0,
			charactersCountNumber: 0,
			warnings: 0,
			isSuccessful: false
		},
		initialize: function (models, options) {
			this.documentId = _.isUndefined(options) ? null : options.documentId;
//			return Brace.Collection.prototype.initialize.call(this, models, options);
			Brace.Model.prototype.initialize.call(this, models, options);
		},
		url: function () {
			var res = '/rest/validation/' + this.documentId;
			return res;
		},
		hasErrors: function () {//The document is valid if there are no validation errors
			return this.getErrCount() > 0;
		},
		hasWarnings: function () {
			return this.getWarnings() > 0;
		},
		getClass: function () {
			var className = 'valid';
			if(this.getErrCount()) {
				className = 'invalid';
			} else if(this.getWarnings()) {
				className = 'valid_warning';
			}
			return className;
		},
		getCharactersCount: function () {
			return this.getCharactersCountNumber();
		}
	});
	Model.Submission = Brace.Model.extend({
		initialize : function(attributes, options){
			this.documentId = _.isUndefined(options) ? null : options.documentId;
			Brace.Model.prototype.initialize.call(this, attributes, options);
		},		
		namedAttributes: {
			validation : Model.Validation,
			errorMsg : "string",
			isSuccessful : "boolean",
			redirectUrl : "string",
			type : "string",
			allowSkip : "boolean",
			evalJs : "string"
		},
		defaults : function(){
			return {
				isSuccessful : false,
				allowSkip : false,
				validation : new Model.Validation([], {documentId : this.documentId})
			};
		},
		url : function(){
			var res = '/rest/submit/' + this.documentId;			
			return res;
		},
	});
	
	Model.ImportJobDetail = Brace.Model.extend({
		mixins : [Model.Describable],		
		namedAttributes: {
			state : 'string',
			errorMsg : 'string',
			id : 'string',
			stateId : 'string',
			parentInstanceId : 'string',
		},		
	});
	
	Model.ImportJobDetails = Brace.Collection.extend({
		model : Model.ImportJobDetail
	});
	
	Model.ImportJob = Brace.Model.extend({
		mixins : [Model.Describable],	
		urlRoot : '/rest/import_job/',
		namedAttributes: {
			state : 'string',
			errorMsg : 'string',
			id : 'string',
			stateId : 'string',
			details : Model.ImportJobDetails,
		},		
		/**
		 * Returns whether the import job has finished or not
		 * @returns {Boolean}
		 */
		isJobFinished : function(){
			var stateId = this.getStateId();
			if(stateId == gImportJobSuccessfulState || stateId == gImportJobFailedState){
				return true;
			}
			return false;
		},
		/**
		 * Returns the number of the import job details
		 * @returns
		 */
		getDetailsCnt : function(){
			return this.getDetails().length;
		},
		/**
		 * Returns the number of the processed import job details
		 * @returns
		 */
		getProcessedDetailsCnt : function(){
			return this.getDetails().filter(function(importDetail){
				var stateId = importDetail.getStateId();
				return stateId == gDetailFailedState || stateId == gDetailSuccessfulState;
			}).length;
		},
		/**
		 * Returns a collection with all the details which were not processed successfully
		 */
		getNonSuccessfullyProcessedDetails : function(){
			return new Model.ImportJobDetails(
				this.getDetails().filter(function(importDetail){
					return importDetail.getStateId() != gDetailSuccessfulState;
				})
			);			
		},
		/**
		 * Returns the number of all the details which were not processed successfully
		 * @returns
		 */
		getNonSuccessfullyProcessedDetailsCnt : function(){
			return this.getNonSuccessfullyProcessedDetails().length;
		}
	});
	
	Model.UpdateDOI = Brace.Collection.extend({
		documentId : false,
		initialize : function(options){
			this.documentId = options.documentId;
			return Brace.Collection.prototype.initialize.call(this, options);
		},
		getDocumentId : function(){
			return this.documentId;
		},
		update : function(){
			$.ajax({
				url : gVersionsAjaxSrv,
				async : true,
				dataType : 'json',
				type : 'POST',
				data : {
					document_id : this.getDocumentId(),
					action : 'update_doi'
				},
				success : function(pAjaxResult) {
					if(!pAjaxResult['action_is_successful']){
						this.logFailedUpdate();						
					}else{
						alert('Finished Successfully  ' + pAjaxResult['result']);
						window.location.reload();
					}
				}.bind(this),
				error: function(jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
					window.location.reload();
				}.bind(this)
			});
		},
		logFailedUpdate : function(){
			if(gPageIsUnloading){
				return;
			}			
			alert("Update DOI failed");
		},
	});
	
	Model.UpdateTeFlags = Brace.Collection.extend({
		documentId: false,
		initialize: function (options) {
			this.documentId = options.documentId;
			this.flags = options.flags;
			return Brace.Collection.prototype.initialize.call(this, options);
		},
		update: function () {
			$.ajax({
				url: gVersionsAjaxSrv,
				async: true,
				dataType: 'json',
				type: 'POST',
				data: {
					document_id: this.documentId,
					flag: this.flags,
					action: 'set_te_flag'
				},
				success: function (pAjaxResult) {
					if(!pAjaxResult['action_is_successful']) {
						this.logFailedUpdate();
					}
				}.bind(this),
				error: function (jqXHR, textStatus, errorThrown) {
					alert(errorThrown);
					window.location.reload();
				}.bind(this)
			});
		},
		logFailedUpdate: function () {
			if(gPageIsUnloading) {
				return;
			}
			alert("Update flags failed!");
		},
	});
});