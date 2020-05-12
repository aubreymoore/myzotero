jQuery.noConflict();

// Sticky navbar
jQuery( document ).ready(function($) {
	var $transcriptControl = $(".inline__transcript-control");
	var $transcript = $(".inline__transcript");
	
	if($transcript.length > 0) {
		$transcriptControl.click(function() {
            if($(this).hasClass("active")) {
                
                $(this).attr("aria-expanded","false").text($(this).text().replace("Hide","Show"));
                $(this).removeClass("active").closest(".inline-media__wrapper").find(".inline__transcript").slideUp("200");
            } else {
                console.log(1);
                $(this).attr("aria-expanded","true").text($(this).text().replace("Show","Hide"));
                console.log($(this).html());
                $(this).addClass("active").closest(".inline-media__wrapper").find(".inline__transcript").slideDown("200").css("overflow-y","scroll");
            }
            
            return false;
		});
	}
});