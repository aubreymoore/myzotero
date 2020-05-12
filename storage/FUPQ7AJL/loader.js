/*! 355-445-RELEASE 2019-05-02 */

!function(e,t){if(t.TRC=t.TRC||{},"object"==typeof e&&"function"==typeof e.now){var n=function(){};e.mark&&"function"==typeof e.mark||(e.mark=n),TRC.PerfEvenType={START:"start",STOP:"stop",MARK:"mark",REQ_LEVEL_START:"startReq",REQ_LEVEL_STOP:"stopReq"},TRC.Performance=function(n){var o=n||{},a="tbl_"+Date.now()+"_",r=o.logTimer,i=o.logLength||40,s=[],l=TRC.EVENT_LOOP_INTERVAL,c=1,u=20,d=TRC.EVENT_LOOP_REPORT_INTERVAL;this.perfString="",this.timeout=null,this.modeEvents={},this.measurementIds=[],this.modeDictionery={},this.measurements=[],this.fpsMeasurements=[],this.eventLoopMeasurements=[],this.measurementsCollection=[],this.firstIterationFlag=!0,o.measures=o.measures||{},o.measures["generalMeasure_loaderLoaded"]=[a+"2.0",a+"measuring"],o.measures["generalMeasure_implLoaded"]=[a+"4.0",a+"measuring"],o.measures["generalMeasure_integration"]=["tbl_ic",a+"measuring"],o.measures["generalMeasure_inflate"]=["tbl_inflate_start","tbl_inflate_end"],this.logMeasurements=function n(){if(!(performance.now()/1e3/60>30)){var r=[];if(this.measurementIds=[],e.getEntriesByName&&e.measure){var i,s;if(e.mark(a+"measuring"),0==e.getEntriesByName(a+"measuring").length){if(!e.setResourceTimingBufferSize)return;e.setResourceTimingBufferSize(e.getEntries().length+100),e.mark(a+"measuring")}if(this.firstIterationFlag)for(var l in o.measures)if(o.measures.hasOwnProperty(l)){var c=o.measures[l][0],u=o.measures[l][1];e.getEntriesByName(c).length>0&&e.getEntriesByName(u).length>0&&(e.measure(l,c,u),this.measurementIds.push(l))}for(var d in this.modeEvents)if(this.modeEvents.hasOwnProperty(d))for(var T in this.modeEvents[d])if(this.modeEvents[d].hasOwnProperty(T)){var g=this.modeEvents[d][T];if(g){var h=g["prefix"]+T+"_"+d;g["start"]&&g["stop"]?(e.measure(h,g["start"],g["stop"]),this.measurementIds.push(h)):g["mark"]&&(e.measure(h,g["mark"],a+"measuring"),this.measurementIds.push(h))}this.modeEvents[d][T]=null}for(var C=0;C<this.measurementIds.length;C++){s=this.measurementIds[C];var R,l=e.getEntriesByName(s)[0];this.measurements.push(l)}(r=e.getEntriesByType("navigation")).length>0&&this.firstIterationFlag&&(r=r[0],this.measurements.push({name:"generalMeasure_domInteractive",entryType:"measure",startTime:r.domInteractive,duration:0}),this.measurements.push({name:"generalMeasure_domContentLoadedEventEnd",entryType:"measure",startTime:r.domContentLoadedEventEnd,duration:0}),this.measurements.push({name:"generalMeasure_loadEventEnd",entryType:"measure",startTime:r.loadEventEnd,duration:0}),this.measurements.push({name:"generalMeasure_domComplete",entryType:"measure",startTime:r.domComplete,duration:0})),this.firstIterationFlag=!1,this.returnMeasueObj={};var b={};if(0!==this.measurements.length){for(;this.fpsMeasurements.length>0;)this.measurements.push(this.fpsMeasurements.pop());for(;this.eventLoopMeasurements.length>0;)this.measurements.push(this.eventLoopMeasurements.pop());b.measurements=JSON.stringify(this.measurements),b.dict=JSON.stringify(this.modeDictionery),this.returnMeasueObj.cv=TRC.version||"",TRC.networkId&&(this.returnMeasueObj.networkId=TRC.networkId),t.TRCImpl&&t.TRCImpl.systemFlags&&t.TRCImpl.systemFlags.loaderType&&(this.returnMeasueObj.lt=t.TRCImpl.systemFlags.loaderType),this.returnMeasueObj.sd=f(),this.returnMeasueObj.ri=m(),this.returnMeasueObj.vi=p(),this.returnMeasueObj.data=JSON.stringify(b),t.TRCImpl&&t.TRCImpl.sendEvent("perf",this.returnMeasueObj),this.measurementsCollection=this.measurementsCollection.concat(this.measurements),this.measurements=[]}}}},this.mark=function(t,n,o,r,i,s){var l=function(e){var t=0;if(0==e.length)return t;for(var n=0;n<e.length;n++){var o;t=(t<<5)-t+e.charCodeAt(n),t&=t}return t},c=n||e.now(),u=l(o+r),d=a+t+(o||r?"_"+u:"");if(e.mark(d),i){switch(this.modeDictionery[u]=o+"~~@~~"+r,this.modeEvents[u]=this.modeEvents[u]||{},this.modeEvents[u][i]=this.modeEvents[u][i]||{},s){case TRC.PerfEvenType.START:case TRC.PerfEvenType.REQ_LEVEL_START:this.modeEvents[u][i]["start"]=d;break;case TRC.PerfEvenType.STOP:case TRC.PerfEvenType.REQ_LEVEL_STOP:this.modeEvents[u][i]["stop"]=d;break;case TRC.PerfEvenType.MARK:this.modeEvents[u][i]["mark"]=d}s===TRC.PerfEvenType.REQ_LEVEL_STOP||s===TRC.PerfEvenType.REQ_LEVEL_START?this.modeEvents[u][i]["prefix"]="reqMeasure_":this.modeEvents[u][i]["prefix"]="generalMeasure_"}return this.perfString=this.perfString+";"+t+"="+c,d},window.addEventListener("beforeunload",this.logMeasurements.bind(this));var m=function(){var e;return(t.TRCImpl&&t.TRCImpl.getGlobalRequestId.trcBind(t.TRCImpl))()},f=function(){var e;return(t.TRCImpl&&t.TRCImpl.getGlobalSessionData.trcBind(t.TRCImpl))()},p=function(){return t.taboola_view_id||(t.taboola_view_id=(new Date).getTime()),t.taboola_view_id},T=function(){this.elapsed=0,this.last=null};T.prototype={tick:function(e){this.elapsed=(e-(this.last||e))/1e3,this.last=e},fps:function(){return Math.round(1/this.elapsed)}};var g=new T;function h(e){t.requestAnimationFrame(h),g.tick(e)}t.requestAnimationFrame&&t.requestAnimationFrame(h),this.cancelFpsMeasure=function(){h=function(){}},this.getTimer=function(){return g},this.getrender=function(){return h};var C=0,R=function(){var e,t,n={hidden:"visibilitychange",webkitHidden:"webkitvisibilitychange",mozHidden:"mozvisibilitychange",msHidden:"msvisibilitychange"};for(e in n)if(n.hasOwnProperty(e)&&e in document){t=n[e];break}return function(n){return n&&document.addEventListener(t,n),!document[e]}}();if(R(function(){R()?(console.warn("vis change"+C),TRC.performance&&TRC.performance.mark("windowActiveSTART"+C,null,"active",C,"activeTab",TRC.PerfEvenType.START),TRC.performance&&TRC.performance.mark("windowActiveSTOP"+C,null,"active",C,"activeTab",TRC.PerfEvenType.STOP)):(console.warn("vis change"+C),TRC.performance&&TRC.performance.mark("windowInactiveSTART"+C,null,"inactive",C,"inactiveTab",TRC.PerfEvenType.START),TRC.performance&&TRC.performance.mark("windowInactiveSTOP"+C,null,"inactive",C,"inactiveTab",TRC.PerfEvenType.STOP)),C++}),o.measureEnable){TRC.__takeMeasureQueue=TRC.__takeMeasureQueue||[];var b=o.measureTimeToSend||0,v=this.logMeasurements.bind(this);if(TRC.__takeMeasureQueue.push(v),0==b)window.addEventListener("beforeunload",TRC.__takeMeasureQueue.pop());else if(1==TRC.__takeMeasureQueue.length){var y=TRC.__takeMeasureQueue.pop();this.measureTimeout=setTimeout(function(){v(),o.measureInterval&&(this.measureInterval=setInterval(v,Math.max(Number(o.measureInterval),1e4)))},b)}setInterval(function(){var t=e.now();setTimeout(function(){s.push(e.now()-t)},0)},l),setInterval(function(){var e,t=0,n=0,o=0;if(s.length>0){e=s.length;for(var a=0;a<s.length;a++)n=Math.max(n,s[a]),o+=s[a];t=o/e,s=[];var r=Number(performance.now());TRC.performance.eventLoopMeasurements.length<=u&&(TRC.performance.eventLoopMeasurements.push({name:"generalMeasure_ELAVG_"+c,entryType:"measure",startTime:r,duration:t}),TRC.performance.eventLoopMeasurements.push({name:"generalMeasure_ELMAX_"+c,entryType:"measure",startTime:r,duration:n}),c++)}},d),"complete"!==document.readyState&&document.addEventListener("readystatechange",function(t){"complete"===t.target.readyState&&TRC.performance.measurements.push({name:"generalMeasure_documentReady",entryType:"measure",startTime:e.now(),duration:0})})}if(t.requestAnimationFrame){var _=5e3,E=1;this.fpsIntervalId=setInterval(function(){if(TRC.performance){var e=TRC.performance.getTimer().fps();TRC.performance.fpsMeasurements.length<10&&(TRC.performance.fpsMeasurements.push({name:"generalMeasure_FPS"+E,entryType:"measure",startTime:Number(performance.now()),duration:e,fps:e}),E++)}},_)}}}}(window.performance,window),function(e){e.TRC=e.TRC||{},e.TRC.inflate=function(e){var t="__style__",n="__common__",o="__keys__";function a(e,t){var n={},a;return r(o,e,t).forEach(function(o){n[o]=r(o,e,t)}),n}function r(e,t,n){var o=n[e];return void 0===o&&(o=t[e]),o}function i(e,t){var n="";return Object.keys(t).forEach(function(o){var a=t[o],r="";o.split(",").forEach(function(t){""!==r&&(r+=","),r+="."+e+" "+t}),n+=r+"{"+a+"}"}),n}if(e&&e.modes){var s=e.modes,l=e.global,c=l.style,u=s[n];if(u){var d=window.performance&&"function"==typeof window.performance.mark;d&&window.performance.mark("tbl_inflate_start");var m={},f=c.rtl;Object.keys(s).forEach(function(e){if(e!==n){var o=s[e];m[e]=a(u,o),f+=i(e,a(u[t],o[t]))}}),f+=c.custom,f+=c.mode_custom,l.style=f,e.modes=m,d&&window.performance.mark("tbl_inflate_end")}}return e}}(window),function(win,doc){if(!win.TRC||!win.TRC.utm){win.TRC?TRC.utm=[]:TRC={utm:[]};var config={"modes":{"ab_thumbnails-b_abp-mode":{"header":"SPONSOR CONTENT","rows":1,"widget-creator-revision":"7796304","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:57.0px;*height:57.0px;color:#333;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:helvetica, arial, sans-serif;font-size:14.0px;font-weight:bold;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;","":"width:300px;_width:300px;border-width:1px 0px 1px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:10px 0px 5px 0px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:38.0px;*height:38.0px;color:#333;font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;"}},"ab_thumbnails-g_abp-mode":{"header":"SPONSOR CONTENT","list-suffix":function(itemsContainer, data) {
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
,"attribution-position":"top","item-data-filter":function(data) {
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
},"detail-order-syndicated":"branding,title","widget-creator-revision":"7646288","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"disclosure-position":"top","mode-has-adchoice":false,"__style__":{".video-title":"font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;max-height:77px;*height:77px;color:#fff;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:'Futura Today Normal',Arial,Helvetica,sans-serif;",".trc_rbox_header":"font-family:'Futura Today Bold',arial,sans-serif;font-size:15px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#e6e6e6;padding:0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube .thumbnail-overlay":"background-image:url(http://cdn.taboola.com/libtrc/static/thumbnails/da6eb17d679d2182809c72530d4e41b8.png);background-position:5% 5%;",".trc_rbox_border_elm":"border-color:#e6e6e6;","":"width:300px;_width:300px;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:0px 10px 0px 10px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#D7D7D7;font-size:12.0px;font-weight:normal;text-decoration:none;font-family:Helvetica,Arial,sans-serif;background-image:null;text-align:left;"}},"organic-thumbnails-b":{"header":"MORE STORIES","detail-order":"title,category,published-date","list-suffix":function(itemsContainer, data) {
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
    var brandingMapping = {
        'reporternews.com':'Abilene Reporter-News',
        'alamogordonews.com':'Alamogordo Daily News',
        'thetowntalk.com':'The Town Talk',
        'independentmail.com':'Anderson Independent-Mail',
        'postcrescent.com':'The Post-Crescent',
        'app.com':'Asbury Park Press',
        'citizen-times.com':'Asheville Citizen-Times',
        'battlecreekenquirer.com':'Battle Creek Enquirer',
        'northjersey.com':'The Record / Herald News',
        'pressconnects.com':'Press & Sun-Bulletin',
        'kitsapsun.com':'Kitsap Sun',
        'floridatoday.com':'Florida Today',
        'mycentraljersey.com':'Courier News / Home News Tribune',
        'bucyrustelegraphforum.com':'Telegraph-Forum',
        'burlingtonfreepress.com':'The Burlington Free Press',
        'currentargus.com':'Carlsbad Current-Argus',
        'publicopiniononline.com':'Chambersburg Public Opinion',
        'courierpostonline.com':'Courier-Post',
        'chillicothegazette.com':'Chillicothe Gazette',
        'cincinnati.com':'Cincinnati Enquirer',
        'theleafchronicle.com':'The Leaf-Chronicle',
        'caller.com':'Corpus Christi Caller-Times',
        'coshoctontribune.com':'Coshocton Tribune',
        'demingheadlight.com':'Deming Headlight',
        'desmoinesregister.com':'The Des Moines Register',
        'freep.com':'Detroit Free Press',
        'detroitnews.com':'The Detroit News',
        'elpasotimes.com':'El Paso Times',
        'stargazette.com':'Star-Gazette',
        'courierpress.com':'Evansville Courier & Press',
        'daily-times.com':'The Daily Times',
        'fdlreporter.com':'The Reporter',
        'coloradoan.com':'Fort Collins Coloradoan',
        'news-press.com':'The News-Press',
        'thenews-messenger.com':'The News-Messenger',
        'greatfallstribune.com':'Great Falls Tribune',
        'greenbaypressgazette.com':'Green Bay Press-Gazette',
        'greenvilleonline.com':'The Greenville News',
        'guampdn.com':'Pacific Daily News',
        'eveningsun.com':'The Evening Sun',
        'hattiesburgamerican.com':'Hattiesburg American',
        'thegleaner.com':'The Gleaner',
        'indystar.com':'The Indianapolis Star',
        'press-citizen.com':'Iowa City Press-Citizen',
        'ithacajournal.com':'The Ithaca Journal',
        'clarionledger.com':'The Clarion-Ledger',
        'jacksonsun.com':'The Jackson Sun',
        'knoxnews.com':'Knoxville News Sentinel',
        'jconline.com':'Lafayette Journal and Courier',
        'theadvertiser.com':'The Daily Advertiser',
        'lancastereaglegazette.com':'Lancaster Eagle-Gazette',
        'lansingstatejournal.com':'Lansing State Journal',
        'lcsun-news.com':'Las Cruces Sun-News',
        'ldnews.com':'Lebanon Daily News',
        'livingstondaily.com':'Livingston Daily Press  & Argus',
        'hometownlife.com':'O&E Media',
        'courier-journal.com':'The Courier-Journal',
        'htrnews.com':'Herald Times Reporter',
        'mansfieldnewsjournal.com':'Mansfield News Journal',
        'marionstar.com':'The Marion Star',
        'marshfieldnewsherald.com':'Marshfield News Herald',
        'commercialappeal.com':'The Commercial Appeal',
        'jsonline.com':'Milwaukee Journal Sentinel',
        'thenewsstar.com':'The News-Star',
        'montgomeryadvertiser.com':'The Montgomery Advertiser',
        'dailyrecord.com':'Daily Record',
        'baxterbulletin.com':'The Baxter Bulletin',
        'thestarpress.com':'The Star Press',
        'dnj.com':'The Daily News Journal',
        'naplesnews.com':'Naples Daily News',
        'tennessean.com':'The Tennessean',
        'newarkadvocate.com':'The Advocate',
        'dailyworld.com':'Daily World',
        'thenorthwestern.com':'Oshkosh Northwestern',
        'desertsun.com':'The Desert Sun',
        'pnj.com':'Pensacola News Journal',
        'azcentral.com':'The Arizona Republic',
        'portclintonnewsherald.com':'News Herald',
        'thetimesherald.com':'Times Herald',
        'tcpalm.com':'St. Lucie News Tribune / The Stuart News / Indian River Press Journal',
        'poughkeepsiejournal.com':'Poughkeepsie Journal',
        'redding.com':'Redding Searchlight ',
        'rgj.com':'Reno Gazette-Journal',
        'pal-item.com':'Palladium-Item',
        'democratandchronicle.com':'Democrat & Chronicle',
        'ruidosonews.com':'Ruidoso News',
        'statesmanjournal.com':'Statesman Journal',
        'thecalifornian.com':'The Salinas Californian',
        'delmarvanow.com':'The Daily Times',
        'gosanangelo.com':'San Angelo Standard-Times',
        'sheboyganpress.com':'The Sheboygan Press',
        'shreveporttimes.com':'The Times',
        'scsun-news.com':'Silver City Sun-News',
        'argusleader.com':'Argus Leader',
        'news-leader.com':'Springfield News-Leader',
        'sctimes.com':'St. Cloud Times',
        'thespectrum.com':'The Spectrum',
        'newsleader.com':'The News Leader',
        'stevenspointjournal.com':'Stevens Point Journal',
        'tallahassee.com':'Tallahassee Democrat',
        'vcstar.com':'Ventura County Star',
        'thedailyjournal.com':'The Daily Journal',
        'visaliatimesdelta.com':'Visalia Times-Delta',
        'wausaudailyherald.com':'Wausau Daily Herald',
        'lohud.com':'The Journal News',
        'timesrecordnews.com':'Wichita Falls Times Record News',
        'delawareonline.com':'The News Journal',
        'wisconsinrapidstribune.com':'The Daily Tribune',
        'ydr.com':'York Daily Record',
        'yorkdispatch.com':'The York Dispatch',
        'zanesvilletimesrecorder.com':'Times Recorder',
        'blackmountainnews.com':'Black Mountain News',
        'centralfloridafuture.com':'Central Florida Future',
        'desmoinesregister.com':'Altoona Record-Herald',
        'dmjuice.com':'DM Juice',
        'hawkcentral.com':'Hawk Central',
        'desmoinesregister.com':'Indianola Record',
        'elpasoymas.com':'El Paso y Mas',
        'packersnews.com':'Packers News',
        'upstateparent.com':'Upstate Parent',
        'brookfield-elmgrovenow.com':'Brookfield',
        'greenfield-westallisnow.com':'Greenfield',
        'lakecountrynow.com':'Lake Country',
        'metroparentmagazine.com':'Metro Parent Magazine',
        'muskego-newberlinnow.com':'Muskego',
        'mynorthshorenow.com':'North Shorre',
        'mynorthwestnow.com':'Northwest',
        'myozaukeenow.com':'Ozaukee',
        'mysouthnow.com':'South',
        'mysouthshorenow.com':'South Shore',
        'waukeshanow.com':'Waukesha',
        'wauwatosanow.com':'Wauwatosa',
        'wisfarmer.com':'Wisconsin State Farmer',
        'marcoislandflorida.com':'Marco Island',
        'centralohio.com':'Central Ohio',
        'farmersadvance.com':'Farmers Advance',
        'lavozarizona.com':'La Voz',
        'reno.com':'Reno.com',
        'elsoldesalinas.com':'El Sol',
        'argusleader.com':'Brandon',
        'argusleader.com':'Dell Rapids',
        'fsunews.com':'FSU News',
        'thehammontonnews.com':'Hammonton News',
        'delawarebeaches.com':'Delaware Beaches',
        'gametimepa.com':'GameTimePA'
    }
    var ss;
    if(window.location.ancestorOrigins.length == 0){
        ss = window.location.host.substr(4,window.top.location.host.length);
    }
    else{
        var rr = window.location.ancestorOrigins;
        for(var x=0;x<rr.length;x++){
            if(rr[x].indexOf('amp') >= 0 && rr[x].indexOf('com') >= 0){
                ss = rr[x].substr(8, rr[x].indexOf('cdn')-9).split('-');
                ss.shift();ss=ss.join('.');
            }
        }
    }
    if(TRCImpl['trc-network-mapping'][ss] == TRC.publisherId && brandingMapping[ss]){
        for(var x=0;x<document.querySelectorAll('.organic-thumbnails-b .video-category').length;x++){
            document.querySelectorAll('.organic-thumbnails-b .video-category')[x].innerText = brandingMapping[ss] + ' ';
        }
    }
}
,"item-data-filter":function(data) {
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
},"widget-creator-revision":"7680361","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":6,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:88.0px;*height:88.0px;color:#333;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:helvetica, arial, sans-serif;",".trc_rbox_header":"font-family:'futura today', helvetica, Symbol, arial, sans-serif;font-size:19.0px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 15px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0 0 20px 0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:66.0px;*height:66.0px;color:#333;font-family:helvetica, arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:helvetica, arial, sans-serif;background-image:null;text-align:left;",".videoCube.thumbnail_start .thumbBlock_holder":"width:30%;_width:30%;"}},"organic-thumbnails-b_stream-amp":{"header":"MORE STORIES","detail-order":"title,category,published-date","list-suffix":function(itemsContainer, data) {
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
        var brandingMapping = {
        'reporternews.com':'Abilene Reporter-News',
        'alamogordonews.com':'Alamogordo Daily News',
        'thetowntalk.com':'The Town Talk',
        'independentmail.com':'Anderson Independent-Mail',
        'postcrescent.com':'The Post-Crescent',
        'app.com':'Asbury Park Press',
        'citizen-times.com':'Asheville Citizen-Times',
        'battlecreekenquirer.com':'Battle Creek Enquirer',
        'northjersey.com':'The Record / Herald News',
        'pressconnects.com':'Press & Sun-Bulletin',
        'kitsapsun.com':'Kitsap Sun',
        'floridatoday.com':'Florida Today',
        'mycentraljersey.com':'Courier News / Home News Tribune',
        'bucyrustelegraphforum.com':'Telegraph-Forum',
        'burlingtonfreepress.com':'The Burlington Free Press',
        'currentargus.com':'Carlsbad Current-Argus',
        'publicopiniononline.com':'Chambersburg Public Opinion',
        'courierpostonline.com':'Courier-Post',
        'chillicothegazette.com':'Chillicothe Gazette',
        'cincinnati.com':'Cincinnati Enquirer',
        'theleafchronicle.com':'The Leaf-Chronicle',
        'caller.com':'Corpus Christi Caller-Times',
        'coshoctontribune.com':'Coshocton Tribune',
        'demingheadlight.com':'Deming Headlight',
        'desmoinesregister.com':'The Des Moines Register',
        'freep.com':'Detroit Free Press',
        'detroitnews.com':'The Detroit News',
        'elpasotimes.com':'El Paso Times',
        'stargazette.com':'Star-Gazette',
        'courierpress.com':'Evansville Courier & Press',
        'daily-times.com':'The Daily Times',
        'fdlreporter.com':'The Reporter',
        'coloradoan.com':'Fort Collins Coloradoan',
        'news-press.com':'The News-Press',
        'thenews-messenger.com':'The News-Messenger',
        'greatfallstribune.com':'Great Falls Tribune',
        'greenbaypressgazette.com':'Green Bay Press-Gazette',
        'greenvilleonline.com':'The Greenville News',
        'guampdn.com':'Pacific Daily News',
        'eveningsun.com':'The Evening Sun',
        'hattiesburgamerican.com':'Hattiesburg American',
        'thegleaner.com':'The Gleaner',
        'indystar.com':'The Indianapolis Star',
        'press-citizen.com':'Iowa City Press-Citizen',
        'ithacajournal.com':'The Ithaca Journal',
        'clarionledger.com':'The Clarion-Ledger',
        'jacksonsun.com':'The Jackson Sun',
        'knoxnews.com':'Knoxville News Sentinel',
        'jconline.com':'Lafayette Journal and Courier',
        'theadvertiser.com':'The Daily Advertiser',
        'lancastereaglegazette.com':'Lancaster Eagle-Gazette',
        'lansingstatejournal.com':'Lansing State Journal',
        'lcsun-news.com':'Las Cruces Sun-News',
        'ldnews.com':'Lebanon Daily News',
        'livingstondaily.com':'Livingston Daily Press  & Argus',
        'hometownlife.com':'O&E Media',
        'courier-journal.com':'The Courier-Journal',
        'htrnews.com':'Herald Times Reporter',
        'mansfieldnewsjournal.com':'Mansfield News Journal',
        'marionstar.com':'The Marion Star',
        'marshfieldnewsherald.com':'Marshfield News Herald',
        'commercialappeal.com':'The Commercial Appeal',
        'jsonline.com':'Milwaukee Journal Sentinel',
        'thenewsstar.com':'The News-Star',
        'montgomeryadvertiser.com':'The Montgomery Advertiser',
        'dailyrecord.com':'Daily Record',
        'baxterbulletin.com':'The Baxter Bulletin',
        'thestarpress.com':'The Star Press',
        'dnj.com':'The Daily News Journal',
        'naplesnews.com':'Naples Daily News',
        'tennessean.com':'The Tennessean',
        'newarkadvocate.com':'The Advocate',
        'dailyworld.com':'Daily World',
        'thenorthwestern.com':'Oshkosh Northwestern',
        'desertsun.com':'The Desert Sun',
        'pnj.com':'Pensacola News Journal',
        'azcentral.com':'The Arizona Republic',
        'portclintonnewsherald.com':'News Herald',
        'thetimesherald.com':'Times Herald',
        'tcpalm.com':'St. Lucie News Tribune / The Stuart News / Indian River Press Journal',
        'poughkeepsiejournal.com':'Poughkeepsie Journal',
        'redding.com':'Redding Searchlight ',
        'rgj.com':'Reno Gazette-Journal',
        'pal-item.com':'Palladium-Item',
        'democratandchronicle.com':'Democrat & Chronicle',
        'ruidosonews.com':'Ruidoso News',
        'statesmanjournal.com':'Statesman Journal',
        'thecalifornian.com':'The Salinas Californian',
        'delmarvanow.com':'The Daily Times',
        'gosanangelo.com':'San Angelo Standard-Times',
        'sheboyganpress.com':'The Sheboygan Press',
        'shreveporttimes.com':'The Times',
        'scsun-news.com':'Silver City Sun-News',
        'argusleader.com':'Argus Leader',
        'news-leader.com':'Springfield News-Leader',
        'sctimes.com':'St. Cloud Times',
        'thespectrum.com':'The Spectrum',
        'newsleader.com':'The News Leader',
        'stevenspointjournal.com':'Stevens Point Journal',
        'tallahassee.com':'Tallahassee Democrat',
        'vcstar.com':'Ventura County Star',
        'thedailyjournal.com':'The Daily Journal',
        'visaliatimesdelta.com':'Visalia Times-Delta',
        'wausaudailyherald.com':'Wausau Daily Herald',
        'lohud.com':'The Journal News',
        'timesrecordnews.com':'Wichita Falls Times Record News',
        'delawareonline.com':'The News Journal',
        'wisconsinrapidstribune.com':'The Daily Tribune',
        'ydr.com':'York Daily Record',
        'yorkdispatch.com':'The York Dispatch',
        'zanesvilletimesrecorder.com':'Times Recorder',
        'blackmountainnews.com':'Black Mountain News',
        'centralfloridafuture.com':'Central Florida Future',
        'desmoinesregister.com':'Altoona Record-Herald',
        'dmjuice.com':'DM Juice',
        'hawkcentral.com':'Hawk Central',
        'desmoinesregister.com':'Indianola Record',
        'elpasoymas.com':'El Paso y Mas',
        'packersnews.com':'Packers News',
        'upstateparent.com':'Upstate Parent',
        'brookfield-elmgrovenow.com':'Brookfield',
        'greenfield-westallisnow.com':'Greenfield',
        'lakecountrynow.com':'Lake Country',
        'metroparentmagazine.com':'Metro Parent Magazine',
        'muskego-newberlinnow.com':'Muskego',
        'mynorthshorenow.com':'North Shorre',
        'mynorthwestnow.com':'Northwest',
        'myozaukeenow.com':'Ozaukee',
        'mysouthnow.com':'South',
        'mysouthshorenow.com':'South Shore',
        'waukeshanow.com':'Waukesha',
        'wauwatosanow.com':'Wauwatosa',
        'wisfarmer.com':'Wisconsin State Farmer',
        'marcoislandflorida.com':'Marco Island',
        'centralohio.com':'Central Ohio',
        'farmersadvance.com':'Farmers Advance',
        'lavozarizona.com':'La Voz',
        'reno.com':'Reno.com',
        'elsoldesalinas.com':'El Sol',
        'argusleader.com':'Brandon',
        'argusleader.com':'Dell Rapids',
        'fsunews.com':'FSU News',
        'thehammontonnews.com':'Hammonton News',
        'delawarebeaches.com':'Delaware Beaches',
        'gametimepa.com':'GameTimePA'
    }
    var ss;
    if(window.location.ancestorOrigins.length == 0){
        ss = window.location.host.substr(4,window.top.location.host.length);
    }
    else{
        var rr = window.location.ancestorOrigins;
        for(var x=0;x<rr.length;x++){
            if(rr[x].indexOf('amp') >= 0 && rr[x].indexOf('com') >= 0){
                ss = rr[x].substr(8, rr[x].indexOf('cdn')-9).split('-');
                ss.shift();ss=ss.join('.');
            }
        }
    }
    if(TRCImpl['trc-network-mapping'][ss] == TRC.publisherId && brandingMapping[ss]){
        for(var x=0;x<document.querySelectorAll('.organic-thumbnails-b_stream-amp .video-category').length;x++){
            document.querySelectorAll('.organic-thumbnails-b_stream-amp .video-category dt')[x].innerText = brandingMapping[ss] + ' ';
        }
    }
},"thumbnail-position":"start","attribution-position":"top","item-data-filter":function(data) {
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
},"widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7673056","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":6,"cells":1,"virtualThumbWidth":1,"virtualThumbHeight":1}],"min-width-for-attribution":200,"mode-has-adchoice":false,"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:66.0px;*height:66.0px;color:#333;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:'futura today demibold', helvetica, arial, sans-serif;",".trc_rbox_header":"font-family:'futura today demibold', helvetica, Symbol, arial, sans-serif;font-size:19.0px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:20px 0 0 0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:66.0px;*height:66.0px;color:#333;font-family:'futura today demibold', helvetica, arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:HelveticaNeue, helvetica, arial, sans-serif;background-image:null;text-align:left;",".videoCube.thumbnail_start .thumbBlock_holder":"width:30%;_width:30%;"}},"organic-thumbnails-feed":{"detail-order":"description","detail-order-syndicated":"description","before-detail-order":"title","before-detail-order-syndicated":"title,branding","title-icon":"PUBLISHER_LOGO","read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:black;text-decoration:none;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-description":"max-height:44.0px;*height:44.0px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:27.0px;*height:27.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;",".video-icon-img":"margin:0px 5px 0px 5px;height:30.0px;",".video-label-box.trc-pre-label":"height:54px;",".syndicatedItem .video-label-box.trc-pre-label":"height:54px;",".videoCube .video-label-box.trc-pre-label":"margin:5px 0px 7px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"organic-thumbnails-feed-desktop":{"header":"More Stories","detail-order":"title,category,external-data","format-uploader":'%s',"item-data-filter":
function(data) {
    if(data.category == null){
        data.category = 'News';
    }
    try{
        var getTimeDifference = function(data){
            var fullPublishDate = new Date(1000*data['published-date']),
                fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                articleMonth = fullPublishDate.getMonth(),
                articleDay = fullPublishDate.toString().split(' ')[2],
                articleYear = fullPublishDate.toString().split(' ')[3],
                articleTime = fullPublishDate.toString().split(' ')[4],
                articleHour = articleTime.split(':')[0],
                articleMinute = articleTime.split(':')[1],
                fullCurrentDate = new Date(),
                fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                currentMonth = fullCurrentDate.getMonth(),
                currentDay = fullCurrentDate.toString().split(' ')[2],
                currentYear = fullCurrentDate.toString().split(' ')[3],
                currentTime = fullCurrentDate.toString().split(' ')[4],
                currentHour = currentTime.split(':')[0],
                currentMinute = currentTime.split(':')[1],
                dayDiff,
                hourDiff,
                monthDifference,
                previousMonthTotalDays,
                output;
            if (currentMonth == articleMonth){
                if (currentDay == articleDay) {
                    hourDiff = currentHour - articleHour;
                    if (hourDiff == 0) {
                        output = +hourDiff + ' minutes ago';
                    } else if (hourDiff == 1){
                        output = +hourDiff + ' hour ago';
                    } else {
                        output = +hourDiff + ' hours ago';
                    }
                    return output;
                } else {
                    dayDiff = +currentDay - +articleDay;
                    if (dayDiff == 1) {
                        output = 'Yesterday';
                    } else {
                        output = +dayDiff + ' days ago';
                    }
                    return output;
                }
            } else {
                previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                monthDifference = +currentMonth - +articleMonth;
                currentDay = +currentDay + (+previousMonthTotalDays*monthDifference);
                dayDiff = +currentDay - +articleDay;
                if (dayDiff == 1) {
                    output = 'Yesterday';
                } else {
                    output = +dayDiff + ' days ago';
                }
                return output;
            }
        }
        data['external-data'] = ' | ' + getTimeDifference(data);
    } catch(e){
        __trcError(e);
    }
}
,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":9,"virtualThumbHeight":5}],"__style__":{".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:96.0px;*height:96.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"organic-thumbnails-feed-gallery":{"header":"Featured Gallery","detail-order":"title,category,external-data,uploader","item-renderer":
function(box,data) {
    var uploaderElm = box.getElementsByClassName('video-uploader')[0],
        playDivContainer = document.createElement('span'),
        playImg = document.createElement('img');
    playDivContainer.className = 'play-div';
    playDivContainer.appendChild(playImg);
    playImg.src = 'http://cdn.taboola.com/static/5c/5c4c6a9b-4c65-42cd-8bb2-cf96dcacad19.svg';
    uploaderElm.insertBefore(playDivContainer, uploaderElm.firstChild);
}
,"format-uploader":'%s',"item-data-filter":
function(data) {
    data.uploader = 'View Gallery';
    if(data.category){
        data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
    }
    else {
        data.category = 'News';
    }
    try{
        var getTimeDifference = function(data){
            var fullPublishDate = new Date(1000*data['published-date']),
                fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                articleMonth = fullPublishDate.getMonth(),
                articleDay = fullPublishDate.toString().split(' ')[2],
                articleYear = fullPublishDate.toString().split(' ')[3],
                articleTime = fullPublishDate.toString().split(' ')[4],
                articleHour = articleTime.split(':')[0],
                articleMinute = articleTime.split(':')[1],
                fullCurrentDate = new Date(),
                fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                currentMonth = fullCurrentDate.getMonth(),
                currentDay = fullCurrentDate.toString().split(' ')[2],
                currentYear = fullCurrentDate.toString().split(' ')[3],
                currentTime = fullCurrentDate.toString().split(' ')[4],
                currentHour = currentTime.split(':')[0],
                currentMinute = currentTime.split(':')[1],
                dayDiff,
                hourDiff,
                monthDifference,
                previousMonthTotalDays,
                output;
            if (currentMonth == articleMonth){
                if (currentDay == articleDay) {
                    hourDiff = currentHour - articleHour;
                    if (hourDiff == 0) {
                        output = +hourDiff + ' minutes ago';
                    } else if (hourDiff == 1){
                        output = +hourDiff + ' hour ago';
                    } else {
                        output = +hourDiff + ' hours ago';
                    }
                    return output;
                } else {
                    dayDiff = +currentDay - +articleDay;
                    if (dayDiff == 1) {
                        output = 'Yesterday';
                    } else {
                        output = +dayDiff + ' days ago';
                    }
                    return output;
                }
            } else {
                previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                monthDifference = +currentMonth - +articleMonth;
                currentDay = +currentDay + (+previousMonthTotalDays*monthDifference);
                dayDiff = +currentDay - +articleDay;
                if (dayDiff == 1) {
                    output = 'Yesterday';
                } else {
                    output = +dayDiff + ' days ago';
                }
                return output;
            }
        }
        data['external-data'] = ' | ' + getTimeDifference(data);
    } catch(e){
        __trcError(e);
    }
}
,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":9,"virtualThumbHeight":5}],"__style__":{".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:96.0px;*height:96.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"organic-thumbnails-feed-gallery-mobile":{"header":"Featured Gallery","detail-order":"uploader,title,category,external-data","item-renderer":
function(box,data) {
    var uploaderElm = box.getElementsByClassName('video-uploader')[0],
        playDivContainer = document.createElement('span'),
        playImg = document.createElement('img');
    playDivContainer.className = 'play-div';
    playDivContainer.appendChild(playImg);
    playImg.src = 'http://cdn.taboola.com/static/5c/5c4c6a9b-4c65-42cd-8bb2-cf96dcacad19.svg';
    uploaderElm.insertBefore(playDivContainer, uploaderElm.firstChild);
}
,"format-uploader":'%s',"item-data-filter":
function(data) {
    data.uploader = 'View Gallery';
    if(data.category){
        data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
    }
    else {
        data.category = 'News';
    }
    try{
        var getTimeDifference = function(data){
            var fullPublishDate = new Date(1000*data['published-date']),
                fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                articleMonth = fullPublishDate.getMonth(),
                articleDay = fullPublishDate.toString().split(' ')[2],
                articleYear = fullPublishDate.toString().split(' ')[3],
                articleTime = fullPublishDate.toString().split(' ')[4],
                articleHour = articleTime.split(':')[0],
                articleMinute = articleTime.split(':')[1],
                fullCurrentDate = new Date(),
                fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                currentMonth = fullCurrentDate.getMonth(),
                currentDay = fullCurrentDate.toString().split(' ')[2],
                currentYear = fullCurrentDate.toString().split(' ')[3],
                currentTime = fullCurrentDate.toString().split(' ')[4],
                currentHour = currentTime.split(':')[0],
                currentMinute = currentTime.split(':')[1],
                dayDiff,
                hourDiff,
                monthDifference,
                previousMonthTotalDays,
                output;
            if (currentMonth == articleMonth){
                if (currentDay == articleDay) {
                    hourDiff = currentHour - articleHour;
                    if (hourDiff == 0) {
                        output = +hourDiff + ' minutes ago';
                    } else if (hourDiff == 1){
                        output = +hourDiff + ' hour ago';
                    } else {
                        output = +hourDiff + ' hours ago';
                    }
                    return output;
                } else {
                    dayDiff = +currentDay - +articleDay;
                    if (dayDiff == 1) {
                        output = 'Yesterday';
                    } else {
                        output = +dayDiff + ' days ago';
                    }
                    return output;
                }
            } else {
                previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                monthDifference = +currentMonth - +articleMonth;
                currentDay = +currentDay + (+previousMonthTotalDays*monthDifference);
                dayDiff = +currentDay - +articleDay;
                if (dayDiff == 1) {
                    output = 'Yesterday';
                } else {
                    output = +dayDiff + ' days ago';
                }
                return output;
            }
        }
        data['external-data'] = ' | ' + getTimeDifference(data);
    } catch(e){
        __trcError(e);
    }
}
,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":9,"virtualThumbHeight":5}],"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:25px 0px 14px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"organic-thumbnails-feed-mobile":{"header":"More Stories","detail-order":"title,external-data,uploader,category","item-renderer":
function(box,data) {
    var uploaderElm = box.getElementsByClassName('video-category')[0],
        arrowImg = document.createElement('img');
    arrowImg.src = 'http://cdn.taboola.com/static/e4/e424481e-cd6a-4770-892a-0569c09aecb1.png';
    uploaderElm.appendChild(arrowImg);
}
,"format-uploader":'%s',"item-data-filter":
function(data) {
    if(data['external-data'] == 'USA TODAY'){
        data['external-data'] = 'USA TODAY';
    } else {
        data['external-data'] = window.location.href.split('/')[4];
    }
    data.category = 'Read the full article';
    try{
        var formatAMPM = function (date) {
             var hours = date.getHours();
             var minutes = date.getMinutes();
             var ampm = hours >= 12 ? 'pm' : 'am';
             hours = hours % 12;
             hours = hours ? hours : 12; // the hour '0' should be '12'
             minutes = minutes < 10 ? '0'+minutes : minutes;
             var strTime = hours + ':' + minutes + ' ' + ampm;
             return strTime;
            }
        var getTimeDifference = function(data){
            var fullPublishDate = new Date(1000*data['published-date']),
                fullPublishDate = new Date(fullPublishDate.valueOf() + (fullPublishDate.getTimezoneOffset() - 240) * 60000),
                articleMonth = fullPublishDate.toString().split(' ')[1],
                articleDay = fullPublishDate.toString().split(' ')[2],
                articleYear = fullPublishDate.toString().split(' ')[3],
                articleTime = fullPublishDate.toString().split(' ')[4],
                articleHour = articleTime.split(':')[0],
                articleMinute = articleTime.split(':')[1],
                output;
            output = 'Published ' + formatAMPM(fullPublishDate) + ' EDT ' + articleMonth + ' ' + articleDay + ', ' + articleYear;
            return output;
        }
        data['uploader'] = getTimeDifference(data);
    } catch(e){
        __trcError(e);
    }
}
,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":9,"virtualThumbHeight":5}],"__style__":{".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#212121;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:23px 0px 13px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"organic-thumbnails-feed-mobile-b":{"header":"Most Popular","detail-order":"title,category,external-data","thumbnail-position":"start","item-data-filter":
function(data) {
    if(data.category){
        data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
    }
    else {
        data.category = 'News';
    }
    try{
        var getTimeDifference = function(data){
            var fullPublishDate = new Date(1000*data['published-date']),
                fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                articleMonth = fullPublishDate.getMonth(),
                articleDay = fullPublishDate.toString().split(' ')[2],
                articleYear = fullPublishDate.toString().split(' ')[3],
                articleTime = fullPublishDate.toString().split(' ')[4],
                articleHour = articleTime.split(':')[0],
                articleMinute = articleTime.split(':')[1],
                fullCurrentDate = new Date(),
                fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                currentMonth = fullCurrentDate.getMonth(),
                currentDay = fullCurrentDate.toString().split(' ')[2],
                currentYear = fullCurrentDate.toString().split(' ')[3],
                currentTime = fullCurrentDate.toString().split(' ')[4],
                currentHour = currentTime.split(':')[0],
                currentMinute = currentTime.split(':')[1],
                dayDiff,
                hourDiff,
                monthDifference,
                previousMonthTotalDays,
                output;
            if (currentMonth == articleMonth){
                if (currentDay == articleDay) {
                    hourDiff = currentHour - articleHour;
                    if (hourDiff == 0) {
                        output = +hourDiff + ' minutes ago';
                    } else if (hourDiff == 1){
                        output = +hourDiff + ' hour ago';
                    } else {
                        output = +hourDiff + ' hours ago';
                    }
                    return output;
                } else {
                    dayDiff = +currentDay - +articleDay;
                    if (dayDiff == 1) {
                        output = 'Yesterday';
                    } else {
                        output = +dayDiff + ' days ago';
                    }
                    return output;
                }
            } else {
                previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                monthDifference = +currentMonth - +articleMonth;
                currentDay = +currentDay + (+previousMonthTotalDays*monthDifference);
                dayDiff = +currentDay - +articleDay;
                if (dayDiff == 1) {
                    output = 'Yesterday';
                } else {
                    output = +dayDiff + ' days ago';
                }
                return output;
            }
        }
        data['external-data'] = ' | ' + getTimeDifference(data);
    } catch(e){
        __trcError(e);
    }
}
,"widget-creator-layout":"autowidget-template-stream","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":3,"cells":1,"virtualThumbWidth":1,"virtualThumbHeight":1}],"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:66.0px;*height:66.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:25px 0px 14px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".videoCube.thumbnail_start .thumbBlock_holder":"width:25%;_width:25%;",".videoCube .video-label-box.trc-pre-label":"margin:;"}},"organic-thumbnails-feed-stream":{"header":"Most Popular","detail-order":"title,category","thumbnail-position":"start","item-data-filter":
function(data) {
    if(data.category){
        data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
    }
    else {
        data.category = 'News';
    }
}
,"widget-creator-layout":"autowidget-template-stream","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":3,"cells":1,"virtualThumbWidth":9,"virtualThumbHeight":5}],"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:66.0px;*height:66.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:44.0px;*height:44.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".videoCube.thumbnail_start .thumbBlock_holder":"width:25%;_width:25%;",".videoCube .video-label-box.trc-pre-label":"margin:;"}},"organic-thumbnails-feed-videos":{"header":"Featured Video","detail-order":"title,category,external-data,uploader","item-renderer":
function(box,data) {
    var uploaderElm = box.getElementsByClassName('video-uploader')[0],
        playDivContainer = document.createElement('span'),
        playImg = document.createElement('img');
    playDivContainer.className = 'play-div';
    playDivContainer.appendChild(playImg);
    playImg.src = 'http://cdn.taboola.com/static/e5/e5e3b639-cb5f-45eb-8f6e-8073e4c31dac.png';
    uploaderElm.insertBefore(playDivContainer, uploaderElm.firstChild);
}
,"format-uploader":'%s',"item-data-filter":
function(data) {
    if(data.duration){
        var time = data.duration,
            minutes = Math.floor(time / 60),
            seconds = (time - minutes * 60).toString(),
            hours = Math.floor(time / 3600);
        if (seconds.length == 1){
            seconds = '0' + seconds;
        }
        // data.uploader = 'Play | 0' + minutes + ':' + seconds;
    }
    if(data.category){
        data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
    }
    else {
        data.category = 'News';
    }
    try{
        var getTimeDifference = function(data){
            var fullPublishDate = new Date(1000*data['published-date']),
                fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                articleMonth = fullPublishDate.getMonth(),
                articleDay = fullPublishDate.toString().split(' ')[2],
                articleYear = fullPublishDate.toString().split(' ')[3],
                articleTime = fullPublishDate.toString().split(' ')[4],
                articleHour = articleTime.split(':')[0],
                articleMinute = articleTime.split(':')[1],
                fullCurrentDate = new Date(),
                fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                currentMonth = fullCurrentDate.getMonth(),
                currentDay = fullCurrentDate.toString().split(' ')[2],
                currentYear = fullCurrentDate.toString().split(' ')[3],
                currentTime = fullCurrentDate.toString().split(' ')[4],
                currentHour = currentTime.split(':')[0],
                currentMinute = currentTime.split(':')[1],
                dayDiff,
                hourDiff,
                monthDifference,
                previousMonthTotalDays,
                output;
            if (currentMonth == articleMonth){
                if (currentDay == articleDay) {
                    hourDiff = currentHour - articleHour;
                    if (hourDiff == 0) {
                        output = +hourDiff + ' minutes ago';
                    } else if (hourDiff == 1){
                        output = +hourDiff + ' hour ago';
                    } else {
                        output = +hourDiff + ' hours ago';
                    }
                    return output;
                } else {
                    dayDiff = +currentDay - +articleDay;
                    if (dayDiff == 1) {
                        output = 'Yesterday';
                    } else {
                        output = +dayDiff + ' days ago';
                    }
                    return output;
                }
            } else {
                previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                monthDifference = +currentMonth - +articleMonth;
                currentDay = +currentDay + (+previousMonthTotalDays*monthDifference);
                dayDiff = +currentDay - +articleDay;
                if (dayDiff == 1) {
                    output = 'Yesterday';
                } else {
                    output = +dayDiff + ' days ago';
                }
                return output;
            }
        }
        data['external-data'] = ' | ' + getTimeDifference(data);
    } catch(e){
        __trcError(e);
    }
}
,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":9,"virtualThumbHeight":5}],"__style__":{".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:96.0px;*height:96.0px;color:#212121;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"organic-thumbnails-feed-videos-mobile":{"header":"Featured Video","detail-order":"uploader,title,category,external-data","item-renderer":
function(box,data) {
    var uploaderElm = box.getElementsByClassName('video-uploader')[0],
        playDivContainer = document.createElement('span'),
        playImg = document.createElement('img');
    playDivContainer.className = 'play-div';
    playDivContainer.appendChild(playImg);
    playImg.src = 'http://cdn.taboola.com/static/e5/e5e3b639-cb5f-45eb-8f6e-8073e4c31dac.png';
    uploaderElm.insertBefore(playDivContainer, uploaderElm.firstChild);
}
,"format-uploader":'%s',"item-data-filter":
function(data) {
    if(data.duration){
        var time = data.duration,
            minutes = Math.floor(time / 60),
            seconds = (time - minutes * 60).toString(),
            hours = Math.floor(time / 3600);
        if (seconds.length == 1){
            seconds = '0' + seconds;
        }
        // data.uploader = 'Play | 0' + minutes + ':' + seconds;
    }
    if(data.category){
        data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
    }
    else {
        data.category = 'News';
    }
    try{
        var getTimeDifference = function(data){
            var fullPublishDate = new Date(1000*data['published-date']),
                fullPublishDate = new Date(fullPublishDate.valueOf() + fullPublishDate.getTimezoneOffset() * 60000),
                articleMonth = fullPublishDate.getMonth(),
                articleDay = fullPublishDate.toString().split(' ')[2],
                articleYear = fullPublishDate.toString().split(' ')[3],
                articleTime = fullPublishDate.toString().split(' ')[4],
                articleHour = articleTime.split(':')[0],
                articleMinute = articleTime.split(':')[1],
                fullCurrentDate = new Date(),
                fullCurrentDate = new Date(fullCurrentDate.valueOf() + fullCurrentDate.getTimezoneOffset() * 60000),
                currentMonth = fullCurrentDate.getMonth(),
                currentDay = fullCurrentDate.toString().split(' ')[2],
                currentYear = fullCurrentDate.toString().split(' ')[3],
                currentTime = fullCurrentDate.toString().split(' ')[4],
                currentHour = currentTime.split(':')[0],
                currentMinute = currentTime.split(':')[1],
                dayDiff,
                hourDiff,
                monthDifference,
                previousMonthTotalDays,
                output;
            if (currentMonth == articleMonth){
                if (currentDay == articleDay) {
                    hourDiff = currentHour - articleHour;
                    if (hourDiff == 0) {
                        output = +hourDiff + ' minutes ago';
                    } else if (hourDiff == 1){
                        output = +hourDiff + ' hour ago';
                    } else {
                        output = +hourDiff + ' hours ago';
                    }
                    return output;
                } else {
                    dayDiff = +currentDay - +articleDay;
                    if (dayDiff == 1) {
                        output = 'Yesterday';
                    } else {
                        output = +dayDiff + ' days ago';
                    }
                    return output;
                }
            } else {
                previousMonthTotalDays = new Date(currentYear, articleMonth + 1, 0).toString().split(' ')[2];
                monthDifference = +currentMonth - +articleMonth;
                currentDay = +currentDay + (+previousMonthTotalDays*monthDifference);
                dayDiff = +currentDay - +articleDay;
                if (dayDiff == 1) {
                    output = 'Yesterday';
                } else {
                    output = +dayDiff + ' days ago';
                }
                return output;
            }
        }
        data['external-data'] = ' | ' + getTimeDifference(data);
    } catch(e){
        __trcError(e);
    }
}
,"responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":9,"virtualThumbHeight":5}],"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:25px 0px 14px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"organic-thumbnails-rr":{"header":".","thumbnail-position":"start","attribution-position":"top","widget-creator-layout":"autowidget-template-stream","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":3,"cells":1,"virtualThumbWidth":7,"virtualThumbHeight":5}],"read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:#333;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:arial, sans-serif;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#fff;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:66.0px;*height:66.0px;color:#333;font-family:arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:arial, sans-serif;background-image:null;text-align:left;",".videoCube .video-label-box.trc-pre-label":"margin:;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:arial, sans-serif;background-image:null;text-align:left;"}},"organic-thumbs-feed-01":{"detail-order":"title,description,branding","detail-order-syndicated":"title,description,branding","read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:black;text-decoration:none;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-description":"max-height:44.0px;*height:44.0px;color:black;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:54.0px;*height:54.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"organic-thumbs-feed-01-a-bpcv":{"navigation-type":"scrolling","detail-order":"title,branding","responsive-rules":[{"minWidth":0,"margin":{"v":1.5,"h":1.5},"rows":1,"cells":4,"virtualThumbWidth":16,"virtualThumbHeight":9}],"read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);text-decoration:none;",".video-description":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:5px 0px 2px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"organic-thumbs-feed-01-bpcv":{"detail-order":"title,description,branding","detail-order-syndicated":"title,description,branding","read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:54.0px;*height:54.0px;color:rgba(0,0,0,0.87);text-decoration:none;",".video-description":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:normal;max-height:44.0px;*height:44.0px;color:rgba(0,0,0,0.87);text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-description":"max-height:44.0px;*height:44.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:normal;line-height:22.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:54.0px;*height:54.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"organic-thumbs-feed-01-c":{"detail-order":"title,branding","responsive-rules":[{"minWidth":0,"maxWidth":480,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9},{"minWidth":481,"margin":{"v":2,"h":2},"rows":1,"cells":2,"virtualThumbWidth":16,"virtualThumbHeight":9}],"read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 0px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"organic-thumbs-feed-01-c-bpcv":{"detail-order":"title,branding","responsive-rules":[{"minWidth":0,"maxWidth":480,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9},{"minWidth":481,"margin":{"v":2,"h":2},"rows":1,"cells":2,"virtualThumbWidth":16,"virtualThumbHeight":9}],"read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);text-decoration:none;",".video-description":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 0px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"text-links-a":{"item-renderer":function(box, data) {
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
,"thumbnail-position":"none","detail-order-syndicated":"branding,title","format-syndicator":function(s){return s;},"rows":1,"widget-creator-layout":"autowidget-template-text-links","widget-creator-revision":"8251431","responsive-rules":[{"minWidth":0,"maxWidth":960,"margin":{"v":2,"h":2},"rows":2,"cells":2},{"minWidth":961,"margin":{"v":2,"h":2},"rows":4,"cells":1}],"min-width-for-disclosure":495,"min-width-for-attribution":625,"mode-has-adchoice":false,"__style__":{".video-title":"font-family:Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:normal;max-height:40.0px;*height:40.0px;color:#333333;text-decoration:none;",".trc_rbox_div":"width:auto;_width:99%;height:auto;border-width:0;padding:0;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0;",".videoCube":"width:48%;_width:48%;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0px 3px 1px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;","":"width:auto;_width:auto;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:0px 0px 0px 0px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:40.0px;*height:40.0px;color:#000000;font-family:Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:Arial,sans-serif;background-image:null;text-align:left;"}},"thumbnails-a":{"header":"AD CONTENT","attribution-position":"top","widget-creator-revision":"7680361","responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":7,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"min-width-for-attribution":200,"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:normal;max-height:96.0px;*height:96.0px;color:#333;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans';",".trc_rbox_header":"font-family:'Unify Sans';font-size:19.0px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 15px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0 0 20px 0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:#333;font-family:'Unify Sans';font-size:18.0px;line-height:24.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:'Unify Sans';background-image:null;text-align:left;",".videoCube.thumbnail_start .thumbBlock_holder":"width:30%;_width:30%;"}},"thumbnails-a-amp":{"header":"AD CONTENT","attribution-position":"top","widget-creator-revision":"7680361","responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":7,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":3,"virtualThumbHeight":2}],"min-width-for-attribution":200,"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:normal;max-height:96.0px;*height:96.0px;color:#333;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:'futura today demibold', helvetica, arial, sans-serif;",".trc_rbox_header":"font-family:'futura today demibold', helvetica, Symbol, arial, sans-serif;font-size:19.0px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 15px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0 0 20px 0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:#333;font-family:'futura today demibold', helvetica, arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:HelveticaNeue, helvetica, arial, sans-serif;background-image:null;text-align:left;",".videoCube.thumbnail_start .thumbBlock_holder":"width:30%;_width:30%;"}},"thumbnails-b":{"header":"AD CONTENT","attribution-position":"top","rows":1,"widget-creator-revision":"7796304","responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":1,"cells":6,"virtualThumbWidth":6,"virtualThumbHeight":5},{"minWidth":2,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#333;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:helvetica, arial, sans-serif;font-size:14.0px;font-weight:bold;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:48.0px;*height:48.0px;color:#333;font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;"}},"thumbnails-c":{"header":"AD CONTENT","attribution-position":"top","widget-creator-revision":"7741636","responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":1,"cells":4,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"min-width-for-attribution":200,"__style__":{".video-title":"font-family:'Unify Sans Demi', helvetica, arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:rgba(0,0,0,.87);text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:'Unify Sans Demi', helvetica, arial, sans-serif;font-size:16.0px;font-weight:normal;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:57.0px;*height:57.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans Demi', helvetica, arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans Regular', helvetica, arial, sans-serif;background-image:null;text-align:left;"}},"thumbnails-d":{"header":"AD CONTENT","attribution-position":"top","widget-creator-revision":"7741581","responsive-rules":[{"minWidth":0,"maxWidth":1,"margin":{"v":2,"h":2},"rows":1,"cells":4,"virtualThumbWidth":2,"virtualThumbHeight":1},{"minWidth":2,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"min-width-for-attribution":200,"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#FFFFFF;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:'Futura Today Bold',sans-serif;font-size:16.0px;font-weight:normal;text-decoration:none;color:#FFFFFF;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:57.0px;*height:57.0px;color:#FFFFFF;font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#DDDDDD;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"thumbnails-e":{"header":"Ad Content","attribution-position":"top","widget-creator-revision":"13618466","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":3,"virtualThumbHeight":2}],"disclosure-position":"top","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:normal;max-height:96.0px;*height:96.0px;color:#222222;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans';",".trc_rbox_header":"font-family:'Unify Sans';font-size:14.0px;font-weight:bold;text-decoration:none;color:#222222;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:#222222;font-family:'Unify Sans';font-size:18.0px;line-height:24.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#666666;font-size:12.0px;font-weight:normal;text-decoration:none;font-family:'Unify Sans';background-image:null;text-align:left;"}},"thumbnails-f":{"header":"MORE FROM THE WEB","thumbnail-position":"start","detail-order-syndicated":"branding,title","widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"7731339","responsive-rules":[{minWidth:0,margin:{v:2,h:2},rows:2,cells:1,virtualThumbWidth:1,virtualThumbHeight:1}],"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:12.0px;line-height:16.0px;font-weight:normal;max-height:48.0px;*height:48.0px;color:#000000;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:'Futura Today Bold', sans-serif;font-size:13.0px;font-weight:normal;text-decoration:none;color:#2c2c2c;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 12px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;","":"width:300px;_width:300px;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:15px 20px 15px 20px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:32.0px;*height:32.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:12.0px;line-height:16.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",".videoCube.thumbnail_start .thumbBlock_holder":"width:20%;_width:20%;"}},"thumbnails-feed-a":{"header":"You May Like","responsive-rules":[{"minWidth":0,"maxWidth":480,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9},{"minWidth":481,"margin":{"v":2,"h":2},"rows":1,"cells":2,"virtualThumbWidth":16,"virtualThumbHeight":9}],"disclosure-position":"bottom","read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;max-height:66.0px;*height:66.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:20.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:5px 0px 5px 5px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:44.0px;*height:44.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:22.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"thumbnails-feed-desktop":{"header":"AD CONTENT","widget-creator-revision":"16277100","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":2,"virtualThumbWidth":16,"virtualThumbHeight":9}],"disclosure-position":"bottom","__style__":{".video-title":"font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",".trc_rbox_header":"font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:44.0px;*height:44.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"thumbnails-feed-mobile-e":{"header":"AD CONTENT","attribution-text":"Sponsored by Taboola","widget-creator-revision":"13616469","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":5,"virtualThumbHeight":3}],"min-width-for-attribution":300,"disclosure-position":"bottom","__style__":{".video-title":"font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:600;max-height:76.0px;*height:76.0px;color:rgba(0,0,0,.87);text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",".trc_rbox_header":"font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:57.0px;*height:57.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:600;text-decoration:none;",".syndicatedItem .branding":"color:rgba(0,0,0,.53);font-size:14.0px;font-weight:600;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;"}},"thumbnails-feed-original":{"widget-creator-revision":"16277100","responsive-rules":[{"minWidth":0,"maxWidth":480,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":3,"virtualThumbHeight":2},{"minWidth":481,"margin":{"v":2,"h":2},"rows":2,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"disclosure-position":"bottom","__style__":{".video-title":"font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",".trc_rbox_header":"font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:rgba(0,0,0,.87);border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:66.0px;*height:66.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"thumbnails-feed-stream":{"header":"AD CONTENT","thumbnail-position":"start","widget-creator-layout":"autowidget-template-stream","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":9,"virtualThumbHeight":5}],"disclosure-position":"bottom","disclosure-alignment":"right","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:66.0px;*height:66.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14.0px;line-height:22px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', Helvetica, Arial, sans-serif;background-image:null;text-align:left;",".videoCube.thumbnail_start .thumbBlock_holder":"width:49%;_width:49%;",".videoCube .video-label-box.trc-pre-label":"margin:;"}},"thumbnails-g":{"header":"AD CONTENT","list-suffix":function(itemsContainer, data) {
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
,"attribution-position":"top","item-data-filter":function(data) {
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
},"detail-order-syndicated":"branding,title","widget-creator-revision":"7646288","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"__style__":{".video-title":"font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;max-height:77px;*height:77px;color:#fff;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:'Futura Today Normal',Arial,Helvetica,sans-serif;",".trc_rbox_header":"font-family:'Futura Today Bold',arial,sans-serif;font-size:15px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#e6e6e6;padding:0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube .thumbnail-overlay":"background-image:url(https://cdn.taboola.com/static/12/12d068d7-0bac-49f3-8bb8-148effd99c7b.png);background-position:5% 5%;",".trc_rbox_border_elm":"border-color:#e6e6e6;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#D7D7D7;font-size:12.0px;font-weight:normal;text-decoration:none;font-family:Helvetica,Arial,sans-serif;background-image:null;text-align:left;"}},"thumbnails-k":{"header":"MORE STORIES","detail-order":"title,category,published-date","list-suffix":function(itemsContainer, data) {
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
},"item-data-filter":function(data) {
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
},"widget-creator-revision":"7645821","responsive-rules":[{"minWidth":0,"margin":{"v":3,"h":3},"rows":2,"cells":2,"virtualThumbWidth":185,"virtualThumbHeight":140}],"disclosure-position":"top","mode-has-adchoice":false,"__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:normal;max-height:72.0px;*height:72.0px;color:#fff;text-decoration:none;",".trc_rbox_div":"width:auto;_width:99%;height:410px;border-width:0;padding:20px 0 0 0;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:'Futura Today Bold',sans-serif;font-size:16.0px;font-weight:normal;text-decoration:none;color:#333;border-width:0 0 1px 0;background:transparent;border-style:solid;border-color:#e6e6e6;padding:0 0 10px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube .thumbnail-overlay":"background-image:url(https://cdn.taboola.com/static/12/12d068d7-0bac-49f3-8bb8-148effd99c7b.png);background-position:5% 5%;",".trc_rbox_border_elm":"border-color:#e6e6e6;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:69.0px;*height:69.0px;color:#fff;font-family:Arial, Helvetica, sans-serif;font-size:19.0px;line-height:23.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"thumbnails-p":{"header":"AD CONTENT","thumbnail-position":"start","widget-creator-layout":"autowidget-template-stream","widget-creator-revision":"14749859","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":1,"virtualThumbWidth":8,"virtualThumbHeight":8}],"mode-has-adchoice":false,"__style__":{".video-title":"font-family:'Futura Today DemiBold',arial,sans-serif;font-size:15.0px;line-height:20.0px;font-weight:normal;max-height:80.0px;*height:80.0px;color:#333;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Futura Today Bold',arial,sans-serif;",".trc_rbox_header":"font-family:'Futura Today Bold',arial,sans-serif;font-size:15.0px;font-weight:bold;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-title":"max-height:60.0px;*height:60.0px;color:#333;font-family:'Futura Today DemiBold',arial,sans-serif;font-size:15.0px;line-height:20.0px;font-weight:normal;text-decoration:none;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:normal;text-decoration:none;font-family:HelveticaNeue,arial,sans-serif;background-image:null;text-align:left;",".videoCube .video-label-box.trc-pre-label":"margin:;"}},"thumbnails-q-abp":{"header":"You May Like","attribution-position":"top","widget-creator-revision":"12501185","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"disclosure-position":"top","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;max-height:76.0px;*height:76.0px;color:#000000;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:15.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0 0 6px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;","":"width:300px;_width:300px;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:5px 5px 5px 5px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:57.0px;*height:57.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:14.0px;line-height:19.0px;font-weight:bold;text-decoration:none;"}},"thumbnails-r":{"header":"AD CONTENT","attribution-position":"top","item-data-filter":function(data) {
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
},"widget-creator-revision":"13150537","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":2,"cells":3}],"disclosure-position":"top","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#000000;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".trc_rbox_header":"font-family:'Futura Today Bold', sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0 0 1px 0;background:transparent;border-style:none;border-color:#e6e6e6;padding:0 0 6px 0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px 1px 1px 1px;border-color:#D6D5D3;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:NONE;",".videoCube .thumbnail-overlay":"background-image:url(http://cdn.taboola.com/libtrc/static/thumbnails/da6eb17d679d2182809c72530d4e41b8.png);background-position:5% 5%;",".trc_rbox_border_elm":"border-color:#e6e6e6;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px 1px 1px 1px;border-style:NONE;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:60.0px;*height:60.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:16.0px;line-height:20.0px;font-weight:bold;text-decoration:none;"}},"thumbnails-s":{"header":"AD CONTENT","list-suffix":function(itemsContainer, data) {
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
,"attribution-position":"top","item-data-filter":function(data) {
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
},"detail-order-syndicated":"branding,title","widget-creator-revision":"7646288","responsive-rules":[{"minWidth":0,"margin":{"v":2,"h":2},"rows":1,"cells":3,"virtualThumbWidth":1,"virtualThumbHeight":1}],"__style__":{".video-title":"font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;max-height:77px;*height:77px;color:#fff;text-decoration:none;",".videoCube .video-label-box":"margin-left:0;margin-right:0px;",".video-label,.sponsored,.sponsored-url":"font-family:'Futura Today Normal',Arial,Helvetica,sans-serif;",".trc_rbox_header":"font-family:'Futura Today Bold',arial,sans-serif;font-size:15px;font-weight:normal;text-decoration:none;color:#333;border-width:0;background:transparent;border-style:none;border-color:#e6e6e6;padding:0;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:1px;border-color:#D6D5D3;padding:0;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:none;",".videoCube .thumbnail-overlay":"background-image:url(https://cdn.taboola.com/static/12/12d068d7-0bac-49f3-8bb8-148effd99c7b.png);background-position:5% 5%;",".trc_rbox_border_elm":"border-color:#e6e6e6;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#D6D5D3;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:1px;border-style:none;",".videoCube.syndicatedItem .video-label-box":"margin-left:0px;",".syndicatedItem .video-title":"max-height:72.0px;*height:72.0px;color:#fff;font-family:Helvetica,Arial,sans-serif;font-size:14.0px;line-height:18.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:#D7D7D7;font-size:12.0px;font-weight:normal;text-decoration:none;font-family:Helvetica,Arial,sans-serif;background-image:null;text-align:left;"}},"thumbnails-u":{"header":"Ad Content","attribution-position":"top","widget-creator-revision":"16277100","responsive-rules":[{"minWidth":0,"maxWidth":480,"margin":{"v":2,"h":2},"rows":4,"cells":1,"virtualThumbWidth":3,"virtualThumbHeight":2},{"minWidth":481,"margin":{"v":2,"h":2},"rows":2,"cells":3,"virtualThumbWidth":6,"virtualThumbHeight":5}],"disclosure-position":"top","__style__":{".video-title":"font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;max-height:88.0px;*height:88.0px;color:rgba(0,0,0,.87);text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans Demi', helvetica, arial, sans-serif;",".trc_rbox_header":"font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:rgba(0,0,0,.87);border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 6px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:11px;text-decoration:none;",".syndicatedItem .video-title":"max-height:66.0px;*height:66.0px;color:rgba(0,0,0,.87);font-family:'Unify Sans', helvetica, arial, sans-serif;font-size:14.0px;line-height:22.0px;font-weight:bold;text-decoration:none;",".syndicatedItem .branding":"color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans', helvetica, arial, sans-serif;background-image:null;text-align:left;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 5px 0px;"}},"thumbs-feed-01":{"disclosure-link-text-sponsored":"Sponsored","disclosure-position":"after_branding","read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:81.0px;*height:81.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 2px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:54.0px;*height:54.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"thumbs-feed-01-a":{"responsive-rules":[{"minWidth":0,"maxWidth":480,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9},{"minWidth":481,"margin":{"v":2,"h":2},"rows":1,"cells":2,"virtualThumbWidth":16,"virtualThumbHeight":9}],"disclosure-link-text-sponsored":"Sponsored","disclosure-position":"after_branding","read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:#000000;text-decoration:none;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:5px 0px 5px 5px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:48.0px;*height:48.0px;color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"thumbs-feed-01-a-bpcv":{"responsive-rules":[{"minWidth":0,"maxWidth":480,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9},{"minWidth":481,"margin":{"v":2,"h":2},"rows":1,"cells":2,"virtualThumbWidth":16,"virtualThumbHeight":9}],"disclosure-link-text-sponsored":"Sponsored","disclosure-position":"after_branding","read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;max-height:72.0px;*height:72.0px;color:rgba(0,0,0,0.87);text-decoration:none;",".video-description":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:5px 0px 5px 5px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:48.0px;*height:48.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:18.0px;line-height:24.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"thumbs-feed-01-bpcv":{"disclosure-link-text-sponsored":"Sponsored","disclosure-position":"after_branding","read-more-mode-devices":"smart_phone","__style__":{".video-title":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;max-height:81.0px;*height:81.0px;color:rgba(0,0,0,0.87);text-decoration:none;",".video-description":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:19.0px;font-weight:normal;max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);text-decoration:none;",".video-label,.sponsored,.sponsored-url":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;",".trc_rbox_header":"font-family:Arial, Helvetica, sans-serif;font-size:100%;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:0px 0px 2px 0px;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;line-height:19.0px;text-decoration:none;",".syndicatedItem .video-title":"max-height:54.0px;*height:54.0px;color:rgba(0,0,0,0.87);font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:20.0px;line-height:27.0px;font-weight:bold;text-decoration:none;",".video-label-box.trc-pre-label":"height:0px;",".syndicatedItem .video-label-box.trc-pre-label":"height:0px;",".videoCube .video-label-box.trc-pre-label":"margin:0px 0px 0px 0px;",".branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;"}},"__common__":{"syndicated-attribution-tooltip":"","image-url-prefix":null,"read-more-cutoff-length-from-anchor-element":30,"syndicated-static-text":"","expand-animation-duration":1000,"required-attributes":"none","change-url":function(url){return url;},"loading-animation-url":"hide","pager-style-active-image":"","syndicated-static-text-position":"top-right","pager-button-location":"pager","player-detail-order":"title,description","mode-adc-config":null,"slider-scroll-ref-element":function () { return window; },"slider-close-btn-color":"#FFF","details-inline-with-title":"","thumbnail-height":"5","slider-slide-from":"bottom","shade-scroll":false,"auto-size":false,"pager-button-inactive-image":"","has-thumbs-image-lazy-load":false,"visibility-constraints":{},"disclosure-alignment":"left","adchoice-large":false,"responsive-rules":[{"minWidth":0,"maxWidth":480,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":16,"virtualThumbHeight":9},{"minWidth":481,"margin":{"v":2,"h":2},"rows":1,"cells":1,"virtualThumbWidth":2,"virtualThumbHeight":1}],"layout-template":"Horizontal 4","format-description":'%s',"ios-sc-link-target-mode":null,"gam-allow-trc-ads":false,"read-more-config":null,"thumbs-image-lazy-load-margins":"600px 1500px","player-container-id":"trc_Embed_Container_Id","image-min-width":100,"before-detail-order":"","read-more-caption":"","template":"Default","slider-close-btn-font-size":"30px","read-more-box-selector":"","pager-position":"start","widget-creator-layout":"autowidget-template-static","format-uploader":'User: %s',"disclosure-position":"none","image-size-factor":1.2,"format-external-data":'%s',"title-icon":"NONE","lightbox-display-title":true,"has-image-lazy-load":false,"player-thumbnail-height":"200","header-right":"No Header","gif-url-prefix":null,"slider-close-btn-size":"24px","navigation-type":"none","cyclical-paging":false,"tokenize-strategy":"word","adchoice-target-url":"","disclosure-link-text-hybrid":"Promoted Links","branding-separator":"|","format-duration":'%s',"pager-button-active-image":"","after-visible":function(data) {},"player-thumbnail-width":"75","color-scheme":"White","slider-z-index":2500000,"rtb-image-url-prefix":null,"slider-transition-duration":600,"use-css-important":true,"smart-ellipsis":false,"header-icon":"NONE","image-dpr-factor":2,"item-renderer":function(box,data) { if (typeof window.trc_itemRenderer == 'function') window.trc_itemRenderer(document.createElement('div'),data, false);},"read-more-minimized-size":800,"pager-button-hover-image":"","use-browser-line-clamp":true,"slider":false,"render-player-info":false,"item-data-filter":function(data) {},"mode-has-adchoice":true,"player-embed-code":function(){return '';},"image-allowed-ratio-diff":0.029,"auto-advance":"-1","image-min-dimension":100,"auto-scroll":"none","use-cdn-recommendations":false,"format-category":'%s',"list-size":10,"enable-read-more":false,"auto-advance-animation":"down","format-syndicator":function(s){ return s; },"auto-size-rules":[{"minWc":120,"maxWc":349,"minWsRange":8,"maxWsRange":8,"n":1},{"minWc":350,"maxWc":499,"minWsRange":8,"maxWsRange":9,"n":2},{"minWc":500,"maxWc":749,"minWsRange":8,"maxWsRange":10,"n":3},{"minWc":750,"maxWc":999,"minWsRange":8,"maxWsRange":11,"n":4},{"minWc":1000,"maxWc":1249,"minWsRange":7,"maxWsRange":11,"n":5},{"minWc":1250,"maxWc":1499,"minWsRange":6,"maxWsRange":11,"n":6},{"minWc":1500,"maxWc":1749,"minWsRange":6,"maxWsRange":12,"n":7},{"minWc":1750,"maxWc":1920,"minWsRange":6,"maxWsRange":13,"n":8}],"carousel-min-items":1.33,"p-video-overlay":true,"attribution-text":"by Taboola","slider-transition-delay":200,"popup-custom-url":"","format":{ 'views': 'Views: %s', 'uploader': 'By: %s','duration': 'Duration: %s','rating': 'Rating: %s'},"mode-start":function(data) {},"auto-syndicated-attribution":true,"pager-style-hover-image":"","adchoice-position":"none","syndicated-attribution-position":"bottom-right","disclosure-link-text-sponsored":"Sponsored Links","mode-has-userx":true,"attribution-position":"none","slider-background-color":"#666","pager-style-inactive-image":"","image-size-round":20,"min-width-for-attribution":325,"detail-order-ad":"title","style-template":"Light","header":"No Header","read-more-cutoff-length-type":"BELOW","tabbed":false,"read-more-threshold":1100,"thumbnail-width":"6","min-width-for-disclosure":225,"detail-order":"title","image-max-dimension":1500,"format-published-date":function(d){return this.dateFormatISO(d, false);},"format-number":function(num){var out="",m;while(num.length>3&&(m=num.match(/\d{3}\s*$/))){out=m.toString().replace(/\s+/,"")+","+out;num=num.replace(/\d{3}\s*$/,"", false);}out=num+","+out;return out.replace(/,$/,"");},"mode-is-responsive":true,"images-radius":"0","expandable":false,"remove-url-playvideo-behavior":false,"expand-animation-max-height":1000,"responsive-extra-columns":1,"title":"Related Videos","header-icon-url":"","hide-disclosure-when-no-place":false,"thumbnail-position-ad":"inherit","format-title":'%s',"pager-button-style":"<span class=\"pager-cont\">&laquo;</span>|<span class=\"pager-cont\">&raquo;</span>","link-target":"normal","widget-creator-revision":"-1","component-id":"rbox-blended","hide-attribution-when-no-place":false,"pager-type-style":"numbers","list-suffix":function(internalc, myorigin) {},"detail-order-syndicated":"title,branding","title-icon-url":"","read-more-cutoff-from-type":"ARTICLE","impl-class":"TRCRBox","has-expand-animation":false,"disclosure-link-text-organic":"","orientation":"horizontal","quantcast-label":"","syndicated-attribution":"","image-lazy-load-space":200,"sponsored-location":"top","__keys__":['component-id','tabbed','header','expandable','list-size','orientation','navigation-type','auto-scroll','loading-animation-url','thumbnail-width','thumbnail-height','format','detail-order','icons','format-number','change-url','list-suffix','item-renderer','title','format-title','format-duration','format-description','format-category','format-uploader','format-views','format-rating','format-published-date','sponsored-location','thumbnail-position','color-scheme','pager-button-style','pager-position','pager-type-style','template','pager-button-location','pager-button-active-image','pager-button-inactive-image','pager-button-hover-image','pager-style-active-image','pager-style-inactive-image','pager-style-hover-image','lightbox-display-title','detail-order-ad','layout-template','style-template','attribution-position','shade-scroll','attribution-text','required-attributes','auto-advance-animation','auto-advance','format-external-data','item-data-filter','gam-allow-trc-ads','thumbnail-position-ad','impl-class','player-embed-code','player-container-id','render-player-info','player-thumbnail-width','player-thumbnail-height','player-detail-order','use-cdn-recommendations','syndicated-attribution','syndicated-attribution-tooltip','syndicated-attribution-position','detail-order-syndicated','format-syndicator','syndicated-static-text','syndicated-static-text-position','quantcast-label','cyclical-paging','after-visible','link-target','auto-syndicated-attribution','remove-url-playvideo-behavior','auto-size','auto-size-rules','rows','widget-creator-layout','widget-creator-revision','details-inline-with-title','mode-is-responsive','responsive-extra-columns','responsive-rules','image-lazy-load-space','has-image-lazy-load','use-css-important','image-url-prefix','image-size-factor','image-min-width','image-size-round','image-max-dimension','image-min-dimension','mode-has-userx','min-width-for-disclosure','min-width-for-attribution','hide-disclosure-when-no-place','hide-attribution-when-no-place','disclosure-link-text-sponsored','disclosure-link-text-hybrid','disclosure-link-text-organic','disclosure-position','header-right','use-browser-line-clamp','use-dpr-images','slider','slider-slide-from','slider-min-effective-scroll-size','slider-transition-duration','slider-transition-delay','slider-background-color','slider-close-btn-font-size','slider-close-btn-size','slider-close-btn-color','slider-scroll-ref-element','slider-z-index','mode-adc-config','images-radius','visibility-constraints','ios-sc-link-target-mode','has-expand-animation','expand-animation-duration','expand-animation-max-height','read-more-config','enable-read-more','mode-has-adchoice','adchoice-large','adchoice-position','adchoice-target-url','read-more-box-selector','read-more-threshold','read-more-minimized-size','read-more-caption','mode-start','smart-ellipsis','tokenize-strategy','rtb-image-url-prefix','image-dpr-factor','image-allowed-ratio-diff','popup-custom-url','carousel-min-items','header-icon-url','before-detail-order','title-icon-url','before-detail-order-syndicated','header-icon','title-icon','has-thumbs-image-lazy-load','thumbs-image-lazy-load-margins','read-more-cutoff-from-type','read-more-anchor-selector','read-more-cutoff-length-type','read-more-cutoff-length-from-anchor-element','read-more-mode-devices','branding-separator','disclosure-alignment','p-video-overlay','gif-url-prefix'],"rows":2,"icons":false,"format-rating":'Rating: %s',"thumbnail-position":"top","format-views":function(n){ return 'Views: '+this.formatNumber(n, false);},"read-more-mode-devices":"","read-more-anchor-selector":"","before-detail-order-syndicated":"","slider-min-effective-scroll-size":20,"use-dpr-images":true,"__style__":{"":"width:300px;_width:300px;border-width:0px 0px 0px 0px;border-style:solid solid solid solid;border-color:#DFDFDF;padding:0px 0px 0px 0px;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;box-shadow:none;",".playerCube .video-external-data":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".trc_lightbox_overlay":"background-color:#000000;opacity:0.70;filter:alpha(opacity=70);","div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover":"background-color:transparent;",".playerCube div.videoCube:hover, div.videoCube_hover":"background-color:transparent;",".trc_pager_prev:hover, .trc_pager_next:hover":"color:#6497ED;",".trc_rbox_border_elm":"border-color:darkgray;",".syndicatedItem .video-views":"color:black;font-size:10px;font-weight:normal;text-decoration:none;",".syndicatedItem .video-category":"color:black;font-size:10px;font-weight:normal;text-decoration:none;",".videoCube .video-label-box":"margin-left:;margin-right:;",".syndicatedItem .sponsored":"color:#9C9A9C;font-size:9px;font-weight:normal;text-decoration:none;",".pager_disabled":"color:#7d898f;",".playerCube .video-category":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".syndicatedItem .video-uploader":"color:black;font-size:10px;font-weight:normal;text-decoration:none;",".videoCube.thumbnail_start .thumbBlock_holder":"width:40%;_width:40%;",".playerCube .video-uploader":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".video-uploader":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".trc_sponsored_overlay":"background-color:black;",".syndicatedItem .video-external-data":"color:black;font-size:10px;font-weight:normal;text-decoration:none;",".trc_rbox_header":"font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:16.0px;font-weight:bold;text-decoration:none;color:#000000;border-width:0;background:transparent;border-style:none;border-color:#D6D5D3;padding:15px 0px 14px 0px;",".syndicatedItem .video-rating":"color:black;font-size:10px;font-weight:normal;text-decoration:none;",".videoCube.vertical":"border-style:solid none none none;",".trc_pager_unselected":"color:#7d898f;",".video-rating":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".video-published-date":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".syndicatedItem":"background-color:transparent;",".syndicatedItem .video-duration-detail":"color:black;font-size:10px;font-weight:normal;text-decoration:none;",".playerCube .videoCube.horizontal":"border-style:none none none none;",".videoCube.syndicatedItem .thumbnail-overlay":"background-image:null;background-position:5% 5%;",".videoCube.syndicatedItem.vertical":"border-style:solid none none none;",".sponsored":"font-size:9px;font-weight:normal;text-decoration:none;color:#9C9A9C;",".videoCube.syndicatedItem .thumbBlock":"border-color:darkgray;border-width:0px;",".videoCube.syndicatedItem .thumbBlock .static-text":"text-align:left;background-color:black;display:none;color:white;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;",".videoCube.thumbnail_start.trc-split-label .trc-pre-label":"width:30%;_width:30%;",".video-category":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".thumbnail-emblem":"background-position:5% 5%;",".syndicatedItem .video-description":"max-height:2.2em;*height:2.2em;color:black;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:normal;line-height:11px;text-decoration:none;",".playerCube .video-published-date":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay":"background-image:null;",".video-label-box.trc-pre-label":"height:auto;",".video-label,.sponsored,.sponsored-url":"font-family:Arial, Helvetica, sans-serif;",".videoCube.thumbnail_start .trc-pre-label":"width:60%;_width:60%;",".syndicatedItem .video-title":"max-height:96.0px;*height:96.0px;color:#000000;font-family:'Unify Sans', Helvetica, Arial, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;text-decoration:none;",".playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay":"background-image:null;",".videoCube.thumbnail_start.trc-split-label .trc-main-label":"width:30%;_width:30%;",".videoCube":"width:auto;_width:auto;background-color:transparent;border-width:0px 0px 0px 0px;border-color:#E4E4E4;padding:0px 0px 0px 0px;height:auto;margin-left:0px;margin-top:0px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-style:SOLID;",".sponsored-default .video-description":"max-height:2.2em;*height:2.2em;",".playerCube .video-description":"font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;text-decoration:none;max-height:2.2em;*height:2.2em;color:black;",".playerCube .videoCube .video-label-box":"margin-left:81px;margin-right:0px;",".videoCube.syndicatedItem .thumbBlock .branding":"text-align:left;background-color:transparent;display:none;left:0px;color:black;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;","div.videoCube:hover, div.videoCube_hover":"background-color:transparent;",".videoCube .sponsored":"margin-top:-7px;",".trc_pager_pages div":"font-size:12px;font-weight:normal;text-decoration:none;",".sponsored-url":"font-size:9px;font-weight:bold;text-decoration:underline;color:green;",".playerCube .video-title":"font-family:Arial, Helvetica, sans-serif;text-decoration:none;font-size:14px;line-height:17.5px;font-weight:bold;max-height:2.58em;*height:2.58em;color:black;",".videoCube.syndicatedItem .video-label-box":"margin-left:;",".trc_rbox_header_icon_img":"margin:0px;height:18px;",".videoCube.syndicatedItem.horizontal":"border-style:none;",".video-title":"font-family:Arial, Helvetica, sans-serif;font-size:24.0px;line-height:32.0px;font-weight:bold;max-height:96px;*height:96px;color:#212121;text-decoration:none;",".playerCube .video-rating":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".syndicatedItem .branding":"color:#999999;font-size:11.0px;font-weight:bold;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",".trc_pager_selected":"color:#0056b3;",".videoCube.syndicatedItem":"background-color:transparent;border-color:#E4E4E4;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;border-width:0px 0px 0px 0px;border-style:SOLID;",".videoCube .video-label-box.trc-pre-label":"margin:0;",".branding div.logoDiv":"font-family:inherit;",".trc_rbox_div":"width:auto;_width:99%;height:410px;border-width:0;padding:0;",".playerCube .video-views":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".trc_pager div":"font-family:serif;",".syndicatedItem .video-label-box.trc-pre-label":"height:auto;",".videoCube.horizontal":"border-style:none;","div.trc_pager_pages div:hover":"color:#6497ED;",".pager_enabled":"color:#0056b3;",".playerCube .thumbnail-overlay":"background-image:null;background-position:5% 5%;",".videoCube .thumbnail-overlay":"background-image:null;background-position:5% 5%;",".playerCube .videoCube .video-duration":"display:block;left:36px;",".syndicatedItem .video-published-date":"color:black;font-size:10px;font-weight:normal;text-decoration:none;",".syndicatedItem .sponsored-url":"color:green;font-size:9px;font-weight:bold;text-decoration:underline;",".playerCube .videoCube .thumbBlock":"border-width:0px;border-color:darkgray;",".playerCube .video-label-box":"text-align:left;","div.sponsored-default:hover, div.sponsored-default.videoCube_hover":"background-color:inherit;",".video-external-data":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".trc_pager_prev,.trc_pager_next":"font-size:12px;font-weight:normal;text-decoration:none;",".videoCube .thumbBlock":"border-width:0px;border-color:darkgray;",".videoCube.syndicatedItem .video-duration":"display:none;left:36px;",".sponsored-default .video-title":"max-height:2.58em;*height:2.58em;",".branding":"color:black;font-size:10px;font-weight:normal;text-decoration:none;font-family:Arial, Helvetica, sans-serif;background-image:null;text-align:left;",".sponsored-default":"background-color:#F7F6C6;","__keys__":['.video-title','.video-description','.trc_rbox_div','.videoCube .video-duration','.videoCube .video-label-box','.video-label,.sponsored,.sponsored-url','.trc_rbox_header','.sponsored-url','.sponsored','.video-category','.video-duration-detail','.video-rating','.video-uploader','.video-views','.video-published-date','.sponsored-default .video-title','.sponsored-default .video-description','.videoCube','div.videoCube:hover, div.videoCube_hover','.sponsored-default','div.sponsored-default:hover, div.sponsored-default.videoCube_hover','.videoCube .thumbnail-overlay','.videoCube:hover .thumbnail-overlay, .videoCube_hover .thumbnail-overlay','.trc_rbox_border_elm','.videoCube .thumbBlock','div.videoCube:hover .thumbBlock','.pager_enabled','.trc_pager_counter','.pager_disabled','.trc_pager_prev:hover, .trc_pager_next:hover','.trc_pager_selected','.trc_pager_unselected','div.trc_pager_pages div:hover','.trc_lightbox_overlay','.video-label-box','.trc_sponsored_overlay','.thumbnail-emblem','.videoCube .sponsored','','.videoCube.vertical','.videoCube.horizontal','.trc_pager_prev,.trc_pager_next','.trc_pager_pages div','.video-external-data','.trc_pager div','.playerCube .thumbnail-overlay','.playerCube:hover .thumbnail-overlay, .playerCube_hover .thumbnail-overlay','.playerCube .videoCube','.playerCube .videoCube.horizontal','.playerCube .videoCube .video-label-box','.playerCube .video-duration-detail','.playerCube .video-external-data','.playerCube .video-label-box','.playerCube .video-published-date','.playerCube .video-category','.playerCube .video-description','.playerCube .videoCube .video-duration','.playerCube .videoCube .thumbBlock','.playerCube .video-rating','.playerCube .video-uploader','.playerCube .video-views','.playerCube .video-title','.playerCube div.videoCube:hover, div.videoCube_hover','.whatsThisSyndicated','div.syndicatedItem:hover, div.syndicatedItem.videoCube_hover','div.syndicatedItem:hover .thumbBlock','.videoCube.syndicatedItem','.videoCube.syndicatedItem.horizontal','.videoCube.syndicatedItem .thumbBlock','.videoCube.syndicatedItem .thumbnail-overlay','.videoCube.syndicatedItem.vertical','.videoCube.syndicatedItem .video-duration','.videoCube.syndicatedItem .video-label-box','.syndicatedItem','.syndicatedItem .video-description','.syndicatedItem .video-title','.syndicatedItem .sponsored','.syndicatedItem .sponsored-url','.syndicatedItem .video-category','.syndicatedItem .video-duration-detail','.syndicatedItem .video-external-data','.syndicatedItem .video-published-date','.syndicatedItem .video-rating','.syndicatedItem .video-uploader','.syndicatedItem .video-views','.syndicatedItem .branding','.videoCube.syndicatedItem .thumbBlock .branding','.videoCube.syndicatedItem .thumbBlock .static-text','.videoCube.thumbnail_start .thumbBlock_holder','.trc_rbox_header_icon_img','.video-icon-img','.video-label-box.trc-pre-label','.syndicatedItem .video-label-box.trc-pre-label','.videoCube.thumbnail_start .trc-pre-label','.videoCube.thumbnail_start.trc-split-label .trc-main-label','.videoCube.thumbnail_start.trc-split-label .trc-pre-label','.videoCube .video-label-box.trc-pre-label','.branding','.branding .logoDiv a span','.branding div.logoDiv'],".playerCube .videoCube":"background-color:transparent;border-color:#D6D5D3;border-width:1px;border-radius:0px;-moz-border-radius:0px;-webkit-border-radius:0px;margin-left:0px;margin-top:0px;padding:3px;",".branding .logoDiv a span":"color:inherit;font-size:inherit;",".video-label-box":"text-align:left;",".video-description":"font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:11px;font-weight:normal;max-height:2.2em;*height:2.2em;color:black;text-decoration:none;",".videoCube .video-duration":"left:36px;display:none;","div.syndicatedItem:hover .thumbBlock":"border-color:inherit;",".trc_pager_counter":"color:#000000;",".whatsThisSyndicated":"font-family:Arial, Verdana, sans-serif;font-size:9px;font-weight:normal;color:black;text-decoration:none;padding:0;",".playerCube .video-duration-detail":"font-size:10px;font-weight:normal;text-decoration:none;color:black;",".video-duration-detail":"font-size:10px;font-weight:normal;text-decoration:none;color:black;","div.videoCube:hover .thumbBlock":"border-color:inherit;",".video-icon-img":"margin:0px;height:18px;",".video-views":"font-size:10px;font-weight:normal;text-decoration:none;color:black;"}}},"language":"en","testmode":false,"direction":"ltr","default-thumbnail":"http://cdn.taboola.com/libtrc/static/thumbnails/759bc49732394dde468c8d65a464e1a4.png","domains":"","sponsored-link-text":"Sponsored Link","sponsored-video-text":"Sponsored Video","branding-url":{},"configuration-version":"0","external-credentials":"","brightcove-list-id":"","publisher-start":function(){
TRC.publisherMapToPublisherCard = {
    'gannettcompany-reporternews': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/MFtk6IDWZU124SKV8YwLNARuDXkHmUa9bS2H-v4C5NYQB2BbecTAz4UTn1St2SNqlg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/6c/6c100a18-60e3-4042-b5ba-da059505e8ed.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.reporternews.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/abilene-reporter-news/id1119331458?mt=8',
        'newsLetterUrl': 'https://profile.reporternews.com/newsletters/manage/',
        'pubBrand': 'Abilene Report-News'
    },
    'gannettcompany-alamogordonews': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/pFI9IKD9mUnbu2Yuv-jMypkLDa_98pcS0bzpuwzEo-Wtgsg8GCoRmKT_sZp-Yoba4g=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/b2/b24e7baf-54dc-4c8a-b641-fb0070e37c1a.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.alamogordodailynews.android.prod',
        'appStoreUrl': 'https://itunes.apple.com/us/app/alamogordo-daily-news-print-edition/id623860441?mt=8',
        'newsLetterUrl': 'https://profile.alamogordonews.com/newsletters/manage/',
        'pubBrand': 'Alamagordo Daily News'
    },
    'gannettcompany-independentmail': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/MpQWWzZKvtNE0SG77v3sRuqOnp2Rg7xnSHK7RJlOpmkfOGBoCC4hEFiJlJueV0eSQA=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/86/86063823-33ec-4e07-b660-efa68cfd1041.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.independentmail.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/independent-mail-print/id1077878933?mt=8',
        'newsLetterUrl': 'https://profile.independentmail.com/newsletters/manage/',
        'pubBrand': 'Anderson Independent-Mail'
    },
    'gannettcompany-argusleader': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/93s5n-x8KOC-OjK5W7a6YGpEhCOqF9pF3-cgh22NbOSfdmroZVAKajIf8VbbR7jqGg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/8b/8be84e4b-bfd2-43f3-ae96-f1abb9e3fc20.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.argusleader',
        'appStoreUrl': 'https://itunes.apple.com/us/app/argus-leader/id493262204?mt=8',
        'newsLetterUrl': 'https://profile.argusleader.com/newsletters/manage/',
        'pubBrand': 'Argus Leader'
    },
    'gannettcompany-app': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/Qjjx90mhwFaRS8x0cSGAHVcmiFEZxeWb9SNeN5DOdSoKSkmi0Ea1Oua3sWSeodDb30pf=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/d1/d1547df8-ae7a-455a-8663-0202cce55d45.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.app',
        'appStoreUrl': 'https://itunes.apple.com/us/app/asbury-park-press/id514649656?mt=8',
        'newsLetterUrl': 'https://profile.app.com/newsletters/manage/',
        'pubBrand': 'Asbury Park Press'
    },
    'gannettcompany-citizentimes': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/wHFk6P1UyvLhnkZNfE8zZjauMRLAOxUwj2bx0WZvy0xZ5VWEAe5JxTORdQSYdxWu8bg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/7d/7dac2e14-f088-4cae-b583-4d98119c9afc.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.citizentimes',
        'appStoreUrl': 'https://itunes.apple.com/us/app/citizen-times/id531428757?mt=8',
        'newsLetterUrl': 'https://profile.citizen-times.com/newsletters/manage/',
        'pubBrand': 'Asheville Citizen-Times'
    },
    'gannettcompany-battlecreekenquirer': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/QXf0Mzv4F5K3X0FeZQY0_2g4NLdLOyTnqyh_V8NV7Y6TdWJNOkW62g2OMjElTLZ6RWM=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/77/779d1b6e-632b-4083-a511-acf0ce3526d3.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.battlecreekenquirer',
        'appStoreUrl': 'https://itunes.apple.com/us/app/battle-creek-enquirer/id520263428?mt=8',
        'newsLetterUrl': 'https://profile.battlecreekenquirer.com/newsletters/manage/',
        'pubBrand': 'Battle Creek Enquirer'
    },
    'gannettcompany-currentargus': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/LccJIrLT6R9mLORpN5JpV-Lo0xRvAtJaBGIxMpIXOs8hdn7Qzmuv_j1fxKfbyi7pEFY=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/bd/bdb07d6f-0332-4337-a582-73524b8a36e6.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.carlsbadcurrentargus.android.prod',
        'appStoreUrl': 'https://itunes.apple.com/us/app/carlsbad-current-argus-print/id623869903?mt=8',
        'newsLetterUrl': 'https://profile.currentargus.com/newsletters/manage/',
        'pubBrand': 'Carlsbad Current-Argus'
    },
    'gannettcompany-publicopinion': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/sbXf7u_mjF_7QGUcOi_1XMLyocDhF490MAugukTMaBDNCBO05EjMsbuIcJFE4qj-gB0=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/cc/ccdc9ac0-99f3-4eb9-9556-66e8e0db77b6.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.spreedinc.providers.digitalfirstmedia.chambersburgpublicopinion',
        'appStoreUrl': 'https://itunes.apple.com/us/app/chambersburg-public-opinion/id1025199082?mt=8',
        'newsLetterUrl': 'https://profile.publicopiniononline.com/newsletters/manage/',
        'pubBrand': 'Chambersburg Public Opinion'
    },
    'gannettcompany-chillicothegazette': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/p2sF-9ednC3BQDcRAOyzbgNtjy1AAn9NmOeufPNB_tP2vCI13c0V7XzHPNO9diuWyA=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/f6/f695fd2b-5460-4e04-a22b-9ba9ec3565d3.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.chillicothegazette',
        'appStoreUrl': 'https://itunes.apple.com/us/app/chillicothe-gazette/id545724382?mt=8',
        'newsLetterUrl': 'https://profile.chillicothegazette.com/newsletters/manage/',
        'pubBrand': 'Chillicothe Gazette'
    },
    'gannettcompany-caller': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/5h0Oo1aFYz6vc8RiIZCPLvHg5ivVIxdRgomWc7f20i47QqhzJKcX1icjOXnTiECIYQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/3c/3ce86806-1eb5-46a9-aa87-16aef0b42f51.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.caller.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/caller-times/id1119331659?mt=8',
        'newsLetterUrl': 'https://profile.caller.com/newsletters/manage/',
        'pubBrand': 'Corpus Christi Caller-Times'
    },
    'gannettcompany-coshoctontribune': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/jmT94WFVuOgi-5ljjbpUkCzMIzAxAZyUHe73wJRaJHtovgPOON76NPWqQXoCn1sAB-I=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/c6/c669d7aa-7f79-4514-af13-adb33e078838.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.coshoctontribune',
        'appStoreUrl': 'https://itunes.apple.com/us/app/coshocton-tribune/id553322756?mt=8',
        'newsLetterUrl': 'https://profile.coshoctontribune.com/newsletters/manage/',
        'pubBrand': 'Coshocton Tribune'
    },
    'gannettcompany-mycentraljersey': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/h93xCWWycmTcgGKdvWw8IoBBbkyvANJlJarmBSb4-iX_Ztlzd3Fm0nPuxoVy9iUS5A=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/74/748fdb81-5e7b-4129-8bf4-1a0be748de7e.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.mycentraljersey',
        'appStoreUrl': 'https://itunes.apple.com/us/app/my-central-jersey/id520557512?mt=8',
        'newsLetterUrl': 'https://profile.mycentraljersey.com/newsletters/manage/',
        'pubBrand': 'Courier News'
    },
    'gannettcompany-courierpostonline': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/L0Z-EB0hqQIunBP_qsb6dyr53WGVEsNGDqzdngEBnWpLJMoKn26U-fBUf5j6Z8cXWB4=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/e9/e9ffbe91-3fc9-4298-b0fd-7d920a7ac163.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.courierpostonline',
        'appStoreUrl': 'https://itunes.apple.com/us/app/courier-post/id566331284?mt=8',
        'newsLetterUrl': 'https://profile.courierpostonline.com/newsletters/manage/',
        'pubBrand': 'Courier-Post'
    },
    'gannettcompany-livingstondaily': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/2rHl2HxUgsPoqG85WmK9dsDujGF0716ilnKR9cVO4piIjnj7iA5uYyi7fMRMUcGXj33m=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/9e/9e56d338-344b-426a-8e6e-26678df0fcca.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.livingstondaily',
        'appStoreUrl': 'https://itunes.apple.com/us/app/livingston-daily/id900198081?mt=8',
        'newsLetterUrl': 'https://profile.livingstondaily.com/newsletters/manage/',
        'pubBrand': 'Daily Press & Argus'
    },
    'gannettcompany-dailyrecord': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/gEWf1hE0liKth81MZrI5RWZElD7Nqn0h1Lj78oZhZ2iQyowF2dsLTEsGyjNzGDgP1Y-f=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/2b/2bc63ef5-3923-4343-8adf-f43a0f3eb777.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.dailyrecord',
        'appStoreUrl': 'https://itunes.apple.com/us/app/daily-record-morris-co-nj/id520571562?mt=8',
        'newsLetterUrl': 'https://profile.dailyrecord.com/newsletters/manage/',
        'pubBrand': 'Daily Record'
    },
    'gannettcompany-dailyworld': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/jkFp6QH5jB8CbRCv1WP0dbvG78iFy1eVsaUM8r1hwFrDPpxYX7Yl__vIrzWLGEGcng=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/99/99615c26-0ac9-4b3b-83fb-35e6cc4f077d.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.dailyworld',
        'appStoreUrl': 'https://itunes.apple.com/us/app/daily-world/id528369096?mt=8',
        'newsLetterUrl': 'https://profile.dailyworld.com/newsletters/manage/',
        'pubBrand': 'Daily World'
    },
    'gannettcompany-freep': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/SVmqDABs5n5O_vmBbKPPQH6m3OVCW4kXAOMBsOcTACOeQd_fQ0fAnZsxi6Mu-4-T7Q=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/2b/2b0e5bee-a050-4d91-9926-b32048b8d88c.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.doapps.android.mln.MLN_fac245c0cd451a91e8fa12de5db066de',
        'appStoreUrl': 'https://itunes.apple.com/us/app/detroit-free-press/id904023476?mt=8',
        'newsLetterUrl': 'https://profile.freep.com/newsletters/manage/',
        'pubBrand': 'Detroit Free Press'
    },
    'gannettcompany-detroitnews': {
        // 'AppDownloadImage': 'https://lh3.ggpht.com/cm-6JdfIK-OeyAsyx6oXO9QSva_d5huJyJQ98RqZVEF0NVUCfLHAjoDoN_YL9j1OZqlQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/55/5564fd2d-5175-4f3f-b6ca-ee48cfe1a25e.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.doapps.android.mln.MLN_04a7d5453645333814797f7653739861',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-detroit-news/id904391210?mt=8',
        'newsLetterUrl': 'https://profile.detroitnews.com/newsletters/manage/',
        'pubBrand': 'Detroit News'
    },
    'gannettcompany-courierpress': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/CGXESFCMahJMEM7PrNq7wehZMdbUoJSOeABKM4imm5jGwFRaCyIwrJJf_naMyGHkzmU=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/24/2412c91c-6e14-4125-9783-5f62d0030bf7.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.courierpress.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/evansville-courier-press/id1119325317?mt=8',
        'newsLetterUrl': 'https://profile.courierpress.com/newsletters/manage/',
        'pubBrand': 'Evansville Courier Press'
    },
    'gannettcompany-floridatoday': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/AT5VD8szhZgTFhYOzuIe8Kf5Dd_4SRxL68NRgfwOZOOR4QPUqcoayEeUfUY3SPdj7Q=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/7b/7bcbcca4-bef1-463a-9ee9-0c7e8e0fa2d4.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.floridatoday',
        'appStoreUrl': 'https://itunes.apple.com/us/app/florida-today/id493011169?mt=8',
        'newsLetterUrl': 'https://profile.floridatoday.com/newsletters/manage/',
        'pubBrand': 'FLORIDA TODAY'
    },
    'gannettcompany-coloradoan': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/5_ncR5Pg-bshmIaNSt6YU0GRINKStNsV2qJP-xP6s7it6fCAut9kJShAqmIOTpph=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/56/56962d33-c08a-46f9-897d-3c3bfc78c3d2.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.coloradoan',
        'appStoreUrl': 'https://itunes.apple.com/us/app/coloradoan/id512317806?mt=8',
        'newsLetterUrl': 'https://profile.coloradoan.com/newsletters/manage/',
        'pubBrand': 'Fort Collins Coloradoan'
    },
    'gannettcompany-greatfallstribune': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/Us8MbCR_LuXam42fcdN3Pvjbn68MxTipubE2yjAAcqfkS4F0Sd_z9dbmA3i9MZomvdk=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/6a/6a9c51c1-6128-467a-933e-ea2dc6f697ba.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.greatfallstribune',
        'appStoreUrl': 'https://itunes.apple.com/us/app/great-falls-tribune/id528270288?mt=8',
        'newsLetterUrl': 'https://profile.greatfallstribune.com/newsletters/manage/',
        'pubBrand': 'Great Falls Tribune'
    },
    'gannettcompany-greenbaypressgazette': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/3-8p0Pk5IIenRaBgAG4b34fcrqXau9gX9NvxaB9xzMU-u86bd4CA0k13aUAvg-pooBE=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/9b/9b2c79f8-41de-445e-bc08-890057dfdcc9.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.greenbaypressgazette',
        'appStoreUrl': 'https://itunes.apple.com/us/app/green-bay-press-gazette/id531364129?mt=8',
        'newsLetterUrl': 'https://profile.greenbaypressgazette.com/newsletters/manage/',
        'pubBrand': 'Green Bay Press-Gazette'
    },
    'gannettcompany-hattiesburgamerican': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/NY7o_TYzk28_UwXOlCOHaTvdD61Tq1pk0K1X86MeYIEbYWgVzC2kaJwiOWL9VdXdsUg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/c7/c7be7388-3418-405c-bad4-f5331ee6389d.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.hattiesburgamerican',
        'appStoreUrl': 'https://itunes.apple.com/us/app/hattiesburg-american/id545725790?mt=8',
        'newsLetterUrl': 'https://profile.hattiesburgamerican.com/newsletters/manage/',
        'pubBrand': 'Hattiesburg American'
    },
    'gannettcompany-heraldtimesreporter': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/DFEHy9Ri7fbPANDAixOoj-CgMn12O6j3ygPHbRbbeWDe2OFKJR6DxfOvsnEyV18HIQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/f5/f5199962-89d3-410c-a8d3-0d5490bc7859.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.htrnews',
        'appStoreUrl': 'https://itunes.apple.com/us/app/herald-times-reporter/id531367431?mt=8',
        'newsLetterUrl': 'https://profile.htrnews.com/newsletters/manage/',
        'pubBrand': 'Herald Times Reporter'
    },
    'gannettcompany-iowacitypress-citizen': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/nTho1T2mri4_PgTzQ8TS7u-L2yjzq2R2_vXEJKEScQiABwuf4h3rZHjfPhSwiNMm6Q=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/0e/0edbff12-f2b8-4a52-86bd-3b0d7fba4cf4.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.presscitizen',
        'appStoreUrl': 'https://itunes.apple.com/us/app/iowa-city-press-citizen/id528328231?mt=8',
        'newsLetterUrl': 'https://profile.desmoinesregister.com/newsletters/manage/',
        'pubBrand': 'Iowa City Press-Citizen'
    },
    'gannettcompany-journalandcourier': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/e_yn64I_W6cRRiV0ue8qEfQvCWVLWjrbUWTDpich_uYJWsBvhj3sdSVFISCqIuI79w=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/c2/c244a5b9-094c-42c6-b6ad-a52564a9da61.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.jconline',
        'appStoreUrl': 'https://itunes.apple.com/us/app/journal-courier/id493537044?mt=8',
        'newsLetterUrl': 'https://profile.jconline.com/newsletters/manage/',
        'pubBrand': 'Journal and Courier'
    },
    'gannettcompanyl-kitsapsun': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/T6-f_DguFbeFtKBqXlE5tzW7HMVTD0ZXHbIKjpp-5CulWIH90gYiA0sTzHNXPQcXQw=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/e8/e835ca67-3815-4d83-a250-4bcd8fb8f719.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.kitsapsun.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/kitsap-sun/id1119333831?mt=8',
        'newsLetterUrl': 'https://profile.kitsapsun.com/newsletters/manage/',
        'pubBrand': 'Kitsap Sun'
    },
    'gannettcompany-knoxnews': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/wOCAC4svf4SrSDQBevTgM3T16b6a0Sv31D1ayOdmRSkQkmXgag6_poLzNtWRDGUmNdq1=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/10/10a8c48b-e60c-40aa-b669-040a56762103.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.knoxnews.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/knoxville-news/id1119330563?mt=8',
        'newsLetterUrl': 'https://profile.knoxnews.com/newsletters/manage/',
        'pubBrand': 'Knoxville News Sentinel'
    },
    'gannettcompany-lancastereaglegazette': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/brikweEup3gZMlN-bcfSMms7pEU3ioFW3zwDejh8x4rn31DL98HOxUuo47Q7JXgoDJc=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/57/57997c42-910b-4aed-9447-806fc189f315.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.lancastereaglegazette',
        'appStoreUrl': 'https://itunes.apple.com/us/app/lancaster-eagle-gazette/id545726818?mt=8',
        'newsLetterUrl': 'https://profile.lancastereaglegazette.com/newsletters/manage/',
        'pubBrand': 'Lancaster Eagle-Gazette'
    },
    'gannettcompany-lansingstatejournal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/uJeG0e5EuEKq4AITYxq3F5Us8S1E-mR7BGnvTmF0IT2RMM4q0xBK88MEfU1ILegpJ7s=s180-rw',
        'AppDownloadImage': 'http://cdn.taboola.com/static/3e/3eb0e83a-1521-44fc-a705-6f246744499a.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.lsj',
        'appStoreUrl': 'https://itunes.apple.com/us/app/lansing-state-journal-print/id587473562?mt=8',
        'newsLetterUrl': 'https://profile.lansingstatejournal.com/newsletters/manage/',
        'pubBrand': 'Lansing State Journal'
    },
    'gannettcompany-ldnews': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/pmTLxtvdBsu3Jk2I-dbP5rE0ueZUvWNP2wRaBsyslRFvThy5DsFPKj8233x5PW2O_Q=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/61/61cec995-3b32-4866-ad64-7ce66aa4361c.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.spreedinc.providers.digitalfirstmedia.lebanondailynews',
        'appStoreUrl': 'https://itunes.apple.com/us/app/lebanon-daily-news/id1025197816?mt=8',
        'newsLetterUrl': 'https://profile.ldnews.com/newsletters/manage/',
        'pubBrand': 'Lebanon Daily News'
    },
    'gannettcompany-marshfieldnews-herald': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/0BlX0tJUd5kfQ_TwZ-6999VmiOW-yTr1ASIVA-xcSfmuoaWLeiohJXmTR4IHaOP23WY=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/e9/e9c81d70-f082-4ba4-ba87-9ecfcf2073d8.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.marshfieldnewsherald',
        'appStoreUrl': 'https://itunes.apple.com/us/app/marshfield-news-herald/id531372135?mt=8',
        'newsLetterUrl': 'https://profile.marshfieldnewsherald.com/newsletters/manage/',
        'pubBrand': 'Marshfield News-Herald'
    },
    'gannettcompany-naplesnews': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/LhG1-k5UKVdIklJg8s4bZLPkyznw-WhtVAubYaK40VOX-M3VxyY8dtw4iBRZXITPCQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/b4/b4569b07-8eda-44c6-86d6-10b82986d0fd.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.naplesnews.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/naples-daily-news-print/id1069883272?mt=8',
        'newsLetterUrl': 'https://profile.naplesnews.com/newsletters/manage/',
        'pubBrand': 'Naples Daily News'
    },
    'gannettcompany-newsherald': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/ScwRlNRw9Tg3-WrRHkGe0VQUWYDAuz78nGjd-gbCKa8G8aXy7fL9Ee34VLdpefK0i40=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/fb/fbf9d0f9-66df-4b62-a5fd-67140a9ac14c.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.portclintonnewsherald',
        'appStoreUrl': 'https://itunes.apple.com/us/app/port-clinton-news-herald/id545729386?mt=8',
        'newsLetterUrl': 'https://profile.portclintonnewsherald.com/newsletters/manage/',
        'pubBrand': 'News Herald'
    },
    'gannettcompany-newsjournal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/njSdO4KQkMajxeFgp1rbPIquAL8yHj1ts83ZkhypQiDm5Y98WvXKO32zFthr9Qvp2A=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/49/49e31a11-939f-4a82-a873-ca4ee4a4212c.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.mansfieldnewsjournal',
        'appStoreUrl': 'https://itunes.apple.com/us/app/mansfield-news-journal/id545727590?mt=8',
        'newsLetterUrl': 'https://profile.mansfieldnewsjournal.com/newsletters/manage/',
        'pubBrand': 'News Journal'
    },
    'gannettcompany-hometownlife': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/kISNWxUKRe0yP1RIa4gJlWf16CrcMVBcmTw-iz5Fv9YwEMpIChwvLio8EfAwDqjWIQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/87/87771651-acae-4361-8b11-47c7a896c1cd.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.hometownlife',
        'appStoreUrl': 'https://itunes.apple.com/us/app/hometown-life/id900203119?mt=8',
        'newsLetterUrl': 'https://profile.hometownlife.com/newsletters/manage/',
        'pubBrand': 'Observer & Eccentric Newspapers'
    },
    'gannettcompany-thenorthwestern': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/qiRM8fpTHMwbh07g3-9OYgdnGyj_7h_Uc2uZyZSBWWJQZtNHUxSH3rsOTBUmAH6gvw=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/8d/8db05910-857e-4f0a-a974-bb835bf3e7a3.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.thenorthwestern',
        'appStoreUrl': 'https://itunes.apple.com/us/app/oshkosh-northwestern/id531372522?mt=8',
        'newsLetterUrl': 'https://profile.thenorthwestern.com/newsletters/manage/',
        'pubBrand': 'Oshkosh Northwestern'
    },
    'gannettcompany-guampdn': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/NGulQngNtQzKFSsz6274Uez01rFIxDOBT6nwHD6SdswzmNsBcaiij7X6Ui3yDJV4PCg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/da/da4bc5f6-5c8d-45f0-928e-c6c0c78c3e9c.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.guampdn',
        'appStoreUrl': 'https://itunes.apple.com/us/app/pacific-daily-news/id605467230?mt=8',
        'newsLetterUrl': 'https://profile.guampdn.com/newsletters/manage/',
        'pubBrand': 'Pacific Daily News'
    },
    'gannettcompany-pal-item': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/SI0n6SX53yyvLKh7HuKHBurGu9F6OkFwqrheJ8L4mJbLQDpwiYEVkM1EYP1dwPGd9wc=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/11/114242e9-8a9c-42c9-a8f3-5d19326297db.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.palitem',
        'appStoreUrl': 'https://itunes.apple.com/us/app/pal-item/id553320600?mt=8',
        'newsLetterUrl': 'https://profile.pal-item.com/newsletters/manage/',
        'pubBrand': 'Palladium-Item'
    },
    'gannettcompany-pnj': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/cCyKavzshdNo_No-DTvm_yZibH7bzOJ5PKTICo3P27uTSrIJVFtp27icBcoOAS5kUQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/dd/dd0892f1-0a0c-4100-b727-13efc990f49c.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.pnj',
        'appStoreUrl': 'https://itunes.apple.com/us/app/pensacola-news-journal/id545721147?mt=8',
        'newsLetterUrl': 'https://profile.pnj.com/newsletters/manage/',
        'pubBrand': 'Pensacola News Journal'
    },
    'gannettcompany-poughkeepsiejournal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/l0B6qyg186PdAk9WZX6HIxWDQDHhFabXsD8hGoumOmUZOxMAsVGjZhUZ9KU0hED9pOE=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/ea/ea4a1ee3-d96e-4bf9-a987-c0e9694545d6.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.poughkeepsie',
        'appStoreUrl': 'https://itunes.apple.com/us/app/poughkeepsie-journal-print/id556964868?mt=8',
        'newsLetterUrl': 'https://profile.poughkeepsiejournal.com/newsletters/manage/',
        'pubBrand': 'Poughkeepsie Journal'
    },
    'gannettcompany-press-sunbulletin': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/1HZ2AR_JPJVH-ZiT4yGsGzXCcfVmBHj25K_Sx1lN6GyBjRfv8Zq7x11_j0At_HfetTo=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/c3/c3fe6e7b-f18f-45d8-bdce-000a3e7d370b.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.pressconnects',
        'appStoreUrl': 'https://itunes.apple.com/us/app/pressconnects/id518646584?mt=8',
        'newsLetterUrl': 'https://profile.pressconnects.com/newsletters/manage/',
        'pubBrand': 'Press & Sun-Bulletin'
    },
    'gannettcompany-redding': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/tBn_Q_-fM4zv0hWkMbzyZKtBW9x-ROuaPiK8QX5x_-2s2-BAQ6i7mTEMIgTMvJfxxA=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/fb/fb6a3f79-2f10-4a8c-bd0f-3bb902f1ac57.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.redding.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/record-searchlight/id1119324300?mt=8',
        'newsLetterUrl': 'https://profile.redding.com/newsletters/manage/',
        'pubBrand': 'Redding Record Searchlight'
    },
    'gannettcompany-rgj': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/T-E4wK6TnZm6YPHTZFFfwvws0ZKOXCLMiBd50j1dx5FF53BK1dvaX36LqBeHjdMeSg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/f3/f31a6b2b-f45e-495b-b835-cef1b7691bb6.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.rgj',
        'appStoreUrl': 'https://itunes.apple.com/us/app/reno-gazette-journal/id435103825?mt=8',
        'newsLetterUrl': 'https://profile.rgj.com/newsletters/manage/',
        'pubBrand': 'Reno Gazette-Journal'
    },
    'gannettcompany-democratandchronicle': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/4pK_IbMLDqYuEVNiXrpsslYklnfmySUvS7QhsRqlnBl6P_w1L3V7v-wDQSIrIMUKFok=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/c4/c48256a8-dd5e-420e-b449-74ab4743813d.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.democratandchronicle',
        'appStoreUrl': 'https://itunes.apple.com/us/app/democrat-chronicle/id514408621?mt=8',
        'newsLetterUrl': 'https://profile.democratandchronicle.com/newsletters/manage/',
        'pubBrand': 'Rochester Democrat and Chronicle'
    },
    'gannettcompany-ruidosonews': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/TBZD5gpmEkHmJDsTMYq59uCKC2HtQgM5pMP2bAFGTjcUNJz8VslTSxgx474bH_6s6HCv=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/74/74333d2a-60b0-432f-818f-7ef91f113b72.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.ruidoso.android.prod',
        'appStoreUrl': 'https://itunes.apple.com/us/app/ruidoso-news-print-edition/id623922278?mt=8',
        'newsLetterUrl': 'https://profile.ruidosonews.com/newsletters/manage/',
        'pubBrand': 'Ruidoso News'
    },
    'gannettcompany-gosanangelo': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/N7_JfOofV8HUNZ-bUxXTz7LzVieOeWPToc37Ui21qO1sNsO7pDVhPlz0jgOjd1PBm7e3=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/7c/7caae004-058f-4c70-afba-f4b4e13eb025.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.gosanangelo.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/go-san-angelo/id1119333040?mt=8',
        'newsLetterUrl': 'https://profile.gosanangelo.com/newsletters/manage/',
        'pubBrand': 'San Angelo Standard-Times'
    },
    'gannettcompany-silvercitysun-news': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/OBlgc1nO76Ey1sg2JysA9bGTivb89DXc8I94xCIk7Khp4aaZhddJqaKVD_PRuqVT6QXe=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/33/3306bd59-612a-4285-9584-dd19270541e1.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scsunnewsdaily.android.prod',
        'appStoreUrl': 'https://itunes.apple.com/us/app/silver-city-sun-news-print/id635301544?mt=8',
        'newsLetterUrl': 'https://profile.scsun-news.com/newsletters/manage/',
        'pubBrand': 'Silver City Sun-News'
    },
    'gannettcompany-springfieldnews-leader': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/2S9zPWSvidZJjMcY2ibFN_nth40VlDsGyKdDF5W6UXpvvZQlkJFMWeBOiOANmJdWLAI=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/ad/ad01655a-ef31-4335-be99-cd2a57ab5d60.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.news_leader',
        'appStoreUrl': 'https://itunes.apple.com/us/app/news-leader/id520202089?mt=8',
        'newsLetterUrl': 'https://profile.news-leader.com/newsletters/manage/',
        'pubBrand': 'Springfield News-Leader'
    },
    'gannettcompany-st-cloudtimes': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/7JoVxeOkqmpB2HUyYhd8S4NgZasdVWjd2hd_pMt-rlwZLDDWfEdvkD7msAIJ9y7mSweX=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/68/685c6ba4-9cc1-436e-9a4c-522b35c99fa7.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.sctimes',
        'appStoreUrl': 'https://itunes.apple.com/us/app/st-cloud-times-print-edition/id556968386?mt=8',
        'newsLetterUrl': 'https://profile.sctimes.com/newsletters/manage/',
        'pubBrand': 'St. Cloud Times'
    },
    'gannettcompany-stargazette': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/ycK7BKZNSvq18mpmqtOkxhG_SUdXwsCGpNwx0Q81yCQRgsAgiuzNBeWWpj5BJtLy0w=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/8e/8e41bbff-5bbc-4a72-879f-6e5f32005549.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.stargazette',
        'appStoreUrl': 'https://itunes.apple.com/us/app/star-gazette/id520499517?mt=8',
        'newsLetterUrl': 'https://profile.stargazette.com/newsletters/manage/',
        'pubBrand': 'Star-Gazette'
    },
    'gannettcompany-statesmanjournal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/hzQ02oUzsXafIdNoBm10JZBtF-7TnFMGJ8WC7LFm-RGmm3-86lsafZOXpm7WehuJkagu=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/0c/0cee3c94-065d-4f87-b04f-52feb4901d2d.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.statesmanjournal',
        'appStoreUrl': 'https://itunes.apple.com/us/app/statesman-journal/id525828348?mt=8',
        'newsLetterUrl': 'https://profile.statesmanjournal.com/newsletters/manage/',
        'pubBrand': 'Statesman Journal'
    },
    'gannettcompany-stevenspointjournal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/cLiaUA-lOGGxGbomIWS5-GXIhjpaphcuPbBpE0Sg8u1h375tYGacuxE073DD3q0Pry8=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/de/defc9a8f-e384-4393-a3e0-5b08ac93fb8c.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.stevenspointjournal',
        'appStoreUrl': 'https://itunes.apple.com/us/app/stevens-point-journal/id531374750?mt=8',
        'newsLetterUrl': 'https://profile.stevenspointjournal.com/newsletters/manage/',
        'pubBrand': 'Stevens Point Journal'
    },
    'gannettcompany-tallahassee': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/mwlHngLNcKrRcU4SFxfMP40l6ByEhH4e7wMj0gfUPXCvH_Vup3sj21GmbQpMfh3_ayA=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/66/6615d525-9314-4fe4-a731-58b5b1da6fd8.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.tallahassee',
        'appStoreUrl': 'https://itunes.apple.com/us/app/tallahassee-democrat/id508520875?mt=8',
        'newsLetterUrl': 'https://profile.tallahassee.com/newsletters/manage/',
        'pubBrand': 'Tallahassee Democrat'
    },
    'gannettcompany-telegraph-forum': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/GrBAuEN7N1zpE7K1HiOKopt8t4yX2rPKmDcaWKRc0uBQ1REijR-dbqDuMdYDE_Vzu1M=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/5e/5eeb88ff-1df3-4ec5-bc14-72c6a58bface.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.bucyrustelegraphforum',
        'appStoreUrl': 'https://itunes.apple.com/us/app/bucyrus-telegraph-forum/id545723414?mt=8',
        'newsLetterUrl': 'https://profile.bucyrustelegraphforum.com/newsletters/manage/',
        'pubBrand': 'Telegraph-Forum'
    },
    'gannettcompany-theadvocate': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/o4SDSPO2vWdfWXfTY9DyzcpVHECeAVMS52ZgqihaPjRPXscwGkzwZAjd1ODZwe7YLw=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/da/da53b598-2ed4-48bc-970d-50143d9cec33.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.newarkadvocate',
        'appStoreUrl': 'https://itunes.apple.com/us/app/newark-advocate/id553330240?mt=8',
        'newsLetterUrl': 'https://profile.newarkadvocate.com/newsletters/manage/',
        'pubBrand': 'The Advocate'
    },
    'gannettcompany-azcentral': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/IMb8Ok1Hcx-3_WEeV6JIH0MYlmzD5bxP8vjXRWmi4sYD8QCo7Uf3423qwUx2Q3hrfac=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/40/40cd8532-5523-4ad3-aae7-febfe4cffa98.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.azcentral',
        'appStoreUrl': 'https://itunes.apple.com/us/app/azcentral/id815248536?mt=8',
        'newsLetterUrl': 'https://profile.azcentral.com/newsletters/manage/',
        'pubBrand': 'The Arizona Republic'
    },
    'gannettcompany-baxterbulletin': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/kM6M59mJL_tCbjyMhRbRfsDQAFBq0jU6WQ4YwojsCz8zpcMXCkTlJu5OtREM6a_WZ40=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/84/84be2269-2f96-40c2-9cc7-acd00128c627.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.baxterbulletin',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-baxter-bulletin/id520473770?mt=8',
        'newsLetterUrl': 'https://profile.baxterbulletin.com/newsletters/manage/',
        'pubBrand': 'The Baxter Bulletin'
    },
    'gannettcompany-burlingtonfreepress': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/sNv6QBy70yFdJVEzf6ACDapobZ5BFhrOfevPoSQmzVw3qaHRk7VSyE6KVH65qMWqNG0X=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/d9/d96bc863-5de3-4f82-8386-a8e1e05abab1.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.burlingtonfreepress',
        'appStoreUrl': 'https://itunes.apple.com/us/app/burlington-free-press/id525818989?mt=8',
        'newsLetterUrl': 'https://profile.burlingtonfreepress.com/newsletters/manage/',
        'pubBrand': 'The Burlington Free Press'
    },
    'gannettcompany-newscincinnati': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/wrlDMiLh9fdI7TSM3fMq3Vpq8FxZrm66E-21Y6pU_Uyd3DHyHq91lMENKzVyatY0X88=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/c1/c15ee9f2-5f2d-45d5-b0fc-4c8157ae0eb7.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.cincinnati.CincyMobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/cincinnati-com/id814555930?mt=8',
        'newsLetterUrl': 'https://profile.cincinnati.com/newsletters/manage/',
        'pubBrand': 'The Cincinnati Enquirer'
    },
    'gannettcompany-clarionledger': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/gT2sTAChgQrJJ1HcpjEqikVHBF7go7Aib208yTt2HFa-tnFvKFRe4G4caErCt3LzFn8=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/9f/9fdf181a-5e0a-4580-88fb-a43c7831382f.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.clarionledger',
        'appStoreUrl': 'https://itunes.apple.com/us/app/clarion-ledger/id545642993?mt=8',
        'newsLetterUrl': 'https://profile.clarionledger.com/newsletters/manage/',
        'pubBrand': 'The Clarion-Ledger'
    },
    'gannettcompany-commercialappeal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/Ngp1X0I_JVFxWmHCC4uRDFD-mbsP2IH5aEdLpLMTGAbTh164YuSu5qn_UUcDEzDUKGkn=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/b8/b82b2bc5-dfee-4deb-a498-ceda797b2d62.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.whiz.MediaFlow_CA',
        'appStoreUrl': 'https://itunes.apple.com/us/app/commercial-appeal/id1119709057?mt=8',
        'newsLetterUrl': 'https://profile.commercialappeal.com/newsletters/manage/',
        'pubBrand': 'The Commercial Appeal'
    },
    'gannettcompany-courierjournal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/0wUtMCK1JSqGgXjbqemspTzJoQjDnsIH9FCIwoXdUqH1JNmPRcHFuz_wHbzks_YJpw=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/78/785f84d9-7b1f-4014-acc6-5ef803beebc0.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.courierjournal',
        'appStoreUrl': 'https://itunes.apple.com/us/app/courier-journal/id525811534?mt=8',
        'newsLetterUrl': 'https://profile.courier-journal.com/newsletters/manage/',
        'pubBrand': 'The Courier-Journal'
    },
    'gannettcompany-theadvertiser': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/m4T8ivyFNRZT3UXRbb0T7whHsa8rm4RnbQftm-PB0_lxA3YTfDuWxHgVMDdpJig_=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/41/41de78cf-996d-4a90-94a8-a517f7106f57.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.theadvertiser',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-daily-advertiser/id527942108?mt=8',
        'newsLetterUrl': 'https://profile.theadvertiser.com/newsletters/manage/',
        'pubBrand': 'The Daily Advertiser'
    },
    'gannettcompany-thedailyjournal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/BCROaGJR0TXtb7Cqtzrv30jwXFTfdrLkHkJIcDrHD--C2wYZ1OkSlU339I0qVOfIIdY5=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/08/08f07a53-733e-43ff-bc90-6c1676892150.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.dailyjournal',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-daily-journal/id566359405?mt=8',
        'newsLetterUrl': 'https://profile.thedailyjournal.com/newsletters/manage/',
        'pubBrand': 'The Daily Journal'
    },
    'gannettcompany-dnj': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/KijHQhbyNbgj5E3HLKxHh2YwJSKzAWelKIQpzCGeRTIGvqSvqLtxs0BcLrgtbqJy-uA=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/5a/5ab6058a-f79f-4b90-823b-b08ae7231c66.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.dnj',
        'appStoreUrl': 'https://itunes.apple.com/us/app/daily-news-journal/id528350381?mt=8',
        'newsLetterUrl': 'https://profile.dnj.com/newsletters/manage/',
        'pubBrand': 'The Daily News Journal'
    },
    'gannettcompany-newsleader': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/6DohNfoY-K8BDYz_Q16iUhAuyxwZ-oJXkoYcDJ4vzw1sOcLtTf4a3hvF7U-yVbOdxQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/99/995e41fc-1923-429d-a924-c5bd9e44b72e.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.newsleader',
        'appStoreUrl': 'https://itunes.apple.com/us/app/news-leader/id520202089?mt=8',
        'newsLetterUrl': 'https://profile.newsleader.com/newsletters/manage/',
        'pubBrand': 'The Daily News Leader'
    },
    'gannettcompany-delmarvanow': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/-S8UdY8LbsKQEkb-Kpun70tXxMINR72_tuQ9UNrGZvlWmiuv7dbTiRT6dSyZoL4BBA=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/de/de499245-e628-4cf2-8f1a-ff0ed2e37d48.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.delmarvanow',
        'appStoreUrl': 'https://itunes.apple.com/us/app/delmarva-now/id561809148?mt=8',
        'newsLetterUrl': 'https://profile.delmarvanow.com/newsletters/manage/',
        'pubBrand': 'The Daily Times'
    },
    'gannettcompany-farmingtondailytimes': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/-S8UdY8LbsKQEkb-Kpun70tXxMINR72_tuQ9UNrGZvlWmiuv7dbTiRT6dSyZoL4BBA=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/4d/4d2c4cc2-2f0c-4064-9307-af6ff85a94ac.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.spreedinc.providers.digitalfirstmedia.farmingtondailytimes',
        'appStoreUrl': 'https://itunes.apple.com/us/app/farmington-daily-times/id1025204168?mt=8',
        'newsLetterUrl': 'https://profile.daily-times.com/newsletters/manage/',
        'pubBrand': 'The Daily Times'
    },
    'gannettcompany-thedailytribune': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/eDpsGq9iqpWRRn8O0HA42maFlH36n9qPaxHYfsj2gsf-45t64IwmqHfAQk32x9QcdQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/54/54027e26-401b-4af9-b4d5-9baf7a690e48.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.wisconsinrapidstribune',
        'appStoreUrl': 'https://itunes.apple.com/us/app/wisconsin-rapids-tribune/id531377066?mt=8',
        'newsLetterUrl': 'https://profile.wisconsinrapidstribune.com/newsletters/manage/',
        'pubBrand': 'The Daily Tribune'
    },
    'gannettcompany-demingheadlight': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/QsvTEgLj95garnpvDGVPI8B9Pj5YQrnFDp-dRdVB021fbhuAX3L27c9VMFUNBa7Va7Q4=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/55/55fb5a56-9fa8-49fd-8116-c2193e794ac1.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.demingheadlight.android.prod',
        'appStoreUrl': 'https://itunes.apple.com/us/app/deming-headlight-print-edition/id623900356?mt=8',
        'newsLetterUrl': 'https://profile.demingheadlight.com/newsletters/manage/',
        'pubBrand': 'The Deming Headlight'
    },
    'gannettcompany-desmoinesregister': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/8qF5Sa9GBkExqrMIG8MS3ioQ_bAaeM-TrW4es7fzyVULPzyCmCMLXy5LdX5Py0FAt5M=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/90/902dda09-67ec-4a4f-bc50-dc10ce6c7b0b.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.dmregister',
        'appStoreUrl': 'https://itunes.apple.com/us/app/des-moines-register/id524153305?mt=8',
        'newsLetterUrl': 'https://profile.desmoinesregister.com/newsletters/manage/',
        'pubBrand': 'The Des Moines Register'
    },
    'gannettcompany-mydesert': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/kkGBL6GQ35I3Ba8DYxc36l3Nrds8s_HKHrCSaW3sDKO6MvEZ_0-piYahxrICFmWARpj3=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/d7/d7aafeba-f9fe-4190-a7c2-c1f85507df94.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.mydesert',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-desert-sun/id531366663?mt=8',
        'newsLetterUrl': 'https://profile.desertsun.com/newsletters/manage/',
        'pubBrand': 'The Desert Sun'
    },
    'gannettcompany-elpasotimes': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/qz8VOeVIVqS3z1FPUfGtQh_tPx5lvJNoxmyvv0mZka5_YsgKLo6rIAQoY_xCSdq-Ul8=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/c6/c60b109f-72f1-42ad-a9c2-0b95328b165e.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.spreedinc.providers.elpasotimes.news',
        'appStoreUrl': 'https://itunes.apple.com/us/app/el-paso-times/id1025203188?mt=8',
        'newsLetterUrl': 'https://profile.elpasotimes.com/newsletters/manage/',
        'pubBrand': 'The El Paso Times'
    },
    'gannettcompany-thegleaner': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/q-ay5yZOPebPItbK116XB5kXwNyy0Y5m6iYxM2PBwThtcwx8CYqDGVHEDhbMC0g2e3M=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/6a/6aa0a970-aa2b-46bc-b8aa-7184bc6441c0.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.thegleaner',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-gleaner/id1119335174?mt=8',
        'newsLetterUrl': 'https://profile.thegleaner.com/newsletters/manage/',
        'pubBrand': 'The Gleaner'
    },
    'gannettcompany-greenville': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/R6uf4Io7OnnwXx6c6TahIwclAATdURJFCoOKVuCARyinh59LDPbmCekemZSL7oTK3G0=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/2c/2cfa5c09-2ab0-4f66-a866-b47a3b4eb367.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.greenvilleonline',
        'appStoreUrl': 'https://itunes.apple.com/us/app/greenville-news/id513921905?mt=8',
        'newsLetterUrl': 'https://profile.greenvilleonline.com/newsletters/manage/',
        'pubBrand': 'The Greenville News'
    },
    'gannettcompany-eveningsun': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/8JWiO2ufYBT-fS2dAAjwTxlPHloOtlRhv46-Hf3m50l1wyx-MLiQkjqjVMzyTw8Gz-A=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/0f/0f12e615-6d26-47cb-9b8b-ae12dd8033e2.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.spreedinc.providers.digitalfirstmedia.hanovereveningsun',
        'appStoreUrl': 'https://itunes.apple.com/us/app/evening-sun/id1025200618?mt=8',
        'newsLetterUrl': 'https://profile.eveningsun.com/newsletters/manage/',
        'pubBrand': 'The Hanover Evening Sun'
    },
    'gannettcompany-indystar': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/WVArGSFVwAq_NbDzDwkaGpYpCWCt_y0DePQGiZEmdwx2T2jZSeEP8mMX6pDtxBEfRCU=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/65/6546d2e9-5a24-4892-989d-d7f97a2868b8.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.indystar',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-indianapolis-star-print/id587525368?mt=8',
        'newsLetterUrl': 'https://profile.indystar.com/newsletters/manage/',
        'pubBrand': 'The Indianapolis Star'
    },
    'gannettcompany-theithacajournal': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/gQq-soRE8le7xslgrYfzdUKDYRvdveZRCe0xB4nIbMVDb84eNxn0gXBU72ptBxOyuhxU=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/2a/2abab6ce-2ec1-40c7-8695-7390239bcf28.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.ithacajournal',
        'appStoreUrl': 'https://itunes.apple.com/us/app/ithaca-journal/id520501616?mt=8',
        'newsLetterUrl': 'https://profile.theithacajournal.com/newsletters/manage/',
        'pubBrand': 'The Ithaca Journal'
    },
    'gannettcompany-jacksonsun': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/oNqqvYqMXDw9uoml45E9UGD0rb86L25r2y-lVojOm6MqMfd2j16m5edXV7ch0JDNBWw=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/68/68d41d4e-7569-43b7-9e65-93753cf04882.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.jacksonsun',
        'appStoreUrl': 'https://itunes.apple.com/us/app/jackson-sun/id525825062?mt=8',
        'newsLetterUrl': 'https://profile.jacksonsun.com/newsletters/manage/',
        'pubBrand': 'The Jackson Sun'
    },
    'gannettcompany-lohud': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/x9I7i-GC_z9uXCdHX23OKXhjX63ITuePU5J5F5d7C0Atf5dqTCZWMhvfZmrX_bBKtzmU=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/50/5001edc2-8dae-46f0-a708-974a304670b5.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.lohud',
        'appStoreUrl': 'https://itunes.apple.com/us/app/lohud/id518390835?mt=8',
        'newsLetterUrl': 'https://profile.lohud.com/newsletters/manage/',
        'pubBrand': 'The Journal News'
    },
    'gannettcompany-lascrucessun-news': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/mJU1QHUrywxAMZfLF1e4_sWxRQawUZmh9UqKdMizebjoof_GslOCvK1bb0E2MStAVG0=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/4b/4ba1af0d-a694-4ebc-ade0-a1267b4cd926.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.spreedinc.providers.digitalfirstmedia.lascrucessunnews',
        'appStoreUrl': 'https://itunes.apple.com/us/app/las-cruces-sun-news/id1025203720?mt=8',
        'newsLetterUrl': 'https://profile.lcsun-news.com/newsletters/manage/',
        'pubBrand': 'The Las Cruces Sun-News'
    },
    'gannettcompany-theleafchronicle': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/qDZXJddRQ317zGaRzkPjwL2VTWRuCdyQSlOgW9Km52x1kuSGqOjlyXFAx7mCg6QMpr5-=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/0f/0f2521b8-7126-4247-a01f-94a08a571b6a.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.theleafchronicle',
        'appStoreUrl': 'https://itunes.apple.com/us/app/leaf-chronicle/id528063374?mt=8',
        'newsLetterUrl': 'https://profile.theleafchronicle.com/newsletters/manage/',
        'pubBrand': 'The Leaf-Chronicle'
    },
    'gannettcompany-themarionstar': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/csN9zF1yiiXakBUXyCZFSsCMrhe3b1Xj7tjfhXbseMUmGMT7wlmdw8Sc2UuyDVfZ9A=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/fc/fc47d473-7f86-43b2-994b-b00a3c29abcd.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.marionstar',
        'appStoreUrl': 'https://itunes.apple.com/us/app/lancaster-eagle-gazette/id545726818?mt=8',
        'newsLetterUrl': 'https://profile.marionstar.com/newsletters/manage/',
        'pubBrand': 'The Marion Star'
    },
    'gannettcompany-jsonline': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/TegQnqLioH74aAM8bXivlbgrmieXgi5aW1gjEj7ZCYt_5u_Ytp8TRQ4YB_bfhpqfacA=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/3d/3d92775d-5ca9-4364-b52d-88ccbcf30aca.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.mjs.android',
        'appStoreUrl': 'https://itunes.apple.com/us/app/milwaukee-journal-sentinel/id526882300?mt=8',
        'newsLetterUrl': 'https://profile.jsonline.com/newsletters/manage/',
        'pubBrand': 'The Milwaukee Journal Sentinel'
    },
    'gannettcompany-montgomeryadvertiser': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/zBwFq-LERnIfb5ya0nMoeNzr4X8EEdbrHhiF830odVuHCqFm7yckXs7Sq-x-dPVaWQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/68/68d28774-7dd9-406c-86fb-1b5b8f7375eb.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.montgomeryadvertiser',
        'appStoreUrl': 'https://itunes.apple.com/us/app/montgomery-advertiser/id531366264?mt=8',
        'newsLetterUrl': 'https://profile.montgomeryadvertiser.com/newsletters/manage/',
        'pubBrand': 'The Montgomery Advertiser'
    },
    'gannettcompany-delawareonline': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/c3ukFteWpowGF37BbJwOcZMurGKhvddIeVGLKaBDfRLOBgqPkS0KCuE9M3L3UM_AAP4=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/1b/1b3519b4-5241-4d52-99f2-72a31ba3a7c5.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.delawareonline',
        'appStoreUrl': 'https://itunes.apple.com/us/app/delaware-online/id493545272?mt=8',
        'newsLetterUrl': 'https://profile.delawareonline.com/newsletters/manage/',
        'pubBrand': 'The News Journal'
    },
    'gannettcompany-thenews-messenger': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/ptXQzZjUYNahcSfslJx57OwDjrldviAayO1LrvI1Bor1mEOZc6MLhasBjqGYdYHr4m4=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/e1/e11a104b-0130-40ca-bea9-18ce7b4b3a80.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.thenewsmessenger',
        'appStoreUrl': 'https://itunes.apple.com/us/app/fremont-news-messenger/id545725213?mt=8',
        'newsLetterUrl': 'https://profile.thenews-messenger.com/newsletters/manage/',
        'pubBrand': 'The News-Messenger'
    },
    'gannettcompany-newspress': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/RHR69elUl4ICgR1C2Juav0wBNJ8lNsJSWa35UJ-CzNiqcBcsZx4irn_ldB4XVgmDwzww=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/35/350ac095-b078-4e2f-b621-6fdca60f6a28.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.newspress',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-news-press/id566322004?mt=8',
        'newsLetterUrl': 'https://profile.news-press.com/newsletters/manage/',
        'pubBrand': 'The News-Press'
    },
    'gannettcompany-thenewsstar': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/qoqn2CaEOMMGOqcpbs4BqJM9XJqKjtSfqXgBbi1DmHg5wX_IMQPJlOyApX1xl3gV6Ss=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/3b/3b084349-ffad-432c-ac49-e324306c0fe1.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.thenewsstar',
        'appStoreUrl': 'https://itunes.apple.com/us/app/news-star/id553302239?mt=8',
        'newsLetterUrl': 'https://profile.thenewsstar.com/newsletters/manage/',
        'pubBrand': 'The News-Star'
    },
    'gannettcompany-post-crescent': {
        'AppDownloadImage': 'https://lh3.googleusercontent.com/RgDmuc__B5azMiu3luHEYBUH4aSoQ3TwBxy7WRruHnERtswssaBr0fJuoYkifXEBoPQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/c9/c9eb9578-d2f4-439e-83fe-877986e42c0d.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.postcrescent',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-post-crescent-print/id600120322?mt=8',
        'newsLetterUrl': 'https://profile.postcrescent.com/newsletters/manage/',
        'pubBrand': 'The Post-Crescent'
    },
    'gannettdigital-northjersey': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/LPjtKIO6oMtEQ2M9fBpPfdWM354SlK78HbwTkq1K8j0rFzH8p8FqSfIID1b5_bbmHg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/73/730be14e-9711-4681-b445-f457383d8c8e.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.northjersey.developer.northjerseylatestnews',
        'appStoreUrl': 'https://itunes.apple.com/us/app/northjersey-com/id446490632?mt=8',
        'newsLetterUrl': 'https://profile.northjersey.com/newsletters/manage/',
        'pubBrand': 'The Record & Herald News'
    },
    'gannettcompany-fdlreporter': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/DexPjfXPdhLhtnZ-5_mQsCkFYc2LYGrpfebIdgwMRUZguj1zF4ZjMzFyrNNAs4IfqmSj=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/f3/f323b2d9-8aa0-4078-8571-f724b2da605e.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.fdlreporter',
        'appStoreUrl': 'https://itunes.apple.com/us/app/fdl-reporter/id531422341?mt=8',
        'newsLetterUrl': 'https://profile.fdlreporter.com/newsletters/manage/',
        'pubBrand': 'The Reporter'
    },
    'gannettcompany-thecalifornian': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/vVxM1yHW7_8aeCvpvbQ33c2kGSDyMMIWGSfnUgr5u6bfZLnvNwZhv9134r5Bi-XJYVI=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/f0/f088dad9-129a-45b9-a632-7f5a85e03cad.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.thecalifornian',
        'appStoreUrl': 'https://itunes.apple.com/us/app/salinas-californian/id566338589?mt=8',
        'newsLetterUrl': 'https://profile.thecalifornian.com/newsletters/manage/',
        'pubBrand': 'The Salinas Californian'
    },
    'gannettcompany-sheboyganpress': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/zZzKf-lveA36Rbi_xyR3stifZQp_IMbC2MookLGv0ej0DQP8tUmNkgaZDyxbxBoTqQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/3f/3fd48c34-643b-44f8-98e5-d3142c3819eb.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.sheboyganpress',
        'appStoreUrl': 'https://itunes.apple.com/us/app/sheboygan-press/id531373974?mt=8',
        'newsLetterUrl': 'https://profile.sheboyganpress.com/newsletters/manage/',
        'pubBrand': 'The Sheboygan Press'
    },
    'gannettcompany-thespectrum': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/dx7j31RjP6bywuIWN489H5e1msGjxq1k6v60rm6TwhM7CUb2p0K6GQdVCp86_b5IRg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/9c/9c9e6d44-fef3-42de-8346-f9ebc8a6befa.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.spectrum',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-spectrum/id520602256?mt=8',
        'newsLetterUrl': 'https://profile.thespectrum.com/newsletters/manage/',
        'pubBrand': 'The Spectrum'
    },
    'gannettcompany-thestarpress': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/5xVye-K8v4awocX-zqB_nHznAM1zgAP0cXHLxImjRMj1o3xBvbcuoBigXE_M7yRnRw=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/25/25b93aec-0679-40ec-b015-33d3440b3c91.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.thestarpress',
        'appStoreUrl': 'https://itunes.apple.com/us/app/star-press/id553277333?mt=8',
        'newsLetterUrl': 'https://profile.thestarpress.com/newsletters/manage/',
        'pubBrand': 'The Star Press'
    },
    'gannettcompany-tcpalm': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/HHq3hZ6JmnrfGh2KAHKxnYIf9aI72ewe7AsllT9TAmQWqOj2Yv8AlechpXcQSJ01VQ=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/08/08d17339-064b-45f7-8298-eba9fd2a278f.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.tcpalm.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/tcpalm/id1119325185?mt=8',
        'newsLetterUrl': 'https://profile.tcpalm.com/newsletters/manage/',
        'pubBrand': 'The Stuart News & Treasure Coast Digital'
    },
    'gannettcompany-tennessean': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/x3OeWt-T6bK8Exp1k_jiwNZ9ffBE4fXz-nGzPxBRypq7pytUQUqYWPzHjuP_Qn0ro-0=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/af/af7d394c-0c38-457a-bbcd-d9ddc625369f.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.tennessean',
        'appStoreUrl': 'https://itunes.apple.com/us/app/tennessean/id526094470?mt=8',
        'newsLetterUrl': 'https://profile.tennessean.com/newsletters/manage/',
        'pubBrand': 'The Tennessean'
    },
    'gannettcompany-shreveporttimes': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/KYT7I-rzsFloJd9inmXQNnNZyCCP1zZCixcQyO85M24ffQJN3FoTNjfNo7diaKgysw=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/a7/a7310d8d-a192-4457-87f1-73ee4608ebcc.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.shreveporttimes',
        'appStoreUrl': 'https://itunes.apple.com/us/app/shreveport-times/id551771793?mt=8',
        'newsLetterUrl': 'https://profile.shreveporttimes.com/newsletters/manage/',
        'pubBrand': 'The Times'
    },
    'gannettcompany-thetowntalk': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/jUynrWDUD9Hhk6lSQR4MFqzlfJZkUOapuZDPZ4xjx84D2S-LkAcptEjVPS-jYoHzFek=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/24/24ae7baf-cf4c-46fb-94cf-6353d85e8e05.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.thetowntalk',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-town-talk/id528046166?mt=8',
        'newsLetterUrl': 'https://profile.thetowntalk.com/newsletters/manage/',
        'pubBrand': 'The Town Talk'
    },
    'gannettcompany-yorkdispatch': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/WOpKusdMhU1kpV4LZkId5ZIqg6QuRS4HtqBP_nbJFmvyaSaOWH3FD0pU-vJRkXK71p4=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/0a/0a13c30d-37cc-4353-9435-cb227b822971.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.spreedinc.providers.digitalfirstmedia.yorkdispatch',
        'appStoreUrl': 'https://itunes.apple.com/us/app/the-york-dispatch/id1025201657?mt=8',
        'newsLetterUrl': 'https://profile.yorkdispatch.com/newsletters/manage/',
        'pubBrand': 'The York Dispatch'
    },
    'gannettcompany-thetimesherald': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/MvG7DQYhbMAnUwkf-6BjkDPxxfHk2RworS-1vl9Q7yXwFdag_1CxO43WB28w2EI6Tg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/d3/d3268e63-836a-4b23-b4cd-9e4fe11c45c8.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.timesherald',
        'appStoreUrl': 'https://itunes.apple.com/us/app/herald-times-reporter/id531367431?mt=8',
        'newsLetterUrl': 'https://profile.thetimesherald.com/newsletters/manage/',
        'pubBrand': 'Times Herald'
    },
    'gannettcompany-timesrecordnews': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/7t9atL6DZdpyJ6UzSLZWhKoT22KdaBWTegCHB0iMksA6JIiSszRcOMwjpmfsKeJ7St4=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/f5/f5aa40ea-aba9-405c-acad-e9ac5c00c3b6.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.timesrecordnews.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/times-record-news/id1119333677?mt=8',
        'newsLetterUrl': 'https://profile.timesrecordnews.com/newsletters/manage/',
        'pubBrand': 'Times Record News'
    },
    'gannettcompany-zanesvilletimesrecorder': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/CrdYEBCLg225nvqcHKq8ErjKc1lsT-3CuGNqh8fScmpLijvigZFHdB07edt3g2fn4Lw=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/d8/d84ff993-6dd5-425f-88dc-3b8ac39105a8.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.zanesvilletimesrecorder',
        'appStoreUrl': 'https://itunes.apple.com/us/app/times-recorder/id551652387?mt=8',
        'newsLetterUrl': 'https://profile.zanesvilletimesrecorder.com/newsletters/manage/',
        'pubBrand': 'Times Recorder'
    },
    'gannettcompany-vcstar': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/cb3xQxhbqiHZ-vVHJHENlNpJ5pzSAQDDFk1Pt8jiZeag88yX-COf0fVa4i21AhdPmg=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/76/76916bf7-c0c6-4c65-889d-8f6a812079ed.jpeg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.scripps.vcstar.mobile',
        'appStoreUrl': 'https://itunes.apple.com/us/app/ventura-county-star/id1119322136?mt=8',
        'newsLetterUrl': 'https://profile.vcstar.com/newsletters/manage/',
        'pubBrand': 'Ventura County Start'
    },
    'gannettcompany-visaliatimesdelta': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/EDokoQoVvBM8Mz-6BCdd0TBYFWX3o-Ky8Ix7_zYk9sr9q42Z_ISW4Hoqnc2KDF1ibKTW=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/32/32d0323d-24aa-437c-8158-1b609cdf655f.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.visaliatimesdelata',
        'appStoreUrl': 'https://itunes.apple.com/us/app/visalia-times-delta/id566363893?mt=8',
        'newsLetterUrl': 'https://profile.visaliatimesdelta.com/newsletters/manage/',
        'pubBrand': 'Visalia Times-Delta'
    },
    'gannettcompany-wausaudailyherald': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/ycIIeVpjIF8QJTq0oEmW2wFMVfMai--2KXmMnsHgRT9QHVHKZWGwIfITETtfrjxzBR8G=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/ae/aee41e8d-ff00-4331-ac4e-2e8c1517a903.jpg',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.gannett.local.library.news.wausaudailyherald',
        'appStoreUrl': 'https://itunes.apple.com/us/app/wausau-daily-herald/id531376022?mt=8',
        'newsLetterUrl': 'https://profile.wausaudailyherald.com/newsletters/manage/',
        'pubBrand': 'Wausau Daily Herald'
    },
    'gannettcompany-yorkdailyrecordydr': {
        // 'AppDownloadImage': 'https://lh3.googleusercontent.com/o3oYlRYBmFDYWoUGmVa13kmkuFYffwYw5Yt5d2mb89KhRZZ_CelcYUe8Ieo5aPCQnGs=s180-rw',
        'AppDownloadImage': 'https://cdn.taboola.com/static/06/062baeed-e6e0-42d9-bb25-0f367ac9d02e.png',
        'goolePlayUrl': 'https://play.google.com/store/apps/details?id=com.spreedinc.providers.digitalfirstmedia.yorkdailyrecord',
        'appStoreUrl': 'https://itunes.apple.com/us/app/york-daily-record/id1025203087?mt=8',
        'newsLetterUrl': 'https://profile.ydr.com/newsletters/manage/',
        'pubBrand': 'York Daily Record'
    }
};
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
        __trcError(e);
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
 dev ticket DEV-5019 is resolved
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
 end of hotfix DEV-5019 **/
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
TRC.redirectToStore = function () {
    var linkToStore = {
        defaultLink: TRC.publisherMapToPublisherCard[TRC.publisherId].goolePlayUrl,
        googleStore: TRC.publisherMapToPublisherCard[TRC.publisherId].goolePlayUrl,
        appleStore: TRC.publisherMapToPublisherCard[TRC.publisherId].appStoreUrl
    };
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    if (isMobile.any()) {
        if (linkToStore.defaultLink) {
            redirectTo = linkToStore.defaultLink;
        }
    }
    if (isMobile.iOS()) {
        if (linkToStore.appleStore) {
            redirectTo = linkToStore.appleStore;
        } else if (linkToStore.defaultLink) {
            redirectTo = linkToStore.defaultLink;
        }
    }
    if (isMobile.Android()) {
        if (linkToStore.googleStore) {
            redirectTo = linkToStore.googleStore;
        } else if (linkToStore.defaultLink) {
            redirectTo = linkToStore.defaultLink;
        }
    }
    switch (redirectTo) {
        case linkToStore.appleStore: {
            window.location.href = linkToStore.appleStore;
            console.log('Redirecting to ' + linkToStore.appleStore);
            break;
        }
        case linkToStore.googleStore: {
            window.location.href = linkToStore.googleStore;
            console.log('Redirecting to ' + linkToStore.appleStore);
            break;
        }
            defaultLink: {
                window.location.href = linkToStore.defaultLink;
                console.log('Redirecting to ' + linkToStore.appleStore);
            }
    }
}
/* upload from our CDN gannett-network custom fonts */
try {
    TRC.net.loadScript(TRC.PROTOCOL + '//cdn.taboola.com/static/impl/css/gannett_network_fonts.css', 'css', null, null, true);
}catch (e) {
    __trcError(e);
}
/* upload from our CDN gannett-network custom newsletter stylesheet */
try {
    TRC.net.loadScript(TRC.PROTOCOL + '//cdn.taboola.com/static/impl/css/gannett-network_newsletterCard.css', 'css', null, null, true);
}catch (e) {
    __trcError(e);
}
/* upload from our CDN gannett-network custom app download card stylesheet */
try {
    TRC.net.loadScript(TRC.PROTOCOL + '//cdn.taboola.com/static/impl/css/gannett-network_AppDownloadCard.css', 'css', null, null, true);
}catch (e) {
    __trcError(e);
}
TRC.NewsLetterCard = function(frameElementParentNode){
    try {
        var trackingSuffix = '?utm_campaign=news-alert&utm_medium=taboola&utm_source=feed',
            newsletterURL = TRC.publisherMapToPublisherCard[TRC.publisherId].newsLetterUrl + trackingSuffix;
        var newsletterCard = '<div id="newsLetterContainer">' +
            '<div id="newsletterLabel">NEWSLETTER</div>' +
            '<div id="newsletterTextContainer">' +
            '<div id="newsletterText">Be the first to be informed of important news as it happens in your area</div>' +
            '<a href="' + newsletterURL + '"><div id="newsletterButton">Sign up</div></a>' +
            '</div>' +
            '</div>';
        frameElementParentNode.insertAdjacentHTML('afterbegin',newsletterCard);
    }catch (e) {
        __trcError(e);
    }
}
TRC.AppDownloadCard = function (frameElementParentNode) {
    AppDownloadContainer = document.createElement('img');
    AppDownloadContainer.addEventListener('click', TRC.redirectToStore);
    AppDownloadContainer.src = TRC.publisherMapToPublisherCard[TRC.publisherId].AppDownloadImageTest;
    AppDownloadContainer.width = document.getElementsByClassName('tbl-feed-container')[0].clientWidth ;
    frameElementParentNode.appendChild(AppDownloadContainer);
}
TRC.AppDownloadCardNew = function(frameElementParentNode){
    try {
        var pubBrand = TRC.publisherMapToPublisherCard[TRC.publisherId].pubBrand;
        var appDownloadCard = document.createElement('div');
        appDownloadCard.id = 'appDownloadContainer';
        appDownloadCard.innerHTML = '<div id="appDownloadLabel">NEWS APP</div>' +
            '<div id="appIconContainer">' +
            '<div id="appIcon" style="background-image: url('+TRC.publisherMapToPublisherCard[TRC.publisherId].AppDownloadImage+');"></div>' +
            '</div>' +
            '<div id="appDownloadTextContainer">' +
            '<div id="appDownloadPubName">' + pubBrand + '</div>' +
            '<div id="appDownloadLatestTitle">Latest Local News</div>' +
            '<div id="appDownloadByGannettTitle">By Gannett</div>' +
            '<div id="appDownloadButton">' +
            '<svg version="1.1" id="buttonIcon" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 10.4 9.2" style="enable-background:new 0 0 10.4 9.2; fill: #FFF" xml:space="preserve">' +
            '<g><polygon points="9.4,4.3 7.4,4.3 7.4,0.7 3,0.7 3,4.3 1,4.3 5.2,8"/><rect x="1" y="8.3" width="8.4" height="0.7"/></g>' +
            '</svg>' +
            '<span id="buttonText">Download App</span>' +
            '</div>' +
            '</div>';
        appDownloadCard.addEventListener('click', TRC.redirectToStore);
        frameElementParentNode.insertAdjacentElement('afterbegin',appDownloadCard);
    }
    catch (e) {
        __trcError(e);
    }
}
}
,"get-user":function(){return null;},"get-creator":function(){var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta', false);for(var i=0;i<m.length;i++){if(m[i].name=='uploader'||m[i].name=='item-uploader')return m[i].content;}},"get-views":function() {var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta', false);for(var i=0;i<m.length;i++){if(m[i].name=='views'||m[i].name=='item-views')return m[i].content;}},"get-rating":function() {var m=document.getElementsByTagName('head')[0].getElementsByTagName('meta', false);for(var i=0;i<m.length;i++){if(m[i].name=='rating'||m[i].name=='item-rating'){ if(!isNaN(parseFloat(m[i].content))) return m[i].content;}}},"get-tags":function() {return [];},"logo-image":"http://cdn.taboolasyndication.com/taboola/powered-by.png","has_valid_rss":false,"actionscript_version":"3","brightcove-uses-reference":false,"publisher-end":function(id){ },"ie-logo-image":"http://cdn.taboolasyndication.com/taboola/powered-by-small.gif","attribution":true,"notify-loaded":true,"metafields":"","normalize-item-id":function(itemid,type,canon){if(!canon&&type=='text'&&typeof itemid=='string'&&itemid.search(new RegExp('^https?://'))==0)itemid=itemid.replace(/\?.*/,'', false);return itemid.toLowerCase();},"normalize-item-url":function(itemurl,type,canon){return itemurl;},"read-paused-bcplayer":false,"normalize-request-param":function(req,mode) {
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
,"normalize-log-param":function(name,value,mode) {return value;},"timeout":30000,"prenormalize-item-id":{"host":true,"fragment":"^(\/video\/|!)","query":["p","id","Avis","Site","Dato","Date","Kategori","Category","Lopenr","ArtNo"],"truncate-at":["search.searchcompletion.com","org.mozilla.javascript.undefined"],"trailing-dirsep":true},"prenormalize-item-url":false,"loader-impl":"","trc-network-mapping":{"newsletter.livoniaoe.com":"gannettdigital-livoniaoe-newsletter","wgrz.com":"gannettcompany-wgrz","ydr.com":"gannettcompany-yorkdailyrecordydr","coloradoan.com/app":"gannettcompany-coloradoanapp","azcentral.com/phoenixxtra":"gannettdigital-phoenixxtra","marinecorpstimes.com":"gannettcompany-marinecorpstimes","newsletter.yorkdailyrecord.com":"gannettdigital-york-dailyrecord-newsletter","pressconnects.com/app":"gannettcompany-press&sunbulletinapp","wzzm13.com":"gannettcompany-wzzm","chillicothegazette.com":"gannettcompany-chillicothegazette","newsletter.yorkdispatch.com":"gannettdigital-york-dispatch-newsletter","preview.newsletter.detroitfreepress.com":"gannettdigital-detroitfreepress-newsletter","wisconsinrapidstribune.com/app":"gannettcompany-thedailytribuneapp","portclintonnewsherald.com/app":"gannettcompany-portclintonnewsheraldapp","preview.newsletter.jacksontn.com":"gannettdigital-jacksontn-newsletter","clarionledger.com":"gannettcompany-clarionledger","www.greenbaypressgazette.com/packers":"gannettdigital-packers","news10.net":"gannettcompany-kxtv","ux.elpasoymas.com":"gannettcompany-elpasoymas","preview.newsletter.wausau.com":"gannettdigital-wausau-newsletter","newsletter.ithaca.com":"gannettdigital-ithaca-newsletter","google.com":"gennettdigitalexchange-","dnj.com":"gannettcompany-dnj","pnj.com/app":"gannettcompany-pnjapp","preview.newsletter.oshkosh.com":"gannettdigital-oshkosh-newsletter","independentmail.com/app":"gannettcompany-independentmailapp","portclintonnewsherald.com":"gannettcompany-newsherald","ksdk.com":"gannettcompany-ksdk","coloradoan.com":"gannettcompany-coloradoan","redskinswire.usatoday.com":"usatoday-redskinswire","newsletter.wisconsinrapids.com":"gannettdigital-wisconsinrapids-newsletter","htrnews.com/app":"gannettcompany-heraldtimesreporterapp","shreveporttimes.com/app":"gannettcompany-shreveporttimesapp","sctimes.com/app":"gannettcompany-stcloudtimesapp","delmarvanow.com/app":"gannettcompany-delmarvanowapp","steelerswire.usatoday.com":"usatoday-steelwire","newsletter.zanesville.com":"gannettdigital-zanesville-newsletter","daily-times.com/app":"gannettcompany-farmingtondailytimesapp","jsonline.com/app":"gannettcompany-jsonlineapp","preview.newsletter.burlington.com":"gannettdigital-burlington-newsletter","knoxnews.com/app":"gannettcompany-knoxnewsapp","thecalifornian.com":"gannettcompany-thecalifornian","stargazette.com":"gannettcompany-stargazette","newsletter.jacksontn.com":"gannettdigital-jacksontn-newsletter","reno.com/app":"gannettcompany-renocomapp","commercialappeal.com":"gannettcompany-commercialappeal","newsletter.lebanon.com":"gannettdigital-lebanon-newsletter","newsletter.burlington.com":"gannettdigital-burlington-newsletter","thestarpress.com":"gannettcompany-thestarpress","guampdn.com":"gannettcompany-guampdn","argusleader.com/app":"gannettcompany-argusleaderapp","newsletter.mountainhome.com":"gannettdigital-mountainhome-newsletter","cincinatti.com/reds":"gannettdigital-reds","hometownlife.com":"gannettcompany-hometownlife","nwcn.com":"gannettcompany-nwcn","ftw.usatoday.com":"usatoday-ftw","thedailyjournal.com":"gannettcompany-thedailyjournal","cincinnati.com":"gannettcompany-newscincinnati","wcnc.com":"gannettcompany-wcnc","awbir.com":"gannettcompany-wbit","hattiesburgamerican.com/app":"gannettcompany-hattiesburgamericanapp","gosanangelo.com/app":"gannettcompany-gosanangeloapp","statesmanjournal.com":"gannettcompany-statesmanjournal","elsoldesalinas.com/app":"gannettcompany-elsoldesalinasapp","hometownlife.com/app":"gannettcompany-hometownlifeapp","vagabondish.com":"usatoday-vagabondish","huskermax.com":"gannettdigitalsports-nebraskahuskermaxcom","wausaudailyherald.com/app":"gannettcompany-wausaudailyheraldapp","yorkdispatch.com":"gannettcompany-yorkdispatch","dailyrecord.com":"gannettcompany-dailyrecord","newsletter.manitowoc1.com":"gannetdigital-manitowoc-newsletter","myozaukeenow.com/app":"gannettcompany-myozaukeenowapp","newsletter.lancaster.com":"gannettdigital-lancaster-newsletter","pantherswire.usatoday.com":"usatoday-pantherswire","broncoswire.usatoday.com":"usatoday-broncoswire","sheboyganpress.com":"gannettcompany-sheboyganpress","thetowntalk.com/app":"gannettcompany-thetowntalkapp","preview.newsletter.livingston.com":"gannettdigital-livingston-newsletter","bucyrustelegraphforum.com":"gannettcompany-telegraph-forum","baxterbulletin.com":"gannettcompany-baxterbulletin","preview.newsletter.lansing.com":"gannettdigital-lansing-newsletter","pal-item.com":"gannettcompany-pal-item","elpasoymas.com/app":"gannettcompany-elpasoymasapp","newsletter.shreveport.com":"gannettdigital-shreveport-newsletter","desertsun.com":"gannettcompany-mydesert","wisfarmer.com":"gannettcompany-wisfarmer","newsletter.livingston.com":"gannettdigital-livingston-newsletter","mynorthshorenow.com/app":"gannettcompany-mynorthshorenowapp","wmaz.com":"gannettcompany-wmaz","wausaudailyherald.com":"gannettcompany-wausaudailyherald","fdlreporter.com":"gannettcompany-fdlreporter","preview.newsletter.wisconsinrapids.com":"gannettdigital-wisconsinrapids-newsletter","app.com":"gannettcompany-app","fftoday.com":"usatoday-fftoday","mynorthshorenow.com":"gannettcompany-mynorthshorenow","dailyworld.com/app":"gannettcompany-dailyworldapp","timesrecordnews.com":"gannettcompany-timesrecordnews","draftwire.usatoday.com":"usatoday-draftwire","newsletter.lansing.com":"gannettdigital-lansing-newsletter","thv11.com":"gannettcompany-kthv","newsletter.appleton.com":"gannettdigital-appleton-newsletter","lohud.com/app":"gannettcompany-lohudapp","preview.newsletter.coloradoan.com":"gannettdigital-battlecreek-newsletter","desmoines.com/hawkeyes":"gannettdigital-hawkeyes","dukereport.com":"usatoday-dukereport","packersnews.com/app":"gannettcompany-packersnewsapp","ldnews.com/app":"gannettcompany-ldnewsapp","press-citizen.com":"gannettcompany-iowacitypress-citizen","preview.newsletter.staunton.com":"gannettdigital-staunton-newsletter","reno.com":"gannettcompany-reno","sctimes.com":"gannettcompany-st-cloudtimes","kvue.com":"gannettcompany-kvue","thetimesherald.com":"gannettcompany-thetimesherald","preview.newsletter.livoniaoe.com":"gannettdigital-livoniaoe-newsletter","preview.newsletter.greatfalls.com":"gannettdigital-greatfalls-newsletter","newsletter.chillicothe.com":"gannettdigital-chillicothe-newsletter","newsletter.detroitfreepress.com":"gannettdigital-detroitfreepress-newsletter","lavozarizona.com":"gannett-lavozarizona","preview.newsletter.clarksville.com":"gannettdigital-clarksville-newsletter","guampdn.com/app":"gannettcompany-guampdnapp","lansingstatejournal.com/app":"gannettcompany-lansingstatejournalapp","experience.usatoday.com":"gannett-usatoday-travel","fftoolbox.com":"usatoday-fftoolbox","newsletter.alexandria.com":"gannettdigital-alexandria-newsletter","lancastereaglegazette.com":"gannettcompany-lancastereaglegazette","newsletter.farmington.com":"gannettdigital-farmington-newsletter","rgj.com":"gannettcompany-rgj","mysouthnow.com/app":"gannettcompany-mysouthnowapp","thespectrum.com/app":"gannettcompany-thespectrumapp","newsletter.jacksonms.com":"gannettdigital-jacksonms-newsletter","postcrescent.com/app":"gannettcompany-postcrescentapp","jacksonsun.com/app":"gannettcompany-jacksonsunapp","pnj.com":"gannettcompany-pnj","michigan.com/lions":"gannettdigital-lions","thetimesherald.com/app":"gannettcompany-thetimesheraldapp","hornsports.com":"gannettdigitalsports-texashornsportscom","brookfield-elmgrovenow.com/app":"gannettcompany-brookfield-elmgrovenowapp","lavozarizona.com/app":"gannettcompany-lavozarizonaapp","newsletter.newark.com":"gannettdigital-newark-newsletter","mynorthwestnow.com/app":"gannettcompany-mynorthwestnowapp","argusleader.com":"gannettcompany-argusleader","bnqt.com":"usatoday-bnqt","citizen-times.com/app":"gannettcompany-citizentimesapp","thegleaner.com/app":"gannettcompany-thegleanerapp","thegleaner.com":"gannettcompany-thegleaner","preview.newsletter.stcloud.com":"gannettdigital-stcloud-newsletter","somethingelse.com":"ganett-usatoday-travel","newsletter.chambersburg.com":"gannettdigital-chambersburg-newsletter","michigan.com/tigers":"gannettdigital-tigers","delawareonline.com/app":"gannettcompany-delawareonlineapp","newsletter.lafayettela.com":"gannett-lafayettela-newsletter","farmersadvance.com/app":"gannettcompany-farmersadvanceapp","kgw.com":"gannettcompany-kgw","newsletter.palmsprings.com":"gannettdigital-palmsprings-newsletter","newsletter.greenville.com":"gannettdigital-greenville-newsletter","courierpostonline.com":"gannettcompany-courierpostonline","thespectrum.com":"gannettcompany-thespectrum","preview.newsletter.marshfield.com":"gannettdigital-marshfield-newsletter","northjersey.com/northjerseyfireandice":"gannettdigital-northjerseyfireandice","thenorthwestern.com":"gannettcompany-thenorthwestern","news-press.com/app":"gannettcompany-newspressapp","pacificwaverider.com":"usatoday-pacificwaverider","michigan.com/pistons":"gannettdigital-pistons","whas11.com":"gannettcompany-whas","fanspeak.com":"usatoday-fanspeak","dolphinswire.usatoday.com":"usatoday-dolphinswire","newsleader.com/app":"gannettcompany-newsleaderapp","commercialappeal.com/app":"gannettcompany-commercialappealapp","federaltimes.com":"gannettcompany-federaltimes","thenews-messenger.com/app":"gannettcompany-thenewsmessengerapp","livingstondaily.com/app":"gannettcompany-livingstondailyapp","10best.com":"usatoday-10best","ithacajournal.com":"gannettcompany-theithacajournal","collegefootballpoll.com":"gannettdigitalsports-collegefootballpoll","thetowntalk.com":"gannettcompany-thetowntalk","news-press.com":"gannettcompany-newspress","currentargus.com/app":"gannettcompany-currentargusapp","michigan.com/redwings":"gannettdigital-redwings","desertsun.com/app":"gannettcompany-mydesertapp","elpasoymas.com":"gannettcompany-elpasoymas","giantswire.usatoday.com":"usatoday-giantswire","redding.com":"gannettcompany-redding","newsletter.salinas.com":"gannettdigital-salinas-newsletter","newsletter.brevard.com":"gannettdigital-brevard-newsletter","eveningsun.com/app":"gannettcompany-eveningsunapp","newsletter.portclinton.com":"gannettdigital-portclinton-newsletter","tallahassee.com":"gannettcompany-tallahassee","newsletter.fonddulac.com":"gannettdigital-fonddulac-newsletter","newsletter.bucyrus.com":"gannettdigital-bucyrus-newsletter","newsletter.coshocton.com":"gannettdigital-coshocton-newsletter","newsletter.greatfalls.com":"gannettdigital-greatfalls-newsletter","9news.com":"gannettcompany-kusa","azcentral.com/app":"gannettcompany-azcentralapp","tennessean.com":"gannettcompany-tennessean","jconline.com":"gannettcompany-journalandcourier","wltx.com":"gannettcompany-wltx","freep.com/app":"gannettcompany-freepapp","elpasotimes.com/app":"gannettcompany-elpasotimesapp","democratandchronicle.com/app":"gannettcompany-democratchronicleapp","pickinsplinters.com":"gannettdigital-pickinsplinters","tcpalm.com/app":"gannettcompany-tcpalmapp","newsletter.poughkeepsie.com":"gannettdigital-poughkeepsie-newsletter","thnt.com":"gannettcompany-thnt","citizen-times.com":"gannettcompany-citizentimes","jconline.com/app":"gannettcompany-journalandcourierapp","postcrescent.com":"gannettcompany-post-crescent","htrnews.com":"gannettcompany-heraldtimesreporter","hattiesburgamerican.com":"gannettcompany-hattiesburgamerican","newsletter.visaliatulare.com":"gannettdigital-visaliatulare-newsletter","zanesvilletimesrecorder.com":"gannettcompany-zanesvilletimesrecorder","newsletter.binghamton.com":"gannettdigital-binghamton-newsletter","khou.com":"gannettcompany-khou","virginiatech.sportswar.com":"gannettdigitalsports-virginiatech-virginiatechsportswarcom","yorkdispatch.com/app":"gannettcompany-yorkdispatchapp","newsletter.marionstar.com":"gannettdigital-marionstar-newsletter","newsletter.rochester.com":"gannettdigital-rochester-newsletter","newsletter.wilmington.com":"gannettdigital-wilmington-newsletter","kens5.com":"gannettcompany-kens","abc10.com":"gannettcompany-kxtv","ldnews.com":"gannettcompany-ldnews","mysouthshorenow.com":"gannettcompany-mysouthshorenow","wkyc.com":"gannettcompany-wkyc","desmoines.com/cyclones":"gannettdigital-cyclones","wcsh6.com":"gannettcompany-wcsh","press-citizen.com/app":"gannettcompany-iowacitypress-citizenapp","collegefootballnews.com":"gannettdigitalsports-collegefootballnews","poughkeepsiejournal.com":"gannettcompany-poughkeepsiejournal","newsletter.stcloud.com":"gannettdigital-stcloud-newsletter","thenewsstar.com":"gannettcompany-thenewsstar","detroitnews.com":"gannettcompany-detroitnews","coshoctontribune.com/app":"gannettcompany-coshoctontribuneapp","newsletter.morristown.com":"gannettdigital-morristown-newsletter","caller.com":"gannettcompany-caller","mansfieldnewsjournal.com/app":"gannettcompany-newsjournalapp","muskego-newberlinnow.com":"gannettcompany-muskego-newberlinnow","ndnation.com":"usatoday-ndnation","daily-times.com":"gannettcompany-farmingtondailytimes","feeds.feedburner.com":"gannettdigitalsports-notredame-feedsfeedburnercomuhnd","flipsidepa.com":"gannettcompany-flipsidepa","stevenspointjournal.com":"gannettcompany-stevenspointjournal","newsletter.stevenspoint.com":"gannettdigital-stevenspoint-newsletter","wusa9.com":"gannettcompany-wusa","newsletter.sheboygan.com":"gannettdigital-sheboygan-newsletter","cincinnati.com/musketeers":"gannettdigital-musketeers","newsletter.staunton.com":"gannettdigital-staunton-newsletter","courier-journal.com":"gannettcompany-courierjournal","metroparentmagazine.com":"gannettcompany-metroparentmagazine","dailyrecord.com/app":"gannettcompany-dailyrecordapp","timesrecordnews.com/app":"gannettcompany-timesrecordnewsapp","eveningsun.com":"gannettcompany-eveningsun","newsletter.wausau.com":"gannettdigital-wausau-newsletter","thenewsstar.com/app":"gannettcompany-thenewsstarapp","thenews-messenger.com":"gannettcompany-thenews-messenger","kitsapsun.com/app":"gannettcompany-kitsapsunapp","democratandchronicle.com":"gannettcompany-democratandchronicle","publicopiniononline.com":"gannettcompany-publicopinion","newsletter.nashville.com":"gannettdigital-nashville-newsletter","northjersey.com/varsityaces":"gannettdigital-varsityaces","armytimes.com":"gannettcompany-armytimes","c-n.com":"gannettcompany-cn","visaliatimesdelta.com/app":"gannettcompany-visaliatimesdeltaapp","newsletter.cincinnati.com":"gannettdigital-cincinnati-newsletter","stargazette.com/app":"gannettcompany-stargazetteapp","thehammontonnews.com/app":"gannettcompany-hammontonnewsapp","courier-journal.com/app":"gannettcompany-courierjournalapp","mmajunkie.com":"usatoday-mmajunkie","montgomeryadvertiser.com":"gannettcompany-montgomeryadvertiser","mynorthwestnow.com":"gannettcompany-mynorthwestnow","naplesnews.com/app":"gannettcompany-naplesnewsapp","bearswire.usatoday.com":"usatoday-bearswire","theeagleswire.usatoday.com":"usatoday-eagleswire","hawkcentral.com/app":"gannettcompany-hawkcentralapp","mysouthnow.com":"gannettcompany-mysouthnow","news-leader.com":"gannettcompany-springfieldnews-leader","preview.newsletter.porthuron.com":"gannettdigital-porthuron-newsletter","currentargus.com":"gannettcompany-currentargus","preview.newsletter.shreveport.com":"gannettdigital-shreveport-newsletter","pressconnects.com":"gannettcompany-press-sunbulletin","newarkadvocate.com/app":"gannettcompany-theadvocateapp","centralfloridafuture.com/app":"gannettcompany-centralfloridaapp","dnj.com/app":"gannettcompany-dnjapp","lcsun-news.com/app":"gannettcompany-lascrucessun-newsapp","preview.newsletter.mountainhome.com":"gannettdigital-mountainhome-newsletter","muskego-newberlinnow.com/app":"gannettcompany-lakecountrynowapp","blackmountainnews.com":"gannettcompany-blackmountainnews","floridatoday.com":"gannettcompany-floridatoday","navytimes.com":"gannettcompany-navytimes","newsletter.indianapolis.com":"gannettdigital-indianapolis-newsletter","greenvilleonline.com":"gannettcompany-greenville","demingheadlight.com":"gannettcompany-demingheadlight","newsletter.cherryhill.com":"gannett-cherryhill-newsletter","wlbz2.com":"gannettcompany-wlbz","newsletter.asburypark.com":"gannettdigital-asburypark-newsletter","michigan.com/wolverines":"gannettdigital-wolverines","delawareonline.com":"gannettcompany-delawareonline","c4isrnet.com":"gannettcompany-c4isrnet","alamogordonews.com":"gannettcompany-alamogordonews","gosanangelo.com":"gannettcompany-gosanangelo","wfaa.com":"gannettcompany-wfaa","redding.com/app":"gannettcompany-reddingapp","packersnews.com":"gannettcompany-packersnews","wauwatosanow.com":"gannettcompany-wauwatosanow","baxterbulletin.com/app":"gannettcompany-baxterbulletinapp","ydr.com/app":"gannettcompany-yorkdailyrecordapp","newsletter.reno.com":"gannettdigital-reno-newsletter","lansingstatejournal.com":"gannettcompany-lansingstatejournal","newsletter.alamogordo.com":"gannettdigital-alamogordo-newsletter","newsletter.manitowoc.com":"gannettdigital-manitowoc-newsletter","newsletter.salem.com":"gannettdigital-salem-newsletter","uw-media.cincinnati.com":"gannettcompany-newscincinnati","marionstar.com/app":"gannettcompany-themarionstarapp","newsletter.elpaso.com":"gannettdigital-elpaso-newsletter","newsletter.bridgewatereastbrunswick.com":"gannett-bridgewatereastbrunswick-newsletter","www.courier-journal.com/louisvillecardshq":"gannettdigital-louisvillecardshq","vikingswire.usatoday.com":"usatoday-vikingswire","thestarpress.com/app":"gannettcompany-thestarpressapp","preview.newsletter.manitowoc.com":"gannetdigital-manitowoc-newsletter","newsletter.clarksville.com":"gannettdigital-clarksville-newsletter","mycentraljersey.com/app":"gannettcompany-mycentraljerseyapp","upstateparent.com/app":"gannettcompany-upstateparent-greenvillenewsapp","newsletter.bridgetwater-eastbrunswick.com":"gannettdigital-bridgetwatereastbrunswick-newsletter","northjersey.com/app":"gannettcompany-northjerseyapp","dmjuice.com":"gannettcompany-dmjuice","preview.cincinnati.com":"gannettcompany-newscincinnati","marionstar.com":"gannettcompany-themarionstar","alamogordonews.com/app":"gannettcompany-alamogordonewsapp","reporternews.com":"gannettcompany-reporternews","newsletter.detroitnews.com":"gannettdigital-detroitnews-newsletter","muskego-newberlinnow.com/apps":"gannettcompany-muskego-newberlinnowapp","wisconsinrapidstribune.com":"gannettcompany-thedailytribune","wauwatosanow.com/app":"gannettcompany-wauwatosanowapp","statesmanjournal.com/app":"gannettcompany-statesmanjournalapp","newsletter.lafayettelala.com":"gannettdigital-lafayettela-newsletter","newsleader.com":"gannettcompany-newsleader","flipsidepa.com/app":"gannettcompany-flipsidepaapp","marshfieldnewsherald.com/app":"gannettcompany-marshfieldnewsheraldapp","desmoinesregister.com":"gannettcompany-desmoinesregister","newarkadvocate.com":"gannettcompany-theadvocate","preview.newsletter.stevenspoint.com":"gannettdigital-stevenspoint-newsletter","newsletter.tallahassee.com":"gannettdigital-tallahassee-newsletter","app.com/app":"gannettcompany-asburyparkpressapp","independentmail.com":"gannettcompany-independentmail","vcstar.com/app":"gannettcompany-vcstarapp","ruidosonews.com":"gannettcompany-ruidosonews","greenbaypressgazette.com/app":"gannettcompany-greenbaypressgazetteapp","marshfieldnewsherald.com":"gannettcompany-marshfieldnews-herald","azcentral.com":"gannettcompany-azcentral","newsletter.fortmyers.com":"gannettdigital-fortmyers-newsletter","bucyrustelegraphforum.com/app":"gannettcompany-telegraphforumapp","zanesvilletimesrecorder.com/app":"gannettcompany-zanesvilletimesrecorderapp","theleafchronicle.com":"gannettcompany-theleafchronicle","publicopiniononline.com/app":"gannettcompany-publicopinionapp","farmersadvance.com":"gannettcompany-farmersadvance","hawkcentral.com":"gannettcompany-hawkcentral","wbir.com":"gannettcompany-wbir","brookfield-elmgrovenow.com":"gannettcompany-brookfield-elmgrovenow","newsletter.mansfield.com":"gannettdigital-mansfield-newsletter","www.desmoinesregister.com/iowacaucuses":"gannettdigital-iowacaucuses","newsletter.cherryhilll.com":"gannettdigital-cherryhill-newsletter","newsletter.pensacola.com":"gannettdigital-pensacola-newsletter","thehammontonnews.com":"gannettcompany-hammontonnews","shreveporttimes.com":"gannettcompany-shreveporttimes","ithacajournal.com/app":"gannettcompany-theithacajournalapp","unofficialnetworks.com":"usatoday-unofficialnetworks","elpasotimes.com":"gannettcompany-elpasotimes","upstateparent.com":"gannettdigital-upstateparent","newsletter.elmira.com":"gannettdigital-elmira-newsletter","northjersey.com":"gannettdigital-northjersey","thenorthwestern.com/app":"gannettcompany-thenorthwesternapp","king5.com":"gannettcompany-king","reporternews.com/app":"gannettcompany-reporternewsapp","greatfallstribune.com/app":"gannettcompany-greatfallstribuneapp","newsletter.vineland.com":"gannettdigital-vineland-newsletter","clarionledger.com/app":"gannettcompany-clarionledgerapp","thecalifornian.com/app":"gannettcompany-thecalifornianapp","rgj.com/app":"gannettcompany-rgjapp","burlingtonfreepress.com":"gannettcompany-burlingtonfreepress","lakecountrynow.com":"gannettcompany-lakecountrynow","newsletter.battlecreek.com":"gannettdigital-battlecreek-newsletter","https://www.cincinnati.com/news/northern-kentucky/":"gannettdigital-nky","thrashermagazine.com":"usatoday-thrashermagazine","tigernet.com":"gannettdigitalsports-clemson-tigernetcom","mycentraljersey.com":"gannettcompany-mycentraljersey","newsletter.lascruces.com":"gannettdigital-lascruces-newsletter","desmoinesregister.com/app":"gannettcompany-desmoinesregisterapp","metroparentmagazine.com/app":"gannettcompany-metroparentmagazineapp","gametimepa.com":"gannettcompany-gametimepa","packinsider.com":"usatoday-packinsider","stevenspointjournal.com/app":"gannettcompany-stevenspointjournalapp","somosfrontera.com":"gannettcompany-somosfrontera","battlecreekenquirer.com/app":"gannettcompany-battlecreekenquirerapp","michigan.com/spartans":"gannettdigital-spartans","loyalcougars.com":"gannettdigitalsports-byu-loyalcougarscom","newsletter.carlsbad.com":"gannettdigital-carlsbad-newsletter","www.azcentral.com/sports//":"gannettdigital-azcentralsports","newsletter.opelousas.com":"gannettdigital-opelousas-newsletter","sheboyganpress.com/app":"gannettcompany-sheboyganpressapp","greenbaypressgazette.com":"gannettcompany-greenbaypressgazette","newsletter.greenbay.com":"gannettdigital-greenbay-newsletter","freep.com":"gannettcompany-freep","firstcoastnews.com":"gannettcompany-wtlv","11alive.com":"gannettcompany-wxia","knoxnews.com":"gannettcompany-knoxnews","defensenews.com":"gannettcompany-defensenews","cincinnati.com/bengals":"gannettdigital-bengals","kitsapsun.com":"gannettcompanyl-kitsapsun","waukeshanow.com":"gannettcompany-waukeshanow","blackmountainnews.com/app":"gannettcompany-blackmountainnewsapp","poughkeepsiejournal.com/app":"gannettcompany-poughkeepsiejournalapp","coshoctontribune.com":"gannettcompany-coshoctontribune","lcsun-news.com":"gannettcompany-lascrucessun-news","courierpress.com":"gannettcompany-courierpress","cardswire.usatoday.com":"usatoday-cardswire","preview.newsletter.sheboygan.com":"gannettdigital-sheboygan-newsletter","fantasyknuckleheads.com":"usatoday-fantasyknuckleheads","indystar.com/app":"gannettcompany-indystarapp","cincinnati.com/fccincinnatisoccer":"gannettdigital-fccincinnatisoccer","dailyworld.com":"gannettcompany-dailyworld","delmarvanow.com":"gannettcompany-delmarvanow","gannett.com":"gannett-mailbridge-staging","battlecreekenquirer.com":"gannettcompany-battlecreekenquirer","thebiglead.com":"usatoday-bigleadsports","Draftbrowns.com":"usatoday-draftbrowns","naplesnews.com":"gannettcompany-naplesnews","tennessean.com/app":"gannettcompany-tennesseanapp","detroitlionsdraft.com":"usatoday-detroitlionsdraft","buckeyeplanet.com":"gannettdigitalsports-ohiostate-buckeyeplanetcom","preview.newsletter.greenville.com":"gannettdigital-greenville-newsletter","cincinnati.com/app":"gannettcompany-cincinnatiapp","vcstar.com":"gannettcompany-vcstar","cowboyswire.usatoday.com":"usatoday-cowboyswire","jsonline.com":"gannettcompany-jsonline","newsletter.marshfield.com":"gannettdigital-marshfield-newsletter","chillicothegazette.com/app":"gannettcompany-chillicothegazetteapp","prewview.newsletter.asheville.com":"gannettdigital-asheville-newsletter","detroitnews.com/app":"gannettcompany-detroitnewsapp","bluegoldsports.com":"gannettdigitalsports-westvirginia-bluegoldsportscom","jacksonsun.com":"gannettcompany-jacksonsun","newsletter.hanover.com":"gannettdigital-hanover-newsletter","jetswire.usatoday.com":"usatoday-jetswire","worldsoccertalk.com":"usatoday-worldsoccertalk","visaliatimesdelta.com":"gannettcompany-visaliatimesdelta","fsunews.com":"gannettcompany-fsunews","lohud.com":"gannettcompany-lohud","centralfloridafuture.com":"gannettcompany-centralflorida","tallahassee.com/app":"gannettcompany-tallahasseeapp","scsun-news.com/app":"gannettcompany-silvercitysun-newsapp","wisfarmer.com/app":"gannettcompany-wisconsinfarmerapp","wfmynews2.com":"gannettcompany-wfmy","cincinnati.com/bearcats":"gannettdigital-bearcats","newsletter.porthuron.com":"gannettdigital-porthuron-newsletter","gametimepa.com/app":"gannettcompany-gametimepaapp","krem.com":"gannettcompany-krem","mansfieldnewsjournal.com":"gannettcompany-newsjournal","12news.com":"gannettcompany-kpnx","militarytimes.com":"gannettcompany-militarytimes","caller.com/app":"gannettcompany-callerapp","newsletter.oshkosh.com":"gannettdigital-oshkosh-newsletter","13newsnow.com":"gannettcompany-wvec","wwltv.com":"gannettcompany-wwl","newsletter.murfreesboro.com":"gannettdigital-murfreesboro-newsletter","pal-item.com/app":"gannettcompany-palitemapp","theleafchronicle.com/app":"gannettcompany-theleafchronicleapp","sneakhype.com":"usatoday-sneakhype","theschmozone.com":"gannettdigitalsports-theschmozone","newsletter.iowacity.com":"gannettdigital-iowacity-newsletter","courierpress.com/app":"gannettcompany-courierpressapp","ruidosonews.com/app":"gannettcompany-ruidosonewsapp","floridatoday.com/app":"gannettcompany-floridatodayapp","greatfallstribune.com":"gannettcompany-greatfallstribune","marcoislandflorida.com":"gannettcompany-marcoisland","elsoldesalinas.com":"gannettcompany-elsoldesalinas","fsunews.com/app":"gannettcompany-fsunewsapp","burlingtonfreepress.com/app":"gannettcompany-burlingtonfreepressapp","greenvilleonline.com/app":"gannettcompany-greenvilleapp","demingheadlight.com/app":"gannettcompany-demingheadlightapp","waukeshanow.com/app":"gannettcompany-waukeshanowapp","ninerswire.usatoday.com":"usatoday-ninerswire","gannek.com":"gannettdigitalexchange-notredame","ktvb.com":"gannettcompany-ktvb","greenfield-westallisnow.com":"gannettcompany-greenfield-westallisnow","montgomeryadvertiser.com/app":"gannettcompany-montgomeryadvertiserapp","usatoday.com/":"gannett-usatodayapp","greenfield-westallisnow.com/app":"gannettcompany-greenfield-westallisnowapp","newsletter.asheville.com":"gannettdigital-asheville-newsletter","theadvertiser.com":"gannettcompany-theadvertiser","newsletter.monroe.com":"gannettdigital-monroe-newsletter","courierpostonline.com/app":"gannettcompany-courierpostonlineapp","insidehoops.com":"usatoday-insidehoops","thedailyjournal.com/app":"gannettcompany-thedailyjournalapp","newsletter.westchester.com":"gannettdigital-westchester-newsletter","news-leader.com/app":"gannettcompany-springfieldnews-leaderapp","preview.newsletter.detroitnews.com":"gannettdigital-detroitnews-newsletter","preview.newsletter.murfreesboro.com":"gannettdigital-murfreesboro-newsletter","myozaukeenow.com":"gannettcompany-myozaukeenow","preview.newsletter.vineland.com":"gannettdigital-vineland-newsletter","tcpalm.com":"gannettcompany-tcpalm","dmjuice.com/app":"gannettcompany-dmjuiceapp","lancastereaglegazette.com/app":"gannettcompany-lancastereaglegazetteapp","www.courier-journal.com/kentuckywildcatshq":"gannettdigital-kentuckywildcatshq","livingstondaily.com":"gannettcompany-livingstondaily","indystar.com":"gannettcompany-indystar","airforcetimes.com":"gannettcompany-airforcetimes-mobile","kare11.com":"gannettcompany-kare","scsun-news.com":"gannettcompany-silvercitysun-news","newsletter.coloradoan.com":"gannettdigital-coloradoan-newsletter","fdlreporter.com/app":"gannettcompany-fdlreporterapp","theadvertiser.com/app":"gannettcompany-theadvertiserapp","cover32.com":"usatoday-cover32","billswire.usatoday.com":"usatoday-billswire","mysouthshorenow.com/app":"gannettcompany-mysouthshorenowapp","wtsp.com":"gannettcompany-wtsp","theramswire.usatoday.com":"usatoday-ramswire","utefans.net":"gannettdigitalsports-utah-utefansnet","patsfans.com":"usatoday-patsfans","newsletter.fremont.com":"gannettdigital-fremont-newsletter","newsletter.argusleader.com":"gannettdigital-siouxfalls-newsletter"},"trc-skip-failover":false,"backstage-domain-url":"","adc-config":null,"link-target-conf":null,"ios-sc-link-target":{'NAV': '_self', 'NT': '_self', 'SP': '_self'},"small-ios-device":"iPhone|iPod","read-more-debug":false,"read-more-devices":"smart_phone","attribution-disclosure-direction":"ltr","mode-pub-start":function(){ },"before-video-load":function(){ return true; },"publisher-logo":{"gannettcompany-courierpostonline":"http://cdn.taboola.com/libtrc/static/thumbnails/63c90eb9a8406eeddb702e9214a179c4.png","gannettcompany-greenville":"http://cdn.taboola.com/libtrc/static/thumbnails/90305a9d8d32d3816a82cf425458d969.jpg"},"detect-item-from-same-host":function(host, itemHost){},"mode-before-video-load":function(rbox){ return true; },"after-card-created":function(placementData, publisherCardNum, feed){ },"publisher-branding":{},"global":{"abp-detection-enabled":true,"allow-nofollow-for-exchange":true,"block-video-prob":1,"clear-styles-on-reset":true,"cloudinary-aspect-ratios-list":false,"config-analytics":{'logTimer': 50000, 'logLength' : 5, 'traffic' : 2, 'measureEnable' : true, 'measureTimeToSend' : 10000,'disableRawDataSend': true},"consent-presets":{taboola_default: null},"css-ie-split":true,"css-isolation":false,"disable-unified-iframe-pixel-reporter":true,"disable-yield":true,"disclosure-enabled":true,"enable-analytics":"true","enable-criteo-uid":false,"enable-deferred-available":true,"enable-deferred-visible":true,"enable-detect-bots":true,"enable-events-api":true,"enable-ie-split-click-event":true,"enable-manual-visible":true,"enable-multi-pv3":true,"enable-organic-redirect":true,"enable-organic-redirect-on-amp":true,"enable-rbox-map":false,"enable-read-more":true,"enable-social-events":true,"enable-trc-cache":false,"enable-trc-route":true,"enable-visibility-intersection-api":true,"events-api-click-enabled":true,"exclude-subd-shift":["15.taboola.com", "trc.taboola.com", "authentication.taboola.com"],"explore-delay":500,"feed-observer-load-next-batch":true,"force-reset-on-ready":true,"has-adchoice":true,"has-mode-geometry":true,"has-page-geometry":true,"has-userx":true,"image-url-prefix":"https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Ch_{h}%2Cw_{w}%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/","inject-comscore":true,"inject-mdotlabs":false,"inject-taboolax":false,"ios-sc-link-target":{"NAV": "_top", "NT": "_top", "SP": "_top"},"max-wait-for-cmp":10000,"monitor-dup-items-traffic-pct":5,"p-video-overlay-send-events":true,"prefer-response-session-data":true,"publisher-domains":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<domains><domain type=\"host\">gannett.com</domain></domains>\n","publisher-onclick-nt-enabled":false,"rbox-ajax-post-events-full-rollout":true,"rbox-enable-fix-user-id-event":"true","rbox-old-chrome-es6-fix":(function(){
     var mtch = /Chrome\/([0-9]{2})/.exec(window.navigator.userAgent);
     if(mtch && mtch.length && mtch.length ==2) {
         var ver = parseInt(mtch[1]);
         if(ver < 49) {
             eS6SupportCheckResult = false;
         }
    }
 })(),"rbox-post-events-as-ajax":true,"requests-domain":"trc.taboola.com","rtb-image-url-prefix":"https://images.taboola.com/taboola/image/fetch/$pw_{w}%2C$ph_{h}/t_tbl-cnd/","send-avail-as-get":false,"send-avail-as-post":true,"send-event-as-post":true,"send-full-list":true,"send-item-query-string-in-req":true,"send-next-up-click-abtest-event":false,"send-pb-in-click":true,"send-user-id-tag":true,"send-variant-warning":true,"send-visible-as-get":false,"show-rtb-ad-choices-icon":true,"smart-ellipsis":true,"stop-channels-threshold":"0.8","store-userid-first-party-cookie":true,"switch-abp-class":{"trc-content-sponsored" : "trc-content-sponsoredUB", "syndicatedItem" : "syndicatedItemUB"},"switch_ABP_class":{"trc-content-sponsored" : "trc-content-sponsored2", "syndicatedItem" : "syndicatedItem2"},"syndication-embed-code":function (box, recommendation, affiliate) {},"syndicator-affiliate-id":"dailyrecord","thumb-lazy-load-method":"PAGE_LOAD,PAGE_INTERACTIVE,RBOX_VISIBLE","thumb-lazy-load-switch":false,"tmp-use-pb-params":true,"touchstart-enabled":true,"trc-cache-it":{"text":"d","home":"d","video":"d","search":"d","category":"d","photo":"d","other":"d"},"trc-request-delay":500,"use-abp-uim":true,"use-calibration-uim":false,"use-delay-image-load":true,"use-native-json-stringify":true,"use-storage-detection":true,"user-id-tag-macros":["tags.bluekai.com/site/35702?id={taboolaID}"],"visibility-intersection-api-delay":1000,"visibility-intersection-api-full-rollout":true,"visible-delay":500,"xhr-worker":false,"style":{"rtl":"","custom":"","mode_custom":".ab_thumbnails-b_abp-mode img{max-width:none}.ab_thumbnails-b_abp-mode [class*=span]{float:none;margin-left:0}.ab_thumbnails-b_abp-mode .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.ab_thumbnails-b_abp-mode .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.ab_thumbnails-b_abp-mode .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.ab_thumbnails-b_abp-mode .logoDiv a{font-size:100%}.ab_thumbnails-b_abp-mode .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.ab_thumbnails-b_abp-mode .videoCube a{padding:0}.ab_thumbnails-b_abp-mode .thumbBlock{margin:0}.trc_elastic .ab_thumbnails-b_abp-mode .video-label-box{height:57.0px}.ab_thumbnails-b_abp-mode .videoCube .video-label-box{margin-top:5px}.ab_thumbnails-b_abp-mode .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.ab_thumbnails-b_abp-mode .video-label-box .branding{display:block}.ab_thumbnails-b_abp-mode .syndicatedItem .branding{line-height:19.0px}.ab_thumbnails-b_abp-mode .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.ab_thumbnails-b_abp-mode .trc_rbox_header .logoDiv a{font-size:100%}.ab_thumbnails-b_abp-mode .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.ab_thumbnails-g_abp-mode img{max-width:none}.ab_thumbnails-g_abp-mode [class*=span]{float:none;margin-left:0}#taboola-section-front-thumbnails{display:inline-block;width:70%;padding:1.5% 0 1.5% 1.5%}.ab_thumbnails-g_abp-mode .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto;margin:0 0 15px 0}.ab_thumbnails-g_abp-mode .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.ab_thumbnails-g_abp-mode .trc_rbox_header .trc_rbox_header_span{line-height:21px;text-transform:uppercase;text-shadow:0 1px 0 #fff;font-weight:400}.ab_thumbnails-g_abp-mode .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.ab_thumbnails-g_abp-mode .logoDiv a{font-size:100%}.ab_thumbnails-g_abp-mode .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.ab_thumbnails-g_abp-mode .videoCube a{padding:0}.ab_thumbnails-g_abp-mode .thumbBlock{margin:0}.trc_elastic .ab_thumbnails-g_abp-mode .video-label-box{position:absolute;z-index:100;bottom:0}.trc_elastic .trc_safari .ab_thumbnails-g_abp-mode .video-label-box{bottom:-20px!important}.ab_thumbnails-g_abp-mode .videoCube .video-label-box .video-title{text-decoration:none;margin:0 12px 20px 12px;z-index:100;text-shadow:0 1px 1px #000}.ab_thumbnails-g_abp-mode .videoCube:hover .video-label-box .video-title{text-decoration:none}.ab_thumbnails-g_abp-mode .video-label-box .branding{display:block}.ab_thumbnails-g_abp-mode .syndicatedItem .branding{line-height:18.0px;margin:0 12px 2px 12px;text-shadow:0 1px 1px #343434}.ab_thumbnails-g_abp-mode .trc_header_left_column{background:transparent;height:auto}.ab_thumbnails-g_abp-mode .trc_rbox_header .logoDiv a{font-size:100%}.ab_thumbnails-g_abp-mode .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.ab_thumbnails-g_abp-mode .videoCube .video-label-box em{margin:2px;color:#b8b8b8!important;font-size:12px;vertical-align:top}.ab_thumbnails-g_abp-mode .thumbBlock .thumbnail-overlay{background-size:100%;width:100%;height:100%}.trc_ie8 .ab_thumbnails-g_abp-mode .thumbBlock .thumbnail-overlay{background-color:transparent;opacity:0}.ab_thumbnails-g_abp-mode .videoCube .thumbnail-overlay{background-position:5% 100%}.trc_elastic .ab_thumbnails-g_abp-mode .videoCube{overflow:visible}.trc_elastic .ab_thumbnails-g_abp-mode.trc_rbox .trc_rbox_div{overflow:hidden}.trc_elastic .ab_thumbnails-g_abp-mode{margin-bottom:0}.ab_thumbnails-g_abp-mode .thumbBlock .thumbnail-overlay{width:100%;height:100%}.ab_thumbnails-g_abp-mode span.thumbBlock:before{height:100%;background:rgba(0,0,0,.15);content:'';display:block;position:absolute;top:0;transition:background-color .15s ease-out;width:100%;z-index:2}.ab_thumbnails-g_abp-mode span.thumbBlock:hover:before{background:none!important}.trc_elastic .ab_thumbnails-g_abp-mode{margin-bottom:0}.trc_elastic .ab_thumbnails-g_abp-mode .thumbBlock_holder{box-shadow:0 2px 1px rgba(0,0,0,.2)}@media screen and (min-width:1250px) and (max-width:1400px){#taboola-section-front-thumbnails{width:70%}}@media screen and (min-width:1150px) and (max-width:1249px){#taboola-section-front-thumbnails{width:72%}}@media screen and (max-width:1149px){#taboola-section-front-thumbnails{display:block;width:97%;padding:1.5% 1.5% 1.5% 1.5%}}.organic-thumbnails-b img{max-width:none}.organic-thumbnails-b [class*=span]{float:none;margin-left:0}.organic-thumbnails-b .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.organic-thumbnails-b .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-b .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-b .logoDiv a{font-size:100%}.organic-thumbnails-b .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-b .videoCube a{padding:0}.organic-thumbnails-b .thumbBlock{margin:0}.trc_elastic .organic-thumbnails-b .video-label-box{height:88.0px}.organic-thumbnails-b .videoCube .video-label-box{margin-top:5px}.organic-thumbnails-b .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.organic-thumbnails-b .videoCube:hover .video-label-box .video-title{text-decoration:none}.organic-thumbnails-b .video-label-box .branding{display:block}.organic-thumbnails-b .syndicatedItem .branding{line-height:22.0px}.organic-thumbnails-b .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-b .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-b .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.trc_elastic .organic-thumbnails-b .trc_rbox_outer .videoCube:not(.videoCube_6_child){margin-bottom:26px;border-bottom:1px solid #999}.organic-thumbnails-b .videoCube .video-label.video-published-date{display:inline-block;color:#666;font-size:12px;line-height:22.0px}.organic-thumbnails-b .videoCube .video-label.video-category{color:#666;font-size:12px;display:inline-block;line-height:22.0px}.organic-thumbnails-b .videoCube .video-label dt{font-weight:normal;margin-right:5px}.organic-thumbnails-b_stream-amp img{max-width:none}.organic-thumbnails-b_stream-amp [class*=span]{float:none;margin-left:0}.organic-thumbnails-b_stream-amp .trc_rbox_div{margin-bottom:0}.organic-thumbnails-b_stream-amp .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.organic-thumbnails-b_stream-amp .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-b_stream-amp .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-b_stream-amp .logoDiv a{font-size:100%}.organic-thumbnails-b_stream-amp .logoDiv a span{display:inline;color:#999;font-weight:normal;font-size:11px}.organic-thumbnails-b_stream-amp .videoCube a{padding:0}.organic-thumbnails-b_stream-amp .trc_rbox_outer .videoCube.trc-first-recommendation{border-top:0}.trc_elastic .organic-thumbnails-b_stream-amp .trc_rbox_outer .videoCube{margin-bottom:22px}.organic-thumbnails-b_stream-amp .thumbBlock{margin:0}.trc_elastic .organic-thumbnails-b_stream-amp .video-label-box{height:76.0px}.organic-thumbnails-b_stream-amp .videoCube .video-label-box .video-title{text-decoration:none;margin-bottom:0;padding-left:10px}.organic-thumbnails-b_stream-amp .videoCube:hover .video-label-box .video-title{text-decoration:none}.organic-thumbnails-b_stream-amp .video-label-box .branding{display:block;position:relative;left:10px}.organic-thumbnails-b_stream-amp .syndicatedItem .branding{line-height:22.0px}.organic-thumbnails-b_stream-amp .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-b_stream-amp .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-b_stream-amp .videoCube .video-label-box{margin-top:0}.organic-thumbnails-b_stream-amp .trc_rbox_header .trc_header_ext{position:relative;top:auto}.organic-thumbnails-b_stream-amp .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;display:inline-block}.organic-thumbnails-b_stream-amp .trc_rbox_header_span{display:inline-block;float:left}.organic-thumbnails-b_stream-amp .videoCube .video-label.video-published-date{display:inline-block;color:#999;font-size:11px;line-height:22.0px;font-family:HelveticaNeue,helvetica,arial,sans-serif}.organic-thumbnails-b_stream-amp .videoCube .video-label.video-category{color:#999;font-size:11px;line-height:22.0px;font-family:HelveticaNeue,helvetica,arial,sans-serif}.organic-thumbnails-b_stream-amp .videoCube .video-label{font-weight:normal;padding-left:10px}.organic-thumbnails-feed img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.organic-thumbnails-feed [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.organic-thumbnails-feed .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.organic-thumbnails-feed .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbnails-feed .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.organic-thumbnails-feed .logoDiv a {\n    font-size: 100%;\n}\n\n.organic-thumbnails-feed .logoDiv a span {\n    display: inline;\n    color: #000000;\n    font-weight: normal;\n    font-size: 11px;\n}\n\n.organic-thumbnails-feed .videoCube a {\n    padding: 0;\n}\n\n.organic-thumbnails-feed .thumbBlock {\n    margin: 0;\n}\n\n.organic-thumbnails-feed .video-label-box {\n    margin: 5px 5px 0px 5px;\n    height: 44px;\n}\n\n.organic-thumbnails-feed .syndicatedItem .video-label-box {\n    margin: 5px 5px 0px 5px;\n    height: 44px;\n}\n\n.organic-thumbnails-feed .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.organic-thumbnails-feed .videoCube:hover .video-label-box .video-title,\n.organic-thumbnails-feed .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.organic-thumbnails-feed .video-label-box .branding {\n    display: block;\n\tline-height: 27.0px;\n}\n\n.organic-thumbnails-feed .syndicatedItem .branding {\n    line-height: 27.0px;\n}\n.organic-thumbnails-feed .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbnails-feed .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.organic-thumbnails-feed .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.organic-thumbnails-feed .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.organic-thumbnails-feed-desktop img{max-width:none}.organic-thumbnails-feed-desktop [class*=span]{float:none;margin-left:0}.organic-thumbnails-feed-desktop .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:#fafafa;box-sizing:border-box}.organic-thumbnails-feed-desktop .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-feed-desktop .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-feed-desktop .logoDiv a{font-size:100%}.organic-thumbnails-feed-desktop .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-feed-desktop .videoCube a{padding:0}.organic-thumbnails-feed-desktop .thumbBlock{margin:0}.organic-thumbnails-feed-desktop .video-label-box{margin:16px 0 0 0;height:128px}.organic-thumbnails-feed-desktop .syndicatedItem .video-label-box{margin:5px 0 0 0;height:128px}.organic-thumbnails-feed-desktop .videoCube .video-label-box .video-title{text-decoration:none;margin-top:0;margin-bottom:8px}.organic-thumbnails-feed-desktop .videoCube:hover .video-label-box .video-title,.organic-thumbnails-feed-desktop .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-feed-desktop .video-label-box .branding{display:block}.organic-thumbnails-feed-desktop .syndicatedItem .branding{line-height:32.0px}.organic-thumbnails-feed-desktop .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-feed-desktop .trc_header_right_part{margin-top:3px}.organic-thumbnails-feed-desktop .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-feed-desktop .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbnails-feed-desktop .trc_rbox_header_span:before{background:#009bff;content:' ';height:12px;width:24px;display:inline-block;margin-right:10px}.organic-thumbnails-feed-desktop .trc_rbox_header_span{text-transform:unset;font-size:20px;font-weight:900;color:#212121}.organic-thumbnails-feed-desktop .videoCube .video-label-box{background:#fff;padding:16px;width:30%;position:absolute;left:calc(70% - 30px);top:0}.organic-thumbnails-feed-desktop .video-uploader dt{font-family:'Unify Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600}.organic-thumbnails-feed-desktop .video-external-data{margin-top:20px;font-size:14px;font-weight:600;text-decoration:none;color:rgba(0,0,0,0.73);margin-bottom:15px}.organic-thumbnails-feed-desktop .video-title{font-size:18px;line-height:22px;font-weight:600;max-height:88px}.organic-thumbnails-feed-desktop .video-description{font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;font-weight:normal;max-height:75px;color:rgba(0,0,0,0.87);margin-top:10px;margin-bottom:10px}.organic-thumbnails-feed-desktop .video-uploader img{display:inline-block;width:24px;margin-left:5px;vertical-align:middle}.organic-thumbnails-feed-desktop .trc_rbox_outer .videoCube{margin-bottom:16px!important}.organic-thumbnails-feed-desktop .thumbBlock_holder{width:70%}.organic-thumbnails-feed-desktop .video-category{font-size:14px;text-decoration:none;color:#666;display:inline;text-transform:capitalize}.organic-thumbnails-feed-desktop .video-category dt{font-weight:600}.organic-thumbnails-feed-desktop .video-external-data{font-size:14px;text-decoration:none;color:#666;display:inline}.organic-thumbnails-feed-desktop .video-external-data dt{font-weight:400}.organic-thumbnails-feed-gallery img{max-width:none}.organic-thumbnails-feed-gallery [class*=span]{float:none;margin-left:0}.organic-thumbnails-feed-gallery .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:#fafafa;box-sizing:border-box}.organic-thumbnails-feed-gallery .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-feed-gallery .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-feed-gallery .logoDiv a{font-size:100%}.organic-thumbnails-feed-gallery .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-feed-gallery .videoCube a{padding:0}.organic-thumbnails-feed-gallery .thumbBlock{margin:0}.organic-thumbnails-feed-gallery .video-label-box{margin:16px 0 0 0;height:128px}.organic-thumbnails-feed-gallery .syndicatedItem .video-label-box{margin:5px 0 0 0;height:128px}.organic-thumbnails-feed-gallery .videoCube .video-label-box .video-title{text-decoration:none;margin:0;margin-top:0;margin-bottom:8px;height:72px}.organic-thumbnails-feed-gallery .videoCube:hover .video-label-box .video-title,.organic-thumbnails-feed-gallery .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-feed-gallery .video-label-box .branding{display:block}.organic-thumbnails-feed-gallery .syndicatedItem .branding{line-height:32.0px}.organic-thumbnails-feed-gallery .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-feed-gallery .trc_header_right_part{margin-top:3px}.organic-thumbnails-feed-gallery .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-feed-gallery .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbnails-feed-gallery .trc_rbox_header_span:before{background:#009bff;content:' ';height:12px;width:24px;display:inline-block;margin-right:10px}.organic-thumbnails-feed-gallery .trc_rbox_header_span{text-transform:unset;font-size:20px;font-weight:900;color:rgba(0,0,0)}.organic-thumbnails-feed-gallery .videoCube .video-label-box{background:#fff;padding:16px;width:33.33%;height:125px!important;position:absolute;left:calc(66% - 30px);top:0}.organic-thumbnails-feed-gallery .video-category{display:inline;font-size:12px;font-weight:600;text-decoration:none;text-transform:capitalize;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif}.organic-thumbnails-feed-gallery .video-title{font-size:20px;line-height:24px;font-weight:600!important;max-height:72px;color:#212121}.organic-thumbnails-feed-gallery .video-uploader{font-size:12px;font-weight:600!important;text-decoration:none;color:#fff;background-color:#009bff;width:fit-content!important;margin-top:8px;height:38px;position:absolute;left:0}.organic-thumbnails-feed-gallery .video-uploader .play-div{width:38px;height:38px;background-color:#0083d9;display:inline-block}.organic-thumbnails-feed-gallery .video-external-data{font-size:12px;display:inline;font-weight:400;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif}.organic-thumbnails-feed-gallery .video-uploader img{width:38px;height:38px}.organic-thumbnails-feed-gallery .video-uploader dt{display:inline-block!important;padding:0 8px 0 8px;line-height:38px;vertical-align:top;font-weight:400}.organic-thumbnails-feed-gallery .trc_rbox_outer .videoCube{margin-bottom:0!important}.organic-thumbnails-feed-gallery .thumbBlock_holder{width:66%}.organic-thumbnails-feed-gallery-mobile img{max-width:none}.organic-thumbnails-feed-gallery-mobile [class*=span]{float:none;margin-left:0}.organic-thumbnails-feed-gallery-mobile .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:#f8f8f8;box-sizing:border-box}.organic-thumbnails-feed-gallery-mobile .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-feed-gallery-mobile .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-feed-gallery-mobile .logoDiv a{font-size:100%}.organic-thumbnails-feed-gallery-mobile .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-feed-gallery-mobile .videoCube a{padding:0}.organic-thumbnails-feed-gallery-mobile .thumbBlock{margin:0}.organic-thumbnails-feed-gallery-mobile .video-label-box{margin:5px 0 0 0;height:128px}.organic-thumbnails-feed-gallery-mobile .syndicatedItem .video-label-box{margin:5px 0 0 0;height:128px}.organic-thumbnails-feed-gallery-mobile .videoCube .video-label-box .video-title{text-decoration:none;margin:0;margin-top:4px;margin-bottom:8px}.organic-thumbnails-feed-gallery-mobile .videoCube:hover .video-label-box .video-title,.organic-thumbnails-feed-gallery-mobile .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-feed-gallery-mobile .video-label-box .branding{display:block}.organic-thumbnails-feed-gallery-mobile .syndicatedItem .branding{line-height:32.0px}.organic-thumbnails-feed-gallery-mobile .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-feed-gallery-mobile .trc_header_right_part{margin-top:3px}.organic-thumbnails-feed-gallery-mobile .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-feed-gallery-mobile .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbnails-feed-gallery-mobile .trc_rbox_header_span:before{background:#009bff;content:' ';height:12px;width:24px;display:inline-block;margin-right:10px}.organic-thumbnails-feed-gallery-mobile .trc_rbox_header_span{text-transform:unset;font-size:16px;font-weight:900;color:rgba(0,0,0,0.87)}.organic-thumbnails-feed-gallery-mobile .videoCube .video-label-box{background:#fff;padding:10px 3% 0 3%;width:84%;transform:translateY(-30px)}.organic-thumbnails-feed-gallery-mobile .video-category{font-size:12px;font-weight:600;text-decoration:none;color:#666;font-family:'Unify Sans',Helvetica,Arial,sans-serif;display:inline}.organic-thumbnails-feed-gallery-mobile .video-title{font-size:20px;line-height:24px;font-weight:600!important;max-height:48px;color:#212121}.organic-thumbnails-feed-gallery-mobile .video-uploader{font-size:12px;font-weight:600!important;text-decoration:none;color:#fff;background-color:#009bff;position:absolute;top:-34px;height:38px}.organic-thumbnails-feed-gallery-mobile .trc_rbox_outer .videoCube{margin-bottom:0!important}.organic-thumbnails-feed-gallery-mobile .video-uploader .play-div{width:38px;height:38px;background-color:#0083d9;display:inline-block}.organic-thumbnails-feed-gallery-mobile .video-uploader img{width:38px;height:38px}.organic-thumbnails-feed-gallery-mobile .video-uploader dt{display:inline-block!important;padding:0 8px 0 8px;line-height:38px;vertical-align:top;font-weight:400;text-shadow:none}.organic-thumbnails-feed-gallery-mobile .video-external-data{font-size:12px;text-decoration:none;color:#666;display:inline}.organic-thumbnails-feed-gallery-mobile .video-external-data dt{font-weight:normal}.organic-thumbnails-feed-mobile img{max-width:none}.organic-thumbnails-feed-mobile [class*=span]{float:none;margin-left:0}.organic-thumbnails-feed-mobile .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:#f8f8f8;box-sizing:border-box}.organic-thumbnails-feed-mobile .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-feed-mobile .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-feed-mobile .logoDiv a{font-size:100%}.organic-thumbnails-feed-mobile .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-feed-mobile .videoCube a{padding:0}.organic-thumbnails-feed-mobile .thumbBlock{margin:0}.organic-thumbnails-feed-mobile .video-label-box{margin:5px 0 0 0;height:128px}.organic-thumbnails-feed-mobile .syndicatedItem .video-label-box{margin:5px 0 0 0;height:128px}.organic-thumbnails-feed-mobile .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.organic-thumbnails-feed-mobile .videoCube:hover .video-label-box .video-title,.organic-thumbnails-feed-mobile .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-feed-mobile .video-label-box .branding{display:block}.organic-thumbnails-feed-mobile .syndicatedItem .branding{line-height:32.0px}.organic-thumbnails-feed-mobile .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-feed-mobile .trc_header_right_part{margin-top:3px}.organic-thumbnails-feed-mobile .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-feed-mobile .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbnails-feed-mobile .trc_rbox_header_span:before{background:#009bff;content:' ';height:12px;width:24px;display:inline-block;margin-right:10px}.organic-thumbnails-feed-mobile .trc_rbox_header_span{text-transform:unset;font-size:16px;font-weight:900;color:rgba(0,0,0,0.87)}.organic-thumbnails-feed-mobile .videoCube .video-label-box{background:#fff;padding:10px 3% 0 3%;width:84%;position:relative;top:-30px}.organic-thumbnails-feed-mobile .video-external-data:before{background:#009bff;content:' ';height:8px;width:50px;display:block;margin-bottom:12px}.organic-thumbnails-feed-mobile .video-category dt{font-family:'Unify Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#666}.organic-thumbnails-feed-mobile .video-external-data{margin-top:20px;font-size:14px;font-weight:600;text-decoration:none;color:rgba(0,0,0,0.73)}.organic-thumbnails-feed-mobile .video-title{max-height:96px}.organic-thumbnails-feed-mobile .video-description{font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;font-weight:normal;max-height:75px;color:rgba(0,0,0,0.87);margin-top:10px;margin-bottom:10px}.organic-thumbnails-feed-mobile .video-category img{display:inline-block;width:24px;margin-left:5px;vertical-align:middle}.organic-thumbnails-feed-mobile .trc_rbox_outer .videoCube{margin-bottom:0!important}.organic-thumbnails-feed-mobile .video-uploader{font-size:14px;line-height:18px;font-weight:normal;text-decoration:none;color:#666;margin-bottom:24px}.organic-thumbnails-feed-mobile .video-uploader dt{font-weight:normal} .organic-thumbnails-feed-mobile .video-external-data {text-transform: capitalize;}.organic-thumbnails-feed-mobile-b img{max-width:none}.organic-thumbnails-feed-mobile-b [class*=span]{float:none;margin-left:0}.organic-thumbnails-feed-mobile-b .trc_rbox_div{margin-bottom:0}.organic-thumbnails-feed-mobile-b .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:#f8f8f8;box-sizing:border-box}.organic-thumbnails-feed-mobile-b .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-feed-mobile-b .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-feed-mobile-b .logoDiv a{font-size:100%}.organic-thumbnails-feed-mobile-b .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-feed-mobile-b .videoCube a{padding:0}.organic-thumbnails-feed-mobile-b .trc_rbox_outer .videoCube{margin-bottom:24px!important}.organic-thumbnails-feed-mobile-b .thumbBlock{margin:0}.organic-thumbnails-feed-mobile-b .videoCube .video-label-box .video-title{text-decoration:none;margin-bottom:0}.organic-thumbnails-feed-mobile-b .videoCube:hover .video-label-box .video-title,.organic-thumbnails-feed-mobile-b .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-feed-mobile-b .video-label-box .branding{display:block}.organic-thumbnails-feed-mobile-b .syndicatedItem .branding{line-height:22.0px}.organic-thumbnails-feed-mobile-b .video-label-box{margin:0;height:auto}.organic-thumbnails-feed-mobile-b .syndicatedItem .video-label-box{margin:0;height:auto}.organic-thumbnails-feed-mobile-b .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-feed-mobile-b .trc_header_right_part{margin-top:3px}.organic-thumbnails-feed-mobile-b .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-feed-mobile-b .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbnails-feed-mobile-b .videoCube .video-label-box{width:60%;margin-left:7%}.organic-thumbnails-feed-mobile-b .videoCube.thumbnail_start .thumbBlock_holder{float:right;margin-right:5%}.organic-thumbnails-feed-mobile-b .video-category{font-size:12px;font-weight:600;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;margin-top:10px;display:inline}.organic-thumbnails-feed-mobile-b .trc_rbox_outer{margin-top:24px}.organic-thumbnails-feed-mobile-b .trc_rbox_header_span:before{background:#009bff;content:' ';height:12px;width:24px;display:inline-block;margin-right:10px}.organic-thumbnails-feed-mobile-b .trc_rbox_header_span{text-transform:unset;font-size:16px;font-weight:900;color:rgba(0,0,0,0.87)}.organic-thumbnails-feed-mobile-b .video-title{font-weight:600;color:#212121}.organic-thumbnails-feed-mobile-b .video-external-data{font-size:12px;font-weight:normal;text-decoration:none;color:#666;display:inline}.organic-thumbnails-feed-mobile-b .video-external-data dt{font-weight:500}.organic-thumbnails-feed-stream img{max-width:none}.organic-thumbnails-feed-stream [class*=span]{float:none;margin-left:0}.organic-thumbnails-feed-stream .trc_rbox_div{margin-bottom:0}.organic-thumbnails-feed-stream .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:#fafafa;box-sizing:border-box}.organic-thumbnails-feed-stream .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-feed-stream .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-feed-stream .logoDiv a{font-size:100%}.organic-thumbnails-feed-stream .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-feed-stream .videoCube a{padding:0}.organic-thumbnails-feed-stream .trc_rbox_outer .videoCube{margin-bottom:0!important}.organic-thumbnails-feed-stream .trc_rbox_outer .videoCube_2_child{padding:16px 0 16px 0;margin-bottom:0}.organic-thumbnails-feed-stream .thumbBlock{margin:0}.organic-thumbnails-feed-stream .videoCube .video-label-box .video-title{text-decoration:none;margin-bottom:0}.organic-thumbnails-feed-stream .videoCube:hover .video-label-box .video-title,.organic-thumbnails-feed-stream .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-feed-stream .video-label-box .branding{display:block}.organic-thumbnails-feed-stream .syndicatedItem .branding{line-height:22.0px}.organic-thumbnails-feed-stream .video-label-box{margin:0;height:auto}.organic-thumbnails-feed-stream .syndicatedItem .video-label-box{margin:0;height:auto}.organic-thumbnails-feed-stream .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-feed-stream .trc_header_right_part{margin-top:3px}.organic-thumbnails-feed-stream .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-feed-stream .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbnails-feed-stream .videoCube .video-label-box{width:66%;margin-left:4%}.organic-thumbnails-feed-stream .videoCube.thumbnail_start .thumbBlock_holder{float:right}.organic-thumbnails-feed-stream .video-category{font-size:12px;font-weight:600;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;margin-top:8px}.organic-thumbnails-feed-stream .trc_rbox_outer{margin:12px 16px 12px 0}.organic-thumbnails-feed-stream .trc_rbox_header_span:before{background:#009bff;content:' ';height:12px;width:24px;display:inline-block;margin-right:10px}.organic-thumbnails-feed-stream .trc_rbox_header_span{text-transform:unset;font-size:20px;font-weight:900;color:rgba(0,0,0)}.organic-thumbnails-feed-stream .video-title{font-weight:600;font-size:18px;color:rgba(0,0,0,0.87);max-height:44px}.organic-thumbnails-feed-videos img{max-width:none}.organic-thumbnails-feed-videos [class*=span]{float:none;margin-left:0}.organic-thumbnails-feed-videos .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:#fafafa;box-sizing:border-box}.organic-thumbnails-feed-videos .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-feed-videos .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-feed-videos .logoDiv a{font-size:100%}.organic-thumbnails-feed-videos .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-feed-videos .videoCube a{padding:0}.organic-thumbnails-feed-videos .thumbBlock{margin:0}.organic-thumbnails-feed-videos .video-label-box{margin:16px 0 0 0;height:128px}.organic-thumbnails-feed-videos .syndicatedItem .video-label-box{margin:16px 0 0 0;height:128px}.organic-thumbnails-feed-videos .videoCube .video-label-box .video-title{text-decoration:none;margin:0;margin-top:0;margin-bottom:8px;height:72px}.organic-thumbnails-feed-videos .videoCube:hover .video-label-box .video-title,.organic-thumbnails-feed-videos .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-feed-videos .video-label-box .branding{display:block}.organic-thumbnails-feed-videos .syndicatedItem .branding{line-height:32.0px}.organic-thumbnails-feed-videos .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-feed-videos .trc_header_right_part{margin-top:3px}.organic-thumbnails-feed-videos .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-feed-videos .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbnails-feed-videos .trc_rbox_header_span:before{background:#009bff;content:' ';height:12px;width:24px;display:inline-block;margin-right:10px}.organic-thumbnails-feed-videos .trc_rbox_header_span{text-transform:unset;font-size:20px;font-weight:900;color:rgba(0,0,0)}.organic-thumbnails-feed-videos .videoCube .video-label-box{background:#fff;padding:16px;width:33.333%;height:125px!important;position:absolute;left:calc(66% - 30px);top:0}.organic-thumbnails-feed-videos .video-category{display:inline;font-size:12px;font-weight:600;text-decoration:none;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif;text-transform:capitalize}.organic-thumbnails-feed-videos .video-title{font-size:20px;line-height:24px;font-weight:600!important;max-height:72px;color:#212121}.organic-thumbnails-feed-videos .video-uploader{font-size:12px;font-weight:600!important;text-decoration:none;color:#fff;background-color:#009bff;width:fit-content!important;margin-top:8px;height:38px;position:absolute;left:0}.organic-thumbnails-feed-videos .video-uploader .play-div{width:38px;height:38px;background-color:#0083d9;display:inline-block}.organic-thumbnails-feed-videos .video-uploader img{width:24px;height:24px;margin-left:7px;margin-top:7px}.organic-thumbnails-feed-videos .video-external-data{font-size:12px;display:inline;font-weight:400;color:rgba(0,0,0,0.60);font-family:'Unify Sans',Helvetica,Arial,sans-serif}.organic-thumbnails-feed-videos .video-external-data dt{font-weight:400}.organic-thumbnails-feed-videos .trc_rbox_outer .videoCube{margin-bottom:0!important}.organic-thumbnails-feed-videos .thumbBlock_holder{width:66%}.organic-thumbnails-feed-videos-mobile img{max-width:none}.organic-thumbnails-feed-videos-mobile [class*=span]{float:none;margin-left:0}.organic-thumbnails-feed-videos-mobile .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:#f8f8f8;box-sizing:border-box}.organic-thumbnails-feed-videos-mobile .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-feed-videos-mobile .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-feed-videos-mobile .logoDiv a{font-size:100%}.organic-thumbnails-feed-videos-mobile .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.organic-thumbnails-feed-videos-mobile .videoCube a{padding:0}.organic-thumbnails-feed-videos-mobile .thumbBlock{margin:0}.organic-thumbnails-feed-videos-mobile .video-label-box{margin:5px 0 0 0;height:128px}.organic-thumbnails-feed-videos-mobile .syndicatedItem .video-label-box{margin:5px 0 0 0;height:128px}.organic-thumbnails-feed-videos-mobile .videoCube .video-label-box .video-title{text-decoration:none;margin:0;margin-top:4px;margin-bottom:8px}.organic-thumbnails-feed-videos-mobile .videoCube:hover .video-label-box .video-title,.organic-thumbnails-feed-videos-mobile .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-feed-videos-mobile .video-label-box .branding{display:block}.organic-thumbnails-feed-videos-mobile .syndicatedItem .branding{line-height:32.0px}.organic-thumbnails-feed-videos-mobile .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-feed-videos-mobile .trc_header_right_part{margin-top:3px}.organic-thumbnails-feed-videos-mobile .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-feed-videos-mobile .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbnails-feed-videos-mobile .trc_rbox_header_span:before{background:#009bff;content:' ';height:12px;width:24px;display:inline-block;margin-right:10px}.organic-thumbnails-feed-videos-mobile .trc_rbox_header_span{text-transform:unset;font-size:16px;font-weight:900;color:rgba(0,0,0,0.87)}.organic-thumbnails-feed-videos-mobile .videoCube .video-label-box{background:#fff;padding:10px 3% 0 3%;width:84%;transform:translateY(-30px)}.organic-thumbnails-feed-videos-mobile .video-category{font-size:12px;font-weight:600;text-decoration:none;color:#666;font-family:'Unify Sans',Helvetica,Arial,sans-serif;display:inline}.organic-thumbnails-feed-videos-mobile .video-title{font-size:20px;line-height:24px;font-weight:600!important;max-height:48px;color:#212121}.organic-thumbnails-feed-videos-mobile .video-uploader{font-size:12px;font-weight:600!important;text-decoration:none;color:#fff;background-color:#009bff;position:absolute;top:-34px;height:38px}.organic-thumbnails-feed-videos-mobile .trc_rbox_outer .videoCube{margin-bottom:0!important}.organic-thumbnails-feed-videos-mobile .video-uploader .play-div{width:38px;height:38px;background-color:#0083d9;display:inline-block}.organic-thumbnails-feed-videos-mobile .video-uploader img{width:24px;height:24px;margin-left:7px;margin-top:7px}.organic-thumbnails-feed-videos-mobile .video-external-data{font-size:12px;text-decoration:none;color:#666;display:inline}.organic-thumbnails-feed-videos-mobile .video-external-data dt{font-weight:normal}.organic-thumbnails-rr img{max-width:none}.organic-thumbnails-rr [class*=span]{float:none;margin-left:0}.organic-thumbnails-rr .trc_rbox_div{margin-bottom:0}.organic-thumbnails-rr .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:transparent;box-sizing:initial}.organic-thumbnails-rr .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.organic-thumbnails-rr .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.organic-thumbnails-rr .logoDiv a{font-size:100%}.organic-thumbnails-rr .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.organic-thumbnails-rr .videoCube a{padding:0}.organic-thumbnails-rr .trc_rbox_outer .videoCube{margin-bottom:10px}.organic-thumbnails-rr .thumbBlock{margin:0}.organic-thumbnails-rr .videoCube .video-label-box .video-title{text-decoration:none;margin-bottom:0}.organic-thumbnails-rr .videoCube:hover .video-label-box .video-title,.organic-thumbnails-rr .videoCube:hover .video-label-box .video-description{text-decoration:underline}.organic-thumbnails-rr .video-label-box .branding{display:block}.organic-thumbnails-rr .syndicatedItem .branding{line-height:22.0px}.organic-thumbnails-rr .video-label-box{margin:0;height:auto}.organic-thumbnails-rr .syndicatedItem .video-label-box{margin:0;height:auto}.organic-thumbnails-rr .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.organic-thumbnails-rr .trc_header_right_part{margin-top:0}.organic-thumbnails-rr .trc_rbox_header .logoDiv a{font-size:100%}.organic-thumbnails-rr .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.organic-thumbs-feed-01 img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.organic-thumbs-feed-01 [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.organic-thumbs-feed-01 .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.organic-thumbs-feed-01 .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01 .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.organic-thumbs-feed-01 .logoDiv a {\n    font-size: 100%;\n}\n\n.organic-thumbs-feed-01 .logoDiv a span {\n    display: inline;\n    color: #000000;\n    font-weight: normal;\n    font-size: 11px;\n}\n\n.organic-thumbs-feed-01 .videoCube a {\n    padding: 0;\n}\n\n.organic-thumbs-feed-01 .thumbBlock {\n    margin: 0;\n}\n\n.organic-thumbs-feed-01 .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 125px;\n}\n\n.organic-thumbs-feed-01 .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 125px;\n}\n\n.organic-thumbs-feed-01 .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.organic-thumbs-feed-01 .videoCube:hover .video-label-box .video-title,\n.organic-thumbs-feed-01 .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.organic-thumbs-feed-01 .video-label-box .branding {\n    display: block;\n\tline-height: 27.0px;\n}\n\n.organic-thumbs-feed-01 .syndicatedItem .branding {\n    line-height: 27.0px;\n}\n.organic-thumbs-feed-01 .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01 .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.organic-thumbs-feed-01 .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.organic-thumbs-feed-01 .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.organic-thumbs-feed-01-a-bpcv img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.organic-thumbs-feed-01-a-bpcv [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.organic-thumbs-feed-01-a-bpcv .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.organic-thumbs-feed-01-a-bpcv .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01-a-bpcv .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.organic-thumbs-feed-01-a-bpcv .logoDiv a {\n    font-size: 100%;\n}\n\n.organic-thumbs-feed-01-a-bpcv .logoDiv a span {\n    display: inline;\n    color: #000000;\n    font-weight: normal;\n    font-size: 11px;\n}\n\n.organic-thumbs-feed-01-a-bpcv .videoCube a {\n    padding: 0;\n}\n\n.organic-thumbs-feed-01-a-bpcv .thumbBlock {\n    margin: 0;\n}\n\n.organic-thumbs-feed-01-a-bpcv .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 96px;\n}\n\n.organic-thumbs-feed-01-a-bpcv .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 96px;\n}\n\n.organic-thumbs-feed-01-a-bpcv .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.organic-thumbs-feed-01-a-bpcv .videoCube:hover .video-label-box .video-title,\n.organic-thumbs-feed-01-a-bpcv .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.organic-thumbs-feed-01-a-bpcv .video-label-box .branding {\n    display: block;\n\tline-height: 24.0px;\n}\n\n.organic-thumbs-feed-01-a-bpcv .syndicatedItem .branding {\n    line-height: 24.0px;\n}\n.organic-thumbs-feed-01-a-bpcv .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01-a-bpcv .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.organic-thumbs-feed-01-a-bpcv .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.organic-thumbs-feed-01-a-bpcv .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.organic-thumbs-feed-01-bpcv img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.organic-thumbs-feed-01-bpcv [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.organic-thumbs-feed-01-bpcv .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.organic-thumbs-feed-01-bpcv .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01-bpcv .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.organic-thumbs-feed-01-bpcv .logoDiv a {\n    font-size: 100%;\n}\n\n.organic-thumbs-feed-01-bpcv .logoDiv a span {\n    display: inline;\n    color: #000000;\n    font-weight: normal;\n    font-size: 11px;\n}\n\n.organic-thumbs-feed-01-bpcv .videoCube a {\n    padding: 0;\n}\n\n.organic-thumbs-feed-01-bpcv .thumbBlock {\n    margin: 0;\n}\n\n.organic-thumbs-feed-01-bpcv .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 125px;\n}\n\n.organic-thumbs-feed-01-bpcv .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 125px;\n}\n\n.organic-thumbs-feed-01-bpcv .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.organic-thumbs-feed-01-bpcv .videoCube:hover .video-label-box .video-title,\n.organic-thumbs-feed-01-bpcv .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.organic-thumbs-feed-01-bpcv .video-label-box .branding {\n    display: block;\n\tline-height: 27.0px;\n}\n\n.organic-thumbs-feed-01-bpcv .syndicatedItem .branding {\n    line-height: 27.0px;\n}\n.organic-thumbs-feed-01-bpcv .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01-bpcv .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.organic-thumbs-feed-01-bpcv .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.organic-thumbs-feed-01-bpcv .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.organic-thumbs-feed-01-c img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.organic-thumbs-feed-01-c [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.organic-thumbs-feed-01-c .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.organic-thumbs-feed-01-c .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01-c .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.organic-thumbs-feed-01-c .logoDiv a {\n    font-size: 100%;\n}\n\n.organic-thumbs-feed-01-c .logoDiv a span {\n    display: inline;\n    color: #000000;\n    font-weight: normal;\n    font-size: 11px;\n}\n\n.organic-thumbs-feed-01-c .videoCube a {\n    padding: 0;\n}\n\n.organic-thumbs-feed-01-c .thumbBlock {\n    margin: 0;\n}\n\n.organic-thumbs-feed-01-c .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 96px;\n}\n\n.organic-thumbs-feed-01-c .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 96px;\n}\n\n.organic-thumbs-feed-01-c .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.organic-thumbs-feed-01-c .videoCube:hover .video-label-box .video-title,\n.organic-thumbs-feed-01-c .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.organic-thumbs-feed-01-c .video-label-box .branding {\n    display: block;\n\tline-height: 24.0px;\n}\n\n.organic-thumbs-feed-01-c .syndicatedItem .branding {\n    line-height: 24.0px;\n}\n.organic-thumbs-feed-01-c .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01-c .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.organic-thumbs-feed-01-c .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.organic-thumbs-feed-01-c .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.organic-thumbs-feed-01-c-bpcv img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.organic-thumbs-feed-01-c-bpcv [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.organic-thumbs-feed-01-c-bpcv .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.organic-thumbs-feed-01-c-bpcv .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01-c-bpcv .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.organic-thumbs-feed-01-c-bpcv .logoDiv a {\n    font-size: 100%;\n}\n\n.organic-thumbs-feed-01-c-bpcv .logoDiv a span {\n    display: inline;\n    color: #000000;\n    font-weight: normal;\n    font-size: 11px;\n}\n\n.organic-thumbs-feed-01-c-bpcv .videoCube a {\n    padding: 0;\n}\n\n.organic-thumbs-feed-01-c-bpcv .thumbBlock {\n    margin: 0;\n}\n\n.organic-thumbs-feed-01-c-bpcv .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 96px;\n}\n\n.organic-thumbs-feed-01-c-bpcv .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 96px;\n}\n\n.organic-thumbs-feed-01-c-bpcv .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.organic-thumbs-feed-01-c-bpcv .videoCube:hover .video-label-box .video-title,\n.organic-thumbs-feed-01-c-bpcv .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.organic-thumbs-feed-01-c-bpcv .video-label-box .branding {\n    display: block;\n\tline-height: 24.0px;\n}\n\n.organic-thumbs-feed-01-c-bpcv .syndicatedItem .branding {\n    line-height: 24.0px;\n}\n.organic-thumbs-feed-01-c-bpcv .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.organic-thumbs-feed-01-c-bpcv .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.organic-thumbs-feed-01-c-bpcv .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.organic-thumbs-feed-01-c-bpcv .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.text-links-a [class*=span]{float:none;margin-left:0}#taboola-section-front-text-links{display:inline-block;width:26%;vertical-align:top;padding:1.5% 1.5% 1.5% 0}#taboola-homepage-text-links{display:inline-block;width:26%;vertical-align:top;padding:1.5% 1.5% 1.5% 0}.text-links-a{padding:50px 0 0 10%}.text-links-a .trc_rbox_header{line-height:1.2em;position:relative;display:none;width:100%;background:transparent;height:auto}.text-links-a .trc_rbox_header_span .trc_header_right_column{position:absolute;width:48%;left:52%;top:0;background:transparent;height:auto}.text-links-a .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;position:relative;z-index:1}.text-links-a .logoDiv a{font-size:100%}.text-links-a .logoDiv a span{color:#000;font-weight:normal;font-size:11px}.text-links-a .syndicatedItem .video-title .branding{line-height:18px}.text-links-a .trc_rbox_div .videoCube.horizontal{clear:left}.text-links-a .trc_rbox_div .videoCube.trc_tl_right_col{float:none;clear:right;margin-left:auto}.text-links-a .videoCube:hover span.branding,.text-links-a .videoCube_hover span.branding{text-decoration:none}.text-links-a .trc_rbox_div .videoCube.thumbnail_none a{display:list-item;list-style:none outside none;vertical-align:top;overflow:visible;margin-left:0;padding:0}.text-links-a .trc_rbox_div .videoCube.videoCube_4_child{padding-bottom:0}.text-links-a .videoCube .video-label-box{display:inline-block!important;vertical-align:top;width:100%;*margin-top:-3px;//min-height:19.0px;height:68px}.text-links-a .videoCube .video-label-box .video-title{-webkit-line-clamp:2!important;margin-top:7px}.text-links-a .trc_rbox_div .videoCube:hover .video-title{text-decoration:underline}.text-links-a .trc_header_left_column{background:transparent;height:auto}.text-links-a .trc_rbox_header .logoDiv a{font-size:100%}.text-links-a .syndicatedItem .branding{line-height:18.0px}.text-links-a .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}@media screen and (min-width:1250px) and (max-width:1400px){#taboola-section-front-text-links{width:26%}#taboola-homepage-text-links{width:26%}}@media screen and (min-width:1150px) and (max-width:1249px){#taboola-section-front-text-links{width:25%}#taboola-homepage-text-links{width:25%}.text-links-a .videoCube .video-label-box{height:62px}.text-links-a .videoCube .video-label-box .video-title{font-size:12px}}@media screen and (max-width:1149px){.text-links-a{padding:0 0 0 30px}#taboola-section-front-text-links{display:block;width:97%;padding:1.5% 1.5% 1.5% 1.5%}#taboola-homepage-text-links{display:block;width:97%;padding:1.5% 1.5% 1.5% 1.5%}.text-links-a .trc_rbox_div div.videoCube{padding:0 40px 22px 0!important;width:48%}.text-links-a .trc_rbox_div div.videoCube:nth-of-type(-n+4){float:none!important;clear:none!important}.text-links-a .trc_rbox_div div.videoCube:nth-of-type(-n+2){float:left!important;clear:left!important}}.thumbnails-a img{max-width:none}.thumbnails-a [class*=span]{float:none;margin-left:0}.thumbnails-a .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.thumbnails-a .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-a .logoDiv a{font-size:100%}.thumbnails-a .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11px}.thumbnails-a .videoCube a{padding:0}.thumbnails-a .thumbBlock{margin:0}\n .trc_elastic .thumbnails-a .video-label-box{height:88.0px}\n.thumbnails-a .videoCube .video-label-box{margin-top:5px}.thumbnails-a .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-a .videoCube:hover .video-label-box .video-title{text-decoration:none}.thumbnails-a .video-label-box .branding{display:block}\n .thumbnails-a .syndicatedItem .branding{line-height:22.0px}\n.thumbnails-a .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-a .trc_rbox_header .logoDiv a{font-size:100%}.trc_elastic .thumbnails-a .trc_rbox_outer .videoCube:not(.videoCube_4_child){margin-bottom:26px;border-bottom:1px solid #999}.thumbnails-a .trc_rbox_header .trc_header_ext{position:relative;top:auto;float:none;display:inline-block;margin-left:10px}.thumbnails-a .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;display:inline-block}.thumbnails-a .trc_rbox_header .trc_rbox_header_span{display:inline-block;float:left}.thumbnails-a .trc_desktop_attribution_link.trc_attribution_position_top{font-family:'Unify Sans'}.thumbnails-a .logoDiv a span{font-family:'Unify Sans'}.thumbnails-a-amp img{max-width:none}.thumbnails-a-amp [class*=span]{float:none;margin-left:0}.thumbnails-a-amp .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.thumbnails-a-amp .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-a-amp .logoDiv a{font-size:100%}.thumbnails-a-amp .logoDiv a span{display:inline;color:#999;font-weight:normal;font-size:11px}.thumbnails-a-amp .videoCube a{padding:0}.thumbnails-a-amp .thumbBlock{margin:0}\n .trc_elastic .thumbnails-a-amp .video-label-box{height:88.0px}\n.thumbnails-a-amp .videoCube .video-label-box{margin-top:5px}.thumbnails-a-amp .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-a-amp .videoCube:hover .video-label-box .video-title{text-decoration:none}.thumbnails-a-amp .video-label-box .branding{display:block}\n .thumbnails-a-amp .syndicatedItem .branding{line-height:22.0px}\n.thumbnails-a-amp .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-a-amp .trc_rbox_header .logoDiv a{font-size:100%}.trc_elastic .thumbnails-a-amp .trc_rbox_outer .videoCube:not(.videoCube_4_child){margin-bottom:26px}.thumbnails-a-amp .trc_rbox_header .trc_header_ext{position:relative;top:auto}.thumbnails-a-amp .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;display:inline-block}.thumbnails-a-amp .trc_rbox_header .trc_rbox_header_span{display:inline-block;float:left}.thumbnails-b img{max-width:none}.thumbnails-b [class*=span]{float:none;margin-left:0}.thumbnails-b .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.thumbnails-b .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-b .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-b .logoDiv a{font-size:100%}.thumbnails-b .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.thumbnails-b .videoCube a{padding:0}.thumbnails-b .thumbBlock{margin:0}\n 72.0px.trc_elastic .thumbnails-b .video-label-box{height:57.0px}\n.thumbnails-b .videoCube .video-label-box{margin-top:5px}.thumbnails-b .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-b .video-label-box .branding{display:block}\n 24.0px.thumbnails-b .syndicatedItem .branding{line-height:19.0px}\n.thumbnails-b .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-b .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-b .trc_rbox_header .trc_header_ext{position:relative;top:auto;display:inline-block;margin-left:10px}.thumbnails-b .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;display:inline-block}.thumbnails-b .trc_rbox_header_span{display:inline-block;float:left}.thumbnails-c img{max-width:none}.thumbnails-c [class*=span]{float:none;margin-left:0}.thumbnails-c .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.thumbnails-c .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-c .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-c .logoDiv a{font-size:100%}.thumbnails-c .logoDiv a span{display:inline;color:rgba(0,0,0,.53);font-weight:normal;font-size:14.0px;font-family:'Unify Sans Regular',helvetica,arial,sans-serif}.thumbnails-c .videoCube a{padding:0}.thumbnails-c .thumbBlock{margin:0}.trc_elastic .thumbnails-c .video-label-box{height:76.0px}.thumbnails-c .videoCube .video-label-box{margin-top:5px}.thumbnails-c .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-c .videoCube:hover .video-label-box .video-title{text-decoration:none}.thumbnails-c .video-label-box .branding{display:block}.thumbnails-c .syndicatedItem .branding{line-height:19.0px}.thumbnails-c .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-c .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-c .trc_rbox_header .trc_header_ext{position:relative;top:auto;float:none;display:inline-block;margin-left:10px}.thumbnails-c .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;display:inline-block}.thumbnails-c .trc_rbox_header_span{display:inline-block;float:left}.thumbnails-d img{max-width:none}.thumbnails-d [class*=span]{float:none;margin-left:0}.thumbnails-d .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.thumbnails-d .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-d .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-d .logoDiv a{font-size:100%}.thumbnails-d .logoDiv a span{display:inline;color:#fff;font-weight:normal;font-size:11.0px}.thumbnails-d .videoCube a{padding:0}.thumbnails-d .thumbBlock{margin:0}.trc_elastic .thumbnails-d .video-label-box{height:76.0px}.thumbnails-d .videoCube .video-label-box{margin-top:5px}.thumbnails-d .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-d .videoCube:hover .video-label-box .video-title{text-decoration:none}.thumbnails-d .video-label-box .branding{display:block}.thumbnails-d .syndicatedItem .branding{line-height:19.0px}.thumbnails-d .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-d .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-d .trc_rbox_header .trc_header_ext{position:relative;display:inline-block;margin-left:10px}.thumbnails-d .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;display:inline-block}.thumbnails-d .trc_rbox_header_span{display:inline-block;float:left}\n.thumbnails-e img{max-width:none}.thumbnails-e [class*=span]{float:none;margin-left:0}.thumbnails-e .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:transparent;padding:0 0 6px 0;box-sizing:initial}.thumbnails-e .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-e .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-e .logoDiv a{font-size:100%}.thumbnails-e .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.thumbnails-e .videoCube a{padding:0}.thumbnails-e .thumbBlock{margin:0}\n .trc_elastic .thumbnails-e .video-label-box{height:72.0px}\n.thumbnails-e .videoCube .video-label-box{margin-top:5px}.thumbnails-e .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-e .videoCube:hover .video-label-box .video-title{text-decoration:underline}.thumbnails-e .video-label-box .branding{display:block}\n .thumbnails-e .syndicatedItem .branding{line-height:18.0px}\n.thumbnails-e .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-e .trc_header_right_part{margin-top:0}.thumbnails-e .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-e .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.trc_related_container .logoDiv{font-family:'Unify Sans'}.thumbnails-f img{max-width:none}.thumbnails-f [class*=span]{float:none;margin-left:0}.thumbnails-f .trc_rbox_div{margin-bottom:0}.thumbnails-f .trc_rbox_header{line-height:1.2em;position:relative;display:none;width:100%;background:transparent;height:auto}.thumbnails-f .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-f .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-f .logoDiv a{font-size:100%}.thumbnails-f .logoDiv a span{display:inline;color:#b3b3b3;font-weight:normal;font-size:11.0px}.thumbnails-f .videoCube a{padding:0}.thumbnails-f .trc_rbox_outer .videoCube{margin-bottom:10px;padding-top:18px;padding-bottom:9px;border-top:1px solid #dcdcdc}.thumbnails-f .thumbBlock{margin:0}.trc_elastic .thumbnails-f .video-label-box{height:76.0px}.thumbnails-f .videoCube .video-label-box .video-title{text-decoration:none;margin-bottom:0}.thumbnails-f .videoCube:hover .video-label-box .video-title{text-decoration:underline}.thumbnails-f .video-label-box .branding{display:block}.thumbnails-f .syndicatedItem .branding{line-height:22.0px;position:relative;bottom:7px}.thumbnails-f .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-f .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-f .videoCube .video-label-box{margin-top:0}.thumbnails-f .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.thumbnails-f .trc_rbox_outer .trc-first-recommendation.videoCube{border-top:0}.thumbnails-feed-a img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.thumbnails-feed-a [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.thumbnails-feed-a .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: block;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.thumbnails-feed-a .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbnails-feed-a .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.thumbnails-feed-a .logoDiv a {\n    font-size: 100%;\n}\n\n.thumbnails-feed-a .logoDiv a span {\n    display: inline;\n    color: #000000;\n    font-weight: normal;\n    font-size: 11.0px;\n}\n\n.thumbnails-feed-a .videoCube a {\n    padding: 0;\n}\n\n.thumbnails-feed-a .thumbBlock {\n    margin: 0;\n}\n\n.thumbnails-feed-a .video-label-box {\n    margin: 5px 5px 0px 5px;\n    height: 66px;\n}\n\n.thumbnails-feed-a .syndicatedItem .video-label-box {\n    margin: 5px 5px 0px 5px;\n    height: 66px;\n}\n\n.thumbnails-feed-a .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.thumbnails-feed-a .videoCube:hover .video-label-box .video-title,\n.thumbnails-feed-a .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.thumbnails-feed-a .video-label-box .branding {\n    display: block;\n\tline-height: 22.0px;\n}\n\n.thumbnails-feed-a .syndicatedItem .branding {\n    line-height: 22.0px;\n}\n.thumbnails-feed-a .trc_header_left_column {\n\twidth: 48%;\n\tdisplay: inline-block;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbnails-feed-a .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.thumbnails-feed-a .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.thumbnails-feed-a .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.thumbnails-feed-desktop img{max-width:none}.thumbnails-feed-desktop [class*=span]{float:none;margin-left:0}.thumbnails-feed-desktop .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:transparent;box-sizing:initial;font-family:'Unify Sans',helvetica,arial,sans-serif;font-size:16px font-weight:bold}.thumbnails-feed-desktop .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-feed-desktop .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-feed-desktop .logoDiv a{font-size:100%}.thumbnails-feed-desktop .logoDiv a span{display:inline;color:#666;text-decoration:none;font-size:12px;font-weight:400;font-family:'Unify Sans',helvetica,arial,sans-serif}.thumbnails-feed-desktop .videoCube a{padding:0}.thumbnails-feed-desktop .thumbBlock{margin:0}.thumbnails-feed-desktop .video-label-box{margin:5px 0 0 0;height:88px}.thumbnails-feed-desktop .syndicatedItem .video-label-box{margin:5px 0 0 5px;height:66px}.thumbnails-feed-desktop .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-feed-desktop .videoCube:hover .video-label-box .video-title,.thumbnails-feed-desktop .videoCube:hover .video-label-box .video-description{text-decoration:underline}.thumbnails-feed-desktop .video-label-box .branding{display:block}.thumbnails-feed-desktop .syndicatedItem .branding{line-height:22.0px}.thumbnails-feed-desktop .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-feed-desktop .trc_header_right_part{margin-top:0}.thumbnails-feed-desktop .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-feed-desktop .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.thumbnails-feed-mobile-e img{max-width:none}.thumbnails-feed-mobile-e .trc_rbox_header .trc_rbox_header_span{margin-left:5%}.thumbnails-feed-mobile-e [class*=span]{float:none;margin-left:0}.thumbnails-feed-mobile-e .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:transparent;padding:0 0 6px 0;box-sizing:initial;padding-bottom:5px!important}.thumbnails-feed-mobile-e .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-feed-mobile-e .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-feed-mobile-e .logoDiv a{font-size:100%}.thumbnails-feed-mobile-e .videoCube a{padding:0}.thumbnails-feed-mobile-e .thumbBlock{margin:0}.trc_elastic .thumbnails-feed-mobile-e .video-label-box{height:76.0px}.thumbnails-feed-mobile-e .videoCube .video-label-box{margin-top:5px}.thumbnails-feed-mobile-e .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-feed-mobile-e .videoCube:hover .video-label-box .video-title{text-decoration:underline}.thumbnails-feed-mobile-e .video-label-box .branding{display:block}.thumbnails-feed-mobile-e .syndicatedItem .branding{line-height:19.0px}.thumbnails-feed-mobile-e .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-feed-mobile-e .trc_header_right_part{margin-top:0}.thumbnails-feed-mobile-e .trc_rbox_header .logoDiv a{font-size:100%;box-shadow:none}.thumbnails-feed-mobile-e .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.thumbnails-feed-mobile-e .videoCube.syndicatedItem .video-label-box{margin-left:5%;margin-right:5%}.thumbnails-feed-mobile-e .logoDiv a span{display:inline!important;color:#000!important;text-decoration:none;font-size:11px;font-weight:400;font-family:Arial,Helvetica,'sans-serif'}.thumbnails-feed-mobile-e .logoDiv a span .trc_adc_s_logo{display:inline-block!important}.thumbnails-feed-mobile-e .trc_related_container .logoDiv+.logoDiv{margin-right:0}.thumbnails-feed-mobile-e .logoDiv a span.trc_logos_v_align{font-size:0!important}.tbl-feed-container .trc_mobile_disclosure_link span:after{content:unset}.thumbnails-feed-original img{max-width:none}.thumbnails-feed-original [class*=span]{float:none;margin-left:0}.thumbnails-feed-original .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:transparent;box-sizing:initial}.thumbnails-feed-original .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-feed-original .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-feed-original .logoDiv a{font-size:100%}.thumbnails-feed-original .logoDiv a span{display:inline;color:#666;text-decoration:none;font-size:12px;font-weight:400;font-family:'Unify Sans',helvetica,arial,sans-serif}.thumbnails-feed-original .videoCube a{padding:0}.thumbnails-feed-original .thumbBlock{margin:0}.thumbnails-feed-original .video-label-box{margin:5px 0 0 0;height:88px}.thumbnails-feed-original .syndicatedItem .video-label-box{margin:5px 0 0 5px;height:88px}.thumbnails-feed-original .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-feed-original .videoCube:hover .video-label-box .video-title,.thumbnails-feed-original .videoCube:hover .video-label-box .video-description{text-decoration:underline}.thumbnails-feed-original .video-label-box .branding{display:block}.thumbnails-feed-original .syndicatedItem .branding{line-height:22.0px}.thumbnails-feed-original .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-feed-original .trc_header_right_part{margin-top:0}.thumbnails-feed-original .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-feed-original .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.thumbnails-feed-stream img{max-width:none}.thumbnails-feed-stream [class*=span]{float:none;margin-left:0}.thumbnails-feed-stream .trc_rbox_div{margin-bottom:0}.thumbnails-feed-stream .trc_rbox_header{line-height:1.2em;position:relative;width:auto;margin:0;background:transparent;height:auto;background-color:transparent;box-sizing:initial;font-family:'Unify Sans',helvetica,arial,sans-serif;font-size:16px font-weight:bold}.thumbnails-feed-stream .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-feed-stream .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-feed-stream .logoDiv a{font-size:100%}.thumbnails-feed-stream .logoDiv a span{display:inline;color:#666;font-weight:normal;font-size:12.0px;font-family:'Unify Sans',helvetica,arial,sans-serif}.thumbnails-feed-stream .videoCube a{padding:0}.thumbnails-feed-stream .trc_rbox_outer .videoCube{margin-bottom:10px}.thumbnails-feed-stream .thumbBlock{margin:0}.thumbnails-feed-stream .videoCube .video-label-box .video-title{text-decoration:none;margin-bottom:0}.thumbnails-feed-stream .videoCube:hover .video-label-box .video-title,.thumbnails-feed-stream .videoCube:hover .video-label-box .video-description{text-decoration:underline}.thumbnails-feed-stream .video-label-box .branding{display:block}.thumbnails-feed-stream .syndicatedItem .branding{line-height:19.0px}.thumbnails-feed-stream .video-label-box{margin:0;height:auto}.thumbnails-feed-stream .syndicatedItem .video-label-box{margin:0;height:auto}.thumbnails-feed-stream .trc_header_left_column{background:transparent;height:auto}.thumbnails-feed-stream .trc_header_right_part{margin-top:0}.thumbnails-feed-stream .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-feed-stream .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.thumbnails-feed-stream .syndicatedItem .branding{color:rgba(0,0,0,.53);font-size:14.0px;font-weight:bold;text-decoration:none;font-family:'Unify Sans',helvetica,arial,sans-serif;line-height:22px}.thumbnails-feed-stream .videoCube.syndicatedItem .video-label-box{margin-top:15px;margin-right:5px}.thumbnails-g img{max-width:none}.thumbnails-g [class*=span]{float:none;margin-left:0}#taboola-section-front-thumbnails{display:inline-block;width:70%;padding:1.5% 0 1.5% 1.5%}.thumbnails-g .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto;margin:0 0 15px 0}.thumbnails-g .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-g .trc_rbox_header .trc_rbox_header_span{line-height:21px;text-transform:uppercase;text-shadow:0 1px 0 #fff;font-weight:400}.thumbnails-g .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-g .logoDiv a{font-size:100%}.thumbnails-g .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.thumbnails-g .videoCube a{padding:0}.thumbnails-g .thumbBlock{margin:0}.trc_elastic .thumbnails-g .video-label-box{position:absolute;z-index:100;bottom:0}.trc_elastic .trc_safari .thumbnails-g .video-label-box{bottom:-20px!important}.thumbnails-g .videoCube .video-label-box .video-title{text-decoration:none;margin:0 12px 20px 12px;z-index:100;text-shadow:0 1px 1px #000}.thumbnails-g .videoCube:hover .video-label-box .video-title{text-decoration:none}.thumbnails-g .video-label-box .branding{display:block}.thumbnails-g .syndicatedItem .branding{line-height:18.0px;margin:0 12px 2px 12px;text-shadow:0 1px 1px #343434}.thumbnails-g .trc_header_left_column{background:transparent;height:auto}.thumbnails-g .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-g .videoCube .video-label-box em{margin:2px;color:#b8b8b8!important;font-size:12px;vertical-align:top}.thumbnails-g .thumbBlock .thumbnail-overlay{background-size:100%;width:100%;height:100%}.trc_ie8 .thumbnails-g .thumbBlock .thumbnail-overlay{background-color:transparent;opacity:0}.thumbnails-g .videoCube .thumbnail-overlay{background-position:5% 100%}.trc_elastic .thumbnails-g .videoCube{overflow:visible}.trc_elastic .thumbnails-g.trc_rbox .trc_rbox_div{overflow:hidden}.trc_elastic .thumbnails-g{margin-bottom:0}.thumbnails-g .thumbBlock .thumbnail-overlay{width:100%;height:100%}.thumbnails-g span.thumbBlock:before{height:100%;background:rgba(0,0,0,.15);content:'';display:block;position:absolute;top:0;transition:background-color .15s ease-out;width:100%;z-index:2}.thumbnails-g span.thumbBlock:hover:before{background:none!important}.trc_elastic .thumbnails-g{margin-bottom:0}.trc_elastic .thumbnails-g .thumbBlock_holder{box-shadow:0 2px 1px rgba(0,0,0,.2)}@media screen and (min-width:1250px) and (max-width:1400px){#taboola-section-front-thumbnails{width:70%}}@media screen and (min-width:1150px) and (max-width:1249px){#taboola-section-front-thumbnails{width:72%}}@media screen and (max-width:1149px){#taboola-section-front-thumbnails{display:block;width:97%;padding:1.5% 1.5% 1.5% 1.5%}}.thumbnails-g .trc_rbox_header .trc_header_ext{position:relative;top:auto;display:inline-block;margin-left:10px}.thumbnails-g .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;display:inline-block}.thumbnails-g .trc_rbox_header_span{display:inline-block;float:left}.thumbnails-k img{max-width:none}.thumbnails-k [class*=span]{float:none;margin-left:0}.thumbnails-k .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto}.thumbnails-k .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-k .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-k .logoDiv a{font-size:100%}.thumbnails-k .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.thumbnails-k .videoCube a{padding:0}.thumbnails-k .thumbBlock{margin:0}.trc_elastic .thumbnails-k .video-label-box{height:110.0px;position:relative;z-index:100}.thumbnails-k .videoCube .video-label-box{margin-top:-82px}.thumbnails-k .videoCube .video-label-box .video-title{text-decoration:none;margin-bottom:20px;height:72px!important;padding:0 12px 0px 12px;z-index:100;display:-webkit-box;vertical-align:bottom; -webkit-line-clamp: 3;}.thumbnails-k .videoCube:hover .video-label-box .video-title{text-decoration:underline}.thumbnails-k .video-label-box .branding{display:block}.thumbnails-k .syndicatedItem .branding{line-height:19.0px}.thumbnails-k .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-k .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-k .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.thumbnails-k .videoCube .video-label.video-published-date{font-style:italic;display:inline-block;color:gray;font-size:11px}.thumbnails-k .videoCube .video-label-box em{margin:2px;color:#b8b8b8!important;font-size:12px;vertical-align:top}.thumbnails-k .videoCube .video-label.video-category{color:#1a8ddc;font-size:13px;display:inline-block;text-transform:uppercase}.thumbnails-k .thumbBlock .thumbnail-overlay{background-size:100%;width:100%;height:100%}.thumbnails-k .thumbBlock .thumbnail-overlay{background-size:100%;width:100%;height:100%}.thumbnails-k .videoCube .thumbnail-overlay{background-position:5% 100%}.trc_ie8 .thumbnails-k .thumbBlock .thumbnail-overlay{background-color:transparent;opacity:0}.trc_elastic .trc_rbox_container .thumbnails-k{max-width:540px}.thumbnails-p img{max-width:none}.thumbnails-p [class*=span]{float:none;margin-left:0}.thumbnails-p .trc_rbox_div{margin-bottom:0}.thumbnails-p .trc_rbox_header{line-height:1.2em;position:relative;display:none;width:auto;margin:0;background:transparent;height:auto;background-color:transparent;box-sizing:initial;padding-bottom:10px;margin-bottom:30px;border-bottom:0 solid #ccc}.thumbnails-p .trc_rbox_header_span{color:transparent}.thumbnails-p .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-p .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-p .logoDiv a{font-size:100%}.thumbnails-p .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.thumbnails-p .videoCube a{padding:0}.thumbnails-p .trc_rbox_outer .videoCube{margin-bottom:10px}.thumbnails-p .thumbBlock{margin:0}.thumbnails-p .videoCube .video-label-box .video-title{text-decoration:none;margin-bottom:0;font-family:'Futura Today DemiBold',arial,sans-serif!important}.thumbnails-p .videoCube:hover .video-label-box .video-title{text-decoration:underline}.thumbnails-p .video-label-box .branding{display:block}.thumbnails-p .syndicatedItem .branding{line-height:normal;margin-top:12px}.thumbnails-p .video-label-box{margin:0;height:auto}.thumbnails-p .syndicatedItem .video-label-box{margin:0;height:auto}.thumbnails-p .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-p .trc_header_right_part{margin-top:0}.thumbnails-p .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-p .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.trc_elastic .thumbnails-p .trc_rbox_outer .thumbBlock_holder{margin-left:10px;margin-right:0;float:right;width:84px!important;height:84px!important}.trc_elastic .thumbnails-p .videoCube{margin-bottom:27px!important}.thumbnails-q-abp img{max-width:none}.thumbnails-q-abp [class*=span]{float:none;margin-left:0}.thumbnails-q-abp .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto;background-color:transparent;padding:0 0 6px 0;box-sizing:initial}.thumbnails-q-abp .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-q-abp .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-q-abp .logoDiv a{font-size:100%}.thumbnails-q-abp .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.thumbnails-q-abp .videoCube a{padding:0}.thumbnails-q-abp .thumbBlock{margin:0}.trc_elastic .thumbnails-q-abp .video-label-box{height:76.0px}.thumbnails-q-abp .videoCube .video-label-box{margin-top:5px}.thumbnails-q-abp .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-q-abp .videoCube:hover .video-label-box .video-title{text-decoration:underline}.thumbnails-q-abp .video-label-box .branding{display:block}.thumbnails-q-abp .syndicatedItem .branding{line-height:19.0px}.thumbnails-q-abp .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-q-abp .trc_header_right_part{margin-top:0}.thumbnails-q-abp .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-q-abp .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.thumbnails-r img{max-width:none}.thumbnails-r [class*=span]{float:none;margin-left:0}.thumbnails-r .trc_rbox_header{line-height:1.2em;position:relative;display:block;width:auto;margin:0;background:transparent;height:auto;background-color:transparent;padding:0 0 6px 0;box-sizing:initial}.thumbnails-r .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-r .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-r .logoDiv a{font-size:100%}.thumbnails-r .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.thumbnails-r .videoCube a{padding:0}.thumbnails-r .thumbBlock{margin:0}\n .trc_elastic .thumbnails-r .video-label-box{height:96.0px}\n.thumbnails-r .videoCube .video-label-box{margin-top:5px}.thumbnails-r .videoCube .video-label-box .video-title{text-decoration:none;margin:0}.thumbnails-r .videoCube:hover .video-label-box .video-title{text-decoration:underline}.thumbnails-r .video-label-box .branding{display:block}\n .thumbnails-r .syndicatedItem .branding{line-height:19.0px}\n.thumbnails-r .trc_header_left_column{width:48%;display:inline-block;background:transparent;height:auto}.thumbnails-r .trc_header_right_part{margin-top:0}.thumbnails-r .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-r .trc_rbox_header .trc_header_ext{position:relative;top:auto;right:auto}.trc_elastic .trc_rbox_container .thumbnails-r{max-width:540px}.thumbnails-s img{max-width:none}.thumbnails-s [class*=span]{float:none;margin-left:0}#taboola-homepage-thumbnails{display:inline-block;width:70%;padding:1.5% 0 1.5% 1.5%}.thumbnails-s .trc_rbox_header{line-height:1.2em;position:relative;display:inline-block;width:100%;background:transparent;height:auto;margin:0 0 15px 0}.thumbnails-s .trc_rbox_header_span .trc_header_right_column{display:none;background:transparent;height:auto}.thumbnails-s .trc_rbox_header .trc_rbox_header_span{line-height:21px;text-transform:uppercase;text-shadow:0 1px 0 #fff;font-weight:400}.thumbnails-s .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal}.thumbnails-s .logoDiv a{font-size:100%}.thumbnails-s .logoDiv a span{display:inline;color:#000;font-weight:normal;font-size:11.0px}.thumbnails-s .videoCube a{padding:0}.thumbnails-s .thumbBlock{margin:0}.trc_elastic .thumbnails-s .video-label-box{position:absolute;z-index:100;bottom:0}.trc_elastic .trc_safari .thumbnails-s .video-label-box{bottom:-20px!important}.thumbnails-s .videoCube .video-label-box .video-title{text-decoration:none;margin:0 12px 20px 12px;z-index:100;text-shadow:0 1px 1px #000}.thumbnails-s .videoCube:hover .video-label-box .video-title{text-decoration:none}.thumbnails-s .video-label-box .branding{display:block}.thumbnails-s .syndicatedItem .branding{line-height:18.0px;margin:0 12px 2px 12px;text-shadow:0 1px 1px #343434}.thumbnails-s .trc_header_left_column{background:transparent;height:auto}.thumbnails-s .trc_rbox_header .logoDiv a{font-size:100%}.thumbnails-s .videoCube .video-label-box em{margin:2px;color:#b8b8b8!important;font-size:12px;vertical-align:top}.thumbnails-s .thumbBlock .thumbnail-overlay{background-size:100%;width:100%;height:100%}.trc_ie8 .thumbnails-s .thumbBlock .thumbnail-overlay{background-color:transparent;opacity:0}.thumbnails-s .videoCube .thumbnail-overlay{background-position:5% 100%}.trc_elastic .thumbnails-s .videoCube{overflow:visible}.trc_elastic .thumbnails-s.trc_rbox .trc_rbox_div{overflow:hidden}.trc_elastic .thumbnails-s{margin-bottom:0}.thumbnails-s .thumbBlock .thumbnail-overlay{width:100%;height:100%}.thumbnails-s span.thumbBlock:before{height:100%;background:rgba(0,0,0,.15);content:'';display:block;position:absolute;top:0;transition:background-color .15s ease-out;width:100%;z-index:2}.thumbnails-s span.thumbBlock:hover:before{background:none!important}.trc_elastic .thumbnails-s{margin-bottom:0}.trc_elastic .thumbnails-s .thumbBlock_holder{box-shadow:0 2px 1px rgba(0,0,0,.2)}@media screen and (min-width:1250px) and (max-width:1400px){#taboola-homepage-thumbnails{width:70%}}@media screen and (min-width:1150px) and (max-width:1249px){#taboola-homepage-thumbnails{width:72%}}@media screen and (max-width:1149px){#taboola-homepage-thumbnails{display:block;width:97%;padding:1.5% 1.5% 1.5% 1.5%}}.thumbnails-s .trc_rbox_header .trc_header_ext{position:relative;top:auto;display:inline-block;margin-left:10px}.thumbnails-s .trc_rbox_header .logoDiv{font-size:inherit;line-height:normal;display:inline-block}.thumbnails-s .trc_rbox_header_span{display:inline-block;float:left}.thumbnails-u img {\n        max-width: none;\n}\n/* override bootstrap default span definitions */\n.thumbnails-u [class*=span] {\n    float:none;\n    margin-left:0;\n}\n.thumbnails-u .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: block;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n.thumbnails-u .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n.thumbnails-u .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n.thumbnails-u .logoDiv a {\n    font-size: 100%;\n}\n.thumbnails-u .logoDiv a span {\n\tdisplay: inline;\n    color: rgba(0,0,0,.53);\n    font-weight: normal;\n    font-size: 14.0px;\n    font-family: 'Unify Sans', helvetica, arial, sans-serif;\n}\n.thumbnails-u .videoCube a {\n    padding: 0;\n}\n.thumbnails-u .thumbBlock {\n    margin: 0;\n}\n.thumbnails-u .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 88px;\n}\n.thumbnails-u .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 88px;\n}\n.thumbnails-u .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n.thumbnails-u .videoCube:hover .video-label-box .video-title,\n.thumbnails-u .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n.thumbnails-u .video-label-box .branding {\n    display: block;\n}\n.thumbnails-u .syndicatedItem .branding {\n    line-height: 22.0px;\n}\n.thumbnails-u .trc_header_left_column {\n\twidth: 48%;\n\tdisplay: inline-block;\n\tbackground: transparent;\n\theight: auto;\n}\n.thumbnails-u .trc_header_right_part {\n\tmargin-top: 0px;\n}\n.thumbnails-u .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n.thumbnails-u .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.thumbs-feed-01 img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.thumbs-feed-01 [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.thumbs-feed-01 .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.thumbs-feed-01 .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbs-feed-01 .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.thumbs-feed-01 .logoDiv a {\n    font-size: 100%;\n}\n\n.thumbs-feed-01 .logoDiv a span {\n    display: inline;\n    color: #999999;\n    font-weight: normal;\n    font-size: 11.0px;\n}\n\n.thumbs-feed-01 .videoCube a {\n    padding: 0;\n}\n\n.thumbs-feed-01 .thumbBlock {\n    margin: 0;\n}\n\n.thumbs-feed-01 .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 81px;\n}\n\n.thumbs-feed-01 .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 81px;\n}\n\n.thumbs-feed-01 .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.thumbs-feed-01 .videoCube:hover .video-label-box .video-title,\n.thumbs-feed-01 .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.thumbs-feed-01 .video-label-box .branding {\n    display: block;\n\tline-height: 27.0px;\n}\n\n.thumbs-feed-01 .syndicatedItem .branding {\n    line-height: 27.0px;\n}\n.thumbs-feed-01 .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbs-feed-01 .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.thumbs-feed-01 .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.thumbs-feed-01 .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.thumbs-feed-01-a img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.thumbs-feed-01-a [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.thumbs-feed-01-a .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.thumbs-feed-01-a .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbs-feed-01-a .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.thumbs-feed-01-a .logoDiv a {\n    font-size: 100%;\n}\n\n.thumbs-feed-01-a .logoDiv a span {\n    display: inline;\n    color: #999999;\n    font-weight: normal;\n    font-size: 11.0px;\n}\n\n.thumbs-feed-01-a .videoCube a {\n    padding: 0;\n}\n\n.thumbs-feed-01-a .thumbBlock {\n    margin: 0;\n}\n\n.thumbs-feed-01-a .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 72px;\n}\n\n.thumbs-feed-01-a .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 72px;\n}\n\n.thumbs-feed-01-a .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.thumbs-feed-01-a .videoCube:hover .video-label-box .video-title,\n.thumbs-feed-01-a .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.thumbs-feed-01-a .video-label-box .branding {\n    display: block;\n\tline-height: 24.0px;\n}\n\n.thumbs-feed-01-a .syndicatedItem .branding {\n    line-height: 24.0px;\n}\n.thumbs-feed-01-a .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbs-feed-01-a .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.thumbs-feed-01-a .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.thumbs-feed-01-a .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.thumbs-feed-01-a-bpcv img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.thumbs-feed-01-a-bpcv [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.thumbs-feed-01-a-bpcv .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.thumbs-feed-01-a-bpcv .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbs-feed-01-a-bpcv .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.thumbs-feed-01-a-bpcv .logoDiv a {\n    font-size: 100%;\n}\n\n.thumbs-feed-01-a-bpcv .logoDiv a span {\n    display: inline;\n    color: #999999;\n    font-weight: normal;\n    font-size: 11.0px;\n}\n\n.thumbs-feed-01-a-bpcv .videoCube a {\n    padding: 0;\n}\n\n.thumbs-feed-01-a-bpcv .thumbBlock {\n    margin: 0;\n}\n\n.thumbs-feed-01-a-bpcv .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 72px;\n}\n\n.thumbs-feed-01-a-bpcv .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 72px;\n}\n\n.thumbs-feed-01-a-bpcv .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.thumbs-feed-01-a-bpcv .videoCube:hover .video-label-box .video-title,\n.thumbs-feed-01-a-bpcv .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.thumbs-feed-01-a-bpcv .video-label-box .branding {\n    display: block;\n\tline-height: 24.0px;\n}\n\n.thumbs-feed-01-a-bpcv .syndicatedItem .branding {\n    line-height: 24.0px;\n}\n.thumbs-feed-01-a-bpcv .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbs-feed-01-a-bpcv .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.thumbs-feed-01-a-bpcv .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.thumbs-feed-01-a-bpcv .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n.thumbs-feed-01-bpcv img {\n        max-width: none;\n}\n\n/* override bootstrap default span definitions */\n.thumbs-feed-01-bpcv [class*=span] {\n    float:none;\n    margin-left:0;\n}\n\n\n.thumbs-feed-01-bpcv .trc_rbox_header {\n        line-height: 1.2em;\n        position: relative;\n        display: none;\n        width: auto;\n\tmargin: 0px 0px 0px 0px;\n\tbackground: transparent;\n\theight: auto;\n\tbackground-color: transparent;\n\tbox-sizing: initial;\n}\n\n.thumbs-feed-01-bpcv .trc_rbox_header_span .trc_header_right_column {\n        display: none;\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbs-feed-01-bpcv .trc_rbox_header .logoDiv {\n        font-size: inherit;\n        line-height: normal;\n}\n\n.thumbs-feed-01-bpcv .logoDiv a {\n    font-size: 100%;\n}\n\n.thumbs-feed-01-bpcv .logoDiv a span {\n    display: inline;\n    color: #999999;\n    font-weight: normal;\n    font-size: 11.0px;\n}\n\n.thumbs-feed-01-bpcv .videoCube a {\n    padding: 0;\n}\n\n.thumbs-feed-01-bpcv .thumbBlock {\n    margin: 0;\n}\n\n.thumbs-feed-01-bpcv .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 81px;\n}\n\n.thumbs-feed-01-bpcv .syndicatedItem .video-label-box {\n    margin: 5px 0px 0px 0px;\n    height: 81px;\n}\n\n.thumbs-feed-01-bpcv .videoCube .video-label-box .video-title {\n    text-decoration: none;\n    margin: 0;\n}\n\n.thumbs-feed-01-bpcv .videoCube:hover .video-label-box .video-title,\n.thumbs-feed-01-bpcv .videoCube:hover .video-label-box .video-description {\n    text-decoration: underline;\n}\n\n.thumbs-feed-01-bpcv .video-label-box .branding {\n    display: block;\n\tline-height: 27.0px;\n}\n\n.thumbs-feed-01-bpcv .syndicatedItem .branding {\n    line-height: 27.0px;\n}\n.thumbs-feed-01-bpcv .trc_header_left_column {\n\tbackground: transparent;\n\theight: auto;\n}\n\n.thumbs-feed-01-bpcv .trc_header_right_part {\n\tmargin-top: 0px;\n}\n\n.thumbs-feed-01-bpcv .trc_rbox_header .logoDiv a {\n\tfont-size: 100%;\n}\n\n.thumbs-feed-01-bpcv .trc_rbox_header .trc_header_ext {\n\tposition: relative;\n\ttop: auto;\n\tright: auto;\n}\n"},"locale":null},"systemFlags":{"loaderType":"deflated"}};config=TRC.inflate?TRC.inflate(config):config,config.global["disable-config-override"]||"object"!=typeof TRC.configOverride||setConfig(config.global,TRC.configOverride);var rtbIndex=0,waitForTrkTimeout=config.global["loader-ready-timeout"]||500,DEFAULT_PROTOCOL=(config.global["rbox-default-protocol"]||"https")+":",PRECONNECT_DOMAINS=config.global["preconnect-domains"]||["trc.taboola.com","images.taboola.com"];TRC.utm.start=(new Date).getTime(),TRC._taboolaClone=[],TRC.PROTOCOL=config.global["rbox-trc-protocol"]||(win.location.protocol.match(/http/)?win.location.protocol:DEFAULT_PROTOCOL),TRC.SYNDICATED_CLASS_NAME="syndicatedItem",TRC.LOCAL_STORAGE_PIGGYBACK="lspb",TRC.SPONSORED_CONTAINER_CLASS_NAME="trc-content-sponsored",TRC.rtbUserIds=null,TRC.version="355-445-RELEASE",TRC.imageCounter=0,TRC.implInlined=TRC.implInlined||!1,TRC.implCustomFile=TRC.implCustomFile||"",win._tblConsole=win._tblConsole||[],TRC.EVENT_LOOP_INTERVAL=config.global["rbox-perf-el-interval"]||1e3,TRC.EVENT_LOOP_REPORT_INTERVAL=config.global["rbox-perf-el-report-interval"]||5e3,TRC.pConsole=function(e,t,n,o,a){try{win._tblConsole.length>400&&(win._tblConsole=[]),_tblConsole.push({service:"RBox",tab:e,log:{type:t,title:n,infoValue:o,infoType:a||"string",tstmp:(new Date).getTime()}})}catch(e){}},TRC.pConsole("","time","loader.js loaded",""),TRC.pConsole("page","info","user agent",navigator.userAgent),TRC.isOptim=function(e){return!(!config.global["feed-optim"]||!config.global["feed-optim"][e])},TRC.hasES6Support=function(){if(void 0!==eS6SupportCheckResult)return eS6SupportCheckResult;eS6SupportCheckResult=!0;try{eval("var foo = (x)=>x+1")}catch(e){eS6SupportCheckResult=!1}return eS6SupportCheckResult},TRC.styleInjected=!1;var protocol=TRC.PROTOCOL,queueName="_taboola",trc=null,globalMessages=[],originalErrorHandler=win.onerror,implElm=null,requests=[],consents=[],notificationsFirst=[],requestDispatchTimeout=null,rboxLoadCalled=!1,notifications=[],socials=[],p13ns=[],abtests=[],apiListeners=[],manualVisibles=[],globalParams={publisher:TRC.publisherId='gannett-network'},flush=!1,queue=null,trcIsBlocked=!1,throttleRnadom=100*Math.random(),pubThrottleValue,throttleMap=null,PAGE_TYPES={video:"video",article:"article",category:"category",home:"home",search:"search",photo:"photo",video_source:"video",other:"other",content_hub:"content_hub"},TBX_PAGE_TYPE_VAR="pm_pgtp",taboolaXHosts={prod:"//widget.perfectmarket.com",sb:"//widget.sandbox.perfectmarket.com"},taboolaXHost=taboolaXHosts["prod"],isTBXInit=!1,loaderHostName=null,loaderDomain,eS6SupportCheckResult;TRC.pConsole("page","info","from global params : publisher-id was set to - "+globalParams.publisher),win.onerror=function(e,t,n){try{/taboola(syndication)?\.com/.test(t)&&__trcError&&__trcError(e,n+"@"+t)}catch(e){}return originalErrorHandler&&originalErrorHandler.apply(win,Array.prototype.slice.call(arguments))},TRC.isKilled=function(){return!!trcIsBlocked||!pubThrottleValue&&(trcIsBlocked=isThrottled())},TRC.reset=function(){TRC.pConsole("page","debug","reset RBox"),requests=[],consents=[],requestDispatchTimeout=null,isTBXInit=!1,win.taboola_view_id=null,TRC._taboolaClone=[],TRC.pushedRboxTracking=!1,notifications=[],globalParams={publisher:TRC.publisherId='gannett-network'},flush=!1,doNotifications=function(){},doRequests=function(){},injectComScore();try{TRC.pageTemplate=void 0,TRC.Timeout.reset(),TRC.Interval.reset(),trc&&win.TRCImpl&&(trc.reset(),win.TRCImpl=trc=null),TRC.eventDelegator&&TRC.eventDelegator.resetEvents()}catch(e){TRC.pConsole("errors","error","error in TRC.reset",e.message)}},TRC.ready=function(e){return config.defaults=e,config.version=TRC.version,config.global["enable-events-api"]&&registerAPIEvents(),setPush(manualVisibles,doVisibles),TRC.pConsole("page","info","configuration version +  : "+config.version),TRC.publisherId=globalParams.publisher,config.global["force-reset-on-ready"]?win.TRCImpl=trc=new TRC.Manager(config,globalParams):win.TRCImpl=trc=trc||new TRC.Manager(config,globalParams),TRC.isInteractive=!1,(doRequests=realDoRequests)(),config.global["enable-social-events"]&&(doSocials=realDoSocials)(),config.global["enable-p13n-events"]&&(doP13n=realDoP13n)(),config.global["enable-abtests-events"]&&(doABTests=realDoABTests)(),trc.onclick=queue.onclick,trc.invisible&&TRC.aspect.after(trc,"internalDrawRBox",function(){(doNotifications=realDoNotifications)()},!0),trc},TRC.shiftDomain=function(e){if(!config.global["enable-shift-cdn-domains"])return e;var t=e,n,o=config.global["exclude-subd-shift"]||[],a=getHostName(e);return loaderDomain&&e&&(n=lsplit(a,".",2)[1],o.indexOf(a)<0&&n.indexOf("taboola.com")>-1&&(t=e.replace(n,loaderDomain))),t},TRC.loadTaboolaScript=function(e,t,n,o){var a=loaderHostName||"cdn.taboola.com",r=doc.getElementsByTagName("script"),i;i=doc.createElement("script"),r.length&&r[0].parentNode.insertBefore(i,r[0]),i.charset="UTF-8",i.type="text/javascript",t&&i.setAttribute("async","async");var s=chainEventCallbacks(n);s&&i.addEventListener("load",s,!1);var l=chainEventCallbacks(o);return o&&i.addEventListener("error",l,!1),i.src=TRC.shiftDomain(protocol+"//"+a+"/libtrc/"+e),i},detectBots(),config.global["enable-shift-cdn-domains"]&&(findScriptBaseDomain(doc.getElementsByTagName("script")),setLoaderDomains()),config.global["enable-visit-value"]&&config.global["load-vv-early"]&&loadVV(),config.global["p13n-tag-enabled"]&&config.global["p13n-client-id"]&&config.global["p13n-site-id"]&&loadPersonalizationTag(config.global["p13n-client-id"],config.global["p13n-site-id"]),TRC.Performance&&(activatePerf(config.global["enable-analytics"],config.global["config-analytics"],getParameter("taboola-force-perf",win.location)),TRC.performance&&TRC.performance.mark("2.0"));var smartEllipsisUrlParam=getParameter("taboola-smart-ellipsis",win.location);smartEllipsisUrlParam&&(config.global["smart-ellipsis"]="yes"===smartEllipsisUrlParam);var ellipsisPerfUrlParam=getParameter("taboola-ellipsis-perf",win.location);ellipsisPerfUrlParam&&(TRC.ellipsisPerf="yes"===ellipsisPerfUrlParam),TRC.hasTrk&&void 0===TRC.trkRequestStatus?win.setTimeout(doInitialization,waitForTrkTimeout):(setResourceHints(),doInitialization())}function setConfig(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}function loadPersonalizationTag(e,t){var n;loadAssetFile(protocol+"//cdn.taboola.com/b/"+e+"/"+t+"/l/cs_all.js",{id:"p13nTag",forceInHead:!0,async:!0})}function getThrottledPubValue(e,t){var n,o=100;for(var a in e){if("*"===a){o=e[a];break}n=new RegExp(a),t.match(n)&&(o=e[a])}return o}function isThrottled(){return null!==throttleMap&&(pubThrottleValue=getThrottledPubValue(throttleMap,TRC.publisherId),throttleRnadom>pubThrottleValue)&&(disableQueue(),TRC.pConsole("page","info","queue disabled!!! "),!0)}function doNotifications(){}function doNotificationsFirst(){for(;msg=notificationsFirst.shift();)switch(msg.notify){case"newPageLoad":TRC.reset()}}function findScriptBaseDomain(e){for(var t,n=/^(.*\/libtrc\/.+\/)loader\.js(?:\?(.*))?$/,o=0;o<e.length;o++)(t=e[o].src.match(n))&&(TRC.baseDomain=t[1],TRC.pConsole("page","info","base domain set to : "+TRC.baseDomain))}function realDoNotifications(){for(var e;e=notifications.shift();)switch(e.notify){case"videoPlay":TRC.RBoxUsage.logUsage("realDoNotifications",{position:"videoPlay"}),this.preloadRequestLoader?function(e){TRC.aspect.after(trc,"handleLoadResponse",function(){trc.playVideo(e)},!0)}(e):trc.playVideo(e);break;case"videoDone":TRC.RBoxUsage.logUsage("realDoNotifications",{position:"videoDone"});try{TRC.dispatch("videoDone",e)}catch(e){trc.error("Problem in videoDone",e)}}}function lsplit(e,t,n){var o=e.split(t);return o.slice(0,n-1).concat(o.length>=n?o.slice(n-1).join(t):[])}function getHostName(e){for(var t=[{key:"?",index:0},{key:"://",index:1},{key:"//",index:1},{key:"/",index:0},{key:":",index:0}],n=0,o=t.length,a=e,r;n<o;n++)a=(r=lsplit(a,t[n].key,2)).length>1?r[t[n].index]:r[0];return a}function sendLoadRBox(){requestDispatchTimeout=null,trc.loadRBox.apply(trc,requests),requests=[],(doNotifications=realDoNotifications)()}function detectBots(){var e;config.global["enable-detect-bots"]&&(e=new RegExp(config.global["detect-bots-regex"]||"bot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex","i"),TRC.botDetected=e.test(navigator.userAgent))}function doRequests(){}function realDoRequests(){return requests.length?flush?(flush=!1,void sendLoadRBox()):(null!=requestDispatchTimeout&&TRC.Timeout.clear(requestDispatchTimeout),void(requestDispatchTimeout=TRC.Timeout.set(sendLoadRBox,trc.trcRequestDelay))):flush=!1}function registerAPIEvents(){var e;for(apiListeners.push=function(e){TRC.EventsAPI.listen(e.listenTo,e.handler)};apiListeners.length;)e=apiListeners.shift(),TRC.EventsAPI.listen(e.listenTo,e.handler)}function doSocials(){}function realDoSocials(){TRC.eventDelegator.subscribe("user_id_ready",handleSocials)}function handleSocials(){try{sendSocials.call(null,socials)}catch(e){TRC.pConsole("errors","error","error in handleSocials",e.message)}}function sendSocials(e){for(var t;t=e.shift();)trc.sendEvent("social",{st:t.name,"unescape-d":encodeURIComponent(__trcJSONify({data:t.val}))},null,!1,null,null)}function doP13n(){}function realDoP13n(){TRC.eventDelegator.subscribe("user_id_ready",handleP13n)}function handleP13n(){try{sendP13nEvents.call(null,p13ns)}catch(e){TRC.pConsole("errors","error","error in handleP13n",e.message)}}function sendP13nEvents(e){for(var t;t=e.shift();)trc.sendEvent("p13n",{"unescape-d":encodeURIComponent(__trcJSONify(t.val))},null,!1,null,null)}function doABTests(){}function realDoABTests(){TRC.eventDelegator.subscribe("user_id_ready",handleABTests)}function handleABTests(){try{sendImplEvents.call(null,abtests)}catch(e){TRC.pConsole("errors","error","error in handleABTests",e.message)}}function sendImplEvents(e){for(var t;t=e.shift();)trc.sendEvent("abtests",{"unescape-d":encodeURIComponent(__trcJSONify(t.val))},null,!1,null,null)}function checkModeVisibilityConstraints(e,t){var n=!0,o,a;try{e.modes[t]&&(a=e.modes[t]["visibility-constraints"])&&"object"==typeof a&&!0!==TRC["ignoreVisibilityConstraints"]&&(o=window.innerWidth||document.body.clientWidth,(a.minWidth&&o<a.minWidth||a.maxWidth&&o>a.maxWidth)&&(n=!1,TRC.pConsole("page","info","Mode '"+t+"' will not be displayed due to visibility constraints",a,"object")))}catch(e){TRC.pConsole("page","error","Error while evaluating visibility constraints of mode '"+t+"': "+e.message)}return n}function setLoaderDomains(){loaderHostName=config.global["use-loader-host"]||config.global["enable-shift-cdn-domains"]?getHostName(TRC.baseDomain):null,loaderDomain=loaderHostName?lsplit(loaderHostName,".",2).pop():null}function chainEventCallbacks(e){if(e)return Array.isArray(e)?function(t){e.forEach(function(e){e(t)})}:"function"==typeof e?e:void 0}function vvReady(){TRC.adManager=new TRC.AdServerManager(config.global["vv-config"],TRC.version),TRC.adManager.startVV().then(function(){TRC.adManager.run()})}function disableQueue(){queue=[]}function loadImplementation(e){TRC.implInlined?TRC.trcReady&&TRC.trcReady():TRC.implLoaded?TRC.trcReady():implElm||(implElm=TRC.loadTaboolaScript(e),TRC.performance&&TRC.performance.mark("3.0"),TRC.utm.push((new Date).getTime()-TRC.utm.start),TRC.pConsole("page","debug","loading impl file : '"+e+"'"))}function loadVV(){TRC.AdServerManager||(TRC.VVReady=vvReady,config.global["load-vv-early"]?loadAssetFile(protocol+"//cdn.taboola.com/libtrc/vv."+TRC.version+".js",{async:!0}):TRC.loadTaboolaScript("vv."+TRC.version+".js"))}function loadAssetFile(e,t){if(!TRC.botDetected){var n=doc.getElementsByTagName("script"),o=doc.getElementsByTagName("head"),a=doc.createElement("script");t&&t.async?a.setAttribute("async",""):a.setAttribute("defer",""),t&&t.crossorigin&&a.setAttribute("crossorigin",t.crossorigin),t&&t.id&&(a.id=t.id),a.src=TRC.shiftDomain(e),t&&t.forceInHead&&"head"!==n[0].parentNode.nodeName.toLocaleLowerCase()?o[0].appendChild(a):n[0].parentNode.insertBefore(a,n[0]),TRC.pConsole("page","debug","loading : "+a.src)}}function doGlobals(){if(globalMessages.length){for(var e,t,n,o=TRC.hasES6Support()?".js":".es5.js";e=globalMessages.shift();)for(var a in e)"onclick"==a?queue.onclick=e[a]:globalParams[a]=e[a];loadImplementation(n=TRC.implCustomFile?TRC.implCustomFile+o:(t=getParameterOfWhitelist("taboola_impl_file",["impl","impl.thin"]))?t+"."+TRC.version+o:'impl.'+TRC.version+o)}}function doConsents(){for(;msg=consents.shift();)TRC.consent.setConsent?TRC.consent.setConsent(msg):globalMessages.push({consentMessage:msg})}function executeMessages(){doConsents(),doNotificationsFirst(),doGlobals(),doRequests(),doNotifications(),doSocials(),doP13n(),doABTests()}function registerToAMP_API(){var e=window.AMP_MODE&&window.AMP_MODE.version?window.AMP_MODE.version:"1";TRC.isAMP=!0,window._taboola.push({additional_data:{sdkd:{os:"AMP",osv:e,sdkt:"Taboola AMP Driver",sdkv:"1"}}}),window._taboola.push({listenTo:"nocontent",handler:function(e){var t=document.querySelector(".trc_rbox_container .trc_rbox_div");t&&t.offsetHeight>10||e.detail.isFeedCard||window.context.noContentAvailable()}}),window.context.observeIntersection(function(e){e.forEach(function(e){window._taboola.push({intersection:!0,rects:e,placement:window.context.data.placement}),TRC.lastVisibleRects?e.time>TRC.lastVisibleRects.time&&(TRC.lastVisibleRects=e):TRC.lastVisibleRects=e})})}function dispatchMessage(e){var t,n;"object"!=typeof e.overrideConfig?extractThrottling(e)||(extractSubscription(e),updateAmpMessageURL(e),e.mode?(TRC.pConsole("page","info","push to '_taboola' - mode : "+e.mode,e,"object"),e.framework&&(globalMessages.push({framework:e.framework}),"amp"===e.framework&&registerToAMP_API()),checkModeVisibilityConstraints(config,e.mode)&&requests.push(e)):e.listenTo?e.handler&&"function"==typeof e.handler?apiListeners.push(e):TRC.pConsole("page","warn","events API listening to event without a handler."):e.notify?"newPageLoad"==e.notify?(TRC.pConsole("page","info","push to '_taboola' - notification : newPageLoad"),resetAllMessages(),notificationsFirst.push(e)):notifications.push(e):e.name&&-1!==e.name.indexOf("p13n-")?p13ns.push(e):e.name&&-1!==e.name.indexOf("abtests")?abtests.push(e):(t=getSocialEvent(e))?socials.push({name:t,val:e[t]}):e.nextDaisyChain?dispatchDaisyChainMsg(e.nextDaisyChain):e.consentData||e.consentPreset||e.gdprApplies?consents.push(e):(e.intersection||e.visible)&&e.placement?manualVisibles.push({event:"visible::"+e.placement,rects:e.rects}):(n=getParameter("taboolax-load",win.location),(config.global["inject-taboolax"]||n)&&!isTBXInit&&setTBXPageType(e)&&(taboolaXHost=n?taboolaXHosts[n]:taboolaXHost,isTBXInit=!0,injectTaboolaX(taboolaXHost)),e.template&&void 0===TRC.pageTemplate&&(TRC.pageTemplate=e.template),globalMessages.push(e)),e.flush&&(flush=!0)):mergeObject(config,e.overrideConfig,0)}function doVisibles(e){TRC.dispatch(e.event,e.rects)}function setPush(e,t){var n;for(e.push=t;n=e.shift();)t(n)}function dispatchDaisyChainMsg(e){var t="";"string"==typeof e?trc.preloadRequest&&trc.preloadRequest[e]?(TRC.pConsole("page","info","push to '_taboola' - nextDaisyChain : "+e),trc.preloadRequest[e].dc.renderAd()):t=e:t="non recognized value",t&&(window.__trcError?__trcError("unrecognized nextDaisyChain : "+t):TRC.pConsole("page","error","unrecognized nextDaisyChain : "+e))}function getSocialEvent(e){try{for(var t in e)if(0==t.indexOf("social-")&&e.hasOwnProperty(t))return t}catch(e){}return null}function extractThrottling(e){return!!e.throttle_pub&&("object"==typeof e.throttle_pub&&(throttleMap=e.throttle_pub),!0)}function extractSubscription(e){var t;try{if(!e.onrender)return;TRC.eventDelegator?t=TRC.eventDelegator.subscribe:(TRC.subscriptionRegister=[],t=function(e,t,n,o){TRC.subscriptionRegister.push({event:e,handler:t,container:o})}),t("onrender",e.onrender,e.container?getContainerId(e.container):null)}catch(e){__trcError&&__trcError("extractSubscription",e)}}function updateAmpMessageURL(e){var t=TRC.isAMP&&e.hasOwnProperty("url")&&!!window.context;if(!config.global["disable-amp-url-override"]&&t){var n=e.url;e.url=window.context.canonicalUrl+window.context.location.search,updateAmpMessageURL_ReportPixel(n)}}function updateAmpMessageURL_ReportPixel(e){var t=config.global["amp-url-override-pixel-percent"];if(void 0===t&&(t=1),!(100*Math.random()>t)&&e!==context.canonicalUrl){var n=document.createElement("a");n.href=e;var o=n.host,a;if(n.href=context.canonicalUrl,o!==n.host){var r={oUrl:e,cUrl:context.canonicalUrl};(new Image).src="https://cdn.taboola.com/libtrc/amp?data="+encodeURIComponent(JSON.stringify(r))}}}function getParameter(e,t){var n,o,a=t.search.substr(1).split(/&/);for(o=0;o<a.length;o++)if((n=a[o].split(new RegExp("="),2))[0]==e)return n[1];return null}function getParameterOfWhitelist(e,t){for(var n=getParameter(e,win.location),o=0;o<t.length;o++)if(t[o]===n)return n;return null}function getContainerId(e){return"string"==typeof e?e:msg.container.id||"trc_cont_ "+parseInt(1e4*Math.random())}function setTBXPageType(e){var t;for(t in e)if(PAGE_TYPES.hasOwnProperty(t))return win[TBX_PAGE_TYPE_VAR]=PAGE_TYPES[t],PAGE_TYPES[t];return null}function resetAllMessages(){requests=[],globalMessages=[],notifications=[],notificationsFirst=[],socials=[]}function pushMessage(e){if(e){e.placement&&(TRC.performance&&TRC.performance.mark("tbl_push_start",null,e.placement.replace(/ /g,"_"),0,"tblPush",TRC.PerfEvenType.START),TRC.performance&&TRC.performance.mark("tbl_push_stop",null,e.placement.replace(/ /g,"_"),0,"tblPush",TRC.PerfEvenType.STOP)),TRC._taboolaClone.length>50&&(TRC._taboolaClone=[]),TRC._taboolaClone.push(e);for(var t=0;t<arguments.length;t++)if(e=arguments[t],TRC.pConsole("page","debug","push to '_taboola'",e,"object"),e instanceof Array)for(var n=0;n<e.length;n++)dispatchMessage(e[n]);else dispatchMessage(e);return executeMessages(),arguments.length}}function injectComScore(){var e;config.global["inject-comscore"]&&(win._comscore=win._comscore||[],loadAssetFile(("https:"==protocol?"https://sb":"http://b")+".scorecardresearch.com/beacon.js",{async:!0}),e={c1:"7",c2:"13739933",c3:"20121515121"},win._comscore.push(e),TRC.pConsole("page","info","injected comsocre",e,"object"))}function injectRTUS(){var e="getRTUS";try{config.global["enable-criteo-uid"]&&isSafari()&&(setRTUSCallback(e),loadAssetFile("//gum.criteo.com/sync?c=72&r=2&j=TRC."+e,{async:!0}),TRC.performance&&TRC.performance.mark("criteo_start",null,"CriteoSync",0,"CriteoSync",TRC.PerfEvenType.START),TRC.pConsole("page","info","injected RTUS service"))}catch(e){}}function setRTUSCallback(e){var t=++rtbIndex;TRC.rtbUserIds=TRC.rtbUserIds||{},TRC.rtbUserIds["_"+t]={source:"cr"},TRC[e]=function(e){try{TRC.performance&&TRC.performance.mark("criteo_stop",null,"CriteoSync",0,"CriteoSync",TRC.PerfEvenType.STOP),e&&e.userid&&TRC.rtbUserIds["_"+t]&&(TRC.rtbUserIds["_"+t].ui=e.userid)}catch(e){}},setTimeout(function(){try{TRC&&TRC.rtbUserIds&&(delete TRC.rtbUserIds["_"+t],TRC[e]=function(){})}catch(e){}},36e5)}function isSafari(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)}function injectmdotlabs(){config.global["inject-mdotlabs"]&&(loadAssetFile("//tags.mdotlabs.com/tracking.php?siteID=tBjQ&customUserValue="+TRC.publisherId,{async:!0}),TRC.pConsole("page","info","injected mdotlabs publisher id:"+TRC.publisherId))}function injectVideoItemPreview(){config.global["enable-video-item-preview"]&&loadAssetFile("//player.h-cdn.com/loader.js?customer=taboola",{async:!0,crossorigin:"anonymous"})}function setGloablFlags(){TRC.useStorageDetection=!(!config.global||!0!==config.global["use-storage-detection"])}function injectTaboolaX(e){loadAssetFile(e+"/"+TRC.publisherId+"/load.js",{async:!0}),TRC.pConsole("page","info","injected taboola-x with publisher id : "+TRC.publisherId)}function activatePerf(e,t,n){TRC.perfConfOverride&&(t=TRC.perfConfOverride),(n||e&&t&&t.traffic)&&(n||t.traffic>100*Math.random())&&(TRC.performance=new TRC.Performance(t))}function preconnectTo(e){var t=document.createElement("link");t.rel="preconnect",t.href=e,document.head&&document.head.appendChild(t)}function setResourceHints(){if(config.global["enable-resource-hints"])for(var e=0;e<PRECONNECT_DOMAINS.length;e++)preconnectTo(TRC.PROTOCOL+"//"+PRECONNECT_DOMAINS[e])}function getConsentData(){var e=0,t=1,n=2,o=3;if(TRC.consentData={},"function"==typeof __cmp){TRC.consentData.cmpStatus=t;try{__cmp("getConsentData",null,function(t){TRC.consentData.cmpStatus=e,TRC.consentData.gdprApplies=t.gdprApplies,TRC.consentData.consentDaisyBit=t.consentData})}catch(e){TRC.consentData.cmpStatus=n,TRC.pConsole("page","error","getConsentData: Error calling __cmp api for user consent",e.message)}}else TRC.consentData.cmpStatus=o}function mergeObject(e,t,n){if(!(n>10))for(var o in t)t.hasOwnProperty(o)&&("object"==typeof t[o]?(void 0===e[o]&&(e[o]={}),"object"==typeof e[o]&&mergeObject(e[o],t[o],++n)):e[o]=t[o])}function doInitialization(){if(setGloablFlags(),config.global["enable-shift-cdn-domains"]||(findScriptBaseDomain(doc.getElementsByTagName("script")),setLoaderDomains()),!(queue=win[queueName]=win[queueName]||[]).registered){for(queue.push=pushMessage,queue.registered=!0;queue.length;)pushMessage(queue.shift());config.global["enable-visit-value"]&&!config.global["load-vv-early"]&&loadVV(),injectComScore(),injectmdotlabs(),injectRTUS(),injectVideoItemPreview(),config.global["enable-consent"]||getConsentData()}}}(window,document);