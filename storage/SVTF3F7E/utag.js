//tealium universal tag - utag.loader ut4.30.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved. 

var utag_condload=false;try{(function(){function ul(src,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;a.getElementsByTagName('head')[0].appendChild(b)};if((""+document.cookie).match("utag_env_gci_desmoinesregister=([^\S;]*)")){if(RegExp.$1.indexOf("/prod/") === -1) {ul(RegExp.$1);utag_condload=true;__tealium_default_path='//tags.tiqcdn.com/utag/gci/desmoinesregister/prod/';}}})();}catch(e){};try{
// turn off initial utag view if we're not a "basic" page and will fire the utag.view() on our own
utag_data = self.utag_data || {};
if ('basic' != utag_data.partner_type) {
  window.utag_cfg_ovrd = {noview : true};
}
}catch(e){};
if(!utag_condload){try{
window.gaCreateCookie = function (name, value, seconds) {
  var temp = location.host.split('.').reverse();
  var root_domain = '.' + temp[1] + '.' + temp[0];    
  var d = new Date();
  if (seconds) d.setTime(d.getTime()+(seconds*1000));
  document.cookie = name + "=" + value + ";path=/;domain="+root_domain+";expires=" + d.toGMTString();
}; 

window.gaReadCookie = function(name){
  var pairs = document.cookie.split(";");
  for (var i=0; i<pairs.length; i++){
    var pair = pairs[i].split("=");
    if (name == jQuery.trim(pair[0])) return unescape(pair[1]);
  }
  return "";
};
}catch(e){}};
if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"gci.desmoinesregister",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      lq: [],
      bq: {},
      bk: {},
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\./.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      
      WQ: function(a, b, c, d, g) {
        utag.DB('WQ:' + utag.loader.wq.length);
        try {
          // this picks up a utag_data items added after utag.js was loaded
          // Gotcha: Data layer set after utag.js will not overwrite something already set via an extension.  Only "new" values are copied from utag_data
          // for case where utag_data is set after utag.js is loaded
          if(utag.udoname && utag.udoname.indexOf(".")<0){
            utag.ut.merge(utag.data,window[utag.udoname],0);
          }

          utag.handler.RE('view',utag.data,"bwq");
          // process load rules again if this flag is set
          if(utag.cfg.load_rules_at_wait){
            utag.handler.LR();
          }
        } catch (e) {utag.DB(e)};
	
	d=0;
        g=[]; 
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load == 4){
            //LOAD the bundled tag set to wait here
            this.f[b.id]=0;
            utag.loader.LOAD(b.id)
          }else if (b.load > 0) {
            g.push(b);
            //utag.loader.AS(b); // moved: defer loading until flags cleared
	    d++;
          }else{
            // clear flag for those set to wait that were not actually loaded
            this.f[b.id]=1;
          }
        }
        for (a = 0; a < g.length; a++) {
          utag.loader.AS(g[a]);
        }

	if(d==0){
	  utag.loader.END();
	}
      },
      AS: function(a, b, c, d) {
        utag.send[a.id] = a;
        if (typeof a.src == 'undefined') {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'utag.' + a.id + '.js')
        }
        a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v?a.v:utag.cfg.v);
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        this.f[a.id]=0;
        if (a.load == 2) {
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
          if(typeof a.cb!='undefined')a.cb();
        } else if(a.load==1 || a.load==3) {
          if (b.createElement) {
            c = 'utag_gci.desmoinesregister_'+a.id;
            if (!b.getElementById(c)) {
	      d = {
	        src:a.src,
		id:c,
                uid:a.id,
		loc:a.loc
              }
              if(a.load == 3){d.type="iframe"};
	      if(typeof a.cb!='undefined')d.cb=a.cb;
              utag.ut.loader(d);
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      OU: function(a, b, c, d, f){
        try {
          if (typeof utag.data['cp.OPTOUTMULTI'] != 'undefined') {
            c = utag.loader.cfg;
            a = utag.ut.decode(utag.data['cp.OPTOUTMULTI']).split('|');
            for (d = 0; d < a.length; d++) {
              b = a[d].split(':');
              if (b[1] * 1 !== 0) {
                if (b[0].indexOf('c') == 0) {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tcat == b[0].substring(1)) c[f].load = 0
                  }
                } else if (b[0] * 1 == 0) {
                  utag.cfg.nocookie = true
                } else {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tid == b[0]) c[f].load = 0
                  }
                }
              }
            }
          }
        } catch (e) {utag.DB(e)}
      },
      RDdom: function(o){
        o["dom.referrer"] = eval("document." + "referrer");
        o["dom.title"] = "" + document.title;
        o["dom.domain"] = "" + location.hostname;
        o["dom.query_string"] = ("" + location.search).substring(1);
        o["dom.hash"] = ("" + location.hash).substring(1);
        o["dom.url"] = "" + document.URL;
        o["dom.pathname"] = "" + location.pathname;
      },
      RDcp: function(o, b, c, d){
        b = b || utag.loader.RC();
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
      },
      RDqp: function(o, a, b, c){
        a = location.search + (location.hash+'').replace("#","&");
        if(utag.cfg.lowerqp){a=a.toLowerCase()};
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            if(c.length>1){
              o["qp." + c[0]] = utag.ut.decode(c[1])
            }
          }
        }
      },
      RDmeta: function(o, a, b, h){
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          try{
            h = a[b].name || a[b].getAttribute("property") || ""; 
          }catch(e){h="";utag.DB(e)};
          if (utag.cfg.lowermeta){h=h.toLowerCase()};
          if (h != ""){o["meta." + h] = a[b].content}
        }
      },
      RDva: function(o, a, b){
        // Read visitor attributes in local storage
        a = ""; 
        try{
          a = localStorage.getItem("tealium_va");
          if(!a || a=="{}")return;
          b = utag.ut.flatten({va : JSON.parse(a)});
          utag.ut.merge(utag.data,b,1);
        }catch(e){
          utag.DB("localStorage not supported");
        }
        
        // add items in "b" to data layer
      },
      RD: function(o, a, b, c, d) {
        utag.DB("utag.loader.RD");
        // temporary fix for multiple calls to RD
        if(typeof o["_t_session_id"]!="undefined"){return};
        a = (new Date()).getTime();
        b = utag.loader.RC();
        c = a + parseInt(utag.cfg.session_timeout);
        d = a;
	
	if(!b.utag_main){
	  b.utag_main={};
	}else if(b.utag_main.ses_id&&typeof b.utag_main._st!="undefined"&&parseInt(b.utag_main._st)<a){
	  delete b.utag_main.ses_id;
	}
	
        if(!b.utag_main.v_id){
          b.utag_main.v_id=utag.ut.vi(a);
        }

        if(!b.utag_main.ses_id){
          b.utag_main.ses_id=d+'';
          b.utag_main._ss=b.utag_main._pn=1;
          b.utag_main._sn=1+parseInt(b.utag_main._sn || 0);
        }else{
          d=b.utag_main.ses_id;
          b.utag_main._ss=0;
          b.utag_main._pn=1+parseInt(b.utag_main._pn);
          b.utag_main._sn=parseInt(b.utag_main._sn);
        }

        if(isNaN(b.utag_main._sn) || b.utag_main._sn<1){b.utag_main._sn=b.utag_main._pn=1}

        b.utag_main._st = c+'';

        utag.loader.SC("utag_main", {"v_id": b.utag_main.v_id, "_sn" : b.utag_main._sn, "_ss" : b.utag_main._ss, "_pn" : b.utag_main._pn + ";exp-session", "_st": c, "ses_id": d + ";exp-session"});

        o["_t_visitor_id"]=b.utag_main.v_id;
        o["_t_session_id"]=d;
	
        this.RDqp(o);
        this.RDmeta(o);
        this.RDcp(o,b);
        this.RDdom(o);
        this.RDva(o);
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        r = /^(.*?)=(.*)$/;
        s = /^(.*);exp-(.*)$/;
        t = (new Date()).getTime();
        for (c = 0; c < b.length; c++) {
          if (b[c].match(r)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
          e = utag.ut.decode(cv);
          if (typeof ck!="undefined"){
            if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
              e = e.split("$");
              g = [];
              j = {};
              for (f = 0; f < e.length; f++) {
                try{
                  g = e[f].split(":");
                  if (g.length > 2) {
                    g[1] = g.slice(1).join(":");
                  }
                  v = "";
                  if (("" + g[1]).indexOf("~") == 0) {
                    h = g[1].substring(1).split("|");
                    for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                    v = h
                  } else v = utag.ut.decode(g[1]);
                  j[g[0]] = v;
                }catch(er){utag.DB(er)};
              }
              o[ck] = {};
              for (f in utag.loader.GV(j)) {
                if (j[f] instanceof Array) {
                  n = [];
                  for (m = 0; m < j[f].length; m++) {
                    if (j[f][m].match(s)){
                      k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                      if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                    }
                  }
                  j[f] = n.join("|");
                } else {
                  j[f] = "" + j[f];
                  if (j[f].match(s)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                    j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                  }
                }
                if (j[f]) o[ck][f] = j[f];
              }
            } else if (utag.cl[ck] || utag.cl['_all_']) {
              o[ck] = e
            }
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        if (a=="utag_main" && utag.cfg.nocookie) return 0;
        v = "";
        var date = new Date();
        var exp = new Date();
        exp.setTime(date.getTime()+(365*24*60*60*1000));
        x = exp.toGMTString();
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push(g + ":" + encodeURIComponent(d[g]))
          };
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1
      },
      LOAD: function(a, b, c, d) {
        //utag.DB('utag.loader.LOAD:' + a);
	if(this.ol==0){
          if(utag.loader.cfg[a].block && utag.loader.cfg[a].cbf){
            this.f[a] = 1;
	    delete utag.loader.bq[a];
          }
	  for(b in utag.loader.GV(utag.loader.bq)){
            if(utag.loader.cfg[a].load==4 && utag.loader.cfg[a].wait==0){
              utag.loader.bk[a]=1;
              utag.DB("blocked: "+ a);
            }
	    utag.DB("blocking: " + b);
	    return;
	  }
	  utag.loader.INIT();
	  return;
	}
        utag.DB('utag.loader.LOAD:' + a);
	
        if (this.f[a] == 0) {
          this.f[a] = 1;
      	
	  if(utag.cfg.noview!=true){
	    if(utag.loader.cfg[a].send){
	      utag.DB("SENDING: "+a);
	      try{
		utag.sender[a].send('view',utag.handler.C(utag.data));
		utag.rpt['s_' + a] = 0;
	      } catch (e) {
                utag.DB(e);
		utag.rpt['s_' + a] = 1;
	      }
	    }
	  }
	  if(utag.loader.rf==0)return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0 || this.f[b] == 2) return
          }
	  utag.loader.END();
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if (document.readyState !== "loading") setTimeout(c, 1);
          else {
            if(typeof utag.loader.ready_q=="undefined"){
              utag.loader.ready_q=[]; 
              utag.loader.run_ready_q=function(){
                for(var i=0;i<utag.loader.ready_q.length;i++){
                  utag.DB("READY_Q:"+i);
                  try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};
                }
              }
            }
            utag.loader.ready_q.push(c);

            var RH;

            if(utag.loader.ready_q.length<=1){
              if (document.addEventListener) {
                RH = function() {
                  document.removeEventListener("DOMContentLoaded", RH, false);
                  utag.loader.run_ready_q()
                };
                document.addEventListener("DOMContentLoaded", RH, false);
                window.addEventListener("load", utag.loader.run_ready_q, false);
              } else if (document.attachEvent) {
                RH = function() {
                  if (document.readyState !== "loading") {
                    document.detachEvent("onreadystatechange", RH);
                    utag.loader.run_ready_q()
                  }
                };
                document.attachEvent("onreadystatechange", RH);
                window.attachEvent("onload", utag.loader.run_ready_q);
              }
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      },
      END: function(b, c, d, e, v, w){
        if(this.ended){return};
        this.ended=1;
	utag.DB("loader.END");
        b = utag.data;
        // add the default values for future utag.link/view calls
	if(utag.handler.base && utag.handler.base!='*'){
          e = utag.handler.base.split(",");
          for (d = 0; d < e.length; d++) {
            if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
          }
        }else if (utag.handler.base=='*'){
           utag.ut.merge(utag.handler.df,b,1);
        }

        utag.rpt['r_0']="t";
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }

        utag.rpt.ts['s'] = new Date();
	

        v = ".tiqcdn.com";
        w = utag.cfg.path.indexOf(v);
        if(w>0 && b["cp.utag_main__ss"]==1)utag.ut.loader({src:utag.cfg.path.substring(0,w)+v+"/utag/tiqapp/utag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
        
        utag.handler.RE('view',b,"end");
	utag.handler.INIT();
      }
    },
    DB: function(a, b) {
      // return right away if we've already checked the cookie
      if(utag.cfg.utagdb===false){
        return;
      }else if(typeof utag.cfg.utagdb=="undefined"){
        utag.db_log=[];
        b = document.cookie+'';
        utag.cfg.utagdb=((b.indexOf('utagdb=true') >= 0)?true:false);
      }
      if(utag.cfg.utagdb===true){
        utag.db_log.push(a);
        try{console.log(a)}catch(e){}
      }
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]))
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
      }
    },
    view: function(a,c,d) {
      return this.track({event:'view', data:a, cfg:{cb:c,uids:d}})
    },
    link: function(a,c) {
      return this.track({event:'link', data:a, cfg:{cb:c}})
    },
    track: function(a,b,c,d) {
      if (typeof a == "string") a = { event: a, data: b, cfg: {cb: c} };

      for(d in utag.loader.GV(utag.o)){
        try{
          utag.o[d].handler.trigger(a.event || "view", a.data || a, a.cfg)
        }catch(e){utag.DB(e)};
      }
      if(a.cfg && a.cfg.cb)try{a.cfg.cb()}catch(e){utag.DB(e)};
      return true
    },
    handler: {
      base: "",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        utag.DB('utag.handler.INIT');
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
	    utag.handler.RE(c.a, c.b);
            utag.handler.trigger(c.a, c.b)
          }
        }
        // Reset/clear the noview flag
        utag.cfg.noview=false;
        //##UTABSOLUTELAST##
      },
      test: function() {
        return 1
      },
      // reset and run load rules
      LR: function(){
        for(var d in utag.loader.GV(utag.cond)){
          utag.cond[d]=false;
        }
        utag.loader.loadrules();
        utag.loader.initcfg();
        // use the OPTOUTMULTI cookie value to override load rules
        utag.loader.OU();
      },
      // FUTURE: The third param "c" is a string that defines the location i.e. "blr" == before load rules
      RE:function(a,b,c,d,e,f,g){
        if(c && !this.cfg_extend){
          return 0; 
        }
        utag.DB('All Tags EXTENSIONS');
        if(typeof this.extend != "undefined"){
          g=0;
          for (d = 0; d < this.extend.length; d++) {
            try {
              /* FUTURE: Support for Extension Attributes */
              e=0;
              if(typeof this.cfg_extend!="undefined"){
                f=this.cfg_extend[d];
                if(typeof f.count == "undefined")f.count=0;
                if(f[a]==0 || (f.once==1 && f.count>0) || (typeof c!= "undefined" && f[c]==0)){
                  e=1
                }else{
                  if(typeof c!="undefined" && f[c]==1){g=1};
                  f.count++
                }
              }
              if(e!=1){
                this.extend[d](a, b);
                utag.rpt['ex_' + d] = 0
              }
            } catch (e) {
              utag.rpt['ex_' + d] = 1;
	      utag.ut.error({e:e.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});
            }
          }
          return g;
        }
      },
      trigger: function(a, b, c, d, e, f) {
        utag.DB('trigger:'+a);
        b = b || {};

        if (!this.iflag) {
          utag.loader.q.push({
            a: a,
            b: b
          });
          return;
        }

        utag.ut.merge(b,this.df,0);
        // make sure these values are current for AJAX pages
        utag.loader.RDqp(b);
        utag.loader.RDcp(b);
        utag.loader.RDdom(b);
        utag.loader.RDmeta(b);
        utag.loader.RDva(b);

        // set cfg.uids or cfg.tids to only run specific set of tags
        // utag.track( {event : ”view”, data: {myvar : “myval” }, cfg: {uids : [1,2,10] } } );
        
        if(c && c.uids){
          this.RE(a,b);
          for(f=0;f<c.uids.length;f++){
            d=c.uids[f];
            try {
                // bypass load rules
                if(typeof utag.sender[d]!="undefined"){
                  utag.sender[d].send(a, utag.handler.C(b));
                }else if (a=="view" && utag.loader.cfg[d].load!=2 && utag.loader.cfg[d].s2s!=1){
                  utag.ut.merge(utag.data,b,1);
                  utag.loader.AS({id : d, load : 1}); 
                }
            } catch (e) {utag.DB(e)}
          }
        }else if(utag.cfg.load_rules_ajax){
          // right now, load rules use utag.data (replace items in utag.data with items in b)
          this.RE(a,b,"blr");
          utag.ut.merge(utag.data,b,1);
          // clear and re-run load rules
          this.LR();
          this.RE(a,b);
          // TBD: Run through the "bwq" Extensions again here? (For now, require "bwq" is also set to "run once"?) 

          // TODO: use cfgsort? 
          for(d in utag.loader.cfg){
            try {
              if(utag.loader.cfg[d].load && utag.loader.cfg[d].send){
                if(typeof utag.sender[d]!="undefined"){
                  utag.sender[d].send(a, utag.handler.C(b));
		  utag.rpt['s_' + d] = 0;
                }else if (a=="view" && utag.loader.cfg[d].load!=2 && utag.loader.cfg[d].s2s!=1){
                  // bring in a new tag if the load rule condition is now true
                  utag.loader.AS({id : d, load : 1}); 
                }
              }
            }catch (e) {utag.DB(e)}
          }
        }else{
          this.RE(a,b);
          for (d in utag.loader.GV(utag.sender)) {
            try {
                utag.sender[d].send(a, utag.handler.C(b));
		utag.rpt['s_' + d] = 0;
            } catch (e) {utag.DB(e)}
          }
        }

      },
      // "sort-of" copy
      C: function(a, b, c, d) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if(a[c] instanceof Array){
            b[c] = a[c].slice(0)
          }else{
            // objects are still references to the original (not copies)
            b[c] = a[c]
          }
        }
        return b
      }
    },
    ut:{
      pad: function(a,b,c,d){
        a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return ""+d+a
      },
      vi: function(t,a,b){
        a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};return a
      },
      isEmptyObject: function(o, a) {
	for (a in o) {
          return false;
        }
        return true;
      },
      flatten: function(o){
        // stop when arriving at a string, array, boolean, number (float or integer)
        var a = {}; 
        function r(c, p) {
          if (Object(c) !== c || c instanceof Array) {
            a[p] = c;
          } else {
            if(utag.ut.isEmptyObject(c)){
              //a[p] = {};
            }else{
              for (var d in c) {
                r(c[d], p ? p+"."+d : d);
              }
            }
          }
        }
        r(o, "");

        return a;
      },
      merge: function(a, b, c, d) {
        if(c){
          for(d in utag.loader.GV(b)){
            a[d] = b[d]
          }
        }else{
          for(d in utag.loader.GV(b)){
            if(typeof a[d]=="undefined")a[d] = b[d]
          }
        }
      },
      decode: function(a, b) {
        b = "";
        try{b = decodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = unescape(a)};
        return b
      },
      error: function(a, b, c){
        if(typeof utag_err!="undefined"){
          utag_err.push(a)
        }
        c="";for(b in a){c+=b+":"+a[b]+" , "};
        utag.DB(c)
      },
      //TODO: Add wrapper utag.ut.libloader to call loader (for backwards compatibility) with legacy utag.ut.libloader calls
      loader: function(o, a, b, c, l) {
        a=document;
        if (o.type=="iframe") {
          b = a.createElement("iframe");b.setAttribute("height","1");b.setAttribute("width","1");b.setAttribute("style","display:none");
          b.setAttribute("src", o.src);
        }else if (o.type=="img"){
          utag.DB("Attach img: "+o.src);
          b=new Image();b.src=o.src;
          return;
        }else{
          b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";
          b.src = o.src;
        }
        if(o.id){b.id=o.id};
        if (typeof o.cb=="function") {
          b.hFlag=0;
          b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};
          b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}
        }
        l = o.loc || "head";
        c = a.getElementsByTagName(l)[0];
        if (c) {
          utag.DB("Attach to "+l+": "+o.src);
          if (l == "script") {
            c.parentNode.insertBefore(b, c);
          } else {
            c.appendChild(b)
          }
        }
      }
    }
  };
  utag.o['gci.desmoinesregister']=utag;
  utag.cfg = {
    v: "ut4.30.201607152143",
    // Enable load rules ajax feature by default
    load_rules_ajax: true,
    load_rules_at_wait: false,
    lowerqp: false,
    //noview: ##UTNOVIEW##,
    noview: utag_data.noview_flag, // GANNETT customization - disable static page event 
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    domain: ".usatoday.com",
    path: "//tags.tiqcdn.com/utag/gci/desmoinesregister/prod/",
    utid: "gci/desmoinesregister/201607152143"
  };try{var _gaq=_gaq || [];var pageTracker=pageTracker || {_trackEvent:function(c,d,e,f,g){g={ga_eventCat:c,ga_eventAction:d,ga_eventLabel:e,ga_eventValue:f};utag.link(g,null,[2945]);},_trackPageview:function(c){_gaq.push(['_trackPageview',c?c:null]);}}}catch(e){};utag.cond={18:0,19:0,21:0,23:0,25:0,26:0,27:0,28:0,29:0};
