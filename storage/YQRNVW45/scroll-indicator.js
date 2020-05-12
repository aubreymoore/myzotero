jQuery.noConflict();

jQuery( document ).ready(function($) {
    $(".banner__scroll-indicator").click(function() {
        var test = $(this).closest(".bgi").height();
        $('html, body').animate({
            'scrollTop' : test + 75
        });
    });
});