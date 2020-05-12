var gGetNumbersOfCartItems = '/api/cart/items';
var gAddToCartUrl = '/api/order';
var LANG = {};
getLang();

addEventListener("add_to_cart", function(){
	getNumberOfCartItems();
});

$(document).ready(function () {
	initFooterAccordeon('footer-accordion');
});

function getNumberOfCartItems(){
	if($('#number_of_cart_items').length == 0){
		return;
	}
	$.ajax({
		url : gGetNumbersOfCartItems,
		async : false,
		success : function(pAjaxResult) {
			if(pAjaxResult){
				$('#number_of_cart_items').html(pAjaxResult['data'].length);
				if(Number(pAjaxResult['data'].length)){
					$("#cart").css("display", "flex");
				}
			}
		}
	});
}
function addToCart(pId, pProductId, pQtty){
	$('#basket_loading_popup_'+pId).css('display', '');
	setTimeout(function() {
		$.ajax({
			url : gAddToCartUrl,
			type: "POST",
			data: {
				id: pId,
				product_id: pProductId,
				qtty: pQtty
			},
			async : false,
			success : function(pAjaxResult) {
				getNumberOfCartItems();
				if(pAjaxResult.responseStatus == 200){
					$.ajax({
						url: gArticleAjaxSrv,
						dataType: 'json',
						data: {
							article_id: pId,
							// item_name: pAjaxResult.data.created_basket.item_name,
							// qtty: pAjaxResult.data.created_basket.qtty,
							// total: pAjaxResult.data.created_basket.total,
							num_items: pAjaxResult.data.basket.length,
							action: 'add_to_basket_popup',
						},
						type: 'POST',
						success: function (pAjaxResult) {
							$('#basket_loading_popup_'+pId).hide();
							$('#basket_popup_'+pId).html(pAjaxResult.html);
							$('#basket_popup_'+pId).fadeIn("slow");
							$('#basket_popup_'+pId).delay(3000).fadeOut("slow");
						}
					});
				}

			},
			error: function (jqXHR, textStatus, errorThrown) {
				if (errorThrown == 'Unauthorized') {
					window.location.replace("/login.php?redirurl=" + encodeURIComponent(window.location.href));
				}
			},
		});
	}, 0);

}
window.addEventListener("load", getNumberOfCartItems);
function showOrcidAuthorization(pOrcidUrl, pLink) {
	clearCodeParam(1);
	$.ajax({
		url: pOrcidUrl + 'userStatus.json?logUserOut=true',
		dataType: 'jsonp',
		success: function () {
			window.location.href = pLink;
		},
		error: function () {
			window.location.href = pLink;
		}
	});
}

function clearCodeParam(pProviderId) {
	//get full url
	var url = window.location.href;
	//get url after/
	var value = url.substring(url.lastIndexOf('/') + 1);
	//get the part after before ?
	var newUrl = value.split("?")[0];
	//here you pass whatever you want to appear in the url after the domain /
	window.history.pushState("", "", "/" + newUrl + '?provider_id=' + pProviderId);
}

function CommonPopUpAction(pAction, pData, pDynamicWidth) {
	var lData = 'action=' + pAction + '&';
	lData += (typeof pData !== "undefined" ? pData : '');
	$.ajax({
		url: '/ajax_srv.php',
		dataType: 'json',
		data: lData,
		beforeSend: function() {
//			blockUi();
		},
		success: function (pAjaxResult) {
			if(typeof pAjaxResult['err_msg'] !== "undefined" && pAjaxResult['err_msg'] !== '' && pAjaxResult['err_msg'] !== null) {
				alert(pAjaxResult['err_msg']);
				return;
			}
			if(typeof pAjaxResult['eval_js'] !== "undefined" && pAjaxResult['eval_js'] !== "") {
				eval(pAjaxResult['eval_js']);
				return;
			}
			if(typeof pAjaxResult['html'] !== "undefined") {
				$('#P-General-Popup-Content').html(pAjaxResult['html']);
				popUp(POPUP_OPERS.open, 'P-General-Popup-Content', 'P-General-Popup-Content', pDynamicWidth);
			}
		},
		complete: function() {
//        	unblockUi();
		}
	});
}

function initFooterAccordeon(pElem) {
	var windowWidth = $(window).width();
	if(windowWidth <= 765){
		$('#' + pElem).find('.footer-accordion-toggle').click(function () {
			if($('.footer-accordion-content').is(':visible')) {
	//			$(".accordion-content").slideUp(300);
	//			$(".plusminus").text('+');
			}
			if($(this).next(".footer-accordion-content").is(':visible')) {
				$(this).next(".footer-accordion-content").slideUp(300);
				$(this).children(".plusminus").text('+');
			} else {
				$(this).next(".footer-accordion-content").slideDown(300);
				$(this).children(".plusminus").text('-');
			}
		});
	}

}

/**
 * jquery clickoff event
 * detects click outside given element
 * (used in Article preview iframe)
 * @param {type} $
 * @returns {undefined}
 */
(function ($) {
    $.fn.clickOff = function (element, callback) {
        var clicked = false;
        var parent = this;

        parent.click(function () {
            clicked = true;
        });
        element.click(function (event) {
            if(!clicked) {
                callback(parent, event);
            }
            clicked = false;
        });
    };

}(jQuery));

function switch_language(pLangCode, canLocated) {
    if(canLocated){
        window.location.href = updateQueryStringParameter(location.href, 'lang', pLangCode)
    }
}
function init_lang_switcher(){
    var el = $("#language_switcher");
    var toggleClassName = 'show';
    el.find("li.visibility_hidden > a").appendTo("#selected_language");

    $( ".language_switcher" ).click(function(e){
        el.toggleClass( toggleClassName )
    })
    $(document).scroll(function(){
        el.removeClass( toggleClassName );
    })
    $("#selected_language").clickOff($('body'), function (p, e) {
        el.removeClass(toggleClassName);
    });
}

function getLang() {
	$.ajax({
		url : '/lib/ajax_srv/lang_srv.php',
		async : false,
		dataType : 'json',
		success: function(pAjaxResult) {
			if(pAjaxResult !== null){
				LANG = pAjaxResult;
			}

		}
	});
}

function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

function getParameterByName(name, string) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(string);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function cancelUserRCSendClaim(){
	$.ajax({
		url: '/ajax_srv.php',
		async : false,
		dataType : 'json',
		data: {
			action: 'cancel_user_RC_send_claim'
		},
		success: function(pAjaxResult) {
			if(pAjaxResult !== null){
				popUp(POPUP_OPERS.close, 'P-General-Popup-Content', 'P-General-Popup-Content');
			}
			location.reload();
		}
	});
}

