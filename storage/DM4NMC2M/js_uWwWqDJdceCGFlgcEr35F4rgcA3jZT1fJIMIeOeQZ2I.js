/**
 * @file
 * JCore theme behaviors.
 */

(function ($) {

  Drupal.behaviors.hwJcore1ThemeScripts = {
    attach: function(context, settings) {
      // Give the login form some love.
      $('#user-login-form .login-submit-link', context).click(function () {
        $('#user-login-form').submit();
        return false;
      });
      
      $('#region-menu .nice-menu > .menuparent > a, .parent-link-disabled .nice-menu > .menuparent > a', context).click(function (event) {
        event.preventDefault();
      });

      // Search icon cross-browser click handler.
      $('#highwire-search-form .form-item-txtsimple .form-text + .icon-search, [id^="search-block-form"] .form-item-search-block-form .form-text + .icon-search, .highwire-quicksearch .button-wrapper.button-mini, .highwire-quicksearch .button-wrapper .icon-search', context).click(function () {
         $(this).parents('form:first').submit();
      });

      // Disable :focus styles on mouse clicks but retain them on keyboard entry
      $("body").on("mousedown", 'a', function(e) {
        $(this).focus(function() {
          $(this).blur();
          $(this).hideFocus=true; //IE
        });
      });
    }
  };
  Drupal.theme.jCarouselButton = function(type) {
    // Add text for buttons for accessibility.
    if(type == 'previous') {
      var linkText = "Previous Slide";
    } else if (type == 'next') {
      var linkText = "Next Slide";
    }
    return '<a href="javascript:void(0)"><span class="element-invisible">' + linkText + '</span></a>';
  };
})(jQuery);
;
/**
 * @file
 *  Sticky navigation.
 *
 * Add 'sticky navigation' to an element that will stick it to the top of the
 * viewport after passing the last element within it's column wrapper, and will
 * stop at the bottom of the column's parent wrapper.
 */