utag.pagevars=function(ud){ud = ud || utag.data;try{ud['js_page.location.href']=location.href}catch(e){utag.DB(e)};};
utag.loader.initdata = function() {   try {       utag.data = (typeof utag_data != 'undefined') ? utag_data : {};       utag.udoname='utag_data';    } catch (e) {       utag.data = {};       utag.DB('idf:'+e);   }};utag.loader.loadrules = function(_pd,_pc) {var d = _pd || utag.data; var c = _pc || utag.cond;for (var l in utag.loader.GV(c)) {switch(l){
case '18':try{c[18]|=(typeof d['requires_https']=='undefined')||(d['requires_https'].toString().toLowerCase()=='false'.toLowerCase())}catch(e){utag.DB(e)}; break;
case '19':try{c[19]|=(d['dom.pathname'].toString().indexOf('thankyou')>-1)}catch(e){utag.DB(e)}; break;
case '21':try{c[21]|=(d['dom.domain'].toString().indexOf('offers.')>-1)||(d['dom.pathname'].toString().indexOf('/thankyou')>-1)||(d['dom.domain'].toString().indexOf('fullaccess.')>-1)||(d['dom.domain']=='subscribe.azcentral.com')||(d['dom.domain'].toString().indexOf('promotions.')>-1)}catch(e){utag.DB(e)}; break;
case '23':try{c[23]|=(d['dom.domain'].toString().indexOf('offers.')>-1)}catch(e){utag.DB(e)}; break;
case '25':try{c[25]|=(d['dom.domain'].toString().indexOf('detroitnews')>-1&&typeof d['assetid']!='undefined'&&typeof d['requires_https']=='undefined'&&d['dom.pathname'].toString().indexOf('/story/')>-1)||(d['dom.domain'].toString().indexOf('detroitnews')>-1&&typeof d['assetid']!='undefined'&&d['requires_https'].toString().toLowerCase().indexOf('false'.toLowerCase())>-1&&d['dom.pathname'].toString().indexOf('/story/')>-1)}catch(e){utag.DB(e)}; break;
case '26':try{c[26]|=(d['dom.domain'].toString().indexOf('static')>-1&&d['dom.pathname'].toString().indexOf('/thank-you')>-1)}catch(e){utag.DB(e)}; break;
case '27':try{c[27]|=(d['dom.domain'].toString().indexOf('preview')<0)}catch(e){utag.DB(e)}; break;
case '28':try{c[28]|=(d['dom.domain'].toString().indexOf('preview')<0)}catch(e){utag.DB(e)}; break;
case '29':try{c[29]|=(typeof d['user_status']!='undefined'&&d['user_status']!='none')}catch(e){utag.DB(e)}; break;}}};utag.pre=function() {    utag.loader.initdata();utag.pagevars();    try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};    utag.loader.loadrules();        };utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b){ try{ if(1){try{b['gup_anonid']=document.cookie.match(/\bgup_anonid=([^;]*)/) && RegExp.$1}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b,c,d){
  b._ccity=(typeof b['customer_city']!='undefined')?b['customer_city']:'';
  b._ccountry=(typeof b['customer_country']!='undefined')?b['customer_country']:'';
  b._ccurrency=(typeof b['order_currency']!='undefined')?b['order_currency']:'';
  b._ccustid=(typeof b['customer_id']!='undefined')?b['customer_id']:'';
  b._corder=(typeof b['order_id']!='undefined')?b['order_id']:'';
  b._cpromo=(typeof b['order_coupon_code']!='undefined')?b['order_coupon_code']:'';
  b._cship=(typeof b['order_shipping']!='undefined')?b['order_shipping']:'';
  b._cstate=(typeof b['customer_state']!='undefined')?b['customer_state']:'';
  b._cstore=(typeof b['order_store']!='undefined')?b['order_store']:'web';
  b._csubtotal=(typeof b['order_subtotal']!='undefined')?b['order_subtotal']:'';
  b._ctax=(typeof b['order_tax']!='undefined')?b['order_tax']:'';
  b._ctotal=(typeof b['order_total']!='undefined')?b['order_total']:'';
  b._ctype=(typeof b['order_type']!='undefined')?b['order_type']:'';
  b._czip=(typeof b['customer_zip']!='undefined')?b['customer_zip']:'';
  b._cprod=(typeof b['product_id']!='undefined'&&b['product_id'].length>0)?b['product_id'].split(','):[];
  b._cprodname=(typeof b['product_name']!='undefined'&&b['product_name'].length>0)?b['product_name'].split(','):[];
  b._cbrand=(typeof b['product_brand']!='undefined'&&b['product_brand'].length>0)?b['product_brand'].split(','):[];
  b._ccat=(typeof b['product_category']!='undefined'&&b['product_category'].length>0)?b['product_category'].split(','):[];
  b._ccat2=(typeof b['product_subcategory']!='undefined'&&b['product_subcategory'].length>0)?b['product_subcategory'].split(','):[];
  b._cquan=(typeof b['product_quantity']!='undefined'&&b['product_quantity'].length>0)?b['product_quantity'].split(','):[];
  b._cprice=(typeof b['product_unit_price']!='undefined'&&b['product_unit_price'].length>0)?b['product_unit_price'].split(','):[];
  b._csku=(typeof b['product_sku']!='undefined'&&b['product_sku'].length>0)?b['product_sku'].split(','):[];
  b._cpdisc=(typeof b['product_discount']!='undefined'&&b['product_discount'].length>0)?b['product_discount'].split(','):[];
  if(b._cprod.length==0){b._cprod=b._csku.slice()};
  if(b._cprodname.length==0){b._cprodname=b._csku.slice()};
  function tf(a){if(a=='' || isNaN(parseFloat(a))){return a}else{return (parseFloat(a)).toFixed(2)}};
  b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};
},
function(a,b){
if(typeof b['dom.domain'] == 'undefined')
  b['dom.domain'] = location.hostname;

},
function(a,b){
try{
   var _domain = (function () {
          var domainSplit = document.domain.split('.'),
     l = domainSplit.length;
          return domainSplit[l - 2];
       })()
       if (_domain ==="usatoday")
_domain = 'usat';
  //if we're on a SAM page, pageName may already be populated via passed object, so try to use
  //pageName if it’s from SAM and if it's populated, else calculate it.
  //otherwise, if we're on a GDP site, set pageName the traditional way
  if ((/^subscribe|^account/i).test(document.location.host)) {
    b['pageName']=b['pageName']||(_domain+' :'+(b.pathName|| document.location.pathname || '/'));
  } else {
   b['pageName']=(_domain+' :'+(b.pathName|| document.location.pathname || '/'));
  }
  b['prevPageName']=b.prevpath && (_domain+':'+b.prevpath);
 }
 catch(e){}
/*
try{
	var _domain = (function () {
	      var domainSplit = document.domain.split('.'),
	      l = domainSplit.length;
	      return domainSplit[l - 2];
	   })();
	   
	   if (_domain ==="usatoday") {
	   	_domain = 'usat';
	   }

	/* check to see if we're on a gallery 
	if((/story pages gallery/).test(b.contenttype)) {
		// we've got an embedded gallery happening...
		b['pageName']=b.pathName ? [_domain, b.pathName].join(' :') : [_domain, document.location.pathname].join(' :'); 
	/* check to see if we're on SAM based pages 
	} else if((/^subscribe|^account|/i).test(document.location.host)) {
	  b['pageName']=b['pageName']||(_domain+' :'+(b.pathName|| document.location.pathname || '/'));
	} else {
		/* check to see if we've a video_url 
	  if(typeof(b['video_url']) !== 'undefined' && b['video_url'] !== '') {
	    var p = b['video_url'].split('/');
	    var d = p.splice(0,3); /* removes http: and domain 
	    var pathName = '/' + p.join('/');
	    var __domain = d[2].split('.');
	    var l = __domain.length;
	    __domain = __domain[l - 2];
	    if (__domain ==="usatoday") {
	   	__domain = 'usat';
	   }
	    b['pageName'] = __domain + ' :' + pathName;
	  } else {
	    b['pageName']=b['pageName']||(_domain+' :'+(b.pathName|| document.location.pathname || '/'));
	  }
	}

	b['prevPageName']=b.prevpath && (_domain+':'+b.prevpath);
}
catch(e){}
*/
},
function(a,b){
/*
 * Plugin: getTimeParting 1.3 - Set timeparting values based on time zone 
 */    

s_ut.getTimeParting=new Function("t","z","y",""
+"dc=new Date('1/1/2000');f=15;ne=8;if(dc.getDay()!=6||"
+"dc.getMonth()!=0){return'Data Not Available'}else{;z=parseInt(z);"
+"if(y=='2009'){f=8;ne=1};gmar=new Date('3/1/'+y);dsts=f-gmar.getDay("
+");gnov=new Date('11/1/'+y);dste=ne-gnov.getDay();spr=new Date('3/'"
+"+dsts+'/'+y);fl=new Date('11/'+dste+'/'+y);cd=new Date();"
+"if(cd>spr&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneO"
+"ffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear("
+");var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Fr"
+"iday','Saturday'];if(thisy!=y){return'Data Not Available'}else{;thi"
+"sh=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow="
+"days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>3"
+"0){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){th"
+"ish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+'"
+":'+mint+ap;var daystring=dow;var endstring=dt;if(t=='h'){return tim"
+"estring}if(t=='d'){return daystring};if(t=='w'){return en"
+"dstring}}};"
);
},
function(a,b){ try{ if(1){try{b['dayofweek']='sunday monday tuesday wednesday thursday friday saturday'.split(' ')[new Date().getDay()]}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['division']=s_account.indexOf('usatoday')==0?'usatoday':s_account.indexOf('gntbcst')==0?'broadcast':'newspaper';}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['events']=b["events"]||"event3";}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['gcionid']=document.cookie.match(/\bGCIONID=([^;]*)/) && RegExp.$1}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['hostname']=document.location.hostname}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['halfhour']=(function() {var h1= new Date(18e5*parseInt(new Date().getTime()/18e5)), h2= h1.getHours(); return (1+(h2+11)%12)+':'+(function(h) {return h.substr(h.length-2)})('0'+h1.getMinutes())+(h2>11 ?' pm' :' am');})() }catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['aam_segs']=unescape((document.cookie.match(/\baamusat=([^;]*)/), RegExp.$1||'')).replace(/[^\d]+/g, '|').substr(1) }catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['rsi_segs']=document.cookie.match(/\brsi_segs=([^;]*)/) && RegExp.$1}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){b['siteLabel']='reimagine'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['dom.url']=document.URL}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){
function taxonomy2list(taxonomy) {
  return taxonomy.toLowerCase().replace(/^[:\/]*/, '').replace(/[:\/]*$/, '').split(/[:\/][:\/]*/);
}

var sstslist= taxonomy2list(b.ssts || 'bugpages');
b.section= sstslist[0];
b.subsection= sstslist.slice(0,2).join(':');
b.topic= sstslist.slice(0,3).join(':');
b.ssts= sstslist.slice(0,4).join(':');

var awslist= taxonomy2list(b.cst || 'undefined');
b.category= awslist[0];
b.subcategory= awslist.slice(0,2).join(':');
b.cst= awslist.slice(0,3).join(':');
},
function(a,b){
if (b.gcionid === null) b.gcionid= ''
},
function(a,b){ try{ if(1){try{b['taxonomykeywords_array']=b.taxonomykeywords.split(',')}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['clean_url']=[window.location.protocol, "//", window.location.hostname, window.location.pathname].join('')}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['content_title']=window.document.title}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['abteststring']!='undefined'&&b['abteststring']!=''){b['events']='event3,event27'} } catch(e){ utag.DB(e) }  },
function(a,b,c,d,e,f,g){d=b['dom.referrer'];if(typeof d=='undefined')return;c=[{'(?:https?:)?(?:\/\/)?(account)\.(?:[^.]*\.[^\/]*)\/?':'true'},{'(?:https?:)?(?:\/\/)?(accountsolution)\.(?:[^.]*\.[^\/]*)\/?':'true'},{'(?:https?:)?(?:\/\/)?(offers)\.(?:[^.]*\.[^\/]*)\/?':'true'},{'(?:https?:)?(?:\/\/)?(promotions)\.(?:[^.]*\.[^\/]*)\/?':'true'},{'(?:https?:)?(?:\/\/)?(subscribe)\.(?:[^.]*\.[^\/]*)\/?':'true'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){g=new RegExp(f,'i');if(g.test(d)){b['referrer_subdomain_is_subscription']=c[e][f];m=true};};if(m)break};if(!m)b['referrer_subdomain_is_subscription']='false';},
function(a,b){ try{ if(1){try{b['referrer_is_same_domain']=(function(){var referrer_domain_array=(/(?:https?:)?(?:\/\/)?([^.]*\.)?([^.]*\.[^\/]*)\/?/i).exec(document.referrer);var referrer_subdomain="";var referrer_domain="";if(referrer_domain_array!=null&&referrer_domain_array.length==3){referrer_subdomain=referrer_domain_array[1];referrer_domain=referrer_domain_array[2];} var domain_array=(/(?:https?:)?(?:\/\/)?([^.]*\.)?([^.]*\.[^\/]*)\/?/i).exec(document.domain);var subdomain="";var domain="";if(domain_array!=null&&domain_array.length==3){subdomain=domain_array[1];domain=domain_array[2];} if(referrer_domain==domain){return"true";} return"false";})()}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((b['referrer_is_same_domain']=='true'&&b['referrer_subdomain_is_subscription']=='false')){b['referrer_is_subscription']='false'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['qp.utm_campaign']!='undefined'&&typeof b['qp.utm_campaign']!='undefined'&&b['qp.utm_campaign']!=''&&typeof b['referrer_is_subscription']!='undefined'&&b['referrer_is_subscription']=='false')){b['qp.opm_name']=b['qp.utm_campaign']} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['qp.utm_medium']!='undefined'&&typeof b['qp.utm_medium']!='undefined'&&b['qp.utm_medium']!=''&&typeof b['referrer_is_subscription']!='undefined'&&b['referrer_is_subscription']=='false')){b['qp.opm_position']=b['qp.utm_medium']} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['qp.utm_source']!='undefined'&&typeof b['qp.utm_source']!='undefined'&&b['qp.utm_source']!=''&&typeof b['referrer_is_subscription']!='undefined'&&b['referrer_is_subscription']=='false')){b['qp.opm_creative']=b['qp.utm_source']} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['qp.utm_term']!='undefined'&&typeof b['qp.utm_term']!='undefined'&&b['qp.utm_term']!=''&&typeof b['referrer_is_subscription']!='undefined'&&b['referrer_is_subscription']=='false')){b['qp.opm_id']=b['qp.utm_term']} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.url'].toString().toLowerCase().indexOf('opm_'.toLowerCase())>-1||b['dom.url'].toString().toLowerCase().indexOf('utm_'.toLowerCase())>-1){try{b['_ga_category']="onsite-promotion_" + b['qp.opm_name']}catch(e){};b['_ga_action']=b['qp.opm_position'];b['_ga_label']=b['qp.opm_creative']} } catch(e){ utag.DB(e) }  },
function(a,b){
utag.hasFired = utag.hasFired || {};
if(!utag.hasFired['36']) {
  if(b['qp.opm_name'] || b['qp.opm_id']
     && !b['ga_enh_action']
     && b['event_type'] && b['event_type'] == "view") {
    var opm_data = {
      ga_enh_action: "promo_click"
    };
    b['qp.opm_creative'] && (opm_data["qp.opm_creative"] = b['qp.opm_creative']);
    b['qp.opm_name'] && (opm_data["qp.opm_name"] = b['qp.opm_name']);
    b['qp.opm_position'] && (opm_data["qp.opm_position"] = b['qp.opm_position']);
    b['qp.opm_id'] && (opm_data["qp.opm_id"] = b['qp.opm_id']);
    utag.hasFired['36'] = 1;
    utag.link(opm_data);
    //null out on page load so they aren't double tracked
    b['qp.opm_creative'] = b['qp.opm_name'] = b['qp.opm_position'] = b['qp.opm_id'] = "";
  }
}
},
function(a,b){
if(document.URL.indexOf('/specialoffer')>-1){
  b['_ga_landing'] = 'Subscription';
  b['_ga_category'] = 'Subscription';
  b['_ga_action'] = 'Special Offer Landing Page';
}
},
function(a,b){
if(location.hostname.indexOf('subscribe.')>-1
   && location.pathname == "/"
   && document.URL.indexOf('#')==-1
   && document.URL.indexOf('?')==-1){
  b['_ga_landing'] = 'SubscriptionFR';
  b['_ga_category'] = 'SubscriptionFR';
  b['_ga_action'] = 'Full Rate Landing Page';
}
},
function(a,b){
if(b['_ga_landing']){
  window.gaCreateCookie('_cp_ga_cat',b['_ga_landing'],30*60);
  b['cp._cp_ga_cat'] = b['_ga_landing'];
}
},
function(a,b){ try{ if(b['eventtype']=='abtesttrack'){b['events']='event76'} } catch(e){ utag.DB(e) }  },
function(a,b){
function taxonomy2list(taxonomy) {
  return taxonomy.toLowerCase().replace(/^[:\/]*/, '').replace(/[:\/]*$/, '').split(/[:\/][:\/]*/);
}

var sstslist= taxonomy2list(b.ssts || 'bugpages');
b.section= sstslist[0];
b.subsection= sstslist.slice(0,2).join(':');
b.topic= sstslist.slice(0,3).join(':');
b.ssts= sstslist.slice(0,4).join(':');

var awslist= taxonomy2list(b.cst || 'undefined');
b.category= awslist[0];
b.subcategory= awslist.slice(0,2).join(':');
b.cst= awslist.slice(0,3).join(':');
},
function(a,b){ try{ if(typeof b['screenSize']!='undefined'){b['productName']='mobile web'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['gup_anonid']=='undefined'){try{b['gup_anonid']=document.cookie.match(/\bgup_anonid=([^;]*)/) && RegExp.$1}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){
b['platform'] = "desktop";
if (typeof siteInfo !== 'undefined') {
  b['platform'] = "mobileweb";
}
},
function(a,b){ try{ if(b['dom.query_string'].toString().indexOf('csp')>-1){b['queryparamtrack']=b['dom.query_string']} } catch(e){ utag.DB(e) }  },
function(a,b){
if (b.gcionid === null) b.gcionid= ''
},
function(a,b){ try{ if(1){try{b['is_secure']=(/https:/).test(document.location.protocol) ? true : false;}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){
b.hit_type = (a === 'link') ? 'link' : 'pageview';
},
function(a,b){ try{ if(typeof b['atypon_license_type']!='undefined'){b['user_status']=b['atypon_license_type']} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['platform'].toString().toLowerCase()=='mobile web'.toLowerCase()){b['block_test']=b['cp.__adblocker']} } catch(e){ utag.DB(e) }  },
function(a,b){
try{
  if( typeof (b.assetid) !== 'undefined') {
    if( (/event59/).test(b.events) ) {
      var evnts = b.events.split(',');
      var new_events = [];
      for(var i = 0; i<evnts.length; i++) {
	if( !(/event59/).test(evnts[i]) ) {
	  new_events.push(evnts[i]);
	}
      }
      b.events = new_events.join(',');
    }
    b.events = b.events + ',event59:' + b.assetid;
  }
} catch(e){}
},
function(a,b){ try{ if(1){try{b['canonical']=document.querySelector("link[rel='canonical']").href;}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b,c,d,e,f,g){d=b[''];if(typeof d=='undefined')return;c=[{'':''}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['']=c[e][f];m=true};};if(m)break};},
function(a,b,c,d,e,f,g){d=b[''];if(typeof d=='undefined')return;c=[{'':''}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['']=c[e][f];m=true};};if(m)break};},
function(a,b){
if (b.disableTealiumView) {
  return false;
}
},
function(a,b){
try {
  if(b.assetid) {
    b.originatingMarket = document.querySelector("link[rel='canonical']").href.match(/\/\/([^\/]+).+/)[1];
  }
} catch(e) {
  b.originatingMarket = e;
}
}];
  utag.handler.cfg_extend=[{"alr":1,"bwq":0,"id":"598","blr":0,"end":0},{"alr":1,"bwq":0,"id":"419","blr":0,"end":0},{"alr":1,"bwq":0,"id":"600","blr":0,"end":0},{"alr":1,"bwq":0,"id":"601","blr":0,"end":0},{"alr":1,"bwq":0,"id":"602","blr":0,"end":0},{"alr":1,"bwq":0,"id":"603","blr":0,"end":0},{"alr":1,"bwq":0,"id":"604","blr":0,"end":0},{"alr":1,"bwq":0,"id":"605","blr":0,"end":0},{"alr":1,"bwq":0,"id":"606","blr":0,"end":0},{"alr":1,"bwq":0,"id":"607","blr":0,"end":0},{"alr":1,"bwq":0,"id":"608","blr":0,"end":0},{"alr":1,"bwq":0,"id":"610","blr":0,"end":0},{"alr":1,"bwq":0,"id":"611","blr":0,"end":0},{"alr":1,"bwq":0,"id":"612","blr":0,"end":0},{"alr":1,"bwq":0,"id":"613","blr":0,"end":0},{"alr":1,"bwq":0,"id":"614","blr":0,"end":0},{"alr":1,"bwq":0,"id":"616","blr":0,"end":0},{"alr":1,"bwq":0,"id":"617","blr":0,"end":0},{"alr":1,"bwq":0,"id":"618","blr":0,"end":0},{"alr":1,"bwq":0,"id":"619","blr":0,"end":0},{"alr":1,"bwq":0,"id":"620","blr":0,"end":0},{"alr":1,"bwq":0,"id":"949","blr":0,"end":0},{"alr":1,"bwq":0,"id":"950","blr":0,"end":0},{"alr":1,"bwq":0,"id":"951","blr":0,"end":0},{"alr":1,"bwq":0,"id":"952","blr":0,"end":0},{"alr":1,"bwq":0,"id":"953","blr":0,"end":0},{"alr":1,"bwq":0,"id":"954","blr":0,"end":0},{"alr":1,"bwq":0,"id":"955","blr":0,"end":0},{"alr":1,"bwq":0,"id":"956","blr":0,"end":0},{"alr":1,"bwq":0,"id":"957","blr":0,"end":0},{"alr":1,"bwq":0,"id":"960","blr":0,"end":0},{"alr":1,"bwq":0,"id":"961","blr":0,"end":0},{"alr":1,"bwq":0,"id":"962","blr":0,"end":0},{"alr":1,"bwq":0,"id":"982","blr":0,"end":0},{"alr":1,"bwq":0,"id":"995","blr":0,"end":0},{"alr":1,"bwq":0,"id":"996","blr":0,"end":0},{"alr":1,"bwq":0,"id":"997","blr":0,"end":0},{"alr":1,"bwq":0,"id":"998","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1001","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1002","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1011","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1018","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1027","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1028","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1029","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1035","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1036","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1037","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1040","blr":0,"end":0},{"alr":1,"bwq":0,"id":"1042","blr":0,"end":0}];
  utag.loader.initcfg = function(){
    utag.loader.cfg={"41":{load:utag.cond[29],send:1,v:201605231522,wait:1,tid:13051},"48":{load:4,send:1,v:201510292019,wait:1,tid:13051},"59":{load:4,send:1,v:201510292019,wait:1,tid:12009},"74":{load:4,send:1,v:201510292019,wait:1,tid:6011},"93":{load:4,send:1,v:201510292019,wait:1,tid:7050},"143":{load:utag.cond[27],send:1,v:201604131831,wait:1,tid:3073},"235":{load:4,send:1,v:201510292019,wait:1,tid:7115},"693":{load:4,send:1,v:201510292019,wait:1,tid:3005},"778":{load:4,send:1,v:201606271501,wait:1,tid:2033},"1105":{load:4,send:1,v:201510292019,wait:1,tid:3004},"1600":{load:utag.cond[23],send:1,v:201603101942,wait:1,tid:13051},"1781":{load:4,send:1,v:201606271501,wait:1,tid:19041},"1917":{load:4,send:1,v:201510292019,wait:1,tid:7110},"2616":{load:4,send:1,v:201606271517,wait:1,tid:20067},"2621":{load:utag.cond[21],send:1,v:201604131831,wait:1,tid:6024},"2625":{load:4,send:1,v:201607152143,wait:1,tid:7115},"2628":{load:4,send:1,v:201510292019,wait:1,tid:6024},"2642":{load:4,send:1,v:201510292019,wait:1,tid:20067},"2667":{load:utag.cond[18],send:1,v:201607152143,wait:1,tid:20011},"2669":{load:4,send:1,v:201602032114,wait:1,tid:6020},"2723":{load:utag.cond[28],send:1,v:201604131831,wait:1,tid:20010},"2722":{load:4,send:utag.cond[28],v:201607152143,wait:1,tid:19063},"2729":{load:utag.cond[19],send:1,v:201602031900,wait:1,tid:13002},"2829":{load:4,send:1,v:201603221833,wait:1,tid:6026},"2931":{load:utag.cond[25],send:1,v:201603221833,wait:1,tid:20011},"2938":{load:4,send:1,v:201603290052,wait:1,tid:20010},"2945":{load:utag.cond[26],send:1,v:201604141514,wait:1,tid:7001}};
utag.loader.cfgsort=["41","48","59","74","93","143","235","693","778","1105","1600","1781","1917","2616","2621","2625","2628","2642","2667","2669","2723","2722","2729","2829","2931","2938","2945"];
  }
