requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['jquery-msg','plug-in/bootstrap-uploadify','bootstrap'],function(msg){
    	var globalEle = {
    			fileUpload : '#app-file',
    			pubBtn : '#pub-btn',
    			appPath : '#app-path'
    	};
    	
    	require(['wysihtml5'],function(){
	    	$(globalEle.fileUpload).uploadify({
				'multi' : false,
				'swf' : sysPath + '/assets/js/plug-in/uploadify.swf',
				'fileObjName' : 'fileUpload',
				'fileSizeLimit' : '200MB',
				'uploader' : sysPath + '/app-upload;jsessionid=' + $('#jsessionid').val(),
				'fileTypeExts' : '*.apk;*.ipa',
				'buttonText' : ' 添加附件',
				'buttonClass' : 'btn btn-success',
				'width'     :'150', 
				'uploadLimit' : 10,
				'onUploadSuccess' : function(file, data, response) {
					data = JSON.parse(data);
					$(globalEle.pubBtn).attr('disabled',false);
					if(data && data.code == '10000'){
						msg({content : '上传成功!'});
					}else{
						msg({content : data.msg});
					}
				},
				'onUploadStart' : function(){
					$(globalEle.pubBtn).attr('disabled',true);
					
				},
				'onUploadingCancel':function(){
					$(globalEle.pubBtn).attr('disabled',false);
				}
			});
    	});
    	
    	$(document).ready(function(){
			$('#pub-btn').click(function(){
				var pubData = {
						clientName : $('#app-clientName').val(),
						clientVersion : $('#app-clientVersion').val(),
						clientDesc : $('#app-clientDesc').val(),
						clientType : $('#app-android').prop('checked') ? 'android' : 'ios'
				};
				
				if(!validate(pubData)){
					return;
				}
				
				$.ajax({
					url : sysPath + '/console/app/pub',
					type : 'post',
					dataType : 'json',
					data : JSON.stringify(pubData),
					contentType : 'application/json',
					success : function(data){
						if(data.code == '10000'){
							msg({content : '添加成功!'});
							setTimeout(function(){
								window.location.href = sysPath + '/console/app'
							},2000);
						}else{
							msg({content : msg});
						}
					}
				});
			});
			
			function validate(postData){
				if(!postData.clientName || postData.clientName.length == 0){
					msg({content : '名称不能为空!'})
					return false;
				}else if(!postData.clientVersion || postData.clientVersion.length == 0){
					msg({content : '版本号不能为空!'})
					return false;
				}else if(!postData.clientDesc || postData.clientDesc.length == 0){
					msg({content : '描述不能为空!'})
					return false;
				}
				return true;
			}
			
		});
    });
    
});