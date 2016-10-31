/**
 * * Auto generated by Bossssoft Studio version 1.0 beta
 * Sat Oct 08 14:09:46 CST 2016
 */
//define(['引入外部js模块或控件'],function('引入外部js或控件的别名'){})
define(
		[ 
		  "app/widgets/window/app-dialog",
		  "app/app-pagebase"],
		function(Dialog,PageBase) {
		   var TPersonDlg = PageBase.extend({
		             //类初始化
		            initialize : function() {
						TPersonDlg .superclass.initialize.call(this);
					},
					ACTION:{
						ADD:"ADD",
						EDIT:"EDIT",
						VIEW:"VIEW"
					},
					//存储弹出窗口回调
					showPageCallBack:null,
					//当前窗口状态
					indexAction:null,
					//控件监听事件  格式：#控件id#:{事件名:事件方法}
					listeners:{
				         	//新增并保存
					  		tPersonPage_saveaddBtn : {
								click : function() {
									 var self=TPersonDlg.getInstance();
									self.doSave({isSaveAdd:true})					
								}
							},
							//新增
							tPersonPage_addBtn : {
								click : function() {
								  $A("#tPersonPage_form").clearFormEditorValue();
								}
							},
							//编辑
							tPersonPage_editorBtn : {
								click : function() {
									 var self=TPersonDlg.getInstance();
									 self.indexAction=self.ACTION.EDIT;
									 $A("#tPersonPage_editorBtn").hide();
									 $A("#tPersonPage_saveBtn").show();
									 $A("#tPersonPage_form").toggleFormState("edit");
									$A("#id").textbox("readonly",false);					
							    	$A("#name").textbox("readonly",false);					
							    									}
							},
							//保存
							tPersonPage_saveBtn : {
								click : function() {
								   var self=TPersonDlg.getInstance();
									self.doSave({isSaveClose:true})
								}
							},
							//关闭
							tPersonPage_closeBtn : {
								click : function() {
																	$.closeDialog();
								}
							}
					},
					loadData:function(param,callback){
						var url="egov/aims/tperson/getTPersonList.do"
												$.ajaxCall({
											url : url,
											data : param,
											callback : function(data) {
												$A("#tPersonPage_form").refreshFormData(data);
												if (callback){
													callback();
												}
											}
						})
					},
					//保存数据cofig:{isSaveAdd:"保存并新增",isSaveClose:"保存关闭",isSaveView:"保存查看"}可自行扩展
					doSave:function(config,callback){
						var url="";
						if (this.indexAction == this.ACTION.ADD) {
							url="egov/aims/tperson/doInsert.do"
						}
						if (this.indexAction == this.ACTION.EDIT) {
							url="egov/aims/tperson/doUpdate.do"
						}
						 var _self=TPersonDlg.getInstance();
						$A('#tPersonPage_form').sumbitAllComp({
									                     submitMode : 'all',
									                     url : url,
									                     callback : function(json) {
									                     	if (config.isSaveAdd){
									                     	  $A("#tPersonPage_form").clearFormEditorValue();              	 
															  _self.indexAction=_self.ACTION.ADD;
									                     	}else if (config.isSaveClose){
									                     	 									                         $.closeDialog();
									                         _self.indexAction="";
									                     	}else if (config.isSaveView){
									                     		$A("#tPersonPage_form").toggleFormState("view");
									                     		$A("#id").textbox("readonly",true);					
							                                     $A("#name").textbox("readonly",true);					
							                                     							                                     _self.indexAction=_self.ACTION.VIEW;
									                     	}
									                     	if (_self.showPageCallBack){
									                     		_self.showPageCallBack();
									                     	}
									                     }
							                         });		
					},
					//显示弹出窗口，action 窗口状态来源，ACTION:{ADD:"",EDIT:"",VIEW:""}//可自行扩展
					showPage:function(action,data,callback){
				    this.showPageCallBack=callback||function(){};
					var self=this;
					
					this.indexAction=action;
					 var options = {
							url : "egov/aims/tperson/showAdd.do",
							dialogId : "directPayBookAdd",
							title : "新增",
							width : 800,
							height : 600,
							wrapper : true,
							hasheader : false,
							reload : true,
							onPageLoad : function(obj) {
						if (self.indexAction == self.ACTION.ADD) {
								$A("#tPersonPage_editorBtn").hide();
								$A("#tPersonPage_addBtn").hide();
								$A(".dlg-box-head-title").html("新增");
							}
						if (self.indexAction == self.ACTION.EDIT) {
								$A("#tPersonPage_addBtn").hide()
								$A("#tPersonPage_saveaddBtn").hide();
								$A("#tPersonPage_editorBtn").hide();
								$A(".dlg-box-head-title").html("修改");
								$A("#tPersonPage_form").refreshFormData(data);
							}
						if (self.indexAction == self.ACTION.VIEW) {
								$A("#tPersonPage_addBtn").hide()
								$A("#tPersonPage_saveaddBtn").hide();
								$A("#tPersonPage_saveBtn").hide();
								$A(".dlg-box-head-title").html("查看");
								$A("#tPersonPage_form").refreshFormData(data);
								$A("#tPersonPage_form").toggleFormState("view");
								$A("#id").textbox("readonly",true);					
							    $A("#name").textbox("readonly",true);					
							    							}
							}
						};
					$.openModalDialog(options)
				
					},
					//页面加载后初始化
					initPage:function(){
						
							
					},
					//控件属性重置
					initUIExtConfig : function() {
						this.uiExtConfig={
							//格式 #控件id#:function(控件属性集类){ config.setAttr("控件属性名","属性值"),// 网格，下拉网格，特殊设置config.getColumn("网列id").setAttr("列属性名","列属性值")config.getButton("网格内包含的按钮id").setAttr("handler","点击事件")  }
								
						
						}
					}

		 });
		   //创建窗体类单例
			 TPersonDlg.getInstance=function(){
		     if (!this.instance){
		    	 this.instance =new TPersonDlg();
		     }
		     return this.instance;
		 }
		
		 return  TPersonDlg.getInstance();
	   })