function _jsload(src){var sc=document.createElement("script");sc.type="text/javascript";sc.async=true;sc.src=src;var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(sc,s);};(function(){document.getElementById("unit_89842").innerHTML="<div id=\"container_89842\"> <div id=\"header_89842\"> <span>Trending News</span> <div class=\"\"></div> <a href=\"//idealmedia.com\" target=\"_blank\" rel=\"nofollow\" class=\"poweredby\">Powered by Ideal Media</a> </div> </div><style>#container_89842 { box-sizing: border-box; margin: 0 auto; padding: 22px 7px 50px; } #container_89842 #header_89842 { padding: 0 0 14px; position: relative; } #container_89842 #header_89842 span { display: inline-block; font-family: Arial, Helvetica, sans-serif; color: #5a5a5a; font-size: 2rem; line-height: 24px; font-weight: bold; position: relative; } #container_89842 #header_89842 .poweredby { font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: normal; color: #5a5a5a; text-decoration: none; position: absolute; bottom: 14px; right: 0; } #container_89842 #header_89842 .poweredby:hover { text-decoration: underline; } #container_89842 .list-container { font-size: 0; } #container_89842 .list-container-item { display: inline-block; vertical-align: top; width: 50%; box-sizing: border-box; padding: 8px 0; } #container_89842 .list-container-item:nth-child(2n+1) { padding-right: 10px; } #container_89842 .list-container-item .innerWrap { } #container_89842 .list-container-item .innerWrap:after { border-bottom: 1px dotted #ccc; clear: both; content: \" \"; display: block; height: 3px; width: 100%; } #container_89842 .list-container-item .imgFrame { } #container_89842 .list-container-item .image { display: block; border: none; float: left; margin: 7px 12px 8px 0; } #container_89842 .list-container-item .title { display: block; font-family: Arial, Helvetica, sans-serif; font-size: 2rem; line-height: 22px; font-weight: bold; text-align: left; color: #313d57; text-decoration: none; word-wrap: break-word; padding: 0 0 4px; } #container_89842 .list-container-item .title:hover { text-decoration: underline; } #container_89842 .list-container-item .anons { font-family: Arial, Helvetica, sans-serif; color: #4e4e4e; font-size: 1.4rem; line-height: normal; padding: 3px 0 10px; } #container_89842 .list-container-item .clear { clear: left; }</style>";var cb=function(){/** * Размер страницы (количество) загружаемых элементов * * @type {number} */ var page_size = 4; /** * Максимальное количество загружаемых страниц элементов * * @type {number} */ var max_page_count = 1; /** * Родительский элемент контейнера * * @type {HTMLElement} */ var parent_element = JsAPI.Dom.getElement("container_89842"); /** * Настройки блока * * @type {*} */ var properties = undefined; /** * Callback-функция рендера содержимого элемента * * @type {function(HTMLElement, *, number)} */ var item_content_renderer = function (parent, model, index) { JsAPI.Dom.appendChild(parent, JsAPI.Dom.createDom('div', 'innerWrap', [ JsAPI.Dom.createDom('a', { 'href': model['url'], 'target': '_blank', 'rel': 'nofollow', 'class': 'imgFrame' }, JsAPI.Dom.createDom('img', { 'class': 'image', 'src': model['image'] })), JsAPI.Dom.createDom('a', { 'href': model['url'], 'target': '_blank', 'rel': 'nofollow', 'class': 'title' }, model['title']), JsAPI.Dom.createDom('div', 'anons', model['text']), JsAPI.Dom.createDom('div', 'clear') ])); }; /** * Идентификатор блока * * @type {number} */ var block_id = 89842; /** * Маска требуемых параметров (полей) статей * * @type {number|undefined} */ var opt_fields = JsAPI.Dao.NewsField.TITLE | JsAPI.Dao.NewsField.IMAGE | JsAPI.Dao.NewsField.TEXT; /** * Создание list-блока */ JsAPI.Ui.ListBlock({ 'page_size': page_size, 'max_page_count': max_page_count, 'parent_element': parent_element, 'properties': properties, 'item_content_renderer': item_content_renderer, 'block_id': block_id, 'fields': opt_fields }, function (block) {}, function (reason) {});};if(!window.jsapi){window.jsapi=[];_jsload("//static.fark.com/static/jsapi/jsapi.v1.8.3.en_IN.js");}window.jsapi.push(cb);}());window.ttsmi2_data={blockid:89842,siteid:43083};if(!window.smi2TrackerSend){window.smi2TrackerSend={};var a=window.ttsmi2_data||{};a.bw=window.innerWidth;a.bh=window.innerHeight;var b=document.referrer;b&&""!=b&&(a.ref=b);a.rnd=Math.floor(1E13*Math.random());var c=[],d;for(d in a)a.hasOwnProperty(d)&&c.push(encodeURIComponent(d)+"="+encodeURIComponent(a[d]));var e=new Image;e.width=1;e.height=1;e.src="//target.smi2.net/init/?"+c.join("&")};