$(document).ready(function(){
/*
    var f1rCrossMarkURL = "https://crossmark.crossref.org/javascripts/v1.5/crossmark.min.js",
        $f1rcmjb = jQuery;
    $.ajax({
        url: f1rCrossMarkURL,
        dataType: "script",
        complete: function() {
            jQuery = $f1rcmjb;
            $ = $f1rcmjb;
        }
    });
*/
    $(".flashContent").each(function() {
        if ($.flash.available && $.flash.version.major > 10){
            var flashContentId = $(this).attr("id");
            // New datasets defined in the backend
            if (flashContentId.indexOf("DS") === 0){
                var datasetInfo = $("#datasets-info #dataset-" + flashContentId);
                if (datasetInfo.size() > 0) {
                    if (datasetInfo.attr("plottable") == "true") {
                        var title = datasetInfo.find(".title").html();
                        var plottableColumns = datasetInfo.find(".plottable-columns").html();
                        var description = datasetInfo.find(".description").html();
                        var selectableForX = datasetInfo.find(".selectable-for-x").html();
                        var selectedX = datasetInfo.find(".selected-x").html();
                        var fileUri = datasetInfo.find(".file-url").html();

                        $(this).parent().removeClass("is-hidden");

                        addFlashObject(flashContentId, fileUri.replace("https://", "http://"), 'plot-chart', title, plottableColumns, selectableForX,
                            selectedX, description);
                    } else {
                        $(this).parent().remove();
                    }
                }
            } else { //backwards compatibility: old plotter elements defined directly in the XML
                addFlashObject($(this).attr("id"), $(this).attr("file-uri"), $(this).attr("chart-type"), $(this).attr("chart-title"),
                    $(this).attr("plottable-columns"), $(this).attr("selectable-columns"), $(this).attr("selected-column"),
                    $(this).children(".description").html());
            }

        } else {
            var parent = $(this).parent();
            parent.empty();
            parent.html("<p>To view this content ensure that Adobe Flash Player version 11.1.0 or greater is installed.</p>" +
                              "<a href=\"https://www.adobe.com/go/getflashplayer\">" +
                              "<img src=\"https://www.adobe.com/images/shared/download_buttons/get_flash_player.gif\" alt=\"Get Adobe Flash player\" />" +
                              "</a>");
            parent.height(80);
        }
    });

    $(".dataset-thumbnail").each(function() {
        var $this = $(this);
        var $parent = $this.parent();
        var datasetId = $this.attr("thumbnail-id");
        // New datasets defined in the backend
        var thumbnailInfo = $("#datasets-info #dataset-thumbnail-" + datasetId);
        if (thumbnailInfo.size() > 0) {
            $this.html(thumbnailInfo.html());
            $this.removeClass("is-hidden");
        }
        $parent
            .addClass('fig')
            .append($('#dataset-doi-' + datasetId).html());
    });

    $("body").on("click", ".download-dataset-button", function() {
        var theTarget = $(this).attr("target");
        window.location = theTarget;
    });

    $("body").on("click", ".download-help-link", function(e) {
        e.preventDefault();
        var popupID = $(this).attr("data-popup-id");
        UI.modalWindow("#" + popupID, null, null);
    });

    $('#corresponding-author-icon').click(function() {
        $('#corresponding-author-window').toggleClass("is-hidden");
    });

    // Article Interaction Box Handlers
    $("#article-interaction-control-tab").on("mouseenter", function() {
        $(this).css({ cursor: "pointer" });
    }).on("mouseleave", function() {
        $(this).css({ cursor: "default" });
    });
    $("#article-interaction-control-tab div").on("click", function() {
        $(this).parent().find("div").toggle();
        $("#main-article-interaction-box").slideToggle(400);
        $("#main-article-count-box, #main-article-interaction-box").toggleClass("has-control-tab");
    });

    // article citation
    $('.cite-article').click(function() {
        $("#cite-article-popup").toggleClass("is-hidden");
    });
    $('.cite-article-button').click(function() {
        var parents = $('.article-count-box');
        var thePopupRef = $(this).attr("data-windowref");
        $("#" + thePopupRef).toggleClass("is-hidden");

        parents.removeClass('show-modal');
        $(this).closest('.article-count-box').addClass('show-modal');
    });
    $(".cite-article-popup-link").on("click", function(e) {
        e.preventDefault();
    });
    $(".cite-popup-background, .close-cite-popup").on("click", function() {
        $(this).closest(".popup-window-wrapper").addClass("is-hidden");
    });
    $("#article-close-icon").click(function() {
        $("#cite-article-popup").addClass("is-hidden");
    });

    // reports citation
    $('.cite-report').on("click", function() {
        $(this).closest(".cite-article-popup-wrapper").find(".popup-window-wrapper").fadeIn(200);
    });
    $(".close-cite-report-window, .cite-report-popup-background").on("click", function() {
        $(this).closest(".popup-window-wrapper").fadeOut(200);
    });

    $(".cite-dataset").on("click", function() {
        var $wrapper = $(this).closest(".dataset-file");
        $wrapper.find(".popup-window-wrapper").toggleClass("is-hidden");
    });
    $(".close-cite-dataset-window").on("click", function() {
        var $wrapper = $(this).closest(".popup-window-wrapper").addClass("is-hidden");
    });

    // Export Citation
    $("#export-citation").on("click", function (e) {
        e.preventDefault();
        UI.modalWindow("#export-citation-popup", null, null);
    });

    $("#export-citation-submit").on("click", function () {
        var checkedItem = $("input[name='export-citation-option']:radio:checked"),
            errorMessage = $("#export-citation-popup").find(".default-error"),
            versionID = $("#article-metadata input[name='versionId']").val(),
            exportURL = "/articles/exportTo?versionId=" + versionID + "&bibliographyReaderFormat=";
        if (checkedItem.size() < 1) {
            errorMessage.fadeIn(200);
            setTimeout(function() { errorMessage.fadeOut(500); }, 3000);
        } else if(checkedItem.val() == "WORKSPACE") {
            window.open($("#workspace-export-url").val());
            $("#export-citation-popup").find(".modal-window-close-button").click();
        } else {
            exportURL += checkedItem.val();
            window.location = exportURL;
            $("#export-citation-popup").find(".modal-window-close-button").click();
        }
    });

/*
//  NO LONGER USED AS THE REPORTS ARE OPEN BY DEFAULT NOW
    $(".article-reports-show").on("click", function(e) {
        e.preventDefault();
        var $linkContainer = $(this).parents(".article-reports-controller"),
            $reportContainer = $linkContainer.next(".article-reports-content"),
            reportID = $(this).attr("data-reportID");
        $linkContainer.addClass("is-hidden");
        $reportContainer.slideDown(400);
        $.ajax({
            url: "/articles/rcj/" + reportID,
            type: "GET",
            success: function(data) {
            },
            error: function() {
                //messenger.addWarning("There was an error when updating the summary details.");
            },
        });
    });
    $(".article-reports-hide").on("click", function(e) {
        e.preventDefault();
        var $reportContainer = $(this).parents(".article-reports-content"),
            $linkContainer = $reportContainer.prev(".article-reports-controller");
        $linkContainer.removeClass("is-hidden");
        $reportContainer.slideUp(400);
    });
*/
    $(".increment-view-count").on("click", function(e) {
        e.preventDefault();
        var reportID = $(this).attr("data-reportID") || "";
        if (reportID) {
            $.ajax({
                url: "/articles/rcj/" + reportID,
                type: "GET",
                error: function() {
                    console.log("ERROR UPDATING REPORT COUNTS FOR REPORT " + reportID);
                }
            });
        }
    });
    $(".report-response-show").on("click", function(e) {
        e.preventDefault();
        var $linkContainer = $(this).parents(".report-response-controller"),
            $reportContainer = $linkContainer.next(".report-response-content"),
            reportID = $(this).attr("data-reportID");
        $linkContainer.addClass("is-hidden");
        $reportContainer.slideDown(400);
    });
    $(".report-response-hide").on("click", function(e) {
        e.preventDefault();
        var $reportContainer = $(this).parents(".report-response-content"),
            $linkContainer = $reportContainer.prev(".report-response-controller");
        $linkContainer.removeClass("is-hidden");
        $reportContainer.slideUp(400);
    });

    var refererUrl = $("#referer").val();
    if (refererUrl) {
        var localHost = window.location.host;
        var url = $.url(refererUrl);
        /** Avoid doing it when the referer is external (Google) **/
        if (url.attr('host') == localHost) {
            var query = url.param('q');
            var advancedSearch = $.url(refererUrl).param('queryField');
            if (query && _.isUndefined(advancedSearch)) {
                var hilitor = new Hilitor("highlight-area");
                query = query.replace(/(AND|OR)/g,"");
                var subqueries = query.split(/\s+/g);
                var quoteWord = "";
                for (var i = 0; i < subqueries.length; i++) {
                    var q = subqueries[i];
                    q = q.replace(/^\s+|\s+$/g,'');
                    if (quoteWord === ""){
                        // TP: Hiliator really doesn't like dashes
                        if (q.indexOf('"') === 0 || q === "-"){
                            quoteWord += q;
                        } else {
                            hilitor.applyAdditional(q);
                        }
                    } else {
                        quoteWord += " " + q;
                        if ((quoteWord.lastIndexOf('"') == quoteWord.length - 1)){
                            hilitor.applyAdditional(quoteWord);
                            quoteWord = "";
                        }
                    }
                }
                if (quoteWord !== ""){
                    hilitor.applyAdditional(quoteWord);
                }
            }
        }
    }

    if (typeof(addthis) != "undefined"){
        SharingHelper.init();
    }
    commentTruncation();
    refereeTruncation();

    articleHelper.bindHelpPopupHandlers();
    articleHelper.checkPopupsOnLoad();
    //articleHelper.updateRefereeReportCounts();


    if ($(".omero-wrapper").size() > 0) {
        omeroController.setMultipleOmeroImages();
        omeroController.interactiveOmeroPopup();
    }

    viewHelper.tablesThumbnails();
    //viewHelper.addCsvLink();
    viewHelper.figPopups();
    viewHelper.addPowerpointLink();
    if ($(".js-custom-figure").size() > 0) { viewHelper.framePopups(); }
    if ($(".r-button-wrapper").size() > 0) { viewHelper.interactiveContentPopup(); }
    if ($(".bb-living-figure").size() > 0) { viewHelper.livingFigurePopup(); }

    ArticleScrollingModule.init();

    articleComments.showAddNewComment();
    articleComments.showEditComment();
    articleComments.cancelComment();

    articleTooltips.show();

    emailArticleDetails.showHide();

    $(".add-comment-button").on("click", function(e) {
        e.preventDefault();
        var reportID = $(this).attr("reportId"),
            button = $(this);
        if (reportID) {
            articleHelper.sendComment(button, reportID);
        } else {
            articleHelper.sendComment(button);
        }
    });

    $("#download-xml, #toolbar-download-xml, #mobile-download-xml").click(downloadXml());

    $("#save-comment-button").bind("click", function(){
        var commentId = $(this).attr('commentId');
        articleHelper.saveComment(commentId);
    });

//    $(".register-report-comment-button").on("click", function(e){
//        e.preventDefault();
//        var theTarget = window.location.href + $(this).attr("href");
//        $("#sign-in-form .target-field").val(theTarget);
//    });

    $('.email-article-version-container').on('submit', '.recommend-version-form, .recommend-version-form-mobile', articleHelper.sendRecommendationEmail);

    if ($("#new-comment").size() > 0) {
        try {
            $(".f1000Expander #new-comment").ckeditor(function() {}, {
                enterMode : CKEDITOR.ENTER_BR,
                extraPlugins: "confighelper,specialchar,autogrow",
                toolbar: "StandardFormEditorToolbar",
                height: 160,
                width: "99%",
                removePlugins : 'sourcearea,elementspath,magicline,contextmenu,liststyle,tabletools',
                autoGrow_minHeight: 128,
                autoGrow_maxHeight: 2000
            });
        } catch (err) {
            console.log(err);
        }
    }

    // Initialize all comment tabs and hide all of them
    $(".f1000Expander").tabs({
        collapsible: true,
        active: -1
    });

    $(".ui-tabs-nav li").removeClass("ui-tabs-selected");
    $(".ui-tabs-panel").toggleClass("ui-tabs-hide");

    $('.conflicts-interests').on('click', function(e){
        e.preventDefault();
        UI.modalWindow("#conflicts-interests", '600px', null);
    });

    $(".help-link").on("click", function(e) {
        e.preventDefault();
        var $wrapper = $(this).closest(".reference-help-wrapper");
        $(this).find("span").toggleClass("is-hidden");
        $wrapper.find(".form-field").toggleClass("is-hidden");
    });

});


