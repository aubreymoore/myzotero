function loadArticleFormulas(){	
	$('.math-tex').each(function(pIdx, formulaNode){
		var data = $(formulaNode).attr('data-cke-widget-data');
		var formula = '';
		try{
			data = JSON.parse(decodeURIComponent(data));
			formula = data.math;
		}catch(e){			
		}
		if(!formula){
			formula = $(formulaNode).text();
		}
		$(formulaNode).html('<span class="formula">' + formula + '</span>');
		MathJax.Hub.Queue(['Typeset', MathJax.Hub, $(formulaNode).find('.formula')[0] ], function(){
			// console.log('Ready ' + formula);
		});
	});
}