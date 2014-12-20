angular.module('vsREST').factory('tagRESTFactory',['$resource',function($resource){
	var url = '../mobile/tag';
	var actions = {
		addForMessage : {
			url : '../mobile/tag/add/:messageId/:tagId',
			method : 'get'
		},
		removeForMessage : {
			url : '../mobile/tag/delete/:messageId/:tagId',
			method : 'get'
		}
	};

	var tag = $resource(url,{},actions);

	return tag;
}]);