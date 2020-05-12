'use strict';

/*!
 * A global namespace for F1000 JavaScript
 * Should eventually be in a separate file
 */

var F1000 = F1000 || {};

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}


/*!
 * Common Helper functions
 */

F1000._ = {
  find: function($elem, selector) {
    return F1000._.toArray($elem.querySelectorAll(selector));
  },

  toArray: function(nodeList) {
    return Array.prototype.slice.call(nodeList);
  },

  _addEventListener: function(type, fn) {
    return function(element) {
        element.addEventListener(type, fn);
        return element;
    }
  },

  addEventListener: function(elements, type, fn) {
    return elements.map(F1000._._addEventListener(type, fn));
  },

  _removeEventListener: function(type, fn) {
    return function(element) {
        element.removeEventListener(type, fn);
        return element;
    }
  },

  removeEventListener: function(elements, type, fn) {
    return elements.map(F1000._._removeEventListener(type, fn));
  },

  applyStyles: function(styles) {
    return function(element) {
      for (var key in styles) {
        if(styles.hasOwnProperty(key)) {
          element.style[key] = styles[key];
        }
      }

      return element;
    }
  },

  css: function(elements, styles) {
    if(Array.isArray(elements))
      return elements.map(this.applyStyles(styles));

    return this.applyStyles(styles)(elements);
  },

  getDirectChildrenWithClassName: function(element, className) {
    return Array.prototype.filter.call(element.childNodes, function(childNode) {
      return childNode.classList && childNode.classList.contains(className);
    });
  }
}