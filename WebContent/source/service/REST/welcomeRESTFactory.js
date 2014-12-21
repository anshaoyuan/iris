angular.module('vsREST').factory('welcomeRESTFactory',['$resource',function($resource){
    var actions = {
        login : {
            url : '../weblogin',
            method : 'post'
        },
	    signup : {
		    url : '../register',
		    method : 'post'
	    },
	    getValidateCode : {
		    url : '../register/validateCode',
		    method : 'get'
	    },
	    sendValidateCodeToForget : {
		    url : '../register/forgotpw',
		    method : 'get'
	    },
	    resetpw : {
			url : '../register/resetpw',
		    method : 'post'
		},
        depList : {
            url : '../register/deptList',
            method : 'get',
            isArray : true
        }
    };

	var signin = $resource('/',{},actions);
	
	return signin;
}]);