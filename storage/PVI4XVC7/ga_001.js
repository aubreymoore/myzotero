// -----------------------------------------------------------------

// Google Analytics Code

var _gaq = _gaq || [];

_gaq.push(['_setAccount', 'UA-27913326-1']);
_gaq.push(['_setDomainName', 'eurekalert.org']);
_gaq.push(['_trackPageview']);

(function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 }) ();


// -----------------------------------------------------------------

// JQuery Code to track downloads of non-HTML files

//  FIRST, we add some code that creates a JQuery selector that handles regular expressions

// http://james.padolsey.com/javascript/regex-selector-for-jquery/

jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}


// SECOND, we add code that identifies certain types of links, then explicitly calls Google Analytics when someone clicks on those links.

$('document').ready(function() {
	
	$('a:regex(href, \.pdf$)').click(function () {

	// If "pathname" doesn't have a leading "/", add it, to keep the format consistent with the way page views are presented in Google Analytics
    var pn = this.pathname;
    var pattern = /^\//;
    if(!pn.match(pattern)) { pn = '/' + pn; }

		_gaq.push(['_trackPageview', pn]);
	});

	$('a:regex(href, \.(doc|docx*|xls|xlsx*|ppt|pptx*|pptm|pps|ppsx*|rtf|odf|exe|zip|jpg|jpeg|gif|png|tif|tiff|bmp|psd|wmf|avi|mov|mpg|mpeg|mp4|flv|wmv|rm|dv|rv|mp3|wav|ram|aif|aiff|db)$)').click(function () {

	// If "pathname" doesn't have a leading "/", add it, to keep the format consistent with the way page views are presented in Google Analytics
    var pn = this.pathname;
    var pattern = /^\//;
    if(!pn.match(pattern)) { pn = '/' + pn; }
		
		_gaq.push(['_trackEvent', 'download', 'click', pn]);
	});

	$('a[href^="mailto:"]').click(function () {
		_gaq.push(['_trackEvent', 'email', 'click', this.href.replace(/mailto:/, "")]);
	});

	$('a[href^="http\\:\\/\\/"]').click(function () {
		if (location.hostname != this.hostname) {
			_gaq.push(['_trackEvent', 'outbound', 'click', this.href.replace(/http:\/\//, "")]);
		}
	});
});

// jQuery Limit plugin to limit the number of characters permissible in a text area
(function($){ 
     $.fn.extend({  
         limit: function(limit,element) {
			
			var interval, f;
			var self = $(this);
					
			$(this).focus(function(){
				interval = window.setInterval(substring,100);
			});
			
			$(this).blur(function(){
				clearInterval(interval);
				substring();
			});
			
			substringFunction = "function substring(){ var val = $(self).val();var length = val.length;if(length > limit){$(self).val($(self).val().substring(0,limit));}";
			if(typeof element != 'undefined')
				substringFunction += "if($(element).html() != limit-length){$(element).html((limit-length<=0)?'0':limit-length);}"
				
			substringFunction += "}";
			
			eval(substringFunction);
			
			
			
			substring();
			
        } 
    }); 
})(jQuery);
// -----------------------------------------------------------------
