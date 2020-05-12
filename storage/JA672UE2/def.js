var gBrowserSession = {};
var gFocus = 'JS-Focus';
var gInputHolder = 'P-Input-Holder';
var gActiveClass = 'P-Active';
var rule = ".dashboard tbody:hover td { background: #EED; }";

var gAjaxUrlsPrefix = '/lib/ajax_srv/';

var gCreateEventAjaxSrv = gAjaxUrlsPrefix + 'create_event_srv.php';
var gManageJournalAboutPagesPageUrl = 'manage_journal_about_pages.php';
var gEditPageUrl = 'edit.php';
var gEditGroupUrl = 'edit_journal_group.php';
var gJournalUsersPageUrl = 'manage_journal_users.php';
var gCreateUserPageUrl = 'create_user.php';
var gEmailTemplateJournalUrl = gAjaxUrlsPrefix + 'email_template_journal_srv.php';
var gGetStoryChildrensPageUrl = gAjaxUrlsPrefix + 'get_story_childrens_srv.php';
var gGeneratePDFAjaxSrv = gAjaxUrlsPrefix + 'generate_pdf.php';
var gGenerateAOFAjaxSrv = gAjaxUrlsPrefix + 'generate_aof.php';
var gLeftContainerClass = "P-Wrapper-Container-Left";
var gLeftContainerClassHide = "P-Wrapper-Container-Left-Hide";
var gRightContainerClass = "P-Wrapper-Container-Right";
var gRightContainerClassHide = "P-Wrapper-Container-Right-Hide";
var gDocumentAjaxSrv = gAjaxUrlsPrefix + 'document_srv.php';
var gArticleAjaxSrv = gAjaxUrlsPrefix + 'article_ajax_srv.php';
var gUserAjaxSrv = gAjaxUrlsPrefix + 'usr_autocomplete_srv.php';
var gMetadataAjaxSrv = gAjaxUrlsPrefix + 'edit_metadata.php';
var gFileListSrv = gAjaxUrlsPrefix + 'get_filelist.php';
var gJournalFileListSrv = gAjaxUrlsPrefix + 'get_journal_filelist.php';
var gVersionAjaxSrv = 'view_version.php';
var gFileEditAjaxSrv = gAjaxUrlsPrefix + 'files_edit.php';
var gMergeUsersAjaxSrv = gAjaxUrlsPrefix + 'merge_users_srv.php';

var gPWTDocumentSourceType = 1;
var gFilebaseDocumentSourceType = 2;
var gPreviewIframeId = 'previewIframe';

var gMiddleContainerClass = "P-Article-Content";

var gWindowIsLoaded = false;

var gPageIsUnloading = false;

var gReviewFormManualSaving = false;

if (window.addEventListener) {
  window.addEventListener('beforeunload', function (e) {
		gPageIsUnloading = true;
	}, false);
} else if (el.attachEvent)  {
  window.attachEvent('onbeforeunload', function (e) {
  	gPageIsUnloading = true;
  });
}
var gBaloonId = 'ArticleBaloon';

var gCurrentInlineCKEInstanceName = '';
var gCERole = 9;

function p(printThis) { console.log(printThis); }

function isExternalResource(str, exclude_pattern){
    var tarea = str;
    var tarea_regex = /^http\:/;
    var exclude_regex = exclude_pattern.test(String(tarea).toLowerCase());
    if(tarea_regex.test(String(tarea).toLowerCase()) == true && exclude_regex == false){
        return true;
    }
    return false;
}
function replaceHttpContent(element, exclude_pattern){
  element.each(function( index ) {
    var loc = window.location;
    var attrSrc = $( this ).attr('src');
    if(isExternalResource(attrSrc, exclude_pattern)){
      $( this ).attr('src', loc.protocol+'//'+loc.host+'/load_http_content.php?url='+encodeURIComponent(attrSrc));
    }
  });
}

function getAjaxObject() {
	try{
		var xmlhttp = new XMLHttpRequest();
	}catch(err1){
		var ieXmlHttpVersions = new Array();
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp.7.0";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp.6.0";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp.5.0";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp.4.0";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp.3.0";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "MSXML2.XMLHttp";
		ieXmlHttpVersions[ieXmlHttpVersions.length] = "Microsoft.XMLHttp";

		var i;
		for(i = 0; i < ieXmlHttpVersions.length; i++){
			try{
				var xmlhttp = new ActiveXObject(ieXmlHttpVersions[i]);
				break;
			}catch(err2){

			}
		}
	}
	return xmlhttp;
}

function DownloadTable(pInstanceId, pSiteUrl) {
	document.location.href = pSiteUrl + 'lib/ajax_srv/csv_export_srv.php?action=export_table_as_csv&instance_id=' + pInstanceId;
	return;
}

function AjaxLoad(link, elementid) {
	var element = document.getElementById(elementid);
	if(!element)
		return;
	var AjaxObject = getAjaxObject();
	if(typeof AjaxObject == "undefined"){
		alert(LANG['js.pjs.ajaxAlert']);
		return;
	}
	AjaxObject.open("GET", link, true);
	AjaxObject.send(null);
	AjaxObject.onreadystatechange = function() {
		if(AjaxObject.readyState == 4 && AjaxObject.status == 200){
			element.innerHTML = AjaxObject.responseText;
		}
	};
	return;
}

function hideDropdownWhenBoring(id) {
	if ($("#" + id + " option").length < 2) {
		$("#" + id).hide();
		$("#" + id + "_label").hide();
	}
}

function hideDropdownUserCollections(id, allow_user_collections) {
		if ($("#" + id + " option").length < 2 && allow_user_collections == 0) {
			$("#" + id).hide();
		}
}

function reloadCaptcha() {
	var img = document.getElementById('cappic');
	img.src = 'lib/frmcaptcha.php?rld=' + Math.random();
	return false;
}

function rldContent(t, txt) {
	if(t.value == txt){
		t.value = '';
	}
}

function rldContent2(t, txt) {
	//console.log(t.value, txt);
	if(t.value == ''){
		t.value = txt;
	}
}

function CheckLoginForm(frm, uname, upass) {
	if(frm.uname.value == uname){
		frm.uname.value = '';
	}

	if(frm.upass.value == upass){
		frm.upass.value = '';
	}

	return true;

}

function pollsubmit(p, t, cid) {
	var http_request = getAjaxObject();
	if(!http_request)
		return true;

	disablepollbuttons(p);

	http_request.onreadystatechange = function() {
		poll_submit_callback(http_request, cid);
	};

	var qry = generatepollquery(p);

	var lmethod = 'GET';

	http_request.open(lmethod, 'lib/poll_submit.php?type=' + t + '&' + (lmethod == 'GET' ? qry : ''), true);
	if(lmethod == 'POST')
		http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(lmethod == 'GET' ? null : qry);

	return false;
}

function pollsubmitleft(p, t, cid) {
	var http_request = getAjaxObject();
	if(!http_request)
		return true;

	disablepollbuttons(p);

	http_request.onreadystatechange = function() {
		poll_submit_callback(http_request, cid);
	};

	var qry = generatepollquery(p);

	var lmethod = 'GET';

	http_request.open(lmethod, 'lib/poll_submit_left.php?type=' + t + '&' + (lmethod == 'GET' ? qry : ''), true);
	if(lmethod == 'POST')
		http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(lmethod == 'GET' ? null : qry);

	return false;
}

var lastsubmitbut = '';
var lastsubmitval = '';

function poll_btnclick(b) {
	lastsubmitbut = b.name;
	lastsubmitval = b.value;
	return true;
}

function generatepollquery(f) {
	var retstr = "";
	for( var i = 0; i < f.elements.length; i++){
		if(f.elements[i].type.toLowerCase() == 'text' || f.elements[i].type.toLowerCase() == 'textarea' || f.elements[i].type.toLowerCase() == 'hidden'){
			retstr += f.elements[i].name + "=" + escape(f.elements[i].value) + "&";
		}else if(f.elements[i].type.toLowerCase() == 'submit'){
			if(f.elements[i].name == lastsubmitbut && f.elements[i].value == lastsubmitval)
				retstr += f.elements[i].name + "=" + escape(f.elements[i].value) + "&";
		}else if(f.elements[i].type.toLowerCase() == 'select'){
			retstr += f.elements[i].name + "=" + escape(f.elements[i].options[f.elements[i].selectedIndex]) + "&";
		}else if(f.elements[i].type.toLowerCase() == 'radio' || f.elements[i].type.toLowerCase() == 'checkbox'){
			if(f.elements[i].checked)
				retstr += f.elements[i].name + "=" + escape(f.elements[i].value) + "&";
		}
	}
	return retstr;
}

function poll_submit_callback(p, cid) {
	if(p.readyState == 4 && p.status == 200){
		var canketa = document.getElementById(cid);
		canketa.innerHTML = p.responseText;
		return;
	}
}

function disablepollbuttons(p) {
	for(i = 0; i < p.elements.length; i++){
		if(p.elements[i].type.toLowerCase() == 'submit'){
			p.elements[i].disabled = true;
		}
	}
}

function resizeMainContent(pContentId, pCheckElementId, pLeftColId, additionalHeight){
	var maxHeight = 0;
	if(!additionalHeight){
		additionalHeight = 0;
	}
	var selectors = ['#' + pCheckElementId, '#' + pLeftColId];
	for(var i = 0; i < selectors.length; ++i){
		var elem = $(selectors[i]);
		if(elem.length && elem.outerHeight() > maxHeight){
			maxHeight = elem.outerHeight();
		}
	}
	$('#' + pContentId).css({
		'min-height' : (maxHeight + additionalHeight) + 'px'
	});	
}

function resizeMainContentHome(pContentId, pCheckElementId, pLeftColId){
	resizeMainContent(pContentId, pCheckElementId, pLeftColId, 30);
}

function changeFocus(pOper, pEl) {
	switch(pOper){
	case 1:
		$(pEl).closest('.' + gInputHolder).addClass(gFocus);
		$(pEl).attr('fldattr', 1);
		break;
	case 2:
		$(pEl).attr('fldattr', 0);
		$(pEl).closest('.' + gInputHolder).removeClass(gFocus);
		break;
	default:
		break;
	}
}

function DocumentRevertSE(doc, pConfirmationText) {
	if(confirm(pConfirmationText)){
		return ExecuteSimpleDocumentAjaxRequest({
			document_id: doc,
			action: 'revert_se_assignment'
		});
	}
}

function DocumentRevertLE(doc, pConfirmationText, pReload) {
	if(confirm(pConfirmationText)){
		return ExecuteSimpleDocumentAjaxRequest({
			document_id: doc,
			reload: pReload,
			action: 'revert_le_assignment'
		});
	}
}

function DocumentRevertSELockReview(doc, pConfirmationText, pReload) {
	if(confirm(pConfirmationText)){
		return ExecuteSimpleDocumentAjaxRequest({
			document_id: doc,
			reload: pReload,
			action: 'revert_review_lock'
		});
	}
}

function DocumentRevertCE(doc, pConfirmationText, pReload) {
	if(confirm(pConfirmationText)){
		return ExecuteSimpleDocumentAjaxRequest({
			document_id: doc,
			reload: pReload,
			action: 'revert_ce_assignment'
		});
	}
}

function DeleteEmailTask(id, doc) {
	$.modal.close();
	return ExecuteSimpleDocumentAjaxRequest({
		id: id,
		document_id: doc,
		action: 'delete_email_task_details'
	});
}

function DocumentAddSe(doc, usr, journal) {
  	if (!is_SE(usr, journal))
    {
    	alert(LANG['js.pjs.noSERights']);
    }
    else
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : doc,
		se_id : usr,
		action : 'add_document_se'
	}, true);
}

function DocumentAddGuestSe(doc, usr) {
	return ExecuteSimpleDocumentAjaxRequest({
		document_id: doc,
		se_id: usr,
		action: 'add_document_guest_se'
	}, true);
}

function DocumentRemoveSe(pDocumentId, pSeId){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocumentId,
		se_id : pSeId,
		action : 'remove_document_se'
	});
}

function DocumentAddLE(pDocumentId, pLeId){
	if (confirm('Please confirm')){
		return ExecuteSimpleDocumentAjaxRequest({
			document_id : pDocumentId,
			le_id : pLeId,
			action : 'add_document_le'
		});
	}else{
		return false;
	}	
}

function DocumentRemoveLE(pDocumentId, pLeId){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocumentId,
		le_id : pLeId,
		action : 'remove_document_le'
	});
}

function DocumentAddCE(pDocumentId, pCeId, pCurrentRoundID){
	if (confirm('Please confirm')){
		return ExecuteSimpleDocumentAjaxRequest({
			document_id : pDocumentId,
			ce_id : pCeId,
			current_round_id : pCurrentRoundID,
			action : 'add_document_ce'
		});
	}else{
		return false;
	}
}

function DocumentRemoveCE(pDocumentId, pCeId){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocumentId,
		ce_id : pCeId,
		action : 'remove_document_ce'
	});
}

function DocumentInviteReviewers(pDocumentId, pRole, pErrText){
	var f = function (val, i) {
		return parseInt(val['name']);
	};
	var n = $.map($('.reviewer_tbl').find('input[value=n]').serializeArray(), f);
	var p = $.map($('.reviewer_tbl').find('input[value=p]').serializeArray(), f);
	var pub = $.map($('.reviewer_tbl').find('input[value=pub]').serializeArray(), f);
	if (n.length + p.length + pub.length > 0) {
		ExecuteSimpleDocumentAjaxRequest({
			doc_id: pDocumentId,
			n: n,
			p: p,
			pub: pub,
			role: pRole,
			action: 'inviteReviewers'
		});
	} else {
		alert(pErrText);
	}
}

function SEConfirmReviewerInvitation(pDocumentId, pInvitationId, pReviewerId, pConfirmationText){
	if(confirm(pConfirmationText)){
		return ExecuteSimpleDocumentAjaxRequest({
			invitation_id : pInvitationId,
			reviewer_id : pReviewerId,
			document_id : pDocumentId,
			action : 'se_confirm_reviewer_invitation'
		});
	}
}

function SECancelReviewerInvitation(pDocumentId, pInvitationId, pReviewerId, pConfirmationText){
	if(confirm(pConfirmationText)){
		return ExecuteSimpleDocumentAjaxRequest({
			invitation_id : pInvitationId,
			reviewer_id : pReviewerId,
			document_id : pDocumentId,
			action : 'se_cancel_reviewer_invitation'
		});
	}
}

function ConfirmReviewerInvitation(pDocumentId, pInvitationId){
	return ExecuteSimpleDocumentAjaxRequest({
		invitation_id : pInvitationId,
		document_id : pDocumentId,
		action : 'confirm_reviewer_invitation'
	});
}

function CancelReviewerInvitation(pDocumentId, pInvitationId){
	return ExecuteSimpleDocumentAjaxRequest({
		invitation_id : pInvitationId,
		document_id : pDocumentId,
		action : 'cancel_reviewer_invitation'
	});
}

function ConfirmFilebaseReviewerInvitation(pDocumentId, pInvitationId){
	return ExecuteSimpleDocumentAjaxRequest({
		invitation_id : pInvitationId,
		document_id : pDocumentId,
		action : 'confirm_reviewer_invitation'
	});
}

function SaveEditorRejectDecision(pRoundUserId, pDecisionId, pDocumentId, pViewRole) {
	if(!confirm(LANG['js.pjs.confirm.rejectManuscript'])) {
		return;
	}
	return ExecuteSimpleDocumentAjaxRequest({
		round_user_id: pRoundUserId,
		decision_id: pDecisionId,
		document_id: pDocumentId,
		view_role: pViewRole,
		decision_notes: $('#ed_notes_reject').val(),
		action: 'save_editor_reject_decision'
	}, false, 'POST');
}

function SaveEditorReturnToAuthorDecision(pRoundUserId, pDecisionId, pDocumentId, pViewRole) {
	if(!confirm(LANG['js.pjs.confirm.returnToAuthor'])) {
		return;
	}
	return ExecuteSimpleDocumentAjaxRequest({
		round_user_id: pRoundUserId,
		decision_id: pDecisionId,
		document_id: pDocumentId,
		view_role: pViewRole,
		decision_notes: $('#ed_notes_reject').val(),
		action: 'save_editor_return_to_author_decision'
	}, false, 'POST');
}

function AuthorReturnToEditor(pDocumentId){
	if(!confirm(LANG['js.pjs.confirm.returnToEditor'])) {
		return;
	}
	return ExecuteSimpleDocumentAjaxRequest({
		document_id: pDocumentId,
		action: 'author_return_to_editor'
	}, false, 'POST');
}

function SaveSEDecision(pRoundUserId, pDecisionId, pDocumentId){
	return ExecuteSimpleDocumentAjaxRequest({
		round_user_id : pRoundUserId,
		decision_id : pDecisionId,
		document_id: pDocumentId,
		decision_notes : $('#decision_notes').val(),
		action : 'save_se_decision'
	});
}

function SaveESENotes(pNotesId, pDocument_id){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocument_id,
		editor_notes : $('#' + pNotesId).val(),
		action : 'save_editor_notes'
	});
}

function SaveENotes(pNotesId, pDocument_id){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocument_id,
		editor_notes : $('#' + pNotesId).val(),
		action : 'save_e_only_notes'
	});
}


function SaveLENotes(pNotesId, pDocument_id){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocument_id,
		editor_notes : $('#' + pNotesId).val(),
		action : 'save_le_notes'
	});
}

function SaveLEDecision(pRoundUserId, pDecisionId){
	return ExecuteSimpleDocumentAjaxRequest({
		round_user_id : pRoundUserId,
		decision_id : pDecisionId,
		decision_notes : $('#decision_notes').val(),
		action : 'save_le_decision'
	});
}

function ResetMetrics(pDocumentId){
	$('#P-Ajax-Loading-Image-Main').show();

	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : {
			document_id : pDocumentId,			
			action : 'reset_article_metrics'
		},
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult['err_cnt']){
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}
		}
	});

}

function SaveLEXMLVersion(pDocumentId, pXmlVersionHolder){
	$('#P-Ajax-Loading-Image-Main').show();

	$.ajax({
		url: gDocumentAjaxSrv,
		async: true,
		dataType: 'json',
		data: {
			document_id: pDocumentId,
			doc_xml: $(pXmlVersionHolder).val(),
			action: 'save_le_xml_version'
		},
		type: 'POST',
		success: function (pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();

			if (pAjaxResult['err_cnt']) {
				for (var i = 0; i < pAjaxResult['err_cnt']; i++) {
					alert(pAjaxResult['err_msgs'][i]['err_msg']);
				}
			}
			if (pAjaxResult['url_params']) {
				document.location.href = pAjaxResult['url_params'];
			}
		}
	});

}

function asyncValidateEoL(pDocumentId, pSiteUrl){
	//pSiteUrl = 'http://bdj.pensoft.net'; //Uncomment this to test with the real archive on a test site
	var dwc_url = encodeURIComponent(pSiteUrl + gAjaxUrlsPrefix + 'archive_download.php?document_id=' + pDocumentId + '&archive_type=2');
	$.ajax({
		url: 'http://services.eol.org/dwc_validator/index.php?format=json&file_url=' + dwc_url,
		dataType: 'json',
		success: function (pAjaxResult) {
			if (pAjaxResult.status == 'valid') {
				res = '<div style="color: green">EOL is OK</div>';
			}
			else {
				res = '<div style="color: red">EoL is NOT OK' + JSON.stringify(pAjaxResult.errors, null, ' ') + '</div>';
			}
			document.getElementById('dwcResults').innerHTML += res;
		}
	});
}

function asyncValidateGBIF(pDocumentId, pSiteUrl){
	//pSiteUrl = 'http://bdj.pensoft.net'; //Uncomment this to test with the real archive on a test site
	var dwc_url = encodeURIComponent(pSiteUrl + gAjaxUrlsPrefix + 'archive_download.php?document_id=' + pDocumentId + '&archive_type=2');
	$.ajax({
		url: 'http://tools.gbif.org/dwca-validator/validatews.do?archiveUrl=' + dwc_url,
		dataType: 'json',
		success: function (pAjaxResult) {
			var res = ' <a href="" target="_blank">Report</a>.</div>';
			if (pAjaxResult.valid ) {
				res = '<div style="color: green">GBIF is OK' + res;
			}
			else {
				res = '<div style="color: red">GBIF is NOT OK' + res;
			}
			document.getElementById('dwcResults').innerHTML += res;
		}
	});
}

function SaveLEVersionContent(pDocumentId, pActionName, pContentHolder, pContentName,
		pSendContent, pLoadContent,
		pSendCacheType, pContentHolder2, pLoadContentHolder2){
	$('#P-Ajax-Loading-Image-Main').show();
	var lData = {
		document_id : pDocumentId,
		action : pActionName
	};
	if(pSendContent){
		lData[pContentName] = $(pContentHolder).val();
	}
	if(pSendCacheType){
		var lCacheType = new Array();
		var lSelectedCaches = $('input[name="cache_type[]"]:checked');
		for(var i = 0; i < lSelectedCaches.length; ++i){
			lCacheType.push($(lSelectedCaches[i]).val());
		}
		lData['cache_type'] = lCacheType;
	}
	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : lData,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult['err_cnt']){
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}
			if(pLoadContent){
				$(pContentHolder).val(pAjaxResult['content']);
			}
			if(pLoadContentHolder2){
				console.log(pAjaxResult['content']);
				$(pContentHolder2).text(pAjaxResult['content']);
			}
			if (pActionName == 'generate_dwc_archive') {
				asyncValidateEoL(pDocumentId, 'http://' + location.host);
				asyncValidateGBIF(pDocumentId, 'http://' + location.host);
			}
			if (pActionName == 'save_le_xml_version_and_generate_article_cache') {
				$('#nlm_current_version_xml').text(pAjaxResult['nlm_xml']);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			alert(LANG['js.pjs.noSuccess']);
			$('#P-Ajax-Loading-Image-Main').hide();
		}
	});
}

function SaveUserCollectionVersionContent(pCollectionId, pActionName, pContentHolder, pContentName, pSendContent, pLoadContent){
	$('#P-Ajax-Loading-Image-Main').show();
	var lData = {
		collection_id : pCollectionId,
		action : pActionName
	};
	if(pSendContent){
		lData[pContentName] = $(pContentHolder).val();
	}
	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : lData,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult['err_cnt']){
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}
			if(pLoadContent){
				$(pContentHolder).val(pAjaxResult['content']);
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			alert(LANG['js.pjs.noSuccess']);
			$('#P-Ajax-Loading-Image-Main').hide();
		}
	});
}

