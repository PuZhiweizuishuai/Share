import{G as E,H as O,I as W,J as V,K as G,L as H,M as J,N as K,O as g,P as Q,Q as X,R as $,S as w,a as t,s as y,F as j,T as q,U as Y,E as Z,W as ee,X as te}from"./index-eEThDJPZ.js";import{m as ae,V as C}from"./VSelect-I7fLT9OC.js";const le=E({indeterminate:Boolean,inset:Boolean,flat:Boolean,loading:{type:[Boolean,String],default:!1},...O(),...ae()},"VSwitch"),ne=W()({name:"VSwitch",inheritAttrs:!1,props:le(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,b){let{attrs:S,slots:a}=b;const n=V(e,"indeterminate"),s=V(e,"modelValue"),{loaderClasses:P}=G(e),{isFocused:_,focus:I,blur:F}=H(e),m=J(),h=K&&window.matchMedia("(forced-colors: active)").matches,x=g(()=>typeof e.loading=="string"&&e.loading!==""?e.loading:e.color),A=Q(),B=g(()=>e.id||`switch-${A}`);function R(){n.value&&(n.value=!1)}function M(i){var u,r;i.stopPropagation(),i.preventDefault(),(r=(u=m.value)==null?void 0:u.input)==null||r.click()}return X(()=>{const[i,u]=$(S),r=w.filterProps(e),N=C.filterProps(e);return t(w,y({class:["v-switch",{"v-switch--flat":e.flat},{"v-switch--inset":e.inset},{"v-switch--indeterminate":n.value},P.value,e.class]},i,r,{modelValue:s.value,"onUpdate:modelValue":c=>s.value=c,id:B.value,focused:_.value,style:e.style}),{...a,default:c=>{let{id:U,messagesId:p,isDisabled:z,isReadonly:D,isValid:k}=c;const d={model:s,isValid:k};return t(C,y({ref:m},N,{modelValue:s.value,"onUpdate:modelValue":[o=>s.value=o,R],id:U.value,"aria-describedby":p.value,type:"checkbox","aria-checked":n.value?"mixed":void 0,disabled:z.value,readonly:D.value,onFocus:I,onBlur:F},u),{...a,default:o=>{let{backgroundColorClasses:v,backgroundColorStyles:l}=o;return t("div",{class:["v-switch__track",h?void 0:v.value],style:l.value,onClick:M},[a["track-true"]&&t("div",{key:"prepend",class:"v-switch__track-true"},[a["track-true"](d)]),a["track-false"]&&t("div",{key:"append",class:"v-switch__track-false"},[a["track-false"](d)])])},input:o=>{let{inputNode:v,icon:l,backgroundColorClasses:L,backgroundColorStyles:T}=o;return t(j,null,[v,t("div",{class:["v-switch__thumb",{"v-switch__thumb--filled":l||e.loading},e.inset||h?void 0:L.value],style:e.inset?void 0:T.value},[a.thumb?t(q,{defaults:{VIcon:{icon:l,size:"x-small"}}},{default:()=>[a.thumb({...d,icon:l})]}):t(Y,null,{default:()=>[e.loading?t(ee,{name:"v-switch",active:!0,color:k.value===!1?void 0:x.value},{default:f=>a.loader?a.loader(f):t(te,{active:f.isActive,color:f.color,indeterminate:!0,size:"16",width:"2"},null)}):l&&t(Z,{key:String(l),icon:l,size:"x-small"},null)]})])])}})}})}),{}}});export{ne as V};