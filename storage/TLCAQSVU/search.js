$(function(){
	
	var addClearLink = function() {
        $(this).before('<a class="clearMultiselect">clear</a>');
    };
    
    var loadAdvancedSearchForm = function(callback) {
        var URLString = window.location.search;
        $('#advancedSearch').load('/search/advanced' + URLString, function() {
            $('#advancedSearch select[multiple=true]').each(addClearLink);
            if (callback) {
                callback();
            }
        });
    };

    $('#headerSearchSubmit').click(function(event) {
        event.preventDefault();
        if(!handleBlankQuery()) {
            $('#searchForm').submit();
        }
    });

    $('#advancedSearch').on('click', '#headerAdvancedSearchSubmit', function(event) {
        event.preventDefault();
        if(!handleBlankAdvancedQuery()) {
            $('#advancedSearchForm').submit();
        }
    });

    function handleBlankAdvancedQuery() {
        if($("#advancedSearchForm :input[value!='']").serializeArray().length > 2) //It is 2 because we always sent a value in queryField and additionalQueryField
            return false;
        $("#first-query-term").click();
        $("#first-query-term").focus();
        return true;
    }
    function handleBlankQuery() {
        if($.trim($("#header-search-input").val()).length > 0)
                return false;

        $("#header-search-input").click();
        $("#header-search-input").focus();
        return true;
    }

    // Advanced search
    $('#advanced-search-link').click(function(event) {
        var newLeft = (($(window).width() - $("#advancedSearch").width()) / 2) - 100;
        var callback = function() {
            $('#advancedSearch').toggle();
        };
        if($('#advancedSearch').is(':empty')) {
            loadAdvancedSearchForm(callback);
//            $('#advancedSearch').css({
//                'top' : $(this).position().top - 24,
//                'left' : $(this).position().left - 298
//            });
            if (isNaN(newLeft)) { newLeft = $(this).position().left - 100; }
            if (newLeft < 0) { newLeft = $(this).position().left; }
            $('#advancedSearch').css({
                'top' : $(this).position().top - 100,
                'left' : newLeft
            });
        } else {
            callback();
        }
        event.preventDefault();
    });
    $('#advancedSearch').on('click', '#cancelAdvancedSearchLink, #cancelAdvancedSearcTopLink', function(event) {
        $('#advancedSearch').toggle();
        event.preventDefault();
    });
    
    // Advanced search - Clicking anywhere outside the box would make it disappear.
    $(document).click(function(event) {
        if(!$(event.target).parents().add(event.target).is("#advancedSearch, #advanced-search-link, #advancedSearchHomeLink, .faux-option")) {
            $('#advancedSearch').empty();
            $('#advancedSearch').hide();
        }
    });

    // Add a 'clear' option for multi-select lists
    $('#refineSearch select[multiple=true]').each(addClearLink);
    $('#advancedSearch').on('click', '.clearMultiselect', function() {
        $(this).siblings('select').children().each(function() {
            $(this).attr('selected', false);
        });
    });
});