function SaveLEPDFHtmlVersion(pDocumentId, pContentHolder){
	return SaveLEVersionContent(pDocumentId, 'save_le_pdf_html_version', pContentHolder, 'pdf_html', 1);
}

function SaveLENlmXMLVersion(pDocumentId, pContentHolder){
	return SaveLEVersionContent(pDocumentId, 'save_le_nlm_xml_version', pContentHolder, 'nlm_xml', 1);
}

function RegenerateNlmXml(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'regenerate_le_nlm_version', pContentHolder, '', 0, 1);
}

function SaveCrossrefXml(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'save_le_crossref_version', pContentHolder, 'crossref_xml', 1, 1);
}

function RegenerateCrossrefXml(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'regenerate_le_crossref_version', pContentHolder, '', 0, 1);
}

function SubmitCrossrefXml(pDocumentId, pContentHolder, pContentHolder2){
	SaveLEVersionContent(pDocumentId, 'submit_le_crossref_data', pContentHolder, 'crossref_xml', 1, 0, 0, pContentHolder2, 1);
}


// user collections crossref xml
function RegenerateUserCollectionsCrossrefXml(pCollectionId, pContentHolder){
	SaveUserCollectionVersionContent(pCollectionId, 'regenerate_user_collections_crossref_xml', pContentHolder, '', 0, 1);
}

function SaveUserCollectionsCrossrefXml(pCollectionId, pContentHolder){
	SaveUserCollectionVersionContent(pCollectionId, 'save_user_collections_crossref_xml', pContentHolder, 'crossref_xml', 1, 1);
}

function SubmitUserCollectionsCrossrefXml(pCollectionId, pContentHolder, pContentHolder2){
	SaveUserCollectionVersionContent(pCollectionId, 'submit_user_collections_crossref_xml', pContentHolder, 'crossref_xml', 1, 0);
}

//wiki
function SaveWikiXml(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'save_le_wiki_version', pContentHolder, 'wiki_xml', 1, 1);
}

function RegenerateWikiXml(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'regenerate_le_wiki_version', pContentHolder, '', 0, 1);
}

function SubmitWikiXml(pDocumentId, pContentHolder, pContentHolder2){
	SaveLEVersionContent(pDocumentId, 'submit_le_wiki_data', pContentHolder, 'wiki_xml', 1, 0, 0, pContentHolder2, 1);
}
//eol
function SaveEolXml(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'save_le_eol_version', pContentHolder, 'eol_xml', 1, 1);
}

function RegenerateEolXml(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'regenerate_le_eol_version', pContentHolder, '', 0, 1);
}

function SubmitEolXml(pDocumentId, pContentHolder, pContentHolder2){
	SaveLEVersionContent(pDocumentId, 'submit_le_eol_data', pContentHolder, 'eol_xml', 1, 0, 0, pContentHolder2, 1);
}

function RegeneratePdfHtml(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'regenerate_le_pdf_version', pContentHolder, '', 0, 1);
}

function SaveAndGenerateHtmlPreview(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'save_le_xml_version_and_generate_article_cache', pContentHolder, 'doc_xml', 1, 0, 1);
}

function GenerateLEPDFFile(pDocumentId, pContentHolder){
	SaveLEVersionContent(pDocumentId, 'save_le_pdf_html_and_generate_file', pContentHolder, 'pdf_html', 1);
}

function GenerateNlmArchive(pDocumentId){
	SaveLEVersionContent(pDocumentId, 'generate_nlm_archive');
}

function GenerateDWCArchive(pDocumentId){
	SaveLEVersionContent(pDocumentId, 'generate_dwc_archive');
}

function DownloadArchive(pDocumentId, pArchiveType, pFileName){
	$('#P-Ajax-Loading-Image-Main').show();
	//document.location.href = gGeneratePDFAjaxSrv + '?document_id=' + pDocumentId + '&readonly_preview=1';
	document.location.href = gAjaxUrlsPrefix + 'archive_download.php?document_id=' + pDocumentId + '&archive_type=' + pArchiveType + '&file_name=' + pFileName;
	$('#P-Ajax-Loading-Image-Main').hide();
	return;
}

function DownloadNlmArchive(pDocumentId) {
	DownloadArchive(pDocumentId, 1);
}

function DownloadDWCArchive(pDocumentId){
	DownloadArchive(pDocumentId, 2);
}

function UploadGBIFOccurrences(pDocumentId){
	// $('#gbif_occurrences_btn').hide();
	return SaveLEVersionContent(pDocumentId, 'upload_gbif_occurrences');
}

function UploadGBIFTreatments(pDocumentId){
	// $('#gbif_treatments_btn').hide();
	return SaveLEVersionContent(pDocumentId, 'upload_gbif_treatments');
}

function ScheduleArticleTaxonCacheTask(pDocumentId){
	return SaveLEVersionContent(pDocumentId, 'schedule_article_cache_task');
}

function SubmitLENonXmlDataForm(){
	lForm = $('form[name="NonXmlDataForms"]');
	if(!lForm.length){
		return;
	}
	$('#P-Ajax-Loading-Image-Main').show();

	lForm.ajaxSubmit({
		'dataType' : 'json',
		'url' : gDocumentAjaxSrv,
		'data' : {
			action : 'save_le_non_xml_data_form',
			tAction : 'save',
		},
		'success' : function(pAjaxResult){
			$('#P-Ajax-Loading-Image-Main').hide();

			if(pAjaxResult['err_cnt']){
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}else{
				$('#NonXmlDataForm').html(pAjaxResult['form_html']);
			}
		},
	});
}

function PublishDocument(pDocumentId){
	if(!confirm(LANG['js.pjs.confirm.publishDoc'])){
		return;
	}
	$('#P-Ajax-Loading-Image-Main').show();
	var lData = {
		document_id : pDocumentId,
		action : 'publish_document'
	};
	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : lData,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult['err_msgs'][0]['crossref_alert'] !== undefined){
				alert(pAjaxResult['err_msgs'][0]['crossref_alert']);
			}
			if(pAjaxResult['err_cnt']){
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}else{
				location.reload();
			}
		}
	});
}

function SendLEVersionToPWT(pDocumentId, pXmlVersionHolder){
	$('#P-Ajax-Loading-Image-Main').show();

	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			doc_xml : $(pXmlVersionHolder).val(),
			action : 'send_le_xml_version_to_pwt'
		},
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult['err_cnt']){
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}
		}
	});

}

function RevertLEXMLVersion(pDocumentId, pXmlVersionHolder){
	$('#P-Ajax-Loading-Image-Main').show();

	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : 'revert_le_xml_version'
		},
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult['err_cnt']){
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}else{
				$(pXmlVersionHolder).val(pAjaxResult['doc_xml']);
			}
		}
	});

}

function GetDocumentLayoutXmlFromPWT(pDocumentId, pXmlVersionHolder){
	$('#P-Ajax-Loading-Image-Main').show();

	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : 'retrieve_le_xml_version_from_pwt'
		},
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult['err_cnt']){
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}else{
				$(pXmlVersionHolder).val(pAjaxResult['doc_xml']);
			}
		}
	});
}

function SaveCEDecision(pRoundUserId, pDecisionId){
	return ExecuteSimpleDocumentAjaxRequest({
		round_user_id : pRoundUserId,
		decision_id : pDecisionId,
		decision_notes : $('#decision_notes').val(),
		action : 'save_ce_decision'
	});
}

function EditorProceedDocumentToLayout(pDocumentId){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocumentId,
		action : 'editor_proceed_document_to_layout'
	});
}

function SaveAuthorLayoutDecision(pDocumentId, pDecisionId){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocumentId,
		decision_id : pDecisionId,
		action : 'save_author_layout_decision'
	});
}

function SubmitAuthorVersionForReview(pDocumentId){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocumentId,
		action : 'submit_author_version_for_review'
	});
}

function ProceedDocumentToLayoutEditing(pDocumentId){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocumentId,
		action : 'proceed_document_to_layout_editing'
	});
}

function ProceedDocumentToCopyEditing(pDocumentId){
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : pDocumentId,
		action : 'proceed_document_to_copy_editing'
	});
}

function RemoveDocumentReviewer(pReviewUsrId){
	return ExecuteSimpleDocumentAjaxRequest({
		reviewer_id : pReviewUsrId,
		action : 'remove_reviewer'
	});
}

function ReInviteDocumentReviewer(pDocumentId, pReviewUsrId, pRoundId, pConfirmationText, pRoleId){
	if(confirm(pConfirmationText)){
		return ExecuteSimpleDocumentAjaxRequest({
			reviewer_id : pReviewUsrId,
			round_id : pRoundId,
			document_id : pDocumentId,
			role_id : pRoleId,
			action : 'reinvite_reviewer'
		});
	}
}

/*
 * За дизайн на селектите pOper: 0 - НЯМА Ajax 1 - ИМА Ajax ( ако при смяна на
 * селекта той се замества с идентичен с AJAX трябва да се инитне наново )
 */
designSelect = function(pSelectId, pOper) {
	this.lSelect = $('#' + pSelectId);
	this.init(pOper);
};
designSelect.prototype.init = function(pOper) {
	var lThis = this;
	lThis.lSelect.siblings('.' + gSelectedOptionClass).html(lThis.lSelect.find("option:selected").text());
	if(!pOper){
		lThis.lSelect.bind('change', function() {
			lThis.init(1);
		});
	}
};

/* add error field class */
function addErrorClass(pEl, pClass, pValidClass, pReqClass) {
	if(pValidClass){
		$('#' + pEl).closest('div').removeClass(pValidClass);
	}
	if(pReqClass){
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
function addValidClassById(pEl, pClass, pValidClass, pReqClass) {
	$('#' + pEl).closest('div').removeClass(pClass);
	$('#' + pEl).closest('div').removeClass(pReqClass);
	$('#' + pEl).closest('div').addClass(pValidClass);
}
function initPwtDocumentStep2Permissions(pFormName) {
	var lRadioBtns = {
		'agree_to_cover_all_taxes' : {
			'btns_to_enable' : [],
			'btns_to_disable' : ['fifteen_discount_reasons[]', 'ten_discount_reasons[]', 'waiver_discount_reasons[]'],
		},
		'want_15_discount' : {
			'btns_to_enable' : ['fifteen_discount_reasons[]'],
			'btns_to_disable' : ['ten_discount_reasons[]', 'waiver_discount_reasons[]'],
		},
		'want_10_discount' : {
			'btns_to_enable' : ['ten_discount_reasons[]'],
			'btns_to_disable' : ['fifteen_discount_reasons[]', 'waiver_discount_reasons[]'],
		},
		'want_waiver_discount' : {
			'btns_to_enable' : ['waiver_discount_reasons[]', ],
			'btns_to_disable' : ['fifteen_discount_reasons[]', 'ten_discount_reasons[]'],
		},
		'use_special_conditions' : {
			'btns_to_enable' : [],
			'btns_to_disable' : ['fifteen_discount_reasons[]', 'ten_discount_reasons[]', 'waiver_discount_reasons[]'],
		}
	};
	var lCheckboxes = {
		'fifteen_discount_reasons[]' : 'want_15_discount',
		'ten_discount_reasons[]' : 'want_10_discount',
		'waiver_discount_reasons[]' : 'want_waiver_discount'
	};
	var lCheckboxBindFunction = function(pCheckboxName){
		$("form[name='" + pFormName + "'] input:checkbox[name='" + pCheckboxName + "']").bind('click', function(){
			if(!$(this).prop('checked')){
				return;
			}
			$("form[name='" + pFormName + "'] input:radio[name='" + lCheckboxes[pCheckboxName] + "']").prop('checked', 'checked');
			lRadioBindInnerFunction(lCheckboxes[pCheckboxName]);
		});
	};
	var lRadioBindInnerFunction = function(pRadioBtnName){
		if(!$("form[name='" + pFormName + "'] input:radio[name='" + pRadioBtnName + "']").attr('checked')){
			return;
		}
		for( var j in lRadioBtns){
			if(pRadioBtnName == j){
				continue;
			}
			$("form[name='" + pFormName + "'] input:radio[name='" + j + "']").prop('checked', false);
		}
		for( var j = 0; j < lRadioBtns[pRadioBtnName]['btns_to_enable'].length; ++j){
			$("form[name='" + pFormName + "'] input:checkbox[name='" + lRadioBtns[pRadioBtnName]['btns_to_enable'][j] + "']").prop('disabled', false);
		}
		for( var j = 0; j < lRadioBtns[pRadioBtnName]['btns_to_disable'].length; ++j){
			$("form[name='" + pFormName + "'] input:checkbox[name='" + lRadioBtns[pRadioBtnName]['btns_to_disable'][j] + "']").prop('checked', false);
			$("form[name='" + pFormName + "'] input:checkbox[name='" + lRadioBtns[pRadioBtnName]['btns_to_disable'][j] + "']").prop('disabled', true);
		}
	};
	var lRadioBindFunction = function(pRadioBtnName){
		$("form[name='" + pFormName + "'] input:radio[name='" + pRadioBtnName + "']").bind('change', function(){
			lRadioBindInnerFunction(pRadioBtnName);
		});
	};
	for( var i in lRadioBtns){
		lRadioBindFunction(i);
		lRadioBindInnerFunction(i);
	}
	for( var i in lCheckboxes){
		lCheckboxBindFunction(i);
	}
}
function lRadioSetCheckedByAttrFunction(inputEl, attr, El){
	$(document).ready(function(){
		if (document.querySelectorAll(inputEl).length && document.querySelectorAll("input["+attr+"='"+El+"']").length){
			$("input["+attr+"='"+El+"']").removeAttr('checked');
			$("input["+attr+"='"+El+"']").eq($(inputEl).val()).attr( "checked", 'true' );
		}
	});
}
function lInputCloneValueFunction(inputOriginEl, inputClonedEl){
	$(document).ready(function(){
		if (document.querySelectorAll(inputOriginEl).length && document.querySelectorAll(inputClonedEl).length){
			var originVal = $(inputOriginEl).val();
			$(inputClonedEl).val(originVal);
		}
	});
}

function ExecuteSimpleDocumentAjaxRequest(pDataToPass, pAsync, pType, pBlockUi){
	if(pBlockUi) {
		blockUi();
	}
	var dfd = $.ajax({
		url : gDocumentAjaxSrv,
		async : pAsync ? pAsync : false,
		dataType : 'json',
		data : pDataToPass,
		type : pType ? pType : 'GET',
		success : function(pAjaxResult) {
			if(pBlockUi) {
				unblockUi();
			}
			//console.log(pAjaxResult);
			if(pAjaxResult['err_cnt']){
				//console.log(pAjaxResult['err_cnt']);
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				}
			}else{
				//console.log(pAjaxResult['dont_redirect']);
				if(pAjaxResult['dont_redirect']) {

				} else {
					//console.log(pAjaxResult['url_params']);
					if(pAjaxResult['url_params']) {
						if(pAjaxResult['clean_redirect']) {
							window.location = pAjaxResult['url_params'];
							return;
						}
						var lUrl = document.URL;
						window.location = lUrl + (lUrl.split('?')[1] ? '&':'?') + pAjaxResult['url_params'];
					} else {
						window.location.reload();
					}
				}
			}
		}
	});
	return dfd.promise();
}

function ExecuteBooleanAjaxRequest(pURL ,pDataToPass, pAsync){
	var a = $.ajax({
		url : pURL,
		async : pAsync ? pAsync : false,
		dataType: 'json',
		data : pDataToPass,
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(LANG['js.pjs.errorOccurred']);
			}
		}
	});
	return a['responseText'];
}
function is_SE(usr, journal) {
	var a = ExecuteBooleanAjaxRequest('lib/ajax_srv/usr_autocomplete_srv.php',{action: 'is_se', usr: usr, journal: journal} );
	//console.log(a);
	return a === 'true';
}
function Make_SE(usr, journal, expertises)
{
	return;
	/*return ExecuteAjaxRequest({
		document_id : pDocumentId,
		se_id : usr,
		action : 'make_se'
	});
	*/
}
function submitUserJournalExpertisesForm(pFormName){
	var action = document.createElement("input");
	action.setAttribute("type", "hidden");
    action.setAttribute("value", "save");
    action.setAttribute("name", "tAction");
	document.forms[pFormName].appendChild(action);
	document.forms[pFormName].submit();
}
function deleteStoryAjax(pObj, pJournalId, pStoryId){
	if (confirm(LANG['js.pjs.confirm.deleteStory'])){
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
					window.location.href='manage_journal_about_pages.php?journal_id='+pJournalId;
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
				window.location.href='manage_journal_about_pages.php?journal_id='+pJournalId;
			}
		}
	});
}
function ChangeActiveTab(pEl, pActiveClassName, pResElement, pResElementsClass) {
	$('.' + pActiveClassName).removeClass(pActiveClassName);
	$(pEl).addClass(pActiveClassName);
	$('.' + pResElementsClass).hide();
	$('#' + pResElement).show();
}
function SubmitLetterFilter(pLetter, pForm, pInput) {
	$('#' + pInput).val(pLetter);
	$('#' + pForm).submit();
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
function goToIssue(pJournalId, pInputId){
	window.location.href = 'browse_journal_issue_documents.php?journal_id=' + pJournalId + '&issue_num=' + $('#' + pInputId).val();
}
function confirmDelete(pMsg, pLink){
	if(confirm(pMsg))
		window.location.href=pLink;
	else
		return false;
}

function updateUserRoles(pObj, pJournalId, pUid){
	var lCountChecked = 0;
	var lGo = 1;
	lCountChecked = ( $('#jm_' + pUid).is(':checked') ? 1 : 0 ) +
					( $('#e_'  + pUid).is(':checked') ? 1 : 0 ) +
					( $('#se_' + pUid).is(':checked') ? 1 : 0 ) +
					( $('#le_' + pUid).is(':checked') ? 1 : 0 ) +
					( $('#ce_' + pUid).is(':checked') ? 1 : 0 ) +
					( $('#r_'  + pUid).is(':checked') ? 1 : 0 ) +
					( $('#m_'  + pUid).is(':checked') ? 1 : 0 ) +
					( $('#pwt_ja_'  + pUid).is(':checked') ? 1 : 0 ) +
					( $('#a_'  + pUid).is(':checked') ? 1 : 0 );
	if(!lCountChecked){
		lGo = 0;
		if(confirm(LANG['js.pjs.confirm.userWillBeRemoved']))
			lGo = 1;
	}
	if(lGo){
		$.ajax({
			url : gJournalUsersPageUrl,
			dataType : 'json',
			//async : false,
			data :{
				journal_id : pJournalId,
				update_roles : 1,
				user_id : pUid,
				jm : $('#jm_' + pUid).is(':checked') ? 1 : 0,
				e  : $('#e_'  + pUid).is(':checked') ? 1 : 0,
				se : $('#se_' + pUid).is(':checked') ? 1 : 0,
				le : $('#le_' + pUid).is(':checked') ? 1 : 0,
				ce : $('#ce_' + pUid).is(':checked') ? 1 : 0,
				m : $('#m_' + pUid).is(':checked') ? 1 : 0,
				pwt_ja : $('#pwt_ja_' + pUid).is(':checked') ? 1 : 0
			},
			success : function(pAjaxResult){
				if(pAjaxResult['result']){
					if($('#se_' + pUid).is(':checked')){
						$('#expertise_' + pUid).html('<a href="user_journal_expertises.php?journal_id=' + pJournalId + '&amp;user_id=' + pUid + '&amp;tAction=showedit">Expertises</a>');
					}else{
						$('#expertise_' + pUid).html('');
					}
					if(!lCountChecked)
						$(pObj).closest('tr').remove();
					alert(LANG['js.pjs.userRolesSuccessfullyUpdated']);
				}
			}
		});
	}
}
// , pMode, pDocumentId, pRoundId
function checkIfUserExist(pObj, pJournalId, pMode, pDocumentId, pRoundId, pRole, pSource){
	$.ajax({
		url : gCreateUserPageUrl,
		dataType : 'json',
		//async : false,
		data :{
			ajax 		: 1,
			journal_id 	: pJournalId,
			mode		: pMode,
			document_id	: pDocumentId,
			round_id	: pRoundId,
			role		: pRole,
			source		: pSource,
			tAction 	: 'showedit',
			email 		: $(pObj).val()
		},
		success : function(pAjaxResult){
			//~ $('#user_roles_checkbox input').each(function(){
				//~ var lSE = $(this).attr('value') == '3';
				//~ if(lSE == true)
					//~ $('#categories_holder').css('display', 'block');
					//~ // lSE.trigger('click');
					//~ // alert(lSE);
					//~ $(this).click();
				//~ // $(this).trigger('click');
			//~ });
			//~ lRole = $('#user_roles_checkbox input:nth-child(1)').val();
			if(pAjaxResult){
				$('#dashboard-content').html(pAjaxResult['html']);
			}
		}
	});
}
function showCategoriesIfChecked(pCheckboxesHolderId, pCategoriesHolderId){
	$('#' + pCheckboxesHolderId).find('input').each(function(){
		if($(this).val() == 3){
			if($(this).is(':checked'))
				$('#' + pCategoriesHolderId).show();
			else
				$('#' + pCategoriesHolderId).hide();
		}
	});
}
function enableAllInputs(pFormName){
	$('form[name="' + pFormName + '"]').find('input').each(function(){
		$(this).removeAttr('disabled');
	});
}
function enableAllFormElements(pFormName){
	$('form[name="' + pFormName + '"]').find('input, select, textarea').each(function(){
		$(this).removeAttr('disabled');
	});
}
function filterIssues(pObj, pJournalId, pYearInpId){
	var lChecked = 0;
	if($(pObj).is(':checked'))
		lChecked = 1;
	window.location.href='browse_journal_issues.php?journal_id=' + pJournalId + '&special_issues=' + lChecked + '&year=' + $('#' + pYearInpId).val();
}
function toggleBlock(pArrowId, pTreeHolderId){
	if($('#' + pTreeHolderId).is(':hidden')){
		$('#' + pArrowId).removeClass('blockDownArrow').addClass('blockUpArrow');
		$('#' + pTreeHolderId).show();
	}else{
		$('#' + pArrowId).removeClass('blockUpArrow').addClass('blockDownArrow');
		$('#' + pTreeHolderId).hide();
	}
}
function toggleBlockClosest(pParentId, pTreeHolderId){
  toggleBlock('', pTreeHolderId);
  
  $(document).click(function(event) { 
      if(event.target.id != pParentId.id && !$(event.target).closest('#popup-list').length) {
          if($('#popup-list').is(":visible")) {
              $('#popup-list').hide();
          }
      }        
  });

}
function filterAuthors(pAffiliationInpId, pJournalId, pInputLetterId){
	window.location.href = 'browse_journal_authors.php?journal_id=' + pJournalId +
							'&affiliation=' + document.getElementById(pAffiliationInpId).value +
							'&author_letter=' + document.getElementById(pInputLetterId).value;
}
function filterAuthorsLetter(pAffiliationInpId, pJournalId, pLetter){
	window.location.href = 'browse_journal_authors.php?journal_id=' + pJournalId +
							//'&affiliation=' + document.getElementById(pAffiliationInpId).value +
							'&author_letter=' + pLetter;
}
function filterUsersLetter(pJournalId, pLetter, pGroupId, pRoleId){
	var lHref = 'browse_journal_groups.php?journal_id=' + pJournalId + '&role_id=3';
	/*if(pGroupId > 0) {
		lHref = 'browse_journal_groups.php?journal_id=' + pJournalId + '&grp_id=' + pGroupId;
	}
	if(pRoleId > 0) {
		lHref = 'browse_journal_groups.php?journal_id=' + pJournalId + '&role_id=' + pRoleId;
	}*/
	window.location.href = lHref + '&user_letter=' + pLetter;
}
function ChangeRejectBtn(pTextArea, pBtn1Id, pBtn2Id, pBtn3Id, pBtn1Active, pBtn2Active, pBtn3Active) {
	if($(pTextArea).val().length > 0) {
		$('#' + pBtn1Id).hide();
		$('#' + pBtn1Active).show();
		$('#' + pBtn2Id).hide();
		$('#' + pBtn2Active).show();
		$('#' + pBtn3Id).hide();
		$('#' + pBtn3Active).show();
	} else {
		$('#' + pBtn1Active).hide();
		$('#' + pBtn1Id).show();
		$('#' + pBtn2Active).hide();
		$('#' + pBtn2Id).show();
		$('#' + pBtn3Active).hide();
		$('#' + pBtn3Id).show();
	}
}
function ExecuteReviewerInvitation(pOper, pUrl, pDocumentId, pUserId, pInvitationId){
	$.ajax({
		url : pUrl,
		dataType : 'json',
		data : {
			oper : pOper,
			document_id : pDocumentId,
			user_id : pUserId,
			invitation_id : pInvitationId
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(LANG['js.pjs.errorOccurred']);
			}else{
				window.location.reload();
			}
		}
	});
}


