var gBrowserSession = {};
var gWindowIsLoaded = false;
var gAuthorRoleViewMode = 1;
var gSERoleViewMode = 2;

var gAjaxUrlsPrefix = '/lib/ajax_srv/';
var gGetStoryChildrensPageUrl = gAjaxUrlsPrefix + 'get_story_childrens_srv.php';
var gDocumentAjaxSrv = gAjaxUrlsPrefix + 'document_ajax_srv.php';
var gAutocompleteAjaxSrv = gAjaxUrlsPrefix + 'autocomplete_srv.php';
var gActionAjaxSrv = gAjaxUrlsPrefix + 'action_srv.php';
var gLockDocumentAjaxSrv = gAjaxUrlsPrefix + 'lock_document.php';
var gFiguresAjaxSrv = gAjaxUrlsPrefix + 'figures_srv.php';
var gListFiguresAjaxSrv = gAjaxUrlsPrefix + 'list_figures_srv.php';
var gListTablesAjaxSrv = gAjaxUrlsPrefix + 'list_tables_srv.php';
var gListEndnotesAjaxSrv = gAjaxUrlsPrefix + 'list_endnotes_srv.php';
var gListReferencesAjaxSrv = gAjaxUrlsPrefix + 'list_references_srv.php';
var gListSupFilesAjaxSrv = gAjaxUrlsPrefix + 'list_sup_files_srv.php';
var gDocumentTreeAjaxSrv = gAjaxUrlsPrefix + 'document_tree_srv.php';

var gEditPageUrl = '/edit.php';
var gCreateDocumentPageUrl = '/create_document.php';
var gIsScrolled = 0;

var gDocumentAuthorsSrv = gAjaxUrlsPrefix + 'get_document_authors.php';
var gReviewAjaxSrv = gAjaxUrlsPrefix + 'review_srv.php';
var gTeFeedbackAjaxSrv = gAjaxUrlsPrefix + 'te_feedback_srv.php';
var gActionsAjaxSrv = gAjaxUrlsPrefix + 'common_actions_srv.php';
var gAuthorsSrv = gAjaxUrlsPrefix + 'authors_srv.php';
var gSEAjaxSrv = gAjaxUrlsPrefix + 'se_decision_srv.php';
var gCEAjaxSrv = gAjaxUrlsPrefix + 'ce_decision_srv.php';
var gEditorialDecisionAjaxSrv = gAjaxUrlsPrefix + 'editorial_decision_srv.php';
var gSendEmailSrv = gAjaxUrlsPrefix + 'send_email_srv.php';
var gActivitySrv = gAjaxUrlsPrefix + 'list_activity_srv.php';
var gCitationsSrv = gAjaxUrlsPrefix + 'citations_srv.php';
var gFileUploadSrv = gAjaxUrlsPrefix + 'file_upload_srv.php';
var gFileUploadMaterialSrv = gAjaxUrlsPrefix + 'file_upload_material_srv.php';
var gFileUploadChecklistTaxonSrv = gAjaxUrlsPrefix + 'file_upload_checklist_taxon_srv.php';
var gFileUploadTaxonomicCoverageTaxaSrv = gAjaxUrlsPrefix + 'file_upload_taxonomic_coverage_taxa_srv.php';
var gInstancesSrv = gAjaxUrlsPrefix + 'instance_ajax_srv.php';
var gActiveMenuTabSrv = gAjaxUrlsPrefix + 'active_menu_tabs_srv.php';
var gShowOrHideColumnSrv = gAjaxUrlsPrefix + 'show_hide_site_columns_srv.php';
var gDeleteDocumentSrv = gAjaxUrlsPrefix + 'delete_document_srv.php';
var gSaveInstanceSrv = gAjaxUrlsPrefix + 'instance_save.php';
var gSavePollAnswerSrv = gAjaxUrlsPrefix + 'poll_answer_save.php';

var gPreviewMode = false;
var gDocumentCitationsAreLoaded = false;
var gDocumentId = 0;

var gGeneralPopUpHolderId = 'general_popup';
var gGeneralErrorPopUpHolderId = 'error_popup';

var gDocumentFormName = 'document_form';
var gActiveInstanceFormName = gDocumentFormName;
var gContainerItemObjectType = 2;
var gDocumentLockTimeoutInterval = 15;// in seconds

// The next variables are for the display of loading icon
var gPerformingSave = false;// Whether we are currently performing save
var gLoadingIsVisible = false;
var gIsActionAsync = false;
var gLoadingDivId = 'P-Ajax-Loading-Image';


var gActionReloadContainerActionsId = 5;
var gActionReloadContainer = 74;
var gActionRemoveInstanceId = 3;
var gActionRemoveInstanceWithoutContainerReload = 36;
var gActionMassDeleteId = 133;

var gLastItemClass = 'lastItem';
var gInstanceFieldNameSeparator = '__';

var gInstanceEditMode = 1;
var gInstanceViewMode = 2;

var gUnlockOperationCode = 2;

var gFocus 		 = 'JS-Focus';
var gInputHolder = 'P-Input-Holder';

var gLeftContainerClass = "P-Wrapper-Container-Left";
var gLeftContainerClassHide = "P-Wrapper-Container-Left-Hide";
var gMiddleContainerClass = "P-Wrapper-Container-Middle";
var gRightContainerClass = "P-Wrapper-Container-Right";
var gRightContainerClassHide = "P-Wrapper-Container-Right-Hide";
var gDashboardDocumentsHolderClass = "P-Content-Dashboard-Holder";

var gArticleStructuresHolderClass = "P-Article-Structures";
var gActivityFeedHolderClass = "P-Activity-Fieed-Wrapper";
var gSelectedOptionClass = 'P-Select-Value';

var gFiguresHolderId = "document_figures_holder";
var gTablesHolderId = "document_tables_holder";
var gSupFilesHolderId = "document_sup_files_holder";
var gEndnotesHolderId = "document_endnotes_holder";

var gReferencesHolderId = "document_references_holder";
var gReferencesCitationPreviewId = "document_reference_citation_preview";

var gInputRightActionsHolder = 'P-Instance-Right-Actions';
var gInputWrapHolder = 'P-Input-With-Background';

var gCommentPreviewElementClass = 'P-Preview-Comment';
var gActiveCommentTextClass  = 'Active-Comment-Text';

var POPUP_OPERS = { 'close': 0, 'open': 1 };

var gActiveClass = 'P-Active';

var gUploadFileNameHolderClass = 'P-File-Name';

var gPreviewIframeId = 'previewIframe';
var gBaloonId = 'ArticleBaloon';

var gCurrentDialog = null;

var gCitationFlag = 0;

var gCKEditorConfigs = {};

var gInstanceCitations = {};

var gAutoSaveFlag = 0;

var gInstancesBeingLoaded = [];

var gCKEditorsBeingLoaded = [];

var gPageIsUnloading = true;

var gCurrentInlineCKEInstanceName = '';

window.addEventListener("beforeunload", function (e) {
  gPageIsUnloading = true;
// return null; //Webkit, Safari, Chrome etc.
});

// window.onbeforeunload = function(pEvent) {
// gPageIsUnloading = true;
// var lResult = temp();
// return lResult;
// };

$(window).on('load', function () {
    $('#tipsframe').on('load', function () {
        $('#tips_title').text($('a.selected', $('#tipsframe').contents()).text().trim());
    });

});

function SaveCKEditorConfig(pTextareaId, pConfig){
	gCKEditorConfigs[pTextareaId] = pConfig;
}

function MarkCKEditorAsLoading(pTextareaId){
	var lElementIdx = jQuery.inArray( pTextareaId, gCKEditorsBeingLoaded);
	if(lElementIdx < 0){
		gCKEditorsBeingLoaded.push(pTextareaId);
	}
}

function MarkCKEditorAsLoaded(pTextareaId){
	var lElementIdx = jQuery.inArray( pTextareaId, gCKEditorsBeingLoaded);
	if(lElementIdx >= 0){
		gCKEditorsBeingLoaded.splice(lElementIdx, 1);
	}
}

function GetLoadingCKEditorIds(){
	return gCKEditorsBeingLoaded;
}

function GetLoadingCKEditorsCount(){
	var lEditors = GetLoadingCKEditorIds();
	return lEditors.length;
}

function ReloadCKEditor(pTextareaId){
	MarkCKEditorAsLoading(pTextareaId);
	CKEDITOR.replace(pTextareaId, gCKEditorConfigs[pTextareaId]);
	var lEditor = CKEDITOR.instances[pTextareaId];
	lEditor.on('focus', function(pEvent){
		$(pEvent.editor.container.$).closest('.P-Data-Resources-Textarea').addClass('P-Editor-With-Focus');
	});
	lEditor.on(LITE.Events.INIT, function(event) {
		if(typeof triggerPreviewAppLiteEditorInited != 'undefined'){
			triggerPreviewAppLiteEditorInited(lEditor);
		}
	}.bind(this));
	
	lEditor.on(LITE.Events.TRACKING, function(event) {
		if(typeof triggerPreviewAppLiteEditorTrackChange != 'undefined'){
			triggerPreviewAppLiteEditorTrackChange(lEditor);
		}
	}.bind(this));
	
	if(checkIfPreviewAppIsEnabled()){
		var appContentChannel = Backbone.Radio.channel('content');
		appContentChannel.on("change:tracking:changed", function(tracking, editor){
			if(editor !== lEditor){
				var lite = lEditor.plugins.lite.findPlugin(lEditor);
				lite.toggleTracking(tracking, false);
			}
		});
	}
	

	lEditor.on('blur', function(pEvent){
		$(pEvent.editor.container.$).closest('.P-Data-Resources-Textarea').removeClass('P-Editor-With-Focus');
	});



}

/**
 * Returns whether there are unresolved changes in the document or not
 * @returns {Boolean}
 */
function checkForUnresolvedChanges(){
	var instanceFieldToSkipInPreview = {};
	//Check in the editors of the advanced edit popup
	var re = new RegExp('^(\\d+)' + gInstanceFieldNameSeparator + '(\\d+)_textarea$');
	for(id in CKEDITOR.instances){
		if(!id){
			continue;
		}
		

		var matches = id.match(re);
		if(!matches){
			//Not a field ckeditor
			continue;
			
		}
		var instanceId = matches[1];
		var fieldId = matches[2];
		if(!instanceFieldToSkipInPreview[instanceId]){
			instanceFieldToSkipInPreview[instanceId] = [];
		}
		instanceFieldToSkipInPreview[instanceId].push(fieldId);

		var editor = CKEDITOR.instances[id];
		var lite = editor.plugins && editor.plugins.lite && editor.plugins.lite.findPlugin 
			&& editor.plugins.lite.findPlugin(editor);
		if(!lite){
			continue;
		}	
		if(lite.countChanges({verify: true})){			
			return true;
		}
	}
	if(checkIfPreviewAppIsEnabled()){
		var appGlobalChannel = Backbone.Radio.channel('global');
		return appGlobalChannel.request.call(appGlobalChannel, "document:has:unprocessed:changes", instanceFieldToSkipInPreview);		
	}
	return false;
}

function SetupCKEditorIframeCitationElementsSelectionEvents(pEditor){
	var lEditorIframe = $(pEditor.window.$.frameElement);

	lEditorIframe.contents().bind('mouseup', function(pEvent){
		RepairCKEditorIframeCitationElementsSelection(lEditorIframe, 'mouseup');
	});
	lEditorIframe.contents().bind('keyup', function(pEvent) {
		RepairCKEditorIframeCitationElementsSelection(lEditorIframe, 'keyup');
	});
	lEditorIframe.contents().bind('keydown', function(pEvent) {
		RepairCKEditorIframeCitationElementsSelection(lEditorIframe, 'keydown');
	});
	lEditorIframe.contents().bind('selectionchange', function(pEvent) {
		RepairCKEditorIframeCitationElementsSelection(lEditorIframe, 'selectionchange');
	});
}

function RepairCKEditorIframeCitationElementsSelection(pEditorIframe, pEvent){
	var lIframe = pEditorIframe[0];
	if(!lIframe)
		return false;
	var lSelection = rangy.getIframeSelection(lIframe);
	if(!lSelection.isCollapsed){
		return;
	}
	var lAnchorNode = lSelection.anchorNode;
	var lPossibleParents = $(lAnchorNode).parents('reference-citation,tbls-citation,fig-citation,sup-files-citation,endnote-citation,cite');

	// pri referencite samo ako trygnem da pi6em togava ni izhvyrlq ot
	// referenciqta
	var lRefCitation = $(lAnchorNode).parents('reference-citation');
	if((pEvent == 'mouseup' || pEvent == 'selectionchange')) {
		return;
	}

	if(!lPossibleParents.length){
		return;
	}
	var lParent = lPossibleParents.first()[0];

	var lEmptyTextNode = lParent.nextSibling;
	var lCharToBeginSelectionOn = 1;
	var lFollowingTextNodeFound = false;
	var lTempNode = lParent.nextSibling;
	while(lTempNode){
		if($(lTempNode).text().length > 0){
			lFollowingTextNodeFound = true;
			break;
		}
		lTempNode = lTempNode.nextSibling;
	}
	if(!lFollowingTextNodeFound){
		var lNbspNode = lParent.ownerDocument.createTextNode(String.fromCharCode(160));
		if(!lParent.nextSibling){
			lEmptyTextNode = lParent.parentNode.appendChild(lNbspNode);
		}else{
			lEmptyTextNode = lParent.parentNode.insertBefore(lNbspNode, lParent.nextSibling);
		}
	}else{
		lEmptyTextNode = GetNextTextNode(lParent);
		while(!lEmptyTextNode.nodeValue.length){
			lEmptyTextNode = GetNextTextNode(lEmptyTextNode);
		}
	}

	lSelection.collapse(lEmptyTextNode, lCharToBeginSelectionOn);
}

function ShowPapertypeGroups(){	
	var inputs = $('input[name="papertype_id"]');
	var prevVal = '';
	for(var i = 0; i < inputs.length; ++i){
		var currentInput = inputs[i];
		var currentGroupName = $(currentInput).attr('group_name');
		if(currentGroupName == prevVal){
			continue;
		}
		prevVal = currentGroupName;
		// remove prev <br>
		$( currentInput ).prev('br').remove();
		$( currentInput ).before( '<div class="papertype-group">' + currentGroupName + '</div>' );	
	}
}

function ShowPapertypeGroupsHeading(){	
	var inputs = $('input[name="papertype_id"]');
	var prevVal = '';
	var wrapDiv = $('<div class="papertype-group-container" />');
	
	for(var i = 0; i < inputs.length; ++i){
		var currentInput = inputs[i]; 
		var currentGroupName = $(currentInput).attr('group_name');
		var currentGroupId = $(currentInput).attr('group_id');
		if(currentGroupName == prevVal){
			continue;
		}
		prevVal = currentGroupName;
		
		// remove prev <br>
		$('input[group_name="'+currentGroupName+'"]').prev('br').remove();
		
		
		$('input[group_name="'+currentGroupName+'"]').next('label').andSelf().wrapAll(wrapDiv);
		$( currentInput ).before('<h4 class="group_'+ currentGroupId +'">' + currentGroupName + '</h4>');
		
		$('input[group_name="'+currentGroupName+'"]').nextAll('label').andSelf().wrapAll('<ul class="wrapper_ul">');
// $('input[group_name="'+currentGroupName+'"]').nextAll('label').andSelf().wrap('<li>');
// $('input[group_name="'+currentGroupName+'"]').nextAll('label').andSelf().wrap('<li>');
	}
	
}

function reloadCaptcha() {
	var img = document.getElementById('cappic');
	img.src = '/lib/frmcaptcha.php?rld=' + Math.random();
	return false;
}

function MoveInstanceInTreeCallbackWithParentRefresh(pInstanceId, pAjaxResult){
	if(pAjaxResult['err_cnt']){
		alert(pAjaxResult['err_msg']);
		return;
	}
	var lParentInstanceId = pAjaxResult['parent_id'];
	ChangeInstanceMode(GetDocumentId(), lParentInstanceId, null, null, gInstanceEditMode);
}

function MoveInstanceInTreeCallback(pInstanceId, pAjaxResult){
	if(pAjaxResult['err_cnt']){
		alert(pAjaxResult['err_msg']);
		return;
	}
	var lSwapInstanceId = pAjaxResult['swap_id'];
	var lOriginalInstanceWrapper = $('#instance_wrapper_' + pInstanceId).closest('.container_item_wrapper');
	var lSwapInstanceWrapper = $('#instance_wrapper_' + lSwapInstanceId).closest('.container_item_wrapper');

	if(lOriginalInstanceWrapper.hasClass(gLastItemClass)){
		lSwapInstanceWrapper.addClass(gLastItemClass);
		lOriginalInstanceWrapper.removeClass(gLastItemClass);
	}else if(lSwapInstanceWrapper.hasClass(gLastItemClass)){
		lSwapInstanceWrapper.removeClass(gLastItemClass);
		lOriginalInstanceWrapper.addClass(gLastItemClass);
	}

	if(!lOriginalInstanceWrapper.length || !lSwapInstanceWrapper.length)
			return;

	var lOriginalIdxLabel = $('#instance_idx_label_' + pInstanceId);
	var lSwapIdxLabel = $('#instance_idx_label_' + lSwapInstanceId);

	if(lOriginalIdxLabel.length > 0 && lSwapIdxLabel.length > 0){
		var lOriginalIdx = lOriginalIdxLabel.html();
		var lSwapIdx = lSwapIdxLabel.html();

		lOriginalIdxLabel.html(lSwapIdx);
		lSwapIdxLabel.html(lOriginalIdx);

	}

	// Mouseout и mouseover event-ите ги слагаме за показваме/скриваме екшъните
	// отдясно
	$('#instance_wrapper_' + pInstanceId).trigger('mouseout');

	var lOriginalEditors = DestroyElementEditors(lOriginalInstanceWrapper);
	var lSwapEditors = DestroyElementEditors(lSwapInstanceWrapper);

	var lOriginalClone = lOriginalInstanceWrapper.clone(1, 1);
	var lSwapClone = lSwapInstanceWrapper.clone(1, 1);

	lOriginalInstanceWrapper.replaceWith(lSwapClone);
	lSwapInstanceWrapper.replaceWith(lOriginalClone);

	for(var i in lOriginalEditors){
		var lTextareaId = i;
		$('#' + lTextareaId).val(lOriginalEditors[lTextareaId])
// console.log(lTextareaId + ' ' + $('#' + lTextareaId).val());
		ReloadCKEditor(lTextareaId);
	}
	for(var i in lSwapEditors){
		var lTextareaId = i;
		$('#' + lTextareaId).val(lSwapEditors[lTextareaId])
// console.log(lTextareaId + ' ' + $('#' + lTextareaId).val());
		ReloadCKEditor(lTextareaId);
	}



	$('#instance_wrapper_' + lSwapInstanceId).trigger('mouseover');

	handleMovementLinksDisplay(pInstanceId, pAjaxResult['original_available_move_up'], pAjaxResult['original_available_move_down']);
	handleMovementLinksDisplay(lSwapInstanceId, pAjaxResult['swap_available_move_up'], pAjaxResult['swap_available_move_down']);


}
/**
 * Destroys all the ckeditors in the specified element and removes all the
 * script tags in it
 * 
 * @param pJQElement
 * @returns an object with all the textareas in the element along with their
 *          contents so that the ckeditors can be easily recreated
 */
function DestroyElementEditors(pJQElement){
	lResult = {};
	pJQElement.find('textarea').each(function(pIdx, pElement){
		var lTextareaId = pElement.id;
		var lEditorInstance = CKEDITOR.instances[lTextareaId];
		if(lEditorInstance){
			lEditorInstance.updateElement();
// console.log(lTextareaId, lEditorInstance.getData())
			lEditorInstance.destroy(true);
			lResult[lTextareaId] = $(pElement).val();
			$(pElement).hide();
// console.log(lTextareaId + 'A ' + $('#' + lTextareaId).val());
		}
	});


	pJQElement.find('script').each(function(pIdx, pElement){
		$(pElement).remove();
	});
	return lResult;
}

function handleMovementLinksDisplay(pInstanceId, pAllowMoveUp, pAllowMoveDown){
	if(pAllowMoveUp){
		$('#move_up_link_instance_' + pInstanceId).show();
		$('#move_up_right_link_instance_' + pInstanceId).show();
	}else{
		$('#move_up_link_instance_' + pInstanceId).hide();
		$('#move_up_right_link_instance_' + pInstanceId).hide();
	}

	if(pAllowMoveDown){
		$('#move_down_link_instance_' + pInstanceId).show(); 
		$('#move_down_right_link_instance_' + pInstanceId).show();
	}else{
		$('#move_down_link_instance_' + pInstanceId).hide();
		$('#move_down_right_link_instance_' + pInstanceId).hide();
	}
}


function ChangeInstanceMode(pDocumentId, pInstanceId, pRootInstanceId, pLevel, pMode){
	if(!pRootInstanceId){
		pRootInstanceId = GetRootInstanceId();
	}
	if(!pRootInstanceId){
		pRootInstanceId = pInstanceId;
	}

	if(!pLevel){
		pLevel = getInstanceLevel(pInstanceId);
	}
	if(!pDocumentId || !pInstanceId || !pRootInstanceId || !pLevel){
		return;
	}
	pInstanceId = parseInt(pInstanceId, 10);
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType : 'json',
		async : false,
		data :{
			action : 'display_instance_contents',
			document_id : pDocumentId,
			instance_id : pInstanceId,
			root_instance_id : pRootInstanceId,
			level : pLevel,
			mode : pMode
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			var lHtml = pAjaxResult['html'];
			var lInstanceWrapper = $('#instance_wrapper_' + pInstanceId);
			lInstanceWrapper.before(lHtml);
			lInstanceWrapper.remove();
			
			loadLazyImages( $('#instance_wrapper_' + pInstanceId));
		}
	});
}

function openReferenceForEditInPopUp(pDocumentId, pInstanceId, pRootInstanceId, pLevel, pMode){
	if(!pRootInstanceId){
		pRootInstanceId = GetRootInstanceId();
	}
	var gReferenceParentInstanceId = getReferenceParentInstanceId();
	if(!pLevel){
		pLevel = getInstanceLevel(pInstanceId);
	}
	if(!pDocumentId || !pInstanceId || !pRootInstanceId || !pLevel){
		return;
	}
	createPopUpForEditReference(gReferenceParentInstanceId, gReferenceObjectId, pInstanceId);
}

function changeFocus( pOper, pEl ){
	switch( pOper ){
		case 1:
			$( pEl ).closest( '.' + gInputHolder ).addClass( gFocus );
			// $( pEl ).attr( 'fldattr', 1 );
			break;
		case 2:
			// $( pEl ).attr( 'fldattr', 0 );
			$( pEl ).closest( '.' + gInputHolder ).removeClass( gFocus );
			break;
		default:
			break;
	}
}

/*
 * За дизайн на селектите pOper: 0 - НЯМА Ajax 1 - ИМА Ajax ( ако при смяна на
 * селекта той се замества с идентичен с AJAX трябва да се инитне наново )
 */

designSelect = function( pSelectId, pOper ){
	this.lSelect = $( '#' + pSelectId );
	this.lSelectId = pSelectId;
	this.init( pOper );
};

designSelect.prototype.init = function( pOper ){
	var lThis = this;

	$('#' + lThis.lSelectId).siblings( '.' + gSelectedOptionClass ).html( $('#' + lThis.lSelectId).find( "option:selected" ).text() );
	if( !pOper ){
		lThis.lSelect.bind( 'change', function(){lThis.init(1); } );
	}
};


/**
 * Изпълняваме даден екшън за даден инстанс.
 * 
 * Ако се подадат повече от 2 параметъра - те автоматично ще се добавят към
 * заявката за изпълняване на реалното (php) действие и ще отговарят на
 * ключовете addparam_1, add_param2, ...
 * 
 * @param pActionId
 * @param pInstanceId
 */
function executeAction(pActionId, pInstanceId){
	if(!pActionId || !pInstanceId){
		return false;
	}
	var lParameters = new Array();
	var lCallback = '';
	var lEvalReturnType = 0;
	var lHasErrors = 0;
	var lActionIsRecursive = false;

	if(gLoadingIsVisible){
		lActionIsRecursive = true;
	}
	if(!lActionIsRecursive){
		showLoading();
	}
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType : 'json',
		async : false,
		data :{
			action : 'get_action_details',
			instance_id : pInstanceId,
			action_id : pActionId
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				lHasErrors = 1;
				return;
			}
			var screenSize = getScreenSize();
			if((screenSize.height - 300) < 500){
				$('#newElementPopupContent').css('max-height', screenSize.height - 300);
			}

			lParameters = pAjaxResult['parameters'];
			lCallback = pAjaxResult['callback'];
			lEvalReturnType = pAjaxResult['eval_return_type'];
		}
	});
	if(lHasErrors > 0){
		return;
		if(!lActionIsRecursive){
			hideLoading();
		}
	}
	var lDataForAjax = {
		instance_id : pInstanceId,
		action_id : pActionId,
		document_id : GetDocumentId()
	};

	lForm = $('form[name="' + gActiveInstanceFormName + '"]:visible');
	if(!lForm.length){
		lForm = $('form[name="' + gDocumentFormName + '"]');
	}

	for(var lParameterName in lParameters){
	    var lInputName = lParameters[lParameterName]['input_name'];
	    lDataForAjax[lParameterName] = getFormFieldValueByName(lForm.attr('name'), lInputName);
	}

	for(var i = 2; i < arguments.length; ++i){
		lDataForAjax['add_param' + (i - 1)] = arguments[i];
	}

	$.ajax({
		url : gActionAjaxSrv,
		dataType : lEvalReturnType,
		async : gIsActionAsync,
		data :lDataForAjax,
		success : function(pAjaxResult){
			gIsActionAsync = false;
			var lTempFunction = new Function("pAjaxResult", "lDataForAjax", "pInstanceId", "pActionId", lCallback);
			lTempFunction(pAjaxResult, lDataForAjax, pInstanceId, pActionId);
			if(!lActionIsRecursive){
				hideLoading();
			}
			if(lDataForAjax['add_param1'] && (pActionId == 3 || pActionId == gActionMassDeleteId || pActionId == 113) && $('.P-Taxon-Materials-DownLoadHolder')) {
				ShowDownloadMaterialsLink(lDataForAjax['add_param1']);
			}
			loadLazyImages( $('#instance_wrapper_' + pInstanceId));
			// eval(lCallback);
		},
		error: function () {
			gIsActionAsync = false;
		}
	});

}

function getInstanceLevel(pInstanceId){
	var lInstance = $('#instance_wrapper_' + pInstanceId);
	return lInstance.attr('level');
}

function GetInstanceMode(pInstanceId){
	var lInstance = $('#instance_wrapper_' + pInstanceId);
	return lInstance.attr('mode');
}

function GetDocumentId(){
	if(gDocumentId){
		return gDocumentId;
	}
	return getFormFieldValueByName(gDocumentFormName, 'document_id');
}

function GetRootInstanceId(){
	return getFormFieldValueByName(gActiveInstanceFormName, 'instance_id');
}

