var highlightColors = ['yellow', 'light-blue', 'pink', 'light-green'];
Annotator.Plugin.CabiAnnotate = function(element) {
	var plugin = {};

	plugin.pluginInit = function() {
		Annotator.prototype.events[".highlight-delete click"] = "onDeleteClick";
		Annotator.prototype.events[".highlight-delete mouseover"] = "clearDeleterTimer";
		Annotator.prototype.events[".highlight-delete mouseout"] = "startViewerHideTimer";
		Annotator.prototype.html.deleter = '<div class="highlight-delete delete-highlighter"><button> Rem</button></div>';
		Annotator.onDeleteClick = __bind(this.annotator.onDeleteClick, this.annotator);
		Annotator.clearDeleterTimer = __bind(this.annotator.clearDeleterTimer, this.annotator);
		Annotator.prototype.onDeleteClick = function(event) {
			var deleter = this.deleter;
			deleter.hide();
		    var id = this.deleter.attr("data-id");
			$.ajax({
				url: apiPrefix + "annotations/destroy/" + id,
				type: 'POST', // was DELETE - see bugid 17700
				success: function(result) {
					deleter.hide();
					loadAnnotator();
				}
			});
		};
		Annotator.prototype.clearDeleterTimer = function(event) {
			clearTimeout(this.deleterHideTimer);
			this.deleterHideTimer = false;
		};
		Annotator.prototype.startViewerHideTimer = function() {
		    var deleter = this.deleter;
			if (!this.deleterHideTimer && deleter) {
			    return this.deleterHideTimer = setTimeout(function() {
			        deleter.hide();
			    }, 250);
			}
			if (!this.viewerHideTimer) {
			    return this.viewerHideTimer = setTimeout(this.viewer.hide, 250);
			}
		};
		this.annotator.deleter = $(this.annotator.html.deleter).appendTo(this.annotator.wrapper).hide();
		Annotator.prototype.showDeleter = function(annotations, location) {
		    return this.deleter.attr("data-id", annotations[0].id).css(location).show();
		}
		this.annotator.readOnly = false;
		Annotator.Editor.prototype.html = '<div class="annotator-outer annotator-editor"> ' +
			'<form class="annotator-widget">' +
			'<div class="content-header">' +
			'<span class="icon-icon_envelope"></span>' +
			'<h4>Annotation</h4>' +
			'</div>' +
			'<ul class="annotator-listing"></ul> ' +
			'<div class="annotator-controls"> ' +
			'<a href="#cancel" class="annotator-cancel">' + "Cancel" + '</a>' +
			'<a href="#save" class="annotator-save annotator-focus">' + "Save" + '</a>' +
			'</div>' +
			'</form> ' +
			'</div>';
		this.annotator.viewer.addField({
			type: "input",
			label: "Title" + "…",
			load: function(field, annotation) {
				if (annotation.Title) {
				    $(field).addClass("annotationTitle").html(annotation.Title);
				} else {
				    $(field).html("<i>" + "No Title" + "</i>");
				}
				$(field).parent().prepend($(field));
			}
		});

		this.annotator.viewer.load = function(annotations) {
		    var annotation, controller, controls, del, edit, element, field, item, link, links, list, _k, _l, _len2, _len3, _ref2, _ref3;

		    this.annotations = annotations || [];
		    list = this.element.find("ul:first").empty();

		    var isHighlighter = (this.annotations[0].Highlight && $.inArray(this.annotations[0].Highlight.Colour, highlightColors) > -1);

		    if (isHighlighter)
		        $(list).css("padding-top", "0px");

		    if (!isHighlighter)
		        list.prepend('<li><div class="content-header"><span class="icon-icon_envelope"></span><h4>Annotation</h4></div></li>');

		    _ref2 = this.annotations;
		    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
		        annotation = _ref2[_k];

		        item = $(this.item).clone().appendTo(list).data("annotation", annotation);
		        controls = item.find(".annotator-controls");
		        link = controls.find(".annotator-link");
		        edit = controls.find(".annotator-edit");
		        del = controls.find(".annotator-delete");
		        // Added by CABI to stop webforms submitting.
		        edit.attr("type", "button");
		        del.attr("type", "button");
		        links = new LinkParser(annotation.links || []).get("alternate", {
		            type: "text/html"
		        });
		        if (links.length === 0 || links[0].href == null) {
		            link.remove();
		        } else {
		            link.attr("href", links[0].href);
		        }
		        if (this.options.readOnly) {
		            edit.remove();
		            del.remove();
		        } else {
		            controller = {
		                showEdit: function () {
		                    return edit.removeAttr("disabled");
		                },
		                hideEdit: function () {
		                    return edit.attr("disabled", "disabled");
		                },
		                showDelete: function () {
		                    return del.removeAttr("disabled");
		                },
		                hideDelete: function () {
		                    return del.attr("disabled", "disabled");
		                }
		            }
		        }
		        _ref3 = this.fields;
		        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
		            field = _ref3[_l];
		            element = $(field.element).clone().appendTo(item)[0];
		            field.load(element, annotation, controller);
		        }
		    }
    
		        
            if (this.options.readOnly)
                if (!isHighlighter)
		            list.append('<li class="annotator-annotation annotator-item"><span class="annotator-controls"><button class="btn btn-default push-right" type="button" onclick="cd4.executeAnnotationClick(\'annotation\',false);">Use annotation tool</button></span></li>');
                else
                    list.append('<li class="annotator-annotation annotator-item" style="position:relative;top:-20px;"><span class="annotator-controls"><button class="btn btn-default push-right" type="button" onclick="cd4.executeAnnotationClick(\'highlight\',false);">Use highlighter tool</button></span></li>');


		    this.publish("load", [this.annotations]);

		    if (isHighlighter) {
		        edit.remove();
		        this.element.addClass("cabiHighlighter").find("ul:first div").hide();
		    }

		    return this.show();
		};
		this.annotator.editor.load = function(annotation) {
			var field;
			this.annotation = annotation;
			this.publish("load", [this.annotation]);
			for (var i = 0; i < this.fields.length; i++) {
				field = this.fields[i];
			    field.load(field.element, this.annotation);
				if (field.type == 'input') {
					$(".label-title").remove();
					$(field.element).find('input').attr('maxlength', 50);
					$(field.element).find('input').attr('title', field.label);
					$(field.element).before('<li class="annotator-item label-title"><strong>Annotation Title</strong></li>');
				} else if (field.type == 'textarea') {
					$(".label-comment").remove();
				    $(field.element).find('textarea').attr('maxlength', 500);
				    $(field.element).find('textarea').attr('title', field.label);
				    $(field.element).before('<li class="annotator-item label-comment"><strong>Annotation</strong></li>');
				}
			}

			if (this.options.isHighlighter) {
				this.element.addClass("cabiHighlighter").find("ul.annotator-listing").hide();
				this.element.find("div.content-header h4").html("Highlight");
			} else if (annotation.id) {
				this.element.find("div.content-header h4").html("Edit Annotation");
			} else {
				this.element.find("div.content-header h4").html("Add Annotation");
			}
		    return this.show();
		};

		this.annotator.editor.submit = function(event) {
			var field, _k, _len2, _ref2;
			Annotator.Util.preventEventDefault(event);
			_ref2 = this.fields;
			this.annotation.Highlight = {}
		    this.annotation.Highlight.Start = this.annotation.ranges[0].start;
		    this.annotation.Highlight.End = this.annotation.ranges[0].end;
		    this.annotation.Highlight.StartOffset = this.annotation.ranges[0].startOffset;
		    this.annotation.Highlight.EndOffset = this.annotation.ranges[0].endOffset;
			try {
				this.annotation.Highlight.Colour = highlightColor;
			} catch (e) {
				//OK, its Annotation not a Highligher ;)
			}
			for (var i = 0; i < this.fields.length; i++) {
				field = this.fields[i];
				if (field.label == 'Title') {
				    this.annotation.Title = $(field.element).find("input:first").val();
				} else {
				    this.annotation.Text = this.annotation.text;
				}
			    field.submit(field.element, this.annotation);
			}
			this.publish("save", [this.annotation]);
		    return this.hide();
		}

		this.annotator.editor.addField = function(options) {
			var element, field, input;
			field = $.extend({
				id: "annotator-field-" + Annotator.Util.uuid(),
				type: "input",
				label: "",
				load: function() {},
				submit: function() {}
			}, options);
			input = null;
			element = $('<li class="annotator-item" />');
			field.element = element[0];
			switch (field.type) {
				case "textarea":
					input = $("<textarea />");
					break;
				case "input":
				case "checkbox":
					input = $("<input />");
					break;
				case "select":
				    input = $("<select />");
			}
			element.append(input);
			input.attr({
				id: field.id,
				placeholder: field.label
			});
			if (field.type === "checkbox") {
				input[0].type = "checkbox";
				element.addClass("annotator-checkbox");
			    element.append($("<label />", {
			        "for": field.id,
			        html: field.label
			    }));
			}
			if (field.label == 'Title') {
			    this.element.find("ul:first").prepend(element);
			} else {
				this.element.find("ul:first").append(element);
			}

			this.fields.push(field);
		    return field.element;
		};

		this.annotator.editor.addField({
			type: "input",
			label: "Title",
			load: function(field, annotation) {
			    return $(field).find("input").val(annotation.Title || "");
			}
		});

		this.annotator.editor.show = function(event) {
		    $(".modal-backdrop").height($('body').height()).show();
			Annotator.Util.preventEventDefault(event);
			this.element.removeClass(this.classes.hide);
			this.element.find(".annotator-save").addClass(this.classes.focus);
			this.checkOrientation();
			this.element.find(":input:first").focus();
			this.setupDraggables();
		    return this.publish("show");
		};
		this.annotator.editor.hide = function(event) {
		    $(".modal-backdrop").hide();
			Annotator.Util.preventEventDefault(event);
			this.element.addClass(this.classes.hide);
		    return this.publish("hide");
		};

		this.annotator.editor.checkOrientation = function() {
		    return this;
		};
	};

	return plugin;
}

