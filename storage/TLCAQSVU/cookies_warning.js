$(function() {

    var $cookieSpacers = $('.js-cookie-spacer, .cookie-warning-space');

    if ($cookieSpacers.length === 0 || $.cookie("cookie_warning")) {
        return;
    }

    var $cookieWarning = $(".cookie-warning, .js-cookie-warning");

    $('body').addClass('has-cookie-warning');

    $cookieWarning.show( 400, function(){
        $cookieSpacers.css({ height: $(this).outerHeight() })

        $(".close-button, .js-cookie-warning-close").bind("click", function(evt){
            evt.preventDefault();

            $.cookie("cookie_warning", "seen_and_closed", { expires: 365, path: '/' });
            $('body').removeClass('has-cookie-warning');

            $cookieWarning.slideUp(400, function(){ });
            $cookieSpacers.slideUp(400, function() { $cookieSpacers.remove() });
        });
    });

    $(window).on('resize', onWindowResize);

    function onWindowResize(evt) {
        $cookieSpacers.css({ height: $cookieWarning.outerHeight() })
    }
});
