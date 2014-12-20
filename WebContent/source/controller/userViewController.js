'use strict';

angular.module('vsController')

	.controller('userViewController', ['$scope', 'userRESTFactory','blogRESTFactory', 'questionRESTFactory','$cookies', '$location', 'relationshipRESTFactory', 'alertBoxFactory', '$state','$stateParams', 'sinaRESTFactory',
	                          function($scope, userRESTFactory, blogRESTFactory, questionRESTFactory, $cookies, $location, relationshipRESTFactory, alertBoxFactory, $state,$stateParams, sinaRESTFactory){
//	var urlPath = $location.$$absUrl;
//	var lastSlashIndex = urlPath.lastIndexOf("/");
	var uid = $stateParams.uid;
	
	$scope.sinaValid = false;
	$scope.editNickNameFlag = true;
	
//	questionRESTFactory.list({
//		"createBy":uid == 0? $cookies.userId : uid
//	}, function(data){
//		$scope.questionCount = data.totalElements;
//	});
	
	//用户个人资料
	userRESTFactory.get({userId: uid}, function(data) {
		$scope.user=data;
		var isCurrU = data.id == $cookies.userId;
		$scope.isCurrUser=isCurrU;
		if(!isCurrU){
			//非当前用户
			relationshipRESTFactory.findOnlyRelationship({
				"otherUserId" : uid
			}, function(data){
				if(data.id != undefined){
					$scope.hasAtt = true;
				}else{
					$scope.hasAtt = false;
				}
			})
		}
	});
	
	$scope.currentPage = 1;//默认显示页码
	$scope.itemsPerPage = 5;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	
	$scope.initUserBlog = function (currentPage){
		blogRESTFactory.initUserBlog({
			"createBy":uid == 0? $cookies.userId : uid,
			"isDraft" : 0,
			"pageInfo":{
			"pageNumber":currentPage,
			"pageSize":$scope.itemsPerPage
			}
		}, function(data){
			$scope.userBlog = data.content;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = currentPage;
		});
	}
	
	//分享列表
	$scope.initUserBlog($scope.currentPage);
	
	$scope.currentQuestionPage = 1;//默认显示页码
	
	$scope.initQuetionList = function(currentPage){
		//问答列表
		questionRESTFactory.list({
			"createBy":uid == 0? $cookies.userId : uid,
			"pageInfo":{
			"pageNumber":currentPage,
			"pageSize": $scope.itemsPerPage
			}
		},function(data){
			$scope.userQuestions = data.content;
			$scope.questionTotalItems = data.totalElements;
			$scope.currentQuestionPage = currentPage;
		});
	}
	
	$scope.initQuetionList($scope.currentQuestionPage);
	
	
	//验证新浪
	sinaRESTFactory.validateSina({}, function(data){
		if(data.isBind == '1'){
			$scope.sinaValid = true;
		}
	});
	
	//跳转到用户编辑页面
	$scope.editUser=function(){
		$state.go('users_edit', {}, {reload : true});
//		window.location.href='#/users/edit';
	}
	
	//跳转到头像编辑页
	$scope.updateUserImg=function(){
		$state.go('updateUserImg', {}, {reload : true});
//		window.location.href='#/updateUserImg';
	}
	
	$scope.bindSina = function(){
//		$state.go('/mobile/sina/toBindPage', {}, {reload : true});
//		$location.url('/mobile/sina/toBindPage');
		window.location.href='../mobile/sina/toBindPage';
	}
	
	$scope.toSinaPage = function(){
		$state.go('sinaIndex', {}, {reload : true});
//		window.location.href="#/sinaIndex";
	}
	
	$scope.showAllBlog = function(){
		var params = {
			createBy : (uid == 0? $cookies.userId : uid),
			nav : "BLOG"
		}
		
		$state.go('search', params, {reload : true});
//		window.location.href="#/search?nav=BLOG&s=*&createBy=" + (uid == 0? $cookies.userId : uid);
	}
	
	$scope.showAllQuestion = function(){
		var params = {
			createBy : (uid == 0? $cookies.userId : uid),
			nav : "QUESTION"
		}
		$state.go('search', params, {reload : true});
//		window.location.href="#/search?nav=QUESTION&s=*&createBy=" + (uid == 0? $cookies.userId : uid);
	}
	
	$scope.viewRss = function(){
		$state.go('rssIndex', {}, {reload : true});
//		window.location.href="#/rssIndex";
	}
	
	$scope.sendMsg = function(){
		$location.url("/new?touid=" +$scope.user.id+ "&touname="+$scope.user.userName+"&touemail=" + $scope.user.email);
//		window.location.href="#/new?touid=" +$scope.user.id+ "&touname="+$scope.user.userName+"&touemail=" + $scope.user.email;
	}
	
	$scope.attention = function(otherUserId){
		relationshipRESTFactory.addRelation({
			"otherUserId" : otherUserId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('关注成功!',{textAlign : 'center',width: 200});
				$scope.hasAtt = true;
			}
		});
	}
	
	$scope.cancel = function(otherUserId) {
		relationshipRESTFactory.cancelRelation({
			"otherUserId" : otherUserId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('取消成功!',{textAlign : 'center',width: 200});
				$scope.hasAtt = false;
			}
		});
	}
	
	$scope.watchImageFolder = function(uid){
		$location.url("/pics/" + uid);
	}
	
	$scope.saveNickName = function(uid){
		
		if($scope.user.userNickname.trim() == ''){
			alertBoxFactory('昵称不能为空!',{textAlign : 'center',width: 200});
			return;
		}
		
		userRESTFactory.saveNickname({
			"nickid" : uid,
			"nickname" : $scope.user.userNickname
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('修改成功!',{textAlign : 'center',width: 200});
				$scope.editNickNameFlag = true;
			}
		});
	}
}])

;