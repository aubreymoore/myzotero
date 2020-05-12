/* Author: Squiz NZ
*/
(function($) {
  $(document).ready(function() {

    // track downloads for google analytics
    $('a[href$=".pdf"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".zip"], a[href$=".mpg"], a[href$=".mpeg"], a[href$=".doc"], a[href$=".docx"], a[href$=".ppt"], a[href$=".pptx"]').live('click', function(e) {
      _gaq.push(['_trackEvent', 'download', 'click', this.href.replace(/^.*\/\//, '')]);
    });
    
    // track custom events for google analytics
    if ($('span[data-ga="tracking"]').length) {
      var tracker = $('span[data-ga="tracking"]'),
          category = tracker.data("category"),
          action =  tracker.data("action"),
          value =  location.href.replace(/^.*\/\//, '');
       _gaq.push(['_trackEvent', category, action, value]);
    }

    if ($('.ui-tab').length) {
      createTabbedUI();
    }

    if ($('body.home, body#id9106').length) {
      slider();
    }

    if ($('.db').length) {
      databaseVisual();
      dbLoader();
    }

    if ($('table.sortable').length) {
      addTableSorting();
    }

    conserveHeaderSpace();
    setDefaultSearchDropdown();
    formPretties();
    // tertiaryNav(); // Accordion functionality of needed.

    hoverIntentInit();

    captionGenerationFromAltTag();

    if ($('#id9007').length) {
      carabidaeImageGallery();
    } else {
      addTitleAttrToLinks();
    }

    advancedSearchToggle();

    simpleAccordion();

    addLightbox();

    addPrintLink();

    $('.sci-publish-date').each(function() {
      $(this).prev('div').closest('.page_div').append(this);
    })

    if ($('#captcha-error').length) {
       focusOnError();
    }

    addSearchQueryCompletion();

    if ($('.compare-content').length) {
      var bugType = $('.compare-content').attr('data-species');
      $.Jookie.Initialise(bugType, -1);
      var currentAssetIDs = [];
      compareTool();
    }

    var $result = null;

    /*
      HELPERS
    */
    $(window).bind('load resize orientationchange', function() {
      $.event.trigger('windowResized');
    });


    /*
      FUNCTIONS
    */

    function compareTool() {

      // check whether there is already contents in the cookie, then show/hide correct buttons for bugs already in the cookie
      if (typeof $.Jookie.Get(bugType, 'comparedAssets') != 'undefined') {
        currentAssetIDs = $.Jookie.Get(bugType, 'comparedAssets');
        var compareLength = currentAssetIDs.length;
        var element;
        for (var i = 0; i < compareLength; i++) {
            element = currentAssetIDs[i];
            $('.compare-content .asset' + element + ' .show-compare').removeClass('hidden');
            $('.compare-content .asset' + element + ' .remove-compare').removeClass('hidden');
            $('.compare-content .asset' + element + ' .add-compare').addClass('hidden');
        };
      };

      $('.add-compare').click(function() {
        addBugToCookie($(this)); // pass through the button that was clicked
      });

      $('.show-compare').click(function() {
        showCompareTool($(this)); // pass through the button that was clicked
      });

      $('.remove-compare').click(function() {
        removeBugFromCookie($(this)); // pass through the button that was clicked
      });

    } // end compareTool

    function showCompareTool($link) {

      var compareHref = $link.attr('href') + '?compare=' + $.Jookie.Get(bugType, 'comparedAssets');
      $('.compare-content').fadeOut();
      $('.compared-content').load(compareHref, function() {
        $('.compared-content').fadeIn();
        $('html, body').animate({ scrollTop: $('#main h1').offset().top }, 'slow');

        // Set up Compared Images using the methods that display them on the original page.
        addTitleAttrToLinks();
        addLightbox();
        databaseVisual();

        // Set up button functions on Compare Tool page
        $('.compared-content .remove-compare').click(function() {
          $(this).parent().parent().remove();
          removeBugFromCookie($(this));
          // If last bug on compareTool, show orginal page content
          if (!($.Jookie.Get(bugType, 'comparedAssets').length)) {
            $('.compared-content').fadeOut();
            $('.compare-content').fadeIn();
          };
        });

        $('.compared-content .return').click(function() {
          $('.compared-content').fadeOut();
          $('.compare-content').fadeIn();
        });

        $('.compared-content .add-another-compare').click(function() {
          var compareLength = currentAssetIDs.length;
          if (compareLength > 3) {
            alert("You have already selected 4 bugs, please remove one before adding another");
          }
          else {
            $('.compared-content').fadeOut();
            $('.compare-content').fadeIn();
          }
        });

      });

    } // end showCompareTool

    function  addBugToCookie($link) {
      var compareLength = currentAssetIDs.length;
      if (compareLength > 3) {
        alert('You have already selected 4 bugs, please remove one before adding another');
      }
      else {
        currentAssetIDs[compareLength] = $link.parent().parent().attr('class').substring(5);   // removes first letters to leave just the Asset ID
        $.Jookie.Set(bugType, 'comparedAssets', currentAssetIDs);
        $link.addClass('hidden');
        $link.siblings($('.show-compare')).removeClass('hidden');
        $link.siblings($('.remove-compare')).removeClass('hidden');
      }
    } // end addBugToCookie

    function removeBugFromCookie($link) {

      // get class of bug li element so that buttons are correctly displayed when original content is reloaded
      var currentParent = $link.parent().parent().attr('class'); 
      $('.compare-content .' + currentParent + ' .show-compare').addClass('hidden');
      $('.compare-content .' + currentParent + ' .remove-compare').addClass('hidden');
      $('.compare-content .' + currentParent + ' .add-compare').removeClass('hidden');
      var currentBug = currentParent.substring(5);  // removes first letters to leave just the Asset ID
      var bugPosition = $.inArray(currentBug, currentAssetIDs);  // finds position of bug in array
      currentAssetIDs.splice(bugPosition,1); // removes bug from array
      $.Jookie.Set(bugType, 'comparedAssets', currentAssetIDs); // resets cookie with new array contents

    } // end removeBugFromCookie


    function hoverIntentInit() {

      /* Helper functions */
      function onHover(){
        $(this).addClass('hover');
      }

      function onUnHover(){
        $(this).removeClass('hover');
      }

      var config = {
        over: onHover, // function = onMouseOver callback (REQUIRED)
        timeout: 500, // number = milliseconds delay before onMouseOut
        out: onUnHover // function = onMouseOut callback (REQUIRED)
      };
      $('#nav-primary>ul>li').hoverIntent(config);

    } // end hoverIntentInit


    function conserveHeaderSpace() {

      /* Helper functions */
      function expand(caller, target) {

        if (caller.siblings('.open').length) {
          caller.siblings('.open').each(function() {
            $(this).click();
          })
        }
        caller.addClass('open');
        $(target).removeClass('xshide');

      } // end expand

      function collapse(caller, target) {

        caller.removeClass('open');
        $(target).addClass('xshide');

      } // end collapse

      var minimalNav = $('<div class="text-group buttons minimal-nav" />').insertAfter('#logo');

      // Turns primary nav items into a slidedown to conserve header space
      $('<a class="text-group-item" data-target="#nav-primary" href="#">Menu</a></li>').appendTo(minimalNav).toggle(
        function() { collapse($(this), $(this).attr('data-target'))},
        function() {  expand($(this), $(this).attr('data-target'))}
      ).click();

      //turns search into a slide down to conserve header space
      $('<a class="text-group-item" data-target="#search" href="#">Search</a>').appendTo(minimalNav).toggle(
        function() { collapse($(this), $(this).attr('data-target'))},
        function() {  expand($(this), $(this).attr('data-target'))}
      ).click();

    } // end conserveHeaderSpace

    function slider() {

      //Grabs the slider script as well as all the slides, then makes it into a slideshow

      var initialSlide = $('#hp-slideshow').find('.slide');
      initialSlide.replaceWith('<ul class="slideshow"><li class="slide" data-img-small="' + initialSlide.attr('data-img-small') + '" data-img-large="' + initialSlide.attr('data-img-large') + '">' + initialSlide.html() + '</li></ul>');

      // Determine correct URL to use for loading the remainder of the slides
      var url = '';
      var pageAssetId = $('body').attr('id');
      pageAssetId = pageAssetId.substring(2);
      switch(pageAssetId) {
        case '75':
          url = '/js-content/homepage-slides';
          break;
        case '9106':
          url = '/js-content/science-slides';
          break;
      }

      if (url.length) {
        $.get(url, function(d){
          $('.slideshow').append(d)
          $('.slideshow .slide').bind('windowResized', scaleImage);

          function scaleImage() {
            $('.slideshow .slide').each(function() {
              if ($(this).find('.viz').length < 1) $(this).prepend('<img class="viz" />');
              if (document.documentElement.clientWidth <= 480) {
                $(this).find('.viz').attr("src", $(this).attr('data-img-small'));
              } else {
                $(this).find('.viz').attr("src", $(this).attr('data-img-large'));
              }
            })
          }
          scaleImage();

          $('.slideshow').responsiveSlides({
            auto: false,
            pagination: true,
            nav: true,
            fade: 500
          });

          if($('html.lt-ie9').length > 0) {

            $('.rslides .content').fadeTo(1, 0.8);

            $('.rslides_nav').fadeTo(1, 0.001).hover(function(){
              $(this).fadeTo('fast', 0.8)
            }, function(){
              $(this).fadeTo('fast', 0.001)
            })

          }
        })
      }
    } // end slider


    function tertiaryNav() {

      var lis = $('.ui-nav-tertiary').children('li'),
      childa = lis.has('ul').children('a').addClass('hasDD');

      if(lis.has('ul').length > 0){
         lis.not('.hier, .active').children('ul').hide();
         var dropdownControls = $('<span class="dd-Control" href="#">&nbsp;</span>').toggle(function(){
                         $(this).addClass('open').siblings('ul').show();
      }, function(){
             $(this).removeClass('open').siblings('ul').hide();
      }).prependTo(lis.has('ul'));

                  $('.ui-nav-tertiary').children('li.hier, li.active').children('.dd-Control').click();

      childa.hover(function(){
        dropdownControls.addClass('hover');
      }, function(){
        dropdownControls.removeClass('hover');
      })

      dropdownControls.hover(function(){
        childa.addClass('hover');
      }, function(){
        childa.removeClass('hover');
      })

      }

    } // end tertiaryNav


    function createTabbedUI() {

      /*creates a tabbed interface from any construct that follows this convention:
        <el class="ui-tab">
          <el class="ui-tab-item">
            <el class="title">Lorem Ipsum</el>
            <el class="content">...</el>
          </el>
          .
          .
          .
        </el>
      */

      $('.ui-tab').each(function() {

        $(this).addClass('active')
        var navList = $('<ul class="ui-tab-nav" />').prependTo(this);
        $('.ui-tab-item').each(function(i){
           i++;

          navList.append('<li><a href="#' + i + '">' + $(this).children('.title').text() + '</a></li>')
          $(this).children('.title').remove()
          $(this).attr('id', '#' + i)
        })
      })

      $.getScript('/__data/assets/js_file/0004/9094/litetabs.jquery.js', function() {
        $('.ui-tab').liteTabs({
          width: '100%'
        });
      });

    } // end createTabbedUI


    /* Non-essential things to make forms look and behave nicer */
    function formPretties() {

      if ($('.lt-ie9').length <= 0) {

        /* pretty select elements */
        $('select').each(function() {

        var t = $(this);
        var selectCurrent = $(this).find(':selected');

        $(this).wrap('<span class="selectElement" style="width:' + (t.width() + 30) + 'px;"></span>');
        var uiSelect = $('<span class="styledSelectElementInner"></span><span class="styledSelectElement">'+selectCurrent.text()+'</span>')
        .insertAfter(t)
        .click(function(){
            t.click();
        });
        t.addClass('styled')
        .change(function() {
          $(this).nextAll('.styledSelectElement').text($(this).find(':selected').text());
        })
         .css('width', (t.width() + 40) + 'px');
      })
     }
      /* autoexpand textareas
      $('textarea').each(function() {
        $(this).css({
          'overflow': 'hidden',
          'resize': 'none'
        })
        $(this).bind("keyup", function() {
          $(this).css('height', this.scrollHeight)
        })
      })*/

    } // end formPretties


    function databaseVisual() {

      /* Purely Visual fixes for the dabase pages that won't work with css... */

      /* Purely Visual fixes for the dabase pages that won't work with css... */
      var height = 0;
      $('.db a').each(function() {
        if (height < $(this).height()) {
          height = $(this).height();
        }
      })

      console.log('height=' + height);

      $('.db a').each(function() {

        var img = $(this).find('.img');
        var anchorHeight = $(this).height();

        console.log('anchorHeight=' + anchorHeight);
        // Set new top and bottom padding on the image
        if (anchorHeight !== height && anchorHeight != 0) {

          var imgPaddingTop = img.css('padding-top');
          if (typeof imgPaddingTop == 'undefined') {
            imgPaddingTop = 0;
          } else {
            imgPaddingTop = parseInt(imgPaddingTop.replace('px',''));
          }
          imgPaddingTop += Math.floor((height - anchorHeight)/2);
          console.log('imgPaddingTop=' + imgPaddingTop);
          img.css('padding-top', imgPaddingTop + 'px');

          var imgPaddingBottom = img.css('padding-bottom');
          if (typeof imgPaddingBottom == 'undefined') {
            imgPaddingBottom = 0;
          } else {
            imgPaddingBottom = parseInt(imgPaddingBottom.replace('px',''));
          }
          imgPaddingBottom += Math.ceil((height - anchorHeight)/2);
          console.log('imgPaddingBottom=' + imgPaddingBottom);
          img.css('padding-bottom', imgPaddingBottom + 'px');
        }

       });

    } //  end databaseVisual


    function captionGenerationFromAltTag() {

      /* Takes Images with class caption and prints their alt tag as a caption if available */
      $('.caption').each(function() {

        var originalImageWidth = $(this).width() > 150?$(this).width():150;

        var updatedImage = $('<div class="image ' + $(this).attr('class') + '" style="width:' + originalImageWidth + 'px;">' + '<img src="' + $(this).attr('src') + '" />' + '</div>');


        if ($(this).attr('alt') && $(this).attr('alt').length > 0) {
          updatedImage.append('<div class="image-caption">' + $(this).attr('alt') + '</div>');
        }

        $(this).replaceWith(updatedImage);

      });

    } // end captionGenerationFromAltTag


    function addTitleAttrToLinks() {

      /* Adds the title attribute to links which contain images. This is so that the lightbox displays the Alt text below the image. */
      var altText;
      var parentLink;
      var titleAttr;
      $('img').each(function() {

        altText = $(this).attr('alt');
        if (altText && altText.length) {
          parentLink = $(this).parents('a');
          if (parentLink.length) {
            // If title doesn't exist
            titleAttr = parentLink.attr('title');
            if (typeof titleAttr !== 'undefined' || titleAttr !== false) {
              // Set the link's title attribute
              parentLink.attr('title', altText);
            }
          }
        }

      });

    } // end addTitleAttrToLinks


    function dbLoader() {

      /* Loads new results when scrolling rather than showing pagination */
      var loaderRequired = false;

      $('.db-nav').addClass('visuallyhidden');
      if ($('.next a', '.db-nav').length) {
        loaderRequired = true;
      }

      var loader = $('<div class="db-loader">Loading more records...</div>').insertAfter('.db').hide();
      var transactionActive = false;

      $(window).scroll(function() {

        if (loaderRequired) {
          if ($(window).scrollTop() + $(window).height() >= $('.db-nav').offset().top && transactionActive == false) {

            transactionActive = true;

            if ($('.next a', '.db-nav').length) {

              loader.show()

              $.ajax({
                url: $('.next a', '.db-nav').attr('href') + '&SQ_DESIGN_NAME=blank',
                dataType: 'html',
                success: function(data) {
                  transactionActive = false;
                  loader.hide()
                  $('.db-nav').remove()
                  $('.db').append($(data).filter('ul').children())
                  $(data).filter('.db-nav').insertAfter('.db').addClass('visuallyhidden');
                  databaseVisual();

                  if ($('#id9007').length) {
                    carabidaeImageGallery();
                  }
                  if ($('#id30183').length) {
                    addTitleAttrToLinks();
                  }
                  addLightbox();

                }
              });

            } else {
              loader.text('End of records').show()
            }

          }
        }
      })
    } // end dbLoader()


    function addLightbox() {

      $("a.fancybox").each(function() {

        // Store image object and set imageTitle to empty string
        var $this_image = $(this).find('img'), imageTitle = '';
        var imageCopyright = imageCopyright;
        // Check for presence of the 'caption' data attribute
        if ($this_image.data('caption') !== 'undefined') {
            // if present we use it for the title to be able to bring through HTML for italics
          imageTitle = $this_image.data('caption');
        } else {
          // if not, then we fallback to the alt attribute
          imageTitle = $this_image.attr('alt');
        }

        if ($this_image.data('copyright') !== 'undefined') {
            // if present we use it for the title to be able to bring through HTML for italics
          imageCopyright = $this_image.data('copyright');
        } else {
          // if not, then we fallback to the alt attribute
          imageCopyright = '<br clear=all><br>© This image by Landcare Research is published under the <a href=https://creativecommons.org/licenses/by/4.0 target=_blank>CC-BY 4.0 </a>international licence unless otherwise specified.';
        }

        $(this).fancybox({
          'titlePosition' : 'inside',
          'title' : imageTitle,
    //      'custom_counterText' : 'Image {#index#} of {#count#}',
          'custom_counterText' : imageCopyright,
          'titleFormat': formatFancyboxTitle
        });

      });

      function formatFancyboxTitle (title, currentArray, currentIndex, currentOpts) {

        var $container = $('<div class="fancybox-custom-title-container"></div>');

        if(typeof currentOpts.custom_counterText !== 'undefined') {
          if(currentOpts.custom_counterText) {
            $container.append(currentOpts.custom_counterText);
            console.log('1');
          } else {
            $container.append('<br clear=all><br>© This image by Landcare Research is published under the <a href=https://creativecommons.org/licenses/by/4.0 target=_blank>CC-BY 4.0 </a>international licence unless otherwise specified.');
            console.log('2');
          }
        } else {
          $container.append(currentOpts.custom_counterText + '<br clear=all><br>© This image by Landcare Research is published under the <a href=https://creativecommons.org/licenses/by/4.0 target=_blank>CC-BY 4.0 </a>international licence unless otherwise specified.');
        }

        if (title != '') {
          var $title = $('<span class="fancybox-custom-title"></span>');
          $title.html(title);
          $container.prepend($title);
        }
        
        return $container;
        
      } // end formatFancyboxTitle

    } // end addLightbox


    function carabidaeImageGallery() {

      // Change the href value on the anchor tag around the image
      $('a.fancybox').each(function() {

        // Find the asset id of the image
        var imageId = $(this).parent('li').attr('class');
        imageId = imageId.substring(5);

        // Change the href url
        var currentDomain = window.location.protocol + '//' + window.location.hostname;
        $(this).attr('href',currentDomain + '/js-content/carabidae-image-and-details?imageid=' + imageId);

      });

    } // end carabidaeImageGallery


    function advancedSearchToggle() {

      // Hides advanced search box unless advancedSearch=true is set as get parameter, also adds a show and hide link.
      if ($('.ui-search').length > 0) {

        var link = $('<a id="advanced-search-control" href="#">Hide Advanced Search</a>');
        link.appendTo('.core-elements', '.ui-search');
        link.toggle(function(){
          $('.advanced-search-section').slideUp('fast');
          link.text('Show advanced Search');
        }, function(){
          $('.advanced-search-section').slideDown('fast');
          link.text('Hide advanced Search');
        });

        if (location.search.indexOf('advancedSearch=true') == -1) {
          link.click();
        }
      }
    } // end advancedSearchToggle

    function addPrintLink() {
      $('<li class="item print"><a class="ir" title="Print this page" style="cursor: pointer;">Print this page</a></li>')
      .appendTo('.share-links.default-share')
      .click(function(){
        window.print();
        return false;
      });

    $('<li class="item print print-sci"><a class="ir" title="Print Statement of Corporate Intent" style="cursor: pointer;">Print Statement of Corporate Intent</a></li>')
      .appendTo('.share-links.sci')
      .click(function(){
        //printSCI($('.print-contents').html());
        printPage();
        return false;
      });

    // $('<li class="item print print-sci"><a class="ir" title="Print Statement of Corporate Intent" style="cursor: pointer;">Print Statement of Corporate Intent</a></li>')
    //   .appendTo('.share-links.sci-section')
    //   .click(function(){
    //     printPage($('.print-contents').html());
    //     printSCI();
    //     return false;
    //   });

    $('<li class="item print print-sci-section"><a class="ir" title="Print Statement of Corporate Intent Section" style="cursor: pointer;">Print SCI Section</a></li>')
      .appendTo('.share-links.sci-section')
      .click(function(){
        printSCISection($('body').html());
        return false;
      });
    }

    function printSCISection(data)
    {
      var mywindow = window.open('', 'SCI 2016-2021', 'height=900, width=700, scrollbars=yes');

      mywindow.document.write('<!DOCTYPE html><html dir="ltr" lang="en-NZ"><head><meta charset="utf-8" /><title>SCI 2016-2021</title>');
      mywindow.document.write('<link rel="stylesheet" href="/__data/assets/css_file/0020/117830/sci-print-section.css?v=0.1.27" type="text/css" />');
      mywindow.document.write('</head><body class="print">');
      // mywindow.document.write('<div class="frontcover"><img src="https://www.landcareresearch.co.nz/__data/assets/image/0003/115788/sci-cover.jpg" /></div>');
      mywindow.document.write(data);
      // mywindow.document.write(contact);
      mywindow.document.write('<button class="print-button" onclick="javascript:window.print()">Print</button></body></html>');

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10

      return true;
    };

    function printPage() {
      if($result == null) {
        $('.share-links .print-sci').addClass('loading');
        $.ajax({
           type: "GET",
           //url: "http://www.landcareresearch.co.nz/publications/corporate/sci/print-view/print-view"
           url: "./?a=115434"
        }).done(function(data) {          
            $('.share-links .print-sci').removeClass('loading');
            $result = $(data).find('.print-contents');
            printSCI($result[0].innerHTML);
        });
      } else {
        printSCI($result[0].innerHTML);
      }
    }

    function printSCI(data) {
      
      var contact = $('footer').html(),
          mywindow = window.open('', 'SCI 2016-2021', 'height=900, width=700, scrollbars=yes');

      mywindow.document.write('<!DOCTYPE html><html dir="ltr" lang="en-NZ"><head><meta charset="utf-8" /><title>SCI 2016-2021</title>');
      mywindow.document.write('<link rel="stylesheet" href="/__data/assets/css_file/0003/115653/sci-print.css?v=0.1.147" type="text/css" />');
      mywindow.document.write('</head><body class="print">');
      // mywindow.document.write('<div class="frontcover"><img src="https://www.landcareresearch.co.nz/__data/assets/image/0003/115788/sci-cover.jpg" /></div>');
      mywindow.document.write(data);
      mywindow.document.write(contact);
      mywindow.document.write('<button class="print-button" onclick="javascript:window.print()">Print</button></body></html>');

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10

      return true;
    };



    /* simple Accordion Plugin: Needs following structure:
    .accordion
        .item
            .title
            .content
        .
        .
        .
    */

    function simpleAccordion(){

      var speed = 300

      $('.accordion').each(function(){

        $(this).addClass('active').find('.item').each(function(i) {

          var item = $(this)

          $(this).find('.title').click(function() {

            if($(this).attr("data-state") === "closed") {
              openTile(item)
            }

          })
        })

        closeTileInit($(this).find('.item'))
        openTile($(this).find('.item').eq(0))

      })

      function closeTileInit(t) {
        t.find('.title')
        .attr("data-state", "closed")
        .prepend('<div class="indicator float-right">+</div>')
        .siblings('.content')
        .slideUp(1)

      } // end closeTileInit

      function closeTile(t) {

        t.find('.title')
        .attr("data-state", "closed")
        .siblings('.content')
        .slideUp(speed)

        t.find('.indicator').text('+')

      } // end closeTile

      function openTile(t) {

        t.find('.title')
        .attr("data-state", "open")
        .siblings('.content')
        .slideDown(speed)

        t.find('.indicator').text('–')

        t.siblings().each(function(){
          closeTile($(this))
        })
      } // end openTile

    } //end Simple accordion


    function addTableSorting() {

      $.getScript('/__data/assets/js_file/0019/30097/tablesorter.min.js', function() {
        $('table.sortable').tablesorter();
      });

    } // end addTableSorting

    function focusOnError() {

      location.href = "#captcha-error";

    } // end focusOnError

      function addSearchQueryCompletion() {

        $.getScript('http://search.landcareresearch.co.nz/search/js/jquery/jquery-ui-1.8.2.custom.min.js', function() {
          $.getScript('http://search.landcareresearch.co.nz/search/js/jquery/jquery.tmpl.min.js', function() {
            $.getScript('http://search.landcareresearch.co.nz/search/js/jquery.funnelback-completion.js', function() {
              $('#search-term').fbcompletion({
                'enabled'    : 'enabled',
                'collection' : 'landcare-research-nz-meta',
                'program'    : 'http://search.landcareresearch.co.nz/s/suggest.json',
                'source'     : 'external',
                'format'     : 'extended',
                'alpha'      : '.5',
                'show'       : '10',
                'sort'       : '0',
                'length'     : '3',
                'delay'      : '0'
              });
              if ($('.search-form').length) {
                $('.search-form .ui-autocomplete-input').fbcompletion({
                  'enabled'    : 'enabled',
                  'collection' : 'landcare-research-nz-meta',
                  'program'    : 'http://search.landcareresearch.co.nz/s/suggest.json',
                  'source'     : 'external',
                  'format'     : 'extended',
                  'alpha'      : '.5',
                  'show'       : '10',
                  'sort'       : '0',
                  'length'     : '3',
                  'delay'      : '0'
                });
              }
            });
          });
        });
      }; // end addSearchQueryCompletion

    function setDefaultSearchDropdown() {

      var bodyClass = $('body').attr('class');

      // delete selected from current option
      if(!(bodyClass == 'home')){
        $('#category_location option:selected').removeAttr('selected');
      }

      // set selected to matching option
      $('#category_location option[value=' + bodyClass + ']').attr('selected', 'selected');

    } // end setDefaultSearchDropdown

  }) // end document.ready
})(jQuery);