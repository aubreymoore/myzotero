// general and main functions go here.
$(function() {
    removeNoJS();
    articleSearchSort();
    bindHeaderSearch();
    dropdownContent();
    headerInfoExpansion();
    signIn.clickable();
    transformTwitterLinks();
    stopSubmitTriggering();
    GAEventsTriggerFunction();
    simpleMouseOver();
    mathJaxTriggerZoomConfig();
    setBrowserSpecificStyles();
    emailPopupHandlers();
    encodeHTML();
    initNavbar();

    if ($('input, textarea').placeholder) {
        $('input, textarea').placeholder();
    }
    /*if ($('#logout-link').length > 0) {
        $('#logout-link').on("click", clearUserData);
    }*/
});

// WORKAROUND FOR CONSOLE.LOG AND IE
(function() {
    consoleIEPatch();
    trimIEPatch();
    bindIEPatch();
})();

// Remove no-js class to trigger css fallbacks
function removeNoJS() {
    $('.no-js').removeClass('no-js');
}

function initNavbar() {
    $('.js-navbar').each(function() {
        new F1000.Navbar(this);

        if (F1000.Sticky) {
            var $topPos = $(this).find('.js-sticky-start');
            var topPos = $topPos.length ? $(this).find('.js-sticky-start').position().top : 1;
            new F1000.Sticky($(this), topPos);
        }
    });
}

/* ENCODE INPUT FIELDS (XSS PREVENTION) */
/* CONVERTS < & > TO PREVENT <script> TAGS AND javascript: TO PREVENT <a href="javascript:alert"> */
function convertToHTML(text) {
    var map = {
        "<script>": "",
        "</script>": "",
        "javascript:": "",
        "<": "&#60;",
        ">": "&#62;"
    };
    return text.replace(/<script>|<\/script>|javascript:|[<>]/gi, function(m) { return map[m]; });
}
function encodeHTML() {
    $("body").on("input", ".check-xss", function (e) {
        var val = $(this).val(),
            out = convertToHTML(val);
    }).on("blur", ".check-xss", function (e) {
        var val = $(this).val(),
            out = convertToHTML(val);
        $(this).val(out);
    });
}
/* END OF XSS PREVENTION CODE */

/*
function clearUserData(event) {
    if ( $.cookie("sticky-note") !== null) {
        $.removeCookie("sticky-note", { path: '/' });
    }
}
*/

// Get page language (navigator.browserLanguage is for IE)
function getCurrentLanguageForResearch() {
    return navigator.browserLanguage || navigator.language;
}

//default top search
function articleSearchSort() {
    $("#top-search-sort, #top-browse-sort").change(function() {
        sortUrl = $(this).val();
        window.location = sortUrl;
    });
}

// Increase the size of the menu bar search field when you click inside it
function bindHeaderSearch() {
    var $searchForm = $("#searchForm");
    var $searchIcon = $searchForm.find('.header-search-icon');
    var $searchInput = $searchForm.find("#header-search-input");
    var $closeSearchIcon = $searchForm.find("#header-search-close");

    $searchInput.off(".search").on("focus.search", function() {
        $searchInput.addClass("is-extended");
        $closeSearchIcon.removeClass("is-hidden");
    });

    $closeSearchIcon.off(".search").on("click.search", function (e) {
        e.preventDefault();
        $searchInput.removeClass("is-extended").val("");
        $closeSearchIcon.addClass("is-hidden");
    });

    $searchForm.on('click', '.header-search-icon', function(e) {
        var $elem = $(e.target);
        if (!$elem.hasClass('header-search-icon-wellcome')) {
            e.preventDefault();// stop click on search icon opening out input field
        }
        if (blankQuery($searchInput.val())) {
            $searchForm.submit();
        } 
    });
}

function blankQuery(value) {
    return $.trim(value) !== '' ? true : false;
}

var ticker =  {
    create : function(tickerId) {
        return '<div id="' + tickerId + '" class="hidden ticker"><img src="/img/ticker.gif"></img></div>';
    },

    show : function(tickerId) {
        $(tickerId).show();
    },

    showInline: function(tickerId) {
        $(tickerId).css({ "display": "inline-block" });
    },

    hide : function(tickerId) {
        $(tickerId).hide();
    }
};