var rLauncher = {
    launch: function(params) {
        var versionId = $("meta[name='version-id']").attr("content"),
            $errorContainer = $(".interactive-control-error");
        $.ajax({
            url: "/ajax/r/run/" + versionId,
            type: "GET",
            traditional: true,
            data: { params: params },
            success: function(data) {
                $('.rscript_image').html('<img style="width: 100%;" src="data:image/png;base64,' + data + '" download="my-image.png" />');
                // Now set max width/height for the image to prevent any overflow
                $(".rscript_image > img").css({ "width": "", "max-height": $("#interactive-content-popup").height() - ($(".interactive-content-popup-header").height() + 60) + "px", "max-width": $("#interactive-content-popup").width() - ($(".interactive-content-controls-wrapper").width() + 60) + "px"});
                $(".interactive-content-display").css({ "width": $("#interactive-content-popup").width() - ($(".interactive-content-controls-wrapper").width() + 60) + "px", "text-align": "center"});
            },
            error: function(request, errorType, errorMessage) {
                var theErrorMessage = '<div class="title">ERROR</div>' +
                                      'I&rsquo;m sorry but an error has occurred. Please try again. ' +
                                      'If the problem persists please contact us at ' +
                                      '<a href="mailto:research@f1000.com">research.com</a>.' +
                                      '<p>Error Type: ' + errorType + '<br>' +
                                      'Message: ' + errorMessage + '</p>';
                $errorContainer.html(theErrorMessage).show(500);
                $(".rscript_image").html("");
                setTimeout(function() {
                    $errorContainer.hide(500);
                }, 10000);
            }
        });
    }
};

