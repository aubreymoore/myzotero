$(document).ready(function () {

    // Cache checkbox images
    new Image().src = '/gfx/cabicd4/check-box.jpg';
    new Image().src = '/gfx/cabicd4/right-tick.jpg';

    // Set initial "browse" controls
    $('.subject-panel').hide();
    $('.authors-list').show();
    $('.serial-panel').hide();

    $('.hidden-ie').css({
        'font-size': 0,
        'height': 0,
        'margin': 0
    });
    //Add trim functionality
    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        }
    }

    /* Cookies notification - Global */
    $('#Product_cookies-close').hideCookiesNotification('#Product_cookies-wrap');

    searchresultsCheckboxSelection();

    $('div.modal').keypress(function (e) {
        if ($(this).find('button.btn-gray:focus').size() === 0) {
            if (e.keyCode == '13') {
                $(this).find('button.push-right').click();
                return false;
            }
        }
    });

    //Multiple dropdown

    $('.multiple-ddl li').click(function (e) {
        e.stopPropagation();
        if ($(this).hasClass('default')) {
            if ($(this).hasClass('active')) {
                //$(this).removeClass('active')
                return false;
            }
            else {
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');

                //$(this).parent().siblings('a').children('.ddl-text').prepend('All ');

                var existingTxt = $(this).parent().siblings('a').children('.ddl-text').html();
                //if (! existingTxt.contains('All ')) {
                switch (existingTxt) {
                    case 'CABI sites':
                        $(this).parent().siblings('a').children('.ddl-text').html('All CABI sites');
                        break;

                    case 'Content types':
                        $(this).parent().siblings('a').children('.ddl-text').html('All content types');
                        break;

                    case 'Types':
                        $(this).parent().siblings('a').children('.ddl-text').html('All types');
                        break;

                    //default:
                    //    $(this).parent().siblings('a').children('.ddl-text').prepend('All ');
                }
                //}
            }
        }
        else {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
            else {
                $(this).addClass('active');
                $(this).siblings('.default').removeClass('active');
                //var existingTxt = $(this).parent().siblings('a').children('.ddl-text').html().split("All").join("");
                var existingTxt = $(this).parent().siblings('a').children('.ddl-text').html();

                switch (existingTxt) {
                    case 'All CABI sites':
                        $(this).parent().siblings('a').children('.ddl-text').html('CABI sites');
                        break;

                    case 'All content types':
                        $(this).parent().siblings('a').children('.ddl-text').html('Content types');
                        break;

                    case 'All types':
                        $(this).parent().siblings('a').children('.ddl-text').html('Types');
                        break;

                    //default:
                    //    var existingTxt = $(this).parent().siblings('a').children('.ddl-text').html().split("All").join("");
                    //    $(this).parent().siblings('a').children('.ddl-text').html(existingTxt);
                }

            }
        }
    });

    $('.multiple-ddl').find('li').each(function () {
        if (!$(this).hasClass('default')) {
            if ($(this).hasClass('active')) {
                $(this).siblings('.default').removeClass('active');
            }
        }        
    });

    //http://stackoverflow.com/questions/780560/animated-gif-in-ie-stopping
    $('.search-bar button.btn-default, div#cd4schresEditQuery input.btn-default, aside.a-refiner a.btn-default, div.tags-container a, div.highChartMain button#btnUpdateResultsByYear, div.tab-search button.btn-default').click(function () {
        //$("div#divLoadingSearchResults").html('<img src="/gfx/cabicd4/loading3.gif" />');//.addClass("show");
        $("div#divLoadingSearchResults").addClass("show");
        if ((navigator.userAgent.indexOf("Firefox")) != -1) {
            setTimeout(function() {
                $("div#divLoadingSearchResults").removeClass("show");
            }, 5000);
        }
    });

    //Add placeholder as a value
    //placeHolder();

    $(function () {
        $('input.cd4-placeholder,textarea.cd4-placeholder').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'))
                   .attr('placeholder', '');
        }).blur(function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    });


    if ($('.datepicker').length) {
        $(".datepicker").datepicker({
            changeMonth: false,
            changeYear: true,
            dateFormat: 'dd M yy',
            maxDate: "0",
            yearRange: '1900:maxDate',
            defaultDate: new Date(),
            dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            showOtherMonths: true,
            selectOtherMonths: true,
            onSelect: function(date) {
                $('.icon-icon_calendar').removeClass('calender-active');
                $('.calender-datepicker-input').removeClass('calendar-active-input');
            }
        });
    }
    $('.listing:last-child').css('border-bottom', 'none');
    /*Copy to clipboard*/
    if ($('.pattern').length) {
        //set path
        ZeroClipboard.setMoviePath('js/ZeroClipboard.swf');

        $('body').find('xmp').each(function () {
            //create client
            var clip = new ZeroClipboard.Client();
            var object = $(this);
            var copy = $(this).siblings('.copy');

            //event
            clip.addEventListener('mousedown', function () {
                clip.setText(object.html());
            });
            clip.addEventListener('complete', function (client, text) {
                alert('copied');
            });
            //glue it to the button
            clip.glue(copy[0]);
        });
    }

    $('.toggle-link').click(function () {
        $(this).find('span').toggleClass("top");
        $('.search-detail-link').slideToggle("slow");
    });

    $('.cancel-toggle-link').click(function () {
        $(this).closest('.content-section').find('.toggle-link').find('span').toggleClass("top");
        $('.search-detail-link').slideToggle("slow");
    });


    //$('.tags-container').on('click', '.tag', function () { 
    //    if ($(this).parent('.tags-container').find('.tag:visible').length == 1) {   
    //        $(this).parents('.refind-tags').hide() 
    //        $(this).parents('.col-sm-8').next('.col-sm-4').find('.remove-filter').hide()   

    //    } else {
    //        $(this).hide() 
    //    }
    //});

    $('.clear-tags').click(function () {
        $(this).parents('ul').siblings('.subject-list').find('li').removeClass('active');
        $(this).parent().siblings().find('.tags-container .tag').remove();
    });

    $(document).on("click", "body", function (e) {
        //if (!$(e.target).hasClass('popup') &&
        //    $(e.target).parents('.popup').length == 0 &&
        //    $(e.target).parents('#refineby').length == 0) {

        //    $('#refineby-content').hide();
        //    $('#refineby li').removeAttr('class');
        //    $('.overlay').hide();
        //}

        if (!$(e.target).hasClass('popup')
                    && $("#sign-in").hasClass("active")
                    && $(e.target).parents('.popup').length == 0) {
            $('.sign-in, .popup').hide();
            $('.overlay-login').hide();
            $("#sign-in").removeClass("active");
        }

        // Add class to calender
        if ($(e.target).is('.calender-datepicker-input') || $(e.target).parents().hasClass('ui-datepicker')) {
            $('.icon-icon_calendar').addClass('calender-active');
            $('.calender-datepicker-input').addClass('calendar-active-input');
        } else {
            $('.icon-icon_calendar').removeClass('calender-active');
            $('.calender-datepicker-input').removeClass('calendar-active-input');
        }

    });

    $(document).on("click", "body", function (e) {
        if ($(e.target).hasClass('overlay')) {
            //$('#refineby-content').hide();
            //$('#refineby li').removeAttr('class');
            $('.overlay').hide();
            $('.popup').hide();
            $('a.print, a.email, a.download, a.rss, a.trash').removeClass('active');
        }
    });

    $('.popup .btn-gray').click(function () {
        $('.overlay').hide();
        $('.popup').hide();
        $("a.print, a.email, a.download, a.rss, a.trash").removeClass("active");
    });

    //$('#refineby-content .btn-default').click(function () {
    //    $('#refineby-content').hide();
    //    $('.overlay').hide();
    //    $('#refineby li').removeAttr('class');
    //});

    //Close popup
    //$('#refineby-content .close').click(function () {
    //    $('#refineby-content').hide();
    //    $('.overlay').hide();
    //    $('#refineby li').removeAttr('class');
    //});
    $('.close').click(function () {
        $('.popup').hide();
        $('.overlay').hide();
    });
    
    //Remove all the selected elements from refiner
    $('.clear-all').click(function (event) {
        $('.checkbox-listing .checkbox').each(function () {
            this.checked = false;
        });
        $('.refine-item-list').text('');
        $('.item-count').hide().children('strong').text(0);
        $('.buttons-bar .clear-all, .buttons-bar .btn-default').css("visibility", "hidden");
        if (cd4.isMobileSite) $('.refine-buttons').css("display", "none");

        if (refinerData != undefined) // Search Refiner data cache
            refinerData = {};

        if (refinerTypesData != undefined)
            refinerTypesData = {};

        //Clear selections from treemap and reset radio button
        $('.refineby-content').each(function (i, obj) {
            $('ul.radio-listing').each(function () {
                $('input:radio[value=or]').attr('checked', true);
            });
            var id = $(this).attr('data-facet-field');
            if (id != undefined) {
                var treemap = $('#treemap_' + id.replace(' ', '_')).highcharts();
                if (treemap != undefined) {
                    treemap.series[0].data[0].select(false, false);

                    $.each(treemap.series, function (j, s) {
                        $.each(s.data, function (k, p) {
                            $(p.graphic.element).css({
                                fill: ''
                            });
                            p.dataLabel.css({
                                color: 'black'
                            });
                        });
                    });
                }
            }
        });
    });

    $('.select-all-popup-checkbox').click(function (event) {
        if (this.checked) {
            $('.checkbox-listing .checkbox').each(function () {
                this.checked = false;
            });
        } else {
            $('.checkbox-listing .checkbox').each(function () {
                this.checked = true;
            });
        }
    });

    //search results > Click on all checkbox
    $('#search-result').find('.select-all-listing').click(function (event) {
        if (this.checked) {
            $('div.listing-bar').find('.listing .checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $('div.listing-bar').find('.listing .checkbox').each(function () {
                this.checked = false;
            });
        }
    });

    //search results > Click on single checkbox
    $('#search-result .listing-bar').find('.custom-input').click(function (event) {
        searchresultsCheckboxSelection();
    });

    $('#myprojects-result .listing-bar').find('.custom-input').click(function (event) {
        myprojectsCheckboxSelection();
    });    

    //search results > Alert if no checkbox is selected
    //$('#search-result').find('.icon-bar-n ul li a').click(function(event) {
    //    if (!$('#search-result div.listing-bar').find('input[type="checkbox"]').is(':checked')) {
    //        alert("Please check at least one checkbox");
    //        return false;
    //    }
    //});

    //$('.select-all-listing').click(function (event) {
    //    if (this.checked) {
    //        $('.listing .checkbox').each(function () {
    //            this.checked = true;
    //        });
    //    } else {
    //        $('.listing .checkbox').each(function () {
    //            this.checked = false;
    //        });
    //    }
    //});

    //$('#refineby li a').click(function (e) {
    //    var index_no = $(this).parent('li').index(),
    //        buttonTop = $(this).offset().top + $(this).innerHeight() + 1,
    //        defaultTop = $('#refineby').offset().top,
    //        popupTop = buttonTop - defaultTop;

    //    if ($(this).parent('li').hasClass('active')) {
    //        $('#refineby-content').hide();
    //        $('.overlay').hide();
    //        $('#refineby li').removeAttr('class');
    //    } else {
    //        $('#refineby-content').css({ 'top': popupTop }).show();
    //        $('#refineby li').removeAttr('class');
    //        $('#refineby li').eq(index_no).addClass('active');
    //        $('.overlay').show();
    //    }

    //    var scrollHeight = $(window).scrollTop() + e.clientY - 100;

    //    if (scrollHeight > 0) {
    //        $('html, body').animate({
    //            scrollTop: scrollHeight
    //        }, 800)
    //    }
    //});

    //$('.checkbox-listing li .custom-control').click(function () {
    //    var count = 0;
    //    $('.checkbox-listing li').each(function () {
    //        if ($(this).find('.checkbox').prop("checked")) {
    //            count = count + 1;
    //        } else {
    //            count = count;
    //        }

    //        if (count <= 0) {
    //            $('.buttons-bar .clear-all, .buttons-bar .btn-default').hide()
    //            $('.item-count').children('strong').html(count)

    //        } else {
    //            $('.buttons-bar .clear-all, .buttons-bar .btn-default').show()
    //            $('.item-count').show().children('strong').html(count)
    //        }
    //    })
    //})

    //$('.checkbox-listing li:lt(15)').show();

    $('.show-all').click(function () {
        if ($(this).hasClass('active')) {
            if ($(this).hasClass('show-12')) {
                $('.author-listing li:gt(11)').hide();
            } else {
                $('.checkbox-listing li:gt(14)').hide();
            }
            $(this).removeClass('active').html('<span>Show all</span> <span class="icon-icon_plus"></span>');
        } else {
            if ($(this).hasClass('show-12')) {
                $('.author-listing li').show();
            } else {
                $('.checkbox-listing li').show();
            }
            $(this).addClass('active').html('<span>Show less</span> <span class="icon-icon_minus"></span>');
        }
    });

    $('.show-all-links li:gt(4)').hide();
    $('.show-more').click(function () {
        if ($(this).hasClass('active')) {
            $('.show-all-links li:gt(4)').slideUp('fast');
            $(this).removeClass('active').html('<span>Show more</span> <span class="icon-icon_plus"></span>');
        } else {
            $('.show-all-links li').slideDown('fast');
            $(this).addClass('active').html('<span>Show less</span> <span class="icon-icon_minus"></span>');
        }
    });

    //$('.advance-search-list .add-filter').on('click', function (e) {
    //    e.preventDefault();
    //    $(this).prev('ul').append('<li>' +
    //                        '<div class="dropdown search-type">' +
    //                           '<a aria-expanded="true" data-toggle="dropdown" id="dropdownMenu1" class="dropdown-toggle form-control" href="javascript:;">' +
    //                            '<strong>And</strong>' +
    //                           '<span class="caret"></span>' +
    //                            '</a>' +
    //                            '<ul aria-labelledby="dropdownMenu1" role="menu" class="dropdown-menu">' +
    //                             '<li role="presentation"><a href="javascript:;" tabindex="-1" role="menuitem">And</a></li>' +
    //                               '<li role="presentation"><a href="javascript:;" tabindex="-1" role="menuitem">Or</a></li>' +
    //                              '<li role="presentation"><a href="javascript:;" tabindex="-1" role="menuitem">Not</a></li>' +
    //                            '</ul>' +
    //                        '</div>' +
    //                        '<input type="text" class="form-control" placeholder="Enter keyword search">' +
    //                        '<div class="allfields">' +
    //                         '<span class="in">in</span>' +
    //                          '<div class="dropdown">' +
    //                           '<a aria-expanded="true" data-toggle="dropdown" id="dropdownMenu1" class="dropdown-toggle form-control" href="javascript:;">' +
    //                            '<strong>All fields</strong>' +
    //                             '<span class="caret"></span>' +
    //                              '</a>' +
    //                               '<ul aria-labelledby="dropdownMenu1" role="menu" class="dropdown-menu">' +
    //                                '<li role="presentation"><a href="javascript:;" tabindex="-1" role="menuitem">Article title</a></li>' +
    //                                 '<li role="presentation"><a href="javascript:;" tabindex="-1" role="menuitem">Abstract</a></li>' +
    //                                  '<li role="presentation"><a href="javascript:;" tabindex="-1" role="menuitem">Author name</a></li>' +
    //                                '</ul>' +
    //                            '</div>' +
    //                            '<a href="javascript:;" class="tag"><span class="icon-icon_cross"></span></a>' +
    //                        '</div>' +
    //                    '</li>');

    //    placeHolder();
    //    zIndexLi();
    //})
    //$('.tab-content').on('click', '.advance-search-list .tag', function () {
    //    $(this).parents('li').remove();
    //})

    $('.backtotop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });

    $(document).on('click', '.dropdown-menu li a', function() {
        var selected = $(this).text();
        // $(this).parents('ul').prev('.dropdown-toggle').find('strong').html(selected);

        if ($(this).parents('ul').hasClass('date-search')) {
            switch (selected) {
            case 'Subject':
                $('.authors-list').hide();
                $('.date-search li').show();
                $('.subject-panel').show();
                $('.serial-panel').hide();
                break;
            case 'Serial':
                $('.authors-list').hide();
                $('.date-search li').show();
                $('.subject-panel').hide();
                $('.serial-panel').show();
                break;
            case 'Author':
                $('.subject-panel').hide();
                $('.authors-list').show();
                $('.serial-panel').hide();
            }

            $("ul.date-search div.dropdown #dropdownMenu1").html("<strong>" + selected + "</strong><span class='caret'></span>");

        }
    });

    $('.btn-result').on('click', function (e) {
        e.preventDefault();
        $('#search-browse').hide();
        $('#search-result').show();
    });

    //Use email as username
    $('.user-checkbox').click(function () {
        //if( $.trim( $('.email-input').val() ) != '' ) {
        if ($(this).is(':checked')) {
            $('.user-input').val($('.email-input').val());
            $('.user-input').attr('disabled', 'disabled');
        }
        else {
            $('.user-input').removeAttr('disabled');
        }
        //}
        //else {
        //    $(this).prop('checked', false);
        //}
    });   
    $('.email-input').keyup(function () {
        if ($('.user-checkbox').is(':checked')) {
            $('.user-input').val($(this).val());
        }
    })

    $('.password-input').keyup(function() {
        $('.password-input').removeClass('correct incorrect')
        $('.password-input').next('span').removeClass('icon-tick icon-cross')
        if ($(this).val() == $('.confirm-input').val() && $(this).val() != '' && $('.confirm-input').val() != '') {
            $('.confirm-input').removeClass('incorrect').addClass('correct')
            $('.confirm-input').next('span').removeClass('icon-cross').addClass('icon-tick')

        } else if ($(this).val() != $('.confirm-input').val() && $('.confirm-input').val() != '') {
            $('.confirm-input').removeClass('correct').addClass('incorrect')
            $('.confirm-input').next('span').removeClass('icon-tick').addClass('icon-cross')

        } else if ($.trim($(this).val()) == '' && $.trim($('.confirm-input').val()) == '') {
            $('.confirm-input').removeClass('correct incorrect')
            $('.confirm-input').next('span').removeClass('icon-tick icon-cross')

        }
    });
    //Confirm Password
    $('.confirm-input').keyup(function() {
        if ($(this).val() == $('.password-input').val() && $.trim($(this).val()) != '' && $.trim($('.password-input').val()) != '') {
            $(this).removeClass('incorrect').addClass('correct')
            $(this).next('span').removeClass('icon-cross').addClass('icon-tick')

        } else if ($.trim($(this).val()) == '' && $.trim($('.password-input').val()) == '') {
            $(this).removeClass('correct incorrect')
            $(this).next('span').removeClass('icon-tick icon-cross')

        } else {
            $(this).removeClass('correct').addClass('incorrect')
            $(this).next('span').removeClass('icon-tick').addClass('icon-cross')
        }
    });

    // $('input[type="checkbox"]').prop('checked', false);
    $('.user-input').removeAttr('disabled');

    //Input password
    $('.password-input').blur(function() {
        var count = 0;
        $(this).parent().parent().find('.Product_alert').each(function() {
            if ($(this).is(":visible") && ($(this).is(':contains("must be of minimum")') || ($(this).is(':contains("Password required")')))) {
                count = count + 1;
                $('.password-input').removeClass('correct').addClass('incorrect')
                $('.password-input').next('span').removeClass('icon-tick').addClass('icon-cross')
            }
        })
        if (count == 0) {
            $('.password-input').removeClass('incorrect').addClass('correct')
            $('.password-input').next('span').removeClass('icon-cross').addClass('icon-tick')
        }
    });

    //Input email
    $('.email-input').blur(function() {
        var count = 0;
        $(this).parent().parent().find('.Product_alert').each(function() {
            if ($(this).is(":visible") && ($(this).is(':contains("Email address required")') || ($(this).is(':contains("Invalid email address entered")')))) {
                count = count + 1;
                $('.email-input').removeClass('correct').addClass('incorrect')
                $('.email-input').next('span').removeClass('icon-tick').addClass('icon-cross')
            }
        });
        if (count == 0) {
            $('.email-input').removeClass('incorrect').addClass('correct')
            $('.email-input').next('span').removeClass('icon-cross').addClass('icon-tick')
        }
    });

    //Register user click
    $(document).on('click', '.register-user', function(e) {
        $('.register-user').parent().parent().find('.Product_alert').each(function() {
            var errEmail = 0;
            var errPassword = 0;
            var errconfirm = 0;

            if (($(this).is(":visible") && ($(this).is(':contains("Email address required")') || ($(this).is(':contains("Invalid email address entered")')))) || ($.trim($('.email-input').val()) == '') || ($(this).is(":invalid"))) {
                errEmail = errEmail + 1;
                $('.email-input').removeClass('correct').addClass('incorrect')
                $('.email-input').next('span').removeClass('icon-tick').addClass('icon-cross')
            }
            if (($(this).is(":visible") && ($(this).is(':contains("must be of minimum")') || ($(this).is(':contains("Password required")')))) || $.trim($('.password-input').val()) == '') {
                errPassword = errPassword + 1;
                $('.password-input').removeClass('correct').addClass('incorrect')
                $('.password-input').next('span').removeClass('icon-tick').addClass('icon-cross')
            }
            if (($(this).is(":visible") && ($(this).is(':contains("Confirmation of new password required")') || ($(this).is(':contains("Both passwords must match")')))) || ($.trim($('.confirm-input').val()) == '')) {
                errconfirm = errconfirm + 1;
                $('.confirm-input').removeClass('correct').addClass('incorrect')
                $('.confirm-input').next('span').removeClass('icon-tick').addClass('icon-cross')
            }
        });
    });

    $('.author-group-list li').on('click', function () {
        if ($(this).hasClass('g')) {
            $('.author-group-list li').removeClass('active');
            $(this).addClass('active');
            $('.name-list .no-author').hide();
            $('.name-list .author').show();
        } else {
            $('.author-group-list li').removeClass('active');
            $(this).addClass('active');
            $('.name-list .author').hide();
            $('.name-list .no-author').show();
        }
    });

    $('.validate').keyup(function () {
        if ($(this).val() == '') {
            $(this).addClass('incorrect');
            //$(this).next('span').addClass('icon-cross')
            if ($(this).hasClass('name'))
                $(this).attr('placeholder', 'Please enter first name');
            if ($(this).hasClass('last-name'))
                $(this).attr('placeholder', 'Please enter last name');
            if ($(this).hasClass('valemail'))
                $(this).attr('placeholder', 'Please enter email');
        }
        else {
            $(this).removeClass('incorrect')
            //$(this).next('span').removeClass('icon-cross')
        }
       
    });

    $(".validate-email").blur(function () {
        if ($(this).is(":invalid")) {
            $(this).addClass('incorrect');
            $(this).next('span').addClass('icon-cross');
            $(this).attr('placeholder', 'Please enter valid-email');
        }
        else if ($(this).val() == '') {
            $(this).addClass('incorrect');
            $(this).next('span').addClass('icon-cross');
            $(this).attr('placeholder', 'Please enter email');
        }
        else {
            $(this).removeClass('incorrect');
            $(this).next('span').removeClass('icon-cross');
        }
    });       
  
    //Update user profile click
    $(document).on('click', '.update-profile', function (e) {
        if ($('.update-profile').parent().parent().parent().parent().find('input.name[type=text]').val() == ''){
            $('.update-profile').parent().parent().parent().parent().find('input.name[type=text]').addClass('incorrect');
            $('.update-profile').parent().parent().parent().parent().find('input.name[type=text]').attr('placeholder', 'Please enter first name');
        }
        if ($('.update-profile').parent().parent().parent().parent().find('input.last-name[type=text]').val() == '') {
            $('.update-profile').parent().parent().parent().parent().find('input.last-name[type=text]').addClass('incorrect');
            $('.update-profile').parent().parent().parent().parent().find('input.last-name[type=text]').attr('placeholder', 'Please enter last name');
        }
        if ($('.update-profile').parent().parent().parent().parent().find('input.validate-email[type=text]').val() == '') {
            $('.update-profile').parent().parent().parent().parent().find('input.validate-email[type=text]').addClass('incorrect');
            $('.update-profile').parent().parent().parent().parent().find('input.validate-email[type=text]').attr('placeholder', 'Please enter email');
        }
    });

/*
    //Get valu in search from browse all content
    $('.author-listing li a, .subject-panel li a').click(function () {
        var getVal = $(this).html().trim();

        $('.nav-tabs li').removeClass('active');
        $('.nav-tabs li:first-child').addClass('active');

        $('.tab-content .tab-pane').removeClass('active');
        $('.tab-content .tab-pane:first-child').addClass('active');

        //Check author/subject
        if ($(this).parents('ul').hasClass('author-listing')) {
            $('.tags-container a:first-child').show().children('.author-tag').html(getVal)

        } else {
            $('.tags-container a:last-child').show().children('.subject-tag').html(getVal)
        }

        $('.remove-filter,.refind-tags').show();
        $('.btn-result').trigger('click')
    });

    $('.remove-filter').click(function () {
        $('.remove-filter,.refind-tags').hide();
    });
*/

    //Accordian menu
    $('#accordion li span').on('click', function () {

        if ($(this).siblings('ul').length > 0 && !$(this).hasClass('icon-icon_minus')) {
            $('#accordion li span').removeClass('icon-icon_minus');
            $('#accordion li ul').hide();

            //If it has parent
            if ($(this).parents('ul').siblings('span').length > 0) {

                $(this).parents('ul').siblings('span').addClass('icon-icon_minus');
                $(this).parents('ul').show();
            }

            $(this).addClass('icon-icon_minus');
            $(this).siblings('ul').show();

        } else {
            $(this).removeClass('icon-icon_minus');
            $(this).siblings('ul').hide();
        }
    });

    $('#field-interest-accordion li span').on('click', function () {

        if ($(this).siblings('ul').length > 0 && !$(this).hasClass('icon-icon_minus')) {
            $('#field-interest-accordion li span').removeClass('icon-icon_minus');
            $('#field-interest-accordion li ul').hide();

            //If it has parent
            if ($(this).parents('ul').siblings('span').length > 0) {

                $(this).parents('ul').siblings('span').addClass('icon-icon_minus');
                $(this).parents('ul').show();
            }

            $(this).addClass('icon-icon_minus');
            $(this).siblings('ul').show();

        } else {
            $(this).removeClass('icon-icon_minus');
            $(this).siblings('ul').hide();
        }
    });

    //$('.rotate-arrow').click(function () {
    //    $(this).find('span').toggleClass("top");
    //    $(this).next('ul').slideToggle('slow');
    //});

    $('.author-listing li:gt(11)').hide();

    zIndexLi();

    //mysearches.html > Click on checkbox
    //$('#mysearch').on('click', '#sort-wrapper tr .custom-input', function () {
    //    if ($(this).prop('checked') == true) {
    //        $(this).parents('td').siblings('.td-fourth').children('.dropdown').show()

    //        checkboxSeclection()

    //    } else {
    //        $(this).parents('td').siblings('.td-fourth').children('.dropdown').hide()

    //        checkboxSeclection()
    //    }
    //});



    //mysearches.html > Click on All
    //$('#mysearch').on('click', '#sort-header .custom-input', function () {
    //    if ($(this).prop('checked') == true) {
    //        $('#mysearch #sort-wrapper tr').each(function () {
    //            $(this).find('.custom-input').prop('checked', true)
    //            $('.combine-selected').children('span').hide().next('a').show()
    //            $('.combine-selected').children('.radio-listing').show();
    //            $('#mysearch #sort-wrapper tr td.td-fourth').children('.dropdown').show()
    //        })

    //    } else {
    //        $('#mysearch #sort-wrapper tr').each(function () {
    //            $(this).find('.custom-input').prop('checked', false)
    //            $('.combine-selected').children('span').show().next('a').hide()
    //            $('.combine-selected').children('.radio-listing').hide();
    //            $('#mysearch #sort-wrapper tr td.td-fourth').children('.dropdown').hide()
    //        })
    //    }
    //});


    //if ($("#mysearch").length > 0) {
    //    $("#mysearch").tablesorter({
    //        headers: {
    //            0: { sorter: false },
    //            1: { sorter: false },
    //            2: { sorter: false },
    //            3: { sorter: false },
    //            4: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
    //            5: { sorter: false }
    //        }
    //    });
    //}

    //if ($("#myprojectreport").length > 0) {
    //    $("#myprojectreport").tablesorter({
    //        headers: {
    //            0: { sorter: false },
    //            1: { sorter: "text" },
    //            2: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
    //            3: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
    //            4: { sorter: "digit" },
    //            5: { sorter: "digit" },
    //            6: { sorter: "digit" },
    //            7: { sorter: false }
    //        }
    //    });
    //}

    //if ($("#projectReport").length > 0) {
    //    $("#projectReport").tablesorter({
    //        headers: {
    //            0: { sorter: false },
    //            1: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
    //            2: { sorter: false },
    //            3: { sorter: false },
    //            4: { sorter: false },
    //            5: { sorter: false },
    //            6: { sorter: false },
    //            7: { sorter: false }
    //        }
    //    });
    //}

    //$("#myproject").bind("sortEnd", function () {
    //    projecttableStyling();
    //});

    //$("#myprojectreport").bind("sortEnd", function () {
    //    projectreporttableStyling();
    //});

    //$("#activitySummary").bind("sortEnd", function () {
    //    summarytableStyling();
    //});

    //$("#mysearch").bind("sortEnd", function () {
    //    tableStyling();
    //});

    //$("#projectReport").bind("sortEnd", function () {
    //    projectReports();
    //});

    //$('#mysearch .dropdown-toggle').click(function () {
    //    $(this).parent().parent().parent().parent().find("tr").css({ 'z-index': 0, 'position': 'relative' });
    //    $(this).parent().parent().parent().css({ 'z-index': 1, 'position': 'relative' });
    //});


    var selectClickEl = $('#select-product a'),
        checkFavEl = $('#your-product ul li'),
        selectedEl = $('#selected-product');

    $('#add-fav-product').click(function () {
        selectClickEl.trigger('click');
        $('.left-tabs li').removeClass('active');
        $(window).scrollTop(0);
    });

    selectClickEl.click(function () {
        checkedFavProduct()
    });

    // for Multiple checkbox click 
    $(document).on('click', '#accordion .custom-input', function () {
        if ($(this).prop('checked') == true) {
            if ($(this).parents('.custom-form-list').siblings('.panel-group').length > 0) {
                $(this).parents('.custom-form-list').siblings('.panel-group').find('.custom-input').prop('checked', true)
            }

        } else {
            if ($(this).parents('.custom-form-list').siblings('.panel-group').length > 0) {
                $(this).parents('.custom-form-list').siblings('.panel-group').find('.custom-input').prop('checked', false)
            }

        }

        if ($(this).parents('.custom-form-list').siblings('span').parent().find('ul').length > 0 && !$(this).hasClass('icon-icon_minus')) {
            $('#accordion li ul').hide();

            //If it has parent
            if ($('#accordion li span').parents('ul').siblings('span').length > 0) {

                $('#accordion li span').parents('ul').siblings('span').addClass('icon-icon_minus');
                $('#accordion li span').parents('ul').show();
            }

            $('#accordion li span').siblings('ul').show();

        } else {
            $(this).parents('.custom-form-list').siblings('span').parent().find('ul').hide()
        }
    });

    $(document).on('click', '#field-interest-accordion .custom-input', function () {
        if ($(this).prop('checked') == true) {
            if ($(this).parents('.custom-form-list').siblings('.panel-group').length > 0) {
                $(this).parents('.custom-form-list').siblings('.panel-group').find('.custom-input').prop('checked', true)
            }

        } else {
            if ($(this).parents('.custom-form-list').siblings('.panel-group').length > 0) {
                $(this).parents('.custom-form-list').siblings('.panel-group').find('.custom-input').prop('checked', false)
            }

        }

        if ($(this).parents('.custom-form-list').siblings('span').parent().find('ul').length > 0 && !$(this).hasClass('icon-icon_minus')) {
            $('#field-interest-accordion li ul').hide()
            $('#field-interest-accordion li span').removeClass('icon-icon_minus')

            //If it has parent
            //if ($('#field-interest-accordion li span').parents('ul').siblings('span').length > 0) {
            //    $('#field-interest-accordion li span').parents('ul').siblings('span').addClass('icon-icon_minus')
            //    $('#field-interest-accordion li span').parents('ul').show()
            //}
            $(this).parents('.custom-form-list').siblings('span').addClass('icon-icon_minus')
            $(this).parents('.custom-form-list').siblings('ul').show()

            //$('#field-interest-accordion li span').siblings('ul').show()

        } else {
            var countSelection = 0;
            var countTotal = 0;
            $(this).parents('.panel-group').children('li').each(function () {
                if ($(this).find('label').text() != '') {
                    if ($(this).find('.custom-input').prop('checked') == true) {
                        flag = true;
                        countSelection = countSelection + 1;
                    }
                    countTotal = countTotal + 1;
                }               
            })
            if (countSelection == countTotal) {
                $(this).parents('.panel-group').parent('li').find('.custom-input:first').prop('checked', true)
            }
            else {
                $(this).parents('.panel-group').parent('li').find('.custom-input:first').prop('checked', false)
            }
            
            $(this).parents('.custom-form-list').siblings('span').parent().find('ul').hide()
        }
    });
    /*$('.list-content h2').click(function(){
     if ($(this).parent().siblings('.check-mark').find('.custom-input').prop('checked') == true ) {
     $(this).parent().siblings('.check-mark').find('.custom-input').prop('checked', false);
     }else {
     $(this).parent().siblings('.check-mark').find('.custom-input').prop('checked', true);
     }
     });
     */


    // for add favorate product button click
    //$(document).on("click", ".left-tabs li", function (e) {
    //    $('.right-tabs li').removeClass('active');
    //});
    //$(document).on("click", ".right-tabs li", function (e) {
    //    $('.left-tabs li').removeClass('active');
    //});

    var searchClickEl = $('.normal-search');
    $('.btn-update-fav-product a').click(function () {
        searchClickEl.trigger('click');

        if ($('.right-tabs li').hasClass('active')) {
            $('.right-tabs li').removeClass('active');
        }
    });


    /*    checkFavEl.click(function(){
            var _this    = $(this);
    
            if ( _this.prop('checked') == true) {     
                _this.find('.custom-input').prop('checked' ,false)   
    
            } else {          
                _this.find('.custom-input').prop('checked' ,true)
            }
        });*/

    $('#update-fav').click(function () {
        var _this = $(this);
        selectedEl.empty();

        checkFavEl.each(function () {
            var _this = $(this);

            if (_this.find('.custom-input').prop('checked') == true) {
                var checkFav = _this.children('.custom-form-list').children('span').html();

                if (checkFav != undefined) {
                    selectedEl.append('<li><a href="javascript:;">' + checkFav + '</a></li>');
                }
            }
        })
    });

    /*$('.full-view-myrecord').click(function() {
     $('#my-record-result').hide();
     $('#my-record-detail').show();
     });*/

    $('#sign-in').click(function () {
        var self = this;
        if ($(self).hasClass('active')) {
            $(self).removeClass('active');
            $('.sign-in, .popup').hide();
            $('.overlay-login').hide();
            $("#sign-in").removeClass("active");
        } else {
            $('.sign-in').show();
            var overlayheight = $('#Product_cookies-wrap').outerHeight();
            var scrollYpos = window.pageYOffset;
            if (overlayheight && $('#Product_cookies-wrap').css('display') !== 'none' && overlayheight > scrollYpos)
                $('.overlay-login').css('top', (overlayheight - scrollYpos) + 'px');
            else
                $('.overlay-login').css('top', '0px');

            $('.overlay-login').show();
            setTimeout(function () {
                $(self).addClass('active');
            }, 0);
        }
    });

    //$('#signInCabiDirect').click(function () {
    //    $('.sign-in-directcabi').show();
    //    $('.sign-in-mycabi').hide();
    //});

    //Display sign-in popup on mycabi login error
    //if ($('.sign-in').find('div.errormessage:contains("fail")').length > 0) {
    //    $("#sign-in").addClass("active");
    //    $('.sign-in, .popup').show();
    //    $('.overlay-login').show();
    //}
    
    //Display sign-in popup on cabdirect login error
    if ($("#sign-in").hasClass("active")) {
        $('.sign-in').show();
        var overlayheight = $('#Product_cookies-wrap').outerHeight();
        var scrollYpos = window.pageYOffset;
        if (overlayheight && $('#Product_cookies-wrap').css('display') !== 'none' && overlayheight > scrollYpos)
            $('.overlay-login').css('top', (overlayheight - scrollYpos) + 'px');
        else
            $('.overlay-login').css('top', '0px');

        $('.overlay-login').show();
    }

    // search icons click to show popup
    //$('a.print, a.email, a.download, a.rss, a.trash').click(function (e) {
    //    var self = this;
    //    var selectorClass = $(this).attr('class').toString();

    //    if ($(self).hasClass('active')) {
    //        $(self).removeClass('active');
    //        $('.popup').hide();
    //        $('.overlay-print').hide();
    //        $("a." + selectorClass).removeClass("active");
    //    } else {
    //        $('.popup.' + selectorClass).show();
    //        setTimeout(function () {

    //            $('.overlay-print').show();
    //            $(self).addClass('active');
    //        }, 0);
    //    }
    //});

    //$.fn.bsTooltip = $.fn.tooltip.noConflict();

    $('[data-toggle="tooltip"]').tooltip();

	// Add Note popup
	$('#modal-addnote').on('show.bs.modal', function(e) {
		var _this = this;
		var $invoker = $(e.relatedTarget);
		var $invokerParent = $invoker.parent('td');

		$(_this).find('textarea').val('');

		$(this).find('.addNoteButton').click(function() {

			var addnote = $(_this).find('textarea').val();
			$invokerParent.empty();
			if (addnote != '') {
				$invokerParent.append('<p>' + addnote + '</p><a data-target="#modal-editnote" data-toggle="modal" href="javascript:;"><span class="icon-icon_edit"></span>Edit Note</a>');
			} else {
				$invokerParent.append('<a data-target="#modal-addnote" data-toggle="modal" href="javascript:;"><span class="icon-Icon_AddComment"></span>Add Note</a>');
			}
			$('#modal-addnote').modal('hide');
		});
	});

	// Edit Note popup
	$('#modal-editnote').on('show.bs.modal', function(e) {
		var _this = this;
		var $invoker = $(e.relatedTarget);
		var $invokerParent = $invoker.parent('td');
		var editContent = $invokerParent.find('p').text();

		$(_this).find('textarea').val(editContent);

		$(this).find('.editNoteButton').click(function() {

			var editnote = $(_this).find('textarea').val();

			$invokerParent.empty();
			if (editnote != '') {
				$invokerParent.append('<p>' + editnote + '</p><a data-target="#modal-editnote" data-toggle="modal" href="javascript:;"><span class="icon-icon_edit"></span>Edit Note</a>');
			} else {
				$invokerParent.append('<a data-target="#modal-addnote" data-toggle="modal" href="javascript:;"><span class="icon-Icon_AddComment"></span>Add Note</a>');
			}
			$('#modal-editnote').modal('hide');
		});
	});

	// Edit Annotation popup
	$('#modal-editannotations').on('show.bs.modal', function(e) {
		var _this = this;
		var $invoker = $(e.relatedTarget);
		var $invokerParent = $invoker.parent('.icons').siblings('p');
		var editTitle = $invokerParent.find('strong').text();
		var editContent = $invokerParent.clone().children().remove().end().text().trim();

		$(_this).find("input[type='text']").val(editTitle);
		$(_this).find("textarea").val(editContent);

		$(this).find('.editAnnotationButton').click(function() {
			var editAnnotationTitle = $(_this).find("input[type='text']").val();
			var editAnnotationContent = $(_this).find("textarea").val();


			if ((editAnnotationTitle != '') && (editAnnotationContent != '')) {
				$invokerParent.empty();
				$invokerParent.append('<strong>' + editAnnotationTitle + '</strong><br>' + editAnnotationContent);
				$('#modal-editannotations').modal('hide');
			} else {}

			/*if(editnote != '') {
			 $invokerParent.append('<p>'+ editnote +'</p><a data-target="#modal-editnote" data-toggle="modal" href="javascript:;"><span class="icon-icon_edit"></span>Edit Note</a>');
			 } else {
			 $invokerParent.append('<a data-target="#modal-addnote" data-toggle="modal" href="javascript:;"><span class="icon-Icon_AddComment"></span>Add Note</a>');
			 }
			 $('#modal-editnote').modal('hide');*/
		});
	});

	// Show-Hide annotations
	$('.annotation-btn').click(function() {
		if ($(this).text() == 'Show annotations ') {
			$(this).text('Hide annotations ');
			$(this).append('<span class="icon-icon_minus"></span>');
			$(this).next('.annotation-box-list').slideDown();
		} else {
			$(this).text('Show annotations ');
			$(this).append('<span class="icon-icon_plus"></span>');
			$(this).next('.annotation-box-list').slideUp();
		}
	});

	$('#modal-addannotations').on('show.bs.modal', function(e) {
		$('div.move-annotate').css({
			display: 'none'
		});
	}).on('hide.bs.modal', function(e) {
		if ($('.project-action-list li a.Annotate').hasClass('active')) {
			$('.move-annotate').show()
		}
	});



	// Remove Annotation
	$('#modal-trash').on('show.bs.modal', function(e) {
		var $invoker = $(e.relatedTarget);

		$('.removeAnnotationButton').click(function() {
			if ($invoker.parents('ul').find('li').length == 1) {
				$('.annotation-btn').parent('div').remove();
			}
			$invoker.parents('li').remove();
			$('#modal-trash').modal('hide');
		});
	});

    //// Create New Project button popup
    //$('.createNewProjectButton').click(function () {
    //    $('#modal-addproject').modal('hide');
    //});

    // Tools active / Inactive
    //$('.project-action-list li a').click(function () {
    //    if ($(this).hasClass('active') == false) {
    //        $(this).parents('ul').find('a').removeClass('active');
    //        $(this).addClass('active');
    //    } else {
    //        $(this).removeClass('active');
    //    }
    //});

    //$(".radio-listing").find(".custom-input-radio").click(function () {
    //    var parent = $(this).parents().eq(2).parent(),
    //        indexLi = parent.children('li').index($(this).parents().eq(2));

    //    $(".combine-radio").each(function (index) {
    //        $(this).find('li').eq(indexLi).find('.custom-input-radio').prop('checked', true);
    //    });
    //});

    /* Main search autosize textarea*/
    if (jQuery.isFunction(jQuery.fn.autosize)) {        
        $('.cd4_search-field').autosize();
    }

    $('.cd4_search-field').submitForm();

    $("ul.color-choose-list li a").click(function() {
        $('ul.color-choose-list li').removeClass('active');
        $(this).parent().addClass('active');
        highlightColor = $(this).data("colour");
    });

    if ($('#annotation-setting-user-id').val() !== '') {
        //try load annotator for the user.
        loadAnnotator();
    }

    if (typeof (Storage) !== "undefined") {
        var annotatorLoad = sessionStorage.getItem('annotatorLoad');
        sessionStorage.removeItem('annotatorLoad');

        if (annotatorLoad !== null && annotatorLoad != 'undefined') {
            if (typeof (cd4) !== "undefined") {
                cd4.showMessage("You have selected to use the highlight and annotate tool. Your annotations and highlights will be saved with the record.", "Confirm action");
            }

            if (annotatorLoad === 'annotation') {
                loadAnnotatorTool($('.project-action-list li a.Annotate'));
            } else {
                loadHighlightsTool($('.project-action-list li a.Highlight'));
            }
        }
    }   

}); // end $(document).ready(function () {

