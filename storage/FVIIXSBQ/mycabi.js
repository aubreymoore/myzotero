// This file is for the old/bad/vetmed MyCabi and should be removed at some point.

$(document).ready(function () {

    $(document).on('click', '.dropdown-menu-change-on-select li a', function () {
        var selected = $(this).text();
        $(this).parents('ul').prev('.dropdown-toggle').find('strong').html(selected);
    });


    //myrecords.html > Click on All
    $('.myrecords').find('.select-all-listing').click(function (event) {
        var divId = '#' + $(this).closest('div.tab-pane').attr("id");
        if (this.checked) {
            $(divId).find('.listing .checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $(divId).find('.listing .checkbox').each(function () {
                this.checked = false;
            });
        }
    });

    //myrecords.html > Click on single checkbox
    $('#selected-records').find('div.cd4-content-entry-list .custom-input').click(function (event) {
        var divId = '#selected-records';
        var countSelection = 0;
        var countTotal = 0;
        $(divId).find('div.check-mark').each(function () {
            if ($(this).find('.custom-input').prop('checked') == true) {
                //flag = true;
                countSelection = countSelection + 1;
            }
            countTotal = countTotal + 1;
        })
        //Set select all checkbox to true if all checkboxes are checked and to false if one of the checkbox is uncheck    
        if (countSelection < countTotal) {
            $(divId).find('.select-all-listing').prop('checked', false)
        }
        else if (countSelection = countTotal) {
            $(divId).find('.select-all-listing').prop('checked', true)
        }
    });

    //myrecords.html > Click on single checkbox
    $('.myrecords').find('.custom-input').click(function (event) {
        //if (!$(this).closest('div.row').find('input[type="checkbox"]').is(':checked')) {
        //    alert('test2');
        //    $(this).closest('div.tab-pane').find('.select-all-listing').prop('checked', false)
        //}
        var divId = '#' + $(this).closest('div.tab-pane').attr("id");
        var countSelection = 0;
        var countTotal = 0;
        $(divId).find('#sort-wrapper tr').each(function () {
            if ($(this).find('.custom-input').prop('checked') == true) {
                //flag = true;
                countSelection = countSelection + 1;
            }
            countTotal = countTotal + 1;
        })
        //Set select all checkbox to true if all checkboxes are checked and to false if one of the checkbox is uncheck    
        if (countSelection < countTotal) {
            $(divId).find('.select-all-listing').prop('checked', false)
        }
        else if (countSelection = countTotal) {
            $(divId).find('.select-all-listing').prop('checked', true)
        }
   });

    //mysearches and myrecords > Alert if none of the checkbox is selected
    //$('.my-records').find('.icon-bar-n ul li a').click(function (event) {
    //    var tableId = '#' + $(this).closest('div.tab-pane').attr("id");
    //    if (tableId !== '#' + undefined) {
    //        if (!$(tableId).find('input[type="checkbox"]').is(':checked')) {
    //            alert("Please check at least one checkbox");
    //            return false;
    //        }
    //    }        
    //})
    
    //mysearches.html > Click on single checkbox
    $('.mysearch').on('click', '#sort-wrapper tr .custom-input', function () {
        if ($(this).prop('checked') == true) {
            //$(this).parents('td').siblings('.td-fourth').children('.dropdown').show()
            checkboxSelection('#' + $(this).closest('table.mysearch').attr("id"));

        } else {
            //$(this).parents('td').siblings('.td-fourth').children('.dropdown').hide()
            checkboxSelection('#' + $(this).closest('table.mysearch').attr("id"));
        }
    })
    //mysearches.html > Click on All
    $('.mysearch').on('click', '#sort-header .custom-input', function () {
        var tableId = '#' + $(this).closest('table.mysearch').attr("id");
        if ($(this).prop('checked') == true) {            
            var countTotal = 0;
            $(tableId).find('#sort-wrapper tr').each(function () {
                $(tableId).find('.custom-input').prop('checked', true);
                countTotal = countTotal + 1;
                //$(tableId).parent().find('.combine-selected').children('span').hide().next('a').show();
                //$(tableId).find('#sort-wrapper tr td.td-fourth').children('.dropdown').show();
                //checkboxSelection(tableId);
            })
            if (countTotal > 1) {
                $(tableId).parent().find('.combine-selected').children('.radio-listing').show();
                $(tableId).parent().find('.combine-selected').children('span').hide().next('a').show();
            }
        } else {
            $(tableId).parent().find('.combine-selected').children('.radio-listing').hide();
            $(tableId).parent().find('.combine-selected').children('span').show().next('a').hide();
            $(tableId).find('#sort-wrapper tr').each(function () {
                $(tableId).find('.custom-input').prop('checked', false);
                //$(tableId).parent().find('.combine-selected').children('span').show().next('a').hide();
                //$(tableId).find('#sort-wrapper tr td.td-fourth').children('.dropdown').hide();
            })
        }
    })

    if ($(".mysearch").length > 0) {
        $(".mysearch").tablesorter({
            headers: {
                0: { sorter: false },
                1: { sorter: "title" },
                2: { sorter: "shortDate", dateFormat: "dd MMM yyyy HH:mm" },
                3: { sorter: false },
                4: { sorter: false }
            }
        });
        $(".mysearch").find('#sort-wrapper tr').removeClass('tr-first tr-last alter1 alter2');

        $(".mysearch").find('#sort-wrapper tr:first').addClass('tr-first');
        $(".mysearch").find('#sort-wrapper tr:last').addClass('tr-last');

        $(".mysearch").find('#sort-wrapper tr:even').addClass('alter1');
        $(".mysearch").find('#sort-wrapper tr:odd').addClass('alter2');
    }


    $(".mysearch").bind("sortEnd", function () {
        tableStyling('#' + $(this).closest('table.mysearch').attr("id"));
    });

    $('.mysearch .dropdown-toggle').click(function () {
        $(this).parent().parent().parent().parent().find("tr").css({ 'z-index': 0, 'position': 'relative' });
        $(this).parent().parent().parent().css({ 'z-index': 1, 'position': 'relative' });
    });

    $('.mysearch').find('#sort-wrapper tr').each(function () {
        var tableId = '#' + $(this).closest('table.mysearch').attr("id");
        var countSelection = 0;
        $(tableId).find('#sort-wrapper tr').each(function () {
            if ($(this).find('.custom-input').prop('checked') == true) {
                flag = true;
                countSelection = countSelection + 1;
            }
        })
        if (countSelection >= 2) {
            $(tableId).parent().find('.combine-selected').children('span').hide().next('a').show();
            $(tableId).parent().find('.combine-selected').children('.radio-listing').show();
            $(tableId).parent().find('.combine-radio').find('li').each(function () {
                if ($.trim($('#hdnSearchFilter').val()) === $(this).find(".custom-input-radio").attr("id").substring(8)) {
                     $(this).find('.custom-input-radio').prop('checked', true);
                }
            });
        } else {
            $(tableId).parent().find('.combine-selected').children('span').show().next('a').hide();
            $(tableId).parent().find('.combine-selected').children('.radio-listing').hide();
        }
    });

    //Calculate the records count for MySearches and MyRecords
    $('.reacord-nav-tab li a').click(function () {
        var divId = $(this).attr('href');
        //console.log(divId);
        CalculateRowCount(divId);
    })

    //Export citation to refworks
    $('.myrecords').find('.icon-bar-n ul li button').click(function (event) {
        var tableId = '#' + $(this).closest('div.tab-pane').attr("id");
        if (tableId !== '#' + undefined) {
            if (!$(tableId).find('input[type="checkbox"]').is(':checked')) {
                alert("Please check at least one checkbox");
                return false;
            }
            else {
                var data = {};//This will store the array of url's 
                data.urls = [];
                $(tableId).find('.listing .checkbox').each(function () {
                    if ($(this).is(':checked')) {
                        if ($(this).data().forurl != undefined)
                            data.urls.push($(this).data().forurl);//Get the url from 'data-forurl' attribute of checkbox
                    }
                })
                getCitation(updateCitation, data);
            }
        }
    })

    /* Tabs*/
    $('.reacord-nav-tab').toggleTabs('.reacord-nav-tab');//My searches and my record tabs
    $('.right-tabs').toggleTabs('.right-tabs');//My cabi profile tabs
    $('.left-tabs').toggleTabs('.left-tabs');//Simple and advance search tabs


    /* Get and set search filter for combinesearch */

    $(".radio-listing").find(".custom-input-radio").click(function () {
        if ($(this).hasClass("cabdirect4"))
            return;
        var parent = $(this).parents().eq(2).parent(),
        indexLi = parent.children('li').index($(this).parents().eq(2));

        var bln = $(this).attr("id").substring(8);

        $('#hdnSearchFilter').val(" " + bln + " ");
        $(".combine-radio").each(function (index) {
            $(this).find('li').eq(indexLi).find('.custom-input-radio').prop('checked', true);
        });
    });

    //$(".combine-selected1").find('input[type="radio"]').click(function () {
    //    var id = $(this).attr("id");//Get the id of radio button clicked

    //    //uncheck all the radio buttons from all the tabs
    //    $(".combine-selected").find('input[type="radio"]').each(function () {
    //        $(this).attr('checked', false)
    //    })
        
    //    //set the 'not' radio button on all tabs
    //    if ($(this).attr("id").indexOf('Not') != -1) {
    //        $(".combine-selected").find('input[type="radio"]').each(function () {
    //            if ($(this).attr("id").indexOf('Not') != -1) {
    //                $(this).prop("checked", true)
    //            }
    //        })
    //        //set hidden field to NOT
    //        $('#hdnSearchFilter').val(" NOT ")
    //    }                
    //    else if ($(this).attr("id").indexOf('And') != -1) {
    //        $(".combine-selected").find('input[type="radio"]').each(function () {
    //            if ($(this).attr("id").indexOf('And') != -1) {
    //                $(this).prop("checked", true)
    //            }
    //        })
    //        //set hidden field to AND
    //        $('#hdnSearchFilter').val(" AND ")
    //    }
    //    else if ($(this).attr("id").indexOf('Or') != -1) {
    //        $(".combine-selected").find('input[type="radio"]').each(function () {
    //            if ($(this).attr("id").indexOf('Or') != -1) {
    //                $(this).prop("checked", true)
    //            }
    //        })
    //        //set hidden field to OR
    //        $('#hdnSearchFilter').val(" OR ")
    //    }
    //})

}); // end $(document).ready(function () {


