// !! this file includes some fairly oldish functions (statusText, OpenPlainWindow, etc)
// !! we should rationalise it - miks


/*
* ----------------------------------------------------------------------
* function to construct the Google Analytics Event Tracking
* ----------------------------------------------------------------------
*/
function createGAEvent(category, action, label, optinteraction, href, legacy) {
	// stops the link from being followed right away.
    // Do this to help the click get counted by GA.
	// IE of course cause problems
	if( typeof href !== 'undefined'){

		// Wrapper to prevent event issues outside IE - brent
		if(typeof event != "undefined") {
			if (event && event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		}
		if(legacy===true) {
			_gaq.push(['_trackEvent', category, action, label, optinteraction]);
			// Also register the event using promo_type legacy so we can trace them and remove calls to this script
			category = category + " - legacy"
			_gaq.push(['_trackEvent', category, action, label, optinteraction]);
		} else {
			_gaq.push(['_trackEvent', category, action, label, optinteraction]);
		}
		//small delay to allow _gaq push to run before leaving page
		setTimeout('document.location = "' + href + '"', 200);

	} else {
        // no href defined - then just try to capture the event and don't put in delay which requires a href
        if(legacy===true) {
			_gaq.push(['_trackEvent', category, action, label, optinteraction]);
			// Also register the event using promo_type legacy so we can trace them and remove calls to this script
			category = category + " - legacy"
			_gaq.push(['_trackEvent', category, action, label, optinteraction]);
		} else {
			_gaq.push(['_trackEvent', category, action, label, optinteraction]);
		}
    }
}



/*
* ----------------------------------------------------------------------
* Custom NHM outbound link recorder - ite405 - March 2012
* Fixed by K Bouton May 10, 2012 to pass label as well
* This function allows us to record outbound links as GA tracked events
* This is legacy code being used in natureplus
* It should be replaced by the $('a.trackGAEvent').bind('click', function(event) above
* Usage example: <a href="http://www.youtube.com/user/naturalhistorymuseum" onclick="recordOutboundLink('http://www.youtube.com/user/naturalhistorymuseum', 'nplus-outbound-link', 'youtube');return false;">Watch us on YouTube</a>
* ----------------------------------------------------------------------
*/
//function recordOutboundLink(link, category, action) {
//	// eg category = nplus-outbound-link
//	// eg action = facebook, twitter, youtube, twitter-science, twitter-dippy
//	// eg link = http://www.youtube.com/user/naturalhistorymuseum
//
//    var clickedFromPage = window.location.pathname; // /visit-us/index.html
//    var label = "from " + clickedFromPage;
//
//		var debug = false;    // set to true to debug
//
//		if (debug) {
//			alert('recordOutboundLink function entered ' + link + ' ' + category + ' ' + action);
//		}
//
//		try{
//			_gaq.push(['_trackEvent', category, action, label]);
//			setTimeout('document.location = "' + link + '"', 200);   //small delay to allow _gaq push to run before leaving page
//		}
//
//		catch (err) {
//			if (debug) {
//						alert ('error sending event: ' + link);
//			}
//		}
//}

/*
* ----------------------------------------------------------------------
* Generic NHM event recorder - brent - April 2013
* This function allows us to record events as GA tracked events
* using a generic function name.
* ----------------------------------------------------------------------
*/
function recordEvent(link, category, action) {
	// eg category = nplus-outbound-link
	// eg action = facebook, twitter, youtube, twitter-science, twitter-dippy
	// eg link = http://www.youtube.com/user/naturalhistorymuseum

    var clickedFromPage = window.location.pathname; // /visit-us/index.html
    var label = "from " + clickedFromPage;

		var debug = false;    // set to true to debug

		if (debug) {
			alert('recordEvent function entered ' + link + ' ' + category + ' ' + action);
		}

		try{
			_gaq.push(['_trackEvent', category, action, label]);
			setTimeout('document.location = "' + link + '"', 200);   //small delay to allow _gaq push to run before leaving page
		}

		catch (err) {
			if (debug) {
						alert ('error sending event: ' + link);
			}
		}
}


/*
* ----------------------------------------------------------------------
* New function to manage 'share this' links - brent - September 2014
* ----------------------------------------------------------------------
*/
function nhmShareTracker(trackPath) {
	var parameters = trackPath.split('/'); 
	if(parameters) {
		var category = "Outbound link";
		var action = parameters[2] + ' | ' + parameters[3];
		var href = jQuery(location).attr('href').replace('http://'+window.location.hostname,'');
		var label = "from " + href;
		var optinteraction = 0;

		// Register the event with GA
		_gaq.push(['_trackEvent', category, action, label, optinteraction]);
		
		// Delay(?)
		//setTimeout('document.location = "' + href + '"', 500);
	}
}

/*
* ----------------------------------------------------------------------
* Clone of old urchinTracker - ite405 - Jan 2012
* Updated b.thomas Dec 11 2012
* ----------------------------------------------------------------------
*/
function nhmTracker(trackPath) {
	var debug = false;
	var promoMatches = trackPath.match(/\/Promos-GA\/(.*)$/);
	var outgoingMatches = trackPath.match(/\/outgoing\/(.*)$/);
	var promoMatchesPath = trackPath.match(/\/Promos-GA-Path\/(.*)$/);
	var outgoingMatchesPath = trackPath.match(/\/outgoing-Path\/(.*)$/);

    try {

        if(promoMatches) {
            var promo = promoMatches[1];
			var promoString = promo.split("/");
			var promo_for =  promoString[0];
			var promo_type = promoString[1];
			promo_type = promo_type.substring(0, 1).toUpperCase() + promo_type.substring(1).toLowerCase();
            if(promo_type!="Flash") {
				var targetnode = null;
				var href = null;
				if(!event) var event = window.event ;
				if(typeof event != "undefined") {
					var targetNode = event.target || event.srcElement;  //IE issues of course
					var a = $(targetNode).closest('a')[0];
					href = a.href;
				}
				else {
					// Take href from the 4th parameter onwards
					href = "http://" + document.domain;
					for (i = 3; i < promoString.length; i++) {
						href += "/";
						href += promoString[i];
					}
				}
			}
        }

        if(outgoingMatches) {
            var promo = outgoingMatches[1];
			var promoString = promo.split("/");
			var targetnode = null;
			var href = null;
			if(!event) var event = window.event;
			if(typeof event != "undefined") {
				var targetNode = event.target || event.srcElement;  //IE issues of course
				var a = $(targetNode).closest('a')[0];
				href = a.href;
			}
			else {
				// Take href from the 4th parameter onwards
				href = "http://" + document.domain;
				for (i = 3; i < promoString.length; i++) {
					href += "/";
					href += promoString[i];
				}
			}
        }

        if(promoMatchesPath) {
            var promo = promoMatchesPath[1];
			var promoString = promo.split("/");
			var promo_for =  promoString[0];
			var promo_type = promoString[1];
			promo_type = promo_type.substring(0, 1).toUpperCase() + promo_type.substring(1).toLowerCase();
            if(promo_type!="Flash") {
				var targetnode = null;
				var href = null;
				if(!event) var event = window.event ;
				if(typeof event != "undefined") {
					var targetNode = event.target || event.srcElement;  //IE issues of course
					var a = $(targetNode).closest('a')[0];
					href = a.href;
				}
				else {
					// Take href from the 4th parameter onwards
					href = "http://" + document.domain;
					for (i = 3; i < promoString.length; i++) {
						href += "/";
						href += promoString[i];
					}
				}
			}
        }

        if(outgoingMatchesPath) {
            var promo = outgoingMatchesPath[1];
			var promoString = promo.split("/");
			var targetnode = null;
			var href = null;
			if(!event) var event = window.event;
			if(typeof event != "undefined") {
				var targetNode = event.target || event.srcElement;  //IE issues of course
				var a = $(targetNode).closest('a')[0];
				href = a.href;
			}
			else {
				// Take href from the 4th parameter onwards
				href = "http://" + document.domain;
				for (i = 3; i < promoString.length; i++) {
					href += "/";
					href += promoString[i];
				}
			}
        }

		var clickedFromPage = window.location.pathname;
		if( typeof trackPath === 'undefined'){
			var category = "Promos - error";
			var action = "Empty function in link to" + href;
			var label = "Problem link found on " + clickedFromPage;
			var optinteraction = 0;
			var legacy = false;

			createGAEvent(category,action, label, optinteraction, href, legacy);
		} else {

			// The following lines have been commented out to remove pseudo event tracking 11/12/2012
			// Remove the '-Path' text in the track path string.
			//trackPath = trackPath.replace("Promos-GA-Path","Promos-GA");
			//trackPath = trackPath.replace("outgoing-Path","outgoing");
			//_gaq.push(['_trackPageview', trackPath]);

			/* Now if there is a match for Promos-GA also register it as an promo event */
			if(promoMatches || promoMatchesPath) {
				var category = "Promos";
                if(promo_type=="Flash") {
                    promo_type = "Rollover flash";
                }
				var action = promo_for + " | " + promo_type;
				var label = "from " + clickedFromPage;
				var optinteraction = 0;
				var legacy = false;

				createGAEvent(category,action, label, optinteraction, href, legacy);
			}
			/* Now if there is a match for outgoing also register it as an Outbound event */
			else if(outgoingMatches || outgoingMatchesPath) {
				var category = "Outbound link";
				var action = href;
				var label = "from " +clickedFromPage;
				var optinteraction = 0;
				var legacy = false;

				createGAEvent(category,action, label, optinteraction, href, legacy);
			} else {
				setTimeout('document.location = "' + href + '"', 200);
			}
		}
	} catch (err) {
		if (debug) {
			alert ('error with event');
		}
	}
}


// print flag - can be used to prevent script execution when doc being printed via "print this page" jsp app.
var formatForPrint = (document.location.href.indexOf('print-version') != -1);

/* ----- DETECT STANDARDS-COMPLIANT BROWSERS ----- */
var W3CDOM = (document.createElement && document.getElementsByTagName);

// IDENTIFY BROWSER, VERSION AND OS
// FROM: http://www.quirksmode.org/js/detect.html
// I don't like browser detection, but some browsers cannot be reliably excluded by object detection, and need to be (eg - Mac IE)
// this script may look like overkill, but is quite ingenious (see url above) and reliable
// 08/2007 - THERE IS NOW A NEWER SCRIPT AVAILABLE AT THE SAME URL WHICH WE MIGHT WANT TO IMPLEMENT

var detect = navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;
if (checkIt('konqueror')) {
	browser = "Konqueror";
	OS = "Linux";
}
else if (checkIt('safari')) browser = "Safari"
else if (checkIt('omniweb')) browser = "OmniWeb"
else if (checkIt('opera')) browser = "Opera"
else if (checkIt('webtv')) browser = "WebTV";
else if (checkIt('icab')) browser = "iCab"
else if (checkIt('msie')) browser = "Internet Explorer"
else if (!checkIt('compatible')) {
	browser = "Netscape Navigator"
	version = detect.charAt(8);
}
else browser = "An unknown browser";
if (!version) version = detect.charAt(place + thestring.length);
if (!OS) {
	if (checkIt('linux')) OS = "Linux";
	else if (checkIt('x11')) OS = "Unix";
	else if (checkIt('mac')) OS = "Mac"
	else if (checkIt('win')) OS = "Windows"
	else OS = "an unknown operating system";
}
function checkIt(string) {
	place = detect.indexOf(string) + 1;
	thestring = string;
	return place;
}
// prevent Mac IE from running scripts
if((browser == 'Internet Explorer') && (OS == 'Mac'))  W3CDOM = false;

/* ----- END DETECT STANDARDS-COMPLIANT BROWSERS ----- */



// ADD ONLOAD HANDERS - allows attachment of multiple function calls to window.onload
// THIS IS OVERKILL REALLY - THERE ARE EASIER WAYS (see note below) - BUT IT WORKS...
// FROM: http://www.tek-tips.com/gfaqs.cfm/pid/216/fid/4862 "Code courtesy of jemminger"
// USEAGE:
//	- window.addOnload( foo );
//	- window.addOnload( function() { foo(arg); } );
//	- window.addOnload( function() { bar(a, b, c); } );
window.addOnload = function (fn) {
    if (!window.OnloadCache) window.OnloadCache = [];
    var ol = window.OnloadCache;
    //ol.push(fn);			// push method not supported in IE5...
    ol[ol.length] = fn;		// but this works fine - miks
}
window.onload = function () {
    var ol = window.OnloadCache;
    if (ol)
        for (var x = 0; x < ol.length; x++)
            ol[x]();
}
// NOTE - if use window.attachEvent and window.addEventListener, then above function prob redundant???





/* ----- NEW 26/11/2010 - miks ----- */

function dateToday(asString) {
	if (typeof asString != 'undefined') asString = 0;		// default to false (ie - return date object)

	var d = new Date();
	var date = d.getDate();
	var month = d.getMonth();
	var year = d.getFullYear();
	today = new Date(year,month,date);
	todayString = year + '/' + month + '/' + date;

	if (asString) {
		return todayString;
	} else {
		return today;
	}
}

// _____________________________________
//
// config and setup for site-wide survey
// _____________________________________

// NOTE: siteWideSurveyName should be unset if no survey is active (primitive, but time is short...)

var siteWideSurveyName 			= 'user-survey-2010'; 							// survey name (if present, siteWideSurvey function will be called)
var siteWideSurveyURL 		 	= 'http://myvoice.co.uk/uc/main/f83f/?';		// survey url
var siteWideSurveyExpires 	 	=  new Date('2011/01/20');						// survey expiry date (yyyy/mm/dd)
var siteWideSurveyThreshold 	= '45000';										// milliseconds since visit start before survey opens
var siteWideSurveyWidth 	 	= '900';										// survey popup window width
var siteWideSurveyHeight 	 	= '600';										// survey popup window height

// message to display when popup blocked
var siteWideSurveyHTML		= 'If you have a moment please fill in our survey and let us know what you think of our website.</p><p>The survey takes around ten minutes and will help us to develop our website. By completing our survey you will also get the chance to win a copy of the latest Wildlife Photographer of the Year book by entering our free prize draw.</p><p><a href="#">Take survey</a> | <a href="#">No thanks</a>';

var siteWideSurveyHTML=new Array();
siteWideSurveyHTML[0]='If you have a moment please fill in our survey and let us know what you think of our website.';
siteWideSurveyHTML[1]='The survey takes around ten minutes and will help us to develop our website. By completing our survey you will also get the chance to win a copy of the latest Wildlife Photographer of the Year book by entering our free prize draw.';



var today = dateToday();

if((siteWideSurveyName != '') && (today < siteWideSurveyExpires)) {
	// if siteWideSurveyName not blank AND survey not expired
	// add siteWideSurvey function to body.onload
	window.addOnload(siteWideSurvey);
}

// END config and setup for site-wide survey
// _____________________________________


function addScriptElement(src) {
// adds script at url specified by src argument to document head

	var scriptElement = document.createElement('script');
		scriptElement.setAttribute('type','text/javascript');
		scriptElement.setAttribute('src',src);
	var scriptParent = document.getElementsByTagName('head');
		scriptParent[0].appendChild(scriptElement);
}

/* ---- START TEMP ---------------------------------------------------------------- */
/* this is a dubious one-off function - to be deleted after use - miks - 12/2010 */

function siteWideSurvey() {
// opens a "popup" DIV with link to survey after a specified delay, if not already completed/abandoned

	var siteWideSurveyStatus = getCookie(siteWideSurveyName);		// check for survey cookie

	if ((siteWideSurveyStatus != 'DONE') && testCookie()) {
		// if survey not already completed or abandoned AND browser accepts cookies

		var timeOnSite = checkTimeOnSite();							// get duration of current visit

		//alert(timeOnSite);

		if (timeOnSite > siteWideSurveyThreshold) {					// if threshold duration exceded

			var userLoggedIn = getCookie('nhm.sso.loggedIn');		// check if current user is logged in to NaturePlus
			siteWideSurveyURL += 'a=' + userLoggedIn;				// append user logged in/out status to survey URL
			siteWideSurveyURL += '&b=' + getIASection();

			// get and show DIV HTML
			// this IS NOT a good way to do this - prob better to use AJAX to  request
			// an external document and append that to DIV, but don't currently have
			// jQuery available on all pages, so this will have to do for now

			// create DIV to pop up
			var popupDiv = document.createElement('div');
			popupDiv.setAttribute('id', 'survey-invitation');

			// add content of siteWideSurveyHTML array to div
			for (i=0; i<siteWideSurveyHTML.length; i++) {

				var popupContent = document.createElement('p');
				var txt = document.createTextNode(siteWideSurveyHTML[i]);	// createTextNode
				popupContent.appendChild(txt);
				popupDiv.appendChild(popupContent);
			}

			// add links to survey URL and to close "popup"
			popupContent = document.createElement('p');				// create new P

			// go to survey link
			var popupLink = document.createElement('a');			// create new A
			popupLink.href = siteWideSurveyURL;						// set href for A
			popupLink.onclick = siteWideSurveyHideAndGo;			// set href for A
			popupLink.target = '_blank';							// set target for A
			txt = document.createTextNode('Go to survey');			// create text for new link
			popupLink.appendChild(txt);								// append text to A
			popupContent.appendChild(popupLink);					// append A to P

			// separator
			txt = document.createTextNode(' | ');					// create text node
			popupContent.appendChild(txt);							// append text to P

			// close survey link
			popupLink = document.createElement('a');				// create new A
			popupLink.href = '#';									// set href for A
			popupLink.onclick = siteWideSurveyHide;					// create action for new A
			txt = document.createTextNode('No thank you');			// create text for new link
			popupLink.appendChild(txt);								// append text to A
			popupContent.appendChild(popupLink);					// append A to P

			// add links to popup div
			popupDiv.appendChild(popupContent);						// append P to DIV



			var y = document.documentElement.scrollTop;						// get current vertical scroll offset
			//alert(y);

			var h = getViewPortDimensions('h');				// get current viewport height
			var w = getViewPortDimensions('w');				// get current viewport width
			var popupOffsetX = (w/2) - 200;					// calculate horizontal offset for popup - CSS?
			var popupOffsetY = y + 200;						// calculate vertical offset for popup

			//alert(parseInt(popupOffsetX));
			//alert(parseInt(popupOffsetY));

			// append popup DIV to BODY of document
			var parent = document.getElementsByTagName('body')[0];
			parent.appendChild(popupDiv);

			// position popup DIV
			var popup = document.getElementById('survey-invitation');
			popup.style.top = parseInt(popupOffsetY) + 'px';
			popup.style.left = parseInt(popupOffsetX) + 'px';

			//alert(popup.style.top);
			//alert(popup.style.left);

			// set cookie to prevent survey re-opening
			setCookie(siteWideSurveyName,'DONE', siteWideSurveyExpires, '/');

			//// NOTE: if using CSS for popup content, must be in both /css and /css-2007


		} else {
			setTimeout('siteWideSurvey()',10000);		// else check again in 10 seconds
		}
	}
}

function siteWideSurveyHide() {
	document.getElementById('survey-invitation').style.display = 'none';
	return false;
}
function siteWideSurveyHideAndGo() {
	document.getElementById('survey-invitation').style.display = 'none';
}
/* ---- END TEMP ---------------------------------------------------------------- */

function checkTimeOnSite()
{

	var cookieValue = getCookie('visit-started');							// retrieve value of visit-started cookie

	if ((cookieValue != null) && (cookieValue != '')){						// if visit-started cookie already set
		var d = new Date();
		var timeNow = d.getTime();											// get current time in milliseconds
		var visitDuration = timeNow - cookieValue;							// calculate visit duration
	} else {																// visit-started cookie not set, so set it now
		var d = new Date();
		var timeVisitStarted = d.getTime();									// get current time in milliseconds
		setSessionCookie('visit-started', timeVisitStarted, '/')			// set visit-started cookie
		var visitDuration = 0;												// return 0 to indicate no time yet spent on site
	}
	//alert(visitDuration);
	return visitDuration;													// return current duration on site (milliseconds)
}

function getViewPortDimensions(dimension) {
// returns width or height as specified by passing 'w' or 'h'

	var viewportwidth;
	var viewportheight;

	if (typeof window.innerWidth != 'undefined') {
		// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		viewportwidth = window.innerWidth;
		viewportheight = window.innerHeight;
	} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
		viewportwidth = document.documentElement.clientWidth;
		viewportheight = document.documentElement.clientHeight;
	} else {
		// IE8 + ?
		viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
		viewportheight = document.getElementsByTagName('body')[0].clientHeight;
	}

	if (dimension == 'h') {
		return viewportheight;
	} else {
		return viewportwidth;
	}
}