// editorSite is used only for the member management table.
// normalTooltip can be used for any tooltip in the application.
// element - the clicked element for the tooltip to appear
// containerName - the tooltip container name (<div class="tooltip containerName">something</div>)
// left - left offset to the clicked element
// top - top offset to the clicked element
var tooltip = {

    ajaxURL: "/ajax_url_has_not_been_overwritten/",

    notesTooltip : function(element, containerName, id, left, top, noteContent) {
        var editingLabel = "editing";
            addLabel = "ADD";
            editLabel = "READ";
            beforeEditingLabel = $("#note-activate-button-" + id).text().replace(/[ \n\t]/g,""),
            isArticle = element.attr("data-assettype") === 'article';
        // creates tooltip
        tooltip.position(element, containerName, left, top, true);

        /*
         closing and opening handlers
        */
        $(containerName).on("toolTip:close", function(event) {
            $.removeCookie("editingNote", { path: '/' }); //TODO da rivedere se va bene qui
            $(containerName).find("#note-save-button").removeAttr("data-versionid").attr("disabled", "disabled").addClass("is-disabled");
            $(containerName).hide();
            if ($("#note-activate-button-" + id).text() === editingLabel) {
                $("#note-activate-button-" + id).text(beforeEditingLabel);
                if (beforeEditingLabel === editLabel) {
                    $("#note-activate-button-" + id).addClass("orange-text");
                } else {
                    $("#note-activate-button-" + id).removeClass("orange-text");
                }
            }
            // The notes were being saved multiple times. If you had opened a 'Note' 3 times it would get
            // 3 times. This was because the save events were not being cleared correctly.
            // The following line should fix that.
            $("#note-save-button").off("click");
        });

        $(containerName).on("toolTip:open", function(event) {
            //nothing yet
        });

        /*
            after having saved current button's status into beforeEditingLabel (ADD or READ)
            replacing it with "editing..."
            to leave a placeholder for the user, since it is draggable
            TODO fix
        */
        $("#note-activate-button-" + id).removeClass("orange-text");
        $("#note-activate-button-" + id).text(editingLabel);

        /*
            noteContent:String
            if there is already a cookie related to the current ID
            then the cookie uses that noteContent,
            otherwise it uses the DB stored noteContent
        */
        if (noteContent === undefined) {
            noteContent = $("#note-activate-button-" + id).attr("title");

            if ($.cookie("editingNote")) {
                if ( jQuery.parseJSON($.cookie("editingNote").replace(/[\n\r]/g, '\\n')).noteID === id)
                    noteContent = jQuery.parseJSON($.cookie("editingNote").replace(/[\n\r]/g, '\\n')).noteContent;
            }

            $.cookie("editingNote", '{"noteID":"' + id +'", "noteContent":"' + noteContent + '"}', { expires: 1, path: '/', json:true });
        }


        var textAreaField = $(containerName).find("textarea");
        textAreaField.val(noteContent);
        textAreaField.bind('input propertychange', function(event) {
            $("#note-save-button").removeAttr("disabled").removeClass("is-disabled");
            // cookie is updated at any change.
            $.cookie("editingNote", '{"noteID":"' + id + '", "noteContent":"' + $(this).val() + '"}', { expires: 1, path: '/', json:true });
        });
        $("#note-save-button").attr("data-currentid", id);

        // allow notes tooltip to be draggable but don't allow it to go off of the screen
        // for most cases '#highlight-area' covers this but not on the EM page
        if ($('.c-expanding-sidebar-container__main').length > 0) {
            $(containerName).draggable({ containment: ".c-expanding-sidebar-container__main", scroll: false });
        } else {
            $(containerName).draggable({ containment: "#highlight-area", scroll: false });
        }
        $(containerName).show();

        $("#note-discard-button").on("click", function(event) {
            event.preventDefault();
            $(containerName).trigger("toolTip:close");
        });


        $("#show-history").on("click", function(event) {
            event.preventDefault();
            $(containerName).find("#historical-notes").show();
            $(this).hide();
            $(containerName).find("#hide-history").show();
        });

        $("#hide-history").on("click", function(event) {
            event.preventDefault();
            $(containerName).find("#historical-notes").hide();
            $(this).hide();
            $(containerName).find("#show-history").show();
        });

        $("#note-save-button").on("click", function(event) {
            event.preventDefault();
            var noteID = $(this).attr("data-currentid"),
                newNoteContent = $("#note-textarea").val(), // current value of textarea
                oldNoteContent = $("#note-container-" + noteID).text(); // value stored into the span with current ID

            if (newNoteContent != oldNoteContent) {
                $("#note-activate-button-" + noteID).attr("title", newNoteContent);
                var errorIdElement = $("#note-error");
                var ajax = new R.Ajax();
                ajax.settings.url = tooltip.ajaxURL;
                ajax.onSuccess = function(response) {
                    if (response === false) {
                        errorIdElement.show();
                    } else {
                        $("#note-textarea").parent().trigger("toolTip:close");
                        $("#note-container-" + noteID).text(newNoteContent);
                        if ($("#note-textarea").val() === "") {
                            if ($("#flagged-note-hidden").val() !== "") {
                                $("#note-activate-button-" + noteID).attr("title", $("#flagged-note-hidden").val());
                            } else {
                                $("#note-activate-button-" + id).text(addLabel);
                                $("#note-activate-button-" + id).removeClass("orange-text");
                            }
                        } else {
                            $("#note-activate-button-" + id).text(editLabel);
                            $("#note-activate-button-" + id).addClass("orange-text");
                        }
                    }
                };
                ajax.onError = function(response) {
                    errorIdElement.show();
                };

                if (isArticle) {
                    ajax.submit({note: newNoteContent, priority: false});
                } else {
                    ajax.submit({notes : newNoteContent});
                }
            } else {
                $("#note-textarea").parent().trigger("toolTip:close");
            }
            $("#note-save-button").off("click");
        });
    },

    clean: function(containerName) {
        $(containerName).find("textarea").attr('readonly', false);
        $("#note-save-button").show();
        $(containerName).find("#historical-notes").html("").hide();
        $(containerName).find("#last-edited-detail").html("");
        $(containerName).find("#note-error").html("");
        $(containerName).find("#show-history").show();
        $(containerName).find("#hide-history").hide();
        $(containerName).find("#flagged-note").html("");
        $(containerName).find("#flagged-note-hidden").val("");
    },

    notesTooltipRO: function(element, containerName, id, left, top, notes) {
        tooltip.notesTooltip(element, containerName, id, left, top, notes);
        $(containerName).find("textarea").attr('readonly', true);
        $("#show-history").hide();
        $("#note-save-button").hide(); //is not hidden
    },

    notesTooltipWithDetail : function(element, containerName, id, left, top, data) {
        var created = "",
            editor = "",
            div = "";

        if (data.notes.length < 2) {
            $("#show-history").hide();
        }

        if (data.flagedNote !== undefined && data.flagedNote !== null && data.flagedNote.notes.length > 0) {
            if (data.flagedNote.editor !== undefined &&  data.flagedNote.editor !== null) {
                 editor =  data.flagedNote.editor;
                 created = new Date( data.flagedNote.created);
                 div = "<div><b>"+editor.citationShortName+" "+created.format("DD MMM YYYY")+"</b></div>";
            }
            $(containerName).find("#flagged-note").append("<div style='border: 1px solid red; padding: 4px;'>"+div+data.flagedNote.notes+"</div>");
            $(containerName).find("#flagged-note-hidden").val(data.flagedNote.notes);
        }

        if (data.notes.length > 0) {
            //var iterator = new Iterator(data.notes);
               var isFilledMain = false;
               var isFilledFlagged = false;
               for (var i = 0; i< data.notes.length; i++) {
                    var item = data.notes[i];
                    if (!isFilledMain) {
                        if (item.editor !== undefined && item.editor !== null)
                            $(containerName).find("#last-edited-detail").html("<b>"+item.editor.citationShortName +" "+new Date(item.created).format("DD MMM YYYY")+"</b>");
                            tooltip.notesTooltip(element, containerName, id, left, top, item.notes);
                            isFilledMain = true;
                    } else {
                        div="";
                        if (item.editor !== undefined && item.editor !== null) {
                            editor = item.editor;
                            created = new Date(item.created);
                            div = "<div><b>"+editor.citationShortName+" "+created.format("DD MMM YYYY")+"</b></div>";
                        }
                        $(containerName).find("#historical-notes").append("<div class='note'>"+div+item.notes+"</div><br>");
                    }
               }
        } else {
            tooltip.notesTooltip(element, containerName, id, left, top, "");
        }

      //  if (data.flagedNotes !== undefined && data.flagedNotes !== null && data.flagedNotes.length > 0) {
      //      $(containerName).find("#flagged-note").html(data.flagedNotes[0].notes);
      //  }
    },

    editorSite : function(element, containerName, id, left, top, relative) {
        //positioning and showing up the tooltip
        tooltip.position(element, containerName, left, top, relative);
        $(containerName).show().find("select").attr("data-versionid", id);

        // removing popup if clicking outside the popup container
        $(document).mousedown(function(e) {
            if ($(containerName).has(e.target).length === 0) {
                $(containerName).hide().find("select").removeAttr("data-versionid");
            }
        });
    },

    commentSite : function(element, containerName, id, left, top, relative) {
        //positioning and showing up the tooltip
        tooltip.position(element, containerName, left, top, relative);
        $(containerName).show().find("select").attr("data-commentid", id);

        // removing popup if clicking outside the popup container
        $(document).mousedown(function(e) {
            if ($(containerName).has(e.target).length === 0) {
                $(containerName).hide().find("select").removeAttr("data-commentid");
            }
        });
    },

    normalTooltip : function(element, containerName, left, top, relative) {
        tooltip.position(element, containerName, left, top, relative);
        $(containerName).show();

        // removing popup if clicking outside the popup container
        $(document).mousedown(function(e) {
            $("button.button-is-active").removeClass("button-is-active");
            if ($(containerName).has(e.target).length === 0) {
                $(containerName).hide();
            }
        });
    },

    position : function(element, containerName, xOffset, yOffset, relative) {
        var leftElementPosition = relative ? $(element).position().left : $(element).offset().left,
            topElementPosition = relative ? $(element).position().top : $(element).offset().top;
        $(containerName).css({ 
            left : leftElementPosition - xOffset,
            top : topElementPosition - yOffset
        });
    }
};

