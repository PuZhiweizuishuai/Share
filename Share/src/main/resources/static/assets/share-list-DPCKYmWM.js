import{_ as x,a as y}from"./show-html-7-6MaXIJ.js";import{a as T}from"./view-log-list-CvwBN07h.js";import{_ as K,o as i,c as m,w as t,a as e,q as L,C as B,F,e as d,i as r,d as f,t as S,j as k,k as u,v as p,b as h,g as M,y as N,x as P,u as b,z as H,V as z,r as A,D as E,E as D,m as q,s as G,f as R}from"./index-eEThDJPZ.js";import{V as c,a as w,b as g,c as _}from"./VCard-Cr7mm8p2.js";import{V as Y}from"./VSwitch-SuM1hbPv.js";const j={name:"ShareList",components:{ShowMarkdown:x,ShowHtml:y,ViewLogTable:T},props:{shareList:{type:Array,default:()=>[]}},data(){return{page:1,length:0,size:15,total:0,showDelete:!1,deleteData:{data:""},auto:!1,snackbar:!1,message:"删除成功",key:"",interval:()=>null,showShareDialog:!1,shareItem:{haveUserSeeKey:!1,userSeeKey:""},showseccussShareDialog:!1,successShareInfo:"",showShareBtn:!1,showShareStatusDilog:!1,showShareStatusItem:{}}},created(){this.checkLogin()},methods:{copy(){navigator.clipboard.writeText(this.successShareInfo)},cancelShare(){this.showShareStatusItem.data="",this.httpPost("/public/share/cancel",this.showShareStatusItem,o=>{o.data?(this.message="取消成功",this.snackbar=!0,this.showShareStatusItem.publicUser=!1,this.showShareStatusDilog=!1):(this.message="取消失败",this.snackbar=!0,this.showShareStatusDilog=!1)})},showShareStatus(o){this.showShareStatusItem=o,this.successShareInfo=`链接：${location.origin}/#/share/share/${this.showShareStatusItem.url}`,this.showShareStatusItem.haveUserSeeKey&&(this.successShareInfo+=`
密码：${this.showShareStatusItem.userSeeKey}`),this.showShareStatusDilog=!0},checkLogin(){this.httpGet("/login/check",o=>{o.status==200?this.showShareBtn=!0:this.showShareBtn=!1})},showShareInfo(o){this.showShareDialog=!0,this.shareItem=o},sendSaveShare(){this.httpPost("/public/share",this.shareItem,o=>{o.data!=null?(this.successShareInfo=`链接：${location.origin}/#/share/share/${o.data.url}`,this.shareItem.haveUserSeeKey&&(this.successShareInfo+=`
密码：${this.shareItem.userSeeKey}`),this.showseccussShareDialog=!0,this.showShareDialog=!1):(this.message=o.message,this.snackbar=!0)})},deleteShare(){this.httpPost("/share/delete",this.deleteData,o=>{o.status===200?(this.message="删除成功！",this.snackbar=!0,this.showDelete=!1,this.$emit("delete",!0)):(this.message="删除失败！"+o.message,this.snackbar=!0,this.$emit("delete",!1))})},showDeleteDialog(o){this.deleteData=o,this.showDelete=!0},formateTimeToChinese(o){if(o===""||o==null)return"";const l=new Date(o);return l.getFullYear()+"年"+(l.getMonth()+1)+"月"+l.getDate()+"日 "+l.getHours()+"时"+l.getMinutes()+"分"},subString(o){return o.length>30?o.substring(0,30)+"......":o}}},J=["textContent"],O=["textContent"],Q=f("br",null,null,-1),W=f("br",null,null,-1),X=["textContent"],Z=f("br",null,null,-1);function $(o,l,C,ee,a,n){const I=y,v=x,U=A("ViewLogTable");return i(),m(z,null,{default:t(()=>[e(d,null,{default:t(()=>[(i(!0),L(F,null,B(C.shareList,s=>(i(),m(h,{key:s.id,cols:"12"},{default:t(()=>[e(c,null,{default:t(()=>[e(_,{style:{"padding-bottom":"0px","padding-top":"0px"}},{default:t(()=>[e(d,null,{default:t(()=>[e(h,{style:{"padding-bottom":"0px","padding-top":"0px"}},{default:t(()=>[e(E,null,{default:t(()=>[r("创建时间： "),f("span",{textContent:S(n.formateTimeToChinese(s.createTime))},null,8,J)]),_:2},1024)]),_:2},1024),e(h,{style:{"padding-bottom":"0px","padding-top":"0px"}},{default:t(()=>[e(u,{style:{float:"right"},end:"",text:"",small:"",color:"error",onClick:V=>n.showDeleteDialog(s)},{default:t(()=>[e(D,{icon:"mdi-delete"}),r(" 删除 ")]),_:2},1032,["onClick"]),a.showShareBtn&&(s.publicUser==!1||s.publicUser==null)?(i(),m(u,{key:0,onClick:V=>n.showShareInfo(s),style:{float:"right"},end:"",text:"",small:"",color:"blue"},{default:t(()=>[e(D,{icon:"mdi-share"}),r(" 分享 ")]),_:2},1032,["onClick"])):b("",!0),s.publicUser?(i(),m(q,{key:1,location:"top",text:"点击查看共享状态"},{activator:t(({props:V})=>[e(u,G({ref_for:!0},V,{onClick:te=>n.showShareStatus(s),style:{float:"right"},small:"",color:"deep-purple"}),{default:t(()=>[e(D,{icon:"mdi-information-slab-symbol"}),r(" 已共享 ")]),_:2},1040,["onClick"])]),_:2},1024)):b("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1024),e(R),e(g,null,{default:t(()=>[s.editType==1?(i(),m(I,{key:0,text:s.data},null,8,["text"])):(i(),m(v,{key:1,markdown:s.data,speech:!1},null,8,["markdown"]))]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1}),e(p,{modelValue:a.showDelete,"onUpdate:modelValue":l[2]||(l[2]=s=>a.showDelete=s),"max-width":"490"},{default:t(()=>[e(c,null,{default:t(()=>[e(w,{class:"headline"},{default:t(()=>[r("你确定要删除这条分享吗？")]),_:1}),e(g,null,{default:t(()=>[f("span",{textContent:S(n.subString(a.deleteData.data))},null,8,O),r(),Q,W,r(" 删除后将无法恢复，请谨慎操作！！！ ")]),_:1}),e(_,null,{default:t(()=>[e(k),e(u,{color:"green darken-1",text:"",onClick:l[0]||(l[0]=s=>a.showDelete=!1)},{default:t(()=>[r(" 放弃 ")]),_:1}),e(u,{color:"error",text:"",onClick:l[1]||(l[1]=s=>n.deleteShare())},{default:t(()=>[r(" 确认 ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(p,{modelValue:a.showShareDialog,"onUpdate:modelValue":l[7]||(l[7]=s=>a.showShareDialog=s),"max-width":"490"},{default:t(()=>[e(c,null,{default:t(()=>[e(w,{class:"headline"},{default:t(()=>[r("你要将这条分享出去吗？")]),_:1}),e(g,null,{default:t(()=>[f("p",null,[f("span",{textContent:S(n.subString(a.shareItem.data))},null,8,X),Z,r(" 分享后在任何人均可查看 ")]),f("p",null,[e(d,{justify:"center"},{default:t(()=>[e(h,null,{default:t(()=>[e(Y,{modelValue:a.shareItem.haveUserSeeKey,"onUpdate:modelValue":l[3]||(l[3]=s=>a.shareItem.haveUserSeeKey=s),color:"blue",label:"是否启用密码"},null,8,["modelValue"])]),_:1})]),_:1}),M(e(d,{justify:"center"},{default:t(()=>[e(h,null,{default:t(()=>[e(P,{modelValue:a.shareItem.userSeeKey,"onUpdate:modelValue":l[4]||(l[4]=s=>a.shareItem.userSeeKey=s),placeholder:"密码",label:"密码",clearable:"",variant:"underlined"},null,8,["modelValue"])]),_:1})]),_:1},512),[[N,a.shareItem.haveUserSeeKey]])])]),_:1}),e(_,null,{default:t(()=>[e(k),e(u,{color:"green darken-1",text:"",onClick:l[5]||(l[5]=s=>a.showShareDialog=!1)},{default:t(()=>[r(" 放弃 ")]),_:1}),e(u,{color:"error",text:"",onClick:l[6]||(l[6]=s=>n.sendSaveShare())},{default:t(()=>[r(" 确认 ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(p,{modelValue:a.showseccussShareDialog,"onUpdate:modelValue":l[9]||(l[9]=s=>a.showseccussShareDialog=s),"max-width":"490"},{default:t(()=>[e(c,null,{default:t(()=>[e(w,{class:"headline"},{default:t(()=>[r("分享成功，复制下面内容给你的好友吧！")]),_:1}),e(g,null,{default:t(()=>[e(d,null,{default:t(()=>[e(h,null,{default:t(()=>[r(S(a.successShareInfo),1)]),_:1})]),_:1}),e(d,null,{default:t(()=>[e(h,null,{default:t(()=>[e(u,{color:"blue-lighten-5",onClick:l[8]||(l[8]=s=>n.copy())},{default:t(()=>[r("复制")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(p,{modelValue:a.showShareStatusDilog,"onUpdate:modelValue":l[13]||(l[13]=s=>a.showShareStatusDilog=s),"max-width":"1000"},{default:t(()=>[e(c,null,{default:t(()=>[e(w,{class:"headline"},{default:t(()=>[r("分享状态")]),_:1}),e(g,null,{default:t(()=>[e(d,null,{default:t(()=>[e(h,null,{default:t(()=>[r(S(a.successShareInfo),1)]),_:1})]),_:1}),e(d,null,{default:t(()=>[e(h,null,{default:t(()=>[e(u,{color:"blue-lighten-5",onClick:l[10]||(l[10]=s=>n.copy())},{default:t(()=>[r("复制")]),_:1})]),_:1})]),_:1}),e(U,{target:a.showShareStatusItem.id,types:0},null,8,["target"])]),_:1}),e(_,null,{default:t(()=>[e(k),e(u,{color:"green darken-1",text:"",onClick:l[11]||(l[11]=s=>a.showShareStatusDilog=!1)},{default:t(()=>[r(" 关闭 ")]),_:1}),a.showShareBtn?(i(),m(u,{key:0,color:"error",text:"",onClick:l[12]||(l[12]=s=>n.cancelShare())},{default:t(()=>[r(" 取消分享 ")]),_:1})):b("",!0)]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(H,{modelValue:a.snackbar,"onUpdate:modelValue":l[14]||(l[14]=s=>a.snackbar=s),color:"success",timeout:3e3,top:!0},{default:t(()=>[r(S(a.message),1)]),_:1},8,["modelValue"])]),_:1})}const ne=K(j,[["render",$]]);export{ne as S};