utag.loader.initcfg();
}

  if(typeof utag_cfg_ovrd!='undefined'){for(var i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[i]=utag_cfg_ovrd[i]};
  utag.loader.PINIT = function(a,b,c){
    utag.DB("Pre-INIT");
    if (utag.cfg.noload) {
      return;
    }

    try {
      // Initialize utag.data
      this.GET();
      // FUTURE: blr = "before load rules"
      if(utag.handler.RE('view',utag.data,"blr")){
        utag.handler.LR();
      }
      
    }catch(e){utag.DB(e)};
    // process 'blocking' tags (tags that need to run first)
    a=this.cfg;
    c=0;
    for (b in this.GV(a)) {
      // external .js files (currency converter tag) are blocking
      if(a[b].load>0 && (typeof a[b].src!='undefined'&&a[b].src!='')){
        a[b].block = 1
      }
      if(a[b].block){
        // handle case of bundled and blocking (change 4 to 1)
        // (bundled tags that do not have a .src should really never be set to block... they just run first)
        if(a[b].load==4)a[b].load=1; 
	c=1;
	this.bq[b]=1;
 	a[b].cb=function(){
          var d=this.uid;
          utag.loader.cfg[d].cbf=1;
          utag.loader.LOAD(d)
        };
        a[b].id=b; 
        this.AS(a[b]);
      }
    }
    if(c==0)this.INIT();
  };
  utag.loader.INIT = function(a, b, c, d, e) {
    utag.DB('utag.loader.INIT');
    if (this.ol == 1) return -1;
    else this.ol = 1;
    // The All Tags scope extensions run after blocking tags complete
    utag.handler.RE('view',utag.data);

    utag.rpt.ts['i'] = new Date();
     
    d = this.cfgsort;
    // TODO: Publish engine should sort the bundled tags first..
    for (a=0;a<d.length;a++){
      e = d[a];
      b = this.cfg[e];
      b.id = e;
      // s2s (ServerStream) tags do not load client-side
      if(b.block != 1 && b.s2s!=1){
        if (utag.loader.bk[b.id]){
          this.f[b.id]=0;
          utag.loader.LOAD(b.id)
        // do not wait if the utag.cfg.noview flag is set and the tag is bundled
        }else if (b.wait == 1 && utag.loader.rf == 0  && !(b.load==4 && utag.cfg.noview)) {
	  utag.DB('utag.loader.INIT: waiting ' + b.id);
          this.wq.push(b)
          this.f[b.id]=2;
        }else if (b.load>0){
	  utag.DB('utag.loader.INIT: loading ' + b.id);
	  this.lq.push(b);
          this.AS(b);
        }
      }
    }
          
    if (this.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.DB('READY:utag.loader.wq');
        utag.loader.rf=1;
        utag.loader.WQ();
      }
    });
    else if(this.lq.length>0)utag.loader.rf=1;
    else if(this.lq.length==0)utag.loader.END();

    return 1
  };
  utag.loader.EV('', 'ready', function(a) {if(utag.loader.efr!=1){utag.loader.efr=1;try{ if(1){if(typeof utag.runonce=='undefined')utag.runonce={};utag.jdh=function(h,i,j,k){h=utag.jdhc.length;if(h==0)window.clearInterval(utag.jdhi);else{for(i=0;i<h;i++){j=utag.jdhc[i];k=jQuery(j.i).is(":visible")?1:0;if(k!=j.s){if(j.e==(j.s=k))jQuery(j.i).trigger(j.e?"afterShow":"afterHide")}}}};utag.jdhi=window.setInterval(utag.jdh, 250);utag.jdhc=[];
if(typeof utag.runonce[429]=='undefined'){utag.runonce[429]=1;jQuery(document.body).on('click','a.button:contains(Select)', function(e){var me = jQuery(this);
utag.track('ga-custom',{
  ga_custom_url: document.URL,
  _ga_category: utag_data['cp._cp_ga_cat'],
  _ga_action: "Fod Selection",
  _ga_label: me.parent().find('h3').text()
});})}}  }catch(e){utag.DB(e)};
try{ if(1){
if(typeof utag.runonce[430]=='undefined'){utag.runonce[430]=1;jQuery(document.body).on('click','button:contains(Select)', function(e){var me = jQuery(this);
utag.track('ga-custom',{
  ga_custom_url: document.URL,
  _ga_category: utag_data['cp._cp_ga_cat'],
  _ga_action: "Fod Selection",
  _ga_label: me.parents('.product').find('.product-title').text()
});})}}  }catch(e){utag.DB(e)};
try{ if(1){
if(typeof utag.runonce[431]=='undefined'){utag.runonce[431]=1;jQuery(document.body).on('click','form#createUserForm button', function(e){var me = jQuery(this);
utag.track('ga-custom',{
  ga_custom_url: document.URL,
  //virtual_url: '/subscribe/login',
  _ga_category: utag_data['cp._cp_ga_cat'],
  _ga_action: "Login Information",
  _ga_label: jQuery.trim(jQuery('.card-complete .product-info h2').text()),
  _ga_value: jQuery.trim(jQuery('.card-complete .price-select .price').text()).replace("$","")
});})}}  }catch(e){utag.DB(e)};
try{ if(1){
if(typeof utag.runonce[432]=='undefined'){utag.runonce[432]=1;jQuery(document.body).on('click','form#createUserForm a.facebookButton', function(e){var me = jQuery(this);
utag.track('ga-custom',{
  ga_custom_url: document.URL,
  //virtual_url: '/subscribe/facebook-register',
  _ga_category: utag_data['cp._cp_ga_cat'],
  _ga_action: "Login Information",
  _ga_label: jQuery.trim(jQuery('.card-complete .product-info h2').text()),
  _ga_value: jQuery.trim(jQuery('.card-complete .price-select .price').text()).replace("$","")
});})}}  }catch(e){utag.DB(e)};
try{ if(1){
if(typeof utag.runonce[433]=='undefined'){utag.runonce[433]=1;jQuery(document.body).on('click','form#deliveryForm button', function(e){var me = jQuery(this);
utag.track('ga-custom',{
  ga_custom_url: document.URL,
  //virtual_url: '/subscribe/payment',
  _ga_category: utag_data['cp._cp_ga_cat'],
  _ga_action: "Print Delivery Information",
  _ga_label: jQuery.trim(jQuery('.card-complete .product-info h2').text()),
  _ga_value: jQuery.trim(jQuery('.card-complete .price-select .price').text()).replace("$","")
});})}}  }catch(e){utag.DB(e)};
try{ if(1){
if(typeof utag.runonce[434]=='undefined'){utag.runonce[434]=1;jQuery(document.body).on('click','form#paymentForm button', function(e){var me = jQuery(this);
utag.track('ga-custom',{
  ga_custom_url: document.URL,
  //virtual_url: '/subscribe/confirmation',
  _ga_category: utag_data['cp._cp_ga_cat'],
  _ga_action: "Payment and Contributions",
  _ga_label: jQuery.trim(jQuery('.card-complete .product-info h2').text()),
  _ga_value: jQuery.trim(jQuery('.card-complete .price-select .price').text()).replace("$","")
});})}}  }catch(e){utag.DB(e)};
try{
var _sf_startpt=(new Date()).getTime();
}catch(e){utag.DB(e)};
try{
$('<div id="main_ad" style="height:1px; width:1px; overflow:auto;position: absolute;left: -999em;"><!--AD UNIT 4--></div>').appendTo($("body"));
}catch(e){utag.DB(e)};}})

  if(utag.cfg.readywait){
    utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.loader.rf=1;
        utag.DB('READY:utag.cfg.readywait');
        utag.loader.PINIT();
      }
    })
  }else{
    utag.loader.PINIT()
  }
}
//tealium universal tag - utag.sender.13051 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.qsp_delim="&";
  u.kvp_delim="=";
  u.mt_adid="114093";
  u.mt_id="348266";
  u.base_url="//pixel.mathtag.com/event/img?";
  u.map={"mm_product_id":"v1","mm_price":"v2","mm_order_id":"v3"};
  u.extend=[function(a,b){
return (/\/thankyou/).test(document.location.pathname) ?true:false;
},
function(a,b){
return (/\/thankyou/).test(document.location.pathname) ?true:false;
},
function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){try{b['mm_product_id']=utag_data.product_id}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){try{b['mm_order_id']=utag_data.oid}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){try{b['mm_price']=utag_data.product_price}catch(e){}} } catch(e){ utag.DB(e) }  }];

  u.send=function(a,b,c,d,e,f,g){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      c=[];g={};
      g.mt_adid=u.mt_adid;
      g.mt_id=u.mt_id;
      g.v1=g.v2=g.v3=g.s1=g.s2=g.s3="";
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        g[e[f]]=encodeURIComponent(b[d]);
      }}}
      c.push(
        "mt_id="+g.mt_id,
        "mt_adid="+g.mt_adid,
        "v1="+g.v1,
        "v2="+g.v2,
        "v3="+g.v3
      );
      //for(d in g){if(/^v[4-9]/.test(d)){c.push(d+"="+g[d]);}}
      c.push(
        "s1="+g.s1,
        "s2="+g.s2,
        "s3="+g.s3
      );
      //for(d in g){if(/^s[4-9]/.test(d)){c.push(d+"="+g[d]);}}
      u.img=new Image();u.img.src=u.base_url+c.join(u.qsp_delim);
    }
  }

  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('48','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag
//~~tv:13051.20120925

//tealium universal tag - LiveBall - utag.sender.12009 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
var _lb_hostname="";
var _lb_convert_path="/Outside/Convert.ashx";
var _lb_tag_path="/Outside/Tag.ashx";
var _lb_data_path="/Outside/Data.ashx";
var _lb_uid_param="lbuid";
var _lb_uky_param="lbuky";
var _lb_rid_param="lbrid";
var _lb_rnd_param="rnd";
var _lb_tag_param="tag";
var _lb_json_param="lbjson";
var _lb_json_value="y";
var _lb_uid_value="";
var _lb_uky_value="";
var _lb_rid_value="";
var _lb_recognized=false;
var _lb_temponly=false;
var _lb_localcookie_name="liveball_local";
var _lb_return_page="/Callback.aspx";
var _lb_fallback_url="";
var _lb_return_pgn_param="lbpgn";
var _lb_return_cvt_param="lbcvt";
var _lb_return_tag_param="lbtag";
var _lb_return_fbu_param="lbfbu";
var _lb_this_converted=false;
var _lb_this_tagged="";
var _lb_return_pnames=new Array();
var _lb_return_pvalues=new Array();
var _lb_use_json=false;
var _lb_origcookie_name="LiveBall";
var _lb_origtempcookie_name="LiveBallTemp";
var _lb_script_id_counter=1;

function jsonRequest(fullUrl){
  this.fullUrl = fullUrl; 
  this.headLoc = document.getElementsByTagName("head").item(0);
  this.scriptID = 'jscriptid' + _lb_script_id_counter++;
  this.scriptObj = document.createElement("script");
  this.scriptObj.setAttribute("type", "text/javascript");
  this.scriptObj.setAttribute("charset", "utf-8");
  this.scriptObj.setAttribute("src", this.fullUrl);
  this.scriptObj.setAttribute("id", this.scriptID);
  this.headLoc.appendChild(this.scriptObj);
}

function liveballUseJSON(flag){
  _lb_use_json=flag;
}

function liveballEncodeUrl(instg){
  var retval=""
  if(instg != null && instg != ""){
    retval=escape(instg);
    retval=retval.replace("+", "%2B");
    retval=retval.replace("/", "%2F");
  }
  return retval;
}

function liveballRecognizeQuery(){
  var found_uid=false;
  var found_uky=false;
  var found_rid=false;
  var qs=location.search;
  if(qs == null || qs.length <= 1){
    return false;
  }
  var qsarr=qs.substring(1).split('&');
  if(qsarr[0].length > 0){
    for(var pidx=0; pidx < qsarr.length; pidx++){
      var ppair=qsarr[pidx].split('=');
      if(ppair[0] == "_lb_uid_param"){
        _lb_uid_value=ppair[1];
        found_uid=true;
      }else if(ppair[0] == "_lb_uky_param"){
        _lb_uky_value=ppair[1];
        found_uky=true;
      }else if(ppair[0] == "_lb_rid_param"){
        _lb_rid_value=ppair[1];
        found_rid=true;
      }
    }
  }
  if(found_uid && found_uky && found_rid){
    _lb_recognized=true;
    return true;
  }
  return false;
}

function liveballRecognizeCookie(){
  var cookies=document.cookie;
  var lbpos=cookies.indexOf(_lb_localcookie_name + "=");
  if(lbpos != -1){
    lbpos=lbpos + _lb_localcookie_name.length + 1;
    var fin=cookies.indexOf(";",lbpos);
    var packedcookie = cookies.substring(lbpos,(fin == -1 ? cookies.length : fin));
    if(packedcookie != null && packedcookie.length > 5){
      var valuearr=packedcookie.split("$");
        if(valuearr.length == 3){
        _lb_uid_value=valuearr[0];
        _lb_uky_value=valuearr[1];
        _lb_rid_value=valuearr[2];
        _lb_recognized=true;
        return true;
      }
    }
  }
  return false;
}

function liveballRecognizeOrigCookie(){
  var cookies=document.cookie;
  var lbpos=cookies.indexOf(_lb_origcookie_name + "=");
  if(lbpos != -1){
    lbpos=lbpos + _lb_origcookie_name.length + 1;
    var fin=cookies.indexOf(";",lbpos);
    var packedcookie = cookies.substring(lbpos,(fin == -1 ? cookies.length : fin));
    if(packedcookie != null && packedcookie.length > 5){
      var valuearr=packedcookie.split("&");
      if(valuearr.length == 3){
        if(valuearr[0].length > 4 && valuearr[1].length > 4 && valuearr[2].length > 4){
          _lb_uid_value=valuearr[0].substring(4);
          _lb_uky_value=valuearr[1].substring(4);
          _lb_rid_value=valuearr[2].substring(4);
          _lb_recognized=true;
          return true;
        }
      }
    }
  }
  return false;
}

function liveballRecognizeOrigTempCookie(){
  var cookies=document.cookie;
  var lbpos=cookies.indexOf(_lb_origtempcookie_name + "=");
  if(lbpos != -1){
    lbpos=lbpos + _lb_origtempcookie_name.length + 1;
    var fin=cookies.indexOf(";",lbpos);
    var packedcookie = cookies.substring(lbpos,(fin == -1 ? cookies.length : fin));
    if(packedcookie != null && packedcookie.length > 5){
      var valuearr=packedcookie.split("&");
      if(valuearr.length == 3){
        if(valuearr[0].length > 4 && valuearr[1].length > 4 && valuearr[2].length > 4){
          _lb_uid_value=valuearr[0].substring(4);
          _lb_uky_value=valuearr[1].substring(4);
          _lb_rid_value=valuearr[2].substring(4);
          _lb_recognized=true;
          return true;
        }
      }
    }
  }
  return false;
}

function liveballWriteCookie(){
  var nextyear=new Date();
  nextyear.setFullYear(nextyear.getFullYear() + 1);
  var packedcookie=_lb_uid_value+"$"+_lb_uky_value+"$"+_lb_rid_value;
  var threemin="|au|name|pro|uk|";
  var sldthreemin="|ac|com|edu|gov|net|org|";
  var cookiedomain=document.domain.toLowerCase();
  if(cookiedomain.indexOf(".postclickmarketing.com") == -1 &&!(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/).test(cookiedomain)){ // not PCM or an IP address
    var domainarr=cookiedomain.split(".");
    if(domainarr.length > 2){                                             // has more than 2 parts
      if(threemin.indexOf("|"+domainarr[domainarr.length-1]+"|") != -1 
      || sldthreemin.indexOf("|"+domainarr[domainarr.length-2]+"|") != -1
      || domainarr[domainarr.length-2].length == 2){
        if(domainarr.length > 3){
          cookiedomain=domainarr[domainarr.length-3]+"."+domainarr[domainarr.length-2]+"."+domainarr[domainarr.length-1];
        }
      }else{
        cookiedomain=domainarr[domainarr.length-2]+"."+domainarr[domainarr.length-1];
      }
    }
  }
  if(_lb_temponly){
  document.cookie=_lb_localcookie_name + "=" + packedcookie +"; path=/; domain=" + cookiedomain;
  }else{
  document.cookie=_lb_localcookie_name + "=" + packedcookie +"; path=/; domain=" + cookiedomain + "; expires=" + nextyear.toGMTString();
  }
}

function liveballRecognize(set_hostname){
  if(set_hostname != null && set_hostname.length > 1){
    var lastpos=(set_hostname.length-1);
    if(set_hostname.lastIndexOf("/") == lastpos){
      _lb_hostname=set_hostname.substring(0,(lastpos-1));
    }else{
    _lb_hostname=set_hostname;
    }
  }
  if(liveballRecognizeQuery()){
    liveballWriteCookie();
  }else if(!liveballRecognizeCookie()){
    if(liveballRecognizeOrigCookie()){
      liveballWriteCookie();
    }else if(liveballRecognizeOrigTempCookie()){
      _lb_temponly=true;
      liveballWriteCookie();
    }
  }
}

function liveballBaseUrl(){
  return (document.location.protocol + "//" + _lb_hostname);
}

function liveballQueryString(){
  return ("?"+_lb_uid_param+"="+_lb_uid_value+"&"+_lb_uky_param+"="+_lb_uky_value+"&"+_lb_rid_param+"="+_lb_rid_value+"&"+_lb_rnd_param+"="+parseInt(31777*Math.random())+(_lb_use_json ? ("&"+_lb_json_param+"="+_lb_json_value) : ""));
}

function liveballConvertUrl(){
  return (liveballBaseUrl() + _lb_convert_path + liveballQueryString());
}

function liveballTagUrl(tag){
  return (liveballBaseUrl() + _lb_tag_path + liveballQueryString() + "&" + _lb_tag_param + "=" + liveballEncodeUrl(tag));
}

function liveballDataUrl(dname, dvalue){
  return (liveballBaseUrl() + _lb_data_path + liveballQueryString() + "&" + dname + "=" + liveballEncodeUrl(dvalue));
}

function liveballConvert(){
  if(_lb_recognized && _lb_hostname != null && _lb_hostname != ""){
    _lb_this_converted=true;
    if(_lb_use_json){
      var json = new jsonRequest(liveballConvertUrl());
    }else{
      //document.write('<img src="' + liveballConvertUrl() + '" width="1" height="1" />');
      var a=new Image();a.src=(liveballConvertUrl());
    }
  }
}

function liveballTag(tag){
  if(_lb_recognized && _lb_hostname != null && _lb_hostname != "" && tag != null && tag != "" && tag != _lb_this_tagged){
    _lb_this_tagged=_lb_this_tagged + (_lb_this_tagged == "" ? "" : ";") + tag;
    if(_lb_use_json){
      var json = new jsonRequest(liveballTagUrl(tag));
    }else{
      //document.write('<img src="' + liveballTagUrl(tag) + '" width="1" height="1" />');
      var a=new Image();a.src=(liveballTagUrl(tag));
    }
  }
}

function liveballData(dname, dvalue){
  if(_lb_recognized && _lb_hostname != null && _lb_hostname != "" && dname != null && dname != "" && dvalue != null && dvalue != ""){
    liveballReturnParam(dname, dvalue);
    if(_lb_use_json){
      var json = new jsonRequest(liveballDataUrl(dname, dvalue));
    }else{
      //document.write('<img src="' + liveballDataUrl(dname, dvalue) + '" width="1" height="1" />');
      var a=new Image();a.src=(liveballDataUrl(dname, dvalue));
    }
  }
}

function liveballReturnParam(pname, pvalue){
  if(pname != null && pname != "" && pvalue != null && pvalue != ""){
    for(var i=0; i < _lb_return_pnames.length; i++){
      if(_lb_return_pnames[i] == pname){
        _lb_return_pvalues[i]=pvalue;
        return;
      }
    }  
    var newidx=_lb_return_pnames.length;
    _lb_return_pnames[newidx]=pname;
    _lb_return_pvalues[newidx]=pvalue;
  }
}

function liveballReturnFallbackUrl(fburl){
  if(fburl != null && fburl != ""){
    _lb_fallback_url=fburl;
  }
}

function liveballReturnUrl(pathdomain, pagename, gosecure){
  var retval="";
  if((_lb_recognized || top != self) && _lb_hostname != null && _lb_hostname != ""){
    if(pathdomain == null || pathdomain == ""){
      pathdomain=_lb_hostname;
    }
    retval=(gosecure ? "https://" : "http://") + pathdomain + _lb_return_page + "?";
    if(_lb_recognized){
      retval = retval +
      _lb_uid_param + "=" + _lb_uid_value + "&" +
      _lb_uky_param + "=" + _lb_uky_value + "&" +
      _lb_rid_param + "=" + _lb_rid_value;
    }
    if(pagename != null && pagename != ""){
      retval=retval + "&" + _lb_return_pgn_param + "=" + liveballEncodeUrl(pagename);
    }
    if(_lb_this_converted){
      retval=retval + "&" + _lb_return_cvt_param + "=Y";
    }
    if(_lb_this_tagged != ""){
      retval=retval + "&" + _lb_return_tag_param + "=" + liveballEncodeUrl(_lb_this_tagged);
    }
    if(_lb_fallback_url != ""){
      retval=retval + "&" + _lb_return_fbu_param + "=" + liveballEncodeUrl(_lb_fallback_url);
    }
    if(_lb_return_pnames.length > 0 && _lb_return_pnames.length == _lb_return_pvalues.length){
      for(var pidx=0; pidx < _lb_return_pnames.length; pidx++){
        retval=retval + "&" + _lb_return_pnames[pidx] + "=" + liveballEncodeUrl(_lb_return_pvalues[pidx]);
      }
    }
  }else if(_lb_fallback_url != ""){
    retval=_lb_fallback_url;
  }
  return retval;
}

function liveballReturn(pathdomain, pagename, gosecure, framebust){
  var returnUrl=liveballReturnUrl(pathdomain, pagename, gosecure);
  if(returnUrl != ""){
    if(framebust){
      top.location.href=returnUrl;
    }else{
      window.location.href=returnUrl;
    }
  }
}

try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.qsp_delim="&";
  u.kvp_delim="=";
  u.domain="gannett.postclickmarketing.com";
  u.convert="false";
  u.map={};
  u.extend=[function(a,b){
return (/\/thankyou/).test(document.location.pathname) ?true:false;
},
function(a,b){
liveballRecognize("gannett.postclickmarketing.com");
liveballConvert();
}];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      var c,d,e,f;
      c=[];
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        if(e[f].indexOf("_lb_")==0){
          window[e[f]]=b[d];
        }else{
          u[e[f]]=encodeURIComponent(b[d]);
        }
      }}}

      liveballRecognize(u.domain);
      if(b._corder || (u.convert!="false" && u.convert)){
        liveballConvert();
      }
      if(u.tag){
        liveballTag(u.tag);
      }
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('59','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag
//~~tv:12009.20121112

var fb_param = {};

//tealium universal tag - utag.sender.6003 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.qsp_delim="&";
  u.kvp_delim="=";
  u.pixel_id="6005577940562";
  u.value="";
  u.base_url="//connect.facebook.net/en_US/fp.js";
  u.map={};
  u.extend=[function(a,b){
return (/\/thankyou/).test(document.location.pathname) ?true:false;
}];

  u.send=function(a,b,c,d,e,f){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        u[e[f]]=b[d];
      }}}

      if(u.value==""){
        u.value=b._csubtotal;
      }

      fb_param.pixel_id = u.pixel_id;
      fb_param.value = u.value || "0.00";

      (function(){
        var fpw = document.createElement('script');
        fpw.async = true;
        fpw.src = (location.protocol=='http:'?'http':'https')+'://connect.facebook.net/en_US/fp.js';
        var ref = document.getElementsByTagName('script')[0];
        ref.parentNode.insertBefore(fpw, ref);
      })();
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('74','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag
//~~tv:6011.20130205

function gacSend() {var b=null;function d(a){if(a!=b)return escape(a.toString());return""}function f(a){if(a!=b)return a.toString().substring(0,256);return""}function m(a,c){var i=d(c);if(i!=""){var e=d(a);if(e!="")return"&".concat(e,"=",i)}return""}function p(a){var c=typeof a;if(a==b||c=="object"||c=="function")return b;return String(a).replace(/,/g,"\\,").replace(/;/g,"\\;").replace(/=/g,"\\=")}
function q(a){var c;a=a.google_custom_params;if(!a||typeof a!="object"||a instanceof Array)c="";else{var i=[];for(c in a){var e=a[c];if(e instanceof Array){e=e;for(var g=[],k=0;k<e.length;++k){var j=p(e[k]);j!=b&&g.push(j)}e=g.length==0?b:g.join(",")}else e=p(e);e=e;(g=p(c))&&e!=b&&i.push(g+"="+e)}c=i.join(";")}if(c=="")return"";return"&".concat("data=",encodeURIComponent(c))}function r(a){if(typeof a!="number"&&typeof a!="string")return"";return d(a.toString())}
function s(a){if(a&&a.location&&a.location.protocol&&a.location.protocol.toString().toLowerCase()=="https:")return"https:";return"http:"}function t(a,c){return s(a)+"//www.googleadservices.com/pagead/"+c}
function u(a,c,i){var e="/?";if(a.google_conversion_type=="landing")e="/extclk?";e=t(a,["conversion/",d(a.google_conversion_id),e,"random=",d(a.google_conversion_time)].join(""));var g;a:{g=a.google_conversion_language;if(g!=b){g=g.toString();if(2==g.length){g=m("hl",g);break a}if(5==g.length){g=m("hl",g.substring(0,2))+m("gl",g.substring(3,5));break a}}g=""}var k;if(a)if(k=a.google_conversion_items){for(var j=[],h=0,l=k.length;h<l;h++){var n=k[h],o=[];if(n){o.push(r(n.value));o.push(r(n.quantity));
o.push(r(n.item_id));o.push(r(n.adwords_grouping));o.push(r(n.sku));j.push("("+o.join("*")+")")}}k=j.length>0?"&item="+j.join(""):""}else k="";else k="";j=a.google_conversion_date;h=[];if(a){if(l=a.screen){h.push(m("u_h",l.height));h.push(m("u_w",l.width));h.push(m("u_ah",l.availHeight));h.push(m("u_aw",l.availWidth));h.push(m("u_cd",l.colorDepth))}a.history&&h.push(m("u_his",a.history.length))}j&&typeof j.getTimezoneOffset=="function"&&h.push(m("u_tz",-j.getTimezoneOffset()));if(c){typeof c.javaEnabled==
"function"&&h.push(m("u_java",c.javaEnabled()));c.plugins&&h.push(m("u_nplug",c.plugins.length));c.mimeTypes&&h.push(m("u_nmime",c.mimeTypes.length))}c=h.join("");j="";if(i){h=i.referrer;if(a&&a.top&&i.location&&a.top.location==i.location){j+=m("ref",f(h));h=i.location}j+=m("url",f(h))}e+=[m("cv",a.google_conversion_js_version),m("fst",a.google_conversion_first_time),m("num",a.google_conversion_snippets),m("fmt",a.google_conversion_format),m("value",a.google_conversion_value),m("label",a.google_conversion_label),
m("oid",a.google_conversion_order_id),m("bg",a.google_conversion_color),g,m("guid","ON"),k,c,j,q(a)].join("");return e}function v(a){if({ar:1,bg:1,cs:1,da:1,de:1,el:1,en_AU:1,en_US:1,en_GB:1,es:1,et:1,fi:1,fr:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,iw:1,ja:1,ko:1,lt:1,nl:1,no:1,pl:1,pt_BR:1,pt_PT:1,ro:1,ru:1,sk:1,sl:1,sr:1,sv:1,th:1,tl:1,tr:1,vi:1,zh_CN:1,zh_TW:1}[a])return a+".html";return"en_US.html"}
function w(a,c,i){c=u(a,c,i);i=function(e,g,k){return'<img height="'+k+'" width="'+g+'" border="0" src="'+e+'" />'};return c};var x=window;
if(x)if(/[\?&;]google_debug/.exec(document.URL)!=b){var y=document.getElementsByTagName("head")[0];if(!y){y=document.createElement("head");document.getElementsByTagName("html")[0].insertBefore(y,document.getElementsByTagName("body")[0])}var z=document.createElement("script");z.src=t(window,"conversion_debug_overlay.js");y.appendChild(z)}else{try{var A;if(x.google_conversion_type=="landing"||!x.google_conversion_id)A=false;else{x.google_conversion_date=new Date;x.google_conversion_time=x.google_conversion_date.getTime();
if(typeof x.google_conversion_snippets=="number"&&x.google_conversion_snippets>0)x.google_conversion_snippets+=1;else x.google_conversion_snippets=1;if(typeof x.google_conversion_first_time!="number")x.google_conversion_first_time=x.google_conversion_time;x.google_conversion_js_version="6";if(x.google_conversion_format!=0&&x.google_conversion_format!=1&&x.google_conversion_format!=2&&x.google_conversion_format!=3)x.google_conversion_format=1;A=true}if(google_conversion_format=="3"){gacImg=new Image();gacImg.src=(w(x, navigator, document));}else{gacIframe=document.createElement("iframe");gacIframe.setAttribute('height','1');gacIframe.setAttribute('width','1');gacIframe.setAttribute('style','display:none');gacIframe.setAttribute('src',(w(x, navigator, document)));document.body.appendChild(gacIframe);}}catch(B){}x.google_conversion_date=
b;x.google_conversion_time=b;x.google_conversion_js_version=b;x.google_conversion_id=b;x.google_conversion_value=b;x.google_conversion_label=b;x.google_conversion_language=b;x.google_conversion_format=b;x.google_conversion_color=b;x.google_conversion_type=b;x.google_conversion_order_id=b;x.google_conversion_items=b;x.google_custom_params=b};}; 

//tealium universal tag - utag.sender.googleadwords ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.cnv_label='WRtBCOiOjAQQ4OC63AM';
  u.cnv_id='999207008';
  u.map={};
  u.extend=[function(a,b){
return (/\/thankyou/).test(document.location.pathname) ?true:false;
}];

  u.send=function(a,b,c,d,e,f){
    if(u.ev[a]||typeof u.ev.all!='undefined'){    
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};  
      c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!='undefined'&&b[d]!=''){e=u.map[d].split(',');for(f=0;f<e.length;f++){
        if(e[f]=='google_conversion_label'){u.cnv_label=b[d];}else if(e[f]=='google_conversion_id'){u.cnv_id=b[d];}
      }}}
      u.cnv_label=u.cnv_label.replace(/\s+/g,""); 
      c=u.cnv_label.split(",");
      u.cnv_id=u.cnv_id.replace(/\s+/g,""); 
      e=u.cnv_id.split(",");
      
      for(f=0;f<c.length;f++){

        if(typeof b._cprod!='undefined'&&b._cprod.length>0){
          var o = [];
          for(d=0;d<b._cprod.length;d++){
            o.push({value:(b._cprice[d]?b._cprice[d]:"0"),quantity:(b._cquan[d]?b._cquan[d]:"1"),item_id:b._cprod[d],adwords_grouping:"",sku:(b._csku[d]?b._csku[d]:b._cprod[d])});
          }
          window.google_conversion_items=o;
        }
        if(b._corder)window.google_conversion_order_id=b._corder;

        window.google_conversion_id=parseInt((e[f]?e[f]:e[0]));
        window.google_conversion_language="en";
        window.google_conversion_format="2";
        window.google_conversion_color="ffffff";
        window.google_conversion_label=c[f];
        var cnv = "";
        window.google_conversion_value = (cnv!="") ? cnv : b._csubtotal;
        gacSend();
      }
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('93','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag
//~~tv:7050.20121105

//~~tv:7115.20140310
//~~tc: Adding quotes around standard config Conversion ID.

if(typeof utag.ut=="undefined"){
  utag.ut={};
}

utag.ut.libloader2=function(o, a, b, c, l) {
  a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=o.src;if(o.id){b.id=o.id};
  if (typeof o.cb=='function') {
    b.hFlag=0;b.onreadystatechange=function(){if((this.readyState=='complete'||this.readyState=='loaded')&&!b.hFlag){b.hFlag=1;o.cb()}};
    b.onload=function(){if(!b.hFlag){b.hFlag=1;o.cb()}}
  }
  l = o.loc || 'head';
  c = a.getElementsByTagName(l)[0];
  if (c) {
    if (l == 'script') {
      c.parentNode.insertBefore(b, c);
    } else {
      c.appendChild(b)
    }
    utag.DB("Attach to "+l+": "+o.src)
  }
}

//tealium universal tag - utag.sender.7115 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  u=utag.o[loader].sender[id]={};
  u.ev={'view':1};
  u.initialized = false;
  u.data={};
  u.data.google_conversion_id = "994302621";
  u.data.google_conversion_label = "";
  u.data.pagetype = "other";
  u.data.value = "";
  u.data.google_remarketing_only = true;
  u.data.base_url="//www.googleadservices.com/pagead/conversion_async.js";
  u.map={};
  u.extend=[];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      
      var c,d,e,f,g;
      g = {};
      u.data.google_custom_params = {};
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        if (e[f].indexOf("custom.") == 0) {
          u.data.google_custom_params[e[f].substr(7)] = b[d];
        } else {
          u.data[e[f]] = b[d];
        }
      }}}
      u.data.google_conversion_id = parseInt(u.data.google_conversion_id);
      g.google_conversion_id = u.data.google_conversion_id;
      if (u.data.google_conversion_label) { g.google_conversion_label = u.data.google_conversion_label; }
      if (b._corder) {
        u.data.pagetype = "purchase";
      }
      u.data.prod = u.data.prod || (typeof b._cprod != "undefined" ? b._cprod.slice(0) : []);
      u.data.value = u.data.value || b._csubtotal;
      u.data.google_custom_params.ecomm_prodid = u.data.prod;
      u.data.google_custom_params.ecomm_pagetype = u.data.pagetype;
      u.data.google_custom_params.ecomm_value = u.data.value;
      u.data.google_custom_params.ecomm_category = u.data.google_custom_params.ecomm_category || (b._ccat !== undefined ? b._ccat.slice(0) : []);
      u.data.google_custom_params.ecomm_pvalue = u.data.google_custom_params.ecomm_pvalue || (b._cprice !== undefined ? b._cprice.slice(0) : []);
      u.data.google_custom_params.ecomm_quantity = u.data.google_custom_params.ecomm_quantity || (b._cquan !== undefined ? b._cquan.slice(0) : []);
      g.google_custom_params = u.data.google_custom_params;
      if (u.data.google_remarketing_only) { g.google_remarketing_only = u.data.google_remarketing_only; }
      u.gac_callback=function(){
        window.google_trackConversion(g);
      }
      if (!u.initialized) {
        u.initialized = true;
        utag.ut.libloader2({src:u.data.base_url, cb:u.gac_callback});
      } else {
        u.gac_callback();
      }
    }
  }
  utag.o[loader].loader.LOAD(id);
})('235','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag


function udm_(a){var b="comScore=",c=document,d=c.cookie,e="",f="indexOf",g="substring",h="length",i=2048,j,k="&ns_",l="&",m,n,o,p,q=window,r=q.encodeURIComponent||escape;if(d[f](b)+1)for(o=0,n=d.split(";"),p=n[h];o<p;o++)m=n[o][f](b),m+1&&(e=l+unescape(n[o][g](m+b[h])));a+=k+"_t="+ +(new Date)+k+"c="+(c.characterSet||c.defaultCharset||"")+"&c8="+r(c.title)+e+"&c7="+r(c.URL)+"&c9="+r(c.referrer),a[h]>i&&a[f](l)>0&&(j=a[g](0,i-8).lastIndexOf(l),a=(a[g](0,j)+k+"cut="+r(a[g](j+1)))[g](0,i)),c.images?(m=new Image,q.ns_p||(ns_p=m),m.src=a):c.write("<","p","><",'img src="',a,'" height="1" width="1" alt="*"',"><","/p",">")}

function ns_order(a,b,c){var d=this,e="ns_undefined",f="length";d.toV=function(a){return(new String(a)).replace(/(%3C|%3E|<|>)/gi,"_")},d.toF=function(a){var b=parseFloat(a);return isNaN(b)?e:b},d.counterURL=a,d.clientID=d.toV(b),d.orderID=d.toV(c),d.l=[],d.addLine=function(a,b,c,g,h,i){d.l[d.l[f]]={ns_prod_id:a?a:e,ns_brand:b?b:e,ns_prod_grp:c?c:e,ns_shop:g?g:e,ns_qty:d.toF(h),ns_prod_price:i?i:0}},d.sendOrder=function(){var a="ns_order_id_"+d.orderID+"=true";if(!!d.orderID&&!ns_.order_sent[d.orderID]&&document.cookie.indexOf(a)==-1){ns_.order_sent[d.orderID]=!0,document.cookie=a;var b=d.counterURL+"&ns_commerce=true&ns_ec_sv=6.1202.02&ns_type=hidden"+"&ns_client_id="+d.clientID+"&ns_order_id="+d.orderID+"&ns_orderlines="+d.l[f];for(var c=0,a=d.l[f];c<a;c++){var e=d.l[c],g=b+"&ns_orderline_id="+(c+1);for(var h in e)g+="&"+h+"="+escape(d.toV(e[h]));ns_.batch(g)}}}}

ns_=window.ns_||{},ns_.batch=function(a){var b,c,d=document,e=d.location;a=a+"&ns__t="+(new Date).getTime(),a=a+"&ns_c="+(d.characterSet?d.characterSet:d.defaultCharset?d.defaultCharset:"")+"&ns_ti="+escape(d.title)+"&ns_jspageurl="+escape(e&&e.href?e.href:d.URL)+"&ns_referrer="+escape(d.referrer);var f=2040,g=a.lastIndexOf("&");if(a.length>f&&g!=-1){while(g>f)a=a.substring(0,g),g=a.lastIndexOf("&");a=a.substring(0,g+1)+"ns_cut="+a.substr(g+1,f-g-1)}var h='img height="1" width="1"  style="position:absolute;top:0;left:0;"';if(d.layers)d.images?(new Image).src=a:d.write("<"+h+' src="'+a+'">');else{var i=function(a){var b=document.all(a);b&&b.length&&(b=b[0]);return b},j=function(a){c.onload=c.onerror=null;if(ns_.pipe.length>0){var e=ns_.pipe.join(""),f=e.indexOf("src"),g=e.indexOf('"',f),h=e.indexOf('"',g+1),k=e.substring(g+1,h),e=e.substring(0,f)+'id="ns_1"'+e.substring(h+1);ns_.pipe=[],b.innerHTML=e,c=d.getElementById?d.getElementById("ns_1"):i("ns_1"),c.onload=j,c.src=k}};rs=d.readyState,ns_=typeof ns_!="undefined"?ns_:{},ns_.pipe=typeof ns_.pipe!="undefined"?ns_.pipe:[],b=d.getElementById?d.getElementById("ns_"):i("ns_");if(!b){var k=["<",'div id="ns_" style="position:absolute;top:0;left:0;z-index:32766;background-color:transparent !important"><',h,' id="ns_1"></',"div>"].join("");rs=="complete"?d.body.innerHTML+=k:d.write(k)}c=d.getElementById?d.getElementById("ns_1"):i("ns_1");if(c&&c.onload)ns_.pipe[ns_.pipe.length]="<"+h+' src="'+a+'">';else if(b||c)b&&(b.innerHTML="<"+h+' id="ns_1">'),b=d.getElementById?d.getElementById("ns_"):i("ns_"),c=d.getElementById?d.getElementById("ns_1"):i("ns_1"),c.onload=c.onerror=j,c.src=a}},ns_.order_sent=ns_.order_sent||{}

//tealium universal tag - utag.sender.3005 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1,'link':1};
  u.kvp_delim="=";
  u.account="6035223";
  u.base_url='http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+".scorecardresearch.com/c2/6035223/cs.js";
  u.map={"pageName":"name","section":"comscorekw,category","contenttype":"templatetype","priority_asset":"priority_asset"};
  u.extend=[function(a,b){
if (a=="link") return false;
},
function(a,b){
//dont include the analytics if page is a Video page
if (b.contenttype === "video") 
  return false;
}];

  u.send=function(a,b,c,d,e,f,g){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      u.a=a;
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      g=[];g.push("c1=2");g.push("c2="+u.account);
      if(u.a=="link"){g.push("nstype=hidden")};

      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
	g.push(e[f]+u.kvp_delim+encodeURIComponent(b[d]));
      }}}

      udm_('http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?'+g.join('&'));

      if(typeof b._corder!="undefined" && b._corder){
        var counterURL='http'+(document.location.href.charAt(4)=='s'?'s://sb':'://b')+'.scorecardresearch.com/b?';
        u.order=new ns_order(counterURL, ((b._ccustid)?b._ccustid : b._corder), b._corder);
        for(f=0;f<b._cprod.length;f++){
          u.order.addLine(b._cprod[f],b._cbrand[f],b._ccat[f],b._ccat2[f],parseInt(b._cquan[f]),parseFloat(b._cprice[f]));
        }
        if(b._cship){
          u.order.addLine('shipping','none','shipping_handling','none',1,parseFloat(b._cship));
        }
        u.order.sendOrder();
      }
      (function() {
          var id='tealium-tag-3005';
          // for utag.view calls, the cs.js should be reloaded (per Comscore)
          if(a=="link" && document.getElementById(id)) {return;}
          var t = document.createElement('script'); t.type = 'text/javascript'; t.async = true; t.id=id;
          t.src = u.base_url;
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(t, s);
      })();

    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('693','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag
//~~tv:3005.20130124

//~~tv:2033.20130822
//~~tc: Adding conversion tracking and E-Commerce extension support.

//tealium universal tag - utag.sender.2033 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  u=utag.o[loader].sender[id]={};
  u.ev={'view':1};
  u.data={};
  u.data.client_id="898";
  u.map={"bx_order_id":"order_id","bx_product_price":"amount","bx_email":"email"};
  u.extend=[function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){try{b['bx_order_id']=utag_data.oid}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){try{b['bx_product_price']=utag_data.product_price}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){try{b['bx_email']=require.s.contexts['_'].registry['fireflySDK/atyponUser'].factory.email;}catch(e){}} } catch(e){ utag.DB(e) }  }];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      var c,d,e,f;
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        u.data[e[f]]=b[d];
      }}}
      u.data.order_id=u.data.order_id || b._corder;
      u.data.amount=u.data.amount || b._csubtotal || "";
      u.data.email=u.data.email || b._ccustid || "";
      if(u.data.order_id){
        /*window.bxAsyncInit = function(){
          bouncex.report_conversion({
            order_id: u.data.order_id,
            amount: u.data.amount,
            email: u.data.email
          });
        };*/
	window.bxAsyncInit = function(){
	  // Using bouncex.push()
          bouncex.push(["conversion", {
            order_id: u.data.order_id,
            amount: u.data.amount,
            email: u.data.email
          }]);
        };
      }
      //u.base_url="//bounceexchange.com/bounce/i.js?client_id="+u.data.client_id;
      //u.base_url="//bounceexchange.com/tag/"+u.data.client_id+"/i.js";
      u.base_url="//tag.bounceexchange.com/"+u.data.client_id+"/i.js"; // Updated URL
      u.s=document.getElementsByTagName("script")[0];
      u.scr=document.createElement("script");
      u.scr.type="text/javascript";
      u.scr.src=u.base_url;
      u.scr.async=true;
      u.s.parentNode.insertBefore(u.scr,u.s);
    }
  }
  utag.o[loader].loader.LOAD(id);
})('778','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag


//~~tv:3004.20140508
//~~tc:Updated to allow mapping of ContainerTag ID and brought in master template patterns

//tealium universal tag - Commission Junction - utag.sender.3004 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { b.hFlag = 0; b.onreadystatechange = function () { if ((this.readyState === 'complete' || this.readyState === 'loaded') && !b.hFlag) { b.hFlag = 1; o.cb(); } }; b.onload = function () { if (!b.hFlag) { b.hFlag = 1; o.cb(); } }; } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    
    u.ev = {"view" : 1};
    u.check=function(a,b,c){c=0;for(var d in b)c+=a==b[d]?1:0;return c>0};
      u.map={"cj_product_id":"ITEM","cj_product_price":"AMT","cj_quantity":"QTY"};
  u.extend=[function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){try{b['cj_product_id']=[utag_data.product_id]}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){try{b['cj_product_price']=[utag_data.product_price]}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.pathname'].toString().indexOf('thankyou')>-1){b['cj_quantity']='1'} } catch(e){ utag.DB(e) }  }];

    u.send = function (a,b) { 
      if (u.ev[a] || typeof u.ev.all !== "undefined") {

        var c, d, e, f;

        u.data = {
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "cid" : "741590",
          "stype" : "advanced",
          "aid" : "371332",
          "containerid" : "7005",
          "base_url" : "//www.emjcd.com/",
          "ITEM" : "",
          "AMT" : "",
          "QTY" : "",
          "DCNT" : "",
          "DISCOUNT" : ""
        }

        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};

        c=[];

        for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
          if(u.check(e[f], ['aid','cid','containerid','DISCOUNT','ITEM','AMT','QTY','DCNT'])) {
            u.data[e[f]]=b[d];
          }else{
            c.push(e[f]+'='+b[d]);
          }
        }}}
        if (utag_data.oid) {
	  c.push('CID='+u.data.cid);
          c.push('OID='+utag_data.oid.replace(/\|/g,"_",true));
	  
          c.push('TYPE='+u.data.aid);
          c.push('CURRENCY=USD');
          if(u.data.stype=="advanced"){
            u.data.ITEM = u.data.ITEM;
            u.data.AMT = u.data.AMT;
            u.data.QTY = u.data.QTY;
            u.data.DCNT = u.data.DCNT;
            for(d=0;d<u.data.ITEM.length;d++){
              c.push('ITEM'+(d+1)+'='+u.data.ITEM[d]);
              c.push('AMT'+(d+1)+'='+(u.data.AMT[d] || '0'));
              c.push('QTY'+(d+1)+'='+(u.data.QTY[d] || '1'));
              if(u.data.DCNT[d]){ c.push('DCNT'+(d+1)+'='+u.data.DCNT[d]) };
            }
          }else{
            //Do nothing.
	    //c.push('AMOUNT='+((b._csubtotal)?b._csubtotal:"0"));
          }
          if(u.data.DISCOUNT){
            c.push('DISCOUNT='+u.data.DISCOUNT);
          }
        }
        if(u.data.containerid===""){
          u.data.base_url+="u?";
          c.push('METHOD=IMG');
          u.data.img=new Image();u.data.img.src=u.data.base_url+c.join(u.data.qsp_delim);
        }else{
          u.data.base_url+="tags/c?containerTagId="+u.data.containerid+"&";
	  //c.push('CID='+u.data.cid);
	  //c.push('TYPE='+u.data.aid);
          d=document.createElement("iframe");d.setAttribute('id','1105');d.setAttribute('height','1');d.setAttribute('width','1');d.setAttribute('style','display:none');d.setAttribute('src',u.data.base_url+c.join(u.data.qsp_delim));document.body.appendChild(d);
        }
      }
    }
    try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
  })('1105','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag
var __reach_config={};
//tealium universal tag - utag.sender.19041 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.qsp_delim="&";
  u.kvp_delim="=";
  u.pid="51018fab4240cf4df6000006";
  u.base_url="//d8rk54i4mohrb.cloudfront.net/js/reach.js";
  u.map={"section":"channels","byline":"authors","published_date":"date","clean_url":"url","content_title":"title","simplereach_tags":"tags"};
  u.extend=[function(a,b){
if (b.partner_type) return false;
},
function(a,b){
if (!(/www./).test(document.location.host)) { 
  return false; 
}
if (!b["assetid"]&&!(/weather/).test(b["ssts"]) ) { 
  if(typeof SPR!=="undefined") {
    SPR.stop();
  }
  return false;
}
},
function(a,b){
var sr_siteInfo = {};
if (typeof siteInfo!=="undefined") {
  sr_siteInfo = siteInfo;
} else if (typeof stateManager!=="undefined") {
  sr_siteInfo = stateManager.getActivePageInfo();
} else {
  return false;
}
try {
  if(typeof b.section === 'undefined') {
    b.section = sr_siteInfo.section || "";
  }
} catch (nosssts) {
   //certain beta sites don't make ssts available, so if no ssts, move on...
}  
try {
  b.byline = sr_siteInfo.byline.split(',')[0];
} catch (bylineErr) {
   // ignoring error of no byline to pass..
}
try {
/*
  See if this is from embedded content otherwise use canonical.
*/
  if(b.pathName) {
    b.clean_url = "http://" + document.location.hostname + b.pathName;
  } else {
    b.clean_url = b.canonical;
  }
} catch(e) {
}
//b.clean_url = siteInfo.asset_url b.clean_url || [window.location.protocol, "//", window.location.hostname, window.location.pathname].join('');
b.content_title = sr_siteInfo.headline;
try {
  b.published_date = b.published_date || document.getElementsByClassName("story-timestamp")[0].getAttribute("datetime");
} catch (pderr) {
  //move on if we can't set a date (like on a section front, or some non-asset page)
}
try {
  var sts = sr_siteInfo.ssts.split("/") || [] ; // [section, sub-section, topic, sub-topic]
  if(sts[0] !== "sponsor-story") {
    sts = sts.splice(1);  // drops off section unless we're on a sponsor-story
  }
  if(typeof b.taxonomykeywords !== 'undefined') {
    if(sts[0] !== "sponsor-story") {
      sts.push(b.taxonomykeywords.split(',')); // appends taxonomy keywords on the end of sub-s, topic, sub-topic
    }
  }
  b.simplereach_tags = sts.join(',');
} catch (taxerr) {
  //also move on if there's no taxonomykeywords (same as publish date)
}

},
function(a,b){
b["sr_iframe_bool"]=true;
},
function(a,b){
if(b.pathName) {
  return false;
}
}];

  u.send=function(a,b,c,d,e,f){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      __reach_config={};
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        // BEGIN: backward compatible
        //if(e[f]=="ARR_authors"){e[f]="authors"};if(e[f]=="ARR_channels"){e[f]="channels"};if(e[f]=="ARR_tags"){e[f]="tags"};
        // END: backward compatible
        if(b[d] instanceof Array){
          __reach_config[e[f]]=b[d].slice(0);
        }else if((e[f]=="authors" || e[f]=="channels" || e[f]=="tags") ){
          if(b[d].indexOf("|")) {
	     __reach_config[e[f]]=b[d].toLowerCase().split("|");
	  }
	  if(b[d].indexOf(",")) {
	    __reach_config[e[f]]=b[d].toLowerCase().split(",");
	  }
	   
        }else{
          __reach_config[e[f]]=b[d];
        }
      }}}

      if(u.pid!="" && typeof __reach_config.pid=="undefined"){
        __reach_config.pid=u.pid;
      }
      
      __reach_config.iframe = b["sr_iframe_bool"];
      //if it's an internal link, set the referrer param
      if (b["clickPage"]) {
	  __reach_config.ref_url= b["clickPage"];
      };
      
      //for debugging
      //console.log("SIMPLESIMPLESIMPLE");
      //console.log(b);
      
      d='tealium_tag_19041';
      if(document.getElementById(d)){
        SPR.Reach.collect(__reach_config);
      }else{
        c=document.createElement('script');c.type='text/javascript';c.async=true;c.id=d;
        c.src=u.base_url;
        f=document.getElementsByTagName('head')[0];f.appendChild(c);
      }

    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('1781','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag
//~~tv:19041.20121008

//~~tv:7110.20140509
//~~tc: Adding support for local currencies

window.GoogleAnalyticsObject = "";
if(window.GoogleAnalyticsObject==""){window.GoogleAnalyticsObject="ga"};
window[window.GoogleAnalyticsObject] = window[window.GoogleAnalyticsObject]||function(){(window[window.GoogleAnalyticsObject].q=window[window.GoogleAnalyticsObject].q||[]).push(arguments);};

//tealium universal tag - utag.sender.7110 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1,'link':1,'ga-custom':1};
  u.o=window[window.GoogleAnalyticsObject];
  u.cookieDomain="" || utag.loader.lh();
  u.created=false;
  u.name="";
  u.account="UA-50014405-24";
  u.anonymizeIp=("false"==="true"?true:false);
  u.allowLinker=true;
  u.crossDomainTrack = "subscribe.democratandchronicle.com,promotions.democratandchronicle.com";
  u.enhancedLinkAttribution = "false";
  u.displayfeatures = "true";
  // Perform operation for all trackers (params used differently for "set")
  u.all=function(e, o, v){
    for(var i=0;i<u.account.length;i++){
      var t=(u.name[i]?u.name[i]+".":"");
      if(e=="set" || e=="require"){
        u.o(t+e,o,v)
      }else{
        u.o(t+e,o);
      }
    }
  }
  // TODO: Provide UI config option to call create before the Extensions run (if not using dynamic accounts)

  u.map={"_ga_cdt_list":"crossDomainTrack","_ga_acct":"account","_ga_name":"name","_ga_action":"eventAction","_ga_category":"eventCategory","_ga_label":"eventLabel","_ga_value":"eventValue","ga_custom_url":"page","_site_name":"dimension1","qp.opm_id":"enh_promo_id","qp.opm_name":"enh_promo_name","qp.opm_creative":"enh_promo_creative","qp.opm_position":"enh_promo_position"};
  u.extend=[function(a,b){
var subDomainList = [
  "promotions",
  "subscribe",
  "offers",
  "holiday",
  "info",
  "account",
  "gannett"
];

var domainList = [
  "app.com",
  "argusleader.com",
  "azcentral.com",
  "battlecreekenquirer.com",
  "baxterbulletin.com",
  "bucyrustelegraphforum.com",
  "burlingtonfreepress.com",
  "chillicothegazette.com",
  "cincinnati.com",
  "citizen-times.com",
  "clarionledger.com",
  "coloradoan.com",
  "coshoctontribune.com",
  "courier-journal.com",
  "courierpostonline.com",
  "dailyrecord.com",
  "dailyworld.com",
  "delawareonline.com",
  "delmarvanow.com",
  "democratandchronicle.com",
  "desmoinesregister.com",
  "detroitnews.com",
  "dnj.com",
  "fdlreporter.com",
  "floridatoday.com",
  "freep.com",
  "greatfallstribune.com",
  "greenbaypressgazette.com",
  "greenvilleonline.com",
  "guampdn.com",
  "hattiesburgamerican.com",
  "hometownlife.com",
  "htrnews.com",
  "indystar.com",
  "ithacajournal.com",
  "jacksonsun.com",
  "jconline.com",
  "lancastereaglegazette.com",
  "lansingstatejournal.com",
  "livingstondaily.com",
  "lohud.com",
  "mansfieldnewsjournal.com",
  "marionstar.com",
  "marshfieldnewsherald.com",
  "montgomeryadvertiser.com",
  "mycentraljersey.com",
  "mydesert.com",
  "newarkadvocate.com",
  "news-leader.com",
  "news-press.com",
  "newsleader.com",
  "nky.cincinnati.com",
  "packersnews.com",
  "pal-item.com",
  "pnj.com",
  "portclintonnewsherald.com",
  "postcrescent.com",
  "poughkeepsiejournal.com",
  "press-citizen.com",
  "pressconnects.com",
  "rgj.com",
  "sctimes.com",
  "sheboyganpress.com",
  "shreveporttimes.com",
  "stargazette.com",
  "statesmanjournal.com",
  "stevenspointjournal.com",
  "tallahassee.com",
  "tennessean.com",
  "theadvertiser.com",
  "thecalifornian.com",
  "thedailyjournal.com",
  "theleafchronicle.com",
  "thenews-messenger.com",
  "thenewsstar.com",
  "thenorthwestern.com",
  "thespectrum.com",
  "thestarpress.com",
  "thetimesherald.com",
  "thetowntalk.com",
  "visaliatimesdelta.com",
  "wausaudailyherald.com",
  "wisconsinrapidstribune.com",
  "zanesvilletimesrecorder.com"
];

var outArr = [];

for(i=0;i<domainList.length;i++)
  for(j=0;j<subDomainList.length;j++)
    outArr.push(subDomainList[j]+"."+domainList[i]);

b['_ga_cdt_list'] = outArr.join(',');
},
function(a,b,c,d,e,f,g){d=b['dom.domain'];if(typeof d=='undefined')return;c=[{'app.com':'UA-50014405-25'},{'argusleader.com':'UA-50014405-12'},{'azcentral.com':'UA-50014405-30'},{'battlecreekenquirer.com':'UA-50010000-43'},{'baxterbulletin.com':'UA-50014405-23'},{'bucyrustelegraphforum.com':'UA-50010000-20'},{'burlingtonfreepress.com':'UA-50010000-6'},{'chillicothegazette.com':'UA-50010000-21'},{'cincinnati.com':'UA-50010000-23'},{'citizen-times.com':'UA-50014405-20'},{'clarionledger.com':'UA-50014405-15'},{'coloradoan.com':'UA-50010000-32'},{'coshoctontribune.com':'UA-50010000-22'},{'courier-journal.com':'UA-50014405-18'},{'courierpostonline.com':'UA-50010000-8'},{'dailyrecord.com':'UA-50014405-27'},{'dailyworld.com':'UA-50010000-38'},{'delawareonline.com':'UA-50010000-48'},{'delmarvanow.com':'UA-50014405-28'},{'democratandchronicle.com':'UA-50014405-6'},{'desmoinesregister.com':'UA-50014405-24'},{'detroitnews.com':'UA-50010000-4'},{'dnj.com':'UA-50014405-1'},{'fdlreporter.com':'UA-50010000-18'},{'floridatoday.com':'UA-50010000-34'},{'freep.com':'UA-50010000-5'},{'greatfallstribune.com':'UA-50014405-14'},{'greenbaypressgazette.com':'UA-50010000-14'},{'greenvilleonline.com':'UA-50014405-19'},{'guampdn.com':'UA-50010000-35'},{'hattiesburgamerican.com':'UA-50014405-16'},{'hometownlife.com':'UA-50010000-47'},{'htrnews.com':'UA-50010000-10'},{'indystar.com':'UA-50014405-31'},{'ithacajournal.com':'UA-50010000-1'},{'jacksonsun.com':'UA-50010000-49'},{'jconline.com':'UA-50014405-32'},{'lancastereaglegazette.com':'UA-50010000-26'},{'lansingstatejournal.com':'UA-50010000-44'},{'livingstondaily.com':'UA-50010000-46'},{'lohud.com':'UA-50014405-11'},{'mansfieldnewsjournal.com':'UA-50010000-27'},{'marionstar.com':'UA-50010000-28'},{'marshfieldnewsherald.com':'UA-50010000-11'},{'montgomeryadvertiser.com':'UA-50014405-21'},{'mycentraljersey.com':'UA-50014405-26'},{'desertsun.com':'UA-50014405-10'},{'newarkadvocate.com':'UA-50010000-29'},{'news-leader.com':'UA-50010000-42'},{'news-press.com':'UA-50010000-33'},{'newsleader.com':'UA-50014405-22'},{'nky.cincinnati.com':'UA-50010000-25'},{'packersnews.com':'UA-50010000-15'},{'pal-item.com':'UA-50014405-33'},{'pnj.com':'UA-50014405-3'},{'portclintonnewsherald.com':'UA-50010000-30'},{'postcrescent.com':'UA-50010000-13'},{'poughkeepsiejournal.com':'UA-50014405-5'},{'press-citizen.com':'UA-50010000-36'},{'pressconnects.com':'UA-50010000-2'},{'rgj.com':'UA-50010000-7'},{'sctimes.com':'UA-50014405-8'},{'sheboyganpress.com':'UA-50010000-16'},{'shreveporttimes.com':'UA-50010000-40'},{'stargazette.com':'UA-50010000-3'},{'statesmanjournal.com':'UA-50014405-7'},{'stevenspointjournal.com':'UA-50010000-17'},{'tallahassee.com':'UA-50014405-35'},{'tennessean.com':'UA-50014405-2'},{'theadvertiser.com':'UA-50010000-37'},{'thecalifornian.com':'UA-50014405-9'},{'thedailyjournal.com':'UA-50014405-17'},{'theleafchronicle.com':'UA-50010000-50'},{'thenews-messenger.com':'UA-50010000-24'},{'thenewsstar.com':'UA-50010000-39'},{'thenorthwestern.com':'UA-50010000-12'},{'thespectrum.com':'UA-50014405-29'},{'thestarpress.com':'UA-50014405-34'},{'thetimesherald.com':'UA-50010000-45'},{'thetowntalk.com':'UA-50010000-41'},{'visaliatimesdelta.com':'UA-50014405-13'},{'wausaudailyherald.com':'UA-50010000-9'},{'wisconsinrapidstribune.com':'UA-50010000-19'},{'zanesvilletimesrecorder.com':'UA-50010000-31'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d.toString().indexOf(f)>-1){b['_ga_acct']=c[e][f];m=true};};if(m)break};if(!m)b['_ga_acct']='';},
function(a,b){
if(b['_ga_acct']){
  temp = b['_ga_acct'].split(',');
  nameList = [];
  for(i=0;i<temp.length;i++){
    if(i!=0)
      nameList.push("gua"+i);
    else
      nameList.push("");
  }
  b['_ga_name'] = nameList.join(',');
}
},
function(a,b){ try{ if((typeof b['_ga_acct']!='undefined'&&typeof b['_ga_acct']!='undefined'&&b['_ga_acct']!='')){try{b['_ga_acct']=b['_ga_acct'] + ",UA-50014405-36"}catch(e){};try{b['_ga_name']=b['_ga_name'] + ",guaru"}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['ga_custom_url']=document.URL}catch(e){};try{b['product_category']=[location.hostname]}catch(e){};try{b['_ccat']=[location.hostname]}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){
// templates in Tealium use ecommerce product values in an array format. This extension
// converts them into the correct format if they aren't already

function inList(key) {
  list = [
    '_cprod',
    '_cprodname',
    '_csku',
    '_cbrand',
    '_ccat',
    '_ccat2',
    '_cquan',
    '_cprice',
    '_cpdisc',
    'conversion_type'
  ];
  for(i=0;i<list.length;i++) {
    if (list[i] == key) return true;
  }
  return false;
}

for(key in b){
  if ((key.indexOf('product_') === 0 || inList(key))
      && (typeof b[key] === "string" || typeof b[key] === "number"))
    b[key] = [b[key]];
}
},
function(a,b){
//utag.hasFired = utag.hasFired || {};
if ((/\/thankyou/).test(document.location.pathname)
    && b['product_id']
    && b['ga_subscription']
    && (b['ga_subscription'].toLowerCase() === 'true' || b['ga_subscription'] === true)
    && document.location.host.toLowerCase().indexOf('accounts.') === -1
    && document.location.host.toLowerCase().indexOf('account.') === -1
    && document.location.search !== ""
    && b['oid']
    && b['oid'].indexOf('|') !== 0
) {
  b['virtual_url'] = "/subscribe/confirmation";
  if(b['conversion_type']) b['_ccat'] = b['conversion_type'];
  if(typeof require != "undefined" && typeof require.s.contexts['_'].registry['fireflySDK/atyponUser'] != "undefined")
    b['_cprodname'] = require.s.contexts['_'].registry['fireflySDK/atyponUser'].factory.licenses[0].description;
  if(b['oid']) b['_corder'] = b['oid'];
  if(b['product_price']) b['_ctotal'] = b['_cprice'] = b['product_price'];
  if(b['product_id']) b['_cprod'] = b['product_id'];
  if(b['user_id']) b['_ccust'] = b['user_id'];
  b['_cstore'] = location.host;
  b['_ga_category'] = utag_data['cp._cp_ga_cat'];
  b['_ga_action'] = 'Confirmation Page';
}
},
function(a,b,c,d,e,f,g){d=b['dom.domain'];if(typeof d=='undefined')return;c=[{'app.com':'Asbury Park'},{'argusleader.com':'Sioux Falls'},{'azcentral.com':'Phoenix'},{'battlecreekenquirer.com':'Battle Creek'},{'baxterbulletin.com':'Baxter County'},{'bucyrustelegraphforum.com':'Bucyrus'},{'burlingtonfreepress.com':'Burlington'},{'chillicothegazette.com':'Chillicothe'},{'cincinnati.com':'Cincinnati'},{'citizen-times.com':'Asheville'},{'clarionledger.com':'Jackson,MS'},{'coloradoan.com':'Ft. Collins'},{'coshoctontribune.com':'Coshocton'},{'courier-journal.com':'Louisville'},{'courierpostonline.com':'Cherry Hill'},{'dailyrecord.com':'Morristown'},{'dailyworld.com':'Opelousas'},{'delawareonline.com':'Wilmington'},{'delmarvanow.com':'Salisbury'},{'democratandchronicle.com':'Rochester'},{'desmoinesregister.com':'Des Moines'},{'detroitnews.com':'Detroit'},{'dnj.com':'Murfreesboro'},{'fdlreporter.com':'Fond du Lac'},{'floridatoday.com':'Brevard'},{'freep.com':'Detroit'},{'greatfallstribune.com':'Great Falls'},{'greenbaypressgazette.com':'Green Bay'},{'greenvilleonline.com':'Greenville'},{'guampdn.com':'Guam'},{'hattiesburgamerican.com':'Hattiesburg'},{'hometownlife.com':'Detroit'},{'htrnews.com':'Manitowoc'},{'indystar.com':'Indianapolis'},{'ithacajournal.com':'Ithaca'},{'jacksonsun.com':'Jackson,TN'},{'jconline.com':'Lafayette,IN'},{'lancastereaglegazette.com':'Lancaster'},{'lansingstatejournal.com':'Lansing'},{'livingstondaily.com':'Livingston County'},{'lohud.com':'Westchester'},{'mansfieldnewsjournal.com':'Mansfield'},{'marionstar.com':'Marion'},{'marshfieldnewsherald.com':'Marshfield'},{'montgomeryadvertiser.com':'Montgomery'},{'mycentraljersey.com':'East Brunswick'},{'desertsun.com':'Palm Springs'},{'newarkadvocate.com':'Newark'},{'news-leader.com':'Springfield'},{'news-press.com':'Ft. Myers'},{'newsleader.com':'Staunton'},{'nky.cincinnati.com':'Cincinnati'},{'packersnews.com':'Green Bay'},{'pal-item.com':'Richmond'},{'pnj.com':'Pensacola'},{'portclintonnewsherald.com':'Port Clinton'},{'postcrescent.com':'Appleton'},{'poughkeepsiejournal.com':'Poughkeepsie'},{'press-citizen.com':'Iowa City'},{'pressconnects.com':'Binghamton'},{'rgj.com':'Reno'},{'sctimes.com':'St. Cloud'},{'sheboyganpress.com':'Sheboygan'},{'shreveporttimes.com':'Shreveport'},{'stargazette.com':'Elmira'},{'statesmanjournal.com':'Salem'},{'stevenspointjournal.com':'Stevens Point'},{'tallahassee.com':'Tallahassee'},{'tennessean.com':'Nashville'},{'theadvertiser.com':'Lafayette'},{'thecalifornian.com':'Salinas'},{'thedailyjournal.com':'Vineland'},{'theleafchronicle.com':'Clarksville'},{'thenews-messenger.com':'Fremont'},{'thenewsstar.com':'Monroe'},{'thenorthwestern.com':'Oshkosh'},{'thespectrum.com':'St. George'},{'thestarpress.com':'Muncie'},{'thetimesherald.com':'Port Huron'},{'thetowntalk.com':'Alexandria'},{'visaliatimesdelta.com':'Visalia'},{'wausaudailyherald.com':'Wausau'},{'wisconsinrapidstribune.com':'Wisconsin Rapids'},{'zanesvilletimesrecorder.com':'Zanesville'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d.toString().indexOf(f)>-1){b['_site_name']=c[e][f];m=true};};if(m)break};if(!m)b['_site_name']='';},
function(a,b){
return (((/^subscribe\.|^offers\.|^promotions\.|^welcome\.|^info\.|^gannett\.|^account\.|^holiday\./i).test(document.location.host)) ||
(/^\/insider/).test(document.location.pathname));
},
function(a,b){ try{ if((typeof b['order_id']!='undefined'&&typeof b['cp.placed_order']!='undefined'&&b['order_id']==''+b["cp.placed_order"]+'')){try{b['order_id']=""}catch(e){};try{b['_corder']=""}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['order_id']!='undefined'&&typeof b['order_id']!='undefined'&&b['order_id']!='')){document.cookie="placed_order="+b['order_id']+";path=/;domain="+utag.cfg.domain+";expires="+(function(){var d=new Date();d.setTime(d.getTime()+(3*86400000)); return d.toGMTString()})()+"";b['cp.placed_order']=b['order_id'];}} catch(e){ utag.DB(e) } }];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      u.o=window[window.GoogleAnalyticsObject];
      b.ga_events=b.ga_events||[];
      u.addEvent=function(v){
        if(typeof v.eventCategory=="undefined" || typeof v.eventAction=="undefined"){
          utag.DB("GA event Category or Action is not set");
          return;
        }
        if(v.eventValue && isNaN(parseInt(v.eventValue))){
          utag.DB("GA event Value is not a number");
          v.eventValue = null;
        }else{
          v.eventValue = parseInt(v.eventValue) || null;
        }
        b.ga_events.push(v);
      }
      u.a=a;
      var c,d,e,f,g;
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        u[e[f]]=b[d];
      }}}

      if(typeof u.account=="string"){ u.account=u.account.replace(/\s/g,"").split(",") };
      if(typeof u.name=="string"){ u.name=u.name.replace(/\s/g,"").split(",") };

      if(u.created==false){
        u.created=true;
        for(f=0;f<u.account.length;f++){
          c=new Object();
          if(u.siteSpeedSampleRate){c.siteSpeedSampleRate=parseInt(u.siteSpeedSampleRate)};
          c.cookieDomain=u.cookieDomain;
          if(u.cookieExpires || u.cookieExpires==="0"){c.cookieExpires=parseInt(u.cookieExpires)};
          if(u.legacyCookieDomain){c.legacyCookieDomain=u.legacyCookieDomain};
          c.allowLinker=u.allowLinker;
          if(typeof u.name[f]!="undefined" && u.name[f]!=""){c.name=u.name[f]};
          u.o("create", u.account[f], c);
        }
      }

      if (u.allowLinker === true && u.crossDomainTrack !== undefined && typeof u.crossDomainTrack === "string") {
        u.all("require", "linker");
        u.crossDomainTrack = u.crossDomainTrack.split(",");
        u.all("linker:autoLink", u.crossDomainTrack);
      };

      if(u.anonymizeIp){u.all("set", 'anonymizeIp', true)};
      if(u.uid){u.all("set", "&uid", u.uid)};
      if(u.page){u.all("set", "page", u.page)};
      if(u.title){u.all("set", "title", u.title)};
      if(u.nonInteraction){u.all("set", "nonInteraction", true)};
      if(u.campaignName){u.all("set", "campaignName", u.campaignName)};
      if(u.campaignSource){u.all("set", "campaignSource", u.campaignSource)};
      if(u.campaignMedium){u.all("set", "campaignMedium", u.campaignMedium)};
      if(u.campaignContent){u.all("set", "campaignContent", u.campaignContent)};
      if(u.campaignKeyword){u.all("set", "campaignKeyword", u.campaignKeyword)};
      if (u.displayfeatures === "true" || u.displayfeatures === true) { u.all("require", "displayfeatures"); }

      for(d in utag.loader.GV(u)){
        if(d.indexOf("metric")==0 || d.indexOf("dimension")==0 || d.indexOf("contentGroup")==0){
          u.all("set", d, u[d]); 
        }
      }

      if(u.a=="view" || a=="ga-custom"){
        g={};
        g.hitType="pageview";
        // Enhanced Link Attribution
        if (u.enhancedLinkAttribution == "true") {
          u.all("require", "linkid", "linkid.js");
        }
        // Send page view request
        u.all("send",g);
        u.id=(u.id?u.id:b._corder);
        if(u.id && !(u.id instanceof Array)){
          u.all("require", "ecommerce", "ecommerce.js");
          g={};
          g.id=u.id;
          g.affiliation=(u.affiliation?u.affiliation:b._cstore);
          g.revenue=(u.revenue?u.revenue:b._ctotal);
          g.shipping=(u.shipping?u.shipping:b._cship);
          g.tax=(u.tax?u.tax:b._ctax);
          g.currency=(u.currency?u.currency:b._ccurrency);
          u.all('ecommerce:addTransaction', g);
          
          for(f=0;f<b._cprod.length;f++){
            g={};
            g.id=u.id;
            g.sku=b._cprod[f];
            g.name=(b._cprodname[f]?b._cprodname[f]:b._cprod[f]);
            g.category=(b._ccat[f]?b._ccat[f]:"");
            g.price=(b._cprice[f]?b._cprice[f]:"1.00");
            g.quantity=(b._cquan[f]?b._cquan[f]:"1");
            u.all('ecommerce:addItem', g);
          }
          u.all('ecommerce:send');
        }else if(u.id instanceof Array && u.id.length>0){
          u.all("require", "ecommerce", "ecommerce.js");
          // an array of order ids will fire multiple transacations
          var lastindex = 0;
          for(f=0;f<u.id.length;f++){
  
            if(f==u.id.length-1 || (u.id[f]!=u.id[f+1])){
              g={};
              g.id=u.id[f];
              g.affiliation=(u.affiliation && typeof u.affiliation[f]!="undefined"?u.affiliation[f]:b._cstore);
              g.revenue=(u.revenue && typeof u.revenue[f]!="undefined"?u.revenue[f]:b._ctotal);
              g.shipping=(u.shipping && typeof u.shipping[f]!="undefined"?u.shipping[f]:b._cship);
              g.tax=(u.tax && typeof u.tax[f]!="undefined"?u.tax[f]:b._ctax);
              g.currency=(u.currency?u.currency:b._ccurrency);
              u.all('ecommerce:addTransaction', g);
  
              for(e=lastindex;e<f+1;e++){
                g={};
                g.id=u.id[f];
                g.sku=b._cprod[e];
                g.name=(b._cprodname[e]?b._cprodname[e]:b._cprod[e]);
                g.category=(b._ccat[e]?b._ccat[e]:"");
                g.price=(b._cprice[e]?b._cprice[e]:"1.00");
                g.quantity=(b._cquan[e]?b._cquan[e]:"1");
                u.all('ecommerce:addItem', g);
                
              }
              lastindex = f+1;
            }
          }
          u.all('ecommerce:send');
        }
      }
      
      if(u.eventCategory && u.eventAction){
        g={};
        g.hitType="event";
        g.eventCategory=u.eventCategory;
        g.eventAction=u.eventAction;
        if(u.eventLabel){g.eventLabel=u.eventLabel};
        if(typeof u.eventValue!="undefined" && u.eventValue!==""){g.eventValue=u.eventValue;}
        u.all("send",g);
        // clear variables after each event
        u.eventCategory=u.eventAction=u.eventLabel=u.eventValue="";
      }

      for(e=0;e<b.ga_events.length;e++){
        g={};
        g.hitType="event";
        g.eventCategory=b.ga_events[e].eventCategory;
        g.eventAction=b.ga_events[e].eventAction;
        g.eventLabel=b.ga_events[e].eventLabel;
        g.eventValue=b.ga_events[e].eventValue;
        u.all("send",g);
      }

      if(u.socialNetwork && u.socialAction && u.socialTarget){
        g={};
        g.hitType="social";
        g.socialNetwork=u.socialNetwork;
        g.socialAction=u.socialAction;
        g.socialTarget=u.socialTarget;
        u.all("send",g);
        u.socialNetwork = u.socialAction = u.socialTarget = "";
      }

      if(u.timingCategory && u.timingVar && u.timingValue){
        g={};
        g.hitType="timing";
        g.timingCategory = u.timingCategory;
        g.timingVar = u.timingVar;
        g.timingValue = u.timingValue;
        g.timingLabel = u.timingLabel || "";
        u.all("send",g);
      }

      // Map account ID to ga-disable to disable tracking for that account
      if(u["ga-disable"]){window["ga-disable-"+u["ga-disable"]] = true};

      (function() {
	  var id='tealium-tag-7110';
	  if (document.getElementById(id)) {return;}
          u.o.l=1*new Date();
          var e = document.createElement('script'); e.async = true; 
          e.id = id;
          e.src = '//www.google-analytics.com/analytics.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(e, s);
      })();
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('1917','gci.desmoinesregister');
}catch(e){}
//end tealium universal tag

