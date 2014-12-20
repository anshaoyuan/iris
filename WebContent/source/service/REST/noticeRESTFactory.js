'use strict'

angular.module('vsREST')

.factory('noticeRestFactory', ['$resource', function($resource){
	var url = '';
	var actions = {
		noticeList : {
			url : '../mobile/notice/list',
			method : 'get',
			isArray : true
		}
	};
	
	var obj = $resource(url,{},actions);
    
    return obj;
	
}]);