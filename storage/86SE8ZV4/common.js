$(document).ready(function(){			
	$("#btnSearch").click(function(){ 	   	   
		$("#cpgstp").submit();
	});
	$("#btnDHsubscribe").click(function(){ 	  
		$(this).target = "_blank";
		window.open('https://doublehelixshop.csiro.au/');
		return false;
	});
}); 
