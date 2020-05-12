(window.wjp=window.wjp||[]).push([[245],{1222:function(e,t,n){"use strict";var a=n(5),r=n(18),i=(n(1),n(2)),o=n(821),c=n(7),l=n(190);function s(){var e=Object(a.a)(["\n    query HeaderRequestsCounter {\n        viewer {\n            account {\n                id\n                notificationCenterPendingRequestCount\n                notificationCenterPendingRequestsUnseen\n            }\n        }\n    }\n"]);return s=function(){return e},e}var u=Object(i.gql)(s());t.a=Object(c.compose)(l.a,Object(o.a)(u,{mapDataToProps:function(e){var t,n,a,r,i=e.viewer;return{count:null!=(t=null==i?void 0:null==(n=i.account)?void 0:n.notificationCenterPendingRequestCount)?t:0,unseen:null!=(a=null==i?void 0:null==(r=i.account)?void 0:r.notificationCenterPendingRequestsUnseen)&&a}}}))((function(e){return(0,e.children)(Object(r.a)(e,["children"]))}))},1261:function(e,t,n){"use strict";n(1);var a=n(0),r=n.n(a),i=n(9),o=new(n.n(i).a)({name:"skeleton",prefix:"nova-c-"});var c=function(e){e.className;var t=e.type,n=e.width,a=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["className","type","width"]),i={width:typeof n===Number?n+"px":n};return r.a.createElement("div",Object.assign({},o({element:"element",modifier:t}),{style:i},a))},l=n(32);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d={top:"flex-start",middle:"center",bottom:"flex-end"},m=r.a.forwardRef((function(e,t){var n=e.type,a=e.className,i=e.width,m=e.height,p=e.verticalAlign,f=e.style,b=e.rest,h=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({width:"number"==typeof i?i+"px":i,height:"number"==typeof m?m+"px":m,justifyContent:d[p]},f);return r.a.createElement("div",Object.assign({style:h},o({extra:a}),{ref:t},b),r.a.createElement("div",{role:"status"},r.a.createElement("span",o("status"),"Loading"),function(e){switch(e){case"multi-line":return r.a.createElement(l.a,{direction:"column",gutter:"xs"},r.a.createElement(l.a.Item,null,r.a.createElement(c,{type:"line"})),r.a.createElement(l.a.Item,null,r.a.createElement(c,{type:"line",width:"80%"})));case"line":default:return r.a.createElement(c,{type:"line"})}}(n)))}));m.displayName="Skeleton",m.defaultProps={type:"line",verticalAlign:"top"};var p=m;t.a=p},190:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=n(7),o=function(e){var t=function(t){var n=Object(a.useState)(!1),i=n[0],o=n[1];return Object(a.useEffect)((function(){o(!0)}),[]),i?r.a.createElement(e,t):r.a.createElement("noscript",null)};return t.displayName=Object(i.wrapDisplayName)(e,"renderOnClient"),t};n.d(t,"a",(function(){return o}))},2150:function(e,t,n){"use strict";var a=n(6),r=n(18),i=(n(1),n(0)),o=n.n(i),c=n(266);t.a=function(e){var t=e.label,n=Object(r.a)(e,["label"]);return t?o.a.createElement(c.a,Object(a.a)({theme:"ghost",color:"yellow",radius:"m"},n,{style:{marginLeft:3}}),t):null}},2525:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return l}));var a=n(6),r=(n(1),n(0)),i=n.n(r),o=n(192),c=Object(r.forwardRef)((function(e,t){return i.a.createElement(o.a,Object(a.a)({type:"text",name:"query",placeholder:"Search for researchers, publications, and more",spellCheck:!1,size:"s",autoComplete:"off",fieldRef:t},e))}));c.displayName="HeaderSearchActionInput";var l=function(e){var t=e.latestValueRef,n=e.latestFocusRef,a=e.className,o=Object(r.useRef)();return Object(r.useEffect)((function(){t.current=o.current.value,n.current=o.current===document.activeElement})),i.a.createElement(c,{className:a,onChange:function(e){return t.current=e.target.value},onFocus:function(){return n.current=!0},onBlur:function(){return n.current=!1},defaultValue:t.current,autoFocus:n.current,ref:o})}},2852:function(e,t,n){"use strict";(function(e){var a=n(6),r=n(18),i=(n(1),n(0)),o=n.n(i),c=n(80),l=n(22),s=n(2859),u=n(2150);t.a=function(t){var i=t.items,d=t.dispatch,m=t.bem;return i.map((function(t,i){var p=t.url,f=t.isActive,b=t.icon,h=t.title,v=t.badgeLabel,g=t.badgeProps,E=Object(r.a)(t,["url","isActive","icon","title","badgeLabel","badgeProps"]),O=h.replace(/ /g,"_").toLowerCase(),y="main-nav-"+O+"-label"+(E.updatedFeedAvailableIndicator?" main-nav-"+O+"-updates":""),w={className:m("nav-link","primary",f?"is-active":null).className,"aria-labelledby":y};return E.addInstitutionDialog?w.onClick=function(t){t.preventDefault(),d(Object(l.mountAsyncModal)("account.EditAffiliationModal.html",null,void 0,(function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(12),n.e(19)]).then(n.bind(null,960))}),e.hot&&!1))}:w.href=p,o.a.createElement("li",Object(a.a)({key:i},m("nav-item")),o.a.createElement("a",w,b&&o.a.createElement(c.a,Object(a.a)({identifier:b,role:"presentation"},m("nav-item-icon"))),o.a.createElement("span",Object(a.a)({},m("nav-label"),{id:"main-nav-"+O+"-label"}),h,o.a.createElement(u.a,Object(a.a)({label:v},g))),E.updatedFeedAvailableIndicator&&o.a.createElement(s.a,Object(a.a)({},m("nav-badge"),{id:"main-nav-"+O+"-updates",widgetId:E.updatedFeedAvailableIndicator}))))}))}}).call(this,n(56)(e))},2859:function(e,t,n){"use strict";var a=n(0),r=n.n(a),i=(n(1),n(266)),o=n(23),c=n.n(o),l=n(8);t.a=Object(l.a)()((function(e){var t=e.id,n=e.className,a=e.unseenFeedItemCount;return a<1?null:r.a.createElement("span",null,r.a.createElement(i.a,{color:"red",className:n},a),r.a.createElement("span",{id:t,className:"is-sr-only"},c()("updates",a,!0)))}))},2865:function(e,t,n){"use strict";(function(e){var a=n(6),r=(n(1),n(0)),i=n.n(r),o=n(80),c=n(2525),l=n(292),s=n(9),u=n.n(s),d=(n(4664),new u.a("header-search"));t.a=function(t){var s=t.url,u=t.formUrl,m=t.viewId,p=Object(r.useState)(!1),f=p[0],b=p[1],h=Object(r.useRef)(),v=Object(r.useRef)();Object(r.useEffect)((function(){var e=window.matchMedia("(min-width: 461px)"),t=function(e){var t=e.matches;return b(t)};return e.addListener(t),t(e),function(){e.removeListener(t)}}));var g=i.a.createElement(c.a,Object(a.a)({},d("input"),{latestValueRef:h,latestFocusRef:v})),E=f?i.a.createElement(l.a,{src:"modules/application/components/HeaderLoggedIn/SearchAction",renderPreloader:function(){return g},input:i.a.createElement(c.b,Object(a.a)({},d("input"),{autoFocus:v.current})),url:s,formUrl:u,viewId:m,initialQueryRef:h,resolveComponentInternalDoNotSetOrYouWillBeFired:function(){return Promise.all([n.e(0),n.e(1),n.e(338)]).then(n.bind(null,4754))},hmrAccept:e.hot&&!1}):g;return i.a.createElement("form",Object(a.a)({},d(),{action:u,method:"get"}),E,i.a.createElement("input",{type:"hidden",name:"_hsv",value:m}),i.a.createElement("div",d("icon"),i.a.createElement("button",Object(a.a)({type:"submit"},d("bar-button"),{name:"looking-glass",value:"1","aria-label":"Submit search"}),i.a.createElement(o.a,{identifier:"magnifier",color:"grey",luminosity:"low",size:"s"}))))}}).call(this,n(56)(e))},2934:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var a=function(e){return e.applicationGlobalSidebar}},3002:function(e,t,n){var a=n(4685);e.exports=function(e){return a(2,e)}},3215:function(e,t,n){"use strict";(function(e){var a=n(0),r=n.n(a),i=(n(1),n(59)),o=n(8),c=n(16),l=n(22),s=n(35);t.a=Object(o.a)()((function(t){var a=t.children,o=t.source,u=t.goal,d=t.dispatch;return r.a.createElement(i.a.Action,{type:"button",onClick:function(){Object(c.post)("application.AjaxCommon.ajaxScoreGoal.html",{goal:u}).catch(s.default),d(Object(l.mountAsyncModal)("invitations.NominateOrDefaultInviteColleaguesDialog.html",{source:o},void 0,(function(){return Promise.all([n.e(0),n.e(1),n.e(582)]).then(n.bind(null,5245))}),e.hot&&!1))}},a)}))}).call(this,n(56)(e))},4664:function(e,t,n){},4665:function(e,t,n){},4667:function(e,t,n){},4669:function(e,t,n){},4670:function(e,t,n){},4671:function(e,t,n){},4685:function(e,t,n){var a=n(933);e.exports=function(e,t){var n;if("function"!=typeof t)throw new TypeError("Expected a function");return e=a(e),function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=void 0),n}}},4753:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(18),i=n(1),o=n.n(i),c=n(0),l=n.n(c),s=n(8),u=IMAGES_STATIC_URL+"m/433110575315790/images/template/brand-header-logo.svg",d=n(2852),m=n(59),p=n(17),f=n(80),b=n(2150),h=function(e){var t=e.items,n=e.bem;return 0===t.length?null:l.a.createElement("li",n("nav-more"),l.a.createElement(m.a,{position:"left",offset:{top:1,left:0},mount:function(e){return e},isResponsive:!1,target:l.a.createElement(p.a,Object(a.a)({},n("nav-link"),{type:"button",theme:"bare",color:"black","aria-label":"More"}),"More ",l.a.createElement(f.a,{identifier:"arrow-down",role:"presentation"}))},l.a.createElement("ul",null,t.map((function(e,t){var n=e.url,r=e.isActive,i=e.icon,o=e.title,c=e.badgeLabel,s=e.badgeProps;return l.a.createElement("li",{key:t},l.a.createElement(m.a.Action,{href:n,status:r?"selected":"",icon:i},o,l.a.createElement(b.a,Object(a.a)({label:c},s))))})))))},v=n(2865),g=n(66),E=n(2),O=n(539),y=n(12),w=n(5);function j(){var e=Object(w.a)(["\n            mutation HeaderLoggedinMarkNotificationCenterRequestsAsSeen {\n                markNotificationCenterRequestsAsSeen {\n                    id\n                    notificationCenterPendingRequestsUnseen\n                }\n            }\n        "]);return j=function(){return e},e}function C(){var e=Object(w.a)(["\n            mutation HeaderLoggedinMarkNotificationCenterMessagesAsSeen {\n                markNotificationCenterMessagesAsSeen {\n                    id\n                    notificationCenterUnseenMessageCount\n                }\n            }\n        "]);return C=function(){return e},e}function N(){var e=Object(w.a)(["\n            mutation HeaderLoggedinMarkNotificationCenterSubscriptionsAsSeen {\n                markNotificationCenterSubscriptionsAsSeen {\n                    id\n                    subscriptionFeedUnreadCount\n                }\n            }\n        "]);return N=function(){return e},e}var I=n(3),M=n(21),k=n(44),R=n(1133),A=n(9),P=n.n(A),D=n(3002),L=n.n(D),S=n(68),q=(n(4665),new P.a("notification-action")),U=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={hasError:!1,preloadContent:!1,loaded:!1},t.handleDidEnter=function(){window.addEventListener("scroll",t.maybeHideTooltip,{passive:!0}),t.props.onClick()},t.handleDidLeave=function(){window.removeEventListener("scroll",t.maybeHideTooltip)},t.maybeHideTooltip=function(){(document.body.scrollTop||document.documentElement.scrollTop)>250&&(removeEventListener(t.eventHandler),t.tooltip.hide())},t.handlePopoverHide=function(){t.tooltip.hide()},t.preloadWidget=L()((function(){t.setState({preloadContent:!0})})),t}Object(I.a)(t,e);var n=t.prototype;return n.getMobileMenuClose=function(){return l.a.createElement(p.a,Object(a.a)({},q("mobile-close"),{type:"button",width:"square",radius:"full",size:"s",color:"grey",theme:"inverted",onClick:this.handlePopoverHide}),l.a.createElement(p.a.Icon,{identifier:"close"}))},n.renderBody=function(){var e,t=this.props.isMobile;return e=this.state.hasError?l.a.createElement(M.a,q("error"),"An unexpected error occurred. Please try again later."):this.state.loaded?this.renderAsyncWidget():l.a.createElement("div",{className:"rendering"}),l.a.createElement("div",q({extra:this.props.isMobile?"is-modal":null}),!t&&l.a.createElement("div",Object(a.a)({},q("arrow"),{style:{right:52*(this.props.orderRight-1)+30}}),l.a.createElement("div",q("arrow-tip"))),t&&this.getMobileMenuClose(),l.a.createElement("div",q("body"),l.a.createElement(k.a,{spacing:"none",elevation:"2-above"},e)))},n.renderAsyncWidget=function(){var e=this;return Object(c.cloneElement)(this.props.asyncWidget,{destroyOnUnmount:!1,renderPreloader:!1,onLoad:function(){e.setState({preloadContent:!1,loaded:!0},(function(){return e.forceUpdate()}))},onError:function(){e.setState({hasError:!0})}})},n.renderTarget=function(){var e=this.props.children,t=this.state.preloadContent,n=this.props.isMobile?this.preloadWidget:null,a=this.props.isMobile?null:this.preloadWidget;return l.a.createElement("div",{onMouseEnter:a,onClick:n},e,t?this.renderAsyncWidget():null)},n.render=function(){var e=this,t=this.props,n=t.orderRight,a=!t.isMobile&&"below-right";return l.a.createElement(R.a,{ref:function(t){e.tooltip=t},offset:{left:52*(n-1)+30,top:9},scope:"local",spacing:"s",position:a,mode:"click",isResponsive:!1,target:this.renderTarget(),mount:function(e){return e},didEnter:this.handleDidEnter,didLeave:this.handleDidLeave},l.a.createElement("div",null,this.renderBody()))},t}(c.Component);U.displayName="NotificationAction";var x=Object(S.a)(U),T=n(31),H=(n(4667),new P.a("notification-counter"));function F(e){e.preventDefault()}var B=function(e){var t=e.children,n=e.icon,i=e.onClick,o=Object(r.a)(e,["children","icon","onClick"]);return l.a.createElement("div",H(),t&&l.a.createElement(t.type,Object(a.a)({},t.props,H("badge"))),l.a.createElement(p.a,Object(a.a)({type:"button",radius:"full",width:"square",color:"grey",theme:"ghost",onClick:Object(T.c)(F,i)},o),l.a.createElement(p.a.Icon,{identifier:n})))},_=n(266),W=function(e){var t=e.children,n=e.unseen,a=e.className;return t<=0?null:l.a.createElement(_.a,{className:a,color:n?"red":"grey",luminosity:n?"medium":"high",size:"s",theme:"solid"},t)},z=n(821),V=n(7),G=n(190);function J(){var e=Object(w.a)(["\n    query HeaderSubscriptionsCounter {\n        viewer {\n            account {\n                id\n                subscriptionFeedUnreadCount\n            }\n        }\n    }\n"]);return J=function(){return e},e}var $=function(e){return(0,e.children)(Object(r.a)(e,["children"]))};$.propTypes={children:o.a.func.isRequired,count:o.a.number.isRequired,unseen:o.a.bool.isRequired,className:o.a.string.isRequired},$.defaultProps={unseen:!1};var Q=Object(E.gql)(J()),Y=Object(V.compose)(G.a,Object(z.a)(Q,{mapDataToProps:function(e){var t,n,a=e.viewer;return{count:null!=(t=null==a?void 0:null==(n=a.account)?void 0:n.subscriptionFeedUnreadCount)?t:0}}}))($),K=function(e){return l.a.createElement(B,Object(a.a)({icon:"bell","aria-label":"Updates"},e),l.a.createElement(Y,null,(function(e){var t=e.count,n=e.className;return l.a.createElement(W,{unseen:!0,className:n},t)})))};function X(){var e=Object(w.a)(["\n    query HeaderMessagesCounter {\n        viewer {\n            account {\n                id\n                notificationCenterUnreadMessageCount\n                notificationCenterUnseenMessageCount\n            }\n        }\n    }\n"]);return X=function(){return e},e}var Z=function(e){return(0,e.children)(Object(r.a)(e,["children"]))};Z.propTypes={children:o.a.func.isRequired,count:o.a.number.isRequired,unseen:o.a.bool.isRequired,className:o.a.string.isRequired};var ee=Object(E.gql)(X()),te=Object(V.compose)(G.a,Object(z.a)(ee,{mapDataToProps:function(e){var t,n,a,r,i=e.viewer;return{count:null!=(t=null==i?void 0:null==(n=i.account)?void 0:n.notificationCenterUnreadMessageCount)?t:0,unseen:(null!=(a=null==i?void 0:null==(r=i.account)?void 0:r.notificationCenterUnseenMessageCount)?a:0)>0}}}))(Z),ne=function(e){return l.a.createElement(B,Object(a.a)({icon:"envelope","aria-label":"Messages"},e),l.a.createElement(te,null,(function(e){var t=e.count,n=e.unseen,a=e.className;return l.a.createElement(W,{unseen:n,className:a},t)})))},ae=n(1222),re=function(e){return l.a.createElement(B,Object(a.a)({icon:"speech-bubble","aria-label":"Requests"},e),l.a.createElement(ae.a,null,(function(e){var t=e.count,n=e.unseen,a=e.className;return l.a.createElement(W,{unseen:n,className:a},t)})))},ie=n(1219);function oe(){var e=Object(w.a)(["\n    query NotificationCountersPolling($isBusinessAccount: Boolean!) {\n        viewer {\n            ...HeaderSubscriptionsCounter @embed @skip(if: $isBusinessAccount)\n            ...HeaderMessagesCounter @embed\n            ...HeaderRequestsCounter @embed @skip(if: $isBusinessAccount)\n        }\n    }\n"]);return oe=function(){return e},e}var ce=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).handleActivityChange=function(e){var n=t.props.forceRefetch;e?(t.intervalID&&n(),clearInterval(t.intervalID),t.intervalID=setInterval(n,t.props.intervalTime)):clearInterval(t.intervalID)},t}Object(I.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.lifeMonitor=new ie.a(this.handleActivityChange,this.props.inactivityTimeout),this.lifeMonitor.start()},n.componentWillUnmount=function(){this.lifeMonitor.stop(),clearInterval(this.intervalID)},n.render=function(){return null},t}(c.Component);ce.displayName="NotificationCountersPolling",ce.defaultProps={inactivityTimeout:305e3,intervalTime:3e5,isBusinessAccount:!1};var le=Object(E.gql)(oe()),se=Object(V.compose)(G.a,Object(z.a)(le))(ce),ue=n(748),de=n(32),me=n(407),pe=n.n(me);function fe(){pe.a.remove("notificationCounters:1")}var be=n(760),he=n(3215),ve=n(104),ge=n(35);function Ee(){var e=Object(w.a)(["\n            mutation SetRecruiterProfileOnboardingHidden($id: ID!) {\n                setRecruiterProfileOnboardingHidden(id: $id) {\n                    id\n                    flags {\n                        isRecruiterProfileOnboardingHidden\n                    }\n                }\n            }\n        "]);return Ee=function(){return e},e}var Oe=Object(E.withMutation)()((function(e){var t=e.mutate,n=e.accountId,a=e.target,r=e.url,i=l.a.useRef(null);return l.a.createElement(ve.a,{position:"below-right",color:"blue",mode:"none",ref:i,initVisible:!0,target:a,offset:{left:4,top:0},className:"prevent-dropdown"},l.a.createElement(ve.a.Body,{className:"prevent-dropdown"},l.a.createElement(de.a,{justifyContent:"space-between",className:"prevent-dropdown"},l.a.createElement(de.a.Item,{className:"prevent-dropdown"},l.a.createElement(M.a,{size:"l",spacing:"xs",gutter:"m",className:"prevent-dropdown"},"Your profile is here"),l.a.createElement(M.a,{size:"m",className:"prevent-dropdown"},"Decide what researchers see when you contact them.")),l.a.createElement(de.a.Item,{className:"prevent-dropdown"},l.a.createElement(p.a,{type:"button",theme:"bare",color:"white",className:"prevent-dropdown",onClick:function(){return t(function(e){var t=e.id;return{mutation:Object(E.gql)(Ee()),variables:{id:t},optimisticResponse:{setRecruiterProfileOnboardingHidden:{id:t,flags:{isRecruiterProfileOnboardingHidden:!0},__typename:"Account"}}}}({id:n})).catch(ge.default).finally((function(){i.current.hide()}))}},l.a.createElement(p.a.Icon,{identifier:"close"}))))),l.a.createElement(ve.a.Footer,null,l.a.createElement(p.a,{type:"button",theme:"inverted",href:r,className:"prevent-dropdown"},"View profile")))})),ye=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).dropdown=l.a.createRef(),t.state={isTabletOrMobile:!1},t.handleMouseDownOnImage=function(e){var n=t.state.isTabletOrMobile;t.stopDropDownFromOpening=!0,n&&(e.preventDefault(),t.stopDropDownFromOpening=!1)},t.handleMouseDownOnDropdown=function(e){e.preventDefault(),t.stopDropDownFromOpening=t.dropdown.current.classList.contains("prevent-dropdown")},t.getProfileImage=function(){var e=t.props,n=e.showRecruiterProfileOnboardingTooltip,a=e.accountId,r=e.data,i=r.url,o=r.firstName,c=r.imageUrl,s=r.imageUrl2x,u=t.state.isTabletOrMobile,d=l.a.createElement("img",{src:c,srcSet:c+" 1x, "+s+" 2x",alt:o,width:"40",height:"40",style:{borderRadius:"50%"}});return!u&&n?l.a.createElement(Oe,{target:d,accountId:a,url:i}):d},t.handleMatchMedia=function(e){var n=e.matches;t.setState({isTabletOrMobile:n})},t}Object(I.a)(t,e);var n=t.prototype;return n.getItem=function(e){var t=e.widgetId,n=e.title,a=e.url,r=e.counter,i=e.isActive,o=e.onlyMobile,c=this.props,s=c.onlyMobileClassName,u=c.badgeClassName,d=this.state.isTabletOrMobile;return o&&!d?null:t?l.a.createElement(he.a,{widgetId:t},n):l.a.createElement(m.a.Action,{href:a,status:i?"selected":"",className:o?s:null},n,r&&l.a.createElement(_.a,{className:u,color:"grey",size:"s"},r))},n.getContents=function(){var e=this,t=this.props,n=t.items,a=t.linkCreatedTime;return l.a.createElement("ul",null,n.map((function(t,n){var a=t.divider,i=Object(r.a)(t,["divider"]);return l.a.createElement("li",{key:n},a?l.a.createElement(m.a.Divider,null):e.getItem(i))})),l.a.createElement("li",{key:"logout"},l.a.createElement(m.a.Divider,null),l.a.createElement("form",{action:"application.Logout.html?mnu=logout&ct="+a,method:"post"},l.a.createElement(be.a,null),l.a.createElement(m.a.Action,{type:"submit",onClick:fe},"Log out"))))},n.componentDidMount=function(){this.matchMedia=window.matchMedia("(max-width: "+(parseInt(ue.a.getBreakpoint("l"))-1)+"px)"),this.handleMatchMedia({matches:this.matchMedia.matches}),this.matchMedia.addListener(this.handleMatchMedia)},n.componentWillUnmount=function(){this.matchMedia&&this.matchMedia.removeListener(this.handleMatchMedia)},n.render=function(){var e,t=this,n=this.props,a=n.data.url,r=n.showProfileImage,i=n.className,o=n.hasJobPostings,c=n.profileActionsDropdownHasManageJobsMilestone,s=this.state.isTabletOrMobile,u={top:11,left:0};return r?e=l.a.createElement(de.a,{alignItems:"center",gutter:"none",justifyContent:"center"},l.a.createElement(de.a.Item,null,l.a.createElement("a",{href:a,className:i,onClickCapture:this.handleMouseDownOnImage,"aria-label":"Profile"},this.getProfileImage())),s?null:l.a.createElement(de.a.Item,null,l.a.createElement("a",{ref:this.dropdown,href:a,className:i,onClick:this.handleMouseDownOnDropdown,"aria-label":"Profile"},l.a.createElement(f.a,{identifier:"arrow-down",role:"presentation"})))):(u.top+=10,e=l.a.createElement(p.a,{type:"button",theme:"bare",color:"black","aria-label":"Menu"},l.a.createElement(p.a.Icon,{identifier:"arrow-down",role:"presentation"}))),l.a.createElement(m.a,{className:"profile-action-dropdown",position:"right",scope:"local",offset:u,mount:function(e){return e},isResponsive:!1,willEnter:function(e){t.stopDropDownFromOpening||e(),t.stopDropDownFromOpening=!1},didEnter:function(){o&&Object(y.a)(c)},target:e},this.getContents())},t}(c.Component);ye.displayName="ProfileAction";var we=ye,je=n(41),Ce=n.n(je),Ne=n(226),Ie=n.n(Ne),Me=n(16),ke=n(966),Re=n(116),Ae=n(19),Pe=n(64),De=n.n(Pe),Le=n(54),Se=n(25),qe=n(1261),Ue=function(e){var t=e.error;return l.a.createElement(Se.a,{gutter:"xxl",spacing:"xl",gutterOutside:!0,showDivider:!0},l.a.createElement(Se.a.Item,null,l.a.createElement(Se.a,{gutter:"xs",gutterOutside:!0},l.a.createElement(Se.a.Item,null,l.a.createElement(M.a,{size:t?"l":"xl",spacing:"none"},t||"Add your research")))),l.a.createElement(Se.a.Item,null,l.a.createElement(Se.a,{gutter:"xl",gutterOutside:!0},l.a.createElement(qe.a,{width:NaN,type:"multi-line"}))),l.a.createElement(Se.a.Item,null,l.a.createElement(Se.a,{gutter:"xl",gutterOutside:!1},l.a.createElement(Se.a.Item,null,l.a.createElement(qe.a,{width:NaN,type:"multi-line"})),l.a.createElement(Se.a.Item,null,l.a.createElement(qe.a,{width:NaN,type:"multi-line"})),l.a.createElement(Se.a.Item,null,l.a.createElement(qe.a,{width:NaN,type:"multi-line"})),l.a.createElement(Se.a.Item,null,l.a.createElement(qe.a,{width:NaN,type:"multi-line"})),l.a.createElement(Se.a.Item,null,l.a.createElement(qe.a,{width:NaN,type:"multi-line"})),l.a.createElement(Se.a.Item,null,l.a.createElement(qe.a,{width:NaN,type:"multi-line"})))),l.a.createElement(Se.a.Item,null,l.a.createElement(qe.a,{width:NaN,type:"multi-line"})))},xe=n(990),Te=n(2934),He=(n(4669),function(){return Promise.all([n.e(14),n.e(32)]).then(n.bind(null,5838))}),Fe=new P.a("content-creation-sidebar"),Be=function(e){e(Object(ke.d)(!1,"ContentCreationSidebar"))},_e=function(e){var t=e.dispatch,n=e.loadingState,r=e.setLoadingState;return l.a.createElement("div",Object(a.a)({key:"sidebar"},Fe()),l.a.createElement("div",Fe("wrapper"),l.a.createElement("div",Object(a.a)({onClick:function(){return Be(t)}},Fe("close-button")),l.a.createElement(f.a,{identifier:"close"})),l.a.createElement(Le.a,{url:"application.GlobalSidebar.html",renderPreloader:!1,destroyOnUnmount:!1,onLoad:function(){return r(0)},onError:function(){return r(1)},__internalLoadComponent:He}),0!==n&&l.a.createElement(Ue,{error:1===n?xe.d:null})),l.a.createElement("div",Object(a.a)({onClick:function(){return Be(t)}},Fe("overlay"))))},We=Object(Ae.connect)(Te.a)((function(e){var t=e.isOpen,n=e.dispatch,a=Object(c.useState)(-1),r=a[0],i=a[1],o=null;return t&&(o=l.a.createElement(_e,{dispatch:n,loadingState:r,setLoadingState:i})),l.a.createElement(De.a,{transitionName:"sidebar",transitionEnterTimeout:300,transitionLeaveTimeout:300},o)})),ze=(n(4670),function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={unclaimedItem:null},t.handleClick=function(){var e=t.props,n=e.dispatch,a=e.origin,r=e.milestoneSidebarOpenedParams,i=e.payload,o=e.onClick;n(Object(ke.d)(!0,a)),t.startExperiment().then((function(){Object(y.a)(r),Ce()(i)||Object(Re.a)(i)})),t.setState({unclaimedItem:null}),Object(Me.post)(t.props.hideUnclaimedCounterUrl),o&&o()},t}Object(I.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;this.props.showUnclaimedCounter&&Object(Me.get)(this.props.unclaimedUrl,{viewId:this.props.viewId}).then((function(t){t.success&&e.setState({unclaimedItem:t.result})}))},n.startExperiment=function(){var e=Ie()(this.props.viewId);return Object(Me.post)(this.props.startExperimentUrl,{viewId:e})},n.render=function(){var e=["content-creation-button"];this.props.origin&&e.push("content-creation-button-"+this.props.origin);var t=["notification-indicator"];return this.state.unclaimedItem&&"10+"===this.state.unclaimedItem.badge&&t.push("notification-indicator-wider"),[l.a.createElement("div",{className:"content-creation-button-wrapper",key:"content-creation-button"},this.state.unclaimedItem&&l.a.createElement("span",{className:t.join(" ")},l.a.createElement("span",{className:"number"},this.state.unclaimedItem.badge)),l.a.createElement(p.a,{type:"button",size:"s",className:e.join(" "),onClick:this.handleClick},l.a.createElement(p.a.Icon,{identifier:"plus-circle"}),l.a.createElement(p.a.Label,null,"Add new"))),l.a.createElement(We,{key:"content-creation-sidebar"})]},t}(c.Component));ze.displayName="ContentCreationButton";var Ve=Object(s.a)()(ze),Ge=function(e){var t=l.a.useRef(null);return l.a.createElement(ve.a,Object(a.a)({position:"below-right",color:"blue",mode:"none",ref:t,initVisible:!0},e),l.a.createElement(ve.a.Body,null,l.a.createElement(M.a,{size:"l",spacing:"xs"},l.a.createElement("b",null,"View your ad campaigns")),l.a.createElement(M.a,null,'Use the new "Business" menu item to go to your business, manage campaigns, and view reports.')),l.a.createElement(ve.a.Footer,null,l.a.createElement(p.a,{type:"button",theme:"inverted",onClick:function(){Object(Me.post)("/businessApi/saveHeaderBusinessTooltipView").finally((function(){t.current.hide()}))}},"Got it")))},Je=function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(14),n.e(36)]).then(n.bind(null,5243))},$e=function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(14),n.e(34)]).then(n.bind(null,5268))},Qe=function(){return Promise.all([n.e(0),n.e(1),n.e(3),n.e(14),n.e(35)]).then(n.bind(null,5257))},Ye=Object(E.withMutation)()((function(e){var t=e.contentCreationButton,n=e.isBusinessAccount,r=e.fullName,i=e.institutionName,o=e.profileInfo,c=e.profileLinks,s=e.linkCreatedTime,u=e.notificationURLs,d=e.accountRgKey,m=e.milestones,p=e.hasJobPostings,f=e.showBusinessTooltip,b=e.isCandidateSearchEnabled,h=e.showRecruiterProfileOnboardingTooltip,v=e.mutate,w=e.bem,I=[];n&&!b&&I.push(l.a.createElement("li",Object(a.a)({},w("nav-action"),{key:"business-account"}),l.a.createElement(g.a,{type:"inline",spacing:"none",size:"s"},l.a.createElement(g.a.Item,null,r),i?l.a.createElement(g.a.Item,null,i):null)));var M=u.updates,k=u.messages,R=u.requests;return n||I.push(l.a.createElement("li",Object(a.a)({},w("nav-action","compact"),{key:"notification-subscriptions"}),l.a.createElement(x,{asyncWidget:l.a.createElement(O.a,{url:"application.HeaderSubscriptionsList.html",__internalLoadComponent:Je}),orderRight:3,onClick:function(){var e;v((e=d,{mutation:Object(E.gql)(N()),optimisticResponse:{markNotificationCenterSubscriptionsAsSeen:{__typename:"Account",id:e,subscriptionFeedUnreadCount:0}}})),Object(y.a)(m.notificationDropdown)}},l.a.createElement(K,{href:M})))),n&&!b||I.push(l.a.createElement("li",Object(a.a)({},w("nav-action","compact"),{key:"notification-messages"}),l.a.createElement(x,{asyncWidget:l.a.createElement(O.a,{url:"application.HeaderMessagesList.html",__internalLoadComponent:$e}),orderRight:2,onClick:function(){var e;v((e=d,{mutation:Object(E.gql)(C()),optimisticResponse:{markNotificationCenterMessagesAsSeen:{__typename:"Account",id:e,notificationCenterUnseenMessageCount:0}}})),Object(y.a)(m.messageDropdown)}},l.a.createElement(ne,{href:k})))),n||I.push(l.a.createElement("li",Object(a.a)({},w("nav-action","compact-hideable"),{key:"notification-requests"}),l.a.createElement(x,{asyncWidget:l.a.createElement(O.a,{url:"application.HeaderRequestsList.html",__internalLoadComponent:Qe}),orderRight:1,onClick:function(){var e;v((e=d,{mutation:Object(E.gql)(j()),optimisticResponse:{markNotificationCenterRequestsAsSeen:{__typename:"Account",id:e,notificationCenterPendingRequestsUnseen:!1}}})),Object(y.a)(m.requestDropdown)}},l.a.createElement(re,{href:R})))),n&&!b||I.push(l.a.createElement(se,{key:"notification-counters-polling",isBusinessAccount:n})),I.push(l.a.createElement("li",Object(a.a)({},w("nav-action"),{key:"profile-action"}),f?l.a.createElement(Ge,Object(a.a)({target:l.a.createElement("span",null)},w("business-tooltip"))):null,l.a.createElement(we,Object(a.a)({},w("nav-profile"),{badgeClassName:w("nav-profile-badge").className,onlyMobileClassName:w("nav-profile-only-mobile").className,data:o,items:c,showProfileImage:!n||b,linkCreatedTime:s,hasJobPostings:p,profileActionsDropdownHasManageJobsMilestone:m.profileActionsDropdownHasManageJobs,showRecruiterProfileOnboardingTooltip:h,accountId:d})))),t&&I.push(l.a.createElement("li",Object(a.a)({},w("nav-action","mup"),{key:"content-creation-action"}),l.a.createElement(Ve,{widgetId:t}))),I})),Ke=(n(4671),new P.a("header-logged-in")),Xe=Object(s.a)()((function(e){var t=e.isBasicHeader,n=e.brandUrl,i=e.searchUrl,o=e.searchFormUrl,c=e.viewId,s=e.isBusinessAccount,m=e.mainLinks,p=e.dropdownLinks,f=e.dispatch,b=Object(r.a)(e,["isBasicHeader","brandUrl","searchUrl","searchFormUrl","viewId","isBusinessAccount","mainLinks","dropdownLinks","dispatch"]);return l.a.createElement("header",Ke(),l.a.createElement("a",Object(a.a)({},Ke("logo"),{href:n}),l.a.createElement("img",{src:u,alt:"ResearchGate logo",width:"124",height:"17"})),!t&&l.a.createElement("nav",Object(a.a)({},Ke("nav"),{"aria-label":"Main"}),l.a.createElement("ul",Ke("nav-list"),l.a.createElement(d.a,{items:m,dispatch:f,bem:Ke}),l.a.createElement(h,{items:p,bem:Ke})),!s&&l.a.createElement("div",Ke({element:"nav-search",extra:"search-float-center"}),l.a.createElement(v.a,{url:i,formUrl:o,viewId:c})),l.a.createElement("ul",Ke("nav-actions"),l.a.createElement(Ye,Object(a.a)({isBusinessAccount:s,bem:Ke},b)))))})),Ze=n(30);window["renderReact_application/HeaderLoggedIn"]=function(e){Object(Ze.renderForClient)(Xe,e)}},760:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(3),r=n(0),i=n.n(r),o=n(504),c=function(e){function t(t){var n;return(n=e.call(this,t)||this).tokenListener=function(e){n.setState({token:e})},n.state={token:o.a.get()},n}Object(a.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){o.a.addListener("update",this.tokenListener)},n.componentWillUnmount=function(){o.a.removeListener("update",this.tokenListener)},n.render=function(){var e=this.state.token;return i.a.createElement("input",{type:"hidden",name:"request_token",value:e})},t}(r.Component);c.displayName="CSRFHiddenFormField"},821:function(e,t,n){"use strict";var a=n(3),r=n(0),i=n.n(r),o=n(2),c=n(449),l=function(e,t){return function(n){var l,s,u=Object(o.withQuery)(e,t)(n);return s=l=function(e){function t(){return e.apply(this,arguments)||this}return Object(a.a)(t,e),t.prototype.render=function(){return i.a.createElement(c.a,null,i.a.createElement(u,this.props))},t}(r.Component),l.displayName="WithQueryBoundary",s}};n.d(t,"a",(function(){return l}))}},[[4753,2,0,1,3]]]);