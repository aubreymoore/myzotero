//The intention is to develop a OO framework for supporting the Javascript in the Research app.
//Backbone.js will be the model for architecture and coding style.
(function(){

    // Initial Setup
    // -------------

    // Save a reference to the global object (this is Window in the browser).
    var root = this;


    // The top-level namespace.
    var Research = root.Research = {};
    // "R" can be used as an alias for the Research object.
    var R = root.R = Research;

    R.settings = {
        truthyAssertions: false //Display successful assertions.
    };

    // A simple test utility.
    // NB. This will ultimately be replaced by Jasmine or an alternate unit testing framework.
    root.assert = function(test, desc){
        if( test && R.settings.truthyAssertions )
            console.log( "   success   : " + desc );
        else if( !test )
            console.log( "___FAILURE___: " + desc );
        return test; //This will allow using assert inside conditions.
    };

    assert( R === root.R && root.R === Research && Research === root.Research,
        "Research aliasing - All of the Research aliasses should reference the same object.");

    // Abstract Autocomplete
    // ---------------------

    // ***** This functionality is under development *****
    R.Autocomplete = function(elementId){
        //Private vars and methods
        var selectedAutocomplete = $(elementId).val(),
            fieldSelectors = {};

        var setFields = function(selectorsWithVals) {
            if(_.isUndefined( selectorsWithVals )) selectorsWithVals = {};
            
            var passedSelectors = _.map(selectorsWithVals, function(num, key){ return key; });
            _.each( fieldSelectors, function(val, key){
                if( _.include(passedSelectors, key).length === 1 )
                    $(key).val(selectorsWithVals[key]);
                else
                    $(key).val(fieldSelectors[key]);
            });
        };
        
        //Public methods
        this.addSelector = function(selector, defaultVal){
            if(_.isUndefined( defaultVal )) defaultVal = "";
            this.fieldSelectors[selector] = defaultVal;
        };

        //Bind handlers.
        $(elementId).focusout(function() {
            if($(this).val() === "") {
                setFields();
            }
        });
    };

    // Abstract AJAX
    // -------------
    R.Ajax = function(){
        // (that = this) We need to save a reference of the object's context. Without this reference,
        // "this" will refer to the wrong object when jQuery evaluates the ajax submission.
        
        // Private vars
        var that = this,
            errorMessages = {
                urlAndDataMsg: "Both R.Ajax.url and the R.Ajax.submit() parameter "+
                    "ajaxData must be defined before R.Ajax.submit() can be called.",
                urlMsg: "R.Ajax.url must be defined before R.Ajax.submit() can be called.",
                dataMsg: "The R.Ajax.submit() parameter ajaxData must be " +
                    "defined before R.Ajax.submit() can be called."
            };

        // Public vars
        this.settings = {
            type: "POST",
            url: null,
            cache: false, // not to cache requests on IEs
            dataType: "json",
            timeout: 60000
        };

        // Public methods
        this.getErrorMessages = function(){return errorMessages;};
        this.onSuccess = function(response){};
        this.onError = function(XHR, textStatus, errorThrown){};
        this.submit = function(ajaxData){
            if( this.settings.type === "GET" && !ajaxData)
                ajaxData = {};

            if( !_.any([this.settings.url, ajaxData]) )
                throw new Error(errorMessages.urlAndDataMsg);
            else if(!_.any([this.settings.url]) )
                throw new Error(errorMessages.urlMsg);
            else if(!_.any([ajaxData]) )
                throw new Error(errorMessages.dataMsg);

            this.settings.data = ajaxData;
            this.settings.success = function(response) {
                that.onSuccess(response);
            };
            this.settings.error = function(XHR, textStatus, errorThrown) {
                that.onError(XHR, textStatus, errorThrown);
                console.log("ajax error: " + JSON.stringify(XHR) + ", " + textStatus + ", " + errorThrown);
                if (textStatus === "timeout")
                    return false;
            };

            $.ajax(this.settings);
        };
    };

    // Template Handling
    // -----------------

    _.templateSettings = {
        interpolate: /\$\!?\{?([a-zA-Z.]+)\}?/g
    };

    // This object will ultimately be developed to handle logic inside a VM file.
    R.template = function(string){
        return _.template(string);
    };
    R.parsedTemplates = {};
    R.initTemplates = function() {
        var origSettings = _.templateSettings;

        _.templateSettings = {
            evaluate    : /<%([\s\S]+?)%>/g,
            interpolate : /<%=([\s\S]+?)%>/g,
            escape      : /<%-([\s\S]+?)%>/g
        };

        var $templates = $('.js-template');

        $templates.each(function() {
            var templateName = $(this).data('name');
            var templateHtml = $(this).html();
            var parsedTemplate = _.template(templateHtml);
            
            R.parsedTemplates[templateName] = parsedTemplate;
        });

        _.templateSettings = origSettings;
    }
    R.renderTemplate = function(templateName, data) {
        var template = R.parsedTemplates[templateName];

        if(!template) {
            console.warn('R :: No template found with the name "' + templateName + '"');

            return false;
        }

        return template(data);
    }

    // Helpers
    // -------

    // Utility to return the value of a given key in the url query string.
    R.querystringValue = function(key) {
        var regEx = new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi'),
            values = [],
            match = null;
        while ((match = regEx.exec(document.location.search)) !== null) values.push(match[1]);
        return values;
    };

    // Tests
    // -----

    // R.Ajax tests
    var testAjax;
    try {
        testAjax = new R.Ajax();
        testAjax.submit();
        assert(false, "An error should have been thrown while testing the R.Ajax required parameters.");
    } catch(err) {
        if(!assert(testAjax.getErrorMessages().urlAndDataMsg === err.message , "The R.Ajax urlAndDataMsg should have been thrown.") ){
            console.log("testAjax.getErrorMessages().urlAndDataMsg should but does not equal err");
            console.log("testAjax.getErrorMessages().urlAndDataMsg: " + testAjax.getErrorMessages().urlAndDataMsg);
            console.log("err.message : " + err.message );
        }
    }

    try {
        testAjax = new R.Ajax();
        testAjax.submit({obj: "this is a test object"});
        assert(false, "An error should have been thrown while testing the R.Ajax required parameters.");
    } catch(err) {
        if(!assert(testAjax.getErrorMessages().urlMsg === err.message , "The R.Ajax urlMsg should have been thrown.") ){
            console.log("testAjax.getErrorMessages().urlMsg should but does not equal err.message ");
            console.log("testAjax.getErrorMessages().urlMsg: " + testAjax.getErrorMessages().urlMsg);
            console.log("err.message : " + err.message );
        }
    }

    try {
        testAjax = new R.Ajax();
        testAjax.settings.url = "/test_url/";
        testAjax.submit();
        assert(false, "An error should have been thrown while testing the R.Ajax required parameters.");
    } catch(err) {
        if(!assert(testAjax.getErrorMessages().dataMsg === err.message , "The R.Ajax dataMsg should have been thrown.") ){
            console.log("testAjax.getErrorMessages().dataMsg should but does not equal err.message ");
            console.log("testAjax.getErrorMessages().dataMsg: " + testAjax.getErrorMessages().dataMsg);
            console.log("err.message : " + err.message );
        }
    }

    // R.templateTests.runTests() must be called from a vm file as the template properties need to
    // be overwritten with calls to test vm files.
    R.templateTests = {
        simpleTemplate : function(){return "This should be overwritten with a simple template.";},
        complexTemplate : function(){return "This should be overwritten with a complex template.";},
        runTests: function(){
            // Simple Template Test
            var input = {
                    text: "sample text",
                    selector: "paragraph",
                    variable: {
                        one: "these",
                        two: "values",
                        three: "doNot",
                        four:  "matter"
                    }
                },
                output = this.simpleTemplate(input),
                testString = '' +
                    '<p class="' + input.variable.one + '">' + input.text + '</p>' +
                    '<p class="' + input.variable.two + '">' + input.text + '</p>' +
                    '<p class="' + input.variable.three + '">' + input.text + '</p>' +
                    '<p class="' + input.variable.four + '">' + input.text + '</p>' +
                    '<p class="' + input.selector + '.five">' + input.text + '</p>';
            
            if( !assert( output === testString, "vmToJs simple template integration - This should " +
                "correctly strip comments and parse parameters." ) ){
                console.log("output should but does not equal testString");
                console.log("output: " + output);
                console.log("testString: " + testString);
            }


            // Complex Template Test
            // ... not yet written
        }
    };

}).call(this);