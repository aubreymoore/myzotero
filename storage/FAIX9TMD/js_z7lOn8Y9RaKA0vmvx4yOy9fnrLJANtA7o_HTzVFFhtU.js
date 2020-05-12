Drupal.behaviors.googleAnalyticsET = {
  attach : function (context) {
    // make sure that the google analytics event tracking object or the universal analytics tracking function exists
    // if not then exit and don't track
    if(typeof _gaq == "undefined" && typeof ga == "undefined"){
      return;
    }

    var settings = Drupal.settings.googleAnalyticsETSettings;
    delete settings.selectors.debug;
    var defaultOptions = {
      label: '',
      value: 0,
      noninteraction: false
    };
    var s = new Array();
    for(var i = 0; i < settings.selectors.length; i++) {
      s[i] = settings.selectors[i].selector;
/*
      console.log(i);
      console.log(settings.selectors[i].selector)
*/
    }

    jQuery.each(s,
      function(i, val) {
        jQuery(settings.selectors[i].selector).once('GoogleAnalyticsET').bind(settings.selectors[i].event,
          function(event) {
            settings.selectors[i] = jQuery.extend(defaultOptions, settings.selectors[i]);
            trackEvent(jQuery(this), settings.selectors[i].category, settings.selectors[i].action, settings.selectors[i].label, settings.selectors[i].value, settings.selectors[i].noninteraction)
          }
        );
      }

    );
  }

}

/**
 * trackEvent does the actual call to _gaq.push with the _trackEvent type.
 *
 * trackEvent calls the push method from the _gaq object. It also preforms
 * any token replacements on the category, action, and opt_label parameters.
 *
 * @param $obj
 *   The jQuery object that the click event was called on.
 * @param category
 *   The name you supply for the group of objects you want to track.
 * @param action
 *   A string that is uniquely paired with each category, and commonly used
 *   to define the type of user interaction for the web object.
 * @param opt_label
 *   An optional string to provide additional dimensions to the event data.
 * @param opt_value
 *   An integer that you can use to provide numerical data about the user
 *   event.
 * @param opt_oninteraction
 *   A boolean that when set to true, indicates that the event hit will not
 *   be used in bounce-rate calculation.
 */
function trackEvent($obj, category, action, opt_label, opt_value, opt_noninteraction) {
  var href = $obj.attr('href') == undefined ? false : String($obj.attr('href'));

  category = category == '!text' ? String($obj.text()) : (category == '!href' ? href : (category == '!currentPage' ? String(window.location.href) : String(category)));
  action = action == '!text' ? String($obj.text()) : (action == '!href' ? href : (action == '!currentPage' ? String(window.location.href) : String(action)));
  opt_label = opt_label == '!text' ? String($obj.text()) : (opt_label == '!href' ? href : (opt_label == '!currentPage' ? String(window.location.href) : String(opt_label)));

  if (!category || !action) {
    return;
  }

  if (opt_label == '!test' || Drupal.settings.googleAnalyticsETSettings.settings.debug) {
    debugEvent($obj, category, action, opt_label, opt_value, opt_noninteraction);
  }
  else if( typeof _gaq != 'undefined' ){
    _gaq.push(['_trackEvent', String(category), String(action), String(opt_label), Number(opt_value), Boolean(opt_noninteraction)]);
  }
  else {
    ga('send', {
      'hitType': 'event',
      'eventCategory': String(category),
      'eventAction': String(action),
      'eventLabel': String(opt_label),
      'eventValue': Number(opt_value),
      'nonInteraction': Boolean(opt_noninteraction)
    });
  }
}

/**
 * A simple debug function that matches the trackEvent function.
 */
function debugEvent($obj, category, action, opt_label, opt_value, opt_noninteraction) {
  // Saftey First, safe use of console in IE.
  // http://blog.patspam.com/2009/the-curse-of-consolelog
  if (!("console" in window)) {
    alert(category + ' ' + action  + ' ' + opt_label + ' ' + opt_value);
  }
  else {
    var trackerObject = {
        category : category,
        action : action,
        opt_label : opt_label,
        opt_value : opt_value,
        opt_noninteraction : opt_noninteraction,
        $object : $obj
    }
    console.log(trackerObject);
  }
}
;
/**
 * @file dfp.js
 * Contains JS that handles DPF ad rendering.
 */

