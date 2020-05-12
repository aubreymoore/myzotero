jQuery.noConflict();

jQuery(document).ready(function($) {
    
    $(".gallery__control").css('opacity','1');
    $(".gallery__content").css('display','flex');
    
    // Based on the position of the active panel, this function may disable or enable
    // either the forward or backward button.
    function directionalButtons() {
        if ($(".gallery__panel--active").prev().length == 0) {
            $(".gallery__control--backward").prop("disabled", true);
        } else {
            $(".gallery__control--backward").prop("disabled", false);
        }

        if ($(".gallery__panel--active").next().length == 0) {
            $(".gallery__control--forward").prop("disabled", true);
        } else {
            $(".gallery__control--forward").prop("disabled", false);
        }
    }

    // Initializes the buttons. The backwards one will be disabled first.
    directionalButtons();

    // Control for the backward button.
    $(".gallery__control--backward").click(function() {
        $newpanel = $(".gallery__panel--active").prev();
        $oldpanel = $(".gallery__panel--active");

        $(".gallery__content").animate({
                marginLeft: "+=100%"
            }, {
                duration: 400,

                complete: function() {
                    $oldpanel.removeClass('gallery__panel--active').attr('aria-hidden','true');
                    $newpanel.addClass("gallery__panel--active").attr('aria-hidden','false');
                    directionalButtons();
                }
            }

        );

    });

    // Control for the forward button.
    $(".gallery__control--forward").click(function() {
        $newpanel = $(".gallery__panel--active").next();
        $oldpanel = $(".gallery__panel--active");
        
        $(".gallery__content").animate({
                marginLeft: "-=100%"
            }, {
                duration: 400,

                complete: function() {
                    $oldpanel.removeClass('gallery__panel--active').attr('aria-hidden','true');
                    $newpanel.addClass("gallery__panel--active").attr('aria-hidden','false');
                    directionalButtons();
                }
            }

        );

    });
});