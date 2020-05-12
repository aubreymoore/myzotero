/* dom ready functions */
jQuery(document).ready(function($){
    $.ajaxSetup({cache: true});

    /* User Controls */
    if( __tnt.user.loggedIn ){
        $userDir = $('.tn-user-profile-url').data('app');
        $('.tn-user-screenname').html(__tnt.user.screenName);
        if( __tnt.user.avatar ) $('.tn-user-avatar').attr('src', __tnt.user.avatar);
        $('.tn-user-profile-url').attr('href', $userDir+'profile/'+__tnt.user.screenName+'/');
        $('.logged-in').show();
    } else {
        $('.not-logged-in').show();
    }

    /* off canvas menus */
    $('[data-toggle=offcanvas]').on(__tnt.client.clickEvent, function(){
        var drawerClass = ( $(this).data('target') === 'left' ? 'active-left' : 'active-right');
        $('html').toggleClass('drawer-open '+ drawerClass);
        return false;
    });
    $('.offcanvas-close-btn').on(__tnt.client.clickEvent, function(){
        $('html').removeClass('drawer-open active-left active-right');
        return false;
    });

    /* touch based events */
    if(__tnt.client.platform.touchDevice){
        $.getScript('./components/plugins/resources/scripts/jquery.touchSwipe.min.js', function( data, textStatus, jqxhr ) {
            $('.carousel-inner').swipe( {
                swipeLeft:function(event, direction, distance, duration, fingerCount) {
                    $(this).parent().carousel('prev');
                },
                swipeRight: function() {
                    $(this).parent().carousel('next');
                }
            });
        });
    }

    $('.hide-onload').hide();
    $('.show-onload').show();

    /* save asset to user list */
    $('.save-asset-to-list').on('submit', function(event){
        event.preventDefault();
        if( __tnt.user.loggedIn ){
            var oUUID = $(this).data('uuid');
            var btnObj = '.save-list-'+oUUID+'-btn';
            $.ajax({
                type: "POST",
                url: $(this).attr('action'),
                data: $(this).serialize(),
                error: function(result){
                    alert('An error ocurred. Please try again.');
                },
                success: function( result ){
                    if( result.success ){
                        $(btnObj).addClass('disabled').attr('title', 'Saved');
                        $(btnObj+' .asset-save-icon').removeClass('fa-heart-o').addClass('fa-heart');
                        $(btnObj+' .share-expand').text('Saved');
                    }
                    else {
                        $(btnObj).addClass('btn-danger');
                        $(btnObj+' .share-expand').text('Error');
                        setTimeout( function(){
                            $(btnObj).removeClass('btn-danger');
                            $(btnObj+' .share-expand').text('Save');
                        }, 1000);
                    }
                }
            });
        }
        else {
            var currURL = window.location.href;
            var qAdd = window.location.search ? '&' : '?';
            var refererURL = encodeURIComponent( currURL + qAdd +'save_asset=' + $(this).data('uuid') );
            top.location.href = '/users/login/?referer_url='+refererURL;
        }
        return false;
    });

    /* tooltips */
    if( $('[data-toggle="tooltip"]').length > 0 ){
            $('[data-toggle="tooltip"]').tooltip();
    }

    /* new window */
    $('[data-toggle="new-window"]').click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href'),
            width = $(this).data('new-window-width'),
            height = $(this).data('new-window-height'),
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
        window.open(url,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
    });

    /* sortable tables */
    if(jQuery().stupidtable) {
        $(".table-sortable").stupidtable();
    }

});
