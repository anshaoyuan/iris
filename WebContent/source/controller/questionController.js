'use strict';
angular.module('vsController').controller('questionController',['$scope','questionRESTFactory','alertBoxFactory','$location',
                                                                function($scope,questionRESTFactory,alertBoxFactory,$location){
	
	//-----------------------------新增或者编辑
	$scope.richTextConfig = {
			file : false
	};
	$scope.submited = false;
	$scope.questionId = null;//获取questionId
	if($location.absUrl().indexOf("/update") > 0){
		$scope.questionId  = $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	}
	 //提交
	$scope.questionSub = function(type){
		$scope.submited = true;
		if($scope.newQuestionForm.$valid){
			if($scope.questionId){
				questionRESTFactory.update({
					id : $scope.questionId,
					titleName : $scope.questionTitle,
					questionContent : $scope.questionContent,
					questionComefrom:'0',
					isDraft:type
				},function(data){
					showInfo(data,type);
				});
			}else{
				questionRESTFactory.create({
					titleName : $scope.questionTitle,
					questionContent : $scope.questionContent,
					questionComefrom:'0',
					isDraft:type
					},function(data){
						showInfo(data,type);
					},function(data){
						alertBoxFactory('发布问答失败',{textAlign : 'center',width: 300,waitTime:1});
				});
			}
			
		}
	};
	function showInfo(data,type){
		if(data.questionId){
			if(type == 1){
				alertBoxFactory('草稿保存成功',{textAlign : 'center',width: 300,waitTime:1});
				$scope.questionId = data.questionId;
			}else{
				alertBoxFactory('发表成功',{textAlign : 'center',width: 200,waitTime:1});
				$scope.questionId = null;
				$location.path('questions');
			}
		}else if(data.msg){
			alertBoxFactory(data.msg,{textAlign : 'center',width: 300,waitTime:1});
		}else{
			alertBoxFactory('发表失败',{textAlign : 'center',width: 200,waitTime:1});
		}
	}
	
	//进行获取单个问答的详细信息
		function getQuestionById(){
			//如果$scope.questionId 不为空的话，问答可进行编辑
			if($scope.questionId!=null){
				questionRESTFactory.get({
					"id" : $scope.questionId
				},function(data){
					$scope.questionTitle = data.titleName;
					$scope.questionContent = '^'+data.questionContent;
				});
			}else{
				$scope.questionContent = '^';
			}
		}
		getQuestionById();
	
}]);
