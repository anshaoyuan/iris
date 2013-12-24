<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>欢迎来到我的主页</title>
<script type="text/javascript">
	function getUser(btn){
		var form=btn.form;
		form.action="/bbs/user/login";
		form.submit();
	}
	function deleteUser(btn){
		var form=btn.form;
		form.action="/bbs/user/delete";
		form.submit();
	}
	function createUser(btn){
		var form=btn.form;
		form.action="/bbs/user/save";
		form.submit();
	}
</script>
</head>
<body>
	<form  method="post">	
		用户名：<input name="userName" type="text"/><br/>
		密&nbsp;码:<input name="passWd" type="password"/><br/>
		<input type="button" value="创建用户" onclick="createUser(this);"/>
		<input type="button" value="得到用户" onclick="getUser(this);"/>
		<input type="button" value="删除" onclick="deleteUser(this);"/>
	</form>
</body>
</html>