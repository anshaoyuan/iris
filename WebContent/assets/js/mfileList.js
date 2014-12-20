require([ 'config' ], function() {
	"use strict";
	
	require([ 'template', 'text!../tpl/mfileList.tpl','jquery-msg', 'fileupload', 'jquery', 'syntax', 'module/header' ,'bootstrap' ], function(template, raw, msg) {
		
		$('ul').remove();
		$('footer').remove();
		
		var folderId = $('#folderId').val();
		
		$.ajax(sysPath+'/mobile/document/fileList/'+folderId, {
			contentType : 'application/json; charset=utf-8',
			type : 'get',
			data : {},
			success : function(data) {
				var datas = {
						fileList : data,
						isNull: data == null || data.length == 0,
						isAdmin : $('#isDefaultFolder').val(),
						baseUrl : sysPath
				}
				var render = template.compile(raw);
				var html = render(datas);
				$('#fileList').html(html);
				
				handleDelFile();	
			}
		});
		
		$('#uploadFileBtn').bind('change', function(){
			var imgFile = $(this).val();
			if(imgFile == null){
				return;
			}
			var fileType = imgFile.substring(imgFile.lastIndexOf(".")+1).toUpperCase();  
			if(fileType=='JPG' || fileType=='BMP' || fileType=='GIF'
				|| fileType=='JPEG' || fileType=='PNG'){
				msg({content:'上传图片请使用相册!'})
				return ;
			}
			
			$('#uploadBlock').hide();
			$('#loadingImg').show();
			var folderId  = $('#folderId').val();
			$.ajaxFileUpload({
				url:sysPath + '/upload/document'+folderId,
				secureuri:false,
				fileElementId: 'uploadFileBtn',
				dataType: 'json',
				success: function (data){
					if(data.code == '10000'){
						window.location.reload();
					}
				}
			});
		});
		
		function handleDelFile(){
			$('body').undelegate('.delFile', 'click');
	    	$('body').delegate('.delFile', 'click',function() {
	    		var fileId = $(this).data('fileid');
	    		var folderId = $('#folderId').val();
	    		msg({
	    			content:'确定删除吗?',
	    			confirm: true,
	    			clickOk : function(){
	    				var attIdFolderId = fileId+"_"+folderId;
	    				$.ajax({
							url : sysPath+'/mobile/document/delFile/'+attIdFolderId,
							contentType : 'application/json',
							dataType:"json",
							type:"GET",
							data : {},
							success : function(data) {
								if(data.code=='10000'){
									msg({content:'删除成功!'});
									$('#file_'+fileId).hide();
								}
							}
						});
	    			}
	    		});
	    	});
		}
	});
		
});