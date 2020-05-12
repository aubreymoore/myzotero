'use strict';

/*!
 * A global namespace for F1000 JavaScript
 * Should eventually be in a separate file
 */
var F1000 = F1000 || {};


/*!
 * Menu with items, and optionally sub-menus
 * Keyboard control
 */
F1000.Navbar = function($navbar, options) {

  this.NAVBAR = '.js-navbar';
  this.MAIN_MENU = '.js-main-menu';
  this.NAVBAR_EXPANDED_CLASS = 'has-expanded-navbar';
  this.NAVBAR_BLOCK = '.js-navbar-block';
  this.NAVBAR_SPACERS = '.js-navbar-space';
  this.NAVBAR_TOGGLE = '.js-navbar-toggle';
  this.NAVBAR_SEARCH_TOGGLE = '.js-navbar-search-toggle';
  this.NAVBAR_CLEAR_TOGGLE = '.js-navbar-clear-toggle';

  this.keyCodes = {
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
    END: 35,
    HOME: 36
  };

  var self = this;
  self.init($navbar, options);


  return this;
}


F1000.Navbar.prototype = {

  init: function($navbar, options) {
    this.$navbar = $navbar;
    this.$menus = F1000._.find(this.$navbar, this.MAIN_MENU);
    this.$menuBlock = F1000._.find(this.$navbar, this.NAVBAR_BLOCK);
    this.$toggles = F1000._.find(this.$navbar, this.NAVBAR_TOGGLE);
    this.$searchToggles = F1000._.find(this.$navbar, this.NAVBAR_SEARCH_TOGGLE);
    this.$clearToggles = F1000._.find(this.$navbar, this.NAVBAR_CLEAR_TOGGLE);
    this.$spacers = F1000._.find(document, this.NAVBAR_SPACERS);

    this.menus = this.$menus.map(this.initMenu.bind(this));
    this.height = this.getHeight(this.$navbar);
    this.isExpanded = false;
    this.updateSpacers();

    window.addEventListener('resize', this.onWindowResize.bind(this));
    F1000._.addEventListener(this.$toggles, 'click', this.onToggleClicked.bind(this));
    F1000._.addEventListener(this.$searchToggles, 'click', this.onSearchClicked.bind(this));
    F1000._.addEventListener(this.$clearToggles, 'click', this.onClearClicked.bind(this));

    this._focusOnTransitionEnd = this.focusOnTransitionEnd.bind(this);
  },

  getHeight: function($elem) {
    return $elem.offsetHeight;
  },

  setHeight: function(height) {
    return function($elem) {
      F1000._.css($elem, { height: height + 'px' } );
    }
  },

  setToggleExpanded: function($elem) {
    $elem.setAttribute('aria-expanded', true);
    $elem.classList.add('is-submenu-open');

    return $elem;
  },

  setToggleCollapsed: function($elem) {
    $elem.setAttribute('aria-expanded', false);
    $elem.classList.remove('is-submenu-open');

    return $elem;
  },

  setBlockExpanded: function($elem) {
    $elem.classList.add('is-expanded');
    $elem.classList.remove('is-collapsed');
  },

  setBlockCollapsed: function($elem) {
    $elem.classList.add('is-collapsed');
    $elem.classList.remove('is-expanded');
  },

  updateSpacers: function() {
    this.$spacers.map(this.setHeight(this.height));
  },

  initMenu: function($menu) {
    return new F1000.Menu($menu);
  },

  expand: function() {
    if(this.isExpanded) {
      return this;
    }

    this.$toggles.map(this.setToggleExpanded);
    this.$menuBlock.map(this.setBlockExpanded);
    this.setBlockExpanded(this.$navbar);
    document.body.classList.add(this.NAVBAR_EXPANDED_CLASS);
    this.isExpanded = true;
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    F1000._.addEventListener(this.$menuBlock, 'click', this.onMenuBlockClicked.bind(this));
  },

  collapse: function() {
    if(!this.isExpanded) {
      return this;
    }

    this.$toggles.map(this.setToggleCollapsed);
    this.$menuBlock.map(this.setBlockCollapsed);
    this.setBlockCollapsed(this.$navbar);
    document.body.classList.remove(this.NAVBAR_EXPANDED_CLASS);
    this.isExpanded = false;
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
    F1000._.removeEventListener(this.$menuBlock, 'keydown', this.onKeyDown.bind(this));
  },

  toggle: function() {
    if(this.isExpanded) {
      this.collapse();
    } else {
      this.expand();
    }
  },

  onWindowResize: function(event) {
    this.height = this.getHeight(this.$navbar);
    this.updateSpacers();
  },

  onSearchClicked: function(event) {
    var target = event.currentTarget.getAttribute('data-target');
    var $target = document.getElementById(target);
    this.setBlockExpanded($target);
    
    var $targetToggles = this.$toggles
      .filter(function($toggle) {
        return $toggle.getAttribute('data-target') === target 
      })
      .map(this.setToggleExpanded);
  },

  onClearClicked: function(event) {
    var target = event.currentTarget.getAttribute('data-target');
    var $target = document.getElementById(target);
    this.setBlockCollapsed($target);

    var $targetToggles = this.$toggles
      .filter(function($toggle) { 
        return $toggle.getAttribute('data-target') === target 
      })
      .map(this.setToggleCollapsed);
  },

  onToggleClicked: function(event) {
    event.preventDefault();

    if(event.currentTarget.hasAttribute('data-focus')) {
      var $focusTarget = F1000._.find(document, event.currentTarget.getAttribute('data-focus'));

      if($focusTarget.length > 0) {
        if(this.isExpanded) {
          $focusTarget[0].focus();
        } else {
          this.$focusTarget = $focusTarget[0];
          this.$menuBlock[0].addEventListener('transitionend', this._focusOnTransitionEnd);
          this.expand();
        }
      }
      
    } else {
      this.toggle();
    }
  },

  /**
   * Close the navbar when pressing escape
   */
  onKeyDown: function(event) {

    switch(event.keyCode) {

      // HOME - go to first item
      case this.keyCodes.ESCAPE:
        this.collapse();
      break;
    }
  },

  /**
   * Close the navbar when clicking outside the menu
   */
  onMenuBlockClicked: function(event) {
    if(event.target === this.$menuBlock[0]) {
      this.collapse();
    }
  },

  /**
   * Focus an item after navbar has completed expand transition
   * This is used to focus the search input from the navbar.
   * If we focus the input directly, some browsers will scroll the menu into
   * view instantly, so instead we wait for the transition to complete.
   */
  focusOnTransitionEnd: function(event) {
    this.$menuBlock[0].removeEventListener('transitionend', this._focusOnTransitionEnd);

    if(!this.$focusTarget) {
      return;
    }

    this.$focusTarget.focus();
    this.$focusTarget = null;
  }
}
