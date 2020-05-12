$(function(){

	if($.cookie("editingNote")) {
		var noteID = jQuery.parseJSON($.cookie("editingNote").replace(/[\n\r]/g, '\\n')).noteID;
		$("button[id*='note-activate-button-']").each(function( index ) {
			if ( $(this).attr("data-commentid") === noteID ) {
				tooltip.ajaxURL = "/editor/comment/" + noteID + "/updatenotes";
				tooltip.notesTooltip($("#note-activate-button-" + noteID),'.note-tooltip', noteID, 462, 100);
		}
		});
	}

	$(".research-table-structure").on('click', "button[id*='note-activate-button-']", function(event) {
		event.preventDefault();
		if( $("#note-textarea").length > 0 ) {
			$("#note-textarea").parent().trigger("toolTip:close");
		}
		var id = $(this).attr('data-commentid');
		tooltip.ajaxURL = "/editor/comment/" + id + "/updatenotes";
		tooltip.notesTooltip($(this),'.note-tooltip', id, 462, 100);
	});
	$('.comment-status-changer-button').on('click', function(e){
		e.preventDefault();
		id = $(this).attr('id');
		isArticleRelated = $(this).attr('data-is-article-related');
		if(isArticleRelated == "false") {
			tooltip.commentSite($(this), '.asset-comment-status-tooltip', id, 58, -25);
		} else {
			tooltip.commentSite($(this), '.comment-status-tooltip', id, 58, -25);
		}
	});
	
	$('.commenter-role-checkbox').on('change', function(e){
		var id = $(this).attr('data-comment-id'),
            role = $(this).attr('role'),
            operation = $(this).is(":checked")?"add":"remove";
		commentModerator.changeCommenterRole(id, role, operation);
	});

	$('.comment-objection-checkbox').on('change', function(e) {
        var id = $(this).attr('data-cid'),
            theTop = $(this).offset().top,
            theLeft = $(this).offset().left - 94;
        if ($(this).is(":checked")) {
            $("#confirm-message-text").html("Are you sure you want to assign the objection icon?");
        } else {
            $("#confirm-message-text").html("Are you sure you want to remove the objection icon?");
        }
        $("#comment-objection-id").val(id);
        $("#confirm-background-mask").removeClass("is-hidden").show();
        $("#confirm-popup").css({ top: theTop, left: theLeft }).removeClass("is-hidden").show();
    });

    $("#popup-yes").on("click", function (e) {
        var id = $("#comment-objection-id").val(),
            value = $("#objection-cb-" + id).is(":checked") ? "true" : "false";
        commentModerator.changeCommentObjection(id, value);
        $("#confirm-background-mask").addClass("is-hidden").hide();
        $("#confirm-popup").addClass("is-hidden").hide();
        $("#comment-objection-id").val("");
    });

    $("#popup-no, #confirm-background-mask").on("click", function (e) {
        var id = $("#comment-objection-id").val();
        $("#objection-cb-" + id).prop("checked", false);
        commentModerator.changeCommentObjection(id, "false");
        $("#confirm-background-mask").addClass("is-hidden").hide();
        $("#confirm-popup").addClass("is-hidden").hide();
        $("#comment-objection-id").val("");
    });

	$('.comment-ex-dashboard-checkbox').on('change', function(e) {
 		var id = $(this).attr('data-cid'),
            isExcluded = $(this).is(":checked") ? true : false;
    	commentModerator.changeExcludeCommentFromDashboard(id, isExcluded);
    });

	$(".comment-management-select").on("change",function(event){
		var newCommentStatus = $(this).val(),
			newCommentStatusName = $(this).find("option:selected").text(),
			commentId = $(this).attr("data-commentid");
		if(newCommentStatus !== "") {
			$("#comment-status-" + commentId).html(newCommentStatusName);
			commentModerator.changeCommentStatus(commentId, newCommentStatus);
		}
	});
	
	// triggering filter on archive tab.
	$("#filterByEditor, #filterByStatus, #filterByOrigin, #websiteSelector").change(function(){
		$("#search-and-filter-form").submit();
	});

    $(".comment-management-section-select").on("change", function(e) {
        var commentId = $(this).attr("dataId"),
            sectionDataId = $(this).val(),
            sectionType = $(this).find("option:selected").attr("dataType");
        commentModerator.changeCommentSection(commentId, sectionDataId, sectionType);
    });

    $("#article-all-comments-wrapper ul").sortable({
        revert: true,
        items: "> li:not(.not-sortable)",
        opacity: 0.5,
        placeholder: "row-move-highlight",
        cursor: "move",
        connectWith: ".all-comment-wrapper",
        stop: function(event, ui) {
            var $listItem = ui.item,
                $targetListWrapper = $listItem.closest("ul"),
                $originalListWrapper = $(event.target),
                commentID = $listItem.attr("data-commentID"),
                targetID = $targetListWrapper.attr("data-reportID"),
                originalID = $originalListWrapper.attr("data-reportID"),
                commentType = "ARTICLE_COMMENT";
            if (targetID === originalID) {
                // item was dropped in the same section
                return false;
            } else if (targetID !== "NONE") {
                commentType = "REPORT_COMMENT";
            } else {
                targetID = $targetListWrapper.attr("data-versionID");
            }
            commentModerator.changeCommentSection(commentID, targetID, commentType);
        }
    });

   $(".hide-edit-comment").on("click", function (e) {
        $("#comment-editor-wrapper").fadeOut(200, function () {
            $(".post-edit-comment-button").removeAttr("data-commentID");
            researchTextEditors.removeEditor("edit-a-comment");
        });
    });
    $(".post-edit-comment-button").on("click", function (e) {
            var commentID = $(this).attr("data-commentID"),
                commentText = "",
                competingInterests = $("#competing-interests-edit").val(),
                postingErrorMessage = "";
            CKEDITOR.instances["edit-a-comment"].updateElement();
            commentText = $("#edit-a-comment").val();
            $(".post-edit-comment-button").removeAttr("data-commentID");
            $.ajax({
                url: "/editor/comment/" + commentID + "/updateText",
                type: "POST",
                data: {
                    comment: commentText,
                    competingInterests: competingInterests
                },
                success: function(data) {
                    if (data === "success") {
                        location.reload(true);
                    } else if (data === "missing-comment") {
                        formMessenger.showError($(".editor-ucf"), "Please add a comment.");
                    } else {
                        formMessenger.showError($(".editor-ucf"), "An unknown error has occurred. Please try again.");
                    }
                },
                error: function(request, errorType, errorMessage) {
                    postingErrorMessage = "I'm sorry but an error occurred when posting your comment. Please try again. " +
                                          "<p>Error Type: " + errorType + ". Message: " + errorMessage + "</p>";
                    formMessenger.showError($(".editor-comment-post-error"), postingErrorMessage);
                }
            });
        });
    $(".research-table-structure").on('click', "button[id*='edit-activate-button-']", function(event) {
        	event.preventDefault();
            leftElementPosition = parseInt($(this).offset().left, 10) - 500,
            topElementPosition = parseInt($(this).offset().top, 10) - 200,
    		commentID = $(this).attr('data-commentid');
            commentText =$(this).parent().find('.js-comment-text').html();
            console.log('COMMENT TEXT', commentText);
    		competingText = $(this).attr('date-commentCompetingInterests');
    		editCommentField = $("#edit-a-comment"),
            competingField = $("#competing-interests-edit");
            editCommentField.val(commentText);
            competingField.text(competingText);
            researchTextEditors.createFormEditor({
                "id": "edit-a-comment",
                "width": "600px",
                "height": 128,
                "extraPlugins": "confighelper,specialchar,autogrow",
                "removePlugins": "sourcearea,elementspath,magicline,contextmenu,liststyle,tabletools",
                "autoGrow_minHeight": 128,
                "autoGrow_maxHeight": 2000,
                "toolbar": "AssetCommentToolbar",
                "toolbarAlign": "center"
            });
                    $("#comment-editor-wrapper").css({ "z-index": 10000, "position": "absolute", "left": leftElementPosition + "px", "top": topElementPosition + "px" });
                    $(".post-edit-comment-button").attr("data-commentID", commentID);
                    $("#comment-editor-wrapper").fadeIn(200);

    	});


});

