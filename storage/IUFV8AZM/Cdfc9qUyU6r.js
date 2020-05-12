if (self.CavalryLogger) { CavalryLogger.start_js(["CaEdD"]); }

__d('CompositeDraftDecorator',['immutable'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('immutable').List,i='.';function j(m){this.$CompositeDraftDecorator1=m.slice();}j.prototype.getDecorations=function(m){var n=Array(m.getText().length).fill(null);this.$CompositeDraftDecorator1.forEach(function(o,p){var q=0,r=o.strategy;r(m,function(s,t){if(k(n,s,t)){l(n,s,t,p+i+q);q++;}});});return h(n);};j.prototype.getComponentForKey=function(m){var n=parseInt(m.split(i)[0],10);return this.$CompositeDraftDecorator1[n].component;};j.prototype.getPropsForKey=function(m){var n=parseInt(m.split(i)[0],10);return this.$CompositeDraftDecorator1[n].props;};function k(m,n,o){for(var p=n;p<o;p++)if(m[p]!=null)return false;return true;}function l(m,n,o,p){for(var q=n;q<o;q++)m[q]=p;}f.exports=j;},null);
__d('DraftEntityInstance',['immutable'],function a(b,c,d,e,f,g){'use strict';var h,i;if(c.__markCompiled)c.__markCompiled();var j=c('immutable').Record,k=j({type:'TOKEN',mutability:'IMMUTABLE',data:Object});h=babelHelpers.inherits(l,k);i=h&&h.prototype;l.prototype.getType=function(){return this.get('type');};l.prototype.getMutability=function(){return this.get('mutability');};l.prototype.getData=function(){return this.get('data');};function l(){h.apply(this,arguments);}f.exports=l;},null);
__d('DraftEntity',['invariant','DraftEntityInstance','immutable'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();var i=c('immutable').Map,j=i(),k=0,l={create:function(m,n,o){return l.add(new (c('DraftEntityInstance'))({type:m,mutability:n,data:o||{}}));},add:function(m){var n=''+ ++k;j=j.set(n,m);return n;},get:function(m){var n=j.get(m);!!!n?h(0):void 0;return n;},mergeData:function(m,n){var o=l.get(m),p=babelHelpers['extends']({},o.getData(),n),q=o.set('data',p);j=j.set(m,q);return q;},replaceData:function(m,n){var o=l.get(m),p=o.set('data',n);j=j.set(m,p);return p;}};f.exports=l;},null);
__d('EmoticonSpan.react',['cx','DraftEntity','React','joinClasses'],function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;k.prototype.render=function(){'use strict';var l=c('DraftEntity').get(this.props.entityKey),m=l.getData(),n=m.type,o=c('joinClasses')("_1ty6",'emoticon_'+n);return (c('React').createElement('span',{className:o,title:n,'data-offset-key':this.props.offsetKey},c('React').createElement('span',{className:"_5ukz"},this.props.children)));};function k(){'use strict';i.apply(this,arguments);}f.exports=k;},null);
__d('HashtagSpan.react',['cx','React'],function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;k.prototype.render=function(){'use strict';return (c('React').createElement('span',babelHelpers['extends']({},this.props,{'data-offset-key':this.props.offsetKey,className:"_5u8n",spellCheck:false}),this.props.children));};function k(){'use strict';i.apply(this,arguments);}f.exports=k;},null);
__d('MentionSpan.react',['cx','React'],function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;k.prototype.render=function(){'use strict';return (c('React').createElement('span',babelHelpers['extends']({},this.props,{'data-offset-key':this.props.offsetKey,className:"_5u8u",spellCheck:false}),this.props.children));};function k(){'use strict';i.apply(this,arguments);}f.exports=k;},null);
__d('WeakMentionSpan.react',['cx','React'],function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;k.prototype.render=function(){'use strict';return (c('React').createElement('span',{'data-offset-key':this.props.offsetKey,className:"_whq",spellCheck:false},this.props.children));};function k(){'use strict';i.apply(this,arguments);}f.exports=k;},null);
__d('getEntityMatcher',['DraftEntity'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=c('DraftEntity').get;function i(j,k){var l=k||h;return function(m,n){m.findEntityRanges(function(o){var p=o.getEntity();return typeof p==='string'&&j(l(p));},n);};}f.exports=i;},null);
__d('getHashtagMatches',['getHashtagRegex'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h=c('getHashtagRegex')();function i(j,k){var l=j.getText(),m,n,o,p;while((m=h.exec(l))!==null){n=m.index+m[1].length;o=m[2];p=m[3];k(n,n+o.length+p.length);}}f.exports=i;},null);
__d('getMentionsInputDecorator',['CompositeDraftDecorator','EmoticonSpan.react','HashtagSpan.react','MentionSpan.react','WeakMentionSpan.react','getEntityMatcher','getHashtagMatches'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();var h;function i(){if(!h)h=new (c('CompositeDraftDecorator'))([{strategy:c('getEntityMatcher')(function(j){var k=j.getData();return j.getType()==='MENTION'&&k&&k.isWeak;}),component:c('WeakMentionSpan.react')},{strategy:c('getEntityMatcher')(function(j){return j.getType()==='MENTION';}),component:c('MentionSpan.react')},{strategy:c('getEntityMatcher')(function(j){return j.getType()==='EMOTICON';}),component:c('EmoticonSpan.react')},{strategy:c('getHashtagMatches'),component:c('HashtagSpan.react')}]);return h;}f.exports=i;},null);
__d('Alignment',['invariant','DOMVector','Style','containsNode'],function a(b,c,d,e,f,g,h){if(c.__markCompiled)c.__markCompiled();function i(k,l,m){'use strict';this.$Anchor1=l;this.$Anchor2=m;this.$Anchor3=k;}i.prototype.getElement=function(){'use strict';return this.$Anchor3;};i.prototype.getX=function(){'use strict';return this.$Anchor1;};i.prototype.getY=function(){'use strict';return this.$Anchor2;};i.prototype.isCorner=function(){'use strict';return ((this.$Anchor1===i.LEFT||this.$Anchor1===i.RIGHT)&&(this.$Anchor2===i.TOP||this.$Anchor2===i.BOTTOM));};i.prototype.getPosition=function(k){'use strict';return c('DOMVector').getElementPosition(this.$Anchor3,k).add(this.getX()*this.$Anchor3.offsetWidth,this.getY()*this.$Anchor3.offsetHeight);};Object.assign(i,{LEFT:0,CENTER:.5,RIGHT:1,TOP:0,MIDDLE:.5,BOTTOM:1});function j(k,l,m){'use strict';this.$Alignment1=k;this.$Alignment2=l;this.$Alignment3=m;!c('containsNode')(k.getElement(),l.getElement())?h(0):void 0;!k.isCorner()?h(0):void 0;}j.prototype.align=function(){'use strict';j.$Alignment4(this.$Alignment1,function(){return j.measure(this.$Alignment2,this.$Alignment3);}.bind(this));};j.$Alignment4=function(k,l){'use strict';var m=k.getElement();c('Style').apply(m,{left:k.getX()===i.LEFT?'0':'',right:k.getX()===i.RIGHT?'0':'',top:k.getY()===i.TOP?'0':'',bottom:k.getY()===i.BOTTOM?'0':''});var n=l();if(k.getX()===i.LEFT){c('Style').set(m,'left',n.x+'px');}else if(k.getX()===i.RIGHT)c('Style').set(m,'right',-n.x+'px');if(k.getY()===i.TOP){c('Style').set(m,'top',n.y+'px');}else if(k.getY()===i.BOTTOM)c('Style').set(m,'bottom',-n.y+'px');};j.position=function(k,l){'use strict';j.$Alignment4(k,function(){var m=c('DOMVector').getElementPosition(k.getElement());return l.convertTo('document').sub(m);});};j.measure=function(k,l){'use strict';var m=k.getPosition('document'),n=l.getPosition('document');return n.sub(m);};j.Anchor=i;f.exports=j;},null);
__d('SingleSelectorBase',['csx','cx','invariant','ArbiterMixin','Alignment','BehaviorsMixin','Button','CSS','DOM','DOMQuery','Event','Layer','LayerBounds','Locale','Rect','ParameterizedPopover','PopoverMenu','Scroll','SelectableMenuUtils','Style','getOverlayZIndex','mixin','throttle'],function a(b,c,d,e,f,g,h,i,j){var k,l;if(c.__markCompiled)c.__markCompiled();var m=c('Alignment').Anchor,n=c('Locale').isRTL()?m.RIGHT:m.LEFT,o=16;k=babelHelpers.inherits(p,c('mixin')(c('ArbiterMixin'),c('BehaviorsMixin')));l=k&&k.prototype;function p(r,s,t,u){'use strict';l.constructor.call(this);this.$SingleSelectorBase1=r;this.$SingleSelectorBase2=null;this.$SingleSelectorBase3=c('DOM').create('div',{});this.$SingleSelectorBase4=new (c('Layer'))({classNames:["_5xew"]},this.$SingleSelectorBase3);this.$SingleSelectorBase5=new (c('ParameterizedPopover'))(r.parentNode,r,[],babelHelpers['extends']({},t,{layer:this.$SingleSelectorBase4}));this.$SingleSelectorBase5.subscribe('show',this.$SingleSelectorBase6.bind(this));this.$SingleSelectorBase5.subscribe('hide',this.$SingleSelectorBase7.bind(this));this.$SingleSelectorBase8=new (c('PopoverMenu'))(this.$SingleSelectorBase5,r,s,[]);this.setMenu(s);if(u&&u.behaviors)this.enableBehaviors(u.behaviors);}p.prototype.$SingleSelectorBase6=function(){'use strict';this.$SingleSelectorBase9();this.$SingleSelectorBase10();c('CSS').conditionClass(this.$SingleSelectorBase4.getRoot(),"_5xex",this.$SingleSelectorBase11());c('Style').set(this.$SingleSelectorBase4.getRoot(),'min-width',this.$SingleSelectorBase1.offsetWidth+o+'px');var r=c('DOM').scry(this.$SingleSelectorBase3,'div.uiScrollableAreaWrap')[0];if(r){var s=c('Alignment').measure(new m(this.$SingleSelectorBase12(),n,m.MIDDLE),new m(this.$SingleSelectorBase2.getRoot(),n,m.MIDDLE));c('Scroll').setTop(r,c('Scroll').getTop(r)-s.y);}this.align();this.getMenu().focusAnItem();if(!this.$SingleSelectorBase13)this.$SingleSelectorBase13=c('Event').listen(window,'resize',c('throttle')(this.align.bind(this)));this.inform('show');};p.prototype.$SingleSelectorBase7=function(){'use strict';if(this.$SingleSelectorBase13){this.$SingleSelectorBase13.remove();this.$SingleSelectorBase13=null;}this.inform('hide');};p.prototype.$SingleSelectorBase14=function(r,s){'use strict';this.$SingleSelectorBase15=null;if(!this.$SingleSelectorBase16)this.inform('change',s);};p.prototype.isShown=function(){'use strict';return this.$SingleSelectorBase5.isShown();};p.prototype.setValue=function(r){'use strict';if(this.isShown()){this.$SingleSelectorBase17(r,false);}else{this.$SingleSelectorBase18=r;this.$SingleSelectorBase19=false;}};p.prototype.setValueWithoutChange=function(r){'use strict';if(this.isShown()){this.$SingleSelectorBase17(r,true);}else{this.$SingleSelectorBase18=r;this.$SingleSelectorBase19=true;}};p.prototype.$SingleSelectorBase10=function(){'use strict';if(this.$SingleSelectorBase18){this.$SingleSelectorBase17(this.$SingleSelectorBase18,this.$SingleSelectorBase19);this.$SingleSelectorBase18=null;}};p.prototype.$SingleSelectorBase17=function(r,s){'use strict';this.$SingleSelectorBase16=s;this.$SingleSelectorBase2.setValue(r);this.$SingleSelectorBase16=null;};p.prototype.getValue=function(){'use strict';return this.getSelectedItem().getValue();};p.prototype.getLayer=function(){'use strict';return this.$SingleSelectorBase4;};p.prototype.getButton=function(){'use strict';return this.$SingleSelectorBase1;};p.prototype.setMenu=function(r){'use strict';if(this.isShown()){this.$SingleSelectorBase20(r);}else this.$SingleSelectorBase21=r;};p.prototype.$SingleSelectorBase9=function(){'use strict';if(this.$SingleSelectorBase21){this.$SingleSelectorBase20(this.$SingleSelectorBase21);this.$SingleSelectorBase21=null;}};p.prototype.$SingleSelectorBase20=function(r){'use strict';if(r!==this.$SingleSelectorBase2){this.$SingleSelectorBase2=r;if(this.$SingleSelectorBase22)this.$SingleSelectorBase22.unsubscribe();this.$SingleSelectorBase22=this.$SingleSelectorBase2.subscribe('change',this.$SingleSelectorBase14.bind(this));c('DOM').setContent(this.$SingleSelectorBase3,r.getRoot());this.$SingleSelectorBase8.setMenu(r);this.$SingleSelectorBase15=null;}};p.prototype.getMenu=function(){'use strict';return this.$SingleSelectorBase21||this.$SingleSelectorBase2;};p.prototype.enable=function(){'use strict';c('Button').setEnabled(this.$SingleSelectorBase1,true);this.$SingleSelectorBase5.enable();};p.prototype.disable=function(){'use strict';c('Button').setEnabled(this.$SingleSelectorBase1,false);this.$SingleSelectorBase5.disable();};p.prototype.$SingleSelectorBase11=function(){'use strict';return (c('Style').isFixed(this.$SingleSelectorBase1)&&!c('Style').isFixed(this.$SingleSelectorBase4.getRoot().parentNode));};p.prototype.align=function(){'use strict';if(!this.$SingleSelectorBase15)this.$SingleSelectorBase15=this.getAlignment();this.$SingleSelectorBase15.align();var r=c('Rect').getElementBounds(this.$SingleSelectorBase2.getRoot()),s=c('LayerBounds').getViewportRectForContext(this.$SingleSelectorBase1),t=r.t-s.t,u=s.b-r.b,v=r.l-s.l,w=s.r-r.r,x=this.$SingleSelectorBase4.getRoot();if(t<10){q(x,'top',-t+10);}else if(u<10)q(x,'top',u-10);if(v<10){q(x,'left',-v+10);}else if(w<10)q(x,'left',w-10);var y=c('getOverlayZIndex')(this.$SingleSelectorBase1,this.$SingleSelectorBase4.getInsertParent());c('Style').set(this.$SingleSelectorBase4.getRoot(),'z-index',y>200?y:'');};p.prototype.getAlignment=function(){'use strict';return new (c('Alignment'))(new m(this.$SingleSelectorBase4.getRoot(),m.TOP,m.LEFT),new m(this.$SingleSelectorBase12(),n,m.MIDDLE),new m(this.$SingleSelectorBase23(),n,m.MIDDLE));};p.prototype.$SingleSelectorBase23=function(){'use strict';return c('DOMQuery').find(this.$SingleSelectorBase1,"._55pe");};p.prototype.getSelectedItem=function(){'use strict';var r=null;if(this.$SingleSelectorBase18){this.getMenu().forEachItem(function(s){if(s.getValue()===this.$SingleSelectorBase18){!(r===null)?j(0):void 0;r=s;}}.bind(this));}else this.getMenu().forEachItem(function(s){if(c('SelectableMenuUtils').isSelected(s)){!(r===null)?j(0):void 0;r=s;}});!(r!==null)?j(0):void 0;return r;};p.prototype.$SingleSelectorBase12=function(){'use strict';return c('DOMQuery').find(this.getSelectedItem().getRoot(),"._54nh");};p.prototype.destroy=function(){'use strict';this.$SingleSelectorBase2&&this.$SingleSelectorBase2.destroy();this.$SingleSelectorBase5.destroy();this.$SingleSelectorBase4.destroy();};function q(r,s,t){c('Style').set(r,s,c('Style').getFloat(r,s)+t+'px');}f.exports=p;},null);
__d('XUISingleSelectorButton.react',['ix','Image.react','React','XUIPopoverButton.react'],function a(b,c,d,e,f,g,h){var i,j;if(c.__markCompiled)c.__markCompiled();i=babelHelpers.inherits(k,c('React').Component);j=i&&i.prototype;k.prototype.render=function(){'use strict';return (c('React').createElement(c('XUIPopoverButton.react'),babelHelpers['extends']({},this.props,{chevron:c('React').createElement(c('Image.react'),{src:h('/images/ui/x/selector/chevron.png')})})));};function k(){'use strict';i.apply(this,arguments);}f.exports=k;},null);
__d('XUISingleSelector.react',['InlineBlock.react','React','ReactDOM','ReactSelectorUtils','ReactXUIMenu','SingleSelectorBase','SubscriptionsHandler','XUISingleSelectorButton.react','areEqual','cloneWithProps_DEPRECATED'],function a(b,c,d,e,f,g){var h,i;if(c.__markCompiled)c.__markCompiled();var j=c('React').PropTypes,k=c('ReactXUIMenu').SelectableMenu,l=c('ReactXUIMenu').SelectableItem;h=babelHelpers.inherits(m,c('React').Component);i=h&&h.prototype;function m(){var n,o;'use strict';for(var p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];return n=(o=i.constructor).call.apply(o,[this].concat(q)),this.$XUISingleSelector1=null,this.$XUISingleSelector2=null,this.$XUISingleSelector3=null,this.flattenMenuItems=function(){return c('React').Children.toArray(this.props.children).filter(function(s){return s;});}.bind(this),this.processMenuItems=function(){return c('ReactSelectorUtils').processMenuItems(this.flattenMenuItems(),this.getValue());}.bind(this),this.setMenuValue=function(s){this.$XUISingleSelector2.setValueWithoutChange(s);}.bind(this),this.getValue=function(){return this.props.value!==undefined?this.props.value:this.state.value;}.bind(this),this.onChange=function(s,t){if(this.props.value===undefined){this.setState({value:t.value});}else this.setMenuValue(this.props.value);if(this.props.onChange)this.props.onChange(t);}.bind(this),this.$XUISingleSelector4=function(){var s=c('React').createElement(k,{maxheight:this.props.maxheight},this.processMenuItems().items);return new s.type(s.props);}.bind(this),this.state={value:this.props.value!==undefined?this.props.value:this.props.defaultValue!==undefined?this.props.defaultValue:this.flattenMenuItems()[0].props.value},n;}m.prototype.componentWillReceiveProps=function(){'use strict';if(this.props.value!==undefined)this.setState({value:this.props.value});};m.prototype.componentDidMount=function(){'use strict';var n=c('ReactDOM').findDOMNode(this.refs.button);this.$XUISingleSelector2=new (c('SingleSelectorBase'))(n,this.$XUISingleSelector4(),{disabled:this.props.disabled},{behaviors:this.props.behaviors});this.$XUISingleSelector3=new (c('SubscriptionsHandler'))();this.$XUISingleSelector3.addSubscriptions(this.$XUISingleSelector2.subscribe('change',this.onChange));if(this.props.onShow)this.$XUISingleSelector3.addSubscriptions(this.$XUISingleSelector2.subscribe('show',this.props.onShow));if(this.props.onHide)this.$XUISingleSelector3.addSubscriptions(this.$XUISingleSelector2.subscribe('hide',this.props.onHide));};m.prototype.componentDidUpdate=function(n){'use strict';if(!c('areEqual')(n.children,this.props.children))this.$XUISingleSelector2.setMenu(this.$XUISingleSelector4());if(n.disabled!==this.props.disabled)if(!this.props.disabled){this.$XUISingleSelector2.enable();}else this.$XUISingleSelector2.disable();this.setMenuValue(this.getValue());};m.prototype.componentWillUnmount=function(){'use strict';this.$XUISingleSelector2.destroy();if(this.$XUISingleSelector3){this.$XUISingleSelector3.release();this.$XUISingleSelector3=null;}};m.prototype.render=function(){'use strict';var n=this.processMenuItems().selectedItem,o;if(n.props.icon)o=c('cloneWithProps_DEPRECATED')(n.props.icon,{});var p={ref:'button',label:n.props.label||n.props.children,image:o},q=void 0;if(this.props.customButton){q=c('React').cloneElement(this.props.customButton,p);}else q=c('React').createElement(c('XUISingleSelectorButton.react'),babelHelpers['extends']({},p,{disabled:this.props.disabled,size:this.props.size,suppressed:this.props.suppressed,maxwidth:this.props.maxwidth}));return (c('React').createElement(c('InlineBlock.react'),babelHelpers['extends']({},this.props,{alignv:'middle'}),c('React').createElement('input',{type:'hidden',autoComplete:'off',name:this.props.name,value:n.props.value}),q));};m.propTypes={name:j.string,maxheight:j.number,maxwidth:j.number,defaultValue:j.any,disabled:j.bool,size:j.oneOf(['small','medium','large','xlarge','xxlarge']),suppressed:j.bool,value:j.any,onChange:j.func,onShow:j.func,onHide:j.func,behaviors:j.array,customButton:j.element};m.defaultProps={disabled:false,size:'medium'};m.Option=l;f.exports=m;},null);
__d('BlockMapBuilder',['immutable'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('immutable').OrderedMap,i={createFromArray:function(j){return h(j.map(function(k){return [k.getKey(),k];}));}};f.exports=i;},null);
__d('CharacterMetadata',['immutable'],function a(b,c,d,e,f,g){'use strict';var h,i;if(c.__markCompiled)c.__markCompiled();var j=c('immutable').Map,k=c('immutable').OrderedSet,l=c('immutable').Record,m=k(),n={style:m,entity:null},o=l(n);h=babelHelpers.inherits(p,o);i=h&&h.prototype;p.prototype.getStyle=function(){return this.get('style');};p.prototype.getEntity=function(){return this.get('entity');};p.prototype.hasStyle=function(s){return this.getStyle().has(s);};p.applyStyle=function(s,t){var u=s.set('style',s.getStyle().add(t));return p.create(u);};p.removeStyle=function(s,t){var u=s.set('style',s.getStyle().remove(t));return p.create(u);};p.applyEntity=function(s,t){var u=s.getEntity()===t?s:s.set('entity',t);return p.create(u);};p.create=function(s){if(!s)return q;var t=j({style:m,entity:null}).merge(s),u=r.get(t);if(u)return u;var v=new p(t);r=r.set(t,v);return v;};function p(){h.apply(this,arguments);}var q=new p(),r=j([[j(n),q]]);p.EMPTY=q;f.exports=p;},null);
__d('findRangesImmutable',[],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();function h(i,j,k,l){if(!i.size)return;var m=0;i.reduce(function(n,o,p){if(!j(n,o)){if(k(n))l(m,p);m=p;}return o;});k(i.last())&&l(m,i.count());}f.exports=h;},null);
__d('ContentBlock',['immutable','findRangesImmutable'],function a(b,c,d,e,f,g){'use strict';var h,i;if(c.__markCompiled)c.__markCompiled();var j=c('immutable').List,k=c('immutable').Map,l=c('immutable').OrderedSet,m=c('immutable').Record,n=l(),o={key:'',type:'unstyled',text:'',characterList:j(),depth:0,data:k()},p=m(o);h=babelHelpers.inherits(q,p);i=h&&h.prototype;q.prototype.getKey=function(){return this.get('key');};q.prototype.getType=function(){return this.get('type');};q.prototype.getText=function(){return this.get('text');};q.prototype.getCharacterList=function(){return this.get('characterList');};q.prototype.getLength=function(){return this.getText().length;};q.prototype.getDepth=function(){return this.get('depth');};q.prototype.getData=function(){return this.get('data');};q.prototype.getInlineStyleAt=function(t){var u=this.getCharacterList().get(t);return u?u.getStyle():n;};q.prototype.getEntityAt=function(t){var u=this.getCharacterList().get(t);return u?u.getEntity():null;};q.prototype.findStyleRanges=function(t,u){c('findRangesImmutable')(this.getCharacterList(),r,t,u);};q.prototype.findEntityRanges=function(t,u){c('findRangesImmutable')(this.getCharacterList(),s,t,u);};function q(){h.apply(this,arguments);}function r(t,u){return t.getStyle()===u.getStyle();}function s(t,u){return t.getEntity()===u.getEntity();}f.exports=q;},null);
__d('SelectionState',['immutable'],function a(b,c,d,e,f,g){'use strict';var h,i;if(c.__markCompiled)c.__markCompiled();var j=c('immutable').Record,k={anchorKey:'',anchorOffset:0,focusKey:'',focusOffset:0,isBackward:false,hasFocus:false},l=j(k);h=babelHelpers.inherits(m,l);i=h&&h.prototype;m.prototype.serialize=function(){return ('Anchor: '+this.getAnchorKey()+':'+this.getAnchorOffset()+', '+'Focus: '+this.getFocusKey()+':'+this.getFocusOffset()+', '+'Is Backward: '+String(this.getIsBackward())+', '+'Has Focus: '+String(this.getHasFocus()));};m.prototype.getAnchorKey=function(){return this.get('anchorKey');};m.prototype.getAnchorOffset=function(){return this.get('anchorOffset');};m.prototype.getFocusKey=function(){return this.get('focusKey');};m.prototype.getFocusOffset=function(){return this.get('focusOffset');};m.prototype.getIsBackward=function(){return this.get('isBackward');};m.prototype.getHasFocus=function(){return this.get('hasFocus');};m.prototype.hasEdgeWithin=function(n,o,p){var q=this.getAnchorKey(),r=this.getFocusKey();if(q===r&&q===n){var s=this.getStartOffset(),t=this.getEndOffset();return o<=t&&s<=p;}if(n!==q&&n!==r)return false;var u=n===q?this.getAnchorOffset():this.getFocusOffset();return o<=u&&p>=u;};m.prototype.isCollapsed=function(){return (this.getAnchorKey()===this.getFocusKey()&&this.getAnchorOffset()===this.getFocusOffset());};m.prototype.getStartKey=function(){return this.getIsBackward()?this.getFocusKey():this.getAnchorKey();};m.prototype.getStartOffset=function(){return this.getIsBackward()?this.getFocusOffset():this.getAnchorOffset();};m.prototype.getEndKey=function(){return this.getIsBackward()?this.getAnchorKey():this.getFocusKey();};m.prototype.getEndOffset=function(){return this.getIsBackward()?this.getAnchorOffset():this.getFocusOffset();};m.createEmpty=function(n){return new m({anchorKey:n,anchorOffset:0,focusKey:n,focusOffset:0,isBackward:false,hasFocus:false});};function m(){h.apply(this,arguments);}f.exports=m;},null);
__d('generateRandomKey',[],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h={},i=Math.pow(2,24);function j(){var k=void 0;while(k===undefined||h.hasOwnProperty(k)||!isNaN(+k))k=Math.floor(Math.random()*i).toString(32);h[k]=true;return k;}f.exports=j;},null);
__d('sanitizeDraftText',[],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=new RegExp('\r','g');function i(j){return j.replace(h,'');}f.exports=i;},null);
__d('ContentState',['BlockMapBuilder','CharacterMetadata','ContentBlock','immutable','SelectionState','generateRandomKey','sanitizeDraftText'],function a(b,c,d,e,f,g){'use strict';var h,i;if(c.__markCompiled)c.__markCompiled();var j=c('immutable').List,k=c('immutable').Record,l=c('immutable').Repeat,m={blockMap:null,selectionBefore:null,selectionAfter:null},n=k(m);h=babelHelpers.inherits(o,n);i=h&&h.prototype;o.prototype.getBlockMap=function(){return this.get('blockMap');};o.prototype.getSelectionBefore=function(){return this.get('selectionBefore');};o.prototype.getSelectionAfter=function(){return this.get('selectionAfter');};o.prototype.getBlockForKey=function(p){var q=this.getBlockMap().get(p);return q;};o.prototype.getKeyBefore=function(p){return this.getBlockMap().reverse().keySeq().skipUntil(function(q){return q===p;}).skip(1).first();};o.prototype.getKeyAfter=function(p){return this.getBlockMap().keySeq().skipUntil(function(q){return q===p;}).skip(1).first();};o.prototype.getBlockAfter=function(p){return this.getBlockMap().skipUntil(function(q,r){return r===p;}).skip(1).first();};o.prototype.getBlockBefore=function(p){return this.getBlockMap().reverse().skipUntil(function(q,r){return r===p;}).skip(1).first();};o.prototype.getBlocksAsArray=function(){return this.getBlockMap().toArray();};o.prototype.getFirstBlock=function(){return this.getBlockMap().first();};o.prototype.getLastBlock=function(){return this.getBlockMap().last();};o.prototype.getPlainText=function(p){return this.getBlockMap().map(function(q){return q?q.getText():'';}).join(p||'\n');};o.prototype.hasText=function(){var p=this.getBlockMap();return (p.size>1||p.first().getLength()>0);};o.createFromBlockArray=function(p){var q=c('BlockMapBuilder').createFromArray(p),r=c('SelectionState').createEmpty(q.first().getKey());return new o({blockMap:q,selectionBefore:r,selectionAfter:r});};o.createFromText=function(p){var q=arguments.length<=1||arguments[1]===undefined?/\r\n?|\n/g:arguments[1],r=p.split(q),s=r.map(function(t){t=c('sanitizeDraftText')(t);return new (c('ContentBlock'))({key:c('generateRandomKey')(),text:t,type:'unstyled',characterList:j(l(c('CharacterMetadata').EMPTY,t.length))});});return o.createFromBlockArray(s);};function o(){h.apply(this,arguments);}f.exports=o;},null);
__d('BlockTree',['immutable','emptyFunction','findRangesImmutable'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('immutable').List,i=c('immutable').Repeat,j=c('immutable').Record,k=c('emptyFunction').thatReturnsTrue,l='-',m={start:null,end:null},n=j(m),o={start:null,end:null,decoratorKey:null,leaves:null},p=j(o),q={generate:function(t,u){var v=t.getLength();if(!v)return h.of(new p({start:0,end:0,decoratorKey:null,leaves:h.of(new n({start:0,end:0}))}));var w=[],x=u?u.getDecorations(t):h(i(null,v)),y=t.getCharacterList();c('findRangesImmutable')(x,s,k,function(z,aa){w.push(new p({start:z,end:aa,decoratorKey:x.get(z),leaves:r(y.slice(z,aa).toList(),z)}));});return h(w);},getFingerprint:function(t){return t.map(function(u){var v=u.get('decoratorKey'),w=v!==null?v+'.'+(u.get('end')-u.get('start')):'';return ''+w+'.'+u.get('leaves').size;}).join(l);}};function r(t,u){var v=[],w=t.map(function(x){return x.getStyle();}).toList();c('findRangesImmutable')(w,s,k,function(x,y){v.push(new n({start:x+u,end:y+u}));});return h(v);}function s(t,u){return t===u;}f.exports=q;},null);
__d('EditorBidiService',['immutable','UnicodeBidiService','nullthrows'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('immutable').OrderedMap,i,j={getDirectionMap:function(k,l){if(!i){i=new (c('UnicodeBidiService'))();}else i.reset();var m=k.getBlockMap(),n=m.valueSeq().map(function(p){return c('nullthrows')(i).getDirection(p.getText());}),o=h(m.keySeq().zip(n));if(l!=null&&c('immutable').is(l,o))return l;return o;}};f.exports=j;},null);
__d('EditorState',['BlockTree','ContentState','EditorBidiService','immutable','SelectionState'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('immutable').OrderedSet,i=c('immutable').Record,j=c('immutable').Stack,k={allowUndo:true,currentContent:null,decorator:null,directionMap:null,forceSelection:false,inCompositionMode:false,inlineStyleOverride:null,lastChangeType:null,nativelyRenderedContent:null,redoStack:j(),selection:null,treeMap:null,undoStack:j()},l=i(k);m.createEmpty=function(v){return m.createWithContent(c('ContentState').createFromText(''),v);};m.createWithContent=function(v,w){var x=v.getBlockMap().first().getKey();return m.create({currentContent:v,undoStack:j(),redoStack:j(),decorator:w||null,selection:c('SelectionState').createEmpty(x)});};m.create=function(v){var w=v.currentContent,x=v.decorator,y=babelHelpers['extends']({},v,{treeMap:o(w,x),directionMap:c('EditorBidiService').getDirectionMap(w)});return new m(new l(y));};m.set=function(v,w){var x=v.getImmutable().withMutations(function(y){var z=y.get('decorator'),aa=z;if(w.decorator===null){aa=null;}else if(w.decorator)aa=w.decorator;var ba=w.currentContent||v.getCurrentContent();if(aa!==z){var ca=y.get('treeMap'),da;if(aa&&z){da=q(ba.getBlockMap(),ca,aa,z);}else da=o(ba,aa);y.merge({decorator:aa,treeMap:da,nativelyRenderedContent:null});return;}var ea=v.getCurrentContent();if(ba!==ea)y.set('treeMap',p(v,ba.getBlockMap(),aa));y.merge(w);});return new m(x);};m.prototype.toJS=function(){return this.getImmutable().toJS();};m.prototype.getAllowUndo=function(){return this.getImmutable().get('allowUndo');};m.prototype.getCurrentContent=function(){return this.getImmutable().get('currentContent');};m.prototype.getUndoStack=function(){return this.getImmutable().get('undoStack');};m.prototype.getRedoStack=function(){return this.getImmutable().get('redoStack');};m.prototype.getSelection=function(){return this.getImmutable().get('selection');};m.prototype.getDecorator=function(){return this.getImmutable().get('decorator');};m.prototype.isInCompositionMode=function(){return this.getImmutable().get('inCompositionMode');};m.prototype.mustForceSelection=function(){return this.getImmutable().get('forceSelection');};m.prototype.getNativelyRenderedContent=function(){return this.getImmutable().get('nativelyRenderedContent');};m.prototype.getLastChangeType=function(){return this.getImmutable().get('lastChangeType');};m.prototype.getInlineStyleOverride=function(){return this.getImmutable().get('inlineStyleOverride');};m.setInlineStyleOverride=function(v,w){return m.set(v,{inlineStyleOverride:w});};m.prototype.getCurrentInlineStyle=function(){var v=this.getInlineStyleOverride();if(v!=null)return v;var w=this.getCurrentContent(),x=this.getSelection();if(x.isCollapsed())return s(w,x);return t(w,x);};m.prototype.getBlockTree=function(v){return this.getImmutable().getIn(['treeMap',v]);};m.prototype.isSelectionAtStartOfContent=function(){var v=this.getCurrentContent().getBlockMap().first().getKey();return this.getSelection().hasEdgeWithin(v,0,0);};m.prototype.isSelectionAtEndOfContent=function(){var v=this.getCurrentContent(),w=v.getBlockMap(),x=w.last(),y=x.getLength();return this.getSelection().hasEdgeWithin(x.getKey(),y,y);};m.prototype.getDirectionMap=function(){return this.getImmutable().get('directionMap');};m.acceptSelection=function(v,w){return n(v,w,false);};m.forceSelection=function(v,w){if(!w.getHasFocus())w=w.set('hasFocus',true);return n(v,w,true);};m.moveSelectionToEnd=function(v){var w=v.getCurrentContent(),x=w.getLastBlock(),y=x.getKey(),z=x.getLength();return m.acceptSelection(v,new (c('SelectionState'))({anchorKey:y,anchorOffset:z,focusKey:y,focusOffset:z,isBackward:false}));};m.moveFocusToEnd=function(v){var w=m.moveSelectionToEnd(v);return m.forceSelection(w,w.getSelection());};m.push=function(v,w,x){if(v.getCurrentContent()===w)return v;var y=x!=='insert-characters',z=c('EditorBidiService').getDirectionMap(w,v.getDirectionMap());if(!v.getAllowUndo())return m.set(v,{currentContent:w,directionMap:z,lastChangeType:x,selection:w.getSelectionAfter(),forceSelection:y,inlineStyleOverride:null});var aa=v.getSelection(),ba=v.getCurrentContent(),ca=v.getUndoStack(),da=w;if(aa!==ba.getSelectionAfter()||r(v,x)){ca=ca.push(ba);da=da.set('selectionBefore',aa);}else if(x==='insert-characters'||x==='backspace-character'||x==='delete-character')da=da.set('selectionBefore',ba.getSelectionBefore());var ea=v.getInlineStyleOverride();if(x!=='adjust-depth'&&x!=='change-block-type')ea=null;var fa={currentContent:da,directionMap:z,undoStack:ca,redoStack:j(),lastChangeType:x,selection:w.getSelectionAfter(),forceSelection:y,inlineStyleOverride:ea};return m.set(v,fa);};m.undo=function(v){if(!v.getAllowUndo())return v;var w=v.getUndoStack(),x=w.peek();if(!x)return v;var y=v.getCurrentContent(),z=c('EditorBidiService').getDirectionMap(x,v.getDirectionMap());return m.set(v,{currentContent:x,directionMap:z,undoStack:w.shift(),redoStack:v.getRedoStack().push(y),forceSelection:true,inlineStyleOverride:null,lastChangeType:'undo',nativelyRenderedContent:null,selection:y.getSelectionBefore()});};m.redo=function(v){if(!v.getAllowUndo())return v;var w=v.getRedoStack(),x=w.peek();if(!x)return v;var y=v.getCurrentContent(),z=c('EditorBidiService').getDirectionMap(x,v.getDirectionMap());return m.set(v,{currentContent:x,directionMap:z,undoStack:v.getUndoStack().push(y),redoStack:w.shift(),forceSelection:true,inlineStyleOverride:null,lastChangeType:'redo',nativelyRenderedContent:null,selection:x.getSelectionAfter()});};function m(v){this.$EditorState1=v;}m.prototype.getImmutable=function(){return this.$EditorState1;};function n(v,w,x){return m.set(v,{selection:w,forceSelection:x,nativelyRenderedContent:null,inlineStyleOverride:null});}function o(v,w){return v.getBlockMap().map(function(x){return c('BlockTree').generate(x,w);}).toOrderedMap();}function p(v,w,x){var y=v.getCurrentContent().getBlockMap(),z=v.getImmutable().get('treeMap');return z.merge(w.toSeq().filter(function(aa,ba){return aa!==y.get(ba);}).map(function(aa){return c('BlockTree').generate(aa,x);}));}function q(v,w,x,y){return w.merge(v.toSeq().filter(function(z){return (x.getDecorations(z)!==y.getDecorations(z));}).map(function(z){return c('BlockTree').generate(z,x);}));}function r(v,w){var x=v.getLastChangeType();return (w!==x||w!=='insert-characters'&&w!=='backspace-character'&&w!=='delete-character');}function s(v,w){var x=w.getStartKey(),y=w.getStartOffset(),z=v.getBlockForKey(x);if(y>0)return z.getInlineStyleAt(y-1);if(z.getLength())return z.getInlineStyleAt(0);return u(v,x);}function t(v,w){var x=w.getStartKey(),y=w.getStartOffset(),z=v.getBlockForKey(x);if(y<z.getLength())return z.getInlineStyleAt(y);if(y>0)return z.getInlineStyleAt(y-1);return u(v,x);}function u(v,w){var x=v.getBlockBefore(w),y;while(x){y=x.getLength();if(y)return x.getInlineStyleAt(y-1);x=v.getBlockBefore(x.getKey());}return h();}f.exports=m;},null);
__d('applyEntityToContentBlock',['CharacterMetadata'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();function h(i,j,k,l){var m=i.getCharacterList();while(j<k){m=m.set(j,c('CharacterMetadata').applyEntity(m.get(j),l));j++;}return i.set('characterList',m);}f.exports=h;},null);
__d('createPlainBlocksFromText',['CharacterMetadata','ContentBlock','immutable','generateRandomKey','sanitizeDraftText'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('immutable').List,i=c('immutable').Repeat,j=c('CharacterMetadata').EMPTY;function k(l){return l.map(function(m){m=c('sanitizeDraftText')(m);var n=m.length;return new (c('ContentBlock'))({key:c('generateRandomKey')(),text:m,type:'unstyled',characterList:h(i(j,n))});});}f.exports=k;},null);
__d('splitTextIntoTextBlocks',[],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=/\r\n?|\n/g;function i(j){return j.split(h);}f.exports=i;},null);
__d('createEditorStateWithEntities',['ContentState','EditorState','applyEntityToContentBlock','createPlainBlocksFromText','splitTextIntoTextBlocks'],function a(b,c,d,e,f,g){if(c.__markCompiled)c.__markCompiled();function h(i){var j=i.text,k=i.ranges,l=i.decorator,m=i.entityCreationFn,n=i.splitIntoBlocks,o=i.allowUndo,p,q;if(n===undefined)n=true;if(j){p=n?c('splitTextIntoTextBlocks')(j):[j];q=[];var r=0;p.forEach(function(u){q.push(r);r+=u.length+1;});}else p=[''];var s=c('createPlainBlocksFromText')(p);if(k&&k.length&&m)k.forEach(function(u){var v=m(u.entity);if(v===null)return;var w=u.offset,x,y;for(var z=0;z<q.length;z++){var aa=q[z],ba=q[z+1];if(ba===undefined||w>=aa&&w<ba){x=s[z];y=w-aa;break;}}s[z]=c('applyEntityToContentBlock')(x,y,y+u.length,v);});var t=c('EditorState').createWithContent(c('ContentState').createFromBlockArray(s),l);if(o===false)t=c('EditorState').set(t,{allowUndo:false});return t;}f.exports=h;},null);
__d('getMentionsTextForContentState',['DraftEntity','emptyFunction'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('emptyFunction').thatReturnsTrue,i=/[\\\]:]/g;function j(l){var m=l.getBlockMap().map(function(n){var o=n.getText(),p=[];n.findEntityRanges(h,function(q,r){p.push(k(o.slice(q,r),n.getEntityAt(q)));});return p.join('');});return m.join('\n');}function k(l,m){if(m){var n=c('DraftEntity').get(m);if(n.getType()==='MENTION'){l=l.replace(i,function(o){return '\\'+o;});return '@['+n.getData().id+':'+l+']';}else if(n.getType()==='EMOTICON')return n.getData().originalEmoticon;}return l.replace('@[','@ [');}f.exports=j;},null);
__d('getSafeBodyFromHTML',['UserAgent'],function a(b,c,d,e,f,g){'use strict';if(c.__markCompiled)c.__markCompiled();var h=c('UserAgent').isBrowser('IE <= 9');function i(j){var k,l=null;if(!h&&document.implementation&&document.implementation.createHTMLDocument){k=document.implementation.createHTMLDocument('foo');k.documentElement.innerHTML=j;l=k.getElementsByTagName('body')[0];}return l;}f.exports=i;},null);