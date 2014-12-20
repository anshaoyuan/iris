'use strict';
angular.module('vsController').controller('eventListController',['$scope','blogRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory','$state',
                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory,$state){

	$scope.itemsPerPage = 3;
	$scope.currentPage = 1;
	$scope.maxSize = 10;
	if ($location.search().pageNumber && $location.search().pageNumber !== true) {
		$scope.currentPage = $location.search().pageNumber;
	}
	function getBlog(page){
		blogRESTFactory.blogs({
			"isSignup":1,
			"pageInfo":{
				"pageNumber":page,
				"pageSize":$scope.itemsPerPage
			}
		},function(data){
			$scope.totalItems = data.totalElements;
			$scope.blogArray = data.content;
			$scope.currentPage = page;
		});
	};
	//第一次加载列表
	getBlog($scope.currentPage);
	$scope.paging = function(){
		$state.go('events',{pageNumber:$scope.currentPage});
	};
	
	function loadNewEvent(){
		blogRESTFactory.blogs({
			"isSignup":1,
			"pageInfo":{
				"pageNumber":1,
				"pageSize":10
			}
		},function(data){
			$scope.newEvents = data.content;
		});
	}
	loadNewEvent();
	
}]);

angular.module('vsController').controller('signupProjectController',['eventService','$scope','eventsRESTFactory','alertBoxFactory',
                                                                 '$location','imageRESTFactory','$cookies',
                                                                 function(eventService,$scope,eventsRESTFactory,alertBoxFactory,
                                                                		 $location,imageRESTFactory,$cookies){
	
	$scope.signList = [];
	$scope.isSignUp = false;
	$scope.pid =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	$scope.getProjectDetail = function(){
		eventsRESTFactory.queryDetailProject({pid:$scope.pid},function(data){
			if(data.code != 10000){
				alertBoxFactory('查询项目详情失败',{textAlign : 'center',width: 400,waitTime:2});
				$location.path('events');
			}else{
				$scope.signList = data.signList;
				$scope.project = data.project;
				$scope.isSignUp = data.project.isSignUp ==1 ? true:false;
				
				if(data.project.createId == $cookies.userId){
					$scope.isCreate = true;
				}else{
					$scope.isCreate = false;
				}
				$scope.isShow = $scope.signList.length>0 && ($scope.isCreate || ( $scope.project.isShow==1 && $scope.isSignUp));
			}
		});
	};

	$scope.getProjectDetail();
	$scope.submited = false;
	$scope.signUpSub = function(){
		$scope.submited = false;
		if(!this.realName || this.realName.length > 10){
			$scope.errorMsg = "真实姓名不能为空或长度不能超过10!";
			$scope.submited = true;
			return ;
		}
		var regMobile = /^1[3|4|5|8][0-9]\d{8}$/;
		if(!regMobile.test(this.phoneNumber)){
			$scope.errorMsg = "电话号码输入有误，请输入正确的手机号码!";
			$scope.submited = true;
			return ;
		}
		if(!this.orgInfo || this.orgInfo.length>30){
			$scope.errorMsg = "所属单位不能为空或长度不能超过30!";
			$scope.submited = true;
			return ;
		}
		if(!this.title || this.title.length>30){
			$scope.errorMsg = "职位名称不能为空或长度不能超过30!";
			$scope.submited = true;
			return ;
		}
		var realName = this.realName;
		var phoneNumber = this.phoneNumber;
		var orgInfo = this.orgInfo;
		var title = this.title;
		eventsRESTFactory.signupProject({
			  "pId":this.pid,
			  "realName":this.realName,
			  "phoneNumber":this.phoneNumber,
			  "orgInfo":this.orgInfo,
			  "title":this.title
		},function(data){
			if(data.code==10000){
				$scope.isSignUp = true;
				alertBoxFactory('报名成功',{textAlign : 'center',width: 400,waitTime:2});
				var newArray = [];
				newArray.push(
						{
							realName : realName,
							phoneNumber : phoneNumber,
							orgInfo : orgInfo,
							title : title
						}
				);
				$scope.isSignUp= true;
				
				$scope.signList = newArray.concat($scope.signList);
				$scope.isShow =$scope.isCreate || ( $scope.project.isShow==1 && $scope.isSignUp);
			}else{
				alertBoxFactory('报名失败',{textAlign : 'center',width: 400,waitTime:2});
			}
		});
	};
	
}]);

	