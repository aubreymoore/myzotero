jQuery.noConflict();
jQuery(document).ready(function ($) {
    
    // Variables.
    $modal__contact = $(".contact-form__modal");
    $modalBackground = $(".modal__bg");
    $body = $("body");
    $openingButton="";
    

    // Opens the modal.
    $(".contact-form-control").click(function () {
       $openingButton = $(this);
        openContactModal($modal__contact);
        return false;
    });

    // Closes the modal via the x icon.
    $(".contact-form__modal").find(".close").click(function () {
        closeContactForm();
        return false;
    });

    // Opens the modal.
    function openContactModal($modal__contact) {
        $body.addClass("modal__active");
        $modalBackground.addClass("active");
        $modal__contact.fadeIn(50);
        $('.contact-form__content').find("input").first().focus();
        
        if($(".header-nav__mobile").is(":visible")) {
            target = $('#contact-form');
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
        }

        return false;
    }
    
    // Closes the contat us form using the escape key.
    $(document).keyup(function (e) {
        if (e.keyCode == 27 && $body.hasClass("modal__active")) {
            closeContactForm();
           
        }
    });

    // Closes the modal.
    function closeContactForm() {
        $body.removeClass("modal__active");
        $modal__contact.hide();
        $modalBackground.removeClass('active');
        $openingButton.focus();
        return false;
    }

    // Closes the modal when a user clicks the background. 
    $modalBackground.click(function (e) {
        if ($(e.target).closest(".contact-form__modal").length == 0) {
            closeContactForm();
            return false;
        }
    });
});