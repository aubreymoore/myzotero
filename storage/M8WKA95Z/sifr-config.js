var tradeGothicCn  = {
	src: 'http'+(('https:' == document.location.protocol) ? 's' : '')+'://www.ucr.edu/flash/TradeGothicCn.swf',
	ratios: [10, 1.32, 16, 1.27, 23, 1.23, 24, 1.21, 25, 1.22, 31, 1.21, 38, 1.2, 42, 1.19, 43, 1.2, 62, 1.19, 66, 1.18, 67, 1.19, 113, 1.18, 114, 1.17, 119, 1.18, 120, 1.17, 1.18]
};

sIFR.activate (tradeGothicCn);

sIFR.replace (tradeGothicCn, {
	selector: '#content h2',
	wmode: 'transparent',
	transparent: true,
	css: '.sIFR-root { color:#444444; }'
});
