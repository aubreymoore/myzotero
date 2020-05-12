/*! 264-54-RELEASE 2017-07-24 */
!function(a,b){if(b.TRC=b.TRC||{},"object"==typeof a&&"function"==typeof a.now){var c=function(){};a.mark&&"function"==typeof a.mark||(a.mark=c),TRC.PerfEvenType={START:"start",STOP:"stop",MARK:"mark"},TRC.Performance=function(c){function d(a){var b=0;if(0==a.length)return b;for(var c=0;c<a.length;c++){var d=a.charCodeAt(c);b=(b<<5)-b+d,b&=b}return b}var e=c||{},f="tbl_"+Date.now()+"_",g=e.logTimer,h=e.logLength||40;this.counter=0,this.perfString="",this.timeout=null,this.modeEvents={},this.measurementIds=[],this.modeDictionery={},this.measurements=[],e.measures=e.measures||{},e.measures.generalMeasure_loaderLoaded=[f+"2.0",f+"measuring"],e.measures.generalMeasure_implLoaded=[f+"4.0",f+"measuring"],e.measures.generalMeasure_integration=["tbl_ic",f+"measuring"],this.logPerformance=function(){try{this.perfString.length>0&&TRC.modDebug&&!e.disableRawDataSend&&(TRC.modDebug.logMessageToServer(.5,this.perfString+";vi="+window.taboola_view_id),this.perfString="",this.counter=0)}catch(a){}},this.logMeasurements=function(){var b=[];if(a.getEntriesByName&&a.measure){a.mark(f+"measuring");var c=a.getEntriesByName(f+"measuring");if(0==c.length){if(!a.setResourceTimingBufferSize)return;a.setResourceTimingBufferSize(a.getEntries().length+100),a.mark(f+"measuring")}for(var d in e.measures)if(e.measures.hasOwnProperty(d)){var g=e.measures[d][0],h=e.measures[d][1];a.getEntriesByName(g).length>0&&a.getEntriesByName(h).length>0&&(a.measure(d,g,h),this.measurementIds.push(d))}for(var k in this.modeEvents)if(this.modeEvents.hasOwnProperty(k))for(var l in this.modeEvents[k])if(this.modeEvents[k].hasOwnProperty(l)){var m="modeMeasure_"+l+"_"+k,n=this.modeEvents[k][l];n.length>1?(a.measure(m,n[0],n[1]),this.measurementIds.push(m)):(a.measure(m,n[0],f+"measuring"),this.measurementIds.push(m))}var o;for(index=0;index<this.measurementIds.length;index++){o=this.measurementIds[index];var p=a.getEntriesByName(o),d=p[0];this.measurements.push(d)}b=a.getEntriesByType("navigation"),b.length>0&&(b=b[0],this.measurements.push({name:"generalMeasure_domInteractive",entryType:"measure",startTime:b.domInteractive,duration:0}),this.measurements.push({name:"generalMeasure_domContentLoadedEventEnd",entryType:"measure",startTime:b.domContentLoadedEventEnd,duration:0}),this.measurements.push({name:"generalMeasure_loadEventEnd",entryType:"measure",startTime:b.loadEventEnd,duration:0}),this.measurements.push({name:"generalMeasure_domComplete",entryType:"measure",startTime:b.domComplete,duration:0})),this.returnMeasueObj={};var q={};if(q.measurements=JSON.stringify(this.measurements),q.dict=JSON.stringify(this.modeDictionery),this.returnMeasueObj.cv=TRC.version||"",TRC.networkId&&(this.returnMeasueObj.networkId=TRC.networkId),TRCImpl&&TRCImpl.systemFlags&&TRCImpl.systemFlags.loaderType&&(this.returnMeasueObj.lt=TRCImpl.systemFlags.loaderType),this.returnMeasueObj.sd=TRC.pageManager.getPublisherValue(TRC.publisherId,"session-data"),this.returnMeasueObj.ri=i(),this.returnMeasueObj.vi=j(),this.returnMeasueObj.data=JSON.stringify(q),TRCImpl.logPostTrcEvent("perf",this.returnMeasueObj),TRC.__takeMeasureQueue.length>0){var r=TRC.__takeMeasureQueue.pop();return void r()}}},this.mark=function(b,c,i,j,k,l){var m=c||a.now(),n=f+b;if(a.mark(n),k){var o=d(i+j);switch(this.modeDictionery[o]=i+"~~@~~"+j,this.modeEvents[o]=this.modeEvents[o]||{},this.modeEvents[o][k]=this.modeEvents[o][k]||[],l){case TRC.PerfEvenType.START:this.modeEvents[o][k][0]=n;break;case TRC.PerfEvenType.STOP:this.modeEvents[o][k][1]=n;break;case TRC.PerfEvenType.MARK:this.modeEvents[o][k].push(n)}}this.perfString=this.perfString+";"+b+"="+m,this.counter++,this.counter>=h&&this.logPerformance(),e.logTimer&&TRC.Timeout&&(TRC.Timeout.clear(this.timeout),this.timeout=TRC.Timeout.set(this.logPerformance.trcBind(this),g))},window.addEventListener("beforeunload",this.logPerformance.bind(this));var i=function(){var a=b.TRCImpl&&b.TRCImpl.getGlobalRequestId.trcBind(b.TRCImpl);return a()},j=function(){return b.taboola_view_id||(b.taboola_view_id=(new Date).getTime()),b.taboola_view_id};if(e.measureEnable){TRC.__takeMeasureQueue=TRC.__takeMeasureQueue||[];var k=e.measureTimeToSend||0,l=this.logMeasurements.bind(this);if(TRC.__takeMeasureQueue.push(l),0==k)window.addEventListener("beforeunload",TRC.__takeMeasureQueue.pop());else if(1==TRC.__takeMeasureQueue.length){var m=TRC.__takeMeasureQueue.pop();this.measureTimeout=setTimeout(m,k)}}}}}(window.performance,window),function(a,b){function c(a,b){var c=ga+"//cdn.taboola.com/b/"+a+"/"+b+"/l/cs_all.js";D(c,{id:"p13nTag",forceInHead:!0,async:!0})}function d(a,b){var c,d=100;for(var e in a){if("*"===e){d=a[e];break}c=new RegExp(e),b.match(c)&&(d=a[e])}return d}function e(){return null!==Aa&&(fa=d(Aa,TRC.publisherId),za>fa)?(z(),TRC.pConsole("page","info","queue disabled!!! "),!0):!1}function f(){}function g(){for(;msg=na.shift();)switch(msg.notify){case"newPageLoad":TRC.reset()}}function h(a){for(var b,c=/^(.*\/libtrc\/.+\/)loader\.js(?:\?(.*))?$/,d=0;d<a.length;d++)(b=a[d].src.match(c))&&(TRC.baseDomain=b[1],TRC.pConsole("page","info","base domain set to : "+TRC.baseDomain))}function i(){for(var a;a=qa.shift();)switch(a.notify){case"videoPlay":this.preloadRequestLoader?!function(a){TRC.aspect.after(ia,"handleLoadResponse",function(){ia.playVideo(a)},!0)}(a):ia.playVideo(a);break;case"videoDone":try{TRC.dispatch("videoDone",a)}catch(b){ia.error("Problem in videoDone",b)}}}function j(a,b,c){var d=a.split(b);return d.slice(0,c-1).concat(d.length>=c?d.slice(c-1).join(b):[])}function k(a){var b,c=[{key:"?",index:0},{key:"://",index:1},{key:"//",index:1},{key:"/",index:0}],d=0,e=c.length,f=a;for(d;e>d;d++)b=j(f,c[d].key,2),f=b.length>1?b[c[d].index]:b[0];return f}function l(){if(oa=null,!pa||ba.global["enable-multi-pv3"])pa=!0,ia.loadRBox.apply(ia,ma),ma=[],(f=i)();else for(;ma.length;)ia.pollTillContainerAvailable(ma.shift())}function m(){}function n(){return ma.length?wa?(wa=!1,void l()):(null!=oa&&TRC.Timeout.clear(oa),void(oa=TRC.Timeout.set(l,ia.trcRequestDelay))):wa=!1}function o(){var a;for(ta.push=function(a){TRC.EventsAPI.listen(a.listenTo,a.handler)};ta.length;)a=ta.shift(),TRC.EventsAPI.listen(a.listenTo,a.handler)}function p(){}function q(){TRC.eventDelegator.subscribe("user_id_ready",r)}function r(){try{s.call(null,ra)}catch(a){TRC.pConsole("errors","error","error in handleSocials",a.message)}}function s(a){for(var b;b=a.shift();)ia.sendEvent("social",{st:b.name,"unescape-d":encodeURIComponent(__trcJSONify({data:b.val}))},null,!1,null,null)}function t(){}function u(){TRC.eventDelegator.subscribe("user_id_ready",v)}function v(){try{w.call(null,sa)}catch(a){TRC.pConsole("errors","error","error in handleP13n",a.message)}}function w(a){for(var b;b=a.shift();)ia.sendEvent("p13n",{"unescape-d":encodeURIComponent(__trcJSONify(b.val))},null,!1,null,null)}function x(a,b){var c,d,e=!0;try{a.modes[b]&&(d=a.modes[b]["visibility-constraints"],d&&"object"==typeof d&&TRC.ignoreVisibilityConstraints!==!0&&(c=window.innerWidth||document.body.clientWidth,(d.minWidth&&c<d.minWidth||d.maxWidth&&c>d.maxWidth)&&(e=!1,TRC.pConsole("page","info","Mode '"+b+"' will not be displayed due to visibility constraints",d,"object"))))}catch(f){TRC.pConsole("page","error","Error while evaluating visibility constraints of mode '"+b+"': "+f.message)}return e}function y(){TRC.asManager=new TRC.AdServerManager(ba.global["vv-config"],TRC.version),TRC.asManager.startVV().then(function(){TRC.asManager.run()})}function z(){xa=[]}function A(a){return TRC.implLoaded?void TRC.trcReady():void(la||(C(a),TRC.performance&&TRC.performance.mark("3.0"),TRC.utm.push((new Date).getTime()-TRC.utm.start),TRC.pConsole("page","debug","loading impl file : '"+a+"'")))}function B(){TRC.AdServerManager||(TRC.VVReady=y,C("vv."+TRC.version+".js"))}function C(a){var c=ba.global["use-loader-host"]?k(TRC.baseDomain):null,d=c||"cdn.taboola.com",e=b.getElementsByTagName("script");la=b.createElement("script"),e.length&&e[0].parentNode.insertBefore(la,e[0]),la.charset="UTF-8",la.type="text/javascript",la.src=ga+"//"+d+"/libtrc/"+a}function D(a,c){var d=b.getElementsByTagName("script"),e=b.getElementsByTagName("head"),f=b.createElement("script");c&&c.async?f.setAttribute("async",""):f.setAttribute("defer",""),c&&c.id&&(f.id=c.id),f.src=a,c&&c.forceInHead&&"head"!==d[0].parentNode.nodeName.toLocaleLowerCase()?e[0].appendChild(f):d[0].parentNode.insertBefore(f,d[0]),TRC.pConsole("page","debug","loading : "+f.src)}function E(){if(ja.length){for(var a,b,c;a=ja.shift();)for(var d in a)"onclick"==d?xa.onclick=a[d]:va[d]=a[d];b=P("taboola_impl_file",["impl","impl.thin"]),c=b?b+"."+TRC.version+".js":'impl.'+TRC.version+".js",A(c)}}function F(){g(),E(),m(),f(),p(),t()}function G(){window._taboola.push({listenTo:"nocontent",handler:function(){window.context.noContentAvailable()}}),window.context.observeIntersection(function(a){a.forEach(function(a){window._taboola.push({intersection:!0,rects:a,placement:window.context.data.placement}),TRC.lastVisibleRects?a.time>TRC.lastVisibleRects.time&&(TRC.lastVisibleRects=a):TRC.lastVisibleRects=a})})}function H(b){var c,d;M(b)||(N(b),b.mode?(TRC.pConsole("page","info","push to '_taboola' - mode : "+b.mode,b,"object"),b.framework&&(ja.push({framework:b.framework}),"amp"===b.framework&&G()),x(ba,b.mode)&&ma.push(b)):b.listenTo&&"function"==typeof b.handler?ta.push(b):b.notify?"newPageLoad"==b.notify?(TRC.pConsole("page","info","push to '_taboola' - notification : newPageLoad"),S(),na.push(b)):qa.push(b):b.name&&-1!==b.name.indexOf("p13n-")?sa.push(b):(c=L(b))?ra.push({name:c,val:b[c]}):b.nextDaisyChain?K(b.nextDaisyChain):(b.intersection||b.visible)&&b.placement?ua.push({event:"visible::"+b.placement,rects:b.rects}):(d=O("taboolax-load",a.location),(ba.global["inject-taboolax"]||d)&&!Ga&&R(b)&&(Fa=d?Ea[d]:Fa,Ga=!0,$(Fa)),b.template&&void 0===TRC.pageTemplate&&(TRC.pageTemplate=b.template),ja.push(b)),b.flush&&(wa=!0))}function I(a){TRC.dispatch(a.event,a.rects)}function J(a,b){var c;for(a.push=b;c=a.shift();)b(c)}function K(a){var b="";"string"==typeof a?ia.preloadRequest&&ia.preloadRequest[a]?(TRC.pConsole("page","info","push to '_taboola' - nextDaisyChain : "+a),ia.preloadRequest[a].dc.renderAd()):b=a:b="non recognized value",b&&(window.__trcError?__trcError("unrecognized nextDaisyChain : "+b):TRC.pConsole("page","error","unrecognized nextDaisyChain : "+a))}function L(a){try{for(var b in a)if(0==b.indexOf("social-")&&a.hasOwnProperty(b))return b}catch(c){}return null}function M(a){return a.throttle_pub?("object"==typeof a.throttle_pub&&(Aa=a.throttle_pub),!0):!1}function N(a){var b;try{if(!a.onrender)return;TRC.eventDelegator?b=TRC.eventDelegator.subscribe:(TRC.subscriptionRegister=[],b=function(a,b,c,d){TRC.subscriptionRegister.push({event:a,handler:b,container:d})}),b("onrender",a.onrender,a.container?Q(a.container):null)}catch(c){__trcError&&__trcError("extractSubscription",c)}}function O(a,b){var c,d,e=b.search.substr(1).split(/&/);for(d=0;d<e.length;d++)if(c=e[d].split(new RegExp("="),2),c[0]==a)return c[1];return null}function P(b,c){for(var d=O(b,a.location),e=0;e<c.length;e++)if(c[e]===d)return d;return null}function Q(a){return"string"==typeof a?a:msg.container.id||"trc_cont_ "+parseInt(1e4*Math.random())}function R(b){var c;for(c in b)if(Ca.hasOwnProperty(c))return a[Da]=Ca[c],Ca[c];return null}function S(){ma=[],ja=[],qa=[],na=[],ra=[]}function T(a){if(a){TRC._taboolaClone.length>50&&(TRC._taboolaClone=[]),TRC._taboolaClone.push(a);for(var b=0;b<arguments.length;b++)if(a=arguments[b],TRC.pConsole("page","debug","push to '_taboola'",a,"object"),a instanceof Array)for(var c=0;c<a.length;c++)H(a[c]);else H(a);return F(),arguments.length}}function U(){var b;ba.global["inject-comscore"]&&(a._comscore=a._comscore||[],D(("https:"==ga?"https://sb":"http://b")+".scorecardresearch.com/beacon.js",{async:!0}),b={c1:"7",c2:"13739933",c3:"20121515121"},a._comscore.push(b),TRC.pConsole("page","info","injected comsocre",b,"object"))}function V(){var a="getRTUS";try{ba.global["enable-criteo-uid"]&&X()&&(W(a),D("//gum.criteo.com/sync?c=72&r=2&j=TRC."+a,{async:!0}),TRC.pConsole("page","info","injected RTUS service"))}catch(b){}}function W(a){var b=++ca;TRC.rtbUserIds=TRC.rtbUserIds||{},TRC.rtbUserIds["_"+b]={source:"cr"},TRC[a]=function(a){try{a&&a.userid&&TRC.rtbUserIds["_"+b]&&(TRC.rtbUserIds["_"+b].ui=a.userid)}catch(c){}},setTimeout(function(){try{TRC&&TRC.rtbUserIds&&(delete TRC.rtbUserIds["_"+b],TRC[a]=function(){})}catch(c){}},36e5)}function X(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}function Y(){ba.global["inject-mdotlabs"]&&(D("//tags.mdotlabs.com/tracking.php?siteID=tBjQ&customUserValue="+TRC.publisherId,{async:!0}),TRC.pConsole("page","info","injected mdotlabs publisher id:"+TRC.publisherId))}function Z(){TRC.useStorageDetection=ba.global&&ba.global["use-storage-detection"]===!0?!0:!1}function $(a){D(a+"/"+TRC.publisherId+"/load.js",{async:!0}),TRC.pConsole("page","info","injected taboola-x with publisher id : "+TRC.publisherId)}function _(a,b,c){(c||a&&b&&b.traffic)&&(c||b.traffic>100*Math.random())&&(TRC.performance=new TRC.Performance(b))}function aa(){if(Z(),h(b.getElementsByTagName("script")),xa=a[ha]=a[ha]||[],!xa.registered){for(xa.push=T,xa.registered=!0;xa.length;)T(xa.shift());ba.global["enable-cross-check"]&&D(Ba,{async:!0}),U(),Y(),V(),ba.global["enable-visit-value"]&&B()}}if(!a.TRC||!a.TRC.utm){a.TRC?TRC.utm=[]:TRC={utm:[]};var ba={"modes":{"ab_organic-thumbnails-b_control":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
   if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for(var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';

            if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');

                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }
        for(i = 0; i < data.boxes.length; i++) {

                data.boxes[i].className += ' item_' + (i + 1);

                ///change date
                var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000);
                var trc_elm = itemsContainer.childNodes[i].childNodes[1];
                var elems = trc_elm.getElementsByTagName('*'), i;
                var a;
                for (a in elems){
                        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                                elems[a].innerHTML = timeSince(date) + ' ago';
                        }

                        function timeSince(date) {
                                var seconds = Math.floor((new Date() - date) / 1000);
                                var interval = Math.floor(seconds / 31536000);
                                if (interval > 1) {
                                        return interval + ' years';
                                }
                                interval = Math.floor(seconds / 2592000);
                                if (interval > 1) {
                                        return interval + ' months';
                                }
                                interval = Math.floor(seconds / 86400);
                                if (interval > 1) {
                                        return interval + ' days';
                                }
                                interval = Math.floor(seconds / 3600);
                                if (interval > 1) {
                                        return interval + ' hours';
                                }
                                interval = Math.floor(seconds / 60);
                                if (interval > 1) {
                                        return interval + ' minutes';
                                }
                                return Math.floor(seconds) + ' seconds';
                        }
                }

                var publish_date = data.response.trc['video-list'].video[i]['published-date'];
                var category = data.response.trc['video-list'].video[i]['category'];
                var branding = data.response.trc['video-list'].video[i]['branding-text'];
                var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
                
             /*   if ((publish_date && category)  && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                        //item has both publish date and category
                        var spacer = document.createElement('em');
                        spacer.innerHTML = ' | ';
                        itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);
          
                }*/
          
        }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) { 
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];                    
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680244","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":2,"cells":10,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_organic-thumbnails-b_stream":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
   if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for(var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';
            if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');
                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }
        for(i = 0; i < data.boxes.length; i++) {
                data.boxes[i].className += ' item_' + (i + 1);
                ///change date
                var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000);
                var trc_elm = itemsContainer.childNodes[i].childNodes[1];
                var elems = trc_elm.getElementsByTagName('*'), i;
                var a;
                for (a in elems){
                        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                                elems[a].innerHTML = timeSince(date) + ' ago';
                        }
                        function timeSince(date) {
                                var seconds = Math.floor((new Date() - date) / 1000);
                                var interval = Math.floor(seconds / 31536000);
                                if (interval > 1) {
                                        return interval + ' years';
                                }
                                interval = Math.floor(seconds / 2592000);
                                if (interval > 1) {
                                        return interval + ' months';
                                }
                                interval = Math.floor(seconds / 86400);
                                if (interval > 1) {
                                        return interval + ' days';
                                }
                                interval = Math.floor(seconds / 3600);
                                if (interval > 1) {
                                        return interval + ' hours';
                                }
                                interval = Math.floor(seconds / 60);
                                if (interval > 1) {
                                        return interval + ' minutes';
                                }
                                return Math.floor(seconds) + ' seconds';
                        }
                }
                var publish_date = data.response.trc['video-list'].video[i]['published-date'];
                var category = data.response.trc['video-list'].video[i]['category'];
                var branding = data.response.trc['video-list'].video[i]['branding-text'];
                var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
             /*   if ((publish_date && category)  && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                        //item has both publish date and category
                        var spacer = document.createElement('em');
                        spacer.innerHTML = ' | ';
                        itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);
                }*/
        }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) { 
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];                    
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7673056","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":6,"cells":1,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_organic-thumbnails-e_feed-title-below":{"component-id":"rbox-blended","tabbed":false,"header":"No Header","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Add Time *****/
    try {
	    for(i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].className += ' item_' + (i + 1);
		    ///change date
		    var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000),
		    	trc_elm = itemsContainer.childNodes[i].childNodes[1],
		    	elems = trc_elm.getElementsByTagName('*'),
		    	i, a;
		    for (a in elems){
		        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
		        	elems[a].innerHTML = timeSince(date) + ' ago';
		        }
		        function timeSince(date) {
	                var seconds = Math.floor((new Date() - date) / 1000);
	                var interval = Math.floor(seconds / 31536000);
	                if (interval > 1) {
	                    return interval + ' years';
	                }
	                interval = Math.floor(seconds / 2592000);
	                if (interval > 1) {
	                    return interval + ' months';
	                }
	                interval = Math.floor(seconds / 86400);
	                if (interval > 1) {
	                    return interval + ' days';
	                }
	                interval = Math.floor(seconds / 3600);
	                if (interval > 1) {
	                    return interval + ' hours';
	                }
	                interval = Math.floor(seconds / 60);
	                if (interval > 1) {
	                    return interval + ' minutes';
	                }
	                return Math.floor(seconds) + ' seconds';
		        }
			}
		}
		var publish_date = data.response.trc['video-list'].video[i]['published-date'];
		var category = data.response.trc['video-list'].video[i]['category'];
		var branding = data.response.trc['video-list'].video[i]['branding-text'];
		var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
    }
	catch(e) {
	}
    /****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	/***** Add Category *****/
	try {
		if (!data.category) {
			data.category = 'USA TODAY';
		}
		if (data.category) {
			var categoryList = window.TRC.categoryList,
                data_category_list = data.category.split(';'),
                hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i],
                    	category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category]) {
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                    }
                }
			hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category]) {
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            }
            else {
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        }
    	return data;
		}
	catch(e) {
	}
	/****************************/
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":true,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_organic-thumbnails-fa_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":"Recommended For You","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,description,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Add Time *****/
    try {
	    for(i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].className += ' item_' + (i + 1);
		    ///change date
		    var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000),
		    	trc_elm = itemsContainer.childNodes[i].childNodes[1],
		    	elems = trc_elm.getElementsByTagName('*'),
		    	i, a;
		    for (a in elems){
		        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
		        	elems[a].innerHTML = timeSince(date) + ' ago';
		        }
		        function timeSince(date) {
	                var seconds = Math.floor((new Date() - date) / 1000);
	                var interval = Math.floor(seconds / 31536000);
	                if (interval > 1) {
	                    return interval + ' years';
	                }
	                interval = Math.floor(seconds / 2592000);
	                if (interval > 1) {
	                    return interval + ' months';
	                }
	                interval = Math.floor(seconds / 86400);
	                if (interval > 1) {
	                    return interval + ' days';
	                }
	                interval = Math.floor(seconds / 3600);
	                if (interval > 1) {
	                    return interval + ' hours';
	                }
	                interval = Math.floor(seconds / 60);
	                if (interval > 1) {
	                    return interval + ' minutes';
	                }
	                return Math.floor(seconds) + ' seconds';
		        }
			}
		}
		var publish_date = data.response.trc['video-list'].video[i]['published-date'];
		var category = data.response.trc['video-list'].video[i]['category'];
		var branding = data.response.trc['video-list'].video[i]['branding-text'];
		var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
    }
	catch(e) {
	}
    /****************************/
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  (data['header']).getElementsByClassName('trc_rbox_header_span')[0],
    		itemTitle = (data['recommendationList'][0])['title'],
    		isMobile = navigator.userAgent.match(/(iPhone|iPod|Android.*Mobile|IEMobile.*|BlackBerry|BB10|Opera\sMini)/i);
    	if (isMobile) {
    		targetContainer.className += ' feed_mobile';
    	}
    	if (currentHeader && itemTitle) {
    		var currentHeaderParent =  currentHeader.parentNode;
	    	//Set title as Header
	    	currentHeader.innerHTML = itemTitle;
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	/***** Add Category *****/
	try {
		if (!data.category) {
			data.category = 'USA TODAY';
		}
		if (data.category) {
			var categoryList = window.TRC.categoryList,
                data_category_list = data.category.split(';'),
                hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i],
                    	category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category]) {
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                    }
                }
			hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category]) {
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            }
            else {
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        }
    	return data;
		}
	catch(e) {
	}
	/****************************/
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,description,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_organic-thumbnails-fb_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":"Recommended For You","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Add Time *****/
    try {
	    for(i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].className += ' item_' + (i + 1);
		    ///change date
		    var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000),
		    	trc_elm = itemsContainer.childNodes[i].childNodes[1],
		    	elems = trc_elm.getElementsByTagName('*'),
		    	i, a;
		    for (a in elems){
		        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
		        	elems[a].innerHTML = timeSince(date) + ' ago';
		        }
		        function timeSince(date) {
	                var seconds = Math.floor((new Date() - date) / 1000);
	                var interval = Math.floor(seconds / 31536000);
	                if (interval > 1) {
	                    return interval + ' years';
	                }
	                interval = Math.floor(seconds / 2592000);
	                if (interval > 1) {
	                    return interval + ' months';
	                }
	                interval = Math.floor(seconds / 86400);
	                if (interval > 1) {
	                    return interval + ' days';
	                }
	                interval = Math.floor(seconds / 3600);
	                if (interval > 1) {
	                    return interval + ' hours';
	                }
	                interval = Math.floor(seconds / 60);
	                if (interval > 1) {
	                    return interval + ' minutes';
	                }
	                return Math.floor(seconds) + ' seconds';
		        }
			}
		}
		var publish_date = data.response.trc['video-list'].video[i]['published-date'];
		var category = data.response.trc['video-list'].video[i]['category'];
		var branding = data.response.trc['video-list'].video[i]['branding-text'];
		var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
    }
	catch(e) {
	}
    /****************************/
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  targetContainer.getElementsByClassName('trc_rbox_header_span')[0],
			currentHeaderParent;
    	if (currentHeader) {
    		currentHeaderParent =  currentHeader.parentNode;
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	/***** Add Category *****/
	try {
		if (!data.category) {
			data.category = 'USA TODAY';
		}
		if (data.category) {
			var categoryList = window.TRC.categoryList,
                data_category_list = data.category.split(';'),
                hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i],
                    	category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category]) {
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                    }
                }
			hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category]) {
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            }
            else {
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        }
    	return data;
		}
	catch(e) {
	}
	/****************************/
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674160","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":1,"h":1},"rows":1,"cells":4,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_organic-thumbnails-f_feed-title-below":{"component-id":"rbox-blended","tabbed":false,"header":"No Header","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Add Time *****/
    try {
	    for(i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].className += ' item_' + (i + 1);
		    ///change date
		    var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000),
		    	trc_elm = itemsContainer.childNodes[i].childNodes[1],
		    	elems = trc_elm.getElementsByTagName('*'),
		    	i, a;
		    for (a in elems){
		        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
		        	elems[a].innerHTML = timeSince(date) + ' ago';
		        }
		        function timeSince(date) {
	                var seconds = Math.floor((new Date() - date) / 1000);
	                var interval = Math.floor(seconds / 31536000);
	                if (interval > 1) {
	                    return interval + ' years';
	                }
	                interval = Math.floor(seconds / 2592000);
	                if (interval > 1) {
	                    return interval + ' months';
	                }
	                interval = Math.floor(seconds / 86400);
	                if (interval > 1) {
	                    return interval + ' days';
	                }
	                interval = Math.floor(seconds / 3600);
	                if (interval > 1) {
	                    return interval + ' hours';
	                }
	                interval = Math.floor(seconds / 60);
	                if (interval > 1) {
	                    return interval + ' minutes';
	                }
	                return Math.floor(seconds) + ' seconds';
		        }
			}
		}
		var publish_date = data.response.trc['video-list'].video[i]['published-date'];
		var category = data.response.trc['video-list'].video[i]['category'];
		var branding = data.response.trc['video-list'].video[i]['branding-text'];
		var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
    }
	catch(e) {
	}
    /****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	/***** Add Category *****/
	try {
		if (!data.category) {
			data.category = 'USA TODAY';
		}
		if (data.category) {
			var categoryList = window.TRC.categoryList,
                data_category_list = data.category.split(';'),
                hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i],
                    	category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category]) {
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                    }
                }
			hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category]) {
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            }
            else {
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        }
    	return data;
		}
	catch(e) {
	}
	/****************************/
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674160","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":1,"h":1},"rows":1,"cells":4,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":true,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-a_control":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7673056","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-a_feed":{"component-id":"rbox-blended","tabbed":false,"header":"","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
	if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":null,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-a_feed-border":{"component-id":"rbox-blended","tabbed":false,"header":"","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
	if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":null,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-a_feed-title-below":{"component-id":"rbox-blended","tabbed":false,"header":"","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
	if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":null,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-a_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":"","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
	if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":null,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-b_abp-mode":{"component-id":"rbox-blended","tabbed":false,"header":"SPONSOR CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7796304","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-fa_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":"Trending Ad Content","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  targetContainer.getElementsByClassName('trc_rbox_header_span')[0],
			currentHeaderParent;
		if (currentHeader) {
			currentHeaderParent =  currentHeader.parentNode;
	    	//Add header icon
			var pubIconImg = '//cdn.taboola.com/static/d0/d07b304c-6546-48cd-adc9-08771d79b35a.gif',
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','taboola-icon');
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 22px 20px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":2,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-fb_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":"Trending Ad Content","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  targetContainer.getElementsByClassName('trc_rbox_header_span')[0],
			currentHeaderParent;
		if (currentHeader) {
			currentHeaderParent =  currentHeader.parentNode;
	    	//Add header icon
			var pubIconImg = '//cdn.taboola.com/static/d0/d07b304c-6546-48cd-adc9-08771d79b35a.gif',
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','taboola-icon');
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 22px 20px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-feed-l_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';
    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');
        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13150537","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-feed-mobile_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":"","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
	if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":null,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-feed-r_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';
    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');
        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13150537","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-f_smart-ellipsis":{"component-id":"rbox-blended","tabbed":false,"header":"MORE FROM THE WEB","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7731339","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{minWidth:0,margin:{v:2,h:2},rows:2,cells:1,virtualThumbWidth:1,virtualThumbHeight:1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-g_abp-mode":{"component-id":"rbox-blended","tabbed":false,"header":"SPONSOR CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if (TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for (var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';

            if ((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');

                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }

    /*******Add individual class name according to browser*******/
    var targetContainer = data.container._trc_container;

    if (TRC.Browser.ie) {
        targetContainer.className += ' trc_ie' + TRC.Browser.ie;
    } else if (TRC.Browser.chrome) {
        targetContainer.className += ' trc_chrome';
    } else if (TRC.Browser.firefox) {
        targetContainer.className += ' trc_ff';
    } else if (TRC.Browser.safari) {
        targetContainer.className += ' trc_safari';
    }
    /*************************/


	/*** inject text-links ***/
	if (data) {
    var currentContainer = data.container;
    var currentContainerParent = data.container.parentNode;
    var newContainerDiv = document.createElement('div');
    if (currentContainer && currentContainerParent && newContainerDiv) {
        newContainerDiv.id = 'taboola-section-front-text-links';
        newContainerDiv.style.borderTop = 'none';
        newContainerDiv.style.paddingTop = '0';
        currentContainer.style.borderBottom = 'none';
        currentContainer.style.paddingBottom = '0';
        currentContainerParent.insertBefore(newContainerDiv, currentContainer.nextSibling);
        window._taboola = window._taboola || [];
        _taboola.push({
            mode: 'text-links-a',
            container: 'taboola-section-front-text-links',
            placement: 'Section Front Text Links',
            target_type: 'mix'
        });
    }
}
}
,"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) { 
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];                    
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7646288","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":false,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-h_bp":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11788553","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-h_feed":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7645314","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-h_smart-ellipsis":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7645314","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-i_bp":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11788382","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-j_bp":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11788497","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-j_feed":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7645314","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3.5,"h":3.5},"rows":3,"cells":2,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-j_smart-ellipsis":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7645314","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3.5,"h":3.5},"rows":3,"cells":2,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-k_bp":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11788267","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-l_feed":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7646041","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-l_smart-ellipsis":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7646041","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-l_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';
    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');
        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13150537","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-n_feed-title-below":{"component-id":"rbox-blended","tabbed":false,"header":"Trending on The Web","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":true,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-r_feed":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';
    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');
        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13150537","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_thumbnails-r_updated-feed":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';
    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');
        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13150537","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"alternating-thumbnails-e":{"component-id":"rbox-blended","tabbed":false,"header":"FROM OUR PARTNERS","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"10611712","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"maxWidth":459,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":460,"maxWidth":539,"margin":{"v":2,"h":2},"rows":1,"cells":2,"virtualThumbWidth":6,"virtualThumbHeight":5},{"minWidth":540,"maxWidth":727,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5},{"minWidth":728,"maxWidth":789,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5},{"minWidth":790,"maxWidth":869,"margin":{"v":2,"h":2},"rows":1,"cells":2,"virtualThumbWidth":6,"virtualThumbHeight":5},{"minWidth":870,"margin":{"v":2,"h":2},"rows":1,"cells":4,"virtualThumbWidth":6,"virtualThumbHeight":5}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"organic-thumbnails-b":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
   if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for(var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';
            if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');
                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }
        for(i = 0; i < data.boxes.length; i++) {
                data.boxes[i].className += ' item_' + (i + 1);
                ///change date
                var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000);
                var trc_elm = itemsContainer.childNodes[i].childNodes[1];
                var elems = trc_elm.getElementsByTagName('*'), i;
                var a;
                for (a in elems){
                        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                                elems[a].innerHTML = timeSince(date) + ' ago';
                        }
                        function timeSince(date) {
                                var seconds = Math.floor((new Date() - date) / 1000);
                                var interval = Math.floor(seconds / 31536000);
                                if (interval > 1) {
                                        return interval + ' years';
                                }
                                interval = Math.floor(seconds / 2592000);
                                if (interval > 1) {
                                        return interval + ' months';
                                }
                                interval = Math.floor(seconds / 86400);
                                if (interval > 1) {
                                        return interval + ' days';
                                }
                                interval = Math.floor(seconds / 3600);
                                if (interval > 1) {
                                        return interval + ' hours';
                                }
                                interval = Math.floor(seconds / 60);
                                if (interval > 1) {
                                        return interval + ' minutes';
                                }
                                return Math.floor(seconds) + ' seconds';
                        }
                }
                var publish_date = data.response.trc['video-list'].video[i]['published-date'];
                var category = data.response.trc['video-list'].video[i]['category'];
                var branding = data.response.trc['video-list'].video[i]['branding-text'];
                var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
             /*   if ((publish_date && category)  && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                        //item has both publish date and category
                        var spacer = document.createElement('em');
                        spacer.innerHTML = ' | ';
                        itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);
                }*/
        }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":6,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"organic-thumbnails-b_stream-amp":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
   if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for(var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';
            if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');
                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }
        for(i = 0; i < data.boxes.length; i++) {
                data.boxes[i].className += ' item_' + (i + 1);
                ///change date
                var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000);
                var trc_elm = itemsContainer.childNodes[i].childNodes[1];
                var elems = trc_elm.getElementsByTagName('*'), i;
                var a;
                for (a in elems){
                        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                                elems[a].innerHTML = timeSince(date) + ' ago';
                        }
                        function timeSince(date) {
                                var seconds = Math.floor((new Date() - date) / 1000);
                                var interval = Math.floor(seconds / 31536000);
                                if (interval > 1) {
                                        return interval + ' years';
                                }
                                interval = Math.floor(seconds / 2592000);
                                if (interval > 1) {
                                        return interval + ' months';
                                }
                                interval = Math.floor(seconds / 86400);
                                if (interval > 1) {
                                        return interval + ' days';
                                }
                                interval = Math.floor(seconds / 3600);
                                if (interval > 1) {
                                        return interval + ' hours';
                                }
                                interval = Math.floor(seconds / 60);
                                if (interval > 1) {
                                        return interval + ' minutes';
                                }
                                return Math.floor(seconds) + ' seconds';
                        }
                }
                var publish_date = data.response.trc['video-list'].video[i]['published-date'];
                var category = data.response.trc['video-list'].video[i]['category'];
                var branding = data.response.trc['video-list'].video[i]['branding-text'];
                var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
             /*   if ((publish_date && category)  && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                        //item has both publish date and category
                        var spacer = document.createElement('em');
                        spacer.innerHTML = ' | ';
                        itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);
                }*/
        }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7673056","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":6,"cells":1,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":false,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"organic-thumbnails-d":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7809780","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"organic-thumbnails-e":{"component-id":"rbox-blended","tabbed":false,"header":"Recommended For You","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,description,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Add Time *****/
    try {
	    for(i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].className += ' item_' + (i + 1);
		    ///change date
		    var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000),
		    	trc_elm = itemsContainer.childNodes[i].childNodes[1],
		    	elems = trc_elm.getElementsByTagName('*'),
		    	i, a;
		    for (a in elems){
		        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
		        	elems[a].innerHTML = timeSince(date) + ' ago';
		        }
		        function timeSince(date) {
	                var seconds = Math.floor((new Date() - date) / 1000);
	                var interval = Math.floor(seconds / 31536000);
	                if (interval > 1) {
	                    return interval + ' years';
	                }
	                interval = Math.floor(seconds / 2592000);
	                if (interval > 1) {
	                    return interval + ' months';
	                }
	                interval = Math.floor(seconds / 86400);
	                if (interval > 1) {
	                    return interval + ' days';
	                }
	                interval = Math.floor(seconds / 3600);
	                if (interval > 1) {
	                    return interval + ' hours';
	                }
	                interval = Math.floor(seconds / 60);
	                if (interval > 1) {
	                    return interval + ' minutes';
	                }
	                return Math.floor(seconds) + ' seconds';
		        }
			}
		}
		var publish_date = data.response.trc['video-list'].video[i]['published-date'];
		var category = data.response.trc['video-list'].video[i]['category'];
		var branding = data.response.trc['video-list'].video[i]['branding-text'];
		var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
    }
	catch(e) {
	}
    /****************************/
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  (data['header']).getElementsByClassName('trc_rbox_header_span')[0],
    		itemTitle = (data['recommendationList'][0])['title'];
    	if (currentHeader && itemTitle) {
    		var currentHeaderParent =  currentHeader.parentNode;
	    	//Set title as Header
	    	currentHeader.innerHTML = itemTitle;
	    	//Add header icon
			var pubIconImg,
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','pub-icon');
			if (TRC.publisherId === 'gannettcompany-indystar') {
				pubIconImg = '//cdn.taboola.com/static/68/68234ab9-fcac-4b24-b676-f7477cd629d5.jpeg';
			}
			else if (TRC.publisherId === 'gannettcompany-coloradoan') {
				pubIconImg = '//cdn.taboola.com/static/af/af78c73c-f951-4713-9851-25c9a0fb6a1c.jpg';
			}
			else if (TRC.publisherId === 'gannettcompany-courierpostonline') {
				pubIconImg = '//cdn.taboola.com/static/df/dfc9e34d-45fc-4037-a35e-2bdcaa749e92.png';
			}
			else if (TRC.publisherId === 'gannettcompany-greenville') {
				pubIconImg = '//cdn.taboola.com/static/94/947d5ee4-6bb2-4bb4-b197-489e4a629933.jpg';
			}
			else {
				pubIconImg = '//cdn.taboola.com/static/1a/1afa0269-b214-470b-b264-b92e10aa45a9.png';
			}
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 28px 28px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	/***** Add Category *****/
	try {
		if (!data.category) {
			data.category = 'USA TODAY';
		}
		if (data.category) {
			var categoryList = window.TRC.categoryList,
                data_category_list = data.category.split(';'),
                hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i],
                    	category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category]) {
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                    }
                }
			hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category]) {
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            }
            else {
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        }
    	return data;
		}
	catch(e) {
	}
	/****************************/
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,description,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":true,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"organic-thumbnails-f":{"component-id":"rbox-blended","tabbed":false,"header":"Recommended For You","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Add Time *****/
    try {
	    for(i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].className += ' item_' + (i + 1);
		    ///change date
		    var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000),
		    	trc_elm = itemsContainer.childNodes[i].childNodes[1],
		    	elems = trc_elm.getElementsByTagName('*'),
		    	i, a;
		    for (a in elems){
		        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
		        	elems[a].innerHTML = timeSince(date) + ' ago';
		        }
		        function timeSince(date) {
	                var seconds = Math.floor((new Date() - date) / 1000);
	                var interval = Math.floor(seconds / 31536000);
	                if (interval > 1) {
	                    return interval + ' years';
	                }
	                interval = Math.floor(seconds / 2592000);
	                if (interval > 1) {
	                    return interval + ' months';
	                }
	                interval = Math.floor(seconds / 86400);
	                if (interval > 1) {
	                    return interval + ' days';
	                }
	                interval = Math.floor(seconds / 3600);
	                if (interval > 1) {
	                    return interval + ' hours';
	                }
	                interval = Math.floor(seconds / 60);
	                if (interval > 1) {
	                    return interval + ' minutes';
	                }
	                return Math.floor(seconds) + ' seconds';
		        }
			}
		}
		var publish_date = data.response.trc['video-list'].video[i]['published-date'];
		var category = data.response.trc['video-list'].video[i]['category'];
		var branding = data.response.trc['video-list'].video[i]['branding-text'];
		var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
    }
	catch(e) {
	}
    /****************************/
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  targetContainer.getElementsByClassName('trc_rbox_header_span')[0],
			currentHeaderParent;
    	if (currentHeader) {
    		currentHeaderParent =  currentHeader.parentNode;
	    	//Add header icon
			var pubIconImg,
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','pub-icon');
			if (TRC.publisherId === 'gannettcompany-indystar') {
				pubIconImg = '//cdn.taboola.com/static/68/68234ab9-fcac-4b24-b676-f7477cd629d5.jpeg';
			}
			else if (TRC.publisherId === 'gannettcompany-coloradoan') {
				pubIconImg = '//cdn.taboola.com/static/af/af78c73c-f951-4713-9851-25c9a0fb6a1c.jpg';
			}
			else if (TRC.publisherId === 'gannettcompany-courierpostonline') {
				pubIconImg = '//cdn.taboola.com/static/df/dfc9e34d-45fc-4037-a35e-2bdcaa749e92.png';
			}
			else if (TRC.publisherId === 'gannettcompany-greenville') {
				pubIconImg = '//cdn.taboola.com/static/94/947d5ee4-6bb2-4bb4-b197-489e4a629933.jpg';
			}
			else {
				pubIconImg = '//cdn.taboola.com/static/1a/1afa0269-b214-470b-b264-b92e10aa45a9.png';
			}
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 28px 28px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	/***** Add Category *****/
	try {
		if (!data.category) {
			data.category = 'USA TODAY';
		}
		if (data.category) {
			var categoryList = window.TRC.categoryList,
                data_category_list = data.category.split(';'),
                hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i],
                    	category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category]) {
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                    }
                }
			hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category]) {
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            }
            else {
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        }
    	return data;
		}
	catch(e) {
	}
	/****************************/
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674160","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":1,"h":1},"rows":1,"cells":4,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":true,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"organic-thumbnails-fa":{"component-id":"rbox-blended","tabbed":false,"header":"Recommended For You","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,description,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Add Time *****/
    try {
	    for(i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].className += ' item_' + (i + 1);
		    ///change date
		    var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000),
		    	trc_elm = itemsContainer.childNodes[i].childNodes[1],
		    	elems = trc_elm.getElementsByTagName('*'),
		    	i, a;
		    for (a in elems){
		        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
		        	elems[a].innerHTML = timeSince(date) + ' ago';
		        }
		        function timeSince(date) {
	                var seconds = Math.floor((new Date() - date) / 1000);
	                var interval = Math.floor(seconds / 31536000);
	                if (interval > 1) {
	                    return interval + ' years';
	                }
	                interval = Math.floor(seconds / 2592000);
	                if (interval > 1) {
	                    return interval + ' months';
	                }
	                interval = Math.floor(seconds / 86400);
	                if (interval > 1) {
	                    return interval + ' days';
	                }
	                interval = Math.floor(seconds / 3600);
	                if (interval > 1) {
	                    return interval + ' hours';
	                }
	                interval = Math.floor(seconds / 60);
	                if (interval > 1) {
	                    return interval + ' minutes';
	                }
	                return Math.floor(seconds) + ' seconds';
		        }
			}
		}
		var publish_date = data.response.trc['video-list'].video[i]['published-date'];
		var category = data.response.trc['video-list'].video[i]['category'];
		var branding = data.response.trc['video-list'].video[i]['branding-text'];
		var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
    }
	catch(e) {
	}
    /****************************/
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  (data['header']).getElementsByClassName('trc_rbox_header_span')[0],
    		itemTitle = (data['recommendationList'][0])['title'],
    		isMobile = navigator.userAgent.match(/(iPhone|iPod|Android.*Mobile|IEMobile.*|BlackBerry|BB10|Opera\sMini)/i);
    	if (!isMobile) {
    		targetContainer.className += ' feed_desktop';
    	}
    	if (currentHeader && itemTitle) {
    		var currentHeaderParent =  currentHeader.parentNode;
	    	//Set title as Header
	    	currentHeader.innerHTML = itemTitle;
	    	//Add header icon
			var pubIconImg,
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','pub-icon');
			if (TRC.publisherId === 'gannettcompany-indystar') {
				pubIconImg = '//cdn.taboola.com/static/68/68234ab9-fcac-4b24-b676-f7477cd629d5.jpeg';
			}
			else if (TRC.publisherId === 'gannettcompany-coloradoan') {
				pubIconImg = '//cdn.taboola.com/static/af/af78c73c-f951-4713-9851-25c9a0fb6a1c.jpg';
			}
			else if (TRC.publisherId === 'gannettcompany-courierpostonline') {
				pubIconImg = '//cdn.taboola.com/static/df/dfc9e34d-45fc-4037-a35e-2bdcaa749e92.png';
			}
			else if (TRC.publisherId === 'gannettcompany-greenville') {
				pubIconImg = '//cdn.taboola.com/static/94/947d5ee4-6bb2-4bb4-b197-489e4a629933.jpg';
			}
			else {
				pubIconImg = '//cdn.taboola.com/static/1a/1afa0269-b214-470b-b264-b92e10aa45a9.png';
			}
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 28px 28px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	/***** Add Category *****/
	try {
		if (!data.category) {
			data.category = 'USA TODAY';
		}
		if (data.category) {
			var categoryList = window.TRC.categoryList,
                data_category_list = data.category.split(';'),
                hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i],
                    	category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category]) {
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                    }
                }
			hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category]) {
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            }
            else {
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        }
    	return data;
		}
	catch(e) {
	}
	/****************************/
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,description,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"organic-thumbnails-fb":{"component-id":"rbox-blended","tabbed":false,"header":"Recommended For You","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Add Time *****/
    try {
	    for(i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].className += ' item_' + (i + 1);
		    ///change date
		    var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000),
		    	trc_elm = itemsContainer.childNodes[i].childNodes[1],
		    	elems = trc_elm.getElementsByTagName('*'),
		    	i, a;
		    for (a in elems){
		        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
		        	elems[a].innerHTML = timeSince(date) + ' ago';
		        }
		        function timeSince(date) {
	                var seconds = Math.floor((new Date() - date) / 1000);
	                var interval = Math.floor(seconds / 31536000);
	                if (interval > 1) {
	                    return interval + ' years';
	                }
	                interval = Math.floor(seconds / 2592000);
	                if (interval > 1) {
	                    return interval + ' months';
	                }
	                interval = Math.floor(seconds / 86400);
	                if (interval > 1) {
	                    return interval + ' days';
	                }
	                interval = Math.floor(seconds / 3600);
	                if (interval > 1) {
	                    return interval + ' hours';
	                }
	                interval = Math.floor(seconds / 60);
	                if (interval > 1) {
	                    return interval + ' minutes';
	                }
	                return Math.floor(seconds) + ' seconds';
		        }
			}
		}
		var publish_date = data.response.trc['video-list'].video[i]['published-date'];
		var category = data.response.trc['video-list'].video[i]['category'];
		var branding = data.response.trc['video-list'].video[i]['branding-text'];
		var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
    }
	catch(e) {
	}
    /****************************/
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  targetContainer.getElementsByClassName('trc_rbox_header_span')[0],
			currentHeaderParent;
    	if (currentHeader) {
    		currentHeaderParent =  currentHeader.parentNode;
	    	//Add header icon
			var pubIconImg,
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','pub-icon');
			if (TRC.publisherId === 'gannettcompany-indystar') {
				pubIconImg = '//cdn.taboola.com/static/68/68234ab9-fcac-4b24-b676-f7477cd629d5.jpeg';
			}
			else if (TRC.publisherId === 'gannettcompany-coloradoan') {
				pubIconImg = '//cdn.taboola.com/static/af/af78c73c-f951-4713-9851-25c9a0fb6a1c.jpg';
			}
			else if (TRC.publisherId === 'gannettcompany-courierpostonline') {
				pubIconImg = '//cdn.taboola.com/static/df/dfc9e34d-45fc-4037-a35e-2bdcaa749e92.png';
			}
			else if (TRC.publisherId === 'gannettcompany-greenville') {
				pubIconImg = '//cdn.taboola.com/static/94/947d5ee4-6bb2-4bb4-b197-489e4a629933.jpg';
			}
			else {
				pubIconImg = '//cdn.taboola.com/static/1a/1afa0269-b214-470b-b264-b92e10aa45a9.png';
			}
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 28px 28px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	/***** Add Category *****/
	try {
		if (!data.category) {
			data.category = 'USA TODAY';
		}
		if (data.category) {
			var categoryList = window.TRC.categoryList,
                data_category_list = data.category.split(';'),
                hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i],
                    	category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category]) {
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                    }
                }
			hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category]) {
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            }
            else {
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        }
    	return data;
		}
	catch(e) {
	}
	/****************************/
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674160","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":1,"h":1},"rows":1,"cells":4,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"text-links-a":{"component-id":"rbox-blended","tabbed":false,"header":"No Header","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box, data) {
/*	    var winWidth = -1,
        winHeight = -1;

        function resizeVideoBox() {
                if(box.labelsBox.firstChild) {
                        box.labelsBox.firstChild.innerHTML = box.video_data['title'];
                }
                box.fixTextOverflow(true);
        }

        TRC.dom.on(window, 'resize', function (e) {
                /* IE8 and below has a few issues with window resize. First, it can go into infinite loop due to resize event being called on children resize as well, so we need to check
                   if window dimensions has changed and only if so, call the function. Second issue, is that it will give incorrect dimensions in the calculation unless we use setTimeout() */
/*              if(TRC.Browser.ieUpto(8)) {
                        if(document.documentElement.clientWidth != winWidth || document.documentElement.clientHeight != winHeight) {
                                setTimeout(function() {
                                        resizeVideoBox();
                                        winWidth = document.documentElement.clientWidth;
                                        winHeight = document.documentElement.clientHeight;

                                });
                        }
                }else{
                        resizeVideoBox();
                }
        });

    if (TRC.widgetCreatorPreview && jQuery) {
            jQuery(window).on('videoCubeChange', resizeVideoBox);
    }

    if(box.rbox.boxes.length >= box.rbox.recommendationList.length/2) {
            box.className += ' rightCol';
    }
*/
}
,"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"none","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){return s;},"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template-text-links","widget-creator-revision":"8251431","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"maxWidth":960,"margin":{"v":2,"h":2},"rows":2,"cells":2},{"minWidth":961,"margin":{"v":2,"h":2},"rows":4,"cells":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":495,"min-width-for-attribution":625,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":false,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-a":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
	if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":null,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":7,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-a-amp":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
	if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":null,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":7,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":3,"virtualThumbHeight":2}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-b":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7796304","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":1,"cells":6,"virtualThumbWidth":6,"virtualThumbHeight":5},{"minWidth":2,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-c":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7741636","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":1,"cells":4,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-d":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7741581","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":1,"cells":4,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-e":{"component-id":"rbox-blended","tabbed":false,"header":"Ad Content","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13618466","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":3,"virtualThumbHeight":2}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-f":{"component-id":"rbox-blended","tabbed":false,"header":"MORE FROM THE WEB","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7731339","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{minWidth:0,margin:{v:2,h:2},rows:2,cells:1,virtualThumbWidth:1,virtualThumbHeight:1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-fa":{"component-id":"rbox-blended","tabbed":false,"header":"Trending on The Web","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  targetContainer.getElementsByClassName('trc_rbox_header_span')[0],
			currentHeaderParent;
		if (currentHeader) {
			currentHeaderParent =  currentHeader.parentNode;
	    	//Add header icon
			var pubIconImg = '//cdn.taboola.com/static/d0/d07b304c-6546-48cd-adc9-08771d79b35a.gif',
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','taboola-icon');
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 22px 20px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":2,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-fb":{"component-id":"rbox-blended","tabbed":false,"header":"Trending on The Web","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  targetContainer.getElementsByClassName('trc_rbox_header_span')[0],
			currentHeaderParent;
		if (currentHeader) {
			currentHeaderParent =  currentHeader.parentNode;
	    	//Add header icon
			var pubIconImg = '//cdn.taboola.com/static/d0/d07b304c-6546-48cd-adc9-08771d79b35a.gif',
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','taboola-icon');
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 22px 20px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-feed-l":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7646041","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-feed-mobile":{"component-id":"rbox-blended","tabbed":false,"header":"","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
	if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":null,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7680361","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":200,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-feed-r":{"component-id":"rbox-blended","tabbed":false,"header":".","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';
    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');
        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13150537","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"top","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-g":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if (TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for (var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';

            if ((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');

                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }

    /*******Add individual class name according to browser*******/
    var targetContainer = data.container._trc_container;

    if (TRC.Browser.ie) {
        targetContainer.className += ' trc_ie' + TRC.Browser.ie;
    } else if (TRC.Browser.chrome) {
        targetContainer.className += ' trc_chrome';
    } else if (TRC.Browser.firefox) {
        targetContainer.className += ' trc_ff';
    } else if (TRC.Browser.safari) {
        targetContainer.className += ' trc_safari';
    }
    /*************************/


	/*** inject text-links ***/
	if (data) {
    var currentContainer = data.container;
    var currentContainerParent = data.container.parentNode;
    var newContainerDiv = document.createElement('div');
    if (currentContainer && currentContainerParent && newContainerDiv) {
        newContainerDiv.id = 'taboola-section-front-text-links';
        newContainerDiv.style.borderTop = 'none';
        newContainerDiv.style.paddingTop = '0';
        currentContainer.style.borderBottom = 'none';
        currentContainer.style.paddingBottom = '0';
        currentContainerParent.insertBefore(newContainerDiv, currentContainer.nextSibling);
        window._taboola = window._taboola || [];
        _taboola.push({
            mode: 'text-links-a',
            container: 'taboola-section-front-text-links',
            placement: 'Section Front Text Links',
            target_type: 'mix'
        });
    }
}
}
,"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) { 
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];                    
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7646288","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-h":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7645314","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-i":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES:","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
 if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for(var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';

            if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');

                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }
        for(i = 0; i < data.boxes.length; i++) {

                data.boxes[i].className += ' item_' + (i + 1);


                ///change date
                var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000);
                var trc_elm = itemsContainer.childNodes[i].childNodes[1];
                var elems = trc_elm.getElementsByTagName('*'), i;
                var a;
                for (a in elems){
                        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                                elems[a].innerHTML = timeSince(date) + ' ago';
                        }

                        function timeSince(date) {
                                var seconds = Math.floor((new Date() - date) / 1000);
                                var interval = Math.floor(seconds / 31536000);
                                if (interval > 1) {
                                        return interval + ' years';
                                }
                                interval = Math.floor(seconds / 2592000);
                                if (interval > 1) {
                                        return interval + ' months';
                                }
                                interval = Math.floor(seconds / 86400);
                                if (interval > 1) {
                                        return interval + ' days';
                                }
                                interval = Math.floor(seconds / 3600);
                                if (interval > 1) {
                                        return interval + ' hours';
                                }
                                interval = Math.floor(seconds / 60);
                                if (interval > 1) {
                                        return interval + ' minutes';
                                }
                                return Math.floor(seconds) + ' seconds';
                        }
                }

                var publish_date = data.response.trc['video-list'].video[i]['published-date'];
                var category = data.response.trc['video-list'].video[i]['category'];
                var branding = data.response.trc['video-list'].video[i]['branding-text'];
                var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
                if ((publish_date && category)  && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                        //item has both publish date and category
                        var spacer = document.createElement('em');
                        spacer.innerHTML = ' | ';
                        itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);

                        //set color of category
            var categoryLower = category.toLowerCase();
            if ( (categoryLower == 'sports') || (categoryLower == 'for the win') || (categoryLower == 'high school sports') || (categoryLower == 'action sports') || (categoryLower == 'ad meter') || (categoryLower == 'basketball') || (categoryLower == 'bowling') || (categoryLower == 'boxing') || (categoryLower == 'cycling') || (categoryLower == 'college') || (categoryLower == 'baseball') || (categoryLower == 'columnist') || (categoryLower == 'fantasy') || (categoryLower == 'gaming') || (categoryLower == 'golf') || (categoryLower == 'highschool') || (categoryLower == 'hockey') || (categoryLower == 'horseracing') || (categoryLower == 'horses') || (categoryLower == 'mlb') || (categoryLower == 'mls') || (categoryLower == 'motor') || (categoryLower == 'nascar') || (categoryLower == 'nba') || (categoryLower == 'ncaab') || (categoryLower == 'ncaaf') || (categoryLower == 'ncaaw') || (categoryLower == 'nfl') || (categoryLower == 'nhl') || (categoryLower == 'wnba') || (categoryLower == 'olympics') || (categoryLower == 'poker') || (categoryLower == 'preps') || (categoryLower == 'recruiting') || (categoryLower == 'sailing') || (categoryLower == 'soccer') || (categoryLower == 'tennis') || (categoryLower == 'ufc') ) {
                categoryContainer.style.color = '#b81800';
            }
            else if (categoryLower == 'life' ) {
                categoryContainer.style.color = '#9600b4';
            }
            else if ( (categoryLower == 'tech') || (categoryLower == 'game on') ) {
                categoryContainer.style.color = '#fa6600';
            }
            else if ( (categoryLower == 'travel') || (categoryLower == 'cruise log') ) {
                categoryContainer.style.color = '#00c3c3';
            }
            else if (categoryLower == 'opinion' ) {
                categoryContainer.style.color = '#666';
            }
            else if (categoryLower == 'weather') {
                 categoryContainer.style.color = '#ffc000';
            }
            else if (categoryLower == 'money') {
                 categoryContainer.style.color = '#00a53c';
            }
                      }
                if (branding){
                        itemsContainer.childNodes[i].childNodes[1].innerHTML += '<div class=\'trc_sy_icon\'></div>';
                }
        }

/*******Add individual class name according to browser*******/
var targetContainer = data.container._trc_container;

if (TRC.Browser.ie) { targetContainer.className += ' trc_ie' + TRC.Browser.ie; }
else if (TRC.Browser.chrome) { targetContainer.className += ' trc_chrome'; }
else if (TRC.Browser.firefox) { targetContainer.className += ' trc_ff'; }
else if (TRC.Browser.safari) { targetContainer.className += ' trc_safari'; }
/*************************/

},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	if (! data.category){
		var categoryDisplay = document.querySelector("meta[property='og:site_name']").content;
		if (typeof categoryDisplay !== 'undefined'){
			data.category = categoryDisplay;}
		else{
			data.category = '';
		}

	}
	if (data.category) { 
		var categoryList = window.TRC.categoryList;
		var data_category_list = data.category.split(';');
		var hight_prioraty_category;
		for(var i=0; i<data_category_list.length; i++){
			var category = data_category_list[i];
			var category_list = (category.split('//')) ? category.split('//') : category;
			category = category_list[category_list.length-1];                    
			if(categoryList[category])
				hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
		}
		hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];

		if(!categoryList[hight_prioraty_category])
			data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
		else
			data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
	}
	return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7645821","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":false,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-j":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7645314","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3.5,"h":3.5},"rows":3,"cells":2,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-k":{"component-id":"rbox-blended","tabbed":false,"header":"MORE STORIES","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
 if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for(var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';

            if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');

                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }
        for(i = 0; i < data.boxes.length; i++) {

                data.boxes[i].className += ' item_' + (i + 1);


                ///change date
                var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000);
                var trc_elm = itemsContainer.childNodes[i].childNodes[1];
                var elems = trc_elm.getElementsByTagName('*'), i;
                var a;
                for (a in elems){
                        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                                elems[a].innerHTML = timeSince(date) + ' ago';
                        }

                        function timeSince(date) {
                                var seconds = Math.floor((new Date() - date) / 1000);
                                var interval = Math.floor(seconds / 31536000);
                                if (interval > 1) {
                                        return interval + ' years';
                                }
                                interval = Math.floor(seconds / 2592000);
                                if (interval > 1) {
                                        return interval + ' months';
                                }
                                interval = Math.floor(seconds / 86400);
                                if (interval > 1) {
                                        return interval + ' days';
                                }
                                interval = Math.floor(seconds / 3600);
                                if (interval > 1) {
                                        return interval + ' hours';
                                }
                                interval = Math.floor(seconds / 60);
                                if (interval > 1) {
                                        return interval + ' minutes';
                                }
                                return Math.floor(seconds) + ' seconds';
                        }
                }

                var publish_date = data.response.trc['video-list'].video[i]['published-date'];
                var category = data.response.trc['video-list'].video[i]['category'];
                var branding = data.response.trc['video-list'].video[i]['branding-text'];
                var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
                if ((publish_date && category)  && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                        //item has both publish date and category
                        var spacer = document.createElement('em');
                        spacer.innerHTML = ' | ';
                        itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);

                        //set color of category
            var categoryLower = category.toLowerCase();
            if ( (categoryLower == 'sports') || (categoryLower == 'nfl') ||  (categoryLower == 'ncaaf') || (categoryLower == 'mlb') || (categoryLower == 'nba') || (categoryLower == 'nascar') || (categoryLower == 'ufc') || (categoryLower == 'nhl') || (categoryLower == 'ncaab') || (categoryLower == 'mls') || (categoryLower == 'mma') || (categoryLower == 'wnba') || (categoryLower == 'ftw') ) {
                categoryContainer.style.color = '#b81800';
            }
            else if (categoryLower == 'life' ) {
                categoryContainer.style.color = '#9600b4';
            }
            else if ( (categoryLower == 'tech') || (categoryLower == 'game on') ) {
                categoryContainer.style.color = '#fa6600';
            }
            else if ( (categoryLower == 'travel') || (categoryLower == 'cruise log') ) {
                categoryContainer.style.color = '#00c3c3';
            }
            else if (categoryLower == 'opinion' ) {
                categoryContainer.style.color = '#666';
            }
            else if (categoryLower == 'weather') {
                 categoryContainer.style.color = '#ffc000';
            }
            else if (categoryLower == 'money') {
                 categoryContainer.style.color = '#00a53c';
            }
                      }
                if (branding){
                        itemsContainer.childNodes[i].childNodes[1].innerHTML += '<div class=\'trc_sy_icon\'></div>';
                }
        }

