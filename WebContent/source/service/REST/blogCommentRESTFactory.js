angular.module('vsREST').factory('blogCommentRESTFactory',['$resource',function($resource){
	var url = '../mobile/blogComment/comments/:blogId';
	var actions = {
			create : {
				url : '../mobile/blogComment/create',
				method : 'post'
			},
			deleteComment:{
				url : '../mobile/blogComment/delete/:id',
				method : 'get'
			},
			comments : {
				url : '../mobile/blogComment/comments/:blogId',
				method : 'get',
				isArray : true
			}
	};
	var comment = $resource(url,{},actions);
	return comment;
}]);