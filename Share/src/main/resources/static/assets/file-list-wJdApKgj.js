import{_ as E,d as O,c as b,w as i,r as l,o as w,e as X,a,f as n,t as c,b as d,m as D,p as B,g as K}from"./index-DlhLkz7x.js";const M={name:"File",data:()=>({dialog:!1,headers:[{align:"start",title:"上传日期",sortable:!1,key:"createTime"},{title:"文件名",sortable:!1,key:"uploadFilename"},{title:"路径",sortable:!1,key:"path"},{title:"大小",sortable:!1,key:"size"},{title:"操作",key:"actions",sortable:!1}],fileList:[],page:1,size:20,pageCount:0,total:0,deleteItemDate:{uploadFilename:""},showDelete:!1,useSize:0,availableDisk:0,snackbar:!1,message:"删除成功",color:"success",showRename:!1,renameFileDate:{uploadFilename:""},newName:"",loading:!0,windowSize:{x:window.innerWidth,y:window.innerHeight},mobileStatus:!1}),created(){const e=parseInt(this.$route.query.page);isNaN(e)||(e<=0?this.page=1:this.page=e),this.initialize(),this.getDiskMessage()},methods:{onResize(){this.windowSize={x:window.innerWidth,y:window.innerHeight},this.windowSize.x<=600?this.mobileStatus=!0:this.mobileStatus=!1},pageChange({page:e,itemsPerPage:t,sortBy:m}){this.loading=!0,this.page=e,this.$router.push({path:this.$router.path,query:{page:e}}),this.initialize()},getDiskMessage(){fetch("/api/upload/disk",{headers:{"Content-Type":"application/json; charset=UTF-8","X-XSRF-TOKEN":this.$cookies.get("XSRF-TOKEN")},method:"GET",credentials:"include"}).then(e=>e.json()).then(e=>{const t=e.data.userDisk/1024/1024;t<1024?this.useSize=t.toFixed(2)+"MB":this.useSize=(t/1024).toFixed(2)+"GB";const m=e.data.availableDisk/1024/1024;m<1024?this.availableDisk=m.toFixed(2)+"MB":this.availableDisk=(m/1024).toFixed(2)+"GB"}).catch(e=>null)},initialize(){fetch(`/api/file/list?page=${this.page}&size=${this.size}`,{headers:{"Content-Type":"application/json; charset=UTF-8","X-XSRF-TOKEN":this.$cookies.get("XSRF-TOKEN")},method:"GET",credentials:"include"}).then(e=>e.json()).then(e=>{for(var t=0;t<e.page.content.length;t++)e.page.content[t].createTime=this.formateTimeToChinese(e.page.content[t].createTime),e.page.content[t].size=this.showSize(e.page.content[t].size);this.fileList=e.page.content,this.total=e.page.totalElements,this.pageCount=e.page.totalPages,this.loading=!1}).catch(e=>null)},editItem(e){this.renameFileDate=e,this.showRename=!0},reNameOk(){console.log("ok"),this.newName!==""&&(this.renameFileDate.uploadFilename=this.newName,this.renameFileDate.size=0,this.renameFileDate.createTime=0,fetch("/api/file/rename",{headers:{"Content-Type":"application/json; charset=UTF-8","X-XSRF-TOKEN":this.$cookies.get("XSRF-TOKEN")},method:"POST",credentials:"include",body:JSON.stringify(this.renameFileDate)}).then(e=>e.json()).then(e=>{e.status===200?(this.message="修改成功！",this.color="success"):(this.message="修改失败！"+e.message,this.color="error"),this.snackbar=!0,this.showRename=!1,this.initialize()}).catch(e=>null))},deleteItem(e){this.deleteItemDate=e,this.showDelete=!0},deleteFile(){console.log(this.deleteItemDate),this.deleteItemDate.size=0,this.deleteItemDate.createTime=0,fetch("/api/file/delete",{headers:{"Content-Type":"application/json; charset=UTF-8","X-XSRF-TOKEN":this.$cookies.get("XSRF-TOKEN")},method:"DELETE",credentials:"include",body:JSON.stringify(this.deleteItemDate)}).then(e=>e.json()).then(e=>{e.status===200?(this.message="删除成功！",this.color="success",this.initialize(),this.getDiskMessage()):(this.message="删除失败！"+e.message,this.color="error"),this.showDelete=!1,this.snackbar=!0,this.initialize(),this.getDiskMessage()}).catch(e=>null)},formateTimeToChinese(e){if(e===""||e==null)return"";const t=new Date(e);return t.getFullYear()+"年"+(t.getMonth()+1)+"月"+t.getDate()+"日 "+t.getHours()+"时"+t.getMinutes()+"分"},showSize(e){return e=e/1024,e<1024?e.toFixed(2)+" KB":(e/1024).toFixed(2)+" M"}}},F=e=>(B("data-v-fd56e5e1"),e=e(),K(),e),P=["href"],x=["href"],L={class:"text-center pt-2"},G=["textContent"],H=F(()=>d("br",null,null,-1)),q=F(()=>d("br",null,null,-1)),J=["textContent"];function W(e,t,m,Y,A,s){const C=l("v-toolbar-title"),T=l("v-divider"),p=l("v-spacer"),r=l("v-btn"),S=l("v-toolbar"),y=l("v-icon"),u=l("v-tooltip"),z=l("v-pagination"),N=l("v-data-table-server"),g=l("v-card-title"),f=l("v-card-text"),v=l("v-card-actions"),_=l("v-card"),k=l("v-dialog"),I=l("v-text-field"),R=l("v-snackbar"),V=l("v-container"),U=O("resize");return w(),b(V,{fluid:""},{default:i(()=>[X((w(),b(N,{density:"compact",headers:e.headers,items:e.fileList,page:e.page,"onUpdate:page":t[1]||(t[1]=o=>e.page=o),"item-value":"createTime","items-per-page":e.size,"onUpdate:itemsPerPage":t[2]||(t[2]=o=>e.size=o),"onUpdate:options":s.pageChange,loading:e.loading,mobile:e.mobileStatus},{top:i(()=>[a(S,{flat:"",color:"white"},{default:i(()=>[a(C,null,{default:i(()=>[n("已使用空间："+c(e.useSize)+" 系统剩余空间："+c(e.availableDisk),1)]),_:1}),a(T,{class:"mx-4",inset:"",vertical:""}),a(p),a(r,{color:"primary",dark:"",class:"mb-2",onClick:s.initialize},{default:i(()=>[n("刷新文件列表")]),_:1},8,["onClick"])]),_:1})]),"item.path":i(({item:o})=>[d("a",{href:`${o.path}?filename=${encodeURIComponent(o.uploadFilename)}&type=inline`,target:"_blank"},c(o.path),9,P)]),"item.actions":i(({item:o})=>[d("a",{href:`${o.path}?filename=${encodeURIComponent(o.uploadFilename)}&type=attachment`,target:"_blank"},[a(y,{class:"mr-2",density:"compact",onClick:h=>e.downloadItem(o),icon:"mdi-download"},null,8,["onClick"])],8,x),a(u,{location:"start",text:"重命名"},{activator:i(({props:h})=>[a(r,D({icon:"mdi-pencil",density:"compact"},h,{onClick:$=>s.editItem(o)}),null,16,["onClick"])]),_:2},1024),a(u,{location:"start",text:"删除文件"},{activator:i(({props:h})=>[a(r,D({density:"compact",icon:"mdi-delete",class:"mr-2"},h,{onClick:$=>s.deleteItem(o)}),null,16,["onClick"])]),_:2},1024)]),"no-data":i(()=>[a(r,{color:"primary",onClick:s.initialize},{default:i(()=>[n("Reset")]),_:1},8,["onClick"])]),bottom:i(()=>[d("div",L,[a(z,{modelValue:e.page,"onUpdate:modelValue":t[0]||(t[0]=o=>e.page=o),color:"blue","total-visible":6,length:e.pageCount,rounded:"circle"},null,8,["modelValue","length"])])]),_:1},8,["headers","items","page","items-per-page","onUpdate:options","loading","mobile"])),[[U,s.onResize]]),a(k,{modelValue:e.showDelete,"onUpdate:modelValue":t[5]||(t[5]=o=>e.showDelete=o),"max-width":"490"},{default:i(()=>[a(_,null,{default:i(()=>[a(g,{class:"headline"},{default:i(()=>[n("你确定要删除这个文件吗？")]),_:1}),a(f,null,{default:i(()=>[d("span",{textContent:c(e.deleteItemDate.uploadFilename)},null,8,G),n(),H,q,n(" 删除后将无法恢复，请谨慎操作！！！ ")]),_:1}),a(v,null,{default:i(()=>[a(p),a(r,{color:"green darken-1",text:"",onClick:t[3]||(t[3]=o=>e.showDelete=!1)},{default:i(()=>[n(" 放弃 ")]),_:1}),a(r,{color:"error",text:"",onClick:t[4]||(t[4]=o=>s.deleteFile())},{default:i(()=>[n(" 确认 ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(k,{modelValue:e.showRename,"onUpdate:modelValue":t[8]||(t[8]=o=>e.showRename=o),"max-width":"490"},{default:i(()=>[a(_,null,{default:i(()=>[a(g,{class:"headline"},{default:i(()=>[n("修改文件名")]),_:1}),a(f,null,{default:i(()=>[n(" 原文件名："),d("span",{textContent:c(e.renameFileDate.uploadFilename)},null,8,J)]),_:1}),a(I,{modelValue:e.newName,"onUpdate:modelValue":t[6]||(t[6]=o=>e.newName=o),variant:"underlined",style:{"margin-right":"20px","margin-left":"20px"},label:"新文件名"},null,8,["modelValue"]),a(v,null,{default:i(()=>[a(p),a(r,{color:"green darken-1",text:"",onClick:t[7]||(t[7]=o=>e.showRename=!1)},{default:i(()=>[n(" 放弃 ")]),_:1}),a(r,{color:"error",text:"",onClick:s.reNameOk},{default:i(()=>[n(" 确认 ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(R,{modelValue:e.snackbar,"onUpdate:modelValue":t[9]||(t[9]=o=>e.snackbar=o),color:e.color,timeout:3e3,top:!0},{default:i(()=>[n(c(e.message),1)]),_:1},8,["modelValue","color"])]),_:1})}const Z=E(M,[["render",W],["__scopeId","data-v-fd56e5e1"]]);export{Z as default};