/* globals jQuery Drupal window googletag */

(function ($, Drupal, window) {
  'use strict';

  /**
   * Special handling for dfp ads.
   */
  Drupal.behaviors.dfpAds = {
    attach: function (context, settings) {

      // Create a reference to slot elements.
      var ATF = '.pane-dfp-pri-ros-atf-300x250, .pane-dfp-pri-ros-atf-300x600';
      var BTF = '.pane-dfp-pri-ros-btf-300x250';
      var VID = '.pane-dfp-in-content-video';
      var $slots = $(ATF + ', ' + BTF + ', ' + VID);

      // Create a reference to all sections, where a section is a piece of
      // content that should be considered when determining where on the page
      // an advertisement should be placed.
      var p = '#main-content article.node >';
      var $sections = $([p, 'p,', p, 'h2,', p, 'iframe,', p, 'div,'].join(' '));
      var sectionCount = $sections.length;
      var width = $(window).width();
      var $ad;

      var positionAds = function () {
        // If the window is over 960 pixels wide, exit. No positioning needs to be
        // done, all the ads are in the correct spot.
        if (width > 960) {
          return;
        }

        // Goes through each ad slot and positions it.
        $slots.each(function () {
          $ad = $(this);

          // If this an ATF ad, do not display it on mobile pages.
          if ($ad.is(ATF)) {
            $ad.remove();
            return;
          }

          // There are under 4 sections on the page. Position ads accordingly.
          if (sectionCount < 4 || (sectionCount > 3 && sectionCount < 9)) {
            // Unless the ad is the video ad, hide it.
            if (!$ad.is(VID)) {
              $ad.hide();
              return;
            }
          }

          // If this ad is BTF, insert it after the 9th section.
          if ($ad.is(BTF)) {
            $($sections[9]).append($ad);
            return;
          }
        });
      };

      // Position ads, and then refresh them.
      positionAds();
      if (typeof googletag !== 'undefined') {
        $('body').once(function () {
          googletag.cmd.push(function () {
            googletag.pubads().refresh();
          });
        });
      }
    }
  };
})(jQuery, Drupal, window);
;
/**
 * @file adblock.js
 * Contains code that handles users with Adblock.
 */

// Display Message to Adblock users
(function ($) {

  Drupal.behaviors.adBlock = {
    attach: function (context, settings) {
      // Function called if AdBlock is not detected
      function adBlockNotDetected() {
      }
      // Function called if AdBlock is detected
      function adBlockDetected() {
        $('body').addClass('adblock-detected');
        $('.adblock-detected .promo-box').addClass('promo-box--promo').removeClass('promo-box');
        $('.adblock-detected .promo-box--promo').prepend("<div class='promo-box__blocked'><h4>Ad blocker detected</h4><p>We see you have an ad-blocker. We use ads to pay for PRI’s coverage. Would you like to support PRI another way?</p><a class='button' href='/donate/ad-blocker.html?utm_source=adblocker&utm_medium=website&utm_campaign=donations'>Become a supporter</a></div>");
        $('.node-type-story .l-story__main .promo-box__blocked, .promo-box__blocked .promo-box__blocked').remove();
        $('.pane-dfp-pri-ros-atf-300x250 .promo-box__blocked, .pane-dfp-pri-ros-btf-300x250 .promo-box__blocked, .pane-dfp-pri-ros-atf-300x600 .promo-box__blocked, .node-freeform.promo-box--promo .promo-box__blocked').next().remove();
      }

      // Recommended audit because AdBlock lock the file 'blockadblock.js'
      // If the file is not called, the variable does not exist 'blockAdBlock'
      // This means that AdBlock is present
      if(typeof blockAdBlock === 'undefined') {
        adBlockDetected();
      } else {
        blockAdBlock.onDetected(adBlockDetected);
        blockAdBlock.onNotDetected(adBlockNotDetected);
        // and|or
        blockAdBlock.on(true, adBlockDetected);
        blockAdBlock.on(false, adBlockNotDetected);
        // and|or
        blockAdBlock.on(true, adBlockDetected).onNotDetected(adBlockNotDetected);
      }
    }
  };

})(jQuery);
;
/**
 * @file
 * Provides custom Gigya sharing integration.
 *
 * This file essentially duplicates the gigya_sharebar.js file except that it
 * implements the showShareUI() instead of the showShareBarUI().
 *
 * @copyright (c) Copyright 2013 Palantir.net
 */