/* ----- END NEW 26/11/2010 ----- */




/* ----- added 26/03/2010 for SSO ----- */
/* ----- updated 12/2010 ----- */
function loadNonStaticHeader()
{

	var originalURL = encodeURIComponent(top.location.href);
	if ( typeof( window[ 'logoutURL' ] ) != "undefined" ) {
		top.frames['page-np-login'].location = '/sso-utils/header/?originalURL=' + originalURL + '&logoutURL=' + logoutURL;
   }
	else {
		top.frames['page-np-login'].location = '/sso-utils/header/?originalURL=' + originalURL;
   }
}




/* ----- NEW - Sept 2009 ----------------------------------------------- */

function getIASection_OLD() {

// this function needs changing to use an array of folders, so can use
// second folder name is first is /jdsml or similar - miks - 11/2010

	var urlpath = parent.location.pathname;						// get path
	urlpath = urlpath.substring(1);								// remove initial "/"
	var iaSection = urlpath.substring(0,urlpath.indexOf('/'));	// get first folder name in path
	//alert(iaSection)
	return iaSection;
}


function getIASection() {										// added 02/12/2010

// doesn't work properly if NO folder (ie - /index page) - miks - 06/2011

	var urlpath = parent.location.pathname;						// get path
	urlpath = urlpath.substring(1);								// remove initial "/"
	arrFolders = urlpath.split('/')								// split path into array
	var iaSection = arrFolders[0];								// set var to first folder
	if (iaSection == 'jdsml') {									// this block will be redundant when JavaAppServer replaced with Tomcat
		iaSection = arrFolders[1];								// if 'jdsml' use the second folder instead
	}
	//alert(iaSection)
	return iaSection;
}

