/*custom.js*/

/* Specific content needs to be copied and pasted in sj:div files */
/* it is simply importaed in the main page */

jQuery( document ).ready(function( $ ) {
	// autoheightblocks function (gives sidebar same height as main column)
	function autoheightblocks (event) {
		if(event){
			event.preventDefault();
		}
		var mainheight = $('.main_record').outerHeight() + 20;
		$('.grey-sidebar').css('height',mainheight);
	}

	function time(){
		setTimeout(function(){
			autoheightblocks();
			var mainheight = $('.main-container').height();
		}, 3000);
	}
	
	 function scrollTo(element){
		    $('html,body').animate({
		      scrollTop: element.offset().top
		    }, 'slow');
		  }

	//debouncing function
	(function($,sr){

		var debounce = function (func, threshold, execAsap) {
			var timeout;

			return function debounced () {
				var obj = this, args = arguments;
				function delayed () {
					if (!execAsap)
						func.apply(obj, args);
					timeout = null;
				};

				if (timeout)
					clearTimeout(timeout);
				else if (execAsap)
					func.apply(obj, args);

				timeout = setTimeout(delayed, threshold || 100);
			};
		}
		// smartresize
		$.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

	})($,'smartresize');
	
	//tooltip

	$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
	
	
	  //function to scroll to the clicked block

	  $('#sidebar-show .collapse').on('shown.bs.collapse', function(event){
	    var element = $(event.target).parent();
	    scrollTo(element);
	  });

	  $('.main_record .collapse').on('shown.bs.collapse', function(event){
	    var element = $(event.target).parent().parent();
	    scrollTo(element);
	  });

	var wdth = $(window).width(); //check device width

	// sidebar on desktop screen
	if (wdth > 990) {
		$('#sidebar-show').addClass('in');  // shows ever sidebar content on desktop view
		time();
		$(window).smartresize(function(event){ //debug resize
			autoheightblocks(event); // gives sidebar same height as main column on resize
		});
		$(window).load(function(event){
			autoheightblocks(event); // gives sidebar same height as main column on load
		});
		$('.collapse').on('shown.bs.collapse', function(event){
			autoheightblocks(event); // assign to sidebar same height of main column when collapse are opened
		});
		$('.collapse').on('hidden.bs.collapse', function(event){
			autoheightblocks(event); // then gives sidebar same height as main column
		});
	}

	// rotate arrow icon on collapse element
	$('.btn-collapse').click(function() {
		$(this).find('.icon').toggleClass('rotate-up');
	});

	// change plus and minus icon for collapse element on sidebar block and title sidebar for mobile
	$('.title-sidebar .btn-icon-collapse').click(function(){
		$(this).find('.icon').toggleClass('hidden');
	});


});
