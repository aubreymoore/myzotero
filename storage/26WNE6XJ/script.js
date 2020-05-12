function toFixeda(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}

(function($){
	$(".product-row .second input").on("keyup", function(){
			if(/[^0-9]/g.test($(this).val())){
				$(this).val($(this).val().replace(/[^0-9]/,''));
			}

			var qty = + $(this).val();
			var price = + $(this).parents(".product-row ").find('.h_price').val();
			$(this).parents(".product-row ").find('.product-price').html("$" + qty * price);


			var totals = 0;
			$('.product-price').each(function(){
				var pname =  $(this).parents(".product-row ").find('.h_option').val(); 
				if(pname == 'freight' || pname == 'gst' || pname == 'total'){
					return;
				}
				totals += + $(this).html().replace("$",'');
			});

			if(false && totals < 200) {
				totals += 5;
				$(".freight .product-row .product-price").html("$" + 5);
			} else {
				$(".freight .product-row .product-price").html("N/A");
			}



			$(".gst .product-row .product-price").html("$" +  toFixeda( totals * 0.15,2 ));
			$(".ttotal .product-row .product-price").html("$" + toFixeda( totals * 1.15 ,2 ));


		})
})(jQuery);