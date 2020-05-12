PreviewApp.module("Loading", function(Loading, PreviewApp, Backbone, Marionette){
	/**
	 * This controller will handle tasks associated with showing and hiding loading indicators	 * 	 
	 */
	Loading.Controller = Marionette.Object.extend({
		initialize : function(options){
			this.loadingChannel = Backbone.Radio.channel('loading');
			this.loadingChannel.on('show:loading', this._onShowLoading.bind(this));
			this.loadingChannel.on('hide:loading', this._onHideLoading.bind(this));
			this.loadingChannel.on('ui:block', this._onBlockUi.bind(this));
			this.loadingChannel.on('ui:unblock', this._onUnblockUi.bind(this));
		},
		_onBlockUi : function(spinnerConfig){
			blockUi();
		},
		_onUnblockUi : function(element){			
			unblockUi();
		},
		_onShowLoading : function(element, spinnerConfig){
			var $element = $(element);
			
			if($element.length){				
				$element.block({
					message: '<span class="dialog-loading-spinner"></span>',
					overlayCSS: {
						opacity: 0.3
					},
					css: {
						width: '100%',
						height: '100%',
						background: 'transparent'
					}
				});
				$element.find('.dialog-loading-spinner').spin(spinnerConfig);				
			}
		},
		_onHideLoading : function(element){
			var $element = $(element);
			if($element.length){				
				$element.unblock();
			}
		},
	});
});
