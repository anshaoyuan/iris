angular.module('vsREST').factory('scheduleRESTFactory',['$resource',function($resource){
	var url = '../mobile/schedule/reply';

	var actions = {
	   reply : {
		   method : 'post'
	   }
	}

	var schedule = $resource(url,{},actions);

	return schedule;
}]);