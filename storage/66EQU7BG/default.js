////default JavaScript

//Responsive Navigation Menu Script
//VERY IMPORTANT!!! Script below establishes a class to NowNav for Responsive.
$(document).ready(function(){
	$('nav ul li').has('ul').addClass('has-submenu');
	//$('nav ul li').has('ul').addClass('navSpace');
	$('nav ul li ul').addClass('has-submenu');
	$('nav ul li ul li').has('ul').addClass('has-submenu');
	$('nav ul li ul li ul').addClass('sub-menu');
});

jQuery( document ).ready( function( $ ) {
		var windowWidth = $(window).width();
		
		$('body').addClass('js');
		  var $menu = $('#menu'),
		  	  $menulink = $('.menu-link'),
		  	  $menuTrigger = $('.has-submenu > a');

		$menulink.click(function(e) {
		if (windowWidth < 769) {
			e.preventDefault();
			}
			$menulink.toggleClass('active');
			$menu.toggleClass('active');
		});

		$menuTrigger.click(function(e) {
		if (windowWidth < 769) {
			e.preventDefault();
			}
			var $this = $(this);
			$this.toggleClass('active').next('ul').toggleClass('active');
		});
		
		if (windowWidth < 769) {
			$('.menu li a').each( function(){
    		var $this = $(this);
			$newLI = $('<li>').append( $this.clone() );
    		$newLI.prependTo($this.next('ul'));
			});
			}
});

$(document).ready(function(){
		
			$('#xrefBox-placeholder').html(  $('#tertiaryplaceholder').html()  );
		
		});


	$(document).ready(function(){
		$('.expandContent').hide();
		//toogle class
		$("a.expandReadLink").click(function(){
			$(this).parent().next('.expandContent').toggle('slow');
		return false;
  });
});
		
		
		
		
$.fn.hoverClass = function(c) {
	return this.each(function(){
		$(this).hover( 
			function() { $(this).addClass(c);  },
			function() { $(this).removeClass(c); }
		);
	});
};	  

function of(x){
x.style.display='none';
document.getElementById('p').style.display='inline';
document.getElementById('p').focus();
};

function ob(x){
x.style.display='none';
document.getElementById('t').style.display = 'inline';
document.getElementById('t').value = (x.value) ? '' : 'password ';
};

function onAfter() {
	$('.swapitem').css({
        height: 250,
        width: 615
    });
}

function toggleItem(d){
	d = "#" + d;
	$(d).toggle("fast");
}






	
	
	
