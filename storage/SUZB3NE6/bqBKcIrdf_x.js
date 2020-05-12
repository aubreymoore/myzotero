if (self.CavalryLogger) { CavalryLogger.start_js(["Nu4XQ"]); }

__d("messengerIterateEmoji",["MessengerSupportedEmoji","ifRequired"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a,c,d,e){__p&&__p();var f=String(a);while(f){a=b("ifRequired")("MessengerSupportedEmojiUtils",function(a){return a.getEmojiMatchObj(f)},function(){return b("MessengerSupportedEmoji").getEmojiMatchObj(f)});if(a){var g=a.offset+a.length,h=f.substr(0,a.is_supported?a.offset:g);d(h);a.is_supported&&c(a.emoji_str,a.emoji_key,e);h=f.substr(g);f=h}else break}d(f)}e.exports=a}),null);
__d("messengerIterateEmoticons",["EmoticonEmojiList"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(a,c,d,e){var f,g,h;a=String(a);while(a){g=b("EmoticonEmojiList").regexp.exec(a);if(g)f=g.index+g[1].length,h=a.substr(0,f),g=g[2],f=a.substr(f+g.length),d(h),c(g,b("EmoticonEmojiList").names[g],e),a=f;else break}d(a)}e.exports=a}),null);
__d("MessengerTextWithEmoticons.react",["cx","fbt","BaseTextWithDecoration.react","EmojiImageURL","EmoticonEmojiList","FBEmojiResource","FBEmojiUtils","Image.react","MessengerHotlikeEmoji.bs","React","messengerIterateEmoji","messengerIterateEmoticons"],(function(a,b,c,d,e,f,g,h){"use strict";__p&&__p();var i;c=b("React").PropTypes;function j(a,c,d,e){var f=e?128:16;a=!a&&!b("MessengerHotlikeEmoji.bs").isMessengerHotlike(d)?new(b("FBEmojiResource"))(b("FBEmojiUtils").resolveAliasFromKey(d)||d).getImageURL(f):b("EmojiImageURL").getMessengerURL(d,f);d=e?"_1ift _5m3a":"_1ift _2560";return b("React").createElement(b("Image.react"),{alt:c,className:d,src:a})}function k(a,c,d){var e=d?128:16,f=b("EmoticonEmojiList").emote2emojis[c],g=f?b("MessengerHotlikeEmoji.bs").isMessengerHotlike(f)?b("EmojiImageURL").getMessengerURL(f,e):new(b("FBEmojiResource"))(f).getImageURL(e):null;if(g){f=String.fromCodePoint(parseInt(f,e));e=d?"_1ift _5m3a":"_1ift _2560";return b("React").createElement(b("Image.react"),{alt:f,className:e,src:g})}d=h._("{emoticonName} emoticon",[h._param("emoticonName",c)]);return b("React").createElement("span",{"aria-label":d},a)}function l(a,b,c){return function(d,e,f){var g=function(c,d,a){e(b(c,d,a))};a(String(d),g,f,c)}}i=babelHelpers.inherits(a,b("React").Component);i&&i.prototype;a.prototype.shouldComponentUpdate=function(a){return a.text!==this.props.text};a.prototype.render=function(){var a=[l(b("messengerIterateEmoji"),j.bind(null,!!this.props.forceMessengerEmoji),this.props.customSize),l(b("messengerIterateEmoticons"),k,this.props.customSize)];return b("React").createElement(b("BaseTextWithDecoration.react"),babelHelpers["extends"]({},this.props,{text:this.props.text,decorators:a}))};function a(){i.apply(this,arguments)}a.propTypes={text:c.string,customSize:c.bool,forceMessengerEmoji:c.bool};e.exports=a}),null);
__d("MessengerTextWithEntities.react",["BaseTextWithEntities.react","Link.react","MessengerTextWithEmoticons.react","React"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g;function h(a){return a.replace(/<3\b|&hearts;/g,"\u2665")}c=babelHelpers.inherits(a,b("React").Component);g=c&&c.prototype;function a(){__p&&__p();var a,c;for(var d=arguments.length,e=new Array(d),f=0;f<d;f++)e[f]=arguments[f];return c=(a=g.constructor).call.apply(a,[this].concat(e)),this.$1=function(a){if(this.props.renderEmoticons||this.props.renderEmoji)return b("React").createElement(b("MessengerTextWithEmoticons.react"),{text:a,customSize:this.props.customSize,renderEmoticons:this.props.renderEmoticons,renderEmoji:this.props.renderEmoji});else return h(a)}.bind(this),this.$2=function(a,c){if(this.props.interpolator)return this.props.interpolator(a,c);else return b("React").createElement(b("Link.react"),{href:c.entity},a)}.bind(this),c}a.prototype.render=function(){return b("React").createElement(b("BaseTextWithEntities.react"),babelHelpers["extends"]({},this.props,{aggregatedRanges:this.props.aggregatedRanges,imageRanges:this.props.imageRanges,metaRanges:this.props.metaRanges,rangeRenderer:this.$2,ranges:this.props.ranges,text:this.props.text,textRenderer:this.$1}))};e.exports=a}),null);
__d("AbstractBadge.react",["cx","invariant","React","formatNumber","joinClasses"],(function(a,b,c,d,e,f,g,h){__p&&__p();var i;c=b("React").PropTypes;function j(a){return parseInt(a,10)===a}i=babelHelpers.inherits(a,b("React").PureComponent);i&&i.prototype;a.prototype.render=function(){"use strict";__p&&__p();var a=this.props,c=a.count,d=a.maxcount,e=a.label;a=babelHelpers.objectWithoutPropertiesLoose(a,["count","maxcount","label"]);j(c)||h(0,186);j(d)||h(0,187);var f="_51lp"+(c>d?" _51lr":"")+(!this.props.allowZero&&c===0?" hidden_elem":"");e=e?b("React").createElement("span",{className:"accessible_elem","aria-hidden":c?"false":"true"},"\xa0",e):null;c=b("formatNumber").withMaxLimit(c,d);e!==null&&(c=b("React").createElement("span",{"aria-hidden":"true"},c));return b("React").createElement("span",babelHelpers["extends"]({},a,{className:b("joinClasses")(this.props.className,f)}),c,e)};function a(){"use strict";i.apply(this,arguments)}a.propTypes={className:c.string,count:c.number.isRequired,maxcount:c.number,label:c.string};a.defaultProps={maxcount:20};e.exports=a}),null);
__d("XUIBadge.react",["cx","AbstractBadge.react","React","joinClasses"],(function(a,b,c,d,e,f,g){__p&&__p();var h;c=b("React").PropTypes;h=babelHelpers.inherits(a,b("React").Component);h&&h.prototype;a.prototype.render=function(){"use strict";var a=this.props.type;a="_5ugh"+(a==="regular"?" _5ugf":"")+(a==="special"?" _5ugg":"");return b("React").createElement(b("AbstractBadge.react"),babelHelpers["extends"]({},this.props,{className:b("joinClasses")(this.props.className,a),type:null}))};function a(){"use strict";h.apply(this,arguments)}a.propTypes={type:c.oneOf(["regular","special"]),allowZero:c.bool};a.defaultProps={type:"regular"};e.exports=a}),null);
__d("StickersTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();function a(){this.$1={}}a.prototype.log=function(){b("GeneratedLoggerUtils").log("logger:StickersLoggerConfig",this.$1,b("Banzai").BASIC)};a.prototype.logVital=function(){b("GeneratedLoggerUtils").log("logger:StickersLoggerConfig",this.$1,b("Banzai").VITAL)};a.prototype.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:StickersLoggerConfig",this.$1,{signal:!0})};a.prototype.clear=function(){this.$1={};return this};a.prototype.getData=function(){return babelHelpers["extends"]({},this.$1)};a.prototype.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};a.prototype.setEvent=function(a){this.$1.event=a;return this};a.prototype.setNumsearchresults=function(a){this.$1.numsearchresults=a;return this};a.prototype.setPackid=function(a){this.$1.packid=a;return this};a.prototype.setPackids=function(a){this.$1.packids=b("GeneratedLoggerUtils").serializeVector(a);return this};a.prototype.setSearchtoken=function(a){this.$1.searchtoken=a;return this};a.prototype.setStickerid=function(a){this.$1.stickerid=a;return this};a.prototype.setTagid=function(a){this.$1.tagid=a;return this};a.prototype.setTime=function(a){this.$1.time=a;return this};a.prototype.setTriggeredword=function(a){this.$1.triggeredword=a;return this};a.prototype.setTriggerused=function(a){this.$1.triggerused=a;return this};a.prototype.setWeight=function(a){this.$1.weight=a;return this};c={event:!0,numsearchresults:!0,packid:!0,packids:!0,searchtoken:!0,stickerid:!0,tagid:!0,time:!0,triggeredword:!0,triggerused:!0,weight:!0};e.exports=a}),null);
__d("LinkReact.bs",["Link.react","ReasonReact.bs","bs_js_primitive","bs_js_null_undefined"],(function(a,b,c,d,e,f){"use strict";function a(a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){d={"aria-label":b("bs_js_null_undefined").fromOption(d),"data-ft":b("bs_js_null_undefined").fromOption(f),"data-hover":b("bs_js_null_undefined").fromOption(g),"data-tooltip-content":b("bs_js_null_undefined").fromOption(h),"data-tooltip-alignh":b("bs_js_null_undefined").fromOption(i),"data-tooltip-position":b("bs_js_null_undefined").fromOption(j),className:b("bs_js_null_undefined").fromOption(e),href:b("bs_js_null_undefined").fromOption(k),linkRef:b("bs_js_null_undefined").fromOption(l),onClick:b("bs_js_null_undefined").fromOption(m),onMouseDown:b("bs_js_null_undefined").fromOption(n),onMouseEnter:b("bs_js_null_undefined").fromOption(o),role:b("bs_js_null_undefined").fromOption(p),rel:b("bs_js_null_undefined").fromOption(q),style:b("bs_js_null_undefined").fromOption(r),tabIndex:b("bs_js_null_undefined").fromOption(s),target:b("bs_js_null_undefined").fromOption(t),title:b("bs_js_null_undefined").fromOption(u)};a!==void 0&&(d["aria-expanded"]=b("bs_js_primitive").valFromOption(a));c!==void 0&&(d["aria-hidden"]=b("bs_js_primitive").valFromOption(c));return b("ReasonReact.bs").wrapJsForReason(b("Link.react"),d,v)}f.make=a}),null);
__d("MessengerContactActions.bs",[],(function(a,b,c,d,e,f){"use strict";a={ADD_OWNER:"ADD_OWNER",FREE_CALL:"FREE_CALL",MESSAGE:"MESSAGE",PROFILE:"PROFILE",REMOVE:"REMOVE",REMOVE_OWNER:"REMOVE_OWNER",SELECT:"SELECT"};f.actions=a}),null);
__d("LazyWorkMultiCompanyChatTooltip.react",["JSResource","Placeholder.react","lazyLoadComponent","react"],(function(a,b,c,d,e,f){"use strict";var g=b("lazyLoadComponent")(b("JSResource")("WorkMultiCompanyChatTooltip.react").__setRef("LazyWorkMultiCompanyChatTooltip.react"));function a(a){return b("react").createElement(b("Placeholder.react"),{fallback:a.children},b("react").createElement(g,null,a.children))}e.exports=a}),null);
__d("LazyWorkMultiCompanyChatTooltipReact.bs",["ReasonReact.bs","LazyWorkMultiCompanyChatTooltip.react"],(function(a,b,c,d,e,f){"use strict";function a(a){return b("ReasonReact.bs").wrapJsForReason(b("LazyWorkMultiCompanyChatTooltip.react"),{},a)}f.make=a}),null);
__d("VideoCallWebDriverIDs",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({ACCEPT_ESCALATION_CALL_BUTTON:"acceptEscalationButton",ADD_GROUP_MEMBERS_BUTTON:"addGroupMembersButton",ANSWER_CALL_BUTTON:"answerCallButton",DOMINANT_SPEAKER_SWITCH_BUTTON:"dominantSpeakerSwitchButton",END_CALL_BUTTON:"endCallButton",ESCALATE_CALL_BUTTON:"escalateCallButton",FULL_SCREEN_BUTTON:"fullScreenButton",GRID_SWITCH_BUTTON:"gridSwitchButton",IGNORE_CALL_BUTTON:"ignoreCallButton",INCALL_VIDEO_CONTAINER:"incallVideoContainer",REDIAL_BUTTON:"rediallButton",REJECT_CALL_BUTTON:"rejectCallButton",REMOTE_VIEW_THUMBNAIL:"remoteViewThumbnail",RTC_APP_VIEW_START_CALL_BUTTON:"RTCAppViewStartCallButton",RTC_INCALL_VIDEO:"RTCIncallVideo",RTC_PICKER_DIALOG_CALL_BUTTON:"RTCPickerDialogCallButton",RTC_PICKER_DIALOG_CANCEL_BUTTON:"RTCPickerDialogCancelButton",RTC_PICKER_DIALOG_CONTACT_LIST_ITEM:"RTCPickerDialogContactListItem",RTC_PICKER_DIALOG_RING_BUTTON:"RTCPickerDialogRingButton",RTC_SELF_VIEW:"RTCSelfView",STAR_RATING_VIEW:"starRatingView",STAR_RATING_NOT_NOW_BUTTON:"starRatingNotNowButton",START_VIDEO_CALL:"startVideoCall",START_VOICE_CALL:"startVoiceCall",TOGGLE_AUDIO_BUTTON:"toggleAudioButton",TOGGLE_VIDEO_BUTTON:"toggleVideoButton",TOGGLE_CHAT_BUTTON:"toggleChatButton",CLOSE_CHAT_BUTTON:"closeChatButton",SETTINGS_BUTTON:"settingsButton",SAVE_SETTINGS_BUTTON:"saveSettingsButton",CLOSE_CALL_WINDOW_BUTTON:"closeCallWindowButton",CHAT_TAB_VIDEO_BUTTON:"chatTabVideoButton",CHAT_TAB_VOICE_BUTTON:"chatTabVoiceButton",PROFILE_DROPDOWN_MENU:"profileDropdownMenu",RTC_CALL_ACTION_LINK:"RTCCallActionLink",STAR_RATING_SUBMIT_BUTTON:"submitStarRatingButton"})}),null);
__d("BootloadOnInteraction.react",["BootloadOnRender.react","React"],(function(a,b,c,d,e,f){__p&&__p();var g;c=babelHelpers.inherits(a,b("React").Component);g=c&&c.prototype;function a(a){"use strict";g.constructor.call(this,a),this.$1=function(){this.setState({hadUserInteraction:!0})}.bind(this),this.state={hadUserInteraction:!1}}a.prototype.render=function(){"use strict";if(!this.state.hadUserInteraction)return b("React").cloneElement(this.props.placeholder,{onFocus:this.$1,onMouseOver:this.$1,onClick:this.$1});var a=this.props,c=a.loader,d=a.component;a=a.placeholder;return b("React").createElement(b("BootloadOnRender.react"),{placeholder:a,loader:c,component:d})};e.exports=a}),null);