function getFormFieldValueByName(pFormName, pName){
	if($('form[name="' + pFormName + '"] input:radio[name="' + pName + '"]').length){// radio
    	return $('form[name="' + pFormName + '"] input:radio[name="' + pName + '"]:checked').val();
    }else if($('form[name="' + pFormName + '"] input:checkbox[name="' + pName + '[]"]').length){// checkbox
    	var lCheckboxes = $('form[name="' + pFormName + '"] input:checkbox[name="' + pName + '[]"]:checked');
    	var lResult = new Array();
    	for(var i = 0; i < lCheckboxes.length; ++i){
    		lResult.push($(lCheckboxes[i]).val());
    	}
    	return lResult;
    }else if($('form[name="' + pFormName + '"] input[name="' + pName + '[]"]').length){// checkbox
    	var lInputs = $('form[name="' + pFormName + '"] input[name="' + pName + '[]"]');
    	var lResult = new Array();
    	for(var i = 0; i < lInputs.length; ++i){
    		lResult.push($(lInputs[i]).val());
    	}
    	return lResult;
    }else if($('form[name="' + pFormName + '"] select[name="' + pName + '[]"]').length){// mselect
    	return $('form[name="' + pFormName + '"] select[name="' + pName + '[]"]').val();
    }else if($('form[name="' + pFormName + '"] select[name="' + pName + '"]').length){// select
    	return $('form[name="' + pFormName + '"] select[name="' + pName + '"]').val();
    }else if($('form[name="' + pFormName + '"] input[name="' + pName + '"]').length){
    	return $('form[name="' + pFormName + '"] input[name="' + pName + '"]').val();
    }else if($('form[name="' + pFormName + '"] textarea[name="' + pName + '"]').length){
    	return $('form[name="' + pFormName + '"] textarea[name="' + pName + '"]').val();
    }
}


function addFieldAction(pName, pEvent, pActionJs){
	var pFormName = gActiveInstanceFormName;
	var lSelector = false;
	if($('form[name="' + pFormName + '"] input:radio[name="' + pName + '"]').length){// radio
		lSelector = 'input:radio[name="' + pName + '"]';
    }else if($('form[name="' + pFormName + '"] input:checkbox[name="' + pName + '[]"]').length){// checkbox
    	lSelector = 'input:checkbox[name="' + pName + '[]"]';
    }else if($('form[name="' + pFormName + '"] input:hidden[name="' + pName + '[]"]').length){// checkbox
    	lSelector = 'input:hidden[name="' + pName + '[]"]';
    }else if($('form[name="' + pFormName + '"] select[name="' + pName + '[]"]').length){// mselect
    	lSelector = 'select[name="' + pName + '[]"]';
    }else if($('form[name="' + pFormName + '"] select[name="' + pName + '"]').length){// select
    	lSelector = 'select[name="' + pName + '"]';
    }else if($('form[name="' + pFormName + '"] input[name="' + pName + '"]').length){
    	lSelector = 'input[name="' + pName + '"]';
    }else if($('form[name="' + pFormName + '"] textarea[name="' + pName + '"]').length){
    	lSelector = 'input[name="' + pName + '"]';
    }
	if(!lSelector){
		return false;
	}
	var lTempFunction = new Function('pThis', 'pEvent', pActionJs);
	$('form[name="' + pFormName + '"]').off(pEvent, lSelector);
	$('form[name="' + pFormName + '"]').bind(pEvent, lSelector, function(pEvent){
		var _this = $('form[name="' + pFormName + '"]').find(lSelector);
		if(!_this.length){
			return;
		}
		
		lTempFunction(_this[0], pEvent);
	});
	if(pEvent == 'load'){
		$(window).ready(function () {			
			lTempFunction($('form[name="' + pFormName + '"]').find(lSelector)[0], pEvent);			
		});

	}
}

gStopAutoSaveInstance = 0;
function SaveInstance(pInstanceId, pModeAfterSuccessfulSave, pCallbackOnSuccess, pInPopup, pCallbackOnError){
	lForm = $('form[name="' + gActiveInstanceFormName + '"]:visible');
	if(!lForm.length){
		lForm = $('form[name="' + gDocumentFormName + '"]');
	}

	// alert('test');
	// console.log(2345);

	var lRootInstanceId = GetRootInstanceId();
	var lLevel = getInstanceLevel(pInstanceId);
	gPerformingSave = true;
	lForm.ajaxSubmit({
		'dataType' : 'json',
// 'async' : false,
		'url' : gSaveInstanceSrv,
		'root_instance_id' : pInstanceId,
		'data' : {
			'real_instance_id' : pInstanceId,
			'root_instance_id' : lRootInstanceId,
			'level' : lLevel,
			'get_instance_html' : 1,
			'mode_after_successful_save' : pModeAfterSuccessfulSave,
			'in_popup': pInPopup
		},
		'success' : function(pAjaxResult){
			if(!pAjaxResult['action_is_successful']){
				alert(pAjaxResult['err_msg']);
				if(pAjaxResult['validation_err_cnt']){// Ако има грешка при
														// валидацията -
														// показваме наново
														// обекта с маркираните
														// грешки
					$('#instance_wrapper_' + pInstanceId).replaceWith(pAjaxResult['instance_html']);
				}
				if(pCallbackOnError){

					pCallbackOnError();
				}
			}else{// Ако всичко е OK - трябва да сменим action-ите на
					// контейнера и да сменим mode-a на обекта на view
				if(!pCallbackOnSuccess){					
					// ChangeInstanceMode(lDocumentId, pInstanceId,
					// lRootInstanceId, lLevel, pModeAfterSuccessfulSave);
					var $lInstanceWrapper = $('#instance_wrapper_' + pInstanceId);
					$lInstanceWrapper.before(pAjaxResult['instance_html']);
					$lInstanceWrapper.remove();
					executeAction(27, pAjaxResult['parent_instance_id'], pAjaxResult['container_id'], lRootInstanceId);
					gStopAutoSaveInstance = 1;
				}else{					
					pCallbackOnSuccess(pAjaxResult);
				}
			}
			gPerformingSave = false;
		},
		'error' : function(pJQXHR, pTextStatus, pErrorThrown){
			NotifyUserForFailedSave(1);
		}
	});
}

/* Изтриване на plate/photo */
function DeleteFigure(pDocId, pPlateId, pPhotoId) {
	if (confirm(LANG['js.pwt.confirm.delete'])) {
		$.ajax({
			url : gFiguresAjaxSrv,
			dataType: 'json',
			data :{
				action : 'delete_plate_photo',
				plate_id : pPlateId,
				photo_id : pPhotoId,
				document_id : pDocId,
			},
			success : function(pAjaxResult){
				if(pAjaxResult['result'] == 1) {
					// hiding deleted item
					var figure = (pPhotoId) ? pPhotoId : pPlateId;

					// Махаме и предходната понеже и тя може да се е променила -
					// ajax srv-то трябва да ни я върне и нея
					$('#P-Figures-Row-' + figure).hide('slow', function(){
						$('#P-Figures-Row-' + figure + ' ~ tr').remove(); // Махаме
																			// всички
																			// след
																			// изтритата
						$('#P-Figures-Row-' + figure).prev('tr').remove(); // Махаме
																			// всички
																			// след
																			// изтритата
						$(pAjaxResult['html']).insertAfter('#P-Figures-Row-' + figure);	// Добавяме
																						// ги
																						// отново
																						// с
																						// ъпдейтната
																						// позиция
						$('#P-Figures-Row-' + figure).remove(); // Махаме
																// изтритата,
																// която е
																// скрита в
																// момента
					});

					/*
					 * if($('#P-Document-Figures-Container >
					 * tbody:last').length) { // updating prev and next row
					 * before hiding var row = $('#P-Figures-Row-' +
					 * figure).closest("tr"); var prevRowId =
					 * row.prev('.P-Data-Table-Holder').find("input[name*='plate_photo_id']").val();
					 * if(prevRowId) UpdateDocumentFiguresHolder(prevRowId,
					 * 'P-Figures-Row-' + prevRowId, 0,
					 * parseInt(pAjaxResult['curr_position']) - 1,
					 * pAjaxResult['max_position'],
					 * pAjaxResult['min_position']); // update moved row var
					 * nextRowId =
					 * row.next('.P-Data-Table-Holder').find("input[name*='plate_photo_id']").val();
					 * if(nextRowId) UpdateDocumentFiguresHolder(nextRowId,
					 * 'P-Figures-Row-' + nextRowId, 0,
					 * parseInt(pAjaxResult['curr_position']),
					 * pAjaxResult['max_position'],
					 * pAjaxResult['min_position']); // update moved row }
					 * $('#P-Figures-Row-' + figure).hide('slow', function(){
					 * $('#P-Figures-Row-' + figure).remove(); });
					 */
				}
			}
		});
	}
}

/* Изтриване на table */
function DeleteTable(pTableId, pDocId) {
	if (confirm(LANG['js.pwt.confirm.delete'])) {
		$.ajax({
			url : gFiguresAjaxSrv,
			dataType: 'json',
			data :{
				action : 'delete_table',
				table_id : pTableId,
				document_id : pDocId,
			},
			success : function(pAjaxResult){
				if(pAjaxResult['result'] == 1) {
					$('#P-Table-Row-' + pTableId).hide('slow', function(){
						$('#P-Table-Row-' + pTableId + ' ~ div').remove(); // Махаме
																			// всички
																			// след
																			// изтритата
						$('#P-Table-Row-' + pTableId).prev('div').remove(); // Махаме
																			// предхподната
						$(pAjaxResult['updated_tables']).insertAfter('#P-Table-Row-' + pTableId);	// Добавяме
																									// ги
																									// отново
																									// с
																									// ъпдейтната
																									// позиция
						$('#P-Table-Row-' + pTableId).remove(); // Махаме
																// изтритата,
																// която е
																// скрита в
																// момента
					});
				}
			}
		});
	}
}

/* Местене на таблици */
function MoveTableUpDown(pThis, pDocId, pPosition, pDirection) {

	var curTableId = $(pThis).parents(".P-Data-Resources-Control:first").find("input[name*='table_id']").val();

	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'move_table',
			position : pPosition,
			direction : pDirection,
			document_id : pDocId,
			table_id : curTableId,
		},
		success : function(pAjaxResult){
			if(pAjaxResult) {
				if(pAjaxResult['html'] == 1) {
					var row = $(pThis).parents(".P-Data-Resources-Control:first");
					if ($(pThis).is(".section_arrow_up")) {
						var prevTableId = row.prev('.P-Data-Resources-Control').find("input[name*='table_id']").val();
						UpdateDocumentTableHolder(curTableId, 'P-Table-Row-' + curTableId, 1, pAjaxResult['new_position'], pAjaxResult['max_position'], pAjaxResult['min_position']); // update
																																														// moved
																																														// row
						UpdateDocumentTableHolder(prevTableId, 'P-Table-Row-' + prevTableId, 1, pAjaxResult['curr_position'], pAjaxResult['max_position'], pAjaxResult['min_position']); // update
																																															// prev
																																															// row

						row.fadeOut(500);
						row.prev().fadeOut(500);
						setTimeout(function(){
							row.prev().fadeIn(500);
							row.insertBefore(row.prev()).fadeIn(1000);
						}, 500);
					} else {
						var nextTableId  = row.next('.P-Data-Resources-Control').find("input[name*='table_id']").val();

						UpdateDocumentTableHolder(curTableId, 'P-Table-Row-' + curTableId, 1, pAjaxResult['new_position'], pAjaxResult['max_position'], pAjaxResult['min_position']); // update
																																														// moved
																																														// row
						UpdateDocumentTableHolder(nextTableId, 'P-Table-Row-' + nextTableId, 1, pAjaxResult['curr_position'], pAjaxResult['max_position'], pAjaxResult['min_position']); // update
																																															// prev
																																															// row

						row.fadeOut(500);
						row.next().fadeOut(500);
						setTimeout(function(){
							row.next().fadeIn(500);
							row.insertAfter(row.next()).fadeIn(1000);
						}, 500);
					}
				}
			}
		}
	});
}

/* Местене на фигурите */
function MoveFigureUpDown(pThis, pPhotoId, pDocId, pPosition, pDirection, pPlateFlag) {
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'move_plate_photo',
			position : pPosition,
			direction : pDirection,
			photo_id : pPhotoId,
			document_id : pDocId,
			plate_flag : pPlateFlag
		},
		success : function(pAjaxResult){

			if(pAjaxResult['html'] == 1) {
				var row = $(pThis).parents("tr:first");
				if ($(pThis).is(".section_arrow_up")) {
					var prevRowId = row.prev('.P-Data-Table-Holder').find("input[name*='plate_photo_id']").val();
					UpdateDocumentFiguresHolder(pPhotoId, 'P-Figures-Row-' + pPhotoId, 0, pAjaxResult['new_position'], pAjaxResult['max_position'], pAjaxResult['min_position']); // update
																																													// moved
																																													// row
					UpdateDocumentFiguresHolder(prevRowId, 'P-Figures-Row-' + prevRowId, 0, pAjaxResult['curr_position'], pAjaxResult['max_position'], pAjaxResult['min_position']); // update
																																														// prev
																																														// row
					row.fadeOut(500);
					row.prev().fadeOut(500);
					setTimeout(function(){
						row.prev().fadeIn(500);
						row.insertBefore(row.prev()).fadeIn(1000);
					}, 500);
				} else {
					var nextRowId = row.next('.P-Data-Table-Holder').find("input[name*='plate_photo_id']").val();
					UpdateDocumentFiguresHolder(pPhotoId, 'P-Figures-Row-' + pPhotoId, 0, pAjaxResult['new_position'], pAjaxResult['max_position'], pAjaxResult['min_position']); // update
																																													// moved
																																													// row
					UpdateDocumentFiguresHolder(nextRowId, 'P-Figures-Row-' + nextRowId, 0, pAjaxResult['curr_position'], pAjaxResult['max_position'], pAjaxResult['min_position']); // update
																																														// next
																																														// row
					row.fadeOut(500);
					row.next().fadeOut(500);
					setTimeout(function(){
						row.next().fadeIn(500);
						row.insertAfter(row.next()).fadeIn(1000);
					}, 500);
				}
			}
		}
	});
}

function ShowRegSuccess() {
	$.ajax({
		url: '/register.php',
		type : 'POST',
		data : {
			success: 1
		},
		success: function(pAjaxResult){
			$.modal.close();
				$('.loginFormRightCol').html(pAjaxResult);
		}
	});
	return false;
}

function deleteDocumentById( pDocumentId, pPage ) {
	if (confirm("Are you sure you want to delete this document?")) {
		$.ajax({
			url: gDeleteDocumentSrv,
			dataType : 'json',
			type : 'POST',
			async : false,
			data : {
				document_id: pDocumentId,
				p: pPage,
			},
			success: function(pAjaxResult){
				if(pAjaxResult["result"] == 1){
					// $('.' +
					// gDashboardDocumentsHolderClass).html(pAjaxResult["html"]);
					var lUrl = document.URL;
					window.location = lUrl;
				}else{
				}
			}
		});
	}
}


function deleteDocumentByIdNoConfirmation(pDocumentId, pPage, pRealDelete) {	
		$.ajax({
			url: gDeleteDocumentSrv,
			dataType : 'json',
			type : 'POST',
			async : false,
			data : {
				document_id: pDocumentId,
				p: pPage,
				real_delete: pRealDelete
			},
			success: function(pAjaxResult){
				if(pAjaxResult["result"] == 1){					
					window.location = gCreateDocumentPageUrl;
				}
			}
		});
}

/**
 * unlock на документ
 */
function unlock_document() {
	var lDocumentId = GetDocumentId();
	if(lDocumentId){
		$.ajax({
			url : gLockDocumentAjaxSrv,
			dataType : 'json',
			async : false,
			data : {
				document_id : lDocumentId,
				action : 'unlock_document'
			},
			success : function(){

			}

		});
	}
}

function AutoSendDocumentLockSignal(){
	var lDocumentId = GetDocumentId();
	if(!lDocumentId){
		return;
	}
	setInterval(function(){
			$.ajax({
				url : gLockDocumentAjaxSrv,
				dataType : 'json',
				async : true,
				data : {
					document_id : lDocumentId,
					action : 'autolock_document'
				},
				success : function(pAjaxResult){
					if(pAjaxResult['err_cnt'] > 0){
						alert(pAjaxResult['err_msg']);
						window.location.href = '/preview.php?document_id=' + lDocumentId;
					}
					if(pAjaxResult['document_is_auto_unlocked']){
						window.location.href = '/document_auto_unlocked.php?document_id=' + lDocumentId;
					}
				}
			});
		}, gDocumentLockTimeoutInterval * 1000
	);
}

function resizeMiddleContainer(){
	var lArticleHeight = $('.' + gArticleStructuresHolderClass).outerHeight();
	var lActivityFeedHeight = $('.' + gActivityFeedHolderClass).outerHeight();

	if(lActivityFeedHeight){ // Това може да е сетнато само на dashboard
								// страницата, a там нямаме articleMenu
		lArticleHeight = lActivityFeedHeight;
	}
// $('.' + gMiddleContainerClass).css('min-height', lArticleHeight + 80 + 'px');
}

var gLeftColHide = 0;
function toggleLeftContainer(){
	if( gLeftColHide ){ // show left column
		gLeftColHide = 0;
		$('.' + gLeftContainerClass).removeClass(gLeftContainerClassHide);
		$('.' + gMiddleContainerClass).removeClass(gLeftContainerClassHide);
		$('.P-Article-Buttons.P-Bottom').show();
		setShowHideContainer( 1, 1 );
	}else{				// hide left column
		gLeftColHide = 1;
		$('.' + gLeftContainerClass).addClass(gLeftContainerClassHide);
		$('.' + gMiddleContainerClass).addClass(gLeftContainerClassHide);
		$('.P-Article-Buttons.P-Bottom').hide();
		setShowHideContainer( 1, 0);
	}
}

var gRightColHide = 0;
function toggleRightContainer(){
	if( gRightColHide ){ // show right column
		gRightColHide = 0;
		$('.' + gRightContainerClass).removeClass(gRightContainerClassHide);
		$('.' + gMiddleContainerClass).removeClass(gRightContainerClassHide);
		setShowHideContainer( 2, 1 );
	}else{				 // hide right column
		gRightColHide = 1;
		$('.' + gRightContainerClass).addClass(gRightContainerClassHide);
		$('.' + gMiddleContainerClass).addClass(gRightContainerClassHide);
		setShowHideContainer( 2, 0);
	}
}

function setShowHideContainer( pLeftOrRight, pShowOrHide ){
	$.ajax({
		url : gShowOrHideColumnSrv,
		async: false,
		dataType : 'json',
		data :{
			left_or_right : pLeftOrRight, /* 1 - Лява, 2 - Дясна */
			show_or_hide : pShowOrHide /* 1 - Hide, 0 - Showed */
		},
		success: function(AjaxResult){

		}
	});
}

function getInputFileValue( pInputFrom ){
	$(pInputFrom).siblings('.' + gUploadFileNameHolderClass).html($(pInputFrom).val());

}

function triggerClick( pId ){
	$('#' + pId).trigger('click');
}

/* POPUP */
function positionPopup(pFrameSrc, pHolderId, pDynamicWidth){
	var content = $("#" + pFrameSrc);
	var holder = $('#' + pHolderId);
	var screenSize = getScreenSize();
	var frameHeight = $(content).height();
	var cssTop = ((screenSize.height - frameHeight) / 2);
	
	var elJs = document.getElementById(pHolderId);
	var scrollsize = getScrollXY();
	if(pDynamicWidth) {
		content.css({
			width: '90%'
		});
		var frameWidth = $(content).width();
		var cssLeft = ((screenSize.width - frameWidth) / 2);
		if (screenSize.width > 601 && screenSize.width < 1600) {
			var vwidth = screenSize.width / 1.1 + 'px';
		} else if (screenSize.width > 1600) {
			var vwidth = screenSize.width / 1.5 + 'px';
		} else {
			var vwidth = 'auto';
		}
		holder.css({
			position: 'fixed',
			top: cssTop + 'px',
			left: cssLeft + 'px',
			right: cssLeft + 'px',
			//'min-height' : '200px'
			width: vwidth,
			margin: '0 auto'
		});
	} else {
		holder.css({
			position: 'fixed',
			top: cssTop + 'px',
			left: ((screenSize.width - elJs.offsetWidth) / 2 + scrollsize.x) + 'px',
			right: ((screenSize.width - elJs.offsetWidth) / 2 + scrollsize.x) + 'px'
			// 'min-height' : '200px'
		});
	}
}

function fixResizePopUp(pHolderId){
	var ld = new Date();
	var cd = new Date();
	var cm = window.outerWidth;
	var lm = window.outerWidth;

	window.onresize = function (event) {
		ld = new Date();
		ld.setTime(ld.getTime() + 500);
		cm = window.outerWidth;
	};
	function execAction() {
		if(lm != cm) {
			if(ld.getTime() < cd.getTime()) {
				lm = window.outerWidth;
				cm = window.outerWidth;
				if($('#' + pHolderId).is(':visible')){
					toggleLayer2('block', pHolderId);
				}
			}
		}
	}

	setInterval(function () {
		cd.setTime(new Date());
		execAction();
	}, 1);
}

function popUp(pOper, pFrameSrc, pHolderId, pDynamicWidth) {
	fixResizePopUp(pHolderId);
	var content = $("#" + pFrameSrc);
	var shadow = $('#layerbg');
	var holder = $('#' + pHolderId);
	var bodyOverflowData = $('body').data('overflow');
	if(!_.isArray(bodyOverflowData)){
		bodyOverflowData = [];
	}
	if(pOper == POPUP_OPERS.open && content.length) { // Open a pop-up iframe
		if(!$('#' + pHolderId).is(':visible')){
			bodyOverflowData.push($('body').css('overflow'))
			$('body').data('overflow', bodyOverflowData);
			$('body').css({'overflow' : 'hidden'});
		}
		toggleLayer2('block', pHolderId);
		content.show();
		positionPopup(pFrameSrc, pHolderId, pDynamicWidth);	
	} else if (pOper == POPUP_OPERS.close && typeof pFrameSrc != 'undefined') { // Close
																				// the
																				// pop-up
																				// iframe
		if(bodyOverflowData.length){
			$('body').css({'overflow' : bodyOverflowData.pop()});
		}
		
		shadow.hide();
		holder.hide();
	}
}

function getScreenSize() {
	var myHeight = 0; var myWidth = 0;
	if (window.innerWidth && window.innerHeight) {
		// Netscape & Mozilla
		myHeight = window.innerHeight;
		myWidth = window.innerWidth;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		// IE > 6
		myHeight = document.documentElement.clientHeight;
		myWidth = document.documentElement.clientWidth;
	} else if (document.body.offsetWidth && document.body.offsetHeight) {
		// IE = 6
		myHeight = document.body.offsetHeight;
		myWidth = document.body.offsetWidth;
	} else if (document.body.clientWidth && document.body.clientHeight) {
		// IE < 6
		myHeight = document.body.clientHeight;
		myWidth = document.body.clientWidth;
	}

	return { 'width': myWidth, 'height': myHeight };
}

function toggleLayer2(disp, pLayerObj, wdth) {
	var el = $('#' + pLayerObj);
	var elJs = document.getElementById(pLayerObj);
	var elbg = $('#layerbg');
	var bgheight = 0;

	if (disp == 'block') {
		var screensize = getScreenSize();
		var scrollsize = getScrollXY();
		// Layer formata
		$(el).show();
		mosopen = true;
		if(typeof wdth != "undefined"){
			$(el).css('width', wdth+'px');
		}

		$(el).css('left', ((screensize.width - elJs.offsetWidth)/2+scrollsize.x) + 'px');
		// Siviq fon za layer formata

		$(elbg).show();

		// tva e zaradi IE-to razbira se :)
		var docheight = parseInt(document.body.parentNode.offsetHeight);
		var bodyheight = parseInt(document.body.offsetHeight);
		bgheight = Math.max(Math.max(docheight, bodyheight), (screensize.height+scrollsize.y));
		$(elbg).css('height', parseInt(bgheight + 90)+'px');
		// $(elbg).css('top', '-100px');

		bgwidth = screensize.width+scrollsize.x;
		// $(elbg).css('width', parseInt(bgwidth)+'px');
		$(elbg).css('width', '100%');
                $(elbg).css('z-index', '9990');
	} else if (disp == 'none') {
		$(el).hide();
		$(elbg).hide();
		mosopen = false;
		$(el).css('width', '400px');
		$(el).html('');
		$(elbg).css('width', '10px');
	}
}

function getScrollXY() {
	var scrOfX = 0, scrOfY = 0;
	if( typeof( window.pageYOffset ) == 'number' ) {
		// Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
		// DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
		// IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}

	return { 'x': scrOfX, 'y': scrOfY };
}

popUpMenu = function( pMenuId ){
	$('#' + pMenuId).find('li').each(function(){
		$(this).bind('click', function(){
			$(this).siblings().removeClass(gActiveClass);
			$(this).addClass(gActiveClass);
		});
	});
};


plateAppearance = function( pClass , pDocId ){
	$("input[name*='" + pClass + "']").each(function(){
		$(this).bind('click', function(){
			ChangePlateAppearance($(this).val(), pDocId);
		});
	});
};

/* Change plate figures appearance */
function ChangePlateAppearance(pVal, pDocId, pPlateId) {
	var plateid = pPlateId;
	if(pPlateId) {
		$("input[name*='plate_id']").val(plateid);
	} else {
		plateid = $("input[name*='plate_id']").val();
	}
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'get_plate_apperance',
			plate_val : pVal,
			document_id: pDocId,
			plate_id: plateid
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			} else {
				if(plateid != 0) {
					UpdatePlateType(pDocId, plateid, pVal);
				}
				var lWrapper = $('.P-Plates-Holder');
				lWrapper.html(pAjaxResult['html']);
			}
		}
	});
}

/* List of figures form by document id */
function GetDocumentFigures( pDocId, pFiguresHolderId ) {
	if(pDocId) {
		$.ajax({
			url : gListFiguresAjaxSrv,
			dataType: 'json',
			async: false,
			data :{
				document_id: pDocId,
			},
			success : function(pAjaxResult){
				if(pAjaxResult['err_cnt']){
					alert(pAjaxResult['err_msg']);
					return;
				} else {
					var lWrapper = $('#' + pFiguresHolderId);
					lWrapper.html(pAjaxResult['html']);
				}
			}
		});
	}
}

/* List of tables form by document id */
function GetDocumentTables( pDocId, pTableHolderId ) {
	if(pDocId) {
		$.ajax({
			url : gListTablesAjaxSrv,
			dataType: 'json',
			async: false,
			data :{
				document_id: pDocId,
			},
			success : function(pAjaxResult){
				if(pAjaxResult['err_cnt']){
					alert(pAjaxResult['err_msg']);
					return;
				} else {
					var lWrapper = $('#' + pTableHolderId);
					lWrapper.html(pAjaxResult['html']);
				}
			}
		});
	}
}

/* List of endnotes form by document id */
function GetDocumentEndnotes(pDocId, pEndnoteHolderId) {
	if(pDocId) {
		$.ajax({
			url: gListEndnotesAjaxSrv,
			dataType: 'json',
			async: false,
			data: {
				document_id: pDocId,
			},
			success: function (pAjaxResult) {
				if(pAjaxResult['err_cnt']) {
					alert(pAjaxResult['err_msg']);
					return;
				} else {
					var lWrapper = $('#' + pEndnoteHolderId);
					lWrapper.html(pAjaxResult['html']);
				}
			}
		});
	}
}

