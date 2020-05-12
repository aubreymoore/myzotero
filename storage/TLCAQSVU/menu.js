'use strict';

/*!
 * A global namespace for F1000 JavaScript
 * Should eventually be in a separate file
 */
var F1000 = F1000 || {};


/**
 * CustomEvent polyfill for IE
 * Taken from MDN (https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
 */
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();


/*!
 * Menu with items, and optionally sub-menus
 * Keyboard control
 */
F1000.Menu = function($menu, options) {

  this.MENU = 'js-menu';
  this.MENU_ITEM = 'js-menu-item';
  this.MENU_LINK = 'js-menu-link';
  this.MENU_TOGGLE = 'js-menu-toggle';
  this.IS_EXPANDED = 'is-expanded';
  this.IS_COLLAPSED = 'is-collapsed';
  this.IS_INITIALISED = 'is-initialised';
  this.IS_FOCUSED = 'is-focused';
  this.HORIZONTAL = 'horizontal';
  this.VERTICAL = 'vertical';
  this.ITEM_FOCUSED_EVENT = 'itemFocused';
  this.ITEM_BLUR_EVENT = 'itemBlurred';
  this.ITEM_MENU_EXPANDED_EVENT = 'itemMenuExpanded';

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
  self.init($menu, options);

  return this;
}

