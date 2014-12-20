requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['bootstrap','jquery-msg'],function(bootstrap,msg){
    	
    	$(document).ready(function(){
    		$('#update-btn').on('click',function(){
    			
    			var data = {};
    			
    			data.mailswitch = $('#switch-mail-on')[0].checked;
    			data.pushswitch = $('#switch-push-on')[0].checked;
    			data.smsswitch = $('#switch-sms-on')[0].checked;
    			data.sysmonitorswitch = $('#switch-sysmonitor-on')[0].checked;
    			data.chatswitch = $('#switch-chat-on')[0].checked;
    			
    			updateData(data);
    		});
    	});
    	
    	function updateData(data){
    		$.ajax({
    			url : sysPath + '/console/sysDict/updateSysSwitch',
    			data : JSON.stringify(data),
    			type : 'post',
    			dataType : 'json',
    			contentType : 'application/json',
    			success : function(responseData){
    				if(responseData && responseData.code == '10000'){
    					msg({content : '更新成功！'});
    				}else{
    					msg({content : responseData.msg});
    				}
    			}
    		});
    	}
    	
    	
    });
    
    
});