/*******Add individual class name according to browser*******/
var targetContainer = data.container._trc_container;

if (TRC.Browser.ie) { targetContainer.className += ' trc_ie' + TRC.Browser.ie; }
else if (TRC.Browser.chrome) { targetContainer.className += ' trc_chrome'; }
else if (TRC.Browser.firefox) { targetContainer.className += ' trc_ff'; }
else if (TRC.Browser.safari) { targetContainer.className += ' trc_safari'; }
/*************************/

},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
		var categoryDisplay = document.querySelector("meta[property='og:site_name']").content;
		if (typeof categoryDisplay !== 'undefined'){
			data.category = categoryDisplay;}
		else{
			data.category = '';
		}

	}
if (data.category) { 
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];                    
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7645821","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":2,"virtualThumbWidth":185,"virtualThumbHeight":140}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":false,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-l":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7646041","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-m":{"component-id":"rbox-blended","tabbed":false,"header":"LOCAL SPORTS","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
 if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for(var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';

            if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');

                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }
        for(i = 0; i < data.boxes.length; i++) {

                data.boxes[i].className += ' item_' + (i + 1);

                ///change date
                var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000);
                var trc_elm = itemsContainer.childNodes[i].childNodes[1];
                var elems = trc_elm.getElementsByTagName('*'), i;
                var a;
                for (a in elems){
                        if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                                elems[a].innerHTML = timeSince(date) + ' ago';
                        }

                        function timeSince(date) {
                                var seconds = Math.floor((new Date() - date) / 1000);
                                var interval = Math.floor(seconds / 31536000);
                                if (interval > 1) {
                                        return interval + ' years';
                                }
                                interval = Math.floor(seconds / 2592000);
                                if (interval > 1) {
                                        return interval + ' months';
                                }
                                interval = Math.floor(seconds / 86400);
                                if (interval > 1) {
                                        return interval + ' days';
                                }
                                interval = Math.floor(seconds / 3600);
                                if (interval > 1) {
                                        return interval + ' hours';
                                }
                                interval = Math.floor(seconds / 60);
                                if (interval > 1) {
                                        return interval + ' minutes';
                                }
                                return Math.floor(seconds) + ' seconds';
                        }
                }

                var publish_date = data.response.trc['video-list'].video[i]['published-date'];
                var category = data.response.trc['video-list'].video[i]['category'];
                var branding = data.response.trc['video-list'].video[i]['branding-text'];
                var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1];
                
                if ((publish_date && category)  && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                        //item has both publish date and category
                        var spacer = document.createElement('em');
                        spacer.innerHTML = ' | ';
                        itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);

                        //set color of category
            var categoryLower = category.toLowerCase();
            if ( (categoryLower == 'sports') || (categoryLower == 'for the win') || (categoryLower == 'high school sports') || (categoryLower == 'action sports') || (categoryLower == 'ad meter') || (categoryLower == 'basketball') || (categoryLower == 'bowling') || (categoryLower == 'boxing') || (categoryLower == 'cycling') || (categoryLower == 'college') || (categoryLower == 'baseball') || (categoryLower == 'columnist') || (categoryLower == 'fantasy') || (categoryLower == 'gaming') || (categoryLower == 'golf') || (categoryLower == 'highschool') || (categoryLower == 'hockey') || (categoryLower == 'horseracing') || (categoryLower == 'horses') || (categoryLower == 'mlb') || (categoryLower == 'mls') || (categoryLower == 'motor') || (categoryLower == 'nascar') || (categoryLower == 'nba') || (categoryLower == 'ncaab') || (categoryLower == 'ncaaf') || (categoryLower == 'ncaaw') || (categoryLower == 'nfl') || (categoryLower == 'nhl') || (categoryLower == 'wnba') || (categoryLower == 'olympics') || (categoryLower == 'poker') || (categoryLower == 'preps') || (categoryLower == 'recruiting') || (categoryLower == 'sailing') || (categoryLower == 'soccer') || (categoryLower == 'tennis') || (categoryLower == 'ufc') ) {
                categoryContainer.style.color = '#F00';
            }
            else if (categoryLower == 'life' ) {
                categoryContainer.style.color = '#9600b4';
            }
            else if ( (categoryLower == 'tech') || (categoryLower == 'game on') ) {
                categoryContainer.style.color = '#fa6600';
            }
            else if ( (categoryLower == 'travel') || (categoryLower == 'cruise log') ) {
                categoryContainer.style.color = '#00c3c3';
            }
            else if (categoryLower == 'opinion' ) {
                categoryContainer.style.color = '#666';
            }
            else if (categoryLower == 'weather') {
                 categoryContainer.style.color = '#ffc000';
            }
            else if (categoryLower == 'money') {
                 categoryContainer.style.color = '#00a53c';
            }
                }
                if (branding){
                        itemsContainer.childNodes[i].childNodes[1].innerHTML += '<div class=\'trc_sy_icon\'></div>';
                }
          
        }

