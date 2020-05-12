/*!CK:3149029692!*//*1454265577,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["NDAwh"]); }

__d("ActorSelectorNuxTypes",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports={COMPOSER:"composer_seen_count",COMPOSER_COVERED:"composer_covered_seen_count",M_COMPOSER:"m_composer_seen_count",M_UFI:"m_ufi_seen_count",UFI:"ufi_seen_count",UFI_TIMELINE:"ufi_timeline_seen_count",UFI_TIMELINE_COVERED:"ufi_timeline_covered_seen_count"};},null);
__d("BusinessConf",[],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports={DOMAIN:"business",HOSTNAME:"business.facebook.com",BIZ_ID_PARAM_NAME:"business_id",LABEL_ID_PARAM_NAME:"project_id",ACCOUNT_ID_PARAM_NAME:"act",ACCOUNT_ID_PARAM_NAME_LONG:"account_id",ACCOUNT_IDS_PARAM_NAME_LONG:"account_ids",ACCOUNT_ID_CATEGORY_NAME:"cat",PAGE_ID_PARAM_NAME:"id",PAGE_ADMIN_SELECTED_KEY:"sk",PRODUCT_CATALOG_ID_PARAM_NAME:"catalog_id",PRODUCT_FEED_ID_PARAM_NAME:"feed_id",LEGACY_ADS_MANAGER_PREFIX:"\/ads\/manage\/",CAMPAIGN_MANAGER_PREFIX:"\/ads\/manager\/",SAM_PREFIX:"\/ads\/management\/",AUDIENCE_INSIGHTS_PREFIX:"\/ads\/audience_insights\/",SHOW_ADD_PRODUCT_FEED_DIALOG:"add_feed",SHOW_SPLASH_PARAM_NAME:"splash",SHOW_GRAY_MIGRATE_COMPLETE_SPLASH_PARAM_NAME:"migrate",ASSET_ID_PARAM_NAME:"asset_id",COMMENT_ID_PARAM_NAME:"comment_id",WHITELISTED_URI_CLASS:"bizOK",OPT_OUT_KEY:"do_not_redirect_to_biz_site",GRAY_MIGRATE_KEY:"tried_to_migrate_from_gray_account",HIDE_OPT_OUT_KEY:"hide_opt_out",HIDE_HOME_V3_SPLASH_KEY:"hide_home_v3_splash",SEARCH_NUX_KEY:"search_nux",FAVORITES_NUX_KEY:"favorites_nux",CAKE_NUX_IS_OPTED_OUT:"1",DPA_TD_WELCOME_NUX_KEY:"dpa_td_welcome_nux",BUSINESS_UNIFIED_CHROME:"business_unified_chrome",DPA_TD_WELCOME_NUX_ID:3918,OPT_OUT_EXPIRE:259200,HIGHLANDER_OPT_OUT_KEY:"use_biz_page_in_highlander"};},null);
__d('BusinessAssetGrouping.brands',['emptyFunction','fbt','invariant','getObjectValues'],function a(b,c,d,e,f,g,h,i,j,k){'use strict';if(c.__markCompiled)c.__markCompiled();var l=i._("Personal"),m='personal-business',n={NULL_BIZ_ID:m,DEFAULT_NON_BIZ_NAME:l,groupAssets:function(v,w,x,y,z,aa,ba){y=y||s;z=z||h.thatReturnsTrue;var ca=o(v,w),da=ca.businessesByID;da[m]={id:m,name:aa||l};var ea=p(ca.assetsByBizID,da,x),fa=t(k(ea),r);if(ba&&fa[0].bizID===m)fa.shift();var ga=[],ha={};for(var ia=0;ia<fa.length;ia++){var ja=fa[ia];!ja?j(0):undefined;var ka=false;ja.assets=t(ja.assets,y);ja.assets=u(ja.assets,z,ja.bizID);if(ja.assets.length!==0){ga=ga.concat(ja.assets);ka=true;}ja.projects=t(k(ja.projectsByID),q);delete ja.projectsByID;for(var la=0;la<ja.projects.length;la++){var ma=ja.projects[la];!ma?j(0):undefined;ma.assets=t(ma.assets,y);ma.assets=u(ma.assets,z,ja.bizID);if(ma.assets.length!==0){ga=ga.concat(ma.assets);ka=true;}}if(!ka)fa[ia]=ha;}fa=fa.filter(function(na){return na!==ha;});return {businessesByID:da,groupedAssets:fa,assets:ga};}};function o(v,w){var x={},y={};for(var z=0;z<v.length;z++){var aa=v[z],ba=w(aa);if(!ba||ba.length===0){x[m]?x[m].push(aa):x[m]=[aa];continue;}for(var ca=0;ca<ba.length;ca++){var da=ba[ca],ea;if(da.business){ea=da.business.id;y[ea]=da.business;}else ea=m;if(x[ea]){x[ea].push(aa);}else x[ea]=[aa];}}return {assetsByBizID:x,businessesByID:y};}function p(v,w,x){var y={},z;for(var aa in v){z=v[aa];y[aa]=y[aa]||{bizID:aa,name:w[aa].name,projectsByID:{},assets:[]};for(var ba=0;ba<z.length;ba++){var ca=z[ba],da=x(ca),ea=false;if(aa!==m&&da&&da.length>0)for(var fa=0;fa<da.length;fa++){var ga=da[fa];if(ga.business&&ga.business.id!==aa)continue;var ha=y[aa].projectsByID;ha[ga.id]=ha[ga.id]||{projectID:ga.id,name:w[aa].name+" - "+ga.name,assets:[]};ha[ga.id].assets.push(ca);ea=true;}if(!ea)y[aa].assets.push(ca);}}return y;}function q(v){return (v.name||"").toUpperCase();}function r(v){if(v.bizID===m)return String.fromCharCode(0);return v.name;}function s(v){return v.name?v.name:v.id;}function t(v,w){var x=v.slice(0),y=false;v.sort(function(z,aa){var ba=w(z),ca=w(aa);if(ba>ca){y=true;return 1;}else if(ba<ca){y=true;return -1;}else return 0;});return y?v:x;}function u(v,w,x){return v.filter(function(y){return w(y,x);});}f.exports=n;},null);
__d('BizSiteIdentifier.brands',['BusinessConf','BusinessAssetGrouping.brands','URI'],function a(b,c,d,e,f,g,h,i,j){if(c.__markCompiled)c.__markCompiled();var k=i.NULL_BIZ_ID,l={isBizSite:function(){return j.getRequestURI(false).getSubdomain()===h.DOMAIN;},getBusinessID:function(){return j.getRequestURI(false).getQueryData()[h.BIZ_ID_PARAM_NAME];},createBusinessURL:function(m,n){if(n===k)return new j(m).setSubdomain('www');var o=new j(m).setSubdomain(h.DOMAIN);if(l.isBizSite())o.setDomain(j.getRequestURI().getDomain());var p=n||l.getBusinessID();o.addQueryData(h.BIZ_ID_PARAM_NAME,p);return o;}};f.exports=l;},null);
__d('AbstractPopoverButton.react',['React','URI','cx','joinClasses'],function a(b,c,d,e,f,g,h,i,j,k){if(c.__markCompiled)c.__markCompiled();var l=h.PropTypes,m=h.createClass({displayName:'AbstractPopoverButton',propTypes:{config:l.object.isRequired,haschevron:l.bool,maxwidth:l.number},getDefaultProps:function(){return {haschevron:true};},render:function(){var n=this.props.config,o={},p=n.defaultMaxWidth;if(typeof this.props.maxwidth!=='undefined')p=this.props.maxwidth;var q=null;if(p){var r=this.props.haschevron?p-n.chevronWidth:p;if(this.props.label)q={maxWidth:r+'px'};o.style=babelHelpers._extends({},n.button.props.style,{maxWidth:p+'px'});}o.image=null;var s=null;if(this.props.image&&this.props.label){s=h.cloneElement(this.props.image,{className:k(this.props.image.props.className,"_3-8_")});}else if(this.props.image)s=this.props.image;if(s||this.props.label)o.label=h.createElement('span',{className:"_55pe",style:q},s,this.props.label);if(this.props.haschevron)o.imageRight=n.chevron;o.className=k(n.button.props.className,"_2agf");o.href=new i('#');return h.cloneElement(n.button,o);}});f.exports=m;},null);
__d('XUIPopoverButton.react',['AbstractPopoverButton.react','Image.react','React','XUIButton.react','cx','ix','joinClasses'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n){if(c.__markCompiled)c.__markCompiled();var o=j.PropTypes,p=j.createClass({displayName:'ReactXUIPopoverButton',propTypes:{haschevron:o.bool,maxwidth:o.number},statics:{getButtonSize:function(q){return q.size||'medium';}},render:function(){var q=p.getButtonSize(this.props),r="_55pi";if(this.props.theme==='dark')r=n(r,"_5vto"+(q==='small'?' '+"_55_o":'')+(q==='medium'?' '+"_55_p":'')+(q==='large'?' '+"_55_q":'')+(q==='xlarge'?' '+"_55_r":'')+(q==='xxlarge'?' '+"_55_s":''));var s=this.props.chevron;if(!s){var t=this.props.theme==='dark'||this.props.use==='confirm'||this.props.use==='special'?m('/images/ui/x/button/dark/chevron.png'):m('/images/ui/x/button/normal/chevron.png');s=j.createElement(i,{src:t});}var u={button:j.createElement(k,babelHelpers._extends({},this.props,{className:n(this.props.className,r),size:q})),chevron:s,chevronWidth:14,defaultMaxWidth:this.props.maxwidth||200};return (j.createElement(h,{config:u,haschevron:this.props.haschevron,image:this.props.image,label:this.props.label,maxwidth:this.props.maxwidth}));}});f.exports=p;},null);
__d('PageVoiceDropdownSelector.react',['BootloadedComponent.react','Image.react','JSResource','React','XUIPopoverButton.react','XUISpinner.react','cx','ix'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o){'use strict';if(c.__markCompiled)c.__markCompiled();var p=k.PropTypes,q=k.createClass({displayName:'PageVoiceDropdownSelector',propTypes:{loading:p.bool,maxWidth:p.number,pages:p.object.isRequired,selectedActorID:p.string,showPageName:p.bool,suppressed:p.bool.isRequired,user:p.object.isRequired,onChange:p.func.isRequired,onClick:p.func.isRequired},getDefaultProps:function(){return {showPageName:false};},getInitialState:function(){return {dialogShown:false,bootloadFinished:false};},_onChangeActor:function(r){this.props.onChange(r);this.setState({dialogShown:false});},_getDialogContextRef:function(){return this.refs['open-menu-button'];},_onBootloadFinished:function(){this.setState({bootloadFinished:true});},render:function(){var r=this.state.dialogShown&&!this.state.bootloadFinished,s=this.props.loading||r,t=null;if(s)t=k.createElement('div',{className:(!this.props.suppressed?"_3-8_":'')+(' '+"_2wk7")},k.createElement(m,null));var u=null;if(this.state.dialogShown)u=k.createElement(h,babelHelpers._extends({bootloadLoader:j('PageVoiceDropdownSelectorMenu.react'),bootloadPlaceholder:k.createElement('div',null),onComponentLoad:this._onBootloadFinished},this.props,{contextRef:this._getDialogContextRef,shown:true,shownBusinessID:this.state.shownBusinessID,onChange:this._onChangeActor,onToggle:this._onToggle}));return (k.createElement('span',null,k.createElement(l,{className:"_4z8-",image:k.createElement(i,{height:16,src:this._getSelectedImageSource(),width:16}),label:this.props.showPageName?this._getSelectedActorName():'',maxwidth:this.props.maxwidth,ref:'open-menu-button',suppressed:this.props.suppressed,type:'button',onClick:this._onButtonClick}),u,t));},_onButtonClick:function(event){this.setState({dialogShown:!this.state.dialogShown,shownBusinessID:this.state.defaultBusinessID},(function(){return this.props.onClick(event);}).bind(this));},_onToggle:function(r){this.setState({dialogShown:r});},_getSelectedImageSource:function(){var r=this.props.selectedActorID;if(!r)return '';if(r===this.props.user.id)return this.props.user.thumbSrc||'';return this.props.pages[r].thumbSrc||'';},_getSelectedActorName:function(){var r=this.props.selectedActorID;if(!r)return '';if(r===this.props.user.id)return this.props.user.name||'';return this.props.pages[r].name||'';}});f.exports=q;},null);
__d('ActorSelector.react',['BizSiteIdentifier.brands','BootloadedComponent.react','Bootloader','Event','JSResource','PageVoiceDropdownSelector.react','React','ReactDOM','ShortProfiles','TooltipData','cx','emptyFunction','getObjectValues','goURI','joinClasses','tidyEvent'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){if(c.__markCompiled)c.__markCompiled();var x=n.PropTypes,y=500,z=n.createClass({displayName:'ActorSelector',propTypes:{actorIDs:x.array.isRequired,actorPermissions:x.object,loading:x.bool,nuxBody:x.node,nuxEnabled:x.bool,nuxHoverContext:x.object,onChange:x.func.isRequired,onCompleteNux:x.func,onShowNux:x.func,selectedActorID:x.string,settingsURI:x.string,showName:x.bool,showNameMaxWidth:x.number,suppressed:x.bool,tooltipConstructor:x.func},getDefaultProps:function(){return {suppressed:true};},getInitialState:function(){return {actorData:{},nuxShown:false};},componentWillMount:function(){this._canSetState=true;this._fetchActorData();},_getNUXContextRef:function(){return this.refs.selector;},render:function(){if(!this.props.selectedActorID||!this.state.actorData[this.props.selectedActorID])return n.createElement('div',null);if(this.props.actorIDs.length===0)return n.createElement('div',null);var aa=null;if(this.state.nuxShown)aa=n.createElement(i,{bootloadLoader:l('ActorSelectorNUXLayer.react'),bootloadPlaceholder:n.createElement('span',null),onCompleteNux:this._onCompleteNux,onClickSettings:this._onClickSettings,settingsURI:this.props.settingsURI,shown:true,contextRef:this._getNUXContextRef,nuxBody:this.props.nuxBody});return (n.createElement('span',{className:v("_6vh",this.props.className)},n.createElement('span',{ref:'selector'},n.createElement(m,{loading:this.props.loading,permissions:this.props.actorPermissions,pages:this.state.actorData,onChange:this.props.onChange,onClick:this._onClickSelector,selectedActorID:this.props.selectedActorID,searchBarVisible:true,showBusinessPages:false,showPageName:this.props.showName,showNameMaxWidth:this.props.showNameMaxWidth,showPersonalPagesInRoot:!h.isBizSite(),suppressed:this.props.suppressed,user:t(this.state.actorData)[0]})),aa));},componentDidMount:function(){this._setTooltip();if(this.props.nuxEnabled)if(this.props.nuxHoverContext){var aa=w(k.listen(this.props.nuxHoverContext,'mouseenter',(function(){j.loadModules(["ActorSelectorNUXLayer.react"],s);var ba=setTimeout((function(){aa.remove();if(this.props.nuxEnabled)this.setState({nuxShown:true});}).bind(this),y),ca=w(k.listen(this.props.nuxHoverContext,'mouseleave',function(){clearTimeout(ba);ca.remove();}));}).bind(this)));}else this.setState({nuxShown:true});},componentDidUpdate:function(aa,ba){if(this.props.actorIDs.toString()!==aa.actorIDs.toString())this._fetchActorData();this._setTooltip();if(this.state.nuxShown&&!ba.nuxShown&&this.props.onShowNux)this.props.onShowNux();},componentWillUnmount:function(){this._canSetState=false;},_fetchActorData:function(){p.getMulti(this.props.actorIDs,(function(aa){if(this._canSetState)this.setState({actorData:aa});}).bind(this));},_onClickSelector:function(){if(this.state.nuxShown)this._onCompleteNux();},_onClickSettings:function(){this._onCompleteNux();u(this.props.settingsURI);},_onCompleteNux:function(){this.setState({nuxShown:false});if(this.props.onCompleteNux)this.props.onCompleteNux();},_setTooltip:function(){if(!this.refs.selector)return;var aa=this.state.actorData[this.props.selectedActorID];if(!aa)return;if(!this.props.tooltipConstructor)return;q.set(o.findDOMNode(this.refs.selector),this.props.tooltipConstructor(aa.name),'above','right');}});f.exports=z;},null);
__d("XActorSelectorNuxSeenWriteController",["XController"],function a(b,c,d,e,f,g){c.__markCompiled&&c.__markCompiled();f.exports=c("XController").create("\/actor_selector\/nux\/mark_seen\/",{nux_type:{type:"Enum",required:true,enumType:1}});},null);
__d('UFIActorSelector.react',['ActorSelector.react','ActorSelectorNuxTypes','Arbiter','AsyncRequest','Parent','React','SubscriptionsHandler','UFICentralUpdates','UFIFeedbackTargets','UFIUserActions','XActorSelectorNuxSeenWriteController','fbt'],function a(b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){if(c.__markCompiled)c.__markCompiled();var t=m.PropTypes,u='ufi_actor_selector_nux_disabled_event',v=m.createClass({displayName:'UFIActorSelector',propTypes:{actorIDs:t.array.isRequired,ftEntIdentifier:t.string.isRequired,isTimeline:t.bool,nuxEnabled:t.bool,nuxHoverContext:t.object,settingsURI:t.string},getInitialState:function(){var w=l.byClass(this.props.nuxHoverContext,'timelineUnitContainer');return {loading:false,nuxEnabled:this.props.nuxEnabled,nuxHoverContext:w?w:this.props.nuxHoverContext,selectedActorID:null};},render:function(){return (m.createElement(h,{actorIDs:this.props.actorIDs,loading:this.state.loading,nuxBody:this._getNUXBody(),nuxEnabled:this.state.nuxEnabled,nuxHoverContext:this.state.nuxHoverContext,onChange:this._onChange,onShowNux:this._onShowNux,onCompleteNux:this._onCompleteNux,selectedActorID:this.state.selectedActorID,settingsURI:this.props.settingsURI,tooltipConstructor:this._getTooltipForActorName}));},componentDidMount:function(){this._updateSelectedActorIDFromFeedbackTarget();this._subscriptions=new n();this._subscriptions.addSubscriptions(o.subscribe('feedback-updated',(function(w,x){if(this.props.ftEntIdentifier in x.updates)this._updateSelectedActorIDFromFeedbackTarget();}).bind(this)),j.subscribe(u,(function(){this.setState({nuxEnabled:false});}).bind(this)));},componentWillUnmount:function(){this._subscriptions.release();},_updateSelectedActorIDFromFeedbackTarget:function(){p.getFeedbackTarget(this.props.ftEntIdentifier,(function(w){this.setState({loading:false,selectedActorID:w.actorforpost});}).bind(this));},_getNUXBody:function(){return s._("Choose whether to like and comment as yourself or as one of the Pages you manage.");},_getTooltipForActorName:function(w){return s._("Liking and commenting as {actorName}",[s.param('actorName',w)]);},_onChange:function(w){this.setState({loading:true});q.changeActor(this.props.ftEntIdentifier,w.value);},_onCompleteNux:function(){var w=this.props.isTimeline?i.UFI_TIMELINE:i.UFI,x=r.getURIBuilder().setEnum('nux_type',w).getURI();new k().setURI(x).send();},_onShowNux:function(){j.inform(u);}});f.exports=v;},null);