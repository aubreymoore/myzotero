jQuery.noConflict();


jQuery(document).ready(function ($) {
    if ($(".modal").length > 0) {

        // Variables.
        $modal = $(".modal");
        $modalBackground = $(".modal__bg");
        $modalContainer = $(".modal__container");
        $modalContent = $(".modal__content");
        $magnifyMedia = $(".inline__magnifiy-media");
        $body = $("body");

        // Opens the modal via the icon on the inline media.
        $magnifyMedia.click(function () {
            $(".activecontainer").removeClass("activecontainer");
            $(this).closest(".inline-image").addClass('activecontainer');
            var $container = $(this).closest(".inline__media__wrapper");
            $media = '';
            $image = $(this).closest(".inline-image").find(".inline__media").eq(0);
            var $media = $image.clone();
            if($image.get(0).naturalHeight >= 957) {
                $imageMaxWidth = $image.width() + ($image.width()* 0.10);
                $(".activecontainer").find(".modal").css("max-width",$imageMaxWidth);
            } 
            openModal($media, $container);
            return false;
        });

        // Closes the modal via the close button.
        $modal.find(".close").click(function () {
            closeModal();
            return false;
        });

        // Closes a modal when a user clicks anywhere other than within it.
        $modalBackground.click(function (e) {
            if (($(e.target).closest('.modal__container').length == 0) && ($(".activecontainer").length > 0)) {
                closeModal();
                return false;
            }
        });

        // Closes the modal using the escape key.
        $(document).keyup(function (e) {
            if (e.keyCode == 27 && $body.hasClass("modal__active")) {
                //if ($('.modal__contact').length > 0) {
                 //   $('.modal__contact').slideUp(200);
                    
               // }
                $(".contact-form__modal").hide();
                closeModal();
             
            }
        });

        // Opens the modal.
        function openModal($media, $container) {
            $body.addClass("modal__active");
            // Empties anything that maybe in the modal at the moment.
            $(".activecontainer").find(".modal").find(".modal__content").empty();
            // Appends the new image to the modal.
            $(".activecontainer").find(".modal").find(".modal__content").append($media).show();
            $image = $(".activecontainer").find(".modal").find(".modal__content").find("img");
            $modalBackground.addClass("active");
            // Gives focus to the modal.
            $(".activecontainer").find(".modal").find("a").focus();
            // Shows the modal.
            $(".activecontainer").find(".modal").fadeIn();
            return false;
        }

        // Closes the modal.
        function closeModal() {
            $body.removeClass("modal__active");
            $modal.fadeOut();
            $modalBackground.removeClass("active");
            return false;
        }

    }

});