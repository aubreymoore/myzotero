jQuery.noConflict();

// Sticky navbar
jQuery(document).ready(function ($) {
        $(".engagement-bar")
            .sticky({topSpacing:0})
            .on('sticky-start', function() { $(".sticky-wrapper").next().css("margin-top", $(".engagement-bar").outerHeight(true)) })
            .on('sticky-end', function() { $(".sticky-wrapper").next().css("margin-top", "") });
        
        $("aside").find(".call-to-action").sticky({topSpacing:30});
});


// Wow
wow = new WOW(
    {
      offset:       100,          // default
      mobile:       false,
      live:         true    
    }
  )
  wow.init();