// Can be used to resize dropdowns depending on its parent container width.
// You can use padding if the dropdown has a padding attribute inside.
function resizeDropDowns(className, padding) {
    var parentSize = $(className).parent().width();
    $(className).width(parentSize - padding);
}

// Dropdown functionality
function dropdownContent() {
    $(document).click(function(e) {
        var openDropdownWrapper = $(".dropdown-content").filter(":visible").parents(".dropdown-wrapper");
        if (openDropdownWrapper.length > 0 && openDropdownWrapper.has(e.target).length === 0 && !$(e.target).hasClass("dropdown-content") ) {
            hideDropdowns();
        }
    });

    $(".dropdown-label, .dropdown-button-open, .dropdown-button-close, .dropdown-button-show, .dropdown-button-hide").click(function(e) {
        e.preventDefault();
        var theWrapper = $(this).closest(".dropdown-wrapper"),
            articleFilter = theWrapper.hasClass("article-search-filter") ? true : false,
            filterSectionID = "",
            filterSection = "",
            filterTab = "",
            children = $(this).parent().children();

        if (articleFilter) {
            filterSectionID = theWrapper.attr("data-filterSectionID");
            filterSection = $("#" + filterSectionID);
            filterSection.toggleClass("is-hidden");
            if (filterSection.is(":visible")) {
                theWrapper.find(".dropdown-button-show").css({ "display": "none" });
                theWrapper.find(".dropdown-button-hide").css({ "display": "inline-block" });
            } else {
                theWrapper.find(".dropdown-button-show").css({ "display": "inline-block" });
                theWrapper.find(".dropdown-button-hide").css({ "display": "none" });
            }
        } else {
            hideDropdowns();
            if (children.filter(".dropdown-content").is(":visible")) {
                hideDropdowns();
            } else {
                children.filter(".dropdown-content").slideDown();
                children.filter(".dropdown-button-close").show();
                children.filter(".dropdown-button-open").addClass("shadow");
            }
        }
    });

    $(".version-dropdown").on("mouseleave", function (e) {
        e.preventDefault();
        hideDropdowns();
    });

    function hideDropdowns() {
        $('.dropdown-content').slideUp();
        $('.dropdown-button-close').hide();
        $('.dropdown-button-open').removeClass('shadow');
    }
}