//~~tv:20067.20150121
//~~tc: Bring template in-line with current standards and methodologies

//tealium universal tag - utag.sender.20067 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
  (function(id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev={'view':1};

      u.map={"mm_adv_id":"mt_adid","mm_evt_id":"mt_id"};
  u.extend=[function(a,b){
//if we don't have ssts, then there's no need to proceed 
if (!b["ssts"]) {
  return false;
}
},
function(a,b,c,d,e,f,g){d=b['ssts'];if(typeof d=='undefined')return;c=[{'sponsor-story:ymca':'736801'},{'sponsor-story:prairie-trail':'777881'},{'sponsor-story:iowa-clinic':'918048'},{'sponsor-story:pappajohn':'1036687'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){g=new RegExp(f,'i');if(g.test(d)){b['mm_evt_id']=c[e][f];m=true};};if(m)break};if(!m)b['mm_evt_id']='';},
function(a,b,c,d,e,f,g){d=b['ssts'];if(typeof d=='undefined')return;c=[{'sponsor-story:ymca':'115531'},{'sponsor-story:prairie-trail':'142770'},{'sponsor-story:iowa-clinic':'136519'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){g=new RegExp(f,'i');if(g.test(d)){b['mm_adv_id']=c[e][f];m=true};};if(m)break};if(!m)b['mm_adv_id']='';},
function(a,b,c,d,e,f,g){d=b['ssts'];if(typeof d=='undefined')return;c=[{'sponsor-story:ymca':'115531'},{'sponsor-story:prairie-trail':'142770'},{'sponsor-story:iowa-clinic':'136519'},{'sponsor-story:pappajohn':'166689'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){g=new RegExp(f,'i');if(g.test(d)){b['mm_adv_id']=c[e][f];m=true};};if(m)break};if(!m)b['mm_adv_id']='';}];


    u.send=function(a,b){
      if(u.ev[a]||typeof u.ev.all!="undefined"){

        var c, d, e, f;

        u.data = {
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "qs_delim" : "?",
          "tag_type" : "script",
          "base_url" : "http://pixel.mathtag.com/event/js",
          "secure_base_url" : "",
          "static_params" : "v1=&v2=&v3=&s1=&s2=&s3="
        };

        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};

        if (!b["mm_adv_id"]) { return false; }
        c=[];

        for (d in utag.loader.GV(u.map)) {
          if (typeof b[d] !== "undefined" && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f] == "qsp_delim" || e[f] == "kvp_delim" || e[f] == "qs_delim" || e[f] == "base_url" || e[f] == "secure_base_url") {
                u.data[e[f]] = b[d];
              } else {
                // requires "kvp_delim" mapped first (if mapped)
                c.push(e[f] + u.data.kvp_delim + encodeURIComponent(b[d]));
              }
            }
          }
        }

        u.data.secure_base_url = u.data.secure_base_url || u.data.base_url;
        u.data.url = (location.protocol == "https:" ? u.data.secure_base_url : u.data.base_url);

        if(u.data.url.indexOf("http")!==0 && u.data.url.indexOf("/")!==0 ){
          u.data.url = location.protocol + "//" + u.data.url;
        }

        if (u.data.url.indexOf(u.data.qs_delim) < 0 && (c.length > 0 || u.data.static_params.length > 0)) {
          u.data.url += u.data.qs_delim
        }

        if (u.data.static_params) {
          if (c.length > 0) {
            u.data.url += u.data.static_params + u.data.qsp_delim;
          } else {
            u.data.url += u.data.static_params;
          }
        }

        u.loader({"type": u.data.tag_type, "src": u.data.url + c.join(u.data.qsp_delim), "loc": "script", "id": 'utag_2616'});
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("2616", "gci.desmoinesregister"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

//~~tv:7115.20150601
//~~tc: Added support for additional mapping and optional ecommerce inclusion

//tealium universal tag - utag.sender.7115 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf

    u.ev = {"view" : 1};
    u.initialized = false;
    u.scriptrequested = false;
    u.queue = [];

      u.map={"google_conversion_id_ars_158":"google_conversion_id"};
  u.extend=[function(a,b){
//Only load on homefront
try {
  if (stateManager.getActivePageInfo().contenttype=="homefront") {
    return true;
  } else {
    return false;
  }
} catch(err) {
  return false; 
}
  
},
function(a,b,c,d,e,f,g){d=b['dom.domain'];if(typeof d=='undefined')return;c=[{'www.app.com':'1012118002'},{'www.azcentral.com':'990658219'},{'www.courier-journal.com':'987833970'},{'www.clarionledger.com':'995463238'},{'www.coloradoan.com':'1001093144'},{'www.courierpostonline.com':'994403190'},{'www.citizen-times.com':'989310138'},{'www.theadvertiser.com':'993597964'},{'www.democratandchronicle.com':'995705653'},{'www.delawareonline.com':'1004094490'},{'www.desmoinesregister.com':'999207008'},{'www.desertsun.com':'992846547'},{'www.cincinnati.com':'994052186'},{'www.burlingtonfreepress.com':'997073438'},{'www.floridatoday.com':'991447952'},{'www.rgj.com':'990023403'},{'www.greenvilleonline.com':'990723025'},{'www.press-citizen.com':'994717656'},{'www.indystar.com':'1004999062'},{'www.jconline.com':'1004998462'},{'www.montgomeryadvertiser.com':'1001172344'},{'www.pnj.com':'995810483'},{'www.news-leader.com':'994886879'},{'www.news-press.com':'998054015'},{'www.postcrescent.com':'997963775'},{'www.greenbaypressgazette.com':'989940963'},{'www.poughkeepsiejournal.com':'991357472'},{'www.pressconnects.com':'986717268'},{'www.lsj.com':'991023615'},{'www.statesmanjournal.com':'994322790'},{'www.shreveporttimes.com':'992498480'},{'www.tallahassee.com':'993219329'},{'www.tennessean.com':'994057065'},{'www.lohud.com':'994302621'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['google_conversion_id_ars_158']=c[e][f];m=true};};if(m)break};if(!m)b['google_conversion_id_ars_158']='';},
function(a,b,c,d,e,f,g){d=b['dom.domain'];if(typeof d=='undefined')return;c=[{'www.app.com':'LMPiCNaigwQQ8uPO4gM'},{'www.azcentral.com':'dEwNCP3tvQUQq_2w2AM'},{'www.courier-journal.com':'ckJqCJ6TrQQQ8syE1wM'},{'www.clarionledger.com':'2kU0CKqMhAQQxqDW2gM'},{'www.courierpostonline.com':'mJqvCOLD-AMQ9saV2gM'},{'www.citizen-times.com':'Ft3_CK6n_AQQutne1wM'},{'www.theadvertiser.com':'mCCLCKSUigUQjLTk2QM'},{'www.democratandchronicle.com':'u2hICIPsnAQQtYbl2gM'},{'www.delawareonline.com':'vtnVCP7qtgUQmojl3gM'},{'www.desmoinesregister.com':'1F7rCPjJqAQQ4OC63AM'},{'www.desertsun.com':'UPLbCO2vvAQQ08W22QM'},{'www.cincinnati.com':'k3ZvCL64iQQQ2pCA2gM'},{'www.burlingtonfreepress.com':'oH6hCPKysgQQnsS42wM'},{'www.floridatoday.com':'VOwiCNiw6wQQkJfh2AM'},{'www.rgj.com':'tJHVCLXq_wQQ652K2AM'},{'www.greenvilleonline.com':'7mhfCIfy9QQQ0fe02AM'},{'www.indystar.com':'2rgTCMqoxQQQlqOc3wM'},{'www.jconline.com':'ZRx5CMKpxQQQvp6c3wM'},{'www.montgomeryadvertiser.com':'uyP5CPD_-AQQ-Nqy3QM'},{'www.pnj.com':'F7OfCI3LygQQs7nr2gM'},{'www.news-leader.com':'6KdNCJG1sAQQ34mz2gM'},{'www.news-press.com':'hejLCKmRngQQ_7D02wM'},{'www.postcrescent.com':'sUCXCJn63gQQ_-_u2wM'},{'www.greenbaypressgazette.com':'fVORCMXmvwUQ45mF2AM'},{'www.poughkeepsiejournal.com':'S-5kCJi9nQUQoNTb2AM'},{'www.pressconnects.com':'xzxFCPzAiQUQ1LjA1gM'},{'www.lsj.com':'js-uCPmA5QUQ_6PH2AM'},{'www.statesmanjournal.com':'7iNrCLLPqAQQ5tKQ2gM'},{'www.shreveporttimes.com':'hZCCCICDuQQQsKah2QM'},{'www.tallahassee.com':'T-xBCJ_xnBYQgabN2QM'},{'www.tennessean.com':'n90jCJeHlgQQ6baA2gM'},{'www.lohud.com':'FBRICIPNkA0QnbWP2gM'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['google_conversion_label_ars_158']=c[e][f];m=true};};if(m)break};if(!m)b['google_conversion_label_ars_158']='';}];


    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f, g;

        u.data = {
          //##UTVARconfig_<id from config>##
          "google_conversion_id" : "",
          "pagetype" : "other",
          "value" : "",
          "send_ecom" : "yes",
          "google_remarketing_only" : true,
          "base_url" : "//www.googleadservices.com/pagead/conversion_async.js",
          "params" : {},
          // E-Commerce Vars
          "product_id" : [],
          "product_category" : [],
          "product_quantity" : [],
          "product_unit_price" : []
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
        // End tag-scoped extensions

        c = [], g = {};
        var prefix = "";

        u.data.google_custom_params = window.google_tag_params;
	
        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              prefix = /^ecomm\.|^hotel\.|^edu\.|^flight\.|^hrental\.|^job\.|^local\.|^listing\.|^travel\.|^dynx\./.exec(e[f]);
              if (prefix !== null){
                prefix = prefix[0].slice(0, -1);
                u.data.params[prefix] = u.data.params[prefix] || {};
                u.data.params[prefix][e[f].substr(prefix.length + 1)] = b[d]; 
              } else if (e[f].indexOf("custom.") == 0) {
                u.data.google_custom_params[e[f].substr(7)] = b[d];
              } else {
                u.data[e[f]] = b[d];
              }
            }
          }
        }
        // End Mapping

        // Pull E-Commerce extension values
        // Mappings override E-Commerce extension values
        u.data.order_id = u.data.order_id || b._corder || "";
        u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
        if (u.data.product_id.length === 0 && b._cprod !== undefined) { u.data.product_id = b._cprod.slice(0); }
        if (u.data.product_category.length === 0 && b._ccat !== undefined) { u.data.product_category = b._ccat.slice(0); }
        if (u.data.product_quantity.length === 0 && b._cquan !== undefined) { u.data.product_quantity = b._cquan.slice(0); }
        if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) { u.data.product_unit_price = b._cprice.slice(0); }


        u.data.google_conversion_id = parseInt(u.data.google_conversion_id);
        g.google_conversion_id = u.data.google_conversion_id;
        g.google_conversion_label = b["google_conversion_label_ars_158"];
        u.data.prod = u.data.prod || u.data.product_id;
        u.data.value = u.data.value || u.data.order_subtotal;


        for (d in u.data.params) {
          u.data.google_custom_params[d + "_pagetype"] = u.data.pagetype;
          if (u.data.order_id || /purchase|conversion|cart|conversionintent/.test(u.data.pagetype)) {
            u.data.google_custom_params[d + "_totalvalue"] = u.data.value;
          }
          for (f in u.data.params[d]) {
            u.data.google_custom_params[d + "_" + f] = u.data.params[d][f];
          }
        } 

        if (u.data.ecom === "yes") {
          if (u.data.order_id) {
            u.data.pagetype = "purchase";
          }

          u.data.google_custom_params.ecomm_prodid = u.data.prod;
          u.data.google_custom_params.ecomm_pagetype = u.data.pagetype;
          u.data.google_custom_params.ecomm_totalvalue = u.data.value;
          u.data.google_custom_params.ecomm_category = u.data.google_custom_params.ecomm_category || u.data.product_category;
          u.data.google_custom_params.ecomm_pvalue = u.data.google_custom_params.ecomm_pvalue || u.data.product_unit_price;
          u.data.google_custom_params.ecomm_quantity = u.data.google_custom_params.ecomm_quantity || u.data.product_quantity;
        }

        g.google_custom_params = u.data.google_custom_params;

        if (u.data.google_remarketing_only) { g.google_remarketing_only = u.data.google_remarketing_only; }

        // Start Loader Callback
        u.loader_cb = function (g) {
          u.initialized = true;
          window.google_trackConversion(g);
        };
        // End Loader Callback

        u.callBack = function () {
          var data = {};
          while (data = u.queue.shift()) {
            u.loader_cb(data.g);
          }
        };

        if (u.initialized) {
          u.loader_cb(g);
        } else {
          u.queue.push({"g": g});
          if (!u.scriptrequested) {
            u.scriptrequested = true;
            u.loader({"type": "script",  "src": u.data.base_url, "cb": u.callBack, "loc": "script", "id": 'utag_2625' });
          }
        }

        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("2625", "gci.desmoinesregister"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

//~~tv:6024.20150115
//~~tc: E-Commerce Update to use blank string instead of undefined for string values

var _fbq = _fbq || [];

//tealium universal tag - utag.sender.6024 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Start Tealium loader 4.32
    // Please do not modify
    if (utag === undefined) { utag = {}; } if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState === "complete" || this.readyState === "loaded") { this.onreadystatechange = null; o.cb(); } }; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {"view" : 1};

    u.initialized = false;

      u.map={"fb_fbds_id":"cust_pixel","fb_fbds_action":"conv_pixel"};
  u.extend=[function(a,b){
var wwwpages = {
"www.cincinnati.com":"997446116956495",
"www.indystar.com":"1649840671928338",
"www.desmoinesregister.com":"1020678117955967",
"offers.cincinnati.com":"997446116956495",
"offers.indystar.com":"1649840671928338",
"offers.desmoinesregister.com":"1020678117955967"
};
var conversionPages = {
"subscribe.cincinnati.com/thankyou/":"6030325326518",
"subscribe.indystar.com/thankyou/":"6030122990635",
"subscribe.desmoinesregister.com/thankyou/":"6036862956476"
};
var specificPages = {
"account.cincinnati.com/login/":"997446116956495",
"account.indystar.com/login/":"1649840671928338",
"account.desmoinesregister.com/login/":"1020678117955967"
};
b["fb_fbds_id"]=wwwpages[document.location.hostname]||specificPages[document.location.hostname+document.location.pathname];
b["fb_fbds_action"]=conversionPages[document.location.hostname+document.location.pathname];
if (!b["fb_fbds_id"]&&!b["fb_fbds_action"]){return false;}
}];


    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f;

        u.data = {
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "base_url" : "//connect.facebook.net/en_US/fbds.js",
          "cust_pixel" : "",
          "conv_pixel" : "",
          "custom_data" : {}
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
        // End tag-scoped extensions

        c = [];

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f].indexOf("custom_data.") === 0) {
                u.data.custom_data[[e[f].substr(12)]] = b[d];
              } else {
                u.data[e[f]] = b[d];
              }
            }
          } else {
            h = d.split(":");
            if(h.length === 2 && b[h[0]] === h[1]){
              if (u.map[d].indexOf("Custom.") === 0) {
                g = u.map[d].substr(7);
              } else {
                g = "" + u.event_lookup[u.map[d]];
              }
              if(g !== ""){
                b._cevent = g;
              }
            }
          }
        }
        // End Mapping

        // Start Loader Callback
        u.loader_cb = function () {
          u.initialized = true;

        if (u.data.conv_pixel) {
            _fbq.push(["track", u.data.conv_pixel, {'value':'0.00','currency':'USD'}]);
          }
        };
        // End Loader Callback

        if (!u.initialized) {

          u.loader({ "type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : "utag_2628" });

          // Custom Audiences
	  if (u.data.cust_pixel) {
            _fbq.push(['addPixelId', u.data.cust_pixel]);
            _fbq.push(['track', 'PixelInitialized', {}]);
	  }
        } else {
          u.loader_cb();
        }

        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("2628", "gci.desmoinesregister"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag


//~~tv:20067.20150121
//~~tc: Bring template in-line with current standards and methodologies

//tealium universal tag - utag.sender.20067 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
  (function(id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev={'view':1};

      u.map={"drawbridge_cookie":"_puuid","drawbridge_cb":"_rand"};
  u.extend=[function(a,b){
return (/(subscribe|offers|promotions|welcome|info|gannett|account|holiday)\./).test(location.hostname)?false:true;
},
function(a,b){ try{ if(1){try{b['drawbridge_cb']=Math.round(Math.random() * 1000000000);}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){
b["drawbridge_cookie"]=b["gup_anonid"];
}];


    u.send=function(a,b){
      if(u.ev[a]||typeof u.ev.all!="undefined"){

        var c, d, e, f;

        u.data = {
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "qs_delim" : "?",
          "tag_type" : "img",
          "base_url" : "http://p.adsymptotic.com/d/px/",
          "secure_base_url" : "https://p.adsymptotic.com/d/px/",
          "static_params" : "_pid=12652&_psign=386a2499c93e86501c9b5277fb4e89e2&_pu=gannett&_pp=gannett"
        };

        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};

        c=[];

        for (d in utag.loader.GV(u.map)) {
          if (typeof b[d] !== "undefined" && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f] == "qsp_delim" || e[f] == "kvp_delim" || e[f] == "qs_delim" || e[f] == "base_url" || e[f] == "secure_base_url") {
                u.data[e[f]] = b[d];
              } else {
                // requires "kvp_delim" mapped first (if mapped)
                c.push(e[f] + u.data.kvp_delim + encodeURIComponent(b[d]));
              }
            }
          }
        }

        u.data.secure_base_url = u.data.secure_base_url || u.data.base_url;
        u.data.url = (location.protocol == "https:" ? u.data.secure_base_url : u.data.base_url);

        if(u.data.url.indexOf("http")!==0 && u.data.url.indexOf("/")!==0 ){
          u.data.url = location.protocol + "//" + u.data.url;
        }

        if (u.data.url.indexOf(u.data.qs_delim) < 0 && (c.length > 0 || u.data.static_params.length > 0)) {
          u.data.url += u.data.qs_delim
        }

        if (u.data.static_params) {
          if (c.length > 0) {
            u.data.url += u.data.static_params + u.data.qsp_delim;
          } else {
            u.data.url += u.data.static_params;
          }
        }

        u.loader({"type": u.data.tag_type, "src": u.data.url + c.join(u.data.qsp_delim), "loc": "script", "id": 'utag_2642'});
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("2642", "gci.desmoinesregister"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

//~~tv:6020.20140717
//~~tc: Add support for value and currency conversion fields


var _fbds = _fbds || {};
var _fbq = _fbq || [];

//tealium universal tag - utag.sender.6020 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;
    // Start Tealium loader
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { b.hFlag = 0; b.onreadystatechange = function () { if ((this.readyState === 'complete' || this.readyState === 'loaded') && !b.hFlag) { b.hFlag = 1; o.cb(); } }; b.onload = function () { if (!b.hFlag) { b.hFlag = 1; o.cb(); } }; } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    u.ev = {'view': 1};
    u.initialized = false;
    u.map={};
  u.extend=[];

    u.send=function(a,b){
      if (u.ev[a] || u.ev.all !== undefined){
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        u.data = {
          "base_url" : "//connect.facebook.net/en_US/fbds.js",
          "pixel_id" : "1104697869548293",
          "value" : "",
          "currency" : ""
        }

        var c, d, e, f;

        
        
        c = [];

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f].indexOf("event.") === 0) {
                c.push(b[d]);
              } else {
                u.data[e[f]] = b[d];
              }
            }
          }
        }
        // End Mapping

        window._fbds.pixelId = u.data.pixel_id;


        if (!u.initialized) {
          u.initialized = true;
          window._fbq.push(["track", u.data.pixel_id, {"value" : u.data.value, "currency" : u.data.currency}]); //map value, currency
        }

        for (var i=0; i<c.length; i++) {
          window._fbq.push(c[i]);
        }
        
        // Start Loader Callback
        u.loader_cb = function () {
        };
        // End Loader Callback

        u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_2669' });
        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }('2669', 'gci.desmoinesregister'));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag


//~~tv:19063.am151.20150902
//~~tc: Update so value mapped to PRODUCTS_event does not set event when value is empty string
//~~tc: Add support for multiple events set at same time (from one data layer variable)
//~~tc: Fix to ensure Visitor function is not defined when no cloudid specified
var s_account="gpaper122,globaldesktopmobilesite";
var s_gci = new AppMeasurement();

s_gci.account="gpaper122,globaldesktopmobilesite";

/************************** CONFIG SECTION **************************/
s_gci.trackDownloadLinks=true;
s_gci.trackExternalLinks=true;
s_gci.trackInlineStats=true;
s_gci.linkInternalFilters="127.0.0.1,localhost,javascript:,mailto:,amazonaws.com,usatoday.com,cars.com,jobs.com,careers.com,careerbuilder.com,salary.com,pgpartner.com,apartments.com,homescape.com,homefinder.com,homegain.com,forsalebyowner.com,quickenloans.com,vanlines.com,servicemagic.com,medicinenet.com,mixx.com,digg,del.icio.us,newsvine.com,reddit.com,facebook.com,twitter.com,/t.co/,fark.com,myspace.com,stumbleupon.com,propeller.com,linkedin.com,sportsnetwork.com,desmoinesregister.com";
s_gci.linkLeaveQueryString=false;
s_gci.linkTrackVars="None";
s_gci.linkTrackEvents="None";
s_gci.usePlugins=false;
s_gci.currencyCode="USD"; // override default with E-Commerce Extension
s_gci.visitorNamespace = "gannett";
s_gci.trackingServer="repdata.desmoinesregister.com";
s_gci.trackingServerSecure="srepdata.desmoinesregister.com";

s_gci.debugTracking=utag.cfg.utagdb;

if ("CF4957F555EE9B727F000101") {
// NOTE: Modified API to put Visitor in window scope so it is only declared if cloudid value specificed (removes hoisting)
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ============

 Adobe Visitor API for JavaScript version: 1.5
 Copyright 1996-2015 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
window.Visitor = function(m,s){if(!m)throw"Visitor requires Adobe Marketing Cloud Org ID";var a=this;a.version="1.5";var l=window,j=l.Visitor;l.s_c_in||(l.s_c_il=[],l.s_c_in=0);a._c="Visitor";a._il=l.s_c_il;a._in=l.s_c_in;a._il[a._in]=a;l.s_c_in++;var n=l.document,h=j.La;h||(h=null);var x=j.Ma;x||(x=void 0);var i=j.ja;i||(i=!0);var k=j.Ka;k||(k=!1);a.R=function(a){var c=0,b,e;if(a)for(b=0;b<a.length;b++)e=a.charCodeAt(b),c=(c<<5)-c+e,c&=c;return c};a.q=function(a){var c="0123456789",b="",e="",f,g=8,i=10,h=
10;if(1==a){c+="ABCDEF";for(a=0;16>a;a++)f=Math.floor(Math.random()*g),b+=c.substring(f,f+1),f=Math.floor(Math.random()*g),e+=c.substring(f,f+1),g=16;return b+"-"+e}for(a=0;19>a;a++)f=Math.floor(Math.random()*i),b+=c.substring(f,f+1),0==a&&9==f?i=3:(1==a||2==a)&&10!=i&&2>f?i=10:2<a&&(i=10),f=Math.floor(Math.random()*h),e+=c.substring(f,f+1),0==a&&9==f?h=3:(1==a||2==a)&&10!=h&&2>f?h=10:2<a&&(h=10);return b+e};a.la=function(){var a;!a&&l.location&&(a=l.location.hostname);if(a)if(/^[0-9.]+$/.test(a))a=
"";else{var c=a.split("."),b=c.length-1,e=b-1;1<b&&2>=c[b].length&&(2==c[b-1].length||0>",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,et,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,nz,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,".indexOf(","+
c[b]+","))&&e--;if(0<e)for(a="";b>=e;)a=c[b]+(a?".":"")+a,b--}return a};a.cookieRead=function(a){var a=encodeURIComponent(a),c=(";"+n.cookie).split(" ").join(";"),b=c.indexOf(";"+a+"="),e=0>b?b:c.indexOf(";",b+1);return 0>b?"":decodeURIComponent(c.substring(b+2+a.length,0>e?c.length:e))};a.cookieWrite=function(d,c,b){var e=a.cookieLifetime,f,c=""+c,e=e?(""+e).toUpperCase():"";b&&"SESSION"!=e&&"NONE"!=e?(f=""!=c?parseInt(e?e:0,10):-60)?(b=new Date,b.setTime(b.getTime()+1E3*f)):1==b&&(b=new Date,f=
b.getYear(),b.setYear(f+2+(1900>f?1900:0))):b=0;return d&&"NONE"!=e?(n.cookie=encodeURIComponent(d)+"="+encodeURIComponent(c)+"; path=/;"+(b?" expires="+b.toGMTString()+";":"")+(a.cookieDomain?" domain="+a.cookieDomain+";":""),a.cookieRead(d)==c):0};a.g=h;a.N=function(a,c){try{"function"==typeof a?a.apply(l,c):a[1].apply(a[0],c)}catch(b){}};a.pa=function(d,c){c&&(a.g==h&&(a.g={}),a.g[d]==x&&(a.g[d]=[]),a.g[d].push(c))};a.o=function(d,c){if(a.g!=h){var b=a.g[d];if(b)for(;0<b.length;)a.N(b.shift(),
c)}};a.j=h;a.na=function(d,c,b){var e=0,f=0,g;if(c&&n){for(g=0;!e&&2>g;){try{e=(e=n.getElementsByTagName(0<g?"HEAD":"head"))&&0<e.length?e[0]:0}catch(i){e=0}g++}if(!e)try{n.body&&(e=n.body)}catch(k){e=0}if(e)for(g=0;!f&&2>g;){try{f=n.createElement(0<g?"SCRIPT":"script")}catch(j){f=0}g++}}!c||!e||!f?b&&b():(f.type="text/javascript",f.setAttribute("async","async"),f.src=c,e.firstChild?e.insertBefore(f,e.firstChild):e.appendChild(f),b&&(a.j==h&&(a.j={}),a.j[d]=setTimeout(b,a.loadTimeout)))};a.ka=function(d){a.j!=
h&&a.j[d]&&(clearTimeout(a.j[d]),a.j[d]=0)};a.S=k;a.T=k;a.isAllowed=function(){if(!a.S&&(a.S=i,a.cookieRead(a.cookieName)||a.cookieWrite(a.cookieName,"T",1)))a.T=i;return a.T};a.a=h;a.e=h;var z=j.Za;z||(z="MC");var q=j.cb;q||(q="MCMID");var A=j.$a;A||(A="MCCIDH");var B=j.bb;B||(B="MCSYNCS");var D=j.ab;D||(D="MCIDTS");var y=j.Xa;y||(y="A");var o=j.Ua;o||(o="MCAID");var w=j.Ya;w||(w="AAM");var v=j.Wa;v||(v="MCAAMLH");var p=j.Va;p||(p="MCAAMB");var r=j.eb;r||(r="NONE");a.B=0;a.Q=function(){if(!a.B){var d=
a.version;a.audienceManagerServer&&(d+="|"+a.audienceManagerServer);a.audienceManagerServerSecure&&(d+="|"+a.audienceManagerServerSecure);a.B=a.R(d)}return a.B};a.U=k;a.f=function(){if(!a.U){a.U=i;var d=a.Q(),c=k,b=a.cookieRead(a.cookieName),e,f,g,j=new Date;a.a==h&&(a.a={});if(b&&"T"!=b){b=b.split("|");b[0].match(/^[\-0-9]+$/)&&(parseInt(b[0],10)!=d&&(c=i),b.shift());1==b.length%2&&b.pop();for(d=0;d<b.length;d+=2)e=b[d].split("-"),f=e[0],g=b[d+1],e=1<e.length?parseInt(e[1],10):0,c&&(f==A&&(g=""),
0<e&&(e=j.getTime()/1E3-60)),f&&g&&(a.c(f,g,1),0<e&&(a.a["expire"+f]=e,j.getTime()>=1E3*e&&(a.e||(a.e={}),a.e[f]=i)))}if(!a.b(o)&&(b=a.cookieRead("s_vi")))b=b.split("|"),1<b.length&&0<=b[0].indexOf("v1")&&(g=b[1],d=g.indexOf("["),0<=d&&(g=g.substring(0,d)),g&&g.match(/^[0-9a-fA-F\-]+$/)&&a.c(o,g))}};a.ra=function(){var d=a.Q(),c,b;for(c in a.a)!Object.prototype[c]&&a.a[c]&&"expire"!=c.substring(0,6)&&(b=a.a[c],d+=(d?"|":"")+c+(a.a["expire"+c]?"-"+a.a["expire"+c]:"")+"|"+b);a.cookieWrite(a.cookieName,
d,1)};a.b=function(d,c){return a.a!=h&&(c||!a.e||!a.e[d])?a.a[d]:h};a.c=function(d,c,b){a.a==h&&(a.a={});a.a[d]=c;b||a.ra()};a.ma=function(d,c){var b=a.b(d,c);return b?b.split("*"):h};a.qa=function(d,c,b){a.c(d,c?c.join("*"):"",b)};a.Ra=function(d,c){var b=a.ma(d,c);if(b){var e={},f;for(f=0;f<b.length;f+=2)e[b[f]]=b[f+1];return e}return h};a.Ta=function(d,c,b){var e=h,f;if(c)for(f in e=[],c)Object.prototype[f]||(e.push(f),e.push(c[f]));a.qa(d,e,b)};a.l=function(d,c){var b=new Date;b.setTime(b.getTime()+
1E3*c);a.a==h&&(a.a={});a.a["expire"+d]=Math.floor(b.getTime()/1E3);0>c?(a.e||(a.e={}),a.e[d]=i):a.e&&(a.e[d]=k)};a.P=function(a){if(a&&("object"==typeof a&&(a=a.d_mid?a.d_mid:a.visitorID?a.visitorID:a.id?a.id:a.uuid?a.uuid:""+a),a&&(a=a.toUpperCase(),"NOTARGET"==a&&(a=r)),!a||a!=r&&!a.match(/^[0-9a-fA-F\-]+$/)))a="";return a};a.i=function(d,c){a.ka(d);a.h!=h&&(a.h[d]=k);if(d==z){var b=a.b(q);if(!b){b="object"==typeof c&&c.mid?c.mid:a.P(c);if(!b){if(a.u){a.getAnalyticsVisitorID(h,k,i);return}b=a.q()}a.c(q,
b)}if(!b||b==r)b="";"object"==typeof c&&((c.d_region||c.dcs_region||c.d_blob||c.blob)&&a.i(w,c),a.u&&c.mid&&a.i(y,{id:c.id}));a.o(q,[b])}if(d==w&&"object"==typeof c){b=604800;c.id_sync_ttl!=x&&c.id_sync_ttl&&(b=parseInt(c.id_sync_ttl,10));var e=a.b(v);e||((e=c.d_region)||(e=c.dcs_region),e&&(a.l(v,b),a.c(v,e)));e||(e="");a.o(v,[e]);e=a.b(p);if(c.d_blob||c.blob)(e=c.d_blob)||(e=c.blob),a.l(p,b),a.c(p,e);e||(e="");a.o(p,[e]);!c.error_msg&&a.s&&a.c(A,a.s);a.idSyncDisableSyncs?t.aa=i:(t.aa=k,t.Ia({Aa:c.ibs,
d:c.subdomain}))}if(d==y){b=a.b(o);b||((b=a.P(c))?a.l(p,-1):b=r,a.c(o,b));if(!b||b==r)b="";a.o(o,[b])}};a.h=h;a.r=function(d,c,b,e){var f="",g;if(a.isAllowed()&&(a.f(),f=a.b(d),!f&&(d==q?g=z:d==v||d==p?g=w:d==o&&(g=y),g))){if(c&&(a.h==h||!a.h[g]))a.h==h&&(a.h={}),a.h[g]=i,a.na(g,c,function(){if(!a.b(d)){var b="";d==q?b=a.q():g==w&&(b={error_msg:"timeout"});a.i(g,b)}});a.pa(d,b);c||a.i(g,{id:r});return""}if((d==q||d==o)&&f==r)f="",e=i;b&&e&&a.N(b,[f]);return f};a._setMarketingCloudFields=function(d){a.f();
a.i(z,d)};a.setMarketingCloudVisitorID=function(d){a._setMarketingCloudFields(d)};a.u=k;a.getMarketingCloudVisitorID=function(d,c){if(a.isAllowed()){a.marketingCloudServer&&0>a.marketingCloudServer.indexOf(".demdex.net")&&(a.u=i);var b=a.A("_setMarketingCloudFields");return a.r(q,b,d,c)}return""};a.oa=function(){a.getAudienceManagerBlob()};j.AuthState={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2};a.p={};a.O=k;a.s="";a.setCustomerIDs=function(d){if(a.isAllowed()&&d){a.f();var c,b;for(c in d)if(!Object.prototype[c]&&
(b=d[c]))if("object"==typeof b){var e={};b.id&&(e.id=b.id);b.authState!=x&&(e.authState=b.authState);a.p[c]=e}else a.p[c]={id:b};var d=a.getCustomerIDs(),e=a.b(A),f="";e||(e=0);for(c in d)Object.prototype[c]||(b=d[c],f+=(f?"|":"")+c+"|"+(b.id?b.id:"")+(b.authState?b.authState:""));a.s=a.R(f);a.s!=e&&(a.O=i,a.oa())}};a.getCustomerIDs=function(){a.f();var d={},c,b;for(c in a.p)Object.prototype[c]||(b=a.p[c],d[c]||(d[c]={}),b.id&&(d[c].id=b.id),d[c].authState=b.authState!=x?b.authState:j.AuthState.UNKNOWN);
return d};a._setAnalyticsFields=function(d){a.f();a.i(y,d)};a.setAnalyticsVisitorID=function(d){a._setAnalyticsFields(d)};a.getAnalyticsVisitorID=function(d,c,b){if(a.isAllowed()){var e="";b||(e=a.getMarketingCloudVisitorID(function(){a.getAnalyticsVisitorID(d,i)}));if(e||b){var f=b?a.marketingCloudServer:a.trackingServer,g="";a.loadSSL&&(b?a.marketingCloudServerSecure&&(f=a.marketingCloudServerSecure):a.trackingServerSecure&&(f=a.trackingServerSecure));f&&(g="http"+(a.loadSSL?"s":"")+"://"+f+"/id?callback=s_c_il%5B"+
a._in+"%5D._set"+(b?"MarketingCloud":"Analytics")+"Fields&mcorgid="+encodeURIComponent(a.marketingCloudOrgID)+(e?"&mid="+e:""));return a.r(b?q:o,g,d,c)}}return""};a._setAudienceManagerFields=function(d){a.f();a.i(w,d)};a.A=function(d){var c=a.audienceManagerServer,b="",e=a.b(q),f=a.b(p,i),g=a.b(o),g=g&&g!=r?"&d_cid_ic=AVID%01"+encodeURIComponent(g):"";a.loadSSL&&a.audienceManagerServerSecure&&(c=a.audienceManagerServerSecure);if(c){var b=a.getCustomerIDs(),h,j;if(b)for(h in b)Object.prototype[h]||
(j=b[h],g+="&d_cid_ic="+encodeURIComponent(h)+"%01"+encodeURIComponent(j.id?j.id:"")+(j.authState?"%01"+j.authState:""));d||(d="_setAudienceManagerFields");b="http"+(a.loadSSL?"s":"")+"://"+c+"/id?d_rtbd=json&d_ver=2"+(!e&&a.u?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(a.marketingCloudOrgID)+"&d_nsid="+(a.idSyncContainerID||0)+(e?"&d_mid="+e:"")+(f?"&d_blob="+encodeURIComponent(f):"")+g+"&d_cb=s_c_il%5B"+a._in+"%5D."+d}return b};a.getAudienceManagerLocationHint=function(d,c){if(a.isAllowed()&&
a.getMarketingCloudVisitorID(function(){a.getAudienceManagerLocationHint(d,i)})){var b=a.b(o);b||(b=a.getAnalyticsVisitorID(function(){a.getAudienceManagerLocationHint(d,i)}));if(b)return b=a.A(),a.r(v,b,d,c)}return""};a.getAudienceManagerBlob=function(d,c){if(a.isAllowed()&&a.getMarketingCloudVisitorID(function(){a.getAudienceManagerBlob(d,i)})){var b=a.b(o);b||(b=a.getAnalyticsVisitorID(function(){a.getAudienceManagerBlob(d,i)}));if(b)return b=a.A(),a.O&&a.l(p,-1),a.r(p,b,d,c)}return""};a.m="";
a.t={};a.C="";a.D={};a.getSupplementalDataID=function(d,c){!a.m&&!c&&(a.m=a.q(1));var b=a.m;a.C&&!a.D[d]?(b=a.C,a.D[d]=i):b&&(a.t[d]&&(a.C=a.m,a.D=a.t,a.m=b=!c?a.q(1):"",a.t={}),b&&(a.t[d]=i));return b};var u={k:!!l.postMessage,ha:1,M:864E5};a.Na=u;a.W={postMessage:function(a,c,b){var e=1;c&&(u.k?b.postMessage(a,c.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):c&&(b.location=c.replace(/#.*$/,"")+"#"+ +new Date+e++ +"&"+a))},I:function(a,c){var b;try{if(u.k)if(a&&(b=function(b){if("string"===typeof c&&b.origin!==
c||"[object Function]"===Object.prototype.toString.call(c)&&!1===c(b.origin))return!1;a(b)}),window.addEventListener)window[a?"addEventListener":"removeEventListener"]("message",b,!1);else window[a?"attachEvent":"detachEvent"]("onmessage",b)}catch(e){}}};var E={X:function(){if(n.addEventListener)return function(a,c,b){a.addEventListener(c,function(a){"function"===typeof b&&b(a)},k)};if(n.attachEvent)return function(a,c,b){a.attachEvent("on"+c,function(a){"function"===typeof b&&b(a)})}}(),map:function(a,
c){if(Array.prototype.map)return a.map(c);if(void 0===a||a===h)throw new TypeError;var b=Object(a),e=b.length>>>0;if("function"!==typeof c)throw new TypeError;for(var f=Array(e),g=0;g<e;g++)g in b&&(f[g]=c.call(c,b[g],g,b));return f},xa:function(a,c){return this.map(a,function(a){return encodeURIComponent(a)}).join(c)}};a.Sa=E;var t={ia:3E4,L:649,ea:k,id:h,G:h,$:function(a){if("string"===typeof a)return a=a.split("/"),a[0]+"//"+a[2]},d:h,url:h,za:function(){var d="http://fast.",c="?d_nsid="+a.idSyncContainerID+
"#"+encodeURIComponent(n.location.href);this.d||(this.d="nosubdomainreturned");a.loadSSL&&(d=a.idSyncSSLUseAkamai?"https://fast.":"https://");d=d+this.d+".demdex.net/dest5.html"+c;this.G=this.$(d);this.id="destination_publishing_iframe_"+this.d+"_"+a.idSyncContainerID;return d},ta:function(){var d="?d_nsid="+a.idSyncContainerID+"#"+encodeURIComponent(n.location.href);"string"===typeof a.z&&a.z.length&&(this.id="destination_publishing_iframe_"+(new Date).getTime()+"_"+a.idSyncContainerID,this.G=this.$(a.z),
this.url=a.z+d)},aa:h,K:k,v:k,fb:k,Ga:k,gb:k,J:k,w:[],Ea:[],Fa:[],ba:u.k?15:100,H:[],Ca:[],Z:i,ca:k,Y:function(){function a(){e=document.createElement("iframe");e.id=b.id;e.style.cssText="display: none; width: 0; height: 0;";e.src=b.url;b.Ga=i;c();document.body.appendChild(e)}function c(){E.X(e,"load",function(){e.className="aamIframeLoaded";b.v=i;b.n()})}this.K=i;var b=this,e=document.getElementById(this.id);e?"IFRAME"!==e.nodeName?(this.id+="_2",a()):"aamIframeLoaded"!==e.className?c():(this.v=
i,this.n()):a();this.Ba=e},n:function(d){var c=this;d===Object(d)&&this.H.push(d);if((this.ca||!u.k||this.v)&&this.H.length)this.Ha(this.H.shift()),this.n();!a.idSyncDisableSyncs&&this.v&&this.w.length&&!this.J&&(this.ea||(this.ea=i,setTimeout(function(){c.ba=u.k?15:150},this.ia)),this.J=i,this.da())},Ha:function(a){var c=encodeURIComponent,b,e,f,g,h;if((b=a.Aa)&&b instanceof Array&&(e=b.length))for(f=0;f<e;f++)g=b[f],h=[c("ibs"),c(g.id||""),c(g.tag||""),E.xa(g.url||[],","),c(g.fa||""),"","",g.ya?
"true":"false"],this.Z?this.F(h.join("|")):g.ya&&this.ua(g,h.join("|"));this.Ca.push(a)},ua:function(d,c){a.f();var b=a.b(B),e=k,f=k,g=Math.ceil((new Date).getTime()/u.M);if(b){if(b=b.split("*"),f=this.Ja(b,d.id,g),e=f.va,f=f.wa,!e||!f)this.F(c),b.push(d.id+"-"+(g+Math.ceil(d.fa/60/24))),this.Da(b),a.c(B,b.join("*"))}else this.F(c),a.c(B,d.id+"-"+(g+Math.ceil(d.fa/60/24)))},Ja:function(a,c,b){var e=k,f=k,g,h,j;for(h=0;h<a.length;h++)g=a[h],j=parseInt(g.split("-")[1],10),g.match("^"+c+"-")?(e=i,b<
j?f=i:(a.splice(h,1),h--)):b>=j&&(a.splice(h,1),h--);return{va:e,wa:f}},Da:function(a){if(a.join("*").length>this.L)for(a.sort(function(a,b){return parseInt(a.split("-")[1],10)-parseInt(b.split("-")[1],10)});a.join("*").length>this.L;)a.shift()},F:function(d){var c=encodeURIComponent;this.w.push((a.Pa?c("---destpub-debug---"):c("---destpub---"))+d)},da:function(){var d=this,c;this.w.length?(c=this.w.shift(),a.W.postMessage(c,this.url,this.Ba.contentWindow),this.Ea.push(c),setTimeout(function(){d.da()},
this.ba)):this.J=k},I:function(a){var c=/^---destpub-to-parent---/;"string"===typeof a&&c.test(a)&&(c=a.replace(c,"").split("|"),"canSetThirdPartyCookies"===c[0]&&(this.Z="true"===c[1]?i:k,this.ca=i,this.n()),this.Fa.push(a))},Ia:function(d){this.url===h&&(this.d="string"===typeof a.V&&a.V.length?a.V:d.d||"",this.url=this.za());this.d&&"nosubdomainreturned"!==this.d&&!this.K&&(j.ga||"complete"===n.readyState||"loaded"===n.readyState)&&this.Y();"function"===typeof a.idSyncIDCallResult?a.idSyncIDCallResult(d):
this.n(d);"function"===typeof a.idSyncAfterIDCallResult&&a.idSyncAfterIDCallResult(d)},sa:function(d,c){return a.Qa||!d||c-d>u.ha}};a.Oa=t;0>m.indexOf("@")&&(m+="@AdobeOrg");a.marketingCloudOrgID=m;a.cookieName="AMCV_"+m;a.cookieDomain=a.la();a.cookieDomain==l.location.hostname&&(a.cookieDomain="");a.loadSSL=0<=l.location.protocol.toLowerCase().indexOf("https");a.loadTimeout=500;a.marketingCloudServer=a.audienceManagerServer="dpm.demdex.net";if(s&&"object"==typeof s){for(var C in s)!Object.prototype[C]&&
(a[C]=s[C]);a.idSyncContainerID=a.idSyncContainerID||0;a.f();C=a.b(D);var F=Math.ceil((new Date).getTime()/u.M);!a.idSyncDisableSyncs&&t.sa(C,F)&&(a.l(p,-1),a.c(D,F));a.getMarketingCloudVisitorID();a.getAudienceManagerLocationHint();a.getAudienceManagerBlob()}if(!a.idSyncDisableSyncs){t.ta();E.X(window,"load",function(){var a=t;j.ga=i;a.d&&"nosubdomainreturned"!==a.d&&a.url&&!a.K&&a.Y()});try{a.W.I(function(a){t.I(a.data)},t.G)}catch(G){}}}
Visitor.getInstance=function(m,s){var a,l=window.s_c_il,j;0>m.indexOf("@")&&(m+="@AdobeOrg");if(l)for(j=0;j<l.length;j++)if((a=l[j])&&"Visitor"==a._c&&a.marketingCloudOrgID==m)return a;return new Visitor(m,s)};

/*
(function(){function m(){s.ga=a}var s=window.Visitor,a=s.ja;a||(a=!0);window.addEventListener?window.addEventListener("load",m):window.attachEvent&&window.attachEvent("onload",m)})();
*/

  // End Visitor API

  window.visitor = new Visitor("CF4957F555EE9B727F000101");
  window.visitor.trackingServer = s_gci.trackingServer;
  window.visitor.trackingServerSecure = s_gci.trackingServerSecure;

  s_gci.visitor = Visitor.getInstance("CF4957F555EE9B727F000101");
}

