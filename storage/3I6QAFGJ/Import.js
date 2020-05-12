var gReportRefreshTimeout = 2000;

PreviewApp.module("Import", function(Import, PreviewApp, Backbone, Marionette){
	/**
	 * The following view will display a single job detail from an import report
	 */
	Import.DetailSingleView = Marionette.ItemView.extend({
		template : Handlebars.compile($("#import-job-single-detail-template").html()),
		templateHelpers : function(){			
			return {				
                    validationClass : this.model.getState() == gDetailFailedState ? 'invalid' : 'valid',
			};
		},		
	});
	
	Import.DetailsView = Marionette.CollectionView.extend({
		childView: Import.DetailSingleView,		
		tagName: "div",
	});
	
	/**
	 * This view will display an import job report, showing the current status of the job
	 * and all its details
	 */
	Import.JobReportView = Marionette.LayoutView.extend({
		template : Handlebars.compile($("#import-job-template").html()),
		regions : {
			nonSuccessfullyProcessedList : '#non-successfully-processed-list',
		},		
		ui: {
			progress : '.progress',
			progressWrapper : '.progress-wrapper',
			detailsSummaryHolder : '#details-summary-holder'
		},
		templateHelpers : function(){				
			return {				
                    validationClass : this.model.getStateId() == gImportJobFailedState ? 'invalid' : 'valid',
                    stateName : this.model.isJobFinished() ? this.model.getState() : 'Processing',
                    closeIsAllowed : this.model.isJobFinished(),
                    allDetailsCnt : this.model.getDetailsCnt(),
                    processedDetailsCnt : this.model.getProcessedDetailsCnt(),
                    summaryMsg : this.model.getNonSuccessfullyProcessedDetailsCnt() ? 'The following records were not processed successfully' : 'All details were processed successfully',
			};
		},		
		events : function(){
			return {
				'click .close-btn' : "closeReport",				
			};
		},
		closeReport : function(){
			//We wont allow closing while the import job is not finished
			if(this.isDestroyed || !this.model.isJobFinished()){
				return;
			}			
			//We will mark all the different parent instances as modified
			var differentParentIds = [];
			this.model.getDetails().each(function(detail){
				var parentInstanceId = detail.getParentInstanceId();
				if(differentParentIds.indexOf(parentInstanceId) == -1){
					differentParentIds.push(parentInstanceId);
				}
			});
			for(var i = 0; i < differentParentIds.length; ++i){
				this.actionsChannel.trigger('instance:modified', differentParentIds[i]);
			}		
			this.destroy();									
		},
		initialize : function(options){		
			this.globalChannel = Backbone.Radio.channel('global');
			this.documentId = this.globalChannel.request('document:id');
			this.documentModel = this.globalChannel.request('document:model');			
			this.actionsChannel = Backbone.Radio.channel('actions');						
		},		
		/**
		 * We will reload the report every 2 seconds
		 * if the job is not finished
		 */
		setReloadTimeout : function(){
			if(this.isDestroyed || this.model.isJobFinished()){
				return;
			}
			setTimeout(function(){ 
				this.model.fetch().done(function(){
					if(this.isDestroyed){
						return;
					} 					
					this.render();
				}.bind(this)).fail(function(){
					this.setReloadTimeout();
				}.bind(this));
			 }.bind(this), gReportRefreshTimeout);
		},		
		/**
		 * Renders the progress bar when the import is currently processing
		 */
		renderProgress: function(){			
			if(this.model.isJobFinished()){
				//The job is finished - hide the progressbar
				this.ui.progressWrapper.hide();
				return;
			};
			this.ui.progressWrapper.show();
			var processedDetailsCnt = this.model.getProcessedDetailsCnt();
			var allDetailsCnt = this.model.getDetailsCnt();
			this.ui.progress.progressbar({
			  max: allDetailsCnt,
			  value: processedDetailsCnt,
			});
		},
		/**
		 * Renders the summary for the import after the import job has finished.
		 * If all the details were processed successfully - only a success msg is displayed. 
		 * Otherwise - lists all the details which were not processed successfully
		 * (e.g. failed during processing, not processed due to job error, etc),
		 */
		renderDetailsSummary: function(){
			if(!this.model.isJobFinished()){
				//The job is not finished - dont show any summary
				this.ui.detailsSummaryHolder.hide();
				return;
			};									
			this.ui.detailsSummaryHolder.show();
			var collectionView = new Import.DetailsView({
				collection : this.model.getNonSuccessfullyProcessedDetails(),				
			});
			this.nonSuccessfullyProcessedList.show(collectionView);			
		},	
		onRender : function() {
			this.renderDetailsSummary();
			this.renderProgress();
			this.setReloadTimeout();
		},	
		//Here we will not remove the popup $el because it may be needed later. Instead we will empty its content
	    remove: function() {
	      this.$el.html('');
	      this.stopListening();
	      return this;
	    },
	});
	/**
	 * This controller will handle tasks associated with showing reports about import jobs
	 */
	Import.Controller = Marionette.Object.extend({
		initialize : function(options){
			this.globalChannel = Backbone.Radio.channel('global');
			this.popupChannel = Backbone.Radio.channel('popup');			
			this.documentId = this.globalChannel.request('document:id');
			this.globalChannel.on('preview:ready', function(){				
				this.globalChannel.on('document:import:report:show', this.showImportJobReport.bind(this));				
			}.bind(this));
			
		},
		onShowLoading : function(){
			$.blockUI({
				message: '<div class="dialog-loading-spinner"></div>',
				overlayCSS: {
					opacity: 0.3,
				},
				css: {
					width: '100%',
					height: '100%',
					top: '0px',
					left: '0px',
					background:'transparent',
				}
			});
			$('body').find('.dialog-loading-spinner').spin({});
		},
		onHideLoading : function(){
			$.unblockUI();	
		},
		/**
		 * Show the import job report, after an import job has been created
		 * @returns
		 */
		showImportJobReport : function(jobId){
			if(!jobId){
				return;
			}
			this.triggerMethod('show:loading');
			var jobModel = new PreviewApp.Model.ImportJob({id : String(jobId)});
			jobModel.fetch().done(function(){
				this.triggerMethod('hide:loading');
				var view = new Import.JobReportView({
					$el : $('#popup-content'),
					el : $('#popup-content'),
					model : jobModel,					
				});
				this.popupChannel.trigger('base:popup:open', view);
			}.bind(this)).error(function(){
				this.triggerMethod('hide:loading');
			});
		},		
	});
	
	

});
