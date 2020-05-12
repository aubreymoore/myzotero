$(document).foundation()
	$("#full-description").addClass("js-enabled");
	$('#sjpw-description').css("cursor","pointer");

	$('#show-description').click(function() {
		$(this).toggleClass("extended");
		$("#full-description").toggleClass("expanded");
		$('#show-description').hide();
	});
	$('#hide-description').click(function() {
		$(this).toggleClass("extended");
		$("#full-description").toggleClass("expanded");
		$('#show-description').show();
	});
	$("#btnDHsubscribe").click(function(){ 	  
		$(this).target = "_blank";
		window.open('https://doublehelixshop.csiro.au/');
		return false;
	});
  