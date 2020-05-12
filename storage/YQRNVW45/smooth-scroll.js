jQuery.noConflict();

// Smooth scroll
// Adapted from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
jQuery(document).ready(function ($) {
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          console.log("this one");
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 200);
            return false;
          }
        }
      });
    });
});