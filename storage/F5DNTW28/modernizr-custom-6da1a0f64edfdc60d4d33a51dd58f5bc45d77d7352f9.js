!function(e,n,t){function r(e,n){return typeof e===n}function s(){var e,n,t,s,o,i,l;for(var a in x)if(x.hasOwnProperty(a)){if(e=[],n=x[a],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=r(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)i=e[o],l=i.split("."),1===l.length?S[l[0]]=s:(!S[l[0]]||S[l[0]]instanceof Boolean||(S[l[0]]=new Boolean(S[l[0]])),S[l[0]][l[1]]=s),C.push((s?"":"no-")+l.join("-"))}}function o(e){var n=b.className,t=S._config.classPrefix||"";if(_&&(n=n.baseVal),S._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}S._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?b.className.baseVal=n:b.className=n)}function i(e,n){return!!~(""+e).indexOf(n)}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var s;for(var o in e)if(e[o]in n)return t===!1?e[o]:(s=n[e[o]],r(s,"function")?f(s,t||n):s);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(n,t,r){var s;if("getComputedStyle"in e){s=getComputedStyle.call(e,n,t);var o=e.console;if(null!==s)r&&(s=s.getPropertyValue(r));else if(o){var i=o.error?"error":"log";o[i].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else s=!t&&n.currentStyle&&n.currentStyle[r];return s}function p(){var e=n.body;return e||(e=l(_?"svg":"body"),e.fake=!0),e}function v(e,t,r,s){var o,i,a,f,u="modernizr",c=l("div"),d=p();if(parseInt(r,10))for(;r--;)a=l("div"),a.id=s?s[r]:u+(r+1),c.appendChild(a);return o=l("style"),o.type="text/css",o.id="s"+u,(d.fake?d:c).appendChild(o),d.appendChild(c),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(n.createTextNode(e)),c.id=u,d.fake&&(d.style.background="",d.style.overflow="hidden",f=b.style.overflow,b.style.overflow="hidden",b.appendChild(d)),i=t(c,e),d.fake?(d.parentNode.removeChild(d),b.style.overflow=f,b.offsetHeight):c.parentNode.removeChild(c),!!i}function m(n,r){var s=n.length;if("CSS"in e&&"supports"in e.CSS){for(;s--;)if(e.CSS.supports(c(n[s]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];s--;)o.push("("+c(n[s])+":"+r+")");return o=o.join(" or "),v("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==d(e,null,"position")})}return t}function y(e,n,s,o){function f(){c&&(delete j.style,delete j.modElem)}if(o=!r(o,"undefined")&&o,!r(s,"undefined")){var u=m(e,s);if(!r(u,"undefined"))return u}for(var c,d,p,v,y,h=["modernizr","tspan","samp"];!j.style&&h.length;)c=!0,j.modElem=l(h.shift()),j.style=j.modElem.style;for(p=e.length,d=0;p>d;d++)if(v=e[d],y=j.style[v],i(v,"-")&&(v=a(v)),j.style[v]!==t){if(o||r(s,"undefined"))return f(),"pfx"!=n||v;try{j.style[v]=s}catch(e){}if(j.style[v]!=y)return f(),"pfx"!=n||v}return f(),!1}function h(e,n,t,s,o){var i=e.charAt(0).toUpperCase()+e.slice(1),l=(e+" "+E.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?y(l,n,s,o):(l=(e+" "+T.join(i+" ")+i).split(" "),u(l,n,t))}function g(e,n,r){return h(e,t,t,n,r)}var C=[],x=[],w={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){x.push({name:e,fn:n,options:t})},addAsyncTest:function(e){x.push({name:null,fn:e})}},S=function(){};S.prototype=w,S=new S;var b=n.documentElement,_="svg"===b.nodeName.toLowerCase();S.addTest("passiveeventlisteners",function(){var n=!1;try{var t=Object.defineProperty({},"passive",{get:function(){n=!0}});e.addEventListener("test",null,t)}catch(e){}return n});var P="Moz O ms Webkit",E=w._config.usePrefixes?P.split(" "):[];w._cssomPrefixes=E;var T=w._config.usePrefixes?P.toLowerCase().split(" "):[];w._domPrefixes=T;var z={elem:l("modernizr")};S._q.push(function(){delete z.elem});var j={style:z.elem.style};S._q.unshift(function(){delete j.style}),w.testAllProps=h,w.testAllProps=g,S.addTest("flexbox",g("flexBasis","1px",!0)),S.addTest("flexboxtweener",g("flexAlign","end",!0)),s(),o(C),delete w.addTest,delete w.addAsyncTest;for(var N=0;N<S._q.length;N++)S._q[N]();e.Modernizr=S}(window,document);
//# sourceMappingURL=https://academia.edu/assets/maps/modernizr-custom-8d6d3040537337f25fba2793f6e2df551fef2b1142eecb57dd5ee70fd37ee607.js.map