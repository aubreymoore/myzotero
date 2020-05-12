jQuery.noConflict();
jQuery( document ).ready(function($) {

    /***** Responsive *****/
    /*********************/
    // Contextual navigation
    $('header').find(".contextual-navigation").find(".menu__dropdown__link").on('click', function() {
        ga('send', 'event', 'Mobile - Contextual Nav', 'click', $('h1').text());
    });
    
    // Mobile menu
    $('.nav__mobile--menu').on('click', function() {
        ga('send', 'event', 'Mobile - Menu Open', 'click', $('h1').text());
    });
    
    // Mobile search
    $('.nav__mobile--search').on('click', function() {
        ga('send', 'event', 'Mobile - Menu Open', 'click', $('h1').text());
    });

    
    /***** Engagement bar *****/
    /**************************/
    // Contact us button
    $('.engagement-bar').find('.contact-form-control').on('click', function() {
        ga('send', 'event', 'Engagement bar - Contact us', 'click', $('h1').text());
    });
    
    // Social sharing links
    $('.engagement-bar').find('.engagement__social-media').find('a').on('click', function() {
        ga('send', 'event', 'Engagement bar - Social media', 'click', $(this).attr("aria-label"));
    });
    
    
    /***** Footer *****/
    /******************/
    // Footer links
    $('footer').find('a').on('click', function() {
        var linkText = "";
        if($(this).attr("aria-label") != undefined) {
            linkText = $(this).attr("aria-label");
        } else {
            linkText = $(this).text();
        }
        ga('send', 'event', 'Footer', 'click', linkText);
    });
    
    // Snapshot subscription
    $('footer').find('.textbox-with-button').find('.btn').on('click', function() {
       ga('send', 'event', 'Footer', 'click', "Newsletter subscription");
    });
    
    
    /****** Call to action ******/
    /****************************/
    $('main').find('.call-to-action').find('.btn').on('click', function() {
       ga('send', 'event', 'Call to action', 'click', $('h1').text());
    });
    
    
    /****** Promotion box ******/
    /***************************/
    $('aside').find('.call-to-action').find('.btn').on('click', function() {
        var promotionTitle = $(this).closest(".callout").find("h2").text();
        var pageURL = window.location.href;
       ga('send', 'event', 'Promotion box - ' + promotionTitle, 'click', pageURL);
    });
    
    
    /****** Chat ******/
    /******************/
    // chat link - from pop up contact us form
    $('#liveagent_button_online_573w0000000PDt2').on('click', function () {
        ga('send', 'event', 'Chat', 'click', 'Contact us form');
    });

    // chat and contact link - from the footer
    $('.footer').find('.chat').find('a').on('click', function () {
        ga('send', 'event', $(this).attr('class'), 'click', 'Footer');
    });
    
    
    /****** News release assets ******/
    /*********************************/
    // Tracks downloaded images
    $('.media-release__images').find('a').on('click', function () {
      var pageUrl = window.location.href;
      var downloadedImg = $(this).closest("li").find("img");
      downloadedImgSrc = downloadedImg[0].currentSrc;
      ga('send', 'event', 'Media Release Image', 'click', downloadedImgSrc, pageUrl);
    });

    // Tracks downloaded videos
    $('.media-release__videos').find('a').on('click', function () {
       var hrefElement = $(this).attr("href");
       var pageUrl = window.location.href;
       if($(this).hasClass("media-release__transcript")) {
            ga('send', 'event', "Media Release Video Transcript", 'click', hrefElement, pageUrl)
       } else {
            ga('send', 'event', "Media Release Video", 'click', hrefElement, pageUrl)
       }
    });
    
   // Tracks downloaded audio
    $('.media-release__audio').find('a').on('click', function () {
       var pageUrl = window.location.href;
       var hrefElement = $(this).attr("href");
       if($(this).hasClass("media-release__transcript")) {
            ga('send', 'event', "Media Release Audio Transcript", 'click', hrefElement, pageUrl)
       } else {
            ga('send', 'event', "Media Release Audio", 'click', hrefElement, pageUrl)
       }
    });
});