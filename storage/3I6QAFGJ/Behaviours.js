var LoadingBehaviour = Marionette.Behavior.extend({
		loadingChannel : Backbone.Radio.channel('loading'),
		onShowLoading : function(blockEl){
			if(_.isUndefined(blockEl) || !$(blockEl).length){
				blockEl = this.view.$(this.getOption('blockElSelector'));
			}			
			if(!blockEl.length){
				blockEl = $(this.getOption('blockElSelector'));
			}
			if(!blockEl.length){
				blockEl = this.view.$el;
			}
			this.loadingChannel.trigger('show:loading', blockEl, this.getOption('spinnerOptions'));			
		},
		onHideLoading : function(blockEl){
			if(_.isUndefined(blockEl) || !$(blockEl).length){
				blockEl = this.view.$(this.getOption('blockElSelector'));
			}	
			if(!blockEl.length){
				blockEl = $(this.getOption('blockElSelector'));
			}
			if(!blockEl.length){
				blockEl = this.view.$el;
			}
			this.loadingChannel.trigger('hide:loading', blockEl);			
		},		
});
PreviewApp.Behaviors.LoadingBehaviour = LoadingBehaviour;