/**
 * Sign-up for email alerts
 * Users enter their email address and we check to see if the address is on the system
 *   1) If it is and they are subscribed, let them know
 *   2) If it is, they aren't subscribed but are signed in, subscribe them
 *   3) If it is, they aren't subscribed but aren't signed in, show a pop up
 *   4) If it isn't then show a pop-up asking them to register
 * For full details see [RESEARCH-5027]
 */
F1000.AlertSignup = function() {
  // external necessities
  this.Globals = F1000.Globals;

  this.form = 'js-email-alert-signup';
  this.msg = this.form + '-msg';
  this.loggedIn = this.form + '-logged-in';
  this.userId = this.form + '-user-id';
  this.frequency = this.form + '-frequency';
  this.email = this.form + '-address';
  this.submitButton = this.form + '-submit';

  this.popup = 'js-email-alert-popup';
  this.popupAction = this.popup + '-action';
  this.popupCancel = this.popup + '-cancel';

  this.init();
};

F1000.AlertSignup.prototype = {
  /**********
   * Initiation 
   **********/

  /**
   * Class start-up
   * 1) Add the event handlers
   * 2) If we've returned to this page after registration/login, show a confirmation message
   */
  init: function() {
    var thisObj = this;

    Array.prototype.forEach.call(document.getElementsByClassName(this.form), function (form) {
      form.querySelector('.' + thisObj.submitButton).addEventListener('click', function(e) { thisObj.handleSubmit(e) }, false);
      form.querySelector('.' + thisObj.email).addEventListener('focus', function(e) { thisObj.handleEmailFocus(e) }, false);
      form.querySelector('.' + thisObj.email).addEventListener('blur', function(e) { thisObj.handleEmailBlur(e) }, false);

      if (window.location.search.indexOf(form.getAttribute('data-email')) !== -1) {
        thisObj.showMsg(form.parentNode.querySelector('.' + thisObj.msg), 'You are now signed up to receive this alert', false);
      }
    });

    document.querySelector('.' + this.popup + ' .' + this.popupCancel).addEventListener('click', function(e) { thisObj.closePopup(e)});
  },


  /**********
   * Getters and Setters
   **********/

  /**
   * Fetch the submitted email from the given element
   * @param  object  el  The email input element
   * @return string      The email
   */
  getEmail: function(el) {
    return el.value.trim();
  },

  /**
   * Fetch the url of the page the user is on. After registration/logon the user will be returned there.
   * @param  string  email  The entered email address
   * @return string         The url to return to plus parameters to pre-populate the form(s) with
   */
  getReturnUrl: function(email) {
    var location = window.location,
      url = location.pathname;

    if (location.search !== '') {
      url += location.search;
    }

    url += '&email=' + email + '&receiveTocAlerts=true';

    if (location.hash !== '') {
      url += location.href;
    }

    return url;
  },


  /**********
   * Event Handler Binding
   **********/

  /**
   * What should happen when the user enters the email field
   * @param  object  e  The event
   */
  handleEmailFocus: function(e) {
    e.currentTarget.classList.remove('form-field-error');
    e.currentTarget.classList.add('form-field-active');
  },

  /**
   * What should happen when the user leaves the email field
   * @param  object  e  The event
   */
  handleEmailBlur: function(e) {
    e.currentTarget.classList.remove('form-field-active');
  },

  /**
   * Handle form submission
   * 1) Hide message element
   * 2) Validate email and continue to check the status of the email if ok
   * @param  object  e  The event
   */
  handleSubmit: function(e) {
    e.preventDefault();

    var btn = e.currentTarget,
      form = F1000.FindAncestor(btn, '.' + this.form),
      validEmail = false;

    this.hideMsg(form.parentNode.querySelector('.' + this.msg));

    validEmail = this.validateEmail(form);

    if (validEmail) {
      this.checkStatus(form);
      // check email signup status
    }
  },


  /**********
   * Methods
   **********/

  /**
   * Check to see if the email is already on the system and subscribed
   * @param  object  form  The form submitted by the user
   */
  checkStatus: function(form) {
    var thisObj = this,
      emailEl = form.querySelector('.' + this.email),
      msgEl = form.parentNode.querySelector('.' + this.msg),
      email = this.getEmail(form.querySelector('.' + this.email)),
      loggedIn = false;

    $.ajax({
      url: '/ajax/alerts/toc/checkUser',
      type: 'GET',
      data: { 'emailAddress': email }
    })
    .always(function(response) {
      switch (true) {
        case response === 'ALREADY_SIGNED_UP': // this email is already receiving alerts
          thisObj.showMsg(msgEl, 'You already subscribe to this alert.', false)
          emailEl.value = '';
          break;
        case response !== '': // email exists but is not receiving alerts
          loggedIn = thisObj.checkLoggedIn(form, response);

          if (loggedIn) {
            thisObj.signup(form);
          } else {
            thisObj.showPopup(email);
          }
          break;
        default: // email is not on the system
          thisObj.showPopup(email);
      }
    });
  },

  /**
   * Check the user's logon status
   * @param  object  form    The form submitted by the user
   * @param  string  userId  The user id from the check email service
   * @return boolean         Success
   */
  checkLoggedIn: function(form, userId) {
    var formUserLoggedIn = form.querySelector('.' + this.loggedIn),
      formUserId = form.querySelector('.' + this.userId);

    if (!formUserLoggedIn || !formUserId) {
      return false;
    }

    if (formUserLoggedIn.value.toUpperCase() !== 'Y') {
      return false;
    }

    if (userId !== formUserId.value) {
      return false;
    }

    return true;
  },

  /**
   * Sign-up users to the email
   * @param  object  form  The form submitted by the user
   */
  signup: function(form) {
    var thisObj = this,
      msgEl = form.parentNode.querySelector('.' + this.msg),
      emailEl = form.querySelector('.' + thisObj.email);

    $.ajax({
      type:  'POST',
      url:   '/ajax/alerts/toc/signup',
      data:  $(form).serialize(),
      dataType: "json"
    })
    .done(function(response) {
      switch (true) {
        case response.success:
          thisObj.showMsg(msgEl, 'You are now signed up to receive this alert', false);
          emailEl.value = '';
          break;
        case response.errors.emailAddress:
        case response === "ALREADY_SIGNED_UP":
          thisObj.showMsg(msgEl, 'You already subscribe to this alert', false);
          emailEl.value = '';
          break;
        default:
          thisObj.showMsg(msgEl, 'A problem occurred, please try again');
          break;
      }
    })
    .fail(function(response) {
      thisObj.showMsg(msgEl, 'A problem occurred, please try again');
    });
  },


  /**********
   * Utility
   **********/

  /**
   * Show the message container
   * @param  object   el     The message container
   * @param  string   msg    The message to show
   * @param  boolean  error  Is this an error message?
   */
  showMsg: function(el, msg, error) {
    if (!el) {
      return false;
    }

    if (error === undefined) {
      error = true;
    }

    if (error) {
      el.classList.add('form-error-text');
    }

    el.innerText = msg;
    el.classList.remove(this.Globals.Classes.HIDDEN);
  },

  /**
   * hide the message container
   * @param  object   el     The message container
   */
  hideMsg: function(el) {
    if (!el) {
      return false;
    }

    el.classList.add(this.Globals.Classes.HIDDEN);
    el.classList.remove('form-error-text');
  },

  /**
   * Show the email alert pop-up
   * @param  string  email  The entered email address
   */
  showPopup: function(email) {
    var returnUrl = this.getReturnUrl(email),
      overlay = document.querySelector('.research-overlay'),
      modal = document.querySelector('.' + this.popup),
      actionLinks = modal.querySelectorAll('.' + this.popupAction);

    // update links
    Array.prototype.forEach.call(actionLinks, function(link) {
      link.href = link.href.substr(0, link.href.indexOf('=') + 1) + returnUrl;
    }); 

    // show overlay and popup
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.classList.add('research-overlay');
      overlay.setAttribute('style', 'opacity: 0.7');
      document.body.appendChild(overlay);
    } else {
      overlay.classList.remove(this.Globals.Classes.HIDDEN);
    }

    modal.classList.remove(this.Globals.Classes.HIDDEN);
  },

  /**
   * Close the email pop-up
   * @param  object  e  The event
   */
  closePopup: function(e) {
    e.preventDefault();

    document.querySelector('.' + this.email).value = '';
    document.querySelector('.' + this.popup).classList.add(this.Globals.Classes.HIDDEN);
    document.querySelector('.research-overlay').classList.add(this.Globals.Classes.HIDDEN);
  },

  /**
   * Validate the entered email
   * @param  object   form    The form submitted by the user
   * @return boolean          Success?
   */
  validateEmail: function(form) {
    var emailEl = form.querySelector('.' + this.email),
      msgEl = form.parentNode.querySelector('.' + this.msg),
      email = this.getEmail(emailEl);

    if (email === '' || emailEl.validity.valueMissing) {
      this.showMsg(msgEl, 'Please enter an email address');
      return false;
    }

    if (!emailEl.validity.valid || !(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm.test(email))) {
      this.showMsg(msgEl, 'Please enter a valid email address');
      return false;
    }

    return true;
  }
};

new F1000.AlertSignup();


/*!
 * The 'closest' API doesn't yet have great enough coverage (IE) to be used standalone.
 * This polyfill (which should, perhaps be used with one for 'matches') deals with that.
 * Taken from https://stackoverflow.com/a/42873108
 * @param element  el   The element whose ancestor is sought
 * @param string   sel  The selector of the ancestor
 */
F1000.FindAncestor = function(el, sel) {
  if (el && sel.length > 0) {

    if (typeof el.closest === 'function') {
      return el.closest(sel) || null;
    }

    while (el) {
      if (el.matches(sel)) {
        return el;
      }
      el = el.parentElement;
    }
  }

  return null;
};
