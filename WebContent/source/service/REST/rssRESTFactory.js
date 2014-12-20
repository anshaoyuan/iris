'use strict'

angular.module('vsREST')

.factory('rssRESTFactory', ['$resource', function($resource){
	var url = '';
	
	var actions = {
		rssList : {
			url : '../mobile/rss/rssList',
	        method : 'get',
	        isArray:true
	    },
	    validateRss : {
	    	url : '../mobile/rss/checkRss',
	        method : 'post'
	    },
	    addRss : {
	    	url : '../mobile/rss/addRss',
	        method : 'post'
	    },
	    viewRss : {
	    	url : '../mobile/rss/viewRss',
	        method : 'post',
	        isArray:true
	    },
	    delRss : {
	    	url : '../mobile/rss/delRss',
	        method : 'post'
	    }
	}
	
	var obj = $resource(url, {}, actions);
	
	return obj;
}]);