// Start AppMeasurement
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.5.1
Copyright 1996-2015 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com
*/
function AppMeasurement(){var a=this;a.version="1.5.1";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.zb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.ob=function(a){try{console.log(a)}catch(b){}};a.za=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.fb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.fb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.G=[];a.ba=function(c,b,d){if(a.ta)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];
g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ca)for(a.ca=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ca=0,a.delayReady())});f=1;e=0}else d||a.l("_d")&&(f=1);f&&(a.G.push({m:c,a:b,t:e}),a.ca||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.l("_d")?b=1:a.na();0<a.G.length;){d=a.G.shift();if(b&&!d.t&&d.t>c){a.G.unshift(d);setTimeout(a.delayReady,
parseInt(a.maxDelay/2));break}a.ta=1;a[d.m].apply(a,d.a);a.ta=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ba("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.K,(m=a.lightTrackVars)&&(m=","+m+","+a.ga.join(",")+",");else{d=a.c;if(a.pe||a.linkType)m=a.linkTrackVars,
f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].yb,f=a[e].xb));m&&(m=","+m+","+a.A.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.B=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=
0;p<n.length;p++)m.substring(0,n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.B(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.za(w)&&("prop"==
k?m="c"+w:"eVar"==k?m="v"+w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.hb=function(){var c="",b,d,f,e,g,m,p,k,n="",r="",s=e="";if(a.lightProfileID)b=a.K,(n=a.lightTrackVars)&&(n=","+n+","+a.ga.join(",")+",");else{b=a.c;if(a.pe||a.linkType)n=a.linkTrackVars,r=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].yb,r=a[e].xb));n&&(n=","+n+","+a.A.join(",")+",");r&&(r=","+r+",",
n&&(n+=",events,"));a.events2&&(s+=(""!=s?",":"")+a.events2)}if(a.visitor&&1.5<=parseFloat(a.visitor.version)&&a.visitor.getCustomerIDs){e=q;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState));e&&(c+=a.B("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.B("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);!g&&
"events"==e&&s&&(g=s,s="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,
255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
"cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":s&&(g+=(""!=g?",":"")+s);if(r)for(m=
g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=r.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.B("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
"mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.B("mts",a[e],n,e));g="";break;default:a.za(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.u=function(a){var b=a.tagName;if("undefined"!=""+a.Cb||"undefined"!=""+a.sb&&"HTML"!=(""+a.sb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.va=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.H=function(c){var b=a.u(c),d,f,e="",g=0;return b&&
(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):c.src&&"IMAGE"==b&&(e=c.src):e=a.va(c),e)?{id:e.substring(0,100),type:g}:0};a.Ab=function(c){for(var b=a.u(c),d=a.H(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.u(c),d=a.H(c);
d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.rb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.ha=1;d||(a.ha=0,d=a.clickObject);if(d){c=a.u(d);for(b=a.H(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.u(d),b=a.H(d);b&&"BODY"!=c||(d=0);if(d){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.ha=1;!e&&d&&(e=a.va(d));e&&!a.linkLeaveQueryString&&
(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,r=0,q;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(q=g[m])&&p.substring(p.length-(q.length+1))=="."+q&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.ya(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?
(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)q=g[m],0<=p.indexOf(q)&&(r=1);r?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,
100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.ib=function(){var c=a.ha,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),b[p]=f;f=a.account.split(",");if(c||a.e){c&&
!a.e&&(e=1);for(p in b)if(!Object.prototype[p])for(m=0;m<f.length;m++)for(e&&(k=b[p].join(","),k==a.account&&(a.e+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),g=0;g<b[p].length;g++)k=b[p][g],k==f[m]&&(e&&(a.e+="&u="+a.escape(k)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(g,1),d=1);c||(d=1);if(d){e="";m=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};
a.jb=function(){if(!a.wb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&(k="1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?
a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Bb(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.wb=1}};a.L={};a.loadModule=function(c,b){var d=a.L[c];if(!d){d=k["AppMeasurement_Module_"+
c]?new k["AppMeasurement_Module_"+c](a):{};a.L[c]=a[c]=d;d.Na=function(){return d.Ra};d.Sa=function(b){if(d.Ra=b)a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Na,set:d.Sa}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ba(c+"_onLoad",[a,d],1)||b(a,d))};a.l=function(c){var b,d;for(b in a.L)if(!Object.prototype[b]&&(d=a.L[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.mb=function(){var c=
Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.M=function(c,b){var d,f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.Ga=function(c,b){var d,
f,e,g;for(d=0;2>d;d++)for(f=0<d?a.oa:a.c,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.cb=function(a){var b,d,f,e,g,m=0,k,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(k=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?m=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(m=",p,ei,"),
m&&k)))){if((a=k.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=m.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?k=n+"&"+q:q=""}d=253-(k.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+k}return a};a.Ma=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;
b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.Y=!1;a.D=!1;a.Ta=function(){a.D=!0;a.i()};a.W=!1;a.Q=!1;a.Qa=function(c){a.marketingCloudVisitorID=c;a.Q=!0;a.i()};a.T=!1;a.N=!1;a.Ia=function(c){a.analyticsVisitorID=c;a.N=!0;a.i()};a.V=!1;a.P=!1;a.Ka=function(c){a.audienceManagerLocationHint=c;a.P=!0;a.i()};a.U=!1;a.O=!1;a.Ja=function(c){a.audienceManagerBlob=c;a.O=!0;a.i()};a.La=function(c){a.maxDelay||(a.maxDelay=250);return a.l("_d")?(c&&setTimeout(function(){c()},a.maxDelay),
!1):!0};a.X=!1;a.C=!1;a.na=function(){a.C=!0;a.i()};a.isReadyToTrack=function(){var c=!0,b=a.visitor;a.Y||a.D||(a.Ma(a.Ta)?a.D=!0:a.Y=!0);if(a.Y&&!a.D)return!1;b&&b.isAllowed()&&(a.W||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.W=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.Qa]),a.marketingCloudVisitorID&&(a.Q=!0)),a.T||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.T=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Ia]),a.analyticsVisitorID&&(a.N=!0)),a.V||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.V=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Ka]),a.audienceManagerLocationHint&&(a.P=!0)),a.U||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.U=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ja]),a.audienceManagerBlob&&(a.O=!0)),a.W&&!a.Q&&!a.marketingCloudVisitorID||a.T&&!a.N&&!a.analyticsVisitorID||a.V&&!a.P&&!a.audienceManagerLocationHint||a.U&&!a.O&&!a.audienceManagerBlob)&&(c=!1);a.X||
a.C||(a.La(a.na)?a.C=!0:a.X=!0);a.X&&!a.C&&(c=!1);return c};a.k=q;a.o=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Xa=c;f.Wa=b;f.Ua=d;a.k==q&&(a.k=[]);a.k.push(f);0==a.o&&(a.o=setInterval(a.i,100))};a.i=function(){var c;if(a.isReadyToTrack()&&(a.o&&(clearInterval(a.o),a.o=0),a.k!=q))for(;0<a.k.length;)c=a.k.shift(),c.Wa.apply(c.Xa,c.Ua)};a.Oa=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Ga(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,
a.track,b);return!0}return!1};a.gb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+
"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.eb&&(a.authState=a.visitor.eb()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)));a.l("_s");a.Oa(c)||(b&&a.M(b),c&&(d={},a.Ga(d,0),a.M(c)),a.mb()&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.gb()),a.rb(),a.usePlugins&&a.doPlugins&&
a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ha||(a.referrer=r.document.referrer),a.Ha=1,a.referrer=a.cb(a.referrer),a.l("_g")),a.ib()&&!a.abort&&(a.jb(),g+=a.hb(),a.qb(e,g),a.l("_t"),a.referrer=""))),c&&a.M(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=
a.lightProfileID=0};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.j=c,a.q=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.c.length;c++)if(b=a.c[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==
b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.qb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&
a.AudienceManagement.isReady();d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.vb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].AudienceManagement.passData&":"")+b+"&AQE=1";a.ab(d);a.da()};a.ab=function(c){a.g||a.kb();a.g.push(c);a.fa=a.r();a.Fa()};a.kb=function(){a.g=a.nb();a.g||(a.g=[])};a.nb=function(){var c,b;if(a.ka()){try{(b=k.localStorage.getItem(a.ia()))&&(c=k.JSON.parse(b))}catch(d){}return c}};
a.ka=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.wa=function(){var c=0;a.g&&(c=a.g.length);a.v&&c++;return c};a.da=function(){if(!a.v)if(a.xa=q,a.ja)a.fa>a.J&&a.Da(a.g),a.ma(500);else{var c=a.Va();if(0<c)a.ma(c);else if(c=a.ua())a.v=1,a.pb(c),a.tb(c)}};a.ma=function(c){a.xa||(c||(c=0),a.xa=setTimeout(a.da,c))};a.Va=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.r()-a.Ca;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.ua=function(){if(0<a.g.length)return a.g.shift()};a.pb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.ob(b)}};a.Pa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.S=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.S=!0,a.R=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.R=function(a){return k.$.parseJSON(a)},a.S=!0):a.R=function(){return null};a.tb=function(c){var b,
d,f;a.Pa()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(a.S?b.pa=!0:b=0));!b&&a.lb&&(c=c.substring(0,2047));!b&&a.d.createElement&&a.AudienceManagement&&a.AudienceManagement.isReady()&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",
b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="");b.ra=function(){try{a.la&&(clearTimeout(a.la),a.la=0),b.timeout&&(clearTimeout(b.timeout),b.timeout=0)}catch(c){}};b.onload=b.ub=function(){b.ra();a.$a();a.Z();a.v=0;a.da();if(b.pa){b.pa=!1;try{var c=a.R(b.responseText);AudienceManagement.passData(c)}catch(d){}}};b.onabort=b.onerror=b.bb=function(){b.ra();(a.trackOffline||a.ja)&&a.v&&a.g.unshift(a.Za);a.v=0;a.fa>a.J&&a.Da(a.g);a.Z();a.ma(500)};b.onreadystatechange=function(){4==b.readyState&&
(200==b.status?b.ub():b.bb())};a.Ca=a.r();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Aa)try{f.removeChild(a.Aa)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Aa=a.Ya}b.abort&&(a.la=setTimeout(b.abort,5E3));a.Za=c;a.Ya=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.F||a.q)a.forcedLinkTrackingTimeout||
(a.forcedLinkTrackingTimeout=250),a.aa=setTimeout(a.Z,a.forcedLinkTrackingTimeout)};a.$a=function(){if(a.ka()&&!(a.Ba>a.J))try{k.localStorage.removeItem(a.ia()),a.Ba=a.r()}catch(c){}};a.Da=function(c){if(a.ka()){a.Fa();try{k.localStorage.setItem(a.ia(),k.JSON.stringify(c)),a.J=a.r()}catch(b){}}};a.Fa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.g.length>a.offlineLimit;)a.ua()}};a.forceOffline=function(){a.ja=!0};a.forceOnline=function(){a.ja=!1};a.ia=
function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.r=function(){return(new Date).getTime()};a.ya=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.vb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.M(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],
f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&
b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.A="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData pe pev1 pev2 pev3 pageURLRest".split(" ");
a.c=a.A.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ga="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.K=a.ga.slice(0);a.oa="account allAccounts debugTracking visitor trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData AudienceManagement".split(" ");
for(n=0;250>=n;n++)76>n&&(a.c.push("prop"+n),a.K.push("prop"+n)),a.c.push("eVar"+n),a.K.push("eVar"+n),6>n&&a.c.push("hier"+n),4>n&&a.c.push("list"+n);n="latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage".split(" ");a.c=a.c.concat(n);a.A=a.A.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";
a.Ca=0;a.fa=0;a.J=0;a.Ba=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{a.lb="Microsoft Internet Explorer"==navigator.appName}catch(y){}a.Z=function(){a.aa&&(k.clearTimeout(a.aa),a.aa=q);a.j&&a.F&&a.j.dispatchEvent(a.F);a.q&&("function"==typeof a.q?a.q():a.j&&a.j.href&&(a.d.location=a.j.href));a.j=a.F=a.q=0};a.Ea=function(){a.b=a.d.body;a.b?(a.p=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.qa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",
a.p,!1);else{a.b.removeEventListener("click",a.p,!0);a.qa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.I&&a.I==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var m=a.I=a.clickObject;a.ea&&(clearTimeout(a.ea),a.ea=0);a.ea=setTimeout(function(){a.I==m&&(a.I=0)},1E4);f=a.wa();a.track();if(f<a.wa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&
e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.ya(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=
1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.j=c.target,a.F=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.p):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.qa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.p,!0)),a.b.addEventListener("click",a.p,!1))):setTimeout(a.Ea,30)};a.Ea()}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();

