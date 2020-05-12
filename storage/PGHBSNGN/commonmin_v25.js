//notes
(function($){$.stickr=function(o){var o=$.extend({time:2000,speed:'fast',note:null,className:null,sticked:false,position:{top:0,right:0}},o);var a=$('#jquery-stickers');if(!a.length){$('body').prepend('<div id="jquery-stickers"></div>');var a=$('#jquery-stickers')}a.css('position','fixed').css({right:'auto',left:'auto',top:'auto',bottom:'auto'}).css(o.position);var b=$('<div class="stick"></div>');a.append(b);if(o.className)b.addClass(o.className);b.html(o.note);if(o.sticked){var c=$('<div class="exit"></div>');b.prepend(c);c.click(function(){b.fadeOut(o.speed,function(){$(this).remove()})})}else{setTimeout(function(){b.fadeOut(o.speed,function(){$(this).remove()})},o.time)}}})(jQuery);
//hoverIntent
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)
//dropdownmaster
jQuery&&function(e){function t(t,i){var s=t?e(this):i,o=e(s.attr("data-dropdown")),u=s.hasClass("dropdown-open");if(t){if(e(t.target).hasClass("dropdown-ignore"))return;t.preventDefault();t.stopPropagation()}else if(s!==i.target&&e(i.target).hasClass("dropdown-ignore"))return;n();if(u||s.hasClass("dropdown-disabled"))return;s.addClass("dropdown-open");o.data("dropdown-trigger",s).show();r();o.trigger("show",{dropdown:o,trigger:s})}function n(t){var n=t?e(t.target).parents().addBack():null;if(n&&n.is(".dropdown")){if(!n.is(".dropdown-menu"))return;if(!n.is("A"))return}e(document).find(".dropdown:visible").each(function(){var t=e(this);t.hide().removeData("dropdown-trigger").trigger("hide",{dropdown:t})});e(document).find(".dropdown-open").removeClass("dropdown-open")}function r(){var t=e(".dropdown:visible").eq(0),n=t.data("dropdown-trigger"),r=n?parseInt(n.attr("data-horizontal-offset")||0,10):null,i=n?parseInt(n.attr("data-vertical-offset")||0,10):null;if(t.length===0||!n)return;t.hasClass("dropdown-relative")?t.css({left:t.hasClass("dropdown-anchor-right")?n.position().left-(t.outerWidth(!0)-n.outerWidth(!0))-parseInt(n.css("margin-right"),10)+r:n.position().left+parseInt(n.css("margin-left"),10)+r,top:n.position().top+n.outerHeight(!0)-parseInt(n.css("margin-top"),10)+i}):t.css({left:t.hasClass("dropdown-anchor-right")?n.offset().left-(t.outerWidth()-n.outerWidth())+r:n.offset().left+r,top:n.offset().top+n.outerHeight()+i})}e.extend(e.fn,{dropdown:function(r,i){switch(r){case"show":t(null,e(this));return e(this);case"hide":n();return e(this);case"attach":return e(this).attr("data-dropdown",i);case"detach":n();return e(this).removeAttr("data-dropdown");case"disable":return e(this).addClass("dropdown-disabled");case"enable":n();return e(this).removeClass("dropdown-disabled")}}});e(document).on("click.dropdown","[data-dropdown]",t);e(document).on("click.dropdown",n);e(window).on("resize",r)}(jQuery);

$(document).ready(function(){
//cookie
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){function n(e){if(i.raw){return e}return decodeURIComponent(e.replace(t," "))}function r(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}e=n(e);try{return i.json?JSON.parse(e):e}catch(t){}}var t=/\+/g;var i=e.cookie=function(t,s,o){if(s!==undefined){o=e.extend({},i.defaults,o);if(typeof o.expires==="number"){var u=o.expires,a=o.expires=new Date;a.setDate(a.getDate()+u)}s=i.json?JSON.stringify(s):String(s);return document.cookie=[i.raw?t:encodeURIComponent(t),"=",i.raw?s:encodeURIComponent(s),o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("")}var f=document.cookie.split("; ");var l=t?undefined:{};for(var c=0,h=f.length;c<h;c++){var p=f[c].split("=");var d=n(p.shift());var v=p.join("=");if(t&&t===d){l=r(v);break}if(!t){l[d]=r(v)}}return l};i.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==undefined){e.cookie(t,"",e.extend({},n,{expires:-1}));return true}return false}})
//check in array
function in_array(value, array) {
for(var i = 0; i < array.length; i++) {
if(array[i] == value) return true;
}
return false;
}
function check_favorite(pf,nid){
if(in_array(nid, pf)) {return 1;}
}

