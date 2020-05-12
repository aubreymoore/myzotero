/**
 * @file
 *
 * The OUP advert script.
 */
var extraAdvertHeight = 30;

var OUP_Advert = {
  // ID prefix to search.
  idPrefix : 'oas_',
  // Available advert sizes.
  sizes: {
    Top: [728, 90 + extraAdvertHeight],
    Right1: [160, 600 + extraAdvertHeight],
    Right2: [300, 250 + extraAdvertHeight],
    Bottom: [728, 90 + extraAdvertHeight]
  },
  // Add JS file.
  AddScript: function (URI) {
    var oupcat = document.createElement('script');
    var protocol = 'https:' == document.location.protocol ? 'https://' : 'http://';
    var node = document.getElementsByTagName('script')[0];
    oupcat.type = 'text/javascript';
    oupcat.async = true;
    oupcat.src = protocol + URI;
    node.parentNode.insertBefore(oupcat, node);
  }
};

// oas_tag used by real media JS.
var oas_tag = {
  // Production server URL.
  url : 'oasc-eu1.247realmedia.com',
  // Define OAS Site page.
  site_page : 'www.async-tag.com',
  // Define Keywords.
  query : 'keyword',
  analytics : true,
  taxonomy : 'user=1234',
  version : '1',
  logging : true,
  // Collect the slot list, (enabled / disabled slots).
  sizes : function () {
    // Find all div's that begin with our advert prefix.
    var $oupAdvertDivs = jQuery('div[id^="' + OUP_Advert.idPrefix + '"]');

    var slotList = [];
    $oupAdvertDivs.each(function () {
      var advertID = jQuery(this).attr('id');
      var advertName = advertID.replace(OUP_Advert.idPrefix, '');
      // Check if this ID is enabled from the Categorizer script.
      if (window.Categorizer ? Categorizer(advertID) : true) {
        oas_tag.site_page = window.Categorize ? window.Categorize(window.location) : (window.location.hostname+window.location.pathname);
        // Define pos is added by real media, which calls sizes, so this should
        // always be defined as a function.
        if (typeof oas_tag.definePos == "function") {
          oas_tag.definePos(advertName, OUP_Advert.sizes[advertName]);
          slotList.push(advertID);
        }
      }
    });
    return slotList;
  }
};

// Add advert launcher on 'document ready' function.
jQuery(document).ready(function () {
  OUP_Advert.AddScript(oas_tag.url + '/om/' + oas_tag.version + '.js');
});
;
/**
 * @file.
 *  The JS for the scholarly iq module.
 */
(function ($) {
  Drupal.OupScholarlyIQ = {
    ACCESS_DENIED_PREFIX : 'Login-',
    SIQ_STRING_SEPARATOR : String.fromCharCode(0x26),
    SETTINGS : [],
    EVENT_TYPE : null,
    ACCESS_GRANTED : true,
    ACCESS_TYPE : null,
    AUTH_ENTITY : null,
    DOI : null,
    IS_OPEN_ACCESS : null,

    /**
     * Initialize the siq object.
     *
     * @param settings
     *  Array of settings provided by oup_scholarly_iq module.
     */
    init : function(settings) {
      // Store all settings.
      this.SETTINGS = settings;
      // Set variations.
      this.setEventType();
      this.setAuthEntity();
      this.setAccessType();
      this.setDOI();
      this.setIsOpenAccess();
    },

    /**
     * Set the event type.
     */
    setEventType : function() {
      // For articles we have our requested variant settings in the settings array.
      if (this.isArticlePage()) {
        this.setArticleEventType();
      }
      // For toc pages, we need to do some string manipulation on the variant.
      else if(this.isTocPage()) {
        this.setTocEventType();
      }
      // Default method to find the event type from HighWire AC settings.
      else {
        this.setEventTypeFromACOrFallback();
      }
    },

    /**
     * Set the auth entity.
     */
    setAuthEntity : function() {
      var authIndividuals = this.SETTINGS.gAuthnIndividuals;
      var authInstitutions = this.SETTINGS.gAuthnInstitutions;

      if (authIndividuals.length != 0) {
        if (authInstitutions.length != 0) {
          this.AUTH_ENTITY = encodeURIComponent(authIndividuals + ',' + authInstitutions);
        }
        else {
          this.AUTH_ENTITY = encodeURIComponent(authIndividuals);
        }
      }
      else {
        this.AUTH_ENTITY = encodeURIComponent(authInstitutions);
      }
    },

    /**
     * Set the DOI.
     */
    setDOI : function() {
      this.DOI = this.SETTINGS.siqRawDoi.length == 0 ? "UNKNOWN" : encodeURIComponent(this.SETTINGS.siqRawDoi);
    },

    /**
     * Set the open access value.
     */
    setIsOpenAccess : function() {
      this.IS_OPEN_ACCESS = encodeURIComponent(this.SETTINGS.siqRawisOpenAccess);
    },

    /**
     * Set the access type.
     */
    setAccessType : function() {
      if (this.IS_OPEN_ACCESS == 'true') {
        this.ACCESS_TYPE = 'SOA';
      }
      else {
        this.ACCESS_TYPE = 'subscription';
      }
    },

    /**
     * Check if the current page is an article.
     *
     * @returns {boolean}
     *  true when the page is an article.
     */
    isArticlePage : function() {
      var url = window.location.href;
      var url_array = url.split(".", -1);
      var url_count = url_array.length - 1; 
      var variant = url_array[url_count];
      
      var page_id = this.SETTINGS.gPageId;
      if(page_id == 'pageid-content' && (variant == 'explore' || variant == 'article-info' || variant == 'figures-only')) {
        return false;
      }
      return this.SETTINGS.gPageId == 'pageid-content';
    },

    /**
     * Set access.
     */
    setArticleAccess : function() {
      this.ACCESS_GRANTED = this.SETTINGS.variantRequestedAccess;
    },

    /**
     * Set event type for articles.
     */
    setArticleEventType : function() {
      this.setArticleAccess();
      this.EVENT_TYPE = this.ACCESS_GRANTED ? this.SETTINGS.variantReturned : this.ACCESS_DENIED_PREFIX + this.SETTINGS.variantRequested;
    },

    /**
     * Check if the current page is a toc.
     *
     * @returns {boolean}
     *  true when the current page is a toc.
     */
    isTocPage : function() {
      return this.SETTINGS.gPageId == 'pageid-toc';
    },

    /**
     * Set event type for tocs.
     */
    setTocEventType : function() {
      // Defaults for when setting is missing.
      var variantRequested = this.SETTINGS.variantRequested;
      var variantAccess = true;
      // HighWire AC values are present.
      if (typeof  Drupal.settings.highwire != "undefined" && typeof Drupal.settings.highwire.ac != "undefined") {
        var acSettings = Drupal.settings.highwire.ac;
        // Normal request, we have the variant as a string and associated access value.
        if (
          typeof acSettings.variantRequested == 'string' &&
          typeof acSettings.access == 'boolean'
        ) {
          variantAccess = acSettings.access;
          variantRequested = acSettings.variantRequested;
        }
        // Access is an object, and we still have the variant as a string.
        else if (
          typeof acSettings.variantRequested == 'string' &&
          typeof acSettings.access[acSettings.variantRequested] == 'boolean'
        ) {
          variantAccess = acSettings.access[acSettings.variantRequested];
          variantRequested = acSettings.variantRequested;
        }
      }
      // String replacement just for toc.
      if (variantRequested == 'toc') {
        variantRequested = 'Table_of_Contents';
      }
      // Prepend login prefix.
      if (!variantAccess) {
        variantRequested = this.ACCESS_DENIED_PREFIX + variantRequested;
      }
      this.EVENT_TYPE = variantRequested;
    },

    /**
     * Default set event type.
     */
    setEventTypeFromACOrFallback : function() {
      if (typeof  Drupal.settings.highwire != "undefined" && typeof Drupal.settings.highwire.ac != "undefined") {
        var acSettings = Drupal.settings.highwire.ac;
        // Normal request, we have the variant as a string and associated access value.
        if (
          typeof acSettings.variantRequested == 'string' &&
          typeof acSettings.access == 'boolean'
        ) {
          this.EVENT_TYPE = acSettings.access ? acSettings.variantRequested : 'Login-' + acSettings.variantRequested;
        }
        // Access is an object, and we still have the variant as a string.
        else if (
          typeof acSettings.variantRequested == 'string' &&
          typeof acSettings.access[acSettings.variantRequested] == 'boolean'
        ) {
          this.EVENT_TYPE = acSettings.access[acSettings.variantRequested] ? acSettings.variantRequested : 'Login-' + acSettings.variantRequested;
        }
        // Fallback value.
        else {
          this.EVENT_TYPE = this.SETTINGS.gVariant;
        }
      }
      // Fallback for when AC is not present.
      else {
        this.EVENT_TYPE = this.SETTINGS.gVariant;
      }
    },

    /**
     * Get the SIQ custom parameter.
     *
     * @returns {string}
     *  String of values to be given to SIQ.
     */
    getSIQString : function() {
      if(this.SETTINGS.gPageId == 'homepage' || this.SETTINGS.gPageId == 'advanced_page') {
        var width = screen.width;
        var height = screen.height;
        var rs = width + 'x' + height;
        var cd = screen.colorDepth;
        var ln = navigator.language || navigator.userLanguage; 
        var myDate = new Date();
        var tz = myDate.getTimezoneOffset();
        var jv = 0;
        if(navigator.javaEnabled() == 'true') {
          jv = 1;
        }
        return 'js=1' + this.SIQ_STRING_SEPARATOR +
          'ts=' + this.SETTINGS.gAuthTimeStamp + this.SIQ_STRING_SEPARATOR +
          'rf=' + this.SETTINGS.grf + this.SIQ_STRING_SEPARATOR +
          'lc=' + this.SETTINGS.gLc + this.SIQ_STRING_SEPARATOR +
          'rs=' + rs + this.SIQ_STRING_SEPARATOR +
          'cd=' + cd  + this.SIQ_STRING_SEPARATOR +
          'ln=' + ln + this.SIQ_STRING_SEPARATOR +
          'tz=' + tz + this.SIQ_STRING_SEPARATOR +
          'jv=' + jv + this.SIQ_STRING_SEPARATOR +
          'supplier_tag=HighWire' + this.SIQ_STRING_SEPARATOR +
          'authSessionId=' + this.SETTINGS.gSessionId + this.SIQ_STRING_SEPARATOR +
          'authzRequired=' + this.SETTINGS.gAuthzRequired + this.SIQ_STRING_SEPARATOR +
          'authentication_method=' + encodeURIComponent(this.SETTINGS.gAuthnMethods2) + this.SIQ_STRING_SEPARATOR +
          'authnIPs=' + this.SETTINGS.gAuthnIPs + this.SIQ_STRING_SEPARATOR +
          'authnInstitutions=' + this.AUTH_ENTITY + this.SIQ_STRING_SEPARATOR +
          'event_type=' + this.SETTINGS.gPageId + this.SIQ_STRING_SEPARATOR +
          'siteid=' + this.SETTINGS.siqJcode;

      }
      else {
        if (this.SETTINGS.variantRequestedAccess === true) {
          var authrequire = 'false';
        }
        else {
          var authrequire = 'true';
        }
        return 'authSessionId=' + this.SETTINGS.gSessionId + this.SIQ_STRING_SEPARATOR +
          'authzRequired=' + authrequire + this.SIQ_STRING_SEPARATOR +
          'authentication_method=' + encodeURIComponent(this.SETTINGS.gAuthnMethods2) + this.SIQ_STRING_SEPARATOR +
          'authnIPs=' + this.SETTINGS.gAuthnIPs + this.SIQ_STRING_SEPARATOR +
          'authnInstitutions=' + this.AUTH_ENTITY + this.SIQ_STRING_SEPARATOR +
          'event_type=' + this.EVENT_TYPE + this.SIQ_STRING_SEPARATOR +
          'publication_date=' + encodeURIComponent(this.SETTINGS.siqRawPubDate) + this.SIQ_STRING_SEPARATOR +
          'access_type=' + this.ACCESS_TYPE + this.SIQ_STRING_SEPARATOR +
          'doi=' + this.DOI + this.SIQ_STRING_SEPARATOR +
          'supplier_tag=HighWire' + this.SIQ_STRING_SEPARATOR +
          'siteid=' + this.SETTINGS.siqJcode;
        }
     }
  };

  Drupal.behaviors.oup_scholarly_iq = {
    attach: function (context, settings) {
      // Initialize the SIQ object.
      Drupal.OupScholarlyIQ.init(settings.oup_scholarly_iq);
      // This needs to remain at the global scope for SIQ to detect
      window.NTPT_PGEXTRA = Drupal.OupScholarlyIQ.getSIQString();
      // Get and add the SIQ processing file.
      $.getScript('//ouptag.scholarlyiq.com/ntpagetag.js');
    }
  };
}(jQuery));
;
/**
 * @file
 *  OUP underbar.
 *
 * This file is a copy of the file provided by OUP for the underbar chopped up and
 * arranged to attempt to make it more stable.
 *
 * @see http://oi-underbar.ifactory.com/underbar/js/pf_oiunderbarinit.js
 *  The original JS file.
 */
