requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['bootstrap','jquery-msg'],function(bootstrap,msg){
    	
    	$(document).ready(function(){
    		$('#reply-suggest-btn').on('click',function(){
    			var replyContent = $('#reply-suggest-input').val();
    			
    			if(!replyContent || !replyContent.length){
    				msg({content : '请填写回复内容!'});
    				return;
    			}
    			
    			var data = {
    					content : replyContent,
    					refId : $('#suggest-id').val(),
    					refType : 1,
    					rootId : $('#suggest-id').val()
    			};
    			
    			reply(data);
    		});
    	});
    	
    	function reply(data){
    		$.ajax({
    			url : sysPath + '/console/stream/replySuggest',
    			data : JSON.stringify(data),
    			type : 'post',
    			dataType : 'json',
    			contentType : 'application/json',
    			success : function(responseData){
    				if(responseData && responseData.code == '10000'){
    					msg({content : '回复成功！'});
    					location.href = sysPath + '/console/stream/querySuggest';
    				}else{
    					msg({content : responseData.msg});
    				}
    			}
    		});
    	}
    	
    	
    });
    
    
});