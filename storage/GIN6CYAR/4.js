(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1861:function(e,t,n){"use strict";n.d(t,"a",(function(){return B}));var r,i,o,s,a,l,c,p,u,d,m,h=n(3),f=n(1609),g=n(0),b=n(1932),v=n(1889),w=n(1918),y=n(1912),x=n(1911),_=n(2),P=n.n(_),O=n(8),E=n(572),j=P.a.div.withConfig({displayName:"FileUploader2_ProgressWithControlsView",componentId:"sc-1ueb785"})(r||(r=Object(h.__makeTemplateObject)(["\n  display: flex;\n  align-items: center;\n"],["\n  display: flex;\n  align-items: center;\n"]))),R=P.a.div.withConfig({displayName:"FileUploader2_UploadControlsView",componentId:"sc-3fqvna"})(i||(i=Object(h.__makeTemplateObject)(["\n  flex: 0 0 auto;\n  margin-left: 10px;\n"],["\n  flex: 0 0 auto;\n  margin-left: 10px;\n"]))),U=P.a.span.withConfig({displayName:"FileUploader2_UploadFileName",componentId:"sc-le4q2s"})(o||(o=Object(h.__makeTemplateObject)(["\n  font-weight: bold;\n  margin-left: 5px;\n  margin-right: 5px;\n  white-space: nowrap;\n"],["\n  font-weight: bold;\n  margin-left: 5px;\n  margin-right: 5px;\n  white-space: nowrap;\n"]))),z=P.a.div.withConfig({displayName:"FileUploader2_ProgressDescription",componentId:"sc-nqponv"})(s||(s=Object(h.__makeTemplateObject)(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n"],["\n  overflow: hidden;\n  text-overflow: ellipsis;\n"]))),C=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={progress:t.props.promise.progress},t.oldPromiseOnProgress=t.props.promise.onProgress,t.promiseOnProgress=function(e){t.setState({progress:e}),t.oldPromiseOnProgress&&t.oldPromiseOnProgress(e)},t.onPause=function(){var e=t.props.promise.pause();t.setState({uploadResumer:e})},t.onResume=function(){t.state.uploadResumer(),t.setState({uploadResumer:null})},t}return Object(h.__extends)(t,e),t.prototype.componentDidMount=function(){this.props.promise.onProgress=this.promiseOnProgress},t.prototype.componentWillUnmount=function(){this.props.promise.onProgress=this.oldPromiseOnProgress},t.prototype.render=function(){var e=this.state.progress,t=e.hasStarted&&!e.isDone?w.d(e.progressProps):null;return e.hasSucceeded&&e.uploadedBlobInfo?g.createElement("div",null,g.createElement("span",{className:"fa fa-check"}),g.createElement(E.b,{tip:"MD5: "+e.uploadedBlobInfo.md5Hash},g.createElement(U,null,this.props.file.name)),g.createElement("span",null,"(",g.createElement(x.a,{value:this.props.file.size}),")")):g.createElement("div",null,g.createElement(z,null,g.createElement("span",null,e.description,":")," ",g.createElement(U,null,this.props.file.name),e.nextRetryDate&&g.createElement("span",null,"Will retry in ",g.createElement(y.a,{time:e.nextRetryDate}))),g.createElement(j,null,e.hasStarted&&g.createElement(v.a,Object(h.__assign)({},e.progressProps),g.createElement(v.b,Object(h.__assign)({},e.progressProps)),g.createElement(v.c,null,g.createElement(x.a,{value:e.totalBytesLoaded})," of"," ",g.createElement(x.a,{value:this.props.file.size}),t?", "+t:"")),g.createElement(R,null,e.isDone?g.createElement("span",{className:"fa fa-check"}):this.state.uploadResumer?g.createElement("span",{className:"fa fa-play",onClick:this.onResume}):e.isUploading?g.createElement("span",{className:"fa fa-pause",onClick:this.onPause}):g.createElement("i",{className:"fa fa-circle-o-notch","aria-hidden":"true"}))))},t}(g.Component),k=P.a.div.withConfig({displayName:"FileUploader2_FileDropContentsView",componentId:"sc-1qa377g"})(a||(a=Object(h.__makeTemplateObject)(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"],["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]))),F=P.a.div.withConfig({displayName:"FileUploader2_FileUploader2View",componentId:"sc-6xpn5n"})(l||(l=Object(h.__makeTemplateObject)(["\n  width: 100%;\n  box-sizing: border-box;\n  font-weight: ",";\n  margin: 24px;\n\n  > .dropzone {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    /* HACK(cochamberlain): Dropzone is hard setting these as inline styles */\n    width: calc(100% - 48px) !important;\n    min-height: 140px;\n    border: dashed 2px #dedfe0 !important;\n    color: #6f7175;\n    cursor: pointer;\n    &:hover {\n      color: ",";\n    }\n  }\n"],["\n  width: 100%;\n  box-sizing: border-box;\n  font-weight: ",";\n  margin: 24px;\n\n  > .dropzone {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    /* HACK(cochamberlain): Dropzone is hard setting these as inline styles */\n    width: calc(100% - 48px) !important;\n    min-height: 140px;\n    border: dashed 2px #dedfe0 !important;\n    color: #6f7175;\n    cursor: pointer;\n    &:hover {\n      color: ",";\n    }\n  }\n"])),O.d.FontWeightMedium,O.b.TextLinkHover),S=P.a.div.withConfig({displayName:"FileUploader2_CompactFileUploader2View",componentId:"sc-13dptl5"})(c||(c=Object(h.__makeTemplateObject)(["\n  box-sizing: border-box;\n  cursor: pointer;\n  font-weight: ",";\n\n  > .dropzone {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    /* HACK(cochamberlain): Dropzone is hard setting these as inline styles */\n    width: 16px !important;\n    cursor: pointer;\n    &:hover {\n      color: ",";\n    }\n  }\n"],["\n  box-sizing: border-box;\n  cursor: pointer;\n  font-weight: ",";\n\n  > .dropzone {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-sizing: border-box;\n    /* HACK(cochamberlain): Dropzone is hard setting these as inline styles */\n    width: 16px !important;\n    cursor: pointer;\n    &:hover {\n      color: ",";\n    }\n  }\n"])),O.d.FontWeightMedium,O.b.TextLinkHover),D=P.a.ul.withConfig({displayName:"FileUploader2_FileUploadStatusList",componentId:"sc-qtfa04"})(p||(p=Object(h.__makeTemplateObject)(["\n  width: calc(100% - 48px);\n  margin-top: 20px;\n"],["\n  width: calc(100% - 48px);\n  margin-top: 20px;\n"]))),T=P.a.li.withConfig({displayName:"FileUploader2_FileUploadStatusListItem",componentId:"sc-j98n1o"})(u||(u=Object(h.__makeTemplateObject)(["\n  margin-bottom: 10px;\n"],["\n  margin-bottom: 10px;\n"]))),N=P.a.p.withConfig({displayName:"FileUploader2_FileDropMaxSizeNote",componentId:"sc-1fi12de"})(d||(d=Object(h.__makeTemplateObject)(["\n  text-align: center;\n"],["\n  text-align: center;\n"]))),I=P.a.p.withConfig({displayName:"FileUploader2_FileDropMaxSizeErrorMessage",componentId:"sc-1u36kop"})(m||(m=Object(h.__makeTemplateObject)(["\n  color: ",";\n  text-align: center;\n"],["\n  color: ",";\n  text-align: center;\n"])),O.b.KaggleRed),B=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={uploads:[]},t.dropFiles=function(e,n){return Object(h.__awaiter)(t,void 0,void 0,(function(){var t,n,r,i,o,s,a,l,c,p,u,d;return Object(h.__generator)(this,(function(m){switch(m.label){case 0:if(t=this.props,n=t.bucket,r=t.onBlobUploaded,i=Object(h.__spread)(this.state.uploads),0==e.length)return[2];o=[];try{for(s=Object(h.__values)(e),a=s.next();!a.done;a=s.next())l=a.value,c=(this.props.uploadFile||b.a)(n,l),o.push(r?c.then((function(e){return r(e.token,e.name,e.size,e.mediaLink)})):c),p={file:l,promise:c},i.push(p)}catch(e){u={error:e}}finally{try{a&&!a.done&&(d=s.return)&&d.call(s)}finally{if(u)throw u.error}}return this.setState({uploads:i}),[4,Promise.all(o)];case 1:return m.sent(),this.props.onUploadsFinished&&this.props.onUploadsFinished(),[2]}}))}))},t.handleDragLeave=function(){return t.setState({isDraggingOverFileDrop:!1})},t.handleDragEnter=function(){return t.setState({isDraggingOverFileDrop:!0})},t}return Object(h.__extends)(t,e),t.prototype.render=function(){var e=this,t=this.props,n=t.title,r=t.children,i=t.compact,o=this.state.uploads,s=i?S:F;return g.createElement(s,null,n&&g.createElement("h3",null,n),g.createElement(f.a,{onDrop:this.dropFiles,maxSize:this.props.maxSize,multiple:!this.props.singleUpload,onDragLeave:this.handleDragLeave,onDragEnter:this.handleDragEnter},(function(t){var n=t.getRootProps,o=t.getInputProps,s=t.rejectedFiles;return g.createElement("div",Object(h.__assign)({},n({className:"dropzone"})),g.createElement("input",Object(h.__assign)({},o())),g.createElement(k,{title:"Upload Files"},g.createElement("div",{className:"fa fa-upload"+(i?"":" file-uploader__upload-icon")}),!i&&r?g.createElement("div",null,r||e.props.uploadFilesMessage&&e.props.uploadFilesMessage||"Upload Files"):null,e.props.maxSize&&g.createElement(N,null,"Size limit: ",g.createElement(x.a,{value:e.props.maxSize})),e.props.maxSize&&s.length>0&&s[0].size>e.props.maxSize&&g.createElement(I,null,"One or more files have exceeded the size limit.")))})),!i&&o&&o.length>0&&g.createElement(D,null,o.map((function(e,t){return g.createElement(T,{key:t},g.createElement(C,Object(h.__assign)({},e)))}))))},t}(g.Component)},1912:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return s}));var r=n(3),i=n(56),o=n(573),s=function(t){function n(e){var n=t.call(this,e)||this;return n.state={msRemaining:n.getMsRemaining()},n.timer=window.setInterval((function(){var e=n.getMsRemaining();e<=0&&(window.clearInterval(n.timer),n.props.onBlastoff&&n.props.onBlastoff()),n.setState({msRemaining:e})}),1e3),n}return Object(r.__extends)(n,t),n.prototype.getMsRemaining=function(){return new Date(this.props.time).getTime()-(new Date).getTime()},n.prototype.showSeconds=function(e){return!this.props.hideSeconds||e<6e5},n.prototype.render=function(){var t=i.duration(this.state.msRemaining),n=t.hours()||t.minutes(),r=this.showSeconds(this.state.msRemaining),s=t.days()?o("days",t.days(),!0)+", ":"",a=t.hours()?o("hours",t.hours(),!0)+", ":"",l=n?""+o("minutes",t.minutes(),!0):"",c=r&&n?" and ":"",p=r?""+o("seconds",t.seconds(),!0):"";return e.createElement("span",null,""+s+a+l+c+p)},n}(e.Component)}).call(this,n(0))},1932:function(e,t,n){"use strict";(function(e,r){n.d(t,"a",(function(){return d}));var i=n(3),o=function(){function e(e){this.description="Not started",e&&Object.assign(this,e)}return Object.defineProperty(e.prototype,"hasStarted",{get:function(){return!!this.uploadProgressEvent},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"totalBytesLoaded",{get:function(){return(this.uploadProgressEvent&&this.uploadProgressEvent.loaded||0)+this.previousBytesReceived},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isDone",{get:function(){return this.hasSucceeded||this.hasFailed},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"progressProps",{get:function(){return{initiatedTimeStamp:this.initialProgressEventTimeStamp,initialOffsetAmount:this.previousBytesReceived,progressEvent:this.uploadProgressEvent}},enumerable:!0,configurable:!0}),e}(),s=function(){function e(){this.cancellationCallbacks=[]}return e.prototype.register=function(e){var t=this;return this.isCancellationRequested&&e(),this.cancellationCallbacks.push(e),function(){t.cancellationCallbacks=t.cancellationCallbacks.filter((function(t){return t!=e}))}},Object.defineProperty(e.prototype,"isCancellationRequested",{get:function(){return this._isCancellationRequested},enumerable:!0,configurable:!0}),e.prototype.cancel=function(){var e,t;if(!this.isCancellationRequested){this._isCancellationRequested=!0;try{for(var n=Object(i.__values)(this.cancellationCallbacks),r=n.next();!r.done;r=n.next()){var o=r.value;o&&o()}}catch(t){e={error:t}}finally{try{r&&!r.done&&(t=n.return)&&t.call(n)}finally{if(e)throw e.error}}}},e}(),a=function(){function e(){this.reset()}return e.prototype.set=function(){this.internalResolve&&this.internalResolve()},e.prototype.wait=function(){return this.internalPromise},e.prototype.reset=function(){var e=this;this.internalPromise=new Promise((function(t){e.internalResolve=t}))},e}(),l=function(){function e(){this.currentCancellationToken=new s}return e.prototype.pause=function(){this.isPaused||(this.isPaused=!0,this.resumeEvent=new a,this.currentCancellationToken.cancel())},e.prototype.waitUntilResumed=function(){return Object(i.__awaiter)(this,void 0,void 0,(function(){return Object(i.__generator)(this,(function(e){switch(e.label){case 0:return this.isPaused?[4,this.resumeEvent.wait()]:[2];case 1:return e.sent(),[2]}}))}))},e.prototype.resume=function(){this.isPaused&&(this.isPaused=!1,this.currentCancellationToken=new s,this.resumeEvent.set(),this.resumeEvent=null)},e}(),c=function(e){return Object(i.__awaiter)(void 0,void 0,void 0,(function(){return Object(i.__generator)(this,(function(t){return[2,new Promise((function(t){return setTimeout(t,e)}))]}))}))};function p(t,n,r,s,a,l){return(s?function(t,n,r){return Object(i.__awaiter)(this,void 0,Promise,(function(){var s,a,l,c,p,u;return Object(i.__generator)(this,(function(i){switch(i.label){case 0:return r(new o({description:"Checking server for existing upload"})),[4,e(t,{method:"PUT",headers:{"Content-Range":"bytes */"+n.size}})];case 1:return(s=i.sent()).status>=200&&s.status<300?(a={bytesReceived:n.size},[4,s.json()]):[3,3];case 2:return[2,(a.completeBlob=i.sent(),a)];case 3:if(l=s.headers.get("Range")){if(!(c=l.match(/bytes\s*=\s*([0-9]+)-([0-9]+)/)))throw new Error("Unable to parse Range header: "+l);if(0!==(p=parseInt(c[1])))throw new Error("Unexpect Range start offset: "+p);if((u=parseInt(c[2]))>=n.size)throw new Error("Range end is larger than expected: "+u);return[2,{bytesReceived:u+1}]}return[2,{bytesReceived:0}]}}))}))}(t,n,a):Promise.resolve({bytesReceived:0})).then((function(e){return new Promise((function(i,s){if(e.bytesReceived===n.size&&n.size>0)i(e.completeBlob);else{var c=new o({previousBytesReceived:e.bytesReceived?e.bytesReceived:0}),p=new XMLHttpRequest;p.open("PUT",t),p.upload.onprogress=function(e){c.description="Uploading file",c.isUploading=!0,c.isPaused=!1,c.initialProgressEventTimeStamp||(c.initialProgressEventTimeStamp=e.timeStamp),c.uploadProgressEvent=e,a(c)},p.onerror=function(e){c.isUploading=!1,l&&l.isCancellationRequested||s(p.statusText)},p.onload=function(e){if(c.isUploading=!1,p.status>=200&&p.status<300){c.isUploading=!1,c.isPaused=!1,a(c);var t=JSON.parse(p.responseText);i(t)}else c.description="Upload was interrupted",a(c),s(p.statusText)},l&&l.register((function(){p.abort(),c.description="Upload was paused",c.isUploading=!1,c.isPaused=!1,a(c),s("Upload was cancelled")})),e.bytesReceived>0?(p.setRequestHeader("Content-Range","bytes "+e.bytesReceived+"-"+(n.size-1)+"/"+n.size),p.send(n.slice(e.bytesReceived,n.size,r))):p.send(n)}}))}))}var u=r.BlobFiles.createNewBlob;function d(e,t,n){return function(e,t,n,r,s,a){var d,m=this,h=new l,f={progress:new o,onProgress:a},g=(d=function(e){f.progress=e,f.onProgress&&f.onProgress(e)},Object(i.__awaiter)(m,void 0,Promise,(function(){var a,l,f,g,b,v,w,y,x,_,P;return Object(i.__generator)(this,(function(O){switch(O.label){case 0:return d(new o({description:"Initializing upload"})),[4,Object(i.__awaiter)(m,void 0,Promise,(function(){var o;return Object(i.__generator)(this,(function(i){switch(i.label){case 0:return o={name:n,contentLength:t.size,contentType:r,lastModifiedDate:s},[4,u({blobBucket:e},o)];case 1:return[2,i.sent()]}}))}))];case 1:a=O.sent(),l=5e3,f=2,g=0,O.label=2;case 2:if(!(g<l))return[3,11];O.label=3;case 3:return O.trys.push([3,5,,10]),b=0!==g,[4,p(a.createUrl,t,r,b,d,h.currentCancellationToken)];case 4:if(v=O.sent(),w=null,v.md5Hash)for(w="",y=atob(v.md5Hash),x=0;x<y.length;x++)w+=y.charCodeAt(x).toString(16);return _={token:a.token,md5Hash:w,name:n,size:t.size,mediaLink:v.mediaLink},d(new o({description:"Upload complete",uploadedBlobInfo:_,hasSucceeded:!0})),[2,_];case 5:return O.sent(),h.isPaused?[4,h.waitUntilResumed()]:[3,7];case 6:return O.sent(),[3,10];case 7:return g>1?(d(new o({description:"Error while uploading",isPaused:!0,nextRetryDate:new Date(Date.now()+1e3*f),totalRetries:g})),[4,c(1e3*f)]):[3,9];case 8:O.sent(),f=Math.min(2*f,30),O.label=9;case 9:return[3,10];case 10:return g++,[3,2];case 11:throw d(new o({description:P="Upload failed, even after "+l+" attempts",isUploading:!1})),new Error(P)}}))})));return Object.defineProperties(g,{pause:{value:function(){return h.pause(),function(){return h.resume(),g}},configurable:!1,writable:!1,enumerable:!0},progress:{get:function(){return f.progress},configurable:!1,enumerable:!0},onProgress:{get:function(){return f.onProgress},set:function(e){return f.onProgress=e},configurable:!1,enumerable:!0}})}(e,t,t.name,t.type,new Date(t.lastModified),n)}}).call(this,n(103),n(274))}}]);