function getPercentageOf(percentage, everything, decimals) {
	return Math.round((percentage / 100) * everything, decimals);
}

function gdprEmailFormat(pEmail, pStartFromInPercent, pHiddenInPercent){
	var emails = pEmail.split(',');
	var r = '';
	var numEmails = emails.length;
	for(var i=0;i < emails.length; i++){
		var delimeter = ', ';
		var email = emails[i].trim().split('@');
		var name = email[0];
		var domain = email[1];
		var totalEmailLenght = name.length;
		start = getPercentageOf(pStartFromInPercent, totalEmailLenght, 0);
		hidden = getPercentageOf(pHiddenInPercent, totalEmailLenght, 0);
		hidden_name = name.substr(0, start) + '*'.repeat(hidden) + name.substr((start + hidden), totalEmailLenght);

		if(numEmails <= 1){
			delimeter = '';
		}
		r += hidden_name + '@' + domain + delimeter;
		numEmails--;
	}
	return r;
}

function autoCompleteReviewers(SITE_URL, document_id, current_round_id, pSource) {
	$.ui.autocomplete.prototype._renderMenu = function(ul, items) {
	  var self = this;
	  ul.append('<table width="100%" cellspacing="0"><tbody></tbody></table>');
	  $.each( items, function( index, item ) {
	    self._renderItem( ul.find("table tbody"), item );
	  });
	  self._renderElFooter( ul.find("table tbody"));
	};
	
	$.ui.autocomplete.prototype._renderElFooter = function ( table ) {
		var TR =  $( "<tr></tr>" )
			.append("<td align=\"center\" colspan=\"4\"><a class=\"add_new_reviewer\" href=\"javascript:AddNewReviewer(0, 3, " + document_id + ", 5, " + pSource + ")\">Add a new reviewer</a></td>")
			.appendTo( table );
		return TR;
	};

	$.ui.autocomplete.prototype._renderItem = function ( table, row ) {
		if(row.id) {
			var TR =  $( "<tr></tr>" )
				.data( "item.autocomplete", row )
				.append(
						"<td class=\"name\">" + row.name + "</td>" +
						"<td class=\"affiliation\">" + row.affiliation + "</td>" +
						"<td class=\"autocomplte_email\">" + gdprEmailFormat(row.email, 10, 50) + "</td>" +
						"<td><a href='javascript:InviteReviewerAsGhost(" + row.id + ", " + document_id + ", " + current_round_id + ")'>Add to list</a></td>"
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
	    $("#reviewer_search").autocomplete({
			source: SITE_URL + "lib/ajax_srv/usr_autocomplete_srv.php?action=get_users&document_id=" + document_id + "&notempty=1",
			autoFocus: true,
			minLength: 3,
			select: function(){
				$("#subject_editor_search").val("");
				return false;
			}
		});
	});
}
function InviteReviewerAsGhost(uid, doc_id, round_id) {
	return ExecuteSimpleDocumentAjaxRequest({
		document_id : doc_id,
		reviewer_id : uid,
		current_round_id : round_id,
		action : 'invite_reviewer_as_ghost'
	});
}
function moveGroupOrUserAjax(pObj, pOper, pJournalId, pGroupdId, pDirection, pGuid){
	if(typeof pGuid == "undefined"){
		pGuid = 0;
	}
	var RedirUrl;
	if (pOper == 1)
		RedirUrl = 'manage_journal_groups.php?journal_id='+pJournalId;
	else
		RedirUrl = 'edit_journal_group.php?journal_id='+pJournalId+'&tAction=showedit&id='+pGroupdId;
	$.ajax({
		url : gEditGroupUrl,
		dataType : 'json',
		async : false,
		data :{
			journal_id : pJournalId,
			direction  : pDirection,
			id		   : pGroupdId,
			userid	   : pGuid,
			oper	   : pOper,
			tAction    : 'moveupdown'
		},
		success : function(pAjaxResult){
			if(pAjaxResult){
				window.location.href=RedirUrl;
			}
		}
	});
	window.location.href=RedirUrl;
}
function updateUserRole(pJournalId, pGroupId, pUserId){
	var lRole = $('#' + pUserId).val();
	alert(LANG['js.pjs.userRoleSuccessfullyUpdated']);
	$.ajax({
		url : 'edit_journal_group.php?journal_id=' + pJournalId + '&tAction=update&id='+ pGroupId,
		dataType : 'json',
		data : {
			role : lRole,
			group_id : pGroupId,
			user_id : pUserId
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(LANG['js.pjs.errorOccurred']);
			}else{
				window.location = 'edit_journal_group.php?journal_id=' + pJournalId + '&amp;tAction=showedit&amp;id='+ pGroupId;
			}
		}
	});
}
function ExecuteUserInvitation(pOper, pUrl, pUserId){
	lGroupId = $('#groupid').val();
	$.ajax({
		url : pUrl,
		dataType : 'json',
		data : {
			oper : pOper,
			group_id : lGroupId,
			user_id : pUserId,
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(LANG['js.pjs.errorOccurred']);
			}else{
				window.location.reload();
			}
		}
	});
}

function saveDecision(pAction, pRoundUserId, pDocumentId, pRole, pUserId, pDontClosePopUp){
	var lDecisionId = $('#decision input:checked').val();
	if(pRole == gCERole) {
		lDecisionId = $('input[name=decision_id]').val();
	}
	if (pRole == 2 || pRole == 3)
		if (lDecisionId == 2 || lDecisionId == 5) // Reject
			pAction = 'save_se_reject_decision';
	// else // Accept

	$.ajax({
		url : gDocumentAjaxSrv,
		dataType : 'json',
		data : {
			round_user_id : pRoundUserId,
			decision_id   : lDecisionId,
			document_id   : pDocumentId,
			uid 		  : pUserId,
			action 		  : pAction
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['err_cnt']){
				alert(LANG['js.pjs.errorOccurred']);
			}else{
				//~ window.location.reload();
				if(pAjaxResult['url_params']) {
					var lUrl = document.URL;
					window.location = lUrl + (lUrl.split('?')[1] ? '&':'?') + pAjaxResult['url_params'];
				} else {
					window.location.reload();
				}

				if(pDontClosePopUp == 'undefined' || !pDontClosePopUp) {
					popupClosingAndReloadParent(pAjaxResult['url_params']);
				}
			}
		}
	});
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

function clearFormErrors(){
		['reviewDecisionErr', 'poll_answer_err', 'notesToAuthorErr'].map(function(errClass){
		$('.' + errClass).removeClass(errClass);
	});
//	console.log($('.errstr'));
	$('.errstr').remove();
}

function ReviewFormValid(pAuthorFlag) {
	clearFormErrors();
	var valid = true;

	// check the poll
	$('.previewform tr.question').each(function(index, tr){
		var percentValue = parseInt($(tr).find('input[type=text]').val());
		if ($(tr).find('input[type=radio]:checked').length == 0 && (isNaN(percentValue) || percentValue < 0 || percentValue > 100 )){
			valid = false;
			$(tr).find('td:first').addClass('poll_answer_err');
		}
	});

	if(pAuthorFlag) {
		var lUplodedFiles = $('.files_list');
		var lUplodedFilesHolder = $('.suppFilesLabelMain');
		if(lUplodedFiles.length == 0) {
			valid = false;
			//lUplodedFilesHolder.parent().addClass('notesToAuthorErr');
			lUplodedFilesHolder.after('<div class="errstr">You must upload at least 1 file</div>');	
		}
	}

	// check the text
	var review = $('textarea#textarea_editor_notes');
	if(review.length > 0) {
		if (review.val().length == 0) {
			valid = false;
			review.parent().addClass('notesToAuthorErr');
			review.parent().before('<div class="errstr">You must provide review text</div>');
		}
	}

	// check the text
	var review = $('textarea.review');
	if(review.length > 0) {
		if (review.val().length == 0) {
			valid = false;
			review.parent().addClass('notesToAuthorErr');
			review.parent().before('<div class="errstr">You must provide review text</div>');
		}
	}

	// check the decision
	if ($('input[name="decision_id"][type="radio"]').length > 0 && $('input[name="decision_id"]:checked').length == 0) {
		valid = false;
		$('#decision').addClass('reviewDecisionErr');
		$('#decision').before('<div class="errstr">You must choose a recommendation</div>');
	}
	var lElementsWithErrors = $('.errstr,.poll_answer_err,.notesToAuthorErr,.reviewDecisionErr');
	if(lElementsWithErrors.length){
		scrollToElement(lElementsWithErrors.first());
	}
	return valid;
}

function SaveReviewForm(){
	gReviewFormManualSaving = true;
	clearFormErrors();

	$.blockUI({ message: $('#P-Ajax-Loading-Image') });
	var lJqForm = $('form[name="document_review_form"]');
	var lData = '&tAction=save&ajax_form_submit=1&';
	lData += lJqForm.formSerialize();
//	$('#P-Ajax-Loading-Image').show();
	$.ajax({
		url : lJqForm.attr('action'),
		dataType : 'json',
		data : lData,
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			gReviewFormManualSaving = false;
			var lId = pAjaxResult['id'];
			if(lId) {
				if($('#id').length) {
					$('#id').val(lId);
				}
			}
			var lErrors = pAjaxResult['form_has_errors'];
//			$('#P-Ajax-Loading-Image').hide();


			var lSaving = setInterval(function(lErrors) {
				$.unblockUI();
				if (lErrors) {
					alert(LANG['js.pjs.reviewFormNotSaved']);
				}
				clearInterval(lSaving);
			}, 1000);
		}
	});
	return false;
}

function SubmitReviewForm(confirmation){
	SaveReviewForm();
	if (!ReviewFormValid() || !confirm(confirmation)){
		return false;
	}
	$.blockUI({ message: $('#P-Ajax-Loading-Image') });
	var lJqForm = $('form[name="document_review_form"]');
	var lData = '&tAction=review&ajax_form_submit=1&';
	lData += lJqForm.formSerialize();
	$('#P-Ajax-Loading-Image').show();
	gReviewFormManualSaving = true;
	$.ajax({
		url : lJqForm.attr('action'),
		dataType : 'json',
		data : lData,
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			gReviewFormManualSaving = false;
			//console.log(pAjaxResult);
			//return;
//			$('#P-Ajax-Loading-Image').hide();
			$.unblockUI();
			if(pAjaxResult['form_has_errors']){
				$('#P-Version-PopUp-Form').replaceWith(pAjaxResult['form']);
				$('#P-Ajax-Loading-Image').hide();
				var lElementsWithErrors = $('.errstr,.poll_answer_err,.notesToAuthorErr,.reviewDecisionErr');
				if(lElementsWithErrors.length){
					scrollToElement(lElementsWithErrors.first());
				}
			}else{
				if(pAjaxResult['email'] == 1) {
					window.location = pAjaxResult['site_url'] + 'view_document.php?id='+ pAjaxResult['document_id'] + '&view_role=5&' + pAjaxResult['url_params'];
				} else {
					if(pAjaxResult['url_params']) {
						popupClosingAndReloadParent(pAjaxResult['url_params']);
					} else {
						window.location.href = 'view_document.php?id='+ pAjaxResult['document_id'] + '&view_role=5';
					}
				}
			}
		}
	});
	return false;
}

function SubmitFormByName(pName) {
	var lJqForm = $('form[name="' + pName + '"]');
	var lData = '&tAction=save&';
	lData += lJqForm.formSerialize();

	$.ajax({
		url : lJqForm.attr('action'),
		dataType : 'json',
		data : lData,
		async : false,
		type : 'POST',
		success : function(pAjaxResult) {
			window.location = document.URL;
			//window.location.reload();
		}
	});
}
function popupClosingAndReloadParent(pUrlAddParams) {
	if(pUrlAddParams) {
		var lUrl = window.opener.document.URL;
		window.opener.location = lUrl + (lUrl.split('?')[1] ? '&':'?') + pUrlAddParams;
	} else {
		window.opener.location.reload();
	}
	window.close();
	//window.opener.location.reload();
}
function popupClose(){
	window.close();
}

var gwindowObjectReference = null; // global variable

function openRequestedPopup(strUrl, strWindowName) {
  if(gwindowObjectReference == null || gwindowObjectReference.closed) {
    gwindowObjectReference = window.open(strUrl, strWindowName);
  } else {
  	//console.log(gwindowObjectReference);
  	//gwindowObjectReference.close();
  	//gwindowObjectReference = window.open(strUrl, strWindowName);
    gwindowObjectReference.focus();
  };
}
var lOpenWindow;
function openPopUp(pUrl, pWidth, pHeight, pWindowTitle, pInTab){
	if(typeof pWidth == "undefined" || pWidth == 0)
		pWidth = '1350';
	if(typeof pHeight == "undefined" || pHeight == 0)
		pHeight = '850';
	if(typeof pWindowTitle == "undefined")
		pWindowTitle = "littleWindow";
	var left = (screen.width/2)-(pWidth/2);
	var top = (screen.height/2)-(pHeight/2);
	//var lOpenWindow = window.open(pUrl, pWindowTitle, 'scrollbars=yes, location=no,width='+ pWidth +',height=' + pHeight + ', top='+top+', left='+left);

	if(!pInTab || pInTab == 'undefined') {
		var lOpenWindow = window.open(pUrl, pWindowTitle, 'scrollbars=yes, location=no, fullscreen=yes');
	} else {
		var lOpenWindow = window.open(pUrl, '_blank');
	}

	//~ console.log('open');
	$(lOpenWindow).load(function() {
		//~ $('#loading-image').hide();
		//~ console.log('loaded');
	});
	lOpenWindow.focus();
}
function openFilterPopUp(){
	var lPopUp = $('#docEditHeader .box .popup');
	var lIsVisible = lPopUp.is(':visible');
	if (lIsVisible == true)
		lPopUp.css("display", "none");
	else
		lPopUp.css("display", "block");
}
var gLeftColHide = 0;
function toggleLeftContainer(){
	if( gLeftColHide ){ //show left column
		gLeftColHide = 0;
		$('.' + gLeftContainerClass).removeClass(gLeftContainerClassHide);
		$('.' + gMiddleContainerClass).removeClass(gLeftContainerClassHide);
		$('.P-Article-Buttons.P-Bottom').show();
	}else{				//hide left column
		gLeftColHide = 1;
		$('.' + gLeftContainerClass).addClass(gLeftContainerClassHide);
		$('.' + gMiddleContainerClass).addClass(gLeftContainerClassHide);
		$('.P-Article-Buttons.P-Bottom').hide();
	}
}
var gRightColHide = 0;
function toggleRightContainer(){
	if( gRightColHide ){ //show right column
		gRightColHide = 0;
		$('.' + gRightContainerClass).removeClass(gRightContainerClassHide);
		$('.' + gMiddleContainerClass).removeClass(gRightContainerClassHide);
	}else{				 //hide right column
		gRightColHide = 1;
		$('.' + gRightContainerClass).addClass(gRightContainerClassHide);
		$('.' + gMiddleContainerClass).addClass(gRightContainerClassHide);
	}
}
var gCommentsInPreviewMode = 1;
function setCommentsPreviewMode(pMode){
	gCommentsInPreviewMode = pMode;
}
$(document).ready(function () {
	var lMode = $('#role').val();
	if(lMode == 3){
		$('#user_roles_checkbox').css('display', 'none');
	}
});
function activateFieldCheckbox(pClass){
	var lField = $('.' + pClass);
	var lState = lField.attr('disabled');
	if (lState == 'disabled')
		lField.removeAttr('disabled');
	else
		lField.attr('disabled', 'disabled');
}

function checkReviewersState(pRoundId, pUrl, pDocumentId, pMergeFlag, pReviewersLock, pDocumentSourceId, pVersionId, pDoNotReload){
	var lConfirm;
	
	if(pReviewersLock != 'true' && pReviewersLock != 't') {
		lConfirm = confirm(LANG['js.pjs.confirm.warningNoMoreReviewrInvitations']);
	} else {
		lConfirm = true;
	}
	
	if(!lConfirm){
		return;
	}

	$.ajax({
		url : gDocumentAjaxSrv,
		async : false,
		data : {
			roundid : pRoundId,
			document_id : pDocumentId,
			action : 'check_reviewers'
		},
		success : function(pAjaxResult) {
				if (pAjaxResult['err_cnt'] == 0){
					var lInvitedUsers = pAjaxResult['invited_users'];
					var lInvitedUsersIds = pAjaxResult['invited_users_ids'];
					var lNonSubmitedUsers = pAjaxResult['non_submited_users'];
					var lNonSubmitedUsersIds = pAjaxResult['non_submited_users_ids'];
					if(lInvitedUsersIds == null)
						lInvitedUsersIds = '';
					if(lNonSubmitedUsersIds == null)
						lNonSubmitedUsersIds = '';

					var lMsgSubmitedUsers = '';
					var lMsgInvitedUsers = '';
					
					var lPluralorNotInvitedUsers = '';
					if(lInvitedUsers > 1){
						lPluralorNotInvitedUsers = 's';
					}
					
					var lPluralorNotReviews = '';
					if(lNonSubmitedUsers > 1){
						lPluralorNotReviews = 's';
					}
					
					if(lInvitedUsers != 0)
						lMsgInvitedUsers = 'Please note that ' + lInvitedUsers + ' reviewer' + lPluralorNotInvitedUsers + ' will be cancelled automatically. Are you sure?';
					if(lNonSubmitedUsers != 0)
						lMsgSubmitedUsers = 'Please note that ' + lNonSubmitedUsers + ' review' + lPluralorNotReviews + ' will be submited automatically. Are you sure?';
					if(lInvitedUsers != 0 || lNonSubmitedUsers != 0){
						if (confirm(lMsgInvitedUsers + "\n" + lMsgSubmitedUsers) == true){
							manageUserInvitationsAndReviews(pRoundId, pDocumentId, lInvitedUsersIds, lNonSubmitedUsersIds);
							//disableInvitingUsers(pRoundId, pDocumentId, pUrl);
							if(pDocumentSourceId == gFilebaseDocumentSourceType) {
								getVersionForm(pVersionId, pDocumentId, (pDoNotReload ? 0 : 1));
							} else {
//								console.log(pUrl);
								openRequestedPopup(pUrl, 'tab_'+pDocumentId);
								window.location.reload();
							}
						}
					} else {
						//disableInvitingUsers(pRoundId, pDocumentId, pUrl);
						if(pDocumentSourceId == gFilebaseDocumentSourceType) {
							getVersionForm(pVersionId, pDocumentId, (pDoNotReload ? 0 : 1));
						} else {
//							console.log(pUrl);
							openRequestedPopup(pUrl, 'tab_'+pDocumentId);
							//window.location.reload();
						}
					}
				}
			}
	});
}
function confirmDocumentVersionsMergeEditor(pRoundId, pUrl, pDocumentId, pMergeFlag){
	if(pMergeFlag == 1) {
		$.ajax({
			url : gDocumentAjaxSrv,
			async : false,
			data : {
				roundid : pRoundId,
				action : 'merge_versions'
			},
			success : function(pAjaxResult) {
					if (pAjaxResult['err_cnt'] == 0){
						//disableInvitingUsers(pRoundId, pDocumentId, pUrl);
						openPopUp(pUrl, 0, 0, 'MergeEditorVersionWindow');
					}
				}
		});
	} else {
		openPopUp(pUrl, 0, 0, 'MergeEditorVersionWindow');
	}
}
/*
function disableInvitingUsers(pRoundId, pDocumentId, pUrl){
	$.ajax({
		url : gDocumentAjaxSrv,
		async : false,
		data : {
			roundid : pRoundId,
			document_id : pDocumentId,

			action : 'disable_inviting_users'
		},
		success : function(pAjaxResult) {
				if (pAjaxResult['err_cnt'] == 0){
					if(pUrl && pUrl != 'undefined') {
						openPopUp(pUrl);
					}
				}
			}
	});
}
*/

