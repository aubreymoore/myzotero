/**
 * @file
 * A JavaScript file for the theme.
 */

(function ($, Drupal, window, document, undefined) {

// Create a behavior for the sticky menu with accordions.
Drupal.behaviors.sticky_accordian_menu = {
  attach: function(context, settings) {
    var $accordions, $icons, $navbar1, $navbar2, $leadIn, $toolbar, $navbar, $window, $navbarSpacer;

    if(this.done) {
      return;
    }

    $accordions = $('.dropnav__heading');
    $icons = $accordions.find('.ss-icon--down');
    $navbar1 = $('.navbar-1');
    $navbar2 = $('.navbar-2');
    $leadIn = $('.l-lead-in');
    $toolbar = $('body');
    $window = $(window);
    $navbar = $('.navbar__wrapper');
    $navbarSpacer = $('.js-navbar-spacer');

    // Handle display of mobile menu.
    function stickyAccordianMenuResize() {
      // Ensure the dropnavs are properly collapsed or expanded.
      if ($window.width() < 601) {
        $('.navbar-trigger').removeClass('is-active');
        $('.desktop-sub-nav').removeClass('js-navbar-2-down-mobile');

        if (!$navbar2.hasClass('js-small-nav')) {
          $navbar2.addClass('js-small-nav');
          $accordions
            .next('ul')
            .hide();
        }
      }
      else {
        if ($navbar2.hasClass('js-small-nav')) {
          $navbar2.removeClass('js-small-nav');
        }
        $accordions
          .removeClass('is-expanded')
          .next('ul')
          .show();
        $icons
          .text('navigatedown');
      }
    }

    // Add the click handers for the accordian dropnavs.
    $accordions.click( function(e) {
      e.preventDefault();
      if ($window.width() < 601) {
        var $target = $(this);
        var $icon = $target.find('.ss-icon--down');
        // Toggle open/close on the <ul> after the <a> and change the icon.
        if ($icon.text() == 'navigatedown') {
          $target.addClass('is-expanded').next('ul').slideDown();
          $icon.text('navigateup');
        }
        else {
          $target.removeClass('is-expanded').next('ul').slideUp();
          $icon.text('navigatedown');
        }
      }
    });

    // Triggers for desktop menu dropdowns.
    $('.navbar-trigger').once( function() {
      var $this = $(this),
          targetClass = $this.data('target-navbar'),
          $target = $('.' + targetClass);

      $this.click( function() {
        if (!$this.hasClass('is-active')) {
          $('.navbar-trigger').removeClass('is-active');
          $this.addClass('is-active');
        }
        else {
          $('.navbar-trigger').removeClass('is-active');
        }

        if ($window.width() >= 601) {
          if (!$target.hasClass('js-navbar-2-down-mobile')) {
            $('.desktop-sub-nav').removeClass('js-navbar-2-down-mobile');
            $target.addClass('js-navbar-2-down-mobile');
          }
          else {
            $('.desktop-sub-nav').removeClass('js-navbar-2-down-mobile');
          }
        }
        else {
          $target.toggleClass('js-navbar-2-down');
        }

        return false;
      });
    });
    // Trigger for mobile menu dropdown.
    $('.js-dropnav-trigger').click( function() {
      var windowHeight;
      $('.desktop-sub-nav').removeClass('js-navbar-2-down-mobile');
      $('.js-navbar-2-down-mobile').removeClass('js-dropnav-trigger');
      $(this).toggleClass('is-active');
      if ($window.width() < 601) {
        $navbar2.toggleClass('js-navbar-2-down-mobile');
      }
      else {
        $navbar2.toggleClass('js-navbar-2-down');
      }
      return false;
    });

    // Create a "spacer" to fill the gap left by the sudden "position: fixed"
    // placement of the navbar.
    $navbar.after('<div class="js-navbar-spacer"></div>');

    // Ensure the Menus are in their proper initial state.
    stickyAccordianMenuResize();

    // Create a resize handler for the window. Use a timeout to reduce
    // processing.
    $window.resize( function() {
      clearTimeout(this.id);
      this.id = setTimeout(stickyAccordianMenuResize, 200);
    });

    // Collapse nav when user clicks outside of nav.
    $(document).click( function(e) {
      // Only if the original target is the current element.
      console.log('document_click', e);

        var isNav = !!$(e.target).closest('.navbar__wrapper').length;

        // Target is not a nav element or a child of one.
        if (!isNav) {
          // Collapse and reset navigation elements.
          $('.navbar-trigger').removeClass('is-active');
          $('.desktop-sub-nav, .mobile-nav').removeClass('js-navbar-2-down-mobile');
        }
    });

    this.done = true;
  }
};

// Create a behavior for the flexslider slide shows.
Drupal.behaviors.slide_shows = {
  attach: function(context, settings) {
    if ($(window).width() < 541) {
      $('.recent-stories')
        .flexslider({
          selector: '.slides > .slide',
          animation: 'slide',
          slideshow: false,
          directionNav: true
        })
        .removeClass('slideshow-off');
    }

    // Add the slideshow to Stories (the .story-slideshow) class is added by
    // the field--field-images.tpl.php file.
    $('.story-slideshow')
      .flexslider({
        selector: '.slides > .slide',
        animation: 'slide',
        slideshow: false,
        directionNav: true
      });
  }
};

// Get the best gigya comment.
Drupal.behaviors.gigyaComments = {
  attach: function(context, settings) {
    /**
     * Display the retrived comment and render into the Drupal comments space.
     */
    function gigyaDisplayComment(response) {
      if ( response.errorCode === 0 ) {
        if ( null !== response.comments && response.comments.length > 0) {
          $('.recent-comment__quote').html(response.comments[0].commentText);
          var time = commentTimeFormat(response.comments[0].timestamp);
          $('.recent-comment__meta').html(response.comments[0].sender.name + ' · ' + time);
        }
      }
    }

    /**
     * Utility function to parse a date stamp into human readable text.
     */
    function commentTimeFormat(time) {
      var timestamp = new Date(time);
      var now = new Date();

      // Get the time difference in seconds.
      var difference = Math.round((now - timestamp) / 1000);

      var text = '';

      // Display in minutes.
      if (difference < 3600) {
       var minutes = Math.round(difference / 60);
       text = minutes + ' minutes ago';
      }
      // Display in hours.
      else if (difference < 86400) {
       var hours = Math.round(difference / 60 / 60);
       text = hours + ' hours ago';
      }
      // Display in days.
      else if (difference < 2592000) {
       var days = Math.round(difference / 60 / 60 / 24);
       text = days + ' days ago';
      }
      // Display date.
      else {
       // @NOTE this would be much cleaner to do with a library like:
       // https://github.com/phstc/jquery-dateFormat but that is a significant
       // amount of code for a single output line.
       text = (timestamp.getMonth() + 1) + '/' + timestamp.getDate() + '/' + timestamp.getFullYear();
      }
      return text;
    }

    // Only try to replace the comment if the comment block exists.
    if ($('.pane-pri-content-comments', context).length > 0) {
      // Build the query for the highest rated comment.
      var gigyaSettings = Drupal.settings.gigyaComments.commentsUIparams;
      var params = {
        categoryID: gigyaSettings.categoryID,
        streamID: gigyaSettings.streamID,
        callback: gigyaDisplayComment,
        threadLimit: 1,
        sort: 'votesDesc'
      };

      gigya.comments.getComments(params);
      $('.pane-pri-content-comments', context).show();
    }
  }
};

/**
 * Wraps iframes with a class so that they can be responsive.
 *
 * Gigya adds an iframe to the page when the cookie expires. This iframe cannot
 * be wrapped as it messes up the height of the page.
 */
Drupal.behaviors.fluid_videos = {
  attach: function(context, settings) {
    $('.node.view-mode-full iframe, .pane-node-field-multimedia-code-long iframe, .pane-node-field-image iframe', context).each(function () {
      if (
        $(this).attr('src') != undefined &&
        $(this).attr('src').indexOf('gigya') == -1 &&
        $(this).attr('src').indexOf('interactnow') == -1 &&
        $(this).attr('class').indexOf('opinary-iframe') == -1 &&
        $(this).attr('id').indexOf('google_ads_iframe') == -1
      ) {
         $(this).wrap('<div class="fluid-video" />');
      }
    });

    $('.node.view-mode-full .nochop .fluid-video, .pane-node-field-multimedia-code-long .nochop .fluid-video', context).replaceWith(function() {
      return this.innerHTML;
    });
  }
};


/**
 * Fixes the attributes of images inserted by the wywsiwg.
 *
 * This code looks for additional markup that has been added by the wysiwyg
 * editor and takes any height, width, float, and margins and moves them to the
 * appropriate element. Specifically it removes the inline height/width styles
 * on the image element by wysiywg and moves these to the height/width
 * attributes. This works better for responsive design. Secondly it moves floats
 * and margines from the image to the bounding element which does handles
 * things like captions work much better.
 */
Drupal.behaviors.fixWysiwygImages = {
  attach: function(context, settings) {
    $(document).ready(function() {

      $('img.media-element.file-default').each(function () {
        // Remove the 'px' from the CSS values so we can use height/width on the img tag.
        var remove = /px$/;

        var height = 0;
        var width = 0;

        if ($(this).css('height')) {
          height = $(this).css('height').replace(remove, '');
          $(this).attr('height', height);
          $(this).css('height', '');
        }

        if ($(this).css('width')) {
          width = $(this).css('width').replace(remove, '');
          $(this).attr('width', width);
          $(this).css('width', '');
        }

        // Media uses a wrapping container when an image is being display with
        // additional fields. In this case the float, margin, and widht need to
        // be applied to the container.
        if ($(this).parent('.media-element-container').length) {
          if ($(this).css('float')) {
            $(this).parent('.media-element-container').css('float', $(this).css('float'));
            $(this).css('float', 'none');
          }

          if ($(this).css('margin')) {
            $(this).parent('.media-element-container').css('margin', $(this).css('margin'));
            $(this).css('float', 'none');
          }

          // If a width was defined, set the width of the container.
          if (width) {
            $(this).parent('.media-element-container').css('width', width).css('max-width', '100%');
          }
        }

      });

    });
  }
};


/**
 * Message block.
 */
Drupal.behaviors.priMessageBox = {
  attach: function(context, settings) {
    $(document).ready(function() {
      $('.promo-box--leaderboard-ad a.close').click(function() {
        $('.promo-box--leaderboard-ad').slideUp();
          return false;
      });
    });
  }
}

Drupal.behaviors.facetsearch = {
  attach: function(context, settings) {
    // Move the top story sidebar ad into story content for mobile.
    $('.facet-program').once( function() {
      var $facet = $(this),
          $search = $('.page-search-facets'),
          width = $(window).width();

        if ($facet.hasClass('facet-program')) {
          var $newPos = $('.view-filters');

          if ($newPos.length) {
            $newPos.append($facet);
          }
        }
    });
  }
};

Drupal.behaviors.verticalBlock = {
  attach: function(context, settings) {
    $('.field-select-awl-sections:even').addClass('odd');
    $('.field-select-awl-sections:odd').addClass('even');
  }
};
/**
 * Audio Search region map filter.
 *
 * Convert the simple hierarchical select (shs) country dropdown select to a list item
 * to facitate map selection.
 */
Drupal.behaviors.audioSearchMap= {
  attach: function(context, settings) {

    if ($.svg && !$('#region-map').length) {
      var audioSearch = $('.pane-block.display-map', context);
      regionSelect = $('.shs-select-level-1', audioSearch);
      // Add a conatiner for the map.
      audioSearch.find('.views-exposed-form').prepend('<div id="region-map">');
      // Load the map.
      $('#region-map').svg();
      var svg = $('#region-map').svg('get');
      svg.load('/sites/all/themes/pri/images/continents.svg', {changeSize: false, onLoad: mapLoaded});
    }

    // The map loaded without issue.
    function mapLoaded(svg, error) {
      //svg.text(10, 20, error || 'Loaded into ' + this.id);
      regions = $('g.region', svg.root());
      var overrideTids = Drupal.settings.regionTids;

      regions.each( function() {
        var region = $(this);
        var key = region.attr('id');

        // The taxonomy term IDs are not necessarily the same in dev
        // environments. A developer can override the region tid values in the
        // settings.php file with the ones in their database for their local
        // environment by adding:
        //
        // $conf['region_tids'] = array(
        //   'Africa' => <term ID>,
        //   'Asia' => <term ID>,
        //   'Europe' => <term ID>,
        //   'NorthAmerica' => <term ID>,
        //   'Oceania' => <term ID>,
        //   'SouthAmerica' => <term ID>,
        // );
        //
        // This might also be used if term IDs cahnge on production as an
        // alternative to editing the svg.
        if (overrideTids[key]) {
          region.attr('value', overrideTids[key]);
        }

        // Handle map clicks.
        region.click(function() {
          regions.removeClass('selected');
          region.addClass('selected');
          var tid = region.attr('value');
          regionSelect.val(tid).trigger('change');
        });
      });
    }

    // due to shs is dynamically loaded, we need a way to monitor.
    // watch for dom change, i.e. the shs select dropdown being populated
    // DOMSubtreeModified - Chrome/Firefox
    // propertychange - IE
    if (typeof(regionSelect) != 'undefined' && regionSelect !== null && regionSelect.length) {
      regionSelect.bind('DOMSubtreeModified propertychange', function() {
        // delay to wait for the select to fully filled
        setTimeout(function () {
          if (!regionSelect.hasClass('region-select-processed')) {
            regionSelect.addClass('region-select-processed');
            // A region is already selected in shs. Highlight it on the map.
            var tid = regionSelect.find('option:selected').val();
            $('g.region[value="' + tid + '"]').addClass('selected');

            // Reflect shs changes on the map.
            regionSelect.change(function() {
              var tid = regionSelect.find('option:selected').val();
              regions.removeClass('selected');
              $('g.region[value="' + tid + '"]').addClass('selected');
            });
          }
        }, 200);
      });
    }
  }
};

/**
 * Favorite Lullabies play all.
 */
Drupal.behaviors.favoritePlayAll = {
  attach: function(context, settings) {
    var favorite = $('.pane-songs-from-playlist', context);

    favorite.once('playall').each(function() {
      var playing = false;
      var playlist = new Array();

      var playNext = function() {
        // remove current playing row highlight
        if (currentPlay >= 0) {
          $(playlist[currentPlay]['container'][0]).parents('.views-row').removeClass('playing');
        }

        currentPlay = currentPlay + 1;
        // playlist finish, stop the loop
        if (currentPlay > playlist.length) {
          playReset();
        }
        // play next track
        playlist[currentPlay].play();
        // highlight playing row
        $(playlist[currentPlay]['container'][0]).parents('.views-row').addClass('playing');
      }
      var playReset = function() {
        // pause rewind to start only the currect item
        // other if mp3 not loaded yet will break mediaelement
        playlist[currentPlay].pause();
        playlist[currentPlay].setCurrentTime(0);
        $(playlist[currentPlay]['container'][0]).parents('.views-row').removeClass('playing');

        playing = false;
        currentPlay = -1;
        playAll.text('Play All');
      }

      // setup our favourite playlist, using mejs.players due to the
      // MediaElement object not kept on initialization
      Object.keys(mejs.players).forEach(function (key) {
        // find mediaelement belongs to favorite list
        if ($(mejs.players[key]['container'][0]).parents('.view-songs-from-playlist').length > 0) {
          playlist.push(mejs.players[key]);
        }
      });

      // only initialize if the playlist has at least 1 item
      if (playlist.length > 0) {
        var currentPlay = -1;

        // the Play All button
        $('.pane-title', favorite).after('<div class="favorite-playall"><i class="ss-icon ss-standard">play</i> Play All</div>');
        var playAll = $('.favorite-playall', favorite);

        playAll.click(function() {
          // if already playing, stop it
          if (playing) {
            playReset();
          }
          // not playing, setup the playlist and/or start playing
          else {
            for (var item in playlist) {
              // if we have not add our ended logic, set them up
              if (!playlist[item].media.endProcessed) {
                playlist[item].media.addEventListener('ended', function (e) {
                  playNext(e.target);
                }, false);
                // mark as processed
                playlist[item].media.endProcessed = true;
              }
              // pause if item in playlist is already playing
              if (playlist[item].playing) {
                playlist[item].pause();
              }
            }
            // always start from first track
            currentPlay = 0;
            playlist[currentPlay].play();
            playAll.text('Stop');
            playing = true;
            // highlight playing row
            $(playlist[currentPlay]['container'][0]).parents('.views-row').addClass('playing');
          }
        });
      }
    });
  }
};

// Adds the audio player wrapper to the audio player added through the WYSIWYG
Drupal.behaviors.inlineAudioAddClass = {
  attach: function (context, settings) {
    $('.mediaelement-audio.media-element.file-default').addClass('audio-player__wrapper');
  }
};

Drupal.behaviors.ctaPrompts = {
  attach: function(context, settings) {
    // Show or hide prompts on load depending on cookie
    // Find cta_prompt wrappers
    var $cta_prompts = $('.js-cta_prompt');
    // Process each prompt for items
    $cta_prompts.each(function() {
      var $prompt = $(this);
      // Find prompts items
      var $cta_prompt_items = $prompt.find('.js-cta_prompt_item');
      // Process items for first item that should be shown.
      $cta_prompt_items.each(function() {
        var $item = $(this);
        var data = $item.data();
        var $cookie_key = 'cta_prompt-' + $item.attr('id');
        var $cookie = $.cookie($cookie_key);
        // Show when:
        // - No cookie can be found for the item's id.
        // - Cookies value doesn't match data-content-hash value.
        if (typeof $cookie !== 'string' || $cookie !== data['content-hash']) {
          $item.show();
          // Add click handler to close button
          $('.js-dismiss', $item).click(function(e) {
            $btn = $(this);
            if ($btn.attr('href') === '#') {
              e.preventDefault();
            }
            $.cookie($cookie_key, data['content-hash']);
            $item.hide();
          });
          // Exit loop at first prompt that should be shown.
          return false;
        }
      });
    });
  }
};

Drupal.behaviors.listenTabs = {
  attach: function (context, settings) {
    $('.page-listen .quicktabs-wrapper .item-list:first').addClass('tabs__drawer');
    $('.page-listen .live-header-bg .l-general, .page-listen .l-navbar').removeClass('l-centered');
    $(".story-list.node-episode.view-mode-featured_small .mediaelement-audio").each(function(index) {
      $(this).next(".player__bottom-bar").andSelf().wrapAll("<div class='audio-player__wrapper'></div>");
  });

  }
};

})(jQuery, Drupal, this, this.document);
;