// End AppMeasurement

// Integrate Module

function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}

// End Integrate Module

//tealium universal tag - utag.sender.19063.am151 v4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1,'link':1,'video':1};
  u.o=s_gci;
  u.varlist={pageName:'pageName',channel:'ch',campaign:'v0',hier1:'h1',hier2:'h2',hier3:'h3',hier4:'h4'};for(var i=1;i<76;i++){u.varlist['prop'+i]='c'+i;u.varlist['eVar'+i]='v'+i};
  u.pushlt=function(l,v){if(typeof l!="undefined")l.push(v)};
  u.map={"ab_test_variant_success:":"event76","abtestslot":"eVar60","abteststring":"prop27,eVar61","aam_segs":"prop48","prop42_switch":"prop42","user_status":"prop49,eVar42","block_test":"prop58","cp.atyponid":"prop68,prop31","blogname":"prop2","byline":"prop71","category":"prop33","clickName":"prop41","clickPage":"prop64","contenttype":"prop16","cst":"prop35","cxense_response":"eVar64","dayofweek_omniture":"prop13,eVar78","events":"events","galleryindex":"prop45","gallerytitle":"prop43","gup_anonid":"prop62,eVar62","gup_personal_link":"eVar63","halfhour":"prop12","hostname":"prop8","keywords":"prop14","linkTrackVars":"linkTrackVars","marketName":"prop25","milestonetrack":"prop9","numPageViewsLeft":"prop72,eVar72","omniture_reportsuite":"s_account","pageName":"pageName,eVar4","partner":"prop66","percentage_page_viewed":"prop51","prevPageName":"prop52","refreshed":"prop36","searchkeywords":"prop46","section":"prop17,channel,hier4,eVar28","siteLabel":"prop26","ssts":"prop20,hier1","sssts":"hier2","subcategory":"prop34","subsection":"prop18","taxonomykeywords":"prop40","templatetype":"prop61","topic":"prop19","coreuserid":"eVar77","dom.url":"prop3,prop23,server,pageURL,eVar23","videoContentProvider":"eVar47","videoDuration":"prop22","videoincluded":"prop11","videoFulllengthUrl":"eVar13","videoName":"prop21","videoPlayerName":"prop10","viralVideoDomain":"prop47","videotranscript":"prop37","queryparamtrack":"campaign","formError":"prop38","platform":"prop4","uniqueuserid":"eVar19","productName":"prop7","browserPlatform":"prop1","headline":"prop44","linkTrackEvents":"linkTrackEvents","user_zip":"prop73","user_age":"prop74","user_gender":"prop75","originatingMarket":"prop50"};
  u.extend=[function(a,b){
//return ((/subscribe./).test(document.location.host)||(/account./).test(document.location.host)) ? false:true;
// Only configure for non-production
if((/subscribe/).test(document.location.host) || (/account/).test(document.location.host) && utag.cfg.path.indexOf("/prod/") === -1 ) {
   b.linkTrackEvents = b['events'];
  b.linkTrackVars   = 'campaign,events,products,pageName,prop4,prop25,prop31,prop41,prop49,prop68';
} else {
  if(typeof(b.clickName) !== 'undefined' && typeof(b.linkTrackVars) === 'undefined' || b.linkTrackVars === '') {
    b.linkTrackEvents = 'None';
    b.linkTrackVars = 'prop41';
  } else if(typeof(b.clickName) !== 'undefined' && b.linkTrackVars === 'prop6') {
    b.linkTrackEvents = 'None';
    b.linkTrackVars   = 'pageName,prop4,prop25,prop41';
  }
}
/*
else if ((/subscribe/).test(document.location.host) || (/account/).test(document.location.host) && utag.cfg.path.indexOf("/prod/") !== -1 ) {
  return false;
} else {
  return true;
}
*/
},
function(a,b){
//dont include the analytics if variable is set to true
if (b.noinitialanalytics === "True") 
  return false;
},
function(a,b){
/* IMPORTANT: Scope "SiteCatalyst AppMeasurement for JS" is not a bug, it's an important feature 
*
* this extension needs to run in the SiteCatalyst context
* {monetize: true} will happen on link tracking
* which we do not want to treat as SiteCatalyst link tracking
*/

if (b.monetize) {
  ns_.max.run();
  return false;
}

},
function(a,b){
/* Get the host value from the domain and include it in the internal list of links */
if(window.location.hostname.split('.').length === 2) {
  s_gci.linkInternalFilters += ',' + window.location.hostname.split('.')[0];
} else if (window.location.hostname.split('.').length === 3) {
  s_gci.linkInternalFilters += ',' + window.location.hostname.split('.')[1];
}
/* get the markets own domain in the list of internal filters */
s_gci.linkInternalFilters += ',' + s_gci.trackingServer.split('.')[1];
},
function(a,b){
/*
 * Plugin: getTimeParting 3.4
https://marketing.adobe.com/resources/help/en_US/sc/implement/getTimeParting.html
 */
s_gci.getTimeParting=new Function("h","z",""
+"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
+"h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['"
+"Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda"
+"y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp"
+"DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea"
+"r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)"
+"{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT"
+"imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d"
+".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P"
+"M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(tm+'|'+D);}");
},
function(a,b){
 /*
 * Plugin: getPercentPageViewed v1.71
https://marketing.adobe.com/resources/help/en_US/sc/implement/getPercentPageViewed.html
 */
s_gci.getPercentPageViewed=new Function("n",""
+"var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load"
+"','unload','scroll','resize','zoom','keyup','mouseup','touchend','o"
+"rientationchange','pan'];W.s_Obj=s;s_PPVid=(n=='-'?s.pageName:n)||s"
+".pageName||location.href;if(!W.s_PPVevent){s.s_PPVg=function(n,r){v"
+"ar k='s_ppv',p=k+'l',c=s.c_r(n||r?k:p),a=c.indexOf(',')>-1?c.split("
+"',',10):[''],l=a.length,i;a[0]=unescape(a[0]);r=r||(n&&n!=a[0])||0;"
+"a.length=10;if(typeof a[0]!='string')a[0]='';for(i=1;i<10;i++)a[i]="
+"!r&&i<l?parseInt(a[i])||0:0;if(l<10||typeof a[9]!='string')a[9]='';"
+"if(r){s.c_w(p,c);s.c_w(k,'?')}return a};W.s_PPVevent=function(e){va"
+"r W=window,D=document,B=D.body,E=D.documentElement,S=window.screen|"
+"|0,Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='clientWid"
+"th',Hc='clientHeight',C=100,M=Math,J='object',N='number',s=W.s_Obj|"
+"|W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('on'))e=e.subs"
+"tring(2);s_PPVi=W.s_PPVi||0;if(W.s_PPVt&&!e){clearTimeout(s_PPVt);s"
+"_PPVt=0;if(s_PPVi<2)s_PPVi++}if(typeof s==J){var h=M.max(B[Hs]||E[H"
+"s],B[Ho]||E[Ho],B[Hc]||E[Hc]),X=W.innerWidth||E[Wc]||B[Wc]||0,Y=W.i"
+"nnerHeight||E[Hc]||B[Hc]||0,x=S?S.width:0,y=S?S.height:0,r=M.round("
+"C*(W.devicePixelRatio||1))/C,b=(D.pageYOffset||E[Ts]||B[Ts]||0)+Y,p"
+"=h>0&&b>0?M.round(C*b/h):0,O=W.orientation,o=!isNaN(O)?M.abs(o)%180"
+":Y>X?0:90,L=e=='load'||s_PPVi<1,a=s.s_PPVg(s_PPVid,L),V=function(i,"
+"v,f,n){i=parseInt(typeof a==J&&a.length>i?a[i]:'0')||0;v=typeof v!="
+"N?i:v;v=f||v>i?v:i;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iPod|i"
+"Pad|iPhone)').exec(navigator.userAgent||'')&&o){o=x;x=y;y=o}o=o?'P'"
+":'L';a[9]=L?'':a[9].substring(0,1);s.c_w('s_ppv',escape(W.s_PPVid)+"
+"','+V(1,p,L)+','+(L||!V(2)?p:V(2))+','+V(3,b,L,1)+','+X+','+Y+','+x"
+"+','+y+','+r+','+a[9]+(a[9]==o?'':o))}if(!W.s_PPVt&&e!='unload')W.s"
+"_PPVt=setTimeout(W.s_PPVevent,333)};for(var f=W.s_PPVevent,i=0;i<E."
+"length;i++)if(EL)EL(E[i],f,false);else if(AE)AE('on'+E[i],f);f()};v"
+"ar a=s.s_PPVg();return!n||n=='-'?a[1]:a");
},
function(a,b){ try{ if(1){try{b['percentage_page_viewed']=s_gci.getPercentPageViewed();}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['dayofweek_omniture']=s_gci.getTimeParting('d','-5',new Date().getFullYear())}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['halfhour_omniture']=s_ut.getTimeParting('h','-5',new Date().getFullYear())}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){
b['marketName'] = s_account.substr(0, s_account.indexOf(','))
},
function(a,b){
if (typeof stateManager!=="undefined") {
  var p = stateManager.getActivePageInfo().partner;
  if (p) {
    b["partner"]=p;
  }
}
},
function(a,b){
b["block_test"] = "false";
//div id of "maid_ad" added in DOM-Ready extension
var blockTest = document.getElementById('main_ad');
//if something removed the "main_ad" div altogether (blockTest==undefined), most likely ad-blocker installed, so report it
//offsetHeight of blockTest should be "1", if not, ad-blocking has changed it, so report it
if (!blockTest || blockTest.offsetHeight!=1) { b["block_test"] = "true"; }
},
function(a,b){
//use b["assetid"] if we're on GDP site, otherwise use b["user_status"]
//if stateManager exists, we're on GDP
if (typeof stateManager==="object" || b["assetid"]) {
  b["prop42_switch"]=b["assetid"];  
} else {
  b["prop42_switch"]=b["user_status"];
}
},
function(a,b){
/* if this is a subsciption sale, then parse the "products" var into
the e-commerce Tealium vars. Tealium will use these vars for the SiteCatalyst
e-commerce mappings. */
if (b["products"]) {
  //products gets passed from SAM as such: ";product_id;product_quantity;product_price;"
  //split products into an array
  var prod_split = b["products"].split(";");
  //assign each piece of the array to its proper Data Layer vars:
  b["product_id"] = b["_cprod"][0] = prod_split[1];
  b["product_quantity"] = b["_cquan"][0] =  prod_split[2];
  b["product_unit_price"] = b["_cprice"][0] = prod_split[3];
}
},
function(a,b){ try{ if(typeof b['user_util_personal_link']!='undefined'){b['gup_personal_link']=b['user_util_personal_link']} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){b['division']='newspaper'} } catch(e){ utag.DB(e) }  },
function(a,b){
// if event3 is not in the event list then add it
if(!b['events'].match(/event3/) && a !== 'link') {
  b['events'] = b['events'] + ',event3';
}
},
function(a,b){ try{ if(typeof b['hostname']=='undefined'){try{b['hostname']=document.location.hostname}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['siteLabel']=='undefined'){b['siteLabel']='reimagine'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['dom.url']=='undefined'){try{b['dom.url']=document.URL}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['headline']=='undefined'){try{b['headline']=b['dom.title']}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['marketName']=='undefined'||typeof b['marketName']!='undefined'&&b['marketName']==''){try{b['marketName']=s_account.substr(0, s_account.indexOf(','))}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['events']!='undefined'){try{b['sc_events']=u.addEvent(b.events.split(','));}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){
// This loops over the utag_data object to populate the Omniture Context Variable
for(var p in b) {
  if ( b.hasOwnProperty(p) ) {
    s_gci.contextData[p] = b[p];
  }
}
},
function(a,b){
try{
   var _domain = (function () {
          var domainSplit = document.domain.split('.'),
	      l = domainSplit.length;
          return domainSplit[l - 2];
       })()
       if (_domain ==="usatoday")
	 _domain = 'usat';
   b['pageName']=(_domain+' :'+(b.pathName|| document.location.pathname || '/'));
   b['prevPageName']=b.prevpath && (_domain+':'+b.prevpath);
    }
 catch(e){}
},
function(a,b){
if(typeof b.embedded !== 'undefined') {
  if(a === "view" && b.embedded.toLowerCase() === 'true') { return false; }
}
},
function(a,b){
if( typeof(b.atypon_license_type) === 'undefined') {
  b.user_status = b.atypon_license_type.split("LICENSE_TYPE_")[1].toLowerCase();
}
},
function(a,b){
b.user_zip = ( typeof(b.atypon_zip) !== 'undefined' && b.atypon_zip !== '') ? b.atypon_zip : "no-data";
b.user_age = ( typeof(b.atypon_age) !== 'undefined' && b.atypon_age !== '') ? b.atypon_age : "no-data";
b.user_gender = ( typeof(b.atypon_gender) !== 'undefined' && b.atypon_gender !== '') ? b.atypon_gender : "no-data";
},
function(a,b){
if ((/nextauto/).test(b.clickName)) {
   return false;
   }
}];

  u.send=function(a,b,c,d,e,f,g,h,ev){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      utag.DB("send:2722");
      u.data={};
      u.a=a;
      b.sc_events=b.sc_events||{};

      u.addEvent = function (v, n) {
        var t = [];
        if (v instanceof Array) {
          t = v.slice(0);
        } else if (typeof n !== "undefined") {
          t.push(v + "=" + n);
        } else {
          t.push(v);
        }
        for (var i = 0; i < t.length; i++) {
          b.sc_events[t[i]] = 1;
          u.pushlt(u.lte, t[i].indexOf("=") > -1 ? t[i].split('=')[0] : t[i].split(':')[0]);
        }
        return b.sc_events;
      };

      u.addProduct = function (v) {
        u.data.sc_addProd = "";
        if (v instanceof Array) {
          u.data.sc_addProd = v.join(',');
        } else {
          u.data.sc_addProd = v;
        }
      };

      if (u.a === "link") {
        u.ltflag = true;
        if (typeof b.linkTrackVars === "undefined") { u.ltv = []; }
        if (typeof b.linkTrackEvents === "undefined") { u.lte = []; }
      }

      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};

      for (e in utag.loader.GV(u.map)) {
        if (typeof b[e] != "undefined" && typeof u.map[e] == "string" && u.map[e].indexOf("PRODUCTS_") > -1) {
          f = u.map[e].split(",");
          for (g = 0; g < f.length; g++) {
            if(f[g].indexOf("PRODUCTS_id") || f[g].indexOf("PRODUCTS_category") || f[g].indexOf("PRODUCTS_quantity") || f[g].indexOf("PRODUCTS_price")){
              u.data[f[g].substring(9)]=b[e];
            }
          }
        }
      }
      u.data.id = u.data.id || (typeof b._cprod != "undefined" ? b._cprod.slice(0) : []);
      u.data.category = u.data.category || (typeof b._ccat != "undefined" ? b._ccat.slice(0) : []);
      u.data.quantity = u.data.quantity || (typeof b._cquan != "undefined" ? b._cquan.slice(0) : []);
      u.data.price = u.data.price || (typeof b._cprice != "undefined" ? b._cprice.slice(0) : []);
      if(typeof u.data.id!="undefined"&&u.data.id!=""){
        c=[];d={};ev={};for(e in utag.loader.GV(u.map)){if(typeof b[e]!="undefined"&&typeof u.map[e]=="string"&&u.map[e].indexOf("PRODUCTS_")>-1){f=u.map[e].split(",");for( g=0;g<f.length;g++){
          var pv = f[g].substring(9);
          if(f[g].indexOf("PRODUCTS_evar")==0 || f[g].indexOf("PRODUCTS_eVar")==0){
            if (b[e] instanceof Array) {
              b.sc_prodevars = b.sc_prodevars || [];
              for (var i = 0; i < b[e].length; i++) {
                var prodvars = {};
                if(typeof b.sc_prodevars[i]!="undefined" && b.sc_prodevars[i]!=""){
                  b.sc_prodevars[i][pv]=b[e][i];
                }else{
                  prodvars[pv]=b[e][i];
                  b.sc_prodevars.push(prodvars);
                }
              }
            }else{
              d[pv] = (b[e]+"").split(",");
            }
          }else if(f[g].indexOf("PRODUCTS_event")==0){
            if(b[e] instanceof Array){
              b.sc_prodevents=b.sc_prodevents || [];
              for (var i = 0; i < b[e].length; i++) {
                var prodevents = {};
                if(typeof b.sc_prodevents[i]!="undefined" && b.sc_prodevents[i]!=""){
                  b.sc_prodevents[i][pv]=b[e][i];
                }else{
                  prodevents[pv]=b[e][i];
                  b.sc_prodevents.push(prodevents);
                }
              }
              u.addEvent(pv);
            }else if (b[e] !== ""){
              ev[pv]=b[e];
              u.addEvent(pv);
            }
          }
        }}}
        e="";for(f in utag.loader.GV(d)){for(g=0;g<d[f].length;g++){if(e!="")e+="|"+f+"="+d[f][g];else e=f+"="+d[f][g];}}
        h="";for(f in utag.loader.GV(ev)){if(h)h+="|"+f+"="+((isNaN(ev[f]))?"1":ev[f]);else h=f+"="+((isNaN(ev[f]))?"1":ev[f]);}
        b.sc_prodevents=b.sc_prodevents||[];
        b.sc_prodevars=b.sc_prodevars || [];
        for(d=0;d<u.data.id.length;d++){
          var h2=h;
          var h3=e;
          if(typeof b.sc_prodevents!="undefined"){
            for (f in b.sc_prodevents[d]) {
              if(typeof b.sc_prodevents[d][f]!="undefined"){
                var l =b.sc_prodevents[d][f];
                if(typeof l!="undefined" && l!="" && isNaN(l)==false){
                  if (h2){
                    h2 += "|" + f + '=' + l;
                  }else{
                    h2 = f + '=' + l;
                  }
                }
              }
            }
          }
          if(typeof b.sc_prodevars!="undefined"){
            for (f in b.sc_prodevars[d]) {
              if(typeof b.sc_prodevars[d][f]!="undefined"){
                var l =b.sc_prodevars[d][f];
                if(typeof l!="undefined" && l!=""){
                  if (h3){
                    h3 += "|" + f + '=' + l;
                  }else{
                    h3 = f + '=' + l;
                  }
                }
              }
            }
          }
          c.push((u.data.category[d]?u.data.category[d]:"")+";"+u.data.id[d]+";"+(u.data.quantity[d]?u.data.quantity[d]:"")+";"+(u.data.price[d]?((u.data.quantity[d]?parseInt(u.data.quantity[d]):1)*parseFloat(u.data.price[d])).toFixed(2):"")+";"+h2+";"+h3);
        }
        if (typeof u.data.sc_addProd !== "undefined" && u.data.sc_addProd) {
          c.push(u.data.sc_addProd);
        }
        u.o.products=c.join(",");
      } else {
        u.o.products = "";
      }

      // Mapping would be b.event_name ==> "prod:event3,click:event4"
      // Data layer variable b.event_name will contain "prod,click" and trigger both event3,event4
      // To serialize, this would be "prod:12345,click"
      var evt=/^event|prodView|scOpen|scAdd|scRemove|scView|scCheckout|purchase$/;
      for(c in utag.loader.GV(b)){
        if(b[c] !== ""){
          f=(""+b[c]).split(","); 
          for(g=0;g<f.length;g++){
            h=f[g].split(":");
            d=[];
            if(typeof u.map[c+":"+h[0]]!="undefined"){
              d=u.map[c+":"+h[0]].split(",");
            }else if(typeof u.map[c]!="undefined"){
              d=u.map[c].split(",");
            }
            for(e=0;e<d.length;e++){if(d[e]!="events"&&evt.test(d[e])){
              u.addEvent(d[e]+(h.length>1?":"+h[1]:""));
            }}
          }
        }
      }

      for(c in utag.loader.GV(b)){if(typeof u.map[c]!="undefined"){d=u.map[c].split(",");for(e=0;e<d.length;e++){
        if(d[e]=="doneAction"){
          b.doneAction=b[c];
          if(b.doneAction!="navigate"){
            b.doneAction=eval(b[c]);
          }
        }else if(d[e].indexOf("c.") == 0 || d[e].indexOf("contextData.") == 0){
          d[e]=d[e].replace("contextData.", "c.");
          u.o.contextData[d[e].substring(2)] = b[c];
          u.pushlt(u.ltv,"contextData."+d[e].substring(2))
        }else{
          if(c=="sc_events" || c=="sc_prodevents" || c=="sc_prodevars"){
            utag.DB("Error:2722: Mapping reserved object name " + c)
          }else{
            u.o[d[e]]=b[c];
          }
          // if linkTrackVars is mapped then turn off auto-generation of linkTrackVars
          if(d[e]=="s_account"){
            u.o.account=b[c];
          }else if(d[e]=="linkTrackVars"){
            u.ltflag=false;
          }else{
             u.pushlt(u.ltv,d[e]);
          }
        }
      }}}
      d=[];for(c in utag.loader.GV(b.sc_events)){if(b.sc_events[c])d.push(c)};
      if(d.length>0){
        u.o.events=d.join(",");
        u.pushlt(u.lte,u.o.events);
      } else {
        u.o.events = "";
      }

      if(b._ccurrency){
        u.o.currencyCode=b._ccurrency;
      }

      if(b._corder){
        u.pushlt(u.lte,"purchase");
        u.pushlt(u.ltv,"purchaseID");
        u.o.purchaseID=((u.o.purchaseID)?u.o.purchaseID:b._corder);
        u.o.events=((u.o.events)?u.o.events:"purchase");
        if(u.o.events.indexOf("purchase")<0){u.o.events+=",purchase"};
      }

      /* variable compression */
      // for link tracking don't do var compression because it's not taking into account linkTrackVars
      if(u.a !== 'link') {
      	var t=u.o;var q={},l={};c=u.varlist;
	      for(d in utag.loader.GV(c)){
	        

	        if(typeof t[d]!='undefined' && t[d]!=null && t[d]!='' && t[d].toString().indexOf('D=')!=0)
	        {
	        	if(typeof l[t[d]]=='undefined') {
	        		l[t[d]]=c[d];
	        	}
	        	else{
	        	 	t[d]='D='+l[t[d]];
	        	}
	        }
	      }
      }
      

      if(u.a=="view"){
        var img = u.o.t();
        /* still track on user agents Adobe cannot detect */
        if(typeof img!="undefined" && img!=""){
          u.img=new Image();u.img.src=img.substring(img.indexOf("src=")+5,img.indexOf("width=")-2);
        }
      }else if(u.a=="link"){
        if(typeof u.ltv!="undefined" && u.ltflag){
          if(u.o.events){u.ltv.push("events")};
          if(u.o.products){u.ltv.push("products")};
          b.linkTrackVars=u.ltv.join(',')
        }
        if(typeof u.lte!="undefined" && u.ltflag)b.linkTrackEvents=u.lte.join(',');
        u.o.linkTrackVars = (b.linkTrackVars)?b.linkTrackVars:"None";
        u.o.linkTrackEvents = (b.linkTrackEvents)?b.linkTrackEvents:"None";

        if(!u.o.linkType)u.o.linkType='o';
        if(b.link_name)b.link_text=b.link_name;
        b.link_text=(b.link_text)?b.link_text:"no link_name";
        if(b.link_type=='exit link'){u.o.linkType='e'}
        else if(b.link_type=='download link')u.o.linkType='d';

        u.o.tl(((b.link_obj)?b.link_obj:true),u.o.linkType,b.link_text,null,(b.doneAction?b.doneAction:null));
      }

      /* clear variables */
      if("no"=="yes"){
        u.o.clearVars();
        u.o.contextData = {};
      }

      utag.DB("send:2722:COMPLETE");
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('2722','gci.desmoinesregister');
}catch(e){};
//end tealium universal tag