function strip_tags( str ){
	return str.replace(/<\/?[^>]+>/gi, '');
}


$("img").error(function () {
  $(this).unbind("error").attr("src", "http://stat.myinforms.com/thumb_images/default/newsdefault.jpg");
});

function removeloader(){
setTimeout(function() {$("#loader_news").removeClass("loader_news_gif");}, 500);
}

if(mi.current_page == "tagsbyid" || mi.current_page == "tags"){
$("#rows_show").hide();
}

$('#modal_cr_close').live('click', function() {
$.arcticmodal('close');
});

jQuery.fn.upScrollButton = function( options ) {
return this.each( function( ) {
jQuery( window ).scroll( function () {
if ( jQuery( this ).scrollTop()  > options.heightForButtonAppear )
$("#ads_").css({'position':'fixed', 'top':'5px','margin-left':'20px'});
else
$("#ads_").css({'position':'relative','top':'0px','margin-left':'0'});
});
});
}
jQuery( 'body' ).upScrollButton({
heightForButtonAppear:170
});


jQuery.fn.upScrollarrow = function( options ) {
return this.each( function( ) {
jQuery( window ).scroll( function () {
if ( jQuery( this ).scrollTop()  > options.heightappear ) {
$("#arrow").css({'position':'fixed', 'bottom':'40px', 'display':'block','left': (($(window).width() - 50) / 2 + $(window).scrollLeft()-640) + 'px'});
} else{
$("#arrow").css({'display':'none'});
}
});
});
}
jQuery( 'body' ).upScrollarrow(
{
heightappear:170
});

$("#arrow").click(function(){
$("html, body").animate({ scrollTop: 0 }, 50);
});


var query;

$("#cbp-hrmenu > ul > li").hoverIntent({
    sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
    interval: 50,   // number = milliseconds of polling interval
    over: function () {
       
var id = $(this).attr('id');
var t = setTimeout(function(){
$('#'+id).addClass( 'cbp-hropen' );
}, 200);

    },  // function = onMouseOver callback (required)
    timeout: 0,   // number = milliseconds delay before onMouseOut function call
    out: function () {
var id = $(this).attr('id');
var t = setTimeout(function(){
$('#'+id).removeClass( 'cbp-hropen' );
}, 300);

    }    // function = onMouseOut callback (required)
});




cbpHorizontalMenu.init();

function check_resheigh(){
$('.restext').each(function() {
if((this.scrollHeight - this.clientHeight) != 0) {
$(this).next().css('display','block');
} else {
$(this).next().css('display','none');
}
});
}

check_resheigh();

if($.cookie('set_tags') == 2){ 
$("#show_more_tags").hide(); 
$("#show_more_rss").show(); 
} else { 
$("#show_more_tags").show(); 
$("#show_more_rss").hide(); 
}

function resize_desc(){
$('.expand').toggle(function() {
$(this).prev().css('height','auto');
}, function() {
$(this).prev().css('height','50px');
});
}
resize_desc();


