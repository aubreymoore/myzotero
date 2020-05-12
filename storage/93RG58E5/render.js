(function($){var openClose={clickEvents:function(){var lastScrollY=0;var NAV_COOKIE_EXPIRY=365;var NAV_BREAKPOINT=1269;$(".nav-toggle").click(function(){var $navCollapsible=$(".nav-collapsible");var navCollapsedClass="nav-collapsed";var $nav=$("#nav");var $this=$(this);var BREAKPOINT=660;var WINDOW_WIDTH=$(window).innerWidth();if(WINDOW_WIDTH<=BREAKPOINT&&$this.hasClass("open-nav"))lastScrollY=$(window).scrollTop();$(".secondary-nav,.tertiary-nav").removeClass("visible");$nav.toggleClass("expanded compressed");
$this.toggleClass("open-nav close-nav");$navCollapsible.toggleClass(navCollapsedClass);myPage.setCookie(navCollapsedCookie,$navCollapsible.hasClass(navCollapsedClass).toString(),NAV_COOKIE_EXPIRY);if(WINDOW_WIDTH<=BREAKPOINT)if($this.hasClass("open-nav"))$(window).scrollTop(lastScrollY);else $nav.scrollTop(0)})},runEvents:function(){this.clickEvents()}};var scrolling={hideAndShow:function(){var $siteLogo=$(".site-logo-wrapper");var $searchBar=$(".pb-f-search-search-bar");var scrollLog=[];function hideAndShow(){var top=
$(window).scrollTop(),isNavExpanded=$("#nav").hasClass("expanded"),windowWidth=$(window).width();scrollLog.push(top);scrollLog=scrollLog.slice(-2);var prevScrollPos=scrollLog[0],currScrollPos=scrollLog[1];if(currScrollPos>prevScrollPos&&currScrollPos>80&&!isNavExpanded&&windowWidth<1269){$siteLogo.addClass("offscreen");$searchBar.addClass("pull-right")}else{$siteLogo.removeClass("offscreen");$searchBar.removeClass("pull-right")}}$(window).smartscroll(hideAndShow,25)},runEvents:function(){this.hideAndShow()}};
var init=function(){openClose.runEvents();scrolling.runEvents()};init()})(jQuery);
(function($){function placeAdOnVideoPages(){var pageType=$("meta[name\x3dpageType]").attr("content");if(pageType=="video"){var $adTarget=$(".box-ad-wrapper").first();if(window.matchMedia("(max-width: 1269px)").matches){var $insertionTarget=$(".pb-f-video-video-player").parent().parent().next();$insertionTarget.after($adTarget)}else $(".col-lg-8.col-md-12.col-sm-12.col-xs-12").after($adTarget)}}placeAdOnVideoPages();$(window).smartresize(placeAdOnVideoPages);var nativeOffsiteFeature=$(".pb-feature:has(#nativeoffsite)");
var nativeOffsiteAd=nativeOffsiteFeature.find(".ad-container");var globalFooterFeature=$(".pb-feature.pb-f-global-footer");function moveNativeOffsiteAd(){var inRightRail=$(".right-rail #nativeoffsite").length>0;if($(window).width()<810&&inRightRail){nativeOffsiteAd.remove();nativeOffsiteAd.insertBefore(globalFooterFeature)}else if($(window).width()>=810&&!inRightRail){nativeOffsiteAd.remove();nativeOffsiteFeature.prepend(nativeOffsiteAd)}}moveNativeOffsiteAd();$(window).smartresize(moveNativeOffsiteAd);
var bRunningLazyFrame=false;function initLazyFrame(){var $elements=$(".js-lazyIframe");runLazyFrame($elements);if($elements.length>0)$(window).scroll(function(){runLazyFrame($elements)})}function runLazyFrame($elements){if(!bRunningLazyFrame){bRunningLazyFrame=true;$elements.each(function(){if(isFrameVisible(this))loadFrameSRC(this)});setTimeout(function(){bRunningLazyFrame=false},400)}}function isFrameVisible(elem){var bVisible=false;var vThreshold=600;var top_of_element=$(elem).offset().top-vThreshold;
var bottom_of_element=$(elem).offset().top+$(elem).outerHeight();var bottom_of_screen=$(window).scrollTop()+$(window).height();var top_of_screen=$(window).scrollTop();if(bottom_of_screen>top_of_element&&top_of_screen<bottom_of_element)bVisible=true;return bVisible}function loadFrameSRC(elem){if($(elem).attr("src").length<1){var url=$(elem).attr("data-src");$(elem).attr("src",url)}}initLazyFrame()})(jQuery);

