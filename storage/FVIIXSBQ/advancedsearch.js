
/*  jQuery ready function. Specify a function to execute when the DOM is fully loaded.  */
var rowTemplate;
var itemTypesData;
$(document).ready(function () {
    itemTypesData = $("[id$=hdnDDLData]").val();
    var rowcount = getParameterByName('rowcount');

    if (rowcount == "" || rowcount < 3) {
        $.fn.addRowToTableWithData(3);
    } else {
        $.fn.addRowToTableWithData(rowcount);
    }

    $('#ddlBool1').hide();
    $('#aDel1').hide();

    //$('ul#datesearch div.dropdown ul#ulDoctypes a').on('click', processContentTypeClick);
    $('#addrow').click(function () {
        $.fn.addRowToTableWithData(1);
    });

    //$.fn.bsTooltip = $.fn.tooltip.noConflict();

    var cd4Tooltips = $('div.tooltips').find($('input[type=hidden]')).val();
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
                        .attr('onclick', "PopupCenter('" + tt[key].tt_url + "', 'popup', '700','500')");
                }
            }
        }

        //$.each(tt, function (k, v) {
        //    //var elem = $('*[data-cd4tooltip="' + k + '"]');
        //    console.log(k);
        //    console.log(v);
        //    $('*[data-cd4tooltip="' + k + '"]').attr('data-original-title', v);
        //    //$('*[data-cd4tooltip="' + k + '"]').addClass('tooltp');
        //    //$('*[data-cd4tooltip="' + k + '"]').attr('data-placement','bottom');
        //    $('*[data-cd4tooltip="' + k + '"]').tooltip();
        //});
    }
    //$(".tooltp").tooltip();
});

//$.fn.addRowToTable = function (count) {
//    var $ul = $('#tblSearch');

//    for (i = 0; i < count; i++) {
//        var thisListNum = 1;
//        if ($ul.find('li').length > 0) {
//            thisListNum = parseInt($('#tblSearch li.listitem:last-child').attr('id').replace('li', '')) + 1;
//        }
//        $("[id$=hdnRows]").val(thisListNum);

//        var template = rowTemplate;
//        while (template.indexOf('{{id}}') >= 0) {
//            template = template.replace('{{id}}', thisListNum)
//        }
//        $ul.append(template);
//        var $select = $ul.find("#ddlSearchList" + thisListNum);
//        $.each(JSON.parse(itemTypesData), function(key, val) {
//            $select.append('<li role="presentation"><a href="javascript:;" tabindex="-1" role="menuitem" data-key="' + key + '">' + val + '</a></li>');
//        });
//    }   
//    $('ul#tblSearch li.listitem div.search-type a').on('click', processKeywordSearch);
//    $('ul#tblSearch li.listitem div.allfields a').on('click', processKeywordSearch);
//};

$.fn.renderRowForTable = function(id, boolValue, textValue, itemTypeValue, itemTypeKey) {
    var $rowLi = $("<li></li>").addClass("listitem").attr("id", "li" + id.toString());

    var $boolDiv = $("<div></div>")
        .addClass("dropdown")
        .addClass("search-type")
        .attr("name", "ddlBool" + id.toString())
        .attr("id", "ddlBool" + id.toString());

    $boolDiv.append($("<a></a>")
            .attr("aria-expanded", false)
            .attr("data-toggle", "dropdown")
            .attr("id", "dropdownMenuA" + id.toString())
            .addClass("dropdown-toggle")
            .addClass("form-control")
            .attr("href", "javascript:;")
            .append($("<strong></strong>").text(boolValue.toString()))
            .append($("<span></span>").addClass("caret"))
        )
        .append($("<ul></ul>")
            .attr("aria-labelledby", "dropdownMenuA" + id.toString())
            .attr("role", "menu")
            .addClass("dropdown-menu")
            .append($("<li></li>")
                .attr("role", "presentation")
                .append($("<a></a>")
                    .attr("href", "javascript:;")
                    .attr("tabindex", "-1")
                    .attr("role", "menuitem")
                    .text("And"))
            )
            .append($("<li></li>")
                .attr("role", "presentation")
                .append($("<a></a>")
                    .attr("href", "javascript:;")
                    .attr("tabindex", "-1")
                    .attr("role", "menuitem")
                    .text("Or"))
            )
            .append($("<li></li>")
                .attr("role", "presentation")
                .append($("<a></a>")
                    .attr("href", "javascript:;")
                    .attr("tabindex", "-1")
                    .attr("role", "menuitem")
                    .text("Not"))
            )
        )
        .append($("<input></input>")
            .addClass("hidbool")
            .attr("type", "hidden")
            .attr("id", "hdnBool" + id.toString())
            .attr("name", "hdnBool" + id.toString())
            .val(boolValue.toString()));

    $rowLi.append($boolDiv);

    var $inputText = $("<input></input>").attr("type", "text").attr("name", "txtSearchBox" + id.toString())
        .attr("id", "txtSearchBox" + id.toString())
        .attr("placeholder", "Enter keyword search")
        .attr("title","Enter keyword search")
        .addClass("form-control")
        .addClass("cd4-placeholder")
        .val(textValue.toString());

    $rowLi.append($inputText);

    var $fieldsDiv = $("<div></div>").addClass("allfields");

    $fieldsDiv.append($("<span></span>")
        .addClass("in").text("in"));

    $fieldsDiv.append($("<div></div>")
        .addClass("dropdown")
        .addClass("search-itemtype")
        .append(
            $("<a></a>")
            .attr("aria-expanded", false)
            .attr("data-toggle", "dropdown")
            .attr("id", "dropdownMenuB" + id.toString())
            .addClass("dropdown-toggle")
            .addClass("form-control")
            .attr("href", "javascript:;")
            .append(
                $("<strong></strong>")
                .text(itemTypeValue.toString())
            )
            .append(
                $("<span></span>")
                .addClass("caret")
            )
        )
        .append(
            $("<ul></ul>")
            .attr("aria-labelledby", "dropdownMenuB" + id.toString())
            .attr("role", "menu")
            .addClass("dropdown-menu")
            .addClass("dropdownlist")
            .attr("id", "ddlSearchList" + id.toString())
            .attr("name", "ddlSearchList" + id.toString())
        )
    )
    .append($("<input></input>")
            .attr("type", "hidden")
            .attr("id", "hdnItemType" + id.toString())
            .attr("name", "hdnItemType" + id.toString())
            .val(itemTypeKey.toString())
            .addClass("hiditemtype")
        )
    .append(
        $("<a></a>").attr("href", "javascript:;")
        .attr("id", "aDel" + id.toString())
        .attr("onclick", "removeRow(" + id.toString() + ")")
        .attr("aria-label", "Close")
        .addClass("tag")
        .append($("<span></span>").addClass("icon-icon_cross"))
    );

    $rowLi.append($fieldsDiv);
 
    return $rowLi;
}

