var cookieName = 'MarkedRecords'; // Cookie key
var cookiePath = '/' + window.location.pathname.split('/')[1]; // Use path eg. "/infotree" to avoid cookie clashes
var alertShown = false;
var guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// Retrieve cookie value
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


// Initialization code:
$(function () {
    addStarStyling();

    $("[id$=btnCloseSavedRecordsPopup]").click(function () {
        $.fn.ShowHideSavedRecordsPopup();
    });

    $("[id$=btnPrintSavedRecords]").click(function () {
        $.fn.printSavedRecords();
    });

    $("[id$=btnCloseMarkedRecordsPopup]").click(function () {
        $.fn.ShowHideMarkedRecordsPopup();
    });

    $("[id$=btnPrintMarkedRecords]").click(function () {
        $.fn.printMarkedRecords();
    });
});

// Sets the 'checked' state of the "marked record" stars (checkboxes) on any page (but which are only used on Latest Content / Search results )
function readFromCookie() {
    var json = (getCookie(cookieName) == "") ? {} : jQuery.parseJSON(getCookie(cookieName));
    for (i in json) {
        var data = json[i];
        var checkbox = $("input[data-forid='" + data.Id + "']");
        checkbox.prop('checked', true);
    }
};

// On each "marked records" checkbox, add <span> tag to set appropriate star image
function addStarStyling() {
    var checkBox = $('input[name="mark"]');
    $(checkBox).each(function () {
        $(this).wrap("<span class='Product_checkbox_image'></span>");
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
    });
};


// Called when a single item's star is ticked
function checkOne(element) {
    alertShown = false;
    //updateCookie(element);
    var checked = $(element).prop('checked');
    var checkboxes = [element];
    //updateMarkedRecords(checkboxes, checked);
    getMarkedRecordsGuid(updateMarkedRecords, checkboxes, checked);
};

// Called when 'Mark All' or 'Mark None' is clicked (on Search/Latest Content page)
function checkAll(checked) {
    alertShown = false;
    var checkboxes = new Array();
    $('input:checkbox').each(function (i, e) { // iterate all the input checkbox fields on the page. 'i' is the iterator count, 'e' is the element.
        if ($(e).attr('data-forid') != undefined || $(e).attr('data-cd4id') != undefined) { // if this attribute is defined, it's a VetMed "star" checkbox or a CD4 record checkbox
            $(e).prop('checked', checked); // set its checked state
            //updateCookie(e);
            checkboxes.push(e);
        }
    });
    //updateMarkedRecords(checkboxes, checked);
    getMarkedRecordsGuid(updateMarkedRecords, checkboxes, checked);
};

// Collect or generate the MarkedRecord GUID, and then call onSuccessFunc, passing it all the arguments to this.
function getMarkedRecordsGuid(onSuccessFunc) {
    var getMrGuidArgs = arguments;
    // Get the cookie, or new GUID and create cookie if not present already.
    var guidKey = getCookie(cookieName);
    if (!guidRegex.test(guidKey)) { // ...then new cookie is needed. Get a GUID for its value, and save.
        // Make AJAX call to get GUID from server
        $.ajax({
            url: "/mycabiutility/getguid/",
            type: "GET",
            success: function (jsondata) {
                var data = JSON.parse(jsondata);
                var newguid = data.newguid;
                if (guidRegex.test(newguid)) {
                    // Set cookie
                    document.cookie = cookieName + "=" + newguid + "; path="
                        + ((typeof useRootPath !== 'undefined' && useRootPath) ? "/" : cookiePath); // session cookie - no expiry date
                    onSuccessFunc(newguid, getMrGuidArgs); // the first arg will be the function "onSuccessFunc"
                }
                else
                    console.log("getguid AJAX call returned bad data: " + data);
            },
            error: function () { console.log("Unable to get GUID from server"); },
        });
    }
    else { // if cookie already exists
        onSuccessFunc(guidKey, getMrGuidArgs);
    }
}