(function ($) {
  Drupal = Drupal || {};

  // Init on window load.
  $(window).load(function () {
    var oupUnderbarQueryContext = Drupal.underbar.getQueryContext();
    var oupUnderbarOptions = {
      query: oupUnderbarQueryContext,
      defaultQuery: ':QS:default',
      preferredType: '',
      productCode: 'JRN',
      width: 0,
      skin: ''
    };
    Drupal.underbar.initialize(oupUnderbarOptions);
  });

  // Underbar object.
  Drupal.underbar = {

    // States.
    state: null,
    stateClosed: 'close',
    stateOpened: 'open',

    // Query context.
    qc_query: null,
    qc_defaultQuery: null,
    qc_preferredType: null,
    qc_productCode: null,
    searchQuery: null,
    contentType: null,
    prefixQuery: 'QS',
    CONTEXT_DELIMITER: ':',
    CONTEXT_DELIMITER_ENCODED: encodeURIComponent(':'),

    // Column info.
    minimumColumnWidth: 250,
    hiddenColumns: 0,
    numberColumns: 0,
    curColumns: 0,
    hidArrCols: null,

    // Array to store underbar query results.
    resultList: [],
    itemLength: 0,

    // Default skin (null is OK as value).
    defaultSkin: null,

    // Event tracking.
    isLogo: true,
    contentLoaded: false,
    contentLoading: false,
    cssLoaded: true,

    // Resource and content URLs
    relatedContentURL: null,
    underbarServerURL: 'http://oi-underbar.oup.com/underbar/',
    prefixRelatedContentURL: 'http://oxfordindex.oup.com/search?',
    scriptResources: [],
    jsLibLoaded: 0,

    // Misc?
    targetCharArr: ['\'', '\"'],
    encodeCharArr: ['&#39;', '&#34;'],

    /**
     * Initialize the OUP underbar.
     *
     * @param options
     *  Object of options including
     *  - query: the query to use for the underbar
     *  - defaultQuery: Fallback query to be used if QueryContext is empty.
     *  - preferredType: The preferred type to return.
     *  - productCode: A product code assigned by OUP for the hosting site.
     *  - width: The width of the underbar. 0 to set as auto.
     *  - skin: A skin to apply to the underbar.
     */
    initialize: function (options) {
      // Closed initially.
      Drupal.underbar.state = Drupal.underbar.stateClosed;

      // Set Query Context
      Drupal.underbar.qc_query = options.query;
      Drupal.underbar.qc_defaultQuery = options.defaultQuery;
      Drupal.underbar.qc_preferredType = options.preferredType;
      Drupal.underbar.qc_productCode = options.productCode;
      Drupal.underbar.contentType = options.preferredType;
      var queryToUse = (Drupal.underbar.qc_query == null || Drupal.underbar.qc_query == "") ? Drupal.underbar.qc_defaultQuery : Drupal.underbar.qc_query;
      Drupal.underbar.searchQuery = Drupal.underbar.checkPrefixKeyword(queryToUse);

      // Insert the underbar into the DOM.
      Drupal.underbar.insertOIUnderbar(options.width, options.skin);

      // Bind trigger events previously set inline.
      Drupal.underbar.bindEvents();
    },

    /**
     * Check the query prefix keyword.
     *
     * @param queryString
     *  Query string to use.
     * @returns string
     *  Properly formatted query string.
     */
    checkPrefixKeyword: function (queryString) {
      var chk = /^:[a-zA-Z]*:/.test(queryString);
      return (!chk) ? ":QS:" + queryString : queryString;
    },

    /**
     * Insert the underbar into the DOM.
     *
     * @param width
     *  The width of the underbar. 0 to set as auto.
     * @param skin
     *  A skin to apply to the underbar.
     */
    insertOIUnderbar: function (width, skin) {
      Drupal.underbar.createLayout(skin);
      Drupal.underbar.runSlideShow();
      Drupal.underbar.createInitialDots();

      if (width === 0) {
        width = '100%';
      }

      // Hide underbar.
      $("#underbar-related").hide();
      $("#underbar-container").hide();
      $("#hide-link").hide();
      $("#underbar-hide").hide();
      $("#underbar-wait").hide();
      $("#underbar-reveal-hide").hide();
      $('#underbar_aboutDiv').hide();
      $('#underbar-error').hide();
      $('#underbar_noResultsDiv').hide();

      // Create dialog.
      $('#underbar-wrapper').dialog({
        autoOpen: true,
        width: width,
        draggable: false,
        resizable: false,
        position: ['left', 'bottom']
      });
    },

    /**
     * Create the jQuery objects to insert into the DOM.
     * @param skin
     */
    createLayout: function (skin) {
      skin = (skin == null || skin.trim() == '') ? Drupal.underbar.defaultSkin : skin;

      //***create content for search Screen***
      $("<div></div>").attr('id', 'underbar-wrapper').attr('class', skin).appendTo('body');
      $('#underbar-wrapper').append("<input type='hidden' id='hiddenColumns'/>");
      $('#underbar-wrapper').append("<input type='hidden' id='hidArrCols'/>");
      $('#underbar-wrapper').append("<input type='hidden' id='hidTotalColumns'/>");
      $('#underbar-wrapper').append("<a href='" + Drupal.underbar.relatedContentURL + "' target='_blank' id='underbar-related'>See all related content</a>");

      Drupal.underbar.createErrorDiv();

      $("<div></div>").attr('id', 'underbar-header').appendTo('#underbar-wrapper');
      $("#underbar-header").attr('class', 'underbar-header');
      $("<div></div>").attr('id', 'underbar-logo-cover').appendTo('#underbar-header');
      $('#underbar-logo-cover').append("<img src='" + Drupal.underbar.underbarServerURL + "images/oi-logo.gif' alt='oi-logo' width='92' height='25' class='underbar-logoIndex'/>");

      if (Drupal.underbar.isChromeBrowser()) {
        $('#underbar-logo-cover').append("<label for='about the index' class='underbar-aboutLbl-chrome'>About the Index</label>");
        $('#underbar-logo-cover').append("<input type='button' id='underbar-reveal-hide' class='underbar-about-reveal' name='underbar-reveal-hide' value='hide me' />");
        $('#underbar-logo-cover').append("<input type='button' id='underbar-reveal-show' class='underbar-about-reveal' name='underbar-reveal-show' value='show me''/>");	// On click was: openOIUnderbar(" + 0 + ");
      }
      else {
        $('#underbar-logo-cover').append("<label for='about the index' class='underbar-aboutLbl'>About the Index</label>");
        $('#underbar-logo-cover').append("<input type='button' id='underbar-reveal-hide' name='underbar-reveal-hide' value='hide me' />");
        $('#underbar-logo-cover').append("<input type='button' id='underbar-reveal-show' name='underbar-reveal-show' value='show me''/>");	// On click was: openOIUnderbar(" + 0 + ");
      }

      $("<div></div>").attr('id', 'underbar-controls-cover').appendTo('#underbar-header');
      $("<div></div>").attr('id', 'underbar-controls').appendTo('#underbar-controls-cover');
      $("<div></div>").attr('id', 'underbar-counter').appendTo('#underbar-controls');

      $("<div></div>").attr('id', 'underbar-hide-div').appendTo('#underbar-controls');
      $('#underbar-hide-div').append("<span id='hide-link'>Hide related links</span>");
      $('#underbar-hide-div').append("<span id='show-link'>Show related links</span>");
      $('#underbar-hide-div').append("<input type='button' id='underbar-hide' name='underbar-hide' value='hide me'/>");
      $('#underbar-hide-div').append("<input type='button' id='underbar-show' name='underbar-show' value='show me'/>");
      $('#underbar-hide-div').append("<input type='button' id='underbar-wait' name='underbar-wait' value='loading'/>");

      //***search section - form***
      $("<div></div>").attr('id', 'underbar-search').appendTo('#underbar-controls-cover');
      $("#underbar-search").attr('class', 'underbar-search');
      //Tien - create form to submit 28/03/2012
      var form = "<form action='' method='post' id='search-form' target='_blank'>";
      form += "<label for='underbar-search-oxford-index'>Search across all sources</label>";
      form += "<input type='text' class='underbar-search-oxford-index underbar-search-text-color' id='underbar-search-oxford-index' value='in Oxford Index'/>";
      form += "&nbsp;<input id='underbar-search-oxford-index-btn' type='submit' class='underbar-submit underbar-logo' id='underbar-submit'/>";
      form += "</form>"
      //Tien end 28/03/2012
      $('#underbar-search').append(form);

      $("<div></div>").attr('id', 'underbar-container').appendTo('#underbar-wrapper');
      $("<div></div>").attr('id', 'underbar-container-cover').appendTo('#underbar-container');

      // START_ADD QUY.HUYNH 3/27/2012 OI Underbar Fix TextBox Hint
      $('#underbar-search-oxford-index').blur(function () {
        if ($("#underbar-search-oxford-index").val() == "") {
          $("#underbar-search-oxford-index").addClass("underbar-search-text-color");
          $("#underbar-search-oxford-index").val("in Oxford Index");
        }
      });
      // END_ADD QUY.HUYNH 3/27/2012 OI Underbar Fix TextBox Hint

      //***content of searching item***
      //createSearchItems();
      //***create content for About Screen***
      $("<div></div>").attr('id', 'underbar_aboutDiv').appendTo('#underbar-wrapper');
      Drupal.underbar.showInfoAboutAndNoResults("#underbar_aboutDiv", 0);
      $("<div></div>").attr('id', 'underbar_noResultsDiv').appendTo('#underbar-wrapper');
      Drupal.underbar.showInfoAboutAndNoResults("#underbar_noResultsDiv", 1);

      // Tooltip only Text
      $('#underbar-reveal-hide').hover(function () {
        // Hover over code
        var title = "About The Oxford Index";
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).css(
          {display: 'block',
            'z-index': '10000',
            position: 'absolute',
            'background-color': '#ffffe1',
            color: '#000',
            border: '1px solid #333',
            padding: '1px 2px 1px 2px',
            'font-size': '11px',
            'font-family': 'Tahoma'
          })
          .appendTo('body')
          .fadeIn('slow');
      },function () {
        // Hover out code
        $('.tooltip').remove();
      }).mousemove(function (e) {
          var mousex = e.pageX + 20; //Get X coordinates
          var mousey = e.pageY + 10; //Get Y coordinates
          $('.tooltip')
            .css({ top: mousey - 30, left: mousex})
        });

      $('#underbar-reveal-show').hover(function () {
        // Hover over code
        var title = "About The Oxford Index";
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).css(
          {display: 'block',
            'z-index': '10000',
            position: 'absolute',
            'background-color': '#ffffe1',
            color: '#000',
            border: '1px solid #333',
            padding: '1px 2px 1px 2px',
            'font-size': '11px',
            'font-family': 'Tahoma'
          })
          .appendTo('body')
          .fadeIn('slow');
      },function () {
        // Hover out code
        $('.tooltip').remove();
      }).mousemove(function (e) {
          var mousex = e.pageX + 20; //Get X coordinates
          var mousey = e.pageY + 10; //Get Y coordinates
          jQuery('.tooltip')
            .css({ top: mousey - 30, left: mousex })
        });

      $('#underbar-search-oxford-index-btn').hover(function () {
        // Hover over code
        var title = 'Search Oxford Index';
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>').text(title).css(
          {display: 'block',
            'z-index': '10000',
            position: 'absolute',
            'background-color': '#ffffe1',
            color: '#000',
            border: '1px solid #333',
            padding: '1px 2px 1px 2px',
            'font-size': '11px',
            'font-family': 'Tahoma'
          })
          .appendTo('body')
          .fadeIn('slow');
      },function () {
        // Hover out code
        //jQuery(this).attr('title', jQuery(this).data('tipText'));
        $('.tooltip').remove();
      }).mousemove(function (e) {
          var mousex = e.pageX + 20; //Get X coordinates
          var mousey = e.pageY + 10; //Get Y coordinates
          $('.tooltip')
            .css({ top: mousey - 40, left: mousex - 130 })
        });
    },

    /**
     * Initialize jCarousel light on the slider.
     */
    runSlideShow: function () {
      $('.underbar-slide-container').jCarouselLite({
        btnNext: '.underbar-next',
        btnPrev: '.underbar-prev',
        circular: false,
        visible: 3
      });
    },

    /**
     * Create the slider counter.
     */
    createInitialDots: function () {
      $('#underbar-counter').html('');
      var html = '';
      for (var i = 0; i < 7; i++) {
        html += '<img src="' + Drupal.underbar.underbarServerURL + 'images/dot-inactive.png" id="underbar-dot-' + i + '" width="10" height="10" />';
      }
      $('#underbar-counter').append(html);
    },

    /**
     * @todo.
     */
    createDotItems: function () {
      $('#underbar-counter').html("");
      var html = "";
      for (var i = 0; i < totalColumnsInPage; i++) {
        html += "<img src='" + Drupal.underbar.underbarServerURL + "images/dot-inactive.png' id='underbar-dot-" + i + "' width='10' height='10'/>";
      }
      $('#underbar-counter').append(html);
    },

    /**
     * Reload columns when users resize the browser window.
     *
     * @param state
     *  Open when under is open, close when under is closed.
     */
    reloadColumns: function (state) {
      var additionalSpace = 18;
      var windowWidth = jQuery(window).width();
      var slideContainerWidth = jQuery("#underbar-columns").width();
      var prevWidth = jQuery("#underbar-prev").width() * 2;
      var nextWidth = jQuery("#underbar-next").width() * 2;
      var tempColumnWidth = 0;
      var columnWidth = jQuery(".underbar_slide").width();
      var arrowWidth = prevWidth + nextWidth;
      var underbarWidth = slideContainerWidth + arrowWidth;
      var extraSpace = (windowWidth - additionalSpace) - underbarWidth;
      var columnCount = Math.floor(extraSpace / Drupal.underbar.minimumColumnWidth);

      var paddingColumn = parseInt(jQuery(".underbar-column").css("padding-left")) * 2;
      var paddingColumns_about = parseInt(jQuery(".underbar-about-columns").css("padding-left")) * 2;
      var paddingColumn_about = parseInt(jQuery(".underbar-about-column").css("padding-left")) * 2;
      var borderSize = 1;
      var position = jQuery("#slide-control").position();
      var controlWidth = jQuery("#slide-control").width();
      var remaingWidth;
      if (position != null) {
        remaingWidth = controlWidth + position.left;
      }

      var additionalWidth = slideContainerWidth + (columnWidth * columnCount);

      if (jQuery("#underbar_aboutDiv").css("display") != "none" || Drupal.underbar.resultList.length == 0) {
        var about_columnWidth = jQuery(".underbar-about-column").width();
        tempColumnWidth = Math.floor((windowWidth - paddingColumns_about) / 3);
        if (tempColumnWidth > Drupal.underbar.minimumColumnWidth) {
          columnWidth = tempColumnWidth;
          jQuery("#underbar_aboutDiv").width(windowWidth);
          jQuery(".underbar-about-columns").width((columnWidth * 3) + borderSize);
          jQuery(".underbar-about-column").width(columnWidth - paddingColumn_about - borderSize);
          jQuery(".underbar-column-noresult").width(columnWidth - paddingColumn_about - borderSize);
          jQuery("underbar-about-content").width(columnWidth - paddingColumn_about - borderSize);
        }
        return;
      }

      jQuery("#underbar-container-cover").css('min-width', (columnWidth * 3) + arrowWidth + additionalSpace);

      if (columnCount < 0 && slideContainerWidth / columnWidth <= 3) {
        if (Drupal.underbar.itemLength == 3) {
          tempColumnWidth = Math.floor((windowWidth - arrowWidth - additionalSpace) / Drupal.underbar.itemLength);
          if (tempColumnWidth > Drupal.underbar.minimumColumnWidth) {
            columnWidth = tempColumnWidth;
            jQuery("#underbar-columns").width(columnWidth * Drupal.underbar.itemLength);
            jQuery("#slide-control").width(columnWidth * Drupal.underbar.itemLength);
            jQuery(".underbar_slide").width(columnWidth);
            jQuery(".underbar-column").width(columnWidth - paddingColumn - borderSize);
          }
        }
        Drupal.underbar.curColumns = jQuery("#underbar-columns").width() / columnWidth;
        Drupal.underbar.initArrCols(0);
        if (state == Drupal.underbar.stateOpened) {
          Drupal.underbar.inactiveDots();
          if (jQuery("#underbar_aboutDiv").css("display") == "none") {
            Drupal.underbar.activeDots();
          }
        }
        return;
      }
      // begin updated by vu.ngo - 3/21/2012 --- processing number of items are rendered less than 6
      if (Drupal.underbar.itemLength < 6) {
        // if there are many columns created while widens browser window
        if (columnCount > 0) {
          // if it is the first loading columns
          if (state == "open") {
            // get column width at given time calculated by window width divided by item length
            tempColumnWidth = Math.floor((windowWidth - arrowWidth - additionalSpace) / Drupal.underbar.itemLength);
            // if column width at given time > minimum column width
            if (tempColumnWidth > Drupal.underbar.minimumColumnWidth) {
              columnWidth = tempColumnWidth;
              jQuery("#underbar-columns").width(columnWidth * Drupal.underbar.itemLength);
              jQuery("#slide-control").width(columnWidth * Drupal.underbar.itemLength);
              jQuery(".underbar_slide").width(columnWidth);
              jQuery(".underbar-column").width(columnWidth - paddingColumn - borderSize);
              // if column width at given time <= minimum column width
            } else {
              jQuery("#underbar-columns").width(additionalWidth);
            }
            // if there are many columns removed while shortens browser window
            // or there are many columns created while widens browser window and
          } else if (columnCount < 0 || (columnCount > 0 && remaingWidth - slideContainerWidth >= columnWidth)) {
            if (columnCount < 0) {
              jQuery("#underbar-next").addClass("underbar-next-arrow-background");
              jQuery("#underbar-next").removeClass("underbar-prev-blank-background");
            } else {
              Drupal.underbar.numberColumns++;
              if (remaingWidth - slideContainerWidth == columnWidth) {
                jQuery("#underbar-next").removeClass("underbar-next-arrow-background");
                jQuery("#underbar-next").addClass("underbar-prev-blank-background");
              }
            }
            jQuery("#underbar-columns").width(additionalWidth);
            Drupal.underbar.hiddenColumns = 0;
            // width of item length <> width of showing columns
          } else if (controlWidth != slideContainerWidth && columnCount != 0) {
            if (additionalWidth <= controlWidth) {
              jQuery("#underbar-columns").width(additionalWidth);
              var left = position.left + (columnWidth * columnCount);
              jQuery("#slide-control").css("left", left);
              if (columnCount == 1) {
                Drupal.underbar.hiddenColumns = parseInt(jQuery("#hiddenColumns").val()) + 1;
                jQuery("#hiddenColumns").val(Drupal.underbar.hiddenColumns);
              } else {
                jQuery("#hiddenColumns").val(columnCount);
              }
              if (additionalWidth == controlWidth) {
                jQuery("#underbar-prev").removeClass("underbar-prev-arrow-background");
                jQuery("#underbar-prev").addClass("underbar-prev-blank-background");
              }
              Drupal.underbar.numberColumns++;
            }
          }
        } else if (columnCount < 0) {
          tempColumnWidth = Math.floor((windowWidth - arrowWidth - additionalSpace) / Drupal.underbar.itemLength);
          if (tempColumnWidth > Drupal.underbar.minimumColumnWidth) {
            columnWidth = tempColumnWidth;
            jQuery("#underbar-columns").width(columnWidth * Drupal.underbar.itemLength);
            jQuery("#slide-control").width(columnWidth * Drupal.underbar.itemLength);
            jQuery(".underbar_slide").width(columnWidth);
            jQuery(".underbar-column").width(columnWidth - paddingColumn - borderSize);
          } else {
            jQuery("#underbar-columns").width(additionalWidth);
            if (Drupal.underbar.numberColumns > 0)
              Drupal.underbar.numberColumns--;
          }
          jQuery("#underbar-next").addClass("underbar-next-arrow-background");
          jQuery("#underbar-next").removeClass("underbar-prev-blank-background");
        } else {
          if (Drupal.underbar.numberColumns + 3 == Drupal.underbar.itemLength) {
            tempColumnWidth = Math.floor((windowWidth - arrowWidth - additionalSpace) / Drupal.underbar.itemLength);
            if (tempColumnWidth > Drupal.underbar.minimumColumnWidth) {
              columnWidth = tempColumnWidth;
              jQuery("#underbar-columns").width(columnWidth * Drupal.underbar.itemLength);
              jQuery("#slide-control").width(columnWidth * Drupal.underbar.itemLength);
              jQuery(".underbar_slide").width(columnWidth);
              jQuery(".underbar-column").width(columnWidth - paddingColumn - borderSize);
            }
          }

        }
        // end updated by vu.ngo - 3/21/2012
      } else {
        if (columnCount < 0 || (columnCount > 0 && remaingWidth - slideContainerWidth >= columnWidth)) {
          if (columnCount < 0) {
            jQuery("#underbar-next").addClass("underbar-next-arrow-background");
            jQuery("#underbar-next").removeClass("underbar-prev-blank-background");
          }
          else if (remaingWidth - slideContainerWidth == columnWidth) {
            jQuery("#underbar-next").removeClass("underbar-next-arrow-background");
            jQuery("#underbar-next").addClass("underbar-prev-blank-background");
          }
          jQuery("#underbar-columns").width(additionalWidth);
          Drupal.underbar.hiddenColumns = 0;
        } else if (controlWidth != slideContainerWidth && columnCount != 0) {
          if (additionalWidth <= controlWidth) {
            jQuery("#underbar-columns").width(additionalWidth);
            var left = position.left + (columnWidth * columnCount);
            jQuery("#slide-control").css("left", left);
            if (columnCount == 1) {
              Drupal.underbar.hiddenColumns = parseInt(jQuery("#hiddenColumns").val()) + 1;
              jQuery("#hiddenColumns").val(Drupal.underbar.hiddenColumns);
            } else {
              jQuery("#hiddenColumns").val(columnCount);
            }
            if (additionalWidth == controlWidth) {
              jQuery("#underbar-prev").removeClass("underbar-prev-arrow-background");
              jQuery("#underbar-prev").addClass("underbar-prev-blank-background");
            }
          }
        }
      }
      jQuery("#underbar-container-cover").width(jQuery("#underbar-columns").width() + arrowWidth + additionalSpace).css('margin', '0 auto');
      Drupal.underbar.curColumns = jQuery("#underbar-columns").width() / columnWidth;
      Drupal.underbar.initArrCols(0);
      if (state == Drupal.underbar.stateOpened) {
        Drupal.underbar.inactiveDots();
        if (jQuery("#underbar_aboutDiv").css("display") == "none") {
          Drupal.underbar.activeDots();
          if (Drupal.underbar.curColumns == Drupal.underbar.itemLength) {
            jQuery("#underbar-next").removeClass("underbar-next-arrow-background");
            jQuery("#underbar-next").addClass("underbar-prev-blank-background");
          }
        }
      }
    },

    /**
     * Receive data from server to init content for Underbar.
     *
     * @param data
     *  Data recieved from an AJAX callback.
     */
    callbackInitBar: function (data) {
      jQuery("#underbar-show").show();
      jQuery("#underbar-wait").hide();
      Drupal.underbar.setResultLst(data);
      if (Drupal.underbar.resultList.length > 0) {
        Drupal.underbar.fncOnBlurRelatedURL();
      }

      Drupal.underbar.contentLoaded = true;
      Drupal.underbar.contentLoading = false;

      Drupal.underbar.callbackReloadResult(data);

    },

    /**
     * Set values for list of result to show in search content
     *
     * @param data
     *  Data recieved from an AJAX callback.
     */
    setResultLst: function (data) {

      for (var key = 0; key < data.length; key++) {
        Drupal.underbar.resultList[key] = data[key];

        Drupal.underbar.resultList[key]
      }

      totalColumnsInPage = data.length;

    },

    /**
     * @todo.
     */
    openOIUnderbar: function (type) {
      if (Drupal.underbar.isChromeBrowser()) {
        jQuery("#underbar_aboutDiv").addClass("underbar_about-crome-Div");
        jQuery("#underbar_noResultsDiv").addClass("underbar_result-crome-Div");
        jQuery("#underbar-container").addClass("underbar-container-chrome");
      } else {
        jQuery("#underbar_aboutDiv").removeClass("underbar_about-crome-Div");
        jQuery("#underbar_noResultsDiv").removeClass("underbar_result-crome-Div");
        jQuery("#underbar-container").removeClass("underbar-container-chrome");
      }
      if (type == 1) {
        if (!Drupal.underbar.contentLoaded) {
          if (!Drupal.underbar.contentLoading) {
            jQuery("#underbar-show").hide();
            jQuery("#underbar-wait").show();
            Drupal.underbar.callAjax(Drupal.underbar.underbarServerURL + "oiunderbarserver.initsearch", Drupal.underbar.qc_query, Drupal.underbar.qc_defaultQuery, Drupal.underbar.qc_preferredType, Drupal.underbar.qc_productCode);
          }
        } else {
          Drupal.underbar.state = Drupal.underbar.stateOpened;
          Drupal.underbar.showUnderbarContent();
        }
      } else {
        if (Drupal.underbar.state == Drupal.underbar.stateClosed) {
          // begin added by vu.ngo - 3/20/2012
          if (Drupal.underbar.resultList.length != 0) {
            // end added by vu.ngo - 3/20/2012
            Drupal.underbar.state = Drupal.underbar.stateOpened;
            Drupal.underbar.showUnderbarContent();
          }
        } else {
          Drupal.underbar.openOIUnderbar_About();
        }
      }
      Drupal.underbar.reloadColumns(Drupal.underbar.stateOpened);
    },

    /**
     * @todo.
     */
    showUnderbarContent: function (logoClicked) {

      var hide = true;
      if (Drupal.underbar.state == Drupal.underbar.stateOpened)
        hide = false;
      Drupal.underbar.runEffect(hide, logoClicked);
    },

    /**
     * Open or close the about section in the underbar.
     */
    openOIUnderbar_About: function () {
      if (Drupal.underbar.isChromeBrowser()) {
        jQuery("#underbar_aboutDiv").addClass("underbar_about-crome-Div");
        jQuery("#underbar_noResultsDiv").addClass("underbar_result-crome-Div");
      } else {
        jQuery("#underbar_aboutDiv").removeClass("underbar_about-crome-Div");
        jQuery("#underbar_noResultsDiv").removeClass("underbar_result-crome-Div");
      }
      if (Drupal.underbar.contentLoading) {
        return;
      }
      if (Drupal.underbar.state == Drupal.underbar.stateOpened && jQuery("#underbar_aboutDiv").css("display") != "none") {
        Drupal.underbar.closeOIUnderbar();
        return;
      }
      Drupal.underbar.showUnderbarContent(Drupal.underbar.isLogo);
      Drupal.underbar.state = Drupal.underbar.stateOpened;
      Drupal.underbar.reloadColumns();
    },

    /**
     * Close the underbar.
     */
    closeOIUnderbar: function () {
      if (Drupal.underbar.contentLoading) {
        return;
      }
      if (Drupal.underbar.state == Drupal.underbar.stateClosed) {
        return false;
      }
      Drupal.underbar.state = Drupal.underbar.stateClosed;
      Drupal.underbar.runEffect(true);
      Drupal.underbar.inactiveDots();
    },

    /**
     * @todo.
     */
    toURLParam: function (p) {
      if (0 == null)
        p = "";
      while (p.indexOf("/") != -1)
        p = p.replace("/", ":::");

      while (p.indexOf("+") != -1)
        p = p.replace("+", ":0:");

      return encodeURIComponent(p);
    },

    /**
     * @todo.
     */
    callAjax: function (url, query, defaultQuery, preferredType, productCode) {
      // don't make a trip to the server if we don't need to
      if (Drupal.underbar.isUnderbarPassiveMode(query, defaultQuery)) {
        Drupal.underbar.callbackInitBar({});
        return;
      }

      url += "?qc=" + Drupal.underbar.toURLParam(Drupal.underbar.convertUnderbarQueryArrayToString(query)) + "&dqc=" + Drupal.underbar.toURLParam(defaultQuery) + "&pct=" + Drupal.underbar.toURLParam(preferredType) + "&pid=" + Drupal.underbar.toURLParam(productCode);
      Drupal.underbar.contentLoading = true;
      jQuery.ajax({
        url: url,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "callbackInitBar",
        type: "POST",
        crossDomain: true,
        async: false,
        error: function (xhr, ajaxOptions, thrownError) {
        }
      });
    },

    /**
     * @todo.
     */
    convertUnderbarQueryArrayToString: function (query) {
      var flattened = query;
      if (jQuery.isArray(query)) {
        // += is faster, but these won't be big arrays and I find this more readable
        flattened = query.join("|,|");
      }
      return flattened;
    },

    /**
     * @todo.
     */
    isEmpty: function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
          return false;
      }
      return true;
    },

    /**
     * @todo.
     */
    checkInvalidSearch: function () {
      var value = jQuery("#underbar-search-oxford-index").val();
      if (value == '' || value == 'in Oxford Index') {
        return true;
      }
      return false;
    },

    /**
     * @todo.
     */
    submitSearch: function () {
      jQuery('.tooltip').remove();
      jQuery('#underbar-error').hide();
      if (Drupal.underbar.checkInvalidSearch()) {
        jQuery('#underbar-error').show();
        return false;
      }
      Drupal.underbar.searchQuery = Drupal.underbar.checkPrefixKeyword(jQuery("#underbar-search-oxford-index").val());
      //Tien - open new tab for inputting search text box 28/03/2012
      /*var url = underbarServerURL + "oiunderbarserver.searchQueryContext";
       callAjax(url, searchStr, '', contentType, '02', callbackReloadResult);*/
      var url = Drupal.underbar.prefixRelatedContentURL + "q=" + Drupal.underbar.getURLfromPrefix();
      jQuery("#search-form").attr("action", url);
      return true;
      //Tien end 28/03/2012
    },

    /**
     * @todo.
     */
    getURLfromPrefix: function () {
      var str = Drupal.underbar.checkPrefixKeyword(Drupal.underbar.searchQuery);
      Drupal.underbar.prefixQuery = str.substr(1, (str.substr(1, str.length)).indexOf(':'));
      return str.replace(":" + Drupal.underbar.prefixQuery + ":", "");
    },

    /**
     * @todo.
     */
    createErrorDiv: function () {
      jQuery("<div></div>").attr('id', 'underbar-error').appendTo('#underbar-wrapper');
      jQuery('#underbar-error').insertBefore('#underbar-header');
      jQuery('#underbar-error').append("You must provide text in order to perform the search&nbsp;&nbsp;&nbsp;");
    },

    /**
     * @todo.
     */
    callbackReloadResult: function (data) {
      Drupal.underbar.resultList = [];
      // begin added by vu.ngo - 3/20/2012
      Drupal.underbar.itemLength = 0;
      // end added by vu.ngo - 3/20/2012
      if (Drupal.underbar.isEmpty(data)) {
        if (jQuery("#underbar-container").css('display') == 'none')
          Drupal.underbar.runEffect(false);
        Drupal.underbar.state = Drupal.underbar.stateOpened;
        Drupal.underbar.runSlideShow();
        Drupal.underbar.reloadColumns(Drupal.underbar.stateOpened);
        Drupal.underbar.initArrCols(1);
        Drupal.underbar.inactiveDots();
      } else {
        Drupal.underbar.setResultLst(data);
        // begin added by vu.ngo - 3/20/2012
        //jQuery("#resultList").val(JSON.stringify( resultList ));
        // end added by vu.ngo - 3/20/2012
        if (Drupal.underbar.resultList.length > 0) {
          Drupal.underbar.fncOnBlurRelatedURL();
        }
        Drupal.underbar.createDotItems();
        Drupal.underbar.createSearchItems();
        if (jQuery("#underbar-container").css('display') == 'none')
          Drupal.underbar.runEffect(false);
        Drupal.underbar.state = Drupal.underbar.stateOpened;
        Drupal.underbar.runSlideShow();
        Drupal.underbar.reloadColumns(Drupal.underbar.stateOpened);
        Drupal.underbar.initArrCols(1);
        Drupal.underbar.inactiveDots();
        Drupal.underbar.activeDots();
      }
    },

    /**
     *
     * @param event
     */
    fncKeyDownSearch: function (event) {
      switch (event.keyCode) {
        case 13:
          if (!Drupal.underbar.submitSearch()) {
            //Tien - prevent running to other event 27/03/2012
            event.returnValue = false;
            //Tien end 27/03/2012
          }
          break;
        default:
          break;
      }
    },

    /**
     * @todo.
     */
    fncOnBlurRelatedURL: function () {
      var splitQuery = {
        query: [],
        context: []
      };
      if (jQuery.isArray(Drupal.underbar.qc_query)) {
        splitQuery = Drupal.underbar.underbar_splitQueryArray(Drupal.underbar.qc_query);
      } else {
        splitQuery = Drupal.underbar.underbar_splitQueryArray([ Drupal.underbar.qc_query ]);
      }
      Drupal.underbar.relatedContentURL = Drupal.underbar.prefixRelatedContentURL;

      for (var i = 0; i < splitQuery.context.length; i++) {
        if (splitQuery.query[i].length > 0) {
          if (i != 0) {
            Drupal.underbar.relatedContentURL = Drupal.underbar.relatedContentURL + "&";
          }
          if ("DOI" == splitQuery.context[i]) {
            Drupal.underbar.relatedContentURL = Drupal.underbar.relatedContentURL + "assoc=" + splitQuery.query[i];
          }
          if ("KEYW" == splitQuery.context[i]) {
            Drupal.underbar.relatedContentURL = Drupal.underbar.relatedContentURL + "f_" + i + "=keyword&q_" + i + "=" + splitQuery.query[i];
          }
          if ("SUBJ" == splitQuery.context[i]) {
            Drupal.underbar.relatedContentURL = Drupal.underbar.relatedContentURL + "t" + i + "=" + splitQuery.query[i];
          }
          if ("QS" == splitQuery.context[i]) {
            Drupal.underbar.relatedContentURL = Drupal.underbar.relatedContentURL + "q=" + splitQuery.query[i];
          }
          if ("AUTH" == splitQuery.context[i]) {
            Drupal.underbar.relatedContentURL = Drupal.underbar.relatedContentURL + "f_" + i + "=author&q_" + i + "=" + splitQuery.query[i];
          }
          if ("TITLE" == splitQuery.context[i]) {
            Drupal.underbar.relatedContentURL = Drupal.underbar.relatedContentURL + "f_" + i + "=title&q_" + i + "=" + splitQuery.query[i];
          }
        }
      }
      jQuery("a#underbar-related").attr('href', Drupal.underbar.relatedContentURL);
    },

    /**
     * @todo.
     */
    checkOpenURL: function (e) {
      if (Drupal.underbar.resultList.length == 0) {
        //Tien - in case of clicking 'See all related contents' on IE, no supported e.preventDefault 27/03/2012
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false; //for IE
        }
        //Tien end 27/03/2012
      }
    },

    /**
     *
     * @param id
     * @param mode
     */
    showInfoAboutAndNoResults: function (id, mode) {
      if (mode == 0) {
        jQuery("<div></div>").attr({id: 'underbar-container-about' + mode}).appendTo(id);
        jQuery("#underbar-container-about" + mode).attr('class', 'underbar-container-about');
        jQuery("<div></div>").attr('id', 'underbar-about-columns' + mode).appendTo('#underbar-container-about' + mode);
        jQuery("#underbar-about-columns" + mode).attr('class', 'underbar-about-columns');
        //column 1 :
        jQuery("<div></div>").attr({id: 'underbar-about-column_0' + mode}).appendTo('#underbar-about-columns' + mode);
        jQuery("#underbar-about-column_0" + mode).attr('class', 'underbar-about-column');
        jQuery("<div></div>").attr({id: 'underbar-about-content_0' + mode}).appendTo('#underbar-about-column_0' + mode);
        jQuery("#underbar-about-content_0" + mode).attr('class', 'underbar-about-content');
        jQuery("#underbar-about-content_0" + mode).append("<h3>" + "About the Oxford Index" + "</h3>");
        var ulContent = "";
        ulContent += "<ul>";
        ulContent += "<li>";
        ulContent += "<div class='alignAbout'>A free search and discovery service, the Index helps users begin their research by providing a single, convenient search portal for trusted scholarship from Oxford and our partners.</div>";
        ulContent += "</li>";
        ulContent += "</ul>";
        jQuery('#underbar-about-content_0' + mode).append(ulContent);
        //column 2 :
        jQuery("<div></div>").attr({id: 'underbar-about-column_1' + mode}).appendTo('#underbar-about-columns' + mode);
        jQuery("#underbar-about-column_1" + mode).attr('class', 'underbar-about-column');
        jQuery("<div></div>").attr({id: 'underbar-about-content_1' + mode}).appendTo('#underbar-about-column_1' + mode);
        jQuery("#underbar-about-content_1" + mode).attr('class', 'underbar-about-content');
        jQuery("#underbar-about-content_1" + mode).append("<h3>" + "Related Content from Oxford University Press" + "</h3>");
        var ulContent = "";
        ulContent += "<ul>";
        ulContent += "<li>";
        ulContent += "<div class='alignAbout'>More than just a search tool, the Index provides smart recommendations for related content - from journal articles and scholarly monographs, to reference content, primary sources, and more - based on your research interests.</div>";
        ulContent += "</li>";
        ulContent += "</ul>";
        jQuery('#underbar-about-content_1' + mode).append(ulContent);
        //column 3 :
        jQuery("<div></div>").attr({id: 'underbar-about-column_2' + mode}).appendTo('#underbar-about-columns' + mode);
        jQuery("#underbar-about-column_2" + mode).attr('class', 'underbar-about-column underbar-about-column-end');
        jQuery("<div></div>").attr({id: 'underbar-about-content_2' + mode}).appendTo('#underbar-about-column_2' + mode);
        jQuery("#underbar-about-content_2" + mode).attr('class', 'underbar-about-content');
        jQuery("#underbar-about-content_2" + mode).append("<h3>" + "Search across All Books and Journals from Oxford" + "</h3>");
        var ulContent = "";
        ulContent += "<ul>";
        ulContent += "<li>";
        ulContent += "<div class='alignAbout'>The Oxford Index brings together, for the first time, the best of reference, journals, and scholarly works - one search delivers seamless discovery of all Oxford University Press online content.<br /><br />";
        ulContent += "Just enter your search term(s) in the box at the bottom right of your browser, and click the search icon to view your results in a new tab or window.</div>";
        ulContent += "</li>";
        ulContent += "</ul>";
        jQuery('#underbar-about-content_2' + mode).append(ulContent);
      } else {
        jQuery("<div></div>").attr({id: 'underbar-container-about' + mode}).appendTo(id);
        jQuery("#underbar-container-about" + mode).attr('class', 'underbar-container-noresult');
        jQuery("<div></div>").attr('id', 'underbar-about-columns' + mode).appendTo('#underbar-container-about' + mode);
        jQuery("#underbar-about-columns" + mode).attr('class', 'underbar-about-columns');
        //column 1 :
        jQuery("<div></div>").attr({id: 'underbar-about-column_0' + mode}).appendTo('#underbar-about-columns' + mode);
        jQuery("#underbar-about-column_0" + mode).attr('class', 'underbar-column-noresult');
        jQuery("<div></div>").attr({id: 'underbar-about-content_0' + mode}).appendTo('#underbar-about-column_0' + mode);
        jQuery("#underbar-about-content_0" + mode).attr('class', 'underbar-about-content');
        jQuery("#underbar-about-content_0" + mode).append("<h3>" + "</h3>");
        var ulContent = "";
        ulContent += "<ul>";
        ulContent += "<li>";
        ulContent += "<div class='alignAbout'></div>";
        ulContent += "</li>";
        ulContent += "</ul>";
        jQuery('#underbar-about-content_0' + mode).append(ulContent);
        //column 2 :
        jQuery("<div></div>").attr({id: 'underbar-about-column_1' + mode}).appendTo('#underbar-about-columns' + mode);
        jQuery("#underbar-about-column_1" + mode).attr('class', 'underbar-column-noresult');
        jQuery("<div></div>").attr({id: 'underbar-about-content_1' + mode}).appendTo('#underbar-about-column_1' + mode);
        jQuery("#underbar-about-content_1" + mode).attr('class', 'underbar-about-content');
        jQuery("#underbar-about-content_1" + mode).append("<h3>" + "NO RELATED LINKS DETECTED" + "</h3>");
        var ulContent = "";
        ulContent += "<ul>";
        ulContent += "<li>";
        ulContent += "<div class='alignAbout'>We can detect no related content links based on the main page you are currently viewing.<br /><br />";
        ulContent += "Related links from the Oxford Index will often be shown here when you are viewing search results or actual content pages on this site.<br><br>";
        ulContent += "Check back here again when viewing other pages to see how the Oxford Index can help you navigate through online content from Oxford University Press and our publishing partners.</div>";
        ulContent += "</li>";
        ulContent += "</ul>";
        jQuery('#underbar-about-content_1' + mode).append(ulContent);
        //column 3 :
        jQuery("<div></div>").attr({id: 'underbar-about-column_2' + mode}).appendTo('#underbar-about-columns' + mode);
        jQuery("#underbar-about-column_2" + mode).attr('class', 'underbar-column-noresult underbar-about-column-end');
        jQuery("<div></div>").attr({id: 'underbar-about-content_2' + mode}).appendTo('#underbar-about-column_2' + mode);
        jQuery("#underbar-about-content_2" + mode).attr('class', 'underbar-about-content');
        jQuery("#underbar-about-content_2" + mode).append("<h3>" + "YOU CAN ALWAYS SEARCH THE INDEX DIRECTLY" + "</h3>");
        var ulContent = "";
        ulContent += "<ul>";
        ulContent += "<li>";
        ulContent += "<div class='alignAbout'>Use the search box on the right of the Oxford Index bar to search across all book and journal content available from Oxford University Press and our publishing partners.<br /><br />";
        ulContent += "Results will open in a new browser window or tab, so you can keep your place on this site while you explore related material.</div>";
        ulContent += "</li>";
        ulContent += "</ul>";
        jQuery('#underbar-about-content_2' + mode).append(ulContent);
      }
    },

    initArrCols: function (mode) {
      var i;
      var last;
      //in case of clicking search icon
      if (mode == 1) {
        i = 0;
        last = Drupal.underbar.curColumns;
      }
      //in case of initialiazion
      if (mode == 0) {
        if (arrCols.length == 0) { // in case of no resizing browser
          i = 0;
          last = Drupal.underbar.curColumns;
        } else { // in case of resizing browser
          i = arrCols[0];
          if (i + Drupal.underbar.curColumns > totalColumnsInPage) {
            i = i - ((i + Drupal.underbar.curColumns) - totalColumnsInPage);
            last = totalColumnsInPage;
          } else {
            last = Drupal.underbar.curColumns + i;
          }
        }
      }
      arrCols = [];
      var index = 0;
      //Tien - in case IE increase current column auto 28/03/2012
      if (i < 0) {
        i = 0;
      }
      //Tien end 28/03/2012
      for (var j = i; j < last; j++) {
        arrCols[index] = j;
        index++;
      }
      Drupal.underbar.createArrColsHidden();
    },

    createArrColsHidden: function () {
      Drupal.underbar.hidArrCols = arrCols.join();
      jQuery("#hidArrCols").val(Drupal.underbar.hidArrCols);
      jQuery("#hidTotalColumns").val(totalColumnsInPage);
    },

    activeDots: function () {
      for (var i = 0; i < arrCols.length; i++) {
        var srcInactive = jQuery('#underbar-dot-' + arrCols[i]).attr("src").replace("-inactive", "-active");
        jQuery('#underbar-dot-' + arrCols[i]).attr("src", srcInactive);
      }
    },

    inactiveDots: function () {
      for (var i = 0; i < totalColumnsInPage; i++) {
        var srcInactive = jQuery('#underbar-dot-' + i).attr("src").replace("-active", "-inactive");
        jQuery('#underbar-dot-' + i).attr("src", srcInactive);
      }
    },

    truncateObj: function (str, length, isAuthor) {
      if (str != null && jQuery.trim(str) != "") {

        if (!isAuthor) {
          if (str.length >= (length + 3)) {

            // Count the number of uppercase characters.  Subtract a character for every 10 uppercase
            var numUppercase = 0;

            for (c = 0; c < length; c++) {
              if (str.charAt(c) == str.charAt(c).toUpperCase()) {
                numUppercase++;
              }
            }

            var subFromLower = numUppercase / 10;

            length = length - subFromLower;

            // If the last character is a space, remove it.
            if (str.charAt(length - 1) == ' ')
              length--;

            str = str.substring(0, length) + "...";

          }
        } else {
          // truncate for author
          var idxEndOfStr = 0;
          if (str.indexOf(",") != -1) {
            for (i = 0; i < str.length; i++) {
              if (str.charAt(i) == ',') {
                idxEndOfStr++;
                if (idxEndOfStr == 2) {
                  str = str.substring(0, i + 1) + "...";
                  break;
                }
              }
            }
          }
        }
      }
      return str;
    },

    createSearchItems: function () {
      var morContentTypeLink;
      var titleTemp;
      jQuery("#underbar-container-cover").html("");
      // begin added by vu.ngo - 3/20/2012
      if (Drupal.underbar.resultList.length == 0) {
        jQuery("<li></li>").attr('id', 'slide').appendTo('#slide-control');
        jQuery("#slide").attr('class', 'underbar_slide');
        jQuery("<div></div>").attr('id', 'col').appendTo('#slide');
        jQuery("<div></div>").attr({id: 'content'}).appendTo('#col');
        jQuery("#content").attr('class', 'underbar-content');
        return;
      }
      // end added by vu.ngo - 3/20/2012
      jQuery('#underbar-container-cover').append("<button id='underbar-prev' class='underbar-prev underbar-prev-blank-background'>prev</button>");
      jQuery("<div></div>").attr('id', 'underbar-columns').appendTo('#underbar-container-cover');
      jQuery("#underbar-columns").attr('class', 'underbar-slide-container');
      jQuery("<ul></ul>").attr('id', 'slide-control').appendTo('#underbar-columns');
      jQuery.each(Drupal.underbar.resultList, function (i) {
        jQuery("<li></li>").attr('id', 'slide' + i).appendTo('#slide-control');
        jQuery("#slide" + i).attr('class', 'underbar_slide');
        jQuery("<div></div>").attr('id', 'col' + i).appendTo('#slide' + i);
        jQuery("#col" + i).attr('class', 'underbar-column');
        jQuery("<div></div>").attr({id: 'content' + i}).appendTo('#col' + i);
        jQuery("#content" + i).attr('class', 'underbar-content');

        // START_EDIT QUY.HUYNH 3/23/2012 OI Underbar.3.18 - Ticket #687 - 1.3.2 Display content type name
        var contentType = Drupal.underbar.contentType;
        jQuery('#content' + i).append("<h3>" + Drupal.underbar.displayContentType(Drupal.underbar.resultList[i].contentType) + "</h3>");
        // END_EDIT QUY.HUYNH 3/23/2012 OI Underbar.3.18 - Ticket #687 - 1.3.2 Display content type name

        //Tien - check JSON is an object or an array 28/03/2012
        if (Drupal.underbar.resultList[i].IndexCardSearchResults != "") {
          //in case indexCards JSON has only 1 item - an object not an array
          if (Drupal.underbar.resultList[i].IndexCardSearchResults.indexCards.length == undefined) {
            Drupal.underbar.setContentColumns(Drupal.underbar.resultList[i].IndexCardSearchResults.indexCards, Drupal.underbar.resultList[i].contentType, i, 0);
            //in case indexCards JSON is an array
          } else {
            jQuery.each(Drupal.underbar.resultList[i].IndexCardSearchResults.indexCards, function (index, value) {
              Drupal.underbar.setContentColumns(value, Drupal.underbar.resultList[i].contentType, i, 1, index);
            });
          }
          //Tien end 28/03/2012
          // START_EDIT QUY.HUYNH 3/23/2012 OI Underbar.3.16 - Ticket #685 - 1.3.2.2 Link to more by content type
          var contentTypeParameter = Drupal.underbar.resultList[i].contentType.toLowerCase().replace(/ /g, '');

          // OI ticket #1055, type Article relabelled as Review Article in search.xml breaks Drupal.underbar. Do hacky rewrite.
          if (contentTypeParameter === 'article') {
            contentTypeParameter = 'reviewarticle';
          } else if (contentTypeParameter === 'authority') {
            contentTypeParameter = 'overview';
          }

          morContentTypeLink = Drupal.underbar.relatedContentURL + "&type_0=" + contentTypeParameter;

          jQuery('#col' + i).append("<a href='" + morContentTypeLink + "' target='_blank' onclick='Drupal.underbar.checkOpenURL(event);' style='text-decoration: none'><span class='underbar-more'>More " + Drupal.underbar.plural(Drupal.underbar.displayContentType(Drupal.underbar.resultList[i].contentType)) + " &raquo;</span></a>");
          // END_EDIT QUY.HUYNH 3/23/2012 OI Underbar.3.16 - Ticket #685 - 1.3.2.2 Link to more by content type
        }
        Drupal.underbar.itemLength++;
        if (Drupal.underbar.itemLength == 8) {
          return false;
        } else if (Drupal.underbar.itemLength > 8) {
          return false;
        }
      });
      jQuery('#underbar-container-cover').append("<button id='underbar-next' class='underbar-next underbar-next-arrow-background'>next</button>");
    },

    setContentColumns: function (value, contentType, i, mode, index) {
      var ulContent = "";
      ulContent += "<ul>";
      ulContent += "<li>";
      var visible = 0;
      if (value.primaryContributor == "undefined" || value.primaryContributor == null) {
        visible = 1;
        value.primaryContributor = "";
      }
      if (value.publicationDate == "undefined" || value.publicationDate == null) {
        visible = 2;
        value.publicationDate = "";
      }
      if (value.source == "undefined" || value.source == null) {
        visible = 3;
        value.source = "";
      }
      if (value.title == "undefined" || value.title == null) {
        visible = 4;
        value.title = "";
      }
      if (contentType == "Journal") {
        titleTemp = Drupal.underbar.truncateObj(value.title, 34, false);
        ulContent += "<a title='" + Drupal.underbar.encodeTitle(value.title) + "' href='http://oxfordindex.oup.com/view/" + value.doi + "' target='_blank'>" + titleTemp + "</a>";
        ulContent += Drupal.underbar.yearOnly(value.publicationDate);
      } else if (contentType == "Book" || contentType == "Research Guide") {
        titleTemp = Drupal.underbar.truncateObj(value.title, 34, false);
        ulContent += "<a title='" + Drupal.underbar.encodeTitle(value.title) + "' href='http://oxfordindex.oup.com/view/" + value.doi + "' target='_blank'>" + titleTemp + "</a>";
        if (visible != 1)
          ulContent += Drupal.underbar.truncateObj(value.primaryContributor, 0, true) + "; ";
        ulContent += Drupal.underbar.yearOnly(value.publicationDate);
      } else if (contentType == "Journal Article" || contentType == "Chapter" || contentType == "Article") {
        titleTemp = Drupal.underbar.truncateObj(value.title, 34, false);
        ulContent += "<a title='" + Drupal.underbar.encodeTitle(value.title) + "' href='http://oxfordindex.oup.com/view/" + value.doi + "' target='_blank'>" + titleTemp + "</a>";
        if (contentType != "Reference Entry" && visible != 1)
          ulContent += Drupal.underbar.truncateObj(value.primaryContributor, 0, true) + "<br>";
        if (visible != 3)
          ulContent += Drupal.underbar.truncateObj(value.source, 29, false) + "; ";
        ulContent += Drupal.underbar.yearOnly(value.publicationDate);
      } else if (contentType == "Reference Entry") {
        titleTemp = Drupal.underbar.truncateObj(value.title, 34, false);
        ulContent += "<a title='" + Drupal.underbar.encodeTitle(value.title) + "' href='http://oxfordindex.oup.com/view/" + value.doi + "' target='_blank'>" + titleTemp + "</a>";
        if (visible != 3)
          ulContent += Drupal.underbar.truncateObj(value.source, 29, false);
      } else if (contentType == "Authority") {
        titleTemp = Drupal.underbar.truncateObj(value.title, 34, false);
        ulContent += "<a title='" + Drupal.underbar.encodeTitle(value.title) + "' href='http://oxfordindex.oup.com/view/" + value.doi + "' target='_blank'>" + titleTemp + "</a>";
        if (value.subjects != "undefined" && value.subjects != null) {
          ulContent += Drupal.underbar.truncateObj(value.subjects, 0, true) + "<br>";
        }
        if (visible != 3)
          ulContent += Drupal.underbar.truncateObj(value.source, 29, false);
      } else if (contentType == "Primary Text") {
        titleTemp = Drupal.underbar.truncateObj(value.title, 34, false);
        ulContent += "<a title='" + Drupal.underbar.encodeTitle(value.title) + "' href='http://oxfordindex.oup.com/view/" + value.doi + "' target='_blank'>" + titleTemp + "</a>";
        if (contentType != "Reference Entry" && visible != 1)
          ulContent += Drupal.underbar.truncateObj(value.primaryContributor, 0, true) + "<br>";
        if (visible != 3)
          ulContent += Drupal.underbar.truncateObj(value.source, 29, false) + "; ";
        ulContent += Drupal.underbar.yearOnly(value.publicationDate);
      } else {
        titleTemp = Drupal.underbar.truncateObj(value.title, 34, false);
        ulContent += "<a title='" + Drupal.underbar.encodeTitle(value.title) + "' href='http://oxfordindex.oup.com/view/" + value.doi + "' target='_blank'>" + titleTemp + "</a>";
        if (contentType != "Reference Entry" && visible != 1)
          ulContent += Drupal.underbar.truncateObj(value.primaryContributor, 0, true) + "<br>";
        if (visible != 3)
          ulContent += Drupal.underbar.truncateObj(value.source, 29, false) + "; ";
        ulContent += Drupal.underbar.yearOnly(value.publicationDate);
      }
      ulContent += "</li>";
      ulContent += "</ul>";
      jQuery('#content' + i).append(ulContent);
      if (mode == 1) {
        if (index == 2)
          return false;
      }
    },

    yearOnly: function (publicationDate) {
      if (publicationDate.indexOf("-") != -1) {
        return publicationDate.substring(0, publicationDate.indexOf("-"));
      }
      return "";
    },

    plural: function (word) {
      if (word.charAt(word.length - 1) == 'y') {
        return word.substring(0, word.length - 1) + "ies";
      }
      return word + "s";
    },

    runEffect: function (hide, logoClicked) {
      // Options for animated effects.
      var effectOptions = {
        effect: 'blind',
        duration: 400
      };

      // run the effect
      if (logoClicked) {
        if ((Drupal.underbar.state == Drupal.underbar.stateClosed && (Drupal.underbar.checkInvalidSearch() || Drupal.underbar.resultList.length == 0)) || Drupal.underbar.state == Drupal.underbar.stateOpened) {
          jQuery("#underbar-container").hide();
          if (Drupal.underbar.state == Drupal.underbar.stateClosed) {
            jQuery("#underbar_aboutDiv").show(effectOptions);
          }
          else {
            jQuery("#underbar_aboutDiv").show();
          }
          jQuery("#underbar-related").hide();
          jQuery("#hide-link").hide();
          jQuery("#underbar-hide").hide();
          jQuery("#show-link").show();
          jQuery("#underbar-show").show();
          jQuery("#underbar-controls").removeClass("underbar-controls-background");
          Drupal.underbar.inactiveDots();
        } else if (Drupal.underbar.state == Drupal.underbar.stateClosed && !Drupal.underbar.checkInvalidSearch() && !Drupal.underbar.resultList.length == 0) {
          jQuery("#underbar-container").show(effectOptions);
          jQuery("#underbar-related").show();
          jQuery("#underbar-controls").show();
          jQuery("#show-link").hide();
          jQuery("#underbar-show").hide();
          jQuery("#hide-link").show();
          jQuery("#underbar-hide").show();
          jQuery("#underbar-controls").addClass("underbar-controls-background");
          Drupal.underbar.inactiveDots();
          Drupal.underbar.activeDots();
          jQuery("#underbar_aboutDiv").hide();
        }
        //jQuery( "#underbar-reveal" ).hide();
        jQuery("#underbar-reveal-hide").show();
        jQuery("#underbar-reveal-show").hide();
        jQuery('#underbar_noResultsDiv').hide();
      }
      else {
        // Hide Show related links
        if (hide) {
          if (jQuery("#underbar_aboutDiv").css("display") == "none") {
            jQuery("#underbar-container").animate({height: 0}, 400, "linear", function () { $(this).hide().css('height', ''); });
          }
          else {
            jQuery("#underbar_aboutDiv").hide(effectOptions);
          }
          jQuery("#underbar-related").hide();
          jQuery("#hide-link").hide();
          jQuery("#underbar-hide").hide();
          jQuery("#underbar-controls").removeClass("underbar-controls-background");
          jQuery("#show-link").show();
          jQuery("#underbar-show").show();
          jQuery("#underbar-reveal-show").show();
          jQuery("#underbar-reveal-hide").hide();
          jQuery('#underbar_noResultsDiv').hide();
        }
        else {
          // Open Show related links
          if (Drupal.underbar.resultList.length == 0) {

            if (jQuery("#underbar_aboutDiv").css("display") == "none") {
              jQuery('#underbar_noResultsDiv').show(effectOptions);
            } else {
              jQuery('#underbar_noResultsDiv').show();
            }
            jQuery("#underbar_aboutDiv").hide();
            jQuery("#underbar-controls").show();
            jQuery("#underbar-controls").addClass("underbar-controls-background");
            jQuery("#underbar-search").show();
            jQuery("#underbar-reveal-hide").hide();
            jQuery("#underbar-reveal-show").show();
            jQuery("#show-link").hide();
            jQuery("#underbar-show").hide();
            jQuery("#hide-link").show();
            jQuery("#underbar-hide").show();
            jQuery("#underbar-related").hide();
          }
          else {
            if (jQuery("#underbar_aboutDiv").css("display") == "none") {
              jQuery("#underbar-container").show(effectOptions);
              jQuery("#underbar-related").show();
              jQuery("#underbar-controls").show();
              jQuery("#underbar-controls").addClass("underbar-controls-background");
              jQuery("#underbar-search").show();
              jQuery("#underbar-reveal-hide").hide();
              jQuery("#underbar-reveal-show").show();
              jQuery("#show-link").hide();
              jQuery("#underbar-show").hide();
              jQuery("#hide-link").show();
              jQuery("#underbar-hide").show();
            } else {
              jQuery("#underbar_aboutDiv").hide();
              jQuery("#underbar-container").show();
              jQuery("#underbar-related").show();
              jQuery("#underbar-controls").show();
              jQuery("#show-link").hide();
              jQuery("#underbar-show").hide();
              jQuery("#hide-link").show();
              jQuery("#underbar-hide").show();
              jQuery("#underbar-reveal-hide").hide();
              jQuery("#underbar-reveal-show").show();
              jQuery("#underbar-controls").addClass("underbar-controls-background");
              Drupal.underbar.inactiveDots();
              Drupal.underbar.activeDots();
            }
            jQuery('#underbar_noResultsDiv').hide();
          }
        }
      }
      jQuery('#underbar-error').hide();
    },

    removeDefaultText: function () {
      if (jQuery("#underbar-error").css("display") != "none") {
        jQuery('#underbar-error').hide();
      }
      if (jQuery("#underbar-search-oxford-index").val() == "in Oxford Index") {
        jQuery("#underbar-search-oxford-index").removeClass("underbar-search-text-color");
        jQuery("#underbar-search-oxford-index").val("");
      }
    },

    isChromeBrowser: function () {
      var flag = false;
      var val = navigator.userAgent.toLowerCase();
      if (val.indexOf("chrome") > -1) {
        flag = true;
      }
      return  flag;
    },

    encodeTitle: function (str) {
      if (str != null && str != '') {
        for (var key = 0; key < Drupal.underbar.targetCharArr.length; key++) {
          str = str.replace(new RegExp(Drupal.underbar.targetCharArr[key], 'g'), Drupal.underbar.encodeCharArr[key]);
        }
      }
      return str;
    },

    underbar_splitQueryString: function (q) {
      var retObj = {
        context: '',
        query: ''
      }
      if (q.charAt(0) === Drupal.underbar.CONTEXT_DELIMITER) {
        var delimiter = Drupal.underbar.CONTEXT_DELIMITER;
      }
      else if (q.substring(0, 3) === Drupal.underbar.CONTEXT_DELIMITER_ENCODED) {
        var delimiter = Drupal.underbar.CONTEXT_DELIMITER_ENCODED;
      }
      if (delimiter) {
        var splitQuery = q.split(delimiter);
        // string starts with delimiter, pretend it's a 1-indexed array below
        if (splitQuery.length > 1) {
          retObj.context = splitQuery[1];
          for (var i = 2; i < splitQuery.length; i++) {
            retObj.query = retObj.query + splitQuery[i];
            if (i < splitQuery.length - 1) {
              retObj.query = retObj.query + delimiter;
            }
          }
        }
      }
      return retObj;
    },

    underbar_splitQueryArray: function (q) {
      var split = null;
      var retObj = {
        context: [],
        query: []
      };
      for (var i = 0; i < q.length; i++) {
        split = Drupal.underbar.underbar_splitQueryString(q[i]);
        retObj.context.push(split.context);
        retObj.query.push(split.query);
      }
      return retObj;
    },

    displayContentType: function (str) {
      if (str != null && str != '' && str == "Authority") {
        return "Overview";
      }
      return str;
    },

    isUnderbarPassiveMode: function (query, defaultQuery) {
      var splitQueryArray = null;
      var splitQuery = null;
      if (jQuery.isArray(query)) {
        splitQueryArray = Drupal.underbar.underbar_splitQueryArray(query);
      } else {
        splitQuery = Drupal.underbar.underbar_splitQueryString(query);
      }
      var splitDefaultQuery = Drupal.underbar.underbar_splitQueryString(defaultQuery);

      if (splitQueryArray !== null && splitQueryArray.query.length > 0 && splitQueryArray.query[0] !== '') {
        return false;
      }

      if (splitQuery !== null && splitQuery.query !== '') {
        return false;
      }

      if (splitDefaultQuery !== null && splitDefaultQuery.query !== '' && splitDefaultQuery.query !== 'default') {
        return false;
      }

      return true;
    },

    getQueryContext: function () {
      var query_context = [];

      // Get the title information.
      var title = $('meta[name="DC.Title"]').attr('content');
      if (title) {
        var search_title = title.replace(/[:\.,*]/g, "");
        search_title = search_title.replace(/\b(and|or|a|of|the|in|with|to|an|for|as)\b/gi, "");
        search_title = search_title.replace(/^\s/, "");
        search_title = search_title.replace(/\s+/g, " OR ");
        query_context.push(":TITLE:" + search_title);
      }

      // Add the first OUP taxonomy if we have one.
      if (Drupal.settings.oupUnderbar.taxonomies !== 'undefined') {
        /**
         *  OUP index does not give us the ability to search OR and forces use of AND,
         *  limiting our results if we have multiple taxonomies.
         *  Implementing current (sad face) behaviour from H2O of getting the first
         *  taxonomy listed to use.
         */
        var subj_query = Drupal.settings.oupUnderbar.taxonomies[0];
        query_context.push(":SUBJ:" + subj_query);
      }

      return query_context;
    },

    bindEvents: function () {
      // Open the underbar on about page open.
      $('#underbar-reveal-show').bind('click', function () {
        Drupal.underbar.openOIUnderbar_About();
      });

      // Open on other buttons.
      $('#underbar-show').bind('click', function () {
        Drupal.underbar.openOIUnderbar(1);
      });

      // Close underbar.
      $('#underbar-reveal-hide').bind('click', function () {
        Drupal.underbar.closeOIUnderbar();
      });
      $('#underbar-hide').bind('click', function () {
        Drupal.underbar.closeOIUnderbar()
      });

      // Search form.
      $('#underbar-search-oxford-index').bind('click', function () {
        Drupal.underbar.removeDefaultText();
      })
        .keydown(function (event) {
          Drupal.underbar.fncKeyDownSearch(event);
        });
      $('#underbar-search-oxford-index-btn').bind('click',function () {
        return Drupal.underbar.submitSearch();
      }).keydown(function (event) {
        Drupal.underbar.fncKeyDownSearch(event);
      });

      // Resize.
      $(window).bind('resize', function () {  Drupal.underbar.reloadColumns; });
    }
  };
})(jQuery);

