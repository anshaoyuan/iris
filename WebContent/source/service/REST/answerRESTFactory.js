angular.module('vsREST').factory('answerRESTFactory',['$resource',function($resource){
	var url = '../mobile/answer/answer/:questionId';
	var actions = {
			create : {
				url : '../mobile/answer/create',
				method : 'post'
			},
			deleteAnswer:{
				url : '../mobile/answer/delete/:id',
				method : 'get'
			},
			answers : {
				url : '../mobile/answer/answer/:questionId',
				method : 'get',
				isArray : true
			},
			solutionQuestion : {
				url : '../mobile/answer/solutionQuestion/:answerId',
				method : 'get'
			},
			metionAnswer : {
				url : '../mobile/answer/mentionAnswer/:id',
				method : 'get'
			}
	};
	var answer = $resource(url,{},actions);
	return answer;
}]);