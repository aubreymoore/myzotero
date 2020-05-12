/*!
 * credit-publisher v1.0: Reuse Recipe Doc Widget for Research Article
 * (c) 2018 Mohit Bagga
 * MIT License
 * https://api.profeza.com/src/credit.js
 */

(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([], factory(root));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root.creditWidget = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    'use strict';

    //
    // Variables
    //

    var CREDIT = {}; // Object for public APIs
    var supports = !!document.querySelector && !!root.addEventListener; // Feature test
    var settings, eventTimeout;

    // Default settings
    var defaults = {
        publisherID: '1',
        type: 'widget',
        callbackBefore: function () {},
        callbackAfter: function () {}
    };


    //
    // Methods
    //

    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @private
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    var forEach = function (collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };

    /**
     * Merge defaults with user options
     * @private
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     * @returns {Object} Merged values of defaults and options
     */
    var extend = function ( defaults, options ) {
        var extended = {};
        forEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        });
        forEach(options, function (value, prop) {
            extended[prop] = options[prop];
        });
        return extended;
    };



    /**
     * Add Widget inside div container - id provided in settings
     * @returns {}
     */
    var addWidget = function ( recipeData ) {
        console.log(settings);
        var url_parameters = recipeData.url;
        var url = 'https://api.profeza.com/alpha/reuse-recipe/index.html?' + url_parameters;
        document.getElementById(settings.container_id).innerHTML = `<div style='width: 464px;border: solid 1px #eeeeee;background-color: white;'>
                                                                        <div style='padding-top: 15px;padding-left: 15px;padding-right: 30px;'>
                                                                            <h5 style='font-size:11pt;'>Reuse Recipe Document</h5>
                                                                            <h5 style='word-wrap: break-word; font-size:11pt;'><a href='${url}' onclick='return trackUrlClick("${recipeData.url}");' style='text-decoration:none; color:#1B8AAE;'>${recipeData.title}</a></h5>
                                                                            <span style=''>DOI : ${recipeData.doi}</span>
                                                                            <span style='margin-left: 30px; padding-left: 10px; border-left: solid 1px #b3b3b3;'>Version : ${recipeData.version}</span>
                                                                            ${recipeData.reuse_instances == 0 ? "" : `<div style='font-size:11pt;'> Reuse Instances : ${recipeData.reuse_instances}</div>`}
                                                                        </div>
                                                                        <div style='width: 100%;padding : 5px 0px; text-align: right;background-color: #eeeeee;color:grey; margin-top:15px;'><span style='margin-right: 5px; font-weight:bold;'>powered by Profeza</span></div>
                                                                    </div>`;
        // document.getElementById(settings.container_id).innerHTML = "<div style='width: 464px;border: solid 1px #eeeeee;background-color: white;'>" +
        //                                                                 "<div style='padding-top: 15px;padding-left: 15px;padding-right: 30px;'>" +
        //                                                                     "<h5 style='font-size:11pt;'>Reuse Recipe Doc</h5>" +
        //                                                                     "<h5 style='word-wrap: break-word; font-size:11pt;'><a href='#' onclick='return trackUrlClick(this);' style='text-decoration:none; color:#1B8AAE;'>" + recipeData.title + "</a></h5>" +
        //                                                                     "<span style=''>DOI : " + recipeData.doi + "</span>" +
        //                                                                     "<span style='margin-left: 30px; padding-left: 10px; border-left: solid 1px #b3b3b3;'>Version : " + recipeData.version + "</span>" +
        //                                                                     // "<div style='margin-top: 10px;'>Experiments : " + recipeData.experiments + (recipeData.null_experiments != 0 ? " ( +" + recipeData.null_experiments + " Null/Negative ) " : "") +
        //                                                                     //"</div>" +
        //                                                                     (recipeData.reuse_instances == 0 ? "" : "<div style='font-size:11pt;'> Reuse Instances :  " + recipeData.reuse_instances + "</div>") +
        //                                                                 "</div>" +
        //                                                                 "<div style='width: 100%;padding : 5px 0px; text-align: right;background-color: #eeeeee;color:grey; margin-top:15px;'><span style='margin-right: 5px; font-weight:bold;'>powered by Profeza</span></div>"+
        //                                                             "</div>";
    };







    // CREDIT Constructor
    var creditWidget = function(options){
        var CREDIT = {}; // Object for public APIs
        /**
         * Initialize Plugin
         * @public
         * @param {Object} options User settings
         */
        CREDIT.init = function ( options ) {
            console.log(options);
            // feature test
            if ( !supports ) return;

            // Destroy any existing initializations
            CREDIT.destroy();

            // Merge user options with defaults
            settings = extend( defaults, options || {} );


        };
        /**
         * Destroy the current initialization.
         * @public
         */
        CREDIT.destroy = function () {

            // If plugin isn't already initialized, stop
            if ( !settings ) return;

            // Reset variables
            settings = null;
            eventTimeout = null;

        };
        /**
         * Get Reuse Recipe Data
         * @public
         * @return {Object} Depends upon 'type' flag in settings
         */
        CREDIT.getReuseRecipe = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var recipeData = JSON.parse(this.responseText);
                    if (settings.type == 'widget'){
                        addWidget(recipeData);
                        return {};
                    }
                    else {
                        return recipeData;
                    }
                }
            };
            xhttp.open("GET", "https://nwk4hm45pd.execute-api.ap-south-1.amazonaws.com/prod/reuse-recipe-widget?doi=" + options.doi, true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        };

        CREDIT.init(options);
        CREDIT.getReuseRecipe();
    };



    //
    // Public APIs
    //

    return creditWidget;

});

var trackUrlClick = function (url) {
  mixpanel.track("Clicked on Recipe Url", {"Recipe Url":url});
};