function GetDocumentReferences(pDocId, pHolderId){
	if (pDocId) {
		$.ajax({
			async: false,
			url : gListReferencesAjaxSrv,
			dataType : 'json',
			data : {
				document_id : pDocId,
			},
			success : function(pAjaxResult) {
				if (pAjaxResult['err_cnt']) {
					alert(pAjaxResult['err_msg']);
					return;
				} else {
					var lWrapper = $('#' + pHolderId);
					lWrapper.html(pAjaxResult['html']);
				}
			}
		});
	}
}

function GetDocumentSupFiles(pDocId, pHolderId){
	if (pDocId) {
		$.ajax({
			async: false,
			url : gListSupFilesAjaxSrv,
			dataType : 'json',
			data : {
				document_id : pDocId,
			},
			success : function(pAjaxResult) {
				if (pAjaxResult['err_cnt']) {
					alert(pAjaxResult['err_msg']);
					return;
				} else {
					var lWrapper = $('#' + pHolderId);
					lWrapper.html(pAjaxResult['html']);
				}
			}
		});
	}
}

/* Update plate type */
function UpdatePlateType(pDocId, pPlateId, pPlateVal) {
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'update_plate_type',
			plate_id : pPlateId,
			plate_val : pPlateVal,
			document_id : pDocId,
		},
		success : function(pAjaxResult){
		}
	});
}

/* Change plate figures content */
function ChangeFiguresForm(pFormName, pDocumentId, pUpdateHolder, pClear, pShowEdit, pPhotoId, pPlateId, pCitation) {
	if(pClear == 1) {
		var lWrapper = $('.' + pUpdateHolder);
		lWrapper.html('');
		$("#plate_id_value").val('');
	} else {
		if(!pPhotoId)
			pPhotoId = 0;
		if(!pPlateId)
			pPlateId = 0;
		if(!pCitation)
			pCitation = 0;
		$.ajax({
			url : gFiguresAjaxSrv,
			dataType: 'json',
			data :{
				action : 'get_figures_form',
				form_name : pFormName,
				document_id : pDocumentId,
				photo_id : pPhotoId,
				plate_id : pPlateId,
				edit : pShowEdit,
				citation : pCitation
			},
			success : function(pAjaxResult){
				if(pAjaxResult['err_cnt']){
					alert(pAjaxResult['err_msg']);
					return;
				}

				var lWrapper = $('.' + pUpdateHolder);
				lWrapper.html(pAjaxResult['html']);

				$('ul#popUp_nav li').removeClass('P-Active');
				if(pFormName == 'video') {
					$('#P-PopUp-Figures-Title').html('Add video');
					var lAddToJs = '';
					if(pCitation){
						lAddToJs = 'gCurrentDialog.show();';
					}
					$("#P-Figures-Save-Button").hide();
					$("#save_video_btn").show();
					$("#save_video_btn").unbind('click').attr('onclick', "SaveVideoData(" + pPhotoId + ", 'video_link_field', " + pDocumentId + ", 'video_title_textarea'); popUp(POPUP_OPERS.close, 'add-figure-popup', 'add-figure-popup');" + lAddToJs);

					$('ul#popUp_nav li:first').next().next().addClass('P-Active');
				}else if(pFormName == 'plate') {
					$('#P-PopUp-Figures-Title').html('Add multiple images (plate)');
					$('ul#popUp_nav li:first').next().addClass('P-Active');
					$("#P-Figures-Save-Button").show();
					$("#save_video_btn").hide();

				}else if(pFormName == 'image') {
					$('#P-PopUp-Figures-Title').html('Add image');
					$("#P-Figures-Save-Button").show();
					$("#save_video_btn").hide();
					$('ul#popUp_nav li:first').addClass('P-Active');
				}
				// ~ var newclick = new Function(js);
			}
		});
	}
}

function ShowDialogOnClose(pCitationInputId) {
	var lCitationFlag = $(pCitationInputId).val();
	if(lCitationFlag == 1) {
		gCurrentDialog.show();
	}
}

/* image uploading with ajax */
function ajaxFileUpload(pBtnId, pImgDesc, pDocId, pUpdateHolder, pPicIdHolder, pPlateVal, pPref, pResize, pPosition) {

	var photoid = $("input[name*='" + pPicIdHolder + "']").val();
	var plateid = $("input[name*='plate_id']").val();
	var btnUpload = $('#' + pBtnId);

	var AjaxFileUpload = new AjaxUpload(btnUpload, {
		action: '/lib/UploadPhoto.php',
		responseType: 'json',
		name: 'uploadfile',
		hoverClass: 'UploadHover',
		data: {
			document_id: pDocId,
			// description: ($('#' + pImgDesc).val() ? $('#' + pImgDesc).val() :
			// ''),
			photo_id: photoid,
			image_pref: pPref,
			plateval: pPlateVal,
			position: pPosition,
			plateid: plateid,
		},
		onSubmit: function(file, ext){
			showLoading();
			var newphotoid = $("input[name*='" + pPicIdHolder + "']").val(); // get
																				// uploaded
																				// pic_id

			var plateid = 0;
			if(pResize) {
				plateid = 0;
			} else {
				plateid = $("input[name*='plate_id']").val();
			}
			var desc = $('#' + pImgDesc + '_photo').val();
			if(!desc || typeof(desc) == 'undefined') {
				desc = '';
			}
			AjaxFileUpload.setData({
					document_id: pDocId,
					description: desc,
					photo_id: newphotoid,
					image_pref: pPref,
					plateval: pPlateVal,
					position: pPosition,
					plateid: plateid,
			});

			 if (! (ext && /^(jpg|png|jpeg|gif)$/i.test(ext))){
				hideLoading();
				$('#' + pUpdateHolder).text('Only JPG, PNG or GIF files are allowed');
				return false;
			}
		},
		onComplete: function(file, response){
			hideLoading();
			if(response != 0 && !response['err_cnt']){
				$("input[name*='" + pPicIdHolder + "']").val(response['pic_id']);
				if(response['plate_id'] != 0)
					$("input[name*='plate_id']").val(response['plate_id']);
				if(pResize){

					var dims = jQuery.parseJSON(response['img_dims']); // get
																		// picture
																		// dimensions
																		// and
																		// resize
																		// container
					$('.P-Plate-Part').width(dims[0] + 20);
					$('.P-Plate-Part-WithPic').width(dims[0] + 20);
					$('.P-Plate-Part').height(dims[1] + 20);
					$('.P-Plate-Part-WithPic').height(dims[1] + 20);
					$('.P-Add-Plate-Holder').width(dims[0]);
					$('.P-Add-Plate-Holder').height(dims[1]);
					$("#uploaded_photo").attr("src", "/showfigure.php?filename=" + response['html'] + ".jpg");
					$('#' + pUpdateHolder).closest('.P-Plate-Part').removeClass('P-Plate-Part').addClass('P-Plate-Part-WithPic');
					$('#' + pUpdateHolder).html('<img id="uploaded_photo" src="/showfigure.php?filename=' + response['html'] + '.jpg"></img>');
					$("#uploaded_photo").attr("src","/showfigure.php?filename=" + response['html'] + ".jpg&" + Math.random()); // za
																																// da
																																// se
																																// refreshne
																																// snimkata
					if(response['pic_id']) { // update pic holder
						$('#P-Figures-Row-' + response['pic_id'] + ' .P-Picture-Holder').html('<img src="/showfigure.php?filename=c90x82y_' + response['pic_id'] + '.jpg&' + Math.random() + '"></img>');
					}
				} else {
					$('#' + pUpdateHolder).closest('.P-Plate-Part').removeClass('P-Plate-Part').addClass('P-Plate-Part-WithPic');
					$('#' + pUpdateHolder).html('<img  id="uploaded_photo_' + response['pic_id'] + '" src="/showfigure.php?filename=' + response['html'] + '.jpg"></img>');
					$("#uploaded_photo_" + response['pic_id']).attr("src","/showfigure.php?filename=" + response['html'] + ".jpg&" + Math.random()); // za
																																						// da
																																						// se
																																						// refreshne
																																						// snimkata
				}
			} else{
				if(response['err_msg']) {
					$('#' + pUpdateHolder).html(response['err_msg']);
				} else {
					$('#' + pUpdateHolder).html(LANG['js.error_uploading_file']);
				}
			}
		}
	});
}

/* Change image title */
function SavePicDetails(pTitleHolder, pPicIdHolder) {
	var photoid = $("input[name*='" + pPicIdHolder + "']").val();
	var title = $('#' + pTitleHolder).val();
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'save_pic_description',
			photo_id : photoid,
			photo_title : title,
		},
	});
}

/* Change plate description and photos text */
function SavePlateData(pDescHolder, pPlateHolder, pPhotoHolder, pFormName, pClear) {
	SyncCKEditors();
	var desc = $('#' + pDescHolder).val();
	var plateid = $("input[name*='" + pPlateHolder + "']").val();
	var photo_id = $("input[name*='" + pPhotoHolder + "']").val();

	if(!desc || desc == ''){
		alert('Caption is required');
		return false;
	}

	// updating all photo texts
	if(plateid) {
		var lFormData = $('form[name="' + pFormName + '"] textarea');
		jQuery.each(lFormData, function() {
			var textarea_photo_holder_id = $(this).attr("id");
			var textarea_photo_id = $(this).attr("name");
			SavePicDetails(textarea_photo_holder_id, 'picture_id_' + textarea_photo_id);
		});
	}

	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'save_plate_photo_details',
			plate_desc : desc,
			plate_id : plateid,
			photo_id : photo_id,
		},
		success : function(pAjaxResult){
			if(pAjaxResult) {
				// console.log((gPreviewMode == true));
				if(gPreviewMode == true){
					HandlePreviewModeCreateInstance();
					return;
				}
				gCitationFlag = $('#citation_flag').val();
				if(pClear == 1) {
					var lWrapper = $('.P-PopUp-Content-Inner');
					lWrapper.html('');
					$("input[name*='plate_id']").val('');
				}
				$('#P-Figures-Row-' + pAjaxResult + ' .P-Figure-Desc').html(desc);
				if(photo_id) {
					UpdateDocumentFiguresHolder(pAjaxResult, 'P-Document-Figures-Container', 1);
					// alert('The Figure is saved!');
					// TODO: implement the alert as a 'yellow fade'
					// http://37signals.com/svn/archives/000558.php
				} else if (plateid) {
					$("#plate_id_value").val('');
					UpdateDocumentFiguresHolder(pAjaxResult, 'P-Document-Figures-Container', 1);
					// alert('The Plate is saved!');
					// TODO: implement the alert as a 'yellow fade'
					// http://37signals.com/svn/archives/000558.php
				}

				if(gCitationFlag == 1) {
					gCurrentDialog.show();
				}
				$('.P-PopUp-Content-Inner').html('');
				popUp(POPUP_OPERS.close, 'add-figure-popup', 'add-figure-popup');
			}
		}
	});
}

/* Change plate desc */
function SavePlateDataAndUpdateFiguresPopUp(pDescHolder, pPlateHolder, pPhotoHolder, pFormName) {
	SyncCKEditors();
	var desc = $('#' + pDescHolder).val();
	var plateid = $("input[name*='" + pPlateHolder + "']").val();
	var photo_id = $("input[name*='" + pPhotoHolder + "']").val();

	// updating all photo texts
	if(plateid) {
		var lFormData = $('form[name="' + pFormName + '"] textarea');
		jQuery.each(lFormData, function() {
			var textarea_photo_holder_id = $(this).attr("id");
			var textarea_photo_id = $(this).attr("name");
			SavePicDetails(textarea_photo_holder_id, 'picture_id_' + textarea_photo_id);
		});
	}
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'save_plate_photo_details',
			plate_desc : desc,
			plate_id : plateid,
			photo_id : photo_id,
		},
		success : function(pAjaxResult){
			if(pAjaxResult) {
				if(gPreviewMode == true){
					HandlePreviewModeCreateInstance();
					return;
				}
				$('#P-Figures-Row-' + pAjaxResult + ' .P-Figure-Desc').html(desc);
				if(photo_id) {
					// alert('The Figure is saved!');
					// TODO: implement the alert as a 'yellow fade'
					// http://37signals.com/svn/archives/000558.php
				} else if (plateid) {
						$("#plate_id_value").val('');
					// alert('The Plate is saved!');
					// TODO: implement the alert as a 'yellow fade'
					// http://37signals.com/svn/archives/000558.php
				}
				// GetDocumentFigures(GetDocumentId());
				ShowDialogOnClose('#citation_flag');
				popUp(POPUP_OPERS.close, 'add-figure-popup', 'add-figure-popup');
				$('.P-PopUp-Content-Inner').html('');
				// gCurrentDialog.show();
			}
		}
	});
}

/* Show edit popup for table */
function ShowEditTablePopup(pTableId, pTableHolder) {
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'show_table_popup',
			table_id : pTableId,
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			// Update popup content
			$('.' + pTableHolder).html(pAjaxResult['html']);
			// Show tables popup
			popUp(POPUP_OPERS.open, 'add-table-popup', 'add-table-popup');
		}
	});
}

function ShowAddTablePopup(pDocumentId, pPopUpHolder, pShowInCitationControl) {
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'show_table_popup',
			document_id : pDocumentId,
			show_in_citation: pShowInCitationControl
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			// Update popup content
			$('#' + pPopUpHolder).find('.P-PopUp-Main-Holder').html(pAjaxResult['html']);
			// Show tables popup
			popUp(POPUP_OPERS.open, 'add-table-popup', 'add-table-popup');
		}
	});
}

function ShowAddEndnotePopup(pDocumentId, pPopUpHolder, pShowInCitationControl) {
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'show_endnote_popup',
			document_id : pDocumentId,
			show_in_citation: pShowInCitationControl
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			// Update popup content
			$('#' + pPopUpHolder).find('.P-PopUp-Main-Holder').html(pAjaxResult['html']);
			// Show tables popup
			popUp(POPUP_OPERS.open, 'add-endnote-popup', 'add-endnote-popup');
		}
	});
}

/* Add inserted table to content */
function UpdateDocumentTableHolder(pTableId, pTableHolder, pHtmlReplace, pCurrPosition, pMaxPosition, pMinPosition) {
	if(!pCurrPosition && !pMaxPosition && !pMinPosition)
		pCurrPosition = pMaxPosition = pMinPosition = 0;

	if(!pHtmlReplace)
		pHtmlReplace = 0;

	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'update_table_holder',
			table_id : pTableId,
			curr_position : pCurrPosition,
			max_position : pMaxPosition,
			full_html : pHtmlReplace ? 0 : 1,
			min_position : pMinPosition
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			if(!pHtmlReplace) {
				if($('#' + pTableHolder).length) {

					if(!$('#P-Table-Row-' + pTableId).length)
						$('#' + pTableHolder).append(pAjaxResult['html']); // append
																			// to
																			// table
					else
						$('#P-Table-Row-' + pTableId).replaceWith(pAjaxResult['html']);


					// var row =
					// $(pThis).parents(".P-Data-Resources-Control:first");

					var row = $('#P-Table-Row-' + pTableId).closest(".P-Data-Resources-Control");
					var prevRowId = row.prev('.P-Data-Resources-Control').find("input[name*='table_id']").val();
					if(prevRowId)
						UpdateDocumentTableHolder(prevRowId, 'P-Table-Row-' + prevRowId, 1, 0, 0, 0); // update
																										// moved
																										// row
				}
			} else {
				$('#' + pTableHolder).html(pAjaxResult['html']);
			}
		}
	});
}

/* Add created plate to content */
function UpdateDocumentFiguresHolder(pPhotoId, pFiguresHolder, pAppend, pCurrPosition, pMaxPosition, pMinPosition) {
	if(!pCurrPosition && !pMaxPosition && !pMinPosition)
		pCurrPosition = pMaxPosition = pMinPosition = 0;
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'update_figures_holder',
			photo_id : pPhotoId,
			append : pAppend,
			curr_position : pCurrPosition,
			max_position : pMaxPosition,
			min_position : pMinPosition
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}
			if (pAppend) {
				if($('#' + pFiguresHolder + ' > tbody:last').length) {
					if(!$('#P-Figures-Row-' + pPhotoId).length)
						$('#' + pFiguresHolder + ' > tbody:last').append(pAjaxResult['html']); // append
																								// to
																								// table
					else
						$('#P-Figures-Row-' + pPhotoId).replaceWith(pAjaxResult['html']);

					var row = $('#P-Figures-Row-' + pPhotoId).closest("tr");
					var prevRowId = row.prev('.P-Data-Table-Holder').find("input[name*='plate_photo_id']").val();
					if(prevRowId)
						UpdateDocumentFiguresHolder(prevRowId, 'P-Figures-Row-' + prevRowId, 0, 0, 0, 0); // update
																											// moved
																											// row
				}
			} else {
				$('#' + pFiguresHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function CloseTablePopUp(pTablePopUpHolder, pTableTitleHolder) {
	$('#' + pTableTitleHolder).val('');
	popUp(POPUP_OPERS.close, pTablePopUpHolder, pTablePopUpHolder);
}

function SyncCKEditors(){
// for(var lInstanceName in CKEDITOR.instances){
// var lInstance = CKEDITOR.instances[lInstanceName];
// if(lInstance && lInstance.document && lInstance.document.$ &&
// lInstance.document.$.defaultView){
// lInstance.updateElement();
// }
// }
}

function HandlePreviewModeDeleteInstance(pAjaxResult){
	var lQueryParams = getQueryParams(window.location.search);
	var lDeletedInstanceId = pAjaxResult['deleted_instance_id'];
	var lCurrentInstanceId = lQueryParams['instance_id'];
	var lCurrentDocumentId = lQueryParams['document_id'];
	ChangeInstanceMode(GetDocumentId(), pAjaxResult['parent_instance_id'], null, null, gInstanceEditMode);
// if(lDeletedInstanceId == lCurrentInstanceId){
// var lUrl = '/preview.php?document_id=' + lCurrentDocumentId;
// window.location.href = lUrl;
// }else{
// window.location.reload();
// }
}

function HandlePreviewModeCreateInstance(pAjaxResult){
	if(pAjaxResult){
		var lNewInstanceId = pAjaxResult['new_instance_id'];
		if(lNewInstanceId){
			var lQueryParams = getQueryParams(window.location.search);
			var lCurrentDocumentId = lQueryParams['document_id'];
			var lUrl = '/preview.php?document_id=' + lCurrentDocumentId + '&instance_id=' + lNewInstanceId;
// window.location.href = lUrl;
			return;
		}
	}
// window.location.reload();
}

function HandlePreviewModeMoveInstance(){
	window.location.reload();
}

function HandleActiveMenuAfterInstanceCreation(pAjaxResult){
	if(pAjaxResult){
		var lParentInstanceId = pAjaxResult['parent_instance_id'];
		if(lParentInstanceId){
			setMenuTabAsActive(1, lParentInstanceId);
		}
	}
}

/* Save table title */
function SaveTableData(pTitleHolder, pFormName, pDocumentId, pTableId) {
	var lFormData = $('form[name="' + pFormName + '"]');
	if($('#' + pTitleHolder).val() == ''){
		alert('Table caption is required');
		return false;
	}

	lFormData.ajaxSubmit({
		'dataType' : 'json',
		'url' : gFiguresAjaxSrv,
		'data' : {
			'action' : 'save_table_details',
			'document_id' : pDocumentId,
			'table_id' : pTableId,
		},
		'success' : function(pAjaxResult){
			if(gPreviewMode == true){
				HandlePreviewModeCreateInstance();
				return;
			}
			if(pAjaxResult['tableid']) { // Add
				UpdateDocumentTableHolder(pAjaxResult['tableid'], 'P-Document-Tables-Container');
			} else {  // Edit
				$('#P-Table-Row-' + pTableId + ' .P-Block-Title').html(pAjaxResult['table_title']);
			}
			// alert('Table is saved!');
			// TODO: implement the alert as a 'yellow fade'
			// http://37signals.com/svn/archives/000558.php
			$('#' + pTitleHolder).val('');
			popUp(POPUP_OPERS.close, 'add-table-popup', 'add-table-popup');
		}
	});
}

/* Save table */
function SaveTableDataAndRefreshTablesBaloon(pDocumentId, pTitleHolder, pDescHolder, pTableId) {
	var title = $('#' + pTitleHolder).val();
	var desc = $('#' + pDescHolder).val();
	if(!title || !desc) {
		// ~ alert('Content is empty');
		// ~ return;
	}
	if(!pTableId)
		pTableId = 0;
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'save_table_details',
			document_id : pDocumentId,
			table_title : title,
			table_id: pTableId,
			table_desc : desc,
		},
		success : function(pAjaxResult){
			if(pAjaxResult) { // Add
				// alert('Table is saved!');
				// TODO: implement the alert as a 'yellow fade'
				// http://37signals.com/svn/archives/000558.php
				// GetDocumentTables(GetDocumentId());
				$('#' + pTitleHolder).val('');
				popUp(POPUP_OPERS.close, 'add-table-popup', 'add-table-popup');
				gCurrentDialog.show();
			}
		}
	});
}


/* Save reference */
function SaveReferenceBaloon(pDocumentId) {
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'save_table_details',
			document_id : pDocumentId,
			table_title : title,
			table_id: pTableId,
			// ~ table_desc : desc,
		},
		success : function(pAjaxResult){
			if(pAjaxResult) { // Add
				// alert('Table is saved!');
				// TODO: implement the alert as a 'yellow fade'
				// http://37signals.com/svn/archives/000558.php
				gCurrentDialog.show();
				GetDocumentTables(GetDocumentId());
				$('#' + pTitleHolder).val('');
				popUp(POPUP_OPERS.close, 'add-table-popup', 'add-table-popup');
			}
		}
	});
}

/* add required field class */
function addReqClass(pEl, pClass, pValidClass, pReqClass) {

	$('#' + pEl).closest('div').removeClass(pClass);
	if(pValidClass) {
		$('#' + pEl).closest('div').removeClass(pValidClass);
	}

	$('#' + pEl).closest('div').addClass(pReqClass);

}

function addReqClassById(pEl, pClass, pValidClass, pReqClass) {
	$('#' + pEl).removeClass(pClass);
	$('#' + pEl).removeClass(pValidClass);
	$('#' + pEl).addClass(pReqClass);
}

/* add error field class */
function addErrorClass(pEl, pClass, pValidClass, pReqClass) {
	if(pValidClass) {
		$('#' + pEl).closest('div').removeClass(pValidClass);
	}

	if(pReqClass) {
		$('#' + pEl).closest('div').removeClass(pReqClass);
	}

	$('#' + pEl).closest('div').addClass(pClass);
}

function addErrorClassById(pEl, pClass, pValidClass, pReqClass) {
	$('#' + pEl).closest('div.' + pReqClass).addClass(pClass);
}

/* add validate field class */
function removeErrorClass(pEl, pClass, pValidClass, pReqClass) {
	$('#' + pEl).closest('div.' + pReqClass).removeClass(pClass);
}

articleMenu = function( pMenuId, pShowBtnClass, pHideBtnClass ){
	this.m_Menu = $('#' + pMenuId);
	this.m_Show = pShowBtnClass;
	this.m_Hide = pHideBtnClass;

	this.init();
};

articleMenu.prototype.init = function(){
	var lThis = this;

	// Показваме
	$(this.m_Menu).find('.' + lThis.m_Show).each(function(){
		$(this).bind('click', function(){
			lThis.showSubMenu(this);
		});
	});
	// Крием
	$(this.m_Menu).find('.' + lThis.m_Hide).each(function(){
		$(this).bind('click', function(){
			lThis.hideSubMenu(this);
		});
	});
};

articleMenu.prototype.hideSubMenu = function( pObj ){
	var lThis = this;
	$(pObj).closest('li').children('ul').hide();
	$(pObj).removeClass(lThis.m_Hide)
		   .addClass(lThis.m_Show)
		   .unbind('click')
		   .bind('click', function(){
				lThis.showSubMenu(pObj);
			});
	resizeMiddleContainer();
	setMenuTabAsActive( 0, $(pObj).closest('li').attr('id') );
};

articleMenu.prototype.showSubMenu = function( pObj ){
	var lThis = this;

	$(pObj).closest('li').children('ul').show();
	$(pObj).removeClass(lThis.m_Show)
		   .addClass(lThis.m_Hide)
		   .unbind('click')
		   .bind('click', function(){
				lThis.hideSubMenu(pObj);
			});
	resizeMiddleContainer();
	setMenuTabAsActive( 1, $(pObj).closest('li').attr('id') );
};

function setMenuTabAsActive( pIsActive, pTabId ){
	$.ajax({
		url : gActiveMenuTabSrv,
		async: false,
		dataType : 'json',
		data :{
			tab_id : pTabId,
			is_active : pIsActive
		},
		success: function(AjaxResult){

		}
	});
}

function selectAuthor(pActionId, pAuthorNameSearchId, pAuthorId){
	executeAction(pActionId, pAuthorNameSearchId, pAuthorId);
	return;

	var lAuthorNameSearch = $('#instance_wrapper_' + pAuthorNameSearchId);
	var lAuthorWrapper = lAuthorNameSearch.parent().closest('*[id^="instance_wrapper_"]');


	var lInputs = lAuthorWrapper.find('input[type=text]').not(lAuthorNameSearch.find('input[type=text]'));
	var lSelects = lAuthorWrapper.find('select').not(lAuthorNameSearch.find('select'));
	var lAuthorIsModified = false;
	for(var i = 0; i < lInputs.length; ++i){
		if($(lInputs[i]).val() != ''){
			lAuthorIsModified = true;
			break;
		}
	}
	if(!lAuthorIsModified){
		for(var i = 0; i < lSelects.length; ++i){
			if($(lSelects[i]).val() != ''){
				lAuthorIsModified = true;
				break;
			}
		}
	}
	if(lAuthorIsModified){
		if(confirm('Are you sure you want to overwrite the current data?')){
			executeAction(pActionId, pAuthorNameSearchId, pAuthorId);
		}
	}else{
		executeAction(pActionId, pAuthorNameSearchId, pAuthorId);
	}
}



function resizePreviewIframe(pIframeId){
	var lIframe = $('#'+ pIframeId);
	if(!lIframe.length){
		return;
	}
	var lIframeContentHeight = lIframe.contents().find('body').height();
	var lHeight = lIframeContentHeight + 20;	
	var lIframeOffsetTop = lIframe.offset().top;
	var lWinHeight = $(window).height();
	if(Math.abs(lIframeOffsetTop) > lIframeContentHeight - lWinHeight && lIframeContentHeight > lWinHeight){
		lIframeOffsetTop = Math.sign(lIframeOffsetTop) * (lIframeContentHeight - lWinHeight);
	}
	var lMinHeight = $(window).height() - lIframeOffsetTop;
	if(lHeight < lMinHeight){
		lHeight = lMinHeight;
	}
	lIframe.height(lHeight);	
	lIframe.show();
}

// Този обект ще реализира сърч селекта от подаден скрит селект
var gSearchOpened = 0;
searchDropDown = function( pObjId, pOptionsHolder ){
	this.m_Search = $('#' + pObjId);
	this.m_Select = $('#' + pObjId).find('select');
	this.m_SelectedOption = $('#' + pObjId).find('.P-Option-Selected');
	this.m_SelectOptionsHolder = $('#' + pOptionsHolder);
	this.m_SelectOptionClass = 'P-Search-Option';
	this.m_SelectOptionsHolderMiddle = 'P-Options-Middle';
	this.init();
};

