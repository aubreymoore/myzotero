/* global google */
var AOP = AOP || {};

AOP.metrics = {

  $metricsTabContent: null,
  $metricsLoader: null,
  $metricsContentArea: null,
  $metricsTabButton: null,

  chartsToRender: [],
  chartCount: 0,

  init: function (opts) {
    var _self = this;
    _self.chartsToRender = opts.chartsToRender;
    _self.limitSingleChartWidth = opts.limitSingleChartWidth || false;
    _self.$metricsTabContent = $('#metrics');
    _self.$metricsLoader = this.$metricsTabContent.find('.loader');
    _self.$metricsContentArea = this.$metricsTabContent.find('.reading-width');
    _self.$metricsTabButton = $('.tab-title a[href="#metrics"]');
    // Keep track of the number of valid charts we have to render
    this.countChartsToRender();
    // If the user has re-sized the page while the tab has not been visible,
    // need re-render the charts so they fit correctly on the page.
    _self.$metricsTabButton.on('click', function () {
      // Set a brief timeout to let the tab become visible, google charts
      // cannot render a graph correctly unless the element is visible in the DOM.
      setTimeout(function () {
        _self.renderCharts();
      }, 250);
    });
    if (_self.$metricsTabContent.is(':visible')) {
      _self.renderCharts();
    }
  },

  /**
   * Count how many valid charts have been passed in
   */
  countChartsToRender: function () {
    var _self = this;
    _self.chartsToRender.forEach(function (chart) {
      if (chart.data && chart.data.length > 0) {
        _self.chartCount++;
      }
    });
  },
  /**
   * Set loader size and display
   */
  showLoader: function (screenWidth) {
    this.$metricsLoader
      .css({width: screenWidth, height: Math.ceil(screenWidth / 2)})
      .find('>div').fadeIn();
  },

  /**
   * Hide the loader
   */
  hideLoader: function () {
    this.$metricsLoader.hide();
  },

  /**
   * Get the width the area to render the chart into
   * @returns {*|jQuery}
   */
  getTargetChartWidth: function () {
    // Get current chart container width
    var chartWidth = this.$metricsContentArea.width() || 300;
    // If we only have the single chart AND we are dealing with screen size larger than a standard table, reduce
    // the width the the graph to improve screen visuals.
    if (this.limitSingleChartWidth && this.chartCount === 1 && window.innerWidth > 1024) {
      chartWidth = chartWidth * 0.7;
    }
    return chartWidth;
  },

  /**
   * Render a single chart
   * @param opts
   */
  renderSingleChart: function (opts) {
    var _self = this;
    if (opts.data && opts.data.length > 0) {
      var chart = AOP.charts.initChart(opts);
      chart.draw();
      $(window).resize(function () {
        var chartWidth = _self.getTargetChartWidth();
        chart.draw({width: chartWidth});
      });
    }
  },

  /**
   * Render all the supplied charts
   */
  renderCharts: function () {
    var _self = this;
    var width = _self.getTargetChartWidth();
    _self.showLoader(width);
    AOP.charts.load({packages: ['corechart', 'bar']}, function () {
      _self.hideLoader();
      _self.chartsToRender.forEach(function (chart) {
        chart.width = width;
        _self.renderSingleChart(chart);
      });
    });
  }

};
