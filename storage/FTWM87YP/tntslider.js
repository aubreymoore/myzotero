window.__tnt||(window.__tnt={}),function(e,t){var i=t.slider||(t.slider={}),n={};i.sliderApp={init:function(){n.slideshows=e.querySelectorAll(".tnt-slider-template");for(var t=0;t<n.slideshows.length;++t)i.sliderApp.constructSlider(n.slideshows[t])},constructSlider:function(t){var i,n,a,s,l,d,o=e.createElement("div"),c=e.createElement("div"),u=e.createElement("div");for(o.classList.add("tnt-slider"),c.classList.add("tnt-slider-outer"),u.classList.add("tnt-slider-inner"),o.setAttribute("id","tnt-slider-"+t.getAttribute("data-id")),s=0;s<t.attributes.length;s++)"class"!=t.attributes[s].name&&o.setAttribute(t.attributes[s].name,t.attributes[s].value);if("true"==t.getAttribute("data-auto-height")&&c.classList.add("tnt-slider-height"),"content"in e.createElement("template")){for(i=e.importNode(t.content,!0),s=0;s<i.children.length;s++)n=i.children[s],d=e.createElement("div"),d.classList.add("tnt-slider-item"),t.hasAttribute("data-columns")?s<r.visibleSlides(t)&&d.classList.add("active"):0===s&&d.classList.add("active"),d.setAttribute("data-item",s+1),d.appendChild(e.importNode(n,!0)),u.appendChild(d);if(t.hasAttribute("data-columns")){var m=e.importNode(t.content,!0),v=r.visibleSlides(t);for(v>m.children.length&&(v=m.children.length),l=0;l<m.children.length;l++)if(v>l){var h=m.children[l];a=e.createElement("div"),a.classList.add("tnt-slider-item"),a.classList.add("clone"),a.setAttribute("data-item",m.children.length+l+1),t.hasAttribute("data-blankclones")||a.appendChild(e.importNode(h,!0)),u.appendChild(a)}}}else{i=e.createDocumentFragment();var p=t.childNodes;for(s=0;s<p.length;s++)1==p[s].nodeType&&i.appendChild(p[s].cloneNode(!0));for(s=0;s<i.childNodes.length;s++)n=i.childNodes[s],d=e.createElement("div"),d.classList.add("tnt-slider-item"),t.hasAttribute("data-columns")?s<r.visibleSlides(t)&&d.classList.add("active"):0===s&&d.classList.add("active"),d.setAttribute("data-item",s+1),d.appendChild(e.importNode(n,!0)),u.appendChild(d);if(t.hasAttribute("data-columns")){var f=e.createDocumentFragment();for(l=0;l<p.length;l++)1==p[l].nodeType&&f.appendChild(p[l].cloneNode(!0));for(l=0;l<r.visibleSlides(t);l++)n=f.childNodes[l],a=e.createElement("div"),a.classList.add("tnt-slider-item"),a.classList.add("clone"),a.setAttribute("data-item",f.childNodes.length+l+1),t.hasAttribute("data-blankclones")||a.appendChild(e.importNode(n,!0)),u.appendChild(a)}}for(c.appendChild(u),o.appendChild(c),t.parentElement.appendChild(o);t.firstChild;)t.removeChild(t.firstChild);r.setTranslate(o,1),r.loaded(o),this.observeSlider(o),this.setStage(o),this.createNavigation(o),this.createListener(o)},observeSlider:function(e){if(e.autoslide={allowAutoSlide:null,timer:null},"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype){var t=e.querySelector(".tnt-slider-inner"),i=!1,n=new IntersectionObserver(function(t){t.forEach(function(t){t.isIntersecting?(i=!0,e.autoslide.allowAutoSlide=!0,r.autoSlide(e)):i&&(i=!1,e.autoslide.allowAutoSlide=!1,r.autoSlide(e))})});n.observe(t)}},setStage:function(e){r.stageSize(e)},createNavigation:function(t){var i=t.querySelectorAll(".tnt-slider-item"),n=t.querySelectorAll(".tnt-slider-item.clone"),a=0,s=r.visibleSlides(t),l=!0;if(i&&n&&(a=i.length-n.length,s>=a&&(l=!1)),"true"==t.getAttribute("data-arrows")&&l){var d=e.createElement("div");d.classList.add("tnt-slider-controls"),d.classList.add("tnt-slider-controls-top"),"pagination"==t.getAttribute("data-slider-type")&&d.classList.add("hidden-print");var o=r.arrowElement(t,{text:"Next",btn:"tnt-slider-next",icon:"tnt-chevron-right"}),c=r.arrowElement(t,{text:"Previous",btn:"tnt-slider-previous",icon:"tnt-chevron-left"});if(d.appendChild(c),d.appendChild(o),"pagination"==t.getAttribute("data-slider-type")){var u=d.cloneNode(!0);u.classList.add("tnt-slider-controls-bottom"),u.classList.add("clearfix"),u.classList.remove("tnt-slider-controls-top"),t.appendChild(u)}if(t.prepend(d),"pagination"==t.getAttribute("data-slider-type")){var m=e.createElement("div"),v=t.querySelector(".tnt-slider-inner").children.length,h=t.querySelector(".tnt-slider-controls-top"),p=t.querySelector(".tnt-slider-controls-bottom");h.classList.add("clearfix"),m.classList.add("tnt-slider-counter"),m.innerHTML='<p>Page <span class="index">1</span> of <span class="total">'+v+"</span>";var f=m.cloneNode(!0);h.prepend(f),p.prepend(m)}}},previousSlide:function(e){var t=e.querySelector(".tnt-slider-inner"),i=e.querySelector(".active"),n=parseInt(r.currentPosition(e)),a=parseInt(r.visibleSlides(e)),s=n-a,l=t.children.length,d=parseInt(e.getAttribute("data-columns")),o=l-d,c=1==r.visibleSlides(e)?s:s+(a-1),u=i.previousElementSibling?!1:!0;if(e.hasAttribute("data-columns")){1>=n&&(s=o,c=1==a?o:o+(a-1));for(var m=0;m<t.children.length;m++){var v=t.children[m].dataset.item;v>=s&&c>=v?t.children[m].classList.add("active"):t.children[m].classList.remove("active")}r.setTranslate(e,s)}else{if(u)t.lastElementChild.classList.add("active"),r.setTranslate(e,l),r.beforeSlide(e,l);else{var h=i.previousElementSibling.dataset.item;i.previousElementSibling.classList.add("active"),r.setTranslate(e,h),r.beforeSlide(e,h)}setTimeout(function(){i.classList.remove("active")},100)}setTimeout(function(){r.afterSlide(e,"prev")},100)},nextSlide:function(e){var t=e.querySelector(".active"),i=e.querySelector(".tnt-slider-inner"),n=parseInt(r.currentPosition(e)),a=parseInt(r.visibleSlides(e)),s=n+a,l=i.children.length,d=parseInt(e.getAttribute("data-columns")),o=l-d,c=1==r.visibleSlides(e)?s:s+(a-1),u=t.nextElementSibling?!1:!0;if(e.hasAttribute("data-columns")){s>o&&(s=1,c=1==r.visibleSlides(e)?s:s+(a-1));for(var m=0;m<i.children.length;m++){var v=i.children[m].dataset.item;v>=s&&c>=v?i.children[m].classList.add("active"):i.children[m].classList.remove("active")}r.setTranslate(e,s)}else{if(u)i.firstElementChild.classList.add("active"),r.setTranslate(e,1),r.beforeSlide(e,1);else{var h=t.nextElementSibling.dataset.item;t.nextElementSibling.classList.add("active"),r.setTranslate(e,h),r.beforeSlide(e,h)}setTimeout(function(){t.classList.remove("active")},100)}setTimeout(function(){r.afterSlide(e,"next")},100)},createListener:function(e){var t,n=e.querySelector(".tnt-slider-inner"),a=e.querySelectorAll(".tnt-slider-next"),s=e.querySelectorAll(".tnt-slider-previous");for(t=0;t<s.length;++t)s[t].addEventListener("click",function(){i.sliderApp.previousSlide(e)});for(t=0;t<a.length;++t)a[t].addEventListener("click",function(){i.sliderApp.nextSlide(e)});"true"==e.getAttribute("data-auto-slide")&&(n.addEventListener("mouseover",function(){e.autoslide.allowAutoSlide=!1,r.autoSlide(e)}),n.addEventListener("mouseout",function(){e.autoslide.allowAutoSlide=!0,r.autoSlide(e)})),"true"==e.getAttribute("data-swipe")&&(n.addEventListener("click",function(t){r.freezeClick(e,t)}),n.addEventListener("touchstart",function(t){r.moveStart(e,t)}),n.addEventListener("mousedown",function(t){r.moveStart(e,t)}),n.addEventListener("pointerdown",function(t){r.moveStart(e,t)}),n.addEventListener("MSPointerDown",function(t){r.moveStart(e,t)}),n.addEventListener("touchmove",function(t){r.moveSlider(e,t)}),n.addEventListener("pointermove",function(t){r.moveSlider(e,t)}),n.addEventListener("mousemove",function(t){r.moveSlider(e,t)}),n.addEventListener("MSPointerMove",function(t){r.moveSlider(e,t)}),n.addEventListener("touchend",function(t){r.moveEnd(e,t)}),n.addEventListener("mouseup",function(t){r.moveEnd(e,t)}),n.addEventListener("pointerup",function(t){r.moveEnd(e,t)}),n.addEventListener("mouseleave",function(t){r.moveEnd(e,t)}),n.addEventListener("MSPointerUp",function(t){r.moveEnd(e,t)}));var l;window.addEventListener("resize",function(){e.querySelector(".tnt-slider-inner").classList.add("tnt-slider-resizing"),clearTimeout(l),l=setTimeout(function(){var t=e.querySelector(".active").dataset.item;r.stageSize(e),r.setTranslate(e,t),r.autoHeight(e,t),r.visibleSlides(e),r.moveActiveClass(e),e.querySelector(".tnt-slider-inner").classList.remove("tnt-slider-resizing")},250)})}};var r={freezeClick:function(e,t){e.movement.bClick===!1&&(t.stopPropagation(),t.preventDefault())},loaded:function(e){var t=e.querySelector('[data-item="1"]').nextElementSibling?!0:!1,i=e.querySelector(".owl-first-image");this.scrubURLs(e),this.hideLoader(e,1),t&&(this.lazyLoad(e,2),this.adController(e,2),i&&(i.onload=function(){r.autoHeight(e,1)})),e.movement={bClick:!0}},beforeSlide:function(e,t){this.lazyLoad(e,t),this.adController(e,t)},afterSlide:function(e,t){var i=e.querySelector(".tnt-slider-inner"),n=e.querySelector(".active").dataset.item,a=new CustomEvent("tntCarouselSlid");e.dispatchEvent(a),this.slideCounter(e),e.querySelector(".active").nextElementSibling&&this.lazyLoad(e,e.querySelector(".active").nextElementSibling.dataset.item),this.adController(e,null,t),r.autoHeight(e,n),e.movement&&(e.movement.x=i.firstElementChild.offsetWidth*(n-1))},currentPosition:function(e){var t=e.querySelector(".active").dataset.item;return t},scrubURLs:function(e){if(-1!=location.href.indexOf("tncms/admin")){var i=e.getElementsByTagName("a");setTimeout(function(){for(var e=0;e<i.length;e++){var n=t.scrubUrl(i[e].getAttribute("href"));i[e].setAttribute("href",n)}},500)}},visibleSlides:function(e){var t,i=window.innerWidth;return t=e.hasAttribute("data-columns")?992>i&&i>769?2:768>i?1:e.getAttribute("data-columns"):1},moveActiveClass:function(e){if(e.hasAttribute("data-columns"))for(var t=e.querySelector(".tnt-slider-inner"),i=parseInt(r.currentPosition(e)),n=parseInt(r.visibleSlides(e)),a=0;a<t.children.length;a++){var s=t.children[a].dataset.item;s>=i&&i+(n-1)>=s?t.children[a].classList.add("active"):t.children[a].classList.remove("active")}},arrowElement:function(t,i){var n=e.createDocumentFragment(),r=e.createElement("div"),a=e.createElement("i");if(r.classList.add(i.btn),a.classList.add("fas"),a.classList.add(i.icon),"pagination"==t.getAttribute("data-slider-type")){var s=e.createElement("span");s.innerHTML=i.text,r.appendChild(s)}return r.appendChild(a),n.appendChild(r)},stageSize:function(e){for(var t=e.querySelector(".tnt-slider-inner"),i=e.querySelector(".tnt-slider-outer"),n=e.querySelectorAll(".tnt-slider-item"),r=1==this.visibleSlides(e)&&window.innerWidth<768?80:0,a=0;a<n.length;a++)e.hasAttribute("data-columns")?(n[a].style.marginRight="15px",n[a].style.width=(i.offsetWidth-r-15*(this.visibleSlides(e)-1))/this.visibleSlides(e)+"px"):n[a].style.width=i.offsetWidth+"px";e.hasAttribute("data-columns")?(t.style.transition="all 1.5s ease 0s",t.style.width=(i.offsetWidth+15)*n.length+"px",1==this.visibleSlides(e)&&window.innerWidth<768?(t.style.paddingLeft="40px",t.style.paddingRight="40px"):(t.style.paddingLeft="",t.style.paddingRight="")):(t.style.width=i.offsetWidth*n.length+"px",t.style.transition="all 0.25s ease 0s")},setTranslate:function(e,t){var i,n=e.querySelector(".tnt-slider-inner"),r=e.querySelector('[data-item="'+t+'"]'),a=e.hasAttribute("data-columns")?15:0;i=1==t?0:(t-1)*(r.getBoundingClientRect().width+a),n.style.transform="translate3d("+-i+"px, 0, 0)"},lazyLoad:function(e,t){if("true"==e.getAttribute("data-lazy-load")){var i=e.querySelector('[data-item="'+t+'"]'),n=i.querySelector(".owl-lazy");(n&&!n.src||n&&n.getAttribute("data-src")!=n.src)&&(n.setAttribute("src",n.getAttribute("data-src")),n.onload=function(){r.hideLoader(e,t)})}},autoHeight:function(e,t){if("true"==e.getAttribute("data-auto-height")){var i=e.querySelector('[data-item="'+t+'"]'),n=i.offsetHeight,r=e.querySelector(".tnt-slider-height");setTimeout(function(){r.style.height=n+"px"},300)}},hideLoader:function(e,t){var i=e.querySelector('[data-item="'+t+'"]'),n=i.querySelector(".loading-slide");n&&(n.style.display="none")},slideCounter:function(e){for(var t=e.querySelector(".active"),i=t.dataset.item,n=e.querySelectorAll(".tnt-slider-counter"),r=0;r<n.length;++r){var a=n[r].querySelector(".index");a.innerHTML=i}},adController:function(e,t,i){if(i){var n,r;"next"===i?(n=e.querySelector(".active").nextElementSibling?!0:!1,n&&(r=e.querySelector(".active").nextElementSibling.dataset.item)):"prev"===i&&(n=e.querySelector(".active").previousElementSibling?!0:!1,n&&(r=e.querySelector(".active").previousElementSibling.dataset.item)),"undefined"!=n&&"undefined"!=r&&this.adMovement(e,r)}else t&&this.adMovement(e,t)},adMovement:function(t,i){if(t.querySelector('[data-item="'+i+'"] .photo-ad')&&!t.querySelector('[data-item="'+i+'"] .photo-ad #tnt-gallery-ad')&&e.getElementById("tnt-gallery-ad")){var n=e.getElementById("tnt-gallery-ad");n.parentElement.removeChild(n),"none"===n.style.display&&(n.style.display="block"),t.querySelector('[data-item="'+i+'"] .gallery-ad').append(n),this.adRefresh(n.getAttribute("data-position"),n.getAttribute("data-provider"))}},adRefresh:function(e,t){try{-1!==t.indexOf("dfp")&&"undefined"!=typeof gptAdSlots?googletag.cmd.push(function(){googletag.pubads().clear([gptAdSlots[e]]),googletag.pubads().refresh([gptAdSlots[e]])}):"blox"==t&&"undefined"!=typeof TNCMS.AdManager&&TNCMS.AdManager.refresh({region:e})}catch(i){}},autoSlide:function(e){"true"==e.getAttribute("data-auto-slide")&&(e.autoslide.allowAutoSlide===!0?("undefined"==typeof e.autoslide.timer&&(e.autoslide.timer=!1),e.autoslide.timer||(e.autoslide.timer=setInterval(function(){i.sliderApp.nextSlide(e)},5e3))):(clearInterval(e.autoslide.timer),e.autoslide.timer=!1))},moveStart:function(e,t){var i,n=e.querySelector(".tnt-slider-inner"),r=t.touches?t.touches[0]:t,a=n.getElementsByTagName("a"),s=n.getElementsByTagName("img");for(e.movement||(e.movement={bClick:!1,directionLock:!1,distanceX:0,distanceY:0,initiated:!1,pointX:0,pointY:0,startX:0,x:0}),e.movement.initiated=!0,e.movement.pointX=r.pageX,e.movement.pointY=r.pageY,e.movement.startX=r.pageX,i=0;i<a.length;i++)a[i].ondragstart=function(){return!1};for(i=0;i<s.length;i++)s[i].ondragstart=function(){return!1}},moveSlider:function(e,t){if(e.movement&&e.movement.initiated){var i,n=e.querySelector(".tnt-slider-inner"),r=t.touches?t.touches[0]:t,a=r.pageX-e.movement.pointX,s=r.pageY-e.movement.pointY,l=Math.abs(a),d=Math.abs(s);e.movement.directionLock||(e.movement.distanceX=e.movement.distanceX+l,e.movement.distanceY=e.movement.distanceY+d,e.movement.distanceY>16?(e.movement.initiated=!1,e.movement.distanceY=0):e.movement.distanceX>3&&(e.movement.directionLock=!0,e.movement.bClick=!1)),e.movement.directionLock&&(e.movement.pointX=r.pageX,i=e.movement.x-a,n.style.transition="all 0s ease 0s",n.style.transform="translate3d("+-i+"px, 0, 0)",e.movement.x=i)}},moveEnd:function(e,t){if(e.movement&&e.movement.initiated){var n=e.querySelector(".tnt-slider-inner"),a=t.changedTouches?t.changedTouches[0].clientX:t.clientX;n.style.transition=e.hasAttribute("data-columns")?"all 1.5s ease 0s":"all 0.25s ease 0s",a>e.movement.startX?a-e.movement.startX>30?i.sliderApp.previousSlide(e):r.setTranslate(e,this.currentPosition(e)):e.movement.startX-a>30?i.sliderApp.nextSlide(e):r.setTranslate(e,this.currentPosition(e)),e.movement.directionLock=!1,e.movement.initiated=!1,e.movement.distanceX=0,setTimeout(function(){e.movement.bClick=!0},300)}}};"loading"==e.readyState?e.addEventListener("DOMContentLoaded",function(){i.sliderApp.init()}):i.sliderApp.init()}(document,__tnt);
//# sourceMappingURL=tntslider.bc42862b065bb317f77c6f901f2a1cec.js.map