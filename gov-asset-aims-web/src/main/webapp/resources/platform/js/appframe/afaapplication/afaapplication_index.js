/**
 * * Auto generated by Bossssoft Studio version 1.0 beta
 * Sun Sep 18 11:45:38 CST 2016
 */
//define(['引入外部js模块或控件'],function('引入外部js或控件的别名'){})
define(
		[ 
		  "app/widgets/window/app-dialog",
		  "app/app-pagebase","resources/platform/js/appframe/afaapplication/afaapplication_add.js"],
		function(Dialog,PageBase,dlg) {
		   var AfaApplicationModel = PageBase.extend({
		             //类初始化
		            initialize : function() {
						AfaApplicationModel.superclass.initialize.call(this);
					},
					//控件监听事件  格式：#控件id#:{事件名:事件方法}
					listeners:{
					    //新增按钮事件
						afaApplicationPage_btnAdd:{
							click: function(){
							dlg.showPage(dlg.ACTION.ADD,null,function(){
								 AfaApplicationModel.getInstance().refreshData();
							})
							}
						},
						//新增按钮事件
						afaApplicationPage_btnQuery:{
							click:function(){
								$("#afaApplicationPage_query").xquery("toggle");
							}
						}	
					},
					//页面加载后初始化
					initPage:function(){
						
							
					},
					//显示查看业
					showViewPage:function(data,e){
					    var _self=this;
						dlg.showPage(dlg.ACTION.VIEW,data,function(){
							_self.refreshData();
						});
					},
					refreshData:function(){
						$("#afaApplicationPage_grid").grid("reload");
					},
					//显示编辑业
					showEditPage:function(data,e){
						 var _self=this;
						dlg.showPage(dlg.ACTION.EDIT,data,function(){
						     _self.refreshData();
						});
					},
					doDeleteData:function(data,e){
						 var _self=this;
						 $messager.confirm("确认删除当前记录吗？", {
							okCall : function() {
								var url = "platform/appframe/controller/afaapplication/doDelete.do";
								$app.ajax.ajaxCall({
									url : url,
									data : data,
									callback : function() {
										_self.refreshData();
										
									}
								});
							}
						});
					},
					
					//控件属性重置
					initUIExtConfig : function() {
					    var _self=this;
						this.uiExtConfig={
							//格式 #控件id#:function(控件属性集类){ config.setAttr("控件属性名","属性值"),// 网格，下拉网格，特殊设置config.getColumn("网列id").setAttr("列属性名","列属性值")config.getButton("网格内包含的按钮id").setAttr("handler","点击事件")  }
							afaApplicationPage_grid:function(config){
								config.getButton("afaApplicationPage_grid_btnEdit").setAttr("handler",_self.showEditPage);
								config.getButton("afaApplicationPage_grid_btnView").setAttr("handler",_self.showViewPage);
								config.getButton("afaApplicationPage_grid_btnDel").setAttr("handler",_self.doDeleteData);
							}
						
						}
					}

		 });
		 AfaApplicationModel.getInstance=function(){
		     if (!this.instance){
		    	 this.instance =new AfaApplicationModel();
		     }
		     return this.instance;
		 }
		
		 return  AfaApplicationModel.getInstance();
	   })