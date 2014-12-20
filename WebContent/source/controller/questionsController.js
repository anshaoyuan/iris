'use strict';
//------------------------------草稿列表或者发表问答的列表
angular.module('vsController').controller('questionsController',['$scope','questionRESTFactory','alertBoxFactory','userRESTFactory','$location','$cookies',
                                                                function($scope,questionRESTFactory,alertBoxFactory,userRESTFactory,$location,$cookies){
	$scope.currUser = $cookies.userId;//记录是否是当前用户
	$scope.title = $location.search().type ? $location.search().type : "最新问题";
	//进行判断是发表的问答还是草稿的列表	
	var questionType = "0";
    if($location.absUrl().indexOf("/drafts") > 0){
    	questionType = "1";
    }
	//------------------------
	$scope.questionList =[];
	$scope.questionShow = true;
	$scope.currentPage = $location.search().pageNumber ? $location.search().pageNumber : 1;//默认显示页码
	$scope.itemsPerPage = 10;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	$scope.hotQuestionShow = true;
	$scope.myQuestionShow = true;
   
	$scope.getQuestions = function(currentPage){
		if($scope.title == "最新问题"){
			questionRESTFactory.list({
				"isDraft" : questionType,
				"pageInfo":{
					"pageNumber":currentPage,
					"pageSize":$scope.itemsPerPage
				}
			},function(data){
				$scope.questionList=[];
				$scope.totalItems = data.totalElements;
			    $scope.questionList = data.content;
			    $location.search("pageNumber",currentPage);
			    $location.search("type","最新问题");
			    $scope.currentPage = currentPage;
		    });
		}else if($scope.title == "最热问题"){
			questionRESTFactory.hotList({
				"pageInfo":{
					"pageNumber":currentPage,
					"pageSize":$scope.itemsPerPage
				}
			},function (data){
				$scope.questionList = data.content;
				$scope.totalItems = data.totalElements;
				$location.search("pageNumber",currentPage);
				$location.search("type","最热问题");
				$scope.currentPage = currentPage;
			});
		}else if($scope.title == "我的问答"){
			questionRESTFactory.list({
				"isDraft" : questionType,
				"createBy":$scope.currUser,
				"pageInfo":{
					"pageNumber":currentPage,
					"pageSize":$scope.itemsPerPage
				}
			},function(data){
				$scope.questionList = data.content;
				$scope.totalItems = data.totalElements;
				$location.search("pageNumber",currentPage);
				$location.search("type","我的问答");
				$scope.currentPage = currentPage;
		    });
		}else{
			questionRESTFactory.unAnswerList({
				"pageInfo":{
					"pageNumber":currentPage,
					"pageSize":$scope.itemsPerPage
				}
			},function (data){
				$scope.questionList = data.content;
				$scope.totalItems = data.totalElements;
				$location.search("pageNumber",currentPage);
				$location.search("type","未答问题");
				$scope.currentPage = currentPage;
			});
		}
	};
	
	  $scope.clickHotMenu = function(){
		$scope.title = "最热问题";
		$scope.getQuestions(1);
	};
	  $scope.clickNewMenu = function (){
		$scope.title = "最新问题";
		$scope.getQuestions(1);
	};
	$scope.clickUnMenu = function (){
		$scope.title = "未答问题";
		$scope.getQuestions(1);
	};
	$scope.clickMyMenu = function (){
		$scope.title = "我的问答";
		$scope.getQuestions(1);
	};
	
	//热门问答加载
	function loadHotQuestion(){
		questionRESTFactory.hotList({
			"pageInfo":{
				"pageNumber":1,
				"pageSize":5
			}
		},function (data){
			if(data.content.length<=0){
				$scope.hotQuestionShow = false;
			}
			$scope.hotQuestions = data.content;
			
		});
	};
	
	//我的问答加载
	function MyQuestion(){
		questionRESTFactory.list({
			"isDraft" : questionType,
			"createBy":$scope.currUser,
			"pageInfo":{
				"pageNumber":1,
				"pageSize":5
			}
		},function(data){
			if(data.content.length<=0){
				$scope.myQuestionShow = false;
			}
		    $scope.myQuestions = data.content;
	    });
	};
	
	//第一次加载列表
	$scope.getQuestions($scope.currentPage);
	loadHotQuestion();
	MyQuestion();
	
	
}]);
