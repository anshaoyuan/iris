require([ 'config' ], function() {
	"use strict";

	require([ 'template', 'jquery-msg', 'jquery', 'syntax', 'bootstrap' ], function(template, msg) {
		
		$('body').undelegate('#addWeixin', 'click');
		$('body').delegate('#addWeixin', 'click',function() {
			
			var weixinAccount = $('#weixinAccount').val().trim();
			if(weixinAccount.length == 0){
				msg({content: '微信公众账号不能为空!'});
				return;
			}
			var weixinPwd = $('#weixinPwd').val();
			if(weixinPwd.length == 0){
				msg({content: '密码不能为空!'});
				return;
			}
			var weixinId = $('#weixinId').val();
			if(weixinId.length == 0){
				msg({content: '原始ID不能为空!'});
				return;
			}
			
			var type = $('#type').val();
			if(type == ''){
				msg({content: '请选择账号类型!'});
				return;
			}
			
			var teamId = $('#teamId').val();
			if(teamId == ''){
				msg({content: '请选择群组!'});
				return;
			}
			
			var jsonData = {
				"teamId" : teamId,
				"weixinId" : weixinId,
				"type" : type,
				"weixinAccount" : weixinAccount,
				"weixinPwd" : weixinPwd
			}
			
			 $.ajax(sysPath + '/console/weixin/bindWeixin', {
				 contentType : 'application/json; charset=utf-8',
				 type : 'post',
				 data : JSON.stringify(jsonData),
				 success : function(data) {
					 if(data.code == '10000'){
						 msg({content:'操作成功!'});
						 window.location.reload();
					 }else{
						 msg({content:data.msg});
					 }
				 }
			 });
			
		});
		
		initTeam();
		
		function initTeam(){
			 $.ajax(sysPath + '/console/team/findAllTeams/0', {
				 contentType : 'application/json; charset=utf-8',
				 type : 'get',
				 data : {},
				 success : function(data) {
					 if(data && data.length > 0) {
						 $("#teamId").append("<option value=''>请选择...<option>");
						 for(var i=0; i<data.length; i++){
							 $("#teamId").append("<option value='"+data[i].id+"'>"+data[i].teamName+"<option>");
						 }
					 }
				 }
			 });
		}
		
		$('body').undelegate('.delWeixin', 'click');
		$('body').delegate('.delWeixin', 'click',function() {
			var weixinId = $(this).data('weixinid');
			msg({
    			content:'确定要删吗?',
    			cancel : true,
    			confirm: true,
    			clickOk : function(){
    				 $.ajax(sysPath + '/console/weixin/delWeixin/' + weixinId, {
    					 contentType : 'application/json; charset=utf-8',
    					 type : 'get',
    					 data : {},
    					 success : function(data) {
    						if(data.code == '10000'){
    							window.location.reload();
    						}
    					 }
    				 });
    			}
    		});
		});
	})
})