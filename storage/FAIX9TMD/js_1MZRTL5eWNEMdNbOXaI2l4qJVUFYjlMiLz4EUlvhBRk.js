(function ($) {
  
  Drupal.behaviors.mediaelementOverrides = {
    attach: function(context, settings) {
      if (settings.mediaelement !== undefined) {
        // @todo Remove anonymous function.
        $.each(settings.mediaelement, function(selector, options) {
          var opts;
          
          options.opts.success = function(player, node) {
            // Add play listener.
            player.addEventListener('play', (function(e) {
              // Add GA event.
              if (typeof _gaq != 'undefined') {
                _gaq.push(['_trackEvent', 'Media', 'Play', player.currentSrc]);
              }
            }), false);
          };
          
          $(selector, context).once('mediaelement', function() {
            if (options.controls) {
              $(this).mediaelementplayer(options.opts);
            }
            else {
              $(this).mediaelement();
            }
          });
        });
      }
      // The global option is seperate from the other selectors as it should be
      // run after any other selectors.
      if (settings.mediaelementAll !== undefined) {
        $('video,audio', context).once('mediaelement', function() {
          $(this).mediaelementplayer();
        });
      }
    }
  };
  
}(jQuery));
;
/**
 * @file
 * JavaScript that handles newsletter subscriptions.
 */
/* globals $ Drupal */

(function ($) {
  'use strict';

  Drupal.behaviors.pri_newsletter_register = {
    attach: function (context, settings) {

      // When gigya form is submitted, save enabled newsletters.
      if (Drupal.settings.gigya.raas.hasOwnProperty('login')) {
        Drupal.settings.gigya.raas.login.onAfterSubmit = function (event) {
          for (var newsletter in Drupal.settings.pri_newsletter_ids) {
            if (event.data.hasOwnProperty(newsletter)) {
              $.cookie(newsletter, event.data[newsletter]);
            }
          }
        };
      }

      // When page loads, check for newsletter cookies.
      var newsletters_to_process = [],
          newsletter_cookie = null;

      for (var newsletter in Drupal.settings.pri_newsletter_ids) {
        newsletter_cookie = $.cookie(newsletter);
        if (newsletter_cookie !== null && newsletter_cookie !== "false") {
          newsletters_to_process.push(newsletter);
        }
      }

      // If there are newsletters to process, process them.
      if (newsletters_to_process.length > 0) {
        var request = $.post('pri_newsletter/subscription/create', {newsletters: newsletters_to_process}, function (response) {
          // If request is successful, then delete the cookies.
          for (var newsletter in Drupal.settings.pri_newsletter_ids) {
            $.cookie(newsletter, null);
          }
        });
      }
    }
  };

})(jQuery);
;
/**
 * @file
 * Handles poll form submittions, etc.
 */
/* globals Drupal $ */
(function ($) {
  'use strict';

  Drupal.behaviors.pri_story_act = {
    attach: function (context, settings) {
      $('.story-act-poll').once(function(index, item) {
        // Decide on a cookie name, and fetch the cookie.
        var $embed = $(item),
            cookieName = 'story-act-poll-' + $embed.data('id'),
            cookie = jQuery.cookie(cookieName);

        // If the cookie doesn't exist, create one.
        if (cookie === null) {
          cookie =  Math.floor(Math.random() * (900000000 - 1000000)) + 1000000;
          jQuery.cookie(cookieName, cookie, {path : '/'});
        }

        // Build object of data that should be sent to form constructor.
        var data = {
          poll: $embed.data('id'),
          story_act: $embed.data('story_act'),
          session: cookie,
          redirect: window.location.pathname,
        };

        // Load form.
        $embed.load('/pri_poll/form/get', data, function(form) { });
      });
    }
  };

})(jQuery);
;
/**
 * @file
 * Javascript file for PRI Related Stories feature.
 *
 */

(function ($) {

  Drupal.behaviors.priRelatedStories = {
    attach: function (context) {
      $('.pri-related-stories-block', context).once( function() {
        var baseUrl = Drupal.settings.priRelatedStories.baseUrl,
            referrer = document.referrer,
            $self = $(this),
            nid = $self.attr('data-nid'),
            display = 'latest',
            reset = 0;

        // Set display in reaction to referrer.
        switch (true) {
          // Draft view.
          case window.location.pathname.substr(-6) === '/draft':
            display = 'latest';
            //display = 'draft';
            reset = 1;
            break;
          // From home page.
          case referrer === baseUrl + '/':
            display = 'latest';
            break;
          // From social.
          case referrer.indexOf('://www.facebook.com') >= 0:
          case referrer.indexOf('://twitter.com') >= 0:
          case referrer.indexOf('://t.co') >= 0:
          case referrer.indexOf('://plus.google.com') >= 0:
          case referrer.indexOf('://plus.url.google.com') >= 0:
            display = 'latest';
            //display = 'shared';
            break;
          default:
            display = 'latest';
            //display = 'similar';
        }

        // Ajax request.
        var xhr = $.ajax({
          type: 'POST',
          url: '/pri-related-stories/' + nid + '/' + display,
          dataType: 'json',
          success: function (data) {
            if (data.success) {
              $self.html(data.content);
              /*Drupal.attachBehaviors(context);*/
            }
          },
          data: {
            'ajax': 1,
            'reset': reset
          }
        });
      });
    }
  };

})(jQuery);
;
/**
 * @file
 * Javascript file for PRI Story Act feature.
 */

