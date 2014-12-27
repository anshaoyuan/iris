angular.module('vsREST').factory('blogCommentRESTFactory',['$resource',function($resource){
	var url = '../blogComment/comments/:blogId';
	var actions = {
			create : {
				url : '../blogComment/create',
				method : 'post'
			},
			deleteComment:{
				url : '../blogComment/delete/:id',
				method : 'get'
			},
			comments : {
				url : '../blogComment/comments/:blogId',
				method : 'get',
				isArray : true
			}
	};
	var comment = $resource(url,{},actions);
	return comment;
}]);