var viewHelper = {
    addPowerpointLink: function() {
        var imageCaptions = $('.fig a:not([href^="#"])');
        imageCaptions.each(function() {
            var theImage = $(this),
                captionHtmlFull = theImage.next('.caption').html(),
                hideButton = theImage.closest(".fig.panel").attr("frame-src") ? true : false;
            if (hideButton) { return; }
            if (captionHtmlFull) {
                var fName  = theImage.parents('.fig.panel').find('a[name]').attr('name');
                if (fName === undefined) {
                    fName = theImage.parents('.fig.panel').prev('a[name]').attr('name');
                }
                var hPath  = window.location.href.split('#')[0];
                var fPath  = hPath + "/" + fName + "/pptx";
                var ppLink =    "<div class='generated-resource-link-wrapper'>" +
                                    "<a href='" + fPath + "' target='_blank' class='download-powerpoint general-white-orange-button with-hover float-right'>" +
                                        "<span class='f1r-article-desk'>" +
                                        "<span class='f1r-icon icon-76_download_file'></span>" +
                                        "<span class=''>Download as a PowerPoint slide</span>" +
                                        "</span>" +
                                        "<span class='f1r-article-mobile research-layout'>" +
                                        "<span class='f1r-icon icon-76_download_file white vmiddle'></span>" +
                                        "Download as a PowerPoint slide" +
                                        "</span>" +
                                    "</a>" +
                                "</div>";
                theImage.next('.caption').append(ppLink);
            }
        });
    },
    addCsvLink: function() {
        var tableCaptions = $('.table-wrap a:not([href^="#"])');
        tableCaptions.each(function() {
            var theTable = $(this),
                captionHtmlFull = theTable.next('.caption').html();
            if (captionHtmlFull) {
                var fName  = theTable.parents('.table-wrap.panel').find('a[name]').attr('name');
                var fPath  = window.location + "/" + fName + "/csv";
                var csvLink =   "<div class='generated-resource-link-wrapper'>" +
                                "<a href='" + fPath + "' target='_blank'>" +
                                "Download as a CSV" +
                                "</a>" +
                                "</div>";
                theTable.next('.caption').append(csvLink);
            }
        });
    },
    framePopups: function () {
        'use strict';
        var panelWrapper = "",
            theImg = "",
            theImgHeight = "",
            link = "",
            caption = "",
            captionText = "",
            framesrc = "",
            mIcon = "<span class='_mdl-layout f1r-article-desk'><button title=\"Open the interactive figure in a popup window.\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--icon mini-icon custom-image-icon\"><i class=\"material-icons\">open_in_new</i></button></span>",
            ribbon = "<div class=\"f1r-article-desk interactive-content-ribbon js-custom-image-open\"><div class=\"interactive-content-label article-custom-image\">Interactive figure</div><div class=\"interactive-content-button\"></div>",
            staticLink = "<div class=\"f1r-article-desk-inline open-static-interactive-image\"><a href=\"#\" class=\"js-open-static-image\">View static version of this image</a></div>",
            mobileNote = "<div class='f1r-article-mobile mobile-interactive-note'>" +
                "View on desktop for interactive features" +
                "<img src='/img/icon/interactive_content.png' class='float-right margin-right-40'>" +
                "</div>";
        $(".js-custom-figure").each(function (idx, el) {
            panelWrapper = $(el);
            theImg = panelWrapper.find("img");
            link = theImg.closest("a");
            caption = panelWrapper.find(".caption");
            captionText = caption.html();
            framesrc = panelWrapper.attr("frame-src");
            panelWrapper.addClass("article-custom-figure-container");
            theImg.attr({ title: "Open the interactive figure in a popup window." }).css("margin-bottom", "40px");
            link.attr({ "data-framesrc": framesrc });
            link.append(mIcon);
            //caption.append(ribbon);
            caption.before(staticLink);
            caption.after(ribbon);
            panelWrapper.append(mobileNote);
        });
        $(".open-static-interactive-image").each(function (idx, el) {
            panelWrapper = $(this).closest(".fig.panel.js-custom-figure");
            theImgHeight = panelWrapper.find("img").height() + 25;
            $(el).css({ top: theImgHeight + "px" });
        });

        $(".fig.js-custom-figure a, .js-custom-image-open").on("click", function (e) {
            e.preventDefault();
            var html = "",
                elHTML = "",
                figContainer = $(this).closest(".fig.panel"),
                captionText = figContainer.find(".caption").html(),
                theTitle = figContainer.find(".interactive-content-title").html(),
                theMobileNote = figContainer.find(".mobile-interactive-note").clone(true).wrap("<p/>").parent().html(),
                captionTextFull = captionText + theMobileNote,
                frameSrc = $(this).attr("data-framesrc") || figContainer.attr("frame-src"),
                isMobileDevice = figContainer.find(".f1r-article-mobile.mobile-interactive-note").is(":visible") ? true : false;
            if (isMobileDevice) {
                mobileImageDisplay(figContainer.find("img").attr("src"), captionTextFull);
                return false;
            }
            if ($(this).hasClass("js-open-static-image")) {
                elHTML = "<img src='" + figContainer.find("img").attr("src") + "' style='max-height: 100%; max-width: 100%;' />";
            } else {
                elHTML = '<iframe src="' + frameSrc + '" width="100%" height="100%" frameborder="0"></iframe>';
            }
            html = '<div class="modal-window-wrapper is-hidden">' +
                    '<div id="fig-panel-popup" class="modal-window padding-20" style="width: 90%; height: 80%; overflow: auto;">' +
                        '<div class="original-popup-image-container" style="height: 94%;">' +
                            '<div class="fig-image-popup" style="height: 85%;">' +
                                '<div id="frame-is-loading" style="background-color: #ccc; width: 90%; height: 68%; position: absolute; z-index: 100; padding: 40px; font-size: 20px; color: black;">Loading data . . . please wait.</div>' +
                                elHTML +
                            '</div>' +
                            '<div class="fig-image-caption" style="max-height: 15%; overflow-y: auto;">' + captionText + '</div>' +
                        '</div>' +
                        '<div class="modal-popup-close-button">' +
                            '<button class="general-white-orange-button close-modal-button with-hover u-mt--1">Close</button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            if ($("#fig-panel-popup").size()) { $("#fig-panel-popup").parents(".modal-window-wrapper").remove(); }
            $('body').append(html);

            UI.modalWindow("#fig-panel-popup", '90%', '80%', function() {
                $("body").css({"overflow" : "hidden"});
                $(window).trigger('resize');
                bindRemoveModalWindow();
                $("#frame-is-loading").animate({ opacity: 0 }, 2000, function () {
                    $("#frame-is-loading").remove();
                });
            });

        });
    },
    figPopups: function(){
        var failSafeCounter = 0;
        $('.fig a:not([href^="#"]), .interactive-living-figure-ribbon').on('click', function(e) {
            e.preventDefault();
            if ($(this).closest(".fig").hasClass("js-custom-figure")) { return false; }
            if ($(this).hasClass("link-for-dataset")) {
                window.location = $(this).attr("href");
                return false;
            }
            if (!$(this).hasClass("interactive-living-figure-ribbon")) {
                if ($(this).find("img").size() === 0) {
                    window.open($(this).attr("href"), "_blank");
                    return false;
                }
            }
            var figureThumbnail = $(this).hasClass("interactive-living-figure-ribbon") ? $(this).closest(".r-script-bb-living-figure.panel").find("img[reqd-popup-image]").parent() : $(this),
                html = "",
                imgSrc = figureThumbnail.find('img').attr('src'),
                captionText = figureThumbnail.next('.caption').text(),
                captionHtmlToModify = figureThumbnail.next('.caption').html(),
                captionHtmlFull = figureThumbnail.next('.caption').html(),
                isOmero = $(this).hasClass("link-for-omero-image") ? true : false,
                $omeroLink = $(this).closest("a"),
                imageCount = 0,
                interactionIconTemplateForOmero = "",
                interactionIconForImage = "",
                classForMultiImage = "",
                isLivingFigure = false,
                livingFigureDataInfo = "",
                livingFigureDates = "",
                livingFigureDatesMenu = "",
                livingFigurePopupClass = "",
                closeButtonPosition = "",
                ppButtonOverride = "",
                popupWindowHeight = "80%";
            if ($(this).find(".article-page-mobile-image-icon").is(":visible")) {
                mobileImageDisplay($(this).find("img").attr("src"), captionHtmlFull);
                return false;
            }
            if (figureThumbnail.find("img").attr("reqd-popup-image")) { isLivingFigure = true; }
            if (isLivingFigure) {
                livingFigureDates = $("<div class='living-figure-dates'></div>");
                livingFigureDates.append("<h4>Select date to see other versions</h4>");
                livingFigureDatesMenu = $(".living-figure-dates-menu").clone().css({ "display": "block" });
                livingFigureDates.append(livingFigureDatesMenu);
                livingFigureDates.append($(".submit-new-figure").closest("a").clone().removeClass("is-hidden"));
                livingFigureDataInfo = $("#living-figure-datasets-info").html();
                imgSrc = figureThumbnail.find("img").attr("reqd-popup-image");
                closeButtonPosition = "float-right";
                ppButtonOverride = " is-hidden";
                livingFigurePopupClass = "living-figure-panel-popup";
                popupWindowHeight = "90%";
            }
            var htmlTruncator = new HtmlTruncator();
            if (captionText.length > 1000) {
                captionHtmlToModify = htmlTruncator.truncate(captionHtmlToModify, 1000) + "...";
            }

            if (isOmero) {
                imageCount = isNaN(parseInt($(this).closest("a").attr("data-omero-images"),10)) ? 1 : parseInt($(this).closest("a").attr("data-omero-images"),10);
                interactionIconTemplateForOmero = omeroController.getInteractionButtonTemplate($(this), imageCount);
            }

            if (imageCount <= 1) {
                // ONE IMAGE AVAILABLE
                html = '<div class="modal-window-wrapper is-hidden">' +
                        '<div id="fig-panel-popup" class="modal-window padding-20 ' + livingFigurePopupClass + '">' +
                            '<div class="reduced-popup-image-container">' +
                                '<div class="fig-image-popup"><img src="' + imgSrc +'" alt="Click to expand" title="Click to expand" class="simple-hover-tooltip">' +
                                interactionIconTemplateForOmero + '</div>' +
                                '<div class="fig-image-caption">' + captionHtmlToModify + '</div>' +
                            '</div>' +
                            '<div class="original-popup-image-container is-hidden">' +
                                '<div class="fig-image-popup"><img src="' + imgSrc +'" alt="Click to smaller version" title="Click for smaller version" class="simple-hover-tooltip">' +
                                interactionIconTemplateForOmero + '</div>' +
                                '<div class="fig-image-caption">' + captionHtmlFull + '</div>' +
                            '</div>' +
                            livingFigureDataInfo +
                            '<div class="modal-popup-close-button">' +
                                '<button class="general-white-orange-button close-modal-button with-hover ' + closeButtonPosition + '">Close</button>' +
                                '<a href="#" class="generated-resource-link-button' + ppButtonOverride + '">' +
                                    '<button class="general-white-orange-button with-hover float-right"><span class="f1r-icon icon-76_download_file"></span><span class="download-item">Download as a PowerPoint Slide</span></button>' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            } else {
                // TWO OR MORE IMAGES AVAILABLE
                html = '<div class="modal-window-wrapper is-hidden">' +
                       '<div id="fig-panel-popup" class="modal-window padding-20">' +
                       '<div class="reduced-popup-image-container"><div class="fig-image-popup">';
                for (var i = 1; i <= imageCount; i++) {
                    classForMultiImage = i > 1 ? "is-hidden no-expand" : "no-expand";
                    interactionIconForImage = interactionIconTemplateForOmero.replace("XXXDATAFRAMEXXX", $omeroLink.attr("data-omero-frame" + i));
                    interactionIconForImage = interactionIconForImage.replace("X0X", i);
                    interactionIconForImage = interactionIconForImage.replace("visible-omero-image", classForMultiImage);
                    if ($omeroLink.attr("data-omero-frame" + i) === "") {
                        interactionIconForImage = "<span style='display:none;'>" + interactionIconForImage + "</span>";
                    }
                    html += '<img src="' + $omeroLink.attr("data-omero-image" + i) + '" alt="Click to expand" ' +
                                'id="reduced-image-' + i + '" ' +
                                'data-imageNo="' + i +'" ' +
                                'data-frame="' + $omeroLink.attr("data-omero-frame" + i) +'" ' +
                                'title="Click to expand" class="simple-hover-tooltip ' + classForMultiImage + '">' +
                            interactionIconForImage;
                }
                html += '</div>' +
                        '<div class="fig-image-caption">' + captionHtmlToModify + '</div>' +
                        '</div>' +
                        '<div class="original-popup-image-container is-hidden">' +
                        '<div class="fig-image-popup">';
                for (var z = 1; z <= imageCount; z++) {
                    classForMultiImage = z > 1 ? "is-hidden" : "";
                    interactionIconForImage = interactionIconTemplateForOmero.replace("XXXDATAFRAMEXXX", $omeroLink.attr("data-omero-frame" + z));
                    interactionIconForImage = interactionIconForImage.replace("X0X", z);
                    interactionIconForImage = interactionIconForImage.replace("visible-omero-image", classForMultiImage);
                    html += '<img src="' + $omeroLink.attr("data-omero-image" + z) + '" alt="Click to smaller version" ' +
                                'id="original-image-' + i + '" ' +
                                'data-imageNo="' + i +'" ' +
                                'data-frame="' + $omeroLink.attr("data-omero-frame" + z) +'" ' +
                                'title="Click for smaller version" class="simple-hover-tooltip ' + classForMultiImage + '">' +
                            interactionIconForImage;
                }
                html+= '</div>' +
                       '<div class="fig-image-caption">' + captionHtmlFull + '</div>' +
                       '</div>' +
                       '<div class="modal-popup-close-button">' +
                       '<button class="general-white-orange-button close-modal-button with-hover">Close</button>' +
                       '<a href="#" class="generated-resource-link-button">' +
                       '<button class="general-white-orange-button with-hover float-right"><span class="download-item">Download as a PowerPoint Slide</span></button>' +
                       '</a>' +
                       '</div>' +
                       '</div>' +
                       '</div>';
            }
            if (imageCount > 1) { html += omeroController.getButtonPrevious() + omeroController.getButtonNext(); }
            $('body').append(html);
            if (livingFigureDates !== "") {
                $("#fig-panel-popup").prepend(livingFigureDates);
            }
            //$("#fig-panel-popup").append();

            $('.fig-image-caption').find('.generated-resource-link-wrapper').each(function () {
                $(this).addClass('is-hidden');
                var requiredPath = $(this).find('a').attr('href');
                $('.modal-popup-close-button').find('.generated-resource-link-button').each(function() {
                    $(this).attr("href", requiredPath);
                });
            });

            UI.modalWindow("#fig-panel-popup", '90%', popupWindowHeight, resizeImageHelper);

            function resizeImageHelper() {
                var originalCaption = $('.reduced-popup-image-container .fig-image-caption'),
                    originalCaptionHeight = originalCaption.height(),

                    originalImageHeight = $('.reduced-popup-image-container .fig-image-popup').height(),
                    modalContainerHeight = $('#fig-panel-popup').height(),

                    optimizedImage = $('.reduced-popup-image-container .fig-image-popup img'),
                    originalModalImageWidth = optimizedImage.width(),

                    livingFigureDetail = $("#fig-panel-popup .living-figure-list-container"),
                    livingFigureDetailHeight = livingFigureDetail.size() > 0 ? livingFigureDetail.height() + 20 : 0,

                    newModalContainerSize = originalImageHeight + originalCaptionHeight + 20,
                    optimizedImageHeight = modalContainerHeight - originalCaptionHeight - 60;

                    if (typeof livingFigureDetailHeight === "number") { optimizedImageHeight -= livingFigureDetailHeight; }

                //A failsafe to fix a bug in Chrome where after 20 - 30 minutes the image appears to have 0 size.
                if((originalModalImageWidth < 50 || optimizedImageHeight < 50) && failSafeCounter <= 20 ){
                    $("#fig-panel-popup").parents(".modal-window-wrapper").remove();
                    $("#research-overlay").remove();
                    setTimeout(function(){
                        failSafeCounter++;
                        figureThumbnail.click();
                    }, 50);
                    return;
                } else {
                    failSafeCounter = 0;
                }

                $("body").css({"overflow" : "hidden"});

                if(newModalContainerSize > modalContainerHeight) {
                    optimizedImage.height(optimizedImageHeight);
                    var captionHeightDifference = originalCaption.height() - originalCaptionHeight,
                        imageHeightAfterCaptionResize = optimizedImageHeight - captionHeightDifference,
                        imageWidthAfterCaptionResize = optimizedImage.width();

                    optimizedImage.height(imageHeightAfterCaptionResize);

                    if (optimizedImage.hasClass("no-expand")) {
                        optimizedImage.removeAttr("alt").removeAttr("title").addClass("suppress-tooltip");
                    } else {
                        optimizedImage.css('cursor', 'pointer');
                        if(originalImageHeight > optimizedImage.height()){
                            swapImagesHelper();
                        } else {
                            optimizedImage.removeAttr("alt").removeAttr("title").addClass("suppress-tooltip");
                        }
                    }

                } else {

                    var originalHeightDifference = originalCaption.height() - originalCaptionHeight;
                    optimizedImage.height(optimizedImage.height() - originalHeightDifference - 40);

                    optimizedImage.removeAttr("alt").removeAttr("title").addClass("suppress-tooltip");
                }
                $(window).trigger('resize');
                bindRemoveModalWindow();

                // Set the Omero handlers if required
                if (isOmero) { omeroController.bindOmeroHandlers(); }

            }

            function swapImagesHelper() {
                var originalImage = $('.reduced-popup-image-container img'),
                    newImage = $('.original-popup-image-container img');

                originalImage.on('click', function(e){
                    e.preventDefault();

                    $('.reduced-popup-image-container, .living-figure-dates').addClass('is-hidden');
                    $('.original-popup-image-container').removeClass('is-hidden');

                    $('#fig-panel-popup').css({
                        width: $('.original-popup-image-container img').width() + 40,
                        'overflow' : 'auto'
                    });

                    $('.modal-popup-close-button').css('margin-bottom', '20px');
                });

                newImage.on('click', function(e){
                    e.preventDefault();

                    $('.reduced-popup-image-container, .living-figure-dates').removeClass('is-hidden');
                    $('.original-popup-image-container').addClass('is-hidden');

                    $('#fig-panel-popup, .modal-popup-close-button').removeAttr('style');
                    if ($("#fig-panel-popup").hasClass("living-figure-panel-popup")) {
                        $('#fig-panel-popup').css({'max-width':'90%', 'max-height':'90%' });
                    } else {
                        $('#fig-panel-popup').css({'max-width':'90%', 'max-height':'80%' });
                    }

                });
            }

        });
    },
    tablesThumbnails: function() {
        // the scrolling bits inside the tables.
        //$('.modal-window-wrapper a[href^="#"]').live('click', function(){
        $("body").on("click", ".modal-window-wrapper a[href^='#']", function() {
            UI.closeModal();
            $('.modal-window-wrapper').remove();

            $("body").css({"overflow" : ""});

            var clickedLink = $(this).attr('href').split('#'),
                link = clickedLink[1];
            scrollToElement('a[name="'+ link +'"]', 1000, -50);
        });

        var tables = $('.generated-article-body table, .generated-article-footer table');

        // replacing all the tables with the small ones.
        tables.each(function() {
            var maxColumnNumber = 5,
                tablePanel = $(this).parent('div.table-wrap.panel'),
                tableClone = $(this).clone(),
                notes = $(this).parent().find('.table-wrap-foot');

            //temporary disable notes references
            $(this).find('a[href^="#note-"]').each(function(){
                $(this).replaceWith($(this).text());
            });

            //hide notes and original table.
            $(this).hide().addClass('article-table');
            notes.hide();

            var thumbnailTable = '<div class="thumbnail-table" title="Click here to expand the table">' +
                                 '<table>' +
                                 beautifyTable(tableClone, maxColumnNumber) +
                                 '</table>' +
                                 //'<a href="javascript:void(0);">Expand Table</a>' +
                                 //'<div class="divlink">Expand Table</div>' +
                                 '</div>';

            tablePanel.prepend(thumbnailTable);
        });

        function beautifyTable(clonedTable, maxColumnNumber) {
            // keep first header and three body rows (four body rows if no header)
            clonedTable.find("thead tr:gt(0)").remove();
            var bodyRows = clonedTable.find("thead tr").size() > 0 ? 2 : 3;
            clonedTable.find("tbody tr:gt(" + bodyRows + ")").remove();

            // get columns and remove any column > maxColumnNumber
            clonedTable.find("tr").each(function(){
                var colums = $(this).find("th, td");
                columsSize = colums.size() > maxColumnNumber ? maxColumnNumber : colums.size();

                colums.each(function(count){
                    if(count < columsSize)
                        shortenText($(this), columsSize);
                    else
                        $(this).remove();
                });
            });

            // remove all rowspans and alter rowspans to fix maxColumnNumber
            clonedTable.find("tr").each(function(){
                var cols = 0;
                $(this).children().each(function(){
                    $(this).removeAttr("rowspan");
                    if(cols < maxColumnNumber){
                        var colspan = $(this).attr("colspan");
                        if(colspan){
                            if(cols + colspan > maxColumnNumber){
                                colspan = maxColumnNumber - cols;
                                $(this).attr("colspan", colspan);
                            }
                        } else{
                            colspan = 1;
                        }
                        cols = cols + colspan;
                    } else{
                        $(this).remove();
                    }
                });
            });
            return clonedTable.html();
        }

        function shortenText(element, colCount){
            var paragraph = $.trim(element.text()),
                strLen = Math.round(20/colCount);

            if(paragraph.length > strLen)
                element.text(paragraph.substring(0, strLen-1) + '…');
            else
                element.text(paragraph);
        }

        function generateModalTableData(table, footnotes, caption, dataset) {

            var tableHtml = table.html() ? table.html() : '',
                captionHtml = caption.html() ? caption.html() : '',
                footnotesHtml = footnotes.html() ? footnotes.html() : '',
                datasetHtml = dataset ? " dataset-table" : "",
                datasetButton = dataset ? "<button class='general-white-orange-button download-dataset-button float-right with-hover'><span class='download-item'>Download the data (MB)</span></button>" : "",
                hideBackground = $("#article-metadata input[name='articleId']").val() == "9961" || $("#article-metadata input[name='articleId']").val() == "10011" ? " no-bgs" : "",
                tableID = $(table).attr("id") || "";
            if (tableID.indexOf("-no-row-shading") > -1) { hideBackground = " no-bgs"; }

            var htmlToReturn = '<div class="modal-window-wrapper">' +
                                    '<div id="article-modal-table" class="modal-window padding-20">' +
                                        '<div class="modal-table-container">' +
                                            '<table class="article-table' + hideBackground + datasetHtml + '">' + tableHtml + '</table>' +
                                        '</div>' +
                                        '<div class="modal-caption-container">' + captionHtml + '' + footnotesHtml + '</div>' +
                                        '<div class="modal-popup-close-button">' +
                                            datasetButton +
                                            '<button class="general-white-orange-button close-modal-button with-hover">Close</button>' +
                                            /**
                                            '<a href="#" class="generated-resource-link-button">' +
                                                '<button class="general-white-orange-button">Download As CSV</button>' +
                                            '</a>' +
                                            **/
                                        '</div>' +
                                    '</div>' +
                                '</div>';
            return htmlToReturn;
        }

        // clicking the table.
        $('.thumbnail-table').on("click", function(){
            var parent = $(this).parent('.table-wrap.panel'),
                notes = parent.find('.table-wrap-foot'),
                caption = parent.find('.caption'),
                datasetTableCSV = false,
                datasetLink = parent.find(".link-for-dataset"),
                datasetLinkURL = datasetLink.attr("href"),
                datasetDownloadSize = parent.find(".download-item").parent().html(),
                datasetFileType = "",
                table = parent.find('.article-table'),
                lastRow = "";
            if (datasetLinkURL !== undefined) { datasetFileType = datasetLinkURL.substr(datasetLinkURL.length-3, 3); }
            if (caption.size() === 0) {
                if (datasetFileType.toLowerCase() === "csv") { datasetTableCSV = true; }
                $("body").append("<div class='is-hidden' id='dataset-caption-container'></div>");
                $("#dataset-caption-container").html("<h3>" + parent.find(".h5-label").text() + "</h3><p>" + parent.find("span.first").text() + "</p>");
                caption = $("#dataset-caption-container");
            }

            $('body').append(generateModalTableData(table, notes, caption, datasetTableCSV));

            $(".download-dataset-button").attr("target", datasetLinkURL).html(datasetDownloadSize);
            lastRow = $(".dataset-table tr").last();
            if (lastRow.size() > 0) {
                if (lastRow.find("td").first().text().indexOf("download the file") > 0) {
                    lastRow.find("td").first().html("This is a portion of the data; to view all the data, please <a href='" + datasetLinkURL + "'>download the file</a>.");
                    lastRow.css({ "font-weight": "bold", "font-size": "120%" });
                }
            }

            if ($("#dataset-caption-container").size() > 0) { $("#dataset-caption-container").remove(); }

            $('.modal-caption-container').find('.generated-resource-link-wrapper').each(function () {
                $(this).addClass('is-hidden');
                var requiredPath = $(this).find('a').attr('href');
                $('.modal-popup-close-button').find('.generated-resource-link-button').each(function() {
                    $(this).attr("href", requiredPath);
                });
            });

            UI.modalWindow("#article-modal-table", '90%', '80%', function() {
                $("body").css({"overflow" : "hidden"});
                $(window).trigger('resize');
                bindRemoveModalWindow();
            });

        });
    },
    interactiveContentPopup: function() {
        // THIS FUNCTION HANDLES THE R SCRIPT INTERACTIVITY
        // THIS CODE BUILDS THE CONTENTS AND THEN MOVES THE 'TEMPLATE' TO THE REQUIRED POSITION
        var $theLayout = $(".article-interactive-content-container"),
            theTitle = $(".r-button-wrapper").find(".caption > h3").html(),
            theText = $(".r-button-wrapper").find(".caption > p").html(),
            theLinkName = $(".r-button-wrapper").find(".n-a").attr("name"),
            theImageSource = $(".r-button-wrapper").find("img").attr("src");
        $theLayout.find("img.interactive-content-image").attr("src", theImageSource);
        $theLayout.find(".interactive-content-title").html(theTitle);
        $theLayout.find(".interactive-content-text").html(theText);
        $theLayout.find(".n-a").attr("name", theLinkName);
        $(".r-button-wrapper").after($theLayout);
        $(".r-button-wrapper").remove();
        $(".article-interactive-content-container").show();

        // THIS CODE CREATES THE 'POPUP' WINDOW AND BINDS THE REQUIRED FUNCTIONALITY
        $("body").on("click", ".interactive-content-button, .interactive-content-label, .interactive-content-image", function() {
            var $theContainer = $(this).closest(".article-interactive-content-container"),
                theTitle = $theContainer.find(".interactive-content-title").html(),
                theText = $theContainer.find(".interactive-content-text").html(),
                theMobileNote = $theContainer.find(".mobile-interactive-note").clone(true).wrap("<p/>").parent().html(),
                captionHtmlFull = "<h3>" + theTitle + "</h3>" + theText + theMobileNote;
            if ($theContainer.find(".mobile-interactive-note").is(":visible")) {
                mobileImageDisplay($theContainer.find("img.interactive-content-image").attr("src"), captionHtmlFull);
            } else {
                $('body').append(generateInteractiveContentPopup(theTitle, theText));
                $(".interactive-content-popup-title").append(buildDownloader());
                rLauncher.launch(["false"]);
                $("#interactive-content-popup").closest(".modal-window-wrapper").removeClass("is-hidden");
                $("#interactive-content-popup").fadeIn(500);

                UI.modalWindow("#interactive-content-popup", "90%", "90%", function() {
                    $("body").css({ "overflow": "hidden" });
                    $(window).trigger('resize');
                    bindRemoveModalWindow();
                });

                bindInteractiveContentHandlers();
            }
        });

        function bindInteractiveContentHandlers() {
            $(".run-RScript-launcher").on("click", function() {
                var params = [],
                    whatOption = $("#whisker-select option:selected");
                if (whatOption.val() === "tukey") {
                    params.push("false");
                } else {
                    params.push("true");
                }
                addLoadingMessage();
                rLauncher.launch(params);
            });

            $(".reset-RScript-launcher").on("click", function() {
                $("#whisker-select option:first").attr("selected", "selected");
                $("#info-tile").hide();
                $("#info-tukey").show();
                addLoadingMessage();
                rLauncher.launch(["false"]);
            });

            $("#whisker-select").on("change", function() {
                var selectedOption = $("#whisker-select option:selected").val();
                $(this).siblings("span").hide();
                $("#info-" + selectedOption).show(150);
            });

            $("body").on("click", ".interactive-content-download", function() {
                var imgPath = $(".rscript_image > img").attr("src"),
                    theDownloader = $(".interactive-content-popup-title > a");
                if (theDownloader.size() > 0) {
                    theDownloader.attr("href", imgPath).click();
                } else {
                    window.open(imgPath, "_blank");
                }
            });
        }

        function generateInteractiveContentPopup(title, text) {
            var html = '<div class="modal-window-wrapper is-hidden">' +
                       '<div id="interactive-content-popup" class="modal-window padding-20">' +
                           '<div class="modal-window-close-button" title="Close"></div>' +
                           '<div class="interactive-content-popup-header">' +
                               '<div class="interactive-content-popup-title">' + title + '</div>' + text +
                           '</div>' +
                           '<div class="interactive-content-controls-wrapper">' +
                               '<div class="interactive-content-control-box">' +
                                   '<div class="interactive-content-control">' +
                                       '<div class="title">Re-Plot Figure</div>' +
                                       'Define Whisker ' +
                                       '<select id="whisker-select">' +
                                       '<option value="tukey" selected>Tukey</option>' +
                                       '<option value="tile">10th-90th %tile</option>' +
                                       '</select>' +
                                       '<span id="info-tukey" class="info-text">' +
                                       'Whiskers extend to values 1.5 x IQR from 1st/3rd quartile' +
                                       '</span>' +
                                       '<span id="info-tile" class="info-text is-hidden">' +
                                       'Whiskers extend to 10th/90th percentiles. Dots are values below/above whiskers' +
                                       '</span>' +
                                   '</div>' +
                                   '<div class="button-row">' +
                                       '<button class="run-RScript-launcher general-white-orange-button shorter with-hover">Apply</button>' +
                                       '<button class="reset-RScript-launcher general-white-orange-button shorter with-hover margin-left">Reset</button>' +
                                   '</div>' +
                               '</div>' +
                               '<div class="interactive-control-help">' +
                                   '<div class="title">HELP</div>' +
                                   'Select option in the dropdown box and click Apply to re-plot figure. ' +
                                   'Click Reset to return to the default figure display.' +
                               '</div>' +
                               '<div class="interactive-control-error"></div>' +
                           '</div>' +
                           '<div class="interactive-content-display">' +
                               '<div class="rscript_image">' +
                                   '<div class="loading-content">Loading . . . Please Wait</div>' +
                               '</div>' +
                           '</div>' +
                       '</div>' +
                       '<div class="clearfix"></div>' +
                       '</div>';
            return html;
        }

        function buildDownloader() {
            var supportDownloadOption = document.createElement('a'),
                downloadLinkHTML = "";
            if ($(".interactive-content-download").size() === 0 && $(".interactive-content-download-ie").size() === 0) {
                if (iecontroller.isIE6 || iecontroller.isIE7 || iecontroller.isIE8 || iecontroller.isIE9 || iecontroller.isIE10 || iecontroller.isIE11) {
                    downloadLinkHTML = "<div class='interactive-content-download-ie' title='Right click on the image below and choose Save Picture As to download the image.'></div>";
                } else if (typeof supportDownloadOption.download !== undefined) {
                    downloadLinkHTML = "<a href='' download><div class='interactive-content-download' title='Download'></div></a>";
                } else {
                    downloadLinkHTML = "<div class='interactive-content-download' title='Show image in a new window.'></div>";
                }
            }
            return downloadLinkHTML;
        }

        function addLoadingMessage() {
            $(".rscript_image").html('<div class="loading-content">Loading . . . Please Wait</div>');
        }

    },

    livingFigurePopup: function() {
        var theFigures = $(".bb-living-figure"),
            reqdImgSrc = $("#living-figure-img").find("img").attr("src"),
            theButton = "";
        theFigures.each(function(index, element) {
            theButton = theFigures.find(".generated-resource-link-wrapper a");
            theButton.replaceWith($(".article-living-figure-container").removeClass("is-hidden"));
            theFigures.find("img").attr("reqd-popup-image", reqdImgSrc);
        });

        $("body").on("change", ".living-figure-dates-menu", function(e) {
            e.preventDefault();
            var theImgSrc = $(this).find("option:selected").val();
            if (theImgSrc !== "NONE") {
                $(this).closest("#fig-panel-popup").find(".reduced-popup-image-container img").attr("src", theImgSrc);
                $(this).closest("#fig-panel-popup").find(".original-popup-image-container img").attr("src", theImgSrc);
            }
        });
    }

};