Annotator.Plugin.Store.prototype._urlFor = function(action, id) {
	var url;
	url = this.options.prefix != null ? this.options.prefix : "";
	url += this.options.urls[action];
	url = url.replace(/\/:id/, id != null ? "/" + id : "");
    return url;
};

// HTTP Verbs have been modified 
// in order to avoid using DELETE and PUT which fail on live servers. See bugid 17700
// See also script.js function loadAnnotator()
Annotator.Plugin.Store.prototype._methodFor = function (action) {
    var table;
    table = {
        create: "POST",
        read: "GET",
        update: "POST", // originally PUT
        destroy: "POST", // originally DELETE
        search: "GET" 
    };
    return table[action]
};


Annotator.Plugin.Store.prototype._onLoadAnnotations = function(data) {
	data = data.Results;
	var a, annotation, annotationMap, newData, _k, _l, _len2, _len3, _ref3;
	if (data == null) {
	    data = [];
	}
	annotationMap = {};
	_ref3 = this.annotations;
	for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
		a = _ref3[_k];

	    annotationMap[a.id] = a;
	}
	newData = [];
	for (_l = 0, _len3 = data.length; _l < _len3; _l++) {
		a = data[_l];

		if (a.Highlight && a.Highlight.End && a.Highlight.Start && a.Highlight.StartOffset && a.Highlight.EndOffset) {
			a.ranges = [];
			a.ranges[0] = {};
			a.ranges[0].start = a.Highlight.Start;
			a.ranges[0].end = a.Highlight.End;
			a.ranges[0].endOffset = a.Highlight.EndOffset;
			a.ranges[0].startOffset = a.Highlight.StartOffset;
			a.text = a.Text;
			a.id = a.Id;

			if (annotationMap[a.id]) {
				annotation = annotationMap[a.id];
			    this.updateAnnotation(annotation, a);
			} else {
			    updateRightAnnotationBoxes(a);
			    newData.push(a);
			}
		}
	}

	this.annotations = this.annotations.concat(newData);
    return this.annotator.loadAnnotations(newData.slice());
};
Annotator.Plugin.Store.prototype.annotationCreated = function(annotation) {
	var _this = this;
	if (annotation && annotation.Highlight && annotation.Highlight.Colour) {
	    $(annotation.highlights).addClass(annotation.Highlight.Colour);
	}
	if (__indexOf.call(this.annotations, annotation) < 0) {
		this.registerAnnotation(annotation);
	    return this._apiRequest("create", annotation, function(data) {
	        data.id = data.Id;
	        updateRightAnnotationBoxes(data);
	        if (data.id == null) {
	            console.warn(Annotator._t("Warning: No ID returned from server for annotation "), annotation);
	        }
	        return _this.updateAnnotation(annotation, data);
	    });
	} else {
	    return this.updateAnnotation(annotation, {});
	}
};
Annotator.Plugin.Store.prototype.annotationUpdated = function(annotation) {
	var _this = this;
	if (__indexOf.call(this.annotations, annotation) >= 0) {
	    return this._apiRequest("update", annotation, function(data) {
	        updateRightAnnotationBoxes(data);
	        return _this.updateAnnotation(annotation, data);
	    });
	}
};

