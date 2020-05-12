/**
 * @file
 * If the list of authors is greater than 5 rows, hide any row after 5 and add
 * a toggle button to expand the list.
 */
(function ($) {

  // 80 based on 16px line height * 5 rows.
  var authorListHeight = 80;

  // Duration of the animation.
  var animationDuration = 'slow';

  // The expand list text.
  var expandLinkText = Drupal.t('Show all authors');

  // The expand list text.
  var contractLinkText = Drupal.t('Show fewer authors');

  Drupal.behaviors.toggleFullAuthorList = {
    attach: function (context, settings) {

      // The wrapping div around the authors.
      $('.highwire-cite-authors', context).each(function () {
        var authorList = $(this);
        authorList.once('add-author-link', function () {
          var fullHeight = authorList.height();
          // Only act on author lists greater than our target height.
          if (fullHeight > authorListHeight) {
            // The toggle link to insert.
            var showMoreLink = $('<a>', {
              text: expandLinkText,
              href: '#',
              class: 'toggle-author-list'
            });
            // Save the original height, add max-height and insert link.
            authorList.data('full-height', fullHeight).css('max-height', authorListHeight + 'px').after(showMoreLink);
          }
        });
      });

      // When author list show more link is clicked.
      $('.toggle-author-list', context).once('toggle-author-list', function () {
        var toggleLink = $(this);
        toggleLink.click(function (event) {
          event.preventDefault();
          var authorList = toggleLink.prev();
          var fullHeight = authorList.data('full-height');
          // When the list is already expanded.
          if (authorList.hasClass('expanded')) {
            // Animate to collpased height.
            authorList.animate({ 'maxHeight': authorListHeight + 'px' }, animationDuration).removeClass('expanded');
            // Replace text.
            toggleLink.text(expandLinkText);
          }
          else {
            // Animate to full height.
            authorList.animate( {'maxHeight': fullHeight }, animationDuration).addClass('expanded');
            // Replace text.
            toggleLink.text(contractLinkText);
          }
        });
      })
    }
  };
})(jQuery);
;
/**
 * Highwire Article access indicator
 *
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */
(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.highwire_access_indicator = {
    attach: function (context, settings) {
      var items = [];

      // The ajax call seems to error intermittently on the first run through.
      // During subsequent times that drupal.behaviors is loaded, the
      // context is no longer the document object, which was causing it to fail
      // the lookup.
      $access_icons = $('span.highwire-citation-access-check, span.highwire-citation-pdf-download');

      $access_icons.each(function() {
        var itemdata = {
          pisa_id: $(this).closest('[data-pisa-id]').data('pisa-id'),
          apath: $(this).closest('[data-apath]').data('apath'),
          view: $(this).data('request-view'),
        };
        items.push(itemdata);
      });
      if (items.length > 0) {
        $.ajax({
          url: '/highwire/articlecitation/ac',
          type: 'POST',
          data: {'items' : items},
          success: function(data) {
            $access_icons.each(function(index){
              var elem = $(this);
              var pisa_id = $(this).closest('[data-pisa-id]').data('pisa-id');
              var apath   = $(this).closest('[data-apath]').data('apath');
              var view = elem.data('request-view');
              // The key can be defined using other elements, but we should
              // always know a pisa_id and a view.
              if (pisa_id) {
                var ac_key = pisa_id + '||' + view;
              }
              else if (apath) {
                 var ac_key = apath + '||' + view;
               }

              if (data[ac_key]['access'][view] != undefined && data[ac_key]['access'][view] == true) {
                if (elem.hasClass('highwire-citation-access-check')) {
                  elem.children('.highwire-access-icon-user-access').show();
                  elem.children('.highwire-access-icon-no-access').hide();
                }
                else if (elem.hasClass('highwire-citation-pdf-download')) {
                  elem.show();
                }
              }
              else {
                elem.children('.highwire-access-icon-no-access').show();
                elem.children('.highwire-access-icon-user-access').hide();
              }
            });
          },
        });
      }
    }
  };
}(jQuery));
;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox')) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", "event", "Downloads", Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(), Drupal.googleanalytics.getPageUrl(this.href));
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(this.href) });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", "event", "Mails", "Click", this.href.substring(7));
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode != 2 || (Drupal.settings.googleanalytics.trackDomainMode == 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", "event", "Outbound links", "Click", this.href);
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga('send', 'pageview', location.pathname + location.search + location.hash);
    }
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  $(document).bind("cbox_complete", function () {
    var href = $.colorbox.element().attr("href");
    if (href) {
      ga("send", "pageview", { "page": Drupal.googleanalytics.getPageUrl(href) });
    }
  });

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