searchDropDown.prototype.init = function(){
	var lThis = this;
	var lOption = '';
	lThis.m_SelectedOption.html( lThis.m_Select.find( 'option:selected' ).text() );

	lThis.m_Select.find( 'option' ).each(function(){
		lOption = '<div class="' + lThis.m_SelectOptionClass + '">' + $(this).text() + '</div>';
		lThis.m_SelectOptionsHolder.find('.' + lThis.m_SelectOptionsHolderMiddle).append(lOption);
	});

	$(document).click(function(){
		if(gSearchOpened)
			lThis.hideDropDown();
	});

	lThis.m_SelectOptionsHolder.find('.' + lThis.m_SelectOptionsHolderMiddle).find('.' + lThis.m_SelectOptionClass).each(function(){
		$(this).bind('click', function(event){
			event.stopPropagation();
			var lOptionText = $(this).text();
			lThis.m_SelectedOption.text(lOptionText);
			lThis.m_Select.find( 'option:selected' ).attr('selected', false);
			lThis.m_Select.find( 'option' ).each(function(){
				if( $(this).text() == lOptionText ){
					$(this).attr('selected', 'selected');
				}
			});
			lThis.hideDropDown();
		});
	});

	lThis.m_Search.bind('click', function(event){
		event.stopPropagation();
		lThis.showDropDown();
	});
};

searchDropDown.prototype.showDropDown = function(){
	gSearchOpened = 1;
	this.m_SelectOptionsHolder.show();
};

searchDropDown.prototype.hideDropDown = function(){
	gSearchOpened = 0;
	this.m_SelectOptionsHolder.hide();
};

function toggleClassOnMiddleContainer(pOper, pClass){
	if( pOper == 1 )
		$('.' + gMiddleContainerClass ).addClass(pClass);
	else
		$('.' + gMiddleContainerClass ).removeClass(pClass);
}

function fixEditorMaximizeBtn(pEditor){
	var lJqueryContainer = $(pEditor.container.$);
	var lMaximizeButton = lJqueryContainer.find('.cke_button_maximize');
	var lToolbar = lMaximizeButton.closest('.cke_toolbar');
	lToolbar.addClass('cke_maximizeToolbox');
}

function changeTabbedElementActiveTab(pInstanceId, pTabbedElementId, pActiveItemId){
	if(!pActiveItemId){
		return;
	}
	var lTabbedElement = $('#tabbed_element_' + pInstanceId + '_' + pTabbedElementId);

	var lPrevActiveItemId = lTabbedElement.attr('active_item_id');
	lTabbedElement.attr('active_item_id', pActiveItemId);
	$('#tabbed_element_' + pInstanceId + '_' + pTabbedElementId + '_active_item').val(pActiveItemId);

	var lActiveItem = lTabbedElement.find('#tabbed_element_item_wrapper_' + pInstanceId + '_' + pTabbedElementId + '_' + pActiveItemId);
	var lElementItems = lTabbedElement.find('.tabbedElementItem');

	// Правим смяната на предишния активен елемент с колбек за да няма
	// примигване
	// (за да може докато се извърши зареждането на новия активен елемент да
	// показваме
	// предишния активен елемент вместо да не показваме нищо
	if(lPrevActiveItemId){
		if(lPrevActiveItemId == pActiveItemId){
			return;
		}


		var lSaveCallbackFunction = function(pAjaxResult){
			ChangeInstanceMode(GetDocumentId(), pActiveItemId, null, null, gInstanceEditMode);
			lElementItems.not(lActiveItem).hide();
			var $lInstanceWrapper = $('#instance_wrapper_' + lPrevActiveItemId);
			$lInstanceWrapper.before(pAjaxResult['instance_html']);
			$lInstanceWrapper.remove();
		};
		SaveInstance(lPrevActiveItemId, gInstanceViewMode, lSaveCallbackFunction);
	}else{
		lElementItems.not(lActiveItem).hide();
		ChangeInstanceMode(GetDocumentId(), pActiveItemId, null, null, gInstanceEditMode);
	}





	lActiveItem.show({
		complete : function(){}
	});

	var lTabs = lTabbedElement.find('.tabbedElementTab');
	var lActiveTab = lTabbedElement.find('#tabbed_element_tab_holder_' + pInstanceId + '_' + pTabbedElementId + '_' + pActiveItemId);
	lTabs.not(lActiveTab).removeClass('P-Active');
	lActiveTab.addClass('P-Active');
}

function scrollToTabbedElementField(pTabbedInstanceId, pFieldId){

	var lTabbedElementId = $('#tabbed_element_id_' + pTabbedInstanceId).val();
// console.log(pTabbedInstanceId, pFieldId, lTabbedElementId);
	var lTabInstanceIdsList = new Array();
	var lFieldInstanceIdsList = new Array();
	$.ajax({
		url : gDocumentAjaxSrv,
		async: false,
		dataType : 'json',
		data :{
			action : 'get_tabbed_instances_with_specific_field_list',
			instance_id : pTabbedInstanceId,
			tabbed_element_id : lTabbedElementId,
			field_id : pFieldId
		},
		success: function(pAjaxResult){
			lTabInstanceIdsList = pAjaxResult['tab_instance_ids'];
			lFieldInstanceIdsList = pAjaxResult['field_instance_ids'];
		}
	});
	if(lTabInstanceIdsList.length == 0){
		return;
	}

	var lActiveTabInstanceId = $('#tabbed_element_' + pTabbedInstanceId + '_' + lTabbedElementId + '_active_item').val();
	var lFieldInstanceId = 0;
	var lElementIdx = jQuery.inArray( lActiveTabInstanceId, lTabInstanceIdsList);
	if( lElementIdx < 0){
		changeTabbedElementActiveTab(pTabbedInstanceId, lTabbedElementId, lTabInstanceIdsList[0]);
		lFieldInstanceId = lFieldInstanceIdsList[0];
	}else{
		lFieldInstanceId = lFieldInstanceIdsList[lElementIdx];
	}
	// Scroll to the field after all the ckeditors have been loaded because they
	// may change their height
	(function wait(){
	   if(GetLoadingCKEditorsCount() > 0){
	      return setTimeout(wait, 100);
	   }
	   scrollToField(lFieldInstanceId, pFieldId);
	 }());

// scrollToField(lFieldInstanceId, pFieldId);

}

function scrollToField(pInstanceId, pFieldId){
	var lItemWrapper = $('#field_wrapper_' + pInstanceId + '_' + pFieldId);
	if(!lItemWrapper.length)// Ако случайно не сме намерили елемента - край
			return;

	// Накрая скролваме до търсения елемент
	if(gActiveInstanceFormName == gPopupFormName){
		$('.P-PopUp-Content').animate({
		    scrollTop: lItemWrapper.offset().top - $('#newElementPopup').offset().top - parseInt($('#newElementPopup').css("border-top-width"))
		}, 20);
	}else{
		$('html, body').animate({
		    scrollTop: lItemWrapper.offset().top
		}, 20);
	}
	return false;
}



/**
 * Връща първия DOM node, който съдържа и 2та възела
 * 
 * @param pNodeA
 * @param pNodeB
 */
function getFirstCommonParent(pNodeA, pNodeB){
	if(!pNodeA || !pNodeB){
		return false;
	}
	if (checkIfNodesAreParentAndDescendent(pNodeA, pNodeB))// pNodeB е подвъзел
															// на pNodeA
		return pNodeA;

	if (checkIfNodesAreParentAndDescendent(pNodeB, pNodeA))// pNodeA е подвъзел
															// на pNodeB
		return pNodeB;

	var lParentsA = $(pNodeA).parents();
	var lParentsB = $(pNodeB).parents();
	// if( this.in_array(lParentsA, pNodeB ))
	// return pNodeB;
	for ( var i = 0; i < lParentsA.length; ++i) {
// if (jQuery.inArray(lParentsA[i], lParentsB) > -1)
// return lParentsA[i];
		if(lParentsB.filter(lParentsA.get(i)).length){
			return lParentsA.get(i);
		}
	}
}

/**
 * Връща 1 ако pNodeA е преди pNodeB в DOM-a. Ако двата node-a съвпадат - 0 и -1
 * в противен случай
 * 
 * @param pNodeA
 * @param pNodeB
 */
function compareNodesOrder(pNodeA, pNodeB){
	if (pNodeA === pNodeB)// Двата възела съвпадат
		return 0;
	var lCommonParent = getFirstCommonParent(pNodeA, pNodeB);

	// Гледаме дали някой от възлите не е подвъзел на другия
	if (lCommonParent === pNodeA) {
		return 1;
	} else if (lCommonParent === pNodeB) {
		return -1;
	}

	var lChildren = $(lCommonParent).contents();
	/*
	 * Проверката е коректна понеже lCommonParent е 1ят общ родител на 2та
	 * възела => едно от децата му съдържа pNodeA, а друго - pNodeB
	 */

	for ( var i = 0; i < lChildren.length; ++i) {
		var lCurrentChild = lChildren.get(i);
		if (lCurrentChild === pNodeA) {// TextNode
			return 1;
		}
		if (lCurrentChild === pNodeB) {
			return -1;
		}
		if (lCurrentChild.nodeType == 1) {
			if (checkIfNodesAreParentAndDescendent(lCurrentChild, pNodeA)) {
				return 1;
			}
			if (checkIfNodesAreParentAndDescendent(lCurrentChild, pNodeB)) {
				return -1;
			}
		}
	}
}

function hideElement(pElemClass) {
	$('.' + pElemClass).hide();
}


// Loop through elements in menu and show the list if it has warning class
function showAllWarningInstancesInMenu(pMenuId, pWarningClass) {
	$("#articleMenu li div").each(function(index) {
		if($(this).hasClass(pWarningClass)) {
			$(this).parents("ul").show();
		}
	});
}


var getDomNodeStyleProperty = function(pNode, pProperty){
	// Get the style of the node.
	// Assumptions are made here based on tagName.
	if(pNode.style[pProperty]){
		return pNode.style[pProperty];
	}
	var lStyle = pNode.currentStyle || pNode.ownerDocument.defaultView.getComputedStyle(pNode, null);
	if(pNode.tagName == "SCRIPT"){
		return "none";
	}
	if(!lStyle[pProperty]){
		return "LI,P,TR".indexOf(pNode.tagName) > -1
			? "block"
			: pNode.style[pProperty];
	}
	if(lStyle[pProperty] =="block" && pNode.tagName=="TD"){
		return "feaux-inline";
	}
	return lStyle[pProperty];
};

function checkIfDomNodeHasBlockDisplay(pDomNode){
	var blockTypeNodes = "table-row,block,list-item";
	// diaply:block or something else
	var lStyleDisplay = getDomNodeStyleProperty(pDomNode, "display") || "feaux-inline";
	if(blockTypeNodes.indexOf(lStyleDisplay) > -1){
		return true;
	}
	return false;
}

function checkIfUndefined(pParam){
	return typeof pParam === 'undefined' || pParam === null;
}

function checkIfNodesAreParentAndDescendent(pNodeA, pNodeB){
	if(pNodeA === pNodeB || checkIfUndefined(pNodeA) || checkIfUndefined(pNodeB)){
		return false;
	}
		
	var lParent = pNodeB.parentNode;
	while(lParent){
		if(lParent === pNodeA)
			return true;
		lParent = lParent.parentNode;
	}
	return false;
}

/**
 * Тази функция ще е аналогична на jquery функцията addClass, но ще работи за
 * всички атрибути, не само за клас. Ако подадената стойност вече е добавена -
 * не правим нищо.
 * 
 * @param pJQueryObject -
 *            jquery обекта, на който ще променяме атрибута
 * @param pAttributeName -
 *            името на атрибута
 * @param pValue -
 *            стойността, която добавяме
 */
function addAttributeValue(pJQueryObject, pAttributeName, pValue, pSeparator){
	if (typeof pSeparator == 'undefined'){
		pSeparator = ' ';
	}
	var lPreviousAttributeValue = pJQueryObject.attr(pAttributeName);
	if(!lPreviousAttributeValue){
		lPreviousAttributeValue = '';
	}
	// Ако стойността е вече добавенa - не правим нищо

	// Добавяме separator-a отпред и отзад за по-лесно търсене
	var lTemp = pSeparator + lPreviousAttributeValue + pSeparator;

	if(lTemp.indexOf(pSeparator + pValue + pSeparator) > -1){
		return;
	}



	// Добавяме стойността
	if(lPreviousAttributeValue.length == 0){
		pJQueryObject.attr(pAttributeName, pValue);
	}else{
		pJQueryObject.attr(pAttributeName, lPreviousAttributeValue + pSeparator + pValue);
	}

}

/**
 * Тази функция ще е аналогична на jquery функцията removeClass, но ще работи за
 * всички атрибути, не само за клас. Ако подадената стойност не е активна - не
 * правим нищо.
 * 
 * @param pJQueryObject -
 *            jquery обекта, на който ще променяме атрибута
 * @param pAttributeName -
 *            името на атрибута
 * @param pValue -
 *            стойността, която махаме
 * @param pSeparator -
 *            разделителя между стойностите. По подразбиране, а и в removeClass
 *            е интервал
 */
function removeAttributeValue(pJQueryObject, pAttributeName, pValue, pSeparator){
	if (typeof pSeparator == 'undefined'){
		pSeparator = ' ';
	}
	var lPreviousAttributeValue = pJQueryObject.attr(pAttributeName);
	if(!lPreviousAttributeValue){
		lPreviousAttributeValue = '';
	}
	// Ако стойността я няма - не правим нищо
	// Добавяме separator-a отпред и отзад за по-лесно търсене
	var lTemp = pSeparator + lPreviousAttributeValue + pSeparator;

	if(lTemp.indexOf(pSeparator + pValue + pSeparator) == -1){
		return;
	}

	// Изчисляваме новата стойност
	var lValues = lPreviousAttributeValue.split(pSeparator);
	var lNewValue = '';
	for(var i = 0; i < lValues.length; ++i){
		var lCurrentValue = lValues[i];
		if(lCurrentValue == pValue){
			continue;
		}
		if(lNewValue != ''){
			lNewValue += pSeparator;
		}
		lNewValue += lCurrentValue;
	}
	pJQueryObject.attr(pAttributeName, lNewValue);
}

function getIframeSelection(pIframeId){
	var lIframe = $('#' + pIframeId)[0];
	if(!lIframe)
		return false;
	var lSelection = rangy.getSelection(lIframe);
	return lSelection;
}

function checkAllSubPhotos(pChkObj){
	if( $(pChkObj).is(':checked') ){
		$(pChkObj).closest('tr').find('.P-Figure-InsertOnly').find(':checkbox').each(function(){
			$(this).attr('checked', 'checked').change();
		});
	}else{
		$(pChkObj).closest('tr').find('.P-Figure-InsertOnly').find(':checkbox').each(function(){
			$(this).removeAttr('checked').change();
		});
	}
}

function checkSiblingsIsChecked(pChkObj){
	var checked = 0;
	if( $(pChkObj).is(':checked') ){
		$(pChkObj).closest('tr').find('.P-PopUp-Checkbox-Holder').find(':checkbox').attr('checked', 'checked').change();
	}else{
		$(pChkObj).closest('tr').find('.P-Figure-InsertOnly').find(':checkbox').each(function(){
			if($(this).is(':checked'))
				checked = 1;
		});
		if(!checked){
			$(pChkObj).closest('tr').find('.P-PopUp-Checkbox-Holder').find(':checkbox').removeAttr('checked').change();
		}
	}
}

/**
 * Връща 1я възел от ДОМ-а, който е след подадения възел. Ако няма такъв възел 0
 * връша null;
 * 
 * @param pNode
 */
function getNextNode(pNode){
	while(pNode && !pNode.nextSibling){
		pNode = pNode.parentNode;
	}
	if(pNode)
		return pNode.nextSibling;
	return null;
}

function CancelNewReference(){
	var lNewReferenceId = $('form[name="new_reference_form"] input[name="instance_id"]').val();
	if(lNewReferenceId){
		executeAction(gActionRemoveInstanceWithoutContainerReload, lNewReferenceId, lNewReferenceId);
	}
	gActiveInstanceFormName = gDocumentFormName;
	gCurrentDialog.show();
	popUp(POPUP_OPERS.close, 'add-reference-popup', 'add-reference-popup');
}

function autoSaveDocument(pAutoSaveInterval){
	setTimeout("autoSaveInstance();autoSaveDocument("+pAutoSaveInterval+")", pAutoSaveInterval);
}

function autoSaveInstance(){
	var dfd = $.Deferred();
	lForm = $('form[name="' + gActiveInstanceFormName + '"]');

	if(!lForm.length){
		dfd.reject();
		return dfd.promise();
	}
	var lRootInstanceId = GetRootInstanceId();
	if(!lRootInstanceId){
		dfd.reject();
		return dfd.promise();
	}
	var lLevel = getInstanceLevel(lRootInstanceId);
	lForm.ajaxSubmit({
		'dataType' : 'json',
		'url' : gSaveInstanceSrv,
		'root_instance_id' : lRootInstanceId,
		'data' : {
			'real_instance_id' : lRootInstanceId,
			'root_instance_id' : lRootInstanceId,
			'level' : lLevel,
			'auto_save_on' : 1
		},
		'success' : function(pAjaxResult){
			if(!pAjaxResult['action_is_successful']){
				NotifyUserForFailedSave();
				dfd.reject();
			}else{
				dfd.resolve();
			}
		},
		'error' : function(pJQXHR, pTextStatus, pErrorThrown){
			dfd.reject();
			NotifyUserForFailedSave();
		}
	});
	return dfd.promise();
}

function PerformSingleFieldAutosave(pInstanceId, pFieldId){
	var lRootInstanceId = GetRootInstanceId();
	var lLevel = getInstanceLevel(lRootInstanceId);
	var lForm = $('form[name="' + gActiveInstanceFormName + '"]');
	lForm.ajaxSubmit({
		'dataType' : 'json',
		'url' : gSaveInstanceSrv,
		'root_instance_id' : lRootInstanceId,
		'data' : {
			'real_instance_id' : pInstanceId,
			'root_instance_id' : lRootInstanceId,
			'document_id' : GetDocumentId(),
			'level' : lLevel,
			'explicit_field_id' : pFieldId,
			'auto_save_on' : 1
		},
		'success' : function(pAjaxResult){
			if(!pAjaxResult['action_is_successful']){
				NotifyUserForFailedSave();
			}else{

			}
		},
		'error' : function(pJQXHR, pTextStatus, pErrorThrown){
			NotifyUserForFailedSave();
		}
	});

}

function NotifyUserForFailedSave(pIsGeneralSave){
	if(gPageIsUnloading){// Request aborted by user
		return;
	}
	if(pIsGeneralSave){
		alert("Save failed due to one of the following reasons:\n\
				• Your login session has expired \n\
				• Internet connectivity problems \n\
				Please go to login or check your internet connectivity.");
	}else{
		alert("Autosave failed due to one of the following reasons:\n\
				• Your login session has expired \n\
				• Internet connectivity problems \n\
				Please go to login or check your internet connectivity.");
	}

}

function autoSaveField(pField){
	var lPattern = new RegExp("^(\\d+)__(\\d+)","i"); // С това взимаме ид на
														// инстанса и на филда

	$('#' + pField + ' :input').each(function(){
		$(this).unbind('blur').bind('blur', function(){
			var lFieldName = $(this).attr('name');
			var lMatch = lPattern.exec(lFieldName);
			if(lMatch !== null){
				PerformSingleFieldAutosave(lMatch[1], lMatch[2]);
			}
		});
	});

	$('#' + pField + ' select').each(function(){
		$(this).unbind('change').bind('change', function(){
			var lFieldName = $(this).attr('name');
			var lMatch = lPattern.exec(lFieldName);
			if(lMatch !== null){
				PerformSingleFieldAutosave(lMatch[1], lMatch[2]);
			}
		});
	});

	$('#' + pField + ' :checkbox, :radio').each(function(){
		$(this).unbind('click').bind('click', function(){
			var lFieldName = $(this).attr('name');
			var lMatch = lPattern.exec(lFieldName);
			if(lMatch !== null){
				PerformSingleFieldAutosave(lMatch[1], lMatch[2]);
			}
		});
	});
}

function openEmailPopup( pAppendToClass ){
	$.ajax({
		url : gDocumentAuthorsSrv,
		dataType : 'json',
		data :{
			document_id : GetDocumentId(),
		},
		success : function(pAjaxResult){
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg']);
				return;
			}else{
				$('.' + pAppendToClass).html(pAjaxResult['html']);
				popUp(POPUP_OPERS.open, 'compose-new-message', 'compose-new-message');
			}
		}
	});
}

function AddMailRecipients(pThis, pUsernameContainer, pTokenInputId) {
	var $this = $(pThis);

	if ($this.is(':checked')) {
		if(pThis.value) {
		var lUsername = $("#" + pUsernameContainer).html();
			$("#" + pTokenInputId).tokenInput("add", {id: pThis.value, name: lUsername});
		}

    } else {
		if(pThis.value) {
			var lUsername = $("#" + pUsernameContainer).html();
			$("#" + pTokenInputId).tokenInput("remove", {id: pThis.value, name: lUsername});
		}
    }
}

function toggleChecked(pHolder) {
	$("." + pHolder + " input").each( function() {
		$(this).attr("checked", true);
		$(this).trigger('onchange');
	});

}

function MarkInstanceRightActionsHolderAsNotInited(pInstanceId){
	$('#instance_right_actions_' + pInstanceId).attr('is_inited', 0);
}

function initInstanceRightActionsEvents(pInstanceId){
	$('#instance_wrapper_' + pInstanceId).hover(function(event){
		var lIsInited = $(this).attr('is_inited');
		if(!lIsInited){
			resizeInputByRightActions('instance_right_actions_' + pInstanceId);
			$(this).attr('is_inited', 1);
		}
		$(this).children('.P-Input-With-Background').children('.' + gInputRightActionsHolder).show();
	}, function(){
		$(this).children('.P-Input-With-Background').children('.' + gInputRightActionsHolder).hide();
	});
}

function resizeInputByRightActions( pRightActionsHolderId ){

	var lRightActions = $('#' + pRightActionsHolderId);
	var lActionsWidth = 0;

	lRightActions.find('div').each(function(){
		lActionsWidth += $(this).outerWidth();
	});

	if(lActionsWidth < 57)
		lActionsWidth = 57;

	var lActionsRightPos = lActionsWidth - 7;

	lRightActions.parent().parent().find('.'+gInputWrapHolder).css('margin-right', '-' + lActionsWidth + 'px');
	lRightActions.parent().parent().find('.'+gInputWrapHolder).css( 'padding-right', lActionsWidth + 'px');
	// ~ lRightActions.parent().parent().find('.' +
	// gInputRightActionsHolder).css( 'right', '-' + lActionsRightPos + 'px');
}

var gActivityFeedFooterHolder = 'P-Activity-Fieed-See-All-Recent-Activity';

function getNextActivityPage( pPageNum ){
	$.ajax({
		url : gActivitySrv,
		dataType : 'json',
		data :{
			p : pPageNum
		},
		success : function(pAjaxResult){
			if(!pAjaxResult){

			}else{
				$('.' + gActivityFeedFooterHolder).replaceWith(pAjaxResult['html']);
				resizeMiddleContainer();
			}
		}
	});
}

function displayDataPaperGeoCoverageCoodinatesFields(pInstanceId, pGlobalCoverageFieldHtmlIdentifier){	
	var lFieldValue = getFormFieldValueByName(gActiveInstanceFormName, pGlobalCoverageFieldHtmlIdentifier);	
	if(_.isUndefined(lFieldValue)){
		return;
	} 
	if(lFieldValue.length > 0){
		$('#container_' + pInstanceId + '_456').hide();
		$('#container_' + pInstanceId + '_457').hide();
	}else{
		$('#container_' + pInstanceId + '_456').show();
		$('#container_' + pInstanceId + '_457').show();
	}
}

function displayDataPaperTemporalCoverageFields(pInstanceId, pTemporalCoverageTypeFieldHtmlIdentifier){
	var lFieldValue = getFormFieldValueByName(gActiveInstanceFormName, pTemporalCoverageTypeFieldHtmlIdentifier);	
	if(_.isUndefined(lFieldValue)){
		return;
	} 
	var lContainerIds = new Array(609, 610, 611, 612);
	var lTypes = {
		1 : 609,
		2 : 610,
		3 : 611,
		4 : 612
	};
	for(var i = 0; i < lContainerIds.length; ++i){
		var lContainerId = lContainerIds[i];
		if(lTypes[lFieldValue] != lContainerId){
			$('#container_' + pInstanceId + '_' + lContainerId).hide();
			$('#container_' + pInstanceId + '_' + lContainerId).find('input').val('');
		}

	}
	$('#container_' + pInstanceId + '_' + lTypes[lFieldValue]).show();
}

/**
 * Тук получаваме масива с избраните стойности От него взимаме 1я елемент и
 * връщаме неговия руут
 * 
 * @param pClassification
 * @returns {Number}
 */
function getTaxonClassificationRoot(pClassification){
	if(!pClassification || !pClassification.length)
		return 0;
	var lSelectedClassification = parseInt(pClassification[0]);
	if(!lSelectedClassification){
		return 0;
	}
	var lRoot = 0;
	$.ajax({
		url : gDocumentAjaxSrv,
		async: false,
		dataType : 'json',
		data :{
			action : 'get_classification_root',
			selected_value : lSelectedClassification
		},
		success : function(pAjaxResult){
			lRoot = pAjaxResult['root'];
		}
	});
	return lRoot;
}


function displayTaxonTreatmentTerrestrialTypeFields(pTreatmentInstanceId){
	var lClassification = getFormFieldValueByName(gActiveInstanceFormName, pTreatmentInstanceId + gInstanceFieldNameSeparator + 41);
	var lRank = getFormFieldValueByName(gActiveInstanceFormName, pTreatmentInstanceId + gInstanceFieldNameSeparator + 42);
	var lTreatmentType = getFormFieldValueByName(gActiveInstanceFormName, pTreatmentInstanceId + gInstanceFieldNameSeparator + 43);

	var lContainerIds = [613, 269, 625, 614, 809, 810, 813, 814];
	var lSpecialContainerIds = [613, 809];	
	if(lRank == 2){
		// Genus treatment dont have all the following fields
		for(var i = 0; i < lContainerIds.length; ++i){
			$('#container_' + pTreatmentInstanceId + '_' + lContainerIds[i]).hide();
		}
	}else{
		for(var i = 0; i < lContainerIds.length; ++i){
			if(lSpecialContainerIds.indexOf(lContainerIds[i]) == -1){
				$('#container_' + pTreatmentInstanceId + '_' + lContainerIds[i]).show();
			}
		}
		if(lRank == 1 && lTreatmentType == 1){
			lClassificationRoot = getTaxonClassificationRoot(lClassification);
			if(lClassificationRoot == 7){				
				for(var i = 0; i < lSpecialContainerIds.length; ++i){
					$('#container_' + pTreatmentInstanceId + '_' + lSpecialContainerIds[i]).hide();
					var lRadioButtons = $('#container_' + pTreatmentInstanceId + '_' + lSpecialContainerIds[i]).find('input:radio');
					for(var i = 0; i < lRadioButtons.length; ++i){
						$(lRadioButtons[i]).prop('checked', false);
					}
				}				
				return;
			}
		}
		for(var i = 0; i < lSpecialContainerIds.length; ++i){
			$('#container_' + pTreatmentInstanceId + '_' + lSpecialContainerIds[i]).show();
		}
		
	}
}