;(function($){
  var logger = new ARC.Tools.logger('MY_NEWS');

  var LOGIN_URL = '/account/profile/login/',
      REGISTER_URL = '/account/profile/register/',
      MORE_URL = 'https://nzherald.custhelp.com/app/answers/list/c/18',
      PROFILE_URL = '/account/profile/?tab=profile',
      NEWSLETTER_URL = '/account/profile/?tab=newsletters&ref=nav';

  var audienceAPI = {};
      audienceAPI.logout = 'https://secure.nzherald.co.nz/api/profile/logout';
      audienceAPI.deleteArticle = 'https://secure.nzherald.co.nz/api/SaveForLater/delete/';
      audienceAPI.getSavedArticles = 'https://secure.nzherald.co.nz/api/SaveForLater/get/';

  var myNews = {
    openClose : function () { // Opens and closes the My News menu.
      $('.header-arrow-my-news').on('click',function(){
        $(this).toggleClass('open').toggleClass('closed');
        $('.saved-content').toggleClass('collapsed');
      });
    },
    runEvents : function () {
      this.openClose();
    }
  };

  //Signs the user in client side.
  var signIn = {
    profileInfo : {
      firstName : null,
      lastName  : null,
      authToken : null,
      setUp: function(){
        var syncData = Boolean(myPage.getCookie('syncData')) ?
                       JSON.parse(myPage.getCookie('syncData'))['t'] :
                       '';
        this.firstName = myPage.getCookie('sfn');
        this.lastName = myPage.getCookie('sln');
        this.authToken = syncData;
      }
    },
    loggedOutUserHTML : function(){
      return (
        '<div class="user-name">' +
          '<a href="' + LOGIN_URL + '">Sign into your NZ Herald</a>' +
        '</div>' +
        '<ul class="profile-options">' +
          '<li><a href="' + REGISTER_URL + '">Register here</a></li>' +
          '<li><a href="' + MORE_URL + '">Find out more</a></li>' +
        '</ul>'
      );
    },
    loggedOutMyNewsHTML : function() {
      return (
        '<div class="title-saved-content">Your news how you want it.</div>'+
        '<div class="blurb-saved-content">On the go and no time to finish that story right now? Your News is the place for you to save content to read later from any device. Register with us and content you save will appear here so you can access them to read later.</div>'+
        '<ul>' +
          '<li><a href="'+MORE_URL+'">Find out more</a></li>'+
          '<li><a href="'+REGISTER_URL+'">Register now</a></li>'+
        '</ul>'
      )
    },
    loggedInHTML : function(){
      return (
        '<li><a href="' + PROFILE_URL + '">Profile</a></li>' +
        '<li><a href="' + NEWSLETTER_URL + '">Newsletters</a></li>'+
        '<li class="logout"><a href="#">Sign out</a></li>'
      );
    },
    removeUserCookies : function(){
      logger.log('removeCookies');
      var cookiesToRemove = ["sfn","sln","cui","subid","cexp","ev_ss","syncData","bAuthenticated","nzh_b_cache"];
      cookiesToRemove.forEach(function(cookie){
        $.removeCookie(cookie, { path: '/', domain: '.nzherald.co.nz'});
      });
    },
    logOutInit : function() {
      logger.log('logOut');
      var self = this;
      $('.user-profile').on('click', '.logout', function(e) {
        e.preventDefault();
        //Remove all associated cookies
        self.removeUserCookies();
        // removing 'logged in' DOM elements immediately --
        // not waiting for AJAX success to remove (feels more responsive)
        $('.user-information').html(self.loggedOutUserHTML());
        $('.saved-content').html(self.loggedOutMyNewsHTML());
        $('.pb-f-navigation-saved-article').remove();
        savedArticles.injectArticleNumber();
        $.ajax({
          method: 'POST',
          url: audienceAPI.logout,
          headers: {
            'nzh-token': encodeURIComponent(self.profileInfo.authToken)
          },
          data: {
            channel_id: mobile_browser ? 2 : 3,
            user_agent: encodeURIComponent(navigator.userAgent)
          },
          success: function(data){
            logger.log('logOut:success:'+data);
          },
          error: function(err){
            logger.log('logOut:error:'+err);
          },
          fail: function(err){
            logger.log('logOut:fail:'+err);
          }
        })
      })
    },
    logIn : function () {
      logger.log('logIn');
      this.profileInfo.setUp();

      var loggedIn = Boolean(
        this.profileInfo.firstName &&
        this.profileInfo.lastName  &&
        this.profileInfo.authToken
      );

      if (loggedIn) {
        //check if user has bookmarks in queue from before logging in
        var bookmarkToSave = $.cookie('nzh_b_cache');
        if(bookmarkToSave) {
          var token = this.profileInfo.authToken;
          $.removeCookie("nzh_b_cache", { path: '/', domain: '.nzherald.co.nz'});

          // add cached bookmark to saved articles
          var data = '{"nzh-token":"'+token+'","is_active":"1","object_id":"'+ bookmarkToSave +'","object_type_id":"1"}'
          $.ajax({
            type: "POST",
            url: "https://secure.nzherald.co.nz/api/SaveForLater/save/",
            data: data,
            contentType: "application/json",
            dataType: "text",
            complete: function(data) {
              //load saved articles AFTER adding cached one
              savedArticles.init(token);
              logger.log('bookmarkToSave:complete:'+data);
            }
          });
        }

        // once logged in state is confirmed, initialize logout listener
        this.logOutInit();

        $('.user-name').html(
          decodeURI(this.profileInfo.firstName) + ' ' + decodeURI(this.profileInfo.lastName)
        );

        $('.profile-options').html(this.loggedInHTML());
        if(!bookmarkToSave) {
          //only init savedArticles, if there has not been a bookmark to be saved from cookie, otherwise savedArticles will
          //be initiated after ajax call (see line 122 in this file)
          savedArticles.init(this.profileInfo.authToken);
        }
      }

      $('.user-profile').addClass('visible');

    },
    getUserId : function() {
        // Returns User ID if cookie exists and is not empty, otherwise returns empty string
        return ($.cookie('cui') && $.cookie('cui').length>0) ? $.cookie('cui') : '';
    },
    isLoggedIn : function() {
        return Boolean(
          this.profileInfo.firstName &&
          this.profileInfo.lastName  &&
          this.profileInfo.authToken
      );
    },
    trackLotame : function() {
        var sUserId  = this.getUserId();
        // Send lotame call only for logged in users
        if (this.isLoggedIn() && (sUserId!='') ) {
            var sUrl     = '//bcp.crwdcntrl.net/5/c=5227/tp=HRLD/tpid='+sUserId+'/seg=logged_in_user';
            // Use img tag to send request. Ajax get doesnt work because a 1x1 pixel image/gif is returned.
            $('head').append('<img src="' + sUrl + '" style="display:none;" />');
        }
    },
    runEvents : function () {
      this.logIn();
      this.trackLotame();
    }
  };
  // get saved article content
  var savedArticles = {
    articlesHTML : '<h2 class="my-saved-content">my saved content:</h2>',
    authToken : '',
    init : function(authToken){
        logger.log('savedArticles');
        this.authToken = authToken;
        this.getAllSaved(this.authToken);
    },
    handleDelete : function(articlesObj, articleCat){
      $('.saved-content').on('click', '.article-close-icon', function(){
        var $self = $(this);
        if(window.confirm("Delete from your \"Saved Articles?\"")){
          var articleObjId = $(this).siblings('.content-wrapper')
                                    .children('.article-title')
                                    .attr('id');
          var articleToDelete = articlesObj.data[articleCat].filter(function(article){
            return article.object_id.toString() === articleObjId;
          });

          $self.closest('.saved-article-wrapper').remove();
          savedArticles.injectArticleNumber();
          $.ajax({
            url: audienceAPI.deleteArticle,
            headers: {
              'nzh-token': encodeURIComponent(savedArticles.authToken)
            },
            data: { 'saved_id': articleToDelete.pop().id },
            method: 'POST',
            success: function(response){
              logger.log('savedArticles:success:'+response);
            },
            error: function(err){
              logger.log('savedArticles:error:'+err);
            },
            fail: function(err){
              logger.log('savedArticles:fail:'+err);
            }
          });
        }
      });
    },
    fetchArticles : function(articlesObj, articleCat, callbacks){
      logger.log('fetchArticles');
      // articleObjIds is a formatted string used in the params passed to Content API
      // in the AJAX call below
      var articleObjIds = (function formatFeedParam(){
        var objIds = articlesObj.data[articleCat].map(function(article){
          return article.object_id;
        }).join('+OR+');
        return '(' + objIds + ')';
      })();

      // should you need to modify the params sent to Content API, do so here
      var params = {
        "Query": "source.source_id:" + articleObjIds,
        "Feed-Offset":0,
        "Feed-Order":"publish_date:desc",
        "Feed-Limit":10
      };

      var URL = '/pb/api/v2/render/feature/navigation/saved-article?contentConfig=';

      $.ajax({
        url: URL + encodeURI(JSON.stringify(params)),
        success: function(response){
          var htmlStr = response.rendering;
          $('.saved-content').html(htmlStr);
          // after rendering saved articles to DOM, do additional actions
          callbacks.forEach(function(cb){ cb() });
        },
        error: function(err){
          logger.log('fetchArticles:error:'+err);
        },
        fail: function(err){
          logger.log('fetchArticles:fail:'+err);
        }
      });
    },
    injectArticleNumber : function(){
      var numOfArticles = $('.saved-article-wrapper').length;
      if(numOfArticles) {
        $('.number-content').text('(' + numOfArticles + ' saved content)')
      } else {
        $('.number-content').text("");
        $('.saved-content').html(this.zeroArticlesHTML());
      }
    },
    zeroArticlesHTML : function(){
      return (
        '<div class="title-saved-content">Your news how you want it.</div>' +
        '<div class="blurb-saved-content">' +
          'On the go and no time to finish that story right now? Your News is the place for you to save content to read later from any device. Content you save will appear here so you can access them to read later. Look out for the bookmark icon on article pages.' +
        '</div>'
      );
    },
    getAllSaved : function(token){
      logger.log('getAllSaved');
      var encodedToken = encodeURIComponent(token);
      $.ajax({
        url: audienceAPI.getSavedArticles,
        headers: { 'nzh-token': encodedToken },
        success: function(response) {
          // if there are saved, unread articles, start the process of
          // rendering them, otherwise change text
          if(response.data['aUnread'].length){
            savedArticles.fetchArticles(
              response,
              'aUnread',
              [
                savedArticles.handleDelete.bind(null, response, 'aUnread'),
                savedArticles.injectArticleNumber
              ]
            );
          } else {
            $('.saved-content').html(savedArticles.zeroArticlesHTML());
          }
        },
        error: function(error){
          logger.log('getAllSaved:error:'+error);
        },
        fail: function(error){
          logger.log('getAllSaved:fail:'+error);
        }
      });

    },
  };

  var init = function () {
    myNews.runEvents();
    signIn.runEvents();
  };

  init();

})(jQuery);