//~~tv:6026.20160119
//~~tc: Updates include:
//      Fix logic for auto add of Purchase event
//      Default event logic update for UI "selected" issue


//tealium universal tag - utag.sender.6026 ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf
    // Start Tealium Merge
    if (utag.ut.merge === undefined) {u.merge = function(a, b, c, d) {if(c){for(d in utag.loader.GV(b)){a[d] = b[d];}}else{for(d in utag.loader.GV(b)){if(typeof a[d]=="undefined"){a[d] = b[d];}}}};} else { u.merge = utag.ut.merge; }
    // End tealium Merge

    u.ev = {"view" : 1, "link" : 1};
    u.initialized = false;
    u.scriptrequested = false;
    u.queue = [];
    u.event_lookup = {
      "ViewContent" : {obj: "vc", "map" :             ["value","currency","content_name","content_ids","content_category"]},
      "Search" : {obj: "search", "map" :              ["value","currency","content_category","content_ids"]},
      "AddToCart" : {obj: "cart", "map" :             ["value","currency","content_name","content_ids"]},
      "AddToWishlist" : {obj: "wish", "map" :         ["value","currency","content_name","content_ids"]},
      "InitiateCheckout" : {obj: "cout", "map" :      ["value","currency","content_name","content_ids","num_items"]},
      "AddPaymentInfo" : {obj: "payment", "map" :     ["value","currency","content_category","content_ids"]},
      "Purchase" : {obj: "purch", "map" :             ["value","currency","content_name","content_ids","num_items"]},
      "Lead" : {obj: "lead", "map" :                  ["value","currency","content_name","content_category"]},
      "CompleteRegistration" : {obj: "reg", "map" :   ["value","currency","content_name"]},
      "Conversion" : {obj: "cnv", "map" :             ["value","currency"]},
      "Custom" : {obj: "cust", "map" : []},
      "PageView" : {obj: "page", "map" : []}
    };
    u.std_params = {
      "value" : function(g, event){
        if (g.value === undefined || g.value === "") {
          if (event === "ViewContent" || event === "AddToCart") {
            g.value = u.data.ecom.product_unit_price;
          } else {
            g.value = u.data.ecom.order_subtotal;
          }
        }
        g.value = u.val(g.value);
      },
      "currency" : function(g) {
        if (!g.currency) {g.currency = u.data.ecom.order_currency;}
      },
      "content_name" : function(g){
        if (!g.content_name) {g.content_name = u.data.ecom.product_name;}
        g.content_name = u.val(g.content_name);
      },
      "content_ids" : function(g){
        if (!g.content_ids) {g.content_ids = u.data.ecom.product_id;}
        if (u.typeOf(g.content_ids) !== "array") {
          g.content_ids = g.content_ids.split(/\s*,\s*/);
        }
      },
      "content_category" : function(g){
        if (!g.content_category) {g.content_category = u.data.ecom.product_category;}
        g.content_category = u.val(g.content_category);
      },
      "num_items" : function(g) {
        if (!g.num_items && u.data.calc_items === "true") {g.num_items = u.calc_items(u.data.ecom.product_quantity);}
      }
    };
    u.map_func = function(arr, obj, item) {
      var i = arr.shift();
      obj[i] = obj[i] || {};
      if (arr.length > 0) {
        u.map_func(arr,obj[i], item);
      } else {
        obj[i] = item;
      }
    };

    u.val = function(value){
      return u.typeOf(value) === "array" ? value[0] : value;
    };
    u.remove_empty = function(a) {
      var b, t;
      for (b in utag.loader.GV(a)) {
        t = u.typeOf(a[b]);
        if (t === "object") {
          u.remove_empty(a[b]);
          if (u.isEmptyObject(a[b])) {
            try {delete a[b];} catch(e) {a[b]=undefined;}
          }
        } else if (!((a[b] === 0 || a[b] === false) ? !0 : (t === "array" && a[b].length === 0) ? !1 : !!a[b])){
          try {delete a[b];} catch(e) {a[b]=undefined;}
        }
      }
      return a;
    };
    u.calc_items = function(quan) {
      var q, i = 0;
      for (q = 0; q < quan.length; q++) {
        i += parseInt(quan[q]);
      }
      return i;
    };

      u.map={};
  u.extend=[];


    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f, g, h, evt = [];

        u.data = {
          //##UTVARconfig_<id from config>##
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "base_url" : "//connect.facebook.net/en_US/fbevents.js",
          "cust_pixel" : "404828539707524",
          "conv_pixel" : "2.0",
          "page_view" : "true",
          "calc_items" : "true",
          "default_event" : "None",
          "custom_data" : {},
          "custom_event" : "",
          // E-Commerce Vars
          "product_id" : [],
          "product_name" : [],
          "product_category" : [],
          "product_unit_price" : [],
          "product_quantity" : [],
          "evt_list" : [],
          "ecom" : {}
        };

        // Start tag-scoped extensions
      
        // End tag-scoped extensions

        c = [];

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.map_func(e[f].split("."), u.data, b[d]);
            }
          } else {
            h = d.split(":");
            if(h.length === 2 && b[h[0]] === h[1]){
              if(u.map[d]){
                evt = evt.concat(u.map[d].split(","));
              }
            }
          }
        }
        // End Mapping

        //Convert evt_list into an array, if passed as a csv
        if(u.data.evt_list && u.typeOf(u.data.evt_list) !== "array") {
            u.data.evt_list = u.data.evt_list.split(/\s*,\s*/);
        }

        if (u.data.default_event !== "None" && u.data.default_event !== "") {
          u.data.evt_list.push(u.data.default_event);
        }
        u.data.evt_list = u.data.evt_list.concat(evt);
        //u.data.evt_list = u.data.evt_list || b._cevent || "";

        // Pull E-Commerce extension values
        // Mappings override E-Commerce extension values
        g = u.data.ecom;
        g.order_id = u.data.order_id || b._corder || "";
        g.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
        g.order_currency = u.data.order_currency || b._ccurrency || "";
        if (u.data.product_name.length === 0 && b._cprodname !== undefined) { g.product_name = b._cprodname.slice(0); } else { g.product_name = u.data.product_name; }
        if (u.data.product_id.length === 0 && b._cprod !== undefined) { g.product_id = b._cprod.slice(0); }  else { g.product_id = u.data.product_id; }
        if (u.data.product_category.length === 0 && b._ccat !== undefined) { g.product_category = b._ccat.slice(0); }  else { g.product_category = u.data.product_category; }
        if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) { g.product_unit_price = b._cprice.slice(0); } else { g.product_unit_price = u.data.product_unit_price; }
        if (u.data.product_quantity.length === 0 && b._cquan !== undefined) { g.product_quantity = b._cquan.slice(0); } else { g.product_quantity = u.data.product_quantity; }


        // Start Loader Callback
        u.loader_cb = function () {
          var g = {}, i,j, _event, _track = "track";

          if (u.data.evt_list.toString().indexOf("Purchase") === -1 && u.data.ecom.order_id) {
            u.data.evt_list.push("Purchase");
          }

          for (i = 0; i < u.data.evt_list.length; i++) {
            _event = u.data.evt_list[i];

            f = u.event_lookup[_event];

            c = f ? f.map : [];
            f = f ? f.obj : _event;

            g = u.data[f] = u.data[f] || {};

            for (j = 0; j < c.length; j++) {
              u.std_params[c[j]](g,_event);
            }

            if (_event === "ViewContent" || _event === "AddToCart" ) {
              //If items aren't present revert to E-Commerce data
              //if (!g.content_type) {g.content_type ='product';}
              /*
               Either 'product' or 'product_group' based on the content_ids being passed.
               If the ids being passed in content_ids parameter are ids of products then the value should be 'product'.
               If product group ids are being passed, then the value should be 'product_group'.
               */

            } else if (_event === "Lead") {
              //If items aren't present revert to E-Commerce data
              if (!g.content_category) {g.content_category ='Quote';}

            } else if (_event === "Search") {
              //If items aren't present revert to E-Commerce data
              if (!g.content_category) {g.content_category ='Product Search';}

            } else if (_event === "Conversion" && u.data.conv_pixel) {
              _event = u.data.conv_pixel;
            } else if (_event && !u.event_lookup[_event]) {
              _track = "trackCustom";
              g = u.data[_event];
            }

            if (g.value !== undefined) {
              if(u.typeOf(g.value) === "array") {
                for (j = 0; j < g.value.length; j++) {
                  g.value[j] = parseFloat(g.value[j]) || 0.00;
                }
              } else {
                g.value = parseFloat(g.value) || 0.00;
              }
            }

            if (_event) {
              fbq(_track,_event, u.remove_empty(g));
            }
          }

        };
        // End Loader Callback

        u.callBack = function () {
          var data = {};
          u.initialized = true;
          while (data = u.queue.shift()) {
            u.data = data.data;
            u.loader_cb();
          }
        };

        if (u.initialized) {
          u.loader_cb();
        } else {
          u.queue.push({"data" : u.data});
          if (!u.scriptrequested) {
            u.scriptrequested = true;
            u.loader({"type": "script",  "src": u.data.base_url, "cb": u.callBack, "loc": "script", "id": 'utag_2829'});
            //FB PreLoad Code
            !function (f, b, e) {
              if (f.fbq)return;e = f.fbq = function () {e.callMethod ? e.callMethod.apply(e, arguments) : e.queue.push(arguments);};
              if (!f._fbq)f._fbq = e;e.push = e;e.loaded = !0;e.version = '2.0';e.queue = [];e.agent='tlm';
            }(window, document);

            if (u.data.cust_pixel) {
              //fbq('init', u.data.cust_pixel);

              u.data.cust_pixel = u.data.cust_pixel.split(/\s*,\s*/);
              for (var i = 0; i < u.data.cust_pixel.length; i++) {
                u.data.cust_pixel[i] = u.data.cust_pixel[i].replace(/^\s*/,"").replace(/\s*$/,"");
                fbq('init', u.data.cust_pixel[i]);
              }

              if (u.data.page_view === "true") {
                fbq('track', 'PageView', u.data.page);
              }
            }
          }
        }

        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("2829", "gci.desmoinesregister"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

//~~tv:20010.20140827
//~~tc: Tealium Custom Container

/*
  Tealium Custom Container Notes:
  - Add sending code between "Start Tag Sending Code" and "End Tag Sending Code".
  - Add JavaScript tag library code between "Start Tag Library Code" and "End Tag Library Code".
  - Add JavaScript code only, do not add HTML code in this file.
  - Remove any <script> and </script> tags from the code you place in this file.

  Loading external JavaScript files (Loader):
  - If you need to load an additional external JavaScript file, un-comment the singe-line JavaScript comments ("//") within the following Loader sections near the bottom of this file:
      - "Start Loader Function Call"
      - "End Loader Function Call"
      - "Start Loader Callback Function"
      - "End Loader Callback Function"
  - After un-commenting, insert the path to the external JavaScript file you want to load.
  - Finally, within the Loader callback function, insert the JavaScript code that should run after the external JavaScript file has loaded.
*/

/* Start Tag Library Code */
/* End Tag Library Code */

//tealium universal tag - utag.sender.custom_container ut4.0.201607152143, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Start Tealium loader 4.32
    // Please do not modify
    if (utag === undefined) { utag = {}; } if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState === "complete" || this.readyState === "loaded") { this.onreadystatechange = null; o.cb(); } }; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {'view' : 1};

    u.initialized = false;

      u.map={};
  u.extend=[];


    u.send = function(a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f, i;

        u.data = {
          /* Initialize default tag parameter values here */
          /* Examples: */
          /* "account_id" : "1234567" */
          /* "base_url" : "//insert.your.javascript.library.url.here.js" */
          /* A value mapped to "account_id" or "base_url" in TiQ will replace these default values. */
        };


        /* Start Tag-Scoped Extensions Code */
        /* Please Do Not Edit This Section */
        
        /* End Tag-Scoped Extensions Code */


        /* Start Mapping Code */
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];
            }
          }
        }
        /* End Mapping Code */


        /* Start Tag Sending Code */

          // Insert your tag sending code here.
