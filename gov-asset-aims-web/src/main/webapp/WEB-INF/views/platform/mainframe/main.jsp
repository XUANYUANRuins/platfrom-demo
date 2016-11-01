<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<title>非税收入管理系统</title>
<%@include file="/WEB-INF/include/header.jsp"%>
<link
	href="${ctx}/resources/mainframe/themes/default/main.css?v=201604201034"
	rel="stylesheet" type="text/css" />


<script type="text/javascript">
		var navmenus =  [{"id":"1","version":1,"internalStatus":null,"fcode":"002","fname":"系统管理","flevel":1,"fisEnabled":"1","fparentId":"0","fisLeaf":"0","fopenType":"1","fimage":null,"fsort":null,"ftype":"1","fsubSystemId":"c08af79072f444878c7c5deea25187aa","fisVisible":"1","fisBuiltIn":"1","fparams":null,"functionId":"0","fremark":null,"subSystemName":null,"fparentCode":null,"fparentName":null,"functionCode":null,"functionName":null,"url":null,"urlprefix":null,"ftypeName":null,"children":[],"isParent":true,"fisLeafShow":"0","nodeSelectedType":"menu","fisEnabledShow":"1"}
						,{"id":"2","version":1,"internalStatus":null,"fcode":"002001","fname":"应用管理","url":"platform/appframe/afaapplication/showIndex.do","flevel":2,"fisEnabled":"1","fparentId":"1","fisLeaf":"1","fopenType":"1","fimage":null,"fsort":null,"ftype":"1","fsubSystemId":"c08af79072f444878c7c5deea25187aa","fisVisible":"1","fisBuiltIn":"1","fparams":null,"functionId":"GNGL","fremark":null,"subSystemName":null,"fparentCode":null,"fparentName":null,"functionCode":"001001001","functionName":null,"urlprefix":null,"ftypeName":null,"children":[],"isParent":false,"fisLeafShow":"1","nodeSelectedType":"menu","fisEnabledShow":"1"}
						,{"id":"3","version":0,"internalStatus":null,"fcode":"002003","fname":"数据功能管理","url":"platform/system/resource/dict/showIndex.do","flevel":2,"fisEnabled":"1","fparentId":"1","fisLeaf":"1","fopenType":"1","fimage":null,"fsort":null,"ftype":"1","fsubSystemId":"c08af79072f444878c7c5deea25187aa","fisVisible":"1","fisBuiltIn":"1","fparams":null,"functionId":"SJZD","fremark":null,"subSystemName":null,"fparentCode":null,"fparentName":null,"functionCode":"001001003","functionName":null,"urlprefix":null,"ftypeName":null,"children":[],"isParent":false,"fisLeafShow":"1","nodeSelectedType":"menu","fisEnabledShow":"1"}]
		var usedmenus = [];
		var subSystems = [];
		var username='${user.fcode}';
		var currSubSysId = "${currSubSysId}";
		function doLogout(){
			require(["app/app-messager"],function($messager){
				$messager.confirm("您确定要退出本次登录吗？",{okCall:function(){
					window.location.href = _contextPath+"/logout.do";
				}});
			});
		}
		
	</script>


</head>
<body style="overflow: hidden;">
	<div id="_tabmask">
		<div class="top"></div>
		<div class="middle">
			<div class="mask_bg"></div>
		</div>
		<div class="bottom"></div>
	</div>
	<div class="appframe-container">
		<div class="appframe-header" id="mainheader">
			<div class="appframe-header-title">应用系统名称</div>
			<div class="appframe-header-nav">
				<div id="btn_shownavmenu">
					<div>
						<ul></ul>
					</div>
				</div>
			</div>
			<div class="appframe-header-toolbar">
				<ul>
					<li class="ico-appfavorite">
						<ul class="appframe-header-favoritemenu">

							<li class="appframe-header-favoritemenu-content"><a
								href="javascript:void(0)">设置</a></li>
						</ul>
					</li>
					<li id="btn_shownavuser" class="ico-appuser"></li>
					<li class="ico-applogout"></li>
				</ul>
			</div>
		</div>
		<div class="appframe-main">
			<div class="appframe-main-content" id="mainbody">

				<div id="navTab" class="navtabs">
					<div class="navtabs-content layoutBox" id="tempOut">
						<div id="tabpage_home" class="tabpage">
							<%--@include file="/WEB-INF/include/home.jsp" --%>
						</div>
					</div>
					<div class="navtabs-footer">
						<div class="navtabs-tabarea">
							<ul class="navtabs-tabs">
								<li id="main" class="tab" url="${homePage }"><a
									href="javascript:;"><span><span class="home_icon">我的首页</span></span></a></li>
							</ul>
						</div>
						<div class="tabsleft">left</div>
						<!-- 禁用只需要添加一个样式 class="tabsLeft tabsLeftDisabled" -->
						<div class="tabsright">right</div>
						<!-- 禁用只需要添加一个样式 class="tabsRight tabsRightDisabled" -->
						<div class="tabsmore">more</div>
					</div>
					<ul class="navtabs-morelist">
						<li><a href="javascript:void(0);">我的首页</a></li>
					</ul>
				</div>
				<div class="app-menu tab-menu" style="width: 120px; display: none;">
					<div id="closeCurrent"
						data-options="id:'closeCurrent',name:'关闭当前页'">关闭当前页</div>
					<div id="closeOther" data-options="id:'closeOther',name:'关闭其它页'">关闭其它页</div>
					<div id="closeAll" data-options="id:'closeAll',name:'关闭其它页'">关闭所有</div>
				</div>

			</div>
		</div>
	</div>
	</div>
</body>
<%@include file="/WEB-INF/include/footer.jsp"%>
<script data-main="${ctx}/resources/mainframe/js/main.js"
	src="${ctx}/resources/common/js/require.js"></script>


</html>
