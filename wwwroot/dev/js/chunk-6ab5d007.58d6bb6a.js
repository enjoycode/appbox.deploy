(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ab5d007"],{"3f5c":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{height:"100%"}},[a("div",{staticClass:"header"},[a("span",[e._v(e._s(e.storeTitle))]),a("e-radio-group",{staticStyle:{"margin-left":"40px"},attrs:{fill:"#0994ff",size:"small"},model:{value:e.activeView,callback:function(t){e.activeView=t},expression:"activeView"}},e._l(e.views,function(t){return a("e-radio-button",{key:t.label,attrs:{label:t.label}},[e._v(e._s(t.title))])}),1)],1),a("div",{staticClass:"content"},[a("e-splitter",{directives:[{name:"show",rawName:"v-show",value:"members"===e.activeView,expression:"activeView==='members'"}],attrs:{minSize:300,handlerColor:"#f1f1f1",size:300}},[a("e-table",{ref:"memberTable",staticClass:"members",attrs:{slot:"panel1",data:e.members,height:"100%",stripe:"","highlight-current-row":"",border:""},on:{"current-change":e.currentRowChange},slot:"panel1"},[a("e-table-column",{attrs:{prop:"Name",label:"Name",width:"180",align:"center"}}),a("e-table-column",{attrs:{prop:"Type",formatter:e.entityMemberTypeFormat,label:"Type",width:"180",align:"center"}}),a("e-table-column",{attrs:{prop:"AllowNull",label:"AllowNull",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("e-checkbox",{attrs:{disabled:""},model:{value:t.row.AllowNull,callback:function(a){e.$set(t.row,"AllowNull",a)},expression:"scope.row.AllowNull"}})]}}])}),a("e-table-column",{attrs:{prop:"LocalizedName",label:"LocalizeName",align:"center"}})],1),a("div",{staticClass:"ide-property-panel",attrs:{slot:"panel2"},slot:"panel2"},[a("e-collapse",{staticClass:"ide-property-collapse",attrs:{value:e.collapseValue}},[a("e-collapse-item",{attrs:{title:"Entity Properties",name:"1"}},[a("e-form",{attrs:{"label-position":"right",size:"mini","label-width":"120px"}},[a("e-form-item",{attrs:{label:"ID"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.target.ID,callback:function(t){e.$set(e.target,"ID",t)},expression:"target.ID"}})],1),a("e-form-item",{attrs:{label:"LocalizedName"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.target.LocalizedName,callback:function(t){e.$set(e.target,"LocalizedName",t)},expression:"target.LocalizedName"}})],1),a("e-form-item",{attrs:{label:"AppID"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.target.AppID,callback:function(t){e.$set(e.target,"AppID",t)},expression:"target.AppID"}})],1),a("e-form-item",{attrs:{label:"Model Name"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.target.Text,callback:function(t){e.$set(e.target,"Text",t)},expression:"target.Text"}})],1),a("e-form-item",{attrs:{label:"SortNo"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.target.SortNo,callback:function(t){e.$set(e.target,"SortNo",t)},expression:"target.SortNo"}})],1),a("e-form-item",{attrs:{label:"ToString"}},[a("e-button",{staticStyle:{width:"100%"},on:{click:e.onOpenExpressionEditor}},[e._v("Edit Expression")])],1)],1)],1),null!==e.currentMemberTitle?a("e-collapse-item",{attrs:{title:e.currentMemberTitle,name:"2"}},[a(e.currentMemberDesigner,{tag:"component",attrs:{target:e.currentMember,"model-id":e.target.ID},on:{"update:target":function(t){e.currentMember=t}}})],1):e._e()],1)],1)],1),"options"===e.activeView?a("entity-options",{ref:"optionsView",attrs:{target:e.target,members:e.members,options:e.options}}):e._e(),"data"===e.activeView?a("entity-data-view",{ref:"dataView",attrs:{target:e.target,members:e.members}}):e._e()],1),e.expressionDialog?a(e.expressionDialog,{tag:"component",attrs:{ownerType:"EntityModel",ownerID:e.target.ID,propertyName:"ToStringExpression"},on:{close:e.onCloseExpressionEditor}}):e._e()],1)},r=[],i=(a("7514"),a("2b0e")),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("e-form",{attrs:{model:e.target,size:"mini","label-position":"right","label-width":"120px"}},[a("e-form-item",{attrs:{prop:"Name",label:"Name"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.Name,callback:function(t){e.Name=t},expression:"Name"}})],1),a("e-form-item",{attrs:{label:"LocalizedName"}},[a("e-input",{model:{value:e.LocalizedName,callback:function(t){e.LocalizedName=t},expression:"LocalizedName"}})],1),a("e-form-item",{attrs:{label:"RefModelIDs"}},[a("e-select",{attrs:{multiple:!0,disabled:!0},model:{value:e.RefModelIDs,callback:function(t){e.RefModelIDs=t},expression:"RefModelIDs"}},e._l(e.RefModelIDs,function(e){return a("e-option",{key:e,attrs:{label:e,value:e}})}),1)],1),a("e-form-item",{attrs:{label:"Delete Action"}},[a("e-select",{attrs:{disabled:e.target.IsAggregationRef},model:{value:e.DeleteRule,callback:function(t){e.DeleteRule=t},expression:"DeleteRule"}},e._l(e.DeleteRules,function(e){return a("e-option",{key:e.value,attrs:{label:e.text,value:e.value}})}),1)],1),a("e-form-item",{attrs:{label:"AllowNull"}},[a("e-checkbox",{model:{value:e.AllowNull,callback:function(t){e.AllowNull=t},expression:"AllowNull"}})],1)],1)},o=[],s=[{text:"NoAction",value:0},{text:"Cascade",value:1},{text:"SetNull",value:2}],c={data:function(){return{DeleteRules:s,Name:this.target.Name,LocalizedName:this.target.LocalizedName,RefModelIDs:this.target.RefModelIDs,DeleteRule:this.target.DeleteRule,AllowNull:this.target.AllowNull}},watch:{target:function(e){this.Name=e.Name,this.LocalizedName=e.LocalizedName,this.RefModelIDs=e.RefModelIDs},LocalizedName:function(e,t){this.propertyChanged("LocalizedName",e)},DeleteRule:function(e,t){this.propertyChanged("DeleteRule",e)},AllowNull:function(e,t){this.propertyChanged("AllowNull",e)}},props:{target:{type:Object,required:!0},modelId:{type:String,required:!0}},methods:{propertyChanged:function(e,t){var a=this,n=this;$runtime.channel.invoke("sys.DesignService.ChangeEntityMember",[this.modelId,this.Name,e,t]).then(function(n){a.$emit("PropertyChanged",e,t)}).catch(function(e){n.$message.error(e)})}}},u=c,m=a("2877"),d=Object(m["a"])(u,l,o,!1,null,null,null),p=d.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("e-form",{attrs:{model:e.target,"label-position":"right",size:"mini","label-width":"120px"}},[a("e-form-item",{attrs:{prop:"Name",label:"Name"}},[a("e-input",{attrs:{disabled:!0,value:e.target.Name}})],1),a("e-form-item",{attrs:{label:"LocalizedName"}},[a("e-input",{on:{change:e.onLocalizedNameChanged},model:{value:e.target.LocalizedName,callback:function(t){e.$set(e.target,"LocalizedName",t)},expression:"target.LocalizedName"}})],1),a("e-form-item",{attrs:{prop:"DataType",required:!0,label:"DataType"}},[a("e-select",{attrs:{disabled:!0},on:{change:e.onDataTypeChanged},model:{value:e.target.DataType,callback:function(t){e.$set(e.target,"DataType",t)},expression:"target.DataType"}},e._l(e.DataFieldTypes,function(e){return a("e-option",{key:e.value,attrs:{label:e.text,value:e.value}})}),1)],1),8===e.target.DataType?a("e-form-item",{attrs:{prop:"EnumModelID",required:!0,label:"EnumModelID"}},[a("e-select",{attrs:{placeholder:"请选择"},on:{change:e.onEnumModelIDChanged},model:{value:e.target.EnumModelID,callback:function(t){e.$set(e.target,"EnumModelID",t)},expression:"target.EnumModelID"}},e._l(e.enums,function(e){return a("e-option",{key:e.ID,attrs:{label:e.ID,value:e.ID}})}),1)],1):e._e(),e.canEditAllowNull?a("e-form-item",{attrs:{label:"AllowNull"}},[a("e-checkbox",{on:{change:e.onAllowNullChanged},model:{value:e.target.AllowNull,callback:function(t){e.$set(e.target,"AllowNull",t)},expression:"target.AllowNull"}})],1):e._e()],1)},f=[],b=a("9c14"),g={data:function(){return{DataFieldTypes:b["a"],enums:[],suspendChanges:!1}},props:{target:{type:Object,required:!0},modelId:{type:String,required:!0}},watch:{target:function(e,t){this.suspendChanges=!0;var a=this;this.$nextTick(function(){a.suspendChanges=!1})}},computed:{canEditAllowNull:function(){return!1}},methods:{loadEnums:function(){if(8===this.target.DataType&&0===this.enums.length){var e=this;$runtime.channel.invoke("sys.DesignService.GetAllEnumModels",[]).then(function(t){e.enums=t}).catch(function(){e.$message.error("加载所有枚举模型失败")})}},onLocalizedNameChanged:function(e){this.propertyChanged("LocalizedName",this.target.LocalizedName)},onDataTypeChanged:function(e){this.loadEnums(),this.propertyChanged("DataType",this.target.DataType)},onEnumModelIDChanged:function(e){this.propertyChanged("EnumModelID",this.target.EnumModelID)},onLengthChanged:function(e){this.propertyChanged("Length",this.target.Length)},onScaleChanged:function(e){this.propertyChanged("Scale",this.target.Scale)},onAllowNullChanged:function(e){this.propertyChanged("AllowNull",this.target.AllowNull)},propertyChanged:function(e,t){if(!this.suspendChanges){var a=this;$runtime.channel.invoke("sys.DesignService.ChangeEntityMember",[this.modelId,this.target.Name,e,t]).catch(function(e){a.$message.error(e)})}}},mounted:function(){this.loadEnums()}},y=g,N=Object(m["a"])(y,h,f,!1,null,null,null),v=N.exports,D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("e-form",{attrs:{model:e.target,size:"mini","label-position":"right","label-width":"120px"}},[a("e-form-item",{attrs:{prop:"Name",label:"Name"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.Name,callback:function(t){e.Name=t},expression:"Name"}})],1),a("e-form-item",{attrs:{label:"LocalizedName"}},[a("e-input",{model:{value:e.LocalizedName,callback:function(t){e.LocalizedName=t},expression:"LocalizedName"}})],1),a("e-form-item",{attrs:{label:"RefModelID"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.RefModelID,callback:function(t){e.RefModelID=t},expression:"RefModelID"}})],1)],1)},w=[],x={data:function(){return{Name:this.target.Name,LocalizedName:this.target.LocalizedName,RefModelID:this.target.RefModelID}},watch:{target:function(e){this.Name=e.Name,this.LocalizedName=e.LocalizedName,this.RefModelID=e.RefModelID},LocalizedName:function(e,t){this.propertyChanged("LocalizedName",e)}},props:{target:{type:Object,required:!0},modelId:{type:String,required:!0}},methods:{propertyChanged:function(e,t){var a=this,n=this;$runtime.channel.invoke("sys.DesignService.ChangeEntityMember",[this.modelId,this.Name,e,t]).then(function(n){a.$emit("PropertyChanged",e,t)}).catch(function(e){n.$message.error(e)})}},mounted:function(){}},C=x,I=Object(m["a"])(C,D,w,!1,null,null,null),k=I.exports,M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("e-form",{attrs:{"label-position":"right",size:"mini","label-width":"120px"}},[a("e-form-item",{attrs:{prop:"Name",label:"Name"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.Name,callback:function(t){e.Name=t},expression:"Name"}})],1),a("e-form-item",{attrs:{label:"LocalizedName"}},[a("e-input",{model:{value:e.LocalizedName,callback:function(t){e.LocalizedName=t},expression:"LocalizedName"}})],1),a("e-form-item",{attrs:{label:"AllowNull"}},[a("e-checkbox",{model:{value:e.AllowNull,callback:function(t){e.AllowNull=t},expression:"AllowNull"}})],1)],1)},T=[],E={data:function(){return{Name:this.target.Name,LocalizedName:this.target.LocalizedName,AllowNull:this.target.AllowNull}},props:{target:{type:Object,required:!0}},computed:{},watch:{target:function(e){this.Name=e.Name,this.LocalizedName=e.LocalizedName,this.AllowNull=e.AllowNull}},methods:{}},z=E,$=Object(m["a"])(z,M,T,!1,null,null,null),L=$.exports,_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("e-form",{attrs:{"label-position":"right",size:"mini","label-width":"120px"}},[a("e-form-item",{attrs:{prop:"Name",label:"Name"}},[a("e-input",{attrs:{disabled:!0},model:{value:e.Name,callback:function(t){e.Name=t},expression:"Name"}})],1),a("e-form-item",{attrs:{label:"LocalizedName"}},[a("e-input",{model:{value:e.LocalizedName,callback:function(t){e.LocalizedName=t},expression:"LocalizedName"}})],1),a("e-form-item",{attrs:{prop:"DataType",required:!0,label:"DataType"}},[a("e-select",{attrs:{placeholder:"请选择"},model:{value:e.DataType,callback:function(t){e.DataType=t},expression:"DataType"}},e._l(e.DataFieldTypes,function(e){return a("e-option",{key:e.value,attrs:{label:e.text,value:e.value}})}),1)],1)],1)},S=[],O={data:function(){return{DataFieldTypes:b["a"],Name:this.target.Name,LocalizedName:this.target.LocalizedName,DataType:this.target.DataType}},props:{target:{type:Object,required:!0},modelId:{type:String,required:!0}},watch:{target:function(e){this.Name=e.Name,this.LocalizedName=e.LocalizedName,this.DataType=e.DataType},LocalizedName:function(e,t){this.onPropertyChanged("LocalizedName",e)},DataType:function(e,t){this.onPropertyChanged("DataType",e)}},methods:{onPropertyChanged:function(e,t){var a=this,n=this;$runtime.channel.invoke("sys.DesignService.ChangeEntityMember",[this.modelId,this.Name,e,t]).then(function(n){a.$emit("PropertyChanged",e,t)}).catch(function(e){n.$message.error(e)})}}},A=O,P=Object(m["a"])(A,_,S,!1,null,null,null),R=P.exports,q=function(e){return e?[{text:"DataField",value:0}]:[{text:"DataField",value:0},{text:"EntityRef",value:2},{text:"EntitySet",value:3}]},K=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"view"},[a("h3",[e._v("Partitions:")]),a("e-form",{attrs:{"label-width":"200px",size:"small"}},[a("e-form-item",{attrs:{label:"Partition Keys:"}},[a("e-select",{attrs:{"value-key":"Name",multiple:""},on:{change:e.onPartitionKeysChanged},model:{value:e.options.PartitionKeys,callback:function(t){e.$set(e.options,"PartitionKeys",t)},expression:"options.PartitionKeys"}},e._l(e.allPartitionKeys,function(t){return a("e-option",{key:t.Name,attrs:{label:t.Name,value:{MemberId:t.MemberId,Name:t.Name,OrderByDesc:t.OrderByDesc},disabled:e.disabledMember(e.options,t.Name)}})}),1)],1),a("e-form-item",{attrs:{label:"Partition Orders:"}},e._l(e.options.PartitionKeys,function(t){return a("span",{key:t.Name},[e._v(e._s(t.Name)+":\n                "),a("e-switch",{attrs:{"active-text":"DESC","inactive-text":"ASC"},on:{change:e.onPartitionKeysChanged},model:{value:t.OrderByDesc,callback:function(a){e.$set(t,"OrderByDesc",a)},expression:"item.OrderByDesc"}}),e._v("\n                 \n            ")],1)}),0)],1),a("h3",[e._v("Indexs:")]),a("e-table",{attrs:{data:e.options.Indexes,"highlight-current-row":"",border:"","empty-text":" "},on:{"current-change":e.onCurrentChanged}},[a("e-table-column",{attrs:{prop:"Name",label:"Name",width:"300",align:"center"}}),a("e-table-column",{attrs:{prop:"Fields",label:"Fields",formatter:e.indexFieldsFormat}}),a("e-table-column",{attrs:{prop:"Unique",label:"Unique",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("e-checkbox",{attrs:{disabled:""},model:{value:t.row.Unique,callback:function(a){e.$set(t.row,"Unique",a)},expression:"scope.row.Unique"}})]}}])})],1)],1)},j=[],F=(a("ac6a"),a("f499")),V=a.n(F),B={props:{target:{type:Object,required:!0},members:{type:Array,required:!0},options:{type:Object,required:!0}},computed:{allPartitionKeys:function(){for(var e=[],t=0;t<this.members.length;t++)e.push({MemberId:this.members[t].ID,Name:this.members[t].Name,OrderByDesc:!1});return e}},data:function(){return{currentIndex:null,oldPartitionKeys:[]}},methods:{indexFieldsFormat:function(e,t,a){for(var n=this,r="",i=function(e){var t=a[e];0!==e&&(r+="; "),r+=n.members.find(function(e){return e.ID===t.MID}).Name+" ",r+=t.OrderByDesc?"DESC":"ASC"},l=0;l<a.length;l++)i(l);return r},onCurrentChanged:function(e,t){this.currentIndex=e},disabledMember:function(e,t){return!!e.PartitionKeys.find(function(e){return e.Name===t})},onPartitionKeysChanged:function(e){var t=[this.target.ID,"PartitionKeys",V()(this.options.PartitionKeys)],a=this;$runtime.channel.invoke("sys.DesignService.ChangeEntity",t).then(function(e){a.oldPartitionKeys=a.options.PartitionKeys.slice(),a.members.forEach(function(e){a.options.PartitionKeys.find(function(t){return t.Name===e.Name})&&(e.AllowNull=!1)})}).catch(function(e){a.options.PartitionKeys=a.oldPartitionKeys,a.$message.error("Change PartitionKeys error: "+e)})}},mounted:function(){this.oldPartitionKeys=this.options.PartitionKeys.slice()}},U=B,G=(a("d251"),Object(m["a"])(U,K,j,!1,null,"23460ca4",null)),J=G.exports,H=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("e-table",{attrs:{data:e.rows,"highlight-current-row":"",border:"",height:"100%","empty-text":" "}},e._l(e.columns,function(t){return a("e-table-column",{key:t,attrs:{prop:t,label:t,formatter:e.formatCell}})}),1)},Q=[],W={props:{target:{type:Object,required:!0},members:{type:Array,required:!0}},data:function(){return{rows:[],columns:[]}},methods:{loadData:function(){var e=this;$runtime.channel.invoke("sys.DesignService.LoadEntityData",[this.target.ID]).then(function(t){for(var a in t[0])t[0].hasOwnProperty(a)&&"$T"!==a&&e.columns.push(a);e.rows=t}).catch(function(t){e.$message.error(t)})},formatCell:function(e,t,a,n){return"boolean"===typeof a?String(a):a}},mounted:function(){this.loadData()}},X=W,Y=Object(m["a"])(X,H,Q,!1,null,null,null),Z=Y.exports,ee=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("e-dialog",{attrs:{title:"表达式编辑器",visible:e.visible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.visible=t},close:e.onClose}},[a("expression-editor",{ref:"editor",attrs:{ownerType:e.ownerType,ownerID:e.ownerID,propertyName:e.propertyName}}),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("e-button",{attrs:{disabled:e.caDisabled},on:{click:function(t){e.visible=!1}}},[e._v("取 消")]),a("e-button",{attrs:{disabled:e.okDisabled,type:"primary"},on:{click:e.onOkClick}},[e._v("确 定")])],1)],1)},te=[],ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("code-editor",{ref:"editor",attrs:{height:e.height,language:"csharp",fileName:e.fileName},on:{mounted:e.onEditorMounted}})},ne=[],re=a("0ea0"),ie={components:{CodeEditor:re["a"]},props:{ownerType:{type:String,default:""},ownerID:{type:String,default:""},propertyName:{type:String,default:""}},data:function(){return{height:500}},computed:{fileName:function(){return this.ownerType+"_"+this.ownerID+"_"+this.propertyName+".cs"}},methods:{onEditorMounted:function(){var e=this;$runtime.channel.invoke("sys.DesignService.OpenExpression",[this.ownerType,this.ownerID,this.propertyName]).then(function(t){e.onCodeLoaded(t)}).catch(function(t){e.$message.error("加载表达式错误: "+t)})},onCodeLoaded:function(e){this.$refs.editor.initValue(e.Source),this.$refs.editor.$on("codeChanged",this.onCodeChanged),this.$refs.editor.focus()},onCodeChanged:function(e){for(var t=this,a=0;a<e.changes.length;a++){var n=e.changes[a];$runtime.channel.invoke("sys.DesignService.ChangeBuffer",[2,this.fileName,n.range.startLineNumber,n.range.startColumn,n.range.endLineNumber,n.range.endColumn,n.text]).catch(function(e){t.$message.warning("提交代码变更错误: "+e)})}},close:function(e){var t=this;$runtime.channel.invoke("sys.DesignService.CloseExpression",[this.fileName,e]).catch(function(e){t.$message.error("关闭表达式编辑器错误: "+e)})}}},le=ie,oe=Object(m["a"])(le,ae,ne,!1,null,null,null),se=oe.exports,ce={components:{ExpressionEditor:se},props:{ownerType:{type:String,default:""},ownerID:{type:String,default:""},propertyName:{type:String,default:""}},data:function(){return{visible:!0,okDisabled:!1,caDisabled:!1,isCancel:!0}},methods:{onClose:function(){this.$refs.editor.close(this.isCancel),this.$emit("close")},onOkClick:function(){this.isCancel=!1,this.visible=!1}}},ue=ce,me=Object(m["a"])(ue,ee,te,!1,null,null,null),de=me.exports,pe={components:{DataFieldDesigner:v,EntityRefDesigner:p,EntitySetDesigner:k,EntityOptions:J,EntityDataView:Z},props:{target:{type:Object,required:!0}},data:function(){return{activeView:"members",views:[{label:"members",title:"Members"}],designerType:"EntityDesigner",isDTO:!1,isNew:!1,members:[],collapseValue:["1"],currentMember:null,currentMemberDesigner:null,currentMemberTitle:null,expressionDialog:null,options:{PartitionKeys:[],Indexes:[]}}},computed:{storeTitle:function(){return this.isDTO?"DTO":this.options&&this.options.PartitionKeys&&this.options.PartitionKeys.length>0?"Partitioned":"NonPartitioned"},memberTypes:function(){return q(this.isDTO)}},methods:{entityMemberTypeFormat:function(e,t){var a=this.memberTypes.find(function(t){return t.value===e.Type});return a?a.text:"Unknown"},currentRowChange:function(e,t){if(this.currentMember=e,this.collapseValue=["1","2"],!e)return this.collapseValue=["1"],this.currentMemberDesigner=null,this.currentMemberTitle=null,!0;switch(e.Type){case 0:this.currentMemberDesigner=v,this.currentMemberTitle="DataField Properties";break;case 2:this.currentMemberDesigner=p,this.currentMemberTitle="EntityRef Properties";break;case 3:this.currentMemberDesigner=k,this.currentMemberTitle="EntitySet Properties";break;case 7:this.currentMemberDesigner=L,this.currentMemberTitle="AutoNumber Properties";break;case 11:this.currentMemberDesigner=R,this.currentMemberTitle="FieldSet Properties";break;default:break}},addMember:function(e){this.members.push(e),this.selectMember(this.members[this.members.length-1]),this.currentMember=e},selectMember:function(e){this.currentMember=e,this.$refs.memberTable.setCurrentRow(e)},removeCurrentMember:function(){if(!this.currentMember)return!1;var e=this.members.indexOf(this.currentMember);this.members.splice(e,1)},addIndex:function(e){this.sqlOptions.Indexes.push(e)},getCurrentIndex:function(){return this.$refs.sqlOptions?this.$refs.sqlOptions.currentIndex:null},removeIndex:function(e){var t=this.sqlOptions.Indexes.indexOf(e);t>=0&&this.sqlOptions.Indexes.splice(t,1)},onOpenExpressionEditor:function(){this.expressionDialog=i["default"].component("ExpressionEditorDialog",de)},onCloseExpressionEditor:function(){this.expressionDialog=null},save:function(){var e=this;$runtime.channel.invoke("sys.DesignService.SaveModel",[this.target.Type,this.target.ID]).then(function(t){e.$message.success("保存成功")}).catch(function(t){e.$message.error("保存失败: "+t)})},refresh:function(){var e=this;$runtime.channel.invoke("sys.DesignService.GetEntityModel",[this.target.ID]).then(function(t){e.isDTO=t.isDTO,e.isNew=t.IsNew,e.members=t.Members,e.views.push({label:"options",title:"Options"},{label:"data",title:"Data"}),e.options.Indexes=t.Indexes,e.options.PartitionKeys=t.PartitionKeys}).catch(function(t){e.$message.error(t)})}},mounted:function(){this.refresh()}},he=pe,fe=(a("edaf"),Object(m["a"])(he,n,r,!1,null,"6d62c1f5",null));t["default"]=fe.exports},c825:function(e,t,a){},d251:function(e,t,a){"use strict";var n=a("c825"),r=a.n(n);r.a},db1a:function(e,t,a){},edaf:function(e,t,a){"use strict";var n=a("db1a"),r=a.n(n);r.a}}]);