(function ($) {

  Drupal.behaviors.priStoryAct = {
    attach: function (context) {
      $('.story-act-cta', context).once(function () {
        var $self = $(this),
            trackingCode = $self.data('tracking-code'),
            $links = $self.find('a');

        $links.click(function () {
          // Send event to Google Analytics.
          if (typeof ga != 'undefined') {
            ga('send', 'event', 'Story Act CTA', 'Click', trackingCode);
          }
        });
      });
    }
  };
})(jQuery);
;
(function ($) {

function extlinkAttach(context) {
  // Strip the host name down, removing ports, subdomains, or www.
  var pattern = /^(([^\/:]+?\.)*)([^\.:]{4,})((\.[a-z]{1,4})*)(:[0-9]{1,5})?$/;
  var host = window.location.host.replace(pattern, '$3$4');
  var subdomain = window.location.host.replace(pattern, '$1');

  // Determine what subdomains are considered internal.
  if (Drupal.settings.extlink.extSubdomains) {
    var subdomains = "([^/]*\\.)?";
  }
  else if (subdomain == 'www.' || subdomain == '') {
    var subdomains = "(www\\.)?";
  }
  else {
    var subdomains = subdomain.replace(".", "\\.");
  }

  // Build regular expressions that define an internal link.
  var internal_link = new RegExp("^https?://" + subdomains + host, "i");

  // Extra internal link matching.
  var extInclude = false;
  if (Drupal.settings.extlink.extInclude) {
    extInclude = new RegExp(Drupal.settings.extlink.extInclude.replace(/\\/, '\\'));
  }

  // Extra external link matching.
  var extExclude = false;
  if (Drupal.settings.extlink.extExclude) {
    extExclude = new RegExp(Drupal.settings.extlink.extExclude.replace(/\\/, '\\'));
  }

  // Extra external link CSS selector exclusion.
  var extCssExclude = false;
  if (Drupal.settings.extlink.extCssExclude) {
    extCssExclude = Drupal.settings.extlink.extCssExclude;
  }

  // Extra external link CSS selector explicit.
  var extCssExplicit = false;
  if (Drupal.settings.extlink.extCssExplicit) {
    extCssExplicit = Drupal.settings.extlink.extCssExplicit;
  }

  // Find all links which are NOT internal and begin with http (as opposed
  // to ftp://, javascript:, etc. other kinds of links.
  // When operating on the 'this' variable, the host has been appended to
  // all links by the browser, even local ones.
  // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
  // available in jQuery 1.0 (Drupal 5 default).
  var external_links = new Array();
  var mailto_links = new Array();
  $("a:not(." + Drupal.settings.extlink.extClass + ", ." + Drupal.settings.extlink.mailtoClass + "), area:not(." + Drupal.settings.extlink.extClass + ", ." + Drupal.settings.extlink.mailtoClass + ")", context).each(function(el) {
    try {
      var url = this.href.toLowerCase();
      if (url.indexOf('http') == 0 
            && (!url.match(internal_link) || (extInclude && url.match(extInclude))) 
            && !(extExclude && url.match(extExclude)) 
            && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
            && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
        external_links.push(this);
      }
      // Do not include area tags with begin with mailto: (this prohibits
      // icons from being added to image-maps).
      else if (this.tagName != 'AREA' 
            && url.indexOf('mailto:') == 0 
	    && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
	    && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
        mailto_links.push(this);
      }
    }
    // IE7 throws errors often when dealing with irregular links, such as:
    // <a href="node/10"></a> Empty tags.
    // <a href="http://user:pass@example.com">example</a> User:pass syntax.
    catch(error) {
      return false;
    }
  });

  if (Drupal.settings.extlink.extClass) {
    // Apply the "ext" class to all links not containing images.
    if (parseFloat($().jquery) < 1.2) {
      $(external_links).not('[img]').addClass(Drupal.settings.extlink.extClass).each(function() { if ($(this).css('display') == 'inline') $(this).after('<span class=' + Drupal.settings.extlink.extClass + '></span>'); });
    }
    else {
      $(external_links).not($(external_links).find('img').parents('a')).addClass(Drupal.settings.extlink.extClass).each(function() { if ($(this).css('display') == 'inline') $(this).after('<span class=' + Drupal.settings.extlink.extClass + '></span>'); });
    }
  }

  if (Drupal.settings.extlink.mailtoClass) {
    // Apply the "mailto" class to all mailto links not containing images.
    if (parseFloat($().jquery) < 1.2) {
      $(mailto_links).not('[img]').addClass(Drupal.settings.extlink.mailtoClass).each(function() { if ($(this).css('display') == 'inline') $(this).after('<span class=' + Drupal.settings.extlink.mailtoClass + '></span>'); });
    }
    else {
      $(mailto_links).not($(mailto_links).find('img').parents('a')).addClass(Drupal.settings.extlink.mailtoClass).each(function() { if ($(this).css('display') == 'inline') $(this).after('<span class=' + Drupal.settings.extlink.mailtoClass + '></span>'); });
    }
  }

  if (Drupal.settings.extlink.extTarget) {
    // Apply the target attribute to all links.
    $(external_links).attr('target', Drupal.settings.extlink.extTarget);
  }

  if (Drupal.settings.extlink.extAlert) {
    // Add pop-up click-through dialog.
    $(external_links).click(function(e) {
     return confirm(Drupal.settings.extlink.extAlertText);
    });
  }

  // Work around for Internet Explorer box model problems.
  if (($.support && !($.support.boxModel === undefined) && !$.support.boxModel) || ($.browser.msie && parseInt($.browser.version) <= 7)) {
    $('span.ext, span.mailto').css('display', 'inline-block');
  }
}

Drupal.behaviors.extlink = {
  attach: function(context){
    extlinkAttach(context);
  }
}

})(jQuery);
;
