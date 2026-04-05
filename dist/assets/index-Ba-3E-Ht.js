(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const h of c.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var mh={exports:{}},Po={};var Zg;function uM(){if(Zg)return Po;Zg=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function i(r,l,c){var h=null;if(c!==void 0&&(h=""+c),l.key!==void 0&&(h=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:s,type:r,key:h,ref:l!==void 0?l:null,props:c}}return Po.Fragment=t,Po.jsx=i,Po.jsxs=i,Po}var Kg;function fM(){return Kg||(Kg=1,mh.exports=uM()),mh.exports}var Ht=fM(),gh={exports:{}},le={};var Qg;function hM(){if(Qg)return le;Qg=1;var s=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),x=Symbol.for("react.activity"),g=Symbol.iterator;function y(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,S={};function _(P,k,ct){this.props=P,this.context=k,this.refs=S,this.updater=ct||E}_.prototype.isReactComponent={},_.prototype.setState=function(P,k){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,k,"setState")},_.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function R(){}R.prototype=_.prototype;function D(P,k,ct){this.props=P,this.context=k,this.refs=S,this.updater=ct||E}var L=D.prototype=new R;L.constructor=D,A(L,_.prototype),L.isPureReactComponent=!0;var B=Array.isArray;function U(){}var N={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function O(P,k,ct){var yt=ct.ref;return{$$typeof:s,type:P,key:k,ref:yt!==void 0?yt:null,props:ct}}function ft(P,k){return O(P.type,k,P.props)}function G(P){return typeof P=="object"&&P!==null&&P.$$typeof===s}function Z(P){var k={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(ct){return k[ct]})}var nt=/\/+/g;function ut(P,k){return typeof P=="object"&&P!==null&&P.key!=null?Z(""+P.key):k.toString(36)}function Q(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(U,U):(P.status="pending",P.then(function(k){P.status==="pending"&&(P.status="fulfilled",P.value=k)},function(k){P.status==="pending"&&(P.status="rejected",P.reason=k)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function I(P,k,ct,yt,Rt){var K=typeof P;(K==="undefined"||K==="boolean")&&(P=null);var pt=!1;if(P===null)pt=!0;else switch(K){case"bigint":case"string":case"number":pt=!0;break;case"object":switch(P.$$typeof){case s:case t:pt=!0;break;case v:return pt=P._init,I(pt(P._payload),k,ct,yt,Rt)}}if(pt)return Rt=Rt(P),pt=yt===""?"."+ut(P,0):yt,B(Rt)?(ct="",pt!=null&&(ct=pt.replace(nt,"$&/")+"/"),I(Rt,k,ct,"",function(Bt){return Bt})):Rt!=null&&(G(Rt)&&(Rt=ft(Rt,ct+(Rt.key==null||P&&P.key===Rt.key?"":(""+Rt.key).replace(nt,"$&/")+"/")+pt)),k.push(Rt)),1;pt=0;var St=yt===""?".":yt+":";if(B(P))for(var Ut=0;Ut<P.length;Ut++)yt=P[Ut],K=St+ut(yt,Ut),pt+=I(yt,k,ct,K,Rt);else if(Ut=y(P),typeof Ut=="function")for(P=Ut.call(P),Ut=0;!(yt=P.next()).done;)yt=yt.value,K=St+ut(yt,Ut++),pt+=I(yt,k,ct,K,Rt);else if(K==="object"){if(typeof P.then=="function")return I(Q(P),k,ct,yt,Rt);throw k=String(P),Error("Objects are not valid as a React child (found: "+(k==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":k)+"). If you meant to render a collection of children, use an array instead.")}return pt}function F(P,k,ct){if(P==null)return P;var yt=[],Rt=0;return I(P,yt,"","",function(K){return k.call(ct,K,Rt++)}),yt}function rt(P){if(P._status===-1){var k=P._result;k=k(),k.then(function(ct){(P._status===0||P._status===-1)&&(P._status=1,P._result=ct)},function(ct){(P._status===0||P._status===-1)&&(P._status=2,P._result=ct)}),P._status===-1&&(P._status=0,P._result=k)}if(P._status===1)return P._result.default;throw P._result}var ot=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var k=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(k))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},vt={map:F,forEach:function(P,k,ct){F(P,function(){k.apply(this,arguments)},ct)},count:function(P){var k=0;return F(P,function(){k++}),k},toArray:function(P){return F(P,function(k){return k})||[]},only:function(P){if(!G(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return le.Activity=x,le.Children=vt,le.Component=_,le.Fragment=i,le.Profiler=l,le.PureComponent=D,le.StrictMode=r,le.Suspense=m,le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=N,le.__COMPILER_RUNTIME={__proto__:null,c:function(P){return N.H.useMemoCache(P)}},le.cache=function(P){return function(){return P.apply(null,arguments)}},le.cacheSignal=function(){return null},le.cloneElement=function(P,k,ct){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var yt=A({},P.props),Rt=P.key;if(k!=null)for(K in k.key!==void 0&&(Rt=""+k.key),k)!T.call(k,K)||K==="key"||K==="__self"||K==="__source"||K==="ref"&&k.ref===void 0||(yt[K]=k[K]);var K=arguments.length-2;if(K===1)yt.children=ct;else if(1<K){for(var pt=Array(K),St=0;St<K;St++)pt[St]=arguments[St+2];yt.children=pt}return O(P.type,Rt,yt)},le.createContext=function(P){return P={$$typeof:h,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},le.createElement=function(P,k,ct){var yt,Rt={},K=null;if(k!=null)for(yt in k.key!==void 0&&(K=""+k.key),k)T.call(k,yt)&&yt!=="key"&&yt!=="__self"&&yt!=="__source"&&(Rt[yt]=k[yt]);var pt=arguments.length-2;if(pt===1)Rt.children=ct;else if(1<pt){for(var St=Array(pt),Ut=0;Ut<pt;Ut++)St[Ut]=arguments[Ut+2];Rt.children=St}if(P&&P.defaultProps)for(yt in pt=P.defaultProps,pt)Rt[yt]===void 0&&(Rt[yt]=pt[yt]);return O(P,K,Rt)},le.createRef=function(){return{current:null}},le.forwardRef=function(P){return{$$typeof:d,render:P}},le.isValidElement=G,le.lazy=function(P){return{$$typeof:v,_payload:{_status:-1,_result:P},_init:rt}},le.memo=function(P,k){return{$$typeof:p,type:P,compare:k===void 0?null:k}},le.startTransition=function(P){var k=N.T,ct={};N.T=ct;try{var yt=P(),Rt=N.S;Rt!==null&&Rt(ct,yt),typeof yt=="object"&&yt!==null&&typeof yt.then=="function"&&yt.then(U,ot)}catch(K){ot(K)}finally{k!==null&&ct.types!==null&&(k.types=ct.types),N.T=k}},le.unstable_useCacheRefresh=function(){return N.H.useCacheRefresh()},le.use=function(P){return N.H.use(P)},le.useActionState=function(P,k,ct){return N.H.useActionState(P,k,ct)},le.useCallback=function(P,k){return N.H.useCallback(P,k)},le.useContext=function(P){return N.H.useContext(P)},le.useDebugValue=function(){},le.useDeferredValue=function(P,k){return N.H.useDeferredValue(P,k)},le.useEffect=function(P,k){return N.H.useEffect(P,k)},le.useEffectEvent=function(P){return N.H.useEffectEvent(P)},le.useId=function(){return N.H.useId()},le.useImperativeHandle=function(P,k,ct){return N.H.useImperativeHandle(P,k,ct)},le.useInsertionEffect=function(P,k){return N.H.useInsertionEffect(P,k)},le.useLayoutEffect=function(P,k){return N.H.useLayoutEffect(P,k)},le.useMemo=function(P,k){return N.H.useMemo(P,k)},le.useOptimistic=function(P,k){return N.H.useOptimistic(P,k)},le.useReducer=function(P,k,ct){return N.H.useReducer(P,k,ct)},le.useRef=function(P){return N.H.useRef(P)},le.useState=function(P){return N.H.useState(P)},le.useSyncExternalStore=function(P,k,ct){return N.H.useSyncExternalStore(P,k,ct)},le.useTransition=function(){return N.H.useTransition()},le.version="19.2.3",le}var Jg;function np(){return Jg||(Jg=1,gh.exports=hM()),gh.exports}var te=np(),_h={exports:{}},Io={},vh={exports:{}},xh={};var $g;function dM(){return $g||($g=1,(function(s){function t(I,F){var rt=I.length;I.push(F);t:for(;0<rt;){var ot=rt-1>>>1,vt=I[ot];if(0<l(vt,F))I[ot]=F,I[rt]=vt,rt=ot;else break t}}function i(I){return I.length===0?null:I[0]}function r(I){if(I.length===0)return null;var F=I[0],rt=I.pop();if(rt!==F){I[0]=rt;t:for(var ot=0,vt=I.length,P=vt>>>1;ot<P;){var k=2*(ot+1)-1,ct=I[k],yt=k+1,Rt=I[yt];if(0>l(ct,rt))yt<vt&&0>l(Rt,ct)?(I[ot]=Rt,I[yt]=rt,ot=yt):(I[ot]=ct,I[k]=rt,ot=k);else if(yt<vt&&0>l(Rt,rt))I[ot]=Rt,I[yt]=rt,ot=yt;else break t}}return F}function l(I,F){var rt=I.sortIndex-F.sortIndex;return rt!==0?rt:I.id-F.id}if(s.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;s.unstable_now=function(){return c.now()}}else{var h=Date,d=h.now();s.unstable_now=function(){return h.now()-d}}var m=[],p=[],v=1,x=null,g=3,y=!1,E=!1,A=!1,S=!1,_=typeof setTimeout=="function"?setTimeout:null,R=typeof clearTimeout=="function"?clearTimeout:null,D=typeof setImmediate<"u"?setImmediate:null;function L(I){for(var F=i(p);F!==null;){if(F.callback===null)r(p);else if(F.startTime<=I)r(p),F.sortIndex=F.expirationTime,t(m,F);else break;F=i(p)}}function B(I){if(A=!1,L(I),!E)if(i(m)!==null)E=!0,U||(U=!0,Z());else{var F=i(p);F!==null&&Q(B,F.startTime-I)}}var U=!1,N=-1,T=5,O=-1;function ft(){return S?!0:!(s.unstable_now()-O<T)}function G(){if(S=!1,U){var I=s.unstable_now();O=I;var F=!0;try{t:{E=!1,A&&(A=!1,R(N),N=-1),y=!0;var rt=g;try{e:{for(L(I),x=i(m);x!==null&&!(x.expirationTime>I&&ft());){var ot=x.callback;if(typeof ot=="function"){x.callback=null,g=x.priorityLevel;var vt=ot(x.expirationTime<=I);if(I=s.unstable_now(),typeof vt=="function"){x.callback=vt,L(I),F=!0;break e}x===i(m)&&r(m),L(I)}else r(m);x=i(m)}if(x!==null)F=!0;else{var P=i(p);P!==null&&Q(B,P.startTime-I),F=!1}}break t}finally{x=null,g=rt,y=!1}F=void 0}}finally{F?Z():U=!1}}}var Z;if(typeof D=="function")Z=function(){D(G)};else if(typeof MessageChannel<"u"){var nt=new MessageChannel,ut=nt.port2;nt.port1.onmessage=G,Z=function(){ut.postMessage(null)}}else Z=function(){_(G,0)};function Q(I,F){N=_(function(){I(s.unstable_now())},F)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(I){I.callback=null},s.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<I?Math.floor(1e3/I):5},s.unstable_getCurrentPriorityLevel=function(){return g},s.unstable_next=function(I){switch(g){case 1:case 2:case 3:var F=3;break;default:F=g}var rt=g;g=F;try{return I()}finally{g=rt}},s.unstable_requestPaint=function(){S=!0},s.unstable_runWithPriority=function(I,F){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var rt=g;g=I;try{return F()}finally{g=rt}},s.unstable_scheduleCallback=function(I,F,rt){var ot=s.unstable_now();switch(typeof rt=="object"&&rt!==null?(rt=rt.delay,rt=typeof rt=="number"&&0<rt?ot+rt:ot):rt=ot,I){case 1:var vt=-1;break;case 2:vt=250;break;case 5:vt=1073741823;break;case 4:vt=1e4;break;default:vt=5e3}return vt=rt+vt,I={id:v++,callback:F,priorityLevel:I,startTime:rt,expirationTime:vt,sortIndex:-1},rt>ot?(I.sortIndex=rt,t(p,I),i(m)===null&&I===i(p)&&(A?(R(N),N=-1):A=!0,Q(B,rt-ot))):(I.sortIndex=vt,t(m,I),E||y||(E=!0,U||(U=!0,Z()))),I},s.unstable_shouldYield=ft,s.unstable_wrapCallback=function(I){var F=g;return function(){var rt=g;g=F;try{return I.apply(this,arguments)}finally{g=rt}}}})(xh)),xh}var t_;function pM(){return t_||(t_=1,vh.exports=dM()),vh.exports}var Sh={exports:{}},wn={};var e_;function mM(){if(e_)return wn;e_=1;var s=np();function t(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var r={d:{f:i,r:function(){throw Error(t(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,v){var x=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:x==null?null:""+x,children:m,containerInfo:p,implementation:v}}var h=s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return wn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=r,wn.createPortal=function(m,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(t(299));return c(m,p,null,v)},wn.flushSync=function(m){var p=h.T,v=r.p;try{if(h.T=null,r.p=2,m)return m()}finally{h.T=p,r.p=v,r.d.f()}},wn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,r.d.C(m,p))},wn.prefetchDNS=function(m){typeof m=="string"&&r.d.D(m)},wn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var v=p.as,x=d(v,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,y=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?r.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:x,integrity:g,fetchPriority:y}):v==="script"&&r.d.X(m,{crossOrigin:x,integrity:g,fetchPriority:y,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},wn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=d(p.as,p.crossOrigin);r.d.M(m,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&r.d.M(m)},wn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,x=d(v,p.crossOrigin);r.d.L(m,v,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},wn.preloadModule=function(m,p){if(typeof m=="string")if(p){var v=d(p.as,p.crossOrigin);r.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else r.d.m(m)},wn.requestFormReset=function(m){r.d.r(m)},wn.unstable_batchedUpdates=function(m,p){return m(p)},wn.useFormState=function(m,p,v){return h.H.useFormState(m,p,v)},wn.useFormStatus=function(){return h.H.useHostTransitionStatus()},wn.version="19.2.3",wn}var n_;function gM(){if(n_)return Sh.exports;n_=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),Sh.exports=mM(),Sh.exports}var i_;function _M(){if(i_)return Io;i_=1;var s=pM(),t=np(),i=gM();function r(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var n=e,a=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(a=n.return),e=n.return;while(e)}return n.tag===3?a:null}function h(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function d(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function m(e){if(c(e)!==e)throw Error(r(188))}function p(e){var n=e.alternate;if(!n){if(n=c(e),n===null)throw Error(r(188));return n!==e?null:e}for(var a=e,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return m(u),e;if(f===o)return m(u),n;f=f.sibling}throw Error(r(188))}if(a.return!==o.return)a=u,o=f;else{for(var M=!1,C=u.child;C;){if(C===a){M=!0,a=u,o=f;break}if(C===o){M=!0,o=u,a=f;break}C=C.sibling}if(!M){for(C=f.child;C;){if(C===a){M=!0,a=f,o=u;break}if(C===o){M=!0,o=f,a=u;break}C=C.sibling}if(!M)throw Error(r(189))}}if(a.alternate!==o)throw Error(r(190))}if(a.tag!==3)throw Error(r(188));return a.stateNode.current===a?e:n}function v(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=v(e),n!==null)return n;e=e.sibling}return null}var x=Object.assign,g=Symbol.for("react.element"),y=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),R=Symbol.for("react.consumer"),D=Symbol.for("react.context"),L=Symbol.for("react.forward_ref"),B=Symbol.for("react.suspense"),U=Symbol.for("react.suspense_list"),N=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),O=Symbol.for("react.activity"),ft=Symbol.for("react.memo_cache_sentinel"),G=Symbol.iterator;function Z(e){return e===null||typeof e!="object"?null:(e=G&&e[G]||e["@@iterator"],typeof e=="function"?e:null)}var nt=Symbol.for("react.client.reference");function ut(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===nt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case A:return"Fragment";case _:return"Profiler";case S:return"StrictMode";case B:return"Suspense";case U:return"SuspenseList";case O:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case E:return"Portal";case D:return e.displayName||"Context";case R:return(e._context.displayName||"Context")+".Consumer";case L:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case N:return n=e.displayName||null,n!==null?n:ut(e.type)||"Memo";case T:n=e._payload,e=e._init;try{return ut(e(n))}catch{}}return null}var Q=Array.isArray,I=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,rt={pending:!1,data:null,method:null,action:null},ot=[],vt=-1;function P(e){return{current:e}}function k(e){0>vt||(e.current=ot[vt],ot[vt]=null,vt--)}function ct(e,n){vt++,ot[vt]=e.current,e.current=n}var yt=P(null),Rt=P(null),K=P(null),pt=P(null);function St(e,n){switch(ct(K,n),ct(Rt,e),ct(yt,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?vg(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=vg(n),e=xg(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}k(yt),ct(yt,e)}function Ut(){k(yt),k(Rt),k(K)}function Bt(e){e.memoizedState!==null&&ct(pt,e);var n=yt.current,a=xg(n,e.type);n!==a&&(ct(Rt,e),ct(yt,a))}function Kt(e){Rt.current===e&&(k(yt),k(Rt)),pt.current===e&&(k(pt),Uo._currentValue=rt)}var He,ge;function _e(e){if(He===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);He=n&&n[1]||"",ge=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+He+e+ge}var Ne=!1;function ce(e,n){if(!e||Ne)return"";Ne=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var xt=function(){throw Error()};if(Object.defineProperty(xt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(xt,[])}catch(lt){var at=lt}Reflect.construct(e,[],xt)}else{try{xt.call()}catch(lt){at=lt}e.call(xt.prototype)}}else{try{throw Error()}catch(lt){at=lt}(xt=e())&&typeof xt.catch=="function"&&xt.catch(function(){})}}catch(lt){if(lt&&at&&typeof lt.stack=="string")return[lt.stack,at.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),M=f[0],C=f[1];if(M&&C){var H=M.split(`
`),et=C.split(`
`);for(u=o=0;o<H.length&&!H[o].includes("DetermineComponentFrameRoot");)o++;for(;u<et.length&&!et[u].includes("DetermineComponentFrameRoot");)u++;if(o===H.length||u===et.length)for(o=H.length-1,u=et.length-1;1<=o&&0<=u&&H[o]!==et[u];)u--;for(;1<=o&&0<=u;o--,u--)if(H[o]!==et[u]){if(o!==1||u!==1)do if(o--,u--,0>u||H[o]!==et[u]){var mt=`
`+H[o].replace(" at new "," at ");return e.displayName&&mt.includes("<anonymous>")&&(mt=mt.replace("<anonymous>",e.displayName)),mt}while(1<=o&&0<=u);break}}}finally{Ne=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?_e(a):""}function $e(e,n){switch(e.tag){case 26:case 27:case 5:return _e(e.type);case 16:return _e("Lazy");case 13:return e.child!==n&&n!==null?_e("Suspense Fallback"):_e("Suspense");case 19:return _e("SuspenseList");case 0:case 15:return ce(e.type,!1);case 11:return ce(e.type.render,!1);case 1:return ce(e.type,!0);case 31:return _e("Activity");default:return""}}function V(e){try{var n="",a=null;do n+=$e(e,a),a=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var je=Object.prototype.hasOwnProperty,be=s.unstable_scheduleCallback,Pe=s.unstable_cancelCallback,jt=s.unstable_shouldYield,z=s.unstable_requestPaint,b=s.unstable_now,Y=s.unstable_getCurrentPriorityLevel,gt=s.unstable_ImmediatePriority,Mt=s.unstable_UserBlockingPriority,dt=s.unstable_NormalPriority,qt=s.unstable_LowPriority,wt=s.unstable_IdlePriority,Jt=s.log,ne=s.unstable_setDisableYieldValue,Tt=null,Et=null;function Pt(e){if(typeof Jt=="function"&&ne(e),Et&&typeof Et.setStrictMode=="function")try{Et.setStrictMode(Tt,e)}catch{}}var Ot=Math.clz32?Math.clz32:q,It=Math.log,fe=Math.LN2;function q(e){return e>>>=0,e===0?32:31-(It(e)/fe|0)|0}var Ct=256,At=262144,zt=4194304;function bt(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function ht(e,n,a){var o=e.pendingLanes;if(o===0)return 0;var u=0,f=e.suspendedLanes,M=e.pingedLanes;e=e.warmLanes;var C=o&134217727;return C!==0?(o=C&~f,o!==0?u=bt(o):(M&=C,M!==0?u=bt(M):a||(a=C&~e,a!==0&&(u=bt(a))))):(C=o&~f,C!==0?u=bt(C):M!==0?u=bt(M):a||(a=o&~e,a!==0&&(u=bt(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function Vt(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function ae(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ze(){var e=zt;return zt<<=1,(zt&62914560)===0&&(zt=4194304),e}function Te(e){for(var n=[],a=0;31>a;a++)n.push(e);return n}function On(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Mi(e,n,a,o,u,f){var M=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var C=e.entanglements,H=e.expirationTimes,et=e.hiddenUpdates;for(a=M&~a;0<a;){var mt=31-Ot(a),xt=1<<mt;C[mt]=0,H[mt]=-1;var at=et[mt];if(at!==null)for(et[mt]=null,mt=0;mt<at.length;mt++){var lt=at[mt];lt!==null&&(lt.lane&=-536870913)}a&=~xt}o!==0&&Ws(e,o,0),f!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=f&~(M&~n))}function Ws(e,n,a){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-Ot(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|a&261930}function Br(e,n){var a=e.entangledLanes|=n;for(e=e.entanglements;a;){var o=31-Ot(a),u=1<<o;u&n|e[o]&n&&(e[o]|=n),a&=~u}}function al(e,n){var a=n&-n;return a=(a&42)!==0?1:Gr(a),(a&(e.suspendedLanes|n))!==0?0:a}function Gr(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Hr(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Oi(){var e=F.p;return e!==0?e:(e=window.event,e===void 0?32:Vg(e.type))}function Vr(e,n){var a=F.p;try{return F.p=e,n()}finally{F.p=a}}var yi=Math.random().toString(36).slice(2),sn="__reactFiber$"+yi,pn="__reactProps$"+yi,Zi="__reactContainer$"+yi,ba="__reactEvents$"+yi,rl="__reactListeners$"+yi,sl="__reactHandles$"+yi,ol="__reactResources$"+yi,sr="__reactMarker$"+yi;function qs(e){delete e[sn],delete e[pn],delete e[ba],delete e[rl],delete e[sl]}function Ta(e){var n=e[sn];if(n)return n;for(var a=e.parentNode;a;){if(n=a[Zi]||a[sn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(e=Ag(e);e!==null;){if(a=e[sn])return a;e=Ag(e)}return n}e=a,a=e.parentNode}return null}function Aa(e){if(e=e[sn]||e[Zi]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function or(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(r(33))}function w(e){var n=e[ol];return n||(n=e[ol]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function W(e){e[sr]=!0}var st=new Set,it={};function J(e,n){Dt(e,n),Dt(e+"Capture",n)}function Dt(e,n){for(it[e]=n,e=0;e<n.length;e++)st.add(n[e])}var Gt=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Lt={},Yt={};function Qt(e){return je.call(Yt,e)?!0:je.call(Lt,e)?!1:Gt.test(e)?Yt[e]=!0:(Lt[e]=!0,!1)}function ie(e,n,a){if(Qt(n))if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,""+a)}}function oe(e,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,""+a)}}function Xt(e,n,a,o){if(o===null)e.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(n,a,""+o)}}function he(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ze(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ke(e,n,a){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return u.call(this)},set:function(M){a=""+M,f.call(this,M)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(M){a=""+M},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Ce(e){if(!e._valueTracker){var n=Ze(e)?"checked":"value";e._valueTracker=Ke(e,n,""+e[n])}}function mn(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return e&&(o=Ze(e)?e.checked?"true":"false":e.value),e=o,e!==a?(n.setValue(e),!0):!1}function Wt(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Pn=/[\n"\\]/g;function se(e){return e.replace(Pn,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function In(e,n,a,o,u,f,M,C){e.name="",M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"?e.type=M:e.removeAttribute("type"),n!=null?M==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+he(n)):e.value!==""+he(n)&&(e.value=""+he(n)):M!=="submit"&&M!=="reset"||e.removeAttribute("value"),n!=null?Ei(e,M,he(n)):a!=null?Ei(e,M,he(a)):o!=null&&e.removeAttribute("value"),u==null&&f!=null&&(e.defaultChecked=!!f),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?e.name=""+he(C):e.removeAttribute("name")}function Qn(e,n,a,o,u,f,M,C){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Ce(e);return}a=a!=null?""+he(a):"",n=n!=null?""+he(n):a,C||n===e.value||(e.value=n),e.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=C?e.checked:!!o,e.defaultChecked=!!o,M!=null&&typeof M!="function"&&typeof M!="symbol"&&typeof M!="boolean"&&(e.name=M),Ce(e)}function Ei(e,n,a){n==="number"&&Wt(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function Jn(e,n,a,o){if(e=e.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<e.length;a++)u=n.hasOwnProperty("$"+e[a].value),e[a].selected!==u&&(e[a].selected=u),u&&o&&(e[a].defaultSelected=!0)}else{for(a=""+he(a),n=null,u=0;u<e.length;u++){if(e[u].value===a){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}n!==null||e[u].disabled||(n=e[u])}n!==null&&(n.selected=!0)}}function Ie(e,n,a){if(n!=null&&(n=""+he(n),n!==e.value&&(e.value=n),a==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=a!=null?""+he(a):""}function on(e,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(r(92));if(Q(o)){if(1<o.length)throw Error(r(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=he(n),e.defaultValue=a,o=e.textContent,o===a&&o!==""&&o!==null&&(e.value=o),Ce(e)}function zn(e,n){if(n){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=n;return}}e.textContent=n}var ln=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function bi(e,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,a):typeof a!="number"||a===0||ln.has(n)?n==="float"?e.cssFloat=a:e[n]=(""+a).trim():e[n]=a+"px"}function Ki(e,n,a){if(n!=null&&typeof n!="object")throw Error(r(62));if(e=e.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&bi(e,u,o)}else for(var f in n)n.hasOwnProperty(f)&&bi(e,f,n[f])}function Xr(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var sx=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ox=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ll(e){return ox.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Qi(){}var fu=null;function hu(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var kr=null,Wr=null;function _p(e){var n=Aa(e);if(n&&(e=n.stateNode)){var a=e[pn]||null;t:switch(e=n.stateNode,n.type){case"input":if(In(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+se(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==e&&o.form===e.form){var u=o[pn]||null;if(!u)throw Error(r(90));In(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===e.form&&mn(o)}break t;case"textarea":Ie(e,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&Jn(e,!!a.multiple,n,!1)}}}var du=!1;function vp(e,n,a){if(du)return e(n,a);du=!0;try{var o=e(n);return o}finally{if(du=!1,(kr!==null||Wr!==null)&&(Zl(),kr&&(n=kr,e=Wr,Wr=kr=null,_p(n),e)))for(n=0;n<e.length;n++)_p(e[n])}}function Ys(e,n){var a=e.stateNode;if(a===null)return null;var o=a[pn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(r(231,n,typeof a));return a}var Ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),pu=!1;if(Ji)try{var js={};Object.defineProperty(js,"passive",{get:function(){pu=!0}}),window.addEventListener("test",js,js),window.removeEventListener("test",js,js)}catch{pu=!1}var Ra=null,mu=null,cl=null;function xp(){if(cl)return cl;var e,n=mu,a=n.length,o,u="value"in Ra?Ra.value:Ra.textContent,f=u.length;for(e=0;e<a&&n[e]===u[e];e++);var M=a-e;for(o=1;o<=M&&n[a-o]===u[f-o];o++);return cl=u.slice(e,1<o?1-o:void 0)}function ul(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function fl(){return!0}function Sp(){return!1}function Xn(e){function n(a,o,u,f,M){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=M,this.currentTarget=null;for(var C in e)e.hasOwnProperty(C)&&(a=e[C],this[C]=a?a(f):f[C]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?fl:Sp,this.isPropagationStopped=Sp,this}return x(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=fl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=fl)},persist:function(){},isPersistent:fl}),n}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hl=Xn(lr),Zs=x({},lr,{view:0,detail:0}),lx=Xn(Zs),gu,_u,Ks,dl=x({},Zs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:xu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ks&&(Ks&&e.type==="mousemove"?(gu=e.screenX-Ks.screenX,_u=e.screenY-Ks.screenY):_u=gu=0,Ks=e),gu)},movementY:function(e){return"movementY"in e?e.movementY:_u}}),Mp=Xn(dl),cx=x({},dl,{dataTransfer:0}),ux=Xn(cx),fx=x({},Zs,{relatedTarget:0}),vu=Xn(fx),hx=x({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),dx=Xn(hx),px=x({},lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),mx=Xn(px),gx=x({},lr,{data:0}),yp=Xn(gx),_x={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},xx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sx(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=xx[e])?!!n[e]:!1}function xu(){return Sx}var Mx=x({},Zs,{key:function(e){if(e.key){var n=_x[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=ul(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?vx[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:xu,charCode:function(e){return e.type==="keypress"?ul(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ul(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),yx=Xn(Mx),Ex=x({},dl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ep=Xn(Ex),bx=x({},Zs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:xu}),Tx=Xn(bx),Ax=x({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Rx=Xn(Ax),Cx=x({},dl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),wx=Xn(Cx),Dx=x({},lr,{newState:0,oldState:0}),Ux=Xn(Dx),Lx=[9,13,27,32],Su=Ji&&"CompositionEvent"in window,Qs=null;Ji&&"documentMode"in document&&(Qs=document.documentMode);var Nx=Ji&&"TextEvent"in window&&!Qs,bp=Ji&&(!Su||Qs&&8<Qs&&11>=Qs),Tp=" ",Ap=!1;function Rp(e,n){switch(e){case"keyup":return Lx.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Cp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qr=!1;function Ox(e,n){switch(e){case"compositionend":return Cp(n);case"keypress":return n.which!==32?null:(Ap=!0,Tp);case"textInput":return e=n.data,e===Tp&&Ap?null:e;default:return null}}function Px(e,n){if(qr)return e==="compositionend"||!Su&&Rp(e,n)?(e=xp(),cl=mu=Ra=null,qr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return bp&&n.locale!=="ko"?null:n.data;default:return null}}var Ix={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wp(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Ix[e.type]:n==="textarea"}function Dp(e,n,a,o){kr?Wr?Wr.push(o):Wr=[o]:kr=o,n=nc(n,"onChange"),0<n.length&&(a=new hl("onChange","change",null,a,o),e.push({event:a,listeners:n}))}var Js=null,$s=null;function zx(e){hg(e,0)}function pl(e){var n=or(e);if(mn(n))return e}function Up(e,n){if(e==="change")return n}var Lp=!1;if(Ji){var Mu;if(Ji){var yu="oninput"in document;if(!yu){var Np=document.createElement("div");Np.setAttribute("oninput","return;"),yu=typeof Np.oninput=="function"}Mu=yu}else Mu=!1;Lp=Mu&&(!document.documentMode||9<document.documentMode)}function Op(){Js&&(Js.detachEvent("onpropertychange",Pp),$s=Js=null)}function Pp(e){if(e.propertyName==="value"&&pl($s)){var n=[];Dp(n,$s,e,hu(e)),vp(zx,n)}}function Fx(e,n,a){e==="focusin"?(Op(),Js=n,$s=a,Js.attachEvent("onpropertychange",Pp)):e==="focusout"&&Op()}function Bx(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return pl($s)}function Gx(e,n){if(e==="click")return pl(n)}function Hx(e,n){if(e==="input"||e==="change")return pl(n)}function Vx(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var $n=typeof Object.is=="function"?Object.is:Vx;function to(e,n){if($n(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var a=Object.keys(e),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!je.call(n,u)||!$n(e[u],n[u]))return!1}return!0}function Ip(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function zp(e,n){var a=Ip(e);e=0;for(var o;a;){if(a.nodeType===3){if(o=e+a.textContent.length,e<=n&&o>=n)return{node:a,offset:n-e};e=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Ip(a)}}function Fp(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Fp(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Bp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Wt(e.document);n instanceof e.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)e=n.contentWindow;else break;n=Wt(e.document)}return n}function Eu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var Xx=Ji&&"documentMode"in document&&11>=document.documentMode,Yr=null,bu=null,eo=null,Tu=!1;function Gp(e,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Tu||Yr==null||Yr!==Wt(o)||(o=Yr,"selectionStart"in o&&Eu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),eo&&to(eo,o)||(eo=o,o=nc(bu,"onSelect"),0<o.length&&(n=new hl("onSelect","select",null,n,a),e.push({event:n,listeners:o}),n.target=Yr)))}function cr(e,n){var a={};return a[e.toLowerCase()]=n.toLowerCase(),a["Webkit"+e]="webkit"+n,a["Moz"+e]="moz"+n,a}var jr={animationend:cr("Animation","AnimationEnd"),animationiteration:cr("Animation","AnimationIteration"),animationstart:cr("Animation","AnimationStart"),transitionrun:cr("Transition","TransitionRun"),transitionstart:cr("Transition","TransitionStart"),transitioncancel:cr("Transition","TransitionCancel"),transitionend:cr("Transition","TransitionEnd")},Au={},Hp={};Ji&&(Hp=document.createElement("div").style,"AnimationEvent"in window||(delete jr.animationend.animation,delete jr.animationiteration.animation,delete jr.animationstart.animation),"TransitionEvent"in window||delete jr.transitionend.transition);function ur(e){if(Au[e])return Au[e];if(!jr[e])return e;var n=jr[e],a;for(a in n)if(n.hasOwnProperty(a)&&a in Hp)return Au[e]=n[a];return e}var Vp=ur("animationend"),Xp=ur("animationiteration"),kp=ur("animationstart"),kx=ur("transitionrun"),Wx=ur("transitionstart"),qx=ur("transitioncancel"),Wp=ur("transitionend"),qp=new Map,Ru="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Ru.push("scrollEnd");function Ti(e,n){qp.set(e,n),J(n,[e])}var ml=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ui=[],Zr=0,Cu=0;function gl(){for(var e=Zr,n=Cu=Zr=0;n<e;){var a=ui[n];ui[n++]=null;var o=ui[n];ui[n++]=null;var u=ui[n];ui[n++]=null;var f=ui[n];if(ui[n++]=null,o!==null&&u!==null){var M=o.pending;M===null?u.next=u:(u.next=M.next,M.next=u),o.pending=u}f!==0&&Yp(a,u,f)}}function _l(e,n,a,o){ui[Zr++]=e,ui[Zr++]=n,ui[Zr++]=a,ui[Zr++]=o,Cu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function wu(e,n,a,o){return _l(e,n,a,o),vl(e)}function fr(e,n){return _l(e,null,null,n),vl(e)}function Yp(e,n,a){e.lanes|=a;var o=e.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=e.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(e=f.stateNode,e===null||e._visibility&1||(u=!0)),e=f,f=f.return;return e.tag===3?(f=e.stateNode,u&&n!==null&&(u=31-Ot(a),e=f.hiddenUpdates,o=e[u],o===null?e[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function vl(e){if(50<bo)throw bo=0,Bf=null,Error(r(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var Kr={};function Yx(e,n,a,o){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(e,n,a,o){return new Yx(e,n,a,o)}function Du(e){return e=e.prototype,!(!e||!e.isReactComponent)}function $i(e,n){var a=e.alternate;return a===null?(a=ti(e.tag,n,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=n,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,n=e.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function jp(e,n){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,n=a.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function xl(e,n,a,o,u,f){var M=0;if(o=e,typeof e=="function")Du(e)&&(M=1);else if(typeof e=="string")M=JS(e,a,yt.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case O:return e=ti(31,a,n,u),e.elementType=O,e.lanes=f,e;case A:return hr(a.children,u,f,n);case S:M=8,u|=24;break;case _:return e=ti(12,a,n,u|2),e.elementType=_,e.lanes=f,e;case B:return e=ti(13,a,n,u),e.elementType=B,e.lanes=f,e;case U:return e=ti(19,a,n,u),e.elementType=U,e.lanes=f,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case D:M=10;break t;case R:M=9;break t;case L:M=11;break t;case N:M=14;break t;case T:M=16,o=null;break t}M=29,a=Error(r(130,e===null?"null":typeof e,"")),o=null}return n=ti(M,a,n,u),n.elementType=e,n.type=o,n.lanes=f,n}function hr(e,n,a,o){return e=ti(7,e,o,n),e.lanes=a,e}function Uu(e,n,a){return e=ti(6,e,null,n),e.lanes=a,e}function Zp(e){var n=ti(18,null,null,0);return n.stateNode=e,n}function Lu(e,n,a){return n=ti(4,e.children!==null?e.children:[],e.key,n),n.lanes=a,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var Kp=new WeakMap;function fi(e,n){if(typeof e=="object"&&e!==null){var a=Kp.get(e);return a!==void 0?a:(n={value:e,source:n,stack:V(n)},Kp.set(e,n),n)}return{value:e,source:n,stack:V(n)}}var Qr=[],Jr=0,Sl=null,no=0,hi=[],di=0,Ca=null,Pi=1,Ii="";function ta(e,n){Qr[Jr++]=no,Qr[Jr++]=Sl,Sl=e,no=n}function Qp(e,n,a){hi[di++]=Pi,hi[di++]=Ii,hi[di++]=Ca,Ca=e;var o=Pi;e=Ii;var u=32-Ot(o)-1;o&=~(1<<u),a+=1;var f=32-Ot(n)+u;if(30<f){var M=u-u%5;f=(o&(1<<M)-1).toString(32),o>>=M,u-=M,Pi=1<<32-Ot(n)+u|a<<u|o,Ii=f+e}else Pi=1<<f|a<<u|o,Ii=e}function Nu(e){e.return!==null&&(ta(e,1),Qp(e,1,0))}function Ou(e){for(;e===Sl;)Sl=Qr[--Jr],Qr[Jr]=null,no=Qr[--Jr],Qr[Jr]=null;for(;e===Ca;)Ca=hi[--di],hi[di]=null,Ii=hi[--di],hi[di]=null,Pi=hi[--di],hi[di]=null}function Jp(e,n){hi[di++]=Pi,hi[di++]=Ii,hi[di++]=Ca,Pi=n.id,Ii=n.overflow,Ca=e}var En=null,qe=null,ye=!1,wa=null,pi=!1,Pu=Error(r(519));function Da(e){var n=Error(r(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw io(fi(n,e)),Pu}function $p(e){var n=e.stateNode,a=e.type,o=e.memoizedProps;switch(n[sn]=e,n[pn]=o,a){case"dialog":xe("cancel",n),xe("close",n);break;case"iframe":case"object":case"embed":xe("load",n);break;case"video":case"audio":for(a=0;a<Ao.length;a++)xe(Ao[a],n);break;case"source":xe("error",n);break;case"img":case"image":case"link":xe("error",n),xe("load",n);break;case"details":xe("toggle",n);break;case"input":xe("invalid",n),Qn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":xe("invalid",n);break;case"textarea":xe("invalid",n),on(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||gg(n.textContent,a)?(o.popover!=null&&(xe("beforetoggle",n),xe("toggle",n)),o.onScroll!=null&&xe("scroll",n),o.onScrollEnd!=null&&xe("scrollend",n),o.onClick!=null&&(n.onclick=Qi),n=!0):n=!1,n||Da(e,!0)}function tm(e){for(En=e.return;En;)switch(En.tag){case 5:case 31:case 13:pi=!1;return;case 27:case 3:pi=!0;return;default:En=En.return}}function $r(e){if(e!==En)return!1;if(!ye)return tm(e),ye=!0,!1;var n=e.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||th(e.type,e.memoizedProps)),a=!a),a&&qe&&Da(e),tm(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));qe=Tg(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(317));qe=Tg(e)}else n===27?(n=qe,ka(e.type)?(e=rh,rh=null,qe=e):qe=n):qe=En?gi(e.stateNode.nextSibling):null;return!0}function dr(){qe=En=null,ye=!1}function Iu(){var e=wa;return e!==null&&(Yn===null?Yn=e:Yn.push.apply(Yn,e),wa=null),e}function io(e){wa===null?wa=[e]:wa.push(e)}var zu=P(null),pr=null,ea=null;function Ua(e,n,a){ct(zu,n._currentValue),n._currentValue=a}function na(e){e._currentValue=zu.current,k(zu)}function Fu(e,n,a){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===a)break;e=e.return}}function Bu(e,n,a,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var f=u.dependencies;if(f!==null){var M=u.child;f=f.firstContext;t:for(;f!==null;){var C=f;f=u;for(var H=0;H<n.length;H++)if(C.context===n[H]){f.lanes|=a,C=f.alternate,C!==null&&(C.lanes|=a),Fu(f.return,a,e),o||(M=null);break t}f=C.next}}else if(u.tag===18){if(M=u.return,M===null)throw Error(r(341));M.lanes|=a,f=M.alternate,f!==null&&(f.lanes|=a),Fu(M,a,e),M=null}else M=u.child;if(M!==null)M.return=u;else for(M=u;M!==null;){if(M===e){M=null;break}if(u=M.sibling,u!==null){u.return=M.return,M=u;break}M=M.return}u=M}}function ts(e,n,a,o){e=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var M=u.alternate;if(M===null)throw Error(r(387));if(M=M.memoizedProps,M!==null){var C=u.type;$n(u.pendingProps.value,M.value)||(e!==null?e.push(C):e=[C])}}else if(u===pt.current){if(M=u.alternate,M===null)throw Error(r(387));M.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Uo):e=[Uo])}u=u.return}e!==null&&Bu(n,e,a,o),n.flags|=262144}function Ml(e){for(e=e.firstContext;e!==null;){if(!$n(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function mr(e){pr=e,ea=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function bn(e){return em(pr,e)}function yl(e,n){return pr===null&&mr(e),em(e,n)}function em(e,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ea===null){if(e===null)throw Error(r(308));ea=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else ea=ea.next=n;return a}var jx=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(a,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(a){return a()})}},Zx=s.unstable_scheduleCallback,Kx=s.unstable_NormalPriority,cn={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Gu(){return{controller:new jx,data:new Map,refCount:0}}function ao(e){e.refCount--,e.refCount===0&&Zx(Kx,function(){e.controller.abort()})}var ro=null,Hu=0,es=0,ns=null;function Qx(e,n){if(ro===null){var a=ro=[];Hu=0,es=Wf(),ns={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Hu++,n.then(nm,nm),n}function nm(){if(--Hu===0&&ro!==null){ns!==null&&(ns.status="fulfilled");var e=ro;ro=null,es=0,ns=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function Jx(e,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var im=I.S;I.S=function(e,n){G0=b(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Qx(e,n),im!==null&&im(e,n)};var gr=P(null);function Vu(){var e=gr.current;return e!==null?e:We.pooledCache}function El(e,n){n===null?ct(gr,gr.current):ct(gr,n.pool)}function am(){var e=Vu();return e===null?null:{parent:cn._currentValue,pool:e}}var is=Error(r(460)),Xu=Error(r(474)),bl=Error(r(542)),Tl={then:function(){}};function rm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function sm(e,n,a){switch(a=e[a],a===void 0?e.push(n):a!==n&&(n.then(Qi,Qi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,lm(e),e;default:if(typeof n.status=="string")n.then(Qi,Qi);else{if(e=We,e!==null&&100<e.shellSuspendCounter)throw Error(r(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,lm(e),e}throw vr=n,is}}function _r(e){try{var n=e._init;return n(e._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(vr=a,is):a}}var vr=null;function om(){if(vr===null)throw Error(r(459));var e=vr;return vr=null,e}function lm(e){if(e===is||e===bl)throw Error(r(483))}var as=null,so=0;function Al(e){var n=so;return so+=1,as===null&&(as=[]),sm(as,e,n)}function oo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function Rl(e,n){throw n.$$typeof===g?Error(r(525)):(e=Object.prototype.toString.call(n),Error(r(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function cm(e){function n(j,X){if(e){var tt=j.deletions;tt===null?(j.deletions=[X],j.flags|=16):tt.push(X)}}function a(j,X){if(!e)return null;for(;X!==null;)n(j,X),X=X.sibling;return null}function o(j){for(var X=new Map;j!==null;)j.key!==null?X.set(j.key,j):X.set(j.index,j),j=j.sibling;return X}function u(j,X){return j=$i(j,X),j.index=0,j.sibling=null,j}function f(j,X,tt){return j.index=tt,e?(tt=j.alternate,tt!==null?(tt=tt.index,tt<X?(j.flags|=67108866,X):tt):(j.flags|=67108866,X)):(j.flags|=1048576,X)}function M(j){return e&&j.alternate===null&&(j.flags|=67108866),j}function C(j,X,tt,_t){return X===null||X.tag!==6?(X=Uu(tt,j.mode,_t),X.return=j,X):(X=u(X,tt),X.return=j,X)}function H(j,X,tt,_t){var $t=tt.type;return $t===A?mt(j,X,tt.props.children,_t,tt.key):X!==null&&(X.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===T&&_r($t)===X.type)?(X=u(X,tt.props),oo(X,tt),X.return=j,X):(X=xl(tt.type,tt.key,tt.props,null,j.mode,_t),oo(X,tt),X.return=j,X)}function et(j,X,tt,_t){return X===null||X.tag!==4||X.stateNode.containerInfo!==tt.containerInfo||X.stateNode.implementation!==tt.implementation?(X=Lu(tt,j.mode,_t),X.return=j,X):(X=u(X,tt.children||[]),X.return=j,X)}function mt(j,X,tt,_t,$t){return X===null||X.tag!==7?(X=hr(tt,j.mode,_t,$t),X.return=j,X):(X=u(X,tt),X.return=j,X)}function xt(j,X,tt){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return X=Uu(""+X,j.mode,tt),X.return=j,X;if(typeof X=="object"&&X!==null){switch(X.$$typeof){case y:return tt=xl(X.type,X.key,X.props,null,j.mode,tt),oo(tt,X),tt.return=j,tt;case E:return X=Lu(X,j.mode,tt),X.return=j,X;case T:return X=_r(X),xt(j,X,tt)}if(Q(X)||Z(X))return X=hr(X,j.mode,tt,null),X.return=j,X;if(typeof X.then=="function")return xt(j,Al(X),tt);if(X.$$typeof===D)return xt(j,yl(j,X),tt);Rl(j,X)}return null}function at(j,X,tt,_t){var $t=X!==null?X.key:null;if(typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint")return $t!==null?null:C(j,X,""+tt,_t);if(typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case y:return tt.key===$t?H(j,X,tt,_t):null;case E:return tt.key===$t?et(j,X,tt,_t):null;case T:return tt=_r(tt),at(j,X,tt,_t)}if(Q(tt)||Z(tt))return $t!==null?null:mt(j,X,tt,_t,null);if(typeof tt.then=="function")return at(j,X,Al(tt),_t);if(tt.$$typeof===D)return at(j,X,yl(j,tt),_t);Rl(j,tt)}return null}function lt(j,X,tt,_t,$t){if(typeof _t=="string"&&_t!==""||typeof _t=="number"||typeof _t=="bigint")return j=j.get(tt)||null,C(X,j,""+_t,$t);if(typeof _t=="object"&&_t!==null){switch(_t.$$typeof){case y:return j=j.get(_t.key===null?tt:_t.key)||null,H(X,j,_t,$t);case E:return j=j.get(_t.key===null?tt:_t.key)||null,et(X,j,_t,$t);case T:return _t=_r(_t),lt(j,X,tt,_t,$t)}if(Q(_t)||Z(_t))return j=j.get(tt)||null,mt(X,j,_t,$t,null);if(typeof _t.then=="function")return lt(j,X,tt,Al(_t),$t);if(_t.$$typeof===D)return lt(j,X,tt,yl(X,_t),$t);Rl(X,_t)}return null}function kt(j,X,tt,_t){for(var $t=null,we=null,Zt=X,de=X=0,Me=null;Zt!==null&&de<tt.length;de++){Zt.index>de?(Me=Zt,Zt=null):Me=Zt.sibling;var De=at(j,Zt,tt[de],_t);if(De===null){Zt===null&&(Zt=Me);break}e&&Zt&&De.alternate===null&&n(j,Zt),X=f(De,X,de),we===null?$t=De:we.sibling=De,we=De,Zt=Me}if(de===tt.length)return a(j,Zt),ye&&ta(j,de),$t;if(Zt===null){for(;de<tt.length;de++)Zt=xt(j,tt[de],_t),Zt!==null&&(X=f(Zt,X,de),we===null?$t=Zt:we.sibling=Zt,we=Zt);return ye&&ta(j,de),$t}for(Zt=o(Zt);de<tt.length;de++)Me=lt(Zt,j,de,tt[de],_t),Me!==null&&(e&&Me.alternate!==null&&Zt.delete(Me.key===null?de:Me.key),X=f(Me,X,de),we===null?$t=Me:we.sibling=Me,we=Me);return e&&Zt.forEach(function(Za){return n(j,Za)}),ye&&ta(j,de),$t}function ee(j,X,tt,_t){if(tt==null)throw Error(r(151));for(var $t=null,we=null,Zt=X,de=X=0,Me=null,De=tt.next();Zt!==null&&!De.done;de++,De=tt.next()){Zt.index>de?(Me=Zt,Zt=null):Me=Zt.sibling;var Za=at(j,Zt,De.value,_t);if(Za===null){Zt===null&&(Zt=Me);break}e&&Zt&&Za.alternate===null&&n(j,Zt),X=f(Za,X,de),we===null?$t=Za:we.sibling=Za,we=Za,Zt=Me}if(De.done)return a(j,Zt),ye&&ta(j,de),$t;if(Zt===null){for(;!De.done;de++,De=tt.next())De=xt(j,De.value,_t),De!==null&&(X=f(De,X,de),we===null?$t=De:we.sibling=De,we=De);return ye&&ta(j,de),$t}for(Zt=o(Zt);!De.done;de++,De=tt.next())De=lt(Zt,j,de,De.value,_t),De!==null&&(e&&De.alternate!==null&&Zt.delete(De.key===null?de:De.key),X=f(De,X,de),we===null?$t=De:we.sibling=De,we=De);return e&&Zt.forEach(function(cM){return n(j,cM)}),ye&&ta(j,de),$t}function ke(j,X,tt,_t){if(typeof tt=="object"&&tt!==null&&tt.type===A&&tt.key===null&&(tt=tt.props.children),typeof tt=="object"&&tt!==null){switch(tt.$$typeof){case y:t:{for(var $t=tt.key;X!==null;){if(X.key===$t){if($t=tt.type,$t===A){if(X.tag===7){a(j,X.sibling),_t=u(X,tt.props.children),_t.return=j,j=_t;break t}}else if(X.elementType===$t||typeof $t=="object"&&$t!==null&&$t.$$typeof===T&&_r($t)===X.type){a(j,X.sibling),_t=u(X,tt.props),oo(_t,tt),_t.return=j,j=_t;break t}a(j,X);break}else n(j,X);X=X.sibling}tt.type===A?(_t=hr(tt.props.children,j.mode,_t,tt.key),_t.return=j,j=_t):(_t=xl(tt.type,tt.key,tt.props,null,j.mode,_t),oo(_t,tt),_t.return=j,j=_t)}return M(j);case E:t:{for($t=tt.key;X!==null;){if(X.key===$t)if(X.tag===4&&X.stateNode.containerInfo===tt.containerInfo&&X.stateNode.implementation===tt.implementation){a(j,X.sibling),_t=u(X,tt.children||[]),_t.return=j,j=_t;break t}else{a(j,X);break}else n(j,X);X=X.sibling}_t=Lu(tt,j.mode,_t),_t.return=j,j=_t}return M(j);case T:return tt=_r(tt),ke(j,X,tt,_t)}if(Q(tt))return kt(j,X,tt,_t);if(Z(tt)){if($t=Z(tt),typeof $t!="function")throw Error(r(150));return tt=$t.call(tt),ee(j,X,tt,_t)}if(typeof tt.then=="function")return ke(j,X,Al(tt),_t);if(tt.$$typeof===D)return ke(j,X,yl(j,tt),_t);Rl(j,tt)}return typeof tt=="string"&&tt!==""||typeof tt=="number"||typeof tt=="bigint"?(tt=""+tt,X!==null&&X.tag===6?(a(j,X.sibling),_t=u(X,tt),_t.return=j,j=_t):(a(j,X),_t=Uu(tt,j.mode,_t),_t.return=j,j=_t),M(j)):a(j,X)}return function(j,X,tt,_t){try{so=0;var $t=ke(j,X,tt,_t);return as=null,$t}catch(Zt){if(Zt===is||Zt===bl)throw Zt;var we=ti(29,Zt,null,j.mode);return we.lanes=_t,we.return=j,we}}}var xr=cm(!0),um=cm(!1),La=!1;function ku(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wu(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Na(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Oa(e,n,a){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Oe&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=vl(e),Yp(e,null,a),n}return _l(e,o,n,a),vl(e)}function lo(e,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Br(e,a)}}function qu(e,n){var a=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var M={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=M:f=f.next=M,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=n:e.next=n,a.lastBaseUpdate=n}var Yu=!1;function co(){if(Yu){var e=ns;if(e!==null)throw e}}function uo(e,n,a,o){Yu=!1;var u=e.updateQueue;La=!1;var f=u.firstBaseUpdate,M=u.lastBaseUpdate,C=u.shared.pending;if(C!==null){u.shared.pending=null;var H=C,et=H.next;H.next=null,M===null?f=et:M.next=et,M=H;var mt=e.alternate;mt!==null&&(mt=mt.updateQueue,C=mt.lastBaseUpdate,C!==M&&(C===null?mt.firstBaseUpdate=et:C.next=et,mt.lastBaseUpdate=H))}if(f!==null){var xt=u.baseState;M=0,mt=et=H=null,C=f;do{var at=C.lane&-536870913,lt=at!==C.lane;if(lt?(Se&at)===at:(o&at)===at){at!==0&&at===es&&(Yu=!0),mt!==null&&(mt=mt.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});t:{var kt=e,ee=C;at=n;var ke=a;switch(ee.tag){case 1:if(kt=ee.payload,typeof kt=="function"){xt=kt.call(ke,xt,at);break t}xt=kt;break t;case 3:kt.flags=kt.flags&-65537|128;case 0:if(kt=ee.payload,at=typeof kt=="function"?kt.call(ke,xt,at):kt,at==null)break t;xt=x({},xt,at);break t;case 2:La=!0}}at=C.callback,at!==null&&(e.flags|=64,lt&&(e.flags|=8192),lt=u.callbacks,lt===null?u.callbacks=[at]:lt.push(at))}else lt={lane:at,tag:C.tag,payload:C.payload,callback:C.callback,next:null},mt===null?(et=mt=lt,H=xt):mt=mt.next=lt,M|=at;if(C=C.next,C===null){if(C=u.shared.pending,C===null)break;lt=C,C=lt.next,lt.next=null,u.lastBaseUpdate=lt,u.shared.pending=null}}while(!0);mt===null&&(H=xt),u.baseState=H,u.firstBaseUpdate=et,u.lastBaseUpdate=mt,f===null&&(u.shared.lanes=0),Ba|=M,e.lanes=M,e.memoizedState=xt}}function fm(e,n){if(typeof e!="function")throw Error(r(191,e));e.call(n)}function hm(e,n){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)fm(a[e],n)}var rs=P(null),Cl=P(0);function dm(e,n){e=fa,ct(Cl,e),ct(rs,n),fa=e|n.baseLanes}function ju(){ct(Cl,fa),ct(rs,rs.current)}function Zu(){fa=Cl.current,k(rs),k(Cl)}var ei=P(null),mi=null;function Pa(e){var n=e.alternate;ct(an,an.current&1),ct(ei,e),mi===null&&(n===null||rs.current!==null||n.memoizedState!==null)&&(mi=e)}function Ku(e){ct(an,an.current),ct(ei,e),mi===null&&(mi=e)}function pm(e){e.tag===22?(ct(an,an.current),ct(ei,e),mi===null&&(mi=e)):Ia()}function Ia(){ct(an,an.current),ct(ei,ei.current)}function ni(e){k(ei),mi===e&&(mi=null),k(an)}var an=P(0);function wl(e){for(var n=e;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ih(a)||ah(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ia=0,ue=null,Ve=null,un=null,Dl=!1,ss=!1,Sr=!1,Ul=0,fo=0,os=null,$x=0;function tn(){throw Error(r(321))}function Qu(e,n){if(n===null)return!1;for(var a=0;a<n.length&&a<e.length;a++)if(!$n(e[a],n[a]))return!1;return!0}function Ju(e,n,a,o,u,f){return ia=f,ue=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,I.H=e===null||e.memoizedState===null?Qm:pf,Sr=!1,f=a(o,u),Sr=!1,ss&&(f=gm(n,a,o,u)),mm(e),f}function mm(e){I.H=mo;var n=Ve!==null&&Ve.next!==null;if(ia=0,un=Ve=ue=null,Dl=!1,fo=0,os=null,n)throw Error(r(300));e===null||fn||(e=e.dependencies,e!==null&&Ml(e)&&(fn=!0))}function gm(e,n,a,o){ue=e;var u=0;do{if(ss&&(os=null),fo=0,ss=!1,25<=u)throw Error(r(301));if(u+=1,un=Ve=null,e.updateQueue!=null){var f=e.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}I.H=Jm,f=n(a,o)}while(ss);return f}function tS(){var e=I.H,n=e.useState()[0];return n=typeof n.then=="function"?ho(n):n,e=e.useState()[0],(Ve!==null?Ve.memoizedState:null)!==e&&(ue.flags|=1024),n}function $u(){var e=Ul!==0;return Ul=0,e}function tf(e,n,a){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a}function ef(e){if(Dl){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Dl=!1}ia=0,un=Ve=ue=null,ss=!1,fo=Ul=0,os=null}function Fn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return un===null?ue.memoizedState=un=e:un=un.next=e,un}function rn(){if(Ve===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=Ve.next;var n=un===null?ue.memoizedState:un.next;if(n!==null)un=n,Ve=e;else{if(e===null)throw ue.alternate===null?Error(r(467)):Error(r(310));Ve=e,e={memoizedState:Ve.memoizedState,baseState:Ve.baseState,baseQueue:Ve.baseQueue,queue:Ve.queue,next:null},un===null?ue.memoizedState=un=e:un=un.next=e}return un}function Ll(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ho(e){var n=fo;return fo+=1,os===null&&(os=[]),e=sm(os,e,n),n=ue,(un===null?n.memoizedState:un.next)===null&&(n=n.alternate,I.H=n===null||n.memoizedState===null?Qm:pf),e}function Nl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ho(e);if(e.$$typeof===D)return bn(e)}throw Error(r(438,String(e)))}function nf(e){var n=null,a=ue.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ue.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=Ll(),ue.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(e),o=0;o<e;o++)a[o]=ft;return n.index++,a}function aa(e,n){return typeof n=="function"?n(e):n}function Ol(e){var n=rn();return af(n,Ve,e)}function af(e,n,a){var o=e.queue;if(o===null)throw Error(r(311));o.lastRenderedReducer=a;var u=e.baseQueue,f=o.pending;if(f!==null){if(u!==null){var M=u.next;u.next=f.next,f.next=M}n.baseQueue=u=f,o.pending=null}if(f=e.baseState,u===null)e.memoizedState=f;else{n=u.next;var C=M=null,H=null,et=n,mt=!1;do{var xt=et.lane&-536870913;if(xt!==et.lane?(Se&xt)===xt:(ia&xt)===xt){var at=et.revertLane;if(at===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null}),xt===es&&(mt=!0);else if((ia&at)===at){et=et.next,at===es&&(mt=!0);continue}else xt={lane:0,revertLane:et.revertLane,gesture:null,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},H===null?(C=H=xt,M=f):H=H.next=xt,ue.lanes|=at,Ba|=at;xt=et.action,Sr&&a(f,xt),f=et.hasEagerState?et.eagerState:a(f,xt)}else at={lane:xt,revertLane:et.revertLane,gesture:et.gesture,action:et.action,hasEagerState:et.hasEagerState,eagerState:et.eagerState,next:null},H===null?(C=H=at,M=f):H=H.next=at,ue.lanes|=xt,Ba|=xt;et=et.next}while(et!==null&&et!==n);if(H===null?M=f:H.next=C,!$n(f,e.memoizedState)&&(fn=!0,mt&&(a=ns,a!==null)))throw a;e.memoizedState=f,e.baseState=M,e.baseQueue=H,o.lastRenderedState=f}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function rf(e){var n=rn(),a=n.queue;if(a===null)throw Error(r(311));a.lastRenderedReducer=e;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var M=u=u.next;do f=e(f,M.action),M=M.next;while(M!==u);$n(f,n.memoizedState)||(fn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function _m(e,n,a){var o=ue,u=rn(),f=ye;if(f){if(a===void 0)throw Error(r(407));a=a()}else a=n();var M=!$n((Ve||u).memoizedState,a);if(M&&(u.memoizedState=a,fn=!0),u=u.queue,lf(Sm.bind(null,o,u,e),[e]),u.getSnapshot!==n||M||un!==null&&un.memoizedState.tag&1){if(o.flags|=2048,ls(9,{destroy:void 0},xm.bind(null,o,u,a,n),null),We===null)throw Error(r(349));f||(ia&127)!==0||vm(o,n,a)}return a}function vm(e,n,a){e.flags|=16384,e={getSnapshot:n,value:a},n=ue.updateQueue,n===null?(n=Ll(),ue.updateQueue=n,n.stores=[e]):(a=n.stores,a===null?n.stores=[e]:a.push(e))}function xm(e,n,a,o){n.value=a,n.getSnapshot=o,Mm(n)&&ym(e)}function Sm(e,n,a){return a(function(){Mm(n)&&ym(e)})}function Mm(e){var n=e.getSnapshot;e=e.value;try{var a=n();return!$n(e,a)}catch{return!0}}function ym(e){var n=fr(e,2);n!==null&&jn(n,e,2)}function sf(e){var n=Fn();if(typeof e=="function"){var a=e;if(e=a(),Sr){Pt(!0);try{a()}finally{Pt(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:e},n}function Em(e,n,a,o){return e.baseState=a,af(e,Ve,typeof o=="function"?o:aa)}function eS(e,n,a,o,u){if(zl(e))throw Error(r(485));if(e=n.action,e!==null){var f={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(M){f.listeners.push(M)}};I.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,bm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function bm(e,n){var a=n.action,o=n.payload,u=e.state;if(n.isTransition){var f=I.T,M={};I.T=M;try{var C=a(u,o),H=I.S;H!==null&&H(M,C),Tm(e,n,C)}catch(et){of(e,n,et)}finally{f!==null&&M.types!==null&&(f.types=M.types),I.T=f}}else try{f=a(u,o),Tm(e,n,f)}catch(et){of(e,n,et)}}function Tm(e,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Am(e,n,o)},function(o){return of(e,n,o)}):Am(e,n,a)}function Am(e,n,a){n.status="fulfilled",n.value=a,Rm(n),e.state=a,n=e.pending,n!==null&&(a=n.next,a===n?e.pending=null:(a=a.next,n.next=a,bm(e,a)))}function of(e,n,a){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Rm(n),n=n.next;while(n!==o)}e.action=null}function Rm(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Cm(e,n){return n}function wm(e,n){if(ye){var a=We.formState;if(a!==null){t:{var o=ue;if(ye){if(qe){e:{for(var u=qe,f=pi;u.nodeType!==8;){if(!f){u=null;break e}if(u=gi(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){qe=gi(u.nextSibling),o=u.data==="F!";break t}}Da(o)}o=!1}o&&(n=a[0])}}return a=Fn(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Cm,lastRenderedState:n},a.queue=o,a=jm.bind(null,ue,o),o.dispatch=a,o=sf(!1),f=df.bind(null,ue,!1,o.queue),o=Fn(),u={state:n,dispatch:null,action:e,pending:null},o.queue=u,a=eS.bind(null,ue,u,f,a),u.dispatch=a,o.memoizedState=e,[n,a,!1]}function Dm(e){var n=rn();return Um(n,Ve,e)}function Um(e,n,a){if(n=af(e,n,Cm)[0],e=Ol(aa)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=ho(n)}catch(M){throw M===is?bl:M}else o=n;n=rn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ue.flags|=2048,ls(9,{destroy:void 0},nS.bind(null,u,a),null)),[o,f,e]}function nS(e,n){e.action=n}function Lm(e){var n=rn(),a=Ve;if(a!==null)return Um(n,a,e);rn(),n=n.memoizedState,a=rn();var o=a.queue.dispatch;return a.memoizedState=e,[n,o,!1]}function ls(e,n,a,o){return e={tag:e,create:a,deps:o,inst:n,next:null},n=ue.updateQueue,n===null&&(n=Ll(),ue.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=e.next=e:(o=a.next,a.next=e,e.next=o,n.lastEffect=e),e}function Nm(){return rn().memoizedState}function Pl(e,n,a,o){var u=Fn();ue.flags|=e,u.memoizedState=ls(1|n,{destroy:void 0},a,o===void 0?null:o)}function Il(e,n,a,o){var u=rn();o=o===void 0?null:o;var f=u.memoizedState.inst;Ve!==null&&o!==null&&Qu(o,Ve.memoizedState.deps)?u.memoizedState=ls(n,f,a,o):(ue.flags|=e,u.memoizedState=ls(1|n,f,a,o))}function Om(e,n){Pl(8390656,8,e,n)}function lf(e,n){Il(2048,8,e,n)}function iS(e){ue.flags|=4;var n=ue.updateQueue;if(n===null)n=Ll(),ue.updateQueue=n,n.events=[e];else{var a=n.events;a===null?n.events=[e]:a.push(e)}}function Pm(e){var n=rn().memoizedState;return iS({ref:n,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(r(440));return n.impl.apply(void 0,arguments)}}function Im(e,n){return Il(4,2,e,n)}function zm(e,n){return Il(4,4,e,n)}function Fm(e,n){if(typeof n=="function"){e=e();var a=n(e);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Bm(e,n,a){a=a!=null?a.concat([e]):null,Il(4,4,Fm.bind(null,n,e),a)}function cf(){}function Gm(e,n){var a=rn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&Qu(n,o[1])?o[0]:(a.memoizedState=[e,n],e)}function Hm(e,n){var a=rn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&Qu(n,o[1]))return o[0];if(o=e(),Sr){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[o,n],o}function uf(e,n,a){return a===void 0||(ia&1073741824)!==0&&(Se&261930)===0?e.memoizedState=n:(e.memoizedState=a,e=V0(),ue.lanes|=e,Ba|=e,a)}function Vm(e,n,a,o){return $n(a,n)?a:rs.current!==null?(e=uf(e,a,o),$n(e,n)||(fn=!0),e):(ia&42)===0||(ia&1073741824)!==0&&(Se&261930)===0?(fn=!0,e.memoizedState=a):(e=V0(),ue.lanes|=e,Ba|=e,n)}function Xm(e,n,a,o,u){var f=F.p;F.p=f!==0&&8>f?f:8;var M=I.T,C={};I.T=C,df(e,!1,n,a);try{var H=u(),et=I.S;if(et!==null&&et(C,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var mt=Jx(H,o);po(e,n,mt,ri(e))}else po(e,n,o,ri(e))}catch(xt){po(e,n,{then:function(){},status:"rejected",reason:xt},ri())}finally{F.p=f,M!==null&&C.types!==null&&(M.types=C.types),I.T=M}}function aS(){}function ff(e,n,a,o){if(e.tag!==5)throw Error(r(476));var u=km(e).queue;Xm(e,u,n,rt,a===null?aS:function(){return Wm(e),a(o)})}function km(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:rt,baseState:rt,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:rt},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:aa,lastRenderedState:a},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Wm(e){var n=km(e);n.next===null&&(n=e.alternate.memoizedState),po(e,n.next.queue,{},ri())}function hf(){return bn(Uo)}function qm(){return rn().memoizedState}function Ym(){return rn().memoizedState}function rS(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var a=ri();e=Na(a);var o=Oa(n,e,a);o!==null&&(jn(o,n,a),lo(o,n,a)),n={cache:Gu()},e.payload=n;return}n=n.return}}function sS(e,n,a){var o=ri();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},zl(e)?Zm(n,a):(a=wu(e,n,a,o),a!==null&&(jn(a,e,o),Km(a,n,o)))}function jm(e,n,a){var o=ri();po(e,n,a,o)}function po(e,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(zl(e))Zm(n,u);else{var f=e.alternate;if(e.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var M=n.lastRenderedState,C=f(M,a);if(u.hasEagerState=!0,u.eagerState=C,$n(C,M))return _l(e,n,u,0),We===null&&gl(),!1}catch{}if(a=wu(e,n,u,o),a!==null)return jn(a,e,o),Km(a,n,o),!0}return!1}function df(e,n,a,o){if(o={lane:2,revertLane:Wf(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},zl(e)){if(n)throw Error(r(479))}else n=wu(e,a,o,2),n!==null&&jn(n,e,2)}function zl(e){var n=e.alternate;return e===ue||n!==null&&n===ue}function Zm(e,n){ss=Dl=!0;var a=e.pending;a===null?n.next=n:(n.next=a.next,a.next=n),e.pending=n}function Km(e,n,a){if((a&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,a|=o,n.lanes=a,Br(e,a)}}var mo={readContext:bn,use:Nl,useCallback:tn,useContext:tn,useEffect:tn,useImperativeHandle:tn,useLayoutEffect:tn,useInsertionEffect:tn,useMemo:tn,useReducer:tn,useRef:tn,useState:tn,useDebugValue:tn,useDeferredValue:tn,useTransition:tn,useSyncExternalStore:tn,useId:tn,useHostTransitionStatus:tn,useFormState:tn,useActionState:tn,useOptimistic:tn,useMemoCache:tn,useCacheRefresh:tn};mo.useEffectEvent=tn;var Qm={readContext:bn,use:Nl,useCallback:function(e,n){return Fn().memoizedState=[e,n===void 0?null:n],e},useContext:bn,useEffect:Om,useImperativeHandle:function(e,n,a){a=a!=null?a.concat([e]):null,Pl(4194308,4,Fm.bind(null,n,e),a)},useLayoutEffect:function(e,n){return Pl(4194308,4,e,n)},useInsertionEffect:function(e,n){Pl(4,2,e,n)},useMemo:function(e,n){var a=Fn();n=n===void 0?null:n;var o=e();if(Sr){Pt(!0);try{e()}finally{Pt(!1)}}return a.memoizedState=[o,n],o},useReducer:function(e,n,a){var o=Fn();if(a!==void 0){var u=a(n);if(Sr){Pt(!0);try{a(n)}finally{Pt(!1)}}}else u=n;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=sS.bind(null,ue,e),[o.memoizedState,e]},useRef:function(e){var n=Fn();return e={current:e},n.memoizedState=e},useState:function(e){e=sf(e);var n=e.queue,a=jm.bind(null,ue,n);return n.dispatch=a,[e.memoizedState,a]},useDebugValue:cf,useDeferredValue:function(e,n){var a=Fn();return uf(a,e,n)},useTransition:function(){var e=sf(!1);return e=Xm.bind(null,ue,e.queue,!0,!1),Fn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,a){var o=ue,u=Fn();if(ye){if(a===void 0)throw Error(r(407));a=a()}else{if(a=n(),We===null)throw Error(r(349));(Se&127)!==0||vm(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,Om(Sm.bind(null,o,f,e),[e]),o.flags|=2048,ls(9,{destroy:void 0},xm.bind(null,o,f,a,n),null),a},useId:function(){var e=Fn(),n=We.identifierPrefix;if(ye){var a=Ii,o=Pi;a=(o&~(1<<32-Ot(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Ul++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=$x++,n="_"+n+"r_"+a.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:hf,useFormState:wm,useActionState:wm,useOptimistic:function(e){var n=Fn();n.memoizedState=n.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=df.bind(null,ue,!0,a),a.dispatch=n,[e,n]},useMemoCache:nf,useCacheRefresh:function(){return Fn().memoizedState=rS.bind(null,ue)},useEffectEvent:function(e){var n=Fn(),a={impl:e};return n.memoizedState=a,function(){if((Oe&2)!==0)throw Error(r(440));return a.impl.apply(void 0,arguments)}}},pf={readContext:bn,use:Nl,useCallback:Gm,useContext:bn,useEffect:lf,useImperativeHandle:Bm,useInsertionEffect:Im,useLayoutEffect:zm,useMemo:Hm,useReducer:Ol,useRef:Nm,useState:function(){return Ol(aa)},useDebugValue:cf,useDeferredValue:function(e,n){var a=rn();return Vm(a,Ve.memoizedState,e,n)},useTransition:function(){var e=Ol(aa)[0],n=rn().memoizedState;return[typeof e=="boolean"?e:ho(e),n]},useSyncExternalStore:_m,useId:qm,useHostTransitionStatus:hf,useFormState:Dm,useActionState:Dm,useOptimistic:function(e,n){var a=rn();return Em(a,Ve,e,n)},useMemoCache:nf,useCacheRefresh:Ym};pf.useEffectEvent=Pm;var Jm={readContext:bn,use:Nl,useCallback:Gm,useContext:bn,useEffect:lf,useImperativeHandle:Bm,useInsertionEffect:Im,useLayoutEffect:zm,useMemo:Hm,useReducer:rf,useRef:Nm,useState:function(){return rf(aa)},useDebugValue:cf,useDeferredValue:function(e,n){var a=rn();return Ve===null?uf(a,e,n):Vm(a,Ve.memoizedState,e,n)},useTransition:function(){var e=rf(aa)[0],n=rn().memoizedState;return[typeof e=="boolean"?e:ho(e),n]},useSyncExternalStore:_m,useId:qm,useHostTransitionStatus:hf,useFormState:Lm,useActionState:Lm,useOptimistic:function(e,n){var a=rn();return Ve!==null?Em(a,Ve,e,n):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:nf,useCacheRefresh:Ym};Jm.useEffectEvent=Pm;function mf(e,n,a,o){n=e.memoizedState,a=a(o,n),a=a==null?n:x({},n,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var gf={enqueueSetState:function(e,n,a){e=e._reactInternals;var o=ri(),u=Na(o);u.payload=n,a!=null&&(u.callback=a),n=Oa(e,u,o),n!==null&&(jn(n,e,o),lo(n,e,o))},enqueueReplaceState:function(e,n,a){e=e._reactInternals;var o=ri(),u=Na(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Oa(e,u,o),n!==null&&(jn(n,e,o),lo(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var a=ri(),o=Na(a);o.tag=2,n!=null&&(o.callback=n),n=Oa(e,o,a),n!==null&&(jn(n,e,a),lo(n,e,a))}};function $m(e,n,a,o,u,f,M){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,f,M):n.prototype&&n.prototype.isPureReactComponent?!to(a,o)||!to(u,f):!0}function t0(e,n,a,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==e&&gf.enqueueReplaceState(n,n.state,null)}function Mr(e,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(e=e.defaultProps){a===n&&(a=x({},a));for(var u in e)a[u]===void 0&&(a[u]=e[u])}return a}function e0(e){ml(e)}function n0(e){console.error(e)}function i0(e){ml(e)}function Fl(e,n){try{var a=e.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function a0(e,n,a){try{var o=e.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function _f(e,n,a){return a=Na(a),a.tag=3,a.payload={element:null},a.callback=function(){Fl(e,n)},a}function r0(e){return e=Na(e),e.tag=3,e}function s0(e,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;e.payload=function(){return u(f)},e.callback=function(){a0(n,a,o)}}var M=a.stateNode;M!==null&&typeof M.componentDidCatch=="function"&&(e.callback=function(){a0(n,a,o),typeof u!="function"&&(Ga===null?Ga=new Set([this]):Ga.add(this));var C=o.stack;this.componentDidCatch(o.value,{componentStack:C!==null?C:""})})}function oS(e,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&ts(n,a,u,!0),a=ei.current,a!==null){switch(a.tag){case 31:case 13:return mi===null?Kl():a.alternate===null&&en===0&&(en=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Tl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Vf(e,o,u)),!1;case 22:return a.flags|=65536,o===Tl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Vf(e,o,u)),!1}throw Error(r(435,a.tag))}return Vf(e,o,u),Kl(),!1}if(ye)return n=ei.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Pu&&(e=Error(r(422),{cause:o}),io(fi(e,a)))):(o!==Pu&&(n=Error(r(423),{cause:o}),io(fi(n,a))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=fi(o,a),u=_f(e.stateNode,o,u),qu(e,u),en!==4&&(en=2)),!1;var f=Error(r(520),{cause:o});if(f=fi(f,a),Eo===null?Eo=[f]:Eo.push(f),en!==4&&(en=2),n===null)return!0;o=fi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,e=u&-u,a.lanes|=e,e=_f(a.stateNode,o,e),qu(a,e),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Ga===null||!Ga.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=r0(u),s0(u,e,a,o),qu(a,u),!1}a=a.return}while(a!==null);return!1}var vf=Error(r(461)),fn=!1;function Tn(e,n,a,o){n.child=e===null?um(n,null,a,o):xr(n,e.child,a,o)}function o0(e,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var M={};for(var C in o)C!=="ref"&&(M[C]=o[C])}else M=o;return mr(n),o=Ju(e,n,a,M,f,u),C=$u(),e!==null&&!fn?(tf(e,n,u),ra(e,n,u)):(ye&&C&&Nu(n),n.flags|=1,Tn(e,n,o,u),n.child)}function l0(e,n,a,o,u){if(e===null){var f=a.type;return typeof f=="function"&&!Du(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,c0(e,n,f,o,u)):(e=xl(a.type,null,o,n,n.mode,u),e.ref=n.ref,e.return=n,n.child=e)}if(f=e.child,!Af(e,u)){var M=f.memoizedProps;if(a=a.compare,a=a!==null?a:to,a(M,o)&&e.ref===n.ref)return ra(e,n,u)}return n.flags|=1,e=$i(f,o),e.ref=n.ref,e.return=n,n.child=e}function c0(e,n,a,o,u){if(e!==null){var f=e.memoizedProps;if(to(f,o)&&e.ref===n.ref)if(fn=!1,n.pendingProps=o=f,Af(e,u))(e.flags&131072)!==0&&(fn=!0);else return n.lanes=e.lanes,ra(e,n,u)}return xf(e,n,a,o,u)}function u0(e,n,a,o){var u=o.children,f=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,e!==null){for(o=n.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return f0(e,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&El(n,f!==null?f.cachePool:null),f!==null?dm(n,f):ju(),pm(n);else return o=n.lanes=536870912,f0(e,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(El(n,f.cachePool),dm(n,f),Ia(),n.memoizedState=null):(e!==null&&El(n,null),ju(),Ia());return Tn(e,n,u,a),n.child}function go(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function f0(e,n,a,o,u){var f=Vu();return f=f===null?null:{parent:cn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},e!==null&&El(n,null),ju(),pm(n),e!==null&&ts(e,n,o,!0),n.childLanes=u,null}function Bl(e,n){return n=Hl({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function h0(e,n,a){return xr(n,e.child,null,a),e=Bl(n,n.pendingProps),e.flags|=2,ni(n),n.memoizedState=null,e}function lS(e,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(ye){if(o.mode==="hidden")return e=Bl(n,o),n.lanes=536870912,go(null,e);if(Ku(n),(e=qe)?(e=bg(e,pi),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ca!==null?{id:Pi,overflow:Ii}:null,retryLane:536870912,hydrationErrors:null},a=Zp(e),a.return=n,n.child=a,En=n,qe=null)):e=null,e===null)throw Da(n);return n.lanes=536870912,null}return Bl(n,o)}var f=e.memoizedState;if(f!==null){var M=f.dehydrated;if(Ku(n),u)if(n.flags&256)n.flags&=-257,n=h0(e,n,a);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(r(558));else if(fn||ts(e,n,a,!1),u=(a&e.childLanes)!==0,fn||u){if(o=We,o!==null&&(M=al(o,a),M!==0&&M!==f.retryLane))throw f.retryLane=M,fr(e,M),jn(o,e,M),vf;Kl(),n=h0(e,n,a)}else e=f.treeContext,qe=gi(M.nextSibling),En=n,ye=!0,wa=null,pi=!1,e!==null&&Jp(n,e),n=Bl(n,o),n.flags|=4096;return n}return e=$i(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Gl(e,n){var a=n.ref;if(a===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(r(284));(e===null||e.ref!==a)&&(n.flags|=4194816)}}function xf(e,n,a,o,u){return mr(n),a=Ju(e,n,a,o,void 0,u),o=$u(),e!==null&&!fn?(tf(e,n,u),ra(e,n,u)):(ye&&o&&Nu(n),n.flags|=1,Tn(e,n,a,u),n.child)}function d0(e,n,a,o,u,f){return mr(n),n.updateQueue=null,a=gm(n,o,a,u),mm(e),o=$u(),e!==null&&!fn?(tf(e,n,f),ra(e,n,f)):(ye&&o&&Nu(n),n.flags|=1,Tn(e,n,a,f),n.child)}function p0(e,n,a,o,u){if(mr(n),n.stateNode===null){var f=Kr,M=a.contextType;typeof M=="object"&&M!==null&&(f=bn(M)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=gf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},ku(n),M=a.contextType,f.context=typeof M=="object"&&M!==null?bn(M):Kr,f.state=n.memoizedState,M=a.getDerivedStateFromProps,typeof M=="function"&&(mf(n,a,M,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(M=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),M!==f.state&&gf.enqueueReplaceState(f,f.state,null),uo(n,o,f,u),co(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){f=n.stateNode;var C=n.memoizedProps,H=Mr(a,C);f.props=H;var et=f.context,mt=a.contextType;M=Kr,typeof mt=="object"&&mt!==null&&(M=bn(mt));var xt=a.getDerivedStateFromProps;mt=typeof xt=="function"||typeof f.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,mt||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(C||et!==M)&&t0(n,f,o,M),La=!1;var at=n.memoizedState;f.state=at,uo(n,o,f,u),co(),et=n.memoizedState,C||at!==et||La?(typeof xt=="function"&&(mf(n,a,xt,o),et=n.memoizedState),(H=La||$m(n,a,H,o,at,et,M))?(mt||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=et),f.props=o,f.state=et,f.context=M,o=H):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,Wu(e,n),M=n.memoizedProps,mt=Mr(a,M),f.props=mt,xt=n.pendingProps,at=f.context,et=a.contextType,H=Kr,typeof et=="object"&&et!==null&&(H=bn(et)),C=a.getDerivedStateFromProps,(et=typeof C=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(M!==xt||at!==H)&&t0(n,f,o,H),La=!1,at=n.memoizedState,f.state=at,uo(n,o,f,u),co();var lt=n.memoizedState;M!==xt||at!==lt||La||e!==null&&e.dependencies!==null&&Ml(e.dependencies)?(typeof C=="function"&&(mf(n,a,C,o),lt=n.memoizedState),(mt=La||$m(n,a,mt,o,at,lt,H)||e!==null&&e.dependencies!==null&&Ml(e.dependencies))?(et||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,lt,H),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,lt,H)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||M===e.memoizedProps&&at===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&at===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=lt),f.props=o,f.state=lt,f.context=H,o=mt):(typeof f.componentDidUpdate!="function"||M===e.memoizedProps&&at===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||M===e.memoizedProps&&at===e.memoizedState||(n.flags|=1024),o=!1)}return f=o,Gl(e,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,e!==null&&o?(n.child=xr(n,e.child,null,u),n.child=xr(n,null,a,u)):Tn(e,n,a,u),n.memoizedState=f.state,e=n.child):e=ra(e,n,u),e}function m0(e,n,a,o){return dr(),n.flags|=256,Tn(e,n,a,o),n.child}var Sf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Mf(e){return{baseLanes:e,cachePool:am()}}function yf(e,n,a){return e=e!==null?e.childLanes&~a:0,n&&(e|=ai),e}function g0(e,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,M;if((M=f)||(M=e!==null&&e.memoizedState===null?!1:(an.current&2)!==0),M&&(u=!0,n.flags&=-129),M=(n.flags&32)!==0,n.flags&=-33,e===null){if(ye){if(u?Pa(n):Ia(),(e=qe)?(e=bg(e,pi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:Ca!==null?{id:Pi,overflow:Ii}:null,retryLane:536870912,hydrationErrors:null},a=Zp(e),a.return=n,n.child=a,En=n,qe=null)):e=null,e===null)throw Da(n);return ah(e)?n.lanes=32:n.lanes=536870912,null}var C=o.children;return o=o.fallback,u?(Ia(),u=n.mode,C=Hl({mode:"hidden",children:C},u),o=hr(o,u,a,null),C.return=n,o.return=n,C.sibling=o,n.child=C,o=n.child,o.memoizedState=Mf(a),o.childLanes=yf(e,M,a),n.memoizedState=Sf,go(null,o)):(Pa(n),Ef(n,C))}var H=e.memoizedState;if(H!==null&&(C=H.dehydrated,C!==null)){if(f)n.flags&256?(Pa(n),n.flags&=-257,n=bf(e,n,a)):n.memoizedState!==null?(Ia(),n.child=e.child,n.flags|=128,n=null):(Ia(),C=o.fallback,u=n.mode,o=Hl({mode:"visible",children:o.children},u),C=hr(C,u,a,null),C.flags|=2,o.return=n,C.return=n,o.sibling=C,n.child=o,xr(n,e.child,null,a),o=n.child,o.memoizedState=Mf(a),o.childLanes=yf(e,M,a),n.memoizedState=Sf,n=go(null,o));else if(Pa(n),ah(C)){if(M=C.nextSibling&&C.nextSibling.dataset,M)var et=M.dgst;M=et,o=Error(r(419)),o.stack="",o.digest=M,io({value:o,source:null,stack:null}),n=bf(e,n,a)}else if(fn||ts(e,n,a,!1),M=(a&e.childLanes)!==0,fn||M){if(M=We,M!==null&&(o=al(M,a),o!==0&&o!==H.retryLane))throw H.retryLane=o,fr(e,o),jn(M,e,o),vf;ih(C)||Kl(),n=bf(e,n,a)}else ih(C)?(n.flags|=192,n.child=e.child,n=null):(e=H.treeContext,qe=gi(C.nextSibling),En=n,ye=!0,wa=null,pi=!1,e!==null&&Jp(n,e),n=Ef(n,o.children),n.flags|=4096);return n}return u?(Ia(),C=o.fallback,u=n.mode,H=e.child,et=H.sibling,o=$i(H,{mode:"hidden",children:o.children}),o.subtreeFlags=H.subtreeFlags&65011712,et!==null?C=$i(et,C):(C=hr(C,u,a,null),C.flags|=2),C.return=n,o.return=n,o.sibling=C,n.child=o,go(null,o),o=n.child,C=e.child.memoizedState,C===null?C=Mf(a):(u=C.cachePool,u!==null?(H=cn._currentValue,u=u.parent!==H?{parent:H,pool:H}:u):u=am(),C={baseLanes:C.baseLanes|a,cachePool:u}),o.memoizedState=C,o.childLanes=yf(e,M,a),n.memoizedState=Sf,go(e.child,o)):(Pa(n),a=e.child,e=a.sibling,a=$i(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,e!==null&&(M=n.deletions,M===null?(n.deletions=[e],n.flags|=16):M.push(e)),n.child=a,n.memoizedState=null,a)}function Ef(e,n){return n=Hl({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function Hl(e,n){return e=ti(22,e,null,n),e.lanes=0,e}function bf(e,n,a){return xr(n,e.child,null,a),e=Ef(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function _0(e,n,a){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),Fu(e.return,n,a)}function Tf(e,n,a,o,u,f){var M=e.memoizedState;M===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(M.isBackwards=n,M.rendering=null,M.renderingStartTime=0,M.last=o,M.tail=a,M.tailMode=u,M.treeForkCount=f)}function v0(e,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var M=an.current,C=(M&2)!==0;if(C?(M=M&1|2,n.flags|=128):M&=1,ct(an,M),Tn(e,n,o,a),o=ye?no:0,!C&&e!==null&&(e.flags&128)!==0)t:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&_0(e,a,n);else if(e.tag===19)_0(e,a,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break t;for(;e.sibling===null;){if(e.return===null||e.return===n)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)e=a.alternate,e!==null&&wl(e)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Tf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(e=u.alternate,e!==null&&wl(e)===null){n.child=u;break}e=u.sibling,u.sibling=a,a=u,u=e}Tf(n,!0,a,null,f,o);break;case"together":Tf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function ra(e,n,a){if(e!==null&&(n.dependencies=e.dependencies),Ba|=n.lanes,(a&n.childLanes)===0)if(e!==null){if(ts(e,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(r(153));if(n.child!==null){for(e=n.child,a=$i(e,e.pendingProps),n.child=a,a.return=n;e.sibling!==null;)e=e.sibling,a=a.sibling=$i(e,e.pendingProps),a.return=n;a.sibling=null}return n.child}function Af(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&Ml(e)))}function cS(e,n,a){switch(n.tag){case 3:St(n,n.stateNode.containerInfo),Ua(n,cn,e.memoizedState.cache),dr();break;case 27:case 5:Bt(n);break;case 4:St(n,n.stateNode.containerInfo);break;case 10:Ua(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Ku(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Pa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?g0(e,n,a):(Pa(n),e=ra(e,n,a),e!==null?e.sibling:null);Pa(n);break;case 19:var u=(e.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(ts(e,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return v0(e,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),ct(an,an.current),o)break;return null;case 22:return n.lanes=0,u0(e,n,a,n.pendingProps);case 24:Ua(n,cn,e.memoizedState.cache)}return ra(e,n,a)}function x0(e,n,a){if(e!==null)if(e.memoizedProps!==n.pendingProps)fn=!0;else{if(!Af(e,a)&&(n.flags&128)===0)return fn=!1,cS(e,n,a);fn=(e.flags&131072)!==0}else fn=!1,ye&&(n.flags&1048576)!==0&&Qp(n,no,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(e=_r(n.elementType),n.type=e,typeof e=="function")Du(e)?(o=Mr(e,o),n.tag=1,n=p0(null,n,e,o,a)):(n.tag=0,n=xf(null,n,e,o,a));else{if(e!=null){var u=e.$$typeof;if(u===L){n.tag=11,n=o0(null,n,e,o,a);break t}else if(u===N){n.tag=14,n=l0(null,n,e,o,a);break t}}throw n=ut(e)||e,Error(r(306,n,""))}}return n;case 0:return xf(e,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Mr(o,n.pendingProps),p0(e,n,o,u,a);case 3:t:{if(St(n,n.stateNode.containerInfo),e===null)throw Error(r(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,Wu(e,n),uo(n,o,null,a);var M=n.memoizedState;if(o=M.cache,Ua(n,cn,o),o!==f.cache&&Bu(n,[cn],a,!0),co(),o=M.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:M.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=m0(e,n,o,a);break t}else if(o!==u){u=fi(Error(r(424)),n),io(u),n=m0(e,n,o,a);break t}else for(e=n.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,qe=gi(e.firstChild),En=n,ye=!0,wa=null,pi=!0,a=um(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(dr(),o===u){n=ra(e,n,a);break t}Tn(e,n,o,a)}n=n.child}return n;case 26:return Gl(e,n),e===null?(a=Dg(n.type,null,n.pendingProps,null))?n.memoizedState=a:ye||(a=n.type,e=n.pendingProps,o=ic(K.current).createElement(a),o[sn]=n,o[pn]=e,An(o,a,e),W(o),n.stateNode=o):n.memoizedState=Dg(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Bt(n),e===null&&ye&&(o=n.stateNode=Rg(n.type,n.pendingProps,K.current),En=n,pi=!0,u=qe,ka(n.type)?(rh=u,qe=gi(o.firstChild)):qe=u),Tn(e,n,n.pendingProps.children,a),Gl(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&ye&&((u=o=qe)&&(o=BS(o,n.type,n.pendingProps,pi),o!==null?(n.stateNode=o,En=n,qe=gi(o.firstChild),pi=!1,u=!0):u=!1),u||Da(n)),Bt(n),u=n.type,f=n.pendingProps,M=e!==null?e.memoizedProps:null,o=f.children,th(u,f)?o=null:M!==null&&th(u,M)&&(n.flags|=32),n.memoizedState!==null&&(u=Ju(e,n,tS,null,null,a),Uo._currentValue=u),Gl(e,n),Tn(e,n,o,a),n.child;case 6:return e===null&&ye&&((e=a=qe)&&(a=GS(a,n.pendingProps,pi),a!==null?(n.stateNode=a,En=n,qe=null,e=!0):e=!1),e||Da(n)),null;case 13:return g0(e,n,a);case 4:return St(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=xr(n,null,o,a):Tn(e,n,o,a),n.child;case 11:return o0(e,n,n.type,n.pendingProps,a);case 7:return Tn(e,n,n.pendingProps,a),n.child;case 8:return Tn(e,n,n.pendingProps.children,a),n.child;case 12:return Tn(e,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ua(n,n.type,o.value),Tn(e,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,mr(n),u=bn(u),o=o(u),n.flags|=1,Tn(e,n,o,a),n.child;case 14:return l0(e,n,n.type,n.pendingProps,a);case 15:return c0(e,n,n.type,n.pendingProps,a);case 19:return v0(e,n,a);case 31:return lS(e,n,a);case 22:return u0(e,n,a,n.pendingProps);case 24:return mr(n),o=bn(cn),e===null?(u=Vu(),u===null&&(u=We,f=Gu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},ku(n),Ua(n,cn,u)):((e.lanes&a)!==0&&(Wu(e,n),uo(n,null,null,a),co()),u=e.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ua(n,cn,o)):(o=f.cache,Ua(n,cn,o),o!==u.cache&&Bu(n,[cn],a,!0))),Tn(e,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(r(156,n.tag))}function sa(e){e.flags|=4}function Rf(e,n,a,o,u){if((n=(e.mode&32)!==0)&&(n=!1),n){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(q0())e.flags|=8192;else throw vr=Tl,Xu}else e.flags&=-16777217}function S0(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Pg(n))if(q0())e.flags|=8192;else throw vr=Tl,Xu}function Vl(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?ze():536870912,e.lanes|=n,hs|=n)}function _o(e,n){if(!ye)switch(e.tailMode){case"hidden":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Ye(e){var n=e.alternate!==null&&e.alternate.child===e.child,a=0,o=0;if(n)for(var u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=a,n}function uS(e,n,a){var o=n.pendingProps;switch(Ou(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ye(n),null;case 1:return Ye(n),null;case 3:return a=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),na(cn),Ut(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&($r(n)?sa(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Iu())),Ye(n),null;case 26:var u=n.type,f=n.memoizedState;return e===null?(sa(n),f!==null?(Ye(n),S0(n,f)):(Ye(n),Rf(n,u,null,o,a))):f?f!==e.memoizedState?(sa(n),Ye(n),S0(n,f)):(Ye(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&sa(n),Ye(n),Rf(n,u,e,o,a)),null;case 27:if(Kt(n),a=K.current,u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&sa(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Ye(n),null}e=yt.current,$r(n)?$p(n):(e=Rg(u,o,a),n.stateNode=e,sa(n))}return Ye(n),null;case 5:if(Kt(n),u=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&sa(n);else{if(!o){if(n.stateNode===null)throw Error(r(166));return Ye(n),null}if(f=yt.current,$r(n))$p(n);else{var M=ic(K.current);switch(f){case 1:f=M.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=M.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=M.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=M.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=M.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?M.createElement("select",{is:o.is}):M.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?M.createElement(u,{is:o.is}):M.createElement(u)}}f[sn]=n,f[pn]=o;t:for(M=n.child;M!==null;){if(M.tag===5||M.tag===6)f.appendChild(M.stateNode);else if(M.tag!==4&&M.tag!==27&&M.child!==null){M.child.return=M,M=M.child;continue}if(M===n)break t;for(;M.sibling===null;){if(M.return===null||M.return===n)break t;M=M.return}M.sibling.return=M.return,M=M.sibling}n.stateNode=f;t:switch(An(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&sa(n)}}return Ye(n),Rf(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,a),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&sa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(r(166));if(e=K.current,$r(n)){if(e=n.stateNode,a=n.memoizedProps,o=null,u=En,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[sn]=n,e=!!(e.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||gg(e.nodeValue,a)),e||Da(n,!0)}else e=ic(e).createTextNode(o),e[sn]=n,n.stateNode=e}return Ye(n),null;case 31:if(a=n.memoizedState,e===null||e.memoizedState!==null){if(o=$r(n),a!==null){if(e===null){if(!o)throw Error(r(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(r(557));e[sn]=n}else dr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ye(n),e=!1}else a=Iu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),e=!0;if(!e)return n.flags&256?(ni(n),n):(ni(n),null);if((n.flags&128)!==0)throw Error(r(558))}return Ye(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=$r(n),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(r(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(r(317));u[sn]=n}else dr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ye(n),u=!1}else u=Iu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(ni(n),n):(ni(n),null)}return ni(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,e=e!==null&&e.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==e&&a&&(n.child.flags|=8192),Vl(n,n.updateQueue),Ye(n),null);case 4:return Ut(),e===null&&Zf(n.stateNode.containerInfo),Ye(n),null;case 10:return na(n.type),Ye(n),null;case 19:if(k(an),o=n.memoizedState,o===null)return Ye(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)_o(o,!1);else{if(en!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=wl(e),f!==null){for(n.flags|=128,_o(o,!1),e=f.updateQueue,n.updateQueue=e,Vl(n,e),n.subtreeFlags=0,e=a,a=n.child;a!==null;)jp(a,e),a=a.sibling;return ct(an,an.current&1|2),ye&&ta(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&b()>Yl&&(n.flags|=128,u=!0,_o(o,!1),n.lanes=4194304)}else{if(!u)if(e=wl(f),e!==null){if(n.flags|=128,u=!0,e=e.updateQueue,n.updateQueue=e,Vl(n,e),_o(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!ye)return Ye(n),null}else 2*b()-o.renderingStartTime>Yl&&a!==536870912&&(n.flags|=128,u=!0,_o(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(e=o.last,e!==null?e.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=b(),e.sibling=null,a=an.current,ct(an,u?a&1|2:a&1),ye&&ta(n,o.treeForkCount),e):(Ye(n),null);case 22:case 23:return ni(n),Zu(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Ye(n),n.subtreeFlags&6&&(n.flags|=8192)):Ye(n),a=n.updateQueue,a!==null&&Vl(n,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),e!==null&&k(gr),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),na(cn),Ye(n),null;case 25:return null;case 30:return null}throw Error(r(156,n.tag))}function fS(e,n){switch(Ou(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return na(cn),Ut(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return Kt(n),null;case 31:if(n.memoizedState!==null){if(ni(n),n.alternate===null)throw Error(r(340));dr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(ni(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(r(340));dr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return k(an),null;case 4:return Ut(),null;case 10:return na(n.type),null;case 22:case 23:return ni(n),Zu(),e!==null&&k(gr),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return na(cn),null;case 25:return null;default:return null}}function M0(e,n){switch(Ou(n),n.tag){case 3:na(cn),Ut();break;case 26:case 27:case 5:Kt(n);break;case 4:Ut();break;case 31:n.memoizedState!==null&&ni(n);break;case 13:ni(n);break;case 19:k(an);break;case 10:na(n.type);break;case 22:case 23:ni(n),Zu(),e!==null&&k(gr);break;case 24:na(cn)}}function vo(e,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&e)===e){o=void 0;var f=a.create,M=a.inst;o=f(),M.destroy=o}a=a.next}while(a!==u)}}catch(C){Be(n,n.return,C)}}function za(e,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&e)===e){var M=o.inst,C=M.destroy;if(C!==void 0){M.destroy=void 0,u=n;var H=a,et=C;try{et()}catch(mt){Be(u,H,mt)}}}o=o.next}while(o!==f)}}catch(mt){Be(n,n.return,mt)}}function y0(e){var n=e.updateQueue;if(n!==null){var a=e.stateNode;try{hm(n,a)}catch(o){Be(e,e.return,o)}}}function E0(e,n,a){a.props=Mr(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(o){Be(e,n,o)}}function xo(e,n){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof a=="function"?e.refCleanup=a(o):a.current=o}}catch(u){Be(e,n,u)}}function zi(e,n){var a=e.ref,o=e.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){Be(e,n,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){Be(e,n,u)}else a.current=null}function b0(e){var n=e.type,a=e.memoizedProps,o=e.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){Be(e,e.return,u)}}function Cf(e,n,a){try{var o=e.stateNode;NS(o,e.type,a,n),o[pn]=n}catch(u){Be(e,e.return,u)}}function T0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ka(e.type)||e.tag===4}function wf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||T0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ka(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Df(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(e),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Qi));else if(o!==4&&(o===27&&ka(e.type)&&(a=e.stateNode,n=null),e=e.child,e!==null))for(Df(e,n,a),e=e.sibling;e!==null;)Df(e,n,a),e=e.sibling}function Xl(e,n,a){var o=e.tag;if(o===5||o===6)e=e.stateNode,n?a.insertBefore(e,n):a.appendChild(e);else if(o!==4&&(o===27&&ka(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(Xl(e,n,a),e=e.sibling;e!==null;)Xl(e,n,a),e=e.sibling}function A0(e){var n=e.stateNode,a=e.memoizedProps;try{for(var o=e.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);An(n,o,a),n[sn]=e,n[pn]=a}catch(f){Be(e,e.return,f)}}var oa=!1,hn=!1,Uf=!1,R0=typeof WeakSet=="function"?WeakSet:Set,xn=null;function hS(e,n){if(e=e.containerInfo,Jf=uc,e=Bp(e),Eu(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else t:{a=(a=e.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var M=0,C=-1,H=-1,et=0,mt=0,xt=e,at=null;e:for(;;){for(var lt;xt!==a||u!==0&&xt.nodeType!==3||(C=M+u),xt!==f||o!==0&&xt.nodeType!==3||(H=M+o),xt.nodeType===3&&(M+=xt.nodeValue.length),(lt=xt.firstChild)!==null;)at=xt,xt=lt;for(;;){if(xt===e)break e;if(at===a&&++et===u&&(C=M),at===f&&++mt===o&&(H=M),(lt=xt.nextSibling)!==null)break;xt=at,at=xt.parentNode}xt=lt}a=C===-1||H===-1?null:{start:C,end:H}}else a=null}a=a||{start:0,end:0}}else a=null;for($f={focusedElem:e,selectionRange:a},uc=!1,xn=n;xn!==null;)if(n=xn,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,xn=e;else for(;xn!==null;){switch(n=xn,f=n.alternate,e=n.flags,n.tag){case 0:if((e&4)!==0&&(e=n.updateQueue,e=e!==null?e.events:null,e!==null))for(a=0;a<e.length;a++)u=e[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&f!==null){e=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var kt=Mr(a.type,u);e=o.getSnapshotBeforeUpdate(kt,f),o.__reactInternalSnapshotBeforeUpdate=e}catch(ee){Be(a,a.return,ee)}}break;case 3:if((e&1024)!==0){if(e=n.stateNode.containerInfo,a=e.nodeType,a===9)nh(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":nh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(r(163))}if(e=n.sibling,e!==null){e.return=n.return,xn=e;break}xn=n.return}}function C0(e,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:ca(e,a),o&4&&vo(5,a);break;case 1:if(ca(e,a),o&4)if(e=a.stateNode,n===null)try{e.componentDidMount()}catch(M){Be(a,a.return,M)}else{var u=Mr(a.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(u,n,e.__reactInternalSnapshotBeforeUpdate)}catch(M){Be(a,a.return,M)}}o&64&&y0(a),o&512&&xo(a,a.return);break;case 3:if(ca(e,a),o&64&&(e=a.updateQueue,e!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{hm(e,n)}catch(M){Be(a,a.return,M)}}break;case 27:n===null&&o&4&&A0(a);case 26:case 5:ca(e,a),n===null&&o&4&&b0(a),o&512&&xo(a,a.return);break;case 12:ca(e,a);break;case 31:ca(e,a),o&4&&U0(e,a);break;case 13:ca(e,a),o&4&&L0(e,a),o&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=MS.bind(null,a),HS(e,a))));break;case 22:if(o=a.memoizedState!==null||oa,!o){n=n!==null&&n.memoizedState!==null||hn,u=oa;var f=hn;oa=o,(hn=n)&&!f?ua(e,a,(a.subtreeFlags&8772)!==0):ca(e,a),oa=u,hn=f}break;case 30:break;default:ca(e,a)}}function w0(e){var n=e.alternate;n!==null&&(e.alternate=null,w0(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&qs(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Qe=null,kn=!1;function la(e,n,a){for(a=a.child;a!==null;)D0(e,n,a),a=a.sibling}function D0(e,n,a){if(Et&&typeof Et.onCommitFiberUnmount=="function")try{Et.onCommitFiberUnmount(Tt,a)}catch{}switch(a.tag){case 26:hn||zi(a,n),la(e,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:hn||zi(a,n);var o=Qe,u=kn;ka(a.type)&&(Qe=a.stateNode,kn=!1),la(e,n,a),Co(a.stateNode),Qe=o,kn=u;break;case 5:hn||zi(a,n);case 6:if(o=Qe,u=kn,Qe=null,la(e,n,a),Qe=o,kn=u,Qe!==null)if(kn)try{(Qe.nodeType===9?Qe.body:Qe.nodeName==="HTML"?Qe.ownerDocument.body:Qe).removeChild(a.stateNode)}catch(f){Be(a,n,f)}else try{Qe.removeChild(a.stateNode)}catch(f){Be(a,n,f)}break;case 18:Qe!==null&&(kn?(e=Qe,yg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),Ss(e)):yg(Qe,a.stateNode));break;case 4:o=Qe,u=kn,Qe=a.stateNode.containerInfo,kn=!0,la(e,n,a),Qe=o,kn=u;break;case 0:case 11:case 14:case 15:za(2,a,n),hn||za(4,a,n),la(e,n,a);break;case 1:hn||(zi(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&E0(a,n,o)),la(e,n,a);break;case 21:la(e,n,a);break;case 22:hn=(o=hn)||a.memoizedState!==null,la(e,n,a),hn=o;break;default:la(e,n,a)}}function U0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Ss(e)}catch(a){Be(n,n.return,a)}}}function L0(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Ss(e)}catch(a){Be(n,n.return,a)}}function dS(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new R0),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new R0),n;default:throw Error(r(435,e.tag))}}function kl(e,n){var a=dS(e);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=yS.bind(null,e,o);o.then(u,u)}})}function Wn(e,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=e,M=n,C=M;t:for(;C!==null;){switch(C.tag){case 27:if(ka(C.type)){Qe=C.stateNode,kn=!1;break t}break;case 5:Qe=C.stateNode,kn=!1;break t;case 3:case 4:Qe=C.stateNode.containerInfo,kn=!0;break t}C=C.return}if(Qe===null)throw Error(r(160));D0(f,M,u),Qe=null,kn=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)N0(n,e),n=n.sibling}var Ai=null;function N0(e,n){var a=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Wn(n,e),qn(e),o&4&&(za(3,e,e.return),vo(3,e),za(5,e,e.return));break;case 1:Wn(n,e),qn(e),o&512&&(hn||a===null||zi(a,a.return)),o&64&&oa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=Ai;if(Wn(n,e),qn(e),o&512&&(hn||a===null||zi(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=e.memoizedState,a===null)if(o===null)if(e.stateNode===null){t:{o=e.type,a=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[sr]||f[sn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),An(f,o,a),f[sn]=e,W(f),o=f;break t;case"link":var M=Ng("link","href",u).get(o+(a.href||""));if(M){for(var C=0;C<M.length;C++)if(f=M[C],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){M.splice(C,1);break e}}f=u.createElement(o),An(f,o,a),u.head.appendChild(f);break;case"meta":if(M=Ng("meta","content",u).get(o+(a.content||""))){for(C=0;C<M.length;C++)if(f=M[C],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){M.splice(C,1);break e}}f=u.createElement(o),An(f,o,a),u.head.appendChild(f);break;default:throw Error(r(468,o))}f[sn]=e,W(f),o=f}e.stateNode=o}else Og(u,e.type,e.stateNode);else e.stateNode=Lg(u,o,e.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?Og(u,e.type,e.stateNode):Lg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Cf(e,e.memoizedProps,a.memoizedProps)}break;case 27:Wn(n,e),qn(e),o&512&&(hn||a===null||zi(a,a.return)),a!==null&&o&4&&Cf(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Wn(n,e),qn(e),o&512&&(hn||a===null||zi(a,a.return)),e.flags&32){u=e.stateNode;try{zn(u,"")}catch(kt){Be(e,e.return,kt)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Cf(e,u,a!==null?a.memoizedProps:u)),o&1024&&(Uf=!0);break;case 6:if(Wn(n,e),qn(e),o&4){if(e.stateNode===null)throw Error(r(162));o=e.memoizedProps,a=e.stateNode;try{a.nodeValue=o}catch(kt){Be(e,e.return,kt)}}break;case 3:if(sc=null,u=Ai,Ai=ac(n.containerInfo),Wn(n,e),Ai=u,qn(e),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Ss(n.containerInfo)}catch(kt){Be(e,e.return,kt)}Uf&&(Uf=!1,O0(e));break;case 4:o=Ai,Ai=ac(e.stateNode.containerInfo),Wn(n,e),qn(e),Ai=o;break;case 12:Wn(n,e),qn(e);break;case 31:Wn(n,e),qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,kl(e,o)));break;case 13:Wn(n,e),qn(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(ql=b()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,kl(e,o)));break;case 22:u=e.memoizedState!==null;var H=a!==null&&a.memoizedState!==null,et=oa,mt=hn;if(oa=et||u,hn=mt||H,Wn(n,e),hn=mt,oa=et,qn(e),o&8192)t:for(n=e.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||H||oa||hn||yr(e)),a=null,n=e;;){if(n.tag===5||n.tag===26){if(a===null){H=a=n;try{if(f=H.stateNode,u)M=f.style,typeof M.setProperty=="function"?M.setProperty("display","none","important"):M.display="none";else{C=H.stateNode;var xt=H.memoizedProps.style,at=xt!=null&&xt.hasOwnProperty("display")?xt.display:null;C.style.display=at==null||typeof at=="boolean"?"":(""+at).trim()}}catch(kt){Be(H,H.return,kt)}}}else if(n.tag===6){if(a===null){H=n;try{H.stateNode.nodeValue=u?"":H.memoizedProps}catch(kt){Be(H,H.return,kt)}}}else if(n.tag===18){if(a===null){H=n;try{var lt=H.stateNode;u?Eg(lt,!0):Eg(H.stateNode,!1)}catch(kt){Be(H,H.return,kt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===e)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break t;for(;n.sibling===null;){if(n.return===null||n.return===e)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=e.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,kl(e,a))));break;case 19:Wn(n,e),qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,kl(e,o)));break;case 30:break;case 21:break;default:Wn(n,e),qn(e)}}function qn(e){var n=e.flags;if(n&2){try{for(var a,o=e.return;o!==null;){if(T0(o)){a=o;break}o=o.return}if(a==null)throw Error(r(160));switch(a.tag){case 27:var u=a.stateNode,f=wf(e);Xl(e,f,u);break;case 5:var M=a.stateNode;a.flags&32&&(zn(M,""),a.flags&=-33);var C=wf(e);Xl(e,C,M);break;case 3:case 4:var H=a.stateNode.containerInfo,et=wf(e);Df(e,et,H);break;default:throw Error(r(161))}}catch(mt){Be(e,e.return,mt)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function O0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;O0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),e=e.sibling}}function ca(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)C0(e,n.alternate,n),n=n.sibling}function yr(e){for(e=e.child;e!==null;){var n=e;switch(n.tag){case 0:case 11:case 14:case 15:za(4,n,n.return),yr(n);break;case 1:zi(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&E0(n,n.return,a),yr(n);break;case 27:Co(n.stateNode);case 26:case 5:zi(n,n.return),yr(n);break;case 22:n.memoizedState===null&&yr(n);break;case 30:yr(n);break;default:yr(n)}e=e.sibling}}function ua(e,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=e,f=n,M=f.flags;switch(f.tag){case 0:case 11:case 15:ua(u,f,a),vo(4,f);break;case 1:if(ua(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(et){Be(o,o.return,et)}if(o=f,u=o.updateQueue,u!==null){var C=o.stateNode;try{var H=u.shared.hiddenCallbacks;if(H!==null)for(u.shared.hiddenCallbacks=null,u=0;u<H.length;u++)fm(H[u],C)}catch(et){Be(o,o.return,et)}}a&&M&64&&y0(f),xo(f,f.return);break;case 27:A0(f);case 26:case 5:ua(u,f,a),a&&o===null&&M&4&&b0(f),xo(f,f.return);break;case 12:ua(u,f,a);break;case 31:ua(u,f,a),a&&M&4&&U0(u,f);break;case 13:ua(u,f,a),a&&M&4&&L0(u,f);break;case 22:f.memoizedState===null&&ua(u,f,a),xo(f,f.return);break;case 30:break;default:ua(u,f,a)}n=n.sibling}}function Lf(e,n){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&ao(a))}function Nf(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&ao(e))}function Ri(e,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)P0(e,n,a,o),n=n.sibling}function P0(e,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ri(e,n,a,o),u&2048&&vo(9,n);break;case 1:Ri(e,n,a,o);break;case 3:Ri(e,n,a,o),u&2048&&(e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&ao(e)));break;case 12:if(u&2048){Ri(e,n,a,o),e=n.stateNode;try{var f=n.memoizedProps,M=f.id,C=f.onPostCommit;typeof C=="function"&&C(M,n.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(H){Be(n,n.return,H)}}else Ri(e,n,a,o);break;case 31:Ri(e,n,a,o);break;case 13:Ri(e,n,a,o);break;case 23:break;case 22:f=n.stateNode,M=n.alternate,n.memoizedState!==null?f._visibility&2?Ri(e,n,a,o):So(e,n):f._visibility&2?Ri(e,n,a,o):(f._visibility|=2,cs(e,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Lf(M,n);break;case 24:Ri(e,n,a,o),u&2048&&Nf(n.alternate,n);break;default:Ri(e,n,a,o)}}function cs(e,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=e,M=n,C=a,H=o,et=M.flags;switch(M.tag){case 0:case 11:case 15:cs(f,M,C,H,u),vo(8,M);break;case 23:break;case 22:var mt=M.stateNode;M.memoizedState!==null?mt._visibility&2?cs(f,M,C,H,u):So(f,M):(mt._visibility|=2,cs(f,M,C,H,u)),u&&et&2048&&Lf(M.alternate,M);break;case 24:cs(f,M,C,H,u),u&&et&2048&&Nf(M.alternate,M);break;default:cs(f,M,C,H,u)}n=n.sibling}}function So(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=e,o=n,u=o.flags;switch(o.tag){case 22:So(a,o),u&2048&&Lf(o.alternate,o);break;case 24:So(a,o),u&2048&&Nf(o.alternate,o);break;default:So(a,o)}n=n.sibling}}var Mo=8192;function us(e,n,a){if(e.subtreeFlags&Mo)for(e=e.child;e!==null;)I0(e,n,a),e=e.sibling}function I0(e,n,a){switch(e.tag){case 26:us(e,n,a),e.flags&Mo&&e.memoizedState!==null&&$S(a,Ai,e.memoizedState,e.memoizedProps);break;case 5:us(e,n,a);break;case 3:case 4:var o=Ai;Ai=ac(e.stateNode.containerInfo),us(e,n,a),Ai=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Mo,Mo=16777216,us(e,n,a),Mo=o):us(e,n,a));break;default:us(e,n,a)}}function z0(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function yo(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];xn=o,B0(o,e)}z0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)F0(e),e=e.sibling}function F0(e){switch(e.tag){case 0:case 11:case 15:yo(e),e.flags&2048&&za(9,e,e.return);break;case 3:yo(e);break;case 12:yo(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,Wl(e)):yo(e);break;default:yo(e)}}function Wl(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];xn=o,B0(o,e)}z0(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:za(8,n,n.return),Wl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Wl(n));break;default:Wl(n)}e=e.sibling}}function B0(e,n){for(;xn!==null;){var a=xn;switch(a.tag){case 0:case 11:case 15:za(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:ao(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,xn=o;else t:for(a=e;xn!==null;){o=xn;var u=o.sibling,f=o.return;if(w0(o),o===a){xn=null;break t}if(u!==null){u.return=f,xn=u;break t}xn=f}}}var pS={getCacheForType:function(e){var n=bn(cn),a=n.data.get(e);return a===void 0&&(a=e(),n.data.set(e,a)),a},cacheSignal:function(){return bn(cn).controller.signal}},mS=typeof WeakMap=="function"?WeakMap:Map,Oe=0,We=null,ve=null,Se=0,Fe=0,ii=null,Fa=!1,fs=!1,Of=!1,fa=0,en=0,Ba=0,Er=0,Pf=0,ai=0,hs=0,Eo=null,Yn=null,If=!1,ql=0,G0=0,Yl=1/0,jl=null,Ga=null,gn=0,Ha=null,ds=null,ha=0,zf=0,Ff=null,H0=null,bo=0,Bf=null;function ri(){return(Oe&2)!==0&&Se!==0?Se&-Se:I.T!==null?Wf():Oi()}function V0(){if(ai===0)if((Se&536870912)===0||ye){var e=At;At<<=1,(At&3932160)===0&&(At=262144),ai=e}else ai=536870912;return e=ei.current,e!==null&&(e.flags|=32),ai}function jn(e,n,a){(e===We&&(Fe===2||Fe===9)||e.cancelPendingCommit!==null)&&(ps(e,0),Va(e,Se,ai,!1)),On(e,a),((Oe&2)===0||e!==We)&&(e===We&&((Oe&2)===0&&(Er|=a),en===4&&Va(e,Se,ai,!1)),Fi(e))}function X0(e,n,a){if((Oe&6)!==0)throw Error(r(327));var o=!a&&(n&127)===0&&(n&e.expiredLanes)===0||Vt(e,n),u=o?vS(e,n):Hf(e,n,!0),f=o;do{if(u===0){fs&&!o&&Va(e,n,0,!1);break}else{if(a=e.current.alternate,f&&!gS(a)){u=Hf(e,n,!1),f=!1;continue}if(u===2){if(f=n,e.errorRecoveryDisabledLanes&f)var M=0;else M=e.pendingLanes&-536870913,M=M!==0?M:M&536870912?536870912:0;if(M!==0){n=M;t:{var C=e;u=Eo;var H=C.current.memoizedState.isDehydrated;if(H&&(ps(C,M).flags|=256),M=Hf(C,M,!1),M!==2){if(Of&&!H){C.errorRecoveryDisabledLanes|=f,Er|=f,u=4;break t}f=Yn,Yn=u,f!==null&&(Yn===null?Yn=f:Yn.push.apply(Yn,f))}u=M}if(f=!1,u!==2)continue}}if(u===1){ps(e,0),Va(e,n,0,!0);break}t:{switch(o=e,f=u,f){case 0:case 1:throw Error(r(345));case 4:if((n&4194048)!==n)break;case 6:Va(o,n,ai,!Fa);break t;case 2:Yn=null;break;case 3:case 5:break;default:throw Error(r(329))}if((n&62914560)===n&&(u=ql+300-b(),10<u)){if(Va(o,n,ai,!Fa),ht(o,0,!0)!==0)break t;ha=n,o.timeoutHandle=Sg(k0.bind(null,o,a,Yn,jl,If,n,ai,Er,hs,Fa,f,"Throttled",-0,0),u);break t}k0(o,a,Yn,jl,If,n,ai,Er,hs,Fa,f,null,-0,0)}}break}while(!0);Fi(e)}function k0(e,n,a,o,u,f,M,C,H,et,mt,xt,at,lt){if(e.timeoutHandle=-1,xt=n.subtreeFlags,xt&8192||(xt&16785408)===16785408){xt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Qi},I0(n,f,xt);var kt=(f&62914560)===f?ql-b():(f&4194048)===f?G0-b():0;if(kt=tM(xt,kt),kt!==null){ha=f,e.cancelPendingCommit=kt(J0.bind(null,e,n,f,a,o,u,M,C,H,mt,xt,null,at,lt)),Va(e,f,M,!et);return}}J0(e,n,f,a,o,u,M,C,H)}function gS(e){for(var n=e;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!$n(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Va(e,n,a,o){n&=~Pf,n&=~Er,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var u=n;0<u;){var f=31-Ot(u),M=1<<f;o[f]=-1,u&=~M}a!==0&&Ws(e,a,n)}function Zl(){return(Oe&6)===0?(To(0),!1):!0}function Gf(){if(ve!==null){if(Fe===0)var e=ve.return;else e=ve,ea=pr=null,ef(e),as=null,so=0,e=ve;for(;e!==null;)M0(e.alternate,e),e=e.return;ve=null}}function ps(e,n){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,IS(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),ha=0,Gf(),We=e,ve=a=$i(e.current,null),Se=n,Fe=0,ii=null,Fa=!1,fs=Vt(e,n),Of=!1,hs=ai=Pf=Er=Ba=en=0,Yn=Eo=null,If=!1,(n&8)!==0&&(n|=n&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=n;0<o;){var u=31-Ot(o),f=1<<u;n|=e[u],o&=~f}return fa=n,gl(),a}function W0(e,n){ue=null,I.H=mo,n===is||n===bl?(n=om(),Fe=3):n===Xu?(n=om(),Fe=4):Fe=n===vf?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,ii=n,ve===null&&(en=1,Fl(e,fi(n,e.current)))}function q0(){var e=ei.current;return e===null?!0:(Se&4194048)===Se?mi===null:(Se&62914560)===Se||(Se&536870912)!==0?e===mi:!1}function Y0(){var e=I.H;return I.H=mo,e===null?mo:e}function j0(){var e=I.A;return I.A=pS,e}function Kl(){en=4,Fa||(Se&4194048)!==Se&&ei.current!==null||(fs=!0),(Ba&134217727)===0&&(Er&134217727)===0||We===null||Va(We,Se,ai,!1)}function Hf(e,n,a){var o=Oe;Oe|=2;var u=Y0(),f=j0();(We!==e||Se!==n)&&(jl=null,ps(e,n)),n=!1;var M=en;t:do try{if(Fe!==0&&ve!==null){var C=ve,H=ii;switch(Fe){case 8:Gf(),M=6;break t;case 3:case 2:case 9:case 6:ei.current===null&&(n=!0);var et=Fe;if(Fe=0,ii=null,ms(e,C,H,et),a&&fs){M=0;break t}break;default:et=Fe,Fe=0,ii=null,ms(e,C,H,et)}}_S(),M=en;break}catch(mt){W0(e,mt)}while(!0);return n&&e.shellSuspendCounter++,ea=pr=null,Oe=o,I.H=u,I.A=f,ve===null&&(We=null,Se=0,gl()),M}function _S(){for(;ve!==null;)Z0(ve)}function vS(e,n){var a=Oe;Oe|=2;var o=Y0(),u=j0();We!==e||Se!==n?(jl=null,Yl=b()+500,ps(e,n)):fs=Vt(e,n);t:do try{if(Fe!==0&&ve!==null){n=ve;var f=ii;e:switch(Fe){case 1:Fe=0,ii=null,ms(e,n,f,1);break;case 2:case 9:if(rm(f)){Fe=0,ii=null,K0(n);break}n=function(){Fe!==2&&Fe!==9||We!==e||(Fe=7),Fi(e)},f.then(n,n);break t;case 3:Fe=7;break t;case 4:Fe=5;break t;case 7:rm(f)?(Fe=0,ii=null,K0(n)):(Fe=0,ii=null,ms(e,n,f,7));break;case 5:var M=null;switch(ve.tag){case 26:M=ve.memoizedState;case 5:case 27:var C=ve;if(M?Pg(M):C.stateNode.complete){Fe=0,ii=null;var H=C.sibling;if(H!==null)ve=H;else{var et=C.return;et!==null?(ve=et,Ql(et)):ve=null}break e}}Fe=0,ii=null,ms(e,n,f,5);break;case 6:Fe=0,ii=null,ms(e,n,f,6);break;case 8:Gf(),en=6;break t;default:throw Error(r(462))}}xS();break}catch(mt){W0(e,mt)}while(!0);return ea=pr=null,I.H=o,I.A=u,Oe=a,ve!==null?0:(We=null,Se=0,gl(),en)}function xS(){for(;ve!==null&&!jt();)Z0(ve)}function Z0(e){var n=x0(e.alternate,e,fa);e.memoizedProps=e.pendingProps,n===null?Ql(e):ve=n}function K0(e){var n=e,a=n.alternate;switch(n.tag){case 15:case 0:n=d0(a,n,n.pendingProps,n.type,void 0,Se);break;case 11:n=d0(a,n,n.pendingProps,n.type.render,n.ref,Se);break;case 5:ef(n);default:M0(a,n),n=ve=jp(n,fa),n=x0(a,n,fa)}e.memoizedProps=e.pendingProps,n===null?Ql(e):ve=n}function ms(e,n,a,o){ea=pr=null,ef(n),as=null,so=0;var u=n.return;try{if(oS(e,u,n,a,Se)){en=1,Fl(e,fi(a,e.current)),ve=null;return}}catch(f){if(u!==null)throw ve=u,f;en=1,Fl(e,fi(a,e.current)),ve=null;return}n.flags&32768?(ye||o===1?e=!0:fs||(Se&536870912)!==0?e=!1:(Fa=e=!0,(o===2||o===9||o===3||o===6)&&(o=ei.current,o!==null&&o.tag===13&&(o.flags|=16384))),Q0(n,e)):Ql(n)}function Ql(e){var n=e;do{if((n.flags&32768)!==0){Q0(n,Fa);return}e=n.return;var a=uS(n.alternate,n,fa);if(a!==null){ve=a;return}if(n=n.sibling,n!==null){ve=n;return}ve=n=e}while(n!==null);en===0&&(en=5)}function Q0(e,n){do{var a=fS(e.alternate,e);if(a!==null){a.flags&=32767,ve=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(e=e.sibling,e!==null)){ve=e;return}ve=e=a}while(e!==null);en=6,ve=null}function J0(e,n,a,o,u,f,M,C,H){e.cancelPendingCommit=null;do Jl();while(gn!==0);if((Oe&6)!==0)throw Error(r(327));if(n!==null){if(n===e.current)throw Error(r(177));if(f=n.lanes|n.childLanes,f|=Cu,Mi(e,a,f,M,C,H),e===We&&(ve=We=null,Se=0),ds=n,Ha=e,ha=a,zf=f,Ff=u,H0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,ES(dt,function(){return ig(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=I.T,I.T=null,u=F.p,F.p=2,M=Oe,Oe|=4;try{hS(e,n,a)}finally{Oe=M,F.p=u,I.T=o}}gn=1,$0(),tg(),eg()}}function $0(){if(gn===1){gn=0;var e=Ha,n=ds,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=I.T,I.T=null;var o=F.p;F.p=2;var u=Oe;Oe|=4;try{N0(n,e);var f=$f,M=Bp(e.containerInfo),C=f.focusedElem,H=f.selectionRange;if(M!==C&&C&&C.ownerDocument&&Fp(C.ownerDocument.documentElement,C)){if(H!==null&&Eu(C)){var et=H.start,mt=H.end;if(mt===void 0&&(mt=et),"selectionStart"in C)C.selectionStart=et,C.selectionEnd=Math.min(mt,C.value.length);else{var xt=C.ownerDocument||document,at=xt&&xt.defaultView||window;if(at.getSelection){var lt=at.getSelection(),kt=C.textContent.length,ee=Math.min(H.start,kt),ke=H.end===void 0?ee:Math.min(H.end,kt);!lt.extend&&ee>ke&&(M=ke,ke=ee,ee=M);var j=zp(C,ee),X=zp(C,ke);if(j&&X&&(lt.rangeCount!==1||lt.anchorNode!==j.node||lt.anchorOffset!==j.offset||lt.focusNode!==X.node||lt.focusOffset!==X.offset)){var tt=xt.createRange();tt.setStart(j.node,j.offset),lt.removeAllRanges(),ee>ke?(lt.addRange(tt),lt.extend(X.node,X.offset)):(tt.setEnd(X.node,X.offset),lt.addRange(tt))}}}}for(xt=[],lt=C;lt=lt.parentNode;)lt.nodeType===1&&xt.push({element:lt,left:lt.scrollLeft,top:lt.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<xt.length;C++){var _t=xt[C];_t.element.scrollLeft=_t.left,_t.element.scrollTop=_t.top}}uc=!!Jf,$f=Jf=null}finally{Oe=u,F.p=o,I.T=a}}e.current=n,gn=2}}function tg(){if(gn===2){gn=0;var e=Ha,n=ds,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=I.T,I.T=null;var o=F.p;F.p=2;var u=Oe;Oe|=4;try{C0(e,n.alternate,n)}finally{Oe=u,F.p=o,I.T=a}}gn=3}}function eg(){if(gn===4||gn===3){gn=0,z();var e=Ha,n=ds,a=ha,o=H0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?gn=5:(gn=0,ds=Ha=null,ng(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(Ga=null),Hr(a),n=n.stateNode,Et&&typeof Et.onCommitFiberRoot=="function")try{Et.onCommitFiberRoot(Tt,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=I.T,u=F.p,F.p=2,I.T=null;try{for(var f=e.onRecoverableError,M=0;M<o.length;M++){var C=o[M];f(C.value,{componentStack:C.stack})}}finally{I.T=n,F.p=u}}(ha&3)!==0&&Jl(),Fi(e),u=e.pendingLanes,(a&261930)!==0&&(u&42)!==0?e===Bf?bo++:(bo=0,Bf=e):bo=0,To(0)}}function ng(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,ao(n)))}function Jl(){return $0(),tg(),eg(),ig()}function ig(){if(gn!==5)return!1;var e=Ha,n=zf;zf=0;var a=Hr(ha),o=I.T,u=F.p;try{F.p=32>a?32:a,I.T=null,a=Ff,Ff=null;var f=Ha,M=ha;if(gn=0,ds=Ha=null,ha=0,(Oe&6)!==0)throw Error(r(331));var C=Oe;if(Oe|=4,F0(f.current),P0(f,f.current,M,a),Oe=C,To(0,!1),Et&&typeof Et.onPostCommitFiberRoot=="function")try{Et.onPostCommitFiberRoot(Tt,f)}catch{}return!0}finally{F.p=u,I.T=o,ng(e,n)}}function ag(e,n,a){n=fi(a,n),n=_f(e.stateNode,n,2),e=Oa(e,n,2),e!==null&&(On(e,2),Fi(e))}function Be(e,n,a){if(e.tag===3)ag(e,e,a);else for(;n!==null;){if(n.tag===3){ag(n,e,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Ga===null||!Ga.has(o))){e=fi(a,e),a=r0(2),o=Oa(n,a,2),o!==null&&(s0(a,o,n,e),On(o,2),Fi(o));break}}n=n.return}}function Vf(e,n,a){var o=e.pingCache;if(o===null){o=e.pingCache=new mS;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Of=!0,u.add(a),e=SS.bind(null,e,n,a),n.then(e,e))}function SS(e,n,a){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,We===e&&(Se&a)===a&&(en===4||en===3&&(Se&62914560)===Se&&300>b()-ql?(Oe&2)===0&&ps(e,0):Pf|=a,hs===Se&&(hs=0)),Fi(e)}function rg(e,n){n===0&&(n=ze()),e=fr(e,n),e!==null&&(On(e,n),Fi(e))}function MS(e){var n=e.memoizedState,a=0;n!==null&&(a=n.retryLane),rg(e,a)}function yS(e,n){var a=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(r(314))}o!==null&&o.delete(n),rg(e,a)}function ES(e,n){return be(e,n)}var $l=null,gs=null,Xf=!1,tc=!1,kf=!1,Xa=0;function Fi(e){e!==gs&&e.next===null&&(gs===null?$l=gs=e:gs=gs.next=e),tc=!0,Xf||(Xf=!0,TS())}function To(e,n){if(!kf&&tc){kf=!0;do for(var a=!1,o=$l;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var M=o.suspendedLanes,C=o.pingedLanes;f=(1<<31-Ot(42|e)+1)-1,f&=u&~(M&~C),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,cg(o,f))}else f=Se,f=ht(o,o===We?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Vt(o,f)||(a=!0,cg(o,f));o=o.next}while(a);kf=!1}}function bS(){sg()}function sg(){tc=Xf=!1;var e=0;Xa!==0&&PS()&&(e=Xa);for(var n=b(),a=null,o=$l;o!==null;){var u=o.next,f=og(o,n);f===0?(o.next=null,a===null?$l=u:a.next=u,u===null&&(gs=a)):(a=o,(e!==0||(f&3)!==0)&&(tc=!0)),o=u}gn!==0&&gn!==5||To(e),Xa!==0&&(Xa=0)}function og(e,n){for(var a=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,f=e.pendingLanes&-62914561;0<f;){var M=31-Ot(f),C=1<<M,H=u[M];H===-1?((C&a)===0||(C&o)!==0)&&(u[M]=ae(C,n)):H<=n&&(e.expiredLanes|=C),f&=~C}if(n=We,a=Se,a=ht(e,e===n?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,a===0||e===n&&(Fe===2||Fe===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Pe(o),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||Vt(e,a)){if(n=a&-a,n===e.callbackPriority)return n;switch(o!==null&&Pe(o),Hr(a)){case 2:case 8:a=Mt;break;case 32:a=dt;break;case 268435456:a=wt;break;default:a=dt}return o=lg.bind(null,e),a=be(a,o),e.callbackPriority=n,e.callbackNode=a,n}return o!==null&&o!==null&&Pe(o),e.callbackPriority=2,e.callbackNode=null,2}function lg(e,n){if(gn!==0&&gn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Jl()&&e.callbackNode!==a)return null;var o=Se;return o=ht(e,e===We?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(X0(e,o,n),og(e,b()),e.callbackNode!=null&&e.callbackNode===a?lg.bind(null,e):null)}function cg(e,n){if(Jl())return null;X0(e,n,!0)}function TS(){zS(function(){(Oe&6)!==0?be(gt,bS):sg()})}function Wf(){if(Xa===0){var e=es;e===0&&(e=Ct,Ct<<=1,(Ct&261888)===0&&(Ct=256)),Xa=e}return Xa}function ug(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ll(""+e)}function fg(e,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,e.id&&a.setAttribute("form",e.id),n.parentNode.insertBefore(a,n),e=new FormData(e),a.parentNode.removeChild(a),e}function AS(e,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=ug((u[pn]||null).action),M=o.submitter;M&&(n=(n=M[pn]||null)?ug(n.formAction):M.getAttribute("formAction"),n!==null&&(f=n,M=null));var C=new hl("action","action",null,o,u);e.push({event:C,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Xa!==0){var H=M?fg(u,M):new FormData(u);ff(a,{pending:!0,data:H,method:u.method,action:f},null,H)}}else typeof f=="function"&&(C.preventDefault(),H=M?fg(u,M):new FormData(u),ff(a,{pending:!0,data:H,method:u.method,action:f},f,H))},currentTarget:u}]})}}for(var qf=0;qf<Ru.length;qf++){var Yf=Ru[qf],RS=Yf.toLowerCase(),CS=Yf[0].toUpperCase()+Yf.slice(1);Ti(RS,"on"+CS)}Ti(Vp,"onAnimationEnd"),Ti(Xp,"onAnimationIteration"),Ti(kp,"onAnimationStart"),Ti("dblclick","onDoubleClick"),Ti("focusin","onFocus"),Ti("focusout","onBlur"),Ti(kx,"onTransitionRun"),Ti(Wx,"onTransitionStart"),Ti(qx,"onTransitionCancel"),Ti(Wp,"onTransitionEnd"),Dt("onMouseEnter",["mouseout","mouseover"]),Dt("onMouseLeave",["mouseout","mouseover"]),Dt("onPointerEnter",["pointerout","pointerover"]),Dt("onPointerLeave",["pointerout","pointerover"]),J("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),J("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),J("onBeforeInput",["compositionend","keypress","textInput","paste"]),J("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),J("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),J("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ao="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),wS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ao));function hg(e,n){n=(n&4)!==0;for(var a=0;a<e.length;a++){var o=e[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var M=o.length-1;0<=M;M--){var C=o[M],H=C.instance,et=C.currentTarget;if(C=C.listener,H!==f&&u.isPropagationStopped())break t;f=C,u.currentTarget=et;try{f(u)}catch(mt){ml(mt)}u.currentTarget=null,f=H}else for(M=0;M<o.length;M++){if(C=o[M],H=C.instance,et=C.currentTarget,C=C.listener,H!==f&&u.isPropagationStopped())break t;f=C,u.currentTarget=et;try{f(u)}catch(mt){ml(mt)}u.currentTarget=null,f=H}}}}function xe(e,n){var a=n[ba];a===void 0&&(a=n[ba]=new Set);var o=e+"__bubble";a.has(o)||(dg(n,e,2,!1),a.add(o))}function jf(e,n,a){var o=0;n&&(o|=4),dg(a,e,o,n)}var ec="_reactListening"+Math.random().toString(36).slice(2);function Zf(e){if(!e[ec]){e[ec]=!0,st.forEach(function(a){a!=="selectionchange"&&(wS.has(a)||jf(a,!1,e),jf(a,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[ec]||(n[ec]=!0,jf("selectionchange",!1,n))}}function dg(e,n,a,o){switch(Vg(n)){case 2:var u=iM;break;case 8:u=aM;break;default:u=uh}a=u.bind(null,n,a,e),u=void 0,!pu||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(n,a,{capture:!0,passive:u}):e.addEventListener(n,a,!0):u!==void 0?e.addEventListener(n,a,{passive:u}):e.addEventListener(n,a,!1)}function Kf(e,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var M=o.tag;if(M===3||M===4){var C=o.stateNode.containerInfo;if(C===u)break;if(M===4)for(M=o.return;M!==null;){var H=M.tag;if((H===3||H===4)&&M.stateNode.containerInfo===u)return;M=M.return}for(;C!==null;){if(M=Ta(C),M===null)return;if(H=M.tag,H===5||H===6||H===26||H===27){o=f=M;continue t}C=C.parentNode}}o=o.return}vp(function(){var et=f,mt=hu(a),xt=[];t:{var at=qp.get(e);if(at!==void 0){var lt=hl,kt=e;switch(e){case"keypress":if(ul(a)===0)break t;case"keydown":case"keyup":lt=yx;break;case"focusin":kt="focus",lt=vu;break;case"focusout":kt="blur",lt=vu;break;case"beforeblur":case"afterblur":lt=vu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":lt=Mp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":lt=ux;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":lt=Tx;break;case Vp:case Xp:case kp:lt=dx;break;case Wp:lt=Rx;break;case"scroll":case"scrollend":lt=lx;break;case"wheel":lt=wx;break;case"copy":case"cut":case"paste":lt=mx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":lt=Ep;break;case"toggle":case"beforetoggle":lt=Ux}var ee=(n&4)!==0,ke=!ee&&(e==="scroll"||e==="scrollend"),j=ee?at!==null?at+"Capture":null:at;ee=[];for(var X=et,tt;X!==null;){var _t=X;if(tt=_t.stateNode,_t=_t.tag,_t!==5&&_t!==26&&_t!==27||tt===null||j===null||(_t=Ys(X,j),_t!=null&&ee.push(Ro(X,_t,tt))),ke)break;X=X.return}0<ee.length&&(at=new lt(at,kt,null,a,mt),xt.push({event:at,listeners:ee}))}}if((n&7)===0){t:{if(at=e==="mouseover"||e==="pointerover",lt=e==="mouseout"||e==="pointerout",at&&a!==fu&&(kt=a.relatedTarget||a.fromElement)&&(Ta(kt)||kt[Zi]))break t;if((lt||at)&&(at=mt.window===mt?mt:(at=mt.ownerDocument)?at.defaultView||at.parentWindow:window,lt?(kt=a.relatedTarget||a.toElement,lt=et,kt=kt?Ta(kt):null,kt!==null&&(ke=c(kt),ee=kt.tag,kt!==ke||ee!==5&&ee!==27&&ee!==6)&&(kt=null)):(lt=null,kt=et),lt!==kt)){if(ee=Mp,_t="onMouseLeave",j="onMouseEnter",X="mouse",(e==="pointerout"||e==="pointerover")&&(ee=Ep,_t="onPointerLeave",j="onPointerEnter",X="pointer"),ke=lt==null?at:or(lt),tt=kt==null?at:or(kt),at=new ee(_t,X+"leave",lt,a,mt),at.target=ke,at.relatedTarget=tt,_t=null,Ta(mt)===et&&(ee=new ee(j,X+"enter",kt,a,mt),ee.target=tt,ee.relatedTarget=ke,_t=ee),ke=_t,lt&&kt)e:{for(ee=DS,j=lt,X=kt,tt=0,_t=j;_t;_t=ee(_t))tt++;_t=0;for(var $t=X;$t;$t=ee($t))_t++;for(;0<tt-_t;)j=ee(j),tt--;for(;0<_t-tt;)X=ee(X),_t--;for(;tt--;){if(j===X||X!==null&&j===X.alternate){ee=j;break e}j=ee(j),X=ee(X)}ee=null}else ee=null;lt!==null&&pg(xt,at,lt,ee,!1),kt!==null&&ke!==null&&pg(xt,ke,kt,ee,!0)}}t:{if(at=et?or(et):window,lt=at.nodeName&&at.nodeName.toLowerCase(),lt==="select"||lt==="input"&&at.type==="file")var we=Up;else if(wp(at))if(Lp)we=Hx;else{we=Bx;var Zt=Fx}else lt=at.nodeName,!lt||lt.toLowerCase()!=="input"||at.type!=="checkbox"&&at.type!=="radio"?et&&Xr(et.elementType)&&(we=Up):we=Gx;if(we&&(we=we(e,et))){Dp(xt,we,a,mt);break t}Zt&&Zt(e,at,et),e==="focusout"&&et&&at.type==="number"&&et.memoizedProps.value!=null&&Ei(at,"number",at.value)}switch(Zt=et?or(et):window,e){case"focusin":(wp(Zt)||Zt.contentEditable==="true")&&(Yr=Zt,bu=et,eo=null);break;case"focusout":eo=bu=Yr=null;break;case"mousedown":Tu=!0;break;case"contextmenu":case"mouseup":case"dragend":Tu=!1,Gp(xt,a,mt);break;case"selectionchange":if(Xx)break;case"keydown":case"keyup":Gp(xt,a,mt)}var de;if(Su)t:{switch(e){case"compositionstart":var Me="onCompositionStart";break t;case"compositionend":Me="onCompositionEnd";break t;case"compositionupdate":Me="onCompositionUpdate";break t}Me=void 0}else qr?Rp(e,a)&&(Me="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(Me="onCompositionStart");Me&&(bp&&a.locale!=="ko"&&(qr||Me!=="onCompositionStart"?Me==="onCompositionEnd"&&qr&&(de=xp()):(Ra=mt,mu="value"in Ra?Ra.value:Ra.textContent,qr=!0)),Zt=nc(et,Me),0<Zt.length&&(Me=new yp(Me,e,null,a,mt),xt.push({event:Me,listeners:Zt}),de?Me.data=de:(de=Cp(a),de!==null&&(Me.data=de)))),(de=Nx?Ox(e,a):Px(e,a))&&(Me=nc(et,"onBeforeInput"),0<Me.length&&(Zt=new yp("onBeforeInput","beforeinput",null,a,mt),xt.push({event:Zt,listeners:Me}),Zt.data=de)),AS(xt,e,et,a,mt)}hg(xt,n)})}function Ro(e,n,a){return{instance:e,listener:n,currentTarget:a}}function nc(e,n){for(var a=n+"Capture",o=[];e!==null;){var u=e,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=Ys(e,a),u!=null&&o.unshift(Ro(e,u,f)),u=Ys(e,n),u!=null&&o.push(Ro(e,u,f))),e.tag===3)return o;e=e.return}return[]}function DS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function pg(e,n,a,o,u){for(var f=n._reactName,M=[];a!==null&&a!==o;){var C=a,H=C.alternate,et=C.stateNode;if(C=C.tag,H!==null&&H===o)break;C!==5&&C!==26&&C!==27||et===null||(H=et,u?(et=Ys(a,f),et!=null&&M.unshift(Ro(a,et,H))):u||(et=Ys(a,f),et!=null&&M.push(Ro(a,et,H)))),a=a.return}M.length!==0&&e.push({event:n,listeners:M})}var US=/\r\n?/g,LS=/\u0000|\uFFFD/g;function mg(e){return(typeof e=="string"?e:""+e).replace(US,`
`).replace(LS,"")}function gg(e,n){return n=mg(n),mg(e)===n}function Xe(e,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||zn(e,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&zn(e,""+o);break;case"className":oe(e,"class",o);break;case"tabIndex":oe(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":oe(e,a,o);break;case"style":Ki(e,o,f);break;case"data":if(n!=="object"){oe(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){e.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ll(""+o),e.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Xe(e,n,"name",u.name,u,null),Xe(e,n,"formEncType",u.formEncType,u,null),Xe(e,n,"formMethod",u.formMethod,u,null),Xe(e,n,"formTarget",u.formTarget,u,null)):(Xe(e,n,"encType",u.encType,u,null),Xe(e,n,"method",u.method,u,null),Xe(e,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(a);break}o=ll(""+o),e.setAttribute(a,o);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"onScroll":o!=null&&xe("scroll",e);break;case"onScrollEnd":o!=null&&xe("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}a=ll(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""+o):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":o===!0?e.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(a,o):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(a,o):e.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(a):e.setAttribute(a,o);break;case"popover":xe("beforetoggle",e),xe("toggle",e),ie(e,"popover",o);break;case"xlinkActuate":Xt(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Xt(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Xt(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Xt(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Xt(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Xt(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Xt(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":ie(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=sx.get(a)||a,ie(e,a,o))}}function Qf(e,n,a,o,u,f){switch(a){case"style":Ki(e,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(r(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(r(60));e.innerHTML=a}}break;case"children":typeof o=="string"?zn(e,o):(typeof o=="number"||typeof o=="bigint")&&zn(e,""+o);break;case"onScroll":o!=null&&xe("scroll",e);break;case"onScrollEnd":o!=null&&xe("scrollend",e);break;case"onClick":o!=null&&(e.onclick=Qi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!it.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=e[pn]||null,f=f!=null?f[a]:null,typeof f=="function"&&e.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(n,o,u);break t}a in e?e[a]=o:o===!0?e.setAttribute(a,""):ie(e,a,o)}}}function An(e,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",e),xe("load",e);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var M=a[f];if(M!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Xe(e,n,f,M,a,null)}}u&&Xe(e,n,"srcSet",a.srcSet,a,null),o&&Xe(e,n,"src",a.src,a,null);return;case"input":xe("invalid",e);var C=f=M=u=null,H=null,et=null;for(o in a)if(a.hasOwnProperty(o)){var mt=a[o];if(mt!=null)switch(o){case"name":u=mt;break;case"type":M=mt;break;case"checked":H=mt;break;case"defaultChecked":et=mt;break;case"value":f=mt;break;case"defaultValue":C=mt;break;case"children":case"dangerouslySetInnerHTML":if(mt!=null)throw Error(r(137,n));break;default:Xe(e,n,o,mt,a,null)}}Qn(e,f,C,H,et,M,u,!1);return;case"select":xe("invalid",e),o=M=f=null;for(u in a)if(a.hasOwnProperty(u)&&(C=a[u],C!=null))switch(u){case"value":f=C;break;case"defaultValue":M=C;break;case"multiple":o=C;default:Xe(e,n,u,C,a,null)}n=f,a=M,e.multiple=!!o,n!=null?Jn(e,!!o,n,!1):a!=null&&Jn(e,!!o,a,!0);return;case"textarea":xe("invalid",e),f=u=o=null;for(M in a)if(a.hasOwnProperty(M)&&(C=a[M],C!=null))switch(M){case"value":o=C;break;case"defaultValue":u=C;break;case"children":f=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(r(91));break;default:Xe(e,n,M,C,a,null)}on(e,o,u,f);return;case"option":for(H in a)a.hasOwnProperty(H)&&(o=a[H],o!=null)&&(H==="selected"?e.selected=o&&typeof o!="function"&&typeof o!="symbol":Xe(e,n,H,o,a,null));return;case"dialog":xe("beforetoggle",e),xe("toggle",e),xe("cancel",e),xe("close",e);break;case"iframe":case"object":xe("load",e);break;case"video":case"audio":for(o=0;o<Ao.length;o++)xe(Ao[o],e);break;case"image":xe("error",e),xe("load",e);break;case"details":xe("toggle",e);break;case"embed":case"source":case"link":xe("error",e),xe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(et in a)if(a.hasOwnProperty(et)&&(o=a[et],o!=null))switch(et){case"children":case"dangerouslySetInnerHTML":throw Error(r(137,n));default:Xe(e,n,et,o,a,null)}return;default:if(Xr(n)){for(mt in a)a.hasOwnProperty(mt)&&(o=a[mt],o!==void 0&&Qf(e,n,mt,o,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(o=a[C],o!=null&&Xe(e,n,C,o,a,null))}function NS(e,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,M=null,C=null,H=null,et=null,mt=null;for(lt in a){var xt=a[lt];if(a.hasOwnProperty(lt)&&xt!=null)switch(lt){case"checked":break;case"value":break;case"defaultValue":H=xt;default:o.hasOwnProperty(lt)||Xe(e,n,lt,null,o,xt)}}for(var at in o){var lt=o[at];if(xt=a[at],o.hasOwnProperty(at)&&(lt!=null||xt!=null))switch(at){case"type":f=lt;break;case"name":u=lt;break;case"checked":et=lt;break;case"defaultChecked":mt=lt;break;case"value":M=lt;break;case"defaultValue":C=lt;break;case"children":case"dangerouslySetInnerHTML":if(lt!=null)throw Error(r(137,n));break;default:lt!==xt&&Xe(e,n,at,lt,o,xt)}}In(e,M,C,H,et,mt,f,u);return;case"select":lt=M=C=at=null;for(f in a)if(H=a[f],a.hasOwnProperty(f)&&H!=null)switch(f){case"value":break;case"multiple":lt=H;default:o.hasOwnProperty(f)||Xe(e,n,f,null,o,H)}for(u in o)if(f=o[u],H=a[u],o.hasOwnProperty(u)&&(f!=null||H!=null))switch(u){case"value":at=f;break;case"defaultValue":C=f;break;case"multiple":M=f;default:f!==H&&Xe(e,n,u,f,o,H)}n=C,a=M,o=lt,at!=null?Jn(e,!!a,at,!1):!!o!=!!a&&(n!=null?Jn(e,!!a,n,!0):Jn(e,!!a,a?[]:"",!1));return;case"textarea":lt=at=null;for(C in a)if(u=a[C],a.hasOwnProperty(C)&&u!=null&&!o.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:Xe(e,n,C,null,o,u)}for(M in o)if(u=o[M],f=a[M],o.hasOwnProperty(M)&&(u!=null||f!=null))switch(M){case"value":at=u;break;case"defaultValue":lt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(r(91));break;default:u!==f&&Xe(e,n,M,u,o,f)}Ie(e,at,lt);return;case"option":for(var kt in a)at=a[kt],a.hasOwnProperty(kt)&&at!=null&&!o.hasOwnProperty(kt)&&(kt==="selected"?e.selected=!1:Xe(e,n,kt,null,o,at));for(H in o)at=o[H],lt=a[H],o.hasOwnProperty(H)&&at!==lt&&(at!=null||lt!=null)&&(H==="selected"?e.selected=at&&typeof at!="function"&&typeof at!="symbol":Xe(e,n,H,at,o,lt));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ee in a)at=a[ee],a.hasOwnProperty(ee)&&at!=null&&!o.hasOwnProperty(ee)&&Xe(e,n,ee,null,o,at);for(et in o)if(at=o[et],lt=a[et],o.hasOwnProperty(et)&&at!==lt&&(at!=null||lt!=null))switch(et){case"children":case"dangerouslySetInnerHTML":if(at!=null)throw Error(r(137,n));break;default:Xe(e,n,et,at,o,lt)}return;default:if(Xr(n)){for(var ke in a)at=a[ke],a.hasOwnProperty(ke)&&at!==void 0&&!o.hasOwnProperty(ke)&&Qf(e,n,ke,void 0,o,at);for(mt in o)at=o[mt],lt=a[mt],!o.hasOwnProperty(mt)||at===lt||at===void 0&&lt===void 0||Qf(e,n,mt,at,o,lt);return}}for(var j in a)at=a[j],a.hasOwnProperty(j)&&at!=null&&!o.hasOwnProperty(j)&&Xe(e,n,j,null,o,at);for(xt in o)at=o[xt],lt=a[xt],!o.hasOwnProperty(xt)||at===lt||at==null&&lt==null||Xe(e,n,xt,at,o,lt)}function _g(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function OS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,M=u.initiatorType,C=u.duration;if(f&&C&&_g(M)){for(M=0,C=u.responseEnd,o+=1;o<a.length;o++){var H=a[o],et=H.startTime;if(et>C)break;var mt=H.transferSize,xt=H.initiatorType;mt&&_g(xt)&&(H=H.responseEnd,M+=mt*(H<C?1:(C-et)/(H-et)))}if(--o,n+=8*(f+M)/(u.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Jf=null,$f=null;function ic(e){return e.nodeType===9?e:e.ownerDocument}function vg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function xg(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function th(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var eh=null;function PS(){var e=window.event;return e&&e.type==="popstate"?e===eh?!1:(eh=e,!0):(eh=null,!1)}var Sg=typeof setTimeout=="function"?setTimeout:void 0,IS=typeof clearTimeout=="function"?clearTimeout:void 0,Mg=typeof Promise=="function"?Promise:void 0,zS=typeof queueMicrotask=="function"?queueMicrotask:typeof Mg<"u"?function(e){return Mg.resolve(null).then(e).catch(FS)}:Sg;function FS(e){setTimeout(function(){throw e})}function ka(e){return e==="head"}function yg(e,n){var a=n,o=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){e.removeChild(u),Ss(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Co(e.ownerDocument.documentElement);else if(a==="head"){a=e.ownerDocument.head,Co(a);for(var f=a.firstChild;f;){var M=f.nextSibling,C=f.nodeName;f[sr]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=M}}else a==="body"&&Co(e.ownerDocument.body);a=u}while(a);Ss(n)}function Eg(e,n){var a=e;e=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(e===0)break;e--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||e++;a=o}while(a)}function nh(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":nh(a),qs(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function BS(e,n,a,o){for(;e.nodeType===1;){var u=a;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[sr])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(f=e.getAttribute("rel"),f==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(f!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(f=e.getAttribute("src"),(f!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===f)return e}else return e;if(e=gi(e.nextSibling),e===null)break}return null}function GS(e,n,a){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=gi(e.nextSibling),e===null))return null;return e}function bg(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=gi(e.nextSibling),e===null))return null;return e}function ih(e){return e.data==="$?"||e.data==="$~"}function ah(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function HS(e,n){var a=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function gi(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var rh=null;function Tg(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="/$"||a==="/&"){if(n===0)return gi(e.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}e=e.nextSibling}return null}function Ag(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return e;n--}else a!=="/$"&&a!=="/&"||n++}e=e.previousSibling}return null}function Rg(e,n,a){switch(n=ic(a),e){case"html":if(e=n.documentElement,!e)throw Error(r(452));return e;case"head":if(e=n.head,!e)throw Error(r(453));return e;case"body":if(e=n.body,!e)throw Error(r(454));return e;default:throw Error(r(451))}}function Co(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);qs(e)}var _i=new Map,Cg=new Set;function ac(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var da=F.d;F.d={f:VS,r:XS,D:kS,C:WS,L:qS,m:YS,X:ZS,S:jS,M:KS};function VS(){var e=da.f(),n=Zl();return e||n}function XS(e){var n=Aa(e);n!==null&&n.tag===5&&n.type==="form"?Wm(n):da.r(e)}var _s=typeof document>"u"?null:document;function wg(e,n,a){var o=_s;if(o&&typeof n=="string"&&n){var u=se(n);u='link[rel="'+e+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Cg.has(u)||(Cg.add(u),e={rel:e,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),An(n,"link",e),W(n),o.head.appendChild(n)))}}function kS(e){da.D(e),wg("dns-prefetch",e,null)}function WS(e,n){da.C(e,n),wg("preconnect",e,n)}function qS(e,n,a){da.L(e,n,a);var o=_s;if(o&&e&&n){var u='link[rel="preload"][as="'+se(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+se(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+se(a.imageSizes)+'"]')):u+='[href="'+se(e)+'"]';var f=u;switch(n){case"style":f=vs(e);break;case"script":f=xs(e)}_i.has(f)||(e=x({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:e,as:n},a),_i.set(f,e),o.querySelector(u)!==null||n==="style"&&o.querySelector(wo(f))||n==="script"&&o.querySelector(Do(f))||(n=o.createElement("link"),An(n,"link",e),W(n),o.head.appendChild(n)))}}function YS(e,n){da.m(e,n);var a=_s;if(a&&e){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+se(o)+'"][href="'+se(e)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=xs(e)}if(!_i.has(f)&&(e=x({rel:"modulepreload",href:e},n),_i.set(f,e),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Do(f)))return}o=a.createElement("link"),An(o,"link",e),W(o),a.head.appendChild(o)}}}function jS(e,n,a){da.S(e,n,a);var o=_s;if(o&&e){var u=w(o).hoistableStyles,f=vs(e);n=n||"default";var M=u.get(f);if(!M){var C={loading:0,preload:null};if(M=o.querySelector(wo(f)))C.loading=5;else{e=x({rel:"stylesheet",href:e,"data-precedence":n},a),(a=_i.get(f))&&sh(e,a);var H=M=o.createElement("link");W(H),An(H,"link",e),H._p=new Promise(function(et,mt){H.onload=et,H.onerror=mt}),H.addEventListener("load",function(){C.loading|=1}),H.addEventListener("error",function(){C.loading|=2}),C.loading|=4,rc(M,n,o)}M={type:"stylesheet",instance:M,count:1,state:C},u.set(f,M)}}}function ZS(e,n){da.X(e,n);var a=_s;if(a&&e){var o=w(a).hoistableScripts,u=xs(e),f=o.get(u);f||(f=a.querySelector(Do(u)),f||(e=x({src:e,async:!0},n),(n=_i.get(u))&&oh(e,n),f=a.createElement("script"),W(f),An(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function KS(e,n){da.M(e,n);var a=_s;if(a&&e){var o=w(a).hoistableScripts,u=xs(e),f=o.get(u);f||(f=a.querySelector(Do(u)),f||(e=x({src:e,async:!0,type:"module"},n),(n=_i.get(u))&&oh(e,n),f=a.createElement("script"),W(f),An(f,"link",e),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function Dg(e,n,a,o){var u=(u=K.current)?ac(u):null;if(!u)throw Error(r(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=vs(a.href),a=w(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=vs(a.href);var f=w(u).hoistableStyles,M=f.get(e);if(M||(u=u.ownerDocument||u,M={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(e,M),(f=u.querySelector(wo(e)))&&!f._p&&(M.instance=f,M.state.loading=5),_i.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},_i.set(e,a),f||QS(u,e,a,M.state))),n&&o===null)throw Error(r(528,""));return M}if(n&&o!==null)throw Error(r(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=xs(a),a=w(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(r(444,e))}}function vs(e){return'href="'+se(e)+'"'}function wo(e){return'link[rel="stylesheet"]['+e+"]"}function Ug(e){return x({},e,{"data-precedence":e.precedence,precedence:null})}function QS(e,n,a,o){e.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=e.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),An(n,"link",a),W(n),e.head.appendChild(n))}function xs(e){return'[src="'+se(e)+'"]'}function Do(e){return"script[async]"+e}function Lg(e,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+se(a.href)+'"]');if(o)return n.instance=o,W(o),o;var u=x({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),W(o),An(o,"style",u),rc(o,a.precedence,e),n.instance=o;case"stylesheet":u=vs(a.href);var f=e.querySelector(wo(u));if(f)return n.state.loading|=4,n.instance=f,W(f),f;o=Ug(a),(u=_i.get(u))&&sh(o,u),f=(e.ownerDocument||e).createElement("link"),W(f);var M=f;return M._p=new Promise(function(C,H){M.onload=C,M.onerror=H}),An(f,"link",o),n.state.loading|=4,rc(f,a.precedence,e),n.instance=f;case"script":return f=xs(a.src),(u=e.querySelector(Do(f)))?(n.instance=u,W(u),u):(o=a,(u=_i.get(f))&&(o=x({},a),oh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),W(u),An(u,"link",o),e.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(r(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,rc(o,a.precedence,e));return n.instance}function rc(e,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,M=0;M<o.length;M++){var C=o[M];if(C.dataset.precedence===n)f=C;else if(f!==u)break}f?f.parentNode.insertBefore(e,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(e,n.firstChild))}function sh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function oh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var sc=null;function Ng(e,n,a){if(sc===null){var o=new Map,u=sc=new Map;u.set(a,o)}else u=sc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(e))return o;for(o.set(e,null),a=a.getElementsByTagName(e),u=0;u<a.length;u++){var f=a[u];if(!(f[sr]||f[sn]||e==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var M=f.getAttribute(n)||"";M=e+M;var C=o.get(M);C?C.push(f):o.set(M,[f])}}return o}function Og(e,n,a){e=e.ownerDocument||e,e.head.insertBefore(a,n==="title"?e.querySelector("head > title"):null)}function JS(e,n,a){if(a===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(e=n.disabled,typeof n.precedence=="string"&&e==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Pg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function $S(e,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=vs(o.href),f=n.querySelector(wo(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=oc.bind(e),n.then(e,e)),a.state.loading|=4,a.instance=f,W(f);return}f=n.ownerDocument||n,o=Ug(o),(u=_i.get(u))&&sh(o,u),f=f.createElement("link"),W(f);var M=f;M._p=new Promise(function(C,H){M.onload=C,M.onerror=H}),An(f,"link",o),a.instance=f}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(e.count++,a=oc.bind(e),n.addEventListener("load",a),n.addEventListener("error",a))}}var lh=0;function tM(e,n){return e.stylesheets&&e.count===0&&cc(e,e.stylesheets),0<e.count||0<e.imgCount?function(a){var o=setTimeout(function(){if(e.stylesheets&&cc(e,e.stylesheets),e.unsuspend){var f=e.unsuspend;e.unsuspend=null,f()}},6e4+n);0<e.imgBytes&&lh===0&&(lh=62500*OS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&cc(e,e.stylesheets),e.unsuspend)){var f=e.unsuspend;e.unsuspend=null,f()}},(e.imgBytes>lh?50:800)+n);return e.unsuspend=a,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function oc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)cc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var lc=null;function cc(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,lc=new Map,n.forEach(eM,e),lc=null,oc.call(e))}function eM(e,n){if(!(n.state.loading&4)){var a=lc.get(e);if(a)var o=a.get(null);else{a=new Map,lc.set(e,a);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var M=u[f];(M.nodeName==="LINK"||M.getAttribute("media")!=="not all")&&(a.set(M.dataset.precedence,M),o=M)}o&&a.set(null,o)}u=n.instance,M=u.getAttribute("data-precedence"),f=a.get(M)||o,f===o&&a.set(null,u),a.set(M,u),this.count++,o=oc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),n.state.loading|=4}}var Uo={$$typeof:D,Provider:null,Consumer:null,_currentValue:rt,_currentValue2:rt,_threadCount:0};function nM(e,n,a,o,u,f,M,C,H){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Te(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Te(0),this.hiddenUpdates=Te(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=M,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.incompleteTransitions=new Map}function Ig(e,n,a,o,u,f,M,C,H,et,mt,xt){return e=new nM(e,n,a,M,H,et,mt,xt,C),n=1,f===!0&&(n|=24),f=ti(3,null,null,n),e.current=f,f.stateNode=e,n=Gu(),n.refCount++,e.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},ku(f),e}function zg(e){return e?(e=Kr,e):Kr}function Fg(e,n,a,o,u,f){u=zg(u),o.context===null?o.context=u:o.pendingContext=u,o=Na(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=Oa(e,o,n),a!==null&&(jn(a,e,n),lo(a,e,n))}function Bg(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<n?a:n}}function ch(e,n){Bg(e,n),(e=e.alternate)&&Bg(e,n)}function Gg(e){if(e.tag===13||e.tag===31){var n=fr(e,67108864);n!==null&&jn(n,e,67108864),ch(e,67108864)}}function Hg(e){if(e.tag===13||e.tag===31){var n=ri();n=Gr(n);var a=fr(e,n);a!==null&&jn(a,e,n),ch(e,n)}}var uc=!0;function iM(e,n,a,o){var u=I.T;I.T=null;var f=F.p;try{F.p=2,uh(e,n,a,o)}finally{F.p=f,I.T=u}}function aM(e,n,a,o){var u=I.T;I.T=null;var f=F.p;try{F.p=8,uh(e,n,a,o)}finally{F.p=f,I.T=u}}function uh(e,n,a,o){if(uc){var u=fh(o);if(u===null)Kf(e,n,o,fc,a),Xg(e,o);else if(sM(u,e,n,a,o))o.stopPropagation();else if(Xg(e,o),n&4&&-1<rM.indexOf(e)){for(;u!==null;){var f=Aa(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var M=bt(f.pendingLanes);if(M!==0){var C=f;for(C.pendingLanes|=2,C.entangledLanes|=2;M;){var H=1<<31-Ot(M);C.entanglements[1]|=H,M&=~H}Fi(f),(Oe&6)===0&&(Yl=b()+500,To(0))}}break;case 31:case 13:C=fr(f,2),C!==null&&jn(C,f,2),Zl(),ch(f,2)}if(f=fh(o),f===null&&Kf(e,n,o,fc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else Kf(e,n,o,null,a)}}function fh(e){return e=hu(e),hh(e)}var fc=null;function hh(e){if(fc=null,e=Ta(e),e!==null){var n=c(e);if(n===null)e=null;else{var a=n.tag;if(a===13){if(e=h(n),e!==null)return e;e=null}else if(a===31){if(e=d(n),e!==null)return e;e=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return fc=e,null}function Vg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Y()){case gt:return 2;case Mt:return 8;case dt:case qt:return 32;case wt:return 268435456;default:return 32}default:return 32}}var dh=!1,Wa=null,qa=null,Ya=null,Lo=new Map,No=new Map,ja=[],rM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Xg(e,n){switch(e){case"focusin":case"focusout":Wa=null;break;case"dragenter":case"dragleave":qa=null;break;case"mouseover":case"mouseout":Ya=null;break;case"pointerover":case"pointerout":Lo.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":No.delete(n.pointerId)}}function Oo(e,n,a,o,u,f){return e===null||e.nativeEvent!==f?(e={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=Aa(n),n!==null&&Gg(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),e)}function sM(e,n,a,o,u){switch(n){case"focusin":return Wa=Oo(Wa,e,n,a,o,u),!0;case"dragenter":return qa=Oo(qa,e,n,a,o,u),!0;case"mouseover":return Ya=Oo(Ya,e,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return Lo.set(f,Oo(Lo.get(f)||null,e,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,No.set(f,Oo(No.get(f)||null,e,n,a,o,u)),!0}return!1}function kg(e){var n=Ta(e.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){e.blockedOn=n,Vr(e.priority,function(){Hg(a)});return}}else if(n===31){if(n=d(a),n!==null){e.blockedOn=n,Vr(e.priority,function(){Hg(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function hc(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var a=fh(e.nativeEvent);if(a===null){a=e.nativeEvent;var o=new a.constructor(a.type,a);fu=o,a.target.dispatchEvent(o),fu=null}else return n=Aa(a),n!==null&&Gg(n),e.blockedOn=a,!1;n.shift()}return!0}function Wg(e,n,a){hc(e)&&a.delete(n)}function oM(){dh=!1,Wa!==null&&hc(Wa)&&(Wa=null),qa!==null&&hc(qa)&&(qa=null),Ya!==null&&hc(Ya)&&(Ya=null),Lo.forEach(Wg),No.forEach(Wg)}function dc(e,n){e.blockedOn===n&&(e.blockedOn=null,dh||(dh=!0,s.unstable_scheduleCallback(s.unstable_NormalPriority,oM)))}var pc=null;function qg(e){pc!==e&&(pc=e,s.unstable_scheduleCallback(s.unstable_NormalPriority,function(){pc===e&&(pc=null);for(var n=0;n<e.length;n+=3){var a=e[n],o=e[n+1],u=e[n+2];if(typeof o!="function"){if(hh(o||a)===null)continue;break}var f=Aa(a);f!==null&&(e.splice(n,3),n-=3,ff(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Ss(e){function n(H){return dc(H,e)}Wa!==null&&dc(Wa,e),qa!==null&&dc(qa,e),Ya!==null&&dc(Ya,e),Lo.forEach(n),No.forEach(n);for(var a=0;a<ja.length;a++){var o=ja[a];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ja.length&&(a=ja[0],a.blockedOn===null);)kg(a),a.blockedOn===null&&ja.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],M=u[pn]||null;if(typeof f=="function")M||qg(a);else if(M){var C=null;if(f&&f.hasAttribute("formAction")){if(u=f,M=f[pn]||null)C=M.formAction;else if(hh(u)!==null)continue}else C=M.action;typeof C=="function"?a[o+1]=C:(a.splice(o,3),o-=3),qg(a)}}}function Yg(){function e(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(M){return u=M})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function ph(e){this._internalRoot=e}mc.prototype.render=ph.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(r(409));var a=n.current,o=ri();Fg(a,o,e,n,null,null)},mc.prototype.unmount=ph.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Fg(e.current,2,null,e,null,null),Zl(),n[Zi]=null}};function mc(e){this._internalRoot=e}mc.prototype.unstable_scheduleHydration=function(e){if(e){var n=Oi();e={blockedOn:null,target:e,priority:n};for(var a=0;a<ja.length&&n!==0&&n<ja[a].priority;a++);ja.splice(a,0,e),a===0&&kg(e)}};var jg=t.version;if(jg!=="19.2.3")throw Error(r(527,jg,"19.2.3"));F.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(r(188)):(e=Object.keys(e).join(","),Error(r(268,e)));return e=p(n),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var lM={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:I,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var gc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!gc.isDisabled&&gc.supportsFiber)try{Tt=gc.inject(lM),Et=gc}catch{}}return Io.createRoot=function(e,n){if(!l(e))throw Error(r(299));var a=!1,o="",u=e0,f=n0,M=i0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(M=n.onRecoverableError)),n=Ig(e,1,!1,null,null,a,o,null,u,f,M,Yg),e[Zi]=n.current,Zf(e),new ph(n)},Io.hydrateRoot=function(e,n,a){if(!l(e))throw Error(r(299));var o=!1,u="",f=e0,M=n0,C=i0,H=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(M=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(H=a.formState)),n=Ig(e,1,!0,n,a??null,o,u,H,f,M,C,Yg),n.context=zg(null),a=n.current,o=ri(),o=Gr(o),u=Na(o),u.callback=null,Oa(a,u,o),a=o,n.current.lanes=a,On(n,a),Fi(n),e[Zi]=n.current,Zf(e),new mc(n)},Io.version="19.2.3",Io}var a_;function vM(){if(a_)return _h.exports;a_=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(t){console.error(t)}}return s(),_h.exports=_M(),_h.exports}var xM=vM();const ip="183",SM=0,r_=1,MM=2,qc=1,vv=2,Wo=3,rr=0,Kn=1,Vi=2,Sa=0,Ps=1,Yi=2,s_=3,o_=4,yM=5,Ur=100,EM=101,bM=102,TM=103,AM=104,RM=200,CM=201,wM=202,DM=203,sd=204,od=205,UM=206,LM=207,NM=208,OM=209,PM=210,IM=211,zM=212,FM=213,BM=214,ld=0,cd=1,ud=2,zs=3,fd=4,hd=5,dd=6,pd=7,xv=0,GM=1,HM=2,Wi=0,Sv=1,Mv=2,yv=3,Ev=4,bv=5,Tv=6,Av=7,Rv=300,Ir=301,Fs=302,Mh=303,yh=304,ru=306,md=1e3,xa=1001,gd=1002,Rn=1003,VM=1004,_c=1005,Ln=1006,Eh=1007,Nr=1008,ci=1009,Cv=1010,wv=1011,Zo=1012,ap=1013,ji=1014,Xi=1015,ya=1016,rp=1017,sp=1018,Ko=1020,Dv=35902,Uv=35899,Lv=1021,Nv=1022,Li=1023,Ea=1026,Or=1027,Ov=1028,op=1029,Bs=1030,lp=1031,cp=1033,Yc=33776,jc=33777,Zc=33778,Kc=33779,_d=35840,vd=35841,xd=35842,Sd=35843,Md=36196,yd=37492,Ed=37496,bd=37488,Td=37489,Ad=37490,Rd=37491,Cd=37808,wd=37809,Dd=37810,Ud=37811,Ld=37812,Nd=37813,Od=37814,Pd=37815,Id=37816,zd=37817,Fd=37818,Bd=37819,Gd=37820,Hd=37821,Vd=36492,Xd=36494,kd=36495,Wd=36283,qd=36284,Yd=36285,jd=36286,XM=3200,Pv=0,kM=1,nr="",xi="srgb",Gs="srgb-linear",Jc="linear",Ge="srgb",Ms=7680,l_=519,WM=512,qM=513,YM=514,up=515,jM=516,ZM=517,fp=518,KM=519,c_=35044,u_="300 es",ki=2e3,Qo=2001;function QM(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function $c(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function JM(){const s=$c("canvas");return s.style.display="block",s}const f_={};function h_(...s){const t="THREE."+s.shift();console.log(t,...s)}function Iv(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const i=s[1];i&&i.isStackTrace?s[0]+=" "+i.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function re(...s){s=Iv(s);const t="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.warn(i.getError(t)):console.warn(t,...s)}}function Ue(...s){s=Iv(s);const t="THREE."+s.shift();{const i=s[0];i&&i.isStackTrace?console.error(i.getError(t)):console.error(t,...s)}}function tu(...s){const t=s.join(" ");t in f_||(f_[t]=!0,re(...s))}function $M(s,t,i){return new Promise(function(r,l){function c(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:l();break;case s.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:r()}}setTimeout(c,i)})}const ty={[ld]:cd,[ud]:dd,[fd]:pd,[zs]:hd,[cd]:ld,[dd]:ud,[pd]:fd,[hd]:zs};class Vs{addEventListener(t,i){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[t]===void 0&&(r[t]=[]),r[t].indexOf(i)===-1&&r[t].push(i)}hasEventListener(t,i){const r=this._listeners;return r===void 0?!1:r[t]!==void 0&&r[t].indexOf(i)!==-1}removeEventListener(t,i){const r=this._listeners;if(r===void 0)return;const l=r[t];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(t){const i=this._listeners;if(i===void 0)return;const r=i[t.type];if(r!==void 0){t.target=this;const l=r.slice(0);for(let c=0,h=l.length;c<h;c++)l[c].call(this,t);t.target=null}}}const Dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bh=Math.PI/180,Zd=180/Math.PI;function $o(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Dn[s&255]+Dn[s>>8&255]+Dn[s>>16&255]+Dn[s>>24&255]+"-"+Dn[t&255]+Dn[t>>8&255]+"-"+Dn[t>>16&15|64]+Dn[t>>24&255]+"-"+Dn[i&63|128]+Dn[i>>8&255]+"-"+Dn[i>>16&255]+Dn[i>>24&255]+Dn[r&255]+Dn[r>>8&255]+Dn[r>>16&255]+Dn[r>>24&255]).toLowerCase()}function Ee(s,t,i){return Math.max(t,Math.min(i,s))}function ey(s,t){return(s%t+t)%t}function Th(s,t,i){return(1-i)*s+i*t}function zo(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Zn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Le{constructor(t=0,i=0){Le.prototype.isVector2=!0,this.x=t,this.y=i}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,i){return this.x=t,this.y=i,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const i=this.x,r=this.y,l=t.elements;return this.x=l[0]*i+l[3]*r+l[6],this.y=l[1]*i+l[4]*r+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,i){return this.x=Ee(this.x,t.x,i.x),this.y=Ee(this.y,t.y,i.y),this}clampScalar(t,i){return this.x=Ee(this.x,t,i),this.y=Ee(this.y,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ee(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(Ee(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y;return i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this}rotateAround(t,i){const r=Math.cos(i),l=Math.sin(i),c=this.x-t.x,h=this.y-t.y;return this.x=c*r-h*l+t.x,this.y=c*l+h*r+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xs{constructor(t=0,i=0,r=0,l=1){this.isQuaternion=!0,this._x=t,this._y=i,this._z=r,this._w=l}static slerpFlat(t,i,r,l,c,h,d){let m=r[l+0],p=r[l+1],v=r[l+2],x=r[l+3],g=c[h+0],y=c[h+1],E=c[h+2],A=c[h+3];if(x!==A||m!==g||p!==y||v!==E){let S=m*g+p*y+v*E+x*A;S<0&&(g=-g,y=-y,E=-E,A=-A,S=-S);let _=1-d;if(S<.9995){const R=Math.acos(S),D=Math.sin(R);_=Math.sin(_*R)/D,d=Math.sin(d*R)/D,m=m*_+g*d,p=p*_+y*d,v=v*_+E*d,x=x*_+A*d}else{m=m*_+g*d,p=p*_+y*d,v=v*_+E*d,x=x*_+A*d;const R=1/Math.sqrt(m*m+p*p+v*v+x*x);m*=R,p*=R,v*=R,x*=R}}t[i]=m,t[i+1]=p,t[i+2]=v,t[i+3]=x}static multiplyQuaternionsFlat(t,i,r,l,c,h){const d=r[l],m=r[l+1],p=r[l+2],v=r[l+3],x=c[h],g=c[h+1],y=c[h+2],E=c[h+3];return t[i]=d*E+v*x+m*y-p*g,t[i+1]=m*E+v*g+p*x-d*y,t[i+2]=p*E+v*y+d*g-m*x,t[i+3]=v*E-d*x-m*g-p*y,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,i,r,l){return this._x=t,this._y=i,this._z=r,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,i=!0){const r=t._x,l=t._y,c=t._z,h=t._order,d=Math.cos,m=Math.sin,p=d(r/2),v=d(l/2),x=d(c/2),g=m(r/2),y=m(l/2),E=m(c/2);switch(h){case"XYZ":this._x=g*v*x+p*y*E,this._y=p*y*x-g*v*E,this._z=p*v*E+g*y*x,this._w=p*v*x-g*y*E;break;case"YXZ":this._x=g*v*x+p*y*E,this._y=p*y*x-g*v*E,this._z=p*v*E-g*y*x,this._w=p*v*x+g*y*E;break;case"ZXY":this._x=g*v*x-p*y*E,this._y=p*y*x+g*v*E,this._z=p*v*E+g*y*x,this._w=p*v*x-g*y*E;break;case"ZYX":this._x=g*v*x-p*y*E,this._y=p*y*x+g*v*E,this._z=p*v*E-g*y*x,this._w=p*v*x+g*y*E;break;case"YZX":this._x=g*v*x+p*y*E,this._y=p*y*x+g*v*E,this._z=p*v*E-g*y*x,this._w=p*v*x-g*y*E;break;case"XZY":this._x=g*v*x-p*y*E,this._y=p*y*x-g*v*E,this._z=p*v*E+g*y*x,this._w=p*v*x+g*y*E;break;default:re("Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,i){const r=i/2,l=Math.sin(r);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(t){const i=t.elements,r=i[0],l=i[4],c=i[8],h=i[1],d=i[5],m=i[9],p=i[2],v=i[6],x=i[10],g=r+d+x;if(g>0){const y=.5/Math.sqrt(g+1);this._w=.25/y,this._x=(v-m)*y,this._y=(c-p)*y,this._z=(h-l)*y}else if(r>d&&r>x){const y=2*Math.sqrt(1+r-d-x);this._w=(v-m)/y,this._x=.25*y,this._y=(l+h)/y,this._z=(c+p)/y}else if(d>x){const y=2*Math.sqrt(1+d-r-x);this._w=(c-p)/y,this._x=(l+h)/y,this._y=.25*y,this._z=(m+v)/y}else{const y=2*Math.sqrt(1+x-r-d);this._w=(h-l)/y,this._x=(c+p)/y,this._y=(m+v)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(t,i){let r=t.dot(i)+1;return r<1e-8?(r=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=r):(this._x=0,this._y=-t.z,this._z=t.y,this._w=r)):(this._x=t.y*i.z-t.z*i.y,this._y=t.z*i.x-t.x*i.z,this._z=t.x*i.y-t.y*i.x,this._w=r),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,i){const r=this.angleTo(t);if(r===0)return this;const l=Math.min(1,i/r);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,i){const r=t._x,l=t._y,c=t._z,h=t._w,d=i._x,m=i._y,p=i._z,v=i._w;return this._x=r*v+h*d+l*p-c*m,this._y=l*v+h*m+c*d-r*p,this._z=c*v+h*p+r*m-l*d,this._w=h*v-r*d-l*m-c*p,this._onChangeCallback(),this}slerp(t,i){let r=t._x,l=t._y,c=t._z,h=t._w,d=this.dot(t);d<0&&(r=-r,l=-l,c=-c,h=-h,d=-d);let m=1-i;if(d<.9995){const p=Math.acos(d),v=Math.sin(p);m=Math.sin(m*p)/v,i=Math.sin(i*p)/v,this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this._onChangeCallback()}else this._x=this._x*m+r*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+h*i,this.normalize();return this}slerpQuaternions(t,i,r){return this.copy(t).slerp(i,r)}random(){const t=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),r=Math.random(),l=Math.sqrt(1-r),c=Math.sqrt(r);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(i),c*Math.cos(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,i=0){return this._x=t[i],this._y=t[i+1],this._z=t[i+2],this._w=t[i+3],this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._w,t}fromBufferAttribute(t,i){return this._x=t.getX(i),this._y=t.getY(i),this._z=t.getZ(i),this._w=t.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${constructor(t=0,i=0,r=0){$.prototype.isVector3=!0,this.x=t,this.y=i,this.z=r}set(t,i,r){return r===void 0&&(r=this.z),this.x=t,this.y=i,this.z=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,i){return this.x=t.x*i.x,this.y=t.y*i.y,this.z=t.z*i.z,this}applyEuler(t){return this.applyQuaternion(d_.setFromEuler(t))}applyAxisAngle(t,i){return this.applyQuaternion(d_.setFromAxisAngle(t,i))}applyMatrix3(t){const i=this.x,r=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[3]*r+c[6]*l,this.y=c[1]*i+c[4]*r+c[7]*l,this.z=c[2]*i+c[5]*r+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,c=t.elements,h=1/(c[3]*i+c[7]*r+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*r+c[8]*l+c[12])*h,this.y=(c[1]*i+c[5]*r+c[9]*l+c[13])*h,this.z=(c[2]*i+c[6]*r+c[10]*l+c[14])*h,this}applyQuaternion(t){const i=this.x,r=this.y,l=this.z,c=t.x,h=t.y,d=t.z,m=t.w,p=2*(h*l-d*r),v=2*(d*i-c*l),x=2*(c*r-h*i);return this.x=i+m*p+h*x-d*v,this.y=r+m*v+d*p-c*x,this.z=l+m*x+c*v-h*p,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const i=this.x,r=this.y,l=this.z,c=t.elements;return this.x=c[0]*i+c[4]*r+c[8]*l,this.y=c[1]*i+c[5]*r+c[9]*l,this.z=c[2]*i+c[6]*r+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,i){return this.x=Ee(this.x,t.x,i.x),this.y=Ee(this.y,t.y,i.y),this.z=Ee(this.z,t.z,i.z),this}clampScalar(t,i){return this.x=Ee(this.x,t,i),this.y=Ee(this.y,t,i),this.z=Ee(this.z,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ee(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,i){const r=t.x,l=t.y,c=t.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-c*d,this.y=c*h-r*m,this.z=r*d-l*h,this}projectOnVector(t){const i=t.lengthSq();if(i===0)return this.set(0,0,0);const r=t.dot(this)/i;return this.copy(t).multiplyScalar(r)}projectOnPlane(t){return Ah.copy(this).projectOnVector(t),this.sub(Ah)}reflect(t){return this.sub(Ah.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const i=Math.sqrt(this.lengthSq()*t.lengthSq());if(i===0)return Math.PI/2;const r=this.dot(t)/i;return Math.acos(Ee(r,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const i=this.x-t.x,r=this.y-t.y,l=this.z-t.z;return i*i+r*r+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,i,r){const l=Math.sin(i)*t;return this.x=l*Math.sin(r),this.y=Math.cos(i)*t,this.z=l*Math.cos(r),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,i,r){return this.x=t*Math.sin(i),this.y=r,this.z=t*Math.cos(i),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(t){const i=this.setFromMatrixColumn(t,0).length(),r=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=i,this.y=r,this.z=l,this}setFromMatrixColumn(t,i){return this.fromArray(t.elements,i*4)}setFromMatrix3Column(t,i){return this.fromArray(t.elements,i*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,i=Math.random()*2-1,r=Math.sqrt(1-i*i);return this.x=r*Math.cos(t),this.y=i,this.z=r*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ah=new $,d_=new Xs;class pe{constructor(t,i,r,l,c,h,d,m,p){pe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,i,r,l,c,h,d,m,p)}set(t,i,r,l,c,h,d,m,p){const v=this.elements;return v[0]=t,v[1]=l,v[2]=d,v[3]=i,v[4]=c,v[5]=m,v[6]=r,v[7]=h,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],this}extractBasis(t,i,r){return t.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const i=t.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,c=this.elements,h=r[0],d=r[3],m=r[6],p=r[1],v=r[4],x=r[7],g=r[2],y=r[5],E=r[8],A=l[0],S=l[3],_=l[6],R=l[1],D=l[4],L=l[7],B=l[2],U=l[5],N=l[8];return c[0]=h*A+d*R+m*B,c[3]=h*S+d*D+m*U,c[6]=h*_+d*L+m*N,c[1]=p*A+v*R+x*B,c[4]=p*S+v*D+x*U,c[7]=p*_+v*L+x*N,c[2]=g*A+y*R+E*B,c[5]=g*S+y*D+E*U,c[8]=g*_+y*L+E*N,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[3]*=t,i[6]*=t,i[1]*=t,i[4]*=t,i[7]*=t,i[2]*=t,i[5]*=t,i[8]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8];return i*h*v-i*d*p-r*c*v+r*d*m+l*c*p-l*h*m}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8],x=v*h-d*p,g=d*m-v*c,y=p*c-h*m,E=i*x+r*g+l*y;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/E;return t[0]=x*A,t[1]=(l*p-v*r)*A,t[2]=(d*r-l*h)*A,t[3]=g*A,t[4]=(v*i-l*m)*A,t[5]=(l*c-d*i)*A,t[6]=y*A,t[7]=(r*m-p*i)*A,t[8]=(h*i-r*c)*A,this}transpose(){let t;const i=this.elements;return t=i[1],i[1]=i[3],i[3]=t,t=i[2],i[2]=i[6],i[6]=t,t=i[5],i[5]=i[7],i[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const i=this.elements;return t[0]=i[0],t[1]=i[3],t[2]=i[6],t[3]=i[1],t[4]=i[4],t[5]=i[7],t[6]=i[2],t[7]=i[5],t[8]=i[8],this}setUvTransform(t,i,r,l,c,h,d){const m=Math.cos(c),p=Math.sin(c);return this.set(r*m,r*p,-r*(m*h+p*d)+h+t,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(t,i){return this.premultiply(Rh.makeScale(t,i)),this}rotate(t){return this.premultiply(Rh.makeRotation(-t)),this}translate(t,i){return this.premultiply(Rh.makeTranslation(t,i)),this}makeTranslation(t,i){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,i,0,0,1),this}makeRotation(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,r,i,0,0,0,1),this}makeScale(t,i){return this.set(t,0,0,0,i,0,0,0,1),this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<9;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<9;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Rh=new pe,p_=new pe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),m_=new pe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ny(){const s={enabled:!0,workingColorSpace:Gs,spaces:{},convert:function(l,c,h){return this.enabled===!1||c===h||!c||!h||(this.spaces[c].transfer===Ge&&(l.r=Ma(l.r),l.g=Ma(l.g),l.b=Ma(l.b)),this.spaces[c].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ge&&(l.r=Is(l.r),l.g=Is(l.g),l.b=Is(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===nr?Jc:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,h){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return tu("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return tu("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(l,c)}},t=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[Gs]:{primaries:t,whitePoint:r,transfer:Jc,toXYZ:p_,fromXYZ:m_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:xi},outputColorSpaceConfig:{drawingBufferColorSpace:xi}},[xi]:{primaries:t,whitePoint:r,transfer:Ge,toXYZ:p_,fromXYZ:m_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:xi}}}),s}const Re=ny();function Ma(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Is(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ys;class iy{static getDataURL(t,i="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let r;if(t instanceof HTMLCanvasElement)r=t;else{ys===void 0&&(ys=$c("canvas")),ys.width=t.width,ys.height=t.height;const l=ys.getContext("2d");t instanceof ImageData?l.putImageData(t,0,0):l.drawImage(t,0,0,t.width,t.height),r=ys}return r.toDataURL(i)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const i=$c("canvas");i.width=t.width,i.height=t.height;const r=i.getContext("2d");r.drawImage(t,0,0,t.width,t.height);const l=r.getImageData(0,0,t.width,t.height),c=l.data;for(let h=0;h<c.length;h++)c[h]=Ma(c[h]/255)*255;return r.putImageData(l,0,0),i}else if(t.data){const i=t.data.slice(0);for(let r=0;r<i.length;r++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[r]=Math.floor(Ma(i[r]/255)*255):i[r]=Ma(i[r]);return{data:i,width:t.width,height:t.height}}else return re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ay=0;class hp{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ay++}),this.uuid=$o(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?t.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?t.set(i.displayHeight,i.displayWidth,0):i!==null?t.set(i.width,i.height,i.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const r={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?c.push(Ch(l[h].image)):c.push(Ch(l[h]))}else c=Ch(l);r.url=c}return i||(t.images[this.uuid]=r),r}}function Ch(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?iy.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(re("Texture: Unable to serialize Texture."),{})}let ry=0;const wh=new $;class Gn extends Vs{constructor(t=Gn.DEFAULT_IMAGE,i=Gn.DEFAULT_MAPPING,r=xa,l=xa,c=Ln,h=Nr,d=Li,m=ci,p=Gn.DEFAULT_ANISOTROPY,v=nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ry++}),this.uuid=$o(),this.name="",this.source=new hp(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=l,this.magFilter=c,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(wh).x}get height(){return this.source.getSize(wh).y}get depth(){return this.source.getSize(wh).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const i in t){const r=t[i];if(r===void 0){re(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){re(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&r&&l.isVector2&&r.isVector2||l&&r&&l.isVector3&&r.isVector3||l&&r&&l.isMatrix3&&r.isMatrix3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rv)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case md:t.x=t.x-Math.floor(t.x);break;case xa:t.x=t.x<0?0:1;break;case gd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case md:t.y=t.y-Math.floor(t.y);break;case xa:t.y=t.y<0?0:1;break;case gd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=Rv;Gn.DEFAULT_ANISOTROPY=1;class nn{constructor(t=0,i=0,r=0,l=1){nn.prototype.isVector4=!0,this.x=t,this.y=i,this.z=r,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,i,r,l){return this.x=t,this.y=i,this.z=r,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this}addScaledVector(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const i=this.x,r=this.y,l=this.z,c=this.w,h=t.elements;return this.x=h[0]*i+h[4]*r+h[8]*l+h[12]*c,this.y=h[1]*i+h[5]*r+h[9]*l+h[13]*c,this.z=h[2]*i+h[6]*r+h[10]*l+h[14]*c,this.w=h[3]*i+h[7]*r+h[11]*l+h[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this}setAxisAngleFromRotationMatrix(t){let i,r,l,c;const m=t.elements,p=m[0],v=m[4],x=m[8],g=m[1],y=m[5],E=m[9],A=m[2],S=m[6],_=m[10];if(Math.abs(v-g)<.01&&Math.abs(x-A)<.01&&Math.abs(E-S)<.01){if(Math.abs(v+g)<.1&&Math.abs(x+A)<.1&&Math.abs(E+S)<.1&&Math.abs(p+y+_-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const D=(p+1)/2,L=(y+1)/2,B=(_+1)/2,U=(v+g)/4,N=(x+A)/4,T=(E+S)/4;return D>L&&D>B?D<.01?(r=0,l=.707106781,c=.707106781):(r=Math.sqrt(D),l=U/r,c=N/r):L>B?L<.01?(r=.707106781,l=0,c=.707106781):(l=Math.sqrt(L),r=U/l,c=T/l):B<.01?(r=.707106781,l=.707106781,c=0):(c=Math.sqrt(B),r=N/c,l=T/c),this.set(r,l,c,i),this}let R=Math.sqrt((S-E)*(S-E)+(x-A)*(x-A)+(g-v)*(g-v));return Math.abs(R)<.001&&(R=1),this.x=(S-E)/R,this.y=(x-A)/R,this.z=(g-v)/R,this.w=Math.acos((p+y+_-1)/2),this}setFromMatrixPosition(t){const i=t.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,i){return this.x=Ee(this.x,t.x,i.x),this.y=Ee(this.y,t.y,i.y),this.z=Ee(this.z,t.z,i.z),this.w=Ee(this.w,t.w,i.w),this}clampScalar(t,i){return this.x=Ee(this.x,t,i),this.y=Ee(this.y,t,i),this.z=Ee(this.z,t,i),this.w=Ee(this.w,t,i),this}clampLength(t,i){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Ee(r,t,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this}lerpVectors(t,i,r){return this.x=t.x+(i.x-t.x)*r,this.y=t.y+(i.y-t.y)*r,this.z=t.z+(i.z-t.z)*r,this.w=t.w+(i.w-t.w)*r,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,i=0){return this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this}toArray(t=[],i=0){return t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t}fromBufferAttribute(t,i){return this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sy extends Vs{constructor(t=1,i=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=t,this.height=i,this.depth=r.depth,this.scissor=new nn(0,0,t,i),this.scissorTest=!1,this.viewport=new nn(0,0,t,i),this.textures=[];const l={width:t,height:i,depth:r.depth},c=new Gn(l),h=r.count;for(let d=0;d<h;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(t={}){const i={minFilter:Ln,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(i.mapping=t.mapping),t.wrapS!==void 0&&(i.wrapS=t.wrapS),t.wrapT!==void 0&&(i.wrapT=t.wrapT),t.wrapR!==void 0&&(i.wrapR=t.wrapR),t.magFilter!==void 0&&(i.magFilter=t.magFilter),t.minFilter!==void 0&&(i.minFilter=t.minFilter),t.format!==void 0&&(i.format=t.format),t.type!==void 0&&(i.type=t.type),t.anisotropy!==void 0&&(i.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(i.colorSpace=t.colorSpace),t.flipY!==void 0&&(i.flipY=t.flipY),t.generateMipmaps!==void 0&&(i.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(i.internalFormat=t.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(i)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,i,r=1){if(this.width!==t||this.height!==i||this.depth!==r){this.width=t,this.height=i,this.depth=r;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=i,this.textures[l].image.depth=r,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,t,i),this.scissor.set(0,0,t,i)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++){this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},t.textures[i].image);this.textures[i].source=new hp(l)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qi extends sy{constructor(t=1,i=1,r={}){super(t,i,r),this.isWebGLRenderTarget=!0}}class zv extends Gn{constructor(t=null,i=1,r=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=xa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class oy extends Gn{constructor(t=null,i=1,r=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:i,height:r,depth:l},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=xa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Je{constructor(t,i,r,l,c,h,d,m,p,v,x,g,y,E,A,S){Je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,i,r,l,c,h,d,m,p,v,x,g,y,E,A,S)}set(t,i,r,l,c,h,d,m,p,v,x,g,y,E,A,S){const _=this.elements;return _[0]=t,_[4]=i,_[8]=r,_[12]=l,_[1]=c,_[5]=h,_[9]=d,_[13]=m,_[2]=p,_[6]=v,_[10]=x,_[14]=g,_[3]=y,_[7]=E,_[11]=A,_[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(t){const i=this.elements,r=t.elements;return i[0]=r[0],i[1]=r[1],i[2]=r[2],i[3]=r[3],i[4]=r[4],i[5]=r[5],i[6]=r[6],i[7]=r[7],i[8]=r[8],i[9]=r[9],i[10]=r[10],i[11]=r[11],i[12]=r[12],i[13]=r[13],i[14]=r[14],i[15]=r[15],this}copyPosition(t){const i=this.elements,r=t.elements;return i[12]=r[12],i[13]=r[13],i[14]=r[14],this}setFromMatrix3(t){const i=t.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(t,i,r){return this.determinant()===0?(t.set(1,0,0),i.set(0,1,0),r.set(0,0,1),this):(t.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(t,i,r){return this.set(t.x,i.x,r.x,0,t.y,i.y,r.y,0,t.z,i.z,r.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const i=this.elements,r=t.elements,l=1/Es.setFromMatrixColumn(t,0).length(),c=1/Es.setFromMatrixColumn(t,1).length(),h=1/Es.setFromMatrixColumn(t,2).length();return i[0]=r[0]*l,i[1]=r[1]*l,i[2]=r[2]*l,i[3]=0,i[4]=r[4]*c,i[5]=r[5]*c,i[6]=r[6]*c,i[7]=0,i[8]=r[8]*h,i[9]=r[9]*h,i[10]=r[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(t){const i=this.elements,r=t.x,l=t.y,c=t.z,h=Math.cos(r),d=Math.sin(r),m=Math.cos(l),p=Math.sin(l),v=Math.cos(c),x=Math.sin(c);if(t.order==="XYZ"){const g=h*v,y=h*x,E=d*v,A=d*x;i[0]=m*v,i[4]=-m*x,i[8]=p,i[1]=y+E*p,i[5]=g-A*p,i[9]=-d*m,i[2]=A-g*p,i[6]=E+y*p,i[10]=h*m}else if(t.order==="YXZ"){const g=m*v,y=m*x,E=p*v,A=p*x;i[0]=g+A*d,i[4]=E*d-y,i[8]=h*p,i[1]=h*x,i[5]=h*v,i[9]=-d,i[2]=y*d-E,i[6]=A+g*d,i[10]=h*m}else if(t.order==="ZXY"){const g=m*v,y=m*x,E=p*v,A=p*x;i[0]=g-A*d,i[4]=-h*x,i[8]=E+y*d,i[1]=y+E*d,i[5]=h*v,i[9]=A-g*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(t.order==="ZYX"){const g=h*v,y=h*x,E=d*v,A=d*x;i[0]=m*v,i[4]=E*p-y,i[8]=g*p+A,i[1]=m*x,i[5]=A*p+g,i[9]=y*p-E,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(t.order==="YZX"){const g=h*m,y=h*p,E=d*m,A=d*p;i[0]=m*v,i[4]=A-g*x,i[8]=E*x+y,i[1]=x,i[5]=h*v,i[9]=-d*v,i[2]=-p*v,i[6]=y*x+E,i[10]=g-A*x}else if(t.order==="XZY"){const g=h*m,y=h*p,E=d*m,A=d*p;i[0]=m*v,i[4]=-x,i[8]=p*v,i[1]=g*x+A,i[5]=h*v,i[9]=y*x-E,i[2]=E*x-y,i[6]=d*v,i[10]=A*x+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ly,t,cy)}lookAt(t,i,r){const l=this.elements;return si.subVectors(t,i),si.lengthSq()===0&&(si.z=1),si.normalize(),Ka.crossVectors(r,si),Ka.lengthSq()===0&&(Math.abs(r.z)===1?si.x+=1e-4:si.z+=1e-4,si.normalize(),Ka.crossVectors(r,si)),Ka.normalize(),vc.crossVectors(si,Ka),l[0]=Ka.x,l[4]=vc.x,l[8]=si.x,l[1]=Ka.y,l[5]=vc.y,l[9]=si.y,l[2]=Ka.z,l[6]=vc.z,l[10]=si.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,i){const r=t.elements,l=i.elements,c=this.elements,h=r[0],d=r[4],m=r[8],p=r[12],v=r[1],x=r[5],g=r[9],y=r[13],E=r[2],A=r[6],S=r[10],_=r[14],R=r[3],D=r[7],L=r[11],B=r[15],U=l[0],N=l[4],T=l[8],O=l[12],ft=l[1],G=l[5],Z=l[9],nt=l[13],ut=l[2],Q=l[6],I=l[10],F=l[14],rt=l[3],ot=l[7],vt=l[11],P=l[15];return c[0]=h*U+d*ft+m*ut+p*rt,c[4]=h*N+d*G+m*Q+p*ot,c[8]=h*T+d*Z+m*I+p*vt,c[12]=h*O+d*nt+m*F+p*P,c[1]=v*U+x*ft+g*ut+y*rt,c[5]=v*N+x*G+g*Q+y*ot,c[9]=v*T+x*Z+g*I+y*vt,c[13]=v*O+x*nt+g*F+y*P,c[2]=E*U+A*ft+S*ut+_*rt,c[6]=E*N+A*G+S*Q+_*ot,c[10]=E*T+A*Z+S*I+_*vt,c[14]=E*O+A*nt+S*F+_*P,c[3]=R*U+D*ft+L*ut+B*rt,c[7]=R*N+D*G+L*Q+B*ot,c[11]=R*T+D*Z+L*I+B*vt,c[15]=R*O+D*nt+L*F+B*P,this}multiplyScalar(t){const i=this.elements;return i[0]*=t,i[4]*=t,i[8]*=t,i[12]*=t,i[1]*=t,i[5]*=t,i[9]*=t,i[13]*=t,i[2]*=t,i[6]*=t,i[10]*=t,i[14]*=t,i[3]*=t,i[7]*=t,i[11]*=t,i[15]*=t,this}determinant(){const t=this.elements,i=t[0],r=t[4],l=t[8],c=t[12],h=t[1],d=t[5],m=t[9],p=t[13],v=t[2],x=t[6],g=t[10],y=t[14],E=t[3],A=t[7],S=t[11],_=t[15],R=m*y-p*g,D=d*y-p*x,L=d*g-m*x,B=h*y-p*v,U=h*g-m*v,N=h*x-d*v;return i*(A*R-S*D+_*L)-r*(E*R-S*B+_*U)+l*(E*D-A*B+_*N)-c*(E*L-A*U+S*N)}transpose(){const t=this.elements;let i;return i=t[1],t[1]=t[4],t[4]=i,i=t[2],t[2]=t[8],t[8]=i,i=t[6],t[6]=t[9],t[9]=i,i=t[3],t[3]=t[12],t[12]=i,i=t[7],t[7]=t[13],t[13]=i,i=t[11],t[11]=t[14],t[14]=i,this}setPosition(t,i,r){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=i,l[14]=r),this}invert(){const t=this.elements,i=t[0],r=t[1],l=t[2],c=t[3],h=t[4],d=t[5],m=t[6],p=t[7],v=t[8],x=t[9],g=t[10],y=t[11],E=t[12],A=t[13],S=t[14],_=t[15],R=i*d-r*h,D=i*m-l*h,L=i*p-c*h,B=r*m-l*d,U=r*p-c*d,N=l*p-c*m,T=v*A-x*E,O=v*S-g*E,ft=v*_-y*E,G=x*S-g*A,Z=x*_-y*A,nt=g*_-y*S,ut=R*nt-D*Z+L*G+B*ft-U*O+N*T;if(ut===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Q=1/ut;return t[0]=(d*nt-m*Z+p*G)*Q,t[1]=(l*Z-r*nt-c*G)*Q,t[2]=(A*N-S*U+_*B)*Q,t[3]=(g*U-x*N-y*B)*Q,t[4]=(m*ft-h*nt-p*O)*Q,t[5]=(i*nt-l*ft+c*O)*Q,t[6]=(S*L-E*N-_*D)*Q,t[7]=(v*N-g*L+y*D)*Q,t[8]=(h*Z-d*ft+p*T)*Q,t[9]=(r*ft-i*Z-c*T)*Q,t[10]=(E*U-A*L+_*R)*Q,t[11]=(x*L-v*U-y*R)*Q,t[12]=(d*O-h*G-m*T)*Q,t[13]=(i*G-r*O+l*T)*Q,t[14]=(A*D-E*B-S*R)*Q,t[15]=(v*B-x*D+g*R)*Q,this}scale(t){const i=this.elements,r=t.x,l=t.y,c=t.z;return i[0]*=r,i[4]*=l,i[8]*=c,i[1]*=r,i[5]*=l,i[9]*=c,i[2]*=r,i[6]*=l,i[10]*=c,i[3]*=r,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,i=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(i,r,l))}makeTranslation(t,i,r){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,i,0,0,1,r,0,0,0,1),this}makeRotationX(t){const i=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,i,-r,0,0,r,i,0,0,0,0,1),this}makeRotationY(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,0,r,0,0,1,0,0,-r,0,i,0,0,0,0,1),this}makeRotationZ(t){const i=Math.cos(t),r=Math.sin(t);return this.set(i,-r,0,0,r,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,i){const r=Math.cos(i),l=Math.sin(i),c=1-r,h=t.x,d=t.y,m=t.z,p=c*h,v=c*d;return this.set(p*h+r,p*d-l*m,p*m+l*d,0,p*d+l*m,v*d+r,v*m-l*h,0,p*m-l*d,v*m+l*h,c*m*m+r,0,0,0,0,1),this}makeScale(t,i,r){return this.set(t,0,0,0,0,i,0,0,0,0,r,0,0,0,0,1),this}makeShear(t,i,r,l,c,h){return this.set(1,r,c,0,t,1,h,0,i,l,1,0,0,0,0,1),this}compose(t,i,r){const l=this.elements,c=i._x,h=i._y,d=i._z,m=i._w,p=c+c,v=h+h,x=d+d,g=c*p,y=c*v,E=c*x,A=h*v,S=h*x,_=d*x,R=m*p,D=m*v,L=m*x,B=r.x,U=r.y,N=r.z;return l[0]=(1-(A+_))*B,l[1]=(y+L)*B,l[2]=(E-D)*B,l[3]=0,l[4]=(y-L)*U,l[5]=(1-(g+_))*U,l[6]=(S+R)*U,l[7]=0,l[8]=(E+D)*N,l[9]=(S-R)*N,l[10]=(1-(g+A))*N,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,i,r){const l=this.elements;t.x=l[12],t.y=l[13],t.z=l[14];const c=this.determinant();if(c===0)return r.set(1,1,1),i.identity(),this;let h=Es.set(l[0],l[1],l[2]).length();const d=Es.set(l[4],l[5],l[6]).length(),m=Es.set(l[8],l[9],l[10]).length();c<0&&(h=-h),Ci.copy(this);const p=1/h,v=1/d,x=1/m;return Ci.elements[0]*=p,Ci.elements[1]*=p,Ci.elements[2]*=p,Ci.elements[4]*=v,Ci.elements[5]*=v,Ci.elements[6]*=v,Ci.elements[8]*=x,Ci.elements[9]*=x,Ci.elements[10]*=x,i.setFromRotationMatrix(Ci),r.x=h,r.y=d,r.z=m,this}makePerspective(t,i,r,l,c,h,d=ki,m=!1){const p=this.elements,v=2*c/(i-t),x=2*c/(r-l),g=(i+t)/(i-t),y=(r+l)/(r-l);let E,A;if(m)E=c/(h-c),A=h*c/(h-c);else if(d===ki)E=-(h+c)/(h-c),A=-2*h*c/(h-c);else if(d===Qo)E=-h/(h-c),A=-h*c/(h-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=x,p[9]=y,p[13]=0,p[2]=0,p[6]=0,p[10]=E,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,i,r,l,c,h,d=ki,m=!1){const p=this.elements,v=2/(i-t),x=2/(r-l),g=-(i+t)/(i-t),y=-(r+l)/(r-l);let E,A;if(m)E=1/(h-c),A=h/(h-c);else if(d===ki)E=-2/(h-c),A=-(h+c)/(h-c);else if(d===Qo)E=-1/(h-c),A=-c/(h-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=v,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=x,p[9]=0,p[13]=y,p[2]=0,p[6]=0,p[10]=E,p[14]=A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const i=this.elements,r=t.elements;for(let l=0;l<16;l++)if(i[l]!==r[l])return!1;return!0}fromArray(t,i=0){for(let r=0;r<16;r++)this.elements[r]=t[r+i];return this}toArray(t=[],i=0){const r=this.elements;return t[i]=r[0],t[i+1]=r[1],t[i+2]=r[2],t[i+3]=r[3],t[i+4]=r[4],t[i+5]=r[5],t[i+6]=r[6],t[i+7]=r[7],t[i+8]=r[8],t[i+9]=r[9],t[i+10]=r[10],t[i+11]=r[11],t[i+12]=r[12],t[i+13]=r[13],t[i+14]=r[14],t[i+15]=r[15],t}}const Es=new $,Ci=new Je,ly=new $(0,0,0),cy=new $(1,1,1),Ka=new $,vc=new $,si=new $,g_=new Je,__=new Xs;class Ni{constructor(t=0,i=0,r=0,l=Ni.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,l=this._order){return this._x=t,this._y=i,this._z=r,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){const l=t.elements,c=l[0],h=l[4],d=l[8],m=l[1],p=l[5],v=l[9],x=l[2],g=l[6],y=l[10];switch(i){case"XYZ":this._y=Math.asin(Ee(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,y),this._z=Math.atan2(-h,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,y),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-x,c),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-x,y),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Ee(x,-1,1)),Math.abs(x)<.9999999?(this._x=Math.atan2(g,y),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(Ee(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-x,c)):(this._x=0,this._y=Math.atan2(d,y));break;case"XZY":this._z=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-v,y),this._y=0);break;default:re("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return g_.makeRotationFromQuaternion(t),this.setFromRotationMatrix(g_,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return __.setFromEuler(this),this.setFromQuaternion(__,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ni.DEFAULT_ORDER="XYZ";class Fv{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let uy=0;const v_=new $,bs=new Xs,pa=new Je,xc=new $,Fo=new $,fy=new $,hy=new Xs,x_=new $(1,0,0),S_=new $(0,1,0),M_=new $(0,0,1),y_={type:"added"},dy={type:"removed"},Ts={type:"childadded",child:null},Dh={type:"childremoved",child:null};class Nn extends Vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uy++}),this.uuid=$o(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nn.DEFAULT_UP.clone();const t=new $,i=new Ni,r=new Xs,l=new $(1,1,1);function c(){r.setFromEuler(i,!1)}function h(){i.setFromQuaternion(r,void 0,!1)}i._onChange(c),r._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Je},normalMatrix:{value:new pe}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=Nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return bs.setFromAxisAngle(t,i),this.quaternion.multiply(bs),this}rotateOnWorldAxis(t,i){return bs.setFromAxisAngle(t,i),this.quaternion.premultiply(bs),this}rotateX(t){return this.rotateOnAxis(x_,t)}rotateY(t){return this.rotateOnAxis(S_,t)}rotateZ(t){return this.rotateOnAxis(M_,t)}translateOnAxis(t,i){return v_.copy(t).applyQuaternion(this.quaternion),this.position.add(v_.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(x_,t)}translateY(t){return this.translateOnAxis(S_,t)}translateZ(t){return this.translateOnAxis(M_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pa.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?xc.copy(t):xc.set(t,i,r);const l=this.parent;this.updateWorldMatrix(!0,!1),Fo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pa.lookAt(Fo,xc,this.up):pa.lookAt(xc,Fo,this.up),this.quaternion.setFromRotationMatrix(pa),l&&(pa.extractRotation(l.matrixWorld),bs.setFromRotationMatrix(pa),this.quaternion.premultiply(bs.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ue("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(y_),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(dy),Dh.child=t,this.dispatchEvent(Dh),Dh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pa.multiply(t.parent.matrixWorld)),t.applyMatrix4(pa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(y_),Ts.child=t,this.dispatchEvent(Ts),Ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,l=this.children.length;r<l;r++){const h=this.children[r].getObjectByProperty(t,i);if(h!==void 0)return h}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fo,t,fy),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fo,hy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].traverseVisible(t)}traverseAncestors(t){const i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const i=t.x,r=t.y,l=t.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*r-c[8]*l,c[13]+=r-c[1]*i-c[5]*r-c[9]*l,c[14]+=l-c[2]*i-c[6]*r-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const i=this.children;for(let r=0,l=i.length;r<l;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,h=l.length;c<h;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(d=>({...d,boundingBox:d.boundingBox?d.boundingBox.toJSON():void 0,boundingSphere:d.boundingSphere?d.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(d=>({...d})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(t),l.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(t)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const x=m[p];c(t.shapes,x)}else c(t.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(c(t.materials,this.material[m]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(c(t.animations,m))}}if(i){const d=h(t.geometries),m=h(t.materials),p=h(t.textures),v=h(t.images),x=h(t.shapes),g=h(t.skeletons),y=h(t.animations),E=h(t.nodes);d.length>0&&(r.geometries=d),m.length>0&&(r.materials=m),p.length>0&&(r.textures=p),v.length>0&&(r.images=v),x.length>0&&(r.shapes=x),g.length>0&&(r.skeletons=g),y.length>0&&(r.animations=y),E.length>0&&(r.nodes=E)}return r.object=l,r;function h(d){const m=[];for(const p in d){const v=d[p];delete v.metadata,m.push(v)}return m}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){const l=t.children[r];this.add(l.clone())}return this}}Nn.DEFAULT_UP=new $(0,1,0);Nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ir extends Nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const py={type:"move"};class Uh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ir,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ir,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ir,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const i=this._hand;if(i)for(const r of t.hand.values())this._getHandJoint(i,r)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,i,r){let l=null,c=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(t&&i.session.visibilityState!=="visible-blurred"){if(p&&t.hand){h=!0;for(const A of t.hand.values()){const S=i.getJointPose(A,r),_=this._getHandJoint(p,A);S!==null&&(_.matrix.fromArray(S.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=S.radius),_.visible=S!==null}const v=p.joints["index-finger-tip"],x=p.joints["thumb-tip"],g=v.position.distanceTo(x.position),y=.02,E=.005;p.inputState.pinching&&g>y+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!p.inputState.pinching&&g<=y-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else m!==null&&t.gripSpace&&(c=i.getPose(t.gripSpace,r),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(t.targetRaySpace,r),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(py)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(t,i){if(t.joints[i.jointName]===void 0){const r=new ir;r.matrixAutoUpdate=!1,r.visible=!1,t.joints[i.jointName]=r,t.add(r)}return t.joints[i.jointName]}}const Bv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qa={h:0,s:0,l:0},Sc={h:0,s:0,l:0};function Lh(s,t,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?s+(t-s)*6*i:i<1/2?t:i<2/3?s+(t-s)*6*(2/3-i):s}class Ft{constructor(t,i,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,i,r)}set(t,i,r){if(i===void 0&&r===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,i,r);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,i=xi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Re.colorSpaceToWorking(this,i),this}setRGB(t,i,r,l=Re.workingColorSpace){return this.r=t,this.g=i,this.b=r,Re.colorSpaceToWorking(this,l),this}setHSL(t,i,r,l=Re.workingColorSpace){if(t=ey(t,1),i=Ee(i,0,1),r=Ee(r,0,1),i===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+i):r+i-r*i,h=2*r-c;this.r=Lh(h,c,t+1/3),this.g=Lh(h,c,t),this.b=Lh(h,c,t-1/3)}return Re.colorSpaceToWorking(this,l),this}setStyle(t,i=xi){function r(c){c!==void 0&&parseFloat(c)<1&&re("Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:re("Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],h=c.length;if(h===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(c,16),i);re("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,i);return this}setColorName(t,i=xi){const r=Bv[t.toLowerCase()];return r!==void 0?this.setHex(r,i):re("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ma(t.r),this.g=Ma(t.g),this.b=Ma(t.b),this}copyLinearToSRGB(t){return this.r=Is(t.r),this.g=Is(t.g),this.b=Is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xi){return Re.workingToColorSpace(Un.copy(this),t),Math.round(Ee(Un.r*255,0,255))*65536+Math.round(Ee(Un.g*255,0,255))*256+Math.round(Ee(Un.b*255,0,255))}getHexString(t=xi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,i=Re.workingColorSpace){Re.workingToColorSpace(Un.copy(this),i);const r=Un.r,l=Un.g,c=Un.b,h=Math.max(r,l,c),d=Math.min(r,l,c);let m,p;const v=(d+h)/2;if(d===h)m=0,p=0;else{const x=h-d;switch(p=v<=.5?x/(h+d):x/(2-h-d),h){case r:m=(l-c)/x+(l<c?6:0);break;case l:m=(c-r)/x+2;break;case c:m=(r-l)/x+4;break}m/=6}return t.h=m,t.s=p,t.l=v,t}getRGB(t,i=Re.workingColorSpace){return Re.workingToColorSpace(Un.copy(this),i),t.r=Un.r,t.g=Un.g,t.b=Un.b,t}getStyle(t=xi){Re.workingToColorSpace(Un.copy(this),t);const i=Un.r,r=Un.g,l=Un.b;return t!==xi?`color(${t} ${i.toFixed(3)} ${r.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(r*255)},${Math.round(l*255)})`}offsetHSL(t,i,r){return this.getHSL(Qa),this.setHSL(Qa.h+t,Qa.s+i,Qa.l+r)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,i){return this.r=t.r+i.r,this.g=t.g+i.g,this.b=t.b+i.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,i){return this.r+=(t.r-this.r)*i,this.g+=(t.g-this.g)*i,this.b+=(t.b-this.b)*i,this}lerpColors(t,i,r){return this.r=t.r+(i.r-t.r)*r,this.g=t.g+(i.g-t.g)*r,this.b=t.b+(i.b-t.b)*r,this}lerpHSL(t,i){this.getHSL(Qa),t.getHSL(Sc);const r=Th(Qa.h,Sc.h,i),l=Th(Qa.s,Sc.s,i),c=Th(Qa.l,Sc.l,i);return this.setHSL(r,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const i=this.r,r=this.g,l=this.b,c=t.elements;return this.r=c[0]*i+c[3]*r+c[6]*l,this.g=c[1]*i+c[4]*r+c[7]*l,this.b=c[2]*i+c[5]*r+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,i=0){return this.r=t[i],this.g=t[i+1],this.b=t[i+2],this}toArray(t=[],i=0){return t[i]=this.r,t[i+1]=this.g,t[i+2]=this.b,t}fromBufferAttribute(t,i){return this.r=t.getX(i),this.g=t.getY(i),this.b=t.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Un=new Ft;Ft.NAMES=Bv;class my extends Nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ni,this.environmentIntensity=1,this.environmentRotation=new Ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,i){return super.copy(t,i),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const i=super.toJSON(t);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const wi=new $,ma=new $,Nh=new $,ga=new $,As=new $,Rs=new $,E_=new $,Oh=new $,Ph=new $,Ih=new $,zh=new nn,Fh=new nn,Bh=new nn;class Ui{constructor(t=new $,i=new $,r=new $){this.a=t,this.b=i,this.c=r}static getNormal(t,i,r,l){l.subVectors(r,i),wi.subVectors(t,i),l.cross(wi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,i,r,l,c){wi.subVectors(l,i),ma.subVectors(r,i),Nh.subVectors(t,i);const h=wi.dot(wi),d=wi.dot(ma),m=wi.dot(Nh),p=ma.dot(ma),v=ma.dot(Nh),x=h*p-d*d;if(x===0)return c.set(0,0,0),null;const g=1/x,y=(p*m-d*v)*g,E=(h*v-d*m)*g;return c.set(1-y-E,E,y)}static containsPoint(t,i,r,l){return this.getBarycoord(t,i,r,l,ga)===null?!1:ga.x>=0&&ga.y>=0&&ga.x+ga.y<=1}static getInterpolation(t,i,r,l,c,h,d,m){return this.getBarycoord(t,i,r,l,ga)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,ga.x),m.addScaledVector(h,ga.y),m.addScaledVector(d,ga.z),m)}static getInterpolatedAttribute(t,i,r,l,c,h){return zh.setScalar(0),Fh.setScalar(0),Bh.setScalar(0),zh.fromBufferAttribute(t,i),Fh.fromBufferAttribute(t,r),Bh.fromBufferAttribute(t,l),h.setScalar(0),h.addScaledVector(zh,c.x),h.addScaledVector(Fh,c.y),h.addScaledVector(Bh,c.z),h}static isFrontFacing(t,i,r,l){return wi.subVectors(r,i),ma.subVectors(t,i),wi.cross(ma).dot(l)<0}set(t,i,r){return this.a.copy(t),this.b.copy(i),this.c.copy(r),this}setFromPointsAndIndices(t,i,r,l){return this.a.copy(t[i]),this.b.copy(t[r]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,i,r,l){return this.a.fromBufferAttribute(t,i),this.b.fromBufferAttribute(t,r),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wi.subVectors(this.c,this.b),ma.subVectors(this.a,this.b),wi.cross(ma).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ui.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,i){return Ui.getBarycoord(t,this.a,this.b,this.c,i)}getInterpolation(t,i,r,l,c){return Ui.getInterpolation(t,this.a,this.b,this.c,i,r,l,c)}containsPoint(t){return Ui.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ui.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,i){const r=this.a,l=this.b,c=this.c;let h,d;As.subVectors(l,r),Rs.subVectors(c,r),Oh.subVectors(t,r);const m=As.dot(Oh),p=Rs.dot(Oh);if(m<=0&&p<=0)return i.copy(r);Ph.subVectors(t,l);const v=As.dot(Ph),x=Rs.dot(Ph);if(v>=0&&x<=v)return i.copy(l);const g=m*x-v*p;if(g<=0&&m>=0&&v<=0)return h=m/(m-v),i.copy(r).addScaledVector(As,h);Ih.subVectors(t,c);const y=As.dot(Ih),E=Rs.dot(Ih);if(E>=0&&y<=E)return i.copy(c);const A=y*p-m*E;if(A<=0&&p>=0&&E<=0)return d=p/(p-E),i.copy(r).addScaledVector(Rs,d);const S=v*E-y*x;if(S<=0&&x-v>=0&&y-E>=0)return E_.subVectors(c,l),d=(x-v)/(x-v+(y-E)),i.copy(l).addScaledVector(E_,d);const _=1/(S+A+g);return h=A*_,d=g*_,i.copy(r).addScaledVector(As,h).addScaledVector(Rs,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class tl{constructor(t=new $(1/0,1/0,1/0),i=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=i}set(t,i){return this.min.copy(t),this.max.copy(i),this}setFromArray(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i+=3)this.expandByPoint(Di.fromArray(t,i));return this}setFromBufferAttribute(t){this.makeEmpty();for(let i=0,r=t.count;i<r;i++)this.expandByPoint(Di.fromBufferAttribute(t,i));return this}setFromPoints(t){this.makeEmpty();for(let i=0,r=t.length;i<r;i++)this.expandByPoint(t[i]);return this}setFromCenterAndSize(t,i){const r=Di.copy(i).multiplyScalar(.5);return this.min.copy(t).sub(r),this.max.copy(t).add(r),this}setFromObject(t,i=!1){return this.makeEmpty(),this.expandByObject(t,i)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,i=!1){t.updateWorldMatrix(!1,!1);const r=t.geometry;if(r!==void 0){const c=r.getAttribute("position");if(i===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let h=0,d=c.count;h<d;h++)t.isMesh===!0?t.getVertexPosition(h,Di):Di.fromBufferAttribute(c,h),Di.applyMatrix4(t.matrixWorld),this.expandByPoint(Di);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mc.copy(t.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Mc.copy(r.boundingBox)),Mc.applyMatrix4(t.matrixWorld),this.union(Mc)}const l=t.children;for(let c=0,h=l.length;c<h;c++)this.expandByObject(l[c],i);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,i){return i.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Di),Di.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let i,r;return t.normal.x>0?(i=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(i=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(i+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(i+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(i+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(i+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),i<=-t.constant&&r>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bo),yc.subVectors(this.max,Bo),Cs.subVectors(t.a,Bo),ws.subVectors(t.b,Bo),Ds.subVectors(t.c,Bo),Ja.subVectors(ws,Cs),$a.subVectors(Ds,ws),br.subVectors(Cs,Ds);let i=[0,-Ja.z,Ja.y,0,-$a.z,$a.y,0,-br.z,br.y,Ja.z,0,-Ja.x,$a.z,0,-$a.x,br.z,0,-br.x,-Ja.y,Ja.x,0,-$a.y,$a.x,0,-br.y,br.x,0];return!Gh(i,Cs,ws,Ds,yc)||(i=[1,0,0,0,1,0,0,0,1],!Gh(i,Cs,ws,Ds,yc))?!1:(Ec.crossVectors(Ja,$a),i=[Ec.x,Ec.y,Ec.z],Gh(i,Cs,ws,Ds,yc))}clampPoint(t,i){return i.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Di).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Di).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_a[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_a[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_a[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_a[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_a[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_a[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_a[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_a[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_a),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const _a=[new $,new $,new $,new $,new $,new $,new $,new $],Di=new $,Mc=new tl,Cs=new $,ws=new $,Ds=new $,Ja=new $,$a=new $,br=new $,Bo=new $,yc=new $,Ec=new $,Tr=new $;function Gh(s,t,i,r,l){for(let c=0,h=s.length-3;c<=h;c+=3){Tr.fromArray(s,c);const d=l.x*Math.abs(Tr.x)+l.y*Math.abs(Tr.y)+l.z*Math.abs(Tr.z),m=t.dot(Tr),p=i.dot(Tr),v=r.dot(Tr);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>d)return!1}return!0}const dn=new $,bc=new Le;let gy=0;class Mn{constructor(t,i,r=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gy++}),this.name="",this.array=t,this.itemSize=i,this.count=t!==void 0?t.length/i:0,this.normalized=r,this.usage=c_,this.updateRanges=[],this.gpuType=Xi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,i,r){t*=this.itemSize,r*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=i.array[r+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let i=0,r=this.count;i<r;i++)bc.fromBufferAttribute(this,i),bc.applyMatrix3(t),this.setXY(i,bc.x,bc.y);else if(this.itemSize===3)for(let i=0,r=this.count;i<r;i++)dn.fromBufferAttribute(this,i),dn.applyMatrix3(t),this.setXYZ(i,dn.x,dn.y,dn.z);return this}applyMatrix4(t){for(let i=0,r=this.count;i<r;i++)dn.fromBufferAttribute(this,i),dn.applyMatrix4(t),this.setXYZ(i,dn.x,dn.y,dn.z);return this}applyNormalMatrix(t){for(let i=0,r=this.count;i<r;i++)dn.fromBufferAttribute(this,i),dn.applyNormalMatrix(t),this.setXYZ(i,dn.x,dn.y,dn.z);return this}transformDirection(t){for(let i=0,r=this.count;i<r;i++)dn.fromBufferAttribute(this,i),dn.transformDirection(t),this.setXYZ(i,dn.x,dn.y,dn.z);return this}set(t,i=0){return this.array.set(t,i),this}getComponent(t,i){let r=this.array[t*this.itemSize+i];return this.normalized&&(r=zo(r,this.array)),r}setComponent(t,i,r){return this.normalized&&(r=Zn(r,this.array)),this.array[t*this.itemSize+i]=r,this}getX(t){let i=this.array[t*this.itemSize];return this.normalized&&(i=zo(i,this.array)),i}setX(t,i){return this.normalized&&(i=Zn(i,this.array)),this.array[t*this.itemSize]=i,this}getY(t){let i=this.array[t*this.itemSize+1];return this.normalized&&(i=zo(i,this.array)),i}setY(t,i){return this.normalized&&(i=Zn(i,this.array)),this.array[t*this.itemSize+1]=i,this}getZ(t){let i=this.array[t*this.itemSize+2];return this.normalized&&(i=zo(i,this.array)),i}setZ(t,i){return this.normalized&&(i=Zn(i,this.array)),this.array[t*this.itemSize+2]=i,this}getW(t){let i=this.array[t*this.itemSize+3];return this.normalized&&(i=zo(i,this.array)),i}setW(t,i){return this.normalized&&(i=Zn(i,this.array)),this.array[t*this.itemSize+3]=i,this}setXY(t,i,r){return t*=this.itemSize,this.normalized&&(i=Zn(i,this.array),r=Zn(r,this.array)),this.array[t+0]=i,this.array[t+1]=r,this}setXYZ(t,i,r,l){return t*=this.itemSize,this.normalized&&(i=Zn(i,this.array),r=Zn(r,this.array),l=Zn(l,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this}setXYZW(t,i,r,l,c){return t*=this.itemSize,this.normalized&&(i=Zn(i,this.array),r=Zn(r,this.array),l=Zn(l,this.array),c=Zn(c,this.array)),this.array[t+0]=i,this.array[t+1]=r,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==c_&&(t.usage=this.usage),t}}class Gv extends Mn{constructor(t,i,r){super(new Uint16Array(t),i,r)}}class Hv extends Mn{constructor(t,i,r){super(new Uint32Array(t),i,r)}}class yn extends Mn{constructor(t,i,r){super(new Float32Array(t),i,r)}}const _y=new tl,Go=new $,Hh=new $;class el{constructor(t=new $,i=-1){this.isSphere=!0,this.center=t,this.radius=i}set(t,i){return this.center.copy(t),this.radius=i,this}setFromPoints(t,i){const r=this.center;i!==void 0?r.copy(i):_y.setFromPoints(t).getCenter(r);let l=0;for(let c=0,h=t.length;c<h;c++)l=Math.max(l,r.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const i=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=i*i}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,i){const r=this.center.distanceToSquared(t);return i.copy(t),r>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Go.subVectors(t,this.center);const i=Go.lengthSq();if(i>this.radius*this.radius){const r=Math.sqrt(i),l=(r-this.radius)*.5;this.center.addScaledVector(Go,l/r),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Hh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Go.copy(t.center).add(Hh)),this.expandByPoint(Go.copy(t.center).sub(Hh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let vy=0;const vi=new Je,Vh=new Nn,Us=new $,oi=new tl,Ho=new tl,Sn=new $;class Cn extends Vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vy++}),this.uuid=$o(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(QM(t)?Hv:Gv)(t,1):this.index=t,this}setIndirect(t,i=0){return this.indirect=t,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,i){return this.attributes[t]=i,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,i,r=0){this.groups.push({start:t,count:i,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(t,i){this.drawRange.start=t,this.drawRange.count=i}applyMatrix4(t){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(t),i.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new pe().getNormalMatrix(t);r.applyNormalMatrix(c),r.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return vi.makeRotationFromQuaternion(t),this.applyMatrix4(vi),this}rotateX(t){return vi.makeRotationX(t),this.applyMatrix4(vi),this}rotateY(t){return vi.makeRotationY(t),this.applyMatrix4(vi),this}rotateZ(t){return vi.makeRotationZ(t),this.applyMatrix4(vi),this}translate(t,i,r){return vi.makeTranslation(t,i,r),this.applyMatrix4(vi),this}scale(t,i,r){return vi.makeScale(t,i,r),this.applyMatrix4(vi),this}lookAt(t){return Vh.lookAt(t),Vh.updateMatrix(),this.applyMatrix4(Vh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(t){const i=this.getAttribute("position");if(i===void 0){const r=[];for(let l=0,c=t.length;l<c;l++){const h=t[l];r.push(h.x,h.y,h.z||0)}this.setAttribute("position",new yn(r,3))}else{const r=Math.min(t.length,i.count);for(let l=0;l<r;l++){const c=t[l];i.setXYZ(l,c.x,c.y,c.z||0)}t.length>i.count&&re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tl);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),i)for(let r=0,l=i.length;r<l;r++){const c=i[r];oi.setFromBufferAttribute(c),this.morphTargetsRelative?(Sn.addVectors(this.boundingBox.min,oi.min),this.boundingBox.expandByPoint(Sn),Sn.addVectors(this.boundingBox.max,oi.max),this.boundingBox.expandByPoint(Sn)):(this.boundingBox.expandByPoint(oi.min),this.boundingBox.expandByPoint(oi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new el);const t=this.attributes.position,i=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(t){const r=this.boundingSphere.center;if(oi.setFromBufferAttribute(t),i)for(let c=0,h=i.length;c<h;c++){const d=i[c];Ho.setFromBufferAttribute(d),this.morphTargetsRelative?(Sn.addVectors(oi.min,Ho.min),oi.expandByPoint(Sn),Sn.addVectors(oi.max,Ho.max),oi.expandByPoint(Sn)):(oi.expandByPoint(Ho.min),oi.expandByPoint(Ho.max))}oi.getCenter(r);let l=0;for(let c=0,h=t.count;c<h;c++)Sn.fromBufferAttribute(t,c),l=Math.max(l,r.distanceToSquared(Sn));if(i)for(let c=0,h=i.length;c<h;c++){const d=i[c],m=this.morphTargetsRelative;for(let p=0,v=d.count;p<v;p++)Sn.fromBufferAttribute(d,p),m&&(Us.fromBufferAttribute(t,p),Sn.add(Us)),l=Math.max(l,r.distanceToSquared(Sn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,i=this.attributes;if(t===null||i.position===void 0||i.normal===void 0||i.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Mn(new Float32Array(4*r.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let T=0;T<r.count;T++)d[T]=new $,m[T]=new $;const p=new $,v=new $,x=new $,g=new Le,y=new Le,E=new Le,A=new $,S=new $;function _(T,O,ft){p.fromBufferAttribute(r,T),v.fromBufferAttribute(r,O),x.fromBufferAttribute(r,ft),g.fromBufferAttribute(c,T),y.fromBufferAttribute(c,O),E.fromBufferAttribute(c,ft),v.sub(p),x.sub(p),y.sub(g),E.sub(g);const G=1/(y.x*E.y-E.x*y.y);isFinite(G)&&(A.copy(v).multiplyScalar(E.y).addScaledVector(x,-y.y).multiplyScalar(G),S.copy(x).multiplyScalar(y.x).addScaledVector(v,-E.x).multiplyScalar(G),d[T].add(A),d[O].add(A),d[ft].add(A),m[T].add(S),m[O].add(S),m[ft].add(S))}let R=this.groups;R.length===0&&(R=[{start:0,count:t.count}]);for(let T=0,O=R.length;T<O;++T){const ft=R[T],G=ft.start,Z=ft.count;for(let nt=G,ut=G+Z;nt<ut;nt+=3)_(t.getX(nt+0),t.getX(nt+1),t.getX(nt+2))}const D=new $,L=new $,B=new $,U=new $;function N(T){B.fromBufferAttribute(l,T),U.copy(B);const O=d[T];D.copy(O),D.sub(B.multiplyScalar(B.dot(O))).normalize(),L.crossVectors(U,O);const G=L.dot(m[T])<0?-1:1;h.setXYZW(T,D.x,D.y,D.z,G)}for(let T=0,O=R.length;T<O;++T){const ft=R[T],G=ft.start,Z=ft.count;for(let nt=G,ut=G+Z;nt<ut;nt+=3)N(t.getX(nt+0)),N(t.getX(nt+1)),N(t.getX(nt+2))}}computeVertexNormals(){const t=this.index,i=this.getAttribute("position");if(i!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Mn(new Float32Array(i.count*3),3),this.setAttribute("normal",r);else for(let g=0,y=r.count;g<y;g++)r.setXYZ(g,0,0,0);const l=new $,c=new $,h=new $,d=new $,m=new $,p=new $,v=new $,x=new $;if(t)for(let g=0,y=t.count;g<y;g+=3){const E=t.getX(g+0),A=t.getX(g+1),S=t.getX(g+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,A),h.fromBufferAttribute(i,S),v.subVectors(h,c),x.subVectors(l,c),v.cross(x),d.fromBufferAttribute(r,E),m.fromBufferAttribute(r,A),p.fromBufferAttribute(r,S),d.add(v),m.add(v),p.add(v),r.setXYZ(E,d.x,d.y,d.z),r.setXYZ(A,m.x,m.y,m.z),r.setXYZ(S,p.x,p.y,p.z)}else for(let g=0,y=i.count;g<y;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),h.fromBufferAttribute(i,g+2),v.subVectors(h,c),x.subVectors(l,c),v.cross(x),r.setXYZ(g+0,v.x,v.y,v.z),r.setXYZ(g+1,v.x,v.y,v.z),r.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let i=0,r=t.count;i<r;i++)Sn.fromBufferAttribute(t,i),Sn.normalize(),t.setXYZ(i,Sn.x,Sn.y,Sn.z)}toNonIndexed(){function t(d,m){const p=d.array,v=d.itemSize,x=d.normalized,g=new p.constructor(m.length*v);let y=0,E=0;for(let A=0,S=m.length;A<S;A++){d.isInterleavedBufferAttribute?y=m[A]*d.data.stride+d.offset:y=m[A]*v;for(let _=0;_<v;_++)g[E++]=p[y++]}return new Mn(g,v,x)}if(this.index===null)return re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Cn,r=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=t(m,r);i.setAttribute(d,p)}const c=this.morphAttributes;for(const d in c){const m=[],p=c[d];for(let v=0,x=p.length;v<x;v++){const g=p[v],y=t(g,r);m.push(y)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(t[p]=m[p]);return t}t.data={attributes:{}};const i=this.index;i!==null&&(t.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const r=this.attributes;for(const m in r){const p=r[m];t.data.attributes[m]=p.toJSON(t.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let x=0,g=p.length;x<g;x++){const y=p[x];v.push(y.toJSON(t.data))}v.length>0&&(l[m]=v,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(t.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere=d.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=t.name;const r=t.index;r!==null&&this.setIndex(r.clone());const l=t.attributes;for(const p in l){const v=l[p];this.setAttribute(p,v.clone(i))}const c=t.morphAttributes;for(const p in c){const v=[],x=c[p];for(let g=0,y=x.length;g<y;g++)v.push(x[g].clone(i));this.morphAttributes[p]=v}this.morphTargetsRelative=t.morphTargetsRelative;const h=t.groups;for(let p=0,v=h.length;p<v;p++){const x=h[p];this.addGroup(x.start,x.count,x.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=t.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let xy=0;class Fr extends Vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xy++}),this.uuid=$o(),this.name="",this.type="Material",this.blending=Ps,this.side=rr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sd,this.blendDst=od,this.blendEquation=Ur,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=l_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ms,this.stencilZFail=Ms,this.stencilZPass=Ms,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const i in t){const r=t[i];if(r===void 0){re(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){re(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(r):l&&l.isVector3&&r&&r.isVector3?l.copy(r):this[i]=r}}toJSON(t){const i=t===void 0||typeof t=="string";i&&(t={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(t).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(t).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(t).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(t).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(t).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Ps&&(r.blending=this.blending),this.side!==rr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==sd&&(r.blendSrc=this.blendSrc),this.blendDst!==od&&(r.blendDst=this.blendDst),this.blendEquation!==Ur&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==l_&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ms&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Ms&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Ms&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function l(c){const h=[];for(const d in c){const m=c[d];delete m.metadata,h.push(m)}return h}if(i){const c=l(t.textures),h=l(t.images);c.length>0&&(r.textures=c),h.length>0&&(r.images=h)}return r}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const i=t.clippingPlanes;let r=null;if(i!==null){const l=i.length;r=new Array(l);for(let c=0;c!==l;++c)r[c]=i[c].clone()}return this.clippingPlanes=r,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const va=new $,Xh=new $,Tc=new $,tr=new $,kh=new $,Ac=new $,Wh=new $;class dp{constructor(t=new $,i=new $(0,0,-1)){this.origin=t,this.direction=i}set(t,i){return this.origin.copy(t),this.direction.copy(i),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,i){return i.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,va)),this}closestPointToPoint(t,i){i.subVectors(t,this.origin);const r=i.dot(this.direction);return r<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const i=va.subVectors(t,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(t):(va.copy(this.origin).addScaledVector(this.direction,i),va.distanceToSquared(t))}distanceSqToSegment(t,i,r,l){Xh.copy(t).add(i).multiplyScalar(.5),Tc.copy(i).sub(t).normalize(),tr.copy(this.origin).sub(Xh);const c=t.distanceTo(i)*.5,h=-this.direction.dot(Tc),d=tr.dot(this.direction),m=-tr.dot(Tc),p=tr.lengthSq(),v=Math.abs(1-h*h);let x,g,y,E;if(v>0)if(x=h*m-d,g=h*d-m,E=c*v,x>=0)if(g>=-E)if(g<=E){const A=1/v;x*=A,g*=A,y=x*(x+h*g+2*d)+g*(h*x+g+2*m)+p}else g=c,x=Math.max(0,-(h*g+d)),y=-x*x+g*(g+2*m)+p;else g=-c,x=Math.max(0,-(h*g+d)),y=-x*x+g*(g+2*m)+p;else g<=-E?(x=Math.max(0,-(-h*c+d)),g=x>0?-c:Math.min(Math.max(-c,-m),c),y=-x*x+g*(g+2*m)+p):g<=E?(x=0,g=Math.min(Math.max(-c,-m),c),y=g*(g+2*m)+p):(x=Math.max(0,-(h*c+d)),g=x>0?c:Math.min(Math.max(-c,-m),c),y=-x*x+g*(g+2*m)+p);else g=h>0?-c:c,x=Math.max(0,-(h*g+d)),y=-x*x+g*(g+2*m)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,x),l&&l.copy(Xh).addScaledVector(Tc,g),y}intersectSphere(t,i){va.subVectors(t.center,this.origin);const r=va.dot(this.direction),l=va.dot(va)-r*r,c=t.radius*t.radius;if(l>c)return null;const h=Math.sqrt(c-l),d=r-h,m=r+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const i=t.normal.dot(this.direction);if(i===0)return t.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(t.normal)+t.constant)/i;return r>=0?r:null}intersectPlane(t,i){const r=this.distanceToPlane(t);return r===null?null:this.at(r,i)}intersectsPlane(t){const i=t.distanceToPoint(this.origin);return i===0||t.normal.dot(this.direction)*i<0}intersectBox(t,i){let r,l,c,h,d,m;const p=1/this.direction.x,v=1/this.direction.y,x=1/this.direction.z,g=this.origin;return p>=0?(r=(t.min.x-g.x)*p,l=(t.max.x-g.x)*p):(r=(t.max.x-g.x)*p,l=(t.min.x-g.x)*p),v>=0?(c=(t.min.y-g.y)*v,h=(t.max.y-g.y)*v):(c=(t.max.y-g.y)*v,h=(t.min.y-g.y)*v),r>h||c>l||((c>r||isNaN(r))&&(r=c),(h<l||isNaN(l))&&(l=h),x>=0?(d=(t.min.z-g.z)*x,m=(t.max.z-g.z)*x):(d=(t.max.z-g.z)*x,m=(t.min.z-g.z)*x),r>m||d>l)||((d>r||r!==r)&&(r=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(r>=0?r:l,i)}intersectsBox(t){return this.intersectBox(t,va)!==null}intersectTriangle(t,i,r,l,c){kh.subVectors(i,t),Ac.subVectors(r,t),Wh.crossVectors(kh,Ac);let h=this.direction.dot(Wh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;tr.subVectors(this.origin,t);const m=d*this.direction.dot(Ac.crossVectors(tr,Ac));if(m<0)return null;const p=d*this.direction.dot(kh.cross(tr));if(p<0||m+p>h)return null;const v=-d*tr.dot(Wh);return v<0?null:this.at(v/h,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class su extends Fr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ni,this.combine=xv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const b_=new Je,Ar=new dp,Rc=new el,T_=new $,Cc=new $,wc=new $,Dc=new $,qh=new $,Uc=new $,A_=new $,Lc=new $;class Hn extends Nn{constructor(t=new Cn,i=new su){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,i){const r=this.geometry,l=r.attributes.position,c=r.morphAttributes.position,h=r.morphTargetsRelative;i.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Uc.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const v=d[m],x=c[m];v!==0&&(qh.fromBufferAttribute(x,t),h?Uc.addScaledVector(qh,v):Uc.addScaledVector(qh.sub(i),v))}i.add(Uc)}return i}raycast(t,i){const r=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Rc.copy(r.boundingSphere),Rc.applyMatrix4(c),Ar.copy(t.ray).recast(t.near),!(Rc.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(Rc,T_)===null||Ar.origin.distanceToSquared(T_)>(t.far-t.near)**2))&&(b_.copy(c).invert(),Ar.copy(t.ray).applyMatrix4(b_),!(r.boundingBox!==null&&Ar.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(t,i,Ar)))}_computeIntersections(t,i,r){let l;const c=this.geometry,h=this.material,d=c.index,m=c.attributes.position,p=c.attributes.uv,v=c.attributes.uv1,x=c.attributes.normal,g=c.groups,y=c.drawRange;if(d!==null)if(Array.isArray(h))for(let E=0,A=g.length;E<A;E++){const S=g[E],_=h[S.materialIndex],R=Math.max(S.start,y.start),D=Math.min(d.count,Math.min(S.start+S.count,y.start+y.count));for(let L=R,B=D;L<B;L+=3){const U=d.getX(L),N=d.getX(L+1),T=d.getX(L+2);l=Nc(this,_,t,r,p,v,x,U,N,T),l&&(l.faceIndex=Math.floor(L/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const E=Math.max(0,y.start),A=Math.min(d.count,y.start+y.count);for(let S=E,_=A;S<_;S+=3){const R=d.getX(S),D=d.getX(S+1),L=d.getX(S+2);l=Nc(this,h,t,r,p,v,x,R,D,L),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let E=0,A=g.length;E<A;E++){const S=g[E],_=h[S.materialIndex],R=Math.max(S.start,y.start),D=Math.min(m.count,Math.min(S.start+S.count,y.start+y.count));for(let L=R,B=D;L<B;L+=3){const U=L,N=L+1,T=L+2;l=Nc(this,_,t,r,p,v,x,U,N,T),l&&(l.faceIndex=Math.floor(L/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const E=Math.max(0,y.start),A=Math.min(m.count,y.start+y.count);for(let S=E,_=A;S<_;S+=3){const R=S,D=S+1,L=S+2;l=Nc(this,h,t,r,p,v,x,R,D,L),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function Sy(s,t,i,r,l,c,h,d){let m;if(t.side===Kn?m=r.intersectTriangle(h,c,l,!0,d):m=r.intersectTriangle(l,c,h,t.side===rr,d),m===null)return null;Lc.copy(d),Lc.applyMatrix4(s.matrixWorld);const p=i.ray.origin.distanceTo(Lc);return p<i.near||p>i.far?null:{distance:p,point:Lc.clone(),object:s}}function Nc(s,t,i,r,l,c,h,d,m,p){s.getVertexPosition(d,Cc),s.getVertexPosition(m,wc),s.getVertexPosition(p,Dc);const v=Sy(s,t,i,r,Cc,wc,Dc,A_);if(v){const x=new $;Ui.getBarycoord(A_,Cc,wc,Dc,x),l&&(v.uv=Ui.getInterpolatedAttribute(l,d,m,p,x,new Le)),c&&(v.uv1=Ui.getInterpolatedAttribute(c,d,m,p,x,new Le)),h&&(v.normal=Ui.getInterpolatedAttribute(h,d,m,p,x,new $),v.normal.dot(r.direction)>0&&v.normal.multiplyScalar(-1));const g={a:d,b:m,c:p,normal:new $,materialIndex:0};Ui.getNormal(Cc,wc,Dc,g.normal),v.face=g,v.barycoord=x}return v}class My extends Gn{constructor(t=null,i=1,r=1,l,c,h,d,m,p=Rn,v=Rn,x,g){super(null,h,d,m,p,v,l,c,x,g),this.isDataTexture=!0,this.image={data:t,width:i,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Yh=new $,yy=new $,Ey=new pe;class Dr{constructor(t=new $(1,0,0),i=0){this.isPlane=!0,this.normal=t,this.constant=i}set(t,i){return this.normal.copy(t),this.constant=i,this}setComponents(t,i,r,l){return this.normal.set(t,i,r),this.constant=l,this}setFromNormalAndCoplanarPoint(t,i){return this.normal.copy(t),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(t,i,r){const l=Yh.subVectors(r,i).cross(yy.subVectors(t,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,i){return i.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,i){const r=t.delta(Yh),l=this.normal.dot(r);if(l===0)return this.distanceToPoint(t.start)===0?i.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(t.start).addScaledVector(r,c)}intersectsLine(t){const i=this.distanceToPoint(t.start),r=this.distanceToPoint(t.end);return i<0&&r>0||r<0&&i>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,i){const r=i||Ey.getNormalMatrix(t),l=this.coplanarPoint(Yh).applyMatrix4(t),c=this.normal.applyMatrix3(r).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rr=new el,by=new Le(.5,.5),Oc=new $;class pp{constructor(t=new Dr,i=new Dr,r=new Dr,l=new Dr,c=new Dr,h=new Dr){this.planes=[t,i,r,l,c,h]}set(t,i,r,l,c,h){const d=this.planes;return d[0].copy(t),d[1].copy(i),d[2].copy(r),d[3].copy(l),d[4].copy(c),d[5].copy(h),this}copy(t){const i=this.planes;for(let r=0;r<6;r++)i[r].copy(t.planes[r]);return this}setFromProjectionMatrix(t,i=ki,r=!1){const l=this.planes,c=t.elements,h=c[0],d=c[1],m=c[2],p=c[3],v=c[4],x=c[5],g=c[6],y=c[7],E=c[8],A=c[9],S=c[10],_=c[11],R=c[12],D=c[13],L=c[14],B=c[15];if(l[0].setComponents(p-h,y-v,_-E,B-R).normalize(),l[1].setComponents(p+h,y+v,_+E,B+R).normalize(),l[2].setComponents(p+d,y+x,_+A,B+D).normalize(),l[3].setComponents(p-d,y-x,_-A,B-D).normalize(),r)l[4].setComponents(m,g,S,L).normalize(),l[5].setComponents(p-m,y-g,_-S,B-L).normalize();else if(l[4].setComponents(p-m,y-g,_-S,B-L).normalize(),i===ki)l[5].setComponents(p+m,y+g,_+S,B+L).normalize();else if(i===Qo)l[5].setComponents(m,g,S,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Rr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const i=t.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Rr.copy(i.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Rr)}intersectsSprite(t){Rr.center.set(0,0,0);const i=by.distanceTo(t.center);return Rr.radius=.7071067811865476+i,Rr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Rr)}intersectsSphere(t){const i=this.planes,r=t.center,l=-t.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(r)<l)return!1;return!0}intersectsBox(t){const i=this.planes;for(let r=0;r<6;r++){const l=i[r];if(Oc.x=l.normal.x>0?t.max.x:t.min.x,Oc.y=l.normal.y>0?t.max.y:t.min.y,Oc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Oc)<0)return!1}return!0}containsPoint(t){const i=this.planes;for(let r=0;r<6;r++)if(i[r].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class mp extends Fr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const eu=new $,nu=new $,R_=new Je,Vo=new dp,Pc=new el,jh=new $,C_=new $;class Vv extends Nn{constructor(t=new Cn,i=new mp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,r=[0];for(let l=1,c=i.count;l<c;l++)eu.fromBufferAttribute(i,l-1),nu.fromBufferAttribute(i,l),r[l]=r[l-1],r[l]+=eu.distanceTo(nu);t.setAttribute("lineDistance",new yn(r,1))}else re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,i){const r=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,h=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Pc.copy(r.boundingSphere),Pc.applyMatrix4(l),Pc.radius+=c,t.ray.intersectsSphere(Pc)===!1)return;R_.copy(l).invert(),Vo.copy(t.ray).applyMatrix4(R_);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,v=r.index,g=r.attributes.position;if(v!==null){const y=Math.max(0,h.start),E=Math.min(v.count,h.start+h.count);for(let A=y,S=E-1;A<S;A+=p){const _=v.getX(A),R=v.getX(A+1),D=Ic(this,t,Vo,m,_,R,A);D&&i.push(D)}if(this.isLineLoop){const A=v.getX(E-1),S=v.getX(y),_=Ic(this,t,Vo,m,A,S,E-1);_&&i.push(_)}}else{const y=Math.max(0,h.start),E=Math.min(g.count,h.start+h.count);for(let A=y,S=E-1;A<S;A+=p){const _=Ic(this,t,Vo,m,A,A+1,A);_&&i.push(_)}if(this.isLineLoop){const A=Ic(this,t,Vo,m,E-1,y,E-1);A&&i.push(A)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Ic(s,t,i,r,l,c,h){const d=s.geometry.attributes.position;if(eu.fromBufferAttribute(d,l),nu.fromBufferAttribute(d,c),i.distanceSqToSegment(eu,nu,jh,C_)>r)return;jh.applyMatrix4(s.matrixWorld);const p=t.ray.origin.distanceTo(jh);if(!(p<t.near||p>t.far))return{distance:p,point:C_.clone().applyMatrix4(s.matrixWorld),index:h,face:null,faceIndex:null,barycoord:null,object:s}}const w_=new $,D_=new $;class Xv extends Vv{constructor(t,i){super(t,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const i=t.attributes.position,r=[];for(let l=0,c=i.count;l<c;l+=2)w_.fromBufferAttribute(i,l),D_.fromBufferAttribute(i,l+1),r[l]=l===0?0:r[l-1],r[l+1]=r[l]+w_.distanceTo(D_);t.setAttribute("lineDistance",new yn(r,1))}else re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ty extends Fr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const U_=new Je,Kd=new dp,zc=new el,Fc=new $;class Ay extends Nn{constructor(t=new Cn,i=new Ty){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,i){return super.copy(t,i),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,i){const r=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,h=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),zc.copy(r.boundingSphere),zc.applyMatrix4(l),zc.radius+=c,t.ray.intersectsSphere(zc)===!1)return;U_.copy(l).invert(),Kd.copy(t.ray).applyMatrix4(U_);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=r.index,x=r.attributes.position;if(p!==null){const g=Math.max(0,h.start),y=Math.min(p.count,h.start+h.count);for(let E=g,A=y;E<A;E++){const S=p.getX(E);Fc.fromBufferAttribute(x,S),L_(Fc,S,m,l,t,i,this)}}else{const g=Math.max(0,h.start),y=Math.min(x.count,h.start+h.count);for(let E=g,A=y;E<A;E++)Fc.fromBufferAttribute(x,E),L_(Fc,E,m,l,t,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,r=Object.keys(i);if(r.length>0){const l=i[r[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,h=l.length;c<h;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function L_(s,t,i,r,l,c,h){const d=Kd.distanceSqToPoint(s);if(d<i){const m=new $;Kd.closestPointToPoint(s,m),m.applyMatrix4(r);const p=l.ray.origin.distanceTo(m);if(p<l.near||p>l.far)return;c.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:t,face:null,faceIndex:null,barycoord:null,object:h})}}class kv extends Gn{constructor(t=[],i=Ir,r,l,c,h,d,m,p,v){super(t,i,r,l,c,h,d,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Jo extends Gn{constructor(t,i,r=ji,l,c,h,d=Rn,m=Rn,p,v=Ea,x=1){if(v!==Ea&&v!==Or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:i,depth:x};super(g,l,c,h,d,m,v,r,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new hp(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const i=super.toJSON(t);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Ry extends Jo{constructor(t,i=ji,r=Ir,l,c,h=Rn,d=Rn,m,p=Ea){const v={width:t,height:t,depth:1},x=[v,v,v,v,v,v];super(t,t,i,r,l,c,h,d,m,p),this.image=x,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Wv extends Gn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class nl extends Cn{constructor(t=1,i=1,r=1,l=1,c=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:i,depth:r,widthSegments:l,heightSegments:c,depthSegments:h};const d=this;l=Math.floor(l),c=Math.floor(c),h=Math.floor(h);const m=[],p=[],v=[],x=[];let g=0,y=0;E("z","y","x",-1,-1,r,i,t,h,c,0),E("z","y","x",1,-1,r,i,-t,h,c,1),E("x","z","y",1,1,t,r,i,l,h,2),E("x","z","y",1,-1,t,r,-i,l,h,3),E("x","y","z",1,-1,t,i,r,l,c,4),E("x","y","z",-1,-1,t,i,-r,l,c,5),this.setIndex(m),this.setAttribute("position",new yn(p,3)),this.setAttribute("normal",new yn(v,3)),this.setAttribute("uv",new yn(x,2));function E(A,S,_,R,D,L,B,U,N,T,O){const ft=L/N,G=B/T,Z=L/2,nt=B/2,ut=U/2,Q=N+1,I=T+1;let F=0,rt=0;const ot=new $;for(let vt=0;vt<I;vt++){const P=vt*G-nt;for(let k=0;k<Q;k++){const ct=k*ft-Z;ot[A]=ct*R,ot[S]=P*D,ot[_]=ut,p.push(ot.x,ot.y,ot.z),ot[A]=0,ot[S]=0,ot[_]=U>0?1:-1,v.push(ot.x,ot.y,ot.z),x.push(k/N),x.push(1-vt/T),F+=1}}for(let vt=0;vt<T;vt++)for(let P=0;P<N;P++){const k=g+P+Q*vt,ct=g+P+Q*(vt+1),yt=g+(P+1)+Q*(vt+1),Rt=g+(P+1)+Q*vt;m.push(k,ct,Rt),m.push(ct,yt,Rt),rt+=6}d.addGroup(y,rt,O),y+=rt,g+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ou extends Cn{constructor(t=1,i=1,r=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:i,widthSegments:r,heightSegments:l};const c=t/2,h=i/2,d=Math.floor(r),m=Math.floor(l),p=d+1,v=m+1,x=t/d,g=i/m,y=[],E=[],A=[],S=[];for(let _=0;_<v;_++){const R=_*g-h;for(let D=0;D<p;D++){const L=D*x-c;E.push(L,-R,0),A.push(0,0,1),S.push(D/d),S.push(1-_/m)}}for(let _=0;_<m;_++)for(let R=0;R<d;R++){const D=R+p*_,L=R+p*(_+1),B=R+1+p*(_+1),U=R+1+p*_;y.push(D,L,U),y.push(L,B,U)}this.setIndex(y),this.setAttribute("position",new yn(E,3)),this.setAttribute("normal",new yn(A,3)),this.setAttribute("uv",new yn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ou(t.width,t.height,t.widthSegments,t.heightSegments)}}class gp extends Cn{constructor(t=.5,i=1,r=32,l=1,c=0,h=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:i,thetaSegments:r,phiSegments:l,thetaStart:c,thetaLength:h},r=Math.max(3,r),l=Math.max(1,l);const d=[],m=[],p=[],v=[];let x=t;const g=(i-t)/l,y=new $,E=new Le;for(let A=0;A<=l;A++){for(let S=0;S<=r;S++){const _=c+S/r*h;y.x=x*Math.cos(_),y.y=x*Math.sin(_),m.push(y.x,y.y,y.z),p.push(0,0,1),E.x=(y.x/i+1)/2,E.y=(y.y/i+1)/2,v.push(E.x,E.y)}x+=g}for(let A=0;A<l;A++){const S=A*(r+1);for(let _=0;_<r;_++){const R=_+S,D=R,L=R+r+1,B=R+r+2,U=R+1;d.push(D,L,U),d.push(L,B,U)}}this.setIndex(d),this.setAttribute("position",new yn(m,3)),this.setAttribute("normal",new yn(p,3)),this.setAttribute("uv",new yn(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gp(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class zr extends Cn{constructor(t=1,i=32,r=16,l=0,c=Math.PI*2,h=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:i,heightSegments:r,phiStart:l,phiLength:c,thetaStart:h,thetaLength:d},i=Math.max(3,Math.floor(i)),r=Math.max(2,Math.floor(r));const m=Math.min(h+d,Math.PI);let p=0;const v=[],x=new $,g=new $,y=[],E=[],A=[],S=[];for(let _=0;_<=r;_++){const R=[],D=_/r;let L=0;_===0&&h===0?L=.5/i:_===r&&m===Math.PI&&(L=-.5/i);for(let B=0;B<=i;B++){const U=B/i;x.x=-t*Math.cos(l+U*c)*Math.sin(h+D*d),x.y=t*Math.cos(h+D*d),x.z=t*Math.sin(l+U*c)*Math.sin(h+D*d),E.push(x.x,x.y,x.z),g.copy(x).normalize(),A.push(g.x,g.y,g.z),S.push(U+L,1-D),R.push(p++)}v.push(R)}for(let _=0;_<r;_++)for(let R=0;R<i;R++){const D=v[_][R+1],L=v[_][R],B=v[_+1][R],U=v[_+1][R+1];(_!==0||h>0)&&y.push(D,L,U),(_!==r-1||m<Math.PI)&&y.push(L,B,U)}this.setIndex(y),this.setAttribute("position",new yn(E,3)),this.setAttribute("normal",new yn(A,3)),this.setAttribute("uv",new yn(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Hs(s){const t={};for(const i in s){t[i]={};for(const r in s[i]){const l=s[i][r];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[i][r]=null):t[i][r]=l.clone():Array.isArray(l)?t[i][r]=l.slice():t[i][r]=l}}return t}function Bn(s){const t={};for(let i=0;i<s.length;i++){const r=Hs(s[i]);for(const l in r)t[l]=r[l]}return t}function Cy(s){const t=[];for(let i=0;i<s.length;i++)t.push(s[i].clone());return t}function qv(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Re.workingColorSpace}const wy={clone:Hs,merge:Bn};var Dy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Fr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dy,this.fragmentShader=Uy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hs(t.uniforms),this.uniformsGroups=Cy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const i=super.toJSON(t);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(t).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const r={};for(const l in this.extensions)this.extensions[l]===!0&&(r[l]=!0);return Object.keys(r).length>0&&(i.extensions=r),i}}class Ly extends Vn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ny extends Fr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pv,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Oy extends Fr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=XM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Py extends Fr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Yv extends Nn{constructor(t,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=i}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,i){return super.copy(t,i),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const i=super.toJSON(t);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const Zh=new Je,N_=new $,O_=new $;class Iy{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.mapType=ci,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pp,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new nn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const i=this.camera,r=this.matrix;N_.setFromMatrixPosition(t.matrixWorld),i.position.copy(N_),O_.setFromMatrixPosition(t.target.matrixWorld),i.lookAt(O_),i.updateMatrixWorld(),Zh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zh,i.coordinateSystem,i.reversedDepth),i.coordinateSystem===Qo||i.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Zh)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Bc=new $,Gc=new Xs,Bi=new $;class jv extends Nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=ki,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,i){return super.copy(t,i),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Bc,Gc,Bi),Bi.x===1&&Bi.y===1&&Bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bc,Gc,Bi.set(1,1,1)).invert()}updateWorldMatrix(t,i){super.updateWorldMatrix(t,i),this.matrixWorld.decompose(Bc,Gc,Bi),Bi.x===1&&Bi.y===1&&Bi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bc,Gc,Bi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const er=new $,P_=new Le,I_=new Le;class li extends jv{constructor(t=50,i=1,r=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=r,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const i=.5*this.getFilmHeight()/t;this.fov=Zd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(bh*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zd*2*Math.atan(Math.tan(bh*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,i,r){er.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(er.x,er.y).multiplyScalar(-t/er.z),er.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(er.x,er.y).multiplyScalar(-t/er.z)}getViewSize(t,i){return this.getViewBounds(t,P_,I_),i.subVectors(I_,P_)}setViewOffset(t,i,r,l,c,h){this.aspect=t/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let i=t*Math.tan(bh*.5*this.fov)/this.zoom,r=2*i,l=this.aspect*r,c=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;c+=h.offsetX*l/m,i-=h.offsetY*r/p,l*=h.width/m,r*=h.height/p}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-r,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class zy extends Iy{constructor(){super(new li(90,1,.5,500)),this.isPointLightShadow=!0}}class Fy extends Yv{constructor(t,i,r=0,l=2){super(t,i),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=l,this.shadow=new zy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,i){return super.copy(t,i),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const i=super.toJSON(t);return i.object.distance=this.distance,i.object.decay=this.decay,i.object.shadow=this.shadow.toJSON(),i}}class Zv extends jv{constructor(t=-1,i=1,r=1,l=-1,c=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=i,this.top=r,this.bottom=l,this.near=c,this.far=h,this.updateProjectionMatrix()}copy(t,i){return super.copy(t,i),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,i,r,l,c,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=i,this.view.offsetX=r,this.view.offsetY=l,this.view.width=c,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=r-t,h=r+t,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,h=c+p*this.view.width,d-=v*this.view.offsetY,m=d-v*this.view.height}this.projectionMatrix.makeOrthographic(c,h,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const i=super.toJSON(t);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class By extends Yv{constructor(t,i){super(t,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const Ls=-90,Ns=1;class Gy extends Nn{constructor(t,i,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new li(Ls,Ns,t,i);l.layers=this.layers,this.add(l);const c=new li(Ls,Ns,t,i);c.layers=this.layers,this.add(c);const h=new li(Ls,Ns,t,i);h.layers=this.layers,this.add(h);const d=new li(Ls,Ns,t,i);d.layers=this.layers,this.add(d);const m=new li(Ls,Ns,t,i);m.layers=this.layers,this.add(m);const p=new li(Ls,Ns,t,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const t=this.coordinateSystem,i=this.children.concat(),[r,l,c,h,d,m]=i;for(const p of i)this.remove(p);if(t===ki)r.up.set(0,1,0),r.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(t===Qo)r.up.set(0,-1,0),r.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const p of i)this.add(p),p.updateMatrixWorld()}update(t,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,h,d,m,p,v]=this.children,x=t.getRenderTarget(),g=t.getActiveCubeFace(),y=t.getActiveMipmapLevel(),E=t.xr.enabled;t.xr.enabled=!1;const A=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let S=!1;t.isWebGLRenderer===!0?S=t.state.buffers.depth.getReversed():S=t.reversedDepthBuffer,t.setRenderTarget(r,0,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,c),t.setRenderTarget(r,1,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,h),t.setRenderTarget(r,2,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,d),t.setRenderTarget(r,3,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,m),t.setRenderTarget(r,4,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,p),r.texture.generateMipmaps=A,t.setRenderTarget(r,5,l),S&&t.autoClear===!1&&t.clearDepth(),t.render(i,v),t.setRenderTarget(x,g,y),t.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class Hy extends li{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function z_(s,t,i,r){const l=Vy(r);switch(i){case Lv:return s*t;case Ov:return s*t/l.components*l.byteLength;case op:return s*t/l.components*l.byteLength;case Bs:return s*t*2/l.components*l.byteLength;case lp:return s*t*2/l.components*l.byteLength;case Nv:return s*t*3/l.components*l.byteLength;case Li:return s*t*4/l.components*l.byteLength;case cp:return s*t*4/l.components*l.byteLength;case Yc:case jc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Zc:case Kc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case vd:case Sd:return Math.max(s,16)*Math.max(t,8)/4;case _d:case xd:return Math.max(s,8)*Math.max(t,8)/2;case Md:case yd:case bd:case Td:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ed:case Ad:case Rd:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Cd:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case wd:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Dd:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ud:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ld:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Nd:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Od:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Pd:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Id:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case zd:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Fd:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Bd:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Gd:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Hd:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Vd:case Xd:case kd:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Wd:case qd:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Yd:case jd:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function Vy(s){switch(s){case ci:case Cv:return{byteLength:1,components:1};case Zo:case wv:case ya:return{byteLength:2,components:1};case rp:case sp:return{byteLength:2,components:4};case ji:case ap:case Xi:return{byteLength:4,components:1};case Dv:case Uv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ip}}));typeof window<"u"&&(window.__THREE__?re("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ip);function Kv(){let s=null,t=!1,i=null,r=null;function l(c,h){i(c,h),r=s.requestAnimationFrame(l)}return{start:function(){t!==!0&&i!==null&&(r=s.requestAnimationFrame(l),t=!0)},stop:function(){s.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(c){i=c},setContext:function(c){s=c}}}function Xy(s){const t=new WeakMap;function i(d,m){const p=d.array,v=d.usage,x=p.byteLength,g=s.createBuffer();s.bindBuffer(m,g),s.bufferData(m,p,v),d.onUploadCallback();let y;if(p instanceof Float32Array)y=s.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)y=s.HALF_FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?y=s.HALF_FLOAT:y=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)y=s.SHORT;else if(p instanceof Uint32Array)y=s.UNSIGNED_INT;else if(p instanceof Int32Array)y=s.INT;else if(p instanceof Int8Array)y=s.BYTE;else if(p instanceof Uint8Array)y=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)y=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:y,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:x}}function r(d,m,p){const v=m.array,x=m.updateRanges;if(s.bindBuffer(p,d),x.length===0)s.bufferSubData(p,0,v);else{x.sort((y,E)=>y.start-E.start);let g=0;for(let y=1;y<x.length;y++){const E=x[g],A=x[y];A.start<=E.start+E.count+1?E.count=Math.max(E.count,A.start+A.count-E.start):(++g,x[g]=A)}x.length=g+1;for(let y=0,E=x.length;y<E;y++){const A=x[y];s.bufferSubData(p,A.start*v.BYTES_PER_ELEMENT,v,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=t.get(d);m&&(s.deleteBuffer(m.buffer),t.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=t.get(d);(!v||v.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=t.get(d);if(p===void 0)t.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,m),p.version=d.version}}return{get:l,remove:c,update:h}}var ky=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ky=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,$y=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,aE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,sE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,oE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,uE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,fE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,dE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_E=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,SE="gl_FragColor = linearToOutputTexel( gl_FragColor );",ME=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,EE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,bE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,TE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,AE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,RE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,CE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,DE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,UE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,LE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,NE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,OE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,PE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,IE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,zE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,FE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,BE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,GE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,HE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,VE=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,XE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,WE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,YE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ZE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,KE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,QE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,JE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$E=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,eb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ib=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ab=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,sb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ob=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ub=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,db=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_b=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,xb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Eb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ab=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Rb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Db=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ub=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Nb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ob=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ib=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Bb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Qb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Jb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,t1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,n1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,i1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,a1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,r1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,s1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,o1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,l1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,u1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,f1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,p1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,v1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,M1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,y1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,me={alphahash_fragment:ky,alphahash_pars_fragment:Wy,alphamap_fragment:qy,alphamap_pars_fragment:Yy,alphatest_fragment:jy,alphatest_pars_fragment:Zy,aomap_fragment:Ky,aomap_pars_fragment:Qy,batching_pars_vertex:Jy,batching_vertex:$y,begin_vertex:tE,beginnormal_vertex:eE,bsdfs:nE,iridescence_fragment:iE,bumpmap_pars_fragment:aE,clipping_planes_fragment:rE,clipping_planes_pars_fragment:sE,clipping_planes_pars_vertex:oE,clipping_planes_vertex:lE,color_fragment:cE,color_pars_fragment:uE,color_pars_vertex:fE,color_vertex:hE,common:dE,cube_uv_reflection_fragment:pE,defaultnormal_vertex:mE,displacementmap_pars_vertex:gE,displacementmap_vertex:_E,emissivemap_fragment:vE,emissivemap_pars_fragment:xE,colorspace_fragment:SE,colorspace_pars_fragment:ME,envmap_fragment:yE,envmap_common_pars_fragment:EE,envmap_pars_fragment:bE,envmap_pars_vertex:TE,envmap_physical_pars_fragment:IE,envmap_vertex:AE,fog_vertex:RE,fog_pars_vertex:CE,fog_fragment:wE,fog_pars_fragment:DE,gradientmap_pars_fragment:UE,lightmap_pars_fragment:LE,lights_lambert_fragment:NE,lights_lambert_pars_fragment:OE,lights_pars_begin:PE,lights_toon_fragment:zE,lights_toon_pars_fragment:FE,lights_phong_fragment:BE,lights_phong_pars_fragment:GE,lights_physical_fragment:HE,lights_physical_pars_fragment:VE,lights_fragment_begin:XE,lights_fragment_maps:kE,lights_fragment_end:WE,logdepthbuf_fragment:qE,logdepthbuf_pars_fragment:YE,logdepthbuf_pars_vertex:jE,logdepthbuf_vertex:ZE,map_fragment:KE,map_pars_fragment:QE,map_particle_fragment:JE,map_particle_pars_fragment:$E,metalnessmap_fragment:tb,metalnessmap_pars_fragment:eb,morphinstance_vertex:nb,morphcolor_vertex:ib,morphnormal_vertex:ab,morphtarget_pars_vertex:rb,morphtarget_vertex:sb,normal_fragment_begin:ob,normal_fragment_maps:lb,normal_pars_fragment:cb,normal_pars_vertex:ub,normal_vertex:fb,normalmap_pars_fragment:hb,clearcoat_normal_fragment_begin:db,clearcoat_normal_fragment_maps:pb,clearcoat_pars_fragment:mb,iridescence_pars_fragment:gb,opaque_fragment:_b,packing:vb,premultiplied_alpha_fragment:xb,project_vertex:Sb,dithering_fragment:Mb,dithering_pars_fragment:yb,roughnessmap_fragment:Eb,roughnessmap_pars_fragment:bb,shadowmap_pars_fragment:Tb,shadowmap_pars_vertex:Ab,shadowmap_vertex:Rb,shadowmask_pars_fragment:Cb,skinbase_vertex:wb,skinning_pars_vertex:Db,skinning_vertex:Ub,skinnormal_vertex:Lb,specularmap_fragment:Nb,specularmap_pars_fragment:Ob,tonemapping_fragment:Pb,tonemapping_pars_fragment:Ib,transmission_fragment:zb,transmission_pars_fragment:Fb,uv_pars_fragment:Bb,uv_pars_vertex:Gb,uv_vertex:Hb,worldpos_vertex:Vb,background_vert:Xb,background_frag:kb,backgroundCube_vert:Wb,backgroundCube_frag:qb,cube_vert:Yb,cube_frag:jb,depth_vert:Zb,depth_frag:Kb,distance_vert:Qb,distance_frag:Jb,equirect_vert:$b,equirect_frag:t1,linedashed_vert:e1,linedashed_frag:n1,meshbasic_vert:i1,meshbasic_frag:a1,meshlambert_vert:r1,meshlambert_frag:s1,meshmatcap_vert:o1,meshmatcap_frag:l1,meshnormal_vert:c1,meshnormal_frag:u1,meshphong_vert:f1,meshphong_frag:h1,meshphysical_vert:d1,meshphysical_frag:p1,meshtoon_vert:m1,meshtoon_frag:g1,points_vert:_1,points_frag:v1,shadow_vert:x1,shadow_frag:S1,sprite_vert:M1,sprite_frag:y1},Nt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pe},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pe}},envmap:{envMap:{value:null},envMapRotation:{value:new pe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pe},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0},uvTransform:{value:new pe}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pe},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0}}},Hi={basic:{uniforms:Bn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:me.meshbasic_vert,fragmentShader:me.meshbasic_frag},lambert:{uniforms:Bn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:me.meshlambert_vert,fragmentShader:me.meshlambert_frag},phong:{uniforms:Bn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:me.meshphong_vert,fragmentShader:me.meshphong_frag},standard:{uniforms:Bn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag},toon:{uniforms:Bn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:me.meshtoon_vert,fragmentShader:me.meshtoon_frag},matcap:{uniforms:Bn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:me.meshmatcap_vert,fragmentShader:me.meshmatcap_frag},points:{uniforms:Bn([Nt.points,Nt.fog]),vertexShader:me.points_vert,fragmentShader:me.points_frag},dashed:{uniforms:Bn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:me.linedashed_vert,fragmentShader:me.linedashed_frag},depth:{uniforms:Bn([Nt.common,Nt.displacementmap]),vertexShader:me.depth_vert,fragmentShader:me.depth_frag},normal:{uniforms:Bn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:me.meshnormal_vert,fragmentShader:me.meshnormal_frag},sprite:{uniforms:Bn([Nt.sprite,Nt.fog]),vertexShader:me.sprite_vert,fragmentShader:me.sprite_frag},background:{uniforms:{uvTransform:{value:new pe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:me.background_vert,fragmentShader:me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pe}},vertexShader:me.backgroundCube_vert,fragmentShader:me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:me.cube_vert,fragmentShader:me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:me.equirect_vert,fragmentShader:me.equirect_frag},distance:{uniforms:Bn([Nt.common,Nt.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:me.distance_vert,fragmentShader:me.distance_frag},shadow:{uniforms:Bn([Nt.lights,Nt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:me.shadow_vert,fragmentShader:me.shadow_frag}};Hi.physical={uniforms:Bn([Hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pe},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pe},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pe},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pe},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pe},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pe}}]),vertexShader:me.meshphysical_vert,fragmentShader:me.meshphysical_frag};const Hc={r:0,b:0,g:0},Cr=new Ni,E1=new Je;function b1(s,t,i,r,l,c){const h=new Ft(0);let d=l===!0?0:1,m,p,v=null,x=0,g=null;function y(R){let D=R.isScene===!0?R.background:null;if(D&&D.isTexture){const L=R.backgroundBlurriness>0;D=t.get(D,L)}return D}function E(R){let D=!1;const L=y(R);L===null?S(h,d):L&&L.isColor&&(S(L,1),D=!0);const B=s.xr.getEnvironmentBlendMode();B==="additive"?i.buffers.color.setClear(0,0,0,1,c):B==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(s.autoClear||D)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function A(R,D){const L=y(D);L&&(L.isCubeTexture||L.mapping===ru)?(p===void 0&&(p=new Hn(new nl(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:Hs(Hi.backgroundCube.uniforms),vertexShader:Hi.backgroundCube.vertexShader,fragmentShader:Hi.backgroundCube.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(B,U,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(p)),Cr.copy(D.backgroundRotation),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),p.material.uniforms.envMap.value=L,p.material.uniforms.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=D.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(E1.makeRotationFromEuler(Cr)),p.material.toneMapped=Re.getTransfer(L.colorSpace)!==Ge,(v!==L||x!==L.version||g!==s.toneMapping)&&(p.material.needsUpdate=!0,v=L,x=L.version,g=s.toneMapping),p.layers.enableAll(),R.unshift(p,p.geometry,p.material,0,0,null)):L&&L.isTexture&&(m===void 0&&(m=new Hn(new ou(2,2),new Vn({name:"BackgroundMaterial",uniforms:Hs(Hi.background.uniforms),vertexShader:Hi.background.vertexShader,fragmentShader:Hi.background.fragmentShader,side:rr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(m)),m.material.uniforms.t2D.value=L,m.material.uniforms.backgroundIntensity.value=D.backgroundIntensity,m.material.toneMapped=Re.getTransfer(L.colorSpace)!==Ge,L.matrixAutoUpdate===!0&&L.updateMatrix(),m.material.uniforms.uvTransform.value.copy(L.matrix),(v!==L||x!==L.version||g!==s.toneMapping)&&(m.material.needsUpdate=!0,v=L,x=L.version,g=s.toneMapping),m.layers.enableAll(),R.unshift(m,m.geometry,m.material,0,0,null))}function S(R,D){R.getRGB(Hc,qv(s)),i.buffers.color.setClear(Hc.r,Hc.g,Hc.b,D,c)}function _(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return h},setClearColor:function(R,D=1){h.set(R),d=D,S(h,d)},getClearAlpha:function(){return d},setClearAlpha:function(R){d=R,S(h,d)},render:E,addToRenderList:A,dispose:_}}function T1(s,t){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},l=g(null);let c=l,h=!1;function d(G,Z,nt,ut,Q){let I=!1;const F=x(G,ut,nt,Z);c!==F&&(c=F,p(c.object)),I=y(G,ut,nt,Q),I&&E(G,ut,nt,Q),Q!==null&&t.update(Q,s.ELEMENT_ARRAY_BUFFER),(I||h)&&(h=!1,L(G,Z,nt,ut),Q!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function m(){return s.createVertexArray()}function p(G){return s.bindVertexArray(G)}function v(G){return s.deleteVertexArray(G)}function x(G,Z,nt,ut){const Q=ut.wireframe===!0;let I=r[Z.id];I===void 0&&(I={},r[Z.id]=I);const F=G.isInstancedMesh===!0?G.id:0;let rt=I[F];rt===void 0&&(rt={},I[F]=rt);let ot=rt[nt.id];ot===void 0&&(ot={},rt[nt.id]=ot);let vt=ot[Q];return vt===void 0&&(vt=g(m()),ot[Q]=vt),vt}function g(G){const Z=[],nt=[],ut=[];for(let Q=0;Q<i;Q++)Z[Q]=0,nt[Q]=0,ut[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Z,enabledAttributes:nt,attributeDivisors:ut,object:G,attributes:{},index:null}}function y(G,Z,nt,ut){const Q=c.attributes,I=Z.attributes;let F=0;const rt=nt.getAttributes();for(const ot in rt)if(rt[ot].location>=0){const P=Q[ot];let k=I[ot];if(k===void 0&&(ot==="instanceMatrix"&&G.instanceMatrix&&(k=G.instanceMatrix),ot==="instanceColor"&&G.instanceColor&&(k=G.instanceColor)),P===void 0||P.attribute!==k||k&&P.data!==k.data)return!0;F++}return c.attributesNum!==F||c.index!==ut}function E(G,Z,nt,ut){const Q={},I=Z.attributes;let F=0;const rt=nt.getAttributes();for(const ot in rt)if(rt[ot].location>=0){let P=I[ot];P===void 0&&(ot==="instanceMatrix"&&G.instanceMatrix&&(P=G.instanceMatrix),ot==="instanceColor"&&G.instanceColor&&(P=G.instanceColor));const k={};k.attribute=P,P&&P.data&&(k.data=P.data),Q[ot]=k,F++}c.attributes=Q,c.attributesNum=F,c.index=ut}function A(){const G=c.newAttributes;for(let Z=0,nt=G.length;Z<nt;Z++)G[Z]=0}function S(G){_(G,0)}function _(G,Z){const nt=c.newAttributes,ut=c.enabledAttributes,Q=c.attributeDivisors;nt[G]=1,ut[G]===0&&(s.enableVertexAttribArray(G),ut[G]=1),Q[G]!==Z&&(s.vertexAttribDivisor(G,Z),Q[G]=Z)}function R(){const G=c.newAttributes,Z=c.enabledAttributes;for(let nt=0,ut=Z.length;nt<ut;nt++)Z[nt]!==G[nt]&&(s.disableVertexAttribArray(nt),Z[nt]=0)}function D(G,Z,nt,ut,Q,I,F){F===!0?s.vertexAttribIPointer(G,Z,nt,Q,I):s.vertexAttribPointer(G,Z,nt,ut,Q,I)}function L(G,Z,nt,ut){A();const Q=ut.attributes,I=nt.getAttributes(),F=Z.defaultAttributeValues;for(const rt in I){const ot=I[rt];if(ot.location>=0){let vt=Q[rt];if(vt===void 0&&(rt==="instanceMatrix"&&G.instanceMatrix&&(vt=G.instanceMatrix),rt==="instanceColor"&&G.instanceColor&&(vt=G.instanceColor)),vt!==void 0){const P=vt.normalized,k=vt.itemSize,ct=t.get(vt);if(ct===void 0)continue;const yt=ct.buffer,Rt=ct.type,K=ct.bytesPerElement,pt=Rt===s.INT||Rt===s.UNSIGNED_INT||vt.gpuType===ap;if(vt.isInterleavedBufferAttribute){const St=vt.data,Ut=St.stride,Bt=vt.offset;if(St.isInstancedInterleavedBuffer){for(let Kt=0;Kt<ot.locationSize;Kt++)_(ot.location+Kt,St.meshPerAttribute);G.isInstancedMesh!==!0&&ut._maxInstanceCount===void 0&&(ut._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let Kt=0;Kt<ot.locationSize;Kt++)S(ot.location+Kt);s.bindBuffer(s.ARRAY_BUFFER,yt);for(let Kt=0;Kt<ot.locationSize;Kt++)D(ot.location+Kt,k/ot.locationSize,Rt,P,Ut*K,(Bt+k/ot.locationSize*Kt)*K,pt)}else{if(vt.isInstancedBufferAttribute){for(let St=0;St<ot.locationSize;St++)_(ot.location+St,vt.meshPerAttribute);G.isInstancedMesh!==!0&&ut._maxInstanceCount===void 0&&(ut._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let St=0;St<ot.locationSize;St++)S(ot.location+St);s.bindBuffer(s.ARRAY_BUFFER,yt);for(let St=0;St<ot.locationSize;St++)D(ot.location+St,k/ot.locationSize,Rt,P,k*K,k/ot.locationSize*St*K,pt)}}else if(F!==void 0){const P=F[rt];if(P!==void 0)switch(P.length){case 2:s.vertexAttrib2fv(ot.location,P);break;case 3:s.vertexAttrib3fv(ot.location,P);break;case 4:s.vertexAttrib4fv(ot.location,P);break;default:s.vertexAttrib1fv(ot.location,P)}}}}R()}function B(){O();for(const G in r){const Z=r[G];for(const nt in Z){const ut=Z[nt];for(const Q in ut){const I=ut[Q];for(const F in I)v(I[F].object),delete I[F];delete ut[Q]}}delete r[G]}}function U(G){if(r[G.id]===void 0)return;const Z=r[G.id];for(const nt in Z){const ut=Z[nt];for(const Q in ut){const I=ut[Q];for(const F in I)v(I[F].object),delete I[F];delete ut[Q]}}delete r[G.id]}function N(G){for(const Z in r){const nt=r[Z];for(const ut in nt){const Q=nt[ut];if(Q[G.id]===void 0)continue;const I=Q[G.id];for(const F in I)v(I[F].object),delete I[F];delete Q[G.id]}}}function T(G){for(const Z in r){const nt=r[Z],ut=G.isInstancedMesh===!0?G.id:0,Q=nt[ut];if(Q!==void 0){for(const I in Q){const F=Q[I];for(const rt in F)v(F[rt].object),delete F[rt];delete Q[I]}delete nt[ut],Object.keys(nt).length===0&&delete r[Z]}}}function O(){ft(),h=!0,c!==l&&(c=l,p(c.object))}function ft(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:O,resetDefaultState:ft,dispose:B,releaseStatesOfGeometry:U,releaseStatesOfObject:T,releaseStatesOfProgram:N,initAttributes:A,enableAttribute:S,disableUnusedAttributes:R}}function A1(s,t,i){let r;function l(p){r=p}function c(p,v){s.drawArrays(r,p,v),i.update(v,r,1)}function h(p,v,x){x!==0&&(s.drawArraysInstanced(r,p,v,x),i.update(v,r,x))}function d(p,v,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,v,0,x);let y=0;for(let E=0;E<x;E++)y+=v[E];i.update(y,r,1)}function m(p,v,x,g){if(x===0)return;const y=t.get("WEBGL_multi_draw");if(y===null)for(let E=0;E<p.length;E++)h(p[E],v[E],g[E]);else{y.multiDrawArraysInstancedWEBGL(r,p,0,v,0,g,0,x);let E=0;for(let A=0;A<x;A++)E+=v[A]*g[A];i.update(E,r,1)}}this.setMode=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function R1(s,t,i,r){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const N=t.get("EXT_texture_filter_anisotropic");l=s.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(N){return!(N!==Li&&r.convert(N)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(N){const T=N===ya&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(N!==ci&&r.convert(N)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==Xi&&!T)}function m(N){if(N==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const v=m(p);v!==p&&(re("WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const x=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),y=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=s.getParameter(s.MAX_TEXTURE_SIZE),S=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),R=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),D=s.getParameter(s.MAX_VARYING_VECTORS),L=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),B=s.getParameter(s.MAX_SAMPLES),U=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:x,reversedDepthBuffer:g,maxTextures:y,maxVertexTextures:E,maxTextureSize:A,maxCubemapSize:S,maxAttributes:_,maxVertexUniforms:R,maxVaryings:D,maxFragmentUniforms:L,maxSamples:B,samples:U}}function C1(s){const t=this;let i=null,r=0,l=!1,c=!1;const h=new Dr,d=new pe,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,g){const y=x.length!==0||g||r!==0||l;return l=g,r=x.length,y},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(x,g){i=v(x,g,0)},this.setState=function(x,g,y){const E=x.clippingPlanes,A=x.clipIntersection,S=x.clipShadows,_=s.get(x);if(!l||E===null||E.length===0||c&&!S)c?v(null):p();else{const R=c?0:r,D=R*4;let L=_.clippingState||null;m.value=L,L=v(E,g,D,y);for(let B=0;B!==D;++B)L[B]=i[B];_.clippingState=L,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=R}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function v(x,g,y,E){const A=x!==null?x.length:0;let S=null;if(A!==0){if(S=m.value,E!==!0||S===null){const _=y+A*4,R=g.matrixWorldInverse;d.getNormalMatrix(R),(S===null||S.length<_)&&(S=new Float32Array(_));for(let D=0,L=y;D!==A;++D,L+=4)h.copy(x[D]).applyMatrix4(R,d),h.normal.toArray(S,L),S[L+3]=h.constant}m.value=S,m.needsUpdate=!0}return t.numPlanes=A,t.numIntersection=0,S}}const ar=4,F_=[.125,.215,.35,.446,.526,.582],Lr=20,w1=256,Xo=new Zv,B_=new Ft;let Kh=null,Qh=0,Jh=0,$h=!1;const D1=new $;class G_{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,i=0,r=.1,l=100,c={}){const{size:h=256,position:d=D1}=c;Kh=this._renderer.getRenderTarget(),Qh=this._renderer.getActiveCubeFace(),Jh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(t,r,l,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(t,i=null){return this._fromTexture(t,i)}fromCubemap(t,i=null){return this._fromTexture(t,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=X_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=V_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Kh,Qh,Jh),this._renderer.xr.enabled=$h,t.scissorTest=!1,Os(t,0,0,t.width,t.height)}_fromTexture(t,i){t.mapping===Ir||t.mapping===Fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Kh=this._renderer.getRenderTarget(),Qh=this._renderer.getActiveCubeFace(),Jh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=i||this._allocateTargets();return this._textureToCubeUV(t,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,r={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:ya,format:Li,colorSpace:Gs,depthBuffer:!1},l=H_(t,i,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=H_(t,i,r);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=U1(c)),this._blurMaterial=N1(c,t,i),this._ggxMaterial=L1(c,t,i)}return l}_compileMaterial(t){const i=new Hn(new Cn,t);this._renderer.compile(i,Xo)}_sceneToCubeUV(t,i,r,l,c){const m=new li(90,1,i,r),p=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],x=this._renderer,g=x.autoClear,y=x.toneMapping;x.getClearColor(B_),x.toneMapping=Wi,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(l),x.clearDepth(),x.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Hn(new nl,new su({name:"PMREM.Background",side:Kn,depthWrite:!1,depthTest:!1})));const A=this._backgroundBox,S=A.material;let _=!1;const R=t.background;R?R.isColor&&(S.color.copy(R),t.background=null,_=!0):(S.color.copy(B_),_=!0);for(let D=0;D<6;D++){const L=D%3;L===0?(m.up.set(0,p[D],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[D],c.y,c.z)):L===1?(m.up.set(0,0,p[D]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[D],c.z)):(m.up.set(0,p[D],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[D]));const B=this._cubeSize;Os(l,L*B,D>2?B:0,B,B),x.setRenderTarget(l),_&&x.render(A,m),x.render(t,m)}x.toneMapping=y,x.autoClear=g,t.background=R}_textureToCubeUV(t,i){const r=this._renderer,l=t.mapping===Ir||t.mapping===Fs;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=X_()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=V_());const c=l?this._cubemapMaterial:this._equirectMaterial,h=this._lodMeshes[0];h.material=c;const d=c.uniforms;d.envMap.value=t;const m=this._cubeSize;Os(i,0,0,3*m,2*m),r.setRenderTarget(i),r.render(h,Xo)}_applyPMREM(t){const i=this._renderer,r=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(t,c-1,c);i.autoClear=r}_applyGGXFilter(t,i,r){const l=this._renderer,c=this._pingPongRenderTarget,h=this._ggxMaterial,d=this._lodMeshes[r];d.material=h;const m=h.uniforms,p=r/(this._lodMeshes.length-1),v=i/(this._lodMeshes.length-1),x=Math.sqrt(p*p-v*v),g=0+p*1.25,y=x*g,{_lodMax:E}=this,A=this._sizeLods[r],S=3*A*(r>E-ar?r-E+ar:0),_=4*(this._cubeSize-A);m.envMap.value=t.texture,m.roughness.value=y,m.mipInt.value=E-i,Os(c,S,_,3*A,2*A),l.setRenderTarget(c),l.render(d,Xo),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=E-r,Os(t,S,_,3*A,2*A),l.setRenderTarget(t),l.render(d,Xo)}_blur(t,i,r,l,c){const h=this._pingPongRenderTarget;this._halfBlur(t,h,i,r,l,"latitudinal",c),this._halfBlur(h,t,r,r,l,"longitudinal",c)}_halfBlur(t,i,r,l,c,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&Ue("blur direction must be either latitudinal or longitudinal!");const v=3,x=this._lodMeshes[l];x.material=p;const g=p.uniforms,y=this._sizeLods[r]-1,E=isFinite(c)?Math.PI/(2*y):2*Math.PI/(2*Lr-1),A=c/E,S=isFinite(c)?1+Math.floor(v*A):Lr;S>Lr&&re(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Lr}`);const _=[];let R=0;for(let N=0;N<Lr;++N){const T=N/A,O=Math.exp(-T*T/2);_.push(O),N===0?R+=O:N<S&&(R+=2*O)}for(let N=0;N<_.length;N++)_[N]=_[N]/R;g.envMap.value=t.texture,g.samples.value=S,g.weights.value=_,g.latitudinal.value=h==="latitudinal",d&&(g.poleAxis.value=d);const{_lodMax:D}=this;g.dTheta.value=E,g.mipInt.value=D-r;const L=this._sizeLods[l],B=3*L*(l>D-ar?l-D+ar:0),U=4*(this._cubeSize-L);Os(i,B,U,3*L,2*L),m.setRenderTarget(i),m.render(x,Xo)}}function U1(s){const t=[],i=[],r=[];let l=s;const c=s-ar+1+F_.length;for(let h=0;h<c;h++){const d=Math.pow(2,l);t.push(d);let m=1/d;h>s-ar?m=F_[h-s+ar-1]:h===0&&(m=0),i.push(m);const p=1/(d-2),v=-p,x=1+p,g=[v,v,x,v,x,x,v,v,x,x,v,x],y=6,E=6,A=3,S=2,_=1,R=new Float32Array(A*E*y),D=new Float32Array(S*E*y),L=new Float32Array(_*E*y);for(let U=0;U<y;U++){const N=U%3*2/3-1,T=U>2?0:-1,O=[N,T,0,N+2/3,T,0,N+2/3,T+1,0,N,T,0,N+2/3,T+1,0,N,T+1,0];R.set(O,A*E*U),D.set(g,S*E*U);const ft=[U,U,U,U,U,U];L.set(ft,_*E*U)}const B=new Cn;B.setAttribute("position",new Mn(R,A)),B.setAttribute("uv",new Mn(D,S)),B.setAttribute("faceIndex",new Mn(L,_)),r.push(new Hn(B,null)),l>ar&&l--}return{lodMeshes:r,sizeLods:t,sigmas:i}}function H_(s,t,i){const r=new qi(s,t,i);return r.texture.mapping=ru,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Os(s,t,i,r,l){s.viewport.set(t,i,r,l),s.scissor.set(t,i,r,l)}function L1(s,t,i){return new Vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:w1,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Sa,depthTest:!1,depthWrite:!1})}function N1(s,t,i){const r=new Float32Array(Lr),l=new $(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:Lr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sa,depthTest:!1,depthWrite:!1})}function V_(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Sa,depthTest:!1,depthWrite:!1})}function X_(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sa,depthTest:!1,depthWrite:!1})}function lu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Qv extends qi{constructor(t=1,i={}){super(t,t,i),this.isWebGLCubeRenderTarget=!0;const r={width:t,height:t,depth:1},l=[r,r,r,r,r,r];this.texture=new kv(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new nl(5,5,5),c=new Vn({name:"CubemapFromEquirect",uniforms:Hs(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Kn,blending:Sa});c.uniforms.tEquirect.value=i;const h=new Hn(l,c),d=i.minFilter;return i.minFilter===Nr&&(i.minFilter=Ln),new Gy(1,10,this).update(t,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(t,i=!0,r=!0,l=!0){const c=t.getRenderTarget();for(let h=0;h<6;h++)t.setRenderTarget(this,h),t.clear(i,r,l);t.setRenderTarget(c)}}function O1(s){let t=new WeakMap,i=new WeakMap,r=null;function l(g,y=!1){return g==null?null:y?h(g):c(g)}function c(g){if(g&&g.isTexture){const y=g.mapping;if(y===Mh||y===yh)if(t.has(g)){const E=t.get(g).texture;return d(E,g.mapping)}else{const E=g.image;if(E&&E.height>0){const A=new Qv(E.height);return A.fromEquirectangularTexture(s,g),t.set(g,A),g.addEventListener("dispose",p),d(A.texture,g.mapping)}else return null}}return g}function h(g){if(g&&g.isTexture){const y=g.mapping,E=y===Mh||y===yh,A=y===Ir||y===Fs;if(E||A){let S=i.get(g);const _=S!==void 0?S.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==_)return r===null&&(r=new G_(s)),S=E?r.fromEquirectangular(g,S):r.fromCubemap(g,S),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),S.texture;if(S!==void 0)return S.texture;{const R=g.image;return E&&R&&R.height>0||A&&R&&m(R)?(r===null&&(r=new G_(s)),S=E?r.fromEquirectangular(g):r.fromCubemap(g),S.texture.pmremVersion=g.pmremVersion,i.set(g,S),g.addEventListener("dispose",v),S.texture):null}}}return g}function d(g,y){return y===Mh?g.mapping=Ir:y===yh&&(g.mapping=Fs),g}function m(g){let y=0;const E=6;for(let A=0;A<E;A++)g[A]!==void 0&&y++;return y===E}function p(g){const y=g.target;y.removeEventListener("dispose",p);const E=t.get(y);E!==void 0&&(t.delete(y),E.dispose())}function v(g){const y=g.target;y.removeEventListener("dispose",v);const E=i.get(y);E!==void 0&&(i.delete(y),E.dispose())}function x(){t=new WeakMap,i=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:l,dispose:x}}function P1(s){const t={};function i(r){if(t[r]!==void 0)return t[r];const l=s.getExtension(r);return t[r]=l,l}return{has:function(r){return i(r)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(r){const l=i(r);return l===null&&tu("WebGLRenderer: "+r+" extension not supported."),l}}}function I1(s,t,i,r){const l={},c=new WeakMap;function h(x){const g=x.target;g.index!==null&&t.remove(g.index);for(const E in g.attributes)t.remove(g.attributes[E]);g.removeEventListener("dispose",h),delete l[g.id];const y=c.get(g);y&&(t.remove(y),c.delete(g)),r.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function d(x,g){return l[g.id]===!0||(g.addEventListener("dispose",h),l[g.id]=!0,i.memory.geometries++),g}function m(x){const g=x.attributes;for(const y in g)t.update(g[y],s.ARRAY_BUFFER)}function p(x){const g=[],y=x.index,E=x.attributes.position;let A=0;if(E===void 0)return;if(y!==null){const R=y.array;A=y.version;for(let D=0,L=R.length;D<L;D+=3){const B=R[D+0],U=R[D+1],N=R[D+2];g.push(B,U,U,N,N,B)}}else{const R=E.array;A=E.version;for(let D=0,L=R.length/3-1;D<L;D+=3){const B=D+0,U=D+1,N=D+2;g.push(B,U,U,N,N,B)}}const S=new(E.count>=65535?Hv:Gv)(g,1);S.version=A;const _=c.get(x);_&&t.remove(_),c.set(x,S)}function v(x){const g=c.get(x);if(g){const y=x.index;y!==null&&g.version<y.version&&p(x)}else p(x);return c.get(x)}return{get:d,update:m,getWireframeAttribute:v}}function z1(s,t,i){let r;function l(g){r=g}let c,h;function d(g){c=g.type,h=g.bytesPerElement}function m(g,y){s.drawElements(r,y,c,g*h),i.update(y,r,1)}function p(g,y,E){E!==0&&(s.drawElementsInstanced(r,y,c,g*h,E),i.update(y,r,E))}function v(g,y,E){if(E===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,y,0,c,g,0,E);let S=0;for(let _=0;_<E;_++)S+=y[_];i.update(S,r,1)}function x(g,y,E,A){if(E===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let _=0;_<g.length;_++)p(g[_]/h,y[_],A[_]);else{S.multiDrawElementsInstancedWEBGL(r,y,0,c,g,0,A,0,E);let _=0;for(let R=0;R<E;R++)_+=y[R]*A[R];i.update(_,r,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=v,this.renderMultiDrawInstances=x}function F1(s){const t={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,h,d){switch(i.calls++,h){case s.TRIANGLES:i.triangles+=d*(c/3);break;case s.LINES:i.lines+=d*(c/2);break;case s.LINE_STRIP:i.lines+=d*(c-1);break;case s.LINE_LOOP:i.lines+=d*c;break;case s.POINTS:i.points+=d*c;break;default:Ue("WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:t,render:i,programs:null,autoReset:!0,reset:l,update:r}}function B1(s,t,i){const r=new WeakMap,l=new nn;function c(h,d,m){const p=h.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,x=v!==void 0?v.length:0;let g=r.get(d);if(g===void 0||g.count!==x){let ft=function(){T.dispose(),r.delete(d),d.removeEventListener("dispose",ft)};var y=ft;g!==void 0&&g.texture.dispose();const E=d.morphAttributes.position!==void 0,A=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],R=d.morphAttributes.normal||[],D=d.morphAttributes.color||[];let L=0;E===!0&&(L=1),A===!0&&(L=2),S===!0&&(L=3);let B=d.attributes.position.count*L,U=1;B>t.maxTextureSize&&(U=Math.ceil(B/t.maxTextureSize),B=t.maxTextureSize);const N=new Float32Array(B*U*4*x),T=new zv(N,B,U,x);T.type=Xi,T.needsUpdate=!0;const O=L*4;for(let G=0;G<x;G++){const Z=_[G],nt=R[G],ut=D[G],Q=B*U*4*G;for(let I=0;I<Z.count;I++){const F=I*O;E===!0&&(l.fromBufferAttribute(Z,I),N[Q+F+0]=l.x,N[Q+F+1]=l.y,N[Q+F+2]=l.z,N[Q+F+3]=0),A===!0&&(l.fromBufferAttribute(nt,I),N[Q+F+4]=l.x,N[Q+F+5]=l.y,N[Q+F+6]=l.z,N[Q+F+7]=0),S===!0&&(l.fromBufferAttribute(ut,I),N[Q+F+8]=l.x,N[Q+F+9]=l.y,N[Q+F+10]=l.z,N[Q+F+11]=ut.itemSize===4?l.w:1)}}g={count:x,texture:T,size:new Le(B,U)},r.set(d,g),d.addEventListener("dispose",ft)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(s,"morphTexture",h.morphTexture,i);else{let E=0;for(let S=0;S<p.length;S++)E+=p[S];const A=d.morphTargetsRelative?1:1-E;m.getUniforms().setValue(s,"morphTargetBaseInfluence",A),m.getUniforms().setValue(s,"morphTargetInfluences",p)}m.getUniforms().setValue(s,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:c}}function G1(s,t,i,r,l){let c=new WeakMap;function h(p){const v=l.render.frame,x=p.geometry,g=t.get(p,x);if(c.get(g)!==v&&(t.update(g),c.set(g,v)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==v&&(i.update(p.instanceMatrix,s.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,s.ARRAY_BUFFER),c.set(p,v))),p.isSkinnedMesh){const y=p.skeleton;c.get(y)!==v&&(y.update(),c.set(y,v))}return g}function d(){c=new WeakMap}function m(p){const v=p.target;v.removeEventListener("dispose",m),r.releaseStatesOfObject(v),i.remove(v.instanceMatrix),v.instanceColor!==null&&i.remove(v.instanceColor)}return{update:h,dispose:d}}const H1={[Sv]:"LINEAR_TONE_MAPPING",[Mv]:"REINHARD_TONE_MAPPING",[yv]:"CINEON_TONE_MAPPING",[Ev]:"ACES_FILMIC_TONE_MAPPING",[Tv]:"AGX_TONE_MAPPING",[Av]:"NEUTRAL_TONE_MAPPING",[bv]:"CUSTOM_TONE_MAPPING"};function V1(s,t,i,r,l){const c=new qi(t,i,{type:s,depthBuffer:r,stencilBuffer:l}),h=new qi(t,i,{type:ya,depthBuffer:!1,stencilBuffer:!1}),d=new Cn;d.setAttribute("position",new yn([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new yn([0,2,0,0,2,0],2));const m=new Ly({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Hn(d,m),v=new Zv(-1,1,1,-1,0,1);let x=null,g=null,y=!1,E,A=null,S=[],_=!1;this.setSize=function(R,D){c.setSize(R,D),h.setSize(R,D);for(let L=0;L<S.length;L++){const B=S[L];B.setSize&&B.setSize(R,D)}},this.setEffects=function(R){S=R,_=S.length>0&&S[0].isRenderPass===!0;const D=c.width,L=c.height;for(let B=0;B<S.length;B++){const U=S[B];U.setSize&&U.setSize(D,L)}},this.begin=function(R,D){if(y||R.toneMapping===Wi&&S.length===0)return!1;if(A=D,D!==null){const L=D.width,B=D.height;(c.width!==L||c.height!==B)&&this.setSize(L,B)}return _===!1&&R.setRenderTarget(c),E=R.toneMapping,R.toneMapping=Wi,!0},this.hasRenderPass=function(){return _},this.end=function(R,D){R.toneMapping=E,y=!0;let L=c,B=h;for(let U=0;U<S.length;U++){const N=S[U];if(N.enabled!==!1&&(N.render(R,B,L,D),N.needsSwap!==!1)){const T=L;L=B,B=T}}if(x!==R.outputColorSpace||g!==R.toneMapping){x=R.outputColorSpace,g=R.toneMapping,m.defines={},Re.getTransfer(x)===Ge&&(m.defines.SRGB_TRANSFER="");const U=H1[g];U&&(m.defines[U]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=L.texture,R.setRenderTarget(A),R.render(p,v),A=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){c.dispose(),h.dispose(),d.dispose(),m.dispose()}}const Jv=new Gn,Qd=new Jo(1,1),$v=new zv,tx=new oy,ex=new kv,k_=[],W_=[],q_=new Float32Array(16),Y_=new Float32Array(9),j_=new Float32Array(4);function ks(s,t,i){const r=s[0];if(r<=0||r>0)return s;const l=t*i;let c=k_[l];if(c===void 0&&(c=new Float32Array(l),k_[l]=c),t!==0){r.toArray(c,0);for(let h=1,d=0;h!==t;++h)d+=i,s[h].toArray(c,d)}return c}function _n(s,t){if(s.length!==t.length)return!1;for(let i=0,r=s.length;i<r;i++)if(s[i]!==t[i])return!1;return!0}function vn(s,t){for(let i=0,r=t.length;i<r;i++)s[i]=t[i]}function cu(s,t){let i=W_[t];i===void 0&&(i=new Int32Array(t),W_[t]=i);for(let r=0;r!==t;++r)i[r]=s.allocateTextureUnit();return i}function X1(s,t){const i=this.cache;i[0]!==t&&(s.uniform1f(this.addr,t),i[0]=t)}function k1(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(_n(i,t))return;s.uniform2fv(this.addr,t),vn(i,t)}}function W1(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else if(t.r!==void 0)(i[0]!==t.r||i[1]!==t.g||i[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),i[0]=t.r,i[1]=t.g,i[2]=t.b);else{if(_n(i,t))return;s.uniform3fv(this.addr,t),vn(i,t)}}function q1(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(_n(i,t))return;s.uniform4fv(this.addr,t),vn(i,t)}}function Y1(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(_n(i,t))return;s.uniformMatrix2fv(this.addr,!1,t),vn(i,t)}else{if(_n(i,r))return;j_.set(r),s.uniformMatrix2fv(this.addr,!1,j_),vn(i,r)}}function j1(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(_n(i,t))return;s.uniformMatrix3fv(this.addr,!1,t),vn(i,t)}else{if(_n(i,r))return;Y_.set(r),s.uniformMatrix3fv(this.addr,!1,Y_),vn(i,r)}}function Z1(s,t){const i=this.cache,r=t.elements;if(r===void 0){if(_n(i,t))return;s.uniformMatrix4fv(this.addr,!1,t),vn(i,t)}else{if(_n(i,r))return;q_.set(r),s.uniformMatrix4fv(this.addr,!1,q_),vn(i,r)}}function K1(s,t){const i=this.cache;i[0]!==t&&(s.uniform1i(this.addr,t),i[0]=t)}function Q1(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(_n(i,t))return;s.uniform2iv(this.addr,t),vn(i,t)}}function J1(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(_n(i,t))return;s.uniform3iv(this.addr,t),vn(i,t)}}function $1(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(_n(i,t))return;s.uniform4iv(this.addr,t),vn(i,t)}}function tT(s,t){const i=this.cache;i[0]!==t&&(s.uniform1ui(this.addr,t),i[0]=t)}function eT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),i[0]=t.x,i[1]=t.y);else{if(_n(i,t))return;s.uniform2uiv(this.addr,t),vn(i,t)}}function nT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),i[0]=t.x,i[1]=t.y,i[2]=t.z);else{if(_n(i,t))return;s.uniform3uiv(this.addr,t),vn(i,t)}}function iT(s,t){const i=this.cache;if(t.x!==void 0)(i[0]!==t.x||i[1]!==t.y||i[2]!==t.z||i[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=t.w);else{if(_n(i,t))return;s.uniform4uiv(this.addr,t),vn(i,t)}}function aT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l);let c;this.type===s.SAMPLER_2D_SHADOW?(Qd.compareFunction=i.isReversedDepthBuffer()?fp:up,c=Qd):c=Jv,i.setTexture2D(t||c,l)}function rT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture3D(t||tx,l)}function sT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTextureCube(t||ex,l)}function oT(s,t,i){const r=this.cache,l=i.allocateTextureUnit();r[0]!==l&&(s.uniform1i(this.addr,l),r[0]=l),i.setTexture2DArray(t||$v,l)}function lT(s){switch(s){case 5126:return X1;case 35664:return k1;case 35665:return W1;case 35666:return q1;case 35674:return Y1;case 35675:return j1;case 35676:return Z1;case 5124:case 35670:return K1;case 35667:case 35671:return Q1;case 35668:case 35672:return J1;case 35669:case 35673:return $1;case 5125:return tT;case 36294:return eT;case 36295:return nT;case 36296:return iT;case 35678:case 36198:case 36298:case 36306:case 35682:return aT;case 35679:case 36299:case 36307:return rT;case 35680:case 36300:case 36308:case 36293:return sT;case 36289:case 36303:case 36311:case 36292:return oT}}function cT(s,t){s.uniform1fv(this.addr,t)}function uT(s,t){const i=ks(t,this.size,2);s.uniform2fv(this.addr,i)}function fT(s,t){const i=ks(t,this.size,3);s.uniform3fv(this.addr,i)}function hT(s,t){const i=ks(t,this.size,4);s.uniform4fv(this.addr,i)}function dT(s,t){const i=ks(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,i)}function pT(s,t){const i=ks(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,i)}function mT(s,t){const i=ks(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,i)}function gT(s,t){s.uniform1iv(this.addr,t)}function _T(s,t){s.uniform2iv(this.addr,t)}function vT(s,t){s.uniform3iv(this.addr,t)}function xT(s,t){s.uniform4iv(this.addr,t)}function ST(s,t){s.uniform1uiv(this.addr,t)}function MT(s,t){s.uniform2uiv(this.addr,t)}function yT(s,t){s.uniform3uiv(this.addr,t)}function ET(s,t){s.uniform4uiv(this.addr,t)}function bT(s,t,i){const r=this.cache,l=t.length,c=cu(i,l);_n(r,c)||(s.uniform1iv(this.addr,c),vn(r,c));let h;this.type===s.SAMPLER_2D_SHADOW?h=Qd:h=Jv;for(let d=0;d!==l;++d)i.setTexture2D(t[d]||h,c[d])}function TT(s,t,i){const r=this.cache,l=t.length,c=cu(i,l);_n(r,c)||(s.uniform1iv(this.addr,c),vn(r,c));for(let h=0;h!==l;++h)i.setTexture3D(t[h]||tx,c[h])}function AT(s,t,i){const r=this.cache,l=t.length,c=cu(i,l);_n(r,c)||(s.uniform1iv(this.addr,c),vn(r,c));for(let h=0;h!==l;++h)i.setTextureCube(t[h]||ex,c[h])}function RT(s,t,i){const r=this.cache,l=t.length,c=cu(i,l);_n(r,c)||(s.uniform1iv(this.addr,c),vn(r,c));for(let h=0;h!==l;++h)i.setTexture2DArray(t[h]||$v,c[h])}function CT(s){switch(s){case 5126:return cT;case 35664:return uT;case 35665:return fT;case 35666:return hT;case 35674:return dT;case 35675:return pT;case 35676:return mT;case 5124:case 35670:return gT;case 35667:case 35671:return _T;case 35668:case 35672:return vT;case 35669:case 35673:return xT;case 5125:return ST;case 36294:return MT;case 36295:return yT;case 36296:return ET;case 35678:case 36198:case 36298:case 36306:case 35682:return bT;case 35679:case 36299:case 36307:return TT;case 35680:case 36300:case 36308:case 36293:return AT;case 36289:case 36303:case 36311:case 36292:return RT}}class wT{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.setValue=lT(i.type)}}class DT{constructor(t,i,r){this.id=t,this.addr=r,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=CT(i.type)}}class UT{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,i,r){const l=this.seq;for(let c=0,h=l.length;c!==h;++c){const d=l[c];d.setValue(t,i[d.id],r)}}}const td=/(\w+)(\])?(\[|\.)?/g;function Z_(s,t){s.seq.push(t),s.map[t.id]=t}function LT(s,t,i){const r=s.name,l=r.length;for(td.lastIndex=0;;){const c=td.exec(r),h=td.lastIndex;let d=c[1];const m=c[2]==="]",p=c[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){Z_(i,p===void 0?new wT(d,s,t):new DT(d,s,t));break}else{let x=i.map[d];x===void 0&&(x=new UT(d),Z_(i,x)),i=x}}}class Qc{constructor(t,i){this.seq=[],this.map={};const r=t.getProgramParameter(i,t.ACTIVE_UNIFORMS);for(let h=0;h<r;++h){const d=t.getActiveUniform(i,h),m=t.getUniformLocation(i,d.name);LT(d,m,this)}const l=[],c=[];for(const h of this.seq)h.type===t.SAMPLER_2D_SHADOW||h.type===t.SAMPLER_CUBE_SHADOW||h.type===t.SAMPLER_2D_ARRAY_SHADOW?l.push(h):c.push(h);l.length>0&&(this.seq=l.concat(c))}setValue(t,i,r,l){const c=this.map[i];c!==void 0&&c.setValue(t,r,l)}setOptional(t,i,r){const l=i[r];l!==void 0&&this.setValue(t,r,l)}static upload(t,i,r,l){for(let c=0,h=i.length;c!==h;++c){const d=i[c],m=r[d.id];m.needsUpdate!==!1&&d.setValue(t,m.value,l)}}static seqWithValue(t,i){const r=[];for(let l=0,c=t.length;l!==c;++l){const h=t[l];h.id in i&&r.push(h)}return r}}function K_(s,t,i){const r=s.createShader(t);return s.shaderSource(r,i),s.compileShader(r),r}const NT=37297;let OT=0;function PT(s,t){const i=s.split(`
`),r=[],l=Math.max(t-6,0),c=Math.min(t+6,i.length);for(let h=l;h<c;h++){const d=h+1;r.push(`${d===t?">":" "} ${d}: ${i[h]}`)}return r.join(`
`)}const Q_=new pe;function IT(s){Re._getMatrix(Q_,Re.workingColorSpace,s);const t=`mat3( ${Q_.elements.map(i=>i.toFixed(4))} )`;switch(Re.getTransfer(s)){case Jc:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return re("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function J_(s,t,i){const r=s.getShaderParameter(t,s.COMPILE_STATUS),c=(s.getShaderInfoLog(t)||"").trim();if(r&&c==="")return"";const h=/ERROR: 0:(\d+)/.exec(c);if(h){const d=parseInt(h[1]);return i.toUpperCase()+`

`+c+`

`+PT(s.getShaderSource(t),d)}else return c}function zT(s,t){const i=IT(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const FT={[Sv]:"Linear",[Mv]:"Reinhard",[yv]:"Cineon",[Ev]:"ACESFilmic",[Tv]:"AgX",[Av]:"Neutral",[bv]:"Custom"};function BT(s,t){const i=FT[t];return i===void 0?(re("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Vc=new $;function GT(){Re.getLuminanceCoefficients(Vc);const s=Vc.x.toFixed(4),t=Vc.y.toFixed(4),i=Vc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function HT(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qo).join(`
`)}function VT(s){const t=[];for(const i in s){const r=s[i];r!==!1&&t.push("#define "+i+" "+r)}return t.join(`
`)}function XT(s,t){const i={},r=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let l=0;l<r;l++){const c=s.getActiveAttrib(t,l),h=c.name;let d=1;c.type===s.FLOAT_MAT2&&(d=2),c.type===s.FLOAT_MAT3&&(d=3),c.type===s.FLOAT_MAT4&&(d=4),i[h]={type:c.type,location:s.getAttribLocation(t,h),locationSize:d}}return i}function qo(s){return s!==""}function $_(s,t){const i=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function tv(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const kT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jd(s){return s.replace(kT,qT)}const WT=new Map;function qT(s,t){let i=me[t];if(i===void 0){const r=WT.get(t);if(r!==void 0)i=me[r],re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,r);else throw new Error("Can not resolve #include <"+t+">")}return Jd(i)}const YT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ev(s){return s.replace(YT,jT)}function jT(s,t,i,r){let l="";for(let c=parseInt(t);c<parseInt(i);c++)l+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function nv(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const ZT={[qc]:"SHADOWMAP_TYPE_PCF",[Wo]:"SHADOWMAP_TYPE_VSM"};function KT(s){return ZT[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const QT={[Ir]:"ENVMAP_TYPE_CUBE",[Fs]:"ENVMAP_TYPE_CUBE",[ru]:"ENVMAP_TYPE_CUBE_UV"};function JT(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":QT[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const $T={[Fs]:"ENVMAP_MODE_REFRACTION"};function tA(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":$T[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const eA={[xv]:"ENVMAP_BLENDING_MULTIPLY",[GM]:"ENVMAP_BLENDING_MIX",[HM]:"ENVMAP_BLENDING_ADD"};function nA(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":eA[s.combine]||"ENVMAP_BLENDING_NONE"}function iA(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const i=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:r,maxMip:i}}function aA(s,t,i,r){const l=s.getContext(),c=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=KT(i),p=JT(i),v=tA(i),x=nA(i),g=iA(i),y=HT(i),E=VT(c),A=l.createProgram();let S,_,R=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(qo).join(`
`),S.length>0&&(S+=`
`),_=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(qo).join(`
`),_.length>0&&(_+=`
`)):(S=[nv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qo).join(`
`),_=[nv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+v:"",i.envMap?"#define "+x:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Wi?"#define TONE_MAPPING":"",i.toneMapping!==Wi?me.tonemapping_pars_fragment:"",i.toneMapping!==Wi?BT("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",me.colorspace_pars_fragment,zT("linearToOutputTexel",i.outputColorSpace),GT(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(qo).join(`
`)),h=Jd(h),h=$_(h,i),h=tv(h,i),d=Jd(d),d=$_(d,i),d=tv(d,i),h=ev(h),d=ev(d),i.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,S=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,_=["#define varying in",i.glslVersion===u_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===u_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const D=R+S+h,L=R+_+d,B=K_(l,l.VERTEX_SHADER,D),U=K_(l,l.FRAGMENT_SHADER,L);l.attachShader(A,B),l.attachShader(A,U),i.index0AttributeName!==void 0?l.bindAttribLocation(A,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function N(G){if(s.debug.checkShaderErrors){const Z=l.getProgramInfoLog(A)||"",nt=l.getShaderInfoLog(B)||"",ut=l.getShaderInfoLog(U)||"",Q=Z.trim(),I=nt.trim(),F=ut.trim();let rt=!0,ot=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(rt=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(l,A,B,U);else{const vt=J_(l,B,"vertex"),P=J_(l,U,"fragment");Ue("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+Q+`
`+vt+`
`+P)}else Q!==""?re("WebGLProgram: Program Info Log:",Q):(I===""||F==="")&&(ot=!1);ot&&(G.diagnostics={runnable:rt,programLog:Q,vertexShader:{log:I,prefix:S},fragmentShader:{log:F,prefix:_}})}l.deleteShader(B),l.deleteShader(U),T=new Qc(l,A),O=XT(l,A)}let T;this.getUniforms=function(){return T===void 0&&N(this),T};let O;this.getAttributes=function(){return O===void 0&&N(this),O};let ft=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return ft===!1&&(ft=l.getProgramParameter(A,NT)),ft},this.destroy=function(){r.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=OT++,this.cacheKey=t,this.usedTimes=1,this.program=A,this.vertexShader=B,this.fragmentShader=U,this}let rA=0;class sA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const i=t.vertexShader,r=t.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(r),h=this._getShaderCacheForMaterial(t);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(c)===!1&&(h.add(c),c.usedTimes++),this}remove(t){const i=this.materialCache.get(t);for(const r of i)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const i=this.materialCache;let r=i.get(t);return r===void 0&&(r=new Set,i.set(t,r)),r}_getShaderStage(t){const i=this.shaderCache;let r=i.get(t);return r===void 0&&(r=new oA(t),i.set(t,r)),r}}class oA{constructor(t){this.id=rA++,this.code=t,this.usedTimes=0}}function lA(s,t,i,r,l,c){const h=new Fv,d=new sA,m=new Set,p=[],v=new Map,x=r.logarithmicDepthBuffer;let g=r.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return m.add(T),T===0?"uv":`uv${T}`}function A(T,O,ft,G,Z){const nt=G.fog,ut=Z.geometry,Q=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,I=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,F=t.get(T.envMap||Q,I),rt=F&&F.mapping===ru?F.image.height:null,ot=y[T.type];T.precision!==null&&(g=r.getMaxPrecision(T.precision),g!==T.precision&&re("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const vt=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,P=vt!==void 0?vt.length:0;let k=0;ut.morphAttributes.position!==void 0&&(k=1),ut.morphAttributes.normal!==void 0&&(k=2),ut.morphAttributes.color!==void 0&&(k=3);let ct,yt,Rt,K;if(ot){const Te=Hi[ot];ct=Te.vertexShader,yt=Te.fragmentShader}else ct=T.vertexShader,yt=T.fragmentShader,d.update(T),Rt=d.getVertexShaderID(T),K=d.getFragmentShaderID(T);const pt=s.getRenderTarget(),St=s.state.buffers.depth.getReversed(),Ut=Z.isInstancedMesh===!0,Bt=Z.isBatchedMesh===!0,Kt=!!T.map,He=!!T.matcap,ge=!!F,_e=!!T.aoMap,Ne=!!T.lightMap,ce=!!T.bumpMap,$e=!!T.normalMap,V=!!T.displacementMap,je=!!T.emissiveMap,be=!!T.metalnessMap,Pe=!!T.roughnessMap,jt=T.anisotropy>0,z=T.clearcoat>0,b=T.dispersion>0,Y=T.iridescence>0,gt=T.sheen>0,Mt=T.transmission>0,dt=jt&&!!T.anisotropyMap,qt=z&&!!T.clearcoatMap,wt=z&&!!T.clearcoatNormalMap,Jt=z&&!!T.clearcoatRoughnessMap,ne=Y&&!!T.iridescenceMap,Tt=Y&&!!T.iridescenceThicknessMap,Et=gt&&!!T.sheenColorMap,Pt=gt&&!!T.sheenRoughnessMap,Ot=!!T.specularMap,It=!!T.specularColorMap,fe=!!T.specularIntensityMap,q=Mt&&!!T.transmissionMap,Ct=Mt&&!!T.thicknessMap,At=!!T.gradientMap,zt=!!T.alphaMap,bt=T.alphaTest>0,ht=!!T.alphaHash,Vt=!!T.extensions;let ae=Wi;T.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(ae=s.toneMapping);const ze={shaderID:ot,shaderType:T.type,shaderName:T.name,vertexShader:ct,fragmentShader:yt,defines:T.defines,customVertexShaderID:Rt,customFragmentShaderID:K,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Bt,batchingColor:Bt&&Z._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&Z.instanceColor!==null,instancingMorph:Ut&&Z.morphTexture!==null,outputColorSpace:pt===null?s.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:Gs,alphaToCoverage:!!T.alphaToCoverage,map:Kt,matcap:He,envMap:ge,envMapMode:ge&&F.mapping,envMapCubeUVHeight:rt,aoMap:_e,lightMap:Ne,bumpMap:ce,normalMap:$e,displacementMap:V,emissiveMap:je,normalMapObjectSpace:$e&&T.normalMapType===kM,normalMapTangentSpace:$e&&T.normalMapType===Pv,metalnessMap:be,roughnessMap:Pe,anisotropy:jt,anisotropyMap:dt,clearcoat:z,clearcoatMap:qt,clearcoatNormalMap:wt,clearcoatRoughnessMap:Jt,dispersion:b,iridescence:Y,iridescenceMap:ne,iridescenceThicknessMap:Tt,sheen:gt,sheenColorMap:Et,sheenRoughnessMap:Pt,specularMap:Ot,specularColorMap:It,specularIntensityMap:fe,transmission:Mt,transmissionMap:q,thicknessMap:Ct,gradientMap:At,opaque:T.transparent===!1&&T.blending===Ps&&T.alphaToCoverage===!1,alphaMap:zt,alphaTest:bt,alphaHash:ht,combine:T.combine,mapUv:Kt&&E(T.map.channel),aoMapUv:_e&&E(T.aoMap.channel),lightMapUv:Ne&&E(T.lightMap.channel),bumpMapUv:ce&&E(T.bumpMap.channel),normalMapUv:$e&&E(T.normalMap.channel),displacementMapUv:V&&E(T.displacementMap.channel),emissiveMapUv:je&&E(T.emissiveMap.channel),metalnessMapUv:be&&E(T.metalnessMap.channel),roughnessMapUv:Pe&&E(T.roughnessMap.channel),anisotropyMapUv:dt&&E(T.anisotropyMap.channel),clearcoatMapUv:qt&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:wt&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Jt&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&E(T.sheenRoughnessMap.channel),specularMapUv:Ot&&E(T.specularMap.channel),specularColorMapUv:It&&E(T.specularColorMap.channel),specularIntensityMapUv:fe&&E(T.specularIntensityMap.channel),transmissionMapUv:q&&E(T.transmissionMap.channel),thicknessMapUv:Ct&&E(T.thicknessMap.channel),alphaMapUv:zt&&E(T.alphaMap.channel),vertexTangents:!!ut.attributes.tangent&&($e||jt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,pointsUvs:Z.isPoints===!0&&!!ut.attributes.uv&&(Kt||zt),fog:!!nt,useFog:T.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||ut.attributes.normal===void 0&&$e===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:St,skinning:Z.isSkinnedMesh===!0,morphTargets:ut.morphAttributes.position!==void 0,morphNormals:ut.morphAttributes.normal!==void 0,morphColors:ut.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:k,numDirLights:O.directional.length,numPointLights:O.point.length,numSpotLights:O.spot.length,numSpotLightMaps:O.spotLightMap.length,numRectAreaLights:O.rectArea.length,numHemiLights:O.hemi.length,numDirLightShadows:O.directionalShadowMap.length,numPointLightShadows:O.pointShadowMap.length,numSpotLightShadows:O.spotShadowMap.length,numSpotLightShadowsWithMaps:O.numSpotLightShadowsWithMaps,numLightProbes:O.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&ft.length>0,shadowMapType:s.shadowMap.type,toneMapping:ae,decodeVideoTexture:Kt&&T.map.isVideoTexture===!0&&Re.getTransfer(T.map.colorSpace)===Ge,decodeVideoTextureEmissive:je&&T.emissiveMap.isVideoTexture===!0&&Re.getTransfer(T.emissiveMap.colorSpace)===Ge,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Vi,flipSided:T.side===Kn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Vt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&T.extensions.multiDraw===!0||Bt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return ze.vertexUv1s=m.has(1),ze.vertexUv2s=m.has(2),ze.vertexUv3s=m.has(3),m.clear(),ze}function S(T){const O=[];if(T.shaderID?O.push(T.shaderID):(O.push(T.customVertexShaderID),O.push(T.customFragmentShaderID)),T.defines!==void 0)for(const ft in T.defines)O.push(ft),O.push(T.defines[ft]);return T.isRawShaderMaterial===!1&&(_(O,T),R(O,T),O.push(s.outputColorSpace)),O.push(T.customProgramCacheKey),O.join()}function _(T,O){T.push(O.precision),T.push(O.outputColorSpace),T.push(O.envMapMode),T.push(O.envMapCubeUVHeight),T.push(O.mapUv),T.push(O.alphaMapUv),T.push(O.lightMapUv),T.push(O.aoMapUv),T.push(O.bumpMapUv),T.push(O.normalMapUv),T.push(O.displacementMapUv),T.push(O.emissiveMapUv),T.push(O.metalnessMapUv),T.push(O.roughnessMapUv),T.push(O.anisotropyMapUv),T.push(O.clearcoatMapUv),T.push(O.clearcoatNormalMapUv),T.push(O.clearcoatRoughnessMapUv),T.push(O.iridescenceMapUv),T.push(O.iridescenceThicknessMapUv),T.push(O.sheenColorMapUv),T.push(O.sheenRoughnessMapUv),T.push(O.specularMapUv),T.push(O.specularColorMapUv),T.push(O.specularIntensityMapUv),T.push(O.transmissionMapUv),T.push(O.thicknessMapUv),T.push(O.combine),T.push(O.fogExp2),T.push(O.sizeAttenuation),T.push(O.morphTargetsCount),T.push(O.morphAttributeCount),T.push(O.numDirLights),T.push(O.numPointLights),T.push(O.numSpotLights),T.push(O.numSpotLightMaps),T.push(O.numHemiLights),T.push(O.numRectAreaLights),T.push(O.numDirLightShadows),T.push(O.numPointLightShadows),T.push(O.numSpotLightShadows),T.push(O.numSpotLightShadowsWithMaps),T.push(O.numLightProbes),T.push(O.shadowMapType),T.push(O.toneMapping),T.push(O.numClippingPlanes),T.push(O.numClipIntersection),T.push(O.depthPacking)}function R(T,O){h.disableAll(),O.instancing&&h.enable(0),O.instancingColor&&h.enable(1),O.instancingMorph&&h.enable(2),O.matcap&&h.enable(3),O.envMap&&h.enable(4),O.normalMapObjectSpace&&h.enable(5),O.normalMapTangentSpace&&h.enable(6),O.clearcoat&&h.enable(7),O.iridescence&&h.enable(8),O.alphaTest&&h.enable(9),O.vertexColors&&h.enable(10),O.vertexAlphas&&h.enable(11),O.vertexUv1s&&h.enable(12),O.vertexUv2s&&h.enable(13),O.vertexUv3s&&h.enable(14),O.vertexTangents&&h.enable(15),O.anisotropy&&h.enable(16),O.alphaHash&&h.enable(17),O.batching&&h.enable(18),O.dispersion&&h.enable(19),O.batchingColor&&h.enable(20),O.gradientMap&&h.enable(21),T.push(h.mask),h.disableAll(),O.fog&&h.enable(0),O.useFog&&h.enable(1),O.flatShading&&h.enable(2),O.logarithmicDepthBuffer&&h.enable(3),O.reversedDepthBuffer&&h.enable(4),O.skinning&&h.enable(5),O.morphTargets&&h.enable(6),O.morphNormals&&h.enable(7),O.morphColors&&h.enable(8),O.premultipliedAlpha&&h.enable(9),O.shadowMapEnabled&&h.enable(10),O.doubleSided&&h.enable(11),O.flipSided&&h.enable(12),O.useDepthPacking&&h.enable(13),O.dithering&&h.enable(14),O.transmission&&h.enable(15),O.sheen&&h.enable(16),O.opaque&&h.enable(17),O.pointsUvs&&h.enable(18),O.decodeVideoTexture&&h.enable(19),O.decodeVideoTextureEmissive&&h.enable(20),O.alphaToCoverage&&h.enable(21),T.push(h.mask)}function D(T){const O=y[T.type];let ft;if(O){const G=Hi[O];ft=wy.clone(G.uniforms)}else ft=T.uniforms;return ft}function L(T,O){let ft=v.get(O);return ft!==void 0?++ft.usedTimes:(ft=new aA(s,O,T,l),p.push(ft),v.set(O,ft)),ft}function B(T){if(--T.usedTimes===0){const O=p.indexOf(T);p[O]=p[p.length-1],p.pop(),v.delete(T.cacheKey),T.destroy()}}function U(T){d.remove(T)}function N(){d.dispose()}return{getParameters:A,getProgramCacheKey:S,getUniforms:D,acquireProgram:L,releaseProgram:B,releaseShaderCache:U,programs:p,dispose:N}}function cA(){let s=new WeakMap;function t(h){return s.has(h)}function i(h){let d=s.get(h);return d===void 0&&(d={},s.set(h,d)),d}function r(h){s.delete(h)}function l(h,d,m){s.get(h)[d]=m}function c(){s=new WeakMap}return{has:t,get:i,remove:r,update:l,dispose:c}}function uA(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function iv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function av(){const s=[];let t=0;const i=[],r=[],l=[];function c(){t=0,i.length=0,r.length=0,l.length=0}function h(g){let y=0;return g.isInstancedMesh&&(y+=2),g.isSkinnedMesh&&(y+=1),y}function d(g,y,E,A,S,_){let R=s[t];return R===void 0?(R={id:g.id,object:g,geometry:y,material:E,materialVariant:h(g),groupOrder:A,renderOrder:g.renderOrder,z:S,group:_},s[t]=R):(R.id=g.id,R.object=g,R.geometry=y,R.material=E,R.materialVariant=h(g),R.groupOrder=A,R.renderOrder=g.renderOrder,R.z=S,R.group=_),t++,R}function m(g,y,E,A,S,_){const R=d(g,y,E,A,S,_);E.transmission>0?r.push(R):E.transparent===!0?l.push(R):i.push(R)}function p(g,y,E,A,S,_){const R=d(g,y,E,A,S,_);E.transmission>0?r.unshift(R):E.transparent===!0?l.unshift(R):i.unshift(R)}function v(g,y){i.length>1&&i.sort(g||uA),r.length>1&&r.sort(y||iv),l.length>1&&l.sort(y||iv)}function x(){for(let g=t,y=s.length;g<y;g++){const E=s[g];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:i,transmissive:r,transparent:l,init:c,push:m,unshift:p,finish:x,sort:v}}function fA(){let s=new WeakMap;function t(r,l){const c=s.get(r);let h;return c===void 0?(h=new av,s.set(r,[h])):l>=c.length?(h=new av,c.push(h)):h=c[l],h}function i(){s=new WeakMap}return{get:t,dispose:i}}function hA(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let i;switch(t.type){case"DirectionalLight":i={direction:new $,color:new Ft};break;case"SpotLight":i={position:new $,direction:new $,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new $,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":i={direction:new $,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":i={color:new Ft,position:new $,halfWidth:new $,halfHeight:new $};break}return s[t.id]=i,i}}}function dA(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let i;switch(t.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=i,i}}}let pA=0;function mA(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function gA(s){const t=new hA,i=dA(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new $);const l=new $,c=new Je,h=new Je;function d(p){let v=0,x=0,g=0;for(let O=0;O<9;O++)r.probe[O].set(0,0,0);let y=0,E=0,A=0,S=0,_=0,R=0,D=0,L=0,B=0,U=0,N=0;p.sort(mA);for(let O=0,ft=p.length;O<ft;O++){const G=p[O],Z=G.color,nt=G.intensity,ut=G.distance;let Q=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===Bs?Q=G.shadow.map.texture:Q=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)v+=Z.r*nt,x+=Z.g*nt,g+=Z.b*nt;else if(G.isLightProbe){for(let I=0;I<9;I++)r.probe[I].addScaledVector(G.sh.coefficients[I],nt);N++}else if(G.isDirectionalLight){const I=t.get(G);if(I.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){const F=G.shadow,rt=i.get(G);rt.shadowIntensity=F.intensity,rt.shadowBias=F.bias,rt.shadowNormalBias=F.normalBias,rt.shadowRadius=F.radius,rt.shadowMapSize=F.mapSize,r.directionalShadow[y]=rt,r.directionalShadowMap[y]=Q,r.directionalShadowMatrix[y]=G.shadow.matrix,R++}r.directional[y]=I,y++}else if(G.isSpotLight){const I=t.get(G);I.position.setFromMatrixPosition(G.matrixWorld),I.color.copy(Z).multiplyScalar(nt),I.distance=ut,I.coneCos=Math.cos(G.angle),I.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),I.decay=G.decay,r.spot[A]=I;const F=G.shadow;if(G.map&&(r.spotLightMap[B]=G.map,B++,F.updateMatrices(G),G.castShadow&&U++),r.spotLightMatrix[A]=F.matrix,G.castShadow){const rt=i.get(G);rt.shadowIntensity=F.intensity,rt.shadowBias=F.bias,rt.shadowNormalBias=F.normalBias,rt.shadowRadius=F.radius,rt.shadowMapSize=F.mapSize,r.spotShadow[A]=rt,r.spotShadowMap[A]=Q,L++}A++}else if(G.isRectAreaLight){const I=t.get(G);I.color.copy(Z).multiplyScalar(nt),I.halfWidth.set(G.width*.5,0,0),I.halfHeight.set(0,G.height*.5,0),r.rectArea[S]=I,S++}else if(G.isPointLight){const I=t.get(G);if(I.color.copy(G.color).multiplyScalar(G.intensity),I.distance=G.distance,I.decay=G.decay,G.castShadow){const F=G.shadow,rt=i.get(G);rt.shadowIntensity=F.intensity,rt.shadowBias=F.bias,rt.shadowNormalBias=F.normalBias,rt.shadowRadius=F.radius,rt.shadowMapSize=F.mapSize,rt.shadowCameraNear=F.camera.near,rt.shadowCameraFar=F.camera.far,r.pointShadow[E]=rt,r.pointShadowMap[E]=Q,r.pointShadowMatrix[E]=G.shadow.matrix,D++}r.point[E]=I,E++}else if(G.isHemisphereLight){const I=t.get(G);I.skyColor.copy(G.color).multiplyScalar(nt),I.groundColor.copy(G.groundColor).multiplyScalar(nt),r.hemi[_]=I,_++}}S>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Nt.LTC_FLOAT_1,r.rectAreaLTC2=Nt.LTC_FLOAT_2):(r.rectAreaLTC1=Nt.LTC_HALF_1,r.rectAreaLTC2=Nt.LTC_HALF_2)),r.ambient[0]=v,r.ambient[1]=x,r.ambient[2]=g;const T=r.hash;(T.directionalLength!==y||T.pointLength!==E||T.spotLength!==A||T.rectAreaLength!==S||T.hemiLength!==_||T.numDirectionalShadows!==R||T.numPointShadows!==D||T.numSpotShadows!==L||T.numSpotMaps!==B||T.numLightProbes!==N)&&(r.directional.length=y,r.spot.length=A,r.rectArea.length=S,r.point.length=E,r.hemi.length=_,r.directionalShadow.length=R,r.directionalShadowMap.length=R,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=L,r.spotShadowMap.length=L,r.directionalShadowMatrix.length=R,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=L+B-U,r.spotLightMap.length=B,r.numSpotLightShadowsWithMaps=U,r.numLightProbes=N,T.directionalLength=y,T.pointLength=E,T.spotLength=A,T.rectAreaLength=S,T.hemiLength=_,T.numDirectionalShadows=R,T.numPointShadows=D,T.numSpotShadows=L,T.numSpotMaps=B,T.numLightProbes=N,r.version=pA++)}function m(p,v){let x=0,g=0,y=0,E=0,A=0;const S=v.matrixWorldInverse;for(let _=0,R=p.length;_<R;_++){const D=p[_];if(D.isDirectionalLight){const L=r.directional[x];L.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(S),x++}else if(D.isSpotLight){const L=r.spot[y];L.position.setFromMatrixPosition(D.matrixWorld),L.position.applyMatrix4(S),L.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),L.direction.sub(l),L.direction.transformDirection(S),y++}else if(D.isRectAreaLight){const L=r.rectArea[E];L.position.setFromMatrixPosition(D.matrixWorld),L.position.applyMatrix4(S),h.identity(),c.copy(D.matrixWorld),c.premultiply(S),h.extractRotation(c),L.halfWidth.set(D.width*.5,0,0),L.halfHeight.set(0,D.height*.5,0),L.halfWidth.applyMatrix4(h),L.halfHeight.applyMatrix4(h),E++}else if(D.isPointLight){const L=r.point[g];L.position.setFromMatrixPosition(D.matrixWorld),L.position.applyMatrix4(S),g++}else if(D.isHemisphereLight){const L=r.hemi[A];L.direction.setFromMatrixPosition(D.matrixWorld),L.direction.transformDirection(S),A++}}}return{setup:d,setupView:m,state:r}}function rv(s){const t=new gA(s),i=[],r=[];function l(v){p.camera=v,i.length=0,r.length=0}function c(v){i.push(v)}function h(v){r.push(v)}function d(){t.setup(i)}function m(v){t.setupView(i,v)}const p={lightsArray:i,shadowsArray:r,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:c,pushShadow:h}}function _A(s){let t=new WeakMap;function i(l,c=0){const h=t.get(l);let d;return h===void 0?(d=new rv(s),t.set(l,[d])):c>=h.length?(d=new rv(s),h.push(d)):d=h[c],d}function r(){t=new WeakMap}return{get:i,dispose:r}}const vA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,SA=[new $(1,0,0),new $(-1,0,0),new $(0,1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1)],MA=[new $(0,-1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1),new $(0,-1,0),new $(0,-1,0)],sv=new Je,ko=new $,ed=new $;function yA(s,t,i){let r=new pp;const l=new Le,c=new Le,h=new nn,d=new Oy,m=new Py,p={},v=i.maxTextureSize,x={[rr]:Kn,[Kn]:rr,[Vi]:Vi},g=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:vA,fragmentShader:xA}),y=g.clone();y.defines.HORIZONTAL_PASS=1;const E=new Cn;E.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new Hn(E,g),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qc;let _=this.type;this.render=function(U,N,T){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||U.length===0)return;this.type===vv&&(re("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=qc);const O=s.getRenderTarget(),ft=s.getActiveCubeFace(),G=s.getActiveMipmapLevel(),Z=s.state;Z.setBlending(Sa),Z.buffers.depth.getReversed()===!0?Z.buffers.color.setClear(0,0,0,0):Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const nt=_!==this.type;nt&&N.traverse(function(ut){ut.material&&(Array.isArray(ut.material)?ut.material.forEach(Q=>Q.needsUpdate=!0):ut.material.needsUpdate=!0)});for(let ut=0,Q=U.length;ut<Q;ut++){const I=U[ut],F=I.shadow;if(F===void 0){re("WebGLShadowMap:",I,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;l.copy(F.mapSize);const rt=F.getFrameExtents();l.multiply(rt),c.copy(F.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/rt.x),l.x=c.x*rt.x,F.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/rt.y),l.y=c.y*rt.y,F.mapSize.y=c.y));const ot=s.state.buffers.depth.getReversed();if(F.camera._reversedDepth=ot,F.map===null||nt===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Wo){if(I.isPointLight){re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new qi(l.x,l.y,{format:Bs,type:ya,minFilter:Ln,magFilter:Ln,generateMipmaps:!1}),F.map.texture.name=I.name+".shadowMap",F.map.depthTexture=new Jo(l.x,l.y,Xi),F.map.depthTexture.name=I.name+".shadowMapDepth",F.map.depthTexture.format=Ea,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Rn,F.map.depthTexture.magFilter=Rn}else I.isPointLight?(F.map=new Qv(l.x),F.map.depthTexture=new Ry(l.x,ji)):(F.map=new qi(l.x,l.y),F.map.depthTexture=new Jo(l.x,l.y,ji)),F.map.depthTexture.name=I.name+".shadowMap",F.map.depthTexture.format=Ea,this.type===qc?(F.map.depthTexture.compareFunction=ot?fp:up,F.map.depthTexture.minFilter=Ln,F.map.depthTexture.magFilter=Ln):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Rn,F.map.depthTexture.magFilter=Rn);F.camera.updateProjectionMatrix()}const vt=F.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<vt;P++){if(F.map.isWebGLCubeRenderTarget)s.setRenderTarget(F.map,P),s.clear();else{P===0&&(s.setRenderTarget(F.map),s.clear());const k=F.getViewport(P);h.set(c.x*k.x,c.y*k.y,c.x*k.z,c.y*k.w),Z.viewport(h)}if(I.isPointLight){const k=F.camera,ct=F.matrix,yt=I.distance||k.far;yt!==k.far&&(k.far=yt,k.updateProjectionMatrix()),ko.setFromMatrixPosition(I.matrixWorld),k.position.copy(ko),ed.copy(k.position),ed.add(SA[P]),k.up.copy(MA[P]),k.lookAt(ed),k.updateMatrixWorld(),ct.makeTranslation(-ko.x,-ko.y,-ko.z),sv.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),F._frustum.setFromProjectionMatrix(sv,k.coordinateSystem,k.reversedDepth)}else F.updateMatrices(I);r=F.getFrustum(),L(N,T,F.camera,I,this.type)}F.isPointLightShadow!==!0&&this.type===Wo&&R(F,T),F.needsUpdate=!1}_=this.type,S.needsUpdate=!1,s.setRenderTarget(O,ft,G)};function R(U,N){const T=t.update(A);g.defines.VSM_SAMPLES!==U.blurSamples&&(g.defines.VSM_SAMPLES=U.blurSamples,y.defines.VSM_SAMPLES=U.blurSamples,g.needsUpdate=!0,y.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new qi(l.x,l.y,{format:Bs,type:ya})),g.uniforms.shadow_pass.value=U.map.depthTexture,g.uniforms.resolution.value=U.mapSize,g.uniforms.radius.value=U.radius,s.setRenderTarget(U.mapPass),s.clear(),s.renderBufferDirect(N,null,T,g,A,null),y.uniforms.shadow_pass.value=U.mapPass.texture,y.uniforms.resolution.value=U.mapSize,y.uniforms.radius.value=U.radius,s.setRenderTarget(U.map),s.clear(),s.renderBufferDirect(N,null,T,y,A,null)}function D(U,N,T,O){let ft=null;const G=T.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(G!==void 0)ft=G;else if(ft=T.isPointLight===!0?m:d,s.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const Z=ft.uuid,nt=N.uuid;let ut=p[Z];ut===void 0&&(ut={},p[Z]=ut);let Q=ut[nt];Q===void 0&&(Q=ft.clone(),ut[nt]=Q,N.addEventListener("dispose",B)),ft=Q}if(ft.visible=N.visible,ft.wireframe=N.wireframe,O===Wo?ft.side=N.shadowSide!==null?N.shadowSide:N.side:ft.side=N.shadowSide!==null?N.shadowSide:x[N.side],ft.alphaMap=N.alphaMap,ft.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,ft.map=N.map,ft.clipShadows=N.clipShadows,ft.clippingPlanes=N.clippingPlanes,ft.clipIntersection=N.clipIntersection,ft.displacementMap=N.displacementMap,ft.displacementScale=N.displacementScale,ft.displacementBias=N.displacementBias,ft.wireframeLinewidth=N.wireframeLinewidth,ft.linewidth=N.linewidth,T.isPointLight===!0&&ft.isMeshDistanceMaterial===!0){const Z=s.properties.get(ft);Z.light=T}return ft}function L(U,N,T,O,ft){if(U.visible===!1)return;if(U.layers.test(N.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&ft===Wo)&&(!U.frustumCulled||r.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,U.matrixWorld);const nt=t.update(U),ut=U.material;if(Array.isArray(ut)){const Q=nt.groups;for(let I=0,F=Q.length;I<F;I++){const rt=Q[I],ot=ut[rt.materialIndex];if(ot&&ot.visible){const vt=D(U,ot,O,ft);U.onBeforeShadow(s,U,N,T,nt,vt,rt),s.renderBufferDirect(T,null,nt,vt,U,rt),U.onAfterShadow(s,U,N,T,nt,vt,rt)}}}else if(ut.visible){const Q=D(U,ut,O,ft);U.onBeforeShadow(s,U,N,T,nt,Q,null),s.renderBufferDirect(T,null,nt,Q,U,null),U.onAfterShadow(s,U,N,T,nt,Q,null)}}const Z=U.children;for(let nt=0,ut=Z.length;nt<ut;nt++)L(Z[nt],N,T,O,ft)}function B(U){U.target.removeEventListener("dispose",B);for(const T in p){const O=p[T],ft=U.target.uuid;ft in O&&(O[ft].dispose(),delete O[ft])}}}function EA(s,t){function i(){let q=!1;const Ct=new nn;let At=null;const zt=new nn(0,0,0,0);return{setMask:function(bt){At!==bt&&!q&&(s.colorMask(bt,bt,bt,bt),At=bt)},setLocked:function(bt){q=bt},setClear:function(bt,ht,Vt,ae,ze){ze===!0&&(bt*=ae,ht*=ae,Vt*=ae),Ct.set(bt,ht,Vt,ae),zt.equals(Ct)===!1&&(s.clearColor(bt,ht,Vt,ae),zt.copy(Ct))},reset:function(){q=!1,At=null,zt.set(-1,0,0,0)}}}function r(){let q=!1,Ct=!1,At=null,zt=null,bt=null;return{setReversed:function(ht){if(Ct!==ht){const Vt=t.get("EXT_clip_control");ht?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT),Ct=ht;const ae=bt;bt=null,this.setClear(ae)}},getReversed:function(){return Ct},setTest:function(ht){ht?pt(s.DEPTH_TEST):St(s.DEPTH_TEST)},setMask:function(ht){At!==ht&&!q&&(s.depthMask(ht),At=ht)},setFunc:function(ht){if(Ct&&(ht=ty[ht]),zt!==ht){switch(ht){case ld:s.depthFunc(s.NEVER);break;case cd:s.depthFunc(s.ALWAYS);break;case ud:s.depthFunc(s.LESS);break;case zs:s.depthFunc(s.LEQUAL);break;case fd:s.depthFunc(s.EQUAL);break;case hd:s.depthFunc(s.GEQUAL);break;case dd:s.depthFunc(s.GREATER);break;case pd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}zt=ht}},setLocked:function(ht){q=ht},setClear:function(ht){bt!==ht&&(bt=ht,Ct&&(ht=1-ht),s.clearDepth(ht))},reset:function(){q=!1,At=null,zt=null,bt=null,Ct=!1}}}function l(){let q=!1,Ct=null,At=null,zt=null,bt=null,ht=null,Vt=null,ae=null,ze=null;return{setTest:function(Te){q||(Te?pt(s.STENCIL_TEST):St(s.STENCIL_TEST))},setMask:function(Te){Ct!==Te&&!q&&(s.stencilMask(Te),Ct=Te)},setFunc:function(Te,On,Mi){(At!==Te||zt!==On||bt!==Mi)&&(s.stencilFunc(Te,On,Mi),At=Te,zt=On,bt=Mi)},setOp:function(Te,On,Mi){(ht!==Te||Vt!==On||ae!==Mi)&&(s.stencilOp(Te,On,Mi),ht=Te,Vt=On,ae=Mi)},setLocked:function(Te){q=Te},setClear:function(Te){ze!==Te&&(s.clearStencil(Te),ze=Te)},reset:function(){q=!1,Ct=null,At=null,zt=null,bt=null,ht=null,Vt=null,ae=null,ze=null}}}const c=new i,h=new r,d=new l,m=new WeakMap,p=new WeakMap;let v={},x={},g=new WeakMap,y=[],E=null,A=!1,S=null,_=null,R=null,D=null,L=null,B=null,U=null,N=new Ft(0,0,0),T=0,O=!1,ft=null,G=null,Z=null,nt=null,ut=null;const Q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,F=0;const rt=s.getParameter(s.VERSION);rt.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(rt)[1]),I=F>=1):rt.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),I=F>=2);let ot=null,vt={};const P=s.getParameter(s.SCISSOR_BOX),k=s.getParameter(s.VIEWPORT),ct=new nn().fromArray(P),yt=new nn().fromArray(k);function Rt(q,Ct,At,zt){const bt=new Uint8Array(4),ht=s.createTexture();s.bindTexture(q,ht),s.texParameteri(q,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(q,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Vt=0;Vt<At;Vt++)q===s.TEXTURE_3D||q===s.TEXTURE_2D_ARRAY?s.texImage3D(Ct,0,s.RGBA,1,1,zt,0,s.RGBA,s.UNSIGNED_BYTE,bt):s.texImage2D(Ct+Vt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,bt);return ht}const K={};K[s.TEXTURE_2D]=Rt(s.TEXTURE_2D,s.TEXTURE_2D,1),K[s.TEXTURE_CUBE_MAP]=Rt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[s.TEXTURE_2D_ARRAY]=Rt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),K[s.TEXTURE_3D]=Rt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),c.setClear(0,0,0,1),h.setClear(1),d.setClear(0),pt(s.DEPTH_TEST),h.setFunc(zs),ce(!1),$e(r_),pt(s.CULL_FACE),_e(Sa);function pt(q){v[q]!==!0&&(s.enable(q),v[q]=!0)}function St(q){v[q]!==!1&&(s.disable(q),v[q]=!1)}function Ut(q,Ct){return x[q]!==Ct?(s.bindFramebuffer(q,Ct),x[q]=Ct,q===s.DRAW_FRAMEBUFFER&&(x[s.FRAMEBUFFER]=Ct),q===s.FRAMEBUFFER&&(x[s.DRAW_FRAMEBUFFER]=Ct),!0):!1}function Bt(q,Ct){let At=y,zt=!1;if(q){At=g.get(Ct),At===void 0&&(At=[],g.set(Ct,At));const bt=q.textures;if(At.length!==bt.length||At[0]!==s.COLOR_ATTACHMENT0){for(let ht=0,Vt=bt.length;ht<Vt;ht++)At[ht]=s.COLOR_ATTACHMENT0+ht;At.length=bt.length,zt=!0}}else At[0]!==s.BACK&&(At[0]=s.BACK,zt=!0);zt&&s.drawBuffers(At)}function Kt(q){return E!==q?(s.useProgram(q),E=q,!0):!1}const He={[Ur]:s.FUNC_ADD,[EM]:s.FUNC_SUBTRACT,[bM]:s.FUNC_REVERSE_SUBTRACT};He[TM]=s.MIN,He[AM]=s.MAX;const ge={[RM]:s.ZERO,[CM]:s.ONE,[wM]:s.SRC_COLOR,[sd]:s.SRC_ALPHA,[PM]:s.SRC_ALPHA_SATURATE,[NM]:s.DST_COLOR,[UM]:s.DST_ALPHA,[DM]:s.ONE_MINUS_SRC_COLOR,[od]:s.ONE_MINUS_SRC_ALPHA,[OM]:s.ONE_MINUS_DST_COLOR,[LM]:s.ONE_MINUS_DST_ALPHA,[IM]:s.CONSTANT_COLOR,[zM]:s.ONE_MINUS_CONSTANT_COLOR,[FM]:s.CONSTANT_ALPHA,[BM]:s.ONE_MINUS_CONSTANT_ALPHA};function _e(q,Ct,At,zt,bt,ht,Vt,ae,ze,Te){if(q===Sa){A===!0&&(St(s.BLEND),A=!1);return}if(A===!1&&(pt(s.BLEND),A=!0),q!==yM){if(q!==S||Te!==O){if((_!==Ur||L!==Ur)&&(s.blendEquation(s.FUNC_ADD),_=Ur,L=Ur),Te)switch(q){case Ps:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Yi:s.blendFunc(s.ONE,s.ONE);break;case s_:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case o_:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ue("WebGLState: Invalid blending: ",q);break}else switch(q){case Ps:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Yi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case s_:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case o_:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",q);break}R=null,D=null,B=null,U=null,N.set(0,0,0),T=0,S=q,O=Te}return}bt=bt||Ct,ht=ht||At,Vt=Vt||zt,(Ct!==_||bt!==L)&&(s.blendEquationSeparate(He[Ct],He[bt]),_=Ct,L=bt),(At!==R||zt!==D||ht!==B||Vt!==U)&&(s.blendFuncSeparate(ge[At],ge[zt],ge[ht],ge[Vt]),R=At,D=zt,B=ht,U=Vt),(ae.equals(N)===!1||ze!==T)&&(s.blendColor(ae.r,ae.g,ae.b,ze),N.copy(ae),T=ze),S=q,O=!1}function Ne(q,Ct){q.side===Vi?St(s.CULL_FACE):pt(s.CULL_FACE);let At=q.side===Kn;Ct&&(At=!At),ce(At),q.blending===Ps&&q.transparent===!1?_e(Sa):_e(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),h.setFunc(q.depthFunc),h.setTest(q.depthTest),h.setMask(q.depthWrite),c.setMask(q.colorWrite);const zt=q.stencilWrite;d.setTest(zt),zt&&(d.setMask(q.stencilWriteMask),d.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),d.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),je(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?pt(s.SAMPLE_ALPHA_TO_COVERAGE):St(s.SAMPLE_ALPHA_TO_COVERAGE)}function ce(q){ft!==q&&(q?s.frontFace(s.CW):s.frontFace(s.CCW),ft=q)}function $e(q){q!==SM?(pt(s.CULL_FACE),q!==G&&(q===r_?s.cullFace(s.BACK):q===MM?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):St(s.CULL_FACE),G=q}function V(q){q!==Z&&(I&&s.lineWidth(q),Z=q)}function je(q,Ct,At){q?(pt(s.POLYGON_OFFSET_FILL),(nt!==Ct||ut!==At)&&(nt=Ct,ut=At,h.getReversed()&&(Ct=-Ct),s.polygonOffset(Ct,At))):St(s.POLYGON_OFFSET_FILL)}function be(q){q?pt(s.SCISSOR_TEST):St(s.SCISSOR_TEST)}function Pe(q){q===void 0&&(q=s.TEXTURE0+Q-1),ot!==q&&(s.activeTexture(q),ot=q)}function jt(q,Ct,At){At===void 0&&(ot===null?At=s.TEXTURE0+Q-1:At=ot);let zt=vt[At];zt===void 0&&(zt={type:void 0,texture:void 0},vt[At]=zt),(zt.type!==q||zt.texture!==Ct)&&(ot!==At&&(s.activeTexture(At),ot=At),s.bindTexture(q,Ct||K[q]),zt.type=q,zt.texture=Ct)}function z(){const q=vt[ot];q!==void 0&&q.type!==void 0&&(s.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function b(){try{s.compressedTexImage2D(...arguments)}catch(q){Ue("WebGLState:",q)}}function Y(){try{s.compressedTexImage3D(...arguments)}catch(q){Ue("WebGLState:",q)}}function gt(){try{s.texSubImage2D(...arguments)}catch(q){Ue("WebGLState:",q)}}function Mt(){try{s.texSubImage3D(...arguments)}catch(q){Ue("WebGLState:",q)}}function dt(){try{s.compressedTexSubImage2D(...arguments)}catch(q){Ue("WebGLState:",q)}}function qt(){try{s.compressedTexSubImage3D(...arguments)}catch(q){Ue("WebGLState:",q)}}function wt(){try{s.texStorage2D(...arguments)}catch(q){Ue("WebGLState:",q)}}function Jt(){try{s.texStorage3D(...arguments)}catch(q){Ue("WebGLState:",q)}}function ne(){try{s.texImage2D(...arguments)}catch(q){Ue("WebGLState:",q)}}function Tt(){try{s.texImage3D(...arguments)}catch(q){Ue("WebGLState:",q)}}function Et(q){ct.equals(q)===!1&&(s.scissor(q.x,q.y,q.z,q.w),ct.copy(q))}function Pt(q){yt.equals(q)===!1&&(s.viewport(q.x,q.y,q.z,q.w),yt.copy(q))}function Ot(q,Ct){let At=p.get(Ct);At===void 0&&(At=new WeakMap,p.set(Ct,At));let zt=At.get(q);zt===void 0&&(zt=s.getUniformBlockIndex(Ct,q.name),At.set(q,zt))}function It(q,Ct){const zt=p.get(Ct).get(q);m.get(Ct)!==zt&&(s.uniformBlockBinding(Ct,zt,q.__bindingPointIndex),m.set(Ct,zt))}function fe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),h.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),v={},ot=null,vt={},x={},g=new WeakMap,y=[],E=null,A=!1,S=null,_=null,R=null,D=null,L=null,B=null,U=null,N=new Ft(0,0,0),T=0,O=!1,ft=null,G=null,Z=null,nt=null,ut=null,ct.set(0,0,s.canvas.width,s.canvas.height),yt.set(0,0,s.canvas.width,s.canvas.height),c.reset(),h.reset(),d.reset()}return{buffers:{color:c,depth:h,stencil:d},enable:pt,disable:St,bindFramebuffer:Ut,drawBuffers:Bt,useProgram:Kt,setBlending:_e,setMaterial:Ne,setFlipSided:ce,setCullFace:$e,setLineWidth:V,setPolygonOffset:je,setScissorTest:be,activeTexture:Pe,bindTexture:jt,unbindTexture:z,compressedTexImage2D:b,compressedTexImage3D:Y,texImage2D:ne,texImage3D:Tt,updateUBOMapping:Ot,uniformBlockBinding:It,texStorage2D:wt,texStorage3D:Jt,texSubImage2D:gt,texSubImage3D:Mt,compressedTexSubImage2D:dt,compressedTexSubImage3D:qt,scissor:Et,viewport:Pt,reset:fe}}function bA(s,t,i,r,l,c,h){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Le,v=new WeakMap;let x;const g=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(z,b){return y?new OffscreenCanvas(z,b):$c("canvas")}function A(z,b,Y){let gt=1;const Mt=jt(z);if((Mt.width>Y||Mt.height>Y)&&(gt=Y/Math.max(Mt.width,Mt.height)),gt<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const dt=Math.floor(gt*Mt.width),qt=Math.floor(gt*Mt.height);x===void 0&&(x=E(dt,qt));const wt=b?E(dt,qt):x;return wt.width=dt,wt.height=qt,wt.getContext("2d").drawImage(z,0,0,dt,qt),re("WebGLRenderer: Texture has been resized from ("+Mt.width+"x"+Mt.height+") to ("+dt+"x"+qt+")."),wt}else return"data"in z&&re("WebGLRenderer: Image in DataTexture is too big ("+Mt.width+"x"+Mt.height+")."),z;return z}function S(z){return z.generateMipmaps}function _(z){s.generateMipmap(z)}function R(z){return z.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?s.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function D(z,b,Y,gt,Mt=!1){if(z!==null){if(s[z]!==void 0)return s[z];re("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let dt=b;if(b===s.RED&&(Y===s.FLOAT&&(dt=s.R32F),Y===s.HALF_FLOAT&&(dt=s.R16F),Y===s.UNSIGNED_BYTE&&(dt=s.R8)),b===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(dt=s.R8UI),Y===s.UNSIGNED_SHORT&&(dt=s.R16UI),Y===s.UNSIGNED_INT&&(dt=s.R32UI),Y===s.BYTE&&(dt=s.R8I),Y===s.SHORT&&(dt=s.R16I),Y===s.INT&&(dt=s.R32I)),b===s.RG&&(Y===s.FLOAT&&(dt=s.RG32F),Y===s.HALF_FLOAT&&(dt=s.RG16F),Y===s.UNSIGNED_BYTE&&(dt=s.RG8)),b===s.RG_INTEGER&&(Y===s.UNSIGNED_BYTE&&(dt=s.RG8UI),Y===s.UNSIGNED_SHORT&&(dt=s.RG16UI),Y===s.UNSIGNED_INT&&(dt=s.RG32UI),Y===s.BYTE&&(dt=s.RG8I),Y===s.SHORT&&(dt=s.RG16I),Y===s.INT&&(dt=s.RG32I)),b===s.RGB_INTEGER&&(Y===s.UNSIGNED_BYTE&&(dt=s.RGB8UI),Y===s.UNSIGNED_SHORT&&(dt=s.RGB16UI),Y===s.UNSIGNED_INT&&(dt=s.RGB32UI),Y===s.BYTE&&(dt=s.RGB8I),Y===s.SHORT&&(dt=s.RGB16I),Y===s.INT&&(dt=s.RGB32I)),b===s.RGBA_INTEGER&&(Y===s.UNSIGNED_BYTE&&(dt=s.RGBA8UI),Y===s.UNSIGNED_SHORT&&(dt=s.RGBA16UI),Y===s.UNSIGNED_INT&&(dt=s.RGBA32UI),Y===s.BYTE&&(dt=s.RGBA8I),Y===s.SHORT&&(dt=s.RGBA16I),Y===s.INT&&(dt=s.RGBA32I)),b===s.RGB&&(Y===s.UNSIGNED_INT_5_9_9_9_REV&&(dt=s.RGB9_E5),Y===s.UNSIGNED_INT_10F_11F_11F_REV&&(dt=s.R11F_G11F_B10F)),b===s.RGBA){const qt=Mt?Jc:Re.getTransfer(gt);Y===s.FLOAT&&(dt=s.RGBA32F),Y===s.HALF_FLOAT&&(dt=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(dt=qt===Ge?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT_4_4_4_4&&(dt=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(dt=s.RGB5_A1)}return(dt===s.R16F||dt===s.R32F||dt===s.RG16F||dt===s.RG32F||dt===s.RGBA16F||dt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),dt}function L(z,b){let Y;return z?b===null||b===ji||b===Ko?Y=s.DEPTH24_STENCIL8:b===Xi?Y=s.DEPTH32F_STENCIL8:b===Zo&&(Y=s.DEPTH24_STENCIL8,re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ji||b===Ko?Y=s.DEPTH_COMPONENT24:b===Xi?Y=s.DEPTH_COMPONENT32F:b===Zo&&(Y=s.DEPTH_COMPONENT16),Y}function B(z,b){return S(z)===!0||z.isFramebufferTexture&&z.minFilter!==Rn&&z.minFilter!==Ln?Math.log2(Math.max(b.width,b.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?b.mipmaps.length:1}function U(z){const b=z.target;b.removeEventListener("dispose",U),T(b),b.isVideoTexture&&v.delete(b)}function N(z){const b=z.target;b.removeEventListener("dispose",N),ft(b)}function T(z){const b=r.get(z);if(b.__webglInit===void 0)return;const Y=z.source,gt=g.get(Y);if(gt){const Mt=gt[b.__cacheKey];Mt.usedTimes--,Mt.usedTimes===0&&O(z),Object.keys(gt).length===0&&g.delete(Y)}r.remove(z)}function O(z){const b=r.get(z);s.deleteTexture(b.__webglTexture);const Y=z.source,gt=g.get(Y);delete gt[b.__cacheKey],h.memory.textures--}function ft(z){const b=r.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),r.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let gt=0;gt<6;gt++){if(Array.isArray(b.__webglFramebuffer[gt]))for(let Mt=0;Mt<b.__webglFramebuffer[gt].length;Mt++)s.deleteFramebuffer(b.__webglFramebuffer[gt][Mt]);else s.deleteFramebuffer(b.__webglFramebuffer[gt]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[gt])}else{if(Array.isArray(b.__webglFramebuffer))for(let gt=0;gt<b.__webglFramebuffer.length;gt++)s.deleteFramebuffer(b.__webglFramebuffer[gt]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let gt=0;gt<b.__webglColorRenderbuffer.length;gt++)b.__webglColorRenderbuffer[gt]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[gt]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const Y=z.textures;for(let gt=0,Mt=Y.length;gt<Mt;gt++){const dt=r.get(Y[gt]);dt.__webglTexture&&(s.deleteTexture(dt.__webglTexture),h.memory.textures--),r.remove(Y[gt])}r.remove(z)}let G=0;function Z(){G=0}function nt(){const z=G;return z>=l.maxTextures&&re("WebGLTextures: Trying to use "+z+" texture units while this GPU supports only "+l.maxTextures),G+=1,z}function ut(z){const b=[];return b.push(z.wrapS),b.push(z.wrapT),b.push(z.wrapR||0),b.push(z.magFilter),b.push(z.minFilter),b.push(z.anisotropy),b.push(z.internalFormat),b.push(z.format),b.push(z.type),b.push(z.generateMipmaps),b.push(z.premultiplyAlpha),b.push(z.flipY),b.push(z.unpackAlignment),b.push(z.colorSpace),b.join()}function Q(z,b){const Y=r.get(z);if(z.isVideoTexture&&be(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&Y.__version!==z.version){const gt=z.image;if(gt===null)re("WebGLRenderer: Texture marked for update but no image data found.");else if(gt.complete===!1)re("WebGLRenderer: Texture marked for update but image is incomplete");else{K(Y,z,b);return}}else z.isExternalTexture&&(Y.__webglTexture=z.sourceTexture?z.sourceTexture:null);i.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+b)}function I(z,b){const Y=r.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&Y.__version!==z.version){K(Y,z,b);return}else z.isExternalTexture&&(Y.__webglTexture=z.sourceTexture?z.sourceTexture:null);i.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+b)}function F(z,b){const Y=r.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&Y.__version!==z.version){K(Y,z,b);return}i.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+b)}function rt(z,b){const Y=r.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&Y.__version!==z.version){pt(Y,z,b);return}i.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+b)}const ot={[md]:s.REPEAT,[xa]:s.CLAMP_TO_EDGE,[gd]:s.MIRRORED_REPEAT},vt={[Rn]:s.NEAREST,[VM]:s.NEAREST_MIPMAP_NEAREST,[_c]:s.NEAREST_MIPMAP_LINEAR,[Ln]:s.LINEAR,[Eh]:s.LINEAR_MIPMAP_NEAREST,[Nr]:s.LINEAR_MIPMAP_LINEAR},P={[WM]:s.NEVER,[KM]:s.ALWAYS,[qM]:s.LESS,[up]:s.LEQUAL,[YM]:s.EQUAL,[fp]:s.GEQUAL,[jM]:s.GREATER,[ZM]:s.NOTEQUAL};function k(z,b){if(b.type===Xi&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Ln||b.magFilter===Eh||b.magFilter===_c||b.magFilter===Nr||b.minFilter===Ln||b.minFilter===Eh||b.minFilter===_c||b.minFilter===Nr)&&re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(z,s.TEXTURE_WRAP_S,ot[b.wrapS]),s.texParameteri(z,s.TEXTURE_WRAP_T,ot[b.wrapT]),(z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY)&&s.texParameteri(z,s.TEXTURE_WRAP_R,ot[b.wrapR]),s.texParameteri(z,s.TEXTURE_MAG_FILTER,vt[b.magFilter]),s.texParameteri(z,s.TEXTURE_MIN_FILTER,vt[b.minFilter]),b.compareFunction&&(s.texParameteri(z,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(z,s.TEXTURE_COMPARE_FUNC,P[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Rn||b.minFilter!==_c&&b.minFilter!==Nr||b.type===Xi&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||r.get(b).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");s.texParameterf(z,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,l.getMaxAnisotropy())),r.get(b).__currentAnisotropy=b.anisotropy}}}function ct(z,b){let Y=!1;z.__webglInit===void 0&&(z.__webglInit=!0,b.addEventListener("dispose",U));const gt=b.source;let Mt=g.get(gt);Mt===void 0&&(Mt={},g.set(gt,Mt));const dt=ut(b);if(dt!==z.__cacheKey){Mt[dt]===void 0&&(Mt[dt]={texture:s.createTexture(),usedTimes:0},h.memory.textures++,Y=!0),Mt[dt].usedTimes++;const qt=Mt[z.__cacheKey];qt!==void 0&&(Mt[z.__cacheKey].usedTimes--,qt.usedTimes===0&&O(b)),z.__cacheKey=dt,z.__webglTexture=Mt[dt].texture}return Y}function yt(z,b,Y){return Math.floor(Math.floor(z/Y)/b)}function Rt(z,b,Y,gt){const dt=z.updateRanges;if(dt.length===0)i.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,Y,gt,b.data);else{dt.sort((Tt,Et)=>Tt.start-Et.start);let qt=0;for(let Tt=1;Tt<dt.length;Tt++){const Et=dt[qt],Pt=dt[Tt],Ot=Et.start+Et.count,It=yt(Pt.start,b.width,4),fe=yt(Et.start,b.width,4);Pt.start<=Ot+1&&It===fe&&yt(Pt.start+Pt.count-1,b.width,4)===It?Et.count=Math.max(Et.count,Pt.start+Pt.count-Et.start):(++qt,dt[qt]=Pt)}dt.length=qt+1;const wt=s.getParameter(s.UNPACK_ROW_LENGTH),Jt=s.getParameter(s.UNPACK_SKIP_PIXELS),ne=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let Tt=0,Et=dt.length;Tt<Et;Tt++){const Pt=dt[Tt],Ot=Math.floor(Pt.start/4),It=Math.ceil(Pt.count/4),fe=Ot%b.width,q=Math.floor(Ot/b.width),Ct=It,At=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,fe),s.pixelStorei(s.UNPACK_SKIP_ROWS,q),i.texSubImage2D(s.TEXTURE_2D,0,fe,q,Ct,At,Y,gt,b.data)}z.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,wt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Jt),s.pixelStorei(s.UNPACK_SKIP_ROWS,ne)}}function K(z,b,Y){let gt=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(gt=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(gt=s.TEXTURE_3D);const Mt=ct(z,b),dt=b.source;i.bindTexture(gt,z.__webglTexture,s.TEXTURE0+Y);const qt=r.get(dt);if(dt.version!==qt.__version||Mt===!0){i.activeTexture(s.TEXTURE0+Y);const wt=Re.getPrimaries(Re.workingColorSpace),Jt=b.colorSpace===nr?null:Re.getPrimaries(b.colorSpace),ne=b.colorSpace===nr||wt===Jt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let Tt=A(b.image,!1,l.maxTextureSize);Tt=Pe(b,Tt);const Et=c.convert(b.format,b.colorSpace),Pt=c.convert(b.type);let Ot=D(b.internalFormat,Et,Pt,b.colorSpace,b.isVideoTexture);k(gt,b);let It;const fe=b.mipmaps,q=b.isVideoTexture!==!0,Ct=qt.__version===void 0||Mt===!0,At=dt.dataReady,zt=B(b,Tt);if(b.isDepthTexture)Ot=L(b.format===Or,b.type),Ct&&(q?i.texStorage2D(s.TEXTURE_2D,1,Ot,Tt.width,Tt.height):i.texImage2D(s.TEXTURE_2D,0,Ot,Tt.width,Tt.height,0,Et,Pt,null));else if(b.isDataTexture)if(fe.length>0){q&&Ct&&i.texStorage2D(s.TEXTURE_2D,zt,Ot,fe[0].width,fe[0].height);for(let bt=0,ht=fe.length;bt<ht;bt++)It=fe[bt],q?At&&i.texSubImage2D(s.TEXTURE_2D,bt,0,0,It.width,It.height,Et,Pt,It.data):i.texImage2D(s.TEXTURE_2D,bt,Ot,It.width,It.height,0,Et,Pt,It.data);b.generateMipmaps=!1}else q?(Ct&&i.texStorage2D(s.TEXTURE_2D,zt,Ot,Tt.width,Tt.height),At&&Rt(b,Tt,Et,Pt)):i.texImage2D(s.TEXTURE_2D,0,Ot,Tt.width,Tt.height,0,Et,Pt,Tt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){q&&Ct&&i.texStorage3D(s.TEXTURE_2D_ARRAY,zt,Ot,fe[0].width,fe[0].height,Tt.depth);for(let bt=0,ht=fe.length;bt<ht;bt++)if(It=fe[bt],b.format!==Li)if(Et!==null)if(q){if(At)if(b.layerUpdates.size>0){const Vt=z_(It.width,It.height,b.format,b.type);for(const ae of b.layerUpdates){const ze=It.data.subarray(ae*Vt/It.data.BYTES_PER_ELEMENT,(ae+1)*Vt/It.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,bt,0,0,ae,It.width,It.height,1,Et,ze)}b.clearLayerUpdates()}else i.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,bt,0,0,0,It.width,It.height,Tt.depth,Et,It.data)}else i.compressedTexImage3D(s.TEXTURE_2D_ARRAY,bt,Ot,It.width,It.height,Tt.depth,0,It.data,0,0);else re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else q?At&&i.texSubImage3D(s.TEXTURE_2D_ARRAY,bt,0,0,0,It.width,It.height,Tt.depth,Et,Pt,It.data):i.texImage3D(s.TEXTURE_2D_ARRAY,bt,Ot,It.width,It.height,Tt.depth,0,Et,Pt,It.data)}else{q&&Ct&&i.texStorage2D(s.TEXTURE_2D,zt,Ot,fe[0].width,fe[0].height);for(let bt=0,ht=fe.length;bt<ht;bt++)It=fe[bt],b.format!==Li?Et!==null?q?At&&i.compressedTexSubImage2D(s.TEXTURE_2D,bt,0,0,It.width,It.height,Et,It.data):i.compressedTexImage2D(s.TEXTURE_2D,bt,Ot,It.width,It.height,0,It.data):re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):q?At&&i.texSubImage2D(s.TEXTURE_2D,bt,0,0,It.width,It.height,Et,Pt,It.data):i.texImage2D(s.TEXTURE_2D,bt,Ot,It.width,It.height,0,Et,Pt,It.data)}else if(b.isDataArrayTexture)if(q){if(Ct&&i.texStorage3D(s.TEXTURE_2D_ARRAY,zt,Ot,Tt.width,Tt.height,Tt.depth),At)if(b.layerUpdates.size>0){const bt=z_(Tt.width,Tt.height,b.format,b.type);for(const ht of b.layerUpdates){const Vt=Tt.data.subarray(ht*bt/Tt.data.BYTES_PER_ELEMENT,(ht+1)*bt/Tt.data.BYTES_PER_ELEMENT);i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ht,Tt.width,Tt.height,1,Et,Pt,Vt)}b.clearLayerUpdates()}else i.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Tt.width,Tt.height,Tt.depth,Et,Pt,Tt.data)}else i.texImage3D(s.TEXTURE_2D_ARRAY,0,Ot,Tt.width,Tt.height,Tt.depth,0,Et,Pt,Tt.data);else if(b.isData3DTexture)q?(Ct&&i.texStorage3D(s.TEXTURE_3D,zt,Ot,Tt.width,Tt.height,Tt.depth),At&&i.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Tt.width,Tt.height,Tt.depth,Et,Pt,Tt.data)):i.texImage3D(s.TEXTURE_3D,0,Ot,Tt.width,Tt.height,Tt.depth,0,Et,Pt,Tt.data);else if(b.isFramebufferTexture){if(Ct)if(q)i.texStorage2D(s.TEXTURE_2D,zt,Ot,Tt.width,Tt.height);else{let bt=Tt.width,ht=Tt.height;for(let Vt=0;Vt<zt;Vt++)i.texImage2D(s.TEXTURE_2D,Vt,Ot,bt,ht,0,Et,Pt,null),bt>>=1,ht>>=1}}else if(fe.length>0){if(q&&Ct){const bt=jt(fe[0]);i.texStorage2D(s.TEXTURE_2D,zt,Ot,bt.width,bt.height)}for(let bt=0,ht=fe.length;bt<ht;bt++)It=fe[bt],q?At&&i.texSubImage2D(s.TEXTURE_2D,bt,0,0,Et,Pt,It):i.texImage2D(s.TEXTURE_2D,bt,Ot,Et,Pt,It);b.generateMipmaps=!1}else if(q){if(Ct){const bt=jt(Tt);i.texStorage2D(s.TEXTURE_2D,zt,Ot,bt.width,bt.height)}At&&i.texSubImage2D(s.TEXTURE_2D,0,0,0,Et,Pt,Tt)}else i.texImage2D(s.TEXTURE_2D,0,Ot,Et,Pt,Tt);S(b)&&_(gt),qt.__version=dt.version,b.onUpdate&&b.onUpdate(b)}z.__version=b.version}function pt(z,b,Y){if(b.image.length!==6)return;const gt=ct(z,b),Mt=b.source;i.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+Y);const dt=r.get(Mt);if(Mt.version!==dt.__version||gt===!0){i.activeTexture(s.TEXTURE0+Y);const qt=Re.getPrimaries(Re.workingColorSpace),wt=b.colorSpace===nr?null:Re.getPrimaries(b.colorSpace),Jt=b.colorSpace===nr||qt===wt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);const ne=b.isCompressedTexture||b.image[0].isCompressedTexture,Tt=b.image[0]&&b.image[0].isDataTexture,Et=[];for(let ht=0;ht<6;ht++)!ne&&!Tt?Et[ht]=A(b.image[ht],!0,l.maxCubemapSize):Et[ht]=Tt?b.image[ht].image:b.image[ht],Et[ht]=Pe(b,Et[ht]);const Pt=Et[0],Ot=c.convert(b.format,b.colorSpace),It=c.convert(b.type),fe=D(b.internalFormat,Ot,It,b.colorSpace),q=b.isVideoTexture!==!0,Ct=dt.__version===void 0||gt===!0,At=Mt.dataReady;let zt=B(b,Pt);k(s.TEXTURE_CUBE_MAP,b);let bt;if(ne){q&&Ct&&i.texStorage2D(s.TEXTURE_CUBE_MAP,zt,fe,Pt.width,Pt.height);for(let ht=0;ht<6;ht++){bt=Et[ht].mipmaps;for(let Vt=0;Vt<bt.length;Vt++){const ae=bt[Vt];b.format!==Li?Ot!==null?q?At&&i.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Vt,0,0,ae.width,ae.height,Ot,ae.data):i.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Vt,fe,ae.width,ae.height,0,ae.data):re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):q?At&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Vt,0,0,ae.width,ae.height,Ot,It,ae.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Vt,fe,ae.width,ae.height,0,Ot,It,ae.data)}}}else{if(bt=b.mipmaps,q&&Ct){bt.length>0&&zt++;const ht=jt(Et[0]);i.texStorage2D(s.TEXTURE_CUBE_MAP,zt,fe,ht.width,ht.height)}for(let ht=0;ht<6;ht++)if(Tt){q?At&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,0,0,Et[ht].width,Et[ht].height,Ot,It,Et[ht].data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,fe,Et[ht].width,Et[ht].height,0,Ot,It,Et[ht].data);for(let Vt=0;Vt<bt.length;Vt++){const ze=bt[Vt].image[ht].image;q?At&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Vt+1,0,0,ze.width,ze.height,Ot,It,ze.data):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Vt+1,fe,ze.width,ze.height,0,Ot,It,ze.data)}}else{q?At&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,0,0,Ot,It,Et[ht]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,fe,Ot,It,Et[ht]);for(let Vt=0;Vt<bt.length;Vt++){const ae=bt[Vt];q?At&&i.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Vt+1,0,0,Ot,It,ae.image[ht]):i.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Vt+1,fe,Ot,It,ae.image[ht])}}}S(b)&&_(s.TEXTURE_CUBE_MAP),dt.__version=Mt.version,b.onUpdate&&b.onUpdate(b)}z.__version=b.version}function St(z,b,Y,gt,Mt,dt){const qt=c.convert(Y.format,Y.colorSpace),wt=c.convert(Y.type),Jt=D(Y.internalFormat,qt,wt,Y.colorSpace),ne=r.get(b),Tt=r.get(Y);if(Tt.__renderTarget=b,!ne.__hasExternalTextures){const Et=Math.max(1,b.width>>dt),Pt=Math.max(1,b.height>>dt);Mt===s.TEXTURE_3D||Mt===s.TEXTURE_2D_ARRAY?i.texImage3D(Mt,dt,Jt,Et,Pt,b.depth,0,qt,wt,null):i.texImage2D(Mt,dt,Jt,Et,Pt,0,qt,wt,null)}i.bindFramebuffer(s.FRAMEBUFFER,z),je(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,gt,Mt,Tt.__webglTexture,0,V(b)):(Mt===s.TEXTURE_2D||Mt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Mt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,gt,Mt,Tt.__webglTexture,dt),i.bindFramebuffer(s.FRAMEBUFFER,null)}function Ut(z,b,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,z),b.depthBuffer){const gt=b.depthTexture,Mt=gt&&gt.isDepthTexture?gt.type:null,dt=L(b.stencilBuffer,Mt),qt=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;je(b)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,V(b),dt,b.width,b.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,V(b),dt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,dt,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,qt,s.RENDERBUFFER,z)}else{const gt=b.textures;for(let Mt=0;Mt<gt.length;Mt++){const dt=gt[Mt],qt=c.convert(dt.format,dt.colorSpace),wt=c.convert(dt.type),Jt=D(dt.internalFormat,qt,wt,dt.colorSpace);je(b)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,V(b),Jt,b.width,b.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,V(b),Jt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Jt,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Bt(z,b,Y){const gt=b.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(s.FRAMEBUFFER,z),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Mt=r.get(b.depthTexture);if(Mt.__renderTarget=b,(!Mt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),gt){if(Mt.__webglInit===void 0&&(Mt.__webglInit=!0,b.depthTexture.addEventListener("dispose",U)),Mt.__webglTexture===void 0){Mt.__webglTexture=s.createTexture(),i.bindTexture(s.TEXTURE_CUBE_MAP,Mt.__webglTexture),k(s.TEXTURE_CUBE_MAP,b.depthTexture);const ne=c.convert(b.depthTexture.format),Tt=c.convert(b.depthTexture.type);let Et;b.depthTexture.format===Ea?Et=s.DEPTH_COMPONENT24:b.depthTexture.format===Or&&(Et=s.DEPTH24_STENCIL8);for(let Pt=0;Pt<6;Pt++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,Et,b.width,b.height,0,ne,Tt,null)}}else Q(b.depthTexture,0);const dt=Mt.__webglTexture,qt=V(b),wt=gt?s.TEXTURE_CUBE_MAP_POSITIVE_X+Y:s.TEXTURE_2D,Jt=b.depthTexture.format===Or?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(b.depthTexture.format===Ea)je(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Jt,wt,dt,0,qt):s.framebufferTexture2D(s.FRAMEBUFFER,Jt,wt,dt,0);else if(b.depthTexture.format===Or)je(b)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Jt,wt,dt,0,qt):s.framebufferTexture2D(s.FRAMEBUFFER,Jt,wt,dt,0);else throw new Error("Unknown depthTexture format")}function Kt(z){const b=r.get(z),Y=z.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==z.depthTexture){const gt=z.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),gt){const Mt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,gt.removeEventListener("dispose",Mt)};gt.addEventListener("dispose",Mt),b.__depthDisposeCallback=Mt}b.__boundDepthTexture=gt}if(z.depthTexture&&!b.__autoAllocateDepthBuffer)if(Y)for(let gt=0;gt<6;gt++)Bt(b.__webglFramebuffer[gt],z,gt);else{const gt=z.texture.mipmaps;gt&&gt.length>0?Bt(b.__webglFramebuffer[0],z,0):Bt(b.__webglFramebuffer,z,0)}else if(Y){b.__webglDepthbuffer=[];for(let gt=0;gt<6;gt++)if(i.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[gt]),b.__webglDepthbuffer[gt]===void 0)b.__webglDepthbuffer[gt]=s.createRenderbuffer(),Ut(b.__webglDepthbuffer[gt],z,!1);else{const Mt=z.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=b.__webglDepthbuffer[gt];s.bindRenderbuffer(s.RENDERBUFFER,dt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Mt,s.RENDERBUFFER,dt)}}else{const gt=z.texture.mipmaps;if(gt&&gt.length>0?i.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):i.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),Ut(b.__webglDepthbuffer,z,!1);else{const Mt=z.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,dt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Mt,s.RENDERBUFFER,dt)}}i.bindFramebuffer(s.FRAMEBUFFER,null)}function He(z,b,Y){const gt=r.get(z);b!==void 0&&St(gt.__webglFramebuffer,z,z.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&Kt(z)}function ge(z){const b=z.texture,Y=r.get(z),gt=r.get(b);z.addEventListener("dispose",N);const Mt=z.textures,dt=z.isWebGLCubeRenderTarget===!0,qt=Mt.length>1;if(qt||(gt.__webglTexture===void 0&&(gt.__webglTexture=s.createTexture()),gt.__version=b.version,h.memory.textures++),dt){Y.__webglFramebuffer=[];for(let wt=0;wt<6;wt++)if(b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer[wt]=[];for(let Jt=0;Jt<b.mipmaps.length;Jt++)Y.__webglFramebuffer[wt][Jt]=s.createFramebuffer()}else Y.__webglFramebuffer[wt]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer=[];for(let wt=0;wt<b.mipmaps.length;wt++)Y.__webglFramebuffer[wt]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(qt)for(let wt=0,Jt=Mt.length;wt<Jt;wt++){const ne=r.get(Mt[wt]);ne.__webglTexture===void 0&&(ne.__webglTexture=s.createTexture(),h.memory.textures++)}if(z.samples>0&&je(z)===!1){Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],i.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let wt=0;wt<Mt.length;wt++){const Jt=Mt[wt];Y.__webglColorRenderbuffer[wt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[wt]);const ne=c.convert(Jt.format,Jt.colorSpace),Tt=c.convert(Jt.type),Et=D(Jt.internalFormat,ne,Tt,Jt.colorSpace,z.isXRRenderTarget===!0),Pt=V(z);s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,Et,z.width,z.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+wt,s.RENDERBUFFER,Y.__webglColorRenderbuffer[wt])}s.bindRenderbuffer(s.RENDERBUFFER,null),z.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),Ut(Y.__webglDepthRenderbuffer,z,!0)),i.bindFramebuffer(s.FRAMEBUFFER,null)}}if(dt){i.bindTexture(s.TEXTURE_CUBE_MAP,gt.__webglTexture),k(s.TEXTURE_CUBE_MAP,b);for(let wt=0;wt<6;wt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Jt=0;Jt<b.mipmaps.length;Jt++)St(Y.__webglFramebuffer[wt][Jt],z,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+wt,Jt);else St(Y.__webglFramebuffer[wt],z,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0);S(b)&&_(s.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(qt){for(let wt=0,Jt=Mt.length;wt<Jt;wt++){const ne=Mt[wt],Tt=r.get(ne);let Et=s.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Et=z.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(Et,Tt.__webglTexture),k(Et,ne),St(Y.__webglFramebuffer,z,ne,s.COLOR_ATTACHMENT0+wt,Et,0),S(ne)&&_(Et)}i.unbindTexture()}else{let wt=s.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(wt=z.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),i.bindTexture(wt,gt.__webglTexture),k(wt,b),b.mipmaps&&b.mipmaps.length>0)for(let Jt=0;Jt<b.mipmaps.length;Jt++)St(Y.__webglFramebuffer[Jt],z,b,s.COLOR_ATTACHMENT0,wt,Jt);else St(Y.__webglFramebuffer,z,b,s.COLOR_ATTACHMENT0,wt,0);S(b)&&_(wt),i.unbindTexture()}z.depthBuffer&&Kt(z)}function _e(z){const b=z.textures;for(let Y=0,gt=b.length;Y<gt;Y++){const Mt=b[Y];if(S(Mt)){const dt=R(z),qt=r.get(Mt).__webglTexture;i.bindTexture(dt,qt),_(dt),i.unbindTexture()}}}const Ne=[],ce=[];function $e(z){if(z.samples>0){if(je(z)===!1){const b=z.textures,Y=z.width,gt=z.height;let Mt=s.COLOR_BUFFER_BIT;const dt=z.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,qt=r.get(z),wt=b.length>1;if(wt)for(let ne=0;ne<b.length;ne++)i.bindFramebuffer(s.FRAMEBUFFER,qt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ne,s.RENDERBUFFER,null),i.bindFramebuffer(s.FRAMEBUFFER,qt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ne,s.TEXTURE_2D,null,0);i.bindFramebuffer(s.READ_FRAMEBUFFER,qt.__webglMultisampledFramebuffer);const Jt=z.texture.mipmaps;Jt&&Jt.length>0?i.bindFramebuffer(s.DRAW_FRAMEBUFFER,qt.__webglFramebuffer[0]):i.bindFramebuffer(s.DRAW_FRAMEBUFFER,qt.__webglFramebuffer);for(let ne=0;ne<b.length;ne++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(Mt|=s.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(Mt|=s.STENCIL_BUFFER_BIT)),wt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,qt.__webglColorRenderbuffer[ne]);const Tt=r.get(b[ne]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Tt,0)}s.blitFramebuffer(0,0,Y,gt,0,0,Y,gt,Mt,s.NEAREST),m===!0&&(Ne.length=0,ce.length=0,Ne.push(s.COLOR_ATTACHMENT0+ne),z.depthBuffer&&z.resolveDepthBuffer===!1&&(Ne.push(dt),ce.push(dt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ce)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ne))}if(i.bindFramebuffer(s.READ_FRAMEBUFFER,null),i.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),wt)for(let ne=0;ne<b.length;ne++){i.bindFramebuffer(s.FRAMEBUFFER,qt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ne,s.RENDERBUFFER,qt.__webglColorRenderbuffer[ne]);const Tt=r.get(b[ne]).__webglTexture;i.bindFramebuffer(s.FRAMEBUFFER,qt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ne,s.TEXTURE_2D,Tt,0)}i.bindFramebuffer(s.DRAW_FRAMEBUFFER,qt.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.resolveDepthBuffer===!1&&m){const b=z.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function V(z){return Math.min(l.maxSamples,z.samples)}function je(z){const b=r.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function be(z){const b=h.render.frame;v.get(z)!==b&&(v.set(z,b),z.update())}function Pe(z,b){const Y=z.colorSpace,gt=z.format,Mt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||Y!==Gs&&Y!==nr&&(Re.getTransfer(Y)===Ge?(gt!==Li||Mt!==ci)&&re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",Y)),b}function jt(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(p.width=z.naturalWidth||z.width,p.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(p.width=z.displayWidth,p.height=z.displayHeight):(p.width=z.width,p.height=z.height),p}this.allocateTextureUnit=nt,this.resetTextureUnits=Z,this.setTexture2D=Q,this.setTexture2DArray=I,this.setTexture3D=F,this.setTextureCube=rt,this.rebindTextures=He,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=_e,this.updateMultisampleRenderTarget=$e,this.setupDepthRenderbuffer=Kt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function TA(s,t){function i(r,l=nr){let c;const h=Re.getTransfer(l);if(r===ci)return s.UNSIGNED_BYTE;if(r===rp)return s.UNSIGNED_SHORT_4_4_4_4;if(r===sp)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Dv)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===Uv)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===Cv)return s.BYTE;if(r===wv)return s.SHORT;if(r===Zo)return s.UNSIGNED_SHORT;if(r===ap)return s.INT;if(r===ji)return s.UNSIGNED_INT;if(r===Xi)return s.FLOAT;if(r===ya)return s.HALF_FLOAT;if(r===Lv)return s.ALPHA;if(r===Nv)return s.RGB;if(r===Li)return s.RGBA;if(r===Ea)return s.DEPTH_COMPONENT;if(r===Or)return s.DEPTH_STENCIL;if(r===Ov)return s.RED;if(r===op)return s.RED_INTEGER;if(r===Bs)return s.RG;if(r===lp)return s.RG_INTEGER;if(r===cp)return s.RGBA_INTEGER;if(r===Yc||r===jc||r===Zc||r===Kc)if(h===Ge)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(r===Yc)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===jc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Zc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Kc)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(r===Yc)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===jc)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Zc)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Kc)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===_d||r===vd||r===xd||r===Sd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(r===_d)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===vd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===xd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Sd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Md||r===yd||r===Ed||r===bd||r===Td||r===Ad||r===Rd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(r===Md||r===yd)return h===Ge?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(r===Ed)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(r===bd)return c.COMPRESSED_R11_EAC;if(r===Td)return c.COMPRESSED_SIGNED_R11_EAC;if(r===Ad)return c.COMPRESSED_RG11_EAC;if(r===Rd)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Cd||r===wd||r===Dd||r===Ud||r===Ld||r===Nd||r===Od||r===Pd||r===Id||r===zd||r===Fd||r===Bd||r===Gd||r===Hd)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(r===Cd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===wd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Dd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ud)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ld)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Nd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Od)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Pd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Id)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===zd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Fd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Bd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Gd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Hd)return h===Ge?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Vd||r===Xd||r===kd)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(r===Vd)return h===Ge?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Xd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===kd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Wd||r===qd||r===Yd||r===jd)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(r===Wd)return c.COMPRESSED_RED_RGTC1_EXT;if(r===qd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Yd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===jd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ko?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:i}}const AA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,RA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class CA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,i){if(this.texture===null){const r=new Wv(t.texture);(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const i=t.cameras[0].viewport,r=new Vn({vertexShader:AA,fragmentShader:RA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Hn(new ou(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wA extends Vs{constructor(t,i){super();const r=this;let l=null,c=1,h=null,d="local-floor",m=1,p=null,v=null,x=null,g=null,y=null,E=null;const A=typeof XRWebGLBinding<"u",S=new CA,_={},R=i.getContextAttributes();let D=null,L=null;const B=[],U=[],N=new Le;let T=null;const O=new li;O.viewport=new nn;const ft=new li;ft.viewport=new nn;const G=[O,ft],Z=new Hy;let nt=null,ut=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let pt=B[K];return pt===void 0&&(pt=new Uh,B[K]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(K){let pt=B[K];return pt===void 0&&(pt=new Uh,B[K]=pt),pt.getGripSpace()},this.getHand=function(K){let pt=B[K];return pt===void 0&&(pt=new Uh,B[K]=pt),pt.getHandSpace()};function Q(K){const pt=U.indexOf(K.inputSource);if(pt===-1)return;const St=B[pt];St!==void 0&&(St.update(K.inputSource,K.frame,p||h),St.dispatchEvent({type:K.type,data:K.inputSource}))}function I(){l.removeEventListener("select",Q),l.removeEventListener("selectstart",Q),l.removeEventListener("selectend",Q),l.removeEventListener("squeeze",Q),l.removeEventListener("squeezestart",Q),l.removeEventListener("squeezeend",Q),l.removeEventListener("end",I),l.removeEventListener("inputsourceschange",F);for(let K=0;K<B.length;K++){const pt=U[K];pt!==null&&(U[K]=null,B[K].disconnect(pt))}nt=null,ut=null,S.reset();for(const K in _)delete _[K];t.setRenderTarget(D),y=null,g=null,x=null,l=null,L=null,Rt.stop(),r.isPresenting=!1,t.setPixelRatio(T),t.setSize(N.width,N.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){c=K,r.isPresenting===!0&&re("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){d=K,r.isPresenting===!0&&re("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(K){p=K},this.getBaseLayer=function(){return g!==null?g:y},this.getBinding=function(){return x===null&&A&&(x=new XRWebGLBinding(l,i)),x},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(K){if(l=K,l!==null){if(D=t.getRenderTarget(),l.addEventListener("select",Q),l.addEventListener("selectstart",Q),l.addEventListener("selectend",Q),l.addEventListener("squeeze",Q),l.addEventListener("squeezestart",Q),l.addEventListener("squeezeend",Q),l.addEventListener("end",I),l.addEventListener("inputsourceschange",F),R.xrCompatible!==!0&&await i.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(N),A&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,Ut=null,Bt=null;R.depth&&(Bt=R.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,St=R.stencil?Or:Ea,Ut=R.stencil?Ko:ji);const Kt={colorFormat:i.RGBA8,depthFormat:Bt,scaleFactor:c};x=this.getBinding(),g=x.createProjectionLayer(Kt),l.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),L=new qi(g.textureWidth,g.textureHeight,{format:Li,type:ci,depthTexture:new Jo(g.textureWidth,g.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:R.stencil,colorSpace:t.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const St={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:c};y=new XRWebGLLayer(l,i,St),l.updateRenderState({baseLayer:y}),t.setPixelRatio(1),t.setSize(y.framebufferWidth,y.framebufferHeight,!1),L=new qi(y.framebufferWidth,y.framebufferHeight,{format:Li,type:ci,colorSpace:t.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),Rt.setContext(l),Rt.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function F(K){for(let pt=0;pt<K.removed.length;pt++){const St=K.removed[pt],Ut=U.indexOf(St);Ut>=0&&(U[Ut]=null,B[Ut].disconnect(St))}for(let pt=0;pt<K.added.length;pt++){const St=K.added[pt];let Ut=U.indexOf(St);if(Ut===-1){for(let Kt=0;Kt<B.length;Kt++)if(Kt>=U.length){U.push(St),Ut=Kt;break}else if(U[Kt]===null){U[Kt]=St,Ut=Kt;break}if(Ut===-1)break}const Bt=B[Ut];Bt&&Bt.connect(St)}}const rt=new $,ot=new $;function vt(K,pt,St){rt.setFromMatrixPosition(pt.matrixWorld),ot.setFromMatrixPosition(St.matrixWorld);const Ut=rt.distanceTo(ot),Bt=pt.projectionMatrix.elements,Kt=St.projectionMatrix.elements,He=Bt[14]/(Bt[10]-1),ge=Bt[14]/(Bt[10]+1),_e=(Bt[9]+1)/Bt[5],Ne=(Bt[9]-1)/Bt[5],ce=(Bt[8]-1)/Bt[0],$e=(Kt[8]+1)/Kt[0],V=He*ce,je=He*$e,be=Ut/(-ce+$e),Pe=be*-ce;if(pt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Pe),K.translateZ(be),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Bt[10]===-1)K.projectionMatrix.copy(pt.projectionMatrix),K.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const jt=He+be,z=ge+be,b=V-Pe,Y=je+(Ut-Pe),gt=_e*ge/z*jt,Mt=Ne*ge/z*jt;K.projectionMatrix.makePerspective(b,Y,gt,Mt,jt,z),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function P(K,pt){pt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(pt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(l===null)return;let pt=K.near,St=K.far;S.texture!==null&&(S.depthNear>0&&(pt=S.depthNear),S.depthFar>0&&(St=S.depthFar)),Z.near=ft.near=O.near=pt,Z.far=ft.far=O.far=St,(nt!==Z.near||ut!==Z.far)&&(l.updateRenderState({depthNear:Z.near,depthFar:Z.far}),nt=Z.near,ut=Z.far),Z.layers.mask=K.layers.mask|6,O.layers.mask=Z.layers.mask&-5,ft.layers.mask=Z.layers.mask&-3;const Ut=K.parent,Bt=Z.cameras;P(Z,Ut);for(let Kt=0;Kt<Bt.length;Kt++)P(Bt[Kt],Ut);Bt.length===2?vt(Z,O,ft):Z.projectionMatrix.copy(O.projectionMatrix),k(K,Z,Ut)};function k(K,pt,St){St===null?K.matrix.copy(pt.matrixWorld):(K.matrix.copy(St.matrixWorld),K.matrix.invert(),K.matrix.multiply(pt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(pt.projectionMatrix),K.projectionMatrixInverse.copy(pt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Zd*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(g===null&&y===null))return m},this.setFoveation=function(K){m=K,g!==null&&(g.fixedFoveation=K),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=K)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(Z)},this.getCameraTexture=function(K){return _[K]};let ct=null;function yt(K,pt){if(v=pt.getViewerPose(p||h),E=pt,v!==null){const St=v.views;y!==null&&(t.setRenderTargetFramebuffer(L,y.framebuffer),t.setRenderTarget(L));let Ut=!1;St.length!==Z.cameras.length&&(Z.cameras.length=0,Ut=!0);for(let ge=0;ge<St.length;ge++){const _e=St[ge];let Ne=null;if(y!==null)Ne=y.getViewport(_e);else{const $e=x.getViewSubImage(g,_e);Ne=$e.viewport,ge===0&&(t.setRenderTargetTextures(L,$e.colorTexture,$e.depthStencilTexture),t.setRenderTarget(L))}let ce=G[ge];ce===void 0&&(ce=new li,ce.layers.enable(ge),ce.viewport=new nn,G[ge]=ce),ce.matrix.fromArray(_e.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(_e.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),ge===0&&(Z.matrix.copy(ce.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Ut===!0&&Z.cameras.push(ce)}const Bt=l.enabledFeatures;if(Bt&&Bt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&A){x=r.getBinding();const ge=x.getDepthInformation(St[0]);ge&&ge.isValid&&ge.texture&&S.init(ge,l.renderState)}if(Bt&&Bt.includes("camera-access")&&A){t.state.unbindTexture(),x=r.getBinding();for(let ge=0;ge<St.length;ge++){const _e=St[ge].camera;if(_e){let Ne=_[_e];Ne||(Ne=new Wv,_[_e]=Ne);const ce=x.getCameraImage(_e);Ne.sourceTexture=ce}}}}for(let St=0;St<B.length;St++){const Ut=U[St],Bt=B[St];Ut!==null&&Bt!==void 0&&Bt.update(Ut,pt,p||h)}ct&&ct(K,pt),pt.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:pt}),E=null}const Rt=new Kv;Rt.setAnimationLoop(yt),this.setAnimationLoop=function(K){ct=K},this.dispose=function(){}}}const wr=new Ni,DA=new Je;function UA(s,t){function i(S,_){S.matrixAutoUpdate===!0&&S.updateMatrix(),_.value.copy(S.matrix)}function r(S,_){_.color.getRGB(S.fogColor.value,qv(s)),_.isFog?(S.fogNear.value=_.near,S.fogFar.value=_.far):_.isFogExp2&&(S.fogDensity.value=_.density)}function l(S,_,R,D,L){_.isMeshBasicMaterial?c(S,_):_.isMeshLambertMaterial?(c(S,_),_.envMap&&(S.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(c(S,_),x(S,_)):_.isMeshPhongMaterial?(c(S,_),v(S,_),_.envMap&&(S.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(c(S,_),g(S,_),_.isMeshPhysicalMaterial&&y(S,_,L)):_.isMeshMatcapMaterial?(c(S,_),E(S,_)):_.isMeshDepthMaterial?c(S,_):_.isMeshDistanceMaterial?(c(S,_),A(S,_)):_.isMeshNormalMaterial?c(S,_):_.isLineBasicMaterial?(h(S,_),_.isLineDashedMaterial&&d(S,_)):_.isPointsMaterial?m(S,_,R,D):_.isSpriteMaterial?p(S,_):_.isShadowMaterial?(S.color.value.copy(_.color),S.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function c(S,_){S.opacity.value=_.opacity,_.color&&S.diffuse.value.copy(_.color),_.emissive&&S.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(S.map.value=_.map,i(_.map,S.mapTransform)),_.alphaMap&&(S.alphaMap.value=_.alphaMap,i(_.alphaMap,S.alphaMapTransform)),_.bumpMap&&(S.bumpMap.value=_.bumpMap,i(_.bumpMap,S.bumpMapTransform),S.bumpScale.value=_.bumpScale,_.side===Kn&&(S.bumpScale.value*=-1)),_.normalMap&&(S.normalMap.value=_.normalMap,i(_.normalMap,S.normalMapTransform),S.normalScale.value.copy(_.normalScale),_.side===Kn&&S.normalScale.value.negate()),_.displacementMap&&(S.displacementMap.value=_.displacementMap,i(_.displacementMap,S.displacementMapTransform),S.displacementScale.value=_.displacementScale,S.displacementBias.value=_.displacementBias),_.emissiveMap&&(S.emissiveMap.value=_.emissiveMap,i(_.emissiveMap,S.emissiveMapTransform)),_.specularMap&&(S.specularMap.value=_.specularMap,i(_.specularMap,S.specularMapTransform)),_.alphaTest>0&&(S.alphaTest.value=_.alphaTest);const R=t.get(_),D=R.envMap,L=R.envMapRotation;D&&(S.envMap.value=D,wr.copy(L),wr.x*=-1,wr.y*=-1,wr.z*=-1,D.isCubeTexture&&D.isRenderTargetTexture===!1&&(wr.y*=-1,wr.z*=-1),S.envMapRotation.value.setFromMatrix4(DA.makeRotationFromEuler(wr)),S.flipEnvMap.value=D.isCubeTexture&&D.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=_.reflectivity,S.ior.value=_.ior,S.refractionRatio.value=_.refractionRatio),_.lightMap&&(S.lightMap.value=_.lightMap,S.lightMapIntensity.value=_.lightMapIntensity,i(_.lightMap,S.lightMapTransform)),_.aoMap&&(S.aoMap.value=_.aoMap,S.aoMapIntensity.value=_.aoMapIntensity,i(_.aoMap,S.aoMapTransform))}function h(S,_){S.diffuse.value.copy(_.color),S.opacity.value=_.opacity,_.map&&(S.map.value=_.map,i(_.map,S.mapTransform))}function d(S,_){S.dashSize.value=_.dashSize,S.totalSize.value=_.dashSize+_.gapSize,S.scale.value=_.scale}function m(S,_,R,D){S.diffuse.value.copy(_.color),S.opacity.value=_.opacity,S.size.value=_.size*R,S.scale.value=D*.5,_.map&&(S.map.value=_.map,i(_.map,S.uvTransform)),_.alphaMap&&(S.alphaMap.value=_.alphaMap,i(_.alphaMap,S.alphaMapTransform)),_.alphaTest>0&&(S.alphaTest.value=_.alphaTest)}function p(S,_){S.diffuse.value.copy(_.color),S.opacity.value=_.opacity,S.rotation.value=_.rotation,_.map&&(S.map.value=_.map,i(_.map,S.mapTransform)),_.alphaMap&&(S.alphaMap.value=_.alphaMap,i(_.alphaMap,S.alphaMapTransform)),_.alphaTest>0&&(S.alphaTest.value=_.alphaTest)}function v(S,_){S.specular.value.copy(_.specular),S.shininess.value=Math.max(_.shininess,1e-4)}function x(S,_){_.gradientMap&&(S.gradientMap.value=_.gradientMap)}function g(S,_){S.metalness.value=_.metalness,_.metalnessMap&&(S.metalnessMap.value=_.metalnessMap,i(_.metalnessMap,S.metalnessMapTransform)),S.roughness.value=_.roughness,_.roughnessMap&&(S.roughnessMap.value=_.roughnessMap,i(_.roughnessMap,S.roughnessMapTransform)),_.envMap&&(S.envMapIntensity.value=_.envMapIntensity)}function y(S,_,R){S.ior.value=_.ior,_.sheen>0&&(S.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),S.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(S.sheenColorMap.value=_.sheenColorMap,i(_.sheenColorMap,S.sheenColorMapTransform)),_.sheenRoughnessMap&&(S.sheenRoughnessMap.value=_.sheenRoughnessMap,i(_.sheenRoughnessMap,S.sheenRoughnessMapTransform))),_.clearcoat>0&&(S.clearcoat.value=_.clearcoat,S.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(S.clearcoatMap.value=_.clearcoatMap,i(_.clearcoatMap,S.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,i(_.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(S.clearcoatNormalMap.value=_.clearcoatNormalMap,i(_.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Kn&&S.clearcoatNormalScale.value.negate())),_.dispersion>0&&(S.dispersion.value=_.dispersion),_.iridescence>0&&(S.iridescence.value=_.iridescence,S.iridescenceIOR.value=_.iridescenceIOR,S.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(S.iridescenceMap.value=_.iridescenceMap,i(_.iridescenceMap,S.iridescenceMapTransform)),_.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=_.iridescenceThicknessMap,i(_.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),_.transmission>0&&(S.transmission.value=_.transmission,S.transmissionSamplerMap.value=R.texture,S.transmissionSamplerSize.value.set(R.width,R.height),_.transmissionMap&&(S.transmissionMap.value=_.transmissionMap,i(_.transmissionMap,S.transmissionMapTransform)),S.thickness.value=_.thickness,_.thicknessMap&&(S.thicknessMap.value=_.thicknessMap,i(_.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=_.attenuationDistance,S.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(S.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(S.anisotropyMap.value=_.anisotropyMap,i(_.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=_.specularIntensity,S.specularColor.value.copy(_.specularColor),_.specularColorMap&&(S.specularColorMap.value=_.specularColorMap,i(_.specularColorMap,S.specularColorMapTransform)),_.specularIntensityMap&&(S.specularIntensityMap.value=_.specularIntensityMap,i(_.specularIntensityMap,S.specularIntensityMapTransform))}function E(S,_){_.matcap&&(S.matcap.value=_.matcap)}function A(S,_){const R=t.get(_).light;S.referencePosition.value.setFromMatrixPosition(R.matrixWorld),S.nearDistance.value=R.shadow.camera.near,S.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:l}}function LA(s,t,i,r){let l={},c={},h=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function m(R,D){const L=D.program;r.uniformBlockBinding(R,L)}function p(R,D){let L=l[R.id];L===void 0&&(E(R),L=v(R),l[R.id]=L,R.addEventListener("dispose",S));const B=D.program;r.updateUBOMapping(R,B);const U=t.render.frame;c[R.id]!==U&&(g(R),c[R.id]=U)}function v(R){const D=x();R.__bindingPointIndex=D;const L=s.createBuffer(),B=R.__size,U=R.usage;return s.bindBuffer(s.UNIFORM_BUFFER,L),s.bufferData(s.UNIFORM_BUFFER,B,U),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,D,L),L}function x(){for(let R=0;R<d;R++)if(h.indexOf(R)===-1)return h.push(R),R;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(R){const D=l[R.id],L=R.uniforms,B=R.__cache;s.bindBuffer(s.UNIFORM_BUFFER,D);for(let U=0,N=L.length;U<N;U++){const T=Array.isArray(L[U])?L[U]:[L[U]];for(let O=0,ft=T.length;O<ft;O++){const G=T[O];if(y(G,U,O,B)===!0){const Z=G.__offset,nt=Array.isArray(G.value)?G.value:[G.value];let ut=0;for(let Q=0;Q<nt.length;Q++){const I=nt[Q],F=A(I);typeof I=="number"||typeof I=="boolean"?(G.__data[0]=I,s.bufferSubData(s.UNIFORM_BUFFER,Z+ut,G.__data)):I.isMatrix3?(G.__data[0]=I.elements[0],G.__data[1]=I.elements[1],G.__data[2]=I.elements[2],G.__data[3]=0,G.__data[4]=I.elements[3],G.__data[5]=I.elements[4],G.__data[6]=I.elements[5],G.__data[7]=0,G.__data[8]=I.elements[6],G.__data[9]=I.elements[7],G.__data[10]=I.elements[8],G.__data[11]=0):(I.toArray(G.__data,ut),ut+=F.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,Z,G.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function y(R,D,L,B){const U=R.value,N=D+"_"+L;if(B[N]===void 0)return typeof U=="number"||typeof U=="boolean"?B[N]=U:B[N]=U.clone(),!0;{const T=B[N];if(typeof U=="number"||typeof U=="boolean"){if(T!==U)return B[N]=U,!0}else if(T.equals(U)===!1)return T.copy(U),!0}return!1}function E(R){const D=R.uniforms;let L=0;const B=16;for(let N=0,T=D.length;N<T;N++){const O=Array.isArray(D[N])?D[N]:[D[N]];for(let ft=0,G=O.length;ft<G;ft++){const Z=O[ft],nt=Array.isArray(Z.value)?Z.value:[Z.value];for(let ut=0,Q=nt.length;ut<Q;ut++){const I=nt[ut],F=A(I),rt=L%B,ot=rt%F.boundary,vt=rt+ot;L+=ot,vt!==0&&B-vt<F.storage&&(L+=B-vt),Z.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=L,L+=F.storage}}}const U=L%B;return U>0&&(L+=B-U),R.__size=L,R.__cache={},this}function A(R){const D={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(D.boundary=4,D.storage=4):R.isVector2?(D.boundary=8,D.storage=8):R.isVector3||R.isColor?(D.boundary=16,D.storage=12):R.isVector4?(D.boundary=16,D.storage=16):R.isMatrix3?(D.boundary=48,D.storage=48):R.isMatrix4?(D.boundary=64,D.storage=64):R.isTexture?re("WebGLRenderer: Texture samplers can not be part of an uniforms group."):re("WebGLRenderer: Unsupported uniform value type.",R),D}function S(R){const D=R.target;D.removeEventListener("dispose",S);const L=h.indexOf(D.__bindingPointIndex);h.splice(L,1),s.deleteBuffer(l[D.id]),delete l[D.id],delete c[D.id]}function _(){for(const R in l)s.deleteBuffer(l[R]);h=[],l={},c={}}return{bind:m,update:p,dispose:_}}const NA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Gi=null;function OA(){return Gi===null&&(Gi=new My(NA,16,16,Bs,ya),Gi.name="DFG_LUT",Gi.minFilter=Ln,Gi.magFilter=Ln,Gi.wrapS=xa,Gi.wrapT=xa,Gi.generateMipmaps=!1,Gi.needsUpdate=!0),Gi}class PA{constructor(t={}){const{canvas:i=JM(),context:r=null,depth:l=!0,stencil:c=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:g=!1,outputBufferType:y=ci}=t;this.isWebGLRenderer=!0;let E;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=r.getContextAttributes().alpha}else E=h;const A=y,S=new Set([cp,lp,op]),_=new Set([ci,ji,Zo,Ko,rp,sp]),R=new Uint32Array(4),D=new Int32Array(4);let L=null,B=null;const U=[],N=[];let T=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const O=this;let ft=!1;this._outputColorSpace=xi;let G=0,Z=0,nt=null,ut=-1,Q=null;const I=new nn,F=new nn;let rt=null;const ot=new Ft(0);let vt=0,P=i.width,k=i.height,ct=1,yt=null,Rt=null;const K=new nn(0,0,P,k),pt=new nn(0,0,P,k);let St=!1;const Ut=new pp;let Bt=!1,Kt=!1;const He=new Je,ge=new $,_e=new nn,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function $e(){return nt===null?ct:1}let V=r;function je(w,W){return i.getContext(w,W)}try{const w={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:x};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${ip}`),i.addEventListener("webglcontextlost",Vt,!1),i.addEventListener("webglcontextrestored",ae,!1),i.addEventListener("webglcontextcreationerror",ze,!1),V===null){const W="webgl2";if(V=je(W,w),V===null)throw je(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw Ue("WebGLRenderer: "+w.message),w}let be,Pe,jt,z,b,Y,gt,Mt,dt,qt,wt,Jt,ne,Tt,Et,Pt,Ot,It,fe,q,Ct,At,zt;function bt(){be=new P1(V),be.init(),Ct=new TA(V,be),Pe=new R1(V,be,t,Ct),jt=new EA(V,be),Pe.reversedDepthBuffer&&g&&jt.buffers.depth.setReversed(!0),z=new F1(V),b=new cA,Y=new bA(V,be,jt,b,Pe,Ct,z),gt=new O1(O),Mt=new Xy(V),At=new T1(V,Mt),dt=new I1(V,Mt,z,At),qt=new G1(V,dt,Mt,At,z),It=new B1(V,Pe,Y),Et=new C1(b),wt=new lA(O,gt,be,Pe,At,Et),Jt=new UA(O,b),ne=new fA,Tt=new _A(be),Ot=new b1(O,gt,jt,qt,E,m),Pt=new yA(O,qt,Pe),zt=new LA(V,z,Pe,jt),fe=new A1(V,be,z),q=new z1(V,be,z),z.programs=wt.programs,O.capabilities=Pe,O.extensions=be,O.properties=b,O.renderLists=ne,O.shadowMap=Pt,O.state=jt,O.info=z}bt(),A!==ci&&(T=new V1(A,i.width,i.height,l,c));const ht=new wA(O,V);this.xr=ht,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const w=be.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=be.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ct},this.setPixelRatio=function(w){w!==void 0&&(ct=w,this.setSize(P,k,!1))},this.getSize=function(w){return w.set(P,k)},this.setSize=function(w,W,st=!0){if(ht.isPresenting){re("WebGLRenderer: Can't change size while VR device is presenting.");return}P=w,k=W,i.width=Math.floor(w*ct),i.height=Math.floor(W*ct),st===!0&&(i.style.width=w+"px",i.style.height=W+"px"),T!==null&&T.setSize(i.width,i.height),this.setViewport(0,0,w,W)},this.getDrawingBufferSize=function(w){return w.set(P*ct,k*ct).floor()},this.setDrawingBufferSize=function(w,W,st){P=w,k=W,ct=st,i.width=Math.floor(w*st),i.height=Math.floor(W*st),this.setViewport(0,0,w,W)},this.setEffects=function(w){if(A===ci){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let W=0;W<w.length;W++)if(w[W].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(K)},this.setViewport=function(w,W,st,it){w.isVector4?K.set(w.x,w.y,w.z,w.w):K.set(w,W,st,it),jt.viewport(I.copy(K).multiplyScalar(ct).round())},this.getScissor=function(w){return w.copy(pt)},this.setScissor=function(w,W,st,it){w.isVector4?pt.set(w.x,w.y,w.z,w.w):pt.set(w,W,st,it),jt.scissor(F.copy(pt).multiplyScalar(ct).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(w){jt.setScissorTest(St=w)},this.setOpaqueSort=function(w){yt=w},this.setTransparentSort=function(w){Rt=w},this.getClearColor=function(w){return w.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor(...arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha(...arguments)},this.clear=function(w=!0,W=!0,st=!0){let it=0;if(w){let J=!1;if(nt!==null){const Dt=nt.texture.format;J=S.has(Dt)}if(J){const Dt=nt.texture.type,Gt=_.has(Dt),Lt=Ot.getClearColor(),Yt=Ot.getClearAlpha(),Qt=Lt.r,ie=Lt.g,oe=Lt.b;Gt?(R[0]=Qt,R[1]=ie,R[2]=oe,R[3]=Yt,V.clearBufferuiv(V.COLOR,0,R)):(D[0]=Qt,D[1]=ie,D[2]=oe,D[3]=Yt,V.clearBufferiv(V.COLOR,0,D))}else it|=V.COLOR_BUFFER_BIT}W&&(it|=V.DEPTH_BUFFER_BIT),st&&(it|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),it!==0&&V.clear(it)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Vt,!1),i.removeEventListener("webglcontextrestored",ae,!1),i.removeEventListener("webglcontextcreationerror",ze,!1),Ot.dispose(),ne.dispose(),Tt.dispose(),b.dispose(),gt.dispose(),qt.dispose(),At.dispose(),zt.dispose(),wt.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",Gr),ht.removeEventListener("sessionend",Hr),Oi.stop()};function Vt(w){w.preventDefault(),h_("WebGLRenderer: Context Lost."),ft=!0}function ae(){h_("WebGLRenderer: Context Restored."),ft=!1;const w=z.autoReset,W=Pt.enabled,st=Pt.autoUpdate,it=Pt.needsUpdate,J=Pt.type;bt(),z.autoReset=w,Pt.enabled=W,Pt.autoUpdate=st,Pt.needsUpdate=it,Pt.type=J}function ze(w){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Te(w){const W=w.target;W.removeEventListener("dispose",Te),On(W)}function On(w){Mi(w),b.remove(w)}function Mi(w){const W=b.get(w).programs;W!==void 0&&(W.forEach(function(st){wt.releaseProgram(st)}),w.isShaderMaterial&&wt.releaseShaderCache(w))}this.renderBufferDirect=function(w,W,st,it,J,Dt){W===null&&(W=Ne);const Gt=J.isMesh&&J.matrixWorld.determinant()<0,Lt=ol(w,W,st,it,J);jt.setMaterial(it,Gt);let Yt=st.index,Qt=1;if(it.wireframe===!0){if(Yt=dt.getWireframeAttribute(st),Yt===void 0)return;Qt=2}const ie=st.drawRange,oe=st.attributes.position;let Xt=ie.start*Qt,he=(ie.start+ie.count)*Qt;Dt!==null&&(Xt=Math.max(Xt,Dt.start*Qt),he=Math.min(he,(Dt.start+Dt.count)*Qt)),Yt!==null?(Xt=Math.max(Xt,0),he=Math.min(he,Yt.count)):oe!=null&&(Xt=Math.max(Xt,0),he=Math.min(he,oe.count));const Ze=he-Xt;if(Ze<0||Ze===1/0)return;At.setup(J,it,Lt,st,Yt);let Ke,Ce=fe;if(Yt!==null&&(Ke=Mt.get(Yt),Ce=q,Ce.setIndex(Ke)),J.isMesh)it.wireframe===!0?(jt.setLineWidth(it.wireframeLinewidth*$e()),Ce.setMode(V.LINES)):Ce.setMode(V.TRIANGLES);else if(J.isLine){let mn=it.linewidth;mn===void 0&&(mn=1),jt.setLineWidth(mn*$e()),J.isLineSegments?Ce.setMode(V.LINES):J.isLineLoop?Ce.setMode(V.LINE_LOOP):Ce.setMode(V.LINE_STRIP)}else J.isPoints?Ce.setMode(V.POINTS):J.isSprite&&Ce.setMode(V.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)tu("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ce.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(be.get("WEBGL_multi_draw"))Ce.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const mn=J._multiDrawStarts,Wt=J._multiDrawCounts,Pn=J._multiDrawCount,se=Yt?Mt.get(Yt).bytesPerElement:1,In=b.get(it).currentProgram.getUniforms();for(let Qn=0;Qn<Pn;Qn++)In.setValue(V,"_gl_DrawID",Qn),Ce.render(mn[Qn]/se,Wt[Qn])}else if(J.isInstancedMesh)Ce.renderInstances(Xt,Ze,J.count);else if(st.isInstancedBufferGeometry){const mn=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,Wt=Math.min(st.instanceCount,mn);Ce.renderInstances(Xt,Ze,Wt)}else Ce.render(Xt,Ze)};function Ws(w,W,st){w.transparent===!0&&w.side===Vi&&w.forceSinglePass===!1?(w.side=Kn,w.needsUpdate=!0,ba(w,W,st),w.side=rr,w.needsUpdate=!0,ba(w,W,st),w.side=Vi):ba(w,W,st)}this.compile=function(w,W,st=null){st===null&&(st=w),B=Tt.get(st),B.init(W),N.push(B),st.traverseVisible(function(J){J.isLight&&J.layers.test(W.layers)&&(B.pushLight(J),J.castShadow&&B.pushShadow(J))}),w!==st&&w.traverseVisible(function(J){J.isLight&&J.layers.test(W.layers)&&(B.pushLight(J),J.castShadow&&B.pushShadow(J))}),B.setupLights();const it=new Set;return w.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const Dt=J.material;if(Dt)if(Array.isArray(Dt))for(let Gt=0;Gt<Dt.length;Gt++){const Lt=Dt[Gt];Ws(Lt,st,J),it.add(Lt)}else Ws(Dt,st,J),it.add(Dt)}),B=N.pop(),it},this.compileAsync=function(w,W,st=null){const it=this.compile(w,W,st);return new Promise(J=>{function Dt(){if(it.forEach(function(Gt){b.get(Gt).currentProgram.isReady()&&it.delete(Gt)}),it.size===0){J(w);return}setTimeout(Dt,10)}be.get("KHR_parallel_shader_compile")!==null?Dt():setTimeout(Dt,10)})};let Br=null;function al(w){Br&&Br(w)}function Gr(){Oi.stop()}function Hr(){Oi.start()}const Oi=new Kv;Oi.setAnimationLoop(al),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(w){Br=w,ht.setAnimationLoop(w),w===null?Oi.stop():Oi.start()},ht.addEventListener("sessionstart",Gr),ht.addEventListener("sessionend",Hr),this.render=function(w,W){if(W!==void 0&&W.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(ft===!0)return;const st=ht.enabled===!0&&ht.isPresenting===!0,it=T!==null&&(nt===null||st)&&T.begin(O,nt);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(W),W=ht.getCamera()),w.isScene===!0&&w.onBeforeRender(O,w,W,nt),B=Tt.get(w,N.length),B.init(W),N.push(B),He.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),Ut.setFromProjectionMatrix(He,ki,W.reversedDepth),Kt=this.localClippingEnabled,Bt=Et.init(this.clippingPlanes,Kt),L=ne.get(w,U.length),L.init(),U.push(L),ht.enabled===!0&&ht.isPresenting===!0){const Gt=O.xr.getDepthSensingMesh();Gt!==null&&Vr(Gt,W,-1/0,O.sortObjects)}Vr(w,W,0,O.sortObjects),L.finish(),O.sortObjects===!0&&L.sort(yt,Rt),ce=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,ce&&Ot.addToRenderList(L,w),this.info.render.frame++,Bt===!0&&Et.beginShadows();const J=B.state.shadowsArray;if(Pt.render(J,w,W),Bt===!0&&Et.endShadows(),this.info.autoReset===!0&&this.info.reset(),(it&&T.hasRenderPass())===!1){const Gt=L.opaque,Lt=L.transmissive;if(B.setupLights(),W.isArrayCamera){const Yt=W.cameras;if(Lt.length>0)for(let Qt=0,ie=Yt.length;Qt<ie;Qt++){const oe=Yt[Qt];sn(Gt,Lt,w,oe)}ce&&Ot.render(w);for(let Qt=0,ie=Yt.length;Qt<ie;Qt++){const oe=Yt[Qt];yi(L,w,oe,oe.viewport)}}else Lt.length>0&&sn(Gt,Lt,w,W),ce&&Ot.render(w),yi(L,w,W)}nt!==null&&Z===0&&(Y.updateMultisampleRenderTarget(nt),Y.updateRenderTargetMipmap(nt)),it&&T.end(O),w.isScene===!0&&w.onAfterRender(O,w,W),At.resetDefaultState(),ut=-1,Q=null,N.pop(),N.length>0?(B=N[N.length-1],Bt===!0&&Et.setGlobalState(O.clippingPlanes,B.state.camera)):B=null,U.pop(),U.length>0?L=U[U.length-1]:L=null};function Vr(w,W,st,it){if(w.visible===!1)return;if(w.layers.test(W.layers)){if(w.isGroup)st=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(W);else if(w.isLight)B.pushLight(w),w.castShadow&&B.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ut.intersectsSprite(w)){it&&_e.setFromMatrixPosition(w.matrixWorld).applyMatrix4(He);const Gt=qt.update(w),Lt=w.material;Lt.visible&&L.push(w,Gt,Lt,st,_e.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ut.intersectsObject(w))){const Gt=qt.update(w),Lt=w.material;if(it&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),_e.copy(w.boundingSphere.center)):(Gt.boundingSphere===null&&Gt.computeBoundingSphere(),_e.copy(Gt.boundingSphere.center)),_e.applyMatrix4(w.matrixWorld).applyMatrix4(He)),Array.isArray(Lt)){const Yt=Gt.groups;for(let Qt=0,ie=Yt.length;Qt<ie;Qt++){const oe=Yt[Qt],Xt=Lt[oe.materialIndex];Xt&&Xt.visible&&L.push(w,Gt,Xt,st,_e.z,oe)}}else Lt.visible&&L.push(w,Gt,Lt,st,_e.z,null)}}const Dt=w.children;for(let Gt=0,Lt=Dt.length;Gt<Lt;Gt++)Vr(Dt[Gt],W,st,it)}function yi(w,W,st,it){const{opaque:J,transmissive:Dt,transparent:Gt}=w;B.setupLightsView(st),Bt===!0&&Et.setGlobalState(O.clippingPlanes,st),it&&jt.viewport(I.copy(it)),J.length>0&&pn(J,W,st),Dt.length>0&&pn(Dt,W,st),Gt.length>0&&pn(Gt,W,st),jt.buffers.depth.setTest(!0),jt.buffers.depth.setMask(!0),jt.buffers.color.setMask(!0),jt.setPolygonOffset(!1)}function sn(w,W,st,it){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;if(B.state.transmissionRenderTarget[it.id]===void 0){const Xt=be.has("EXT_color_buffer_half_float")||be.has("EXT_color_buffer_float");B.state.transmissionRenderTarget[it.id]=new qi(1,1,{generateMipmaps:!0,type:Xt?ya:ci,minFilter:Nr,samples:Math.max(4,Pe.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Re.workingColorSpace})}const Dt=B.state.transmissionRenderTarget[it.id],Gt=it.viewport||I;Dt.setSize(Gt.z*O.transmissionResolutionScale,Gt.w*O.transmissionResolutionScale);const Lt=O.getRenderTarget(),Yt=O.getActiveCubeFace(),Qt=O.getActiveMipmapLevel();O.setRenderTarget(Dt),O.getClearColor(ot),vt=O.getClearAlpha(),vt<1&&O.setClearColor(16777215,.5),O.clear(),ce&&Ot.render(st);const ie=O.toneMapping;O.toneMapping=Wi;const oe=it.viewport;if(it.viewport!==void 0&&(it.viewport=void 0),B.setupLightsView(it),Bt===!0&&Et.setGlobalState(O.clippingPlanes,it),pn(w,st,it),Y.updateMultisampleRenderTarget(Dt),Y.updateRenderTargetMipmap(Dt),be.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let he=0,Ze=W.length;he<Ze;he++){const Ke=W[he],{object:Ce,geometry:mn,material:Wt,group:Pn}=Ke;if(Wt.side===Vi&&Ce.layers.test(it.layers)){const se=Wt.side;Wt.side=Kn,Wt.needsUpdate=!0,Zi(Ce,st,it,mn,Wt,Pn),Wt.side=se,Wt.needsUpdate=!0,Xt=!0}}Xt===!0&&(Y.updateMultisampleRenderTarget(Dt),Y.updateRenderTargetMipmap(Dt))}O.setRenderTarget(Lt,Yt,Qt),O.setClearColor(ot,vt),oe!==void 0&&(it.viewport=oe),O.toneMapping=ie}function pn(w,W,st){const it=W.isScene===!0?W.overrideMaterial:null;for(let J=0,Dt=w.length;J<Dt;J++){const Gt=w[J],{object:Lt,geometry:Yt,group:Qt}=Gt;let ie=Gt.material;ie.allowOverride===!0&&it!==null&&(ie=it),Lt.layers.test(st.layers)&&Zi(Lt,W,st,Yt,ie,Qt)}}function Zi(w,W,st,it,J,Dt){w.onBeforeRender(O,W,st,it,J,Dt),w.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),J.onBeforeRender(O,W,st,it,w,Dt),J.transparent===!0&&J.side===Vi&&J.forceSinglePass===!1?(J.side=Kn,J.needsUpdate=!0,O.renderBufferDirect(st,W,it,J,w,Dt),J.side=rr,J.needsUpdate=!0,O.renderBufferDirect(st,W,it,J,w,Dt),J.side=Vi):O.renderBufferDirect(st,W,it,J,w,Dt),w.onAfterRender(O,W,st,it,J,Dt)}function ba(w,W,st){W.isScene!==!0&&(W=Ne);const it=b.get(w),J=B.state.lights,Dt=B.state.shadowsArray,Gt=J.state.version,Lt=wt.getParameters(w,J.state,Dt,W,st),Yt=wt.getProgramCacheKey(Lt);let Qt=it.programs;it.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?W.environment:null,it.fog=W.fog;const ie=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;it.envMap=gt.get(w.envMap||it.environment,ie),it.envMapRotation=it.environment!==null&&w.envMap===null?W.environmentRotation:w.envMapRotation,Qt===void 0&&(w.addEventListener("dispose",Te),Qt=new Map,it.programs=Qt);let oe=Qt.get(Yt);if(oe!==void 0){if(it.currentProgram===oe&&it.lightsStateVersion===Gt)return sl(w,Lt),oe}else Lt.uniforms=wt.getUniforms(w),w.onBeforeCompile(Lt,O),oe=wt.acquireProgram(Lt,Yt),Qt.set(Yt,oe),it.uniforms=Lt.uniforms;const Xt=it.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Xt.clippingPlanes=Et.uniform),sl(w,Lt),it.needsLights=qs(w),it.lightsStateVersion=Gt,it.needsLights&&(Xt.ambientLightColor.value=J.state.ambient,Xt.lightProbe.value=J.state.probe,Xt.directionalLights.value=J.state.directional,Xt.directionalLightShadows.value=J.state.directionalShadow,Xt.spotLights.value=J.state.spot,Xt.spotLightShadows.value=J.state.spotShadow,Xt.rectAreaLights.value=J.state.rectArea,Xt.ltc_1.value=J.state.rectAreaLTC1,Xt.ltc_2.value=J.state.rectAreaLTC2,Xt.pointLights.value=J.state.point,Xt.pointLightShadows.value=J.state.pointShadow,Xt.hemisphereLights.value=J.state.hemi,Xt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Xt.spotLightMatrix.value=J.state.spotLightMatrix,Xt.spotLightMap.value=J.state.spotLightMap,Xt.pointShadowMatrix.value=J.state.pointShadowMatrix),it.currentProgram=oe,it.uniformsList=null,oe}function rl(w){if(w.uniformsList===null){const W=w.currentProgram.getUniforms();w.uniformsList=Qc.seqWithValue(W.seq,w.uniforms)}return w.uniformsList}function sl(w,W){const st=b.get(w);st.outputColorSpace=W.outputColorSpace,st.batching=W.batching,st.batchingColor=W.batchingColor,st.instancing=W.instancing,st.instancingColor=W.instancingColor,st.instancingMorph=W.instancingMorph,st.skinning=W.skinning,st.morphTargets=W.morphTargets,st.morphNormals=W.morphNormals,st.morphColors=W.morphColors,st.morphTargetsCount=W.morphTargetsCount,st.numClippingPlanes=W.numClippingPlanes,st.numIntersection=W.numClipIntersection,st.vertexAlphas=W.vertexAlphas,st.vertexTangents=W.vertexTangents,st.toneMapping=W.toneMapping}function ol(w,W,st,it,J){W.isScene!==!0&&(W=Ne),Y.resetTextureUnits();const Dt=W.fog,Gt=it.isMeshStandardMaterial||it.isMeshLambertMaterial||it.isMeshPhongMaterial?W.environment:null,Lt=nt===null?O.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Gs,Yt=it.isMeshStandardMaterial||it.isMeshLambertMaterial&&!it.envMap||it.isMeshPhongMaterial&&!it.envMap,Qt=gt.get(it.envMap||Gt,Yt),ie=it.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,oe=!!st.attributes.tangent&&(!!it.normalMap||it.anisotropy>0),Xt=!!st.morphAttributes.position,he=!!st.morphAttributes.normal,Ze=!!st.morphAttributes.color;let Ke=Wi;it.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Ke=O.toneMapping);const Ce=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,mn=Ce!==void 0?Ce.length:0,Wt=b.get(it),Pn=B.state.lights;if(Bt===!0&&(Kt===!0||w!==Q)){const ln=w===Q&&it.id===ut;Et.setState(it,w,ln)}let se=!1;it.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==Pn.state.version||Wt.outputColorSpace!==Lt||J.isBatchedMesh&&Wt.batching===!1||!J.isBatchedMesh&&Wt.batching===!0||J.isBatchedMesh&&Wt.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Wt.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Wt.instancing===!1||!J.isInstancedMesh&&Wt.instancing===!0||J.isSkinnedMesh&&Wt.skinning===!1||!J.isSkinnedMesh&&Wt.skinning===!0||J.isInstancedMesh&&Wt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Wt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Wt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Wt.instancingMorph===!1&&J.morphTexture!==null||Wt.envMap!==Qt||it.fog===!0&&Wt.fog!==Dt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==Et.numPlanes||Wt.numIntersection!==Et.numIntersection)||Wt.vertexAlphas!==ie||Wt.vertexTangents!==oe||Wt.morphTargets!==Xt||Wt.morphNormals!==he||Wt.morphColors!==Ze||Wt.toneMapping!==Ke||Wt.morphTargetsCount!==mn)&&(se=!0):(se=!0,Wt.__version=it.version);let In=Wt.currentProgram;se===!0&&(In=ba(it,W,J));let Qn=!1,Ei=!1,Jn=!1;const Ie=In.getUniforms(),on=Wt.uniforms;if(jt.useProgram(In.program)&&(Qn=!0,Ei=!0,Jn=!0),it.id!==ut&&(ut=it.id,Ei=!0),Qn||Q!==w){jt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Ie.setValue(V,"projectionMatrix",w.projectionMatrix),Ie.setValue(V,"viewMatrix",w.matrixWorldInverse);const bi=Ie.map.cameraPosition;bi!==void 0&&bi.setValue(V,ge.setFromMatrixPosition(w.matrixWorld)),Pe.logarithmicDepthBuffer&&Ie.setValue(V,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(it.isMeshPhongMaterial||it.isMeshToonMaterial||it.isMeshLambertMaterial||it.isMeshBasicMaterial||it.isMeshStandardMaterial||it.isShaderMaterial)&&Ie.setValue(V,"isOrthographic",w.isOrthographicCamera===!0),Q!==w&&(Q=w,Ei=!0,Jn=!0)}if(Wt.needsLights&&(Pn.state.directionalShadowMap.length>0&&Ie.setValue(V,"directionalShadowMap",Pn.state.directionalShadowMap,Y),Pn.state.spotShadowMap.length>0&&Ie.setValue(V,"spotShadowMap",Pn.state.spotShadowMap,Y),Pn.state.pointShadowMap.length>0&&Ie.setValue(V,"pointShadowMap",Pn.state.pointShadowMap,Y)),J.isSkinnedMesh){Ie.setOptional(V,J,"bindMatrix"),Ie.setOptional(V,J,"bindMatrixInverse");const ln=J.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),Ie.setValue(V,"boneTexture",ln.boneTexture,Y))}J.isBatchedMesh&&(Ie.setOptional(V,J,"batchingTexture"),Ie.setValue(V,"batchingTexture",J._matricesTexture,Y),Ie.setOptional(V,J,"batchingIdTexture"),Ie.setValue(V,"batchingIdTexture",J._indirectTexture,Y),Ie.setOptional(V,J,"batchingColorTexture"),J._colorsTexture!==null&&Ie.setValue(V,"batchingColorTexture",J._colorsTexture,Y));const zn=st.morphAttributes;if((zn.position!==void 0||zn.normal!==void 0||zn.color!==void 0)&&It.update(J,st,In),(Ei||Wt.receiveShadow!==J.receiveShadow)&&(Wt.receiveShadow=J.receiveShadow,Ie.setValue(V,"receiveShadow",J.receiveShadow)),(it.isMeshStandardMaterial||it.isMeshLambertMaterial||it.isMeshPhongMaterial)&&it.envMap===null&&W.environment!==null&&(on.envMapIntensity.value=W.environmentIntensity),on.dfgLUT!==void 0&&(on.dfgLUT.value=OA()),Ei&&(Ie.setValue(V,"toneMappingExposure",O.toneMappingExposure),Wt.needsLights&&sr(on,Jn),Dt&&it.fog===!0&&Jt.refreshFogUniforms(on,Dt),Jt.refreshMaterialUniforms(on,it,ct,k,B.state.transmissionRenderTarget[w.id]),Qc.upload(V,rl(Wt),on,Y)),it.isShaderMaterial&&it.uniformsNeedUpdate===!0&&(Qc.upload(V,rl(Wt),on,Y),it.uniformsNeedUpdate=!1),it.isSpriteMaterial&&Ie.setValue(V,"center",J.center),Ie.setValue(V,"modelViewMatrix",J.modelViewMatrix),Ie.setValue(V,"normalMatrix",J.normalMatrix),Ie.setValue(V,"modelMatrix",J.matrixWorld),it.isShaderMaterial||it.isRawShaderMaterial){const ln=it.uniformsGroups;for(let bi=0,Ki=ln.length;bi<Ki;bi++){const Xr=ln[bi];zt.update(Xr,In),zt.bind(Xr,In)}}return In}function sr(w,W){w.ambientLightColor.needsUpdate=W,w.lightProbe.needsUpdate=W,w.directionalLights.needsUpdate=W,w.directionalLightShadows.needsUpdate=W,w.pointLights.needsUpdate=W,w.pointLightShadows.needsUpdate=W,w.spotLights.needsUpdate=W,w.spotLightShadows.needsUpdate=W,w.rectAreaLights.needsUpdate=W,w.hemisphereLights.needsUpdate=W}function qs(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(w,W,st){const it=b.get(w);it.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,it.__autoAllocateDepthBuffer===!1&&(it.__useRenderToTexture=!1),b.get(w.texture).__webglTexture=W,b.get(w.depthTexture).__webglTexture=it.__autoAllocateDepthBuffer?void 0:st,it.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,W){const st=b.get(w);st.__webglFramebuffer=W,st.__useDefaultFramebuffer=W===void 0};const Ta=V.createFramebuffer();this.setRenderTarget=function(w,W=0,st=0){nt=w,G=W,Z=st;let it=null,J=!1,Dt=!1;if(w){const Lt=b.get(w);if(Lt.__useDefaultFramebuffer!==void 0){jt.bindFramebuffer(V.FRAMEBUFFER,Lt.__webglFramebuffer),I.copy(w.viewport),F.copy(w.scissor),rt=w.scissorTest,jt.viewport(I),jt.scissor(F),jt.setScissorTest(rt),ut=-1;return}else if(Lt.__webglFramebuffer===void 0)Y.setupRenderTarget(w);else if(Lt.__hasExternalTextures)Y.rebindTextures(w,b.get(w.texture).__webglTexture,b.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const ie=w.depthTexture;if(Lt.__boundDepthTexture!==ie){if(ie!==null&&b.has(ie)&&(w.width!==ie.image.width||w.height!==ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(w)}}const Yt=w.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(Dt=!0);const Qt=b.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Qt[W])?it=Qt[W][st]:it=Qt[W],J=!0):w.samples>0&&Y.useMultisampledRTT(w)===!1?it=b.get(w).__webglMultisampledFramebuffer:Array.isArray(Qt)?it=Qt[st]:it=Qt,I.copy(w.viewport),F.copy(w.scissor),rt=w.scissorTest}else I.copy(K).multiplyScalar(ct).floor(),F.copy(pt).multiplyScalar(ct).floor(),rt=St;if(st!==0&&(it=Ta),jt.bindFramebuffer(V.FRAMEBUFFER,it)&&jt.drawBuffers(w,it),jt.viewport(I),jt.scissor(F),jt.setScissorTest(rt),J){const Lt=b.get(w.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+W,Lt.__webglTexture,st)}else if(Dt){const Lt=W;for(let Yt=0;Yt<w.textures.length;Yt++){const Qt=b.get(w.textures[Yt]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+Yt,Qt.__webglTexture,st,Lt)}}else if(w!==null&&st!==0){const Lt=b.get(w.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Lt.__webglTexture,st)}ut=-1},this.readRenderTargetPixels=function(w,W,st,it,J,Dt,Gt,Lt=0){if(!(w&&w.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Yt=b.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Gt!==void 0&&(Yt=Yt[Gt]),Yt){jt.bindFramebuffer(V.FRAMEBUFFER,Yt);try{const Qt=w.textures[Lt],ie=Qt.format,oe=Qt.type;if(w.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Lt),!Pe.textureFormatReadable(ie)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pe.textureTypeReadable(oe)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=w.width-it&&st>=0&&st<=w.height-J&&V.readPixels(W,st,it,J,Ct.convert(ie),Ct.convert(oe),Dt)}finally{const Qt=nt!==null?b.get(nt).__webglFramebuffer:null;jt.bindFramebuffer(V.FRAMEBUFFER,Qt)}}},this.readRenderTargetPixelsAsync=async function(w,W,st,it,J,Dt,Gt,Lt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Yt=b.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Gt!==void 0&&(Yt=Yt[Gt]),Yt)if(W>=0&&W<=w.width-it&&st>=0&&st<=w.height-J){jt.bindFramebuffer(V.FRAMEBUFFER,Yt);const Qt=w.textures[Lt],ie=Qt.format,oe=Qt.type;if(w.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Lt),!Pe.textureFormatReadable(ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pe.textureTypeReadable(oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xt=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,Xt),V.bufferData(V.PIXEL_PACK_BUFFER,Dt.byteLength,V.STREAM_READ),V.readPixels(W,st,it,J,Ct.convert(ie),Ct.convert(oe),0);const he=nt!==null?b.get(nt).__webglFramebuffer:null;jt.bindFramebuffer(V.FRAMEBUFFER,he);const Ze=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await $M(V,Ze,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,Xt),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Dt),V.deleteBuffer(Xt),V.deleteSync(Ze),Dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,W=null,st=0){const it=Math.pow(2,-st),J=Math.floor(w.image.width*it),Dt=Math.floor(w.image.height*it),Gt=W!==null?W.x:0,Lt=W!==null?W.y:0;Y.setTexture2D(w,0),V.copyTexSubImage2D(V.TEXTURE_2D,st,0,0,Gt,Lt,J,Dt),jt.unbindTexture()};const Aa=V.createFramebuffer(),or=V.createFramebuffer();this.copyTextureToTexture=function(w,W,st=null,it=null,J=0,Dt=0){let Gt,Lt,Yt,Qt,ie,oe,Xt,he,Ze;const Ke=w.isCompressedTexture?w.mipmaps[Dt]:w.image;if(st!==null)Gt=st.max.x-st.min.x,Lt=st.max.y-st.min.y,Yt=st.isBox3?st.max.z-st.min.z:1,Qt=st.min.x,ie=st.min.y,oe=st.isBox3?st.min.z:0;else{const on=Math.pow(2,-J);Gt=Math.floor(Ke.width*on),Lt=Math.floor(Ke.height*on),w.isDataArrayTexture?Yt=Ke.depth:w.isData3DTexture?Yt=Math.floor(Ke.depth*on):Yt=1,Qt=0,ie=0,oe=0}it!==null?(Xt=it.x,he=it.y,Ze=it.z):(Xt=0,he=0,Ze=0);const Ce=Ct.convert(W.format),mn=Ct.convert(W.type);let Wt;W.isData3DTexture?(Y.setTexture3D(W,0),Wt=V.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(Y.setTexture2DArray(W,0),Wt=V.TEXTURE_2D_ARRAY):(Y.setTexture2D(W,0),Wt=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,W.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,W.unpackAlignment);const Pn=V.getParameter(V.UNPACK_ROW_LENGTH),se=V.getParameter(V.UNPACK_IMAGE_HEIGHT),In=V.getParameter(V.UNPACK_SKIP_PIXELS),Qn=V.getParameter(V.UNPACK_SKIP_ROWS),Ei=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,Ke.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Ke.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Qt),V.pixelStorei(V.UNPACK_SKIP_ROWS,ie),V.pixelStorei(V.UNPACK_SKIP_IMAGES,oe);const Jn=w.isDataArrayTexture||w.isData3DTexture,Ie=W.isDataArrayTexture||W.isData3DTexture;if(w.isDepthTexture){const on=b.get(w),zn=b.get(W),ln=b.get(on.__renderTarget),bi=b.get(zn.__renderTarget);jt.bindFramebuffer(V.READ_FRAMEBUFFER,ln.__webglFramebuffer),jt.bindFramebuffer(V.DRAW_FRAMEBUFFER,bi.__webglFramebuffer);for(let Ki=0;Ki<Yt;Ki++)Jn&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,b.get(w).__webglTexture,J,oe+Ki),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,b.get(W).__webglTexture,Dt,Ze+Ki)),V.blitFramebuffer(Qt,ie,Gt,Lt,Xt,he,Gt,Lt,V.DEPTH_BUFFER_BIT,V.NEAREST);jt.bindFramebuffer(V.READ_FRAMEBUFFER,null),jt.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(J!==0||w.isRenderTargetTexture||b.has(w)){const on=b.get(w),zn=b.get(W);jt.bindFramebuffer(V.READ_FRAMEBUFFER,Aa),jt.bindFramebuffer(V.DRAW_FRAMEBUFFER,or);for(let ln=0;ln<Yt;ln++)Jn?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,on.__webglTexture,J,oe+ln):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,on.__webglTexture,J),Ie?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,zn.__webglTexture,Dt,Ze+ln):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,zn.__webglTexture,Dt),J!==0?V.blitFramebuffer(Qt,ie,Gt,Lt,Xt,he,Gt,Lt,V.COLOR_BUFFER_BIT,V.NEAREST):Ie?V.copyTexSubImage3D(Wt,Dt,Xt,he,Ze+ln,Qt,ie,Gt,Lt):V.copyTexSubImage2D(Wt,Dt,Xt,he,Qt,ie,Gt,Lt);jt.bindFramebuffer(V.READ_FRAMEBUFFER,null),jt.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Ie?w.isDataTexture||w.isData3DTexture?V.texSubImage3D(Wt,Dt,Xt,he,Ze,Gt,Lt,Yt,Ce,mn,Ke.data):W.isCompressedArrayTexture?V.compressedTexSubImage3D(Wt,Dt,Xt,he,Ze,Gt,Lt,Yt,Ce,Ke.data):V.texSubImage3D(Wt,Dt,Xt,he,Ze,Gt,Lt,Yt,Ce,mn,Ke):w.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Dt,Xt,he,Gt,Lt,Ce,mn,Ke.data):w.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Dt,Xt,he,Ke.width,Ke.height,Ce,Ke.data):V.texSubImage2D(V.TEXTURE_2D,Dt,Xt,he,Gt,Lt,Ce,mn,Ke);V.pixelStorei(V.UNPACK_ROW_LENGTH,Pn),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,se),V.pixelStorei(V.UNPACK_SKIP_PIXELS,In),V.pixelStorei(V.UNPACK_SKIP_ROWS,Qn),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Ei),Dt===0&&W.generateMipmaps&&V.generateMipmap(Wt),jt.unbindTexture()},this.initRenderTarget=function(w){b.get(w).__webglFramebuffer===void 0&&Y.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Y.setTextureCube(w,0):w.isData3DTexture?Y.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Y.setTexture2DArray(w,0):Y.setTexture2D(w,0),jt.unbindTexture()},this.resetState=function(){G=0,Z=0,nt=null,jt.reset(),At.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const i=this.getContext();i.drawingBufferColorSpace=Re._getDrawingBufferColorSpace(t),i.unpackColorSpace=Re._getUnpackColorSpace()}}const nx=2e3,jo=1e3,nd=5e3,IA=5e3,id=600,zA=800,FA=.02,Ae=4e3,iu=120,Si=10,au=27,$d=new Ni(Math.PI*.12,Math.PI*.08,0),Yo=130,BA=75,GA=.1,HA=1e3,VA=2,tp=[new Ft("#ffffff"),new Ft("#ffffff"),new Ft("#22d3ee"),new Ft("#f97316"),new Ft("#a855f7")],ix=[new Ft("#ffffff"),new Ft("#f8fafc"),new Ft("#3b82f6"),new Ft("#ef4444"),new Ft("#22c55e")];new Ft("#ffffff");const XA=new Ft("#ffaa00"),uu=[{radius:34,size:3.2,speed:1.1,color:"#60a5fa"},{radius:46,size:2.6,speed:.85,color:"#818cf8"},{radius:60,size:3.8,speed:.65,color:"#a78bfa"},{radius:76,size:2.2,speed:.48,color:"#f472b6"},{radius:94,size:2.9,speed:.36,color:"#34d399"},{radius:114,size:4.6,speed:.27,color:"#fbbf24"},{radius:136,size:2.4,speed:.2,color:"#fb7185"},{radius:160,size:3.5,speed:.15,color:"#22d3ee"}],Xc=64,kA=1.5,WA=6,qA=.55,YA=2,jA=.45,ZA=2236962,KA=3,QA=300,ov=1.5,lv=.05,JA=1.08,$A=.02,ad=.992,ep=1500,tR=.04,cv=.04,eR=250,nR=3e3,iR=`
  attribute float size;
  attribute float alpha;
  attribute float random;
  attribute float migrator;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;
  
  uniform float uTime;
  
  void main() {
    vColor = color;
    vAlpha = alpha;
    vRandom = random;
    
    float finalSize = size;
    
    // Core particle pulsing animation
    if (gl_VertexID == 0) {
      finalSize = size * (1.0 + sin(uTime * 3.0) * 0.15);
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = finalSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`,aR=`
  varying vec3 vColor;
  varying float vAlpha;
  varying float vRandom;
  
  uniform float uTime;
  
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float dist = length(c);
    
    // Discard pixels outside circle
    if (dist > 0.5) discard;
    
    // Smooth edge fade
    float a = (1.0 - smoothstep(0.3, 0.5, dist)) * vAlpha;
    
    // Twinkling effect
    float twinkle = sin(uTime * 3.0 + vRandom * 10.0) * 0.3 + 0.7;
    
    gl_FragColor = vec4(vColor * twinkle, a);
  }
`,rR=`
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`,sR=`
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uOffset;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    // Stronger fresnel for more visible rim glow
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.2);
    // Enhanced breathing animation
    float breathe = 1.0 + sin(uTime * 2.0 + uOffset) * 0.25;
    // Boost alpha for visibility
    float alpha = fresnel * uOpacity * breathe * 1.5;
    // Brighter inner color, less fade to outer
    vec3 inner = uColor * 1.8;
    vec3 outer = uColor * 0.4;
    vec3 grad = mix(inner, outer, fresnel);
    gl_FragColor = vec4(grad, alpha);
  }
`;function Pr(s){return 1-Math.pow(1-s,3)}function oR(s){return s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2}function lR(s,t,i=260){for(let r=0;r<s;r++){const l=r*3;t[l]=(Math.random()-.5)*i,t[l+1]=(Math.random()-.5)*i,t[l+2]=(Math.random()-.5)*i}}function cR(s,t,i=au){const r=Math.PI*(3-Math.sqrt(5));for(let l=0;l<s;l++){const c=l*3,h=1-l/(s-1)*2,d=Math.sqrt(1-h*h),m=r*l;t[c]=Math.cos(m)*d*i,t[c+1]=h*i,t[c+2]=Math.sin(m)*d*i}}function uR(s,t){const i=s.length/3;for(let r=0;r<i;r++){const l=r*3,c=Math.sqrt(s[l]**2+s[l+1]**2+s[l+2]**2)||1;t[l]=s[l]/c,t[l+1]=s[l+1]/c,t[l+2]=s[l+2]/c}}function fR(s){const t=Array.from({length:s},(i,r)=>r);for(let i=t.length-1;i>0;i--){const r=Math.floor(Math.random()*(i+1));[t[i],t[r]]=[t[r],t[i]]}return t}function ax(s,t,i){const r=[];for(let c=0;c<=t;c++){const h=i+c/t*Math.PI*2;r.push(Math.cos(h)*s,0,Math.sin(h)*s)}const l=new Cn;return l.setAttribute("position",new yn(r,3)),l}function hR(s,t){return s*(.2+t*1.3)}function dR(s,t,i){const m=s<0?-2:2,p=(s-m)/22,v=t/16,x=i/18;let g=Math.sqrt(p*p+v*v+x*x)-1;const y=4,E=6,A=3,S=.15,_=Math.sin(s*y)*Math.cos(t*E)*Math.sin(i*A),R=Math.sin(s*8+i*2)*Math.cos(t*10)*.5;if(g+=(_+R*.3)*S,t<-16*.6){const D=Math.abs(t+9.6)/6.4;g+=D*D*.5}if(t>16*.7){const D=(t-11.2)/4.8;g+=D*D*.3}return g}function pR(){let s=0;const t=100;for(;s<t;){s++;const l=(Math.random()-.5)*50,c=(Math.random()-.5)*35,h=(Math.random()-.5)*40,d=dR(l,c,h);if(Math.abs(d)<.15&&d<=0)return{x:l,y:c,z:h}}const i=Math.random()*Math.PI*2,r=Math.acos(2*Math.random()-1);return{x:Math.cos(i)*Math.sin(r)*20,y:Math.cos(r)*14,z:Math.sin(i)*Math.sin(r)*16}}function mR(s,t,i=1){for(let r=0;r<s;r++){const l=r*3,c=pR();t[l]=c.x*i,t[l+1]=c.y*i,t[l+2]=c.z*i}}function gR(s,t=4,i=5){const r=s.length/3,l=[],c=i,h=new Map;for(let d=0;d<r;d++){const m=d*3,p=Math.floor(s[m]/c),v=Math.floor(s[m+1]/c),x=Math.floor(s[m+2]/c),g=`${p},${v},${x}`;h.has(g)||h.set(g,[]),h.get(g).push(d)}for(let d=0;d<r;d++){const m=d*3,p=Math.floor(s[m]/c),v=Math.floor(s[m+1]/c),x=Math.floor(s[m+2]/c);let g=0;for(let y=-1;y<=1&&g<t;y++)for(let E=-1;E<=1&&g<t;E++)for(let A=-1;A<=1&&g<t;A++){const S=`${p+y},${v+E},${x+A}`,_=h.get(S);if(_)for(const R of _){if(R<=d||g>=t)continue;const D=R*3,L=s[m]-s[D],B=s[m+1]-s[D+1],U=s[m+2]-s[D+2];Math.sqrt(L*L+B*B+U*U)<i&&(l.push(s[m],s[m+1],s[m+2],s[D],s[D+1],s[D+2]),g++)}}}return new Float32Array(l)}function _R(){const s={homePositions:new Float32Array(Ae*3),spherePositions:new Float32Array(Ae*3),directions:new Float32Array(Ae*3),random:new Float32Array(Ae),migrator:new Uint8Array(Ae),migratorDelay:new Float32Array(Ae),nonMigratorDelay:new Float32Array(Ae),burstVelocity:new Float32Array(Ae*3),migratorIndexMap:new Int32Array(Ae),state2Radius:new Float32Array(Ae),brainPositions:new Float32Array(Ae*3)},t={positions:new Float32Array(Ae*3),colors:new Float32Array(Ae*3),sizes:new Float32Array(Ae),alphas:new Float32Array(Ae),random:new Float32Array(Ae),migrator:new Float32Array(Ae)};lR(Ae,s.homePositions),cR(Ae,s.spherePositions,au),uR(s.spherePositions,s.directions),mR(Ae,s.brainPositions,1.2);for(let d=0;d<Ae;d++)s.random[d]=Math.random(),s.state2Radius[d]=hR(au,s.random[d]),s.migratorIndexMap[d]=-1;const i=fR(Ae),r=Math.floor(Ae/2);for(let d=0;d<r;d++)s.migrator[i[d]]=1;let l=0,c=0;for(let d=0;d<Ae;d++)s.migrator[d]?(s.migratorDelay[d]=l*(1e3/(r-1||1)),s.migratorIndexMap[d]=l,l++):(s.nonMigratorDelay[d]=c*(1e3/(r-1||1)),c++);const h=new Ft("#ffd700");for(let d=0;d<Ae;d++){const m=d*3;t.positions[m]=0,t.positions[m+1]=0,t.positions[m+2]=0,d===0?(t.sizes[d]=20,t.alphas[d]=1):(t.sizes[d]=0,t.alphas[d]=0),t.random[d]=s.random[d],t.migrator[d]=s.migrator[d],t.colors[m]=h.r,t.colors[m+1]=h.g,t.colors[m+2]=h.b}return{data:s,attributes:t}}function vR(s){const t=new Cn;return t.setAttribute("position",new Mn(s.positions,3)),t.setAttribute("color",new Mn(s.colors,3)),t.setAttribute("size",new Mn(s.sizes,1)),t.setAttribute("alpha",new Mn(s.alphas,1)),t.setAttribute("random",new Mn(s.random,1)),t.setAttribute("migrator",new Mn(s.migrator,1)),t}function xR(s){return s.migrator.filter(t=>t===1).length}function SR(s){return new Float32Array(s*Si*3)}function MR(s){return new Float32Array(s*(Si-1)*6)}function yR(){const s=new my,t=new li(BA,window.innerWidth/window.innerHeight,GA,HA);t.position.z=Yo;const i=new PA({antialias:!0,alpha:!0});return i.setSize(window.innerWidth,window.innerHeight),i.setPixelRatio(Math.min(window.devicePixelRatio,VA)),i.shadowMap.enabled=!0,i.shadowMap.type=vv,{scene:s,camera:t,renderer:i}}function ER(s,t){const i=new By(ZA);s.add(i);const r=new Fy(t.centerColor,KA,QA);return r.position.set(0,0,0),r.castShadow=!0,r.shadow.mapSize.width=2048,r.shadow.mapSize.height=2048,r.shadow.camera.near=.5,r.shadow.camera.far=500,s.add(r),{ambient:i,sun:r}}function bR(s){const t=vR(s),i=new Vn({vertexShader:iR,fragmentShader:aR,uniforms:{uTime:{value:0}},vertexColors:!0,transparent:!0,blending:Yi,depthWrite:!1});return new Ay(t,i)}function TR(s){const t=new ir;t.visible=!1;const i=new zr(kA,Xc,Xc),r=new Vn({vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        float diff = max(dot(normal, vec3(0.5, 0.8, 0.3)), 0.0);
        float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.5);
        float detail = sin(normal.x * 10.0 + uTime * 1.5) * sin(normal.y * 10.0 + uTime * 1.2) * 0.5 + 0.5;
        vec3 base = uColor * (0.25 + diff * 0.55);
        vec3 rim = uColor * 1.4 * fresnel;
        gl_FragColor = vec4(base + rim + detail * 0.08, 1.0);
      }
    `,uniforms:{uColor:{value:new Ft(s.centerColor)},uTime:{value:0}}}),l=new Hn(i,r),c=new zr(WA,Xc,Xc),h=new Vn({vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 1.6);
        float breathe = 1.0 + sin(uTime * 2.5) * 0.2;
        float alpha = fresnel * uOpacity * breathe;
        vec3 inner = uColor * 1.3;
        vec3 outer = uColor * 0.1;
        vec3 grad = mix(inner, outer, fresnel);
        gl_FragColor = vec4(grad, alpha);
      }
    `,uniforms:{uColor:{value:new Ft(s.centerColor)},uOpacity:{value:qA},uTime:{value:0}},transparent:!0,blending:Yi,depthWrite:!1}),d=new Hn(c,h);return t.add(l),t.add(d),{group:t,mesh:l,glow:d}}function AR(s,t){return uu.map((i,r)=>{const l=new ir;l.visible=!1;const c=new Hn(new zr(i.size,32,32),new Ny({color:new Ft("#444444"),roughness:.6,metalness:.3}));c.castShadow=!0,c.receiveShadow=!0;const h=new Hn(new zr(i.size*YA,32,32),new Vn({vertexShader:rR,fragmentShader:sR,uniforms:{uColor:{value:new Ft(i.color)},uOpacity:{value:jA},uTime:{value:0},uOffset:{value:r*.5}},transparent:!0,blending:Yi,depthWrite:!1}));return l.add(c),l.add(h),s.add(l),{group:l,radius:i.radius,speed:i.speed,angle:t[r],startAngle:t[r],angleTraveled:0,hasCompletedFirstOrbit:!1}})}function RR(s){const t=new ir;return t.visible=!1,uu.forEach((i,r)=>{const l=ax(i.radius,iu,s[r]);l.setDrawRange(0,0);const c=new mp({color:new Ft(i.color),transparent:!0,opacity:.8,blending:Yi}),h=new Vv(l,c);h.rotation.copy($d),h.userData={radius:i.radius,idx:r,totalVertices:iu+1,type:"orbitLine"},t.add(h)}),t}function CR(s,t){const i=new Cn;i.setAttribute("position",new Mn(t,3));const r=new mp({color:XA,transparent:!0,opacity:0,blending:Yi,depthWrite:!1}),l=new Xv(i,r);return l.visible=!1,l}function wR(s,t=4,i=5){const r=gR(s,t,i),l=new Cn;l.setAttribute("position",new Mn(r,3));const c=new Vn({vertexShader:`
      varying float vAlpha;
      void main() {
        vAlpha = 1.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(uColor, uOpacity * vAlpha);
      }
    `,uniforms:{uColor:{value:new Ft("#00d4ff")},uOpacity:{value:.25}},transparent:!0,blending:Yi,depthWrite:!1}),h=new Xv(l,c);return h.visible=!0,h}function uv(s,t=new Ft("#ffffff"),i=.6,r=.05){const l=new zr(1,32,32),c=new su({color:t,transparent:!0,opacity:i,blending:Yi}),h=new Hn(l,c);return h.scale.set(r,r,r),s.add(h),h}function DR(s,t,i=.5){const r=new gp(.85,1,128),l=new su({color:t,transparent:!0,opacity:.9,blending:Yi,side:Vi,depthWrite:!1}),c=new Hn(r,l);return c.scale.set(i,i,i),c.lookAt(0,0,1),s.add(c),c}function UR(s,t){s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight)}function LR(s){const t=te.useRef(null),i=te.useRef(null),r=te.useRef(null),l=te.useRef(null),c=te.useRef(null),h=te.useRef(null),d=te.useRef(null),m=te.useRef([]),p=te.useRef(null),v=te.useRef(null),x=te.useRef(null),g=te.useRef(null),y=te.useRef(null),E=te.useRef({active:!1,startTime:0}),A=te.useRef(null),S=te.useRef(0),_=te.useRef(performance.now()),R=te.useRef(0),D=te.useRef(new Float32Array(Ae*3)),L=te.useRef(new Ft(s.centerColor)),B=te.useRef(tp[0].clone()),U=te.useRef(ix[0].clone()),N=te.useRef(0),T=te.useRef(new Float32Array(0)),O=te.useRef(null),ft=te.useRef(null),G=te.useRef(0),Z=te.useRef({x:0,y:0}),nt=te.useRef({x:0,y:0});return te.useEffect(()=>{if(!t.current)return;const I=t.current,{scene:F,camera:rt,renderer:ot}=yR();i.current=F,r.current=rt,l.current=ot,I.appendChild(ot.domElement);const{sun:vt}=ER(F,s);p.current=vt;const{data:P,attributes:k}=_R();O.current=P,ft.current=k;const ct=new ir;F.add(ct),g.current=ct;const yt=bR(k);ct.add(yt),c.current=yt;const{group:Rt}=TR(s);ct.add(Rt),h.current=Rt;const K=uu.map(()=>Math.random()*Math.PI*2);m.current=AR(ct,K);const pt=RR(K);ct.add(pt),d.current=pt;const St=xR(P);T.current=SR(St);const Ut=MR(St),Bt=CR(St,Ut);ct.add(Bt),v.current=Bt;const Kt=wR(P.brainPositions,3,7);ct.add(Kt),A.current=Kt;const He=()=>{r.current&&l.current&&UR(r.current,l.current)};window.addEventListener("resize",He);const ge=G.current;return()=>{cancelAnimationFrame(ge),window.removeEventListener("resize",He),l.current&&I&&(I.removeChild(l.current.domElement),l.current.dispose()),c.current&&(c.current.geometry.dispose(),c.current.material.dispose())}},[]),te.useEffect(()=>{L.current.set(s.centerColor)},[s.centerColor]),{refs:{scene:i,camera:r,renderer:l,particles:c,coreGroup:h,orbitGroup:d,planets:m,sunLight:p,trail:v,flashMesh:x,systemGroup:g,novaMesh:y,novaState:E,neuralConnections:A},data:{time:S,stateStart:_,lastState:R,snapshotPositions:D,currentCoreColor:L,currentPrimaryColor:B,currentSecondaryColor:U,shellAngle:N,trailHistory:T,particleData:O,particleAttributes:ft,animationId:G,mousePosition:Z,cameraDrift:nt},containerRef:t}}function NR(s,t,i,r){const{positions:l,colors:c,sizes:h,alphas:d}=s,{brainPositions:m,random:p}=t;for(let v=0;v<Ae;v++){const x=v*3;if(v===0){l[x]=0,l[x+1]=0,l[x+2]=0,c[x]=.1,c[x+1]=.5,c[x+2]=.6,h[v]=2.5+Math.sin(i*2)*.4,d[v]=.7;continue}const g=p[v],y=1+Math.sin(i*.6)*.01;l[x]=m[x]*y,l[x+1]=m[x+1]*y,l[x+2]=m[x+2]*y;const E=.8+g*1.2,A=g*Math.PI*2,_=(Math.sin(i*E+A)+1)*.25,R=new Ft("#061a2e"),D=new Ft("#1a5f7a"),L=new Ft().lerpColors(R,D,_),B=.15+_*.4;c[x]=L.r*B,c[x+1]=L.g*B,c[x+2]=L.b*B;const U=.25+g*.15,N=.6+g*.4;h[v]=U+_*N;const T=.25+g*.15,O=.6;d[v]=T+_*(O-T)}}function OR(s,t,i,r,l,c,h,d){const{positions:m,colors:p,sizes:v,alphas:x}=s,{homePositions:g,brainPositions:y,random:E}=t;for(let A=0;A<Ae;A++){const S=A*3;if(A===0){m[S]=0,m[S+1]=0,m[S+2]=0,p[S]=c.r,p[S+1]=c.g,p[S+2]=c.b,v[A]=2.5*(1-Math.min(1,i/500)),x[A]=Math.max(0,1-i/500);continue}const _=E[A],R=y[S],D=y[S+1],L=y[S+2],N=Math.sqrt(R*R+D*D+L*L)/25*.3+_*.3;let T=(i/nx-N)/(1-N);T=Math.max(0,Math.min(1,T));const O=Pr(T),ft=r[S],G=r[S+1],Z=r[S+2],nt=g[S],ut=g[S+1],Q=g[S+2];if(T<.4){const St=T/.4,Bt=1+Pr(St)*2.5;m[S]=ft*Bt,m[S+1]=G*Bt,m[S+2]=Z*Bt}else{const St=(T-.4)/.6,Ut=Pr(St),Bt=ft*3.5,Kt=G*3.5,He=Z*3.5;m[S]=Bt+(nt-Bt)*Ut,m[S+1]=Kt+(ut-Kt)*Ut,m[S+2]=He+(Q-He)*Ut}const I=1+_*2,F=_*Math.PI*2,rt=Math.sin(l*I+F),ot=(Math.max(0,rt)*.3+.1)*O,vt=new Ft("#1a5f7a"),P=new Ft("#e0f7ff"),k=new Ft().lerpColors(vt,P,O),ct=.1+ot*.6;p[S]=k.r*ct,p[S+1]=k.g*ct,p[S+2]=k.b*ct;const yt=.3+_*.2,Rt=.8+_*.6,K=yt+(Rt-yt)*O;v[A]=(K+ot*.8)*O;const pt=.2+_*.2;x[A]=pt*O+ot*.5}}function PR(s,t,i,r,l,c,h,d,m,p){const{positions:v,colors:x,sizes:g,alphas:y}=s,{homePositions:E,random:A,migrator:S,migratorDelay:_,nonMigratorDelay:R,directions:D,state2Radius:L}=t,B=i===3?r+nd:r;i===3&&(g[0]=0,y[0]=0);for(let U=1;U<Ae;U++){const N=U*3,T=S[U]===1,O=T?_[U]:R[U]+nd;if(i===2&&!T){const rt=E[N],ot=E[N+1],vt=E[N+2];v[N]=rt+Math.sin(c+U)*.2,v[N+1]=ot+Math.cos(c+U)*.2,v[N+2]=vt+Math.sin(c+U*.5)*.2;const P=A[U],k=new Ft("#ffffff"),ct=new Ft("#e0f2fe"),yt=new Ft().lerpColors(k,ct,P*.5),Rt=.8+P*.4;x[N]=yt.r*Rt,x[N+1]=yt.g*Rt,x[N+2]=yt.b*Rt,g[U]=P*.8+.3,y[U]=.6+P*.3;continue}if(B<O){const rt=E[N],ot=E[N+1],vt=E[N+2];v[N]=rt+Math.sin(c+U)*.2,v[N+1]=ot+Math.cos(c+U)*.2,v[N+2]=vt+Math.sin(c+U*.5)*.2;const P=A[U];if(T){const k=new Ft().lerpColors(m,p,P),ct=.7+P*.6;x[N]=k.r*ct,x[N+1]=k.g*ct,x[N+2]=k.b*ct,g[U]=P*.8+.2,y[U]=.5}else{const k=new Ft("#ffffff"),ct=new Ft("#e0f2fe"),yt=new Ft().lerpColors(k,ct,P*.5),Rt=.8+P*.4;x[N]=yt.r*Rt,x[N+1]=yt.g*Rt,x[N+2]=yt.b*Rt,g[U]=P*.8+.3,y[U]=.6+P*.3}continue}const ft=B-O,G=6+A[U]*22,Z=Math.max(0,B-nd),nt=Math.min(Z/2500,1),ut=Pr(nt),Q=L[U]+(au-L[U])*ut,I=Math.cos(d),F=Math.sin(d);if(ft<id){const rt=ft/id,ot=Pr(rt);let vt=D[N]*G;const P=D[N+1]*G;let k=D[N+2]*G;const ct=vt*I-k*F,yt=vt*F+k*I;vt=ct,k=yt;const Rt=E[N],K=E[N+1],pt=E[N+2];v[N]=Rt+(vt-Rt)*ot,v[N+1]=K+(P-K)*ot,v[N+2]=pt+(k-pt)*ot;const St=new Ft().lerpColors(m,p,A[U]),Ut=.7+ot*.6;x[N]=St.r*Ut,x[N+1]=St.g*Ut,x[N+2]=St.b*Ut,g[U]=.8+ot*1.6,y[U]=.3+ot*.7}else{const rt=ft-id,ot=Math.min(rt/IA,1),vt=Pr(ot),P=G+(Q-G)*vt,k=(1-vt)*(12+A[U]*10),ct=Math.sin(rt*.005+A[U]*10)*k,yt=Math.max(0,P+ct);let Rt=D[N]*yt;const K=D[N+1]*yt;let pt=D[N+2]*yt;const St=Rt*I-pt*F,Ut=Rt*F+pt*I;Rt=St,pt=Ut,v[N]=Rt,v[N+1]=K,v[N+2]=pt;const Bt=new Ft().lerpColors(m,p,A[U]),Kt=.5+vt*.8;x[N]=Bt.r*Kt,x[N+1]=Bt.g*Kt,x[N+2]=Bt.b*Kt,g[U]=.6+vt*1.4+(1-vt)*.8,y[U]=.2+vt*.8}}}function IR(s,t,i,r){const l=new $(-90,-70,30);s.forEach((c,h)=>{const d=nR+h*eR;if(i<d){c.group.visible=!1;return}c.group.visible=!0;const m=Math.min((i-d)/zA,1),p=Pr(m),v=new $(Math.cos(c.angle)*c.radius,0,Math.sin(c.angle)*c.radius);v.applyEuler($d),c.group.position.lerpVectors(l,v,p);const x=5,y=x+(1-x)*p;if(c.group.scale.set(y,y,y),m>=1){const E=c.angle;c.angle+=c.speed*.03*r;const A=c.angle-E;c.hasCompletedFirstOrbit||(c.angleTraveled+=A,c.angleTraveled>=Math.PI*2&&(c.hasCompletedFirstOrbit=!0,c.angleTraveled=Math.PI*2));const S=new $(Math.cos(c.angle)*c.radius,0,Math.sin(c.angle)*c.radius);if(S.applyEuler($d),c.group.position.copy(S),t){const _=c.hasCompletedFirstOrbit?1:Math.min(1,c.angleTraveled/(Math.PI*2)),R=iu+1,D=Math.max(1,Math.floor(_*R));t.children.forEach(L=>{L.userData.idx===h&&L.geometry.setDrawRange(0,D)})}}})}function zR(s,t,i,r,l,c,h,d){const{positions:m,colors:p,sizes:v,alphas:x}=s,{homePositions:g,random:y,migrator:E}=t;if(i<jo){const A=i/jo,S=oR(A);for(let _=0;_<Ae;_++){const R=_*3;if(E[_]){const D=r[R],L=r[R+1],B=r[R+2];m[R]=D*(1-S),m[R+1]=L*(1-S),m[R+2]=B*(1-S);const U=h.clone().lerp(d,y[_]);p[R]=U.r,p[R+1]=U.g,p[R+2]=U.b,v[_]=1.5,x[_]=1}else{const D=g[R],L=g[R+1],B=g[R+2];m[R]=D+Math.sin(c+_)*.2,m[R+1]=L+Math.cos(c+_)*.2,m[R+2]=B+Math.sin(c+_*.5)*.2;const U=y[_],N=d.clone().multiplyScalar(.7+U*.6);p[R]=N.r,p[R+1]=N.g,p[R+2]=N.b,v[_]=U*.8+.2,x[_]=.5}}}else{const A=i-jo;if(A<ep)for(let S=0;S<Ae;S++){const _=S*3;if(E[S]){l[_]*=ad,l[_+1]*=ad,l[_+2]*=ad,m[_]+=l[_],m[_+1]+=l[_+1],m[_+2]+=l[_+2];const R=Math.max(0,1-A/ep),D=h.clone().lerp(d,R*.5+y[S]*.5),L=1+R*.5;p[_]=D.r*L,p[_+1]=D.g*L,p[_+2]=D.b*L,v[S]=(4+y[S]*6)*R,x[S]=R*.9}else{const R=g[_],D=g[_+1],L=g[_+2];m[_]=R+Math.sin(c+S)*.2,m[_+1]=D+Math.cos(c+S)*.2,m[_+2]=L+Math.sin(c+S*.5)*.2;const B=y[S],U=d.clone().multiplyScalar(.7+B*.6);p[_]=U.r,p[_+1]=U.g,p[_+2]=U.b,v[S]=B*.8+.2,x[S]=.5}}}}function FR(s,t,i,r,l,c,h=jo,d=ep){const m=s.geometry.attributes.position.array,p=Math.max(0,1-Math.max(0,l-h)/d);c&&s.material.color.copy(c),s.material.opacity=p*.8;let v=0;for(let x=0;x<Ae;x++){const g=i[x];if(g<0)continue;const y=x*3,E=g*Si*3;for(let A=0;A<Si-1;A++)r[E+A*3]=r[E+(A+1)*3],r[E+A*3+1]=r[E+(A+1)*3+1],r[E+A*3+2]=r[E+(A+1)*3+2];r[E+(Si-1)*3]=t[y],r[E+(Si-1)*3+1]=t[y+1],r[E+(Si-1)*3+2]=t[y+2];for(let A=0;A<Si-1;A++)m[v++]=r[E+A*3],m[v++]=r[E+A*3+1],m[v++]=r[E+A*3+2],m[v++]=r[E+(A+1)*3],m[v++]=r[E+(A+1)*3+1],m[v++]=r[E+(A+1)*3+2]}s.geometry.attributes.position.needsUpdate=!0}function BR(s,t=10,i=14){const r=s.length/3;for(let l=0;l<r;l++){const c=l*3,h=Math.random()*Math.PI*2,d=Math.acos(2*Math.random()-1),m=t+Math.random()*(i-t);s[c]=Math.sin(d)*Math.cos(h)*m,s[c+1]=Math.sin(d)*Math.sin(h)*m,s[c+2]=Math.cos(d)*m}}function GR({state:s,config:t,refs:i,data:r}){te.useEffect(()=>{if(!i.scene.current||!i.camera.current||!i.renderer.current)return;const l=d=>{r.mousePosition.current.x=d.clientX/window.innerWidth*2-1,r.mousePosition.current.y=-(d.clientY/window.innerHeight)*2+1};window.addEventListener("mousemove",l);const c=()=>{const{scene:d,particles:m,trail:p,flashMesh:v,planets:x,orbitGroup:g}=i,{lastState:y,stateStart:E,snapshotPositions:A,particleData:S}=r;if(!m.current||!S.current)return;y.current=s,E.current=performance.now();const _=m.current.geometry.attributes.position.array;if(A.current.set(_),s===4&&S.current&&(BR(S.current.burstVelocity),p.current)){const R=r.trailHistory.current;for(let D=0;D<Ae;D++){const L=S.current.migratorIndexMap[D];if(L>=0){const B=D*3;for(let U=0;U<Si;U++)R[L*Si*3+U*3]=A.current[B],R[L*Si*3+U*3+1]=A.current[B+1],R[L*Si*3+U*3+2]=A.current[B+2]}}}if(s===3&&(x.current?.forEach(R=>{R.hasCompletedFirstOrbit=!1,R.angleTraveled=0,R.startAngle=R.angle}),g.current&&g.current.children.forEach(R=>{const D=R.userData.idx;if(typeof D=="number"){const L=uu[D],B=x.current[D],U=ax(L.radius,iu,B.startAngle);U.setDrawRange(0,0),R.type==="Line"&&(R.geometry.dispose(),R.geometry=U)}})),s===1&&!v.current&&d.current&&(v.current=uv(d.current,new Ft("#ffffff"),.6,.05)),i.systemGroup.current&&!i.novaMesh.current){const R=tp[s].clone();i.novaMesh.current=DR(i.systemGroup.current,R,.5),i.novaState.current={active:!0,startTime:performance.now()}}},h=()=>{r.animationId.current=requestAnimationFrame(h);const m=performance.now()-r.stateStart.current,p=s;if(r.time.current+=FA*t.speed,i.particles.current&&(i.particles.current.material.uniforms.uTime.value=r.time.current),i.coreGroup.current){const U=i.coreGroup.current.children[0],N=i.coreGroup.current.children[1];U.material.uniforms.uTime.value=r.time.current,N.material.uniforms.uTime.value=r.time.current}if(i.planets.current?.forEach(U=>{const N=U.group.children[1];N&&N.material.uniforms.uTime&&(N.material.uniforms.uTime.value=r.time.current)}),i.flashMesh.current&&i.scene.current){const U=i.flashMesh.current;U.scale.multiplyScalar(JA);const N=U.material;N.opacity-=$A,N.opacity<=0&&(i.scene.current.remove(U),U.geometry.dispose(),N.dispose(),i.flashMesh.current=null)}p!==r.lastState.current&&c();const v=i.particles.current.geometry.attributes.position,x=i.particles.current.geometry.attributes.color,g=i.particles.current.geometry.attributes.size,y=i.particles.current.geometry.attributes.alpha,E=v.array,A=x.array,S=g.array,_=y.array,R={positions:E,colors:A,sizes:S,alphas:_,random:i.particles.current.geometry.attributes.random.array,migrator:i.particles.current.geometry.attributes.migrator.array},D=r.particleData.current,L=tp[p],B=ix[p];switch(p){case 0:NR(R,D,r.time.current,r.currentCoreColor.current),i.coreGroup.current&&(i.coreGroup.current.visible=!1),i.orbitGroup.current&&(i.orbitGroup.current.visible=!1),i.planets.current?.forEach(U=>U.group.visible=!1),i.trail.current&&(i.trail.current.visible=!1),i.neuralConnections.current&&(i.neuralConnections.current.visible=!0);break;case 1:OR(R,D,m,r.snapshotPositions.current,r.time.current,r.currentCoreColor.current,r.currentPrimaryColor.current,r.currentSecondaryColor.current),i.coreGroup.current&&(i.coreGroup.current.visible=!1),i.orbitGroup.current&&(i.orbitGroup.current.visible=!1),i.planets.current?.forEach(U=>U.group.visible=!1),i.trail.current&&(i.trail.current.visible=!1),i.neuralConnections.current&&(i.neuralConnections.current.visible=!1);break;case 2:case 3:if(r.shellAngle.current+=.003*t.speed,PR(R,D,p,m,r.snapshotPositions.current,r.time.current,t.speed,r.shellAngle.current,r.currentPrimaryColor.current,r.currentSecondaryColor.current),i.coreGroup.current&&(i.coreGroup.current.visible=!0),i.orbitGroup.current&&(i.orbitGroup.current.visible=p===3),i.planets.current?.forEach(U=>U.group.visible=!1),i.trail.current&&(i.trail.current.visible=!1),i.neuralConnections.current&&(i.neuralConnections.current.visible=!1),p===3){if(S[0]=0,_[0]=0,i.coreGroup.current){const U=i.coreGroup.current,N=1+Math.min(m/1e3,.5);U.scale.set(N,N,N)}i.planets.current&&IR(i.planets.current,i.orbitGroup.current,m,t.speed)}break;case 4:{i.coreGroup.current&&(i.coreGroup.current.visible=!1),i.orbitGroup.current&&(i.orbitGroup.current.visible=!1),i.planets.current?.forEach(N=>N.group.visible=!1),i.trail.current&&(i.trail.current.visible=!0),i.neuralConnections.current&&(i.neuralConnections.current.visible=!1),zR(R,D,m,r.snapshotPositions.current,D.burstVelocity,r.time.current,r.currentPrimaryColor.current,r.currentSecondaryColor.current);const U=m-jo;!i.flashMesh.current&&U<200&&i.scene.current&&(i.flashMesh.current=uv(i.scene.current,r.currentPrimaryColor.current,.95,4)),i.trail.current&&FR(i.trail.current,E,D.migratorIndexMap,r.trailHistory.current,m,r.currentPrimaryColor.current);break}}if(r.currentCoreColor.current.lerp(L,tR),r.currentPrimaryColor.current.lerp(L,cv),r.currentSecondaryColor.current.lerp(B,cv),i.coreGroup.current){const U=i.coreGroup.current,N=U.children[0],T=U.children[1];N.material.uniforms.uColor.value.copy(r.currentCoreColor.current),T.material.uniforms.uColor.value.copy(r.currentCoreColor.current)}if(i.sunLight.current&&i.sunLight.current.color.copy(r.currentCoreColor.current),v.needsUpdate=!0,x.needsUpdate=!0,g.needsUpdate=!0,y.needsUpdate=!0,i.systemGroup.current&&(i.systemGroup.current.rotation.y+=5e-4*t.speed,i.systemGroup.current.rotation.x=Math.sin(r.time.current*.1)*.02),i.novaMesh.current&&i.novaState.current.active){const U=performance.now()-i.novaState.current.startTime,T=Math.min(U/1200,1),G=.5+T*180;i.novaMesh.current.scale.set(G,G,G);const nt=.9*(1-Math.max(0,(T-.3)/.7));i.novaMesh.current.material.opacity=nt,T>=1&&(i.novaMesh.current.geometry.dispose(),i.novaMesh.current.material.dispose(),i.systemGroup.current?.remove(i.novaMesh.current),i.novaMesh.current=null,i.novaState.current.active=!1)}if(i.camera.current){const U=r.mousePosition.current.x*8,N=r.mousePosition.current.y*8;r.cameraDrift.current.x+=(U-r.cameraDrift.current.x)*.05,r.cameraDrift.current.y+=(N-r.cameraDrift.current.y)*.05;let T=Yo;if(p===0)T=Yo;else if(p===1){const O=Math.min(m/nx,1);T=Yo-O*(Yo-20)}i.camera.current.position.z+=(T-i.camera.current.position.z)*.03,i.camera.current.position.x=Math.sin(r.time.current*lv)*ov+r.cameraDrift.current.x,i.camera.current.position.y=Math.cos(r.time.current*lv)*ov+r.cameraDrift.current.y,i.camera.current.lookAt(0,0,0)}i.renderer.current.render(i.scene.current,i.camera.current)};return h(),()=>{cancelAnimationFrame(r.animationId.current),window.removeEventListener("mousemove",l)}},[s,t.speed,i,r])}function HR({state:s,config:t}){const{refs:i,data:r,containerRef:l}=LR(t);GR({state:s,config:t,refs:i,data:r});const c=s===1?"pointer":"default";return Ht.jsx("div",{"code-path":"src\\components\\ParticleCanvas.tsx:35:5",ref:l,className:"fixed inset-0 z-0",style:{background:"radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",cursor:c}})}const VR=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),XR=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,r)=>r?r.toUpperCase():i.toLowerCase()),fv=s=>{const t=XR(s);return t.charAt(0).toUpperCase()+t.slice(1)},rx=(...s)=>s.filter((t,i,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===i).join(" ").trim(),kR=s=>{for(const t in s)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};var WR={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const qR=te.forwardRef(({color:s="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:r,className:l="",children:c,iconNode:h,...d},m)=>te.createElement("svg",{ref:m,...WR,width:t,height:t,stroke:s,strokeWidth:r?Number(i)*24/Number(t):i,className:rx("lucide",l),...!c&&!kR(d)&&{"aria-hidden":"true"},...d},[...h.map(([p,v])=>te.createElement(p,v)),...Array.isArray(c)?c:[c]]));const il=(s,t)=>{const i=te.forwardRef(({className:r,...l},c)=>te.createElement(qR,{ref:c,iconNode:t,className:rx(`lucide-${VR(fv(s))}`,`lucide-${s}`,r),...l}));return i.displayName=fv(s),i};const YR=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],jR=il("chevron-down",YR);const ZR=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],KR=il("chevron-right",ZR);const QR=[["path",{d:"M5 16V9h14V2H5l14 14h-7m-7 0 7 7v-7m-7 0h7",key:"1a2nng"}]],JR=il("framer",QR);const $R=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],t3=il("palette",$R);const e3=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],hv=il("play",e3),dv={0:"Neural Brain",1:"Deep Dive",2:"Charging Shell",3:"Solar System",4:"Collapse"};function rd({title:s,icon:t,children:i,defaultOpen:r=!1}){const[l,c]=te.useState(r);return Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:23:5",className:"border-t border-white/10",children:[Ht.jsxs("button",{"code-path":"src\\components\\ControlPanel.tsx:24:7",onClick:()=>c(!l),className:"w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors",children:[Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:28:9",className:"flex items-center gap-3",children:[t,Ht.jsx("span",{"code-path":"src\\components\\ControlPanel.tsx:30:11",className:"text-sm font-medium text-white/90",children:s})]}),l?Ht.jsx(jR,{"code-path":"src\\components\\ControlPanel.tsx:33:11",className:"w-4 h-4 text-white/50"}):Ht.jsx(KR,{"code-path":"src\\components\\ControlPanel.tsx:35:11",className:"w-4 h-4 text-white/50"})]}),l&&Ht.jsx("div",{"code-path":"src\\components\\ControlPanel.tsx:39:9",className:"px-4 pb-4 space-y-4",children:i})]})}function n3({label:s,value:t,min:i,max:r,step:l,onChange:c}){return Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:58:5",className:"space-y-2",children:[Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:59:7",className:"flex justify-between text-xs",children:[Ht.jsx("span",{"code-path":"src\\components\\ControlPanel.tsx:60:9",className:"text-white/60",children:s}),Ht.jsx("span",{"code-path":"src\\components\\ControlPanel.tsx:61:9",className:"text-white/80",children:t})]}),Ht.jsx("input",{"code-path":"src\\components\\ControlPanel.tsx:63:7",type:"range",min:i,max:r,step:l,value:t,onChange:h=>c(parseFloat(h.target.value)),className:"w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400",style:{background:`linear-gradient(to right, #a855f7 0%, #a855f7 ${(t-i)/(r-i)*100}%, rgba(255,255,255,0.1) ${(t-i)/(r-i)*100}%, rgba(255,255,255,0.1) 100%)`}})]})}function pv({label:s,value:t,onChange:i}){return Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:87:5",className:"flex items-center justify-between",children:[Ht.jsx("span",{"code-path":"src\\components\\ControlPanel.tsx:88:7",className:"text-xs text-white/60",children:s}),Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:89:7",className:"flex items-center gap-2",children:[Ht.jsx("input",{"code-path":"src\\components\\ControlPanel.tsx:90:9",type:"color",value:t,onChange:r=>i(r.target.value),className:"w-8 h-8 rounded cursor-pointer border-0 bg-transparent"}),Ht.jsx("span",{"code-path":"src\\components\\ControlPanel.tsx:96:9",className:"text-xs text-white/40 font-mono",children:t})]})]})}function i3({state:s,config:t,setConfig:i}){const r=(l,c)=>{i({...t,[l]:c})};return Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:110:5",className:"fixed right-0 top-0 h-full w-72 bg-[#1a1625]/95 backdrop-blur-xl border-l border-white/10 z-20 flex flex-col",children:[Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:111:7",className:"p-4 border-b border-white/10",children:[Ht.jsx("h1",{"code-path":"src\\components\\ControlPanel.tsx:112:9",className:"text-lg font-bold text-white",children:"NebulaHero"}),Ht.jsxs("p",{"code-path":"src\\components\\ControlPanel.tsx:113:9",className:"text-xs text-white/50",children:["State: ",dv[s]]})]}),Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:116:7",className:"flex-1 overflow-y-auto custom-scrollbar",children:[Ht.jsx(rd,{"code-path":"src\\components\\ControlPanel.tsx:117:9",title:"Status",icon:Ht.jsx(hv,{"code-path":"src\\components\\ControlPanel.tsx:117:49",className:"w-4 h-4 text-purple-400"}),defaultOpen:!0,children:Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:118:11",className:"space-y-2 text-xs text-white/70",children:[Ht.jsxs("p",{"code-path":"src\\components\\ControlPanel.tsx:119:13",children:[Ht.jsx("span",{"code-path":"src\\components\\ControlPanel.tsx:119:16",className:"text-white/40",children:"Current:"})," ",dv[s]]}),Ht.jsx("p",{"code-path":"src\\components\\ControlPanel.tsx:120:13",className:"text-white/40 mt-1",children:"Controls:"}),Ht.jsxs("ul",{"code-path":"src\\components\\ControlPanel.tsx:121:13",className:"list-disc pl-4 space-y-1",children:[Ht.jsx("li",{"code-path":"src\\components\\ControlPanel.tsx:122:15",children:"State 0: Click to begin"}),Ht.jsx("li",{"code-path":"src\\components\\ControlPanel.tsx:123:15",children:"State 1: Hold mouse to charge shell"}),Ht.jsx("li",{"code-path":"src\\components\\ControlPanel.tsx:124:15",children:"State 2: Migrators form spiky shell (3s)"}),Ht.jsx("li",{"code-path":"src\\components\\ControlPanel.tsx:125:15",children:"State 3: Stabilize + planets enter (8s)"}),Ht.jsx("li",{"code-path":"src\\components\\ControlPanel.tsx:126:15",children:"Release early → State 4"})]})]})}),Ht.jsx(rd,{"code-path":"src\\components\\ControlPanel.tsx:131:9",title:"Animation",icon:Ht.jsx(hv,{"code-path":"src\\components\\ControlPanel.tsx:131:52",className:"w-4 h-4 text-green-400"}),children:Ht.jsx("div",{"code-path":"src\\components\\ControlPanel.tsx:132:11",className:"space-y-4",children:Ht.jsx(n3,{"code-path":"src\\components\\ControlPanel.tsx:133:13",label:"Speed",value:t.speed,min:.2,max:3,step:.1,onChange:l=>r("speed",l)})})}),Ht.jsx(rd,{"code-path":"src\\components\\ControlPanel.tsx:144:9",title:"Colors",icon:Ht.jsx(t3,{"code-path":"src\\components\\ControlPanel.tsx:144:49",className:"w-4 h-4 text-pink-400"}),children:Ht.jsxs("div",{"code-path":"src\\components\\ControlPanel.tsx:145:11",className:"space-y-3",children:[Ht.jsx(pv,{"code-path":"src\\components\\ControlPanel.tsx:146:13",label:"Core / Singularity",value:t.centerColor,onChange:l=>r("centerColor",l)}),Ht.jsx(pv,{"code-path":"src\\components\\ControlPanel.tsx:151:13",label:"Ambient / Shell",value:t.ambientColor,onChange:l=>r("ambientColor",l)})]})})]}),Ht.jsx("div",{"code-path":"src\\components\\ControlPanel.tsx:160:7",className:"p-4 border-t border-white/10",children:Ht.jsx("a",{"code-path":"src\\components\\ControlPanel.tsx:161:9",href:"https://evolvehub.gumroad.com/l/nebula-hero-framer-component",target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-lg font-medium text-sm hover:bg-white/90 transition-colors",children:"Buy Now!"})})]})}const mv={0:{header:"I have a Theory",subtext:"A universe exists in each of our minds.Thoughts drift like stardust,until a click of inspiration strikes a spark."},1:{header:"Ideas begin with thoughts that matter.<br>But a spark alone does not become a star.",subtext:"It needs a centre — something solid enough to gather around.<br>A light tap, and the pull begins."},2:{header:"Time. Pressure. Intent",subtext:"An idea starts to hold<br>when its core takes shape."},3:{header:"Then comes the moment <br>when potential is released into light.",subtext:"A kind of star that draws worlds into orbit,<br> finding its place in the universe."},4:{header:"Most ideas burn bright at first,",subtext:"then fade back into the void."}},gv=12,a3=600;function kc(s){const t=[],i=s.split("<br>");return i.forEach((r,l)=>{r&&t.push({type:"text",value:r}),l<i.length-1&&t.push({type:"br",value:"<br>"})}),t}function Wc(s){return s.reduce((t,i)=>t+(i.type==="text"?i.value.length:0),0)}function _v(s,t){let i=Math.max(0,t);const r=[];return s.forEach((l,c)=>{if(l.type==="text"){const h=Math.min(i,l.value.length);h>0&&(r.push(Ht.jsx("span",{"code-path":"src\\components\\StateText.tsx:58:20",children:l.value.slice(0,h)},`t-${c}`)),i-=h)}else l.type==="br"&&r.push(Ht.jsx("br",{"code-path":"src\\components\\StateText.tsx:62:18"},`b-${c}`))}),Ht.jsx(Ht.Fragment,{children:r})}function r3({state:s}){const[t,i]=te.useState([]),r=te.useRef(null),l=te.useRef(s),c=te.useRef(null);return te.useEffect(()=>{l.current=s},[s]),te.useEffect(()=>{const h=s;return i(d=>{if(d.some(v=>v.state===h))return d;const m={state:h,headerCount:0,subtextCount:0,isTyping:!0,opacity:1,translateY:20};return[...d.map(v=>({...v,isTyping:!1,opacity:0,translateY:-30})),m]}),r.current=setTimeout(()=>{i(d=>d.filter(m=>m.state===h||m.opacity>0))},a3+100),()=>{r.current&&clearTimeout(r.current)}},[s]),te.useEffect(()=>{if(!t.find(y=>y.state===s&&y.isTyping))return;const d=mv[s],m=kc(d.header),p=kc(d.subtext),v=Wc(m),x=Wc(p);c.current=s;const g=()=>{if(c.current!==s)return;i(S=>{const _=S.findIndex(N=>N.state===s);if(_===-1)return S;const R=S[_];let D=R.headerCount,L=R.subtextCount,B=R.isTyping;D<v?D+=1:L<x?L+=1:B=!1;const U=[...S];return U[_]={...R,headerCount:D,subtextCount:L,isTyping:B},U});const y=t.find(S=>S.state===s),E=y?y.headerCount>=v:!1,A=y?y.subtextCount>=x:!1;(!E||!A)&&(r.current=setTimeout(()=>{requestAnimationFrame(g)},gv))};return r.current=setTimeout(()=>{requestAnimationFrame(g)},gv),()=>{r.current&&clearTimeout(r.current)}},[t,s]),Ht.jsx("div",{"code-path":"src\\components\\StateText.tsx:193:5",className:"fixed inset-0 z-20 pointer-events-none",children:Ht.jsx("div",{"code-path":"src\\components\\StateText.tsx:194:7",className:"absolute left-[50px] top-1/2 -translate-y-1/2 w-[50vw]",children:t.map(h=>{const d=mv[h.state],m=kc(d.header),p=kc(d.subtext),v=Wc(m),x=Wc(p),g=h.isTyping&&h.headerCount<v,y=h.isTyping&&h.headerCount>=v&&h.subtextCount<x;return Ht.jsxs("div",{"code-path":"src\\components\\StateText.tsx:207:13",className:"absolute left-0 top-0 transition-all duration-500 ease-out",style:{opacity:h.opacity,transform:`translateY(${h.translateY}px)`},children:[Ht.jsxs("h1",{"code-path":"src\\components\\StateText.tsx:215:15",className:"text-[14px] font-bold tracking-wide gradient-text text-left leading-relaxed",style:{textShadow:"0 0 30px rgba(168, 85, 247, 0.5)"},children:[_v(m,h.headerCount),g&&Ht.jsx("span",{"code-path":"src\\components\\StateText.tsx:223:19",className:"inline-block w-0.5 h-[1em] bg-purple-400/80 ml-0.5 align-middle animate-pulse"})]}),Ht.jsxs("p",{"code-path":"src\\components\\StateText.tsx:227:15",className:"mt-2 text-[14px] font-medium tracking-wide text-white/90 text-left leading-relaxed",style:{textShadow:"0 0 20px rgba(255, 255, 255, 0.2)"},children:[_v(p,h.subtextCount),y&&Ht.jsx("span",{"code-path":"src\\components\\StateText.tsx:235:19",className:"inline-block w-0.5 h-[1em] bg-white/80 ml-0.5 align-middle animate-pulse"})]})]},h.state)})})})}function s3(){return Ht.jsx("div",{"code-path":"src\\components\\Footer.tsx:5:5",className:"fixed bottom-4 left-4 z-20",children:Ht.jsxs("a",{"code-path":"src\\components\\Footer.tsx:6:7",href:"https://www.framer.com",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-sm hover:bg-white/20 transition-colors",children:[Ht.jsx(JR,{"code-path":"src\\components\\Footer.tsx:12:9",className:"w-4 h-4"}),Ht.jsx("span",{"code-path":"src\\components\\Footer.tsx:13:9",children:"Made in Framer"})]})})}const o3={speed:1,centerColor:"#ffd700",ambientColor:"#60a5fa"};function l3(){const[s,t]=te.useState(0),[i,r]=te.useState(o3),l=te.useRef(null),c=te.useRef(!1);return te.useEffect(()=>{const h=m=>{"button"in m&&m.button!==0||("touches"in m&&m.preventDefault(),s===0?t(1):s===1&&(t(2),c.current=!0,l.current=setTimeout(()=>{c.current=!1,t(3)},5e3)))},d=()=>{c.current&&(l.current&&clearTimeout(l.current),c.current=!1,t(4))};return window.addEventListener("mousedown",h),window.addEventListener("mouseup",d),window.addEventListener("touchstart",h,{passive:!1}),window.addEventListener("touchend",d),()=>{window.removeEventListener("mousedown",h),window.removeEventListener("mouseup",d),window.removeEventListener("touchstart",h),window.removeEventListener("touchend",d)}},[s]),te.useEffect(()=>{if(s===4){const h=setTimeout(()=>t(1),2500);return()=>clearTimeout(h)}},[s]),Ht.jsxs("div",{"code-path":"src\\App.tsx:73:5",className:"relative w-full h-screen overflow-hidden bg-black select-none",children:[Ht.jsx(HR,{"code-path":"src\\App.tsx:74:7",state:s,config:i}),Ht.jsx(r3,{"code-path":"src\\App.tsx:75:7",state:s}),Ht.jsx(i3,{"code-path":"src\\App.tsx:76:7",state:s,config:i,setConfig:r}),Ht.jsx(s3,{"code-path":"src\\App.tsx:77:7"})]})}xM.createRoot(document.getElementById("root")).render(Ht.jsx(te.StrictMode,{"code-path":"src\\main.tsx:7:3",children:Ht.jsx(l3,{"code-path":"src\\main.tsx:8:5"})}));