var commentModerator = {
	commentAjax: new R.Ajax(),
	getRequestURL: function(commentId){
        return "/editor/comment/" + commentId;
	},
    changeCommentSection: function(commentId, sectionDataId, sectionType) {
        var ajax = commentModerator.commentAjax;
        ajax.settings.url = "/editor/comment/" + commentId +"/updatesection";
        ajax.onSuccess = function(response) {
            if (response === true) {
                clearFilters();
            } else {
               messenger.addWarning("An error has occurred. Please try again.");
            }
        };
        ajax.onError = function() {
            messenger.addWarning("An error has occurred. Please try again.");
        };
        ajax.submit({
            dataId: sectionDataId,
            sectionType: sectionType
        });
    },
	changeCommentStatus : function(commentId, commentStatus) {
		var elemId = ".commentStatusError";
		commentModerator.hideVersionError(elemId);
		var tickerId = ".commentStatusTicker";
		ticker.show(tickerId);
		var ajax = commentModerator.commentAjax;
		
		ajax.settings.url = commentModerator.getRequestURL(commentId) + "/changestatus";
		ajax.onSuccess = function(response){
			if (response === true) {
				$('.data-status-tooltip').hide();
				clearFilters();
			}
			else {
				commentModerator.showVersionError(elemId, "An error has occurred. Please try again.");
			}
			ticker.hide(tickerId);
		};
		//No call abck needed but an empty function will overwrite any behaviour added elsewhere.
		ajax.onError = function(){
			ticker.hide(tickerId);
			commentModerator.showVersionError(elemId, textStatus + " : " + errorThrown);
			console.log("ajax error: " + JSON.stringify(XMLHttpRequest) + ", " + textStatus + ", " + errorThrown);
			if (textStatus == "timeout") {
				return false;
			}
		};
		ajax.submit({ newStatus : commentStatus });
		
	},
	showVersionError : function(elemId, message) {
		$(elemId).show().text(message);
	},
	hideVersionError : function(elemId) {
		$(elemId).hide().text('');
	},
	changeNotesButton: function(commentId) {
		$("#note-activate-button-" + commentId).text("READ");
	},
	changeCommenterRole: function(commentId, role, operation) {
		var ajax = commentModerator.commentAjax;
		ajax.settings.url = commentModerator.getRequestURL(commentId) + "/commenterrole/";
		if (operation === "add") {
			ajax.settings.url += "add";
		} else {
			ajax.settings.url += "remove";
		}
		
		ajax.onSuccess = function(response){
			if (response === true) {
				clearFilters();
			}
			else {
				commentModerator.showVersionError(elemId, "An error has occurred. Please try again.");
			}
			ticker.hide(".commentStatusTicker");
		};
		ajax.onError = function(){
			ticker.hide(".commentStatusTicker");
			commentModerator.showVersionError(elemId, textStatus + " : " + errorThrown);
			console.log("ajax error: " + JSON.stringify(XMLHttpRequest) + ", " + textStatus + ", " + errorThrown);
			if (textStatus == "timeout") {
				return false;
			}
		};
		ajax.submit({ role : role });
	},
    changeCommentObjection: function(commentId, value) {
        var ajax = commentModerator.commentAjax;

        ajax.settings.url = commentModerator.getRequestURL(commentId) + "/objection";

        ajax.onSuccess = function(response){
            if (response === true) {
                clearFilters();
            }
            else {
                commentModerator.showVersionError(elemId, "An error has occurred. Please try again.");
            }
            ticker.hide(tickerId);
        };
        ajax.onError = function(){
            ticker.hide(tickerId);
            commentModerator.showVersionError(elemId, textStatus + " : " + errorThrown);
            console.log("ajax error: " + JSON.stringify(XMLHttpRequest) + ", " + textStatus + ", " + errorThrown);
            if (textStatus == "timeout") {
                return false;
            }
        };
        ajax.submit({ value : value });
    },

    changeExcludeCommentFromDashboard: function(commentId, value) {
		var ajax = commentModerator.commentAjax;

		ajax.settings.url = commentModerator.getRequestURL(commentId) + "/excludeFromDashboard";

		ajax.onSuccess = function(response){
			if (response === true) {
				clearFilters();
			}
			else {
				commentModerator.showVersionError(elemId, "An error has occurred. Please try again.");
			}
		};
		ajax.onError = function(){
			commentModerator.showVersionError(elemId, textStatus + " : " + errorThrown);
			console.log("ajax error: " + JSON.stringify(XMLHttpRequest) + ", " + textStatus + ", " + errorThrown);
			if (textStatus == "timeout") {
				return false;
			}
		};
		ajax.submit({ value : value });
	}

	
};

function clearFilters() {
	window.location = window.location.href;
}

//Init the table filter
function initFilter() {

}