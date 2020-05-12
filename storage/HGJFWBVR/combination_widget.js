

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
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/11450/9052/avatar92.jpg?1438267515">\
	 </a>\
	 <cite><a href="https://disqus.com/by/huliopapalatung/">jun</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;1131 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_XrZxrvBB7U/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/10950/3934/avatar92.jpg?1438290760">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_XrZxrvBB7U/">Ioanes</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;1089 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_TJcpdgwITd/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_TJcpdgwITd/">captain</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;716 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_ETbgdCvUvH/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/5112/1835/avatar92.jpg?1438251664">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_ETbgdCvUvH/">Captain</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;528 posts</div>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_w8w4LdaKVg/">\
	 <img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/10579/5660/avatar92.jpg?1438138473">\
	 </a>\
	 <cite><a href="https://disqus.com/by/disqus_w8w4LdaKVg/">NATIBU WARRIOR</a></cite>\
	 <div><span class="dsq-widget-clout" title="Clout: Reputation on Disqus"></span>&nbsp;&middot;&nbsp;433 posts</div>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="https://disqus.com"><img src="//a.disquscdn.com/1498860420/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-recent" class="dsq-combo-box" style="display:none">\
	 <h3>Recent Comments</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/mensahe/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/10273/6702/avatar92.jpg?1399936231"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/mensahe/">mensahe</a>\
	 <span class="dsq-widget-comment"><p>nice article.</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/becq-heightens-watchdog-role-vs-dumping/">BECQ heightens watchdog role vs dumping</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/becq-heightens-watchdog-role-vs-dumping/#comment-3435712958">18 hours ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/jennifercepeda/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/jennifercepeda/">Jennifer Cepeda</a>\
	 <span class="dsq-widget-comment"><p>thats what happens when the casino comes in!!! hire good engineers to study traffic flows and solve the problem!</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/ccc-members-ipi-review-vehicle-flow/">CCC members to IPI: Review vehicle flow</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/ccc-members-ipi-review-vehicle-flow/#comment-3435543824">20 hours ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_XrZxrvBB7U/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/10950/3934/avatar92.jpg?1438290760"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/disqus_XrZxrvBB7U/">Ioanes</a>\
	 <span class="dsq-widget-comment"><p>Redundancy!</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/ahead-of-the-times/">Ahead of the times</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/ahead-of-the-times/#comment-3435532825">20 hours ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_UsVYoZMQk6/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/forums/303/6217/avatar92.jpg?1401327391"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/disqus_UsVYoZMQk6/">deoppressolibres</a>\
	 <span class="dsq-widget-comment"><p>This may prove interesting, especially since Guam and CNMI are "quota exempt", just how many of these so called locally employer claimed classified "highly skilled worker" will actually qualify for...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/h-1b-premium-processing-resume-petitions/">H-1B premium processing to resume for some petitions</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/h-1b-premium-processing-resume-petitions/#comment-3435504939">21 hours ago</a></p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a href="https://disqus.com/by/disqus_L1wJrraSZm/"><img class="dsq-combo-avatar" src="https://c.disquscdn.com/uploads/users/8328/6002/avatar92.jpg?1433951912"></a>\
	 <a class="dsq-widget-user" href="https://disqus.com/by/disqus_L1wJrraSZm/">imjustsaying</a>\
	 <span class="dsq-widget-comment"><p>Aren\'t you the "editor"? Your job is journalism. If you don\'t like your workload, find another job. Don\'t look down on us grammatically challenged common folks. This is not your platform to try and...</p></span>\
	 <p class="dsq-widget-meta"><a href="http://www.saipantribune.com/index.php/fake-pr-serial-commas-four-letter-words/">Of fake PR, serial commas, and four-letter words</a>&nbsp;&middot;&nbsp;<a href="http://www.saipantribune.com/index.php/fake-pr-serial-commas-four-letter-words/#comment-3432624876">2 days ago</a></p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="https://disqus.com"><img src="//a.disquscdn.com/1498860420/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 <div id="dsq-combo-popular" class="dsq-combo-box" >\
	 <h3>Most Discussed</h3>\
	 <ul>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/fake-pr-serial-commas-four-letter-words/">Of fake PR, serial commas, and four-letter words</a>\
	 <p class="dsq-widget-meta">5 comments &middot; 21 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/company-eyes-building-1200-hotel-room-tanapag/">Company eyes building 1,200-room hotel in Tanapag</a>\
	 <p class="dsq-widget-meta">4 comments &middot; 9 hours ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/one-strike-rule-eyed-law-enforcers/">‘One-strike rule’ eyed for law enforcers</a>\
	 <p class="dsq-widget-meta">12 comments &middot; 2 days ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/cuc-says-abides-safety-rules/">CUC says it abides by safety rules</a>\
	 <p class="dsq-widget-meta">14 comments &middot; 1 week ago</p>\
	 </li>\
	 <li class="dsq-clearfix">\
	 <a class="dsq-widget-thread" href="http://www.saipantribune.com/index.php/ipi-wishes-expand-operations/">IPI wishes to expand operations</a>\
	 <p class="dsq-widget-meta">4 comments &middot; 3 days ago</p>\
	 </li>\
	 </ul>\
	 <div id="dsq-combo-logo"><a href="https://disqus.com"><img src="//a.disquscdn.com/1498860420/images/embed/widget-logo.png"></a></div>\
	 </div>\
	 </div>\
	 </div>\
');
