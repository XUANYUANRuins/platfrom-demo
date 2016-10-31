<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.bosssoft.com.cn/tags" prefix="af"%>
<title>应用添加</title>
<af:jsfile
	path="resources/platform/js/appframe/afaapplication/afaapplication_add.js"
	id="afaapplication_add" onPageLoad="afaapplication_add.init" />
<div class="dlg-box-head">
	<div class="dlg-box-head-left" id="dragTarget">
		<span class="dlg-box-head-title">应用添加</span>
		<table class="dlg-box-head-table" cellpadding="0" cellspacing="0">
			<tr>
				<td></td>
				<td></td>
			</tr>
		</table>
	</div>
	<div class="dlg-box-head-right">
		<af:btnarea id="btns" displayType="DIALOG">
			<af:button id="afaApplicationPage_saveaddBtn" name="保存并新增"
				icon="saveNew48" iconMode="TOP" css="hidden"></af:button>
			<af:button id="afaApplicationPage_addBtn" name="新增" icon="add48"
				iconMode="TOP" css="hidden"></af:button>
			<af:button id="afaApplicationPage_editorBtn" name="编辑" icon="edit48"
				iconMode="TOP" css="hidden"></af:button>
			<af:button id="afaApplicationPage_saveBtn" name="保存" icon="save48"
				iconMode="TOP" css="hidden"></af:button>
			<af:button id="afaApplicationPage_closeBtn" name="关闭" icon="close48"
				iconMode="TOP" css="hidden"></af:button>
		</af:btnarea>
	</div>
</div>
<div class="dialog-content">
	<af:page id="afaApplicationPage" />
</div>