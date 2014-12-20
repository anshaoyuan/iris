'use strict';

angular.module('vsController')

.controller('remindController', ['$scope', 'remindRESTFactory', '$cookies','$location','$rootScope', 'alertBoxFactory', '$state', function($scope, remindRESTFactory, $cookies,$location,$rootScope,alertBoxFactory, $state){
	
//	$scope.getAllRemindCount = function(){
//		remindRESTFactory.allRemindCount({}, function(data){
//			$scope.totalRemindCount = data.allRemindCount;
//		});
//	}
//	
//	$scope.getAllRemindCount();
	
	var requestFlag = 0;
	
//	window.setInterval(function(){
//		$scope.getAllRemind();
//	}, 60000);
	
	
	
	$scope.myRemindCount = 0;//我的提醒数量
	$scope.teamRemindCount = 0;//群组提醒数量
	
	$scope.getAllRemind = function(){
		remindRESTFactory.allRemindCount({}, function(data){
			$scope.allRemind = data;
			$scope.myRemindCount = data.MYSELF;
			$scope.teamRemindCount = data.TEAM;
			$rootScope.totalRemindCount = parseInt(data.allRemindCount);
		}, function(error){
			console.log(error);
		});
	};
	
	$scope.getAllRemind();
	
	$scope.currPage = 1;
	
	var defaultPageSize = 10;
	
	$scope.isNotEnd = true;
	
	$scope.currRemindType = 1;
	
	$scope.showPage = true;
	
	$scope.changeTag = function(type){
		$scope.currPage = 1;
		if(type==1){
			$scope.currRemindType = 1;
			$scope.getMyselfRemind();
		}else if(type == 2){
			$scope.currRemindType = 2;
			$scope.getTeamRemind();
		}
		$scope.isNotEnd = true;
	}
	
	$scope.getMyselfRemind = function(){
		remindRESTFactory.myselfRemind({
			"page": $scope.currPage,
			"pageSize":defaultPageSize
		}, function(data){
			$scope.remindList = data.content;
			
			if($scope.currPage == 1 && data.content.length < 10){
				$scope.showPage = false;
			}else{
				$scope.showPage = true;
			}
			processPageEnd(data.totalElements);
		});
	}
	
	function processPageEnd(total){
		if($scope.remindList == undefined 
				|| $scope.remindList.length < 10
				|| $scope.remindList.length == 0){
			$scope.isNotEnd = false;
		}
		var currTotalVal = ($scope.currPage - 1) * defaultPageSize + $scope.remindList.length;
		if(currTotalVal == total){
			$scope.isNotEnd = false;
		}else{
			$scope.isNotEnd = true;
		}
	}
	
	$scope.getMyselfRemind();
	
	$scope.getTeamRemind = function(){
		remindRESTFactory.teamRemind({
			"page": $scope.currPage,
			"pageSize":"10"
		}, function(data){
			$scope.remindList = data.content;
			
			if($scope.currPage == 1 && data.content.length < 10){
				$scope.showPage = false;
			}else{
				$scope.showPage = true;
			}
			
			processPageEnd(data.totalElements);
		});
	}

	$scope.showDetail = function(id, url, msgStatus){
		
		var currCount = 0;
		if($scope.currRemindType == 1){
			currCount = $scope.myRemindCount;
		}else if($scope.currRemindType == 2){
			currCount = $scope.teamRemindCount;
		}
		
		var finalUrl = url.replace(/^#/,'');
		
		if(currCount > 0){
			remindRESTFactory.setOneRemindHasReaded({
				"id" : id
			}, function(data){
				if(data.code == '10000') {
					if(msgStatus == 1){
						$rootScope.totalRemindCount -- ;
					}
//					$state.go(finalUrl, {}, {reload : true});
					$location.url(finalUrl);
				}
			});
		}else{
			$location.url(finalUrl);
//			$state.go(finalUrl, {}, {reload : true});
		}
	}
	
	$scope.nextPage = function(){
		$scope.currPage ++ ;
		if($scope.currRemindType == 1){
			$scope.getMyselfRemind();
		}else if($scope.currRemindType == 2){
			$scope.getTeamRemind();
		}
	}
	
	$scope.previewPage = function(){
		$scope.currPage -- ;
		if($scope.currRemindType == 1){
			$scope.getMyselfRemind();
		}else if($scope.currRemindType == 2){
			$scope.getTeamRemind();
		}
		$scope.isNotEnd = true;
	}
	
	$scope.setRemindHasReaded = function(){
		remindRESTFactory.setOneTypeMessageWasReaded({
			"type" : $scope.currRemindType
		}, function(data){
			if(data.code == '10000') {
				alertBoxFactory('设置成功!',{textAlign : 'center',width: 200});
				if($scope.currRemindType == 1){
					$rootScope.totalRemindCount = $rootScope.totalRemindCount - $scope.myRemindCount;
					$scope.myRemindCount = 0;
					$scope.getMyselfRemind();
				}else if($scope.currRemindType == 2) {
					$rootScope.totalRemindCount = $rootScope.totalRemindCount - $scope.teamRemindCount;
					$scope.teamRemindCount = 0;
					$scope.getTeamRemind();
				}
			}
		});
	}
	
}]);