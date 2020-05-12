// Prefix all functions "cd4schres" to avoid naming clashes

function cd4schresclick() {
    alert("cd4schresclick");
}

// Called when Sort field dropdown is changed
function cd4schresSortChanged(sortParam) {
    console.log("cd4schresSortChanged: " + sortParam);
    var reqUrl = window.location.toString();
    console.log("Request URL: " + window.location.toString());
    var newUrl = '';
    var re = /&sort=\w+/i;
    if (reqUrl.match(re))
        newUrl = reqUrl.replace(re, "&sort=" + sortParam);
    else
        newUrl = reqUrl + "&sort=" + sortParam;
    console.log("New Url: " + newUrl);
    window.location.replace(newUrl);
}

// Called when Rows per Page dropdown is changed
function cd4schresRowsPerPageChanged(rowsPerPage) {
    console.log("cd4schresRowsPerPageChanged: " + rowsPerPage);
    document.cookie = "rowcount" + "=" + rowsPerPage + "; path=/";
    var reqUrl = window.location.toString();
    console.log("Request URL: " + window.location.toString());
    var newUrl = "";
    var regex = /&rows=\d+/i;
    if (reqUrl.match(regex))
        newUrl = reqUrl.replace(regex, "&rows=" + rowsPerPage);
    else
        newUrl = reqUrl + "&rows=" + rowsPerPage;
    var pageRegex = /&page=\d+/i;
    newUrl = newUrl.replace(pageRegex, "");
    console.log("New Url: " + newUrl);
    window.location.replace(newUrl);
}

function cd4schresPageChanged(hyperlink) {
    console.log("cd4schresPageChanged: " + hyperlink);
    var pageWanted = hyperlink.innerText;
    if (pageWanted == undefined)
        pageWanted = hyperlink.textContent;
    var reqUrl = window.location.toString();
    console.log("Request URL: " + window.location.toString());
    var newUrl = "";
    var regex = /&page=\d+/i;
    if (reqUrl.match(regex))
        newUrl = reqUrl.replace(regex, "&page=" + pageWanted);
    else
        newUrl = reqUrl + "&page=" + pageWanted;
    console.log("New Url: " + newUrl);
    window.location.replace(newUrl);
}

// Search Refiner code, migrated and adapted from script.js
// Adaptation required for multiple lightboxes - original code just had one.
$(document).ready(function () {
    $(document).on("click", "body", function (e) {
        // If lightbox is shown, and you click (er, something or other), then hide the lightbox
        if (!$(e.target).hasClass('popup') && $(e.target).parents('.popup').length == 0 && $(e.target).parents('.refineby, .refineby-type').length == 0) {
            $('.refineby-content').hide();
            $('.refineby li,.refineby-type li').removeAttr('class');
            $('.overlay, .overlay-type').hide();
        }
    });

    // If lightbox is shown, and you click outside it, then hide the lightbox
    $(document).on("click", "body", function (e) {
        if ($(e.target).hasClass('overlay') || $(e.target).hasClass('overlay-type')) {
            $('.refineby-content').hide();
            $('.refineby li,.refineby-type li').removeAttr('class');
            $('.overlay, .overlay-type').hide();
        }
    });

    // If the lightbox is shown, and you click the default button, hide the lightbox - now not required
    //$('.refineby-content .btn-default').click(function () { ...

    // If the lightbox is shown, and you click the Close link, hide the lightbox
    $('.refineby-content .close').click(function () {
        $('.refineby-content').hide();
        $('.overlay, .overlay-type').hide();
        $('.refineby li,.refineby-type li').removeAttr('class');
        //clear UI on close.
        $(this).siblings('ul.checkbox-listing').empty();
        $('#refinerOverlay').hide();
    });
});

// Refiner: When you click a sidebar facet-field link, show the lightbox (Search Refiner)
function cd4schresShowFacetVals(e, atag, facetField, fieldtoSearch) {
    // Get screen position:
    cd4showVals(e, atag, ".refineby", facetField, ".overlay");

    if (fieldtoSearch != undefined) {
        var index_no = $(atag).parent('li').index(), // not sure what $(atag) does - seems to turn it into a different sort of object
        buttonTop = $(atag).offset().top,
        defaultTop = $('aside.a-refiner').offset().top,
        popupTop = buttonTop - defaultTop;
        $("#refinerOverlay").css({
            top: popupTop,
            right: 229,
            'z-index': 2000,
            width: $("div.refineby-content[data-facet-field='" + facetField + "']").outerWidth()
        });

        var facetselHeight = $("div.refineby-content[data-facet-field='" + facetField + "']").find('div.refine-item-list').outerHeight();
        if (facetField == 'Year') {
            $("#img-load").css({
                top: 100 + facetselHeight,
                left: 430
            });
        }
        else {
            $("#img-load").css({
                top: 80 + facetselHeight,
                left: 300
            });
        }

        $('#refinerOverlay').fadeIn();

        if (facetField == 'Year') {
            LoadHighChart(facetField);
        }
        else {
            LoadTreeMap(facetField, fieldtoSearch);
        }
        $('#refinerOverlay').delay(800).fadeOut();
    }
}

function cd4showVals(e, atag, refinerClass, field, overlayClass) {
    // Get screen position:
    var index_no = $(atag).parent('li').index(), // not sure what $(atag) does - seems to turn it into a different sort of object
        buttonTop = $(atag).offset().top,
        defaultTop = $('aside.a-refiner').offset().top,
        popupTop = buttonTop - defaultTop;
    // Get the lightbox element
    var lightbox = $("div.refineby-content[data-facet-field='" + field + "']");
    if ($(atag).parent('li').hasClass('active')) { // ...then hide the lightbox
        lightbox.hide();
        $(overlayClass).hide();
        $(refinerClass + " li").removeAttr('class');
    } else { // ...otherwise, show the lightbox
        lightbox.css({ 'top': popupTop }).show();
        $(refinerClass + " li").removeAttr('class');
        $(refinerClass + " li").eq(index_no).addClass('active');
        $(overlayClass).show();
    }
    // Scroll the window
    var scrollHeight = $(window).scrollTop() + e.clientY - 100; // e is the event
    if (scrollHeight > 0) {
        $('html, body').animate({
            scrollTop: scrollHeight
        }, 400); // 800 from Modular - seems slow and irritating. 400 more businesslike.
    }
}


function cd4schResShowTypeVals(e, atag, type) {
    cd4showVals(e, atag, ".refineby-type", type, ".overlay-type");
    e.preventDefault();
}

