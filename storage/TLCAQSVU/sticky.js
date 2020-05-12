/*!
 * A global namespace for F1000 JavaScript
 * Should eventually be in a separate file
 */
var F1000 = F1000 || {};


/*!
 * Sticky
 */
F1000.Sticky = function($container, minTop, minBottom, settings) {
    settings = settings || {};
    minTop = minTop || -1;
    minBottom = minBottom || -1;

    var $window = $(window);
    var isOffTop = false;
    var isOffBottom = false;

    $window.on('scroll', debounce(onWindowScroll, 10));

    if(settings.$spacers) {
        $window.on('resize', onWindowResize);
        onWindowResize();
    }

    recalculate();

    function setMinTop(value) {
        minTop = value;
        isOffTop = false;
        recalculate();
    }

    function setMinBottom(value) {
        minBottom = value;
        isOffBottom = false;
        recalculate();
    }

    function onWindowResize(evt) {
        containerHeight = $container.outerHeight();

        if(settings.$spacers) {
            settings.$spacers.css({
                height: containerHeight
            });
        }
    }

    function onWindowScroll(evt) {
        recalculate();
    }

    function recalculate() {
        var top = $window.scrollTop();
        var bottom = top + $window.height();

        checkTop(top);
        checkBottom(bottom);
    }

    function checkTop(top) {
        if(minTop < 0) {
            return false;
        }

        if(top > minTop) {
            if(!isOffTop) {
                isOffTop = true;
                $container
                    .addClass('is-off-top')
                    .removeClass('not-off-top');
            }
        } else {
            if(isOffTop) {
                isOffTop = false;
                $container
                    .removeClass('is-off-top')
                    .addClass('not-off-top');
            }
        }
    }

    function checkBottom(bottom) {
        if(minBottom < 0) {
            return false;
        }

        if(bottom < minBottom) {
            if(!isOffBottom) {
                isOffBottom = true;
                $container
                    .addClass('is-off-bottom')
                    .removeClass('not-off-bottom');
            }
        } else {
            if(isOffBottom) {
                isOffBottom = false;
                $container
                    .removeClass('is-off-bottom')
                    .addClass('not-off-bottom');
            }
        }
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    return {
        setMinBottom: setMinBottom,
        setMinTop: setMinTop,
        isOffTop: isOffTop,
        recalculate: recalculate
    }
}