'use strict';
angular.module('vsController').controller('storeController',['$scope','storeRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory','$state',
                                                                function($scope,storeRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory,$state){

	$scope.currNav = $location.search().type;
	$scope.page = $location.search().page ?  $location.search().page : 1;
	$scope.itemsPerpage = 10 ;

	$scope.load = function(type,page){
		if(type=='blog'){
			storeRESTFactory.blogs({
				"pageInfo":{
					"pageNumber":page,
					"pageSize":$scope.itemsPerpage
				}
			},function(data){
				$scope.totalItems = data.totalElements;
				$scope.blogArray = data.content;
				$scope.currentPage = page;
			});
		}else{
			storeRESTFactory.questions({
				"pageInfo":{
					"pageNumber":page,
					"pageSize":$scope.itemsPerpage
				}
			},function(data){
				$scope.totalItems = data.totalElements;
				$scope.questionList = data.content;
				$scope.currentPage = page;
			});
		}
	};
	$scope.load($scope.currNav,$scope.page);
	$scope.switchNav = function (nav) {
		$state.go('store',{
			type : nav,
			page : 1
		});
	};
	
	$scope.paging = function(){
		$state.go('store',{
			type : $scope.currNav,
			page : $scope.currentPage
		});
	};
	
	
}]);