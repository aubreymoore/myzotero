/*!
 * A global namespace for F1000 JavaScript
 * Should eventually be in a separate file
 */
var F1000 = F1000 || {};


/*!
 * Clipboard handler.
 *
 * Sets up clipboardjs (https://clipboardjs.com/)
 * Adds tooltips on copy success/failure
 */

F1000.Clipboard = function() {
	this.CLIPBOARD_CLASS = 'js-clipboard';
    this.COPIED_CLASS = 'copied';
    this.TOOLTIP_CLASS = 'c-mini-tooltip';
    this.TOOLTIP_ATTRIBUTE = 'data-mini-tooltip';
    this.TOOLTIP_ACTIVE_CLASS = 'is-active';
    this.COPY_SUCCESS = 'Copied!';
    this.COPY_ERROR = 'Press Ctrl+C to copy';

	this.init();
};

F1000.Clipboard.prototype = {

	init: function() {
		this._clipboard = new Clipboard('.' + this.CLIPBOARD_CLASS);
        this._clipboard.on('success', this._successHandler.bind(this));
        this._clipboard.on("error", this._errorHandler.bind(this));
	},

	_successHandler: function(event) {
        var $btn = event.trigger;

        $btn.setAttribute(this.TOOLTIP_ATTRIBUTE, this.COPY_SUCCESS);
        $btn.classList.add(this.COPIED_CLASS, this.TOOLTIP_CLASS, this.TOOLTIP_ACTIVE_CLASS);

        setTimeout(function() { 
            $btn.classList.remove(this.TOOLTIP_CLASS);
        }, 3000);
    },

    _errorHandler: function(event) {
        var $btn = event.trigger;

        $btn.setAttribute(this.TOOLTIP_ATTRIBUTE, this.COPY_ERROR);
        $btn.classList.add(this.COPIED_CLASS, this.TOOLTIP_CLASS, this.TOOLTIP_ACTIVE_CLASS);

        setTimeout(function() { 
            $btn.classList.remove(this.TOOLTIP_CLASS);
        }, 3000);
    }
    
};
