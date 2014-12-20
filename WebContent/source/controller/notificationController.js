'use strict';

angular.module('vsController')

.controller('notificationController', ['$scope', 'remindRESTFactory', function($scope, remindRESTFactory){
	
	$scope.getAllRemindCount = function(){
		remindRESTFactory.allRemindCount({}, function(data){
			$scope.totalRemindCount = data.allRemindCount;
		});
	}
	
	$scope.getAllRemindCount();
	
}]);