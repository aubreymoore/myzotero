(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $toggle = $($(fieldset).find('[data-toggle=collapse]').data('target'));
  if ($toggle.length) {
    $toggle.collapse('toggle');
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      var $body = $fieldset.find('> .panel-collapse');
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
        $body.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend);

      // Bind Bootstrap events with Drupal core events.
      $fieldset
        .append(summary)
        .on('show.bs.collapse', function () {
          $fieldset
            .removeClass('collapsed')
            .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
          $body.removeClass('collapsed');
        })
        .on('shown.bs.collapse', function () {
          $fieldset.trigger({ type: 'collapsed', value: false });
          Drupal.collapseScrollIntoView($fieldset.get(0));
        })
        .on('hide.bs.collapse', function () {
          $fieldset
            .addClass('collapsed')
            .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
          $body.addClass('collapsed');
        })
        .on('hidden.bs.collapse', function () {
          $fieldset.trigger({ type: 'collapsed', value: true });
        });
    });
  }
};

})(jQuery);
;
(function ($) {

  Drupal.leaflet._create_layer_orig = Drupal.leaflet.create_layer;

  Drupal.leaflet.create_layer = function(layer, key) {
    if (layer.type === 'quad') {
      var mapLayer = L.tileLayerQuad(layer.urlTemplate, layer.options);
      mapLayer._leaflet_id = key;
      mapLayer._type = 'quad';
      return mapLayer;
    }
    if (layer.type === 'google' && layer.options.detectRetina && L.Browser.retina) {
      layer.urlTemplate += '&style=high_dpi&w=512';
      layer.options.tileSize = 512;
      var mapLayer = L.tileLayer(layer.urlTemplate, layer.options);
      mapLayer._leaflet_id = key;
      mapLayer._type = 'google';
      return mapLayer;
    }
    // Default to the original code;
    return Drupal.leaflet._create_layer_orig(layer, key);
  };

})(jQuery);

L.TileLayerQuad = L.TileLayer.extend({

  getTileUrl: function(tilePoint) {
    this._adjustTilePoint(tilePoint);

    return L.Util.template(this._url, L.extend({
      s: this._getSubdomain(tilePoint),
      q: this._xyzToQuad(tilePoint.x, tilePoint.y, this._getZoomForUrl())
    }, this.options));
  },

  /** Convert xyz tile coordinates to a single quadtree key string.
   *
   * The length of the quadkey equals the zoom level. Note: zoom > 0.
   *
   * Adapted from http://msdn.microsoft.com/en-us/library/bb259689.aspx
   */
  _xyzToQuad: function(x, y, zoom) {
    var quadKey = '', digit, mask;
    for (var z = zoom; z > 0; z--) {
      digit = 0;
      mask = 1 << (z - 1);
      if ((x & mask) !== 0) {
        digit = 1;
      }
      if ((y & mask) !== 0) {
        digit += 2;
      }
      // At this point digit equals 0, 1, 2 or 3. Append digit to quad key and
      // advance to the next zoom level to calculate the next digit.
      quadKey += digit;
    }
    return quadKey;
  }
});

L.tileLayerQuad = function(urlTemplate, options) {
  return new L.TileLayerQuad(urlTemplate, options);
};
;
