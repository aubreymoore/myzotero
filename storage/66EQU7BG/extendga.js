$(document).ready(function(){
		
	//loop though each anchor element
	$('a').each(function(){
		
		var ua = 'UA-8627312-1';
		var href = $(this).attr('href');
		var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
		//check for links with file extension that match the filetypes regular expression:

		if (typeof href !== 'undefined') {
			if (href.match(filetypes)){
				$(this).click(function() {
					var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
					var filePath = href.replace(/^https?\:\/\/(www\.)choicesmagazine\.org\//i, '');
					//pageTracker._trackEvent('Download', 'Click - ' + extension, filePath);
					//_gaq.push(['_trackPageview', filePath]);
					gtag('config', ua, {'page_path': filePath});
				});
			}
		}

	});

});