function build_list(data,scrollup){
$("#result_list").html("");
$("#result_net").html("");
$("#result_normal").html("");
if(data.news_data != null){
$.each(data.news_data, function(key, val) {
var img = val.mi_news_img;
if(img != null){
var img = '<div class="res_img"><img width="70" height="40" src="'+mi.basestat+val.mi_news_img+'" /></div>';
} else {img = '';}
if(val.mi_news_csid > 0){
var story = '<a id="sid-'+val.mi_news_id+'" href="'+mi.baseurl+val.prefix+'story/'+val.mi_news_id+'-'+val.mi_rss_id+'/">'+mi.allsources+': '+val.mi_news_csid+' »</a>';
} else {var story = "";}
$("#result_list").append('<li class="lst"><h2><a href="'+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/">'+val.mi_news_title+'</a></h2><a class="favicon" title="'+val.mi_rss_name+'" href="'+mi.baseurl+val.prefix+'rss/'+val.mi_rss_id+'-'+val.mi_rss_translit+'/"><img alt="'+val.mi_rss_name+'" title="'+val.mi_rss_name+'" src="'+mi.basestat+val.mi_rss_img+'" width="16" height="16" /></a><div class="res_timesite"><span class="restime">'+val.mi_news_date+'</span> <a class="ressite" title="'+val.mi_rss_name+'" href="'+mi.baseurl+val.prefix+'rss/'+val.mi_rss_id+'-'+val.mi_rss_translit+'/">'+val.mi_rss_site+'</a> <div class="res_all_sources">'+story+'</div></div></li>');
});
$(".pagination").html("");
$(".pagination").html(data.pagination_show);
check_resheigh();
resize_desc();
extclick();
if(scrollup != 10){
$("html, body").animate({ scrollTop: 0 }, 600);
}
} else {
$("#result_normal").html(data.infononews);
$(".pagination").html("");	
}
}


function build_normal(data,scrollup){
$("#result_list").html("");
$("#result_net").html("");
$("#result_normal").html("");
if(data.news_data != null){
$.each(data.news_data, function(key, val) {
var img = val.mi_news_img;
var frt = "";
if(img != null){
var img = '<div class="res_img"><img width="70" height="40" src="'+mi.basestat+val.mi_news_img+'" /></div>';
} else {img = '';}
if(val.mi_news_csid > 0){
var story = '<a id="sid-'+val.mi_news_id+'" href="'+mi.baseurl+val.prefix+'story/'+val.mi_news_id+'-'+val.mi_rss_id+'/">'+mi.allsources+': '+val.mi_news_csid+' »</a>';
} else {var story = "";}
if(data.favorite != null){
frt = check_favorite(data.favorite,val.mi_news_id);
if(frt == 1) {frt = " infavorite";} else {frt = "";}
}
$("#result_normal").append('<li><h2><a href="'+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/">'+val.mi_news_title+'</a></h2><a class="favicon" title="'+val.mi_rss_name+'" href="'+mi.baseurl+val.prefix+'rss/'+val.mi_rss_id+'-'+val.mi_rss_translit+'/"><img alt="'+val.mi_rss_name+'" title="'+val.mi_rss_name+'" src="'+mi.basestat+val.mi_rss_img+'" width="16" height="16" /></a><div class="res_timesite"><span class="restime">'+val.mi_news_date+'</span> <a class="ressite" title="'+val.mi_rss_name+'" href="'+mi.baseurl+val.prefix+'rss/'+val.mi_rss_id+'-'+val.mi_rss_translit+'/">'+val.mi_rss_site+'</a> </div><div class="restext">'+img+''+val.mi_news_description+'</div><div class="expand"></div><div class="res_bottom"><div class="resshare"><div class="fleft"><a class="s_google" target="_blank" href="http://plus.google.com/share?url='+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/"></a><a class="s_twitter" target="_blank" href="http://twitter.com/home?status='+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/ '+val.mi_news_title+'"></a><a class="s_facebook" target="_blank" href="http://www.facebook.com/sharer.php?u='+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/&t='+val.mi_news_title+'"></a><a class="s_link" target="_blank" data-news="'+val.mi_news_id+"-"+val.mi_rss_id+'" href="'+val.mi_news_link+'"></a><span class="s_favorite '+frt+'" id="fav-'+mi.lang_id+'-'+val.mi_news_id+'"></span></div><div class="listtags">'+val.mi_news_hashtags+'</div></div><div class="res_all_sources">'+story+'</div></div><div class="clear"></div></li>');
});
$(".pagination").html("");
$(".pagination").html(data.pagination_show);
check_resheigh();
resize_desc();
extclick();
if(scrollup != 10){
$("html, body").animate({ scrollTop: 0 }, 600);
}
} else {
$("#result_normal").html(data.infononews);
$(".pagination").html("");	
}
}

function build_net(data,scrollup){
$("#result_list").html("");
$("#result_net").html("");
$("#result_normal").html("");
var cnt_odd = 1;
var resnetleft = ""; 
if(data.news_data != null){
$.each(data.news_data, function(key, val) {
var img = val.mi_news_img;
var frt = "";
if(img != null){
var img = '<div class="res_img res_img_net"><img width="130" height="70" src="'+mi.basestat+val.mi_news_img+'" /><div class="res_timesite_net"><a title="'+val.mi_rss_site+'" href="'+mi.baseurl+val.prefix+'rss/'+val.mi_rss_id+'-'+val.mi_rss_translit+'/">'+val.mi_rss_site+'</a> </div></div>';
} else {img = '';}
if(val.mi_news_csid > 0){
var story = '<a id="sid-'+val.mi_news_id+'" href="'+mi.baseurl+val.prefix+'story/'+val.mi_news_id+'-'+val.mi_rss_id+'/">'+mi.sources+': '+val.mi_news_csid+' »</a>';
} else {var story = "";}
if(data.favorite != null){
frt = check_favorite(data.favorite,val.mi_news_id);
if(frt == 1) {frt = " infavorite";} else {frt = "";}
}
if(cnt_odd == 1) {resnetleft = "resnetleft";} else {resnetleft = "";}
$("#result_net").append('<div class="resnet_block '+resnetleft+'">'+img+'<div class="restime">'+val.mi_news_date+'</div><h2><a href="'+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/">'+val.mi_news_title+'</a></h2><div class="clear"></div><div class="resshare"><div class="fleft"><a class="s_google" target="_blank" href="http://plus.google.com/share?url='+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/"></a><a class="s_twitter" target="_blank" href="http://twitter.com/home?status='+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/ '+val.mi_news_title+'"></a><a class="s_facebook" target="_blank" href="http://www.facebook.com/sharer.php?u='+mi.baseurl+val.prefix+'a/'+val.mi_news_id+'-'+val.mi_news_translit+'/&t='+val.mi_news_title+'"></a><a class="s_link" target="_blank" data-news="'+val.mi_news_id+"-"+val.mi_rss_id+'" href="'+val.mi_news_link+'"></a></a><span class="s_favorite '+frt+'" id="fav-'+mi.lang_id+'-'+val.mi_news_id+'"></span></div><div class="res_all_sources res_all_sources_net">'+story+'</div></div></div>');
cnt_odd++;
if(cnt_odd == 3){cnt_odd = 1;}
});
$("#result_net").append('<div class="clear"></div>');
$(".pagination").html("");
$(".pagination").append(data.pagination_show);
check_resheigh();
resize_desc();
extclick();
if(scrollup != 10){
$("html, body").animate({ scrollTop: 0 }, 600);
}
} else {
$("#result_normal").html(data.infononews);
$(".pagination").html("");	
}
}

function load_data_news(view,query,page,action,catid,adv,countryid,scrollup){
$.ajax({
url: mi.baseurl + mi.lang_country+'/load/',
cache: false,
type: 'POST',
dataType: 'json', 
data: {q:query,page:page,action:action,view:view,catid:catid,current_page:mi.current_page,adv:adv,countryid:countryid},
success: function(data){

if(mi.current_page == "search"){
$("#search_fld").val(decodeURIComponent(window.query));
$("#search_fld").attr("placeholder","");
} 
if(view == "list") {
build_list(data,scrollup);
} 
if(view == "net") {
build_net(data,scrollup);  
}
if(view == "normal") {
build_normal(data,scrollup);  
}
}
});
}

function updatenews(scrollup){
$("#loader_news").addClass("loader_news_gif");
var segments = mi.current_url.split('/');
if(mi.current_page == "search" || mi.current_page == "tagsbyid") { 
action = "search"; 
if(typeof window.query === 'undefined'){
window.query = segments[5];
}
if(typeof page === 'undefined'){
page = segments[7];
}
} else {
window.query = "";
var pagenum = $.inArray("page", segments);
if(pagenum == -1){page = 1;} else {page = segments[pagenum+1];}
}
load_data_news(mi.view_result_news,window.query,page,"getview",mi.catid,"","",scrollup);
if(mi.current_page == "search"){
$("#search_fld").val(decodeURIComponent(window.query));
} 
removeloader();
}

$("#res_reload").live('click', function() {
updatenews(1);
});



$("#res_view_list").live('click', function() {
$("#loader_news").addClass("loader_news_gif");
$("#res_view_net").removeClass("view_act");
$("#res_view_normal").removeClass("view_act");
$(this).addClass("view_act");
mi.view_result_news = "list";
var action = "getview";
var segments = mi.current_url.split('/');
if(mi.current_page == "search" || mi.current_page == "tagsbyid") { 
action = "search"; 
if(typeof window.query === 'undefined'){
window.query = segments[5];
}
if(typeof page === 'undefined'){
page = segments[7];
}
} else {
window.query = "";
var pagenum = $.inArray("page", segments);
if(pagenum == -1){page = 1;} else {page = segments[pagenum+1];}
}
load_data_news(mi.view_result_news,window.query,page,action,mi.catid);
removeloader();
});

$("#res_view_net").live('click', function() {
$("#loader_news").addClass("loader_news_gif");
$("#res_view_normal").removeClass("view_act");
$("#res_view_list").removeClass("view_act");
$(this).addClass("view_act");
mi.view_result_news = "net";
var action = "getview";
var segments = mi.current_url.split('/');
if(mi.current_page == "search" || mi.current_page == "tagsbyid") { 
action = "search"; 
if(typeof window.query === 'undefined'){
window.query = segments[5];
}
if(typeof page === 'undefined'){
page = segments[7];
}
} else {
window.query = "";
var pagenum = $.inArray("page", segments);
if(pagenum == -1){page = 1;} else {page = segments[pagenum+1];}
}
load_data_news(mi.view_result_news,window.query,page,action,mi.catid);
removeloader();
});

$("#res_view_normal").live('click', function() {
$("#loader_news").addClass("loader_news_gif");
$("#res_view_net").removeClass("view_act");
$("#res_view_list").removeClass("view_act");
$(this).addClass("view_act");
mi.view_result_news = "normal";
var action = "getview";
var segments = mi.current_url.split('/');
if(mi.current_page == "search" || mi.current_page == "tagsbyid") { 
action = "search"; 
if(typeof window.query === 'undefined'){
window.query = segments[5];
}
if(typeof page === 'undefined'){
page = segments[7];
}
} else {
window.query = "";
var pagenum = $.inArray("page", segments);
if(pagenum == -1){page = 1;} else {page = segments[pagenum+1];}
}
load_data_news(mi.view_result_news,window.query,page,action,mi.catid);
removeloader();
});


function searchgo(){
$("#loader_news").addClass("loader_news_gif");
window.query = $("#search_fld").val().replace(/[/.,&%@!?;]*/g,"");
window.query = strip_tags(window.query);
//window.query = encodeURIComponent(window.query);
if(mi.current_page == "search2") {
var url_target = mi.baseurl+mi.lang_country+'/search/'+window.query+'/';
history.pushState( null, null, url_target );
load_data_news(mi.view_result_news,window.query,1,"search","","",1);
$("h1").html(mi.search+": "+window.query);
$("#search_fld").val(window.query);
removeloader();
return false;
} else {
$(location).attr('href', mi.baseurl+mi.lang_country+'/search/'+window.query+'/');
removeloader();
}
}

$("#searchsubmit").click(function(){
window.query = strip_tags($("#search_fld").val());
if(window.query != ""){
searchgo();
}
});

$('#search_fld').keydown(function (e) {
if (e.keyCode == 13) {
searchgo();
}
removeloader();
});

$(".sha2").live('click', function() {

$("#loader_news").addClass("loader_news_gif");
if(mi.current_page == "search") {
history.pushState( null, null, this.href );
var segments = this.href.split('/');
window.query = segments[5];
page = segments[7];
var adv = "";
if(segments[6] != "page"){
page = segments[8];	
adv = segments[6];
}
$("#search_fld").val(decodeURIComponent(window.query));
$("h1").html(mi.search+": "+decodeURIComponent(window.query));
mi.current_url = this.href;
load_data_news(mi.view_result_news,window.query,page,"search","",adv,1);
removeloader();
return false;
}

removeloader();
});
				
$( window ).bind( "popstate", function( e ) {
$("#loader_news").addClass("loader_news_gif");
var returnLocation = history.location || document.location;
var ref = returnLocation.href;
var segments = ref.split('/');
window.query = segments[5];
page = segments[7];
if(typeof page === 'undefined'){
page = 1;
}
load_data_news(mi.view_result_news,window.query,page,"search","","",1);
removeloader();   
});

function updateindex(){
$("#loader_news").addClass("loader_news_gif");
var segments = mi.current_url.split('/');
var pagenum = $.inArray("page", segments);
if(pagenum == -1){page = 1;} else {page = segments[pagenum+1];}
load_data_news_index(mi.view_result_news,page);
removeloader();
}
$("#res_view_normal_index, #res_view_net_index, #res_view_list_index, #res_reload_index").live('click', function() {

if($(this).attr("id") != "res_reload_index") {
$("#res_view_net_index").removeClass("view_act");
$("#res_view_normal_index").removeClass("view_act");
$("#res_view_list_index").removeClass("view_act");
$(this).addClass("view_act");
}

var vid = $(this).attr("id");
if(vid == "res_view_normal_index") {mi.view_result_news = "normal";}
if(vid == "res_view_net_index") {mi.view_result_news = "net";}
if(vid == "res_view_list_index") {mi.view_result_news = "list";}

updateindex();
});


function load_data_news_index(view,page){
$("#result_block").load(mi.baseurl +mi.lang_country+ "/load/", { action:"indexnews",view:view,current_page:mi.current_page,page:page,prefix:mi.prefixurl,cat_id:mi.catid }, function(){
check_resheigh();
resize_desc();
});
}

$(".rows_count").live('click', function() {
$(".rows_count").removeClass("active");
$(this).addClass("active");
var rows_count = $(this).html();
$.cookie('rows_count', rows_count, { expires: 30, path: '/' });

var segments = mi.current_url.split('/');
if(mi.current_page == "search" || mi.current_page == "tagsbyid") { 
action = "search"; 
if(typeof window.query === 'undefined'){
window.query = segments[5];
}
if(typeof page === 'undefined'){
page = segments[7];
}
} else {
window.query = "";
var pagenum = $.inArray("page", segments);
if(pagenum == -1){page = 1;} else {page = segments[pagenum+1];}
}
load_data_news(mi.view_result_news,window.query,page,"getview",mi.catid,1);
});

function ch_country() {
$(".change_country, #mi_world").live('click', function() {
$("#loader_news").addClass("loader_news_gif");

if($(this).attr("class") == "change_country"){
var new_country = $(this).html();
var old_country = $("#mi_country_spn").html();
var countryid = $(this).attr("id").replace('country-','');
$('#country-'+countryid).parent().remove();
$("#mi_country_spn").html(new_country).addClass("spn_bold");
$("#mi_world").html("<span>"+mi.world+"</span>");
if(old_country != mi.notset){
$("#modal_country").append('<li><span id="country-'+mi.country_id+'" class="change_country">'+old_country+'</span></li>');
}
}

if($(this).attr("id") == "mi_world"){
var old_country = $("#mi_country_spn").html();
$("#mi_country_spn").html(mi.notset).removeClass("spn_bold");
$("#mi_world").html("<span><b>"+mi.world+"</b></span>");
if(old_country != mi.notset){
$("#modal_country").append('<li><span id="country-'+mi.country_id+'" class="change_country">'+old_country+'</span></li>');
}
var countryid = 0;
new_country = mi.world;
}

$.getJSON(mi.baseurl + mi.lang_country+'/load/?action=change_country&countryid='+countryid, function(data) {
mi.country_id = data.country;
});
if(mi.current_page == "index" || mi.current_page == "blogs_index"){
var segments = mi.current_url.split('/');
var pagenum = $.inArray("page", segments);
if(pagenum == -1){page = 1;} else {page = segments[pagenum+1];}
load_data_news_index(mi.view_result_news,page);
} else {
var segments = mi.current_url.split('/');
if(mi.current_page == "search" || mi.current_page == "tagsbyid") { 
action = "search"; 
if(typeof window.query === 'undefined'){
window.query = segments[5];
}
if(typeof page === 'undefined'){
page = segments[7];
}
} else {
window.query = "";
var pagenum = $.inArray("page", segments);
if(pagenum == -1){page = 1;} else {page = segments[pagenum+1];}
}
load_data_news(mi.view_result_news,window.query,page,"getview",mi.catid,"",countryid,1);
}
$("#modal_country").hide();
$(".arrow").hide();

removeloader();
show_mess(mi.changecountry+new_country);
});
}
ch_country();

function show_mess(text){
$.stickr({note:text,className:'opacity',position:{right:0,top:0}});
}

//call modal 
$('#search_adv').live('click', function() {
$.arcticmodal({
type: 'ajax',
url: mi.baseurl + mi.lang_country+'/load/',
ajax: {
type: 'POST',
cache: false,
dataType: 'html',
data: {action:"forms", form:"search_adv"},
success: function(data, el, responce) {
var h = $('<div class="box-modal">' + responce +'</div>');
data.body.html(h);
}
}
});
});

$('#search_adv_submit').live('click', function() {
$("#loader_news").addClass("loader_news_gif");
window.query = $("#search_adv_phrase").val();
var search_adv_lang = $("#search_adv_lang :selected").val();
var adv_country = $("#search_adv_country :selected").val();
var advseg = adv_country.split('-');
var search_adv_country = advseg[0];

var search_adv_type = $("#search_adv_type :selected").val();
var search_adv_category = $("#search_adv_category :selected").val();

if(search_adv_lang != 0 || search_adv_country != 0 || search_adv_type != 0 || search_adv_category  != 0) {
var adv_set = search_adv_lang+"-"+search_adv_country+"-"+search_adv_type+"-"+search_adv_category;
} else {
var adv_set = "";	
}
if(window.query != ""){
$(".sbr_adv_search").show();
$.cookie('adv_search', adv_set, { expires: 30, path: '/' });
if(mi.current_page == "search") {
var url_target = mi.baseurl + mi.lang_country+ '/search/' +window.query + '/' + adv_set+'/';
history.pushState( null, null, url_target );
load_data_news(mi.view_result_news,window.query,1,"search","",adv_set,0);
$.arcticmodal('close');
removeloader();
return false;
} else {
$(location).attr('href', mi.baseurl+mi.lang_country + '/search/' +window.query + '/' + adv_set+'/');
removeloader();
}
} else { $("#search_adv_phrase").attr("placeholder","Укажите поисковую фразу"); }
removeloader();
});

$(".sbr_adv_search").live('click', function() {
$(".sbr_adv_search").hide();
$.cookie('adv_search', 0, { expires: 30, path: '/' });
});

//in modal change lang and other
$("#search_adv_lang").live('change', function() {
var sub_list = $('select[name="search_adv_country"]');

var lang_id = $("#search_adv_lang :selected").val();
$.getJSON(mi.baseurl + mi.lang_country+'/load/',
{action:'get_country', lang_id:lang_id}, 
function(subList){
sub_list.html(''); 

var count = 1;
$.each(subList, function(i){
if(count==1){ 
var prt = i.split('-');
getcat(lang_id,prt[0]); 
}
sub_list.append('<option value="' + i + '">' + this + '</option>');
count++;
});
});
});


//in modal change lang and other
$("#search_adv_country").live('change', function() {
var lang_id = $("#search_adv_lang :selected").val();
var country_id = $("#search_adv_country :selected").val();
var prt = country_id.split('-');
getcat(lang_id,prt[0]); 
});



$('.show_desc').click(function(){
$('.hide_desc').show();
$('.show_desc').hide();
$( '.hide_desc,.show_desc' ).css( "top", "0" );
$(".restext70").show(); 
});

$('.hide_desc').click(function(){
$('.hide_desc').hide();
$('.show_desc').show();
$( '.hide_desc,.show_desc' ).css( "top", "0" );
$(".restext70").hide();
});



function getcat(lang_id,country_id){
var sub_listcat = $('select[name="search_adv_category"]');
$.getJSON(mi.baseurl + mi.lang_country+'/load/', 
{action:'get_cat', lang_id:lang_id, country_id:country_id}, 
function(data){
sub_listcat.html(''); 
sub_listcat.append('<option value="0">-</option>');
$.each(data, function(key, val){
sub_listcat.append('<option value="' + key + '">' + val + '</option>');
});
});

}

function extclick(){
$.expr[':'].external = function(obj){
return !obj.href.match(/^myinforms\:/) && (obj.hostname != location.hostname);
};
$('a:external').click(function() {
var attr = $(this).attr('data-news');
if (typeof attr !== 'undefined' && attr !== false) {
var dn = $(this).attr("data-news");
var dn = dn.split('-');
var stat_num = dn[0];
var stat_rss = dn[1];
if(mi.country_id == ""){
var country_id = 0;
} else {
var country_id = mi.country_id;
}
$.ajax({
url: mi.baseurl + mi.lang_country+'/load/',
cache: false,
type: 'POST',
dataType: 'json', 
data: {stat_lng:mi.lang_id,stat_country:country_id,stat_rss:stat_rss,stat_num:stat_num,action:"addtostat"},
success: function(data){
//console.log(data.msg);
}
});
}
});

}
extclick();

setInterval(function() {
if(mi.current_page != "search"){
if(mi.current_page == "index" || mi.current_page == "rss" || mi.current_page == "blogs"){
//updateindex();
} else {
//updatenews(0);	
}
}
}, 5000);



jQuery.vote = function(count,datanews){

$.ajax({
url: mi.baseurl + mi.lang_country+'/load/',
cache: false,
type: 'POST',
dataType: 'json', 
data: {count:count,datanews:datanews,action:"voterating"},
success: function(data){
console.log(data.msg);
}
});




}



//end of jquery
});

