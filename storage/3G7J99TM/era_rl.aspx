var ERA_RC=window.ERA_RC||{scriptId:'vsw_ad',ads:{index:0,ids:''}};ERA_RC.resource=function()
{return{init:function(){var getParam=ERA_RC.resource.getParam;ERA_RC.p=ERA_RC.p||[];ERA_RC.w=ERA_RC.w||{addClass:function(el,cls){var s=new RegExp("\\b"+cls+"\\b");if(!s.test(el.className))
el.className=(el.className+" "+cls).replace(/^[ ]+|[ ]+$/g,'');return el;},removeClass:function(el,cls){if(el.className.length>0){var s=new RegExp("\\b"+cls+"\\b","g");el.className=el.className.replace(s,"").replace(/\s\s+/g,' ');}
return el;},addEvent:function(o,e,f){try{if(o.addEventListener){o.addEventListener(e,f,false);return true;}else if(o.attachEvent)
return o.attachEvent('on'+e,f);}
catch(ex){};return false;},removeEvent:function(o,e,f){try{if(o.removeEventListener)
o.removeEventListener(e,f,false);else if(o.detachEvent)
o.detachEvent('on'+e,f);}
catch(ex){};}}
var elementID=getParam('elid');ERA_RC.resource.isAsync=(elementID!=null);if(!ERA_RC.resource.isAsync){var elname="ERA_AD_BLOCK"
var blockId=getParam('blockid')||'';blockId=blockId.replace(/[^-\w.]/g,'').substr(0,20);elementID=elname+blockId;for(var i=1;i<25;i++){if(document.getElementById(elementID))
elementID=elname+i+blockId;else
break;}}
var layoutClass=getParam('layout');if(layoutClass)
layoutClass='eraLayoutHorizontal';else
layoutClass='';var content="<div class='eraLinksBlock "+layoutClass+"' id='"+elementID+"'></div>";var containerId=getParam('containerid')||getParam('elid');if(containerId){document.getElementById(containerId).innerHTML=content;}
else{document.write(content);}
ERA_RC.elid=elementID;ERA_RC.p[elementID]={container:document.getElementById(elementID),clickhandler:getParam('clickhandler'),onloaded:getParam('onloaded')}},ntentShowOverlay:function(){var DEFAULT_DOMAIN='cell.b2b.ntent.com';var src="http://"+ERA_RC.resource.getParam("ERADomain",DEFAULT_DOMAIN)+"/ERA/NtentInfo.html";var overlay='<div id="ntent-info-overlay-container"><div id="ntent-info-overlay"></div><div id="ntent-info-content"><div>';overlay+='<div id="ntent-content-close"></div><iframe frameBorder="0" scrolling="no" src="'+src+'" /></div></div></div>';ERA_RC.w.addClass(document.documentElement,'ntent-overlay');ERA_RC.w.addClass(document.body,'ntent-overlay');document.body.insertAdjacentHTML("beforeend",overlay);ERA_RC.w.addEvent(document.getElementById('ntent-info-overlay'),'click',ERA_RC.resource.ntentHideOverlay);ERA_RC.w.addEvent(document.getElementById('ntent-content-close'),'click',ERA_RC.resource.ntentHideOverlay);},ntentHideOverlay:function(){var overlay=document.getElementById('ntent-info-overlay-container');if(overlay){ERA_RC.w.removeClass(document.documentElement,'ntent-overlay');ERA_RC.w.removeClass(document.body,'ntent-overlay');ERA_RC.w.removeEvent(document.getElementById('ntent-info-overlay'),'click',ERA_RC.resource.ntentHideOverlay);ERA_RC.w.removeEvent(document.getElementById('ntent-content-close'),'click',ERA_RC.resource.ntentHideOverlay);overlay.parentNode.removeChild(overlay);}},getContent:function(content){var containerId=content.elid||ERA_RC.elid;var container=ERA_RC.p[containerId].container;container.innerHTML=content.value;if(content.adguids!=undefined){ERA_RC.ads.index++;ERA_RC.ads.ids+=content.adguids;}
var a=container.getElementsByTagName('a');if(a){for(var i=0;i<a.length;i++)
if(a[i].className=='vsw-ad-item'){a[i].href=a[i].href+"&vis="+ERA_RC.resource.getVisible(a[i]);var clickHandler=ERA_RC.p[containerId].clickhandler;if(typeof(clickHandler)=='function')
a[i].onclick=clickHandler;}}
var blockLoadedHandler=ERA_RC.p[containerId].onloaded;if(blockLoadedHandler)
blockLoadedHandler(content);setTimeout(function(){var scr=document.getElementById(ERA_RC.scriptId);if(scr)
scr.parentNode.removeChild(scr);},0);},getVisible:function(el){try{var top=el.offsetTop;var left=el.offsetLeft;var width=el.offsetWidth;var height=el.offsetHeight;while(el.offsetParent){el=el.offsetParent;top+=el.offsetTop;left+=el.offsetLeft;}
var qm=document.documentElement.scrollTop==0;var im=document.documentElement.clientWidth==0;var yo=window.pageYOffset||(qm?document.body.scrollTop:document.documentElement.scrollTop);var xo=window.pageXOffset||(qm?document.body.scrollLeft:document.documentElement.scrollLeft);var iw=window.innerWidth||(im?document.body.clientWidth:document.documentElement.clientWidth);var ih=window.innerHeight||(im?document.body.clientHeight:document.documentElement.clientHeight);var vis=top<(yo+ih)&&left<(xo+iw)&&(top+height)>yo&&(left+width)>xo;return vis?'T':'F';}
catch(e){return'U'};},getParam:function(p,def)
{var params=undefined;if(params||window.era_rc!=null){var o=params?params:window.era_rc;if(o){for(var prop in o){if(prop.toLowerCase()==p.toLowerCase()&&o[prop]){if(typeof o[prop]=='function'||typeof o[prop]!='string'||o[prop].length>0)
return o[prop];}}}}
if(def)
if(typeof def!='string'||def.length>0)
return def;return null;}};}();ERA_RC.resource.init();(function()
{var ERA_INTERFACE_LINK='/ERALinks/Default.aspx';var DEFAULT_DOMAIN='cell.b2b.ntent.com';var rc=ERA_RC.resource;function GetCustomContentID()
{var targetText = location.href;
var pattern;
var matchResult;
pattern = new RegExp("/(?:abstract|fulltext)/([a-zA-Z0-9]+-[a-zA-Z0-9]+\\([0-9]+\\)[0-9]+-[0-9a-zA-Z]+)", "i");
matchResult = pattern.exec(targetText);
if (matchResult != null)
{
return matchResult[1];
}
return '';}
function GetUseIFrame()
{var useiframe=rc.getParam('useiframe');if(useiframe=='no'||useiframe=='false')
return false;if(useiframe=='yes'||useiframe=='true')
return true;return(false);}
function GetEraBlockHeight(current_window)
{return rc.getParam('Height','0');}
function GetEraBlockWidth(current_window)
{return rc.getParam('Width','185');}
function GetContentId()
{var contentId=rc.getParam('ContentId');if(contentId)
return contentId;var catId=rc.getParam('CategoryIDs');if(catId)
return'0&categoryids='+catId;var test=rc.getParam('test','false');if(test==='true')
return'0';return GetCustomContentID();}
function DisplayEraFrame(eraLink,current_document,current_window)
{current_document.write("<iframe name='era_relatedLinks' width='"+GetEraBlockWidth()+"' height='"+GetEraBlockHeight()+"' frameborder='0' src='"+eraLink+"' marginwidth='0' marginheight='0' scrolling='no'>");current_document.write("</iframe>");}
function writeCss(src,onload,id){if(!document.getElementById(id)){var adstyle=document.createElement('link');adstyle.id=id;adstyle.rel="stylesheet";adstyle.type="text/css";adstyle.href=src;if(onload){adstyle.onload=function(){if(!adstyle.onloadDone){adstyle.onloadDone=true;if(onload)onload();}};adstyle.onreadystatechange=function(){if(("loaded"===adstyle.readyState||"complete"===adstyle.readyState)&&!adstyle.onloadDone){adstyle.onloadDone=true;if(onload)onload();}};}
document.getElementsByTagName("HEAD")[0].appendChild(adstyle);}}
function DisplayEraJavaScript(eraLink)
{var elid=rc.getParam('elid');if(elid){QueueRequest(eraLink,elid,0)}
else{eraLink+=GetMultiParams();document.write("<script charset=\"utf-8\" type=\"text/javascript\" src=\""+eraLink+"\"></script>");}}
var nRequests=0;var qTime=150;var qTimeout=60000;function QueueRequest(eraLink,elid,wait)
{setTimeout(function(){nRequests++;var scr=document.getElementById(ERA_RC.scriptId);if(scr==null)
{var adscript=document.createElement('script');adscript.id=ERA_RC.scriptId;adscript.src=eraLink+GetMultiParams()+"&elementid="+elid;adscript.charset='utf-8';document.getElementsByTagName("head")[0].appendChild(adscript);}
else
{nRequests++;if(nRequests>(qTimeout/qTime)){if(console&&console.log)
console.log("VSW AD: max wait time exceeded");return;}
QueueRequest(eraLink,elid,qTime);}},wait);}
function GetMultiParams()
{var params="";if(ERA_RC.ads.ids.length>0)
params="&adguids="+ERA_RC.ads.ids+"&blockindex="+ERA_RC.ads.index;return params;}
function GetReferrer(current_window,current_document)
{if(window!=top&&document.referrer){return document.referrer}
return window.location.href}
function IsValidUrl(current_window,current_document)
{return true}
function CreateEraLink(current_window,current_document)
{if(IsValidUrl(current_window,current_document))
{if(rc.isAsync){var cssHref="http://"+rc.getParam("ERADomain",DEFAULT_DOMAIN)+"/ERA/Custom/cell/Css/HtmlRelatedLinks.css";writeCss(cssHref,null,'era_link');}
var eraLink="http://"+rc.getParam("ERADomain",DEFAULT_DOMAIN)+ERA_INTERFACE_LINK;eraLink+='?contentid='+GetContentId();var pubId=rc.getParam('pubid');if(pubId)
eraLink+='&pubid='+pubId;eraLink+="&numrequests=1&";eraLink+="req1="+rc.getParam('ContentType','SSMicrosites')+"||";eraLink+=rc.getParam('MaxRelatedItems','4')+"|";eraLink+="SortBy:"+rc.getParam('SortBy','Rank');eraLink+="&referrer="+encodeURIComponent(rc.getParam("referrer",GetReferrer(current_window,current_document))||'');var test='true'===(rc.getParam('test')||'false');if(test)
eraLink+='&test=true';var styleId=rc.getParam('styleid','');if(styleId)
eraLink+='&styleid='+styleId;var clickTag=rc.getParam('clicktag');if(clickTag)
eraLink+='&clicktag='+clickTag;var overridecss=rc.getParam('overridecss','');if(overridecss)
eraLink+='&overridecss='+overridecss;var blockId=rc.getParam('blockid');if(blockId)
eraLink+='&blockid='+blockId;var ip=rc.getParam('ip');if(ip)
eraLink+='&ip='+ip;eraLink+='&vis='+ERA_RC.resource.getVisible(document.getElementById(ERA_RC.elid));if(GetUseIFrame())
{eraLink+='&outputtype=html';DisplayEraFrame(eraLink,current_document,current_window);}
else
{eraLink+='&outputtype=javascript';DisplayEraJavaScript(eraLink);}}}
function EraMain()
{var current_window=window;var current_document=document;CreateEraLink(current_window,current_document);}
EraMain();})()