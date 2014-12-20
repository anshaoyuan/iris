angular.module('vsController')
    .controller('messageDetailController',
        ['$scope', 'messageRESTFactory', 'alertBoxFactory', '$sce', '$cookies','$rootScope','tagRESTFactory','scheduleRESTFactory','voteRESTFactory','$stateParams','$state','dynamicImgSrcFactory','lotteryRESTFactory','$timeout',
            function ($scope, messageRESTFactory, alertBoxFactory, $sce, $cookies,$rootScope,tagRESTFactory,scheduleRESTFactory,voteRESTFactory,$stateParams,$state,dynamicImgSrcFactory,lotteryRESTFactory,$timeout) {
	            var prevMoreMsgList = [],nextMoreMsgList = [];
	            $scope.loadOver = false;
	            $scope.showEditBtn = false;
	            $scope.showNotice = false;
	            $scope.loading = false;
	            $scope.msgList = [];

	            loadDetail($stateParams.titleId,$stateParams.id);

	            $scope.delMessageConfig = {
		            title : '确定删除该消息吗？',
		            okFn : function(data){
			            var id = data.attr.messageId;
			            messageRESTFactory.del({id : id},function(data){
				            if(data && data.code != 10000){
					            alertBoxFactory('删除失败!',{width : 220,textAlign: 'center'});
				            }else{
					            alertBoxFactory('删除成功!',{width : 220,type : 'success',textAlign: 'center'});
					            for(var i = 0;i < $scope.msgList.length;i++){
						            if($scope.msgList[i].id == id){
							            $scope.msgList.splice(i,1);
						            }
					            }

                                if($scope.msgList.length == 0){
					                $scope.loadOver = false;
                                }
					            $rootScope.$broadcast('message.del',id);
				            }
			            },function(){
				            alertBoxFactory('网络异常!',{width : 220,textAlign: 'center'});
			            });
		            }
	            }

	            $scope.switchStar = function(message){
		        	var action = !!message.starTag ? 'removeForMessage' : 'addForMessage';
		            tagRESTFactory[action]({
			            messageId : message.id,
			            tagId : 1
		            },function(data){
			            if(data && data.code != 10000){
				            alertBoxFactory('操作失败!',{width : 200,textAlign : 'center'});
			            }else{
				            var alertInfo = !!message.starTag ? '成功取消星标!' : '成功添加星标!'
				            alertBoxFactory(alertInfo,{width : 300,textAlign : 'center',type : 'success'});
				            message.starTag = !message.starTag;
			            }
		            },function(){
			            alertBoxFactory('网络异常!',{width : 200,textAlign : 'center'});
		            });
	            }

	            $scope.msgExtend = function(message,$event){
		            if($event && $event.target && $event.target){
			            var target = angular.element($event.target);
			            if(target.attr('href')  || target.attr('only-click-self')){
				            return;
			            }
		            }

		            if(message.p_extend){
				            message.msgClass = 'item card';
			            }else{
				            message.msgClass = 'item';
			            }

			            message.p_extend = !message.p_extend;
	            }

	            $scope.msgExtendMore = function(type){
		            var spliceIndex,iterator;
		            if(type == 'next'){
			            iterator = nextMoreMsgList;
			            spliceIndex = $scope.msgList.length - 2;
		            }else if(type == 'prev'){
			            iterator = prevMoreMsgList;
			            spliceIndex = 1;
		            }
		            $scope.msgList.splice(spliceIndex,1);
		            for(var i = iterator.length - 1;i >= 0;i--){
			            $scope.msgList.splice(spliceIndex,0,iterator[i]);
		            }
	            }

	            function loadDetail(titleId,id){
		            var action,paramData;
		            if(angular.isDefined(titleId)){
			            action = 'session';
			            paramData = {titleId : titleId,id :id};
		            }else{
			            action = 'get';
			            paramData = {id :id};
		            }

		            $scope.loadOver = false;
		            $scope.loading = true;

		            messageRESTFactory[action](paramData, function (data) {
			            if(data.code && data.code != 10000){
				            alertBoxFactory(data.msg,{width : 240,textAlign: 'center'});
				            $scope.loadOver = true;
				            $scope.loading = false;
				            return;
			            }

			            initMsgList(data,id);

			            $scope.loadOver = true;
			            $scope.loading = false;
		            }, function (data) {
			            alertBoxFactory('网络异常!',{width : 240,textAlign: 'center'});
			            $scope.loadOver = true;
			            $scope.loading = false;
		            });
	            }

                function fetchReceiver(msg, currUserId) {
                    var toReceiver = [], ccReceiver = [], bcReceiver = [], isReceiver = false;

	                if(msg.sendAllPeople == 1){
		                msg.p_toReceiver = [];
		                msg.p_ccReceiver = [];
		                msg.p_bcReceiver = [];
		                msg.p_toReceiver.push({
			                receiverName : '所有人'
		                });
		                return;
	                }

                    for (var i = 0; i < msg.streamReadShipList.length; i++) {
                        var receiver = msg.streamReadShipList[i];

                        if (receiver.ccType.toLowerCase() == 't') {
                            toReceiver.push(receiver);
                        } else if (receiver.ccType.toLowerCase() == 'c') {
                            ccReceiver.push(receiver);
                        } else if (receiver.ccType.toLowerCase() == 'b') {
                            bcReceiver.push(receiver);
                        }
                    }

	                fetchCustomReceiver(msg.allReceiverMails,toReceiver);
	                fetchCustomReceiver(msg.allCcReceiverMails,ccReceiver);
	                fetchCustomReceiver(msg.allBccReceiverMails,bcReceiver);

                    msg.p_toReceiver = toReceiver;
                    msg.p_ccReceiver = ccReceiver;

                    if (msg.createBy == currUserId) {
                        msg.p_bcReceiver = bcReceiver;
                    }

                }

	            function fetchCustomReceiver(emailStr,receivers){
		            if(!angular.isString(emailStr) || emailStr.length <= 0){
			            return;
		            }
		            var emailStrArr = emailStr.split(';');

		            for(var i = 0;i < emailStrArr.length;i++){
			            if (emailStrArr[i].length <= 0) {
				            return;
			            }

			            var isExists = false;

			            for(var j = 0;j < receivers.length;j++){
				            var receiver = receivers[j];
				            if(angular.isNumber(receiver.id) && receiver.receiverEmail == emailStrArr[i]){
					            isExists = true;
					            break;
				            }
			            }

			            if(!isExists){
				            receivers.push({
					            receiverEmail : emailStrArr[i],
					            receiverName : emailStrArr[i]
				            });
			            }

		            }
	            }

	            function initScheduleInfo(msg){
		            var schedule = msg.schedule;
		            schedule.showUserStats = false;
		            schedule.disabledScheduleBtn = $cookies.userId == msg.createBy;
		            var scheduleUserList = schedule.scheduleUserList ? schedule.scheduleUserList : [];

		            var maybeList = [],attendList = [],absentList = [];
		            for(var i = 0;i < scheduleUserList.length;i++){
			            var user = scheduleUserList[i];
			            if(user.reply == 1){
				            if(user.userId == $cookies.userId) schedule.reply = 1;
				            attendList.push(user);
			            }else if(user.reply == 2){
				            if(user.userId == $cookies.userId) schedule.reply = 2;
				            absentList.push(user);
			            }else if(user.reply == 3){
				            if(user.userId == $cookies.userId) schedule.reply = 3;
				            maybeList.push(user);
			            }
		            }

		            schedule.attendList = attendList;
		            schedule.absentList = absentList;
		            schedule.maybeList = maybeList;

		            schedule.changeStats = function(reply){
			            var oldReply = schedule.reply;
			            schedule.disabledScheduleBtn = true;
			            schedule.replyLoading = reply;

			            scheduleRESTFactory.reply({
				            id : msg.schedule.id,
				            reply : reply
			            },function(data){
					        schedule.disabledScheduleBtn = false;
				            schedule.replyLoading = 0;

				            if(data && data.code != 10000){
					            alertBoxFactory(data.msg,{width : 400,textAlign: 'center'});
				            }else{
					            schedule.reply = reply;
					            scheduleUserStatsChange(reply,oldReply);
				            }
			            },function(){
				            alertBoxFactory('网络异常!',{width : 220,textAlign: 'center'});
				            schedule.disabledScheduleBtn = false;
				            schedule.replyLoading = 0;
			            });
		            }

		            function scheduleUserStatsChange(newReply,oldReply){
			            if(newReply == oldReply) return;
			            if(oldReply){
				            var oldList = getUserListByReply(oldReply);
				            var newList = getUserListByReply(newReply);
				            var scheduleUserStats ;
				            for(var i = 0;i < oldList.length;i++){
					            if(oldList[i].userId == $cookies.userId){
						            scheduleUserStats = oldList[i];
						            oldList.splice(i,1);
						            break;
					            }
				            }
				            if(scheduleUserStats) newList.push(scheduleUserStats);
			            }else{
				            var newList = getUserListByReply(newReply);
				            newList.push({userName : $cookies.loginUserName,userId : $cookies.loginUserId});
			            }
		            }

		            function getUserListByReply(reply){
			            if(reply == 1) return schedule.attendList;
			            if(reply == 2) return schedule.absentList;
			            if(reply == 3) return schedule.maybeList;
		            }
	            }

	            function initVoteInfo(msg){
		            var vote = msg.vote;
			        vote.showMember = msg.createBy == $cookies.userId;

		            if(vote.voted){

		            }else{
			            if(msg.createBy == $cookies.userId){
				            vote.voted = true;
				            return;
			            }

			            if(vote.voteType == 1) vote.selectVoteOption = [];
		            }

		            showVoteOptionDetail(vote.voteOptionList);

		            vote.vote = function(){
			            vote.isSubmit = true;
			            var selectVoteOptionArr = angular.isArray(vote.selectVoteOption) ? vote.selectVoteOption : [vote.selectVoteOption];
			            voteRESTFactory.reply({
				            id : vote.id,
				            voteOpionIdArr : selectVoteOptionArr,
				            anonymity : vote.anonymity
			            },function(data){
				            vote.isSubmit = false;
				            if(data && data.code && data.code != 10000){
					            alertBoxFactory(data.msg,{width : 300,textAlign:'center'});
				            }else{
					            vote.voted = true;
					            vote.voteTotal += selectVoteOptionArr.length;
					            vote.voteOptionList = data.voteOptionList;
					            showVoteOptionDetail(data.voteOptionList);
				            }
			            },function(){
				            alertBoxFactory('网络异常!',{width : 220,textAlign: 'center'});
				            vote.isSubmit = false;
			            });
		            }

		            function showVoteOptionDetail(list){
			            for(var i = 0;i < list.length;i++){
				        	if(msg.createBy == $cookies.userId || list[i].downloadImageUri){
						        list[i].showDetailBtn = true;
					        }
			            }
		            }
	            }

	            function initLotteryInfo(msg){
		            var lottery = msg.lotteryVo;

		            showLotteryOptionDetail(lottery.lotteryOptionVoList,lottery.lotteryOptionId);

		            if(!lottery.finished && lottery.expired){
			            lottery.resultDes = '很遗憾抽奖活动已结束!';
		            }

		            lottery.lottery = function(){
			            if(lottery.over) return;

			            lottery.isSubmit = true;
			            lotteryRESTFactory.lottery({id : lottery.id},function(data){
				            lottery.isSubmit = false;
				            if(data && data.code && data.code != 10000){
					            alertBoxFactory(data.msg,{width : 300,textAlign:'center'});
				            }else{
					            lottery.run = lottery.over = true;
					            $timeout(function(){
						            lottery.run = false;
						            alertBoxFactory('恭喜你，获得了 ' + data.content,{width : 300,textAlign:'center'});
					            },(Math.random(5) + 2) * 1000);
				            }
			            },function(){
				            alertBoxFactory('网络异常!',{width : 220,textAlign: 'center'});
				            lottery.isSubmit = false;
			            });
		            }

		            function showLotteryOptionDetail(list,selectOptionId){
			            for(var i = 0;i < list.length;i++){
				            if(msg.createBy == $cookies.userId || list[i].downloadImageUri){
					            list[i].showDetailBtn = true;
				            }
				            if(list[i].id == selectOptionId){
				                lottery.resultDes = '你获得了 ' + list[i].content;
				            }
			            }
		            }
	            }

	            function initMsgList(data,id){
		            if(angular.isArray(data)){
			            var prevMoreCount = 0,nextMoreCount = 0,msgIndex = null;
//			            data.reverse();
			            for(var j = 0;j < data.length;j++){
				            data[j].p_extend = false;
				            data[j].msgClass = 'item card';
				            initMessage(data[j]);
				            if(data[j].id == id){
					            msgIndex = j;
					            data[j].msgClass = 'item';
					            data[j].p_extend = true;
				            }else if(j > 0 && j < data.length - 1){
								if(msgIndex == null){
									prevMoreCount++;
								}else{
									nextMoreCount++;
								}
				            }
			            }
			            $scope.msgList = data;
			            $scope.showMessageList = true;

			            if(prevMoreCount > 3){
				        	prevMoreMsgList = data.splice(1,prevMoreCount,{moreType : 'prev',moreCount : prevMoreCount,msgClass : 'item card'});
			            }
			            if(nextMoreCount > 3){
				            if(prevMoreMsgList.length){
					            nextMoreMsgList = data.splice(3,nextMoreCount,{moreType : 'next',moreCount : nextMoreCount,msgClass : 'item card'});
				            }else{
				                nextMoreMsgList = data.splice(msgIndex + 1,nextMoreCount,{moreType : 'next',moreCount : nextMoreCount,msgClass : 'item card'});
				            }
			            }
		            }else{
			            data.p_extend = true;
			            data.msgClass = 'item';
			            initMessage(data);
			            $scope.msgList = [data];
			            $scope.showMessageList = false;
		            }
	            }

	            function initMessage(message){
		            fetchReceiver(message, $cookies.userId);
//				        data.streamContent = dynamicImgSrcFactory(data.streamContent);
		            message.p_streamContentSce = $sce.trustAsHtml(message.streamContent);

		            if(message.annexation && message.annexation.indexOf('C') != -1){
			            initVoteInfo(message);
		            }else if(message.annexation && message.annexation.indexOf('B') != -1){
			            initScheduleInfo(message);
		            }else if(message.annexation && message.annexation.indexOf('E') != -1){
			            initLotteryInfo(message);
		            }

		            message.showEditBtn = $cookies.userId == message.createBy;

		            if(message.unreader == 1){
		                messageRESTFactory.setRead({id : message.id});
		            }
	            }

            }]);