$(document).ready(function () {
    $("div.serials-list input#txtSerialSearchTerm").bind("keydown", function (event) {
        // track enter key
        var keycode = (event.keyCode ? event.keyCode : (event.which ? event.which : event.charCode));
        if (keycode == 13) { // keycode for enter key
            // force the 'Enter Key' to implicitly click the Update button
            $('#fetchSerials').click();
            return false;
        } else {
            return true;
        }
    }); // end of function

    $('#serialSearchResult').hide();
    $('#serialsLoading').hide();
    if (getParameterByName('sbt')) {

        var isAlphaSearch = (getParameterByName('as') === "1");
        var term = getParameterByName('sbt');
        if (!isAlphaSearch)
            $("input#txtSerialSearchTerm").val(term);

        var pn = 0;
        if (getParameterByName('pn'))
            pn = getParameterByName('pn');

        if (isAlphaSearch) {
            PerformAlphaSearch(term, pn);
        } else {    
            PerformSearch(pn);
        }
    }
}); // end of document ready

function PerformAlphaSearch(character, dispContainer) {
    SetSerialDisplay(true, character, dispContainer);
}

function PerformSearch(dispContainer) {
    var serialSearchTerm = $("input#txtSerialSearchTerm").val();
    SetSerialDisplay(false, serialSearchTerm, dispContainer);
}

function SetSerialDisplay(isAlphaSearch, serialSearchTerm, dispContainer) {
    var pageLimit = cd4.isMobileSite ? 10 : 15;
    if (serialSearchTerm.length >= 1) {
        $('#serialsLoading').show();
        var urlAuthorSearch = "/search/serialscitedhandler/?sbt=" + encodeURIComponent(serialSearchTerm) + ((isAlphaSearch) ? "&as=1" : "");

        $.getJSON(urlAuthorSearch, function (data) {
            var selectedSerial = '';
            if (getParameterByName('q').match("^do")) {
                selectedSerial = getParameterByName('q').substr(getParameterByName('q').indexOf(":") + 1).replace(/\"/g, "");
            }
            else if ((getParameterByName('q').match("^sn"))) {
                selectedSerial = getParameterByName('q').substr(getParameterByName('q').indexOf(":") + 1).replace(/\"/g, "");
            }

            var jsonObj = data;

            $.each(data, function () {
                this.TitleUriEncoded = encodeURIComponent(this.Title);
                this.searchTerm = serialSearchTerm;
                if (!this.Issn)
                    this.Issn = '';
                (isAlphaSearch) ? this.isAlphaSearch = "1" : this.isAlphaSearch = '';
            });

            if (dispContainer === '0' || isNaN(dispContainer))
                parent.location.hash = '';
            else
                window.location.hash = "#serialsDisplayContainer-" + dispContainer;

            if (jsonObj.length > 0) {
                $('#serialSearchResult').show();
                $("#serialsDisplayContainer").showResults(jsonObj, {
                    resultTarget: '#serialSearchResults',
                    pagesTarget: '.pagination',
                    field: 'do',
                    searchKeyword: selectedSerial,
                    arrows: ['<span class="ui-icon ui-icon-triangle-1-n"></span>', '<span class="ui-icon ui-icon-triangle-1-s"></span>'],
                    pages: pageLimit
                });
                $("#serialdisplay").empty();
                
                $("div.pageSize > select").change(function () {

                    $('#serialSearchResults').empty();
                    $('.pagination').empty();
                    $("#serialsDisplayContainer").showResults(jsonObj, {
                        resultTarget: '#serialSearchResults',
                        pagesTarget: '.pagination',
                        field:'do',
                        searchKeyword: selectedSerial,
                        arrows: ['<span class="ui-icon ui-icon-triangle-1-n"></span>', '<span class="ui-icon ui-icon-triangle-1-s"></span>'],
                        pages: pageLimit
                    });
                   
                });

                $('#serialSearchResults').find('a').each(function () {
                    if ($(this).text() === selectedSerial) {
                        $(this).css('background-color', 'yellow');
                    }
                    addPagingFromHash(this);
                });
            }
            else {
                $('#serialSearchResult').hide();
                $('#serialSearchResults').empty();
                $('.pagination').empty();
                $('.resultsHeading').empty();
                $(".pageSize").css({ display: 'none' });
                $("#serialdisplay").text("No serials can be found for: " + serialSearchTerm);
            }

            $('#serialsLoading').hide();
        })
        .fail(function(jqXmlHttpRequest) {
            console.dir(jqXmlHttpRequest);
            $('#serialSearchResult').hide();
            $('#serialSearchResults').empty();
            $('.pagination').empty();
            $('.resultsHeading').empty();
            $(".pageSize").css({ display: 'none' });
            $("#serialdisplay").text("No serials can be found for: " + serialSearchTerm);
            $('#serialsLoading').hide();
        });

    }
    else {
        $('#serialsLoading').hide();
        $('#serialSearchResult').hide();
        $("#serialdisplay").html("<span class='has-error'><strong class='help-block'>Please enter at least a letter to perform the search.</strong></span>");
        $('.pagination').empty();
    }
};