F1000.Menu.prototype = {

  /**
   * Setup a new menu
   * 
   * @param  {node} $menu   The container for the menu
   * @param  {settings} options Settings.
   * @return {Menu}         The Menu object
   */
  init: function($menu, options) {
    this.settings = options || {
      direction: this.HORIZONTAL,
      setMaxHeight: true
    }

    // Get the elements
    this.$menu = $menu;
    this.$menuItems = F1000._.getDirectChildrenWithClassName(this.$menu, this.MENU_ITEM);

    if(this.$menu.hasAttribute('data-menu-group')) {
      this.settings.menuName = this.$menu.getAttribute('data-menu-group');
    }

    this.isExpanded = this.$menu.classList.contains(this.IS_EXPANDED);
    this.direction = this.settings.direction;
    this._usingMouse = false;

    // Convert the dom elements to objects with references to all their sub
    // children, and intialise any sub-menus.
    this.menuItems = Array.prototype.map.call(this.$menuItems, this.getMenuItem.bind(this));

    // For keyboard control
    this.$menu.addEventListener('keydown', this.onKeyDown.bind(this));

    // For keyboard control
    this.$menu.addEventListener('touchstart', this.onTouchStart.bind(this));

    // Called before focus event, to determine if focus was triggered by the
    // keyboard or the mouse. We use this to differentiate the styles for
    // accessibility purposes
    this.$menu.addEventListener('mousedown', this.onMouseDown.bind(this));


    // Check if someone clicked outside the menu
    window.addEventListener('click', this.onWindowClick.bind(this));

    // Check if an item menu was clicked
    window.addEventListener(this.ITEM_MENU_EXPANDED_EVENT, this.onOtherMenuExpanded.bind(this));

    return this;
  },

  /**
   * Expand the menu, revealing the children
   * @param  {int} focusChild Which child should be focused.
   * @return {Menu}            The menu object
   */
  expand: function() {
    if(this.isExpanded) {
      return this;
    }

    this.$menu.setAttribute('aria-hidden', false);
    this.$menu.classList.add(this.IS_EXPANDED);
    this.$menu.classList.remove(this.IS_COLLAPSED);
    this.isExpanded = true;

    // Hack so we can transition the height of the menu from 0 to auto using css
    // TODO: remove and handle elsewhere so this file can be more generic
    if(this.settings.setMaxHeight && this.settings.direction === this.VERTICAL) {
      this.$menu.style.maxHeight = this.$menu.scrollHeight + 40 + 'px';
    }

    if(this.settings.onExpand) {
      this.settings.onExpand(this);
    }

    return this;
  },

  /**
   * Collapse the menu
   * @return {Menu} the menu object
   */
  collapse: function() {
    if(!this.isExpanded) {
      return this;
    }

    this.$menu.setAttribute('aria-hidden', true)
    this.$menu.classList.remove(this.IS_EXPANDED);
    this.$menu.classList.add(this.IS_COLLAPSED);
    this.isExpanded = false;

    if(this.settings.onCollapse) {
      this.settings.onCollapse(this);
    }

    return this;
  },

  /**
   * Toggle the menu - collapse if expanded, expand if collapsed
   * @return {Menu} The menu object
   */
  toggle: function() {
    if(this.isExpanded) {
      return this.collapse();
    } else {
      return this.expand();
    }
  },

  /**
   * Focus a specific item in this menu
   * @param  {int} index The index of the item to focus, or 'first' or 'last'
   * @return {Menu}       the menu object
   */
  focusItem: function(index) {
    if(index === 'first' || index >= this.menuItems.length) {
      index = 0;
    } else if (index === 'last' || index < 0) {
      index = this.menuItems.length - 1;
    }

    if(this.menuItems[index]) {
      this.menuItems[index].focus();
    }

    return this;
  },

  /**
   * Search for items starting with the given string
   * @param  {string} str String to search
   * @return {Array}     Array of MenuItem's
   */
  searchItems: function(str) {
    return this.menuItems.filter(function(item) {
      return item.label.toLowerCase().indexOf(str.toLowerCase()) === 0;
    });
  },

  /**
   * Creates a menu item object. 
   * TODO: move to a separate component
   * @param  {node} $item The node element for the item <li>
   * @param  {int} index The item index within the menu
   * @return {object}       { index, $item, $link, submenus, label }
   */
  getMenuItem: function($item, index) {
    $item.setAttribute('data-index', index);
    $item.addEventListener(this.ITEM_FOCUSED_EVENT, this.onItemFocus.bind(this));
    $item.addEventListener(this.ITEM_BLUR_EVENT, this.onItemBlur.bind(this));

    var menuItem = new F1000.MenuItem($item, this.settings);
    menuItem.index = index;

    return menuItem;
  },

  /**
   * Called before onItemFocus, to determine if the focus was caused by the
   * keyboard, or by the mouse so we can style them differently.
   */
  onMouseDown: function(event) {
    this._usingMouse = true;
  },

  onItemFocus: function(event) {
    this.focusedItem = event.detail.item;
    this.focusedItem.isFocused(this._usingMouse);
  },

  onItemBlur: function(event) {
    this.focusedItem = null;
  },

  onOtherMenuExpanded: function(evt) {
    if(
      (this.settings.menuName && evt.detail.menu !== this.settings.menuName)
      || evt.detail.menu === this
    ) {
      return;
    }

    this.collapse();
  },

  onTouchStart: function(event) {
    event.stopPropagation();
    this._usingMouse = false;
  },

  /**
   * On keydown
   * All keyboard navigation
   * TODO: on character press, go to first item with that character
   *
   * Rules from here:
   * https://www.w3.org/TR/wai-aria-practices-1.1/examples/menubar/menubar-1/menubar-1.html
   */
  onKeyDown: function(event) {
    this._usingMouse = false;

    switch(event.keyCode) {

      // HOME - go to first item
      case this.keyCodes.HOME:
        this.focusItem('first');

        event.preventDefault();
        event.stopPropagation();
        break;

      // END - go to last item
      case this.keyCodes.END:
        this.focusItem('last');

        event.preventDefault();
        break;

      // SPACE and ENTER - active item, either opening the link or expanding
      // the submenus (if there are any)
      case this.keyCodes.SPACE:
      case this.keyCodes.ENTER:
        this.focusedItem.activate();

        event.preventDefault();
        event.stopPropagation();
        break;

      case this.keyCodes.ESCAPE:
        this.collapse();

        event.preventDefault();
        event.stopPropagation();
        break;

      // RIGHT ARROW
      // On the horizontal menu, move to next item, or last item if there are 
      // no previous items.
      // Vertical menus (submenus) do nothing
      case this.keyCodes.RIGHT_ARROW:
        if(this.direction === this.HORIZONTAL) {
          this.focusedItem.collapseSubMenu();
          this.focusItem(this.focusedItem.index + 1);
          event.preventDefault();
          event.stopPropagation();
        }
        
        break;

      // RIGHT ARROW
      // On the horizontal menu, move to previous item, or first item if
      // there are no next items.
      // Vertical menus (submenus) do nothing
      case this.keyCodes.LEFT_ARROW:
        if(this.direction === this.HORIZONTAL) {
          this.focusedItem.collapseSubMenu();
          this.focusItem(this.focusedItem.index - 1);
          event.preventDefault();
          event.stopPropagation();
        }
        
        break;

      // DOWN ARROW
      // On horizontal menu, expand any submenus and focus the first item
      // On vertical menu, go to next item, or first item if there are no 
      // next items.
      case this.keyCodes.DOWN_ARROW:
        if(this.direction === this.HORIZONTAL) {
          this.focusedItem.expandSubMenu('first');
        } else {
          var index = this.focusedItem.index;

          if(++index >= this.menuItems.length) {
            index = 0;
          }

          this.focusItem(index);
        }

        event.stopPropagation();
        event.preventDefault();
        break;

      // UP ARROW
      // On horizontal menu, expand any submenus and focus the last item
      // On vertical menu, go to previous item, or last item if there are
      // no previous items.
      case this.keyCodes.UP_ARROW:
        if(this.direction === this.HORIZONTAL) {
          this.focusedItem.expandSubMenu('last');
        } else {
          var index = this.focusedItem.index;

          if(--index >= this.menuItems.length) {
            index = 0;
          }

          this.focusItem(index);
        }

        event.stopPropagation();
        event.preventDefault();
        break;

      default:
        var itemsStartingWithChar = this.searchItems(event.key);

        if(itemsStartingWithChar.length > 0) {
          var nextItem = itemsStartingWithChar[0];

          for(var i = 0; i < itemsStartingWithChar.length; i++) {
            if(itemsStartingWithChar[i].index > this.focusedItem.index) {
              nextItem = itemsStartingWithChar[i];

              break;
            }
          }

          nextItem.focus();

          event.preventDefault();
          event.stopPropagation();
        }

        break;
    }
  },

  /**
   * On window click
   * Close all menus (if they aren't the ones being clicked)
   */
  onWindowClick: function(event) {

    if(this.isExpanded && this.$menu !== event.target && !$.contains(this.$menu, event.target)) {
      this.collapse();
    }
  }
}