function checkboxSelection(tableId) {
    var countSelection = 0;
    var countTotal = 0;
    $(tableId).find('#sort-wrapper tr').each(function () {
        if ($(this).find('.custom-input').prop('checked') == true) {
            flag = true;
            countSelection = countSelection + 1;
        }
        countTotal = countTotal + 1;
    })

    if (countSelection >= 2) {
        $(tableId).parent().find('.combine-selected').children('.radio-listing').show();
        $(tableId).parent().find('.combine-selected').children('span').hide().next('a').show();
    }
    else {
        $(tableId).parent().find('.combine-selected').children('.radio-listing').hide();
        $(tableId).parent().find('.combine-selected').children('span').show().next('a').hide();
    }

    //Set select all checkbox to true if all checkboxes are checked and to false if one of the checkbox is uncheck    
    if (countSelection < countTotal) {        
        $(tableId).find('#sort-header .custom-input').prop('checked', false)
    }
    else if (countSelection = countTotal) {
        $(tableId).find('#sort-header .custom-input').prop('checked', true)
    }

}

function tableStyling(tableId) {
    $(tableId).find('#sort-wrapper tr').removeClass('tr-first tr-last alter1 alter2');

    $(tableId).find('#sort-wrapper tr:first').addClass('tr-first');
    $(tableId).find('#sort-wrapper tr:last').addClass('tr-last');

    $(tableId).find('#sort-wrapper tr:even').addClass('alter1');
    $(tableId).find('#sort-wrapper tr:odd').addClass('alter2');
}

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

