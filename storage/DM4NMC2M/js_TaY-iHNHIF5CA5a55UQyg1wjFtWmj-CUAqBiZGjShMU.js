/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.3-pre
 */
(function($){$.fn.bgiframe=($.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(s){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s);var html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+
(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($(this).children('iframe.bgiframe').length===0)
this.insertBefore(document.createElement(html),this.firstChild);});}:function(){return this;});$.fn.bgIframe=$.fn.bgiframe;function prop(n){return n&&n.constructor===Number?n+'px':n;}})(jQuery);;
/*!
 * clueTip - v1.2.9 - 2013-06-02
 * http://plugins.learningjquery.com/cluetip/
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function($) {

  $.cluetip = {
    version: '1.2.9',

    // the HTML that will be used for the tooltip
    template: ['<div>',
      '<div class="cluetip-outer">',
        '<h3 class="cluetip-title ui-widget-header ui-cluetip-header"></h3>',
        '<div class="cluetip-inner ui-widget-content ui-cluetip-content"></div>',
      '</div>',
      '<div class="cluetip-extra"></div>',
    '</div>'].join(''),

    /* clueTip setup
     *  the setup options are applied each time .cluetip() is called,
     *  BUT only if <div id="cluetip"> is not already in the document
    */
    setup: {
      // method to be used for inserting the clueTip into the DOM.
      // Permitted values are 'appendTo', 'prependTo', 'insertBefore', and 'insertAfter'
      insertionType: 'appendTo',
      // element in the DOM the plugin will reference when inserting the clueTip.
      insertionElement: 'body'
    },

    /*
     * clueTip options
     *
     * each one can be explicitly overridden by changing its value.
     * for example: $.cluetip.defaults.width = 200;
     *         or: $.fn.cluetip.defaults.width = 200; // for compatibility with previous clueTip versions
     * would change the default width for all clueTips to 200.
     *
     * each one can also be overridden by passing an options map to the cluetip method.
     * for example: $('a.example').cluetip({width: 200});
     * would change the default width to 200 for clueTips invoked by a link with class of "example"
     *
    */
    defaults: {
      multiple:         false,    // Allow a new tooltip to be created for each .cluetip() call
      width:            275,      // The width of the clueTip
      height:           'auto',   // The height of the clueTip
      cluezIndex:       97,       // Sets the z-index style property of the clueTip
      positionBy:       'auto',   // Sets the type of positioning: 'auto', 'mouse','bottomTop', 'topBottom', fixed'
      topOffset:        15,       // Number of px to offset clueTip from top of invoking element
      leftOffset:       15,       // Number of px to offset clueTip from left of invoking element
      snapToEdge:       false,    // For bottomTop and topBottom, snap to the top or bottom of the element.
      local:            false,    // Whether to use content from the same page for the clueTip's body
      localPrefix:      null,     // string to be prepended to the tip attribute if local is true
      localIdSuffix:    null,     // string to be appended to the cluetip content element's id if local is true
      hideLocal:        true,     // If local option is set to true, this determines whether local content
                                  // to be shown in clueTip should be hidden at its original location
      attribute:        'rel',    // the attribute to be used for fetching the clueTip's body content
      titleAttribute:   'title',  // the attribute to be used for fetching the clueTip's title
      splitTitle:       '',       // A character used to split the title attribute into the clueTip title and divs
                                  // within the clueTip body. more info below [6]
      escapeTitle:      false,    // whether to html escape the title attribute
      showTitle:        true,     // show title bar of the clueTip, even if title attribute not set
      cluetipClass:     'default',// class added to outermost clueTip div in the form of 'cluetip-' + clueTipClass.
      hoverClass:       '',       // class applied to the invoking element onmouseover and removed onmouseout
      waitImage:        true,     // whether to show a "loading" img, which is set in jquery.cluetip.css
      cursor:           'help',
      arrows:           false,    // if true, displays arrow on appropriate side of clueTip
      dropShadow:       true,     // set to false if you don't want the drop-shadow effect on the clueTip
      dropShadowSteps:  6,        // adjusts the size of the drop shadow
      sticky:           false,    // keep visible until manually closed
      mouseOutClose:    false,    // close when clueTip is moused out: false, 'cluetip', 'link', 'both'
      delayedClose:     50,        // close clueTip on a timed delay
      activation:       'hover',  // set to 'click' to force user to click to show clueTip
                                  // set to 'focus' to show on focus of a form element and hide on blur
      clickThrough:     true,    // if true, and activation is not 'click', then clicking on link will take user to the link's href,
                                  // even if href and tipAttribute are equal
      tracking:         false,    // if true, clueTip will track mouse movement (experimental)
      closePosition:    'top',    // location of close text for sticky cluetips; can be 'top', 'bottom', 'title' or 'none'
      closeText:        'Close',  // text (or HTML) to to be clicked to close sticky clueTips
      truncate:         0,        // number of characters to truncate clueTip's contents. if 0, no truncation occurs

      // effect and speed for opening clueTips
      fx: {
                        open:       'show', // can be 'show' or 'slideDown' or 'fadeIn'
                        openSpeed:  ''
      },

      // settings for when hoverIntent plugin is used
      hoverIntent: {
                        sensitivity:  3,
                        interval:     50,
                        timeout:      0
      },

      // short-circuit function to run just before clueTip is shown.
      onActivate:       function(e) {return true;},
      // function to run just after clueTip is shown.
      onShow:           function(ct, ci){},
      // function to run just after clueTip is hidden.
      onHide:           function(ct, ci){},
      // whether to cache results of ajax request to avoid unnecessary hits to server
      ajaxCache:        true,

      // process data retrieved via xhr before it's displayed
      ajaxProcess:      function(data) {
                          data = data.replace(/<(script|style|title)[^<]+<\/(script|style|title)>/gm, '').replace(/<(link|meta)[^>]+>/g,'');
                          return data;
      },

      // can pass in standard $.ajax() parameters. Callback functions, such as beforeSend,
      // will be queued first within the default callbacks.
      // The only exception is error, which overrides the default
      ajaxSettings: {
                        // error: function(ct, ci) { /* override default error callback */ },
                        // beforeSend: function(ct, ci) { /* called first within default beforeSend callback */ },
                        dataType: 'html'
      },
      debug: false

    }
  };
  var $cluetipWait,
      standardClasses = 'cluetip ui-widget ui-widget-content ui-cluetip',
      caches = {},
      counter = 0,
      imgCount = 0;

  // use $.fn.prop() if available (jQuery 1.6+); otherwise, $.fn.attr()
  $.fn.attrProp = $.fn.prop || $.fn.attr;

  // .cluetip() method
  $.fn.cluetip = function(js, options) {
    var $cluetip, $cluetipInner, $cluetipOuter, $cluetipTitle, $cluetipArrows, $dropShadow;
    if (typeof js == 'object') {
      options = js;
      js = null;
    }
    if (js == 'destroy') {
      this.each(function(index) {
        var $l = $(this),
            data = $l.data('cluetip');
        if ( data ) {
          $(data.selector).remove();
          $.removeData(this, 'title');
          $.removeData(this, 'cluetip');
        }
        if (data.title) {
          $l.attrProp('title', data.title);
        }
        $l.unbind('.cluetip').unbind('cluetipMoc');
      });
      if ( !$('[id^="cluetip"]').length ) {
        $(document).unbind('.cluetip');
      }
      return this;
    }

    // merge per-call options with defaults
    options = $.extend(true, {}, $.cluetip.defaults, options || {});

    /** =create cluetip divs **/
    counter++;
    var cluezIndex,
        cluetipId = $.cluetip.backCompat || !options.multiple ? 'cluetip' : 'cluetip-' + counter,
        cluetipSelector = '#' + cluetipId,
        prefix = $.cluetip.backCompat ? '#' : '.',
        insertionType = $.cluetip.setup.insertionType,
        insertionElement = $.cluetip.setup.insertionElement || 'body';

    insertionType = (/appendTo|prependTo|insertBefore|insertAfter/).test(insertionType) ? insertionType : 'appendTo';
    $cluetip = $(cluetipSelector);
    if (!$cluetip.length) {

      $cluetip = $($.cluetip.template)
      [insertionType](insertionElement)
      .attr('id', cluetipId)
      .css({position: 'absolute', display: 'none'});

      cluezIndex = +options.cluezIndex;
      $cluetipOuter = $cluetip.find(prefix + 'cluetip-outer').css({position: 'relative', zIndex: cluezIndex});
      $cluetipInner = $cluetip.find(prefix + 'cluetip-inner');
      $cluetipTitle = $cluetip.find(prefix + 'cluetip-title');

      $cluetip.bind('mouseenter mouseleave', function(event) {
        $(this).data('entered', event.type === 'mouseenter');
      });
    }

    $cluetipWait = $('#cluetip-waitimage');
    if (!$cluetipWait.length && options.waitImage) {
      $cluetipWait = $('<div></div>').attr('id', 'cluetip-waitimage').css({position: 'absolute'});
      $cluetipWait.insertBefore($cluetip).hide();
    }


    var cluetipPadding = (parseInt($cluetip.css('paddingLeft'), 10) || 0) + (parseInt($cluetip.css('paddingRight'), 10) || 0);


    this.each(function(index) {
      var link = this,
          $link = $(this),
          // support metadata plugin (v1.0 and 2.0)
          opts = $.extend(true, {}, options, $.metadata ? $link.metadata() : $.meta ? $link.data() : $link.data('cluetip') || {}),
          // start out with no contents (for ajax activation)
          cluetipContents = false,
          isActive = false,
          closeOnDelay = null,
          tipAttribute = opts[opts.attribute] ||
            ( opts.attribute == 'href' ? $link.attr(opts.attribute) : $link.attrProp(opts.attribute) || $link.attr(opts.attribute) ),
          ctClass = opts.cluetipClass;

      cluezIndex = +opts.cluezIndex;
      $link.data('cluetip', {title: link.title, zIndex: cluezIndex, selector: cluetipSelector, cursor: link.style.cursor || ''});

      if (opts.arrows && !$cluetip.find('.cluetip-arrows').length) {
        $cluetip.append('<div class="cluetip-arrows ui-state-default"></div>');
      }

      if (!tipAttribute && !opts.splitTitle && !js) {
        return true;
      }
      // if hideLocal is set to true, on DOM ready hide the local content that will be displayed in the clueTip
      if (opts.local && opts.localPrefix) {tipAttribute = opts.localPrefix + tipAttribute;}
      if (opts.local && opts.hideLocal && tipAttribute) { $(tipAttribute + ':first').hide(); }

      var tOffset = parseInt(opts.topOffset, 10), lOffset = parseInt(opts.leftOffset, 10);
      // vertical measurement variables
      var tipHeight, wHeight,
          defHeight = isNaN(parseInt(opts.height, 10)) ? 'auto' : (/\D/g).test(opts.height) ? opts.height : opts.height + 'px';
      var sTop, linkTop, linkBottom, posY, tipY, mouseY, baseline;
      // horizontal measurement variables
      var tipInnerWidth = parseInt(opts.width, 10) || 275,
          tipWidth = tipInnerWidth + cluetipPadding + opts.dropShadowSteps,
          linkWidth = this.offsetWidth,
          linkLeft, posX, tipX, mouseX, winWidth;

      // parse the title
      var tipParts;
      var tipTitle = (opts.attribute != 'title') ? $link.attr(opts.titleAttribute) || '' : '';
      if (opts.splitTitle) {
        tipParts = tipTitle.split(opts.splitTitle);
        tipTitle = opts.showTitle || tipParts[0] === '' ? tipParts.shift() : '';
      }
      if (opts.escapeTitle) {
        tipTitle = tipTitle.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
      }

      var localContent;
      function returnFalse() { return false; }

      // Keep track of mouse entered state on link
      $link.bind('mouseenter mouseleave', function(event) {
        var data = $link.data('cluetip');
        data.entered = event.type === 'entered';
        $link.data('cluetip', data);
      });

/***************************************
* ACTIVATION
****************************************/

//activate clueTip
    var activate = function(event) {
      var pY, ajaxMergedSettings, cacheKey,
          continueOn = opts.onActivate.call(link, event);

      if (continueOn === false) {
        return false;
      }

      isActive = true;

      // activate function may get called after an initialization of a
      // different target so need to re-get the Correct Cluetip object here
      $cluetip = $(cluetipSelector).css({position: 'absolute'});
      $cluetipOuter = $cluetip.find(prefix + 'cluetip-outer');
      $cluetipInner = $cluetip.find(prefix + 'cluetip-inner');
      $cluetipTitle = $cluetip.find(prefix + 'cluetip-title');
      $cluetipArrows = $cluetip.find(prefix + 'cluetip-arrows');
      $cluetip.removeClass().css({width: tipInnerWidth});
      if (tipAttribute == $link.attr('href')) {
        $link.css('cursor', opts.cursor);
      }
      if (opts.hoverClass) {
        $link.addClass(opts.hoverClass);
      }
      linkTop = posY = $link.offset().top;
      linkBottom = linkTop + $link.innerHeight();
      linkLeft = $link.offset().left;
      if ( $(insertionElement).css('position') === 'relative' ) {
        linkLeft -= $(insertionElement)[0].getBoundingClientRect().left;
      }

      // FIX: (bug 4412)
      linkWidth = $link.innerWidth();
      if ( event.type == focus ) {
        // in focus event, no mouse position is available; this is needed with bottomTop:
        mouseX = linkLeft +  ( linkWidth / 2 ) + lOffset;
        $cluetip.css({left: posX});
        mouseY = posY + tOffset;
      } else {
        mouseX = event.pageX;
        mouseY = event.pageY;
      }
      //END OF FIX

      if (link.tagName.toLowerCase() != 'area') {
        sTop = $(document).scrollTop();
        winWidth = $(window).width();
      }
// position clueTip horizontally
      if (opts.positionBy == 'fixed') {
        posX = linkWidth + linkLeft + lOffset;
        $cluetip.css({left: posX});
      } else {
        posX = (linkWidth > linkLeft && linkLeft > tipWidth) ||
          linkLeft + linkWidth + tipWidth + lOffset > winWidth ?
          linkLeft - tipWidth - lOffset :
          linkWidth + linkLeft + lOffset;
        if (link.tagName.toLowerCase() == 'area' || opts.positionBy == 'mouse' || linkWidth + tipWidth > winWidth) { // position by mouse
          if (mouseX + 20 + tipWidth > winWidth) {
            $cluetip.addClass('cluetip-' + ctClass);
            posX = (mouseX - tipWidth - lOffset) >= 0 ? mouseX - tipWidth - lOffset - parseInt($cluetip.css('marginLeft'),10) + parseInt($cluetipInner.css('marginRight'),10) :  mouseX - (tipWidth/2);
          } else {
            posX = mouseX + lOffset;
          }
        }
        pY = posX < 0 ? event.pageY + tOffset : event.pageY;
        if (posX < 0 || opts.positionBy == 'bottomTop'  || opts.positionBy == 'topBottom') {
          posX = (mouseX + (tipWidth/2) > winWidth) ? winWidth/2 - tipWidth/2 : Math.max(mouseX - (tipWidth/2),0);
        }
      }

      $cluetipArrows.css({zIndex: $link.data('cluetip').zIndex+1});
      $cluetip.css({
        left: posX,
        zIndex: $link.data('cluetip').zIndex
      });
      wHeight = $(window).height();

/***************************************
* load a string from cluetip method's first argument
***************************************/
      if (js) {
        if (typeof js == 'function') {
          js = js.call(link);
        }
        $cluetipInner.html(js);
        cluetipShow(pY);
      }
/***************************************
* load the title attribute only (or user-selected attribute).
* clueTip title is the string before the first delimiter
* subsequent delimiters place clueTip body text on separate lines
***************************************/

      else if (tipParts) {
        var tpl = tipParts.length;
        $cluetipInner.html(tpl ? tipParts[0] : '');
        if (tpl > 1) {
          for (var i=1; i < tpl; i++){
            $cluetipInner.append('<div class="split-body">' + tipParts[i] + '</div>');
          }
        }
        cluetipShow(pY);
      }
/***************************************
* load external file via ajax
***************************************/

      else if ( !opts.local && tipAttribute.indexOf('#') !== 0 ) {
        if (/\.(jpe?g|tiff?|gif|png)(?:\?.*)?$/i.test(tipAttribute)) {
          $cluetipInner.html('<img src="' + tipAttribute + '" alt="' + tipTitle + '" />');
          cluetipShow(pY);
        } else {
          var optionBeforeSend = opts.ajaxSettings.beforeSend,
              optionError = opts.ajaxSettings.error,
              optionSuccess = opts.ajaxSettings.success,
              optionComplete = opts.ajaxSettings.complete;

          cacheKey = getCacheKey(tipAttribute, opts.ajaxSettings.data);

          var ajaxSettings = {
            cache: opts.ajaxCache, // force requested page not to be cached by browser
            url: tipAttribute,
            beforeSend: function(xhr, settings) {
              if (optionBeforeSend) {optionBeforeSend.call(link, xhr, $cluetip, $cluetipInner, settings);}
              $cluetipOuter.children().empty();
              if (opts.waitImage) {
                $cluetipWait
                .css({top: mouseY+20, left: mouseX+20, zIndex: $link.data('cluetip').zIndex-1})
                .show();
              }
            },
            error: function(xhr, textStatus) {
              if ( options.ajaxCache && !caches[cacheKey] ) {
                caches[cacheKey] = {status: 'error', textStatus: textStatus, xhr: xhr};
              }

              if (isActive) {
                if (optionError) {
                  optionError.call(link, xhr, textStatus, $cluetip, $cluetipInner);
                } else {
                  $cluetipInner.html('<i>sorry, the contents could not be loaded</i>');
                }
              }
            },
            success: function(data, textStatus, xhr) {
              if ( options.ajaxCache && !caches[cacheKey] ) {
                caches[cacheKey] = {status: 'success', data: data, textStatus: textStatus, xhr: xhr};
              }

              cluetipContents = opts.ajaxProcess.call(link, data);

              // allow for changing the title based on data returned by xhr
              if ( typeof cluetipContents == 'object' && cluetipContents !== null ) {
                tipTitle = cluetipContents.title;
                cluetipContents = cluetipContents.content;
              }

              if (isActive) {
                if (optionSuccess) {
                  optionSuccess.call(link, data, textStatus, $cluetip, $cluetipInner);
                }
                $cluetipInner.html(cluetipContents);

              }
            },
            complete: function(xhr, textStatus) {
              if (optionComplete) {
                optionComplete.call(link, xhr, textStatus, $cluetip, $cluetipInner);
              }
              var imgs = $cluetipInner[0].getElementsByTagName('img');
              imgCount = imgs.length;
              for (var i=0, l = imgs.length; i < l; i++) {
                if (imgs[i].complete) {
                  imgCount--;
                }
              }
              if (imgCount) {
                $(imgs).bind('load.ct error.ct', function() {
                  imgCount--;
                  if (imgCount === 0) {
                    $cluetipWait.hide();
                    $(imgs).unbind('.ct');
                    if (isActive) { cluetipShow(pY); }
                  }
                });
              } else {
                $cluetipWait.hide();
                if (isActive) { cluetipShow(pY); }
              }
            }
          };

          ajaxMergedSettings = $.extend(true, {}, opts.ajaxSettings, ajaxSettings);

          if ( caches[cacheKey] ) {
            cachedAjax( caches[cacheKey], ajaxMergedSettings );
          } else {
            $.ajax(ajaxMergedSettings);
          }
        }
      }
/***************************************
* load an element from the same page
***************************************/
      else if (opts.local) {
        var $localContent = $(tipAttribute + (/^#\S+$/.test(tipAttribute) ? '' : ':eq(' + index + ')')).clone(true).show();
        if (opts.localIdSuffix) {
          $localContent.attr('id', $localContent[0].id + opts.localIdSuffix);
        }
        $cluetipInner.html($localContent);
        cluetipShow(pY);
      }
    };

// get dimensions and options for cluetip and prepare it to be shown
    var cluetipShow = function(bpY) {
      var $closeLink, dynamicClasses, heightDiff,
          titleHTML = tipTitle || opts.showTitle && '&nbsp;',
          bgY = '', direction = '', insufficientX = false;
      var stickyClose = {
        bottom: function($cLink) {
          $cLink.appendTo($cluetipInner);
        },
        top: function($cLink) {
          $cLink.prependTo($cluetipInner);
        },
        title: function($cLink) {
          $cLink.prependTo($cluetipTitle);
        }
      };

      $cluetip.addClass('cluetip-' + ctClass);
      if (opts.truncate) {
        var $truncloaded = $cluetipInner.text().slice(0,opts.truncate) + '...';
        $cluetipInner.html($truncloaded);
      }

      if (titleHTML) {
        $cluetipTitle.show().html(titleHTML);
      } else {
        $cluetipTitle.hide();
      }

      if (opts.sticky) {
        if (stickyClose[opts.closePosition]) {
          $closeLink = $('<div class="cluetip-close"><a href="#">' + opts.closeText + '</a></div>');
          stickyClose[opts.closePosition]( $closeLink );
          $closeLink.bind('click.cluetip', function() {
            cluetipClose();
            return false;
          });
        }
        if (opts.mouseOutClose) {
          $link.unbind('mouseleave.cluetipMoc');
          $cluetip.unbind('mouseleave.cluetipMoc');
          if (opts.mouseOutClose == 'both' || opts.mouseOutClose == 'cluetip' || opts.mouseOutClose === true) { // true implies 'cluetip' for backwards compatability
            $cluetip.bind('mouseleave.cluetipMoc', mouseOutClose);
          }
          if (opts.mouseOutClose == 'both' || opts.mouseOutClose == 'link') {
            $link.bind('mouseleave.cluetipMoc', mouseOutClose);
          }
        }
      }

// now that content is loaded, finish the positioning
      $cluetipOuter.css({zIndex: $link.data('cluetip').zIndex, overflow: defHeight == 'auto' ? 'visible' : 'auto', height: defHeight});
      tipHeight = defHeight == 'auto' ? Math.max($cluetip.outerHeight(),$cluetip.height()) : parseInt(defHeight,10);
      tipY = posY;
      baseline = sTop + wHeight;
      insufficientX = (posX < mouseX && (Math.max(posX, 0) + tipWidth > mouseX));
      if (opts.positionBy == 'fixed') {
        tipY = posY - opts.dropShadowSteps + tOffset;
      } else if (opts.positionBy == 'topBottom' || opts.positionBy == 'bottomTop' || insufficientX) {
        if (opts.positionBy == 'topBottom') {
          if (posY + tipHeight + tOffset < baseline && mouseY - sTop < tipHeight + tOffset) {
            direction = 'bottom';
          } else {
            direction = 'top';
          }
        } else if (opts.positionBy == 'bottomTop' || insufficientX) {
          if (posY + tipHeight + tOffset > baseline && mouseY - sTop > tipHeight + tOffset) {
            direction = 'top';
          } else {
            direction = 'bottom';
          }
        }
        // We should now have a direction. Compute tipY
        if (opts.snapToEdge) {
          if (direction == 'top') {
            tipY = linkTop - tipHeight - tOffset;
          } else if (direction == 'bottom') {
            tipY = linkBottom + tOffset;
          }
        } else {
          if (direction == 'top') {
            tipY = mouseY - tipHeight - tOffset;
          } else if (direction == 'bottom') {
            tipY = mouseY + tOffset;
          }
        }
      } else if ( posY + tipHeight + tOffset > baseline ) {
        tipY = (tipHeight >= wHeight) ? sTop : baseline - tipHeight - tOffset;
      } else if ($link.css('display') == 'block' || link.tagName.toLowerCase() == 'area' || opts.positionBy == "mouse") {
        tipY = bpY - tOffset;
      } else {
        tipY = posY - opts.dropShadowSteps;
      }
      if (direction === '') {
        direction = posX < linkLeft ? 'left' :  'right';
      }
      // add classes
      dynamicClasses = ' clue-' + direction + '-' + ctClass + ' cluetip-' + ctClass;
      if (ctClass == 'rounded') {
        dynamicClasses += ' ui-corner-all';
      }
      $cluetip.css({top: tipY + 'px'}).attrProp({'className': standardClasses + dynamicClasses});
      // set up arrow positioning to align with element
      if (opts.arrows) {
        if ( /(left|right)/.test(direction) ) {
          heightDiff = $cluetip.height() - $cluetipArrows.height();
          bgY = posX >= 0 && bpY > 0 ? (posY - tipY - opts.dropShadowSteps) : 0;
          bgY = heightDiff > bgY ? bgY : heightDiff;
          bgY += 'px';
        }
        $cluetipArrows.css({top: bgY}).show();
      } else {
        $cluetipArrows.hide();
      }

// (first hide, then) ***SHOW THE CLUETIP***
      // handle dropshadow divs first
      $dropShadow = createDropShadows($cluetip, opts);
      if ($dropShadow && $dropShadow.length) {
        $dropShadow.hide().css({height: tipHeight, width: tipInnerWidth, zIndex: $link.data('cluetip').zIndex-1}).show();
      }

      if (!closeOnDelay) {
        $cluetip.hide();
      }
      clearTimeout(closeOnDelay);
      closeOnDelay = null;

      // show the cluetip
      $cluetip[opts.fx.open](opts.fx.openSpeed || 0);

      if ($.fn.bgiframe) { $cluetip.bgiframe(); }

      // trigger the optional onShow function
      opts.onShow.call(link, $cluetip, $cluetipInner);
    };

/***************************************
   =INACTIVATION
-------------------------------------- */
    var inactivate = function(event) {
      isActive = false;
      $cluetipWait.hide();
      if (!opts.sticky || (/click|toggle/).test(opts.activation) ) {
        // delayed close (not fully tested)
        if (opts.delayedClose > 0) {
          clearTimeout(closeOnDelay);
          closeOnDelay = null;
          closeOnDelay = setTimeout(cluetipClose, opts.delayedClose);
        } else {
          cluetipClose();
          clearTimeout(closeOnDelay);
        }
      }

      if (opts.hoverClass) {
        $link.removeClass(opts.hoverClass);
      }
    };

    // close cluetip and reset some things
    var cluetipClose = function(el) {
      var $closer = el && el.data('cluetip') ? el : $link,
          ct = $closer.data('cluetip') && $closer.data('cluetip').selector,
          ctSelector = ct || 'div.cluetip',
          $cluetip = $(ctSelector),
          $cluetipInner = $cluetip.find(prefix + 'cluetip-inner'),
          $cluetipArrows = $cluetip.find(prefix + 'cluetip-arrows');

      $cluetip.hide().removeClass();
      opts.onHide.call($closer[0], $cluetip, $cluetipInner);

      if (ct) {
        $closer.removeClass('cluetip-clicked');
        $link.css('cursor', $link.data('cluetip').cursor);
      }
      if (ct && tipTitle) {
        $closer.attrProp(opts.titleAttribute, tipTitle);
      }

      if (opts.arrows) {
        $cluetipArrows.css({top: ''});
      }
      if ($dropShadow) {
        $dropShadow.hide();
      }
    };

    // Check to see if we should be closing by checking where the user is hovering.
    // We do a short 50ms delay for two reasons: to prevent flicker, and to allow the user time to hover on other element
    var mouseOutClose = function() {
      var el = this;
      clearTimeout(closeOnDelay);
      closeOnDelay = setTimeout(function() {
        var linkOver = $link.data('cluetip').entered,
            cluetipOver = $cluetip.data('entered'),
            entered = false;

        if ( opts.mouseOutClose == 'both' && (linkOver || cluetipOver) ) {
          entered = true;
        }
        // true implies 'cluetip' for backwards compatibility
        else if ( (opts.mouseOutClose === true || opts.mouseOutClose == 'cluetip') && cluetipOver) {
          entered = true;
        }
        else if (opts.mouseOutClose == 'link' && linkOver) {
          entered = true;
        }

        if ( !entered ) {
          // All checks pass, close the cluetip
          cluetipClose.call(el);
        }

      }, opts.delayedClose);
    };

    $(document).unbind('hideCluetip.cluetip').bind('hideCluetip.cluetip', function(e) {
      cluetipClose( $(e.target) );
    });
/***************************************
   =BIND EVENTS
-------------------------------------- */
  // activate by click
      if ( (/click|toggle/).test(opts.activation) ) {
        $link.bind('click.cluetip', function(event) {
          if ($cluetip.is(':hidden') || !$link.is('.cluetip-clicked')) {
            activate(event);
            $('.cluetip-clicked').removeClass('cluetip-clicked');
            $link.addClass('cluetip-clicked');
          } else {
            inactivate(event);
          }
          return false;
        });
  // activate by focus; inactivate by blur
      } else if (opts.activation == 'focus') {
        $link.bind('focus.cluetip', function(event) {
          $link.attrProp('title','');
          activate(event);
        });
        $link.bind('blur.cluetip', function(event) {
          $link.attrProp('title', $link.data('cluetip').title);
          inactivate(event);
        });
  // activate by hover
      } else {

        // clicking is returned false if clickThrough option is set to false
        $link[opts.clickThrough ? 'unbind' : 'bind']('click.cluetip', returnFalse);

        //set up mouse tracking
        var mouseTracks = function(evt) {
          if (opts.tracking) {
            var trackX = posX - evt.pageX;
            var trackY = tipY ? tipY - evt.pageY : posY - evt.pageY;
            $link.bind('mousemove.cluetip', function(evt) {
              $cluetip.css({left: evt.pageX + trackX, top: evt.pageY + trackY });
            });
          }
        };

        if ($.fn.hoverIntent && opts.hoverIntent) {
          $link.hoverIntent({
            sensitivity: opts.hoverIntent.sensitivity,
            interval: opts.hoverIntent.interval,
            over: function(event) {
              activate(event);
              mouseTracks(event);
            },
            timeout: opts.hoverIntent.timeout,
            out: function(event) {
              inactivate(event);
              $link.unbind('mousemove.cluetip');
            }
          });
        } else {
          $link.bind('mouseenter.cluetip', function(event) {
            activate(event);
            mouseTracks(event);
          })
          .bind('mouseleave.cluetip', function(event) {
            inactivate(event);
            $link.unbind('mousemove.cluetip');
          });
        }

        $link.bind('mouseover.cluetip', function(event) {
          $link.attrProp('title','');
        }).bind('mouseleave.cluetip', function(event) {
          $link.attrProp('title', $link.data('cluetip').title);
        });
      }

      // trigger a cached Ajax response
      function cachedAjax(info, settings) {
        var status = info.status;
        settings.beforeSend(info.xhr, settings);
        if ( status == 'error' ) {
          settings[status](info.xhr, info.textStatus);
        } else if (status == 'success') {
          settings[status](info.data, info.textStatus, info.xhr);
        }
        settings.complete(info.xhr, settings.textStatus);
      }

    }); // end this.each

    /** =private functions
    ************************************************************/
    //empty function
    function doNothing() {}

    // create a string to be used as an identifier for ajax caches
    function getCacheKey(url, data) {
      var cacheKey = url || '';
      data = data || '';

      if (typeof data == 'object') {
        $.each(data, function(key, val) {
          cacheKey += '-' + key + '-' + val;
        });
      } else if (typeof data == 'string') {
        cacheKey += data;
      }

      return cacheKey;
    }

    /** =create dropshadow divs **/

    function createDropShadows($cluetip, options, newDropShadow) {
      var dsStyle = '',
          dropShadowSteps = (options.dropShadow && options.dropShadowSteps) ? +options.dropShadowSteps : 0;

      if ($.support.boxShadow) {
        if ( dropShadowSteps ) {
          dsStyle = '1px 1px ' + dropShadowSteps + 'px rgba(0,0,0,0.5)';
        }
        var dsOffsets = dropShadowSteps === 0 ? '0 0 ' : '1px 1px ';
        $cluetip.css($.support.boxShadow, dsStyle);
        return false;
      }
      var oldDropShadow = $cluetip.find('.cluetip-drop-shadow');
      if (dropShadowSteps == oldDropShadow.length) {
        return oldDropShadow;
      }
      oldDropShadow.remove();
      var dropShadows = [];
      for (var i=0; i < dropShadowSteps;) {
        dropShadows[i++] = '<div style="top:' + i + 'px;left:' + i + 'px;"></div>';
      }

      newDropShadow = $(dropShadows.join(''))
      .css({
        position: 'absolute',
        backgroundColor: '#000',
        zIndex: cluezIndex -1,
        opacity: 0.1
      })
      .addClass('cluetip-drop-shadow')
      .prependTo($cluetip);
      return newDropShadow;

    }

    return this;
  };

  (function() {
    $.support = $.support || {};
    // check support for CSS3 properties (currently only boxShadow)
    var div = document.createElement('div'),
        divStyle = div.style,
        styleProps = ['boxShadow'],
        prefixes = ['moz', 'Moz', 'webkit', 'o'];

    for (var i=0, sl = styleProps.length; i < sl; i++) {
      var prop = styleProps[i],
          uProp = prop.charAt(0).toUpperCase() + prop.slice(1);

      if ( typeof divStyle[ prop ] !== 'undefined' ) {
        $.support[ prop ] = prop;
      } else {
        for (var j=0, pl = prefixes.length; j < pl; j++) {

          if (typeof divStyle[ prefixes[j] + uProp ] !== 'undefined') {
            $.support[ prop ] = prefixes[j] + uProp;
            break;
          }
        }
      }
    }
    div = null;
  })();

  $.fn.cluetip.defaults = $.cluetip.defaults;

})(jQuery);
;
/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 3.0.0
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.bgiframe = function(s) {
        s = $.extend({
            top         : 'auto', // auto == borderTopWidth
            left        : 'auto', // auto == borderLeftWidth
            width       : 'auto', // auto == offsetWidth
            height      : 'auto', // auto == offsetHeight
            opacity     : true,
            src         : 'javascript:false;',
            conditional : /MSIE 6.0/.test(navigator.userAgent) // expresion or function. return false to prevent iframe insertion
        }, s);

        // wrap conditional in a function if it isn't already
        if (!$.isFunction(s.conditional)) {
            var condition = s.conditional;
            s.conditional = function() { return condition; };
        }

        var $iframe = $('<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+
                           'style="display:block;position:absolute;z-index:-1;"/>');

        return this.each(function() {
            var $this = $(this);
            if ( s.conditional(this) === false ) { return; }
            var existing = $this.children('iframe.bgiframe');
            var $el = existing.length === 0 ? $iframe.clone() : existing;
            $el.css({
                'top': s.top == 'auto' ?
                    ((parseInt($this.css('borderTopWidth'),10)||0)*-1)+'px' : prop(s.top),
                'left': s.left == 'auto' ?
                    ((parseInt($this.css('borderLeftWidth'),10)||0)*-1)+'px' : prop(s.left),
                'width': s.width == 'auto' ? (this.offsetWidth + 'px') : prop(s.width),
                'height': s.height == 'auto' ? (this.offsetHeight + 'px') : prop(s.height),
                'opacity': s.opacity === true ? 0 : undefined
            });

            if ( existing.length === 0 ) {
                $this.prepend($el);
            }
        });
    };

    // old alias
    $.fn.bgIframe = $.fn.bgiframe;

    function prop(n) {
        return n && n.constructor === Number ? n + 'px' : n;
    }

}));;
/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery);
/*
 * jQuery Superfish Menu Plugin - v1.7.4
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 */