function headerInfoExpansion() {
    $('.article-header-information .contracted-details-label').on('click', function(e) {
        e.preventDefault();
        $(this).siblings(".expanded-details").toggleClass('is-hidden');
        contractExpand($(this));
    });
}

// Contract/Expand Icon
function contractExpand(parent) {
    if (typeof parent !== "undefined") {
        parent.find('.contracted').toggleClass('expanded');
    } else {
        $('.contracted').toggleClass('expanded');
    }
}

// Dropdown arrow change
function dropdownArrowChange() {
    $('.arrow-closed').toggleClass('arrow-opened');
}

// Toggle the visibility of an container depending on the clicked element
// elementId = clicked element ID or Class
// containerId = container ID or Class
function showHide(elementId, containerId) {
    $(elementId).on('click', function(e) {
        e.preventDefault();
        $(containerId).toggleClass('is-hidden');
    });
}

// Function to scroll to any element of the page with jQuery.
function scrollToElement(selector, time, verticalOffset) {
    var timeout = 0;

    if ($(".figshare_widget").length > 0 && window.location.hash !== "") {
        timeout = 2750;
    }

    setTimeout(function() {

        verticalOffset = typeof(verticalOffset) !== 'undefined' ? verticalOffset : 0;
        time = typeof(time) !== 'undefined' ? time : 1000;
        var element = $(selector),
            offset = element.offset();

        if (!offset) {
            return;
        }

        var offsetTop = offset.top + verticalOffset;
        $('html, body').animate({
            scrollTop: offsetTop
        }, time);
    }, timeout);

}

// Helper object for Capture related features
var captchaHelper = {
    clearInput : function() {
        $("input[id=captchaInput]").attr("value", "");
        return this;
    },

    setNewChallengeImage : function() {
        /*IE hack: we *must* send a dummy cuurentTime parameter (or one which changes on every request) in order to
        * override IE's cache policy.
        * Although the header cache directives of the response instruct no caching at *all* IE simply ignores that.
        * */
        $("img[id=captchaImage]").attr("src", "/jcaptcha?currentDate=" + new Date().getTime());
        return this;
    }
};


