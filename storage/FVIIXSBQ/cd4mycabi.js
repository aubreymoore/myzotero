// This file is for the re-written MyCABI

// var cd4 = {}; // This is now in CD4.master to make it widely available.

$(document).ready(function () {

    /*var cd4 = {
        execStack: [], // Stack of methods to be executed in sequence
        execIndex: 0, // Stack index: Next method to be executed
        //args: {}, // Current function arguments
        selectedProj: null, // User-Selected Project
        projects: null, // User's projects: Array of name, id (ML urn)
        records: null, // Array of record PANs(?) selected by user checkboxes
        searches: null, // Array of search URLs (?) either selected by user in checkboxes, or the single search results page search
        userId: '', // MyCabi user ID - GUID
        userMsg: '', // Information Message shown to user, such as "You have elected to save 9 records"
        userErr: '', // Error message shown to user, such as "Login failed"
        cancelMsg: '', // Message shown to user if they elect to cancel the operation
    }; // Data set by user actions or page load.
     */

    $('#ulExportMechanism input[type=radio]').change(function () {
        cd4.userPrefs.downloadTarget = $(this).val();
        cd4.exportMechanismChange();
    });

    // Constants:
    cd4.ajaxUrl = '/cabdirect/utility/cd4mycabiajaxhandler/';

    cd4.userPrefs = JSON.parse($('#cd4LoadedUserPrefs').text());

    cd4.reset = function () { // Reset everything - variables and UI. Don't reset persistent data which can be got on page load, eg User ID
        console.log('reset()');
        cd4.execStack = null;
        cd4.execIndex = -1;
        //cd4.args = ;
        cd4.selectedProj = null;
        cd4.projects = null;
        cd4.records = null;
        cd4.searches = null;
        cd4.limitChecked = null;
        cd4.userMsg = '';
        cd4.userErr = '';
        cd4.cancelMsg = '';
        cd4.showDiv();
    };

    cd4.initStack = function (newStack, divToShow) {
        cd4.execStack = newStack;
        cd4.execIndex = 0;
        cd4.showDiv(divToShow);
    };

    cd4.loadAnnotationTool = function (firstCall, type, userHasBeenLoggedIn) {
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected records
        cd4.cancelMsg = function () {
            return "Cancel using the Annotations toolbar?";
        };
        if (!cd4.loggedIn()) {
            cd4.initStack([
                { f: 'showLogin' },
                { f: 'loadAnnotationTool', args: [false, type, true] }
            ]);
            cd4.execStep();
        } else if (cd4.records == null) {
            cd4.initStack([
                { f: 'getSelectedRecords' },
                { f: 'loadAnnotationTool', args: [false, type, userHasBeenLoggedIn] }
            ]);
            cd4.execStep();
        } else {
            cd4.initStack([
                { f: 'executeAnnotationClick', args: [type, userHasBeenLoggedIn] }
            ]);
            cd4.execStep();
        }

    };

    cd4.executeAnnotationClick = function (type, userWasLoggedIn) {

        if (userWasLoggedIn !== 'undefined' && userWasLoggedIn) {
            if (typeof (Storage) !== "undefined") {
                sessionStorage.setItem('annotatorLoad', type);
            }

            if (cd4.records !== null) {
                cd4.initStack([
                    { f: 'saveRecordsToDb', args: [true] },
                    { f: 'refreshPage', args: [true] }
                ]);

                cd4.execStep();
            } else {
                cd4.refreshPage(true);
            }


        } else {
            if (type === "annotation") {
                if (jQuery.isFunction(loadAnnotatorTool)) {
                    loadAnnotatorTool($('.project-action-list li a.Annotate'));
                }
            } else {
                if (jQuery.isFunction(loadHighlightsTool)) {
                    loadHighlightsTool($('.project-action-list li a.Highlight'));
                }
            }

            if (cd4.records !== null) {
                cd4.saveRecordsToDb(true);
            }
        }
    }

    cd4.saveRecords = function (firstCall) { // Fired when user clicks Save toolbar button
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected records
        cd4.cancelMsg = function () {
            if (cd4.records) return "Cancel saving " + cd4.records.length + " record" + (cd4.records.length > 1 ? 's' : '') + "?";
            else return "Cancel saving selected records?";
        };
        if (!cd4.loggedIn()) {
            cd4.initStack([
                { f: 'showLogin' },
                { f: 'saveRecords' },
            ]);
            cd4.execStep();
        }
        else if (cd4.records == null) {
            cd4.initStack([
                { f: 'getSelectedRecords' },
                { f: 'saveRecords' },
            ]);
            cd4.execStep();
        }
        else if (cd4.projects == null) {
            cd4.initStack([
                { f: 'getUserProjects' },
                { f: 'saveRecords' },
            ]);
            cd4.execStep();
        }
        else { // At this point we have all the info we need to generate
            // cd4.projects = []; // TEST - REMOVE
            var elected = '<p>You have elected to save ' + cd4.records.length + ' record' + (cd4.records.length > 1 ? 's' : '') + '.</p>';
            //cd4.bindButtons([{ css: '#divCd4ConfirmAction .cd4OkButton', func: 'cd4.saveRecordsToDb()' }])
            if (cd4.projects.length == 0)
                cd4.initStack([ // This should be generated conditionally, based on the known conditions.
                    { f: 'showConfirmation', args: [null, elected] },
                    { f: 'saveRecordsToDb', args: [true] },
                    { f: 'recordsSaved' },
                    { f: 'reset' },
                ]);
            else {
                cd4.bindButtons([{ css: '#modal-addproject .cd4-button-ok', func: 'cd4.saveSelectedProj(true)' }]);
                cd4.initStack([ // This should be generated conditionally, based on the known conditions.
                    {
                        f: 'showProjPicker', args: ['Confirm action',
                            elected + '<p>You can also add the selected records to a project.</p><h5>Select a project to add records to:</h5>'
                        ]
                    },
                    { f: 'saveRecordsToDb', args: [true] },
                    { f: 'recordsSaved' },
                    { f: 'reset' },
                ]);
            }
            cd4.execStep();
        }
    };

    cd4.saveSearches = function (firstCall, currentSearch) { // Fired when user clicks Save Search button on Search Results page, or saving multiple searches from Search History page.
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected searches
        cd4.cancelMsg = function () {
            if (cd4.searches) return "Cancel saving " + cd4.searches.length + " searches?";
            else return "Cancel saving selected searches?";
        };
        if (!cd4.loggedIn()) {
            cd4.initStack([
                { f: 'showLogin' },
                { f: 'saveSearches', args: [false, currentSearch] },
            ]);
            cd4.execStep();
        }
        else if (!cd4.searches) {
            cd4.initStack([
                { f: 'getSelectedSearches', args: [currentSearch] },
                { f: 'saveSearches' },
            ]);
            cd4.execStep();
        }
        else if (!cd4.projects) {
            cd4.initStack([
                { f: 'getUserProjects' },
                { f: 'saveSearches' },
            ]);
            cd4.execStep();
        }
        else { // At this point we have all the info we need to generate messages and the rest of the execution sequence
            var elected = '<p>You have elected to save ' + cd4.searches.length + ' search' + (cd4.searches.length > 1 ? 'es' : '') + '.</p>';
            if (cd4.projects.length == 0)
                cd4.initStack([
                    { f: 'showConfirmation', args: [null, elected] },
                    { f: 'saveSearchesToDb', args: [true] },
                    { f: 'searchesSaved' },
                    { f: 'reset' },
                ]);
            else {
                cd4.bindButtons([{ css: '#modal-addproject .cd4-button-ok', func: 'cd4.saveSelectedProj(true)' }]);
                //cd4.bindButtons([{ css: '#divCd4NewProj .cd4CancelButton', func: 'cd4.showProjPicker()' }])
                cd4.initStack([
                    {
                        f: 'showProjPicker', args: ['Confirm action',
                        elected + '<p>You can also add the selected searches to a project.</p><h5>Select a project to add searches to:</h5>'
                        ]
                    },
                    // { f: 'saveSearchesToDb', args: [true, function() {return (cd4.selectedProj ? cd4.selectedProj.id : null);} ] },
                    // The above won't work - it passes the function as the 2nd arg, it doesn't evaluate it.
                    { f: 'saveSearchesToDb', args: [true] },
                    { f: 'searchesSaved' },
                    { f: 'reset' },
                ]);
            }
            cd4.execStep();
        }
    };

    // Add Records to Project
    cd4.addRecordsToProject = function (firstCall) { // Fired when user clicks Add to Project button on Search Results page, or on Saved Searches
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected searches
        cd4.cancelMsg = function () {
            if (cd4.records) return "Cancel adding " + cd4.records.length + " records to a project?";
            else return "Cancel adding selected records to project?";
        };
        if (!cd4.loggedIn()) {
            cd4.initStack([
                { f: 'showLogin' },
                { f: 'addRecordsToProject' },
            ]);
            cd4.execStep();
        }
        else if (!cd4.records) {
            cd4.initStack([
                { f: 'getSelectedRecords' },
                { f: 'addRecordsToProject' },
            ]);
            cd4.execStep();
        }
        else if (!cd4.projects) {
            cd4.initStack([
                { f: 'getUserProjects' },
                { f: 'addRecordsToProject' },
            ]);
            cd4.execStep();
        }
        else { // At this point we have all the info we need to generate messages and the rest of the execution sequence
            //var elected = '<p>You have elected to save ' + cd4.searches.length + ' search' + (cd4.searches.length > 1 ? 'es' : '') + '.</p>';
            cd4.bindButtons([{ css: '#modal-addproject .cd4-button-ok', func: 'cd4.saveSelectedProj(false)' }]);
            cd4.initStack([
                { f: 'showProjPicker', args: ['Add to project', '<h5>Select a project to add record(s) to:</h5>', null, 'Add to project'] },
                {
                    f: 'showConfirmation', args: [null,
                        function () { return 'You have elected to save ' + cd4.records.length + ' record' + (cd4.records.length > 1 ? 's' : '') + ' to ' + cd4.selectedProj.name },
                    ]
                },
                { f: 'saveRecordsToDb' },
                { f: 'reset' },
            ]);
            cd4.execStep();
        }
    };

    // Add Searches to Project
    cd4.addSearchesToProject = function (firstCall, currentSearch) { // Fired when user clicks Add to Project button on Saved Searches
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected searches
        cd4.cancelMsg = function () {
            if (cd4.searches) return "Cancel adding " + cd4.searches.length + " searches to a project?";
            else return "Cancel adding selected searches to project?";
        };
        if (!cd4.loggedIn()) {
            cd4.initStack([
                { f: 'showLogin' },
                { f: 'addSearchesToProject', args: [false, currentSearch] },
            ]);
            cd4.execStep();
        }
        else if (!cd4.searches) {
            cd4.initStack([
                { f: 'getSelectedSearches', args: [currentSearch] },
                { f: 'addSearchesToProject' },
            ]);
            cd4.execStep();
        }
        else if (!cd4.projects) {
            cd4.initStack([
                { f: 'getUserProjects' },
                { f: 'addSearchesToProject' },
            ]);
            cd4.execStep();
        }
        else { // At this point we have all the info we need to generate messages and the rest of the execution sequence
            cd4.bindButtons([{ css: '#modal-createproject .cd4-button-cancel', func: 'cd4.showProjPicker()' }])
            cd4.initStack([
                { f: 'showProjPicker', args: ['Add to project', '<h5>Select a project to add search(es) to:</h5>'] },
                {
                    f: 'showConfirmation', args: [null,
                        function () {
                            return 'You have elected to save ' + cd4.searches.length + ' search' + (cd4.searches.length > 1 ? 'es' : '') + ' to ' + cd4.selectedProj.name;
                        },
                    ]
                },
                { f: 'saveSearchesToDb' },
                { f: 'reset' },
            ]);
            cd4.execStep();
        }
    };


    cd4.bindButtons = function (bindings) {
        $.each(bindings, function (i, v) {
            $(v.css).attr('onclick', v.func);
        });
    };

    // Initialize random data - for testing/simulation only
    //cd4.randInit = function () {
    //    //cd4.userId = (Math.random() > 0.3) ? 'gengiskhan' : null;
    //};

    cd4.execStep = function () { // execute next task on the list
        if (cd4.execStack[cd4.execIndex]) {
            var func = cd4.execStack[cd4.execIndex++];
            cd4[func.f].apply(this, func.args);
            //cd4[func.f]();
        }
    };

    cd4.showConfirmCancel = function () { // show cancel confirmation dialog
        $('#modal-confirm-cancel p.cd4-message').text(cd4.cancelMsg);
        cd4.showDiv('#modal-confirm-cancel');
    };

    cd4.cancelConfirmed = function () { // Called when user confirms he wants to cancel. Reset all.
        cd4.reset();
    };

    cd4.cancelReversed = function () { // Called when user hits Cancel but then changes his mind. Go back to previous step.
        cd4.userErr = '';
        cd4.execIndex -= 1;
        cd4.execStep();
    };

    cd4.abandonExecution = function (msg) { // Show message to user and reset screen. User cannot recover from this.
        cd4.execStack = [];
        //$('#modal-error div.popup-form p').text(msg);
        $('#modal-error div.popup-form p').html(msg); // using 'html' instead of 'text' allows me to insert <br>
        //$('#divCd4Abandon').show(200);
        cd4.showDiv('#modal-error');
        //alert(msg); // debug only
    };

    cd4.showMessage = function (msg, title) { // Show message to user and reset screen. User cannot recover from this.
        $('#modal-message div.popup-form p').text(msg);
        $('#modal-message h4').text((typeof title === 'undefined') ? "Success" : title);
        cd4.showDiv('#modal-message');
        //$('#divCd4Abandon').show(200);
        //cd4.showDiv(modalId);
        //alert(msg); // debug only
    };

    cd4.showDiv = function (divToShow) { // Show named popup, and hide all others. If no arg, hide all.
        var divs = ['#modal-print', '#modal-email', '#modal-download', '#modal-trash', '#modal-addproject', '#modal-createproject', '#modal-login',
        '#modal-error', '#modal-confirm', '#modal-confirm-cancel', '#modal-download', '#modal-message'];
        $.each(divs, function (i, v) {
            if (v != divToShow)
                //$(divs[i]).hide(200);
                $(v).modal('hide');
            //$(v).hide();
        });
        //$('body').removeClass('modal-open');
        //$('.overlay, .overlay-type').hide(); 
        //$('div.modal-backdrop').hide();
        //$('#modal-print').modal('show');
        if (divToShow) {
            $(divToShow).modal('show');
            //$(divToShow).show();
            //$('body').addClass('modal-open');
            setTimeout(function () { $('body').addClass('modal-open'); }, 700);
        }
    };


    cd4.getUserProjects = function () { // Get user's projects from server
        cd4.projects = []; // change from null to avoid infinite loop if this func blows up
        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            //data: { "methodData": { method: "getUserProjects" } }, // blows up server-side
            data: { methodData: JSON.stringify({ method: "getUserProjects" }), excludedProject: getParameterByName('project') },
            success: function (data) {
                //console.log("getUserProjects response: " + data); // data is JSON
                try {
                    cd4.projects = JSON.parse(data);
                    console.log("getUserProjects(): user has " + cd4.projects.length + " projects");
                    cd4.execStep(); // Execute next command
                }
                catch (err) {
                    cd4.abandonExecution("Error - garbled server response");
                }
            },
            error: function (xhr, ts, et) { // eg. if the AJAX server can't be contacted or user not logged in
                // Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
                console.log("POST to " + cd4.ajaxUrl + " failed: ts: " + ts + ", et: " + et);
                cd4.abandonExecution("Error - unable to get project data");
            }
        });
    };

    cd4.refreshPage = function (forceGet) {
        console.log("reloading page.");
        location.reload(forceGet);
    }


    cd4.getSelectedRecords = function ( allowNoSelection ) { // Store user selected records in cd4.records array
        cd4.records = [];
        console.log('getSelectedRecords()');
        //change to select records from Search results and abstract page.
        $('div.active div.cd4-content-entry-list input:checkbox, div.record-detail span.cd4-record-url').each(function (i, e) { // iterate all the input checkbox fields in the search results list. 'i' is the iterator count, 'e' is the element.
            if ($(e).is(':checked') || $(e).is('span')) {
                var url = $(e).attr('data-cd4recordurl');
                if (url) // eg "/cabdirect/abstract/20163008776"
                    cd4.records.push(url);
            }
        });

        if (!allowNoSelection && cd4.records.length == 0) { // should be managed in this func
            cd4.abandonExecution("No records selected. Please select one or more records first.");
        }
        cd4.execStep();
    };

    cd4.getSelectedSearches = function (currentSearch) { // Store user selected searches in cd4.searches array
        console.log('getSelectedSearches()');
        //if (Math.random() > 0.2)
        //    cd4.searches = ['dog AND cat', 'banyan', 'tractor AND 3-point linkage'];
        //else
        //    cd4.searches = [];
        cd4.searches = [];
        if (currentSearch) {
            var num = $("#cd4NumberOfSearchResults").text();
            var dt = $("#cd4DateTimeOfSearch").text();
            cd4.searches = [{ qy: encodeURI(decodeURIComponent(window.location.href)), ct: num, dt: dt }];
        }
        else {
            // cd4.searches =[];
            if ($('#saved-searches').hasClass('active')) {
                $('div.cd4-saved-searches-list').find('#sort-wrapper input:checkbox').each(function (i, e) { // iterate all the input checkbox fields in the search results list. 'i' is the iterator count, 'e' is the element.
                    if ($(e).is(':checked')) {
                        var url = window.location.origin + $(e).attr('data-url');
                        console.log(url);
                        var ct = $(e).attr('data-resultCount');
                        var dt = $(e).attr('data-dateAdded');
                        var id = $(e).attr('data-id');
                        if (url) // eg "/cabdirect/abstract/20163008776"
                            cd4.searches.push({ qy: encodeURI(decodeURIComponent(url)), ct: ct, dt: dt, id: id, });
                    }
                });
            } else if ($('#recent-searches').hasClass('active')) {
                $('div.cd4-recent-searches-list').find('#sort-wrapper input:checkbox').each(function (i, e) { // iterate all the input checkbox fields in the search results list. 'i' is the iterator count, 'e' is the element.
                    if ($(e).is(':checked')) {
                        var url = window.location.origin + $(e).attr('data-url');
                        console.log(url);
                        var ct = $(e).attr('data-resultCount');
                        var dt = $(e).attr('data-dateAdded');
                        if (url) // eg "/cabdirect/abstract/20163008776"
                            cd4.searches.push({ qy: encodeURI(decodeURIComponent(url)), ct: ct, dt: dt, });
                    }
                });
            }
        }
        if (cd4.searches.length == 0) { //
            cd4.abandonExecution("No searches selected. Please select one or more searches first.");
        }
        cd4.execStep();
    };


    cd4.getSelectedSearches1 = function () { // Store user selected searches in cd4.searches array
        //console.log('getSelectedSearches()');
        //if (Math.random() > 0.2)
        //    cd4.searches = ['dog AND cat', 'banyan', 'tractor AND 3-point linkage'];
        //else
        //    cd4.searches = [];
        cd4.searches = [];
        console.log('getSelectedSearches()');
        $('div.cd4-saved-searches-list input:checkbox').each(function (i, e) { // iterate all the input checkbox fields in the search results list. 'i' is the iterator count, 'e' is the element.
            if ($(e).is(':checked')) {
                var url = window.location.origin + $(e).attr('data-url');
                console.log(url);
                var ct = $(e).attr('data-resultCount');
                var dt = $(e).attr('data-dateAdded');
                if (url) // eg "/cabdirect/abstract/20163008776"
                    cd4.searches.push({ qy: encodeURI(url), ct: ct, dt: dt, });
            }
        });
        if (cd4.searches.length == 0) { //
            cd4.abandonExecution("No searches selected. Please select one or more searches first.");
        }
        cd4.execStep();
    };

    cd4.showLogin = function () { // Show login dialog, if not logged in
        console.log('showLogin()');
        console.log('Already logged in? ' + Boolean(cd4.loggedIn()));
        if (cd4.loggedIn()) {
            cd4.execStep(); // no user interation required
            return;
        }
        //$('#divCd4Login span.cd4userErr').text(cd4.userErr);
        $('#modal-login div.cd4-error').css("visibility", "hidden");
        //var user = $('input:text[name="cd4LoginUser"]').val('');
        //var pass = $('input:password[name="cd4LoginPass"]').val('');
        cd4.showDiv('#modal-login');
    };


    cd4.cancelAction = function () { // Called when user initially cancels an action, such as a save
        // Set messages
        if (!cd4.cancelMsg)
            cd4.cancelMsg = "Cancel action?";
        cd4.showConfirmCancel();
    };


    cd4.showProjPicker = function (title, userMessage, bypassIfNoProjects, okButtonText) { // Show project picker dialog
        //console.log("User has " + cd4.projects.length + " projects");
        // Show dialog?
        if (cd4.projects.length == 0 && bypassIfNoProjects) { // not currently used
            cd4.execStep(); // no user interation required
            return;
        }
        $('#modal-addproject h4').text(title ? title : 'Add to project');
        if (cd4.projects.length > 0) {
            //$('#modal-addproject > div.cd4SelectProj').show();
            //$('#modal-addproject > div.cd4NoProjects').hide();
            $('#modal-addproject .cd4userMsg').html(userMessage ? userMessage : '<h5>Select project:</h5>');
            $('#modal-addproject .cd4-button-ok').html(okButtonText ? okButtonText : 'OK');
            $('#modal-addproject div.cd4-project-dd strong').text('Select project');
            $('#modal-addproject ul.dropdown-menu').empty();
            $('#modal-addproject ul.dropdown-menu').append('<li><a href="javascript:;" onclick="cd4.projectDDHandler(\'(none)\')">(none)</a></li>');
            for (var i = 0; i < cd4.projects.length; i++)
                $('#modal-addproject ul.dropdown-menu').append('<li><a href="javascript:;" onclick="cd4.projectDDHandler(\'' + cd4.projects[i].name + '\', \'' + cd4.projects[i].id + '\')">' + cd4.projects[i].name + '</a></li>');
        }
        else {
            //$('#modal-addproject > div.cd4SelectProj').hide();
            //$('#modal-addproject > div.cd4NoProjects').show();
        }
        cd4.showDiv('#modal-addproject');
    };

    cd4.projectDDHandler = function (name, id) { // Handle select-project dropdown, which is a <ul> instead of a <select>
        // cd4-project-dd
        $('#modal-addproject div.cd4-project-dd strong').text(name);
        if (id)
            cd4.selectedProj = { name: name, id: id };
        else
            cd4.selectedProj = null;
        var i = 1;
    };

    cd4.saveSelectedProj = function (allowNullProject) { // Called when the user clicks OK after optionally selecting a project
        //cd4.selectedProj = // done by cd4.projectDDHandler
        if ((!allowNullProject) && (cd4.selectedProj == null))
            cd4.abandonExecution("Error - Project required");
        cd4.execStep();
    };

    cd4.showNewProj = function () { // Show New Project dialog
        var initProjName = "Project";
        var cnt = 1;
        var defaultProjName = "Project" + " " + cnt.toString();
        if (cd4.projects) {
            for (var i = 1; i <= cd4.projects.length; i++) {
                if (cd4.projects[i - 1].name == defaultProjName) {
                    cnt++;
                    defaultProjName = initProjName + " " + cnt.toString();
                    i = 0;
                    continue;
                }
            }
        }
        $('#modal-createproject input#newProjName').val(defaultProjName);
        $('#modal-createproject').find('div.field-validation-error').hide();
        $('#modal-createproject').find('div.project-already-exists').hide();
        cd4.showDiv('#modal-createproject');
    }

    cd4.createProj = function () { // Create new project
        console.log("createProj()");
        $('#modal-createproject').find('div.field-validation-error').hide();
        $('#modal-createproject').find('div.project-already-exists').hide();
        var name = $('#modal-createproject input:text[name="newProjName"]').val();
        var desc = $('#modal-createproject textarea[name="newProjDesc"]').val();

        if (!name.trim()) {
            $('#modal-createproject').find('div.field-validation-error').show();
            return;
        }

        if (cd4.projects) {
            for (var i = 1; i <= cd4.projects.length; i++) {
                if (cd4.projects[i - 1].name == name) {
                    $('#modal-createproject').find('div.project-already-exists').show();
                    return;
                }
            }
        }

        var i = 1;
        // AJAX call here
        var mdata = { method: "createProject", name: name, desc: desc };
        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            data: { methodData: JSON.stringify(mdata) },
            success: function (data) {
                console.log("createProj() success. Response: " + data);
                try {
                    var rspData = JSON.parse(data);
                    console.log("createProj(): new proj id: " + rspData.id);
                    cd4.selectedProj = { name: name, id: rspData.id };
                    cd4.execStep(); // Execute next command
                }
                catch (err) {
                    cd4.abandonExecution("Error - garbled server response");
                }
            },
            error: function (xhr, ts, et) { // eg. if the AJAX server can't be contacted or user not logged in
                console.log("POST to " + cd4.ajaxUrl + " failed: status: " + ts + ", error: " + et);
                cd4.abandonExecution("Error - unable to create new project");
            }
        });
    }

    cd4.showConfirmation = function (title, userMessage) { // Show final confirmation before executing action
        $('#modal-confirm h4').text(title ? title : 'Confirm action');
        $('#modal-confirm .cd4-message').html(userMessage ? userMessage : 'Confirm action');
        cd4.showDiv('#modal-confirm');
    };

    cd4.actionConfirmed = function () { // Called when the user has finally confirmed. Hide the dialog and execute the requested action
        cd4.execStep();
    };

    cd4.saveRecordsToDb = function (saveToSIP) { // Save the selected records to the nominated project
        console.log("Saving records to DB");
        var mdata = { method: "saveRecordsToDb" };
        mdata.saveToSIP = saveToSIP; // Save to Saved Items Project?
        if (cd4.selectedProj != null)
            mdata.projectId = cd4.selectedProj.id;
        mdata.records = cd4.records;
        var i = 1;
        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            data: { methodData: JSON.stringify(mdata) },
            success: function (data) {
                console.log("saveRecordsToDb() success. Response: " + data); // data is JSON // no response data expected.
                //cd4.recordsSaved(); // Am calling directly - could be in ExecStack instead, but I think it will only be called from here.
                cd4.execStep();
            },
            error: function (xhr, ts, et) { // eg. if the AJAX server can't be contacted or user not logged in
                console.log("POST to " + cd4.ajaxUrl + " failed: status: " + ts + ", error: " + et);
                cd4.abandonExecution("Error - unable to save records");
            }
        });
    };

    cd4.recordsSaved = function () { // Update the "saved" icons on the content entry list - assume all cd4.records have been saved OK
        console.log("recordsSaved()");
        $.each(cd4.records, function (i, v) {
            var chk = $('div.cd4-content-entry-list input:checkbox[data-cd4recordurl="' + v + '"]');
            var span = chk.parent().children('span').last();
            span.empty(); // remove hangover mycabi.proc link, not wanted on CD4
            span.attr("class", "icon-icon_saved push-left-4");
            // Change the URL on the Saved Records button so that it reloads
            // <li><a href="#saved-records" id="cd4-saved-records-button">Saved records</a></li>
        });
        // Saved Records is now dirty, so force page to be reloaded.
        $('#cd4-saved-records-button').attr('data-cd4-allow-default', '1'); // Bypass switch-tab behaviour
        $('#cd4-saved-records-button').attr('onclick', 'window.location.replace("/savedrecords/");'); // This is a redirect node
        cd4.execStep();
    };


    cd4.saveSearchesToDb = function (addToSaved) { // Save the search to "saved searches" and/or to the nominated project
        console.log("Saving searches to DB");
        var mdata = {
            method: "saveSearches", addtosaved: addToSaved, project: (cd4.selectedProj ? cd4.selectedProj.id : null),
            searches: cd4.searches
        };
        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            data: {
                methodData: JSON.stringify(mdata)
            },
            success: function () {
                console.log("saveCurrentSearch succeeded");
                cd4.execStep();
            },
            error: function () {
                console.log("saveCurrentSearch failed");
                cd4.abandonExecution("Error - unable to save searches");
            },
        });
    };


    cd4.searchesSaved = function () { // Tidy UI after saving searches
        // Saved Searches is now dirty, so force page to be reloaded.
        $('#cd4-saved-searches-button').attr('data-cd4-allow-default', '1'); // Bypass switch-tab behaviour
        $('#cd4-saved-searches-button').attr('onclick', 'window.location.replace("/savedsearches/");'); // This is a redirect node
        cd4.execStep();
    }


    cd4.downloadFormatDDHandler = function (elem) { // Handle download dropdown
        var format = $(elem).text();
        $('#modal-download div.dropdown strong').text(format);
        cd4.userPrefs.format = format;
    };


    cd4.downloadRecords = function (firstCall) {
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected records
        if (cd4.records == null) {
            cd4.initStack([
                { f: 'getSelectedRecords', args: [true] },
                { f: 'downloadRecords' },
            ]);
        }
            //else if (cd4.limitChecked == null) {
            //    cd4.initStack([
            //        { f: 'chkLimitReached' },
            //        { f: 'downloadRecords' },
            //    ]);
            //}
        else { // At this point we have all the info we need 
            cd4.initStack([
                { f: 'showDownloadPopup', args: [] },
                //{ f: 'executeDownload', args: [] },
                //{ f: 'reset' }
            ]);
        }
        cd4.execStep();
    };

    cd4.showDownloadPopup = function () {
        $("input:radio[name=rbDownload][value=" + cd4.userPrefs.portions + "]").prop('checked', 'checked');
        if (cd4.userPrefs.format)
            $('#modal-download div.dropdown strong').text(cd4.userPrefs.format);
        $("input:radio[name=rbExportMechanism][value=" + cd4.userPrefs.downloadTarget + "]").prop('checked', 'checked');
        cd4.exportMechanismChange();
        cd4.showDiv('#modal-download');
        // Hide Range option if in a Project
        //var reProjFilter = new RegExp("/cabdirect/myrecords/\\?projectId=", "i");
        //var reProjPage = new RegExp("/cabdirect/myprojects/project\\?project=", "i");
        //if (window.location.href.match(reProjFilter) || window.location.href.match(reProjPage)) {
        //    $(".cd4-export-range-selector").hide();
        //}
    };

    cd4.exportMechanismChange = function () { // Called on popup switch between Download and RefWorks
        if (cd4.userPrefs.downloadTarget == 'RefWorks') {
            cd4.downloadFormatDDHandler(document.getElementById('hlRisSelect'));
            $('#divDropDownFormat,#cd4ExportHighlightInfo,#cd4ExportFormatTitle').hide();
            cd4.initStack([
                { f: 'executeExportToRefWorks', args: [] },
                { f: 'reset' }
            ], '#modal-download');
        } else if (cd4.userPrefs.downloadTarget == 'DownloadFile') {
            $('#divDropDownFormat,#cd4ExportHighlightInfo,#cd4ExportFormatTitle').show();
            cd4.initStack([
                { f: 'executeDownload', args: [] },
                { f: 'reset' }
            ], '#modal-download');
        }
    };

    cd4.chkLimitReached = function () { // Check if user is passing their download limit
        cd4.limitChecked = true; // change from null to avoid infinite loop if this func blows up
        var mdata = cd4.generateDownloadRequestData("chkLimitReached");
        // Make AJAX call
        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            data: {
                methodData: JSON.stringify(mdata)
            },
            success: function (data) {
                var lrData = JSON.parse(data); // see C# CheckLimitReached() for definition
                if (lrData.canExport) {
                    cd4.execStep();
                }
                else if (lrData.userMessage) {
                    cd4.abandonExecution(lrData.userMessage);
                }
                else if (lrData.remainingAllowance > 0) {
                    cd4.abandonExecution("This would take you past the export limit of " + lrData.totalAllowance +
                        ".<br/>You may export up to " + lrData.remainingAllowance + " more record(s).");
                }
                else {
                    cd4.abandonExecution("You have reached the export limit of " + lrData.totalAllowance);
                }
            },
            error: function () {
                cd4.abandonExecution("Error - garbled server response");
            },
        });
    };


    cd4.executeDownload = function () { // Send download request to AJAX handler
        var mdata = cd4.generateDownloadRequestData("downloadRecords");
        cd4.userPrefs.portions = $("#modal-download input:radio[name='rbDownload']:checked").val();

        $.fileDownload(cd4.ajaxUrl, {
            httpMethod: "POST",
            data: {
                methodData: JSON.stringify(mdata),
                userPrefs: JSON.stringify(cd4.userPrefs)
            },
        })
            .done(function () {
                console.log('Export succeeded');
                // cd4.abandonExecution('Export succeeded but ...');
                cd4.reset();
            })
            .fail(function () { cd4.abandonExecution('Export failed'); }); // this isn't firing - maybe try try/catch
    };

    cd4.generateDownloadRequestData = function (methodName) { // Method data for 2 Ajax calls - executeDownload and chkLimitReached 
        var items = [{ type: "AbstractMarkLogic", itemUrls: cd4.records }];
        var recSrc = $("#modal-download input:radio[name='rbExportRange']:checked").val();
        var numRng = $("#modal-download input:text[name='rbExportNumberedRange']").val();
        var pgSrc = 'unknown';
        // Get the requesting page
        var mobileUrlSegement = cd4.isMobileSite ? "/mobile" : "";
        var baseUrl = "/cabdirect" + mobileUrlSegement;
        var reSearch = new RegExp(baseUrl + "/search/", "i");
        var reSaved = new RegExp(baseUrl + "/myrecords/.*#saved-records-nav$", "i");
        var reProjSaved = new RegExp(baseUrl + "/myprojects/project", "i");
        var reSelected = new RegExp(baseUrl + "/myrecords/", "i");
        if (window.location.href.match(reSearch)) pgSrc = "SearchResults";
        else if (window.location.href.match(reSaved)) pgSrc = "SavedRecs"; // Do the more specific match first
        else if (window.location.href.match(reProjSaved)) pgSrc = "SavedRecs";
        else if (window.location.href.match(reSelected)) pgSrc = "SelectedRecs";
        // Create the method data object
        var mdata = { method: methodName, items: items, recordSource: recSrc, pageSource: pgSrc, numberRange: numRng, pageUrl: window.location.href };
        console.log(mdata);
        return mdata;
    }

    cd4.executeExportToRefWorks = function () {
        var mdata = cd4.generateDownloadRequestData("downloadRecords");
        cd4.userPrefs.portions = $("#modal-download input:radio[name='rbDownload']:checked").val();

        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            data: {
                methodData: JSON.stringify(mdata),
                userPrefs: JSON.stringify(cd4.userPrefs)
            },
            success: function (data) {
                console.log("exportToRefWorks() success. Response: " + data); // data is JSON // no response data expected.
                //dynamically build a form and post it to RefWorks, as per http://www.refworks.com/directexport.htm

                var form = $(document.createElement('form'));
                $(form).attr("name", "ExportRWForm");
                $(form).attr("target", "RefWorksMain");
                $(form).attr("action", "http://www.refworks.com/express/ExpressImport.asp?vendor=CAB%20Direct&filter=RIS%20Format&encoding=65001");
                $(form).attr("method", "POST");
                $(form).css("display", "none");

                var textAreaInput = $("<textarea>")
                .attr("name", "ImportData")
                .val(data);
                $(form).append($(textAreaInput));

                form.appendTo(document.body);
                $(form).submit();

                cd4.reset();
            },
            error: function (xhr, ts, et) { // eg. if the AJAX server can't be contacted or user not logged in
                console.log("POST to " + cd4.ajaxUrl + " failed: status: " + ts + ", error: " + et);
                cd4.abandonExecution('Export to ReportWorks failed');
            }
        });
    }

    cd4.emailRecords = function (firstCall) { // fired from email toolbar button
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected records
        if (cd4.records == null) {
            cd4.initStack([
                { f: 'getSelectedRecords' },
                { f: 'emailRecords' }
            ]);
        }
        else if (cd4.limitChecked == null) {
            cd4.initStack([
                { f: 'chkLimitReached' },
                { f: 'emailRecords' },
            ]);
        }
        else { // At this point we have all the info we need 
            cd4.initStack([
                { f: 'showEmailPopup', args: [] },
                { f: 'reset' }
            ]);
        }
        cd4.execStep();
    };

    cd4.printRecords = function (firstCall) { // fired from email toolbar button
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected records
        if (cd4.records == null) {
            cd4.initStack([
                { f: 'getSelectedRecords' },
                { f: 'printRecords' }
            ]);
        }
        else if (cd4.limitChecked == null) {
            cd4.initStack([
                { f: 'chkLimitReached' },
                { f: 'printRecords' },
            ]);
        }
        else { // At this point we have all the info we need 
            cd4.initStack([
                { f: 'showPrintPopup', args: [] },
                { f: 'reset' }
            ]);
        }
        cd4.execStep();
    };

    cd4.showPrintPopup = function () {
        $("input:radio[name=rbPortionsPrint][value=" + cd4.userPrefs.portions + "]").prop('checked', 'checked');
        cd4.showDiv('#modal-print');
    };

    cd4.executePrintRecords = function () { // Send download request to AJAX handler
        var items = [{ type: "AbstractMarkLogic", itemUrls: cd4.records }];
        var mdata = { method: "printRecords", items: items };
        cd4.userPrefs.portions = $("#modal-print input:radio[name='rbPortionsPrint']:checked").val();
        // Make AJAX call
        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            data: {
                methodData: JSON.stringify(mdata),
                userPrefs: JSON.stringify(cd4.userPrefs)
            },
            success: function (html) {
                console.log("print received OK");
                cd4.reset();
                html = JSON.parse(html);
                var printWindow = window.open();
                printWindow.document.open();
                printWindow.document.write(html);
                printWindow.document.close();
                printWindow.focus();

                window.printWindow = printWindow;

                setTimeout(function () {
                    console.log("printing out entry");
                    window.printWindow.print();
                    window.printWindow.close();
                    window.printWindow = null;
                }, 50);
            },
            error: function () {
                cd4.abandonExecution("Printing records failed");
            },
        });
        cd4.execStep();
    };

    cd4.showEmailPopup = function () {
        $("input:radio[name=rbPortions][value=" + cd4.userPrefs.portions + "]").prop('checked', 'checked');
        $("input:radio[name=rbDestination][value=" + cd4.userPrefs.destination + "]").prop('checked', 'checked');
        $("input:text[name=exportEmail]").val(cd4.userPrefs.exportEmail);
        cd4.showDiv('#modal-email');
    };

    cd4.executeEmailRecords = function () { // Send download request to AJAX handler
        var items = [{ type: "AbstractMarkLogic", itemUrls: cd4.records }];
        var mdata = { method: "emailRecords", items: items };
        cd4.userPrefs.portions = $("#modal-email input:radio[name='rbPortions']:checked").val();
        cd4.userPrefs.destination = $("#modal-email input:radio[name='rbDestination']:checked").val();
        cd4.userPrefs.exportEmail = $("#modal-email input:text[name='exportEmail']").val();
        // Make AJAX call
        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            data: {
                methodData: JSON.stringify(mdata),
                userPrefs: JSON.stringify(cd4.userPrefs)
            },
            success: function () {
                console.log("email sent OK");
                cd4.showMessage("Email has been sent to " + cd4.userPrefs.exportEmail);
            },
            error: function () {
                cd4.abandonExecution("Email send failed");
            },
        });
        cd4.execStep();
    };

    cd4.validateEmail = function ($entryDiv) {
        var $emailInput = $($entryDiv).find("input:text").first();
        var $validationMessageControl = $($entryDiv).find("div.field-validation-error");

        var emailToCheck = $emailInput.val();
        var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        $($emailInput).removeClass("incorrect");

        if (!reEmail.test(emailToCheck)) {
            console.log("validation failed");
            $($validationMessageControl).show();
            $($emailInput).addClass("incorrect");
        } else {
            console.log("validation passed");
            $($validationMessageControl).hide();
        }

        return reEmail.test(emailToCheck);
    };

    cd4.setupSearchesEmailAlert = function (firstCall, emailAlertCriteria) { // Fired when user clicks setup email-alerts on Saved searches page.
        if (firstCall) // If called from button click...
            cd4.reset(); // ...reset everything including user selections such as selected searches        
        if (!cd4.loggedIn()) {
            cd4.initStack([
                { f: 'showLogin' },
                { f: 'setupSearchesEmailAlert', args: [false, emailAlertCriteria] },
            ]);
            cd4.execStep();
        }
        else if (!cd4.searches) {
            cd4.initStack([
                { f: 'getSelectedSearches' },
                { f: 'setupSearchesEmailAlert', args: [false, emailAlertCriteria] },
            ]);
            cd4.execStep();
        }
        else {
            cd4.initStack([
                { f: 'saveSearchesEmailAlertToDb', args: [emailAlertCriteria] },
                //{ f: 'searchesEmailAlertsSaved' },
                //{ f: 'reset' },
            ]);
            cd4.execStep();
        }
    };

    cd4.saveSearchesEmailAlertToDb = function (emailAlertCriteria) { // set up the email alert for selected searches
        console.log("Saving searches emailAlert to DB");
        var mdata = {
            method: "setupSearchesEmailAlert",
            searches: cd4.searches
        };
        $.ajax({
            url: cd4.ajaxUrl,
            type: "POST",
            data: {
                methodData: JSON.stringify(mdata),
                emailAlertCriteria: emailAlertCriteria,
                project: getParameterByName('project')
            },
            success: function () {
                console.log("set up search email alert succeeded");
                cd4.searchesEmailAlertsSaved(emailAlertCriteria);
                //cd4.execStep();
            },
            error: function () {
                console.log("set up search email alert failed");
                cd4.abandonExecution("Error - unable to setup email alert");
            },
        });
    };

    cd4.searchesEmailAlertsSaved = function (emailAlertCriteria) { // Update the "email alert" icons on the saved searches list
        $.each(cd4.searches, function (i, v) {
            var chk = $('table#mySavedSearch input:checkbox[data-id="' + v.id + '"]');
            if (chk.length === 0)
                chk = $('table#projectSearches input:checkbox[data-id="' + v.id + '"]');
            var span = chk.closest('tr').find('span#emailalert');
            span.removeClass();
            if (emailAlertCriteria)
                span.attr("class", "icon-Icon_EmailAlerts");
        });
        if (emailAlertCriteria)
            cd4.showMessage("Weekly email alerts have been created for the selected search(es)");
        else
            cd4.showMessage("Email alerts have been removed from the selected search(es)");
        cd4.execStep();
    };


    cd4.reset();
    //cd4.randInit(); // for random behaviour testing only - remove for release
});