/* ----- END NEW - Sept 2009 ------------------------------------------ */




/* ----- NEW FUNCTIONS - July 2007 ----------------------------------------------- */

/* ----- popup windows --------------------- */

function popup(url, windowName, width, height, scroll) {

	// NOTE: popup windows should always be resizable for various accessibility/usability reasons
	// NOTE: diff browsers display diff features - not always under developer control...

	var features = 'resizable=1,status=0,location=0' +
		',width=' + width +
		',height=' + height +
		',scrollbars=' + scroll

	return window.open(url,windowName,features);
}

function popupImage(url, windowName) {
	// need default windowName ??
	var thePopupImage = popup(url, windowName, 100, 100, 0);		// open tiny, as assume window will resize itself (so popupResize might be better name? - although current name is more transparent...)
	window.focus();													// focus current window to hide tiny initial popup (which should focus itself when loaded)
	return thePopupImage;
}

function popupSurvey(url, width, height) {
	return popup(url, 'survey', width, height, 1);
}

function popupTurningThePages(url) {
	return popup(url, 'TurningThePages', 950, 750, 1);
}




/* ----- get and set cookies ----------------- */
function getCookie(name) {
  var cookies = document.cookie;
  var start = cookies.indexOf(name + '=');
  if (start == -1) return null;
  var len = start + name.length + 1;
  var end = cookies.indexOf(';',len);
  if (end == -1) end = cookies.length;
  return unescape(cookies.substring(len,end));
}
function setCookie(name, value, expires, path, domain, secure) {
  value = escape(value);
  expires = (expires) ? ';expires=' + expires.toGMTString() :'';
  path    = (path)    ? ';path='    + path                  :'';
  domain  = (domain)  ? ';domain='  + domain                :'';
  secure  = (secure)  ? ';secure'                           :'';
  document.cookie = name + '=' + value + expires + path + domain + secure;
}
function setSessionCookie(name, value, path, domain, secure) {
// created so can omit "expires" argument.
// is this necessary?  maybe can just pass "null" for expires in setCookie()?
  value = escape(value);
  path    = (path)    ? ';path='    + path                  :'';
  domain  = (domain)  ? ';domain='  + domain                :'';
  secure  = (secure)  ? ';secure'                           :'';
  document.cookie = name + '=' + value + path + domain + secure;
}