// Helper that transforms any link into an actual link on a
// given input
function linkify(text) {
    var replaceText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = text.replace(replacePattern1, '<a href="$1">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

// Transform Twitter links into actual links
function transformTwitterLinks() {
    $('.twitter-container .info').each(function() {
        var messageContainer =  $(this).text();
        $(this).html(linkify(messageContainer));
    });
}

// stop inputs from triggering the submit button.
function stopSubmitTriggering() {
    $('#submission-form .form-field').on("focus", "input[type='text']", function(e) {
        $('html').keydown(function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                return false;
            }
        });
    });
}

// Abstracts Google Analytics tracking customisations
var GAHelper = (function() {

    (function (i, s, r) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        },
        i[r].l = 1 * new Date();
    })(window, document, 'ga');

    var defaults = {
        tracking: 'event',
        category: 'F1000',
        action: 'event',
        label: null,
        value: null,
        noninteraction: true,
        network: 'F1000',
        socialAction: 'share',
        target: null,
        pagePath: null
    };

    return {
        // Public method accepts object with tracking options/values
        track: function (options) {
            var opts = $.extend({}, defaults, options);
            if (opts.tracking == 'event') {
                ga('send', 'event', opts.category, opts.action, opts.label, opts.value, { 'nonInteraction': 1 });
            }
            else if (opts.tracking == 'social') {
                ga('send', 'social', opts.network, opts.socialAction, opts.target, { 'page': opts.pagePath });
            }
        }
    };
})();