(function($){var mobile=isMobile.any();var primaryNav={expandCollapse:function(){$(".toggle-expand").click(function(){$(this).toggleClass("open").toggleClass("closed");$(this).closest(".header").siblings(".left-navigation").find(".primary-nav").toggleClass("expanded")})},runEvents:function(){this.expandCollapse()}};var secondaryNav={close:function(){$(".nav-back").click(function(){$(this).closest(".tertiary-nav,.secondary-nav").removeClass("visible")})},hoverToOpen:function(){$(".primary-nav-item").mouseenter(function(){var $nav=
$(this),navId=$nav.attr("data-nav-id"),$subMenu=$('.secondary-nav[data-nav-id\x3d"'+navId+'"]'),$arrow=$nav.find("img"),$arrows=$(".primary-nav-arrow"),section=$nav.attr("data-section");var setCloseBtnColor=function(){var prefix="section-";var $toggle=$(".nav-toggle")[0]||false;if($toggle){var classes=$toggle.className.split(" ").filter(function(c){return c.lastIndexOf(prefix,0)!==0});$(".nav-toggle")[0].className=classes.join(" ").trim()}};var resetSubmenus=function(){$(".secondary-nav").removeClass("visible");
setCloseBtnColor();$arrows.show()};var showSubMenu=function(){resetSubmenus();$subMenu.addClass("visible");$arrow.hide();$(".nav-toggle").addClass(section)};var timeout=window.setTimeout(showSubMenu,1E3);$(".tertiary-nav").removeClass("visible");resetSubmenus();if(!mobile&&$(window).width()>=660)$subMenu.mouseleave(function(){resetSubmenus()});$nav.mouseleave(function(event){var leftOffset=$(".pb-f-navigation-menu").eq(0).offset().left;var navWidth=$nav[0].offsetWidth;var navRightEdge=leftOffset+
navWidth;if(event.clientX<navRightEdge&&$(window).width()>=660)resetSubmenus();clearTimeout(timeout)})})},tapToOpen:function(){$(".primary-nav-item").click(function(){var navId=$(this).attr("data-nav-id");var $subMenu=$('.secondary-nav[data-nav-id\x3d"'+navId+'"]');$(".secondary-nav,.tertiary-nav").removeClass("visible");$subMenu.addClass("visible")})},runEvents:function(){mobile?this.tapToOpen():this.hoverToOpen();this.close()}};var tertiaryNav={tapToOpen:function(){$(".secondary-nav-item").click(function(){var navId=
$(this).attr("data-nav-id");var $subMenu=$('.tertiary-nav[data-nav-id\x3d"'+navId+'"]');$subMenu.addClass("visible")})},runEvents:function(){this.tapToOpen()}};var init=function(){primaryNav.runEvents();secondaryNav.runEvents();tertiaryNav.runEvents()};init()})(jQuery);
(function($){var trendingTopics={expandCollapse:function(){$(".trending-expand").click(function(){$(this).toggleClass("open").toggleClass("closed");$(this).closest(".header").siblings(".items-text-scss").find(".trending-list").toggleClass("expanded")})},runEvents:function(){this.expandCollapse()}};trendingTopics.runEvents()})(jQuery);