function hideAnonymousReferenceAuthors(pAuthorsInstanceId){
	var lAuthorship = getFormFieldValueByName(gActiveInstanceFormName, pAuthorsInstanceId + gInstanceFieldNameSeparator + 503);
	var lContainer = $('#container_' + pAuthorsInstanceId + '_844');
	var lAnonymousAuthorship = 4;
	var lItemsToProcess = lContainer.find('.authors-holder,.authors-example, #container_actions_' + pAuthorsInstanceId + '_844')
	if(lAuthorship == lAnonymousAuthorship){
		lItemsToProcess.hide();
	}else{
		lItemsToProcess.show();
	}
}

function handleDataPaperResourcesDataSetCreation(pInstanceId){
	lDataSetsCount = getFormFieldValueByName(gActiveInstanceFormName, pInstanceId + gInstanceFieldNameSeparator + 342);
	lCurrentDataSetsCount = getFormFieldValueByName(gActiveInstanceFormName, pInstanceId + gInstanceFieldNameSeparator + 404);

	if(lCurrentDataSetsCount > lDataSetsCount){
		if(!confirm('Are you sure you want to delete data sets?')){
			// Връщаме старата стойност
			$('form[name="' + gActiveInstanceFormName + '"] select[name="' + pInstanceId + gInstanceFieldNameSeparator + 342 + '"]').val(lCurrentDataSetsCount);
			return;
		}
	}
	executeAction(64, pInstanceId, lDataSetsCount);
}

function handleDataPaperDataSetColumnsCreation(pInstanceId){
	lColumnsCount = getFormFieldValueByName(gActiveInstanceFormName, pInstanceId + gInstanceFieldNameSeparator + 400);
	lCurrentColumnsCount = getFormFieldValueByName(gActiveInstanceFormName, pInstanceId + gInstanceFieldNameSeparator + 403);

	if(lCurrentColumnsCount > lColumnsCount){
		if(!confirm('Are you sure you want to delete columns?')){
			// Връщаме старата стойност
			$('form[name="' + gActiveInstanceFormName + '"] select[name="' + pInstanceId + gInstanceFieldNameSeparator + 400 + '"]').val(lCurrentColumnsCount);
			return;
		}
	}
	executeAction(66, pInstanceId, lColumnsCount);
}
function ajaxSendMessage(pSubject, pRecipients, pEmailText) {
	var recipients = [];
	var email_text = $("#" + pEmailText).val();
	var email_subject = $("#" + pSubject).val();
	$("." + pRecipients).each(function(){
		recipients.push(this.value);
	});

	if(!email_text || !(recipients.length) || !email_subject) {
		alert('content is empty');
		return;
	} else {
		$.ajax({
			url : gSendEmailSrv,
			dataType : 'json',
			data :{
				recipients : recipients,
				email_body : email_text,
				subject : email_subject,
			},
			success : function(pAjaxResult){
				if(!pAjaxResult){
					alert('Error has occured!');
					return;
				}else{
					alert('Your message has been sent!');
					popUp(POPUP_OPERS.close, 'compose-new-message', 'compose-new-message');
				}
			}
		});

	}
}

function sortableMenu(pListId, pInstanceId) {
	$("#sortable_" + pListId + "_" + pInstanceId).sortable({
		axis: 'y',
		start: function(event, ui) {
			var start_pos_index = ui.item.index();
			ui.item.data('start_pos_index', start_pos_index);
		},
		update: function(event, ui) {
			var start_pos_index = ui.item.data('start_pos_index');
			var end_pos = $(ui.item).index();
			var end_pos_id = $(ui.item).attr("id");

			if(start_pos_index > end_pos) {
				if((start_pos_index - end_pos) == 1) {
					 // ~ mestim 1 put nagore
					executeAction(1, end_pos_id);
					HandlePreviewModeMoveInstance();
				} else if((start_pos_index - end_pos) > 1) {
					for(var i = 0; i<start_pos_index - end_pos;i++ ) {
						// ~ mestim 2 puti nagore
						executeAction(1, end_pos_id);
					}
					HandlePreviewModeMoveInstance();
				}
			} else {
				if((end_pos - start_pos_index) == 1) {
					// ~ mestim 1 put nadolu
					executeAction(2, end_pos_id);
					HandlePreviewModeMoveInstance();
				} else if((end_pos - start_pos_index) > 1) {
					for(var i = 0; i<end_pos - start_pos_index;i++ ) {
						// ~ mestim 2 puti nadolu
						executeAction(2, end_pos_id);
					}
					HandlePreviewModeMoveInstance();
				}
			}
		}
	});
}

function setFieldValueNullByInstanceId(pInstanceId, pFieldId) {
	if(pInstanceId && pFieldId) {
		$('#sel_' + pInstanceId + '__' + pFieldId).val('');
		$('#sel_' + pInstanceId + '__' + pFieldId).siblings( '.' + gSelectedOptionClass ).html( $('#sel_' + pInstanceId + '__' + pFieldId).find( "option:selected" ).text() );
	}
	return;
}

function getInstanceFieldCitations(pInstanceId, pFieldId, pCitationsType){	
	var curWindow = window;
	while(curWindow !== curWindow.parent){
		curWindow = curWindow.parent;
	}
	if(!curWindow.gInstanceCitations[pInstanceId] ){// If the citations for this
													// instance have not been
													// cached //|| true
		var action = gPreviewMode ? 'get_document_citations' : 'get_instance_citations';
		$.ajax({
			url : gCitationsSrv,
			dataType : 'json',
			async : false,
			data :{
				'instance_id' : pInstanceId,
				'document_id' : gDocumentId,
				'action' : action
			},
			success : function(pAjaxResult){
				if(gPreviewMode){
					gDocumentCitationsAreLoaded = true;
					curWindow.gInstanceCitations = pAjaxResult['citations'] || {};
				}else{
					var lInstanceIds = pAjaxResult['instance_ids'];
					var lCitations = pAjaxResult['citations'];
					for(var i = 0; i < lInstanceIds.length; i++){
						var lInstanceId = lInstanceIds[i];
						var lInstanceCitations = lCitations[lInstanceId];
						if(!lInstanceCitations){
							lInstanceCitations = {};
						}
						curWindow.gInstanceCitations[lInstanceId] = lInstanceCitations;
					}
				}
			}
		});		
	}
	if(!curWindow.gInstanceCitations[pInstanceId]){
		curWindow.gInstanceCitations[pInstanceId] = {			
		}
	}
	if(!curWindow.gInstanceCitations[pInstanceId][pFieldId]){
		curWindow.gInstanceCitations[pInstanceId][pFieldId] = {};
	}
	if(!curWindow.gInstanceCitations[pInstanceId][pFieldId][pCitationsType]){
		curWindow.gInstanceCitations[pInstanceId][pFieldId][pCitationsType] = {};
	}
	return curWindow.gInstanceCitations[pInstanceId][pFieldId][pCitationsType];
}

function updateInstanceCitationData(pInstanceId, pFieldId, pCitationType, pCitationId, pCitationData){
	var curWindow = window;
	while(curWindow !== curWindow.parent){
		curWindow = curWindow.parent;
	}
	if(!curWindow.gInstanceCitations || !curWindow.gInstanceCitations[pInstanceId] 
		|| !curWindow.gInstanceCitations[pInstanceId][pFieldId] || !curWindow.gInstanceCitations[pInstanceId][pFieldId][pCitationType]){
		return;
	}	
	curWindow.gInstanceCitations[pInstanceId][pFieldId][pCitationType][pCitationId] = pCitationData;
}

function PerformCitationSave(pInstanceId, pFieldId, pCitationId, pCitationType, pCitationObjects, pCitationMode){
	var lResult = new Array();
	$.ajax({
		url : gCitationsSrv,
		dataType : 'json',
		async : false,
		data :{
			'instance_id' : pInstanceId,
			'field_id' : pFieldId,
			'citation_type' : pCitationType,
			'citation_id' : pCitationId,
			'citation_objects' : pCitationObjects,
			'citation_mode' : pCitationMode,
			'action' : 'save_citation'
		},
		success : function(pAjaxResult){
			lResult = pAjaxResult;
		}
	});
	if(!lResult['data-citation-id'] || !lResult['data-citation-id'] > 0 || lResult['err_cnt']){
		alert('Could not save citation: ' + lResult['err_msg']);
		return false;
	}
	// Ако сме направили insert не правим autosave, понеже елемента ни в дом-а
	// още няма id атрибут и ще го затрием
	if(pCitationId > 0){
		autoSaveInstance();
	}
	// Mark the instance citations as dirty so that they can be recached
	gInstanceCitations[pInstanceId] = false;
	// If we are in the main window and there is the preview iframe - update the
	// citations there
	try{
		$('#previewIframe')[0].contentWindow.gInstanceCitations[pInstanceId] = false;
	}catch(e){		
	}
	// If we are in the iframe - update citations in the parent
	try{
		window.parent.gInstanceCitations[pInstanceId] = false;
	}catch(e){		
	}
	return lResult;
}

function PerformRemoveCitation(pCitationId){
	$.ajax({
		url : gCitationsSrv,
		dataType : 'json',
		data :{
			'citation_id' : pCitationId,
			'action' : 'delete_citation'
		},success : function(pAjaxResult){
			autoSaveInstance();
		}
	});
}

function UploadFile(pBtnId, pDocId, pInstanceId, pFieldId) {
	var btnUpload = $('#' + pBtnId);
	var AjaxFileUpload = new AjaxUpload(btnUpload, {
		action: gFileUploadSrv,
		responseType: 'json',
		name: 'uploadfile',
		hoverClass: 'UploadHover',
		data: {
			document_id: pDocId,
			instance_id: pInstanceId,
		},
		onSubmit: function(file, ext){
			if (!ext) {
				alert('Please upload file with valid extension!');
				return false;
			}
		},
		onComplete: function(file, response){
			if(response['file_id'] && response['file_name']) {
				$('#field_' + pInstanceId + '__' + pFieldId).siblings('.' + gUploadFileNameHolderClass).html(response['file_name']);
				if(response['err_cnt'] == 0){
					$('#field_' + pInstanceId + '__' + pFieldId).val(response['file_id']);
				}
				$('.file_supp_error').remove();
				$($('#field_' + pInstanceId + '__' + pFieldId)).after("<p class='file_supp_error txtred'>"+response['err_msg']+"</p>");
				UpdateInstanceFieldValue(pInstanceId, 222, response['file_id'], 1);
				// $('<span>1111</span>').prepend($('#field_ajax_' + pFieldId + '__'+pInstanceId));
			}

		}
	});
}

function UploadFileBased(pBtnId, pDocId) {
	var btnUpload = $('#' + pBtnId);
	var status = $("#status2");

	var AjaxFileUpload = new AjaxUpload(btnUpload, {
		action: gFileUploadSrv,
		responseType: 'json',
		name: 'uploadfile',
		hoverClass: 'UploadHover',
		data: {
			document_id: pDocId,
			is_file_based: true,
			file_label: $("#file_label").val()
		},
		onSubmit: function(file, ext){
			var ltitle = $("#file_label").val();
			if(!ltitle || ltitle == "undefined") {
				status.text("File label is required");
				return false;
			}
			status.text("" + LANG['global.uploading'] + "...");
		},
		onComplete: function(file, response){
			var obj = response;
			if(obj.err_cnt > 0) {
				status.text(obj.err_msg);
			} else {
				status.text("");
				$("#file_label").val("");
				$("#upl_addFile_button").attr("disabled", "disabled");
			}

			if(obj.file_id && obj.file_name) {
				drawFileBaseTableRow(obj, '#upl_files_list_holder2 .sub_step_3_file > tbody');
			}

		}
	});
}

function UpdateInstanceFieldValue(pInstanceId, pFieldId, pFieldValue, pFieldType) {
	$.ajax({
		url : gInstancesSrv,
		dataType: 'json',
		data :{
			action : 'update_instance_field_value',
			instance_id : pInstanceId,
			field_id : pFieldId,
			field_value : pFieldValue,
			field_type : pFieldType,
		},
	});
}

function toggleRadioCheck(pHolderId) {
	var lRadioIsDisabled = $('#' + pHolderId).is(':disabled');
	if(lRadioIsDisabled){
		return;
	}
	var radioChecked = $('#' + pHolderId).is(':checked');
	if(radioChecked){
		$('#' + pHolderId).attr('checked', 'false');
	} else {
		$('#' + pHolderId).attr('checked', 'true');
		$('#' + pHolderId).trigger('click');
	}
}

function getReferenceParentInstanceId(){
	var lResult = 0;
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType: 'json',
		async: false,
		data :{
			action : 'get_reference_parent_instance_id',
			document_id : GetDocumentId(),
		},
		success : function(pAjaxResult){
			lResult = pAjaxResult['instance_id'];
		}
	});
	return lResult;
}

function getSupFilesParentInstanceId(){
	var lResult = 0;
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType: 'json',
		async: false,
		data :{
			action : 'get_sup_files_parent_instance_id',
			document_id : GetDocumentId(),
		},
		success : function(pAjaxResult){
			lResult = pAjaxResult['instance_id'];
		}
	});
	return lResult;
}

function getFiguresParentInstanceId(){
	var lResult = 0;
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType: 'json',
		async: false,
		data :{
			action : 'get_figures_parent_instance_id',
			document_id : GetDocumentId(),
		},
		success : function(pAjaxResult){
			lResult = pAjaxResult['instance_id'];
		}
	});
	return lResult;
}

function getTablesParentInstanceId(){
	var lResult = 0;
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType: 'json',
		async: false,
		data :{
			action : 'get_tables_parent_instance_id',
			document_id : GetDocumentId(),
		},
		success : function(pAjaxResult){
			lResult = pAjaxResult['instance_id'];
		}
	});
	return lResult;
}

function getEndnotesParentInstanceId(){
	var lResult = 0;
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType: 'json',
		async: false,
		data :{
			action : 'get_endnotes_parent_instance_id',
			document_id : GetDocumentId(),
		},
		success : function(pAjaxResult){
			lResult = pAjaxResult['instance_id'];
		}
	});
	return lResult;
}

function showAddFigurePopUp() {
	gCurrentDialog = CKEDITOR.dialog.getCurrent();
	gCurrentDialog.hide();
	ChangeFiguresForm('image', GetDocumentId(), 'P-PopUp-Content-Inner', 0, 2);
	popUp(POPUP_OPERS.open, 'add-figure-popup', 'add-figure-popup');
}

function showTablePopUp() {
	gCurrentDialog = CKEDITOR.dialog.getCurrent();
	gCurrentDialog.hide();
	ShowAddTablePopup(GetDocumentId(), 'add-table-popup', 1);
}

function showAddReferencePopUp() {
	gCurrentDialog = CKEDITOR.dialog.getCurrent();
	gCurrentDialog.hide();
	CreateNewReferencePopup(1);
}

function showEndnotePopUp() {
	gCurrentDialog = CKEDITOR.dialog.getCurrent();
	gCurrentDialog.hide();
	ShowAddEndnotePopup(GetDocumentId(), 'add-endnote-popup', 1);
}

function savePreviewDocument(pDocumentId, pInstanceId){
	lForm = $('form[name="' + gDocumentFormName + '"]');
	var lRootInstanceId = GetRootInstanceId();
	var lLevel = getInstanceLevel(lRootInstanceId);
	lForm.ajaxSubmit({
		'dataType' : 'json',
		'async' : 'true',
		'url' : '/lib/ajax_srv/instance_save.php',
		'root_instance_id' : lRootInstanceId,
		'data' : {
			'real_instance_id' : lRootInstanceId,
			'root_instance_id' : lRootInstanceId,
			'level' : lLevel,
		},
		'success' : function(pAjaxResult){

			if(pAjaxResult['err_cnt']){
				/*
				 * alert(pAjaxResult['err_msg']);
				 * if(pAjaxResult['validation_err_cnt']){//Ако има грешка при
				 * валидацията - показваме наново обекта с маркираните грешки
				 * $('#instance_wrapper_' +
				 * pInstanceId).replaceWith(pAjaxResult['instance_html']); }
				 */
			}else{
				// alert('saved');
			}
		}
	});

	window.location='/preview.php?document_id=' + pDocumentId + '&instance_id=' + pInstanceId;
}

function initVideoLinkDetection(pHolderId, pIframeId, pDocumentId, pEdit){
	if($("#" + pHolderId).val() != ''){
		processVideoLinkDetection($("#" + pHolderId).val(), pIframeId, pEdit);
	}
	$("#" + pHolderId).live("input paste",function(e){
		if(this.value){
			var lValue = this.value;
			setTimeout(function() {
				processVideoLinkDetection(lValue, pIframeId, pEdit);
			}, 2000);
		}
	});
}

function processVideoLinkDetection(pValue, pIframeId, pEdit) {
	var lVideoId = getVideoId(pValue);
	if(lVideoId) {
		getYouTubeInfo(function(title){
			if(title && pEdit != 2)
				$("#video_title_textarea").val(title);
		}, lVideoId);

		document.getElementById(pIframeId).src = 'https://www.youtube.com/embed/' + lVideoId;
	} else {
		alert('The url you have pasted is not a valid youtube url!');
	}
}

// Get youtube video id
function getVideoId(url){
    if(url.indexOf('?') != -1 ) {
        var query = decodeURI(url).split('?')[1];
        var params = query.split('&');
        for(var i=0,l = params.length;i<l;i++)
            if(params[i].indexOf('v=') === 0)
                return params[i].replace('v=','');
    } else if (url.indexOf('youtu.be') != -1) {
        return decodeURI(url).split('youtu.be/')[1];
    }
    return null;
}

function SaveVideoData(pVideoId, pVideoUrl, pDocumentId, pVideoTitle) {
	SyncCKEditors();
	var pVideoUrl = $("#" + pVideoUrl).val();
	var pVideoTitle = $("#" + pVideoTitle).val();
	$.ajax({
		url : gFiguresAjaxSrv,
		dataType: 'json',
		data :{
			action : 'save_video_details',
			video_url : pVideoUrl,
			video_title : pVideoTitle,
			video_id : pVideoId,
			document_id : pDocumentId,
		},
		success : function(pAjaxResult){
			if(pAjaxResult) {
				// alert('The Video is saved!');
				// TODO: implement the alert as a 'yellow fade'
				// http://37signals.com/svn/archives/000558.php
				UpdateDocumentFiguresHolder(pAjaxResult, 'P-Document-Figures-Container', 1);
				$('.P-PopUp-Content-Inner').html('');
			}
		}
	});
}

function getYouTubeInfo(handleData, pVideoId) {
	$.ajax({
		url: "https://gdata.youtube.com/feeds/api/videos/" + pVideoId + "?v=2&alt=json",
		dataType: "jsonp",
		async : false,
		success: function (data) {
			handleData(data.entry.title.$t);
		}
	});
}
gCurrentlySelectedRevision = 0;
function showRevision(pFrameId, pRevisionId, pDocumentId, pTemplateXSL){
	gCurrentlySelectedRevision = pRevisionId;	
	document.getElementById(pFrameId).setAttribute('src', '/preview_src.php?edit_forbidden=1&document_id=' + pDocumentId +
																	'&template_xsl_path=' + pTemplateXSL +
																	'&revision_id=' + pRevisionId +
																	'&show_revision=1');
	$('.P-Revisions-History').removeClass('Selected-Revision');
	$('.P-Revisions-History').removeClass('Diff-Revision');
	$('#P-Revision-' + pRevisionId).addClass('Selected-Revision');
	
	$('input[name=diff_source]').removeAttr('checked');
	$('input[name=diff_destination]').removeAttr('checked');
}

function showRevisionsDiff(pFrameId, pDocumentId){
	var values = {};
	$.each($('form[name="diff_revisions_form"]').serializeArray(), function (i, field) {
		values[i] = field.value;
	});
	
//	var $sourceRevision = $('input[name=diff_source]:checked');
//	var $destRevision = $('input[name=diff_destination]:checked');
	var $sourceRevision = values[0];
	var $destRevision = values[1];
	if(!$sourceRevision || !$destRevision) {
		return;
	}
	if($sourceRevision == $destRevision) {
		return;
	}
	blockUi();
	document.getElementById(pFrameId).setAttribute('src', '/version_diff.php?document_id=' + pDocumentId +
			'&revision1=' + $sourceRevision +
			'&revision2=' + $destRevision);
	$('.P-Revisions-History').removeClass('Diff-Revision');
	
	$('#' + pFrameId).unbind('load');
	$('#' + pFrameId).load(function() {
		$('html, body').scrollTop(0);
		$("#P-Article-StructureHead-Changes").hide();
		if(GetPreviewContent().find(gRevisionChangesSelector).length) {
			$("#P-Article-StructureHead-Changes").show();
		}
		
		resizePreviewIframe("previewIframe");
		unblockUi();
	});
	return false;
}


function showLinkExample(pHtmlIdentifier, pInstanceId){
	var other = 4;
	var selected = $('#sel_' + pHtmlIdentifier + ' option:selected').val();
	$('#container_item_wrapper_' + pInstanceId + '_260_1_479').css('visibility' , selected == other ? 'visible' : 'hidden');
	$('#instance_wrapper_' + pInstanceId).find('div[id^="taxon_treatment_links_example_' + pInstanceId + '"]').hide();
	$('#instance_wrapper_' + pInstanceId).find($('#taxon_treatment_links_example_' + pInstanceId + '_' +  selected)).show();
}

function showHideChecklistTaxonFields(pInstanceId){
	var lSelectedVal = $('#sel_' + pInstanceId + '__414 option:selected').val();
	var lSelectFieldIdsByValue = new Array();
	lSelectFieldIdsByValue[1] = new Array([419]); // Kingdom
	lSelectFieldIdsByValue[2] = new Array([420]); // SubKingdom
	lSelectFieldIdsByValue[3] = new Array([421]); // phylum
	lSelectFieldIdsByValue[4] = new Array([422]); // subphylum
	lSelectFieldIdsByValue[5] = new Array([423]); // superclass
	lSelectFieldIdsByValue[6] = new Array([424]); // class
	lSelectFieldIdsByValue[7] = new Array([425]); // subclass
	lSelectFieldIdsByValue[8] = new Array([426]); // superorder
	lSelectFieldIdsByValue[9] = new Array([427]); // order
	lSelectFieldIdsByValue[10] = new Array([428]); // suborder
	lSelectFieldIdsByValue[11] = new Array([429]); // infraorder
	lSelectFieldIdsByValue[12] = new Array([430]); // superfamily
	lSelectFieldIdsByValue[13] = new Array([431]); // family
	lSelectFieldIdsByValue[14] = new Array([432]); // subfamily
	lSelectFieldIdsByValue[15] = new Array([433]); // tribe
	lSelectFieldIdsByValue[16] = new Array([434]); // subtribe
	lSelectFieldIdsByValue[17] = new Array([48]); // genus
	lSelectFieldIdsByValue[18] = new Array([417]); // subgenus
	lSelectFieldIdsByValue[19] = new Array(48, 417, 49); // species
	lSelectFieldIdsByValue[20] = new Array(48, 417, 49, 418); // subspecies
	lSelectFieldIdsByValue[21] = new Array(48, 417, 49, 435); // variety
	lSelectFieldIdsByValue[22] = new Array(48, 417, 49, 436); // form

	$('#container_' + pInstanceId + '_676').find('input').each(function(){
		$(this).closest('.fieldWrapper').hide();
	});
	for( var i = 0; i < lSelectFieldIdsByValue[lSelectedVal].length; i++ ) {
		$('#container_' + pInstanceId + '_676 input[name="' + pInstanceId + '__' + lSelectFieldIdsByValue[lSelectedVal][i] + '"]').closest('.fieldWrapper').show();
	}

}

function showHideChecklistLocalityTaxonFields(pInstanceId){
	var lSelectedVal = $('#sel_' + pInstanceId + '__414 option:selected').val();
	var lSelectFieldIdsByValue = new Array();
	lSelectFieldIdsByValue[1] = new Array([419]); // Kingdom
	lSelectFieldIdsByValue[2] = new Array([420]); // SubKingdom
	lSelectFieldIdsByValue[3] = new Array([421]); // phylum
	lSelectFieldIdsByValue[4] = new Array([422]); // subphylum
	lSelectFieldIdsByValue[5] = new Array([423]); // superclass
	lSelectFieldIdsByValue[6] = new Array([424]); // class
	lSelectFieldIdsByValue[7] = new Array([425]); // subclass
	lSelectFieldIdsByValue[8] = new Array([426]); // superorder
	lSelectFieldIdsByValue[9] = new Array([427]); // order
	lSelectFieldIdsByValue[10] = new Array([428]); // suborder
	lSelectFieldIdsByValue[11] = new Array([429]); // infraorder
	lSelectFieldIdsByValue[12] = new Array([430]); // superfamily
	lSelectFieldIdsByValue[13] = new Array([431]); // family
	lSelectFieldIdsByValue[14] = new Array([432]); // subfamily
	lSelectFieldIdsByValue[15] = new Array([433]); // tribe
	lSelectFieldIdsByValue[16] = new Array([434]); // subtribe
	lSelectFieldIdsByValue[17] = new Array([48]); // genus
	lSelectFieldIdsByValue[18] = new Array([417]); // subgenus
	lSelectFieldIdsByValue[19] = new Array(48, 417, 49); // species
	lSelectFieldIdsByValue[20] = new Array(48, 417, 49, 418); // subspecies
	lSelectFieldIdsByValue[21] = new Array(48, 417, 49, 435); // variety
	lSelectFieldIdsByValue[22] = new Array(48, 417, 49, 436); // form

	$('#container_' + pInstanceId + '_707').find('input').each(function(){
		$(this).closest('.fieldWrapper').hide();
	});
	for( var i = 0; i < lSelectFieldIdsByValue[lSelectedVal].length; i++ ) {
		$('#container_' + pInstanceId + '_707 input[name="' + pInstanceId + '__' + lSelectFieldIdsByValue[lSelectedVal][i] + '"]').closest('.fieldWrapper').show();
	}
}


function showHideChecklist2Taxon2Fields(pInstanceId){
	var genus = 48;
	var subgenus = 417;
	var species = 49;
	var subspecies = 418;
	var variety = 435;
	var form = 436;
	var authorship = 236;
	var translateRank = function(rg)
	{
		r = parseInt(rg);
		if (r == 17)
			return 48;
		if (r == 18)
			return 417;
		if (r == 19)
			return 49;
		if (r == 20)
			return 418;
		if (r == 21)
			return 435;
		if (r == 22)
			return 436;
		return r + 418;
	}
	var additionalFields = function(field)
	{
		// console.log(field);
		fields = [genus, subgenus, species];
		if (field == species)
			return fields;
		if (field == subspecies || field == variety || field == form)
		{
			fields.push(field);
			return fields;
		}
		else
		{
			return [field];
		}
	}

	var rank = $('#sel_' + pInstanceId + '__414 option:selected').val();
	var field = translateRank(rank);
	var visibleFields = additionalFields(field);
	visibleFields.push(authorship);
	var n = visibleFields.length;

	// hide
	for( var i = 417; i < 437; i++ ) {
		$('#field_wrapper_' + pInstanceId + '_' +  i).css('display', 'none');
	}
	$('#field_wrapper_' + pInstanceId + '_' +  48).css('display', 'none');
	$('#field_wrapper_' + pInstanceId + '_' +  49).css('display', 'none');

	for( var i = 0; i < n; i++ ) {
		$('#field_wrapper_' + pInstanceId + '_' +  visibleFields[i]).css('display', 'block');
	}
}