$.fn.addRowToTableWithData = function (count) {
    // alert('test');
    var $ul = $('#tblSearch');
    var itemTypes = JSON.parse(itemTypesData);
    var boolData = { "and": "And", "or": "Or", "not": "Not" };
    for (var i = 0; i < count; i++) {
        var thisListNum = 1;
        if ($ul.find('li').length > 0) {
            thisListNum = parseInt($('#tblSearch li.listitem:last-child').attr('id').replace('li', '')) + 1;
        }
        $("[id$=hdnRows]").val(thisListNum);

        var boolValue, textValue, itemTypeValue, itemTypeKey;

        if (boolData[getParameterByName('options' + thisListNum).toLowerCase()] !== undefined) {
            boolValue = boolData[getParameterByName('options' + thisListNum).toLowerCase()];
        }
        else {
            boolValue = "And";
        }
        textValue = getParameterByName('q' + thisListNum);

        if (itemTypes[getParameterByName('occuring' + thisListNum)] !== undefined) {
            itemTypeValue = itemTypes[getParameterByName('occuring' + thisListNum)];
        }
        else {
            itemTypeValue = "All fields";
        }

        if (itemTypes[getParameterByName('occuring' + thisListNum)] !== undefined) {
            itemTypeKey = getParameterByName('occuring' + thisListNum);
        } else {
            itemTypeKey = "All";
        }

        $ul.append($.fn.renderRowForTable(thisListNum, boolValue, textValue, itemTypeValue, itemTypeKey));
        var $select = $ul.find("#ddlSearchList" + thisListNum);

        $.each(JSON.parse(itemTypesData), function(key, val) {
            $select.append('<li role="presentation"><a href="javascript:;" tabindex="-1" role="menuitem" data-key="' + key + '">' + val + '</a></li>');
        });
    }    
    $('ul#tblSearch li.listitem div.search-type a').on('click', processKeywordSearch);
    $('ul#tblSearch li.listitem div.allfields a').on('click', processKeywordSearch);
};

function removeRow(id) {
    $('#li' + id).remove();
}

var processKeywordSearch = function (event) {   
    if (event) {
        var selected = $(this).text();
        $(this).parents('ul').prev('.dropdown-toggle').find('strong').html(selected);
        var filterVal;
        if ($(this).parents('.dropdown').hasClass('search-type')) {
            filterVal = $(this).text().trim();
            $(this).closest('.search-type').find(".hidbool").val(filterVal);
        }
        else if ($(this).parents('.dropdown').hasClass('search-itemtype')) {
            filterVal = $(this).data('key');
            if (filterVal !== undefined) {
                $(this).closest('.allfields').find(".hiditemtype").val(filterVal);
            }
        }
    }
};

//var processContentTypeClick = function (event) {
//    if (event) {
//        var inputHidden = $(this).closest('ul#datesearch').find("#hdnSelectedDocTypes").val();//document.getElementById("<%= hdnSelectedDocTypes.ClientID %>");
//        //alert(inputHidden);
//        var selectionData = JSON.parse(inputHidden);
//        //console.debug("json data: " + selectionData);
//        var litag = $(this).parent();
//        var id = $(this).attr("id");
//        //console.log(litag);
//        //console.log("id: " + id);
//        //console.log("litag className: " + litag.attr('class'));
//        //console.log("ih value before: " + inputHidden);
//        // NB. the CSS class as read here is before the change. So logic needs to be inverted. This is consistent across browsers thankfully.
//        var hfval = true; // ie. selected
//        if (litag.attr('class') == "active") // nb. this is before the change
//            hfval = false; // ie. not selected
//        console.log(selectionData);
//        selectionData[id] = hfval;
//        //console.log(selectionData);
//        inputHidden = JSON.stringify(selectionData); // Convert object to JSON string
//        $(this).closest('ul#datesearch').find("#hdnSelectedDocTypes").val(inputHidden);
//        //console.log("ih value after: " + inputHidden);
//    }
//};

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