;(function(e){"use strict";var s=function(){var s={bcClass:"sf-breadcrumb",menuClass:"sf-js-enabled",anchorClass:"sf-with-ul",menuArrowClass:"sf-arrows"},o=function(){var s=/iPhone|iPad|iPod/i.test(navigator.userAgent);return s&&e(window).load(function(){e("body").children().on("click",e.noop)}),s}(),n=function(){var e=document.documentElement.style;return"behavior"in e&&"fill"in e&&/iemobile/i.test(navigator.userAgent)}(),t=function(e,o){var n=s.menuClass;o.cssArrows&&(n+=" "+s.menuArrowClass),e.toggleClass(n)},i=function(o,n){return o.find("li."+n.pathClass).slice(0,n.pathLevels).addClass(n.hoverClass+" "+s.bcClass).filter(function(){return e(this).children(n.popUpSelector).hide().show().length}).removeClass(n.pathClass)},r=function(e){e.children("a").toggleClass(s.anchorClass)},a=function(e){var s=e.css("ms-touch-action");s="pan-y"===s?"auto":"pan-y",e.css("ms-touch-action",s)},l=function(s,t){var i="li:has("+t.popUpSelector+")";e.fn.hoverIntent&&!t.disableHI?s.hoverIntent(u,p,i):s.on("mouseenter.superfish",i,u).on("mouseleave.superfish",i,p);var r="MSPointerDown.superfish";o||(r+=" touchend.superfish"),n&&(r+=" mousedown.superfish"),s.on("focusin.superfish","li",u).on("focusout.superfish","li",p).on(r,"a",t,h)},h=function(s){var o=e(this),n=o.siblings(s.data.popUpSelector);n.length>0&&n.is(":hidden")&&(o.one("click.superfish",!1),"MSPointerDown"===s.type?o.trigger("focus"):e.proxy(u,o.parent("li"))())},u=function(){var s=e(this),o=d(s);clearTimeout(o.sfTimer),s.siblings().superfish("hide").end().superfish("show")},p=function(){var s=e(this),n=d(s);o?e.proxy(f,s,n)():(clearTimeout(n.sfTimer),n.sfTimer=setTimeout(e.proxy(f,s,n),n.delay))},f=function(s){s.retainPath=e.inArray(this[0],s.$path)>-1,this.superfish("hide"),this.parents("."+s.hoverClass).length||(s.onIdle.call(c(this)),s.$path.length&&e.proxy(u,s.$path)())},c=function(e){return e.closest("."+s.menuClass)},d=function(e){return c(e).data("sf-options")};return{hide:function(s){if(this.length){var o=this,n=d(o);if(!n)return this;var t=n.retainPath===!0?n.$path:"",i=o.find("li."+n.hoverClass).add(this).not(t).removeClass(n.hoverClass).children(n.popUpSelector),r=n.speedOut;s&&(i.show(),r=0),n.retainPath=!1,n.onBeforeHide.call(i),i.stop(!0,!0).animate(n.animationOut,r,function(){var s=e(this);n.onHide.call(s)})}return this},show:function(){var e=d(this);if(!e)return this;var s=this.addClass(e.hoverClass),o=s.children(e.popUpSelector);return e.onBeforeShow.call(o),o.stop(!0,!0).animate(e.animation,e.speed,function(){e.onShow.call(o)}),this},destroy:function(){return this.each(function(){var o,n=e(this),i=n.data("sf-options");return i?(o=n.find(i.popUpSelector).parent("li"),clearTimeout(i.sfTimer),t(n,i),r(o),a(n),n.off(".superfish").off(".hoverIntent"),o.children(i.popUpSelector).attr("style",function(e,s){return s.replace(/display[^;]+;?/g,"")}),i.$path.removeClass(i.hoverClass+" "+s.bcClass).addClass(i.pathClass),n.find("."+i.hoverClass).removeClass(i.hoverClass),i.onDestroy.call(n),n.removeData("sf-options"),void 0):!1})},init:function(o){return this.each(function(){var n=e(this);if(n.data("sf-options"))return!1;var h=e.extend({},e.fn.superfish.defaults,o),u=n.find(h.popUpSelector).parent("li");h.$path=i(n,h),n.data("sf-options",h),t(n,h),r(u),a(n),l(n,h),u.not("."+s.bcClass).superfish("hide",!0),h.onInit.call(this)})}}}();e.fn.superfish=function(o){return s[o]?s[o].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof o&&o?e.error("Method "+o+" does not exist on jQuery.fn.superfish"):s.init.apply(this,arguments)},e.fn.superfish.defaults={popUpSelector:"ul,.sf-mega",hoverClass:"sfHover",pathClass:"overrideThisToUse",pathLevels:1,delay:800,animation:{opacity:"show"},animationOut:{opacity:"hide"},speed:"normal",speedOut:"fast",cssArrows:!0,disableHI:!1,onInit:e.noop,onBeforeShow:e.noop,onShow:e.noop,onBeforeHide:e.noop,onHide:e.noop,onIdle:e.noop,onDestroy:e.noop},e.fn.extend({hideSuperfishUl:s.hide,showSuperfishUl:s.show})})(jQuery);;
/**
 * @file
 * Behaviours for the Nice Menus module. This uses Superfish 1.4.8.
 *
 * @link http://users.tpg.com.au/j_birch/plugins/superfish
 */

(function ($) {

  /**
   * Add Superfish to all Nice Menus with some basic options.
   */
  Drupal.behaviors.niceMenus = {
    attach: function (context, settings) {
      $('ul.nice-menu:not(.nice-menus-processed)').addClass('nice-menus-processed').each(function () {
        $(this).superfish({
          // Apply a generic hover class.
          hoverClass: 'over',
          // Disable generation of arrow mark-up.
          autoArrows: false,
          // Disable drop shadows.
          dropShadows: false,
          // Mouse delay.
          delay: Drupal.settings.nice_menus_options.delay,
          // Animation speed.
          speed: Drupal.settings.nice_menus_options.speed
        });

        // Add in Brandon Aaron’s bgIframe plugin for IE select issues.
        // http://plugins.jquery.com/node/46/release
        $(this).find('ul').bgIframe({opacity:false});

        $('ul.nice-menu ul').css('display', 'none');
      });
    }
  };

})(jQuery);
;
