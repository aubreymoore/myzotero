// SCRIPTS FOR DISPLAY ERRORS/MESSAGES ETC.

// For the messenger 'tab'
function Messenger(duration) {
    this.duration = duration || 6000;
}
Messenger.prototype.addMessage = function(message) {
    if ($('#pageMessage').length > 0) {
        this.addText($('#pageMessage'), message);
    }
};
Messenger.prototype.addFooterMessage = function(message) {
    if ($('#pageFooterMessage').length > 0) {
        this.addText($('#pageFooterMessage'), message);
    }
};
Messenger.prototype.addWarning = function(message) {
    if ($('#pageWarning').length > 0) {
        this.addText($('#pageWarning'), message);
    }
};
Messenger.prototype.addText = function(element, message) {
    element.html(message);
    element.slideDown();
    setTimeout(function() {
        element.slideUp(300, function(){
            // callback not needed
        });
    }, this.duration);
};
var messenger = new Messenger();


// For form errors, messages etc.
function FormMessenger(showDuration, hideDuration) {
    this.showDuration = showDuration || 200;
    this.hideDuration = hideDuration || 5000;
}
// The element parameter is mandatory and is used as the object that will be shown
// The message parameter is optional but if included the text of the element will be updated with the message
// The hideDurationOverride parameter is optional and if it exists it will use this item to set when the message fades
FormMessenger.prototype.showError = function(element, message, hideDurationOverride) {
    var msToShowMsg = this.hideDuration;
    if (typeof message !== "undefined") { element.text(message); }
    if (typeof hideDurationOverride === "number") { msToShowMsg = hideDurationOverride; }
    element.show(this.showDuration);
    setTimeout(function() {
        element.hide(this.showDuration);
    }, msToShowMsg);
};
var formMessenger = new FormMessenger();