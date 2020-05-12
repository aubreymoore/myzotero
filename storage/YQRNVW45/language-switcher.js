jQuery.noConflict();


jQuery(document).ready(function ($) {
    // Variable list
    var $speed = 200;
    $languageSwitcher = $(".language-switcher");
    $languageSwitcherDesktop = $(".language-switcher__desktop");
    $languageSwitcherDesktopWrapper = $languageSwitcherDesktop.find(".language-switcher__wrapper");
    $languageSwitcherMobile = $(".language-switcher__mobile");
    $languageSwitcherOptions = $(".language-switcher__options");

    // Displays the language options on hover in desktop view
    $languageSwitcherDesktopWrapper.hover(
        function () {
            $languageSwitcherOptions.slideDown($speed);
            ariaOptionsVisible();
        }, 
        function () {
            $languageSwitcherOptions.slideUp($speed);
            ariaOptionsHidden();
        }
    );
      
    // Displays the language options when an element in the desktop wrapper has focus
    $languageSwitcherDesktopWrapper.focusin(function () {
        $languageSwitcherOptions.slideDown($speed);
        ariaOptionsVisible();
    });
    
    // Hides the language options when no elements in the desktop wrapper have focus    
    $languageSwitcherOptions.find("a").focusout(function(){
        $languageSwitcherOptions.slideUp($speed);
        ariaOptionsHidden();
    });
 
    // Hides the language options when on click once the header has become responsive
    $languageSwitcherMobile.find(".language-switcher").click(function () {
        $languageSwitcherOptions.slideToggle($speed, function() {});
        if($languageSwitcherMobile.hasClass("active")) {
            ariaOptionsHidden();
            $languageSwitcherMobile.removeClass("active");
        } else {
            
            $languageSwitcherMobile.addClass("active");
            ariaOptionsVisible();
        }
        
    });
     
    // Alters the aria attributes to make the functionality visible to screen readers    
    function ariaOptionsVisible() {
        $languageSwitcher.attr("aria-expanded","true");
        $languageSwitcherOptions.attr("aria-hidden","false");
    }
    
    // Alters the aria attributes to make the functionality invisible to screen readers
    function ariaOptionsHidden() {
        $languageSwitcher.attr("aria-expanded","false");
        $languageSwitcherOptions.attr("aria-hidden","true");
    }
});