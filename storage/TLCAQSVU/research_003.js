/*jslint plusplus: true */
/*global $, jQuery, window, document, location, prompt, R, formMessenger, confirm*/
"use strict";


$(document).ready(function () {
    var f1rAnalytics = {
        // TO ADD AN ITEM TO TRACK ADD A DATA-ATTRIBUTE CALLED 'data-f1r-ga-helper' TO THE ITEM
        // THE VALUE OF THIS ITEM SHOULD BE THE EVENT DESCRIPTION (eg. Download PDF, Cite Item, Play Video, Navigate)
        gaContainerID: "f1r-ga-data",
        gaDataContainer: $("#f1r-ga-data"),
        isRegisteredUser: "Unknown",
        initialize: function () {
            if (this.gaDataContainer.size() === 0) {
                this.createDataContainer();
                this.gaDataContainer = $("#f1r-ga-data");
            }
            this.setPageData();
            this.bindHandlers();
            this.trackPageLoad();
        },
        createDataContainer: function () {
            var loggedIn = $("#logout-link").size() === 0 ? false : true,
                containerHTML = "<div id=\"f1r-ga-data\" name=\"f1r-ga-data\" class=\"f1r-ga-data\" " +
                                    "data-user-registered=\"" + loggedIn + "\" " +
                                    "data-user-module=\"\" " +
                                    "data-current-path=\"\" " +
                                    "data-location=\"\">" +
                                "</div>";
            $("body").prepend(containerHTML);
        },
        setURLData: function () {
            var dataOptions = {
                    module: "None Specified",
                    path: "None Specified"
                },
                cPath = location.pathname,
                sID = "";
            if (cPath === "/") {
                dataOptions.module = "Home Page";
                dataOptions.path = "Home Page";
            } else if (cPath === location.pathname.substring(location.pathname.indexOf("/", 1) + 1, location.pathname.length)) {
                dataOptions.module = location.pathname.substring(location.pathname.indexOf("/", 1) + 1, location.pathname.length).replace("/", "");
                dataOptions.path = dataOptions.module === "about" ? "How it Works" : "Browse";
            } else {
                dataOptions.module = location.pathname.substring(1, location.pathname.indexOf("/", 1));
                if (dataOptions.module === "subjects") {
                    dataOptions.path = location.pathname.substring(location.pathname.indexOf("/", 1) + 1, location.pathname.length) + " " + $(".section-bar-container .section-bar-title").text();
                } else {
                    dataOptions.path = location.pathname.substring(location.pathname.indexOf("/", 1) + 1, location.pathname.length);
                }
            }
            return dataOptions;
        },
        setContainerData: function (dataOptions) {
            var option = "",
                that = this;
            if (dataOptions) {
                for (option in dataOptions) {
                    that.gaDataContainer.attr(option, dataOptions[option]);
                }
            }
        },
        setPageData: function () {
            var dataOptions = this.setURLData();
            this.isRegisteredUser = this.gaDataContainer.attr("data-user-registered");
            this.gaDataContainer.attr({
                "data-user-module": dataOptions.module,
                "data-current-path": dataOptions.path
            });
        },
        getData: function (attributeName) {
            var theData = "";
            if (this.gaDataContainer.attr(attributeName) && this.gaDataContainer.attr(attributeName) !== "") {
                theData = this.gaDataContainer.attr(attributeName);
            } else if (this.gaDataContainer.attr("id") && this.gaDataContainer.attr("id") !== "") {
                theData = this.gaDataContainer.attr("id");
            } else if (this.gaDataContainer.attr("name") && this.gaDataContainer.attr("name") !== "") {
                theData = this.gaDataContainer.attr("name");
            } else {
                theData = "Unspecified Value";
            }
            if (theData.substring(0, 1) === "$") {
                theData = "Invalid Attribute (" + theData + ")";
            }
            return theData;
        },
        getUserStatus: function () {
            return this.isRegisteredUser === "true" ? "Registered User" : "Unregistered User";
        },
        trackPageLoad: function () {
            var label = "(" + this.getData("data-user-module") + ") " + this.getData("data-current-path");
            this.trackItem("Page Load", this.getUserStatus(), label);
        },
        trackItem: function (evt, category, label) {
            evt = evt || "Unknown Event";
            category = category || "Unknown Category";
            label = label || "Unknown Label";
            GAHelper.track({action: evt, category: category, label: label });
            //console.log("event: " + evt + " | category: " + category + " | label: " + label);
        },
        bindHandlers: function () {
            var that = this;
            // Bind items to be tracked
            $("[data-f1r-ga-helper]").on("click", function (e) {
                var theItem = $(e.target),
                    theEvent = $(this).attr("data-f1r-ga-helper"),
                    onHeader = theItem.closest(".header-wrapper").size() > 0 ? that.setContainerData({ "data-location": "Header" }) : false,
                    onNavigationMenu = theItem.closest(".navigation-menu,.js-nav,.js-navbar").size() > 0 ? that.setContainerData({ "data-location": "Navigation Menu" }) : false,
                    onChannelsNavigationMenu = theItem.closest(".channel-nav-list").size() > 0 ? that.setContainerData({ "data-location": "Collections Navigation Menu" }) : false,
                    onFooter = theItem.closest(".footer-wrapper").size() > 0 ? that.setContainerData({ "data-location": "Footer" }) : false,
                    subjectSidebar = theItem.closest(".publish-more-container").size() > 0 ? that.setContainerData({ "data-location": "Subjects Sidebar" }) : false,
                    searchSidebar = theItem.closest(".publish-more-container").size() > 0 && location.pathname.indexOf("/search") > -1 ? that.setContainerData({ "data-location": "Search Sidebar" }) : false,
                    submittedSidebar = theItem.closest(".publish-more-container").size() > 0 && location.pathname.indexOf("/thankyou/") > -1 ? that.setContainerData({ "data-location": "Submission Thankyou Page" }) : false,
                    channelSidebar = theItem.closest(".channel-view-sidebar").size() > 0 ? that.setContainerData({ "data-location": "Collections Sidebar" }) : false,
                    onPage = theItem.closest(".submit-to-channel-box").size() > 0 ? that.setContainerData({ "data-location": "Channel Page" }) : false,
                    pageLabel = "";
                if (that.getData("data-location") === "f1r-ga-data") {
                    if (theItem.attr("data-f1r-ga-detail")) {
                        that.setContainerData({ "data-location": theItem.attr("data-f1r-ga-detail") });
                    } else if ($(e.currentTarget).attr("data-f1r-ga-detail")) {
                        that.setContainerData({ "data-location": $(e.currentTarget).attr("data-f1r-ga-detail") });
                    } else {
                        that.setContainerData({ "data-location": e.target.tagName + " Click" });
                    }
                }
                if (location.pathname === "/") {
                    pageLabel = "Home Page";
                } else {
                    pageLabel = location.hash === "" ? location.pathname : (location.pathname + location.hash);
                }
                that.trackItem(theEvent, that.getData("data-location"), pageLabel);
            });
            $(".nav-list li a").on("click", function (e) {
                var pageLabel = location.pathname;
                if (pageLabel === "/") { pageLabel = "Home Page"; }
                that.trackItem(e.currentTarget.innerHTML, pageLabel, "Header Navigation Menu");
            });
        }
    };
    f1rAnalytics.initialize();
});