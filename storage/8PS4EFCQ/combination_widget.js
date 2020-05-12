

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
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;701 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_XrZxrvBB7U/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/10950/3934/avatar92.jpg?1438290760">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_XrZxrvBB7U/">Ioanes</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;696 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_ETbgdCvUvH/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/5112/1835/avatar92.jpg?1438251664">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_ETbgdCvUvH/">Captain</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;528 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_TJcpdgwITd/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_TJcpdgwITd/">captain</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;416 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_w8w4LdaKVg/">\
	 <img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/10579/5660/avatar92.jpg?1438138473">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_w8w4LdaKVg/">John</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;414 posts</div>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1475226101/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-recent" class="dsq-combo-box" style="display:none">\
	 <h3>Recent Comments</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_QjdO0EXnkr/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/disqus_QjdO0EXnkr/">CNMIJusticeFighter</a>\
	 <span class="dsq-widget-comment"><p>Stop the cry baby no action motor mouth and take action to produce real results nothing is impossible unless these do nothing GOP businesses or employers stop the discrimination of locals and us...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/nmi-faces-uncertain-future-transition-phase-expires/">NMI faces uncertain future as transition phase expires</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/nmi-faces-uncertain-future-transition-phase-expires/#comment-2935910562">1 hour ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/pafao/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/13089/9030/avatar92.jpg?1415980241"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/pafao/">pafao</a>\
	 <span class="dsq-widget-comment"><p>Very few indeed, maybe less than my left hand fingers shows. Maybe a few clowns but may not be as bad clowns who had currently sold their souls to the highest donors in public office today. I\'ll...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/future-of-our-people/">Future of our people</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/future-of-our-people/#comment-2935869853">2 hours ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/pafao/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/13089/9030/avatar92.jpg?1415980241"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/pafao/">pafao</a>\
	 <span class="dsq-widget-comment"><p>I think it is for the entire health and safety protection of every American U.S. citizens not of any particular ethnicity inalienable rights per se. The United States of America is a melting pot...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/honorable-books/">Honorable books</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/honorable-books/#comment-2935860247">3 hours ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/pafao/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/13089/9030/avatar92.jpg?1415980241"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/pafao/">pafao</a>\
	 <span class="dsq-widget-comment"><p>When you dilly-dally with garbage in, naturally you will be dealt with GARBAGE OUT. Isn\'t it so true, of course, unless you are a complete morbid moron. Regent members that are so embroiled in...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/black-eye-nmc/">‘It’s a black eye for NMC’</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/black-eye-nmc/#comment-2935845170">3 hours ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_meTnOhIaQd/"><img class="dsq-combo-avatar" src="//a.disquscdn.com/uploads/users/13115/1878/avatar92.jpg?1443219502"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/disqus_meTnOhIaQd/">RussMason</a>\
	 <span class="dsq-widget-comment"><p>Forgot to say... If you ever get a bill from CHC, or other hospital, where you were an in-patient, do not pay it. It\'s a racket, because most people do not know about ABN\'s and pay out of pocket....</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/if-youre-on-medicare/">If you’re on Medicare…</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/if-youre-on-medicare/#comment-2935829388">3 hours ago</a></p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1475226101/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-popular" class="dsq-combo-box" >\
	 <h3>Most Discussed</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/black-eye-nmc/">‘It’s a black eye for NMC’</a>\
	 <p class="dsq-widget-meta">7 comments &middot; 3 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/nmi-faces-uncertain-future-transition-phase-expires/">NMI faces uncertain future as transition phase expires</a>\
	 <p class="dsq-widget-meta">2 comments &middot; 1 hour ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/our-perilous-election/">Our perilous election</a>\
	 <p class="dsq-widget-meta">33 comments &middot; 19 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/pioneer-oriental-medicine/">A pioneer in Oriental medicine</a>\
	 <p class="dsq-widget-meta">3 comments &middot; 19 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/police-now-hunting-ex-firefighter-koshiba/">Police now hunting for ex-firefighter Koshiba</a>\
	 <p class="dsq-widget-meta">1 comment &middot; 12 hours ago</p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="http://disqus.com"><img src="//a.disquscdn.com/1475226101/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 </div>\
	 </div>\
');
