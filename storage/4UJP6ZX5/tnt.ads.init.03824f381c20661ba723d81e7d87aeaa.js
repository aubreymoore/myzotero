window.__tnt || (window.__tnt = {});

(function(window, document, $, __tnt, undefined) {

    var me = __tnt.ads || (__tnt.ads = {});

    // This is the function that will be called everytime we want to render the HTML part of the ad.
    // We'll clean it up first by emptying the div, then removing any inline styles and classes.
    // Then we'll add a new set of ad classes.
    // Set the max width of the ad, and then append the html that we pass.

    var __getAnimationSpeed = function(speed) {
            switch(speed) {
                case 'slow':
                    return 1000;
                case 'medium':
                    return 500;
                case 'fast':
                    return 250;
                case 'instant':
                    return 0;
                default:
                    return 500;
            }
    };

    var __setTrigger = function(ad) {
        var dfd = new $.Deferred();

            switch(ad.start_open) {

                // Open on load.
                case '1':

                    // Open the ad.
                    __setAnimation(ad, 0)
                    // Let auto_limit close the ad.
                    if (ad.auto_limit !== '0') {
                        setTimeout(function() {
                            __setAnimation(ad)
                        },
                        // Multiply by 1000 since this is in mil.
                        ad.auto_limit * 1000);
                    // User will have to click the small ad to close the big ad.
                    } else {
                        $(ad.positionDiv).find('.tnt-expandable-small').on('click', function() {
                            __setAnimation(ad);
                        });
                    }

                    break;

                // Open on hover
                case '2':

                    // Set animation whenever mouse goes in and out.

                    // $(ad.positionDiv).find('.tnt-expandable-small').on('mouseover mouseout', function() {

                    $(ad.positionDiv).on('mouseover mouseout', function() {
                        __setAnimation(ad);
                    });

                    break;

               // Open on load and hover
                // TODO: Maybe make it smarter
                case '3':

                    // Open the ad.
                    __setAnimation(ad, 0);
                    $(ad.positionDiv).find('.tnt-expandable-small').addClass('click-to-close');
                    // Let auto_limit close the ad.
                    if (ad.auto_limit !== '0') {
                        setTimeout(function() {
                            __setAnimation(ad);
                        },
                        // Multiply by 1000 since this is in mil.
                        ad.auto_limit * 1000);
                    // $(ad.positionDiv).find('.tnt-expandable-small').on('mouseover mouseout', function() {
                    $(ad.positionDiv).on('mouseover mouseout', function() {
                        __setAnimation(ad);
                    });
                    // User will have to click the small ad to close the big ad.
                    } else {
                        if ($(ad.positionDiv).find('.tnt-expandable-small').hasClass('click-to-close')) {
                           // $(ad.positionDiv).find('.tnt-expandable-small').on('hover', function() {
                           $(ad.positionDiv).find('.tnt-expandable-small').on('click hover', function() {
                                __setAnimation(ad);
                            });


                        } else {

                        }
                    }

                    break;

                default:
                    $(ad.positionDiv).find('.tnt-expandable-small').on('click', function() {
                        __setAnimation(ad);
                    });
                    break;
            }

        dfd.resolve(ad);
        return dfd.promise();
    };

    var __setLink = function(ad) {
        var dfd = new $.Deferred();

            if (ad.clickuri) {
                $(ad.positionDiv).find('.tnt-expandable-big img').wrap('<a href="' + ad.clickuri + '"></a>');
                    if (ad.start_open != 0) {
                        $(ad.positionDiv).find('.tnt-expandable-small img').wrap('<a href="' + ad.clickuri + '"></a>');
                    }
            }

        dfd.resolve(ad);
        return dfd.promise();
    }

    var __setWrapper = function(ad) {
        var dfd = new $.Deferred();

            $(ad.positionDiv).css({
                'position': 'relative'
            });

        dfd.resolve(ad);
        return dfd.promise();
    }

    var __setAnimation = function(ad, override) {
        var dfd = new $.Deferred();

            var $bigAd = $(ad.positionDiv).find('.tnt-expandable-big');

            // TODO: Do something better for this piece of override check.
            var speed = override === 0 ? override : __getAnimationSpeed(ad.transition_speed);

            switch(ad.overlay_content) {
                case '0':
                    $bigAd
                        .addClass("noOverlay");
                break;
                case '1':
                    $bigAd
                        .addClass("overlay");
                break;
            }

            switch(ad.transition_direction) {
                case 'left':
                    $bigAd
                        .css({
                            'position': 'absolute',
                            'top': 0,
                            'z-index': 99999,
                            'right': ad.width
                        })
                        .stop()
                        .animate({
                            width: 'toggle'
                        }, speed);
                    break;
                case 'right':
                    $bigAd
                        .css({
                            'position': 'absolute',
                            'top': 0,
                            'left': ad.width,
                            'z-index': 99999
                        })
                        .stop()
                        .animate({
                            width: 'toggle'
                        }, speed);
                    break;
                case 'up':
                    $bigAd
                        .css({
                            'position': 'absolute',
                            'bottom': ad.height,
                            'left': 0,
                            'z-index': 99999
                        })
                        .stop()
                        .slideToggle(speed);
                    break;
                default:
                    $bigAd
                        .css({
                            'left': 0,
                            'z-index': 99998
                        })
                        .stop()
                        .slideToggle(speed);
                    break;
            }

        dfd.resolve(ad);
        return dfd.promise();
    }

    me.video = function(ad){
        if(ad.embed){
            __tnt.video || (__tnt.video = {});
            __tnt.video.blox || (__tnt.video.blox = {});

            __tnt.video.blox.ads || (__tnt.video.blox.ads = {
                postroll:[],
                preroll:[]
            });

            if(ad.rolltype == "post"){
                __tnt.video.blox.ads.postroll.push(ad);

            } else {
                __tnt.video.blox.ads.preroll.push(ad);

            }
        } else {
            function _ad(){
                var filetype = "video/mp4";
                if(ad.asseturl.match(/\.flv\?/)!=null){
                    filetype = "video/x-flv";
                }

                $(ad.positionDiv)
                    .addClass("tnt-video-ad-wrapper")
                    .append('<video class="tnt-video-ad vjs-ad video-js vjs-default-skin vjs-big-play-centered video-responsive"><source src="'+ad.asseturl+'" type="'+filetype+'"/></video>')
                    .attr("data-videoclickuri",ad.clickuri);

                videojs($(ad.positionDiv).find('video')[0], {'preload':'auto', 'controls':true,'fluid':true}, function(){
                    player = this;

                    player.on('__tnt.video.standalone.initialize',function(){
                        player.one('play',function(event){
                            __tnt.trackEvent({'category':'tnt-video-ad','action':'standalone playing','label':'user watching: '+player.src(),'value':'1'});

                            player.on('click',function(event){
                                if(player.currentTime()>.20){
                                    __tnt.trackEvent({'category':'tnt-video-ad','action':'standalone clicked','label':'user clicked: '+player.src(),'value':'1'});

                                    window.open(decodeURIComponent($(event.target).parents('.tnt-video-ad-wrapper').attr('data-videoclickuri'))); // "adLink","menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
                                    player.trigger('ended');
                                }
                            });

                            player.one('ended',function(event){
                                player.off('click');
                                player.currentTime(player.duration());

                                __tnt.trackEvent({'category':'tnt-video-ad','action':'standalone ended','label':'user watched: '+player.src(),'value':'1'});

                                player.trigger('__tnt.video.standalone.initialize');
                            });
                        });
                    });

                    player.trigger('__tnt.video.standalone.initialize');
                });
            }

            $(function(){
                var vjsFile = $('.video-ad').attr('data-video-js');
                var vswfFile = $('.video-ad').attr('data-video-swf');
                var vjsCss = $('.video-ad').attr('data-video-js-css');
                var vjsCssBlox = $('.video-ad').attr('data-video-blox-css');

                if(typeof(videojs)=="undefined"){
                console.log("loading: "+vjsFile);
                    $.getScript(vjsFile, function( data, textStatus, jqxhr ) {
                        videojs.options.flash.swf = vswfFile;

                        $('body').append('<link rel="stylesheet" href="'+vjsCss+'" />').append('<link rel="stylesheet" href="'+vjsCssBlox+'" />');

                        _ad();
                    });
                }else{
                    videojs.options.flash.swf = vswfFile;

                    _ad();
                }
            });
        }
    };

    me.expandable = function(ad) {

            var small = '<div class="tnt-expandable-small" style="cursor: pointer"><img src="' + ad.smallImage + '"/></div>';

            var large = '<div class="tnt-expandable-big" style="display: none;"><img src="' + ad.largeImage + '" /></div>';

            var html = small + large;

            __paint(ad, html)
                .then(__setWrapper(ad))
                .then(__setLink(ad))
                .then(__setTrigger(ad))
                .then();
    };

 me.flashcurl = function(ad) {

        var smallFlash = '';
          smallFlash += '<object type="application/x-shockwave-flash" data="' + ad.smallFlash + '">';
          smallFlash += '<param name="wmode" value="opaque" />';
          smallFlash += '<param name="movie" value="' + ad.smallFlash + '" />';
          smallFlash += '</object>';

        var largeFlash = '';
          largeFlash += '<object type="application/x-shockwave-flash" data="' + ad.largeFlash + '">';
          largeFlash += '<param name="wmode" value="opaque" />';
          largeFlash += '<param name="movie" value="' + ad.largeFlash + '" />';
          largeFlash += '</object>';


        var small = '<div id="smallflash">'+ smallFlash +'</div>';
        var large = '<div id="largeflash">'+ largeFlash +'</div>';
        var cover = '<div class="hidden-sm hidden-xs" id="flashcurl"><div class="cover"></div>'+ small + large +'<div style="z-index: 997; display: block; background-color: #fff; top: 0px; right: 0px; position: absolute; height: 99%; width: 99%;"></div></div>';
        var html = cover;

        __paint(ad, html)

    };

    me.curl = function(ad) {

            if (ad.clickuri) {

                        var small = '<div class="tnt-ads-container hidden-xs hidden-sm"><button id="closeButton" class="hidden-lg hide btn btn-primary btn-sm login-btn user-control-link">Close</button><a href="' + ad.clickuri + '"><div id="pageflip"><img src="/content/tncms/live/components/template/resources/images/curl.png"><div class="back-img"></div></a></div></div>';

                        var largeCss = '<style>#pageflip img {background: url("' + (ad.smallImage) + '") no-repeat right top #fff;transition: background-image 0.6s ease;;</style>';

        } else {

                        var small = '<div class="tnt-ads-container hidden-xs hidden-sm"><button id="closeButton" class="hidden-lg hide btn btn-primary btn-sm login-btn user-control-link">Close</button><div id="pageflip"><img src="/content/tncms/live/components/template/resources/images/curl.png"><div class="back-img"></div></div></div>';

                        var largeCss = '<style>#pageflip img {background: url("' + (ad.smallImage) + '") no-repeat right top #fff;transition: background-image 0.6s ease;;</style>';

        }

            var html = small + largeCss;

            __paint(ad, html)
                .then(__setWrapper(ad))
                .then(__setLink(ad))
                .then(__setTrigger(ad))
                .then();

             $(document).ready(function(){
                $("#pageflip").mouseover(function(){
                    $("#pageflip img , .back-img").stop()
                        .animate({
                            width: '488px',
                            height: '475px'
                        }, 800)
                        .delay( 1000 )
                        .css('background-image','url("' + (ad.largeImage) + '")')
                  });
                  $("#pageflip").mouseover(function(){
                    setTimeout(function () {
                        $('#closeButton').removeClass('hide');
                     }, 1000);
                  });
                  $("#pageflip").mouseleave(function(){
                       setTimeout(function () {
                           $("#closeButton").addClass( "hide" );
                           $("#pageflip img").stop()
                                .animate({
                                    width: '75px',
                                    height: '75px'
                                }, 300)
                           $(".back-img").stop()
                                .animate({
                                    width: '50px',
                                    height: '50px'
                                },300)
                           $("#pageflip img , .back-img").css('background-image','url("' + (ad.smallImage) + '")');
                         }, 2000);
                          clearTimeout();
                   });
                   $('#closeButton').on('click', function(e) {
                       setTimeout(function () {
                          $("#closeButton").addClass( "hide" );
                          $("#pageflip img").stop()
                                .animate({
                                    width: '75px',
                                    height: '75px'
                                }, 300)
                           $(".back-img").stop()
                                .animate({
                                    width: '50px',
                                    height: '50px'
                                },300)
                           $("#pageflip img , .back-img").css('background-image','url("' + (ad.smallImage) + '")');
                         }, 1000);
                          clearTimeout();
                   });
                });
    };

    me.html = function(ad) {

        // TODO: @eabad - TEMPORARY FIX FOR NULL WIDTHS
        if (!ad.width) {
            ad.width = $(ad.positionDiv).closest('.tncms-region-ads').prev().data('tnt-ads-tmp').width;
        }

        __paint(ad, ad.html);
    };

    me.flash = function(ad) {

        // Determine proper width/height based on ratio
        var cWidth = ($(ad.positionDiv).width() <= ad.width) ? $(ad.positionDiv).width() : ad.width;

        var ratio = cWidth / ad.width,
            nWidth = ratio * ad.width,
            nHeight = ratio * ad.height;

        var url = 'http://' + ad.clickuri[0],
        urlTwo = 'http://' + ad.clickuri[1],


          html = '';
          html += '<object type="application/x-shockwave-flash" data="' + ad.asseturl + '" width="' + nWidth + '" height="' + nHeight + '">';

          if (url && !urlTwo) {
              html += '<param name="flashvars" value="clickTAG=' + encodeURIComponent(url) + '&clickTarget=_blank" />';
          } else if (url && urlTwo) {
               html += '<param name="flashvars" value="clickTAG=' + encodeURIComponent(url) + '&clickTAG2=' + encodeURIComponent(urlTwo) + '&clickTarget=_blank" />';
          }

          html += '<param name="allowScriptAccess" value="always" />';
          html += '<param name="wmode" value="opaque" />';
          html += '<param name="movie" value="' + ad.asseturl + '" />';
          html += '</object>';


        __paint(ad, html);
    };

    me.flashexpand = function(ad) {

            var small = '<div style="width:' + ad.width + 'px; height:' + ad.height + 'px; " class="hidden-sm hidden-xs tnt-expandable-small" style="cursor: pointer"><object type="application/x-shockwave-flash" data="' + ad.smallFlash + '" width="' + ad.width + '" height="' + ad.height + '"><param name="movie" value="' + ad.asseturl + '" /><param name="wmode" value="opaque" /></object></div>';

            var url = 'http:' + ad.clickuri;

            var large = '<div class="hidden-sm hidden-xs tnt-expandable-big" style="display: none;"><object type="application/x-shockwave-flash" data="' + ad.largeFlash + '" width="' + ad.largewidth + '" height="' + ad.largeheight + '"><param name="flashvars" value="clickTAG=' + encodeURIComponent(url) + '&clickTarget=_blank" /><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="movie" value="' + ad.largeFlash + '" /></object></div>';

            var html = small + large;

            __paint(ad, html)
                .then(__setWrapper(ad))
                .then(__setTrigger(ad))
                .then();

    };

    me.image = function(ad) {


        if (ad.display == 'wallpaper') {

            var noAppendhtml = ''
            var html = '';
            var wallpaperHeight = ad.height;

            var bodyhtml = document.getElementsByTagName('body')[0];

            noAppendhtml += bodyhtml.style.backgroundImage = 'url('+ ad.asseturl + ')';
            noAppendhtml += bodyhtml.style.height = wallpaperHeight + 'px';
            noAppendhtml += bodyhtml.className+=' wallpaper-ad '
            if (ad.clickuri) {
                html += '<a href="' + ad.clickuri + '" target="' + ad.target + '" style="width:100%; height: 100%; display:block"></a>';
            }

        } else if (ad.display == 'anchor') {

        var html = (ad.clickuri === '') ? '<a href="#" class="close" data-dismiss="alert"><span class="fa fa-close"></span></a><img style="width: ' + ad.width +'px; height: auto; " src="' + ad.asseturl + '" />' : '<a href="#" class="close" data-dismiss="alert"><span class="fa fa-close"></span></a><a href="' + ad.clickuri + '" target="' + ad.target + '" style="display:block"><img style="width: ' + ad.width +'px; height: auto; " src="' + ad.asseturl + '" /></a>';

        } else {

           var html = (ad.clickuri === '') ? '<img src="' + ad.asseturl + '" style="width: 100%;" />' : '<a href="' + ad.clickuri + '" target="' + ad.target + '" style="display:block"><img src="' + ad.asseturl + '" style="width: 100%;" /></a>';

        }
            __paint(ad, html, noAppendhtml);

    };

    me.text = function(ad) {

        if (!ad.width) {
            ad.width = $(ad.positionDiv).closest('.tncms-region-ads').prev().data('tnt-ads-tmp').width;
        }

        var flagText = __overline(ad);
        if( typeof flagText === 'undefined' || flagText === null ){
            flagText = 'Advertisement';
        }

        if (ad.clickuri) {

            var html = '<div class="tnt-text-ad-container"><a href="' + ad.clickuri + '" target="' + ad.target + '">' + ad.title + '</a><br/>' + ad.text + '<br/>' + '<span class="tnt-text-ad-flag">' + flagText + '</span></div>';

        } else {

            var html = '<div class="tnt-text-ad-container"><strong>' + ad.title + '</strong><br/>' + ad.text + '<br/>' + '<span class="tnt-text-ad-flag">' + flagText + '</span></div>';

        }

        __paint(ad, html);
    };

    me._resize = function() {
        var resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() { me._render(); }, 500);
        });
    };



    me._render = function() {
        // Get all divs that the data attribute tnt-ads

        $('div[data-tnt-ads]').each(function(i, obj) {

            // Make sure we get the right container since it's different if you're in preview or live
            // $adDiv makes sure that your <div> is always the right one.
            var $adDiv = (obj.id.indexOf('-debug-') > -1 ) ? $('#' + obj.id.replace('-debug','')) : $(this);

            // Get JSON object for BLOX ads.
            var ad = $(this).data('tnt-ads');



            // $adDiv must be >= and is visible to render the ad.
            if (($adDiv >= ad.width) && $(this).is(':visible')) {
                __callAdManager(ad);
            }

        });
    };


    // Get the overline text
    var __overline = function(ad) {
        if( $(ad.positionDiv).closest('.tncms-region-ads').prev().attr('data-tnt-ads-tmp') ){
            var adOverline = $(ad.positionDiv).closest('.tncms-region-ads').prev().data('tnt-ads-tmp').overline;
        }else if( $(ad.positionDiv).attr('data-tnt-ads') ){
            var adOverline = $(ad.positionDiv).data('tnt-ads').overline;
        }

        return adOverline;
    }

    // Paint the HTML
    var __paint = function(ad, html) {

        var dfd = new $.Deferred();

        if (ad.display == 'anchor') {
        var adClass = '';
        adClass = ' tnt-ads-anchor ';
        adClass += ' alert ';
        } else {
         var adClass = 'tnt-' + ad.type + '-ad-wrapper'
        }

        var adClasses = [
            'tnt-ads',
            adClass

        ].join(' ');

       if (ad.display == 'wallpaper') {

           $("#wallpaper-left")
                .empty()
                .append(html);
           $("#wallpaper-right")
                .empty()
                .append(html);
       } else {
            $(ad.positionDiv)
                .empty()
                .removeAttr('style')
                .removeClass()
                .addClass(adClasses)
                .css({
                        'max-width': ad.width + 'px'
                 })
                .append(html);
       }

       if( ad.type != 'text' ){
            var adOverline = __overline(ad);

            if( adOverline && $(ad.positionDiv).siblings('.tnt-ads-overline').length < 1 ){
                var overlineHtml = '<div class="tnt-ads-overline">' + adOverline + '</div>';
                $(ad.positionDiv).before( overlineHtml );
            }
        }

        dfd.resolve(ad);
        return dfd.promise();
    };

    // Let's call BLOX Ad Manager to generate the ads.
    var __callAdManager = function(ad) {

        // Choose between a 'region' and a 'position'.
        if (ad.type == 'position') {
            TNCMS.AdManager.render({
                region: ad.region,
                slot: ad.slot,
                fold: ad.fold,
                width: ad.width,
                display: ad.display
            });
        }
    };

})(window, document, jQuery, __tnt);