function showHideChecklistLocalityFields(pInstanceId){
	var lSelectedVal = $('#sel_' + pInstanceId + '__445 option:selected').val();
	var lSelectFieldIdsByValue = new Array();

	lSelectFieldIdsByValue[1] = new Array(109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 129, 132, 133, 134); // Locality/Region
	lSelectFieldIdsByValue[2] = new Array(446, 447); // Habitat
	lSelectFieldIdsByValue[3] = new Array([448]); // Natura 2000 zone

	$('#container_' + pInstanceId + '_698').find('input').each(function(){
		$(this).closest('.fieldWrapper').hide();
	});
	for( var i = 0; i < lSelectFieldIdsByValue[lSelectedVal].length; i++ ) {
		$('#container_' + pInstanceId + '_698 input[name="' + pInstanceId + '__' + lSelectFieldIdsByValue[lSelectedVal][i] + '"]').closest('.fieldWrapper').show();
	}
}

function showHideChecklistLocality2Fields(pInstanceId){
	var lSelectedVal = $('#sel_' + pInstanceId + '__445 option:selected').val();
		// 1 -> Locality/Region
		// 2 -> Habitat
		// 3 -> Natura 2000 zone
	var containers = [0, 763, 765, 766];
	var n = containers.length;
	for( var i = 1; i < n; i++ ) {
		if (i == lSelectedVal)
			$('#container_' + pInstanceId + '_' + containers[i]).show();
		else
			$('#container_' + pInstanceId + '_' + containers[i]).hide();
	}
}

function processTaxonTreatmentRankChange(pInstanceId){
	var lRankFieldId = 42;
	var lTreatmentTypeFieldId = 43;
	var lSpeciesValueId = 1;
	var lRedescriptionValueId = 5;

	var rank = getFormFieldValueByName(gActiveInstanceFormName, pInstanceId + '__' + lRankFieldId );
	var redescription  = ((rank == lSpeciesValueId) ? 'Redescription or species observation' : 'Redescription');
	$('#sel_' + pInstanceId + '__' + lTreatmentTypeFieldId).children('option[value="' + lRedescriptionValueId + '"]').text(redescription);
}

function clearFieldsIfNotChecked(pInstanceId, pHtmlIdentifier){
	if(!$('#' + pHtmlIdentifier + '_1').is(':checked')){
		$('#container_' + pInstanceId + '_456').find('input').each(function(){
			$(this).val('');
		});
		$('#container_' + pInstanceId + '_457').find('input').each(function(){
			$(this).val('');
		});
	}
}

function UploadMaterialFile(pBtnId, pDocId, pInstanceId) {
	UploadImportFile(pBtnId, pDocId, pInstanceId, gFileUploadMaterialSrv);
}

function UploadChecklistTaxonFile(pBtnId, pDocId, pInstanceId) {
	UploadImportFile(pBtnId, pDocId, pInstanceId, gFileUploadChecklistTaxonSrv);
}

function UploadTaxonomicCoverageTaxaFile(pBtnId, pDocId, pInstanceId) {
	UploadImportFile(pBtnId, pDocId, pInstanceId, gFileUploadTaxonomicCoverageTaxaSrv);
}

function UploadImportFile(pBtnId, pDocId, pInstanceId, pAjaxUrl){
	var btnUpload = $('#' + pBtnId);
	var AjaxFileUpload = new AjaxUpload(btnUpload, {
		action: pAjaxUrl,
		responseType: 'json',
		name: 'uploadfile',
		hoverClass: 'UploadHover',
		data: {
			document_id: pDocId,
			instance_id: pInstanceId,
		},
		onSubmit: function(file, ext){
			$('#P-Ajax-Loading-Image').show();
			if (! (ext && /^(xls|ods|xlsx|)$/.test(ext))){
				// extension is not allowed
				alert('Only xls|ods|xlsx files are allowed');
				$('#P-Ajax-Loading-Image').hide();
				return false;
			}
		},
		onComplete: function(file, response){
			if(response['error'] || response['err_msg']) {
				alert(response['error'] || response['err_msg']);
			} else {				
				if(checkIfPreviewAppIsEnabled()){
					if(response['import_job_id']){
						$('#P-Ajax-Loading-Image').hide();
						triggerPreviewAppShowImportReportMsg(response['import_job_id']);
						return;
					}
					triggerPreviewAppActionsMsg('instance:modified', pInstanceId);
					triggerPreviewAppPopupMsg('current:popup:reload');
				}else{
					ChangeInstanceMode(GetDocumentId(), pInstanceId, null, null, gInstanceEditMode);			
				}
								
// window.location.href = 'display_document.php?instance_id=' + pInstanceId;
			}
			$('#P-Ajax-Loading-Image').hide();
		}
	});
}
function enableOrDisableJournalsByPaperType(pObj){
		var lPaperJournals = $(pObj).attr("journals");
		lPaperJournals = lPaperJournals.replace("{","");
		lPaperJournals = lPaperJournals.replace("}","");
		var lJournalIdsArray = lPaperJournals.split(',');
		$('.papertypes-holder label').removeClass('boldedFont');
		$(pObj).next('label').addClass('boldedFont');

		var lCheckedInput = $('.journals-holder input:checked');
		if(lCheckedInput.length){
			var lJournalId = lCheckedInput.val();
			if(lJournalIdsArray.indexOf(lJournalId) < 0){
				lCheckedInput.prop('checked', false);
			}
		}
		// clear all checked journals
		// $("input[name=\'journal_id\']").prop('checked', false);
		
		$('.journal').attr('disabled', 'disabled');
		$('.journals-holder label').removeClass('enabled');
		$('.journals-holder label').addClass('disabled');
		var inputsCount = $('.papertypes-holder input').length;
		for(var i=0;i<lJournalIdsArray.length;i++){
			$('.journal[value=' + lJournalIdsArray[i] + ']').removeAttr('disabled');
			$('.journal[value=' + lJournalIdsArray[i] + ']').next('label').removeClass('disabled');
// $('.journal[value=' + lJournalIdsArray[i] +
// ']').next('label').addClass('enabled');
		}
		// if one option -> check it
		if(lJournalIdsArray.length === 1) {
			$('.journal[value=' + lJournalIdsArray[0] + ']').prop('checked', true);
		}
		var lPaperDesc = $(pObj).attr("desc");
		showPaperTypeDescription(lPaperDesc);
		// ~ select first active journal
// if ($('input[disabled*="disabled"]')){
// $('.journals-holder input:first').prop('checked', true);
// }
	}
function showActiveDataPapersForCurrentJournal(pObj){
	var lCurrObjValue = $(pObj).attr("value");
	var inputsCount = $('.papertypes-holder input').length;
	var lTitlesArray = new Array();
	var lPapersJournal;
	for(var k=0;k<inputsCount;k++){
		lPapersJournal = $('.papertypes-holder input').eq(k).attr('journals');
		lPapersJournal = lPapersJournal.replace("{","");
		lPapersJournal = lPapersJournal.replace("}","");
		lCurrElemJournalsArray = lPapersJournal.split(',');
		for(var i=0;i<lCurrElemJournalsArray.length;i++){
			if (lCurrObjValue == lCurrElemJournalsArray[i]){
				lTitlesArray[k] = '• ' + $('.papertypes-holder input').eq(k).next('label').text().replace(" (example)","") + '\n';
			}
		}
	}
	var lTitlesArray = lTitlesArray.join('');
	$(pObj).next('label').attr('title', 'Accepts the following paper types: \n' + lTitlesArray);
}
function showPaperTypeDescription(pDescription){
	$('#docDescr').html(pDescription);
}
function leftColFullHeight(){
	$(function(){
		var lDocumentHeight = $(document).height();
		lDocumentHeight = lDocumentHeight - 81;
		$('.P-Wrapper-Container-Left').css('height', lDocumentHeight + 'px');
	});
}
function selectPrevInput(pObj){
	$(pObj).prev('input').trigger('click');
}
function cleanHTML(pHTML, pTableFlag) {

	// ~ var reAllowedAttributes =
	// /^(face|size|style|dir|color|id|class|alignment|align|valign|rowspan|colspan|width|height|background|cellspacing|cellpadding|border|href|src|target|alt|title)$/i
	// ~ var reAllowedHTMLTags =
	// /^(h1|h2|a|img|b|em|li|ol|p|pre|strong|ul|font|span|div|u|sub|sup|table|tbody|blockquote|tr|td)$/i

	// Set up regular expressions that will match the HTML tags and attributes
	// that I want to allow
	if (pTableFlag) {
		var reAllowedAttributes = /^(href|title|target|alt|type|start|rowspan|colspan|cellspacing|cellpadding|data-citation-id)$/i
		var reAllowedHTMLTags = /^(p|strong|em|b|i|sup|sub|br|blockquote|a|ul|ol|li|table|tbody|tr|td|th|xref|fig-citation|tbls-citation|reference-citation|endnote-citation|cite)$/i
	} else {
		var reAllowedAttributes = /^(href|title|target|alt|type|start|data-citation-id)$/i
		var reAllowedHTMLTags = /^(p|strong|em|b|i|sup|sub|br|blockquote|a|ul|ol|li|xref|fig-citation|tbls-citation|reference-citation|endnote-citation|cite)$/i
	}

	// Start of with a test to match all HTML tags and a group for the tag name
	// which we pass in as an extra parameter
	theHTML = pHTML.replace(/<[/]?([^> ]+)[^>]*>/g, function (match, HTMLTag) {
		// if the HTML tag does not match our list of allowed tags return empty
		// string which will be used as a
		// a replacement for the pattern in our inital test.
		if (!reAllowedHTMLTags.test(HTMLTag)) {
			return "";
		} else {
			// The HTML tag is allowed so check attributes with the tag

			// Certain attributes are allowed so we do another replace statement
			// looking for attributes and using another
			// function for the replacement value.
			match = match.replace(/ ([^=]+)="[^"]*"/g, function (match2, attributeName) {
				// If the attribute matches our list of allowed attributes we
				// return the whole match string
				// so we replace our match with itself basically allowing the
				// attribute.
				if (reAllowedAttributes.test(attributeName)) {
					return match2;
				} else {
					return ""; // not allowed so return blank string to wipe
								// out the attribute value pair
				}
			});

		}
		return match;

	}); // end of the first replace

	// return our cleaned HTML
	return theHTML;
}

function InsertLoadingDivMarkup(){
	if($('#' + gLoadingDivId).length > 0){
		return;
	}
	var lHolder = $('.P-Wrapper-Container').first();
	if(!lHolder.length){
		return;
	}
	lHolder.append('	<div id="' + gLoadingDivId + '"><img src="./i/loading.gif" alt="" /></div>') ;
}

var blockCounter = 0;
function blockUi(){
	blockCounter++;
	if(blockCounter == 1){
		$.blockUI({
			message: '<img src="./i/loading.gif" alt="" />',
			overlayCSS: {
				opacity: 0.3
			},
			css: {
				background: 'transparent',
				height:'42px',
				width:'42px',
				border: 'none',
				opacity: 0.5,
				top: 'calc(50% - 21px)',
				left: 'calc(50% - 21px)',
			}
		});
	}
}

function unblockUi(){
	blockCounter--;
	if(blockCounter == 0){
		$.unblockUI();
	}
}


function showLoading(){
	if(gPerformingSave || gLoadingIsVisible){
		return;
	}
	gLoadingIsVisible = true;
	$('#' + gLoadingDivId).show();
}

function hideLoading(){
	if(gPerformingSave || !gLoadingIsVisible){
		return;
	}
	gLoadingIsVisible = false;
	$('#' + gLoadingDivId).hide();
}

function SubmitDocumentToPjs(pDocumentId, pRedirUrl) {
	$.ajax({
		url : gAjaxUrlsPrefix + 'update_pwt_document_xml.php',
		data : {
			document_id : pDocumentId
		},
		success : function(pAjaxResult){
			if(pAjaxResult == 'ok') {
				window.location = pRedirUrl;
			} else {
				hideLoading();
				alert('Error Submitting the document');
			}
		}
	});
}

function ScrollToInstance(pInstanceId){
	var wrapper = $('#instance_wrapper_' + pInstanceId);
	if(!wrapper.length){
		wrapper = $('*[instance_id="' + pInstanceId + '"]');
	}
	if(!wrapper.length){
		return;
	}
	$('html, body').animate({
	    scrollTop: wrapper.offset().top
	}, 20);
}

function ShowHideProfileMenu() {	
	$('.P-Head-Profile-Menu').click(function(){
		if($('#userLoggedMenu').is(':visible')) {
			$('#userLoggedMenu').hide();
			$('.P-Head-Profile-Menu').removeClass('P-Head-Profile-Menu-Opened');
		} else {
			$('#userLoggedMenu').show();
			$('.P-Head-Profile-Menu').addClass('P-Head-Profile-Menu-Opened');
		}
	});
}

function ShowDownloadMaterialsLink(pInstanceId) {
	$.ajax({
		url : gAjaxUrlsPrefix + 'materials_ajax_srv.php',
		dataType : 'json',
		data : {
			action : 'check_has_materials',
			instance_id : pInstanceId
		},
		success : function(pAjaxResult){
			if(pAjaxResult['status'] == 'ok') {
				$('.P-Taxon-Materials-DownLoadHolder').show();
			} else {
				$('.P-Taxon-Materials-DownLoadHolder').hide();
			}
			if(pAjaxResult['count'] > 1) {
				$('.P-Taxon-Materials-MassDeleteHolder').show();
			} else {
				$('.P-Taxon-Materials-MassDeleteHolder').hide();
			}
		}
	});
}

function DownloadMaterialsAsCSV(pInstanceId) {
	document.location.href = '/lib/ajax_srv/csv_export_srv.php?action=export_materials_as_csv&instance_id=' + pInstanceId;
	return;
}

function DownloadTable(pInstanceId, pSiteUrl) {
	document.location.href = pSiteUrl + '/lib/ajax_srv/csv_export_srv.php?action=export_table_as_csv&instance_id=' + pInstanceId;
	return;
}

function LoadDocumentTree(pTreeHolderId, pDocumentId, pInstanceId){
// return;
	$.ajax({
		url : gDocumentTreeAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			instance_id : pInstanceId
		},
		success : function(pAjaxResult){
			$('#' + pTreeHolderId).html(pAjaxResult['html'])
		}
	});
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function ShowImports() {
	$('#Imports').show();
	$('#ref-tab-1').addClass('row-active');
	$('#Manuals').hide();
	$('#ref-tab-2').removeClass('row-active');
}

function ShowManual() {
	$('#Manuals').show();
	$('#ref-tab-2').addClass('row-active');
	$('#Imports').hide();
	$('#ref-tab-1').removeClass('row-active');
}


function ScrollToSelectedTreeElement(){
	var lHolderElement = $('.P-Article-Structures');
	var lSelectedElement = lHolderElement.find('.P-Article-Active');
	if(!lSelectedElement.length){
		return;
	}
	if(!lSelectedElement.is(':visible')){
		lSelectedElement = lSelectedElement.parents(':visible');
		if(lSelectedElement.length){
			lSelectedElement = lSelectedElement.first();
		}
	}
	if(!lSelectedElement.length){
		return;
	}
	var lSelectedElementParents = lSelectedElement.parents();
	var lOffsetParent = lSelectedElement.offsetParent();

	var lTopOffset = 0;
	var lCurrentElement = lSelectedElement.prev() ;
	if(!lCurrentElement.length){
		lCurrentElement = lSelectedElement.parent();
	}
	while(lCurrentElement.length && lCurrentElement[0] != lOffsetParent[0]){
// console.log(lCurrentElement, lTopOffset);
		if(lSelectedElementParents.filter(lCurrentElement).length){
// lTopOffset += lCurrentElement.outerHeight();
		}else{
			if(lCurrentElement.is(':visible')){
				lTopOffset += lCurrentElement.outerHeight();
			}
		}
		if(lCurrentElement.prev().length){
			lCurrentElement = lCurrentElement.prev();
		}else{
			lCurrentElement = lCurrentElement.parent();
		}
	}
	$('.P-Article-Structures').animate({
	    scrollTop: lTopOffset
	}, 20);
}

function checkIfFunctionExists(pPossibleFunctionName) {
  return (typeof(pPossibleFunctionName) == typeof(Function));
}

/**
 * Returns the first text node which is following the specified node or false if
 * there is no such node
 * 
 * @param $pNode
 *            DomNode
 */
function GetNextTextNode(pNode) {
	var lNextSibling = false;
	var lParent = pNode;
	while(lParent){
		lNextSibling = lParent.nextSibling;
		while(lNextSibling){
			if(lNextSibling.nodeType == 3)
				return lNextSibling;
			if(lNextSibling.nodeType == 1){
				var lTextNode = GetFirstTextNodeDescendant(lNextSibling);
				if(lTextNode)
					return lTextNode;
			}
			lNextSibling = lNextSibling.nextSibling;
		}
		lParent = lParent.parentNode;
	}
	return false;
}

/**
 * Returns the first text node which is a child of the passed node or false if
 * there is no such node If the node is a text node itself - it will be returned
 * 
 * @param $pNode
 *            DomNode
 */
function GetFirstTextNodeDescendant(pNode) {
	if(pNode.nodeType == 3){
		return pNode;
	}
	for(var i = 0; i < pNode.childNodes.length; ++i){
		var lChild = pNode.childNodes[i];
		if(lChild.nodeType == 3){
			return lChild;
		}
		if(lChild.nodeType == 1){
			var lChildFirstTextNode = GetFirstTextNodeDescendant(lChild);
			if(lChildFirstTextNode !== false){
				return lChildFirstTextNode;
			}
		}
	}
	return false;
}

/**
 * Returns the first text node which is preceding the specified node or false if
 * there is no such node
 * 
 * @param $pNode
 *            DomNode
 */
function GetPreviousTextNode(pNode) {
	var lPreviuosSibling = false;
	var lParent = pNode;
	while(lParent){
		lPreviuosSibling = lParent.previousSibling;
		while(lPreviuosSibling){
			if(lPreviuosSibling.nodeType == 3)
				return lPreviuosSibling;
			if(lPreviuosSibling.nodeType == 1){
				var lTextNode = GetLastTextNodeDescendant(lPreviuosSibling);
				if(lTextNode)
					return lTextNode;
			}
			lPreviuosSibling = lPreviuosSibling.previousSibling;
		}
		lParent = lParent.parentNode;
	}
	return false;
}

/**
 * Returns the last text node which is a descendent of the passed node or false
 * if there is no such node If the node is a text node itself - it will be
 * returned
 * 
 * @param $pNode
 *            DomNode
 */
function GetLastTextNodeDescendant(pNode) {
	if(pNode.nodeType == 3){
		return pNode;
	}
	for(var i = pNode.childNodes.length - 1; i >= 0; --i){
		var lChild = pNode.childNodes[i];
		if(lChild.nodeType == 3){
			return lChild;
		}
		if(lChild.nodeType == 1){
			var lChildLastTextNode = GetLastTextNodeDescendant(lChild);
			if(lChildLastTextNode !== false){
				return lChildLastTextNode;
			}
		}
	}
	return false;
}

var gIntervalVariable;
function SubmitDocumentAction(pUrl) {
	gIntervalVariable = setInterval(function(){checkAutosaveAndRedirect(pUrl)},300);
}

function checkAutosaveAndRedirect(pUrl) {
	if(!gAutoSaveFlag) {
		clearTimeout(gIntervalVariable);
		window.location = pUrl;
	}
}

function GetPreviewContent(){
	return $('#' + gPreviewIframeId).contents();
}

function GetPreviewSelection(){
	return getIframeSelection(gPreviewIframeId);
}

function ShowconfirmAndExec(pText, pFunc){
	if(confirm(pText)) {
		pFunc();
	} else {
		return false;
	}
}

function CallbackOnProfilePhotoUpload(pFile, pResponse, pStatusHolder){
	// On completion clear the status
	pStatusHolder.text('');
	// Add uploaded file to list
	var lPhotoHolder = $('#Prof-Photo');
	if(pResponse != 0){
		lPhotoHolder.html(pResponse);
		var lImgSrc = lPhotoHolder.find('img').first().attr('src');
		var lImgIdMatch = lImgSrc.match(/_(\d+)\./);
		var lImgId = lImgIdMatch[1];
		var lSmallAvatar = $('.userloggedimageA').find('img').first();
		var lPreviousImgSrc = lSmallAvatar.attr('src');
		var lNewSrc = lPreviousImgSrc.replace(/_(\d+)\./, '_' + lImgId + '.');
		lSmallAvatar.attr('src', lNewSrc);

	} else{
		lPhotoHolder.html(LANG['js.error_uploading_file']);
	}
}

function MassDelete(pInstanceId, pObjectId){
	if(!confirm('Are you sure you want to delete all instances of this type?')){
		return;
	}
	executeAction(gActionMassDeleteId, pInstanceId, pObjectId);
}

function displayJournalAllowedPapertypes(){
	var lJournalId = $('input[name="journal_id"]:checked').val();
	var lPapertypes = $('input[name="papertype_id"]');
	lPapertypes.each(function(pIdx, pInput){
		var currentGroupName = $(pInput).attr('group_name');
		var lJournals = $(pInput).attr('journals').slice(1, -1);// And remove
																// the wrapping
																// {}
		var lJournalIds = lJournals.split(',');
		var lPapertypeIsAllowed = (lJournalIds.indexOf(lJournalId) > -1);
		if(lPapertypeIsAllowed || !lJournalId){
			// bold
			
			$(pInput).attr('disabled', false);
			$(pInput).nextAll('label').removeClass('disabled');
			
			
			$(pInput).nextAll('label').addClass('enabled');
			$(pInput).nextAll('label').first().attr('disabled', false);
			$(pInput).nextAll('label').first().removeClass('disabled');
			
		}else{
			// inactive, disabled
			$(pInput).nextAll('a').remove();
			$(pInput).attr('disabled', 'disabled');
			$(pInput).nextAll('label').removeClass('enabled');
			$(pInput).nextAll('label').addClass('disabled');
			$(pInput).prop('checked', false);
			$(pInput).nextAll('label').first().attr('disabled', 'disabled');
			$(pInput).nextAll('label').first().addClass('disabled');
		}
		CheckPapertypeGroupIfEmpty(currentGroupName);
	});
}

function CheckPapertypeGroupIfEmpty(pGroupName) {
	var lNotEmptyFlag = 0;
	$("input[group_name='"+pGroupName+"']").each(function(pIdx, pInput){
		if(!$(pInput).is(":disabled")) {
			lNotEmptyFlag = 1;
			return false;
		}
		
	});
	
	if(lNotEmptyFlag) {
		$("div.papertype-group:contains('" + pGroupName + "')").show();
	} else {
		$("div.papertype-group:contains('" + pGroupName + "')").hide();
	}
}

function ResetCreateDocumentJournalsAndPapertypes(){
	$('input[name="journal_id"]:checked').prop('checked', false);
	$('input[name="journal_id"]').prop('disabled', false);

	$('input[name="papertype_id"]:checked').prop('checked', false);
	$('input[name="papertype_id"]').prop('disabled', false);

	$('.papertypes-holder label').removeClass('disabled');
	$('.papertypes-holder label').prop('disabled', false);

	$('.journals-holder label').removeClass('disabled');
	$('.journals-holder label').prop('disabled', false);
}

function AuthorDisableEmail(pInstanceId){
	var lEmailFieldId = 4;
	var lNamesearchContainerIds = [10, 26, 649, 655];
	var lWrapper = $('#instance_wrapper_' + pInstanceId);
	if(!parseInt(lWrapper.attr('is_new'), 10)){
		var lEmailInput = $('#' + pInstanceId + gInstanceFieldNameSeparator + lEmailFieldId);
		lEmailInput.prop('disabled', true);
		lEmailInput.addClass('disabled');
		// hide the namesearch container
		for(var i = 0; i < lNamesearchContainerIds.length; ++i){
			$('#container_' + pInstanceId + '_' + lNamesearchContainerIds[i]).hide();
		}
		
	}
};

function loadLazyImages(pElement, pCallback){
	var lLazyImages;
	if(pElement){
		lLazyImages = $(pElement).find('img[data-src]');
	}else{
		lLazyImages = $('img[data-src]');
	}
	var lRemainingImages = lLazyImages.length;
	lLazyImages.each(function(pIdx, pElem){
		$(pElem).attr('src', $(pElem).attr('data-src'));
		$(pElem).removeAttr('data-src');
		if(pCallback){
			$(pElem).load(function(){
				lRemainingImages--;
				if(lRemainingImages == 0){
					pCallback();
				}
			});
		}
	});
}

function HideLabel(pElem, pLabel) {
	$(pLabel).hide();
}

function ShowHideLabel(pElem, pLabel) {
	var lElemVal = $(pElem).val();
	if(lElemVal == '') {
		$(pLabel).show();
	} else {
		$(pLabel).hide();
	}
}

function LayerReviewFrm(pDocumentId) {
	$.ajax({
		url : gReviewAjaxSrv,
		dataType : 'json',
		async : false,
		data : {
			document_id : pDocumentId
		},
		success : function(pAjaxResult){
			
			
			$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
			popUp(POPUP_OPERS.open, 'review_popup', 'review_popup');

			/*
			 * var lPopup = $('#P-Registration-Content'); if(lPopup.length){
			 * lPopup.replaceWith(pAjaxResult['html']); }else{
			 * $('.P-Wrapper-Container').append(pAjaxResult['html']); }
			 * popUp(POPUP_OPERS.open, 'P-Registration-Content', 'layerbg');
			 * hideLoading(); gPopupIsOpened = true;
			 */
		}
	});
}


function LayerTeFeedbackFrm(pDocumentId) {
	$.ajax({
		url : gTeFeedbackAjaxSrv,
		dataType : 'json',
		async : false,
		data : {
			document_id : pDocumentId
		},
		success : function(pAjaxResult){
			$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
			popUp(POPUP_OPERS.open, 'te_feedback_popup', 'te_feedback_popup');
		}
		
	});
}

function LayerGeneralPopUp(pAction, pData, pAjxVariable) {
	var dfd, lAjxUrl;
	var lData = 'action=' + pAction;
	lData += (typeof pData !== "undefined" ? pData : '');
	if(typeof pAjxVariable == "undefined"){
		lAjxUrl = gActionsAjaxSrv;
	}else{
		lAjxUrl = window[pAjxVariable];
	}
	dfd = $.ajax({
		url : lAjxUrl,
		dataType : 'json',
		async : false,
		data : lData,
		beforeSend: function() {
            showLoading();
        },
        success: function (pAjaxResult) {
			$('#' + gGeneralPopUpHolderId).find('.P-PopUp-Main-Holder').html(pAjaxResult['html']);
			popUp(POPUP_OPERS.open, gGeneralPopUpHolderId, gGeneralPopUpHolderId);
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
        },
        complete: function() {
            hideLoading();
        }
	});
	return dfd.promise();
}

function GeneralErrorPopUp(pAction, pData) {
	var dfd;
	var lData = 'action=' + pAction;
	lData += (typeof pData !== "undefined" ? pData : '');
	dfd = $.ajax({
		url : gActionsAjaxSrv,
		dataType : 'json',
		async : false,
		data : lData,
		beforeSend: function() {
            showLoading();
        },
        success: function (pAjaxResult) {
			$('#' + gGeneralErrorPopUpHolderId).find('.P-PopUp-Main-Holder').html(pAjaxResult['html']);
			popUp(POPUP_OPERS.open, gGeneralErrorPopUpHolderId, gGeneralErrorPopUpHolderId);
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
        },
        complete: function() {
            hideLoading();
        }
	});
	return dfd.promise();
}

