require([ 'config' ], function() {
	"use strict";
	
	require([ 'text!../tpl/consoleFileList.tpl','jquery-msg', 'jquery','uploadify', 'syntax', 'bootstrap' ], function(raw, msg) {
		
		$("#uploadify").uploadify({
			swf : sysPath
					+ '/assets/js/jquery.uploadify/uploadify.swf',
			uploader : sysPath + '/uploadDocument;jsessionid='
					+ $('#sessionId').val(),
			fileTypeDesc : '格式:DOC,XLS,PPT,TXT,DOCX,XLSX', // 描述
			fileTypeExts : '*.DOC;*.XLS;*.PPT;*.TXT;*.DOCX;*.XLSX', // 文件类型
			buttonText : '选择文件', // 按钮名称
			removeCompleted : true,
			fileSizeLimit : '40MB',
			auto : true,
			onUploadSuccess : function(file, data, response) {
				if(data == '10000'){
					window.location.reload();
				}
			},
			'onUploadStart' : function(file) {
				$('#uploadify').uploadify("settings",
						"formData", {
							'folderId' : $('#folderId').val()
						})
			},
			'onQueueComplete' : function(queueData) {
				
			}
		});
		
		var folderId = $('#folderId').val();
		
		$.ajax(sysPath+'/console/document/fileList/'+folderId, {
			contentType : 'application/json; charset=utf-8',
			type : 'get',
			data : {},
			success : function(data) {
				var datas = {
						fileList : data,
						isNull: data == null || data.length == 0,
						baseUrl : sysPath
				}
				var render = template.compile(raw);
				var html = render(datas);
				$('#fileList').html(html);
				
				handleDelFile();	
			}
		});
		
		
		
//		$('#uploadFileBtn').bind('change', function(){
//			
//			var imgFile = $(this).val();
//			if(imgFile == null){
//				return;
//			}
//			var fileType = imgFile.substring(imgFile.lastIndexOf(".")+1).toUpperCase();  
//			if(fileType=='JPG' || fileType=='BMP' || fileType=='GIF'
//				|| fileType=='JPEG' || fileType=='PNG'){
//				msg({content:'上传图片请使用相册!'})
//				return ;
//			}
//			
//			$('#uploadBlock').hide();
//			$('#loadingImg').show();
//			var folderId  = $('#folderId').val();
//			$.ajaxFileUpload({
//				url:sysPath + '/upload/document'+folderId,
//				secureuri:false,
//				fileElementId: 'uploadFileBtn',
//				dataType: 'json',
//				success: function (data){
//					if(data.code == '10000'){
//						window.location.reload();
//					}
//				}
//			});
//		});
		
//		function handlePreview(){
//			$('body').undelegate('.previewFile', 'click');
//	    	$('body').delegate('.previewFile', 'click',function() {
//	    		var fileId = $(this).data('fileid');
//	    		$.ajax({
//					url : sysPath+'/mobile/document/previewFile/'+fileId,
//					contentType : 'application/json',
//					dataType:"json",
//					type:"GET",
//					data : {},
//					success : function(data) {
//						$('#filePreviewBlock').modal('show');
//						$('#previewDoc').load(data.htmlUrl);
//						
//					}, error: function(data, a, e){
//						msg({content: '该文档不支持在线预览'})
//					}
//				});
//	    	});
//		}
		
		function handleDelFile(){
			$('body').undelegate('.delFile', 'click');
	    	$('body').delegate('.delFile', 'click',function() {
	    		var fileId = $(this).data('fileid');
	    		var folderId = $('#folderId').val();
	    		msg({
	    			content:'确定要删除该文件吗?',
	    			cancel : true,
	    			confirm: true,
	    			clickOk : function(){
	    				var attIdFolderId = fileId+"_"+folderId;
	    				$.ajax({
							url : sysPath+'/console/document/delFile/'+attIdFolderId,
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