Annotator.Plugin.Store.prototype.annotationDeleted = function(annotation) {
	var _this = this;
	if (__indexOf.call(this.annotations, annotation) >= 0) {
	    return this._apiRequest("destroy", annotation, function() {
	        updateRightAnnotationBoxes({
	            Id: annotation.Id
	        });
	        return _this.unregisterAnnotation(annotation);
	    });
	}
};
Annotator.prototype.onHighlightMouseover = function(event) {
	var annotations;
	this.clearViewerHideTimer();
	this.clearDeleterTimer();
	if (this.mouseIsDown) {
	    return false;
	}
	if (this.viewer.isShown()) {
	    this.viewer.hide();
	}
	annotations = $(event.target).parents(".annotator-hl").addBack().map(function() {
	    return $(this).data("annotation");
	}).toArray();
    var isHighlighter = (annotations[0].Highlight && $.inArray(annotations[0].Highlight.Colour, highlightColors) > -1);
	if (this.options.readOnly && isHighlighter) {
	    this.showViewer(annotations, Annotator.Util.mousePosition(event, this.wrapper[0]));
	    //return this;
	} else if (!this.adder.is(":visible") && !this.options.readOnly && this.options.isHighlighter && isHighlighter) {
	    this.showDeleter(annotations, Annotator.Util.mousePosition(event, this.wrapper[0]));
	} else if (!this.options.isHighlighter && !isHighlighter) {
	    return this.showViewer(annotations, Annotator.Util.mousePosition(event, this.wrapper[0]));
	}
};
Annotator.prototype.checkForEndSelection = function(event) {
	var container, range, _k, _len2, _ref1;
	this.mouseIsDown = false;
	if (this.ignoreMouseup) {
	    return;
	}
	this.selectedRanges = this.getSelectedRanges();
	_ref1 = this.selectedRanges;
	for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
		range = _ref1[_k];
		container = range.commonAncestor;
		if (this.isAnnotator(container)) {
		    return;
		}
	}
	var adder = this.adder;

	if (event && this.selectedRanges.length) {
		if (this.options.isHighlighter) {
		    this.adder.addClass("adder-for-highlighter");
		} else {
		    this.adder.addClass("adder-for-annotation");
		}
		$('html').unbind('click').click(function(e) {
			if (!$(e.target).parents().hasClass('annotator-wrapper')) {
				adder.hide();
			}
		});
	    return this.adder.css(Annotator.Util.mousePosition(event, this.wrapper[0])).show();
	} else {
	    return this.adder.hide();
	}
};
Annotator.prototype.setupAnnotation = function(annotation) {
	var e, normed, normedRanges, r, root, _k, _l, _len2, _len3, _ref1;
	root = this.wrapper[0];
	annotation.ranges || (annotation.ranges = this.selectedRanges);
	normedRanges = [];
	_ref1 = annotation.ranges;
	for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
		r = _ref1[_k];
		try {
		    normedRanges.push(Annotator.Range.sniff(r).normalize(root));
		} catch (_error) {
			e = _error;
			if (e instanceof Annotator.Range.RangeError) {
			    this.publish("rangeNormalizeFail", [annotation, r, e]);
			} else {
			    throw e;
			}
		}
	}
	annotation.quote = [];
	annotation.ranges = [];
	annotation.highlights = [];
	for (_l = 0, _len3 = normedRanges.length; _l < _len3; _l++) {
		normed = normedRanges[_l];
		annotation.quote.push($.trim(normed.text()));
		annotation.ranges.push(normed.serialize(this.wrapper[0], ".annotator-hl"));
	    $.merge(annotation.highlights, this.highlightRange(normed));
	}
	annotation.quote = annotation.quote.join(" / ");
	$(annotation.highlights).data("annotation", annotation);
	$(annotation.highlights).attr("data-annotation-id", annotation.id);
	if (annotation.Highlight && $.inArray(annotation.Highlight.Colour, highlightColors) > -1) {
	    $(annotation.highlights).addClass(annotation.Highlight.Colour);
	}

    return annotation;
};
Annotator.prototype.showEditor = function(annotation, location) {
	this.editor.options = this.options;
	this.editor.element.css(location);
	this.editor.load(annotation);
	this.publish("annotationEditorShown", [this.editor, annotation]);
    return this;
};

var __indexOf = [].indexOf || function(item) {
	for (var i = 0, l = this.length; i < l; i++) {
	    if (i in this && this[i] === item) return i;
	}
    return -1;
};
var __bind = function(fn, me) {
	return function() {
	    return fn.apply(me, arguments);
	}
}
LinkParser = function() {
	function LinkParser(data) {
	    this.data = data;
	}
	LinkParser.prototype.get = function(rel, cond) {
		var d, k, keys, match, v, _k, _len2, _ref2, _results;
		if (cond == null) {
			cond = {}
		}
		cond = $.extend({}, cond, {
			rel: rel
		});
		keys = function() {
			var _results;
			_results = [];
			for (k in cond) {
				if (!{}.hasOwnProperty.call(cond, k)) continue;
				v = cond[k];
			    _results.push(k);
			}
		    return _results;
		}();
		_ref2 = this.data;
		_results = [];
		for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
			d = _ref2[_k];
			match = keys.reduce(function(m, k) {
			    return m && d[k] === cond[k];
			}, true);
			if (match) {
			    _results.push(d);
			} else {
			    continue;
			}
		}
	    return _results;
	};
    return LinkParser;
}();