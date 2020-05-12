/**
 * @file
 * Custom behaviors for Simple hierarchical select.
 */

(function ($, Drupal) {

  /**
   * Creates the widget for Simple hierarchical select.
   */
  Drupal.behaviors.shsWidgetCreate = {

    // Default function to attach the behavior.
    attach: function (context, settings) {
      var self = this;
      var settingsDefault = {
        display: {
          animationSpeed: 400,
        }
      };
      $('select.shs-enabled:not([disabled])')
        .once('shs')
        .addClass('element-invisible')
        .hide()
        .each(function() {
          $field = $(this);
          var fieldName = $(this).attr('name');
          // Multiform messes up the names of the fields
          // to the format multiform[something][fieldname][...].
          if (fieldName.indexOf('multiform') == 0) {
            var split = fieldName.split('][');
            split.splice(0, 1);
            fieldName = split.splice(0, 1) + '[' + split.join('][');
          }

          if (fieldName in settings.shs) {
            var fieldSettings = {};
            // Since we store the field settings within an associative array with
            // random strings as keys (reason: http://drupal.org/node/208611) we
            // need to get the last setting for this field.
            $.each(settings.shs[fieldName], function(hash, setting) {
              fieldSettings = setting;
            });
            fieldSettings = $.extend({}, fieldSettings, settingsDefault, {
              fieldName: fieldName
            });
            var level = 0;
            var parent_id = 0;
            // Update class of wrapper element.
            $field.parent('.form-item').not('.shs-wrapper-processed').once('shs-wrapper');
            // Create elements for each parent of the current value.
            $.each(fieldSettings.parents, function(index, parent) {
              level++;
              // Create select element.
              $select = shsElementCreate($field.attr('id'), fieldSettings, level);
              if ($field.hasClass('error')) {
                // Add error-class if there was an error with the original field.
                $select.addClass('error');
              }
              // Add label to dropdown.
              $label = shsLabelCreate($field.attr('id'), fieldSettings, level);
              if ($label !== false) {
                $label.appendTo($field.parent());
              }
              $select.appendTo($field.parent());
              // Retrieve data for this level.
              getTermChildren($select, fieldSettings, parent_id, parent.tid, $field.attr('id'));
              // Use current term id as parent id for the next level.
              if (fieldSettings.multiple) {
                parent_id = parent['tid'];
              }
              else {
                parent_id = parent.tid;
              }
            });
            var addNextLevel = false;
            if ((level > 1 || parent_id) && ((fieldSettings.settings.create_new_terms && fieldSettings.settings.create_new_levels) || fieldSettings.settings.test_create_new_levels)) {
              // Add next level in hierarchy if new levels may be created.
              addNextLevel = true;
            }
            if (fieldSettings.default_value && (fieldSettings.default_value === parent_id) && (fieldSettings.default_value !== '')) {
              addNextLevel = true;
            }
            if (addNextLevel) {
              // Add label to dropdown.
              $label = shsLabelCreate($field.attr('id'), fieldSettings, level);
              if ($label !== false) {
                $label.appendTo($field.parent());
              }
              // Try to add one additional level.
              $select = shsElementCreate($field.attr('id'), fieldSettings, ++level);
              $select.appendTo($field.parent());
              // Retrieve data for this level.
              getTermChildren($select, fieldSettings, parent_id, 0, $field.attr('id'));
            }
          }
        });
    }
  }

  /**
   * Load direct children of a selected term.
   *
   * @param $element
   *   Element to fill with terms.
   * @param settings
   *   Field settings.
   * @param parent_value
    *   Value which has been selected in the parent element (== "selected term").
    * @param default_value
    *   Value to use as default.
    * @param base_id
    *   ID of original field which is rewritten as "taxonomy_shs".
    */
  getTermChildren = function($element, settings, parent_value, default_value, base_id) {
    // Check if parent_value is number and convert it.
    if (!$.isArray(parent_value) && typeof parent_value != "object") {
      parent_value = [parent_value];
    }

    $.ajax({
      url: Drupal.settings.basePath + '?q=' + Drupal.settings.pathPrefix + 'js/shs/json',
      type: 'POST',
      dataType: 'json',
      cache: true,
      data: {
        callback: 'shs_json_term_get_children',
        arguments: {
          vid: settings.vid,
          parent: parent_value,
          settings: settings.settings,
          field: settings.fieldName
        }
      },
      success: function(data) {
        if (data.success == true) {
          if ($element.prop) {
            var options = $element.prop('options');
          }
          else {
            var options = $element.attr('options');
          }

          if (((data.data.length == 0) || ((data.data.length == 1 && !data.data[0].tid))) && !(settings.settings.create_new_terms && (settings.settings.create_new_levels || (parent_value[0] == settings.any_value && default_value == 0)))) {
            // Remove element.
            $element.prev('label').remove();
            $element.remove();
            return;
          }

          // Remove all existing options.
          $('option', $element).remove();
          // Add empty option (if field is not required or this is not the
          // first level.
          if (!settings.settings.required || (settings.settings.required && (default_value === 0 || parent_value !== 0))) {
            options[options.length] = new Option(settings.any_label, settings.any_value);
          }

          // Add retrieved list of options.
          $.each(data.data, function(key, term) {
            if (term.vid && settings.settings.create_new_terms) {
              // Add option to add new item.
              options[options.length] = new Option(Drupal.t('<Add new item>', {}, {context: 'shs'}), '_add_new_');
            }
            else if (term.tid) {
              option = new Option(term.label, term.tid);
              options[options.length] = option;
              if (term.has_children) {
                option.setAttribute("class", "has-children");
              }
            }
          });
          // Set default value.
          $element.val(default_value);
          if (0 === default_value) {
            $element.val(settings.any_value);
          }

          // Try to convert the element to a "Chosen" element.
          if (!elementConvertToChosen($element, settings)) {
            // Display original dropdown element.
            $element.fadeIn(settings.display.animationSpeed);
            $element.css('display','inline-block');
          }
          else {
            $element.trigger('chosen:updated');
          }

          // If there is no data, the field is required and the user is allowed
          // to add new terms, trigger click on "Add new".
          if (data.data.length == 0 && settings.settings.required && settings.settings.create_new_terms && (settings.settings.create_new_levels || (parent_value[0] == settings.any_value && default_value == 0))) {
            updateElements($element, base_id, settings, 1);
          }
        }
      },
      error: function(xhr, status, error) {
      }
    });
  }

  /**
   * Add a new term to database.
   *
   * @param $triggering_element
   *   Element to add the new term to.
   * @param $container
   *   Container for "Add new" elements.
   * @param term
   *   The new term object.
   * @param base_id
   *   ID of original field which is rewritten as "taxonomy_shs".
   * @param level
   *   Current level in hierarchy.
   * @param settings
   *   Field settings.
   */
  termAddNew = function($triggering_element, $container, term, base_id, level, settings) {
    $.ajax({
      url: Drupal.settings.basePath + '?q=' + Drupal.settings.pathPrefix + 'js/shs/json',
      type: 'POST',
      dataType: 'json',
      cache: true,
      data: {
        callback: 'shs_json_term_add',
        arguments: {
          vid: term.vid,
          parent: term.parent,
          name: term.name,
          field: settings.fieldName
        }
      },
      success: function(data) {
        if (data.success == true && data.data.tid) {
          if ($triggering_element.prop) {
            var options = $triggering_element.prop('options');
          }
          else {
            var options = $triggering_element.attr('options');
          }

          // Add new option with data from created term.
          options[options.length] = new Option(data.data.name, data.data.tid);
          // Set new default value.
          $triggering_element.val(data.data.tid);
          // Set value of original field.
          updateFieldValue($triggering_element, base_id, level, settings);
          // Add new child element if adding new levels is allowed.
          if (settings.settings.create_new_levels) {
            $element_new = shsElementCreate(base_id, settings, level + 1);
            $element_new.appendTo($triggering_element.parent());
            if ($element_new.prop) {
              var options_new = $element_new.prop('options');
            }
            else {
              var options_new = $element_new.attr('options');
            }
            // Add "none" option.
            options_new[options_new.length] = new Option(settings.any_label, settings.any_value);
            if (settings.settings.create_new_terms) {
              // Add option to add new item.
              options_new[options_new.length] = new Option(Drupal.t('<Add new item>', {}, {context: 'shs'}), '_add_new_');
            }
            // Try to convert the element to a "Chosen" element.
            if (!elementConvertToChosen($element_new, settings)) {
              // Display original dropdown element.
              $element_new.fadeIn(settings.display.animationSpeed);
              $element_new.css('display','inline-block');
            }
          }
        }
      },
      error: function(xhr, status, error) {
        // Reset value of triggering element.
        $triggering_element.val(0);
      },
      complete: function(xhr, status) {
        // Remove container.
        $container.prev('label').remove();
        $container.remove();
        // Display triggering element.
        $triggering_element.fadeIn(settings.display.animationSpeed);
        $triggering_element.css('display','inline-block');
      }
    });
  }

  /**
   * Update the changed element.
   *
   * @param $triggering_element
   *   Element which has been changed.
   * @param base_id
   *   ID of original field which is rewritten as "taxonomy_shs".
   * @param settings
   *   Field settings.
   * @param level
   *   Current level in hierarchy.
   */
  updateElements = function($triggering_element, base_id, settings, level) {
    // Remove all following elements.
    $triggering_element.nextAll('select').each(function() {
      if (Drupal.settings.chosen) {
        // Remove element created by chosen.
        var elem_id = $(this).attr('id');
        $element_chosen = $('#' + elem_id.replace(/-/g, '_') + '_chosen');
        if ($element_chosen) {
          $element_chosen.prev('label').remove();
          $element_chosen.remove();
        }
      }
      // Remove element.
      $(this).prev('label').remove();
      $(this).remove();
    });
    $triggering_element.nextAll('.shs-term-add-new-wrapper').remove();
    // Create next level (if the value is != 0).
    if ($triggering_element.val() == '_add_new_') {
      // Hide element.
      $triggering_element.hide();
      if (Drupal.settings.chosen) {
        // Remove element created by chosen.
        var elem_id = $triggering_element.attr('id');
        $('#' + elem_id.replace(/-/g, '_') + '_chosen').remove();
      }
      // Create new container with textfield and buttons ("cancel", "save").
      $container = $('<div>')
        .addClass('shs-term-add-new-wrapper')
        .addClass('clearfix');
      // Append container to parent.
      $container.appendTo($triggering_element.parent());

      // Add textfield for term name.
      $nameField = $('<input type="text">')
        .attr('maxlength', 255)
        .attr('size', 10)
        .addClass('shs-term-name')
        .addClass('form-text');
      $nameField.appendTo($container);

      // Add buttons.
      $buttons = $('<div>')
        .addClass('buttons');
      $buttons.appendTo($container);
      $cancel = $('<a>')
        .attr('href', '#')
        .html(Drupal.t('Cancel'))
        .bind('click', function(event) {
          event.preventDefault();
          // Remove container.
          $container.prev('label').remove();
          $container.remove();
          // Reset value of triggering element.
          $triggering_element.val(settings.settings.any_value);

          if (!elementConvertToChosen($triggering_element, settings)) {
            // Display triggering element.
            $triggering_element.fadeIn(settings.display.animationSpeed);
            $triggering_element.css('display','inline-block');
          }
        });
      $cancel.appendTo($buttons);
      if (level == 1 && settings.settings.required && $('option', $triggering_element).length == 1) {
        // Hide cancel button since the term selection is empty (apart from
        // "Add new term") and the field is required.
        $cancel.hide();
      }

      $save = $('<a>')
        .attr('href', '#')
        .html(Drupal.t('Save'))
        .bind('click', function(event) {
          event.preventDefault();
          // Get the new term name.
          var termName = $(this).parents('.shs-term-add-new-wrapper').find('input.shs-term-name').val();
          // Create a term object.
          var term = {
            vid: settings.vid,
            parent: (level === 1) ? 0 : ($triggering_element.prevAll('.shs-select').val() || 0),
            name: termName
          };
          if (termName.length > 0) {
            termAddNew($triggering_element, $container, term, base_id, level, settings);
          }
          else {
            // Remove container.
            $container.prev('label').remove();
            $container.remove();
            // Reset value of triggering element.
            $triggering_element.val(0);
            // Display triggering element.
            $triggering_element.fadeIn(settings.display.animationSpeed);
            $triggering_element.css('display', 'inline-block');;
          }
        });
      $save.appendTo($buttons);
    }
    else if ($triggering_element.val() != 0 && $triggering_element.val() != settings.any_value) {
      level++;
      $label = shsLabelCreate(base_id, settings, level);
      if ($label !== false) {
        $label.appendTo($triggering_element.parent());
      }
      $element_new = shsElementCreate(base_id, settings, level);
      $element_new.appendTo($triggering_element.parent());
      // Retrieve list of items for the new element.
      getTermChildren($element_new, settings, $triggering_element.val(), 0, base_id);
    }

    // Set value of original field.
    updateFieldValue($triggering_element, base_id, level, settings);
  }

  /**
   * Create a new <select> element.
   *
   * @param base_id
   *   ID of original field which is rewritten as "taxonomy_shs".
   * @param settings
   *   Field settings.
   * @param level
   *   Current level in hierarchy.
   *
   * @return
   *   The new (empty) <select> element.
   */
  shsElementCreate = function(base_id, settings, level) {
    // Create element and initially hide it.
    $element = $('<select>')
      .attr('id', base_id + '-select-' + level)
      .addClass('shs-select')
      // Add core class to apply default styles to the element.
      .addClass('form-select')
      .addClass('shs-select-level-' + level)
      .bind('change', function() {
        updateElements($(this), base_id, settings, level);
      })
      .hide();
    if (settings.multiple) {
      $element.attr('multiple', 'multiple')
    }
    if (settings.settings.hasOwnProperty('required') && settings.settings.required) {
      $element.addClass('required');
    }
    // Return the new element.
    return $element;
  }

  /**
   * Create label for dropdown in hierarchy.
   *
   * @param base_id
   *   ID of original field which is rewritten as "taxonomy_shs".
   * @param settings
   *   Field settings.
   * @param level
   *   Current level in hierarchy.
   *
   * @return
   *   The new <label> element or false if no label should be created.
   */
  shsLabelCreate = function(base_id, settings, level) {
    var labelKey = level - 1;
    if (!settings.hasOwnProperty('labels')) {
      return false;
    }
    if (!settings.labels.hasOwnProperty(labelKey) || settings.labels[labelKey] === false) {
      return false;
    }
    // Create element.
    $element = $('<label>')
      .attr('for', base_id + '-select-' + level)
      .addClass('element-invisible')
      .html(settings.labels[labelKey]);
    // Return the new element.
    return $element;
  }

  /**
   * Update value of original (hidden) field.
   *
   * @param $triggering_element
   *   Element which has been changed.
   * @param base_id
   *   ID of original field which is rewritten as "taxonomy_shs".
   * @param level
   *   Current level in hierarchy.
   * @param settings
   *   Field settings.
   */
  updateFieldValue = function($triggering_element, base_id, level, settings) {
    // Reset value of original field.
    $field_orig = $('#' + base_id);
    $field_orig.val(settings.any_value);
    // Set original field value.
    if ($triggering_element.val() === settings.any_value || $triggering_element.val() == '_add_new_') {
      if ($triggering_element.prev('select').length) {
        // Use value from parent level.
        $field_orig.val($triggering_element.prev('select').val());
      }
    }
    else {
      var new_val = $triggering_element.val();
      if (level > 1 && settings.multiple) {
        var new_value = '';
        for (i = 0; i < level - 1; i++) {
          var prev_value = $('.shs-select:eq(' + i + ')').val();
          if (i == 0) {
            new_value = prev_value;
          }
          else {
            new_value = new_value + '+' + prev_value;
          }
        }
        new_val = new_value;
      }
      // Use value from current field.
      if ($.isArray(new_val)) {
        $field_orig.val(new_val.join(','));
      }
      else {
        if ($field_orig.children('option[value="' + new_val + '"]').length > 0) {
          // Value exists.
          $field_orig.val(new_val);
        }
        else {
          // We need to append the new option.
          if ($field_orig.prop) {
            var options = $field_orig.prop('options');
          }
          else {
            var options = $field_orig.attr('options');
          }
          options[options.length] = new Option(new_val, new_val);
          $field_orig.val(new_val);
        }
      }
    }
    // Notify listeners about the change in the original select.
    $field_orig.trigger({
      type: 'change',
      shs: {
        triggeringElement: $triggering_element,
        level: level,
        settings: settings,
        value: $triggering_element.val()
      }
    });
  }

  /**
   * Convert a dropdown to a "Chosen" element.
   *
   * @see http://drupal.org/project/chosen
   */
  elementConvertToChosen = function($element, settings) {
    // Returns false if chosen is not available or its settings are undefined.
    if ($.fn.chosen === void 0 || !Drupal.settings.hasOwnProperty('chosen') || Drupal.settings.chosen === void 0) {
      return false;
    }

    var name = $element.attr('name');
    settings.chosen = settings.chosen || Drupal.settings.chosen;
    var minWidth = settings.chosen.minimum_width;
    var multiple = Drupal.settings.chosen.multiple;
    var maxSelectedOptions = Drupal.settings.chosen.max_selected_options;

    // Define options.
    var options = {
      inherit_select_classes: true
    };

    var minimum = multiple && multiple[name] ? settings.chosen.minimum_multiple : settings.chosen.minimum_single;

    if (maxSelectedOptions && maxSelectedOptions[name]) {
      options.max_selected_options = maxSelectedOptions[name];
    }

    // Merges the user defined settings for chosen.
    options = $.extend(options, settings.chosen);

    // Get element selector from settings (and remove "visible" option since
    // our select element is hidden by default).
    var selector = settings.chosen.selector.replace(/:visible/, '');
    if ((settings.settings.use_chosen === 'always') || ((settings.settings.use_chosen === 'chosen') && $element.is(selector) && ($element.find('option').size() >= minimum || minimum === 'Always Apply'))) {
      options = $.extend(options, {
        width: (($element.width() < minWidth) ? minWidth : $element.width()) + 'px'
      });

      // Apply chosen to the element.
      return $element.chosen(options);
    }
    else if ((settings.settings.use_chosen === 'never') && (!$element.hasClass('chosen-disable'))) {
      // Tell chosen to not process this element.
      $element.addClass('chosen-disable');
    }

    return false;
  }

})(jQuery, Drupal);
;
(function ($) {
  Drupal.behaviors.viewsBootstrapCarousel = {
    attach: function(context, settings) {
      $.each(settings.viewsBootstrap.carousel, function(id, carousel) {
        try {
          // Does the view have more than 1 item?
          // If not, hide the indicators and controls.
          if ($('#views-bootstrap-carousel-' + carousel.id + ' .carousel-inner .item').length > 1) {
            $('#views-bootstrap-carousel-' + carousel.id, context).carousel(carousel.attributes);
          }
          else {
            $('#views-bootstrap-carousel-' + carousel.id, context).find('.carousel-indicators').hide();
            $('#views-bootstrap-carousel-' + carousel.id, context).find('.carousel-control').hide();
          }
        }
        catch(err) {
          console.log(err);
        }
      });
    }
  };
})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {

  // Provide language prefix.
  if (Drupal.settings.pathPrefix) {
    var viewPath = Drupal.settings.pathPrefix + viewPath;
  }
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (var i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress-wrapper" aria-live="polite"></div>');
  this.element.html('<div id ="' + id + '" class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
                    '<div class="percentage sr-only"></div>' +
                    '</div></div>' +
                    '</div><div class="percentage pull-right"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.progress-bar', this.element).css('width', percentage + '%');
    $('div.progress-bar', this.element).attr('aria-valuenow', percentage);
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="alert alert-block alert-error"><a class="close" data-dismiss="alert" href="#">&times;</a><h4>Error message</h4></div>').append(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
    });
  }
};