function manageUserInvitationsAndReviews(pRoundId, pDocumentId, pInvitedUserIds, pUserReviewsIds){
	$.ajax({
		url : gDocumentAjaxSrv,
		async : false,
		data : {
			document_id : pDocumentId,
			round_id : pRoundId,
			invited_users_ids : pInvitedUserIds,
			non_submited_users_ids : pUserReviewsIds,
			action : 'manage_user_invitations_and_reviews'
		},
		success : function(pAjaxResult) {
				if (pAjaxResult['err_cnt'] == 0){
					//~ window.location.reload();
					//~ console.log(pAjaxResult);
				}
			}
	});
}

function updateDueDateandClose(pAction, pRoundId, pRoundUserId) {
	var lDueDate = $('form[name="edit_due_date_form"]').find('#dueDate').val();
	$.ajax({
		url: gAjaxUrlsPrefix + 'duedate_srv.php',
		async: false,
		data: {
			roundid: pRoundId,
			rounduserid: pRoundUserId,
			duedate: lDueDate,
			action: pAction
		},
		success: function () {
			$.modal.close();
			window.location.reload();
		}
	});
}

function updateReviewTypeAndClose(pDocumentId) {
	var lJqForm = $('form[name="review_edit_form"]');
	var lData = lJqForm.formSerialize();
	$.ajax({
		url: gAjaxUrlsPrefix + 'review_srv.php',
		async: false,
		dataType: "json",
		data: {
			document_id: pDocumentId,
			data: lData
		},
		success: function () {
			$.modal.close();
			window.location.reload();
		}
	});
}

function moveToLayoutAndClose() {
	var lData = $('form[name="se_assign_form"]').serialize() + '&action=move_document_to_layout';
	$.ajax({
		url: 'ajax_srv.php',
		async: false,
		dataType: "json",
		data: lData,
		success: function () {
			$.modal.close();
			window.location.reload();
		}
	});
}

function updateArticleSectionTypeAndClose(pDocumentId) {
	var lJqForm = $('form[name="section_edit_form"]');
	var lData = lJqForm.formSerialize();
	$.ajax({
		url: gAjaxUrlsPrefix + 'articlesectiontype_srv.php',
		async: false,
		dataType: "json",
		data: {
			document_id: pDocumentId,
			data: lData
		},
		success: function () {
			$.modal.close();
			window.location.reload();
		}
	});
}

function openDueDatePopUp(pUrl, pWidth, pHeight) {
	pElem = 'P-Registration-Content';
	$.ajax({
		url: pUrl,
		async: false,
		success: function (pAjaxResult) {
			$('#' + pElem).html(pAjaxResult);
			$('#' + pElem).modal({
				autoResize: true,
				position: ["40%", ],
				minHeight: 230,
				maxHeight: pHeight,
				maxWidth: pWidth,
				overlayClose: true,
				onShow: function (dialog) {
					var doch = $(window).height();
					if(doch <= 430) {
						var calh = doch - 2 * 80;
						$('#simplemodal-container').height(calh);
					}
				}
			});
		}
	});
}
function openReviewTypePopUp(pUrl, pWidth, pHeight) {
	pElem = 'P-Registration-Content';
	$.ajax({
		url: pUrl,
		async: false,
		success: function (pAjaxResult) {
			$('#' + pElem).html(pAjaxResult);
			$('#' + pElem).modal({
				autoResize: true,
				position: ["40%", ],
				minHeight: 230,
				maxHeight: pHeight,
				maxWidth: pWidth,
				overlayClose: true,
				onShow: function (dialog) {
					var doch = $(window).height();
					if(doch <= 430) {
						var calh = doch - 2 * 80;
						$('#simplemodal-container').height(calh);
					}
				}
			});
		}
	});
}
function openDatePickerDueDates(pElem){
		$("#" + pElem).datepicker({
			showOn: "button",
			buttonImage: "i/calendar.png",
			buttonImageOnly: true,
			dateFormat: 'yy/mm/dd',
			minDate: 1,
			defaultDate: "+1d",
		});
}
var gPricesAjaxSrv = gAjaxUrlsPrefix + 'prices_srv.php';
function updateDocumentAutoPrice(pObj, pOper) {
	if(pOper == 1) {

	} else {
		var lStartPage = $('#startpage').val();
		var lEndPage = $('#endpage').val();
		if((lStartPage >= lEndPage)) {
			lAutoPriceField = $('#autoprice .inputFld');
			lAutoPriceField.attr('value', 'N/A');
		} else {
			$.ajax({
				url: gPricesAjaxSrv,
				async: false,
				dataType: "json",
				data: {
					action: 'automatic_price',
					startpage: lStartPage,
					endpage: lEndPage,
				},
				success: function (pAjaxResult) {
					if(pAjaxResult['err_cnt'] > 0) {
						for (var i = 0; i < pAjaxResult['err_cnt']; i++) {
							alert(pAjaxResult['err_msgs'][i]['err_msg']);
						}
					} else {
						lAutoPriceField = $('#autoprice .inputFld');
						lAutoPriceField.attr('readonly', 'readonly');
						lAutoPriceField.removeAttr('value');
						lAutoPriceField.attr('value', pAjaxResult['price']);
					}
				}
			});
		}
	}
}

var gIsScrolled = 0;
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
//	console.log($(lElemToScroll).offset().top);
//	console.log(lHeaderHeight);

	$('html, body').animate( {

		scrollTop : ( $(lElemToScroll).offset().top - lHeaderHeight )
	},
	{
		duration : 20
	});
	gIsScrolled = 1;
}

function scrollToAnchor(pAnchor){
	if(!$(pAnchor).length){
		return;
	}
	$('html, body').animate(
		{ scrollTop: ( $(pAnchor).offset().top - $('.documentHeader').height() )},
		{ duration: 20}
	);
}

function scrollToElement(pElement){
	if(!$(pElement).length){
		return;
	}
	$('html, body').animate(
		{ scrollTop: ( $(pElement).offset().top - $('.documentHeader').height() )},
		{ duration: 20}
	);
}

function scrollToPreviewIframeAnchor(pAnchor){
	var lElement = GetPreviewContent().find(pAnchor);
	if(!lElement.length){
		return;
	}
	$('html, body').animate(
		{ scrollTop: ( lElement.offset().top)},
		{ duration: 20}
	);
}

var gPreviewAjaxSrv = gAjaxUrlsPrefix + 'preview_srv.php';
function getDocumentPreview(pVersionId, pReadOnlyFlag, pPreviewHolderId, pArticleHolderId){
	$('#P-Ajax-Loading-Image').show();
	// tuka ne6to bugqsva framework-a kato mu se podade nula v template-a
	if(pReadOnlyFlag == 2) {
		pReadOnlyFlag = 0;
	}

	$.ajax({
			url : gPreviewAjaxSrv,
			async : false,
			dataType: "json",
			data : {
				version_id : pVersionId,
				readonly_preview : pReadOnlyFlag
			},
			success : function(pAjaxResult) {
				if(!pAjaxResult['err_cnt']){
					$('#' + pPreviewHolderId).html(pAjaxResult['preview']);
					$('#' + pArticleHolderId).show();

				}
				//~ console.log(pAjaxResult);
				$('#P-Ajax-Loading-Image').hide();
			}
		});
}

function LayerUserExpertisesFrm(pElem, pJournalId, pDocumentId, pSEID) {
	$.ajax({
		url : 'lib/ajax_srv/user_expertises.php',
		async : false,
		data : {
			journal_id : pJournalId,
			document_id : pDocumentId,
			se_uid : pSEID
		},
		success : function(pAjaxResult) {
			if(pAjaxResult == 'close') {
				$.modal.close();
			} else {
				$('#' + pElem).html(pAjaxResult);

				$('#' + pElem).modal({
					autoResize : true,
					position : ["10%", ],
					minHeight : 475,
					maxHeight : 600,
					overlayClose : true,
					onShow : function(dialog) {
						var doch = $(window).height();
						if(doch <= 475){
							var calh = doch - 2 * 80;
							$('#simplemodal-container').height(calh);
							$('#simplemodal-container .taskspopup-rightcol').height((calh - 20));
						} else {
							$('#simplemodal-container .taskspopup-rightcol').height(475);
						}
					},
				});
			}
		}
	});
}

function PerformUserExpertisesAction(ptAction, pContainer) {
		var lSerializedFormValues = $('form[name="user_expertises"]').serialize();
		lSerializedFormValues = lSerializedFormValues + '&tAction=' + ptAction;

		$.ajax({
			url : 'lib/ajax_srv/user_expertises.php',
			async : false,
			type : 'POST',
			data : lSerializedFormValues,
			dataType: 'JSON',
			success : function(pAjaxResult) {
				if(pAjaxResult['url'] && pAjaxResult['url'] != 'undefined') {
					$.modal.close();
					window.location = pAjaxResult['url'];
				} else {
					$('#' + pContainer).html(pAjaxResult);
					$('#simplemodal-container').height(430);
				}
			}
		});
}

function HideOptionWithoutValue(pElement) {
	$(pElement).find("option[value='']").remove();
}

function DisableOptionByValue(pElement) {
	if($(pElement).val() != '') {
		HideOptionWithoutValue(pElement);
	}

	var lVal = '';
	$(pElement).find("option").each(function(){
		lVal = $(this).text();
		if(lVal.length == 1) {
			$(this).attr('disabled', 'disabled');
		} else {
			$(this).css({'paddingLeft' : '10px'});
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

/**
 * Връща първия DOM node, който съдържа и 2та възела
 * @param pNodeA
 * @param pNodeB
 */
function getFirstCommonParent(pNodeA, pNodeB){
	if (checkIfNodesAreParentAndDescendent(pNodeA, pNodeB))// pNodeB е подвъзел на pNodeA
		return pNodeA;

	if (checkIfNodesAreParentAndDescendent(pNodeB, pNodeA))// pNodeA е подвъзел на pNodeB
		return pNodeB;

	var lParentsA = $(pNodeA).parents();
	var lParentsB = $(pNodeB).parents();
	// if( this.in_array(lParentsA, pNodeB ))
	// return pNodeB;
	for ( var i = 0; i < lParentsA.length; ++i) {
//		if (jQuery.inArray(lParentsA[i], lParentsB) > -1)
//			return lParentsA[i];
		if(lParentsB.filter(lParentsA.get(i)).length){
			return lParentsA.get(i);
		}
	}
}

/**
 * Връща 1 ако pNodeA е преди pNodeB в DOM-a.
 * Ако двата node-a съвпадат - 0
 * и -1 в противен случай
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
 * Тази функция ще е аналогична на jquery функцията addClass, но ще работи за всички атрибути, не само за клас.
 * Ако подадената стойност вече е добавена - не правим нищо.
 * @param pJQueryObject - jquery обекта, на който ще променяме атрибута
 * @param pAttributeName - името на атрибута
 * @param pValue - стойността, която добавяме
 */
function addAttributeValue(pJQueryObject, pAttributeName, pValue, pSeparator){
	if (typeof pSeparator == 'undefined'){
		pSeparator = ' ';
	}
	var lPreviousAttributeValue = pJQueryObject.attr(pAttributeName);
	if(!lPreviousAttributeValue){
		lPreviousAttributeValue = '';
	}
	//Ако стойността е вече добавенa - не правим нищо

	//Добавяме separator-a отпред и отзад за по-лесно търсене
	var lTemp = pSeparator + lPreviousAttributeValue + pSeparator;

	if(lTemp.indexOf(pSeparator + pValue + pSeparator) > -1){
		return;
	}



	//Добавяме стойността
	if(lPreviousAttributeValue.length == 0){
		pJQueryObject.attr(pAttributeName, pValue);
	}else{
		pJQueryObject.attr(pAttributeName, lPreviousAttributeValue + pSeparator + pValue);
	}

}

/**
 * Тази функция ще е аналогична на jquery функцията removeClass, но ще работи за всички атрибути, не само за клас.
 * Ако подадената стойност не е активна - не правим нищо.
 * @param pJQueryObject - jquery обекта, на който ще променяме атрибута
 * @param pAttributeName - името на атрибута
 * @param pValue - стойността, която махаме
 * @param pSeparator - разделителя между стойностите. По подразбиране, а и в removeClass е интервал
 */
function removeAttributeValue(pJQueryObject, pAttributeName, pValue, pSeparator){
	if (typeof pSeparator == 'undefined'){
		pSeparator = ' ';
	}
	var lPreviousAttributeValue = pJQueryObject.attr(pAttributeName);
	if(!lPreviousAttributeValue){
		lPreviousAttributeValue = '';
	}
	//Ако стойността я няма - не правим нищо
	//Добавяме separator-a отпред и отзад за по-лесно търсене
	var lTemp = pSeparator + lPreviousAttributeValue + pSeparator;

	if(lTemp.indexOf(pSeparator + pValue + pSeparator) == -1){
		return;
	}

	//Изчисляваме новата стойност
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

function BindDecisionClickEvents(pHolder) {
	$(pHolder).find('span').each(function(){
		$(this).click(function(){
			//console.log($(this));
			$(this).prev().attr('checked', 'checked');
			$(this).prev().trigger('change');
		});
	});
}

/**
 * Връща 1я възел от ДОМ-а, който е след подадения възел.
 * Ако няма такъв възел 0 връша null;
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

function GeneratePDFPreview(pDocumentId) {
	$('#P-Ajax-Loading-Image-Main').show();
	//document.location.href = gGeneratePDFAjaxSrv + '?document_id=' + pDocumentId + '&readonly_preview=1';
	document.location.href = gAjaxUrlsPrefix + 'article_elements_srv.php?action=download_pdf&item_id=' + pDocumentId;
	$('#P-Ajax-Loading-Image-Main').hide();
	return;
}

function GoToArticlePreview(pDocumentId){
	var params = [
          'height='+screen.height,
          'width='+screen.width,
          'location=1',
          'menubar=1',
          'resizable=1',
          'scrollbars=1',
          'status=1',
          'titlebar=1',
          'toolbar=1',
          'fullscreen=yes' // only works in IE, but here for completeness
      ].join(',');
	window.open('article/' + pDocumentId + '/', 'Article Preview', params);
}

function GenerateHTMLPreview(pDocumentId){
		$('#P-Ajax-Loading-Image-Main').show();

		$.ajax({
			url : gGenerateAOFAjaxSrv,
			data : {
				document_id: pDocumentId
			},
			success : function(pAjaxResult) {
				if(pAjaxResult == 'ok') {
					$('#P-Ajax-Loading-Image-Main').hide();
					openPopUp('article/' + pDocumentId + '/');
				} else {
					$('#P-Ajax-Loading-Image-Main').hide();
					alert(LANG['js.pjs.errorGeneratingFutureArticle']);
				}
			}
		});
		$('#P-Ajax-Loading-Image-Main').hide();
}

function getIframeSelection(pIframeId){
	var lIframe = $('#' + pIframeId)[0];
	if(!lIframe)
		return false;
	var lSelection = rangy.getIframeSelection(lIframe);
	return lSelection;
}


function resizePreviewIframe(pIframeId){
	var lIframe = $('#'+ pIframeId);
	var lHasPDF = lIframe.attr('data-showpdf');
	var lIframeContentHeight = lIframe.contents().find('body').height(); 
	var lHeight = lIframeContentHeight;
	
	if(!lHasPDF){
		var lIframeOffsetTop = lIframe.offset().top;
		var lWinHeight = $(window).height();
		if(Math.abs(lIframeOffsetTop) > lIframeContentHeight - $(window).height() && lIframeContentHeight > $(window).height()){
			lIframeOffsetTop = Math.sign(lIframeOffsetTop) * (lIframeContentHeight - $(window).height());
		}
		var lMinHeight = $(window).height() - lIframeOffsetTop;
		if(lHeight < lMinHeight){
			lHeight = lMinHeight;
		}
	}
	//console.log(lHeight);
	lIframe.height(lHeight);
	lIframe.show();
}

function initPreviewIframeLoadEvents(pIframeId){
	$("#" + pIframeId).load(function(responseData){
		$('#P-Article-Content').show();
		$('#P-Ajax-Loading-Image').hide();
		resizePreviewIframe(pIframeId);
		scrollToForm();
		triggerPreviewContentLoadedMsg();
		InitReferenceCitationPreviews();
	});
	window.onresize = function(){
		resizePreviewIframe(pIframeId);
	};
}

function checkIfPreviewAppIsEnabled(){
	return typeof PreviewApp != 'undefined';
}

function triggerPreviewAppContentReadyMsg(){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appGlobalChannel = Backbone.Radio.channel('global');
	appGlobalChannel.trigger.call(appGlobalChannel, "preview:ready");	
}

function triggerPreviewContentLoadedMsg(){
	if(!checkIfPreviewAppIsEnabled()){
		return;
	}
	var appGlobalChannel = Backbone.Radio.channel('global');
	appGlobalChannel.trigger.call(appGlobalChannel, "preview:loaded");	
}


/**
 * Returns the first text node which is following the specified node or false if
 * there is no such node
 *
 * @param $pNode DomNode
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
 * there is no such node
 * If the node is a text node itself - it will be returned
 *
 * @param $pNode DomNode
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

function ShowHideLabel(pElem, pLabel) {
	var lElemVal = $(pElem).val();
	if(lElemVal == '') {
		$(pLabel).show();
	} else {
		$(pLabel).hide();
	}
}

function HideLabel(pElem, pLabel) {
	$(pLabel).hide();
}

function showLoginWarningMessage(pRedirUrl, pWarning) {
	if(confirm(pWarning)){
		window.location = pRedirUrl;
	}
}

function GetPreviewContent(){
	return $('#' + gPreviewIframeId).contents();
}

function GetPreviewSelection(){
	return getIframeSelection(gPreviewIframeId);
}

function PerformReviewFormAutosaveTimeout(pInitBlurEvents){
	if(pInitBlurEvents) {
		$('form[name="document_review_form"] textarea').blur(function (e) {
			if($(e.relatedTarget).attr('name') == 'tAction' || $(e.relatedTarget).attr('type') == 'button') {
				return;
			}
			PerformReviewFormAutosave();
		});
		$('form[name="document_review_form"] input').blur(function (e) {
			if($(e.relatedTarget).attr('name') == 'tAction' || $(e.relatedTarget).attr('type') == 'button') {
				return;
			}
			PerformReviewFormAutosave();
		});

	}
	setTimeout("PerformReviewFormAutosave();PerformReviewFormAutosaveTimeout()", 30 * 1000);
}

function SyncCKEditors(){
	if (typeof CKEDITOR !== 'undefined') {
		for(var lInstanceName in CKEDITOR.instances){
	    	var lInstance = CKEDITOR.instances[lInstanceName];
	    	if(lInstance && lInstance.document && lInstance.document.$ && lInstance.document.$.defaultView){
	    		lInstance.updateElement();
	    	}
		}
	}
}

function PerformReviewFormAutosave(){
	if(gReviewFormManualSaving) {//manual saving (from button) is in progress
		return false;
	}
	var lForm = $('form[name="document_review_form"]');
	if(!lForm.length){
		return;
	}
	lForm.ajaxSubmit({
		'data' : {
			'tAction' : 'save',
			'ajax_form_submit' : 1
		}
	});
}

/**
 * Returns an array containing all the elements of pArrayA which are not in pArrayB
 * @param pArrayA
 * @param pArrayB
 */
function arrayDiff(pArrayA, pArrayB) {
	var lTemp = [], lResult = [];
	for ( var i = 0; i < pArrayA.length; i++) {
		lTemp[pArrayA[i]] = true;
	}
	for ( var i = 0; i < pArrayB.length; i++) {
		if (lTemp[pArrayB[i]]) {
			delete lTemp[pArrayB[i]];
		}
	}
	for ( var k in lTemp) {
		lResult.push(k);
	}
	return lResult;
}

function SortArticleResults(pSel, pSubmittedForm) {
	if(pSubmittedForm) {
		$('#' + pSubmittedForm + '_sortby').val($(pSel).val());
		var form = $('#' + pSubmittedForm + '_sortby').closest('form');
		form.submit();
	} else {
		location.href = "browse_journal_articles?journal_id=1&sortby=" + $(pSel).val();
	}
}

function SortCollectionResults(pSel, pSubmittedForm) {
	if(pSubmittedForm) {
		$('#' + pSubmittedForm + '_sortby').val($(pSel).val());
		var form = $('#' + pSubmittedForm + '_sortby').closest('form');
		form.submit();
	} else {
		location.href = "browse_user_collections.php?journal_id=1&sortby=" + $(pSel).val();
	}
}

function SortIssueResults(pSel) {
	if(pSel.closest('form').length) {
		var form = pSel.closest('form');
		form.submit();
	}
}

function changeLETabFromHash() {
	var tabId = location.hash.substr(1);
	if(tabId) {
		changeLETab(tabId);
	}
}

function changeLETab(pActiveTabIdx){
	var lActiveTabClass = 'viewdoc_activetab';
	if($('#P-Le-Tab-' + pActiveTabIdx).filter('.' + lActiveTabClass).length){
		return;
	}
	var lTabs = $('.P-LE-Tab-Holder .tab');
	lTabs.removeClass(lActiveTabClass);
	$('#P-Le-Tab-' + pActiveTabIdx).addClass(lActiveTabClass);
	var lTabContents =  $('.P-LE-Tabs-Holder .le_tab_contents');
	lTabContents.hide();
	$('#P-Le-Tab-Content-' + pActiveTabIdx).show();
	location.hash = pActiveTabIdx;
}

function InitFileUploadScript(pJsonData, pVersionId, pUploadId, pUploadBtnId, pFileLabelId, pFilesListId, pStatusId, pFileLanguage) {
	var btnUpload = $(pUploadId);
	var status = $(pStatusId);
	new AjaxUpload(btnUpload, {
		action: 'uploadfile.php',
		name: 'uploadfile',
		data: pJsonData,
		responseType: 'json',
		onSubmit: function (file, ext) {
			if(pJsonData.hasOwnProperty('extensions')) {
				var regex = RegExp('^(' + pJsonData.extensions + ')');
				if (!(ext && regex.test(ext))) {
					// extension is not allowed
					status.text('Only ' + pJsonData.extensions + ' files are allowed');
					return false;
				}
			}
			var lTitle = $(pFileLabelId).val();
			if (!pJsonData.hasOwnProperty('allow_empty_title')) {
				if(!lTitle || lTitle == 'undefined') {
					status.text('File label is required');
					return false;
				}
			}
			
			if(!parseInt(pJsonData.version_id)) {
				pJsonData.version_id = parseInt($(pVersionId).val());
			}
			if(pFileLanguage && parseInt($(pFileLanguage).val())) {
				pJsonData.lang_id = parseInt($(pFileLanguage).val());
			}
			pJsonData.title = lTitle;
			this.setData(pJsonData);
			status.text('Uploading...');
		},
		onComplete: function (file, response) {
			if(response.err_cnt > 0) {
				status.text(response.err_msgs[0]);
				return false;
			} else {
				status.text('');
				$(pFileLabelId).val('');
				if (!pJsonData.hasOwnProperty('allow_empty_title')) {
					$(pUploadBtnId).attr("disabled", "disabled");
				}
			}
			
			if(!parseInt(pJsonData.version_id)) {
				$(pVersionId).val(response.version_id);
			}
			if(!parseInt(pJsonData.version_id) && parseInt(pJsonData.document_id)) {
				getDocumentList(pJsonData.type, 0, pFilesListId, '', null, pJsonData.document_id);
			} else {
				getDocumentList(pJsonData.type, response.version_id, pFilesListId);
			}
		}
	});
}


function InitIssuePdfUploadScript(pJsonData, pUploadId, pUploadBtnId, pFileLabelId, pFilesListId, pStatusId, pFileLanguage) {
	var btnUpload = $(pUploadId);
	var status = $(pStatusId);
	new AjaxUpload(btnUpload, {
		action: 'uploadfile.php',
		name: 'uploadfile',
		data: pJsonData,
		responseType: 'json',
		onSubmit: function (file, ext) {
				if (ext != 'pdf') {
					// extension is not allowed
					status.text('Only PDF files are allowed');
					return false;
				}
			var lTitle = $(pFileLabelId).val();
			if (!pJsonData.hasOwnProperty('allow_empty_title')) {
				if(!lTitle || lTitle == 'undefined') {
					status.text('File label is required');
					return false;
				}
			}
			if(pFileLanguage && parseInt($(pFileLanguage).val())) {
				pJsonData.lang_id = parseInt($(pFileLanguage).val());
			}
			pJsonData.title = lTitle;
			this.setData(pJsonData);
			status.text('Uploading...');
		},
		onComplete: function (file, response) {
			if(response.err_cnt > 0) {
				status.text(response.err_msgs[0]);
				return false;
			} else {
				status.text('');
				$(pFileLabelId).val('');
				if (!pJsonData.hasOwnProperty('allow_empty_title')) {
					$(pUploadBtnId).attr("disabled", "disabled");
				}
			}


			if(parseInt(pJsonData.issue_id)) {
				getJournalMediaList(pJsonData.type, pFilesListId, 'def', null, pJsonData.journal_id, pJsonData.issue_id);
			}
		}
	});
}

function InitDocumentPicScript(pDocumentId){
	var btnUpload = $('#P-Article-Change-Preview-Pic');
	var status = $('#status');
	new AjaxUpload(btnUpload, {
		action: 'lib/uploaddocumentpic.php',
		name: 'uploadfile',
		data: {
			document_id: pDocumentId,
		},
		onSubmit: function(file, ext){
			 if (! (ext && /^(jpg|png|jpeg|gif)$/.test(ext))){
				// extension is not allowed
				status.text('Only JPG, PNG or GIF files are allowed');
				return false;
			}
			status.text('Uploading...');
		},
		onComplete: function(file, response){
			//On completion clear the status
			status.text('');
			//Add uploaded file to list
			if(response != 0){
				$('.Document-Photo').html(response);
				$('#Document-Pic-Label').html('Change document photo');
			} else{
				$('.Document-Photo').html('error uploading file');
			}
		}
	});
}

function InitDocumentPdfHtmlUploadScript(pDocumentId, pUploadType, pBtn, pHolder, pSkipReplace){
	new AjaxUpload($(pBtn), {
		action: 'lib/document_upload_html.php',
		name: 'uploadfile',
		responseType: 'json',
		data: {
			'document_id' : pDocumentId,
			'upload_type' : pUploadType,
		},
		onSubmit: function(file, ext){
			 if (! (ext && /^(html|xml)$/.test(ext))){
				// extension is not allowed
				alert(LANG['js.pjs.onlyHTMLXML']);
				return false;
			}
			 $.blockUI({ message: $('#P-Ajax-Loading-Image-Main') });
		},
		onComplete: function(file, response){
			$.unblockUI();
			if(response['err_cnt'] > 0) {
				alert(LANG['js.pjs.couldnotUploadFile'] + response['err_msg']);
				return;
			}
			if(!pSkipReplace || pSkipReplace == 'undefined') {
				$.ajax({
					url : 'lib/article_download_cached_item.php',
					data : {
						document_id: pDocumentId,
						download_type : pUploadType
					},
					success : function(pAjaxResult) {
						$(pHolder).val(pAjaxResult);
					}
				});
			}
		}
	});
}

function InitDocumentPdfFileUploadScript(pDocumentId, pBtn){
	new AjaxUpload($(pBtn), {
		action: 'lib/document_upload_html.php',
		name: 'uploadfile',
		data: {
			'document_id' : pDocumentId,
			'upload_type' : 3,
		},
		onSubmit: function(file, ext){
			 if (! (ext && /^(pdf)$/.test(ext))){
				// extension is not allowed
				alert(LANG['js.pjs.onlyPDF']);
				return false;
			}
			 $.blockUI({ message: $('#P-Ajax-Loading-Image-Main') });
		},
		onComplete: function(file, response){
			//On completion clear the status

			if(response == ''){
				alert(LANG['js.pjs.couldnotUploadFile']);
				return;
			}
			$.unblockUI();

		}
	});
}

function InitIssueUploaderScript(pBtnId, pActionName, pParams) {
	pParams = pParams ? pParams : {};
	new AjaxUpload($('#' + pBtnId), {
		action: gAjaxUrlsPrefix + 'issue_importer_srv.php?action=' + pActionName,
		responseType: 'json',
		name: 'uploadfile',
		hoverClass: 'UploadHover',
		data: pParams,
		onSubmit: function (file, ext) {
			$.blockUI({message: $('#P-Ajax-Loading-Image')});
			if(!(ext && /^(xml|zip|)$/.test(ext))) {
				// extension is not allowed
				alert(LANG['js.pjs.onlyXMLZip']);
				$.unblockUI();
				return false;
			}
		},
		onComplete: function (file, response) {
//			console.log(response);
			$.unblockUI();
			if(response['err_cnt'] > 0) {
				for (var i = 0; i < response['err_cnt']; i++) {
					alert(response['err_msgs'][i]['err_msg']);
				}
				return;
			}
			if(typeof response['eval_js'] !== "undefined" && response['eval_js'] !== "") {
				eval(response['eval_js']);
				return;
			}
		}
	});
}

function DownloadArticleCachedItem(pDocumentId, pDownloadType){
	window.open('lib/article_download_cached_item.php?document_id=' + pDocumentId +'&download_type=' + pDownloadType,'_blank');
}

function changeDiscount(pElem) {
	var lHolder = $(pElem).closest('div');
	var lElementId = $(pElem).attr('id');
	var lSectionPrefix = lElementId.substring(0, lElementId.lastIndexOf('discount'));
	
	if(lElementId != 'has_liguistic_editing'){

		if(lHolder.hasClass(lSectionPrefix + 'discount_parent')) {
			//Uncheck all other parents
			$('.' + lSectionPrefix + 'discount_parent').find('input').each(function( index ) {
				 $(this).attr("checked", false);
			});
			//Disable the child inputs of all the parents
			$('.' + lSectionPrefix + 'discount_child').find('input').each(function( index ) {
				$(this).attr('disabled', 'disabled');
				$(this).attr("checked", false);
			});
			//Disable the child textareas of all the parents
			$('.' + lSectionPrefix + 'discount_child').find('textarea').each(function() {
				$(this).attr('disabled', 'disabled');
				$(this).val('');
			});
			
			//Check the current parent
			$(pElem).attr("checked", true);
			//Enable all child inputs of the selected parent
			$('input[id*="' + lElementId + '_"]').each(function() {
				$(this).removeAttr('disabled');
			});
			//Enable all child textareas of the selected parent
			$('textarea[id*="' + lElementId + '_"]').each(function() {
				$(this).removeAttr('disabled');
			});
		}
		else{
			var parentId = lElementId.substring(3, lElementId.lastIndexOf('_'));
			var parentEl = $($('#' + parentId));
			if(!parentEl.length){
				parentId = lElementId.substring(0, lElementId.lastIndexOf('_'));
				parentEl = $($('#' + parentId));
			}
			if( parentEl.attr('checked') == 'checked'){
				if($(pElem).attr('type').toLowerCase() == 'radio'){
					//Uncheck all the other radio input children
					$('.' + lSectionPrefix + 'discount_child').find('input').each(function( index ) {
						$(this).attr("checked", false);
					});
					//Empty all the other input textareas
					$('.' + lSectionPrefix + 'discount_child').find('textarea').each(function() {
						$(this).val('');
					});
				}
				
				$(pElem).removeAttr('disabled');
				$(pElem).attr("checked", true);
			}
		}
	}
}

function getFileBaseDocumentAuthorsList(pDocumentId, pHolder) {
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gUserAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : 'get_file_base_document_author_list',
			role : lRole
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function getCorrigendumToList(pDocumentId, pHolder) {
	$.ajax({
		url : gUserAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : 'get_corrigendum_to_list',
		},
		success : function(pAjaxResult) {
			// console.log(pAjaxResult);
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function getFileBaseAbsKwdEdit(pAction, pDocumentId, pHolder) {
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gMetadataAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : pAction,
			role : lRole
		},
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});

}

function getFileBaseContribConflictEdit(pAction, pDocumentId, pHolder) {
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gMetadataAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : pAction,
			role : lRole
		},
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});

}

function getFileBaseIssueEdit(pAction, pDocumentId, pHolder) {
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gMetadataAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : pAction,
			role : lRole
		},
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function getFileBaseCollectionEdit(pAction, pDocumentId, pHolder) {
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gMetadataAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : pAction,
			role : lRole
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}


/*function getFileBasePaymentEditForm(pAction, pDocumentId, pHolder) {
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gMetadataAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : pAction,
			role : lRole
		},
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}
*/


function getDocumentTitleEdit(pAction, pDocumentId, pHolder) {
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gMetadataAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : pAction,
			role : lRole
		},
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});

}