var readOnlyAnnotater = $("#annotation-setting-read-only-annotator").val();
var readOnlyHighlighter = $("#annotation-setting-read-only-highlighter").val();
var highlightColor = $("#annotation-setting-highlight-colour").val();
var apiPrefix = $("#annotation-setting-api-prefix").val();

function loadHighlightsTool($elem) {
    clearActiveTool();
    
    $('.move-annotate').hide();
    $('.listing-detail .list-content .abstract').find('div').removeClass('highlightText');

    if ($($elem).parent('li').prev('li').css('display') == 'list-item') {
        $($elem).parent('li').prev('li').hide();
        $($elem).parents('ul').siblings('.color-choose-list').show();
    } else {
        $($elem).parent('li').prev('li').show();
        $($elem).parents('ul').siblings('.color-choose-list').hide();
    }
    $('ul.color-choose-list li').removeClass('active');
    $('ul.color-choose-list').find("li a.yellow").parent().addClass('active');
    highlightColor = 'yellow';
    readOnlyHighlighter = !readOnlyHighlighter;

    if (!readOnlyHighlighter) {
        $elem.addClass('active');
        // When highlighter tool is active, disable index term highlight
        $('#chkHighlightIndexTerms').attr('checked', false);
        toggleIndexTermHighlight();
    }

    readOnlyAnnotater = true;
    loadAnnotator();

}

