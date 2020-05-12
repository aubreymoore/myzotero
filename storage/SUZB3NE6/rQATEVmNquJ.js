if (self.CavalryLogger) { CavalryLogger.start_js(["mhkbA"]); }

__d("ShareMenuTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.$1={}}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:ShareMenuLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:ShareMenuLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:ShareMenuLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setAppID=function(a){this.$1.appid=a;return this};a.prototype.setAppversion=function(a){this.$1.appversion=a;return this};a.prototype.setClienttime=function(a){this.$1.clienttime=a;return this};a.prototype.setComposerSessionID=function(a){this.$1.composer_session_id=a;return this};a.prototype.setCountry=function(a){this.$1.country=a;return this};a.prototype.setDeviceid=function(a){this.$1.deviceid=a;return this};a.prototype.setExtraClientData=function(a){this.$1.extra_client_data=a;return this};a.prototype.setFbAudience=function(a){this.$1.fb_audience=a;return this};a.prototype.setFbEntryPoint=function(a){this.$1.fb_entry_point=a;return this};a.prototype.setFbShareType=function(a){this.$1.fb_share_type=a;return this};a.prototype.setFbSignificance=function(a){this.$1.fb_significance=a;return this};a.prototype.setName=function(a){this.$1.name=a;return this};a.prototype.setOrcaEntryPoint=function(a){this.$1.orca_entry_point=a;return this};a.prototype.setOrcaSignificance=function(a){this.$1.orca_significance=a;return this};a.prototype.setSessionid=function(a){this.$1.sessionid=a;return this};a.prototype.setTime=function(a){this.$1.time=a;return this};a.prototype.setVC=function(a){this.$1.vc=a;return this};a.prototype.setWeight=function(a){this.$1.weight=a;return this};c={appid:!0,appversion:!0,clienttime:!0,composer_session_id:!0,country:!0,deviceid:!0,extra_client_data:!0,fb_audience:!0,fb_entry_point:!0,fb_share_type:!0,fb_significance:!0,name:!0,orca_entry_point:!0,orca_significance:!0,sessionid:!0,time:!0,vc:!0,weight:!0};e.exports=a}),null);
__d("ShareAudience",[],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=Object.freeze({EVERYONE:"everyone",FRIENDS:"friends",FOF:"fof",SELF:"self",CUSTOM:"custom",PAGE:"page",GROUP:"group",MESSENGER:"messenger",FRIEND_TIMELINE:"friend_timeline",UNKNOWN:"unknown",fromPrivacyString:function(a){switch(a){case null:case void 0:case g.UNKNOWN:return g.UNKNOWN;case"286958161406148":return g.SELF;case"300645083384735":return g.EVERYONE;case"368493386561757":case"275425949243301":return g.FOF;case"123780391104836":case"291667064279714":return g.FRIENDS;default:return g.CUSTOM}}});e.exports=g}),null);
__d("ShareMenuEventShareType",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({SHARE_FLOW_STARTED:"share_flow_started",SHARE_OPTION_SELECTED:"share_option_selected",SHARE_CREATED:"share_created",SHARE_ABANDONED:"share_abandoned",SHARE_FAILURE:"share_failure"})}),null);
__d("ShareSignificance",[],(function(a,b,c,d,e,f){"use strict";var g=Object.freeze({SIGNIFICANT:"significant",NOT_SIGNIFICANT:"not_significant",NO_TEXT:"no_text",calculate:function(a){if(!a)return g.NO_TEXT;var b=new Set();(a||"").toLowerCase().split(" ").forEach(function(a){return b.add(a)});return b.size>5?g.SIGNIFICANT:g.NOT_SIGNIFICANT}});e.exports=g}),null);
__d("ShareMetricsLoggingController",["ReactComposerLoggingName","ShareAudience","ShareMenuEventShareType","ShareMenuTypedLogger","ShareSignificance"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a={logShareNowResponsePayload:function(a){if(!a)return;var c="unknown";a.audience==="own"?c=a.privacy:a==="friend"?c="friend_timeline":c=a.audience;this._logImpl(b("ShareMenuEventShareType").SHARE_CREATED,"share_now",c,b("ShareSignificance").NO_TEXT)},logReactComposerEvent:function(a,c,d,e,f){__p&&__p();var g=b("ShareAudience").UNKNOWN;switch(c){case"self":g=b("ShareAudience").fromPrivacyString(f);break;case"friend":g=b("ShareAudience").FRIEND_TIMELINE;break;case"message":g=b("ShareAudience").MESSENGER;break;case"group":g=b("ShareAudience").GROUP;break;case"page":g=b("ShareAudience").PAGE;break}var h;switch(e){case b("ReactComposerLoggingName").SHARE_NOW_MENU_SHARE_TO_PAGE:h="share_to_page";break;case b("ReactComposerLoggingName").SHARE_NOW_MENU_POST_TO_GROUP:h="share_to_group";break;case b("ReactComposerLoggingName").SHARE_NOW_MENU_SEND_MESSAGE:h="send_in_message";break;case b("ReactComposerLoggingName").SHARE_NOW_MENU_SHARE_FRIEND_TIMELINE:h="share_to_friend_timeline";break;case b("ReactComposerLoggingName").SHARE_NOW_MENU_WRITE_POST:h="write_post";break;default:h="unknown";break}c=b("ShareSignificance").calculate(d);this._logImpl(a,h,g,c)},log:function(a,b,c,d){this._logImpl(a,b,c,d)},_logImpl:function(a,c,d,e){a=new(b("ShareMenuTypedLogger"))().setName("feed_share_action").setFbShareType(a).setFbEntryPoint(c);d&&a.setFbAudience(d);e&&a.setFbSignificance(e);a.log()}};e.exports=a}),null);
__d("ReactShareDialogLoggingStore",["FunnelLogger","MessengerBootloadedSecondarySearchLogger","MessengerSecondarySearchFunnelConstants","ReactComposerActionTypes","ReactComposerAudienceActionTypes","ReactComposerLoggingName","ReactComposerShareNowActionTypes","ReactComposerStatusActionType","ReactComposerStoreBase","ReactComposerTaggerActionType","ReactComposerTaggerType","ReactShareDialogComposerActionType","ReactShareDialogComposerStore","ReactComposerStatusStore","ShareAudience","ShareMenuEventShareType","ShareMetricsLoggingController"],(function(a,b,c,d,e,f){__p&&__p();var g,h="WWW_FEED_SHARE_DIALOG_FUNNEL";c=babelHelpers.inherits(a,b("ReactComposerStoreBase"));g=c&&c.prototype;function a(){"use strict";var a;g.constructor.call(this,function(){return{audience:b("ShareAudience").UNKNOWN,triggeredFrom:b("ReactComposerLoggingName").OTHERS}},function(b){a.__onDispatch(b)});a=this;this.$ReactShareDialogLoggingStore2=0;this.$ReactShareDialogLoggingStore3=!1}a.prototype.__onDispatch=function(a){"use strict";__p&&__p();switch(a.type){case b("ReactComposerShareNowActionTypes").CANCEL_SHARE:this.$ReactShareDialogLoggingStore4(a);break;case b("ReactComposerShareNowActionTypes").SHOW_SHARENOW_MENU:this.$ReactShareDialogLoggingStore5(a);break;case b("ReactComposerShareNowActionTypes").SHARE_NOW:this.$ReactShareDialogLoggingStore6(a);break;case b("ReactComposerShareNowActionTypes").OPEN_FRIEND_TIMELINE_DIALOG:this.$ReactShareDialogLoggingStore7(a);break;case b("ReactComposerShareNowActionTypes").OPEN_INVITE_FRIENDS_TO_DONATE:this.$ReactShareDialogLoggingStore8(a);break;case b("ReactComposerShareNowActionTypes").OPEN_SHARE_TO_PAGE:this.$ReactShareDialogLoggingStore9(a);break;case b("ReactComposerShareNowActionTypes").OPEN_SHARE_TO_GROUP:this.$ReactShareDialogLoggingStore10(a);break;case b("ReactComposerShareNowActionTypes").OPEN_MESSAGE_DIALOG:this.$ReactShareDialogLoggingStore11(a);break;case b("ReactComposerShareNowActionTypes").OPEN_SHARE_DIALOG:this.$ReactShareDialogLoggingStore12(a);break;case b("ReactComposerTaggerActionType").SET_SELECTED_TAGGER:this.$ReactShareDialogLoggingStore13(a);break;case b("ReactComposerStatusActionType").SET_EDITOR_STATE:this.$ReactShareDialogLoggingStore14(a);break;case b("ReactComposerTaggerActionType").SET_TAGGER_DATA:this.$ReactShareDialogLoggingStore15(a);break;case b("ReactComposerActionTypes").INIT_CONFIG:this.$ReactShareDialogLoggingStore16(a);break;case b("ReactComposerActionTypes").POST_INTENDED:this.$ReactShareDialogLoggingStore17(a);break;case b("ReactComposerActionTypes").POST_SUCCEEDED:this.$ReactShareDialogLoggingStore18(a);break;case b("ReactComposerActionTypes").POST_ERROR:this.$ReactShareDialogLoggingStore19(a);break;case b("ReactComposerAudienceActionTypes").SET_AUDIENCE:this.$ReactShareDialogLoggingStore20(a);break;case b("ReactShareDialogComposerActionType").SET_SHARE_DIALOG_TARGET:this.$ReactShareDialogLoggingStore21(a);break;default:}};a.prototype.$ReactShareDialogLoggingStore22=function(a){"use strict";return this.$ReactShareDialogLoggingStore1===a.composerID};a.prototype.$ReactShareDialogLoggingStore7=function(a){"use strict";this.$ReactShareDialogLoggingStore3=!0,b("FunnelLogger").appendAction(h,"share_friend_timeline"),b("ShareMetricsLoggingController").log(b("ShareMenuEventShareType").SHARE_OPTION_SELECTED,"share_to_friend_timeline")};a.prototype.$ReactShareDialogLoggingStore8=function(a){"use strict";this.$ReactShareDialogLoggingStore3=!0,b("FunnelLogger").appendAction(h,"share_invite_friends_to_donate"),b("ShareMetricsLoggingController").log(b("ShareMenuEventShareType").SHARE_OPTION_SELECTED,"invite_friends_to_donate")};a.prototype.$ReactShareDialogLoggingStore9=function(a){"use strict";this.$ReactShareDialogLoggingStore3=!0,b("FunnelLogger").appendAction(h,"share_to_page"),b("ShareMetricsLoggingController").log(b("ShareMenuEventShareType").SHARE_OPTION_SELECTED,"share_to_page")};a.prototype.$ReactShareDialogLoggingStore10=function(a){"use strict";this.$ReactShareDialogLoggingStore3=!0,b("FunnelLogger").appendAction(h,"share_to_group"),b("ShareMetricsLoggingController").log(b("ShareMenuEventShareType").SHARE_OPTION_SELECTED,"share_to_group")};a.prototype.$ReactShareDialogLoggingStore5=function(a){"use strict";b("FunnelLogger").startFunnel(h),b("ShareMetricsLoggingController").log(b("ShareMenuEventShareType").SHARE_FLOW_STARTED)};a.prototype.$ReactShareDialogLoggingStore6=function(a){"use strict";b("FunnelLogger").appendAction(h,"share_now"),b("FunnelLogger").endFunnel(h),b("ShareMetricsLoggingController").log(b("ShareMenuEventShareType").SHARE_OPTION_SELECTED,"share_now"),delete this.$ReactShareDialogLoggingStore1};a.prototype.$ReactShareDialogLoggingStore11=function(a){"use strict";this.$ReactShareDialogLoggingStore3=!0,b("FunnelLogger").appendAction(h,"start_send_message"),b("MessengerBootloadedSecondarySearchLogger").logSearchEvent({name:b("MessengerSecondarySearchFunnelConstants").EVENTS.START,surface:b("MessengerSecondarySearchFunnelConstants").SEARCH_SURFACES.BROADCAST,loggingID:b("MessengerSecondarySearchFunnelConstants").LOGGING_IDS.BROADCAST}),b("ShareMetricsLoggingController").log(b("ShareMenuEventShareType").SHARE_OPTION_SELECTED,"send_in_message")};a.prototype.$ReactShareDialogLoggingStore12=function(a){"use strict";this.$ReactShareDialogLoggingStore3=!0,b("FunnelLogger").appendAction(h,"start_share"),b("ShareMetricsLoggingController").log(b("ShareMenuEventShareType").SHARE_OPTION_SELECTED,"write_post")};a.prototype.$ReactShareDialogLoggingStore16=function(a){"use strict";this.$ReactShareDialogLoggingStore3&&(this.$ReactShareDialogLoggingStore3=!1,b("FunnelLogger").appendAction(h,"load_composer"),this.$ReactShareDialogLoggingStore1=a.composerID,this.getComposerData(a.composerID).triggeredFrom=a.triggeredFrom)};a.prototype.$ReactShareDialogLoggingStore18=function(a){"use strict";this.$ReactShareDialogLoggingStore22(a)&&(b("FunnelLogger").appendAction(h,"success"),b("FunnelLogger").endFunnel(h),b("ShareMetricsLoggingController").logReactComposerEvent(b("ShareMenuEventShareType").SHARE_CREATED,b("ReactShareDialogComposerStore").getTarget(a.composerID),b("ReactComposerStatusStore").getMessageText(a.composerID),this.getComposerData(a.composerID).triggeredFrom,this.getComposerData(a.composerID).audience),delete this.$ReactShareDialogLoggingStore1)};a.prototype.$ReactShareDialogLoggingStore19=function(a){"use strict";this.$ReactShareDialogLoggingStore22(a)&&(b("FunnelLogger").appendAction(h,"failure"),b("FunnelLogger").endFunnel(h),b("ShareMetricsLoggingController").logReactComposerEvent(b("ShareMenuEventShareType").SHARE_FAILURE,b("ReactShareDialogComposerStore").getTarget(a.composerID),b("ReactComposerStatusStore").getMessageText(a.composerID),this.getComposerData(a.composerID).triggeredFrom,this.getComposerData(a.composerID).audience),delete this.$ReactShareDialogLoggingStore1)};a.prototype.$ReactShareDialogLoggingStore17=function(a){"use strict";this.$ReactShareDialogLoggingStore22(a)&&b("FunnelLogger").appendAction(h,"start_post")};a.prototype.$ReactShareDialogLoggingStore14=function(a){"use strict";this.$ReactShareDialogLoggingStore22(a)&&(a.editorState.getLastChangeType()==="insert-characters"&&b("FunnelLogger").appendActionIfNew(h,"edit_text"))};a.prototype.$ReactShareDialogLoggingStore13=function(a){"use strict";if(this.$ReactShareDialogLoggingStore22(a))switch(a.taggerID){case b("ReactComposerTaggerType").PEOPLE:b("FunnelLogger").appendAction(h,"peopletag_click");break;case b("ReactComposerTaggerType").LOCATION:b("FunnelLogger").appendAction(h,"locationtag_click");break;case b("ReactComposerTaggerType").ACTIVITY:b("FunnelLogger").appendAction(h,"activitytag_click");break;default:}};a.prototype.$ReactShareDialogLoggingStore15=function(a){"use strict";if(this.$ReactShareDialogLoggingStore22(a))switch(a.taggerID){case b("ReactComposerTaggerType").PEOPLE:this.$ReactShareDialogLoggingStore23(a);break;case b("ReactComposerTaggerType").LOCATION:this.$ReactShareDialogLoggingStore24(a);break;case b("ReactComposerTaggerType").ACTIVITY:this.$ReactShareDialogLoggingStore25(a);break;default:}};a.prototype.$ReactShareDialogLoggingStore23=function(a){"use strict";a.taggerData.length>this.$ReactShareDialogLoggingStore2?b("FunnelLogger").appendActionIfNew(h,"peopletag_add"):b("FunnelLogger").appendActionIfNew(h,"peopletag_remove"),this.$ReactShareDialogLoggingStore2=a.taggerData.length};a.prototype.$ReactShareDialogLoggingStore24=function(a){"use strict";a.taggerData.place?b("FunnelLogger").appendAction(h,"locationtag_add"):b("FunnelLogger").appendAction(h,"locationtag_remove")};a.prototype.$ReactShareDialogLoggingStore25=function(a){"use strict";!a.taggerData.action?b("FunnelLogger").appendAction(h,"activitytag_clear"):!a.taggerData.object?b("FunnelLogger").appendAction(h,"activitytag_select"):b("FunnelLogger").appendAction(h,"activitytag_addobject")};a.prototype.$ReactShareDialogLoggingStore4=function(a){"use strict";this.$ReactShareDialogLoggingStore22(a)&&(b("FunnelLogger").appendAction(h,"cancel_post"),b("FunnelLogger").endFunnel(h),b("ShareMetricsLoggingController").logReactComposerEvent(b("ShareMenuEventShareType").SHARE_ABANDONED,b("ReactShareDialogComposerStore").getTarget(a.composerID),b("ReactComposerStatusStore").getMessageText(a.composerID),this.getComposerData(a.composerID).triggeredFrom,this.getComposerData(a.composerID).audience),delete this.$ReactShareDialogLoggingStore1)};a.prototype.$ReactShareDialogLoggingStore20=function(a){"use strict";(!this.$ReactShareDialogLoggingStore1||this.$ReactShareDialogLoggingStore1===a.composerID)&&(this.getComposerData(a.composerID).audience=a.audience||a.legacyAudience),this.$ReactShareDialogLoggingStore22(a)&&b("FunnelLogger").appendActionWithTag(h,"set_audience",a.audience||a.legacyAudience)};a.prototype.$ReactShareDialogLoggingStore21=function(a){"use strict";this.$ReactShareDialogLoggingStore22(a)&&b("FunnelLogger").appendAction(h,"set_dialog_target")};e.exports=new a()}),null);
__d("ShareNowController",["csx","Bootloader","Dialog","DOM","Event","ReactComposerShareNowActions","ShareConfirmationController","ShareMetricsLoggingController","ShareNowConstants","ReactShareDialogLoggingStore"],(function(a,b,c,d,e,f,g){__p&&__p();b("ReactShareDialogLoggingStore");var h;a={initMenu:function(a){__p&&__p();var c=a.getTriggerElem();b("Event").listen(c,"success",function(a){try{a=a.data.response.payload;a.share_now_succeeded&&(this.showSuccess(a.message),b("ShareMetricsLoggingController").logShareNowResponsePayload(a),b("ShareConfirmationController").tryDisplayShareInFeed(a,c))}catch(a){}}.bind(this));b("Event").listen(c,"error",function(a){try{b("ShareMetricsLoggingController").log("share_failure","share_now"),this.showError(a.data.response.errorDescription)}catch(a){this.showError()}}.bind(this));a.getPopover().subscribe("show",this._logMenuShown)},showSuccess:function(a){this.showDialog(a||b("ShareNowConstants").success)},showError:function(a){this.showDialog(a||b("ShareNowConstants").error)},showDialog:function(a){h&&h.destroy(),h=new(b("Dialog"))().setBody(a).setAutohide(2500).setModal(!0).show()},_logMenuShown:function(){b("ReactComposerShareNowActions").showShareNowMenu()},attachMenuItemListeners:function(a){var c=b("DOM").scry(a.getRoot(),"._2al7")[0],d=b("DOM").scry(a.getRoot(),"._2al8")[0],e=b("DOM").scry(a.getRoot(),"._2al9")[0],f=b("DOM").scry(a.getRoot(),"._1n80")[0],g=b("DOM").scry(a.getRoot(),"._3gc-")[0],h=b("DOM").scry(a.getRoot(),"._3gc_")[0];a=b("DOM").scry(a.getRoot(),"._3gcz")[0];c&&c.addEventListener("click",b("ReactComposerShareNowActions").clickShareNow);d&&d.addEventListener("click",b("ReactComposerShareNowActions").clickWritePost);e&&e.addEventListener("click",b("ReactComposerShareNowActions").clickSendMessage);f&&f.addEventListener("click",b("ReactComposerShareNowActions").clickShareFriendTimeline);g&&g.addEventListener("click",b("ReactComposerShareNowActions").clickShareToPage);h&&h.addEventListener("click",b("ReactComposerShareNowActions").clickShareToGroup);a&&a.addEventListener("click",b("ReactComposerShareNowActions").clickInviteFriendsToDonate)}};e.exports=a}),null);