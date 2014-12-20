requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['bootstrap','jquery-msg'],function(bootstrap,msg){
    	$(document).ready(function(){
			$('.stream-del').click(function(){
				var streamId = $(this).attr('data-id');
				$.get(sysPath + '/console/stream/del/' + streamId,function(){
					msg({content:'删除成功!'});
					setTimeout(function(){
						window.location.reload();
					},2000);
				});
			});
		});
    });
    
});