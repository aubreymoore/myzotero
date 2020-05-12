jQuery.noConflict();
jQuery(document).ready(function ($) {
    window.bindSubscribe = function () {
        function validateEmailSubscribe(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
        // subscribe methods
        $("#sn_email").keyup(function (e) {
            if (e.keyCode == 13) {
                subscribe();
            }
        });
        window.subscribe = function () {
            var email = $("#sn_email").val();
            if (!validateEmailSubscribe(email)) {
                $("#sn_emailvalidate").show();
                $("#sn_form").addClass("error");
                $("#sn_error").hide();
                return;
            }
            $("#sn_emailvalidate").hide();
            $("#sn_error").hide();
            $("#sn_form").removeClass("error");
            $("#sn_form").hide();
            $("#sn_btn").disabled = true;
            $("#sn_sending").show();
            $.ajax({
                cache: false,
                type: "GET",
                url: "https://www.csiro.au/api/sitecore/Subscribe/Snapshot",
                data: { fromemail: email },
                success: function (data) {
                    if (data == "OK") {
                        $("#sn_sending").hide();
                        $("#sn_success").show();
                        if (typeof ga === 'function') {
                            ga('send', 'event', 'Snapshot Data61 footer subscribe', 'click', 'Snapshot Data61 footer subscribe');
                        }
                    }
                    else {
                        $("#sn_sending").hide();
                        $("#sn_success").hide();
                        $("#sn_form").show();
                        $("#sn_form").addClass("error");
                        $("#sn_btn").disabled = false;
                        if (data == "email") {
                            $("#sn_emailvalidate").show();
                            $("#sn_error").hide();
                        }
                        else {
                            $("#sn_error").show();
                        }
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $("#sn_sending").hide();
                    $("#sn_form").addClass("error");
                    $("#sn_form").show();
                    $("#sn_error").show();
                    $("#sn_btn").disabled = false;
                }
            });
            return false;
        }
    }
    bindSubscribe();
});