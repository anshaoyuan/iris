'use strict';
angular.module('vsController').controller('questionDetailController',['$scope','questionRESTFactory','alertBoxFactory',
                                                                  '$location','$sce','userRESTFactory',"answerRESTFactory",'$cookies','utilService','storeService',
                                                                function($scope,questionRESTFactory,alertBoxFactory,$location,$sce,userRESTFactory,answerRESTFactory,$cookies,utilService,storeService){
		$scope.richTextConfig = {
			file : false
		};
		$scope.currUser = $cookies.userId;//记录是否是当前用户
		$scope.questionId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);//获取问答的id
		//用来判断赞的处理是否完成
		$scope.clickMentionValue = false;
		//加载问答详情
		function getQuestionById(){
			if($scope.questionId == null){
				return ;
			}
			questionRESTFactory.get({
				"id" : $scope.questionId
			},function(data){
				if(!data.titleName){
					alertBoxFactory('问答已不存在',{textAlign : 'center',width: 300,waitTime:1});
					$location.path('questions');
					
					return ;
				}
				$scope.questionTitle = data.titleName;
				$scope.questionContent =  $sce.trustAsHtml(data.questionContent);
				$scope.questionPraiseCount = data.praiseCount;
				$scope.questionCreateDate = data.createDate;
				$scope.mentionId = data.mentionId ==null ? false : true;
				$scope.isOwner = data.createBy == $scope.currUser ? 1 : 0;
				$scope.createBy = data.createBy;
				$scope.hasStore = data.hasStore;
				$scope.mentions = utilService.getMentions(data.mentionList);
				loadAnswer($scope.questionId);
				loadUser($scope.createBy);
			});
			
		};
		$scope.solution = true;
		//单个问答的回答列表
		function loadAnswer(questionId){
			answerRESTFactory.answers({
				"questionId" : questionId
			},function(data){
				$scope.solution = $scope.isOwner == 1 ? true : false;
				$scope.answerLength = data.length;
				for(var i=0;i<data.length;i++){
					var answer = data[i];
					if(answer.isSolution == 1){
						$scope.solution = false;
						data.splice(i,1);
						data.unshift(answer);
					}
				}
				$scope.answers = data;
			});
			
		};
		$scope.solutionQuestion = function(answerId){
			answerRESTFactory.solutionQuestion({
				"answerId" : answerId
			},function(data){
				if(data.code == "10000"){
					alertBoxFactory('标记为已解决问答',{textAlign : 'center',width: 300,waitTime:1});
					$scope.solution = false;
					for(var i = 0 ; i < $scope.answers.length ; i++){
						var answer = $scope.answers[i];
						if($scope.answers[i].id == answerId){
							$scope.answers[i].isSolution = true;
							$scope.answers.splice(i,1);
							$scope.answers.unshift(answer);
						}
					}
				}else{
					alertBoxFactory('标记问答失败',{textAlign : 'center',width: 300,waitTime:1});
				}
			});
		};
		//进行加载作者信息
		function loadUser(userId){
			userRESTFactory.get({
				"userId":userId
				
			},function(data){
				$scope.createName = data.userNickname;
				$scope.createImg = data.userImgUrl;
				$scope.createTitle = data.title;
				
			});
			
		};
		//热门问答加载
		function loadHotQuestion(){
			questionRESTFactory.hotList({
				"pageInfo":{
					"pageNumber":1,
					"pageSize":5
				}
			},function (data){
				var lengthNum = data.content.length;
				for(var i=0;i<lengthNum;i++){
					if(data.content[i].id == $scope.questionId){
						lengthNum = lengthNum-1;
						data.content.splice(i,1);
					}
				}
				$scope.hotQuestionLength = lengthNum;
				$scope.hotQuestions = data.content;
				
			});
		};
		getQuestionById();
		loadHotQuestion();
	//---------------------------------------------------------------------
		$scope.store = function(){
			storeService.store(2,$scope.questionId,$scope.hasStore,function(){
				if($scope.hasStore==0){
					$scope.hasStore = 1;
					alertBoxFactory('收藏成功',{textAlign : 'center',width: 300,waitTime:2});
				}else{
					$scope.hasStore = 0;
					alertBoxFactory('取消收藏成功',{textAlign : 'center',width: 300,waitTime:2});
				}
			});
		};
		
		//进行点赞问答
		$scope.clickMention = function(){
			$scope.clickMentionValue = true;
			questionRESTFactory.questionMention({
				"id" : $scope.questionId
			},function(data){
				if(data.id!=null){
					alertBoxFactory('点赞成功',{textAlign : 'center',width: 300,waitTime:1});
					$scope.questionPraiseCount = $scope.questionPraiseCount+1;
					$scope.mentionId = true;
				}else{
					alertBoxFactory('取消赞。',{textAlign : 'center',width: 300,waitTime:1});
					$scope.questionPraiseCount = $scope.questionPraiseCount-1;
					$scope.mentionId = false;
				}
				$scope.clickMentionValue = false;
			});
		};
		
		//进行点赞回答
		$scope.clickMentionAnswer = function(answerId){
			answerRESTFactory.metionAnswer({
				"id" : answerId
			},function(data){
				if(data.id!=null){
					alertBoxFactory('点赞回答成功',{textAlign : 'center',width: 300,waitTime:1});
					for(var i = 0 ; i < $scope.answers.length ; i++){
						if($scope.answers[i].id == answerId){
							$scope.answers[i].mentionId = 1;
							$scope.answers[i].praiseCount = $scope.answers[i].praiseCount+1;
						}
					}
				}else{
					alertBoxFactory('取消回答赞。',{textAlign : 'center',width: 300,waitTime:1});
					for(var i = 0 ; i < $scope.answers.length ; i++){
						if($scope.answers[i].id == answerId){
							$scope.answers[i].mentionId = null;
							$scope.answers[i].praiseCount = $scope.answers[i].praiseCount-1;
						}
					}
				}
			});
		};
		
		//进行编辑
		$scope.editQuestion = function(){
			$location.path('questions/update/'+$scope.questionId);
		};
		
		//进行删除问答
		$scope.deleteQuestion = function(){
			questionRESTFactory.deleteQ({
				"id" : $scope.questionId
			},function(data){
				if(data.code == "10000"){
					alertBoxFactory('删除问答成功',{textAlign : 'center',width: 200,waitTime:1});
					$scope.questionId = null;
					$location.path('questions');
				}else{
					alertBoxFactory('删除问答失败',{textAlign : 'center',width: 300,waitTime:1});
				}
			});
		};
		
		//---------------------------------------------追加回答的操作，父级赋值
		
		$scope.answerParentId; 
		$scope.showAnswerForm = function(answer){
			for(var i = 0 ; i < $scope.answers.length ; i++){
				if($scope.answers[i] != answer){
					$scope.answers[i].subFormShow = false;
				}
			}
			if(!answer.subFormShow){
				$scope.answerParentId = answer.id;
			}
			answer.subFormShow = !answer.subFormShow;
		};
		$scope.answerContent1 = '^';
		$scope.answerHtml2 = '^';
		//添加回答操作
		$scope.answerSub = function(type,html){
			if(!html){
				return;
			}
			//直接回答
			if(type == 1){
				answerRESTFactory.create({
					"questionId":$scope.questionId,
					"answerHtml":html
				},function(data){
					if(data.id){
						$scope.answers.push(data);
						$scope.answerContent1_value = '';
						$scope.answerLength = $scope.answerLength + 1;
						alertBoxFactory('回答成功',{textAlign : 'center',width: 200,waitTime:1});
					}else{
						alertBoxFactory('回答失败',{textAlign : 'center',width: 200,waitTime:1});
					}
				});
			}else{
				//进行追加回答，传值父级的id
				answerRESTFactory.create({
					"questionId":$scope.questionId,
					"parentId":$scope.answerParentId,
					"answerHtml":html
				},function(data){
					if(data.id){
						for(var i = 0 ; i < $scope.answers.length ; i++){
							$scope.answers[i].subFormShow = false;
						}
						$scope.answers.push(data);
						$scope.answerHtml2_value = '';
						$scope.answerLength = $scope.answerLength + 1;
						alertBoxFactory('回答成功',{textAlign : 'center',width: 200,waitTime:1});
					}else{
						alertBoxFactory('回答失败',{textAlign : 'center',width: 200,waitTime:1});
					}
				});
			}
		};
		
		//删除回答
		$scope.deleteAnswer = function(config,attr){
			answerRESTFactory.deleteAnswer({
				"id":attr.answerid
			},function(data){
				if(data.code = "10000"){
					alertBoxFactory('删除回答成功',{textAlign : 'center',width: 300,waitTime:1});
					for(var i =0 ;i <$scope.answers.length; i++){
						if($scope.answers[i].id == attr.answerid){
							if($scope.answers[i].isSolution==1){
								$scope.solution = true;//删除已解决的回答，进行显示”解决问答“
							}
							$scope.answers.splice(i,1);
							break;
						}
					}
					$scope.answerLength = $scope.answerLength - 1;
				}else{
					alertBoxFactory('删除回答失败',{textAlign : 'center',width: 300,waitTime:1});
				}
			});
		};
		


		$scope.searchReceiver = function (key) {
			userRESTFactory.findUserByNameAndEmail({searchKey : key},function(data){
	            var selectedList = getSelect($scope.newToList);
	            for (var i = 0; i < data.length; i++) {
	            	if (data[i].id != $cookies.userId) {
						data[i].name = data[i].userName;
						selectedList.push(data[i]);
					}
	            }
	            $scope.newToList = selectedList;
	        });
	    };
	    function getSelect(list) {
	    	var result = [];
			if (list && list.length) {
				for (var i = 0; i < list.length; i++) {
					if (list[i].selected) {
						result.push(list[i]);
					}
				}
			}
			return result;
	    };
	    
		//邀请人作答
		$scope.askQuestion = function(users){
			var users = "";
			var list = $scope.newToList;
			if(list.length <= 0){
				alertBoxFactory('请邀请人作答',{textAlign : 'center',width: 300,waitTime:1});
				return ;
			}else{
				//把对象拼接成字符串
				for(var i=0;i<list.length;i++){
					if(i==list.length-1){
						users += list[i].id;
					}else{
						users += list[i].id+",";
					}
				}
				questionRESTFactory.askQuestion({
					"id":$scope.questionId,
					"askUsers":users
				},function(data){
					if(data.code == "10000"){
						$scope.newToList = [] ;
						alertBoxFactory('邀请作答成功',{textAlign : 'center',width: 300,waitTime:1});
					}else{
						alertBoxFactory('邀请作答问答失败',{textAlign : 'center',width: 300,waitTime:1});
					}
				});
			}
		};
		
		
		
}]);
