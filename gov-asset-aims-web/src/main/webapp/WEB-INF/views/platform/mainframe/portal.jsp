<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<head>
<%@taglib uri="http://www.bosssoft.com.cn/tags" prefix="af"%>
<title>portal</title>


<link
	href="${pageContext.request.contextPath}/resources/common/themes/default/portal.css?v=201604201034"
	rel="stylesheet" type="text/css" />


	<af:jsfile path="resources/mainframe/js/portal" id="portal" onPageLoad="portal.init"></af:jsfile>

<body >
<div class="portal"></div>

</body>



</html>
