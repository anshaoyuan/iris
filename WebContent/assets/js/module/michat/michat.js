/*  
  * 本系统核心数据对象为用户对象{sid:'',name:'',head:'',groupsid:''}
 */
(function($){
	/*
	 * 参数
	 * uiSrc ui资源地址
	 * userData 用户数据(规定该数组包含当前用户数据)
	 * currUserData 当前用户数据
	 * nlmData 最近联系人,如果默认参数localStorage为true,则优先考虑本地存储
	 * chatTitle 聊天标题
	 */
	var options;
	
	/*
	 * currUser 当前用户
	 * currChatSid 当前会话id 
	 * userList 全局用户列表  (Array类型:索引为用户sid,值为{sid:'',name:'',head:'',groupsid:''}，规定该数组包含当前用户数据)
	 * userGroupList 用户群组列表(Array类型:索引为群组sid,值为组内用户的sid列表;数组元素有name属性为群组名称)
	 * uidata ui元素引用(users:左侧用户元素列表,groups:左侧群组元素列表,chats:会话tab标签元素)
	 * searchList  查询用户列表结果
	 * nlmData 最近联系人
	 */
	var michatData = {
			'currUser':null,
			'currChatSid':null,
			'userList':[],
			'userGroupList':[],
			'uidata':{
				'users':[],
				'groups':[],
				'chats':[]
			},
			'searchList':[],
			'nlmData':[],
			'newMessages':{}
		};
	//包含聊天控件中的主要元素
	var michatUi;
	
	$.michat = function($options){
		if(!$options) throw new Error('方法参数未找到!');
		if(!$options.uiSrc) throw new Error('uiSrc属性未设置!');
		
		options = $options;
		
		michatData.currUser = options.currUserData;
		
		_load(function(){
			_initDefaults();//初始化默认值
			_initUi();//初始化UI元素引用
			_bindEvent();//绑定事件
			options.userData && _initUserList();//如果参数中未传递用户列表则，调用初始化用户方法
		});
	}
	
	//加载html代码，并初始化ui
	function _load(callBack){
		$.ajax({
			'url' : options.uiSrc,
			'dataType' : 'text',
			'success' : function(data){
				michatUi = $('<div></div>');
				michatUi.html(data);
				
				callBack();
			}
		});
	}
	
	function _initDefaults(){
		if(!window.localStorage){
			$.michat.defaults.localStorage = false;
		}
	}
	//获取主要的元素对象并保持引用
	function _initUi(){
		if(options.$uiContainer){
			options.$uiContainer.append(michatUi);
		}else{
			var uiContainer = $('<div></div>');
			uiContainer.css("position","fixed");
			uiContainer.css("bottom","0px");
			uiContainer.css("right","20px");
			uiContainer.css('z-index',10000)
			michatUi.appendTo(uiContainer);
			$(document.body).append(uiContainer);
		}
		
		michatUi.rightPannel = michatUi.find('.michat-right');
		michatUi.rightPannel.bottom = michatUi.rightPannel.find('.michat-right-bottom');
		michatUi.rightfootPannel = michatUi.find('.michat-right-foot');
		michatUi.rightPannel.title = michatUi.rightPannel.find('.michat-title');
		michatUi.rightPannel.title.min = michatUi.rightPannel.title.find('.min');
		
		michatUi.leftPannel = michatUi.find('.michat-left');
		michatUi.leftPannel.bottom = michatUi.leftPannel.find('.michat-chat-bottom');
		michatUi.leftfootPannel = michatUi.find('.michat-left-foot');
		michatUi.leftPannel.title = michatUi.leftPannel.find('.michat-title');
		michatUi.leftPannel.title.min = michatUi.leftPannel.title.find('.min');
		michatUi.leftPannel.title.close = michatUi.leftPannel.title.find('.close');
		
		michatUi.chatTabs = michatUi.leftPannel.find('.michat-chat-list-container .tabs');
		michatUi.chatTabSrcs = michatUi.leftPannel.find('.michat-chat-container .tab-srcs');
		
		michatUi.chatTabsContainer = michatUi.leftPannel.find('.michat-chat-list-container');
		michatUi.chatTabsSrcsContainer = michatUi.leftPannel.find('.michat-chat-container');
		
		michatUi.userListContainer = michatUi.rightPannel.find('.michat-userContainer-group');//右侧用户列表容器
		michatUi.nlmContainer = michatUi.rightPannel.find('.michat-userContainer-history');//联系人列表容器
		
		michatUi.chatIn = michatUi.leftPannel.find('.imchat-chat-in');//聊天输入框
		
		//李辉书写代码
//		michatUi.chatIn.wysihtml5({
//		    "font-styles": false,
//	        "color": false,
//	        "emphasis": false,
//	        "lists": false,
//	        "html": false,
//	        "link": false,
//	        "image": false,
//        	"upload":false,
//        	"at":false,
//        	"cutNote":false,
//		});
//		
//		$('#chat_img').uploadify({
//			 	'multi': false,
//		        'swf': 'web_js/plug-in/bootstrap/scripts/uploadify.swf',
//		        'fileObjName': 'vo.attechment',
//		        'fileSizeLimit': '2MB',
//		        'uploader': 'streamFileUpload',
//		        'fileTypeExts' : (',' + ZX.attachment.imgType).split(',').join('*.').replace(/\*/g,';*'),
//		        'buttonText': '',
//		        'width'     :'24', 
//		        'icon':'icon-picture',
//		        'onUploadSuccess': function(file, data, response) {
//					if (response) {
//		    			var rData= $.parseJSON(data);
//		    			$('#chat_html').data('wysihtml5').editor.composer.commands.exec("insertImage", rData.filePath);
//					} 
//				}
//		});
//		
//		var pathName = window.location.pathname;
//		var oldPath = pathName.substr(pathName.lastIndexOf('/') + 1);
//		pathName = pathName.replace(oldPath,'streamFileUpload');
//		var scpMgr = new CaptureManager("CaptureMessage");
//		//请将下面地址改为实际上传地址。
//		scpMgr.Config["PostUrl"] = window.location.origin + pathName;
//
//	
//			$("#BtnCapture").click(function() { 
//				scpMgr.Capture();
//				});
//		
		//end
		
		michatUi.chatSendBtn = michatUi.leftPannel.find('.send');//发送按钮
		
		michatUi.chatTool = michatUi.leftPannel.find('.michat-chat-tool');//工具条
		
		if(options.chatTitle){
			michatUi.rightfootPannel.find('.sign').html(options.chatTitle);
		}
	}
	
	function _bindEvent(){
		//初始化基本操作
		_bindBaseEvent();
		//初始化应用操作
		_bindAppEvent();
	}
	
	//初始化用户列表
	function _initUserList(){
		//初始化内部用户列表数组
		michatData.userList = new Array();
		
//		michatData.userList[ZX.vest.vestId] = {
//			'sid' : ZX.vest.vestId,
//			'name' : ZX.vest.vestName,
//			'head' : ZX.vest.vestImage
//		};
		michatData.userList[michatData.currUser.sid] = michatData.currUser;
		
		//初始化内容用户组数组
		michatData.userGroupList = new Array(options.userData.length);
		
		michatUi.userListContainer.html('');
		
		for(var i=0;i<options.userData.length;i++){
			var group = options.userData[i];
			michatData.userGroupList[group.name] = new Array(group.length);
			michatData.userGroupList[group.name].name = group.name
			
			michatUi.userListContainer.append($.michat.Ui.userGroup);
			var groupEle = michatUi.userListContainer.children().last();
			
			groupEle.find('.groupName').text(group.name).attr('title',group.name).attr('sloth-sid',group.sid).click($.michat.fnUserCascadeEvent);
			michatData.uidata.groups[group.sid] = groupEle.find('.groupName');
			groupEle.find('ul').hide();
			
			for(var j=0;j<group.length;j++){
				groupEle.find('ul').show();
				groupEle.find('ul').append($.michat.Ui.userLi);
				var liEle = groupEle.find('ul').children().last();
				michatData.uidata.users[group[j].sid] = liEle;
				var headSrc = group[j].head;
				
				liEle.find('.head img').attr('src',headSrc);
				liEle.data('sloth-data',group[j]);
				liEle.attr('sloth-sid',group[j].sid);
				liEle.attr('sloth-group-sid',group.sid);
				liEle.find('.name').text(group[j].name).attr('title',group[j].name);
				
				if(michatData.currUser.sid != group[j].sid){
					liEle.click(function(event){
						var data = $(this).data('sloth-data');
						$.michat.fnOpenChat(data);
						event.stopPropagation();
					});
				}
				
				groupEle.find('ul').toggle($.michat.defaults.userListExpansion);
				
				michatData.userGroupList[group.name][j] = group[j].sid;
				michatData.userList[group[j].sid] = group[j];
				michatData.userList[group[j].sid].groupsid = group.sid;
			}
		}
	}
	//初始化联系人
	function _initNLM(){
		var currSid = michatData.currUser.sid;
		if($.michat.defaults.localStorage ){
			if(localStorage.getItem(currSid+'_michat_nlm') && localStorage.getItem(currSid+'_michat_nlm').length > 0){
				michatData.nlmData = JSON.parse(localStorage.getItem(currSid+'_michat_nlm'));
			
				if(!(michatData.nlmData instanceof Array)){
					throw new Error('最近联系人初始化异常');
				} 
			}else{
				michatData.nlmData = options.nlmData;
			}
		}else{
			michatData.nlmData = options.nlmData;
		}
		
		
		if(!michatData.nlmData){
			michatData.nlmData = new Array();
		}else{
			$.michat.refreshLinkMan();
		}
	}
	//初始化基本操作
	function _bindBaseEvent(){
		//左右面板点击操作
		(function(){
			michatUi.leftfootPannel.click(function(event){
				_toggleLeftPannel();
			});
			
			michatUi.leftPannel.title.click(function(event){
				_toggleLeftPannel();
			});
			
			michatUi.leftPannel.title.min.click(function(event){
				_toggleLeftPannel();
				event.stopPropagation();
			});
			
			michatUi.leftPannel.title.close.click(function(event){
				_closeLeftPannel();
				event.stopPropagation();
			});
			
			michatUi.leftPannel.bottom.click(function(event){
				_toggleLeftPannel();
			});
			
			michatUi.rightfootPannel.click(function(event){
				_toggleRightPannel();
			});
			
			michatUi.rightPannel.title.click(function(event){
				_toggleRightPannel();
			});
			
			michatUi.rightPannel.title.min.click(function(event){
				_toggleRightPannel();
				event.stopPropagation();
			});
			
			michatUi.rightPannel.bottom.click(function(event){
				_toggleRightPannel();
			});
			
			function _toggleRightPannel(){
				michatUi.rightPannel.toggle();
			}
			
			function _toggleLeftPannel(){
				michatUi.leftPannel.toggle();
			}
			
			function _closeLeftPannel(){
				michatUi.leftPannel.hide();
				michatUi.leftfootPannel.hide();
				michatUi.chatTabs.html('');
				michatData.currChatSid = null;
			}
		})();
		
		//级联操作
		function _cascadeEvent(event){
			$(this).parent().find('ul').toggle();//切换显示隐藏
			if($(this).parent().find('ul').is(':hidden')){
				$(this).css('background-position','-235px -20px');
			}else{
				$(this).css('background-position','-235px -40px');
				var div = $(this).parent();
				var teamId=$(this).attr("sloth-sid");
				
				$.michat.onlineOfTeam(teamId,div);
			}
			event.stopPropagation();
		}
		
		//右侧横向标签页切换
		michatUi.rightPannel.find('.michat-userContainer .tabs').find('li').click(function(event){
			$(this).parent().children().attr('class','group');
			
			$(this).removeAttr('class');
			
			michatUi.rightPannel.find('.michat-userContainer .tab-srcs').children().hide();
			michatUi.rightPannel.find('.michat-userContainer .tab-srcs').children(':eq('+$(this).index()+')').show();
		});
		
		//左侧竖向标签页切换
		(function(){
			michatUi.leftPannel.find('.michat-chat-list-up').click(function(event){
				var originY = parseInt(michatUi.chatTabs.css('top'));
				if(originY + 32 < 0){
					michatUi.chatTabs.css('top',originY + 32 + 'px');
				}else{
					michatUi.chatTabs.css('top','0px');
				}
			});
			
			michatUi.leftPannel.find('.michat-chat-list-down').click(function(event){
				var viewHeight = parseInt(michatUi.chatTabs.parent().css('height'));
				var originHeight = parseInt(michatUi.chatTabs.css('height'));
				var originY = parseInt(michatUi.chatTabs.css('top'));
				if(originHeight + originY > viewHeight){
					michatUi.chatTabs.css('top',originY - 32 + 'px');
				}
			});
			//关闭会话标签
			function _closeChat(sid){
				
				var tab = michatUi.chatTabs.children('[sloth-sid='+sid+']');
				if(tab.attr('class').indexOf('li-hover') != -1){
					michatData.currChatSid = null;
					if(tab.index() == 0){
						_showChat(michatUi.chatTabs.children().eq(1).attr('sloth-sid'));
					}else{
						_showChat(michatUi.chatTabs.children().eq(0).attr('sloth-sid'));
					}
				}
				
				michatData.uidata.chats[sid] = null;
				tab.remove();
			}
			//打开会话
			function _openChat($para,saveOldChat){
				if(typeof $para === 'number'){
					if(michatData.userList[$para]){
						$para = michatData.userList[$para];
					}else{
						alert('很抱歉，您和Ta不在同一个群组，无权与该用户进行聊天!');
						return ;
					}
				}
				
//				if(michatData.currUser.sid == $para.sid){
//					return;
//				}
				
				//判断左侧面板是否显示
				michatUi.leftPannel.show();
				michatUi.leftfootPannel.show();
				
				var tab = michatUi.chatTabs.children('[sloth-sid="'+$para.sid+'"]');
				if(tab.length < 1){//创建
					michatUi.chatTabs.append($.michat.Ui.chatTab);
					tab = michatUi.chatTabs.children().last();
					
					michatData.uidata.chats[$para.sid] = tab;
					tab.attr('sloth-sid',$para.sid);
					
					try{
						var headSrc = $para.head;
						
						tab.find('.head img').attr('src',headSrc);
					}catch(e){}
					tab.find('.name').text($para.name).attr('title',$para.name);
					
					var close = tab.find('.close');
					close.attr('sloth-sid',$para.sid);
					close.click(function(event){
						_closeChat($(this).attr('sloth-sid'));
						event.stopPropagation();
					});
					
					tab.mouseover(function(event){
						if(tab.parent().children().length > 1){
							close.toggle();
						}
					});
					tab.mouseout(function(event){
						if(tab.parent().children().length > 1){
							close.toggle();
						}
					});
					
					tab.click(function(event){
						_showChat($(this).attr('sloth-sid'));
					});
					
					//添加初始化聊天记录
					if( michatUi.chatTabSrcs.find('[sloth-sid="'+$para.sid+'"]').length <= 0){
						michatUi.chatTabSrcs.append($.michat.Ui.chatTabSrc);
						var tabSrc = michatUi.chatTabSrcs.children().last();
						tabSrc.attr('sloth-sid',$para.sid);
						
						if($.michat.defaults.localStorage){
							var key = michatData.currUser.sid+'_chat-history-'+$para.sid;
							var chatHistory = JSON.parse(localStorage.getItem(key));
//							localStorage.removeItem(key);
							
							if(chatHistory && chatHistory instanceof Array){
								if(chatHistory.length > $.michat.defaults.chatHistoryMax){
									chatHistory.splice(0,$.michat.defaults.chatHistoryMax - chatHistory.length);
								}
								
								for(var i=0;i<chatHistory.length;i++){
									$.michat.fnAppendChatContent(chatHistory[i]);
								}
							}
						}
					}
					
				}
				
				if(michatData.newMessages && michatData.newMessages['_' + $para.sid]){
					for(var k = 0 ; k < michatData.newMessages['_' + $para.sid].length ; k++){
						$.michat.fnAppendChatContent($.extend(michatData.newMessages['_' + $para.sid][k],{'storage' : true}));
					}
					
					delete michatData.newMessages['_' + $para.sid];
					
					if($.michat.defaults.readAddLinkMan){
						$.michat.updateLinkMan($para.sid);//打开会话窗口同时有新消息时记录联系人
					}
				}
				
				if(saveOldChat && michatData.currChatSid){//提醒自动打开的对话框
					_showChat(michatData.currChatSid);
				}else{
					_showChat($para.sid);
				}
				
				//判断竖向tab栏是否显示
				if(michatUi.chatTabs.children().length >= 2){
					michatUi.chatTabsContainer.css('width','100px');
					michatUi.chatTabsSrcsContainer.css('width','400px');
				}else{
					michatUi.chatTabsContainer.css('width','0px');
					michatUi.chatTabsSrcsContainer.css('width','500px');
				}
				
			}
			//选中会话框
			function _showChat(sid){
				michatUi.chatTabs.children().removeClass('li-hover');
				var chatTab = michatUi.chatTabs.children('[sloth-sid="'+sid+'"]');
				chatTab.addClass('li-hover');
				
				michatUi.chatTabSrcs.children().hide();
				michatUi.chatTabSrcs.children('[sloth-sid="'+sid+'"]').show();
				
				michatUi.leftPannel.title.find('.chat-name').text(chatTab.find('.name').text());
				michatUi.leftfootPannel.text('与  '+ chatTab.find('.name').text() + ' 聊天中');
				
				michatData.currChatSid = sid;
				
				$.michat.fnGetOnlineAboutVest(sid,function(_sid,isOnline){
					if(michatData.currChatSid == _sid){
						if(isOnline){
							michatUi.leftPannel.title.find('.online-vest').text('[在 线]');
						}else{
							michatUi.leftPannel.title.find('.online-vest').text('[离 线]');
						}
					}
				});
			}
			
			$.michat.fnCloseChat = _closeChat;
			$.michat.fnShowChat = _showChat;
			$.michat.fnOpenChat = _openChat;
			$.michat.fnUserCascadeEvent  = _cascadeEvent;
		})();
	}
	//初始化应用操作
	function _bindAppEvent(){
		//首次点击加载用户数据
		michatUi.rightfootPannel.one('click.first',function(event){
			if(!options.userData){
				var loading = $('<div style="text-align:center;top:50px;">加载中...</div>');
				michatUi.rightPannel.find('.michat-userContainer-group').append(loading);
				
				$.michat.loadUser(function(groups){
					michatUi.rightPannel.find('.michat-userContainer-group').html('');
					
					options.userData = groups;
					_initUserList();//初始化用户列表
					$.michat.afterLoadUser();
				});
			}
		});
		
		//文件下载
		michatUi.leftPannel.delegate('.download_file','click',function(){
			var dataStr = $(this).attr('sloth-data');
			var id = dataStr.match(/(&|^)tempFileId=([^&]+)/,'g')[2];
			document.location="webStream!downloadAttachment.action?vo.attachmentId="+id;
		});
		
		michatUi.rightPannel.find('.michat-userContainer .tabs li .history').bind('click',(function fn(){
			_initNLM();
			$(this).unbind('click',fn);
		}));
		
		//绑定发送按钮事件
		michatUi.chatSendBtn.click(function(event){
			_sendMessage();
			event.stopPropagation();
		});
		
		michatUi.chatIn.unbind();
		//绑定回车发送事件
		michatUi.chatIn.bind('keypress',function(event){
			if(event.keyCode == '13' && $.michat.defaults.sendKey == 'enter'){
				_sendMessage();
			}else if(event.ctrlKey && (event.keyCode == '10' || event.keyCode == '13')  && $.michat.defaults.sendKey == 'ctrl+enter' ){
				_sendMessage();
			}
		});
		
		//发送消息
		function _sendMessage(){
			if(michatData.currChatSid){//确保当前有对话
				if(!$.michat.onSendMessage){
					throw new Error('未发现发送消息事件的监听函数(onSendMessage)!');
				}
				
				
				var chatContent = michatUi.chatIn.val();
				//验证消息内容
				if($.trim(chatContent).length <= 0 && !michatData.upload){//内容不为空
//					setTimeout(function(){michatUi.chatIn.css('background-color','rgba(225,0,0,0.5)')},200);
//					setTimeout(function(){michatUi.chatIn.css('background-color','#ffffff')},600);
//					setTimeout(function(){michatUi.chatIn.css('background-color','rgba(225,0,0,0.5)')},900);
//					setTimeout(function(){michatUi.chatIn.css('background-color','#ffffff')},1300);
//					setTimeout(function(){michatUi.chatIn[0].focus();},1500);
					return ;
				}else if($.trim(chatContent).length >= 500){
					alert('内容超出限制!');
					return;
				}
				michatUi.chatIn.val('');
				michatUi.chatIn.parent()[0].reset();
				
				var eventObj = {
						'sendTo' : michatData.userList[michatData.currChatSid],
						'chat' : {
							'type':0
						}
				};
				
				//处理文件上传时消息内容的追加
				if(michatData.upload){
					if(michatData.upload.uploadType === 'img'){
						eventObj.chat.type = 1;
					}else if(michatData.upload.uploadType === 'file'){
						eventObj.chat.type = 2;
					}
					
					eventObj.tempFilePath = michatData.upload.filePath;
					eventObj.tempFileName = michatData.upload.fileName;
					eventObj.tempFileId = michatData.upload.fileId;
					michatData.upload = null;
				}
				
				
				//发起消息发送事件，并调用该事件的监听器
				(function(){
					var inputChat = michatUi.chatIn.val();
					inputChat = inputChat.replace(/(\r|\n)/ig,'<br>');
					inputChat = inputChat.replace(/\s/ig,'&nbsp;');
					
					var event = eventObj;
					event.chat.content = inputChat + chatContent
					
					event.success = function(data){
						data.currSid = michatData.currUser.sid;
						var chat = _appendChatContent(data);
						
						michatUi.chatTool.find('.tool input[type="file"]').removeAttr('disabled');
						michatUi.chatTool.find('.toolState').hide();
						
						return chat;
					}
					
					event.fail = function(){
						
					}
					
					$.michat.onSendMessage(event);
				})();
				
				//更新联系人
				$.michat.updateLinkMan(michatData.currChatSid);
			}
		}
		//添加对话内容
		function _appendChatContent(data){
			var container = michatUi.chatTabSrcs.find('[sloth-sid="' + data.sid + '"]');
			if(container.length <= 0) throw new Error('未找到对话显示框!');
			
			var chatMessageSign = michatData.userList[data.currSid?data.currSid:data.sid].name+'&nbsp;&nbsp;&nbsp;&nbsp;'+data.chatTime
			
			var chat;
			if(data.chatPanel){
				chat = data.chatPanel;
			}else{
				container.find('ul').append($.michat.Ui.chatLi);
				chat = container.find('ul').children().last();
			}
			chat.find('.chat-time').html(chatMessageSign);
			
			var chatContentEle = chat.find('.chat-content').html(data.chatContent);
			
			if(michatData.userList[data.currSid?data.currSid:data.sid].sid == michatData.currUser.sid){
				chatContentEle.css('background-color','rgba(100,0,0,0.2)');
			}
			
			container.scrollTop(parseInt(container.find('ul').css('height').replace(/px$/,'')));
			
			if($.michat.defaults.localStorage && data.storage){
				delete data.chatPanel;
				var chatHistory = JSON.parse(localStorage.getItem(michatData.currUser.sid+'_chat-history-'+data.sid));
				
				if(!chatHistory || !(chatHistory instanceof Array)){
					chatHistory = new Array();
				}
				
				chatHistory.push(data);
				
				if(chatHistory.length > $.michat.defaults.chatHistoryMax){
					chatHistory.splice(0,chatHistory.length - $.michat.defaults.chatHistoryMax);
				}
				
				localStorage.setItem(michatData.currUser.sid+'_chat-history-'+data.sid,JSON.stringify(chatHistory));
			}
			
			return chat;
		}
		//新消息提醒
		function _hasNewMessage(){
			
			//右侧底部闪烁
			if(michatUi.leftfootPannel.is(':hidden') && michatUi.leftPannel.is(':hidden') 
					&& michatUi.rightPannel.is(':hidden') && michatUi.rightfootPannel.is(':visible')){
				if(!michatData.rightfootInterval){
					var r = michatUi.rightfootPannel.find('.warn');
					r.css('color','red');
					r.text('有新消息!');
					
					michatData.currTitle = window.document.title.toString();
					michatData.rightfootInterval = setInterval(function(){
						
						if(r.is(':visible')){
							window.document.title = '【 有新消息 】';
							r.hide();
						}else{
							window.document.title = '【】';
							r.show();
						}
					},400);
					
					michatUi.rightfootPannel.one('click',function(){
						
						$.michat.afterLoadUser = function(){
							$.michat.afterLoadUser = $.noop;
							
							$.michat.getNewMessage();
						}
						
						if(options.userData){
							$.michat.afterLoadUser();
						}
					})
					
				}
			}else{
				$.michat.getNewMessage();
			}
		}
		//初始化新消息
		function _newMessage(data){
			for(var i = 0 ;i < data.length ; i++){
				if(michatData.newMessages['_' + data[i].sid]){
					michatData.newMessages['_' + data[i].sid].push(data[i]);
				}else{
					michatData.newMessages['_' + data[i].sid] = [data[i]];
				}
			}
			
			_receive();
		}
		
		function _receive(){
			michatUi.leftfootPannel.css('background-color','#dddddd');
			michatUi.rightfootPannel.find('.warn').text('');
			
			clearInterval(michatData.rightfootInterval);
			clearInterval(michatData.leftfootInterval);
			
			michatUi.leftPannel.show();
			michatUi.leftfootPannel.show();
			
			michatData.rightfootInterval = null;
			michatData.leftfootInterval = null;
			
			window.document.title = michatData.currTitle || 'Sloth2.0';
			
			for(var msg in michatData.newMessages){
				var sid = parseInt(msg.substr(1));
				$.michat.fnOpenChat(sid,true);
				
				if(michatData.currChatSid && sid != michatData.currChatSid){
					var tab = michatUi.chatTabs.children('[sloth-sid="' + sid + '"]');
					tab.css('color','red');
					tab.one('click',function(){
						$(this).css('color','#000')
					});
				}
			}
		}

		
		//文件上传
		(function(){
			//验证文件类型
			function _valiFile(target,types,maxSize){
				var result = 'fileTypeError';
				var fileName = $(target).val();
				var fileType = fileName.substr(fileName.lastIndexOf('.'));
				
				for(var i=0;i<types.length;i++){
					if(types[i] == fileType.toLowerCase()){
						result = '';
						break;
					}
				}
				
				if(result == 'fileTypeError'){
					return result;
				}
				
				if(target.files && target.files.length > 0){//考虑低版本浏览器
					var fileSize = parseInt(target.files[0].size / (1024 * 1024));
					if(fileSize > maxSize){
						return 'fileSizeError';
					}
				}
				
				return result;
			}
			//启用文件上传
			function _enabledUpload(){
				michatUi.chatTool.find('.tool input[type="file"]').removeAttr('disabled');
			}
			//禁用文件上传
			function _disabledUpload(){
				michatUi.chatTool.find('.tool input[type="file"]').attr('disabled','disabled');
			}
			//上传成功
			function _uploadSuccess(data){
				michatData.upload = {
					'filePath' : data.filePath,
					'fileName' : data.fileName,
					'uploadType' : data.uploadType,
					'fileId' : data.id
				};
				
				if($.michat.defaults.uploadAfter == 'wait'){
					michatUi.chatTool.find('.left').text('   '+data.fileName);
					michatUi.chatTool.find('.right').html('<a href="#">删除</a>&nbsp;&nbsp; ');
					
					michatUi.chatTool.find('.right').last().click(function(){
						michatData.upload = null;
						michatUi.chatTool.find('.toolState').hide();
						_enabledUpload();
					});
				}else if($.michat.defaults.uploadAfter == 'sendMessage'){
					_sendMessage();
				}
				
				michatUi.chatTool.find('input[type="file"]').unbind('change',_upload);
				michatUi.chatTool.find('input[type="file"]').bind('change',_upload);
			}
			//文件上传
			function _upload(event){
				var type = $(this).attr('sloth-type');
				var types,maxSize,result;
				if(type == 'img'){
					types = $.michat.defaults.imgType;
					maxSize = $.michat.defaults.imgMax;
					result = _valiFile(this,types,maxSize);
				}
//				else if(type == 'file'){
//					types = $.michat.defaults.fileType;
//					maxSize = $.michat.defaults.fileMax;
//				}
				
				if(result == 'fileTypeError'){
					alert('文件类型不被支持!');
					return;
				}else if(result == 'fileSizeError'){
					alert('文件大小超出限制!');
					return;
				}
				
				michatUi.chatTool.find('.toolState').show();
				michatUi.chatTool.find('.left').text(' 文件上传中...');
				michatUi.chatTool.find('.right').html('<a href="#">删除</a>&nbsp;&nbsp; ');
				michatUi.chatTool.find('.right').last().click(function(){
					michatUi.chatTool.find('input[type="file"]').unbind('change',_upload);
					michatUi.chatTool.find('input[type="file"]').bind('change',_upload);
					michatUi.chatTool.find('input[type="file"]').val('');
					michatUi.chatTool.find('.toolState').hide();
					_enabledUpload();
				});
				
				event.success = _uploadSuccess;
				
				event.fail = function(data){
					
				}
				
				event.uploadType = type;
				
				$.michat.onUpload(event);
				_disabledUpload();
			}
			
			michatUi.chatTool.find('input[type="file"]').bind('change',_upload).css({opacity:0});
		})();
		
		//查看历史
		michatUi.chatTool.find('.history').click(function(event){
			if($.michat.onSearchHistory){
				event.data = michatData.userList[michatData.currChatSid];
				$.michat.onSearchHistory(event);
			}else{
				throw new Error('未绑定’查看历史‘记录监听器');
			}
			event.stopPropagation();
		});
		
		//绑定查询框
		michatUi.rightPannel.find('.michat-search-input').bind('keyup',function(event){
			if($.trim($(this).val()) != $(this).attr('oldValue')){
				michatData.searchList.length = 0;
				for(var i in michatData.userList){
					if(michatData.userList[i].name.indexOf($.trim($(this).val())) != -1){
						michatData.searchList.push(michatData.userList[i]);
					}
				}
				$(this).attr('oldValue',$.trim($(this).val()));
				michatUi.rightPannel.find('.michat-search-close').show();
				_showSearch();
			}
			event.stopPropagation();
		});
		//关闭查询
		michatUi.rightPannel.find('.michat-search-close').click(function(event){
			michatUi.rightPannel.find('.michat-search-input').val('');
			michatUi.rightPannel.find('.user-list.list').hide();
			$(this).hide();
			event.stopPropagation();
		});
		//显示查询列表
		function _showSearch(){
			var searchDiv = michatUi.rightPannel.find('.user-list.list').show();
			var searchUl = searchDiv.find('ul');
			searchUl.html('');
			for(var i=0;i<michatData.searchList.length;i++){
				searchUl.append($.michat.Ui.userLi);
				var li = searchUl.children().last();
				var headSrc = '';
				
				if(michatData.searchList[i].head){
					headSrc = michatData.searchList[i].head;
				}
				
				li.find('.head img').attr('src',headSrc);
				li.data('sloth-data',michatData.searchList[i]);
				li.attr('sloth-sid',michatData.searchList[i].sid);
				li.find('.name').text(michatData.searchList[i].name).attr('title',michatData.searchList[i].name);
				
				if(michatData.searchList[i].sid != michatData.currUser.sid){
					li.click(function(event){
						var data = $(this).data('sloth-data');
						$.michat.fnOpenChat(data);
						event.stopPropagation();
					});
				}
			}
			if(michatData.searchList.length <= 0 ){
				searchUl.html('<div style=\'text-align:center;margin-top:10px;\'>没有找到对应的用户</div>');
			}
		}
		//更新联系人数据
		function _updateLinkMan(sid){
			if(michatData.nlmData){
				if(michatData.nlmData.length > 0 && michatData.nlmData[0] == sid){
					//不做任何操作
				}else{
					for(var i=0;i<michatData.nlmData.length;i++){
						if(michatData.nlmData[i] == sid){
							michatData.nlmData = michatData.nlmData.slice(0,i).concat(michatData.nlmData.slice(i+1,michatData.nlmData.length));
						}
					}
					
					michatData.nlmData.unshift(sid);
					if(michatData.nlmData.length > $.michat.defaults.nlmMax){
						michatData.nlmData.length = $.michat.defaults.nlmMax;
					}
					
					if($.michat.defaults.localStorage){
						localStorage.setItem(michatData.currUser.sid+'_michat_nlm',JSON.stringify(michatData.nlmData));
					}else{
						if($.michat.onNLMUpdate){
							var event = {'user':michatData.userList[sid]};
							$.michat.onNLMUpdate(event);
						}
					}
					
					_refreshLinkMan();
				}
				
			}
		}
		//显示联系人列表
		function _refreshLinkMan(){
			michatUi.nlmContainer.find('ul').html('');
			for(var i in michatData.nlmData){
				var sid = michatData.nlmData[i];
				
				michatUi.nlmContainer.find('ul').append($.michat.Ui.userLi);
				var userLi = michatUi.nlmContainer.find('ul').children().last();
				var headSrc = michatData.userList[sid].head;
				
				userLi.find('.head img').attr('src',headSrc);
				userLi.data('sloth-data',michatData.userList[sid]);
				userLi.attr('sloth-sid',sid);
				userLi.find('.name').text(michatData.userList[sid].name).attr('title',michatData.userList[sid].name);
				
				userLi.click(function(event){
					var data = $(this).data('sloth-data');
					$.michat.fnOpenChat(data);
					event.stopPropagation();
				});
				
			}
			
		}
		$.michat.updateLinkMan = _updateLinkMan;//更新联系人数据
		$.michat.refreshLinkMan = _refreshLinkMan;//显示联系人列表
		//追加聊天内容
		$.michat.fnAppendChatContent = _appendChatContent;
		//新消息
		$.michat.fnNewMessage = _newMessage;
		//新消息提醒
		$.michat.hasNewMessage = _hasNewMessage;
	}
	
	//默认参数
	$.michat.defaults = {
		uploadAfter : 'sendMessage',//sendMessage,wait
		imgType : ['.jpg','.png','.gif','.bmp','.jpeg'],
		fileType : ['.doc','.txt','.xls','.zip','.rar','.7z','.mp3','.mov','.mp4','.caf','.docx','.xlsx','.pdf','.ppt','.pptx','.flv'],
		userListExpansion : false,
		warnType : 'opentab',//highlight,opentab
		sendKey:'ctrl+enter',//enter,ctrl+enter
		warnHighlightColor:{'userFont':'red','userBackground':'','chatFont':'red','chatBackground':'','groupFont':'red','groupBackground':''},
		localStorage:true,
		nlmMax:10,//最近联系人面板最大显示数
		chatHistoryMax:100,
		imgMax:2,
		fileMax:10,
		readAddLinkMan:true//当读新消息时是否更新联系人
	};
	//加载用户列表的回调函数
	$.michat.loadUser = $.noop;
	//用户列表加载完成或的回调函数
	$.michat.afterLoadUser = $.noop;
	//点击群组获取群内的成员在线情况
	$.michat.onlineOfTeam = $.noop;
	//获取新消息
	$.michat.getNewMessage = $.noop;
	
	$.michat.Ui = {};
	//左侧聊天标签
	$.michat.Ui.chatTab = '<li class="group">'
		+ '<div class="head"><img></div>'
		+ '<div class="name"></div>'
		+ '<div class="close"></div>'
		+ '</li>';
	//聊天内容展示框
	$.michat.Ui.chatTabSrc = '<div class="michat-chat-pannel"><ul class="group"></ul></div>';
	//单条聊天记录
	$.michat.Ui.chatLi = '<li><div class="chat-time"></div><div class="chat-content"></div></li>';
	//右侧用户下拉菜单
	$.michat.Ui.userGroup = '<div class="cascade" >'
		+ '<div class="groupName cascadeTitle"></div>'
		+ '<ul class="group"></ul>'
		+ '</div>';
	//右侧单个用户
	$.michat.Ui.userLi	= '<li class="group">'
		+'<div class="head"><img ></div>'
		+'<div class="name"></div>'
		+'</li>';
	
})(jQuery);