// Send the marked records checkbox details and state to the handler, to record it server-side.
// On success, call updateMarkedRecordsPostOK to change the UI as appropriate
function updateMarkedRecords(guid, args) {
    // Prepare data for POST
    postData = null;
    var data = {};
    data.selected = args[2];
    data.browserid = guid;
    data.items = [];
    var elements = args[1];
    // The elements array is the checkboxes passed to this method. They are all "star" checkboxes.
    for (var j = 0; j < elements.length; j++) {
        var flag = true;
        var chkBox = $(elements[j]); // This seems to be some mysterious JQuery construct which allows you a more OO-type access to the element.
        var chkBoxData = chkBox.data(); // gets the "data-" attributes
        // Relevant (Product site) checkboxes will have "data-forid" attribute with a value identifying the resource, eg "news_24218"
        if (chkBoxData.forid != undefined) { // If it's a relevant (Product site) checkbox...
            var anchorTag = $('#' + chkBoxData.forid); // gets an array containing the hyperlink element (Product sites)
            if (anchorTag != undefined && anchorTag.length == 1) {
                var item = {}; // This is the hash that will be stored later
                // By some magic, 'anchorTag' now becomes the first element of the array (it would seem), and you can access its attributes.
                item.id = anchorTag.attr('id'); // eg "news_24218"
                for (var k = 0; k < data.items.length; k++) {
                    if (item.id == data.items[k].id) {
                        flag = false;
                        break;
                    }
                }
               
                item.title = anchorTag.text().replace(/[^a-zA-Z0-9&#,+()$~%.'":*?<>{} ]/gi, ''); // Remove funny characters (such as MS Word quotes) from title
                item.url = anchorTag.attr('href');
                if (flag!=false) {
                    data.items.push(item);
                }
            }
        }
        if (chkBoxData.cd4id != undefined && chkBoxData.cd4recordurl != undefined) { // ...then it's a CD4 Desktop page
            // nb. lowercase is enforced in "data-FooBar" attributes: "data-FooBar" -> thing.foobar
            var item = {}; // This is the hash that will be stored later
            item.id = chkBoxData.cd4id;
            item.url = chkBoxData.cd4recordurl;
            item.author = chkBoxData.cd4authlist;
            item.fullTextUrl = chkBoxData.cd4fulltext;
            // Find extra CD4 fields
            var cd4itemdiv, listContent;
            if (cd4 && cd4.isMobileSite) {
                listContent = $(elements[j]).closest(".list-content")[0];
            } else {
                cd4itemdiv = elements[j].parentNode.parentNode.parentNode.parentNode;
                listContent = cd4itemdiv.getElementsByClassName('list-content')[0];
            }

            var headingText = listContent.getElementsByTagName('h2')[0].getElementsByTagName('a')[0].textContent;
            item.title = headingText;
            // var extractText = listContent.innerText; // this is not cross-browser compatible.
            var extractText = '';
            if (chkBoxData.cd4abstractpage != undefined) { // single abstract page
                extractText = elements[j].parentNode.getElementsByClassName("cd4-abstract-extract")[0].textContent;
                item.publication = elements[j].parentNode.getElementsByClassName("cd4-abstract-publisher")[0].textContent;
            }
            else { // search results page
                var childNodes = listContent.childNodes;
                for (i = 0; i < childNodes.length; i++) {
                    var childNode = childNodes[i];
                    if (childNode.nodeName == '#text')
                        extractText += childNode.nodeValue.trim();
                    if (childNode.nodeType == 1 && childNode.classList.contains('cd4-publication'))
                        item.publication = childNode.textContent;
                }
            }
            item.extract = extractText;
            data.items.push(item);
        }
    }
    // POST the data to the handler
    var jsondata = JSON.stringify(data);
    jsondata = encodeURIComponent(jsondata);
    postData = data;
    $.ajax({
        url: "/mycabiutility/updatemarkedrecords/",
        type: "POST",
        data: { "jsondata": jsondata },
        success: updateMarkedRecordsPostOK,
        error: function () { console.log("POST to /mycabiutility/updatemarkedrecords/ failed. Data: " + jsondata); }
    });
}

var postData; // This is the data posted to /mycabiutility/updatemarkedrecords/

// Called if the marked records update post was OK. 
// Update the UI as required.
function updateMarkedRecordsPostOK() {
    for (i in postData.items) {
        var checkbox = $("input[data-forid='" + postData.items[i].id + "']");
        checkbox.prop('checked', postData.selected);
        if (postData.selected)
            checkbox.parent().addClass("selected");
        else
            checkbox.parent().removeClass("selected");
    }
}

$.fn.ShowHideSavedRecordsPopup = function () {
    if ($("[id$=divSavedRecordsCitFormat]").is(':visible'))
        $("[id$=divSavedRecordsCitFormat]").css({ 'display': "none" });
    else
        $("[id$=divSavedRecordsCitFormat]").css({ 'display': "inline" });
};

$.fn.ShowHideMarkedRecordsPopup = function () {
    if ($("[id$=divMarkedRecordsCitFormat]").is(':visible'))
        $("[id$=divMarkedRecordsCitFormat]").css({ 'display': 'none' });
    else
        $("[id$=divMarkedRecordsCitFormat]").css({ 'display': 'inline' });
};


// function printSavedRecords()
$.fn.printSavedRecords = function () {
    $.fn.ShowHideSavedRecordsPopup();
    if ($("#divSavedRecordsDataHidden").find('tr').length === 0) {
        alert('Please select records to print');
        return;
    }
    //Remove the header row
    $("#divSavedRecordsDataHidden").find('.trremove').remove();
    // Iterate the rows and format for print output
    $("#divSavedRecordsDataHidden").find('tr').each(function (i, e) {
        $(e).css('padding-bottom', '10px');
        $(e).css('padding-top', '5px');
        $(e).css('font-family', 'Arial');
        $(e).css('font-size', '13px');
        $(e).css('color', '#3d4c52');
        $(e).css('background-color', '#f5f5f5');
        $(e).find("td").css('border-top-width', '1px');
        $(e).find("td").css('border-top-color', '#3d4c52');
        $(e).find("td").css('border-top-style', 'solid');
        // In case row is selected then remove extra cells in TEMP div
        $(e).find('.tdremove').remove();
        if ($("[id$=rbCitationFormatCitationOnly]").prop('checked')) {
            $(e).find('.tdFR').remove();
            $(e).find('.tdDesc').remove();
        }
        if ($("[id$=rbCitationFormatCitationPlusAbstract]").prop('checked')) {
            $(e).find('.tdFR').remove();
        }
    });
    //Add heading to print page
    $("#divSavedRecordsDataHidden #tblSavedRecords tr:first").before("<tr style='padding-bottom:10px;font-weight:bold;font-size:20px;font-family:Arial;color:#c76209;'><td>Saved Records on My " + $("[id$=hdnSiteDisplayName]").val() + "</td></tr>");
    //Add footer to the print page
    var d = new Date(); var yr = d.getFullYear();
    $("#divSavedRecordsDataHidden #tblSavedRecords tr:last").after("<tr style='font-weight:bold;font-size:15px;font-family:Arial'><td style='border-top-width:1px;border-top-color:#3d4c52;border-top-style:solid;padding-top:10px;'>Copyright CAB International " + yr + "</td></tr>");
    // CODE to print data
    var strOldOne = $("#divSavedRecordsDataHidden").html();
    var WinPrint = window.open('', '', 'letf=0,top=0,width=800,height=600,toolbar=0,scrollbars=1,status=0');
    WinPrint.document.write(strOldOne);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
}
// End of function printSavedRecords()


// Function printMarkedRecords()
$.fn.printMarkedRecords = function () {
    $.fn.ShowHideMarkedRecordsPopup();
    if ($("#divMarkedRecordsDataHidden").find('tr').length === 0) {
        alert('Please select records to print');
        return;
    }
    //Remove the header row
    $("#divMarkedRecordsDataHidden").find('.trremove').remove();
    // Iterate the rows and format for print output
    $("#divMarkedRecordsDataHidden").find('tr').each(function (i, e) {
        $(e).css('padding-bottom', '10px');
        $(e).css('padding-top', '5px');
        $(e).css('font-family', 'Arial');
        $(e).css('font-size', '13px');
        $(e).css('color', '#3d4c52');
        $(e).css('background-color', '#f5f5f5');
        $(e).find("td").css('border-top-width', '1px');
        $(e).find("td").css('border-top-color', '#3d4c52');
        $(e).find("td").css('border-top-style', 'solid');
        // In case row is selected then remove extra cells in TEMP div
        $(e).find('.tdremove').remove();
        if ($("[id$=rbCitationFormatCitationOnly1]").prop('checked')) {
            $(e).find('.tdFR').remove();
            $(e).find('.tdDesc').remove();
        }
        if ($("[id$=rbCitationFormatCitationPlusAbstract1]").prop('checked')) {
            $(e).find('.tdFR').remove();
        }
    });
    //Add heading to print page
    $("#divMarkedRecordsDataHidden #tblMarkedRecords tr:first").before("<tr style='padding-bottom:10px;font-weight:bold;font-size:20px;font-family:Arial;color:#c76209;'><td>Selected Records on My " + $("[id$=hdnSiteDisplayName]").val() + "</td></tr>");
    //Add footer to the print page
    var d = new Date(); var yr = d.getFullYear();
    $("#divMarkedRecordsDataHidden #tblMarkedRecords tr:last").after("<tr style='font-weight:bold;font-size:15px;font-family:Arial'><td style='border-top-width:1px;border-top-color:#3d4c52;border-top-style:solid;padding-top:10px;'>Copyright CAB International " + yr + "</td></tr>");
    // CODE to print data
    var strOldOne = $("#divMarkedRecordsDataHidden").html();
    var WinPrint = window.open('', '', 'letf=0,top=0,width=800,height=600,toolbar=0,scrollbars=1,status=0');
    WinPrint.document.write(strOldOne);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
}
// End of function printMarkedRecords()