/* Show/Hide Tabs for search, my cabi profile, my searches and my records */
$.fn.toggleTabs = function (section) {
    var currentTab = "";
    var selectedTab = "";
    if (window.location.hash) {
        currentTab = window.location.hash;
    }
  
    if (section = '.reacord-nav-tab') {
        if ($('#SelectedTabId').length && $('#SelectedTabId').val().length) {
            currentTab = $('#SelectedTabId').val();
            window.location.hash = $('#SelectedTabId').val();           
        }
    }
    if (section = '.right-tabs') {
        if ($('#SelectedProfileTabId').length && $('#SelectedProfileTabId').val().length) {
            currentTab = $('#SelectedProfileTabId').val();           
            window.location.hash = $('#SelectedProfileTabId').val();
        }
    }   

    if (section = '.left-tabs') {
        var searchtype = getParameterByName('searchtype');
        if (searchtype != "") {
            currentTab = '#' + searchtype + '-nav';
            if (getParameterByName('searchtype') === "browse-search") {
                if (getParameterByName('q').match("^author")) {
                    $('.subject-panel').hide();
                    $('.serial-panel').hide();
                    $('.authors-list').show();
                    $("div#browse-search ul.date-search div.dropdown #dropdownMenu1").html("<strong>Author</strong><span class='caret'></span>");
                }
                else if (getParameterByName('sbt').length > 0) {
                        $('.subject-panel').hide();
                        $('.authors-list').hide();
                        $('.serial-panel').show();
                        $("div#browse-search ul.date-search div.dropdown #dropdownMenu1").html("<strong>Serial</strong><span class='caret'></span>");
                }
           }
            //window.location.hash = $('#SelectedSearchTabId').val();
        }
    }

    //if (section = '.left-tabs') {
    //    if ($('#SelectedSearchTabId').length && $('#SelectedSearchTabId').val().length) {
    //        currentTab = $('#SelectedSearchTabId').val();
    //        window.location.hash = $('#SelectedSearchTabId').val();
    //    }
    //}

    if (currentTab.length) {
        if (currentTab.indexOf("-nav") >= 0) {
            currentTab = currentTab.replace("-nav", "");
            $(this).children('li').each(function () {
                if ($(this).children('a').attr('href') === currentTab) {
                    selectedTab = $(this);
                }
            });
            if (selectedTab) {
                $(this).children('li').removeClass('active');
                var listElement = $(selectedTab).parent();
                if (listElement.is('.reacord-nav-tab')) {
                    $('.my-records').find('.tab-pane').removeClass('active');
                    $(currentTab).addClass('active');
                    $(selectedTab).parent().next().find('a').attr("data-cd4tooltip", $(selectedTab).children(":first").text() + " panel");
                    FnCD4Tooltips();

                    CalculateRowCount(currentTab);
                }
                if (listElement.is('.right-tabs')) {
                    //$('.left-tabs li').removeClass('active');
                    $('.my-profile').find('.tab-pane').removeClass('active');
                    $(currentTab).addClass('active');
                    $(selectedTab).parent().next().find('a').attr("data-cd4tooltip", $(selectedTab).children(":first").text() + " panel");
                    FnCD4Tooltips();
                }
                if (listElement.is('.left-tabs')) {
                    //$('.right-tabs li').removeClass('active');
                    $('.search-bar').find('.tab-pane').removeClass('active');
                    $(currentTab).addClass('active');
                    $(selectedTab).parent().next().find('a').attr("data-cd4tooltip", $(selectedTab).children(":first").text() + " search panel");
                    FnCD4Tooltips();
                }
                $(selectedTab).addClass('active');
                $(currentTab).show();
            }
        }
    } // end if(currentTab.length)
    // This section ... er ... does something. Don't need to document, it's only Javascript.
    if ($(this).length && $(this).children('li').length ) {
        $(this).children('li').click(function (event) {
            // Check if CD4 button needing refresh - do nothing if so.
            if ($('#cd4-saved-records-button').attr('data-cd4-allow-default'))
                return;
            if ($('#cd4-saved-searches-button').attr('data-cd4-allow-default'))
                return;
            if (this.hasAttribute("data-newsearch") || this.hasAttribute("data-cd4-allow-default"))
                return; // allow normal navigation for New Search link
            event.preventDefault();
            //window.location.hash = $(this).children('a').attr('href') + '-nav';
            var listElement = $(this).parent();
            if (listElement.is('.reacord-nav-tab')) {
                var tabid = $(this).children('a').attr('href');
                if (tabid !== '#') {
                    $(this).parent().children('li').removeClass('active');
                    $(this).addClass('active');

                    $('.my-records').find('.tab-pane').removeClass('active');
                    $(tabid).addClass('active');

                    $(this).parent().next().find('a').attr("data-cd4tooltip", $(this).children(":first").text() + " panel");
                    FnCD4Tooltips();

                    window.location.hash = tabid + '-nav';
                }
            }
            if (listElement.is('.right-tabs')) {                
                var tabid = $(this).children('a').attr('href');
                if (tabid !== undefined && tabid !== '#' && tabid !== 'javascript:;') {
                    //$('.left-tabs li').removeClass('active');
                    $('.my-profile').find('.tab-pane').removeClass('active');
                    $(tabid).addClass('active');
                    $(this).parent().next().find('a').attr("data-cd4tooltip", $(this).children(":first").text() + " panel");
                    FnCD4Tooltips();
                    window.location.hash = tabid + '-nav';
                }
            }
            if (listElement.is('.left-tabs')) {
                var tabid = $(this).children('a').attr('href');
                if (tabid !== undefined) {
                    //$('.right-tabs li').removeClass('active');
                    $('.search-bar').find('.tab-pane').removeClass('active');
                    $(tabid).addClass('active');
                    $(this).parent().next().find('a').attr("data-cd4tooltip", $(this).children(":first").text() + " search panel");
                    FnCD4Tooltips();
                    var searchUrl = window.location.href;
                    if (window.location.search) {
                        var searchtype = getParameterByName('searchtype');
                        if (searchtype)
                            searchUrl = removeURLParameter(searchUrl, 'searchtype');
                    }
                }
                if (searchUrl) {
                    if (searchUrl.substr(-1) === "?") 
                        searchUrl = searchUrl + "searchtype=" + tabid.substr(val.indexOf("#") + 2);
                    else
                        if (window.location.search) 
                            searchUrl = searchUrl + "&searchtype=" + tabid.substr(val.indexOf("#") + 2);
                        else
                            searchUrl = searchUrl + "?searchtype=" + tabid.substr(val.indexOf("#") + 2);
                }
                history.pushState("", document.title, searchUrl);
            }

            var tab = $(this).children('a').attr('href');
            if (tabid !== undefined && tabid !== '#' && tabid !== 'javascript:;') {
                $(tab).show();
            }
            var tabId = window.location.hash; // will look something like "#h-02"
            $(tabId).click(); // after you've bound your click listener
        });
    } // end if($(this).length && $(this).children('li').length)
};

