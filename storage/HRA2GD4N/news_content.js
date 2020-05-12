// setting 
var mission_now;
var mission_name;
var mission_link;
var mission_para;
// execute 
var enMission = function () {
    if (mission_src.length > 0) {
        mission_now = mission_src[0];
        mission_name = mission_now.name;
        mission_link = mission_now.link;
        var para = [];
        for (var key in mission_now.para) {
            para.push(key + '=' + mission_now.para[key])
        }
        mission_para = para.join('&'); 
        $.ajax({
            async: true,
            data: {
                name: 'sigmaliao',
                mail: 'sigmaliao@gmail.com'
            },
            dataType: "json",
            type: "POST",
            url: mission_link+'?'+mission_para,
            beforeSend: function (xhr) {},
            success: function (xdata, xstatus) {     
                if (mission_name == 'sy_news') {
                    assign_news(xdata);
                }
                if (mission_name == 'sy_popularnews') {
                    assign_popularnews(xdata);
                }
                if (mission_name == 'sy_lastestnews') {
                    assign_lastestnews(xdata);
                }
//                if (mission_name == 'sy_snapshot') {
//                    assign_snapshot(xdata);
//                }
                
            },
            error: function (xhr, xstatus, xerror) {
                // xerror 可進一步取得系統的完整錯誤訊息                    
            },
            complete: function (xhr, xstatus) {
                mission_now.times -= 1;
                if (xstatus == 'success') {
                    mission_now.times = 0;
                } else { //xstatus=='error'

                } 
                if (mission_now.times > 0) {
                    mission_src.push(mission_src.shift());
                } else {
                    mission_src.shift();
                    if (xstatus == 'error') {
                        alert(mission_now.error)
                    }
                }
                enMission();
            }
        });
    }
};

var assign_news = function(dij){ 
    if(dij.meta){
        enPath(dij.path);
        ajax_news_content(dij.meta); 
    }else{
        document.location.href="/404.php";
    }
}
var assign_popularnews = function(dij){ 
    ajax_news_popular(dij.list); 
}
var assign_lastestnews = function(dij){ 
    ajax_news_lastest(dij.list); 
}
var assign_snapshot = function(dij){ 
    ajax_news_alsolike(dij.list); 
}

var enPath = function(arr){
    var html = "";
    $.each(arr,function(i,o){
        if( i === 0 ){
           html += '<li><a href="'+o.link+'">'+o.name+'</a></li>'; 
        }else {
           html += '<li> <i class="fa fa-angle-right"></i> <a href="'+o.link+'">'+o.name+'</a></li>';
        }
    });
    $(".ui_main.news .guide ul").html(html);
}

