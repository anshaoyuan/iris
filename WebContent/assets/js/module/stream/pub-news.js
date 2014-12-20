requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['bootstrap','jquery-msg','plug-in/bootstrap-uploadify'],function(bootstrap,msg){
    	var globalEle = {
    			pubBtn : '#pub-btn',
    			postTitle : '#msgTitle',
    			postContent : '#msgContent',
    			postFileIdList : '#post-fileId-list',
    			postFileIdListPanel : '#post-fileId-list-panel',
    			fileUpload : '#file-upload',
    			sendSMS : '#sendSMS'
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
    				'uploader': sysPath + '/upload/stream;jsessionid=' + $('#jsessionid').val(),
    				'fileTypeExts' : '*.png;*.jpg;*.jpeg;*.bmp;*.gif;',
    				'buttonText': '',
    				'width'     :'34', 
    				'icon':'fa fa-picture-o',
    				'onUploadStart' : function(){
    					$(globalEle.pubBtn).attr('disabled',true);
    				},
    				'onUploadSuccess' : function(data){
    					$(globalEle.pubBtn).attr('disabled',false);
    				}
    			}
    		});
    		
    		
    		
    		$(globalEle.fileUpload).uploadify({
    			'multi' : false,
    			'swf' : sysPath + '/assets/js/plug-in/uploadify.swf',
    			'fileObjName' : 'fileUpload',
    			'fileSizeLimit' : '200MB',
    			'uploader' : sysPath + '/upload/stream;jsessionid=' + $('#jsessionid').val(),
    			'fileTypeExts' : '*.doc;*.docx;*.txt;*.pdf;*.ppt;*.pptx;*.xls;*.xlsx;*.zip;*.rar;*.apk;*.app;*.ipa;*.7z',
    			'buttonText' : ' 添加附件',
    			'buttonClass' : 'btn btn-success',
    			'width'     :'150', 
    			'uploadLimit' : 10,
    			'onUploadSuccess' : function(file, data, response) {
    				data = JSON.parse(data);
    				
    				var fileIdList = $(globalEle.postFileIdList).val();
    				if(fileIdList.length != 0){
    					fileIdList += '#' + data.id;
    				}else{
    					fileIdList = data.id;
    				}
    				$(globalEle.postFileIdList).val(fileIdList);
    				
    				$(globalEle.postFileIdListPanel).append($('<li class="btn btn-link">'+ data.fileName +'&nbsp;&nbsp;<i class="fa fa-times fileIdPanel"></i></li>').attr('data-fileId',data.id));
    				
    				$(globalEle.pubBtn).attr('disabled',false);
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
    		bindPub();
    		loadTemplate();
    		
    		$(document).delegate('#template-list','change',function(){
    			var $that = $(this);
    			if($that.val() && $that.val() != 'default'){
    				$(globalEle.postContent).wysihtml5('setValue',$that.val());
    			}
    		});
    		
    		$(globalEle.postFileIdListPanel).on('click','.fileIdPanel',function(){
    			var liEle = $(this).parent();
    			var fileId = liEle.attr('data-fileId');
    			
    			var fileIdList = $(globalEle.postFileIdList).val();
				fileIdList = fileIdList.split('#');
				fileIdList.splice(fileIdList.lastIndexOf(fileId),1);
				$(globalEle.postFileIdList).val(fileIdList.join('#'));
				liEle.remove();
    		});
    	});
    	
    	function loadTemplate(){
    		$.ajax({
    			url : sysPath + '/console/template/queryTemplate',
    			type : 'post',
    			dataType : 'json',
    			data : JSON.stringify({templateType : 0}),
    			contentType : 'application/json',
    			success : function(data){
    				if(data && data.length){
    					var $that = $('#template-list');
    					for(var t in data){
    						$that.append($('<option value="' + data[t].templateContext + '">'+ data[t].templateName +'</option>'))
    					}
    				}
    			}
    		})
    	}
    	
    	function bindPub(){
    		$(globalEle.pubBtn).click(function(){
    			var that = $(this);
    			var postData = {
    					streamTitle : $(globalEle.postTitle).val(),
    					streamContent : $(globalEle.postContent).val()
    			};
    			postData.sendAllPeople = 1;
    			
    			if(!validate(postData)){
    				return;
    			}
    			
    			processFile(postData);
    			
    			if($(globalEle.sendSMS).prop('checked')){
    				postData.sendSMS = true;
    			}
    			
    			that.attr('disabled',true);
    			that.find('span').text('发表中');
    			
    			$.ajax({
    				url : sysPath + '/console/stream/pub',
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
        						window.location.href = sysPath + '/console/stream/queryForManage'
        					},2000);
        				}else{
        					msg({content: data.msg});
        				}
        			}
    			});
    		});
    		
    		function processFile(postData){
    			var fileIdList = $(globalEle.postFileIdList).val();
    			if(fileIdList.length){
    				postData.attaList = []; 
    				fileIdList = fileIdList.split('#');
    				for ( var i = 0; i < fileIdList.length; i++) {
    					postData.attaList.push({id : fileIdList[i]});
    				}
    			}
        	}
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