function CalculateRowCount(divId)
{
    var numResults = $(divId).find('table tr').length - 1;
    if (numResults > 0) {
        if (divId.toLowerCase().indexOf("search") >= 0) {
            if (numResults > 1)
                $('.my-records').find('div.search-result-label').html("Displaying: <strong>" + numResults + " searches</strong>");
            else
                $('.my-records').find('div.search-result-label').html("Displaying: <strong>" + numResults + " search</strong>");
        }
        else {
            if (numResults > 1)
                $('.my-records').find('div.search-result-label').html("Displaying: <strong>" + numResults + " records</strong>");
            else
                $('.my-records').find('div.search-result-label').html("Displaying: <strong>" + numResults + " record</strong>");
        }
    }
    else
        $('.my-records').find('div.search-result-label').html("");
}

// Collect or generate citation, and then call onSuccessFunc, passing it all the arguments to this.
function getCitation(onSuccessFunc) {
    var getArgs = arguments;
    var jsondata = JSON.stringify(getArgs[1])
    jsondata = encodeURIComponent(jsondata);
    // Make AJAX call to get citation from server
    $.ajax({
        url: '/mycabiutility/buildcitation',
        type: 'POST',
        data: { "jsondata": jsondata },
        success: function (returnData) {            
            //console.log("returnData - " + returnData);
            //returnData = JSON.stringify(returnData);
            //console.log(returnData)
            var data = JSON.parse(returnData);
            //console.log(data)
            var citation = data.citation;
            //console.log("citation - " + citation);
            onSuccessFunc(citation, getArgs); // the first arg will be the function "onSuccessFunc"
        },
        error: function () { console.log("Unable to get citation from server"); },
    });
}

