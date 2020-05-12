(function($){$(".search-form").on("submit",function(event){event.preventDefault();var searchTerm=$(this).find(".search-term").val();if(searchTerm=="")searchTerm=" ";var keywords=$("meta[name\x3d'news_keywords']").attr("content").split(",");var page=1;searchElasticUtils.item.regional=keywords[0].replace(/ /g,"-").toLowerCase();var elasticSearchUrl=searchElasticUtils.getElasticSearchUrl(searchTerm,1);var refPageElement=$(this).closest("div.form").data("refPageElement");if(refPageElement&&refPageElement!=
undefined&&refPageElement.length>0)cs.clickTag(refPageElement,"pv");searchElasticUtils.triggerSearch(elasticSearchUrl)});window.searchElasticUtils=window.searchElasticUtils||{item:{query:"",page:""},refreshItem:function(){searchElasticUtils.item.query=$("#re-search-term").val();searchElasticUtils.item.page=1},getElasticSearchUrl:function(search_term,page){term=search_term.replace(/ /g,"+");var searchUrl="/nzh-search/";var pathSplit=window.location.pathname.split("/");if(pathSplit.length>=5&&pathSplit[1]==
"nzh-search")searchUrl+=pathSplit[2]+"/";else if(oParams!==undefined&&oParams.publication!==undefined&&oParams.publication.length)searchUrl+=oParams.publication+"/";else searchUrl+="NZH/";searchUrl=searchUrl+term+"/";if(page!==undefined)searchUrl=searchUrl+page+"/";return searchUrl},triggerSearch:function(searchUrl){if(!searchUrl)searchUrl=this.getElasticSearchUrl(this.item.query,this.item.page);window.location=searchUrl}}})(jQuery);
(function($){var logger=new ARC.Tools.logger("sharebar");var sharebar={initHiddenShares:function(){var stopScrollingMobile=function(e){e.preventDefault();$("body").scrollTop($("body").scrollTop()+1);setTimeout(function(){$("body").scrollTop($("body").scrollTop()-1)},300)};$(".share-container").click(function(){$(this).siblings(".extra-shares").addClass("show-shares");$(this).siblings(".extra-shares")[0].addEventListener("touchmove",stopScrollingMobile,false);$("html, body").addClass("hidden-share-no-scroll")});
$(".extra-shares .share-close").click(function(){$(this).parent().removeClass("show-shares");$("html, body").removeClass("hidden-share-no-scroll");$(this).parent()[0].removeEventListener("touchmove",stopScrollingMobile)})},initBookmark:function(){$(".bookmark").click(function(){if($(this).hasClass("saved"))savedArticles.removeArticle();else{savedArticles.saveArticle();$(this).trigger("save_content")}})},init:function(){this.initHiddenShares();this.initBookmark();$(".social-tools a").on("click",function(){var $this=
$(this);var evenName=$this.find("img").attr("class").split(" ")[0];$this.trigger("share_content",{"name":evenName})})}};sharebar.init();var savedArticles={t:"",saved_id:"",init:function(){if(this.isSignedIn()){if($.cookie("nzh_b_cache")){bookmarkToSave=$.cookie("nzh_b_cache");$.removeCookie("nzh_b_cache",{path:"/",domain:".nzherald.co.nz"});this.saveArticle(bookmarkToSave)}this.checkSaved()}},getUrlParam:function(name){var results=(new RegExp("[?\x26]"+name+"\x3d([^\x26#]*)")).exec(window.location.href);
return results?results[1]:0},isSignedIn:function(){if($.cookie("syncData")){this.t=JSON.parse($.cookie("syncData")).t;return true}else return false},checkSaved:function(){var token=encodeURIComponent(this.t);var data='{"nzh-token":"'+token+'"}';$.ajax({type:"POST",url:"https://secure.nzherald.co.nz/api/SaveForLater/get/",data:data,contentType:"application/json",success:function(data){var currentObjId=savedArticles.getUrlParam("objectid");$(data.data.aUnread).each(function(){if(currentObjId==this.object_id){$(".bookmark").removeClass("svg-bookmark-icon").addClass("saved svg-bookmark-saved-icon");
savedArticles.saved_id=this.id}})},error:function(error){logger.log(error)}})},saveArticle:function(objectId){if(this.isSignedIn()){var token=encodeURIComponent(this.t);var object_id=objectId?objectId:this.getUrlParam("objectid");var object_type="";var data='{"nzh-token":"'+token+'","is_active":"1","object_id":"'+object_id+'","object_type_id":"1"}';$.ajax({type:"POST",url:"https://secure.nzherald.co.nz/api/SaveForLater/save/",data:data,contentType:"application/json",dataType:"text",success:function(data){$(".bookmark").removeClass("svg-bookmark-icon").addClass("saved svg-bookmark-saved-icon");
savedArticles.saved_id=data.split('saved_id":')[1].split("}")[0]},error:function(data){logger.log("Cannot save data")}})}else{var date=new Date;date.setTime(date.getTime()+5*60*1E3);var object_id=this.getUrlParam("objectid");$.cookie("nzh_b_cache",object_id,{expires:date,path:"/",domain:".nzherald.co.nz"});window.location="/account/profile/login/"}},removeArticle:function(){var token=encodeURIComponent(this.t);var saved_id=this.saved_id;var data='{"nzh-token":"'+token+'","is_viewed":"1","saved_id":"'+
saved_id+'"}';$.ajax({type:"POST",url:"https://secure.nzherald.co.nz/api/SaveForLater/mark/",data:data,contentType:"application/json",dataType:"text",success:function(data){$(".bookmark.saved").removeClass("saved svg-bookmark-saved-icon").addClass("svg-bookmark-icon")},error:function(error){logger.log(error)}})}};savedArticles.init()})(jQuery);
(function($){$(".share-button.facebook").click(function(){var picture=$(this).data("original");var url=$(this).data("url");FB.ui({app_id:0x5c78620a78b54,method:"feed",link:$(this).data("url"),picture:$(this).data("original")},function(response){})})})(jQuery);