var signIn = {
    clickable: function() {
        $(".user-navigation").on('click','#login-button', function(event){
            event.preventDefault();
            var leftPosition = $(this).offset().left,
                topPosition = $(this).offset().top;
            signIn.signInPopup(topPosition, leftPosition + 4, "", '', "no");
            $('input, textarea').placeholder();
        });

        $(".channel-nav-options").on("click", "#login-button", function(e) {
            e.preventDefault();
            var leftPosition = $(this).offset().left,
                topPosition = $(this).offset().top;
            signIn.signInPopup(topPosition - 2, leftPosition - 12, "", '', "no");
        });

        $(".article-header-information").on("click", ".tracking-sign-in-modal", function(e) {
            e.preventDefault();
            var leftPosition = $(this).offset().left,
                topPosition = $(this).offset().top,
                pageTop = $(window).scrollTop(),
                requiredTop = topPosition - pageTop;
            if (isMobileDevice()) {
                signIn.signInPopup(requiredTop - 182, leftPosition - 120, "sign-in-modal-popup", '', "no");
            } else {
                signIn.signInPopup("","", "sign-in-modal-popup", "", "yes");
                $('.sign-in-modal-popup').center();
            }
            $('.sign-in-modal-popup .sign-in').hide();
            $('body').prepend('<div id="research-overlay" class="research-overlay"></div>');
            $('#research-overlay').css("opacity", 0.5);
        });

        $('.global-sign-in-modal').on('click', function(event) {
            event.preventDefault();
            var isHeaderLink = $(this).attr('isheaderlink'),
                popupTitle = '',
                registerLink;

            $('.register-link-helper').remove();
            
            if(isHeaderLink) {
                popupTitle = 'Sign in / Register';
                registerLink = '<a href="/register" class="sign-in-link register-link-helper">Click here to register</a>';
            }

            $('.sign-in-popup').slideUp(400, function(){
                signIn.signInPopup("","", "sign-in-modal-popup", "", "yes");
                $('.sign-in-modal-popup').center();
                $('.sign-in-modal-popup .sign-in').hide();
                $('#sign-in-form').prepend('<h3 class="sign-in-modal-h3 no-bottom-margin margin-top margin-left-20">' + popupTitle + '</h3>');

                if(registerLink)
                    $('#forgot-password-link').after(registerLink);

                $('body').prepend('<div id="research-overlay" class="research-overlay"></div>');
                $('#research-overlay').css("opacity", 0.5);
            });
        });
        function isMobileDevice() {
            // SHOULDN'T REALLY USE userAgent TO DETECT THINGS BUT THIS IS A QUICK DIRTY FIX
            return (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
        }
    },
    signInStatic: function(){
        $("#signin-email-box").focus();
        signIn.forgotPassword($("#static-sign-in"));
    },
    signInMobile: function (container) {
        $("#signin-email-box-mobile").focus();
        //setGreyBackgroundColorForMobile();
        $("#forgot-password-link-mobile").on("click", function (e) {
            e.preventDefault();
            var forgotPasswordContainer = $(".forgot-password-container-mobile"),
                loginForm = $("#loginFormMobile"),
                email = $("#signin-email-box-mobile").val();
            if (email) { $("#email-forgot-password-mobile").val(email); }
            forgotPasswordContainer.css({ "top": $("#loginFormMobile").position().top, "left": $("#loginFormMobile").position().left });
            loginForm.fadeTo(500, 0).hide();
            forgotPasswordContainer.fadeTo(500, 1);
        });
        $(".forgot-password-button-row .forgot-password-cancel").on("click", function (e) {
            e.preventDefault();
            var forgotPasswordContainer = $(".forgot-password-container-mobile"),
                loginForm = $("#loginFormMobile");
            forgotPasswordContainer.fadeTo(500, 0).hide();
            loginForm.fadeTo(500, 1);
            hideMessages();
        });
        $("#sign-in-reset-password-mobile").on("click", function (e) {
            e.preventDefault();
            var emailForgot = container.find('#email-forgot-password-mobile').val(),
                captcha = container.find('#captchaForgotPassword').val(),
                successMessage = container.find('.sign-in-success'),
                emailError = container.find('.forgot-password-error.email'),
                googleEmailError = container.find('.forgot-password-error.google'),
                facebookEmailError = container.find('.forgot-password-error.facebook'),
                orcidEmailError = container.find('.forgot-password-error.orcid'),
                serverError = container.find('.forgot-passowrd-error.server');
            $.ajax({
                url: "https://" + location.host + "/user/password/reset",
                dataType: "json",
                type: "POST",
                timeout: 10000,
                data: {email: emailForgot, captcha: captcha},
                success: function(data) {
                    if (data.success === true) {
                        $('#email-value-mobile').text(emailForgot);
                        successMessage.show();
                        timeout = setTimeout(function() {
                            $(".forgot-password-container-mobile").fadeTo(500, 0).hide();
                            $("#loginFormMobile").fadeTo(500, 1);
                            successMessage.hide();
                            clearTimeout(timeout);
                        }, 15000);
                    } else if (data.success === false) {
                        if (data.errors.email) {
                            if ($.inArray("user.email.google", data.errors.email) > -1) {
                                googleEmailError.show(200);
                                setTimeout(function() { googleEmailError.hide(200); }, 6000);
                            } else if ($.inArray("user.email.facebook", data.errors.email) > -1) {
                                facebookEmailError.show(200);
                                setTimeout(function() { facebookEmailError.hide(200); }, 6000);
                            } else if ($.inArray("user.email.orcid", data.errors.email) > -1) {
                                orcidEmailError.show(200);
                                setTimeout(function() { orcidEmailError.hide(200); }, 6000);
                            } else {
                                emailError.show(200);
                                setTimeout(function() { emailError.hide(200); }, 6000);
                            }
                        }
                    }
                },
                error: function(data) {
                    if (data.success === false) {
                        serverError.show(200);
                        setTimeout(function() { serverError.hide(200); }, 6000);
                    }
                }
            });
        });
        function hideMessages () {
            container.find('.sign-in-success').hide();
            container.find('.forgot-password-error.email').hide();
            container.find('.forgot-password-error.google').hide();
            container.find('.forgot-password-error.facebook').hide();
            container.find('.forgot-passowrd-error.server').hide();
        }
    },
    signInPopup: function(positionX, positionY, wrapper, successFunction, hasEffect) {
        // Position X, Y and Wrapper if you want o use an extra class. Please use "class" (ex: signInPopup(100, 100, "test-class"))
        // successFunction is an optional function that can be used to replace the default ajax sign in success handler.
        // hasEffect is required if you want your sign-in popup to appear in the center of the page, being modal.
        // TODO: At some point, this signInPopup will need some refactoring.
        var container = $('.sign-in-popup'),
            slider = container.find('.sign-in-form'),
            forgotPasswordContainer = container.find('.forgot-password-container'),
            loginContainer = container.find('.login-container'),
            ieEleven = false;

        if(wrapper) {
            container.removeAttr('class').attr('class','sign-in-popup');
            container.addClass(wrapper);
        } else {
            container.removeAttr('class').attr('class','sign-in-popup');
        }

        container.css('left', positionY);
        container.css('top', positionX);
        //      ADJUST FOR CHROME
        var is_chrome = /chrome/i.test( navigator.userAgent );
        if (is_chrome) { slider.addClass("chrome-sign-in"); }
        //      THIS IS A BAD WAY TO CHECK FOR IE11 (but jQuery.browser was removed in 1.9)
        if ($.browser.version === "11.0" && navigator.appCodeName === "Mozilla" && navigator.product === "Gecko") { ieEleven = true; }
        if ($.browser.msie || ieEleven) { slider.addClass("ie-sign-in"); }

        container.show();
        $('.sign-in').show();
        if(hasEffect == "yes")
            slider.fadeIn(400);
        else
            slider.slideDown(400);

        $('.sign-in, #sign-in-cancel').click(function(e){
            e.preventDefault();
            close(hasEffect);
        });

        $(document).mousedown(function(e) {
            if(container.has(e.target).length === 0 && $('#home-sign-in-center').has(e.target).length === 0)
                close(hasEffect);
        });

        container.on('click','#sign-in-button', {onSuccess: successFunction}, onSignInButton);
        
        signIn.forgotPassword(container);

        function close(hasEffect){
            if(hasEffect == "yes") {
                slider.fadeOut(400, slideUpCB);
            } else {
                slider.slideUp(400, slideUpCB);
            }

            $(document).unbind('mousedown');
            $('.sign-in, #sign-in-cancel').unbind('click');
            $('.sign-in-modal-h3').delay(300).queue(function() { $(this).remove(); });
            $('#research-overlay').remove();
        }
        function slideUpCB(){
            container.hide();
            forgotPasswordContainer.hide();
            loginContainer.show();
            $('.pop-up-sign-in-instruction').remove();
        }

        function onSignInButton(e){
            var email = container.find("#signin-email-box.sign-in-input").val(),
                password = container.find("#signin-password-box.sign-in-input").val(),
                url = window.location.href,
                ticker = container.find('.sign-in-loading'),
                rememberMeCheck = container.find('#remember-me').is(':checked'),
                errorMessage = container.find('.sign-in-error'),
                rememberMe = (rememberMeCheck) ? 'on' : 'off',
                 
            ajaxSuccess = function(response) {
                if(response == "true") {
                    ticker.hide();
                    container.find("#sign-in-form").submit();
                } else {
                    container.find('#sign-in-button').removeAttr("disabled");
                    $('body').keypress(enterKeyHandler);
                    errorMessage.show();
                    ticker.hide();
                }
            },
            ajaxError = function(response) {
                container.find('#sign-in-button').removeAttr("disabled");
                $('body').keypress(enterKeyHandler);
                ticker.hide();
            };

            e.preventDefault();

            ticker.show();
            errorMessage.hide();

            container.find('#sign-in-button').attr("disabled", true);

            $.ajax({
                url: "https://" + location.host + "/loginax",
                dataType: "text",
                type: "POST",
                data: {email: email, password: password},
                success: ajaxSuccess,
                error: ajaxError
            });
        }
        function enterKeyHandler(e) {
            if (e.which == 13) { // enter key
                $('body').unbind("keypress", enterKeyHandler);
                container.find('#sign-in-button').trigger('click');
            }
        }
    },
    createSignInAsRow: function(container) {
        var sifHTML = '<div class="sign-in-form-top">' +
                      '<div class="sign-in-form-title">SIGN IN</div>' +
                      '<div class="sign-in-form-google">&nbsp;</div>' +
                      '<div class="sign-in-form-facebook">&nbsp;</div>' +
                      '<div class="sign-in-form-text">' +
                      'By proceeding you agree to F1000&rsquo;s<br />' +
                      '<a href="/about/legal/termsandconditions" target="_blank" title="General Terms and Conditions">General Terms and Conditions</a><br>' +
                      '<div class="sign-in-form-divider float-left">&nbsp;</div>' +
                      '<div class="sign-in-form-divider-text">OR</div>' +
                      '<div class="sign-in-form-divider float-left">&nbsp;</div>' +
                      '</div>' +
                      '</div>' +
                      '<div class="clearfix"></div>';
        $(container).html(sifHTML);
        $(".sign-in-form-google, .google-sign-in-link").click(function (e) {
            e.preventDefault();
            if ($('#remember-me').is(":visible")) {
                $("#google-remember-me").val($('#remember-me').is(':checked'));
            } else {
                $("#google-remember-me").val($('#remember-me-mobile').is(':checked'));
            }
           
            $("#googleOAuth").submit();
        });

        $("#orcidOAuth, #facebookOAuth, #googleOAuth").on('submit', function(e) {
            if($("#googleOAuth").attr('target') !== "_top") {
                console.log('opening new window', $(this).attr('target'))
                
                openNewLoginWindow($(this).attr('target'));
            }
        });

        function openNewLoginWindow(windowName) {
            var win = window.open("about:blank", $("#googleOAuth").attr('target'));

            window.addEventListener('message', function(msg) {
                if(msg.data == 'login-success') {
                    win.close();

                    if(window.parent) {
                        console.log('Posting to parent', '*');
                        window.parent.postMessage('login-success', '*');
                    }

                    if(window.opener) {
                        console.log('Posting to opener');
                        window.opener.postMessage('login-success', '*');
                    }
                }
            }, false);
        }

        $(".sign-in-form-orcid, .orcid-sign-in-link, .js-sign-in-orcid").click(function (e) {
            e.preventDefault();
            if ($('#remember-me').is(":visible")) {
                $("#orcid-remember-me").val($('#remember-me').is(':checked'));
            } else {
                $("#orcid-remember-me").val($('#remember-me-mobile').is(':checked'));
            }
            $("#orcidOAuth").submit();
        });
        $(".sign-in-form-facebook, .facebook-sign-in-link").click(function (e) {
            e.preventDefault();
            if ($('#remember-me').is(":visible")) {
                $("#facebook-remember-me").val($('#remember-me').is(':checked'));
            } else {
                $("#facebook-remember-me").val($('#remember-me-mobile').is(':checked'));
            }
            $("#facebookOAuth").submit();
        });
    },
    forgotPassword: function(container){
        var slider = container.find('.sign-in-form'),
            forgotPasswordContainer = container.find('.forgot-password-container'),
            loginContainer = container.find('.login-container');

        function enterKeyHandler(e) {
            if (e.which == 13) { // enter key
                $('body').unbind("keypress", enterKeyHandler);
                container.find('#sign-in-button').trigger('click');
            }
        }

        container.find("#signin-password-box").focus(function() {
            $('body').unbind("keypress", enterKeyHandler);
            $('body').keypress(enterKeyHandler);
        });

        container.find('#sign-in-button').on("click", function(){
            $('body').unbind("keypress", enterKeyHandler);
        });

        container.find('#forgot-password-link').on('click', function(e){
            e.preventDefault();
            var email = container.find("#signin-email-box").val();
            forgotPasswordContainer.slideDown(400);
            loginContainer.slideUp(400);
            container.find('#forgot-password-error, .sign-in-error').hide();

            if (email) {
                container.find('#email-forgot-password').val(email);
            }

        });

        container.find('#forgot-password-cancel').on('click', function(e){
            e.preventDefault();
            var email = container.find("#signin-email-box").val();
            forgotPasswordContainer.slideUp(400);
            loginContainer.slideDown(400);
            container.find('#forgot-password-error, .sign-in-error').hide();
        });

        container.find('#sign-in-reset-password').on('click', function(){

            var emailForgot = container.find('#email-forgot-password').val(),
                captcha = container.find('#captchaForgotPassword').val(),
                ticker = container.find('.sign-in-loading'),
                successMessage = container.find('.sign-in-success'),
                captchaError = container.find('.forgot-password-captcha-error'),
                emailError = container.find('.forgot-password-email-error'),
                googleEmailError = container.find('.forgot-password-google-email-error'),
                facebookEmailError = container.find('.forgot-password-facebook-email-error'),
                serverError = container.find('.forgot-passowrd-server-error');

            ticker.show();
            captchaError.hide();
            emailError.hide();
            googleEmailError.hide();
            facebookEmailError.hide();
            serverError.hide();

            $.ajax({
                url: "https://" + location.host + "/user/password/reset",
                dataType: "json",
                type: "POST",
                timeout:10000,
                data: {email: emailForgot, captcha: captcha},
                success: function(data) {
                    if(data.success === true) {
                        $('#email-value').text(emailForgot);
                        ticker.hide();
                        successMessage.show();
                        timeout=setTimeout(function(){
                            container.find('.forgot-password-container').slideUp(400);
                            container.find('.login-container').slideDown(400);
                            clearTimeout(timeout);
                        }, 15000);
                    } else if(data.success === false) {
                        if(data.errors.email){
                            if($.inArray("user.email.google", data.errors.email) > -1) {
                                googleEmailError.show();
                            } else if($.inArray("user.email.facebook", data.errors.email) > -1) {
                                facebookEmailError.show();
                            } else {
                                emailError.show();
                            }
                        }
                        ticker.hide();
                    }
                },
                error: function(data) {
                    if(data.success === false) {
                        serverError.show();
                        ticker.hide();
                    }
                }
            });
        });
    },
    showOrcidModal: function($modal) {
        // We only want to show the modal once after each login attempt
        // This cookie is added on the BE directly after a failure
        if($.cookie("oauthError") == "ORCID") {

            // If the cookie is there we show the modal
            var errorModal = new F1000.ModalDialogue($('#verifyOrcidEmail'));
            errorModal.create($modal, { showOnLoad: true });
            
            // Remove the cookie to ensure we don't see the modal again
            // until another failed login attempt.
            $.removeCookie("oauthError", { path: "/" });
        }
    }
};
