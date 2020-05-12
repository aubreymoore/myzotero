$('#myproject').on('click', '#sort-header .custom-input', function () {
    if ($(this).prop('checked') == true) {
        $('#myproject #sort-wrapper tr').each(function() {
            $(this).find('.custom-input').prop('checked', true);
            $('.combine-selected').children('span').hide().next('a').show();
            $('.combine-selected').children('.radio-listing').show();
            $('#myproject #sort-wrapper tr td.td-fourth').children('.dropdown').show()
        });

    } else {
        $('#myproject #sort-wrapper tr').each(function() {
            $(this).find('.custom-input').prop('checked', false);
            $('.combine-selected').children('span').show().next('a').hide();
            $('.combine-selected').children('.radio-listing').hide();
            $('#myproject #sort-wrapper tr td.td-fourth').children('.dropdown').hide()
        });
    }
});

if ($("#myproject").length > 0) {
    $("#myproject").tablesorter({
        headers: {
            0: { sorter: false },
            1: { sorter: "text" },
            2: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
            3: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
            4: { sorter: "digit" },
            5: { sorter: "digit" },
            6: { sorter: "digit" },
            7: { sorter: false }
        }
    });
}

// Edit Project Title
$('.edit-project-title-block .icon-block').click(function () {
    var _this = $(this).parents('.edit-project-title');
    _this.hide();
    _this.next('.save-project-title').show();
    var titleContent = _this.children('h3').text();
    _this.next('.save-project-title').children('input').val(titleContent);
});

// Save Project Title
$('.save-project-title button').click(function () {
    var _this = $(this).parent('.save-project-title');
    _this.hide();
    _this.prev('.edit-project-title').show();
    var inputContent = _this.children('input').val();
    _this.prev('.edit-project-title').children('h3').text(inputContent);
});

// Edit Summary Content
$('.edit-project-title a.editsumm').click(function () {
    var _this = $(this).parents('.edit-project-title');
    _this.hide();
    _this.next('.save-project-title').show();
    var titleContent = _this.find('p').text();
    _this.next('.save-project-title').children('textarea').val(titleContent);
});

// Save Summary Content
$('.save-project-title button').click(function () {
    var _this = $(this).parents('.save-project-title');
    _this.hide();
    _this.prev('.edit-project-title').show();
    var inputContent = _this.children('textarea').val();
    _this.prev('.edit-project-title').find('p').text(inputContent);
});

if ($("#activitySummary").length > 0) {
    $("#activitySummary").tablesorter({
        headers: {
            0: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
            1: { sorter: false },
            2: { sorter: false },
            3: { sorter: false },
            4: { sorter: false },
            5: { sorter: false },
            6: { sorter: false },
            7: { sorter: false }
        }
    });
}

function projectSearches() {
    $('#projectSearches #sort-wrapper tr').removeClass('tr-first tr-last');

    $('#projectSearches #sort-wrapper tr:first').addClass('tr-first');
    $('#projectSearches #sort-wrapper tr:last').addClass('tr-last');
}

$('#projectSearches').on('click', '#sort-header .custom-input', function () {
    var tableId = '#projectSearches';
    if ($(this).prop('checked') == true) {
        var countTotal = 0;
        $('#projectSearches #sort-wrapper tr').each(function() {
            $(this).find('.custom-input').prop('checked', true);
            countTotal = countTotal + 1;
        });

        if (countTotal > 1) {
            $(tableId).parent().find('.combine-selected').children('.radio-listing').show();
            $(tableId).parent().find('.combine-selected').children('span').hide().next('a').show();
            //$('#projectSearches #sort-wrapper tr td.td-fourth').children('.dropdown').show()
        }
    } else {
        $('#projectSearches #sort-wrapper tr').each(function() {
            $(this).find('.custom-input').prop('checked', false);
            $(tableId).parent().find('.combine-selected').children('.radio-listing').hide();
            $(tableId).parent().find('.combine-selected').children('span').show().next('a').hide();
            //$('#projectSearches #sort-wrapper tr td.td-fourth').children('.dropdown').hide()
        });
    }
});

if ($("#projectSearches").length > 0) {
    $("#projectSearches").tablesorter({
        headers: {
            0: { sorter: false },
            1: { sorter: false },
            2: { sorter: false },
            3: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
            4: { sorter: false },
            5: { sorter: false },
            6: { sorter: false },
            7: { sorter: false }
        }
    });
}

$("#projectSearches").bind("sortEnd", function () {
    projectSearches();
});

$('#projectSearches .dropdown-toggle').click(function () {
    $(this).parent().parent().parent().parent().find("tr").css({ 'z-index': 0, 'position': 'relative' });
    $(this).parent().parent().parent().css({ 'z-index': 1, 'position': 'relative' });
});

