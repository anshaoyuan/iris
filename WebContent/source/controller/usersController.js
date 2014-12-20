'use strict';

angular.module('vsController')

.controller('usersController', ['$scope', 'userRESTFactory', 'relationshipRESTFactory', 'alertBoxFactory', '$cookies', '$state','$stateParams', 
                                function($scope, userRESTFactory, relationshipRESTFactory, alertBoxFactory, $cookies, $state, $stateParams){
	
	$scope.currentPage = 1;//默认显示页码
	$scope.itemsPerPage = 10;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	
	$scope.currUserId = $cookies.userId;
	
	$scope.showAllUser = true;
	$scope.showFollowUser = false;
	
	$scope.initListType = $stateParams.type;
	
	var currPage = $stateParams.page;
	
	$scope.searchUserVal='';
	
	$scope.initUserList = function (){
		$scope.tabType = 'my';
		$scope.showAllUser = true;
		$scope.showFollowUser = false;
		userRESTFactory.listByPage({ 
			"userName" : $scope.searchUserVal,
			"firstLetter" : $scope.searchUserVal, 
			"pageInfo":{
				"pageNumber": currPage,
				"pageSize":$scope.itemsPerPage
			 }	
		}, function(data){
			$scope.totalItems = data.totalElements;
			var list = data.content;
			processRelationship(list);
			$scope.userList = list;
			$scope.currentPage = currPage;
		})
	}
	
	function processRelationship(userlist){
		relationshipRESTFactory.get({}, function(data){
			
			var rList = data.relations;
			
			for(var j=0; j<userlist.length; j++){
				var user = userlist[j];
				for(var i=0; i<rList.length; i++){
					var robj = rList[i];
					if(user.id == robj.otherUserId){
						user.isAttention = true;
						break;
					}
				}
			}
		})
	}
	
	$scope.changeListType = function(type, page){
		$scope.searchUserVal = '';
		if(type == '0'){
			//关注列表
			$state.go('users', {"type" : 0, "page" : page}, {reload : true});
		}else if(type == '1'){
			//所有用户列表
			$state.go('users', {"type" : 1, "page" : page}, {reload : true});
		}else if(type == '2'){
			//积分用户列表
			$state.go('users', {"type" : 2, "page" : page}, {reload : true});
		}
	}
	
	
	$scope.goToPage = function(page) {
		$scope.changeListType(1, page);
	}
	
	$scope.attention = function(otherUserId){
		relationshipRESTFactory.addRelation({
			"otherUserId" : otherUserId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('关注成功!',{textAlign : 'center',width: 200});
				changeRelationship(otherUserId, true);
			}
		});
	}
	
	function changeRelationship(uid, flag){
		for(var i=0; i<$scope.userList.length; i++){
			var u = $scope.userList[i];
			if(u.id == uid) {
				u.isAttention = flag;
				break;
			}
		}
	}
	
	
	$scope.cancel = function(otherUserId) {
		relationshipRESTFactory.cancelRelation({
			"otherUserId" : otherUserId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('取消成功!',{textAlign : 'center',width: 200});
				if($scope.tabType == 'att') {
					$scope.initMyAttentionList();
				}else{
					changeRelationship(otherUserId, false);
				}
			}
		});
	}
	
	$scope.followCurrentPage = 1;//默认显示页码
	$scope.followItemsPerPage = 10;//每页显示的条数
	$scope.followMaxSize = 10; //最大显示页码个数
	
	$scope.initMyAttentionList = function(){
		$scope.tabType = 'att';
		$scope.showAllUser = false;
		$scope.showFollowUser = true;
		userRESTFactory.getAttentionListByPage({
			"userName" : $scope.searchUserVal,
			"pageInfo":{
				"pageNumber": currPage,
				"pageSize":$scope.followItemsPerPage
			 }	
		}, function(data){
			
			var ulist = data.content;
			$scope.folloTtotalItems = data.totalElements;
			for(var i=0; i<ulist.length; i++){
				var user = ulist[i];
				user.isAttention = true;
			}
			$scope.userList = ulist;
			$scope.followCurrentPage = currPage;
		});
	}
	
	$scope.goToFollowPage = function(currPage) {
		$scope.changeListType(0, currPage);
	}
	
	
	
	$scope.initUsersByIntegral = function(){
		$scope.tabType = 'integral';
		$scope.showAllUser = false;
		$scope.showFollowUser = false;
		userRESTFactory.findUsersByIntegral({}, function(data){
			var list = data;
			processRelationship(list);
			$scope.userList = list;
		})
	}
	
	function initTypeUserList(initListType) {
		if(initListType == 0){
			//关注列表
			$scope.initMyAttentionList();
		}else if(initListType == 1){
			//全部用户
			$scope.initUserList();
		}else if(initListType == 2){
			//积分排行
			$scope.initUsersByIntegral();
		}
	}
	
	$scope.searchUser = function(){
		currPage = 1;
		initTypeUserList($scope.initListType);
	}
	
	initTypeUserList($scope.initListType);
	
}]);

function updateUserImageController($scope, $modal) {

    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: 'updateUserImage.html',
            controller: ModalInstanceController
        });

    };
}

function ModalInstanceController($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