/* ----- test cookies enabled ----------------- */
function testCookie() {
	setCookie('nhm-test','cookieIsSet');
	returnValue = getCookie('nhm-test') == 'cookieIsSet' ? true : false;
	//alert(returnValue);
	return returnValue;
}







/* ----- create x-browser reqeust object ------ */
function createRequestObject() {
	var ro = null;
	try {
		ro = new ActiveXObject('Msxml2.XMLHTTP');
	} catch(e) {
		try {
			ro = new ActiveXObject('Microsoft.XMLHTTP');
		} catch(oc) {
			ro = null;
		}
	}
	if (!ro && typeof XMLHttpRequest != 'undefined') {
		ro = new XMLHttpRequest();
	}
	return ro;
}


/* ----- END NEW FUNCTIONS ------------------------------------------------------- */



// ----- GET ELEMENTS BY CLASS NAME -----
// FROM: http://www.dynamicdrive.com/dynamicindex17/switchcontent_dev.htm
function getElementsByClassName(classname) {
	ccollect=new Array();
	var inc=0;
	var alltags = document.all? document.all : document.getElementsByTagName("*");			// this is inefficient - should do test the other way around - but IE still inefficient if many elements anyway... - miks - 09/2009

	for (i=0; i<alltags.length; i++){
		//if (alltags[i].className==classname) ccollect[inc++]=alltags[i];			// this only handles single classes, not space-seperated
		if (alltags[i].className != undefined) {
			if (alltags[i].className.indexOf(classname) > -1) ccollect[inc++]=alltags[i];	// but this works - miks (except in Opera...until added the test for undefined)
		}
	}
	return ccollect;
}