Drupal.views = {};
Drupal.views.instances = {};

/**
 * Javascript object for a certain view.
 */
Drupal.views.ajaxView = function(settings) {
  var selector = '.view-dom-id-' + settings.view_dom_id;
  this.$view = $(selector);

  // Retrieve the path to use for views' ajax.
  var ajax_path = Drupal.settings.views.ajax_path;

  // If there are multiple views this might've ended up showing up multiple times.
  if (ajax_path.constructor.toString().indexOf("Array") != -1) {
    ajax_path = ajax_path[0];
  }

  // Check if there are any GET parameters to send to views.
  var queryString = window.location.search || '';
  if (queryString !== '') {
    // Remove the question mark and Drupal path component if any.
    var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
    if (queryString !== '') {
      // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
      queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
    }
  }

  this.element_settings = {
    url: ajax_path + queryString,
    submit: settings,
    setClick: true,
    event: 'click',
    selector: selector,
    progress: { type: 'throbber' }
  };

  this.settings = settings;

  // Add the ajax to exposed forms.
  this.$exposed_form = $('#views-exposed-form-'+ settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
  this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

  // Store Drupal.ajax objects here for all pager links.
  this.links = [];

  // Add the ajax to pagers.
  this.$view
    // Don't attach to nested views. Doing so would attach multiple behaviors
    // to a given element.
    .filter(jQuery.proxy(this.filterNestedViews, this))
    .once(jQuery.proxy(this.attachPagerAjax, this));

  // Add a trigger to update this view specifically. In order to trigger a
  // refresh use the following code.
  //
  // @code
  // jQuery('.view-name').trigger('RefreshView');
  // @endcode
  // Add a trigger to update this view specifically.
  var self_settings = this.element_settings;
  self_settings.event = 'RefreshView';
  this.refreshViewAjax = new Drupal.ajax(this.selector, this.$view, self_settings);
};

Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
  var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
  button = button[0];

  this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
};