var omeroController = {
    // THIS FUNCTION ADDS THE DETAILS FOR EVERY IMAGE TO DATA ATTRIBUTES ON THE 'MAIN' IMAGE (IMAGE ON ARTICLE PAGE)
    setMultipleOmeroImages: function() {
        $(".omero-wrapper").each(function() {
            var imageCount = $(this).find(".omero-figure").size(),
                mainImageLink = $(this).find("img").closest("a"),
                imageNumber = 0;
            $(this).find(".omero-figure").each(function (index, element) {
                imageNumber = index + 1;
                mainImageLink.attr("data-omero-image" + imageNumber, $(this).attr("src"));
                if ($(this).attr("url")) {
                    mainImageLink.attr("data-omero-frame" + imageNumber, $(this).attr("url"));
                } else {
                    mainImageLink.attr("data-omero-frame" + imageNumber, "");
                }
            });
            mainImageLink.attr("data-omero-images", imageCount);
        });
    },
    // THIS FUNCTION CREATES THE HTML AND HANDLERS FOR THE POPUP CONTAINING THE INTERACTIVE FRAME ELEMENT
    interactiveOmeroPopup: function() {
        var omeroReports = $(".omero-wrapper");

        omeroReports.each(function() {
            // This code builds the layout for the omero display on the article page
            var $theLayout = $("#article-interactive-omero-container").clone(),
                $theLink = $(this).find("img").closest("a"),
                theItemLabel = $(this).find("h3.label").html(),
                theItemTitle = theItemLabel + " " + $(this).find("h3.title").html(),
                theItemDetail = $(this).find("p").html(),
                theNavLink = $(this).find(".n-a"),
                theFrameSrc = $theLink.attr("data-omero-frame1"),
                theImageCount = $theLink.attr("data-omero-images"),
                theImageSrc = $(this).find("img").attr("src"),
                theImageLink = $theLink.attr("href"),
                $omeroLink = $theLayout.find(".link-for-omero-image");

            $theLayout.attr("id", "article-interactive-omero-container-" + $(".article-interactive-omero-container").size());
            $theLayout.attr("data-frame", theFrameSrc);
            $theLayout.find(".interactive-omero-image").attr("src", theImageSrc);
            $theLayout.find(".link-for-omero-image").attr("url", theImageLink);
            $theLayout.find(".interactive-content-title").html(theItemTitle);
            $theLayout.find(".interactive-content-text").html(theItemDetail);
            $theLayout.find(".omero-image-list").html($(this).find(".omero-figure"));
            $theLayout.find(".n-a").replaceWith(theNavLink);
            $omeroLink.attr("data-omero-images", theImageCount);
            for (var i = 1; i <= theImageCount; i++) {
                $omeroLink.attr("data-omero-image" + i, $theLink.attr("data-omero-image" + i));
                $omeroLink.attr("data-omero-frame" + i, $theLink.attr("data-omero-frame" + i));
            }
            $(this).replaceWith($theLayout);
            $theLayout.fadeIn(200);
        });

        $(".interactive-omero-button").on("mouseenter", function() {
            $(this).closest(".interactive-content-wrapper").find(".has-interactive-content-image").fadeIn(100);
        }).on("mouseleave", function() {
            $(this).closest(".interactive-content-wrapper").find(".has-interactive-content-image").fadeOut(200);
        });

        $("body").on("click", ".interactive-omero-button", function() {
            var $omeroPopup = $("#the-omero-popup-window"),
                $theContainer = "",
                theFrameSrc = "",
                theFrameHTML = "",
                frameHeight = 0,
                theTitle = "",
                theText = "";

            if ($(this).hasClass("display-only")) { return; }

            if ($(this).hasClass("omero-popup")) {
                $theContainer = $(this).closest("#fig-panel-popup");
                theFrameSrc = $(this).closest(".article-interactive-omero-container").attr("data-frame");
            } else {
                $theContainer = $(this).closest(".article-interactive-omero-container");
                theFrameSrc = $theContainer.attr("data-frame");
                if ($theContainer.find(".omero-figure").size() > 1) {
                    $theContainer.find(".link-for-omero-image").click();
                    return;
                }
            }
            theFrameHTML = "<iframe frameborder='0' width='100%' src='" + theFrameSrc + "'></iframe>";
            if ($omeroPopup.size() > 0) { $omeroPopup.remove(); }
            theTitle = $theContainer.find(".interactive-content-title").html();
            theText = $theContainer.find(".interactive-content-text").html();
            if ($(this).hasClass("omero-popup")) { $(".close-modal-button").click(); }
            $('body').append(generateInteractiveOmeroPopup(theTitle, theText, theFrameHTML));

            $("#interactive-content-popup").closest(".modal-window-wrapper").removeClass("is-hidden");

            $("#interactive-content-popup").fadeIn(500, function() {
                $(".interactive-omero-loading").fadeIn(200);
                setTimeout(function() {
                    $(".interactive-omero-loading").fadeOut(200, function() {
                        $(".interactive-omero-display").fadeIn(200);
                    });
                }, 3000);
                frameHeight = $("#interactive-content-popup").height() - 140;
                if (frameHeight < 200) { frameHeight = 200; }
                $(".interactive-omero-display > iframe").css({ "height": frameHeight + "px" });
            });

            UI.modalWindow("#interactive-content-popup", "90%", "90%", function() {
                $("body").css({ "overflow": "hidden" });
                $(window).trigger('resize');
                bindRemoveModalWindow();
            });

        });

        function generateInteractiveOmeroPopup(title, text, contents) {
            var html = '<div id="the-omero-popup-window" class="modal-window-wrapper is-hidden">' +
                       '<div id="interactive-content-popup" class="modal-window padding-20">' +
                           '<div id="omero-modal-window-close-button" class="modal-window-close-button" title="Close"></div>' +
                           '<div class="interactive-content-popup-header omero-popup">' +
                               '<div class="interactive-content-popup-title">' + title + '</div>' + text +
                           '</div>' +
                           '<div class="interactive-omero-loading">' +
                               'Loading . . . Please Wait' +
                           '</div>' +
                           '<div class="interactive-omero-display">' +
                               contents +
                           '</div>' +
                       '</div>' +
                       '<div class="clearfix"></div>' +
                       '</div>';
            return html;
        }
    },
    // THIS FUNCTION RETURNS THE HTML FOR THE 'INTERACTIVE CONTENT' BUTTON
    getInteractionButtonTemplate: function(el, omeroImageCount) {
        var omeroFrameSrc = el.closest(".article-interactive-omero-container").attr("data-frame"),
            buttonHTML = "";
        if (omeroImageCount > 1) { omeroFrameSrc = "XXXDATAFRAMEXXX"; }
        buttonHTML = '<span class="article-interactive-omero-container omero-popup visible-omero-image" ' +
                     'data-frame="' + omeroFrameSrc + '" data-imageNo="X0X">' +
                     '<div class="interactive-content-info-tooltip has-interactive-content-image omero-popup">' +
                     '<span class="box-end-point-right"></span>' +
                     '<span class="box-middle omero-popup">View Interactive Display In Omero</span>' +
                     '<span class="box-arrow-point-right"></span>' +
                     '</div>' +
                     '<div class="interactive-content-image-popup interactive-omero-button omero-popup" title="Open the interactive content window." data-interactive-content-type="Omero">' +
                     '</div></span>';
         return buttonHTML;
    },
    // THIS FUNCTION RETURNS THE HTML FOR THE 'PREVIOUS' ICON ON MULTIPLE IMAGES
    getButtonPrevious: function() {
        if ($("#multi-image-previous-icon").size() === 0) {
            return "<a id='multi-image-previous-icon' href='#' title='Previous. You can also use the arrow keys to navigate the images.' class='standard omero-button back'>" +
                       "<span class='f1r-icon icon-39_arrow_left_big article-image-navigation left'></span>" +
                   "</a>";
        } else {
            return "";
        }
    },
    // THIS FUNCTION RETURNS THE HTML FOR THE 'NEXT' ICON ON MULTIPLE IMAGES
    getButtonNext: function() {
        if ($("#multi-image-next-icon").size() === 0) {
            return "<a id='multi-image-next-icon' href='#' title='Next. You can also use the arrow keys to navigate the images.' class='standard omero-button next'>" +
                       "<span class='f1r-icon icon-38_arrow_right_big article-image-navigation right'></span>" +
                   "</a>";
        } else {
            return "";
        }
    },
    // THIS FUNCTION REMOVES THE PREVIOUS/NEXT ARROWS FROM THE POPUP
    removeNavigationIcons: function() {
        $("#multi-image-previous-icon, #multi-image-next-icon").remove();
    },
    // THIS FUNCTION BINDS ALL THE HANDLERS FOR THE OMERO INTERACTION ITEMS
    bindOmeroHandlers: function() {

        // Check if there are multiple images that need to be resized
        if ($("#fig-panel-popup .reduced-popup-image-container").find("img").size() > 1) {
            //resizeOmeroImages();
        }

        // Add handlers for the next and back buttons
        $("body").on("click", "a.omero-button", function(e) {
            e.preventDefault();
            var thisImageNo = isNaN(parseFloat($("#fig-panel-popup img:visible").attr("data-imageNo"), 10)) ? 1 : parseFloat($("#fig-panel-popup img:visible").attr("data-imageNo"), 10),
                thisImage = $("#reduced-image-" + thisImageNo),
                thisImageInteractive = thisImage.closest(".fig-image-popup").find("span[data-imageNo='" + thisImageNo + "']"),
                nextImageNo = $(this).hasClass("next") ? (thisImageNo + 1) : (thisImageNo - 1),
                nextImage = "",
                nextImageInteractive = "",
                totalImageCount = $("#fig-panel-popup .reduced-popup-image-container img").size();
            if (nextImageNo < 1) {
                nextImage = $("#reduced-image-" + totalImageCount);
                nextImageInteractive = nextImage.closest(".fig-image-popup").find("span[data-imageNo='" + totalImageCount + "']");
            } else if (nextImageNo > totalImageCount) {
                nextImage = $("#reduced-image-1");
                nextImageInteractive = nextImage.closest(".fig-image-popup").find("span[data-imageNo='1']");
            } else {
                nextImage = $("#reduced-image-" + nextImageNo);
                nextImageInteractive = nextImage.closest(".fig-image-popup").find("span[data-imageNo='" + nextImageNo + "']");
            }
            thisImageInteractive.fadeOut(500);
            thisImage.fadeOut(500, function() {
                nextImage.fadeIn(500);
                nextImageInteractive.fadeIn(500);
            });
        });

        // This handles the mouseover on the interactive image (within the popup)
        $("body").on("mouseenter", ".interactive-content-image-popup", function() {
            var omeroArrow = $(this).closest(".article-interactive-omero-container").find(".interactive-content-info-tooltip");
            omeroArrow.css({ "margin-left": ($(this).offset().left - 300) + "px", "margin-top": -30 + "px" }).fadeIn(200);
        }).on("mouseleave", ".interactive-content-image-popup", function() {
            $(this).closest(".article-interactive-omero-container").find(".has-interactive-content-image").fadeOut(200);
        });

        // This function binds the keys for navigating the popup images (left/right arrows)
        $(document).on("keydown", imageNavigator); // Handle the left/right arrows
        function imageNavigator(e) {
            var selImage = $("img.is-current");
            if ($("#fig-panel-popup").is(":visible")) {
                if (e.which === 37) { // Left Arrow
                    $("#multi-image-previous-icon").click();
                } else if (e.which === 39) { // Right Arrow
                    $("#multi-image-next-icon").click();
                }
            } else {
                return false;
            }
        }

        // This handles the sizing of multiple images
        function resizeOmeroImages() {
            var imageCount = $("#fig-panel-popup .reduced-popup-image-container").find("img").size(),
                maxImagePerRow = 1,
                popupWidth = $("#fig-panel-popup").width() - (imageCount*20),
                maxWidth = parseInt(popupWidth / imageCount, 10),
                maxHeight = $("#fig-panel-popup").height() - 100,
                srcHeight = 0,
                srcWidth = 0,
                ratio = 0;

            if (imageCount > maxImagePerRow) {
                popupWidth = $("#fig-panel-popup").width() - (maxImagePerRow*20);
                maxWidth = parseInt(popupWidth / maxImagePerRow, 10);
                if (imageCount > (maxImagePerRow*2)) {
                    $("#fig-panel-popup").addClass("interactive-omero-scroller");
                }
            }

            $("#fig-panel-popup .reduced-popup-image-container").find("img").each(function (index, element) {
                srcHeight = $(this).outerHeight();
                srcWidth = $(this).outerWidth();
                ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
                $(this).css({ "height": srcHeight*ratio + "px", "width": srcWidth*ratio + "px" });
            });
        }
    }
};