function AddRemoveAuthorToDocument(pOper, pAuthorId, pDocumentId, pAuthorListHolder) {
	var lAction = 'add_author_to_document';
	if(pOper == 1) {
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
			if(pAjaxResult['result'] == 2) {
				AddEditDocumentAuthor(pDocumentId, pAuthorId, 1, 1);
			} else {
				getFileBaseDocumentAuthorsList(pDocumentId, pAuthorListHolder);
			}
		}
	});
}

function ChangeSubmittingAuthor(pAuthorId, pDocumentId, pAuthorListHolder) {
	if(!confirm(LANG['js.pjs.confirm.changeSubmittingAuthor'])) {
		return;
	}
	$.ajax({
		url: gDocumentAjaxSrv,
		data: {
			document_id: pDocumentId,
			user_id: pAuthorId,
			action: 'change_submitting_author'
		},
		success: function (pAjaxResult) {
			if(pAjaxResult['result'] == 2) {
				AddEditDocumentAuthor(pDocumentId, pAuthorId, 1, 1);
			} else {
				getFileBaseDocumentAuthorsList(pDocumentId, pAuthorListHolder);
			}
		}
	});
}

function AddRemoveCorrigendumTo(pOper, pDocumentId, pCorrigendumToDocumentId, pListHolder) {
	var lAction = 'add_corrigendum_to';
	if(pOper == 1) {
		var lAction = 'remove_corrigendum_to';
	}
	$.ajax({
		url : gDocumentAjaxSrv,
		data : {
			document_id : pDocumentId,
			corrigendum_to_document_id : pCorrigendumToDocumentId,
			action : lAction
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['result'] == 1) {
				$('.ui-autocomplete').hide();
				getCorrigendumToList(pDocumentId, pListHolder);
			}
		}
	});
}



function CheckAuthorExistByEmail(pAuthorEmail) {
	var lAction = 'check_user_exists';
	var lDocumentId = $('#ajax_form_field_document_id').val();
	$.ajax({
		url : gDocumentAjaxSrv,
		data : {
			document_id: lDocumentId,
			email : $(pAuthorEmail).val(),
			action : lAction
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['result'] > 0) {
				AddEditDocumentAuthor(lDocumentId, pAjaxResult['result'], 0, 1);
			}
			if(pAjaxResult['err_cnt'] > 0){
				alert(pAjaxResult['err_msgs'][0].err_msg);
			}
		}
	});
}


function AddEditDocumentAuthor(pDocumentId, pUsrId, pCountryErr, pBlurFields) {
	var ltAction = 'new';
	/*
	if(pUsrId && pUsrId != 'undefined') {
		ltAction = 'edit';
	}*/

	if(!pCountryErr || pCountryErr == 'undefined') {
		pCountryErr = 0;
	}

	$.ajax({
		url : gUserAjaxSrv,
		type : 'POST',
		data : {
			document_id : pDocumentId,
			usrid : pUsrId,
			action : 'author_edit_add_document_author_form',
			tAction : ltAction,
			err_country: pCountryErr
		},
		success : function(pAjaxResult) {
			var queryData = {};
			$.each(this.data.substr(1).split('&'),function(c,q){
				var i = q.split('=');
				queryData[i[0].toString()] = i[1].toString();
			});

			$('.ui-autocomplete').hide();
			if(!pAjaxResult['form_errors'] && pAjaxResult['close']) {
				$('#file_base_authors_search_holder').show();
				$('#author_form').hide();
			} else {
				$('#file_base_authors_search_holder').hide();
				$('#author_form').show();
				$('#author_form').html(pAjaxResult['html']);
				if(typeof queryData['usrid'] == "undefined"){
					$('#btnAddMoreAddresses').hide();
				}else{
					$('#btnAddMoreAddresses').show();
				}
			}
			if(pBlurFields == 1) {
				$('form[name="document_author_form"]').find('input, select').not('input[name="email"]').each(function(){
					$(this).trigger('blur');
					$(this).trigger('change');
				});
			}
		}
	});
}

function CancelAuthorForm(){
	$('#file_base_authors_search_holder').show();
	$('#author_form').hide();
}

function SubmitAuthorForm(pDocumentId, pAuthorListHolder, pFormName){
	var EmailFldVal = $('#author_email').val();
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&tAction=save&action=author_edit_add_document_author_form&email=' + EmailFldVal;

	$.ajax({
		url : gUserAjaxSrv,
		type : 'POST',
		data : lFormData,
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(!pAjaxResult['form_errors'] && pAjaxResult['close'] == 1) {
				$('#file_base_authors_search_holder').show();
				$('#author_form').hide();
				getFileBaseDocumentAuthorsList(pDocumentId, pAuthorListHolder);
			} else {
				$('#author_form').html(pAjaxResult['html']);
			}
		}
	});
}
function autoCompleteAuthors(SITE_URL, pDocumentId, pSearchElement, pAuthorHolder) { /*.*/
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
			.append("<td align=\"center\" colspan=\"4\"><a class=\"add_new_author\" href=\"javascript:AddEditDocumentAuthor(" + pDocumentId + ")\">Add a new author</a></td>")
			.appendTo( table );
		return TR;
	};

	$.ui.autocomplete.prototype._renderItem = function ( table, row ) {
		if(row.id) {
			var affiliationHtml = '';
			if(row.affiliation != null){
				var arrayOfAffiliations = row.affiliation.split('|');
				var affiliationHtml = '';
				for(var i=0;i < arrayOfAffiliations.length; i++){
					affiliationHtml += '<div>'+arrayOfAffiliations[i]+'</div>';
				}
			}
			var TR =  $( "<tr></tr>" )
				.data( "item.autocomplete", row )
				.append(
						"<td class=\"name\">" + row.name + "</td>" +
						"<td class=\"affiliation\">" + affiliationHtml + "</td>" +
						"<td class=\"autocomplte_email\">" + gdprEmailFormat(row.email, 10, 50) + "</td>" +
						"<td>&nbsp;&nbsp;<a href=\"javascript:AddEditDocumentAuthor(" + pDocumentId + ", " + row.id + ")\">Edit&nbsp;info</a>&nbsp;|" +
						"&nbsp;<a href=\"javascript:AddRemoveAuthorToDocument(0, " + row.id + ", " + pDocumentId + ", '" + pAuthorHolder + "')\">Add&nbsp;to&nbsp;list</a>&nbsp;&nbsp;" +
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
		    source: SITE_URL + gUserAjaxSrv + '?document_id=' + pDocumentId + '&action=get_users&notempty=1',
		    autoFocus: true,
		    minLength: 3,
		    select: function(){
		    	$("#author_search").val("");
		    	return false;
		    }
		});
	});
}

function autoCompleteCorrigendumTo(SITE_URL, pDocumentId, pSearchElement, pAuthorHolder) { /*.*/
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
			.append("<td></td>")
			.appendTo( table );
		return TR;
	};

	$.ui.autocomplete.prototype._renderItem = function ( table, row ) {
		if(row.id) {
			var affiliationHtml = '';
			if(row.affiliation != null){
				var arrayOfAffiliations = row.affiliation.split('|');
				var affiliationHtml = '';
				for(var i=0;i < arrayOfAffiliations.length; i++){
					affiliationHtml += '<div>'+arrayOfAffiliations[i]+'</div>';
				}
			}
			var TR =  $( "<tr></tr>" )
				.data( "item.autocomplete", row )
				.append(
						"<td class=\"name\"><a href=\"javascript:AddRemoveCorrigendumTo(0, " + pDocumentId + ", " + row.id + ", '#corrigendum_to_list')\">" + row.name + "</a></td>"
						
						
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
		    source: SITE_URL + gUserAjaxSrv + '?document_id=' + pDocumentId + '&action=get_corrigendum_to_list_autocomplete&notempty=1',
		    autoFocus: true,
		    minLength: 3,
		    select: function(){
		    	$("#corrigendum_to").val("");
		    	return false;
		    }
		});
	});
}

function AddNewReviewer(pJournalId, pAuthorRoleId, pDocumentId, pReviewerRoleId, pSource) {
	window.location = 'create_user.php?mode=' + pAuthorRoleId + '&document_id=' + pDocumentId + '&role=' + pReviewerRoleId + '&source=' + pSource;
}

function ChangeCoAuthor(pDocumentId, pUid, pAuthorListHolder) {
	$.ajax({
		url : gUserAjaxSrv,
		type : 'POST',
		data : {
			document_id : pDocumentId,
			usrid : pUid,
			action : 'change_co_author_for_document'
		},
		success : function(pAjaxResult) {
			getFileBaseDocumentAuthorsList(pDocumentId, pAuthorListHolder);
		}
	});
}

function reorderDocumentAuthor(pOper, pDocumentId, puid) {
	$.ajax({
		url : gUserAjaxSrv,
		type : 'POST',
		data : {
			oper : pOper,
			document_id : pDocumentId,
			usrid : puid,
			action : 'reorder_document_author'
		},
		success : function(pAjaxResult) {
			getFileBaseDocumentAuthorsList(pDocumentId, '#file_base_authors_list_content');
		}
	});
}

function getDocumentList(pType, pVersion, pHolder, pAction, pShowActions, pDocumentId, enableManuscriptFileGeneration) {
	var lAction = 'def';
	var lDontShowActions = 0;
	if(pShowActions && pShowActions != 'undefined') {
		lDontShowActions = pShowActions;
	}

	if(pAction && pAction != 'undefined') {
		lAction = pAction;
	}

	$.ajax({
		url : gFileListSrv,
		async : true,
		dataType : 'json',
		data : {
			type : pType,
			version_id : pVersion,
			document_id : pDocumentId,
			view_role : parseInt($('#view_role_id').val()),
			action : lAction,
			dont_show_actions: lDontShowActions,
			holder_name: pHolder,
			enable_manuscript_file_generation: enableManuscriptFileGeneration
		},
		success : function(pAjaxResult) {
			var found = 0;
			if(pAjaxResult['count_files'] > 0){
				for (i=0;i<pAjaxResult['data'].length;i++){
					if (pAjaxResult['data'][i].data_type == 'COL') {
						found = 1;
						break;
					}
				}
				if(found){
					$(pHolder).show();
					$('input:radio[name=add_cancel_upload_radio]').hide(); 
					$('input:radio[name=add_cancel_upload_radio]').closest("label").hide();
				}
			}else{
				$('input:radio[name=add_cancel_upload_radio]').show(); 
				$('input:radio[name=add_cancel_upload_radio]').closest("label").show();
			}

			$(pHolder).html(pAjaxResult['content']);			
		}
	});
}

function GenerateManuscriptFile(documentId, versionId){
	var selectedFiles = [];
	var selectedOptions = $('input[name=include_in_author_pdf]:checked');
	for(var i = 0; i < selectedOptions.length; ++i){
		var option = $(selectedOptions[i]);
		selectedFiles.push(option.val());
	}
	$.blockUI({message: $('#P-Ajax-Loading-Image')});
	$.ajax({
		url : gFileListSrv,
		async : true,
		dataType : 'json',
		data : {			
			document_id : documentId,
			action : 'generate_manuscript_file',	
			includedFiles: selectedFiles,	
		},
		success : function(result) {	
			$.unblockUI();		
			if(result['errCnt'] > 0){
				alert(result['errMsg']);
			}else{
				getDocumentList(1, versionId, "#upl_files_list_holder");
			}			
		},
		error: function(){
			$.unblockUI();
			alert(LANG['js.pjs.couldNotGenerateFile']);
		}
	});
}

