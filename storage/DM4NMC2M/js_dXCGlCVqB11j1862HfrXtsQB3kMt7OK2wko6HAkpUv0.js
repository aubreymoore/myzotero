(function ($) {
  $.fn.highwireEqualHeights = function() {
    if (Drupal.behaviors.hasOwnProperty('omegaEqualHeights')) {
      $(window).trigger('resize.omegaequalheights');
    }
  };
})(jQuery);
;
/*
  By default Drupal only does a shallow merge of Drupal.settings, causing many settings in Drupal.settings.highwire to be overwriten
  when a panels-ajax-tab is loaded. This code does it's best to mitigate that by storing a copy of Drupal.settings.highwire just before
  a tab is loaded and then doing a shallow merge on Drupal.settings.highwire after the content is loaded but before events are triggered.
  See JCORE-1791
*/
(function($) {
  var hwsettings = {}; 
  $(document).on("panelsAjaxTabsPreLoad", function(e) {
  	if (typeof(Drupal.settings.highwire) != "undefined") {
  	  hwsettings = Drupal.settings.highwire;
  	}
  });
  $(document).on("panelsAjaxTabsPreBehavior", function(e) {
    $.extend(Drupal.settings.highwire, hwsettings, Drupal.settings.highwire);
  });
})(jQuery);;
/**
 * @file
 * Common JS file
 */
(function ($) {
  Drupal.behaviors.logingpagescroll = {
    attach: function(context) {

    if( $('.pane-highwire-oup-member-login').text().length == 0 ) {
      $('.society-member a').addClass('disabled-tag');
    }

    if( $('.pane-highwire-purchase-link').text().length == 0 ) {
      $('.purchase-short-term a').addClass('disabled-tag');
      $('.purchase-short-term-access').addClass('hidden');
    }

    if( $('.oup-login-prefix .snippet-content').text().length == 0 ) {
      $('.personal-purchase a').addClass('disabled-tag');
      $('.purchase-subscription .pane-content h3').addClass('hidden');
    }

    if( $('.librarian-login .librarian-title').text().length == 0 ) {
      $('.recommend-librarian a').addClass('disabled-tag');
    }

    $('.society-member a').click(function() {
      $('html, body').animate({
        scrollTop: $('.pane-highwire-oup-member-login').offset().top
      }, 1000);
    });

    $('.personal-login a').click(function() {
      $('html, body').animate({
        scrollTop: $('.personal-subscriber').offset().top
      }, 1000);
    });

    $('.institution-login a').click(function() {
      $('html, body').animate({
        scrollTop: $('.institutional-login').offset().top
      }, 1000);
    });

    $('.personal-purchase a').click(function() {
      $('html, body').animate({
        scrollTop: $('.purchase-subscription').offset().top
      }, 1000);
    });

    $('.purchase-short-term a').click(function() {
      $('html, body').animate({
        scrollTop: $('.purchase-short-term-access').offset().top
      }, 1000);
    });

    $('.recommend-librarian a').click(function() {
      $('html, body').animate({
        scrollTop: $('.librarian-login').offset().top
      }, 1000);
    });

  }}
})(jQuery);
;