/*******Add individual class name according to browser*******/
var targetContainer = data.container._trc_container;

if (TRC.Browser.ie) { targetContainer.className += ' trc_ie' + TRC.Browser.ie; }
else if (TRC.Browser.chrome) { targetContainer.className += ' trc_chrome'; }
else if (TRC.Browser.firefox) { targetContainer.className += ' trc_ff'; }
else if (TRC.Browser.safari) { targetContainer.className += ' trc_safari'; }
/*************************/

},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
		var categoryDisplay = document.querySelector("meta[property='og:site_name']").content;
		if (typeof categoryDisplay !== 'undefined'){
			data.category = categoryDisplay;}
		else{
			data.category = '';
		}

	}
if (data.category) { 
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];                    
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7645986","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":false,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-n":{"component-id":"rbox-blended","tabbed":false,"header":"Trending on The Web","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
		for(var i = 0; i < data.boxes.length; i++) {
		    data.boxes[i].style.height = 'auto';
	    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
			var clearDiv = document.createElement('div');
	        	clearDiv.style.clear = 'both';
		        clearDiv.style.width = '100%';
		    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
		    }
		}
    }
    /***** Lazy Loading Feed *****/
    try {
		var targetContainer = data.container._trc_container,
			currentHeader =  targetContainer.getElementsByClassName('trc_rbox_header_span')[0],
			currentHeaderParent;
		if (currentHeader) {
			currentHeaderParent =  currentHeader.parentNode;
	    	//Add header icon
			var pubIconImg = '//cdn.taboola.com/static/d0/d07b304c-6546-48cd-adc9-08771d79b35a.gif',
				pubIcon = document.createElement('span');
			pubIcon.setAttribute('class','taboola-icon');
			pubIcon.style.background = 'url("' + pubIconImg + '") center center / 22px 20px no-repeat';
			currentHeaderParent.insertBefore(pubIcon, currentHeader);
		}
	}
	catch(e) {
	}
	/****************************/
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"11674101","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,virtualThumbWidth:16,virtualThumbHeight:9}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":460,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":true,"expand-animation-duration":0,"expand-animation-max-height":1500,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"#article-top-part","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":true,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-o":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';
    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');
        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13150537","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-p":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"start","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"none","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"14749859","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":8,"virtualThumbHeight":8}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":false,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-q-abp":{"component-id":"rbox-blended","tabbed":false,"header":"You May Like","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';

    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');

        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"12501185","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-r":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if(TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
	for(var i = 0; i < data.boxes.length; i++) {
	    data.boxes[i].style.height = 'auto';
    	    if((i % (data.boxes.length / data.rows) == 0) && i != 0) {
		var clearDiv = document.createElement('div');
        	clearDiv.style.clear = 'both';
	        clearDiv.style.width = '100%';
	    	itemsContainer.insertBefore(clearDiv, data.boxes[i]);
	    }
	}
    }
},"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"13150537","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"none","adchoice-target-url":"","read-more-box-selector":"null","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"thumbnails-s":{"component-id":"rbox-blended","tabbed":false,"header":"AD CONTENT","expandable":false,"list-size":10,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"6","thumbnail-height":"5","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {
    if (TRCImpl && TRCImpl.modes[data.mode_name] && !TRCImpl.modes[data.mode_name]['mode-is-responsive']) {
        for (var i = 0; i < data.boxes.length; i++) {
            data.boxes[i].style.height = 'auto';
            if ((i % (data.boxes.length / data.rows) == 0) && i != 0) {
                var clearDiv = document.createElement('div');
                clearDiv.style.clear = 'both';
                clearDiv.style.width = '100%';
                itemsContainer.insertBefore(clearDiv, data.boxes[i]);
            }
        }
    }
    /*******Add individual class name according to browser*******/
    var targetContainer = data.container._trc_container;
    if (TRC.Browser.ie) {
        targetContainer.className += ' trc_ie' + TRC.Browser.ie;
    } else if (TRC.Browser.chrome) {
        targetContainer.className += ' trc_chrome';
    } else if (TRC.Browser.firefox) {
        targetContainer.className += ' trc_ff';
    } else if (TRC.Browser.safari) {
        targetContainer.className += ' trc_safari';
    }
    /*************************/
	/*** inject text-links ***/
	if (data) {
    var currentContainer = data.container;
    var currentContainerParent = data.container.parentNode;
    var newContainerDiv = document.createElement('div');
    if (currentContainer && currentContainerParent && newContainerDiv) {
        newContainerDiv.id = 'taboola-homepage-text-links';
        newContainerDiv.style.borderTop = 'none';
        newContainerDiv.style.paddingTop = '0';
        currentContainer.style.borderBottom = 'none';
        currentContainer.style.paddingBottom = '0';
        currentContainerParent.insertBefore(newContainerDiv, currentContainer.nextSibling);
        window._taboola = window._taboola || [];
        _taboola.push({
            mode: 'text-links-a',
            container: 'taboola-homepage-text-links',
            placement: 'Homepage Text Links',
            target_type: 'mix'
        });
    }
}
}
,"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"top","thumbnail-position":"top","color-scheme":"White","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-position":"start","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
if (! data.category){
            		data.category = 'USA TODAY';
      }
