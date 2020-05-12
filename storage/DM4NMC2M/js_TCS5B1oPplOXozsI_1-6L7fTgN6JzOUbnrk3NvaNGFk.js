/**
 * Highwire Author pop up
 *
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */
(function ($) {
  Drupal.behaviors.articleAuthorPopup = {
    attach: function(context, settings) {
      // This is a hope-to-be temporary check. This should be loaded together with Cluetip lib. The only known
      // issue can be when markup_cache_object from php caches the wrong JS items. However there is no known way of
      // reproducing it.
      var isCluetipExist = !!jQuery.fn.cluetip;
      if (!isCluetipExist) {
        if (window.console) {
          console.error('HW\'s Cluetip behavior is called without the Cluetip library loaded. Please investigate.');
        }
        return;
      }
      
      // JCORE-2366: Add event delegation wrapper around cluetip
      $("body", context).delegate(".has-author-tooltip span.highwire-citation-author:not(.hasTooltip)", "mouseenter", function (event) {
        var elem = $(this);
        var delta = elem.data('delta');
        var parent = elem.parents('.highwire-article-citation');
        var parentId = parent.attr('id');
        var tooltipElem = "#hw-article-author-popups-" + parentId + " .author-tooltip-" + delta;
        
        if ($(tooltipElem).length > 0) {
          elem.addClass('has-tooltip');
          elem.attr('rel', tooltipElem).cluetip({
            onActivate: function(event) {
              // Disable for mobile
              var activate = true;
              if (Drupal.highwireResponsive) {
                var currentLayout = Drupal.highwireResponsive.getCurrentLayout();
                activate = currentLayout !== 'mobile' ? true : false;
              }
              return activate;
            },
            local: true,
            showTitle: false,
            hideLocal: true,
            sticky: true,
            positionBy: 'topBottom',
            mouseOutClose: 'both',
            closePosition: 'none',
            dropShadow: false,
            arrows: true,
            topOffset: 25,
            cluetipClass: 'article-author-popup'
          }).addClass("hasTooltip").trigger("mouseenter");
          event.preventDefault();
        }
      });
    }
  };
})(jQuery);
;