// GA events
function GAEventsTriggerFunction() {
    var eCategory = "F1000Research";
    if ($("body").hasClass("wellcome-brand")) {
        eCategory = "Wellcome Open Research";
    }

    //PDF download button article page.
    $('.pdf-download-helper').on('click', function() {
        GAHelper.track({category: eCategory, action: 'PDF Download', label: 'Article Page'});
    });

    //Social links article page.
    $('#at_hover a').on('click', function() {
        GAHelper.track({category: eCategory, action: 'Social sharing link', label: 'Article Page'});
    });

    //Email article details, article page.
    $('.email-article').on('click', function() {
        GAHelper.track({category: eCategory, action: 'Email article details', label: 'Article Page'});
    });

    //Version selection, article page.
    $('.version-link').on('click', function() {
        var versionNumer = $(this).attr('gahelper');
        GAHelper.track({category: eCategory, action: 'Version change to version: ' + versionNumer, label: 'Article Page'});
    });

    //Version selection, article page, referee timeline box.
    $(".referee-timeline-version-link").on("click", function() {
        var versionNumber = $(this).attr("gahelper");
        GAHelper.track({category: eCategory, action: "Version change to version: " + versionNumber, label: "Article Page"});
    });

    //Article toolbar links, article page.
    $('.ga-helper-class').on('click', function(e) {
        var clickedElement = $(this).attr('gahelper');
        GAHelper.track({category: eCategory, action: 'Article Toolbar Link: ' + clickedElement, label: 'Article Page'});
    });

    // Articles that may interest you - Article Links
    $(".related-article-row .article-title-and-info a").on("click", function(e) {
        var theTitle = $(this).attr("data-gahelper");
        GAHelper.track({category: eCategory, action: 'Articles That May Interest You: ' + theTitle, label: 'Article Page'});
    });

    // Articles that may interest you - Related Topics
    $(".browse-by-related-topic").on("click", function(e) {
        var theTitle = $(this).attr("data-gahelper");
        GAHelper.track({category: eCategory, action: 'Articles That May Interest You: Browse By Related Topic: ' + theTitle, label: 'Article Page'});
    });

    // Sidebar: Related Article Links
    $(".sidebar-related-article-link").on("click", function(e) {
        var theTitle = $(this).attr("data-gahelper");
        GAHelper.track({category: eCategory, action: 'Related Articles: ' + theTitle, label: 'Article Browse'});
    });

    // Sidebar: F1000Prime Recommendations Links (on Ebola page)
    $(".prime-recommended-box .article-list li a").on("click", function(e) {
        var theTitle = $(this).attr("data-gahelper") || "";
        if (theTitle === "") {
            theTitle = "Unknown Article";
        }
        GAHelper.track({category: eCategory, action: 'F1000Prime Recommendations: ' + theTitle, label: 'Ebola Channel Page'});
    });

    // Articles: Interactive Content
    $("body").on("click", ".article-interactive-omero-container .interactive-omero-button", function() {
        var articleTitle = $("#meta-article-title").val(),
            interactiveContentType = $(this).attr("data-interactive-content-type");
        GAHelper.track({category: eCategory, action: 'Interactive ' + interactiveContentType + ' Content On Article: ' + articleTitle, label: 'Article Page'});
    });
    $(".interactive-content-wrapper .interactive-content-ribbon").on("click", function(e) {
        var articleTitle = $("#meta-article-title").val(),
            interactiveContentType = $(this).attr("data-interactive-content-type");
        GAHelper.track({category: eCategory, action: 'Interactive ' + interactiveContentType + ' Content On Article: ' + articleTitle, label: 'Article Page'});
    });

    // Home Page: Featured Content Tracking
    $(".featured-box.featured-article").on("click", function(e) {
        GAHelper.track({category: eCategory, action: 'Featured Article', label: 'Home Page'});
    });
    $(".featured-box.featured-collection").on("click", function(e) {
        GAHelper.track({category: eCategory, action: 'Featured Channel', label: 'Home Page'});
    });
    $(".featured-box.featured-report .ga-link").on("click", function(e) {
        GAHelper.track({category: eCategory, action: 'Featured Referee Report', label: 'Home Page'});
    });
    $(".featured-box.featured-blogpost .ga-link").on("click", function(e) {
        GAHelper.track({category: eCategory, action: 'Featured Blog Post', label: 'Home Page'});
    });

    // Home Page: Article Submission Tracking
    $(".option-links .submit-manuscript").on("click", function(e) {
        GAHelper.track({category: eCategory, action: 'Submit Your Manuscript Button', label: 'Home Page'});
    });

    // Video Tracking
    $(".video-wrapper .video-controls").on("click", function(e) {
        var videoWrapper = $(this).closest(".video-wrapper"),
            videoRef = videoWrapper.attr("data-gaVideoRef"),
            whatPage = "Home Page";
        if ($("#how-it-works").size() > 0) {
            whatPage = "About/How it Works Page";
        }
        if (videoRef === "" || videoRef === undefined) {
            videoRef = videoWrapper.attr("data-videoID");
        }
        GAHelper.track({category: eCategory, action: 'Video: ' + videoRef, label: whatPage });
    });

    // Footer: F1000Mobile App
    $(".footer .google-play").on("click", function(e) {
        GAHelper.track({category: eCategory, action: 'F1000 Mobile App: Google Play', label: 'Home Page'});
    });
    $(".footer .app-store").on("click", function(e) {
        GAHelper.track({category: eCategory, action: 'F1000 Mobile App: App Store', label: 'Home Page'});
    });

    // About Page: Section Open
    $(".about-list").on("click", ".section-detail li .open-section, .section-detail li .open-row", function(e) {
        GAHelper.track({category: eCategory, action: 'View Section', label: 'About/How it Works Page'});
    });

    // Channels: Sponsor Logos
    $(".sponsors-banner .channel-sponsor-logo").on("click", function(e) {
        var theSponsor = $(this).attr("data-gahelper"),
            theChannel = $(this).attr("data-gahelper-channelname"),
            theAction = "Channel Sponsor: " + theSponsor,
            theLabel = "Channel: " + theChannel;
        if (theSponsor === undefined || theSponsor === "") {
            theAction = "Channel Sponsor: Unknown Sponsor";
        }
        if (theChannel === undefined || theChannel === "") {
            theLabel = "Channel: Unknown Channel";
        }
        GAHelper.track({category: eCategory, action: theAction, label: theLabel });
    });

    // Channels: Related Channel Links
    $(".channel-view-sidebar .related-channel-wrapper a").on("click", function() {
        var theLinkText = $(this).find(".logo-text").text();
        GAHelper.track({category: eCategory, action: "Related Channel Link", label: theLinkText });
    });

    // Subjects Browse: Subjects
    $(".main-subjects-container .subject-wrapper").on("click", function() {
        var theSubject = $(this).attr("data-gahelper") || "Unknown Subject";
        GAHelper.track({category: eCategory, action: 'Subject: ' + theSubject, label: 'Subject Browse' });
    });

    // Assets Thankyou Page - Share
    $(".thankyou-page-share").on("click", function() {
        GAHelper.track({category: eCategory, action: 'Share Asset', label: 'Asset Submission Thankyou Page'});
    });
}

var UI = {
    modalWindow: function(container, maxWidth, maxHeight, callback, transparentBackground, whiteBackground) {
        transparentBackground = transparentBackground || false;
        whiteBackground = whiteBackground || false;
        if ($("#research-overlay").size() > 0) {
            $("#research-overlay").remove();
        }
        if (whiteBackground) {
            $('body').prepend('<div id="research-overlay" class="research-overlay whitebg"></div>');
        } else if (transparentBackground) {
            $('body').prepend('<div id="research-overlay" class="research-overlay transparent"></div>');
        } else {
            $('body').prepend('<div id="research-overlay" class="research-overlay"></div>');
            $('#research-overlay').css("opacity", 0.7);
        }
        $(container).parents('.modal-window-wrapper').removeClass("is-hidden");
        $(container).css({
            'max-width': maxWidth,
            'max-height': maxHeight
        });

        if (callback) {
            callback();
        }

        $('.modal-window-wrapper').click(function(e) {
            var wrapper = $(this);
            if (wrapper.find(".modal-window").has(e.target).length === 0 && !$(e.target).hasClass("modal-window")) {
                UI.closeModal();
            }
        });

        $('.close-modal-button, .modal-window-close-button').click( function(e) {
            var wrapper = $(this).parents('.modal-window-wrapper');
            UI.closeModal();
            e.preventDefault();
        });
    },

    closeModal : function() {
        var wrapper = $('.modal-window-wrapper');
        $('#research-overlay').fadeOut();
        if ($("#multi-image-previous-icon").size() > 0) {
            $("#multi-image-previous-icon").remove();
        }
        if ($("#multi-image-next-icon").size() > 0) {
            $("#multi-image-next-icon").remove();
        }
        wrapper.fadeOut(function() {
            $("body").css({"overflow" : ""});
            $('#research-overlay').remove();
            wrapper.addClass("is-hidden").removeAttr('style');
        });
    }
};

