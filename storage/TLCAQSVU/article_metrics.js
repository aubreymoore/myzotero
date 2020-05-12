(function($, document) {
  'use strict';

  $(function() {

    // data loader - OLD Method
    var loadData = function(artefactId) {

      var defer = $.Deferred();
      var outstanding = 2;
      var result = {};

      $.get('/ajax/altmetric/' + artefactId)
        .success(function(data) {
          result.altmetric = $.parseJSON(data);
          updateMetricsForMobiles(result);

          // for testing purposes:
          //
          // var tempAltmetric = $.extend({}, almetricsDefaults);
          // for (var key in tempAltmetric) {
          //   // tempAltmetric[key] = Math.min(Math.round(Math.random()*10000), 9999);
          //   tempAltmetric[key] = 1;
          // }

          // var tempReaders = $.extend({}, readersDefaults);
          // for (var key in tempReaders) {
          //   // tempReaders[key] = Math.min(Math.round(Math.random()*10000), 9999);
          //   tempReaders[key] = 1;
          // }

          // result.altmetric = $.extend(result.altmetric, tempAltmetric, tempReaders);
        })
        .done(function(data) {
          outstanding--;

          if (outstanding === 0) {
            defer.resolve(result);
          }
        });

      $.get('/ajax/citationCounts/' + artefactId)
        .success(function(data) {
          result.citationCounts = $.parseJSON(data);
          updateCountsForMobiles(result);
        })
        .done(function(data) {
          outstanding--;

          if (outstanding === 0) {
            defer.resolve(result);
          }
        });

      return defer;
    };

    /**
     * Delay a stream
     * @param  {int} delay Milliseconds to wait
     * @return {Function}       A function returning a promise that will be resolved after the delay time
     */
    var wait = function(delay) {
      return function() {
        var waitPromise = $.Deferred();
        setTimeout(waitPromise.resolve, delay);
        return waitPromise.promise();
      };
    };

    // get altmetric data for browse/list/article/asset page views
    var getMetricsData = function(artefactId, artefactVersionId) {
      var defer = $.Deferred(),
        result = {},
        urlMetrics = '';

      if (!options.hasOwnProperty('asset')) { // service for articles

        var outstanding = 2,
          urlCounts = "/ajax/citationCounts/" + artefactId + "/" + artefactVersionId;
        urlMetrics = "/ajax/altmetric/" + artefactId;

        $.get(urlMetrics)
          .success(function(data) {
            result.altmetric = $.parseJSON(data);
            updateMetricsForMobiles(result);
          })
          .done(function(data) {
            outstanding--;
            if (outstanding === 0) {
              defer.resolve(result);
            }
          })
          .then(wait(100))
          .then(function() {
            return $.get(urlCounts)
              .success(function(data) {
                result.citationCounts = $.parseJSON(data);
                updateCountsForMobiles(result);
              })
              .done(function(data) {
                outstanding--;
                if (outstanding === 0) {
                  defer.resolve(result);
                }
              });
          });

        return defer;

      } else { // service for assets (e.g. posters, slides, document)

        urlMetrics = "/ajax/asset/altmetric/" + artefactId;

        $.get(urlMetrics)
          .success(function(data) {
            result.altmetric = $.parseJSON(data);
            updateMetricsForMobiles(result);
          })
          .done(function(data) {
            defer.resolve(result);
          });

        return defer;
      }
    };

    // data helpers
    var isAltmetricEmpty = function(data) {
      if (data.altmetric) {
        if (!$.isEmptyObject(data.altmetric)) {
          return false;
        }
      }
      return true;
    };

    var isCitationCountsEmpty = function(data) {
      if (data.citationCounts) {
        if (data.citationCounts.pubmedCount > 0 || (data.citationCounts.scopusCount > 0 && data.citationCounts.scopusUrl != null)) {
          return false;
        }
      }
      return true;
    };

    var isDocumentCountsEmpty = function(data) {
      if (data.documentCounts) {
        if (data.documentCounts.views > 0 || data.documentCounts.downloads > 0) {
          return false;
        }
      }
      return true;
    };

    var isEmpty = function(data) {
      return !data || isCitationCountsEmpty(data) && isAltmetricEmpty(data) && isDocumentCountsEmpty(data);
    };

    // colors and legends for readers list.
    var readersDefaults = {
      'citeulike': {
        text: '**COUNT** reader(s) on CiteULike',
        colour: '#BAD0EE'
      },
      'connotea': {
        text: '**COUNT** reader(s) on Connotea',
        colour: '#00BFFF' // random colour
      },
      'mendeley': {
        text: '**COUNT** reader(s) on Mendeley',
        colour: '#A60000'
      }
    };

    // colors and legends for altmetric list.
    var almetricsDefaults = {
      'cited_by_tweeters_count': {
        text: 'Tweeted by **COUNT**',
        colour: '#2F90B9'
      },
      'cited_by_feeds_count': {
        text: 'Blogged by **COUNT**',
        colour: '#e89500'
      },
      'cited_by_fbwalls_count': {
        text: 'On **COUNT** Facebook page(s)',
        colour: '#071D70'
      },
      'cited_by_gplus_count': {
        text: 'Mentioned in **COUNT** Google+ post(s)',
        colour: '#912470'
      },
      'cited_by_msm_count': {
        text: 'Picked up by **COUNT** news outlet(s)',
        colour: '#B60000'
      },
      'cited_by_linkedin_count': {
        text: 'Mentioned in **COUNT** LinkedIn forum(s)',
        colour: '#00BFFF'
      },
      'cited_by_rdts_count': {
        text: 'Reddited by **COUNT**',
        colour: '#B9DDEB'
      },
      'cited_by_f1000_count': {
        text: 'Highlighted by **COUNT** platform(s)',
        colour: '#CB2D2D'
      },
      'cited_by_rh_count': {
        text: 'Highlighted by **COUNT** platform(s)',
        colour: '#CB2D2D'
      },
      'cited_by_pinners_count': {
        text: 'Pinned by **COUNT** on Pinterest',
        colour: '#CC3300'
      },
      'cited_by_forums_count': {
        text: 'Mentioned in **COUNT** Q&A thread(s)',
        colour: '#DEDEDE' // light
      },
      'cited_by_qna_count': {
        text: 'Mentioned in **COUNT** Q&A thread(s)',
        colour: '#DEDEDE' // light
      },
      'cited_by_qs_count': {
        text: 'Mentioned in **COUNT** Q&A thread(s)',
        colour: '#DEDEDE' // light
      },
      'cited_by_videos_count': {
        text: 'On **COUNT** video(s)',
        colour: '#98C973'
      },
      'cited_by_unknown_count': {
        text: 'Mentioned in **COUNT** misc. post(s)',
        colour: '#DEDEDE' // light
      },
      'cited_by_wikipedia_count': {
        text: 'Referenced in **COUNT** Wikipedia page(s)',
        colour: '#3b2a3d'
      },
      'cited_by_peer_review_sites_count': {
        text: 'Mentioned by **COUNT** peer review site(s)',
        colour: '#bdbdbd'
      },
      'cited_by_weibo_count': {
        text: 'Mentioned by **COUNT** weibo user(s)',
        colour: '#df931b'
      },
      'cited_by_policies_count': {
        text: 'Referenced in **COUNT** policy source(s)',
        colour: '#270a63'
      }
    };

    var popover;
    var mainIcon;
    var options = {};
    var hidden = true;

    var updateTextCount = function(text, count) {
      text = text.replace('**COUNT**', count);
      if (count === 1) {
        text = text.replace('(s)', '');
      } else {
        text = text.replace('(s)', 's');
      }
      return text;
    };

    // update metrics for mobiles
    var updateMetricsForMobiles = function(data) {
      if (isEmpty(data)) {
        $(".metrics-details-container").hide();
      } else {
        $(".altmetric-mobile-column-counts").html(getColoursAndTextsFromAltmetrics(data));
        $(".altmetric-mobile-column-readers").html(getReadersList(data));
        $(".altmetrics-more-link a").attr("href", data.altmetric.altmetricPageUrl);

        // hide for assets
        if (($('.metrics-details-container--assets').length < 1) && ($('.article-metrics-versions-disclaimer').length < 1)) {
          $(".metrics-details-container .altmetric-section").append(getVersionsDisclaimer());
        }
      }
    };

    // update citation counts for mobiles
    var updateCountsForMobiles = function(data) {
      if (isCitationCountsEmpty(data)) {
        $(".metrics-citations-container").hide();
      } else {
        if (data.citationCounts.scopusCount > 0 && data.citationCounts.scopusUrl != null) {
          $(".citations-scopus-logo a").removeClass("is-hidden").attr("href", data.citationCounts.scopusUrl);
          $(".toolbox-section-count.scopus a.scopus-citation-link").attr("href", data.citationCounts.scopusUrl);
          $(".toolbox-section-count.scopus a.scopus-citation-link").text(data.citationCounts.scopusCount);
        } else {
          var scopusParent = $(".citations-scopus-logo").parent();
          scopusParent.hide();
          scopusParent.parent().find(".toolbox-section-option-divider.metrics").hide();
        }
        if (data.citationCounts.pubmedCount > 0 && data.citationCounts.pubmedId != null) {
          $(".citations-pubmed-logo a").removeClass("is-hidden").attr("href", "https://europepmc.org/search?query=CITES:" + data.citationCounts.pubmedId + "_MED");
          $(".toolbox-section-count.pubmed a.pubmed-citation-link").attr("href", "https://europepmc.org/search?query=CITES:" + data.citationCounts.pubmedId + "_MED");
          $(".toolbox-section-count.pubmed a.pubmed-citation-link").text(data.citationCounts.pubmedCount);
        }
      }
    };

    // altmetrics list
    var getColoursAndTextsFromAltmetrics = function(data) {
      var altmetric = data.altmetric;
      var list = $('<ul></ul>', {
        class: 'altmetric-count-list'
      });
      var hasItems = false;

      for (var key in altmetric) {
        if (altmetric.hasOwnProperty(key) && key.indexOf('cited_by_') === 0) {
          var count = altmetric[key];
          var settings = almetricsDefaults[key];
          if (count > 0 && settings) {
            var item = $('<li></li>', {
              'class': 'altmetric-count-item'
            });

            $('<span></span>', {
                'class': 'altmetric-count-colour',
                'style': 'background-color: ' + settings.colour + ';'
              })
              .appendTo(item);

            $('<span></span>', {
                'class': 'altmetric-count-text'
              })
              .text(updateTextCount(settings.text, count))
              .appendTo(item);

            item.appendTo(list);
            hasItems = true;
          }
        }
      }

      return hasItems ? list : null;
    };

    // readers list
    var getReadersList = function(data) {
      var altmetric = data.altmetric;
      var list = $('<ul></ul>', {
        'class': 'altmetric-count-list'
      });
      var hasItems = false;

      for (var key in altmetric) {
        if (altmetric.hasOwnProperty(key) && key.indexOf('cited_by_') !== 0) {
          var count = altmetric[key];
          var settings = readersDefaults[key];
          if (count > 0 && settings) {
            var item = $('<li></li>', {
              'class': 'altmetric-count-item'
            });

            $('<span></span>', {
                'class': 'altmetric-count-colour',
                'style': 'background-color: ' + settings.colour + ';'
              })
              .appendTo(item);

            $('<span></span>', {
                'class': 'altmetric-count-text'
              })
              .text(updateTextCount(settings.text, count))
              .appendTo(item);

            item.appendTo(list);
            hasItems = true;
          }
        }
      }

      return hasItems ? list : null;
    };

    // altmetric section
    var getAltmetricWrapper = function(data) {
      var fragment = $(document.createDocumentFragment());

      var columnWrapper = $('<div></div>', {
        'class': 'altmetric-columns clearfix'
      });

      var leftColumn = $('<div></div>', {
        'class': 'altmetric-left-column altmetric-badge'
      }).appendTo(fragment);

      $('<a></a>', {
          'class': 'altmetrics-link',
          'href': data.altmetric.altmetricPageUrl,
          'target': '_blank'
        })
        .text('SEE MORE DETAILS')
        .appendTo(leftColumn)
        .before('<span class="altmetrics-powered">Powered by Altmetric</span>')

      var rightColumn = $('<div></div>', {
        'class': 'altmetric-right-column'
      });
      var countList = getColoursAndTextsFromAltmetrics(data);
      if (countList) {
        countList.appendTo(rightColumn);
      }

      var readersList = getReadersList(data);
      if (readersList) {
        if (countList) {
          readersList.addClass('margin-top');
        }
        readersList.appendTo(rightColumn);
      }

      leftColumn.appendTo(columnWrapper);
      rightColumn.appendTo(columnWrapper);
      columnWrapper.appendTo(fragment);

      return fragment;
    };

    // views/downloads section
    var getDocumentCountsWrapper = function(data) {
      var wrapper = $('<div></div>', {
          'class': 'article-metrics-pageinfo'
        }),
        infoList = $('<ul></ul>', {
          'class': 'article-metrics-citations-list'
        });

      //if (data.documentCounts.views > 0) {
      $('<li></li>', {
          'class': 'article-metrics-citation page-views-count'
        })
        .text(data.documentCounts.views)
        .appendTo(infoList);
      //if (data.documentCounts.downloads > 0) {
      $('<li></li>', {
        'class': 'article-metrics-citation-delimiter pageinfo'
      }).appendTo(infoList);
      //}
      //}
      //if (data.documentCounts.downloads > 0) {
      $('<li></li>', {
          'class': 'article-metrics-citation page-downloads-count'
        })
        .text(data.documentCounts.downloads)
        .appendTo(infoList);
      //}
      infoList.appendTo(wrapper);
      return wrapper;
    };

    // citations section
    var getCitationCountsWrapper = function(data) {
      var wrapper = $('<div></div>', {
        'class': 'article-metrics-citations'
      });

      var header = $('<h2></h2>', {
          'class': 'article-metrics-citations-header'
        })
        .text('Citations')
        .appendTo(wrapper);

      var citationsList = $('<ul></ul>', {
        'class': 'article-metrics-citations-list'
      });

      if (data.citationCounts.scopusCount > 0 && data.citationCounts.scopusUrl != null) {
        $('<li></li>', {
            'class': 'article-metrics-citation scopus-citations-count'
          })
          .html("<a href='" + data.citationCounts.scopusUrl + "' class='metrics-citation-icon' target='_blank' title='View full citation details at www.scopus.com'><i class='material-icons scopus-icon'>open_in_new</i></a><a href='" + data.citationCounts.scopusUrl + "' class='scopus-citation-link' target='_blank' title='View full citation details at www.scopus.com'>" + data.citationCounts.scopusCount + "</a>")
          .appendTo(citationsList);

        if (data.citationCounts.pubmedCount > 0) {
          $('<li></li>', {
            'class': 'article-metrics-citation-delimiter'
          }).appendTo(citationsList);
        }
      }

      if (data.citationCounts.pubmedCount > 0) {
        $('<li></li>', {
            'class': 'article-metrics-citation pubmed-citations-count ' + F1000platform.name
          })
          .html("<a href='https://europepmc.org/search?query=CITES:" + data.citationCounts.pubmedId + "_MED' class='metrics-citation-icon " + F1000platform.name + "' target='_blank' title='View full citation details at https://europepmc.org'><i class='material-icons scopus-icon'>open_in_new</i></a><a href='https://europepmc.org/search?query=CITES:" + data.citationCounts.pubmedId + "_MED' class='scopus-citation-link' target='_blank' title='View full citation details at https://europepmc.org'>" + data.citationCounts.pubmedCount + "</a>")
          .appendTo(citationsList);
      }

      citationsList.appendTo(wrapper);

      return wrapper;
    };

    // version disclaimer border
    var getVersionsDisclaimerBorder = function() {
      return $('<div></div>', {
        'class': 'article-metrics-versions-disclaimer-border'
      });
    };

    // version disclaimer
    var getVersionsDisclaimer = function() {
      return $('<div></div>', {
          'class': 'article-metrics-versions-disclaimer'
        })
        .text('Values are totals across all versions of this article');
    };

    // popover close icon
    var getPopoverCloseIcon = function() {
      return $('<button></button>', {
          'class': 'article-metrics-close-button f1r-icon icon-4_close_small',
          'type': 'button',
          'title': 'close'
        })
        .on('click.f1r.am', hidePopover);
    };

    // empty popover
    var getEmptyPopover = function() {
      var shadowWrapper = $('<div></div>', {
        'class': 'article-metrics-popover-wrapper'
      });
      var wrapper = $('<div></div>', {
          'class': 'article-metrics-popover empty-popover'
        })
        .text('There are no metrics for this article yet')
        .appendTo(shadowWrapper);

      getPopoverCloseIcon().appendTo(wrapper);
      getPopoverArrow().appendTo(wrapper);
      return shadowWrapper;
    };

    // popover arrow
    var getPopoverArrow = function() {
      return $('<div></div>', {
        'class': 'article-metrics-popover-arrow'
      });
    };

    // main popover
    var getPopover = function(data) {
      var shadowWrapper = $('<div></div>', {
        'class': 'article-metrics-popover-wrapper'
      });
      var wrapper = $('<div></div>', {
        'class': 'article-metrics-popover'
      }).appendTo(shadowWrapper);
      var primeRecommended = "<div class='prime-rec-wrapper u-prime t-center t-body-2 u-mb--2'><span class='f1r-icon icon-79_faculty_recommended_badge big red vmiddle u-prime'></span><i class='c-icn--prime u-prime'></i> Faculty Recommended</div>";

      var primeRecommendedLink = $("<a href='" + data.recommendedLink + "' class='recommended-link prime-red u-prime' target='_blank'></a>");
      getPopoverCloseIcon().appendTo(wrapper);

      var altmetricWrapper, citationCountsWrapper, documentCountsWrapper, primeWrapper;
      $('<div></div>', {
        'class': 'article-metrics-popover-heading'
      }).prepend('<span class="metrics-on-browse article-metrics-icon f1r-icon icon-89_metrics"></span>METRICS').appendTo(wrapper);
      $('<hr />', {
        'class': 'article-metrics-separator has-another-row',
        style: 'border-top: none'
      }).appendTo(wrapper);

      //if (!isDocumentCountsEmpty(data)) {
      documentCountsWrapper = getDocumentCountsWrapper(data);
      documentCountsWrapper.appendTo(wrapper);
      //}

      if (!isCitationCountsEmpty(data)) {
        if (documentCountsWrapper) {
          $('<hr />', {
            'class': 'article-metrics-separator has-another-row',
            style: 'border-top: none'
          }).appendTo(wrapper);
        }
        if ((data.citationCounts.scopusCount > 0 && data.citationCounts.scopusUrl != null) || data.citationCounts.pubmedCount > 0) {
          citationCountsWrapper = getCitationCountsWrapper(data);
          citationCountsWrapper.appendTo(wrapper);
        }
      }

      if (options.articleMetricsView) {
        $('.metrics-on-browse').removeAttr('title');
        if (data.documentCounts.prime !== 0) {
          if (citationCountsWrapper || documentCountsWrapper) {
            $('<hr />', {
              'class': 'article-metrics-separator'
            }).appendTo(wrapper);
          }
          primeWrapper = $('<div></div>', {
            'class': 'article-metrics-prime'
          });
          $(primeRecommended).wrapInner(primeRecommendedLink).appendTo(primeWrapper);
          primeWrapper.appendTo(wrapper);
        }
      }

      if (!isAltmetricEmpty(data)) {
        if (citationCountsWrapper || documentCountsWrapper || primeWrapper) {
          $('<hr />', {
            'class': 'article-metrics-separator'
          }).appendTo(wrapper);
        }
        altmetricWrapper = getAltmetricWrapper(data);
        altmetricWrapper.appendTo(wrapper);
      }

      var $assetsWrapper = $('.asset-metrics-wrapper');

      if ($assetsWrapper.length < 1) { // don't show disclaimer for assets
        var disclaimerBorder = getVersionsDisclaimerBorder();
        disclaimerBorder.appendTo(wrapper);
        var versionsDisclaimer = getVersionsDisclaimer();
        versionsDisclaimer.appendTo(wrapper);
      }

      if (!options.articleMetricsView) {
        getPopoverArrow().appendTo(wrapper);
      }

      return shadowWrapper;
    };

    // get/create the background mask for metrics views
    var getMetricsMask = function() {
      var bgMask = $("#metrics-mask"),
        spinner = $('<div></div>', {
          'class': 'metrics-loading'
        }),
        spinnerHeader = $('<h1 class="metrics-heading"><span class="f1r-icon icon-89_metrics"></span>Metrics</h1>'),
        spinnerCloseIcon = $('<a></a>', {
          'class': 'loading-close-button f1r-icon icon-4_close_small',
          'title': 'close',
          'href': 'javascript:void(0);'
        }),
        spinAnimation = $("<div></div>", {
          "class": "loader"
        });
      if (!bgMask.length) {
        spinnerCloseIcon.appendTo(spinner);
        spinnerHeader.appendTo(spinner);
        spinAnimation.appendTo(spinner);
        $('<div></div>', {
          'id': 'metrics-mask',
          'class': 'metrics-mask'
        }).appendTo($("body"));
        bgMask = $("#metrics-mask");
        spinner.appendTo(bgMask);
      }
      return bgMask;
    };

    // open popover event handlers
    var openEmptyPopover = function(target) {
      if (!hidden) {
        return;
      }
      if (mainIcon) {
        mainIcon.addClass('is-hovered');
      }
      if (!popover || options.articleMetricsView) {
        popover = getEmptyPopover();
        popover.appendTo(target).hide();
      }
      popover.animate({
        width: 'toggle'
      }, 150);
      if (options.onOpening) {
        options.onOpening();
      }
      hidden = false;
    };

    var openPopover = function(target, data, e) {
      if (!hidden) {
        return;
      }
      if (mainIcon) {
        mainIcon.addClass('is-hovered');
      }
      var $popoverWrapper = $(e.target).closest('.article-metrics-wrapper'),
        $noOfPopovers = $popoverWrapper.find('.article-metrics-popover').length;

      if (!popover || options.articleMetricsView) {
        if ($noOfPopovers < 1) { // if popover does not exist
          popover = getPopover(data);
          popover.appendTo(target).hide();
        } else { // popover exists, so find existing one; avoid multiple popovers being added to dom
          popover = $popoverWrapper.find('.article-metrics-popover-wrapper');
        }
      }
      popover.animate({
        width: 'toggle'
      }, 150);
      if (options && options.onOpening) {
        options.onOpening();
      }
      hidden = false;
    };

    // close popover event handler
    var hidePopover = function() {
      if (hidden) {
        return;
      }
      if (popover) {
        popover.animate({
          width: 'toggle'
        }, 150);
      }
      if (mainIcon) {
        mainIcon.removeClass('is-hovered');
      }
      if (options.onClosing) {
        options.onClosing();
      }
      hidden = true;
      $('.metrics-on-browse').attr('title', 'article metrics');
    };

    // main metrics icon
    var attachToMetricsIcon = function(target, mouseenter, mouseleave) {
      // http://tools2.lsc.net:8181/browse/RESEARCH-3153
      // var icon = $('.article-metrics-icon', target).on('mouseenter.f1r.am', mouseenter);
      var icon = $('.article-metrics-icon', target).on('click.f1r.am', mouseenter);

      // BugHerd 286:
      // Metrics panel should stay visible until user click the (x) close icon.
      //target.on('mouseleave.f1r.am', mouseleave);
      return icon;
    };

    // empty popover initialization
    var addEmptyPopover = function(target) {
      if (options.articleMetricsView) {
        openEmptyPopover(target);
      } else {
        mainIcon = attachToMetricsIcon(target, function() {
          openEmptyPopover(target);
        }, hidePopover);
      }
    };

    // main popover initialization
    var addPopoverWithData = function(target, data, e) {
      if (options.articleMetricsView) {
        openPopover(target, data, e);
      } else {
        mainIcon = attachToMetricsIcon(target, function() {
          openPopover(target, data);
        }, hidePopover);
      }
    };


    // UPDATED CODE - to handle list view pages(Browse/Search/Channels/Subjects), Article and Assets pages
    var bindMetricsHandlers = function() {
      $("body").on("click", ".metrics-on-browse .article-metrics-close-button, .loading-close-button", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("#metrics-mask").fadeOut(300, function() {
          $("#metrics-mask").remove();
          if ($(".js-replace-iframe-ie").size()) {
            $("#pdf-object-container").show();
            $(".js-replace-iframe-ie").remove();
          }
        });
        hidePopover();
      });

      $("body").on("click", ".article-metrics-wrapper:not(.js-is-preview)", function(e) {
        if (e.target.className.indexOf('article-metrics-popover-wrapper') >= 0) {
          return;
        }
        // console.log('article-metrics-wrapper');
        var artefactId = $(this).attr("data-id"),
          artefactVersionId = $(this).attr("data-version-id"),
          downloadCount = $(this).attr("data-downloads") || 0,
          viewCount = $(this).attr("data-views") || 0,
          prime = $(this).attr("data-recommended") || 0,
          target = $(this).find(".metrics-on-browse.article-metrics-icon"),
          bgMask = getMetricsMask(),
          recommendedLink = $(this).parent().find('.prime-recommended-iconlink').attr('href') || $('.article-page').find('.prime-recommended-iconlink').attr('href') || $(this).data('prime-link'),
          mobileMetrics = $(this).hasClass("mobile-metrics"),
          responsiveHeader = $('.the-responsive-header').is(':visible'),
          theGatewaysHeader = $('.js-sticky-header').length;

        if (!mobileMetrics) {

          if (!responsiveHeader) {
            var spaceTop = theGatewaysHeader ? 200 : 100;
            $('html, body').animate({
              scrollTop: $(this).offset().top - spaceTop //scroll to article with clicked metrics
            }, 600);
          }
          bgMask.show();
        }

        getMetricsData(artefactId, artefactVersionId)
          .then(function(data) {

            $(".metrics-loading").remove();

            if (typeof recommendedLink !== "undefined") {
              $(this).attr('data-primelink', recommendedLink);
              data.recommendedLink = recommendedLink;
            }
            data.documentCounts = {
              "views": viewCount,
              "downloads": downloadCount,
              "prime": prime
            };
            //if (isEmpty(data)) {
            //addEmptyPopover(target);
            //} else {
            addPopoverWithData(target, data, e);
            //}
          })
          .fail(function(data) {
            $(".metrics-loading").remove();
            console.log('ERROR', data);
          });
      });
    };
    bindMetricsHandlers();

    $.fn.attachArticleMetrics = function(artefactId, userOptions) {

      // artefactId = id of article, asset
      if (!artefactId) {
        throw 'Invalid artefact ID.';
      }

      options = userOptions || {};

      return $.each(this, function() {
        var self = $(this);

        if (!options.articleMetricsView) {

          loadData(artefactId).then(function(data) {
            if (isEmpty(data)) {
              addEmptyPopover(self);
            } else {
              addPopoverWithData(self, data);
            }
          });
        }
      });
    };
  });
})(window.jQuery, document);