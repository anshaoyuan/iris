require(['config'], function () {
    "use strict";
    
    require([ 'template', 
              'text!../tpl/remind.tpl', 
              'text!../tpl/remindDetail.tpl',
              'jquery', 'syntax', 'module/header','bootstrap' ], function(template, raw, raw2){
    	$.ajax(sysPath + '/mobile/remind/allRemindCount', {
			contentType : 'application/json; charset=utf-8',
			type : 'get',
			data : {},
			success : function(data) {
				var render = template.compile(raw);
				var html = render(data);
				$('#remindList').html(html);
				
				$('body').undelegate('.remindD', 'click');
		    	$('body').delegate('.remindD', 'click',function() {
		    		var type = $(this).attr('data-type');
	    			if($('#remindDetail'+type).html() != ''){
	    				$('#remindDetail'+type).toggle();
		    		}else{
		    			loadRemindByType(type, 1);
		    			var totalRemindCount = parseInt($('#remindCount').html());
		    			var currTypeRemindCount = parseInt($('#remindCount'+type).html());
		    			$('#remindCount').html(totalRemindCount - currTypeRemindCount);
		    			$('#remindCount'+type).html('0');
		    		}
		    	});
			}
		});
    });
    
    function loadRemindByType(type, currPage){
    	var url = sysPath + '/mobile/remind';
    	if(type == '1'){
    		url += '/myselfRemind';
    	}else if(type == '2'){
    		url += '/teamRemind';
    	}else if(type == '3'){
    		url += '/commissionOrDeliverRemind';
    	}else if(type == '4'){
    		url += '/managerRemind';
    	}
    	
    	var jd = {
    		page: currPage
    	}
    	
    	var fd = JSON.stringify(jd);
    	
    	require([ 'template', 'text!../tpl/remindDetail.tpl', 'jquery', 'syntax', 'module/header','bootstrap'  ], function(template, raw) {
			$.ajax(url, {
				contentType : 'application/json; charset=utf-8',
				type : 'POST',
				data : fd,
				success : function(data) {
					$('#more'+type).remove();
					if(data && data.length > 0){
						var datas = {
								remindList: data,
								baseUrl: sysPath
						}
						var render = template.compile(raw);
						var html = render(datas);
						$('#remindDetail'+type).append(html);
						
						if(data.length >=10){
							currPage = currPage+1;
							
							var moreBtnHtml = '<a id="more'+type+'" href="javascript:void(0);" class="btn btn-block btn-link" data-loading-text="正在载入..." rel="tooltip" data-original-title="载入更多...">更多...</a>';
							$('#remindDetail'+type).append(moreBtnHtml);
							
							$('body').undelegate('#more'+type, 'click');
							$('body').delegate('#more'+type, 'click', function(){
								loadRemindByType(type, currPage);
							});
						}
						
					}
				}
			});
		});
    }
    
});