window.setAdblockerCookie = function(adblocker) { 
var d = new Date(); 
d.setTime(d.getTime() + 60 * 60 * 24 * 30 * 1000); 
document.cookie= "__adblocker=" + (adblocker ? "true" : "false") + "; expires=" + d.toUTCString() + ";path=/"; 

} 

var script = document.createElement("script"); 
script.setAttribute("async", true); 
script.setAttribute("src","//www.npttech.com/advertising.js"); 
script.setAttribute("onerror","setAdblockerCookie(true);"); 
script.setAttribute("onload","setAdblockerCookie(false);"); 
document.getElementsByTagName("head")[0].appendChild(script);           

        /* End Tag Sending Code */


        /* Start Loader Callback Function */
        /* Un-comment the single-line JavaScript comments ("//") to use this Loader callback function. */

        //u.loader_cb = function () {
          //u.initialized = true;
          /* Start Loader Callback Tag Sending Code */

            // Insert your post-Loader tag sending code here.

          /* End Loader Callback Tag Sending Code */
        //};

        /* End Loader Callback Function */


        /* Start Loader Function Call */
        /* Un-comment the single-line JavaScript comments ("//") to use Loader. */

          //if (!u.initialized) {
            //u.loader({"type" : "iframe", "src" : u.data.base_url + c.join(u.data.qsp_delim), "cb" : u.loader_cb, "loc" : "body", "id" : 'utag_2938' });
            //u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_2938' });
          //} else {
            //u.loader_cb();
          //}

          //u.loader({"type" : "img", "src" : u.data.base_url + c.join(u.data.qsp_delim) });

        /* End Loader Function Call */


        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })("2938", "gci.desmoinesregister");
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

if(typeof utag!='undefined'){utag.initcatch=true;for(var i in utag.loader.GV(utag.loader.cfg)){var b=utag.loader.cfg[i];if(b.load!=4){utag.initcatch=false;break};if(b.wait==1){utag.initcatch=false;break}};if(utag.initcatch)utag.handler.INIT();}