function loadAnnotatorTool($elem) {
    clearActiveTool();
    

    $($elem).parent('li').prev('li').prev('li').show();
    $($elem).parents('ul').siblings('.color-choose-list').hide();
    readOnlyAnnotater = !readOnlyAnnotater;

    if (!readOnlyAnnotater) {
        $elem.addClass('active');
        // When annotator tool is active, disable index term highlight
        $('#chkHighlightIndexTerms').attr('checked', false);
        toggleIndexTermHighlight();
    }

    readOnlyHighlighter = true;
    highlightColor = null;
    loadAnnotator();
}

function clearActiveTool() {
    $('.project-action-list li a').each(function() {
        $(this).removeClass("active");
    });
}


function loadAnnotator() {
    $('div.annotateHere').next($('#input[type=hidden]')).val($('div.abstract').html());
    $("ul.annotation-box-list").empty();
    $('.annotateHere').annotator('destroy');
    var cabiAnnotater = $('.annotateHere').annotator({
        readOnly: (readOnlyAnnotater && readOnlyHighlighter) ? true : false,
        isHighlighter: !readOnlyHighlighter
    });
    cabiAnnotater.annotator('addPlugin', 'CabiAnnotate');
    var entityUrn = $("#annotation-setting-entity-urn").val();

    if( apiPrefix ) {
        cabiAnnotater.annotator('addPlugin', 'Store', {
            annotationData: {
                "EntityUrn": entityUrn,
                "AnnotationType": 1,
            },
            prefix: apiPrefix,
            urls: {
                // These are the default URLs.
                // NB HTTP Verbs have also been modified - see cabi.annotate.js Annotator.Plugin.Store.prototype._methodFor()
                // in order to avoid using DELETE and PUT which fail on live servers. See bugid 17700
                read: 'annotations?entityurn=' + entityUrn + '&pageNo=1&pageSize=100',
                create: 'annotations',
                update: 'annotations/update/:id', // originally update: "/annotations/:id",
                destroy: 'annotations/destroy/:id', // originally destroy: 'annotations/:id',
                search: '/search'
            }
        });
    }
}

