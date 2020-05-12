jQuery.noConflict();

// modal search
jQuery(document).ready(function ($) {
    window.bindSearch = function () {
        
        // Variables.
        $body = $("body");
        $modalbackground = $(".modal__bg");
        $header = $("header");
        $navMobileSearch = $(".nav__mobile--search");
        $globalSearch = $(".global__search");
        $navSearchIcon = $(".nav__search-icon");
        $navSearchButton = $(".nav__search-button");
        
        // Opens the search in mobile view.
        $navMobileSearch.unbind("click").click(function() {
            if ($body.hasClass("search__active")) {
                closeSearchModal();
            } else {
                 // Closes the draw if it's open.
                if($header.hasClass("menu-open")) {
                    $(".nav__mobile--menu").trigger("click");
                } 
                $modalbackground.addClass('active');
                $header.css("z-index", "9999");
                $globalSearch.fadeIn(600).addClass("active");
                $body.addClass("search__active");
               
            }
        });

        // Opens the search in desktop view.
        $navSearchButton.click(function () {
            if ($body.hasClass("search__active")) {
                // Swaps the icon back to a search icon.
                $navSearchIcon.removeClass("fa-times").addClass("fa-search");
                closeSearchModal();
            } else {
                $modalbackground.addClass('active');
                $header.css("z-index", "9999");
                $globalSearch.fadeIn(600).addClass("active");
                $body.addClass("search__active");
                $(".global__search").find("input").focus();
                // Swaps the icon to a x.
                $navSearchIcon.removeClass("fa-search").addClass("fa-times");
            }
        });
        
        
        $(".global__search").find(".btn").focusout(function() {
           $navSearchButton.trigger( "click" );
        });

        // Closes the search is a user presses the escape key.
        $(document).keyup(function (e) {
            if (e.keyCode == 27 && $body.hasClass("search__active")) {
                $( ".nav__search-button" ).trigger( "click" );
                return false;
            }
        });

        // Closes the search is the background is clicked.
        $modalbackground.click(function (e) {
            if (($(e.target).closest('.global__search').length == 0) && ($('.search__active').length > 0)){
                $navSearchButton.trigger( "click" );
                return false;
            }
        });

        // Closes the menu.
        function closeSearchModal() {
            $header.css("z-index", "5");
            $globalSearch.hide().removeClass("active");
            $modalbackground.removeClass("active");
            $body.removeClass("search__active");
        }
    }
    bindSearch();
});