// IMAGE ROLLOVER
function swap(img,isrc) {
	if (!document.images) return;
	document.images[img].src = isrc;
}

// POPUP WINDOW
// - supply height/width as pixels
// - supply resize/scroll as 1 or 0
function OpenPlainWindow(url, windowName, width, height, resize, scroll) {
	var features =  'width=' + width +
		',height=' + height +
		',directories=0' +
		',location=0' +
		',menubar=0' +
		',scrollbars=' + scroll +
		',toolbar=0' +
		',resizable=' + resize
	window.open(url,windowName,features);
}

// STATUSBAR TEXT FUNCTION
function statusText(text){
	window.setTimeout('window.status="' + text + '"', 1); 	// timeout allegedly fixes IE5 bug (?) - this works for nn (mac and pc) and iepc
	return true;
}
// ASSIGN A CSS CLASS
function setClass(theID, theClass){
		eval('document.all.' + theID + '.className = "' + theClass + '"');
}
// NAVIGATE WINDOW
function navToURL(theURL) {
	window.location = theURL;
}
// CREATE AN AUTO-RESIZING POPUP IMAGE LINK
function setUpPopup(theURL, theWinName) {
	varLinkString = "<a href=javascript:OpenPlainWindow('" + theURL + "','" + theWinName + "',100,100,1,0)>";
	document.write(varLinkString);
	//alert('varLinkString');
}
// CHANGE CSS CLASS
function changeClassById(id,newClass) {
	if (document.getElementById) { document.getElementById(id).className  = newClass; }
}








