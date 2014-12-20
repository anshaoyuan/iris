'use strict';

angular.module('vsService').factory('remindFactory',['$rootScope', 'remindRESTFactory', function($rootScope, remindRESTFactory){
	
	return function(){
		remindRESTFactory.allRemindCount(function(data){
			$rootScope.totalRemindCount = parseInt(data.allRemindCount);
		});
	}
}]);