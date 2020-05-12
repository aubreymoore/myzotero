jQuery.noConflict();
jQuery(function($) { 

// DROP DOWN MENU
	// http://users.tpg.com.au/j_birch/plugins/superfish/#getting-started
	// http://users.tpg.com.au/j_birch/plugins/superfish/#options
	$(".sf-menu").supersubs({ 
			minWidth:    10,   // minimum width of sub-menus in em units 
			maxWidth:    27,   // maximum width of sub-menus in em units 
			extraWidth:  1     // extra width can ensure lines don't sometimes turn over 
							   // due to slight rounding differences and font-family 
		}).superfish({
			dropShadows:    false,
			delay:			400
			
							}); // call supersubs first, then superfish, so that subs are 
                         		// not display:none when measuring. Call before initialising 
                         		// containing tabs for same reason. 

	
	// Scroll to top animation
	$('.scroll-top').click(function(){ 
		$('html, body').animate({scrollTop:0}, 600); return false; 
	});
	
	
	// Hide parent on click (error messages, etc...)
	$('a.hideparent').click(function(){ 
		$(this).parent().fadeOut();
		return false;
	});

	
	// contact form validation
		var hasChecked = false;
		$(".standard #submit").click(function () { 
			hasChecked = true;
			return checkForm();
		});
		$(".standard #name,.standard #email,.standard #message").live('change click', function(){
			if(hasChecked == true)
			{
				return checkForm();
			}
		});
		function checkForm()
		{
			var hasError = false;
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

			if($(".standard #name").val() == '') {
				$(".standard #error-name").fadeIn();
				hasError = true;
			}else{
				$(".standard #error-name").fadeOut();
			}
			if($(".standard #email").val() == '') {
				$(".standard #error-email").fadeIn();
				hasError = true;
			}else if(!emailReg.test( $(".standard #email").val() )) {
				$(".standard #error-email").fadeIn();
				hasError = true;
			}else{
				$(".standard #error-email").fadeOut();
			}
			if($(".standard #message").val() == '') {
				$(".standard #error-message").fadeIn();
				hasError = true;
			}else{
				$(".standard #error-message").fadeOut();
			}
			if(hasError == true)
			{
				return false;
			}else{
				return true;
			}
		}
		// end contact form validation
		
		
		
}); // end jQuery