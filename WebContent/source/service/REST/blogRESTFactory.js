angular.module('vsREST').factory('blogRESTFactory',['$resource',function($resource){
	var url = '../mobile/blog/:blogId';
    var actions = {
    	create : {
    		url : '../mobile/blog/create',
    		method : 'post'
    	},
        list : {
            method : 'get'
        },
        blogs: {
        	url: "../mobile/blog/blogs",
        	method :'post'
        },
        update : {
        	method : 'post',
        	url : '../mobile/blog/update'
        },
        initUserBlog : {
        	method : 'post',
        	url :'../mobile/blog/blogs'
        },
        hotBlogs : {
        	method : 'get',
        	url : '../mobile/blog/hotBlog/:pageNumber',
        	isArray :true
        },
        deleteBlog : {
        	method : 'get',
        	url : '../mobile/blog/delete/:id'
        },
        blogMention : {
        	method : 'get',
        	url : '../mobile/blog/mentionBlog/:id'
        }
    };
    
    var blog = $resource(url,{},actions);
    
    return blog;
}]);