function getJournalMediaList(pType, pHolder, pAction, pShowActions, pJournalId, pIssueId) {
	var lAction = 'def';
	var lDontShowActions = 0;
	if(pShowActions && pShowActions != 'undefined') {
		lDontShowActions = pShowActions;
	}

	if(pAction && pAction != 'undefined') {
		lAction = pAction;
	}

	$.ajax({
		url : gJournalFileListSrv,
		async : true,
		dataType : 'json',
		data : {
			type : pType,
			journal_id : pJournalId,
			issue_id : pIssueId,
			action : lAction,
			dont_show_actions: lDontShowActions,
			holder_name: pHolder
		},
		success : function(pAjaxResult) {
			var found = 0;
			if(pAjaxResult['count_files'] > 0){
				for (i=0;i<pAjaxResult['data'].length;i++){
					if (pAjaxResult['data'][i].data_type == 'COL') {
						found = 1;
						break;
					}
				}
				if(found){
					$(pHolder).show();
					$('input:radio[name=add_cancel_upload_radio]').hide();
					$('input:radio[name=add_cancel_upload_radio]').closest("label").hide();
				}
			}else{
				$('input:radio[name=add_cancel_upload_radio]').show();
				$('input:radio[name=add_cancel_upload_radio]').closest("label").show();
			}

			$(pHolder).html(pAjaxResult['content']);
		}
	});
}

function deleteDocumentFile(pFileId, pType, pVersion, pAction, pHolderName, pDocumentId) {
	if(!confirm(LANG['js.pjs.confirm.deleteFile'])){
		return;
	}
	var lAction = 'delete';
	var lHolder = '#upl_files_list_holder';
	if (pType == 2 || pType == 4) {
		lHolder = '#upl_files_list_holder2';
	}
	if(!pAction || pAction == 'undefined') {
		pAction = '';
	}
	if(pHolderName) {
		lHolder = pHolderName;
	}

	$.ajax({
		url : gFileListSrv,
		async : true,
		dataType : 'json',
		data : {
			file_id : pFileId,
			action : lAction
		},
		success : function(pAjaxResult) {
			getDocumentList(pType, pVersion, lHolder, pAction, null, pDocumentId);
			$('input:radio[name=add_cancel_upload_radio]').show(); 
			$('input:radio[name=add_cancel_upload_radio]').closest("label").show();
			if(pType == 1){
				$("#changeprofpic").show();
			}
		}
	});
}
function deleteJournalFile(pFileId, pType, pAction, pHolderName, pJournalId, pIssueId) {
	if(!confirm(LANG['js.pjs.confirm.deleteFile'])){
		return;
	}
	var lHolder = '#upl_files_list_holder';

	if(pHolderName) {
		lHolder = pHolderName;
	}

	$.ajax({
		url : gJournalFileListSrv,
		async : true,
		dataType : 'json',
		data : {
			file_id : pFileId,
			action : 'delete'
		},
		success : function(pAjaxResult) {
			getJournalMediaList(pType, lHolder, pAction, null, pJournalId, pIssueId);
			$('input:radio[name=add_cancel_upload_radio]').show();
			$('input:radio[name=add_cancel_upload_radio]').closest("label").show();
			if(pType == 1){
				$("#changeprofpic").show();
			}
		}
	});
}

function getVersionForm(pVersionId, pDocumentId, pReload, pInPopUp, pRole){
	var lReload = 0;
	
	if(!pInPopUp || pInPopUp == 'undefined') {
		pInPopUp = 0;
	}
	
	if(!pReload || pReload == 'undefined') {
		lReload = 0;
	} else {
		lReload = 1;
	}
	$.ajax({
		url : gVersionAjaxSrv,
		async : true,
		dataType : 'json',
		data : {
			version_id : pVersionId,
			id : pDocumentId,
			ajax_form_submit : 1,
			in_popup : pInPopUp,
			role : pRole
		},
		type : 'POST',
		success : function(pAjaxResult) {
			if(pAjaxResult == 1) {
				window.location.reload();
				return;
			}
			$('#review_form').html(pAjaxResult['form']);
			$("#toHide").hide();
			if(lReload == 1) {
				window.location.reload();
				return;
			}
		}
	});
}

function SaveFilebaseReviewForm(formName, pReload, pEditMode, pInPopup){
	clearFormErrors();
	var lForm = $('form[name="'+formName+'"]');
	if(!lForm.length){
		return;
	}
	$.blockUI({message: $('#P-Ajax-Loading-Image')});
	lForm.ajaxSubmit({
		'data' : {
			'tAction' : 'save',
			'ajax_form_submit' : 1,
			'in_popup' : (pInPopup ? 1 : 0),
			'edit_mode' : (pEditMode ? 1 : 0)
		},
		success : function(pAjaxResult) {
			var lId = pAjaxResult['id'];
			if(lId) {
				if($('#id').length) {
					$('#id').val(lId);
				}
			}
			var lErrors = pAjaxResult['form_has_errors'];
			var lSaving = setInterval(function(lErrors) {
				$.unblockUI();
				if (lErrors) {
					alert(LANG['js.pjs.reviewFormNotSaved']);
				} else {
					if(pReload) {
						window.location.reload();
					}
				}
				clearInterval(lSaving);
			}, 1000);
		}
	});
}


function SubmitFilebaseReviewForm(pConfirmText, pAuthorFormFlag){
	if(!pAuthorFormFlag || typeof(pAuthorFormFlag) == 'undefined') {
//		SaveFilebaseReviewForm("document_review_form");
	}
	
	//if(!pAuthorFormFlag || typeof(pAuthorFormFlag) == 'undefined') {
		if(!ReviewFormValid(pAuthorFormFlag)) {
			return;
		}
	//}
	
	if(!confirm(pConfirmText)) {
		return;
	}
	$.blockUI({message: $('#P-Ajax-Loading-Image')});
	var lJqForm = $('form[name="document_review_form"]');
	var lData = '&tAction=review&ajax_form_submit=1&';
	lData += lJqForm.formSerialize();
	$.ajax({
		url : lJqForm.attr('action'),
		dataType : 'json',
		data : lData,
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			$.unblockUI();
			if(pAjaxResult['form_has_errors']){
				$('#review_form').replaceWith(pAjaxResult['form']);
			}else{
				if(pAjaxResult['err_cnt'] > 0) {
					for (var i = 0; i < pAjaxResult['err_cnt']; i++) {
						alert(pAjaxResult['err_msgs'][i]['err_msg']);
					}
				}
				if(pAjaxResult['url_params']) {
					var lUrl = document.URL;
					window.location = lUrl + (lUrl.split('?')[1] ? '&':'?') + pAjaxResult['url_params'];
				} else {
					window.location.reload();
				}
			}
		}
	});
	return false;
}

function selectJournalCategory(pTableName, pJournalId, pPos, pIsSelected){
	$.blockUI({ message: $('#P-Ajax-Loading-Image') });
	$.ajax({
		url : gAjaxUrlsPrefix + 'journal_categories_ajax_srv.php',
		dataType : 'json',
		data : {
			'action' : 'select_journal_category',
			'table_name' : pTableName,
			'journal_id' : pJournalId,
			'pos' : pPos,
			'is_selected' : pIsSelected ? 1 : 0,
		},
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			if(!pAjaxResult['result_is_successful']){
				alert(pAjaxResult['err_msg']);
			}
			$.unblockUI();
		}
	});
}

function selectJournalCategoryTree(pTableName, pJournalId, pPos, pIsSelected, pCallback){
	$.blockUI({ message: $('#P-Ajax-Loading-Image') });
	$.ajax({
		url : gAjaxUrlsPrefix + 'journal_categories_ajax_srv.php',
		dataType : 'json',
		data : {
			'action' : 'select_journal_category_tree',
			'table_name' : pTableName,
			'journal_id' : pJournalId,
			'pos' : pPos,
			'is_selected' : pIsSelected ? 1 : 0,
		},
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			if(!pAjaxResult['result_is_successful']){
				alert(pAjaxResult['err_msg']);
			}else{
				if(pCallback){
					pCallback();
				}
			}
			$.unblockUI();

		}
	});
}

function RegenerateJournalCategoriesTable(pTableType, pJournalId){
	$.blockUI({ message: $('#P-Ajax-Loading-Image') });
	$.ajax({
		url : gAjaxUrlsPrefix + 'journal_categories_ajax_srv.php',
		dataType : 'json',
		data : {
			'action' : 'regenerate_cashed_table',
			'table_type' : pTableType,
			'journal_id' : pJournalId
		},
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(!pAjaxResult['result_is_successful']){
				alert(pAjaxResult['err_msg']);
			}
			$.unblockUI();
		}
	});
}

function RegenerateCategoriesTableForAllJournals(pTableType){
	$.blockUI({ message: $('#P-Ajax-Loading-Image') });
	$.ajax({
		url : gAjaxUrlsPrefix + 'journal_categories_ajax_srv.php',
		dataType : 'json',
		data : {
			'action' : 'regenerate_cashed_table_all_journals',
			'table_type' : pTableType
		},
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(!pAjaxResult['result_is_successful']){
				alert(pAjaxResult['err_msg']);
			}
			$.unblockUI();
		}
	});
}

function deleteJournalCategory(pTableType, pJournalId, pPos, pCallbackOnSuccess){
	if(!confirm(LANG['js.pjs.confirm.deleteCategory'])){
		return;
	}
	$.blockUI({ message: $('#P-Ajax-Loading-Image') });
	$.ajax({
		url : gAjaxUrlsPrefix + 'journal_categories_ajax_srv.php',
		dataType : 'json',
		data : {
			'action' : 'delete_journal_category',
			'table_type' : pTableType,
			'journal_id' : pJournalId,
			'pos' : pPos,
		},
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(!pAjaxResult['result_is_successful']){
				alert(pAjaxResult['err_msg']);
			}else{
				if(pCallbackOnSuccess){
					pCallbackOnSuccess();
				}
			}
			$.unblockUI();
		}
	});
}

function Test() {
	console.log(1);
}

function ShowHideDivsLE(pDivToShow, pDivToHide) {	
	$(pDivToHide).hide();
	$(pDivToShow).show();
}

function initCEChoiceActions(pFldName, pDivToShow, pDivToHide) {
	ShowHideDivs($('input:radio[name=' + pFldName + ']:checked').val(), pDivToShow, pDivToHide);
	
	$('input:radio[name=' + pFldName + ']').change(function(){
		ShowHideDivs($(this).val(), pDivToShow, pDivToHide);
	});
}

function ShowHideDivs(pChoice, pDivToShow, pDivToHide) {
	if(pChoice == 1) {
		$(pDivToHide).hide();
		$(pDivToShow).show();
	} else {
		$(pDivToShow).hide();
		$(pDivToHide).show();
	}
}

function DocumentProceedToLE(pText, pDocumentId, pStartPage, pEndPage) {
	if(confirm(pText)) {
		return ExecuteSimpleDocumentAjaxRequest({
			document_id : pDocumentId,
			start_page : pStartPage,
			end_page : pEndPage,
			action : 'filebase_proceed_document_to_le'
		});
	}
}

function DocumentProceedToLEFromAuthor(pText, pDocumentId) {
	if(confirm(pText)) {
		return ExecuteSimpleDocumentAjaxRequest({
			document_id : pDocumentId,
			action : 'filebase_proceed_document_to_le_author'
		});
	}
}

function DocumentFetchMetaDataFromPWT(pText, pDocumentId) {
	if(confirm(pText)) {
		return ExecuteSimpleDocumentAjaxRequest({
			document_id : pDocumentId,
			action : 'fetch_xml_metadata_from_pwt'
		}, true, 'POST', true);
	}
}

function DocumentProceedToLEBehalfOfAuthor(pText, pDocumentId) {
	if(confirm(pText)) {
		return ExecuteSimpleDocumentAjaxRequest({
			document_id : pDocumentId,
			action : 'filebase_proceed_document_to_le_behalf_of_author'
		});
	}
}

function DocumentProceedToCELE(pText, pDocumentId) {
	if(confirm(pText)) {
		return ExecuteSimpleDocumentAjaxRequest({
			document_id : pDocumentId,
			action : 'filebase_proceed_document_to_ce_le'
		});
	}
}

function CalculatePrintPrice(pFld, pPriceFld, pTotlaFld) {
	var lCurrentCopies = $(pFld).val();
	var lPrice = $(pPriceFld).html();
	var lTotlaFld = $(pTotlaFld);
	
	$.ajax({
		url : gPricesAjaxSrv,
		async : false,
		dataType: "json",
		data : {
			action : 'order_price',
			price : lPrice,
			copies : lCurrentCopies,
		},
		success : function(pAjaxResult) {
			lTotlaFld.html(pAjaxResult['price']);
		}
	});
	
}

function SubmitOrderFormAndGoToLogin(){
	var lFormFlds = $('form[name="journal_order_form"]').serialize();
	window.location = 'login.php?redirurl=' + encodeURIComponent('order.php?' + lFormFlds);
}

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

function ShowHideAuthorEditHolder(pWrapper, pViewWrapper) {
	if ($(pWrapper).is(':visible')) {
		window.location.reload();
	} else {
		$(pViewWrapper).hide();
		$(pWrapper).show();
	}
}