function updateRightAnnotationBoxes(annotation) {
    var list = $("ul.annotation-box-list li");
    $.each(list, function (k, v) {
        var el = $(v).find('.deleteAnnotation').attr('data-id')
        if (el == annotation.Id) {
            $(v).addClass("removeMe").remove(); 
        }

    })
    if (annotation.Title && annotation.Text) {
        var html = '<li>' +
			'<h2><span class="icon-Icon_Annotations"></span>' + ($("ul.annotation-box-list li").length + 1) + '</h2>' +
			'<p><strong>' + annotation.Title + '</strong><br>' + annotation.Text + '</p> ' +
			'<div class="text-right icons">';
        if (!readOnlyAnnotater) {
            html += '<a title="Trash" href="javascript:void(0)" class="deleteAnnotation" data-id="' + annotation.Id + '"><span class="icon-icon_trash"></span></a>';
        }
        html += '</div> </li > ';
        $("ul.annotation-box-list").append(html);
        $("ul.annotation-box-list").parent().removeClass("hide");
    }

    if ($("ul.annotation-box-list li").length == 0) {
        $("ul.annotation-box-list").parent().addClass("hide")
    }
    $("a.deleteAnnotation").unbind('click').click(function() {
        var id = $(this).data('id');
        $.ajax({
            url: apiPrefix + "annotations/destroy/" + id,
            type: 'POST',
            success: function(result) {
                loadAnnotator();
                if ($("ul.annotation-box-list li").length == 0) {
                    $("ul.annotation-box-list").parent().addClass("hide")
                }
                // Do something with the result
            }
        });
    });
}


