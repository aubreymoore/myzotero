function setCookieNotice() {
    var date = new Date();
    date.setTime(date.getTime() + (180 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = "HideCabiCookieWarning=yes" + expires + "; path=/";
    $("#Product_cookies-wrap").hide();
}