(function ($) {

/**
 * Trigger the shareUI from a click.
 */
$(document).ready(function() {

  // Catch the click on the custom share link.
  $('.custom_pri_gigya_share').click(function() {

    // Get the settings from the sharebar. Index 1 seems to have the valid data-
    // it is unclear as to why this is so. In the future this should really be
    // abstracted into its own configuration- look at:
    // custom_block_view_social_networking_links() in the future.
    
    settings = (Drupal.settings.gigyaSharebars && (Drupal.settings.gigyaSharebars[0].length > 0)) ? Drupal.settings.gigyaSharebars[0] :
      {
        gigyaSharebar: {
          containerID: null,
          layout: null,
          shareButtons: null,
          shortURLs: "always",
          showCounts: "right",
          ua: {
            description: "[node:summary]",
            imageBhev: "default",
            imageUrl: document.getElementsByTagName('img')[0],
            linkBack: document.URL,
            title: document.getElementsByTagName('title')[0].innerHTML
          },
        userAction: null
    }};



    // Build the media object that will be used for sharing. This code hunts
    // for an image to use.
    // @TODO see custom_block_view_social_networking_links(). This data should
    // be presupplied. We're using the gigya field which should give us this
    // without having to do additional logic here- since we're using the same
    // code that Gigya supplies we rely on them.
    var mediaObj = {type: 'image', href: settings.gigyaSharebar.ua.linkBack};
    if ((settings.gigyaSharebar.ua.imageBhev === 'url') && (settings.gigyaSharebar.ua.imageUrl !== '')) {
      mediaObj.src = settings.gigyaSharebar.ua.imageUrl;
    }
    else if (settings.gigyaSharebar.ua.imageBhev === 'default') {
      if ($('meta[property=og:image]').length > 0) {
        mediaObj.src = $('meta[property=og:image]').attr('content');
      }
      else {
        mediaObj.src = $('#block-system-main img').eq(0).attr('src') || $('img').eq(0).attr('src');
      }
    }
    else {
      mediaObj.src = $('#block-system-main img').eq(0).attr('src') || $('img').eq(0).attr('src');
    }

    // Build the user interaction object. Use the settings that gigya has
    // already built.
    var ua = new gigya.services.socialize.UserAction();
    if (typeof settings.gigyaSharebar.ua.userMessage !== 'undefined') {
      ua.setUserMessage(settings.gigyaSharebar.ua.userMessage);
    }
    if (typeof settings.gigyaSharebar.ua.linkBack !== 'undefined') {
      ua.setLinkBack(settings.gigyaSharebar.ua.linkBack);
      ua.addActionLink(settings.gigyaSharebar.ua.title, settings.gigyaSharebar.ua.linkBack);
    }
    if (typeof settings.gigyaSharebar.ua.title !== 'undefined') {
      ua.setTitle(settings.gigyaSharebar.ua.title);
    }
    if (typeof settings.gigyaSharebar.ua.subtitle !== 'undefined') {
      ua.setSubtitle(settings.gigyaSharebar.ua.subtitle);
    }
    if (typeof settings.gigyaSharebar.ua.description !== 'undefined') {
      ua.setDescription(settings.gigyaSharebar.description);
    }
    ua.addMediaItem(mediaObj);

    // Parameters for the showShareUI method.
    var params = {
      userAction: ua,
      operationMode: 'simpleShare',
      snapToElementID: $(this).parent('.sharing-links__list').attr('id'),
      context: 'simpleShare',
      showMoreButton: true,
      showEmailButton: true
    };

    // Show the share dialog box.
    gigya.socialize.showShareUI(params);

    return false;
  });

 });

})(jQuery);;
/**
 * Gigya sharebar.
 */
