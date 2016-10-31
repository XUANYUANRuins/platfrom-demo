require.config({
	 urlArgs: 'v=201603272040',
	baseUrl: _contextPath+"/resources/common/js/"
	, shim: {

		"base/json2": {
			exports: "JSON"
      	},
      	"base/dotpl-js": {
			exports: "dotpl"
      	},
      	"bootstrap/bootstrap": {
      		deps: ["jquery"],
      		exports: '$.fn.popover'
      	},
      	"jquery/jquery.validate": {
      		deps: ["jquery"],
      		exports: '$'
      	},
      	"jquery/jquery.history": {
      		deps: ["jquery","base/json2"],
      		exports: '$'
      	},
      	"jquery/jquery.jqgrid": {
      		deps: ["jquery"],
      		exports: '$'
      	},
      	"jquery/jquery.resize": {
      		deps: ["jquery"],
      		exports: '$'
      	},
      	"jquery/jquery.metadata": {
      		deps: ["jquery"],
      		exports: '$'
      	}
	}
	, paths: {
		resources: _contextPath+"/resources/"
	}
});
/**
 * establish history variables
 */
var History = window.History; // Note: We are using a capital H instead of a lower h
var localeFile=(window.localeFile?window.localeFile:"app/widgets/app-lang_zh_CN");
require(["app/core/app-jquery","app/core/app-core","base/dotpl-js","app/app-funcbase",
		"app/widgets/layout/app-layout","app/util/app-utils","resources/mainframe/js/navmenu.js","resources/mainframe/js/navtab.js","app/widgets/window/app-dialog","app/core/app-register",
         "app/core/app-main","app/widgets/form/app-validate","base/template",
         "app/util/app-xss-utils"], function ($,App,template,func,$messager,$utils,navmenu,navtab){
	window.jQuery = $;
	window.$=$;
	$.browser = {};
	$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
	$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	
	//当焦点在input中时，用退格键删除文字不会造成浏览器后退的问题
	$(document).on("keydown",function(e){
		if(e.keyCode==App.keyCode["BACKSPACE"]){
			var $target = $(e.target);
			if($target.is("input,textarea")){
				if($target.val()==""){
					return false;
				}else if($target.attr("readonly")){
					return false;
				}
			}
		}
	});
	
	window.$template=function(render,vars){
		return template.applyTpl(render,vars);
	};
	window.funcs = window.$funcs= func;
	window.$messager = $messager;
	window.$utils = $utils;
	/**
	 * 增加启动方法
	 */
	window.$app =window.$A=window.$a= App;
	$A.setContextPath(_contextPath);
	/*每次请求的时候把当前子系统ID放入header中*/
	navtab.init()
	var initLayout = function(){
		var iContentW = $(window).width() ;
		var iContentH = $(window).height() - $("#mainheader").height() - 20;
		$("#mainbody .navtabs-content").height(iContentH - 20).find("[layoutHeight]").layoutHeight();
	};
	initLayout();
	$(window).resize(function(){
		initLayout();
		
	});
	
	App.boot();
	
});