function checkboxSeclection1() {
    var countSelection = 0;
    var countTotal = 0;
    $('#projectSearches #sort-wrapper tr').each(function () {
        if ($(this).find('.custom-input').prop('checked') == true) {
            flag = true;
            countSelection = countSelection + 1;
        }
        countTotal = countTotal + 1;
    });

    if (countSelection >= 2) {
        $('.combine-selected').children('span').hide().next('a').show();
        $('.combine-selected').children('.radio-listing').show();
    } else {
        $('.combine-selected').children('span').show().next('a').hide();
        $('.combine-selected').children('.radio-listing').hide();

    }

    //Set select all checkbox to true if all checkboxes are checked and to false if one of the checkbox is uncheck    
    if (countSelection < countTotal) {
        $('#projectSearches').find('#sort-header .custom-input').prop('checked', false)
    }
    else if (countSelection = countTotal) {
        $('#projectSearches').find('#sort-header .custom-input').prop('checked', true)
    }
}

$('#projectSearches').find('#sort-wrapper tr').each(function () {
    var tableId = '#projectSearches';
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

//mysearches.html > Click on checkbox
$('#projectSearches').on('click', '#sort-wrapper tr .custom-input', function () {
    if ($(this).prop('checked') == true) {
        $(this).parents('td').siblings('.td-fourth').children('.dropdown').show();

        checkboxSeclection1();

    } else {
        $(this).parents('td').siblings('.td-fourth').children('.dropdown').hide();

        checkboxSeclection1();
    }
});

$('.show-Refinement').click(function () {
    $(this).prev('.refinement-detail').slideToggle('slow');

    if ($(this).text() == "Show less") {
        $(this).text('Show more');
    } else {
        $(this).text('Show less');
    }
});

function projectRecords() {
    $('#projectRecords #sort-wrapper tr').removeClass('tr-first tr-last');

    $('#projectRecords #sort-wrapper tr:first').addClass('tr-first');
    $('#projectRecords #sort-wrapper tr:last').addClass('tr-last');
}

$('#projectRecords').on('click', '#sort-header .custom-input', function () {
    if ($(this).prop('checked') == true) {
        $('#projectRecords #sort-wrapper tr').each(function() {
            $(this).find('.custom-input').prop('checked', true);
            $('.combine-selected').children('span').hide().next('a').show();
            $('.combine-selected').children('.radio-listing').show();
            $('#projectRecords #sort-wrapper tr td.td-fourth').children('.dropdown').show()
        });

    } else {
        $('#projectRecords #sort-wrapper tr').each(function() {
            $(this).find('.custom-input').prop('checked', false);
            $('.combine-selected').children('span').show().next('a').hide();
            $('.combine-selected').children('.radio-listing').hide();
            $('#projectRecords #sort-wrapper tr td.td-fourth').children('.dropdown').hide();
        });
    }
});

if ($("#projectRecords").length > 0) {
    $("#projectRecords").tablesorter({
        headers: {
            0: { sorter: false },
            1: { sorter: false },
            2: { sorter: "shortDate", dateFormat: "dd MMM yyyy" },
            3: { sorter: false },
            4: { sorter: false },
            5: { sorter: false },
            6: { sorter: false },
            7: { sorter: false }
        }
    });
}

$("#projectRecords").bind("sortEnd", function () {
    projectRecords();
});

$(document).ready(function() {
    $("input.project-list-select").change(function () {
        var checkBoxSelected = this.checked;
        var dataIdAttr = $(this).parent().attr("data-id");
        $("div[data-id = '" + dataIdAttr + "'] input[type='checkbox'].project-list-select").prop('checked', checkBoxSelected);

        var tableId = '#' + $(this).closest('table#myproject').attr("id");
        var countSelection = 0;
        var countTotal = 0;
        $(tableId).find('#sort-wrapper tr').each(function () {
            if ($(this).find('.custom-input').prop('checked') === true) {
                //flag = true;
                countSelection = countSelection + 1;
            }
            countTotal = countTotal + 1;
        })
        //Set select all checkbox to true if all checkboxes are checked and to false if one of the checkbox is uncheck    
        if (countSelection < countTotal) {
            $(tableId).find('#cbMyProjectsTableViewSelectAll').prop('checked', false)
        }
        else if (countSelection = countTotal) {
            $(tableId).find('#cbMyProjectsTableViewSelectAll').prop('checked', true)
        }

    });

    $("#cbMyProjectsTableViewSelectAll").change(function() {
        var selected = this.checked;
        $("input[type='checkbox'].project-list-select").each(function() {
            $(this).prop('checked', selected);
        });
    });
})