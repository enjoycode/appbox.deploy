(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49044cca"],{"276a":function(t,e,a){"use strict";var i=a("9893"),s=a.n(i);s.a},"87c8":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"ossStoreHeader"},[a("e-radio-group",{staticStyle:{"margin-left":"40px"},attrs:{fill:"#0994ff",size:"small"},model:{value:t.storeView,callback:function(e){t.storeView=e},expression:"storeView"}},[a("e-radio-button",{attrs:{label:"reportView"}},[t._v("统计信息")]),a("e-radio-button",{attrs:{label:"listView"}},[t._v("文件管理")])],1)],1),a("div",{staticClass:"ossStoreContent"},["reportView"===t.storeView?a("table",{staticStyle:{"font-size":"14px"},attrs:{cellspacing:"15px"}},[t._m(0)]):t._e(),"listView"===t.storeView?a("list-view",{ref:"storeView",attrs:{storeName:t.target.App}}):t._e()],1)])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",[t._v("待实现")]),a("td")])}],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"toolbar"},[a("e-breadcrumb",{staticClass:"sep-path"},t._l(t.sepPaths,function(e){return a("e-breadcrumb-item",{key:e.Path},[a("a",{on:{click:function(a){return t.onSepPathClick(e.Path)}}},[t._v(t._s(e.Name))])])}),1),a("div",{staticClass:"toolbar-right"},[a("e-input",{staticClass:"searchInput",attrs:{size:"small",placeholder:"输入路径前缀匹配"},model:{value:t.keyWords,callback:function(e){t.keyWords=e},expression:"keyWords"}},[a("e-button",{attrs:{slot:"append",icon:"fas fa-search"},on:{click:t.onSearch},slot:"append"})],1),a("e-button-group",[a("e-button",{attrs:{type:"primary",size:"small",icon:"fas fa-upload"},on:{click:function(e){t.uploadDlgVisible=!0}}},[t._v(" 上传")]),a("e-button",{attrs:{disabled:t.preBtnVisible,type:"primary",size:"small",icon:"fas fa-angle-left"},on:{click:t.onPrePage}},[t._v("上一页")]),a("e-button",{attrs:{disabled:t.nextBtnVisible,type:"primary",size:"small"},on:{click:t.onNextPage}},[t._v("下一页"),a("i",{staticClass:"fas fa-angle-right"})])],1)],1),a("div",{staticStyle:{clear:"both"}})],1),a("e-table",{attrs:{border:"",data:t.resultData,stripe:!0},on:{"row-click":t.onRowClick}},[a("e-table-column",{attrs:{prop:"Name",label:"Name"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("i",{class:t.objectIcon(e.row)}),a("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.Name))])]}}])}),a("e-table-column",{attrs:{prop:"Size",formatter:t.formatSize,label:"Size"}}),a("e-table-column",{attrs:{prop:"ModifiedTime",formatter:t.formatDate,label:"LastModified"}}),a("e-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("e-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.onDownload(e.row)}}},[t._v("下载")]),a("e-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.onDelete(e.row)}}},[t._v("删除")])]}}])})],1),a("e-dialog",{attrs:{title:"上传文件",visible:t.uploadDlgVisible,width:"400px"},on:{"update:visible":function(e){t.uploadDlgVisible=e}}},[a("span",[t._v("目标路径: "),a("e-input",{attrs:{size:"small",placeholder:"空上传至当前路径"},model:{value:t.uploadPath,callback:function(e){t.uploadPath=e},expression:"uploadPath"}})],1),a("e-upload",{attrs:{drag:"",action:t.uploadUrl,multiple:!1}},[a("i",{staticClass:"el-icon-upload"}),a("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),a("em",[t._v("点击上传")])]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("不超过64Mb")])]),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("e-button",{attrs:{type:"primary"},on:{click:function(e){t.uploadDlgVisible=!1}}},[t._v("关闭")])],1)],1)],1)},o=[],r=(a("a481"),a("28a5"),{props:{storeName:{type:String,required:!0}},data:function(){return{resultData:[],keyWords:"",curPath:"/",preBtnVisible:!1,nextBtnVisible:!1,uploadDlgVisible:!1,uploadPath:""}},computed:{sepPaths:function(){var t=[{Name:"Home",Path:"/"}];if("/"===this.curPath)return t;for(var e=this.curPath.split("/"),a=1;a<e.length;++a){var i=e.slice(0,a+1).join("/");t.push({Name:e[a],Path:i})}return t},uploadUrl:function(){var t="/blob/dev/"+this.storeName;return""===this.uploadPath?"/"!==this.curPath&&(t+=this.curPath):"/"!==this.uploadPath&&(t+=this.uploadPath),t}},methods:{listObjects:function(){var t=this;$runtime.channel.invoke("sys.DesignService.GetBlobObjects",[this.storeName,this.curPath]).then(function(e){t.resultData=e}).catch(function(e){t.$message.error(e)})},onSearch:function(){this.listObjects()},onSepPathClick:function(t){this.curPath=t,this.listObjects()},onDownload:function(t){window.location.href="/api/Blob/Download?storeName="+this.storeName+"&path="+this.curPath+t.Name},onDelete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a=e;$runtime.channel.invoke("sys.DesignService.DeleteBlobObject",[e.storeName,e.curPath+t.Name]).then(function(t){e.$message({type:"success",message:"删除成功!"}),a.listObjects()}).catch(function(t){a.$message.error(t)})}).catch(function(){})},onPrePage:function(){},onNextPage:function(){},onRowClick:function(t,e,a){t.IsFile||("/"===this.curPath?this.curPath+=t.Name:this.curPath+="/"+t.Name,this.listObjects())},formatDate:function(t,e,a){if(a&&"/"!==t.Name.charAt(t.Name.length-1)){var i=new Date(+new Date(a)+288e5).toISOString().replace(/T/g," ").replace(/\.[\d]{3}Z/,"");return i}return null},formatSize:function(t,e,a){if(a){var i=a/1024;return i.toFixed(3)+"KB"}return null},objectIcon:function(t){return t.IsFile?"fas fa-file":"fas fa-folder"}},mounted:function(){this.listObjects()}}),l=r,c=(a("f26e"),a("2877")),u=Object(c["a"])(l,n,o,!1,null,"503ba112",null),p=u.exports,f={props:{target:{type:Object,required:!0}},components:{ListView:p},data:function(){return{storeView:"listView"}}},d=f,h=(a("276a"),Object(c["a"])(d,i,s,!1,null,"c4353040",null));e["default"]=h.exports},9893:function(t,e,a){},d167:function(t,e,a){},f26e:function(t,e,a){"use strict";var i=a("d167"),s=a.n(i);s.a}}]);