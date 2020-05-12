jQuery.noConflict();
jQuery(document).ready(function ($) {
    
    // Variables.
    $checkbox = $(".checkbox");
    $radio = $(".radio");
    $form = $("form.text-left");
    
    // Adds styles to the form elements depending on what state they are in.
    $(".form-control")
        .on('focus', function() {
            $(this).closest('.form-group').addClass('form-group--active');
        }).on('blur', function() {
            $(this).closest('.form-group').removeClass('form-group--active');
            
        // If no content was entered it returns to it's original state.
        if ($(this).val() != '') {
            $(this).closest('.form-group').addClass('form-group--complete');
        } else {
            $(this).closest('.form-group').removeClass('form-group--complete');
        }
    });
    
    // Formats the sitecore checkboxes.
    $checkbox.addClass("isformatted");

    // If a user clicks the div and not the label/checkbox.
    $checkbox.click(function () {
        if($(this).closest(".filter").length == 0) {
            $div = $(this);
            if ($div.hasClass('isChecked')) {
                $div.removeClass("isChecked");
                $div.find("input").attr("checked", false);
            } else {
                $div.addClass("isChecked");
                $div.find("input").attr("checked", true);
            }
        }
    });
    
    // Changes the format of the checkbox depending on what state it is in.
    $checkbox.find("input").focus(function() {
           $(this).closest(".checkbox").addClass("hasFocus");
    });
    
    $checkbox.find("input").blur(function() {
           $(this).closest(".checkbox").removeClass("hasFocus");
    });
    
    // Formats the sitecore checkboxes.
    $radio.addClass("isformatted");
    
    // Changes the format of the checkbox depending on what state it is in.
    $radio.find("input").click(function() {
        $(this).closest(".form-group").find(".radio").removeClass("isChecked");
        if($(this).is(':checked')) {
            $(this).closest(".radio").addClass("isChecked");
        } 
    });
    $form.find("input[type='submit']").click(function () {
        setTimeout(checkFormVal, 200);
    });
    function checkFormVal()
    {
        if (!$form.find("input").hasClass("input-validation-error")) {
            // disable button
            $btn = $form.find("input[type='submit']");
            $btn.attr("disabled", "disabled");
            $btn.val("Sending...");
        }
    }

});