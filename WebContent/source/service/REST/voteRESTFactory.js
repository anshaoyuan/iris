angular.module('vsREST').factory('voteRESTFactory',['$resource',function($resource){
	var url = '../mobile/vote/reply';

	var actions = {
		reply : {
			method : 'post'
		}
	}

	var vote = $resource(url,{},actions);

	return vote;
}]);