(function($) {

/**
 * jQuery debugging helper.
 *
 * Invented for Dreditor.
 *
 * @usage
 *   $.debug(var [, name]);
 *   $variable.debug( [name] );
 */
jQuery.extend({
  debug: function () {
    // Setup debug storage in global window. We want to look into it.
    window.debug = window.debug || [];

    args = jQuery.makeArray(arguments);
    // Determine data source; this is an object for $variable.debug().
    // Also determine the identifier to store data with.
    if (typeof this == 'object') {
      var name = (args.length ? args[0] : window.debug.length);
      var data = this;
    }
    else {
      var name = (args.length > 1 ? args.pop() : window.debug.length);
      var data = args[0];
    }
    // Store data.
    window.debug[name] = data;
    // Dump data into Firebug console.
    if (typeof console != 'undefined') {
      console.log(name, data);
    }
    return this;
  }
});
// @todo Is this the right way?
jQuery.fn.debug = jQuery.debug;

})(jQuery);
;
(function ($) {

  /**
   * Google CSE utility functions.
   */
  Drupal.googleCSE = Drupal.googleCSE || {};

  Drupal.behaviors.googleCSE = {
    attach: function (context, settings) {
      // Show watermark, if not disabled in module settings.
      if (Drupal.settings.googleCSE.showWaterMark) {
        Drupal.googleCSE.googleCSEWatermark('#search-block-form.google-cse', context);
        Drupal.googleCSE.googleCSEWatermark('#search-form.google-cse', context);
        Drupal.googleCSE.googleCSEWatermark('#google-cse-results-searchbox-form', context);
      }
    }
  };

  /**
   * Show google CSE watermark.
   */
  Drupal.googleCSE.googleCSEWatermark = function(id, context) {
    var f = $(id, context)[0];
    if (f && (f.query || f['edit-search-block-form--2'] || f['edit-keys'])) {
      var q = f.query ? f.query : (f['edit-search-block-form--2'] ? f['edit-search-block-form--2'] : f['edit-keys']);
      var n = navigator;
      var l = location;
      if (n.platform == 'Win32') {
        q.style.cssText = 'border: 1px solid #7e9db9; padding: 2px;';
      }
      var b = function () {
        if (q.value == '') {
          q.style.background = '#FFFFFF url(https://www.google.com/cse/intl/' + Drupal.settings.googleCSE.language + '/images/google_custom_search_watermark.gif) left no-repeat';
        }
      };
      var f = function () {
        q.style.background = '#ffffff';
      };
      q.onfocus = f;
      q.onblur = b;
//      if (!/[&?]query=[^&]/.test(l.search)) {
      b();
//      }
    }
  };

})(jQuery);
;