var articleHelper = {
    bindHelpPopupHandlers: function() {
        $(".circle-icon-small").on("click", function() {
            var windowToShow = $(this).attr("data-window"),
                leftElementPosition = parseInt($(this).offset().left, 10),
                topElementPosition = parseInt($(this).offset().top, 10),
                $helpContainer = $("#" + windowToShow),
                leftPosition = leftElementPosition - $helpContainer.width(),
                topPosition = topElementPosition - $helpContainer.height();
            $helpContainer.css({ "top": topPosition + "px", "left": leftPosition + "px" });
            $("#" + windowToShow).fadeIn(200);
        });
        $(document).on("mouseup", function(e) {
            var helpContainer = $(".research-help");
            if (!helpContainer.is(e.target) && helpContainer.has(e.target).length === 0) {
                helpContainer.fadeOut(200);
            }
        });
        $(".close-research-help").on("click", function() {
            $(this).closest(".research-help").fadeOut(200);
        });
    },
    checkPopupsOnLoad: function() {
        var popupsToShow = 0,
            showAboutResearch = false,
            showNewVersion = false,
            showSubmitReport = false,
            articleID = $("meta[name='article-id']").attr("content"),
            topPosition = $("#anchor-abstract").size() > 0 ? $("#anchor-abstract").position().top : 0,
            leftPosition = $("#anchor-abstract").size() > 0 ? $("#anchor-abstract").position().left + 140 : 0;
        if (!$.cookie("first_article_load")) {
            // Dont show the popup on mobiles
            if ($(window).outerWidth(true) > 600) {
                showAboutResearch = true;
                popupsToShow++;
            }
        }
        if ($("#new-version-exists-modal").length > 0 && !$.cookie("version_warning_" + articleID)) {
            if (location.hash.indexOf("referee-response-") < 0) {
                showNewVersion = true;
                popupsToShow++;
            }
        }
        if ($("#submit-referee-report-modal").size() > 0) {
            showSubmitReport = true;
            popupsToShow++;
        }
        if (popupsToShow > 1) {
            $("body").append("<div class='modal-window-wrapper is-hidden'><div id='multi-windows' class='multi-windows'></div></div>");
            if (showAboutResearch) {
                moveContent($("#about-research"));
                createFirstLoadCookie();
            }
            if (showNewVersion) {
                moveContent($("#new-version-exists-modal"));
                bindSuppressModal();
            }
            if (showSubmitReport) { moveContent($("#submit-referee-report-modal")); }
            $("#multi-windows").css({ "top": topPosition + "px", "left": leftPosition + "px" });
            UI.modalWindow('#multi-windows', null, null, null, false);
        } else {
            if (showAboutResearch) {
                $("#about-research").css({ "position": "absolute", "top": topPosition + "px", "left": leftPosition + "px" });
                UI.modalWindow('#about-research', null, null, null, false);
                createFirstLoadCookie();
            } else if (showNewVersion) {
                UI.modalWindow('#new-version-exists-modal', null, null, null, false);
                bindSuppressModal();
            } else if (showSubmitReport) {
                UI.modalWindow('#submit-referee-report-modal', null, null, null, false);
            }
        }
        function moveContent(content) {
            var theWrapper = content.closest(".modal-window-wrapper");
            $("#multi-windows").append(content);
            theWrapper.remove();
        }
        function bindSuppressModal() {
            $(".suppress-modal-button").click(function(e) {
                e.preventDefault();
                var wrapper = $(this).parents(".modal-window-wrapper");
                UI.closeModal();
                $.cookie("version_warning_" + articleID, "suppressed", { expires: 1 });
            });
        }
        function createFirstLoadCookie() {
            $.cookie("first_article_load", "seen_and_closed", { expires: 365, path: "/" });
        }
    },
    updateRefereeReportCounts: function() {
        $(".referee-response-container").each(function(index, element) {
            $.ajax({
                url: "/articles/rcj/" + $(element).attr("data-reportID"),
                type: "GET",
                error: function() {
                    console.log("ERROR UPDATING REPORT COUNTS FOR REPORT " + $(element).attr("data-reportID"));
                },
            });
        });
    },
    sendComment: function(buttonId, reportId) {
        var containerId = "#add-comment";

        if (reportId)
            containerId += reportId;

        var ajax = new R.Ajax(),
            versionId = $("#article-metadata input[name='versionId']").val(),
            commentContainer = buttonId.parents('.js-add-comment-container'),
            commentContainerText = commentContainer.find("#new-comment"),
            competingInterestContainer = commentContainer.find("#competing-interests"),
            commentText = commentContainerText.val(),
            competingInterestText = competingInterestContainer.val(),
            commentConditions = commentContainer.find("#acceptedTermsAndConditions"),
            commentEditorWrapper = "";

        articleHelper.resetCommentErrors(containerId);

        ajax.settings.async = false;
        ajax.settings.dataType = "text";

        if (commentConditions.length > 0 && !commentConditions.is(':checked')) {
            commentContainer.find(".comment-accept-conditions").toggleClass('is-hidden');
        } else {
            if (!articleHelper.isEmptyComment(commentText)){
                if (reportId){
                    ajax.settings.url = "/comment/addToReport";
                } else {
                    ajax.settings.url = "/comment/addToVersion";
                }

                ajax.onSuccess = function(response) {
                    if(response == 'success') {
                        commentContainer.find(".comment-is-added").toggleClass('is-hidden');
                        commentContainer.find("button.add-comment-button").hide();
                            setTimeout(function() {
                                commentContainerText.val("");
                                competingInterestContainer.val("");
                                try {
                                    commentEditorWrapper = commentContainer.find("#new-comment").ckeditor();
                                } catch (err) {
                                    commentEditorWrapper = "";
                                }
                                commentEditorWrapper.val("");
                                commentContainer.find(".comment-is-added").toggleClass('is-hidden');
                                // trigger tab to close.
                                $('.f1000Expander .ui-state-default').removeClass('ui-tabs-selected ui-state-active');
                                if(reportId) {
                                    $('#add-comment-form'+reportId).addClass('ui-tabs-hide');
                                } else {
                                    $('#add-comment-form').addClass('ui-tabs-hide');
                                }
                            }, 2000);
                        if(commentConditions.length > 0) {
                            window.location.href = window.location.href;
                        }

                        var url;

                        if(window.location.href.indexOf('#') > 0){
                            url = window.location.href.split('#')[0]+'#article-comments';
                        } else {
                            url = window.location.href+'#article-comments';
                        }
                        window.location.href = url;
                        window.location.reload(true)
                        // hide the TNC div
                    } else if (response == 'missing-tnc') {
                        commentContainer.find(".comment-accept-conditions").toggleClass('is-hidden');
                    } else if (response == 'missing-comment') {
                        commentContainer.find(".comment-enter-text").toggleClass('is-hidden');
                    } else if (response.indexOf('references-') != -1){
                        var message = response.split("-")[1];
                        commentContainer.find(".comment-references-error").html(message).toggleClass('is-hidden');
                    }
                };
                ajax.onError = function(XHR, textStatus, errorThrown) {
                    commentContainer.find(".comment-not-added").toggleClass('is-hidden');
                    button.show();
                }; //This is needed to clear the onError property.

                var params = {
                    comment : commentText,
                    competingInterests : competingInterestText
                };
                if (reportId){
                    params.reportId = reportId;
                } else {
                    params.versionId = versionId;
                }
                if (commentConditions.length > 0) {
                    params.acceptedTermsAndConditions = commentConditions.is(':checked');
                }

                ajax.submit(params);
            } else {
                commentContainer.find(".comment-enter-text").toggleClass('is-hidden');
            }
        }
    },
    saveComment: function(commentId) {
        var containerId = "#save-comment-container";
        var ajax = new R.Ajax(),
            commentContainer = $(".add-comment-container"),
            commentText = commentContainer.find("#new-comment").val(),
            competingInterestsText = commentContainer.find("#new-competing-interests").val();

        articleHelper.resetCommentErrors(containerId);

        if (!articleHelper.isEmptyComment(commentText)){
            ajax.settings.async = false;
            ajax.settings.dataType = "text";
            ajax.settings.url = "/editor/comment/" + commentId + "/updateText";
            ajax.onSuccess = function(response) {
                if(response == "success") {
                    $('.comment-is-saved').toggleClass('is-hidden');
                    setTimeout(function() {
                        commentContainer.val("");
                        $('.comment-is-saved').toggleClass('is-hidden');
                        $('.add-comment-container').toggleClass('is-hidden');
                        // remove final # if present
                        var windowLoc = window.location.href;
                        if (windowLoc.indexOf("#") == (windowLoc.length - 1)){
                            windowLoc = windowLoc.substring(0, windowLoc.length - 1);
                        }
                        window.location = windowLoc;
                    }, 2000);
                }else if(response.indexOf('references-') != -1){
                    var message = response.split("-")[1];
                    $('.comment-references-error').html(message).toggleClass('is-hidden');
                }else {
                    $('.comment-not-added').toggleClass('is-hidden');
                }
            };
            ajax.onError = function(XHR, textStatus, errorThrown) {
                $('.comment-not-added').toggleClass('is-hidden');
            }; //This is needed to clear the onError property.
            ajax.submit({ comment : commentText,
                          competingInterests : competingInterestsText});
        } else {
            $('.comment-enter-text').toggleClass('is-hidden');
        }
    },
    isEmptyComment: function(text) {
        text = text.replace(/<br>/g, "");
        text = text.replace(/&nbsp;/g, "");
        text = $.trim(text);
        if (text === ""){
            return true;
        } else {
            return false;
        }
    },
    resetCommentErrors: function(parentDiv) {
        $(parentDiv + ' .comment-enter-text').addClass('is-hidden');
        $(parentDiv + ' .comment-not-added').addClass('is-hidden');
        $(parentDiv + ' .comment-accept-conditions').addClass('is-hidden');
        $(parentDiv + ' .comment-references-error').addClass('is-hidden');
    },
    sendRecommendationEmail: function(el) {
        var isMobile = $(el.srcElement).hasClass("recommend-version-form-mobile") ? true : false,
            form = isMobile ? $("form.recommend-version-form-mobile") : $("form.recommend-version-form"),
            ticker = form.find('.ticker-email-article-details'),
            messageContainer = form.find('.orange-message');
        // Clear any existing validation messages
        form.find('.default-error').remove();
        ticker.show();
        jQuery.ajax({
            type:    'POST',
            url:     '/ajax/recommendVersion',
            data:    form.serialize(),
            dataType: "json",
            success: function(data) {
                if (data.success) {
                    messageContainer.show().html(data.message);
                    $(".email-article .bubble-content").html(data.count);
                    $(".email-article .count-bubble").removeClass("hidden");
                    setTimeout(function(){
                        $(".email-article-version-container").hide();
                        $('.research-overlay').remove();
                    }, 1500);
                } else {
                    if (data.errors) {
                        var captchaImage = isMobile ? $("img[id=captchaImageMobile]") : $("img[id=captchaImage]"),
                            errorMessage = "";
                        if(captchaImage){
                            captchaHelper.clearInput().setNewChallengeImage();
                        }
                        $.each(data.errors, function(key, value) {
                            if(key == "recipientEmails" || key == "message") {
                                label = form.find('textarea[name="' + key + '"]');
                            } else {
                                label = form.find('input[name="' + key + '"]');
                            }
                            if (key === "captcha") {
                                errorMessage = $('<div class="default-error" style="margin-top: 40px;"></div>').text(value);
                            } else {
                                errorMessage = $('<div class="default-error"></div>').text(value);
                            }
                            label.after(errorMessage);
                        });
                    }
                    else {
                        messageContainer.show().html(data.message);
                    }
                }
                ticker.hide();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                ticker.hide();
                messageContainer.show().html("A problem occurred while sending your email, please try again.");
            }
        });
        return false;
    }
};


