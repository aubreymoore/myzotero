(function($){TWP.Util=TWP.Util||{};TWP.Util.User=function(){var initialized=false;var isAuthenticated=false;var userName=null;var userId="";var userEmail="";var userCookie=null;var isFacebookUser=false;var userType="washington-post";var validCookies=["wapo_display"];var authCookies=["wapo_login_id"];var emailCookie=["at"];function parseCookieUserName(cookie,startStr){if(cookie===null||cookie.length===0)return"";var start=-1,end=-1;start=cookie.indexOf(startStr)+startStr.length+1;end=userCookie.indexOf(";",
start)==-1?userCookie.length:userCookie.indexOf(";",start);var userData=cookie.substring(start,end).split("|");var parsedName="";if(userData[3])parsedName=userData[3].replace(/\+/g," ");else if(userData[2]&&userData[2].indexOf("rw%3D")==-1)parsedName=userData[2].replace(/\+/g," ");else parsedName=userData[0];return parsedName}function parseCookieEmail(){var i,x,y,ARRcookies=document.cookie.split(";");for(i=0;i<ARRcookies.length;i++){var x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("\x3d"));var y=
ARRcookies[i].substr(ARRcookies[i].indexOf("\x3d")+1);var x=x.replace(/^\s+|\s+$/g,"");if(x=="at"){var string=unescape(y);var email=string.split("\x3d")[3];var isValidEmail=false;if(email){email=email.split("\x26")[0];if(email)var isValidEmail=validateEmail(email);else return isValidEmail}else return isValidEmail;return email.length>0&&typeof email=="string"&&isValidEmail?email:false}}}function validateEmail(str){var atpos=str.indexOf("@");var dotpos=str.lastIndexOf(".");if(atpos<1||dotpos<atpos+
2||dotpos+2>=str.length)return false;else return true}function setCustomCookie(){var upcUrl=document.location.href;if(upcUrl.indexOf("localhost")>-1){var c=$.cookie("TWPNIUCID");if(typeof c=="undefined"||c==null){var d=new Date;var i="TWPNI"+d.getTime()+"."+Math.round(Math.random()*1E4);d.setTime(d.getTime()+31104E6);$.cookie("TWPNIUCID",i,{domain:TWP.Data.cookie_domain,expires:d,path:"/"})}}if(upcUrl.indexOf("beta")>-1){var c=$.cookie("x-split-override");if(c==null||typeof c=="undefined"){var d=
new Date;d.setTime(d.getTime()+1E3*60*60*24*30);$.cookie("x-split-override","B",{domain:TWP.Data.cookie_domain,expires:d,path:"/"});$.cookie("X-WP-Split","B",{domain:TWP.Data.cookie_domain,expires:d,path:"/"})}}}function convertPersistentToSessionCookie(){var xsplitoverride=$.cookie("x-split-override");if(typeof xsplitoverride!="undefined"&&xsplitoverride!=null){$.cookie("x-split-override",null,{domain:TWP.Data.cookie_domain,path:"/"});$.cookie("x-split-override",xsplitoverride,{domain:TWP.Data.cookie_domain,
path:"/"})}var xwpslit=$.cookie("X-WP-Split");if(typeof xwpslit!="undefined"&&xwpslit!=null){$.cookie("X-WP-Split",null,{domain:TWP.Data.cookie_domain,path:"/"});$.cookie("X-WP-Split",xwpslit,{domain:TWP.Data.cookie_domain,path:"/"})}}return{init:function(){var userCookieName="";for(var a=0;a<authCookies.length;a++)if(document.cookie.indexOf(authCookies[a])!=-1){isAuthenticated=true;break}for(var a=0;a<validCookies.length;a++)if(document.cookie.indexOf(validCookies[a])!=-1){userCookie=document.cookie;
userType=validCookies[a];break}if(isAuthenticated){switch(userType){case "fbuname":userCookieName=parseCookieUserName(userCookie,userType,8);break;default:userCookieName=parseCookieUserName(userCookie,userType,9);break}userCookieName=decodeURIComponent(userCookieName);userName=userCookieName.indexOf("@")!==-1?userCookieName.substring(0,userCookieName.indexOf("@")):userCookieName;userName=userName.replace(/"/gi,"");userId=userCookieName;userEmail=parseCookieEmail()}setCustomCookie()},getUserCookie:function(){return userCookie.length>
0&&typeof userCookie=="string"?userCookie:null},getUserType:function(){return userType.length>0&&typeof userType=="string"?userType:null},getUserId:function(){return userId},getUserName:function(){return typeof userName=="string"?userName:""},getUserEmail:function(){return userEmail.length<0||userEmail==false?null:userEmail},getAuthentication:function(){return isAuthenticated}}}();TWP.Util.User.init()})(window.Zepto||window.jQuery);
(function($){console.log("TWP.Identity");__e=window.__e||[];window.TWP=window.TWP||{};TWP.Identity=TWP.Identity||{};TWP.Identity.paywall=TWP.Identity.paywall||{};TWP.Identity.paywall.requireTracking=true;TWP.server=TWP.server||window.location.href.match(/^.*?:\/\/.*?\//)[0];var currDomain=TWP.Data&&TWP.Data.environment=="prod"||TWP.Data.environment=="stage"?".washingtonpost.com":".digitalink.com";var currDocDomain=TWP.Data&&TWP.Data.environment=="prod"||TWP.Data.environment=="stage"?"washingtonpost.com":
"digitalink.com";var userCookie="wapo_login_id";var wpatcCookie="WPATC";var actmgmtCookie="wapo_actmgmt";var gmeCookie="wapo_gme";var isPWA=!!TWP.PWA;var isMobile=isPWA||typeof mobile_browser!="undefined"&&mobile_browser===1?true:false;var tidValues={main:"sub_s004",home:"s_001",digital:"s_002",gift:"s_003"};var _qaEnvironment=window.location.host.indexOf("digitalink.com")!=-1;var expireTime,user,wpatc,wapo_gme;var setPerPageVars=function(){var d=new Date;expireTime=d.setHours(d.getHours()+24);user=
$.cookie(userCookie);wpatc=$.cookie(wpatcCookie);wapo_gme=$.cookie(gmeCookie);TWP.Identity.env={expireTime:expireTime,currDomain:currDomain,_qaEnvironment:_qaEnvironment,actmgmtCookie:actmgmtCookie}};window.setCookie=function(name,value,options){options=options||{};if(value===null){value="";options=$.extend({},options);options.expires=-1}var expires="";if(options.expires&&(typeof options.expires=="number"||options.expires.toUTCString)){var date;if(typeof options.expires=="number"){date=new Date;date.setTime(date.getTime()+
options.expires*24*60*60*1E3)}else date=options.expires;expires="; expires\x3d"+date.toUTCString()}var path=options.path?"; path\x3d"+options.path:"";var domain=options.domain?"; domain\x3d"+options.domain:"";var secure=options.secure?"; secure":"";document.cookie=[name,"\x3d",value,expires,path,domain,secure].join("")};var overlays=new Array;overlays[0]={};overlays[3]={overlay:'\x3cdiv id\x3d"wp_Signin" class\x3d"simple-overlay'+(isPWA?" is-pwa":"")+'" style\x3d"overflow: hidden;"\x3e\x3cdiv class\x3d""\x3e\x3c/div\x3e\x3ciframe src class\x3d"'+
(isPWA?"is-pwa":"")+'" height\x3d"100%" width\x3d"100%" scrolling\x3d"'+(isPWA?"yes":"auto")+'" frameborder\x3d"0"\x3e\x3c/iframe\x3e\x3c/div\x3e',overflowCss:"hidden",overlayConfig:{overlay:97,overlayClass:"wp_signin"+(isPWA?" is-pwa":""),modal:true,closeClassxxx:"close",toTop:true,triggerxxx:".close",onShow:function(h){$(window).scrollTop(0);h.w.prependTo(h.o);if($(".pb-f-page-header-v2 .site-header.bar-hidden").length>0)$(".pb-f-page-header-v2 .site-header").removeClass("bar-hidden");var zIndexOverlay=
parseFloat($(".pb-f-page-breaking-news-bar .breaking-news-bar").css("z-index"))+1;h.o.css("z-index",zIndexOverlay);h.w.css("z-index",zIndexOverlay+1);h.o.prependTo("body");if(typeof h.w.fadeIn=="function")h.w.fadeIn();else h.w.show();setTimeout(function(){$("#wp_Signin").css("display","block")},100)},onHide:function(){if($(arguments[0].target).is(".close"))window.location.href="/";$("body").css("overflow-y","");$(document).unbind("touchmove mousewheel mousemove scroll",_scrollHandler);if(!!window.s&&
typeof s.sendDataToOmniture=="function"){var closeVars={eVar1:s.pageName,eVar2:s.channel,eVar5:s.prop3};try{s.sendDataToOmniture("close overlay","event63",closeVars)}catch(e){}}}}};overlays[5]={overlay:'\x3cdiv id\x3d"wp_Alert" style\x3d"text-align:center;opacity: 0.0;position:relative;top:-85px;box-shadow:none;border:none;left:0px;right:0px; background: white;background: -webkit-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));background: -o-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));background: -moz-linear-gradient(rgba(255,255,255,0),rgba(255,255,255,1));background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1));margin:0px;" class\x3d"simple-overlay'+
(isPWA?" is-pwa":"")+'" style\x3d"overflow: hidden;"\x3e\x3ciframe src class\x3d"'+(isPWA?"is-pwa":"")+'" height\x3d"675px" width\x3d"100%" scrolling\x3d"auto" frameborder\x3d"0"\x3e\x3c/iframe\x3e\x3c/div\x3e',overlayConfig:{overlay:100,overlayClass:"wp_teaser"+(isPWA?" is-pwa":""),modal:false,toTop:true,onShow:function(h){h.w.prependTo(h.o);h.o.appendTo("article");if(typeof h.w.fadeIn=="function")h.w.fadeIn();else h.w.show();h.w.css("z-index",0);setTimeout(function(){h.w.animate({opacity:1},2E3)},
300)},onHide:function(){}}};overlays[8]={overlay:'\x3cdiv id\x3d"wp_Signin" class\x3d"simple-overlay paywall-postsuite-overlay'+(isPWA?" is-pwa":"")+'" style\x3d"overflow: hidden;overflow-y: scroll;"\x3e\x3cdiv class\x3d""\x3e\x3c/div\x3e\x3ciframe class\x3d"'+(isPWA?"is-pwa":"")+'" height\x3d"100%" width\x3d"100%" scrolling\x3d"'+(isPWA?"yes":"auto")+'" frameborder\x3d"0"\x3e\x3c/iframe\x3e\x3c/div\x3e',overflowCss:"hidden",overlayConfig:{overlay:97,overlayClass:"wp_signin paywall_postsuite"+(isPWA?
" is-pwa":""),modal:true,closeClassxxx:"close",toTop:true,triggerxxx:".close",onShow:function(h){$(window).scrollTop(0);h.w.prependTo(h.o);if($(".pb-f-page-header-v2 .site-header.bar-hidden").length>0)$(".pb-f-page-header-v2 .site-header").removeClass("bar-hidden");if($(".pb-f-page-header-v2 #main-navigation-left").length>0)$(".pb-f-page-header-v2 #main-navigation-left").css("visibility","hidden");var zIndexOverlay=parseFloat($(".pb-f-page-breaking-news-bar .breaking-news-bar").css("z-index"))+1;
h.o.css("z-index",zIndexOverlay);h.w.css("z-index",zIndexOverlay+1);h.o.prependTo("body");if(typeof h.w.fadeIn=="function")h.w.fadeIn();else h.w.show();setTimeout(function(){$("#wp_Signin").css("display","block")},100)},onHide:function(){if($(arguments[0].target).is(".close"))window.location.href="/";if($(".pb-f-page-header-v2 #main-navigation-left").length>0)$(".pb-f-page-header-v2 #main-navigation-left").css("visibility","visible");$("body").css("overflow-y","");$(document).unbind("touchmove mousewheel mousemove scroll",
_scrollHandler);if(!!window.s&&typeof s.sendDataToOmniture=="function"){var closeVars={eVar1:s.pageName,eVar2:s.channel,eVar5:s.prop3};try{s.sendDataToOmniture("close overlay","event63",closeVars)}catch(e){}}}}};TWP.Identity.omniture={sub:{"-1":"N/A",0:"Unsubscribed",1:"Subscribed"},mtr:{"-1":"Unmetered",1:"Metered",20:"Unmetered: content_type",21:"Unmetered: referer",22:"Unmetered: domain"},tracking:{wp_evar60:"not available",wp_evar64:"not available",wp_evar65:"not available",wp_evar66:"not available"}};
TWP.isSignedIn=function(){var cookies=document.cookie;var idx=cookies.indexOf("wapo_login_id");if(idx>-1)return true;else return false};TWP.Identity.setAuthenticationLinkForPWA=function(){$.fn.appendLinkItems=function(links,surroundingTag){var element=this;surroundingTag=surroundingTag||"\x3cli\x3e";$.each(links,function(i,link){var a=$("\x3ca\x3e");if(link.title)a.text(link.title);if(link.html)a.html(link.html);if(link.href)a.attr("href",link.href);if(link.attr)a.attr(link.attr);element.append($(surroundingTag).append(a).addClass(link.selected?
"selected":""))});return this};var idenity={},idp;idenity.getIdentityProvider=function(){return idp};idenity.setIdentityMenu=function($el,menu){$el.children("li").remove();$el.appendLinkItems(menu)};idenity.setIdentityProvider=function(provider){var ef=function(){};idp={};idp.name=provider.name||"";idp.getUserId=provider.getUserId||ef;idp.getProfileMenu=provider.getProfileMenu||ef;idp.getSubscribeMenu=provider.getSubscribeMenu||ef;idp.getLogOutMenu=provider.getLogOutMenu||ef;idp.getSignInMenu=provider.getSignInMenu||
ef;idp.getSignInLink=provider.getSignInLink||ef;idp.getRegistrationLink=provider.getRegistrationLink||ef;idp.isUserLoggedIn=provider.isUserLoggedIn||ef;idp.userMenu=[];idp.render=provider.render||function(){var $identityEl=$("#logged-in-status");if(idp.isUserLoggedIn()){idp.userMenu.push(idp.getProfileMenu());if(!wp_pb.StaticMethods.isSubscriber())idp.userMenu.push(idp.getSubscribeMenu());idp.userMenu.push(idp.getLogOutMenu())}else{idp.userMenu.push(idp.getSignInMenu());idp.userMenu.push(idp.getSubscribeMenu())}idenity.setIdentityMenu($identityEl,
idp.userMenu)}};idenity.renderIdentity=function(callback){callback=callback||function(){};if(idp)idp.render();callback(idp)};var showIdentity=true;var current=window.location.href.split("?")[0];var twpIdentity={name:"TWP",getUserId:function(){var username=TWP.Util.User.getUserName();var userid=TWP.Util.User.getUserId();if(typeof username=="string"&&username.length>0)return username;else return userid},getProfileMenu:function(){return{title:"Profile",href:TWP.signin.profileurl+current+"\x26refresh\x3dtrue"}},
getSubscribeMenu:function(){return{title:"Subscribe",href:TWP.signin.subscribe}},getLogOutMenu:function(){return{title:"Log out",href:TWP.signin.logouturl_page}},getSignInMenu:function(){return{title:"Sign In",href:TWP.signin.loginurl_page+current}},getSignInLink:function(){return TWP.signin.loginurl_page+current},getRegistrationLink:function(){return TWP.signin.registrationurl_page+current},isUserLoggedIn:function(){return TWP.Util.User?TWP.Util.User.getAuthentication():false}};if(showIdentity)(function checkTWP(){if(!idenity.getIdentityProvider())if(!!window.TWP&&
!!TWP.signin&&!!TWP.Util){idenity.setIdentityProvider(twpIdentity);idenity.renderIdentity()}else window.setTimeout(function(){checkTWP()},200)})()};TWP.Identity.setAuthenticationLink=function(data){if(typeof data=="object")$.extend(TWP.Identity.paywall.pwresp,data.pwresp);if(TWP.server.match(/digitalink\.com|washingtonpost\.com|wpprivate\.com/gi)==null)return;var wrapperElm=$("#utility-wrapper");if(isPWA){TWP.Identity.setAuthenticationLinkForPWA();return}else if(wrapperElm.length<=0)return;var userName=
"";var provider="";var currentURL=window.location.href.split("?")[0];TWP.Identity.isSignedIn=TWP.Util.User.getAuthentication();if(TWP.Identity.isSignedIn){userName=TWP.Util.User.getUserName();provider=typeof TWP.signedInProvider=="function"?TWP.signedInProvider():"Washington Post";provider=typeof provider!="undefined"?provider.toLowerCase():""}var freeAccessLink=TWP.Identity.paywall.pwresp.fr===1?'\x3cli class\x3d"no-right"\x3e'+'\x3ca href\x3d"'+TWP.signin.free_access+'"\x3eGET FREE ACCESS\x3c/a\x3e'+
"\x3c/li\x3e":"";var signinLinks={pw:{anon:'\x3cli id\x3d"global-signin"style\x3d"min-width:32px;"\x3e'+'\x3ca href\x3d"'+TWP.signin.loginurl_page+currentURL+'"\x3eSign In\x3c/a\x3e'+"\x3c/li\x3e"+'\x3cli class\x3d"no-right"\x3e\x3ca href\x3d"'+TWP.signin.profileurl+currentURL+'\x26refresh\x3dtrue"\x3eMy Account \x3c/a\x3e\x3c/li\x3e'+freeAccessLink+'\x3cul class\x3d"subscribe-links left"\x3e'+'\x3cli class\x3d"no-right subscribe"\x3e\x3ca href\x3d"'+TWP.signin.subscribe+"?tid\x3d"+tidValues.main+
'\x26promo\x3ddigital04_header_default\x26oscode\x3dRPWH\x26wpsrc\x3dCM0000447\x26show4\x3dtrue"\x3eSUBSCRIBE: \x3c/a\x3e\x3c/li\x3e'+'\x3cli \x3e\x3ca href\x3d"'+TWP.signin.print_offer+"tid\x3d"+tidValues.home+'\x26promo\x3ddigital06_header_homedelivery\x26oscode\x3dRPWH\x26wpsrc\x3dCM0000450"\x3eHome Delivery\x3c/a\x3e\x3c/li\x3e'+'\x3cli class\x3d"no-right"\x3e\x3ca href\x3d"'+TWP.signin.digital_offer+"tid\x3d"+tidValues.digital+'\x26promo\x3ddigital04_header_default\x26oscode\x3dRPWH\x26wpsrc\x3dCM0000447"\x3eDigital\x3c/a\x3e\x3c/li\x3e'+
"\x3c/ul\x3e",0:"\x3cli\x3e"+(provider.indexOf("facebook")>=0?'\x3ca class\x3d"icon share facebook" ':"\x3ca ")+' href\x3d"'+TWP.signin.profileurl+currentURL+'\x26refresh\x3dtrue"\x3e Hi, '+userName+"!\x3c/a\x3e"+"\x3c/li\x3e"+'\x3cli\x3e\x3ca href\x3d"'+TWP.signin.profileurl+currentURL+'\x26refresh\x3dtrue"\x3eMy Account \x3c/a\x3e\x3c/li\x3e'+'\x3cli class\x3d"no-right"\x3e\x3ca href\x3d"'+TWP.signin.logouturl_page+'"\x3eSign Out\x3c/a\x3e\x3c/li\x3e'+freeAccessLink+'\x3cul class\x3d"subscribe-links left"\x3e'+
'\x3cli class\x3d"no-right subscribe"\x3e\x3ca href\x3d"'+TWP.signin.subscribe+"?tid\x3d"+tidValues.main+'\x26promo\x3ddigital04_header_default\x26oscode\x3dRPWH\x26wpsrc\x3dCM0000447\x26show4\x3dtrue"\x3eSUBSCRIBE: \x3c/a\x3e\x3c/li\x3e'+'\x3cli \x3e\x3ca href\x3d"'+TWP.signin.print_offer+"tid\x3d"+tidValues.home+'\x26promo\x3ddigital06_header_homedelivery\x26oscode\x3dRPWH\x26wpsrc\x3dCM0000450"\x3eHome Delivery\x3c/a\x3e\x3c/li\x3e'+'\x3cli class\x3d"no-right"\x3e\x3ca href\x3d"'+TWP.signin.digital_offer+
"tid\x3d"+tidValues.digital+'\x26promo\x3ddigital04_header_default\x26oscode\x3dRPWH\x26wpsrc\x3dCM0000447"\x3eDigital\x3c/a\x3e\x3c/li\x3e'+"\x3c/ul\x3e",1:"\x3cli\x3e"+(provider.indexOf("facebook")>=0?'\x3ca class\x3d"icon share facebook" ':"\x3ca ")+' href\x3d"'+TWP.signin.profileurl+currentURL+'\x26refresh\x3dtrue"\x3eHi, '+userName+"!\x3c/a\x3e"+"\x3c/li\x3e"+'\x3cli\x3e\x3ca href\x3d"'+TWP.signin.profileurl+currentURL+'\x26refresh\x3dtrue"\x3eMy Account \x3c/a\x3e\x3c/li\x3e'+'\x3cli class\x3d"no-right"\x3e\x3ca href\x3d"'+
TWP.signin.logouturl_page+'"\x3eSign Out\x3c/a\x3e\x3c/li\x3e'+'\x3cul class\x3d"subscribe-links left"\x3e'+"\x3c/ul\x3e"},np:{anon:'\x3cli id\x3d"global-signin" style\x3d"min-width:32px;"\x3e'+'\x3ca href\x3d"'+TWP.signin.loginurl_page+currentURL+'"\x3eSign In\x3c/a\x3e'+"\x3c/li\x3e"+'\x3cli\x3e\x3ca href\x3d"'+TWP.signin.profileurl+currentURL+'\x26refresh\x3dtrue"\x3eMy Account \x3c/a\x3e\x3c/li\x3e'+'\x3cli id\x3d"global-registration" class\x3d"no-right" style\x3d"margin-right:25px;"\x3e'+'\x3ca href\x3d"'+
TWP.signin.registrationurl_page+currentURL+'"\x3eRegister\x3c/a\x3e'+"\x3c/li\x3e",signedin:'\x3cli id\x3d"global-signin" style\x3d"min-width:32px;"\x3e'+(provider.indexOf("facebook")>=0?'\x3ca class\x3d"icon share facebook" ':"\x3cspan\x3eHello \x3c/span\x3e\x3ca ")+' href\x3d"'+TWP.signin.profileurl+currentURL+'\x26refresh\x3dtrue"\x3e'+userName+"\x3c/a\x3e"+"\x3c/li\x3e"+'\x3cli\x3e\x3ca href\x3d"'+TWP.signin.profileurl+currentURL+'\x26refresh\x3dtrue"\x3eMy Account \x3c/a\x3e\x3c/li\x3e'+'\x3cli  id\x3d"global-registration" class\x3d"no-right" style\x3d"margin-right:25px;"\x3e\x3ca href\x3d"'+
TWP.signin.logouturl_page+'"\x3eSign Out\x3c/a\x3e\x3c/li\x3e'}};var linkString="";if(TWP.Identity.paywall.pwresp.sub<0)if(TWP.Identity.isSignedIn)linkString=signinLinks.np.signedin;else linkString=signinLinks.np.anon;else if(TWP.Identity.isSignedIn)linkString=signinLinks.pw[TWP.Identity.paywall.pwresp.sub];else linkString=signinLinks.pw.anon;wrapperElm.find("ul#utility-links.inline-list.left").remove();wrapperElm.prepend('\x3cul id\x3d"utility-links" class\x3d"inline-list left"\x3e'+linkString+"\x3c/ul\x3e")};
TWP.Identity.setHandlers=function(){try{$(window.document).on("onTwpLoginComplete",function(event,data){typeof TWP_Debug!="undefined"&&TWP_Debug.pagedebug&&window.console&&console.log&&console.log(event.type+"fired!");event.stopPropagation();TWP.Util.User.init();TWP.Identity.setAuthenticationLink(data);try{$("body").css("overflow-y","");$("#wp_Signin.simple-overlay").overlay().close()}catch(e){}})}catch(e){}try{$(window.document).on("onTwpMeterReady",function(event){window.pwapiPaywall=TWP.Identity.paywall.pwresp.action;
if(TWP.Identity.paywall.pwresp.action===0&&TWP.Identity.paywall.pwresp.fr===1&&wapo_gme!=="1"){$.cookie(gmeCookie,"1",{domain:currDomain,expires:new Date(expireTime),path:"/"});_openOverlay(event,{pwresp:{action:4,url:TWP.signin.free_access_overlay}})}})}catch(e){}try{$(window.document).on("onTwpWarningFreeAccess",function(event,data){_openOverlay(event,data)})}catch(e){}try{$(window.document).on("onTwpMastheadComplete",function(event){event.stopPropagation();TWP.Identity.setAuthenticationLink()})}catch(e){}try{$(window.document).on("onTwpLoginInit",
function(event,data){_openOverlay(event,data)})}catch(e){}TWP.Identity.handlersSet=true};var copyToWindow=function copyToWindow(object){for(var key in object)window[key]=object[key]};TWP.Identity.auth=function(identityData){var origUrl,origReferrer=document.referrer;if(typeof identityData!="undefined"){origUrl=identityData.url;origReferrer=identityData.referrer}else{origUrl=window.originalWashingtonPostURl&&window.originalWashingtonPostURl.substring(window.originalWashingtonPostURl.indexOf(".com/")+
4)||location.pathname;origUrl=origUrl+location.search}if(isPWA&&!!window.history&&!!history.state&&!!history.state.referrer)origReferrer=history.state.referrer;try{document.domain=currDocDomain;typeof TWP_Debug!="undefined"&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+" STARTING Paywall");window.console&&console.log&&console.log("PAYWALL CHECK STATUS: "+status);window.console&&console.log&&console.log("PWAPI URL: "+TWP.signin.auth_api_url+encodeURI(origUrl+
(origUrl.indexOf("?")>=0?"\x26":"?")+"rplapisplit\x3d1\x26referrer\x3d"+origReferrer));var successCallback=function(data){if(data&&data.pwresp){window.console&&console.log&&console.log("PAYWALL ACTION: "+data.pwresp.action);window.console&&console.log&&console.log("PAYWALL URL: "+data.pwresp.url);window.console&&console.log&&console.log("PAYWALL SUB: "+TWP.Identity.omniture.sub[data.pwresp.sub]);window.console&&console.log&&console.log("PAYWALL METERED: "+TWP.Identity.omniture.mtr[data.pwresp.mtr]);
window.console&&console.log&&console.log("PAYWALL METER COUNT: "+data.pwresp.mtrct);window.console&&console.log&&console.log("PAYWALL MODE: "+data.pwresp.mtfn);$.extend(TWP.Identity.paywall,eval(data));TWP.Identity.setAuthenticationLink();var tmpVal=_getKey(($.cookie(actmgmtCookie)||"").toLowerCase(),"partner");TWP.Identity.omniture.tracking.wp_evar60=tmpVal===null?"none":tmpVal;TWP.Identity.omniture.tracking.wp_evar64=data.pwresp.sub==1?TWP.Identity.omniture.sub[data.pwresp.sub]:data.pwresp.action>
1?"overlay":data.pwresp.mtrcta;tmpVal=_getKey($.cookie(actmgmtCookie)||"","omniture");TWP.Identity.omniture.tracking.wp_evar65=tmpVal===null?"none":tmpVal;TWP.Identity.omniture.tracking.wp_evar66=data.pwresp.mtr;if(data.pwresp.data.mtrct30r||data.pwresp.data.mtrct30r===0)TWP.Identity.omniture.tracking.wp_evar9=JSON.stringify(data.pwresp.data.mtrct30r);if(data.pwresp.data.mtrct45r||data.pwresp.data.mtrct45r===0)TWP.Identity.omniture.tracking.wp_evar10=JSON.stringify(data.pwresp.data.mtrct45r);TWP.Identity.omniture.tracking.wp_evar68=
data.pwresp.data.actions;TWP.Identity.omniture.tracking.wp_evar64=data.pwresp.mtrct;copyToWindow(TWP.Identity.omniture.tracking);_openOverlay(null,data);$(window.document).trigger("onTwpMeterReady")}};var errorCallback=function(errTextStatusStr,errThrownStr){TWP.Identity.omniture.tracking.wp_evar53="paywall_"+errTextStatusStr||"error";copyToWindow(TWP.Identity.omniture.tracking);$(window.document).trigger("onTwpMeterComplete");window.console&&console.log&&console.log("this is the callback errorCallback: errTextStatusStr: "+
errTextStatusStr+", errThrownStr: "+errThrownStr)};var checkPwapi=setInterval(function(){if(typeof wpPwapi==="object"){clearInterval(checkPwapi);wpPwapi.registerSucccessCallback(successCallback);wpPwapi.registerErrorCallback(errorCallback)}},100)}catch(err){$(window.document).trigger("onTwpMeterComplete")}};TWP.Identity.init=function(){setPerPageVars();if(!TWP.Identity.initComplete&&window.top==window.self){if(!TWP.Identity.handlersSet)TWP.Identity.setHandlers();_signInInit();TWP.Identity.auth();
TWP.Identity.initComplete=true}};var _scrollHandler=function(){return false};var _getKey=function(cookieString,cookieKeyValue,valueDelimiter,keyDelimiter){valueDelimiter=typeof valueDelimiter=="undefined"||!valueDelimiter?"|":valueDelimiter;keyDelimiter=typeof keyDelimiter=="undefined"||!keyDelimiter?":":keyDelimiter;var returnValue=null;if(cookieString==null||typeof cookieString=="undefined"||cookieString.indexOf(valueDelimiter)<0)return returnValue;var tmpArry=cookieString.split(valueDelimiter);
$.each(tmpArry||[],function(key,value){if(value.indexOf(cookieKeyValue)>=0)if(value.indexOf(keyDelimiter)>=0)returnValue=value.split(keyDelimiter)[1]});return returnValue};var _signInInit=function(){try{if(!user||user.length==0||user==null);else if(user&&(!wpatc||wpatc.length==0)||user&&wpatc&&!wpatc.match(/:K=\d+/)){var url=TWP.signin.api_url+"?username\x3d"+user;$.ajax({type:"GET",url:url,dataType:"jsonp",timeout:2E3,cache:"false",success:function(){}})}}catch(e){}};var _openOverlayAction=function(event,
data){typeof TWP_Debug!="undefined"&&TWP_Debug.pagedebug&&window.console&&console.log&&console.log(event.type+"fired!");try{event&&event.stopPropagation()}catch(e){}try{var obj=$.extend({},TWP.Identity.paywall.pwresp,data.pwresp);if(isPWA)obj.tref="pwa";var params="";$.each(obj,function(i,v){if(i!="url"&&i!="locstor")params=params+"\x26"+i+"\x3d"+v});if(typeof data.pwresp.data.actions=="object"){var variant=$.cookie("wp_variant")||"0";if(typeof variant=="string")variant=variant.split("|")[0];variant*=
1;var trackingVariant=variant*10;if(data.pwresp.action==8){var psUrl=_qaEnvironment?"https://subscribe.digitalink.com":"https://subscribe.washingtonpost.com";psUrl+="/subscriptionapi/acquisition/paywall_postsuite.html";data.pwresp.url=psUrl}else if(data.pwresp.data.actions.indexOf(variant)==-1&&data.pwresp.data.actions.indexOf(trackingVariant)==-1)return;else{data.pwresp.action=3;var altUrl=_qaEnvironment?"https://subscribe.digitalink.com":"https://subscribe.washingtonpost.com";altUrl+="/subscriptionapi/acquisition/paywall.html";
data.pwresp.url=altUrl}}else if(data.pwresp.action===0)return;var actionsStr=typeof data.pwresp.data.actions=="object"?data.pwresp.data.actions.join(","):"";var url=data.pwresp.url+(data.pwresp.url.indexOf("?")>=0?"\x26":"?")+encodeURI("page\x3d"+(!!window.s&&s.eVar1)+"\x26section\x3d"+(!!window.s&&s.eVar2)+"\x26prev\x3d"+(!!window.s&&s.eVar6)+"\x26geo\x3d"+(!!window.s&&s.eVar7)+"\x26ctype\x3d"+(!!window.s&&s.eVar17)+"\x26signedin\x3d"+(!!window.s&&s.eVar62)+"\x26mcount\x3d"+(data.pwresp.mtrct||TWP.Identity.paywall.pwresp&&
TWP.Identity.paywall.pwresp.mtrct)+"\x26sub\x3d"+(data.pwresp.sub||TWP.Identity.paywall.pwresp&&TWP.Identity.paywall.pwresp.sub)+"\x26ismetered\x3d"+(data.pwresp.mtr||TWP.Identity.paywall.pwresp&&TWP.Identity.paywall.pwresp.mtr)+"\x26actions\x3d"+actionsStr+"\x26pwrsn\x3d"+data.pwresp.pwrsn+"\x26destination\x3d"+window.location.href.split("?")[0]+params);if(data.pwresp.action===5)url=url.replace("paywall.html","paywall_gteaser.html");window.console&&console.log&&console.log("PAYWALL OVERLAY/REDIRECT URL: "+
url);if(data.pwresp.action>=3&&_isOverlayDisplayed(data)===false){window.location.href=url+"\x26acq_test\x3d1";return}if(typeof overlays[data.pwresp.action].overlay!=="undefined"&&data.pwresp.action>0){try{typeof window.TWP_Debug!="undefined"&&TWP_Debug.pagedebug&&window.console&&console.log&&console.log("Regwall: preparing to display overlay");typeof window.TWP_Debug!="undefined"&&TWP_Debug.pagedebug&&window.console&&console.log&&console.log(TWP.Identity.paywall)}catch(e){}var thisAction=data.pwresp.action;
if(isMobile&&thisAction===1)thisAction="mobile";if(thisAction===3){_showLimitedContent();$("article").append('\x3cp\x3e\x3ca href\x3d"https://subscribe.washingtonpost.com?promo\x3do1_rv"\x3eSubscribe to read the full article\x3c/a\x3e\x3c/p\x3e');$("body").css("overflow-y",overlays[thisAction].overflowCss);TWP.Identity._loadModalCss();var $overlay=$(overlays[thisAction].overlay);$overlay.jqm(overlays[thisAction].overlayConfig);$overlay.find("iframe").attr("src",url);$overlay.jqmShow();$(".wp_signin").css("top",
"60px");TWP.Identity.hideMessageArea()}else if(thisAction===8){_showLimitedContent();$("body").css("overflow",overlays[thisAction].overflowCss);TWP.Identity._loadModalCss();var $overlay=$(overlays[thisAction].overlay);$overlay.jqm(overlays[thisAction].overlayConfig);$overlay.find("iframe").attr("src",url);$overlay.jqmShow();$(".wp_signin").css("top","60px");TWP.Identity.hideMessageArea()}else setTimeout(function(){_showLimitedContent();var $overlay=$(overlays[thisAction].overlay);$overlay.jqm(overlays[thisAction].overlayConfig);
$overlay.find("iframe").attr("src",url);$overlay.jqmShow();$(".wp_signin").css("top","60px")},200)}}catch(e){console.log("error opening paywall overlay/teaser",e)}};var _showLimitedContent=function(){if(typeof history.replaceState=="function")if(!_qaEnvironment&&window.location.href.indexOf("localhost")===-1){window.TWP.originalUrl=window.location.href;history.replaceState({},null,"/")}var $paragraphs=$("article \x3e *");try{var _wordCount=0;$paragraphs.each(function(i,obj){if(obj.tagName=="P"){var wordsRemaining=
50-_wordCount;var wordsInSection=obj.innerHTML.split(" ");_wordCount+=wordsInSection.length;if(_wordCount>50){obj.innerHTML=wordsInSection.slice(0,wordsRemaining).join(" ")+"...";$(obj).nextAll().remove();return}}})}catch(ex){$paragraphs.slice(2).remove()}$("#nav-bar").css("transform","none");var $pbfarticlearticlebody=$(".pb-f-article-article-body");$pbfarticlearticlebody.nextAll().remove();$("#right-rail \x3e *").not(".pb-f-ad-flex").remove();window.setTimeout(function(){$pbfarticlearticlebody.nextAll().remove();
$("#right-rail \x3e *").not(".pb-f-ad-flex").remove()},1E3)};var _isOverlayDisplayed=function(){var displayOverlay=true;if(window.wp_pb&&wp_pb.BrowserInfo&&wp_pb.BrowserInfo.browser=="Explorer"&&wp_pb.BrowserInfo.version<=9||$.browser&&$.browser.msie&&$.browser.version<=9)displayOverlay=false;return displayOverlay};var overlayData={};var _openOverlay=function(event,data){if(!data){event=overlayData.event;data=overlayData.data}if(!window._swgChecked)overlayData={event:event,data:data};else if(typeof data===
"object")_openOverlayAction(event,data)};var _loadModalCss=function(){if(!TWP.Identity||!TWP.Identity.uswCss){try{var head=document.head||document.getElementsByTagName("head")[0],link=document.createElement("link"),fileName="/pb/resources/css/identity-management/modal-2.0.css";link.type="text/css";link.rel="stylesheet";link.href=fileName;head.appendChild(link)}catch(err){}TWP.Identity.uswCss=true}};TWP.Identity._loadModalCss=_loadModalCss;TWP.Identity._openOverlay=_openOverlay;if(!window.wp_pb||!wp_pb.StaticMethods||
!wp_pb.StaticMethods.isPageHydrated||wp_pb.StaticMethods.isPageHydrated())TWP.Identity.init();__e.push(["shamble",function(){TWP.Identity.initComplete=false;TWP.Identity.init()}])})(window.Zepto||window.jQuery);