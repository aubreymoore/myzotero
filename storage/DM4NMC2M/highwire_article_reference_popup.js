/**
 * Highwire Article References pop up
 *
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */
(function ($) {
  Drupal.behaviors.articleRefPopup = {
    attach: function(context, settings) {
      
      // JCORE-2366: Use event delegation wrapper around cluetip to speed up domready scripting time
      $("body", context).delegate("a.xref-bibr:not(.hasTooltip), a.xref-ref:not(.hasTooltip)", "mouseenter", function (event) {
        var $elem = $(this);
        if( $('a' + $elem.attr('href')).length )  {
          $elem.attr('rel', $elem.attr('href') + "~.ref-cit");

          $elem.cluetip({
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
            width: '650px',
            hideLocal: false,
            sticky: true,
            mouseOutClose: 'both',
            closePosition: 'none',
            dropShadow: false,
            cluetipClass: 'article-ref-popup'
          }).addClass('hasTooltip').trigger('mouseenter');
        }
        else {
          $elem.addClass( "hw-no-refrence");
        }
        
        event.preventDefault();
      });
      
    }
  };
})(jQuery);
