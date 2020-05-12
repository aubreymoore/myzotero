function tabDeepLink(selector) {
    $(selector).each(function() {
        var $tabs = $(this);
        var anchor = window.location.hash;
        
        if (anchor.length && $tabs.find('[href="'+anchor+'"]').length) {
            $tabs.foundation('selectTab', $(anchor));
        } else {
        	$tabs.foundation('selectTab', $('#CurrentIssue'));
        }
        $tabs.on('change.zf.tabs', function() {
            var anchor = $tabs.find('.tabs-title.is-active a').attr('href');
            history.pushState({}, "", anchor);
        });
    });
}
tabDeepLink('.tabs');