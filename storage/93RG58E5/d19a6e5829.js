(function($){if(typeof videojs!=="undefined"){autoplay=function(){var $vcOverlay=$("#vcOverlay"),$videoWrapper=$vcOverlay.parent(".video-wrapper"),$vcPlay=$vcOverlay.find("#vcPlay"),$vcStop=$vcOverlay.find("#vcStop"),$vcNever=$vcOverlay.find("#vcNever"),$radialProgress=$vcOverlay.find(".radial-progress"),vcTimer=5,vcTimeout,userAutoplay=$.cookie("apv"),$vcEnableAp=$('\x3cdiv class\x3d"vcEnableAp" id\x3d"vcEnableAp"\x3eEnable auto play\x3c/div\x3e'),windowIsActive,videoPlayed,isPaused=false,brightcovePlayer,
vcPlayed=false,hidden;var playAutoJs=function(playType){inlinePlayVar="autoplay:"+playType;if(!vcPlayed){brightcovePlayer.ima3.ready(function(){brightcovePlayer.play()});vcPlayed=true}};var vcAddPlayer=function(autoplay,playType){$vcOverlay.remove();if(autoplay)playAutoJs(playType);else window.clearInterval(vcTimeout)};var vcTick=function(){if(!isPaused)if(vcTimer<0){videoPlayed=true;vcAddPlayer(true,"play");window.clearInterval(vcTimeout)}else $radialProgress.attr("data-progress",vcTimer--)};$vcPlay.click(function(e){e.preventDefault();
vcAddPlayer(true,"manualplay")});$vcStop.click(function(e){e.preventDefault();cs.customTrack({"on_page_activity":"autoplay:paused"});vcAddPlayer(false)});$vcNever.click(function(e){e.preventDefault();cs.customTrack({"on_page_activity":"autoplay:disabled"});$.cookie("apv",false,{expires:30,path:"/"});vcAddPlayer(false)});var playCheckTicker,checkIfPlaying=function(){if(brightcovePlayer!==undefined)if(!brightcovePlayer.paused())$vcEnableAp.remove();else playCheckTicker=setTimeout(checkIfPlaying,200);
else playCheckTicker=setTimeout(checkIfPlaying,200)};function handleVisibilityChange(){if(!document[hidden]&&!videoPlayed)isPaused=false;else isPaused=true}function vcOverlayResize(){$vcOverlay.css("height",$videoWrapper.outerHeight());$vcOverlay.css("width",$videoWrapper.outerWidth())}this.checkAutoplay=function(player){brightcovePlayer=player;vcOverlayResize();if(typeof $.cookie("apv")==="undefined"){$vcOverlay.show();vcTimeout=setInterval(vcTick,1E3);var visibilityChange;if(typeof document.hidden!==
"undefined"){hidden="hidden";visibilityChange="visibilitychange"}else if(typeof document.mozHidden!=="undefined"){hidden="mozHidden";visibilityChange="mozvisibilitychange"}else if(typeof document.msHidden!=="undefined"){hidden="msHidden";visibilityChange="msvisibilitychange"}else if(typeof document.webkitHidden!=="undefined"){hidden="webkitHidden";visibilityChange="webkitvisibilitychange"}if(typeof visibilityChange!=="undefined"){document.addEventListener(visibilityChange,handleVisibilityChange,false);
if(document[hidden]||videoPlayed)isPaused=true}$(window).resize(function(){vcOverlayResize()})}else{$vcOverlay.remove();$videoWrapper.append($vcEnableAp);$vcEnableAp.click(function(e){e.preventDefault();$vcEnableAp.remove();$.removeCookie("apv",{path:"/"});vcAddPlayer(true,"manualplay")});playCheckTicker=setTimeout(checkIfPlaying,200)}}};var players=[];for(x=0;x<Object.keys(videojs.players).length;x++){var setPlayer=Object.keys(videojs.players)[x];videojs(setPlayer).ready(function(){player=this;player.on("play",
onPlay);players.push(player);player.ima3.settings.serverUrl=nzmeads.getPrerollURL();if(!isMobile.any()&&!(browserDetect.browser==="Safari"&&browserDetect.version>=11)){if(window.innerWidth>=810)if(player.el_.dataset.checkAutoplay!==undefined&&player.el_.dataset.checkAutoplay=="true"){var ap=new autoplay;ap.checkAutoplay(player)}else if(player.el_.dataset.autoplay!==undefined&&player.el_.dataset.autoplay=="true")player.ima3.ready(function(){player.play()})}else if(isMobile.Safari()||browserDetect.browser===
"Safari"&&browserDetect.version>=11)player.ima3.ready(function(){player.ima3.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true)})})}function onPlay(e){var id=e.target.id;for(var i=0;i<players.length;i++)if(players[i].id()!=id){if(typeof players[i].ima3.adsManager!=="undefined")players[i].ima3.adsManager.pause();videojs(players[i].id()).pause()}}}})(jQuery);