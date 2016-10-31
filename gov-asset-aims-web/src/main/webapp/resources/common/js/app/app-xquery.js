/**
 * 查询对象
 */
define(["app/core/app-jquery","app/widgets/window/app-dialog"],function($) {
	"use strict";
	/**
	 * 构造方法
	 */
	var QueryComp= function (element, options) {
		var o = this
		,$el = o.$element = $A(element)
		,target = $el.attr("query-target")
		,manual = $el.attr("manual")=="true";
		o.$element.bind("_resize",function(){
			if (o.oldElHeight){
				var p=o.$element.parent();
				if (p&&p.attr("region")){
				if (o.oldElHeight!=o.$element.height()){
					o.oldElHeight=o.$element.height();
					p.panel("resize",{height:o.oldHeight+o.$element.outerHeight()});
					p.parents("div.app-layout").layout("resize");
				};
			}
			}
		});
		var $target = $(target);
		if($target.length>0){
			o.$target=$target;
		}else{
			$target = $A("#"+target);
			if($target.length>0){
				o.$target=$target;
			}else{
				var dialogid=$A("[query-target]").parents(".dialog").attr("id");
				var queryDom=$("[dialogid="+dialogid+"]");
				var obj=queryDom.data("xquery");
				if (obj){
					o.$target=obj.$target;
				}
			}
		};
		o.manual =manual;
		o.hiddenCon={};
		
	};
	/**
	 * 条件参数收集
	 * @param $e{jquery object} 查询组件范围
	 * @return {Json} 参数对象
	 */
	function collectionCondition(o){
		var params = [],$e=o.$element,con=o.hiddenCon;
		var reqparams = {};
		if(con != null){
			$.each(con,function(key){
				if(con[key]){
					params.push(param);
				};
			});
		}
		$("[field]",$e).each(function(){
			var $t = $(this), checkFields={}
			,v=$t.val();
			var type=$t.attr("type");

			if(v!=null && v!=""){
				if( $t.attr("manual")!="true"){
					var m=$t.attr("model")
					,f=$t.attr("field")
					,op=$t.attr("operator")
					,p = m==null?f:m+"."+f
					,param={};
					param["prop"]=p;
					if(op)
						param["op"]=op;
					if (type=="checkbox"||type=="radio"){
						if (!checkFields[p]){
							checkFields[p]=p;
						$("[field="+f+"]:checkbox",$e).each(function () {
		                   if (this.checked){
		                	   if (!param["val"]){
		                		   param["val"]=[];
		                	   }
		                	    param["val"].push(v);
		                   }
		                	});
								param["val"]=param["val"].join(",");
								params.push(param);

						}
					}else{
						param["val"]=v;
						params.push(param);

					}
				}else{
					var f=$t.attr("field");
					if (type=="checkbox"||type=="radio"){
						if (!checkFields[f]){
							checkFields[f]=f;
							reqparams[f]=[];
							$("[field="+f+"]:checkbox",$e).each(function () {
				                   if (this.checked){
				                	   reqparams[f].push(v)
				                   }
			                });
							reqparams[f]=reqparams[f].join(",");
						}
						}else{
						reqparams[f] = v;
					}
				}
			}
	
		});
		reqparams["__xquery"] = JSON.stringify(params);
		return reqparams;
	};
	/**
	 * 条件参数收集
	 * @param $e{jquery object} 查询组件范围
	 * @return {Json} 参数对象
	 */
	function collectionParams(o){
		var $e=o.$element,params = $.extend({},o.hiddenCon);
		var checkFields={};
		$("[field]",$e).each(function(){
			var $t = $(this)
			,v=$t.val();
			if(v!=null && v!=""){
				var f=$t.attr("field");
				var type=$t.attr("type");
				if (type=="checkbox"||type=="radio"){
					if (!checkFields[f]){
						checkFields[f]=f;
						params[f]=[];
					}
					if ($t[0].checked){
						params[f].push(v);
					}
				}else{
					params[f]=v;
				}
				
			}
		});
		for(var key in checkFields){
			if (params[key]){
				params[key]=params[key].join(",")
			}
		}
		return params;
	};
	/**
	 * 原型定义
	 */
	QueryComp.prototype = {
		/**
		 * 快速查询
		 */
		quickQuery:function(){
			var b = true;
			var validator = this.$element.getJsonAttr("quick_validator");
			if($.isFunction(validator)){
				b = validator(this.$element);
			}
			if(!b){
				return b;
			}
			var param;
			if(this.manual){
				param = collectionParams(this);
			}else{
				param = collectionCondition(this);
			}
			if(this.$target.isGrid && this.$target.isGrid()){
				this.$target.bsgrid("load",param);
			}else if(this.$target.data("grid")){
				this.$target.grid("setParameter",param);
				this.$target.grid("load");
			}
			return b;
		},
		/**
		 * 高级查询
		 */
		advQuery:function(){
			var b = true;
			var validator = this.$element.getJsonAttr("adv_validator");
			if(validator){
				b = validator(this.$element);
			}
			if(!b){
				return b;
			}
			var param;
			if(this.manual){
				param = collectionParams(this);
			}else{
				param = collectionCondition(this);
			}
			if(this.$target.isGrid && this.$target.isGrid()){
				this.$target.bsgrid("load",param);
			}else if(this.$target.data("grid")){
				this.$target.grid("setParameter",param);
				this.$target.grid("load");
			}
			return b;
		},
		clear:function(){
			$("[field]",$e).each(function(){
				var $t = $(this);
				$t.val("");
			});
		},
		addParameter:function(key,val,op){
			var con = this.hiddenCon;
			if(val==null||val==""){
				con[key] = null;
				delete con[key];
				return;
			}
			if(this.manual){
				con[key]=v;
			}else{
				var param = con[key];
				if(param == null){
					param = {prop:key};
					con[key]=param;
				}
				if(op)
					param["op"]=op;
				param["val"]=v;
			}
		},
		openQuery:function(){
			var content = this.$element.attr("advance");
			
			if (!content){
				var id="#"+this.$element.attr("id")+"_advance_content";
				content=this.$element.find(id).val();
	
			}
		    var dlgId = this.$element.attr("dialogId");
		    if(!dlgId){
		    	dlgId = "advquery"+$A.nextId();
		    	this.$element.attr("dialogId",dlgId);
		    }
		    var $dlg=$("#"+dlgId);
		    if ($dlg.length>0){
		    	
		    	var pagejsobj=$dlg.data("jsObject");
	    	    if (pagejsobj){
	    	    	$($dlg[0]).setAppJsObject(pagejsobj.param.split(","),pagejsobj.objs);
	    	    }
		    		$A.dialog.setCurrent($dlg);
		    		$dlg.show();
		    		$("#_dialogMask").show();
		    		return;
		    	
		    }
		    var showFn=function(dlg){
			    var pagejsobj=$A.getCurrentNavTab().getAppJsObject();
			    if (pagejsobj){
			    	  dlg.data("jsObject",pagejsobj);
			   		 $(dlg[0]).setAppJsObject(pagejsobj.param.split(","),pagejsobj.objs);
			    }
		    };
		    
		    var $content = $(content);
		    $content.find('#queryadv').css("display","block");
		    var $dlg=$.openModalDialog({beforShow:showFn,afterShow:showFn,afterClose:function(dlg){
		    	 $(dlg[0]).clearAppJsObject();
		    } ,url:$content,title:"高级查询",dialogId:dlgId,reload:false,mode:"node",onPageLoad:function(){
		    
		    	   var pagejsobj=$A.getCurrentNavTab().getAppJsObject();
		    	   if (pagejsobj.objs&&pagejsobj.objs){
		    	   		var pageobj=pagejsobj.objs[0];
		    	   		if (pageobj.bindEvents){
		    	   			pageobj.bindEvents();
		    	   		}
		    	   }
		    	  
		    }});

		    
		    return $dlg;
		},hide : function() {
			if (this.$element){
				this.$element[0].style.display='none';
				var p=this.$element.parent();
				
				if (p){
					var options=p.panel("options")
					if (options.region){
						p.panel("resize",{height:this.oldHeight});
						p.parents("div.app-layout").layout("resize");
					}
					//p.parent().layout("resize");
				};
			}
		},show : function() {
			if (this.$element){
				var p=this.$element.parent();
				if (!this.oldHeight){
					this.oldHeight=p.outerHeight();
				}
				if (!this.oldElHeight){
					this.oldElHeight=this.$element.outerHeight();
				}
				this.$element[0].style.display='inline-block';
				
				
				if (p){
					var opt=p.panel("options");
					if (opt&&opt.region){
					p.panel("resize",{height:p.height()+this.$element.outerHeight()});
					p.parents("div.app-layout").layout("resize");
					}
				};
			}
		},toggle:function(){
			
			if (this.$element.is(":hidden")){
				this.show();
			}else{
				this.hide();
			}
		},destroy:function(){
			 var dlgId = this.$element.attr("dialogId");
			 if(dlgId){
				 var $dlg=$("#"+dlgId);
				 if ($dlg.length>0){
					 $A.destroyDom($dlg);
					 $dlg.trigger($A.eventType.pageDestroy).remove();
				 }
			 }			
		}
	};
	/**
	 * jquery方法扩展xquery
	 */
	$.fn.xquery=function(option){
		var methodReturn = undefined
		,options = typeof option === 'object'? $.extend({},option):null;
		var methodName = null;
		var args = [];
		if(typeof option === 'string' ){
			methodName = option;
			 args = $.makeArray(arguments).slice(1);
		}
		
		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('xquery');
			if (!data) $this.data('xquery', (data = new QueryComp(this, options)));
			if (methodName){
				var method =  data[methodName];
				if(method){
					methodReturn = method.apply(data,args);
				}
				//methodReturn = data[option]();
			}
		});
		return (methodReturn === undefined) ? $set : methodReturn;
	};
	
	$.fn.initXquery=function(option__){
		return $(this).each(function(){
			var $el = $(this);
			$el.find(".queryitem[visible=false]").hide();
		});
	};
	
	$.fn.xquery.Constructor = QueryComp;
	$(document).on('click.xquery.data-api', 'div.xquery .queryquick', function (e) {
		var $this = $(this);
		e.preventDefault();
		$this.parent().parent().xquery('quickQuery');
	});
	$(document).on('click.xquery.data-api', 'div.xquery .queryadv>a', function (e) {
		var $this = $(this);
	    e.preventDefault();
	    var $query = $this.parents("div.xquery:first");
	    $query.xquery("openQuery");
	});
	$(document).on('click.xquery.data-api', 'a.advancequery.ok', function (e) {
		e.preventDefault();
		
		if($A("[query-target]").xquery('advQuery')){
			funcs.closeDialog();
		}
		
	});
	$(document).on('click.xquery.data-api', 'a.advancequery.cancel', function (e) {
		funcs.closeDialog();
	});
 	return $;
});