var articleComments = {
    showAddNewComment : function() {
        $('.add-new-comment, .comment-reply a').on('click', function(e){
            $('#add-comment-button').removeAttr('reportId');
            e.preventDefault();
            // This is for report comments
                reportId = $(this).attr('reportId');
                if(reportId)
                    $('#add-comment-button').attr('reportId', reportId);
            // end
            articleComments.commentEditor("");
            $('.add-comment-container #add-comment-button').show();
            $('.add-comment-container #save-comment-button').hide();
            $('.add-comment-container #add-comment-text').show();
            $('.add-comment-container #save-comment-text').hide();
            $('.add-comment-container').center().toggleClass('is-hidden');
        });
    },
    cancelComment : function() {
        $('#cancelComment').on('click', function(e){
            e.preventDefault();
            $('.add-comment-container').toggleClass('is-hidden');
        });
    },
    commentEditor : function(commentId) {
        try {
            var newCommentCkEditor = $(".add-comment-container #new-comment").ckeditor(function() {}, {
                enterMode : CKEDITOR.ENTER_BR,
                extraPlugins: "confighelper,specialchar,autogrow",
                toolbar: "StandardFormEditorToolbar",
                height: 150,
                width: 556,
                removePlugins : 'sourcearea,elementspath,magicline,contextmenu,liststyle,tabletools',
                autoGrow_minHeight: 128,
                autoGrow_maxHeight: 500
            });
        } catch (err) {
            newCommentCkEditor = "";
        }

        if(commentId === "") {
            newCommentCkEditor.val("");
            $("#new-competing-interests").val("");
        } else {
            newCommentCkEditor.val($("#full-comment-original-" + commentId).html());
            $("#new-competing-interests").val($(".edit-comment").closest(".one-comment").find(".c-i-d").text());
        }
    },
    showEditComment : function() {
        $(".edit-comment").on("click", function() {
            var commentId = $(this).attr("commentId");
            articleComments.commentEditor(commentId);
            $('.add-comment-container #save-comment-button').attr("commentId", commentId);
            setTimeout(function(){
                $('.add-comment-container').center().toggleClass('is-hidden');
            },300);
        });
    }
};

