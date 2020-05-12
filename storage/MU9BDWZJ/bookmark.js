var AOP=AOP||{};AOP.bookmarks={};(function($){var DATA_ATTR_NAME_PROD_ID='data-prod-id';var DATA_ATTR_NAME_PROD_TYPE='data-prod-type';var SERVICE_PREFIX=AOP.baseUrl+'/services/aop-cambridge-core/bookmark';var $bookmarksButton=$('.send-to-my-bookmarks');var $bookmarkSingleButton=$('[data-bookmark]');var ProductTypeFriendlyNameMap={BOOK:'book',BOOK_PART:'chapter',JOURNAL:'journal',JOURNAL_VOLUME:'volume',JOURNAL_ISSUE:'issue',JOURNAL_ARTICLE:'article',PUBLISHER_SERIES_COLLECTION:'collection',COLLECTION_COLLECTION:'collection'};function _getBookmarksCounts(bookmarkCollection){var bookmarks;var bookmarkCount=0;for(var bookmarkType in bookmarkCollection){if(bookmarkCollection.hasOwnProperty(bookmarkType)){bookmarks=bookmarkCollection[bookmarkType];bookmarkCount+=bookmarks.length;}}
return bookmarkCount;}
function _isLoggedIn(){return $('meta[data-logged-in]').length>=1;}
function _getAttributeFilter(attributeName){return function(){return $(this).get(0).hasAttribute(attributeName);};}
function _getItemInputs(){return $('input[type="checkbox"]').filter(_getAttributeFilter(DATA_ATTR_NAME_PROD_ID)).filter(_getAttributeFilter(DATA_ATTR_NAME_PROD_TYPE));}
function _getSelectedItemInputs(){return _getItemInputs().filter(':checked');}
function _getCurrentPath(){return window.location.pathname+ window.location.search;}
function _buildBookmarkCollection($itemNodes){var bookmarkCollection={};$itemNodes.each(function(){var $item=$(this);var itemType=ProductTypeFriendlyNameMap[$item.attr(DATA_ATTR_NAME_PROD_TYPE)];var itemProductId=$item.attr(DATA_ATTR_NAME_PROD_ID);bookmarkCollection[itemType]=bookmarkCollection[itemType]||[];bookmarkCollection[itemType].push({productId:itemProductId});});return bookmarkCollection;}
function _saveSelectedBookmarks(bookmarkCollection){var service=SERVICE_PREFIX+'/save';var serviceSaveForLogin=SERVICE_PREFIX+'/save-for-login';var $loginModal=$('#login-modal');if(!_getBookmarksCounts(bookmarkCollection)){createAlertBox(null,$('#ajaxMessages'),'alert','No content selected. Please select the content you would like to bookmark.');}else{if(_isLoggedIn()){$.post(service,{bookmarks:JSON.stringify(bookmarkCollection),_csrf:$('input[name="_csrf"]').val()}).done(function(resp){createAlertBox(null,$('#ajaxMessages'),resp.success?'info':'alert',resp.data?resp.data.message:'');});}else{$.post(serviceSaveForLogin,{bookmarks:JSON.stringify(bookmarkCollection),sourceId:window.location.pathname,redirectUrl:_getCurrentPath(),_csrf:$('input[name="_csrf"]').val()},function(result){if(result.success){$loginModal.find('.message').text('You need to be logged in to your Cambridge Core account in order to bookmark content.');$('.qtip').hide();$loginModal.foundation('reveal','open');}else{createAlertBox(null,$('#ajaxMessages'),'alert','Error saving bookmarks');}});}}}
function _selectProducts(bookmarkCollection){var selectCheckboxes=function(element){$('input[data-prod-id='+ element.productId+']').prop('checked',true);};if(_getBookmarksCounts(bookmarkCollection)){for(var bookmarkType in bookmarkCollection){if(bookmarkCollection.hasOwnProperty(bookmarkType)){var productList=bookmarkCollection[bookmarkType];if(Array.isArray(productList)){productList.forEach(selectCheckboxes);}}}}}
AOP.bookmarks.saveBookmarks=function(bookmarkCollection,opts){opts=opts||{};if(opts.selectProducts){_selectProducts(bookmarkCollection);}
_saveSelectedBookmarks(bookmarkCollection);};AOP.bookmarks.saveMultiple=function(){var selectedInputs=_getSelectedItemInputs();var bookmarkCollection=_buildBookmarkCollection(selectedInputs);AOP.bookmarks.saveBookmarks(bookmarkCollection);};AOP.bookmarks.saveSingle=function(el){el=!el?$('[data-bookmark]').first():el;var bookmarkCollection=_buildBookmarkCollection(el);AOP.bookmarks.saveBookmarks(bookmarkCollection);};$(function(){$bookmarksButton.on('click',function(evt){evt.stopPropagation();evt.preventDefault();AOP.bookmarks.saveMultiple();});$bookmarkSingleButton.on('click',function(evt){evt.stopPropagation();evt.preventDefault();AOP.bookmarks.saveSingle($(this));});});}(jQuery));