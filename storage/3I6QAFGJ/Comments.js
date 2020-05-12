var gArticlePreviewContentId = '#P-Article-Preview-Content';
var gHeaderCommentsFilter = '#P-Header-Comments-Filter';
var gFilterByTypeContent = '.P-Filter-By-Type-Content';
var gFilterByType = '.P-Filter-By-Type';
var gFilterDropdown = '.P-Filter-Drop-Down';


var gCommentMarkNodeName = 'mark';
var gCommentStartPosNodeName = 'data-comment-start';
var gCommentEndPosNodeName = 'data-comment-end';
var gCommentIdAttributeName = 'data-comment-id';
var gCommentInCirationAttributeName = 'data-is-citation = "1"';

var gCommentsAjaxUrl = '/rest/comments/';
var gCommentsReplyAjaxUrl = '/rest/comment/reply/';
var gCommentHiddenPreviewElementClass = 'P-Preview-Comment-Hidden';
var gCommentPreviewElementClass = 'P-Preview-Comment';
var gActiveCommentHolderClass = 'Active-Comment-Holder';
var gTextCommentIdAttribute = 'comment_id';
var gCommentToolbarDropdown = '.P-Comment-Toolbar-Dropdown';
var gCommentBtnsOpacityActive = 1;
var gCommentBtnsOpacityDeactive = 0.3;
var gCommentCitations = ['tbls-citation', 'fig-citation', 'sup-files-citation', 'endnotes-citation', 'cite'];
PreviewApp.module("Comments", function(Comments, PreviewApp, Backbone, Marionette){

	// MODELS
	Comments.comment = Brace.Model.extend({
		urlRoot: function(){
			var documentId = this.get('document_id');
			var isReply = this.get('is_reply');
			var isNew = this.get('is_new');
			var rootId = this.get('comment_id');
			var commentId = this.get('comment_id');
			var versionId = this.get('version_id');
			var roundUserId = this.get('round_user_id');

			var res = gCommentsReplyAjaxUrl + documentId;
			if(versionId){
				res += '/' + versionId;
			}
			if(roundUserId){
				res += '/' + roundUserId;
			}

			if(isReply == 1 && isNew == 1){
				res += '/'+ rootId;
			}
			if(isReply == 1 && isNew == 0){
				res += '';
			}
			return res;
		},
		namedAttributes: {
			id: Number,
			document_id: Number,
			version_id: Number,
			round_user_id: Number,
			comment_id: Number,
			photo_id: Number,
			instance_id: Number,
			end_field_id: Number,
			end_instance_id: Number,
			end_offset: Number,
			start_field_id: Number,
			start_instance_id: Number,
			start_offset: Number,
//			start_node_vertical_offset: Number,
			is_deleted: Number,
			is_resolved: Number,
			can_edit: Number,
			can_comment: Number,
			rootid: Number,
			message: "string",
			username: "string",
			createdate: "string",
			plain_createdate: "string",
			createdate_in_seconds: "string",
			resolve_fullname: "string",
			resolve_date: "string",
			comment_selection: "string",
			replyIds: ['string'],
			is_disclosed: Number,
			is_reply: Number,
			usr_id: Number,
			round_id: Number,
			is_new: Number,
			isVisible: Boolean,
		},
		isNew: function(){
			return !this.id || this.id < 0;
		},
		defaults: {
			is_reply: 0,
			is_new: 1,
			isVisible: true,
		}
	});
	// COLLECTIONS
	Comments.comments = Backbone.Collection.extend({
		model: Comments.comment,
		initialize: function(models, options){
			Backbone.Collection.prototype.initialize.call(this, models, options);
			var options = options || {};
			this.documentId = options.documentId;
			this.versionId = options.versionId;
			this.roundUserId = options.roundUserId;
		},
		url: function(){
			var res = gCommentsAjaxUrl + this.documentId;
			if(this.versionId){
				res += '/' + this.versionId;
			}
			if(this.roundUserId){
				res += '/' + this.roundUserId;
			}
			return res;
		},

	});
	Comments.userFilterModel = Brace.Model.extend({
		namedAttributes: {
			id: Number,
			username: 'string',
		},
	});

	Comments.roundFilterModel = Brace.Model.extend({
		namedAttributes: {
			id: Number,
		},
	});

	Comments.usersFilterCollection = Backbone.Collection.extend({
		model: Comments.userFilterModel,
	});
	Comments.roundsFilterCollection = Backbone.Collection.extend({
		model: Comments.roundFilterModel,
	});
	Comments.filterModel = Brace.Model.extend({
		namedAttributes: {
			showResolved: 'boolean',
			showDeleted: 'boolean',
			selectUsers: ['string'],
			showUsers: 'boolean',
			startDate: 'string',
			endDate: 'string',
			selectRounds: ['string'],
			showRounds: 'boolean',
		},
		defaults: {
			showResolved: false,
			showDeleted: true,
			selectUsers: [],
			showUsers: false,
			startDate: '',
			endDate: '',
			selectRounds: [],
			showRounds: false,
		}
	});

	Comments.pageModel = Brace.Model.extend({
		namedAttributes: {
			filter: Comments.filterModel,
			activeCommentId: 'string',
			lastActiveCommentId: 'string',
		},
		defaults: {
			filter: new Comments.filterModel(),
		},
		initialize: function(){
			this.newCommentId = -1;
		},
		getNewCommentId: function(){
			return this.newCommentId--;
		},
	});
	Comments.selectionPositionModel = Brace.Model.extend({
		namedAttributes: {
			start_instance_id: Number,
			start_field_id: Number,
			end_instance_id: Number,
			end_field_id: Number,
//			start_node_vertical_offset: Number,
			selection_is_empty: 'boolean',
			isCommentingAllowed: 'boolean',
			comment_selection: 'string',
			is_read_only: 'boolean',
			canComment : 'boolean'
		},
		initialize: function(){
			this.globalChannel  = Backbone.Radio.channel('global');
			this.documentModel = this.globalChannel.request('document:model');
			this.documentCanComment = this.documentModel.getCanComment();
		},
		defaults: {
			selection_is_empty: true,
			isCommentingAllowed: false,
			comment_selection: '',
			
		},
		isCommentingAllowed: function () {
			if(this.documentCanComment){
				return true;
			}else
				return false;
//			if(!this.get('is_read_only') && this.get('start_instance_id') && this.get('start_field_id')
//					&& this.get('end_instance_id') && this.get('end_field_id')) {
//				return true;
//			} else if(this.get('is_read_only') && this.get('start_instance_id') && this.get('start_field_id')
//					&& this.get('end_instance_id') && this.get('end_field_id')
//					&& !this.get('selection_is_empty')) { //read-only mode -> check for not empty selection
//				return false;
//			}
//			return false;
		},
	});

	Comments.userView = Marionette.LayoutView.extend({
		tagName: 'label',
		className: 'unselectable',
		template: Handlebars.compile($("#comment-filter-users").html()),
		ui: {
			checkbox: '.filter_users',
		},
		events: {
			'click @ui.checkbox': 'updateFilter',
		},
		initialize: function () {
			this.commentChannel = Backbone.Radio.channel('comment');
			this.pageModel = this.commentChannel.request('get:page:model');
			this.filterModel = this.pageModel.getFilter();
		},
		updateFilter: function(){
			var selectUsers = this.filterModel.getSelectUsers();

			if(_.indexOf(selectUsers, this.model.id) == -1 && this.ui.checkbox.is(':checked')){
				selectUsers.push(this.model.id);
			}else if(!this.ui.checkbox.is(':checked')){
				selectUsers.splice(_.indexOf(selectUsers, this.model.id));
			}

			if(this.filterModel.getShowUsers()){
				this.filterModel.setShowUsers(false);
			}else{
				this.filterModel.setShowUsers(true);
			}
		},
		onRender: function(){
			if(_.indexOf(this.filterModel.getSelectUsers(), this.model.id) != -1 ){
				this.$el.find("input").prop("checked", true);
			}
		}
	});
	Comments.emptyUserView = Marionette.LayoutView.extend({
		tagName: 'label',
		className: '',
		template: Handlebars.compile($("#comment-filter-users-empty").html()),
	});
	Comments.usersView = Marionette.CollectionView.extend({
		tagName: 'div',
		childView: Comments.userView,
		collection: Comments.usersFilterCollection,
		emptyView: Comments.emptyUserView,
		initialize: function () {
			this.commentChannel = Backbone.Radio.channel('comment');
		},
	});
	Comments.roundView = Marionette.LayoutView.extend({
		tagName: 'label',
		className: 'unselectable',
		template: Handlebars.compile($("#comment-filter-rounds").html()),
		ui: {
			checkbox: '.filter_rounds',
		},
		events: {
			'click @ui.checkbox': 'updateFilter',
		},
		initialize: function () {
			this.commentChannel = Backbone.Radio.channel('comment');
			this.pageModel = this.commentChannel.request('get:page:model');
			this.filterModel = this.pageModel.getFilter();
		},
		updateFilter: function(){
			var selectRounds = this.filterModel.getSelectRounds();

			if(_.indexOf(selectRounds, this.model.id) == -1 && this.ui.checkbox.is(':checked')){
				selectRounds.push(this.model.id);
			}else if(!this.ui.checkbox.is(':checked')){
				selectRounds.splice(_.indexOf(selectRounds, this.model.id));
			}

			if(this.filterModel.getShowRounds()){
				this.filterModel.setShowRounds(false);
			}else{
				this.filterModel.setShowRounds(true);
			}
		},
		onRender: function(){
			if(_.indexOf(this.filterModel.getSelectRounds(), this.model.id) != -1 ){
				this.$el.find("input").prop("checked", true);
			}
		}
	});
	Comments.emptyRoundView = Marionette.LayoutView.extend({
		tagName: 'label',
		className: '',
		template: Handlebars.compile($("#comment-filter-rounds-empty").html()),
	});
	Comments.roundsView = Marionette.CollectionView.extend({
		tagName: 'div',
		childView: Comments.roundView,
		collection: Comments.roundsFilterCollection,
		emptyView: Comments.emptyRoundView,
		initialize: function () {
			this.commentChannel = Backbone.Radio.channel('comment');
		},
	});
	// ITEMS	
	Comments.showCommentBtnView = Marionette.ItemView.extend({
		template: Handlebars.compile($("#show-comment-btn").html()),
		initialize: function(options){
			this.commentChannel = Backbone.Radio.channel('comment');
			this.$el = $('<div class="showCommentBtnBubble" id="showCommentBtnBubble"><div class="P-Comment-Btn" id="P-Comment-Btn-Bubble" title="To add a comment please select text first(Ctrl+Alt+M)"><img src="/i/comment_icon-empty.svg" alt="" width="40" height="40"></div></div>').appendTo('#P-Wrapper-Preview');
		
			this.commentChannel.on('commenting:allowed', this.show.bind(this));
			this.commentChannel.on('commenting:forbidden', this.hide.bind(this));
			this.commentChannel.on('commenting:hidebtn', this.hide.bind(this));
			this.commentChannel.on('add:hotkey:comment', this.addNewComment.bind(this));
			$(window).resize(function (e) {
				this.positionButton(e);
			}.bind(this));
		},
		ui: {
			btnAddComment: '#P-Comment-Btn-Bubble',
		},
		events: {
			'click @ui.btnAddComment' : 'addNewComment',
		},
		addNewComment: function(){
			this.commentChannel.trigger('commenting:add_new_comment');
			this.$el.hide();
		},
		show: function(e){
			var el = this.$el;
			var container = $('.P-Wrapper-Container-Middle');
			var containerOffset = container.offset();
			var containerWidth = container.outerWidth();		
			
			el.css({
				top : e.pageY - 55 + 'px',
				left : (containerOffset.left + containerWidth - 52) + 'px',
				display: 'block',
				position: 'absolute',
				zIndex: '8888',
			});
		},
		positionButton: function(e) {
			var el = this.$el;
			var container = $('.P-Wrapper-Container-Middle');
			var containerOffset = container.offset();
			var containerWidth = container.outerWidth();		
			
			el.css({
				top : e.pageY - 55 + 'px',
				left : (containerOffset.left + containerWidth - 52) + 'px'
			});
		},
		hide: function(e){
			this.$el.hide();
		}
	});
	Comments.noCommentView = Marionette.ItemView.extend({
		template: Handlebars.compile($("#no-comment-row").html()),
	});
	Comments.newCommentPostFormView = Marionette.ItemView.extend({
		template: Handlebars.compile($("#new-preview-comment-form").html()),
	});
	Comments.editFormView = Marionette.ItemView.extend({
		template: Handlebars.compile($("#edit-comment-form").html()),
		ui: {
			textarea_edit_mode: 'textarea',
			btnSave: '#btn-save-comment',
			btnCancel: '#btn-cancel-comment',
		},
		events: {
			'click @ui.btnSave': 'saveComment',
			'click @ui.btnCancel': 'cancelComment',
		},
		initialize: function(){
			this.globalChannel  = Backbone.Radio.channel('global');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.contentChannel = Backbone.Radio.channel('content');
			this.documentId = this.globalChannel.request('document:id');
			this.commentChannel.on('save:comment', this.saveComment.bind(this));
			this.ckeEditor;
		},
		focusForm: function(){
			this.ckeEditor.focus();
		},
		onDomRefresh: function(){
			if(this.isLoaded){
				return;
			}

			var textareaId = this.ui.textarea_edit_mode.attr('id');
			this.ckeEditor = this.commentChannel.request('cke:initialize', textareaId);
			this.ui.btnSave.hide();
			this.ui.btnCancel.css('opacity', gCommentBtnsOpacityActive);

			var _this = this;
			this.ckeEditor.on("focus", function(){
				if(_this.ckeEditor.getData() == ''){
					_this.ui.btnSave.hide();
				}
			});
			this.ckeEditor.on("key", function(){
				setTimeout(function() {
					if(_this.ckeEditor.getData() == ''){
						_this.ui.btnSave.hide();
					}else{
						_this.ui.btnSave.show();
						_this.ui.btnSave.css('opacity', gCommentBtnsOpacityActive);
						_this.ui.btnCancel.css('opacity', gCommentBtnsOpacityActive);
					}
				}, 10);
			});

			this.isLoaded = true;
		},

		/**
		 * After save if the comment has been created its id is changed
		 * and we need to update the start/end markers to have the new id
		 * @param oldId
		 */
		updateCommentMarkers: function(oldId){
			var content = $('#' + gPreviewIframeId).contents();
			content.find('*['+gCommentIdAttributeName+'="'+oldId+'"]').attr(gCommentIdAttributeName, this.model.id);
			content.find('*[comment_id="'+oldId+'"]').attr('comment_id', this.model.id);
		},
		saveComment: function(){
			this.model.set('document_id', this.documentId);
			var newValue = this.ckeEditor.getData();
			if(newValue == ''){
				this.triggerMethod('comment:deleted', {confirm: 0});
				return;
			}
			var additionalAttributes = {

			};
			var modelIsNew = this.model.isNew();
			var oldId = this.model.id;
			if(modelIsNew){
				additionalAttributes.id = undefined;
			}
			this.model.set('message', newValue);
			var isEditable = this.commentChannel.request('get:document:editable');
			
			if(isEditable && gCurrentInlineCKEInstanceName != '') {
//				this.getCKEditorInstance(gCurrentInlineCKEInstanceName).setReadOnly(false);
			}
			this.model.save(additionalAttributes, {
				success:function(){
					if(modelIsNew){
						this.updateCommentMarkers(oldId);
						var startInstanceId = this.model.get("start_instance_id");
						var startFieldId = this.model.get("start_field_id");
						var endInstanceId = this.model.get("end_instance_id");
						var endFieldId = this.model.get("end_field_id");
						var isEditable = this.commentChannel.request('get:document:editable');
						var commentId = this.model.get('id');
						var addReadOnly = '';
						if(!isEditable) {
							addReadOnly = ':readonly';
						}
						this.contentChannel.request('field:save' + addReadOnly, startInstanceId.toString(), startFieldId.toString(), commentId);
						if(startInstanceId != endInstanceId || startFieldId != endFieldId) {
							this.contentChannel.request('field:save' + addReadOnly, endInstanceId.toString(), endFieldId.toString(), commentId);
						}
						if(isEditable && gCurrentInlineCKEInstanceName != '') {
//							this.getCKEditorInstance(gCurrentInlineCKEInstanceName).setReadOnly(true);
						}
					}
					this.triggerMethod('comment:edited');
				}.bind(this)
			});
		},
		cancelComment: function(){
			if(this.model.isNew()){
				this.trigger('comment:deleted');
			}else{
				this.trigger('comment:canceled');
			}
		},
		destroy: function(){
			this.remove();
			this.unbind();
		},
		getCKEditorInstance: function(name){
			return $('#previewIframe')[0].contentWindow.CKEDITOR.instances[name];
		}
	});
	Comments.editReplyFormView = Marionette.ItemView.extend({
		template: Handlebars.compile($("#edit-reply-comment-form").html()),
		ui: {
			textarea_edit_reply_mode: 'textarea',
			btnAddReply: '#btn-save-reply-comment',
			btnCancelReply: '#btn-cancel-reply-comment',
		},
		events: {
			'click @ui.btnAddReply': 'editReply',
			'click @ui.btnCancelReply': 'cancelReply',
		},
		initialize: function(){
			this.globalChannel  = Backbone.Radio.channel('global');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.documentId = this.globalChannel.request('document:id');
			this.commentChannel.on('save:comment:reply', this.editReply.bind(this));
			this.ckeEditor;
		},
		onLoad: function(){
			var textareaId = this.ui.textarea_edit_reply_mode.attr('id');
			this.ckeEditor = this.commentChannel.request('cke:initialize', textareaId);

			var _this = this;

			this.ckeEditor.on("focus", function(){
				data = _this.ckeEditor.getData();

				if(data == ''){
					_this.ui.btnAddReply.hide();
					_this.ui.btnAddReply.css('opacity', gCommentBtnsOpacityDeactive);
					_this.ui.btnCancelReply.css('opacity', gCommentBtnsOpacityDeactive);
				}else{
					_this.ui.btnAddReply.show();
					_this.ui.btnAddReply.css('opacity', gCommentBtnsOpacityActive);
					_this.ui.btnCancelReply.css('opacity', gCommentBtnsOpacityActive);
				}

			});

			this.ckeEditor.on("key", function(){
				setTimeout(function(){
					data = _this.ckeEditor.getData();

					if(data == ''){
						_this.ui.btnAddReply.hide();
						_this.ui.btnAddReply.css('opacity', gCommentBtnsOpacityDeactive);
						_this.ui.btnCancelReply.css('opacity', gCommentBtnsOpacityDeactive);
					}else{
						_this.ui.btnAddReply.show();
						_this.ui.btnAddReply.css('opacity', gCommentBtnsOpacityActive);
						_this.ui.btnCancelReply.css('opacity', gCommentBtnsOpacityActive);
					}
				}, 10);
			});

		},
		editReply: function(){
			var message = this.ckeEditor.getData();
			if(message == ''){
				this.triggerMethod('comment:deleted', {confirm: 0});
				return;
			}
			this.model.set('message', message);
			this.model.save(null, {
				success:function(){
					this._renderTemplate();
					this.triggerMethod('comment:edited');
				}.bind(this)
			});
		},
		cancelReply: function(){
			this.triggerMethod('comment:canceled');
		},
		destroy: function(){
			this.remove();
			this.unbind();
		}
	});
	Comments.filterView = Marionette.LayoutView.extend({
		tagName: 'div',
		className: 'P-Header-Comments-Filter-Content',
		template: Handlebars.compile($("#comments-filter").html()),
		ui: {
			btnUsers: '.P-Filter-By-Username',
			btnStartDate: '#comments_filter_start_date',
			btnEndDate: '#comments_filter_end_date',
			btnRounds: '.P-Filter-By-Rounds',
			btnDates: '.P-Filter-By-Date',
			btnResolved: '#comments_filter_resolved',
			btnDeleted: '#comments_filter_deleted',
			btnClearAll: '.P-Filter-Close-Icon',
			btnPrevComment: '.prev-comment-btn',
			btnNextComment: '.next-comment-btn',
			btnFilterDrop: '.P-Filter-Dropdown-Content',
			filterCheckboxes: '.P-Filter-Checkboxes',
		},
		events: {
			'click @ui.btnClearAll': 'clearAll',
			'click @ui.btnUsers': 'showHideUsers',
			'click @ui.btnRounds': 'showHideRounds',
			'click @ui.btnDates': 'showHideDates',
			'click @ui.btnResolved': 'filterCommentsResolved',
			'click @ui.btnDeleted': 'filterCommentsDeleted',
			'click @ui.btnPrevComment' : 'prevComment',
			'click @ui.btnNextComment' : 'nextComment',
			'click @ui.btnFilterDrop' : 'showHideFilter',
		},
		regions: {
			regionByUsername: '.filter_by_username',
			regionByRound: '.filter_by_round',
		},
		initialize: function(){
			this.globalChannel  = Backbone.Radio.channel('global');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.pageModel = this.commentChannel.request('get:page:model');
			this.documentId     = this.globalChannel.request('document:id');
			this.versionId 		= this.globalChannel.request('version:id');
			this.roundUserId	= this.globalChannel.request('round:user:id');
			this.userId         = this.globalChannel.request('document:userId');
			this.userName       = this.globalChannel.request('document:userName');
			this.photoId        = this.globalChannel.request('document:photoId');
			
			this.userCollection = new Comments.usersFilterCollection();
			this.roundCollection = new Comments.roundsFilterCollection();
			this.commentChannel.on('navigation:allowed', this._onNavigationAllow.bind(this));
			this.commentChannel.on('navigation:forbidden', this._onNavigationForbidden.bind(this));
			this.commentChannel.on('commenting:add_new_comment', this.addNewComment.bind(this));
			this.commentChannel.on('commenting:remove_comment_bubble', this.hideCommentBtn.bind(this));
			this.commentChannel.on('navigation:allowed', this._onNavigationAllow.bind(this));
			this.commentChannel.on('navigation:forbidden', this._onNavigationForbidden.bind(this));
			
		},
		_onNavigationAllow: function(){
			this.ui.btnPrevComment.show();
			this.ui.btnNextComment.show();
		},
		_onNavigationForbidden: function(){
			this.ui.btnPrevComment.hide();
			this.ui.btnNextComment.hide();
		},
		showHideFilter: function () {
			var _elem = this.ui.filterCheckboxes.find(gFilterByType);
			var _dropdown = this.ui.btnFilterDrop.find(gFilterDropdown);
			var lIsVisible = _elem.is(":visible");
			if(lIsVisible) {
				_dropdown.removeClass('P-Filter-Drop-Down-On');
				_elem.slideUp(300);
			} else {
				_dropdown.addClass('P-Filter-Drop-Down-On');
				_elem.slideDown(300);
			}
		},
		prevComment: function(){
			this.commentChannel.trigger('select:previous');
		},
		nextComment: function(){
			this.commentChannel.trigger('select:next');
		},
		initializeDatePicker: function(){
			var filter = this.pageModel.getFilter();
			this.ui.btnStartDate.datepicker({
				dateFormat: "dd-mm-yy",
				showOn: "button",
				maxDate: "0D",
				buttonImage: "/i/filter/date.svg",
				buttonImageOnly: true,
				onSelect: function(dateText){
					var dateText = $.datepicker.formatDate("yy-mm-dd", this.ui.btnStartDate.datepicker("getDate"));
					filter.setStartDate(dateText);
				}.bind(this)
			});
			this.ui.btnEndDate.datepicker({
				dateFormat: "dd-mm-yy",
				maxDate: "0D",
				showOn: "button",
				buttonImage: "/i/filter/date.svg",
				buttonImageOnly: true,
				onSelect: function(dateText){
					var dateText = $.datepicker.formatDate("yy-mm-dd", this.ui.btnEndDate.datepicker("getDate"));
					filter.setEndDate(dateText);
				}.bind(this)
			});
		},
		initializeUsers: function(){
			this.regionByUsername.show(new Comments.usersView({collection: this.userCollection}));
		},
		initializeRounds: function(){
			this.regionByRound.show(new Comments.roundsView({collection: this.roundCollection}));
		},
		showHideUsers: function(hide){
			var _dropdown = this.ui.btnUsers.find('.P-Arrow-Icon');
			var lIsVisible = this.ui.btnUsers.find(gFilterByTypeContent).is(":visible");
			if(hide == true){
				this.ui.btnUsers.find('input').prop('checked', false);
				this.ui.btnUsers.find(gFilterByTypeContent).slideUp(300);
				_dropdown.removeClass('Dropped');
				return;
			}
			if (lIsVisible == true) {
				this.ui.btnUsers.find(gFilterByTypeContent).slideUp(300);
				_dropdown.removeClass('Dropped');
			}else{
				this.userCollection = this.commentChannel.request('get:users');
				this.initializeUsers();
				this.ui.btnUsers.find(gFilterByTypeContent).slideDown(300);
				_dropdown.addClass('Dropped');
			}
		},
		showHideRounds: function(hide){
			var _dropdown = this.ui.btnRounds.find('.P-Arrow-Icon');
			var lIsVisible = this.ui.btnRounds.find(gFilterByTypeContent).is(":visible");
			if(hide == true){
				this.ui.btnRounds.find('input').prop('checked', false);
				this.ui.btnRounds.find(gFilterByTypeContent).slideUp(300);
				_dropdown.removeClass('Dropped');
				return;
			}
			if (lIsVisible == true) {
				this.ui.btnRounds.find(gFilterByTypeContent).slideUp(300);
				_dropdown.removeClass('Dropped');
			}else{
				this.roundCollection = this.commentChannel.request('get:rounds');
				this.initializeRounds();
				this.ui.btnRounds.find(gFilterByTypeContent).slideDown(300);
				_dropdown.addClass('Dropped');
			}
		},
		showHideDates: function(hide){
			var _dropdown = this.ui.btnDates.find('.P-Arrow-Icon');
			var lIsVisible = this.ui.btnDates.find(gFilterByTypeContent).is(":visible");
			if(hide == true){
				this.ui.btnDates.find('input').prop('checked', false);
				this.ui.btnDates.find(gFilterByTypeContent).slideUp(300);
				_dropdown.removeClass('Dropped');
				return;
			}
			if (lIsVisible == true) {
				this.ui.btnDates.find(gFilterByTypeContent).slideUp(300);
				_dropdown.removeClass('Dropped');
			}else{
				this.roundCollection = this.commentChannel.request('get:rounds');
				this.initializeRounds();
				this.ui.btnDates.find(gFilterByTypeContent).slideDown(300);
				_dropdown.addClass('Dropped');
			}
		},
		filterCommentsResolved: function(){
			var pBooleanResolveFilter = this.ui.btnResolved.prop("checked");
			this.filterModel = this.commentChannel.request('get:page:model').getFilter();
			this.filterModel.setShowResolved(pBooleanResolveFilter);
		},
		filterCommentsDeleted: function(){
			var pBooleanDeleteFilter = this.ui.btnDeleted.prop("checked");
			this.filterModel = this.commentChannel.request('get:page:model').getFilter();
			this.filterModel.setShowDeleted(pBooleanDeleteFilter);
		},
		clearAll: function(){
			var filterModel = this.pageModel.getFilter();
			this.showHideUsers(true);
			this.showHideRounds(true);
			this.ui.btnUsers.find('input:checked').prop('checked', false);
			this.ui.btnStartDate.val("");
			this.ui.btnEndDate.val("");
			this.ui.btnResolved.prop('checked', true);
			this.ui.btnDeleted.prop('checked', false);
			filterModel.setShowResolved(true);
			filterModel.setShowDeleted(false);
			filterModel.setSelectUsers([]);
			filterModel.setShowUsers(false);
			filterModel.setStartDate();
			filterModel.setEndDate();
		},
		onRender: function(){
			var pBooleanResolveFilter = this.ui.btnResolved.prop("checked");
			this.filterModel = this.commentChannel.request('get:page:model').getFilter();
			this.filterModel.setShowResolved(pBooleanResolveFilter);
			this.initializeDatePicker();
			var selectionPositionModel = this.commentChannel.request('selected:text:position', false);
			if(!selectionPositionModel.isCommentingAllowed()){
				this._onCommentingForbidden();
			}else{
				this._onCommentingAllowed();
			}
		},
		addNewComment: function(){
			if(!this.commentingIsAllowed){
				return;
			}
			this.hideCommentBtn();
			var selectionPositionModel = this.commentChannel.request('selected:text:position', true);
			if(!selectionPositionModel.isCommentingAllowed()){
				return;
			}
			var commentId = this.pageModel.getNewCommentId();
			this.newCommentModel = new Comments.comment();
			this.newCommentModel.set('document_id', this.documentId);
			this.newCommentModel.set('version_id', this.versionId);
			this.newCommentModel.set('round_user_id', this.roundUserId);
			this.newCommentModel.set('start_instance_id', selectionPositionModel.get('start_instance_id').toString());
			this.newCommentModel.set('start_field_id', selectionPositionModel.get('start_field_id').toString());
			this.newCommentModel.set('end_instance_id', selectionPositionModel.get('end_instance_id').toString());
			this.newCommentModel.set('end_field_id', selectionPositionModel.get('end_field_id').toString());
//			this.newCommentModel.set('start_node_vertical_offset', selectionPositionModel.get('start_node_vertical_offset').toString());
			this.newCommentModel.set('message', "");
			this.newCommentModel.set('comment_selection', selectionPositionModel.get('comment_selection'));
			this.newCommentModel.set('instance_id', selectionPositionModel.startInstanceId);
			this.newCommentModel.set('is_deleted', 0);
			this.newCommentModel.set('is_resolved', 0);
			this.newCommentModel.set('is_disclosed', 1);
			this.newCommentModel.set('can_edit', 1);
			this.newCommentModel.set('createdate', "");
			this.newCommentModel.set('plain_createdate', "");
			this.newCommentModel.set('createdate_in_seconds', "");
			this.newCommentModel.set('photo_id', this.photoId);
			this.newCommentModel.set('id', commentId);
			this.newCommentModel.set('rootid', commentId);
			this.newCommentModel.set('username', this.userName);
			this.newCommentModel.set('resolve_fullname', " ");
			this.newCommentModel.set('replyIds', []);
			this.newCommentModel.set('usr_id', this.userId);

			this.commentChannel.trigger('comment:highlight', this.newCommentModel.id);
			this.commentChannel.trigger('comment:added', this.newCommentModel);
			this.commentChannel.trigger("comment:makeCommentActive", this.newCommentModel.id);
		},
		hideCommentBtn: function(){
			var divToHide = $('#previewIframe').contents().find('#showCommentBtnBubble');
			divToHide.css({
				display: 'none'
			});
		},
		_onCommentingAllowed: function(){
			this.commentingIsAllowed = true;
			this.commentChannel.trigger('comment_inline_btn:show');
		},
		_onCommentingForbidden: function(){
			this.commentingIsAllowed = false;
			this.commentChannel.trigger('comment_inline_btn:hide');
		},
	});
	Comments.newReplyFormView = Marionette.LayoutView.extend({
		template: Handlebars.compile($("#new-reply-comment-form").html()),
		ui: {
			textarea: 'textarea',
			btnUpdateReply: '.btnAddReply',
			btnCancelReply: '.btnCancelReply',
		},
		events: {
			'click @ui.btnUpdateReply': 'saveReply',
			'click @ui.btnCancelReply': 'cancelReply',
		},
		initialize: function(options){
			this.globalChannel  = Backbone.Radio.channel('global');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.documentId = this.globalChannel.request('document:id');
			this.roundUserId = this.globalChannel.request('round:user:id');
			this.commentChannel.on('cke:comment:checkForText', this.checkForText.bind(this));
			this.commentChannel.on('save:comment:reply', this.saveReply.bind(this));
			this.rootCommentId = options.rootId;
			this._initModel();

		},
		_initModel : function(){
			this.model = new Comments.comment();
			var attributes = {
				document_id : this.documentId,
				comment_id : this.rootCommentId,
				is_reply: 1,
				round_user_id: this.roundUserId
			};
			this.model.set(attributes);
		},
		onDomRefresh: function(){
			if(this.isLoaded){
				return;
			}
			this.isLoaded = true;
			var textareaId = this.ui.textarea.attr('id');
			this.ckeEditor = this.commentChannel.request('cke:initialize', textareaId);
			var _this = this;
			this.ckeEditor.on("focus", function(){
				_this.checkForText();
				_this.ui.btnCancelReply.show();
			});
			this.ckeEditor.on("blur", function(){
				if(_this.isReplyEmpty()){
					_this.ui.btnUpdateReply.hide();
					_this.ui.btnCancelReply.hide();
				}
			});

			this.ckeEditor.on("key", function(){
				setTimeout(function(){
					_this.checkForText();
				}, 10);
			});
		},
		isReplyEmpty: function(){
			return !this.ckeEditor || !this.ckeEditor.getData() || !this.ckeEditor.getData().length;
		},
		checkForText: function(){
			if(!this.isReplyEmpty()){
				this.ui.btnUpdateReply.show();
				this.ui.btnUpdateReply.css('opacity', gCommentBtnsOpacityActive);
				this.ui.btnCancelReply.css('opacity', gCommentBtnsOpacityActive);
			}else{
				this.ui.btnUpdateReply.hide();
				this.ui.btnCancelReply.css('opacity', gCommentBtnsOpacityDeactive);

			}
		},
		saveReply: function(){
			try {
				if(this.isReplyEmpty()) {
					return;
				}
			} catch (e) {
				return;
			}
			
			var message = this.ckeEditor.getData();
			this.model.set('message', message);
			this.model.save(null, {
				success:function(){
					this.trigger('reply:created', this.model);
					this._initModel();
					this.cancelReply();
				}.bind(this)
			});
		},
		cancelReply: function(){
			this.model.setMessage('');
			this.ckeEditor.setData('');
			this.checkForText();
		},
		destroy: function(){
			this.remove();
			this.unbind();
		},
	});
	Comments.Message = Marionette.ItemView.extend({
		template: Handlebars.compile($("#comment-message").html()),
		ui: {
			message: '.P-Message',
			expandBtn: '.P-Comment-Message-ShowMore',
		},
		events: {
			'click @ui.expandBtn': 'toggleExpandState',
		},
		initialize: function () {
			this.commentChannel = Backbone.Radio.channel('comment');
			this.model.on('change:message', function(){
				if(this.isRendered){//Rerender
					this.render();
				}
			}.bind(this));
		},
		toggleExpandState: function(e){			
			if(this.isExpanded){
				e.stopPropagation();//Do not activate comment on collapse
				return this.collapseMessage();
			}
			return this.expandMessage();
		},
		expandMessage: function(){
			if(!this.isExpandable || this.isExpanded){
				return $.Deferred().resolve();
			}			
			this.isExpanded = true;
			this.ui.message.removeClass('P-Comment-Message-Collapse');
			this.ui.expandBtn.html('show less');
			
			this.trigger('expanded');
			return $.Deferred().resolve();
		},
		collapseMessage: function(){
			if(!this.isExpandable || !this.isExpanded){
				return $.Deferred().resolve();
			}		
			this.isExpanded = false;
			this.ui.message.addClass('P-Comment-Message-Collapse');
			this.ui.expandBtn.html('show more');
			this.trigger('collapsed');
			return $.Deferred().resolve();
		},
		_checkForExpandMessage: function(){
			var handleMessageHeight = $("#getMessageHeight").html(this.ui.message.text()).height();
			if(handleMessageHeight >= 68){
				this.ui.message.addClass('P-Comment-Message-Collapse');
				this.ui.expandBtn.show();
				this.isExpandable = true;
				this.isExpanded = false;
			}else{
				this.ui.message.removeClass('P-Comment-Message-Collapse');
				this.ui.expandBtn.remove();
				this.isExpandable = false;
			}
		},
		onRender: function(){
			// debugger;
			this._checkForExpandMessage();
		}
	});
	Comments.resolveView = Marionette.LayoutView.extend({
		template: Handlebars.compile($("#resolve-view").html()),
		tagName: "div",
		className : 'P-Comments-Resolved-By',
	});
	Comments.commentView = Marionette.LayoutView.extend({
		tagName: "div",
		className : 'P-Root-Comment',
		id: function(){
			return 'P-Root-Comment-Holder-' + this.model.id;
		},
		template: Handlebars.compile($("#comment-row").html()),
		templateHelpers : function(){
			return {
				canComment : this.documentModel.getCanComment()
			};
		},
		regions: {
			messageRegion: '.P-Wrapper-Message', //P-Comment-Msg
			editCommentForm: '.P-Comment-Edit-Form-Wrapper',
			replyCommentsRegion: '.P-Comments-Reply-Rows',
			resolveRegion: '.resolve_label',
			replyNewCommentForm: '.P-Comment-Reply-Form',
			showMoreRegion: '.P-Comments-Show-More-Layout',
			resolveByRegion: '.P-Comments-Resolved',
		},
		ui: {
			root: '.P-Root-Comment-Wrapper',
			wrapperMessage: '.P-Wrapper-Message',
			toolBarMenu: '.P-Comment-Toolbar-Menu',
			toolBarDropDown: '.P-Comment-Toolbar-Dropdown',
			toolBarEdit: '.P-Comment-Toolbar-Edit',
			toolBarDelete: '.P-Comment-Toolbar-Delete',
			editContainer: '.P-Comment-Edit-Form',
			containerReply: '.P-Comment-Reply-Form-Wrapper',
			editReplyContainer: '.P-Comment-Reply-Form',
			commentReplyContainer: '.P-Comments-Replay-Container',
			btnReplyShow: '.P-Comment-Btn-Reply-show',
			btnReplyHide: '.P-Comment-Btn-Reply-Cancel',
			deletedCommentHeader: '.P-Deleted-Comment-Header',
			deletedCommentArrowPos: '.arrow-position',
			deletedCommentContainer: '.P-Deleted-Comment-Container',
			resolveNode:'.P-Comment-Resolve-Layer',
			btnReply: '.P-Comment-Btn-Replay',
			resolveCheckbox: '.is_resolved',
			labelResolve: '.resolve_label',
			resolveLayout: '.P-Comment-Resolve-Layer',
			dateHolder: '.date-holder',
			commentDate: '.comment_date_root',
			footerActions: '.P-Comment-Root-Action-Btns',
			TriangleElement: '.triangle-with-shadow',
			showMoreBtn: '.P-Comments-Show-More-Layout',
		},
		events: {
			'click': 'makeCommentActive',
			'click @ui.toolBarEdit': 'showEditForm',
			'click @ui.toolBarMenu': 'showHideCommentMenu',
			'click @ui.toolBarDelete': 'deleteComment',
			'click @ui.deletedCommentHeader': 'showHideSelectedText',
			'click @ui.btnReplyHide': 'hideReplayContainer',
			'click @ui.resolveLayout': 'updateCommentResolved',
		},
		initialize: function(){
			this.globalChannel  = Backbone.Radio.channel('global');
			this.documentModel = this.globalChannel.request('document:model');
			this.documentCanComment = this.documentModel.getCanComment();
			this.roundUserId = this.globalChannel.request('round:user:id');
			
			this.commentChannel = Backbone.Radio.channel('comment');
			this.documentId     = this.globalChannel.request('document:id');
			this.pageModel = this.commentChannel.request('get:page:model');			
			this.commentChannel.on('mark:edited:instance:comment', function(commentId){
				if(commentId == this.model.id){
					this.markComment();
				}
			}.bind(this));
			/*
			 * Refresh comment date times every minute
			 */
			setInterval(function () {
				this.commentChannel.trigger('set:comment:date:label', this);
			}.bind(this), 60000);
			this.listenTo(this.model, 'change:isVisible', this.handleVisibilityChange.bind(this));

			this.model.on('change:is_deleted', function(){
				this.pageModel.setLastActiveCommentId("");
				this.render();
			}.bind(this));

		},
		/**
		 * Positions the comment at the specified vertical position.
		 *
		 * @param top
		 * @returns a deferred object which resolves when the animation is complete
		 */
		positionComment : function(top, left, isActive){
			var res = $.Deferred();
			var properties = {'top': top, 'left': left};
			if(top == null){
				delete properties.top;
			}
			this.$el.animate(properties, 400, 'swing', function(){				
				res.resolve();
				if(isActive && this.focusEditForm && this.editFormView){
					this.focusEditForm = false;
					this.editFormView.focusForm();
				}
			}.bind(this));
			return res;
		},
		hideReplyForm: function(){
			if(!this.newReplyFormView){
				return;
			}
			if(!this.newReplyFormView.isReplyEmpty()){
				return;
			}
//			this.ui.footerActions.removeClass('P-Comments-Btns-Active');
			this.ui.footerActions.hide();
		},
		showReplyForm: function(){
			if(this.model.isNew() || !this.documentCanComment){
				return;
			}
			this.ui.footerActions.show();
			this.ui.footerActions.addClass('P-Comments-Btns-Active');
			if(this.newReplyFormView && _.isElement(this.replyNewCommentForm.el)){
				return;
			}

			this.newReplyFormView = new Comments.newReplyFormView({rootId: this.model.id});
			this.replyNewCommentForm.show(this.newReplyFormView);

			this.listenTo(this.newReplyFormView, 'reply:created', this.onReplyCreated.bind(this));
		},
		showHideCommentMenu: function(e){
			$(gCommentToolbarDropdown).not(this.ui.toolBarDropDown).hide();
			this.ui.toolBarDropDown.toggle();
			e.stopPropagation();
		},
		showHideSelectedText: function(e){
			if(this.ui.deletedCommentContainer.is(':visible')){
				this.ui.deletedCommentArrowPos.removeClass('arrow-down').addClass('arrow-right').css('margin-top', '3px');
				this.ui.deletedCommentContainer.hide();
			}else{
				this.ui.deletedCommentArrowPos.removeClass('arrow-right').addClass('arrow-down').css('margin-top', '4px');
				this.ui.deletedCommentContainer.show();
			}
			this.commentChannel.trigger('comments:reposition');
			e.stopPropagation();
		},
		initMessage: function(){
			var messageView = new Comments.Message({model: this.model});
			this.messageRegion.show(messageView);
			this.listenTo(messageView, 'expanded collapsed', function(){
				this.commentChannel.trigger('comments:reposition');
			}.bind(this));
		},
		_getPreviewContent: function() {
			return $('#' + gPreviewIframeId).contents();
		},
		activate: function(){
			if(!this.isVisible){
				return $.Deferred().resolve();
			}
			this._getPreviewContent().find('.' + gActiveCommentTextClass).removeClass(gActiveCommentTextClass);
			
			var commentId = this.model.id;
			this.ui.root.addClass(gActiveCommentHolderClass);
			this.ui.TriangleElement.show();
			this.showReplyForm();
			this._getPreviewContent().find('span[class^="P-Preview-Comment_"][' + gTextCommentIdAttribute + '*="' + commentId + '"]').addClass(gActiveCommentTextClass).removeClass("noBackground");
			this._getPreviewContent().find('span[class^="P-Preview-Comment_"][' + gTextCommentIdAttribute + '*="' + commentId + '"]').
				each(function(i, el){
					$(el).find("span[class^='P-Preview-Comment_']").not('span[' + gTextCommentIdAttribute + '*="' + this.model.id + '"]')
						.addClass('noBackground');
			}.bind(this));
			var commentIsVisible = this.commentChannel.request('is:comment:visible:on:screen', this.model.id);
			if(!commentIsVisible){
				//This returns a deferred object which resolves when the scroll is complete
				return this.commentChannel.request('scroll:to:comment', this.model.id);
			}			
			return $.Deferred().resolve();
		},
		deactivate: function () {
			var commentId = this.model.id;
			this.ui.root.removeClass(gActiveCommentHolderClass);
			this.ui.TriangleElement.hide();
			this.hideReplyForm();
			this.ui.toolBarDropDown.hide();
			this._getPreviewContent().find('span[class^="P-Preview-Comment_"][' + gTextCommentIdAttribute + '*="' + commentId + '"]').removeClass(gActiveCommentTextClass);
			
			if(this.model.isNew()) {
				this.commentChannel.trigger('save:comment');
			} else {
				$.each(this.ui.root.find('form:visible'), function (index, el) {
					if($(el).attr('id') == 'form-new-reply-comment') {
						this.commentChannel.trigger('save:comment:reply');
					}
					if($(el).attr('id') == 'commentpost') {
						this.commentChannel.trigger('save:comment');
					}
				}.bind(this));
			}
			
			return $.Deferred().resolve();
		},
		showEditForm: function(){
			this.ui.root.find('.P-Comment-Message-ShowMore').hide();
			this.ui.btnReplyShow.hide();
			this.ui.resolveNode.hide();
			this.ui.wrapperMessage.hide();
			this.ui.toolBarMenu.hide();
			this.editFormView = new Comments.editFormView({
				model: this.model
			});
			this.editCommentForm.show(this.editFormView);
			this.listenTo(this.editFormView, 'comment:edited', function(){
				this.triggerMethod('comment:edit');
			});
			this.listenTo(this.editFormView, 'comment:deleted', this.deleteComment.bind(this));
			this.listenTo(this.editFormView, 'comment:canceled', this.hideEditForm.bind(this));
			this.commentChannel.trigger('comments:reposition');
		},
		hideEditForm: function(){
			this.ui.btnReplyShow.show();
			this.ui.resolveNode.show();
			this.ui.toolBarMenu.show();
			this.ui.wrapperMessage.show();
			this.ui.root.find('.P-Comment-Message-ShowMore').show();

			this.editCommentForm.empty();

			this.editFormView.destroy();
			this.commentChannel.trigger('comments:reposition');
		},

		updateCommentResolved: function(e){
			var attributes = {};
			if(this.ui.resolveCheckbox.prop('checked')){
				this.ui.resolveCheckbox.prop('checked', false);
			}else{
				this.ui.resolveCheckbox.prop('checked', true);
			}
			attributes.is_resolved = this.ui.resolveCheckbox.prop('checked') ? 1 : 0;

			this.model.save(attributes, {
				success: function(){					
					this.resolveView();
					this.commentChannel.trigger('comment:resolve:changed', this.model.id);
				}.bind(this)
			});
			e.preventDefault();
			e.stopPropagation();

		},
		resolveView: function(){
			var resolveView = new Comments.resolveView({model: this.model});
			if(this.model.getIs_resolved()){
				this.resolveByRegion.show(resolveView);
			}else{
				this.resolveByRegion.empty();
			}
		},
		deleteComment: function(){
			if(!this.model.isNew()){
				if(confirm(LANG['js.pjs.confirm.deleteComment']) ) {
					this._delete();
					return false;
				}
			}else{
				this._delete();
			}
		},
		_delete:function(){
			this.model.destroy({
				data: JSON.stringify({is_root: 1, round_user_id: this.roundUserId}),
				processData: true,
				success: function(){
					id = this.model.id;
					content = this._getPreviewContent();
					content.find('span[comment_id="'+id+'"]').contents().unwrap();
					content.find(gCommentMarkNodeName+"["+gCommentStartPosNodeName+"]["+gCommentIdAttributeName+"='"+id+"']").remove();
					content.find(gCommentMarkNodeName+"["+gCommentEndPosNodeName+"]["+gCommentIdAttributeName+"='"+id+"']").remove();					
				}.bind(this)
			});
		},
		/**
		 * Marks the comment in the preview of the document
		 * (i.e. adds a custom class for the comment selection)
		 */
		markComment: function(){
			//var sel = this.commentChannel.request('comment:getPreviewSelection');
			var content = this._getPreviewContent();
			var commentStartNode = content.find(gCommentMarkNodeName + '[' + gCommentStartPosNodeName + '][' + gCommentIdAttributeName + '="' + this.model.id + '"]');
			var commentEndNode = content.find(gCommentMarkNodeName + '[' + gCommentEndPosNodeName + '][' + gCommentIdAttributeName + '="' + this.model.id + '"]');
			if(commentStartNode.length && commentEndNode.length) {
				range = rangy.createRange();
				range.setStart(commentStartNode[0], 0);
				range.setEnd(commentEndNode[0], 0);
				applier = rangy.createClassApplier(gCommentPreviewElementClass + '_' + this.model.id, {
					elementTagName: 'span', 
					elementAttributes: {
						'comment_id': this.model.id
					},
					useExistingElements: false,
					onElementCreate: function (a, b) { //remove highlighting span inside citations
						setTimeout(function () {
							if($(a).closest('cite').length) {
//								$(a).replaceWith(function () {
//									return this.innerHTML;
//								});
							}
						}, 10);
					}
				});
				applier.applyToRange(range);
				
			}
		},
		/**
		 * Hides the comment's markers from the preview when the comment is hidden/removed
		 */
		unmarkComment: function(){
			this._getPreviewContent().find('span[comment_id="'+this.model.id+'"]').contents().unwrap();
		},
		
		makeCommentActive: function(){
			this.commentChannel.trigger('comment:makeCommentActive', this.model.id);
		},
		/**
		 * Called after the comment has been edited through the edit form
		 */
		onCommentEdit:function(){
			this.deactivate();
			this.$el.attr('id', this.id());
			this.hideEditForm();
		},
		_renderReplies: function(){
			var replyCollection = this.commentChannel.request('get:comment:replies', this.model.id);
			this.replyCommentsView = new Comments.replyCommentsView({collection: replyCollection});
			this.replyCommentsRegion.show(this.replyCommentsView);
		},
		onReplyCreated: function(model){
			this.model.collection.add(model);
			var replyIds = this.model.get('replyIds');
			replyIds.push(model.id.toString());
			this._renderReplies();
			this.commentChannel.trigger('comments:reposition');
		},
		handleVisibilityChange: function(){
			if(this.model.getIsVisible()){
				this.show();
			}else{
				this.hide();
			}	
		},
		onRender: function() {			
			this.resolveView();
			this.initMessage();
			this._renderReplies();
			this.handleVisibilityChange();
		},
		show: function(){
			if(this.isVisible){
				return;
			}
			this.isVisible = true;
			this.$el.show();
			this.markComment();
		},
		hide: function(){
			if(this.isVisible === false){
				return;
			}
			this.isVisible = false;
			this.$el.hide();
			this.unmarkComment();
			this.commentChannel.trigger('comment:hidden', this.model.id);
		},
		onDomRefresh : function() {	
//			this.handleVisibilityChange();
			if(this.model.isNew()){
				this.focusEditForm = true;
				this.showEditForm();
			}else{
				this.commentChannel.trigger('comments:reposition');
			}
		},
		onShow: function(){					
//			this.$el.fadeIn();
			// this.setCommentDateLabel();
			this.commentChannel.trigger('set:comment:date:label', this);
		},
		onDestroy: function(){
			this.$el.remove();			
			this.unmarkComment();
			this.commentChannel.trigger('comments:reposition');
		},
	});
	Comments.replyCommentView = Marionette.LayoutView.extend({
		template: Handlebars.compile($("#comment-reply-row").html()),
		ui: {
			wrapperMessage: '.P-Wrapper-Message',
			toolBarMenu: '.P-Comment-Toolbar-Menu',
			toolBarDropDown: '.P-Comment-Toolbar-Dropdown',
			toolBarEdit: '.P-Comment-Toolbar-Edit',
			toolBarDelete: '.P-Comment-Toolbar-Delete',
			showMoreBtn: '.P-Comments-Reply-Show-More-Layout',
			dateHolder: '.date-holder',
		},
		templateHelpers : function(){
			return {
				canComment : this.documentModel.getCanComment()
			};
		},
		regions: {
			messageRegion: '.P-Wrapper-Message',
			editFormRegion: '.P-Comment-Reply-Edit-Form',
			showMoreRegion: '.P-Comments-Reply-Show-More-Layout',
		},
		events: {
			'click @ui.toolBarMenu': 'showHideCommentMenu',
			'click @ui.toolBarEdit': 'showEditForm',
			'click @ui.toolBarDelete': 'deleteComment',
		},
		initialize: function(){
			this.globalChannel = Backbone.Radio.channel('global');
			this.documentId = this.globalChannel.request('document:id');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.pageModel = this.commentChannel.request('get:page:model');
			this.documentModel = this.globalChannel.request('document:model');
			this.roundUserId = this.globalChannel.request('round:user:id');
			setInterval(function () {
				this.commentChannel.trigger('set:comment:date:label', this);
			}.bind(this), 60000);
		},
		initMessage: function(){
			var messageView = new Comments.Message({model: this.model});
			this.messageRegion.show(messageView);
			this.listenTo(messageView, 'expanded collapsed', function(){
				this.commentChannel.trigger('comments:reposition');
			}.bind(this));
		},
		showHideCommentMenu: function(e){
			$(gCommentToolbarDropdown).not(this.ui.toolBarDropDown).hide();
			this.ui.toolBarDropDown.toggle();
			e.stopPropagation();
		},
		showEditForm: function(){
			this.ui.wrapperMessage.hide();
			this.editReplyFormView = new Comments.editReplyFormView({
				model: this.model
			});
			this.editFormRegion.show(this.editReplyFormView);
			this.editReplyFormView.onLoad();

			this.listenTo(this.editReplyFormView, 'comment:edited', function(){
				this.triggerMethod('comment:edit');
			});
			this.listenTo(this.editReplyFormView, 'comment:deleted', function(settings){
				this.triggerMethod('comment:delete', settings);
			});
			this.listenTo(this.editReplyFormView, 'comment:canceled', function(){
				this.ui.wrapperMessage.show();
				this.editFormRegion.empty();
				this.commentChannel.trigger('comments:reposition');
				this.editReplyFormView.destroy();
			}.bind(this));
			this.commentChannel.trigger('comments:reposition');
			return false;
		},

		deleteComment: function(options){
			this.model.destroy({
				data: JSON.stringify({is_root: 0, round_user_id: this.roundUserId}),
				processData: true,
				success: function(){
					this.commentChannel.trigger('comments:reposition');
				}.bind(this)
			});
			return false;
		},
		onCommentEdit: function(){
			this.ui.wrapperMessage.show();
			$(gCommentToolbarDropdown).hide();
			this.editFormRegion.empty();
			this.commentChannel.trigger('comments:reposition');
		},
		onRender: function(){
			this.commentChannel.trigger('set:comment:date:label', this);
			this.initMessage();
		},
		onDestroy: function(){
			//this.commentChannel.trigger('comments:reposition');
		}
	});
	// COLLECTION VIEWSk
	Comments.commentsView = Marionette.CollectionView.extend({
		tagName: 'div',
		attributes: {
			'class': 'P-Comment-Item-Root_',
		},
		childView: Comments.commentView,
		emptyView: Comments.noCommentView,
		showCommentBtnView: Comments.showCommentBtnView,
		initialize: function(){
			this.commentChannel = Backbone.Radio.channel('comment');
			this.loadingChannel = Backbone.Radio.channel('loading');
			this.pageModel = this.commentChannel.request('get:page:model');
			this.repositionIsNecessary = true;
			this.repositionIsActive = false;
			this.visibleRootComments = this.commentChannel.request('get:visible:root:comments'); 
			this.listenTo(this.commentChannel, 'visible:collection:change:start', this._stopListening.bind(this));
			this.listenTo(this.commentChannel, 'visible:collection:change:end', this._startListening.bind(this));
			this.listenTo(this.visibleRootComments, 'add remove', this.showHideNavBar.bind(this)); this.showHideNavBar();
			this.listenTo(this.commentChannel, 'comment:hidden', this._onCommentHidden.bind(this));

			_.bindAll(this, 'onActivateComment', 'onDeactivateComments', 'showHideNavBar', 'repositionComments');

		},
		
		_onCommentHidden : function(commentId){
			if(this.pageModel.getActiveCommentId() == commentId){
				this.deactivateComments();
			}
		},

		_getCommentView : function(commentId){
			var model = this.collection.get(commentId);
			if(model){
				return this.children.findByModel(model);
			}
		},
		showHideNavBar:function(){
			if(typeof this.visibleRootComments != "undefined"){
				if(this.visibleRootComments.length > 0){
					this.commentChannel.trigger('navigation:allowed');
				}else{
					this.commentChannel.trigger('navigation:forbidden');
				}
			}
		},
		/**
		 * Returns a promise which will resolve when the comment with the specified id
		 * activates or will fail if there is no such comment
		 */
		activateComment: function(commentId){
			var commentView = this._getCommentView(commentId);
			if(commentView){
				this.pageModel.setActiveCommentId(commentId.toString());
				this.pageModel.setLastActiveCommentId(commentId.toString());
				return commentView.activate();
			}
			return $.Deferred().reject();
		},
		/**
		 * Returns a promise which will resolve when the currently selected comment
		 * deactivates or will fail if there is no selected comment
		 */
		deactivateComments: function(){
			var curActiveCommentId = this.pageModel.getActiveCommentId();
			this.pageModel.setActiveCommentId("");
			if(curActiveCommentId){
				var commentView = this._getCommentView(curActiveCommentId);;
				if(commentView){
					return commentView.deactivate();
				}
			}
			return $.Deferred().reject();
		},
		onDeactivateComments: function(oper){
//			console.log('onDeactivateComments', oper);
			this.deactivateComments().done(function(){
				//If there has been a change - refresh
				//If the promise has failed - there has been no change so we dont have to do anything
				$(gCommentToolbarDropdown).hide();
				//Stop reposition because will be init two times if is active comment & leave from instance
				// this.repositionIsActive = false;
				this.pageModel.setActiveCommentId("");
				this.pageModel.setLastActiveCommentId("");
				 this.repositionComments(true);
			}.bind(this));
		},
		onActivateComment: function(commentId){
			if(commentId == this.pageModel.getActiveCommentId()){
				return;
			}
			var deactivateRes = this.deactivateComments();
			var activateRes = this.activateComment(commentId);
			$.when( deactivateRes, activateRes ).always(function ( v1, v2 ) {
				if(deactivateRes.state() == "resolved" || activateRes.state() == 'resolved'){
					//There has been at least one meaningful action - either activation or deactivation
//					this.repositionIsActive = false;
					this.repositionComments();
					this.commentChannel.trigger('cke:comment:checkForText');
				}
				//if both promises have failed - nothing has happened
			}.bind(this));

		},
		repositionComments: function(){			
			//returnToRightPosition = true;
			this.repositionIsNecessary = true;
			if(this.repositionIsActive){
				return this.repositionResult;
			}			
			if(!this.repositionResult || this.repositionResult.state() == 'resolved'){
				this.repositionResult = $.Deferred();
			}			
			this.repositionIsNecessary = false;					
			if(!this.collection.length){
				this.repositionIsActive = false;
				return this.repositionResult.resolve();
			}
			this.repositionIsActive = true;
			var pageSelectedCommentId = this.commentChannel.request('get:selected:comment:id'); 
			var selectedCommentId = pageSelectedCommentId;
			var lastActiveCommentId = this.pageModel.getLastActiveCommentId();

			var lPreviousElement = null;
			var lPreviousElementIdx = 0;

			var lPositions = [];
			var lOffsetParent = false;
			var _this = this;
			
			if(!selectedCommentId){
				selectedCommentId = lastActiveCommentId;
			}

			this.collection.each(function (comment, pIndex) {
				var commentView = _this._getCommentView(comment.id);
				if(!commentView || !commentView.isVisible){
					return;
				}
				var pRow = commentView.el;
				var commentId = commentView.model.id;
				lOffsetParent = $(pRow).offsetParent();
				var lCommentPosition = _this.commentChannel.request('get:comment:vertical:position', commentId);

				//The part which is not visible in the bottom due to current scroll position
				var lPartNotVisibleOnScreen = lCommentPosition + $(pRow).outerHeight() - $(window).scrollTop() - $(window).height() + $('.P-Footer').outerHeight();
				if(selectedCommentId == commentId && lPartNotVisibleOnScreen > 0) {
					lCommentPosition -= lPartNotVisibleOnScreen;
				}
				lCommentPosition -= lOffsetParent.offset().top;

				var lPartUnderOffsetParent = $(window).scrollTop() - lCommentPosition;

				if(selectedCommentId == commentId) {
					if(lPartUnderOffsetParent > 0) {
						lCommentPosition += lPartUnderOffsetParent;
					}
				}
				if(lCommentPosition < 0) {
					lCommentPosition = 0;
				}
				if(lPreviousElement) {
					var lPreviousCommentPosition = pIndex > 0 ? lPositions[lPreviousElementIdx] : 0;
					var lPreviousCommentHeight = $(lPreviousElement).outerHeight();
					if(lCommentPosition < (lPreviousCommentPosition + lPreviousCommentHeight)) {
						if(selectedCommentId == commentId) {//Position the current active comment at its real place and move the ones before it up
							var lFixOffset = (lPreviousCommentPosition + lPreviousCommentHeight) - lCommentPosition;
							for (var i = 0; i < pIndex; ++i) {
								lPositions[i] -= lFixOffset;//
							}
						} else {
							lCommentPosition = (lPreviousCommentPosition + lPreviousCommentHeight);
						}
					}

				} else {

				}
				lPositions[pIndex] = lCommentPosition;

				lPreviousElement = pRow;
				lPreviousElementIdx = pIndex;
			}.bind(this));

			var repositionResults = [];
			var lastVisibleCommentView;
			this.collection.each(function (comment, pIndex) {
				var commentId = comment.id;
				var commentView = _this._getCommentView(comment.id);
				if(!commentView || !commentView.isVisible){
					return;
				}
				lastVisibleCommentView = commentView;
				var top = lPositions[pIndex];
				var left = 10;
				var isActive = false;
				if(selectedCommentId == commentId && pageSelectedCommentId == commentId){
					left = -10;
					isActive = true;
				}
				repositionResults.push(commentView.positionComment(top, left, isActive));
			});

			if(lastVisibleCommentView) {				
				var $lCommentHolder = lastVisibleCommentView.$el;
				var lMaxPosition = lPositions[this.collection.length - 1] + $lCommentHolder.outerHeight();
				$('#P-Layout-Base-Comment').css('min-height', lMaxPosition);

			}
			$.when.apply(this, repositionResults).done(function(){				
				this.repositionIsActive = false;
				if(this.repositionIsNecessary){
					this.repositionComments();
				}else{					
					this.repositionResult.resolve();
				}
			}.bind(this));
			return this.repositionResult;
		},
		onDomRefresh : function(){
			this._startListening(true);
		},
		_stopListening: function(){
			if(!this.isListening){
				return;
			}			
			this.isListening = false;
			this.stopListening(this.commentChannel, 'comments:reposition', this.repositionComments);
			this.stopListening(this.commentChannel, 'activate:comment', this.onActivateComment);
			this.stopListening(this.commentChannel, 'deactivate:comments', this.onDeactivateComments);
		},
		_startListening: function(unblockUI){
			if(this.isListening){
				return;
			}			
			this.isListening = true;
			this.repositionComments().done(function(){				
				if(unblockUI){					
					this.loadingChannel.trigger('ui:unblock');
				}			
				this.listenTo(this.commentChannel, 'comments:reposition', this.repositionComments);
				this.listenTo(this.commentChannel, 'activate:comment', this.onActivateComment);
				this.listenTo(this.commentChannel, 'deactivate:comments', this.onDeactivateComments);

			}.bind(this));			
		}
	});
	Comments.replyCommentsView = Marionette.CollectionView.extend({
		childView: Comments.replyCommentView,
		emptyView: Comments.noCommentView,
		collection: Comments.comments,
	});
	// LAYOUTS
	Comments.BaseLayout = Marionette.LayoutView.extend({
		template: Handlebars.compile($('#comment-layout-based').html()),
		regions: {
			comments: '.P-Comments-Content',
		},
		attributes: {
			class: 'content',
			style: 'padding-top: 0px; height: 100%;width:270px;',
		},
		initialize: function(){
			this.globalChannel  = Backbone.Radio.channel('global');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.contentChannel = Backbone.Radio.channel('content');			
			this.documentId     = this.globalChannel.request('document:id');
			this.userId         = this.globalChannel.request('document:userId');
			this.userName       = this.globalChannel.request('document:userName');
			this.photoId        = this.globalChannel.request('document:photoId');
			this.documentModel	= this.globalChannel.request('document:model');
			this.collectionView = null;
			this.listenTo(this.commentChannel, 'comments:loaded', this._onCommentsLoad.bind(this));
		},

		_onCommentsLoad : function(commentsCollection){
			this.collectionView = new Comments.commentsView({
				collection: commentsCollection,
			});
			this.comments.show(this.collectionView);			
		},
		postFormView: function(){
			var postFormModel = new Comments.comment({document_id:this.documentId});
			return new Comments.newCommentPostFormView({
				model:postFormModel,
			});
		},
		onRender: function(){
			PreviewApp.commentsFilter.show(new Comments.filterView());
			PreviewApp.showCommentBtn.show(new Comments.showCommentBtnView());
			this.postFormView().render().$el.appendTo(this.$el.find('.P-Comment-Form'));
		},
	});
	// OBJECTS
	Comments.Controller = Marionette.Object.extend({
		previewDocumentContent: '',
		initialize: function(){
			rangy.config.autoInitialize = false;
			rangy.init();
			this.sel = this._getPreviewSelection();
			this.globalChannel  = Backbone.Radio.channel('global');
			this.commentChannel = Backbone.Radio.channel('comment');
			this.contentChannel = Backbone.Radio.channel('content');
			this.loadingChannel = Backbone.Radio.channel('loading');
			var documentModel = this.globalChannel.request('document:model');
			this.documentIsEditable = documentModel.getIsEditable();
			this.documentCanComment = documentModel.getCanComment();

			this.documentId = this.globalChannel.request('document:id');
			this.versionId = this.globalChannel.request('version:id');
			this.roundUserId = this.globalChannel.request('round:user:id');

			this.pageModel = new Comments.pageModel();
			this._initCommentCollections();
			this.commentChannel.on('comment:added', this._addComment.bind(this));
			this.commentChannel.on('comment:highlight', this._wrapSelection.bind(this));
			this.commentChannel.on("comment:makeCommentActive", this._makeCommentActive.bind(this));
			this.commentChannel.on('select:previous', this._SelectPreviousNextComment.bind(this, true));
			this.commentChannel.on('select:next', this._SelectPreviousNextComment.bind(this, false));
			this.commentChannel.on('init:aftersave:events', this._initInstanceCommentsEvents.bind(this));
			this.commentChannel.on('set:comment:date:label', this.setCommentDateLabel.bind(this));
			this.commentChannel.reply('cke:initialize', this._createRegularCKEditorObject.bind(this));
			this.listenTo(this.contentChannel, 'citations:reorder:init:finished', this._reinitCommentEvents.bind(this));

			this.commentChannel.on('get:comments:by:instance', function(content){
				return this._getInstanceContent(content);
			}.bind(this));

			this.listenTo(this.pageModel.getFilter(), 'change',  this.filterVisibleComments.bind(this));
			this.listenTo(this.commentChannel, 'comment:resolve:changed',  this.filterVisibleComments.bind(this));

			this.commentChannel.reply('get:document:editable', function() {
				return this.documentIsEditable;
			}.bind(this));
			this.commentChannel.reply('comment:getPreviewSelection', function(){
				return this._getPreviewSelection();
			}.bind(this));
			this.commentChannel.reply('selected:text:position', function(expandSelectionIfCollapsed) {
				return this._getSelectedTextPos(expandSelectionIfCollapsed);
			}.bind(this));
			this.commentChannel.reply('get:comment:vertical:position', function(commentId) {
				return this._getCommentVerticalPosition(commentId);
			}.bind(this));
			this.commentChannel.reply('get:visible:root:comments', function(){
				return this.visibleRootComments;
			}.bind(this));
			this.commentChannel.reply('get:page:model', function() {
				return this.pageModel;
			}.bind(this));
			this.commentChannel.reply('get:selected:comment:id', function() {
				return this.pageModel.getActiveCommentId();
			}.bind(this));
			this.commentChannel.reply('get:users', this._getListOfUsers.bind(this));
			this.commentChannel.reply('get:rounds', this._getListOfRounds.bind(this));
			
			this.commentChannel.reply('is:comment:visible:on:screen', this._isCommentMarkupVisibleOnScreen.bind(this));
			this.commentChannel.reply('scroll:to:comment', this._scrollToComment.bind(this));
			
			
			/**
			 * Returns a collection of all the child comments for the specified
			 * root comment
			 */
			this.commentChannel.reply('get:comment:replies', function(commentId) {
				var commentsCollection = new Comments.comments();
				var comment = this.comments.get(commentId);
				$.each(comment.get('replyIds'), function(name, replyId){
					commentsCollection.add(this.comments.get(replyId));
				}.bind(this));
				return commentsCollection;
			}.bind(this));
			
//			this.globalChannel.on('preview:loaded', this._onPreviewReady.bind(this));
			this.commentChannel.on('init:comments', this._initComments.bind(this));
			this.commentChannel.on('instance:saved', this._onInstanceSaved.bind(this));
			
			
			_.bindAll(this, '_onTextCheckForComment');
		},
		_initCommentCollections: function(){
			this.comments     = new Comments.comments([], {
				documentId: this.documentId,
				versionId: this.versionId,
				roundUserId: this.roundUserId
			});
			this.rootComments = new Comments.comments();
			this.users        = new Comments.usersFilterCollection();
			this.rounds        = new Comments.roundsFilterCollection();
			this.visibleRootComments = new Comments.comments();
			this.rounds.comparator = 'id';
			this.users.comparator = 'username';
			/*
			 * We will sort comments which are considered at the same position(e.g. global comments)
			 * by ids so that the sort can return the same result every time
			 * (the order will be the same no matter of the order before the sort)
			 */ 
			var idSort = function(idA, idB){
				if(idB > 0 && idA > 0){
					//Both confirmed(i.e. saved) - the one with the smaller id will be first 
					return idA - idB;
				}
				if(idA > 0){
					//A is confirmed, B is new - A is before b
					return -1;
				}
				//Both are new - the one created first
				//(with the greater id, as ids are negative) is first
				return idB - idA;
			};
			/**
			 * The comparator should return -1 if A is before B 
			 * or 1 if B is before A
			 */
			this.rootComments.comparator = function(commentA, commentB){
				var lCommentAStartNode = this._getCommentStartNode(commentA.id);
				var lCommentBStartNode = this._getCommentStartNode(commentB.id);
				
				if(!lCommentAStartNode && !lCommentBStartNode){//Both general
					return idSort(commentA.id, commentB.id);			
				}
				
				if(!lCommentAStartNode){//A is general, B - inline
					return -1;
				}
				if(!lCommentBStartNode){//B is general, A - inline
					return 1;
				}
				//Both inline
				var res = this._compareNodesOrder(lCommentAStartNode, lCommentBStartNode);
				if(res === 0){
					return idSort(commentA.id, commentB.id);
				}
				return res;
			}.bind(this);
			
			this.visibleRootComments.comparator = function(commentA, commentB){
				var idxA = this.rootComments.indexOf(commentA);
				var idxB = this.rootComments.indexOf(commentB);
				return idxA - idxB;
			}.bind(this);
			

		},
		/**
		 * After a citations reorder we need to detach and attach the
		 * comment events because the document's dom may have changed 
		 * significantly
		 */
		_reinitCommentEvents: function(){
			var commentableNodes = this.previewDocumentContent.find('*[commentable="true"]:lt(30000)'); 
			commentableNodes.off('mouseup keyup', this._onTextCheckForComment);
			commentableNodes.on('mouseup keyup', this._onTextCheckForComment);
			this._getPreviewContent().off("click");
			commentableNodes.clickOff(this._getPreviewContent(), function () {
				this.commentChannel.trigger('commenting:forbidden');
				this.commentChannel.trigger('deactivate:comments', 3);
			}.bind(this));
		},
		
		/**
		 * Bind events for commentable nodes
		 * Remove clickOff listener for all preview content and reattach
		 * @param {type} content
		 * @returns {undefined}
		 */
		_initInstanceCommentsEvents: function (content) {
			if($(content).length) {
				$(content).find('*[commentable="true"]:lt(30000)').on('mouseup keyup', this._onTextCheckForComment);
				
				this._getPreviewContent().off("click");
				this.previewDocumentContent.find('*[commentable="true"]:lt(30000)').clickOff(this._getPreviewContent(), function () {
					this.commentChannel.trigger('commenting:forbidden');
					this.commentChannel.trigger('deactivate:comments', 4);
				}.bind(this));
			}
		},
		_onTextCheckForComment: function(e){
			this._checkSelectedTextForActiveComment(e);
		},
		_initCommentsEvents: function () {
			/**
			 * Deactivate comments when clicking outside iframe and comment wrapper
			 * For testing
			 */

			$('#'+gPreviewIframeId).clickOff($('.P-Wrapper'), function (p, e) {
				this.commentChannel.trigger('commenting:hidebtn');
				if($(e.target).parents(".P-Root-Comment, #P-Comment-Btn-Inline, #showCommentBtnBubble, .P-Nav-Btns").length == 1) {
					return;
				}
				this.commentChannel.trigger('commenting:forbidden');
				this.commentChannel.trigger('deactivate:comments', 1);
			}.bind(this));
			$(gHeaderCommentsFilter).clickOff($('.P-Wrapper'), function (p, e) {
				if($(e.target).parents(".P-Single-Type-Filter").length == 1) {
					return;
				}
				$(gFilterByType).slideUp(300);
				$(gFilterDropdown).removeClass('P-Filter-Drop-Down-On');
			}.bind(this));
			this.previewDocumentContent.find('*[commentable="true"]:lt(30000)').clickOff(this._getPreviewContent(), function () {
				this.commentChannel.trigger('commenting:forbidden');
				this.commentChannel.trigger('deactivate:comments', 2);
			}.bind(this));
			this._reinitCommentEvents();

			/*
			this.previewDocumentContent.clickOff(this._getPreviewContent(), function () {
				this._checkSelectedTextForActiveComment();
			}.bind(this));
			*/
			$(gCommentToolbarDropdown).clickOff(this._getPreviewContent(), function (parent, el) {
				$(gCommentToolbarDropdown).hide();
				$(gFilterByType).slideUp(300);
				$(gFilterDropdown).removeClass('P-Filter-Drop-Down-On');
			});
		},
		_initComments: function(){
			this.baseLayout = new Comments.BaseLayout();
			PreviewApp.right.show(this.baseLayout);
			this.previewDocumentContent = this._getPreviewContent().find(gArticlePreviewContentId);			
			this.fetchComments();
			this._initCommentsEvents();
		},
		_onInstanceSaved: function(comments){
			if(!comments.length){
				return this.commentChannel.trigger('comments:reposition', true);
			}
			if(comments.length){
				_.each(comments, function(id){
					commentModel = this.comments.get(id);
					if(commentModel){
						commentModel.setIs_new(0);
						commentModel.setIs_deleted(Number(!commentModel.getIs_deleted()));
					}					
				}.bind(this));
			}
			this.filterVisibleComments();
			
		},
		_getCommentStartNode: function(commentId){
			return this._getPreviewContent().find(gCommentMarkNodeName + '[' + gCommentStartPosNodeName + ']['+gCommentIdAttributeName+'="' + commentId + '"]')[0];
		},
		_getListOfUsers: function(){
			this.users.reset();
			$.each(this.visibleRootComments.models, function(i, comment){
				var userModel = new Comments.userFilterModel();
					$.each(comment.getReplyIds(), function(r, replyComment){
						var userReplyModel = new Comments.userFilterModel();
						if( _.isEmpty( this.comments.where({id: parseInt(replyComment)}) ) ){
							return;
						}
						var replyCommentUserId = this.comments.where({id: parseInt(replyComment)})[0].getUsr_id();
						var replyCommentUsername = this.comments.where({id: parseInt(replyComment)})[0].getUsername();
						userReplyModel.set('id', replyCommentUserId);
						userReplyModel.set('username', replyCommentUsername);
						this.users.add(userReplyModel);
					}.bind(this));
				userModel.set('id', comment.get('usr_id'));
				userModel.set('username', comment.get('username'));
				this.users.add(userModel);

			}.bind(this));
			return this.users;
		},
		_getListOfRounds: function(){
			this.rounds.reset();
			$.each(this.visibleRootComments.models, function(i, comment){
				var roundModel = new Comments.roundFilterModel();
				$.each(comment.getReplyIds(), function(r, replyComment){
					if(_.isEmpty(this.comments.where({id: parseInt(replyComment)}))){
						return;
					}
					var replyCommentRoundId = this.comments.where({id: parseInt(replyComment)})[0].getRound_id();
					if(replyCommentRoundId > -1){
						roundModel.set('id', replyCommentRoundId);
					}
				}.bind(this));
				var commentRoundId = comment.get('round_id');
				if(commentRoundId > -1){
					roundModel.set('id', comment.get('round_id'));
				}
				if(roundModel){
					this.rounds.add(roundModel);
				}
			}.bind(this));
			return this.rounds;
		},
		fetchComments: function(){
			this.loadingChannel.trigger('ui:block');
			this.comments.fetch({
				success: function(){
					this.rootComments.add(this.comments.filter(function(comment){
						return comment.get('id') == comment.get('rootid');
					}));
					this.filterVisibleComments();
					this.commentChannel.trigger('comments:loaded', this.rootComments);
				}.bind(this),
			});
		},
		/**
		 * Checks if the model is visible,
		 * based on the currently selected value of the filter
		 */
		_isCommentVisible: function(commentModel){
			var filter = this.pageModel.getFilter();
			var modelDate = new Date(commentModel.getPlain_createdate()).getTime();
			
			if(!_.isEmpty(filter.getStartDate())){
				 var startDate = new Date(filter.getStartDate()).getTime();
				if(startDate > modelDate){
					return false;
				}
			}
			if(!_.isEmpty(filter.getEndDate())){
				var endDate = new Date(filter.getEndDate()).getTime();
				if(endDate < modelDate){
					return false;
				}
			}
			
			var selectedUserIds = filter.getSelectUsers();
			if(!_.isEmpty(selectedUserIds)) {
				var isVisible = _.indexOf(selectedUserIds, commentModel.get('usr_id')) != -1;
				if(!isVisible && !_.isEmpty(commentModel.getReplyIds())){
					$.each(commentModel.getReplyIds(), function(i, replyId){
						var replyCommentModel = this.comments.get(replyId);
						if(replyCommentModel && _.indexOf(selectedUserIds, replyCommentModel.getUsr_id()) != -1 ){							
							isVisible = true;
							return false;//This breaks the $.each, does not return
						}
					}.bind(this));
				}
				if(!isVisible){
					return false;
				}
			}

			var selectedRoundIds = filter.getSelectRounds();
			if(!_.isEmpty(selectedRoundIds)) {
				var isVisible = _.indexOf(selectedRoundIds, commentModel.get('round_id')) != -1;
				if(!isVisible && !_.isEmpty(commentModel.getReplyIds())){
					$.each(commentModel.getReplyIds(), function(i, replyId){
						var replyCommentModel = this.comments.get(replyId);
						if(replyCommentModel && _.indexOf(selectedRoundIds, replyCommentModel.getRound_id()) != -1 ){
							isVisible = true;
							return false;//This breaks the $.each, does not return
						}
					}.bind(this));
				}
				if(!isVisible){
					return false;
				}
			}

			if(!filter.getShowResolved()){
				if(commentModel.get('is_resolved')){//Comment is resolved, filter hides resolved
					return false;
				}
			}
			if(!filter.getShowDeleted()){
				if(commentModel.get('is_deleted')){//Comment is deleted, filter hides deleted
					return false;
				}
			}
			return true;
		},
		/**
		 * Updates the visibleRootComments collection so that it contains
		 * all (and only) the visible root comments
		 */
		filterVisibleComments: function(){
			this.commentChannel.trigger('visible:collection:change:start');
			this.rootComments.each(function(comment){
				this._filterSingleComment(comment);
			}.bind(this));
			this.commentChannel.trigger('visible:collection:change:end');			
		},
		_filterSingleComment: function(comment){
			if(this._isCommentVisible(comment)){
				this.visibleRootComments.add(comment);
				comment.setIsVisible(true);
			}else{
				this.visibleRootComments.remove(comment);
				comment.setIsVisible(false);
			}
		},
		_addComment: function(newCommentCollection){
			this.comments.add(newCommentCollection);			
			this.rootComments.add(newCommentCollection);
			this.visibleRootComments.add(newCommentCollection);
		},
		_createClassApplier: function(cid){
			var lSelection = this._getPreviewSelection();
			var applier = rangy.createClassApplier(gCommentPreviewElementClass + '_' + cid, {
				elementTagName: 'span', 
				elementAttributes: {
					'comment_id': cid
				}, 
				useExistingElements: false,
				onElementCreate: function (a, b) { //remove highlighting span inside citations
					setTimeout(function () {
						if($(a).closest('cite').length) {
//							$(a).replaceWith(function () {
//								return this.innerHTML;
//							});
						}
					}, 10);
				}
			});
			applier.applyToRange(lSelection.getRangeAt(0));
		},
		_wrapSelection: function(cid){
			this._createClassApplier(cid);

			var wrapTags = this._getPreviewContent().find('span[comment_id="'+cid+'"]');
			var len = wrapTags.length;
			$.each(wrapTags, function(index, el){
				if(index == 0){

					if(el.parentNode.nodeName.toLowerCase() == "xref"){
						$('<'+gCommentMarkNodeName+' '+gCommentStartPosNodeName+'="1" '+gCommentIdAttributeName+'="'+cid+'" '+gCommentInCirationAttributeName+'></'+gCommentMarkNodeName+'>').insertBefore(el.parentNode.parentNode);
					}else if(_.indexOf(gCommentCitations, el.parentNode.nodeName.toLowerCase()) > -1){
						$('<'+gCommentMarkNodeName+' '+gCommentStartPosNodeName+'="1" '+gCommentIdAttributeName+'="'+cid+'" '+gCommentInCirationAttributeName+'></'+gCommentMarkNodeName+'>').insertBefore(el.parentNode);
					}else{
						$('<'+gCommentMarkNodeName+' '+gCommentStartPosNodeName+'="1" '+gCommentIdAttributeName+'="'+cid+'"></'+gCommentMarkNodeName+'>').insertBefore(el);
					}
				}
				if(index == (len-1)){

					if(el.parentNode.nodeName.toLowerCase() == "xref"){
						$('<'+gCommentMarkNodeName+' '+gCommentEndPosNodeName+'="1" '+gCommentIdAttributeName+'="'+cid+'" '+gCommentInCirationAttributeName+'></'+gCommentMarkNodeName+'>').insertAfter(el.parentNode.parentNode);
					}else if(_.indexOf(gCommentCitations, el.parentNode.nodeName.toLowerCase()) > -1){
						$('<'+gCommentMarkNodeName+' '+gCommentEndPosNodeName+'="1" '+gCommentIdAttributeName+'="'+cid+'" '+gCommentInCirationAttributeName+'></'+gCommentMarkNodeName+'>').insertAfter(el.parentNode);
					}else{
						$('<'+gCommentMarkNodeName+' '+gCommentEndPosNodeName+'="1" '+gCommentIdAttributeName+'="'+cid+'"></'+gCommentMarkNodeName+'>').insertAfter(el);
					}
				}
			});
		},
		_getInstanceContent: function(content){
			this.filterModel = this.commentChannel.request('get:page:model').getFilter();
			var listCommentIds = [];
			$(content).find(gCommentMarkNodeName + '[' + gCommentStartPosNodeName + '], ' + gCommentMarkNodeName + '[' + gCommentEndPosNodeName + ']').each(function (i, commentNode) {
				var commentId = parseInt($(commentNode).attr(gCommentIdAttributeName));
				if(_.indexOf(listCommentIds, commentId) == -1) {
					listCommentIds.push(commentId); // only check if exist commentId
					var commentModel = this.comments.get(commentId);
					if(!this.filterModel.getShowResolved()) { // Hide Resolved comments
						if(!commentModel.get('is_resolved')) {//Comment is resolved, filter hides resolved
							this.commentChannel.trigger('mark:edited:instance:comment', commentId);
						}
					} else {
						this.commentChannel.trigger('mark:edited:instance:comment', commentId);
					}
				}
			}.bind(this));
		},
		_checkSelectedTextForActiveComment: function (e) {
			// if CTRL + ALT + M (or separated) break
			if((e.ctrlKey || e.which == 17 || e.altKey || e.which == 18) || (e.which == 17 && e.altKey && e.which == 77)) {
				return false;
			}
			var selectionPos = this._getSelectedTextPos();
			var lSelection = this._getPreviewSelection();
			if(!selectionPos.isCommentingAllowed()) {
				this.commentChannel.trigger('commenting:forbidden', e);
			} else {
				var isEditable = this.commentChannel.request('get:document:editable');
				if(!isEditable && $.trim(lSelection.toString()) == '') {
					this.commentChannel.trigger('commenting:forbidden', e);
				} else {
					this.commentChannel.trigger('commenting:allowed', e);
				}

			}
			var lStartNode, lStartOffset, lEndNode, lEndOffset;
			if(_.isFunction(lSelection.isBackwards)){
				if(!lSelection.isBackwards()) {
					lStartNode = lSelection.anchorNode;
					lStartOffset = lSelection.anchorOffset;
					lEndNode = lSelection.focusNode;
					lEndOffset = lSelection.focusOffset;
				} else {
					lStartNode = lSelection.focusNode;
					lStartOffset = lSelection.focusOffset;
					lEndNode = lSelection.anchorNode;
					lEndOffset = lSelection.anchorOffset;
				}
			}
			lSelection.detach();
			if(!lStartNode || !lEndNode) {
				return;
			}

			if(lStartNode.nodeType == 1) {
				lStartNode = lStartNode.childNodes[lStartOffset];
			}
			if(lEndNode.nodeType == 1) {
				lEndNode = lEndNode.childNodes[lEndOffset];
			}

			if(!lStartNode || !lEndNode) {
				return;
			}

			var lActiveCommentId = false;
			var _this = this;
			var contentPreview = this._getPreviewContent();
			this._getPreviewContent().find(gCommentMarkNodeName + '[' + gCommentStartPosNodeName + ']').each(function (pIdx) {
				var lCommentId = $(this).attr(gCommentIdAttributeName);
				var lEndCommentNode = contentPreview.find(gCommentMarkNodeName + '['+gCommentEndPosNodeName+'][' + gCommentIdAttributeName + '="' + lCommentId + '"]')[0];

				var lCommentStartOrderRelativeToSelectionStart = _this._compareNodesOrder(lStartNode, this);
				var lCommentStartOrderRelativeToSelectionEnd = _this._compareNodesOrder(lEndNode, this);
				var lCommentEndOrderRelativeToSelectionStart = _this._compareNodesOrder(lStartNode, lEndCommentNode);

				if(lCommentStartOrderRelativeToSelectionStart > 0 && lCommentEndOrderRelativeToSelectionStart <= 0) {
					// The selection start is between the comment markers
					lActiveCommentId = lCommentId;
					return false;
				}
				if(lCommentStartOrderRelativeToSelectionStart == 0) {
					// The selection starts in the comment start marker
					lActiveCommentId = lCommentId;
					return false;
				}
				if(lCommentStartOrderRelativeToSelectionStart < 0 && lCommentStartOrderRelativeToSelectionEnd >= 0) {
					// The comment nodes are between the selection
					lActiveCommentId = lCommentId;
					return false;
				}
			});
			if(!lActiveCommentId) {
				this._deactivateAllComments();
			} else {
				this._makeCommentActive(lActiveCommentId);
			}
		},
		/**
		 * Връща 1 ако pNodeA е преди pNodeB в DOM-a.
		 * Ако двата node-a съвпадат - 0
		 * и -1 в противен случай
		 * @param pNodeA
		 * @param pNodeB
		 */
		_compareNodesOrder: function (pNodeA, pNodeB) {
			if(pNodeB == undefined || pNodeA == undefined){
				return;
			}
			var position = pNodeA.compareDocumentPosition(pNodeB);
			if(position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS){
				return 1;
			}
			if(position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY){
				return -1;
			}
			return 0;
		},
		_deactivateAllComments: function () {
			this.commentChannel.trigger('deactivate:comments', 5);
		},

		_makeCommentActive: function (pCommentId) {
			this.commentChannel.trigger('activate:comment', pCommentId);
		},
		/**
		 * Scrolls to the specified comment's markers(i.e. comment start tag)
		 * or to the top of the page if the comment is general
		 * @param pCommentId
		 * @returns a Deferred object which resolves when the animation
		 * completes (or resolves right away if there is no animation)
		 */
		_scrollToComment: function(pCommentId){
			var res = $.Deferred().resolve();
			var $lFirstCommentNode = this._getCommentMarkupFirstNode(pCommentId);
			//For general comments we always scroll to the top
			var top = 0;
			if($lFirstCommentNode.length){//Inline comment
				var delta = 5;
				top = $lFirstCommentNode.offset().top - delta; // - $('#'+gPreviewIframeId).offset().top
				//This is not necessary - we need to scroll to the actual position in the iframe
				//0 of the iframe corresponds to 0 in the window and they are synced
				//- this._getPreviewIframeTopOffset();
			}
			
			$(window).scrollTop(top);
			return res;
		},
		_isCommentMarkupVisibleOnScreen: function(pCommentId){
			var $firstCommentNode = this._getCommentMarkupFirstNode(pCommentId);
			if(!$firstCommentNode.length){
				//No comment markup(e.g. general) - we assume that it is not visible
				//This will cause us to always scroll to the top, when we select a general comment
				return false;
			}
			return this._isElementVisibleOnScreen($firstCommentNode[0]);
		},
		_getCommentVerticalPosition: function (pCommentId) {
			var $lFirstCommentNode = this._getCommentMarkupFirstNode(pCommentId);
			if(!$lFirstCommentNode.length)
				return 0;
			return $lFirstCommentNode.offset().top + $('#' + gPreviewIframeId).offset().top;
		},
		_getCommentMarkupFirstNode: function(pCommentId){
			return this._getPreviewContent().find("*[comment_id~='" + pCommentId + "'],*["+gCommentIdAttributeName+"='" + pCommentId + "']").first();
		},
		_getSelectedTextPos: function (expandSelectionIfCollapsed) {
			var result = new Comments.selectionPositionModel();
			var lSelection = this._getPreviewSelection();
			
			if(!lSelection){
				return result;
			}

			if(lSelection.isCollapsed && expandSelectionIfCollapsed){
				/**
				 * On empty selection auto select previous word
				 */
				//if(lSelection instanceof new WrappedSelection())
				lSelection.expand("word", {
					trim: true,
					wordOptions: {
						includeTrailingSpace: true,
						wordRegex: /[a-z0-9.;:-]+(['\-][a-z0-9.;:-]+)*/gi
					},
					characterOptions: {
						ignoreCharacters: '\ufeff' //ignore zero width character
					}
				});
				//check if something is selected
				var lNewSelection = this._getPreviewSelection();
				if(lNewSelection.isCollapsed) { //not selected -> try selecting the previous word
					var range = lNewSelection.getRangeAt(0);
					range.collapse(false);
					range.moveStart("word", -1);
					lNewSelection.setSingleRange(range);
				}
			}

			var lStartNode, lEndNode, lStartOffset, lEndOffset, lStartNodeName, lEndNodeName;
			 

			if(lSelection.isBackwards()) {
				lEndNode = lSelection.anchorNode;
				lEndOffset = lSelection.anchorOffset;
				lStartNode = lSelection.focusNode;
				lStartOffset = lSelection.focusOffset;
			} else {
				lStartNode = lSelection.anchorNode;
				lStartOffset = lSelection.anchorOffset;
				lEndNode = lSelection.focusNode;
				lEndOffset = lSelection.focusOffset;
			}
			
			if(lStartNode && lEndNode){
				/*if(_.indexOf(gCommentCitations, lStartNode.parentNode.nodeName.toLowerCase()) > -1){
					lStartOffset = lStartNode.length;
					lSelection.setStart(lStartNode, 0);
				}
				if(_.indexOf(gCommentCitations, lEndNode.parentNode.nodeName.toLowerCase()) > -1){
					lEndOffset = lEndNode.length;
					lSelection.setEnd(lEndNode, lEndOffset);
				}

				if(lStartNode.parentNode.nodeName.toLowerCase() == "xref"){
					lStartOffset = lStartNode.length;
					lSelection.setStart(lStartNode, 0);
				}
				if(lEndNode.parentNode.nodeName.toLowerCase() == "xref"){
					lEndOffset = lEndNode.length;
					lSelection.setEnd(lEndNode, lEndOffset);
				}*/
			}
			
			// lSelection.focusNode.parentNode.nodeName.toLowerCase // xref
			/*
			 * Save selection text before detach
			 */
			result.set('comment_selection', $.trim(lSelection.toString()));
			lSelection.detach();
			

			var lStartNodeDetails = this._getNodePositionDetails(lStartNode, lStartOffset);
			var lEndNodeDetails = this._getNodePositionDetails(lEndNode, lEndOffset);
			result.set('start_instance_id', lStartNodeDetails['instance_id']);
			result.set('start_field_id', lStartNodeDetails['field_id']);
			result.set('end_instance_id', lEndNodeDetails['instance_id']);
			result.set('end_field_id', lEndNodeDetails['field_id']);
			result.set('selection_is_empty', lSelection.isCollapsed);
			result.set('is_read_only', !this.commentChannel.request('get:document:editable'));


			return result;
		},
		_getNodePositionDetails: function (pNode) {
			var lResult = {
				'instance_id': 0,
				'field_id': 0,
				'offset': 0,
			};

			if(!pNode) {
				return lResult;
			}

			var lInstanceHolder = $(pNode).closest('*[instance_id]');
			var lFieldHolder = $(pNode).closest('*[field_id]');

			if(!lInstanceHolder.length)
				return lResult;

			lResult.instance_id = lInstanceHolder.attr('instance_id');
			var lFieldHolderParents = lFieldHolder.parents();
			if(lFieldHolder.length && (jQuery.inArray(lInstanceHolder[0], lFieldHolderParents) > -1 || lInstanceHolder[0] === lFieldHolder[0])) {//Field-a е от instance-a
				lResult.field_id = lFieldHolder.attr('field_id');
			} else {//Field-a e parent на възела. За целта трябва да видим къде да се позиционираме
				//във възела. Може да сме между field-ове, преди всички field-ове или след всички field-ове
				var lInstanceFields = lInstanceHolder.find('*[field_id]');
				var lPrevField = null;
				for (var i = 0; i < lInstanceFields.length; ++i) {
					var lField = $(lInstanceFields.get(i));
					if(lField.closest('*[instance_id]') != lInstanceHolder) {//Този field е дете на някой подобект
						continue;
					}
					if(this._compareNodesOrder(lField[0], pNode) > 0) {
						lPrevField = lField;
					} else {//Спираме при първия field, който е след възела
						break;
					}
				}
				if(lPrevField !== null) {//Имаме предишен field
					lResult.field_id = lPrevField.attr('field_id');
					lResult.offset = -1;
				} else {//Най в началото на instance-a
					lResult.offset = 0;
				}
			}

			return lResult;
		},
		_getPreviewSelection: function () {
			var lIframe = this._getPreviewIframe();
			if(!lIframe || !rangy.getSelection)
				return false;
			var lSelection = rangy.getSelection(lIframe);
			return lSelection;
		},
		_getPreviewIframe: function(){
			return $('#' + gPreviewIframeId)[0];
		},
		_getPreviewIframeTopOffset: function(){
			return $(this._getPreviewIframe()).offset().top;
		},
		_getPreviewContent: function() {
			return $(this._getPreviewIframe()).contents();

		},
		_SelectPreviousNextComment: function(pPrevious){
			if(!this.visibleRootComments.length){
				return;
			}
			var selectedComment = this.visibleRootComments.get(this.pageModel.getActiveCommentId());
			var newCommentIdx = 0;
			if(_.isUndefined(selectedComment)){
				newCommentIdx = pPrevious ? this.visibleRootComments.length - 1 : 0;
			}else{
				var curIdx = this.visibleRootComments.indexOf(selectedComment);
				newCommentIdx = pPrevious ? curIdx - 1 : curIdx + 1;
			}
			if(newCommentIdx < 0){
				newCommentIdx = this.visibleRootComments.length - 1;
			}
			if(newCommentIdx >= this.visibleRootComments.length){
				newCommentIdx = 0;
			}
			var lResultCommentId = this.visibleRootComments.at(newCommentIdx).id;
			this._makeCommentActive(lResultCommentId);
		},
		_isElementVisibleOnScreen: function( element ) {
			var $element = $(element);
			if(!$element.length){
				return true;
			}
			var delta = 5;
			//The element is considered visible if there are at least delta px between the top,
			//the bottom of the visible area and the element
			var windowHeight = $(window).height(); // Viewport Height
			var	scrollWindowTop = $(window).scrollTop(); // Scroll Top
			var	elementOffsetTop = $element.offset().top;			
			var iframeTopOffset = this._getPreviewIframeTopOffset();
			var visibleIframeAreaHeight = windowHeight - iframeTopOffset; 

			return elementOffsetTop < (visibleIframeAreaHeight + scrollWindowTop - delta) 
				&& elementOffsetTop > scrollWindowTop + delta;			
		},
		_createRegularCKEditorObject: function(textareaId, settings){

			var options = $.extend({
				extraPlugins: 'removeformat,floating-tools,confighelper,paste_custom,clipboard',
				toolbar: 'EmptyToolbar',
				floatingtools : 'CommentToolbar',
				startupFocus: false,
				height: 75,
				fullPage: false,
				resize_enabled: false,
				removePlugins: 'resize,autogrow',
				autoGrow_onStartup:true,
				contentsCss: '/lib/css/comments_cke_iframe.css',
			}, settings);
			
			CKEDITOR.config.language = 'en';
			try{
				CKEDITOR.replace(textareaId, options);
			}catch(e){
				return false;
			}

			return CKEDITOR.instances[textareaId];
		},
		/**
		 * Renders the time of the creation/edition of the comment
		 * in a format of "X minutes/hours ago" and sets a new timer so that the
		 * label is updated after 1 unit of the time has passed
		 */
		setCommentDateLabel: function(view){
			_this = view;
			var lastmodDateInSeconds = _this.model.get('createdate_in_seconds');
			var lastmodDate = _this.model.get('createdate');
			var lCurrentDate = new Date();
			var lYear = lCurrentDate.getUTCFullYear();
			var lMonth = lCurrentDate.getUTCMonth();
			var lDays = lCurrentDate.getUTCDate();
			var lHours = lCurrentDate.getUTCHours();
			var lMinutes = lCurrentDate.getUTCMinutes();
			var lSeconds = lCurrentDate.getUTCSeconds();
			var lMilliseconds = lCurrentDate.getUTCMilliseconds();
			var lCurrentSeconds = Math.floor(Date.UTC(lYear, lMonth, lDays, lHours, lMinutes, lSeconds, lMilliseconds) / 1000);
			var lLabel = '';
			var lTimeoutSeconds = 0;
			var lDiff = lCurrentSeconds - lastmodDateInSeconds;
			//Remove the offset of the current time to UFC time because pDateInSeconds is in UFC time
			lDiff -= lCurrentDate.getTimezoneOffset() * 60;//The offset is in minutes
			if(lDiff < 60){
				lLabel = 'less than a minute ago';
				lTimeoutSeconds = 60 - lDiff;
			}else if(lDiff < 3600){
				lLabel = Math.floor(lDiff / 60);
				if(lLabel == 1){
					lLabel += ' minute';
				}else{
					lLabel += ' minutes';
				}
				lLabel += ' ago';
				lTimeoutSeconds = 60 - (lDiff % 60);
			}else if(lDiff < 3600 * 24){
				lLabel = Math.floor(lDiff / 3600);
				if(lLabel == 1){
					lLabel += ' hour';
				}else{
					lLabel += ' hours';
				}
				lLabel += ' ago';
				lTimeoutSeconds = 3600 - (lDiff % 3600);
			}else{
				lLabel = lastmodDate;
			}
			if(typeof _this.ui.dateHolder == "string"){
				return false;
			}
			_this.ui.dateHolder.html(lLabel);
		},

	});

});