/*********************************************************

FOLLOWING SHOULD BE REMOVED - USE SEPEARTE SCRIPT FILE - swfobject/swfobject-v1-5.js
There is now also an updated version - swfobject/swfobject-v2.js
miks - 06/2008

**********************************************************/

/**
 * SWFObject v1.5: Flash Player detection and embed - http://blog.deconcept.com/swfobject/
 *
 * SWFObject is (c) 2007 Geoff Stearns and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;




/*********************************************************

FOLLOWING SCRIPTS COPIED FROM popup.js

LATTER FILE SHOULD NEVER HAVE EXISTED INDEPENDENTLY OF
THIS ONE AND ALL REFERENCES TO IT CAN BE REMOVED

*********************************************************/


// the functions in this file require the supplementary library lib.js [ this appears not to be true - or maybe it is true, as lib is reproduced in nhm.js - miks - 06/2006 ]

// These defaults should be changed the way it best fits your site
var _POPUP_FEATURES = 'width=400,height=400,menubar=false,scrollbars=false,toolbar=false,resizable=false';

function raw_popup(url, target, features) {
    // pops up a window containing url optionally named target, optionally having features
    if (isUndefined(features)) features = _POPUP_FEATURES;
    if (isUndefined(target  )) target   = '_blank';
    var theWindow = window.open(url, target, features);
    theWindow.focus();
    return theWindow;
}

function link_popup(src, features) {
    // to be used in an html event handler as in: <a href="..." onclick="link_popup(this,...)" ...
    // pops up a window grabbing the url from the event source's href
    return raw_popup(src.getAttribute('href'), src.getAttribute('target') || '_blank', features);
}

function event_popup(e) {
    // to be passed as an event listener
    // pops up a window grabbing the url from the event source's href
    link_popup(e.currentTarget);
    e.preventDefault();
}

function event_popup_features(features) {
    // generates an event listener similar to event_popup, but allowing window features
    return function(e) { link_popup(e.currentTarget, features); e.preventDefault() }
}



/*
following code (to end of file) added for print version (and other?) functionality
looks like overkill to me for that purpose, but the functions do look useful - miks
*/

