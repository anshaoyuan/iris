require(['module/michat/michat','cookie','fileupload'],function(){
//	require('plug-in/upload/jquery-uploadify');
//	require('basic/jquery/fileupload/ajaxfileupload');
	var role = $('#login_role_name').val().trim();
	if(role == 'leader' || role == 'assistant'){
		setTimeout(runMichat,4000);
	}
	
	var ctx = window.sysPath;
	
	function runMichat(){
		dwr.engine.setActiveReverseAjax(true);  
		chatDwr.init(function(uid){
			var chatTitle = "即时聊天";
			var currUserData = {
					'sid' : $userId,
					'name' : $('#loginUserName').val().trim(),
					'head' : ''
			}
			
			$.michat({
				'uiSrc':ctx +'/assets/js/module/michat/michat-html.js',
				'currUserData':currUserData,
				'chatTitle':chatTitle
			});
			
			$.ajaxSetup({cache : false});
			$.ajax({
				'url' : ctx + '/mobile/chat/getUnreadMessageCount',
				'dataType' : 'json',
				'type' : 'get',
				'cache' : false,
				'success' : function(data) {
					if(data){
						$.michat.hasNewMessage();
					}
				}
			});
		});
		
	}
	
	
	$.michat.loadUser = initUserList;
	
	function initUserList(callBack){
		var groupList = [];

		$.ajax({
			'url' : ctx + '/mobile/chat/queryTeamMemberAboutMe',
			'type' : 'get',
			'dataType' : 'json',
			'success' : function(data){
				
				for(var i=0;i<data.length;i++){
					var group = [];
					group.sid = data[i].id;
					group.name = data[i].teamName;
					
					var teamMember = data[i].userList;
					
					for(var j=0;j<teamMember.length;j++){
						if(teamMember[j].id != $userId){
							group.push({
								'sid' : teamMember[j].id,
								'name' : teamMember[j].aliasName,
								'head' : sysPath + "/" +teamMember[j].userInfo.userImgUrl
							});
						}
					}
					
					groupList.push(group);
				}
				callBack(groupList);
			}
		});
		
	}
	
	//点击群组获取群内的成员在线情况
	$.michat.onlineOfTeam = function(teamId,div){
		$.ajax({
			'url' : 'webChat!getOnlineInfo.action',
			'type' : 'post',
			'dataType' : 'json',
			data:{"teamId":teamId},
			'success' : function(data){
				var vestList = data.online;
				for(var i=0;i<vestList.length;i++){
					var vest = vestList[i] , showName;
					var li =$("li[sloth-sid="+vest.vestId+"]", div);
					if(vest.isOnLine=="1"){
						showName=vest.vestName+"(在线)";
						var ul = li.parent();
						li.detach();
						ul.prepend(li);
					}else{
						showName=vest.vestName+"(离线)";
					}
					$("div[class='name']",li).html(showName);
				}
			}
		});
	}
	
	$.michat.fnGetOnlineAboutVest = function(sid,callBack){
		$.ajax({
			url : 'webChat!getOnlineInfo.action',
			type : 'post',
			dataType : 'json',
			data : {vestId : sid},
			success : function(data){
				callBack(sid,data.online);
			}
		});
	}
	
	//上传
	$.michat.onUpload = function(event){
		$(event.target).attr('name','fileUpload');
		$.ajaxFileUpload({
			url:ctx + '/chatUpload',
			secureuri:false,
			fileElementId: $(event.target).attr('id'),
			dataType: 'json',
			success: function (data){
//					data.filePath=unescape(data.filePath.replace(/\\u/g,'%u').replace(/;;/g,''));
//					data.fileName=unescape(data.fileName.replace(/\\u/g,'%u').replace(/;;/g,''));
				data.uploadType = event.uploadType;
				event.success(data);
			}
		});
	}
	
	//发送消息
	$.michat.onSendMessage = function(event){
		var currDate = new Date();
		
		var chat = {
				'sid' : event.sendTo.sid,
				'chatTime' : formatDateUtil(currDate),
				'chatContent' : event.chat.content,
				'type' : event.chat.type
		};
		if(event.chat.type == 1 || event.chat.type == 2){
			chat.chatContent = '上传文件  ' + chat.chatContent;
		}
		var chatPanel = event.success(chat);
		chat.chatPanel = chatPanel;
		
		var ajaxData = {
				'toUserId' : event.sendTo.sid,
				'content' : event.chat.content,
				'type' : event.chat.type,
				'filePath' : event.tempFilePath,
				'fileName' : event.tempFileName,
				'fileId' : event.tempFileId
		}
		
		$.ajax({
			'url' : ctx + '/mobile/chat/add',
			'dataType' : 'json',
			'data' : JSON.stringify(ajaxData),
			'contentType': 'application/json',
			'type' : 'post',
			'success' : function(data){
				if(data){
//					chatDwr.sendToClient(ajaxData.toUserId);
					chat.chatContent = data.content;
				}else{
					chat.chatContent = "<span style='color:red;'>消息传输失败!</span>";
				}
				
				chat.chatTime = data.createDate;
				event.success($.extend(chat,{'storage' : true}));
				
//				if(data && data.messages && data.messages.length > 0){
//					var messages = data.messages;
//					var messageList = new Array(messages.length);
//					for(var i=0;i<messages.length;i++){
//						messageList[i] = {};
//						messageList[i].sid = messages[i].fromVestId;
//						messageList[i].chatContent = messages[i].context;
//						messageList[i].type = messages[i].contextType;
//						messageList[i].chatTime = messages[i].createDate;
//					}
//					
//					$.michat.fnNewMessage(messageList);
//				}
			},
			'error' : function(){
				chat.chatContent = "<span style='color:red;'>消息传输失败!</span>";
				event.success(chat);
			}
		});
	};
	
	$.michat.onSearchHistory = function(event){
		var data = event.data;
		window.open('webset!userInfo.action?vo.infoType=mynotes-lxj&vo.notificationType='+data.sid);
	}
	
	$.michat.getNewMessage = function(){
		$.ajaxSetup({cache : false});
		$.ajax({
			'url' : ctx + '/mobile/chat/queryUnreadMessage',
			'dataType' : 'json',
			'type' : 'get',
			'cache' : false,
			'success' : function(data) {
				if (data && data.length > 0) {
					var messageList = new Array(data.length);
					for ( var i = 0; i < data.length; i++) {
						var messages = data[i];
						messageList[i] = {};
						messageList[i].sid = messages.fromUserId;
						messageList[i].chatContent = messages.content;
						messageList[i].type = messages.type;
						messageList[i].chatTime = messages.createDate;
					}
					
					$.michat.fnNewMessage(messageList);
				}
			}
		});
	}
	
	function formatDateUtil(date){
		var year,month,day,hours,minutes,seconds;
		if(date instanceof Date){
			year = date.getFullYear();
			month = date.getMonth() + 1;
			day = date.getDate();
			hours = date.getHours();
			minutes = date.getMinutes();
			seconds = date.getSeconds();
		}else{
			year = date.year !== undefined ? '20' + (date.year + '').substring(1) : date.getFullYear();
			month = date.month !== undefined ? (date.month + 1) : date.getMonth() + 1;
			day = date.date !== undefined ? date.date : date.getDate();
			hours = date.hours !== undefined ? date.hours : date.getHours();
			minutes = date.minutes !== undefined ? date.minutes : date.getMinutes();
			seconds = date.seconds !== undefined ? date.seconds : date.getSeconds();
		}
		
		
		year = year >= 10 ? year : '0' + year;
		month = month >= 10 ? month : '0' + month;
		day = day >= 10 ? day : '0' + day;
		hours = hours >= 10 ? hours : '0' + hours;
		minutes = minutes >= 10 ? minutes : '0' + minutes;
		seconds = seconds >= 10 ? seconds : '0' + seconds;
		
		var result = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
		
		return result;
	}

});

