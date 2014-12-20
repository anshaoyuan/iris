requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
	require(['jquery-chosen','jquery-msg','module/header','bootstrap'],function(chosen,msg){
		
		var chatLi = '<li>:chatTime&nbsp;&nbsp;&nbsp;&nbsp;:chatContent</li>';
		
		$(document).ready(function(){
			renderPeople($('#chat_people'),sysPath + '/mobile/account/user/allUser');
			
			$('#chat-history-more').click(function(){
				loadChatHistory();
			});
			
			$('#chat-search-btn').click(function(){
				$('#chat-history-more').attr('data-lastId',''),
				$('#chat_people_select').attr('data-userId',$('#chat_people_select').find('option:selected').val()),
				$('#chat-content').attr('data-content',$('#chat-content').val());
				
				loadChatHistory(true);
			});
			
		});
		
		function loadChatHistory(reset){
			var postData = {
					lastId : $('#chat-history-more').attr('data-lastId'),
					userId : $('#chat_people_select').attr('data-userId'),
					query : $('#chat-content').attr('data-content')
			};
			
			$.ajax({
				url : sysPath + '/mobile/chat/queryChatMessageHistory',
				type : 'post',
				dataType : 'json',
				contentType : 'application/json',
				data : JSON.stringify(postData),
				success : function(data){
					if(reset){
						$('#chat-history-list').html('');
						if(data.length <= 0){
							msg({content: '没有相关的聊天历史记录!'});
						}
					}else{
						$('#chat-history-list').append($('<li><hr></li>'));
						if(data.length <= 0){
							msg({content: '聊天历史记录已经全部加载完成!'});
						}
					}
					
					if(data && data.length){
						$.each(data,function(index,val){
							$('#chat-history-list').append(chatLi.replace(/:chatTime/,val.createDate).replace(/:chatContent/,val.content));
						});
					}
					if(data.length >= 5){
						$('#chat-history-more').attr('data-lastId',data[0].id);
						$('#chat-history-more').show();
					}else{
						$('#chat-history-more').hide();
						$('#chat-history-more').attr('data-lastId','');
					}
				}
			});
		}
		
		function renderPeople(ele,url){
    		var targetId = ele[0].id + "_select";
	    	 var targetSelect = $('<select id="'+ targetId +'"  class="chzn-select" style="width:'+(ele.width()+15)+'px;" > </select>');
	   	   	 ele.after(targetSelect).hide();
	   		 
	   	   	 chosen(ele.next(),{show_no_results_text:false});	
	   		 
	   		 ele.data('chosen',ele.next().data('chosen'));
	   		 $.ajax({
	   			 url: url,
	   			 dataType: "json",
	   			 success: function(respone){
	   				 var html = '';
	   				 if (respone.length > 0) {
	   					 $.each(respone,function(i,o){
	   						html+='<option value="'+ o.id +'">'+o.aliasName+'</option>';
	   					 });
	   				 }
	   				 
	   				 targetSelect.empty().append(html);
	   				 ele.next().trigger("liszt:updated");
	   			 }
	   		 });
    	
		}
	});
});