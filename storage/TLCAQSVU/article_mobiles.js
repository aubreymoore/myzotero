// CODE FOR MOBILE/RESPONSIVE LAYOUT ON THE ARTICLE PAGE
$(document).ready(function () {
    setGreyBackgroundColorForMobile({ "addClassForMobile": "f1r-article-page-mobile" });
//  ADD SOME MOBILE SPECIFIC ITEMS ON PAGE LOAD
    $(".article-context .generated-article-body .fig.panel > a img, .article-context .generated-article-body .interactive-content-wrapper > img, .article-context .generated-article-body .r-script-bb-living-figure > a > img").each(function (idx, el) {
        var wrapper = $("<span></span>", { class: "research-layout" }),
            circle = $("<span></span>", {
                class: "f1r-icon-circle-wrapper light-grey-bg article-page-mobile-image-icon",
                style: "margin-top: -15px; margin-right: -2px; margin-left: -30px;"
            }).appendTo(wrapper);
        $("<span></span>", { class: "f1r-icon icon-42_new_window orange" }).appendTo(circle);
        $(el).after(wrapper);
    });
    $(".generated-article-footer > div.back-section").each(function (idx, el) {
        var elText = "",
            newItem = "";
        elText = $(el).clone().children().remove().end().text();
        if (elText.length > 0) {
            newItem = "<p>" + elText + "</p>";
            $(el).html($(el).html().replace(elText, newItem));
        }
    });
    $(".comments-list-container .f1r-article-mobile .mobile-sections-divider.versions-divider").last().hide();
    if ($(".f1r-article-page-mobile").size() > 0) {
        if ($(".generated-article-body").size() === 1) {
            if ($(".generated-article-body h2").size() === 0) {
                $(".generated-article-body *").show();
                $(".generated-article-body .article-table").hide();
                $(".generated-article-body .f1r-article-desk").hide();
            }
        } else {
            $(".generated-article-body").each(function (idx, el) {
                if ($(this).find("h2").size() === 0) {
                    $(this).find("*").show();
                    $(this).find(".article-table").hide();
                    $(this).find(".f1r-article-desk").hide();
                }
            });
        }
        $(".generated-article-footer").before("<div class=\"f1r-article-mobile research-layout\"><div class=\"mobile-footer-divider\"><div class=\"divider-bar\"></div></div></div>");

        // RESEARCH-5272: Don't show "view on desktop for interactive features"
        //                for flash content
        //                
        // $(".flashwrapper").before("<div class=\"f1r-article-mobile mobile-interactive-note dataplotter-note\">View on desktop for interactive features<img src=\"/img/icon/interactive_content.png\" class=\"float-right margin-right-40\" /></div>");
        
        $(".generated-article-footer .back-section h2.main-title").first().addClass("add-top-border");
        $(".article-is-retracted, .article-interactive-content-container, .article-interactive-omero-container").hide();
        $(".prime-recommended-wrapper.reference-heading").attr("title", "F1000 Recommended");
    }

//  BIND PAGE FUNCTIONS
    $(".contracted-details a.section-title, .contracted-details .f1r-icon.section-control").on("click", function (e) {
        e.preventDefault();
        var wrapper = $(this).closest(".contracted-details"),
            content = wrapper.find(".expanded-details");
        wrapper.toggleClass("open");
        content.toggleClass("is-hidden");
    });
    $(".article-page-expand-authors").on("click", function (e) {
        e.preventDefault();
        var wrapper = $(this).closest(".authors");
        wrapper.find(".article-page-expand-authors").addClass("open");
        wrapper.find(".article-page-hidden-authors").addClass("open");
    });
    $(".f1r-article-mobile .author-display-control.article-page-hidden-authors").on("click", function (e) {
        e.preventDefault();
        var wrapper = $(this).closest(".authors");
        wrapper.find(".article-page-expand-authors").removeClass("open");
        wrapper.find(".article-page-hidden-authors").removeClass("open");
    });
    $(".article-tools-icon-mobile").on("click", function (e) {
        var content = $(".article-toolbox-content-mobile"),
            isOpen = content.is(":visible"),
            /*connector = content.find(".article-toolbox-content-connector"),
            padAdjust = $(".content").css("padding-left").replace("px", ""),
            connectorAdjust = parseInt(padAdjust, 10) + 1,
            iconLeftPos = parseInt($(this).position().left - connectorAdjust, 10),*/
            sectionClass = $(this).attr("data-section") || "";
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            content.fadeOut(200);
            if (sectionClass !== "") { content.find("." + sectionClass).hide(); }
        } else if (isOpen) {
            $(".article-toolbox-wrapper-mobile .open").removeClass("open");
            content.find(".toolbox-section").hide();
            $(this).addClass("open");
            //connector.css({ "left": iconLeftPos + "px" }).fadeIn(250);
            if (sectionClass !== "") { content.find("." + sectionClass).show(); }
            content.fadeIn(250);
        } else {
            content.find(".toolbox-section").hide();
            $(this).addClass("open");
            //connector.css({ "left": iconLeftPos + "px" }).fadeIn(250);
            if (sectionClass !== "") { content.find("." + sectionClass).show(); }
            content.fadeIn(250);
        }
    });
    $(".mobile-export").on("click", function (e) {
        e.preventDefault();
        var versionID = $("#article-metadata input[name='versionId']").val(),
            exportType = $(this).attr("data-etype"),
            exportURL = "/articles/exportTo?versionId=" + versionID + "&bibliographyReaderFormat=" + exportType;
        if (exportType === "WORKSPACE") {
            window.open($("#workspace-export-url").val());
        } else {
            window.location = exportURL;
        }
    });
    $(".f1r-shares-email").on("click", function (e) {
        e.preventDefault();
        $(this).closest(".toolbox-section-content").find(".email-article-wrapper").animate({
            height: "toggle"
        }, 500);
        $(window).scrollTop($(".article-toolbox-content-mobile").position().top);
    });
    $(".expand-button-mobile").on("click", function (e) {
        e.preventDefault();
        if (!$(this).hasClass("continue-reading-container")) {
            var container = $(this).closest(".expanding-section-mobile"),
                showButton = container.find("button.show"),
                hideButton = container.find("button.hide"),
                dots = container.find(".more-dots"),
                remainingText = container.find(".remaining-text"),
                expandText = $(this).hasClass("show");
            if (expandText) {
                dots.fadeOut(100, function () {
                    remainingText.fadeIn(300);
                    remainingText.css({ display: "inline" });
                });
                showButton.fadeOut(200, function () { hideButton.fadeIn(200); });
            } else {
                remainingText.fadeOut(300, function () { dots.fadeIn(100); });
                hideButton.fadeOut(200, function () { showButton.fadeIn(200); });
            }
        }
    });
    $(".abstract-expand-button-mobile").on("click", function (e) {
        e.preventDefault();
        var container = $(this).closest(".article-abstract"),
            abstractText = container.find(".abstract-text"),
            showButton = container.find("button.show"),
            hideButton = container.find("button.hide"),
            expandText = $(this).hasClass("show");
        abstractText.toggleClass("is-expanded is-collapsed", 400);
        if (expandText) {
            showButton.fadeOut(200, function () { hideButton.fadeIn(200); });
        } else {
            hideButton.fadeOut(200, function () { showButton.fadeIn(200); });
        }
    });
    $(".f1r-article-page-mobile .article-context .generated-article-body h2.main-title").on("click", function (e) {
        e.preventDefault();
        var theSection = $(this).closest(".generated-article-body");
        theSection.toggleClass("open");
        theSection.find(".article-interactive-content-container, .article-interactive-omero-container").toggle();
    });
    $(window).on("resize", function () {
        if ($(window).outerWidth(true) < 811) {
            $(".article-is-retracted").hide();
            if ($(".article-interactive-content-container, .article-interactive-omero-container, .article-custom-figure-container").closest(".generated-article-body").hasClass("open")) {
                $(".article-interactive-content-container, .article-interactive-omero-container, .article-custom-figure-container").show();
            } else {
                $(".article-interactive-content-container, .article-interactive-omero-container, .article-custom-figure-container").hide();
            }
        } else {
            $(".generated-article-body").find(".article-interactive-content-container, .article-interactive-omero-container, .article-custom-figure-container").show();
            $(".article-is-retracted").show();
        }
    });

    $(".f1r-article-page-mobile .article-context .generated-article-footer h2.main-title").on("click", function (e) {
        e.preventDefault();
        var theSection = $(this).closest(".back-section").size() > 0 ? $(this).closest(".back-section") : $(this).closest(".section");
        if (theSection.next("i").size() > 0) {
            if (theSection.hasClass("open")) {
                theSection.next("i").hide();
            } else {
                theSection.next("i").show();
            }
        }
        theSection.toggleClass("open");
    });
    $(".f1r-article-page-mobile .reports-comments .current-referee-status h2.main-title").on("click", function (e) {
        e.preventDefault();
        var theSection = $(this).closest(".reports-comments");
        theSection.toggleClass("open");
        // Build Peer Review Version Borders
        var hasMultipleVersions = $("#article-reports .version-border.current").size() > 0 && $("#article-reports .version-border.previous").size() > 0 ? true : false,
            hasCurrentVersion = $("#article-reports .version-border.current").size() > 0 ? true : false,
            hasPreviousVersion = $("#article-reports .version-border.previous").size() > 0 ? true : false,
            currentVersion = "",
            previousVersionCount = 0,
            versionBorderHeight = 0,
            mAdjust = 0;
        if (hasCurrentVersion) {
            versionBorderHeight = parseInt($("#article-reports .version-border.current").closest(".referee-response-container").outerHeight(true) + 70, 10);
            $(".version-border.current").css({ height: versionBorderHeight + "px", display: "inline-block" }).attr("data-defaultHeight", versionBorderHeight);
        }
        if (hasPreviousVersion) {
            previousVersionCount = $("#article-reports .version-border.previous").size();
            for (var i = 0; i < previousVersionCount; i++) {
                currentVersion = $($("#article-reports .version-border.previous").get(i));
                mAdjust = parseInt(currentVersion.css("margin-top").replace("px", ""), 10);
                mAdjust += i * 10;
                versionBorderHeight = parseInt(currentVersion.closest(".referee-response-container").outerHeight(true) + 70, 10);
                currentVersion.css({ "height": versionBorderHeight + "px", "margin-top": mAdjust + "px", "display": "inline-block" }).attr("data-defaultHeight", versionBorderHeight);
            }
        }
    });
    $(".f1r-article-page-mobile .article-comments .current-article-comment-section h2.main-title").on("click", function (e) {
        e.preventDefault();
        var theSection = $(this).closest(".article-comments");
        theSection.toggleClass("open");
    });
    $(".article-page-mobile-sidebar a.section-title").on("click", function (e) {
        e.preventDefault();
        var theContent = $(this).closest(".article-page-mobile-sidebar").find(".this-section-content");
        createBackToArticlePage(theContent.html());
    });
    $(".mobile-ref-status-help .view-control").on("click", function (e) {
        e.preventDefault();
        var container = $(this).closest(".mobile-ref-status-help").find(".mobile-ref-status-help-content"),
            text = $(this).closest(".mobile-ref-status-help").find(".view-control");
        container.animate({ "height": "toggle" }, 500);
        text.toggleClass("is-hidden");
    });
    $("button[data-scrollto]").on("click", function (e) {
        e.preventDefault();
        var scrollTo = $(this).attr("data-scrollto");
        scrollToElement("#" + scrollTo, 1000, -30);
    });
    $(".close-this-container").on("click", function (e) {
        e.preventDefault();
        var theButton = $(this).closest(".f1000Expander").find(".comment-on-this-report");
        theButton.click();
        scrollToElement(theButton, 500, -100);
    });
    $(".mobile-cite-report").on("click", function (e) {
        e.preventDefault();
        var thePopup = $(this).closest(".referee-report-content").find(".mobile-cite-report-popup-wrapper");
        thePopup.fadeIn(300);
    });
    $(".close-cite-report-popup, .mobile-cite-report-popup-wrapper .bgmask").on("click", function (e) {
        e.preventDefault();
        var theWrapper = $(this).closest(".mobile-cite-report-popup-wrapper");
        theWrapper.fadeOut(300);
    });
    $(".f1r-article-page-mobile .update-text-view-control").on("click", function() {
        var container = $(this),
            theText = container.find(".article-page-general-text-mobile"),
            theButton = container.find(".is-centered"),
            theIcons = $(this).find(".update-box-control .f1r-icon");
        theText.slideToggle(250);
        theButton.toggle();
        theIcons.toggle();
    });
    $("body").on("click", ".article-page-back-to-article", function (e) {
        e.preventDefault();
        var container = $(this).closest(".research-layout"),
            scrollPos = container.find("a").attr("data-scroll") || 0;
        container.fadeOut(200, function () {
            $(".header-wrapper, .content-wrapper, .footer-wrapper").fadeIn(200);
            $(window).scrollTop(scrollPos);
            container.remove();
        });
    });
    $(".copy-cite-article-mobile").on("click", function (e) {
        e.preventDefault();
        autoSelectText("citation-copy-mobile", $("#citation-copy-mobile"));
    });
    $(".copy-cite-report-mobile").on("click", function (e) {
        e.preventDefault();
        var popupContainer = $(this).closest(".mobile-cite-report-popup"),
            theTextContainer = popupContainer.find(".copy-cite-report");
        autoSelectText(theTextContainer.attr("id"), theTextContainer);
    });
    function autoSelectText(containerid, el) {
        var node = document.getElementById(containerid),
            range = "";
        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNodeContents(node);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }
    function createBackToArticlePage(htmlContent) {
        var theHTML = "<div class=\"research-layout mobile-popup-container\" style=\"display: none;\">" +
                      "<div class=\"article-page-back-to-article\">" +
                      "<a href='#' title='Back to article' data-scroll=\"" + $(window).scrollTop() + "\">" +
                      "<span class='f1r-icon icon-2_back white vmiddle float-left'></span>" +
                      "Back to article</a></div>" +
                      htmlContent +
                      "</div>";
        $("body").prepend(theHTML);
        $(".header-wrapper, .content-wrapper").fadeOut(200);
        $(window).scrollTop(0);
        $(".mobile-popup-container").fadeIn(400);
    }
});