(function ($) {
    /**
     * @todo Undocumented Code!
     */
    Drupal.gigya = Drupal.gigya || {};
    Drupal.gigya.showSharebar = function (settings) {
      //build a media object
      var mediaObj = {type: 'image', href: settings.gigyaSharebar.ua.linkBack};
      if ((settings.gigyaSharebar.ua.imageBhev === 'url') && (settings.gigyaSharebar.ua.imageUrl !== '')) {
        mediaObj.src = settings.gigyaSharebar.ua.imageUrl;
      }
      else if (settings.gigyaSharebar.ua.imageBhev === 'default') {
        if ($('meta[property="og:image"]').length > 0) {
          mediaObj.src = $('meta[property="og:image"]').attr('content');
        }
        else {
          mediaObj.src = $('#block-system-main img').eq(0).attr('src') || $('img').eq(0).attr('src');
        }
      }
      else {
        mediaObj.src = $('#block-system-main img').eq(0).attr('src') || $('img').eq(0).attr('src');
      }
      // Step 1: Construct a UserAction object and fill it with data.
      var ua = new gigya.services.socialize.UserAction();
      if (typeof settings.gigyaSharebar.ua.userMessage !== 'undefined') {
        ua.setUserMessage(settings.gigyaSharebar.ua.userMessage);
      }
      if (typeof settings.gigyaSharebar.ua.linkBack !== 'undefined') {
        ua.setLinkBack(settings.gigyaSharebar.ua.linkBack);
        ua.addActionLink(settings.gigyaSharebar.ua.title, settings.gigyaSharebar.ua.linkBack);
      }
      if (typeof settings.gigyaSharebar.ua.title !== 'undefined') {
        ua.setTitle(settings.gigyaSharebar.ua.title);
      }
      if (typeof settings.gigyaSharebar.ua.subtitle !== 'undefined') {
        ua.setSubtitle(settings.gigyaSharebar.ua.subtitle);
      }
      if (typeof settings.gigyaSharebar.ua.description !== 'undefined') {
        ua.setDescription(settings.gigyaSharebar.ua.description);
      }
      ua.addMediaItem(mediaObj);
      // Step 2: Define the Share Bar Plugin's params object.
      var params = jQuery.extend(true, {}, settings.gigyaSharebar);
      delete params.ua;
      params.userAction = ua;
      // Step 3: Load the Share Bar Plugin.
      gigya.services.socialize.showShareBarUI(params);

    };
    Drupal.behaviors.gigyaShareBar = {
      attach: function (context, settings) {
        if (typeof gigya !== 'undefined') {
          if (typeof Drupal.settings.gigyaSharebars != 'undefined') {
            $.each(Drupal.settings.gigyaSharebars, function (index, sharebar) {
              Drupal.gigya.showSharebar(sharebar);

            });
          }
        }
      }
    };
})(jQuery);

;
/**
 * @file
 * Gigya reactions.
 */
