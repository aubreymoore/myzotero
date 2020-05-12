if (self.CavalryLogger) { CavalryLogger.start_js(["C4o4\/"]); }

__d("NavigationMetricsEnumJS",[],(function a(b,c,d,e,f,g){f.exports={NAVIGATION_START:"navigationStart",UNLOAD_EVENT_START:"unloadEventStart",UNLOAD_EVENT_END:"unloadEventEnd",REDIRECT_START:"redirectStart",REDIRECT_END:"redirectEnd",FETCH_START:"fetchStart",DOMAIN_LOOKUP_START:"domainLookupStart",DOMAIN_LOOKUP_END:"domainLookupEnd",CONNECT_START:"connectStart",CONNECT_END:"connectEnd",SECURE_CONNECTION_START:"secureConnectionStart",REQUEST_START:"requestStart",RESPONSE_START:"responseStart",RESPONSE_END:"responseEnd",DOM_LOADING:"domLoading",DOM_INTERACTIVE:"domInteractive",DOM_CONTENT_LOADED_EVENT_START:"domContentLoadedEventStart",DOM_CONTENT_LOADED_EVENT_END:"domContentLoadedEventEnd",DOM_COMPLETE:"domComplete",LOAD_EVENT_START:"loadEventStart",LOAD_EVENT_END:"loadEventEnd"};}),null);
__d("ResourceTimingMetricsEnumJS",[],(function a(b,c,d,e,f,g){f.exports={START_TIME:"startTime",REDIRECT_START:"redirectStart",REDIRECT_END:"redirectEnd",FETCH_START:"fetchStart",DOMAIN_LOOKUP_START:"domainLookupStart",DOMAIN_LOOKUP_END:"domainLookupEnd",CONNECT_START:"connectStart",SECURE_CONNECTION_START:"secureConnectionStart",CONNECT_END:"connectEnd",REQUEST_START:"requestStart",RESPONSE_START:"responseStart",RESPONSE_END:"responseEnd"};}),null);
__d("ChannelClientID",[],(function a(b,c,d,e,f,g){var h=(Math.random()*2147483648|0).toString(16),i={getID:function j(){return h;}};f.exports=i;}),null);
__d('PlatformDialog',['cx','DOMEventListener','DOMEvent','CSS'],(function a(b,c,d,e,f,g,h){var i;j.getInstance=function(){'use strict';return i;};function j(k,l,m){'use strict';i=this;this.$PlatformDialog1=k;this.$PlatformDialog2=l;this.$PlatformDialog3=false;c('DOMEventListener').add(this.$PlatformDialog1,'submit',function(n){if(this.$PlatformDialog3){new (c('DOMEvent'))(n).kill();return;}this.$PlatformDialog3=true;if(m)c('CSS').addClass(k,"_32qa");}.bind(this));}j.prototype.getForm=function(){'use strict';return this.$PlatformDialog1;};j.prototype.getDisplay=function(){'use strict';return this.$PlatformDialog2;};j.prototype.hasBeenSubmitted=function(){'use strict';return this.$PlatformDialog3;};j.RESPONSE='platform/dialog/response';f.exports=j;}),null);
__d('ArbiterFrame',[],(function a(b,c,d,e,f,g){var h={inform:function i(j,k,l){var m=parent.frames,n=m.length,o;k.crossFrame=true;for(var p=0;p<n;p++){o=m[p];try{if(!o||o==window)continue;if(o.require){o.require('Arbiter').inform(j,k,l);}else if(o.ServerJSAsyncLoader)o.ServerJSAsyncLoader.wakeUp(j,k,l);}catch(q){}}}};f.exports=h;}),null);
__d('ImageTimingHelper',['Arbiter','BigPipe','URI'],(function a(b,c,d,e,f,g){var h={},i={};c('Arbiter').subscribe(c('BigPipe').Events.init,function(j,k){if(k.lid&&k.lid!=='0')k.arbiter.subscribe('images_displayed',function(l,m){var n=h[m.lid];if(!n)n=h[m.lid]=[];m.images.forEach(function(o){try{var p=new (c('URI'))(o);o=p.setFragment('').toString();}catch(q){return;}if(i[o])return;i[o]=true;n.push({pagelet:m.pagelet,timeslice:m.timeslice,ts:m.ts,uri:o});});});});f.exports.getImageTimings=function(j){return h[j]||[];};}),null);
__d('PageletEventsHelper',['Arbiter','PageletEventConstsJS'],(function a(b,c,d,e,f,g){var h='BigPipe/init',i='pagelet_event',j='phase_begin',k={},l=[],m=false;function n(){return {pagelets:{},categories:{},phase_start:{},display_resources:{},all_resources:{}};}function o(r,s,t,u){if(k[u].pagelets[s]==undefined)k[u].pagelets[s]={};k[u].pagelets[s][r]=t;}function p(r){r.subscribe(i,function(s,t){var event=t.event,u=t.ts,v=t.id,w=t.lid,x=t.phase,y=t.categories,z=t.allResources,aa=t.displayResources;o(event,v,u,w);var ba=k[w],ca=ba.pagelets[v];if(event===c('PageletEventConstsJS').ARRIVE_END){ca.phase=x;ba.all_resources[v]=z;ba.display_resources[v]=aa;}if((event===c('PageletEventConstsJS').ONLOAD_END||event===c('PageletEventConstsJS').DISPLAY_END)&&y)y.forEach(function(fa){if(ba.categories[fa]==undefined)ba.categories[fa]={};ba.categories[fa][event]=u;});for(var da=0,ea=l.length;da<ea;da++)l[da](v,event,u,w);});r.subscribe(j,function(event,s){k[s.lid].phase_start[s.phase]=s.ts;});}var q={init:function r(){if(m)return;c('Arbiter').subscribe(h,function(event,s){var t=s.lid,u=s.arbiter;k[t]=n();p(u);});m=true;},getMetrics:function r(s){if(k[s])return JSON.parse(JSON.stringify(k[s]));return null;},subscribeToPageletEvents:function r(s){l.push(s);return {remove:function t(){l.splice(0,l.indexOf(s));}};}};f.exports=q;}),null);
__d('Plugin',['Arbiter','ArbiterFrame'],(function a(b,c,d,e,f,g){var h={CONNECT:'platform/plugins/connect',DISCONNECT:'platform/plugins/disconnect',ERROR:'platform/plugins/error',RELOAD:'platform/plugins/reload',DIALOG:'platform/plugins/dialog',connect:function i(j,k){var l={identifier:j,href:j,story_fbid:k};c('Arbiter').inform(h.CONNECT,l);c('ArbiterFrame').inform(h.CONNECT,l);},disconnect:function i(j,k){var l={identifier:j,href:j,story_fbid:k};c('Arbiter').inform(h.DISCONNECT,l);c('ArbiterFrame').inform(h.DISCONNECT,l);},error:function i(j,k){c('Arbiter').inform(h.ERROR,{action:j,content:k});},reload:function i(j){c('Arbiter').inform(h.RELOAD,{reloadUrl:j||''});c('ArbiterFrame').inform(h.RELOAD,{reloadUrl:j||''});},reloadOtherPlugins:function i(j,k){c('ArbiterFrame').inform(h.RELOAD,{reloadUrl:'',reload:j||'',identifier:k||''});}};f.exports=h;}),null);
__d('PluginReturn',['invariant','Arbiter','Log','PlatformDialog','Plugin','URI','PlatformWidgetEndpoint'],(function a(b,c,d,e,f,g,h){c('Arbiter').subscribe(c('PlatformDialog').RESPONSE,function(event,j){if(j.error_code){c('Log').debug('Plugin Return Error (%s): %s',j.error_code,j.error_message||j.error_description);return;}c('Plugin').reload(j.plugin_reload);});var i={auto:function j(){c('Arbiter').subscribe(c('Plugin').RELOAD,function(event,k){var l=typeof k=='object'?k.reloadUrl:k;i.reload(l);});},syncPlugins:function j(){c('Arbiter').subscribe(c('Plugin').RELOAD,function(event,k){if(k.crossFrame)i.reload(k.reloadUrl,k.reload,k.identifier);});},reload:function j(k,l,m){var n=c('URI').getRequestURI().removeQueryData('ret').removeQueryData('act').removeQueryData('hash').addQueryData('reload',l).addQueryData('id',m);if(k){var l=new (c('URI'))(k);c('PlatformWidgetEndpoint').isPluginEndpoint(l.getPath())||h(0);n.setPath(l.getPath()).addQueryData(l.getQueryData());}window.location.replace(n.toString());}};f.exports=i;}),null);
__d('SimpleFBAuthenticatedXHRRequest',['invariant','CurrentUser','DTSG','ServerJSDefine','XHRRequest','isFacebookURI'],(function a(b,c,d,e,f,g,h){var i,j,k=1;i=babelHelpers.inherits(l,c('XHRRequest'));j=i&&i.prototype;function l(m,n){'use strict';j.constructor.call(this,m);var o={__dyn:c('ServerJSDefine').getLoadedModuleHash(),__req:(k++).toString(36),__ajax__:1,__a:1,__user:c('CurrentUser').getID()};j.setData.call(this,babelHelpers['extends']({},n,o));}l.prototype.send=function(){'use strict';if(!c('isFacebookURI')(this.getURI()))return j.send.call(this);if(c('DTSG').getCachedToken){var m=c('DTSG').getCachedToken();if(m){return this.sendOnDTSGToken(m);}else{c('DTSG').getToken().done(function(n){return this.sendOnDTSGToken(n);}.bind(this));return this;}}else this.sendOnDTSGToken(c('DTSG').getToken());};l.prototype.sendOnDTSGToken=function(m){'use strict';if(m)j.setData.call(this,babelHelpers['extends']({},this.getData(),{fb_dtsg:m}));return j.send.call(this);};l.prototype.setData=function(m){'use strict';h(0);};l.parseResponse=function(m){'use strict';return JSON.parse(m.substr(9));};l.getPayload=function(m){'use strict';var n=l.parseResponse(m).payload;return n.payload?n.payload:n;};f.exports=l;}),null);
__d("XFantailLogController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/ajax\/fantail\/",{service:{type:"String",required:true}});}),null);
__d('FantailLogQueue',['ChannelClientID','CircularBuffer','FantailConfig','PHPQuerySerializer','SimpleFBAuthenticatedXHRRequest','XFantailLogController','destroyOnUnload','setIntervalAcrossTransitions','sprintf'],(function a(b,c,d,e,f,g){var h={DEBUG:'debug',INFO:'info',WARN:'warn',ERROR:'error'};function i(j){'use strict';this.$FantailLogQueue2=j;this.$FantailLogQueue3=new (c('CircularBuffer'))(200);c('setIntervalAcrossTransitions')(this.$FantailLogQueue4.bind(this),30*1000);c('destroyOnUnload')(this.$FantailLogQueue4.bind(this));}i.get=function(j){'use strict';i.$FantailLogQueue1=i.$FantailLogQueue1||{};i.$FantailLogQueue1[j]=i.$FantailLogQueue1[j]||new i(j);return i.$FantailLogQueue1[j];};i.prototype.debug=function(j){'use strict';for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];this.$FantailLogQueue5.apply(this,[h.DEBUG,j].concat(l));};i.prototype.info=function(j){'use strict';for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];this.$FantailLogQueue5.apply(this,[h.INFO,j].concat(l));};i.prototype.warn=function(j){'use strict';for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];this.$FantailLogQueue5.apply(this,[h.WARN,j].concat(l));};i.prototype.error=function(j){'use strict';for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];this.$FantailLogQueue5.apply(this,[h.ERROR,j].concat(l));};i.prototype.$FantailLogQueue5=function(j,k){'use strict';for(var l=arguments.length,m=Array(l>2?l-2:0),n=2;n<l;n++)m[n-2]=arguments[n];var o=c('sprintf').apply(undefined,[k].concat(m));this.$FantailLogQueue3.write({log_time:Date.now(),log:o,severity:j,device_id:c('ChannelClientID').getID()});};i.prototype.$FantailLogQueue4=function(){'use strict';var j=this.$FantailLogQueue3.read();if(j.length>0){var k={log_time:[],log:[],severity:[],device_id:[]};j.forEach(function(m){k.log_time.push(m.log_time);k.log.push(m.log);k.severity.push(m.severity);k.device_id.push(m.device_id);});this.$FantailLogQueue3.clear();var l=c('XFantailLogController').getURIBuilder().setString('service',this.$FantailLogQueue2).getURI();new (c('SimpleFBAuthenticatedXHRRequest'))(l,k).setMethod('POST').setDataSerializer(c('PHPQuerySerializer').serialize).setRequestHeader('Content-Type','application/x-www-form-urlencoded').send();}};f.exports=i;}),null);
__d('ReactSpeedHelper',['LogBuffer','ReactDOM'],(function a(b,c,d,e,f,g){var h={enableRenderMeasurements:function i(){if(!c('ReactDOM').enableRenderMeasurements)return;c('ReactDOM').enableRenderMeasurements();},getMetrics:function i(j,k){return c('LogBuffer').read('react_speed').filter(function(l){return (j==null||l.begin>=j)&&(k==null||l.end<=k);});}};f.exports=h;}),null);
__d('sourceMetaToString',[],(function a(b,c,d,e,f,g){function h(i,j){var k;if(i.name){k=i.name;if(i.module)k=i.module+'.'+k;}else if(i.module)k=i.module+'.<anonymous>';if(j&&i.line){k=(k?k:'<anonymous>')+':'+i.line;if(i.column)k+=':'+i.column;}return k;}f.exports=h;}),null);
__d('NavigationTimingHelper',['NavigationMetricsEnumJS','forEachObject','performance'],(function a(b,c,d,e,f,g){function h(j,k){var l={};c('forEachObject')(c('NavigationMetricsEnumJS'),function(m){var n=k[m];if(n)l[m]=n+j;});return l;}var i={getAsyncRequestTimings:function j(k){if(!k||!c('performance').timing||!c('performance').getEntriesByName)return undefined;var l=c('performance').getEntriesByName(k);if(l.length===0)return undefined;return h(c('performance').timing.navigationStart,l[0]);},getNavTimings:function j(){if(!c('performance').timing)return undefined;return h(0,c('performance').timing);}};f.exports=i;}),null);
__d('ResourceTimingBootloaderHelper',['Bootloader','ErrorUtils','ImageTimingHelper','Map','ResourceTimingMetricsEnumJS','ResourceTimingsStore','ResourceTypes','Set','URI','forEachObject','isEmpty','performance'],(function a(b,c,d,e,f,g){var h=500,i=[],j={},k={},l={},m=['.mp4','.m4v','.mpd','m4a'],n=new (c('Set'))(['bootload','js_exec','start_bootload','tag_bootload']);function o(x){for(var y=m,z=Array.isArray(y),aa=0,y=z?y:y[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var ba;if(z){if(aa>=y.length)break;ba=y[aa++];}else{aa=y.next();if(aa.done)break;ba=aa.value;}var ca=ba;if(x.endsWith(ca))return true;}return false;}function p(x){var y=new (c('Map'))();c('ResourceTimingsStore').getMapFor(x).forEach(function(z){if(z.requestSent!=null){var aa=y.get(z.uri);if(aa!=null){aa.push(z);}else y.set(z.uri,[z]);}});y.forEach(function(z){return z.sort(function(aa,ba){return aa.requestSent-ba.requestSent;});});return y;}function q(x,y,z,aa){var ba=x.get(y);if(ba!=null)for(var ca=0;ca<ba.length;ca++){var da=ba[ca],ea=da.requestSent,fa=da.responseReceived;if((z==null||ea!=null&&ea<=z)&&(aa==null||fa!=null&&fa>=aa))return ba.splice(ca,ca+1)[0];}return null;}function r(x,y,z,aa,ba,ca,da){if(!c('performance').timing||!c('performance').getEntriesByType)return;var ea={},fa=c('performance').timing.navigationStart;if(z)ea=c('ImageTimingHelper').getImageTimings(aa).sort(function(mb,nb){return mb.ts-nb.ts;}).reduce(function(mb,nb){if(mb[nb.uri])return mb;mb[nb.uri]=nb.pagelet;return mb;},{});var ga=Array.from(c('performance').getEntriesByType('resource')),ha=ga.filter(function(mb){return mb.duration>=0&&mb.startTime!=null&&mb.startTime+fa>y&&(ba==null||mb.responseEnd==null||mb.responseEnd+fa<ba);});ha.sort(function(mb,nb){return mb.startTime-nb.startTime;});var ia=0,ja=0,ka=0,la=0,ma=p(c('ResourceTypes').XHR),na=p(c('ResourceTypes').CSS),oa=p(c('ResourceTypes').JS);for(var pa=0;pa<ha.length;pa++){var qa=ha[pa],ra='',sa='',ta='',ua=void 0,va=qa.initiatorType;switch(va){case 'css':case 'link':case 'script':var wa=c('ResourceTimingsStore').parseMakeHasteURL(qa.name);if(!wa)continue;var xa=wa[0],ya=wa[1];if((ya==='css'||ya==='js')&&da){var za=ya==='css'?na:oa;ua=q(za,qa.name,qa.startTime+fa,qa.responseEnd+fa);if(ua!=null){sa=ya;ra=ua.uid;break;}}if(ya==='css'||ya==='js'){sa=ya;var ab=l[qa.name]||ja++;ra=ab+'_'+xa;}else{var bb=u(qa.name);ta=bb[0];sa=bb[1];ra=ia+++'_'+ta;}break;case 'img':ra=ia+++'_'+s(qa.name);sa='img';break;case 'iframe':ra=ka+++'_'+s(qa.name)+t(qa.name);sa='iframe';break;case 'xmlhttprequest':if(ca){var cb=s(qa.name),db=t(qa.name);if(o(db)){ra=la+++'_'+cb+db;sa='video';break;}else{ua=q(ma,qa.name,qa.startTime+fa,qa.responseEnd+fa);if(ua!=null){sa=c('ResourceTypes').XHR;ra=ua.uid;break;}}}default:continue;}var eb={},fb=Object.keys(c('ResourceTimingMetricsEnumJS'));for(var gb=0;gb<fb.length;gb++){var hb=c('ResourceTimingMetricsEnumJS')[fb[gb]],ib=qa[hb];if(ib)eb[hb]=ib+c('performance').timing.navigationStart;}if(ua!=null){var jb=ua,kb=jb.requestSent,lb=jb.responseReceived;if(y!=null&&kb!=null&&kb<y||ba!=null&&lb!=null&&lb>ba)continue;eb.requestSent=kb;eb.responseReceived=lb;}eb.type=sa;eb.desc=ra;if(sa=='img'&&Object.prototype.hasOwnProperty.call(ea,qa.name))eb.pagelet=ea[qa.name];eb.transferSize=qa.transferSize;eb.encodedBodySize=qa.encodedBodySize;if(x[qa.name]==undefined)x[qa.name]=[];x[qa.name].push(eb);}}function s(x){var y=new (c('URI'))(x).getDomain();return y;}function t(x){var y=new (c('URI'))(x).getPath();return y;}function u(x){return [s(x),'img'];}function v(x){var y=Object.keys(x).filter(function(aa){return aa.startsWith('start_bootload/');}).sort(function(aa,ba){return x[aa]-x[ba];}).map(function(aa){return aa.substring(aa.indexOf('/')+1);});y.forEach(function(aa){return n.forEach(function(ba){var ca=ba+'/'+aa;if(x[ca]!=null)j[ca]=x[ca];});});i=i.concat(y);if(i.length>h){var z=i.splice(0,i.length-h);z.forEach(function(aa){return n.forEach(function(ba){if(j[ba+'/'+aa])delete j[ba+'/'+aa];});});}}var w={addPastBootloaderMetricsToResourceTimings:function x(){var y=arguments.length<=0||arguments[0]===undefined?{}:arguments[0],z=arguments.length<=1||arguments[1]===undefined?{}:arguments[1],aa=c('Bootloader').getURLToHashMap();c('forEachObject')(y,function(ba,ca){var da=aa[ca];if(!da)return;var ea=new (c('Map'))();ea.set('bootloader_hash',da);n.forEach(function(fa){var ga=fa+'/'+da,ha=z[ga]||j[ga];if(ha!=null)ea.set(fa,ha);});if(ea.size>0)ba.forEach(function(fa){if(fa.requestSent||fa.responseReceived)return;ea.forEach(function(ga,ha){return fa[ha]=ga;});});});},mergeBootloaderMetricsAndResourceTimings:function x(){var y=arguments.length<=0||arguments[0]===undefined?{}:arguments[0],z=arguments.length<=1||arguments[1]===undefined?{}:arguments[1],aa=arguments.length<=2||arguments[2]===undefined?true:arguments[2];if(c('isEmpty')(l))l=c('Bootloader').getURLToHashMap();var ba=new (c('Map'))();c('forEachObject')(l,function(da,ea){ba.set(da,ea);});var ca=[];c('forEachObject')(z,function(da,ea){var fa=ea.indexOf('/');if(fa===-1)return;var ga=ea.substring(0,fa);if(!n.has(ga))return;ca.push(ea);var ha=ea.substring(fa+1),ia=ba.get(ha);if(!ia){ia=ha;ha=l[ia];if(!ha)return;}if(ia.startsWith('data:'))ia='inlined resource: '+ha;if(y[ia]==null)y[ia]=[{}];y[ia].forEach(function(ja){ja.bootloader_hash=ha;ja[ga]=da;});});if(!aa){v(z);ca.forEach(function(da){return delete z[da];});}return y;},getLastTTIAndE2EImageResponseEnds:function x(y,z,aa){var ba={TTI:y,E2E:z};if(!c('performance').timing)return ba;var ca=aa.filter(function(fa){return fa.ts<=y;}).map(function(fa){return fa.uri;}).reduce(function(fa,ga){fa[ga]=true;return fa;},{}),da=aa.map(function(fa){return fa.uri;}).reduce(function(fa,ga){fa[ga]=true;return fa;},{});for(var ea in k)k[ea].forEach(function(fa){if(fa.type==='img'){if(ca[ea])ba.TTI=Math.max(ba.TTI,fa.responseEnd);if(da[ea])ba.E2E=Math.max(ba.E2E,fa.responseEnd);}});return ba;},getMetrics:function x(y,z,aa,ba,ca,da){k={};if(c('isEmpty')(l))l=c('Bootloader').getURLToHashMap();r(k,y,z,aa,ba,ca,da);return k;}};f.exports=w;}),null);
__d('TimeSliceHelper',['LogBuffer','Map','ProfilingCounters','ReactSpeedHelper','sourceMetaToString'],(function a(b,c,d,e,f,g){var h=function o(p,q){return Math.round((p-q)*1000);},i={counterFunction:function o(p){return p.getNestedTotals();}};function j(o,p,q){var r=p.counterFunction,s=void 0;if(q.guard){var t=c('sourceMetaToString')(q),u=q.guard.toString();s=t?u+' at '+t:u;}else s=q.desc;var v=q.counters!=null?r(q.counters):null,w={begin:q.begin,end:q.end,name:s,id:q.id,counters:v,isEdgeContinuation:q.isEdgeContinuation};if(q.parentID&&q.parentID!==q.id)w.parentID=q.parentID;o.push(w);}function k(o,p,q){var r=p.counterFunction,s={begin:q.begin,end:q.end,name:'JS['+q.count+']',counters:r(c('ProfilingCounters').wrapInSingleContext(q.contextsToBeMerged))};o.push(s);}function l(o,p){var q=p.indirectParentID,r=p.id,s=p.isEdgeContinuation;if(q!=null){var t=o.get(q),u=void 0;s=s;if(t!=null){u={indirectParentID:t.indirectParentID,isEdgeContinuation:s&&t.isEdgeContinuation};}else u={indirectParentID:q,isEdgeContinuation:s};o.set(r,u);}}function m(o,p){var q=p.indirectParentID,r=p.isEdgeContinuation,s=p.id;if(q!=null&&q!==s){var t=o.get(q);if(t!=null){q=t.indirectParentID;r=t.isEdgeContinuation&&r;}return babelHelpers['extends']({},p,{parentID:q,isEdgeContinuation:r});}return p;}var n={formatMetricsForTransport:function o(p){var q=[],r=[],s=[],t=new (c('Map'))(),u=new (c('Map'))(),v=0,w=function y(z,aa,ba){var ca=void 0;if(aa.has(z)){ca=aa.get(z);}else{ca=ba.length;aa.set(z,ca);ba.push(z);}return ca;},x=[];if(p!=null)p.forEach(function(y){var z=y.begin,aa=y.end,ba=y.name,ca=y.id,da=y.counters,ea=y.parentID,fa=y.isEdgeContinuation,ga=h(z,v),ha=h(aa,z);v=aa;var ia=w(ba,t,q),ja=[ga,ha,ia],ka=da||{},la=Object.keys(ka).filter(function(pa){return ka[pa]!==0;}).sort(),ma=void 0;if(la.length>0){var na=la.join(),oa=w(na,u,s);ma=la.map(function(pa){return ka[pa];});ma.unshift(oa);}else ma=[];if(ca)ja.push(ca);if(ea){ja.push(ea);ja.push(fa);}x.push(ja);r.push(ma);});return {version:'compact',items:x,names:q,counters:r,counterSchemas:s};},getMetrics:function o(p,q,r,s,t){var u;if(t==null){t=i;}else t=babelHelpers['extends']({},i,t);var v=[],w=j.bind(undefined,v,t),x=k.bind(undefined,v,t),y=c('LogBuffer').read('time_slice'),z=c('LogBuffer').read('time_slice_heartbeat');if(y.length>0)(function(){var ja=Math.max.apply(null,y.map(function(ka){return ka.id;}));z.forEach(function(ka){return ka.id+=ja;});})();var aa=c('ReactSpeedHelper').getMetrics().map(function(ja){return babelHelpers['extends']({},ja,{desc:'React['+ja.name+']'});}),ba=y.concat(z,aa),ca=void 0,da=new (c('Map'))(),ea=l.bind(undefined,da),fa=m.bind(undefined,da),ga=function ja(){if(ca)if(ca.count>1){x(ca);}else w(fa(ca.first));ca=null;},ha=ba.sort(function(ja,ka){if(ja.begin!==ka.begin){return ja.begin-ka.begin;}else if(ja.end!==ka.end){return ja.end-ka.end;}else return 0;}).filter(function(ja){return (p==null||ja.end>=p)&&(q==null||ja.begin<=q);});if(ha.length>0&&!ha[0].representsExecution&&ha[0].begin<p){var ia=ha[0];ha[0]=babelHelpers['extends']({},ia,{begin:p});}ha.forEach(function(ja){if(ja.end-ja.begin<r){if(ca&&ja.begin-ca.end<s){ca.end=ja.end;ca.count++;if(ja.counters!=null)ca.contextsToBeMerged.push(ja.counters);if(ca.count===2)ea(ca.first);ea(ja);}else{ga();ca={begin:ja.begin,end:ja.end,count:1,first:ja,contextsToBeMerged:[]};}}else{ga();w(fa(ja));}});ga();return v;}};f.exports=n;}),null);
__d('PerfXFlusher',['invariant','Banzai'],(function a(b,c,d,e,f,g,h){var i='perfx_custom_logger_endpoint',j=['perfx_page','perfx_page_type','lid'];function k(m){j.forEach(function(n){return h(n in m,'PerfXFlusher: Field "%s" missing in the PerfX payload',n);});}var l={flush:function m(n){k(n);c('Banzai').post(i,n,{signal:true});},registerToSendWithBeacon:function m(n){c('Banzai').registerToSendWithBeacon(i,n);}};f.exports=l;}),null);
__d("pageLoadedViaSWCache",[],(function a(b,c,d,e,f,g){function h(){return self.__SW_CACHE__===1;}f.exports=h;}),null);
__d('PerfXLogger',['DataAttributeUtils','NavigationMetrics','NavigationTimingHelper','PerfXFlusher','Set','forEachObject','pageLoadedViaSWCache','performanceAbsoluteNow','setTimeoutAcrossTransitions'],(function a(b,c,d,e,f,g){var h={},i={},j=65*1000,k=['e2e','tti','all_pagelets_displayed','all_pagelets_loaded'],l={},m={_listenersSetUp:false,_setupListeners:function n(){if(this._listenersSetUp)return;this._subscribeToNavigationMetrics();c('PerfXFlusher').registerToSendWithBeacon(function(){var o=[];c('forEachObject')(h,function(p,q){if(!h[q].sent){var r=this.getPayload(q,'unload fired');if(r!=null)o.push(r);}}.bind(this));h={};return o;}.bind(this));this._listenersSetUp=true;},_init:function n(o){var p=o.lid;if(p==null)return;var q=i[p]||[];delete i[p];if(o.sw_controlled_tags){if(navigator.serviceWorker&&navigator.serviceWorker.controller)for(var r=0;r<o.sw_controlled_tags.length;r++)q.push(o.sw_controlled_tags[r]);delete o.sw_controlled_tags;}h[p]=babelHelpers['extends']({tags:new (c('Set'))(q),sent:false},o);this._registerTimeoutSendback(p);this._setupListeners();},initWithNavigationMetricsLID:function n(o,p){var q=c('NavigationMetrics').getFullPageLoadLid();if(!q)return;this._init(babelHelpers['extends']({},p,{lid:q}));if(o&&o.always)for(var r=0;r<o.always.length;r++)m.addTag(q,o.always[r]);if(o&&o.swCache&&c('pageLoadedViaSWCache')())for(var s=0;s<o.swCache.length;s++)m.addTag(q,o.swCache[s]);},init:function n(o,p){if(p!=null&&o.lid!=null)l[o.lid]=p;this._init(o);},addTag:function n(o,p){var q=h[o];if(q){q.tags.add(p);return;}if(!i[o])i[o]=[];i[o].push(p);},addTagWithNavigationMetricsLID:function n(o){var p=c('NavigationMetrics').getFullPageLoadLid();if(!p)return;m.addTag(p,o);},_registerTimeoutSendback:function n(o){var p=this._getFetchStart(o),q=j;if(p!=null)q-=c('performanceAbsoluteNow')()-p;c('setTimeoutAcrossTransitions')(function(){return this._uploadPayload(o,'sendback time out');}.bind(this),q);},_subscribeToNavigationMetrics:function n(){c('NavigationMetrics').addRetroactiveListener(c('NavigationMetrics').Events.EVENT_OCCURRED,function(o,p){if(!(o in h))return;if(k.includes(p.event)&&Object.prototype.hasOwnProperty.call(p,'timestamp')&&p.timestamp!=null){h[o][p.event]=p.timestamp;if(p.visibilityState)h[o][p.event+'_page_visibility']=p.visibilityState;}});c('NavigationMetrics').addRetroactiveListener(c('NavigationMetrics').Events.NAVIGATION_DONE,function(o,p){var q=p.serverLID;if(!(q in h))return;k.forEach(function(event){if(Object.prototype.hasOwnProperty.call(p,event)&&p[event]!=null)h[q][event]=p[event];});this._uploadPayload(q);}.bind(this));},_getPayloadWithOffset:function n(o,p,q){var r=h[o];if(r==null)return null;var s=Object.assign({},r),t=document.querySelector('[id^="hyperfeed_story_id"]');if(t){var u=JSON.parse(c('DataAttributeUtils').getDataFt(t));if(u)s.mf_query_id=u.qid;}s.tags=Array.from(r.tags);this._adjustValues(s,p);s.fetch_start=p;if(s.perfx_page_type==='normal'){var v=c('NavigationTimingHelper').getNavTimings();if(v!=null&&v.navigationStart!=null)s.nav_to_fetch=p-v.navigationStart;}if(q!=null)s.sendback_reason=q;delete s.sent;return s;},_uploadPayload:function n(o,p){if(h[o]!=null&&!h[o].sent){var q=this.getPayload(o,p);if(q!=null){c('PerfXFlusher').flush(q);h[o].sent=true;}}},getPayload:function n(o,p){return this._getPayloadWithOffset(o,this._getFetchStart(o),p);},_getFetchStart:function n(o){if(!(o in h))return null;var p=void 0,q=h[o].perfx_page_type;if(q=='quickling'){if(!(o in l)){return null;}else p=c('NavigationTimingHelper').getAsyncRequestTimings(l[o]);}else p=c('NavigationTimingHelper').getNavTimings();if(!p||!p.fetchStart)return null;return p.fetchStart;},_adjustValues:function n(o,p){k.forEach(function(q){if(Object.prototype.hasOwnProperty.call(o,q))o[q]-=p;});}};f.exports=m;}),null);