function LoadHighChart(facetField) {

    //change the dropdown information:
    var $select = $('div[data-facet-value="' + facetField + '"]').find('select');
    //hide for year.
    $select.parent().hide();
    $select.prop('onchange', null);

    //Get the id of the chart
    var id = '#chart_' + facetField.replace(' ', '_');

    //Get the search term
    var searchTerm = $('div#cd4schresEditQuery').find('textarea').val();

    //Create search url
    var searchUrl = '/search/facetsearch/';

    var facetQuery = {
        "query": searchTerm,
        "numfacets": 100,
        "facetName": facetField.toLowerCase()
    };

    //console.log(searchUrl);

    // Find the existing "facets"
    var requrl = window.location.href;
    var facetCount = 0;
    var objQueryParams = getQueryParams(requrl);
    facetCount = getParameterByName('facets');
    var qsFacetValues = new Array();
    if (facetCount > 0) {
        for (i = 1; i <= facetCount; i++) {
            var facet = getJsonValueByKey('facet' + i + 'f', objQueryParams);
            var ffname = '';
            if (Object.prototype.toString.call(facet) === '[object Array]' && facet.length > 0) {
                ffname = facet[0].value;
            }

            if (ffname === facetField) {
                for (j = 0; j < objQueryParams.length; j++) {
                    if (objQueryParams[j].key === 'facet' + i + 'v') {
                        qsFacetValues.push(objQueryParams[j].value);
                    }
                }
            }
        }
    }

    /*HighChart start*/
    $.post(searchUrl,
            facetQuery)
    .done(function (data) {
        //get data
        var Matches = JSON.stringify(data.Matches);
        Matches = Matches.replace(/[{}]/g, "");

        //split data
        var arrMatches = new Array();
        arrMatches = Matches.split(",");
        //arrMatches.reverse();

        //Populate facets in checkbox listing
        var ulChkbox = $('div[data-facet-value="' + facetField + '"]').find('ul.checkbox-listing');
        var ulIsPopulated = false;
        if (ulChkbox.children().length > 0)
            ulIsPopulated = true;
        //ulChkbox.empty();

        //li format for checkboxlist    
        var liFormat = "<li style='display: {0};'><div class='custom-form-list'><div class='custom-control'><input type='checkbox' onchange='refinerDataSetValue(this)' data-facet-value='{1}' class='custom-input checkbox' id='{2}' {3}><span></span></div><label for='{4}' {5}>{6} ({7})</label></div></li>";
        //0 = displaystyle, 1 = name, 2 = checkboxId, 3 = checkbox disabled, 4 = checkboxId, 5 = disabled style, 6 = name,7 = count

        //Add date and count to new array
        var newarr = new Array();
        var l = arrMatches.length - 1;
        for (i = 0; i < arrMatches.length; i++) {
            var cnt = arrMatches[i].substring(7); //count for highchart
            var count = arrMatches[parseInt(l) - parseInt(i)].substring(7); //count for checkboxlist
            var year = arrMatches[parseInt(l) - parseInt(i)].substring(1, 5); //year for checkboxlist
            var date = Date.UTC(arrMatches[i].substring(1, 5), 0, 1); //year for highchart
            newarr.push("[" + date + "," + cnt + "]");
            if (ulIsPopulated == false) {
                var checkboxId = "rptCD4Lightbox-label-" + parseInt(i + 1);
                var displayStyle = "list-item";
                $('div[data-facet-value="Year"]').find('.cd4schres-show-all').hide();
                if (i >= 15) {
                    displayStyle = "none";
                    $('div[data-facet-value="Year"]').find('.cd4schres-show-all').show();
                    $('div[data-facet-value="Year"]').find('.cd4schres-show-all').removeClass('active').html('<span>Show more</span> <span class="icon-icon_plus"></span>');
                }
                var liString = String.format(liFormat,
                    displayStyle, year, checkboxId, '', checkboxId, '', year, count);
                if (qsFacetValues.indexOf(year) >= 0) {
                    liString = String.format(liFormat,
                    displayStyle, year, checkboxId, 'disabled', checkboxId, 'class="disabledlabel"', year, count);
                }
                ulChkbox.append(liString);
            }
        }
        //Data which will be passed into highcharts
        var abstractsData = "[" + newarr.join(",") + "]";

        var enableNav = true;
        if (newarr.length < 3)
            enableNav = false;

        if ($(id).length > 0) {
            //Remove dynamically created elements
            $(id).prev('div#divTitle').remove();
            $('#divSelect').empty();

            //Append required text above and below chart and modify classes for adjusting chart on LHS.
            if (newarr.length > 0) {
                $(id).before($('<div></div>')
                    .attr("style", "padding:10px;background-color:#fff;font-weight:bold;")
                    .attr("id", "divTitle")
                    .html('Use the slider to define the range of years to view.'));

                $(id).after($('<div></div>')
                    .attr("style", "background-color:#fff;width:100%")
                    .attr("id", "divSelect"));

                $('#divSelect').append($('<div></div>')
                    .attr("style", "padding:10px;background-color:#fff;font-weight:bold;float:left;")
                    .html('Click \'select years\' to refine your search by that range.'));


                $('#divSelect').append($('<button></button>')
                    .attr("style", "margin-left: 200px; margin-bottom: 10px; font-size: 11px; padding-left: 10px; padding-right: 10px;")
                    .attr("class", "btn btn-default")
                    .attr("id", "btnSelectYears")
                    .html('Select years'));


                $('div[data-facet-value="Year"]').find('.refineby-content-inner').attr("style", "display:flex");
                $('div[data-facet-value="Year"]').find('.refineby-content-inner-chart').attr("style", "width: 320px;float: left;background-color:#fff;");
                $('div[data-facet-value="Year"]').find('.refineby-content-inner-facets').attr("style", "width: 387px;float: right;");
                $('div[data-facet-value="Year"]').find('ul.checkbox-listing li').css({ "width": "50%", "clear": "none" });
                $('div[data-facet-value="Year"]').find('ul.checkbox-listing li label').attr("style", "width: 125px;");
                $('div[data-facet-value="Year"]').find('h4').attr("style", "padding-right: 80px;");
            }

            //Show the top 15 facets values
            //var i = 0;
            //$('div[data-facet-value="Year"] :checkbox').each(function () {
            //    if (i < 15)
            //        $(this).parent().parent().parent().css({ display: 'list-item' });
            //    else
            //        $(this).parent().parent().parent().css({ display: 'none' });
            //    i++;
            //})
            //Show 'show more' button
            //if (i > 15) {
            //    $('div[data-facet-value="Year"]').find('.cd4schres-show-all').show();
            //    $('div[data-facet-value="Year"]').find('.cd4schres-show-all').removeClass('active').html('<span>Show more</span> <span class="icon-icon_plus"></span>');
            //}

            // create the chart
            $(id).highcharts('StockChart', {
                chart: {
                    alignTicks: false
                    //events: {
                    //    load: function () {
                    //        //$('g.highcharts-input-group').find('rect').attr("style", "stroke-width:0")
                    //        $('g.highcharts-input-group').empty();
                    //        $('g.highcharts-input-group')
                    //                .html('<text x="0" y="14" style="font-weight:bold;font-size:14px;font-family:\'Lucida Grande\',Arial, Helvetica, sans-serif;color:#666;fill:#666;">' + Highcharts.dateFormat('%Y', this.xAxis[0].getExtremes().min) + ' - ' + Highcharts.dateFormat('%Y', this.xAxis[0].getExtremes().max) + '</text>');
                    //    }
                    //}
                },
                title: {
                    text: ''
                },
                xAxis: {
                    tickPositioner: function () {
                        var positions = [],
                            firstYear = this.min,
                            lastYear = this.max;
                        //positions = [firstYear, (firstYear + (firstYear + lastYear) / 2) / 2, (firstYear + lastYear) / 2, (lastYear + (firstYear + lastYear) / 2) / 2, lastYear];
                        positions = [firstYear, (firstYear + lastYear) / 2, lastYear];
                        return positions;
                    },
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        year: '%Y'
                    },
                    labels: {
                        formatter: function () {
                            return Highcharts.dateFormat('%Y', this.value).toUpperCase();
                        },
                        style: {
                            font: 'normal 10px Arial'
                        }
                    },
                    title: {
                        text: 'Publication Year',
                    },
                    top: 120,
                },
                yAxis: {
                    title: {
                        text: 'No. of abstracts',
                    },
                    top: 120,
                },
                credits: {
                    enabled: false
                },
                navigator: {
                    height: 30,
                    top: 60,
                    enabled: enableNav,
                    xAxis: {
                        labels: {
                            formatter: function () {
                                return Highcharts.dateFormat('%Y', this.value).toUpperCase();
                            }
                        },
                        tickPositioner: function () {
                            var positions = [],
                                firstYear = this.min,
                                lastYear = this.max;
                            positions = [firstYear, lastYear];
                            return positions;
                        },
                    },
                },
                rangeSelector: {
                    enabled: true,
                    inputPosition: {
                        align: "left",
                        y: 10,
                        x: 0
                    },
                    inputDateFormat: '%Y',
                    inputEditDateFormat: '%Y',
                    inputBoxWidth: 40,
                    inputBoxHeight: 15,
                    buttons: [{
                        type: 'all',
                        text: 'All'
                    }]
                },
                tooltip: {
                    formatter: function () {
                        if (this.points[0].series.currentDataGrouping) {
                            //return 'data is grouped ' + ' ' + this.points[0].series.currentDataGrouping.totalRange;
                            var startyear = Highcharts.dateFormat('%Y', this.x);
                            var range = this.points[0].series.currentDataGrouping.count;
                            var endyear = parseInt(startyear) + parseInt(range) - 1;
                            var tt = "";
                            if (parseInt(startyear) == endyear)
                                tt = '<b>' + startyear + '</b>';
                            else
                                tt = '<b>' + startyear + ' - ' + endyear + '</b>';
                            $.each(this.points, function () {
                                tt += '<br/>Abstracts Volume = ' + this.y;
                            });
                            return tt;
                        } else {
                            var tt = '<b>' + Highcharts.dateFormat('%Y', this.x) + '</b>';
                            $.each(this.points, function (i, point) {
                                tt += '<br/>Abstracts Volume = ' + this.y;
                            });
                            return tt;
                        }
                    }
                },
                series: [{
                    type: 'column',
                    name: 'Abstracts Volume',
                    data: JSON.parse(abstractsData),
                }]
            });
        }
    });
}

