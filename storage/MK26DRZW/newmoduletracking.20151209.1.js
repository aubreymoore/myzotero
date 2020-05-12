//Core 
function TrackModule(element, category, action, label, isExternal) {
  if (element == undefined) {
    if (console.log != undefined) console.log("!!Element is undefined!!");
    return;
  }
  var elementType = $j(element).prop('tagName');
  if (elementType == undefined) {
    if (console.log != undefined) console.log("!!Element Type is undefined!!");
    return;
  }
  label += ((isExternal == 1) ? ' - External' : '');
  if (window._gaq) {
    _gaq.push(['_setAccount', 'UA-671605-73']);
    _gaq.push(['_trackEvent', category, action, label]);
  }
  if (window.ga) ga('send', 'event', category, action, label);
  if (console.log != undefined) console.log("e:" + elementType + " c:" + category + " a:" + action + " l:" + label);
}

function FullModuleName(o) {
  var m = '', parents = $j(o).parents("[data-module]");
  $j(parents).each(function () {
    if ($j(this).data("module") != undefined)
      if ($j(this).data("module") != '')
        m = $j(this).data("module") + " " + m;
    if ($j(this).data("isroot") != undefined) return false;
  });
  var thismodule = $j(o).data("module") != undefined ? $j(o).data("module") : "";
  //m = m.trim() + " " + thismodule; trim() does not work in older IE versions
  m = $j.trim(m) + " " + thismodule;
  return $j.trim(m);
}

//Visibility Tracking
function trackvis(obj) {
  var mn = FullModuleName(obj);
  window.tracked.push(mn);
  var d = new Date();
  var ct = d.getTime();
  var diff = (ct - window.lt) - window.viewmin;
  var label = diff.toString() + "ms";
  var ele = $j("<AD></AD>");
  TrackModule(ele, mn, "In View", label, 0);
}

function isTracked(key) {
  return (window.tracked.indexOf(key) != -1);
}

function upsert(arr, obj) {
  if (inArr(arr, obj)) return arr;
  arr.push(obj);
  return arr;
}

function inArr(arr, key) {
  var found = $j.grep(arr, function (o) { return o.key == key; });
  return (found.length > 0);
}

function remove(arr, key) {
  var found = $j.grep(arr, function (o) { return o.key == key; });
  if (found.length > 0) {
    $j.each(found, function (i, o) {
      window.clearTimeout(o.timer);
    });
    arr = $j.grep(arr, function (o) { return o.key != key; });
  }
  return arr;
}

function checkVis() {
  $j('[data-vpvis]').each(function () {
    var key = FullModuleName(this);
    if (isTracked(key)) return;
    if ($j(this).isOnScreen(1, 0.5)) {
      if (!inArr(window.inview, key)) {
        var obj = { key: key, timer: window.setTimeout((function (args) { return function () { trackvis(args); }; }(this)), window.viewmin) };
        window.inview = upsert(window.inview, obj);
      }
    } else {
      window.inview = remove(window.inview, key);
    }
  });
}

function doesStringContainEmail(str) {
  var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  return re.test(str);
}

//Init
$j(document).ready(function () {
  //visibility tracking globals
  /* Disable Visibility Tracking PER Linda B. 2015-07-09
  window.inview = [];
  window.tracked = [];
  window.viewmin = 1000;
  */

  //Set page ready time
  var dt = new Date();
  window.lt = dt.getTime();

  //Check Visibility once
  /* Disable Visibility Tracking PER Linda B. 2015-07-09
  checkVis();
  */

  //Bind Anchor Tags
  $j("a").not("[data-notrack]").each(function (e) {
    var module = FullModuleName(this); 
    $j(this).click(function (e) {
      if ($j(this).is("[href]")) { 
        if($j(this).attr('href') != '') {
          var href = $j(this).attr("href");
          var label = $j(this).data("name");
          if (label == undefined || label == '') label = href;
          var target = $j(this).attr("target");
          target = ((target == undefined) ? '_self' : target);
          var host = window.location.host;
          var isExternal = ((href.indexOf('http://') > -1 || href.indexOf('https://') > -1) && href.indexOf(host) == -1);
          //var txt = $j(this).text().trim();
          var txt = $j.trim($j(this).text());
          if (href) {
            if (href.indexOf("#") == 0) return true;
            if (target == '_self' && href.indexOf("javascript:") == -1 && href.indexOf("#") == -1) {
              e.preventDefault();
              setTimeout('window.location=\'' + href + '\'', 100);
            }
            TrackModule(this, module, 'Link Clicked', label, (isExternal ? 1 : 0));
          }
        }
      }
    });
  });

  //Bind Input Tags
  $j(":input").not("[data-notrack]").each(function (e) {
    var type = $j(this).prop("type");
    if (type == undefined) return true;
    var module = FullModuleName(this);
    var action;

    switch (type.toLowerCase()) {
      case 'text':
        $j(this).change(function (e) {
          var label = $j(this).val();
          //we do not want to track email addresses in GA.
          var isEmail = doesStringContainEmail(label);
          if (isEmail) {
            TrackModule(this, module, 'Text Entered', "Email Address Entered", 0);
          } else {
            TrackModule(this, module, 'Text Entered', label, 0);
          }
        });
        break;
      case 'select-one':
      case 'select-multiple':
        $j(this).change(function (e) {
          var label = $j(this).val();
          TrackModule(this, module, 'Selection Changed', label, 0);
        });
        break;
      case 'button':
        var label = $j(this).data("name");
        if (label == undefined || label == '') label = $j(this).val();
        if (label == undefined || label == '') label = $j(this).text();
        $j(this).click(function (e) {
          TrackModule(this, module, 'Button Clicked', label, 0);
        });
        break;
      case 'submit':
        var label = $j(this).data("name");
        if (label == undefined || label == '') label = $j(this).val();
        $j(this).click(function (e) {
          TrackModule(this, module, 'Button Clicked', label, 0);
        });
        break;
      default:
        return true;
        break;
    }
  });

  //Bind Scroll for Visibility tracking
  /* Disable Visibility Tracking PER Linda B. 2015-07-09
  $j(window).scroll(function () { checkVis(); });
  */
});