Drupal.views.ajaxView.prototype.filterNestedViews= function() {
  // If there is at least one parent with a view class, this view
  // is nested (e.g., an attachment). Bail.
  return !this.$view.parents('.view').size();
};

/**
 * Attach the ajax behavior to each link.
 */
Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
  this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
  .each(jQuery.proxy(this.attachPagerLinkAjax, this));
};

/**
 * Attach the ajax behavior to a singe link.
 */
Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
  var $link = $(link);
  var viewData = {};
  var href = $link.attr('href');
  // Construct an object using the settings defaults and then overriding
  // with data specific to the link.
  $.extend(
    viewData,
    this.settings,
    Drupal.Views.parseQueryString(href),
    // Extract argument data from the URL.
    Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
  );

  // For anchor tags, these will go to the target of the anchor rather
  // than the usual location.
  $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

  this.element_settings.submit = viewData;
  this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
  this.links.push(this.pagerAjax);
};

Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
  // Scroll to the top of the view. This will allow users
  // to browse newly loaded content after e.g. clicking a pager
  // link.
  var offset = $(response.selector).offset();
  // We can't guarantee that the scrollable object should be
  // the body, as the view could be embedded in something
  // more complex such as a modal popup. Recurse up the DOM
  // and scroll the first element that has a non-zero top.
  var scrollTarget = response.selector;
  while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
    scrollTarget = $(scrollTarget).parent();
  }
  // Only scroll upward
  if (offset.top - 10 < $(scrollTarget).scrollTop()) {
    $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
  }
};

})(jQuery);
;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox') && (Drupal.settings.googleanalytics.trackColorbox)) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Downloads",
            "eventAction": Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(),
            "eventLabel": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", {
            "hitType": "pageview",
            "page": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Mails",
            "eventAction": "Click",
            "eventLabel": this.href.substring(7),
            "transport": "beacon"
          });
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode !== 2 || (Drupal.settings.googleanalytics.trackDomainMode === 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", {
              "hitType": "event",
              "eventCategory": "Outbound links",
              "eventAction": "Click",
              "eventLabel": this.href,
              "transport": "beacon"
            });
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga("send", {
        "hitType": "pageview",
        "page": location.pathname + location.search + location.hash
      });
    };
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.googleanalytics.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        ga("send", {
          "hitType": "pageview",
          "page": Drupal.googleanalytics.getPageUrl(href)
        });
      }
    });
  }

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