/**
 * The JSONNP callback is hard coded at the server :(
 *  e.g. http://oi-underbar.oup.com/underbar/oiunderbarserver.initsearch?qc=%3ASUBJ%3AAHU01040&dqc=%3AQS%3Adefault&pct=&pid=JRN&callback=whyDoesntThisWork&_=1400673672041
 * @param data
 */
function callbackInitBar(data) {
  Drupal.underbar.callbackInitBar(data);
}

/**
 * These variables are used outside this function by OUP's hacked version of
 * jCarousel :(
 */
var arrCols = [];
var totalColumnsInPage = 0;
;
/*!
 * jCarousel Lite - v1.9.3 - 2015-02-16
 * http://kswedberg.github.com/jquery-carousel-lite/
 * Copyright (c) 2015 Karl Swedberg
 * based on the original by Ganeshji Marwaha (gmarwaha.com)
 * Licensed MIT (http://kswedberg.github.com/jquery-carousel-lite/blob/master/LICENSE-MIT)
 */


(function($) {
  $.jCarouselLite = {
    version: '1.9.3',
    curr: 0
  };

  $.fn.anim = typeof $.fn.velocity !== 'undefined' ? $.fn.velocity : $.fn.animate;

  $.fn.jCarouselLite = function(options) {
    var o = $.extend(true, {}, $.fn.jCarouselLite.defaults, options),
        ceil = Math.ceil,
        mabs = Math.abs;

    this.each(function() {

      var beforeCirc, afterCirc, pageNav, pageNavCount, resize,
          li, itemLength, curr,
          prepResize, touchEvents, $btnsGo,
          isTouch = 'ontouchend' in document,
          styles = { div: {}, ul: {}, li: {} },
          // firstCss = true,
          running = false,
          animCss = o.vertical ? 'top': 'left',
          aniProps = {},
          sizeProp = o.vertical ? 'height': 'width',
          outerMethod = o.vertical ? 'outerHeight': 'outerWidth',
          self = this,
          div = $(this),
          ul = div.find(o.containerSelector).eq(0),
          tLi = ul.children(o.itemSelector),
          tl = tLi.length,
          visibleNum = o.visible,
          // need visibleCeil and visibleFloor in case we want a fractional number of visible items at a time
          visibleCeil = ceil(visibleNum),
          visibleFloor = Math.floor(visibleNum),
          start = Math.min(o.start, tl - 1),
          direction = 1,
          activeBtnOffset = 0,
          activeBtnTypes = {},
          startTouch = {},
          endTouch = {},
          axisPrimary = o.vertical ? 'y' : 'x',
          axisSecondary = o.vertical ? 'x' : 'y';


      var init = o.init.call(this, o, tLi);
      // bail out for this carousel if the o.init() callback returns `false`
      if ( init === false ) {
        return;
      }

      var makeCircular = function() {
        if (beforeCirc && beforeCirc.length) {
          beforeCirc.remove();
          afterCirc.remove();
        }
        tLi = ul.children(o.liSelector);
        tl = tLi.length;
        beforeCirc = tLi.slice( tl - visibleCeil ).clone(true).each(fixIds);
        afterCirc = tLi.slice( 0, visibleCeil ).clone(true).each(fixIds);
        ul.prepend( beforeCirc )
          .append( afterCirc );
        li = ul.children(o.liSelector);
        itemLength = li.length;
      };

      div.data('dirjc', direction);
      div.data(animCss + 'jc', div.css(animCss));

      if (o.circular) {

        makeCircular();
        start += visibleCeil;
        activeBtnOffset = visibleCeil;

      } else {
        li = ul.children(o.liSelector);
        itemLength = li.length;
      }

      if (o.btnGo && o.btnGo.length) {

        if ( $.isArray(o.btnGo) && typeof o.btnGo[0] === 'string' ) {
          $btnsGo = $( o.btnGo.join() );
        } else {
          $btnsGo = $(o.btnGo);
        }

        $btnsGo.each(function(i) {
          $(this).bind('click.jc', function(event) {
            event.preventDefault();
            var btnInfo = {
              btnGo: this,
              btnGoIndex: i
            };
            return go(o.circular ? visibleNum + i : i, btnInfo);
          });
        });
        activeBtnTypes.go = 1;
      }

      var setActive = function(i, types) {
        i = ceil(i);

        // Set active class on the appropriate carousel item
        li.filter('.' + o.activeClass).removeClass(o.activeClass);
        li.eq(i).addClass(o.activeClass);

        var activeBtnIndex = (i - activeBtnOffset) % tl,
            visEnd = activeBtnIndex + visibleFloor;

        if ( types.go ) {
          // remove active and visible classes from all the go buttons
          $btnsGo.removeClass(o.activeClass).removeClass(o.visibleClass);
          // add active class to the go button corresponding to the first visible slide
          $btnsGo.eq(activeBtnIndex).addClass(o.activeClass);
          // add visible class to go buttons corresponding to all visible slides
          $btnsGo.slice(activeBtnIndex, activeBtnIndex + visibleFloor).addClass(o.visibleClass);

          if ( visEnd > $btnsGo.length ) {
            $btnsGo.slice(0, visEnd - $btnsGo.length).addClass(o.visibleClass);
          }
        }

        if ( types.pager ) {
          pageNav.removeClass(o.activeClass);
          pageNav.eq( ceil(activeBtnIndex / visibleNum) ).addClass(o.activeClass);
        }
        return activeBtnIndex;
      };

      curr = start;

      $.jCarouselLite.curr = curr;

      var getDimensions = function(reset) {
        var liSize, ulSize, divSize;

        if (reset) {

          styles.div[sizeProp] = '';
          styles.li = {
            width: '',
            height: ''
          };
          // bail out with the reset styles
          return styles;
        }

        // Full li size(incl margin)-Used for animation
        liSize = li[outerMethod](true);

        // size of full ul(total length, not just for the visible items)
        ulSize = liSize * itemLength;

        // size of entire div(total length for just the visible items)
        divSize = liSize * visibleNum;

        styles.div[sizeProp] = divSize + 'px';
        styles.ul[sizeProp] = ulSize + 'px';
        styles.ul[animCss] = -(curr * liSize) + 'px';
        styles.li = {
          width: li.width(),
          height: li.height()
        };
        styles.liSize = liSize;
        return styles;
      };


      var setDimensions = function(reset) {
        var css, tmpDivSize;
        var prelimCss = {
          div: {visibility: 'visible', position: 'relative', zIndex: 2, left: '0'},
          ul: {margin: '0', padding: '0', position: 'relative', listStyleType: 'none', zIndex: 1},
          li: {overflow: o.vertical ? 'hidden' : 'visible', 'float': o.vertical ? 'none' : 'left'}
        };

        if (reset) {
          css = getDimensions(true);
          div.css(css.div);
          ul.css(css.ul);
          li.css(css.li);
        }

        css = getDimensions();

        if (o.autoCSS) {
          $.extend(true, css, prelimCss);
          // firstCss = false;
        }

        if (o.autoWidth) {
          tmpDivSize = parseInt(div.css(sizeProp), 10);
          styles.liSize = tmpDivSize / o.visible;
          css.li[sizeProp] = styles.liSize - (li[outerMethod](true) - parseInt(li.css(sizeProp), 10));

          // Need to adjust other settings to fit with li width
          css.ul[sizeProp] = (styles.liSize * itemLength) + 'px';
          css.ul[animCss] = -(curr * styles.liSize) + 'px';
          css.div[sizeProp] = tmpDivSize;
        }

        if (o.autoCSS) {
          li.css(css.li);
          ul.css(css.ul);
          div.css(css.div);
        }
      };

      setDimensions();

      // set up timed advancer
      var advanceCounter = 0,
          autoStop = iterations(tl, o),
          autoScrollBy = typeof o.auto === 'number' ? o.auto : o.scroll;

      var advancer = function() {
        self.setAutoAdvance = setTimeout(function() {

          if (!autoStop || autoStop > advanceCounter) {
            direction = div.data('dirjc');
            go( curr + (direction * autoScrollBy), {auto: true} );
            advanceCounter++;
            advancer();
          }
        }, o.timeout);
      };

      // bind click handlers to prev and next buttons, if set
      $.each([ 'btnPrev', 'btnNext' ], function(index, btn) {
        if ( o[btn] ) {
          o['$' + btn] = $.isFunction( o[btn] ) ? o[btn].call( div[0] ) : $( o[btn] );
          o['$' + btn].bind('click.jc', function(event) {
            event.preventDefault();
            var step = index === 0 ? curr - o.scroll : curr + o.scroll;
            if (o.directional) {
              // set direction of subsequent scrolls to:
              //  1 if "btnNext" clicked
              // -1 if "btnPrev" clicked
              div.data( 'dirjc', (index ? 1 : -1) );
            }
            return go( step );
          });
        }
      });

      if (!o.circular) {
        if (o.btnPrev && start === 0) {
          o.$btnPrev.addClass(o.btnDisabledClass);
        }

        if ( o.btnNext && start + visibleFloor >= itemLength ) {
          o.$btnNext.addClass(o.btnDisabledClass);
        }
      }

      if (o.autoPager) {
        pageNavCount = ceil(tl / visibleNum);
        pageNav = [];
        for (var i=0; i < pageNavCount; i++) {
          pageNav.push('<li><a href="#">' + (i+1) + '</a></li>');
        }
        if (pageNav.length > 1) {
          pageNav = $('<ul>' + pageNav.join('') + '</ul>').appendTo(o.autoPager).find('li');
          pageNav.find('a').each(function(i) {
            $(this).bind('click.jc', function(event) {
              event.preventDefault();
              var slide = i * visibleNum;
              if (o.circular) {
                slide += visibleNum;
              }
              return go(slide);
            });
          });
          activeBtnTypes.pager = 1;
        }
      }

      // set the active class on the btn corresponding to the "start" li
      setActive(start, activeBtnTypes);

      if (o.mouseWheel && div.mousewheel) {
        div.bind('mousewheel.jc', function(e, d) {
          return d > 0 ? go(curr - o.scroll) : go(curr + o.scroll);
        });
      }

      if (o.pause && o.auto && !isTouch) {
        div.bind('mouseenter.jc', function() {
          div.trigger('pauseCarousel.jc');
        }).bind('mouseleave.jc', function() {
          div.trigger('resumeCarousel.jc');
        });
      }

      if (o.auto) {
        advancer();
      }

      function vis() {
        return li.slice(curr).slice(0, visibleCeil);
      }

      $.jCarouselLite.vis = vis;

      function go(to, settings) {
        if (running) { return false; }
        settings = settings || {};
        var prev = curr,
            direction = to > curr,
            speed = typeof settings.speed !== 'undefined' ? settings.speed : o.speed,
            // offset appears if touch moves slides
            offset = settings.offset || 0;

        if (o.beforeStart) {
          o.beforeStart.call(div, vis(), direction, settings);
        }

        // If circular and we are in first or last, then go to the other end
        if (o.circular) {
          if (to > curr && to > itemLength - visibleCeil) {

            // temporarily set "to" as the difference
            to = to - curr;
            curr = curr % tl;

            // use the difference to make "to" correct relative to curr
            to = curr + to;
            ul.css(animCss, (-curr * styles.liSize) - offset);
          } else if ( to < curr && to < 0) {
            curr += tl;
            to += tl;
            ul.css(animCss, (-curr * styles.liSize) - offset);
          }

          curr = to + (to % 1);

        // If non-circular and "to" points beyond first or last, we change to first or last.
        } else {
          if (to < 0) {
            to = 0;
          } else if  (to > itemLength - visibleFloor) {
            to = itemLength - visibleFloor;
          }

          curr = to;

          if (curr === 0 && o.first) {
            o.first.call(this, vis(), direction);
          }

          if (curr === itemLength - visibleFloor && o.last) {
            o.last.call(this, vis(), direction);
          }

          // Disable buttons when the carousel reaches the last/first, and enable when not
          if (o.btnPrev) {
            o.$btnPrev.toggleClass(o.btnDisabledClass, curr === 0);
          }
          if (o.btnNext) {
            o.$btnNext.toggleClass(o.btnDisabledClass, curr === itemLength - visibleFloor);
          }
        }

        // if btnGo, set the active class on the btnGo element corresponding to the first visible carousel li
        // if autoPager, set active class on the appropriate autopager element
        setActive(curr, activeBtnTypes);

        $.jCarouselLite.curr = curr;

        if (prev === curr && !settings.force) {
          if (o.afterEnd) {
            o.afterEnd.call(div, vis(), direction, settings);
          }
          return curr;
        }

        running = true;

        aniProps[animCss] = -(curr * styles.liSize);
        ul.anim(aniProps, speed, o.easing, function() {
          if (o.afterEnd) {
            o.afterEnd.call(div, vis(), direction, settings);
          }
          running = false;
        });

        return curr;
      } // end go function

      // bind custom events so they can be triggered by user
      div
      .bind('go.jc', function(e, to, settings) {

        if (typeof to === 'undefined') {
          to = '+=1';
        }

        var todir = typeof to === 'string' && /(\+=|-=)(\d+)/.exec(to);

        if ( todir ) {
          to = todir[1] === '-=' ? curr - todir[2] * 1 : curr + todir[2] * 1;
        } else {
          to += start;
        }
        go(to, settings);
      })
      .bind('startCarousel.jc', function() {
        clearTimeout(self.setAutoAdvance);
        self.setAutoAdvance = undefined;
        div.trigger('go', '+=' + o.scroll);
        advancer();
        div.removeData('pausedjc').removeData('stoppedjc');
      })
      .bind('resumeCarousel.jc', function(event, forceRun) {
        if (self.setAutoAdvance) { return; }
        clearTimeout(self.setAutoAdvance);
        self.setAutoAdvance = undefined;

        var stopped = div.data('stoppedjc');
        if ( forceRun || !stopped ) {
          advancer();
          div.removeData('pausedjc');
          if (stopped) {
            div.removeData('stoppedjc');
          }
        }
      })

      .bind('pauseCarousel.jc', function() {
        clearTimeout(self.setAutoAdvance);
        self.setAutoAdvance = undefined;
        div.data('pausedjc', true);
      })
      .bind('stopCarousel.jc', function() {
        clearTimeout(self.setAutoAdvance);
        self.setAutoAdvance = undefined;

        div.data('stoppedjc', true);
      })

      .bind('refreshCarousel.jc', function(event, all) {
        if (all && o.circular) {
          makeCircular();
        }
        setDimensions(o.autoCSS);
      })

      .bind('endCarousel.jc', function() {
        if (self.setAutoAdvance) {
          clearTimeout(self.setAutoAdvance);
          self.setAutoAdvance = undefined;
        }
        if (o.btnPrev) {
          o.$btnPrev.addClass(o.btnDisabledClass).unbind('.jc');
        }
        if (o.btnNext) {
          o.$btnNext.addClass(o.btnDisabledClass).unbind('.jc');
        }
        if (o.btnGo) {
          $.each(o.btnGo, function(i, val) {
            $(val).unbind('.jc');
          });
        }

        if (o.circular) {
          li.slice(0, visibleCeil).remove();
          li.slice(-visibleCeil).remove();
        }
        $.each([animCss + 'jc', 'pausedjc', 'stoppedjc', 'dirjc'], function(i, d) {
          div.removeData(d);
        });
        div.unbind('.jc');
      });

      // touch gesture support

      touchEvents = {
        touchstart: function(event) {
          endTouch.x = 0;
          endTouch.y = 0;
          startTouch.x = event.targetTouches[0].pageX;
          startTouch.y = event.targetTouches[0].pageY;
          startTouch[animCss] = parseFloat( ul.css(animCss) );
          startTouch.time = +new Date();
        },

        touchmove: function(event) {
          var tlength = event.targetTouches.length;

          if (tlength === 1) {
            endTouch.x = event.targetTouches[0].pageX;
            endTouch.y = event.targetTouches[0].pageY;
            aniProps[animCss] = startTouch[animCss] + (endTouch[axisPrimary] - startTouch[axisPrimary]);
            ul.css(aniProps);
            if (o.preventTouchWindowScroll) {
              event.preventDefault();
            }
          } else {
            endTouch.x = startTouch.x;
            endTouch.y = startTouch.y;
          }
        },

        touchend: function() {
          // bail out early if there is no touch movement
          if (!endTouch.x) {
            return;
          }

          var pxDelta = startTouch[axisPrimary] - endTouch[axisPrimary],
              pxAbsDelta = mabs( pxDelta ),
              primaryAxisGood = pxAbsDelta > o.swipeThresholds[axisPrimary],
              secondaryAxisGood =  mabs(startTouch[axisSecondary] - endTouch[axisSecondary]) < o.swipeThresholds[axisSecondary],
              timeDelta = +new Date() - startTouch.time,
              quickSwipe = timeDelta < o.swipeThresholds.time,
              operator = pxDelta > 0 ? '+=' : '-=',
              to = operator + o.scroll,
              swipeInfo  = { force: true };

          // quick, clean swipe
          if ( quickSwipe && primaryAxisGood && secondaryAxisGood ) {
            // set animation speed to twice as fast as that set in speed option
            swipeInfo.speed = o.speed / 2;
          }
          else
          // slow swipe < 1/2 slide width, OR
          // not enough movement for swipe, OR
          // too much movement on secondary axis when quick swipe
          if ( (!quickSwipe && pxAbsDelta < styles.liSize / 2) ||
            !primaryAxisGood ||
            (quickSwipe && !secondaryAxisGood)
            ) {
            // revert to same slide
            to = '+=0';
          }
          else
          // slow swipe > 1/2 slide width
          if ( !quickSwipe && pxAbsDelta > styles.liSize / 2 ) {
            to = Math.round(pxAbsDelta / styles.liSize);
            to = operator + (to > o.visible ? o.visible : to);

            // send pxDelta along as offset in case carousel is circular and needs to reset
            swipeInfo.offset = pxDelta;
          }

          div.trigger('go.jc', [to, swipeInfo]);
          endTouch = {};
        },

        handle: function(event) {
          event = event.originalEvent;
          touchEvents[event.type](event);
        }
      };

      if ( isTouch && o.swipe ) {
        div.bind('touchstart.jc touchmove.jc touchend.jc', touchEvents.handle);
      } // end swipe events

      // Responsive design handling:
      // Reset dimensions on window.resize
      if (o.responsive) {
        prepResize = o.autoCSS;
        $(window).bind('resize', function() {
          if (prepResize) {
            ul.width( ul.width() * 2 );
            prepResize = false;
          }

          clearTimeout(resize);
          resize = setTimeout(function() {
            div.trigger('refreshCarousel.jc', [true]);
            prepResize = o.autoCSS;
          }, 100);
        });
      }

    }); // end each

    return this;
  };

  $.fn.jCarouselLite.defaults = {

    // valid selector for the "ul" container containing the slides
    containerSelector: 'ul',

    // valid selector for the slide "li" items
    itemSelector: 'li',

    btnPrev: null,
    btnNext: null,

    // array (or jQuery object) of elements. When clicked, makes the corresponding carousel LI the first visible one
    btnGo: null,

    // selector (or jQuery object) indicating the containing element for pagination navigation.
    autoPager: null,
    btnDisabledClass: 'disabled',

    // class applied to the active slide and btnGo element
    activeClass: 'active',

    // class applied to the btnGo elements corresponding to the visible slides
    visibleClass: 'vis',
    mouseWheel: false,
    speed: 200,
    easing: null,

    // milliseconds between scrolls
    timeout: 4000,

    // true to enable auto scrolling; number to auto-scroll by different number at a time than that of scroll option
    auto: false,


    // true to enable changing direction of auto scrolling when user clicks prev or next button
    directional: false,

    // number of times before autoscrolling will stop. (if circular is false, won't iterate more than number of items)
    autoStop: false,

    // pause scrolling on hover
    pause: true,
    vertical: false,

    // continue scrolling when reach the last item
    circular: true,

    // the number to be visible at a given time.
    visible: 3,

    // index of item to show initially in the first posiition
    start: 0,

    // number of items to scroll at a time
    scroll: 1,

    // whether to set initial styles on the carousel elements. See readme for info
    autoCSS: true,

    // whether the dimensions should change on resize
    responsive: false,

    // whether to set width of <li>s (and left/top of <ul>) based on width of <div>
    autoWidth: false,

    // touch options
    swipe: true,
    swipeThresholds: {
      x: 80,
      y: 40,
      time: 150
    },

    // whether to prevent vertical scrolling of the document window when swiping
    preventTouchWindowScroll: true,

    // Function to be called for each matched carousel when .jCaourselLite() is called.
    // Inside the function, `this` is the carousel div.
    // The function can take 2 arguments:
        // 1. The merged options object
        // 2. A jQuery object containing the <li> items in the carousel
    // If the function returns `false`, the plugin will skip all the carousel magic for that carousel div
    init: function() {},

    // function to be called once the first slide is hit
    first: null,

    // function to be called once the last slide is hit
    last: null,

    // function to be called before each transition starts
    beforeStart: null,

    // function to be called after each transition ends
    afterEnd: null
  };

  function iterations(itemLength, options) {
    return options.autoStop && (options.circular ? options.autoStop : Math.min(itemLength, options.autoStop));
  }

  function fixIds(i) {
    if ( this.id ) {
      this.id += i;
    }
  }
})(jQuery);
;
/**
 * Highwire Article Nav
 *
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */

(function ($) {
  Drupal.behaviors.highwire_article_nav = {
    attach: function (context, settings) {
      $('.highwire-article-nav', context).once('highwire-article-nav', function() {
        $wrapper = $(this);

        $('a', $wrapper).click(function() {
          $link = $(this);
          var panelTarget = $link.data('panel-ajax-tab');
          var href = $link.attr('href');

          if (panelTarget) {
            var $tabLink = $('a.panels-ajax-tab-tab[data-panel-name="' + panelTarget + '"]');
            var $tabTargetId = $tabLink.attr('data-target-id');
            // Get Tab container ID to jump no the top of Tab container.
            var $tabContainer = $('#panels-ajax-tab-container-' + $tabTargetId);

            // If we are on the current tab and we are clicking a anchor, just let it happen
            // If we on the current tab and it is not an anchor, then ignore it.
            if ($tabLink.parent().hasClass('active')) {
              if (href.substring(0, 1) === '#') {
                return true;
              }
              else {
                // Jump to the tab, but don't do anything else
                $('html, body').animate({
                  scrollTop: $tabContainer.offset().top + 'px'
                }, 'fast');
                return false;
              }
            }
            // We need to trigger a tab change
            else {
              // If it's a link to the tab itself (and not a sub-component) then just trigger a click on the tab and jump to the tab
              if (href.substring(0, 1) != '#') {
                $tabLink.trigger('click');

                // Jump to the tab
                $('html, body').animate({
                  scrollTop: $tabContainer.offset().top + 'px'
                }, 'fast');
              }
              // We need to trigger the panel-ajax-tab THEN we need to jump to the anchored content
              else {
                $tabLink.panels_ajax_tabs_trigger(function() {
                  $('html, body').animate({
                    scrollTop: $(href).offset().top + 'px'
                  }, 'fast');
                });
              }
              return false;
            }
          }
        });
      });
    }
  };
})(jQuery);
;
(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.highwire_shareitajax = { attach: function (context, settings) {
    
    var getWidth = function() {
      var winWidth = $(window).width();
      if(winWidth >= Drupal.settings.highwire.share_modal_width) {
        return Drupal.settings.highwire.share_modal_width;
      } else {
        return "90%";
      }
    }

    var modalTitle = Drupal.settings.highwire.share_modal_title; 
    var success = false;
    var id ='';
    var encodedUrl = '';
    $('.highwire_clipboard_link_ajax', context, settings).click(function(){
      id = $(this).attr('id');
      $(this).parent().find('.highwire_clipboard_form_ajax_'+id).dialog({"modal":true, "draggable":false, "width":getWidth(), "title":modalTitle, "resizable":false});
      $('.highwire_clipboard_form_ajax_'+id).dialog('open');
      $("a#copy-dynamic").zclip({
        path: '/' + Drupal.settings.highwire.moviepath,
        copy: function() { return $("input#dynamic").val(); }
      });
      return false;
    });
  }};
}(jQuery));
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.minipanel_dialog_link = { attach: function (context, settings) {

    var getWidth = function() {
      var winWidth = $(window).width();
      if(winWidth >= Drupal.settings.highwire.modal_window_width) {
        return Drupal.settings.highwire.modal_window_width;
      } else {
        return "90%";
      }
    }
    
    $('.minipanel-dialog-link-trigger', context, settings).once('minipanel-dialog-link-trigger', function() {
      if($(this).attr('title') != '<blank>'){
        var title = $(this).attr('title');
      }
      else {
        var title = '';
      }
      var $mini = $(this).parent().parent().find('.minipanel-dialog-link-mini');
      $mini.dialog({"modal":true, "draggable":false, "title": title, "resizable":false, "autoOpen": false});
      $(this).click(function() {
        $mini.dialog({"width":getWidth()});
        $mini.dialog("open");
        return false;
      });
    });
  }};
}(jQuery));
;
(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.highwire_citation_export = { attach: function (context, settings) {
    var success = false;

    $('.highwire-citation-export-link-ajax', context).click(function(){
      $('.highwire-citation-export-link-ajax-popup').dialog({modal:true, draggable:false, maxWidth:700});
      return false;
    });

  }};
}(jQuery));
;
/*
 * zClip :: jQuery ZeroClipboard v1.1.1
 * http://steamdev.com/zclip
 *
 * Copyright 2011, SteamDev
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Wed Jun 01, 2011
 */


