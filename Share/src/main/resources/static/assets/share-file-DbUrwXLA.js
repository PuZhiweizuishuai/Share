import{$ as Bt,_ as Tn,o as le,q as ln,Z as Uo,d as sn,c as tn,w as $,V as Wo,a as J,t as Qo,e as an,b as on,aK as Ko,u as Ue,k as Ln,i as rn,x as Vo,j as Zo,v as Xo,r as Jo}from"./index-eEThDJPZ.js";import{V as $o,a as Go,b as er,c as nr}from"./VCard-Cr7mm8p2.js";var St={exports:{}};(function(G,K){(function(M,I){G.exports=I()})(window,function(){return function(M){var I={};function b(k){if(I[k])return I[k].exports;var A=I[k]={i:k,l:!1,exports:{}};return M[k].call(A.exports,A,A.exports,b),A.l=!0,A.exports}return b.m=M,b.c=I,b.d=function(k,A,p){b.o(k,A)||Object.defineProperty(k,A,{configurable:!1,enumerable:!0,get:p})},b.r=function(k){Object.defineProperty(k,"__esModule",{value:!0})},b.n=function(k){var A=k&&k.__esModule?function(){return k.default}:function(){return k};return b.d(A,"a",A),A},b.o=function(k,A){return Object.prototype.hasOwnProperty.call(k,A)},b.p="/",b(b.s=41)}([function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=/mobile/i.test(window.navigator.userAgent),A={secondToTime:function(p){var u=Math.floor(p/3600),h=Math.floor((p-3600*u)/60),m=Math.floor(p-3600*u-60*h);return(u>0?[u,h,m]:[h,m]).map(function(s){return s<10?"0"+s:""+s}).join(":")},getElementViewLeft:function(p){var u=p.offsetLeft,h=p.offsetParent,m=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;h!==null&&h!==p;)u+=h.offsetLeft,h=h.offsetParent;else for(;h!==null;)u+=h.offsetLeft,h=h.offsetParent;return u-m},getElementViewTop:function(p,u){for(var h,m=p.offsetTop,s=p.offsetParent;s!==null;)m+=s.offsetTop,s=s.offsetParent;return h=document.body.scrollTop+document.documentElement.scrollTop,u?m:m-h},isMobile:k,storage:{set:function(p,u){localStorage.setItem(p,u)},get:function(p){return localStorage.getItem(p)}},nameMap:{dragStart:k?"touchstart":"mousedown",dragMove:k?"touchmove":"mousemove",dragEnd:k?"touchend":"mouseup"},randomOrder:function(p){return function(u){for(var h=u.length-1;h>=0;h--){var m=Math.floor(Math.random()*(h+1)),s=u[m];u[m]=u[h],u[h]=s}return u}([].concat(function(u){if(Array.isArray(u)){for(var h=0,m=Array(u.length);h<u.length;h++)m[h]=u[h];return m}return Array.from(u)}(Array(p))).map(function(u,h){return h}))}};I.default=A},function(M,I,b){var k=b(2);M.exports=function(A){A=A||{};var p="",u=k.$each,h=A.audio,m=(A.$value,A.$index,k.$escape),s=A.theme,l=A.index;return u(h,function(f,v){p+=`
<li>
    <span class="aplayer-list-cur" style="background-color: `,p+=m(f.theme||s),p+=`;"></span>
    <span class="aplayer-list-index">`,p+=m(v+l),p+=`</span>
    <span class="aplayer-list-title">`,p+=m(f.name),p+=`</span>
    <span class="aplayer-list-author">`,p+=m(f.artist),p+=`</span>
</li>
`}),p}},function(M,I,b){M.exports=b(15)},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=S(b(33)),A=S(b(32)),p=S(b(31)),u=S(b(30)),h=S(b(29)),m=S(b(28)),s=S(b(27)),l=S(b(26)),f=S(b(25)),v=S(b(24)),y=S(b(23)),w=S(b(22)),L=S(b(21)),C=S(b(20)),T=S(b(19));function S(g){return g&&g.__esModule?g:{default:g}}var j={play:k.default,pause:A.default,volumeUp:p.default,volumeDown:u.default,volumeOff:h.default,orderRandom:m.default,orderList:s.default,menu:l.default,loopAll:f.default,loopOne:v.default,loopNone:y.default,loading:w.default,right:L.default,skip:C.default,lrc:T.default};I.default=j},function(M,I,b){var k,A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(p){return typeof p}:function(p){return p&&typeof Symbol=="function"&&p.constructor===Symbol&&p!==Symbol.prototype?"symbol":typeof p};k=function(){return this}();try{k=k||Function("return this")()||(0,eval)("this")}catch{(typeof window>"u"?"undefined":A(window))==="object"&&(k=window)}M.exports=k},function(M,I,b){var k,A,p=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(u){return typeof u}:function(u){return u&&typeof Symbol=="function"&&u.constructor===Symbol&&u!==Symbol.prototype?"symbol":typeof u};(A=typeof(k=function(){if((typeof window>"u"?"undefined":p(window))==="object"&&document.querySelectorAll!==void 0&&window.pageYOffset!==void 0&&history.pushState!==void 0){var u=function(s,l,f,v){return f>v?l:s+(l-s)*((y=f/v)<.5?4*y*y*y:(y-1)*(2*y-2)*(2*y-2)+1);var y},h=function(s,l,f,v){l=l||500;var y=(v=v||window).scrollTop||window.pageYOffset;if(typeof s=="number")var w=parseInt(s);else var w=function(T,S){return T.nodeName==="HTML"?-S:T.getBoundingClientRect().top+S}(s,y);var L=Date.now(),C=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(T){window.setTimeout(T,15)};(function T(){var S=Date.now()-L;v!==window?v.scrollTop=u(y,w,S,l):window.scroll(0,u(y,w,S,l)),S>l?typeof f=="function"&&f(s):C(T)})()},m=function(s){if(!s.defaultPrevented){s.preventDefault(),location.hash!==this.hash&&window.history.pushState(null,null,this.hash);var l=document.getElementById(this.hash.substring(1));if(!l)return;h(l,500,function(f){location.replace("#"+f.id)})}};return document.addEventListener("DOMContentLoaded",function(){for(var s,l=document.querySelectorAll('a[href^="#"]:not([href="#"])'),f=l.length;s=l[--f];)s.addEventListener("click",m,!1)}),h}})=="function"?k.call(I,b,I,M):k)===void 0||(M.exports=A)},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=function(){function s(l,f){for(var v=0;v<f.length;v++){var y=f[v];y.enumerable=y.enumerable||!1,y.configurable=!0,"value"in y&&(y.writable=!0),Object.defineProperty(l,y.key,y)}}return function(l,f,v){return f&&s(l.prototype,f),v&&s(l,v),l}}(),A=h(b(1)),p=h(b(0)),u=h(b(5));function h(s){return s&&s.__esModule?s:{default:s}}var m=function(){function s(l){(function(f,v){if(!(f instanceof v))throw new TypeError("Cannot call a class as a function")})(this,s),this.player=l,this.index=0,this.audios=this.player.options.audio,this.bindEvents()}return k(s,[{key:"bindEvents",value:function(){var l=this;this.player.template.list.addEventListener("click",function(f){var v=void 0;v=f.target.tagName.toUpperCase()==="LI"?f.target:f.target.parentElement;var y=parseInt(v.getElementsByClassName("aplayer-list-index")[0].innerHTML)-1;y!==l.index?(l.switch(y),l.player.play()):l.player.toggle()})}},{key:"show",value:function(){this.player.events.trigger("listshow"),this.player.template.list.classList.remove("aplayer-list-hide"),this.player.template.listOl.scrollTop=33*this.index}},{key:"hide",value:function(){this.player.events.trigger("listhide"),this.player.template.list.classList.add("aplayer-list-hide")}},{key:"toggle",value:function(){this.player.template.list.classList.contains("aplayer-list-hide")?this.show():this.hide()}},{key:"add",value:function(l){this.player.events.trigger("listadd",{audios:l}),Object.prototype.toString.call(l)!=="[object Array]"&&(l=[l]),l.map(function(y){return y.name=y.name||y.title||"Audio name",y.artist=y.artist||y.author||"Audio artist",y.cover=y.cover||y.pic,y.type=y.type||"normal",y});var f=!(this.audios.length>1),v=this.audios.length===0;this.player.template.listOl.innerHTML+=(0,A.default)({theme:this.player.options.theme,audio:l,index:this.audios.length+1}),this.audios=this.audios.concat(l),f&&this.audios.length>1&&this.player.container.classList.add("aplayer-withlist"),this.player.randomOrder=p.default.randomOrder(this.audios.length),this.player.template.listCurs=this.player.container.querySelectorAll(".aplayer-list-cur"),this.player.template.listCurs[this.audios.length-1].style.backgroundColor=l.theme||this.player.options.theme,v&&(this.player.options.order==="random"?this.switch(this.player.randomOrder[0]):this.switch(0))}},{key:"remove",value:function(l){if(this.player.events.trigger("listremove",{index:l}),this.audios[l])if(this.audios.length>1){var f=this.player.container.querySelectorAll(".aplayer-list li");f[l].remove(),this.audios.splice(l,1),this.player.lrc&&this.player.lrc.remove(l),l===this.index&&(this.audios[l]?this.switch(l):this.switch(l-1)),this.index>l&&this.index--;for(var v=l;v<f.length;v++)f[v].getElementsByClassName("aplayer-list-index")[0].textContent=v;this.audios.length===1&&this.player.container.classList.remove("aplayer-withlist"),this.player.template.listCurs=this.player.container.querySelectorAll(".aplayer-list-cur")}else this.clear()}},{key:"switch",value:function(l){if(this.player.events.trigger("listswitch",{index:l}),l!==void 0&&this.audios[l]){this.index=l;var f=this.audios[this.index];this.player.template.pic.style.backgroundImage=f.cover?"url('"+f.cover+"')":"",this.player.theme(this.audios[this.index].theme||this.player.options.theme,this.index,!1),this.player.template.title.innerHTML=f.name,this.player.template.author.innerHTML=f.artist?" - "+f.artist:"";var v=this.player.container.getElementsByClassName("aplayer-list-light")[0];v&&v.classList.remove("aplayer-list-light"),this.player.container.querySelectorAll(".aplayer-list li")[this.index].classList.add("aplayer-list-light"),(0,u.default)(33*this.index,500,null,this.player.template.listOl),this.player.setAudio(f),this.player.lrc&&this.player.lrc.switch(this.index),this.player.lrc&&this.player.lrc.update(0),this.player.duration!==1&&(this.player.template.dtime.innerHTML=p.default.secondToTime(this.player.duration))}}},{key:"clear",value:function(){this.player.events.trigger("listclear"),this.index=0,this.player.container.classList.remove("aplayer-withlist"),this.player.pause(),this.audios=[],this.player.lrc&&this.player.lrc.clear(),this.player.audio.src="",this.player.template.listOl.innerHTML="",this.player.template.pic.style.backgroundImage="",this.player.theme(this.player.options.theme,this.index,!1),this.player.template.title.innerHTML="No audio",this.player.template.author.innerHTML="",this.player.bar.set("loaded",0,"width"),this.player.template.dtime.innerHTML=p.default.secondToTime(0)}}]),s}();I.default=m},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=function(){function p(u,h){for(var m=0;m<h.length;m++){var s=h[m];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(u,s.key,s)}}return function(u,h,m){return h&&p(u.prototype,h),m&&p(u,m),u}}(),A=function(){function p(){(function(u,h){if(!(u instanceof h))throw new TypeError("Cannot call a class as a function")})(this,p),this.events={},this.audioEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["destroy","listshow","listhide","listadd","listremove","listswitch","listclear","noticeshow","noticehide","lrcshow","lrchide"]}return k(p,[{key:"on",value:function(u,h){this.type(u)&&typeof h=="function"&&(this.events[u]||(this.events[u]=[]),this.events[u].push(h))}},{key:"trigger",value:function(u,h){if(this.events[u]&&this.events[u].length)for(var m=0;m<this.events[u].length;m++)this.events[u][m](h)}},{key:"type",value:function(u){return this.playerEvents.indexOf(u)!==-1?"player":this.audioEvents.indexOf(u)!==-1?"audio":(console.error("Unknown event name: "+u),null)}}]),p}();I.default=A},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=function(){function p(u,h){for(var m=0;m<h.length;m++){var s=h[m];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(u,s.key,s)}}return function(u,h,m){return h&&p(u.prototype,h),m&&p(u,m),u}}(),A=function(){function p(u){(function(h,m){if(!(h instanceof m))throw new TypeError("Cannot call a class as a function")})(this,p),this.player=u,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(h){window.setTimeout(h,1e3/60)},this.types=["loading"],this.init()}return k(p,[{key:"init",value:function(){var u=this;this.types.forEach(function(h){u["init"+h+"Checker"]()})}},{key:"initloadingChecker",value:function(){var u=this,h=0,m=0,s=!1;this.loadingChecker=setInterval(function(){u.enableloadingChecker&&(m=u.player.audio.currentTime,s||m!==h||u.player.audio.paused||(u.player.container.classList.add("aplayer-loading"),s=!0),s&&m>h&&!u.player.audio.paused&&(u.player.container.classList.remove("aplayer-loading"),s=!1),h=m)},100)}},{key:"enable",value:function(u){this["enable"+u+"Checker"]=!0,u==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(u){this["enable"+u+"Checker"]=!1}},{key:"destroy",value:function(){var u=this;this.types.forEach(function(h){u["enable"+h+"Checker"]=!1,u[h+"Checker"]&&clearInterval(u[h+"Checker"])})}}]),p}();I.default=A},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=function(){function m(s,l){for(var f=0;f<l.length;f++){var v=l[f];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(s,v.key,v)}}return function(s,l,f){return l&&m(s.prototype,l),f&&m(s,f),s}}(),A=u(b(0)),p=u(b(3));function u(m){return m&&m.__esModule?m:{default:m}}var h=function(){function m(s){(function(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")})(this,m),this.player=s,this.initPlayButton(),this.initPlayBar(),this.initOrderButton(),this.initLoopButton(),this.initMenuButton(),A.default.isMobile||this.initVolumeButton(),this.initMiniSwitcher(),this.initSkipButton(),this.initLrcButton()}return k(m,[{key:"initPlayButton",value:function(){var s=this;this.player.template.pic.addEventListener("click",function(){s.player.toggle()})}},{key:"initPlayBar",value:function(){var s=this,l=function(v){var y=((v.clientX||v.changedTouches[0].clientX)-A.default.getElementViewLeft(s.player.template.barWrap))/s.player.template.barWrap.clientWidth;y=Math.max(y,0),y=Math.min(y,1),s.player.bar.set("played",y,"width"),s.player.lrc&&s.player.lrc.update(y*s.player.duration),s.player.template.ptime.innerHTML=A.default.secondToTime(y*s.player.duration)},f=function v(y){document.removeEventListener(A.default.nameMap.dragEnd,v),document.removeEventListener(A.default.nameMap.dragMove,l);var w=((y.clientX||y.changedTouches[0].clientX)-A.default.getElementViewLeft(s.player.template.barWrap))/s.player.template.barWrap.clientWidth;w=Math.max(w,0),w=Math.min(w,1),s.player.bar.set("played",w,"width"),s.player.seek(s.player.bar.get("played","width")*s.player.duration),s.player.disableTimeupdate=!1};this.player.template.barWrap.addEventListener(A.default.nameMap.dragStart,function(){s.player.disableTimeupdate=!0,document.addEventListener(A.default.nameMap.dragMove,l),document.addEventListener(A.default.nameMap.dragEnd,f)})}},{key:"initVolumeButton",value:function(){var s=this;this.player.template.volumeButton.addEventListener("click",function(){s.player.audio.muted?(s.player.audio.muted=!1,s.player.switchVolumeIcon(),s.player.bar.set("volume",s.player.volume(),"height")):(s.player.audio.muted=!0,s.player.switchVolumeIcon(),s.player.bar.set("volume",0,"height"))});var l=function(v){var y=1-((v.clientY||v.changedTouches[0].clientY)-A.default.getElementViewTop(s.player.template.volumeBar,s.player.options.fixed))/s.player.template.volumeBar.clientHeight;y=Math.max(y,0),y=Math.min(y,1),s.player.volume(y)},f=function v(y){s.player.template.volumeBarWrap.classList.remove("aplayer-volume-bar-wrap-active"),document.removeEventListener(A.default.nameMap.dragEnd,v),document.removeEventListener(A.default.nameMap.dragMove,l);var w=1-((y.clientY||y.changedTouches[0].clientY)-A.default.getElementViewTop(s.player.template.volumeBar,s.player.options.fixed))/s.player.template.volumeBar.clientHeight;w=Math.max(w,0),w=Math.min(w,1),s.player.volume(w)};this.player.template.volumeBarWrap.addEventListener(A.default.nameMap.dragStart,function(){s.player.template.volumeBarWrap.classList.add("aplayer-volume-bar-wrap-active"),document.addEventListener(A.default.nameMap.dragMove,l),document.addEventListener(A.default.nameMap.dragEnd,f)})}},{key:"initOrderButton",value:function(){var s=this;this.player.template.order.addEventListener("click",function(){s.player.options.order==="list"?(s.player.options.order="random",s.player.template.order.innerHTML=p.default.orderRandom):s.player.options.order==="random"&&(s.player.options.order="list",s.player.template.order.innerHTML=p.default.orderList)})}},{key:"initLoopButton",value:function(){var s=this;this.player.template.loop.addEventListener("click",function(){s.player.list.audios.length>1?s.player.options.loop==="one"?(s.player.options.loop="none",s.player.template.loop.innerHTML=p.default.loopNone):s.player.options.loop==="none"?(s.player.options.loop="all",s.player.template.loop.innerHTML=p.default.loopAll):s.player.options.loop==="all"&&(s.player.options.loop="one",s.player.template.loop.innerHTML=p.default.loopOne):s.player.options.loop==="one"||s.player.options.loop==="all"?(s.player.options.loop="none",s.player.template.loop.innerHTML=p.default.loopNone):s.player.options.loop==="none"&&(s.player.options.loop="all",s.player.template.loop.innerHTML=p.default.loopAll)})}},{key:"initMenuButton",value:function(){var s=this;this.player.template.menu.addEventListener("click",function(){s.player.list.toggle()})}},{key:"initMiniSwitcher",value:function(){var s=this;this.player.template.miniSwitcher.addEventListener("click",function(){s.player.setMode(s.player.mode==="mini"?"normal":"mini")})}},{key:"initSkipButton",value:function(){var s=this;this.player.template.skipBackButton.addEventListener("click",function(){s.player.skipBack()}),this.player.template.skipForwardButton.addEventListener("click",function(){s.player.skipForward()}),this.player.template.skipPlayButton.addEventListener("click",function(){s.player.toggle()})}},{key:"initLrcButton",value:function(){var s=this;this.player.template.lrcButton.addEventListener("click",function(){s.player.template.lrcButton.classList.contains("aplayer-icon-lrc-inactivity")?(s.player.template.lrcButton.classList.remove("aplayer-icon-lrc-inactivity"),s.player.lrc&&s.player.lrc.show()):(s.player.template.lrcButton.classList.add("aplayer-icon-lrc-inactivity"),s.player.lrc&&s.player.lrc.hide())})}}]),m}();I.default=h},function(M,I,b){var k=b(2);M.exports=function(A){A=A||{};var p="",u=k.$each,h=A.lyrics,m=(A.$value,A.$index,k.$escape);return u(h,function(s,l){p+=`
    <p`,l===0&&(p+=' class="aplayer-lrc-current"'),p+=">",p+=m(s[1]),p+=`</p>
`}),p}},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k,A=function(){function m(s,l){for(var f=0;f<l.length;f++){var v=l[f];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(s,v.key,v)}}return function(s,l,f){return l&&m(s.prototype,l),f&&m(s,f),s}}(),p=b(10),u=(k=p)&&k.__esModule?k:{default:k},h=function(){function m(s){(function(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")})(this,m),this.container=s.container,this.async=s.async,this.player=s.player,this.parsed=[],this.index=0,this.current=[]}return A(m,[{key:"show",value:function(){this.player.events.trigger("lrcshow"),this.player.template.lrcWrap.classList.remove("aplayer-lrc-hide")}},{key:"hide",value:function(){this.player.events.trigger("lrchide"),this.player.template.lrcWrap.classList.add("aplayer-lrc-hide")}},{key:"toggle",value:function(){this.player.template.lrcWrap.classList.contains("aplayer-lrc-hide")?this.show():this.hide()}},{key:"update",value:function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.player.audio.currentTime;if(this.index>this.current.length-1||s<this.current[this.index][0]||!this.current[this.index+1]||s>=this.current[this.index+1][0])for(var l=0;l<this.current.length;l++)s>=this.current[l][0]&&(!this.current[l+1]||s<this.current[l+1][0])&&(this.index=l,this.container.style.transform="translateY("+16*-this.index+"px)",this.container.style.webkitTransform="translateY("+16*-this.index+"px)",this.container.getElementsByClassName("aplayer-lrc-current")[0].classList.remove("aplayer-lrc-current"),this.container.getElementsByTagName("p")[l].classList.add("aplayer-lrc-current"))}},{key:"switch",value:function(s){var l=this;if(!this.parsed[s])if(this.async){this.parsed[s]=[["00:00","Loading"]];var f=new XMLHttpRequest;f.onreadystatechange=function(){s===l.player.list.index&&f.readyState===4&&(f.status>=200&&f.status<300||f.status===304?l.parsed[s]=l.parse(f.responseText):(l.player.notice("LRC file request fails: status "+f.status),l.parsed[s]=[["00:00","Not available"]]),l.container.innerHTML=(0,u.default)({lyrics:l.parsed[s]}),l.update(0),l.current=l.parsed[s])};var v=this.player.list.audios[s].lrc;f.open("get",v,!0),f.send(null)}else this.player.list.audios[s].lrc?this.parsed[s]=this.parse(this.player.list.audios[s].lrc):this.parsed[s]=[["00:00","Not available"]];this.container.innerHTML=(0,u.default)({lyrics:this.parsed[s]}),this.update(0),this.current=this.parsed[s]}},{key:"parse",value:function(s){if(s){for(var l=(s=s.replace(/([^\]^\n])\[/g,function(g,D){return D+`
[`})).split(`
`),f=[],v=l.length,y=0;y<v;y++){var w=l[y].match(/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g),L=l[y].replace(/.*\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/g,"").replace(/<(\d{2}):(\d{2})(\.(\d{2,3}))?>/g,"").replace(/^\s+|\s+$/g,"");if(w)for(var C=w.length,T=0;T<C;T++){var S=/\[(\d{2}):(\d{2})(\.(\d{2,3}))?]/.exec(w[T]),j=60*S[1]+parseInt(S[2])+(S[4]?parseInt(S[4])/((S[4]+"").length===2?100:1e3):0);f.push([j,L])}}return(f=f.filter(function(g){return g[1]})).sort(function(g,D){return g[0]-D[0]}),f}return[]}},{key:"remove",value:function(s){this.parsed.splice(s,1)}},{key:"clear",value:function(){this.parsed=[],this.container.innerHTML=""}}]),m}();I.default=h},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k,A=function(){function m(s,l){for(var f=0;f<l.length;f++){var v=l[f];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(s,v.key,v)}}return function(s,l,f){return l&&m(s.prototype,l),f&&m(s,f),s}}(),p=b(0),u=(k=p)&&k.__esModule?k:{default:k},h=function(){function m(s){(function(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")})(this,m),this.storageName=s.options.storageName,this.data=JSON.parse(u.default.storage.get(this.storageName)),this.data||(this.data={}),this.data.volume=this.data.volume||s.options.volume}return A(m,[{key:"get",value:function(s){return this.data[s]}},{key:"set",value:function(s,l){this.data[s]=l,u.default.storage.set(this.storageName,JSON.stringify(this.data))}}]),m}();I.default=h},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=function(){function p(u,h){for(var m=0;m<h.length;m++){var s=h[m];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(u,s.key,s)}}return function(u,h,m){return h&&p(u.prototype,h),m&&p(u,m),u}}(),A=function(){function p(u){(function(h,m){if(!(h instanceof m))throw new TypeError("Cannot call a class as a function")})(this,p),this.elements={},this.elements.volume=u.volume,this.elements.played=u.played,this.elements.loaded=u.loaded}return k(p,[{key:"set",value:function(u,h,m){h=Math.max(h,0),h=Math.min(h,1),this.elements[u].style[m]=100*h+"%"}},{key:"get",value:function(u,h){return parseFloat(this.elements[u].style[h])/100}}]),p}();I.default=A},function(M,I,b){(function(k){M.exports=!1;try{M.exports=Object.prototype.toString.call(k.process)==="[object process]"}catch{}}).call(this,b(4))},function(M,I,b){(function(k){var A=b(14),p=Object.create(A?k:window),u=/["&'<>]/;p.$escape=function(h){return function(m){var s=""+m,l=u.exec(s);if(!l)return m;var f="",v=void 0,y=void 0,w=void 0;for(v=l.index,y=0;v<s.length;v++){switch(s.charCodeAt(v)){case 34:w="&#34;";break;case 38:w="&#38;";break;case 39:w="&#39;";break;case 60:w="&#60;";break;case 62:w="&#62;";break;default:continue}y!==v&&(f+=s.substring(y,v)),y=v+1,f+=w}return y!==v?f+s.substring(y,v):f}(function m(s){return typeof s!="string"&&(s=s==null?"":typeof s=="function"?m(s.call(s)):JSON.stringify(s)),s}(h))},p.$each=function(h,m){if(Array.isArray(h))for(var s=0,l=h.length;s<l;s++)m(h[s],s);else for(var f in h)m(h[f],f)},M.exports=p}).call(this,b(4))},function(M,I,b){var k=b(2);M.exports=function(A){var p="",u=(A=A||{}).options,h=A.cover,m=k.$escape,s=A.icons,l=function(v){return p+=v},f=A.getObject;return A.theme,A.audio,A.index,u.fixed?(p+=`
<div class="aplayer-list`,u.listFolded&&(p+=" aplayer-list-hide"),p+='"',u.listMaxHeight&&(p+=' style="max-height: ',p+=m(u.listMaxHeight),p+='"'),p+=`>
    <ol`,u.listMaxHeight&&(p+=' style="max-height: ',p+=m(u.listMaxHeight),p+='"'),p+=`>
        `,l(b(1)(f({theme:u.theme,audio:u.audio,index:1}))),p+=`
    </ol>
</div>
<div class="aplayer-body">
    <div class="aplayer-pic" style="`,h&&(p+="background-image: url(&quot;",p+=m(h),p+="&quot;);"),p+="background-color: ",p+=m(u.theme),p+=`;">
        <div class="aplayer-button aplayer-play">`,p+=s.play,p+=`</div>
    </div>
    <div class="aplayer-info" style="display: none;">
        <div class="aplayer-music">
            <span class="aplayer-title">No audio</span>
            <span class="aplayer-author"></span>
        </div>
        <div class="aplayer-controller">
            <div class="aplayer-bar-wrap">
                <div class="aplayer-bar">
                    <div class="aplayer-loaded" style="width: 0"></div>
                    <div class="aplayer-played" style="width: 0; background: `,p+=m(u.theme),p+=`;">
                        <span class="aplayer-thumb" style="background: `,p+=m(u.theme),p+=`;">
                            <span class="aplayer-loading-icon">`,p+=s.loading,p+=`</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="aplayer-time">
                <span class="aplayer-time-inner">
                    <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>
                </span>
                <span class="aplayer-icon aplayer-icon-back">
                    `,p+=s.skip,p+=`
                </span>
                <span class="aplayer-icon aplayer-icon-play">
                    `,p+=s.play,p+=`
                </span>
                <span class="aplayer-icon aplayer-icon-forward">
                    `,p+=s.skip,p+=`
                </span>
                <div class="aplayer-volume-wrap">
                    <button type="button" class="aplayer-icon aplayer-icon-volume-down">
                        `,p+=s.volumeDown,p+=`
                    </button>
                    <div class="aplayer-volume-bar-wrap">
                        <div class="aplayer-volume-bar">
                            <div class="aplayer-volume" style="height: 80%; background: `,p+=m(u.theme),p+=`;"></div>
                        </div>
                    </div>
                </div>
                <button type="button" class="aplayer-icon aplayer-icon-order">
                    `,u.order==="list"?p+=s.orderList:u.order==="random"&&(p+=s.orderRandom),p+=`
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-loop">
                    `,u.loop==="one"?p+=s.loopOne:u.loop==="all"?p+=s.loopAll:u.loop==="none"&&(p+=s.loopNone),p+=`
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-menu">
                    `,p+=s.menu,p+=`
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-lrc">
                    `,p+=s.lrc,p+=`
                </button>
            </div>
        </div>
    </div>
    <div class="aplayer-notice"></div>
    <div class="aplayer-miniswitcher"><button class="aplayer-icon">`,p+=s.right,p+=`</button></div>
</div>
<div class="aplayer-lrc">
    <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>
</div>
`):(p+=`
<div class="aplayer-body">
    <div class="aplayer-pic" style="`,h&&(p+="background-image: url(&quot;",p+=m(h),p+="&quot;);"),p+="background-color: ",p+=m(u.theme),p+=`;">
        <div class="aplayer-button aplayer-play">`,p+=s.play,p+=`</div>
    </div>
    <div class="aplayer-info">
        <div class="aplayer-music">
            <span class="aplayer-title">No audio</span>
            <span class="aplayer-author"></span>
        </div>
        <div class="aplayer-lrc">
            <div class="aplayer-lrc-contents" style="transform: translateY(0); -webkit-transform: translateY(0);"></div>
        </div>
        <div class="aplayer-controller">
            <div class="aplayer-bar-wrap">
                <div class="aplayer-bar">
                    <div class="aplayer-loaded" style="width: 0"></div>
                    <div class="aplayer-played" style="width: 0; background: `,p+=m(u.theme),p+=`;">
                        <span class="aplayer-thumb" style="background: `,p+=m(u.theme),p+=`;">
                            <span class="aplayer-loading-icon">`,p+=s.loading,p+=`</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="aplayer-time">
                <span class="aplayer-time-inner">
                    <span class="aplayer-ptime">00:00</span> / <span class="aplayer-dtime">00:00</span>
                </span>
                <span class="aplayer-icon aplayer-icon-back">
                    `,p+=s.skip,p+=`
                </span>
                <span class="aplayer-icon aplayer-icon-play">
                    `,p+=s.play,p+=`
                </span>
                <span class="aplayer-icon aplayer-icon-forward">
                    `,p+=s.skip,p+=`
                </span>
                <div class="aplayer-volume-wrap">
                    <button type="button" class="aplayer-icon aplayer-icon-volume-down">
                        `,p+=s.volumeDown,p+=`
                    </button>
                    <div class="aplayer-volume-bar-wrap">
                        <div class="aplayer-volume-bar">
                            <div class="aplayer-volume" style="height: 80%; background: `,p+=m(u.theme),p+=`;"></div>
                        </div>
                    </div>
                </div>
                <button type="button" class="aplayer-icon aplayer-icon-order">
                    `,u.order==="list"?p+=s.orderList:u.order==="random"&&(p+=s.orderRandom),p+=`
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-loop">
                    `,u.loop==="one"?p+=s.loopOne:u.loop==="all"?p+=s.loopAll:u.loop==="none"&&(p+=s.loopNone),p+=`
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-menu">
                    `,p+=s.menu,p+=`
                </button>
                <button type="button" class="aplayer-icon aplayer-icon-lrc">
                    `,p+=s.lrc,p+=`
                </button>
            </div>
        </div>
    </div>
    <div class="aplayer-notice"></div>
    <div class="aplayer-miniswitcher"><button class="aplayer-icon">`,p+=s.right,p+=`</button></div>
</div>
<div class="aplayer-list`,u.listFolded&&(p+=" aplayer-list-hide"),p+='"',u.listMaxHeight&&(p+=' style="max-height: ',p+=m(u.listMaxHeight),p+='"'),p+=`>
    <ol`,u.listMaxHeight&&(p+=' style="max-height: ',p+=m(u.listMaxHeight),p+='"'),p+=`>
        `,l(b(1)(f({theme:u.theme,audio:u.audio,index:1}))),p+=`
    </ol>
</div>
`),p}},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=function(){function m(s,l){for(var f=0;f<l.length;f++){var v=l[f];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(s,v.key,v)}}return function(s,l,f){return l&&m(s.prototype,l),f&&m(s,f),s}}(),A=u(b(3)),p=u(b(16));function u(m){return m&&m.__esModule?m:{default:m}}var h=function(){function m(s){(function(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")})(this,m),this.container=s.container,this.options=s.options,this.randomOrder=s.randomOrder,this.init()}return k(m,[{key:"init",value:function(){var s="";this.options.audio.length&&(s=this.options.order==="random"?this.options.audio[this.randomOrder[0]].cover:this.options.audio[0].cover),this.container.innerHTML=(0,p.default)({options:this.options,icons:A.default,cover:s,getObject:function(l){return l}}),this.lrc=this.container.querySelector(".aplayer-lrc-contents"),this.lrcWrap=this.container.querySelector(".aplayer-lrc"),this.ptime=this.container.querySelector(".aplayer-ptime"),this.info=this.container.querySelector(".aplayer-info"),this.time=this.container.querySelector(".aplayer-time"),this.barWrap=this.container.querySelector(".aplayer-bar-wrap"),this.button=this.container.querySelector(".aplayer-button"),this.body=this.container.querySelector(".aplayer-body"),this.list=this.container.querySelector(".aplayer-list"),this.listOl=this.container.querySelector(".aplayer-list ol"),this.listCurs=this.container.querySelectorAll(".aplayer-list-cur"),this.played=this.container.querySelector(".aplayer-played"),this.loaded=this.container.querySelector(".aplayer-loaded"),this.thumb=this.container.querySelector(".aplayer-thumb"),this.volume=this.container.querySelector(".aplayer-volume"),this.volumeBar=this.container.querySelector(".aplayer-volume-bar"),this.volumeButton=this.container.querySelector(".aplayer-time button"),this.volumeBarWrap=this.container.querySelector(".aplayer-volume-bar-wrap"),this.loop=this.container.querySelector(".aplayer-icon-loop"),this.order=this.container.querySelector(".aplayer-icon-order"),this.menu=this.container.querySelector(".aplayer-icon-menu"),this.pic=this.container.querySelector(".aplayer-pic"),this.title=this.container.querySelector(".aplayer-title"),this.author=this.container.querySelector(".aplayer-author"),this.dtime=this.container.querySelector(".aplayer-dtime"),this.notice=this.container.querySelector(".aplayer-notice"),this.miniSwitcher=this.container.querySelector(".aplayer-miniswitcher"),this.skipBackButton=this.container.querySelector(".aplayer-icon-back"),this.skipForwardButton=this.container.querySelector(".aplayer-icon-forward"),this.skipPlayButton=this.container.querySelector(".aplayer-icon-play"),this.lrcButton=this.container.querySelector(".aplayer-icon-lrc")}}]),m}();I.default=h},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0}),I.default=function(k){var A={container:k.element||document.getElementsByClassName("aplayer")[0],mini:k.narrow||k.fixed||!1,fixed:!1,autoplay:!1,mutex:!0,lrcType:k.showlrc||k.lrc||0,preload:"auto",theme:"#b7daff",loop:"all",order:"list",volume:.7,listFolded:k.fixed,listMaxHeight:k.listmaxheight||"250px",audio:k.music||[],storageName:"aplayer-setting"};for(var p in A)A.hasOwnProperty(p)&&!k.hasOwnProperty(p)&&(k[p]=A[p]);return Object.prototype.toString.call(k.audio)!=="[object Array]"&&(k.audio=[k.audio]),k.audio.map(function(u){return u.name=u.name||u.title||"Audio name",u.artist=u.artist||u.author||"Audio artist",u.cover=u.cover||u.pic,u.type=u.type||"normal",u}),k.audio.length<=1&&k.loop==="one"&&(k.loop="all"),k}},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M25.468 6.947c-0.326-0.172-0.724-0.151-1.030 0.057l-6.438 4.38v-3.553c0-0.371-0.205-0.71-0.532-0.884-0.326-0.172-0.724-0.151-1.030 0.057l-12 8.164c-0.274 0.186-0.438 0.496-0.438 0.827s0.164 0.641 0.438 0.827l12 8.168c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-3.556l6.438 4.382c0.169 0.115 0.365 0.174 0.562 0.174 0.16 0 0.321-0.038 0.468-0.116 0.327-0.173 0.532-0.514 0.532-0.884v-16.333c0-0.371-0.205-0.71-0.532-0.884z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 29 32"><path d="M2.667 7.027l1.707-1.693 22.293 22.293-1.693 1.707-4-4h-11.64v4l-5.333-5.333 5.333-5.333v4h8.973l-8.973-8.973v0.973h-2.667v-3.64l-4-4zM22.667 17.333h2.667v5.573l-2.667-2.667v-2.907zM22.667 6.667v-4l5.333 5.333-5.333 5.333v-4h-10.907l-2.667-2.667h13.573z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 33 32"><path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333zM17.333 20v-8h-1.333l-2.667 1.333v1.333h2v5.333h2z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 29 32"><path d="M9.333 9.333h13.333v4l5.333-5.333-5.333-5.333v4h-16v8h2.667v-5.333zM22.667 22.667h-13.333v-4l-5.333 5.333 5.333 5.333v-4h16v-8h-2.667v5.333z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 22 32"><path d="M20.8 14.4q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2zM1.6 11.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2zM20.8 20.8q0.704 0 1.152 0.48t0.448 1.12-0.48 1.12-1.12 0.48h-19.2q-0.64 0-1.12-0.48t-0.48-1.12 0.448-1.12 1.152-0.48h19.2z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M0.622 18.334h19.54v7.55l11.052-9.412-11.052-9.413v7.549h-19.54v3.725z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22.667 4l7 6-7 6 7 6-7 6v-4h-3.653l-3.76-3.76 2.827-2.827 2.587 2.587h2v-8h-2l-12 12h-6v-4h4.347l12-12h3.653v-4zM2.667 8h6l3.76 3.76-2.827 2.827-2.587-2.587h-4.347v-4z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 28 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056zM29.728 16q0 4.096-2.272 7.552t-6.048 5.056q-0.224 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.64 0.704-1.056 0.128-0.064 0.384-0.192t0.416-0.192q0.8-0.448 1.44-0.896 2.208-1.632 3.456-4.064t1.216-5.152-1.216-5.152-3.456-4.064q-0.64-0.448-1.44-0.896-0.128-0.096-0.416-0.192t-0.384-0.192q-0.704-0.416-0.704-1.056 0-0.448 0.32-0.8t0.832-0.352q0.224 0 0.448 0.096 3.776 1.632 6.048 5.056t2.272 7.552z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},function(M,I){M.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 31"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},function(M,I,b){var k,A,p=M.exports={};function u(){throw new Error("setTimeout has not been defined")}function h(){throw new Error("clearTimeout has not been defined")}function m(T){if(k===setTimeout)return setTimeout(T,0);if((k===u||!k)&&setTimeout)return k=setTimeout,setTimeout(T,0);try{return k(T,0)}catch{try{return k.call(null,T,0)}catch{return k.call(this,T,0)}}}(function(){try{k=typeof setTimeout=="function"?setTimeout:u}catch{k=u}try{A=typeof clearTimeout=="function"?clearTimeout:h}catch{A=h}})();var s,l=[],f=!1,v=-1;function y(){f&&s&&(f=!1,s.length?l=s.concat(l):v=-1,l.length&&w())}function w(){if(!f){var T=m(y);f=!0;for(var S=l.length;S;){for(s=l,l=[];++v<S;)s&&s[v].run();v=-1,S=l.length}s=null,f=!1,function(j){if(A===clearTimeout)return clearTimeout(j);if((A===h||!A)&&clearTimeout)return A=clearTimeout,clearTimeout(j);try{A(j)}catch{try{return A.call(null,j)}catch{return A.call(this,j)}}}(T)}}function L(T,S){this.fun=T,this.array=S}function C(){}p.nextTick=function(T){var S=new Array(arguments.length-1);if(arguments.length>1)for(var j=1;j<arguments.length;j++)S[j-1]=arguments[j];l.push(new L(T,S)),l.length!==1||f||m(w)},L.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=C,p.addListener=C,p.once=C,p.off=C,p.removeListener=C,p.removeAllListeners=C,p.emit=C,p.prependListener=C,p.prependOnceListener=C,p.listeners=function(T){return[]},p.binding=function(T){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(T){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(M,I,b){(function(k,A){(function(p,u){if(!p.setImmediate){var h,m,s,l,f,v=1,y={},w=!1,L=p.document,C=Object.getPrototypeOf&&Object.getPrototypeOf(p);C=C&&C.setTimeout?C:p,{}.toString.call(p.process)==="[object process]"?h=function(j){A.nextTick(function(){S(j)})}:function(){if(p.postMessage&&!p.importScripts){var j=!0,g=p.onmessage;return p.onmessage=function(){j=!1},p.postMessage("","*"),p.onmessage=g,j}}()?(l="setImmediate$"+Math.random()+"$",f=function(j){j.source===p&&typeof j.data=="string"&&j.data.indexOf(l)===0&&S(+j.data.slice(l.length))},p.addEventListener?p.addEventListener("message",f,!1):p.attachEvent("onmessage",f),h=function(j){p.postMessage(l+j,"*")}):p.MessageChannel?((s=new MessageChannel).port1.onmessage=function(j){S(j.data)},h=function(j){s.port2.postMessage(j)}):L&&"onreadystatechange"in L.createElement("script")?(m=L.documentElement,h=function(j){var g=L.createElement("script");g.onreadystatechange=function(){S(j),g.onreadystatechange=null,m.removeChild(g),g=null},m.appendChild(g)}):h=function(j){setTimeout(S,0,j)},C.setImmediate=function(j){typeof j!="function"&&(j=new Function(""+j));for(var g=new Array(arguments.length-1),D=0;D<g.length;D++)g[D]=arguments[D+1];var N={callback:j,args:g};return y[v]=N,h(v),v++},C.clearImmediate=T}function T(j){delete y[j]}function S(j){if(w)setTimeout(S,0,j);else{var g=y[j];if(g){w=!0;try{(function(D){var N=D.callback,H=D.args;switch(H.length){case 0:N();break;case 1:N(H[0]);break;case 2:N(H[0],H[1]);break;case 3:N(H[0],H[1],H[2]);break;default:N.apply(u,H)}})(g)}finally{T(j),w=!1}}}}})(typeof self>"u"?k===void 0?void 0:k:self)}).call(this,b(4),b(34))},function(M,I,b){var k=Function.prototype.apply;function A(p,u){this._id=p,this._clearFn=u}I.setTimeout=function(){return new A(k.call(setTimeout,window,arguments),clearTimeout)},I.setInterval=function(){return new A(k.call(setInterval,window,arguments),clearInterval)},I.clearTimeout=I.clearInterval=function(p){p&&p.close()},A.prototype.unref=A.prototype.ref=function(){},A.prototype.close=function(){this._clearFn.call(window,this._id)},I.enroll=function(p,u){clearTimeout(p._idleTimeoutId),p._idleTimeout=u},I.unenroll=function(p){clearTimeout(p._idleTimeoutId),p._idleTimeout=-1},I._unrefActive=I.active=function(p){clearTimeout(p._idleTimeoutId);var u=p._idleTimeout;u>=0&&(p._idleTimeoutId=setTimeout(function(){p._onTimeout&&p._onTimeout()},u))},b(35),I.setImmediate=setImmediate,I.clearImmediate=clearImmediate},function(M,I,b){(function(k){var A=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(y){return typeof y}:function(y){return y&&typeof Symbol=="function"&&y.constructor===Symbol&&y!==Symbol.prototype?"symbol":typeof y},p=setTimeout;function u(){}function h(y){if(!(this instanceof h))throw new TypeError("Promises must be constructed via new");if(typeof y!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],v(y,this)}function m(y,w){for(;y._state===3;)y=y._value;y._state!==0?(y._handled=!0,h._immediateFn(function(){var L=y._state===1?w.onFulfilled:w.onRejected;if(L!==null){var C;try{C=L(y._value)}catch(T){return void l(w.promise,T)}s(w.promise,C)}else(y._state===1?s:l)(w.promise,y._value)})):y._deferreds.push(w)}function s(y,w){try{if(w===y)throw new TypeError("A promise cannot be resolved with itself.");if(w&&((w===void 0?"undefined":A(w))==="object"||typeof w=="function")){var L=w.then;if(w instanceof h)return y._state=3,y._value=w,void f(y);if(typeof L=="function")return void v((C=L,T=w,function(){C.apply(T,arguments)}),y)}y._state=1,y._value=w,f(y)}catch(S){l(y,S)}var C,T}function l(y,w){y._state=2,y._value=w,f(y)}function f(y){y._state===2&&y._deferreds.length===0&&h._immediateFn(function(){y._handled||h._unhandledRejectionFn(y._value)});for(var w=0,L=y._deferreds.length;w<L;w++)m(y,y._deferreds[w]);y._deferreds=null}function v(y,w){var L=!1;try{y(function(C){L||(L=!0,s(w,C))},function(C){L||(L=!0,l(w,C))})}catch(C){if(L)return;L=!0,l(w,C)}}h.prototype.catch=function(y){return this.then(null,y)},h.prototype.then=function(y,w){var L=new this.constructor(u);return m(this,new function(C,T,S){this.onFulfilled=typeof C=="function"?C:null,this.onRejected=typeof T=="function"?T:null,this.promise=S}(y,w,L)),L},h.prototype.finally=function(y){var w=this.constructor;return this.then(function(L){return w.resolve(y()).then(function(){return L})},function(L){return w.resolve(y()).then(function(){return w.reject(L)})})},h.all=function(y){return new h(function(w,L){if(!y||y.length===void 0)throw new TypeError("Promise.all accepts an array");var C=Array.prototype.slice.call(y);if(C.length===0)return w([]);var T=C.length;function S(g,D){try{if(D&&((D===void 0?"undefined":A(D))==="object"||typeof D=="function")){var N=D.then;if(typeof N=="function")return void N.call(D,function(H){S(g,H)},L)}C[g]=D,--T==0&&w(C)}catch(H){L(H)}}for(var j=0;j<C.length;j++)S(j,C[j])})},h.resolve=function(y){return y&&(y===void 0?"undefined":A(y))==="object"&&y.constructor===h?y:new h(function(w){w(y)})},h.reject=function(y){return new h(function(w,L){L(y)})},h.race=function(y){return new h(function(w,L){for(var C=0,T=y.length;C<T;C++)y[C].then(w,L)})},h._immediateFn=typeof k=="function"&&function(y){k(y)}||function(y){p(y,0)},h._unhandledRejectionFn=function(y){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",y)},M.exports=h}).call(this,b(36).setImmediate)},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0});var k=function(){function j(g,D){for(var N=0;N<D.length;N++){var H=D[N];H.enumerable=H.enumerable||!1,H.configurable=!0,"value"in H&&(H.writable=!0),Object.defineProperty(g,H.key,H)}}return function(g,D,N){return D&&j(g.prototype,D),N&&j(g,N),g}}(),A=C(b(37)),p=C(b(0)),u=C(b(3)),h=C(b(18)),m=C(b(17)),s=C(b(13)),l=C(b(12)),f=C(b(11)),v=C(b(9)),y=C(b(8)),w=C(b(7)),L=C(b(6));function C(j){return j&&j.__esModule?j:{default:j}}var T=[],S=function(){function j(g){if(function(H,Q){if(!(H instanceof Q))throw new TypeError("Cannot call a class as a function")}(this,j),this.options=(0,h.default)(g),this.container=this.options.container,this.paused=!0,this.playedPromise=A.default.resolve(),this.mode="normal",this.randomOrder=p.default.randomOrder(this.options.audio.length),this.container.classList.add("aplayer"),this.options.lrcType&&!this.options.fixed&&this.container.classList.add("aplayer-withlrc"),this.options.audio.length>1&&this.container.classList.add("aplayer-withlist"),p.default.isMobile&&this.container.classList.add("aplayer-mobile"),this.arrow=this.container.offsetWidth<=300,this.arrow&&this.container.classList.add("aplayer-arrow"),this.container=this.options.container,this.options.lrcType===2||this.options.lrcType===!0)for(var D=this.container.getElementsByClassName("aplayer-lrc-content"),N=0;N<D.length;N++)this.options.audio[N]&&(this.options.audio[N].lrc=D[N].innerHTML);this.template=new m.default({container:this.container,options:this.options,randomOrder:this.randomOrder}),this.options.fixed&&(this.container.classList.add("aplayer-fixed"),this.template.body.style.width=this.template.body.offsetWidth-18+"px"),this.options.mini&&(this.setMode("mini"),this.template.info.style.display="block"),this.template.info.offsetWidth<200&&this.template.time.classList.add("aplayer-time-narrow"),this.options.lrcType&&(this.lrc=new f.default({container:this.template.lrc,async:this.options.lrcType===3,player:this})),this.events=new w.default,this.storage=new l.default(this),this.bar=new s.default(this.template),this.controller=new v.default(this),this.timer=new y.default(this),this.list=new L.default(this),this.initAudio(),this.bindEvents(),this.options.order==="random"?this.list.switch(this.randomOrder[0]):this.list.switch(0),this.options.autoplay&&this.play(),T.push(this)}return k(j,[{key:"initAudio",value:function(){var g=this;this.audio=document.createElement("audio"),this.audio.preload=this.options.preload;for(var D=function(H){g.audio.addEventListener(g.events.audioEvents[H],function(Q){g.events.trigger(g.events.audioEvents[H],Q)})},N=0;N<this.events.audioEvents.length;N++)D(N);this.volume(this.storage.get("volume"),!0)}},{key:"bindEvents",value:function(){var g=this;this.on("play",function(){g.paused&&g.setUIPlaying()}),this.on("pause",function(){g.paused||g.setUIPaused()}),this.on("timeupdate",function(){if(!g.disableTimeupdate){g.bar.set("played",g.audio.currentTime/g.duration,"width"),g.lrc&&g.lrc.update();var N=p.default.secondToTime(g.audio.currentTime);g.template.ptime.innerHTML!==N&&(g.template.ptime.innerHTML=N)}}),this.on("durationchange",function(){g.duration!==1&&(g.template.dtime.innerHTML=p.default.secondToTime(g.duration))}),this.on("progress",function(){var N=g.audio.buffered.length?g.audio.buffered.end(g.audio.buffered.length-1)/g.duration:0;g.bar.set("loaded",N,"width")});var D=void 0;this.on("error",function(){g.list.audios.length>1?(g.notice("An audio error has occurred, player will skip forward in 2 seconds."),D=setTimeout(function(){g.skipForward(),g.paused||g.play()},2e3)):g.list.audios.length===1&&g.notice("An audio error has occurred.")}),this.events.on("listswitch",function(){D&&clearTimeout(D)}),this.on("ended",function(){g.options.loop==="none"?g.options.order==="list"?g.list.index<g.list.audios.length-1?(g.list.switch((g.list.index+1)%g.list.audios.length),g.play()):(g.list.switch((g.list.index+1)%g.list.audios.length),g.pause()):g.options.order==="random"&&(g.randomOrder.indexOf(g.list.index)<g.randomOrder.length-1?(g.list.switch(g.nextIndex()),g.play()):(g.list.switch(g.nextIndex()),g.pause())):g.options.loop==="one"?(g.list.switch(g.list.index),g.play()):g.options.loop==="all"&&(g.skipForward(),g.play())})}},{key:"setAudio",value:function(g){this.hls&&(this.hls.destroy(),this.hls=null);var D=g.type;this.options.customAudioType&&this.options.customAudioType[D]?Object.prototype.toString.call(this.options.customAudioType[D])==="[object Function]"?this.options.customAudioType[D](this.audio,g,this):console.error("Illegal customType: "+D):(D&&D!=="auto"||(D=/m3u8(#|\?|$)/i.exec(g.url)?"hls":"normal"),D==="hls"?Hls.isSupported()?(this.hls=new Hls,this.hls.loadSource(g.url),this.hls.attachMedia(this.audio)):this.audio.canPlayType("application/x-mpegURL")||this.audio.canPlayType("application/vnd.apple.mpegURL")?this.audio.src=g.url:this.notice("Error: HLS is not supported."):D==="normal"&&(this.audio.src=g.url)),this.seek(0),this.paused||this.audio.play()}},{key:"theme",value:function(){var g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:this.list.audios[this.list.index].theme||this.options.theme,D=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.list.index;(!(arguments.length>2&&arguments[2]!==void 0)||arguments[2])&&this.list.audios[D]&&(this.list.audios[D].theme=g),this.template.listCurs[D]&&(this.template.listCurs[D].style.backgroundColor=g),D===this.list.index&&(this.template.pic.style.backgroundColor=g,this.template.played.style.background=g,this.template.thumb.style.background=g,this.template.volume.style.background=g)}},{key:"seek",value:function(g){g=Math.max(g,0),g=Math.min(g,this.duration),this.audio.currentTime=g,this.bar.set("played",g/this.duration,"width"),this.template.ptime.innerHTML=p.default.secondToTime(g)}},{key:"setUIPlaying",value:function(){var g=this;if(this.paused&&(this.paused=!1,this.template.button.classList.remove("aplayer-play"),this.template.button.classList.add("aplayer-pause"),this.template.button.innerHTML="",setTimeout(function(){g.template.button.innerHTML=u.default.pause},100),this.template.skipPlayButton.innerHTML=u.default.pause),this.timer.enable("loading"),this.options.mutex)for(var D=0;D<T.length;D++)this!==T[D]&&T[D].pause()}},{key:"play",value:function(){var g=this;this.setUIPlaying();var D=this.audio.play();D&&D.catch(function(N){console.warn(N),N.name==="NotAllowedError"&&g.setUIPaused()})}},{key:"setUIPaused",value:function(){var g=this;this.paused||(this.paused=!0,this.template.button.classList.remove("aplayer-pause"),this.template.button.classList.add("aplayer-play"),this.template.button.innerHTML="",setTimeout(function(){g.template.button.innerHTML=u.default.play},100),this.template.skipPlayButton.innerHTML=u.default.play),this.container.classList.remove("aplayer-loading"),this.timer.disable("loading")}},{key:"pause",value:function(){this.setUIPaused(),this.audio.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeButton.innerHTML=u.default.volumeUp:this.volume()>0?this.template.volumeButton.innerHTML=u.default.volumeDown:this.template.volumeButton.innerHTML=u.default.volumeOff}},{key:"volume",value:function(g,D){return g=parseFloat(g),isNaN(g)||(g=Math.max(g,0),g=Math.min(g,1),this.bar.set("volume",g,"height"),D||this.storage.set("volume",g),this.audio.volume=g,this.audio.muted&&(this.audio.muted=!1),this.switchVolumeIcon()),this.audio.muted?0:this.audio.volume}},{key:"on",value:function(g,D){this.events.on(g,D)}},{key:"toggle",value:function(){this.template.button.classList.contains("aplayer-play")?this.play():this.template.button.classList.contains("aplayer-pause")&&this.pause()}},{key:"switchAudio",value:function(g){this.list.switch(g)}},{key:"addAudio",value:function(g){this.list.add(g)}},{key:"removeAudio",value:function(g){this.list.remove(g)}},{key:"destroy",value:function(){T.splice(T.indexOf(this),1),this.pause(),this.container.innerHTML="",this.audio.src="",this.timer.destroy(),this.events.trigger("destroy")}},{key:"setMode",value:function(){var g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"normal";this.mode=g,g==="mini"?this.container.classList.add("aplayer-narrow"):g==="normal"&&this.container.classList.remove("aplayer-narrow")}},{key:"notice",value:function(g){var D=this,N=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,H=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8;this.template.notice.innerHTML=g,this.template.notice.style.opacity=H,this.noticeTime&&clearTimeout(this.noticeTime),this.events.trigger("noticeshow",{text:g}),N&&(this.noticeTime=setTimeout(function(){D.template.notice.style.opacity=0,D.events.trigger("noticehide")},N))}},{key:"prevIndex",value:function(){if(!(this.list.audios.length>1))return 0;if(this.options.order==="list")return this.list.index-1<0?this.list.audios.length-1:this.list.index-1;if(this.options.order==="random"){var g=this.randomOrder.indexOf(this.list.index);return g===0?this.randomOrder[this.randomOrder.length-1]:this.randomOrder[g-1]}}},{key:"nextIndex",value:function(){if(!(this.list.audios.length>1))return 0;if(this.options.order==="list")return(this.list.index+1)%this.list.audios.length;if(this.options.order==="random"){var g=this.randomOrder.indexOf(this.list.index);return g===this.randomOrder.length-1?this.randomOrder[0]:this.randomOrder[g+1]}}},{key:"skipBack",value:function(){this.list.switch(this.prevIndex())}},{key:"skipForward",value:function(){this.list.switch(this.nextIndex())}},{key:"duration",get:function(){return isNaN(this.audio.duration)?0:this.audio.duration}}],[{key:"version",get:function(){return"1.10.1"}}]),j}();I.default=S},,function(M,I,b){},function(M,I,b){Object.defineProperty(I,"__esModule",{value:!0}),b(40);var k,A=b(38),p=(k=A)&&k.__esModule?k:{default:k};console.log(`
 %c APlayer v1.10.1 af84efb %c http://aplayer.js.org 
`,"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;"),I.default=p.default}]).default})})(St);var tr=St.exports;const ar=Bt(tr),or={props:{voice:{type:Object,default:()=>{}}},data(){return{ap:null,vioceData:this.voice}},mounted(){this.init()},methods:{init(){this.ap=new ar({container:document.querySelector("#aplayer"),audio:[{name:this.vioceData.uploadFilename,url:`${this.vioceData.path}?filename=${encodeURIComponent(this.vioceData.uploadFilename)}&type=inline&key=${encodeURIComponent(this.vioceData.userSeeKey)}`}]})},destroy(){this.ap.destroy()}}},rr={id:"aplayer"};function ir(G,K,M,I,b,k){return le(),ln("div",rr)}const It=Tn(or,[["render",ir]]);var Lt={exports:{}};(function(G,K){(function(M,I){G.exports=I()})(self,()=>(()=>{var M={916:(A,p,u)=>{var h=u(471);A.exports=function(m){var s,l="",f=(m=m||{}).video,v=m.options,y=h.$escape,w=m.tran,L=m.icons,C=m.index,T=h.$each;return m.$value,m.$index,l+=`<div class="dplayer-mask"></div>
<div class="dplayer-video-wrap">
    `,s=u(568)(f),l+=s,l+=`
    `,v.logo&&(l+=`
    <div class="dplayer-logo">
        <img src="`,l+=y(v.logo),l+=`">
    </div>
    `),l+=`
    <div class="dplayer-danmaku"`,v.danmaku&&v.danmaku.bottom&&(l+=' style="margin-bottom:',l+=y(v.danmaku.bottom),l+='"'),l+=`>
        <div class="dplayer-danmaku-item dplayer-danmaku-item--demo"></div>
    </div>
    <div class="dplayer-subtitle"></div>
    <div class="dplayer-bezel">
        <span class="dplayer-bezel-icon"></span>
        `,v.danmaku&&(l+=`
        <span class="dplayer-danloading">`,l+=y(w("danmaku-loading")),l+=`</span>
        `),l+=`
        <span class="diplayer-loading-icon">`,l+=L.loading,l+=`</span>
    </div>
</div>
<div class="dplayer-controller-mask"></div>
<div class="dplayer-controller">
    <div class="dplayer-icons dplayer-comment-box">
        <button class="dplayer-icon dplayer-comment-setting-icon" data-balloon="`,l+=y(w("setting")),l+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,l+=L.pallette,l+=`</span>
        </button>
        <div class="dplayer-comment-setting-box">
            <div class="dplayer-comment-setting-color">
                <div class="dplayer-comment-setting-title">`,l+=y(w("set-danmaku-color")),l+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,l+=y(C),l+=`" value="#fff" checked>
                    <span style="background: #fff;"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,l+=y(C),l+=`" value="#e54256">
                    <span style="background: #e54256"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,l+=y(C),l+=`" value="#ffe133">
                    <span style="background: #ffe133"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,l+=y(C),l+=`" value="#64DD17">
                    <span style="background: #64DD17"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,l+=y(C),l+=`" value="#39ccff">
                    <span style="background: #39ccff"></span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-color-`,l+=y(C),l+=`" value="#D500F9">
                    <span style="background: #D500F9"></span>
                </label>
            </div>
            <div class="dplayer-comment-setting-type">
                <div class="dplayer-comment-setting-title">`,l+=y(w("set-danmaku-type")),l+=`</div>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,l+=y(C),l+=`" value="1">
                    <span>`,l+=y(w("top")),l+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,l+=y(C),l+=`" value="0" checked>
                    <span>`,l+=y(w("rolling")),l+=`</span>
                </label>
                <label>
                    <input type="radio" name="dplayer-danmaku-type-`,l+=y(C),l+=`" value="2">
                    <span>`,l+=y(w("bottom")),l+=`</span>
                </label>
            </div>
        </div>
        <input class="dplayer-comment-input" type="text" placeholder="`,l+=y(w("input-danmaku-enter")),l+=`" maxlength="30">
        <button class="dplayer-icon dplayer-send-icon" data-balloon="`,l+=y(w("send")),l+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,l+=L.send,l+=`</span>
        </button>
    </div>
    <div class="dplayer-icons dplayer-icons-left">
        <button class="dplayer-icon dplayer-play-icon">
            <span class="dplayer-icon-content">`,l+=L.play,l+=`</span>
        </button>
        <div class="dplayer-volume">
            <button class="dplayer-icon dplayer-volume-icon">
                <span class="dplayer-icon-content">`,l+=L.volumeDown,l+=`</span>
            </button>
            <div class="dplayer-volume-bar-wrap" data-balloon-pos="up">
                <div class="dplayer-volume-bar">
                    <div class="dplayer-volume-bar-inner" style="background: `,l+=y(v.theme),l+=`;">
                        <span class="dplayer-thumb" style="background: `,l+=y(v.theme),l+=`"></span>
                    </div>
                </div>
            </div>
        </div>
        <span class="dplayer-time">
            <span class="dplayer-ptime">0:00</span> /
            <span class="dplayer-dtime">0:00</span>
        </span>
        `,v.live&&(l+=`
        <span class="dplayer-live-badge"><span class="dplayer-live-dot" style="background: `,l+=y(v.theme),l+=';"></span>',l+=y(w("live")),l+=`</span>
        `),l+=`
    </div>
    <div class="dplayer-icons dplayer-icons-right">
        `,v.video.quality&&(l+=`
        <div class="dplayer-quality">
            <button class="dplayer-icon dplayer-quality-icon">`,l+=y(v.video.quality[v.video.defaultQuality].name),l+=`</button>
            <div class="dplayer-quality-mask">
                <div class="dplayer-quality-list">
                `,T(v.video.quality,function(S,j){l+=`
                    <div class="dplayer-quality-item" data-index="`,l+=y(j),l+='">',l+=y(S.name),l+=`</div>
                `}),l+=`
                </div>
            </div>
        </div>
        `),l+=`
        `,v.screenshot&&(l+=`
        <div class="dplayer-icon dplayer-camera-icon" data-balloon="`,l+=y(w("screenshot")),l+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,l+=L.camera,l+=`</span>
        </div>
        `),l+=`
        `,v.airplay&&(l+=`
        <div class="dplayer-icon dplayer-airplay-icon" data-balloon="`,l+=y(w("airplay")),l+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,l+=L.airplay,l+=`</span>
        </div>
        `),l+=`
        `,v.chromecast&&(l+=`
        <div class="dplayer-icon dplayer-chromecast-icon" data-balloon="`,l+=y(w("chromecast")),l+=`" data-balloon-pos="up">
            <span class="dplayer-icon-content">`,l+=L.chromecast,l+=`</span>
        </div>
        `),l+=`
        <div class="dplayer-comment">
            <button class="dplayer-icon dplayer-comment-icon" data-balloon="`,l+=y(w("send-danmaku")),l+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,l+=L.comment,l+=`</span>
            </button>
        </div>
        `,v.subtitle&&(l+=`
        `,typeof v.subtitle.url=="string"?(l+=`
        <div class="dplayer-subtitle-btn">
            <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="`,l+=y(w("hide-subs")),l+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,l+=L.subtitle,l+=`</span>
            </button>
        </div>
        `):(l+=`
        <div class="dplayer-subtitles">
            <button class="dplayer-icon dplayer-subtitles-icon" data-balloon="`,l+=y(w("subtitle")),l+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,l+=L.subtitle,l+=`</span>
            </button>
            <div class="dplayer-subtitles-box">
                <div class="dplayer-subtitles-panel">
                    `,T(v.subtitle.url,function(S,j){l+=`
                        <div class="dplayer-subtitles-item" data-subtitle="`,l+=y(S.url),l+=`">
                            <!-- if lang, show tran(lang). if lang and name, show name + (tran(lang)). if name, show name. off option use lang for translation. -->
                            <span class="dplayer-label">`,l+=y(S.lang?S.name?S.name+" ("+w(S.lang)+")":w(S.lang):S.name),l+=`</span>
                        </div>
                    `}),l+=`
                </div>
            </div>
        </div>
        `),l+=`
        `),l+=`
        <div class="dplayer-setting">
            <button class="dplayer-icon dplayer-setting-icon" data-balloon="`,l+=y(w("setting")),l+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,l+=L.setting,l+=`</span>
            </button>
            <div class="dplayer-setting-box">
                <div class="dplayer-setting-origin-panel">
                    <div class="dplayer-setting-item dplayer-setting-speed">
                        <span class="dplayer-label">`,l+=y(w("speed")),l+=`</span>
                        <div class="dplayer-toggle">`,l+=L.right,l+=`</div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-loop">
                        <span class="dplayer-label">`,l+=y(w("loop")),l+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-toggle-setting-input" type="checkbox" name="dplayer-toggle">
                            <label for="dplayer-toggle"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-showdan">
                        <span class="dplayer-label">`,l+=y(w("show-danmaku")),l+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-showdan-setting-input" type="checkbox" name="dplayer-toggle-dan">
                            <label for="dplayer-toggle-dan"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danunlimit">
                        <span class="dplayer-label">`,l+=y(w("unlimited-danmaku")),l+=`</span>
                        <div class="dplayer-toggle">
                            <input class="dplayer-danunlimit-setting-input" type="checkbox" name="dplayer-toggle-danunlimit">
                            <label for="dplayer-toggle-danunlimit"></label>
                        </div>
                    </div>
                    <div class="dplayer-setting-item dplayer-setting-danmaku">
                        <span class="dplayer-label">`,l+=y(w("opacity-danmaku")),l+=`</span>
                        <div class="dplayer-danmaku-bar-wrap">
                            <div class="dplayer-danmaku-bar">
                                <div class="dplayer-danmaku-bar-inner">
                                    <span class="dplayer-thumb"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dplayer-setting-speed-panel">
                    `,T(v.playbackSpeed,function(S,j){l+=`
                        <div class="dplayer-setting-speed-item" data-speed="`,l+=y(S),l+=`">
                            <span class="dplayer-label">`,l+=y(S===1?w("normal"):S),l+=`</span>
                        </div>
                    `}),l+=`
                </div>
            </div>
        </div>
        <div class="dplayer-full">
            <button class="dplayer-icon dplayer-full-in-icon" data-balloon="`,l+=y(w("web-fullscreen")),l+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,l+=L.fullWeb,l+=`</span>
            </button>
            <button class="dplayer-icon dplayer-full-icon" data-balloon="`,l+=y(w("fullscreen")),l+=`" data-balloon-pos="up">
                <span class="dplayer-icon-content">`,l+=L.full,l+=`</span>
            </button>
        </div>
    </div>
    <div class="dplayer-bar-wrap">
        <div class="dplayer-bar-time hidden">00:00</div>
        <div class="dplayer-bar-preview"></div>
        <div class="dplayer-bar">
            <div class="dplayer-loaded" style="width: 0;"></div>
            <div class="dplayer-played" style="width: 0; background: `,l+=y(v.theme),l+=`">
                <span class="dplayer-thumb" style="background: `,l+=y(v.theme),l+=`"></span>
            </div>
        </div>
    </div>
</div>
<div class="dplayer-info-panel dplayer-info-panel-hide">
    <div class="dplayer-info-panel-close">[x]</div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-version">
        <span class="dplayer-info-panel-item-title">Player version</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-fps">
        <span class="dplayer-info-panel-item-title">Player FPS</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-type">
        <span class="dplayer-info-panel-item-title">Video type</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-url">
        <span class="dplayer-info-panel-item-title">Video url</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-resolution">
        <span class="dplayer-info-panel-item-title">Video resolution</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-duration">
        <span class="dplayer-info-panel-item-title">Video duration</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    `,v.danmaku&&(l+=`
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-id">
        <span class="dplayer-info-panel-item-title">Danmaku id</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-api">
        <span class="dplayer-info-panel-item-title">Danmaku api</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    <div class="dplayer-info-panel-item dplayer-info-panel-item-danmaku-amount">
        <span class="dplayer-info-panel-item-title">Danmaku amount</span>
        <span class="dplayer-info-panel-item-data"></span>
    </div>
    `),l+=`
</div>
<div class="dplayer-menu">
    `,T(v.contextmenu,function(S,j){l+=`
        <div class="dplayer-menu-item">
            <a`,S.link&&(l+=' target="_blank"'),l+=' href="',l+=y(S.link||"javascript:void(0);"),l+='">',S.key&&(l+=" ",l+=y(w(S.key))),S.text&&(l+=" ",l+=y(S.text)),l+=`</a>
        </div>
    `}),l+=`
</div>
<div class="dplayer-notice-list"></div>
<button class="dplayer-mobile-play">
    `,l+=L.play,l+=`
</button>`}},568:(A,p,u)=>{var h=u(471);A.exports=function(m){var s="",l=(m=m||{}).enableSubtitle,f=m.subtitle,v=m.current,y=m.airplay,w=m.pic,L=h.$escape,C=m.screenshot,T=m.preload,S=m.url;return l=f&&f.type==="webvtt",s+=`
<video
    class="dplayer-video `,v&&(s+="dplayer-video-current"),s+=`"
    webkit-playsinline
    `,y&&(s+=' x-webkit-airplay="allow" '),s+=`
    playsinline
    `,w&&(s+='poster="',s+=L(w),s+='"'),s+=`
    `,(C||l)&&(s+='crossorigin="anonymous"'),s+=`
    `,T&&(s+='preload="',s+=L(T),s+='"'),s+=`
    `,y?s+=`
    nosrc
    `:S&&(s+=`
    src="`,s+=L(S),s+=`"
    `),s+=`
    >
    `,y&&(s+=`
    <source src="`,s+=L(S),s+=`">
    `),s+=`
    `,l&&(s+=`
    <track class="dplayer-subtrack" kind="metadata" default src="`,s+=L(typeof f.url=="string"?f.url:f.url[f.index].url),s+=`"></track>
    `),s+`
</video>`}},49:(A,p,u)=>{u.d(p,{Z:()=>f});var h=u(415),m=u.n(h),s=u(352),l=u.n(s)()(m());l.push([A.id,`:root {
  --balloon-border-radius: 2px;
  --balloon-color: rgba(16, 16, 16, 0.95);
  --balloon-text-color: #fff;
  --balloon-font-size: 12px;
  --balloon-move: 4px; }

button[aria-label][data-balloon-pos] {
  overflow: visible; }

[aria-label][data-balloon-pos] {
  position: relative;
  cursor: pointer; }
  [aria-label][data-balloon-pos]:after {
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    text-indent: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    font-style: normal;
    text-shadow: none;
    font-size: 12px;
    font-size: var(--balloon-font-size);
    background: rgba(16, 16, 16, 0.95);
    background: var(--balloon-color);
    border-radius: 2px;
    color: #fff;
    color: var(--balloon-text-color);
    border-radius: var(--balloon-border-radius);
    content: attr(aria-label);
    padding: .5em 1em;
    position: absolute;
    white-space: nowrap;
    z-index: 10; }
  [aria-label][data-balloon-pos]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: rgba(16, 16, 16, 0.95);
    border-top-color: var(--balloon-color);
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    content: "";
    position: absolute;
    z-index: 10; }
  [aria-label][data-balloon-pos]:hover:before, [aria-label][data-balloon-pos]:hover:after, [aria-label][data-balloon-pos][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-visible]:after, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:before, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:after {
    opacity: 1;
    pointer-events: none; }
  [aria-label][data-balloon-pos].font-awesome:after {
    font-family: FontAwesome, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
  [aria-label][data-balloon-pos][data-balloon-break]:after {
    white-space: pre; }
  [aria-label][data-balloon-pos][data-balloon-break][data-balloon-length]:after {
    white-space: pre-line;
    word-break: break-word; }
  [aria-label][data-balloon-pos][data-balloon-blunt]:before, [aria-label][data-balloon-pos][data-balloon-blunt]:after {
    transition: none; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:after {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:before {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:after {
    left: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:before {
    left: 5px; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:after {
    right: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:before {
    right: 5px; }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:after {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:before {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    bottom: 100%;
    transform-origin: top;
    transform: translate(0, 4px);
    transform: translate(0, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    margin-bottom: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
    left: 50%;
    transform: translate(-50%, 4px);
    transform: translate(-50%, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    top: 100%;
    transform: translate(0, calc(4px * -1));
    transform: translate(0, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    margin-top: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom-color: rgba(16, 16, 16, 0.95);
    border-bottom-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="down"]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:before {
    left: 50%;
    transform: translate(-50%, calc(4px * -1));
    transform: translate(-50%, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:after {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:before {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after, [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    right: 100%;
    top: 50%;
    transform: translate(4px, -50%);
    transform: translate(var(--balloon-move), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after {
    margin-right: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left-color: rgba(16, 16, 16, 0.95);
    border-left-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    left: 100%;
    top: 50%;
    transform: translate(calc(4px * -1), -50%);
    transform: translate(calc(var(--balloon-move) * -1), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after {
    margin-left: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right-color: rgba(16, 16, 16, 0.95);
    border-right-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-length]:after {
    white-space: normal; }
  [aria-label][data-balloon-pos][data-balloon-length="small"]:after {
    width: 80px; }
  [aria-label][data-balloon-pos][data-balloon-length="medium"]:after {
    width: 150px; }
  [aria-label][data-balloon-pos][data-balloon-length="large"]:after {
    width: 260px; }
  [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
    width: 380px; }
    @media screen and (max-width: 768px) {
      [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
        width: 90vw; } }
  [aria-label][data-balloon-pos][data-balloon-length="fit"]:after {
    width: 100%; }
`,"",{version:3,sources:["webpack://./node_modules/.pnpm/balloon-css@1.2.0/node_modules/balloon-css/balloon.css"],names:[],mappings:"AAAA;EACE,4BAA4B;EAC5B,uCAAuC;EACvC,0BAA0B;EAC1B,yBAAyB;EACzB,mBAAmB,EAAE;;AAEvB;EACE,iBAAiB,EAAE;;AAErB;EACE,kBAAkB;EAClB,eAAe,EAAE;EACjB;IACE,UAAU;IACV,oBAAoB;IACpB,oCAAoC;IACpC,cAAc;IACd,wIAAwI;IACxI,mBAAmB;IACnB,kBAAkB;IAClB,iBAAiB;IACjB,eAAmC;IAAnC,mCAAmC;IACnC,kCAAgC;IAAhC,gCAAgC;IAChC,kBAAkB;IAClB,WAAgC;IAAhC,gCAAgC;IAChC,2CAA2C;IAC3C,yBAAyB;IACzB,iBAAiB;IACjB,kBAAkB;IAClB,mBAAmB;IACnB,WAAW,EAAE;EACf;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,wCAAsC;IAAtC,sCAAsC;IACtC,UAAU;IACV,oBAAoB;IACpB,oCAAoC;IACpC,WAAW;IACX,kBAAkB;IAClB,WAAW,EAAE;EACf;IACE,UAAU;IACV,oBAAoB,EAAE;EACxB;IACE,qJAAqJ,EAAE;EACzJ;IACE,gBAAgB,EAAE;EACpB;IACE,qBAAqB;IACrB,sBAAsB,EAAE;EAC1B;IACE,gBAAgB,EAAE;EACpB;IACE,6BAA6B,EAAE;EACjC;IACE,6BAA6B,EAAE;EACjC;IACE,OAAO,EAAE;EACX;IACE,SAAS,EAAE;EACb;IACE,QAAQ,EAAE;EACZ;IACE,UAAU,EAAE;EACd;IACE,0BAA0B,EAAE;EAC9B;IACE,0BAA0B,EAAE;EAC9B;IACE,YAAY;IACZ,qBAAqB;IACrB,4BAA4C;IAA5C,4CAA4C,EAAE;EAChD;IACE,mBAAmB,EAAE;EACvB;IACE,SAAS;IACT,+BAA+C;IAA/C,+CAA+C,EAAE;EACnD;IACE,SAAS;IACT,uCAAuD;IAAvD,uDAAuD,EAAE;EAC3D;IACE,gBAAgB,EAAE;EACpB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,2CAAyC;IAAzC,yCAAyC,EAAE;EAC7C;IACE,SAAS;IACT,0CAA0D;IAA1D,0DAA0D,EAAE;EAC9D;IACE,6BAA6B,EAAE;EACjC;IACE,6BAA6B,EAAE;EACjC;IACE,WAAW;IACX,QAAQ;IACR,+BAA+C;IAA/C,+CAA+C,EAAE;EACnD;IACE,kBAAkB,EAAE;EACtB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,yCAAuC;IAAvC,uCAAuC,EAAE;EAC3C;IACE,UAAU;IACV,QAAQ;IACR,0CAA0D;IAA1D,0DAA0D,EAAE;EAC9D;IACE,iBAAiB,EAAE;EACrB;IACE,QAAQ;IACR,SAAS;IACT,6BAA6B;IAC7B,0CAAwC;IAAxC,wCAAwC,EAAE;EAC5C;IACE,mBAAmB,EAAE;EACvB;IACE,WAAW,EAAE;EACf;IACE,YAAY,EAAE;EAChB;IACE,YAAY,EAAE;EAChB;IACE,YAAY,EAAE;IACd;MACE;QACE,WAAW,EAAE,EAAE;EACrB;IACE,WAAW,EAAE",sourcesContent:[`:root {
  --balloon-border-radius: 2px;
  --balloon-color: rgba(16, 16, 16, 0.95);
  --balloon-text-color: #fff;
  --balloon-font-size: 12px;
  --balloon-move: 4px; }

button[aria-label][data-balloon-pos] {
  overflow: visible; }

[aria-label][data-balloon-pos] {
  position: relative;
  cursor: pointer; }
  [aria-label][data-balloon-pos]:after {
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    text-indent: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: normal;
    font-style: normal;
    text-shadow: none;
    font-size: var(--balloon-font-size);
    background: var(--balloon-color);
    border-radius: 2px;
    color: var(--balloon-text-color);
    border-radius: var(--balloon-border-radius);
    content: attr(aria-label);
    padding: .5em 1em;
    position: absolute;
    white-space: nowrap;
    z-index: 10; }
  [aria-label][data-balloon-pos]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: var(--balloon-color);
    opacity: 0;
    pointer-events: none;
    transition: all 0.18s ease-out 0.18s;
    content: "";
    position: absolute;
    z-index: 10; }
  [aria-label][data-balloon-pos]:hover:before, [aria-label][data-balloon-pos]:hover:after, [aria-label][data-balloon-pos][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-visible]:after, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:before, [aria-label][data-balloon-pos]:not([data-balloon-nofocus]):focus:after {
    opacity: 1;
    pointer-events: none; }
  [aria-label][data-balloon-pos].font-awesome:after {
    font-family: FontAwesome, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; }
  [aria-label][data-balloon-pos][data-balloon-break]:after {
    white-space: pre; }
  [aria-label][data-balloon-pos][data-balloon-break][data-balloon-length]:after {
    white-space: pre-line;
    word-break: break-word; }
  [aria-label][data-balloon-pos][data-balloon-blunt]:before, [aria-label][data-balloon-pos][data-balloon-blunt]:after {
    transition: none; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:after {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="up"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="down"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="down"][data-balloon-visible]:before {
    transform: translate(-50%, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:after {
    left: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-left"]:before {
    left: 5px; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:after {
    right: 0; }
  [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:before {
    right: 5px; }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:after {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-po*="-left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-po*="-left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos*="-right"][data-balloon-visible]:before {
    transform: translate(0, 0); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    bottom: 100%;
    transform-origin: top;
    transform: translate(0, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="up"]:after {
    margin-bottom: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="up"]:before, [aria-label][data-balloon-pos][data-balloon-pos="up"]:after {
    left: 50%;
    transform: translate(-50%, var(--balloon-move)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before, [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    top: 100%;
    transform: translate(0, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:after {
    margin-top: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos^="down"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-bottom-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="down"]:after, [aria-label][data-balloon-pos][data-balloon-pos="down"]:before {
    left: 50%;
    transform: translate(-50%, calc(var(--balloon-move) * -1)); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:after, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:after {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="left"][data-balloon-visible]:before, [aria-label][data-balloon-pos][data-balloon-pos="right"]:hover:before, [aria-label][data-balloon-pos][data-balloon-pos="right"][data-balloon-visible]:before {
    transform: translate(0, -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after, [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    right: 100%;
    top: 50%;
    transform: translate(var(--balloon-move), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:after {
    margin-right: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="left"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-left-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after, [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    left: 100%;
    top: 50%;
    transform: translate(calc(var(--balloon-move) * -1), -50%); }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:after {
    margin-left: 10px; }
  [aria-label][data-balloon-pos][data-balloon-pos="right"]:before {
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right-color: var(--balloon-color); }
  [aria-label][data-balloon-pos][data-balloon-length]:after {
    white-space: normal; }
  [aria-label][data-balloon-pos][data-balloon-length="small"]:after {
    width: 80px; }
  [aria-label][data-balloon-pos][data-balloon-length="medium"]:after {
    width: 150px; }
  [aria-label][data-balloon-pos][data-balloon-length="large"]:after {
    width: 260px; }
  [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
    width: 380px; }
    @media screen and (max-width: 768px) {
      [aria-label][data-balloon-pos][data-balloon-length="xlarge"]:after {
        width: 90vw; } }
  [aria-label][data-balloon-pos][data-balloon-length="fit"]:after {
    width: 100%; }
`],sourceRoot:""}]);const f=l},685:(A,p,u)=>{u.d(p,{Z:()=>T});var h=u(415),m=u.n(h),s=u(352),l=u.n(s),f=u(49),v=u(80),y=u.n(v),w=new URL(u(831),u.b),L=l()(m());L.i(f.Z);var C=y()(w);L.push([A.id,`@keyframes my-face {
  2% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
.dplayer {
  position: relative;
  overflow: hidden;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  line-height: 1;
}
.dplayer * {
  box-sizing: content-box;
}
.dplayer svg {
  width: 100%;
  height: 100%;
}
.dplayer svg path,
.dplayer svg circle {
  fill: #fff;
}
.dplayer:-webkit-full-screen {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  transform: translate(0, 0);
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-showdan,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danmaku,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danunlimit {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-comment {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-danmaku {
  display: none;
}
.dplayer.dplayer-live .dplayer-time {
  display: none;
}
.dplayer.dplayer-live .dplayer-bar-wrap {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-speed {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-loop {
  display: none;
}
.dplayer.dplayer-live.dplayer-no-danmaku .dplayer-setting {
  display: none;
}
.dplayer.dplayer-arrow .dplayer-danmaku {
  font-size: 18px;
}
.dplayer.dplayer-arrow .dplayer-icon {
  margin: 0 -3px;
}
.dplayer.dplayer-playing .dplayer-danmaku .dplayer-danmaku-move {
  animation-play-state: running;
}
@media (min-width: 900px) {
  .dplayer.dplayer-playing .dplayer-controller-mask {
    opacity: 0;
  }
  .dplayer.dplayer-playing .dplayer-controller {
    opacity: 0;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller-mask {
    opacity: 1;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller {
    opacity: 1;
  }
}
.dplayer.dplayer-loading .dplayer-bezel .diplayer-loading-icon {
  display: block;
}
.dplayer.dplayer-loading .dplayer-danmaku,
.dplayer.dplayer-paused .dplayer-danmaku,
.dplayer.dplayer-loading .dplayer-danmaku-move,
.dplayer.dplayer-paused .dplayer-danmaku-move {
  animation-play-state: paused;
}
.dplayer.dplayer-hide-controller {
  cursor: none;
}
.dplayer.dplayer-hide-controller .dplayer-controller-mask {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-hide-controller .dplayer-controller {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-show-controller .dplayer-controller-mask {
  opacity: 1;
}
.dplayer.dplayer-show-controller .dplayer-controller {
  opacity: 1;
}
.dplayer.dplayer-fulled {
  width: 100% !important;
  height: 100% !important;
}
.dplayer.dplayer-fulled {
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-volume,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-camera-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-airplay-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-chromecast-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-play-icon {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: static;
  display: inline-block;
}
.dplayer.dplayer-mobile .dplayer-bar-time {
  display: none;
}
.dplayer.dplayer-mobile.dplayer-hide-controller .dplayer-mobile-play {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-mobile-play {
  display: block;
}
.dplayer-web-fullscreen-fix {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}
[data-balloon]:before {
  display: none;
}
[data-balloon]:after {
  padding: 0.3em 0.7em;
  background: rgba(17, 17, 17, 0.7);
}
[data-balloon][data-balloon-pos="up"]:after {
  margin-bottom: 0;
}
.dplayer-bezel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -26px 0 0 -26px;
  height: 52px;
  width: 52px;
  padding: 12px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon.dplayer-bezel-transition {
  animation: bezel-hide 0.5s linear;
}
@keyframes bezel-hide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
.dplayer-bezel .dplayer-danloading {
  position: absolute;
  top: 50%;
  margin-top: -7px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-bezel .diplayer-loading-icon {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -18px 0 0 -18px;
  height: 36px;
  width: 36px;
  pointer-events: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-hide {
  display: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot {
  animation: diplayer-loading-dot-fade 0.8s ease infinite;
  opacity: 0;
  transform-origin: 4px 4px;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-1 {
  animation-delay: 0.1s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-2 {
  animation-delay: 0.2s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-3 {
  animation-delay: 0.3s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-4 {
  animation-delay: 0.4s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-5 {
  animation-delay: 0.5s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-6 {
  animation-delay: 0.6s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-7 {
  animation-delay: 0.7s;
}
@keyframes diplayer-loading-dot-fade {
  0% {
    opacity: 0.7;
    transform: scale(1.2, 1.2);
  }
  50% {
    opacity: 0.25;
    transform: scale(0.9, 0.9);
  }
  to {
    opacity: 0.25;
    transform: scale(0.85, 0.85);
  }
}
.dplayer-controller-mask {
  background: url(`+C+`) repeat-x bottom;
  height: 98px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
}
.dplayer-controller {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 41px;
  padding: 0 20px;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  transition: all 0.3s ease;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons {
  display: none;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons.dplayer-comment-box {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap {
  padding: 5px 0;
  cursor: pointer;
  position: absolute;
  bottom: 33px;
  width: calc(100% - 40px);
  height: 3px;
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-bar .dplayer-played .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-highlight {
  display: block;
  width: 8px;
  transform: translateX(-4px);
  top: 4px;
  height: 40%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight {
  z-index: 12;
  position: absolute;
  top: 5px;
  width: 6px;
  height: 20%;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  transform: translateX(-3px);
  transition: all 0.2s ease-in-out;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover .dplayer-highlight-text {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-preview {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-time {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight .dplayer-highlight-text {
  display: none;
  position: absolute;
  left: 50%;
  top: -24px;
  padding: 5px 8px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translateX(-50%);
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview {
  position: absolute;
  background: #fff;
  pointer-events: none;
  display: none;
  background-size: 16000px 100%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time {
  position: absolute;
  left: 0px;
  top: -20px;
  border-radius: 4px;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  font-size: 12px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
  word-wrap: normal;
  word-break: normal;
  z-index: 2;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time.hidden {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar {
  position: relative;
  height: 3px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-loaded {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
  height: 3px;
  transition: all 0.5s ease;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 3px;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons {
  height: 38px;
  position: absolute;
  bottom: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box {
  display: none;
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  height: 38px;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-icon {
  position: absolute;
  left: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-send-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box {
  position: absolute;
  background: rgba(28, 28, 28, 0.9);
  bottom: 41px;
  left: 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 10px 10px 16px;
  font-size: 14px;
  width: 204px;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box.dplayer-comment-setting-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box input[type=radio] {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box label {
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-title {
  font-size: 13px;
  color: #fff;
  line-height: 30px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type .dplayer-comment-setting-title {
  margin-bottom: 6px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(2) span {
  border-radius: 4px 0 0 4px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(4) span {
  border-radius: 0 4px 4px 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type span {
  width: 33%;
  padding: 4px 6px;
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  border: 1px solid #fff;
  margin-right: -1px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type input:checked + span {
  background: #E4E4E6;
  color: #1c1c1c;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color label {
  font-size: 0;
  padding: 6px;
  display: inline-block;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span {
  width: 22px;
  height: 22px;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span:hover {
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input {
  outline: none;
  border: none;
  padding: 8px 31px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  border-radius: 4px;
  background: none;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-moz-placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-ms-clear {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-icons-left .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right {
  right: 20px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right .dplayer-icon {
  padding: 8px;
}
.dplayer-controller .dplayer-icons .dplayer-time,
.dplayer-controller .dplayer-icons .dplayer-live-badge {
  line-height: 38px;
  color: #eee;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  font-size: 13px;
  cursor: default;
}
.dplayer-controller .dplayer-icons .dplayer-live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  vertical-align: 4%;
  margin-right: 5px;
  content: '';
  border-radius: 6px;
}
.dplayer-controller .dplayer-icons .dplayer-icon {
  width: 40px;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-icon .dplayer-icon-content {
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons .dplayer-icon:hover .dplayer-icon-content {
  opacity: 1;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-quality-icon {
  color: #fff;
  width: auto;
  line-height: 22px;
  font-size: 14px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-comment-icon {
  padding: 10px 9px 9px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-setting-icon {
  padding-top: 8.5px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-volume-icon {
  width: 43px;
}
.dplayer-controller .dplayer-icons .dplayer-volume {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap {
  display: inline-block;
  margin: 0 10px 0 -5px;
  vertical-align: middle;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar {
  position: relative;
  top: 17px;
  width: 0;
  height: 3px;
  background: #aaa;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons .dplayer-subtitle-btn {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: -moz-fit-content;
  width: fit-content;
  max-width: 240px;
  min-width: 120px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: auto;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: 150px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div.dplayer-setting-origin-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-narrow {
  width: 70px;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-origin-panel {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-speed-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item:hover,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku {
  padding: 5px 0;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-label {
  padding: 0 10px;
  display: inline;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap {
  padding: 0 10px;
  box-sizing: border-box;
  display: none;
  vertical-align: middle;
  height: 100%;
  width: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar {
  position: relative;
  top: 8.5px;
  width: 100%;
  height: 3px;
  background: #fff;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  background: #aaa;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: #aaa;
}
.dplayer-controller .dplayer-icons .dplayer-full {
  display: inline-block;
  height: 100%;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-full:hover .dplayer-full-in-icon {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: absolute;
  top: -30px;
  z-index: 1;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-quality {
  position: relative;
  display: inline-block;
  height: 100%;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-list {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-mask {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-mask {
  display: none;
  position: absolute;
  bottom: 38px;
  left: -18px;
  width: 80px;
  padding-bottom: 12px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-list {
  display: none;
  font-size: 12px;
  width: 80px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 5px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item {
  height: 25px;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 25px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-comment {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-label {
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}
.dplayer-controller .dplayer-icons .dplayer-toggle {
  width: 32px;
  height: 20px;
  text-align: center;
  font-size: 0;
  vertical-align: middle;
  position: absolute;
  top: 5px;
  right: 10px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input {
  max-height: 0;
  max-width: 0;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label {
  display: inline-block;
  position: relative;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border: 1px solid #dfdfdf;
  height: 20px;
  width: 32px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  top: 0;
  left: 0;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:after {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  border-radius: 15px;
  background: #fff;
  transition: 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  height: 18px;
  width: 18px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label {
  border-color: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:before {
  width: 30px;
  background: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:after {
  left: 12px;
}
.dplayer-mobile-play {
  display: none;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  bottom: 0;
  opacity: 0.8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dplayer-danmaku {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
}
.dplayer-danmaku .dplayer-danmaku-item {
  display: inline-block;
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  cursor: default;
  white-space: nowrap;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
}
.dplayer-danmaku .dplayer-danmaku-item--demo {
  position: absolute;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-right {
  position: absolute;
  right: 0;
  transform: translateX(100%);
}
.dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
  will-change: transform;
  animation-name: 'danmaku';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku {
  from {
    transform: translateX(100%);
  }
}
.dplayer-danmaku .dplayer-danmaku-top,
.dplayer-danmaku .dplayer-danmaku-bottom {
  position: absolute;
  width: 100%;
  text-align: center;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-top.dplayer-danmaku-move,
.dplayer-danmaku .dplayer-danmaku-bottom.dplayer-danmaku-move {
  will-change: visibility;
  animation-name: 'danmaku-center';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku-center {
  from {
    visibility: visible;
  }
  to {
    visibility: visible;
  }
}
.dplayer-logo {
  pointer-events: none;
  position: absolute;
  left: 20px;
  top: 20px;
  max-width: 50px;
  max-height: 50px;
}
.dplayer-logo img {
  max-width: 100%;
  max-height: 100%;
  background: none;
}
.dplayer-menu {
  position: absolute;
  width: 170px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.85);
  padding: 5px 0;
  overflow: hidden;
  z-index: 3;
  display: none;
}
.dplayer-menu.dplayer-menu-show {
  display: block;
}
.dplayer-menu .dplayer-menu-item {
  height: 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-menu .dplayer-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-menu .dplayer-menu-item a {
  padding: 0 10px;
  line-height: 30px;
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-menu .dplayer-menu-item a:hover {
  text-decoration: none;
}
.dplayer-notice-list {
  position: absolute;
  bottom: 60px;
  left: 20px;
}
.dplayer-notice-list .dplayer-notice {
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  display: table;
  pointer-events: none;
  animation: showNotice 0.3s ease 1 forwards;
}
.dplayer-notice-list .remove-notice {
  animation: removeNotice 0.3s ease 1 forwards;
}
@keyframes showNotice {
  from {
    padding: 0;
    font-size: 0;
    margin-top: 0;
  }
  to {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
}
@keyframes removeNotice {
  0% {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
  20% {
    font-size: 12px;
  }
  21% {
    font-size: 0;
    padding: 7px 10px;
  }
  100% {
    padding: 0;
    margin-top: 0;
    font-size: 0;
  }
}
.dplayer-subtitle {
  position: absolute;
  bottom: 40px;
  width: 90%;
  left: 5%;
  text-align: center;
  color: #fff;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  font-size: 20px;
}
.dplayer-subtitle.dplayer-subtitle-hide {
  display: none;
}
.dplayer-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
}
.dplayer-mask.dplayer-mask-show {
  display: block;
}
.dplayer-video-wrap {
  position: relative;
  background: #000;
  font-size: 0;
  width: 100%;
  height: 100%;
}
.dplayer-video-wrap .dplayer-video {
  width: 100%;
  height: 100%;
  display: none;
}
.dplayer-video-wrap .dplayer-video-current {
  display: block;
}
.dplayer-video-wrap .dplayer-video-prepare {
  display: none;
}
.dplayer-info-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  background: rgba(28, 28, 28, 0.8);
  padding: 10px;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.dplayer-info-panel-hide {
  display: none;
}
.dplayer-info-panel .dplayer-info-panel-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item > span {
  display: inline-block;
  vertical-align: middle;
  line-height: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-info-panel .dplayer-info-panel-item-title {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item-data {
  width: 260px;
}
`,"",{version:3,sources:["webpack://./src/css/global.less","webpack://./src/css/index.less","webpack://./src/css/player.less","webpack://./src/css/balloon.less","webpack://./src/css/bezel.less","webpack://./src/css/notice.less","webpack://./src/css/controller.less","webpack://./src/css/danmaku.less","webpack://./src/css/logo.less","webpack://./src/css/menu.less","webpack://./src/css/subtitle.less","webpack://./src/css/video.less","webpack://./src/css/info-panel.less"],names:[],mappings:"AAAA;EACI;IACI,6CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,6CAAA;ECEN;EDAE;IACI,8CAAA;ECEN;EDAE;IACI,+CAAA;ECEN;EDAE;;IAEI,uCAAA;ECEN;AACF;ACzJA;EACI,kBAAA;EACA,gBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,cAAA;AD2JJ;AC/JA;EAOQ,uBAAA;AD2JR;AClKA;EAWQ,WAAA;EACA,YAAA;AD0JR;ACtKA;;EAgBY,UAAA;AD0JZ;ACtJI;EACI,WAAA;EACA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,eAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,UAAA;EACA,0BAAA;ADwJR;ACpJI;;;EAKY,aAAA;ADoJhB;ACzJI;EAUQ,aAAA;ADkJZ;AC5JI;EAcQ,aAAA;ADiJZ;AC7II;EAEQ,aAAA;AD8IZ;AChJI;EAKQ,aAAA;AD8IZ;ACnJI;EAQQ,aAAA;AD8IZ;ACtJI;EAWQ,aAAA;AD8IZ;AC3IQ;EAEQ,aAAA;AD4IhB;ACvII;EAEQ,eAAA;ADwIZ;AC1II;EAKQ,cAAA;ADwIZ;ACpII;EAEQ,6BAAA;ADqIZ;AClIQ;EAAA;IAEQ,UAAA;EDoId;ECtIM;IAKQ,UAAA;EDoId;ECjIU;IAEQ,UAAA;EDkIlB;ECpIU;IAKQ,UAAA;EDkIlB;AACF;AC7HI;EAEQ,cAAA;AD8HZ;AC1HI;;;;EAIQ,4BAAA;AD4HZ;ACxHI;EACI,YAAA;AD0HR;AC3HI;EAIQ,UAAA;EACA,2BAAA;AD0HZ;AC/HI;EAQQ,UAAA;EACA,2BAAA;AD0HZ;ACvHI;EAEQ,UAAA;ADwHZ;AC1HI;EAKQ,UAAA;ADwHZ;ACrHI;EAKI,sBAAA;EACA,uBAAA;ADuHR;AC7HI;EACI,eAAA;EACA,eAAA;EACA,OAAA;EACA,MAAA;ADyHR;ACrHI;;;;;EAOY,aAAA;ADqHhB;AC5HI;EAUY,gBAAA;EACA,qBAAA;ADqHhB;AChII;EAgBQ,aAAA;ADmHZ;AChHQ;EAEQ,aAAA;ADiHhB;ACtII;EA0BQ,cAAA;AD+GZ;ACzGA;EACI,eAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,UAAA;AD2GJ;AElSA;EACI,aAAA;AFoSJ;AEjSA;EACI,oBAAA;EACA,iCAAA;AFmSJ;AEhSA;EACI,gBAAA;AFkSJ;AG9SA;EACI,kBAAA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,eAAA;EACA,WAAA;EACA,oBAAA;AHgTJ;AGxTA;EAUQ,kBAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,aAAA;EACA,sBAAA;EACA,8BAAA;EACA,kBAAA;EACA,UAAA;EACA,oBAAA;AHiTR;AGhTQ;EACI,iCAAA;AHkTZ;AGhTQ;EACI;IACI,UAAA;IACA,mBAAA;EHkTd;EGhTU;IACI,UAAA;IACA,mBAAA;EHkTd;AACF;AGnVA;EAqCQ,kBAAA;EACA,QAAA;EACA,gBAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;EACA,0CAAA;AHiTR;AG7VA;EA+CQ,aAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,oBAAA;AHiTR;AGvWA;EAwDY,aAAA;AHkTZ;AG1WA;EA2DY,uDAAA;EACA,UAAA;EACA,yBAAA;AHkTZ;AI/WC;EDgEmB,qBAAA;AHkTpB;AIlXC;EDgEmB,qBAAA;AHqTpB;AIrXC;EDgEmB,qBAAA;AHwTpB;AIxXC;EDgEmB,qBAAA;AH2TpB;AI3XC;EDgEmB,qBAAA;AH8TpB;AI9XC;EDgEmB,qBAAA;AHiUpB;AIjYC;EDgEmB,qBAAA;AHoUpB;AGhUQ;EACI;IACI,YAAA;IACA,0BAAA;EHkUd;EGhUU;IACI,aAAA;IACA,0BAAA;EHkUd;EGhUU;IACI,aAAA;IACA,4BAAA;EHkUd;AACF;AKlZA;EACI,mEAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,yBAAA;ALoZJ;AKjZA;EACI,kBAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,YAAA;EACA,eAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,yBAAA;ALmZJ;AKlZI;EAEQ,aAAA;ALmZZ;AKrZI;EAKQ,cAAA;ALmZZ;AKjaA;EAkBQ,cAAA;EACA,eAAA;EACA,kBAAA;EACA,YAAA;EACA,wBAAA;EACA,WAAA;ALkZR;AKjZQ;EAEQ,mBAAA;ALkZhB;AKpZQ;EAKQ,cAAA;EACA,UAAA;EACA,2BAAA;EACA,QAAA;EACA,WAAA;ALkZhB;AKnbA;EAqCY,WAAA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,sBAAA;EACA,kBAAA;EACA,2BAAA;EACA,gCAAA;ALiZZ;AKhZY;EAEQ,cAAA;ALiZpB;AK/YgB;EACI,UAAA;ALiZpB;AK/YgB;EACI,UAAA;ALiZpB;AKxcA;EA2DgB,aAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,gBAAA;EACA,qCAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,mBAAA;EACA,2BAAA;ALgZhB;AKrdA;EAyEY,kBAAA;EACA,gBAAA;EACA,oBAAA;EACA,aAAA;EACA,6BAAA;AL+YZ;AK5dA;EAgFY,kBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,oBAAA;AL+YZ;AKneA;EA0FY,kBAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,qCAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;EACA,UAAA;EACA,oCAAA;EACA,iBAAA;EACA,kBAAA;EACA,UAAA;EACA,oBAAA;AL4YZ;AK7ZY;EACI,UAAA;AL+ZhB;AKvfA;EA2GY,kBAAA;EACA,WAAA;EACA,WAAA;EACA,oCAAA;EACA,eAAA;AL+YZ;AK9fA;EAiHgB,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,oCAAA;EACA,WAAA;EACA,yBAAA;EACA,kBAAA;ALgZhB;AKxgBA;EA2HgB,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,WAAA;EACA,kBAAA;ALgZhB;AKhhBA;EAkIoB,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,mBAAA;ALiZpB;AK7hBA;EAkJQ,YAAA;EACA,kBAAA;EACA,SAAA;AL8YR;AK7YQ;EACI,aAAA;EACA,kBAAA;EACA,gCAAA;EACA,UAAA;EACA,YAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;AL+YZ;AKxZQ;EAWQ,YAAA;ALgZhB;AK3ZQ;EAcQ,kBAAA;EACA,OAAA;EACA,MAAA;ALgZhB;AKhaQ;EAmBQ,kBAAA;EACA,QAAA;EACA,MAAA;ALgZhB;AKraQ;EAwBQ,kBAAA;EACA,iCAAA;EACA,YAAA;EACA,OAAA;EACA,uCAAA;EACA,kBAAA;EACA,uBAAA;EACA,eAAA;EACA,YAAA;EACA,gCAAA;EACA,mBAAA;ALgZhB;AK/YgB;EACI,mBAAA;ALiZpB;AKrbQ;EAuCY,aAAA;ALiZpB;AKxbQ;EA0CY,eAAA;ALiZpB;AK3bQ;EA6CY,eAAA;EACA,WAAA;EACA,iBAAA;ALiZpB;AKhcQ;EAkDY,YAAA;ALiZpB;AKncQ;EAoDgB,kBAAA;ALkZxB;AK/YwB;EAEQ,0BAAA;ALgZhC;AK7YwB;EAEQ,0BAAA;AL8YhC;AK5cQ;EAmEgB,UAAA;EACA,gBAAA;EACA,iBAAA;EACA,qBAAA;EACA,eAAA;EACA,WAAA;EACA,sBAAA;EACA,kBAAA;EACA,sBAAA;EACA,kBAAA;EACA,eAAA;AL4YxB;AKzdQ;EAgFgB,mBAAA;EACA,cAAA;AL4YxB;AK7dQ;EAqFY,YAAA;AL2YpB;AKheQ;EAuFgB,YAAA;EACA,YAAA;EACA,qBAAA;AL4YxB;AKreQ;EA4FgB,WAAA;EACA,YAAA;EACA,qBAAA;EACA,kBAAA;EACA,sBAAA;EACA,eAAA;AL4YxB;AK3YwB;EACI,0CAAA;AL6Y5B;AKhfQ;EAyGQ,aAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,SAAA;EACA,YAAA;EACA,sBAAA;EACA,WAAA;EACA,WAAA;AL0YhB;AKzYgB;EACI,WAAA;EACA,YAAA;AL2YpB;AK7YgB;EACI,WAAA;EACA,YAAA;AL2YpB;AKzYgB;EACI,aAAA;AL2YpB;AKvYQ;EAEQ,YAAA;ALwYhB;AKrYQ;EACI,WAAA;ALuYZ;AKxYQ;EAGQ,YAAA;ALwYhB;AKpqBA;;EAiSY,iBAAA;EACA,WAAA;EACA,uCAAA;EACA,sBAAA;EACA,eAAA;EACA,eAAA;ALuYZ;AK7qBA;EAySY,qBAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;EACA,iBAAA;EACA,WAAA;EACA,kBAAA;ALuYZ;AKtrBA;EAkTY,WAAA;EACA,YAAA;EACA,YAAA;EACA,6BAAA;EACA,aAAA;EACA,eAAA;EACA,sBAAA;EACA,sBAAA;EACA,qBAAA;ALuYZ;AKjsBA;EA4TgB,gCAAA;EACA,YAAA;ALwYhB;AKtYY;EAEQ,UAAA;ALuYpB;AKpYY;EACI,WAAA;EACA,WAAA;EACA,iBAAA;EACA,eAAA;ALsYhB;AKpYY;EACI,qBAAA;ALsYhB;AKpYY;EACI,kBAAA;ALsYhB;AKpYY;EACI,WAAA;ALsYhB;AKvtBA;EAqVY,kBAAA;EACA,qBAAA;EACA,eAAA;EACA,YAAA;ALqYZ;AKpYY;EAEQ,WAAA;ALqYpB;AKvYY;EAKQ,mBAAA;ALqYpB;AKlYY;EAEQ,WAAA;ALmYpB;AKrYY;EAKQ,mBAAA;ALmYpB;AKzuBA;EA0WgB,qBAAA;EACA,qBAAA;EACA,sBAAA;EACA,YAAA;ALkYhB;AK/uBA;EA+WoB,kBAAA;EACA,SAAA;EACA,QAAA;EACA,WAAA;EACA,gBAAA;EACA,gCAAA;ALmYpB;AKvvBA;EAsXwB,kBAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,yBAAA;EACA,kBAAA;ALoYxB;AK/vBA;EA6X4B,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,mBAAA;ALqY5B;AK5wBA;EA8YY,qBAAA;EACA,YAAA;ALiYZ;AKhxBA;EAkZY,qBAAA;EACA,YAAA;ALiYZ;AKpxBA;EAqZgB,kBAAA;EACA,QAAA;EACA,YAAA;EACA,mBAAA;EACA,uBAAA;EAAA,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,cAAA;EACA,UAAA;ALkYhB;AKjYgB;EACI,cAAA;ALmYpB;AKjYgB;EACI,mBAAA;ALmYpB;AKzyBA;EA0agB,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;ALkYhB;AKjYgB;EACI,0CAAA;ALmYpB;AKnzBA;EAqbY,qBAAA;EACA,YAAA;ALiYZ;AKvzBA;EAwbgB,kBAAA;EACA,QAAA;EACA,YAAA;EACA,mBAAA;EACA,YAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,gBAAA;EACA,UAAA;ALkYhB;AKjYgB;EACI,aAAA;ALmYpB;AKlYoB;EACI,cAAA;ALoYxB;AKjYgB;EACI,mBAAA;ALmYpB;AKjYgB;EACI,WAAA;EACA,kBAAA;ALmYpB;AKjYgB;EAEQ,aAAA;ALkYxB;AKpYgB;EAKQ,cAAA;ALkYxB;AKv1BA;;EA2dgB,YAAA;EACA,iBAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;ALgYhB;AK/XgB;;EACI,0CAAA;ALkYpB;AKn2BA;EAqegB,cAAA;ALiYhB;AKt2BA;EAueoB,eAAA;EACA,eAAA;ALkYpB;AKhYgB;EAEQ,aAAA;ALiYxB;AKnYgB;EAKQ,qBAAA;ALiYxB;AK9XgB;EAEQ,aAAA;AL+XxB;AKjYgB;EAKQ,qBAAA;AL+XxB;AKt3BA;EA2foB,eAAA;EACA,sBAAA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;EACA,WAAA;AL8XpB;AK93BA;EAkgBwB,kBAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;EACA,gBAAA;EACA,gCAAA;AL+XxB;AKt4BA;EAygB4B,kBAAA;EACA,SAAA;EACA,OAAA;EACA,YAAA;EACA,yBAAA;EACA,gBAAA;EACA,kBAAA;ALgY5B;AK/4BA;EAihBgC,kBAAA;EACA,MAAA;EACA,UAAA;EACA,gBAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,gCAAA;EACA,gBAAA;ALiYhC;AK55BA;EAmiBY,qBAAA;EACA,YAAA;EACA,kBAAA;AL4XZ;AK3XY;EAEQ,cAAA;AL4XpB;AKp6BA;EA4iBgB,kBAAA;EACA,UAAA;EACA,UAAA;EACA,aAAA;AL2XhB;AK16BA;EAmjBY,kBAAA;EACA,qBAAA;EACA,YAAA;EACA,UAAA;AL0XZ;AKzXY;EAEQ,cAAA;AL0XpB;AK5XY;EAKQ,cAAA;AL0XpB;AKt7BA;EAgkBgB,aAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;EACA,WAAA;EACA,oBAAA;ALyXhB;AK97BA;EAwkBgB,aAAA;EACA,eAAA;EACA,WAAA;EACA,kBAAA;EACA,iCAAA;EACA,cAAA;EACA,gCAAA;EACA,gBAAA;EACA,WAAA;EACA,kBAAA;ALyXhB;AK18BA;EAolBgB,YAAA;EACA,sBAAA;EACA,eAAA;EACA,iBAAA;ALyXhB;AKxXgB;EACI,0CAAA;AL0XpB;AKn9BA;EA8lBY,qBAAA;EACA,YAAA;ALwXZ;AKv9BA;EAkmBY,WAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,mBAAA;ALwXZ;AK99BA;EAymBY,WAAA;EACA,YAAA;EACA,kBAAA;EACA,YAAA;EACA,sBAAA;EACA,kBAAA;EACA,QAAA;EACA,WAAA;ALwXZ;AKx+BA;EAknBgB,aAAA;EACA,YAAA;EACA,aAAA;ALyXhB;AK7+BA;EAunBgB,qBAAA;EACA,kBAAA;EACA,iCAAA;EACA,yBAAA;EACA,YAAA;EACA,WAAA;EACA,mBAAA;EACA,sBAAA;EACA,eAAA;EACA,4BAAA;ALyXhB;AKz/BA;EAmoBgB,WAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;EACA,MAAA;EACA,OAAA;EACA,mBAAA;EACA,4BAAA;ALyXhB;AKpgCA;EA8oBgB,WAAA;EACA,kBAAA;EACA,cAAA;EACA,OAAA;EACA,MAAA;EACA,mBAAA;EACA,gBAAA;EACA,4BAAA;EACA,wCAAA;EACA,YAAA;EACA,WAAA;ALyXhB;AKjhCA;EA2pBgB,sCAAA;ALyXhB;AKphCA;EA8pBgB,WAAA;EACA,oCAAA;ALyXhB;AKxhCA;EAkqBgB,UAAA;ALyXhB;AKnXA;EACI,aAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,6BAAA;EACA,aAAA;EACA,eAAA;EACA,sBAAA;EAEA,SAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,gCAAA;ALoXJ;AMpjCA;EACI,kBAAA;EACA,OAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;EACA,eAAA;EACA,WAAA;ANsjCJ;AM7jCA;EASQ,qBAAA;EACA,oBAAA;EACA,yBAAA;KAAA,sBAAA;UAAA,iBAAA;EACA,eAAA;EACA,mBAAA;EACA,iDAAA;ANujCR;AMtjCQ;EACI,kBAAA;EACA,kBAAA;ANwjCZ;AMzkCA;EAqBQ,kBAAA;EACA,QAAA;EACA,2BAAA;ANujCR;AMtjCQ;EACI,sBAAA;EACA,yBAAA;EACA,iCAAA;EACA,4BAAA;ANwjCZ;AMrjCI;EACI;IACI,2BAAA;ENujCV;AACF;AMzlCA;;EAsCQ,kBAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;ANujCR;AMtjCQ;;EACI,uBAAA;EACA,gCAAA;EACA,iCAAA;EACA,4BAAA;ANyjCZ;AMtjCI;EACI;IACI,mBAAA;ENwjCV;EMtjCM;IACI,mBAAA;ENwjCV;AACF;AO/mCA;EACI,oBAAA;EACA,kBAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,gBAAA;APinCJ;AOvnCA;EAQQ,eAAA;EACA,gBAAA;EACA,gBAAA;APknCR;AQ5nCA;EACI,kBAAA;EACA,YAAA;EACA,kBAAA;EACA,kCAAA;EACA,cAAA;EACA,gBAAA;EACA,UAAA;EACA,aAAA;AR8nCJ;AQ7nCI;EACI,cAAA;AR+nCR;AQzoCA;EAaQ,YAAA;EACA,sBAAA;EACA,eAAA;AR+nCR;AQ9nCQ;EACI,0CAAA;ARgoCZ;AQjpCA;EAqBY,eAAA;EACA,iBAAA;EACA,WAAA;EACA,eAAA;EACA,qBAAA;EACA,sBAAA;EACA,WAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;AR+nCZ;AQ9nCY;EACI,qBAAA;ARgoChB;AIjqCA;EACI,kBAAA;EACA,YAAA;EACA,UAAA;AJmqCJ;AItqCA;EAMQ,kBAAA;EACA,iCAAA;EACA,gCAAA;EACA,gBAAA;EACA,WAAA;EACA,cAAA;EACA,oBAAA;EACA,0CAAA;AJmqCR;AIhrCA;EAiBQ,4CAAA;AJkqCR;AI9pCA;EACI;IACI,UAAA;IACA,YAAA;IACA,aAAA;EJgqCN;EI9pCE;IACI,iBAAA;IACA,eAAA;IACA,eAAA;EJgqCN;AACF;AI7pCA;EACI;IACI,iBAAA;IACA,eAAA;IACA,eAAA;EJ+pCN;EI7pCE;IACI,eAAA;EJ+pCN;EI7pCE;IACI,YAAA;IACA,iBAAA;EJ+pCN;EI7pCE;IACI,UAAA;IACA,aAAA;IACA,YAAA;EJ+pCN;AACF;ASltCA;EACI,kBAAA;EACA,YAAA;EACA,UAAA;EACA,QAAA;EACA,kBAAA;EACA,WAAA;EACA,iDAAA;EACA,eAAA;ATotCJ;ASntCI;EACI,aAAA;ATqtCR;AU/tCA;EACI,kBAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,UAAA;EACA,aAAA;AViuCJ;AUhuCI;EACI,cAAA;AVkuCR;AU9tCA;EACI,kBAAA;EACA,gBAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;AVguCJ;AUruCA;EAOQ,WAAA;EACA,YAAA;EACA,aAAA;AViuCR;AU1uCA;EAYQ,cAAA;AViuCR;AU7uCA;EAeQ,aAAA;AViuCR;AW7vCA;EACI,kBAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,iCAAA;EACA,aAAA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;AX+vCJ;AW7vCI;EACI,aAAA;AX+vCR;AW3wCA;EAgBQ,eAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;AX8vCR;AW1vCQ;EACI,qBAAA;EACA,sBAAA;EACA,iBAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;AX4vCZ;AWzxCA;EAkCQ,YAAA;EACA,iBAAA;EACA,kBAAA;AX0vCR;AW9xCA;EAwCQ,YAAA;AXyvCR",sourcesContent:[`@keyframes my-face {
    2% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    4% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    6% {
        transform: translate(0, 1.5px) rotate(-1.5deg);
    }
    8% {
        transform: translate(0, -1.5px) rotate(-1.5deg);
    }
    10% {
        transform: translate(0, 2.5px) rotate(1.5deg);
    }
    12% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    14% {
        transform: translate(0, -1.5px) rotate(1.5deg);
    }
    16% {
        transform: translate(0, -0.5px) rotate(-1.5deg);
    }
    18% {
        transform: translate(0, 0.5px) rotate(-1.5deg);
    }
    20% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    22% {
        transform: translate(0, 0.5px) rotate(-1.5deg);
    }
    24% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    26% {
        transform: translate(0, 0.5px) rotate(0.5deg);
    }
    28% {
        transform: translate(0, 0.5px) rotate(1.5deg);
    }
    30% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    32% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    34% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    36% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    38% {
        transform: translate(0, 1.5px) rotate(-1.5deg);
    }
    40% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    42% {
        transform: translate(0, 2.5px) rotate(-1.5deg);
    }
    44% {
        transform: translate(0, 1.5px) rotate(0.5deg);
    }
    46% {
        transform: translate(0, -1.5px) rotate(2.5deg);
    }
    48% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    50% {
        transform: translate(0, 0.5px) rotate(0.5deg);
    }
    52% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    54% {
        transform: translate(0, -1.5px) rotate(1.5deg);
    }
    56% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    58% {
        transform: translate(0, 0.5px) rotate(2.5deg);
    }
    60% {
        transform: translate(0, 2.5px) rotate(2.5deg);
    }
    62% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    64% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    66% {
        transform: translate(0, 1.5px) rotate(-0.5deg);
    }
    68% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    70% {
        transform: translate(0, 1.5px) rotate(0.5deg);
    }
    72% {
        transform: translate(0, 2.5px) rotate(1.5deg);
    }
    74% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    76% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    78% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    80% {
        transform: translate(0, 1.5px) rotate(1.5deg);
    }
    82% {
        transform: translate(0, -0.5px) rotate(0.5deg);
    }
    84% {
        transform: translate(0, 1.5px) rotate(2.5deg);
    }
    86% {
        transform: translate(0, -1.5px) rotate(-1.5deg);
    }
    88% {
        transform: translate(0, -0.5px) rotate(2.5deg);
    }
    90% {
        transform: translate(0, 2.5px) rotate(-0.5deg);
    }
    92% {
        transform: translate(0, 0.5px) rotate(-0.5deg);
    }
    94% {
        transform: translate(0, 2.5px) rotate(0.5deg);
    }
    96% {
        transform: translate(0, -0.5px) rotate(1.5deg);
    }
    98% {
        transform: translate(0, -1.5px) rotate(-0.5deg);
    }
    0%,
    100% {
        transform: translate(0, 0) rotate(0deg);
    }
}`,`@import '../../node_modules/balloon-css/balloon.css';
@keyframes my-face {
  2% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  6% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  8% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  10% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  12% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  14% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  16% {
    transform: translate(0, -0.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  20% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  22% {
    transform: translate(0, 0.5px) rotate(-1.5deg);
  }
  24% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  26% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  28% {
    transform: translate(0, 0.5px) rotate(1.5deg);
  }
  30% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  32% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  34% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  36% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  38% {
    transform: translate(0, 1.5px) rotate(-1.5deg);
  }
  40% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  42% {
    transform: translate(0, 2.5px) rotate(-1.5deg);
  }
  44% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  46% {
    transform: translate(0, -1.5px) rotate(2.5deg);
  }
  48% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  50% {
    transform: translate(0, 0.5px) rotate(0.5deg);
  }
  52% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  54% {
    transform: translate(0, -1.5px) rotate(1.5deg);
  }
  56% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  58% {
    transform: translate(0, 0.5px) rotate(2.5deg);
  }
  60% {
    transform: translate(0, 2.5px) rotate(2.5deg);
  }
  62% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  64% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  66% {
    transform: translate(0, 1.5px) rotate(-0.5deg);
  }
  68% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  70% {
    transform: translate(0, 1.5px) rotate(0.5deg);
  }
  72% {
    transform: translate(0, 2.5px) rotate(1.5deg);
  }
  74% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  76% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  78% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  80% {
    transform: translate(0, 1.5px) rotate(1.5deg);
  }
  82% {
    transform: translate(0, -0.5px) rotate(0.5deg);
  }
  84% {
    transform: translate(0, 1.5px) rotate(2.5deg);
  }
  86% {
    transform: translate(0, -1.5px) rotate(-1.5deg);
  }
  88% {
    transform: translate(0, -0.5px) rotate(2.5deg);
  }
  90% {
    transform: translate(0, 2.5px) rotate(-0.5deg);
  }
  92% {
    transform: translate(0, 0.5px) rotate(-0.5deg);
  }
  94% {
    transform: translate(0, 2.5px) rotate(0.5deg);
  }
  96% {
    transform: translate(0, -0.5px) rotate(1.5deg);
  }
  98% {
    transform: translate(0, -1.5px) rotate(-0.5deg);
  }
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
.dplayer {
  position: relative;
  overflow: hidden;
  user-select: none;
  line-height: 1;
}
.dplayer * {
  box-sizing: content-box;
}
.dplayer svg {
  width: 100%;
  height: 100%;
}
.dplayer svg path,
.dplayer svg circle {
  fill: #fff;
}
.dplayer:-webkit-full-screen {
  width: 100%;
  height: 100%;
  background: #000;
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  transform: translate(0, 0);
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-showdan,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danmaku,
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box .dplayer-setting-danunlimit {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-controller .dplayer-icons .dplayer-comment {
  display: none;
}
.dplayer.dplayer-no-danmaku .dplayer-danmaku {
  display: none;
}
.dplayer.dplayer-live .dplayer-time {
  display: none;
}
.dplayer.dplayer-live .dplayer-bar-wrap {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-speed {
  display: none;
}
.dplayer.dplayer-live .dplayer-setting-loop {
  display: none;
}
.dplayer.dplayer-live.dplayer-no-danmaku .dplayer-setting {
  display: none;
}
.dplayer.dplayer-arrow .dplayer-danmaku {
  font-size: 18px;
}
.dplayer.dplayer-arrow .dplayer-icon {
  margin: 0 -3px;
}
.dplayer.dplayer-playing .dplayer-danmaku .dplayer-danmaku-move {
  animation-play-state: running;
}
@media (min-width: 900px) {
  .dplayer.dplayer-playing .dplayer-controller-mask {
    opacity: 0;
  }
  .dplayer.dplayer-playing .dplayer-controller {
    opacity: 0;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller-mask {
    opacity: 1;
  }
  .dplayer.dplayer-playing:hover .dplayer-controller {
    opacity: 1;
  }
}
.dplayer.dplayer-loading .dplayer-bezel .diplayer-loading-icon {
  display: block;
}
.dplayer.dplayer-loading .dplayer-danmaku,
.dplayer.dplayer-paused .dplayer-danmaku,
.dplayer.dplayer-loading .dplayer-danmaku-move,
.dplayer.dplayer-paused .dplayer-danmaku-move {
  animation-play-state: paused;
}
.dplayer.dplayer-hide-controller {
  cursor: none;
}
.dplayer.dplayer-hide-controller .dplayer-controller-mask {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-hide-controller .dplayer-controller {
  opacity: 0;
  transform: translateY(100%);
}
.dplayer.dplayer-show-controller .dplayer-controller-mask {
  opacity: 1;
}
.dplayer.dplayer-show-controller .dplayer-controller {
  opacity: 1;
}
.dplayer.dplayer-fulled {
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-volume,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-camera-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-airplay-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-chromecast-icon,
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-play-icon {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: static;
  display: inline-block;
}
.dplayer.dplayer-mobile .dplayer-bar-time {
  display: none;
}
.dplayer.dplayer-mobile.dplayer-hide-controller .dplayer-mobile-play {
  display: none;
}
.dplayer.dplayer-mobile .dplayer-mobile-play {
  display: block;
}
.dplayer-web-fullscreen-fix {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}
[data-balloon]:before {
  display: none;
}
[data-balloon]:after {
  padding: 0.3em 0.7em;
  background: rgba(17, 17, 17, 0.7);
}
[data-balloon][data-balloon-pos="up"]:after {
  margin-bottom: 0;
}
.dplayer-bezel {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -26px 0 0 -26px;
  height: 52px;
  width: 52px;
  padding: 12px;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}
.dplayer-bezel .dplayer-bezel-icon.dplayer-bezel-transition {
  animation: bezel-hide 0.5s linear;
}
@keyframes bezel-hide {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}
.dplayer-bezel .dplayer-danloading {
  position: absolute;
  top: 50%;
  margin-top: -7px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-bezel .diplayer-loading-icon {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -18px 0 0 -18px;
  height: 36px;
  width: 36px;
  pointer-events: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-hide {
  display: none;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot {
  animation: diplayer-loading-dot-fade 0.8s ease infinite;
  opacity: 0;
  transform-origin: 4px 4px;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-1 {
  animation-delay: 0.1s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-2 {
  animation-delay: 0.2s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-3 {
  animation-delay: 0.3s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-4 {
  animation-delay: 0.4s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-5 {
  animation-delay: 0.5s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-6 {
  animation-delay: 0.6s;
}
.dplayer-bezel .diplayer-loading-icon .diplayer-loading-dot.diplayer-loading-dot-7 {
  animation-delay: 0.7s;
}
@keyframes diplayer-loading-dot-fade {
  0% {
    opacity: 0.7;
    transform: scale(1.2, 1.2);
  }
  50% {
    opacity: 0.25;
    transform: scale(0.9, 0.9);
  }
  to {
    opacity: 0.25;
    transform: scale(0.85, 0.85);
  }
}
.dplayer-controller-mask {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;
  height: 98px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
}
.dplayer-controller {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 41px;
  padding: 0 20px;
  user-select: none;
  transition: all 0.3s ease;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons {
  display: none;
}
.dplayer-controller.dplayer-controller-comment .dplayer-icons.dplayer-comment-box {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap {
  padding: 5px 0;
  cursor: pointer;
  position: absolute;
  bottom: 33px;
  width: calc(100% - 40px);
  height: 3px;
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-bar .dplayer-played .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-bar-wrap:hover .dplayer-highlight {
  display: block;
  width: 8px;
  transform: translateX(-4px);
  top: 4px;
  height: 40%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight {
  z-index: 12;
  position: absolute;
  top: 5px;
  width: 6px;
  height: 20%;
  border-radius: 6px;
  background-color: #fff;
  text-align: center;
  transform: translateX(-3px);
  transition: all 0.2s ease-in-out;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover .dplayer-highlight-text {
  display: block;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-preview {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight:hover ~ .dplayer-bar-time {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-highlight .dplayer-highlight-text {
  display: none;
  position: absolute;
  left: 50%;
  top: -24px;
  padding: 5px 8px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translateX(-50%);
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview {
  position: absolute;
  background: #fff;
  pointer-events: none;
  display: none;
  background-size: 16000px 100%;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-preview-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time {
  position: absolute;
  left: 0px;
  top: -20px;
  border-radius: 4px;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #fff;
  font-size: 12px;
  text-align: center;
  opacity: 1;
  transition: opacity 0.1s ease-in-out;
  word-wrap: normal;
  word-break: normal;
  z-index: 2;
  pointer-events: none;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar-time.hidden {
  opacity: 0;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar {
  position: relative;
  height: 3px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-loaded {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
  height: 3px;
  transition: all 0.5s ease;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  height: 3px;
  will-change: width;
}
.dplayer-controller .dplayer-bar-wrap .dplayer-bar .dplayer-played .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons {
  height: 38px;
  position: absolute;
  bottom: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box {
  display: none;
  position: absolute;
  transition: all 0.3s ease-in-out;
  z-index: 2;
  height: 38px;
  bottom: 0;
  left: 20px;
  right: 20px;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-icon {
  position: absolute;
  left: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-send-icon {
  position: absolute;
  right: 0;
  top: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box {
  position: absolute;
  background: rgba(28, 28, 28, 0.9);
  bottom: 41px;
  left: 0;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 10px 10px 16px;
  font-size: 14px;
  width: 204px;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box.dplayer-comment-setting-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box input[type=radio] {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box label {
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-title {
  font-size: 13px;
  color: #fff;
  line-height: 30px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type .dplayer-comment-setting-title {
  margin-bottom: 6px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(2) span {
  border-radius: 4px 0 0 4px;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type label:nth-child(4) span {
  border-radius: 0 4px 4px 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type span {
  width: 33%;
  padding: 4px 6px;
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
  color: #fff;
  border: 1px solid #fff;
  margin-right: -1px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-type input:checked + span {
  background: #E4E4E6;
  color: #1c1c1c;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color {
  font-size: 0;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color label {
  font-size: 0;
  padding: 6px;
  display: inline-block;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span {
  width: 22px;
  height: 22px;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-setting-box .dplayer-comment-setting-color span:hover {
  animation: my-face 5s infinite ease-in-out;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input {
  outline: none;
  border: none;
  padding: 8px 31px;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  border-radius: 4px;
  background: none;
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  color: #fff;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::placeholder {
  color: #fff;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons.dplayer-comment-box .dplayer-comment-input::-ms-clear {
  display: none;
}
.dplayer-controller .dplayer-icons.dplayer-icons-left .dplayer-icon {
  padding: 7px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right {
  right: 20px;
}
.dplayer-controller .dplayer-icons.dplayer-icons-right .dplayer-icon {
  padding: 8px;
}
.dplayer-controller .dplayer-icons .dplayer-time,
.dplayer-controller .dplayer-icons .dplayer-live-badge {
  line-height: 38px;
  color: #eee;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  font-size: 13px;
  cursor: default;
}
.dplayer-controller .dplayer-icons .dplayer-live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  vertical-align: 4%;
  margin-right: 5px;
  content: '';
  border-radius: 6px;
}
.dplayer-controller .dplayer-icons .dplayer-icon {
  width: 40px;
  height: 100%;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-icon .dplayer-icon-content {
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
}
.dplayer-controller .dplayer-icons .dplayer-icon:hover .dplayer-icon-content {
  opacity: 1;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-quality-icon {
  color: #fff;
  width: auto;
  line-height: 22px;
  font-size: 14px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-comment-icon {
  padding: 10px 9px 9px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-setting-icon {
  padding-top: 8.5px;
}
.dplayer-controller .dplayer-icons .dplayer-icon.dplayer-volume-icon {
  width: 43px;
}
.dplayer-controller .dplayer-icons .dplayer-volume {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume:hover .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar {
  width: 45px;
}
.dplayer-controller .dplayer-icons .dplayer-volume.dplayer-volume-active .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap {
  display: inline-block;
  margin: 0 10px 0 -5px;
  vertical-align: middle;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar {
  position: relative;
  top: 17px;
  width: 0;
  height: 3px;
  background: #aaa;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-volume .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0);
}
.dplayer-controller .dplayer-icons .dplayer-subtitle-btn {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: fit-content;
  max-width: 240px;
  min-width: 120px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: auto;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-box.dplayer-subtitles-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-subtitles .dplayer-subtitles-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
  position: absolute;
  right: 0;
  bottom: 50px;
  transform: scale(0);
  width: 150px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 7px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box > div.dplayer-setting-origin-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-open {
  transform: scale(1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-narrow {
  width: 70px;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-origin-panel {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box.dplayer-setting-box-speed .dplayer-setting-speed-panel {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item {
  height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-item:hover,
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-speed-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku {
  padding: 5px 0;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-label {
  padding: 0 10px;
  display: inline;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku:hover .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-label {
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku.dplayer-setting-danmaku-active .dplayer-danmaku-bar-wrap {
  display: inline-block;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap {
  padding: 0 10px;
  box-sizing: border-box;
  display: none;
  vertical-align: middle;
  height: 100%;
  width: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar {
  position: relative;
  top: 8.5px;
  width: 100%;
  height: 3px;
  background: #fff;
  transition: all 0.3s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  transition: all 0.1s ease;
  background: #aaa;
  will-change: width;
}
.dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-danmaku .dplayer-danmaku-bar-wrap .dplayer-danmaku-bar .dplayer-danmaku-bar-inner .dplayer-thumb {
  position: absolute;
  top: 0;
  right: 5px;
  margin-top: -4px;
  margin-right: -10px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: #aaa;
}
.dplayer-controller .dplayer-icons .dplayer-full {
  display: inline-block;
  height: 100%;
  position: relative;
}
.dplayer-controller .dplayer-icons .dplayer-full:hover .dplayer-full-in-icon {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-full .dplayer-full-in-icon {
  position: absolute;
  top: -30px;
  z-index: 1;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-quality {
  position: relative;
  display: inline-block;
  height: 100%;
  z-index: 2;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-list {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality:hover .dplayer-quality-mask {
  display: block;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-mask {
  display: none;
  position: absolute;
  bottom: 38px;
  left: -18px;
  width: 80px;
  padding-bottom: 12px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-list {
  display: none;
  font-size: 12px;
  width: 80px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  padding: 5px 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  text-align: center;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item {
  height: 25px;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 25px;
}
.dplayer-controller .dplayer-icons .dplayer-quality .dplayer-quality-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-controller .dplayer-icons .dplayer-comment {
  display: inline-block;
  height: 100%;
}
.dplayer-controller .dplayer-icons .dplayer-label {
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}
.dplayer-controller .dplayer-icons .dplayer-toggle {
  width: 32px;
  height: 20px;
  text-align: center;
  font-size: 0;
  vertical-align: middle;
  position: absolute;
  top: 5px;
  right: 10px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input {
  max-height: 0;
  max-width: 0;
  display: none;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label {
  display: inline-block;
  position: relative;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border: 1px solid #dfdfdf;
  height: 20px;
  width: 32px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:before {
  content: "";
  position: absolute;
  display: block;
  height: 18px;
  width: 18px;
  top: 0;
  left: 0;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input + label:after {
  content: "";
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  border-radius: 15px;
  background: #fff;
  transition: 0.2s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  height: 18px;
  width: 18px;
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label {
  border-color: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:before {
  width: 30px;
  background: rgba(255, 255, 255, 0.5);
}
.dplayer-controller .dplayer-icons .dplayer-toggle input:checked + label:after {
  left: 12px;
}
.dplayer-mobile-play {
  display: none;
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  bottom: 0;
  opacity: 0.8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dplayer-danmaku {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 22px;
  color: #fff;
}
.dplayer-danmaku .dplayer-danmaku-item {
  display: inline-block;
  pointer-events: none;
  user-select: none;
  cursor: default;
  white-space: nowrap;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
}
.dplayer-danmaku .dplayer-danmaku-item--demo {
  position: absolute;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-right {
  position: absolute;
  right: 0;
  transform: translateX(100%);
}
.dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
  will-change: transform;
  animation-name: 'danmaku';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku {
  from {
    transform: translateX(100%);
  }
}
.dplayer-danmaku .dplayer-danmaku-top,
.dplayer-danmaku .dplayer-danmaku-bottom {
  position: absolute;
  width: 100%;
  text-align: center;
  visibility: hidden;
}
.dplayer-danmaku .dplayer-danmaku-top.dplayer-danmaku-move,
.dplayer-danmaku .dplayer-danmaku-bottom.dplayer-danmaku-move {
  will-change: visibility;
  animation-name: 'danmaku-center';
  animation-timing-function: linear;
  animation-play-state: paused;
}
@keyframes danmaku-center {
  from {
    visibility: visible;
  }
  to {
    visibility: visible;
  }
}
.dplayer-logo {
  pointer-events: none;
  position: absolute;
  left: 20px;
  top: 20px;
  max-width: 50px;
  max-height: 50px;
}
.dplayer-logo img {
  max-width: 100%;
  max-height: 100%;
  background: none;
}
.dplayer-menu {
  position: absolute;
  width: 170px;
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.85);
  padding: 5px 0;
  overflow: hidden;
  z-index: 3;
  display: none;
}
.dplayer-menu.dplayer-menu-show {
  display: block;
}
.dplayer-menu .dplayer-menu-item {
  height: 30px;
  box-sizing: border-box;
  cursor: pointer;
}
.dplayer-menu .dplayer-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.dplayer-menu .dplayer-menu-item a {
  padding: 0 10px;
  line-height: 30px;
  color: #eee;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-menu .dplayer-menu-item a:hover {
  text-decoration: none;
}
.dplayer-notice-list {
  position: absolute;
  bottom: 60px;
  left: 20px;
}
.dplayer-notice-list .dplayer-notice {
  border-radius: 2px;
  background: rgba(28, 28, 28, 0.9);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  color: #fff;
  display: table;
  pointer-events: none;
  animation: showNotice 0.3s ease 1 forwards;
}
.dplayer-notice-list .remove-notice {
  animation: removeNotice 0.3s ease 1 forwards;
}
@keyframes showNotice {
  from {
    padding: 0;
    font-size: 0;
    margin-top: 0;
  }
  to {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
}
@keyframes removeNotice {
  0% {
    padding: 7px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
  20% {
    font-size: 12px;
  }
  21% {
    font-size: 0;
    padding: 7px 10px;
  }
  100% {
    padding: 0;
    margin-top: 0;
    font-size: 0;
  }
}
.dplayer-subtitle {
  position: absolute;
  bottom: 40px;
  width: 90%;
  left: 5%;
  text-align: center;
  color: #fff;
  text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
  font-size: 20px;
}
.dplayer-subtitle.dplayer-subtitle-hide {
  display: none;
}
.dplayer-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: none;
}
.dplayer-mask.dplayer-mask-show {
  display: block;
}
.dplayer-video-wrap {
  position: relative;
  background: #000;
  font-size: 0;
  width: 100%;
  height: 100%;
}
.dplayer-video-wrap .dplayer-video {
  width: 100%;
  height: 100%;
  display: none;
}
.dplayer-video-wrap .dplayer-video-current {
  display: block;
}
.dplayer-video-wrap .dplayer-video-prepare {
  display: none;
}
.dplayer-info-panel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 400px;
  background: rgba(28, 28, 28, 0.8);
  padding: 10px;
  color: #fff;
  font-size: 12px;
  border-radius: 2px;
}
.dplayer-info-panel-hide {
  display: none;
}
.dplayer-info-panel .dplayer-info-panel-close {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item > span {
  display: inline-block;
  vertical-align: middle;
  line-height: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.dplayer-info-panel .dplayer-info-panel-item-title {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.dplayer-info-panel .dplayer-info-panel-item-data {
  width: 260px;
}
`,`.dplayer {
    position: relative;
    overflow: hidden;
    user-select: none;
    line-height: 1;

    * {
        box-sizing: content-box;
    }

    svg {
        width: 100%;
        height: 100%;

        path,
        circle {
            fill: #fff;
        }
    }

    &:-webkit-full-screen {
        width: 100%;
        height: 100%;
        background: #000;
        position: fixed;
        z-index: 100000;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        transform: translate(0, 0);
        
    }

    &.dplayer-no-danmaku {
        .dplayer-controller .dplayer-icons .dplayer-setting .dplayer-setting-box {
            .dplayer-setting-showdan,
            .dplayer-setting-danmaku,
            .dplayer-setting-danunlimit {
                display: none;
            }
        }

        .dplayer-controller .dplayer-icons .dplayer-comment {
            display: none;
        }

        .dplayer-danmaku {
            display: none;
        }
    }

    &.dplayer-live {
        .dplayer-time {
            display: none;
        }
        .dplayer-bar-wrap {
            display: none;
        }
        .dplayer-setting-speed {
            display: none;
        }
        .dplayer-setting-loop {
            display: none;
        }

        &.dplayer-no-danmaku {
            .dplayer-setting {
                display: none;
            }
        }
    }

    &.dplayer-arrow {
        .dplayer-danmaku {
            font-size: 18px;
        }
        .dplayer-icon {
            margin: 0 -3px;
        }
    }

    &.dplayer-playing {
        .dplayer-danmaku .dplayer-danmaku-move {
            animation-play-state: running;
        }

        @media (min-width: 900px) {
            .dplayer-controller-mask {
                opacity: 0;
            }
            .dplayer-controller {
                opacity: 0;
            }

            &:hover {
                .dplayer-controller-mask {
                    opacity: 1;
                }
                .dplayer-controller {
                    opacity: 1;
                }
            }
        }
    }

    &.dplayer-loading {
        .dplayer-bezel .diplayer-loading-icon {
            display: block;
        }
    }

    &.dplayer-loading,
    &.dplayer-paused {
        .dplayer-danmaku,
        .dplayer-danmaku-move {
            animation-play-state: paused;
        }
    }

    &.dplayer-hide-controller {
        cursor: none;

        .dplayer-controller-mask {
            opacity: 0;
            transform: translateY(100%);
        }
        .dplayer-controller {
            opacity: 0;
            transform: translateY(100%);
        }
    }
    &.dplayer-show-controller {
        .dplayer-controller-mask {
            opacity: 1;
        }
        .dplayer-controller {
            opacity: 1;
        }
    }
    &.dplayer-fulled {
        position: fixed;
        z-index: 100000;
        left: 0;
        top: 0;
        width: 100% !important;
        height: 100% !important;
    }
    &.dplayer-mobile {
        .dplayer-controller .dplayer-icons {
            .dplayer-volume,
            .dplayer-camera-icon,
            .dplayer-airplay-icon,
            .dplayer-chromecast-icon,
            .dplayer-play-icon {
                display: none;
            }
            .dplayer-full .dplayer-full-in-icon {
                position: static;
                display: inline-block;
            }
        }

        .dplayer-bar-time {
            display: none;
        }

        &.dplayer-hide-controller {
            .dplayer-mobile-play {
                display: none;
            }
        }

        .dplayer-mobile-play {
            display: block;
        }
    }
}

// To hide scroll bar, apply this class to <body>
.dplayer-web-fullscreen-fix {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}
`,`@import '../../node_modules/balloon-css/balloon.css';

[data-balloon]:before {
    display: none;
}

[data-balloon]:after {
    padding: 0.3em 0.7em;
    background: rgba(17, 17, 17, 0.7);
}

[data-balloon][data-balloon-pos="up"]:after {
    margin-bottom: 0;
}`,`.dplayer-bezel {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 22px;
    color: #fff;
    pointer-events: none;
    .dplayer-bezel-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -26px 0 0 -26px;
        height: 52px;
        width: 52px;
        padding: 12px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, .5);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        &.dplayer-bezel-transition {
            animation: bezel-hide .5s linear;
        }
        @keyframes bezel-hide {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(2);
            }
        }
    }
    .dplayer-danloading {
        position: absolute;
        top: 50%;
        margin-top: -7px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        line-height: 14px;
        animation: my-face 5s infinite ease-in-out;
    }
    .diplayer-loading-icon {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -18px 0 0 -18px;
        height: 36px;
        width: 36px;
        pointer-events: none;
        .diplayer-loading-hide {
            display: none;
        }
        .diplayer-loading-dot {
            animation: diplayer-loading-dot-fade .8s ease infinite;
            opacity: 0;
            transform-origin: 4px 4px;
            each(range(7), {
                &.diplayer-loading-dot-@{value} {
                    animation-delay: (@value * 0.1s);
                }
            });
        }
        @keyframes diplayer-loading-dot-fade {
            0% {
                opacity: .7;
                transform: scale(1.2, 1.2)
            }
            50% {
                opacity: .25;
                transform: scale(.9, .9)
            }
            to {
                opacity: .25;
                transform: scale(.85, .85)
            }
        }
    }
}`,`.dplayer-notice-list{
    position: absolute;
    bottom: 60px;
    left: 20px;

    .dplayer-notice {
        border-radius: 2px;
        background: rgba(28, 28, 28, 0.9);
        transition: all .3s ease-in-out;
        overflow: hidden;
        color: #fff;
        display: table;
        pointer-events: none;
        animation: showNotice .3s ease 1 forwards;
    }

    .remove-notice{
        animation: removeNotice .3s ease 1 forwards;
    }
}

@keyframes showNotice {
    from {
        padding: 0;
        font-size: 0;
        margin-top: 0;
    }
    to {
        padding: 7px 20px;
        font-size: 14px;
        margin-top: 5px;
    }
}

@keyframes removeNotice {
    0%{
        padding: 7px 20px;
        font-size: 14px;
        margin-top: 5px;
    }
    20%{
        font-size: 12px;
    }
    21%{
        font-size: 0;
        padding: 7px 10px;
    }
    100%{
        padding: 0;
        margin-top: 0;
        font-size: 0;
    }
}
`,`.dplayer-controller-mask {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;
    height: 98px;
    width: 100%;
    position: absolute;
    bottom: 0;
    transition: all 0.3s ease;
}

.dplayer-controller {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 41px;
    padding: 0 20px;
    user-select: none;
    transition: all 0.3s ease;
    &.dplayer-controller-comment {
        .dplayer-icons {
            display: none;
        }
        .dplayer-icons.dplayer-comment-box {
            display: block;
        }
    }
    .dplayer-bar-wrap {
        padding: 5px 0;
        cursor: pointer;
        position: absolute;
        bottom: 33px;
        width: calc(100% - 40px);
        height: 3px;
        &:hover {
            .dplayer-bar .dplayer-played .dplayer-thumb {
                transform: scale(1);
            }
            .dplayer-highlight {
                display: block;
                width: 8px;
                transform: translateX(-4px);
                top: 4px;
                height: 40%;
            }
        }
        .dplayer-highlight {
            z-index: 12;
            position: absolute;
            top: 5px;
            width: 6px;
            height: 20%;
            border-radius: 6px;
            background-color: #fff;
            text-align: center;
            transform: translateX(-3px);
            transition: all .2s ease-in-out;
            &:hover {
                .dplayer-highlight-text {
                    display: block;
                }
                &~.dplayer-bar-preview {
                    opacity: 0;
                }
                &~.dplayer-bar-time {
                    opacity: 0;
                }
            }
            .dplayer-highlight-text {
                display: none;
                position: absolute;
                left: 50%;
                top: -24px;
                padding: 5px 8px;
                background-color: rgba(0, 0, 0, .62);
                color: #fff;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                transform: translateX(-50%);
            }
        }
        .dplayer-bar-preview {
            position: absolute;
            background: #fff;
            pointer-events: none;
            display: none;
            background-size: 16000px 100%;
        }
        .dplayer-bar-preview-canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        }
        .dplayer-bar-time {
            &.hidden {
                opacity: 0;
            }
            position: absolute;
            left: 0px;
            top: -20px;
            border-radius: 4px;
            padding: 5px 7px;
            background-color: rgba(0, 0, 0, 0.62);
            color: #fff;
            font-size: 12px;
            text-align: center;
            opacity: 1;
            transition: opacity .1s ease-in-out;
            word-wrap: normal;
            word-break: normal;
            z-index: 2;
            pointer-events: none;
        }
        .dplayer-bar {
            position: relative;
            height: 3px;
            width: 100%;
            background: rgba(255, 255, 255, .2);
            cursor: pointer;
            .dplayer-loaded {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                background: rgba(255, 255, 255, .4);
                height: 3px;
                transition: all 0.5s ease;
                will-change: width;
            }
            .dplayer-played {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                height: 3px;
                will-change: width;
                .dplayer-thumb {
                    position: absolute;
                    top: 0;
                    right: 5px;
                    margin-top: -4px;
                    margin-right: -10px;
                    height: 11px;
                    width: 11px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all .3s ease-in-out;
                    transform: scale(0);
                }
            }
        }
    }
    .dplayer-icons {
        height: 38px;
        position: absolute;
        bottom: 0;
        &.dplayer-comment-box {
            display: none;
            position: absolute;
            transition: all .3s ease-in-out;
            z-index: 2;
            height: 38px;
            bottom: 0;
            left: 20px;
            right: 20px;
            color: #fff;
            .dplayer-icon {
                padding: 7px;
            }
            .dplayer-comment-setting-icon {
                position: absolute;
                left: 0;
                top: 0;
            }
            .dplayer-send-icon {
                position: absolute;
                right: 0;
                top: 0;
            }
            .dplayer-comment-setting-box {
                position: absolute;
                background: rgba(28, 28, 28, 0.9);
                bottom: 41px;
                left: 0;
                box-shadow: 0 0 25px rgba(0, 0, 0, .3);
                border-radius: 4px;
                padding: 10px 10px 16px;
                font-size: 14px;
                width: 204px;
                transition: all .3s ease-in-out;
                transform: scale(0);
                &.dplayer-comment-setting-open {
                    transform: scale(1);
                }
                input[type=radio] {
                    display: none;
                }
                label {
                    cursor: pointer;
                }
                .dplayer-comment-setting-title {
                    font-size: 13px;
                    color: #fff;
                    line-height: 30px;
                }
                .dplayer-comment-setting-type {
                    font-size: 0;
                    .dplayer-comment-setting-title {
                        margin-bottom: 6px;
                    }
                    label {
                        &:nth-child(2) {
                            span {
                                border-radius: 4px 0 0 4px;
                            }
                        }
                        &:nth-child(4) {
                            span {
                                border-radius: 0 4px 4px 0;
                            }
                        }
                    }
                    span {
                        width: 33%;
                        padding: 4px 6px;
                        line-height: 16px;
                        display: inline-block;
                        font-size: 12px;
                        color: #fff;
                        border: 1px solid #fff;
                        margin-right: -1px;
                        box-sizing: border-box;
                        text-align: center;
                        cursor: pointer;
                    }
                    input:checked+span {
                        background: #E4E4E6;
                        color: #1c1c1c;
                    }
                }
                .dplayer-comment-setting-color {
                    font-size: 0;
                    label {
                        font-size: 0;
                        padding: 6px;
                        display: inline-block;
                    }
                    span {
                        width: 22px;
                        height: 22px;
                        display: inline-block;
                        border-radius: 50%;
                        box-sizing: border-box;
                        cursor: pointer;
                        &:hover {
                            animation: my-face 5s infinite ease-in-out;
                        }
                    }
                }
            }
            .dplayer-comment-input {
                outline: none;
                border: none;
                padding: 8px 31px;
                font-size: 14px;
                line-height: 18px;
                text-align: center;
                border-radius: 4px;
                background: none;
                margin: 0;
                height: 100%;
                box-sizing: border-box;
                width: 100%;
                color: #fff;
                &::placeholder {
                    color: #fff;
                    opacity: 0.8;
                }
                &::-ms-clear {
                    display: none;
                }
            }
        }
        &.dplayer-icons-left {
            .dplayer-icon {
                padding: 7px;
            }
        }
        &.dplayer-icons-right {
            right: 20px;
            .dplayer-icon {
                padding: 8px;
            }
        }
        .dplayer-time,
        .dplayer-live-badge {
            line-height: 38px;
            color: #eee;
            text-shadow: 0 0 2px rgba(0, 0, 0, .5);
            vertical-align: middle;
            font-size: 13px;
            cursor: default;
        }
        .dplayer-live-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            vertical-align: 4%;
            margin-right: 5px;
            content: '';
            border-radius: 6px;
        }
        .dplayer-icon {
            width: 40px;
            height: 100%;
            border: none;
            background-color: transparent;
            outline: none;
            cursor: pointer;
            vertical-align: middle;
            box-sizing: border-box;
            display: inline-block;
            .dplayer-icon-content {
                transition: all .2s ease-in-out;
                opacity: .8;
            }
            &:hover {
                .dplayer-icon-content {
                    opacity: 1;
                }
            }
            &.dplayer-quality-icon {
                color: #fff;
                width: auto;
                line-height: 22px;
                font-size: 14px;
            }
            &.dplayer-comment-icon {
                padding: 10px 9px 9px;
            }
            &.dplayer-setting-icon {
                padding-top: 8.5px;
            }
            &.dplayer-volume-icon {
                width: 43px;
            }
        }
        .dplayer-volume {
            position: relative;
            display: inline-block;
            cursor: pointer;
            height: 100%;
            &:hover {
                .dplayer-volume-bar-wrap .dplayer-volume-bar {
                    width: 45px;
                }
                .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
                    transform: scale(1);
                }
            }
            &.dplayer-volume-active {
                .dplayer-volume-bar-wrap .dplayer-volume-bar {
                    width: 45px;
                }
                .dplayer-volume-bar-wrap .dplayer-volume-bar .dplayer-volume-bar-inner .dplayer-thumb {
                    transform: scale(1);
                }
            }
            .dplayer-volume-bar-wrap {
                display: inline-block;
                margin: 0 10px 0 -5px;
                vertical-align: middle;
                height: 100%;
                .dplayer-volume-bar {
                    position: relative;
                    top: 17px;
                    width: 0;
                    height: 3px;
                    background: #aaa;
                    transition: all 0.3s ease-in-out;
                    .dplayer-volume-bar-inner {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height: 100%;
                        transition: all 0.1s ease;
                        will-change: width;
                        .dplayer-thumb {
                            position: absolute;
                            top: 0;
                            right: 5px;
                            margin-top: -4px;
                            margin-right: -10px;
                            height: 11px;
                            width: 11px;
                            border-radius: 50%;
                            cursor: pointer;
                            transition: all .3s ease-in-out;
                            transform: scale(0);
                        }
                    }
                }
            }
        }
        .dplayer-subtitle-btn {
            display: inline-block;
            height: 100%;
        }
        .dplayer-subtitles {
            display: inline-block;
            height: 100%;
            .dplayer-subtitles-box {
                position: absolute;
                right: 0;
                bottom: 50px;
                transform: scale(0);
                width: fit-content;
                max-width: 240px;
                min-width: 120px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 7px 0;
                transition: all .3s ease-in-out;
                overflow: auto;
                z-index: 2;
                &.dplayer-subtitles-panel {
                    display: block;
                }
                &.dplayer-subtitles-box-open {
                    transform: scale(1);
                }
            }
            .dplayer-subtitles-item {
                height: 30px;
                padding: 5px 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
        }
        .dplayer-setting {
            display: inline-block;
            height: 100%;
            .dplayer-setting-box {
                position: absolute;
                right: 0;
                bottom: 50px;
                transform: scale(0);
                width: 150px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 7px 0;
                transition: all .3s ease-in-out;
                overflow: hidden;
                z-index: 2;
                &>div {
                    display: none;
                    &.dplayer-setting-origin-panel {
                        display: block;
                    }
                }
                &.dplayer-setting-box-open {
                    transform: scale(1);
                }
                &.dplayer-setting-box-narrow {
                    width: 70px;
                    text-align: center;
                }
                &.dplayer-setting-box-speed {
                    .dplayer-setting-origin-panel {
                        display: none;
                    }
                    .dplayer-setting-speed-panel {
                        display: block;
                    }
                }
            }
            .dplayer-setting-item,
            .dplayer-setting-speed-item {
                height: 30px;
                padding: 5px 10px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
            .dplayer-setting-danmaku {
                padding: 5px 0;
                .dplayer-label {
                    padding: 0 10px;
                    display: inline;
                }
                &:hover {
                    .dplayer-label {
                        display: none;
                    }
                    .dplayer-danmaku-bar-wrap {
                        display: inline-block;
                    }
                }
                &.dplayer-setting-danmaku-active {
                    .dplayer-label {
                        display: none;
                    }
                    .dplayer-danmaku-bar-wrap {
                        display: inline-block;
                    }
                }
                .dplayer-danmaku-bar-wrap {
                    padding: 0 10px;
                    box-sizing: border-box;
                    display: none;
                    vertical-align: middle;
                    height: 100%;
                    width: 100%;
                    .dplayer-danmaku-bar {
                        position: relative;
                        top: 8.5px;
                        width: 100%;
                        height: 3px;
                        background: #fff;
                        transition: all 0.3s ease-in-out;
                        .dplayer-danmaku-bar-inner {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            height: 100%;
                            transition: all 0.1s ease;
                            background: #aaa;
                            will-change: width;
                            .dplayer-thumb {
                                position: absolute;
                                top: 0;
                                right: 5px;
                                margin-top: -4px;
                                margin-right: -10px;
                                height: 11px;
                                width: 11px;
                                border-radius: 50%;
                                cursor: pointer;
                                transition: all .3s ease-in-out;
                                background: #aaa;
                            }
                        }
                    }
                }
            }
        }
        .dplayer-full {
            display: inline-block;
            height: 100%;
            position: relative;
            &:hover {
                .dplayer-full-in-icon {
                    display: block;
                }
            }
            .dplayer-full-in-icon {
                position: absolute;
                top: -30px;
                z-index: 1;
                display: none;
            }
        }
        .dplayer-quality {
            position: relative;
            display: inline-block;
            height: 100%;
            z-index: 2;
            &:hover {
                .dplayer-quality-list {
                    display: block;
                }
                .dplayer-quality-mask {
                    display: block;
                }
            }
            .dplayer-quality-mask {
                display: none;
                position: absolute;
                bottom: 38px;
                left: -18px;
                width: 80px;
                padding-bottom: 12px;
            }
            .dplayer-quality-list {
                display: none;
                font-size: 12px;
                width: 80px;
                border-radius: 2px;
                background: rgba(28, 28, 28, 0.9);
                padding: 5px 0;
                transition: all .3s ease-in-out;
                overflow: hidden;
                color: #fff;
                text-align: center;
            }
            .dplayer-quality-item {
                height: 25px;
                box-sizing: border-box;
                cursor: pointer;
                line-height: 25px;
                &:hover {
                    background-color: rgba(255, 255, 255, .1);
                }
            }
        }
        .dplayer-comment {
            display: inline-block;
            height: 100%;
        }
        .dplayer-label {
            color: #eee;
            font-size: 13px;
            display: inline-block;
            vertical-align: middle;
            white-space: nowrap;
        }
        .dplayer-toggle {
            width: 32px;
            height: 20px;
            text-align: center;
            font-size: 0;
            vertical-align: middle;
            position: absolute;
            top: 5px;
            right: 10px;
            input {
                max-height: 0;
                max-width: 0;
                display: none;
            }
            input+label {
                display: inline-block;
                position: relative;
                box-shadow: rgb(223, 223, 223) 0 0 0 0 inset;
                border: 1px solid rgb(223, 223, 223);
                height: 20px;
                width: 32px;
                border-radius: 10px;
                box-sizing: border-box;
                cursor: pointer;
                transition: .2s ease-in-out;
            }
            input+label:before {
                content: "";
                position: absolute;
                display: block;
                height: 18px;
                width: 18px;
                top: 0;
                left: 0;
                border-radius: 15px;
                transition: .2s ease-in-out;
            }
            input+label:after {
                content: "";
                position: absolute;
                display: block;
                left: 0;
                top: 0;
                border-radius: 15px;
                background: #fff;
                transition: .2s ease-in-out;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                height: 18px;
                width: 18px;
            }
            input:checked+label {
                border-color: rgba(255, 255, 255, 0.5);
            }
            input:checked+label:before {
                width: 30px;
                background: rgba(255, 255, 255, 0.5);
            }
            input:checked+label:after {
                left: 12px;
            }
        }
    }
}

.dplayer-mobile-play {
    display: none;
    width: 50px;
    height: 50px;
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    opacity: 0.8;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}`,`.dplayer-danmaku {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 22px;
    color: #fff;
    .dplayer-danmaku-item {
        display: inline-block;
        pointer-events: none;
        user-select: none;
        cursor: default;
        white-space: nowrap;
        text-shadow: .5px .5px .5px rgba(0, 0, 0, .5);
        &--demo {
            position: absolute;
            visibility: hidden;
        }
    }
    .dplayer-danmaku-right {
        position: absolute;
        right: 0;
        transform: translateX(100%);
        &.dplayer-danmaku-move {
            will-change: transform;
            animation-name: 'danmaku';
            animation-timing-function: linear;
            animation-play-state: paused;
        }
    }
    @keyframes danmaku {
        from {
            transform: translateX(100%);
        }
    }
    .dplayer-danmaku-top,
    .dplayer-danmaku-bottom {
        position: absolute;
        width: 100%;
        text-align: center;
        visibility: hidden;
        &.dplayer-danmaku-move {
            will-change: visibility;
            animation-name: 'danmaku-center';
            animation-timing-function: linear;
            animation-play-state: paused;
        }
    }
    @keyframes danmaku-center {
        from {
            visibility: visible;
        }
        to {
            visibility: visible;
        }
    }
}`,`.dplayer-logo {
    pointer-events: none;
    position: absolute;
    left: 20px;
    top: 20px;
    max-width: 50px;
    max-height: 50px;
    img {
        max-width: 100%;
        max-height: 100%;
        background: none;
    }
}`,`.dplayer-menu {
    position: absolute;
    width: 170px;
    border-radius: 2px;
    background: rgba(28, 28, 28, 0.85);
    padding: 5px 0;
    overflow: hidden;
    z-index: 3;
    display: none;
    &.dplayer-menu-show {
        display: block;
    }
    .dplayer-menu-item {
        height: 30px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
            background-color: rgba(255, 255, 255, .1);
        }
        a {
            display: inline-block;
            padding: 0 10px;
            line-height: 30px;
            color: #eee;
            font-size: 13px;
            display: inline-block;
            vertical-align: middle;
            width: 100%;
            box-sizing: border-box;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:hover {
                text-decoration: none;
            }
        }
    }
}`,`.dplayer-subtitle {
    position: absolute;
    bottom: 40px;
    width: 90%;
    left: 5%;
    text-align: center;
    color: #fff;
    text-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
    font-size: 20px;
    &.dplayer-subtitle-hide {
        display: none;
    }
}`,`.dplayer-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: none;
    &.dplayer-mask-show {
        display: block;
    }
}

.dplayer-video-wrap {
    position: relative;
    background: #000;
    font-size: 0;
    width: 100%;
    height: 100%;
    .dplayer-video {
        width: 100%;
        height: 100%;
        display: none;
    }
    .dplayer-video-current {
        display: block;
    }
    .dplayer-video-prepare {
        display: none;
    }
}`,`.dplayer-info-panel {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 400px;
    background: rgba(28, 28, 28, 0.8);
    padding: 10px;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;

    &-hide {
        display: none;
    }

    .dplayer-info-panel-close {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .dplayer-info-panel-item {
        & > span {
            display: inline-block;
            vertical-align: middle;
            line-height: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    .dplayer-info-panel-item-title {
        width: 100px;
        text-align: right;
        margin-right: 10px;
    }
    
    .dplayer-info-panel-item-data {
        width: 260px;
    }
}`],sourceRoot:""}]);const T=L},856:A=>{var p=[];function u(s){for(var l=-1,f=0;f<p.length;f++)if(p[f].identifier===s){l=f;break}return l}function h(s,l){for(var f={},v=[],y=0;y<s.length;y++){var w=s[y],L=l.base?w[0]+l.base:w[0],C=f[L]||0,T="".concat(L," ").concat(C);f[L]=C+1;var S=u(T),j={css:w[1],media:w[2],sourceMap:w[3],supports:w[4],layer:w[5]};if(S!==-1)p[S].references++,p[S].updater(j);else{var g=m(j,l);l.byIndex=y,p.splice(y,0,{identifier:T,updater:g,references:1})}v.push(T)}return v}function m(s,l){var f=l.domAPI(l);return f.update(s),function(v){if(v){if(v.css===s.css&&v.media===s.media&&v.sourceMap===s.sourceMap&&v.supports===s.supports&&v.layer===s.layer)return;f.update(s=v)}else f.remove()}}A.exports=function(s,l){var f=h(s=s||[],l=l||{});return function(v){v=v||[];for(var y=0;y<f.length;y++){var w=u(f[y]);p[w].references--}for(var L=h(v,l),C=0;C<f.length;C++){var T=u(f[C]);p[T].references===0&&(p[T].updater(),p.splice(T,1))}f=L}}},370:A=>{var p={};A.exports=function(u,h){var m=function(s){if(p[s]===void 0){var l=document.querySelector(s);if(window.HTMLIFrameElement&&l instanceof window.HTMLIFrameElement)try{l=l.contentDocument.head}catch{l=null}p[s]=l}return p[s]}(u);if(!m)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");m.appendChild(h)}},278:A=>{A.exports=function(p){var u=document.createElement("style");return p.setAttributes(u,p.attributes),p.insert(u,p.options),u}},458:(A,p,u)=>{A.exports=function(h){var m=u.nc;m&&h.setAttribute("nonce",m)}},470:A=>{A.exports=function(p){var u=p.insertStyleElement(p);return{update:function(h){(function(m,s,l){var f="";l.supports&&(f+="@supports (".concat(l.supports,") {")),l.media&&(f+="@media ".concat(l.media," {"));var v=l.layer!==void 0;v&&(f+="@layer".concat(l.layer.length>0?" ".concat(l.layer):""," {")),f+=l.css,v&&(f+="}"),l.media&&(f+="}"),l.supports&&(f+="}");var y=l.sourceMap;y&&typeof btoa<"u"&&(f+=`
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(y))))," */")),s.styleTagTransform(f,m,s.options)})(u,p,h)},remove:function(){(function(h){if(h.parentNode===null)return!1;h.parentNode.removeChild(h)})(u)}}}},488:A=>{A.exports=function(p,u){if(u.styleSheet)u.styleSheet.cssText=p;else{for(;u.firstChild;)u.removeChild(u.firstChild);u.appendChild(document.createTextNode(p))}}},251:A=>{A.exports='<svg viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg"><path d="M288 90v96c0 20-16 36-36 36h-10c-16 0-16-24 0-24h10c7 0 12-5 12-12V90c0-7-5-12-12-12H36c-7 0-12 5-12 12v96c0 7 5 12 12 12h10c16 0 16 24 0 24H36c-20 0-36-16-36-36V90c0-20 16-36 36-36h216c20 0 36 16 36 36zm-120 62l48 68c14 20 1 38-20 38H92c-21 0-34-18-20-38l48-68c13-18 35-18 48 0z"></path></svg>'},113:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M16 23c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zM16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zM27 28h-22c-1.654 0-3-1.346-3-3v-16c0-1.654 1.346-3 3-3h3c0.552 0 1 0.448 1 1s-0.448 1-1 1h-3c-0.551 0-1 0.449-1 1v16c0 0.552 0.449 1 1 1h22c0.552 0 1-0.448 1-1v-16c0-0.551-0.448-1-1-1h-11c-0.552 0-1-0.448-1-1s0.448-1 1-1h11c1.654 0 3 1.346 3 3v16c0 1.654-1.346 3-3 3zM24 10.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5zM15 4c0 0.552-0.448 1-1 1h-4c-0.552 0-1-0.448-1-1v0c0-0.552 0.448-1 1-1h4c0.552 0 1 0.448 1 1v0z"></path></svg>'},193:A=>{A.exports='<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="chromecast" class="svg-inline--fa fa-chromecast fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M447.8,64H64c-23.6,0-42.7,19.1-42.7,42.7v63.9H64v-63.9h383.8v298.6H298.6V448H448c23.6,0,42.7-19.1,42.7-42.7V106.7 C490.7,83.1,471.4,64,447.8,64z M21.3,383.6L21.3,383.6l0,63.9h63.9C85.2,412.2,56.6,383.6,21.3,383.6L21.3,383.6z M21.3,298.6V341 c58.9,0,106.6,48.1,106.6,107h42.7C170.7,365.6,103.7,298.7,21.3,298.6z M213.4,448h42.7c-0.5-129.5-105.3-234.3-234.8-234.6l0,42.4 C127.3,255.6,213.3,342,213.4,448z"></path></svg>'},338:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.090 0.131h-22.731c-2.354 0-4.262 1.839-4.262 4.109v16.401c0 2.269 1.908 4.109 4.262 4.109h4.262v-2.706h8.469l-8.853 8.135 1.579 1.451 7.487-6.88h9.787c2.353 0 4.262-1.84 4.262-4.109v-16.401c0-2.27-1.909-4.109-4.262-4.109v0zM28.511 19.304c0 1.512-1.272 2.738-2.841 2.738h-8.425l-0.076-0.070-0.076 0.070h-11.311c-1.569 0-2.841-1.226-2.841-2.738v-13.696c0-1.513 1.272-2.739 2.841-2.739h19.889c1.569 0 2.841-0.142 2.841 1.37v15.064z"></path></svg>'},807:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M27.128 0.38h-22.553c-2.336 0-4.229 1.825-4.229 4.076v16.273c0 2.251 1.893 4.076 4.229 4.076h4.229v-2.685h8.403l-8.784 8.072 1.566 1.44 7.429-6.827h9.71c2.335 0 4.229-1.825 4.229-4.076v-16.273c0-2.252-1.894-4.076-4.229-4.076zM28.538 19.403c0 1.5-1.262 2.717-2.819 2.717h-8.36l-0.076-0.070-0.076 0.070h-11.223c-1.557 0-2.819-1.217-2.819-2.717v-13.589c0-1.501 1.262-2.718 2.819-2.718h19.734c1.557 0 2.819-0.141 2.819 1.359v14.947zM9.206 10.557c-1.222 0-2.215 0.911-2.215 2.036s0.992 2.035 2.215 2.035c1.224 0 2.216-0.911 2.216-2.035s-0.992-2.036-2.216-2.036zM22.496 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.224 0 2.215-0.911 2.215-2.035s-0.991-2.036-2.215-2.036zM15.852 10.557c-1.224 0-2.215 0.911-2.215 2.036s0.991 2.035 2.215 2.035c1.222 0 2.215-0.911 2.215-2.035s-0.992-2.036-2.215-2.036z"></path></svg>'},300:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z"></path></svg>'},574:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 33"><path d="M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z"></path></svg>'},182:A=>{A.exports='<svg version="1.1" viewBox="0 0 22 22"><svg x="7" y="1"><circle class="diplayer-loading-dot diplayer-loading-dot-0" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-1" cx="4" cy="4" r="2"></circle></svg><svg x="13" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-2" cx="4" cy="4" r="2"></circle></svg><svg x="11" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-3" cx="4" cy="4" r="2"></circle></svg><svg x="7" y="13"><circle class="diplayer-loading-dot diplayer-loading-dot-4" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="11"><circle class="diplayer-loading-dot diplayer-loading-dot-5" cx="4" cy="4" r="2"></circle></svg><svg x="1" y="7"><circle class="diplayer-loading-dot diplayer-loading-dot-6" cx="4" cy="4" r="2"></circle></svg><svg x="3" y="3"><circle class="diplayer-loading-dot diplayer-loading-dot-7" cx="4" cy="4" r="2"></circle></svg></svg>'},965:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M19.357 2.88c1.749 0 3.366 0.316 4.851 0.946 1.485 0.632 2.768 1.474 3.845 2.533s1.922 2.279 2.532 3.661c0.611 1.383 0.915 2.829 0.915 4.334 0 1.425-0.304 2.847-0.915 4.271-0.611 1.425-1.587 2.767-2.928 4.028-0.855 0.813-1.811 1.607-2.869 2.38s-2.136 1.465-3.233 2.075c-1.099 0.61-2.198 1.098-3.296 1.465-1.098 0.366-2.115 0.549-3.051 0.549-1.343 0-2.441-0.438-3.296-1.311-0.854-0.876-1.281-2.41-1.281-4.608 0-0.366 0.020-0.773 0.060-1.221s0.062-0.895 0.062-1.343c0-0.773-0.183-1.353-0.55-1.738-0.366-0.387-0.793-0.58-1.281-0.58-0.652 0-1.21 0.295-1.678 0.886s-0.926 1.23-1.373 1.921c-0.447 0.693-0.905 1.334-1.372 1.923s-1.028 0.886-1.679 0.886c-0.529 0-1.048-0.427-1.556-1.282s-0.763-2.259-0.763-4.212c0-2.197 0.529-4.241 1.587-6.133s2.462-3.529 4.21-4.912c1.75-1.383 3.762-2.471 6.041-3.264 2.277-0.796 4.617-1.212 7.018-1.253zM7.334 15.817c0.569 0 1.047-0.204 1.434-0.611s0.579-0.875 0.579-1.404c0-0.569-0.193-1.047-0.579-1.434s-0.864-0.579-1.434-0.579c-0.529 0-0.987 0.193-1.373 0.579s-0.58 0.864-0.58 1.434c0 0.53 0.194 0.998 0.58 1.404 0.388 0.407 0.845 0.611 1.373 0.611zM12.216 11.79c0.691 0 1.292-0.254 1.8-0.763s0.762-1.107 0.762-1.8c0-0.732-0.255-1.343-0.762-1.831-0.509-0.489-1.109-0.732-1.8-0.732-0.732 0-1.342 0.244-1.831 0.732-0.488 0.488-0.732 1.098-0.732 1.831 0 0.693 0.244 1.292 0.732 1.8s1.099 0.763 1.831 0.763zM16.366 25.947c0.692 0 1.282-0.214 1.77-0.64s0.732-0.987 0.732-1.678-0.244-1.261-0.732-1.709c-0.489-0.448-1.078-0.671-1.77-0.671-0.65 0-1.21 0.223-1.678 0.671s-0.702 1.018-0.702 1.709c0 0.692 0.234 1.25 0.702 1.678s1.027 0.64 1.678 0.64zM19.113 9.592c0.651 0 1.129-0.203 1.433-0.611 0.305-0.406 0.459-0.874 0.459-1.404 0-0.488-0.154-0.947-0.459-1.373-0.304-0.427-0.782-0.641-1.433-0.641-0.529 0-1.008 0.193-1.434 0.58s-0.64 0.865-0.64 1.434c0 0.571 0.213 1.049 0.64 1.434 0.427 0.389 0.905 0.581 1.434 0.581zM24.848 12.826c0.57 0 1.067-0.213 1.495-0.64 0.427-0.427 0.64-0.947 0.64-1.556 0-0.57-0.214-1.068-0.64-1.495-0.428-0.427-0.927-0.64-1.495-0.64-0.611 0-1.129 0.213-1.555 0.64-0.428 0.427-0.642 0.926-0.642 1.495 0 0.611 0.213 1.129 0.642 1.556s0.947 0.64 1.555 0.64z"></path></svg>'},74:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 17 32"><path d="M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z"></path></svg>'},730:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg>'},428:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z"></path></svg>'},254:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M13.725 30l3.9-5.325-3.9-1.125v6.45zM0 17.5l11.050 3.35 13.6-11.55-10.55 12.425 11.8 3.65 6.1-23.375-32 15.5z"></path></svg>'},934:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 28"><path d="M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z"></path></svg>'},410:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32"><path d="M26.667 5.333h-21.333c-0 0-0.001 0-0.001 0-1.472 0-2.666 1.194-2.666 2.666 0 0 0 0.001 0 0.001v-0 16c0 0 0 0.001 0 0.001 0 1.472 1.194 2.666 2.666 2.666 0 0 0.001 0 0.001 0h21.333c0 0 0.001 0 0.001 0 1.472 0 2.666-1.194 2.666-2.666 0-0 0-0.001 0-0.001v0-16c0-0 0-0.001 0-0.001 0-1.472-1.194-2.666-2.666-2.666-0 0-0.001 0-0.001 0h0zM5.333 16h5.333v2.667h-5.333v-2.667zM18.667 24h-13.333v-2.667h13.333v2.667zM26.667 24h-5.333v-2.667h5.333v2.667zM26.667 18.667h-13.333v-2.667h13.333v2.667z"></path></svg>'},644:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z"></path></svg>'},324:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path></svg>'},437:A=>{A.exports='<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32"><path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z"></path></svg>'},897:(A,p,u)=>{var h=typeof self<"u"?self:typeof window<"u"?window:u.g!==void 0?u.g:{},m=Object.create(h),s=/["&'<>]/;function l(f){return typeof f!="string"&&(f=f==null?"":typeof f=="function"?l(f.call(f)):JSON.stringify(f)),f}m.$escape=function(f){return function(v){var y=""+v,w=s.exec(y);if(!w)return v;var L="",C=void 0,T=void 0,S=void 0;for(C=w.index,T=0;C<y.length;C++){switch(y.charCodeAt(C)){case 34:S="&#34;";break;case 38:S="&#38;";break;case 39:S="&#39;";break;case 60:S="&#60;";break;case 62:S="&#62;";break;default:continue}T!==C&&(L+=y.substring(T,C)),T=C+1,L+=S}return T!==C?L+y.substring(T,C):L}(l(f))},m.$each=function(f,v){if(Array.isArray(f))for(var y=0,w=f.length;y<w;y++)v(f[y],y);else for(var L in f)v(f[L],L)},A.exports=m},471:(A,p,u)=>{A.exports=u(897)},352:A=>{A.exports=function(p){var u=[];return u.toString=function(){return this.map(function(h){var m="",s=h[5]!==void 0;return h[4]&&(m+="@supports (".concat(h[4],") {")),h[2]&&(m+="@media ".concat(h[2]," {")),s&&(m+="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {")),m+=p(h),s&&(m+="}"),h[2]&&(m+="}"),h[4]&&(m+="}"),m}).join("")},u.i=function(h,m,s,l,f){typeof h=="string"&&(h=[[null,h,void 0]]);var v={};if(s)for(var y=0;y<this.length;y++){var w=this[y][0];w!=null&&(v[w]=!0)}for(var L=0;L<h.length;L++){var C=[].concat(h[L]);s&&v[C[0]]||(f!==void 0&&(C[5]===void 0||(C[1]="@layer".concat(C[5].length>0?" ".concat(C[5]):""," {").concat(C[1],"}")),C[5]=f),m&&(C[2]&&(C[1]="@media ".concat(C[2]," {").concat(C[1],"}")),C[2]=m),l&&(C[4]?(C[1]="@supports (".concat(C[4],") {").concat(C[1],"}"),C[4]=l):C[4]="".concat(l)),u.push(C))}},u}},80:A=>{A.exports=function(p,u){return u||(u={}),p&&(p=String(p.__esModule?p.default:p),/^['"].*['"]$/.test(p)&&(p=p.slice(1,-1)),u.hash&&(p+=u.hash),/["'() \t\n]|(%20)/.test(p)||u.needQuotes?'"'.concat(p.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):p)}},415:A=>{A.exports=function(p){var u=p[1],h=p[3];if(!h)return u;if(typeof btoa=="function"){var m=btoa(unescape(encodeURIComponent(JSON.stringify(h)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(m),l="/*# ".concat(s," */");return[u].concat([l]).join(`
`)}return[u].join(`
`)}},937:A=>{function p(u){return p=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(h){return typeof h}:function(h){return h&&typeof Symbol=="function"&&h.constructor===Symbol&&h!==Symbol.prototype?"symbol":typeof h},p(u)}A.exports=(typeof self>"u"?"undefined":p(self))=="object"?self.FormData:window.FormData},831:A=>{A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg=="}},I={};function b(A){var p=I[A];if(p!==void 0)return p.exports;var u=I[A]={id:A,exports:{}};return M[A](u,u.exports,b),u.exports}b.m=M,b.n=A=>{var p=A&&A.__esModule?()=>A.default:()=>A;return b.d(p,{a:p}),p},b.d=(A,p)=>{for(var u in p)b.o(p,u)&&!b.o(A,u)&&Object.defineProperty(A,u,{enumerable:!0,get:p[u]})},b.g=function(){if(typeof globalThis=="object")return globalThis;try{return this||new Function("return this")()}catch{if(typeof window=="object")return window}}(),b.o=(A,p)=>Object.prototype.hasOwnProperty.call(A,p),b.b=document.baseURI||self.location.href,b.nc=void 0;var k={};return(()=>{b.d(k,{default:()=>Ho});var A=b(856),p=b.n(A),u=b(470),h=b.n(u),m=b(370),s=b.n(m),l=b(458),f=b.n(l),v=b(278),y=b.n(v),w=b(488),L=b.n(w),C=b(685),T={};T.styleTagTransform=L(),T.setAttributes=f(),T.insert=s().bind(null,"head"),T.domAPI=h(),T.insertStyleElement=y(),p()(C.Z,T),C.Z&&C.Z.locals&&C.Z.locals;function S(n){return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(n)}function j(n,t){this.name="AggregateError",this.errors=n,this.message=t||""}j.prototype=Error.prototype;function g(n){return g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(n)}var D=setTimeout;function N(n){return!!(n&&n.length!==void 0)}function H(){}function Q(n){if(!(this instanceof Q))throw new TypeError("Promises must be constructed via new");if(typeof n!="function")throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],zn(n,this)}function qn(n,t){for(;n._state===3;)n=n._value;n._state!==0?(n._handled=!0,Q._immediateFn(function(){var r=n._state===1?t.onFulfilled:t.onRejected;if(r!==null){var e;try{e=r(n._value)}catch(a){return void fe(t.promise,a)}pn(t.promise,e)}else(n._state===1?pn:fe)(t.promise,n._value)})):n._deferreds.push(t)}function pn(n,t){try{if(t===n)throw new TypeError("A promise cannot be resolved with itself.");if(t&&(g(t)==="object"||typeof t=="function")){var r=t.then;if(t instanceof Q)return n._state=3,n._value=t,void dn(n);if(typeof r=="function")return void zn((e=r,a=t,function(){e.apply(a,arguments)}),n)}n._state=1,n._value=t,dn(n)}catch(o){fe(n,o)}var e,a}function fe(n,t){n._state=2,n._value=t,dn(n)}function dn(n){n._state===2&&n._deferreds.length===0&&Q._immediateFn(function(){n._handled||Q._unhandledRejectionFn(n._value)});for(var t=0,r=n._deferreds.length;t<r;t++)qn(n,n._deferreds[t]);n._deferreds=null}function Tt(n,t,r){this.onFulfilled=typeof n=="function"?n:null,this.onRejected=typeof t=="function"?t:null,this.promise=r}function zn(n,t){var r=!1;try{n(function(e){r||(r=!0,pn(t,e))},function(e){r||(r=!0,fe(t,e))})}catch(e){if(r)return;r=!0,fe(t,e)}}Q.prototype.catch=function(n){return this.then(null,n)},Q.prototype.then=function(n,t){var r=new this.constructor(H);return qn(this,new Tt(n,t,r)),r},Q.prototype.finally=function(n){var t=this.constructor;return this.then(function(r){return t.resolve(n()).then(function(){return r})},function(r){return t.resolve(n()).then(function(){return t.reject(r)})})},Q.all=function(n){return new Q(function(t,r){if(!N(n))return r(new TypeError("Promise.all accepts an array"));var e=Array.prototype.slice.call(n);if(e.length===0)return t([]);var a=e.length;function o(d,c){try{if(c&&(g(c)==="object"||typeof c=="function")){var x=c.then;if(typeof x=="function")return void x.call(c,function(E){o(d,E)},r)}e[d]=c,--a==0&&t(e)}catch(E){r(E)}}for(var i=0;i<e.length;i++)o(i,e[i])})},Q.any=function(n){var t=this;return new t(function(r,e){if(!n||n.length===void 0)return e(new TypeError("Promise.any accepts an array"));var a=Array.prototype.slice.call(n);if(a.length===0)return e();for(var o=[],i=0;i<a.length;i++)try{t.resolve(a[i]).then(r).catch(function(d){o.push(d),o.length===a.length&&e(new j(o,"All promises were rejected"))})}catch(d){e(d)}})},Q.allSettled=function(n){return new this(function(t,r){if(!n||n.length===void 0)return r(new TypeError(S(n)+" "+n+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var e=Array.prototype.slice.call(n);if(e.length===0)return t([]);var a=e.length;function o(d,c){if(c&&(S(c)==="object"||typeof c=="function")){var x=c.then;if(typeof x=="function")return void x.call(c,function(E){o(d,E)},function(E){e[d]={status:"rejected",reason:E},--a==0&&t(e)})}e[d]={status:"fulfilled",value:c},--a==0&&t(e)}for(var i=0;i<e.length;i++)o(i,e[i])})},Q.resolve=function(n){return n&&g(n)==="object"&&n.constructor===Q?n:new Q(function(t){t(n)})},Q.reject=function(n){return new Q(function(t,r){r(n)})},Q.race=function(n){return new Q(function(t,r){if(!N(n))return r(new TypeError("Promise.race accepts an array"));for(var e=0,a=n.length;e<a;e++)Q.resolve(n[e]).then(t,r)})},Q._immediateFn=typeof setImmediate=="function"&&function(n){setImmediate(n)}||function(n){D(n,0)},Q._unhandledRejectionFn=function(n){typeof console<"u"&&console&&console.warn("Possible Unhandled Promise Rejection:",n)};const qt=Q;var We=/mobile/i.test(window.navigator.userAgent);const F={secondToTime:function(n){if((n=n||0)===0||n===1/0||n.toString()==="NaN")return"00:00";var t=Math.floor(n/3600),r=Math.floor((n-3600*t)/60),e=Math.floor(n-3600*t-60*r);return(t>0?[t,r,e]:[r,e]).map(function(a){return a<10?"0"+a:""+a}).join(":")},getElementViewLeft:function(n){var t=n.offsetLeft,r=n.offsetParent,e=document.body.scrollLeft+document.documentElement.scrollLeft;if(document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement)for(;r!==null&&r!==n;)t+=r.offsetLeft,r=r.offsetParent;else for(;r!==null;)t+=r.offsetLeft,r=r.offsetParent;return t-e},getBoundingClientRectViewLeft:function(n){var t=window.scrollY||window.pageYOffset||document.body.scrollTop+(document.documentElement&&document.documentElement.scrollTop||0);if(n.getBoundingClientRect){if(typeof this.getBoundingClientRectViewLeft.offset!="number"){var r=document.createElement("div");r.style.cssText="position:absolute;top:0;left:0;",document.body.appendChild(r),this.getBoundingClientRectViewLeft.offset=-r.getBoundingClientRect().top-t,document.body.removeChild(r),r=null}var e=n.getBoundingClientRect(),a=this.getBoundingClientRectViewLeft.offset;return e.left+a}return this.getElementViewLeft(n)},getScrollPosition:function(){return{left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}},setScrollPosition:function(n){var t=n.left,r=t===void 0?0:t,e=n.top,a=e===void 0?0:e;this.isFirefox?(document.documentElement.scrollLeft=r,document.documentElement.scrollTop=a):window.scrollTo(r,a)},isMobile:We,isFirefox:/firefox/i.test(window.navigator.userAgent),isChrome:/chrome/i.test(window.navigator.userAgent),isSafari:/safari/i.test(window.navigator.userAgent),storage:{set:function(n,t){localStorage.setItem(n,t)},get:function(n){return localStorage.getItem(n)}},nameMap:{dragStart:We?"touchstart":"mousedown",dragMove:We?"touchmove":"mousemove",dragEnd:We?"touchend":"mouseup"},color2Number:function(n){return n[0]==="#"&&(n=n.substr(1)),n.length===3&&(n="".concat(n[0]).concat(n[0]).concat(n[1]).concat(n[1]).concat(n[2]).concat(n[2])),parseInt(n,16)+0&16777215},number2Color:function(n){return"#"+("00000"+n.toString(16)).slice(-6)},number2Type:function(n){switch(n){case 0:default:return"right";case 1:return"top";case 2:return"bottom"}}};function Mn(n,t){return function(){return n.apply(t,arguments)}}function be(n){return be=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},be(n)}var cn,On=Object.prototype.toString,un=Object.getPrototypeOf,yn=(cn=Object.create(null),function(n){var t=On.call(n);return cn[t]||(cn[t]=t.slice(8,-1).toLowerCase())}),te=function(n){return n=n.toLowerCase(),function(t){return yn(t)===n}},Qe=function(n){return function(t){return be(t)===n}},de=Array.isArray,ge=Qe("undefined"),jn=te("ArrayBuffer"),zt=Qe("string"),se=Qe("function"),Pn=Qe("number"),An=function(n){return n!==null&&be(n)==="object"},Ke=function(n){if(yn(n)!=="object")return!1;var t=un(n);return!(t!==null&&t!==Object.prototype&&Object.getPrototypeOf(t)!==null||Symbol.toStringTag in n||Symbol.iterator in n)},Mt=te("Date"),Ot=te("File"),jt=te("Blob"),Pt=te("FileList"),Dt=te("URLSearchParams");function ve(n,t){var r,e,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},o=a.allOwnKeys,i=o!==void 0&&o;if(n!=null)if(be(n)!=="object"&&(n=[n]),de(n))for(r=0,e=n.length;r<e;r++)t.call(null,n[r],r,n);else{var d,c=i?Object.getOwnPropertyNames(n):Object.keys(n),x=c.length;for(r=0;r<x;r++)d=c[r],t.call(null,n[d],d,n)}}function Dn(n,t){t=t.toLowerCase();for(var r,e=Object.keys(n),a=e.length;a-- >0;)if(t===(r=e[a]).toLowerCase())return r;return null}var hn,_n,Rn=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Uo,Fn=function(n){return!ge(n)&&n!==Rn},_t=(hn=typeof Uint8Array<"u"&&un(Uint8Array),function(n){return hn&&n instanceof hn}),Rt=te("HTMLFormElement"),Yn=(_n=Object.prototype.hasOwnProperty,function(n,t){return _n.call(n,t)}),Ft=te("RegExp"),Nn=function(n,t){var r=Object.getOwnPropertyDescriptors(n),e={};ve(r,function(a,o){t(a,o,n)!==!1&&(e[o]=a)}),Object.defineProperties(n,e)};const B={isArray:de,isArrayBuffer:jn,isBuffer:function(n){return n!==null&&!ge(n)&&n.constructor!==null&&!ge(n.constructor)&&se(n.constructor.isBuffer)&&n.constructor.isBuffer(n)},isFormData:function(n){var t="[object FormData]";return n&&(typeof FormData=="function"&&n instanceof FormData||On.call(n)===t||se(n.toString)&&n.toString()===t)},isArrayBufferView:function(n){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?ArrayBuffer.isView(n):n&&n.buffer&&jn(n.buffer)},isString:zt,isNumber:Pn,isBoolean:function(n){return n===!0||n===!1},isObject:An,isPlainObject:Ke,isUndefined:ge,isDate:Mt,isFile:Ot,isBlob:jt,isRegExp:Ft,isFunction:se,isStream:function(n){return An(n)&&se(n.pipe)},isURLSearchParams:Dt,isTypedArray:_t,isFileList:Pt,forEach:ve,merge:function n(){for(var t=Fn(this)&&this||{},r=t.caseless,e={},a=function(d,c){var x=r&&Dn(e,c)||c;Ke(e[x])&&Ke(d)?e[x]=n(e[x],d):Ke(d)?e[x]=n({},d):de(d)?e[x]=d.slice():e[x]=d},o=0,i=arguments.length;o<i;o++)arguments[o]&&ve(arguments[o],a);return e},extend:function(n,t,r){var e=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},a=e.allOwnKeys;return ve(t,function(o,i){r&&se(o)?n[i]=Mn(o,r):n[i]=o},{allOwnKeys:a}),n},trim:function(n){return n.trim?n.trim():n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},stripBOM:function(n){return n.charCodeAt(0)===65279&&(n=n.slice(1)),n},inherits:function(n,t,r,e){n.prototype=Object.create(t.prototype,e),n.prototype.constructor=n,Object.defineProperty(n,"super",{value:t.prototype}),r&&Object.assign(n.prototype,r)},toFlatObject:function(n,t,r,e){var a,o,i,d={};if(t=t||{},n==null)return t;do{for(o=(a=Object.getOwnPropertyNames(n)).length;o-- >0;)i=a[o],e&&!e(i,n,t)||d[i]||(t[i]=n[i],d[i]=!0);n=r!==!1&&un(n)}while(n&&(!r||r(n,t))&&n!==Object.prototype);return t},kindOf:yn,kindOfTest:te,endsWith:function(n,t,r){n=String(n),(r===void 0||r>n.length)&&(r=n.length),r-=t.length;var e=n.indexOf(t,r);return e!==-1&&e===r},toArray:function(n){if(!n)return null;if(de(n))return n;var t=n.length;if(!Pn(t))return null;for(var r=new Array(t);t-- >0;)r[t]=n[t];return r},forEachEntry:function(n,t){for(var r,e=(n&&n[Symbol.iterator]).call(n);(r=e.next())&&!r.done;){var a=r.value;t.call(n,a[0],a[1])}},matchAll:function(n,t){for(var r,e=[];(r=n.exec(t))!==null;)e.push(r);return e},isHTMLForm:Rt,hasOwnProperty:Yn,hasOwnProp:Yn,reduceDescriptors:Nn,freezeMethods:function(n){Nn(n,function(t,r){if(se(n)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;var e=n[r];se(e)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=function(){throw Error("Can not rewrite read-only method '"+r+"'")}))})},toObjectSet:function(n,t){var r={},e=function(a){a.forEach(function(o){r[o]=!0})};return de(n)?e(n):e(String(n).split(t)),r},toCamelCase:function(n){return n.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,function(t,r,e){return r.toUpperCase()+e})},noop:function(){},toFiniteNumber:function(n,t){return n=+n,Number.isFinite(n)?n:t},findKey:Dn,global:Rn,isContextDefined:Fn,toJSONObject:function(n){var t=new Array(10);return function r(e,a){if(An(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[a]=e;var o=de(e)?[]:{};return ve(e,function(i,d){var c=r(i,a+1);!ge(c)&&(o[d]=c)}),t[a]=void 0,o}}return e}(n,0)}};function ce(n,t,r,e,a){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=n,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),e&&(this.request=e),a&&(this.response=a)}B.inherits(ce,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:B.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Hn=ce.prototype,Un={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(function(n){Un[n]={value:n}}),Object.defineProperties(ce,Un),Object.defineProperty(Hn,"isAxiosError",{value:!0}),ce.from=function(n,t,r,e,a,o){var i=Object.create(Hn);return B.toFlatObject(n,i,function(d){return d!==Error.prototype},function(d){return d!=="isAxiosError"}),ce.call(i,n.message,t,r,e,a),i.cause=n,i.name=n.name,o&&Object.assign(i,o),i};const U=ce,Yt=b(937);function mn(n){return mn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},mn(n)}function fn(n){return B.isPlainObject(n)||B.isArray(n)}function Wn(n){return B.endsWith(n,"[]")?n.slice(0,-2):n}function Qn(n,t,r){return n?n.concat(t).map(function(e,a){return e=Wn(e),!r&&a?"["+e+"]":e}).join(r?".":""):t}var Nt=B.toFlatObject(B,{},null,function(n){return/^is[A-Z]/.test(n)});const Ve=function(n,t,r){if(!B.isObject(n))throw new TypeError("target must be an object");t=t||new(Yt||FormData);var e,a=(r=B.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(_,P){return!B.isUndefined(P[_])})).metaTokens,o=r.visitor||E,i=r.dots,d=r.indexes,c=(r.Blob||typeof Blob<"u"&&Blob)&&(e=t)&&B.isFunction(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator];if(!B.isFunction(o))throw new TypeError("visitor must be a function");function x(_){if(_===null)return"";if(B.isDate(_))return _.toISOString();if(!c&&B.isBlob(_))throw new U("Blob is not supported. Use a Buffer instead.");return B.isArrayBuffer(_)||B.isTypedArray(_)?c&&typeof Blob=="function"?new Blob([_]):Buffer.from(_):_}function E(_,P,z){var R=_;if(_&&!z&&mn(_)==="object"){if(B.endsWith(P,"{}"))P=a?P:P.slice(0,-2),_=JSON.stringify(_);else if(B.isArray(_)&&function(Y){return B.isArray(Y)&&!Y.some(fn)}(_)||B.isFileList(_)||B.endsWith(P,"[]")&&(R=B.toArray(_)))return P=Wn(P),R.forEach(function(Y,X){!B.isUndefined(Y)&&Y!==null&&t.append(d===!0?Qn([P],X,i):d===null?P:P+"[]",x(Y))}),!1}return!!fn(_)||(t.append(Qn(z,P,i),x(_)),!1)}var q=[],O=Object.assign(Nt,{defaultVisitor:E,convertValue:x,isVisitable:fn});if(!B.isObject(n))throw new TypeError("data must be an object");return function _(P,z){if(!B.isUndefined(P)){if(q.indexOf(P)!==-1)throw Error("Circular reference detected in "+z.join("."));q.push(P),B.forEach(P,function(R,Y){(!(B.isUndefined(R)||R===null)&&o.call(t,R,B.isString(Y)?Y.trim():Y,z,O))===!0&&_(R,z?z.concat(Y):[Y])}),q.pop()}}(n),t};function Kn(n){var t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function Vn(n,t){this._pairs=[],n&&Ve(n,this,t)}var Zn=Vn.prototype;Zn.append=function(n,t){this._pairs.push([n,t])},Zn.toString=function(n){var t=n?function(r){return n.call(this,r,Kn)}:Kn;return this._pairs.map(function(r){return t(r[0])+"="+t(r[1])},"").join("&")};const Xn=Vn;function Ht(n){return encodeURIComponent(n).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Jn(n,t,r){if(!t)return n;var e,a=r&&r.encode||Ht,o=r&&r.serialize;if(e=o?o(t,r):B.isURLSearchParams(t)?t.toString():new Xn(t,r).toString(a)){var i=n.indexOf("#");i!==-1&&(n=n.slice(0,i)),n+=(n.indexOf("?")===-1?"?":"&")+e}return n}function xe(n){return xe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},xe(n)}function Ut(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(xe(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(xe(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),xe(a)==="symbol"?a:String(a)),e)}var a}var Wt=function(){function n(){(function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")})(this,n),this.handlers=[]}var t,r;return t=n,r=[{key:"use",value:function(e,a,o){return this.handlers.push({fulfilled:e,rejected:a,synchronous:!!o&&o.synchronous,runWhen:o?o.runWhen:null}),this.handlers.length-1}},{key:"eject",value:function(e){this.handlers[e]&&(this.handlers[e]=null)}},{key:"clear",value:function(){this.handlers&&(this.handlers=[])}},{key:"forEach",value:function(e){B.forEach(this.handlers,function(a){a!==null&&e(a)})}}],r&&Ut(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const $n=Wt,Gn={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Qt=typeof URLSearchParams<"u"?URLSearchParams:Xn,Kt=FormData;var bn,Vt=(typeof navigator>"u"||(bn=navigator.product)!=="ReactNative"&&bn!=="NativeScript"&&bn!=="NS")&&typeof window<"u"&&typeof document<"u",Zt=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function";const ne={isBrowser:!0,classes:{URLSearchParams:Qt,FormData:Kt,Blob},isStandardBrowserEnv:Vt,isStandardBrowserWebWorkerEnv:Zt,protocols:["http","https","file","blob","url","data"]},et=function(n){function t(e,a,o,i){var d=e[i++],c=Number.isFinite(+d),x=i>=e.length;return d=!d&&B.isArray(o)?o.length:d,x?(B.hasOwnProp(o,d)?o[d]=[o[d],a]:o[d]=a,!c):(o[d]&&B.isObject(o[d])||(o[d]=[]),t(e,a,o[d],i)&&B.isArray(o[d])&&(o[d]=function(E){var q,O,_={},P=Object.keys(E),z=P.length;for(q=0;q<z;q++)_[O=P[q]]=E[O];return _}(o[d])),!c)}if(B.isFormData(n)&&B.isFunction(n.entries)){var r={};return B.forEachEntry(n,function(e,a){t(function(o){return B.matchAll(/\w+|\[(\w*)]/g,o).map(function(i){return i[0]==="[]"?"":i[1]||i[0]})}(e),a,r,0)}),r}return null};var Xt={"Content-Type":void 0},Ze={transitional:Gn,adapter:["xhr","http"],transformRequest:[function(n,t){var r,e=t.getContentType()||"",a=e.indexOf("application/json")>-1,o=B.isObject(n);if(o&&B.isHTMLForm(n)&&(n=new FormData(n)),B.isFormData(n))return a&&a?JSON.stringify(et(n)):n;if(B.isArrayBuffer(n)||B.isBuffer(n)||B.isStream(n)||B.isFile(n)||B.isBlob(n))return n;if(B.isArrayBufferView(n))return n.buffer;if(B.isURLSearchParams(n))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),n.toString();if(o){if(e.indexOf("application/x-www-form-urlencoded")>-1)return function(d,c){return Ve(d,new ne.classes.URLSearchParams,Object.assign({visitor:function(x,E,q,O){return ne.isNode&&B.isBuffer(x)?(this.append(E,x.toString("base64")),!1):O.defaultVisitor.apply(this,arguments)}},c))}(n,this.formSerializer).toString();if((r=B.isFileList(n))||e.indexOf("multipart/form-data")>-1){var i=this.env&&this.env.FormData;return Ve(r?{"files[]":n}:n,i&&new i,this.formSerializer)}}return o||a?(t.setContentType("application/json",!1),function(d,c,x){if(B.isString(d))try{return(0,JSON.parse)(d),B.trim(d)}catch(E){if(E.name!=="SyntaxError")throw E}return(0,JSON.stringify)(d)}(n)):n}],transformResponse:[function(n){var t=this.transitional||Ze.transitional,r=t&&t.forcedJSONParsing,e=this.responseType==="json";if(n&&B.isString(n)&&(r&&!this.responseType||e)){var a=!(t&&t.silentJSONParsing)&&e;try{return JSON.parse(n)}catch(o){if(a)throw o.name==="SyntaxError"?U.from(o,U.ERR_BAD_RESPONSE,this,null,this.response):o}}return n}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ne.classes.FormData,Blob:ne.classes.Blob},validateStatus:function(n){return n>=200&&n<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};B.forEach(["delete","get","head"],function(n){Ze.headers[n]={}}),B.forEach(["post","put","patch"],function(n){Ze.headers[n]=B.merge(Xt)});const gn=Ze;var Jt=B.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]);function we(n){return we=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},we(n)}function nt(n,t){(t==null||t>n.length)&&(t=n.length);for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r];return e}function tt(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(we(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(we(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),we(a)==="symbol"?a:String(a)),e)}var a}var at=Symbol("internals");function Ee(n){return n&&String(n).trim().toLowerCase()}function Xe(n){return n===!1||n==null?n:B.isArray(n)?n.map(Xe):String(n)}function ot(n,t,r,e){return B.isFunction(e)?e.call(this,t,r):B.isString(t)?B.isString(e)?t.indexOf(e)!==-1:B.isRegExp(e)?e.test(t):void 0:void 0}var Je=function(n,t){function r(i){(function(d,c){if(!(d instanceof c))throw new TypeError("Cannot call a class as a function")})(this,r),i&&this.set(i)}var e,a,o;return e=r,a=[{key:"set",value:function(i,d,c){var x=this;function E(Y,X,V){var W=Ee(X);if(!W)throw new Error("header name must be a non-empty string");var ie=B.findKey(x,W);(!ie||x[ie]===void 0||V===!0||V===void 0&&x[ie]!==!1)&&(x[ie||X]=Xe(Y))}var q,O,_,P,z,R=function(Y,X){return B.forEach(Y,function(V,W){return E(V,W,X)})};return B.isPlainObject(i)||i instanceof this.constructor?R(i,d):B.isString(i)&&(i=i.trim())&&!/^[-_a-zA-Z]+$/.test(i.trim())?R((z={},(q=i)&&q.split(`
`).forEach(function(Y){P=Y.indexOf(":"),O=Y.substring(0,P).trim().toLowerCase(),_=Y.substring(P+1).trim(),!O||z[O]&&Jt[O]||(O==="set-cookie"?z[O]?z[O].push(_):z[O]=[_]:z[O]=z[O]?z[O]+", "+_:_)}),z),d):i!=null&&E(d,i,c),this}},{key:"get",value:function(i,d){if(i=Ee(i)){var c=B.findKey(this,i);if(c){var x=this[c];if(!d)return x;if(d===!0)return function(E){for(var q,O=Object.create(null),_=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;q=_.exec(E);)O[q[1]]=q[2];return O}(x);if(B.isFunction(d))return d.call(this,x,c);if(B.isRegExp(d))return d.exec(x);throw new TypeError("parser must be boolean|regexp|function")}}}},{key:"has",value:function(i,d){if(i=Ee(i)){var c=B.findKey(this,i);return!(!c||d&&!ot(0,this[c],c,d))}return!1}},{key:"delete",value:function(i,d){var c=this,x=!1;function E(q){if(q=Ee(q)){var O=B.findKey(c,q);!O||d&&!ot(0,c[O],O,d)||(delete c[O],x=!0)}}return B.isArray(i)?i.forEach(E):E(i),x}},{key:"clear",value:function(){return Object.keys(this).forEach(this.delete.bind(this))}},{key:"normalize",value:function(i){var d=this,c={};return B.forEach(this,function(x,E){var q=B.findKey(c,E);if(q)return d[q]=Xe(x),void delete d[E];var O=i?function(_){return _.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,function(P,z,R){return z.toUpperCase()+R})}(E):String(E).trim();O!==E&&delete d[E],d[O]=Xe(x),c[O]=!0}),this}},{key:"concat",value:function(){for(var i,d=arguments.length,c=new Array(d),x=0;x<d;x++)c[x]=arguments[x];return(i=this.constructor).concat.apply(i,[this].concat(c))}},{key:"toJSON",value:function(i){var d=Object.create(null);return B.forEach(this,function(c,x){c!=null&&c!==!1&&(d[x]=i&&B.isArray(c)?c.join(", "):c)}),d}},{key:Symbol.iterator,value:function(){return Object.entries(this.toJSON())[Symbol.iterator]()}},{key:"toString",value:function(){return Object.entries(this.toJSON()).map(function(i){var d,c,x=(c=2,function(E){if(Array.isArray(E))return E}(d=i)||function(E,q){var O=E==null?null:typeof Symbol<"u"&&E[Symbol.iterator]||E["@@iterator"];if(O!=null){var _,P,z,R,Y=[],X=!0,V=!1;try{if(z=(O=O.call(E)).next,q===0){if(Object(O)!==O)return;X=!1}else for(;!(X=(_=z.call(O)).done)&&(Y.push(_.value),Y.length!==q);X=!0);}catch(W){V=!0,P=W}finally{try{if(!X&&O.return!=null&&(R=O.return(),Object(R)!==R))return}finally{if(V)throw P}}return Y}}(d,c)||function(E,q){if(E){if(typeof E=="string")return nt(E,q);var O=Object.prototype.toString.call(E).slice(8,-1);return O==="Object"&&E.constructor&&(O=E.constructor.name),O==="Map"||O==="Set"?Array.from(E):O==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(O)?nt(E,q):void 0}}(d,c)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}());return x[0]+": "+x[1]}).join(`
`)}},{key:Symbol.toStringTag,get:function(){return"AxiosHeaders"}}],o=[{key:"from",value:function(i){return i instanceof this?i:new this(i)}},{key:"concat",value:function(i){for(var d=new this(i),c=arguments.length,x=new Array(c>1?c-1:0),E=1;E<c;E++)x[E-1]=arguments[E];return x.forEach(function(q){return d.set(q)}),d}},{key:"accessor",value:function(i){var d=(this[at]=this[at]={accessors:{}}).accessors,c=this.prototype;function x(E){var q=Ee(E);d[q]||(function(O,_){var P=B.toCamelCase(" "+_);["get","set","has"].forEach(function(z){Object.defineProperty(O,z+P,{value:function(R,Y,X){return this[z].call(this,_,R,Y,X)},configurable:!0})})}(c,E),d[q]=!0)}return B.isArray(i)?i.forEach(x):x(i),this}}],a&&tt(e.prototype,a),o&&tt(e,o),Object.defineProperty(e,"prototype",{writable:!1}),r}();Je.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent"]),B.freezeMethods(Je.prototype),B.freezeMethods(Je);const ae=Je;function vn(n,t){var r=this||gn,e=t||r,a=ae.from(e.headers),o=e.data;return B.forEach(n,function(i){o=i.call(r,o,a.normalize(),t?t.status:void 0)}),a.normalize(),o}function rt(n){return!(!n||!n.__CANCEL__)}function it(n,t,r){U.call(this,n??"canceled",U.ERR_CANCELED,t,r),this.name="CanceledError"}B.inherits(it,U,{__CANCEL__:!0});const $e=it,$t=ne.isStandardBrowserEnv?{write:function(n,t,r,e,a,o){var i=[];i.push(n+"="+encodeURIComponent(t)),B.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),B.isString(e)&&i.push("path="+e),B.isString(a)&&i.push("domain="+a),o===!0&&i.push("secure"),document.cookie=i.join("; ")},read:function(n){var t=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function lt(n,t){return n&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(r,e){return e?r.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):r}(n,t):t}const Gt=ne.isStandardBrowserEnv?function(){var n,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function e(a){var o=a;return t&&(r.setAttribute("href",o),o=r.href),r.setAttribute("href",o),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:r.pathname.charAt(0)==="/"?r.pathname:"/"+r.pathname}}return n=e(window.location.href),function(a){var o=B.isString(a)?e(a):a;return o.protocol===n.protocol&&o.host===n.host}}():function(){return!0};function st(n,t){var r=0,e=function(a,o){a=a||10;var i,d=new Array(a),c=new Array(a),x=0,E=0;return o=o!==void 0?o:1e3,function(q){var O=Date.now(),_=c[E];i||(i=O),d[x]=q,c[x]=O;for(var P=E,z=0;P!==x;)z+=d[P++],P%=a;if((x=(x+1)%a)===E&&(E=(E+1)%a),!(O-i<o)){var R=_&&O-_;return R?Math.round(1e3*z/R):void 0}}}(50,250);return function(a){var o=a.loaded,i=a.lengthComputable?a.total:void 0,d=o-r,c=e(d);r=o;var x={loaded:o,total:i,progress:i?o/i:void 0,bytes:d,rate:c||void 0,estimated:c&&i&&o<=i?(i-o)/c:void 0,event:a};x[t?"download":"upload"]=!0,n(x)}}var xn={http:null,xhr:typeof XMLHttpRequest<"u"&&function(n){return new Promise(function(t,r){var e,a=n.data,o=ae.from(n.headers).normalize(),i=n.responseType;function d(){n.cancelToken&&n.cancelToken.unsubscribe(e),n.signal&&n.signal.removeEventListener("abort",e)}B.isFormData(a)&&(ne.isStandardBrowserEnv||ne.isStandardBrowserWebWorkerEnv)&&o.setContentType(!1);var c=new XMLHttpRequest;if(n.auth){var x=n.auth.username||"",E=n.auth.password?unescape(encodeURIComponent(n.auth.password)):"";o.set("Authorization","Basic "+btoa(x+":"+E))}var q=lt(n.baseURL,n.url);function O(){if(c){var R=ae.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders());(function(Y,X,V){var W=V.config.validateStatus;V.status&&W&&!W(V.status)?X(new U("Request failed with status code "+V.status,[U.ERR_BAD_REQUEST,U.ERR_BAD_RESPONSE][Math.floor(V.status/100)-4],V.config,V.request,V)):Y(V)})(function(Y){t(Y),d()},function(Y){r(Y),d()},{data:i&&i!=="text"&&i!=="json"?c.response:c.responseText,status:c.status,statusText:c.statusText,headers:R,config:n,request:c}),c=null}}if(c.open(n.method.toUpperCase(),Jn(q,n.params,n.paramsSerializer),!0),c.timeout=n.timeout,"onloadend"in c?c.onloadend=O:c.onreadystatechange=function(){c&&c.readyState===4&&(c.status!==0||c.responseURL&&c.responseURL.indexOf("file:")===0)&&setTimeout(O)},c.onabort=function(){c&&(r(new U("Request aborted",U.ECONNABORTED,n,c)),c=null)},c.onerror=function(){r(new U("Network Error",U.ERR_NETWORK,n,c)),c=null},c.ontimeout=function(){var R=n.timeout?"timeout of "+n.timeout+"ms exceeded":"timeout exceeded",Y=n.transitional||Gn;n.timeoutErrorMessage&&(R=n.timeoutErrorMessage),r(new U(R,Y.clarifyTimeoutError?U.ETIMEDOUT:U.ECONNABORTED,n,c)),c=null},ne.isStandardBrowserEnv){var _=(n.withCredentials||Gt(q))&&n.xsrfCookieName&&$t.read(n.xsrfCookieName);_&&o.set(n.xsrfHeaderName,_)}a===void 0&&o.setContentType(null),"setRequestHeader"in c&&B.forEach(o.toJSON(),function(R,Y){c.setRequestHeader(Y,R)}),B.isUndefined(n.withCredentials)||(c.withCredentials=!!n.withCredentials),i&&i!=="json"&&(c.responseType=n.responseType),typeof n.onDownloadProgress=="function"&&c.addEventListener("progress",st(n.onDownloadProgress,!0)),typeof n.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",st(n.onUploadProgress)),(n.cancelToken||n.signal)&&(e=function(R){c&&(r(!R||R.type?new $e(null,n,c):R),c.abort(),c=null)},n.cancelToken&&n.cancelToken.subscribe(e),n.signal&&(n.signal.aborted?e():n.signal.addEventListener("abort",e)));var P,z=(P=/^([-+\w]{1,25})(:?\/\/|:)/.exec(q))&&P[1]||"";z&&ne.protocols.indexOf(z)===-1?r(new U("Unsupported protocol "+z+":",U.ERR_BAD_REQUEST,n)):c.send(a||null)})}};B.forEach(xn,function(n,t){if(n){try{Object.defineProperty(n,"name",{value:t})}catch{}Object.defineProperty(n,"adapterName",{value:t})}});function wn(n){if(n.cancelToken&&n.cancelToken.throwIfRequested(),n.signal&&n.signal.aborted)throw new $e(null,n)}function pt(n){return wn(n),n.headers=ae.from(n.headers),n.data=vn.call(n,n.transformRequest),["post","put","patch"].indexOf(n.method)!==-1&&n.headers.setContentType("application/x-www-form-urlencoded",!1),function(t){for(var r,e,a=(t=B.isArray(t)?t:[t]).length,o=0;o<a&&(r=t[o],!(e=B.isString(r)?xn[r.toLowerCase()]:r));o++);if(!e)throw e===!1?new U("Adapter ".concat(r," is not supported by the environment"),"ERR_NOT_SUPPORT"):new Error(B.hasOwnProp(xn,r)?"Adapter '".concat(r,"' is not available in the build"):"Unknown adapter '".concat(r,"'"));if(!B.isFunction(e))throw new TypeError("adapter is not a function");return e}(n.adapter||gn.adapter)(n).then(function(t){return wn(n),t.data=vn.call(n,n.transformResponse,t),t.headers=ae.from(t.headers),t},function(t){return rt(t)||(wn(n),t&&t.response&&(t.response.data=vn.call(n,n.transformResponse,t.response),t.response.headers=ae.from(t.response.headers))),Promise.reject(t)})}var dt=function(n){return n instanceof ae?n.toJSON():n};function ue(n,t){t=t||{};var r={};function e(x,E,q){return B.isPlainObject(x)&&B.isPlainObject(E)?B.merge.call({caseless:q},x,E):B.isPlainObject(E)?B.merge({},E):B.isArray(E)?E.slice():E}function a(x,E,q){return B.isUndefined(E)?B.isUndefined(x)?void 0:e(void 0,x,q):e(x,E,q)}function o(x,E){if(!B.isUndefined(E))return e(void 0,E)}function i(x,E){return B.isUndefined(E)?B.isUndefined(x)?void 0:e(void 0,x):e(void 0,E)}function d(x,E,q){return q in t?e(x,E):q in n?e(void 0,x):void 0}var c={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:d,headers:function(x,E){return a(dt(x),dt(E),!0)}};return B.forEach(Object.keys(n).concat(Object.keys(t)),function(x){var E=c[x]||a,q=E(n[x],t[x],x);B.isUndefined(q)&&E!==d||(r[x]=q)}),r}function Ge(n){return Ge=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ge(n)}var En={};["object","boolean","number","function","string","symbol"].forEach(function(n,t){En[n]=function(r){return Ge(r)===n||"a"+(t<1?"n ":" ")+n}});var ct={};En.transitional=function(n,t,r){function e(a,o){return"[Axios v1.2.3] Transitional option '"+a+"'"+o+(r?". "+r:"")}return function(a,o,i){if(n===!1)throw new U(e(o," has been removed"+(t?" in "+t:"")),U.ERR_DEPRECATED);return t&&!ct[o]&&(ct[o]=!0,console.warn(e(o," has been deprecated since v"+t+" and will be removed in the near future"))),!n||n(a,o,i)}};const kn={assertOptions:function(n,t,r){if(Ge(n)!=="object")throw new U("options must be an object",U.ERR_BAD_OPTION_VALUE);for(var e=Object.keys(n),a=e.length;a-- >0;){var o=e[a],i=t[o];if(i){var d=n[o],c=d===void 0||i(d,o,n);if(c!==!0)throw new U("option "+o+" must be "+c,U.ERR_BAD_OPTION_VALUE)}else if(r!==!0)throw new U("Unknown option "+o,U.ERR_BAD_OPTION)}},validators:En};function ke(n){return ke=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ke(n)}function ea(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(ke(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(ke(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),ke(a)==="symbol"?a:String(a)),e)}var a}var oe=kn.validators,en=function(){function n(e){(function(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")})(this,n),this.defaults=e,this.interceptors={request:new $n,response:new $n}}var t,r;return t=n,(r=[{key:"request",value:function(e,a){typeof e=="string"?(a=a||{}).url=e:a=e||{};var o,i=a=ue(this.defaults,a),d=i.transitional,c=i.paramsSerializer,x=i.headers;d!==void 0&&kn.assertOptions(d,{silentJSONParsing:oe.transitional(oe.boolean),forcedJSONParsing:oe.transitional(oe.boolean),clarifyTimeoutError:oe.transitional(oe.boolean)},!1),c!==void 0&&kn.assertOptions(c,{encode:oe.function,serialize:oe.function},!0),a.method=(a.method||this.defaults.method||"get").toLowerCase(),(o=x&&B.merge(x.common,x[a.method]))&&B.forEach(["delete","get","head","post","put","patch","common"],function(W){delete x[W]}),a.headers=ae.concat(o,x);var E=[],q=!0;this.interceptors.request.forEach(function(W){typeof W.runWhen=="function"&&W.runWhen(a)===!1||(q=q&&W.synchronous,E.unshift(W.fulfilled,W.rejected))});var O,_=[];this.interceptors.response.forEach(function(W){_.push(W.fulfilled,W.rejected)});var P,z=0;if(!q){var R=[pt.bind(this),void 0];for(R.unshift.apply(R,E),R.push.apply(R,_),P=R.length,O=Promise.resolve(a);z<P;)O=O.then(R[z++],R[z++]);return O}P=E.length;var Y=a;for(z=0;z<P;){var X=E[z++],V=E[z++];try{Y=X(Y)}catch(W){V.call(this,W);break}}try{O=pt.call(this,Y)}catch(W){return Promise.reject(W)}for(z=0,P=_.length;z<P;)O=O.then(_[z++],_[z++]);return O}},{key:"getUri",value:function(e){return Jn(lt((e=ue(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}])&&ea(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();B.forEach(["delete","get","head","options"],function(n){en.prototype[n]=function(t,r){return this.request(ue(r||{},{method:n,url:t,data:(r||{}).data}))}}),B.forEach(["post","put","patch"],function(n){function t(r){return function(e,a,o){return this.request(ue(o||{},{method:n,headers:r?{"Content-Type":"multipart/form-data"}:{},url:e,data:a}))}}en.prototype[n]=t(),en.prototype[n+"Form"]=t(!0)});const nn=en;function Ce(n){return Ce=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ce(n)}function ut(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Ce(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Ce(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Ce(a)==="symbol"?a:String(a)),e)}var a}var na=function(){function n(a){if(function(d,c){if(!(d instanceof c))throw new TypeError("Cannot call a class as a function")}(this,n),typeof a!="function")throw new TypeError("executor must be a function.");var o;this.promise=new Promise(function(d){o=d});var i=this;this.promise.then(function(d){if(i._listeners){for(var c=i._listeners.length;c-- >0;)i._listeners[c](d);i._listeners=null}}),this.promise.then=function(d){var c,x=new Promise(function(E){i.subscribe(E),c=E}).then(d);return x.cancel=function(){i.unsubscribe(c)},x},a(function(d,c,x){i.reason||(i.reason=new $e(d,c,x),o(i.reason))})}var t,r,e;return t=n,r=[{key:"throwIfRequested",value:function(){if(this.reason)throw this.reason}},{key:"subscribe",value:function(a){this.reason?a(this.reason):this._listeners?this._listeners.push(a):this._listeners=[a]}},{key:"unsubscribe",value:function(a){if(this._listeners){var o=this._listeners.indexOf(a);o!==-1&&this._listeners.splice(o,1)}}}],e=[{key:"source",value:function(){var a;return{token:new n(function(o){a=o}),cancel:a}}}],r&&ut(t.prototype,r),e&&ut(t,e),Object.defineProperty(t,"prototype",{writable:!1}),n}();const ta=na;function yt(n,t){(t==null||t>n.length)&&(t=n.length);for(var r=0,e=new Array(t);r<t;r++)e[r]=n[r];return e}var Cn={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Cn).forEach(function(n){var t,r,e=(r=2,function(i){if(Array.isArray(i))return i}(t=n)||function(i,d){var c=i==null?null:typeof Symbol<"u"&&i[Symbol.iterator]||i["@@iterator"];if(c!=null){var x,E,q,O,_=[],P=!0,z=!1;try{if(q=(c=c.call(i)).next,d===0){if(Object(c)!==c)return;P=!1}else for(;!(P=(x=q.call(c)).done)&&(_.push(x.value),_.length!==d);P=!0);}catch(R){z=!0,E=R}finally{try{if(!P&&c.return!=null&&(O=c.return(),Object(O)!==O))return}finally{if(z)throw E}}return _}}(t,r)||function(i,d){if(i){if(typeof i=="string")return yt(i,d);var c=Object.prototype.toString.call(i).slice(8,-1);return c==="Object"&&i.constructor&&(c=i.constructor.name),c==="Map"||c==="Set"?Array.from(i):c==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?yt(i,d):void 0}}(t,r)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()),a=e[0],o=e[1];Cn[o]=a});const aa=Cn;var Z=function n(t){var r=new nn(t),e=Mn(nn.prototype.request,r);return B.extend(e,nn.prototype,r,{allOwnKeys:!0}),B.extend(e,r,null,{allOwnKeys:!0}),e.create=function(a){return n(ue(t,a))},e}(gn);Z.Axios=nn,Z.CanceledError=$e,Z.CancelToken=ta,Z.isCancel=rt,Z.VERSION="1.2.3",Z.toFormData=Ve,Z.AxiosError=U,Z.Cancel=Z.CanceledError,Z.all=function(n){return Promise.all(n)},Z.spread=function(n){return function(t){return n.apply(null,t)}},Z.isAxiosError=function(n){return B.isObject(n)&&n.isAxiosError===!0},Z.mergeConfig=ue,Z.AxiosHeaders=ae,Z.formToJSON=function(n){return et(B.isHTMLForm(n)?new FormData(n):n)},Z.HttpStatusCode=aa,Z.default=Z;const At=Z,oa={send:function(n){At.post(n.url,n.data).then(function(t){var r=t.data;r&&r.code===0?n.success&&n.success(r):n.error&&n.error(r&&r.msg)}).catch(function(t){console.error(t),n.error&&n.error()})},read:function(n){At.get(n.url).then(function(t){var r=t.data;r&&r.code===0?n.success&&n.success(r.data.map(function(e){return{time:e[0],type:e[1],color:e[2],author:e[3],text:e[4]}})):n.error&&n.error(r&&r.msg)}).catch(function(t){console.error(t),n.error&&n.error()})}};function Bn(n){return Bn=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Bn(n)}function ra(n){var t=this;this.lang=n,this.fallbackLang=this.lang.includes("-")?this.lang.split("-")[0]:this.lang,this.tran=function(r){return r=r.toLowerCase(),ye[t.lang]&&ye[t.lang][r]?ye[t.lang][r]:ye[t.fallbackLang]&&ye[t.fallbackLang][r]?ye[t.fallbackLang][r]:Sn[r]?Sn[r]:r}}var Sn={"danmaku-loading":"Danmaku is loading",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Input danmaku, hit Enter","about-author":"About author","dplayer-feedback":"DPlayer feedback","about-dplayer":"About DPlayer",loop:"Loop",speed:"Speed","opacity-danmaku":"Opacity for danmaku",normal:"Normal","please-input-danmaku":"Please input danmaku content!","set-danmaku-color":"Set danmaku color","set-danmaku-type":"Set danmaku type","show-danmaku":"Show danmaku","video-failed":"Video load failed","danmaku-failed":"Danmaku load failed","danmaku-send-failed":"Danmaku send failed","switching-quality":"Switching to %q quality","switched-quality":"Switched to %q quality",ff:"FF %s s",rew:"REW %s s","unlimited-danmaku":"Unlimited danmaku","send-danmaku":"Send danmaku",setting:"Setting",fullscreen:"Full screen","web-fullscreen":"Web full screen",send:"Send",screenshot:"Screenshot",airplay:"AirPlay",chromecast:"ChromeCast",subtitle:"Subtitle",off:"Off","show-subs":"Show subtitle","hide-subs":"Hide subtitle",volume:"Volume",live:"Live","video-info":"Video info"},ye={en:Sn,"zh-cn":{"danmaku-loading":"弹幕加载中",top:"顶部",bottom:"底部",rolling:"滚动","input-danmaku-enter":"输入弹幕，回车发送","about-author":"关于作者","dplayer-feedback":"播放器意见反馈","about-dplayer":"关于 DPlayer 播放器",loop:"洗脑循环",speed:"速度","opacity-danmaku":"弹幕透明度",normal:"正常","please-input-danmaku":"要输入弹幕内容啊喂！","set-danmaku-color":"设置弹幕颜色","set-danmaku-type":"设置弹幕类型","show-danmaku":"显示弹幕","video-failed":"视频加载失败","danmaku-failed":"弹幕加载失败","danmaku-send-failed":"弹幕发送失败","switching-quality":"正在切换至 %q 画质","switched-quality":"已经切换至 %q 画质",ff:"快进 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"海量弹幕","send-danmaku":"发送弹幕",setting:"设置",fullscreen:"全屏","web-fullscreen":"页面全屏",send:"发送",screenshot:"截图",airplay:"无线投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"关闭","show-subs":"显示字幕","hide-subs":"隐藏字幕",volume:"音量",live:"直播","video-info":"视频统计信息"},"zh-tw":{"danmaku-loading":"彈幕載入中",top:"頂部",bottom:"底部",rolling:"滾動","input-danmaku-enter":"輸入彈幕，Enter 發送","about-author":"關於作者","dplayer-feedback":"播放器意見回饋","about-dplayer":"關於 DPlayer 播放器",loop:"循環播放",speed:"速度","opacity-danmaku":"彈幕透明度",normal:"正常","please-input-danmaku":"請輸入彈幕內容啊！","set-danmaku-color":"設定彈幕顏色","set-danmaku-type":"設定彈幕類型","show-danmaku":"顯示彈幕","video-failed":"影片載入失敗","danmaku-failed":"彈幕載入失敗","danmaku-send-failed":"彈幕發送失敗","switching-quality":"正在切換至 %q 畫質","switched-quality":"已經切換至 %q 畫質",ff:"快進 %s 秒",rew:"快退 %s 秒","unlimited-danmaku":"巨量彈幕","send-danmaku":"發送彈幕",setting:"設定",fullscreen:"全螢幕","web-fullscreen":"頁面全螢幕",send:"發送",screenshot:"截圖",airplay:"無線投屏",chromecast:"ChromeCast",subtitle:"字幕",off:"關閉","show-subs":"顯示字幕","hide-subs":"隱藏字幕",volume:"音量",live:"直播","video-info":"影片統計訊息"},"ko-kr":{"danmaku-loading":"Danmaku를 불러오는 중입니다.",top:"Top",bottom:"Bottom",rolling:"Rolling","input-danmaku-enter":"Danmaku를 입력하고 Enter를 누르세요.","about-author":"만든이","dplayer-feedback":"피드백 보내기","about-dplayer":"DPlayer 정보",loop:"반복",speed:"배속","opacity-danmaku":"Danmaku 불투명도",normal:"표준","please-input-danmaku":"Danmaku를 입력하세요!","set-danmaku-color":"Danmaku 색상","set-danmaku-type":"Danmaku 설정","show-danmaku":"Danmaku 표시","video-failed":"비디오를 불러오지 못했습니다.","danmaku-failed":"Danmaku를 불러오지 못했습니다.","danmaku-send-failed":"Danmaku 전송에 실패했습니다.","Switching to":"","Switched to":"","switching-quality":"전환 %q 화질","switched-quality":"전환 됨 %q 화질",ff:"앞으로 %s 초",rew:"뒤로 %s 초","unlimited-danmaku":"끝없는 Danmaku","send-danmaku":"Danmaku 보내기",setting:"설정",fullscreen:"전체 화면","web-fullscreen":"웹 내 전체화면",send:"보내기",screenshot:"화면 캡쳐",airplay:"에어플레이",chromecast:"ChromeCast",subtitle:"부제",off:"끄다","show-subs":"자막 보이기","hide-subs":"자막 숨기기",Volume:"볼륨",live:"생방송","video-info":"비디오 정보"},de:{"danmaku-loading":"Danmaku lädt...",top:"Oben",bottom:"Unten",rolling:"Rollend","input-danmaku-enter":"Drücke Enter nach dem Einfügen vom Danmaku","about-author":"Über den Autor","dplayer-feedback":"DPlayer Feedback","about-dplayer":"Über DPlayer",loop:"Wiederholen",speed:"Geschwindigkeit","opacity-danmaku":"Transparenz für Danmaku",normal:"Normal","please-input-danmaku":"Bitte Danmaku Inhalt eingeben!","set-danmaku-color":"Danmaku Farbe festlegen","set-danmaku-type":"Danmaku Typ festlegen","show-danmaku":"Zeige Danmaku","video-failed":"Das Video konnte nicht geladen werden","danmaku-failed":"Danmaku konnte nicht geladen werden","danmaku-send-failed":"Das senden von Danmaku ist fehgeschlagen","switching-quality":"Wechsle zur %q Qualität","switched-quality":"Zur %q Qualität gewechselt",ff:"%s s Vorwärts",rew:"%s s Zurück","unlimited-danmaku":"Unlimitiertes Danmaku","send-danmaku":"Sende Danmaku",setting:"Einstellungen",fullscreen:"Vollbild","web-fullscreen":"Browser Vollbild",send:"Senden",screenshot:"Screenshot",airplay:"AirPlay","show-subs":"Zeige Untertitel",chromecast:"ChromeCast",subtitle:"Untertitel",off:"Schließung","hide-subs":"Verstecke Untertitel",volume:"Lautstärke",live:"Live","video-info":"Video Info"}},ia=b(730),la=b.n(ia),sa=b(74),pa=b.n(sa),da=b(437),ca=b.n(da),ua=b(644),ya=b.n(ua),Aa=b(324),ha=b.n(Aa),ma=b(574),fa=b.n(ma),ba=b(300),ga=b.n(ba),va=b(934),xa=b.n(va),wa=b(428),Ea=b.n(wa),ka=b(807),Ca=b.n(ka),Ba=b(338),Sa=b.n(Ba),Ia=b(254),La=b.n(Ia),Ta=b(965),qa=b.n(Ta),za=b(113),Ma=b.n(za),Oa=b(251),ja=b.n(Oa),Pa=b(410),Da=b.n(Pa),_a=b(182),Ra=b.n(_a),Fa=b(193),Ya=b.n(Fa);const ee={play:la(),pause:pa(),volumeUp:ca(),volumeDown:ya(),volumeOff:ha(),full:fa(),fullWeb:ga(),setting:xa(),right:Ea(),comment:Ca(),commentOff:Sa(),send:La(),pallette:qa(),camera:Ma(),subtitle:Da(),loading:Ra(),airplay:ja(),chromecast:Ya()};var Na=b(916),Ha=b.n(Na);function Be(n){return Be=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Be(n)}function ht(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Be(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Be(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Be(a)==="symbol"?a:String(a)),e)}var a}var Ua=function(){function n(a){(function(o,i){if(!(o instanceof i))throw new TypeError("Cannot call a class as a function")})(this,n),this.container=a.container,this.options=a.options,this.index=a.index,this.tran=a.tran,this.init()}var t,r,e;return t=n,e=[{key:"NewNotice",value:function(a,o,i){var d=document.createElement("div");return d.classList.add("dplayer-notice"),d.style.opacity=o,d.innerText=a,i&&(d.id="dplayer-notice-".concat(i)),d}}],(r=[{key:"init",value:function(){this.container.innerHTML=Ha()({options:this.options,index:this.index,tran:this.tran,icons:ee,mobile:F.isMobile,video:{current:!0,pic:this.options.video.pic,screenshot:this.options.screenshot,airplay:!(!F.isSafari||F.isChrome)&&this.options.airplay,chromecast:this.options.chromecast,preload:this.options.preload,url:this.options.video.url,subtitle:this.options.subtitle}}),this.volumeBar=this.container.querySelector(".dplayer-volume-bar-inner"),this.volumeBarWrap=this.container.querySelector(".dplayer-volume-bar"),this.volumeBarWrapWrap=this.container.querySelector(".dplayer-volume-bar-wrap"),this.volumeButton=this.container.querySelector(".dplayer-volume"),this.volumeButtonIcon=this.container.querySelector(".dplayer-volume-icon"),this.volumeIcon=this.container.querySelector(".dplayer-volume-icon .dplayer-icon-content"),this.playedBar=this.container.querySelector(".dplayer-played"),this.loadedBar=this.container.querySelector(".dplayer-loaded"),this.playedBarWrap=this.container.querySelector(".dplayer-bar-wrap"),this.playedBarTime=this.container.querySelector(".dplayer-bar-time"),this.danmaku=this.container.querySelector(".dplayer-danmaku"),this.danmakuLoading=this.container.querySelector(".dplayer-danloading"),this.video=this.container.querySelector(".dplayer-video-current"),this.bezel=this.container.querySelector(".dplayer-bezel-icon"),this.playButton=this.container.querySelector(".dplayer-play-icon"),this.mobilePlayButton=this.container.querySelector(".dplayer-mobile-play"),this.videoWrap=this.container.querySelector(".dplayer-video-wrap"),this.controllerMask=this.container.querySelector(".dplayer-controller-mask"),this.ptime=this.container.querySelector(".dplayer-ptime"),this.settingButton=this.container.querySelector(".dplayer-setting-icon"),this.settingBox=this.container.querySelector(".dplayer-setting-box"),this.mask=this.container.querySelector(".dplayer-mask"),this.loop=this.container.querySelector(".dplayer-setting-loop"),this.loopToggle=this.container.querySelector(".dplayer-setting-loop .dplayer-toggle-setting-input"),this.showDanmaku=this.container.querySelector(".dplayer-setting-showdan"),this.showDanmakuToggle=this.container.querySelector(".dplayer-showdan-setting-input"),this.unlimitDanmaku=this.container.querySelector(".dplayer-setting-danunlimit"),this.unlimitDanmakuToggle=this.container.querySelector(".dplayer-danunlimit-setting-input"),this.speed=this.container.querySelector(".dplayer-setting-speed"),this.speedItem=this.container.querySelectorAll(".dplayer-setting-speed-item"),this.danmakuOpacityBar=this.container.querySelector(".dplayer-danmaku-bar-inner"),this.danmakuOpacityBarWrap=this.container.querySelector(".dplayer-danmaku-bar"),this.danmakuOpacityBarWrapWrap=this.container.querySelector(".dplayer-danmaku-bar-wrap"),this.danmakuOpacityBox=this.container.querySelector(".dplayer-setting-danmaku"),this.dtime=this.container.querySelector(".dplayer-dtime"),this.controller=this.container.querySelector(".dplayer-controller"),this.commentInput=this.container.querySelector(".dplayer-comment-input"),this.commentButton=this.container.querySelector(".dplayer-comment-icon"),this.commentSettingBox=this.container.querySelector(".dplayer-comment-setting-box"),this.commentSettingButton=this.container.querySelector(".dplayer-comment-setting-icon"),this.commentSettingFill=this.container.querySelector(".dplayer-comment-setting-icon path"),this.commentSendButton=this.container.querySelector(".dplayer-send-icon"),this.commentSendFill=this.container.querySelector(".dplayer-send-icon path"),this.commentColorSettingBox=this.container.querySelector(".dplayer-comment-setting-color"),this.browserFullButton=this.container.querySelector(".dplayer-full-icon"),this.webFullButton=this.container.querySelector(".dplayer-full-in-icon"),this.menu=this.container.querySelector(".dplayer-menu"),this.menuItem=this.container.querySelectorAll(".dplayer-menu-item"),this.qualityList=this.container.querySelector(".dplayer-quality-list"),this.camareButton=this.container.querySelector(".dplayer-camera-icon"),this.airplayButton=this.container.querySelector(".dplayer-airplay-icon"),this.chromecastButton=this.container.querySelector(".dplayer-chromecast-icon"),this.subtitleButton=this.container.querySelector(".dplayer-subtitle-icon"),this.subtitleButtonInner=this.container.querySelector(".dplayer-subtitle-icon .dplayer-icon-content"),this.subtitlesButton=this.container.querySelector(".dplayer-subtitles-icon"),this.subtitlesBox=this.container.querySelector(".dplayer-subtitles-box"),this.subtitlesItem=this.container.querySelectorAll(".dplayer-subtitles-item"),this.subtitle=this.container.querySelector(".dplayer-subtitle"),this.subtrack=this.container.querySelector(".dplayer-subtrack"),this.qualityButton=this.container.querySelector(".dplayer-quality-icon"),this.barPreview=this.container.querySelector(".dplayer-bar-preview"),this.barWrap=this.container.querySelector(".dplayer-bar-wrap"),this.noticeList=this.container.querySelector(".dplayer-notice-list"),this.infoPanel=this.container.querySelector(".dplayer-info-panel"),this.infoPanelClose=this.container.querySelector(".dplayer-info-panel-close"),this.infoVersion=this.container.querySelector(".dplayer-info-panel-item-version .dplayer-info-panel-item-data"),this.infoFPS=this.container.querySelector(".dplayer-info-panel-item-fps .dplayer-info-panel-item-data"),this.infoType=this.container.querySelector(".dplayer-info-panel-item-type .dplayer-info-panel-item-data"),this.infoUrl=this.container.querySelector(".dplayer-info-panel-item-url .dplayer-info-panel-item-data"),this.infoResolution=this.container.querySelector(".dplayer-info-panel-item-resolution .dplayer-info-panel-item-data"),this.infoDuration=this.container.querySelector(".dplayer-info-panel-item-duration .dplayer-info-panel-item-data"),this.infoDanmakuId=this.container.querySelector(".dplayer-info-panel-item-danmaku-id .dplayer-info-panel-item-data"),this.infoDanmakuApi=this.container.querySelector(".dplayer-info-panel-item-danmaku-api .dplayer-info-panel-item-data"),this.infoDanmakuAmount=this.container.querySelector(".dplayer-info-panel-item-danmaku-amount .dplayer-info-panel-item-data")}}])&&ht(t.prototype,r),e&&ht(t,e),Object.defineProperty(t,"prototype",{writable:!1}),n}();const mt=Ua;function Ae(n){return Ae=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ae(n)}function Wa(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Ae(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Ae(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Ae(a)==="symbol"?a:String(a)),e)}var a}var Qa=function(){function n(e){(function(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")})(this,n),this.options=e,this.player=this.options.player,this.container=this.options.container,this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.dan=[],this.showing=!0,this._opacity=this.options.opacity,this.events=this.options.events,this.unlimited=this.options.unlimited,this._measure(""),this.load()}var t,r;return t=n,r=[{key:"load",value:function(){var e,a=this;e=this.options.api.maximum?"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id,"&max=").concat(this.options.api.maximum):"".concat(this.options.api.address,"v3/?id=").concat(this.options.api.id);var o=(this.options.api.addition||[]).slice(0);o.push(e),this.events&&this.events.trigger("danmaku_load_start",o),this._readAllEndpoints(o,function(i){a.dan=[].concat.apply([],i).sort(function(d,c){return d.time-c.time}),window.requestAnimationFrame(function(){a.frame()}),a.options.callback(),a.events&&a.events.trigger("danmaku_load_end")})}},{key:"reload",value:function(e){this.options.api=e,this.dan=[],this.clear(),this.load()}},{key:"_readAllEndpoints",value:function(e,a){for(var o=this,i=[],d=0,c=function(E){o.options.apiBackend.read({url:e[E],success:function(q){i[E]=q,++d===e.length&&a(i)},error:function(q){o.options.error(q||o.options.tran("danmaku-failed")),i[E]=[],++d===e.length&&a(i)}})},x=0;x<e.length;++x)c(x)}},{key:"send",value:function(e,a){var o=this,i={token:this.options.api.token,id:this.options.api.id,author:this.options.api.user,time:this.options.time(),text:e.text,color:e.color,type:e.type};this.options.apiBackend.send({url:this.options.api.address+"v3/",data:i,success:a,error:function(c){o.options.error(c||o.options.tran("danmaku-failed"))}}),this.dan.splice(this.danIndex,0,i),this.danIndex++;var d={text:this.htmlEncode(i.text),color:i.color,type:i.type,border:"2px solid ".concat(this.options.borderColor)};this.draw(d),this.events&&this.events.trigger("danmaku_send",i)}},{key:"frame",value:function(){var e=this;if(this.dan.length&&!this.paused&&this.showing){for(var a=this.dan[this.danIndex],o=[];a&&this.options.time()>parseFloat(a.time);)o.push(a),a=this.dan[++this.danIndex];this.draw(o)}window.requestAnimationFrame(function(){e.frame()})}},{key:"opacity",value:function(e){if(e!==void 0){for(var a=this.container.getElementsByClassName("dplayer-danmaku-item"),o=0;o<a.length;o++)a[o].style.opacity=e;this._opacity=e,this.events&&this.events.trigger("danmaku_opacity",this._opacity)}return this._opacity}},{key:"draw",value:function(e){var a=this;if(this.showing){var o=this.options.height,i=this.container.offsetWidth,d=this.container.offsetHeight,c=parseInt(d/o),x=function(z){var R=z.offsetWidth||parseInt(z.style.width),Y=z.getBoundingClientRect().right||a.container.getBoundingClientRect().right+R;return a.container.getBoundingClientRect().right-Y},E=function(z){return(i+z)/5},q=function(z,R,Y){for(var X=i/E(Y),V=function(pe){var me=a.danTunnel[R][pe+""];if(!me||!me.length)return a.danTunnel[R][pe+""]=[z],z.addEventListener("animationend",function(){a.danTunnel[R][pe+""].splice(0,1)}),{v:pe%c};if(R!=="right")return"continue";for(var He=0;He<me.length;He++){var wt=x(me[He])-10;if(wt<=i-X*E(parseInt(me[He].style.width))||wt<=0)break;if(He===me.length-1)return a.danTunnel[R][pe+""].push(z),z.addEventListener("animationend",function(){a.danTunnel[R][pe+""].splice(0,1)}),{v:pe%c}}},W=0;a.unlimited||W<c;W++){var ie=V(W);if(ie!=="continue"&&Ae(ie)==="object")return ie.v}return-1};Object.prototype.toString.call(e)!=="[object Array]"&&(e=[e]);for(var O=document.createDocumentFragment(),_=function(){e[P].type=F.number2Type(e[P].type),e[P].color||(e[P].color=16777215);var z=document.createElement("div");z.classList.add("dplayer-danmaku-item"),z.classList.add("dplayer-danmaku-".concat(e[P].type)),e[P].border?z.innerHTML='<span style="border:'.concat(e[P].border,'">').concat(e[P].text,"</span>"):z.innerHTML=e[P].text,z.style.opacity=a._opacity,z.style.color=F.number2Color(e[P].color),z.addEventListener("animationend",function(){a.container.removeChild(z)});var R,Y=a._measure(e[P].text);switch(e[P].type){case"right":(R=q(z,e[P].type,Y))>=0&&(z.style.width=Y+1+"px",z.style.top=o*R+"px",z.style.transform="translateX(-".concat(i,"px)"));break;case"top":(R=q(z,e[P].type))>=0&&(z.style.top=o*R+"px");break;case"bottom":(R=q(z,e[P].type))>=0&&(z.style.bottom=o*R+"px");break;default:console.error("Can't handled danmaku type: ".concat(e[P].type))}R>=0&&(z.classList.add("dplayer-danmaku-move"),z.style.animationDuration=a._danAnimation(e[P].type),O.appendChild(z))},P=0;P<e.length;P++)_();return this.container.appendChild(O),O}}},{key:"play",value:function(){this.paused=!1}},{key:"pause",value:function(){this.paused=!0}},{key:"_measure",value:function(e){if(!this.context){var a=getComputedStyle(this.container.getElementsByClassName("dplayer-danmaku-item")[0],null);this.context=document.createElement("canvas").getContext("2d"),this.context.font=a.getPropertyValue("font")}return this.context.measureText(e).width}},{key:"seek",value:function(){this.clear();for(var e=0;e<this.dan.length;e++){if(this.dan[e].time>=this.options.time()){this.danIndex=e;break}this.danIndex=this.dan.length}}},{key:"clear",value:function(){this.danTunnel={right:{},top:{},bottom:{}},this.danIndex=0,this.options.container.innerHTML="",this.events&&this.events.trigger("danmaku_clear")}},{key:"htmlEncode",value:function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2f;")}},{key:"resize",value:function(){for(var e=this.container.offsetWidth,a=this.container.getElementsByClassName("dplayer-danmaku-item"),o=0;o<a.length;o++)a[o].style.transform="translateX(-".concat(e,"px)")}},{key:"hide",value:function(){this.showing=!1,this.pause(),this.clear(),this.events&&this.events.trigger("danmaku_hide")}},{key:"show",value:function(){this.seek(),this.showing=!0,this.play(),this.events&&this.events.trigger("danmaku_show")}},{key:"unlimit",value:function(e){this.unlimited=e}},{key:"speed",value:function(e){this.options.api.speedRate=e}},{key:"_danAnimation",value:function(e){var a=this.options.api.speedRate||1,o=!!this.player.fullScreen.isFullScreen();return{top:"".concat((o?6:4)/a,"s"),right:"".concat((o?8:5)/a,"s"),bottom:"".concat((o?6:4)/a,"s")}[e]}}],r&&Wa(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const Ka=Qa;function Se(n){return Se=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Se(n)}function Va(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Se(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Se(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Se(a)==="symbol"?a:String(a)),e)}var a}const Za=function(){function n(){(function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")})(this,n),this.events={},this.videoEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],this.playerEvents=["screenshot","thumbnails_show","thumbnails_hide","danmaku_show","danmaku_hide","danmaku_clear","danmaku_loaded","danmaku_send","danmaku_opacity","contextmenu_show","contextmenu_hide","notice_show","notice_hide","quality_start","quality_end","destroy","resize","fullscreen","fullscreen_cancel","webfullscreen","webfullscreen_cancel","subtitle_show","subtitle_hide","subtitle_change"]}var t,r;return t=n,(r=[{key:"on",value:function(e,a){this.type(e)&&typeof a=="function"&&(this.events[e]||(this.events[e]=[]),this.events[e].push(a))}},{key:"trigger",value:function(e,a){if(this.events[e]&&this.events[e].length)for(var o=0;o<this.events[e].length;o++)this.events[e][o](a)}},{key:"type",value:function(e){return this.playerEvents.indexOf(e)!==-1?"player":this.videoEvents.indexOf(e)!==-1?"video":(console.error("Unknown event name: ".concat(e)),null)}}])&&Va(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();function Ie(n){return Ie=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ie(n)}function Xa(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Ie(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Ie(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Ie(a)==="symbol"?a:String(a)),e)}var a}var Ja=function(){function n(e){var a=this;(function(o,i){if(!(o instanceof i))throw new TypeError("Cannot call a class as a function")})(this,n),this.player=e,this.lastScrollPosition={left:0,top:0},this.player.events.on("webfullscreen",function(){a.player.resize()}),this.player.events.on("webfullscreen_cancel",function(){a.player.resize(),F.setScrollPosition(a.lastScrollPosition)}),this.fullscreenchange=function(){a.player.resize(),a.isFullScreen("browser")?a.player.events.trigger("fullscreen"):(F.setScrollPosition(a.lastScrollPosition),a.player.events.trigger("fullscreen_cancel"))},this.docfullscreenchange=function(){var o=document.fullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;o&&o!==a.player.container||(a.player.resize(),o?a.player.events.trigger("fullscreen"):(F.setScrollPosition(a.lastScrollPosition),a.player.events.trigger("fullscreen_cancel")))},/Firefox/.test(navigator.userAgent)?(document.addEventListener("mozfullscreenchange",this.docfullscreenchange),document.addEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.addEventListener("fullscreenchange",this.fullscreenchange),this.player.container.addEventListener("webkitfullscreenchange",this.fullscreenchange),document.addEventListener("msfullscreenchange",this.docfullscreenchange),document.addEventListener("MSFullscreenChange",this.docfullscreenchange))}var t,r;return t=n,r=[{key:"isFullScreen",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(e){case"browser":return document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;case"web":return this.player.container.classList.contains("dplayer-fulled")}}},{key:"request",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser",a=e==="browser"?"web":"browser",o=this.isFullScreen(a);switch(o||(this.lastScrollPosition=F.getScrollPosition()),e){case"browser":this.player.container.requestFullscreen?this.player.container.requestFullscreen():this.player.container.mozRequestFullScreen?this.player.container.mozRequestFullScreen():this.player.container.webkitRequestFullscreen?this.player.container.webkitRequestFullscreen():this.player.video.webkitEnterFullscreen?this.player.video.webkitEnterFullscreen():this.player.video.webkitEnterFullScreen?this.player.video.webkitEnterFullScreen():this.player.container.msRequestFullscreen&&this.player.container.msRequestFullscreen();break;case"web":this.player.container.classList.add("dplayer-fulled"),document.body.classList.add("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen")}o&&this.cancel(a)}},{key:"cancel",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";switch(e){case"browser":document.cancelFullScreen?document.cancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.webkitCancelFullscreen?document.webkitCancelFullscreen():document.msCancelFullScreen?document.msCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen();break;case"web":this.player.container.classList.remove("dplayer-fulled"),document.body.classList.remove("dplayer-web-fullscreen-fix"),this.player.events.trigger("webfullscreen_cancel")}}},{key:"toggle",value:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"browser";this.isFullScreen(e)?this.cancel(e):this.request(e)}},{key:"destroy",value:function(){/Firefox/.test(navigator.userAgent)?(document.removeEventListener("mozfullscreenchange",this.docfullscreenchange),document.removeEventListener("fullscreenchange",this.docfullscreenchange)):(this.player.container.removeEventListener("fullscreenchange",this.fullscreenchange),this.player.container.removeEventListener("webkitfullscreenchange",this.fullscreenchange),document.removeEventListener("msfullscreenchange",this.docfullscreenchange),document.removeEventListener("MSFullscreenChange",this.docfullscreenchange))}}],r&&Xa(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const $a=Ja;function Le(n){return Le=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Le(n)}function Ga(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Le(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Le(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Le(a)==="symbol"?a:String(a)),e)}var a}var eo=function(){function n(e){(function(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")})(this,n),this.storageName={opacity:"dplayer-danmaku-opacity",volume:"dplayer-volume",unlimited:"dplayer-danmaku-unlimited",danmaku:"dplayer-danmaku-show",subtitle:"dplayer-subtitle-show"},this.default={opacity:.7,volume:e.options.hasOwnProperty("volume")?e.options.volume:.7,unlimited:(e.options.danmaku&&e.options.danmaku.unlimited?1:0)||0,danmaku:1,subtitle:1},this.data={},this.init()}var t,r;return t=n,(r=[{key:"init",value:function(){for(var e in this.storageName){var a=this.storageName[e];this.data[e]=parseFloat(F.storage.get(a)||this.default[e])}}},{key:"get",value:function(e){return this.data[e]}},{key:"set",value:function(e,a){this.data[e]=a,F.storage.set(this.storageName[e],a)}}])&&Ga(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const no=eo;function Te(n){return Te=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Te(n)}function to(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Te(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Te(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Te(a)==="symbol"?a:String(a)),e)}var a}var ao=function(){function n(e,a,o,i){(function(d,c){if(!(d instanceof c))throw new TypeError("Cannot call a class as a function")})(this,n),this.container=e,this.video=a,this.options=o,this.events=i,this.init()}var t,r;return t=n,r=[{key:"init",value:function(){var e=this;if(this.container.style.fontSize=this.options.fontSize,this.container.style.bottom=this.options.bottom,this.container.style.color=this.options.color,this.video.textTracks&&this.video.textTracks[0]){var a=this.video.textTracks[0];a.oncuechange=function(){var o=a.activeCues[a.activeCues.length-1];if(e.container.innerHTML="",o){var i=document.createElement("div");i.appendChild(o.getCueAsHTML());var d=i.innerHTML.split(/\r?\n/).map(function(c){return"<p>".concat(c,"</p>")}).join("");e.container.innerHTML=d}e.events.trigger("subtitle_change")}}}},{key:"show",value:function(){this.container.classList.remove("dplayer-subtitle-hide"),this.events.trigger("subtitle_show")}},{key:"hide",value:function(){this.container.classList.add("dplayer-subtitle-hide"),this.events.trigger("subtitle_hide")}},{key:"toggle",value:function(){this.container.classList.contains("dplayer-subtitle-hide")?this.show():this.hide()}}],r&&to(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const oo=ao;function qe(n){return qe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},qe(n)}function ro(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(qe(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(qe(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),qe(a)==="symbol"?a:String(a)),e)}var a}var io=function(){function n(e){var a=this;(function(c,x){if(!(c instanceof x))throw new TypeError("Cannot call a class as a function")})(this,n),this.player=e,this.player.template.mask.addEventListener("click",function(){a.hide()}),this.player.template.subtitlesButton.addEventListener("click",function(){a.adaptiveHeight(),a.show()});for(var o=this.player.template.subtitlesItem.length-1,i=function(c){a.player.template.subtitlesItem[c].addEventListener("click",function(){a.hide(),a.player.options.subtitle.index!==c&&(a.player.template.subtitle.innerHTML="<p></p>",a.player.template.subtrack.src=a.player.template.subtitlesItem[c].dataset.subtitle,a.player.options.subtitle.index=c,a.player.template.subtitle.classList.contains("dplayer-subtitle-hide")&&a.subContainerShow())})},d=0;d<o;d++)i(d);this.player.template.subtitlesItem[o].addEventListener("click",function(){a.hide(),a.player.options.subtitle.index!==o&&(a.player.template.subtitle.innerHTML="<p></p>",a.player.template.subtrack.src="",a.player.options.subtitle.index=o,a.subContainerHide())})}var t,r;return t=n,(r=[{key:"subContainerShow",value:function(){this.player.template.subtitle.classList.remove("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_show")}},{key:"subContainerHide",value:function(){this.player.template.subtitle.classList.add("dplayer-subtitle-hide"),this.player.events.trigger("subtitle_hide")}},{key:"hide",value:function(){this.player.template.subtitlesBox.classList.remove("dplayer-subtitles-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.subtitlesBox.classList.add("dplayer-subtitles-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}},{key:"adaptiveHeight",value:function(){var e=30*this.player.template.subtitlesItem.length+14,a=.8*this.player.template.videoWrap.offsetHeight;e>=a-50?(this.player.template.subtitlesBox.style.bottom="8px",this.player.template.subtitlesBox.style["max-height"]=a-8+"px"):(this.player.template.subtitlesBox.style.bottom="50px",this.player.template.subtitlesBox.style["max-height"]=a-50+"px")}}])&&ro(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const lo=io;function ze(n){return ze=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ze(n)}function so(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(ze(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(ze(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),ze(a)==="symbol"?a:String(a)),e)}var a}var po=function(){function n(e){(function(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")})(this,n),this.elements={},this.elements.volume=e.volumeBar,this.elements.played=e.playedBar,this.elements.loaded=e.loadedBar,this.elements.danmaku=e.danmakuOpacityBar}var t,r;return t=n,(r=[{key:"set",value:function(e,a,o){a=Math.max(a,0),a=Math.min(a,1),this.elements[e].style[o]=100*a+"%"}},{key:"get",value:function(e){return parseFloat(this.elements[e].style.width)/100}}])&&so(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const co=po;function Me(n){return Me=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Me(n)}function uo(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Me(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Me(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Me(a)==="symbol"?a:String(a)),e)}var a}var yo=function(){function n(e){(function(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")})(this,n),this.player=e,window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)},this.types=["loading","info","fps"],this.init()}var t,r;return t=n,(r=[{key:"init",value:function(){var e=this;this.types.map(function(a){return a!=="fps"&&e["init".concat(a,"Checker")](),a})}},{key:"initloadingChecker",value:function(){var e=this,a=0,o=0,i=!1;this.loadingChecker=setInterval(function(){e.enableloadingChecker&&(o=e.player.video.currentTime,i||o!==a||e.player.video.paused||(e.player.container.classList.add("dplayer-loading"),i=!0),i&&o>a&&!e.player.video.paused&&(e.player.container.classList.remove("dplayer-loading"),i=!1),a=o)},100)}},{key:"initfpsChecker",value:function(){var e=this;window.requestAnimationFrame(function(){if(e.enablefpsChecker)if(e.initfpsChecker(),e.fpsStart){e.fpsIndex++;var a=new Date;a-e.fpsStart>1e3&&(e.player.infoPanel.fps(e.fpsIndex/(a-e.fpsStart)*1e3),e.fpsStart=new Date,e.fpsIndex=0)}else e.fpsStart=new Date,e.fpsIndex=0;else e.fpsStart=0,e.fpsIndex=0})}},{key:"initinfoChecker",value:function(){var e=this;this.infoChecker=setInterval(function(){e.enableinfoChecker&&e.player.infoPanel.update()},1e3)}},{key:"enable",value:function(e){this["enable".concat(e,"Checker")]=!0,e==="fps"&&this.initfpsChecker()}},{key:"disable",value:function(e){this["enable".concat(e,"Checker")]=!1}},{key:"destroy",value:function(){var e=this;this.types.map(function(a){return e["enable".concat(a,"Checker")]=!1,e["".concat(a,"Checker")]&&clearInterval(e["".concat(a,"Checker")]),a})}}])&&uo(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const Ao=yo;function Oe(n){return Oe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Oe(n)}function ho(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Oe(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Oe(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Oe(a)==="symbol"?a:String(a)),e)}var a}const mo=function(){function n(e){var a=this;(function(o,i){if(!(o instanceof i))throw new TypeError("Cannot call a class as a function")})(this,n),this.container=e,this.container.addEventListener("animationend",function(){a.container.classList.remove("dplayer-bezel-transition")})}var t,r;return t=n,(r=[{key:"switch",value:function(e){this.container.innerHTML=e,this.container.classList.add("dplayer-bezel-transition")}}])&&ho(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();function je(n){return je=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},je(n)}function fo(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(je(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(je(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),je(a)==="symbol"?a:String(a)),e)}var a}var bo=function(){function n(e){(function(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")})(this,n),this.container=e.container,this.barWidth=e.barWidth,this.container.style.backgroundImage="url('".concat(e.url,"')"),this.events=e.events}var t,r;return t=n,(r=[{key:"resize",value:function(e,a,o){this.container.style.width="".concat(e,"px"),this.container.style.height="".concat(a,"px"),this.container.style.top="".concat(2-a,"px"),this.barWidth=o}},{key:"show",value:function(){this.container.style.display="block",this.events&&this.events.trigger("thumbnails_show")}},{key:"move",value:function(e){this.container.style.backgroundPosition="-".concat(160*(Math.ceil(e/this.barWidth*100)-1),"px 0"),this.container.style.left="".concat(Math.min(Math.max(e-this.container.offsetWidth/2,-10),this.barWidth-150),"px")}},{key:"hide",value:function(){this.container.style.display="none",this.events&&this.events.trigger("thumbnails_hide")}}])&&fo(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const go=bo;function Pe(n){return Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pe(n)}function vo(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Pe(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Pe(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Pe(a)==="symbol"?a:String(a)),e)}var a}var re,ft=!0,In=!1,xo=function(){function n(e){(function(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")})(this,n),this.player=e,this.autoHideTimer=0,F.isMobile||(this.setAutoHideHandler=this.setAutoHide.bind(this),this.player.container.addEventListener("mousemove",this.setAutoHideHandler),this.player.container.addEventListener("click",this.setAutoHideHandler),this.player.on("play",this.setAutoHideHandler),this.player.on("pause",this.setAutoHideHandler)),this.initPlayButton(),this.initThumbnails(),this.initPlayedBar(),this.initFullButton(),this.initQualityButton(),this.initScreenshotButton(),this.player.options.subtitle&&typeof this.player.options.subtitle.url=="string"&&this.initSubtitleButton(),this.initHighlights(),this.initAirplayButton(),this.initChromecastButton(),F.isMobile||this.initVolumeButton()}var t,r;return t=n,(r=[{key:"initPlayButton",value:function(){var e=this;this.player.template.playButton.addEventListener("click",function(){e.player.toggle()}),this.player.template.mobilePlayButton.addEventListener("click",function(){e.player.toggle()}),F.isMobile?(this.player.template.videoWrap.addEventListener("click",function(){e.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){e.toggle()})):this.player.options.preventClickToggle||(this.player.template.videoWrap.addEventListener("click",function(){e.player.toggle()}),this.player.template.controllerMask.addEventListener("click",function(){e.player.toggle()}))}},{key:"initHighlights",value:function(){var e=this;this.player.on("durationchange",function(){if(e.player.video.duration!==1&&e.player.video.duration!==1/0&&e.player.options.highlight){var a=e.player.template.playedBarWrap.querySelectorAll(".dplayer-highlight");[].slice.call(a,0).forEach(function(d){e.player.template.playedBarWrap.removeChild(d)});for(var o=0;o<e.player.options.highlight.length;o++)if(e.player.options.highlight[o].text&&e.player.options.highlight[o].time){var i=document.createElement("div");i.classList.add("dplayer-highlight"),i.style.left=e.player.options.highlight[o].time/e.player.video.duration*100+"%",i.innerHTML='<span class="dplayer-highlight-text">'+e.player.options.highlight[o].text+"</span>",e.player.template.playedBarWrap.insertBefore(i,e.player.template.playedBarTime)}}})}},{key:"initThumbnails",value:function(){var e=this;this.player.options.video.thumbnails&&(this.thumbnails=new go({container:this.player.template.barPreview,barWidth:this.player.template.barWrap.offsetWidth,url:this.player.options.video.thumbnails,events:this.player.events}),this.player.on("loadedmetadata",function(){e.thumbnails.resize(160,e.player.video.videoHeight/e.player.video.videoWidth*160,e.player.template.barWrap.offsetWidth)}))}},{key:"initPlayedBar",value:function(){var e=this,a=function(i){var d=((i.clientX||i.changedTouches[0].clientX)-F.getBoundingClientRectViewLeft(e.player.template.playedBarWrap))/e.player.template.playedBarWrap.clientWidth;d=Math.max(d,0),d=Math.min(d,1),e.player.bar.set("played",d,"width"),e.player.template.ptime.innerHTML=F.secondToTime(d*e.player.video.duration)},o=function i(d){document.removeEventListener(F.nameMap.dragEnd,i),document.removeEventListener(F.nameMap.dragMove,a);var c=((d.clientX||d.changedTouches[0].clientX)-F.getBoundingClientRectViewLeft(e.player.template.playedBarWrap))/e.player.template.playedBarWrap.clientWidth;c=Math.max(c,0),c=Math.min(c,1),e.player.bar.set("played",c,"width"),e.player.seek(e.player.bar.get("played")*e.player.video.duration),e.player.timer.enable("progress")};this.player.template.playedBarWrap.addEventListener(F.nameMap.dragStart,function(){e.player.timer.disable("progress"),document.addEventListener(F.nameMap.dragMove,a),document.addEventListener(F.nameMap.dragEnd,o)}),this.player.template.playedBarWrap.addEventListener(F.nameMap.dragMove,function(i){if(e.player.video.duration){var d=e.player.template.playedBarWrap.getBoundingClientRect().left,c=(i.clientX||i.changedTouches[0].clientX)-d;if(c<0||c>e.player.template.playedBarWrap.offsetWidth)return;var x=e.player.video.duration*(c/e.player.template.playedBarWrap.offsetWidth);F.isMobile&&e.thumbnails&&e.thumbnails.show(),e.thumbnails&&e.thumbnails.move(c),e.player.template.playedBarTime.style.left="".concat(c-(x>=3600?25:20),"px"),e.player.template.playedBarTime.innerText=F.secondToTime(x),e.player.template.playedBarTime.classList.remove("hidden")}}),this.player.template.playedBarWrap.addEventListener(F.nameMap.dragEnd,function(){F.isMobile&&e.thumbnails&&e.thumbnails.hide()}),F.isMobile||(this.player.template.playedBarWrap.addEventListener("mouseenter",function(){e.player.video.duration&&(e.thumbnails&&e.thumbnails.show(),e.player.template.playedBarTime.classList.remove("hidden"))}),this.player.template.playedBarWrap.addEventListener("mouseleave",function(){e.player.video.duration&&(e.thumbnails&&e.thumbnails.hide(),e.player.template.playedBarTime.classList.add("hidden"))}))}},{key:"initFullButton",value:function(){var e=this;this.player.template.browserFullButton.addEventListener("click",function(){e.player.fullScreen.toggle("browser")}),this.player.template.webFullButton.addEventListener("click",function(){e.player.fullScreen.toggle("web")})}},{key:"initVolumeButton",value:function(){var e=this,a=function(i){var d=i||window.event,c=((d.clientX||d.changedTouches[0].clientX)-F.getBoundingClientRectViewLeft(e.player.template.volumeBarWrap)-5.5)/35;e.player.volume(c)},o=function i(){document.removeEventListener(F.nameMap.dragEnd,i),document.removeEventListener(F.nameMap.dragMove,a),e.player.template.volumeButton.classList.remove("dplayer-volume-active")};this.player.template.volumeBarWrapWrap.addEventListener("click",function(i){var d=i||window.event,c=((d.clientX||d.changedTouches[0].clientX)-F.getBoundingClientRectViewLeft(e.player.template.volumeBarWrap)-5.5)/35;e.player.volume(c)}),this.player.template.volumeBarWrapWrap.addEventListener(F.nameMap.dragStart,function(){document.addEventListener(F.nameMap.dragMove,a),document.addEventListener(F.nameMap.dragEnd,o),e.player.template.volumeButton.classList.add("dplayer-volume-active")}),this.player.template.volumeButtonIcon.addEventListener("click",function(){e.player.video.muted?(e.player.video.muted=!1,e.player.switchVolumeIcon(),e.player.bar.set("volume",e.player.volume(),"width")):(e.player.video.muted=!0,e.player.template.volumeIcon.innerHTML=ee.volumeOff,e.player.bar.set("volume",0,"width"))})}},{key:"initQualityButton",value:function(){var e=this;this.player.options.video.quality&&this.player.template.qualityList.addEventListener("click",function(a){a.target.classList.contains("dplayer-quality-item")&&e.player.switchQuality(a.target.dataset.index)})}},{key:"initScreenshotButton",value:function(){var e=this;this.player.options.screenshot&&this.player.template.camareButton.addEventListener("click",function(){var a,o=document.createElement("canvas");o.width=e.player.video.videoWidth,o.height=e.player.video.videoHeight,o.getContext("2d").drawImage(e.player.video,0,0,o.width,o.height),o.toBlob(function(i){a=URL.createObjectURL(i);var d=document.createElement("a");d.href=a,d.download="DPlayer.png",d.style.display="none",document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(a),e.player.events.trigger("screenshot",a)})})}},{key:"initAirplayButton",value:function(){this.player.options.airplay&&(window.WebKitPlaybackTargetAvailabilityEvent?this.player.video.addEventListener("webkitplaybacktargetavailabilitychanged",(function(e){e.availability==="available"?this.template.airplayButton.disable=!1:this.template.airplayButton.disable=!0,this.template.airplayButton.addEventListener("click",(function(){this.video.webkitShowPlaybackTargetPicker()}).bind(this))}).bind(this.player)):this.player.template.airplayButton.style.display="none")}},{key:"initChromecast",value:function(){var e=window.document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"),window.document.body.appendChild(e),window.__onGCastApiAvailable=function(a){if(a){var o=new(re=window.chrome.cast).SessionRequest(re.media.DEFAULT_MEDIA_RECEIVER_APP_ID),i=new re.ApiConfig(o,function(){},function(d){d===re.ReceiverAvailability.AVAILABLE&&console.log("chromecast: ",d)});re.initialize(i,function(){})}}}},{key:"initChromecastButton",value:function(){var e=this;if(this.player.options.chromecast){ft&&(ft=!1,this.initChromecast());var a=function(i,d){e.currentMedia=d},o=function(i){console.error("Error launching media",i)};this.player.template.chromecastButton.addEventListener("click",function(){In?(In=!1,e.currentMedia.stop(),e.session.stop(),e.initChromecast()):(In=!0,re.requestSession(function(i){var d,c,x;e.session=i,d=e.player.options.video.url,c=new re.media.MediaInfo(d),x=new re.media.LoadRequest(c),e.session?e.session.loadMedia(x,a.bind(e,"loadMedia"),o).play():window.open(d)},function(i){i.code==="cancel"?e.session=void 0:console.error("Error selecting a cast device",i)}))})}}},{key:"initSubtitleButton",value:function(){var e=this;this.player.events.on("subtitle_show",function(){e.player.template.subtitleButton.dataset.balloon=e.player.tran("hide-subs"),e.player.template.subtitleButtonInner.style.opacity="",e.player.user.set("subtitle",1)}),this.player.events.on("subtitle_hide",function(){e.player.template.subtitleButton.dataset.balloon=e.player.tran("show-subs"),e.player.template.subtitleButtonInner.style.opacity="0.4",e.player.user.set("subtitle",0)}),this.player.template.subtitleButton.addEventListener("click",function(){e.player.subtitle.toggle()})}},{key:"setAutoHide",value:function(){var e=this;this.show(),clearTimeout(this.autoHideTimer),this.autoHideTimer=setTimeout(function(){!e.player.video.played.length||e.player.paused||e.disableAutoHide||e.hide()},3e3)}},{key:"show",value:function(){this.player.container.classList.remove("dplayer-hide-controller")}},{key:"hide",value:function(){this.player.container.classList.add("dplayer-hide-controller"),this.player.setting.hide(),this.player.comment&&this.player.comment.hide()}},{key:"isShow",value:function(){return!this.player.container.classList.contains("dplayer-hide-controller")}},{key:"toggle",value:function(){this.isShow()?this.hide():this.show()}},{key:"destroy",value:function(){F.isMobile||(this.player.container.removeEventListener("mousemove",this.setAutoHideHandler),this.player.container.removeEventListener("click",this.setAutoHideHandler)),clearTimeout(this.autoHideTimer)}}])&&vo(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const wo=xo;function De(n){return De=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},De(n)}function Eo(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(De(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(De(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),De(a)==="symbol"?a:String(a)),e)}var a}var ko=function(){function n(e){var a=this;(function(x,E){if(!(x instanceof E))throw new TypeError("Cannot call a class as a function")})(this,n),this.player=e,this.player.template.mask.addEventListener("click",function(){a.hide()}),this.player.template.settingButton.addEventListener("click",function(){a.show()}),this.loop=this.player.options.loop,this.player.template.loopToggle.checked=this.loop,this.player.template.loop.addEventListener("click",function(){a.player.template.loopToggle.checked=!a.player.template.loopToggle.checked,a.player.template.loopToggle.checked?a.loop=!0:a.loop=!1,a.hide()}),this.showDanmaku=this.player.user.get("danmaku"),this.showDanmaku||this.player.danmaku&&this.player.danmaku.hide(),this.player.template.showDanmakuToggle.checked=this.showDanmaku,this.player.template.showDanmaku.addEventListener("click",function(){a.player.template.showDanmakuToggle.checked=!a.player.template.showDanmakuToggle.checked,a.player.template.showDanmakuToggle.checked?(a.showDanmaku=!0,a.player.danmaku.show()):(a.showDanmaku=!1,a.player.danmaku.hide()),a.player.user.set("danmaku",a.showDanmaku?1:0),a.hide()}),this.unlimitDanmaku=this.player.user.get("unlimited"),this.player.template.unlimitDanmakuToggle.checked=this.unlimitDanmaku,this.player.template.unlimitDanmaku.addEventListener("click",function(){a.player.template.unlimitDanmakuToggle.checked=!a.player.template.unlimitDanmakuToggle.checked,a.player.template.unlimitDanmakuToggle.checked?(a.unlimitDanmaku=!0,a.player.danmaku.unlimit(!0)):(a.unlimitDanmaku=!1,a.player.danmaku.unlimit(!1)),a.player.user.set("unlimited",a.unlimitDanmaku?1:0),a.hide()}),this.player.template.speed.addEventListener("click",function(){a.player.template.settingBox.classList.add("dplayer-setting-box-narrow"),a.player.template.settingBox.classList.add("dplayer-setting-box-speed")});for(var o=function(x){a.player.template.speedItem[x].addEventListener("click",function(){a.player.speed(a.player.template.speedItem[x].dataset.speed),a.hide()})},i=0;i<this.player.template.speedItem.length;i++)o(i);if(this.player.danmaku){this.player.on("danmaku_opacity",function(x){a.player.bar.set("danmaku",x,"width"),a.player.user.set("opacity",x)}),this.player.danmaku.opacity(this.player.user.get("opacity"));var d=function(x){var E=x||window.event,q=((E.clientX||E.changedTouches[0].clientX)-F.getBoundingClientRectViewLeft(a.player.template.danmakuOpacityBarWrap))/130;q=Math.max(q,0),q=Math.min(q,1),a.player.danmaku.opacity(q)},c=function x(){document.removeEventListener(F.nameMap.dragEnd,x),document.removeEventListener(F.nameMap.dragMove,d),a.player.template.danmakuOpacityBox.classList.remove("dplayer-setting-danmaku-active")};this.player.template.danmakuOpacityBarWrapWrap.addEventListener("click",function(x){var E=x||window.event,q=((E.clientX||E.changedTouches[0].clientX)-F.getBoundingClientRectViewLeft(a.player.template.danmakuOpacityBarWrap))/130;q=Math.max(q,0),q=Math.min(q,1),a.player.danmaku.opacity(q)}),this.player.template.danmakuOpacityBarWrapWrap.addEventListener(F.nameMap.dragStart,function(){document.addEventListener(F.nameMap.dragMove,d),document.addEventListener(F.nameMap.dragEnd,c),a.player.template.danmakuOpacityBox.classList.add("dplayer-setting-danmaku-active")})}}var t,r;return t=n,(r=[{key:"hide",value:function(){var e=this;this.player.template.settingBox.classList.remove("dplayer-setting-box-open"),this.player.template.mask.classList.remove("dplayer-mask-show"),setTimeout(function(){e.player.template.settingBox.classList.remove("dplayer-setting-box-narrow"),e.player.template.settingBox.classList.remove("dplayer-setting-box-speed")},300),this.player.controller.disableAutoHide=!1}},{key:"show",value:function(){this.player.template.settingBox.classList.add("dplayer-setting-box-open"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.controller.disableAutoHide=!0}}])&&Eo(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const Co=ko;function _e(n){return _e=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_e(n)}function Bo(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(_e(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(_e(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),_e(a)==="symbol"?a:String(a)),e)}var a}var So=function(){function n(e){var a=this;(function(o,i){if(!(o instanceof i))throw new TypeError("Cannot call a class as a function")})(this,n),this.player=e,this.player.template.mask.addEventListener("click",function(){a.hide()}),this.player.template.commentButton.addEventListener("click",function(){a.show()}),this.player.template.commentSettingButton.addEventListener("click",function(){a.toggleSetting()}),this.player.template.commentColorSettingBox.addEventListener("click",function(){if(a.player.template.commentColorSettingBox.querySelector("input:checked+span")){var o=a.player.template.commentColorSettingBox.querySelector("input:checked").value;a.player.template.commentSettingFill.style.fill=o,a.player.template.commentInput.style.color=o,a.player.template.commentSendFill.style.fill=o}}),this.player.template.commentInput.addEventListener("click",function(){a.hideSetting()}),this.player.template.commentInput.addEventListener("keydown",function(o){(o||window.event).keyCode===13&&a.send()}),this.player.template.commentSendButton.addEventListener("click",function(){a.send()})}var t,r;return t=n,(r=[{key:"show",value:function(){this.player.controller.disableAutoHide=!0,this.player.template.controller.classList.add("dplayer-controller-comment"),this.player.template.mask.classList.add("dplayer-mask-show"),this.player.container.classList.add("dplayer-show-controller"),this.player.template.commentInput.focus()}},{key:"hide",value:function(){this.player.template.controller.classList.remove("dplayer-controller-comment"),this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.container.classList.remove("dplayer-show-controller"),this.player.controller.disableAutoHide=!1,this.hideSetting()}},{key:"showSetting",value:function(){this.player.template.commentSettingBox.classList.add("dplayer-comment-setting-open")}},{key:"hideSetting",value:function(){this.player.template.commentSettingBox.classList.remove("dplayer-comment-setting-open")}},{key:"toggleSetting",value:function(){this.player.template.commentSettingBox.classList.contains("dplayer-comment-setting-open")?this.hideSetting():this.showSetting()}},{key:"send",value:function(){var e=this;this.player.template.commentInput.blur(),this.player.template.commentInput.value.replace(/^\s+|\s+$/g,"")?this.player.danmaku.send({text:this.player.template.commentInput.value,color:F.color2Number(this.player.container.querySelector(".dplayer-comment-setting-color input:checked").value),type:parseInt(this.player.container.querySelector(".dplayer-comment-setting-type input:checked").value)},function(){e.player.template.commentInput.value="",e.hide()}):this.player.notice(this.player.tran("please-input-danmaku"))}}])&&Bo(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const Io=So;function Re(n){return Re=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Re(n)}function Lo(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Re(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Re(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Re(a)==="symbol"?a:String(a)),e)}var a}var To=function(){function n(e){(function(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")})(this,n),this.player=e,this.doHotKeyHandler=this.doHotKey.bind(this),this.cancelFullScreenHandler=this.cancelFullScreen.bind(this),this.player.options.hotkey&&document.addEventListener("keydown",this.doHotKeyHandler),document.addEventListener("keydown",this.cancelFullScreenHandler)}var t,r;return t=n,(r=[{key:"doHotKey",value:function(e){if(this.player.focus){var a=document.activeElement.tagName.toUpperCase(),o=document.activeElement.getAttribute("contenteditable");if(a!=="INPUT"&&a!=="TEXTAREA"&&o!==""&&o!=="true"){var i,d=e||window.event;switch(d.keyCode){case 32:d.preventDefault(),this.player.toggle();break;case 37:if(d.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime-5),this.player.controller.setAutoHide();break;case 39:if(d.preventDefault(),this.player.options.live)break;this.player.seek(this.player.video.currentTime+5),this.player.controller.setAutoHide();break;case 38:d.preventDefault(),i=this.player.volume()+.1,this.player.volume(i);break;case 40:d.preventDefault(),i=this.player.volume()-.1,this.player.volume(i)}}}}},{key:"cancelFullScreen",value:function(e){(e||window.event).keyCode===27&&this.player.fullScreen.isFullScreen("web")&&this.player.fullScreen.cancel("web")}},{key:"destroy",value:function(){this.player.options.hotkey&&document.removeEventListener("keydown",this.doHotKeyHandler),document.removeEventListener("keydown",this.cancelFullScreenHandler)}}])&&Lo(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const qo=To;function Fe(n){return Fe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Fe(n)}function zo(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Fe(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Fe(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Fe(a)==="symbol"?a:String(a)),e)}var a}var Mo=function(){function n(e){var a=this;(function(o,i){if(!(o instanceof i))throw new TypeError("Cannot call a class as a function")})(this,n),this.player=e,this.shown=!1,Array.prototype.slice.call(this.player.template.menuItem).forEach(function(o,i){a.player.options.contextmenu[i].click&&o.addEventListener("click",function(){a.player.options.contextmenu[i].click(a.player),a.hide()})}),this.contextmenuHandler=function(o){if(a.shown)a.hide();else{var i=o||window.event;i.preventDefault();var d=a.player.container.getBoundingClientRect();a.show(i.clientX-d.left,i.clientY-d.top),a.player.template.mask.addEventListener("click",function(){a.hide()})}},this.player.container.addEventListener("contextmenu",this.contextmenuHandler)}var t,r;return t=n,(r=[{key:"show",value:function(e,a){this.player.template.menu.classList.add("dplayer-menu-show");var o=this.player.container.getBoundingClientRect();e+this.player.template.menu.offsetWidth>=o.width?(this.player.template.menu.style.right=o.width-e+"px",this.player.template.menu.style.left="initial"):(this.player.template.menu.style.left=e+"px",this.player.template.menu.style.right="initial"),a+this.player.template.menu.offsetHeight>=o.height?(this.player.template.menu.style.bottom=o.height-a+"px",this.player.template.menu.style.top="initial"):(this.player.template.menu.style.top=a+"px",this.player.template.menu.style.bottom="initial"),this.player.template.mask.classList.add("dplayer-mask-show"),this.shown=!0,this.player.events.trigger("contextmenu_show")}},{key:"hide",value:function(){this.player.template.mask.classList.remove("dplayer-mask-show"),this.player.template.menu.classList.remove("dplayer-menu-show"),this.shown=!1,this.player.events.trigger("contextmenu_hide")}},{key:"destroy",value:function(){this.player.container.removeEventListener("contextmenu",this.contextmenuHandler)}}])&&zo(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const Oo=Mo;function Ye(n){return Ye=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ye(n)}function jo(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,(a=function(o,i){if(Ye(o)!=="object"||o===null)return o;var d=o[Symbol.toPrimitive];if(d!==void 0){var c=d.call(o,"string");if(Ye(c)!=="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(o)}(e.key),Ye(a)==="symbol"?a:String(a)),e)}var a}var Po=function(){function n(e){var a=this;(function(o,i){if(!(o instanceof i))throw new TypeError("Cannot call a class as a function")})(this,n),this.container=e.template.infoPanel,this.template=e.template,this.video=e.video,this.player=e,this.template.infoPanelClose.addEventListener("click",function(){a.hide()})}var t,r;return t=n,(r=[{key:"show",value:function(){this.beginTime=Date.now(),this.update(),this.player.timer.enable("info"),this.player.timer.enable("fps"),this.container.classList.remove("dplayer-info-panel-hide")}},{key:"hide",value:function(){this.player.timer.disable("info"),this.player.timer.disable("fps"),this.container.classList.add("dplayer-info-panel-hide")}},{key:"triggle",value:function(){this.container.classList.contains("dplayer-info-panel-hide")?this.show():this.hide()}},{key:"update",value:function(){this.template.infoVersion.innerHTML="v".concat("1.27.1"," ").concat("v1.27.0-12-g4f61091"),this.template.infoType.innerHTML=this.player.type,this.template.infoUrl.innerHTML=this.player.options.video.url,this.template.infoResolution.innerHTML="".concat(this.player.video.videoWidth," x ").concat(this.player.video.videoHeight),this.template.infoDuration.innerHTML=this.player.video.duration,this.player.options.danmaku&&(this.template.infoDanmakuId.innerHTML=this.player.options.danmaku.id,this.template.infoDanmakuApi.innerHTML=this.player.options.danmaku.api,this.template.infoDanmakuAmount.innerHTML=this.player.danmaku.dan.length)}},{key:"fps",value:function(e){this.template.infoFPS.innerHTML="".concat(e.toFixed(1))}}])&&jo(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),n}();const Do=Po;var _o=b(568),Ro=b.n(_o);function Ne(n){return Ne=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ne(n)}function bt(n,t){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(n);t&&(e=e.filter(function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable})),r.push.apply(r,e)}return r}function Fo(n,t,r){return(t=vt(t))in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}function gt(n,t){for(var r=0;r<t.length;r++){var e=t[r];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(n,vt(e.key),e)}}function vt(n){var t=function(r,e){if(Ne(r)!=="object"||r===null)return r;var a=r[Symbol.toPrimitive];if(a!==void 0){var o=a.call(r,"string");if(Ne(o)!=="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(r)}(n);return Ne(t)==="symbol"?t:String(t)}var xt=0,he=[],Yo=function(){function n(a){var o=this;(function(i,d){if(!(i instanceof d))throw new TypeError("Cannot call a class as a function")})(this,n),this.options=function(i){var d={container:i.element||document.getElementsByClassName("dplayer")[0],live:!1,autoplay:!1,theme:"#b7daff",loop:!1,lang:(navigator.language||navigator.browserLanguage).toLowerCase(),screenshot:!1,airplay:!0,chromecast:!1,hotkey:!0,preload:"metadata",volume:.7,playbackSpeed:[.5,.75,1,1.25,1.5,2],apiBackend:oa,video:{},contextmenu:[],mutex:!0,pluginOptions:{hls:{},flv:{},dash:{},webtorrent:{}},preventClickToggle:!1};for(var c in d)d.hasOwnProperty(c)&&!i.hasOwnProperty(c)&&(i[c]=d[c]);return i.video&&!i.video.type&&(i.video.type="auto"),Bn(i.danmaku)==="object"&&i.danmaku&&!i.danmaku.user&&(i.danmaku.user="DIYgod"),i.subtitle&&(!i.subtitle.type&&(i.subtitle.type="webvtt"),!i.subtitle.fontSize&&(i.subtitle.fontSize="20px"),!i.subtitle.bottom&&(i.subtitle.bottom="40px"),!i.subtitle.color&&(i.subtitle.color="#fff")),i.video.quality&&(i.video.url=i.video.quality[i.video.defaultQuality].url),i.lang&&(i.lang=i.lang.toLowerCase()),i.contextmenu=i.contextmenu.concat([{key:"video-info",click:function(x){x.infoPanel.triggle()}},{key:"about-author",link:"https://diygod.me"},{text:"DPlayer v".concat("1.27.1"),link:"https://github.com/MoePlayer/DPlayer"}]),i}(function(i){for(var d=1;d<arguments.length;d++){var c=arguments[d]!=null?arguments[d]:{};d%2?bt(Object(c),!0).forEach(function(x){Fo(i,x,c[x])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(c)):bt(Object(c)).forEach(function(x){Object.defineProperty(i,x,Object.getOwnPropertyDescriptor(c,x))})}return i}({preload:a.video.type==="webtorrent"?"none":"metadata"},a)),this.options.video.quality&&(this.qualityIndex=this.options.video.defaultQuality,this.quality=this.options.video.quality[this.options.video.defaultQuality]),this.tran=new ra(this.options.lang).tran,this.events=new Za,this.user=new no(this),this.container=this.options.container,this.noticeList={},this.container.classList.add("dplayer"),this.options.danmaku||this.container.classList.add("dplayer-no-danmaku"),this.options.live?this.container.classList.add("dplayer-live"):this.container.classList.remove("dplayer-live"),F.isMobile&&this.container.classList.add("dplayer-mobile"),this.arrow=this.container.offsetWidth<=500,this.arrow&&this.container.classList.add("dplayer-arrow"),this.options.subtitle&&Array.isArray(this.options.subtitle.url)&&(this.options.subtitle.url.push({subtitle:"",lang:"off"}),this.options.subtitle.defaultSubtitle&&(typeof this.options.subtitle.defaultSubtitle=="string"?this.options.subtitle.index=this.options.subtitle.url.findIndex(function(i){return i.lang===o.options.subtitle.defaultSubtitle||i.name===o.options.subtitle.defaultSubtitle}):typeof this.options.subtitle.defaultSubtitle=="number"&&(this.options.subtitle.index=this.options.subtitle.defaultSubtitle)),(this.options.subtitle.index===-1||!this.options.subtitle.index||this.options.subtitle.index>this.options.subtitle.url.length-1)&&(this.options.subtitle.index=this.options.subtitle.url.findIndex(function(i){return i.lang===o.options.lang})),this.options.subtitle.index===-1&&(this.options.subtitle.index=this.options.subtitle.url.length-1)),this.template=new mt({container:this.container,options:this.options,index:xt,tran:this.tran}),this.video=this.template.video,this.bar=new co(this.template),this.bezel=new mo(this.template.bezel),this.fullScreen=new $a(this),this.controller=new wo(this),this.options.danmaku&&(this.danmaku=new Ka({player:this,container:this.template.danmaku,opacity:this.user.get("opacity"),callback:function(){setTimeout(function(){o.template.danmakuLoading.style.display="none",o.options.autoplay&&o.play()},0)},error:function(i){o.notice(i)},apiBackend:this.options.apiBackend,borderColor:this.options.theme,height:this.arrow?24:30,time:function(){return o.video.currentTime},unlimited:this.user.get("unlimited"),api:{id:this.options.danmaku.id,address:this.options.danmaku.api,token:this.options.danmaku.token,maximum:this.options.danmaku.maximum,addition:this.options.danmaku.addition,user:this.options.danmaku.user,speedRate:this.options.danmaku.speedRate},events:this.events,tran:function(i){return o.tran(i)}}),this.comment=new Io(this)),this.setting=new Co(this),this.plugins={},this.docClickFun=function(){o.focus=!1},this.containerClickFun=function(){o.focus=!0},document.addEventListener("click",this.docClickFun,!0),this.container.addEventListener("click",this.containerClickFun,!0),this.paused=!0,this.timer=new Ao(this),this.hotkey=new qo(this),this.contextmenu=new Oo(this),this.initVideo(this.video,this.quality&&this.quality.type||this.options.video.type),this.infoPanel=new Do(this),!this.danmaku&&this.options.autoplay&&this.play(),xt++,he.push(this)}var t,r,e;return t=n,r=[{key:"seek",value:function(a){a=Math.max(a,0),this.video.duration&&(a=Math.min(a,this.video.duration)),this.video.currentTime<a?this.notice("".concat(this.tran("ff").replace("%s",(a-this.video.currentTime).toFixed(0)))):this.video.currentTime>a&&this.notice("".concat(this.tran("rew").replace("%s",(this.video.currentTime-a).toFixed(0)))),this.video.currentTime=a,this.danmaku&&this.danmaku.seek(),this.bar.set("played",a/this.video.duration,"width"),this.template.ptime.innerHTML=F.secondToTime(a)}},{key:"play",value:function(a){var o=this;if(this.paused=!1,this.video.paused&&!F.isMobile&&this.bezel.switch(ee.play),this.template.playButton.innerHTML=ee.pause,this.template.mobilePlayButton.innerHTML=ee.pause,a||qt.resolve(this.video.play()).catch(function(){o.pause()}).then(function(){}),this.timer.enable("loading"),this.container.classList.remove("dplayer-paused"),this.container.classList.add("dplayer-playing"),this.danmaku&&this.danmaku.play(),this.options.mutex)for(var i=0;i<he.length;i++)this!==he[i]&&he[i].pause()}},{key:"pause",value:function(a){this.paused=!0,this.container.classList.remove("dplayer-loading"),this.video.paused||F.isMobile||this.bezel.switch(ee.pause),this.template.playButton.innerHTML=ee.play,this.template.mobilePlayButton.innerHTML=ee.play,a||this.video.pause(),this.timer.disable("loading"),this.container.classList.remove("dplayer-playing"),this.container.classList.add("dplayer-paused"),this.danmaku&&this.danmaku.pause()}},{key:"switchVolumeIcon",value:function(){this.volume()>=.95?this.template.volumeIcon.innerHTML=ee.volumeUp:this.volume()>0?this.template.volumeIcon.innerHTML=ee.volumeDown:this.template.volumeIcon.innerHTML=ee.volumeOff}},{key:"volume",value:function(a,o,i){if(a=parseFloat(a),!isNaN(a)){a=Math.max(a,0),a=Math.min(a,1),this.bar.set("volume",a,"width");var d="".concat((100*a).toFixed(0),"%");this.template.volumeBarWrapWrap.dataset.balloon=d,o||this.user.set("volume",a),i||this.notice("".concat(this.tran("volume")," ").concat((100*a).toFixed(0),"%"),void 0,void 0,"volume"),this.video.volume=a,this.video.muted&&(this.video.muted=!1),this.switchVolumeIcon()}return this.video.volume}},{key:"toggle",value:function(){this.video.paused?this.play():this.pause()}},{key:"on",value:function(a,o){this.events.on(a,o)}},{key:"switchVideo",value:function(a,o){this.pause(),this.video.poster=a.pic?a.pic:"",this.video.src=a.url,this.initMSE(this.video,a.type||"auto"),o&&(this.template.danmakuLoading.style.display="block",this.bar.set("played",0,"width"),this.bar.set("loaded",0,"width"),this.template.ptime.innerHTML="00:00",this.template.danmaku.innerHTML="",this.danmaku&&this.danmaku.reload({id:o.id,address:o.api,token:o.token,maximum:o.maximum,addition:o.addition,user:o.user}))}},{key:"initMSE",value:function(a,o){var i=this;if(this.type=o,this.options.video.customType&&this.options.video.customType[o])Object.prototype.toString.call(this.options.video.customType[o])==="[object Function]"?this.options.video.customType[o](this.video,this):console.error("Illegal customType: ".concat(o));else switch(this.type==="auto"&&(/m3u8(#|\?|$)/i.exec(a.src)?this.type="hls":/.flv(#|\?|$)/i.exec(a.src)?this.type="flv":/.mpd(#|\?|$)/i.exec(a.src)?this.type="dash":this.type="normal"),this.type==="hls"&&(a.canPlayType("application/x-mpegURL")||a.canPlayType("application/vnd.apple.mpegURL"))&&(this.type="normal"),this.type){case"hls":if(window.Hls)if(window.Hls.isSupported()){var d=this.options.pluginOptions.hls,c=new window.Hls(d);this.plugins.hls=c,c.loadSource(a.src),c.attachMedia(a),this.events.on("destroy",function(){c.destroy(),delete i.plugins.hls})}else this.notice("Error: Hls is not supported.");else this.notice("Error: Can't find Hls.");break;case"flv":if(window.flvjs)if(window.flvjs.isSupported()){var x=window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource||{},{type:"flv",url:a.src}),this.options.pluginOptions.flv.config);this.plugins.flvjs=x,x.attachMediaElement(a),x.load(),this.events.on("destroy",function(){x.unload(),x.detachMediaElement(),x.destroy(),delete i.plugins.flvjs})}else this.notice("Error: flvjs is not supported.");else this.notice("Error: Can't find flvjs.");break;case"dash":if(window.dashjs){var E=window.dashjs.MediaPlayer().create().initialize(a,a.src,!1),q=this.options.pluginOptions.dash;E.updateSettings(q),this.plugins.dash=E,this.events.on("destroy",function(){window.dashjs.MediaPlayer().reset(),delete i.plugins.dash})}else this.notice("Error: Can't find dashjs.");break;case"webtorrent":if(window.WebTorrent)if(window.WebTorrent.WEBRTC_SUPPORT){this.container.classList.add("dplayer-loading");var O=this.options.pluginOptions.webtorrent,_=new window.WebTorrent(O);this.plugins.webtorrent=_;var P=a.src;a.src="",a.preload="metadata",a.addEventListener("durationchange",function(){return i.container.classList.remove("dplayer-loading")},{once:!0}),_.add(P,function(z){z.files.find(function(R){return R.name.endsWith(".mp4")}).renderTo(i.video,{autoplay:i.options.autoplay,controls:!1})}),this.events.on("destroy",function(){_.remove(P),_.destroy(),delete i.plugins.webtorrent})}else this.notice("Error: Webtorrent is not supported.");else this.notice("Error: Can't find Webtorrent.")}}},{key:"initVideo",value:function(a,o){var i=this;this.initMSE(a,o),this.on("durationchange",function(){a.duration!==1&&a.duration!==1/0&&(i.template.dtime.innerHTML=F.secondToTime(a.duration))}),this.on("progress",function(){var x=a.buffered.length?a.buffered.end(a.buffered.length-1)/a.duration:0;i.bar.set("loaded",x,"width")}),this.on("error",function(){i.video.error&&i.tran&&i.notice&&i.type!=="webtorrent"&&i.notice(i.tran("video-failed"))}),this.on("ended",function(){i.bar.set("played",1,"width"),i.setting.loop?(i.seek(0),i.play()):i.pause(),i.danmaku&&(i.danmaku.danIndex=0)}),this.on("play",function(){i.paused&&i.play(!0)}),this.on("pause",function(){i.paused||i.pause(!0)}),this.on("timeupdate",function(){i.bar.set("played",i.video.currentTime/i.video.duration,"width");var x=F.secondToTime(i.video.currentTime);i.template.ptime.innerHTML!==x&&(i.template.ptime.innerHTML=x)});for(var d=function(x){a.addEventListener(i.events.videoEvents[x],function(E){i.events.trigger(i.events.videoEvents[x],E)})},c=0;c<this.events.videoEvents.length;c++)d(c);this.volume(this.user.get("volume"),!0,!0),this.options.subtitle&&(this.subtitle=new oo(this.template.subtitle,this.video,this.options.subtitle,this.events),Array.isArray(this.options.subtitle.url)&&(this.subtitles=new lo(this)),this.user.get("subtitle")||this.subtitle.hide())}},{key:"switchQuality",value:function(a){var o=this;if(a=typeof a=="string"?parseInt(a):a,this.qualityIndex!==a&&!this.switchingQuality){this.prevIndex=this.qualityIndex,this.qualityIndex=a,this.switchingQuality=!0,this.quality=this.options.video.quality[a],this.template.qualityButton.innerHTML=this.quality.name;var i=this.video.paused;this.video.pause();var d=Ro()({current:!1,pic:null,screenshot:this.options.screenshot,preload:"auto",url:this.quality.url,subtitle:this.options.subtitle}),c=new DOMParser().parseFromString(d,"text/html").body.firstChild;this.template.videoWrap.insertBefore(c,this.template.videoWrap.getElementsByTagName("div")[0]),this.prevVideo=this.video,this.video=c,this.initVideo(this.video,this.quality.type||this.options.video.type),this.seek(this.prevVideo.currentTime),this.notice("".concat(this.tran("switching-quality").replace("%q",this.quality.name)),-1,void 0,"switch-quality"),this.events.trigger("quality_start",this.quality),this.on("canplay",function(){if(o.prevVideo){if(o.video.currentTime!==o.prevVideo.currentTime)return void o.seek(o.prevVideo.currentTime);o.template.videoWrap.removeChild(o.prevVideo),o.video.classList.add("dplayer-video-current"),i||o.video.play(),o.prevVideo=null,o.notice("".concat(o.tran("switched-quality").replace("%q",o.quality.name)),void 0,void 0,"switch-quality"),o.switchingQuality=!1,o.events.trigger("quality_end")}}),this.on("error",function(){o.video.error&&o.prevVideo&&(o.template.videoWrap.removeChild(o.video),o.video=o.prevVideo,i||o.video.play(),o.qualityIndex=o.prevIndex,o.quality=o.options.video.quality[o.qualityIndex],o.noticeTime=setTimeout(function(){o.template.notice.style.opacity=0,o.events.trigger("notice_hide")},3e3),o.prevVideo=null,o.switchingQuality=!1)})}}},{key:"notice",value:function(a){var o,i,d,c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:2e3,x=arguments.length>2&&arguments[2]!==void 0?arguments[2]:.8,E=arguments.length>3?arguments[3]:void 0;if(E&&((o=document.getElementById("dplayer-notice-".concat(E)))&&(o.innerHTML=a),this.noticeList[E]&&(clearTimeout(this.noticeList[E]),this.noticeList[E]=null)),!o){var q=mt.NewNotice(a,x,E);this.template.noticeList.appendChild(q),o=q}this.events.trigger("notice_show",o),c>0&&(this.noticeList[E]=setTimeout((i=o,d=this,function(){i.addEventListener("animationend",function(){d.template.noticeList.removeChild(i)}),i.classList.add("remove-notice"),d.events.trigger("notice_hide"),d.noticeList[E]=null}),c))}},{key:"resize",value:function(){this.danmaku&&this.danmaku.resize(),this.controller.thumbnails&&this.controller.thumbnails.resize(160,this.video.videoHeight/this.video.videoWidth*160,this.template.barWrap.offsetWidth),this.events.trigger("resize")}},{key:"speed",value:function(a){this.video.playbackRate=a}},{key:"destroy",value:function(){he.splice(he.indexOf(this),1),this.pause(),document.removeEventListener("click",this.docClickFun,!0),this.container.removeEventListener("click",this.containerClickFun,!0),this.fullScreen.destroy(),this.hotkey.destroy(),this.contextmenu.destroy(),this.controller.destroy(),this.timer.destroy(),this.video.src="",this.container.innerHTML="",this.events.trigger("destroy")}}],e=[{key:"version",get:function(){return"1.27.1"}}],r&&gt(t.prototype,r),e&&gt(t,e),Object.defineProperty(t,"prototype",{writable:!1}),n}();const No=Yo;console.log(`
`.concat(" %c DPlayer v","1.27.1"," ").concat("v1.27.0-12-g4f61091"," %c https://dplayer.diygod.dev ",`
`,`
`),"color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");const Ho=No})(),k.default})())})(Lt);var lr=Lt.exports;const sr=Bt(lr),pr={name:"Play",props:{video:{type:Object,default:()=>{}}},data(){return{videoData:this.video}},mounted(){this.init()},methods:{init(){new sr({container:document.querySelector("#dplayer"),lang:"zh-cn",screenshot:!0,video:{url:`${this.videoData.path}?filename=${encodeURIComponent(this.videoData.uploadFilename)}&type=inline&key=${encodeURIComponent(this.videoData.userSeeKey)}`},contextmenu:[{text:"不挂高数",link:"https://www.buguagaoshu.com"}],bottom:"15%",unlimited:!0})}}},dr={id:"dplayer",ref:"dplayer"};function cr(G,K,M,I,b,k){return le(),ln("div",null,[sn("div",dr,null,512)])}const ur=Tn(pr,[["render",cr]]),Et=["jpg","jpeg","png","gif","ico","bmp","webp","tif"],kt=["mp4","mkv","webm","mov","mpeg","m4v","avi","wmv","flv"],Ct=["mp3","wav","flac","ape","aac"],yr={components:{DPlayer:ur,Voice:It},data(){return{item:{path:"",uploadFilename:""},userSeeKey:"",showShareDialog:!1,showShareRes:!1,fileType:-1}},created(){this.getShare(),console.log(this.$route.params.id)},methods:{getFileType(){let G=this.item.path.split(".").pop().toLowerCase();for(let K=0;K<Et.length;K++)if(Et[K]==G)return 1;for(let K=0;K<kt.length;K++)if(kt[K]==G)return 2;for(let K=0;K<Ct.length;K++)if(Ct[K]==G)return 3;return 0},getShare(){this.httpGet(`/public/file/check?id=${this.$route.params.id}`,G=>{G.status==200?G.data?this.showShareDialog=!0:(this.getShareData(),this.showShareRes=!0):this.$router.push("/")})},getShareData(){this.httpPost("/public/file/get",{url:this.$route.params.id,userSeeKey:this.userSeeKey},G=>{G.data!=null&&(this.item=G.data,this.showShareRes=!0,this.showShareDialog=!1)})}}},Ar={key:0},hr=sn("br",null,null,-1),mr={key:3,textContent:"暂不支持预览，请下载查看"},fr=sn("br",null,null,-1);function br(G,K,M,I,b,k){const A=Jo("DPlayer"),p=It;return le(),tn(Wo,null,{default:$(()=>[b.showShareRes?(le(),ln("div",Ar,[J(an,{justify:"center"},{default:$(()=>[sn("h2",null,Qo(b.item.uploadFilename),1)]),_:1}),J(on,null,{default:$(()=>[hr]),_:1}),J(an,null,{default:$(()=>[J(on,null,{default:$(()=>[k.getFileType(b.item)==1?(le(),tn(Ko,{key:0,src:`${b.item.path}?filename=${encodeURIComponent(b.item.uploadFilename)}&type=inline&key=${encodeURIComponent(b.item.userSeeKey)}`},null,8,["src"])):Ue("",!0),k.getFileType(b.item)==2?(le(),tn(A,{key:1,video:b.item},null,8,["video"])):Ue("",!0),k.getFileType(b.item)==3?(le(),tn(p,{key:2,voice:b.item},null,8,["voice"])):Ue("",!0),k.getFileType(b.item)==0?(le(),ln("span",mr)):Ue("",!0)]),_:1})]),_:1}),J(on,null,{default:$(()=>[fr]),_:1}),J(an,{justify:"center"},{default:$(()=>[J(Ln,{color:"success",target:"_blank",size:"large",href:`${b.item.path}?filename=${encodeURIComponent(b.item.uploadFilename)}&type=attachment&key=${encodeURIComponent(b.item.userSeeKey)}`},{default:$(()=>[rn(" 下载 ")]),_:1},8,["href"])]),_:1})])):Ue("",!0),J(Xo,{persistent:"",modelValue:b.showShareDialog,"onUpdate:modelValue":K[3]||(K[3]=u=>b.showShareDialog=u),"max-width":"490"},{default:$(()=>[J($o,null,{default:$(()=>[J(Go,{class:"headline"},{default:$(()=>[rn("请输入密码")]),_:1}),J(er,null,{default:$(()=>[J(an,{justify:"center"},{default:$(()=>[J(on,null,{default:$(()=>[J(Vo,{modelValue:b.userSeeKey,"onUpdate:modelValue":K[0]||(K[0]=u=>b.userSeeKey=u),placeholder:"密码",label:"密码",clearable:"",variant:"underlined"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),J(nr,null,{default:$(()=>[J(Zo),J(Ln,{color:"green darken-1",text:"",onClick:K[1]||(K[1]=u=>b.showShareDialog=!1)},{default:$(()=>[rn(" 放弃 ")]),_:1}),J(Ln,{color:"error",text:"",onClick:K[2]||(K[2]=u=>k.getShareData())},{default:$(()=>[rn(" 确认 ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}const wr=Tn(yr,[["render",br]]);export{wr as default};