function SaveAbsKwdForm(pFormName, pHolder, pDocumentId){
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&tAction=save&action=author_edit_abs_kwd_form';

	$.ajax({
		url : gMetadataAjaxSrv,
		type : 'POST',
		data : lFormData,
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(!pAjaxResult['form_errors']) {
				getFileBaseAbsKwdEdit('get_document_abs_kwd', pDocumentId, pHolder);
			} else {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function SaveContribConflictForm(pFormName, pHolder, pDocumentId){
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&tAction=save&action=author_edit_conflict_contrib_form';

	$.ajax({
		url : gMetadataAjaxSrv,
		type : 'POST',
		data : lFormData,
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(!pAjaxResult['form_errors']) {
				getFileBaseContribConflictEdit('get_document_conflict_contributions', pDocumentId, pHolder);
			} else {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function SaveIssueForm(pFormName, pHolder, pDocumentId){
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&tAction=save&action=get_issue_form';

	$.ajax({
		url : gMetadataAjaxSrv,
		type : 'POST',
		data : lFormData,
		success : function(pAjaxResult) {
			if(!pAjaxResult['form_errors']) {
				getFileBaseIssueEdit('get_documet_issue_view', pDocumentId, pHolder);
			} else {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function ShowHideIssueEditHolder(pHolder, pDocumentId) {
	//console.log($(pHolder).find('.formWrapper').is(':visible'));
	if ($(pHolder).find('.formWrapper').is(':visible')) {
		getFileBaseIssueEdit('get_documet_issue_view', pDocumentId, pHolder);
	}
}

function SaveCollectionForm(pFormName, pHolder, pDocumentId){
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&tAction=save&action=get_collections_form';

	$.ajax({
		url : gMetadataAjaxSrv,
		type : 'POST',
		data : lFormData,
		success : function(pAjaxResult) {
			if(!pAjaxResult['form_errors']) {
				getFileBaseCollectionEdit('get_documet_collection_view', pDocumentId, pHolder);
			} else {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function ShowHideCollectionEditHolder(pHolder, pDocumentId) {
	if ($(pHolder).find('.formWrapper').is(':visible')) {
		getFileBaseCollectionEdit('get_documet_collection_view', pDocumentId, pHolder);
	}
}

function SaveTitleForm(pFormName, pHolder, pDocumentId){
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&tAction=save&action=author_edit_title_form';

	$.ajax({
		url : gMetadataAjaxSrv,
		type : 'POST',
		data : lFormData,
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(!pAjaxResult['form_errors']) {
				getDocumentTitleEdit('get_document_title', pDocumentId, pHolder);
			} else {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function ShowHideTitleMetadataEditHolder(pHolder, pDocumentId) {
	if ($(pHolder).find('.formWrapper').is(':visible')) {
		getDocumentTitleEdit('get_document_title', pDocumentId, pHolder);
	}
}

function ShowHideAbsKwdMetadataEditHolder(pHolder, pDocumentId) {
	if ($(pHolder).find('.formWrapper').is(':visible')) {
		getFileBaseAbsKwdEdit('get_document_abs_kwd', pDocumentId, pHolder);
	}
}

function ShowHideContribConflictMetadataEditHolder(pHolder, pDocumentId) {
	if ($(pHolder).find('.formWrapper').is(':visible')) {
		getFileBaseContribConflictEdit('get_document_conflict_contributions', pDocumentId, pHolder);
	}
}

function ShowHideCatAgMetadataEditHolder(pHolder, pDocumentId) {
	if ($(pHolder).find('.formWrapper').is(':visible')) {
		getFileBaseCatAgEdit('get_documet_cat_ag_view', pDocumentId, pHolder);
	}
}

function getFileBaseCatAgEdit(pAction, pDocumentId, pHolder) {
	var lRole = $('#role_id_id').val();
	$.ajax({
		url : gMetadataAjaxSrv,
		dataType : 'json',
		data : {
			document_id : pDocumentId,
			action : pAction,
			role : lRole
		},
		success : function(pAjaxResult) {
			if(pAjaxResult['html']) {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});

}


function SaveCatAgForm(pFormName, pHolder, pDocumentId){
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&tAction=save&action=get_documet_cat_ag_form';

	$.ajax({
		url : gMetadataAjaxSrv,
		type : 'POST',
		data : lFormData,
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(!pAjaxResult['form_errors']) {
				getFileBaseCatAgEdit('get_documet_cat_ag_view', pDocumentId, pHolder);
			} else {
				$(pHolder).html(pAjaxResult['html']);
			}
		}
	});
}

function CheckCopies(pField, pMin) {
	let lFieldVal = $(pField).val();
	if(lFieldVal < pMin) {
		$(pField).val(pMin);
	}
}

function scrollToErr() {
	let lerrElement = $('.errstr:visible:first');
	if($('.errstr:visible:first').length){
		scrollToElement(lerrElement[0]);
	}
}

function InitCacheTypeLinks(){
	let clear = function () {
		$('input[name="cache_type[]"]').attr('checked', false);
	};
	$('.cache-type-single-value').click(function () {
		clear();
		$(this).next('input').attr('checked', true);
		return false;
	});
	$('.cache-type-clear').click(function () {
		clear();
		return false;
	});
	$('.cache-type-select-all').click(function () {
		$('input[name="cache_type[]"]').attr('checked', true);
		return false;
	});
}

function showAnswers(pLinkHolder, pAnswersHolder) {
	if($(pAnswersHolder).is(":visible")) {
		$(pLinkHolder).html('show answers');
		$(pAnswersHolder).hide();
	} else {
		$(pLinkHolder).html('hide answers');
		$(pAnswersHolder).show();
	}
}

function submitCEForm(pFormName, pAction){
	clearFormErrors();	
	var action = document.createElement("input");
	action.setAttribute("type", "hidden");
    action.setAttribute("value", pAction);
    action.setAttribute("name", "tAction");
	document.forms[pFormName].appendChild(action);
	document.forms[pFormName].submit();
}

function submitPaymentForm(pFormName, pAction){
	var action = document.createElement("input");
	action.setAttribute("type", "hidden");
    action.setAttribute("value", pAction);
    action.setAttribute("name", "tAction");
	document.forms[pFormName].appendChild(action);
	document.forms[pFormName].submit();
}

function ConfirmReviewerInvitationEmail(pDocumentId, pInvitationId, SITE_URL){
		$.ajax({
			url : gDocumentAjaxSrv,
			async : false,
			dataType : 'json',
			data : {
				invitation_id : pInvitationId,
				document_id : pDocumentId,
				action : 'confirm_reviewer_invitation'
			},
			type : 'GET',
			success : function(pAjaxResult) {
				//console.log(pAjaxResult);
				if(pAjaxResult['err_cnt']){
					//console.log(pAjaxResult['err_cnt']);
					for (var i=0; i < pAjaxResult['err_cnt']; i++) {
					  alert(pAjaxResult['err_msgs'][i]['err_msg']);
					};
				}else{
					//console.log(pAjaxResult['dont_redirect']);
					if(pAjaxResult['dont_redirect']) {
	
					} else {
						if(pAjaxResult['url_params']) {
							var lUrl = document.URL;
							window.location = lUrl + (lUrl.split('?')[1] ? '&':'?') + pAjaxResult['url_params'] + '&r_redir=1&email=1';
						} else {
							window.location.reload();
						}
					}
				}
			}
		});
	
	/*
	return ExecuteSimpleDocumentAjaxRequest({
		invitation_id : pInvitationId,
		document_id : pDocumentId,
		action : 'confirm_reviewer_invitation'
	});*/
}

function CancelReviewerInvitationEmail(pDocumentId, pInvitationId, SITE_URL){
	$.ajax({
		url : gDocumentAjaxSrv,
		async : false,
		dataType : 'json',
		data : {
			invitation_id : pInvitationId,
			document_id : pDocumentId,
			action : 'cancel_reviewer_invitation'
		},
		type : 'GET',
		success : function(pAjaxResult) {
			//console.log(pAjaxResult);
			if(pAjaxResult['err_cnt']){
				//console.log(pAjaxResult['err_cnt']);
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  alert(pAjaxResult['err_msgs'][i]['err_msg']);
				};
			}else{
				//console.log(pAjaxResult['dont_redirect']);
				if(pAjaxResult['dont_redirect']) {
	
				} else {
					if(pAjaxResult['url_params']) {
						var lUrl = SITE_URL + 'view_document.php?id=' + pDocumentId + '&view_role=5';
						window.location = lUrl + (lUrl.split('?')[1] ? '&':'?') + pAjaxResult['url_params'];
					}
				}
			}
		}
	});
	
	/*return ExecuteSimpleDocumentAjaxRequest({
		invitation_id : pInvitationId,
		document_id : pDocumentId,
		action : 'cancel_reviewer_invitation'
	});*/
}

function ShowFBFilesPopUp(pVersionId, pType) {
	
	$.ajax({
		url : gFileEditAjaxSrv,
		dataType : 'json',
		async : false,
		data : {
			version_id : pVersionId,
			type : pType
		},
		success : function(pAjaxResult){
			$('#P-Registration-Content').html(pAjaxResult['html']);
			$('#P-Registration-Content').modal({
				autoResize : true,
				position : ["10%", ],
				minHeight : 580,
				maxHeight : 580,
				overlayClose : true,
				close : false,
				onShow : function(dialog) {
					var doch = $(window).height();
					if(doch <= 580){
						var calh = doch - 2 * 80;
						$('#simplemodal-container').height(calh);
					} else {
						var docw = $('#simplemodal-container').width();
						var modalh = $('#P-Registration-Content').height();
						//$('#simplemodal-container .taskspopup-rightcol').height(430);	
						if(modalh > 580) {
							$('#simplemodal-container').width(docw + 15);
						}
					}
					$(".simplemodal-wrap").css('overflowX', 'hidden');
				},
				onClose : function(dialog) {
					window.location.reload();
				}
			});
		}
	});
}

function EditSuppFile(pDocumentId, pFileId, pVersionId) {
	var lSrcSrc = gFileEditAjaxSrv + '?type=3&version_id=' + pVersionId + '&document_id=' + pDocumentId + '&file_id=' + pFileId + '&tAction=file_edit';
	
	$.ajax({
		url : lSrcSrc,
		dataType : 'json',
		async : false,
		success : function(pAjaxResult){
			$('#P-Registration-Content').html(pAjaxResult['html']);
			$('#P-Registration-Content').modal({
				autoResize : true,
				position : ["10%", ],
				minHeight : 580,
				maxHeight : 580,
				overlayClose : true,
				close : false,
				onShow : function(dialog) {
					var doch = $(window).height();
					if(doch <= 580){
						var calh = doch - 2 * 80;
						$('#simplemodal-container').height(calh);
					} else {
						var docw = $('#simplemodal-container').width();
						var modalh = $('#P-Registration-Content').height();
						//$('#simplemodal-container .taskspopup-rightcol').height(430);	
						if(modalh > 580) {
							$('#simplemodal-container').width(docw + 15);
						}
					}
					$(".simplemodal-wrap").css('overflowX', 'hidden');
				},
				onClose : function(dialog) {
					window.location.reload();
				}
			});
		}
	});
}

function SaveSuppFile(pName, pVersionId) {
	lForm = $('form[name="' + pName + '"]');
	if(!lForm.length){
		return;
	}
	
	var lAction = $('form[name="' + pName + '"]').attr('action');
	if(validate_supp()) {
		lForm.ajaxSubmit({
			'dataType' : 'json',
			'url' : lAction,
			'data' : {
				tAction : 'save_upload',
				type : 3,
				version_id: pVersionId
			},
			'success' : function(pAjaxResult){
				ShowFBFilesPopUp(pVersionId, 3);
				getDocumentList(3, pVersionId, '#upl_files_list_holder', 'edit_files_list');
				$("#supp_file_form").hide();
			},
		});
	}
}

function ShowEditReviewPopUp(pVersionId, pDocumentId) {
	
	$.ajax({
		url : gVersionAjaxSrv,
		async : true,
		dataType : 'json',
		data : {
			version_id : pVersionId,
			id : pDocumentId,
			ajax_form_submit : 1,
			in_popup : 1,
			edit_mode: 1
		},
		success : function(pAjaxResult){
			$('#P-Sample-Popup-Content').html(pAjaxResult['form']);
			$('#P-Sample-Popup-Content').modal({
				autoResize : true,
				position : ["10%"],
				minHeight : 580,
				maxHeight : 580,
				overlayClose : true,
				close : true,
				onShow : function(dialog) {
					var doch = $(window).height();
					if(doch <= 580){
						var calh = doch - 2 * 80;
						$('#simplemodal-container').height(calh);
					} else {
						var docw = $('#simplemodal-container').width();
						var modalh = $('#P-Sample-Popup-Content').height();
						//$('#simplemodal-container .taskspopup-rightcol').height(430);	
						if(modalh > 580) {
							$('#simplemodal-container').width(docw + 15);
						}
					}
					$(".simplemodal-wrap").css('overflowX', 'hidden');
				}
			});
		}
	});
}

function SaveCategoryAllowedJournal(pFormName){
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&action=save_category_allowed_journal';

	$.blockUI({ message: $('#P-Ajax-Loading-Image') });
	$.ajax({
		url : gAjaxUrlsPrefix + 'journal_categories_ajax_srv.php',
		dataType : 'json',
		data : lFormData,
		async : true,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(!pAjaxResult['result_is_successful']){
				alert(pAjaxResult['err_msg']);
			}
			$.unblockUI();
		}
	});
}

/* FEEDBACK POPUP */
var POPUP_OPERS = {'close': 0, 'open': 1};


function positionPopup(pFrameSrc, pHolderId) {
    var content = $("#" + pFrameSrc);
    var holder = $('#' + pHolderId);
    var screenSize = getScreenSize();
    var frameHeight = $(content).height();
    var frameWidth = $(content).width();
    var cssTop = ((screenSize.height - frameHeight) / 2);
    var cssLeft = ((screenSize.width - frameWidth) / 2);

if(screenSize.width > 601) {
    var vwidth = screenSize.width/2 + 'px';
} else {
    var vwidth = 'auto';
}
$('.popup-background').css('top', $(window).scrollTop() + 'px');

    holder.css({
        position: 'fixed',
        top: cssTop + 'px',
        left: cssLeft + 'px',
        right: cssLeft + 'px',
        //'min-height' : '200px'
        width: vwidth,
        margin: '0 auto'
    });
}
function popUp(pOper, pFrameSrc, pHolderId) {
    var content = $("#" + pFrameSrc);
    var shadow = $('#layerbg');
    var holder = $('#' + pHolderId);

    if (pOper == POPUP_OPERS.open && content.length) { // Open a pop-up iframe
        $('body').css({'overflow': 'hidden'});
        $('.popup-background').show();
        content.show();
        positionPopup(pFrameSrc, pHolderId);
    } else if (pOper == POPUP_OPERS.close && typeof pFrameSrc != 'undefined') { // Close the pop-up iframe
        $('body').css({'overflow': 'auto'});
        $('.popup-background').hide();
        $('#feedback_errors').hide();
        $('#feedback-popup input, #feedback-popup textarea').css({'border-color': 'lightgrey'});
        $('#popup-content .P-PopUp-Footer-Holder').show();
        $('#popup-content .P-PopUp-Content form').show();
        $('#popup-content input, #popup-content textarea').val('');
        shadow.hide();
        holder.hide();
    }
}

function getScreenSize() {
    var myHeight = 0;
    var myWidth = 0;
    if (window.innerWidth && window.innerHeight) {
        // Netscape & Mozilla
        myHeight = window.innerHeight;
        myWidth = window.innerWidth;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
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

    return {'width': myWidth, 'height': myHeight};
}

function submitFeedbackFrom() {
    $.ajax({
        url: 'lib/ajax_srv/send_feedback_srv.php',
        dataType: 'json',
        data: $('form[name="FeedbackPopupForm"]').serialize(),
        type: 'POST',
        success: function (pAjaxResult) {
            if (pAjaxResult['err_cnt'] > 0) {
                $('#feedback-popup input, #feedback-popup textarea').css({'border-color': 'lightgrey'});
                $('#feedback_errors').html(pAjaxResult['err_msg']);
                $('#feedback_errors').show();
                if (pAjaxResult['err_fld'].length) {
                    $(pAjaxResult['err_fld']).each(function (k, v) {
                        $('input[name="' + v + '"], textarea[name="' + v + '"]').css({'border-color': 'red'});
                    });
                }
            } else {
                popUp(POPUP_OPERS.close, 'feedback-popup', 'feedback-popup');
				alert(LANG['js.pjs.feedbackSent']);
            }
        }
    });
}
/* FEEDBACK POPUP END*/


function PackageRemoveAllowedUser(pUserPackageDetailId, pUsrId){
	return ExecuteSimpleDocumentAjaxRequest({
		user_package_details_id : pUserPackageDetailId,
		user_id : pUsrId,
		action : 'remove_user_package_allowed_users'
	});
}

function PackageAddAllowedUser(pUserPackageDetailId, pUsrId){
	return ExecuteSimpleDocumentAjaxRequest({
		user_package_details_id : pUserPackageDetailId,
		user_id : pUsrId,
		action : 'add_user_package_allowed_users'
	});
}

function SubmitPackageFormByName(pName) {
	var lJqForm = $('form[name="' + pName + '"]');
	var lData = 'action=buy_package&';
	lData += lJqForm.formSerialize();

	$.ajax({
		url: gDocumentAjaxSrv,
		dataType: 'json',
		data: lData,
		async: false,
		type: 'POST',
		success: function (pAjaxResult) {
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
		}
	});
}

function ArchiveDocument(doc, usr) {
	if(confirm(LANG['js.pjs.confirm.archiveSubmission'])){
		return ExecuteSimpleDocumentAjaxRequest({
			document_id : doc,
			user_id : usr,
			action : 'archive_document'
		}, true);
	}
}

function checkPostReviewReviewersState(pRoundId, pUrl, pDocumentId, pReviewersLock) {
	var lConfirm;

	if (pReviewersLock != 'true' && pReviewersLock != 't') {
		lConfirm = confirm(LANG['js.pjs.confirm.warningNoMoreReviewrInvitations']);
	} else {
		lConfirm = true;
	}

	if (!lConfirm) {
		return;
	}

	$.ajax({
		url: gDocumentAjaxSrv,
		async: false,
		data: {
			roundid: pRoundId,
			document_id: pDocumentId,
			action: 'check_reviewers'
		},
		success: function (pAjaxResult) {
			if (pAjaxResult['err_cnt'] === 0) {
				var lInvitedUsers = pAjaxResult['invited_users'];
				var lInvitedUsersIds = pAjaxResult['invited_users_ids'];
				var lNonSubmitedUsers = pAjaxResult['non_submited_users'];
				var lNonSubmitedUsersIds = pAjaxResult['non_submited_users_ids'];

				var lMsgSubmitedUsers = '';
				var lMsgInvitedUsers = '';

				var lPluralorNotInvitedUsers = '';
				if (lInvitedUsers > 1) {
					lPluralorNotInvitedUsers = 's';
				}

				var lPluralorNotReviews = '';
				if (lNonSubmitedUsers > 1) {
					lPluralorNotReviews = 's';
				}

				if (lInvitedUsers !== 0)
					lMsgInvitedUsers = 'Please note that ' + lInvitedUsers + ' reviewer' + lPluralorNotInvitedUsers + ' will be cancelled automatically. Are you sure?';
				if (lNonSubmitedUsers !== 0)
					lMsgSubmitedUsers = 'Please note that ' + lNonSubmitedUsers + ' review' + lPluralorNotReviews + ' will be submited automatically. Are you sure?';
				if (lInvitedUsers !== 0 || lNonSubmitedUsers !== 0) {
					if (confirm(lMsgInvitedUsers + "\n" + lMsgSubmitedUsers) == true) {
						manageUserInvitationsAndReviews(pRoundId, pDocumentId, lInvitedUsersIds, lNonSubmitedUsersIds);
						window.location = pUrl;
					}
				} else {
					window.location = pUrl;
				}
			}
		}
	});
}

function ViewMoreReviewers(journal_id, document_id, view_more){
    view_more = view_more + 20;
    $.ajax({
        url: 'lib/ajax_srv/document_srv.php',
        dataType: 'json',
        type: 'GET',
        data: {
            action: 'viewMoreReviewers', 
            document_id: document_id, 
            journal_id: journal_id, 
            viewMoreLimit: view_more
        },
        success: function (pAjaxResult) {
            if (pAjaxResult['err_cnt'] == 0) {
                $('#reviewrs_content_holder').html(pAjaxResult.html_content);
            }
        }
    });
}

function buildStatisticPlot(pHolderId, pSeriesData) {
	var options = {		
		seriesDefaults : {
			renderer : $.jqplot.BarRenderer,
			pointLabels : { show : true, location : 'e', edgeTolerance : -15},
			showHighlight : true,
			rendererOptions : {				
				barDirection : 'horizontal',						
				barWidth : 6,
				barMargin : 2,
				barPadding : 10,
				highlightMouseOver : true,
				shadowOffset : 1,
				varyBarColor : false,
				shadowAlpha : 0.05,
				groups : 1,
			}
		},

		axesDefaults : {},
		axes : {
			yaxis : {
				renderer : $.jqplot.CategoryAxisRenderer,
			},
		},

	};
	
	var plot = $.jqplot(pHolderId, pSeriesData, options);		
	$('#' + pHolderId + ' .jqplot-yaxis-tick').each(function(){
		var lNode = $(this);
		var lLabel = lNode.text();
		
	});
		
	if (!$.jqplot._noToImageButton) {
        var btn = $(document.createElement('button'));
        var img = $(document.createElement('div'));
        img.addClass(pHolderId + 'jqplot-image-holder2');
        btn.text('View Plot Image');
        btn.addClass(pHolderId + 'jqplot-image-button2');
        btn.bind('click', function() {
        	var imgelem = $('#' + pHolderId).jqplotToImageElem();
        	$(img).html(imgelem);
        });

        $('#' + pHolderId).after(btn);
        $('#' + pHolderId).after(img);
        btn.after('<br />');
        btn = null;
    }
		
}

function buildStatisticPlotGroupData(pHolderId, pSeriesData, pSeriesLabel) {
	var labels = [];
	for(var i = 0; i < pSeriesLabel.length; ++i){	
		labels.push({
			label:pSeriesLabel[i]
		});	
	}
		
	var options = {
			  seriesDefaults: {
	                renderer:$.jqplot.BarRenderer,
	                pointLabels: { 
	                	show: true, 
	                	location: 'e', 
	                	edgeTolerance: -15,
	                	labelsFromSeries: false,
	                	
	                },
	                shadowAngle: 135,
	                rendererOptions : {
						// Speed up the animation a little bit.
						// This is a number of milliseconds.  
						// Default for bar series is 3000.  
						barDirection : 'horizontal',						
						barWidth : 6,
						highlightMouseOver : true,
						shadowOffset : 1,
						varyBarColor : false,
						shadowAlpha : 0.05,
						groups : 1,
						
		    		}
	            },
	            
	            series:labels,	                
	            axes: {
	                yaxis: {
	                    renderer: $.jqplot.CategoryAxisRenderer
	                }
	            },
	            highlighter : {
	    			show : true,
	    			showLabel : true,
	    			showMarker : false,
	                tooltipContentEditor: function(str, seriesIndex, pointIndex, plot){
	                    return plot.series[seriesIndex].label;
	                },
	                tooltipLocation: 'w',
	                
	    		},	    		
     
	};
	var plot = $.jqplot(pHolderId, pSeriesData, options);		
	$('#' + pHolderId + ' .jqplot-yaxis-tick').each(function(){
		var lNode = $(this);
		var lLabel = lNode.text();
	});
	
	if (!$.jqplot._noToImageButton) {
        var btn = $(document.createElement('button'));
        var img = $(document.createElement('div'));
        img.addClass(pHolderId + 'jqplot-image-holder');
        btn.text('View Plot Image');
        btn.addClass(pHolderId + 'jqplot-image-button');
        btn.bind('click', function() {
        	var imgelem = $('#' + pHolderId).jqplotToImageElem();
        	$(img).html(imgelem);
        });

        $('#' + pHolderId).after(btn);
        $('#' + pHolderId).after(img);
        btn.after('<br />');
        btn = null;
    }
}

function showHideRawStatData(pElem) {
	var lShowHide = 0;
	$('.row_stat_data').each(function(){
		if(!$(this).is(':visible')) {
			$(this).show();
			lShowHide = 1;
		} else {
			$(this).hide();
			lShowHide = 2;
		}
	});
	if(lShowHide == 1) {
		$(pElem).val('Hide raw data');
	} else if(lShowHide == 2) {
		$(pElem).val('Show raw data');
	}
	
}

function genDocumentsCSV(pJournalId) {
	$.ajax({
		url : gDocumentAjaxSrv,
		data : {
			journal_id: pJournalId,
			action : 'generate_documents_info_csv'
		},
		success : function(pAjaxResult) {
			
		}
	});
}

var formSubmissionTimeout;

function delayFormSubmission(pFormId, pBlockUi) {
	if(typeof pBlockUi == 'undefined'){
		pBlockUi = 1;
	}
	if(formSubmissionTimeout){
		clearTimeout(formSubmissionTimeout);
	}
	formSubmissionTimeout = setTimeout(function(){
		if(pBlockUi){
			blockUi();
		}
		$("#" + pFormId).submit();
	}, 1500);
}

function filterFromBy(pFormId, pFieldValue){
	$('#chk_'+pFieldValue).attr('checked', 'checked');
	delayFormSubmission(pFormId);
}



function generateStatistics(pFormId, pContainer, pRename) {	
	if(typeof pRename == 'undefined'){
		var lRename = false;
	}else{
		var lRename = true;
	}	
	var lSerializedFormValues = $('#' + pFormId).serialize() + '&action=get_statistics_data';
	$('#' + pContainer).html('<img src="/i/loading.gif" alt="">');
	$.ajax({
		url: 'ajax_srv.php',
		async: true,
		type: 'POST',
		data: lSerializedFormValues,
		dataType: 'JSON',
		success: function (pAjaxResult) {
			$('#' + pContainer).html('');
			if(pAjaxResult['err_cnt'] > 0) {
				alert(pAjaxResult['err_msg']);
			} else if(pAjaxResult['html'] && pAjaxResult['html'] !== 'undefined') {
				$('#' + pContainer).html(pAjaxResult['html']);
			}
			if(lRename == true){
				$('.genChart').find('.button_green2').val('Redraw graphic');
			}
			// $('.flex0').find('.button_green2').addClass('hiden');		
		}
		
	});
	
	$('#' + 'chart_div').empty();
	$('#' + 'chart_div').removeClass("ChartWrapper");	
}

function exportStatistics(pFormIds, pContainer){
  var lSerializedFormValues = $('#' + pFormIds).serialize() + '&action=export_statistics';  
  document.location.href = 'ajax_srv.php?' + lSerializedFormValues;
}

function generateStatisticsChart(pFormIds, pContainer) {
	var lSerializedFormValues = $('#' + pFormIds).serialize() + '&action=get_statistics_chart_data';
	$('#' + pContainer).html('<img src="/i/loading.gif" alt="">');
	$.ajax({
		url: 'ajax_srv.php',
		async: true,
		type: 'POST',
		data: lSerializedFormValues,
		dataType: 'JSON',
		success: function (pAjaxResult) {
			$('#' + pContainer).html('');
			if(pAjaxResult['err_cnt'] > 0) {
				alert(pAjaxResult['err_msg']);
			} else if(pAjaxResult['html'] && pAjaxResult['html'] !== 'undefined') {
				$('#' + pContainer).html(pAjaxResult['html']);
			}
		}		
	});		
	$('.flex0').find('.button_green2').addClass('hiden');

}

function drawTitleSubtitle(pData, pTitle, pSubtitle) {
    var data = google.visualization.arrayToDataTable(pData);
    var options = {
        chart: {
            title: pTitle,
            subtitle: pSubtitle
        },
        hAxis: {
            title: '',
        },
        vAxis: {
            title: 'Period'
        }
    };
    $('#chart_div').addClass('ChartWrapper');
    var material = new google.charts.Bar(document.getElementById('chart_div'));
    material.draw(data, options);
}
// CommonPopUpAction(\'reviewers_statistics\', \'&userid='.$pUserId.'\');
function generateUserWorkloadStatistics(pAction, pData, pContainer, pId, p) {

	var text = p.text;
    p.text = p.dataset['title'];
    p.dataset.title = text;
    var lData = 'action=' + pAction + '&';
    var lId = '_'+pId;
    lData += (typeof pData !== "undefined" ? pData : '');
    if(p.dataset.title == 'Hide'){
        $('.showHideUserRoleStatistics'+lId).fadeOut();
        return;
    }
    $('#' + pContainer+lId).html('<div style="text-align: center;"><img src="/i/loading.gif" alt=""></div>');
    $('.showHideUserRoleStatistics'+lId).fadeIn();
    $.ajax({
        url: 'ajax_srv.php',
        async: true,
        type: 'POST',
        dataType: 'JSON',
        data: lData,
        success: function (pAjaxResult) {
            if(typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
                eval(pAjaxResult['eval_js']);
                return;
            }
            $('#' + pContainer+lId).html('');
            if(pAjaxResult['err_cnt'] > 0) {
                alert(pAjaxResult['err_msg']);
            } else if(pAjaxResult['html'] && pAjaxResult['html'] !== 'undefined') {
                $('#' + pContainer+lId).html(pAjaxResult['html']);
            }
        }
    });
}

function drawUserWorkloadStatistics(pType, pOptionData, pData, pTitle, pSubtitle, pElement) {
	if (pData.length == 0) {
		return;
	}
	var lSecondColor = '#B42741';
	if(pType == 2) {//reviewers
		lSecondColor = '#a8e47b';
	}
	var data = google.visualization.arrayToDataTable([
		pOptionData,
	].concat(pData));
	var options = {
		title: pTitle,
		titleTextStyle: {
			fontSize: 16, // 12, 18 whatever you want (don't specify px)
			bold: true
		},
		// isStacked: true,
		chart: {
			title: pTitle,
			subtitle: pSubtitle
		},
		hAxis: {
			title: '',
            format: '#',
            // baseline: 1,
		},
		vAxis: {
			title: '',
			format: ''
		},
		isStacked: false,
		legend: {position: 'top', maxLines: 3, textStyle: {fontSize: 14}},
		bar: {groupWidth: "80%"},
		chartArea: {'width': '80%', 'height': '70%'},
		colors: ['#7eaa5d', lSecondColor],
		height: 300
	};
	$('#' + pElement).addClass('ChartWrapper');
	var material = new google.visualization.BarChart(document.getElementById(pElement));
	material.draw(data, options);
}



function drawTitleSubtitleHorizontal(pData, pTitle, pSubtitle) {
      var data = google.visualization.arrayToDataTable(pData);
      var options = {
		legend: {
      		position: 'bottom',
      		alignment: 'end'
      	},
        chart: {
          title: pTitle,
          subtitle: pSubtitle
        },

        bars: 'horizontal'
      };
      $('#chart_div').addClass('ChartWrapper');        
      var material = new google.charts.Bar(document.getElementById('chart_div'));
      material.draw(data, options);
}

function CheckTemplateJournalBelonging(pTemplateId, pJournalId){
	$.ajax({
		url: gEmailTemplateJournalUrl,
		async: true,
		type: 'POST',
		data: {
			template_id: pTemplateId,
			journal_id: pJournalId
		},
		dataType: 'JSON',
		success: function (pAjaxResult) {
			if(pAjaxResult.journal_belonging == 0){ //general
				$('<div>'+pAjaxResult.msg+'</div>').dialog({							
							modal: true,
							resizable: false,
							height: 'auto',
							closeText: '',
							width: 650,
							draggable: false,
							dialogClass: 'P-Email-Template-Confirm',
							buttons: {
									"Edit Anyway": function() {
										$( this ).dialog( "close" );
									  window.location = pAjaxResult.redirectUrl;// edit page
									},
									"Duplicate for This Journal and Edit": function() {
										$( this ).dialog( "close" );
									  window.location = pAjaxResult.redirectSaveAsCopyUrl;// duplicate and edit the duplicated
									},
									Cancel: function() {
									  $( this ).dialog( "close" );
									}
							},
							open: function () {
								$(".ui-widget-overlay").css({
									opacity: 0.3,
									filter: "Alpha(Opacity=100)",
									backgroundColor: "#000000"
								});
							},
				});
			}else{
				window.location = pAjaxResult.redirectUrl; // edit page
			}
		}		
	});
}

function CreateNewEvent(pAction, pData) {
	var lData = 'action=' + pAction + '&';
	lData += (typeof pData !== "undefined" ? pData : '');
	$.ajax({
		url: gCreateEventAjaxSrv,
		dataType: 'json',
		data: lData,
		success: function (pAjaxResult) {
			if(typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
		}
	});
}

function showEmailRecepients(pFormName) {
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&action=get_email_recepients';
	$('#emailReceiptsContent').html('<img src="/i/loading.gif" alt="">');
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType : 'json',
		data : lFormData,
		type : 'POST',
		success : function(pAjaxResult) {
			$("#emailReceiptsContent").html(pAjaxResult['html']);
		}
	});
}

/**
 * jquery clickoff event
 * detects click outside given element
 * (used in Article preview iframe)
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

var blockCounter = 0;
function blockUi(){
	blockCounter++;
	if(blockCounter == 1){
		$.blockUI({
			message: '<img src="/i/loading.gif" alt="" />',
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

function enableDisabePriceChange(pInput){
	var lId = pInput.value;
	if (pInput.checked) {
		$('#optional_service_price_'+lId).css('visibility', 'visible');
	} else {
		$('#optional_service_price_'+lId).css('visibility', 'hidden');
	}
}

function changeOptionalServicePrice(pInput, pOptionalServiceId, pJournalSectionId){
	var price = $('#'+pInput.id).val();
	var journal_section_id = pJournalSectionId;
	$.ajax({
		url: gDocumentAjaxSrv,
		dataType: 'json',
		type: 'POST',
		async: false,
		data: {
			action: 'change_optional_service_type_price',
			optional_service_id: pOptionalServiceId,
			price: price,
			journal_section_id: journal_section_id,			
		},
		success: function (pAjaxResult) {
			//alert('Executed!\n\r'+pAjaxResult.result);
		}
	});
}

var clicked = false;
var interhbnews;
$(window).bind('load', function () {
    $('.block_next').click(function (e) {
        e.preventDefault();
        clearInterval(interhbnews);
        if (!clicked) {
            clicked = true;
            slideRight($(this).parent().parent());
        }
    });
    $('.block_prev').click(function (e) {
        e.preventDefault();
        clearInterval(interhbnews);
        if (!clicked) {
            clicked = true;
            slideLeft($(this).parent().parent());
        }
    });
	var $target = $('.block_text_holder').children();
	if($target.length > 1){
		$('.block_text_news').css('margin', '0 10px');
		interhbnews = setInterval(function () {
			slideRight($('#hbnews'));
		}, 12000);
	}
    
});

function slideRight(blk) {
    var $target = $(blk).children('.head_block_content, #hb_bottom').children('div');
    var $txt_holder = $(blk).children('.block_text_holder');
    var $next = $txt_holder.children('.next_txt');
    var $prev = $txt_holder.children('.prev_txt');
	
    $target.animate({left: $target.width() + 'px'}, {duration: 1, easing: 'easeInExpo', complete: function () {
            $target.html($next.html());
            if ($next.next().html()) {
                $next.next().addClass('next_txt');
            } else {
                $txt_holder.children().first().addClass('next_txt');
            }
            $next.removeClass('next_txt');
            if ($next.prev().html()) {
                $next.prev().addClass('prev_txt');
            } else {
                $txt_holder.children().last().addClass('prev_txt');
            }
            $prev.removeClass('prev_txt');
            $target.css({left: '-' + $target.width() + 'px'});
            $target.animate({left: '0px'}, {duration: 1, easing: 'easeOutQuart', complete: function () {
                    clicked = false;
                }});
        }});
}
;

function slideLeft(blk) {
    var $target = $(blk).children('.head_block_content, #hb_bottom').children('div');
    var $txt_holder = $(blk).children('.block_text_holder');
    var $next = $txt_holder.children('.next_txt');
    var $prev = $txt_holder.children('.prev_txt');
    if($prev.length === 0) {
    	 clicked = false;
    	 return false;
    }
    	
    $target.animate({left: '-' + $target.width() + 'px'}, {duration: 1, easing: 'easeInExpo', complete: function () {
            $target.html($prev.html());
            if (!$prev.prev().html()) {
                $txt_holder.children().last().addClass('prev_txt');
            } else {
                $prev.prev().addClass('prev_txt');
            }
            $prev.removeClass('prev_txt');
            if ($prev.next().html()) {
                $prev.next().addClass('next_txt');
            } else {
                $txt_holder.children().first().addClass('next_txt');
            }
            $next.removeClass('next_txt');
            $target.css({left: +$target.width() + 'px'});
            $target.animate({left: '0px'}, {duration: 1, easing: 'easeOutQuart', complete: function () {
                    clicked = false;
                }});
        }});
}

function PostArticleTo(pApiId, pArticleId, pJournalId){
	$('#P-Ajax-Loading-Image-Main').show();
	$.ajax({
		url: gDocumentAjaxSrv,
		dataType: 'json',
		type: 'POST',
		async: false,
		data: {
			action: 'post_document_to_api',
			api_id: pApiId,
			article_id: pArticleId,
			journal_id: pJournalId,			
		},
		success: function (pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult.err_cnt > 0){
				alert(LANG['js.pjs.notAllowed']);
			}else{
				alert(LANG['js.pjs.success']);
			}
		}
	});
}

function ValidateNlmXml(pDocumentId){
	$('#P-Ajax-Loading-Image-Main').show();
	var lData = {
		document_id : pDocumentId,
		action : 'validate_nlm_xml'
	};
	
	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : lData,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();			
			if(pAjaxResult['err_cnt']){
				var errors;
				for (var i=0; i < pAjaxResult['err_cnt']; i++) {
				  errors += pAjaxResult['err_msgs'][i]['err_msg']+' on line '+pAjaxResult['err_msgs'][i]['err_line']+' '+'\n';
				  $('.dtd_errors_holder').text(errors);
				}
			}else{
				xmlDoc = $.parseXML( pAjaxResult['result'] ),
				$xml = $( xmlDoc ),
				$error = $xml.find( "error" );
				$('.dtd_errors_holder').text('DTD VALIDATION OK');
				if($error.length == 0){
					$('.dtd_errors_holder').append('<br>NO STYLE ERRORS FOUND');
				}else{
					$('.dtd_errors_holder').append('<br>STYLE ERRORS FOUND: '+$error.text());
					$('#NlmXmlText').html(pAjaxResult['result']);
					$('.dtd_errors_holder').append('<br><a href="javascript:void(0);" onclick="showNlmXml();">View NLM XML</a>');
				}			
			}
		},
		error : function(jqXHR, textStatus, errorThrown){
			alert(LANG['js.pjs.noSuccess']);
			$('#P-Ajax-Loading-Image-Main').hide();
		}
	});
}

function showNlmXml(){	
	var html = $("#NlmXmlText").html();	
	var newWindow = window.open('','_blank','toolbar=0, location=0, directories=0, status=0, scrollbars=1, resizable=1, copyhistory=1, menuBar=1, width=1200, height=1000, left=50, top=50', true);
	var preEl = newWindow.document.createElement("pre");
	var codeEl = newWindow.document.createElement("code");
	codeEl.appendChild(newWindow.document.createTextNode(html));
	preEl.appendChild(codeEl);
	newWindow.document.body.appendChild(preEl);
	
}


function InitReferenceCitationPreviews() {
	var lReferenceContent;
	var lBaloon = $('#' + gBaloonId);
	var refs = GetPreviewContent().find('xref[type=bibr][rid]');
	refs.each(function (pIdx, pReferenceNode) {
		var lReferenceId = $(pReferenceNode).attr('rid');
		$(pReferenceNode).hover(
				function (pEvent) {
					lReferenceContent = GetPreviewContent().find('.ref-list-AOF-holder[data-main-instance-id="' + lReferenceId + '"]');
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
//					lBaloon.css('top', lReferenceOffsetTop);
//					lBaloon.css('left', lReferenceOffsetLeft);
					lBaloon.show();
				},
				function (pEvent) {
					lBaloon.hide();
				}
		);
	});
}

function getIthenticateReport(pDocumentId, pPercentMatch){
	if(pPercentMatch != ''){
		if (window.confirm(LANG['js.pjs.confirm.newReport'])) {
			getIthenticateReports(pDocumentId);
		}
	}else{
		getIthenticateReports(pDocumentId);
	}
}

function getIthenticateReports(pDocumentId){
	$('#P-Ajax-Loading-Image-Main').show();
	var lData = {
		article_id : pDocumentId
	};
	
	$.ajax({
		url : gAjaxUrlsPrefix + 'ithenticate_report.php',
		async : true,
		dataType : 'json',
		data : lData,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();
			if(pAjaxResult['err_cnt']){
				alert(pAjaxResult['err_msg'])
			}			
			$('#ithenticate_report_id').html(pAjaxResult['html']);
		},
		error : function(jqXHR, textStatus, errorThrown){
			alert(LANG['js.pjs.noSuccess']);
			$('#P-Ajax-Loading-Image-Main').hide();
		}
	});
}

function UpdateCollectionStates(pAction, pFormName) {
	var lData = $('form[name="' + pFormName + '"]').formSerialize();
	lData += '&action=' + pAction;
	$.ajax({
		url: 'ajax_srv.php',
		dataType: 'json',
		data: lData,
		beforeSend: function () {
			blockUi();
		},
		success: function () {},
		complete: function () {
			unblockUi();
		}
	});
}

function GetUserCollectionDocuments(pAction, pContentId, pData) {
	var lData = 'action=' + pAction + '&';
	lData += (typeof pData !== "undefined" ? pData : '');
	$.ajax({
		url: 'ajax_srv.php',
		dataType: 'json',
		data: lData,
		success: function (pAjaxResult) {
			$('#' + pContentId).html(pAjaxResult['html']);
		}
	});
}


function mergeUsers(pForm){
	if (!confirm(LANG['js.pjs.confirm.mergeUsers'])) {
		return;
	}
	var lJqForm = $('form[name="' + pForm + '"]');
	var lData = lJqForm.formSerialize();

	$.ajax({
		url: gMergeUsersAjaxSrv,
		dataType: 'json',
		data: lData,
		success: function (pAjaxResult) {
			if (typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
		}
	});
}


function RegenerateComponentsDOI(pDocumentId){
	$('#P-Ajax-Loading-Image-Main').show();
	var lData = {
		document_id : pDocumentId,
		action : 'regenerate_components_doi'
	};
	
	$.ajax({
		url : gDocumentAjaxSrv,
		async : true,
		dataType : 'json',
		data : lData,
		type : 'POST',
		success : function(pAjaxResult) {
			$('#P-Ajax-Loading-Image-Main').hide();	
			alert(LANG['js.pjs.success']);
		},
		error : function(jqXHR, textStatus, errorThrown){
			alert(LANG['js.pjs.noSuccess']);
			$('#P-Ajax-Loading-Image-Main').hide();
		}
	});
}

function SetBrowserSession(pBrowserSessionInfo) {
	$.ajax({
		url: gDocumentAjaxSrv,
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

function CopyrightNoticeLicenses(pElem) {
	var val = $(pElem).val();
	if(val == 1) { //yes -> usa or canadian citizen
		$("input[type=radio][name=license]").prop("checked", false);
	} else {
		$("input[type=radio][name=license]").first().prop("checked", true);
	}
}

function moveToLayout(pDocumentId, pSourceId) {
	if(confirm(LANG['js.pjs.confirm.moveToLayout'])){
		$.ajax({
			url: 'ajax_srv.php',
			async: false,
			dataType: "json",
			data: {
				action: 'move_document_to_layout',
				document_id: pDocumentId,
				source_id: pSourceId,
			},
			success: function () {
				window.location.reload();
			}
		});
	}
}

function resendConfirmationMail() {
	$.ajax({
		url: 'ajax_srv.php',
		dataType: 'json',
		data: {
			action: 'resend_confirmation_mail',
			email: $('input[name="uname"]').val(),
		},
		async: false,
		type: 'POST',
		success: function (pAjaxResult) {
			eval(pAjaxResult['eval_js']);
			window.location.href = pAjaxResult['redirect'] + 'login.php';
			return;
		},
	});
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

function populateEmailNotificationTemplate(pTemplateId, pJournalName, pPublisherName){
	$.ajax({
		url: gDocumentAjaxSrv,
		dataType: 'json',
		data: {
			action: 'get_email_template',
			template_id: pTemplateId,
			journal_name: pJournalName,
			publisher_name: pPublisherName
		},
		async: false,
		type: 'POST',
		success : function(pAjaxResult) {
			$("#subject").val(pAjaxResult.result.subject);
			CKEDITOR.instances['textarea_template_body'].setData(pAjaxResult.result.filebase_template);
		},
	});
}

function previewEmailBody(pFormName) {
	var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
	lFormData += '&action=get_email_template_preview';
	$('#emailReceiptsContent').html('<img src="/i/loading.gif" alt="">');
	$.ajax({
		url : gDocumentAjaxSrv,
		dataType : 'json',
		data : lFormData,
		type : 'POST',
		success : function(pAjaxResult) {
			$("#emailReceiptsContent").html(pAjaxResult['html']);
		}
	});
}

function previewEmailBodyFill(pFormName) {
    var lFormData = $('form[name="' + pFormName + '"]').formSerialize();
    lFormData += '&action=get_email_template_preview';
    $('#emailReceiptsContent').html('<img src="/i/loading.gif" alt="">');
    $("#emailReceiptsContentTextarea").hide();
    $.ajax({
        url : gDocumentAjaxSrv,
        dataType : 'json',
        data : lFormData,
        type : 'POST',
        success : function(pAjaxResult) {
        	var lResult = pAjaxResult['html'];
            $("#emailReceiptsContent").html('');
            $("#emailReceiptsContentTextarea").show();
            $("#template_subject_preview").val(lResult['subject']);
            CKEDITOR.instances['textarea_template_body_preview'].setData(lResult['body']);

        }
    });
}

function getCheckedItems(chkboxName) {
	var checkboxes = document.getElementsByName(chkboxName);
	var checkboxesChecked = [];
	for (var i=0; i<checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			checkboxesChecked.push(checkboxes[i].value);
		}
	}
	return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function exportArchive(type) {
	var items = getCheckedItems('itemCheckBox');
	if (items == null || items.length == 0) {
		alert(LANG['js.pjs.noArticle']);
		return;
	}
	$('#P-Ajax-Loading-Image-Main').show();
	$.ajax({
		url: gArticleAjaxSrv,
		dataType: 'json',
		data: {
			article_id: items,
			action: type + '_archive',
		},
		type: 'POST',
		success: function (pAjaxResult) {
			if (pAjaxResult.error) {
				alert(pAjaxResult.error);
				$('#P-Ajax-Loading-Image-Main').hide();
			}
			if (pAjaxResult.zip) {
				DownloadArchive(0, 3, pAjaxResult.zip);
				$('#P-Ajax-Loading-Image-Main').hide();
			}

		}
	});
}
function exportCitationsArchive(pArticles, pFormat){
	var lFormData = $('form[name="citations_popup_form"]').formSerialize();
	lFormData += '&action=citation_archive';

	$('#P-Ajax-Loading-Image-Main').show();
	$.ajax({
		url : gArticleAjaxSrv,
		data : lFormData,
		type : 'POST',
		success : function(pAjaxResult) {
			if(pAjaxResult.zip) {
				DownloadArchive(0, 3, pAjaxResult.zip);
				$('#P-Ajax-Loading-Image-Main').hide();
			}
		}
	});
}

function openCitationsPopup(){
	var items = getCheckedItems('itemCheckBox');
	if (items == null || items.length == 0) {
		alert(LANG['js.pjs.noArticle']);
		return;
	}

	$('#P-Ajax-Loading-Image-Main').show();

	$.ajax({
		url : gArticleAjaxSrv,
		dataType : 'json',
		data : {
			article_id: items,
			action : 'citation_form',
		},
		type : 'POST',
		success : function(pAjaxResult) {
			setExportCitationItems(items);
			$('#P-Sample-Popup-Content').modal({
				autoResize : true,
				position : ["10%"],
				minHeight : 200,
				maxHeight : 200,
				minWidth : 380,
				maxWidth : 380,
				overlayClose : true,
				close : true,
				onShow : function(dialog) {
					$('#P-Ajax-Loading-Image-Main').hide();
				}
			});
		}
	});
}

function selectAllItems(chkboxName) {
	var checkboxes = document.getElementsByName(chkboxName);
	for (var i=0; i<checkboxes.length; i++) {
		checkboxes[i].checked = 1;
	}
}

function deselectAllItems(chkboxName) {
	var checkboxes = document.getElementsByName(chkboxName);
	for (var i=0; i<checkboxes.length; i++) {
		checkboxes[i].checked = 0;
	}
}

function setExportCitationItems(items) {
	var queryItems = [];
	for (var i=0; i<items.length; i++) {
		queryItems.push(items[i]);
	}
	$('#article_id').val(queryItems.join(','));
}

function isFutureDate() {
	let pDate = $('input[name="pubdate"]').val();
	let now = new Date();
	let pubDate3 = pDate.split(' ');
	let pubDate2 = pubDate3[0].split('/');
	let pubDate = new Date(pubDate2[2] + '-' + pubDate2[1] + '-' + pubDate2[0] + ' ' + pubDate3[1]);
	if (pubDate < now || !(pubDate instanceof Date && !isNaN(pubDate))) {
		return false;
	}
	return true;
}

function checkPubDateAndSelect() {
	let el = $('input[name="scheduled[]"]');
	if (!isFutureDate() && el.is(':checked')) {
		alert(LANG['js.pjs.scheduleAutomaticFuture']);
		el.attr('checked', false);
	}
}

function ScheduleArticle(el, pArticleId){
	if(!confirm(LANG['js.pjs.ruSure'])) {
		$(el).prop('checked', !$(el).is(':checked'));
		return false;
	}
	$.ajax({
		url : gArticleAjaxSrv,
		dataType : 'json',
		data : {
			article_id: pArticleId,
			scheduled: $(el).is(':checked'),
			action : 'schedule_article',
		},
		type : 'POST',
		success : function(pAjaxResult) {
		}
	});
}

function CheckForUploadedFiles(pFilesSelector, pConfirmTxt, pDocumentId) {
	if(!$(pFilesSelector).length) {
		alert(LANG['js.pjs.uploadFiles']);
		return;
	}
	DocumentProceedToLE(pConfirmTxt, pDocumentId);
}

function DocumentTransformJatsXML(pDocumentId, pContentHolder) {
	SaveLEVersionContent(pDocumentId, 'transform_jats_xml', pContentHolder, 'xml', 1, 1);
}

function changeFileVisibility(el, pFileId){
	$.ajax({
		url: gFileListSrv,
		dataType: 'json',
		data: {
			file_id: pFileId,
			visibility: $(el).is(':checked'),
			action: 'change_file_visibility',
		},
		type: 'POST'
	});
}

function myDropdown() {
	document.getElementById("myDropdown").classList.toggle("show");
}

function InitDragSort(pFileType, pJsonData) {
	if (pFileType > 1) {
		$('#drag_and_sort_' + pFileType).sortable({
			axis: "y",
			items : '.files_list_row',
			update: function (event, ui) {
				var order = $(this).sortable("toArray");
				pJsonData.order = order;
				$.ajax({
					url: gFileListSrv,
					async: true,
					dataType: 'json',
					data: pJsonData
				});
			}
		});
	}
}

function updateMessagingState(pId, pEmail){
	if(confirm(LANG['js.pjs.ruSure'])){
		$.ajax({
			url: gDocumentAjaxSrv,
			dataType: 'json',
			data: {
				action: 'update_messaging_state',
				email_task_id: pId,
				email_to: pEmail,
			},
			async: false,
			type: 'POST',
			success : function(pAjaxResult) {
				if(pAjaxResult['err_cnt']){
					for (var i=0; i < pAjaxResult['err_cnt']; i++) {
						alert(pAjaxResult['err_msgs'][i]['err_msg']);
					}
				} else {
					location.reload();
				}
			},
		});
	}
}

function deleteIncompleteArticles(pJournalId){
	if(confirm(LANG['js.pjs.ruSure'])) {
        var items = getCheckedItems('itemCheckBox');
        if (items == null || items.length == 0) {
            alert('No article selected!');
            return;
        }
        $('#P-Ajax-Loading-Image-Main').show();
        $.ajax({
            url: gArticleAjaxSrv,
            dataType: 'json',
            data: {
                article_id: items,
                journal_id: pJournalId,
                action: 'delete_incomplete_articles',
            },
            type: 'POST',
            success: function (pAjaxResult) {
                if (pAjaxResult.success == 1) {
                    window.location.reload();
                }else{
                    alert('Error');
                }
            }
        });
    }
}

function browseUserCollectionDocuments(pCollectioId, pJournalId){
	// $('#P-Ajax-Loading-Image-Main').show();
	// e.preventDefault();
	$.ajax({
		url: gDocumentAjaxSrv,
		dataType: 'json',
		data: {
			collection_id: pCollectioId,
			journal_id: pJournalId,
			action: 'browse_user_collection_documents',
		},
		type: 'POST',
		success: function (pAjaxResult) {
			var lResult = pAjaxResult['html'];
			$("#subcollection_documents_"+pCollectioId).html(lResult);
			$("#subcollection_documents_"+pCollectioId+" .issue_title_identifier").css('border', 'none');
		}
	});
}