function checkedFavProduct() {
    var checkFavEl = $('#your-product ul li'),
        selectedEl = $('#selected-product');
    checkFavEl.each(function() {
        var _this = $(this),
            checkFav = $(this).children('.custom-form-list').children('span').html();

        if (checkFav != undefined) {
            selectedEl.find('li').each(function() {
                var selectedFav = $(this).find('a').html();

                if (selectedFav.indexOf(checkFav) != -1) {
                    _this.find('.checkbox').prop('checked', true)
                }
            });
        }
    });
}

function checkboxTick() {
    if ($(this).prop('checked') == true) {
        if ($(this).parents('.custom-form-list').siblings('.panel-group').length > 0) {
            $(this).parents('.custom-form-list').siblings('.panel-group').find('.custom-input').prop('checked', true)
        }

    } else {
        if ($(this).parents('.custom-form-list').siblings('.panel-group').length > 0) {
            $(this).parents('.custom-form-list').siblings('.panel-group').find('.custom-input').prop('checked', false)
        }

    }
}
function autoScroll(e, _this, header) {
    var section = $(_this).attr('href');
    if (section.indexOf('#') >= 0) {
        e.preventDefault();

        if ($(section).length) {


            $('html, body, main').animate({
                scrollTop: 0
            }, 0);

            var scrollTop = $(section).offset().top - header;

            $('html, body, main').animate({
                scrollTop: scrollTop
            }, 500);
        }
    }
}