/**
 * Single menu item, with sub-menus
 * @param {node} $menuItem Item container
 * @param {object} options   Settings
 */
F1000.MenuItem = function($menuItem, options) {

  this.MENU = 'js-menu';
  this.MENU_ITEM = 'js-menu-item';
  this.MENU_LINK = 'js-menu-link';
  this.IS_EXPANDED = 'is-expanded';
  this.IS_COLLAPSED = 'is-collapsed';
  this.IS_FOCUSED = 'is-focused';
  this.HORIZONTAL = 'horizontal';
  this.VERTICAL = 'vertical';
  this.ITEM_FOCUSED_EVENT = 'itemFocused';
  this.ITEM_MENU_EXPANDED_EVENT = 'itemMenuExpanded';

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
  self.init($menuItem, options);

  return this;
}

F1000.MenuItem.prototype = {

  init: function($menuItem, options) {
    this.$menuItem = $menuItem;
    this.options = options || {};

    this.test = 0;

     // Find the item link and the submenu toggle
    var $links = F1000._.getDirectChildrenWithClassName(this.$menuItem, this.MENU_LINK);

    if($links.length <= 0) {
      return false;
    }

    this.$link = $links[0];
    this.label = this.$link.text.trim();
    this.href = this.$link.getAttribute('href');

    // Find any submenus
    var $subMenus = F1000._.getDirectChildrenWithClassName(this.$menuItem, this.MENU);

    if($subMenus.length > 0) {
      this.initSubmenu($subMenus);
    }

    // Opens sub-menu, if there is one
    this.$menuItem.addEventListener('mouseenter', this.onMouseEnter.bind(this));

    // Closes sub-menu, if there is one
    this.$menuItem.addEventListener('mouseleave', this.onMouseLeave.bind(this));

    // Adds the is-focused class, if triggered by the keyboard
    this.$menuItem.addEventListener('focusin', this.onFocus.bind(this), true);

    // Removes the is-focused class
    this.$menuItem.addEventListener('focusout', this.onBlur.bind(this), true);
  },

  initSubmenu: function($subMenus) {
    this.hasSubMenu = true;
    this.subMenu = new F1000.Menu($subMenus[0], { 
      direction: this.VERTICAL, 
      setMaxHeight: true,
      onExpand: this.updateItemOnExpand.bind(this),
      onCollapse: this.updateItemOnCollapse.bind(this)
    });

    this.$link.setAttribute('aria-haspopup', true);
    this.$link.setAttribute('aria-expanded', false);
    this.$link.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.$link.addEventListener('touchmove', this.onTouchMove.bind(this));
    this.$link.addEventListener('touchend', this.onTouchEnd.bind(this));
    this.$link.addEventListener('click', this.onClick.bind(this));
    // this.$menuItem.addEventListener('touchstart', this.onTouchStart.bind(this));
    // this.$menuItem.addEventListener('touchmove', this.onTouchMove.bind(this));
    // this.$menuItem.addEventListener('touchend', this.onItemTouchEnd.bind(this));
    // this.$menuItem.addEventListener('touchs', this.onTouchStart.bind(this));

    // Close the submenu when we click outside of it
    // window.addEventListener('click', this.onWindowClick.bind(this));
  },

  updateItemOnExpand: function() {
    this.$link.setAttribute('aria-expanded', true);
    this.$menuItem.classList.add(this.IS_EXPANDED);
    this.$menuItem.classList.remove(this.IS_COLLAPSED);
  },

  updateItemOnCollapse: function() {
    this.$link.setAttribute('aria-expanded', false);
    this.$menuItem.classList.remove(this.IS_EXPANDED);
    this.$menuItem.classList.add(this.IS_COLLAPSED);
  },

  expandSubMenu: function(index) {
    if(this.subMenu) {
      this.subMenu.expand();

      if(index !== undefined) {
        this.subMenu.focusItem(index)
      }

      var eventData = { bubbles: true, detail: { 
        item: this,
        menu: this.subMenu
      } };

      if(this.options.menuName) {
        eventData.detail.menuName = this.options.menuName;
      }

      var expandEvent = new CustomEvent(this.ITEM_MENU_EXPANDED_EVENT, eventData);
      window.dispatchEvent(expandEvent);
    }

    return this;
  },

  collapseSubMenu: function() {
    if(this.subMenu) {
      this.subMenu.collapse();
    }

    return this;
  },

  toggleSubMenu: function() {
    if(this.subMenu && this.subMenu.isExpanded) {
      this.collapseSubMenu();
    } else if (this.subMenu && !this.subMenu.isExpanded) {
      this.expandSubMenu();
    }

    return this;
  },

  activate: function() {
    console.log('activating', this);
    if(this.subMenu) {
      return this.expandSubMenu();
    }

    this.$link.click();

    return this;
  },

  focus: function() {
    this.$link.focus();
  },

  /**
   * Adds the is-focused class, if this item was focused using
   * the keyboard
   */
  isFocused: function(usingMouse) {
    if(usingMouse !== true)
      this.$menuItem.classList.add(this.IS_FOCUSED);
  },

  /**
   * Remove the is focused class
   */
  isNotFocused: function() {
    this.$menuItem.classList.remove(this.IS_FOCUSED);
  },

  /**
   * On item tap - toggle the submenus
   */
  onTouchStart: function(event) {
    this._isScrolling = false;
    event.stopPropagation();
  },

  /**
   * On item tap - toggle the submenus
   */
  onTouchMove: function(event) {
    this._isScrolling = true;
    event.stopPropagation();
  },

  /**
   * On item tap - toggle the submenus
   */
  onItemTouchEnd: function(event) {
    if(!this._isScrolling) {
      if(this.subMenu) {
        this.toggleSubMenu();
        event.preventDefault();
      } else if (!this.href) {
        event.preventDefault();
      }
    }
  },

  /**
   * On item tap - toggle the submenus
   */
  onTouchEnd: function(event) {
    event.stopPropagation();

    if(!this._isScrolling) {
      this.focus();
      
      if(this.subMenu) {
        this.toggleSubMenu();
        event.preventDefault();
      } else if (!event.target.href) {
        this.$link.click();
      } else if (event.target.href === "#") {
        event.preventDefault();
      }
       
      event.stopPropagation();
    }
  },

  /**
   * On item click
   * (hack to fix clicking on the <li> without clicking the <a>)
   */
  onItemClick: function(event) {
    this._isScrolling = false;
    this.onTouchEnd(event);
  },

  /**
   * On click - prevent default if there is no link
   */
  onClick: function(event) {
    event.stopPropagation();

    if(this.href === '#') {
      event.preventDefault();
    }
  },

  /**
   * On hover - expand the submenus
   */
  onMouseEnter: function(event) {
    this.expandSubMenu();
  },

  /**
   * On mouse out - collapse the submenus
   */
  onMouseLeave: function(event) {
    this.collapseSubMenu();
  },

  /**
   * On focus
   * Change the currently focused item.
   * Used for keyboard navigation.
   */
  onFocus: function(event) {
    this.$menuItem.dispatchEvent(new CustomEvent(this.ITEM_FOCUSED_EVENT, { detail: { item: this } }));
  },

  /**
   * On blur
   * Remove the currently focused item
   * Used for keyboard navigation.
   */
  onBlur: function(event) {
    this.isNotFocused();
    this.$menuItem.dispatchEvent(new CustomEvent(this.ITEM_BLUR_EVENT, { detail: { item: this } }));
  } 
}