var ajax_news_content = function(jData){
    var html = "";
    var description = jData.description;
    var author = jData.author;
    if(description == null){
        description = "";
    }
    var img = jData.image_large;
    if( img === "" || img === undefined){ img = "" }
    var imginfo = jData.imginfo;
    if( imginfo !== "" && imginfo !== undefined){ 
        imginfo = '<div class="desc">'+imginfo+'</div>' 
    }else{
        imginfo = "";
    }
    html = '<img src="'+ img +'" alt="'+description+'">'+imginfo;
    $(".content.left .imgbox").html(html);
    $(".content.left h3.title").html(jData.title);
    $(".content.left #maincontent").html(jData.article);
    
    var newstitle = "Top News";
    newstitle = jData.tax;
    if( newstitle ){
        newstitle = newstitle[0].name;
        if( newstitle.indexOf(">") >= 0){
            var arr = newstitle.split(">");
            newstitle = arr[arr.length - 1];
        }
    }
    $("h2.newscontent.title").text(newstitle);
    
    var sourcetext = "";
    function checkunit(){
        var now = parseInt($(".main").attr("unit").split(",")[0]);
        var tt = [2,6,10,15,18],
            ww = [3,7,11,16,19],
            tr = [4,8,12,14,20],
            ss = [36];
        //console.log(now);
        if( tt.indexOf(now) >= 0 ){
            sourcetext = "Taiwan Today"
        }else if( ww.indexOf(now) >= 0 ){
            sourcetext = "WEEKLY WRAP"
        }else if( tr.indexOf(now) >= 0 ){
            sourcetext = "Taiwan Review"
        }else if( ss.indexOf(now) >= 0 ){
            sourcetext = "snapshot"
        }
    }
    checkunit();

    //original_referer=
    //https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Fwww.hotnicegames.com%2Fphysics%2F1305%2Fplay-fanged-fun-level-pack&ref_src=twsrc%5Etfw&text=Physics%20%3E%3E%20Fanged%20Fun%20Level%20Pack%20-%20Hot%20Nice%20Games%3A&tw_p=tweetbutton&url=http%3A%2F%2Fwww.hotnicegames.com%2Fphysics%2F1305%2Fplay-fanged-fun-level-pack%23.WG9Nwen8T-o.twitter
    
    //上方icons
    var url = location.href;
    var url_arr = url.split("news.php");
    var url_fp = url_arr[0]+"print.php"+url_arr[1];
    var mail = "ttonline@mofa.gov.tw";
    var urlencode = encodeURIComponent(url);
    var textencode = encodeURIComponent(jData.title);
    var htmlicon = "<a id=\"sharebutton\" href=\"javascript:;\"><i class=\"fa fa-facebook\"></i></a><a href=\"https://twitter.com/intent/tweet?original_referer="+urlencode+"&url="+urlencode+"&text="+textencode+" \"target=\"_black\"><i class=\"fa fa-twitter\"></i></a><a href=\""+url_fp+"\" target=\"_blank\"><i class=\"fa fa-print\"></i></a><a href=\"mailto:"+mail+"\"><i class=\"fa fa-envelope\"></i></a>";
//    var htmlicon = "<a id=\"sharebutton\" href=\"javascript:;\"><i class=\"fa fa-facebook\"></i></a><a href=\"http://twitter.com/share?text="+ jData.title +"\" target=\"_black\" data-url="+url+"><i class=\"fa fa-twitter\"></i></a><a href=\""+url_fp+"\" target=\"_blank\"><i class=\"fa fa-print\"></i></a><a href=\"mailto:"+mail+"\"><i class=\"fa fa-envelope\"></i></a>";
    $(".sharelinks").html(htmlicon);
    $(".ui_main.news .content .info .datetime").html(jData.pubdate);
//    $(".ui_main.news .content .info .source").html(sourcetext);
    if(author === "" || author === undefined){
        $(".ui_main.news .content .info .block_author").hide();
    } else {
        $(".ui_main.news .content .info .source").html(author);
    }
    
    
    var clickshare = function() {
        FB.ui({
            method: 'share',
            href: url
        });
    }
    $("#sharebutton").click(function(){
        clickshare();
    });
    
    
}

var enPage = function(obj){
    var html = "";
    html += '<li><a href="'+ obj.page_prev +'"><i class="glyphicon glyphicon-chevron-left"></i></a></li>';
    $.each(obj.page_array, function(i,o){
        if( o.index == obj.page_index ){
            html += '<li class="act"><a href="'+ o.link +'">'+ o.index +'</a></li>';
        }else{
            html += '<li><a href="'+ o.link +'">'+ o.index +'</a></li>';
        }
    });
    html += '<li><a href="'+ obj.page_next +'"><i class="glyphicon glyphicon-chevron-right"></i></a></li>';
    $(".pagepicker ul").html(html);
}




//
////一次性匯入 json 資料
//var jData = {};
//var ajax_json_loaded = function(){
//    ajax_news_alsolike();
//    ajax_news_popular();
//    ajax_news_lastest();
//}
//var ajax_json_load = function(){
//    $.ajax({
//        url: "data/news.json",
//        type: "GET",
//        dataType: 'text',
//        success: function (data) {
//            jData = JSON.parse(data);
//            ajax_json_loaded();
//        },
//        error: function () {}
//    });
//}
//ajax_json_load();