(function($){var featureAPI={root:".pb-f-bars-event-bar ",counter:0,eventBar:function(){},loadData:function(){var $el=$(featureAPI.root+"#event-alert"),reload=$el.data("reload"),url=$el.attr("data-href"),barType=$el.attr("data-bar-type");if(!reload)featureAPI.stopTimer();else $.get(url,function(data){var html=$(data.rendering).find(".rendered-alert").html(),$renderEl=$(featureAPI.root+".rendered-alert"),hasNews=$(data.rendering).find("#event-alert").data("has-news"),sameNews=$renderEl.html()==html;
if(!hasNews)$(featureAPI.root+"#event-alert").addClass("hidden");else if(hasNews&&!sameNews||featureAPI.counter==0){$renderEl.html(html);$(featureAPI.root+"#event-alert").removeClass("hidden");bar.marquee();featureAPI.counter++}}).fail(function(response){featureAPI.stopTimer()})},stopTimer:function(){clearInterval(featureAPI.eventBar)},startTimer:function(){featureAPI.eventBar=setInterval(function(){featureAPI.loadData()},2E4)},runEvents:function(){featureAPI.loadData();this.startTimer()}};var bar=
{root:".pb-f-bars-event-bar ",closingTime:function(){$(bar.root+".bar-close-btn").on("click",function(){$(bar.root+".bar-wrapper").parent().remove();featureAPI.stopTimer()})},marquee:function(){var $el=$(bar.root+".event-item"),itemWidth=$(bar.root+".event-item").width(),textWrapperWidth=$(bar.root+".bar-text").width(),closeBtnWidth=$(bar.root+".bar-close-btn").width(),difference=itemWidth-textWrapperWidth;if(itemWidth+closeBtnWidth>textWrapperWidth)$el.delay(1500).animate({"left":-difference-closeBtnWidth-
20},5E3,"linear",function(){$el.delay(2E3).animate({"left":0},500,"linear",function(){$el.css("left","")})})},runEvents:function(){this.closingTime(featureAPI);this.marquee()}};var resize={runEvents:function(){$(window).smartresize(function(){bar.marquee()},500,false)}};var init=function(){bar.runEvents();featureAPI.runEvents();resize.runEvents()};init()})(jQuery);
(function($){var $item=$(".pb-f-bars-breaking-news-bar .breaking-news-item"),$barLabel=$(".pb-f-bars-breaking-news-bar #breaking-alert .bar-label"),$closeBtn=$(".pb-f-bars-breaking-news-bar .bar-close-btn"),$barWrapper=$(".pb-f-bars-breaking-news-bar #breaking-alert.bar-wrapper");var breakingNews={};var spoofContent=[{"inclusions":[1503438],"titleimage":"//media.nzherald.co.nz/webcontent/eventbar/TC-Event-Bar.jpg","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
"id":206534,"url":"/rotorua-daily-post/news/article.cfm?c_id\x3d1503438\x26objectid\x3d11818983","clickmap":"homeEVT","type":"event","title":""}];var reloadScript={breakingNewsUrl:"",spoofDetected:function(){return $("[data-spoof]").attr("data-spoof")==="true"},breakingNewsBar:function(){},renderNews:function(data){var currentText=$item.text(),isNewItem=currentText!==data.text,link=data.url;function addItem(item,linkUrl){$item.text(item).attr("href",linkUrl)}if(data.text&&$barWrapper.hasClass("hidden")){addItem(data.text,
link);$barWrapper.removeClass("hidden");bar.marquee()}else if(data.text){if(isNewItem){$item.text("");setTimeout(function(){addItem(data.text,link);bar.marquee()},1E3);bar.reset()}}else{$barWrapper.addClass("hidden");$item.text("");bar.reset()}},loadData:function(){if(!this.spoofDetected())$.ajax({url:"//syndication.nzherald.co.nz/shareddata/newsbar/newsbarscript.js",dataType:"script"}).success(function(){var newsToRender=sNZHBreakingNews.length?sNZHBreakingNews[0]:{text:null,url:null};if(newsToRender.url){reloadScript.breakingNewsUrl=
newsToRender.url;if(!userActions.hasClosedStory(newsToRender.url))reloadScript.renderNews(newsToRender)}}).fail(function(error){console.error(error)});else if(!userActions.hasClosedStory(spoofContent[0].url)){reloadScript.breakingNewsUrl=spoofContent[0].url;reloadScript.renderNews(spoofContent[0])}},stopTimer:function(){clearInterval(reloadScript.breakingNewsBar)},startTimer:function(){reloadScript.breakingNewsBar=setInterval(function(){reloadScript.loadData()},2E4)},runEvents:function(){reloadScript.loadData();
this.startTimer()}};var bar={closingTime:function(){$closeBtn.on("click",function(){myPage.setCookie("breakingNewsId",stringParsers.getUrlParam("objectid",reloadScript.breakingNewsUrl).value,1);$barWrapper.parent().remove();reloadScript.stopTimer()})},tickTime:function(width){var speed=150;return width/speed},reset:function(){$item.css("left","0px")},marquee:function(){var barWrapperWidth=$barWrapper.width(),closeBtnWidth=$closeBtn.width(),itemWidth=$item.outerWidth(true),barWrapperPosition=$barWrapper.css("position"),
barLabelwidth=barWrapperPosition!=="fixed"?$barLabel.outerWidth():0,distanceLeft=barWrapperWidth-(itemWidth+closeBtnWidth+barLabelwidth),headlineOverflows=itemWidth>barWrapperWidth-(closeBtnWidth+barLabelwidth);var browserTransitionStr="webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";function tickAcross(){if($item.css("left")!=="0px")$item.css("transition","left "+bar.tickTime(-distanceLeft)/4+"s linear 2s").css("left",0+"px");else $item.css("transition","left "+bar.tickTime(-distanceLeft)+
"s linear 2s").css("left",distanceLeft+"px")}if(headlineOverflows){tickAcross();$item.one(browserTransitionStr,function(){bar.marquee()})}},runEvents:function(){this.closingTime()}};var resize={runEvents:function(){$(window).smartresize(function(){bar.reset();bar.marquee()},1500,false)}};var userActions={hasClosedStory:function(link){var id=stringParsers.getUrlParam("objectid",link).value;return id===myPage.getCookie("breakingNewsId")}};var init=function(){bar.runEvents();reloadScript.runEvents();
resize.runEvents()};init()})(jQuery);
(function($){var headerBar={init:function(){this.hammerTime()},checkSwipe:function(e){if(e.pointerType==="mouse")return false;if($(e.target).closest(".pb-feature").hasClass("pb-f-article-slideshow"))return false;if($(e.target).closest(".pb-feature").hasClass("pb-f-global-horoscope-slider"))return false;if($(e.target).closest(".pb-feature").hasClass("pb-f-ads-ad")&&$(e.target).closest(".pb-feature").find(".slider").length>0)return false;if($(e.target).closest(".pb-chain").hasClass("pb-c-image-row"))return false;
if($(e.target).closest(".pb-chain").hasClass("pb-c-slider-chain"))return false;if($(e.target).closest(".extra-shares").length>0)return false;if($(e.target).closest(".pb-c-rail-chain").hasClass("show-mobile"))return false;if($(e.target).closest(".pb-feature").hasClass("pb-f-photo-gallery"))return false;if($("#nav").hasClass("expanded"))return false;return true},hammerTime:function(){var carouselTime=new Hammer($("#pb-root")[0],{cssProps:{userSelect:true}});carouselTime.on("swiperight",this.swipeRightHandler);
carouselTime.on("swipeleft",this.swipeLeftHandler)},swipeRightHandler:function(event){if(headerBar.checkSwipe(event)){var url=$("#prev").data("url");if(url)window.location.href=url}},swipeLeftHandler:function(event){if(headerBar.checkSwipe(event)){var url=$("#next").data("url");if(url)window.location.href=url}}};headerBar.init();$(".nav-expand").on("click",function(){$(".nav-toggle").click()})})(jQuery);
(function(){var init=function(){var listChain=document.querySelector(".pb-c-list-chain");$(listChain).next().andSelf().wrapAll('\x3cdiv class\x3d"article-chains-wrapper clearfix"\x3e\x3c/div\x3e')};init()})();
var autoplay;(function($){function iconEvents(){$(".right-rail-trigger, .right-rail .close-icon").click(function(){$(".right-rail").toggleClass("show-mobile");$("html, body").toggleClass("right-rail-no-scroll");$(this).trigger("open_right_rail",{"name":"articleellipses"})})}iconEvents()})(jQuery);
(function($){var bylineFeat=$(".byline")[0],shareBar=$(".byline-shares"),scrollLog=[];$(window).scroll(function(){pxFromTop=$(window).scrollTop();scrollLog.push(pxFromTop);scrollLog=scrollLog.slice(-2);var prevScrollPos=scrollLog[0],currScrollPos=scrollLog[1];if($(window).width()<810)if(pxFromTop>$(bylineFeat).offset().top+$(bylineFeat).height()){$(shareBar).addClass("share-fixed");if(prevScrollPos<currScrollPos)$(shareBar).addClass("show-share").removeClass("hide-share");else $(shareBar).addClass("hide-share").removeClass("show-share")}else $(shareBar).removeClass("share-fixed").removeClass("hide-share").removeClass("show-share")});
$(window).resize(function(){if($(shareBar).hasClass("share-fixed")&&$(window).width()>810)$(shareBar).removeClass("share-fixed").removeClass("hide-share").removeClass("show-share")})})(jQuery);
(function($){$(".element-related-link a").on("click",function(event){event.preventDefault();var target=$(this).attr("href");$(this).trigger("link_offsite",{"name":"articleinl;externallink"});window.open(target)});$("body").on("click",".vjs-poster",function(event){$(this).trigger("play_video",{"name":"articleinl;video"})});$("body").on("click",".vjs-big-play-button",function(event){$(this).trigger("play_video",{"name":"articleinl;video"})});var monitor=setInterval(function(){var elem=document.activeElement;
if(elem&&elem.tagName=="IFRAME"){clearInterval(monitor);$(this).trigger("play_audio",{"name":"articleinl;audio"})}},100);$(".fullscreen-btn").on("click",function(event){var $elementImage=$(event.target).closest(".element-image");$elementImage.addClass("full-screen");if(isMobile.any())$elementImage.addClass("is-mobile");else $elementImage.removeClass("is-mobile");$("html, body").addClass("image-modal-no-scroll");responsivelyLazy.run()});$(".fullscreen-close-btn").on("click",function(event){$(event.target).closest(".element-image").removeClass("full-screen");
$("html, body").removeClass("image-modal-no-scroll");responsivelyLazy.run()});$(".fullscreen-caption-toggle").on("click",function(event){var $this=$(this);var $imageCaption=$this.closest("figcaption");$imageCaption.toggleClass("closed")});if(window.innerWidth>660){var $imageCaption=$("figcaption");var $imageCaptionToggle=$(".image-caption-toggle");$imageCaption.toggleClass("closed")}})(jQuery);

