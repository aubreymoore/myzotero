/*! Yieldbot Intent Tag | 2017 Yieldbot, Inc. */var ybotq=ybotq||[],yieldbot=yieldbot||{};!function(){yieldbot.cts_js=+new Date;for(var e,t,o,i,n,r,l=function(){return+new Date},s=function(){return l()-yieldbot.framework_window.yieldbot.cts_js},a=function(){return(0|36*Math.random()).toString(36)},d=function(){return(l().toString(36)+"xxxxxxxxxx".replace(/[x]/g,a)).toLowerCase()},u=Array.prototype.indexOf,c=(function(e,t){var o,i;if(null==e)return-1;if(u&&e.indexOf===u)return e.indexOf(t);for(o=0,i=e.length;o<i;o++)if(o in e&&e[o]===t)return o;return-1}),b=function(e,t){var o,i,n=[];for(o=0,i=e.length;o<i;o++)e[o]!==t&&n.push(e[o]);return n},y=function(e,t){null==t&&(t=S),e?ue("_debug",e,t):be("_debug")},f=function(){var e=arguments,t=Array.prototype.slice.call(e);1===t.length&&t.push(s()),yieldbot.framework_window.yieldbot._history.push(t),de("_debug")&&w(t)},p=function(e){f.apply(null,["ybotq.push."+yieldbot.framework_window.yieldbot._pushCount,s(),e]),yieldbot.framework_window.yieldbot._pushCount+=1},_=function(e,t){return function(){var o=Array.prototype.slice.call(arguments);return o.unshift(s()),o.unshift(e),f.apply(null,o),t.apply(null,arguments)}},m=function(){if(yieldbot.framework_window.console){yieldbot.framework_window.console.group&&yieldbot.framework_window.console.group("Yieldbot History");for(var e=0,t=yieldbot.framework_window.yieldbot._history.length;e<t;e++)w(yieldbot.framework_window.yieldbot._history[e]);yieldbot.framework_window.console.groupEnd&&yieldbot.framework_window.console.groupEnd()}},w=function(){yieldbot.framework_window.console&&yieldbot.framework_window.console.log&&yieldbot.framework_window.console.log.apply(yieldbot.framework_window.console,arguments)},h=/^\s\s*/,g=/\s\s*$/,v=function(e){return e.replace(h,"").replace(g,"")},k="v2017-05-23|e6df8ce",j=window,z=window.top,x=escape,T=unescape,S=3e5,C=1e3,q=!1,A=!1,E=[],P=[],I={},M=null,D=!1,N={},O={},B="i",L=!1,R=!1,H=null,G={},W=null,Y=null,$=function(e,t){return e.getElementById(t)},F=function(e,t){if(0===arguments.length){B&&(e="//"+B+".yldbt.com/m/");var o=de("c",!0);return o&&(e=o),"http://"===e.slice(0,7)&&(e=e.slice(5)),"//"===e.slice(0,2)&&(e=("https:"===document.location.protocol?"https:":"http:")+e),e}ue("c",e,S),f("url_prefix",e),t&&(q=t)},V=function(e,t,o){var i,n=e.length,r=t||";",l=o||"=";for(i=0;i<n;i++)1===e[i].length?e[i]=e[i][0]:2===e[i].length&&(e[i]=e[i][0]+l+x(e[i][1]));return e.join(r)},J=function(e){return q&&e.push(["_url_prefix",F()]),e.push(["e"]),V(e,"&")},K=function(e){var t,o,i,n,r,l,s=[],a={};for(t=0;t<e.length;t++){if(o=[],n=e[t].slot,"string"===Ve(n)&&!a[n])for(i in e[t])e[t].hasOwnProperty(i)&&(r=x(i),l=x(e[t][i]),o.push(r+"="+l));a[n]=!0,s.push(o.join(","))}return s.join("|")},Q=function(){var e,t,o,i,n,r,l,s={};if(l=de("z"))for(o=l.split("|"),e=0;e<o.length;e++){for(i=o[e].split(","),r={},t=0;t<i.length;t++)n=i[t].split("="),r[n[0]]=n[1];r.slot?s[r.slot]=r:f("missing `slot` field for slot",o[e])}return s},U=function(){R=!0},X=function(){R=!1},Z=function(e){if(0===arguments.length)return n||de("b",!0);yieldbot.framework_window.yieldbot._initialized||(n=v(""+e),ue("b",n,S))},ee=function(e){n=v(""+e)},te=function(e){C=e},oe=function(e){r=e},ie=function(e){if(0===arguments.length)return B||de("d",!0);B=v(""+e),ue("d",B,S)},ne=function(e){B=e},re=function(e){return F()+Z()+"/"+e},le=function(e,t){var o=new Image(1,1);o.onload=function(){},o.src=re(e)+"?"+t},se=function(e,t,o){var i=re(t)+"?"+o;if(R){var n=e.document.createElement("script");n.src=i;var r=e.document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r)}else e.document.write('<script type="text/javascript" src="'+i+'"><\/script>')},ae=function(e){le("info.gif",J(e))},de=function(e,t){var o="__ybot"+e;try{var i=new RegExp("(^|;)[ ]*"+o+"=([^;]*)"),n=i.exec(yieldbot.framework_window.document.cookie);return n?T(n[2]):void 0}catch(e){if(!t){var r=[];r.push(["v",k]),r.push(["op","getCookie"]),r.push(["ts",l()]),r.push(["k",o]),r.push(["m",e?e.message||e:"_info"]),ae(r)}return!1}},ue=function(e,t,o,i,n,r){n=H||n;var s="__ybot"+e;try{var a;o&&(a=new Date,a.setTime(a.getTime()+o)),yieldbot.framework_window.document.cookie=s+"="+x(t)+(o?";expires="+a.toGMTString():"")+";path="+(i||"/")+(n?";domain="+n:"")+(r?";secure":"")}catch(e){var d=[];d.push(["v",k]),d.push(["op","setCookie"]),d.push(["ts",l()]),d.push(["k",s]),d.push(["ev",t]),d.push(["m",e?e.message||e:"_info"]),ae(d)}},ce=function(e){if(0===arguments.length)return H;if(f.apply(null,["setting domain name",e]),null!=e){var t=new RegExp(e.replace(/^\./,"")+"$");document.domain.match(t)||f.apply(null,["domain name error","can't set \""+e+'" as the domain because is\'s not part of "'+document.domain+'"'])}H=e},be=function(e,t,o,i){ue(e,"",-1,t,o,i)},ye=function(e){e?(ue("n","1",S),be("a"),be("e"),be("z")):be("n")},fe=function(){A=!0},pe=function(){return de("u")},_e=function(){var e=de("s");if(e)return e.split(".")[0]},me=function(){if(r)return r;var e=de("s");return e?e.split(".")[2]:void 0},we=function(){var e,t,o,i,n,a,u,c,b,y,p,_,m=yieldbot.framework_window,w=m.document,h=m.screen,g=m.navigator,v=/[ +]/g,j=function(e){return e.replace(v,"%20")};t=d(),_=l(),p=de("v"),o=de("u")||d(),c=de("s"),b=de("n"),c?(u=c.split("."),n=u[0],a=1+parseInt(u[3],10),y=parseInt(u[1],10),e=u[2]):(n=d(),a=1,y=p?0:1),i=[n,y,t,a].join("."),ue("u",o,2592e6),ue("v",_,2592e6),ue("s",i,S),b&&ue("n",b,S),r=t,be("a"),be("p"),be("e"),be("z");var x=[];if(x.push(["cb","yieldbot.updateState"]),x.push(["v",k]),x.push(["vi",o]),x.push(["si",n]),x.push(["pvi",t]),x.push(["pvd",a]),e&&x.push(["lpvi",e]),y&&x.push(["nv"]),M&&x.push(["npv",1]),function(){if("boolean"===Ve(g.cookieEnabled))return!g.cookieEnabled;return function(){return ue("t","1"),"1"!==de("t")}()}()&&x.push(["cd"]),P.length){x.push(["sn",P.join("|")]);var T,C,q=[];for(T=0;T<P.length;T++)C=P[T],G[C]?q.push(G[C].join(".")):q.push("");x.push(["ssz",q.join("|")])}return b&&x.push(["sb"]),Y&&x.push(["itc",Y]),x.push(["lo",j(w.location.href)]),x.push(["r",j(function(){var e="";if(M)return M;try{e=z.document.referrer}catch(t){if(m.parent)try{e=m.parent.document.referrer}catch(t){e=""}}return""===e&&(e=w.referrer),e}())]),x.push(["sd",h.width+"x"+h.height]),x.push(["to",(new Date).getTimezoneOffset()/60]),x.push(["la",g.language||g.userLanguage]),x.push(["np",g.platform]),x.push(["ua",g.userAgent]),p&&x.push(["lpv",_-parseInt(p,10)]),yieldbot.framework_window.yieldbot.cts_ns&&x.push(["cts_ns",yieldbot.framework_window.yieldbot.cts_ns]),x.push(["cts_js",yieldbot.framework_window.yieldbot.cts_js]),yieldbot.framework_window.yieldbot.cts_ini=l(),x.push(["cts_ini",yieldbot.framework_window.yieldbot.cts_ini]),f("cts_ini",s(),yieldbot.framework_window.yieldbot.cts_ini),J(x)},he=function(e,t,o,i,n,r,l){var s,a;a=n.createElement("iframe"),a.frameBorder="0",a.width=r,a.height=l,a.scrolling="no",a.id=o,i&&(a.src="javascript:false"),a.allowTransparency="true",e.appendChild(a);try{a.contentWindow.document.open()}catch(e){s="javascript:var d=document.open();d.domain='"+yieldbot.framework_window.document.domain+"';",a.src=s+"void(0);"}try{var d=a.contentWindow.document;d.write(t),d.close()}catch(e){a.src=s+'d.write("'+t.replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}},ge=function(e){yieldbot.framework_window.yieldbot["cts_rend_"+e.request_id]=l(),f("cts_rend",e.request_id,yieldbot.framework_window.yieldbot["cts_rend_"+e.request_id]);var t=e.size[0],o=e.size[1],i=e.html,n=e.style,r=!e.silent,s=e.request_id,a=e.wrapper_id,d=e.delay,u=a||"ybot-"+s,c=j,b=c.document,y=$(b,u),p=b.createElement("div"),_=p.style;p.className="ybot-creative creative-wrapper",y.appendChild(p),_.width=t+"px",_.height=o+"px",r&&(i+='<script type="text/javascript">var y=window.parent.yieldbot;y.impression("'+s+'");<\/script>');var m="<!DOCTYPE html><head><meta charset=utf-8><style>"+n+"</style></head><body>"+i+"</body>",w=/MSIE[ ]+6/.test(c.navigator.userAgent),h=u+"-iframe";null!=d?setTimeout(function(){he(p,m,h,w,b,t,o)},d):he(p,m,h,w,b,t,o)},ve=function(){var e=de("u");e&&ue("u",e,S),be("v")},ke=function(e,t,o){var i=c(P,e),n={};if(-1===i&&(P.push(e),I[e]=t),"object"===Ve(t)?n=t:"string"===Ve(t)&&(n.dom_id=t),"string"===Ve(n.dom_id)?N[e]=n.dom_id:delete N[e],"number"===Ve(o)?(n.time=o,O[e]=n.time):delete O[e],Je(n.sizes)){var r,l=[];if(2===n.sizes.length&&"number"===Ve(n.sizes[0])&&"number"===Ve(n.sizes[1]))l.push(n.sizes.join("x"));else for(r=0;r<n.sizes.length;r++)Je(n.sizes[r])?l.push(n.sizes[r].join("x")):p("invalid slot size "+n.sizes[r]);G[e]=l}null!=t&&"string"!==Ve(t)&&"object"!==Ve(t)&&f("invalid slot config",t),f("slot config",e,n)},je=function(e){var t,o,i,n,r,l=[],s=[];for(o=0;o<e.length;o++)"string"===Ve(e[o])?(t=e[o].split(":"),i=t[0],n=t[1],-1===c(l,i)&&(l.push(i),r={slot:i},n&&(r.size=n),s.push(r))):f("invalid slot type",e[o]);ue("a",l.join("."),S),ue("z",K(s),S)},ze=function(e){var t,o,i=[],n=[],r=[];for(t=0;t<e.length;t++)"object"===Ve(e[t])&&(o=e[t],o.slot?o.alternate&&"y"===o.alternate?-1===c(r,o.slot)&&r.push(o.slot):-1===c(i,o.slot)&&(i.push(o.slot),n.push(o)):f("missing required `slot` field",o));ue("a",i.join("."),S),ue("e",r.join("."),S),ue("z",K(n),S)},xe=function(){return"."===de("a")},Te=function(){var e=de("a");return xe()?[]:e?e.split("."):[]},Se=function(){var e=de("e");return e?e.split("."):[]},Ce=function(e){var t,o,i=[];for(t=0;t<e.length;t++)o=e[t].split(":")[0],i.push(o);ue("e",i.join("."),S)},qe=function(e){L=e},Ae=function(e,t,o,i){var n,r,l=o||"ybot_",s=[],a=[],d=Q();for(i=i||",",s.push(["y"]),n=0;n<e.length;n++)r=d[e[n]],"object"===Ve(r)&&r.size?a.push(e[n]+":"+r.size):a.push(e[n]);return s.push([l+"slot",a.join(i)]),s.push([l+"psn",Z()]),s.push([l+"pvi",me()]),s.push([l+"subdomain",ie()]),V(s,t)},Ee=function(e){var t,o,i,n,r=Te(),l=Se();if(!e)return!1;if(e.split&&(n=e.split(",")),n||(n=e),(o=n.length)&&xe())return i=Math.round(Math.random()*(o-1)),v(n[i]);for(t=0;t<o;t++)if(c(r,v(n[t]))>-1)return L&&(be("a"),be("e"),be("z")),v(n[t]);if(l.length)for(t=0;t<o;t++)if(c(l,v(n[t]))>-1)return L&&(be("a"),be("e"),be("z")),v(n[t]);return!1},Pe=function(e,t,o){var i=Ee(e);return i?Ae([i],t,o):"n"},Ie=function(e,t,o,i){var n,r,l,s,a=[],d=Q();if(i=i||["size","cpm","ds"],o=o||"ybot_",l=Ee(e),s=d[l],l&&"array"===Ve(i))for(a.push(["y"]),a.push([o+"slot",l]),n=0;n<i.length;n++)r=i[n],void 0!==s[r]&&a.push([o+r,s[r]]),f("slotParams",r+" is ",s[r]);else a.push(["n"]);return l||f("slotParams","could not find slotName",e),"array"!==Ve(i)&&f("slotParams","params type","expected:array","actual:"+Ve(i)),V(a,t)},Me=function(e){var t=Te();return t.length?Ae(t,"&","ybot_",e):"n"},De=function(e){return Ee(e)?"y":"n"},Ne=function(e,t){Ee(t)&&googletag.cmd.push(function(){googletag.pubads().setTargeting(e,"y")})},Oe=function(e,t){Ee(t)&&GA_googleAddAttr(e,"y")},Be=function(){!D&&yieldbot.framework_window.yieldbot._initialized||(o=l(),t=t||yieldbot.framework_window.yieldbot.default_init_timeout,setTimeout(function(){if(!i){var e="init response took more than "+t+"ms to load, triggering resume()";f(e);var o=[["v",k],["ts",l()],["api_error",e]];ae(o),tt()}},t),null!=Z()&&(f("triggering init call"),yieldbot.framework_window.yieldbot._initialized=!0,se(yieldbot.framework_window,"v1/init",we()),fe(),M=j.document.location.href))},Le=function(e,t){var o,i,n,r,s=[];i=d(),s.push(["v",k]),s.push(["vi",pe()]),s.push(["si",_e()]),s.push(["pvi",me()]),s.push(["ri",i]),t&&s.push(["wi",t]);for(o in e)if(e.hasOwnProperty(o)&&(s.push([o,e[o]]),("slot"===o||"ad_slot"===o)&&!xe())){be("e"),r=e[o],e[o].match(/\:/)&&(r=e[o].split(":")[0]),n=b(Te(),r),ue("a",n.join("."),S);var a=Q();if(delete a[r]){var u=[];for(var c in a)u.push(a[c]);ue("z",K(u),S)}}R||t||j.document.write('<div id="ybot-'+i+'"></div>');var y=l();yieldbot.framework_window.yieldbot["cts_ad_"+e.slot]=y,yieldbot.framework_window.yieldbot.cts_res&&s.push(["cts_res",yieldbot.framework_window.yieldbot.cts_res]),s.push(["cts_ad",y]),f("cts_ad",e.slot,y),se(j,"ad/creative.js",J(s))},Re=function(e,t){var o,i=j,n=i.document;if(!N[e]||!document.getElementById(N[e]))return void f("invalid slot","requestedSlot="+e,"_slotToDomId[requestedSlot]="+N[e]);if(z===j&&!yieldbot.framework_window.yieldbot._initialized)return void E.push(function(){setTimeout(function(){Re(e,t)},0)});var r=O[e]||2e3,l=Ee(e);l&&!Te()&&N[e]?(o=$(n,N[e]),o.innerHTML="",Le({slot:l},N[e])):Se().length?setTimeout(function(){l=Ee(e),l?(o=$(n,N[e]),o.innerHTML="",Le({slot:l},N[e])):t()},r):t()},He=function(e){var t=window,o="none",i=[];i.push(["v",k]),i.push(["vi",pe()]),i.push(["si",_e()]),i.push(["pvi",me()]),i.push(["ri",e]),$(j.document,"ybot-frame-"+e);var n=l();for(yieldbot.framework_window.yieldbot["cts_imp_"+e]=n,i.push(["cts_rend",yieldbot.framework_window.yieldbot["cts_rend_"+e]]),i.push(["cts_imp",n]);t!==z;)try{t=t.parent,t.document,o="so"}catch(e){o="co"}i.push(["it",o]),f("cts_imp",e,n),le("ad/impression.gif",J(i))},Ge=!1,We=[],Ye={dfp_sb_manager:2,psn:1,ad:1,init:0},$e=function(e){var t,o,i;if(We.push(e),i=We[0],!Ye.hasOwnProperty(i)){var n=[];for(n.push(["v",k]),n.push(["ts",l()]),n.push(["api_error",i+" not supported with unwrapped call"]),o=We.length,t=0;t<o;t++)n.push(["arg_stack",We[t]]);return ae(n),["noop"]}return Ye[i]===We.length-1?(Ge=!0,We):["noop"]},Fe={},Ve=function(e){return null==e?String(e):Fe[Object.prototype.toString.call(e)]||"object"},Je=Array.isArray||function(e){return"array"===Ve(e)},Ke=function(e){var t,o,i,n,r;if(o=Q()[e],r=De(e),t={ybot_ad:r},"y"===r&&"object"===Ve(o))for(i in o)n="ybot_"+i,t[n]=o[i];return t},Qe=function(e,t){var o,i,n=[];if(e=e||":",t=t||",",o=Q(),"object"===Ve(o))for(i in o)n.push([i,o[i].size,o[i].ds?"ds":o[i].cpm].join(e));return n.join(t)},Ue=function(e,t){var o,i;if(t&&"function"===Ve(t.setTargeting)){o=Ke(e);for(i in o)t.setTargeting(i,o[i])}},Xe=function(e){var t=Q()[e],o="";return t&&t.size&&(o=t.size),o},Ze=function(e){var t,o,i,n,r,s;if(p(e.toString()),"function"===Ve(e))i=e;else{if(Je(e)||(e=$e(e)),r=e[0],s=e.slice(1),yieldbot.hasOwnProperty(r))i=yieldbot[r],s&&(n=s);else{var a=[];for(a.push(["v",k]),a.push(["op",r]),a.push(["ts",l()]),a.push(["api_error",r+" function not available"]),o=s.length,t=0;t<o;t++)a.push(["arg",s[t]]);ae(a),i=yieldbot.noop}Ge&&(Ge=!1,We=[])}if(A&&"resume"!==r)E.push(e);else try{i.apply(yieldbot,n||[])}catch(e){var a=[];a.push(["v",k]),a.push(["ts",l()]),de("_debug")&&(w("Caught error in ybotq.push"),w(e.stack||e.stackTrace||"Error in ybotq.push with no stack trace")),a.push(["apie",e.message||e]);try{ae(a)}catch(e){}}},et=function(e){var t,o;if(!e.framework)for(o=e.length,t=0;t<o;t++)Ze(e[t])},tt=function(){yieldbot.framework_window.yieldbot.cts_res=l(),f("cts_res",s(),yieldbot.framework_window.yieldbot.cts_res),A=!1,et(E),E=[]},ot=function(e){if(i=l()-o,W=e,i>t)return void f("init took "+i+"ms to respond",s(),e);"object"!==Ve(e)?(f("invalid data structure returned for v1/init",e),w("invalid data structure returned for v1/init",e),tt()):("array"===Ve(e.errors)&&e.errors.length>0&&(f("vi/init errors",e.errors),e.integration_test&&yieldbot.framework_window.alert(e.errors)),"array"===Ve(e.warnings)&&e.warnings.length>0&&(f("vi/init warnings",e.warnings),e.integration_test&&yieldbot.framework_window.alert(e.warnings)),e.slots||f("v1/init warnings","no slots"),e.slots&&"array"===Ve(e.slots)&&ze(e.slots),e.subdomain_iframe&&ne(e.subdomain_iframe),e.url_prefix&&F(e.url_prefix),e.block_session&&ye(e.block_session),e.ad_serve_first_slot_only&&qe(e.ad_serve_first_slot_only),tt())},it=function(){return"object"===Ve(W)&&"undefined"!==Ve(W.minibar)&&"undefined"!==Ve(n)},nt=function(e){if(it()){var t,o,i,n="https:"===j.document.location.protocol?"https:":"http:";t=j.document.getElementsByTagName("script")[0],o=j.document.createElement("script"),o.src=n+"//cdn.yldbt.com/js/yieldbot.minibar.js",o.onload=function(){(i=yieldbot.minibar)&&(i.extraContent=e,i.initResponse=W,i.render())},t.parentNode.insertBefore(o,t)}},rt=function(){Y=1},lt=function(){var e=null;return W&&W.trending&&W.trending.data&&(e=W.trending),e},st=function(e,t){D=!0;var o=Ve(e);if("function"===o&&"object"===Ve(t)){var i="init not called. invalid parameter order - nextPageview(object, function): "+o+", "+Ve(t);return f(i),void w(i)}t="function"===o?e:t;var n="";if("object"!==o)for(n in I)ke(n,I[n]);else{P=[],G={};for(n in e)ke(n,{sizes:e[n]})}Be(),"function"===Ve(t)&&ybotq.push(t)},at="Boolean Number String Function Array Date RegExp Object".split(" "),dt=0;dt<at.length;dt++)Fe["[object "+at[dt]+"]"]=at[dt].toLowerCase();if(!yieldbot.framework){yieldbot.framework=!0,yieldbot.default_init_timeout=4e3,yieldbot.noop=function(){},yieldbot.enableAsync=yieldbot.enable_async=_("yieldbot.enableAsync",U),yieldbot.enableSync=yieldbot.enable_sync=_("yieldbot.enableSync",X),yieldbot.data_collection_opt_out=_("yieldbot.data_collection_opt_out",ve),yieldbot.dfp_sb_manager=_("yieldbot.dfp_sb_manager",Ne),yieldbot.gam_manager=_("yieldbot.gam_manager",Oe),yieldbot.pub=yieldbot.psn=_("yieldbot.pub",Z),yieldbot.psn_iframe=_("yieldbot.psn_iframe",ee),yieldbot.subdomain=_("yieldbot.subdomain",ie),yieldbot.pvi_iframe=_("yieldbot.pvi_iframe",oe),yieldbot.subdomain_iframe=_("(deprecated) yieldbot.subdomain_iframe",ne),yieldbot._block_session=_("(deprecated) yieldbot._block_session",ye),yieldbot._url_prefix=_("(deprecated) yieldbot._url_prefix",F),yieldbot.ad_serve_first_slot_only=_("(deprecated) yieldbot.ad_serve_first_slot_only",qe),yieldbot.set_slots=_("(deprecated) yieldbot.set_slots",je),yieldbot.set_alternate_slots=_("(deprecated) yieldbot.set_alternate_slots",Ce),yieldbot.resume=_("(deprecated) yieldbot.resume",tt),yieldbot.ad_params=_("yieldbot.ad_params",Pe),yieldbot.run_queue=_("yieldbot.run_queue",et),yieldbot.defineSlot=_("yieldbot.defineSlot",ke),yieldbot.adAvailable=_("yieldbot.adAvailable",De),yieldbot.slot_available=_("yieldbot.slot_available",Ee),yieldbot.alternateSlot=_("yieldbot.alternateSlot",Re),yieldbot.params=_("yieldbot.params",Pe),yieldbot.slotParams=_("yieldbot.slotParams",function(e,t,o,i){return Ie(e,t,o,i)}),yieldbot.singleRequestParams=_("yieldbot.singleRequestParams",Me),yieldbot._erase_cookie=_("yieldbot.eraseCookie",be),yieldbot._get_cookie=_("yieldbot.getCookie",de),yieldbot._set_cookie=_("yieldbot.setCookie",ue),yieldbot._render=_("yieldbot._render",ge),yieldbot._info=_("yieldbot.info",ae),yieldbot._info_init_time_limit=_("yieldbot._info_init_time_limit",te),yieldbot.type=_("yieldbot.type",Ve),yieldbot.debug=_("yieldbot.debug",y),yieldbot.log=_("yieldbot.log",f),yieldbot.dumpLog=_("yieldbot.dumpLog",m),yieldbot.go=yieldbot.enablePub=yieldbot.track=yieldbot.init=_("yieldbot.go",Be),yieldbot.ad=_("yieldbot.ad",Le),yieldbot.renderAd=_("yieldbot.renderAd",function(e,t){Le({slot:e},t)});var ut=!1;for(yieldbot.renderIfAvailable=_("yieldbot.renderIfAvailable",function(e,t){Ee(e)&&(ut=!0,Le({slot:e},t))}),yieldbot.adNotAvailable=_("yieldbot.adNotAvailable",function(e){ut||e()}),yieldbot.getAvailableSizes=_("yieldbot.getAvailableSizes",Xe),yieldbot.setSlotTargeting=_("yieldbot.setSlotTargeting",Ue),yieldbot.getSlotCriteria=_("yieldbot.getSlotCriteria",Ke),yieldbot.updateState=_("yieldbot.updateState",ot),yieldbot.hasMinibar=_("yieldbot.hasMinibar",it),yieldbot.renderMinibar=_("yieldbot.renderMinibar",nt),yieldbot.includeTrendingContent=_("yieldbot.includeTrendingContent",rt),yieldbot.getTrendingContent=_("yieldbot.getTrendingContent",lt),yieldbot.getPageCriteria=_("yieldbot.getPageCriteria",Qe),yieldbot.nextPageview=_("yieldbot.nextPageView",st),yieldbot.setInitTimeout=_("yieldbot.setInitTimeout",function(e){"number"===Ve(e)?t=e:f('called "yieldbot.setInitTimeout" with "'+Ve(e)+'" instead of "number"',s())}),yieldbot.getInitTimeout=_("yieldbot.getInitTimeout",function(){return t}),yieldbot.impression=_("yieldbot.impression",He),yieldbot.framework_window=j,yieldbot._initialized=!1,yieldbot._history=[],yieldbot._pushCount=0,yieldbot.domainName=_("yieldbot.domainName",ce),yieldbot.__resetDefaults=function(){yieldbot._initialized=!1,P=[],I={},G={},N={},O={},n=void 0;var e,t=["a","b","c","d","e","p","s","t","v","u","n","z","_opt_out","_debug"];for(e=0;e<t.length;e++)be(t[e]);f("__resetDefaults was called!")},yieldbot.__initial_message=we,yieldbot.__getDefinedSlots=function(){return P},yieldbot.__getSlotToDomId=function(){return N},yieldbot.__getSlotTimeout=function(){return O},yieldbot.__getMultiSize=function(){return G},e=window;e!==z;)try{e=e.parent,e.ybotq&&e.ybotq.framework&&(yieldbot.framework_window=e)}catch(e){}var ct=j===yieldbot.framework_window;yieldbot.framework_window.performance&&yieldbot.framework_window.performance.timing?(yieldbot.framework_window.yieldbot.cts_ns=window.performance.timing.navigationStart,ct||f("subsequent yieldbot.intent tag load",yieldbot.cts_js-yieldbot.framework_window.yieldbot.cts_js)):ct||f("subsequent yieldbot.intent tag load","unknown"),ct&&(f("cts_ns",s(),yieldbot.framework_window.yieldbot.cts_ns),f("cts_js",s(),yieldbot.framework_window.yieldbot.cts_js)),et(ybotq),ybotq={push:function(){var e,t=arguments.length;for(e=0;e<t;e++)Ze(arguments[e])},framework:!0}}}();