(function ($) {
  $.fn.oupStickyNav = function (options) {

    // Defaults.
    var settings = $.extend({
      // The wrapping element used to define the start position when the element
      // will start scrolling.
      innerColumnParent: this.parent(),
      // The outer wrapping element, used to define the end position when the
      // element will stop scrolling. This element must have position: relative;
      // set via CSS for bottom positioning to work.
      outerColumnParent: this.parent().parent(),
      // Value to add to the top position when element is stuck.
      topOffset: 0,
      // Value to remove from the bottom position size calculations.
      bottomOffset: 0
    }, options);

    // The element that will be made sticky.
    var $navigationElement = this;
    var navigationWidth = $navigationElement.width();

    // Parent elements.
    var $innerColumnParent = settings.innerColumnParent;
    var $outerColumnParent = settings.outerColumnParent;

    // States of the navigation.
    var navigationStateOriginal = 'original';
    var navigationStateSticky = 'sticky';
    var navigationStateAbsolute = 'absolute';
    var navigationState = navigationStateOriginal;

    /**
     * Check if the widow size is big enough to implement the sticky nav.
     */
    var requiredSpaceIsAvailable = function () {
      return ($(window).height() > $navigationElement.height());
    };

    /**
     * Get the bottom position of a jQuery object.
     *
     * @param $element
     *  The jQuery element we are calculating the bottom position of.
     *
     * @return int
     *  The Y axis position of the bottom of the element.
     */
    var getBottomPosition = function ($element) {
      var elementOffset = $element.offset();
      return elementOffset.top + $element.height();
    };

    /**
     * Change the navigation element to the 'sticky' state.
     */
    var stickNavigation = function () {
      $navigationElement.css({
        position: 'fixed',
        top: settings.topOffset,
        bottom: '',
        width: navigationWidth
      });
      navigationState = navigationStateSticky;
    };

    /**
     * Change the navigation element to be absolutely positioned at the bottom
     * of it's parent.
     *
     * Requires position : relative to be set on the outer wrapping parent. We
     * do not add this via JS as it could cause unexpected results for page content.
     */
    var stickNavigationToBottomOfParent = function () {
      $navigationElement.css({
        position: 'absolute',
        top: '',
        bottom: 0
      });
      navigationState = navigationStateAbsolute;
    };

    /**
     * Revert the navigation element to the original position / state by removing
     * inline styles.
     */
    var revertNavigationToOriginal = function () {
      // Remove the inline styles we have added.
      $navigationElement.removeAttr('style');
      navigationState = navigationStateOriginal;
    };

    /**
     * Implements sticky navigation.
     */
    var implementStickyNavigation = function () {
      // Calculating positions on the scroll as we have several actions / elements
      // that are inserted or manipulated after page load, so the various positions
      // we need are not constant.
      var yScrollPosition = window.pageYOffset;
      var innerColBottomPosition = getBottomPosition($innerColumnParent);
      var outerColBottomPosition = getBottomPosition($outerColumnParent) - settings.bottomOffset;
      var navBottomPostion = yScrollPosition + $navigationElement.height();

      // When the navigation element is not currently 'stuck' and we are scrolling
      // after the bottom of the column, and before the end of the parent wrapper
      // we want to implement the 'sticky' state.
      if (
        navigationState != navigationStateSticky &&
        yScrollPosition >= innerColBottomPosition &&
        navBottomPostion < outerColBottomPosition
      ) {
        stickNavigation();
      }
      // When the 'stuck' element reaches the bottom of the parent wrapper, we want
      // to implement the 'absolute' state.
      else if (
        navigationState == navigationStateSticky &&
        navBottomPostion >= outerColBottomPosition
      ) {
        stickNavigationToBottomOfParent();
      }
      // When we scroll back above the end of column wrapper, we want to revert to
      // the original state / position.
      else if (
        navigationState == navigationStateSticky &&
        yScrollPosition < innerColBottomPosition
      ) {
        revertNavigationToOriginal();
      }
    };

    // Act on window scroll.
    $(window).scroll(function () {
      if ($navigationElement.length > 0) {
        // Check for required space on scroll, as resize is not the only event
        // that could change if this passes or not.
        if (requiredSpaceIsAvailable()) {
          implementStickyNavigation();
        }
        // Change in navigation element height / viewport height after navigation
        // element has been moved. If so, reset to original.
        else if (navigationState != navigationStateOriginal) {
          revertNavigationToOriginal();
        }
      }
    });

    // Reset and repostion element.
    $navigationElement.bind('stickyNavigationReposition', function () {
      // Revert state and positioning.
      revertNavigationToOriginal();
      // Trigger the positioning.
      if (requiredSpaceIsAvailable()) {
        implementStickyNavigation();
      }
    });

    return this;
  }
}(jQuery));
;
(function ($) {
  Drupal.behaviors.oup = {
    attach: function (context, settings) {
      // Fix the TOC markup by splitting the TOC sections into individual divs.
      $('.highwire-markup > .issue-toc > .toc-heading', context).once('split-tocs', function () {
        $(this).nextUntil('.toc-heading').andSelf().wrapAll($('<div>', { class: 'toc-section-wrapper'}));
      });

      // Fix the Index by author markup to split up the sections.
      $('.highwire-index-by-author-heading', context).once('split-authors', function () {
        $(this).next().andSelf().wrapAll($('<div>', { class: 'author-section-wrapper'}));
      });

      // Remove default expand icon as we are using our custom collapse functionality
      // on this list.
      $('.main-content-wrapper .pane-highwire-subject-collections #collection .expand-children', context).remove();

      // Hide citing articles panels if panel contents is empty.
      var $citingArticlePanel = $('.pane-oup-explore-citing-articles', context);
      if ($citingArticlePanel.length) {
        var numberOfChildren = $('#mini-panel-oup_explore_citing_articles .panel-panel > div', context).children().length;
        if (!numberOfChildren) {
          $citingArticlePanel.hide();
        }
      }

      // Hide panel sections when empty.
      $('.hide-panel-if-empty', context).once('hide-empty-panels', function () {
        var $panel = $(this);
        // Trim text to remove line breaks.
        var panelContent = $('.pane-content', $panel).text().trim();
        if (panelContent == "") {
          $panel.hide();
        }
      });

      // Alter the markup of our collapsable content so we have the toggle button
      // as a separate element, collapsing a single div.
      $('.highwire-markup .article div.section h2, ' +
        '.highwire-markup .article .sub-article h1, ' +
        '.pane-article-fig-data .fig-data-title-jump, ' +
        '.pane-highwire-article-data-supp > .pane-title, ' +
        '.pane-highwire-contributors h2, ' +
        '.oup-article-info > .pane-title, ' +
        '.pane-highwire-stats > .pane-title, ' +
        '.pane-oup-explore-citing-articles > .pane-title, ' +
        '.pane-oup-explore-related-articles > .pane-title, ' +
        '.pane-oup-explore-by-author > .pane-title, ' +
        '.pane-oup-explore-eletters > .pane-title, ' +
        '.pane-oup-explore-keywords > .pane-title, ' +
        '.highwire-markup > .issue-toc > .toc-section-wrapper > .toc-heading, ' +
        '.highwire-index-by-author-heading, ' +
        '.pane-highwire-pap .highwire-list-title, ' +
        '.abstract-section-title, ' +
        '.main-content-wrapper .pane-highwire-subject-collections #collection > li.outer > .data-wrapper, ' +
	'.highwire-markup div.issue-toc-section h2', context
      ).once('wrap-elements', function () {
        var $heading = $(this);

        // Wrap sibling elements that will be collapsed.
        $heading.siblings().wrapAll($('<div>', { class: 'inner-collapsable-content-wrapper'}));

        // Our new elements to insert.
        var $wrapper = $('<div>', { class: 'inner-collapsable-content-heading-wrapper' });
        var $toggle = $('<span>', { class: 'inner-content-toggle'});

        // Bind our click event to the toggle button we will insert.
        $toggle.bind('click', function () {
          $(this).toggleClass('is-collapsed').parent('.inner-collapsable-content-heading-wrapper').next().slideToggle();
        });

        // Add class to heading, wrap with the wrapper and insert toggle button.
        $heading.addClass('inner-collapsable-content-heading').wrap($wrapper).after($toggle);
      });

      // We have collapsible sections, so do not need the jump links.
      $('.fig-data-title-jump-link a', context).remove();

      //Need to handle bad markup for tables
      $('.pos-anchor').after("<br/>");

      // Society panel not activated with cookie.
      var $societyPanelContent = $('.pane-jnl-oup-jnl-info', context);
      var $societyPanelToggle = $('.society-panel-toggle', context);
      $societyPanelToggle.once('toggle-society-header').click(function () {
        $societyPanelToggle.toggleClass('is-collapsed');
        $societyPanelContent.slideToggle();
      });

      // If the society panel is empty, or is not the front page, it is closed.
      // Commented out code below as it may be changed later on.
      /*
      var societyPanelHasText = $('#mini-panel-jnl_oup_jnl_info', context).text().trim().length;
      var societyPanelHasImage = $('#mini-panel-jnl_oup_jnl_info img', context).length;
      var hasNoSocietyPanelContent = !societyPanelHasText && !societyPanelHasImage;
      var isNotFront = $('.not-front', context).length;
      if (isNotFront || hasNoSocietyPanelContent) {
        $societyPanelContent.once('collapse-initially').css('display', 'none');
        $societyPanelToggle.once('collapse-initially').toggleClass('is-collapsed');
      }
      */

      // When a search icon is clicked trigger the submit action its the form.
      $('form .icon-search', context).click(function () {
        $(this).parents('form').trigger('submit');
      });

      // Inputs are added by HighWire's get abstracts js. We need labels as we
      // are using image replacement on the label. Give it a blank label to render
      // as the input.
      $('input.highwire-get-abstract-checkbox', context).each(function (index) {
        var elementID = $(this).attr('id');
        // If there is no ID, create one.
        if (elementID == null) {
          elementID = 'get-abstract-checkbox-' + index;
        }
        $(this).once('insert-label').attr('id', elementID).after('<label for="'+ elementID + '">&nbsp;</label>');
      });

      // Add active class to active list item to match structure of all other pagers.
      $('.issue-browser a.active', context).once('add-active-class').parent().addClass('active');

      // Wrap AA img with the link below it.
      var papLinkHref = $('#mini-panel-jnl_oup_navigate_journal_pap a.advance-link', context).attr('href');
      $('.attach-pap-link img', context).once('wrap-advanced-link').wrap($('<a/>').attr('href', papLinkHref));

      // Wrap Open issue with the link below it.
      var openIssueHref = $('#mini-panel-jnl_oup_navigate_journal_oa a.open-link', context).attr('href');
      $('.attach-open-link img', context).once('wrap-open-link').wrap($('<a/>').attr('href', openIssueHref));

      // Wrap archive img with the link below it.
      var archiveLinkHref = $('#mini-panel-jnl_oup_navigate_journal_archive a.archive-link', context).attr('href');
      $('.pane-highwire-oup-cover-grid', context).once('wrap-archive-link').wrap($('<a/>').attr('href', archiveLinkHref));

      // Fix archive grid.
      $(window, context).on('load resize', function () {
        $('.pane-highwire-oup-cover-grid', context).css('min-height', $('.cover-issue-image img', '#mini-panel-jnl_oup_navigate_journal_current').outerHeight());
      });

      // Hide empty snippets.
      $('#oup-footer-online-issn, #oup-footer-print-issn', context).once('hide-empty-snippet', function () {
        var $snippet = $('.snippet-content', this);
        var snippetContentText = $snippet.html().trim();
        if (snippetContentText == "") {
          $snippet.addClass('snippet-empty');
        }
      });

      // Add active class to navigation tabs. As our links are created through a
      // mix of plugins and snippets, not all links run through l() and as such
      // do not have the Drupal active class applied to them.
      var currentPath = location.pathname;
      var pathToSearch = currentPath;

      // We might be on an article page, which has the url structure
      // content/issueID/volumeID/article id, so we can imply the active tab
      // from the issue and volume id. If issueless, we won't be displaying the
      // panels.
      var isArticeNode = $('body.node-type-highwire-article').length;
      if (isArticeNode) {
        var currentPathArray = currentPath.split('/');
        pathToSearch = '/' + currentPathArray[1] + '/' + currentPathArray[2] + '/' + currentPathArray[3];
      }

      // Search for the path, add active class if we find it. We do not want this
      // to run on the homepage.
      if (pathToSearch != '/') {
        $('.navigation-tab', context).once('look-for-active-class', function () {
          var $tab = $(this);
          var activeLinks = $('a[href^="' + pathToSearch + '"]', $tab);
          if (activeLinks.length) {
            $tab.addClass('active-tab');
          }
        });
      }

      // Hide editorial board roles with no data.
      $('#oup-jnl-editorial-snip .editorial-board-role', context).once('remove-headings', function () {
        var $roleHeading = $(this);
        var $personByRole = $roleHeading.next();
        if ($personByRole.html().trim() == "") {
          $roleHeading.add($personByRole).remove();
        }
      });

      // Inline table links are position: absoloute, bottom: 0 next to tables.
      // When a table's width overflows the content a scrollbar is added, which
      // overlaps with the inline links. We need to move the inline links down
      // when the table has a scrollbar.
      $('.highwire-markup .article .table-expansion', context).once('move-links-down', function () {
        var $expandedTable = $(this);
        // Layout width of the element.
        var offsetWidth = $expandedTable[0].offsetWidth;
        // Total scrollable width of the element.
        var scrollWidth = $expandedTable[0].scrollWidth;
        if (offsetWidth < scrollWidth) {
          var $parentWrapper = $expandedTable.parents('.table');
          var $inlineLinks = $('.callout', $parentWrapper);
          if ($inlineLinks.length) {
            $inlineLinks.css('bottom', '-10px');
          }
        }
      });

      // Open PDF's in a new window.
      $('a.panels-ajax-tab-tab[data-panel-name="oup_tab_pdf"], ' +
        'a.highwire-article-nav-jumplink[data-panel-ajax-tab="oup_tab_pdf"], ' +
        '#mini-panel-oup_article_tools .oup-icon-pdf a', context).unbind('click').attr('target', '_blank');

      // Trigger the load on the navigation panel when content changes.
      $('#sticky_navigation').trigger('stickyNavigationReposition');

      // We can't use nth child to removed the selectors on the last two items,
      // as some are hidden by autobot so we don't know if we need the last or
      // last 2 items to have the margin removed.
      var $toolIcons = $('.oup-grid-col-sidebar [class*="oup-icon"]', context);
      var numberOfToolIcons = $toolIcons.length;

      // Even number, apply class to second to last item as well.
      if (numberOfToolIcons %2 == 0) {
        var $iconsToRemoveMargin = $toolIcons.slice(-2);
      }
      else {
        $iconsToRemoveMargin = $toolIcons.last();
      }
      $iconsToRemoveMargin.addClass('remove-bottom-margin');
    }
  };

  // Functions to call outside of behaviours, when window is fully loaded.
  $(window).load(function () {
    // Fix the icon positioning on our carousel.
    var $relatedTitlesCarousel = $('.related-titles-carousel');
    if ($relatedTitlesCarousel.length) {
      // Calculate the tallest image value.
      var carouselImageMaxHeight = 0;

      $('.related-title-cell img', $relatedTitlesCarousel).each(function () {
        var currentCarouselImageHeight = $(this).height();
        // Save the current height if larger than previous images.
        if (currentCarouselImageHeight > carouselImageMaxHeight) {
          carouselImageMaxHeight = currentCarouselImageHeight;
        }
      });

      // Icon position top value is half the tallest image.
      var carouselIconHeight = carouselImageMaxHeight * 0.5;
      $('.jcarousel-prev, .jcarousel-next').css('top', carouselIconHeight);
    }

    // Unset the panels ajax tab cache if the references were loaded. We are
    // serving the variant to the ajax tab, so if .ref-links is loaded, we need
    // to unset the cache so that if the article tab is clicked again we reload
    // the pane with the correct variant.
    if (
      location.pathname.indexOf('.ref-link') > -1 ||
      location.pathname.indexOf('.abstract') > -1
    ) {
      $('.panels-ajax-tab > .active [data-panel-name="oup_tab_art"]').removeData('panelsAjaxTabCache').parent().removeClass('active');
    }

    // Implement sticky navigation on the TOC and article pages.
    $('.is-article-or-issue #sticky_navigation').oupStickyNav({
      outerColumnParent: $('#panel-main-section-wrapper'),
      topOffset: 20,
      bottomOffset: 25
    });
  });

  // Override HighWire drupal behaviours for article citation tooltip.
  Drupal.behaviors.highwire_article_citation_tooltip = {
    attach: function (context, settings) {
      $('div.highwire-article-citation.tooltip-enable', context).once('highwire_article_citation_tooltip', function () {
        $(this).cluetip({
          width: 750,
          height: 250,
          cluezIndex: 100,
          positionBy: 'topBottom',
          snapToEdge: true,
          cluetipClass: 'abstract-popup',
          hoverClass: 'abstract-popup-hover',
          cursor: 'pointer',
          arrows: true,
          dropShadow: false,
          sticky: true,
          mouseOutClose: 'both',
          closePosition: 'none',
          onShow: Drupal.jcoreOUPProcessMathJAX
        });
      });
    }
  };

  // Override HighWire drupal behaviours for article reference tooltip.
  Drupal.behaviors.articleRefPopup = {
    attach: function (context, settings) {
      $('a.xref-bibr', context).once('article-ref-popup', function () {
        var $referenceElement = $(this);
        // The reference tag is always going to an anchor.
        if ($('a' + $referenceElement.attr('href')).length > 0) {
          $referenceElement.attr('rel', $referenceElement.attr('href') + "~.ref-cit");
          $referenceElement.cluetip({
            cluezIndex: 100,
            local: true,
            showTitle: false,
            width: 500,
            hideLocal: false,
            sticky: true,
            mouseOutClose: 'both',
            closePosition: 'none',
            dropShadow: false,
            cluetipClass: 'article-ref-popup'
          });
        }
        else {
          $referenceElement.addClass("hw-no-refrence");
        }
      });
    }
  };

  // Override HighWire drupal behaviours for article author tooltip.
  Drupal.behaviors.articleAuthorPopup = {
    attach: function(context, settings) {
      $('.has-author-tooltip span.highwire-citation-author', context).once('article-author-popup', function () {
        var elem = $(this);
        var delta = elem.data('delta');
        var parent = elem.parents('.highwire-article-citation');
        var parentId = parent.attr('id');
        var tooltipElemID = "#hw-article-author-popups-" + parentId + " .author-tooltip-" + delta;

        if ($(tooltipElemID).length > 0) {
          elem.addClass('has-tooltip').attr('rel', tooltipElemID).cluetip({
            cluezIndex: 100,
            local: true,
            showTitle: false,
            hideLocal: true,
            sticky: true,
            positionBy: 'topBottom',
            mouseOutClose: 'both',
            closePosition: 'none',
            topOffset: 25,
            dropShadow: false,
            cluetipClass: 'article-ref-popup'
          });
        }
      });
    }
  };

  // Override the HighWire iToggle.
  Drupal.behaviors.highwire_cover_toggle = {
    attach: function (context, settings) {
      // These functions are added by the Highwire Cover Toggle plugin.
      // @see modules/highwire/plugins/content_types/highwire_cover_toggle.js
      if (typeof(getCookie) != "function" || typeof(setCookie) != "function") {
        return;
      }

      // The toggle element.
      var $toggleCheckbox = $('.highwire-cover-toggle', context);
      // Issue cover links.
      var $issueCoverLinks = $('div.issue-link', context);
      // Cookie.
      var cookie_toogle = getCookie('show_cover');

      if (cookie_toogle == 1) {
        Drupal.jcoreOUPTriggerToggleShow($issueCoverLinks);
        $toggleCheckbox.attr('checked', true);
      }

      // Trigger show / hide on change.
      $toggleCheckbox.change(function () {
        var isChecked = $toggleCheckbox.is(':checked');
        if (isChecked) {
          Drupal.jcoreOUPTriggerToggleShow($issueCoverLinks);
        }
        else {
          Drupal.jcoreOUPTriggerToggleHide($issueCoverLinks);
        }
      });
    }
  };

  /**
   * Show the covers in the archive page.
   *
   * @param issueCoverLinkElements
   *  Elements to perform the action on.
   */
  Drupal.jcoreOUPTriggerToggleShow = function (issueCoverLinkElements) {
    issueCoverLinkElements.each(function(){
      var $coverLink = $(this);
      var imageURL = $coverLink.attr('data-cover-image');
      if (imageURL) {
        var issueURL = $coverLink.attr('data-cover-issue-url');
        $coverLink.prepend('<a class="cover-link-toggle" href="' + issueURL +  '"><img class="cover-image-toggle" src="' + imageURL + '"></a>');
      }
      setCookie('show_cover', 1, 10);
      $coverLink.parents('.issue-month-detail').addClass('show-cover-image');
    });
  };

  /**
   * Hide the covers in the archive page.
   *
   * @param issueCoverLinkElements
   *  Elements to perform the action on.
   */
  Drupal.jcoreOUPTriggerToggleHide = function (issueCoverLinkElements) {
    issueCoverLinkElements.each(function(){
      var $coverLink = $(this);
      $coverLink.children('.cover-link-toggle').remove();
      setCookie('show_cover', 0, 10);
      $coverLink.parents('.issue-month-detail').removeClass('show-cover-image');
    });
  };

  /**
   * Process cluetip Mathjax.
   *
   * @param $clueTipElement
   *  The jQuery cluetip object.
   * @param $cluetipInnerElement
   *  The jQuery cluetip inner object.
   */
  Drupal.jcoreOUPProcessMathJAX = function ($clueTipElement, $cluetipInnerElement) {
    // Process MathJAX if we have it.
    if ($('.mathjax', $cluetipInnerElement).length && typeof(MathJax.Hub.Queue) != "undefined") {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, $cluetipInnerElement[0]]);
    }
  };

})(jQuery);
;