(function ($) {

    $.fn.zclip = function (params) {

        if (typeof params == "object" && !params.length) {

            var settings = $.extend({

                path: 'ZeroClipboard.swf',
                copy: null,
                beforeCopy: null,
                afterCopy: null,
                clickAfter: true,
                setHandCursor: true,
                setCSSEffects: true

            }, params);
			

            return this.each(function () {

                var o = $(this);

                if (o.is(':visible') && (typeof settings.copy == 'string' || $.isFunction(settings.copy))) {

                    ZeroClipboard.setMoviePath(settings.path);
                    var clip = new ZeroClipboard.Client();
                    
                    if($.isFunction(settings.copy)){
                    	o.bind('zClip_copy',settings.copy);
                    }
                    if($.isFunction(settings.beforeCopy)){
                    	o.bind('zClip_beforeCopy',settings.beforeCopy);
                    }
                    if($.isFunction(settings.afterCopy)){
                    	o.bind('zClip_afterCopy',settings.afterCopy);
                    }                    

                    clip.setHandCursor(settings.setHandCursor);
                    clip.setCSSEffects(settings.setCSSEffects);
                    clip.addEventListener('mouseOver', function (client) {
                        o.trigger('mouseenter');
                    });
                    clip.addEventListener('mouseOut', function (client) {
                        o.trigger('mouseleave');
                    });
                    clip.addEventListener('mouseDown', function (client) {

                        o.trigger('mousedown');
                        
			if(!$.isFunction(settings.copy)){
			   clip.setText(settings.copy);
			} else {
			   clip.setText(o.triggerHandler('zClip_copy'));
			}                        
                        
                        if ($.isFunction(settings.beforeCopy)) {
                            o.trigger('zClip_beforeCopy');                            
                        }

                    });

                    clip.addEventListener('complete', function (client, text) {

                        if ($.isFunction(settings.afterCopy)) {
                            
                            o.trigger('zClip_afterCopy');

                        } else {
                            if (text.length > 500) {
                                text = text.substr(0, 500) + "...\n\n(" + (text.length - 500) + " characters not shown)";
                            }
							
			    o.removeClass('hover');
                            
                        }

                        if (settings.clickAfter) {
                            o.trigger('click');
                        }

                    });

					
                    clip.glue(o[0], o.parent()[0]);
					
		    $(window).bind('load resize',function(){clip.reposition();});
					

                }

            });

        } else if (typeof params == "string") {

            return this.each(function () {

                var o = $(this);

                params = params.toLowerCase();
                var zclipId = o.data('zclipId');
                var clipElm = $('#' + zclipId + '.zclip');

                if (params == "remove") {

                    clipElm.remove();
                    o.removeClass('active hover');

                } else if (params == "hide") {

                    clipElm.hide();
                    o.removeClass('active hover');

                } else if (params == "show") {

                    clipElm.show();

                }

            });

        }

    }



})(jQuery);







