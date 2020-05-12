var AOP = AOP || {};

AOP.shareContent = {

  // Services
  SERVICE_CREATE_SHARE: AOP.baseUrl + '/services/platform-share-content/create',

  // Classes/IDs
  SHARE_MODAL_ID: 'shareProduct',
  PRODUCT_BUTTON_CLASS: 'share-product',
  COPY_SHARE_LINK: 'copyShareLink',
  SHARE_LINK_TEXT_ID: 'shareLinkReadonly',

  $shareTool: null,
  $loader: null,
  $modalContent: null,

  messages: {
    error: 'Could not share the content. Please <a href="' + AOP.baseUrl + '/contact">contact customer services</a>.',
    copyText: 'Copying text is not supported in this browser'
  },

  /**
   * Construct the share modal and add it to the page
   */
  initContainer: function () {
    var _self = this;
    _self.$shareTool = $('#' + _self.SHARE_MODAL_ID);
    var sharingPolicyLink = AOP.baseUrl + '/services/open-access-policies/social-sharing';
    if (_self.$shareTool.length === 0) {
      var container = '';
      container += '<div id="' + _self.SHARE_MODAL_ID + '" class="reveal-modal medium" data-reveal>';
      container += '<div class="header">';
      container += '<div class="heading_07">Share content</div>';
      container += '<p>';
      container += 'Copy and paste the content link or use the option below to share it via email.<BR>';
      container += 'Anyone you share the following link with will be able to freely read this content. For more information, please view the <a href="' + sharingPolicyLink + '" target="_blank">Cambridge University Press content sharing policy</a>.';
      container += '</p>';
      container += '</div>';
      container += '<div class="flash-message-container">';
      container += '<div class="flash-message">';
      container += '<div id="ajaxMessages" class="ajaxMessages"></div>';
      container += '</div>';
      container += '</div>';
      container += '<div class="row wrapper no-padding-top">';
      container += '<div class="loader"><img src="/core/system/public/img/ajax_loader_gray_256.gif" alt=""><span>Sharing content...</span></div>';
      container += '<div class="small-12 columns content" style="display:none"></div>';
      container += '<a class="close-reveal-modal">×</a>';
      container += '</div>';
      container += '</div>';
      $('body').append(container);
      _self.$shareTool = $('#' + _self.SHARE_MODAL_ID);
      _self.$loader = _self.$shareTool.find('.loader');
      _self.$modalContent = _self.$shareTool.find('.content');
    }
  },

  /**
   * Initialise the share tool & bind events.
   */
  init: function () {
    var _self = this;
    $(document).ready(function () {
      // Create the modal and add to DOM
      _self.initContainer();
      // Init events
      _self.initEvents();
    });
  },

  /**
   * Bind share tool events
   */
  initEvents: function () {

    var _self = this;

    // Share button
    $('.' + _self.PRODUCT_BUTTON_CLASS).on('click', function (e) {
      e.preventDefault();
      _self.doShareAction(this);
    });

    // Copy share link to clipboard
    _self.$shareTool.on('click', '#' + _self.COPY_SHARE_LINK, function (e) {
      e.preventDefault();
      // Temporarily display the textarea so we can select the contents for copying
      var $shareLinkReadOnly = $('#' + _self.SHARE_LINK_TEXT_ID);
      $shareLinkReadOnly.show().select();
      _self.copyText(function (err) {
        if (err) {
          _self.showMessage(err);
        } else {
          _self.showMessage('The content link has been copied to your clipboard', {alertType: 'info'});
        }
      });
      $shareLinkReadOnly.hide();
    });

    // Close modal
    _self.$shareTool.on('click', '#cancel', function (e) {
      e.preventDefault();
      _self.closeModal();
    });

  },

  /**
   * Reset modal state
   */
  resetModal: function () {
    this.$modalContent.html('').hide();
    this.showLoader();
  },

  /**
   * Generate the share link
   * @param button
   */
  doShareAction: function (button) {

    var _self = this;

    _self.resetModal();
    _self.openModal();

    const data = {
      productId: $(button).data('prodId'),
      productUrl: window.location.origin + window.location.pathname.replace('/core-reader', '')
    };

    $.post(_self.SERVICE_CREATE_SHARE, data).done(function (response) {
      _self.hideLoader();
      if (!response.success) {
        const errorCode = (response.code && response.code > 0 ? ' (Error ' + response.code + ')' : '');
        _self.showMessage(_self.messages.error + errorCode);
      } else {
        _self.$modalContent.html(response.html).show();
      }
    });

  },

  /**
   * Open the share tool modal
   */
  openModal: function () {
    this.$shareTool.foundation('reveal', 'open');
  },

  /**
   * Close the share tool modal
   */
  closeModal: function () {
    this.$shareTool.foundation('reveal', 'close');
  },

  /**
   * Hide the loader
   */
  hideLoader: function () {
    this.$loader.hide();
  },

  /**
   * Show the loader
   */
  showLoader: function () {
    this.$loader.show();
  },

  /**
   * Attempt to copy the currently selected text to the clipboard
   * @param callback
   * @returns {*}
   */
  copyText: function (callback) {
    const copyError = new Error(this.messages.copyText);
    if (!document.execCommand) {
      return callback(copyError);
    }
    if (!document.execCommand('copy')) {
      return callback(copyError);
    }
    return callback();
  },

  /*
   * Show an error/info message
   * Wrapper for AOP.createAlertBox()
   */
  showMessage: function (errorMessage, opts) {
    opts = opts || {};
    opts.scroll = opts.scroll || false;
    opts.alertType = opts.alertType || 'error';
    opts.alertElement = opts.alertElement || (this.$shareTool ? this.$shareTool.find('#ajaxMessages') : $('#ajaxMessages'));
    AOP.createAlertBox(errorMessage || this.messages.error, opts);
  }

};

AOP.shareContent.init();