(function ($) {
    /**
     * @todo Undocumented Code!
     */
    Drupal.gigya = Drupal.gigya || {};
    Drupal.gigya.showReactionbar = function (settings) {
      //build a media object
      var reactions_str = '[' + settings.gigyaReactions.reactions + ']';
      var reactions =  JSON.parse(reactions_str);
      delete settings.gigyaReactions.reactions;
      var mediaObj = {type: 'image', href: settings.gigyaReactions.ua.linkBack};
      if ((settings.gigyaReactions.ua.imageBhev === 'url') && (settings.gigyaReactions.ua.imageUrl !== '')) {
        mediaObj.src = settings.gigyaReactions.ua.imageUrl;
      }
      else if (settings.gigyaReactions.ua.imageBhev === 'default') {
        if ($('meta[property="og:image"]').length > 0) {
          mediaObj.src = $('meta[property="og:image"]').attr('content');
        }
        else {
          mediaObj.src = $('#block-system-main img').eq(0).attr('src') || $('img').eq(0).attr('src');
        }
      }
      else {
        mediaObj.src = $('#block-system-main img').eq(0).attr('src') || $('img').eq(0).attr('src');
      }
      // Step 1: Construct a UserAction object and fill it with data.
      var ua = new gigya.services.socialize.UserAction();
      if (typeof settings.gigyaReactions.ua.userMessage !== 'undefined') {
        ua.setUserMessage(settings.gigyaReactions.ua.userMessage);
      }
      if (typeof settings.gigyaReactions.ua.linkBack !== 'undefined') {
        ua.setLinkBack(settings.gigyaReactions.ua.linkBack);
        ua.addActionLink(settings.gigyaReactions.ua.title, settings.gigyaReactions.ua.linkBack);
      }
      if (typeof settings.gigyaReactions.ua.title !== 'undefined') {
        ua.setTitle(settings.gigyaReactions.ua.title);
      }
      if (typeof settings.gigyaReactions.ua.subtitle !== 'undefined') {
        ua.setSubtitle(settings.gigyaSharebar.ua.subtitle);
      }
      if (typeof settings.gigyaReactions.ua.description !== 'undefined') {
        ua.setDescription(settings.gigyaReactions.ua.description);
      }
      ua.addMediaItem(mediaObj);
      // Step 2: Define the Share Bar Plugin's params object.
      var params = jQuery.extend(true, {}, settings.gigyaReactions);
      delete params.ua;

      params.reactions = reactions;
      params.userAction = ua;
      // Step 3: Load the Share Bar Plugin.
      gigya.socialize.showReactionsBarUI(params);

    };
    Drupal.behaviors.gigyaReactions = {
      attach: function (context, settings) {
        if (typeof gigya !== 'undefined') {
          if (typeof Drupal.settings.gigyaReactionsBars != 'undefined') {
            $.each(Drupal.settings.gigyaReactionsBars, function (index, reactionbar) {
              Drupal.gigya.showReactionbar(reactionbar);
            });
          }
        }
      }
    };
})(jQuery);

;
/**
 * @file
 * Gigya ratings
 */
(function ($) {
    /**
     * @todo Undocumented Code!
     */
    Drupal.gigya = Drupal.gigya || {};
    Drupal.gigya.showRatings = function (params) {
      gigya.socialize.showRatingUI(params);

    };
    Drupal.behaviors.gigyaRatings = {
      attach: function (context, settings) {
        if (typeof gigya !== 'undefined') {
          if (typeof Drupal.settings.gigyaRaitingsInstances !== 'undefined') {
            $.each(Drupal.settings.gigyaRaitingsInstances, function (index, rating) {
              Drupal.gigya.showRatings(rating);
            });

          }
        }
      }
    };
})(jQuery);

;
/**
 * Storage plugin http://sites.google.com/site/daveschindler/jquery-html5-storage-plugin
 * @author Dave Schindler
 *
 * Distributed under the MIT License
 *
 * Copyright (c) 2010 Dave Schindler
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */

(function(a){function h(a){return d(a,"",-1)}function g(a){return delete localStorage[a]}function f(a){var b,c,d,e;b=a+"=";c=document.cookie.split(";");for(d=0;d<c.length;d++){e=c[d];while(e.charAt(0)===" "){e=e.substring(1,e.length)}if(e.indexOf(b)===0){return e.substring(b.length,e.length)}}return null}function e(a){return localStorage[a]}function d(a,b){var c,d,e;c=new Date;c.setTime(c.getTime()+31536e6);d="; expires="+c.toGMTString();if(typeof a==="string"&&typeof b==="string"){document.cookie=a+"="+b+d+"; path=/";return true}else if(typeof a==="object"&&typeof b==="undefined"){for(e in a){if(a.hasOwnProperty(e)){document.cookie=e+"="+a[e]+d+"; path=/"}}return true}return false}function c(a,b){var c;if(typeof a==="string"&&typeof b==="string"){localStorage[a]=b;return true}else if(typeof a==="object"&&typeof b==="undefined"){for(c in a){if(a.hasOwnProperty(c)){localStorage[c]=a[c]}}return true}return false}var b=typeof window.localStorage!=="undefined";a.extend({Storage:{set:b?c:d,get:b?e:f,remove:b?g:h}})})(jQuery);