//Update the text area with return citation
function updateCitation(citation, args) {
    $('textarea#ImportData').html(citation);
    //var formid = $('form').attr('id');
    $('#aspnetForm').submit();

}

var processProjectClick = function (event) {
    if (event) {
        var id = $(event).attr("id");
        $('div#modal-addproject').find("input[type='hidden']").val(id);
    }
}

var helloworld = function () {

}

function FnCD4Tooltips()
{
    var cd4Tooltips = $('div.tooltips').find($('input[type=hidden')).val();
    if (cd4Tooltips != '') {
        var tt = $.parseJSON(cd4Tooltips);
        for (var key in tt) {
            if (tt.hasOwnProperty(key)) {
                if (tt[key].tt_text !== "") {
                    $('*[data-cd4tooltip="' + tt[key].Identifier + '"]').attr('data-original-title', tt[key].tt_text)
                                                                        .attr('data-placement', 'bottom')
                                                                        .attr('data-delay', '{"show":600, "hide":300}');
                    $('*[data-cd4tooltip="' + tt[key].Identifier + '"]').tooltip();
                }
                if (tt[key].tt_url !== "") {
                    $('*[data-cd4tooltip="' + tt[key].Identifier + '"]')
                        .attr('href', 'javascript:;')
                        //.attr('target', 'popup')
                    //.attr('onclick', "window.open('" + tt[key].tt_url + "','popup','scrollbars=1,status=0,toolbar=0,resizable=0,directories=0'); return false;");
                        .attr('onclick', "PopupCenter('" + tt[key].tt_url + "', 'popup', '700','500')");
                }
            }
        }
        //$.each(tt, function (k, v) {
        //    //var elem = $('*[data-cd4tooltip="' + k + '"]');
        //    $('*[data-cd4tooltip="' + k + '"]').attr('data-original-title', v);
        //    //$('*[data-cd4tooltip="' + k + '"]').addClass('tooltp');
        //    //$('*[data-cd4tooltip="' + k + '"]').attr('data-placement','left');
        //    $('*[data-cd4tooltip="' + k + '"]').tooltip({
        //        tooltipClass: '.ui-tooltip',
        //    });
        //});
    }
}