requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['bootstrap','jquery-chosen','jquery-msg','plug-in/bootstrap-uploadify'],function(bootstrap,chosen,msg){
    	var globalEle = {
    			pubBtn : '#pub-btn',
    			postContent : '#sms-content',
    			postTitle : '#msgTitle',
    			postTargetUser : '#sms_target_user',
    			postFileIdList : '#post-fileId-list',
    			postFileIdListPanel : '#post-fileId-list-panel',
    			fileUpload : '#file-upload',
    			postTargetPhone : '#sms_target_phone'
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
    				'fileSizeLimit': '90kb',
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
    		
    		
    		$(globalEle.fileUpload).uploadify({
    			'multi' : false,
    			'swf' : sysPath + '/assets/js/plug-in/uploadify.swf',
    			'fileObjName' : 'fileUpload',
    			'fileSizeLimit' : '90kb',
    			'uploader' : sysPath + '/upload/mail;jsessionid=' + $('#jsessionid').val(),
    			'fileTypeExts' : '*.txt',
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
    		renderPostTarget($(globalEle.postTargetUser),sysPath + '/console/user/allUser','user');
    		renderPhoneInput($(globalEle.postTargetPhone));
    		
    		bindPub();
    		
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
    	
    	function bindPub(){
    		$(globalEle.pubBtn).click(function(){
    			var postData = {
    					streamTitle : $(globalEle.postTitle).val(),
    					streamContent : $(globalEle.postContent).val(),
    					pubType : 'sms'
    			};
    			
    			postData.receiverIdList = collectReceivers($(globalEle.postTargetUser +'_select'),$(globalEle.postTargetPhone +'_select'));

    			if(!validate(postData)){
    				return;
    			}
    			
    			processFile(postData);
    			
    			if($('#sms-platform-ios')[0].checked){
    				postData.adminSendSMSPlatform = 'ios';
    			}else if($('#sms-platform-android')[0].checked){
    				postData.adminSendSMSPlatform = 'android';
    			}else if($('#sendSMSText')[0].checked){
    				postData.sendSMSText = true;
    			}
    			
    			$.ajax({
    				url : sysPath + '/console/stream/pubSMS',
    				data : JSON.stringify(postData),
    				contentType : 'application/json',
    				dataType : 'json',
    				type : 'POST',
    				success : function(data){
        				if(data.code == '10000'){
        					msg({content : '发表成功!'});
        				}else{
        					msg({content : data.msg,confirm:true,cancel:false});
        				}
        			}
    			});
    		});
    	}
    	
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
    	
    	function renderPhoneInput(phoneInput){
    		var targetId = phoneInput[0].id + "_select";
    		var targetSelect = $('<select id="'+ targetId +'"  multiple class="chzn-select span6"> </select>');
    		phoneInput.after(targetSelect).hide();
    		
    		chosen(phoneInput.next(),{show_no_results_text:false});	
    		
    		phoneInput.data('chosen',phoneInput.next().data('chosen'));
    		
    		$('#'+ targetId +'_chzn>ul>li>input').bind('keyup',function(event){
			    if (event.keyCode!=37&&event.keyCode!=38&&event.keyCode!=39&&event.keyCode!=40) {
			    	var v = $(this).val().trim();
			    	if (v.length != 0) {
//			    		if(!(event.keyCode >= 48 && event.keyCode <= 57) && !(event.keyCode >= 96 && event.keyCode <= 105)){
//			    			v = v.substr(0,v.length - 1);
//			    		}
			    		
			    		var html='';
			    		$.each($('#'+ targetId +'_chzn>ul').find('li.search-choice'),function(i,o){
			    			var phone = $(o).find('span').html();
			    			html += '<option selected="selected" value="'+ phone +'">'+ phone +'</option>';
			    		});
			    		
			    		html+='<option value="'+ v +'">'+ v +'</option>';	
			    		$('#' + targetId).empty().append(html);
			    		phoneInput.next().trigger("liszt:updated").trigger("liszt:showing_dropdown");
			    	}
			    	
			    	$(this).val(v);
				}
			 }).focus(function(){
				 this.style.imeMode='disabled';
			 });
    	}
    	
    	
    	function renderPostTarget(ele,url,mark){
    		var targetId = ele[0].id + "_select";
	    	 var targetSelect = $('<select id="'+ targetId +'"  multiple class="chzn-select" style="width:'+(ele.width()+15)+'px;" > </select>');
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
	   						 if(mark == 'team'){
	   							 html+='<option value="'+ o.id +'">'+o.teamName+'</option>';
	   						 }else if(mark == 'user'){
	   							html+='<option value="'+ o.id +'">'+o.aliasName+'</option>';
	   						 }
	   					 });
	   				 }
	   				 
	   				 targetSelect.empty().append(html);
	   				 ele.next().trigger("liszt:updated");
	   			 }
	   		 });
    	}
    	
    	function collectReceivers(userEle,phoneEle){
    		var receivers = [];
    		userEle.find('option:selected').each(function(index,val){
    			receivers.push( $(val).val());
    		});
    		phoneEle.find('option:selected').each(function(index,val){
    			receivers.push(':' + $(val).val());
    		});
    		return receivers;
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
    		}else if(postData.streamContent.length > 500){
    			msg({content : '短信内容长度不能超过500个字符!'});
    			return false;
    		}else if(postData.receiverIdList.length == 0){
    			msg({content : '消息收件人不能为空!'});
    			return false;
    		}
    		return true;
    	}
    });
});