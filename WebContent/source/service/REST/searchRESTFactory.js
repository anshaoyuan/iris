angular.module('vsREST').factory('searchRESTFactory',['$resource', function($resource){
	var url = '../searchengine/query';
    var actions = {
        list : {
        	url : '../searchengine/query',
            method : 'post'
        }
    };
   
    var list = $resource(url,{},actions);
    
    return list;
}]);