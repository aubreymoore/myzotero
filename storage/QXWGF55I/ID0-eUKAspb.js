if (self.CavalryLogger) { CavalryLogger.start_js(["I\/2A0"]); }

__d("VideoPlayerLoggerEvent",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports={AUTOPLAY_PREFERENCE_CHANGED:"autoplay_preference_changed",END_STALL_TIME:"end_stall_time",AUTOPLAY_PREFERENCE_STATUS:"autoplay_preference_status",ERROR_ALERT_SHOWN:"video_error_alert_shown",NOT_AUTOPLAYING:"not_autoplaying",VIDEO_CHANNEL_NO_RELATED_VIDEO:"video_channel_no_related_video",VIDEO_ORIENTATION_CHANGED:"video_orientation_changed",ASSETS_LOADED:"assets_loaded",BUFFERED:"buffered",CANCELLED_REQUESTED_PLAYING:"cancelled_requested_playing",CAROUSEL_CHANGE:"carousel_change",CHROMECAST_AVAILABILITY_CHECKED:"chromecast_availabilty_checked",CHROMECAST_CAST_CLICKED:"chromecast_button_clicked",CHROMECAST_CAST_CONNECTED:"chromecast_connected",CHROMECAST_CAST_DISABLED:"chromecast_button_disabled",CHROMECAST_CAST_DISCONNECTED:"chromecast_disconnected",CHROMECAST_CAST_RECONNECTED:"chromecast_reconnected",CHROMECAST_CAST_VISIBLE:"chromecast_button_visible",CHROMECAST_NOT_SUPPORTED:"chromecast_not_supported",DISPLAYED:"displayed",ENTERED_HD:"entered_hd",ENTERED_FALLBACK:"entered_fallback",ENTERED_FS:"entered_fs",EXITED_HD:"exited_hd",EXITED_FS:"exited_fs",ERROR:"error",FINISHED_LOADING:"finished_loading",FINISHED_PLAYING:"finished_playing",HTTP_STATUS_UPDATE:"http_status_update",IMPRESSION:"impression",INVALID_URL:"invalid_url",MUTED:"muted",NO_SURFACE_UPDATE:"no_surface_update",PAUSED:"paused",PLAY_REQUESTED:"play_requested",PLAYER_FORMAT_CHANGED:"player_format_changed",PLAYER_LOADED:"player_loaded",PROGRESS:"progress",STREAM_RESET:"stream_reset",POP_FAILOVER:"pop_failover",SURFACE_UPDATED:"surface_updated",TOGGLE_SUBTITLE_OFF:"toggle_subtitle_off",TOGGLE_SUBTITLE_ON:"toggle_subtitle_on",QUALITY_CHANGE:"quality_change",READY_TO_PLAY:"ready_to_play",REPLAYED:"replayed",REPRESENTATION_ENDED:"representation_ended",REQUESTED:"requested",REQUESTED_PLAYING:"requested_playing",SCRUBBED:"scrubbed",STARTED_PLAYING:"started_playing",STARTED_RECEIVING_BYTES:"started_receiving_bytes",STOPPED_PLAYING:"stopped_playing",UNMUTED:"unmuted",UNPAUSED:"unpaused",VOLUME_CHANGED:"volume_changed",VOLUME_DECREASE:"volume_decrease",VOLUME_INCREASE:"volume_increase",VIDEO_PLAYING:"video_playing",VIDEO_SKIP_AD:"video_skip_ad",VIDEO_CHAINING_IMPRESSION:"video_chaining_impression",VIDEO_CHAINING_TAP:"video_chaining_tap",PLAYING_LIVE_STARTED:"playing_live_started",PLAYING_LIVE_STOPPED:"playing_live_stopped",SWITCHED_IMPLEMENTATION:"switched_implementation",INLINE_CLICK_TO_PLAY:"inline_click_to_play",VIDEO_PLAYER_SERVICE_DISCONNECTED:"video_player_service_disconnected",VIDEO_PLAYER_SERVICE_RECONNECTED:"video_player_service_reconnected",VIDEO_PLAYER_SERVICE_UNAVAILABLE:"video_player_service_unavailable",LIVE_SEGMENT_LOAD_ERROR:"live_segment_load_error",MANIFEST_LOAD_ERROR:"manifest_load_error",MANIFEST_DATA_TYPE_ERROR:"manifest_data_type_error",STREAM_SEGMENT_LOAD_ERROR:"stream_segment_load_error",PLAYHEAD_FELL_BEHIND_ERROR:"playhead_fell_behind_error",UNEXPECTED_SEGMENT_ERROR:"unexpected_segment_error",NETWORK_TIMEOUT:"network_timeout",COMPLETION:"completion",VIEW:"view",PLAYED_FOR_THREE_SECONDS:"played_for_three_seconds",VIEWPORT_ROTATED:"viewport_rotated",VIEWPORT_ZOOMED:"viewport_zoomed",HEADING_RESET:"heading_reset",GUIDE_ON:"guide_on",GUIDE_OFF:"guide_off"};},null);
__d('destroyOnUnload',['Run'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){c('Run').onLeave(i);}f.exports=h;},null);
__d("Deferred",["Promise"],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(){"use strict";this.$Deferred1=false;this.$Deferred2=new (c("Promise"))(function(i,j){this.$Deferred3=i;this.$Deferred4=j;}.bind(this));}h.prototype.getPromise=function(){"use strict";return this.$Deferred2;};h.prototype.resolve=function(i){"use strict";this.$Deferred1=true;this.$Deferred3(i);};h.prototype.reject=function(i){"use strict";this.$Deferred1=true;this.$Deferred4(i);};h.prototype["catch"]=function(){"use strict";return c("Promise").prototype["catch"].apply(this.$Deferred2,arguments);};h.prototype.then=function(){"use strict";return c("Promise").prototype.then.apply(this.$Deferred2,arguments);};h.prototype.done=function(){"use strict";c("Promise").prototype.done.apply(this.$Deferred2,arguments);};h.prototype.isSettled=function(){"use strict";return this.$Deferred1;};f.exports=h;},null);
__d('XHRHttpError',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h='HTTP_CLIENT_ERROR',i='HTTP_PROXY_ERROR',j='HTTP_SERVER_ERROR',k='HTTP_TRANSPORT_ERROR',l='HTTP_UNKNOWN_ERROR';function m(n,o){if(o===0){var p=n.getProtocol();if(p==='file'||p==='ftp')return null;return k;}else if(o>=100&&o<200){return i;}else if(o>=200&&o<300){return null;}else if(o>=400&&o<500){return h;}else if(o>=500&&o<600){return j;}else if(o>=12001&&o<12156){return k;}else return l;}f.exports={getErrorCode:m,HTTP_CLIENT_ERROR:h,HTTP_PROXY_ERROR:i,HTTP_SERVER_ERROR:j,HTTP_TRANSPORT_ERROR:k,HTTP_UNKNOWN_ERROR:l};},null);
__d('xhrSimpleDataSerializer',[],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){var j=[],k;for(k in i)j.push(encodeURIComponent(k)+'='+encodeURIComponent(i[k]));return j.join('&');}f.exports=h;},null);
__d('XHRRequest',['invariant','ErrorUtils','TimeSlice','URI','XHRHttpError','ZeroRewrites','getAsyncHeaders','xhrSimpleDataSerializer'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i={errorCode:null,errorMsg:null,errorType:null},j={loadedBytes:null,totalBytes:null};function k(l){'use strict';this.setURI(l);this.setResponseType(null);this.setMethod('POST');this.setTransportBuilder(c('ZeroRewrites').getTransportBuilderForURI(this.getURI()));this.setDataSerializer(c('xhrSimpleDataSerializer'));this.$XHRRequest1=this.$XHRRequest1.bind(this);}k.prototype.setURI=function(l){'use strict';this.$XHRRequest2=c('ZeroRewrites').rewriteURI(new (c('URI'))(l));return this;};k.prototype.getURI=function(){'use strict';return this.$XHRRequest2;};k.prototype.setResponseType=function(l){'use strict';this.$XHRRequest3=l;return this;};k.prototype.setMethod=function(l){'use strict';this.$XHRRequest4=l;return this;};k.prototype.getMethod=function(){'use strict';return this.$XHRRequest4;};k.prototype.setData=function(l){'use strict';this.$XHRRequest5=l;return this;};k.prototype.getData=function(){'use strict';return this.$XHRRequest5;};k.prototype.setRawData=function(l){'use strict';this.$XHRRequest6=l;return this;};k.prototype.setRequestHeader=function(l,m){'use strict';if(!this.$XHRRequest7)this.$XHRRequest7={};this.$XHRRequest7[l]=m;return this;};k.prototype.setTimeout=function(l){'use strict';this.$XHRRequest8=l;return this;};k.prototype.getTimeout=function(){'use strict';return this.$XHRRequest8;};k.prototype.setResponseHandler=function(l){'use strict';this.$XHRRequest9=l;return this;};k.prototype.setErrorHandler=function(l){'use strict';this.$XHRRequest10=l;return this;};k.prototype.getErrorHandler=function(){'use strict';return this.$XHRRequest10;};k.prototype.setAbortHandler=function(l){'use strict';this.$XHRRequest11=l;return this;};k.prototype.getAbortHandler=function(){'use strict';return this.$XHRRequest11;};k.prototype.setTimeoutHandler=function(l){'use strict';this.$XHRRequest12=l;return this;};k.prototype.setUploadProgressHandler=function(l){'use strict';this.$XHRRequest13=l;return this;};k.prototype.setDownloadProgressHandler=function(l){'use strict';this.$XHRRequest14=l;return this;};k.prototype.setTransportBuilder=function(l){'use strict';this.$XHRRequest15=l;return this;};k.prototype.setDataSerializer=function(l){'use strict';this.$XHRRequest16=l;return this;};k.prototype.send=function(){'use strict';var l=this.$XHRRequest8,m=this.$XHRRequest15(),n=this.getURI();this.$XHRRequest17=m;var o;!(this.$XHRRequest4==='POST'||!this.$XHRRequest6)?h(0):void 0;if(this.$XHRRequest4==='GET'||this.$XHRRequest6){n.addQueryData(this.$XHRRequest5);o=this.$XHRRequest6;}else o=this.$XHRRequest16(this.$XHRRequest5);m.onreadystatechange=c('TimeSlice').guard(this.$XHRRequest1,'XHRRequest onreadystatechange');if(m.upload&&this.$XHRRequest13)m.upload.onprogress=this.$XHRRequest18.bind(this);if(this.$XHRRequest14)m.onprogress=this.$XHRRequest19.bind(this);if(l)this.$XHRRequest20=setTimeout(this.$XHRRequest21.bind(this),l);m.open(this.$XHRRequest4,n.toString(),true);if(this.$XHRRequest7)for(var p in this.$XHRRequest7)m.setRequestHeader(p,this.$XHRRequest7[p]);var q=c('getAsyncHeaders')(n);Object.keys(q).forEach(function(r){m.setRequestHeader(r,q[r]);});if(this.$XHRRequest3==='arraybuffer')if('responseType' in m){m.responseType='arraybuffer';}else if('overrideMimeType' in m){m.overrideMimeType('text/plain; charset=x-user-defined');}else if('setRequestHeader' in m)m.setRequestHeader('Accept-Charset','x-user-defined');if(this.$XHRRequest3==='blob')m.responseType=this.$XHRRequest3;m.send(o);};k.prototype.abort=function(){'use strict';this.$XHRRequest22();if(this.$XHRRequest11)c('ErrorUtils').applyWithGuard(this.$XHRRequest11,null,null,null,'XHRRequest:_abortHandler');};k.prototype.$XHRRequest22=function(){'use strict';var l=this.$XHRRequest17;if(l){l.onreadystatechange=null;l.abort();}this.$XHRRequest23();};k.prototype.$XHRRequest21=function(){'use strict';this.$XHRRequest22();if(this.$XHRRequest12)c('ErrorUtils').applyWithGuard(this.$XHRRequest12,null,null,null,'XHRRequest:_abortHandler');};k.prototype.$XHRRequest24=function(l){'use strict';if(this.$XHRRequest3)if('response' in l){return l.response;}else if(this.$XHRRequest3==='arraybuffer')if(window.VBArray)return window.VBArray(l.responseBody).toArray();return l.responseText;};k.prototype.$XHRRequest1=function(){'use strict';var l=this.$XHRRequest17,m=l.readyState;if(m>=2){var n=m===4,o=this.getURI(),p=c('XHRHttpError').getErrorCode(o,l.status),q=this.$XHRRequest9;if(p!==null){if(n){i.errorCode=p;i.errorMsg=this.$XHRRequest24(l);i.errorType=l.status?'HTTP '+l.status:'HTTP';if(this.$XHRRequest10)c('ErrorUtils').applyWithGuard(this.$XHRRequest10,null,[i],null,'XHRRequest:_errorHandler');}}else if(q){var r=null;if(q.includeHeaders)r=l.getAllResponseHeaders();if(n||q.parseStreaming&&m===3)c('ErrorUtils').applyWithGuard(q,null,[this.$XHRRequest24(l),r,n],null,'XHRRequest:handler');}if(n)this.$XHRRequest23();}};k.prototype.$XHRRequest18=function(l){'use strict';j.loadedBytes=l.loaded;j.totalBytes=l.total;if(this.$XHRRequest13)c('ErrorUtils').applyWithGuard(this.$XHRRequest13,null,[j],null,'XHRRequest:_uploadProgressHandler');};k.prototype.$XHRRequest19=function(l){'use strict';var m={loadedBytes:l.loaded,totalBytes:l.total};if(this.$XHRRequest14)c('ErrorUtils').applyWithGuard(this.$XHRRequest14,null,[m],null,'XHRRequest:_downloadProgressHandler');};k.prototype.$XHRRequest23=function(){'use strict';clearTimeout(this.$XHRRequest20);delete this.$XHRRequest17;};f.exports=k;},null);
__d('VideoFeedFastPreloadController',['Run','DOMQuery'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=0,i={preload:function(j){if(h<2){j=c('DOMQuery').scry(j,'video')[0];if(j instanceof b.HTMLVideoElement){if(!h)c('Run').onBeforeUnload(function(){return i.reset();});j.preload='auto';h+=1;}}},reset:function(){h=0;}};i.reset();f.exports=i;},null);
__d('VideoDashPrefetchCache',['Promise','getCrossOriginTransport','Deferred','Map','Run','URI','VideoPlayerShakaExperiments','XHRRequest'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=null;function i(m,n){var o=new Error(m.errorMsg);o.name=m.errorType;o.type='preload';o.url=n;o.status=m.errorCode;return o;}function j(m){var n=new (c('URI'))(m.url),o=n.getDomain();return o.endsWith('fbcdn.net')&&!o.startsWith('interncache')&&!o.endsWith('ak.fbcdn.net');}function k(m,n,o){return {response:m.slice(n.start+0,n.end+1),responseTime:o};}function l(){'use strict';this.$VideoDashPrefetchCache1=new (c('Map'))();this.$VideoDashPrefetchCache2=[];this.$VideoDashPrefetchCache3=[];this.$VideoDashPrefetchCache4=0;this.$VideoDashPrefetchCache5=c('VideoPlayerShakaExperiments').maxPrefetchVideosNum;this.$VideoDashPrefetchCache6=c('VideoPlayerShakaExperiments').consolidateFragmentedPrefetchRequest;}l.prototype.$VideoDashPrefetchCache7=function(m){'use strict';var n=new (c('XHRRequest'))(m).setMethod('GET').setResponseType('arraybuffer').setTransportBuilder(c('getCrossOriginTransport')),o=new (c('Promise'))(function(p,q){n.setErrorHandler(function(r){this.$VideoDashPrefetchCache8(n);q(i(r,m));}.bind(this));n.setResponseHandler(function(r){n.response=r;this.$VideoDashPrefetchCache8(n);p(n);}.bind(this));n.setAbortHandler(function(){q(o,new Error('Request promise aborted'));});}.bind(this));this.$VideoDashPrefetchCache9(m,o);this.$VideoDashPrefetchCache2.push(n);n.send();return o;};l.prototype.$VideoDashPrefetchCache10=function(m){'use strict';var n=[];for(var o=0;o<m.length;o++){var p=l.createQueryStringURL(m[o]);if(!this.has(p))n.push(this.$VideoDashPrefetchCache7(p));}return n;};l.prototype.$VideoDashPrefetchCache11=function(m){'use strict';var n=l.getConsolidatedURL(m);if(n==null)return this.$VideoDashPrefetchCache10(m);var o=new (c('XHRRequest'))(n).setMethod('GET').setResponseType('arraybuffer').setTransportBuilder(c('getCrossOriginTransport')),p=Date.now(),q=[];for(var r=0;r<m.length;r++){var s=l.createQueryStringURL(m[r]),t=new (c('Deferred'))();if(!this.has(s))this.$VideoDashPrefetchCache9(s,t.getPromise());q.push(t);}o.setErrorHandler(function(u){this.$VideoDashPrefetchCache8(o);for(var v=0;v<q.length;v++)q[v].reject(i(u,n));}.bind(this));o.setResponseHandler(function(u){var v=Date.now()-p;for(var w=0;w<m.length;w++){var x=q[w],y=m[w];x.resolve(k(u,y,v));}this.$VideoDashPrefetchCache8(o);}.bind(this));o.setAbortHandler(function(){for(var u=0;u<m.length;u++){var v=q[u];v.reject(new Error('Request aborted.'));}});this.$VideoDashPrefetchCache2.push(o);o.send();return q.map(function(u){return u.getPromise();});};l.prototype.$VideoDashPrefetchCache12=function(m){'use strict';this.$VideoDashPrefetchCache4++;var n=this.$VideoDashPrefetchCache6?this.$VideoDashPrefetchCache11(m.video):this.$VideoDashPrefetchCache10(m.video),o=this.$VideoDashPrefetchCache6?this.$VideoDashPrefetchCache11(m.audio):this.$VideoDashPrefetchCache10(m.audio);c('Promise').all(n.concat(o)).then(function(){return this.$VideoDashPrefetchCache13();}.bind(this))['catch'](function(){return this.$VideoDashPrefetchCache13();}.bind(this));};l.prototype.$VideoDashPrefetchCache9=function(m,n){'use strict';if(this.$VideoDashPrefetchCache1.values().next().done)c('Run').onLeave(function(){for(var o=0;o<this.$VideoDashPrefetchCache2.length;o++)this.$VideoDashPrefetchCache2[o].abort();this.$VideoDashPrefetchCache2=[];this.$VideoDashPrefetchCache3=[];this.$VideoDashPrefetchCache4=0;this.$VideoDashPrefetchCache1.clear();}.bind(this));this.$VideoDashPrefetchCache1.set(m,n);};l.prototype.$VideoDashPrefetchCache8=function(m){'use strict';var n=this.$VideoDashPrefetchCache2.indexOf(m);if(n>-1)this.$VideoDashPrefetchCache2.splice(n,1);};l.prototype.$VideoDashPrefetchCache13=function(){'use strict';this.$VideoDashPrefetchCache4--;var m=this.$VideoDashPrefetchCache3.shift();if(m)this.$VideoDashPrefetchCache12(m);};l.prototype.has=function(m){'use strict';return this.$VideoDashPrefetchCache1.has(m);};l.prototype.getAndDelete=function(m){'use strict';var n=this.$VideoDashPrefetchCache1.get(m);this.$VideoDashPrefetchCache1['delete'](m);return n;};l.prototype.queueRequestBatch=function(m){'use strict';if(this.$VideoDashPrefetchCache5===0||this.$VideoDashPrefetchCache4<this.$VideoDashPrefetchCache5){this.$VideoDashPrefetchCache12(m);}else this.$VideoDashPrefetchCache3.push(m);};l.getInstance=function(){'use strict';if(h===null)h=new l();return h;};l.createQueryStringURL=function(m){'use strict';var n=m.url,o=m.start,p=m.end;if(o!==null&&o!==undefined&&p!==null&&p!==undefined)n=new (c('URI'))(n).addQueryData({bytestart:o,byteend:p});return n.toString();};l.getConsolidatedURL=function(m){'use strict';var n='',o=Infinity,p=0;for(var q=0;q<m.length;q++){var r=m[q],s=r.url,t=r.start,u=r.end;if(s==null||t==null||u==null)return null;if(n===''){n=s;}else if(n!==s)return null;o=Math.min(o,t);p=Math.max(p,u);}return l.createQueryStringURL({url:n,start:o,end:p});};l.loadVideo=function(m){'use strict';var n=l.getInstance();n.queueRequestBatch({video:m.video.filter(j),audio:m.audio.filter(j)});};l.getCacheValue=function(m){'use strict';return l.getInstance().getAndDelete(m);};f.exports=l;},null);
__d('VideoDisplayTimePlayButton',['CSS','DataStore','Event'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={},i='_spinner',j={getClicked:function(k){return c('DataStore').get(k,'clicked',false);},register:function(k,l){var m=k.id;h[m]=c('Event').listen(k,'click',function(){if(l){c('CSS').hide(k);c('CSS').show(l);}c('DataStore').set(k,'clicked',true);});if(l)h[m+i]=c('Event').listen(l,'click',function(){c('CSS').hide(l);c('CSS').show(k);c('DataStore').set(k,'clicked',false);});},unregister:function(k){var l=k.id;if(h.hasOwnProperty(l))h[l].remove();var m=l+i;if(h.hasOwnProperty(m))h[m].remove();}};f.exports=j;},null);
__d('VideosRenderingInstrumentation',['DataStore','VideoPlayerHTML5Experiments','performanceAbsoluteNow'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h={storeRenderTime:function(i){var j=c('VideoPlayerHTML5Experiments').useMonotonicallyIncreasingTimers?c('performanceAbsoluteNow')():Date.now();c('DataStore').set(i,'videos_rendering_instrumentation',j);return j;},retrieveRenderTime:function(i){var j=c('DataStore').get(i,'videos_rendering_instrumentation',NaN);if(Number.isNaN(j))j=h.storeRenderTime(i);return j;}};f.exports=h;},null);