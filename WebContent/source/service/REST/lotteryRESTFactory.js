angular.module('vsREST').factory('lotteryRESTFactory',['$resource',function($resource){
	var url = '../mobile/lottery/:id';

	var actions = {
		lottery : {
			method : 'get'
		}
	}

	var lottery = $resource(url,{},actions);

	return lottery;
}]);