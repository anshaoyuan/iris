requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['bootstrap','jquery-msg','plug-in/bootstrap-uploadify'],function(bootstrap,msg){
    	var globalEle = {
    			pubBtn : '#pub-btn',
    			postTitle : '#msgTitle',
    			postContent : '#msgContent'
    	}; 
    	
    	require(['wysihtml5'],function(){
    		$(globalEle.postContent).wysihtml5({
    			'html' : false,
    			'color' : true,
    			'id':'pubhtml5',
    			stylesheets: [sysPath + "/assets/js/plug-in/wysihtml5/wysiwyg-color.css"],
    			uploadOptions: {
    				'multi': false,
    				'swf': sysPath + '/assets/js/plug-in/uploadify.swf',
    				'fileObjName': 'fileUpload',
    				'fileSizeLimit': '5MB',
    				'uploader': sysPath + '/upload/mail;jsessionid=' + $('#jsessionid').val(),
    				'fileTypeExts' : '*.png;*.jpg;*.jpeg;*.bmp;*.gif;',
    				'buttonText': '',
    				'width'     :'34', 
    				'icon':'fa fa-picture-o',
    				'onUploadStart':function(){
    					$(globalEle.pubBtn).attr('disabled',true);
    				},
    				'onUploadSuccess':function(data){
    					$(globalEle.pubBtn).attr('disabled',false);
    				}
    			}
    		});
    	});
    	
    	
    	$(document).ready(function(){
    		
    		bindPub();
    		
    	});
    	
    	function bindPub(){
    		$(globalEle.pubBtn).click(function(){
    			var that = $(this);
    			var postData = {
    					streamTitle : $(globalEle.postTitle).val(),
    					streamContent : $(globalEle.postContent).val()
    			};
    			
    			if(!validate(postData)){
    				return;
    			}
    			
    			postData.pubType = "suggest";
    			
    			that.attr('disabled',true);
    			that.find('span').text('发表中');
    			
    			$.ajax({
    				url : sysPath + '/mobile/stream/pub',
    				data : JSON.stringify(postData),
    				contentType : 'application/json',
    				dataType : 'json',
    				type : 'POST',
    				success : function(data){
    					that.attr('disabled',false);
    	    			that.find('span').text('发表');
    	    			
        				if(data.code == '10000'){
        					msg({content:'发表成功!'});
        					setTimeout(function(){
        						window.location.href = sysPath + '/mobile/index';
        					},2000);
        				}else{
        					msg({content: data.msg});
        				}
        			}
    			});
    		});
    	}
    	
    	
    	function validate(postData){
    		if(postData.streamTitle.length == 0){
    			msg({content : '消息标题不能为空!'});
    			return false;
    		}else if(postData.streamTitle.length > 100){
    			msg({content : '消息标题长度不能超过100个字符!'});
    			return false;
    		}else if(postData.streamContent.length == 0){
    			msg({content : '消息内容不能为空!'});
    			return false;
    		}else if(postData.streamContent.length > 500000){
    			msg({content : '消息内容不能过长!'});
    			return false;
    		}
    		
    		return true;
    	}
    	
    });
    
    
});