var articleTooltips = {
    show : function() {
        var tooltipApproved = jQuery('.referee-status-approved'),
            tooltipNotApproved = jQuery('.referee-status-not-approved'),
            tooltipApprovedWithRes = jQuery('.referee-status-approved-wr'),
            titleApproved = tooltipApproved.attr("title"),
            titleNotApproved = tooltipNotApproved.attr("title"),
            titleApprovedWithRes = tooltipApprovedWithRes.attr("title"),
            tooltipFacultyRecommended = jQuery(".prime-recommended-reference"),
            titleFacultyRecommended = tooltipFacultyRecommended.attr("title"),
            tooltipF1000FacultyCritique = jQuery('#ffc-tip-link'),
            titleF1000FacultyCritique = tooltipF1000FacultyCritique.attr("title");

        tooltipF1000FacultyCritique.simpletip({
            fixed: true,
            position: 'bottom',
            offset:[0,10],
            baseClass: 'small-tooltip',
            content:"<div class='tooltip-arrow'></div>" + titleF1000FacultyCritique
        });
        tooltipF1000FacultyCritique.removeAttr("title");

        tooltipApproved.simpletip({
            fixed: true,
            position: 'bottom',
            offset:[0,10],
            baseClass: 'small-tooltip',
            content:titleApproved + "<div class='tooltip-arrow'></div>"
        });
        tooltipApproved.removeAttr("title");

        tooltipNotApproved.simpletip({
            fixed: true,
            position: 'bottom',
            offset:[0,10],
            baseClass: 'small-tooltip',
            content:titleNotApproved + "<div class='tooltip-arrow'></div>"
        });
        tooltipNotApproved.removeAttr("title");

        tooltipApprovedWithRes.simpletip({
            fixed: true,
            position: 'bottom',
            offset:[0,10],
            baseClass: 'small-tooltip',
            content:titleApprovedWithRes + "<div class='tooltip-arrow'></div>"
        });
        tooltipApprovedWithRes.removeAttr("title");

        tooltipFacultyRecommended.simpletip({
            fixed: true,
            position: 'bottom',
            offset: [0, 10],
            baseClass: 'small-tooltip',
            content:titleFacultyRecommended + "<div class='tooltip-arrow'></div>"
        });
        tooltipFacultyRecommended.removeAttr("title");

        // var elements = $('.timeline-icon'),
        //     tooltip = elements.attr('title');

        // elements.simpletip({
        //     fixed: true,
        //     position: "bottom",
        //     offset: [0, 10],
        //     baseClass: 'small-tooltip',
        //     content:tooltip + "<div class='tooltip-arrow'></div>",
        //     onShow: function(){
        //         var tooltip = this.getTooltip(),
        //             icon = $(tooltip).parents(".timeline-icon"),
        //             containerWidth = $(tooltip).parents(".referee-status").outerWidth();
        //         if($(tooltip).parent().hasClass("timeline-icon")){
        //             $(tooltip).appendTo($(tooltip).parents(".referee-reports-container"));
        //         }
        //     }
        // });
        // elements.removeAttr("title");
    }
};