function getJsonValueByKey(key, data) {
    return data.filter(
        function (data) { return data.key == key }
    );
}

function LoadTreeMap(facetField, fieldtoSearch) {
    var id = '#treemap_' + facetField.replace(' ', '_');
    var searchTerm = $('div#cd4schresEditQuery').find('textarea').val();
    //var searchUrl = '/search/facetsearch/?query=' + searchTerm + '&numfacets=100&facetName=' +;

    //Create search url
    var searchUrl = '/search/facetsearch/';

    var facetQuery = {
        "query": searchTerm,
        "numfacets": 100,
        "facetName": fieldtoSearch.toLowerCase()
    };

    //Populate facets in checkbox listing
    var ulChkbox = $('div[data-facet-value="' + facetField + '"]').find('ul.checkbox-listing');
    var ulIsPopulated = false;
    if (ulChkbox.children().length > 0)
        ulIsPopulated = true;

    //ulChkbox.empty();

    // Find the existing "facets"
    var requrl = window.location.href;
    var facetCount = 0;
    var objQueryParams = getQueryParams(requrl);
    facetCount = getParameterByName('facets');
    var qsFacetValues = new Array();
    if (facetCount > 0) {
        for (i = 1; i <= facetCount; i++) {
            var facet = getJsonValueByKey('facet' + i + 'f', objQueryParams);
            var ffname = '';
            if (Object.prototype.toString.call(facet) === '[object Array]' && facet.length > 0) {
                ffname = facet[0].value;
            }
            if (ffname === facetField) {
                for (j = 0; j < objQueryParams.length; j++) {
                    if (objQueryParams[j].key === 'facet' + i + 'v') {
                        qsFacetValues.push(objQueryParams[j].value);
                    }
                }
            }
        }
    }
    $.post(searchUrl,
        facetQuery)
    //.done(function (data) { });
    .done(function (data) {
        $('#facetApiData').text(JSON.stringify(data)); // Store the data
        $('#showFacetApiValsArgs').text(JSON.stringify([facetField, fieldtoSearch, ulIsPopulated, id, qsFacetValues]));
        var tstAry = JSON.parse($('#showFacetApiValsArgs').text());
        cd4schresShowFacetApiVals('freq');
    });

}

