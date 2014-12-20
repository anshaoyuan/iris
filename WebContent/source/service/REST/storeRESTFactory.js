angular.module('vsREST').factory('storeRESTFactory',['$resource',function($resource){
	var url = '../mobile/store/delete/:refType/:refId';
    var actions = {
    	create : {
    		url : '../mobile/store/create',
    		method : 'post'
    	},
        blogs: {
        	url: "../mobile/store/blogs",
        	method :'post'
        },
        questions : {
        	method : 'post',
        	url : '../mobile/store/questions'
        },
        deleteStore : {
        	method : 'get',
        	url :'../mobile/store/delete/:refType/:refId'
        }
    };
    
    var store = $resource(url,{},actions);
    
    return store;
}]);