function AuthorsActionExec(pAction, pData, pUpdateHolderId, pConfirmTxt) {
	var lData = 'action=' + pAction;
	lData += (typeof pData !== "undefined" ? pData : '');
	if (pConfirmTxt) {
		if (!confirm(pConfirmTxt)) {
			return false;
		}
	}
	var dfd = $.ajax({
		url: gAuthorsSrv,
		dataType: 'json',
		async: false,
		data: lData,
		beforeSend: function () {
			showLoading();
		},
		success: function (pAjaxResult) {
			if (typeof pAjaxResult['err_msg'] !== "undefined" && pAjaxResult['err_msg'] !== '' && pAjaxResult['err_msg'] !== null ) {
				alert(pAjaxResult['err_msg']);
				return;
			}
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
			if (typeof pAjaxResult['html'] !== "undefined") {
				$('#' + pUpdateHolderId).html(pAjaxResult['html']);
			}
		},
		complete: function () {
			hideLoading();
		}
	});
	return dfd.promise();
}

function CommonActionExec(pAction, pData, pUpdateHolderId, pConfirmTxt) {
	var lData = 'action=' + pAction;
	lData += (typeof pData !== "undefined" ? pData : '');
	if (pConfirmTxt) {
		if (!confirm(pConfirmTxt)) {
			return false;
		}
	}
	var dfd = $.ajax({
		url: gActionsAjaxSrv,
		dataType: 'json',
		async: false,
		data: lData,
		beforeSend: function () {
			showLoading();
		},
		success: function (pAjaxResult) {
			hideLoading();
			if (typeof pAjaxResult['err_msg'] !== "undefined" && pAjaxResult['err_msg'] !== '' && pAjaxResult['err_msg'] !== null ) {
				alert(pAjaxResult['err_msg']);
				return;
			}
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
			if (typeof pAjaxResult['html'] !== "undefined") {
				$('#' + pUpdateHolderId).html(pAjaxResult['html']);
			}
		},
		complete: function () {
			hideLoading();
		}
	});
	return dfd.promise();
}
function updateInstancePreviewAuthors(pInstance){
	this.actionsChannel = Backbone.Radio.channel('actions'); 
	this.actionsChannel.trigger('instance:updated', pInstance);
}
function SubmitReviewForm(){
	if(!confirm('Are you sure that you have completed the review? Once submitted you will not be able to make any further changes!')){
		return false;
	}
	SubmitFormByName('reviewform', 'review', ReloadReviewSubmitBtn);
}

function SubmitTeFeedbackForm(){
	if(!confirm('Are you sure that you have completed the technical evaluation? Once submitted you will not be able to make any further changes!')){
		return false;
	}
	SubmitTeFeedbackFormSaveAndProceed('proceed');
}

function SubmitFormByName(pName, pAction, pCallback) {
	var lJqForm = $('form[name="' + pName + '"]');
	var lData = '&tAction=' + pAction + '&';
	lData += lJqForm.formSerialize();
	
	$.ajax({
		url : '/lib/ajax_srv/review_srv.php',
		dataType : 'json',
		data : lData,
		async : false,
		type : 'POST',
		success : function(pAjaxResult) {
			if(pAction == 'review'){
				if(pAjaxResult['err_cnt'] > 0) {
					$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
				} else {
					popUp(POPUP_OPERS.close, 'review_popup', 'review_popup');
				}
			}
			if(pCallback){
				pCallback(pAjaxResult);
			}
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
			// window.location = document.URL;
			// window.location.reload();
		}
	});
}

function SubmitTeFeedbackFormSaveAndProceed(pAction) {
	var lFormData = $('form[name="te_feedback_form"]').serialize() + '&tAction=' + pAction;

	$.ajax({
		url : '/lib/ajax_srv/te_feedback_srv.php',
		dataType : 'json',
		data : lFormData,
		async : false,
		type : 'POST',
		success : function(pAjaxResult) {
			if(pAction == 'proceed'){
				if(pAjaxResult['err_cnt'] > 0) {
					$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
				} else {
					popUp(POPUP_OPERS.close, 'te_feedback_popup', 'te_feedback_popup');
				}
			}
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
		}
	});
}

function ReloadReviewSubmitBtn(){	
	$.ajax({
		url : '/lib/ajax_srv/document_ajax_srv.php',
		dataType : 'json',
		data : {
			document_id : GetDocumentId(),
			action : 'get_review_link_btn',
		},
		async : false,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#review_link').replaceWith(pAjaxResult['html']);
		}
	});
}


function checkIfPreviewAppIsEnabled(){
	return typeof PreviewApp != 'undefined';
}

function triggerPreviewAppPopupMsg(){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appPopupChannel = Backbone.Radio.channel('popup');
	appPopupChannel.trigger.apply(appPopupChannel, arguments);	
}

function triggerPreviewAppActionsMsg(){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var channel = Backbone.Radio.channel('actions');
	channel.trigger.apply(channel, arguments);	
}

function triggerPreviewAppContentReadyMsg(){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appGlobalChannel = Backbone.Radio.channel('global');
	appGlobalChannel.trigger.call(appGlobalChannel, "preview:ready");	
}

function triggerPreviewAppLoadingMsg(){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appLoadingChannel = Backbone.Radio.channel('loading');
	appLoadingChannel.trigger.apply(appLoadingChannel, arguments);	
}

function triggerPreviewContentLoadedMsg(){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appGlobalChannel = Backbone.Radio.channel('global');
	appGlobalChannel.trigger.call(appGlobalChannel, "preview:loaded");	
}

function triggerPreviewAppShowImportReportMsg(importJobId){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appGlobalChannel = Backbone.Radio.channel('global');
	appGlobalChannel.trigger.call(appGlobalChannel, "document:import:report:show", importJobId);	
}

function triggerPreviewAppAcceptRejectChangeMsg(node, isAccept){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appContentChannel = Backbone.Radio.channel('content');
	if(isAccept){
		appContentChannel.trigger.call(appContentChannel, "change:accept", node);
	}else{
		appContentChannel.trigger.call(appContentChannel, "change:reject", node);
	}	
}

function triggerPreviewAppLiteEditorInited(editor){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appContentChannel = Backbone.Radio.channel('content');
	appContentChannel.trigger.call(appContentChannel, "lite:editor:init", editor);
}

function triggerPreviewAppLiteEditorTrackChange(editor){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appContentChannel = Backbone.Radio.channel('content');
	appContentChannel.trigger.call(appContentChannel, "lite:editor:track:change", editor);
}

function getCurrentTime(){
	return new Date().getTime();
}

function deleteStoryAjax(pObj, pJournalId, pStoryId){
	if (confirm('Do you want to delete this story?')){
		$.ajax({
			url : gEditPageUrl,
			dataType : 'json',
			async : false,
			data :{
				journal_id : pJournalId,
				guid	   : pStoryId,
				tAction    : 'delete'
			},
			success : function(pAjaxResult){
				if(pAjaxResult){
					window.location.href='/edit_about.php';
				}
			}
		});
	}else{
		return false;
	}
}
function moveStoryAjax(pObj, pJournalId, pStoryId, pDirection){
	$.ajax({
		url : gEditPageUrl,
		dataType : 'json',
		async : false,
		data :{
			journal_id : pJournalId,
			direction  : pDirection,
			guid	   : pStoryId,
			tAction    : 'moveupdown'
		},
		success : function(pAjaxResult){
			if(pAjaxResult){
				window.location.href='/edit_about.php';
			}
		}
	});
}
function initCEChoiceActions(pFldName, pDivToShow, pDivToHide) {
	ShowHideDivs($('input:radio[name=' + pFldName + ']:checked').val(), pDivToShow, pDivToHide);
	
	$('input:radio[name=' + pFldName + ']').change(function(){
		ShowHideDivs($(this).val(), pDivToShow, pDivToHide);
	});
}
function scrollToForm(){

	var lHeaderHeight = $('.documentHeader').height();

	var lFormEl = $('#P-Version-PopUp-Form');
	var lElemToScroll = $(lFormEl).find('.errstr:visible:first');
	if(!lElemToScroll.length){
		return;
		lElemToScroll = lFormEl;
		if(!lFormEl){
			return;
		}
	}
// console.log($(lElemToScroll).offset().top);
// console.log(lHeaderHeight);

	$('html, body').animate( {

		scrollTop : ( $(lElemToScroll).offset().top - lHeaderHeight )
	},
	{
		duration : 20
	});
	gIsScrolled = 1;
}
function getStoryChildrens(pObj, pStoryId, pJournalId){
	$.ajax({
		url : gGetStoryChildrensPageUrl,
		dataType : 'json',
		async : false,
		data :{
			journal_id : pJournalId,
			storyid	   : pStoryId
		},
		success : function(pAjaxResult){
			if(pAjaxResult){
				$(pObj).removeAttr('onclick');
				$(pAjaxResult['html']).insertAfter($(pObj).closest('div.link'));
			}
		}
	});
}
// Reference:
// http://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
;(function($) {

		  // Browser supports HTML5 multiple file?
		  var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
		      isIE = /msie/i.test( navigator.userAgent );

		  $.fn.customFile = function() {

		    return this.each(function() {

		      var $file = $(this).addClass('fileInput-hidden'), // the original
																// file input
		          $wrap = $('<div class="file-upload-wrapper">'),
		          $input = $('<input type="text" class="file-upload-input" />'),
		          // Button that will be used in non-IE browsers
		          $button = $('<button type="button" class="file-upload-button">Browse</button>'),
		          // Hack for IE
		          $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Browse</label>');

		      // Hide by shifting to the left so we
		      // can still trigger events
		      $file.css({
		        position: 'absolute',
		        left: '-9999px'
		      });

		      $wrap.insertAfter( $file )
		        .append( $file, $input, ( isIE ? $label : $button ) );

		      // Prevent focus
		      $file.attr('tabIndex', -1);
		      $button.attr('tabIndex', -1);

		      $button.click(function () {
		        $file.focus().click(); // Open dialog
		      });

		      $file.change(function() {

		        var files = [], fileArr, filename;

		        // If multiple is supported then extract
		        // all filenames from the file array
		        if ( multipleSupport ) {
		          fileArr = $file[0].files;
		          for ( var i = 0, len = fileArr.length; i < len; i++ ) {
		            files.push( fileArr[i].name );
		          }
		          filename = files.join(', ');

		        // If not supported then just take the value
		        // and remove the path to just show the filename
		        } else {
		          filename = $file.val().split('\\').pop();
		        }

		        $input.val( filename ) // Set the value
		          .attr('title', filename) // Show filename in title tootlip
		          .focus(); // Regain focus

		      });

		      $input.on({
		        blur: function() { $file.trigger('blur'); },
		        keydown: function( e ) {
		          if ( e.which === 13 ) { // Enter
		            if ( !isIE ) { $file.trigger('click'); }
		          } else if ( e.which === 8 || e.which === 46 ) { // Backspace
																	// & Del
		            // On some browsers the value is read-only
		            // with this trick we remove the old input and add
		            // a clean clone with all the original events attached
		            $file.replaceWith( $file = $file.clone( true ) );
		            $file.trigger('change');
		            $input.val('');
		          } else if ( e.which === 9 ){ // TAB
		            return;
		          } else { // All other keys
		            return false;
		          }
		        }
		      });

		    });

		  };

		  // Old browser fallback
		  if ( !multipleSupport ) {
		    $( document ).on('change', 'input.customfile', function() {

		      var $this = $(this),
		          // Create a unique ID so we
		          // can attach the label to the input
		          uniqId = 'customfile_'+ (new Date()).getTime(),
		          $wrap = $this.parent(),

		          // Filter empty input
		          $inputs = $wrap.siblings().find('.file-upload-input')
		            .filter(function(){ return !this.value }),

		          $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

		      // 1ms timeout so it runs after all other events
		      // that modify the value have triggered
		      setTimeout(function() {
		        // Add a new input
		        if ( $this.val() ) {
		          // Check for empty fields to prevent
		          // creating new inputs when changing files
		          if ( !$inputs.length ) {
		            $wrap.after( $file );
		            $file.customFile();
		          }
		        // Remove and reorganize inputs
		        } else {
		          $inputs.parent().remove();
		          // Move the input so it's always last on the list
		          $wrap.appendTo( $wrap.parent() );
		          $wrap.find('input').focus();
		        }
		      }, 1);

		    });
		  }

}(jQuery));

function CopyGeneratedXML(doc_id) {
    $copy_xml_ajax = $.ajax({
        type: 'POST',
        url: '/lib/ajax_srv/api_copy_generated_xml.php',
        dataType: 'xml',
        data: {
            document_id: doc_id,
        },
        beforeSend: function () {
            $('#copy_xml_popup_holder').show();
            $('#copy_xml_content .loader').show();
            $('#success_xml_content').val('');
            $('#error_xml_content').text('');
            $('#copy_xml_popup_holder .copy_xml_popup').css({top: window.scrollY + 100 + 'px'});
        },
        success: function (pAjaxResult, status, xhr) {
            if (parseInt($(pAjaxResult).find('returnCode').text())) {
                $('#error_xml_content').text($(pAjaxResult).find('errorMsg').text());
            }
            $('#success_xml_content').val(xhr.responseText);
        },
        fail: function () {
            $('#error_xml_content').text('Ajax query failed!');
        },
        complete: function () {
            $('#copy_xml_content .loader').hide();
        }
    });
}

function closeCopyXMLPopup() {
    $('#copy_xml_popup_holder').hide();
    $('#copy_xml_content .loader').hide();
    $copy_xml_ajax.abort();
}

function QueryString() {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}

function NavigateToDashboardLinkNew(pObject, pParam, pNewValue) {
	var lLink = '/dashboard?';
	if(pObject.length == 0) {
		pObject = {'dummy': 'dummy'};
	}
	delete pObject[pParam];
	pObject[pParam] = pNewValue;
	delete pObject['dummy'];
	window.location.href = lLink + decodeURIComponent($.param(pObject));
}

/**
 * Ajax function which is executed when the user clicks on "Add" in the
 * "materials" menu. This function is somewhat unfortunatel named since there is
 * more than one repository (BOLD) that we are querying.
 * 
 * @param {int}
 *            document_id
 * @param {int}
 *            instance_id
 * @param {string}
 *            search_string
 * @param {string}
 *            repository is the name of the repository which needs to be queried
 *            to get the occurrence information; the parameter repository is
 *            passed to the server page for processing. based on it the
 *            respective API's are called
 * @returns {Boolean}
 */
function boldApiHandler(document_id, instance_id, search_string, repository) {
    var ajax_srv = './bold_srv.php?search=yes';
    var error = "Sorrry! Error! Please make sure that you've entered correct id's and have separated them by '|'. If the problem still persists, contact Pensoft.";
    $.ajax({
        url: ajax_srv,
        type: 'POST',
        dataType: 'json',
        data: {
            'document_id': document_id,
            'instance_id': instance_id,
            'search_string': search_string,
            'repository': repository
        },
        beforeSend: function () {
            showLoading();
        },
        success: function (response) {
           
          // if (response['error'] || response['api_error'] ) {
          // alert(response['text'] )
          // }
          // else if ( response['err_msg']) {
          // alert(response['err_msg'])
          // }
          if(response['error'] || response['err_msg'] || response['api_error']) {
		alert(response['error'] || response['err_msg'] || response['text']);
            }
            else {
                
                if (checkIfPreviewAppIsEnabled()) {
               
                    if (response['import_job_id']) {
                        hideLoading();
                        triggerPreviewAppShowImportReportMsg(response['import_job_id']);
                        return;
                    }
                    triggerPreviewAppActionsMsg('instance:modified', instance_id);
                    triggerPreviewAppPopupMsg('current:popup:reload');
                } else {
                    ChangeInstanceMode(document_id, instance_id, null, null, gInstanceEditMode);
                }

// window.location.href = 'display_document.php?instance_id=' + pInstanceId;
            }
            hideLoading();
        },
    });
    return false;
}

function LayerSEDecisionFrm(pDocumentId) {
	$.ajax({
		url: gSEAjaxSrv,
		dataType: 'json',
		async: false,
		data: {
			pwt_document_id: pDocumentId
		},
		success: function (pAjaxResult) {
			if(typeof pAjaxResult['html'] !== "undefined") {
				$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
				popUp(POPUP_OPERS.open, 'review_popup', 'review_popup');
			}
		}
	});
}

function SubmitSEDecisionForm(pTxt) {
	if (!confirm(pTxt)) {
		return false;
	}
	SubmitSEFormByName('reviewform', 'review');
}

function SubmitSEFormByName(pName, pAction) {
	var lJqForm = $('form[name="' + pName + '"]');
	var lData = '&tAction=' + pAction + '&';
	lData += lJqForm.formSerialize();
	blockUi();
	$.ajax({
		url: gSEAjaxSrv,
		dataType: 'json',
		data: lData,
		type: 'POST',
		success: function (pAjaxResult) {
			unblockUi();
			if (pAction === 'review' || pAction === 'save') {
				if (pAjaxResult['err_cnt'] > 0) {
					$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
				} else {
					popUp(POPUP_OPERS.close, 'review_popup', 'review_popup');
				}
			}
			if (pAjaxResult['redirect']) {
				window.location.href = pAjaxResult['redirect'];
			}
		}
	});
}

function LayerCEDecisionFrm(pDocumentId) {
	$.ajax({
		url: gCEAjaxSrv,
		dataType: 'json',
		async: false,
		data: {
			pwt_document_id: pDocumentId
		},
		success: function (pAjaxResult) {
			if(typeof pAjaxResult['html'] !== "undefined") {
				$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
				popUp(POPUP_OPERS.open, 'review_popup', 'review_popup');
			}
		}
	});
}

function SubmitCEDecisionForm(pTxt) {
	if (!confirm(pTxt)) {
		return false;
	}
	SubmitCEFormByName('reviewform', 'review');
}

function SubmitCEFormByName(pName, pAction) {
	var lJqForm = $('form[name="' + pName + '"]');
	var lData = '&tAction=' + pAction + '&';
	lData += lJqForm.formSerialize();
	blockUi();
	$.ajax({
		url: gCEAjaxSrv,
		dataType: 'json',
		data: lData,
		type: 'POST',
		success: function (pAjaxResult) {
			unblockUi();
			if (pAction === 'review' || pAction === 'save') {
				if (pAjaxResult['err_cnt'] > 0) {
					$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
				} else {
					popUp(POPUP_OPERS.close, 'review_popup', 'review_popup');
				}
			}
			if (pAjaxResult['redirect']) {
				window.location.href = pAjaxResult['redirect'];
			}
		}
	});
}

function selectAuthorFormFieldData(pAuthorId, pFormId, pFieldsData) {	
	if(typeof pFieldsData === 'object') {
		for (var key in pFieldsData) {
			if (pFieldsData.hasOwnProperty(key)) {
				if(key == 'rights'){
					return;
				}
				$('#' + pFormId).find('[name=' + key + ']').val(pFieldsData[key]).trigger('change');
			}
		}
	}

	$.ajax({
		url: gAuthorsSrv,
		dataType: 'json',
		data: {
			action: 'get_single_author_preview',
			author_id: pAuthorId
		},
		async: false,
		type: 'POST',
        success: function (pAjaxResult) {
			$('#addContributorPreviewSelected').html(pAjaxResult['html']);
        }
	});
}

function selectContributorFormFieldData(pContributorId, pFormId, pFieldsData) {	
	if(typeof pFieldsData === 'object') {
		for (var key in pFieldsData) {
			if (pFieldsData.hasOwnProperty(key)) {
				$('#' + pFormId).find('[name=' + key + ']').val(pFieldsData[key]).trigger('change');
			}
		}
	}
	
	$.ajax({
		url: gActionsAjaxSrv,
		dataType: 'json',
		data: {
			action: 'get_single_contributor_preview',
			contributor_id: pContributorId
		},
		async: false,
		type: 'POST',
        success: function (pAjaxResult) {
			$('#addContributorPreviewSelected').html(pAjaxResult['html']);
        }
	});
}

function SubmitAuthorFormByName(pName, pAction, pInstanceId) {
	var lJqForm = $('form[name="' + pName + '"]');
	var lData = '&tAction=' + pAction + '&';
	lData += lJqForm.formSerialize();

	var dfd = $.ajax({
		url: gAuthorsSrv,
		dataType: 'json',
		data: lData,
		async: false,
		type: 'POST',
		beforeSend: function() {
            showLoading();
        },
        success: function (pAjaxResult) {
			if (pAjaxResult['err_cnt'] > 0) {
				$('#' + gGeneralPopUpHolderId).find('.P-PopUp-Main-Holder').html(pAjaxResult['html']);
			}
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				updateInstancePreviewAuthors(pInstanceId);
				eval(pAjaxResult['eval_js']);
				return;
			}
			
        },
        complete: function() {
            hideLoading();
        }
	});
	return dfd.promise();
}

function SubmitCommonFormByName(pName, pAction) {
	var lJqForm = $('form[name="' + pName + '"]');
	var lData = '&tAction=' + pAction + '&';
	lData += lJqForm.formSerialize();
	$.ajax({
		url: gActionsAjaxSrv,
		dataType: 'json',
		data: lData,
		async: false,
		type: 'POST',
		beforeSend: function() {
            showLoading();
        },
        success: function (pAjaxResult) {
			if (pAjaxResult['err_cnt'] > 0) {
				$('#' + gGeneralPopUpHolderId).find('.P-PopUp-Main-Holder').html(pAjaxResult['html']);
			}
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
			
        },
        complete: function() {
            hideLoading();
        }
	});
}

function toggleContributorFormFields(pOper, pFormFieldsContainerId) {
	switch (pOper) {
		case 1: // select from autocomplete
			$('#' + pFormFieldsContainerId).show();
			$('#addContributorFormFields').show();
			$('#addContributorPreviewFormFields').hide();
			
			$('#contributorfrm, #authorfrm')[0].reset();
			$('#popupEditSaveBtn1, #popupEditSaveBtn2').show();
			popUp(POPUP_OPERS.open, gGeneralPopUpHolderId, gGeneralPopUpHolderId);
			break;
		case 2: // select add new contributor
			$('#' + pFormFieldsContainerId).hide();
			$('#addContributorFormFields').show();
			$('#addContributorPreviewFormFields').show();
			$('#addContributorPreviewSelected').html('');
			$('#contributorfrm, #authorfrm')[0].reset();
			$('#popupEditSaveBtn1, #popupEditSaveBtn2').show();
			popUp(POPUP_OPERS.open, gGeneralPopUpHolderId, gGeneralPopUpHolderId);
			break;
	}
	
}

function selectReviewerFormFieldData(pReviewerId, pFormId, pFieldsData) {	
	if(typeof pFieldsData === 'object') {
		for (var key in pFieldsData) {
			if (pFieldsData.hasOwnProperty(key)) {
				$('#' + pFormId).find('[name=' + key + ']').val(pFieldsData[key]).trigger('change');
			}
		}
	}
	
	$.ajax({
		url: gActionsAjaxSrv,
		dataType: 'json',
		data: {
			action: 'get_single_reviewer_preview',
			reviewer_id: pReviewerId
		},
		async: false,
		type: 'POST',
        success: function (pAjaxResult) {
			$('#addReviewerPreviewSelected').html(pAjaxResult['html']);
        }
	});
}

function selectTechnicalEvaluatorFormFieldData(pTEId, pFormId, pFieldsData) {	
	if(typeof pFieldsData === 'object') {
		for (var key in pFieldsData) {
			if(typeof pFieldsData[key] === 'object') { //value is array
				$.each(pFieldsData[key], function(index, element) {
				    $('#' + pFormId).find('[name=' + key + '[]][value=' + element + ']').prop("checked","true");
				});
			} else {
				if (pFieldsData.hasOwnProperty(key)) {
					$('#' + pFormId).find('[name=' + key + ']').val(pFieldsData[key]).trigger('change');
				}
			}	
		}
	}
	
	$.ajax({
		url: gActionsAjaxSrv,
		dataType: 'json',
		data: {
			action: 'get_single_technical_evaluator_preview',
			technical_evaluator_id: pTEId
		},
		async: false,
		type: 'POST',
        success: function (pAjaxResult) {
			$('#addTechnicalEvaluatorPreviewSelected').html(pAjaxResult['html']);
        }
	});
}


function toggleReviewerFormFields(pOper, pFormFieldsContainerId) {
	switch (pOper) {
		case 1: // select from autocomplete
			$('#' + pFormFieldsContainerId).show();
			$('#addReviewerFormFields').show();
			$('#addReviewerPreviewFormFields').hide();
			
			$('#reviewerfrm')[0].reset();
			$('#popupEditSaveBtn').show();
			popUp(POPUP_OPERS.open, gGeneralPopUpHolderId, gGeneralPopUpHolderId);
			break;
		case 2: // select add new Reviewer
			$('#' + pFormFieldsContainerId).hide();
			$('#addReviewerFormFields').show();
			$('#addReviewerPreviewFormFields').show();
			$('#addReviewerPreviewSelected').html('');
			$('#reviewerfrm')[0].reset();
			$('#popupEditSaveBtn').show();
			popUp(POPUP_OPERS.open, gGeneralPopUpHolderId, gGeneralPopUpHolderId);
			break;
	}
	
}

function toggleTechnicalEvaluatorFormFields(pOper, pFormFieldsContainerId) {
	switch (pOper) {
		case 1: // select from autocomplete
			$('#' + pFormFieldsContainerId).show();
			$('#addTechnicalEvaluatorFormFields').show();
			$('#addTechnicalEvaluatorPreviewFormFields').hide();
			
			$('#technical_evaluatorfrm')[0].reset();
			$('#popupEditSaveBtn').show();
			popUp(POPUP_OPERS.open, gGeneralPopUpHolderId, gGeneralPopUpHolderId);
			break;
		case 2: // select add new TechnicalEvaluator
			$('#' + pFormFieldsContainerId).hide();
			$('#addTechnicalEvaluatorFormFields').show();
			$('#addTechnicalEvaluatorPreviewFormFields').show();
			$('#addTechnicalEvaluatorPreviewSelected').html('');
			$('#technical_evaluatorfrm')[0].reset();
			$('#popupEditSaveBtn').show();
			popUp(POPUP_OPERS.open, gGeneralPopUpHolderId, gGeneralPopUpHolderId);
			break;
	}
	
}

function showHideReviewQuestionary(pOper, pShowBtn, pHideBtn, pContent) {
	switch(pOper) {
		case 1: // show
			$('#' + pShowBtn).show();
			$('#' + pContent).show();
			$('#' + pHideBtn).hide();
			break;
		case 2: // hide
			$('#' + pShowBtn).show();
			$('#' + pContent).hide();
			$('#' + pHideBtn).hide();	
			break;
	}
	popUp(POPUP_OPERS.open, gGeneralPopUpHolderId, gGeneralPopUpHolderId);
}

function LayerEditorialDecisionFrm(pDocumentId) {
	$.ajax({
		url: gEditorialDecisionAjaxSrv,
		dataType: 'json',
		async: false,
		data: {
			document_id: pDocumentId
		},
		success: function (pAjaxResult) {
			if (typeof pAjaxResult['html'] !== "undefined") {
				$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
				popUp(POPUP_OPERS.open, 'review_popup', 'review_popup');
			}
		}
	});
}

function SubmitEditorialDecisionForm(pTxt) {
	if (!confirm(pTxt)) {
		return false;
	}
	SubmitEditorialFormByName('reviewform', 'review');
}

