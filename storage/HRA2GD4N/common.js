//FB search SDK
window.fbAsyncInit = function() {
    FB.init({
      appId      : '399622003703098',
      xfbml      : true,
      version    : 'v2.8' 
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

//Twitter
 !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');


/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.1 - 2013-10-17
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2013 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function($){if(!$.support.cors&&$.ajaxTransport&&window.XDomainRequest){var n=/^https?:\/\//i;var o=/^get|post$/i;var p=new RegExp('^'+location.protocol,'i');var q=/text\/html/i;var r=/\/json/i;var s=/\/xml/i;$.ajaxTransport('* text html xml json',function(i,j,k){if(i.crossDomain&&i.async&&o.test(i.type)&&n.test(i.url)&&p.test(i.url)){var l=null;var m=(j.dataType||'').toLowerCase();return{send:function(f,g){l=new XDomainRequest();if(/^\d+$/.test(j.timeout)){l.timeout=j.timeout}l.ontimeout=function(){g(500,'timeout')};l.onload=function(){var a='Content-Length: '+l.responseText.length+'\r\nContent-Type: '+l.contentType;var b={code:200,message:'success'};var c={text:l.responseText};try{if(m==='html'||q.test(l.contentType)){c.html=l.responseText}else if(m==='json'||(m!=='text'&&r.test(l.contentType))){try{c.json=$.parseJSON(l.responseText)}catch(e){b.code=500;b.message='parseerror'}}else if(m==='xml'||(m!=='text'&&s.test(l.contentType))){var d=new ActiveXObject('Microsoft.XMLDOM');d.async=false;try{d.loadXML(l.responseText)}catch(e){d=undefined}if(!d||!d.documentElement||d.getElementsByTagName('parsererror').length){b.code=500;b.message='parseerror';throw'Invalid XML: '+l.responseText;}c.xml=d}}catch(parseMessage){throw parseMessage;}finally{g(b.code,b.message,c,a)}};l.onprogress=function(){};l.onerror=function(){g(500,'error',{text:l.responseText})};var h='';if(j.data){h=($.type(j.data)==='string')?j.data:$.param(j.data)}l.open(i.type,i.url);l.send(h)},abort:function(){if(l){l.abort()}}}}})}})(jQuery);


var xssf = function (val) {
    val = val.toString();
    val = val.replace(/[<%C]/g, "&lt;");
    val = val.replace(/[>%E]/g, "&gt;");
    val = val.replace(/"/g, "&quot;");
    val = val.replace(/'/g, "&#39;");
    return val;
};

if( location.href.indexOf('%3E%3C') > 0){
    var now = location.host;
    location.assign(now);
//    console.log("error");
}

var $win = $(window);
var _winsize_phone = 600,
    _winsize_pad = 991;


// setting 
var mission_header_now;
var mission_header_name;
var mission_header_link;
var mission_header_para;
// execute 
var enMission_header = function () {
    if (mission_header_src.length > 0) {
        mission_header_now = mission_header_src[0];
        mission_header_name = mission_header_now.name;
        mission_header_link = mission_header_now.link;
        var para = [];
        for (var key in mission_header_now.para) {
            para.push(key + '=' + mission_header_now.para[key])
        }
        mission_header_para = para.join('&'); 
        $.ajax({
            async: true,
            data: {
                name: 'sigmaliao',
                mail: 'sigmaliao@gmail.com'
            },
            dataType: "json",
            type: "POST",
            url: mission_header_link+'?'+mission_header_para,
            beforeSend: function (xhr) {},
            success: function (xdata, xstatus) {     
                if (mission_header_name == 'sy_topimage') {
                    assign_topimage(xdata);
                }
                if (mission_header_name == 'sy_datetime') {
                    assign_datetime(xdata);
                }
                if (mission_header_name == 'sy_language') {
                    assign_language(xdata);
                }
                if (mission_header_name == 'sy_menu') {
                    assign_menu(xdata);
                }
            },
            error: function (xhr, xstatus, xerror) {
                // xerror 可進一步取得系統的完整錯誤訊息                    
            },
            complete: function (xhr, xstatus) {
                mission_header_now.times -= 1;
                if (xstatus == 'success') {
                    mission_header_now.times = 0;
                } else { //xstatus=='error'

                } 
                if (mission_header_now.times > 0) {
                    mission_header_src.push(mission_header_src.shift());
                } else {
                    mission_header_src.shift();
                    if (xstatus == 'error') {
                        alert(mission_header_now.error)
                    }
                }
                enMission_header();
            }
        });
    }
};

var assign_datetime = function(jData){ 
    $(".ui_date").html(jData.date);
}

var assign_topimage = function(jData){ 
    var html = '<img src="'+jData.image.url+'" alt="'+jData.image.description+'">';
    $("header .headerR").attr("attr-overflow", jData.image.overflow );
    $("header .headerR").html(html);    
    setTimeout(function(){
        logoresize();
    },100);
}

var assign_menu = function(jData){ 
    var html = "";    
    for( var i=0 , len = jData.length ; i< len ; i++ ){
        html += '<li><a href="'+ jData[i].link +'">'+ jData[i].title +'</a>';
        var second = jData[i].second;
        if( second.length > 0){
            html += '<div class="second"><ul>'
            for( var j=0 , jlen = second.length ; j< jlen ; j++ ){
                html += '<li><a href="'+ second[j].link +'">'+ second[j].title +'</a></li>';
            }
            html += '</ul></div>'
        }
        html += '</li>'
    }
    $("#menu_main").html(html);
    finishload();
    
    var checkNavLine = false;
    var setNavLine = function(){
//        var $titleName = $(".ui_main .guide li a").eq(1).text().trim();
        var $titleName = $.trim($(".ui_main .guide li a").eq(1).text());
        $("#menu_main li a").each(function(){
            var $this = $(this);
            var $thisname = $this.text();
            if( $titleName == $thisname){
                $this.addClass("act");
                checkNavLine = true;
            }
        });
        setTimeout(function(){
            if( checkNavLine == false){
                setNavLine();
            }
        },500);    
    }
    setNavLine();
}

var assign_language = function(dij){ 
    ajax_language(dij.list); 
}

var ajax_language = function(jData){
    var html = "";
    for( var i=0 , len = jData.length ; i< len ; i++ ){
        html += '<li><a href="'+jData[i].link+'">'+jData[i].title+'</a></li>';
    }
    $(".language ul").html(html);
}

var finishload = function(){
    //上方下拉式選單
    var $topnav = $("nav>ul>#menu_main>li");
    $topnav.hover(function(){
        $(this).find(".second").show();
        console.log("over");
    }, function(){
        $(this).find(".second").hide();
    });
    
    //製作手機版用重複資料
    var copynavr = $("#copynavr").html();
    $("#language_phone").html(copynavr);
    
    var searchmore = $("#searchmore").html();
    $("#search_phone").html(searchmore);
    
    //上方語言開關
    var $language = $("nav .language");
    $language.click(function(){
        $language.find("ul").slideToggle(500, function(){
            if( $(this).is(":visible") === true ){
                $language.find("i").attr("class","glyphicon icon_gray glyphicon-chevron-up");
            }else{
                $language.find("i").attr("class","glyphicon icon_gray glyphicon-chevron-down");
            }
        });
    });
    
}

//RWD - logo 大小動態調整
var logoresizeload = false;
var logoresize = function () {
    var $header = $("header"),
        $header_line = $("header .line");
    var $HL = $("header .headerL"),
        $HR = $("header .headerR");
    var _overflow = 100 / $header.find(".headerR").attr("attr-overflow");
    //var _overflow = $header.find(".headerR").attr("attr-overflow");
    if (_overflow == "" || _overflow == undefined) {
        _overflow = 0
    }
    
     var imgSrc = $("header .headerR>img").attr("src");
        $("header .headerR>img").load(function(){
            logoresizeload = true;
            var HLH = $HL.find("h1").height() +22,
                HRH = $HR.height();
            //$HL.css({padding: Math.floor(HRH-HLH-_overflow)/2 + "px 0"});
            $HL.css({
                padding: (HRH - HLH - (HRH / _overflow)) / 2 + "px 0"
            });
        }).attr("src", imgSrc);
    
}
if( logoresizeload === false ){
    logoresize();
}
$win.resize(function () {
    logoresize();
});

$(function(){
    enMission_header();
    
    //下方 more 開關
    var $footer_more = $(".footer .more"),
        $btn_tt = $("#btn_tt");
    $("#btn_tt").click(function(){
        $footer_more.slideToggle(800, function(){
            if( $footer_more.is(":visible") === true ){
                $btn_tt.find("i").attr("class","glyphicon icon_gray glyphicon-chevron-up");
            }else{
                $btn_tt.find("i").attr("class","glyphicon icon_gray glyphicon-chevron-down");
            }
        });
    }); 
    
    //search 開關 
    $("#searchmore").hover(function(){
        $(this).stop(false,false).animate({left: 0},500);
    },function(){
        $(this).stop(false,false).animate({left: "-150px"},500);
    });
    
    //search 
    
    
    var searchbtn = function(val){
//        window.location = "/english/search.php?key=" + val;
        window.location = "/search.php?key=" + val;
    }
    $("#searchmore, #search_phone").on("click", ".btn.search", function(){
        var input = $(this).parent().find("input");
        searchbtn(xssf(input.val()));
    });
    $("#searchmore input").keypress(function(e){
        var input = $(this);
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13){
            searchbtn(xssf(input.val()));
        }
    });
    
    
    
    
    
    //RWD - 手機 menu 開關
    $("nav").on("click", "#more", function(){
        if( $("nav>ul").is(":visible") === false ){
            $("nav #more").addClass("act");
        }else{
            $("nav #more").removeClass("act");
        }
        $("nav>ul").slideToggle();
    });
    
});