/*!
 * A global namespace for F1000 JavaScript
 * Should eventually be in a separate file
 */
var F1000 = F1000 || {};

/*!
 * A shared object for platform specific stuff
 */
F1000.Platform = function (options) {
  'use strict';

  var self = this;
  self.init(options);

  return this;
};

F1000.Platform.prototype = {

  init: function (options) {
    this.name_val  = options.name || "UNKNOWN";
    this.id_val = options.id || 0;
    this.hostName_val = options.hostName || "";
    this.editorialEmail_val = options.editorialEmail || "";
    this.infoEmail_val = options.infoEmail || "";
  },

  // Getters: Using the get keyword
  // Can use the dot operator to return data (eg. obj.foo)
  get name() { return this.name_val; },
  get id() { return this.id_val; },
  get hostName() { return this.hostName_val; },
  get editorialEmail() { return this.editorialEmail_val; },
  get infoEmail() { return this.infoEmail_val; },

  // Setters: Using the set keyword allows us to set the data with a standard assignment 
  // eg. obj.foo = 'hello';
  set name(val) { this.name_val = val; },
  set id(val) { this.id_val = val; },
  set hostName(val) { this.hostName_val = val; },
  set editorialEmail(val) { this.editorialEmail_val = val; },
  set infoEmail(val) { this.infoEmail_val = val; }

};