function SubmitEditorialFormByName(pName, pAction) {
	var lJqForm = $('form[name="' + pName + '"]');
	var lData = '&tAction=' + pAction + '&';
	lData += lJqForm.formSerialize();

	$.ajax({
		url: gEditorialDecisionAjaxSrv,
		dataType: 'json',
		data: lData,
		async: false,
		type: 'POST',
		success: function (pAjaxResult) {
			if (pAction === 'review' || pAction === 'save') {
				if (pAjaxResult['err_cnt'] > 0) {
					$('.P-PopUp-Main-Holder-Review').html(pAjaxResult['html']);
				} else {
					popUp(POPUP_OPERS.close, 'review_popup', 'review_popup');
				}
			}
			if (pAjaxResult['redirect']) {
				location.reload();
			}
		}
	});
}

function SetCookie(c_name,value,expiredays){
	var exdate = new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie = c_name+ "=" +escape(value)+";path=/"+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}


function submitFeedbackFrom() {
	$('.errorHolder').hide();
	var lFormData = $('form[name="feedbackfrm"]').serialize() + '&tAction=send_feedback&use_json=1';

	$.ajax({
		type: 'POST',
		url: '/lib/ajax_srv/feedback.php',
		dataType: 'json',
		data: lFormData,
		success: function (pAjaxResult) {
			$('.errorHolder').hide();
			if(pAjaxResult['err_cnt'] > 0) {

				$('.errorHolder').hide();
				$('#feedback').html(pAjaxResult['html']);
			} else {
// CreateNewTask('feedback_form_submit', lFormData);
				popUp(POPUP_OPERS.close, 'feedback', 'feedback');
			}
		},
		error: function (xhr, type, exception) {
			alert("ajax error response type: " + type);
		}
	});
}

function feedbackPopup(pDocumentId, pUserId) {
	var lSerializedFormValues = $('form[name="feedback"]').serialize() + '&document_id=' + pDocumentId + '&user_id=' + pUserId;

	$.ajax({
		url: '/lib/ajax_srv/feedback.php',
		async: false,
		data: lSerializedFormValues,
		type: 'POST',
		dataType: 'json',
		success: function (pAjaxResult) {
			$('#feedback').html(pAjaxResult['html']);
			$('.errorHolder').hide();
			popUp(POPUP_OPERS.open, 'feedback', 'feedback');
		},
		error: function (xhr, status, error) {
			console.log(xhr);
		}
	});
}

function getFileBaseDocumentAuthorsList(pDocumentId, pHolder, isDisabled) {
	if(typeof isDisabled == "undefined"){
		isDisabled = false;
	}
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gAutocompleteAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : 'get_file_base_document_author_list',
			role : lRole
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
				if(isDisabled){
					$(".unchecked").attr("disabled", true);
					$("td.visible").css("display", "none");
					$(".sub_step_3_is_visible").addClass('visible');
				}

			}
		}
	});
}

function ChangeCoAuthor(pDocumentId, pUid, pAuthorListHolder) {
	$.ajax({
		url : gAutocompleteAjaxSrv,
		type : 'POST',
		data : {
			document_id : pDocumentId,
			uid : pUid,
			action : 'change_co_author_for_document'
		},
		success : function(pAjaxResult) {
			getFileBaseDocumentAuthorsList(pDocumentId, pAuthorListHolder);
		}
	});
}

function autoCompleteAuthors(SITE_URL, pDocumentId, pSearchElement, pAuthorHolder) {
	$.ui.autocomplete.prototype._renderMenu = function(ul, items) {
		var self = this;
		ul.append('<table width="100%" cellspacing="0">' +
				'<tbody>' +
				'</tbody>'+
				'</table>');
		$.each( items, function( index, item ) {
			self._renderItem( ul.find("table tbody"), item );
		});
		self._renderElFooter( ul.find("table tbody"));
	};

	$.ui.autocomplete.prototype._renderElFooter = function ( table ) {
		var TR =  $( "<tr></tr>" )
				.append("<td align=\"center\" colspan=\"4\"><a href=\"javascript:AddEditDocumentAuthor(" + pDocumentId + ")\">add new author</a></td>")
				.appendTo( table );
		return TR;
	};

	$.ui.autocomplete.prototype._renderItem = function ( table, row ) {

		if(row.id) {
			var TR =  $( "<tr></tr>" )
					.data( "item.autocomplete", row )
					.append(
							"<td class=\"name\">" + row.name + ' ' + row.lastname + "</td>" +
							"<td class=\"affiliation\">" + row.affiliation + "</td>" +
							"<td class=\"affiliation\">" + row.email + "</td>" +
							"<td>&nbsp;&nbsp;<a href=\"javascript:AddEditDocumentAuthor(" + pDocumentId + ", " + row.id + ")\">edit&nbsp;info</a>&nbsp;|" +
							"&nbsp;<a href=\"javascript:AddRemoveAuthorToDocument(1, " + row.id + ", " + pDocumentId + ", '" + pAuthorHolder + "')\">add&nbsp;to&nbsp;list</a>&nbsp;&nbsp;" +
							"</td>"
					)
					.appendTo( table );
			return TR;
		}
	};

	$.ui.autocomplete.prototype._resizeMenu = function () {
		var ul = this.menu.element;
		ul.outerWidth(this.element.outerWidth());
	};

	$(document).ready(function () {
		$(pSearchElement).autocomplete({
			source: SITE_URL + gAutocompleteAjaxSrv + '?document_id=' + pDocumentId + '&action=get_users&notempty=1',
			autoFocus: true,
			minLength: 3,
			select: function(){
				$("#author_search").val("");
				return false;
			}
		});
	});
}
function reorderDocumentAuthor(pOper, pDocumentId, puid) {
	$.ajax({
		url : gAutocompleteAjaxSrv,
		type : 'POST',
		data : {
			oper : pOper,
			document_id : pDocumentId,
			uid : puid,
			action : 'reorder_document_author'
		},
		success : function(pAjaxResult) {
			getFileBaseDocumentAuthorsList(pDocumentId, '#file_base_authors_list_content');
		}
	});
}
function AddRemoveAuthorToDocument(pOper, pAuthorId, pDocumentId, pAuthorListHolder) {
	var lAction = 'add_author_to_document';
	if(pOper == 2) {
		var lAction = 'remove_author_from_document';
	}

	$.ajax({
		url : gDocumentAjaxSrv,
		data : {
			document_id : pDocumentId,
			user_id : pAuthorId,
			action : lAction
		},
		success : function(pAjaxResult) {
// console.log(pAjaxResult);
			if(pAjaxResult['result'] == 2) {
				AddEditDocumentAuthor(pDocumentId, pAuthorId, 1, 1);
			} else {
				getFileBaseDocumentAuthorsList(pDocumentId, pAuthorListHolder);
			}
		}
	});
}
function addTitleToDocument(pDocumentId, pSelectInput){
	$.ajax({
		url : gVersionAjaxSrv,
		data : {
			document_id : pDocumentId,
			is_save_title : 1,
			content : pSelectInput,
			action : 'save_version_change'
		},
		success : function(pAjaxResult) {}
	});
}
function saveFileBaseAuthorForm(pAction, pUserId, pDocumentId){

	if(pAction == 'save'){

		usrtitle = $('select[name="usrtitle"] option:selected').val();
		firstname = $('input[name="firstname"]').val();
		lastname = $('input[name="lastname"]').val();
		affiliation = $('input[name="affiliation"]').val();
		city = $('input[name="city"]').val();
		$('.ajax_form_field_errors').html('');
		var err_msg = '';
		if(firstname.length == 0)
			err_msg += '<p>Empty First name!</p>';
		if(lastname.length == 0)
			err_msg += '<p>Empty Last name!</p>';
		if(affiliation.length == 0)
			err_msg += '<p>Empty Affiliation!</p>';
		if(city.length == 0)
			err_msg += '<p>Empty City!</p>';

			// console.log(firstname);
		if(err_msg.length > 0){
			$('.ajax_form_field_errors').html(err_msg);
		}
		else{
			$.ajax({
				url : gDocumentAjaxSrv,
				type : 'POST',
				data : {
					document_id : pDocumentId,
					user_id : pUserId,
					title_id : $('select[name="usrtitle"] option:selected').val(),
					first_name : $('input[name="firstname"]').val(),
					last_name : $('input[name="lastname"]').val(),
					affiliation : $('input[name="affiliation"]').val(),
					city : $('input[name="city"]').val(),
					country : $('select[name="country"] option:selected').val(),
					email : $('input[name="email"]').val(),
					action : 'save_file_base_author_form',
				},
				success : function(pAjaxResult) {
					getFileBaseDocumentAuthorsList(pDocumentId, '#file_base_authors_list_content');
					$('#file_base_authors_search_holder').show();
					$('#author_form').children().remove();

				}
			});
		}
	}else{
		$('#file_base_authors_search_holder').show();
		$('#author_form').children().remove();
	}

}
function AddEditDocumentAuthor(pDocumentId, pUsrId, pCountryErr, pBlurFields) {
	var ltAction = 'new';
	var if_exist_user;

	if(!pCountryErr || pCountryErr == 'undefined') {
		pCountryErr = 0;
	}

	if(typeof pUsrId == 'undefined'){
		if_exist_user = 0;
	}else{
		if_exist_user = 1;
	}

	$.ajax({
		url : gDocumentAjaxSrv,
		type : 'POST',
		data : {
			document_id : pDocumentId,
			user_id : pUsrId,
			action : 'author_edit_add_document_author_form',
			tAction : ltAction,
			if_exist_user: if_exist_user,
			err_country: pCountryErr
		},
		success : function(pAjaxResult) {
			if(typeof pAjaxResult == 'string'){
				pAjaxResult = JSON.parse(pAjaxResult);
			}
			$('.ui-autocomplete').hide();
			if(!pAjaxResult['form_errors'] && pAjaxResult['close']) {
				$('#file_base_authors_search_holder').show();
				$('#author_form').hide();
			} else {
				$('#file_base_authors_search_holder').hide();
				$('#author_form').show();
				$('#author_form').html(pAjaxResult.html);
			}
			if(pBlurFields == 1) {
				// var lForm =
				$('form[name="document_author_form"]').find('input, select').not('input[name="email"]').each(function(){
					$(this).trigger('blur');
					$(this).trigger('change');
				});
			}
		}
	});
}

function CheckAuthorExistByEmail(pAuthorEmail) {
	var lAction = 'check_user_exists';
	var lDocumentId = $('input[name="document_id"]').val();
	$.ajax({
		url : gDocumentAjaxSrv,
		data : {
			document_id: lDocumentId,
			email : $(pAuthorEmail).val(),
			action : lAction
		},
		success : function(pAjaxResult) {
			pAjaxResult = JSON.parse(pAjaxResult);
			var hrefData = '';
			if(pAjaxResult['err_cnt']){
				$('.ajax_form_field_errors').html(pAjaxResult['err_msg']);
				$('.document_add_new_author').attr('href', 'javascript: alert(\''+pAjaxResult['err_msg']+'\')')
			}else{
				hrefData = $('.document_add_new_author').attr('data-href');
				$('.document_add_new_author').attr('href', hrefData);
				$('.ajax_form_field_errors').html('');
			}
			if(pAjaxResult['result'] > 0) {
				AddEditDocumentAuthor(lDocumentId, pAjaxResult['result'], 0, 1);
			}
		}
	});
}

/* Upload Form */
function drawFileBaseTableRow(obj, _class){
	$(_class).append("<tr  data-fileid="+obj.file_id+"><td>"+obj.file_label+"</td><td><a href='/getfile.php?filename="+obj.file_name+"'>"+obj.file_name+"</a></td><td class='visible'><a href='javascript:deleteFileBaseTableRow("+obj.document_id+", "+obj.file_id+")'>delete</a></td></tr>");
}
function drawFileBaseTableRows(obj){
	$.each(obj, function(k, r){
		drawFileBaseTableRow(r, '#upl_files_list_holder2 .sub_step_3_file > tbody');
	});
}
function getDocumentFiles(pDocumentId, isDisabled){
	if(typeof isDisabled == "undefined"){
		isDisabled = false;
	}
	$.ajax({
		url : gDocumentAjaxSrv,
		data : {
			document_id : pDocumentId,
			action : 'get_all_attached_files'
		},
		success : function(pAjaxResult) {
			pAjaxResult = JSON.parse(pAjaxResult);
			if(pAjaxResult.err_cnt == 0){
				if(pAjaxResult.result != 'undefined'){
					drawFileBaseTableRows(pAjaxResult.result);
					if(isDisabled){
						$("td.visible").css("display", "none");
					}
				}
			}else{
				$("#errors").append(pAjaxResult.errorMsg);
				return false;
			}
		}
	});	 
}
function deleteFileBaseTableRow(pDocumentId, id){
	el = $(".sub_step_3_file");
	if(el.find("[data-fileid='" + id + "']").length){
		el.find("[data-fileid='" + id + "']").remove(); // ajax remove file from
														// db
		$.ajax({
			url : gDocumentAjaxSrv, // gVersionAjaxSrv
			data : {
				document_id : pDocumentId,
				file_id : id,
				action : 'remove_file_based_file'
			},
			success : function(pAjaxResult) {
				
			}
		});	
	}
}

function showLoadingGif(){
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
	setTimeout($.unblockUI, 60000);
}

function updateResolved(pPollAnswerId){
	var el = $('#resolved_'+pPollAnswerId);
	var resolved;
	if(el.is(':checked')){
		resolved = 1;
	}else{
		resolved = null;
	}
	$.ajax({
		url : gSavePollAnswerSrv, 
		data : {
			poll_answer_id : pPollAnswerId,
			resolved: resolved
		},
		success : function(pAjaxResult) {

		}
	});
	
}


function defineSiteTour(pSteps, pRole){
	if(!pSteps)
		return;
	var stepsCount = pSteps.length;
	var steps = [];
	var lUrl = 'create_document';
	if(pRole){
		lUrl = 'preview';
	}
	var tour = new Tour({
		name: 'tour',
		container: 'body',
		debug: true,
		backdrop: true,
		orphan: true, 
		animation: false,
		storage: false, // window.localStorage
		afterSetState: function (key, value) {
			if(key == 'tour_end' && value == 'yes'){
				tour.setCurrentStep(0);
			}
		},
		titleTemplate: function(i, title) {
			return '<strong>(' + i + '/' + stepsCount + ')</strong> ' + title;
		},
		template: function(i, step) {
			return '<div class="popover tour" id="popup-site-tour">\n\
						<div data-role="end" onClick="EndSiteTour(\''+lUrl+'\',\''+pRole+'\',\''+pSteps[i].site_tour_id+'\');" class="P-PopUp-Close-Btn"></div>\n\
						<div class="arrow"></div>\n\
						<h3 class="P-PopUp-Title">'+step.title+'</h3>\n\
						<div class="P-PopUp-Content"><div class="site_tour_content">'+step.content+'</div></div>\n\
						<div class="popover-navigation P-PopUp-Footer-Holder">\n\
							<div class="btn-group">\n\
								<button class="btn btn-default submit-btn-sitetour" data-role="prev">« Prev</button>\n\
								<button class="btn btn-default submit-btn-sitetour" data-role="next">Next »</button>\n\
							</div>\n\
							<span>&nbsp;&nbsp;&nbsp;'+(i + 1)+' / '+stepsCount+'</span>\n\
							<button class="btn btn-end-tour" data-role="end" onclick="EndSiteTour(\''+lUrl+'\',\''+pRole+'\',\''+pSteps[i].site_tour_id+'\');">Skip tutorial</button>\n\
						</div>\n\
					  </div>';
		},
	});
	for ( var i = 0; i < stepsCount; i++ ) {
		var element = pSteps[i].element;
		if( pSteps[i].element.indexOf('$') != -1 ){			
			element = eval(pSteps[i].element);
		}
		var on_shown = 'doNothing';
		if(typeof pSteps[i].on_shown != 'undefined'){
			on_shown = pSteps[i].on_shown;
		}
		
		var on_hidden = 'doNothing';
		if(typeof pSteps[i].on_hidden != 'undefined'){
			on_hidden = pSteps[i].on_hidden;
		}
		var on_prev = 'doNothing';
		if(typeof pSteps[i].on_prev != 'undefined'){
			on_prev = pSteps[i].on_prev;
		}
		var on_next = 'doNothing';
		if(typeof pSteps[i].on_next != 'undefined'){
			on_next = pSteps[i].on_next;
		}
		steps.push({
			element: element,
			title: pSteps[i].title,
			content: pSteps[i].content,
			container: pSteps[i].container,
			placement: pSteps[i].placement,
			onShown: generateOnClickFunction(on_shown, element),
			onHidden: generateOnClickFunction(on_hidden, element),
			onPrev: generateOnClickFunction(on_prev, element),
			onNext: generateOnClickFunction(on_next, element),
			scrollContainer: pSteps[i].scroll_container,//'.ps-active-y',
		});
	}
	tour.addSteps(steps);
	
	return tour;
}

function generateOnClickFunction(pOnClick, element){
	return function(){
		if(!pOnClick || !window[pOnClick || pOnClick == null]){
			return;
		}
		window[pOnClick](element);
	}
}

function startTour(pRole, pTemplateId){
	if(!pRole){
		loadTheTour(0, 0);
	}else{
		this.globalChannel = Backbone.Radio.channel('global');
		var navLoaded = this.globalChannel.request('nav:loadedflag');
		
		if(navLoaded) {// start the tour before navLoaded is set
			loadTheTour(pRole, pTemplateId);
		} else {
			this.globalChannel.on('nav:loaded', function(){

			}).on('preview:loaded', function(){
				loadTheTour(pRole, pTemplateId);
			});	
		}
	}
}

function loadTheTour(pRole, pTemplateId){
	if (typeof Backbone !== "undefined") {
		this.globalChannel = Backbone.Radio.channel('global');
		var showPredefinedSectionsPopup = this.globalChannel.request('show:predefined:sections');
		if(showPredefinedSectionsPopup == 1)
			return false;
	}
	
		getTourSteps(pRole, pTemplateId).then(function(response){
			if(!response)
				return;
			var steps = $.parseJSON(response);
			var tour = defineSiteTour(steps, pRole);
			
			// Initialize the tour
			tour.init(true);
			setTimeout(function(){
				// Start the tour
				tour.start(true);
			}, 1000);
			
			

		});
}

function getTourSteps(pRole, pTemplateId){
	var result = $.ajax({
							url : gDocumentAjaxSrv,
							async : false,
							data : {
								document_template_id : pTemplateId,
								role_id : pRole,
								action : 'get_tour_data'
							},
							success : function() {}
						});
	return result.promise();
}

function EndSiteTour(pUrl, pRole, pSiteTourId){
	$.ajax({
		url : gDocumentAjaxSrv,
		async : false,
		data : {
			url : pUrl,
			role_id : pRole,
			site_tour_id : pSiteTourId,
			action : 'end_site_tour'
		},
		success : function(pAjaxResult) {}
	});
}



// function cbAfterSubmitFiles(obj){
// $("#file_upload_process").hide(); // hide process

// obj = obj[0];
// if(obj.isError == 1){
// $("#errors").append(obj.errorMsg);
// return false;
// }
// $('#file_label').val('');
// $('#uploadfile').val('').attr("disabled", "disabled");
// drawFileBaseTableRows(obj.result);
// }

// function startuploadingfilebaseform(){
// $("#uploadfile").off("change");
// $("#uploadfile").on("change", function(){
// $("#convertocumentform").submit();
// $("#file_upload_process").show();
// });
// return true;
// }
// function removeIframe(_class){
// $(_class).remove();
// $('#convertocumentform').removeAttr('target');

// $('#convertocumentform').submit();
// }
/* Upload Form END */

function InitReferenceCitationPreviews(pCase, pNode) {
	var refs, lReferenceContent, lBaloon;
	switch (pCase) {
		case 1://all citations
			refs = $('xref[type=bibr][rid]');
			break;
		case 2://in iframe and node
			if(pNode) {
				refs = GetPreviewContent().find(pNode).find('xref[type=bibr][rid]');
			} else {
				refs = GetPreviewContent().find('xref[type=bibr][rid]');
			}
			break;
		case 3://in node
			refs = $(pNode).find('xref[type=bibr][rid]');
			break;
	}
	
	refs.each(function (pIdx, pReferenceNode) {
		var lReferenceId = $(pReferenceNode).attr('rid');
		$(pReferenceNode).hover(
				function (pEvent) {
					switch (pCase) {
						case 1://all citations
						case 3://in node
							lReferenceContent = $('.ref-list-AOF-holder[data-main-instance-id="' + lReferenceId + '"]');
							lBaloon = $('#' + gBaloonId, parent.document);
							break;
						case 2://in iframe and node
							lReferenceContent = GetPreviewContent().find('.ref-list-AOF-holder[data-main-instance-id="' + lReferenceId + '"]');
							lBaloon = $('#' + gBaloonId);
							break;
					}
					if(!lReferenceContent.length) {
						return;
					}
					var offset = {
						left: 0,
						top: 0
					};
					offset = top.$('.P-Wrapper-Container-Middle').offset();
					var that = $(this);
					var elementPosition = that.position();
					var xCoord = offset.left + // distance between screen and iframe
							elementPosition.left; // width of the element

					var yCoord = offset.top + // distance between screen and iframe
							elementPosition.top + // distance between iframe and element
							that.height() - 40;
					lBaloon.html(lReferenceContent.text());
//					var lReferenceOffsetTop = $(pReferenceNode).offset().top + $(pReferenceNode).outerHeight();
//					var lReferenceOffsetLeft = $(pReferenceNode).offset().left;
					lBaloon.css('top', yCoord);
					lBaloon.css('left', xCoord);
					lBaloon.show();
				},
				function (pEvent) {
					switch (pCase) {
						case 1://all citations
						case 3://in node
							lBaloon = $('#' + gBaloonId, parent.document);
							break;
						case 2://in iframe and node
							lBaloon = $('#' + gBaloonId);
							break;
					}
					lBaloon.hide();
				}
		);
	});
}

/**
 * jquery clickoff event detects click outside given element (used in Article
 * preview iframe)
 *
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
	$.fn.clickOff = function (element, callback) {
		var clicked = false;
		var parent = this;

		parent.click(function () {
			clicked = true;
		});
		element.click(function (event) {
			if(!clicked) {
				callback(parent, event);
			}
			clicked = false;
		});
	};

}(jQuery));

function setDesignSelectValue(pHolderId, pThis) {
	var lValue = $("#" + pHolderId + " option[value='" + $(pThis).val() + "']").text();
	if(lValue)
		$("#" + pHolderId).siblings( '.' + gSelectedOptionClass ).html( lValue );
}

function ReorderPopupItemsByType(pObjectId, pInstanceId, pDocumentId) {
	$.ajax({
		url: '/lib/ajax_srv/reorder_srv.php',
		dataType: 'json',
		data: {
			object_id: pObjectId,
			document_id: pDocumentId,
			instance_id: pInstanceId,
			items_ids: $('input[name="instance_in_viewmode_ids[]"]').map(function () {
				return $(this).val();
			}).get()
		},
		type: 'POST',
		beforeSend: function() {
            showLoading();
        },
		success: function (pAjaxResult) {
			ChangeInstanceMode(pDocumentId, pInstanceId, null, null, gInstanceEditMode);
		},
        complete: function() {
            hideLoading();
        }
	});
}

function TipsAndTricksPopUp(pPopupId) {
	var dfd;
	dfd = $.ajax({
		url: gAjaxUrlsPrefix + 'tips_tricks_srv.php',
		dataType: 'json',
		beforeSend: function () {
			showLoading();
		},
		success: function (pAjaxResult) {
			$('#' + pPopupId).find('.P-PopUp-Main-Holder').html(pAjaxResult['html']);
			popUp(POPUP_OPERS.open, pPopupId, pPopupId);
		},
		complete: function () {
			hideLoading();
		}
	});
	return dfd.promise();
}

function SetBrowserSession(pBrowserSessionInfo) {
	$.ajax({
		url: gActionsAjaxSrv,
		dataType: 'json',
		data: {
			action: 'set_user_browser_session',
			browser_name: pBrowserSessionInfo['name'],
			browser_version: pBrowserSessionInfo['version'],
			os_name: pBrowserSessionInfo['osname'],
			os_version: pBrowserSessionInfo['osversion']
		},
		async: false,
		type: 'POST'
	});
}

function confirmApproveForCollection(pDocumentId, pCollectionId, pCollectionName){
	if(confirm('Are you sure you want to approve this article for collection \'' + pCollectionName + '\'?')) {
		window.location = gActionsAjaxSrv + '?action=approve_collection&document_id=' + pDocumentId + '&collection_id=' + pCollectionId + '';
	}
}
function confirmRejectForCollection(pDocumentId, pCollectionId, pCollectionName){
	if(confirm('Are you sure you want to remove this article for collection \'' + pCollectionName + '\'?')) {
		window.location = gActionsAjaxSrv + '?action=reject_collection&document_id=' + pDocumentId + '&collection_id=' + pCollectionId + '';
	}
}

function Collapse(pOper, pClosedDiv, pOpenedDiv) {
	if(pOper == 0) {
		$('#' + pClosedDiv).show();
		$('#' + pOpenedDiv).hide();
	} else {
		$('#' + pOpenedDiv).show();
		$('#' + pClosedDiv).hide();
	}
}

function filterMessages(pFormName){
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&action=get_filtered_messages';

	$.ajax({
		url: gActionsAjaxSrv,
		async: false,
		dataType: 'json',
		type: 'POST',
		data : lFormData,
		success: function(pAjaxResult){
			$('.messageListHolder').html(pAjaxResult.html);
		}
	});

	return false;
}

var pastValue, pastSelectionStart, pastSelectionEnd;
function checkPercentKeyDown(e, input) {
	if($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
			// Allow: Ctrl+A, Command+A
		(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
		(e.keyCode >= 35 && e.keyCode <= 40)) {
		// let it happen, don't do anything
		return;
	}
	// Ensure that it is a number and stop the keypress
	if((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
	}
	pastValue = input.value;
	pastSelectionStart = input.selectionStart;
	pastSelectionEnd = input.selectionEnd;
}
function checkPercentKeyUp(e, input) {
	var regex = /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/;
	if(input.value.length > 0 && !regex.test(input.value)) {
		if(input.value > 100) {
			input.value = 100;
		} else {
			input.value = parseInt(pastValue);
			input.selectionStart = pastSelectionStart;
			input.selectionEnd = pastSelectionEnd;
		}
	}
}

function ToggleArchiveUrlUploadForm() {
	$('#archive-url-upload-form').toggle();
	$('#archive-file-upload-form').toggle();
	$('#archive_url').val('');
}

function ImportFSKXArchiveFromUrl(url) {
	let input = url || $.trim($('input[name="archive_url"]').val());
	if (!input) {
		alert('URL field is empty');
		return;
	}
	$.ajax({
		url: '/import_fskx_model.php',
		dataType: 'json',
		data: {
			action: 'upload_fskx_file_from_url',
			url: input
		},
		success: function (res) {
			if (res == 1) {
				window.location.href = "/import_fskx_model.php?step=2";
			} else {
				alert(res);
			}
		}
	});
}

function ImportAginfraResource() {
	let input = $.trim($('input[name="aginfra_id"]').val());
	if (!input) {
		alert('Resource ID field is empty');
		return;
	}
	window.location.href='/import_aginfra_resource.php?itemId=' + input;
}

function redirectToPjs(pDocumentId){
	$.ajax({
		url: gDocumentAjaxSrv,
		dataType: 'json',
		data: {
			action: 'get_pjs_document_id',
			document_id: pDocumentId
		},
		success: function (pAjaxResult) {
			window.location.href = pAjaxResult.url;
		}
	});
}