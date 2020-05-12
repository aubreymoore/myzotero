$.preview = {};
preview = {};
PreviewApp = new Marionette.Application({
	regions: {
		left: '#document_tree_holder',
		main: '.P-Wrapper-Container-Middle',
		right: '#P-Layout-Base-Comment',
		navBar: '#P-Header-Comments-Nav',
		commentsFilter: '#P-Header-Comments-Filter',
		showCommentBtn: '#P-Show-Comment-Btn',
		documentType: '#P-Header-Document-Type'
	},
	Behaviors: {},
	$ns: preview,
});