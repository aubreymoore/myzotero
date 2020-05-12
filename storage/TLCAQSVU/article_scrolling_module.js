var ArticleScrollingModule = (function($, window){

	var ret = {
		_defaults: {
			prop: "name",
			toolbarChanged: false,
			floatingToolbarHeight:  0,
			floatingToolbarMenuHeight:  0,
			sidebarAdWrapper: null,
			sidebarAdWrapperWidth: 0,
			sidebarAdWrapperTop: 0
		},
		name:"ScrollingModule"
	};

	ret.init = function () {

		this.scrollStaticElements();
		this.fixedScrollingToolbox();
		this.showScrollingToolbox();
		this.autoHideToolboxDropdowns();
		this.populateArticleNavigation();
		this.scrollOnLoad();

		if ($(".sidebar-ad-wrapper").length > 0) {

			// retriving info about sidebarAdWrapper
			this._defaults.sidebarAdWrapper = $(".sidebar-ad-wrapper");
			this._defaults.sidebarAdWrapperWidth = this._defaults.sidebarAdWrapper.width();
			this._defaults.sidebarAdWrapperTop = this._defaults.sidebarAdWrapper.position().top;

			if($(".floating-toolbar").height()) {
				this._defaults.floatingToolbarHeight = parseInt($(".floating-toolbar").height(), 10); // this must be called here otherwise the above values are incorrect in IE9.
			}

			$(window).on('scroll', this.onScroll);
			$(window).on('resize', this.onScroll);
		}
	};

	ret.onScroll = function () {

		// currentScrollPosition to be compared to initial top position of sidebarAdWrapper (sidebarAdWrapperTop)
		var currentScrollPosition = $(window).scrollTop() + ret._defaults.floatingToolbarHeight + ret._defaults.floatingToolbarMenuHeight;

		// 810px retrieved from mediaquery
		var isWideScreen = Boolean ($(window).width() > 810);
		var isVeryScrolled = Boolean (currentScrollPosition > ret._defaults.sidebarAdWrapperTop);
		var isCurrentlyFixed = Boolean (ret._defaults.sidebarAdWrapper.css("position") == "fixed");

		if ( !isCurrentlyFixed || ret._defaults.toolbarChanged ) {
			if ( (isVeryScrolled) && isWideScreen) {
				ret._defaults.sidebarAdWrapper.css({
					"position": "fixed",
					"top": ( ret._defaults.floatingToolbarHeight + ret._defaults.floatingToolbarMenuHeight )+"px",
					"width": ret._defaults.sidebarAdWrapperWidth + "px"
				});
			}
		} else if ( isCurrentlyFixed ) {
			if( !isVeryScrolled || !isWideScreen ) {
				ret._defaults.sidebarAdWrapper.css({
					"position":"", "top":"", "width":""
				});
			}
		}

		ret._defaults.toolbarChanged = false;
	};

	ret.scrollOnLoad = function(){
		var containers = $('.article-context a[href^="#"], .sidebar-one-comment a[href^="#"], .article-updated-box a[href^="#"]'),
			isWideScreen = Boolean($(window).width() >= 840),
			offset = isWideScreen ? 30 : 61;

		containers.on('click', function() {
			var clickedLink = $(this).attr('href').split('#'),
				link = clickedLink[1],
				visibleEl = $('[name=' + link + ']').closest('.generated-article-body'); // the closest section group

			if (!visibleEl.hasClass('open')) {
				visibleEl.addClass('open');
			}

			if ($.browser.msie  && parseInt($.browser.version, 10) > 8) {
				scrollToElement('a[name="'+ link +'"]', 1000, -170);
			} else {
				scrollToElement('a[name="'+ link +'"]', 1000, -offset);
			}
		});

		if(window.location.hash) {
			var hashtag = window.location.hash;

			if(hashtag === "#reflist") {
				scrollToElement('#article-reports', 1000, -60);
			} else if(hashtag.indexOf("#plot") == 0) {
				scrollToElement(hashtag, 1000, -60);
			} else {
				scrollToElement('a[name="'+ window.location.hash.split('#')[1] +'"]', 1000, -offset);
			}
		}
	};

	ret.fixedScrollingToolbox = function() {
		var menuItems = $('.toolbar-menu-left ul li.dropdown-me, .toolbar-menu-right ul li.dropdown-me');
		menuItems.on('click', function(e){
			//var adjustStickyAd =    $(this).position().left + $(this).find(".dropdown-menu-container").width() >
			// $(".sidebar-ad-wrapper").position().left;
			var adjustStickyAd = false;

			if ($(e.target).hasClass("dropdown-menu-container") || $(e.target).parents(".dropdown-menu-container").length > 0)
				return;

			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).find('.dropdown-menu-container').toggleClass('is-hidden');
				$(this).find('.arrow-closed').toggleClass('arrow-opened');
				if( adjustStickyAd) {
					this._defaults.floatingToolbarMenuHeight = 0;
					this._defaults.toolbarChanged = true;
					this.onScroll();
				}
			} else {
				menuItems.removeClass('active');
				if(menuItems.find('.dropdown-menu-container').is(':visible')) {
					menuItems.find('.dropdown-menu-container').addClass('is-hidden');
					menuItems.find('.arrow-closed').removeClass('arrow-opened');
					this._defaults.floatingToolbarMenuHeight = 0;
					this._defaults.toolbarChanged = true;
					this.onScroll();
				}
				$(this).addClass('active');
				$(this).find('.dropdown-menu-container').toggleClass('is-hidden');
				$(this).find('.arrow-closed').toggleClass('arrow-opened');
				if( adjustStickyAd) {
					this._defaults.floatingToolbarMenuHeight = $(this).find('.dropdown-menu-container').outerHeight();
					this._defaults.toolbarChanged = true;
					this.onScroll();
				}
			}
		});
	};

	ret.showScrollingToolbox = function() {
		var scrollToolbar = $('.floating-toolbar'),
			menuBar = $('.navigation-menu, .js-navbar'),
			timelineContainer = $('.sidebar-container'),
			timeline = $('.article-timeline');
			msie6 = $.browser == 'msie' && $.browser.version < 7;
		if (!msie6) {
			var menuTop = menuBar.offset().top,
				timelinePos = timelineContainer.offset().top;
			$(window).scroll(function (event) {
				var m = $(this).scrollTop() - 20;
				if (m >= menuTop) {
					scrollToolbar.removeClass('is-hidden');
					//$('.sidebar').addClass('is-hidden');
				} else {
					scrollToolbar.addClass('is-hidden');
					$('.sidebar').removeClass('is-hidden');
				}
			});
		}
	};

	ret.autoHideToolboxDropdowns = function() {
		var menuItems = $('.toolbar-menu-left ul li.dropdown-me, .toolbar-menu-right ul li.dropdown-me');
		menuItems.on("mouseleave", function(e) {
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$(this).find('.dropdown-menu-container').addClass('is-hidden');
				$(this).find('.arrow-closed').toggleClass('arrow-opened');
			}
		});
	};

	ret.populateArticleNavigation = function() {
		$('.main-title').each(function(){
			var title = $(this).html(),
				idToScrollTo = $(this).attr('id'),
				html = '<li><a href="#" goTo="' + idToScrollTo + '">' + title + '</a></li>';
			$('#dropdown-links').append(html);
		});

		var currentAnchor;

		$('#dropdown-links li a').on('click', function(e){
			e.preventDefault();

			var $this = $(this),
				anchor = $this.attr('goTo'),
				isClicked = $this.attr('data-clicked');

			if(anchor != currentAnchor) {
				$('#dropdown-links li a').removeAttr('data-clicked');
			}

			currentAnchor = anchor;

			if(isClicked == "true") {
				return;
			} else {
				scrollToElement('#' + anchor, 1000, -60);
				$this.attr('data-clicked', 'true');
			}
		});
	};

	ret.scrollStaticElements = function() {
		var menuItems = $('.toolbar-menu-left ul li.dropdown-me, .toolbar-menu-right ul li.dropdown-me'),
			scrollClickElements = $('#view-comments, #view-referees, #short-link, .timeline-report-link, .bubble-content.is-interactive, .all-comments-link, .add-new-comment-sidebar, .see-all-reports-sidebar, .see-all-comments-sidebar, .see-all-article-timeline, .sidebar-comments-count .heading, .collective-author');

		scrollClickElements.on('click', function(e){
			e.preventDefault();

			$(menuItems).each(function(){
				if($(this).hasClass('active')) {
					$(this).removeClass('active');
					$(this).find('.dropdown-menu-container').toggleClass('is-hidden');
					$(this).find('.arrow-closed').toggleClass('arrow-opened');
				}
			});

			var targetAttribute = $(this).attr('target-attr');

			if(targetAttribute === "comments-container") {
				scrollToElement('#article-comments', 500, -30);
			} else if(targetAttribute === "comments") {
				scrollToElement('#add-new-comment', 500, -80);
			} else if(targetAttribute === "referees") {
				scrollToElement('#add-new-report-comment', 500, -80);
			} else if(targetAttribute === "collective-authors") {
				scrollToElement(".back-section h2:eq(0)", 500, -70);
			} else if($("[name='"+targetAttribute+"']").length > 0) {
				scrollToElement("[name='"+targetAttribute+"']", 500, -70);
			}

			if($(this).hasClass('add-new-comment-sidebar')) {
				setTimeout(function() {$('.add-new-comment').click();}, 520);
			}
		});
		$('.btt').on('click', function(e){
			e.preventDefault();
			scrollToElement('.header-wrapper', 500);
		});
	};

	return ret;

})(jQuery, window, undefined );