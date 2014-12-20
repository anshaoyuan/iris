requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['jquery-msg','jquery-chosen','bootstrap','plug-in/bootstrap-uploadify'],function(msg,chosen){
    	var globalEle = {
    			pubBtn : '#pub-btn',
    			postTitle : '#msgTitle',
    			postContent : '#smsContent',
    			postTargetUser : '#userTab',
    			postTargetTeam : '#teamTab',
    			postTarget : '#post-target',
    			postReceiver : '#post-receiver',
    			postTargetAll : '#post_target_all',
    			postFileIdList : '#post-fileId-list',
    			postFileIdListPanel : '#post-fileId-list-panel',
    			fileUpload : '#file-upload',
    			postTargetPhone : '#smsPhone'
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
    		renderPostTarget($(globalEle.postTargetTeam).find('ul'),sysPath + '/mobile/stream/queryAllTeamAboutMe','team');
    		renderPostTarget($(globalEle.postTargetUser).find('ul'),sysPath + '/mobile/account/user/findUserByUserName/all','user');
    		renderPhoneInput($(globalEle.postTargetPhone),$('#v-phone').length ? $('#v-phone').val().trim() : undefined);
    		
    		bindPub();
    		
    		$('#userTab ul').delegate('a','click',function(event){
    			var that = $(this);
    			if($('#msgReceiver li[data-id='+ that.attr('data-id') +']').length == 0){
    				$('#msgReceiver').append($('<li class="btn btn-link" data-id="' + that.attr('data-id') + '" data-val="' + that.text() + '">'+ that.text() +'<i class="remove fa fa-times "></i></li>'));
    			}
    		});
    		
    		$('#teamTab ul').delegate('a','click',function(event){
    			var that = $(this);
    			if($('#msgTeam li[data-id='+ that.attr('data-id') +']').length == 0){
    				$('#msgTeam').append($('<li class="btn btn-link" data-id="' + that.attr('data-id') + '" data-val="' + that.text() + '">'+ that.text() +'<i class="remove fa fa-times "></i></li>'));
    			}
    		});
    		
    		$('#msgReceiver,#msgTeam').delegate('.remove','click',function(event){
    			$(this).parent().remove();
    		});
    		
    		$('#userTab .search-user').keyup(function(){
    			var list = $(this).parent().find('ul').data('list');
    			var keyWord = $(this).val();
    			var search = [];
    			
    			$.each(list,function(i,v){
    				if(v.userName.match(keyWord) || v.firstLetter.match(keyWord.toUpperCase())){
    					search.push(v);
    				}
    			});
    			
    			renderTargetUl(search,'user',$(this).parent().find('ul'));
    		});
    		
    		$('#teamTab .search-team').keyup(function(){
    			var list = $(this).parent().find('ul').data('list');
    			var keyWord = $(this).val();
    			var search = [];
    			
    			$.each(list,function(i,v){
    				if(v.teamName.match(keyWord)){
    					search.push(v);
    				}
    			});
    			
    			renderTargetUl(search,'team',$(this).parent().find('ul'));
    		});
    		
    		$(globalEle.postFileIdListPanel).on('click','.fileIdPanel',function(){
    			var liEle = $(this).parent();
    			var fileId = liEle.attr('data-fileId');
    			var edit = liEle.attr('data-edit');
    			var streamId = $(globalEle.postId).val();
    			
    			if(edit == 'true'){
    				$.ajax({
    					url : sysPath + '/mobile/stream/delAttachmentRef/' + streamId + '/' + fileId,
    					type : 'get',
    					dataType : 'json',
    					success : function(data){
    						if(data.code != '10000'){
    							msg({content:'删除附件失败!'});
    						}else{
    							liEle.remove();
    						}
    					}
    				});
    			}else{
    				var fileIdList = $(globalEle.postFileIdList).val();
    				fileIdList = fileIdList.split('#');
    				fileIdList.splice(fileIdList.lastIndexOf(fileId),1);
    				$(globalEle.postFileIdList).val(fileIdList.join('#'));
    				liEle.remove();
    			}
    			
    		});
    	});
    	
    	function bindPub(){
    		$(globalEle.pubBtn).click(function(){
    			var that = $(this);
    			
    			var postData = {
    					streamTitle : $(globalEle.postTitle).val(),
    					streamContent : $(globalEle.postContent).val(),
    					pubType : 'sms'
    			};
    			
    			postData.receiverIdList = collectReceivers($('#msgTeam'),$('#msgReceiver'),$(globalEle.postTargetPhone +'_select'));

    			if(!validate(postData)){
    				return;
    			}
    			
    			processFile(postData);

    			if($(globalEle.postTargetAll).attr("checked")){
    				postData.sendAllPeople = 1;
    			}
    			
    			that.attr('disabled',true);
    			that.find('span').text('发送中');
    			
    			$.ajax({
    				url : sysPath + '/mobile/stream/pub',
    				data : JSON.stringify(postData),
    				contentType : 'application/json',
    				dataType : 'json',
    				type : 'POST',
    				success : function(data){
    					that.attr('disabled',false);
    	    			that.find('span').text('发送');
    	    			
        				if(data.code == '10000'){
        					msg({content:'发送成功!'});
        					setTimeout(function(){
        						window.location.href = sysPath + '/mobile/index';
        					},2000);
        				}else{
        					msg({content: data.msg,confirm:true,cancel:false});
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
    	
    	function renderPostTarget(ele,url,mark){
	   		 $.ajax({
	   			 url: url,
	   			 dataType: "json",
	   			 success: function(respone){
	   				 if (respone.length > 0) {
	   					$(ele).data('list',respone);
	   					renderTargetUl(respone,mark,ele);
	   				 }
	   			 }
	   		 });
    	}
    	
    	function renderTargetUl(data,mark,ele){
    		var html = '';
    		
    		$.each(data,function(i,o){
    			if(mark == 'team'){
    				html+='<li><a data-id="'+ o.id +'">'+o.teamName+'</a></li>';
    			}else if(mark == 'user'){
    				if($userId != o.id){
    					html+='<li><a data-id="'+ o.id +'">'+o.userName+'</a></li>';
    				}
    			}
			});
    		
    		ele.empty().append(html);
    	}
    	
    	function renderPhoneInput(phoneInput,phone){
    		var targetId = phoneInput[0].id + "_select";
    		var targetSelect = $('<select id="'+ targetId +'"  multiple class="chzn-select" style="width:180px;" > </select>');
    		phoneInput.after(targetSelect).hide();
    		
    		chosen(phoneInput.next(),{show_no_results_text:false});	
    		
    		phoneInput.data('chosen',phoneInput.next().data('chosen'));
    		
    		if(phone && phone.length){
    			$('#' + targetId).empty().append('<option selected="selected" value="'+ phone +'">' + phone + '</option>');
    			phoneInput.next().trigger("liszt:updated").trigger("liszt:showing_dropdown");
    		}
    		
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
    	
    	function collectReceivers(teamEle,userEle,phoneEle){
    		var receivers = [];
    		teamEle.find('li').each(function(index,val){
    			receivers.push('!' + $(val).attr('data-id'));
    		});
    		userEle.find('li').each(function(index,val){
    			receivers.push($(val).attr('data-id'));
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
    			msg({content : '短信内容不能为空!'});
    			return false;
    		}else if(postData.streamContent.length > 5000){
    			msg({content : '短信内容长度不能超过5000个字符!'});
    			return false;
    		}else if($(globalEle.postTargetAll).attr("checked") != 'checked' 
    			&& postData.receiverIdList.length == 0 ){
    			msg({content : '消息收件人不能为空!'});
    			return false;
    		}
    		
    		return true;
    	}
    	
    });
    
    
});