(function() {
var f = document.getElementById('');
if (!f) {
f = document.getElementById('searchbox');
}
if (f && f.q) {
var q = f.q;
var n = navigator;
var l = location;
if (n.platform == 'Win32') {
q.style.cssText = 'border: 1px solid #7e9db9; padding: 2px;';
}
var b = function() {
if (q.value == '') {
q.style.background = '#ffffff url(http'+(('https:' == document.location.protocol) ? 's' : '')+':\x2F\x2Fwww.ucr.edu\x2Fimages\x2Fdesign6\x2Fgoogle_search_watermark.gif) 0 50% no-repeat';
}
};
var f = function() {
q.style.background = '#f9f9f9';
};
q.onfocus = f;
q.onblur = b;
if (!/[&?]q=[^&]/.test(l.search)) {
b();
}
}
})();