(function($){var chainFunctions={"triplet-image":function($chain){$chain.find(".col-sm-4").removeClass("col-sm-4").addClass("col-sm-3")},"sub-hero-full-300-250":function($chain){$chain.find(".portrait-wrapper").removeClass("col-md-8").addClass("col-md-12");$chain.find(".native-ad-container").removeClass("col-md-6").addClass("col-md-4");$chain.find(".native-ad-container").siblings(".col-md-6").removeClass("col-md-6").addClass("col-md-4")}};var chainParams={"triplet-image":"TRIPLEPORT","sub-hero-full-300-250":"SUBHERO",
"sub-hero-full":"SUBHERO","sub-hero-half":"SUBHEROHALF","triple-large-image":"TRIPLELAND","image-row":"SUBHEROROW","quad-small-image":"QUADSMALL"};var nativeAd={injectScript:function(){var $ad=$(this),adEnabled=$ad.data("ad-enabled"),adCampaign=$ad.attr("data-campaign-type"),adExpirationDate=$ad.attr("data-expiration")||false,adStartDate=$ad.attr("data-start")||false,$chainWrapper=$ad.closest(".chain-wrapper"),enclosingChain=chainParams[$chainWrapper.attr("data-chain-type")],adHref=$ad.attr("data-href")+
"MODS\x3d"+enclosingChain+"/";adScript='\x3cscript src\x3d"'+adHref+'" data-nativeslot\x3d"'+$ad.attr("data-ad-position")+'"\x3e\x3c/script\x3e';var notExpired=function(expiration){var expirationTime=new Date(Number(expiration)),currentTime=new Date;return expirationTime>currentTime};var hasStarted=function(start){var startTime=new Date(Number(start)),currentTime=new Date;return startTime<currentTime};console.log("enclosingChain: "+enclosingChain+"; adEnabled: "+adEnabled+"; adCampaign: "+adCampaign+
"; hasStarted: "+hasStarted(adStartDate)+"; notExpired: "+notExpired(adExpirationDate));function showAd(){return adEnabled&&adCampaign=="cost-per-click"||adEnabled&&adCampaign=="tenancy"&&hasStarted(adStartDate)&&notExpired(adExpirationDate)}if(showAd()){var $chainWrapper=$ad.closest(".chain-wrapper");var chainType=$chainWrapper.attr("data-chain-type");if(chainFunctions[chainType])chainFunctions[chainType]($chainWrapper);$ad.append(adScript);$ad.closest(".native-ad-container").addClass("onscreen ad-on");
$chainWrapper.addClass("native-on")}else $ad.closest(".native-ad-container").remove();$chainWrapper.trigger("native-ad-container-processed")},adActions:function(){$(".pb-native-ad-container").each(this.injectScript)},runEvents:function(){this.adActions()}};var init=function(){nativeAd.runEvents()};init()})(jQuery);


