/**
 * @file
 * Gigya comments
 */
(function ($) {
    /**
     * @todo Undocumented Code!
     */
    Drupal.gigya.addDrupalComment = function(eventObj) {
      var data = {
        'commentText': eventObj.commentText,
        'UIDSignature': eventObj.user.UIDSignature,
        'uid': eventObj.user.UID,
        'timestamp': eventObj.user.signatureTimestamp,
        'nid': Drupal.settings.gigyaComments.commentsUIparams.streamID
      };
      var base = eventObj.context.id;
      var element_settings = {};
      element_settings.url = '/gigya/comments';
      element_settings.event = 'gigyaComments';
      var ajax = new Drupal.ajax(base, $('#' + eventObj.context.id), element_settings);
      ajax.options.data = data;
      $(ajax.element).trigger('gigyaComments');
    };


    Drupal.gigya.functionName = function (data) {
      gigya.accounts.showScreenSet(Drupal.settings.gigya.raas.login);
    }

    /**
     * @todo Undocumented Code!
     */
    Drupal.settings.gigyaComments.commentsUIparams.onSiteLoginClicked = Drupal.gigya.functionName;

    Drupal.behaviors.gigya_comments =  {
      attach: function(context) {
        if (typeof gigya !== 'undefined') {
          if (typeof Drupal.settings.gigyaComments !== 'undefined') {
            Drupal.settings.gigyaComments.commentsUIparams.onCommentSubmitted = Drupal.gigya.addDrupalComment;
            gigya.comments.showCommentsUI(Drupal.settings.gigyaComments.commentsUIparams);
          }
          else {
            return false;
          }
        }
      }
    };
})(jQuery);
;
/**
 * @file
 * Javascript file for PRI Gigya feature.
 */

(function($) {
  'use strict';

  Drupal.behaviors.priGigyaRaas = {
    attach: function(context, settings) {
      if (typeof gigya !== undefined && Drupal.settings.gigya.loginMode === 'raas') {
        if (Drupal.settings.gigya.raas.login !== undefined) {
          Drupal.settings.gigya.raas.login.onAfterScreenLoad = afterScreenLoad;
        }

        if (Drupal.settings.gigya.raas.profile !== undefined) {
          Drupal.settings.gigya.raas.profile.onAfterScreenLoad = afterScreenLoad;
        }
      }
    }
  };

  function afterScreenLoad() {
    // Override strings.
    if ((gigya.i18n['gigya.services.accounts.plugins.screenSet.js']['en'] !== undefined) || (gigya.i18n['gigya.services.accounts.plugins.screenSet.js']['en'] !== null)) {
      // This looks wonky but if any of these strings are empty the text won't
      // render.
      gigya.i18n['gigya.services.accounts.plugins.screenSet.js']['en']['password_must_contain_at_least'] = 'At least 6';
      gigya.i18n['gigya.services.accounts.plugins.screenSet.js']['en']['num_characters_total'] = 'characters';
      gigya.i18n['gigya.services.accounts.plugins.screenSet.js']['en']['and'] = 'are';
      gigya.i18n['gigya.services.accounts.plugins.screenSet.js']['en']['num_of_the_following_groups'] = 'required.';
    }
  }

  Drupal.behaviors.gigya_comments =  {
    attach: function(context) {
      if (typeof gigya !== 'undefined') {
        if (typeof Drupal.settings.gigyaComments !== 'undefined') {
          var $body = $('body');

          // Prevent Gigya comments from loading multiple times.
          if ($body.hasClass('gigya-comments-loaded') === false) {
            Drupal.settings.gigyaComments.commentsUIparams.onCommentSubmitted = Drupal.gigya.addDrupalComment;
            gigya.comments.showCommentsUI(Drupal.settings.gigyaComments.commentsUIparams);
            $body.addClass('gigya-comments-loaded');
          }
        }
        else {
          return false;
        }
      }
    }
  };

})(jQuery);
;