/*

This file contains only functions necessary for the article features
The full library code and enhanced versions of the functions present
here can be found at http://v2studio.com/k/code/lib/


ARRAY EXTENSIONS

push(item [,...,item])
    Mimics standard push for IE5, which doesn't implement it.


find(value [, start])
    searches array for value starting at start (if start is not provided,
    searches from the beginning). returns value index if found, otherwise
    returns -1;


has(value)
    returns true if value is found in array, otherwise false;


FUNCTIONAL

map(list, func)
    traverses list, applying func to list, returning an array of values returned
    by func

    if func is not provided, the array item is returned itself. this is an easy
    way to transform fake arrays (e.g. the arguments object of a function or
    nodeList objects) into real javascript arrays.

    map also provides a safe way for traversing only an array's indexed items,
    ignoring its other properties. (as opposed to how for-in works)

    this is a simplified version of python's map. parameter order is different,
    only a single list (array) is accepted, and the parameters passed to func
    are different:
    func takes the current item, then, optionally, the current index and a
    reference to the list (so that func can modify list)


filter(list, func)
    returns an array of values in list for which func is true

    if func is not specified the values are evaluated themselves, that is,
    filter will return an array of the values in list which evaluate to true

    this is a similar to python's filter, but parameter order is inverted


DOM

getElem(elem)
    returns an element in document. elem can be the id of such element or the
    element itself (in which case the function does nothing, merely returning
    it)

    this function is useful to enable other functions to take either an    element
    directly or an element id as parameter.

    if elem is string and there's no element with such id, it throws an error.
    if elem is an object but not an Element, it's returned anyway


hasClass(elem, className)
    Checks the class list of element elem or element of id elem for className,
    if found, returns true, otherwise false.

    The tested element can have multiple space-separated classes. className must
    be a single class (i.e. can't be a list).


getElementsByClass(className [, tagName [, parentNode]])
    Returns elements having class className, optionally being a tag tagName
    (otherwise any tag), optionally being a descendant of parentNode (otherwise
    the whole document is searched)


DOM EVENTS

listen(event,elem,func)
    x-browser function to add event listeners

    listens for event on elem with func
    event is string denoting the event name without the on- prefix. e.g. 'click'
    elem is either the element object or the element's id
    func is the function to call when the event is triggered

    in IE, func is wrapped and this wrapper passes in a W3CDOM_Event (a faux
    simplified Event object)


mlisten(event, elem_list, func)
    same as listen but takes an element list (a NodeList, Array, etc) instead of
    an element.


W3CDOM_Event(currentTarget)
    is a faux Event constructor. it should be passed in IE when a function
    expects a real Event object. For now it only implements the currentTarget
    property and the preventDefault method.

    The currentTarget value must be passed as a paremeter at the moment    of
    construction.


MISC CLEANING-AFTER-MICROSOFT STUFF

isUndefined(v)
    returns true if [v] is not defined, false otherwise

    IE 5.0 does not support the undefined keyword, so we cannot do a direct
    comparison such as v===undefined.
*/

// ARRAY EXTENSIONS

if (!Array.prototype.push) Array.prototype.push = function() {
    for (var i=0; i<arguments.length; i++) this[this.length] = arguments[i];
    return this.length;
}

Array.prototype.find = function(value, start) {
    start = start || 0;
    for (var i=start; i<this.length; i++)
        if (this[i]==value)
            return i;
    return -1;
}

Array.prototype.has = function(value) {
    return this.find(value)!==-1;
}

// FUNCTIONAL

function map(list, func) {
    var result = [];
    func = func || function(v) {return v};
    for (var i=0; i < list.length; i++) result.push(func(list[i], i, list));
    return result;
}

function filter(list, func) {
    var result = [];
    func = func || function(v) {return v};
    map(list, function(v) { if (func(v)) result.push(v) } );
    return result;
}


// DOM

function getElem(elem) {
    if (document.getElementById) {
        if (typeof elem == "string") {
            elem = document.getElementById(elem);
            if (elem===null) throw 'cannot get element: element does not exist';
        } else if (typeof elem != "object") {
            throw 'cannot get element: invalid datatype';
        }
    } else throw 'cannot get element: unsupported DOM';
    return elem;
}

function hasClass(elem, className) {
    return getElem(elem).className.split(' ').has(className);
}

function getElementsByClass(className, tagName, parentNode) {
    parentNode = !isUndefined(parentNode)? getElem(parentNode) : document;
    if (isUndefined(tagName)) tagName = '*';
    return filter(parentNode.getElementsByTagName(tagName),
        function(elem) { return hasClass(elem, className) });
}


// DOM EVENTS

function listen(event, elem, func) {
    elem = getElem(elem);
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(event,func,false);
    else if (elem.attachEvent)  // IE DOM
        elem.attachEvent('on'+event, function(){ func(new W3CDOM_Event(elem)) } );
        // for IE we use a wrapper function that passes in a simplified faux Event object.
    else throw 'cannot add event listener';
}

function mlisten(event, elem_list, func) {
    map(elem_list, function(elem) { listen(event, elem, func) } );
}

function W3CDOM_Event(currentTarget) {
    this.currentTarget  = currentTarget;
    this.preventDefault = function() { window.event.returnValue = false }
    return this;
}


// MISC CLEANING-AFTER-MICROSOFT STUFF

function isUndefined(v) {
    var undef;
    return v===undef;
}

// _____________________________________
//
// NaturePlus crossSite Bookmarks - start
// _____________________________________


function hideDivs(){
	//if close button is clicked\
	$('#mask').hide();
	$('.window').hide();
};

//Encoding functions for obtainBookmarkForm
c=function(p){try{return((eval(p))?(b(eval(p+'()'))):t)}catch(ex){return(a)}};
d=function(p){z=c(p);if(z){return(z)}else{for(i=0;i<frames.length;i++){z=c('frames['+i+'].'+p);if(z){return(z)}}}return(a)};
b=function(p){return(encodeURIComponent(p))};
a='';

//  ---		ajax calls	----
function processBookMarksForm(){
	var form_url = $("#jive-bookmark-form").attr("action");
	$.ajax({
		type: "POST",
		timeout: 10000,
		url: form_url,
		data: $("#jive-bookmark-form").serialize(),
		success: function(response) {
		$('#modalDiv-form').html(response);
	},
		error: function(xhr)
		{
			bookmarksServiceDown();
		}
	});
	return false;
}

