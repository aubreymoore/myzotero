window.__tnt||(window.__tnt={});
(function(q,k,b,g,u){var h=g.ads||(g.ads={}),t=function(a){switch(a){case "slow":return 1E3;case "medium":return 500;case "fast":return 250;case "instant":return 0;default:return 500}},n=function(a){var d=new b.Deferred;switch(a.start_open){case "1":l(a,0);if("0"!==a.auto_limit)setTimeout(function(){l(a)},1E3*a.auto_limit);else b(a.positionDiv).find(".tnt-expandable-small").on("click",function(){l(a)});break;case "2":b(a.positionDiv).on("mouseover mouseout",function(){l(a)});break;case "3":l(a,0);
b(a.positionDiv).find(".tnt-expandable-small").addClass("click-to-close");if("0"!==a.auto_limit)setTimeout(function(){l(a)},1E3*a.auto_limit),b(a.positionDiv).on("mouseover mouseout",function(){l(a)});else if(b(a.positionDiv).find(".tnt-expandable-small").hasClass("click-to-close"))b(a.positionDiv).find(".tnt-expandable-small").on("click hover",function(){l(a)});break;default:b(a.positionDiv).find(".tnt-expandable-small").on("click",function(){l(a)})}d.resolve(a);return d.promise()},r=function(a){var d=
new b.Deferred;a.clickuri&&(b(a.positionDiv).find(".tnt-expandable-big img").wrap('<a href="'+a.clickuri+'"></a>'),0!=a.start_open&&b(a.positionDiv).find(".tnt-expandable-small img").wrap('<a href="'+a.clickuri+'"></a>'));d.resolve(a);return d.promise()},p=function(a){var d=new b.Deferred;b(a.positionDiv).css({position:"relative"});d.resolve(a);return d.promise()},l=function(a,d){var e=new b.Deferred,c=b(a.positionDiv).find(".tnt-expandable-big"),f=0===d?d:t(a.transition_speed);switch(a.overlay_content){case "0":c.addClass("noOverlay");
break;case "1":c.addClass("overlay")}switch(a.transition_direction){case "left":c.css({position:"absolute",top:0,"z-index":99999,right:a.width}).stop().animate({width:"toggle"},f);break;case "right":c.css({position:"absolute",top:0,left:a.width,"z-index":99999}).stop().animate({width:"toggle"},f);break;case "up":c.css({position:"absolute",bottom:a.height,left:0,"z-index":99999}).stop().slideToggle(f);break;default:c.css({left:0,"z-index":99998}).stop().slideToggle(f)}e.resolve(a);return e.promise()};
h.video=function(a){if(a.embed)g.video||(g.video={}),g.video.blox||(g.video.blox={}),g.video.blox.ads||(g.video.blox.ads={postroll:[],preroll:[]}),"post"==a.rolltype?g.video.blox.ads.postroll.push(a):g.video.blox.ads.preroll.push(a);else{var d=function(){var d="video/mp4";null!=a.asseturl.match(/\.flv\?/)&&(d="video/x-flv");b(a.positionDiv).addClass("tnt-video-ad-wrapper").append('<video class="tnt-video-ad vjs-ad video-js vjs-default-skin vjs-big-play-centered video-responsive"><source src="'+a.asseturl+
'" type="'+d+'"/></video>').attr("data-videoclickuri",a.clickuri);videojs(b(a.positionDiv).find("video")[0],{preload:"auto",controls:!0,fluid:!0},function(){player=this;player.on("__tnt.video.standalone.initialize",function(){player.one("play",function(a){g.trackEvent({category:"tnt-video-ad",action:"standalone playing",label:"user watching: "+player.src(),value:"1"});player.on("click",function(a){0.2<player.currentTime()&&(g.trackEvent({category:"tnt-video-ad",action:"standalone clicked",label:"user clicked: "+
player.src(),value:"1"}),q.open(decodeURIComponent(b(a.target).parents(".tnt-video-ad-wrapper").attr("data-videoclickuri"))),player.trigger("ended"))});player.one("ended",function(a){player.off("click");player.currentTime(player.duration());g.trackEvent({category:"tnt-video-ad",action:"standalone ended",label:"user watched: "+player.src(),value:"1"});player.trigger("__tnt.video.standalone.initialize")})})});player.trigger("__tnt.video.standalone.initialize")})};b(function(){var a=b(".video-ad").attr("data-video-js"),
c=b(".video-ad").attr("data-video-swf"),f=b(".video-ad").attr("data-video-js-css"),g=b(".video-ad").attr("data-video-blox-css");"undefined"==typeof videojs?(console.log("loading: "+a),b.getScript(a,function(a,e,h){videojs.options.flash.swf=c;b("body").append('<link rel="stylesheet" href="'+f+'" />').append('<link rel="stylesheet" href="'+g+'" />');d()})):(videojs.options.flash.swf=c,d())})}};h.expandable=function(a){m(a,'<div class="tnt-expandable-small" style="cursor: pointer"><img src="'+a.smallImage+
'"/></div>'+('<div class="tnt-expandable-big" style="display: none;"><img src="'+a.largeImage+'" /></div>')).then(p(a)).then(r(a)).then(n(a)).then()};h.flashcurl=function(a){if("undefined"!==typeof a.clickuri)var d=a.clickuri.replace(/"/g,"&quot;");var b;b=""+('<object type="application/x-shockwave-flash" data="'+a.smallFlash+'">');b=b+'<param name="wmode" value="opaque" />'+('<param name="movie" value="'+a.smallFlash+'" />');b+="</object>";var c;c=""+('<object type="application/x-shockwave-flash" data="'+
a.largeFlash+'">');c=c+'<param name="wmode" value="opaque" />'+('<param name="movie" value="'+a.largeFlash+'" />');c+="</object>";b='<div id="smallflash">'+b+"</div>";c='<div id="largeflash">'+c+"</div>";m(a,a.clickuri?'<div class="hidden-sm hidden-xs" id="flashcurl"><a target="_blank" href='+d+'><div class="cover"></div></a>'+b+c+'<div style="z-index: 997; display: block; background-color: #fff; top: 0px; right: 0px; position: absolute; height: 99%; width: 99%;"></div></div>':'<div class="hidden-sm hidden-xs" id="flashcurl"><div class="cover"></div>'+
b+c+'<div style="z-index: 997; display: block; background-color: #fff; top: 0px; right: 0px; position: absolute; height: 99%; width: 99%;"></div></div>')};h.curl=function(a){if(a.clickuri)var d='<div class="tnt-ads-container hidden-xs hidden-sm"><button id="closeButton" class="hidden-lg hide btn btn-primary btn-sm login-btn user-control-link">Close</button><a href="'+a.clickuri+'"><div id="pageflip"><img src="/content/tncms/live/components/template/resources/images/curl.png"><div class="back-img"></div></a></div></div>',
e='<style>#pageflip img {background: url("'+a.smallImage+'") no-repeat right top #fff;transition: background-image 0.6s ease;;</style>';else d='<div class="tnt-ads-container hidden-xs hidden-sm"><button id="closeButton" class="hidden-lg hide btn btn-primary btn-sm login-btn user-control-link">Close</button><div id="pageflip"><img src="/content/tncms/live/components/template/resources/images/curl.png"><div class="back-img"></div></div></div>',e='<style>#pageflip img {background: url("'+a.smallImage+
'") no-repeat right top #fff;transition: background-image 0.6s ease;;</style>';m(a,d+e).then(p(a)).then(r(a)).then(n(a)).then();b(k).ready(function(){b("#pageflip").mouseover(function(){b("#pageflip img , .back-img").stop().animate({width:"488px",height:"475px"},800).delay(1E3).css("background-image",'url("'+a.largeImage+'")')});b("#pageflip").mouseover(function(){setTimeout(function(){b("#closeButton").removeClass("hide")},1E3)});b("#pageflip").mouseleave(function(){setTimeout(function(){b("#closeButton").addClass("hide");
b("#pageflip img").stop().animate({width:"75px",height:"75px"},300);b(".back-img").stop().animate({width:"50px",height:"50px"},300);b("#pageflip img , .back-img").css("background-image",'url("'+a.smallImage+'")')},2E3);clearTimeout()});b("#closeButton").on("click",function(c){setTimeout(function(){b("#closeButton").addClass("hide");b("#pageflip img").stop().animate({width:"75px",height:"75px"},300);b(".back-img").stop().animate({width:"50px",height:"50px"},300);b("#pageflip img , .back-img").css("background-image",
'url("'+a.smallImage+'")')},1E3);clearTimeout()})})};h.html=function(a){a.width||(a.width=b(a.positionDiv).closest(".tncms-region-ads").prev().data("tnt-ads-tmp").width);m(a,a.html)};h.flash=function(a){var d=(b(a.positionDiv).width()<=a.width?b(a.positionDiv).width():a.width)/a.width,e=d*a.width,c=d*a.height,d="http://"+a.clickuri[0].replace(/"/g,"&quot;"),f="http://"+a.clickuri[1].replace(/"/g,"&quot;"),e=""+('<object type="application/x-shockwave-flash" data="'+a.asseturl+'" width="'+e+'" height="'+
c+'">');d&&!f?e+='<param name="flashvars" value="clickTAG='+encodeURIComponent(d)+'&clickTarget=_blank" />':d&&f&&(e+='<param name="flashvars" value="clickTAG='+encodeURIComponent(d)+"&clickTAG2="+encodeURIComponent(f)+'&clickTarget=_blank" />');e+='<param name="allowScriptAccess" value="always" /><param name="wmode" value="opaque" />';e+='<param name="movie" value="'+a.asseturl+'" />';e+="</object>";m(a,e)};h.flashexpand=function(a){var b='<div style="width:'+a.width+"px; height:"+a.height+'px; " class="hidden-sm hidden-xs tnt-expandable-small" style="cursor: pointer"><object type="application/x-shockwave-flash" data="'+
a.smallFlash+'" width="'+a.width+'" height="'+a.height+'"><param name="movie" value="'+a.asseturl+'" /><param name="wmode" value="opaque" /></object></div>',e='<div class="hidden-sm hidden-xs tnt-expandable-big" style="display: none;"><object type="application/x-shockwave-flash" data="'+a.largeFlash+'" width="'+a.largewidth+'" height="'+a.largeheight+'"><param name="flashvars" value="clickTAG='+encodeURIComponent("http:"+a.clickuri)+'&clickTarget=_blank" /><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="movie" value="'+
a.largeFlash+'" /></object></div>';m(a,b+e).then(p(a)).then(n(a)).then()};h.popup=function(a){function b(){k.getElementsByTagName("body")[0].removeChild(k.getElementById("blox-ad-position-_popup1"));k.getElementsByTagName("body")[0].removeChild(k.getElementById("BlackOutDiv"))}if("undefined"!==typeof a.clickuri)var e=a.clickuri.replace(/"/g,"&quot;");var c=k.createElement("div");c.setAttribute("id","BlackOutDiv");c.style.position="fixed";c.style.top=0;c.style.left=0;c.style.width="100%";c.style.height=
"100%";c.style.zIndex=99998;c.style.backgroundColor="black";c.style.opacity=0.9;c.style.filter="alpha(opacity=90)";var f;f='<div class="tnt-popup-ad"><span class="fa fa-2x fa-close"></span>';f+=""===e?'<img src="'+a.asseturl+'">':'<a target="_blank" href="'+e+'"><img src="'+a.asseturl+'"></a>';f+="</div>";"undefined"!=typeof c.addEventListener?c.addEventListener("click",b,!1):("BackCompat"==k.compatMode&&(c.style.width="110%",c.style.height="110%",c.style.position="absolute"),c.attachEvent("onclick",
b));k.getElementsByTagName("body")[0].appendChild(c);TNCMS.AdManager.renderAd(a);m(a,f)};h.image=function(a){if("undefined"!==typeof a.clickuri)var b=a.clickuri.replace(/"/g,"&quot;");if("wallpaper"==a.display){var e="",b="",c=a.height,f=k.getElementsByTagName("body")[0],e=e+(f.style.backgroundImage="url("+a.asseturl+")"),e=e+(f.style.height=c+"px"),e=e+(f.className+=" wallpaper-ad ");a.clickuri&&(b+='<a href="'+a.clickuri+'" target="'+a.target+'" style="width:100%; height: 100%; display:block"></a>')}else b=
"anchor"==a.display?""===a.clickuri?'<a href="#" class="close" data-dismiss="alert"><span class="fa fa-close"></span></a><img style="width: '+a.width+'px; height: auto; " src="'+a.asseturl+'" />':'<a href="#" class="close" data-dismiss="alert"><span class="fa fa-close"></span></a><a href="'+b+'" target="'+a.target+'" style="display:block"><img style="width: '+a.width+'px; height: auto; " src="'+a.asseturl+'" /></a>':""===a.clickuri?'<img src="'+a.asseturl+'" style="width: 100%;" />':'<a href="'+b+
'" target="'+a.target+'" style="display:block"><img src="'+a.asseturl+'" style="width: 100%;" /></a>';m(a,b,e)};h.text=function(a){a.width||(a.width=b(a.positionDiv).closest(".tncms-region-ads").prev().data("tnt-ads-tmp").width);var d=s(a);if("undefined"===typeof d||null===d)d="Advertisement";d=a.clickuri?'<div class="tnt-text-ad-container"><a href="'+a.clickuri.replace(/"/g,"&quot;")+'" target="'+a.target+'">'+a.title+"</a><br/>"+a.text+'<br/><span class="tnt-text-ad-flag">'+d+"</span></div>":'<div class="tnt-text-ad-container"><strong>'+
a.title+"</strong><br/>"+a.text+'<br/><span class="tnt-text-ad-flag">'+d+"</span></div>";m(a,d)};h._resize=function(){var a;b(q).on("resize",function(){clearTimeout(a);a=setTimeout(function(){h._render()},500)})};h._render=function(){b("div[data-tnt-ads]").each(function(a,d){var e=-1<d.id.indexOf("-debug-")?b("#"+d.id.replace("-debug","")):b(this),c=b(this).data("tnt-ads");(e.width()>=c.width&&b(this).is(":visible")||"wallpaper"==c.display)&&"position"==c.type&&TNCMS.AdManager.render({region:c.region,
slot:c.slot,fold:c.fold,width:c.width,display:c.display})})};var s=function(a){if(b(a.positionDiv).closest(".tncms-region-ads").prev().attr("data-tnt-ads-tmp"))var d=b(a.positionDiv).closest(".tncms-region-ads").prev().data("tnt-ads-tmp").overline;else b(a.positionDiv).attr("data-tnt-ads")&&(d=b(a.positionDiv).data("tnt-ads").overline);return d},m=function(a,d){var e=new b.Deferred,c="";"anchor"==a.display&&(c+=" tnt-ads-anchor  alert ");"popup"==a.display&&(c+=" tnt-ads-popup ");c+="tnt-"+a.type+
"-ad-wrapper";c=["tnt-ads",c].join(" ");"wallpaper"==a.display?(b("#wallpaper-left").empty().append(d),b("#wallpaper-right").empty().append(d)):b(a.positionDiv).empty().removeAttr("style").removeClass().addClass(c).css({"max-width":a.width+"px"}).append(d);"text"!=a.type&&(c=s(a))&&1>b(a.positionDiv).siblings(".tnt-ads-overline").length&&(c='<div class="tnt-ads-overline">'+c+"</div>",b(a.positionDiv).before(c));e.resolve(a);return e.promise()}})(window,document,jQuery,__tnt);