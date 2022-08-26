class customSelect{constructor(e){this.selector=e.selector,this.selectAll=document.querySelectorAll(this.selector)}init(){this.renderTemplate(),this.clickEventOut()}reinit(e){let t=e.parentNode;t.querySelector(".select-styled")&&(t.querySelector(".select-styled").remove(),t.querySelector(".select-list").remove()),this.renderOption(t)}ajaxOption(e,t){let n=new XMLHttpRequest;return n.open("GET",e.dataset.ajax),n.responseType="json",n.setRequestHeader("Content-type","application/json; charset=utf-8"),n.send(),n.onerror=function(){console.err("Error: afSelec ajax request failed")},n.onreadystatechange=function(){3==n.readyState&&e.closest(".af-select").querySelector(".select-list").classList.add("select-list--load"),4==n.readyState&&e.closest(".af-select").querySelector(".select-list").classList.remove("select-list--load")},n.onload=function(){t(n.response)},null}renderOption(a){var s=this,r=a.querySelector("select"),i=r.getAttribute("placeholder"),o=r.getAttribute("multiple");const l=document.createElement("div"),c=(l.classList.add("select-styled"),l.innerHTML="<span>"+i+"</span>",document.createElement("ul")),e=(c.classList.add("select-options"),document.createElement("div"));function u(e){e.querySelectorAll("select > option").forEach(function(e,t){const n=document.createElement("li");if(n.innerHTML=e.innerText,n.setAttribute("rel",e.value),o){let e=document.createElement("span");e.classList.add("af-check-multiple"),n.append(e)}function a(e){if(o){let t=[];return e.parentNode.querySelectorAll("option[selected]").forEach(function(e){t.push(e.innerText)}),t.length?t.join(","):i}return e.innerText}0!=t||i||(l.innerHTML="<span>"+e.innerText+"</span>"),e.getAttribute("selected")&&(l.innerHTML=i?'<span class="af-selected-placeholder" data-af-placeholder="'+i+'">'+a(e)+"</span>":"<span>"+a(e)+"</span>",n.classList.add("active")),e.getAttribute("disabled")||(c.appendChild(n),s.clickEventListItem(n,e,t))})}e.classList.add("select-list"),e.appendChild(c),a.querySelector(".select-styled")||a.appendChild(l),a.querySelector(".select-options")||a.appendChild(e),r.dataset.ajax&&this.ajaxOption(r,function(e){r.innerHTML="";let n=r.dataset.selected;var t=r.getAttribute("placeholder");e.unshift({text:t||"-Выберите-",value:""}),e.forEach(function(e){let t=document.createElement("option");t.value=e.value,t.innerText=e.text,n==e.value&&(t.setAttribute("selected",!0),r.removeAttribute("data-selected")),r.append(t)}),u(a)}),r.dataset.ajax||u(a),r.afSelect=new Object,r.afSelect.open=function(){s.openSelect(a)},r.afSelect.close=function(){s.closeSelect()},r.afSelect.update=function(){s.reinit(r)}}renderTemplate(){const a=this;this.selectAll.forEach(function(e,t){if(!e.classList.contains("select-hidden")){e.classList.add("select-hidden");const n=document.createElement("div");n.classList.add("af-select"),e.getAttribute("multiple")&&n.classList.add("af-select--multiple"),n.innerHTML=e.outerHTML,e.parentNode.replaceChild(n,e),a.clickEventOpenSelect(n)}}),document.querySelectorAll(".af-select").forEach(function(e,t){a.renderOption(e)})}openSelect(e){document.querySelectorAll("select").forEach(function(e){e.afSelect&&e.afSelect.close()}),e.querySelector("select").dataset.ajax&&!e.querySelector(".select-styled").classList.contains("active")&&(e.querySelector(".select-list").remove(),this.renderOption(e)),e.style.maxWidth=e.offsetWidth+"px",e.querySelector(".select-styled").classList.toggle("active"),e.querySelector(".select-options").classList.toggle("active"),e.querySelector(".select-list").classList.toggle("active"),document.querySelector("body").classList.toggle("af-select-open")}closeSelect(){if(!document.querySelector(".select-styled.active"))return!1;document.querySelector(".select-styled.active").classList.remove("active"),document.querySelector(".select-options.active").classList.remove("active"),document.querySelector(".select-list.active").classList.remove("active"),document.querySelector("body").classList.remove("af-select-open")}clickEventOut(){const e=this;document.addEventListener("click",function(){e.closeSelect()})}clickEventListItem(e,a,t){const s=a.parentNode.parentNode,r=this,i=s.querySelector("select").getAttribute("placeholder"),o=s.querySelector("select").getAttribute("multiple"),l=s.querySelector(".select-styled");e.addEventListener("click",function(e){function t(e){if(o){let t=[];return e.parentNode.querySelectorAll("option[selected]").forEach(function(e){t.push(e.innerText)}),t.length?t.join(","):i}return e.innerText}e.stopPropagation(),e.preventDefault(),s.querySelector(".select-options li.active")&&!o&&s.querySelector(".select-options li.active").classList.remove("active"),this.classList.contains("active")?(this.classList.remove("active"),a.removeAttribute("selected")):(this.classList.add("active"),a.setAttribute("selected","selected")),i?l.innerHTML='<span class="af-selected-placeholder" data-af-placeholder="'+i+'">'+t(a)+"</span>":s.querySelector(".select-styled span").innerHTML=t(a),o||(s.querySelector("select").value=this.getAttribute("rel"));var n=new Event("change");s.querySelector("select").dispatchEvent(n),e.target.classList.contains("af-check-multiple")||r.closeSelect()})}clickEventOpenSelect(e){const t=this;function n(e){e.stopPropagation(),e.preventDefault(),t.openSelect(this)}e.removeEventListener("click",n),e.addEventListener("click",n)}}class customModal{constructor(e){this.modal="",e&&(this.mobileBottom=!!e.mobileInBottom&&e.mobileInBottom)}init(){}createTemplate(){let e=document.createElement("div");return e.innerHTML='\n                <div class="af-popup">\n                    <div class="af-popup__bg"></div>\n                    <div class="af-popup__wrp">\n                        <div class="af-popup__container">\n                            <div class="af-popup__close">\n                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"></path></svg>\n                            </div>\n                            <div class="af-popup__content"></div>\n                        </div>\n                    </div>\n                </div>\n                ',document.body.append(e),this.instanse=e}open(e,t){let n=this;this.modal=this.createTemplate(),window.innerWidth<=480&&this.mobileBottom&&this.modal.querySelector(".af-popup").classList.add("af-popup--mobile"),this.modal.querySelector(".af-popup__content").innerHTML=e,this.modal.querySelector(".af-popup__close").addEventListener("click",function(){n.close()}),t&&t(this.modal),this.createEvent()}changeContent(e){this.modal.querySelector(".af-popup__content").innerHTML=e}createEvent(){let e=this;this.instanse.querySelector(".af-popup").addEventListener("click",function(){e.close()}),this.instanse.querySelector(".af-popup__container").addEventListener("click",function(e){e.stopPropagation(!0)})}close(){this.instanse.remove()}}!function(e){var t=function(a,p,r){"use strict";var f,v,e,H={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(e in v=a.lazySizesConfig||a.lazysizesConfig||{},H)e in v||(v[e]=H[e]);if(!p||!p.getElementsByClassName)return{init:function(){},cfg:v,noSupport:!0};function u(e,t){O(e,t)||e.setAttribute("class",(e[C]("class")||"").trim()+" "+t)}function d(e,t){(t=O(e,t))&&e.setAttribute("class",(e[C]("class")||"").replace(t," "))}function P(e,t){var n;!ce&&(n=a.picturefill||v.pf)?(t&&t.src&&!e[C]("srcset")&&e.setAttribute("srcset",t.src),n({reevaluate:!0,elements:[e]})):t&&t.src&&(e.src=t.src)}function t(n,e){return e?function(){j(n)}:function(){var e=this,t=arguments;j(function(){n.apply(e,t)})}}function I(e){function t(){var e=r.now()-a;e<99?q(t,99-e):(de||s)(s)}var n,a,s=function(){n=null,e()};return function(){a=r.now(),n=n||q(t,99)}}function n(){!n.i&&p.getElementsByClassName&&(n.i=!0,ge._(),ye._())}var R,W,B,m,h,D,y,V,F,$,g,b,S,k,E,J,Z,U,X,s,G,K,Q,Y,L,A,z,ee,i,te,ne,ae,w,se,re,ie,oe,le,o,_=p.documentElement,ce=a.HTMLPictureElement,l="addEventListener",C="getAttribute",c=a[l].bind(a),q=a.setTimeout,ue=a.requestAnimationFrame||q,de=a.requestIdleCallback,pe=/^picture$/i,fe=["load","error","lazyincluded","_lazyloaded"],T={},ve=Array.prototype.forEach,O=function(e,t){return T[t]||(T[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),T[t].test(e[C]("class")||"")&&T[t]},me=function(t,n,e){var a=e?l:"removeEventListener";e&&me(t,n),fe.forEach(function(e){t[a](e,n)})},x=function(e,t,n,a,s){var r=p.createEvent("Event");return(n=n||{}).instance=f,r.initEvent(t,!a,!s),r.detail=n,e.dispatchEvent(r),r},M=function(e,t){return(getComputedStyle(e,null)||{})[t]},he=function(e,t,n){for(n=n||e.offsetWidth;n<v.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},j=(le=[],o=oe=[],_e._lsFlush=we,_e),ye=(K=/^img$/i,Q=/^iframe$/i,Y="onscroll"in a&&!/(gle|ing)bot/.test(navigator.userAgent),z=-1,ee=function(e){return(E=null==E?"hidden"==M(p.body,"visibility"):E)||!("hidden"==M(e.parentNode,"visibility")&&"hidden"==M(e,"visibility"))},J=ke,U=A=L=0,X=v.throttleDelay,s=v.ricTimeout,G=de&&49<s?function(){de(Ee,{timeout:s}),s!==v.ricTimeout&&(s=v.ricTimeout)}:t(function(){q(Ee)},!0),te=t(Le),ne=function(e){te({target:e.target})},ae=t(function(t,e,n,a,s){var r,i,o,l,c;(i=x(t,"lazybeforeunveil",e)).defaultPrevented||(a&&(n?u(t,v.autosizesClass):t.setAttribute("sizes",a)),n=t[C](v.srcsetAttr),a=t[C](v.srcAttr),s&&(r=(l=t.parentNode)&&pe.test(l.nodeName||"")),o=e.firesLoad||"src"in t&&(n||a||r),i={target:t},u(t,v.loadingClass),o&&(clearTimeout(D),D=q(Se,2500),me(t,ne,!0)),r&&ve.call(l.getElementsByTagName("source"),Ae),n?t.setAttribute("srcset",n):a&&!r&&(Q.test(t.nodeName)?(e=a,0==(c=(l=t).getAttribute("data-load-mode")||v.iframeLoadMode)?l.contentWindow.location.replace(e):1==c&&(l.src=e)):t.src=a),s&&(n||r)&&P(t,{src:a})),t._lazyRace&&delete t._lazyRace,d(t,v.lazyClass),j(function(){var e=t.complete&&1<t.naturalWidth;o&&!e||(e&&u(t,v.fastLoadedClass),Le(i),t._lazyCache=!0,q(function(){"_lazyCache"in t&&delete t._lazyCache},9)),"lazy"==t.loading&&A--},!0)}),se=I(function(){v.loadMode=3,i()}),{_:function(){V=r.now(),f.elements=p.getElementsByClassName(v.lazyClass),m=p.getElementsByClassName(v.lazyClass+" "+v.preloadClass),c("scroll",i,!0),c("resize",i,!0),c("pageshow",function(e){var t;e.persisted&&(t=p.querySelectorAll("."+v.loadingClass)).length&&t.forEach&&ue(function(){t.forEach(function(e){e.complete&&w(e)})})}),a.MutationObserver?new MutationObserver(i).observe(_,{childList:!0,subtree:!0,attributes:!0}):(_[l]("DOMNodeInserted",i,!0),_[l]("DOMAttrModified",i,!0),setInterval(i,999)),c("hashchange",i,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(e){p[l](e,i,!0)}),/d$|^c/.test(p.readyState)?N():(c("load",N),p[l]("DOMContentLoaded",i),q(N,2e4)),f.elements.length?(ke(),j._lsFlush()):i()},checkElems:i=function(e){var t;(e=!0===e)&&(s=33),Z||(Z=!0,(t=X-(r.now()-U))<0&&(t=0),e||t<9?G():q(G,t))},unveil:w=function(e){var t,n,a,s;e._lazyRace||(!(s="auto"==(a=(n=K.test(e.nodeName))&&(e[C](v.sizesAttr)||e[C]("sizes"))))&&h||!n||!e[C]("src")&&!e.srcset||e.complete||O(e,v.errorClass)||!O(e,v.lazyClass))&&(t=x(e,"lazyunveilread").detail,s&&ge.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,A++,ae(e,t,s,a,n))},_aLSL:ze}),ge=(W=t(function(e,t,n,a){var s,r,i;if(e._lazysizesWidth=a,e.setAttribute("sizes",a+="px"),pe.test(t.nodeName||""))for(r=0,i=(s=t.getElementsByTagName("source")).length;r<i;r++)s[r].setAttribute("sizes",a);n.detail.dataAttr||P(e,n.detail)}),{_:function(){R=p.getElementsByClassName(v.autosizesClass),c("resize",B)},checkElems:B=I(function(){var e,t=R.length;if(t)for(e=0;e<t;e++)be(R[e])}),updateElem:be});function be(e,t,n){var a=e.parentNode;a&&(n=he(e,a,n),(t=x(e,"lazybeforesizes",{width:n,dataAttr:!!t})).defaultPrevented||(n=t.detail.width)&&n!==e._lazysizesWidth&&W(e,a,t,n))}function Se(e){A--,e&&!(A<0)&&e.target||(A=0)}function ke(){var e,t,n,a,s,r,i,o,l,c,u,d=f.elements;if((y=v.loadMode)&&A<8&&(e=d.length)){for(t=0,z++;t<e;t++)if(d[t]&&!d[t]._lazyRace)if(!Y||f.prematureUnveil&&f.prematureUnveil(d[t]))w(d[t]);else if((i=d[t][C]("data-expand"))&&(s=+i)||(s=L),l||(l=!v.expand||v.expand<1?500<_.clientHeight&&500<_.clientWidth?500:370:v.expand,c=(f._defEx=l)*v.expFactor,u=v.hFac,E=null,L<c&&A<1&&2<z&&2<y&&!p.hidden?(L=c,z=0):L=1<y&&1<z&&A<6?l:0),o!==s&&(F=innerWidth+s*u,$=innerHeight+s,r=-1*s,o=s),c=d[t].getBoundingClientRect(),(k=c.bottom)>=r&&(g=c.top)<=$&&(S=c.right)>=r*u&&(b=c.left)<=F&&(k||S||b||g)&&(v.loadHidden||ee(d[t]))&&(h&&A<3&&!i&&(y<3||z<4)||function(e,t){var n,a=e,s=ee(e);for(g-=t,k+=t,b-=t,S+=t;s&&(a=a.offsetParent)&&a!=p.body&&a!=_;)(s=0<(M(a,"opacity")||1))&&"visible"!=M(a,"overflow")&&(n=a.getBoundingClientRect(),s=S>n.left&&b<n.right&&k>n.top-1&&g<n.bottom+1);return s}(d[t],s))){if(w(d[t]),a=!0,9<A)break}else!a&&h&&!n&&A<4&&z<4&&2<y&&(m[0]||v.preloadAfterLoad)&&(m[0]||!i&&(k||S||b||g||"auto"!=d[t][C](v.sizesAttr)))&&(n=m[0]||d[t]);n&&!a&&w(n)}}function Ee(){Z=!1,U=r.now(),J()}function Le(e){var t=e.target;t._lazyCache?delete t._lazyCache:(Se(e),u(t,v.loadedClass),d(t,v.loadingClass),me(t,ne),x(t,"lazyloaded"))}function Ae(e){var t,n=e[C](v.srcsetAttr);(t=v.customMedia[e[C]("data-media")||e[C]("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)}function ze(){3==v.loadMode&&(v.loadMode=2),se()}function N(){h||(r.now()-V<999?q(N,999):(h=!0,v.loadMode=3,i(),c("scroll",ze,!0)))}function we(){var e=o;for(o=oe.length?le:oe,ie=!(re=!0);e.length;)e.shift()();re=!1}function _e(e,t){re&&!t?e.apply(this,arguments):(o.push(e),ie||(ie=!0,(p.hidden?q:ue)(we)))}return q(function(){v.init&&n()}),f={cfg:v,autoSizer:ge,loader:ye,init:n,uP:P,aC:u,rC:d,hC:O,fire:x,gW:he,rAF:j}}(e,e.document,Date);e.lazySizes=t,"object"==typeof module&&module.exports&&(module.exports=t)}("undefined"!=typeof window?window:{}),document.addEventListener("lazybeforeunveil",function(e){var t=e.target.getAttribute("data-bg");t&&(e.target.style.backgroundImage="url("+t+")")}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Maska={})}(this,function(e){"use strict";function t(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function n(t,e){var n,a=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,n)),a}function i(a){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?n(Object(s),!0).forEach(function(e){var t,n;t=a,n=s[e=e],e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(s)):n(Object(s)).forEach(function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(s,e))})}return a}var o={"#":{pattern:/[0-9]/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,uppercase:!0},a:{pattern:/[a-zA-Z]/,lowercase:!0},"!":{escape:!0},"*":{repeat:!0}};function c(e,t){var i,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:o,a=!(3<arguments.length&&void 0!==arguments[3])||arguments[3];return 1<s(t).length?(i=s(t).sort(function(e,t){return e.length-t.length}),function(t,e,n){var a,s=!(3<arguments.length&&void 0!==arguments[3])||arguments[3],r=i.map(function(e){return l(t,e,n,!1)}).pop();for(a in i)if(function(e,t,n){for(var a in n)n[a].escape&&(t=t.replace(new RegExp(a+".{1}","g"),""));return t.split("").filter(function(e){return n[e]&&n[e].pattern}).length>=e.length}(r,i[a],n))return l(t,i[a],n,s);return""}(e,t,n,a)):l(e,t,n,a)}function s(t){try{return JSON.parse(t)}catch(e){return[t]}}function l(e,t,n,a){for(var s,r=!(3<arguments.length&&void 0!==a)||a,i=0,o=0,l="",c="";i<t.length&&o<e.length;){var u,d=t[i],p=e[o],f=n[d];f&&f.pattern?(f.pattern.test(p)&&(l+=(s=p,(u=f).transform&&(s=u.transform(s)),u.uppercase?s.toLocaleUpperCase():u.lowercase?s.toLocaleLowerCase():s),i++,r&&t[i]&&(n[t[i]]?n[t[i]]&&n[t[i]].escape&&(l+=t[i+1],i+=2):(l+=t[i],i++))),o++):f&&f.repeat?(u=n[t[i-1]])&&!u.pattern.test(p)?i++:i--:(f&&f.escape&&(d=t[++i]),r&&(l+=d),p===d&&o++,i++)}for(;r&&i<t.length;){var v=t[i];if(n[v]){c="";break}c+=v,i++}return l+c}function a(e){return!(e instanceof HTMLInputElement)&&e.querySelector("input")||e}function u(e){return"[object String]"===Object.prototype.toString.call(e)}t(d.prototype,[{key:"init",value:function(){for(var n=this,e=0;e<this._el.length;e++)!function(e){var t=a(n._el[e]);!n._opts.mask||t.dataset.mask&&t.dataset.mask===n._opts.mask||(t.dataset.mask=n._opts.mask),setTimeout(function(){return n.updateValue(t)},0),t.dataset.maskInited||(t.dataset.maskInited=!0,t.addEventListener("input",n.inputEvent),t.addEventListener("beforeinput",n.beforeInput))}(e)}},{key:"destroy",value:function(){for(var e=0;e<this._el.length;e++){var t=a(this._el[e]);t.removeEventListener("input",this.inputEvent),t.removeEventListener("beforeinput",this.beforeInput),delete t.dataset.mask,delete t.dataset.maskInited}}},{key:"updateValue",value:function(e,t){if(e&&e.type){var n=e.type.match(/^number$/i)&&e.validity.badInput;if(!e.value&&!n||!e.dataset.mask)return e.dataset.maskRawValue="",void this.dispatch("maska",e,t);for(var n=e.selectionEnd,a=e.value,s=a[n-1],r=(e.dataset.maskRawValue=c(e.value,e.dataset.mask,this._opts.tokens,!1),e.value),i=(this._opts.preprocessor&&(r=this._opts.preprocessor(r)),e.value=c(r,e.dataset.mask,this._opts.tokens),t&&"insertText"===t.inputType&&n===a.length&&(n=e.value.length),e),o=n,l=s;o&&o<i.value.length&&i.value.charAt(o-1)!==l;)o++;(i.type?i.type.match(/^(text|search|password|tel|url)$/i):!i.type)&&i===document.activeElement&&(i.setSelectionRange(o,o),setTimeout(function(){i.setSelectionRange(o,o)},0)),this.dispatch("maska",e,t),e.value!==a&&this.dispatch("input",e,t)}}},{key:"beforeInput",value:function(e){e&&e.target&&e.target.type&&e.target.type.match(/^number$/i)&&e.data&&isNaN(e.target.value+e.data)&&e.preventDefault()}},{key:"dispatch",value:function(e,t,n){t.dispatchEvent(function(e,t){var t=1<arguments.length&&void 0!==t?t:null,n=document.createEvent("Event");return n.initEvent(e,!0,!0),t&&(n.inputType=t),n}(e,n&&n.inputType||null))}}]);var r=d;function d(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},a=this,s=d;if(!(a instanceof s))throw new TypeError("Cannot call a class as a function");if(!e)throw new Error("Maska: no element for mask");if(null!=n.preprocessor&&"function"!=typeof n.preprocessor)throw new Error("Maska: preprocessor must be a function");if(n.tokens)for(var r in n.tokens)n.tokens[r]=i({},n.tokens[r]),n.tokens[r].pattern&&u(n.tokens[r].pattern)&&(n.tokens[r].pattern=new RegExp(n.tokens[r].pattern));this._opts={mask:n.mask,tokens:i(i({},o),n.tokens),preprocessor:n.preprocessor},this._el=u(e)?document.querySelectorAll(e):e.length?e:[e],this.inputEvent=function(e){return t.updateValue(e.target,e)},this.init()}function p(e,t){var n;!t.value||f.has(e)&&(u((n=t).value)&&n.value===n.oldValue||Array.isArray(n.value)&&JSON.stringify(n.value)===JSON.stringify(n.oldValue)||n.value&&n.value.mask&&n.oldValue&&n.oldValue.mask&&n.value.mask===n.oldValue.mask)||f.set(e,new r(e,(n=t.value,e={},n.mask?(e.mask=Array.isArray(n.mask)?JSON.stringify(n.mask):n.mask,e.tokens=n.tokens?i({},n.tokens):{},e.preprocessor=n.preprocessor):e.mask=Array.isArray(n)?JSON.stringify(n):n,e)))}var f;f=new WeakMap;function v(e){e.directive("maska",p)}"undefined"!=typeof window&&window.Vue&&window.Vue.use&&window.Vue.use(v),e.create=function(e,t){return new r(e,t)},e.default=v,e.install=v,e.mask=c,e.maska=p,e.tokens=o,Object.defineProperty(e,"__esModule",{value:!0})});