//For IE7
function zIndexLi() {
    var zIndex = 2000;
    $('.advance-search-list ul li, #mysearch #sort-wrapper tr').each(function() {
        if (zIndex > 0) {
            zIndex -= 5;
            $(this).css('z-index', zIndex)
        }
    })
}

function placeHolder() {
    //$('[placeholder]').each(function () {
    //    if ($(this).val() == '' && $(this).attr('placeholder') != undefined) {
    //        //alert($(this).val());
    //        //$(this).val($(this).attr('placeholder'))
    //    }
    //});
    //$('[placeholder]').focus(function () {
    //    if ($(this).val() == $(this).attr('placeholder')) {
    //        $(this).val('');
    //    }
    //});
    //$('[placeholder]').blur(function () {
    //    if ($(this).val() == '') {
    //        $(this).val($(this).attr('placeholder'));
    //    }
    //});
}


/* function to validate password for CD4 site.*/
function passwordValidate(source, args) {
    var candidateText = args.Value;
    var reCaptials = new RegExp("[A-Z]");
    var reLowercase = new RegExp("[a-z]");
    var reDigit = new RegExp("[0-9]");
    var reNonAlphaNumeric = new RegExp("[^A-Za-z0-9]");

    var matches = 0;

    if (candidateText.match(reCaptials)) matches++;
    if (candidateText.match(reLowercase)) matches++;
    if (candidateText.match(reDigit)) matches++;
    if (candidateText.match(reNonAlphaNumeric)) matches++;

    args.IsValid = ((candidateText.length >= 6) && (matches >= 2));

    var messageDivId = source.controltovalidate + "_ValidationMessage";
    var messageElement = document.getElementById(messageDivId);

    if (messageElement !== null) {
        if (!args.IsValid) {
            messageElement.style.display = "list-item";
        }
        else {
            messageElement.style.display = "none";
        }
    }
};