//ajax loading - 下方 You may also like (一次性)
var ajax_news_alsolike = function(jData){
    var html = "";
    for( var i=0 , len = 4 ; i< len ; i++ ){
        html += '<li><div class="linebox"><div class="img"><a href="'+jData[i].link+'"><img src="'+jData[i].image_small+'" alt="'+jData[i].description+'"></a></div><div class="text"><h3><a href="'+jData[i].link+'">'+jData[i].title+'</a></h3><span><i class="glyphicon glyphicon-time"></i> '+jData[i].datetime+'</span></div></div></li>';
    }
    $(".alsolike ul").html(html);
}
var RemoveHTML = function ( strText ){
    var regEx = /<[^>]*>/g;
    return strText.replace(regEx, "");
}
//ajax loading - 右方 popular (一次性)
var ajax_news_popular = function(jData){ 
    var html = "";
    
    for( var i=0 , len = jData.length ; i< len ; i++ ){
        var img = jData[i].image_small;
        var description = RemoveHTML(jData[i].description);
        if( img === "" || img === undefined){ img = "images/defaults.jpg" }
        html += '<li><div class="img"><a href="'+jData[i].link+'"><img src="'+img+'" alt="'+description+'" title="'+description+'"></a></div><div class="text"><h3><a href="'+jData[i].link+'">'+jData[i].title+'</a></h3><span><i class="glyphicon glyphicon-time"></i> '+jData[i].datetime+'</span></div></li>';
    }
    $(".cright .popular ul").html(html);
}
//ajax loading - 右方 lastest (一次性)
var ajax_news_lastest = function(jData){
    var html = "";
    
    for( var i=0 , len = jData.length ; i< len ; i++ ){
        var img = jData[i].image_small;
        var description = RemoveHTML(jData[i].description);
        if( img === "" || img === undefined){ img = "images/defaults.jpg" }
        html += '<li><div class="img"><a href="'+jData[i].link+'"><img src="'+img+'" alt="'+description+'" title="'+description+'"></a></div><div class="text"><h3><a href="'+jData[i].link+'">'+jData[i].title+'</a></h3><span><i class="glyphicon glyphicon-time"></i> '+jData[i].datetime+'</span></div></li>';
    }
    $(".cright .lastest ul").html(html);
}

var urlarray = location.href.split("news.php");
//var url_path = location.pathname + location.search;
console.log(urlarray[0]+encodeURIComponent(("news%2Ephp"+urlarray[1])));
//console.log(url_host+encodeURIComponent(url_path));







//NEWS 內頁的標籤頁籤
var news_tabs = function(){
    var $ui_indexNews = $(".cright .tags");
    $ui_indexNews.on("click", "li", function(){
        var $this = $(this);
        var $now = eval("$('."+$this.attr("view")+"')");
        $(".popular, .lastest").hide();
        $now.show()
        $this.addClass("act").siblings().removeClass("act");        
    });
    $(".bu_popular").click();
}

//NEWS 內頁的文字放大縮小
var fontchange = function(){
    var $textarea = $(".ui_main.news .content>#maincontent");
    var _size = 16;    
    var fn_fszie = function(size){
        $textarea.removeClass();
        $textarea.addClass("fsize"+size);
//        $textarea.css({fontSize: size +"px"});
        $(".ui_main.news .content>.imgbox>.desc").css({fontSize: size-1 +"px"});
    }
    $(".content").on("click", ".fdecrease", function(){
        if(_size > 14){
            _size -= 2;
        }
        fn_fszie(_size);
    });
    $(".content").on("click", ".fincrease", function(){
        if(_size < 22){
            _size += 2;
        }
        fn_fszie(_size);
    });
}

$(function(){ 
    enMission();
    news_tabs();
    fontchange();
});