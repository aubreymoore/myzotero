$(function(){
    $('.comment-stats .general-white-grey-button, .article-interaction-info .general-white-grey-button, .buttons-wrapper .link-buttons, .track-article-wrapper, .article-interaction-info .article-interaction-button').on('click', '.track-article-button', function (e) {
        var button = $(this),
            id = button.attr('data-article-id'),
            myresearch = $(this).hasClass("myr-tools-icon"),
            extraHTML = myresearch ? "<span class=\"f1r-icon icon-90_track\"></span>" : "",
            clickedItem = e.target || e.srcElement,
            linkToUpdate = $(clickedItem).hasClass("f1r-icon") ? $(this).closest("a") : $(this);
        e.preventDefault();
        $.ajax({
            url: "/ajax/trackArticle/"+id,
            type: "GET",
            success: function(data) {
                if (data === "SUCCESS") {
                    linkToUpdate
                        .removeClass("track-article-button")
                            .addClass("stop-track-article-button article-is-tracked")
                                .html(extraHTML + 'Tracking')
                                    .prop('title', 'Click to stop tracking');
                }
            }
        });
    });

    // TRACK/UNTRACK COLLECTION CONTROLS
    $("#track-collection, #track-empty-collection, #untrack-collection, #untrack-empty-collection").on("click", ".track-collection", function(e) {
        e.preventDefault();
        var collectionID = $(this).attr("data-collectionID"),
            buttonToHide = "track-collection",
            buttonToShow = "untrack-collection",
            srcElementID = $(this).attr("id"),
            trackURL = "/ajax/trackCollection/";
        if (srcElementID === "") {
            if (e.srcElement) {
                srcElementID = e.srcElement.parentElement.id;
            } else if (e.target) {
                srcElementID = e.target.parentElement.id;
            } else {
                srcElementID = $(this).closest(".collections-box-submit").attr("id");
            }
        }
        if (srcElementID === "track-empty-collection") {
            buttonToHide = "track-empty-collection";
            buttonToShow = "untrack-empty-collection";
        } else if (srcElementID === "untrack-collection") {
            trackURL = "/ajax/stopTrackingCollection/";
            buttonToHide = "untrack-collection";
            buttonToShow = "track-collection";
        } else if (srcElementID === "untrack-empty-collection") {
            trackURL = "/ajax/stopTrackingCollection/";
            buttonToHide = "untrack-empty-collection";
            buttonToShow = "track-empty-collection";
        }
        $.ajax({
            url: trackURL + collectionID,
            type: "GET",
            success: function(data) {
                if (data === "SUCCESS") {
                    $("#" + buttonToHide).fadeOut(100, function() { $("#" + buttonToShow).fadeIn(100); });
                }
            }
        });
    });

    $(".track-all-articles-button").click(function (e) {
        var button = $(this);
        var ids = button.attr('data-article-ids');
        e.preventDefault();
        $.ajax({
            url: "/ajax/trackArticles/"+ids,
            type: "GET",
            success: function(data) {
                if (data === "SUCCESS") {
                }
            }
        });
    });
    $('.comment-stats .general-white-grey-button, .article-interaction-info .general-white-grey-button, .buttons-wrapper .link-buttons, .track-article-wrapper, .article-interaction-info .article-interaction-button').on('click', '.stop-track-article-button', function (e) {
        var button = $(this),
            id = button.attr('data-article-id'),
            myresearch = $(this).hasClass("myr-tools-icon"),
            extraHTML = myresearch ? "<span class=\"f1r-icon icon-90_track\"></span>" : "",
            clickedItem = e.target || e.srcElement,
            linkToUpdate = $(clickedItem).hasClass("f1r-icon") ? $(this).closest("a") : $(this);
        e.preventDefault();
        $.ajax({
            url: "/ajax/stopTrackingArticle/"+id,
            type: "GET",
            success: function(data) {
                if (data === "SUCCESS") {
                    linkToUpdate
                        .removeClass("stop-track-article-button article-is-tracked")
                            .addClass("track-article-button")
                                .html(extraHTML + 'Track')
                                    .prop('title', 'Click to receive e-mail alerts on any updates to this article');
                }
            }
        });
    });
    $(".track-article-signin-button").click(function (e) {
        var button = $(this);
        var id = button.attr('data-article-id');
        var currentTarget = $('#sign-in-form .target-field').val();
        if (currentTarget.substring(0, 13) != "/trackArticle") {
            var newTarget = "/trackArticle/" + id + "?target=" + currentTarget;
            $('#sign-in-form .target-field').val(newTarget);
        }
        var registerButton = $('#sign-in-register-button').parent('a');
        if (registerButton.attr('href') == "/register") {
            registerButton.attr('href', "/register?trackArticles=" + id);
        }
    });
    $(".track-collection-signin-button").click(function (e) {
        var button = $(this);
        var collectionId = button.attr('data-collectionID');
        var currentTarget = $('#sign-in-form .target-field').val();
        if (currentTarget.substring(0, 16) != "/trackCollection") {
            var newTarget = "/trackCollection/" + collectionId + "?target=" + currentTarget;
            $('#sign-in-form .target-field').val(newTarget);
        }
        var registerButton = $('#sign-in-register-button').parent('a');
        if (registerButton.attr('href') == "/register") {
            registerButton.attr('href', "/register?trackCollection=" + collectionId);
        }
    });

});