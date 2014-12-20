require([ 'config' ], function() {
	"use strict";
	require(['jquery-msg', 'jquery', 'syntax', 'bootstrap'], function(msg) {
		
		$('body').undelegate('.set_btn', 'click');
		$('body').delegate('.set_btn', 'click', function(){
			var actId = $(this).data('actid');
			
			var jsonData = {
					"thirdAccountId" : actId
			}
			
			$.ajax(sysPath + '/console/sina/setBindTeam', {
				 contentType : 'application/json; charset=utf-8',
				 type : 'post',
				 data : JSON.stringify(jsonData),
				 success : function(data) {
					 if(data.code == '10000') {
						window.location.reload();
					 }
				 }
			 });
		});
		
		$('body').undelegate('.cancel_btn', 'click');
		$('body').delegate('.cancel_btn', 'click', function(){
			var actId = $(this).data('actid');
			var jsonData = {
					"thirdAccountId" : actId
			}
			$.ajax(sysPath + '/console/sina/cancelBindTeam', {
				 contentType : 'application/json; charset=utf-8',
				 type : 'post',
				 data : JSON.stringify(jsonData),
				 success : function(data) {
					 if(data.code == '10000') {
						window.location.reload();
					 }
				 }
			 });
		});
	});
});