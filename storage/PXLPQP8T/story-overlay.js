!function(){var e="undefined"!=typeof JSON&&"querySelector"in document&&"addEventListener"in window?"jquery_modern":"jquery_legacy";define("jquery",[e],function(){return jQuery})}(),define("modules/companion/companion-story-carousel",["jquery","underscore","utils","pubsub","modules/carousel/carousel","modules/carousel/gallery","directAdPosition"],function(e,i,t,s,a,n,l){"use strict";var r=a.extend({adSetup:!1,throttled:!1,initialize:function(t){i.bindAll(this,"refreshAdPosition"),this.pubSub=e.extend({"carousel:switchSlide":this.refreshAdPosition,"hor:scrollbar:update:compGalleryThumbs":this.lazyLoad},this.pubSub),a.prototype.initialize.call(this,t)},lazyLoad:function(){this.loaded||(t.lazyLoadImage(this.$(".thumb-image").slice(7)),this.loaded=!0)},_initializeGallery:function(e,i,t,s){this.subviews.gallery=new n({ads:t,el:s?this.$(s):this.$el,index:this.index,imageLazySrcAttr:e,slideTransition:i,carousel:this,isSideBarOpen:this.isSideBarOpen,triggerAdRefresh:!0,galleryClass:".companion-story-gallery"})},destroy:function(e){e&&this.$el.parent().remove(),a.prototype.destroy.call(this,!1)},setupAd:function(){var e,i=this.$el.data();i&&(e={},t.getNested(this.subviews.gallery)&&this.subviews.gallery.getAdTargeting()&&(e=this.subviews.gallery.getAdTargeting()),this.subviews.companionAd=new l({el:this.options.adSlot.children(".partner-placement"),adPlacement:"poster_gallery_companion",adSizes:["mediumrectangle"],targeting:e}),this.adSetup=!0)},refreshAdPosition:function(){this.subviews.companionAd&&!this.throttled&&(this.subviews.companionAd.refreshPosition(),this.throttled=!0,setTimeout(i.bind(function(){this.throttled=!1},this),2e3))}});return r}),define("apps/overlay/pages/story-overlay",["jquery","underscore","managers/routemanager","baseview","modules/companion/companion-story-carousel","pubsub","ui/loader","utils","modules/stories/share-facebook","modules/myCapture/myCapture"],function(e,i,t,s,a,n,l,r,o,d){"use strict";var h=s.extend({events:{"click .double-wide a":"processStoryLink","click .gallery-sidebar-close":"closeSidebar","click .fullscreen":"launchFullscreen","click .sidebar-gallery-btn":"launchGallery","click .gallery-util-bar-flyout-nav-btn":"onClickGalleryFlyoutNavBtn"},counter:10,initialize:function(t){this.$utility=e(".utility-bar-wrap"),this.$sharebar=e(".asset-inline-share-tools-bottom"),this.$rightad2=e(".partner-asset-right-ad-2"),this.$rightrail=e(".story-right-rail"),this.$closeoverlay=e(".close-overlay"),this.$overlayarrows=e(".overlay-arrows"),this.$storyimg=e(".single-photo.expandable-collapsed"),this.$index=0,this.$module=this.$(".companion-story-gallery"),this.$module.find(".gallery-sidebar-panel").show(),this.$refreshing=!1,i.bindAll(this,"mouseScroll","mouseClick","sidebarAds","setupAd","refreshAd","openSidebar","closeSidebar","sidebarCaption","launchGallery"),this.pubSub=e.extend({"entered:view:compStoryGallery":this.lazyLoad},this.pubSub),s.prototype.initialize.call(this,t),this.$caption=new Array(this.$module.length),this.$sponsorshipAd=new Array(this.$module.length),this.$module.each(i.bind(function(i,t){var s,n=e(t),l=n.find(".gallery-sidebar-title").html();n.addClass("companion-story-gallery"+i),this.$caption[i]=n.find(".gallery-sidebar-panel .caption").html(),n.find(".photo-count").length||(s='<div class="gallery-hover"><div class="photo-count">'+n.find(".thumb-item").length+'&nbsp;Photos</div><div class="gallery-hover-title">'+l+'</div></div><div class="gallery-film inactive"></div>',n.find(".companion-galleries").append(s),this._setCounterWidth(n),n.find(".companion-galleries").addClass("galleries")),this.subviews["facebook"+i]=new o({el:n.find(".gallery-sidebar-panel")}),this.subviews["gallery"+i]=new a({ads:!0,adSlot:n.find(".companion-galleries-partner-slot"),linkPath:n.find(".util-bar-flyout-nav-btn-facebook").data("share-link"),el:n.find(".companion-galleries"),fullScreen:!0,sidebarAds:this.sidebarAds})},this)),this.$galleryfilm=this.$(".gallery-film"),n.on("carousel:switchSlide",i.bind(function(e){e.hasClass("video-playlist-asset")||(e.find(".gallery-sidebar-panel").hasClass("active")||this.launchGallery(null,e),this.resetSections(),this.captionPoll=setInterval(this.sidebarCaption,200),this.refreshAd())},this)),this.setupAd(),this.$(".util-bar-flyout-section").hide(),this.$win=r.get("win"),this.$win.on("scroll."+this.cid,i.throttle(this.mouseScroll,1e3)),this.$win.on("click."+this.cid,this.mouseClick),this.resetAllButActive(),r.getNested(window.site_vars,"THIRDPARTYAPI","MYCAPTURE","ENABLED")&&!this.subviews.mycapture&&(this.subviews.mycapture=new d({el:this.$el,target:"js-mycapture-photo-asset"}))},lazyLoad:function(t){var s=e(t);r.lazyLoadImage(s.find(".gallery-photo-first")),r.lazyLoadImage(s.find(".thumb-image").slice(0,7)),this.$module.each(i.bind(function(i,t){var s=e(t);this._setCounterWidth(s)},this))},_setupAds:function(){this.$module.each(i.bind(function(i,t){var s=e(t).find(".partner-placement.poster"),a=this.subviews["gallery"+i];if(!this.$sponsorshipAd[i]){if(s.length)return this.$sponsorshipAd[i]=s,void(s.hasClass("partner-placement-visible")&&!r.getNested(a,"subviews","companionAd")&&a.setupAd());this.$sponsorshipAd[i]=e('<div class="partner-placement poster" data-monetization-id="sp-gallery" data-monetization-sizes="mediumrectangle"></div>'),e(t).find(".companion-galleries-partner-slot").append(this.$sponsorshipAd[i])}},this))},_setCounterWidth:function(e){var t=e.find(".slide.active .gallery-photo").width();t?e.find(".gallery-hover").css({width:t}):(this.counter--,this.counter?setTimeout(i.bind(function(){this._setCounterWidth(e)},this),100):e.find(".gallery-hover").css({width:""}))},refreshAd:function(){this.$refreshing||(this.$refreshing=!0,this.subviews["sponsorshipAd"+this.$index]&&this.subviews["sponsorshipAd"+this.$index].refreshPosition&&this.subviews["sponsorshipAd"+this.$index].refreshPosition())},sidebarAds:function(){this.$module.each(i.bind(function(i,t){return i==this.$index?e(t).find(".gallery-sidebar-panel").hasClass("active")?!0:!1:void 0},this))},processStoryLink:function(i){if(!i.isDefaultPrevented()){var s=e(i.currentTarget);s.attr("target")||t.isAjax(s.attr("href"))||(s.attr("data-uotrack","storyinlinelink"),s.attr("target","_blank"))}},setupAd:function(){this.adSetup=!0,this._setupAds()},closeSidebar:function(t){var s=null;t&&(t.preventDefault(),t.stopPropagation()),this.resetSections(),this.$(".sidebar-gallery-btn").addClass("active"),this.$module.each(i.bind(function(t,a){var n=e(a),l=n.find(".gallery-sidebar-panel");parseInt(l.outerWidth()+1,10);l.hasClass("active")&&(this.$(".util-bar-flyout-nav-btn").removeClass("active"),this._setCounterWidth(n),s=this.animate(l,"right",0,250,"ease-in-out").promise().done(i.bind(function(){n.find(".companion-galleries").removeClass("active"),n.find(".gallery-sidebar-close").removeClass("active"),n.find(".gallery-sidebar-panel").removeClass("active"),n.parent().find(".card-film").addClass("inactive"),this.$galleryfilm.addClass("inactive"),this.$utility.css("z-index",101),this.$sharebar.show(),this.$rightrail.show(),this.$rightad2.removeClass("hidden").removeClass("adFixed").css({position:"static",top:"auto"}),this.$closeoverlay.show(),this.$overlayarrows.show(),this.$storyimg.css("z-index",100),n.parent().parent().css("z-index","auto")},this))),n.find(".slide.active").hasClass("endslate")&&this.subviews["gallery"+t].switchSlide(0)},this))},openSidebar:function(){var t=null;this.$module.each(i.bind(function(s,a){var n=this.subviews["gallery"+s],l=e(a).find(".gallery-sidebar-panel"),o=parseInt(l.outerWidth()+1,10);s==this.$index&&(l.hasClass("active")||(this.lazyLoadThumbs(e(a)),n.refreshAdPosition(),t=this.animate(l,"right",-o+"px",250,"ease-in-out").promise().done(i.bind(function(){this.$rightad2.addClass("hidden"),this.$rightrail.hide(),this.$closeoverlay.hide(),this.$overlayarrows.hide(),l.addClass("active")},this)),this.$storyimg.css("z-index",0),r.getNested(n,"subviews","companionAd")||this.subviews["gallery"+s].setupAd()))},this))},sidebarCaption:function(){this.resetSections(),this.$module.each(i.bind(function(i,t){var s=e(t),a=s.find(".gallery-sidebar-panel"),n=s.find(".gallery-sidebar-panel .caption"),l=s.find(".slide.active .gallery-viewport-caption").html();a.hasClass("active")?(l!=this.$caption[i]&&(this.$caption[i]=l,clearInterval(this.captionPoll),this.$refreshing=!1),l?n.html(l):n.empty()):n.html()||(n.html(l),n.scrollTop(0))},this))},mouseScroll:function(t){this.$module.each(i.bind(function(i,t){var s,a,n,l=e(t),r=l.find(".gallery-sidebar-close"),o=l.find(".gallery-sidebar-panel");o.hasClass("active")&&(s=o.outerHeight(),a=l.position().top,n=e(window).scrollTop(),(n+50>a+s||a>n+200)&&r.click())},this))},lazyLoadThumbs:function(e){r.lazyLoadImage(e.find(".thumb-image").slice(7))},mouseClick:function(t){var s=this.$module.length+1;this.$module.each(i.bind(function(i,a){var l,r,o,d,h=e(a),c=h.find(".gallery-sidebar-close"),u=h.find(".gallery-sidebar-panel");u.hasClass("active")&&(n.trigger("carousel:cardfilmActive"),l=h.offset().top,r=h.offset().left,o=h.outerWidth()+u.outerWidth(),d=u.outerHeight(),t.pageX<r||t.pageX>r+o||t.pageY<l||t.pageY>l+d?c.click():c.hasClass("active")||(h.parent().parent().css("z-index",200),this.$storyimg.css("z-index",0),c.addClass("active"),h.parent().find(".card-film").removeClass("inactive"),s=i))},this)),this.$module.each(function(i){i>s&&e(this).parent().find(".gallery-film").removeClass("inactive")})},launchFullscreen:function(t){t.preventDefault(),this.$module.each(i.bind(function(i,s){var a=e(s);t.currentTarget==a.find(".gallery-sidebar-panel.active .fullscreen")[0]&&n.trigger("openFullScreenCarousel",{carousel:this,fullScreen:!0,parent:a.find(".companion-galleries")})},this))},onClickGalleryFlyoutNavBtn:function(t){var s=e(t.currentTarget),a=s.data("share-method"),l=s.data("share-title"),r=s.data("share-link"),o="CompanionGallery"+a;n.trigger("uotrack",o),a&&this.showSection(s.parent().parent(),a),this.$module.each(i.bind(function(i,s){var n,o=e(s);i==this.$index&&(n=o.find(".gallery-sidebar-close"),n.hasClass("active")||(o.parent().parent().css("z-index",200),this.$storyimg.css("z-index",0),n.addClass("active"),o.parent().find(".card-film").removeClass("inactive")),"facebook"==a&&(o.find(".util-bar-success-link-facebook").each(function(){this.remove()}),o.find(".util-bar-share-message-facebook").data("link",r),o.find(".util-bar-share-message-facebook").data("title",l),o.find(".gallery-sidebar-panel .caption").empty(),this.subviews["facebook"+i].onClickPostBtn(t),t.preventDefault()))},this))},showSection:function(e,i){this.resetSections(),e.find(".util-bar-flyout-nav-btn-"+i).addClass("active")},resetSections:function(){this.$(".util-bar-flyout-nav-btn").removeClass("active"),this.$(".util-bar-flyout-pane-success").hide()},launchGallery:function(t,s){var a=s||e(t.currentTarget).parent().find(".companion-story-gallery"),n=a.find(".gallery-sidebar-close");t&&t.stopPropagation(),this.$(".sidebar-gallery-btn").removeClass("active"),n.addClass("active"),a.parent().find(".card-film").removeClass("inactive"),this.$module.each(i.bind(function(i,t){var s=e(t);t===a[0]&&(this.$index=i,this.$utility.css("z-index","auto"),this.$sharebar.hide(),s.find(".companion-galleries").addClass("active"),s.find(".gallery-sidebar-panel .partner-placement").css("display","block"),s.find(".util-bar-flyout-pane-success").is(":visible")||this.sidebarCaption(),this.openSidebar())},this))},resetAllButActive:function(){this.$module.each(i.bind(function(i,t){var s=e(t),a=s.find(".gallery-sidebar-panel");a.hasClass("active")||(this.$(".util-bar-flyout-nav-btn").removeClass("active"),s.find(".companion-galleries").removeClass("active"),s.find(".gallery-sidebar-close").removeClass("active"),s.find(".gallery-sidebar-panel").removeClass("active"),s.parent().find(".card-film").addClass("inactive"),this.$galleryfilm.addClass("inactive"))},this))}});return h});
//# sourceMappingURL=story-overlay.js.map