// ZeroClipboard
// Simple Set Clipboard System
// Author: Joseph Huckaby
var ZeroClipboard = {

    version: "1.0.7",
    clients: {},
    // registered upload clients on page, indexed by id
    moviePath: 'ZeroClipboard.swf',
    // URL to movie
    nextId: 1,
    // ID of next movie
    $: function (thingy) {
        // simple DOM lookup utility function
        if (typeof(thingy) == 'string') thingy = document.getElementById(thingy);
        if (!thingy.addClass) {
            // extend element with a few useful methods
            thingy.hide = function () {
                this.style.display = 'none';
            };
            thingy.show = function () {
                this.style.display = '';
            };
            thingy.addClass = function (name) {
                this.removeClass(name);
                this.className += ' ' + name;
            };
            thingy.removeClass = function (name) {
                var classes = this.className.split(/\s+/);
                var idx = -1;
                for (var k = 0; k < classes.length; k++) {
                    if (classes[k] == name) {
                        idx = k;
                        k = classes.length;
                    }
                }
                if (idx > -1) {
                    classes.splice(idx, 1);
                    this.className = classes.join(' ');
                }
                return this;
            };
            thingy.hasClass = function (name) {
                return !!this.className.match(new RegExp("\\s*" + name + "\\s*"));
            };
        }
        return thingy;
    },

    setMoviePath: function (path) {
        // set path to ZeroClipboard.swf
        this.moviePath = path;
    },

    dispatch: function (id, eventName, args) {
        // receive event from flash movie, send to client		
        var client = this.clients[id];
        if (client) {
            client.receiveEvent(eventName, args);
        }
    },

    register: function (id, client) {
        // register new client to receive events
        this.clients[id] = client;
    },

    getDOMObjectPosition: function (obj, stopObj) {
        // get absolute coordinates for dom element
        var info = {
            left: 0,
            top: 0,
            width: obj.width ? obj.width : obj.offsetWidth,
            height: obj.height ? obj.height : obj.offsetHeight
        };

        if (obj && (obj != stopObj)) {
			info.left += obj.offsetLeft;
            info.top += obj.offsetTop;
        }

        return info;
    },

    Client: function (elem) {
        // constructor for new simple upload client
        this.handlers = {};

        // unique ID
        this.id = ZeroClipboard.nextId++;
        this.movieId = 'ZeroClipboardMovie_' + this.id;

        // register client with singleton to receive flash events
        ZeroClipboard.register(this.id, this);

        // create movie
        if (elem) this.glue(elem);
    }
};

