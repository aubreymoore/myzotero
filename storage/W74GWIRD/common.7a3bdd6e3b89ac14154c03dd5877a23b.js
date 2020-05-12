try{jQuery.cookie=function(a,g,d){if(1<arguments.length&&"[object Object]"!==String(g)){d=jQuery.extend({},d);if(null===g||void 0===g)d.expires=-1;if("number"===typeof d.expires){var m=d.expires,k=d.expires=new Date;k.setDate(k.getDate()+m)}g=String(g);return document.cookie=[encodeURIComponent(a),"=",d.raw?g:encodeURIComponent(g),d.expires?"; expires="+d.expires.toUTCString():"",d.path?"; path="+d.path:"",d.domain?"; domain="+d.domain:"",d.secure?"; secure":""].join("")}d=g||{};k=d.raw?function(a){return a}:
decodeURIComponent;return(m=RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)").exec(document.cookie))?k(m[1]):null},!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){function g(c){var b,e,d,g=arguments.length;d=window[c];b=arguments;var u=b[1];if(2>g)throw Error("Minimum 2 arguments must be given");if(a.isArray(u)){e={};for(var f in u){b=u[f];try{e[b]=JSON.parse(d.getItem(b))}catch(h){e[b]=d.getItem(b)}}return e}if(2!=
g){try{e=JSON.parse(d.getItem(u))}catch(l){throw new ReferenceError(u+" is not defined in this storage");}for(f=2;g-1>f;f++)if(e=e[b[f]],void 0===e)throw new ReferenceError([].slice.call(b,1,f+1).join(".")+" is not defined in this storage");if(a.isArray(b[f])){d=e;e={};for(var k in b[f])e[b[f][k]]=d[b[f][k]];return e}return e[b[f]]}try{return JSON.parse(d.getItem(u))}catch(n){return d.getItem(u)}}function d(c){var b,e,d=arguments.length,g=window[c],u=arguments,f=u[1];b=u[2];var h={};if(2>d||!a.isPlainObject(f)&&
3>d)throw Error("Minimum 3 arguments must be given or second parameter must be an object");if(a.isPlainObject(f)){for(var l in f)b=f[l],a.isPlainObject(b)?g.setItem(l,JSON.stringify(b)):g.setItem(l,b);return f}if(3==d)return"object"==typeof b?g.setItem(f,JSON.stringify(b)):g.setItem(f,b),b;try{e=g.getItem(f),null!=e&&(h=JSON.parse(e))}catch(k){}e=h;for(l=2;d-2>l;l++)b=u[l],e[b]&&a.isPlainObject(e[b])||(e[b]={}),e=e[b];return e[u[l]]=u[l+1],g.setItem(f,JSON.stringify(h)),h}function m(c){var b,e,d=
arguments.length,g=window[c],f=arguments,l=f[1];if(2>d)throw Error("Minimum 2 arguments must be given");if(a.isArray(l)){for(var h in l)g.removeItem(l[h]);return!0}if(2==d)return g.removeItem(l),!0;try{b=e=JSON.parse(g.getItem(l))}catch(k){throw new ReferenceError(l+" is not defined in this storage");}for(h=2;d-1>h;h++)if(e=e[f[h]],void 0===e)throw new ReferenceError([].slice.call(f,1,h).join(".")+" is not defined in this storage");if(a.isArray(f[h]))for(var n in f[h])delete e[f[h][n]];else delete e[f[h]];
return g.setItem(l,JSON.stringify(b)),!0}function k(c){var b=arguments.length,e=arguments,d=(window[c],e[1]);if(1==b)return 0==p(c).length;if(a.isArray(d)){for(var f=0;f<d.length;f++)if(!k(c,d[f]))return!1;return!0}try{var l=g.apply(this,arguments);a.isArray(e[b-1])||(l={totest:l});for(f in l)if(!(a.isPlainObject(l[f])&&a.isEmptyObject(l[f])||a.isArray(l[f])&&!l[f].length)&&l[f])return!1;return!0}catch(h){return!0}}function n(c){var b=arguments.length,e=arguments,d=(window[c],e[1]);if(2>b)throw Error("Minimum 2 arguments must be given");
if(a.isArray(d)){for(var f=0;f<d.length;f++)if(!n(c,d[f]))return!1;return!0}try{var l=g.apply(this,arguments);a.isArray(e[b-1])||(l={totest:l});for(f in l)if(void 0===l[f]||null===l[f])return!1;return!0}catch(h){return!1}}function p(c){var b=arguments.length,e=window[c],d=arguments,f=(d[1],[]),l={};if(l=1<b?g.apply(this,d):e,l._cookie)for(var h in a.cookie())""!=h&&f.push(h.replace(l._prefix,""));else for(var k in l)f.push(k);return f}function h(c){if(!c||"string"!=typeof c)throw Error("First parameter must be a string");
f?(window.localStorage.getItem(c)||window.localStorage.setItem(c,"{}"),window.sessionStorage.getItem(c)||window.sessionStorage.setItem(c,"{}")):(window.localCookieStorage.getItem(c)||window.localCookieStorage.setItem(c,"{}"),window.sessionCookieStorage.getItem(c)||window.sessionCookieStorage.setItem(c,"{}"));var b={localStorage:a.extend({},a.localStorage,{_ns:c}),sessionStorage:a.extend({},a.sessionStorage,{_ns:c})};return a.cookie&&(window.cookieStorage.getItem(c)||window.cookieStorage.setItem(c,
"{}"),b.cookieStorage=a.extend({},a.cookieStorage,{_ns:c})),a.namespaceStorages[c]=b,b}var f=function(c){if(!window[c])return!1;try{return window[c].setItem("jsapi","jsapi"),window[c].removeItem("jsapi"),!0}catch(b){return!1}}("localStorage"),l={_type:"",_ns:"",_callMethod:function(c,b){var a=[this._type];b=Array.prototype.slice.call(b);var e=b[0];return this._ns&&a.push(this._ns),"string"==typeof e&&-1!==e.indexOf(".")&&(b.shift(),[].unshift.apply(b,e.split("."))),[].push.apply(a,b),c.apply(this,
a)},get:function(){return this._callMethod(g,arguments)},set:function(){var c=arguments.length,b=arguments,e=b[0];if(1>c||!a.isPlainObject(e)&&2>c)throw Error("Minimum 2 arguments must be given or first parameter must be an object");if(a.isPlainObject(e)&&this._ns){for(var f in e)d(this._type,this._ns,f,e[f]);return e}c=this._callMethod(d,b);return this._ns?c[e.split(".")[0]]:c},remove:function(){if(1>arguments.length)throw Error("Minimum 1 argument must be given");return this._callMethod(m,arguments)},
removeAll:function(c){if(this._ns)c=(d(this._type,this._ns,{}),!0);else{var b=this._type,e=p(b),f;for(f in e)m(b,e[f]);if(c)for(f in a.namespaceStorages)h(f);c=void 0}return c},isEmpty:function(){return this._callMethod(k,arguments)},isSet:function(){if(1>arguments.length)throw Error("Minimum 1 argument must be given");return this._callMethod(n,arguments)},keys:function(){return this._callMethod(p,arguments)}};if(a.cookie){window.name||(window.name=Math.floor(1E8*Math.random()));var e={_cookie:!0,
_prefix:"",_expires:null,_path:null,_domain:null,setItem:function(c,b){a.cookie(this._prefix+c,b,{expires:this._expires,path:this._path,domain:this._domain})},getItem:function(c){return a.cookie(this._prefix+c)},removeItem:function(c){return a.removeCookie(this._prefix+c)},clear:function(){for(var c in a.cookie())""!=c&&(!this._prefix&&-1===c.indexOf("ls_")&&-1===c.indexOf("ss_")||this._prefix&&0===c.indexOf(this._prefix))&&a.removeCookie(c)},setExpires:function(c){return this._expires=c,this},setPath:function(c){return this._path=
c,this},setDomain:function(c){return this._domain=c,this},setConf:function(c){return c.path&&(this._path=c.path),c.domain&&(this._domain=c.domain),c.expires&&(this._expires=c.expires),this},setDefaultConf:function(){this._path=this._domain=this._expires=null}};f||(window.localCookieStorage=a.extend({},e,{_prefix:"ls_",_expires:3650}),window.sessionCookieStorage=a.extend({},e,{_prefix:"ss_"+window.name+"_"}));window.cookieStorage=a.extend({},e);a.cookieStorage=a.extend({},l,{_type:"cookieStorage",
setExpires:function(c){return window.cookieStorage.setExpires(c),this},setPath:function(c){return window.cookieStorage.setPath(c),this},setDomain:function(c){return window.cookieStorage.setDomain(c),this},setConf:function(c){return window.cookieStorage.setConf(c),this},setDefaultConf:function(){return window.cookieStorage.setDefaultConf(),this}})}a.initNamespaceStorage=function(c){return h(c)};f?(a.localStorage=a.extend({},l,{_type:"localStorage"}),a.sessionStorage=a.extend({},l,{_type:"sessionStorage"})):
(a.localStorage=a.extend({},l,{_type:"localCookieStorage"}),a.sessionStorage=a.extend({},l,{_type:"sessionCookieStorage"}));a.namespaceStorages={};a.removeAllStorages=function(c){a.localStorage.removeAll(c);a.sessionStorage.removeAll(c);a.cookieStorage&&a.cookieStorage.removeAll(c);c||(a.namespaceStorages={})}})}catch(e$$26){}
!function(a,g,d,m){a.fn.dropdownHover=function(k){var n,m,h,f;k=a.extend({},a.fn.dropdownHover.options,k);return this.each(function(){a(this).parent().addClass(k.hoverClass.replace(".","")).attr("data-intent",a(this).data("hover-delay")).attr("data-delay",a(this).data("delay"))}),a(d).on({mouseenter:function(d){if(f)return n=this,!0;d.stopPropagation();g.clearTimeout(h);var e=a(this);d=a(this).data("intent");a(e).hasClass("open")||a(e).is(n)||(m=setTimeout(function(){a(n).removeClass("open");n=e;
a(n).addClass("open")},d?d:k.hoverDelay))},mouseleave:function(d){if(f)return a(".dropdown-menu").removeClass("bs-hover-sub-clickable"),!0;if(d.stopPropagation(),g.clearTimeout(m),n)d=(a(this),a(this).data("delay")),h=setTimeout(function(){a(n).removeClass("open");a(n).find(".dropdown-toggle").blur();n=!1},d?d:k.delay)}},k.hoverClass),a(k.hoverClass).on("click",".dropdown-menu",function(a){a.stopPropagation()}),a(k.hoverClass+" a").on("click",function(d){if(d.preventDefault(),f&&a(this).data("nested")&&
!a(this).next(".dropdown-menu").hasClass("bs-hover-sub-clickable"))return a(this).next(".dropdown-menu").addClass("bs-hover-sub-clickable"),!1;if(a(n).hasClass("open")){d=a(this).attr("href");var e=a(this).attr("target");d&&"_blank"==e?g.open(d,"_blank"):d&&"#"!==d&&(g.location.href=d)}return f?!0:!1}),a(d).one("touchstart",function(){g.clearTimeout(h);g.clearTimeout(m);f=!0}),this};a.fn.dropdownHover.options={hoverClass:".bs-hover-enabled",delay:500,hoverDelay:0};a(d).ready(function(){a('[data-hover="dropdown"]').dropdownHover()})}(jQuery,
window,document);var originalLeave=$.fn.popover.Constructor.prototype.leave;$.fn.popover.Constructor.prototype.leave=function(a){var g=a instanceof this.constructor?a:$(a.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type),d,m;originalLeave.call(this,a);a.currentTarget&&(d=$(a.currentTarget).siblings(".popover"),m=g.timeout,d.one("mouseenter",function(){clearTimeout(m);d.one("mouseleave",function(){$.fn.popover.Constructor.prototype.leave.call(g,g)})}))};
(function(a){function g(){if(p){var a=[];if(k.querySelectorAll)a=k.querySelectorAll("[data-squery]");else for(var c=k.getElementsByTagName("*"),b=0,d=c.length;b<d;++b)c[b].getAttribute("data-squery")&&a.push(c[b]);b=0;for(d=a.length;b<d;++b){for(var c=a[b],f=[],g=c.getAttribute("data-squery").split(" "),h=0,l=g.length;h<l;++h){var m=/(.*):([0-9]*)(px|em)=(.*)/.exec(g[h]);m&&f.push(m)}c.cq_rules=c.cq_rules||[];c.cq_rules=c.cq_rules.concat(f);n.push(c)}}}function d(){for(var a=0,c=n.length;a<c;++a){el=
n[a];for(var b=0,d=el.cq_rules.length;b<d;++b){var g=el.cq_rules[b],h=parseInt(g[2]);"em"===g[3]&&(h=l(parseFloat(g[2]),el));var k=el,m=g[4],p=k.cloneNode(!0);p.className=(" "+p.className+" ").replace(" "+m+" "," ");p.style.height=0;p.style.visibility="hidden";p.style.overflow="hidden";p.style.clear="both";m=k.parentNode;m.insertBefore(p,k);k=p.offsetWidth;m.removeChild(p);f[g[1]](k,h)?0>el.className.indexOf(g[4])&&(el.className+=" "+g[4]):(g=el.className.replace(RegExp("(^| )"+g[4]+"( |$)"),"$1"),
g=g.replace(/ $/,""),el.className=g)}}}function m(){if(!h){h=!0;g();d();a.addEventListener&&a.addEventListener("resize",d,!1);var e=l(1,k.body);a.setInterval(function(){var a=l(1,k.body);a!==e&&(d(),e=a)},100)}}var k=a.document,n=[],p=!0,h=!1,f={"min-width":function(a,c){return a>c},"max-width":function(a,c){return a<c}},l=function(a){return function(){var c=Array.prototype.slice.call(arguments);a.memoize=a.memoize||{};return c in a.memoize?a.memoize[c]:a.memoize[c]=a.apply(this,c)}}(function(a,c){var b=
k.createElement("div");b.style.fontSize="1em";b.style.margin="0";b.style.padding="0";b.style.border="none";b.style.width="1em";c.appendChild(b);var d=b.offsetWidth;c.removeChild(b);return Math.round(d*a)});k.addEventListener?(k.addEventListener("DOMContentLoaded",m,!1),a.addEventListener("load",m,!1)):k.attachEvent&&(k.attachEvent("onreadystatechange",m),a.attachEvent("onload",m));a.SelectorQueries={add:function(a,c,b,f){b=/([0-9]*)(px|em)/.exec(b);for(var g=0,l=a.length;g<l;++g){var k=a[g];k.cq_rules=
k.cq_rules||[];k.cq_rules.push([null,c,b[1],b[2],f]);n.push(k)}h&&d()},ignoreDataAttributes:function(){p=!1}}})(this);
!function(a,g,d){function m(b){return" "===b||"    "===b||"\n"===b||"\f"===b||"\r"===b}function k(b,c){var d=new a.Image;return d.onerror=function(){F[b]=!1;A()},d.onload=function(){F[b]=1===d.width;A()},d.src=c,"pending"}function n(b,a){return b.res-a.res}function p(a,c){var d,e,f;if(a&&c)for(f=b.parseSet(c),a=b.makeUrl(a),d=0;d<f.length;d++)if(a===b.makeUrl(f[d].url)){e=f[d];break}return e}function h(b,a){function c(a){var d;return(a=a.exec(b.substring(r)))?(d=a[0],r+=d.length,d):void 0}function d(){var b,
c,D,e,r,h,s,l,k=!1,J={};for(e=0;e<g.length;e++)r=g[e],h=r[r.length-1],r=r.substring(0,r.length-1),s=parseInt(r,10),l=parseFloat(r),T.test(r)&&"w"===h?((b||c)&&(k=!0),0===s?k=!0:b=s):Z.test(r)&&"x"===h?((b||c||D)&&(k=!0),0>l?k=!0:c=l):T.test(r)&&"h"===h?((D||c)&&(k=!0),0===s?k=!0:D=s):k=!0;k||(J.url=f,b&&(J.w=b),c&&(J.d=c),D&&(J.h=D),D||c||b||(J.d=1),1===J.d&&(a.has1x=!0),J.set=a,z.push(J))}function e(){c(P);h="";for(l="in descriptor";;){if(k=b.charAt(r),"in descriptor"===l)if(m(k))h&&(g.push(h),h=
"",l="after descriptor");else{if(","===k)return r+=1,h&&g.push(h),void d();if("("===k)h+=k,l="in parens";else{if(""===k)return h&&g.push(h),void d();h+=k}}else if("in parens"===l)if(")"===k)h+=k,l="in descriptor";else{if(""===k)return g.push(h),void d();h+=k}else if("after descriptor"===l&&!m(k)){if(""===k)return void d();l="in descriptor";r-=1}r+=1}}for(var f,g,h,l,k,q=b.length,r=0,z=[];;){if(c(Q),r>=q)return z;f=c(ga);g=[];","===f.slice(-1)?(f=f.replace(ha,""),d()):e()}}function f(a){var c,d,e,
f,g,h=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,k=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;c=function(b){function a(){e&&(D.push(e),e="")}function c(){D[0]&&(f.push(D),D=[])}for(var d,e="",D=[],f=[],g=0,h=0,s=!1;;){if(d=b.charAt(h),""===d)return a(),c(),f;if(s)"*"===d&&"/"===b[h+1]?(s=!1,h+=2,a()):h+=1;else{if(m(d)){if(b.charAt(h-1)&&m(b.charAt(h-1))||!e){h+=1;continue}if(0===g){a();h+=1;continue}d=" "}else if("("===d)g+=1;else if(")"===
d)g-=1;else{if(","===d){a();c();h+=1;continue}if("/"===d&&"*"===b.charAt(h+1)){s=!0;h+=2;continue}}e+=d;h+=1}}}(a);d=c.length;for(a=0;d>a;a++)if(e=c[a],f=e[e.length-1],h.test(f)&&0<=parseFloat(f)?!0:k.test(f)?!0:"0"===f||"-0"===f||"+0"===f?!0:!1)if((g=f,e.pop(),0===e.length)||(e=e.join(" "),b.matchesMedia(e)))return g;return"100vw"}g.createElement("picture");var l,e,c,b={},t=function(){},E=g.createElement("img"),M=E.getAttribute,u=E.setAttribute,N=E.removeAttribute,w=g.documentElement,F={},H={algorithm:""},
I=navigator.userAgent,K=/rident/.test(I)||/ecko/.test(I)&&I.match(/rv\:(\d+)/)&&35<RegExp.$1,q="currentSrc",L=/\s+\+?\d+(e\d+)?w/,ia=/(\([^)]+\))?\s*(.+)/,I=a.picturefillCFG,x=!0,B={},y={},R=a.devicePixelRatio,v={px:1,"in":96},O=g.createElement("a"),aa=!1,P=/^[ \t\n\r\u000c]+/,Q=/^[, \t\n\r\u000c]+/,ga=/^[^ \t\n\r\u000c]+/,ha=/[,]+$/,T=/^\d+$/,Z=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Y=function(b,a,c,d){b.addEventListener?b.addEventListener(a,c,d||!1):b.attachEvent&&b.attachEvent("on"+
a,c)},U=function(b){var a={};return function(c){return c in a||(a[c]=b(c)),a[c]}},S=function(){var b=/^([\d\.]+)(em|vw|px)$/,a=function(){for(var b=arguments,a=0,c=b[0];++a in b;)c=c.replace(b[a],b[++a]);return c},c=U(function(b){return"return "+a((b||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(a,d){var e;if(!(a in
B))if(B[a]=!1,d&&(e=a.match(b)))B[a]=e[1]*v[e[2]];else try{B[a]=(new Function("e",c(a)))(v)}catch(f){}return B[a]}}(),C=function(a,c){return a.w?(a.cWidth=b.calcListLength(c||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},A=function(a){var c,d,e=a||{};if(e.elements&&1===e.elements.nodeType&&("IMG"===e.elements.nodeName.toUpperCase()?e.elements=[e.elements]:(e.context=e.elements,e.elements=null)),c=e.elements||b.qsa(e.context||g,e.reevaluate||e.reselect?b.sel:b.selShort),d=c.length){b.setupRun(e);aa=!0;
for(a=0;d>a;a++)b.fillImg(c[a],e);b.teardownRun(e)}};q in E||(q="src");F["image/jpeg"]=!0;F["image/gif"]=!0;F["image/png"]=!0;F["image/svg+xml"]=g.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1");b.ns=("pf"+(new Date).getTime()).substr(0,9);b.supSrcset="srcset"in E;b.supSizes="sizes"in E;b.supPicture=!!a.HTMLPictureElement;b.supSrcset&&b.supPicture&&!b.supSizes&&!function(a){E.srcset="data:,a";a.src="data:,a";b.supSrcset=E.complete===a.complete;b.supPicture=b.supSrcset&&
b.supPicture}(g.createElement("img"));b.selShort="picture>img,img[srcset]";b.sel=b.selShort;b.cfg=H;b.supSrcset&&(b.sel+=",img[data-pfsrcset]");b.DPR=R||1;b.u=v;b.types=F;e=b.supSrcset&&!b.supSizes;b.setSize=t;b.makeUrl=U(function(b){return O.href=b,O.href});b.qsa=function(b,a){return b.querySelectorAll(a)};b.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?b.matchesMedia=function(b){return!b||matchMedia(b).matches}:b.matchesMedia=b.mMQ,b.matchesMedia.apply(this,
arguments)};b.mMQ=function(b){return b?S(b):!0};b.calcLength=function(b){b=S(b,!0)||!1;return 0>b&&(b=!1),b};b.supportsType=function(b){return b?F[b]:!0};b.parseSize=U(function(b){b=(b||"").match(ia);return{media:b&&b[1],length:b&&b[2]}});b.parseSet=function(b){return b.cands||(b.cands=h(b.srcset,b)),b.cands};b.getEmValue=function(){var b;if(!l&&(b=g.body)){var a=g.createElement("div"),c=w.style.cssText,d=b.style.cssText;a.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
w.style.cssText="font-size:100%!important;";b.style.cssText="font-size:100%!important;";b.appendChild(a);l=a.offsetWidth;b.removeChild(a);l=parseFloat(l,10);w.style.cssText=c;b.style.cssText=d}return l||16};b.calcListLength=function(a){if(!(a in y)||H.uT){var c=b.calcLength(f(a));y[a]=c?c:v.width}return y[a]};b.setRes=function(a){var c;if(a){c=b.parseSet(a);for(var d=0,e=c.length;e>d;d++)C(c[d],a.sizes)}return c};b.setRes.res=C;b.applySetCandidate=function(a,c){if(a.length){var d,e,f,h,g,k,l,m=c[b.ns],
L=b.DPR;g=m.curSrc||c[q];if(!(h=m.curCan)){var r=g,z=a[0].set,G;h=(!z&&r&&(z=c[b.ns].sets,z=z&&z[z.length-1]),G=p(r,z),G&&(r=b.makeUrl(r),c[b.ns].curSrc=r,c[b.ns].curCan=G,G.res||C(G,G.set.sizes)),G)}if(e=h,e&&e.set===a[0].set&&(l=K&&!c.complete&&e.res-0.1>L,l||(e.cached=!0,e.res>=L&&(f=e))),!f)for(a.sort(n),h=a.length,f=a[h-1],e=0;h>e;e++)if(d=a[e],d.res>=L){f=e-1;if(e=a[f]){if(l=l||g!==b.makeUrl(d.url)){l=a[f].res;e=d.res;G=L;var t=a[f].cached,z=r=h=L=void 0;l=("saveData"===H.algorithm?2.7<l?z=
G+1:(h=e-G,L=Math.pow(l-0.6,1.5),r=h*L,t&&(r+=0.1*L),z=l+r):z=1<G?Math.sqrt(l*e):l,z>G)}e=l}f=e?a[f]:d;break}f&&(k=b.makeUrl(f.url),m.curSrc=k,m.curCan=f,k!==g&&b.setSrc(c,f),b.setSize(c))}};b.setSrc=function(b,a){var c;b.src=a.url;"image/svg+xml"===a.set.type&&(c=b.style.width,b.style.width=b.offsetWidth+1+"px",b.offsetWidth+1&&(b.style.width=c))};b.getSet=function(a){var c,d,e=!1,f=a[b.ns].sets;for(a=0;a<f.length&&!e;a++)if(c=f[a],c.srcset&&b.matchesMedia(c.media)&&(d=b.supportsType(c.type))){"pending"===
d&&(c=d);e=c;break}return e};b.parseSets=function(a,c,f){var h,g,l,k,m=c&&"PICTURE"===c.nodeName.toUpperCase(),q=a[b.ns];(q.src===d||f.src)&&(q.src=M.call(a,"src"),q.src?u.call(a,"data-pfsrc",q.src):N.call(a,"data-pfsrc"));(q.srcset===d||f.srcset||!b.supSrcset||a.srcset)&&(h=M.call(a,"srcset"),q.srcset=h,k=!0);q.sets=[];if(m){q.pic=!0;f=q.sets;var n,t,r,z=c.getElementsByTagName("source");c=0;for(n=z.length;n>c;c++)t=z[c],t[b.ns]=!0,(r=t.getAttribute("srcset"))&&f.push({srcset:r,media:t.getAttribute("media"),
type:t.getAttribute("type"),sizes:t.getAttribute("sizes")})}q.srcset?(g={srcset:q.srcset,sizes:M.call(a,"sizes")},q.sets.push(g),l=(e||q.src)&&L.test(q.srcset||""),l||!q.src||p(q.src,g)||g.has1x||(g.srcset+=", "+q.src,g.cands.push({url:q.src,d:1,set:g}))):q.src&&q.sets.push({srcset:q.src,sizes:null});q.curCan=null;q.curSrc=d;q.supported=!(m||g&&!b.supSrcset||l);k&&b.supSrcset&&!q.supported&&(h?(u.call(a,"data-pfsrcset",h),a.srcset=""):N.call(a,"data-pfsrcset"));q.supported&&!q.srcset&&(!q.src&&a.src||
a.src!==b.makeUrl(q.src))&&(null===q.src?a.removeAttribute("src"):a.src=q.src);q.parsed=!0};b.fillImg=function(a,d){var e,f=d.reselect||d.reevaluate;a[b.ns]||(a[b.ns]={});e=a[b.ns];if(f||e.evaled!==c)if(e.parsed&&!d.reevaluate||b.parseSets(a,a.parentNode,d),e.supported)e.evaled=c;else{var h;e=b.getSet(a);f=!1;"pending"!==e&&(f=c,e&&(h=b.setRes(e),b.applySetCandidate(h,a)));a[b.ns].evaled=f}};b.setupRun=function(){if(!aa||x||R!==a.devicePixelRatio)x=!1,R=a.devicePixelRatio,B={},y={},b.DPR=R||1,v.width=
Math.max(a.innerWidth||0,w.clientWidth),v.height=Math.max(a.innerHeight||0,w.clientHeight),v.vw=v.width/100,v.vh=v.height/100,c=[v.height,v.width,R].join("-"),v.em=b.getEmValue(),v.rem=v.em};b.supPicture?(A=t,b.fillImg=t):!function(){var c,e=a.attachEvent?/d$|^c/:/d$|^c|^i/,d=function(){var a=g.readyState||"";f=setTimeout(d,"loading"===a?200:999);g.body&&(b.fillImgs(),c=c||e.test(a),c&&clearTimeout(f))},f=setTimeout(d,g.body?9:99),h=w.clientHeight;Y(a,"resize",function(a,b){var c,e,d=function(){var f=
new Date-e;b>f?c=setTimeout(d,b-f):(c=null,a())};return function(){e=new Date;c||(c=setTimeout(d,b))}}(function(){x=Math.max(a.innerWidth||0,w.clientWidth)!==v.width||w.clientHeight!==h;h=w.clientHeight;x&&b.fillImgs()},99));Y(g,"readystatechange",d)}();b.picturefill=A;b.fillImgs=A;b.teardownRun=t;A._=b;for(a.picturefillCFG={pf:b,push:function(a){var c=a.shift();"function"==typeof b[c]?b[c].apply(b,a):(H[c]=a[0],aa&&b.fillImgs({reselect:!0}))}};I&&I.length;)a.picturefillCFG.push(I.shift());a.picturefill=
A;"object"==typeof module&&"object"==typeof module.exports?module.exports=A:"function"==typeof define&&define.amd&&define("picturefill",function(){return A});b.supPicture||(F["image/webp"]=k("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);
!function(a,g){if(a.addEventListener){var d,m=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,k=/^picture$/i,n={getFit:function(a){var d={fit:a.getAttribute("data-parent-fit")};return d.fit?(d.parent=a.parentNode,d.parent&&k.test(d.parent.nodeName||"")&&(d.parent=d.parent.parentNode)):d.fit=(getComputedStyle(a)||{getPropertyValue:function(){}}).getPropertyValue("object-fit"),d},getImageRatio:function(d){var f,g,e,c,b,n=(f=d.parentNode)&&k.test(f.nodeName||"")?f.querySelectorAll("source, img"):[d];for(f=0;f<n.length;f++)if(d=
n[f],g=d.getAttribute(lazySizesConfig.srcsetAttr)||d.getAttribute("srcset")||d.getAttribute("data-pfsrcset")||d.getAttribute("data-risrcset")||"",e=d.getAttribute("media"),e=lazySizesConfig.customMedia[d.getAttribute("data-media")||e]||e,g&&(!e||(a.matchMedia&&matchMedia(e)||{}).matches)){g.match(m)&&("w"==RegExp.$2?(c=RegExp.$1,b=RegExp.$3):(c=RegExp.$3,b=RegExp.$1));break}return c/b},calculateSize:function(a,d){if(a._parentfitWidthCache)return a._parentfitWidthCache;var g,e,c,b,k=this.getFit(a),
m=k.fit,k=k.parent;return"width"==m||("contain"==m||"cover"==m)&&(c=this.getImageRatio(a))?(k?d=k.offsetWidth:k=a,b=d,"width"==m?b=d:(e=k.offsetHeight,40<e&&(g=d/e)&&("cover"==m&&c>g||"contain"==m&&g>c)&&(b=c/g*d)),b):d}},p=function(){a.lazySizes&&(lazySizes.parentFit||(lazySizes.parentFit=n),a.removeEventListener("lazybeforeunveil",p,!0))};a.lazySizesConfig=a.lazySizesConfig||{};d=a.lazySizesConfig.rC;a.lazySizesConfig.rC=function(a,f){return d&&(f=d.apply(this,arguments)||f),a._parentfitWidthCache=
n.calculateSize(a,f)||f,a._parentfitWidthCache};a.addEventListener("lazybeforeunveil",p,!0);g.addEventListener("lazybeforesizes",function(a){if(!a.defaultPrevented){var d=a.target;a.detail.width=n.calculateSize(d,a.detail.width);d._parentfitWidthCache&&delete d._parentfitWidthCache}});setTimeout(p)}}(window,document);
!function(){if(window.addEventListener){var a,g=/\s+/g,d=/\s*\|\s+|\s+\|\s*/g,m=/^(.+?)(?:\s+\[\s*(.+?)\s*\])?$/,k={contain:1,cover:1},n=window.requestAnimationFrame||setTimeout,p=function(a){var c=a._bgsetReadCache&&"width"in a._bgsetReadCache?a._bgsetReadCache.width:lazySizes.gW(a,a.parentNode);return(!a._lazysizesWidth||c>a._lazysizesWidth)&&(a._lazysizesWidth=c),a._lazysizesWidth},h=function(a){var c;return a._bgsetReadCache?c=a._bgsetReadCache.bgSize:(c=(getComputedStyle(a)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),
!k[c]&&k[a.style.backgroundSize]&&(c=a.style.backgroundSize)),c},f=function(a,c,b){var f=document.createElement("picture"),l=c.getAttribute(lazySizesConfig.sizesAttr),n=c.getAttribute("data-ratio"),p=c.getAttribute("data-optimumx"),N=h(c);!k[N]||"auto"!=l&&l||(b.setAttribute("data-parent-fit",N),l="auto");c._lazybgset&&c._lazybgset.parentNode==c&&c.removeChild(c._lazybgset);Object.defineProperty(b,"_lazybgset",{value:c,writable:!0});Object.defineProperty(c,"_lazybgset",{value:f,writable:!0});a=a.replace(g,
" ").split(d);f.style.display="none";b.className=lazySizesConfig.lazyClass;1!=a.length||l||(l="auto");a.forEach(function(a){var b=document.createElement("source");l&&"auto"!=l&&b.setAttribute("sizes",l);a.match(m)&&(b.setAttribute(lazySizesConfig.srcsetAttr,RegExp.$1),RegExp.$2&&b.setAttribute("media",lazySizesConfig.customMedia[RegExp.$2]||RegExp.$2));f.appendChild(b)});l&&(b.setAttribute(lazySizesConfig.sizesAttr,l),c.removeAttribute(lazySizesConfig.sizesAttr),c.removeAttribute("sizes"));p&&b.setAttribute("data-optimumx",
p);n&&b.setAttribute("data-ratio",n);f.appendChild(b);c.appendChild(f)},l=function(a){if(a.target._lazybgset){a=a.target;var c=a._lazybgset,b=a.currentSrc||a.src;b&&(c.style.backgroundImage="url("+b+")");a._lazybgsetLoading&&(lazySizes.fire(c,"_lazyloaded",{},!1,!0),delete a._lazybgsetLoading)}};window.lazySizesConfig=window.lazySizesConfig||{};a=window.lazySizesConfig.rC;window.lazySizesConfig.rC=function(d,c){var b;return a&&(c=a.apply(this,arguments)||c),d.getAttribute("data-bgset")&&(b=h(d),(k[b]||
d.getAttribute(lazySizesConfig.sizesAttr))&&(c=p(d)),d._bgsetReadCache={bgSize:b,width:c}),d._bgsetReadCache&&d._bgsetReadCache.width||c};addEventListener("lazybeforeunveil",function(a){var c,b,d;!a.defaultPrevented&&(c=a.target.getAttribute("data-bgset"))&&(d=a.target,b=document.createElement("img"),b.alt="",b._lazybgsetLoading=!0,a.detail.firesLoad=!0,f(c,d,b),b._bgsetReadCache=d._bgsetReadCache,setTimeout(function(){lazySizes.loader.unveil(b);n(function(){lazySizes.fire(b,"_lazyloaded",{},!0,!0);
b.complete&&l({target:b});d._bgsetReadCache&&delete d._bgsetReadCache;b._bgsetReadCache&&delete b._bgsetReadCache})}))});document.addEventListener("load",l,!0);document.documentElement.addEventListener("lazybeforesizes",function(a){!a.defaultPrevented&&a.target._lazybgset&&(a.detail.width=p(a.target._lazybgset))})}}();
!function(a){var g,d,m,k;a.addEventListener&&(g=a.lazySizes&&lazySizes.cfg||a.lazySizesConfig||{},d=g.lazyClass||"lazyload",m=function(){var g,k;if("string"==typeof d&&(d=document.getElementsByClassName(d)),a.lazySizes)for(g=0,k=d.length;k>g;g++)lazySizes.loader.unveil(d[g])},addEventListener("beforeprint",m,!1),!("onbeforeprint"in a)&&a.matchMedia&&(k=matchMedia("print"))&&k.addListener&&k.addListener(function(){k.matches&&m()}))}(window);
!function(a,g){var d=g(a,a.document);a.lazySizes=d;"object"==typeof module&&module.exports?module.exports=d:"function"==typeof define&&define.amd&&define(d)}(window,function(a,g){if(g.getElementsByClassName){var d,m=g.documentElement,k=a.HTMLPictureElement&&"sizes"in g.createElement("img"),n=a.addEventListener,p=a.setTimeout,h=a.requestAnimationFrame||p,f=/^picture$/i,l=["load","error","lazyincluded","_lazyloaded"],e={},c=Array.prototype.forEach,b=function(a,b){return e[b]||(e[b]=RegExp("(\\s|^)"+
b+"(\\s|$)")),e[b].test(a.getAttribute("class")||"")&&e[b]},t=function(a,d){b(a,d)||a.setAttribute("class",(a.getAttribute("class")||"").trim()+" "+d)},E=function(a,d){var c;(c=b(a,d))&&a.setAttribute("class",(a.getAttribute("class")||"").replace(c," "))},M=function(a,b,d){var c=d?"addEventListener":"removeEventListener";d&&M(a,b);l.forEach(function(d){a[c](d,b)})},u=function(a,b,d,c,e){var f=g.createEvent("CustomEvent");return f.initCustomEvent(b,!c,!e,d||{}),a.dispatchEvent(f),f},N=function(b,c){var e;
!k&&(e=a.picturefill||d.pf)?e({reevaluate:!0,elements:[b]}):c&&c.src&&(b.src=c.src)},w=function(a,b,c){for(c=c||a.offsetWidth;c<d.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},F=function(b){var c,d=0,e=a.Date,f=function(){c=!1;d=e.now();b()},g=function(){p(f)},k=function(){h(g)};return function(){if(!c){var a=125-(e.now()-d);c=!0;6>a&&(a=6);p(k,a)}}},H=function(){var e,k,l,x,B,y,R,v,O,w,P,Q,H,K,T,Z=/^img$/i,Y=/^iframe$/i,U="onscroll"in a&&!/glebot/.test(navigator.userAgent),
S=0,C=0,A=0,D=0,V=function(a){C--;a&&a.target&&M(a.target,V);(!a||0>C||!a.target)&&(C=0)},ba=function(){var a,b,c,f,h,n,p,s,u;if((B=d.loadMode)&&8>C&&(a=e.length)){b=0;A++;null==K&&("expand"in d||(d.expand=600<m.clientHeight?860<m.clientWidth?500:410:359),H=d.expand,K=H*d.expFactor);for(K>S&&1>C&&3<A&&2<B?(S=K,A=0):S=1<B&&2<A&&6>C?H:0;a>b;b++)if(e[b]&&!e[b]._lazyRace)if(U){(s=e[b].getAttribute("data-expand"))&&(n=1*s)||(n=S);u!==n&&(R=innerWidth+n*T,v=innerHeight+n,p=-1*n,u=n);c=e[b].getBoundingClientRect();
var x;if(x=(Q=c.bottom)>=p)if(x=(O=c.top)<=v)if(x=(P=c.right)>=p*T){if((c=(w=c.left)<=R)&&(c=Q||P||w||O)&&!(c=l&&3>C&&!s&&(3>B||4>A))){var y=e[b];c=n;x=void 0;var t=y,y="hidden"==(getComputedStyle(g.body,null)||{}).visibility||"hidden"!=(getComputedStyle(y,null)||{}).visibility;O-=c;Q+=c;w-=c;for(P+=c;y&&(t=t.offsetParent)&&t!=g.body&&t!=m;)(y=0<((getComputedStyle(t,null)||{}).opacity||1))&&"visible"!=(getComputedStyle(t,null)||{}).overflow&&(x=t.getBoundingClientRect(),y=P>x.left&&w<x.right&&Q>x.top-
1&&O<x.bottom+1);c=y}x=c}if(x){if(W(e[b]),h=!0,9<C)break}else!h&&l&&!f&&4>C&&4>A&&2<B&&(k[0]||d.preloadAfterLoad)&&(k[0]||!s&&(Q||P||w||O||"auto"!=e[b].getAttribute(d.sizesAttr)))&&(f=k[0]||e[b])}else W(e[b]);f&&!h&&W(f)}},s=F(ba),ca=function(a){t(a.target,d.loadedClass);E(a.target,d.loadingClass);M(a.target,da)},da=function(a){a={target:a.target};h(function(){ca(a)})},ea=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},fa=function(a){var b,c,e=a.getAttribute(d.srcsetAttr);
(b=d.customMedia[a.getAttribute("data-media")||a.getAttribute("media")])&&a.setAttribute("media",b);e&&a.setAttribute("srcset",e);b&&(c=a.parentNode,c.insertBefore(a.cloneNode(),a),c.removeChild(a))},J=function(){var a,b=[],c=function(){for(;b.length;)b.shift()();a=!1};return{add:function(d){b.push(d);a||(a=!0,h(c))},run:c}}(),W=function(a){var e,g,k,m,n,q,s,y=Z.test(a.nodeName),v=y&&(a.getAttribute(d.sizesAttr)||a.getAttribute("sizes")),B="auto"==v;(!B&&l||!y||!a.src&&!a.srcset||a.complete||b(a,
d.errorClass))&&(B&&(s=a.offsetWidth),a._lazyRace=!0,C++,d.rC&&(s=d.rC(a,s)||s),J.add(function(){D++;(n=u(a,"lazybeforeunveil")).defaultPrevented||(v&&(B?(I.updateElem(a,!0,s),t(a,d.autosizesClass)):a.setAttribute("sizes",v)),g=a.getAttribute(d.srcsetAttr),e=a.getAttribute(d.srcAttr),y&&(k=a.parentNode,m=k&&f.test(k.nodeName||"")),q=n.detail.firesLoad||"src"in a&&(g||e||m),n={target:a},q&&(M(a,V,!0),clearTimeout(x),x=p(V,2500),t(a,d.loadingClass),M(a,da,!0)),m&&c.call(k.getElementsByTagName("source"),
fa),g?a.setAttribute("srcset",g):e&&!m&&(Y.test(a.nodeName)?ea(a,e):a.src=e),(g||m)&&N(a,{src:e}));h(function(){a._lazyRace&&delete a._lazyRace;E(a,d.lazyClass);q&&!a.complete||(q?V(n):C--,ca(n))})}))},X=function(){if(!l){if(999>Date.now()-y)return void p(X,999);var a,b=function(){d.loadMode=3;s()};l=!0;d.loadMode=3;D?s():p(function(){ba();J.run()});n("scroll",function(){3==d.loadMode&&(d.loadMode=2);clearTimeout(a);a=p(b,99)},!0)}};return{_:function(){y=Date.now();e=g.getElementsByClassName(d.lazyClass);
k=g.getElementsByClassName(d.lazyClass+" "+d.preloadClass);T=d.hFac;n("scroll",s,!0);n("resize",s,!0);a.MutationObserver?(new MutationObserver(s)).observe(m,{childList:!0,subtree:!0,attributes:!0}):(m.addEventListener("DOMNodeInserted",s,!0),m.addEventListener("DOMAttrModified",s,!0),setInterval(s,999));n("hashchange",s,!0);"focus mouseover click load transitionend animationend webkitAnimationEnd".split(" ").forEach(function(a){g.addEventListener(a,s,!0)});/d$|^c/.test(g.readyState)?X():(n("load",
X),g.addEventListener("DOMContentLoaded",s),p(X,2E4));s(0<e.length)},checkElems:s,unveil:W}}(),I=function(){var a,b=function(a,b,c){var d,e,g;if((d=a.parentNode)&&(c=w(a,d,c),g=u(a,"lazybeforesizes",{width:c,dataAttr:!!b}),!g.defaultPrevented&&(c=g.detail.width,c&&c!==a._lazysizesWidth))){if(a._lazysizesWidth=c,c+="px",a.setAttribute("sizes",c),f.test(d.nodeName||""))for(b=d.getElementsByTagName("source"),d=0,e=b.length;e>d;d++)b[d].setAttribute("sizes",c);g.detail.dataAttr||N(a,g.detail)}},c=F(function(){var c,
d=a.length;if(d)for(c=0;d>c;c++)b(a[c])});return{_:function(){a=g.getElementsByClassName(d.autosizesClass);n("resize",c)},checkElems:c,updateElem:b}}(),K=function(){K.i||(K.i=!0,I._(),H._())};return function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.7,hFac:0.8,loadMode:2};
d=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in d||(d[b]=c[b]);a.lazySizesConfig=d;p(function(){d.init&&K()})}(),{cfg:d,autoSizer:I,loader:H,init:K,uP:N,aC:t,rC:E,hC:b,fire:u,gW:w}}});