angular.module('vsREST').factory('blogRESTFactory',['$resource',function($resource){
	var url = '../blog/:blogId';
    var actions = {
    	create : {
    		url : '../blog/create',
    		method : 'post'
    	},
        list : {
            method : 'get'
        },
        blogs: {
        	url: "../blog/blogs",
        	method :'post'
        },
        update : {
        	method : 'post',
        	url : '../blog/update'
        },
        initUserBlog : {
        	method : 'post',
        	url :'../blog/blogs'
        },
        hotBlogs : {
        	method : 'get',
        	url : '../blog/hotBlog/:pageNumber',
        	isArray :true
        },
        deleteBlog : {
        	method : 'get',
        	url : '../blog/delete/:id'
        },
        blogMention : {
        	method : 'get',
        	url : '../blog/mentionBlog/:id'
        }
    };
    
    var blog = $resource(url,{},actions);
    
    return blog;
}]);