ZeroClipboard.Client.prototype = {

    id: 0,
    // unique ID for us
    ready: false,
    // whether movie is ready to receive events or not
    movie: null,
    // reference to movie object
    clipText: '',
    // text to copy to clipboard
    handCursorEnabled: true,
    // whether to show hand cursor, or default pointer cursor
    cssEffects: true,
    // enable CSS mouse effects on dom container
    handlers: null,
    // user event handlers
    glue: function (elem, appendElem, stylesToAdd) {
        // glue to DOM element
        // elem can be ID or actual DOM element object
        this.domElement = ZeroClipboard.$(elem);

        // float just above object, or zIndex 99 if dom element isn't set
        var zIndex = 99;
        if (this.domElement.style.zIndex) {
            zIndex = parseInt(this.domElement.style.zIndex, 10) + 1;
        }

        if (typeof(appendElem) == 'string') {
            appendElem = ZeroClipboard.$(appendElem);
        } else if (typeof(appendElem) == 'undefined') {
            appendElem = document.getElementsByTagName('body')[0];
        }

        // find X/Y position of domElement
        var box = ZeroClipboard.getDOMObjectPosition(this.domElement, appendElem);

        // create floating DIV above element
        this.div = document.createElement('div');
        this.div.className = "zclip";
        this.div.id = "zclip-" + this.movieId;
        jQuery(this.domElement).data('zclipId', 'zclip-' + this.movieId);
        var style = this.div.style;
        style.position = 'absolute';
        style.left = '' + box.left + 'px';
        style.top = '' + box.top + 'px';
        style.width = '' + box.width + 'px';
        style.height = '' + box.height + 'px';
        style.zIndex = zIndex;

        if (typeof(stylesToAdd) == 'object') {
            for (addedStyle in stylesToAdd) {
                style[addedStyle] = stylesToAdd[addedStyle];
            }
        }

        // style.backgroundColor = '#f00'; // debug
        appendElem.appendChild(this.div);

        this.div.innerHTML = this.getHTML(box.width, box.height);
    },

    getHTML: function (width, height) {
        // return HTML for movie
        var html = '';
        var flashvars = 'id=' + this.id + '&width=' + width + '&height=' + height;

        if (navigator.userAgent.match(/MSIE/)) {
            // IE gets an OBJECT tag
            var protocol = location.href.match(/^https/i) ? 'https://' : 'http://';
            html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + protocol + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><param name="wmode" value="transparent"/></object>';
        } else {
            // all other browsers get an EMBED tag
            html += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + width + '" height="' + height + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '" wmode="transparent" />';
        }
        return html;
    },

    hide: function () {
        // temporarily hide floater offscreen
        if (this.div) {
            this.div.style.left = '-2000px';
        }
    },

    show: function () {
        // show ourselves after a call to hide()
        this.reposition();
    },

    destroy: function () {
        // destroy control and floater
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = '';

            var body = document.getElementsByTagName('body')[0];
            try {
                body.removeChild(this.div);
            } catch (e) {;
            }

            this.domElement = null;
            this.div = null;
        }
    },

    reposition: function (elem) {
        // reposition our floating div, optionally to new container
        // warning: container CANNOT change size, only position
        if (elem) {
            this.domElement = ZeroClipboard.$(elem);
            if (!this.domElement) this.hide();
        }

        if (this.domElement && this.div) {
            var box = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var style = this.div.style;
            style.left = '' + box.left + 'px';
            style.top = '' + box.top + 'px';
        }
    },

    setText: function (newText) {
        // set text to be copied to clipboard
        this.clipText = newText;
        if (this.ready) {
            this.movie.setText(newText);
        }
    },

    addEventListener: function (eventName, func) {
        // add user event listener for event
        // event types: load, queueStart, fileStart, fileComplete, queueComplete, progress, error, cancel
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(func);
    },

    setHandCursor: function (enabled) {
        // enable hand cursor (true), or default arrow cursor (false)
        this.handCursorEnabled = enabled;
        if (this.ready) {
            this.movie.setHandCursor(enabled);
        }
    },

    setCSSEffects: function (enabled) {
        // enable or disable CSS effects on DOM container
        this.cssEffects = !! enabled;
    },

    receiveEvent: function (eventName, args) {
        // receive event from flash
        eventName = eventName.toString().toLowerCase().replace(/^on/, '');

        // special behavior for certain events
        switch (eventName) {
        case 'load':
            // movie claims it is ready, but in IE this isn't always the case...
            // bug fix: Cannot extend EMBED DOM elements in Firefox, must use traditional function
            this.movie = document.getElementById(this.movieId);
            if (!this.movie) {
                var self = this;
                setTimeout(function () {
                    self.receiveEvent('load', null);
                }, 1);
                return;
            }

            // firefox on pc needs a "kick" in order to set these in certain cases
            if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                var self = this;
                setTimeout(function () {
                    self.receiveEvent('load', null);
                }, 100);
                this.ready = true;
                return;
            }

            this.ready = true;
            try {
                this.movie.setText(this.clipText);
            } catch (e) {}
            try {
                this.movie.setHandCursor(this.handCursorEnabled);
            } catch (e) {}
            break;

        case 'mouseover':
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass('hover');
                if (this.recoverActive) {
                    this.domElement.addClass('active');
                }


            }


            break;

        case 'mouseout':
            if (this.domElement && this.cssEffects) {
                this.recoverActive = false;
                if (this.domElement.hasClass('active')) {
                    this.domElement.removeClass('active');
                    this.recoverActive = true;
                }
                this.domElement.removeClass('hover');

            }
            break;

        case 'mousedown':
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass('active');
            }
            break;

        case 'mouseup':
            if (this.domElement && this.cssEffects) {
                this.domElement.removeClass('active');
                this.recoverActive = false;
            }
            break;
        } // switch eventName
        if (this.handlers[eventName]) {
            for (var idx = 0, len = this.handlers[eventName].length; idx < len; idx++) {
                var func = this.handlers[eventName][idx];

                if (typeof(func) == 'function') {
                    // actual function reference
                    func(this, args);
                } else if ((typeof(func) == 'object') && (func.length == 2)) {
                    // PHP style object + method, i.e. [myObject, 'myMethod']
                    func[0][func[1]](this, args);
                } else if (typeof(func) == 'string') {
                    // name of function
                    window[func](this, args);
                }
            } // foreach event handler defined
        } // user defined handler for event
    }

};	

;
