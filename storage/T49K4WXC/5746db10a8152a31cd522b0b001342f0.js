Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.npg=Bootstrapper.npg||{};Bootstrapper.npg.webtrendsRules=Bootstrapper.npg.webtrendsRules||[];Bootstrapper.npg.webtrendsRules.push(function(params,next){var utils=Bootstrapper.npg.utils,req=utils.Request,dcsvid=req.get("WT.i_dcsvid"),ecid=req.get("WT.ec_id");if(dcsvid)req.cookie("WT.i_dcsvid",dcsvid,{path:"/",days:365,domain:".nature.com"});if(ecid)req.cookie("WT.ec_id",
ecid,{path:"/",domain:".nature.com"});params.mc_id=req.get("text")||req.get("WT.mc_id")||"";params.i_dcsvid=dcsvid||req.cookie("WT.i_dcsvid")||"";params.ec_id=ecid||req.cookie("WT.ec_id")||"";utils.onJqueryDefined(function($){var $ss,mob;if($){$ss=$("#smaller-screen, #mob-ss, #mobile-css-test");mob=$ss.length&&($ss.is(":visible")||$ss.css("display").toLowerCase()==="block")}else mob=false;params.z_css=mob?"mobile":"desktop";next(params)})})},484785,259523);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){try{return Bootstrapper.data.extract("citation_journal_title","meta")}catch(e){return""}},transform:function(v){return v},load:"",dataDefName:"journal_title",collection:"article_data",source:"Manage",priv:"false"},{id:"1855"})},1855)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){try{return Bootstrapper.data.extract("WT.site_id","meta")}catch(e){return""}},transform:function(v){return v},load:"",dataDefName:"site_id",collection:"article_data",source:"Manage",priv:"false"},{id:"1905"})},1905)},-1,-1);
Bootstrapper.bindImmediate(function(){var Bootstrapper=window["Bootstrapper"];var ensightenOptions=Bootstrapper.ensightenOptions;Bootstrapper.registerDataDefinition(function(){Bootstrapper.data.define({extract:function(){var ext=Bootstrapper.data.extract;try{return ext("access","meta")||ext("Access","meta")}catch(e){return""}},transform:function(v){return v},load:"",dataDefName:"access",collection:"article_data",source:"Manage",priv:"false"},{id:"1853"})},1853)},-1,-1);