function cd4schresShowFacetApiVals(orderBy, explicitSort, orderByDropdown) {
    var data = JSON.parse($('#facetApiData').text());
    var facetField, fieldtoSearch, ulIsPopulated, id, qsFacetValues;
    var apiData =  JSON.parse($('#showFacetApiValsArgs').text());

    //
    facetField = apiData[0];
    fieldtoSearch = apiData[1];
    ulIsPopulated = apiData[2];
    id = apiData[3];
    qsFacetValues = apiData[4];
    
    //[facetField, fieldtoSearch, ulIsPopulated, id, qsFacetValues] =
    var ulChkbox = $("div[data-facet-value='" + facetField + "'] ul.checkbox-listing");
    if (explicitSort)
        ulChkbox.html(''); // Clear the <li> elements
    var sortedMatches = data.Matches; // sorted by descending frequency - this is how it arrives from the API
    if (orderBy == "alpha") { // if sort alphabetically
        var fkeys = [];

        var userProducts = null;
        
        for (fkey in data.Matches) {
            var sortKey = fkey;
            var sortValue = fkey;
            if (facetField == YOUR_PRODUCTS_FACET) {
                if (userProducts === null) {
                    userProducts = $.parseJSON($('#hdnUserSubscribedProducts').val());
                }

                var productName = userProducts[fkey];//check id product facet value exists in UserSubscribedProducts
                if (productName != undefined) {
                    sortValue = productName;//push the value in a new array
                }
            }
            var itemMap = {
                key : sortKey,
                value : sortValue
            };

            fkeys.push(itemMap);
        }
        fkeys.sort(function(a, b) {
            a = a.value.toLowerCase();
            b = b.value.toLowerCase();
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
        sortedMatches = {};
        $.each(fkeys, function (i, v) {
            sortedMatches[v.key] = data.Matches[v.key];
        });
    }

    var Matches = JSON.stringify(sortedMatches);
    Matches = Matches.replace(/[{}]/g, "");
    var newarr = new Array();// Array for treemap

    var arrMatches = new Array(); // Original array of Matches
    var arrMatchesNew = new Array(); // Processed array of Matches
    var liFormat;
    if (facetField == YOUR_PRODUCTS_FACET) {
        arrMatches = Matches.split(",");

        var userSubProducts = $.parseJSON($('#hdnUserSubscribedProducts').val());
        for (var i = 0; i < arrMatches.length; i++) {
            var fv = arrMatches[i].substring(1, arrMatches[i].lastIndexOf(":") - 1);

            var match = userSubProducts[fv];//check id product facet value exists in UserSubscribedProducts
            if (match != undefined) {
                arrMatchesNew.push(arrMatches[i]);//push the value in a new array
            }
        }
        liFormat = "<li style='display: {0};'><div class='custom-form-list'><div class='custom-control'><input type='checkbox' onchange='refinerDataSetValue(this)' data-facet-value='{1}' data-facet-text='{2}' class='custom-input checkbox' id='{3}' {4}><span></span></div><label for='{5}' {6}><span>{7}</span> ({8})</label></div></li>";
        //0 = displaystyle, 1 = code, 2 = name, 3 = checkboxId, 4 = checkbox disabled, 5 = checkboxId, 6 = disabled style, 7 = name, 8 = count
    }
    else {
        arrMatchesNew = Matches.split(",\"");//split in this way so that authors can also be splitted using ,"
        liFormat = "<li style='display: {0};'><div class='custom-form-list'><div class='custom-control'><input type='checkbox' onchange='refinerDataSetValue(this)' data-facet-value='{1}' class='custom-input checkbox' id='{2}' {3}><span></span></div><label for='{4}' {5}><span>{6}</span> ({7})</label></div></li>";
        //0 = displaystyle, 1 = name, 2 = checkboxId, 3 = checkbox disabled, 4 = checkboxId, 5 = disabled style, 6 = name, 7 = count
    }

    var len = 15;//Treemap length
    if (arrMatchesNew.length < 15)
        len = arrMatchesNew.length;

    for (i = 0; i < arrMatchesNew.length; i++) {
        var cnt = arrMatchesNew[i].substring(arrMatchesNew[i].lastIndexOf(":") + 1);
        var fv = arrMatchesNew[i].substring(0, arrMatchesNew[i].lastIndexOf(":") - 1);
        if (i == 0 || facetField == YOUR_PRODUCTS_FACET)
            fv = arrMatchesNew[i].substring(1, arrMatchesNew[i].lastIndexOf(":") - 1);

        //Populate checkboxlist only for the 1st time
        if (ulIsPopulated == false) {
            var checkboxId = "rptCD4Lightbox-label-" + fieldtoSearch + "-" + parseInt(i + 1);
            var displayStyle = "none";
            //$('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').show();

            if ($(id).length <= 0) {
                displayStyle = "list-item";
                $('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').hide();
                if (i > 14) {
                    displayStyle = "none";
                    $('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').show();
                    $('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').removeClass('active').html('<span>Show more</span> <span class="icon-icon_plus"></span>');
                }
            }
            else {
                $('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').show();
                $('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').removeClass('active').html('<span>Show list</span> <span class="icon-icon_plus"></span>');
                $(id).show();
            }
            var liString;
            if (facetField == YOUR_PRODUCTS_FACET) {
                var productName = '';
                //Get the product value by key from UserSubscribedProducts
                $.each(userSubProducts, function (k, v) {
                    if (k == fv) {
                        productName = v;
                        return false; // retrun false to stop the loops
                    }
                });

                liString = String.format(liFormat,
                    displayStyle, fv, productName, checkboxId, '', checkboxId, '', productName, cnt);
                if (qsFacetValues.indexOf(fv) >= 0) {
                    liString = String.format(liFormat,
                    displayStyle, fv, productName, checkboxId, 'disabled', checkboxId, 'class="disabledlabel"', productName, cnt);
                }
                //fv = productName;
            }
            else {
                liString = String.format(liFormat,
                displayStyle, fv, checkboxId, '', checkboxId, '', fv, cnt);

                if (qsFacetValues.indexOf(fv) >= 0) {
                    liString = String.format(liFormat,
                displayStyle, fv, checkboxId, 'disabled', checkboxId, 'class="disabledlabel"', fv, cnt);
                }

            }
            ulChkbox.append(liString);

            if ($(id).length > 0) {
                if (newarr.length < len) {
                    //var logCnt = Math.round(Math.log(cnt));
                    //if (logCnt == 0)
                    //    logCnt = 1;

                    var colorval = parseInt(len) - parseInt(i);
                    if (qsFacetValues.indexOf(fv) < 0) {
                        //var ser = getParameterByName('series');
                        //if (ser == 'log')
                        //    newarr.push("{\"name\":\"" + fv + "\",\"value\":" + logCnt + ",\"actualvalue\":" + cnt + ",\"colorValue\":" + colorval + "}");
                        //else
                        if (facetField == YOUR_PRODUCTS_FACET) fv = productName;
                        newarr.push("{\"name\":\"" + fv + "\",\"value\":" + cnt + ",\"actualvalue\":" + cnt + ",\"colorValue\":" + colorval + "}");
                        //newarr.push("{\"name\":\"" + fv + "\",\"value\":" + cnt + ",\"colorValue\":" + colorval + "}");
                    }
                }
            }
        }
    }

    //var chart = document.getElementById('treemap_' + facetField.replace(' ', '_'));
    //if (newarr.length > 0 && chart != undefined) {
    //    $('div[data-facet-value="' + facetField + '"]').find('ul.checkbox-listing li').each(function (e) {
    //        $(this).attr("style", "display:none");
    //    });
    //}


    var facetsData = "[" + newarr.join(',') + "]"
    //console.log(facetsData);
    //console.log(JSON.parse(facetsData))
    var json;
    try {
        json = JSON.parse(facetsData);
    } catch (exception) {
        json = null;
    }

    if (json && json.length == 0 && !ulIsPopulated && $(id).length > 0) {
        $('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').trigger("click");
        $('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').hide();
    }

    if (json && json.length > 0) {
        $(function () {
            (function (H) {
                H.wrap(H.Point.prototype, 'firePointEvent', function (proceed, eventType, eventArgs, defaultFunction) {
                    var point = this,
                        series = this.series,
                        seriesOptions = series.options;
                    if (seriesOptions.point.events[eventType] || (point.options && point.options.events && point.options.events[eventType])) {
                        this.importEvents();
                    }
                    if (eventType === 'click' && seriesOptions.allowPointSelect) {
                        defaultFunction = function (event) {
                            if (point.select) {
                                point.select(null, true);
                                if (point.selected) {
                                    $(point.graphic.element).attr({
                                        fill: '#368729'
                                    });
                                    point.dataLabel.css({
                                        color: '#ffffff'
                                    });
                                } else {
                                    point.dataLabel.css({
                                        color: '#000000'
                                    });
                                }
                                //point.selected ? point.dataLabel.css({
                                //    color: 'white'
                                //}) : point.dataLabel.css({
                                //    color: 'black'
                                //})
                            }
                        };
                    }
                    H.fireEvent(this, eventType, eventArgs, defaultFunction);
                });
            }(Highcharts));

            var treemapWidth = $(id).width();

            $(id).highcharts({
                chart: {
                    height: 350,
                    width: treemapWidth,
                    events: {
                        load: function () {
                            var chart = this;
                            $.each(this.series, function (i, s) {
                                $.each(s.data, function (j, p) {
                                    if (p.pointAttr) {
                                        p.pointAttr.select = {
                                            fill: "#368729",
                                        }
                                    }
                                });
                            });

                            //Highlight already selected facet values on the treemap
                            if (refinerData[facetField] != undefined) {
                                if (refinerData[facetField]["values"] != undefined && !jQuery.isEmptyObject(refinerData[facetField]["values"])) {
                                    for (facetvalue in refinerData[facetField]["values"]) {
                                        var i = -1;
                                        facetvalue = JSON.parse(facetvalue);
                                        if (facetvalue["name"] != undefined)
                                            facetvalue = facetvalue["name"];
                                        else
                                            facetvalue = facetvalue["searchfield"];
                                        $.each($.parseJSON(facetsData), function (index, info) {
                                            if (info.name == facetvalue) {
                                                i = index;
                                                return false; // retrun false to stop the loops
                                            }
                                        });
                                        if (i > -1) {
                                            chart.series[0].data[i].select(true, true);
                                            chart.series[0].data[i].selected ? chart.series[0].data[i].dataLabel.css({
                                                color: '#ffffff'
                                            }) : chart.series[0].data[i].dataLabel.css({
                                                color: '#000000'
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                colorAxis: {
                    minColor: '#FFFFFF',//DCEBFA
                    maxColor: Highcharts.getOptions().colors[0]
                },
                series: [{
                    type: 'treemap',
                    layoutAlgorithm: 'squarified',
                    //data: [{name:'English',value:500018,colorValue:1},{name:'not specified',value:91645,colorValue:2},{name:'Chinese',value:29758,colorValue:3},{name:'French',value:20487,colorValue:4},{name:'German',value:19051,colorValue:5},{name:'Russian',value:10924,colorValue:6},{name:'Spanish',value:9573,colorValue:7},{name:'Italian',value:6897,colorValue:8},{name:'Portuguese',value:5704,colorValue:9},{name:'Japanese',value:4247,colorValue:10},{name:'Polish',value:3826,colorValue:11},{name:'Dutch',value:2857,colorValue:12},{name:'Bulgarian',value:1725,colorValue:13},{name:'Czech',value:1538,colorValue:14},{name:'Hungarian',value:1498,colorValue:15}]
                    //data: [{ name: 'USA', value: 66148, colorValue: 1 }, { name: 'China', value: 30236, colorValue: 2 }, { name: 'India', value: 20971, colorValue: 3 }, { name: 'UK', value: 19015, colorValue: 4 }, { name: 'Brazil', value: 13774, colorValue: 5 }, { name: 'Italy', value: 13366, colorValue: 6 }, { name: 'Australia', value: 12871, colorValue: 7 }, { name: 'Europe', value: 12817, colorValue: 8 }, { name: 'Japan', value: 12568, colorValue: 9 }, { name: 'Germany', value: 12511, colorValue: 10 }, { name: 'France', value: 12372, colorValue: 11 }, { name: 'Canada', value: 10649, colorValue: 12 }, { name: 'South Africa', value: 9759, colorValue: 13 }, { name: 'California', value: 8389, colorValue: 14 }, { name: 'Spain', value: 8275, colorValue: 15 }]
                    data: JSON.parse(facetsData)
                }],
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.point.actualvalue;
                    },
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    treemap: {
                        allowPointSelect: true,
                        animation: false,
                        dataLabels: {
                            style: {
                                //backgroundColor: 'white',
                                //  color: 'black'
                                textShadow: false
                            }
                        }
                    },
                    series: {
                        cursor: 'pointer',
                        dataLabels: {
                            style: {
                                enabled: true,
                                fontSize: '13px',
                                fontWeight: 'normal',
                            }
                        },
                        point: {
                            events: {
                                click: function (event) {
                                    var name = this.name;
                                    var code = undefined;
                                    if (facetField == YOUR_PRODUCTS_FACET) {
                                        $.each(userSubProducts, function (k, v) {
                                            if (v == name) {
                                                code = k;
                                                return false; // return false to stop the loops
                                            }
                                        });
                                        refinerDataSetValueFromTreemap(name, code, facetField);
                                    }
                                    else
                                        refinerDataSetValueFromTreemap(undefined, name, facetField);

                                    $('div[data-facet-value="' + facetField + '"] :checkbox').each(function () {
                                        if (name == $(this).attr('data-facet-value') || (facetField == YOUR_PRODUCTS_FACET && code == $(this).attr('data-facet-value'))) {
                                            if ($(this).is(":checked")) {
                                                this.checked = false;
                                            } else {
                                                this.checked = true;
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    //else {
    //    $('div[data-facet-value="' + facetField + '"]').find('.cd4schres-show-all').trigger("click");
    //}

    if (explicitSort)
        showAllFacets(orderByDropdown);
} // end function cd4schresShowFacetApiVals(orderBy, explicitSort)


// Refiner: Lightbox control code
$(document).ready(function () {
    // "n item(s) selected" handling, and show/hide Clear link and Refine button
    // NB. this applies globally, to all facet fields.

    $('.checkbox-listing li').each(function () {
        $(this).find('.checkbox').prop('checked', false);
    });
    $('.buttons-bar .clear-all, .buttons-bar .btn-default').css("visibility", "hidden");

    //$('.checkbox-listing li .custom-control').click(function () {
    //    var count = 0;

    //    $('.checkbox-listing li').each(function () {
    //        if ($(this).find('.checkbox').prop("checked")) {
    //            count = count + 1;
    //        } else {
    //            count = count;
    //        } // this is rather slow - might speed it up somehow. Plain JS probably quicker.

    //        if (count <= 0) {
    //            $('.buttons-bar .clear-all, .buttons-bar .btn-default').hide()
    //            $('.item-count').children('strong').html(count)

    //        } else {
    //            $('.buttons-bar .clear-all, .buttons-bar .btn-default').show()
    //            $('.item-count').show().children('strong').html(count)
    //        }
    //    })
    //})

    // Show the first 15 items - now done server-side
    //$('.checkbox-listing li:lt(15)').show();

    // "Show All" link handler 
    $('.cd4schres-show-all').click(function (e) {
        showMoreHandler(this);
    }); // end of $('.cd4schres-show-all').click(function (e) 
});

function showMoreHandler(showMoreLink) {
    // Get list of <li> elements for this lightbox only
    //var listElements = e.target.parentElement.parentElement.parentElement.getElementsByClassName("checkbox-listing")[0].getElementsByTagName("li");
    var listElements = $(showMoreLink).closest('.refineby-content').find("ul.checkbox-listing li");
    var treemapId = $('#treemap_' + $(showMoreLink).closest('.refineby-content').attr("data-facet-value").replace(' ', '_'));
    var treemap = treemapId.highcharts();
    var start = 15;
    var showmoretext = 'Show more';
    var showlesstext = 'Show less';
    if (treemap != undefined) {
        start = 0;
        showmoretext = 'Show list';
        showlesstext = 'Show tree map';
    }
    if ($(showMoreLink).hasClass('active')) {
        for (i = start; i < listElements.length; i++)
            listElements[i].style.display = "none";
        //$(showMoreLink).removeClass('active').html('<span>' + showmoretext + '</span> <span class="icon-icon_plus"></span>');
        $(showMoreLink).closest('.refineby-content').find("a.cd4schres-show-all ").removeClass('active').html('<span>' + showmoretext + '</span> <span class="icon-icon_plus"></span>');
        if (treemap != undefined)
            treemapId.show();
        $('html,body').animate({ scrollTop: $(showMoreLink).closest('.refineby-content').offset().top });
    }
    else {
        for (i = 0; i < listElements.length; i++)
            listElements[i].style.display = "list-item";
        //$(showMoreLink).addClass('active').html('<span>' + showlesstext + '</span> <span class="icon-icon_minus"></span>');
        $(showMoreLink).closest('.refineby-content').find("a.cd4schres-show-all ").addClass('active').html('<span>' + showlesstext + '</span> <span class="icon-icon_minus"></span>');
        if (treemap != undefined)
            treemapId.hide();
    }
}

// Show all facets in lightbox, and hide the more / less / tree view links
function showAllFacets(orderByDropdown) {
    // Hide treemap if shown
    var treemapId = $('#treemap_' + $(orderByDropdown).closest('.refineby-content').attr("data-facet-value").replace(' ', '_'));
    var treemap = treemapId.highcharts();
    if (treemap != undefined)
        treemapId.hide();

    // Get all list elements, including hidden ones, and show them all
    var listElements = $(orderByDropdown).closest('.refineby-content').find("ul.checkbox-listing li");
    for (i = 0; i < listElements.length; i++)
        listElements[i].style.display = "list-item";

    // Hide the 'show more' links
    $(orderByDropdown).closest('.refineby-content').find(".cd4schres-show-all").hide();
}


var YOUR_PRODUCTS_FACET = "Your Products";

// Refiner: User-selection processing code
var refinerData = {};
var refinerTypesData = {};
// Want data in this format:
// {Descriptors:{operator:not,values:{dog:1,cat:1,ox:1}},Item type:{operator:or,values:{book:1,magazine:1,periodical:1}}}

// Fired by AND/OR/NOT radio buttons in Search Refiner lightbox
function refinerDataSetOperator(radioButton) {
    //console.log(radioButton.value);
    //var field = radioButton.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-facet-value")
    var field = $(radioButton).closest('.refineby-content').attr("data-facet-value");// working in ie
    var heading = $(radioButton).closest('.refineby-content').attr("data-facet-field");
    //console.log("field: " + field);
    if (typeof (refinerData[field]) === 'undefined') {
        refinerData[field] = {};

    }

    refinerData[field]["operator"] = radioButton.value;
    refinerData[field]["heading"] = heading;
    //console.log(refinerData);
    getRefinerDataElements();
}

function refinerDataSetTypeValue(fieldValueCheckBox) {
    var text = $(fieldValueCheckBox).attr("data-type-text");
    var typeId = $(fieldValueCheckBox).attr("data-type-value");

    if (refinerTypesData[text] !== undefined) {
        delete refinerTypesData[text];
    }

    if (fieldValueCheckBox.checked) {
        refinerTypesData[text] = typeId;
    }

    getRefinerDataElements();
}

function refinerDataRemoveType(fieldValue) {
    var text = $(fieldValue).attr("data-type-text");

    if (refinerTypesData[text] !== undefined) {
        delete refinerTypesData[text];
    }

    $('div[data-facet-value="' + text + '"] :checkbox').each(function () { //loop through all checkboxes and uncheck which is removed from the selected elements list
        if ($(this).is(":checked")) {
            if (text == $(this).attr('data-type-text'))
                $(this).attr('checked', false);
        }
    });

    getRefinerDataElements();

}

// Fired by checkbox tick/untick in Search Refiner lightbox
function refinerDataSetValue(fieldValueCheckbox) {
    //var text = fieldValueCheckbox.getAttribute("data-facet-text");//used only if facetfield = Your Products
    //var value = fieldValueCheckbox.getAttribute("data-facet-value");
    //var field = fieldValueCheckbox.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-facet-value");

    var text = $(fieldValueCheckbox).attr("data-facet-text");//used only if facetfield = Your Products
    var value = $(fieldValueCheckbox).attr("data-facet-value");
    var field = $(fieldValueCheckbox).closest('.refineby-content').attr("data-facet-value");
    var heading = $(fieldValueCheckbox).closest('.refineby-content').attr("data-facet-field");


    if (refinerData[field] == undefined) {
        refinerData[field] = {};
        refinerData[field]["operator"] = "or"; // default to OR
        refinerData[field]["heading"] = heading;
    }
    if (refinerData[field]["values"] == undefined) {
        refinerData[field]["values"] = {};
    }

    var newvalue;
    if (text != undefined)//used only if facetfield = Your Products
        newvalue = {
            "name": text,
            "searchfield": value
        };
    else
        newvalue = {
            "searchfield": value
        };
    newvalue = JSON.stringify(newvalue);

    var blnAddtoTreeMap = true;
    if (fieldValueCheckbox.checked) {
        refinerData[field]["values"][newvalue] = 1;
        blnAddtoTreeMap = true;
    }
    else {
        delete refinerData[field]["values"][newvalue]; // "delete" removes an object property
        blnAddtoTreeMap = false;
    }

    if (field == YOUR_PRODUCTS_FACET)
        UpdateTreemap(field, text, blnAddtoTreeMap);
    else
        UpdateTreemap(field, value, blnAddtoTreeMap);

    getRefinerDataElements();
}

// Fired by anchor tag click from selected elements list
function refinerDataRemoveValue(fieldValue) {
    var value = fieldValue.getAttribute("data-facet-value");
    var text = fieldValue.getAttribute("data-facet-text");//used only if facetfield = Your Products
    var field = fieldValue.getAttribute("data-facet-field");

    var newValue = {
        "searchfield": value
    };
    if (text != undefined)
        newValue = {
            "name": text,
            "searchfield": value
        };

    newValue = JSON.stringify(newValue);

    delete refinerData[field]["values"][newValue]; // "delete" removes an object property

    //get the outer div by data-facet-field
    $('div[data-facet-value="' + field + '"] :checkbox').each(function () { //loop through all checkboxes and uncheck which is removed from the selected elements list
        if ($(this).is(":checked")) {
            if (value == $(this).attr('data-facet-value'))
                $(this).attr('checked', false);
        }
    });
    getRefinerDataElements();

    if (field == YOUR_PRODUCTS_FACET)
        UpdateTreemap(field, text, false);
    else
        UpdateTreemap(field, value, false);
}


// Fired by Treemap square in Search Refiner lightbox
function refinerDataSetValueFromTreemap(text, value, field) {
    if (refinerData[field] == undefined) {
        refinerData[field] = {};
        refinerData[field]["operator"] = "or"; // default to OR
        refinerData[field]["heading"] = field;
    }
    if (refinerData[field]["values"] == undefined) {
        refinerData[field]["values"] = {};
    }
    var exists = false;

    if (text != undefined)//Used only when field = Your Products
        value = {
            "name": text,
            "searchfield": value
        };
    else
        value = {
            "searchfield": value
        };
    value = JSON.stringify(value);

    if (refinerData[field]["values"] != undefined && !jQuery.isEmptyObject(refinerData[field]["values"])) {
        for (facetvalue in refinerData[field]["values"]) {
            if (facetvalue == value)
                exists = true;
        }
    }

    if (exists == false)
        refinerData[field]["values"][value] = 1;
    else
        delete refinerData[field]["values"][value]; // "delete" removes an object property

    getRefinerDataElements();
}


function UpdateTreemap(facetfield, facetvalue, addtoTreemap) {
    var treemapId = '#treemap_' + facetfield.replace(' ', '_');
    var treemap = $(treemapId).highcharts();

    if (treemap != undefined) {
        var i = -1;
        $.each(treemap.series[0].data, function (index, info) {
            if (info.name == facetvalue) {
                i = index;
                return false; // retrun false to stop the loops
            }
        });

        if (i > -1) {
            treemap.series[0].data[i].select(addtoTreemap, true);
            treemap.series[0].data[i].selected ? treemap.series[0].data[i].dataLabel.css({
                color: 'white'
            }) : treemap.series[0].data[i].dataLabel.css({
                color: 'black'
            })
        }
    }
}

//Get a list of selected facets and display in the popup
function getRefinerDataElements() {
    //clear all anchor tags 
    $('.refine-item-list').text('');
    var count = 0;

    //loop through each facet and display in popup
    for (facetName in refinerData) { // facetName is string
        if (refinerData[facetName]["values"] != undefined) {
            var op = refinerData[facetName]["operator"];

            var $facetDiv = null;

            var facetValuesCount = 0;
            for (value in refinerData[facetName]["values"]) {
                facetValuesCount++;
                count++;

                if (facetValuesCount == 1) {
                    $facetDiv = $('<div class=\"facet-selections\"></div>');
                    //$facetDiv.append("<span classs=\"strong\">" + facetName + ": </span>");
                    $facetDiv.append("<span classs=\"strong\">" + refinerData[facetName]["heading"] + ": </span>");
                }

                //$('<span class="push-right-4">' + value + '</span>').appendTo('.refine-item-list');                
                value = JSON.parse(value);

                if (value["name"] != undefined) {
                    $facetDiv.append($('<a></a>')
                        .attr("onclick", "refinerDataRemoveValue(this)")
                        .attr("data-facet-value", value["searchfield"])
                        .attr("data-facet-text", value["name"])
                        .attr("data-facet-field", facetName)
                        .html('<span class="push-right-4 header">' + ((facetValuesCount > 1 || (op === "not")) ? op.toUpperCase() + " " : "") + value["name"] + '</span><img src="/gfx/cabicd4/cross.png" class="push-half-right header" alt="">'));
                }
                else {
                    $facetDiv.append($('<a></a>')
                        .attr("onclick", "refinerDataRemoveValue(this)")
                        .attr("data-facet-value", value["searchfield"])
                        .attr("data-facet-field", facetName)
                        .html('<span class="push-right-4 header">' + ((facetValuesCount > 1 || (op === "not")) ? op.toUpperCase() + " " : "") + value["searchfield"] + '</span><img src="/gfx/cabicd4/cross.png" class="push-half-right header" alt="">'));
                }
            }

            if ($facetDiv !== null) {
                $('.refine-item-list').append($facetDiv);
            }

        }
    }

    for (type in refinerTypesData) {
        //Have refined by so add to the count.
        count++;

        var $typeDiv = $('<div class=\"facet-selections\"></div>');

        $typeDiv.append($('<a></a>')
                        .attr("onclick", "refinerDataRemoveType(this)")
                        .attr("data-type-text", type)
                        .html('<span class="push-right-4 header"> Type: ' + type + '</span><img src="/gfx/cabicd4/cross.png" class="push-half-right header" alt="">'));

        $('.refine-item-list').append($typeDiv);
    }


    if (count <= 0) {
        $('.buttons-bar .clear-all, .buttons-bar .btn-default').css("visibility", "hidden");
        //$('div.buttons-bar').hide();
        //$('.item-count').children('strong').html(count)
        //$('.item-count').hide()

    } else {
        $('.buttons-bar .clear-all, .buttons-bar .btn-default').css("visibility", "visible");
        //$('div.buttons-bar').hide()
        //$('.item-count').show().children('strong').html(count)
        //$('.item-count').hide()
    }
}

// "Clear All" link handler - is still in script.js
//$('.clear-all').click(function (event) { ...

// Refine results based on user's selections. Redirect browser.
function refinerRedirectUser() {
    console.log(refinerData);
    var requrl = window.location.href;

    //remove types from the request.
    var reType = /&types=([0-9,]*)/i;
    var types = [];
    var typeMatches = requrl.match(reType);
    if (typeMatches) {
        types = typeMatches[1].toString().split(",");
        requrl = requrl.replace(reType, "");
    }

    //add type values added this time.
    for (type in refinerTypesData) {
        if (refinerTypesData[type] !== undefined) {
            var typeId = parseInt(refinerTypesData[type]);
            if (!isNaN(typeId)) {
                types.push(typeId.toString());
            }
        }
    }

    var pageRegex = /&page=\d+/i;
    if (requrl.match(pageRegex))
        requrl = requrl.replace(pageRegex, "&page=1");
    // Find the "facets" param so that you know how to start your count
    var reReq = /^(.*)&facets=(\d+)(.*)$/i;
    var pre = "", post = "", facetCount = 0;
    var bits = requrl.match(reReq);
    if (bits != null) {
        pre = bits[1];
        facetCount = parseInt(bits[2]);
        if (isNaN(facetCount))
            facetCount = 0;
        //console.log("facet count: " + facetCount);
        post = bits[3];
    }
    else // if no "facets=" param, just take the lot and append the new "facet" params afterwards.
        pre = requrl;

    // Iterate the refinerData object and add key/op/value triples, incrementing the count
    var facetQsExtra = "";
    for (facetName in refinerData) { // facetName is string
        if (refinerData[facetName]["values"] != undefined && !jQuery.isEmptyObject(refinerData[facetName]["values"])) {
            var op = refinerData[facetName]["operator"];
            facetCount++;
            var facetNum = "&facet" + facetCount;
            facetQsExtra += facetNum + "f=" + encodeURI(facetName) + facetNum + "o=" + op
            for (value in refinerData[facetName]["values"]) {
                value = JSON.parse(value);
                facetQsExtra += facetNum + "v=" + encodeURI(value["searchfield"]);
            }
        }
    }

    facetQsExtra += "&facets=" + facetCount;

    if (types && types.length > 0) {
        facetQsExtra += "&types=" + types.join();
    }

    var newurl = pre + post + facetQsExtra;
    //console.log("Redirecting to: " + newurl);
    window.location = newurl;
}

// Refine results based on user's selections. Redirect browser.
function abstractRefinerRedirectUser(searchResultsPageUrl) {
    //console.log(refinerData);
    //console.log(searchResultsPageUrl);
    //var requrl = window.location.href;

    //if (requrl.indexOf('/abstract') > 0)
    //    requrl = requrl.substring(0, requrl.indexOf('/abstract'));
    //requrl += "/searchresults/";
    // Iterate the refinerData object and add key/op/value triples, incrementing the count
    var facetQsExtra = "?q=";
    for (facetName in refinerData) { // facetName is string
        if (refinerData[facetName]["values"] != undefined && !jQuery.isEmptyObject(refinerData[facetName]["values"])) {
            var op = refinerData[facetName]["operator"];
            facetQsExtra += facetName + ":("
            for (value in refinerData[facetName]["values"]) {
                value = JSON.parse(value);
                facetQsExtra += '"' + encodeURI(value["searchfield"]) + '" ' + op + ' ';
            }
            if (facetQsExtra.indexOf(op) > 0)
                facetQsExtra = facetQsExtra.substring(0, facetQsExtra.length - (op.length + 1)).trim();//remove the extra selected operator
            facetQsExtra += ") and "
        }
    }
    if (facetQsExtra.indexOf(') and ') > 0)
        facetQsExtra = facetQsExtra.substring(0, facetQsExtra.length - 5);//remove extra and operator
    var newurl = searchResultsPageUrl + encodeURI(facetQsExtra);
    //console.log("Redirecting to: " + newurl);
    window.location = newurl;
}

//Graphical display of results by year on search results page
$(function () {
    //Get the search term
    if ($("#cd4NumberOfSearchResults") && $("#cd4NumberOfSearchResults").text() > 0) {
        var searchTerm = $('div#cd4schresEditQuery').find('textarea').val();

        //Create search url
        var searchUrl = '/search/facetsearch/';

        var facetQuery = {
            "query": searchTerm,
            "numfacets": 100,
            "facetName": "year"
        };

        //console.log(searchUrl);

        /*Highchart start*/
        //if (typeof highcharts !== 'undefined') {
        if (!cd4.disableSearchByYearChart) {
            $.post(
                searchUrl,
                facetQuery
            ).done(function (data) {
                //Get data
                var Matches = JSON.stringify(data.Matches);
                Matches = Matches.replace(/[{}]/g, "");

                //split data
                var arrMatches = new Array();
                arrMatches = Matches.split(",");

                //Add year and count to new array
                var newarr = new Array();
                for (i = 0; i < arrMatches.length; i++) {
                    var cnt = arrMatches[i].substring(7);
                    var date = Date.UTC(arrMatches[i].substring(1, 5), 0, 1);
                    newarr.push("[" + date + "," + cnt + "]");
                }

                //Data which will be passed into Highcharts
                var abstractsData = "[" + newarr.join(",") + "]";

                var enableNav = true;
                if (newarr.length < 3)
                    enableNav = false;

                //Append required text and button above and below chart
                if (newarr.length > 0) {
                    $('.highChartMain').css({
                        display: 'block'
                    });
                    $('#divResultsByYear').before($('<div></div>')
                        .attr("style", "padding-left:5px;")
                        .attr("id", "divTitle")
                        .html('Use the slider to define a range of years.'));
                    $('#divResultsByYear').after($('<button></button>')
                        .attr("style", "margin-left: 115px; font-size: 11px; padding-left: 10px; padding-right: 10px;")
                        .attr("class", "updResults btn btn-default")
                        .attr("id", "btnUpdateResultsByYear")
                        .html('Update results'));
                }

                //create chart
                $('#divResultsByYear').highcharts('StockChart', {
                    chart: {
                        alignTicks: false
                        //events: {
                        //    load: function () {
                        //        //$('g.highcharts-input-group').find('rect').attr("style", "stroke-width:0")
                        //        $('g.highcharts-input-group').empty();
                        //        $('g.highcharts-input-group')
                        //                .html('<text x="0" y="14" style="font-weight:bold;font-size:14px;font-family:\'Lucida Grande\',Arial, Helvetica, sans-serif;color:#666;fill:#666;">' +Highcharts.dateFormat('%Y', this.xAxis[0].getExtremes().min) + ' - ' + Highcharts.dateFormat('%Y', this.xAxis[0].getExtremes().max) + '</text>');
                        //    }
                        //}
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        tickPositioner: function () {
                            var positions = [],
                                firstYear = this.min,
                                lastYear = this.max;
                            positions = [firstYear, (firstYear + lastYear) / 2, lastYear];
                            return positions;
                        },
                        type: 'datetime',
                        labels: {
                            formatter: function () {
                                return Highcharts.dateFormat('%Y', this.value).toUpperCase();
                            },
                            style: {
                                font: 'normal 10px Arial'
                            }
                        },
                        title: {
                            text: 'Publication Year',
                        },
                        top: 120,
                    },
                    yAxis: {
                        title: {
                            text: 'No. of abstracts',
                        },
                        top: 120,
                    },
                    credits: {
                        enabled: false
                    },
                    navigator: {
                        height: 30,
                        top: 60,
                        enabled: enableNav,
                        xAxis: {
                            labels: {
                                formatter: function () {
                                    return Highcharts.dateFormat('%Y', this.value).toUpperCase();
                                }
                            },
                            tickPositioner: function () {
                                var positions = [],
                                    firstYear = this.min,
                                    lastYear = this.max;
                                positions = [firstYear, lastYear];
                                return positions;
                            },
                        },
                    },
                    rangeSelector: {
                        enabled: true,
                        inputPosition: {
                            align: "left",
                            y: 0,
                            x: 0
                        },
                        //inputStyle:{
                        //    backgroundColor: 'rgba(0,0,0,0)',
                        //    border: 'none'
                        //},
                        inputDateFormat: '%Y',
                        inputEditDateFormat: '%Y',
                        inputBoxWidth: 40,
                        inputBoxHeight: 15,
                        buttons: [{
                            type: 'all',
                            text: 'All'
                        }]
                    },
                    tooltip: {
                        formatter: function () {
                            if (this.points[0].series.currentDataGrouping) {
                                var startyear = Highcharts.dateFormat('%Y', this.x);
                                var range = this.points[0].series.currentDataGrouping.count;
                                var endyear = parseInt(startyear) + parseInt(range) - 1;
                                var tt = "";
                                if (parseInt(startyear) == endyear)
                                    tt = '<b>' + startyear + '</b>';
                                else
                                    tt = '<b>' + startyear + ' - ' + endyear + '</b>';
                                $.each(this.points, function () {
                                    tt += '<br/>Abstracts Volume = ' + this.y;
                                });
                                return tt;
                            } else {
                                var tt = '<b>' + Highcharts.dateFormat('%Y', this.x) + '</b>';
                                $.each(this.points, function (i, point) {
                                    tt += '<br/>Abstracts Volume = ' + this.y;
                                });
                                return tt;
                            }
                        }
                    },
                    plotOptions: {
                        series: {
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function (event) {
                                        //Get  start and end year
                                        var startYear = Highcharts.dateFormat('%Y', this.x);
                                        var endYear = 0;
                                        var range = 0;
                                        if (this.series.currentDataGrouping) {
                                            range = this.series.currentDataGrouping.count;
                                            endYear = parseInt(startYear) + parseInt(range) - 1;
                                        }
                                        else
                                            endYear = startYear;

                                        //Get the page url
                                        var requrl = window.location.href;

                                        //Update query strings
                                        var pageRegex = /&page=\d+/i;
                                        if (requrl.match(pageRegex))
                                            requrl = requrl.replace(pageRegex, "&page=1");

                                        var pubStartRegex = /&publishedstart=\d+/i;
                                        if (requrl.match(pubStartRegex))
                                            requrl = requrl.replace(pubStartRegex, "&publishedstart=" + startYear);

                                        var pubEndRegex = /&publishedend=\d+/i;
                                        if (requrl.match(pageRegex))
                                            requrl = requrl.replace(pubEndRegex, "&publishedend=" + endYear);

                                        var query = getParameterByName('q');
                                        //remove [yr] from var query
                                        if (query.indexOf('yr:') > -1) {
                                            var yearRegex = /yr:\[\d{4}\s[tT][oO]\s\d{4}]/i;
                                            query = query.replace(yearRegex, "");

                                            yearRegex = /yr:\[\d{4}]/i;
                                            query = query.replace(yearRegex, "");

                                            query = $.trim(query);
                                        }

                                        //Append [yr] to var query
                                        var regYear = /^\d{4}$/i;
                                        var startDate_Isvalid = false;
                                        if (startYear.match(regYear)) {
                                            var lastWord = '';
                                            if (query.match(/\w+$/) != null)
                                                lastWord = query.match(/\w+$/)[0];
                                            if (lastWord.toString() == '')
                                                query += '';
                                            else if (lastWord.toString().toLowerCase() == 'and')
                                                query += ' ';
                                            else
                                                query += ' AND ';
                                            query += 'yr:[' + startYear;
                                            startDate_Isvalid = true;
                                        }

                                        if (startDate_Isvalid) {
                                            if (String(endYear).match(regYear)) {
                                                if (endYear == startYear)
                                                    query += ']';
                                                else
                                                    query += ' TO ' + endYear + ']';
                                            }
                                            else {
                                                var today = new Date();
                                                endYear = today.getFullYear();
                                                query += ' TO ' + endYear + ']';
                                            }
                                        }
                                        //Remove the original q parameter and append the new q parameter to url
                                        requrl = removeURLParameter(requrl, 'q');
                                        requrl = requrl.replace(/\?$/, '');
                                        if (requrl.indexOf('?') >= 0)
                                            requrl = requrl + '&q=' + query;
                                        else
                                            requrl = requrl + '?q=' + query;

                                        window.location = requrl;

                                        //var requrl = window.location.href;
                                        //var pageRegex = /&page=\d+/i;
                                        //if (requrl.match(pageRegex))
                                        //    requrl = requrl.replace(pageRegex, "&page=1");

                                        ////Code to remove year facets if there is any in url
                                        //var facetYearRegex = /^(.*)&facet(\d+)f=Year(.*)$/i;
                                        //var facetYearIndex = 0;
                                        //if (requrl.match(facetYearRegex)) {
                                        //    var fcount = getParameterByName('facets');

                                        //    for (i = 1; i <= parseInt(fcount) ; i++) {
                                        //        if (requrl.indexOf('facet' + i + 'f=Year') > -1)
                                        //            facetYearIndex = i;

                                        //    }
                                        //    if (facetYearIndex > 0) {
                                        //        requrl = removeURLParameter(requrl, 'facet' + facetYearIndex + 'v')
                                        //        requrl = removeURLParameter(requrl, 'facet' + facetYearIndex + 'f')
                                        //        requrl = removeURLParameter(requrl, 'facet' + facetYearIndex + 'o')
                                        //        if (fcount == 1)
                                        //            requrl = removeURLParameter(requrl, 'facets')
                                        //        else {
                                        //            var newfcount = parseInt(fcount) - 1;
                                        //            requrl = requrl.replace(/&facets=\d+/i, "&facets=" + newfcount);
                                        //        }
                                        //    }
                                        //}

                                        //// Find the "facets" param so that you know how to start your count
                                        //var reReq = /^(.*)&facets=(\d+)(.*)$/i;
                                        //var pre = "", post = "", facetCount = 0;
                                        //var bits = requrl.match(reReq);
                                        //if (bits != null) {
                                        //    pre = bits[1];
                                        //    facetCount = parseInt(bits[2]);
                                        //    if (isNaN(facetCount))
                                        //        facetCount = 0;
                                        //    //console.log("facet count: " + facetCount);
                                        //    post = bits[3];
                                        //}
                                        //else // if no "facets=" param, just take the lot and append the new "facet" params afterwards.
                                        //    pre = requrl;

                                        //facetCount++;
                                        //var facetNum = "&facet" + facetCount;
                                        //var facetQsExtra = facetNum + "f=Year" + facetNum + "o=or" + facetNum + "v=" + startyear;

                                        //if (parseInt(range) > 0) {
                                        //    for (i = parseInt(startyear) + 1; i <= endyear; i++) {
                                        //        facetQsExtra += facetNum + "v=" + i;
                                        //    }
                                        //}

                                        //facetQsExtra += "&facets=" + facetCount;
                                        //var newurl = pre + post + facetQsExtra;
                                        //alert("Redirecting to: " + newurl);
                                        // window.location = newurl;
                                    }
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'column',
                        name: 'Abstracts Volume',
                        data: JSON.parse(abstractsData),
                    }]
                });
            });
        }
        /*Highchart end*/
    }
});

//Update results by year from search results
$('body').on('click', '#btnUpdateResultsByYear', function (e) {
    e.preventDefault();
    var chart = $('#divResultsByYear').highcharts();

    //Get start and end year
    var ext = chart.xAxis[0].getExtremes();
    var startYear = Highcharts.dateFormat('%Y', ext.min);
    var endYear = Highcharts.dateFormat('%Y', ext.max);

    //Get the page url
    var requrl = window.location.href;

    //Update query strings
    var pageRegex = /&page=\d+/i;
    if (requrl.match(pageRegex))
        requrl = requrl.replace(pageRegex, "&page=1");

    var pubStartRegex = /&publishedstart=\d+/i;
    if (requrl.match(pubStartRegex))
        requrl = requrl.replace(pubStartRegex, "&publishedstart=" + startYear);

    var pubEndRegex = /&publishedend=\d+/i;
    if (requrl.match(pageRegex))
        requrl = requrl.replace(pubEndRegex, "&publishedend=1" + endYear);


    var query = getParameterByName('q');
    //remove [yr] from var query
    if (query.indexOf('yr:') > -1) {
        var yearRegex = /yr:\[\d{4}\s[tT][oO]\s\d{4}]/i;
        query = query.replace(yearRegex, "");

        yearRegex = /yr:\[\d{4}]/i;
        query = query.replace(yearRegex, "");

        query = $.trim(query);
    }

    //Append [yr] to var query
    var regYear = /^\d{4}$/i;
    var startDate_Isvalid = false;
    if (startYear.match(regYear)) {
        var lastWord = '';
        if (query.match(/\w+$/) != null)
            lastWord = query.match(/\w+$/)[0];
        if (lastWord.toString() == '')
            query += '';
        else if (lastWord.toString().toLowerCase() == 'and')
            query += ' ';
        else
            query += ' AND ';
        query += 'yr:[' + startYear;
        startDate_Isvalid = true;
    }

    if (startDate_Isvalid) {
        if (String(endYear).match(regYear)) {
            if (endYear == startYear)
                query += ']';
            else
                query += ' TO ' + endYear + ']';
        }
        else {
            var today = new Date();
            endYear = today.getFullYear();
            query += ' TO ' + endYear + ']';
        }
    }

    //Remove the original q parameter and append the new q parameter to url
    requrl = removeURLParameter(requrl, 'q');
    requrl = requrl.replace(/\?$/, '');
    if (requrl.indexOf('?') >= 0)
        requrl = requrl + '&q=' + query;
    else
        requrl = requrl + '?q=' + query;

    window.location = requrl;
    $("div#divLoadingSearchResults").addClass("show");
});


//Update years on facet year popup
$('body').on('click', '#btnSelectYears', function (e) {
    e.preventDefault();
    //Get the years within selected range
    var chart = $('#chart_Year').highcharts();
    var ext = chart.xAxis[0].getExtremes();
    var startYear = Highcharts.dateFormat('%Y', ext.min);
    var endYear = Highcharts.dateFormat('%Y', ext.max);
    var yearsArray = new Array();
    for (i = startYear; i <= endYear; i++) {
        yearsArray.push(i.toString());
    }

    //Hide all the years
    //$('div[data-facet-value="Year"] :checkbox').each(function () {
    //$(this).parent().parent().parent().css({
    //        display: 'none'
    //    });
    //})

    //Show the years which are selected using highchart range selector
    $('div[data-facet-value="Year"] :checkbox').each(function () {
        if (!this.disabled) {
            if (jQuery.inArray($(this).attr('data-facet-value'), yearsArray) !== -1) {
                //$(this).parent().parent().parent().css({
                //    display: 'list-item'
                //});
                this.checked = true;
                refinerDataSetValue(this);
            }
        }
        // $('div[data-facet-value="Year"]').find('.cd4schres-show-all').hide();
    });
});



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        url = urlparts[0] + '?' + pars.join('&');
        return url;
    } else {
        return url;
    }
}

function getQueryParams(fullUrl) {
    var params = [], tokens;

    if (fullUrl.indexOf('?') > 0) {
        var qs = fullUrl.substr(fullUrl.indexOf('?'));

        qs = qs.split("+").join(" ");

        var reQsParser = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = reQsParser.exec(qs)) {
            params.push({ key: decodeURIComponent(tokens[1]), value: decodeURIComponent(tokens[2]) });
        }
    }
    return params;
}



String.format = function () {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}