
$(document).ready(function() {

    // Get a reference to the <path>
    var path = document.querySelector('#star-path');
    var wrapper = document.querySelector('#star-wrapper');

    // Get length of path...
    var pathLength = path.getTotalLength();

    // Make very long dashes (the length of the path itself)
    path.style.strokeDasharray = pathLength + ' ' + pathLength;

    // Offset the dashes so the it appears hidden entirely
    path.style.strokeDashoffset = pathLength;

    // Jake Archibald says so
    // https://jakearchibald.com/2013/animated-line-drawing-svg/
    path.getBoundingClientRect();
    var wrapperrect = wrapper.getBoundingClientRect();

    // When the page scrolls...
    window.addEventListener("scroll", function(e) {

        //console.log(wrapperrect.top);
        // What % down is it?
        // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
        // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
        // var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        
        var docScroll = $(document).scrollTop();

        var wrapperTop = $("#star-wrapper").offset().top - (document.documentElement.clientHeight * 0.7);


        if(docScroll >= wrapperTop){

            $('#star-svg').fadeIn();
            $('#star-wrapper-text').fadeIn();
            var scrollWidth = (docScroll - wrapperTop);

            var wrapperHeight = wrapperrect.height - (document.documentElement.clientHeight * 0.4);

            var scrollPercentage = (scrollWidth / wrapperHeight);
            console.log(scrollPercentage);
        } else {
            $('#star-svg').fadeOut();
            $('#star-wrapper-text').fadeOut();
        }

        var bg_scroll = scrollPercentage * 0.5;

        if(bg_scroll >= 0.05){
            $( "#star-wrapper-bg" ).css("opacity", bg_scroll);
        }

        // Length to offset the dashes
        var drawLength = pathLength * scrollPercentage;

        // Draw in reverse
        path.style.strokeDashoffset = pathLength - drawLength;

        // When complete, remove the dash array, otherwise shape isn't quite sharp
        // Accounts for fuzzy math
        if (scrollPercentage >= 0.99) {
            path.style.strokeDasharray = "none";

        } else {
            path.style.strokeDasharray = pathLength + ' ' + pathLength;

        }
        var url = "https://healthcare-in-europe.com/" + $("#star-wrapper").data("lang") + "/home/index.html?src=scrollto";

       if (scrollPercentage >= 1) {
           $(window).attr('location',url);
       }

    });


});


