angular.module('vsController')
	.controller('pubMessageController',
		['$scope', '$location', 'userRESTFactory', 'messageRESTFactory', 'alertBoxFactory', '$cookies','$filter','questionRESTFactory','blogRESTFactory','confirmBoxFactory',
			function ($scope, $location, userRESTFactory, messageRESTFactory, alertBoxFactory, $cookies,$filter,questionRESTFactory,blogRESTFactory,confirmBoxFactory) {
				var voteUploadConfig = {
					swf: 'image/uploadify.swf',
					fileObjName: 'fileUpload',
					uploader: '../upload/stream;jsessionid=' + $cookies.sid,
					multi: false,
					fileTypeDesc : '请选择图片文件',
					fileTypeExts : '*.jpg;*.png;*.jpeg;*.bmp;*.gif;',
					fileSizeLimit : '5MB',
					buttonClass: 'btn btn-default',
					width: 80,
					height: 34,
					buttonText: '附加图片',
					onUploadSuccess: function (file, data, response,attr) {
						data = JSON.parse(data);
						var voteOptionIndex = attr.id.replace('voteUpload-','');
						$scope.vote.voteOptionList[voteOptionIndex].imageUrl = data.filePath.replace(/^\/[^\/]+/,'');
						$scope.vote.voteOptionList[voteOptionIndex].imageUri = $scope.sysPath + data.filePath;
						$scope.$digest();
					}
				}

				var lotteryUploadConfig = {
					swf: 'image/uploadify.swf',
					fileObjName: 'fileUpload',
					uploader: '../upload/stream;jsessionid=' + $cookies.sid,
					multi: false,
					fileTypeDesc : '请选择图片文件',
					fileTypeExts : '*.jpg;*.png;*.jpeg;*.bmp;*.gif;',
					fileSizeLimit : '5MB',
					buttonClass: 'btn btn-default',
					width: 80,
					height: 34,
					buttonText: '附加图片',
					onUploadSuccess: function (file, data, response,attr) {
						data = JSON.parse(data);
						var lotteryOptionIndex = attr.id.replace('lotteryUpload-','');
						$scope.lottery.lotteryOptionList[lotteryOptionIndex].imageUrl = data.filePath.replace(/^\/[^\/]+/,'');
						$scope.lottery.lotteryOptionList[lotteryOptionIndex].imageUri = $scope.sysPath + data.filePath;
						$scope.$digest();
					}
				}

				$scope.sendEmail = $scope.editMessage = $scope.isSubmit = $scope.sendSubmit = $scope.draftSubmit = false;

				$scope.vote = {
					voteType : 1,
					voteOptionList : []
				};
				$scope.addVoteOption = addVoteOption;
				addVoteOption();
				addVoteOption();

				$scope.schedule = {date : new Date(),time : new Date()};

				$scope.lottery = {
					ed : new Date(),
					lotteryOptionList : []
				}
				$scope.addLotteryOption = addLotteryOption;
				addLotteryOption();
				addLotteryOption();

				$scope.annexation = '';

				$scope.$$postDigestQueue.push(function(){
					setTimeout(function(){
						$scope.$apply(function(){
							$scope.newMessage.isHidden  = true;
						});
					},0);
				});

				//如果是传递id则认为是草稿或消息的编辑操作，然后根据id加载信息并在页面上显示这些信息
				var loadId = null,message_title_id = null,sendAllPeople = false;
				var message_id = $location.search().id;
				var message_pid = $location.search().pid;
				var message_rid = $location.search().rid;
				if(message_id && message_id !== true){
					loadId = message_id;
				}else if(message_pid && message_pid !== true){
					loadId = message_pid;
				}else if(message_rid && message_rid !== true){
					loadId = message_rid;
				}

				$scope.titleName = '发消息';
				if (loadId) {
					messageRESTFactory.get({id: loadId}, function (data) {
						if (data.code && data.code != 10000) {
							alertBoxFactory('加载信息失败!', {width: 240, textAlign: 'center'});
						} else {
							if (message_id && message_id !== true) {
								$scope.annexationDisabled = true;
								if (data.streamType == 'M') {
//									initMessage(data);
									alertBoxFactory('该消息已发布不能修改!', {width: 300, textAlign: 'center'});
									return;
								} else if (data.streamType == 'D') {
									initDraft(data);
								}
							} else if (message_rid && message_rid !== true) {
								initReply(data);
							} else if (message_pid && message_pid !== true) {
								initForward(data);
							}
						}
					}, function () {
						alertBoxFactory('网络异常!', {width: 240, textAlign: 'center'});
					});
				} else if($location.search().qid !== true && $location.search().qid){
					questionRESTFactory.get({id : $location.search().qid},function(data){
						if (data.code && data.code != 10000) {
							alertBoxFactory('加载信息失败!', {width: 240, textAlign: 'center'});
						} else {
							$scope.content = '^' + data.questionContent;
						}
					},function(){
						alertBoxFactory('网络异常!', {width: 240, textAlign: 'center'});
					});
				} else if($location.search().bid !== true && $location.search().bid) {
					blogRESTFactory.get({blogId : $location.search().bid},function(data){
						if (data.code && data.code != 10000) {
							alertBoxFactory('加载信息失败!', {width: 240, textAlign: 'center'});
						} else {
							$scope.content = '^' + data.streamContent;
						}
					},function(){
						alertBoxFactory('网络异常!', {width: 240, textAlign: 'center'});
					});
				} else if($location.search().touid !== true && $location.search().touid){
					var uid = $location.search().touid;
					var uname = $location.search().touname;
					var uemail = $location.search().touemail;

					$scope.p_toReceivers = [{
						id : 0,
						receiverId : uid,
						receiverName : uname,
						receiverType : 'U',
						ccType : 'T',
//						name : uname + (uemail ? '<' + uemail + '>' : ''),
						name : uname,
						email : uemail,
						selected : true
					}];
					$scope.content = '^';
				}else if($location.search().totid !== true && $location.search().totid){
					var tid = $location.search().totid;
					var tname = $location.search().totname;
					var temail = $location.search().totemail;

					$scope.p_toReceivers = [{
						id : 0,
						receiverId : tid,
						receiverName : tname,
						receiverType : 'S',
						ccType : 'T',
//						name : tname + (temail ? '<' + temail + '>' : ''),
						name : tname,
						email : temail,
						selected : true
					}];
					$scope.content = '^';
				}else if($location.search().photo !== true && $location.search().photo){
					var photoid = $location.search().photoid;
					var photo = $location.search().photo;
					var imgHtml = '<img src="'+ photo +'" style="max-width:100%;" data-img-id="'+ photoid +'">';
					$scope.content = '^' + imgHtml;
					$scope.imgList = $scope.imgList || [];
					$scope.imgList.push({id : photoid,name : 'photo',maxUrl : photo});
				}else if($location.search().type && $location.search().type !== true){
					var typeObj = {voting : '发投票',agenda : '发邀请',lottery: '发奖品'};
					var type = $location.search().type;

					$scope.titleName = typeObj[type];
					$scope.hideAnnexationSwitchBtn = true;
					$scope.annexation = type;
					$scope.content = '^';
				}else{
					$scope.hideAnnexationPanel = true;
					$scope.content = '^';
				}
				//根据关键字查询系统中存在的用户或群组信息
				var searchTimeout;
				$scope.searchReceiver = function (key, mark) {
					if(searchTimeout){
						clearTimeout(searchTimeout);
					}

					searchTimeout = setTimeout(searchReceiverFn(key,mark),500);
				}

				$scope.subForm = function (type) {
					var subFormObj = initSubFormObj();
					subFormObj.streamType = type == 'message' ? 'M' : 'D';

					if(!formValid(subFormObj,type)) return;

					$scope.isSubmit = true;
					$scope.sendSubmit = type == 'message';
					$scope.draftSubmit = type != 'message';
					messageRESTFactory.publish(subFormObj, function (data) {
						$scope.isSubmit = $scope.sendSubmit = $scope.draftSubmit = false;
						if (data && data.code && data.code != 10000) {
							alertBoxFactory(data.msg, {width: 300, textAlign: 'center'});
						} else {
							var successWord = type == 'message' ? '发送成功!' : '暂存成功!';
							alertBoxFactory(successWord, {type: 'success', textAlign: 'center', waitTime: 2, width: 200});
							setTimeout(function () {
								$scope.$apply(function () {
									$location.search({});
									$location.path('/messages');
								});
							}, 2000);
						}
					}, function () {
						$scope.isSubmit = $scope.sendSubmit = $scope.draftSubmit = false;
						alertBoxFactory('网络异常!', {width: 200, textAlign: 'center'});
					});
				}

				$scope.$watch('sendEmail', function (newVal, oldVal) {
					if (oldVal === true && newVal === false) {
						removeCustomReceiverInput($scope.p_toReceivers);
						removeCustomReceiverInput($scope.p_ccReceivers);
						removeCustomReceiverInput($scope.p_bcReceivers);
					}
				});

				function addVoteOption() {
					$scope.vote.voteOptionList.push({
						content : '',
						uploadConfig : _.clone(voteUploadConfig)
					});
				}

				function addLotteryOption() {
					$scope.lottery.lotteryOptionList.push({
						content : '',
						numberPeople : 1,
						uploadConfig : _.clone(lotteryUploadConfig)
					});
				}

				function searchReceiverFn(key, mark){
					return function(){
						userRESTFactory.findUserOrTeamByNameAndEmail({condition : key}, function (data) {
							var selectedList = fetchReceiverForSelect($scope[mark + 'Receivers']);
							for (var i = 0; i < data.length; i++) {
								if (data[i].id == $cookies.userId) {
									continue;
								}

								if(data[i].userType == 'U'){
									data[i].style = 'background-image:none;background-color:lightgoldenrodyellow';
								}else if(data[i].userType == 'S'){
									data[i].style = 'background-image:none;background-color:lightblue';
								}

//							data[i].name = data[i].email ? data[i].userName + '<' + data[i].email + '>' : data[i].userName;
								data[i].name = data[i].userName;
								selectedList.push(data[i]);
							}
							$scope[mark + 'Receivers'] = selectedList;
						});
					}
				}

				function formValid(subFormObj,type){
					var receiverCount = 0;
					receiverCount += fetchReceiver($scope.p_toReceivers, subFormObj.streamReadShipList, 'T', subFormObj);
					receiverCount += fetchReceiver($scope.p_ccReceivers, subFormObj.streamReadShipList, 'C', subFormObj);
					receiverCount += fetchReceiver($scope.p_bcReceivers, subFormObj.streamReadShipList, 'B', subFormObj);

					if($scope.newMessageForm.subject.$error.maxlength){
						alertBoxFactory('标题长度不能超过100个字符!', {width: 350, textAlign: 'center'});
						return false;
					}
					if (!$scope.subject || $scope.subject.length <= 0) {
						alertBoxFactory('标题不能为空!', {width: 240, textAlign: 'center'});
						return false;
					}
					if (!$scope.content || $scope.content.length <= 0) {
						alertBoxFactory('内容不能为空!', {width: 240, textAlign: 'center'});
						return false;
					}

					if($scope.annexation == 'voting'){
						for(var i = 0;i < $scope.vote.voteOptionList.length;i++){
						 	var voteOption = $scope.vote.voteOptionList[i];
							if(voteOption.content.length <= 0 && !voteOption.imageUrl){
								alertBoxFactory('投票项内容和图片不能同时为空!', {width: 400, textAlign: 'center'});
								return false;
							}
							delete voteOption.selected;
							delete voteOption.downloadImageUri;
							delete voteOption.uploadConfig;
							delete voteOption.imageUri;
						}
						subFormObj.vote = $scope.vote;
					}else if($scope.annexation == 'agenda'){
						subFormObj.schedule = {
							place : $scope.schedule.place
						};
						subFormObj.schedule.startTimeFmt = $filter('date')($scope.schedule.date,'yyyy-MM-dd')
							+ ' ' + $filter('date')($scope.schedule.time,'HH:mm:ss');
					}else if($scope.annexation == 'lottery'){
						$scope.lottery.endDate = $filter('date')($scope.lottery.ed,'yyyy-MM-dd');
						for(var i = 0;i < $scope.lottery.lotteryOptionList.length;i++){
							var lotteryOption = $scope.lottery.lotteryOptionList[i];
							if(lotteryOption.content.length <= 0){
								alertBoxFactory('奖项名称不能为空!', {width: 300, textAlign: 'center'});
								return false;
							}
							if(!lotteryOption.numberPeople){
								alertBoxFactory('请正确填写获奖名额!', {width: 300, textAlign: 'center'});
								return false;
							}
							delete lotteryOption.uploadConfig;
							delete lotteryOption.imageUri;
						}
						subFormObj.lottery = _.clone($scope.lottery);
						delete subFormObj.lottery.ed;
					}

					//非编辑操作需要收件人，标题，内容
					if (type == 'message') {
						if (receiverCount <= 0 && !sendAllPeople) {
//							alertBoxFactory('收件人不能为空!', {width: 240, textAlign: 'center'});
							confirmBoxFactory('如果收件人为空，则默认发送给所有人，您确定要这样做吗?',{
								width : 390,
								okFn : function(){
									sendAllPeople = true;
									$scope.subForm(type);
								}
							});
							return;
						}
					}

					return true;
				}

				function initSubFormObj(){
					var obj = {
						titleName: $scope.subject,
						streamContent: $scope.content,
						streamComefrom: 0,
						allReceiverMails: '',
						allCcReceiverMails: '',
						allBccReceiverMails: '',
						attaList: $scope.fileList,
						imgList: $scope.imgList,
						streamReadShipList: [],
						sendAllPeople : sendAllPeople ? 1 : 0
					};

					if(message_id && message_id !== true){
						obj.id = message_id;
					}else if(message_pid && message_pid !== true){
						obj.parentId = message_pid;
					}else if(message_rid && message_rid !== true){
						obj.returnId = message_rid;
						obj.titleId = message_title_id;
					}

					return obj;
				}

				function removeCustomReceiverInput(receivers) {
					for (var i = 0; i < receivers.length; i++) {
						if (!receivers[i].id) {
							receivers.splice(i, 1);
							i--;
						}
					}
				}

				function fetchReceiver(receivers, container, type, subFormObj) {
					var count = 0;
					for (var i = 0; i < receivers.length; i++) {
						var receiver = receivers[i];
						if (receiver.selected) {
							count++;
							var isSysUser = angular.isNumber(receiver.id);

							if (isSysUser) {
								var r = {
									receiverId: receiver.receiverId ? receiver.receiverId : receiver.id,
									receiverName: receiver.receiverName ? receiver.receiverName : receiver.userName,
									receiverType: receiver.receiverType ? receiver.receiverType : receiver.userType,
									ccType: receiver.ccType ? receiver.ccType : type
								};
								container.push(r);
							}

							if ($scope.sendEmail) {
								if(isSysUser && !receiver.email) continue;

								if (type == 'T') {
									subFormObj.allReceiverMails += (isSysUser ? (receiver.email ? receiver.email : '') : receiver.name) + ';';
								} else if (type == 'C') {
									subFormObj.allCcReceiverMails += (isSysUser ? (receiver.email ? receiver.email : '') : receiver.name) + ';';
								} else if (type == 'B') {
									subFormObj.allBccReceiverMails += (isSysUser ? (receiver.email ? receiver.email : '') : receiver.name) + ';';
								}
							}
						}
					}
					return count;
				}

				function initMessage(msg) {
					initReceiver(msg);
					initFile(msg);
					$scope.editMessage = true;
					$scope.receiverRead = true;
					$scope.subject = msg.titleName;
					$scope.content = '^' + msg.streamContent;
				}

				function initDraft(msg) {
					initReceiver(msg);
					initFile(msg);
					$scope.subject = msg.titleName;
					$scope.content = '^' + msg.streamContent;
					initVote(msg);
					initSchedule(msg);
				}

				function initVote(msg){
					if(msg && msg.vote){
						$scope.vote = msg.vote;
						var voteOptionList = msg.vote.voteOptionList;
						for(var i = 0;i < voteOptionList.length;i++){
							voteOptionList[i].uploadConfig = _.clone(voteUploadConfig);
						}
						$scope.annexation = 'voting';
					}
				}

				function initSchedule(msg){
					if(msg && msg.schedule){
						$scope.schedule = {
							id : msg.schedule.id,
							place : msg.schedule.place,
							date : new Date(msg.schedule.startTimestamp),
							time : new Date(msg.schedule.startTimestamp)
						}
						$scope.annexation = 'agenda';
					}
				}

				function initReply(msg) {
					message_title_id = msg.titleId;
					initReceiver(msg);
					$scope.p_bcReceivers.length = 0;
					if ($location.search().allReply != 'true') {
						$scope.p_ccReceivers.length = 0;
						$scope.p_toReceivers.length = 0;
					}
					$scope.p_toReceivers.push({
						id : 0,
						ccType: 'T',
//						name: msg.userNickname + (msg.createByEmail ? '<' + msg.createByEmail + '>' : ''),
						name : msg.userNickname,
						receiverName: msg.userNickname,
						receiverEmail: msg.createByEmail,
						receiverId: msg.createBy,
						receiverType: 'U',
						selected: true
					});
					$scope.subject = 'Re:' + msg.titleName;
					$scope.content = '^^<br><br><br><hr>' + initOriginalStreamContent(msg);
					if(msg.annexation && msg.annexation.indexOf('C') != -1){
						initContentForVote(msg);
					}else if(msg.annexation && msg.annexation.indexOf('B') != -1){
						initContentForSchedule(msg);
					}
				}

				function initForward(msg) {
					initFile(msg);
					$scope.subject = 'Fw:' + msg.titleName;
					$scope.content = '^^<br><br><br><hr>' + initOriginalStreamContent(msg);
					if(msg.annexation && msg.annexation.indexOf('C') != -1){
						initContentForVote(msg);
					}else if(msg.annexation && msg.annexation.indexOf('B') != -1){
						initContentForSchedule(msg);
					}
				}

                function initOriginalStreamContent(msg){
                    var header = '';
                    header += '<br>发件人:' + msg.createByName;
                    header += '<br>收件人:';

                    for(var i = 0;i < msg.streamReadShipList.length;i++){
                        var readShip = msg.streamReadShipList[i];
                        if(readShip.ccType == 'T'){
                            header += readShip.receiverName + (readShip.receiverType == 'S' ? '-群组' : '') + (readShip.receiverEmail ? '<' + readShip.receiverEmail + '>' : '') + '&nbsp;&nbsp;';
                        }
                    }

                    header += '<br>抄送:';

                    for(var i = 0;i < msg.streamReadShipList.length;i++){
                        var readShip = msg.streamReadShipList[i];
                        if(readShip.ccType == 'C'){
                            header += readShip.receiverName + (readShip.receiverType == 'S' ? '-群组' : '') + (readShip.receiverEmail ? '<' + readShip.receiverEmail + '>' : '') + '&nbsp;&nbsp;';
                        }
                    }

                    header += '<br>发送日期:' + msg.createDate;

                    header += '<br>标题:' + msg.titleName;

                    return header + '<br><br>' + msg.streamContent;
                }

				function initContentForVote(msg){
					var voteTotal = msg.vote.voteTotal;
					var voteContent = '<br><br><span style="font-size:16px;font-weight: bold;">投票信息:</span>';

					var voteOptionList = msg.vote.voteOptionList;
					var appLocation = $location.absUrl().substring(0,$location.absUrl().indexOf('public'));
					for(var i = 0;i < voteOptionList.length;i++){
						var voteOption = voteOptionList[i];
						var votePercent = parseInt((voteOption.count / voteTotal) * 1000) / 10;
						voteContent += '<br>&nbsp;'+ (i + 1) + '.&nbsp;' + voteOption.content;
						if(voteOption.downloadImageUri){
							voteContent += '<br><img src="'+ appLocation + voteOption.downloadImageUri +'" style="height:120px">';
						}
						voteContent += '<br>投票详情:' + ((voteOption.voter && voteOption.voter.length > 0) ? voteOption.voter : '') +
							'&nbsp;&nbsp;('+ (voteOption.count > 0 ? voteOption : 0) + '&nbsp;票&nbsp;/&nbsp;' +
							 + (votePercent > 0 ? votePercent : 0) + '%)';
					}

					voteContent += '<br>总投票数:&nbsp;' + (voteTotal > 0 ? voteTotal : 0);

					$scope.content += voteContent;
				}

				function initContentForSchedule(msg){
					var schedule = msg.schedule;
					var scheduleUserList = schedule.scheduleUserList ? schedule.scheduleUserList : [];
					var scheduleContent = '<br><br><span style="font-size:16px;font-weight: bold;">邀请信息:</span>';

					scheduleContent += '<br>开始时间:&nbsp;' + schedule.startTime ;
					scheduleContent += '<br>地点:&nbsp;' + (schedule.place ? schedule.place : '未知');

					var maybeList = [],attendList = [],absentList = [];
					for(var i = 0;i < scheduleUserList.length;i++){
						var user = scheduleUserList[i];
						if(user.reply == 1){
							attendList.push(user);
						}else if(user.reply == 2){
							absentList.push(user);
						}else if(user.reply == 3){
							maybeList.push(user);
						}
					}

					scheduleContent += '<br>确认参加:&nbsp;&nbsp;';
					for(var i = 0;i < attendList.length;i++){
						scheduleContent += attendList[i].userName + ' ';
					}

					scheduleContent += '<br>不能参加:&nbsp;&nbsp;';
					for(var i = 0;i < absentList.length;i++){
						scheduleContent += absentList[i].userName + ' ';
					}

					scheduleContent += '<br>暂时待定:&nbsp;&nbsp;';
					for(var i = 0;i < maybeList.length;i++){
						scheduleContent += maybeList[i].userName + ' ';
					}

					$scope.content += scheduleContent;
				}

				function initFile(msg) {
					$scope.fileList = [];
					if (angular.isArray(msg.attaList)) {
						for (var i = 0; i < msg.attaList.length; i++) {
							$scope.fileList.push({
								id: msg.attaList[i].id,
								resourceName: msg.attaList[i].resourceName
							});
						}
					}
					$scope.imgList = [];
					if (angular.isArray(msg.imgList)) {
						for (var i = 0; i < msg.imgList.length; i++) {
							$scope.imgList.push[{
								id: msg.imgList[i].id
							}];
						}
					}
				}

				function initReceiver(msg) {
					var p_toReceivers = [];
					var p_bcReceivers = [];
					var p_ccReceivers = [];

					if (msg.streamReadShipList && angular.isArray(msg.streamReadShipList)) {
						for (var i = 0; i < msg.streamReadShipList.length; i++) {
							var receiver = msg.streamReadShipList[i];
							if (receiver.receiverId == $cookies.userId) {
								continue;
							}
							receiver.selected = true;
//							receiver.name = receiver.receiverName + (receiver.receiverEmail ? '<' + receiver.receiverEmail + '>' : '');
							receiver.name = receiver.receiverName;
							if (receiver.ccType.toUpperCase() == 'T') {
								p_toReceivers.push(receiver);
							} else if (receiver.ccType.toUpperCase() == 'B') {
								p_bcReceivers.push(receiver);
							} else if (receiver.ccType.toUpperCase() == 'C') {
								p_ccReceivers.push(receiver);
							}
						}
					}

					fetchCustomReceiver(msg.allReceiverMails, p_toReceivers);
					fetchCustomReceiver(msg.allCcReceiverMails, p_ccReceivers);
					fetchCustomReceiver(msg.allBccReceiverMails, p_bcReceivers);

					$scope.p_toReceivers = p_toReceivers;
					$scope.p_bcReceivers = p_bcReceivers;
					$scope.p_ccReceivers = p_ccReceivers;
				}

				function fetchCustomReceiver(emailStr, receivers) {
					if(!angular.isString(emailStr) || emailStr.length <= 0){
						return;
					}

					var emailStrArr = emailStr.split(';');
					for (var i = 0; i < emailStrArr.length; i++) {
						if (emailStrArr[i].length <= 0) {
							return;
						}

						var isExists = false;

						for(var i = 0;i < receivers.length;i++){
							var receiver = receivers[i];
							if(angular.isNumber(receiver.id) && receiver.email == emailStrArr[i]){
								isExists = true;
								break;
							}
						}

						if(!isExists){
							receivers.push({
								selected: true,
								name: emailStrArr[i]
							});
						}
					}

				}

				function fetchReceiverForSelect(list) {
					var result = [];
					if (list && list.length) {
						for (var i = 0; i < list.length; i++) {
							if (list[i].selected) {
								result.push(list[i]);
							}
						}
					}
					return result;
				}

			}]);