var emailArticleDetails = {
    showHide: function(){
        $('.email-article-version-container').hide();
        var emailContainer = $('.email-article-version-container'),
            openContainerButton = $('.email-article');

        openContainerButton.on('click', function(e){
            e.preventDefault();

            if(!emailContainer.is(':visible'))
                emailContainer.fadeIn();

            $('body').append('<div class="research-overlay" />');
            $('.research-overlay').css('opacity', '0.5');

            $('.close-icon').on('click', function(){
                closeModalWindow();
            });

            $(document).mousedown(function(e) {
                if(emailContainer.has(e.target).length === 0 && openContainerButton.has(e.target).length === 0) {
                    closeModalWindow();
                }
            });

            function closeModalWindow() {
                emailContainer.fadeOut('100');
                $('.research-overlay').remove();
            }
        });
    }
};

function commentTruncation() {
    function adjustVersionBorder(topContainer) {
        var leftBorder = topContainer.find(".version-border"),
            mAdjust = Math.abs(parseInt(leftBorder.css("margin-top").replace("px", ""), 10)),
            newHeight = parseInt(topContainer.outerHeight(true) + mAdjust, 10);
        newHeight -= 10;
        leftBorder.css({ "height": newHeight + "px" });
    }
    $('.continue-reading-container').on('click', function(){
        var toHide = $(this).closest(".truncated-comment"),
            toShow = $(this).closest('.truncated-comment').next();
        toHide.toggleClass('hidden');
        toShow.toggleClass('hidden');
        //This fixes a rendering performance bug in IE8
        if($("body.lt-ie9").length > 0) {
            $(this).parents(".referee-response-container").css({"display": "inline-block"});
            $(this).parents(".referee-response-container").css({"display": "block"});
        }
        // Increase border height on mobile devices (Open Peer Review section)
        if ($(".f1r-article-page-mobile").size() > 0 && $(".version-border").size() > 0) {
            adjustVersionBorder($(this).closest(".referee-response-container"));
        }
    });
    $('.hide-comment-container').on('click', function(){
        var toHide = $(this).closest(".hidden-report-text"),
            toShow = $(this).closest(".hidden-report-text").siblings('.truncated-comment');
        if (toHide.size() < 1) {
            toHide = $(this).closest(".full-comment");
            toShow = $(this).closest(".full-comment").siblings('.truncated-comment');
        }
        toHide.toggleClass('hidden');
        toShow.toggleClass('hidden');
        //This fixes a rendering performance bug in IE8
        if($("body.lt-ie9").length > 0) {
            $(this).parents(".referee-response-container").css({"display": "inline-block"});
            $(this).parents(".referee-response-container").css({"display": "block"});
        }
        // Increase border height on mobile devices (Open Peer Review section)
        if ($(".f1r-article-page-mobile").size() > 0 && $(".version-border").size() > 0) {
            adjustVersionBorder($(this).closest(".referee-response-container"));
        }
    });
}
function refereeTruncation() {
    $('.see-all-referees').on('click', function(){
        $(this).parents(".referee-authors").find('.moreReferee').toggleClass('hidden');
        $(this).toggleClass('hidden');
    });
}


var SharingHelper = {

    settings: {
        addThisElement: ".add-this-button"
    },

    init: function() {

        var that = this;
        $(that.settings.addThisElement).each( function() {

            addthis.addEventListener('addthis.ready', updateCounts);
            addthis.addEventListener('addthis.menu.share', updateCounts);

            function updateCounts(){
                setTimeout(function(){
                    $(that.settings.addThisElement).each(function(){
                        var count = $(this).find("img").text();
                        if (count !== "" && count != "0") {
                            $(this).next(".count-bubble")
                                .find(".bubble-content")
                                .text(count);
                        }
                    });
                }, 1000);
            }
        });

    }

};

function downloadXml() {
    return function() {
        window.location.href = $("#xmlUrl").val();
    };
}

function addFlashObject(id, fileUri, type, title, plottableColumns, selectableColumns, selectedColumn, description) {
    $("#" + id).empty();
    $("#" + id).parent().flash(
        {
            id: id,
            swf: "/flash/plotter.swf",
            height: 830,
            width: "100%",
            flashvars: {
                objectId : id,
                fileUri: fileUri,
                chartType: type,
                title: title,
                plottableColumns: plottableColumns,
                selectableColumns: selectableColumns,
                selectedColumn: selectedColumn,
                description: description
            },
            allowscriptaccess: "sameDomain"
        }
    );
}

//deprecated
function addFlashPlotter(id, fileUri, type, title, plottableColumns){
    var flashvars = {};
    flashvars.objectId = id;
    flashvars.fileUri = fileUri;
    flashvars.chartType = type;
    flashvars.title = title;
    flashvars.plottableColumns = plottableColumns;
    var params = {};
    params.quality = "high";
    params.bgcolor = "#ffffff";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    var attributes = {};
    attributes.align = "middle";
    swfobject.embedSWF(
        "/flash/plotter.swf", id,
        "100%", "850px",
        "0.0.0", "",
        flashvars, params, attributes);
    swfobject.createCSS("#" + id, "display:block;text-align:left;");
}

function collapseFlashObject(id, heigth) {
    $("#" + id).parent().height(heigth + 2);
}

function expandFlashObject(id) {
    $("#" + id).parent().height(900);
}

function mobileImageDisplay(imagePath, captionHTML) {
    var theHTML = "<div class=\"research-layout mobile-popup-container\" style=\"display: none;\">" +
                  "<div class=\"article-page-back-to-article\">" +
                  "<a href='#' title='Back to article' data-scroll=\"" + $(window).scrollTop() + "\">" +
                  "<span class='f1r-icon icon-2_back white vmiddle float-left'></span>" +
                  "Back to article</a></div>" +
                  "<img id=\"mobile-image-display\" src=\"" + imagePath + "\" " +
                  "class=\"mobile-image-display\" style=\"\">" +
                  "<div class=\"fig-image-caption\">" + captionHTML + "</div>" +
                  "</div>";
    if ($(".research-layout.mobile-popup-container").size()) {
        $(".research-layout.mobile-popup-container").remove();
    }
    $("body").prepend(theHTML);
    $(".header-wrapper, .content-wrapper, .footer-wrapper").fadeOut(200);
    $(window).scrollTop(0);
    $(".mobile-popup-container").fadeIn(400);
}

(function($) {

    var ModalElement, Element, OriginalElement, ModalElementHeight, ElementHeight, CaptionAndButtonHeight;

    var heightToUse, widthToUse, minimumHeightForTable, captionTableHeight;

    var checkModals = function(){

        // creating variables
        if ($("#fig-panel-popup").length > 0) {
            ModalElement = $('#fig-panel-popup');
            Element = $('.reduced-popup-image-container .fig-image-popup img'); // only the reduced one needs to be resized
            var imageWidth = Element.width();

            if(ModalElement.data("originalRatio") === undefined) {
                // associating to ModalElement.data("originalRatio") the correct ratio of the image (and then avoid to overwrite it)
                ModalElement.data("originalRatio", Element.height()/Element.width());
            }
            CaptionAndButtonHeight = $('.fig-image-caption').height() + 50;
            ModalElementHeight = ModalElement.height();

            if($(window).width() - imageWidth - 90 < 0) {
                Element.width(($(window).width() - 90) + "px");
                Element.height(Element.width() * ModalElement.data("originalRatio") + "px");
            }
            ElementHeight = Element.height();

            var windowIsWiderThanbox = ($(window).height()*0.8 - CaptionAndButtonHeight)/($(window).width()*0.9) < ModalElement.data("originalRatio");
            if( windowIsWiderThanbox ){
                if (ElementHeight + CaptionAndButtonHeight > ModalElementHeight) {
                    heightToUse = ModalElementHeight - CaptionAndButtonHeight;
                } else {
                    heightToUse = $(window).height() * 0.8 - CaptionAndButtonHeight;
                }
                widthToUse = heightToUse/ModalElement.data("originalRatio");
            } else {
                widthToUse = ($(window).width() * 0.9);
                heightToUse = widthToUse * ModalElement.data("originalRatio");
            }

            //Never scale the image more that its original size.
            OriginalElement = $('.original-popup-image-container .fig-image-popup img');

            if (widthToUse && heightToUse){
                if (!(widthToUse > OriginalElement.width() || heightToUse > OriginalElement.height())){
                    Element.css({
                        "overflow-y" : "scroll",
                        "height" : heightToUse + "px",
                        "width" : widthToUse + "px"
                    });
                }
            }
        }

        if ($("#article-modal-table").length > 0) {
            ModalElement = $('#article-modal-table');
            Element = $('.modal-table-container');
            CaptionAndButtonHeight = $('.modal-caption-container').height() + 50;
            ModalElementHeight = ModalElement.height();
            ElementHeight = Element.height();
        }

        if ($("#article-modal-table").length > 0 || $("#fig-panel-popup").length > 0) {
            if (ElementHeight + CaptionAndButtonHeight > ModalElementHeight) {
                heightToUse = ModalElementHeight - CaptionAndButtonHeight;
                minimumHeightForTable = parseInt(ModalElementHeight * 0.6, 10); // Minimum height of 60%
                if (ElementHeight < minimumHeightForTable) { // If the table is less than 60% set new minimum
                    minimumHeightForTable = ElementHeight;
                }
                if (heightToUse < minimumHeightForTable) {
                    heightToUse = minimumHeightForTable;
                    captionTableHeight = ModalElementHeight - 50 - minimumHeightForTable;
                    $('.modal-caption-container').css({
                        "height" : captionTableHeight + "px",
                        "overflow-y" : "scroll"
                    });
                }

                Element.css({
                    "overflow-y" : "scroll",
                    "height" : heightToUse + "px"
                });
            } else if ($("#article-modal-table").length > 0){
                heightToUse = $(window).height() * 0.8 - CaptionAndButtonHeight;

                Element.css({
                    "overflow-y" : "scroll",
                    "height" : heightToUse + "px"
                });
            }
        }
    };

    $(window).on('resize', checkModals);

})(jQuery);