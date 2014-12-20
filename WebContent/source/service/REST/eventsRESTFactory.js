angular.module('vsREST').factory('eventsRESTFactory',['$resource',function($resource){
	var url = '../mobile/signup/findProject/:blogId';
    var actions = {
    	create : {
    		url : '../mobile/signup/addSignupProject',
    		method : 'post'
    	},
        projetList : {
            method : 'get'
        },
        update : {
        	method : 'post',
        	url : '../mobile/signup/updateSignupProject'
        },
        deleteProject : {
        	method : 'get',
        	url : '../mobile/signup/deleteProject/:id'
        },
        signupProject : {
        	method : 'post',
        	url : '../mobile/signup/signupProject'
        },
        queryAllSignList : {
        	method : 'get',
        	url : '../mobile/signup/signupListForCreator/:pid'
        },
        querySignList : {
        	method : 'get',
        	url : '../mobile/signup/signupListForUser/:pid'
        },
        queryDetailProject : {
        	method : 'get',
        	url : '../mobile/signup/projectDetail/:pid'
        }
    };
    
    var events = $resource(url,{},actions);
    
    return events;
}]);