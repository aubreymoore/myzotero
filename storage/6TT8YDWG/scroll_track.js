
$(document).ready(function() {

    var scrolling = false;
    var track_scrolling = true;

    $( window ).scroll( function() {
        scrolling = true;
    });

    setInterval( function() {
        if ( scrolling && track_scrolling ) {
            scrolling = false;
            var docScroll = $(document).scrollTop();
            var wrapper = $('#story');
            var wrapperTop = wrapper.offset().top;
            var wrapperHeight = wrapper.innerHeight();
            var wrapperBottom = wrapperTop + wrapperHeight;
            var eventPosition =  wrapperBottom - $(window).height() - 300;

            if(docScroll >= eventPosition) {
                track_scrolling = false;
                console.log('end ' + eventPosition);
                var path = window.location.pathname.split('/');
                var lang = path[1];
                var url = '/'+lang+'/track/';

                var id = wrapper.data("id");

                var views = {};
                views.story = [];
                views.story.push( id );
                var data = {views: views};

                $.post({
                url: url,
                data: data,
                success: function(data) {console.log(data);}
                });

            }
        }
    }, 250 );

});


