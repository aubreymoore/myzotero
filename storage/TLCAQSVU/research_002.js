$(function(){
    R.ui = new ResearchUI();
    R.ui.initialize();

    // UI helper for research.
    // Dropdown functionality, checkboxes, etc.

    function ResearchUI() {
        var confirmCallbacks = {
                onYes: undefined,
                onNo: undefined
            },
            publicProperties = {
                initialize: initialize,
                dropdowns: dropdowns,
                buttonDropdowns: buttonDropdowns,
                toolbarDropdowns: toolbarDropdowns,
                viewChanger: viewChanger,
                confirmCallbacks: confirmCallbacks,
                handleConfirmMessageAction: handleConfirmMessageAction
            };

        function initialize(){
            bindCheckboxHandlers();
            bindRadioHandlers();
            bindSelectHandlers();
            bindScrollboxHandlers();
            bindSidebarAuthorHandlers();

            appendConfirmMessageMarkup();
            bindConfirmMessageHandlers();
            appendHelpWindowMarkup();
            bindHelpWindowHandlers();
        }

        function dropdowns(clickedElement) {
            var toggleHoverState = function (element, hover) {
                element
                    .toggleClass('dd-active', hover)
                    .find('.f1r-icon')
                        .toggleClass('icon-14_more_small white', !hover)
                        .toggleClass('icon-10_less_small', hover)
                        .end()
                    .next('.dropdown-menu-container').toggleClass('is-hidden', !hover);
            };

            $(clickedElement).each(function () {
                var self = $(this);
                self
                    .off('.f1r-ui')
                    .on('click.f1r-ui', function (e) {
                        e.preventDefault();
                    })
                    .on('mouseenter.f1r-ui', function () {
                        toggleHoverState(self, true);
                    })
                    .parent()
                    .off('.f1r-ui')
                    .on('mouseleave.f1r-ui', function () {
                        toggleHoverState(self, false);
                    });
            });
        }

        function buttonDropdowns(clickedElement) {
            $(clickedElement).on('click', function(e){
                e.preventDefault();
                $(this).toggleClass('active');
                $(this).find('span.orange-arrow-closed').toggleClass('orange-arrow-opened');
                $(this).next('.dropdown-menu-container').toggleClass('is-hidden');
            });
            $(clickedElement).parent().on('mouseleave', function (e) {
                e.preventDefault();
                $(this).find("a[href='#']").removeClass("active");
                $(this).find('span.orange-arrow-closed').removeClass('orange-arrow-opened');
                $(this).find('.dropdown-menu-container').addClass('is-hidden');
            });
        }

        function toolbarDropdowns(clickedElement) {
            $(clickedElement).on('click', function(e){
                e.preventDefault();
                $(this).toggleClass('active');
                $(this).find('span.orange-arrow-closed').toggleClass('orange-arrow-opened');
                $(this).next('.toolbar-dropdown-menu-container').toggleClass('is-hidden');
            });
            $(clickedElement).parent().on('mouseleave', function (e) {
                e.preventDefault();
                $(this).find("a[href='#']").removeClass("active");
                $(this).find('span.orange-arrow-closed').removeClass('orange-arrow-opened');
                $(this).find('.toolbar-dropdown-menu-container').addClass('is-hidden');
            });
        }

        //parent as a optional parameter
        function viewChanger(elementsToChange, switcher, parent) {

            var elements = $(elementsToChange);
            var switchers = $(switcher);
            var views = '';
            var preferred = localStorage.getItem('preferredView') || '';

            if(preferred){
                elements.addClass(preferred);
                switchers.removeClass('active');
                $(switcher+'[data-view="'+preferred+'"]').addClass('active');

                if(parent) {
                    $(parent).removeClass(views)
                    $(parent).addClass(preferred)
                }
            }

            switchers.each(function(){ views += ' '+$(this).data('view')});
            
            switchers.on('click', function(){
                localStorage.setItem('preferredView', $(this).data('view'));
                elements.removeClass(views)
                switchers.removeClass('active');
                elements.addClass($(this).data('view'));
                $(this).addClass('active');

                if(parent) {
                    $(parent).removeClass(views)
                    $(parent).addClass($(this).data('view'))
                }
            })
        }

        /*  Expected Markup: Other classes and attributes can be used as needed.
         *
         *  <div class="checkbox-wrapper">
         *      <input type="checkbox" class="is-hidden"/>
         *  </div>
         */
         function bindCheckboxHandlers() {
            $("body").on("click", ".checkbox-wrapper", function(){
                var checkbox = $(this).find('input[type="checkbox"]');
                if($(this).hasClass("is-selected")) {
                    $(this).removeClass("is-selected");
                    checkbox.prop('checked', false);
                } else {
                    $(this).addClass("is-selected");
                    checkbox.prop('checked', true);
                }
            });

            $('.checkbox-wrapper').each(function(){
                if($(this).hasClass('is-selected')) {
                    var checkbox = $(this).find('input[type="checkbox"]');
                    checkbox.prop('checked', true);
                }
            });
        }
        //END Checkbox

        /*  Expected Markup: Other classes and attributes can be used as needed.
         *
         *  <div class="radio-block">
         *      <div class="radio-wrapper">
         *          <input type="radio" class="is-hidden"/>
         *      </div>
         *      <div class="radio-wrapper">
         *          <input type="radio" class="is-hidden"/>
         *      </div>
         *  </div>
         */
        function bindRadioHandlers() {
            $("body").on("click", ".radio-wrapper", function(){
                var radio = $(this).find('input[type="radio"]'),
                    block = $(this).parents(".radio-block");

                block.find(".radio-wrapper").not(this).each(function(){
                    $(this).removeClass("is-selected");
                    $(this).find('input[type="radio"]').prop('checked', false);
                });

                $(this).addClass("is-selected");
                radio.prop('checked', true);
            });
        }
        //END Radio

        // Dropdowns
        function bindSelectHandlers() {
            var clickTarget = null;

            $(".new-select-standard-wrapper").each(function(){
                var that = this,
                    realOptions = $(this).find("option"),
                    selectedOption = realOptions.filter(":selected"),
                    selectedVal = selectedOption.attr("data-truncated-value") ? selectedOption.attr("data-truncated-value") : selectedOption.text();
                selectedVal = $.trim(selectedVal);
                $(this).find(".selected-option").html('<input value="' + selectedVal + '" readonly="readonly"/>');
                realOptions.each(function(){
                    var optionClass = $(this).attr("disabled") ? "disabled-faux-option" : "faux-option";
                    if( $(this).attr("selected") )
                        optionClass += " is-selected";
                    if( $(this).attr("class") )
                        optionClass += " " + $(this).attr("class");
                    var extraDataAttributes = '';
                    if( $(this).attr("data-truncated-value") )
                        extraDataAttributes += 'data-truncated-value="' + $(this).attr("data-truncated-value") + '"';
                    var fauxOption = '<div class="' + optionClass + '" data-value="' + $(this).val() + '" ' + extraDataAttributes + '>'+ $(this).html() +'</div>';
                    $(that).find(".faux-options").append(fauxOption);
                });
            });
            $("body").on("click", ".new-select-standard-wrapper, .new-input-standard-wrapper ", function(){
                $(this).find("input").focus();
            });
            $("body").on("change", ".new-select-standard-wrapper select", function(){
                var wrapper = $(this).parents(".new-select-standard-wrapper"),
                    newVal = $(this).val();
                $(this).find(":selected").removeAttr("selected");
                $(this).find("option[value='"+newVal+"']").attr("selected", "selected");
                wrapper.find(".faux-option[data-value='"+newVal+"']").click();
                wrapper.find(".selected-option input").trigger("blur");
            });
            $("body").on("click", ".new-select-standard-wrapper .toggle-button, .new-select-standard-wrapper .selected-option", function(){
                var fauxOptionsContainer = $(this).siblings(".faux-options-container");
                if (fauxOptionsContainer.hasClass("is-defaulted")) { return false; }
                if( fauxOptionsContainer.hasClass("is-closed")) {
                    fauxOptionsContainer.removeClass("is-closed").addClass("is-open");
                    focusOnSelect($(this).parents(".new-select-standard-wrapper"));
                } else if ( fauxOptionsContainer.hasClass("is-open")) {
                    focusOutSelect($(this).parents(".new-select-standard-wrapper"));
                }
            });
            $("body").on("click", ".new-select-standard-wrapper .faux-option", function(){
                var wrapper = $(this).parents(".new-select-standard-wrapper"),
                    selectionText = $(this).attr("data-truncated-value") ? $(this).attr("data-truncated-value") : $(this).text(),
                    selectionVal = $(this).attr("data-value"),
                    input = wrapper.find(".selected-option input");
                selectionText = $.trim(selectionText);
                input.focus();
                wrapper.find(".faux-option.is-selected").removeClass("is-selected");
                $(this).removeClass("is-highlighted");
                $(this).addClass("is-selected");
                wrapper.find("select").val(selectionVal);
                input.removeAttr("readonly");
                input.val(selectionText);
                input.change();
                input.attr("readonly", "readonly");
                $(this).parents(".faux-options-container").toggleClass("is-closed").toggleClass("is-open");
                wrapper.find("input").unbind("keydown", selectKeyHandler);
            });
            $("body").on("mouseenter", ".new-select-standard-wrapper .faux-option", function() {
                $(this).addClass("is-highlighted");
            }).on("mouseleave", ".new-select-standard-wrapper .faux-option", function() {
                $(".faux-option.is-highlighted").removeClass("is-highlighted");
            });


            $(document).click(function(e) {
                if($(".faux-options-container.is-open").parents(".new-select-standard-wrapper").has(e.target).length === 0) {
                    $(".faux-options-container.is-open").toggleClass("is-closed").toggleClass("is-open");
                }
            });
            $(document).mousedown(function(e) {
                clickTarget = e.target;
                $(".new-select-standard-wrapper").each(function(){
                    if( $(this).has(e.target).length === 0 && $(this).find(".faux-options-container").hasClass("is-open"))
                        focusOutSelect($(this));
                });
            });

            $(".new-select-standard-wrapper input").focus(function(){
                focusOnSelect($(this).parents(".new-select-standard-wrapper"));
            });

            $(".new-select-standard-wrapper input").blur(function(){
                $(this).unbind("keydown", selectKeyHandler);
                if( $(clickTarget).parents(".new-select-standard-wrapper").length === 0)
                    focusOutSelect($(this).parents(".new-select-standard-wrapper"));
            });

            function focusOnSelect(selectWrapper){
                var fauxOptionsContainer = selectWrapper.find(".faux-options-container");
                selectWrapper.addClass("is-in-focus");
                selectWrapper.find("input").unbind("keydown", selectKeyHandler);
                selectWrapper.find("input").keydown(selectKeyHandler);
            }


            function focusOutSelect(selectWrapper){
                selectWrapper.removeClass("is-in-focus");
                selectWrapper.find("input").unbind("keydown", selectKeyHandler);
                selectWrapper.find(".faux-options-container").addClass("is-closed").removeClass("is-open");
                selectWrapper.find(".faux-option.is-highlighted").removeClass("is-highlighted");
            }

            function selectKeyHandler(e){
                var fauxOptionsContainer = $(e.target).parents(".new-select-standard-wrapper").find(".faux-options-container"),

                    highlightOption = function(fauxOption){
                        var container  = fauxOption.parents(".faux-options-container");
                        var positionInfo = positionCheck(fauxOption, container);
                        fauxOption.addClass("is-highlighted");
                        if ( positionCheck.below ) {
                            container.find(".faux-options").scrollTop(positionCheck.scrollTo);
                        } else if ( positionCheck.above ) {
                            container.find(".faux-options").scrollTop(positionCheck.scrollTo);
                        }

                        function positionCheck(fauxOption, container) {
                            var containerTop = container.offset().top;
                            var containerBottom = containerTop + container.height();

                            var fauxOptionTop = fauxOption.offset().top;
                            var fauxOptionBottom = fauxOptionTop + fauxOption.height();
                            var result = {
                                above: false,
                                below: false,
                                scrollTo: (fauxOptionTop - containerTop)
                            };

                            if( fauxOptionBottom > containerBottom ) {
                                result.below = true;
                            } else if ( fauxOptionTop < containerTop ) {
                                result.above = true;
                            }

                            return result;
                        }
                    };

                clickTarget = null;
                var highlightedOption;
                if(e.which === 40){ //down arrow
                    if(fauxOptionsContainer.hasClass("is-closed")){
                        fauxOptionsContainer.removeClass("is-closed").addClass("is-open");
                        if(fauxOptionsContainer.find(".faux-option.is-selected").length > 0)
                            highlightOption(fauxOptionsContainer.find(".faux-option.is-selected"));
                        else
                            fauxOptionsContainer.find(".faux-option").first().addClass("is-highlighted");
                    } else {
                        highlightedOption = fauxOptionsContainer.find(".faux-option.is-highlighted");
                        highlightedOption.removeClass("is-highlighted");
                        if(highlightedOption.next(".faux-option").length > 0)
                            highlightOption(highlightedOption.next(".faux-option"));
                        else
                            highlightOption(fauxOptionsContainer.find(".faux-option").first());
                    }
                    e.preventDefault();
                } else if (e.which === 38) { //up arrow
                    if (fauxOptionsContainer.hasClass("is-open")) {
                        highlightedOption = fauxOptionsContainer.find(".faux-option.is-highlighted");
                        highlightedOption.removeClass("is-highlighted");
                        if (highlightedOption.prev(".faux-option").length > 0)
                            highlightOption(highlightedOption.prev(".faux-option"));
                        else
                            highlightOption(fauxOptionsContainer.find(".faux-option").last());
                    }
                    e.preventDefault();
                } else if (e.which === 13 ) {
                    if (fauxOptionsContainer.hasClass("is-open")) {
                        fauxOptionsContainer.find(".faux-option.is-highlighted").trigger("click");
                    }
                    e.preventDefault();
                }
            }
        }

        function bindScrollboxHandlers(){
            var prevY = null,
            activeScrollBar = null;

            $(".scroll-box").each(function(){
                updateScrollBox($(this));
                $(this).on("is_visible", function(){
                    updateScrollBox($(this));
                });
                $(this).find(".scroll-path").on("click", scrollToClick);
                $(this).find(".scroll-bar").on("mousedown", enableScroll);
            });

            function updateScrollBox(scrollBox){
                var contents = scrollBox.find(".scroll-contents"),
                    scrollHeight = contents.prop("scrollHeight"),
                    maxHeight = parseInt(scrollBox.css("max-height").replace("px", ""), 10);

                if(scrollHeight > maxHeight) {
                    scrollBox.addClass("is-scrollable");
                    scrollBox.find(".scroll-path, .scroll-fade.bottom").removeClass("is-hidden");
                    scrollBox.find(".scroll-bar").height( maxHeight / scrollHeight * maxHeight );
                } else {
                    scrollBox.removeClass("is-scrollable");
                    scrollBox.find(".scroll-path, .scroll-fade").addClass("is-hidden");
                }
            }
            function enableScroll(e){
                activeScrollBar = $(e.target);
                $("body").addClass("unselectable");
                $(document).on("mousemove", scroll);
                $(document).on("mouseup", disableScroll);
            }
            function disableScroll(e){
                activeScrollBar.parents(".scroll-box.is-scrolling").removeClass("is-scrolling");
                $("body").removeClass("unselectable");
                $(document).unbind("mousemove", scroll);
                $(document).unbind("mouseup", disableScroll);
                prevY = activeScrollBar = null;
            }
            function scroll(e){
                var deltaY = (prevY) ?  e.pageY - prevY : 0;
                if(deltaY !== 0)
                    setScroll(deltaY);
                prevY = e.pageY;
            }
            function scrollToClick(e){
                if($(e.target).hasClass("scroll-bar"))
                    return;
                activeScrollBar = $(e.target).find(".scroll-bar");
                var deltaY = e.pageY - activeScrollBar.offset().top - activeScrollBar.height() / 2;
                setScroll(deltaY);
                activeScrollBar = null;
            }

            function setScroll(deltaY){
                var scrollBar = activeScrollBar,
                    scrollContent = scrollBar.parents(".scroll-box").find(".scroll-contents"),
                    barPos = parseInt(scrollBar.css("top").replace("px", ""), 10),
                    barMaxPos = scrollBar.parents(".scroll-path").height() - scrollBar.height(),
                    contentPos = -parseInt(scrollContent.css("top").replace("px", ""), 10),
                    contentMaxPos = scrollContent.height() - scrollContent.parent().height(),
                    contentDeltaY = deltaY / barMaxPos * contentMaxPos,
                    newBarPos = Math.max(0, Math.min(barMaxPos, (barPos + deltaY))),
                    newContentPos = -(Math.max(0, Math.min(contentMaxPos, (contentPos + contentDeltaY))));
                if(newBarPos === 0)
                    scrollContent.siblings(".scroll-fade.top").addClass("is-hidden");
                else
                    scrollContent.siblings(".scroll-fade.top").removeClass("is-hidden");

                if(newBarPos === barMaxPos)
                    scrollContent.siblings(".scroll-fade.bottom").addClass("is-hidden");
                else
                    scrollContent.siblings(".scroll-fade.bottom").removeClass("is-hidden");
                scrollBar.css({"top": newBarPos + "px"});
                scrollContent.css({"top": newContentPos + "px"});
            }
        }

        function bindSidebarAuthorHandlers() {
            $(".sidebar-expand-authors").on("click", function(e) {
                e.preventDefault();
                var authorList = $(this).closest(".author-list"),
                    hiddenItems = authorList.find("span.is-hidden"),
                    collapseLink = authorList.find(".sidebar-collapse-authors");
                $(this).addClass("is-hidden");
                collapseLink.removeClass("is-hidden");
                hiddenItems.removeClass("is-hidden");
            });
            $(".sidebar-collapse-authors").on("click", function(e) {
                e.preventDefault();
                var authorList = $(this).closest(".author-list"),
                    itemsToHide = authorList.find("span.hidden-author"),
                    expandLink = authorList.find(".sidebar-expand-authors");
                $(this).addClass("is-hidden");
                expandLink.removeClass("is-hidden");
                itemsToHide.addClass("is-hidden");
            });
        }

        // There should only be one instance of the Confirm message markup on the page.
        function appendConfirmMessageMarkup(){
            var confirmMsgMarkup = '' +
                '<div id="confirm-site-mask" class="confirm-site-mask is-hidden"></div>'+
                '<div id="confirm-dialogue" class="confirm-dialogue is-hidden">' +
                    '<div id="confirm-message" class="confirm-message">' +
                        '<span class="confirm-label">Are&nbsp;you&nbsp;sure?</span>' +
                        '<span id="confirm-yes" class="general-white-orange-button confirm-yes">Yes</span>' +
                        '<span id="confirm-no" class="general-white-orange-button confirm-no">No</span>' +
                    '</div>' +
                '</div>';

            if ($("#confirm-site-mask, #confirm-dialogue").length === 0) {
                $("body").append( confirmMsgMarkup );
                if ($("body").hasClass("wellcome") || $(".content-wrapper").hasClass("wellcome")) {
                    $(".general-white-orange-button").addClass("wellcome");
                }
                if ($("body").hasClass("gates-brand")) {
                    $(".general-white-orange-button").removeClass("wellcome");
                }
            }
        }

        function bindConfirmMessageHandlers(){
            $("body").on("click", ".confirm-action", handleConfirmMessageAction);
        }

        function handleConfirmMessageAction(e){
            var that = this,
                targetURL = ($(this).attr("href")) ? $(this).attr("href") : $(this).attr("data-url");

            if(e) e.preventDefault();

            $("#confirm-dialogue")
                .data( "action", {"id": $(this).attr("id"), "class":  $(this).attr("class")} )
                .attr("ie-helper-id", $(this).attr("id"))
                .attr("ie-helper-class", $(this).attr("class"))
                .find(".confirm-label").show();

            $(this).addClass("forceHover");
            $(this).parent().addClass("forceHover");

            // THIS HAS BEEN COMMENTED OUT AS IT WAS CAUSING PROBLEMS IN THE SUBMISSION FORM
            // WHEN A USER RESIZED THE WINDOW IT WOULD DRAW THE DIALOG (OFF SCREEN) AND SHOW
            // THE BACKGROUND MASK
            $(window).resize(function() {
                //positionDialogue();
            });

            function positionDialogue(){
                var msgWidth = $("#confirm-dialogue").outerWidth(),
                    msgHeight = $("#confirm-dialogue").outerHeight(),
                    targetPosition = $(that).offset();
                $("#confirm-site-mask").css({
                    "height": $("body").height() +"px",
                    "width": $("body").width() +"px"
                });

                $("#confirm-dialogue").css({
                    "left": ( targetPosition.left + ( $(that).width() - msgWidth ) / 2 ) + "px",
                    "top": ( targetPosition.top - msgHeight ) + "px"
                });

                $("#confirm-site-mask").removeClass("is-hidden").fadeTo(200, 0.3);
                $("#confirm-dialogue").removeClass("is-hidden").fadeIn(200);
            }

            function yesHandler(){
                confirmCallbacks.onNo = undefined;
                if(!_.isUndefined(targetURL) && targetURL != "#") {
                    window.location = targetURL;
                } else if(!_.isUndefined(confirmCallbacks.onYes) &&
                    _.isFunction(confirmCallbacks.onYes)) {
                    confirmCallbacks.onYes();
                }
                noHandler();
            }

            function noHandler(){
                confirmCallbacks.onYes = undefined;
                if(!_.isUndefined(confirmCallbacks.onNo) &&_.isFunction(confirmCallbacks.onNo)) {
                    confirmCallbacks.onNo();
                }
                $(".forceHover").removeClass("forceHover");
                $("#confirm-site-mask, #confirm-dialogue").fadeOut(200, function(){
                    $(this).addClass("is-hidden");
                });
                $("#confirm-yes").unbind( "click", yesHandler);
                $("#confirm-no").unbind( "click", noHandler);
            }

            $("#confirm-yes").click(yesHandler);
            $("#confirm-no").click(noHandler);

            setTimeout(positionDialogue, 10);
        }

        // HERE IS WHERE WE HANDLE THE HELP AND INFO WINDOW MARKUP AND FUNCTIONS
        function appendHelpWindowMarkup() {
            var helpWindowMarkup = '<div class="modal-window-wrapper" id="help-information-modal-window" style="display: none;">' +
                                   '<div class="modal-window-background-mask" id="help-information-modal-mask"></div>' +
                                   '<div class="modal-window help-info-window">' +
                                   '<div class="modal-window-close-button" id="help-information-modal-close-button"></div>' +
                                   '<div class="modal-window-title margin-bottom">Help &amp; Information</div>' +
                                   '<div class="modal-window-row"></div>' +
                                   '<div class="modal-window-footer">' +
                                   '<button class="general-white-orange-button help-information-modal-close">OK</button>' +
                                   '</div>' +
                                   '</div>' +
                                   '</div>';
            if ($("#help-information-modal-window").size() === 0) {
                $("body").append(helpWindowMarkup);
            }
        }

        function bindHelpWindowHandlers() {
            $("body").on("click", ".help-info-icon", function() {
                var $helpWindowWrapper = $("#help-information-modal-window"),
                    $helpMessage = $helpWindowWrapper.find(".modal-window-row"),
                    whatField = $(this).attr("data-field"),
                    infoHTML = "There is no information available for this field";
                if (whatField === undefined || whatField === "") { whatField = "default"; }
                switch (whatField) {
                    case "study-dec" :
                        infoHTML = "This confirms if the author has checked this declaration on submission:" +
                                   "<p>I confirm that the funders had no role in study design, data collection and " +
                                   "analysis, decision to publish, or preparation of the manuscript.</p>" +
                                   "<p>(This statement will be added to the Grant information section of your " +
                                    "manuscript at publication.)</p>";
                        break;
                    default :
                        infoHTML = "There is no information available for this field.";
                        break;
                }
                $helpMessage.html(infoHTML);
                $("#help-information-modal-mask").fadeIn(100, function() {
                    $("#help-information-modal-window").fadeIn(100);
                });
            });
            $("#help-information-modal-mask, .help-information-modal-close, #help-information-modal-close-button").on("click", function() {
                $("#help-information-modal-window, #help-information-modal-mask").fadeOut(200);
            });
        }

        return publicProperties;
    }

});