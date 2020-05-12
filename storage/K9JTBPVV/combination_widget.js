

function dsqComboTab(tab) {
	document.getElementById('dsq-combo-people').style.display = "none";
	document.getElementById('dsq-combo-popular').style.display = "none";
	document.getElementById('dsq-combo-recent').style.display = "none";
	document.getElementById('dsq-combo-tab-people').className = "dsq-combo-tab";
	document.getElementById('dsq-combo-tab-popular').className = "dsq-combo-tab";
	document.getElementById('dsq-combo-tab-recent').className = "dsq-combo-tab";

	document.getElementById('dsq-combo-' + tab).style.display = "block";
	document.getElementById('dsq-combo-tab-' + tab).className = "dsq-combo-tab dsq-active";
}

document.write(' \
<style type="text/css" media="screen">\
	 #dsq-combo-widget ul,\
	 #dsq-combo-widget li,\
	 #dsq-combo-widget ol,\
	 #dsq-combo-widget div,\
	 #dsq-combo-widget p,\
	 #dsq-combo-widget a,\
	 #dsq-combo-widget cite,\
	 #dsq-combo-widget img {\
	 border: 0;\
	 padding: 0;\
	 margin: 0;\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 }\
	 #dsq-combo-widget ul,\
	 #dsq-combo-widget li,\
	 #dsq-combo-widget ol {\
	 list-style-type: none;\
	 list-style-image: none;\
	 background: none;\
	 display: block;\
	 }\
	 #dsq-combo-widget #dsq-combo-content ul,\
	 #dsq-combo-widget #dsq-combo-content li,\
	 #dsq-combo-widget #dsq-combo-content ol,\
	 #dsq-combo-widget #dsq-combo-content div,\
	 #dsq-combo-widget #dsq-combo-content p,\
	 #dsq-combo-widget #dsq-combo-content a,\
	 #dsq-combo-widget #dsq-combo-content cite,\
	 #dsq-combo-widget #dsq-combo-content img {\
	 border: 0;\
	 padding: 0;\
	 margin: 0;\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 }\
	 #dsq-combo-widget #dsq-combo-content ul,\
	 #dsq-combo-widget #dsq-combo-content li,\
	 #dsq-combo-widget #dsq-combo-content ol {\
	 list-style-type: none;\
	 list-style-image: none;\
	 background: none;\
	 display: block;\
	 }\
	 .dsq-clearfix:after {\
	 content:".";\
	 display: block;\
	 height: 0;\
	 clear: both;\
	 visibility: hidden;\
	 }\
	 /* end reset */\
	 #dsq-combo-widget { ;\
	 text-align: left;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs {\
	 float: left;\
	 }\
	 #dsq-combo-widget #dsq-combo-content {\
	 position: static;\
	 }\
	 #dsq-combo-widget #dsq-combo-content h3 {\
	 float: none;\
	 text-indent: 0;\
	 background: none;\
	 padding: 0;\
	 border: 0;\
	 margin: 0 0 10px 0;\
	 font-size: 16px;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs li {\
	 display: inline;\
	 float: left;\
	 margin-right: 2px;\
	 padding: 0px 5px;\
	 text-transform: uppercase;\
	 }\
	 #dsq-combo-widget #dsq-combo-tabs li a {\
	 text-decoration: none;\
	 font-weight: bold;\
	 font-size: 10px;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box {\
	 margin: 0 0 20px;\
	 padding: 12px;\
	 clear: both;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box li {\
	 padding-bottom: 10px;\
	 margin-bottom: 10px;\
	 overflow: hidden;\
	 word-wrap: break-word;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-avatar {\
	 float: left;\
	 height: 48px;\
	 width: 48px;\
	 margin-right: 15px;\
	 }\
	 #dsq-combo-widget #dsq-combo-content .dsq-combo-box cite {\
	 font-weight: bold;\
	 font-size: 14px;\
	 }\
	 span.dsq-widget-clout {\
	 background-color:#FF7300;\
	 color:#FFFFFF;\
	 padding:0pt 2px;\
	 }\
	 #dsq-combo-logo { text-align: right; }\
	 /* Blue */\
	 #dsq-combo-widget.blue #dsq-combo-tabs li.dsq-active { background: #E1F3FC; }\
	 #dsq-combo-widget.blue #dsq-combo-content .dsq-combo-box { background: #E1F3FC; }\
	 #dsq-combo-widget.blue #dsq-combo-tabs li { background: #B5E2FD; }\
	 #dsq-combo-widget.blue #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #B5E2FD; }\
	 /* Grey */\
	 #dsq-combo-widget.grey #dsq-combo-tabs li.dsq-active { background: #f0f0f0; }\
	 #dsq-combo-widget.grey #dsq-combo-content .dsq-combo-box { background: #f0f0f0; }\
	 #dsq-combo-widget.grey #dsq-combo-tabs li { background: #ccc; }\
	 #dsq-combo-widget.grey #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #ccc; }\
	 /* Green */\
	 #dsq-combo-widget.green #dsq-combo-tabs li.dsq-active { background: #f4ffea; }\
	 #dsq-combo-widget.green #dsq-combo-content .dsq-combo-box { background: #f4ffea; }\
	 #dsq-combo-widget.green #dsq-combo-tabs li { background: #d7edce; }\
	 #dsq-combo-widget.green #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #d7edce; }\
	 /* Red */\
	 #dsq-combo-widget.red #dsq-combo-tabs li.dsq-active { background: #fad8d8; }\
	 #dsq-combo-widget.red #dsq-combo-content .dsq-combo-box { background: #fad8d8; }\
	 #dsq-combo-widget.red #dsq-combo-tabs li { background: #fdb5b5; }\
	 #dsq-combo-widget.red #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #fdb5b5; }\
	 /* Orange */\
	 #dsq-combo-widget.orange #dsq-combo-tabs li.dsq-active { background: #fae6d8; }\
	 #dsq-combo-widget.orange #dsq-combo-content .dsq-combo-box { background: #fae6d8; }\
	 #dsq-combo-widget.orange #dsq-combo-tabs li { background: #fddfb5; }\
	 #dsq-combo-widget.orange #dsq-combo-content .dsq-combo-box li { border-bottom: 1px dotted #fddfb5; }\
	 </style>\
	 <div id="dsq-combo-widget" class="grey">\
	 <ul id="dsq-combo-tabs">\
	 <li id="dsq-combo-tab-people" ><a href="#" onclick="dsqComboTab(\'people\'); return false">People</a></li>\
	 <li id="dsq-combo-tab-recent" ><a href="#" onclick="dsqComboTab(\'recent\'); return false">Recent</a></li>\
	 <li id="dsq-combo-tab-popular" class="dsq-active"><a href="#" onclick="dsqComboTab(\'popular\'); return false">Popular</a></li>\
	 </ul>\
	 <div id="dsq-combo-content">\
	 <div id="dsq-combo-people" class="dsq-combo-box" style="display:none">\
	 <h3>Top Commenters</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/huliopapalatung/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/11450/9052/avatar92.jpg?1438267515">\
	 </a>\
	 <cite><a href="https://disqus.com/by/huliopapalatung/">jun</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;674 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_XrZxrvBB7U/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/10950/3934/avatar92.jpg?1438290760">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_XrZxrvBB7U/">Ioanes</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;606 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_ETbgdCvUvH/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/5112/1835/avatar92.jpg?1438251664">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_ETbgdCvUvH/">Captain</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;528 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_w8w4LdaKVg/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/10579/5660/avatar92.jpg?1438138473">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_w8w4LdaKVg/">John</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;408 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_TJcpdgwITd/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_TJcpdgwITd/">captain</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;340 posts</div>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1468285792/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-recent" class="dsq-combo-box" style="display:none">\
	 <h3>Recent Comments</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/greyjulia/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/greyjulia/">greyjulia</a>\
	 <span class="dsq-widget-comment"><p>Students have been complaining about Raulerson for years.. Not just the ones who "slept in class", but even members of his Aeronautical Dolphins club. I highly doubt PSS would get rid of one of...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/mhs-gives-raulerson-pink-slip/">MHS gives Raulerson pink slip</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/mhs-gives-raulerson-pink-slip/#comment-2798623635">1 day ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/mamayanalang/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/mamayanalang/">Mamaya Na Lang</a>\
	 <span class="dsq-widget-comment"><p>Ride a bike or walk.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/new-vehicle-commerce-tinian/">New vehicle for Commerce-Tinian</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/new-vehicle-commerce-tinian/#comment-2798579194">1 day ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/pafao/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/13089/9030/avatar92.jpg?1415980241"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/pafao/">pafao</a>\
	 <span class="dsq-widget-comment"><p>You don\'t get what Chamoru  First  is trying to get across?  Wow!</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/yet-another-chinese-farmer-killed/">Yet another Chinese farmer killed</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/yet-another-chinese-farmer-killed/#comment-2797418142">1 day ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/pafao/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/13089/9030/avatar92.jpg?1415980241"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/pafao/">pafao</a>\
	 <span class="dsq-widget-comment"><p>Man, you are way off in left field; just curious, are you sure  you\'re not under something brain enhancement?  Strange comment....</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/yet-another-chinese-farmer-killed/">Yet another Chinese farmer killed</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/yet-another-chinese-farmer-killed/#comment-2797407171">1 day ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/saipanstorm/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/saipanstorm/">SaipanStorm</a>\
	 <span class="dsq-widget-comment"><p>Please solve these  cases. Murder appears to go unpunished here.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/police-obvious-signs-chinese-farmer-lifeless-time-found/">Police: Obvious signs Chinese farmer was lifeless for some time when found</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/police-obvious-signs-chinese-farmer-lifeless-time-found/#comment-2796863722">2 days ago</a></p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1468285792/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-popular" class="dsq-combo-box" >\
	 <h3>Most Discussed</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/torres-vows-work-epa-bring-cuc-compliance/">Torres vows to work with EPA to bring CUC into compliance</a>\
	 <p class="dsq-widget-meta">6 comments &middot; 3 days ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/yet-another-chinese-farmer-killed/">Yet another Chinese farmer killed</a>\
	 <p class="dsq-widget-meta">12 comments &middot; 1 day ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/mhs-gives-raulerson-pink-slip/">MHS gives Raulerson pink slip</a>\
	 <p class="dsq-widget-meta">16 comments &middot; 1 day ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/woman-allegedly-uses-airline-mileage-scheme-deceive-others/">Woman allegedly uses airline mileage scheme to deceive others</a>\
	 <p class="dsq-widget-meta">13 comments &middot; 5 days ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/small-communities-write-decide-guns/">‘Small communities have  right to decide on guns’</a>\
	 <p class="dsq-widget-meta">16 comments &middot; 5 days ago</p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1468285792/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 </div>\
	 </div>\
');
