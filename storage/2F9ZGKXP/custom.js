document.write('<script type="text/javascript" src="http://ftpcontent.worldnow.com/wncustom/js/helpers.js"></script>');
document.write('<script type="text/javascript" src="http://content.worldnow.com/global/interface/httprequest/httprequest.js"></script>');
document.write('<script type="text/javascript" src="http://ftpcontent.worldnow.com/wncustom/js/wxmanager.js"></script>');
/*Namespace*/
var csKUAM = {};

/*globalVar*/
defaultImage = "http://ftpcontent.worldnow.com/professionalservices/clients/kuam/images/default-story-img.jpg";
csdefImgContainer = "<div class='cs-default-image-cont summaryImage abridged'><a href=''><img src='" + defaultImage + "'></a></div>"

csKUAM.sponsorTopRight = function() {
	$wn('#WNAd46, #WNAd41').after('<div class="leaderboardTopRight"></div>')
};

csKUAM.memberCenterLinks = function() {
	$wn('#WNHeader #WNBranding').append('<div id="csSocial">' + '<a href="https://www.facebook.com/pages/KUAM-News/39567613741?ref=ts" id="csFacebook" target="_blank"></a>' + '<a href="https://twitter.com/guamnews_kuam" id="csTwitter" target="_blank"></a>' + '<a href="http://instagram.com/kuamnews" id="csInstagram" target="_blank"></a>' + '<a href="https://www.youtube.com/user/kuamnews" id="csYoutube" target="_blank"></a>' + '<a href=" https://www.linkedin.com/company/kuam-tv" id="csLinkedin" target="_blank"></a>' + '<a href="https://plus.google.com/b/107337530764495249630/107337530764495249630/posts" id="csgPlus" target="_blank"></a>' + '<div class="wnClear></div>' + '</div>');
};
csKUAM.csBranding = function() {
	$wn('#WNBranding > img').removeAttr('src');
}
csKUAM.newMemberCenter = function() {
	$wn('#WNContainerMemberSearch-headertop').hide();
	$wn("#WNSearchBox-headertop").appendTo("#WNBranding");
	$wn('#WNHeader .wnSearchBox label:eq(0)').hide();
	$wn('#WNHeader .wnSearchBox label:eq(1)').hide();
	$wn('#WNHeader .wnSearchBox input:eq(0)').hide();
	$wn('#WNHeader .wnSearchBox input:eq(1)').hide();
	$wn('#WNHeader .wnSearchBox input:eq(2)').attr('placeholder', 'Search');
};
csKUAM.displaySizeMod = function() {

	/*homepage headlineBox-2A*/
	$wn('#DisplaySizeId80 .wnGroup.contentGroup').each(function() {
		console.log('2');
		var $firstStory = $wn(this).find('.wnItem.feature').first();
		$wn(this).find('.wnItem.feature:gt(0)').find('.summaryImage.abridged').hide();
		$wn(this).find('.wnItem.feature:gt(0)').find('.summary').hide();
		$wn(this).find('.wnItem.feature').find('.summary .more').hide();
		$wn(this).find('.wnItem.feature:gt(0)').find('.headline.abridged').css('padding-left', '2em');
		if ($firstStory.find('.summaryImage.abridged').length == 0) {
			$(csdefImgContainer).prependTo($firstStory);
		} else {
			$firstStory.find('.summaryImage.abridged').show().prependTo($firstStory);
			var imgSrc = $firstStory.find('.summaryImage.abridged img').attr('data-path');
			$firstStory.find('.summaryImage.abridged img').attr('src', imgSrc);
		}

	});
	/*homepage headlineBox-2B*/
	$wn('#DisplaySizeId82 .wnGroup.contentGroup .feature').each(function() {
		$wn(this).find('.summary').hide();
		if ($wn(this).find('.summaryImage.abridged').length == 0) {
			$(csdefImgContainer).prependTo(this);
		} else {
			$wn(this).find('.summaryImage.abridged').show().prependTo(this);
			var imgSrc = $wn(this).find('.summaryImage.abridged img').attr('data-path');
			$wn(this).find('.summaryImage.abridged img').attr('src', imgSrc);
		}

	});

};
csKUAM.footer = function() {
	var $wnFooter = $wn('#WNFooter'), saveText = $wn('.wnCopyrightText').html()
	$wnFooter.addClass('cdev-footer').html(saveText);
	var $footerSearchBox = $wn('#WNSearchBox-headertop').clone();
	$wn('#WNFooter .footer-search').html($footerSearchBox);
};

function designSubCategoryPage() {

	var $stories = $wn("#WNCol2 #DisplaySizeId-7 .wnGroup.contentGroup");
	$stories.find('.feature').each(function() {
		$wn(this).find('.summaryImage ').prependTo(this);
	});

	var storyObject = $wn("#WNCol2 #DisplaySizeId-7 .wnGroup.contentGroup .wnItem.feature ").wnItemExtract();
	var customImageDiv = "";
	$wn('.displaySize .summary .more span').text('MORE');

}

function mostPopularTabbed() {
	$wn('#wnMostPopularTabbed .wnDSContainer-standard .wnRole-STORY img').attr('src', 'http://ftpcontent.worldnow.com/professionalservices/clients/kuam/images/video.png');
	$wn('#wnMostPopularTabbed .wnDSContainer-standard .wnTab').on('click', function() {
		setTimeout(function() {
			$wn('#wnMostPopularTabbed .wnDSContainer-standard .wnRole-STORY img').attr('src', 'http://ftpcontent.worldnow.com/professionalservices/clients/kuam/images/video.png');
		}, 500);
	});

}

function restyleStoryPage() {
	if ($wn('#divWNStoryVideoDS37').length == 0) {
		$wn('.wnStoryBodyGraphic').first().addClass('restyle-body-graphic').insertAfter('#WNStoryHeader h3');
	} else {
		$wn('#WNStoryHeader .wnDate').insertAfter('#WNDS37');
		$wn('#WNStoryByline').appendTo('#WNStoryHeader');
	}

}

Worldnow.EventMan.event('WNMenuCol1done', function() {

});

Worldnow.EventMan.event('WNCol23done', function() {
	csKUAM.displaySizeMod();
	designSubCategoryPage();
});

Worldnow.EventMan.event('WNCol4done', function() {

});

Worldnow.EventMan.event('bodydone', function() {
	csKUAM.footer();

});

$wn(document).ready(function() {
	$wn('#WNBranding #WNBrandingImage').attr('src', 'http://ftpcontent.worldnow.com/professionalservices/clients/kuam/images/logo1.png')
	$wn('section.nav nav.simple-a.main > a:first-child').html('<img src="http://ftpcontent.worldnow.com/professionalservices/clients/kuam/images/Home.png">')
	csKUAM.sponsorTopRight();
	csKUAM.memberCenterLinks();
	csKUAM.newMemberCenter();

	$wn('.displaySize .header .more span').text('MORE');
	restyleStoryPage();
});
$wn(window).load(function() {
	mostPopularTabbed();
}); 