// In some cases, we need to remove the modal window when we click close
// or outside it.
function bindRemoveModalWindow() {

    $('.modal-window-wrapper').on('click', function(e) {
        var wrapper = $(this);

        if (wrapper.find(".modal-window").has(e.target).length === 0 && !$(e.target).hasClass("modal-window")) {
            $("body").css({"overflow" : ""});
            wrapper.remove();
            $('.modal-window-wrapper').unbind('click');
        }
    });

    $('.close-modal-button').on('click', function() {
        var wrapper = $(this).parents('.modal-window-wrapper');
        
        $("body").css({"overflow" : ""});
        wrapper.remove();
        $('.close-modal-button').unbind('click');
    });
}


// function setupSticky() {
//     var $sticky = $('.js-sticky');
//     var windowHeight = $(window).height();

//     $(window).on('scroll', onWindowScroll);

//     function onWindowScroll(evt) {
//         var scrollTop = window.scrollY;
//         var scrollBottom = scrollTop + windowHeight;

//         $sticky.each(function() {
//             var maxTop = $(this).data('max-top');
//             var maxBottom = $(this).data('max-bottom');
//             var position = 
//         });
//     }

//     function onWindowResize(evt) {
//         windowHeight = $(window).height();
//     }
// }


// Simple tooltip that takes the title and shows container
// on mouseover or onmousemove. Nothing happens if the image
// or any of it's parents have the class suppress-tooltip.
function simpleMouseOver() {
    $('body').on('mouseenter', '.simple-hover-tooltip', function() {
        if (shouldSuppressTooltip.call(this)) {
            return;
        }

        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="simple-tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
    });

    $('body').on('mouseleave', '.simple-hover-tooltip', function() {
        if (shouldSuppressTooltip.call(this)) {
            return;
        }

        $(this).attr('title', $(this).data('tipText'));
        $('.simple-tooltip').remove();
    });

    $('body').on('mousemove', '.simple-hover-tooltip', function(e) {
        if (shouldSuppressTooltip.call(this)) {
            return;
        }

        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.simple-tooltip')
        .css({ top: mousey, left: mousex });
    });

    function shouldSuppressTooltip() {
        return $(this).parents(".suppress-tooltip").length > 0 || $(this).hasClass("suppress-tooltip");
    }
}

function mathJaxTriggerZoomConfig() {
    MathJax.Hub.Config({
        menuSettings: {
            zoom: "Click"
        },
        messageStyle: "none"
    });
}

function setBrowserSpecificStyles() {
    var is_chrome = /chrome/i.test( navigator.userAgent );
    if (is_chrome) {
        $("body").addClass("is-chrome");
    }

    if (iecontroller.isIE6 || iecontroller.isIE7 || iecontroller.isIE8 || iecontroller.isIE9 || iecontroller.isIE10 || iecontroller.isIE11) {
        $("body").addClass("is-iebrowser");
    }
}

function setGreyBackgroundColorForMobile(options) {
    options = options || {};
    if ($(window).outerWidth(true) < 811) {
        $(".header-wrapper, .content-wrapper").addClass("gbg");
        if (options.addClassForMobile) {
            $(".content-wrapper").addClass(options.addClassForMobile);
        }
    } else {
        $(".header-wrapper, .content-wrapper").removeClass("gbg");
        if (options.addClassForMobile) {
            $(".content-wrapper").removeClass(options.addClassForMobile);
        }
    }

    $(window).on("resize", function () {
        if ($(window).outerWidth(true) < 811) {
            $(".header-wrapper, .content-wrapper").addClass("gbg");
            if (options.addClassForMobile) {
                $(".content-wrapper").addClass(options.addClassForMobile);
            }
        } else {
            $(".header-wrapper, .content-wrapper").removeClass("gbg");
            if (options.addClassForMobile) {
                $(".content-wrapper").removeClass(options.addClassForMobile);
            }
        }
    });
}

