// Copyright (c) ADRTA.COM 2011-2015 - ALL RIGHTS RESERVED
if(!window.__adrta__aait){__adrta__aait=""}if(!window.__adrta__aasi){__adrta__aasi=""}if(!window.__adrta__aast){__adrta__aast=""}if(!window.__adrta__aavi){__adrta__aavi=""}if(!window.__adrta__aavt){__adrta__aavt=""}if(!window.__adrta__aadb){__adrta__aadb=""}if(!window.__adrta__aasm){__adrta__aasm=0}this["Pixalate"+16971568249587430]=(function(){var aR="1493207116322";var H=false;var aS=false;var ar=16971568249587430;var ab="xmMNecLkdQwhK4o5XgOpPmudN8QpcaNJVR9Zl71bMXo=";var aZ="101.99.173.208, 10.2.4.14";var Z="14.7";var s=/(http)?(s)?(:)?\/\/(cdn|js|q|testbed).(adrta|rta247|pixalate).(com|net)\/(script\/|s\/[a-zA-Z]*\/)?(p|pnf).js(\?|#).*/;var x=/(?:\?([^#]*))/;var R=/https?:\/\/\w.*[\w]/;var G=/(\w+):\/{2}([^\/:]+)(?:\:(\d+))?(\/(?:[^?]+\/)?)?([^\?#]+)?(?:\?([^#]*))?(\#.*)?$/;var aA=",88x31,120x20,120x240,120x60,120x600,120x90,125x125,160x600,168x28,168x42,168X42,180x150,192x53,200x200,216x36,216x54,234x60,240x400,250x250,250x970,300x100,300x1050,300x150,300x250,300x50,300x600,300x75,320x50,320x100,320x480,336x280,400x300,468x60,480x320,550x480,640x480,700x500,720x300,728x90,768x1024,850x30,950x90,970x250,970x90,970x66,1024x768,";var u=[15000,15000,30000,30000,60000,60000];var D=[15000,15000,30000,30000,60000,60000];var bd=0;var aP=100;var aJ=0.5;var at=242500;var z=511;var aX=2047;var a2=9000000000000000;var aB=false;var f=[];var ax=false;var o=false;var aq=false;var aT=!!navigator.userAgent.match(/safari/i)&&!navigator.userAgent.match(/chrome/i)&&typeof document.body.style.webkitFilter!=="undefined"&&!window.chrome;var aW=new Date().getTimezoneOffset();var N=(navigator.userAgent.indexOf("Opera Mini")!=-1);var bc=(navigator.userAgent.indexOf("MSIE")!=-1);var aE=window.location.protocol;if(aE.indexOf("http")!=0){aE="http:"}f.push(ar);var ap=0;var I=null;try{I=document.currentScript}catch(am){}if(!I){ap=1;var aw=document.getElementsByTagName("script");var K=[];for(var ai=0;ai<aw.length;++ai){K[ai]=aw[ai]}I=K[K.length-1];for(var ae=K.length-1;ae>=0;--ae){var ad=K[ae];if(ad&&ad.src&&s.test(ad.src)&&new RegExp("&cb=([^#]*)?").exec(ad.src)[1]==ab){I=ad;ap=0;break}}}var a9=I.src.substring(I.src.indexOf("#")+1).replace(/%%/g,"%25%25").split(";");var X=a9.shift();if(X.indexOf("=")!=-1||X.length==0||I.src.indexOf("#")==-1){X="px"}var q=[];for(var ah=0;ah<a9.length;++ah){if(a9[ah].indexOf("blocked")!=-1){aB=true}if(R.test(a9[ah])){a9[ah]=a9[ah].replace(G,"$1://$2$4$5")}if(a9[ah].indexOf("kv2=")!=-1){q.push(a9.splice(ah,1))}}var a0="__aaci="+X;if(a9.length>0){a0+="&"+a9.join("&")}var a1=a0.indexOf("&__aa__=");if(a1!=-1){a0=a0.substring(0,a1)}__adrta__aadb=aS||__adrta__aadb||(("&"+a0+"&").indexOf("&debug=true&")!=-1);var y=true;var m=0;var aO="";var al="";var aN=window;try{var V=window;for(var ai=0;ai<16;++ai){y=true;try{aO=V.location.href.replace(x,"").substring(0,z);if(aO=="undefined"){aO=V.location.href.substring(0,z)}al=V.document.referrer.replace(x,"").substring(0,z);if(al=="undefined"){al=V.document.referrer.substring(0,z)}aN=V}catch(am){if(window.location.ancestorOrigins&&window.location.ancestorOrigins.length>0){al=window.location.ancestorOrigins[window.location.ancestorOrigins.length-1]}y=false}if(V==window.top){break}V=V.parent;++m}}catch(am){y=false;if(window.location.ancestorOrigins&&window.location.ancestorOrigins.length>0){al=window.location.ancestorOrigins[window.location.ancestorOrigins.length-1]}}if(window.location.ancestorOrigins&&window.location.ancestorOrigins.length>0){var L=window.location.ancestorOrigins[window.location.ancestorOrigins.length-1]}var k=false;var an=(document.hasFocus&&document.hasFocus())||(aN.document.hasFocus&&aN.document.hasFocus());if(y){var aQ=null;if(bc){aQ=aN.document.onfocusin;aN.document.onfocusin=function(){an=true;if(aQ){try{aQ()}catch(i){}}}}else{aQ=aN.onfocus;aN.onfocus=function(){an=true;if(aQ){aQ()}}}var Y=null;var aK=null;if(bc){Y=aN.document.onfocusout;aN.document.onfocusout=function(){if(aK!=aN.document.activeElement){aK=aN.document.activeElement}else{an=false;if(Y){try{Y()}catch(i){}}}}}else{Y=aN.onblur;aN.onblur=function(){an=false;if(Y){Y()}}}}var aF=0;var a5=0;var F=function(){if(a5!=0){var i=new Date().getTime();aF+=i-a5;a5=i}var e=aF;aF=0;return e};var g=function(){var i=function(){a5=new Date().getTime()};var e=function(){if(a5!=0){aF+=new Date().getTime()-a5;a5=0}};if(a4.addEventListener){a4.addEventListener("mouseover",i,false);a4.addEventListener("mouseout",e,false)}else{if(a4.attachEvent){a4.attachEvent("mouseover",i);a4.attachEvent("mouseout",e)}}};var a4=null;var bj=false;var v=0;var aH=0;var be=0;var aM=new Date().getTime();var ak=null;var a8=function(e,i){return(aA.indexOf(","+e+"x"+i+",")!=-1)};var aI=function(e){if(e.getAttribute("height")){return parseInt(e.getAttribute("height"))}if((e.style)&&(e.style.height)&&(e.style.height.indexOf("%")==-1)){return parseInt(e.style.height)}return e.offsetHeight};var aj=function(e){if(e.getAttribute("width")){return parseInt(e.getAttribute("width"))}if((e.style)&&(e.style.width)&&(e.style.height.indexOf("%")==-1)){return parseInt(e.style.width)}return e.offsetWidth};var aL=function(j){if(!j){return j}if(j.nodeType!=1){return aL(j.nextSibling)}if(j.tagName=="SCRIPT"){return aL(j.nextSibling)}var e=aj(j);var n=aI(j);if(a8(e,n)){v=e;aH=n;return j}if(j.tagName=="IMG"){return aL(j.nextSibling)}if(!j.firstChild){return aL(j.nextSibling)}var i=aL(j.firstChild);if(i){return i}return aL(j.nextSibling)};function ba(i,e){return((e.width*e.height)/(i.width*i.height)>=0.5)}function bg(i,e){delete i.visibleTimeout;az(e.takeRecords());if("isVisible" in i){delete i.isVisible;d=true;e.unobserve(i)}}var az=function(e){e.forEach(function(i){o=true;var j=i.target;j.isVisible=ba(i.boundingClientRect,i.intersectionRect);if("isVisible" in j){j.visibleTimeout=setTimeout(bg,1000,j,ak)}else{if("visibleTimeout" in j){clearTimeout(j.visibleTimeout);delete j.visibleTimeout}}})};var aU=function(){a4=aL(I.parentNode.firstChild);if(!a4&&(window!=top)){a4=aL(document.body)}if(a4){bj=true;be=new Date().getTime()-aM;if(be<1){be=1}if(v!=0&&aH!=0){if((v*aH)>=at){aJ=0.3}}try{ak=new IntersectionObserver(az,{threshold:[aJ]});if(ak){ax=true;ak.observe(a4)}}catch(i){}g()}};aU();if(bj&&y){ax=true;o=true}var a=false;var r=0;var p=0;var Q=0;var ac=0;var d=false;var aV=new Date().getTime();var bi=false;var a7=0;var M=0;var aa=[0,0,0,0,0,0,0];var av=function(){var i=new Date().getTime();var e=i-aV;aV=i;return e};var bh=function(e){var j=0;var i=0;if(e.offsetParent){do{if(e.style.position=="fixed"){j=e.getBoundingClientRect().left;i=e.getBoundingClientRect().top;break}j+=e.offsetLeft;j-=e.scrollLeft;i+=e.offsetTop;i-=e.scrollTop}while((e=e.offsetParent)&&(e.tagName!="BODY"))}return[j,i]};var E=function(j){try{var bk=j.parent.document.getElementsByTagName("IFRAME");for(var n=0;n<bk.length;n++){if(bk[n].contentWindow==j){return bk[n]}}}catch(w){}return null};var U=function(){var i=0;var e=0;if(typeof(aN.innerWidth)=="number"){i=aN.innerWidth;e=aN.innerHeight}else{if(aN.document.documentElement&&(aN.document.documentElement.clientWidth||aN.document.documentElement.clientHeight)){i=aN.document.documentElement.clientWidth;e=aN.document.documentElement.clientHeight}}return[i,e]};var W=function(){var i=0;var e=0;if(typeof(aN.pageYOffset)=="number"){e=aN.pageYOffset;i=aN.pageXOffset}else{if(aN.document.body&&(aN.document.body.scrollLeft||aN.document.body.scrollTop)){e=aN.document.body.scrollTop;i=aN.document.body.scrollLeft}else{if(aN.document.documentElement&&(aN.document.documentElement.scrollLeft||aN.document.documentElement.scrollTop)){e=aN.document.documentElement.scrollTop;i=aN.document.documentElement.scrollLeft}}}return[i,e]};var S=false;var A=function(){bi=true;++M;if(an){k=true;if(y){var bD=0;var bB=0;var bx=window;for(var bG=0;bG<16;++bG){try{var bs=E(bx);if(bs){var bo=bh(bs);bD+=bo[0];bB+=bo[1]}}catch(bI){}if(bx==window.top){break}bx=bx.parent}var bk=W();var bz=bk[1];var bK=bk[0];var bA=U();var n=bz+bA[1];var bH=bK+bA[0];var bl=Math.max(aN.document.documentElement.clientHeight,aN.document.body.scrollHeight,aN.document.documentElement.scrollHeight,aN.document.body.offsetHeight,aN.document.documentElement.offsetHeight);var bn=Math.max(aN.document.documentElement.clientWidth,aN.document.body.scrollWidth,aN.document.documentElement.scrollWidth,aN.document.body.offsetWidth,aN.document.documentElement.offsetWidth);aa[0]+=bl;aa[1]+=bn;var bu=bl*0.2;var j=0;for(var bG=2;bG<7;++bG){var bv=j+bu;var bt=bv-j;if(bt<0){j=bv;continue}if(j<bz){j=bz}if(bv>n){bv=n}var bM=bv-j;j=bv;if(bM<=0){continue}aa[bG]+=Math.floor((bM/bt)*1000)/1000}++a7;var bo=bh(a4);var bL=bo[1]+bB;var bF=bo[0]+bD;var bp=bL+a4.offsetHeight;var by=bF+a4.offsetWidth;var bw=(bL<bz)?bz:bL;var bm=(bF<bK)?bK:bF;var bE=(bp>n)?n:bp;var bC=(by>bH)?bH:by;var br=(bp-bL)*(by-bF);if(br<0){br=0}var bJ=(bE-bw)*(bC-bm);if(bJ<0){bJ=0}r=bF;p=bL;var bq=0;if(N){bq=1}else{if(br>0){bq=Math.floor((bJ/br)*1000)/1000}if(!S){if((bL+((bp-bL)/2)<=bA[1])&&(bF+((by-bF)/2)<=bA[0])){a=true}S=true}}if(bq>=aJ){Q+=bq;++ac}if(Q>=10){d=true}}}};var h=function(bq,w,bp){var j="";var bl="";var i="";j+="cb="+Math.floor(Math.random()*90000000);if(bq){for(var bo in bq){j+="&"+bo+"="+encodeURIComponent(bq[bo])}}if(w){for(var bm in w){if(bm!="__aaam"){bl+="&"+bm+"="+encodeURIComponent(w[bm])}}if(w.__aaam){i+="&__aaam="+encodeURIComponent(w.__aaam)}}var bk=document.createElement("script");bk.setAttribute("type","text/javascript");var e=(aE+"//adrta.com/i?");e+=j;e+="&"+a0;if(q.length>0){e+="&"+q.join("")}e+=bl;e+=i;e=e.substring(0,aX);bk.setAttribute("src",e);if(bk.readyState){bk.onreadystatechange=function(){if(bk.readyState=="loaded"||bk.readyState=="complete"){bk.onreadystatechange=null;bk.parentNode.removeChild(bk);if(bp){bp()}}}}else{bk.onload=function(){bk.onload=null;bk.parentNode.removeChild(bk);if(bp){bp()}}}document.getElementsByTagName("head")[0].appendChild(bk);if(H){var bn=document.createElement("script");bn.setAttribute("type","text/javascript");var n=(aE+"//testbed.pixalate.net/i?");n+=j;n+="&"+a0;if(q.length>0){n+="&"+q.join("")}n+=bl;n+=i;n=n.substring(0,aX);bn.setAttribute("src",n);if(bn.readyState){bn.onreadystatechange=function(){if(bn.readyState=="loaded"||bn.readyState=="complete"){bn.onreadystatechange=null;bn.parentNode.removeChild(bn);if(bp){bp()}}}}else{bn.onload=function(){bn.onload=null;bn.parentNode.removeChild(bn);if(bp){bp()}}}document.getElementsByTagName("head")[0].appendChild(bn)}};var af=function(bm){var bl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var j="";var bu,br,bp,bt,bq,bo,bn;var w=0;bm=bm.replace(/\r\n/g,"\n");var bs="";for(var e=0;e<bm.length;e++){var bk=bm.charCodeAt(e);if(bk<128){bs+=String.fromCharCode(bk)}else{if((bk>127)&&(bk<2048)){bs+=String.fromCharCode((bk>>6)|192);bs+=String.fromCharCode((bk&63)|128)}else{bs+=String.fromCharCode((bk>>12)|224);bs+=String.fromCharCode(((bk>>6)&63)|128);bs+=String.fromCharCode((bk&63)|128)}}}bm=bs;while(w<bm.length){bu=bm.charCodeAt(w++);br=bm.charCodeAt(w++);bp=bm.charCodeAt(w++);bt=bu>>2;bq=((bu&3)<<4)|(br>>4);bo=((br&15)<<2)|(bp>>6);bn=bp&63;if(isNaN(br)){bo=bn=64}else{if(isNaN(bp)){bn=64}}j=j+bl.charAt(bt)+bl.charAt(bq)+bl.charAt(bo)+bl.charAt(bn)}return j};var t=0;var bb=false;var T=function(w){t++;var i={};var e={};i.__aasv=Z;i.__aaii=ar;i.__aait=aR;if(__adrta__aasi.length>0){i.__aasi=__adrta__aasi;i.__aast=__adrta__aast}if(__adrta__aavi.length>0){i.__aavi=__adrta__aavi;i.__aavt=__adrta__aavt}i.__aavz=aW;i.__aaib=(((m>0)&&y)?1:0);i.__aaai=((m>0)?1:0);i.__aaaa=(a?1:0);i.__aafl=(y)?aN.innerHeight||aN.document.documentElement.clientHeight:0;i.__aaaf=(bj?1:0);i.__aaag=be;i.__aaax=Math.floor(r);i.__aaay=Math.floor(p);if((v!=0)||(aH!=0)){i.__aasz=v+"x"+aH}i.__aapf=(k?1:0);if(ap!=0){i.__aaec=ap}if(!bi){i.__aaae=0;i.__aaat=0;i.__aaav=0;i.__aaas=0;i.__aaah=0;i.__aaph=0;i.__aapw=0;i.__aapc=0;i.__aap1=0;i.__aap2=0;i.__aap3=0;i.__aap4=0;i.__aap5=0}else{i.__aaup=t;k=false;if(ac==0){i.__aaat=0;i.__aaae=0}else{i.__aaat=ac*aP;i.__aaae=Math.round((Q/ac)*1000)/1000;if(i.__aaat<=0||i.__aaae<=0){i.__aaat=0;i.__aaae=0}}i.__aaav=(d?1:0);Q=0;ac=0;i.__aaas=av();i.__aaah=F();if(i.__aaas<0){i.__aaas=0}if(i.__aaah<0){i.__aaah=0}if(i.__aaat>i.__aaas){i.__aaat=i.__aaas}if(i.__aaah>i.__aaas){i.__aaah=i.__aaas}if(M>0){i.__aapc=M*aP;M=0}if(a7>0){i.__aaph=Math.ceil(aa[0]/a7);i.__aapw=Math.ceil(aa[1]/a7);i.__aap1=Math.round((aa[2]/a7)*1000)/1000;i.__aap2=Math.round((aa[3]/a7)*1000)/1000;i.__aap3=Math.round((aa[4]/a7)*1000)/1000;i.__aap4=Math.round((aa[5]/a7)*1000)/1000;i.__aap5=Math.round((aa[6]/a7)*1000)/1000;for(var j=0;j<7;++j){aa[j]=0}a7=0}else{i.__aaph=0;i.__aapw=0;i.__aapc=0;i.__aap1=0;i.__aap2=0;i.__aap3=0;i.__aap4=0;i.__aap5=0}}if(aB){i.__aaab=1}if(screen&&screen.width&&screen.height){i.__aass=screen.width+"x"+screen.height}if(ax){i.__aaim=1}if(o){i.__aawm=1}if(aq){i.__aanf=1}if(ab){i.__aacb=ab}if(aZ!=""&&aZ!="<%=ip%>"){i.__aaxf=aZ}e.__aapu=aO;e.__aapr=al;if(L&&L.indexOf("applewebdata://")==-1){e.__aatu=L}if(__adrta__aadb){i.__aadb=1;if(!bb){e.__aaam=af(I.parentNode.innerHTML);bb=true}}h(i,e,w)};var J=u[bd++];var c=new Date().getTime()+J;var ao=false;function au(){}au.tag=function(i){var e=/\$\{PXL8_CLICK}/g;return i.replace(e,au.getClickURL())};au.getClickURL=function(){var e=a9.join("&");if(q.length>0){e+="&"+q.join("")}return"http://adrta.com/c?clid="+X+"&"+e+"&__aaii="+ar+"&redirect="};var ay=0;var aC=0;var aD=0;var b=0;var l=false;var a6;var aY=0;var P=[];var a3=function(j){var n;if(!a6){a6=new Date().getTime();n=0}var w=(new Date().getTime()-a6)/1000;a6=new Date().getTime();n=Math.ceil((1/w));if(aY>=60){var e=P.reduce(function(bl,bk){return bl+bk});var i=Math.ceil(e/P.length);if(i>30&&l){l=false;o=true;d=true;return}else{l=true;ax=true}aY=0}else{if(n!==Infinity){P.push(n)}aY++}window.requestAnimationFrame(a3)};var aG=false;var ag=function(){if(!aG){window.requestAnimationFrame(a3);aG=true}};var B=function(){ay+=1;aC=performance.now();if(aC-aD>=1000){b=Math.round(ay*1000/(aC-aD));aD=aC;ay=0}if(aT&&!y&&b<8&&bj){l=true;ax=true}if(aT&&l&&b>=10){o=true;d=true}try{var i=new Date().getTime();if(!bj){aU()}if(bj&&(__adrta__aasi.length>0)&&(__adrta__aast>0)&&(__adrta__aavi.length>0)&&(__adrta__aavt>0)){A();if(y){o=true;ax=true}if(!ao&&d){T();ao=true;c=i+J}else{if((k||(Q>0))&&(c<=i)){T();if((m>0)&&!((m>0)&&y)){J=u[bd++]}else{J=u[bd++]}c=i+J}}}}catch(j){}if(J){window.setTimeout(B,aP)}};var bf,O;if(typeof document.hidden!=="undefined"){bf="hidden";O="visibilitychange"}else{if(typeof document.mozHidden!=="undefined"){bf="mozHidden";O="mozvisibilitychange"}else{if(typeof document.msHidden!=="undefined"){bf="msHidden";O="msvisibilitychange"}else{if(typeof document.webkitHidden!=="undefined"){bf="webkitHidden";O="webkitvisibilitychange"}}}}var C=function(i){an=!document[bf];document.removeEventListener("webkitvisibilitychange",C);if(window.__adrta__aasm==1){window.setTimeout(T,1000);window.setTimeout(B,100+aP)}else{window.__adrta__aasm=1;T();window.setTimeout(B,aP)}};if((typeof document.webkitVisibilityState=="undefined")||(typeof document.webkitVisibilityState!="undefined"&&document.webkitVisibilityState!="prerender")){if(window.__adrta__aasm==1){window.setTimeout(T,1000);window.setTimeout(B,100+aP)}else{window.__adrta__aasm=1;T();window.setTimeout(B,aP)}}else{if(typeof document.webkitVisibilityState!="undefined"&&document.webkitVisibilityState=="prerender"){document.addEventListener("webkitvisibilitychange",C,false)}}return au})();