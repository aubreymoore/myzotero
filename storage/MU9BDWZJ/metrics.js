var AOP=AOP||{};AOP.metrics={$metricsTabContent:null,$metricsLoader:null,$metricsContentArea:null,$metricsTabButton:null,chartsToRender:[],chartCount:0,init:function(opts){var _self=this;_self.chartsToRender=opts.chartsToRender;_self.limitSingleChartWidth=opts.limitSingleChartWidth||false;_self.$metricsTabContent=$('#metrics');_self.$metricsLoader=this.$metricsTabContent.find('.loader');_self.$metricsContentArea=this.$metricsTabContent.find('.reading-width');_self.$metricsTabButton=$('.tab-title a[href="#metrics"]');this.countChartsToRender();_self.$metricsTabButton.on('click',function(){setTimeout(function(){_self.renderCharts();},250);});if(_self.$metricsTabContent.is(':visible')){_self.renderCharts();}},countChartsToRender:function(){var _self=this;_self.chartsToRender.forEach(function(chart){if(chart.data&&chart.data.length>0){_self.chartCount++;}});},showLoader:function(screenWidth){this.$metricsLoader.css({width:screenWidth,height:Math.ceil(screenWidth/2)}).find('>div').fadeIn();},hideLoader:function(){this.$metricsLoader.hide();},getTargetChartWidth:function(){var chartWidth=this.$metricsContentArea.width()||300;if(this.limitSingleChartWidth&&this.chartCount===1&&window.innerWidth>1024){chartWidth=chartWidth*0.7;}
return chartWidth;},renderSingleChart:function(opts){var _self=this;if(opts.data&&opts.data.length>0){var chart=AOP.charts.initChart(opts);chart.draw();$(window).resize(function(){var chartWidth=_self.getTargetChartWidth();chart.draw({width:chartWidth});});}},renderCharts:function(){var _self=this;var width=_self.getTargetChartWidth();_self.showLoader(width);AOP.charts.load({packages:['corechart','bar']},function(){_self.hideLoader();_self.chartsToRender.forEach(function(chart){chart.width=width;_self.renderSingleChart(chart);});});}};