//  Following functions provide a workaround for IE having no 'console'
//  Basically IE will now ignore any 'console.log' commands instead of breaking the code
function consoleIEPatch() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}

function trimIEPatch() {
    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }
}

function bindIEPatch() {
    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5 internal IsCallable function
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
              return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                                   aArgs.concat(Array.prototype.slice.call(arguments)));
            };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
      };
    }
}
//  END OF CONSOLE.LOG WORKAROUND


// CONTROLLER TO HANDLE GRACEFUL DEGRADATION OF IE BROWSER
// IF THE isIE6 RETURNS A TRUE THEN THE BROWSER IS IE6 OR EARLIER
var iecontroller = {

    isIE6: (document.all && !window.XMLHttpRequest) ? true : false,
    isIE7: (document.all && window.XMLHttpRequest && !document.querySelector) ? true : false,
    isIE8: (document.all && document.querySelector && !document.addEventListener) ? true : false,
    isIE9: (document.all && document.addEventListener && !window.atob) ? true : false,
    isIE10: (document.all && window.atob) ? true : false,
    isIE11: (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) ? true : false,
    isEdge: (navigator.userAgent.indexOf("Edge") > -1) ? true : false,

    createBrowserVersionAlertWindow: function() {
        var theHTML =   '<div id="modal-window-wrapper browser-version-modal" class="modal-window-wrapper browser-version-modal">' +
                        '<div class="modal-window-background-mask browser-version-background-mask"></div>' +
                        '<div class="modal-window browser-version-modal-content">' +
                        '<div class="close-browser-version-modal modal-window-close-button"></div>' +
                        '<div class="modal-window-row">' +
                        'Your browser is out of date, and may not work correctly with all features on this website. By closing this window you acknowledge that your experience on this site may be degraded.' +
                        '<p>Please upgrade now in order to benefit from all our site&rsquo;s features. A list of the most popular web browsers can be found below.</p>' +
                        '</div>' +
                        '<div class="modal-window-row">' +
                        '<div class="browser-column">' +
                        '<a href="http://www.google.com/chrome/" target="_blank"><img src="/img/browser_logos/chrome_logo.png" class="browser-logo" border=0 />Chrome</a>' +
                        '</div><div class="browser-column">' +
                        '<a href="https://www.mozilla.org/en-GB/firefox/new/" target="_blank"><img src="/img/browser_logos/firefox_logo.png" class="browser-logo" border=0 />FireFox</a>' +
                        '</div><div class="browser-column">' +
                        '<a href="http://www.opera.com/download/" target="_blank"><img src="/img/browser_logos/opera_logo.png" class="browser-logo" border=0 />Opera</a>' +
                        '</div><div class="browser-column">' +
                        '<a href="http://www.apple.com/uk/safari/" target="_blank"><img src="/img/browser_logos/safari_logo.png" class="browser-logo" border=0 />Safari</a>' +
                        '</div><div class="browser-column">' +
                        '<a href="http://windows.microsoft.com/en-GB/internet-explorer/download-ie" target="_blank"><img src="/img/browser_logos/ie_logo.png" class="browser-logo" border=0 />Internet Explorer</a>' +
                        '</div></div>' +
                        '<div class="modal-window-footer margin-top margin-bottom-20">' +
                        '<button class="general-white-orange-button close-browser-version-modal">Close</button>' +
                        '</div></div></div>';
        if ($("#modal-window-wrapper browser-version-modal").size() === 0) {
            $("body").append(theHTML);
        }
    },

    bindBrowserVersionAlertHandlers: function() {
        $(".close-browser-version-modal").on("click", function() {
            $(".browser-version-background-mask").hide();
            $(".browser-version-modal").hide();
        });
    },

    removeAddThisCounter: function() {
        $(".addthis_counter").each(function(index) { $(this).removeClass("addthis_counter"); });
    }

};
// END OF IECONTROLLER


// CLOSE EMAIL POPUPS
function emailPopupHandlers() {
    $("body").on("click", ".email-popup-close-button, .close-referee-email-popup", function (e) {
        e.preventDefault();
        var popupContainer = $(this).closest(".f1r-email-popup").size() < 1 ? $(this).closest("form").parent() : $(this).closest(".f1r-email-popup");
        closeEmailPopup(popupContainer);
    });

    $("body").on("click", ".submit-and-close", function (e) {
        e.preventDefault();
        var form = $(this).closest("form"),
            popupContainer = $(this).closest(".f1r-email-popup").size() < 1 ? $(this).closest("form").parent() : $(this).closest(".f1r-email-popup");
        form.submit();
        closeEmailPopup(popupContainer);
    });

    function closeEmailPopup(emailPopupContainer) {
        emailPopupContainer.fadeOut(250);
        if ($(".research-overlay").is(":visible")) {
            $(".research-overlay").fadeOut(300, function () {
                $(".research-overlay").remove();
            });
        }
    }
}