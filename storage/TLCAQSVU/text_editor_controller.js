//  ====================================================================================================
//  Functions for handling the CKEditor text boxes
//  Need to incorporate all editors into this
//  And make the parameters a json array
//  And basically re-factor it and make it configurable... but I never have time :)
//
//  Special Styles Required For The createFormFieldEditor Function (add to end of /static/js/ckeditor/contents.css)
//  /* F1000RESEARCH SPECIALS */
//  .f1r-editor {
//      margin: 0;
//      padding: 8px;
//      font: normal normal normal 14px/19px arial,sans-serif;
//      color: #333333;
//      letter-spacing: normal;
//      background-color: #fff;
//      overflow: hidden;
//  }
//  ====================================================================================================
var researchTextEditors = {

    areYouSureFormCheckRequired: $("#submission-form").size() > 0 ? true : false,
    defaultRemovePlugins: "sourcearea,resize,elementspath,magicline,contextmenu,liststyle,tabletools",

    createStandardEditor: function(id, specialPlugins, specialHeight, specialWidth, errorMessageID) {
        var that = this;
        if (specialPlugins === undefined) { specialPlugins = ""; }
        if (typeof specialHeight !== "number") { specialHeight = 100; }
        if (specialWidth === undefined) {
            specialWidth = 500;
        } else {
            if (typeof specialWidth !== "number" && specialWidth.indexOf("%") < 0) { specialWidth = 500; }
        }
        if (errorMessageID === undefined) { errorMessageID = ""; }
        $("#" + id).ckeditor(function() {}, {
            enterMode: CKEDITOR.ENTER_BR,
            autoUpdateElement: true,
            removePlugins: "sourcearea,elementspath,magicline",
            toolbar: 'ResearchDefault',
            extraPlugins: 'specialchar' + specialPlugins,
            height: specialHeight,
            width: specialWidth,
            on: {
                change: function() {
                    if (that.areYouSureFormCheckRequired) { $("#submission-form").addClass("dirty"); }
                },
                blur: function() {
                    if (that.areYouSureFormCheckRequired) { $("#submission-form").addClass("dirty"); }
                },
                paste: function(evt) {
                    if (specialPlugins.indexOf("wordcount") > -1) { that.checkWordCount(evt, errorMessageID); }
                }
                //instanceReady: function() { alert(this.name + " is ready."); }
                //key: function() { alert("A key was pressed. the data is now " + this.getData(); }
            }
        });
    },
    createFormFieldEditor: function(options) {
        var that = this,
            id = options["id"] || "",
            editorWidth = options["width"] || 500,
            editorHeight = options["height"] || 86,
            editorClass = options["bodyClass"] || "f1r-editor",
            editorPlugins = options["extraPlugins"] || "",
            editorRemovePlugins = options["removePlugins"] || that.defaultRemovePlugins,
            editorAutoGrowMinHeight = options["autoGrow_minHeight"] || 76,
            editorAutoGrowMaxHeight = options["autoGrow_maxHeight"] || 500,
            editorAutoGrowBottomSpace = options["autoGrow_bottomSpace"] || 0,
            editorAutoGrowOnStartup = options["autoGrow_onStartup"] || true,
            editorMaxWordCount = options["wordCount"] || 300,
            editorMaxWordErrorID = options["wordCountErrorID"] || "",
            editorHideWordCountDisplay = options["hideWordCountDisplay"] || false,
            editorToolbar = options["toolbarOptions"] || [ 'Italic', 'Superscript', 'Subscript' ],
            editorToolbarLocation = options["toolbarLocation"] || "bottom",
            editorPlainTextOnly = options["forcePasteAsPlainText"] || false,
            mandatoryField = options["mandatoryField"] || "",
            mandatoryTargetList = [],
            charCount = false,
            editorWordCountOptions = {},
            hasError = $("#" + id).hasClass("form-field-error");
        if (editorPlugins.indexOf("wordcount") > -1) {
            editorWordCountOptions = { wordLimit: editorMaxWordCount };
            if (editorHideWordCountDisplay) { editorWordCountOptions.showWordCount = false; }
        } else if (editorPlugins.indexOf("charcount") > -1) {
            charCount = true;
            editorWordCountOptions = { showCharCount: true, showWordCount: false, charLimit: editorMaxWordCount };
            editorPlugins = editorPlugins.replace("charcount", "wordcount");
        }
        if (id !== "") {
            $("#" + id).ckeditor(function() {}, {
                enterMode: CKEDITOR.ENTER_BR,
                autoUpdateElement: true,
                removePlugins: editorRemovePlugins,
                extraPlugins: editorPlugins,
                wordcount: editorWordCountOptions,
                toolbar: [ editorToolbar ],
                toolbarLocation: editorToolbarLocation,
                forcePasteAsPlainText: editorPlainTextOnly,
                height: editorHeight,
                width: editorWidth,
                bodyClass: editorClass,
                autoGrow_onStartup: editorAutoGrowOnStartup,
                autoGrow_minHeight: editorAutoGrowMinHeight,
                autoGrow_maxHeight: editorAutoGrowMaxHeight,
                autoGrow_bottomSpace: editorAutoGrowBottomSpace,
                on: {
                    change: function() {
                        if (that.areYouSureFormCheckRequired) { $("#submission-form").addClass("dirty"); }
                    },
                    blur: function() {
                        if (that.areYouSureFormCheckRequired) { $("#submission-form").addClass("dirty"); }
                    },
                    focus: function(evt) {
                        $("#cke_" + evt.editor.name).find(".form-field-error").removeClass("form-field-error");
                        $("#cke_" + evt.editor.name).find(".cke_bottom.has-error").removeClass("has-error");
                    },
                    paste: function(evt) {
                        if (editorPlugins.indexOf("wordcount") > -1) {
                            if (charCount) {
                                that.checkCharCount(evt, editorMaxWordErrorID);
                            } else {
                                that.checkWordCount(evt, editorMaxWordErrorID);
                            }
                        }
                    },
                    //get rid of unwanted &nbsp from source
                    configLoaded: function(evt){
                        evt.editor.config.basicEntities = false;
                        evt.editor.config.entities_greek = false;
                        evt.editor.config.entities_latin = false;
                        evt.editor.config.entities_additional = '';
                    },
                    instanceReady: function(evt) {
                        this.dataProcessor.writer.setRules( 'br', {
                            indent: false,
                            breakBeforeOpen: false,
                            breakAfterOpen: false,
                            breakBeforeClose: false,
                            breakAfterClose: false
                        });
                        var editorID = "cke_" + evt.editor.name,
                            theEditor = $("#" + editorID),
                            theField = "";
                        if (hasError) {
                            theEditor.find(".cke_inner > .cke_contents").first().addClass("form-field-error");
                            theEditor.find(".cke_bottom").addClass("has-error");
                        }
                        if (mandatoryField !== "") {
                            if (typeof mandatoryField.targetClassList === "string") {
                                mandatoryTargetList = mandatoryField.targetClassList.split(" ");
                            } else {
                                mandatoryTargetList = mandatoryField.targetClassList;
                            }
                            for (var i = 0; i < mandatoryTargetList.length; i++) {
                                theField = theEditor.find("." + mandatoryTargetList[i]);
                                if (theField.css("border") !== "") {
                                    theField.addClass(mandatoryField.mandatoryClass);
                                } else if (theField.css("border-top") !== "") {
                                    theField.addClass(mandatoryField.mandatoryClass + " top-only");
                                } else {
                                    if (mandatoryTargetList[i] === "cke_wysiwyg_frame") {
                                        theField.addClass(mandatoryField.mandatoryClass);
                                    } else if (mandatoryTargetList[i] === "cke_bottom") {
                                        theField.addClass(mandatoryField.mandatoryClass + " top-only");
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    },
    createFormEditor: function(options) {
        var that = this,
            id = options["id"] || "",
            editorEnterMode = options["enterMode"] || CKEDITOR.ENTER_BR,
            editorWidth = options["width"] || 500,
            editorHeight = options["height"] || 86,
            editorToolbar = options["toolbar"] || "StandardFormEditorToolbar",
            editorToolbarAlign = options["toolbarAlign"] || "",
            editorClass = options["bodyClass"] || "f1r-editor",
            editorPlugins = options["extraPlugins"] || "",
            editorRemovePlugins = options["removePlugins"] || that.defaultRemovePlugins,
            editorAutoGrowMinHeight = options["autoGrow_minHeight"] || 76,
            editorAutoGrowMaxHeight = options["autoGrow_maxHeight"] || 500,
            editorAutoGrowBottomSpace = options["autoGrow_bottomSpace"] || 0,
            editorAutoGrowOnStartup = options["autoGrow_onStartup"] || true,
            editorUIColor = options["uiColor"] || "#dddddd",
            editorMaxWordCount = options["wordCount"] || 300,
            editorMaxWordErrorID = options["wordCountErrorID"] || "",
            charCount = false,
            sourceEntities = options["entities"] || false,
            editorWordCountOptions = {};
        if (options["autoGrow_maxHeight"] === 0) { editorAutoGrowMaxHeight = 0; }
        if (editorPlugins.indexOf("wordcount") > -1) {
            editorWordCountOptions = { wordLimit: editorMaxWordCount };
        } else if (editorPlugins.indexOf("charcount") > -1) {
            charCount = true;
            editorWordCountOptions = { showCharCount: true, showWordCount: false, charLimit: editorMaxWordCount };
            editorPlugins = editorPlugins.replace("charcount", "wordcount");
        }
        if (id !== "") {
            $("#" + id).ckeditor(function() {}, {
                enterMode: editorEnterMode,
                autoUpdateElement: true,
                removePlugins: editorRemovePlugins,
                extraPlugins: editorPlugins,
                wordcount: editorWordCountOptions,
                toolbar: editorToolbar,
                toolbarLocation: "top",
                uiColor: editorUIColor,
                height: editorHeight,
                width: editorWidth,
                entities: sourceEntities,
                bodyClass: editorClass,
                fillEmptyBlocks: false,
                autoGrow_onStartup: editorAutoGrowOnStartup,
                autoGrow_minHeight: editorAutoGrowMinHeight,
                autoGrow_maxHeight: editorAutoGrowMaxHeight,
                autoGrow_bottomSpace: editorAutoGrowBottomSpace,
                on: {
                    change: function() {
                        if (that.areYouSureFormCheckRequired) { $("#submission-form").addClass("dirty"); }
                    },
                    blur: function() {
                        if (that.areYouSureFormCheckRequired) { $("#submission-form").addClass("dirty"); }
                    },
                    paste: function(evt) {
                        that.stripFromBRinUL.call(this, evt);
                        if (editorPlugins.indexOf("wordcount") > -1) {
                            if (charCount) {
                                that.checkCharCount(evt, editorMaxWordErrorID);
                            } else {
                                that.checkWordCount(evt, editorMaxWordErrorID);
                            }
                        }
                    },
                    //get rid of unwanted &nbsp from source
                    configLoaded: function(evt){
                        evt.editor.config.basicEntities = false;
                        evt.editor.config.entities_greek = false;
                        evt.editor.config.entities_latin = false;
                        evt.editor.config.entities_additional = '';
                    },
                    mode: function(evt) {
                        // changed view from/to source
                        if(this.mode === 'wysiwyg') {
                            // if were going from soure->wysiwyg
                            // Strip all the BR's in list items again, to avoid
                            // issue with extra's being added by CKeditor
                            that.stripFromBRinUL.call(this, evt);
                        }
                    },
                    instanceReady: function(evt) {
                        that.stripFromBRinUL.call(this, evt);
                        this.dataProcessor.writer.setRules( 'br', {
                            indent: false,
                            breakBeforeOpen: false,
                            breakAfterOpen: false,
                            breakBeforeClose: false,
                            breakAfterClose: false
                        });
                        if (editorToolbarAlign === "center") {
                            var editorID = "cke_" + evt.editor.name,
                                editorTotalWidth = 611,
                                editorToolbarID = $("#" + editorID).find(".cke_toolbar").attr("id"),
                                editorToolbarCopy = $("#" + editorToolbarID).clone(),
                                editorToolbarWidth = 0,
                                editorToolbarMargin = 0;
                            editorToolbarCopy.attr("id", "comment-field-toolbar");
                            editorToolbarCopy.css({ position: "absolute", visibility: "hidden", display: "block" });
                            $(".asset-details-container.asset-comments").append(editorToolbarCopy);
                            editorToolbarWidth = $("#comment-field-toolbar").outerWidth();
                            $("#comment-field-toolbar").remove();
                            editorToolbarMargin = parseInt((editorTotalWidth - editorToolbarWidth) / 2, 10);
                            $("#" + editorID).find(".cke_toolbar").css({ "margin-left": editorToolbarMargin + "px" });
                        }
                    }
                }
            });
        }
    },
    createAdminEditor: function(id, specialPlugins, specialHeight, errorMessageID, extraTags, toolbar) {
        var that = this;
        if (specialPlugins === undefined) { specialPlugins = ""; }
        if (typeof specialHeight !== "number") { specialHeight = 100; }
        if (errorMessageID === undefined) { errorMessageID = ""; }
        if (extraTags === undefined) { extraTags = ""; } else { console.log('extra', extraTags); }
        if (toolbar === undefined) { toolbar = "StandardFormEditorToolbar"; } else { console.log('toolbar', toolbar); }


        $("#" + id).ckeditor(function() {}, {
            enterMode: CKEDITOR.ENTER_BR,
            autoUpdateElement: true,
            extraPlugins: 'sourcearea' + specialPlugins,
            height: specialHeight,
            toolbar: toolbar,
            extraAllowedContent: extraTags,
            on: {
                paste: function(evt) {
                    if (specialPlugins.indexOf("wordcount") > -1) { that.checkWordCount(evt, errorMessageID); }
                }
            }
        });
    },
    createCollectionsEditor: function(id, specialHeight, specialWidth, extraPlugins, specialWordLimit, errorID) {
        var that = this,
            wordcountOptions = {},
            charCount = false;
        specialHeight = specialHeight || 120;
        specialWidth = specialWidth || "100%";
        extraPlugins = extraPlugins || "";
        specialWordLimit = specialWordLimit || 300;
        errorID = errorID || "";
        if (typeof specialHeight !== "number") { specialHeight = 120; }
        if (typeof specialWidth !== "number" && specialWidth.indexOf("%") < 0) { specialWidth = "100%"; }
        if (extraPlugins.indexOf("wordcount") > -1) {
            wordcountOptions = { wordLimit: specialWordLimit };
        } else if (extraPlugins.indexOf("charcount") > -1) {
            charCount = true;
            wordcountOptions = { showCharCount: true, showWordCount: false, charLimit: specialWordLimit };
            extraPlugins = extraPlugins.replace("charcount", "wordcount");
        }
        $("#" + id).ckeditor(function() {}, {
            enterMode : CKEDITOR.ENTER_P,
            extraPlugins : "sourcearea" + extraPlugins,
            wordcount: wordcountOptions,
            height: specialHeight,
            width: specialWidth,
            on: {
                change: function() { $("#editCollection").addClass("dirty"); },
                blur: function() { $("#editCollection").addClass("dirty"); },
                paste: function(evt) {
                    if (extraPlugins.indexOf("wordcount") > -1) {
                        if (charCount) {
                            that.checkCharCount(evt, errorID);
                        } else {
                            that.checkWordCount(evt, errorID);
                        }
                    }
                }
            }
        });
    },
    createDatasetFormEditor: function(id) {
        $("#" + id).ckeditor(function() {}, {
            enterMode : CKEDITOR.ENTER_BR,
            extraPlugins : 'sourcearea',
            height: 100
        });
    },
    showEditor: function(id) {
        $("#" + id).show(200);
    },
    hideEditor: function(id) {
        $("#" + id).hide(200);
    },
    removeEditor: function(id) {
        if (CKEDITOR.instances[id]) { CKEDITOR.instances[id].destroy(); }
    },
    removeEditorAndField: function(id) {
        if (CKEDITOR.instances[id]) { CKEDITOR.instances[id].destroy(); }
        $("#" + id).remove();
    },
    checkWordCount: function(evt, errorMessageID) {
        var wordCount = this.getWordCount(evt.data.dataValue),
            wordLimit = evt.editor.config.wordcount.wordLimit ? evt.editor.config.wordcount.wordLimit : 300,
            origData = evt.editor.getData(),
            $errorMessage = $(),
            numberOfWordsAboveLimit = 0;
        if (wordCount > wordLimit) {
            evt.editor.setData(origData);
            numberOfWordsAboveLimit = wordCount - wordLimit;
            if (errorMessageID !== "") { $errorMessage = $("#" + errorMessageID); }
            if ($errorMessage.size() > 0) {
                $errorMessage.text("Please note that the maximum number of words allowed is " + wordLimit + " and your pasted text exceeded that by " + numberOfWordsAboveLimit + " words.");
                formMessenger.showError($errorMessage);
            }
        }
    },
    getWordCount: function(data) {
        if (data === undefined || data === "") { return 0; }
        var editorText = "",
            normalizedText = "",
            wordsArray = [];
        editorText = data.
            replace(/<br \/>/gi, " ").
            replace(/(\r\n|\n|\r)/gm, " ").
            replace(/^\s+|\s+$/g, "").
            replace("&nbsp;", " ");
        normalizedText = this.strip(editorText);
        wordsArray = normalizedText.split(/\s+/);
        return wordsArray.length;
    },
    checkCharCount: function(evt, errorMessageID) {
        var charCount = this.getCharCount(evt.data.dataValue),
            charLimit = evt.editor.config.wordcount.charLimit ? evt.editor.config.wordcount.charLimit : 100,
            origData = evt.editor.getData(),
            $errorMessage = $(),
            numberOfCharsAboveLimit = 0;
        if (charCount > charLimit) {
            evt.editor.setData(origData);
            numberOfCharsAboveLimit = charCount - charLimit;
            if (errorMessageID !== "") { $errorMessage = $("#" + errorMessageID); }
            if ($errorMessage.size() > 0) {
                $errorMessage.text("Please note that the maximum number of characters allowed is " + charLimit + " and your pasted text exceeded that by " + numberOfCharsAboveLimit + " characters.");
                formMessenger.showError($errorMessage);
            }
        }
    },
    getCharCount: function(data) {
        if (data === undefined || data === "") { return 0; }
        var editorText = "",
            normalizedText = "";
        editorText = data.
            replace(/<br \/>/gi, " ").
            replace(/(\r\n|\n|\r)/gm, " ").
            replace(/^\s+|\s+$/g, "").
            replace("&nbsp;", " ");
        normalizedText = this.strip(editorText);
        return normalizedText.length;
    },
    makeLinksTargetBlanc: function() {
        CKEDITOR.on('dialogDefinition', function(evt) {
            // Links should default to target="_blank"
            // We do this by updating the default field value 
            // for the link popup when it is created.
            try {
                var dialogName = evt.data.name;
                var dialogDefinition = evt.data.definition;

                if(dialogName == 'link') {
                    var informationTab = dialogDefinition.getContents('target');
                    var targetField = informationTab.get('linkTargetType');
                    targetField['default'] = '_blank';
                }
            } catch(exception) {
                alert('Error ' + evt.message);
            }
        });
    },
    strip: function(html) {
        var tmp = document.createElement("div");
        tmp.innerHTML = html;
        if (tmp.textContent === "" && typeof tmp.innerText == "undefined") { return "0"; }
        return tmp.textContent || tmp.innerText;
    },
    stripFromBRinUL: function(evt){
        var data = this.dataProcessor.editor.document.getBody().getHtml();
        var wrapper = document.createElement('DIV');
        wrapper.innerHTML = data;

        var ul = $(wrapper).find('ul br, ol br').remove();

        if(ul.length > 0) { evt.editor.setData(wrapper.innerHTML) };
    }
};

$(document).ready(function(){
    setTimeout(function(){
        for(elem in CKEDITOR.instances) { 
            if(CKEDITOR.instances[elem].status){
                $('#'+elem).css({ 'visibility': 'visible'});
            }
        }
    }, 500)
    
})