if (data.category) {
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
},"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":2,"widget-creator-layout":"autowidget-template-static","widget-creator-revision":"7646288","details-inline-with-title":"","mode-is-responsive":true,"responsive-extra-columns":1,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":true,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"video-horizontalx5":{"component-id":"rbox-blended","tabbed":false,"header":"VIDEOS YOU MIGHT BE INTERESTED IN","expandable":false,"list-size":4,"orientation":"horizontal","navigation-type":"paging","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"97","thumbnail-height":"74","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,duration","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"");}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url+(url.search("\\?")>0?"&":"?")+"odyssey=mod|tvideo|article";},"list-suffix":
function(internalc,myorigin) {
    var box = window.TRCImpl.boxes[internalc.id.split('internal_')[1]];
    (function(){            
            return new window.TRC.GoogleAds(box,"4888143574",null,"ca-pub-2194040235099739");
        })().draw([125,125],[125,125],20,false);
        //box.element.parentNode.className += ' vad_v2';
}
,"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data);},"title":"Related Videos","format-title":'%s',"format-duration":function(dur){
    var hours = parseInt(dur / 3600);
    if (hours >= 1)
        dur = dur % 3600;
    else
        hours = 0;var min = parseInt(dur / 60);
    var sec = parseInt(dur % 60);
    if (typeof hours != 'number' || typeof min != 'number' || typeof sec != 'number' || isNaN(hours) || isNaN(min)|| isNaN(sec) || dur < 1)
        return '';
    return '('+(hours >= 1 ? (hours + 'h') : '') + min + 'm' + sec+'s'+')';
},"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n);},"format-rating":'Rating: %s',"format-published-date":function(published_date){
var publish_date = new Date(parseInt(published_date) * 1000);
        var Months = {'1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec'};
        var publish_date_year = publish_date.getFullYear();
        var publish_date_month = publish_date.getMonth() + 1;
        var publish_date_days = publish_date.getDate();
        if (publish_date_days < 10)
                publish_date_days = '0' + publish_date_days;
        return  Months[publish_date_month] + '. ' + publish_date_days + ', ' + publish_date_year;
}
,"sponsored-location":"thumbnail-top","thumbnail-position":"top","color-scheme":"custom","pager-button-style":"<span class=\"pager-cont\">&lt;</span>|<span class=\"pager-cont\">&gt;</span>","pager-position":"header","pager-type-style":"numbers","template":"Default","pager-button-location":"pager","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title,url","layout-template":"custom","style-template":"custom","attribution-position":"top","shade-scroll":true,"attribution-text":"<span style=\"color:#777777;font-weight:bold;\">by <span style=\"color:#777777;font-weight:bold;\">Taboola</span></span>","required-attributes":"none","auto-advance-animation":"down","auto-advance":"-1","format-external-data":'%s',"item-data-filter":function(data) {
	if (data.category) {
		var categoryList = window.TRC.categoryList;
		var data_category_list = data.category.split(';');
		var high_priority_category;
        	for(var i=0; i<data_category_list.length; i++){
        		var category = data_category_list[i];
        		var category_list = (category.split('//')) ? category.split('//') : category;
                category = category_list[category_list.length-1];                    
                if(categoryList[category])
                	high_priority_category = (!high_priority_category)?category:((categoryList[high_priority_category]['index']>categoryList[category]['index'])?category:high_priority_category);
                }
            high_priority_category = (high_priority_category)?high_priority_category:data_category_list[0];
            
            if(!categoryList[high_priority_category])
               data.category = high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            else
               data.category = (categoryList[high_priority_category]['name'])?categoryList[high_priority_category]['name']:((0<=categoryList[high_priority_category]['index']<13)?high_priority_category.toUpperCase():(high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
}
,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"Sponsored","syndicated-static-text-position":"top-right","quantcast-label":"Unsorted.gannett-network.default.video-horizontalx5","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":249,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":250,"maxWc":379,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":380,"maxWc":609,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":610,"maxWc":749,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":750,"maxWc":1029,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1030,"maxWc":1419,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1420,"maxWc":1729,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1730,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template","widget-creator-revision":"-1","details-inline-with-title":"","mode-is-responsive":false,"responsive-extra-columns":1,"responsive-rules":null,"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":false,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"article-two-columns":{"component-id":"rbox-t2v","tabbed":false,"header":"TOP VIDEO PICKS","expandable":false,"list-size":3,"orientation":"vertical","navigation-type":"scrolling","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"74","thumbnail-height":"57","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"detail-order":"title,duration","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":
function(internalc,myorigin) {
    var box = window.TRCImpl.boxes[internalc.id.split('internal_')[1]];        
    var gam = new window.TRC.GoogleAds(box,'7951796702',null,'ca-pub-2194040235099739');
    gam.gamInWrapper = false;
    gam.draw([200,200],[200,200],27,false);
  	document.getElementsByClassName('gam_header')[0].innerHTML = 'Sponsored links';
    box.element.parentNode.className += 'article-two-columns_google_ads';   
}
,"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"title":"Related Videos","format-title":'%s',"format-duration":function(dur){
    var hours = parseInt(dur / 3600);
    if (hours >= 1)
        dur = dur % 3600;
    else
        hours = 0;var min = parseInt(dur / 60);
    var sec = parseInt(dur % 60);
    if (typeof hours != 'number' || typeof min != 'number' || typeof sec != 'number' || isNaN(hours) || isNaN(min)|| isNaN(sec) || dur < 1)
        return '';
    return '('+(hours >= 1 ? (hours + 'h') : '') + min + 'm' + sec+'s'+')';
},"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(published_date) {
var publish_date = new Date(parseInt(published_date) * 1000);
        var Months = {'1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec'};
        var publish_date_year = publish_date.getFullYear();
        var publish_date_month = publish_date.getMonth() + 1;
        var publish_date_days = publish_date.getDate();
            var publish_date_day = publish_date.getDay();
		switch(publish_date_day)
			{
			  case 0:
			  publish_date_day =	'Sun';
			  break;
			  case 1:
			  publish_date_day =	'Mon';
			  break;
			  case 2:
			  publish_date_day = 'Tue';
			  break;
		          case 3:
			  publish_date_day = 'Wed';
			  break;
			  case 4:
			  publish_date_day = 'Thu';
			  break;
			  case 5:
			  publish_date_day = 'Fri';
			  break;
			  case 6:
			  publish_date_day = 'Sat';
			  break;
			}

		    
        if (publish_date_days < 10)
                publish_date_days = '0' + publish_date_days;
        return publish_date_day +', ' + Months[publish_date_month] + ' ' + publish_date_days + ' ' + publish_date_year;
},"sponsored-location":"top","thumbnail-position":"start","template":"Default","color-scheme":"custom","pager-type-style":"numbers","pager-position":"start","pager-button-location":"none","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"custom","style-template":"custom","attribution-position":"top","shade-scroll":false,"attribution-text":"by Taboola","required-attributes":"none","format-external-data":'%s',"item-data-filter":function(data) {
	if (data.category) {
		var categoryList = window.TRC.categoryList;
		var data_category_list = data.category.split(';');
		var high_priority_category;
        	for(var i=0; i<data_category_list.length; i++){
        		var category = data_category_list[i];
        		var category_list = (category.split('//')) ? category.split('//') : category;
                category = category_list[category_list.length-1];                    
                if(categoryList[category])
                	high_priority_category = (!high_priority_category)?category:((categoryList[high_priority_category]['index']>categoryList[category]['index'])?category:high_priority_category);
                }
            high_priority_category = (high_priority_category)?high_priority_category:data_category_list[0];
            
            if(!categoryList[high_priority_category])
               data.category = high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            else
               data.category = (categoryList[high_priority_category]['name'])?categoryList[high_priority_category]['name']:((0<=categoryList[high_priority_category]['index']<13)?high_priority_category.toUpperCase():(high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
}
,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"Sponsored","syndicated-static-text-position":"top-right","quantcast-label":"Unsorted.gannett-network.default.article-two-columns","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":249,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":250,"maxWc":379,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":380,"maxWc":609,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":610,"maxWc":749,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":750,"maxWc":1029,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1030,"maxWc":1419,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1420,"maxWc":1729,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1730,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template","widget-creator-revision":"-1","details-inline-with-title":"","mode-is-responsive":false,"responsive-extra-columns":1,"responsive-rules":null,"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":false,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"ab_grid-2x4_bigger-thumbs":{"component-id":"rbox-t2m","tabbed":false,"header":"<span class='trc_inner_header trc_header_left_column'>MORE STORIES:</span><span class='trc_inner_header trc_header_right_column'>SPONSOR CONTENT:</span>","title":"Related Videos","expandable":false,"list-size":8,"orientation":"vertical","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"149","thumbnail-height":"85","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){return this.dateFormatISO(d, false);},"sponsored-location":"thumbnail-bottom","thumbnail-position":"start","detail-order":"title,category,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(itemsContainer, data) {

        if(TRC.Browser.ieUpto(6)) {
            itemsContainer.className += ' ie6fix';
        }
        
        for(i = 0; i < data.boxes.length; i++) {
            //Fix titles text overflow after UI changes
            var videoLabelsAnchor = data.boxes[i].video_data.link;
            videoLabelsAnchor.firstChild.firstChild.innerHTML = data.boxes[i].video_data.title;
            data.boxes[i].fixTextOverflow(true);

            var boxes = data.boxes;
            if (i == 1) {
                boxes[i].className += ' firstInRow';
            }
            if (i %2 == 1) {
                boxes[i].className += ' rightCol';
            }

            //change date
            var date = new Date(parseFloat(data.response.trc['video-list'].video[i]['published-date'])*1000);
            var trc_elm = itemsContainer.childNodes[i].childNodes[1];
            var elems = trc_elm.getElementsByTagName('*'), i;
            var a;
            for (a in elems){
                if((' ' + elems[a].className + ' ').indexOf('video-published-date') > -1) {
                    elems[a].innerHTML = timeSince(date) + ' ago';
                    elems[a].className += ' loaded';
                }


                function timeSince(date) {
                    var seconds = Math.floor((new Date() - date) / 1000);
                    var interval = Math.floor(seconds / 31536000);
                    if (interval > 1) {
                        return interval + ' years';
                    }
                    interval = Math.floor(seconds / 2592000);
                    if (interval > 1) {
                        return interval + ' months';
                    }
                    interval = Math.floor(seconds / 86400);
                    if (interval > 1) {
                        return interval + ' days';
                    }
                    interval = Math.floor(seconds / 3600);
                    if (interval > 1) {
                        return interval + ' hours';
                    }
                    interval = Math.floor(seconds / 60);
                    if (interval > 1) {
                        return interval + ' minutes';
                    }
                    return Math.floor(seconds) + ' seconds';
                }
            }

            var publish_date = data.response.trc['video-list'].video[i]['published-date'];
            var category = data.response.trc['video-list'].video[i]['category'];
            var branding = data.response.trc['video-list'].video[i]['branding-text'];
			var categoryContainer = itemsContainer.childNodes[i].childNodes[1].childNodes[0].childNodes[1].childNodes[0];
                                                               
            if ((publish_date && category) && (!data.response.trc['video-list'].video[i]['is-syndicated']) && (!data.response.trc['video-list'].video[i]['branding-text'])){
                //item has both publish date and category
                var spacer = document.createElement('em');
                spacer.innerHTML = ' | ';
                itemsContainer.childNodes[i].childNodes[1].firstChild.insertBefore(spacer,itemsContainer.childNodes[i].childNodes[1].firstChild.childNodes[2]);
                //set color of category
                var categoryLower = category.toLowerCase();
                if (categoryLower == ( 'sports' || 'nfl' ||  'ncaaf' || 'mlb' || 'nba' || 'nascar' || 'ufc' || 'nhl' || 'ncaab' || 'mls' || 'mma' || 'wnba' || 'ftw') ) {
                    categoryContainer.style.color = '#b81800';
                }
                else if (categoryLower == 'life' ) {
                	categoryContainer.style.color = '#9600b4';
                }
                else if (categoryLower == ('tech' || 'game on') ) {
                    categoryContainer.style.color = '#fa6600';
                }
                else if (categoryLower == ( 'travel' || 'cruise log') ) {
                    categoryContainer.style.color = '#00c3c3';
                }
                else if (categoryLower == 'opinion' ) {
                	categoryContainer.style.color = '#666';
                }
                else if (categoryLower == 'weather') {
                    categoryContainer.style.color = '#ffc000';
                }
                else if (categoryLower == 'money') {
                    categoryContainer.style.color = '#00a53c';
                }
            }


            if (branding){
                itemsContainer.childNodes[i].childNodes[1].innerHTML += '<div class=\'trc_sy_icon\'></div>';
            }

                                                         

        }



}
,"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"template":"Default","color-scheme":"White","pager-type-style":"numbers","pager-position":"start","pager-button-location":"pager","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"bottom","shade-scroll":false,"attribution-text":"","required-attributes":"none","format-external-data":'%s',"item-data-filter":function(data) {
if (data.category) { 
              var categoryList = window.TRC.categoryList;
               var data_category_list = data.category.split(';');
                var hight_prioraty_category;
                for(var i=0; i<data_category_list.length; i++){
                    var category = data_category_list[i];
                    var category_list = (category.split('//')) ? category.split('//') : category;
                    category = category_list[category_list.length-1];                    
                    if(categoryList[category])
                       hight_prioraty_category = (!hight_prioraty_category)?category:((categoryList[hight_prioraty_category]['index']>categoryList[category]['index'])?category:hight_prioraty_category);
                }
            hight_prioraty_category = (hight_prioraty_category)?hight_prioraty_category:data_category_list[0];
            
            if(!categoryList[hight_prioraty_category])
               data.category = hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }).replace(/People/g,'Life');
            else
               data.category = (categoryList[hight_prioraty_category]['name'])?categoryList[hight_prioraty_category]['name']:((0<=categoryList[hight_prioraty_category]['index']<11)?hight_prioraty_category.toUpperCase():(hight_prioraty_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }		
        return data;
}
,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"Sponsored","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":249,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":250,"maxWc":379,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":380,"maxWc":609,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":610,"maxWc":749,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":750,"maxWc":1029,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1030,"maxWc":1419,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1420,"maxWc":1729,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1730,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template","widget-creator-revision":"-1","details-inline-with-title":"","mode-is-responsive":false,"responsive-extra-columns":1,"responsive-rules":null,"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":false,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":1,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Sponsored Links","disclosure-link-text-organic":"","disclosure-position":"none","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"text-links-vertical":{"component-id":"rbox-t2t","tabbed":false,"header":"related stories","title":"Related Videos","expandable":false,"list-size":5,"orientation":"horizontal","navigation-type":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"0","thumbnail-height":"0","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"format-title":'%s',"format-duration":'%s',"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"format-rating":'Rating: %s',"format-published-date":function(d){

    function timeSince(date) {
    	
	    var seconds = Math.floor((new Date() - date) / 1000);
	    var interval = Math.floor(seconds / 31536000);
	    if (interval >= 1) {
	        return interval + ' years';
	    }
	    interval = Math.floor(seconds / 2592000);
	    if (interval >= 1) {
	        return interval + ' months';
	    }
	    interval = Math.floor(seconds / 86400);
	    if (interval >= 1) {
	        return interval + ' days';
	    }
	    interval = Math.floor(seconds / 3600);
	    if (interval >= 1) {
	        return interval + ' hours';
	    }
	    interval = Math.floor(seconds / 60);
	    if (interval >= 1) {
	        return interval + ' minutes';
	    }
	    return Math.floor(seconds) + ' seconds';
	}
	
	var date = new Date(parseFloat(d)*1000);
	return timeSince(date) + ' ago';
}
,"sponsored-location":"thumbnail-top","thumbnail-position":"none","detail-order":"title,published-date","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url;},"list-suffix":function(internalc, myorigin) {},"item-renderer":function(box,data) {
    if (typeof window.trc_itemRenderer == 'function')
        window.trc_itemRenderer(document.createElement('div'),data);
    try{
        __trcDOMWalker(box, function (o) {
                        if(o.nodeType === 1){
                                        o.target = '_blank';
                                }
                        }
                );
        } catch(e){
                ;
        }
        
        // Add recommendation target type for videoCube node
        if(data && data.isPhoto){
        	if(box) {
        		box.className += ' photoItem';
        	}
        }
 
}
,"template":"Default","color-scheme":"White","pager-type-style":"numbers","pager-position":"start","pager-button-location":"pager","pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"detail-order-ad":"title","layout-template":"Horizontal 4","style-template":"Light","attribution-position":"top","shade-scroll":false,"attribution-text":"<span>par Taboola</span>","required-attributes":"none","format-external-data":'%s',"item-data-filter":function(data) {
	if (data.category) {
		var categoryList = window.TRC.categoryList;
		var data_category_list = data.category.split(';');
		var high_priority_category;
        	for(var i=0; i<data_category_list.length; i++){
        		var category = data_category_list[i];
        		var category_list = (category.split('//')) ? category.split('//') : category;
                category = category_list[category_list.length-1];                    
                if(categoryList[category])
                	high_priority_category = (!high_priority_category)?category:((categoryList[high_priority_category]['index']>categoryList[category]['index'])?category:high_priority_category);
                }
            high_priority_category = (high_priority_category)?high_priority_category:data_category_list[0];
            
            if(!categoryList[high_priority_category])
               data.category = high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            else
               data.category = (categoryList[high_priority_category]['name'])?categoryList[high_priority_category]['name']:((0<=categoryList[high_priority_category]['index']<13)?high_priority_category.toUpperCase():(high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
}
,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"title,branding","format-syndicator":function(s){ return s; },"syndicated-static-text":"","syndicated-static-text-position":"top-right","quantcast-label":"","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":249,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":250,"maxWc":379,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":380,"maxWc":609,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":610,"maxWc":749,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":750,"maxWc":1029,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1030,"maxWc":1419,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1420,"maxWc":1729,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1730,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template","widget-creator-revision":"-1","details-inline-with-title":"","mode-is-responsive":false,"responsive-extra-columns":1,"responsive-rules":null,"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":false,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"},"home-horizontalx4":{"component-id":"rbox-h2v","tabbed":false,"header":"VIDEOS YOU MAY BE INTERESTED IN","layout-template":"custom","style-template":"custom","color-scheme":"custom","title":"Related Videos","expandable":false,"list-size":3,"orientation":"horizontal","attribution-position":"bottom","navigation-type":"paging","pager-type-style":"numbers","pager-position":"header","pager-button-location":"pager","pager-button-style":"<span class=\"pager-cont\">&lt;</span>|<span class=\"pager-cont\">&gt;</span>","shade-scroll":true,"attribution-text":"<span style=\"color:#A0A0A0;font-weight:bold;\">Powered by <span style=\"color:#000\">Taboola</span></span>","required-attributes":"none","auto-scroll":"none","loading-animation-url":"hide","thumbnail-width":"115","thumbnail-height":"86","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"format-title":'%s',"format-duration":function(dur){
    var hours = parseInt(dur / 3600);
    if (hours >= 1)
        dur = dur % 3600;
    else
        hours = 0;var min = parseInt(dur / 60);
    var sec = parseInt(dur % 60);
    if (typeof hours != 'number' || typeof min != 'number' || typeof sec != 'number' || isNaN(hours) || isNaN(min)|| isNaN(sec) || dur < 1)
        return '';
    return '('+(hours >= 1 ? (hours + 'h') : '') + min + 'm' + sec+'s'+')';
},"format-description":'%s',"format-category":'%s',"format-uploader":'User: %s',"format-views":function(n){ return 'Views: '+this.formatNumber(n);},"format-rating":'Rating: %s',"format-published-date":function(published_date){
var publish_date = new Date(parseInt(published_date) * 1000);
        var Months = {'1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'Jun','7':'Jul','8':'Aug','9':'Sep','10':'Oct','11':'Nov','12':'Dec'};
        var publish_date_year = publish_date.getFullYear();
        var publish_date_month = publish_date.getMonth() + 1;
        var publish_date_days = publish_date.getDate();
        if (publish_date_days < 10)
                publish_date_days = '0' + publish_date_days;
        return  Months[publish_date_month] + '. ' + publish_date_days + ', ' + publish_date_year;
}
,"format-external-data":'%s',"sponsored-location":"thumbnail-top","thumbnail-position":"top","detail-order":"title,duration","detail-order-ad":"title,url","icons":false,"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"");}out=num+","+out;return out.replace(/,$/,"");},"change-url":function(url){return url+(url.search("\\?")>0?"&":"?")+"odyssey=mod|tvideo|article";},"list-suffix":
function(internalc,myorigin) {
    var box = window.TRCImpl.boxes[internalc.id.split('internal_')[1]];
    (function(){            
            return new window.TRC.GoogleAds(box,"5842471294",null,"ca-pub-2194040235099739");
        })().draw([125,125],[125,125],20,false);    
}
,"item-data-filter":function(data) {
	if (data.category) {
		var categoryList = window.TRC.categoryList;
		var data_category_list = data.category.split(';');
		var high_priority_category;
        	for(var i=0; i<data_category_list.length; i++){
        		var category = data_category_list[i];
        		var category_list = (category.split('//')) ? category.split('//') : category;
                category = category_list[category_list.length-1];                    
                if(categoryList[category])
                	high_priority_category = (!high_priority_category)?category:((categoryList[high_priority_category]['index']>categoryList[category]['index'])?category:high_priority_category);
                }
            high_priority_category = (high_priority_category)?high_priority_category:data_category_list[0];
            
            if(!categoryList[high_priority_category])
               data.category = high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            else
               data.category = (categoryList[high_priority_category]['name'])?categoryList[high_priority_category]['name']:((0<=categoryList[high_priority_category]['index']<13)?high_priority_category.toUpperCase():(high_priority_category.replace(/;/g, '').replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })));
            }
        return data;
}
,"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data);},"pager-button-active-image":"","pager-button-inactive-image":"","pager-button-hover-image":"","pager-style-active-image":"","pager-style-inactive-image":"","pager-style-hover-image":"","lightbox-display-title":true,"gam-allow-trc-ads":false,"thumbnail-position-ad":"inherit","impl-class":"TRCRBox","player-embed-code":function(){return '';},"player-container-id":"trc_Embed_Container_Id","render-player-info":false,"player-thumbnail-width":"75","player-thumbnail-height":"200","player-detail-order":"title,description","use-cdn-recommendations":false,"syndicated-attribution":"","syndicated-attribution-tooltip":"","syndicated-attribution-position":"bottom-right","detail-order-syndicated":"branding,title","format-syndicator":function(s){ return s; },"syndicated-static-text":"Sponsored","syndicated-static-text-position":"top-right","quantcast-label":"Unsorted.gannett-network.default.home-horizontalx4","cyclical-paging":false,"after-visible":function(data) {},"link-target":"normal","auto-syndicated-attribution":true,"remove-url-playvideo-behavior":false,"auto-size":false,"auto-size-rules":[{"minWc":120,"maxWc":249,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":250,"maxWc":379,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":380,"maxWc":609,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":610,"maxWc":749,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":750,"maxWc":1029,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1030,"maxWc":1419,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1420,"maxWc":1729,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1730,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"rows":1,"widget-creator-layout":"autowidget-template","widget-creator-revision":"-1","details-inline-with-title":"","mode-is-responsive":false,"responsive-extra-columns":1,"responsive-rules":null,"image-lazy-load-space":200,"has-image-lazy-load":false,"use-css-important":false,"image-url-prefix":null,"image-size-factor":1.2,"image-min-width":100,"image-size-round":20,"image-max-dimension":1500,"image-min-dimension":100,"mode-has-userx":true,"min-width-for-disclosure":225,"min-width-for-attribution":325,"hide-disclosure-when-no-place":false,"hide-attribution-when-no-place":false,"disclosure-link-text-sponsored":"Sponsored Links","disclosure-link-text-hybrid":"Promoted Links","disclosure-link-text-organic":"","disclosure-position":"top","header-right":"No Header","use-browser-line-clamp":true,"use-dpr-images":true,"slider":false,"slider-slide-from":"bottom","slider-min-effective-scroll-size":20,"slider-transition-duration":600,"slider-transition-delay":200,"slider-background-color":"#666","slider-close-btn-font-size":"30px","slider-close-btn-size":"24px","slider-close-btn-color":"#FFF","slider-scroll-ref-element":function () { return window; },"slider-z-index":2500000,"mode-adc-config":null,"images-radius":"0","visibility-constraints":{},"ios-sc-link-target-mode":null,"has-expand-animation":false,"expand-animation-duration":1000,"expand-animation-max-height":1000,"read-more-config":null,"enable-read-more":false,"mode-has-adchoice":true,"adchoice-large":false,"adchoice-position":"auto","adchoice-target-url":"","read-more-box-selector":"","read-more-threshold":1100,"read-more-minimized-size":800,"read-more-caption":"","mode-start":function(data) {},"smart-ellipsis":false,"tokenize-strategy":"word","rtb-image-url-prefix":null,"image-dpr-factor":2,"image-allowed-ratio-diff":0.029,"popup-custom-url":"","carousel-min-items":1.33,"header-icon-url":"","before-detail-order":"","title-icon-url":"","before-detail-order-syndicated":"","header-icon":"NONE","title-icon":"NONE"}},"language":"en","testmode":false,"direction":"ltr","default-thumbnail":"http://cdn.taboolasyndication.com/libtrc/static/thumbnails/759bc49732394dde468c8d65a464e1a4.png","domains":"","sponsored-link-text":"Sponsored Link","sponsored-video-text":"Sponsored Video","branding-url":{},"configuration-version":"0","external-credentials":"","brightcove-list-id":"","publisher-start":function(){
	window.TRC.categoryList = {
			'nfl':{index:1},
			'ncaaf':{index:2},
			'mlb':{index:3},
			'nba':{index:4},
			'nascar':{index:5},
			'ufc':{index:6},
			'nhl':{index:7},
			'ncaab':{index:8},
			'mls':{index:9},
			'mma':{index:10},
			'wnba':{index:11},
			'news':{index:12,name:'News'},
			'local':{index:13,name:'News'},
			'sports':{index:14,name:'Sports'},
			'lifestyle':{index:15,name:'Life'},
			'business':{index:16,name:'Business'},
			'money':{index:17,name:'Business'},
			'flavors':{index:18,name:'Flavors'},
			'opinion':{index:19,name:'Opinion'},
			'weather':{index:20,name:'Weather'}
	}
	try {
		if (typeof TRC !=='undefined' && typeof TRC.publisherId !=='undefined' && TRC.publisherId == 'unknown-site-on-gannett-network') {
			var url=document.location.href;
			if (url.includes('gametimepa.com')){
				TRC.publisherId = 'gannettcompany-gametimepa';
			}
		}
	}
	catch (e) {
	}
	/* this code forces the list size of an verticalx8 mode to return a specific number instead of calling calculateAutoListSize().
	 * the purpose of this is to allow the ab-test of this mode to get enough recommendations. in case that this ab-test does not exist anymore,
	 * this code can be removed
	 */
	this.origGetListSize = this.getListSize;
	this.getListSize = function(m) {
		if(m['mode'] == 'verticalx8')
			return 10;
		if(m['mode'] == 'grid-2x4')
			return 10;
		return this.origGetListSize(m);
	}
	/** hot fix for text links truncation issue in rbox when branding is before title - may be removed after
		dev ticket DEV-5019 is resolved **/
	TRC.implClasses.TRCRBox.prototype.fixWCTextLinksVideoBoxes = function() {
		var boxes = this.boxes,
		title;
		for(var i=0, len=boxes.length; i< len; i++){
			title = boxes[i].findElement(function(e){
				return e.className.search("title") >= 0;
			}, labels_box,'span',null);
				title = boxes[i].video_data['title'];
				boxes[i].fixTextOverflow(true);
		}
	};
	/** end of hotfix DEV-5019 **/
	if(document.location.href.indexOf('sponsor-story')>-1) {
		delete _taboola.push;
		this.dispatchLoadRequest = function () {
		};
	}
	for(var mode in this.modes) {
		if (typeof TRC !=='undefined' && typeof TRC=='object' && typeof TRC.publisherId !== 'undefined' && typeof TRC.publisherId=='string' && (TRC.publisherId=='gannettcompany-elsoldesalinas' || TRC.publisherId=='gannettcompany-elpasoymas' || TRC.publisherId=='gannett-lavozarizona')){
			if (this.modes[mode]['header'].toLocaleLowerCase()=='more stories:'){
				this.modes[mode]['header'] = 'Más Articulos:';
			}
			if (this.modes[mode]['header'].toLocaleLowerCase()=='sponsor content:'){
				this.modes[mode]['header'] = 'Patrocine Contenido:';
			}
			if (this.modes[mode]['header'].toLocaleLowerCase()=='more stories'){
				this.modes[mode]['header'] = 'Más Articulos';
			}
			if (this.modes[mode]['header'].toLocaleLowerCase()=='sponsor content'){
				this.modes[mode]['header'] = 'Patrocine Contenido';
			}
			this.modes[mode]['attribution-text'] = 'por Taboola';
			this.modes[mode]['disclosure-link-text-sponsored'] = 'Recomendado:';
			 if (TRC.publisherId=='gannett-lavozarizona'){
                                this.modes['thumbnails-i']['header']= 'MÁS ARTÍCULOS';
                        	this.modes['thumbnails-k']['header']= 'MÁS ARTÍCULOS';
			}
		}
	}
	/**************************************************/
},"get-user":function(){return null;},"get-creator":function(){var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta', false);for(var i=0;i<m.length;i++){if(m[i].name=='uploader'||m[i].name=='item-uploader')return m[i].content;}},"get-views":function() {var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta', false);for(var i=0;i<m.length;i++){if(m[i].name=='views'||m[i].name=='item-views')return m[i].content;}},"get-rating":function() {var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta', false);for(var i=0;i<m.length;i++){if(m[i].name=='rating'||m[i].name=='item-rating'){ if(!isNaN(parseFloat(m[i].content))) return m[i].content;}}},"get-tags":function() {return [];},"logo-image":"http://cdn.taboolasyndication.com/taboola/powered-by.png","has_valid_rss":false,"actionscript_version":"3","brightcove-uses-reference":false,"publisher-end":function(id){ },"ie-logo-image":"http://cdn.taboolasyndication.com/taboola/powered-by-small.gif","attribution":true,"notify-loaded":true,"metafields":"","normalize-item-id":function(itemid,type,canon){if(!canon&&type=='text'&&typeof itemid=='string'&&itemid.search(new RegExp('^https?://'))==0)itemid=itemid.replace(/\?.*/,'', false);return itemid.toLowerCase();},"normalize-item-url":function(itemurl,type,canon){return itemurl;},"read-paused-bcplayer":false,"normalize-request-param":function(req,mode) {
	if (typeof mode == 'string' && mode == 'grid-sports') {
		req.acnt = 'sports';
		req.uip = 'grid-sports-3x3'
	}
	
	if (typeof mode == 'string' && mode == 'grid-2x4') {
		req.uip = 'grid-3x3'
	}
	
	if (typeof mode == 'string' && mode == 'verticalx8') {
		req.uip = 'short-article-2x5'
	}
	if (typeof mode == 'string' && mode == 'thumbnails-inject-sports' ||  mode == 'thumbnails-m') {
			req.ac = 'sports';
	}
	return req;
}
,"normalize-log-param":function(name,value,mode) {return value;},"timeout":30000,"prenormalize-item-id":{"host":true,"fragment":"^(\/video\/|!)","query":["p","id","Avis","Site","Dato","Date","Kategori","Category","Lopenr","ArtNo"],"truncate-at":["search.searchcompletion.com","org.mozilla.javascript.undefined"],"trailing-dirsep":true},"prenormalize-item-url":false,"loader-impl":"","trc-network-mapping":{"preview.newsletter.mountainhome.com":"gannettdigital-mountainhome-newsletter","blackmountainnews.com":"gannettcompany-blackmountainnews","newsletter.livoniaoe.com":"gannettdigital-livoniaoe-newsletter","floridatoday.com":"gannettcompany-floridatoday","navytimes.com":"gannettcompany-navytimes","newsletter.indianapolis.com":"gannettdigital-indianapolis-newsletter","greenvilleonline.com":"gannettcompany-greenville","wgrz.com":"gannettcompany-wgrz","ydr.com":"gannettcompany-yorkdailyrecordydr","marinecorpstimes.com":"gannettcompany-marinecorpstimes","newsletter.yorkdailyrecord.com":"gannettdigital-york-dailyrecord-newsletter","demingheadlight.com":"gannettcompany-demingheadlight","newsletter.cherryhill.com":"gannett-cherryhill-newsletter","wlbz2.com":"gannettcompany-wlbz","newsletter.asburypark.com":"gannettdigital-asburypark-newsletter","delawareonline.com":"gannettcompany-delawareonline","wzzm13.com":"gannettcompany-wzzm","c4isrnet.com":"gannettcompany-c4isrnet","alamogordonews.com":"gannettcompany-alamogordonews","gosanangelo.com":"gannettcompany-gosanangelo","chillicothegazette.com":"gannettcompany-chillicothegazette","newsletter.yorkdispatch.com":"gannettdigital-york-dispatch-newsletter","preview.newsletter.detroitfreepress.com":"gannettdigital-detroitfreepress-newsletter","preview.newsletter.jacksontn.com":"gannettdigital-jacksontn-newsletter","wfaa.com":"gannettcompany-wfaa","clarionledger.com":"gannettcompany-clarionledger","news10.net":"gannettcompany-kxtv","ux.elpasoymas.com":"gannettcompany-elpasoymas","packersnews.com":"gannettcompany-packersnews","preview.newsletter.wausau.com":"gannettdigital-wausau-newsletter","newsletter.ithaca.com":"gannettdigital-ithaca-newsletter","google.com":"gennettdigitalexchange-","wauwatosanow.com":"gannettcompany-wauwatosanow","dnj.com":"gannettcompany-dnj","preview.newsletter.oshkosh.com":"gannettdigital-oshkosh-newsletter","portclintonnewsherald.com":"gannettcompany-newsherald","ksdk.com":"gannettcompany-ksdk","coloradoan.com":"gannettcompany-coloradoan","redskinswire.usatoday.com":"usatoday-redskinswire","newsletter.wisconsinrapids.com":"gannettdigital-wisconsinrapids-newsletter","newsletter.reno.com":"gannettdigital-reno-newsletter","lansingstatejournal.com":"gannettcompany-lansingstatejournal","newsletter.alamogordo.com":"gannettdigital-alamogordo-newsletter","steelerswire.usatoday.com":"usatoday-steelwire","newsletter.zanesville.com":"gannettdigital-zanesville-newsletter","newsletter.manitowoc.com":"gannettdigital-manitowoc-newsletter","preview.newsletter.burlington.com":"gannettdigital-burlington-newsletter","newsletter.salem.com":"gannettdigital-salem-newsletter","uw-media.cincinnati.com":"gannettcompany-newscincinnati","newsletter.elpaso.com":"gannettdigital-elpaso-newsletter","thecalifornian.com":"gannettcompany-thecalifornian","newsletter.bridgewatereastbrunswick.com":"gannett-bridgewatereastbrunswick-newsletter","stargazette.com":"gannettcompany-stargazette","vikingswire.usatoday.com":"usatoday-vikingswire","newsletter.jacksontn.com":"gannettdigital-jacksontn-newsletter","preview.newsletter.manitowoc.com":"gannetdigital-manitowoc-newsletter","commercialappeal.com":"gannettcompany-commercialappeal","newsletter.clarksville.com":"gannettdigital-clarksville-newsletter","newsletter.lebanon.com":"gannettdigital-lebanon-newsletter","newsletter.burlington.com":"gannettdigital-burlington-newsletter","newsletter.bridgetwater-eastbrunswick.com":"gannettdigital-bridgetwatereastbrunswick-newsletter","thestarpress.com":"gannettcompany-thestarpress","dmjuice.com":"gannettcompany-dmjuice","preview.cincinnati.com":"gannettcompany-newscincinnati","guampdn.com":"gannettcompany-guampdn","marionstar.com":"gannettcompany-themarionstar","reporternews.com":"gannettcompany-reporternews","newsletter.mountainhome.com":"gannettdigital-mountainhome-newsletter","newsletter.detroitnews.com":"gannettdigital-detroitnews-newsletter","hometownlife.com":"gannettcompany-hometownlife","nwcn.com":"gannettcompany-nwcn","ftw.usatoday.com":"usatoday-ftw","wisconsinrapidstribune.com":"gannettcompany-thedailytribune","thedailyjournal.com":"gannettcompany-thedailyjournal","cincinnati.com":"gannettcompany-newscincinnati","wcnc.com":"gannettcompany-wcnc","newsletter.lafayettelala.com":"gannettdigital-lafayettela-newsletter","newsleader.com":"gannettcompany-newsleader","awbir.com":"gannettcompany-wbit","statesmanjournal.com":"gannettcompany-statesmanjournal","desmoinesregister.com":"gannettcompany-desmoinesregister","vagabondish.com":"usatoday-vagabondish","newarkadvocate.com":"gannettcompany-theadvocate","preview.newsletter.stevenspoint.com":"gannettdigital-stevenspoint-newsletter","huskermax.com":"gannettdigitalsports-nebraskahuskermaxcom","yorkdispatch.com":"gannettcompany-yorkdispatch","dailyrecord.com":"gannettcompany-dailyrecord","newsletter.tallahassee.com":"gannettdigital-tallahassee-newsletter","newsletter.manitowoc1.com":"gannetdigital-manitowoc-newsletter","independentmail.com":"gannettcompany-independentmail","newsletter.lancaster.com":"gannettdigital-lancaster-newsletter","pantherswire.usatoday.com":"usatoday-pantherswire","ruidosonews.com":"gannettcompany-ruidosonews","broncoswire.usatoday.com":"usatoday-broncoswire","marshfieldnewsherald.com":"gannettcompany-marshfieldnews-herald","sheboyganpress.com":"gannettcompany-sheboyganpress","azcentral.com":"gannettcompany-azcentral","newsletter.fortmyers.com":"gannettdigital-fortmyers-newsletter","preview.newsletter.livingston.com":"gannettdigital-livingston-newsletter","theleafchronicle.com":"gannettcompany-theleafchronicle","bucyrustelegraphforum.com":"gannettcompany-telegraph-forum","baxterbulletin.com":"gannettcompany-baxterbulletin","preview.newsletter.lansing.com":"gannettdigital-lansing-newsletter","pal-item.com":"gannettcompany-pal-item","farmersadvance.com":"gannettcompany-farmersadvance","newsletter.shreveport.com":"gannettdigital-shreveport-newsletter","desertsun.com":"gannettcompany-mydesert","hawkcentral.com":"gannettcompany-hawkcentral","wbir.com":"gannettcompany-wbir","brookfield-elmgrovenow.com":"gannettcompany-brookfield-elmgrovenow","newsletter.mansfield.com":"gannettdigital-mansfield-newsletter","wisfarmer.com":"gannettcompany-wisfarmer","newsletter.livingston.com":"gannettdigital-livingston-newsletter","newsletter.cherryhilll.com":"gannettdigital-cherryhill-newsletter","newsletter.pensacola.com":"gannettdigital-pensacola-newsletter","wmaz.com":"gannettcompany-wmaz","thehammontonnews.com":"gannettcompany-hammontonnews","shreveporttimes.com":"gannettcompany-shreveporttimes","unofficialnetworks.com":"usatoday-unofficialnetworks","elpasotimes.com":"gannettcompany-elpasotimes","upstateparent.com":"gannettdigital-upstateparent","newsletter.elmira.com":"gannettdigital-elmira-newsletter","wausaudailyherald.com":"gannettcompany-wausaudailyherald","fdlreporter.com":"gannettcompany-fdlreporter","preview.newsletter.wisconsinrapids.com":"gannettdigital-wisconsinrapids-newsletter","northjersey.com":"gannettdigital-northjersey","app.com":"gannettcompany-app","fftoday.com":"usatoday-fftoday","mynorthshorenow.com":"gannettcompany-mynorthshorenow","timesrecordnews.com":"gannettcompany-timesrecordnews","draftwire.usatoday.com":"usatoday-draftwire","king5.com":"gannettcompany-king","newsletter.lansing.com":"gannettdigital-lansing-newsletter","thv11.com":"gannettcompany-kthv","newsletter.appleton.com":"gannettdigital-appleton-newsletter","preview.newsletter.coloradoan.com":"gannettdigital-battlecreek-newsletter","newsletter.vineland.com":"gannettdigital-vineland-newsletter","dukereport.com":"usatoday-dukereport","press-citizen.com":"gannettcompany-iowacitypress-citizen","preview.newsletter.staunton.com":"gannettdigital-staunton-newsletter","reno.com":"gannettcompany-reno","sctimes.com":"gannettcompany-st-cloudtimes","burlingtonfreepress.com":"gannettcompany-burlingtonfreepress","lakecountrynow.com":"gannettcompany-lakecountrynow","kvue.com":"gannettcompany-kvue","thetimesherald.com":"gannettcompany-thetimesherald","preview.newsletter.livoniaoe.com":"gannettdigital-livoniaoe-newsletter","newsletter.battlecreek.com":"gannettdigital-battlecreek-newsletter","thrashermagazine.com":"usatoday-thrashermagazine","tigernet.com":"gannettdigitalsports-clemson-tigernetcom","preview.newsletter.greatfalls.com":"gannettdigital-greatfalls-newsletter","mycentraljersey.com":"gannettcompany-mycentraljersey","newsletter.chillicothe.com":"gannettdigital-chillicothe-newsletter","newsletter.lascruces.com":"gannettdigital-lascruces-newsletter","newsletter.detroitfreepress.com":"gannettdigital-detroitfreepress-newsletter","lavozarizona.com":"gannett-lavozarizona","preview.newsletter.clarksville.com":"gannettdigital-clarksville-newsletter","experience.usatoday.com":"gannett-usatoday-travel","fftoolbox.com":"usatoday-fftoolbox","newsletter.alexandria.com":"gannettdigital-alexandria-newsletter","lancastereaglegazette.com":"gannettcompany-lancastereaglegazette","newsletter.farmington.com":"gannettdigital-farmington-newsletter","gametimepa.com":"gannettcompany-gametimepa","rgj.com":"gannettcompany-rgj","packinsider.com":"usatoday-packinsider","somosfrontera.com":"gannettcompany-somosfrontera","newsletter.jacksonms.com":"gannettdigital-jacksonms-newsletter","pnj.com":"gannettcompany-pnj","loyalcougars.com":"gannettdigitalsports-byu-loyalcougarscom","newsletter.carlsbad.com":"gannettdigital-carlsbad-newsletter","newsletter.opelousas.com":"gannettdigital-opelousas-newsletter","greenbaypressgazette.com":"gannettcompany-greenbaypressgazette","hornsports.com":"gannettdigitalsports-texashornsportscom","newsletter.greenbay.com":"gannettdigital-greenbay-newsletter","newsletter.newark.com":"gannettdigital-newark-newsletter","argusleader.com":"gannettcompany-argusleader","freep.com":"gannettcompany-freep","bnqt.com":"usatoday-bnqt","firstcoastnews.com":"gannettcompany-wtlv","11alive.com":"gannettcompany-wxia","knoxnews.com":"gannettcompany-knoxnews","defensenews.com":"gannettcompany-defensenews","thegleaner.com":"gannettcompany-thegleaner","kitsapsun.com":"gannettcompanyl-kitsapsun","preview.newsletter.stcloud.com":"gannettdigital-stcloud-newsletter","waukeshanow.com":"gannettcompany-waukeshanow","somethingelse.com":"ganett-usatoday-travel","newsletter.chambersburg.com":"gannettdigital-chambersburg-newsletter","coshoctontribune.com":"gannettcompany-coshoctontribune","lcsun-news.com":"gannettcompany-lascrucessun-news","courierpress.com":"gannettcompany-courierpress","newsletter.lafayettela.com":"gannett-lafayettela-newsletter","cardswire.usatoday.com":"usatoday-cardswire","kgw.com":"gannettcompany-kgw","preview.newsletter.sheboygan.com":"gannettdigital-sheboygan-newsletter","fantasyknuckleheads.com":"usatoday-fantasyknuckleheads","newsletter.palmsprings.com":"gannettdigital-palmsprings-newsletter","newsletter.greenville.com":"gannettdigital-greenville-newsletter","courierpostonline.com":"gannettcompany-courierpostonline","thespectrum.com":"gannettcompany-thespectrum","preview.newsletter.marshfield.com":"gannettdigital-marshfield-newsletter","thenorthwestern.com":"gannettcompany-thenorthwestern","dailyworld.com":"gannettcompany-dailyworld","delmarvanow.com":"gannettcompany-delmarvanow","gannett.com":"gannett-mailbridge-staging","pacificwaverider.com":"usatoday-pacificwaverider","battlecreekenquirer.com":"gannettcompany-battlecreekenquirer","whas11.com":"gannettcompany-whas","fanspeak.com":"usatoday-fanspeak","dolphinswire.usatoday.com":"usatoday-dolphinswire","thebiglead.com":"usatoday-bigleadsports","Draftbrowns.com":"usatoday-draftbrowns","naplesnews.com":"gannettcompany-naplesnews","federaltimes.com":"gannettcompany-federaltimes","detroitlionsdraft.com":"usatoday-detroitlionsdraft","10best.com":"usatoday-10best","buckeyeplanet.com":"gannettdigitalsports-ohiostate-buckeyeplanetcom","ithacajournal.com":"gannettcompany-theithacajournal","collegefootballpoll.com":"gannettdigitalsports-collegefootballpoll","thetowntalk.com":"gannettcompany-thetowntalk","news-press.com":"gannettcompany-newspress","preview.newsletter.greenville.com":"gannettdigital-greenville-newsletter","elpasoymas.com":"gannettcompany-elpasoymas","vcstar.com":"gannettcompany-vcstar","cowboyswire.usatoday.com":"usatoday-cowboyswire","jsonline.com":"gannettcompany-jsonline","newsletter.marshfield.com":"gannettdigital-marshfield-newsletter","giantswire.usatoday.com":"usatoday-giantswire","redding.com":"gannettcompany-redding","newsletter.salinas.com":"gannettdigital-salinas-newsletter","newsletter.brevard.com":"gannettdigital-brevard-newsletter","prewview.newsletter.asheville.com":"gannettdigital-asheville-newsletter","bluegoldsports.com":"gannettdigitalsports-westvirginia-bluegoldsportscom","jacksonsun.com":"gannettcompany-jacksonsun","newsletter.portclinton.com":"gannettdigital-portclinton-newsletter","tallahassee.com":"gannettcompany-tallahassee","newsletter.fonddulac.com":"gannettdigital-fonddulac-newsletter","newsletter.bucyrus.com":"gannettdigital-bucyrus-newsletter","newsletter.coshocton.com":"gannettdigital-coshocton-newsletter","newsletter.hanover.com":"gannettdigital-hanover-newsletter","newsletter.greatfalls.com":"gannettdigital-greatfalls-newsletter","9news.com":"gannettcompany-kusa","jetswire.usatoday.com":"usatoday-jetswire","worldsoccertalk.com":"usatoday-worldsoccertalk","visaliatimesdelta.com":"gannettcompany-visaliatimesdelta","fsunews.com":"gannettcompany-fsunews","tennessean.com":"gannettcompany-tennessean","jconline.com":"gannettcompany-journalandcourier","wltx.com":"gannettcompany-wltx","lohud.com":"gannettcompany-lohud","centralfloridafuture.com":"gannettcompany-centralflorida","wfmynews2.com":"gannettcompany-wfmy","pickinsplinters.com":"gannettdigital-pickinsplinters","newsletter.porthuron.com":"gannettdigital-porthuron-newsletter","newsletter.poughkeepsie.com":"gannettdigital-poughkeepsie-newsletter","thnt.com":"gannettcompany-thnt","citizen-times.com":"gannettcompany-citizentimes","postcrescent.com":"gannettcompany-post-crescent","krem.com":"gannettcompany-krem","mansfieldnewsjournal.com":"gannettcompany-newsjournal","htrnews.com":"gannettcompany-heraldtimesreporter","hattiesburgamerican.com":"gannettcompany-hattiesburgamerican","12news.com":"gannettcompany-kpnx","newsletter.visaliatulare.com":"gannettdigital-visaliatulare-newsletter","militarytimes.com":"gannettcompany-militarytimes","zanesvilletimesrecorder.com":"gannettcompany-zanesvilletimesrecorder","newsletter.oshkosh.com":"gannettdigital-oshkosh-newsletter","13newsnow.com":"gannettcompany-wvec","newsletter.binghamton.com":"gannettdigital-binghamton-newsletter","khou.com":"gannettcompany-khou","wwltv.com":"gannettcompany-wwl","newsletter.murfreesboro.com":"gannettdigital-murfreesboro-newsletter","sneakhype.com":"usatoday-sneakhype","virginiatech.sportswar.com":"gannettdigitalsports-virginiatech-virginiatechsportswarcom","theschmozone.com":"gannettdigitalsports-theschmozone","newsletter.marionstar.com":"gannettdigital-marionstar-newsletter","newsletter.rochester.com":"gannettdigital-rochester-newsletter","newsletter.iowacity.com":"gannettdigital-iowacity-newsletter","newsletter.wilmington.com":"gannettdigital-wilmington-newsletter","kens5.com":"gannettcompany-kens","greatfallstribune.com":"gannettcompany-greatfallstribune","marcoislandflorida.com":"gannettcompany-marcoisland","abc10.com":"gannettcompany-kxtv","ldnews.com":"gannettcompany-ldnews","mysouthshorenow.com":"gannettcompany-mysouthshorenow","wkyc.com":"gannettcompany-wkyc","elsoldesalinas.com":"gannettcompany-elsoldesalinas","wcsh6.com":"gannettcompany-wcsh","collegefootballnews.com":"gannettdigitalsports-collegefootballnews","poughkeepsiejournal.com":"gannettcompany-poughkeepsiejournal","newsletter.stcloud.com":"gannettdigital-stcloud-newsletter","thenewsstar.com":"gannettcompany-thenewsstar","ninerswire.usatoday.com":"usatoday-ninerswire","gannek.com":"gannettdigitalexchange-notredame","detroitnews.com":"gannettcompany-detroitnews","ktvb.com":"gannettcompany-ktvb","newsletter.morristown.com":"gannettdigital-morristown-newsletter","greenfield-westallisnow.com":"gannettcompany-greenfield-westallisnow","caller.com":"gannettcompany-caller","muskego-newberlinnow.com":"gannettcompany-muskego-newberlinnow","newsletter.asheville.com":"gannettdigital-asheville-newsletter","theadvertiser.com":"gannettcompany-theadvertiser","newsletter.monroe.com":"gannettdigital-monroe-newsletter","ndnation.com":"usatoday-ndnation","daily-times.com":"gannettcompany-farmingtondailytimes","feeds.feedburner.com":"gannettdigitalsports-notredame-feedsfeedburnercomuhnd","flipsidepa.com":"gannettcompany-flipsidepa","stevenspointjournal.com":"gannettcompany-stevenspointjournal","insidehoops.com":"usatoday-insidehoops","newsletter.stevenspoint.com":"gannettdigital-stevenspoint-newsletter","wusa9.com":"gannettcompany-wusa","newsletter.westchester.com":"gannettdigital-westchester-newsletter","newsletter.sheboygan.com":"gannettdigital-sheboygan-newsletter","preview.newsletter.detroitnews.com":"gannettdigital-detroitnews-newsletter","preview.newsletter.murfreesboro.com":"gannettdigital-murfreesboro-newsletter","newsletter.staunton.com":"gannettdigital-staunton-newsletter","courier-journal.com":"gannettcompany-courierjournal","metroparentmagazine.com":"gannettcompany-metroparentmagazine","myozaukeenow.com":"gannettcompany-myozaukeenow","preview.newsletter.vineland.com":"gannettdigital-vineland-newsletter","eveningsun.com":"gannettcompany-eveningsun","newsletter.wausau.com":"gannettdigital-wausau-newsletter","thenews-messenger.com":"gannettcompany-thenews-messenger","tcpalm.com":"gannettcompany-tcpalm","livingstondaily.com":"gannettcompany-livingstondaily","democratandchronicle.com":"gannettcompany-democratandchronicle","indystar.com":"gannettcompany-indystar","publicopiniononline.com":"gannettcompany-publicopinion","newsletter.nashville.com":"gannettdigital-nashville-newsletter","airforcetimes.com":"gannettcompany-airforcetimes-mobile","armytimes.com":"gannettcompany-armytimes","kare11.com":"gannettcompany-kare","scsun-news.com":"gannettcompany-silvercitysun-news","c-n.com":"gannettcompany-cn","newsletter.coloradoan.com":"gannettdigital-coloradoan-newsletter","newsletter.cincinnati.com":"gannettdigital-cincinnati-newsletter","cover32.com":"usatoday-cover32","mmajunkie.com":"usatoday-mmajunkie","billswire.usatoday.com":"usatoday-billswire","montgomeryadvertiser.com":"gannettcompany-montgomeryadvertiser","mynorthwestnow.com":"gannettcompany-mynorthwestnow","bearswire.usatoday.com":"usatoday-bearswire","theeagleswire.usatoday.com":"usatoday-eagleswire","wtsp.com":"gannettcompany-wtsp","theramswire.usatoday.com":"usatoday-ramswire","mysouthnow.com":"gannettcompany-mysouthnow","utefans.net":"gannettdigitalsports-utah-utefansnet","news-leader.com":"gannettcompany-springfieldnews-leader","preview.newsletter.porthuron.com":"gannettdigital-porthuron-newsletter","currentargus.com":"gannettcompany-currentargus","patsfans.com":"usatoday-patsfans","preview.newsletter.shreveport.com":"gannettdigital-shreveport-newsletter","pressconnects.com":"gannettcompany-press-sunbulletin","newsletter.fremont.com":"gannettdigital-fremont-newsletter","newsletter.argusleader.com":"gannettdigital-siouxfalls-newsletter"},"trc-skip-failover":false,"backstage-domain-url":"","adc-config":null,"link-target-conf":null,"ios-sc-link-target":{'NAV': '_self', 'NT': '_self', 'SP': '_self'},"small-ios-device":"iPhone|iPod","read-more-debug":false,"read-more-devices":"smart_phone","attribution-disclosure-direction":"ltr","mode-pub-start":function(){ },"before-video-load":function(rbox) {
	try{
	    if(document.querySelector('.video-js')) {
	        return false;
	    }
	}
	catch(e){
		console.log(e);
	}
	return true;