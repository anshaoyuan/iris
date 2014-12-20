requirejs.config({
	baseUrl : sysPath + '/assets/js'
});
require(['config'],function(){
    require(['bootstrap','jquery-msg','plug-in/bootstrap-uploadify','datatimepicker'],function(bootstrap,msg){
    	var globalEle = {
    			pubBtn : '#pub-btn',
    			postId : '#post-id',
    			postTitle : '#msgTitle',
    			postContent : '#msgContent',
    			postTargetUser : '#userTab',
    			postTargetTeam : '#teamTab',
    			postTarget : '#post-target',
    			postReceiver : '#post-receiver',
//    			postImgIdList : '#post-imgId-list',
    			postFileIdList : '#post-fileId-list',
    			postFileIdListPanel : '#post-fileId-list-panel',
    			postContentHidden : '#post-content-hidden',
    			fileUpload : '#file-upload',
    			postTargetAll : '#post_target_all',
    			postTransmit : '#post-transmit'
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
    			'fileSizeLimit' : '200MB',
    			'uploader' : sysPath + '/upload/stream;jsessionid=' + $('#jsessionid').val(),
    			'fileTypeExts' : '*.doc;*.docx;*.txt;*.pdf;*.ppt;*.pptx;*.xls;*.xlsx;*.zip;*.rar;*.apk;*.app;*.ipa;*.7z',
    			'buttonText' : ' 添加附件',
    			'buttonClass' : 'btn btn-success',
    			'width'     :'150', 
    			'uploadLimit' : 10,
    			'onUploadSuccess' : function(file, data, response) {
    				$(globalEle.pubBtn).attr('disabled',false);
    				
    				var data = JSON.parse(data);
    				
    				var fileIdList = $(globalEle.postFileIdList).val();
    				if(fileIdList.length != 0){
    					fileIdList += '#' + data.id;
    				}else{
    					fileIdList = data.id;
    				}
    				$(globalEle.postFileIdList).val(fileIdList);
    				
    				$(globalEle.postFileIdListPanel).append($('<li class="btn btn-link">'+ data.fileName +'&nbsp;&nbsp;<i class="fa fa-times fileIdPanel"></i></li>').attr('data-fileId',data.id));
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
    		var postIdEle = $(globalEle.postId); 
    		var postTransmitEle = $(globalEle.postTransmit);
    		if(postIdEle.length > 0 && postTransmitEle.length <= 0){
        		$(globalEle.postTarget).html('收件人:'+initPostTarget($(globalEle.postReceiver).val()));
        		setTimeout(function(){
        			$(globalEle.postTitle).prop('disabled',true);
        			$(globalEle.postContent).wysihtml5('setValue',$(globalEle.postContentHidden).html());
        		},1000);
        	}else{
        		renderPostTarget($(globalEle.postTargetTeam).find('ul'),sysPath + '/mobile/stream/queryAllTeamAboutMe','team');
        		renderPostTarget($(globalEle.postTargetUser).find('ul'),sysPath + '/mobile/account/user/findUserByUserName/all','user');
        	}
    		
    		if($('#login_role_name').val().trim() == 'leader'){
    			$('#secInvisible-ckb').parent().show();
    		}
    		
    		$('#annexation-vote-time-panel').datetimepicker();
    		
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
    		
    		$('.annexation-nav').click(function(){
    			if($(this).attr('disabled')){
    				return;
    			}
    			var mark = $(this).attr("data-mark");
    			
    			$('.annexation-dest[data-mark='+ mark +']').toggle();

    			$('.annexation-dest[data-mark!='+ mark +']').hide();
    			
    			$('.annexation-head').attr('data-mark',mark);
    			
    		});
    		
    		$('#vote-type-radio').click(function(){
    			$('.annexation-vote-body').html('<div class="controls controls-row"><input class="span5 vote-option" type="text" value="是"/></div><div class="controls controls-row"><input class="span5 vote-option" type="text" value="否"/></div>');
    		});
    		
    		var voteCheckboxLi = '<div class="controls controls-row"><input class="span5 vote-option" type="text"/><button type="button" class="btn btn-small btn-link vote-option-remove-btn"><i class="fa fa-minus-square fa-lg"></i></button></div>';
    		
    		$('#vote-type-checkbox').click(function(){
    			$('.annexation-vote-body').html('<div class="controls controls-row"><input class="span5 vote-option" type="text" /></div><div class="controls controls-row"><input class="span5 vote-option" type="text"/></div><div class="controls controls-row"><input class="span5 vote-option" type="text"/><button class="btn btn-small btn-link vote-option-add-btn" type="button"><i class="fa fa-plus-square fa-lg"></i></button></div>');
    		});
    		
    		$('.annexation-vote-body').on('click','.vote-option-add-btn',function(){
    			if($(this).parent().prev().find('input.vote-option').val().trim().length > 0){
    				var voteOption = $(this).parent().find('input.vote-option');
    				$(this).parent().before($(voteCheckboxLi));
    				$(this).parent().prev().find('input.vote-option').val(voteOption.val());
    				voteOption.val('');
    			}else{
    				msg({content : '投票项不能为空!'});
    			}
    		});
    		
    		$('.annexation-vote-body').on('click','.vote-option-remove-btn',function(){
    			$(this).parent().remove();
    		});
    		
    		$('.annexation-vote-body').delegate('.vote-option-clear-btn','click',function(event){
    			event.preventDefault();
    			$(this).parent().remove();
    		});
    		
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
    		
    		loadTemplate();
    		
    		$(document).delegate('#template-list','change',function(){
    			var $that = $(this);
    			if($that.val() && $that.val() != 'default'){
    				$(globalEle.postContent).wysihtml5('setValue',$that.val());
    			}
    		});
    	});
    	
    	function loadTemplate(){
    		$.ajax({
    			url : sysPath + '/mobile/template/queryTemplate',
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
    			
    			if($(globalEle.postId).length > 0){
    				postData.id = $(globalEle.postId).val();
    			}
    			
    			if($(globalEle.postTransmit).length > 0){
    				delete postData.id;
    				postData.parentId = $(globalEle.postId).val();
    			}
    			
    			if($('#secInvisible-ckb')[0].checked){
    				postData.secInvisible = 1;
    			}
    			
    			postData.receiverIdList = collectReceivers($('#msgTeam'),$('#msgReceiver'));

    			if(!validate(postData)){
    				return;
    			}
    			

    			processFile(postData);
    			
    			if($(globalEle.postTargetAll).attr("checked")){
    				postData.sendAllPeople = 1;
    			}
    			
    			postData.sendSMS = $('#sms-notify').prop('checked');
    			
    			var mark = $('.annexation-head').attr('data-mark');
    			if(mark == 'vote'){
    				postData.vote = {};
    				postData.vote.voteType = $('#vote-type-radio').attr('checked') ? 0 : 1;
    				
    				postData.vote.voteOptionList = [];
    				
    				$('.annexation-vote-body .vote-option').each(function(index,val){
    					postData.vote.voteOptionList.push({content : $(this).val()});
    				});
    			}else if(mark == 'schedule'){
    				postData.schedule = {};
    				postData.schedule.place = $('#annexation-vote-place').val();
    				postData.schedule.startTimeFmt = $('#annexation-vote-time').val();
    			}
    			
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
    	
    	function collectReceivers(teamEle,userEle){
    		var receivers = [];
    		teamEle.find('li').each(function(index,val){
    			receivers.push('!' + $(val).attr('data-id'));
    		});
    		userEle.find('li').each(function(index,val){
    			receivers.push($(val).attr('data-id'));
    		});
    		return receivers;
    	}
    	
    	function initPostTarget(receivers){
    		receivers = receivers.split(',');
    		var html = '<ul>';
    		for(var r in receivers){
    			var receiver = receivers[r].split('=');
    			if(receiver[0].indexOf('!') == 0){
    				html += '<li><a href="'+ sysPath +'/mobile/team/list?type='+ receiver[0] +'">#'+ receiver[1] +'#</a></li>';
    			}else{
    				html += '<li><a href="'+ sysPath +'/user/toUserDetail/'+ receiver[0] +'">'+ receiver[1] +'</a></li>';
    			}
    		}
    		html += '</ul>';
    		return html;
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
    		}else if(($(globalEle.postId).length == 0 && $(globalEle.postTransmit).length == 0) || $(globalEle.postTransmit).length > 0){
    			if($(globalEle.postTargetAll).attr("checked") != 'checked' 
    			&& postData.receiverIdList.length == 0 ){
	    			msg({content : '消息收件人不能为空!'});
	    			return false;
    			}
    		}
    		
    		var voteOptionRequire = false;
    		$('.annexation-vote-body .vote-option').each(function(index,val){
    			if($(this).val().trim().length <= 0){
    				msg({content : '投票项不能为空!'});
    				return (voteOptionRequire = true);
    			}
    		});
    		
    		if(voteOptionRequire){
    			return false;
    		}
    		
    		var mark = $('.annexation-head').attr('data-mark');
    		if(mark == 'schedule' && $('#annexation-vote-place').val().length > 100){
    			msg({content : '约会地点长度不能大于100字符!'});
    			return false;
    		}
    		
    		return true;
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
    	
    });
    
    
});