/* function to validate privay policy ticked for CD4 site.*/
function AcceptPrivacyPolicyCheckBoxValidation(source, args) {
    args.IsValid = $("input[id$='chkboxPrivacyPolicy']").prop('checked');
};

function searchresultsCheckboxSelection()
{
    var countSelection = 0;
    var countTotal = 0;
    $('#search-result .listing-bar').find('.listing').each(function () {
        if ($(this).find('.custom-input').prop('checked') == true) {
            countSelection = countSelection + 1;
        }
        countTotal = countTotal + 1;
    })

    if (cd4.isMobileSite) $("#numSelectedRecords").html(countSelection);

    //Set select all checkbox to true if all checkboxes are checked and to false if one of the checkbox is uncheck    
    if (countSelection < countTotal) {
        $('#search-result').find('.select-all-listing').prop('checked', false)
    }
    else if (countSelection = countTotal) {
        $('#search-result').find('.select-all-listing').prop('checked', true)
    }
}

function myprojectsCheckboxSelection() {
    var countSelection = 0;
    var countTotal = 0;
    $('#myprojects-result .listing-bar').find('.listing').each(function () {
        if ($(this).find('.custom-input').prop('checked') == true) {
            countSelection = countSelection + 1;
        }
        countTotal = countTotal + 1;
    })

    if (cd4.isMobileSite) $("#numSelectedRecords").html(countSelection);

    //Set select all checkbox to true if all checkboxes are checked and to false if one of the checkbox is uncheck    
    if (countSelection < countTotal) {
        $('#search-result').find('.select-all-listing').prop('checked', false)
    }
    else if (countSelection = countTotal) {
        $('#search-result').find('.select-all-listing').prop('checked', true)
    }
}