function obtainBookmarkForm(){
	//bookmarksUrl = '/natureplus/natureplus/create-favorite-bookmarklet!input.jspa?url='+b(location.href)+'&notes='+d('window.getSelection')+'&subject='+b(document.title);
	// new version - 2013/11/18
	//bookmarksUrl = '/natureplus/create-favorite-bookmarklet!input.jspa?url='+b(location.href)+'&notes='+d('window.getSelection')+'&subject='+b(document.title);
  bookmarksUrl = '/natureplus/create-favorite-popup!input.jspa?url='+b(location.href)+'&notes='+d('window.getSelection')+'&subject='+b(document.title);
	jQuery.ajax({
		url:bookmarksUrl,
		 timeout: 10000,
		cache: false,
		async:false,
		success: function(data, textStatus, XMLHttpRequest)
			{
				$('div[id^="modalDiv"]').remove();
				data = data.replace("CURRENT_URL", location.href);
				$("#bookmark-this").prepend(data);
			},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			bookmarksServiceDown();
		}
	});
}

function bookmarksServiceDown(){
	bookmarksUrlDown = '/includes/components/text/messages/bookmark-service-down.txt';
	jQuery.ajax({
		url:bookmarksUrlDown,
		cache: false,
		async:false,
		success: function(response)
			{
				$('div[id^="modalDiv"]').remove();
				$("#bookmark-this").prepend(response);
			}

		/*  ,error: function(XMLHttpRequest, textStatus, errorThrown)
		{
			alert('error:' + XMLHttpRequest);
			alert('error:' + textStatus);
			alert('error:' + errorThrown);
		}*/
	});
}

// Checks
function loadBookmarks(){
		if ($('a[name=modal]').length > 0){

		//Load extra css
		var noCachenumber = Math.random()*Math.random();
		//FOR IE
		if(document.createStyleSheet) {
			document.createStyleSheet('/natureplus/styles/jive-icons.css?' + noCachenumber,0);
		}else{
			//OTHER BROWSERS
	 		$("head").prepend($("<link rel='stylesheet' href='/natureplus/styles/jive-icons.css?" + noCachenumber + "' type='text/css' media='all' />"));
		}

		//add the modal divs
		$('body').append('<div id="bookmark-this"><div id="mask"></div></div>');

		//hide everything if the mask is clicked
		$('#mask').click(function () {
			$(this).hide();
			$('.window').hide();
		});


		//  ---  bookmark this link functionality  ----
		$('a[name=modal]').click(function(e) {
			obtainBookmarkForm();
			//Cancel the link behavior
			e.preventDefault();

			var id = $('div[id^="modalDiv"]');

			//Get the screen height and width
			var maskHeight = $(document).height();
			var maskWidth = $(document).width();

			//Set heigth and width to mask to fill up the whole screen
			$('#mask').css({'width':maskWidth,'height':maskHeight});

			//transition effect
			$('#mask').fadeIn(2000);
			$('#mask').fadeTo("slow",0.8);

			//Get the window height and width
			var winH = $(window).height();
			var winW = $(window).width();

			//Set the popup window to center
			var middleTop		= ((winH/2-$(id).height()/2 > 0) ? (winH/2-$(id).height()/2) : 10) ;
			var middleLeft 	=	((winW/2-$(id).width()/2 > 0) ? (winW/2-$(id).width()/2) : 10) ;

			$(id).css('top',  middleTop + document.documentElement.scrollTop);
			$(id).css('left', middleLeft);

			//transition effect
			$(id).fadeIn(2000);
		});
	}
}

//Add NHM cookie message if user has not accepted the cookies before
window.addOnload(attachCookieMessage);

function attachCookieMessage() {

	// Only display cookie message if we are not in an embedded iframe
	if (top == self) {
		if (getCookie("nhm_cookie_accept") != "true") {
			var html = "<div id='nhm-cookie-banner'> <div class = 'left' >" +
					"<p align = 'left'> We use cookies to help us improve our website. By continuing to use the website you agree to our use of cookies. " +
					"<span><a href = 'http://www.nhm.ac.uk/about-us/website-help/terms-of-use/cookies'>Read our cookie policy.</a></span>" +
					" </p>" +
					"</div><div class = 'right' >" +
					"<a title = 'Redisplay page without cookie banner and accept cookies' href = 'javascript:hideCookieBanner();' >" +
					"Close this message [x]</a></div></div>";
			var div = document.createElement("div");
			div.setAttribute("id", "nhm-cookie-notify");
			div.innerHTML = html;
			document.getElementById("page-container").appendChild(div);
			//Push down main page
			document.getElementById("page-container").style.top = '50px';
		}
	}
}


function hideCookieBanner() {
	document.getElementById('nhm-cookie-banner').style.display = 'none';
	var d = new Date();
	d.setTime(d.getTime()+(365*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = "nhm_cookie_accept=true; expires=path=/;" + expires;
	//Remove custom top positioning that was used for the cookie banner
	document.getElementById("page-container").style.top = null;
}

// _____________________________________
//
// NaturePlus crossSite Bookmarks - end
// _____________________________________

if (typeof jQuery != 'undefined') {
	$(document).ready(function() {
		loadBookmarks();
 });
}