//function checkboxSeclection() {
//    var countSelection = 0;
//    $('#mysearch #sort-wrapper tr').each(function () {
//        if ($(this).find('.custom-input').prop('checked') == true) {
//            flag = true;
//            countSelection = countSelection + 1;
//        }
//    });

//    if (countSelection >= 1) {
//        $('.combine-selected').children('.radio-listing').show();
//    } else {
//        $('.combine-selected').children('.radio-listing').hide();
//    }

//    if (countSelection >= 2) {
//        $('.combine-selected').children('span').hide().next('a').show();
//    } else {
//        $('.combine-selected').children('span').show().next('a').hide();
//    }

//}



//function tableStyling() {
//    $('#mysearch #sort-wrapper tr').removeClass('tr-first tr-last alter1 alter2');

//    $('#mysearch #sort-wrapper tr:first').addClass('tr-first');
//    $('#mysearch #sort-wrapper tr:last').addClass('tr-last');

//    $('#mysearch #sort-wrapper tr:even').addClass('alter1');
//    $('#mysearch #sort-wrapper tr:odd').addClass('alter2');
//}

//function projecttableStyling() {
//    $('#myproject #sort-wrapper tr').removeClass('tr-first tr-last alter1 alter2');

//    $('#myproject #sort-wrapper tr:first').addClass('tr-first');
//    $('#myproject #sort-wrapper tr:last').addClass('tr-last');

//    $('#myproject #sort-wrapper tr:even').addClass('alter1');
//    $('#myproject #sort-wrapper tr:odd').addClass('alter2');
//}

//function projectreporttableStyling() {
//    $('#myprojectreport #sort-wrapper tr').removeClass('tr-first tr-last alter1 alter2');

//    $('#myprojectreport #sort-wrapper tr:first').addClass('tr-first');
//    $('#myprojectreport #sort-wrapper tr:last').addClass('tr-last');

//    $('#myprojectreport #sort-wrapper tr:even').addClass('alter1');
//    $('#myprojectreport #sort-wrapper tr:odd').addClass('alter2');
//}

//function summarytableStyling() {
//    $('#activitySummary #sort-wrapper tr').removeClass('tr-first tr-last alter1 alter2');

//    $('#activitySummary #sort-wrapper tr:first').addClass('tr-first');
//    $('#activitySummary #sort-wrapper tr:last').addClass('tr-last');

//    $('#activitySummary #sort-wrapper tr:even').addClass('alter1');
//    $('#activitySummary #sort-wrapper tr:odd').addClass('alter2');
//}

//function projectReports() {
//    $('#projectReport #sort-wrapper tr').removeClass('tr-first tr-last alter1 alter2');

//    $('#projectReport #sort-wrapper tr:first').addClass('tr-first');
//    $('#projectReport #sort-wrapper tr:last').addClass('tr-last');

//    $('#projectReport #sort-wrapper tr:even').addClass('alter1');
//    $('#projectReport #sort-wrapper tr:odd').addClass('alter2');
//}

/* Submit form on enter  */
$.fn.submitForm = function () {
    if ($(this).length) {
        $(this).keydown(function (e) {

            var keyCode = (e.keyCode ? e.keyCode : e.which);

            if (keyCode === 13) {
                $('#hbSendSearchRequest').trigger('click');
                return false;
            }
        });
    }
};


var winPop;
function PopupCenter(pageURL, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    if (winPop && !winPop.closed) {
        //winPop.close();
        //winPop = window.open('', 'winPop', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        if (winPop.location.href.indexOf(pageURL) < 0)
            winPop.location.href = pageURL;
        winPop.focus();
    }
    else {
        winPop = window.open('', 'winPop', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        winPop.location.href = pageURL;
        winPop.focus();
    }
}

//http://stackoverflow.com/questions/12138236/check-if-window-is-already-open-window-open
//open popup in same window while browsing on any page
//Not working on pre-rel
function PopupCenterNew(pageURL, target, w, h) {
    // open a blank "target" window
    // or get the reference to the existing "target" window
    target = 'Mywinname';
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    var winref = window.open('', target, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left, true);

    // if the "target" window was just opened, change its url
    if (winref.location.href === 'about:blank' || winref.location.href.indexOf(pageURL) < 0) {
        winref.location.href = pageURL;
    }

    winref.focus();
    return winref;
}

/* Cookie Notification */
$.fn.hideCookiesNotification = function (wrapper) {

    $(this).click(function (event) {

        event.preventDefault();

        $(wrapper).slideUp();
    });

};

$(window).scroll(function () {
    var overlayheight = $('#Product_cookies-wrap').outerHeight();
    var scrollYpos = window.pageYOffset;
    if (overlayheight && $('#Product_cookies-wrap').css('display') !== 'none' && overlayheight > scrollYpos)
        $('.overlay-login').css('top', (overlayheight - scrollYpos) + 'px');
    else
        $('.overlay-login').css('top', '0px');
});

function loadEntityPopup(title, entityUrl) {
    // set the popup title
    $("#titleThesaurusEntity").text(title);

    // set the iframe source
    var iframeUrl = "/cab-thesaurus-entity/?uri=" + encodeURI(entityUrl) + "&title=" + title;
    $("#ifrmThesaurusEntity").attr("src", iframeUrl);

    // prepare the popup
    var popupEntity = $("#popupEntity");
    popupEntity.css({ 'top': $(window).scrollTop() + 50, 'right': 0, 'margin': '0 auto', 'height': $(window).height() - 200, 'display': 'table', 'background-color': '#fff' });
    popupEntity.show();
    $(".overlay").show();
}