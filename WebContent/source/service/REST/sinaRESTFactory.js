'use strict';

angular.module('vsController')

	.factory('sinaRESTFactory', ['$resource', function ($resource) {
	
		var url = '';
		
		var actions = {
	            validateSina: {
	            	method: 'get',
	            	url: '../mobile/sina/validateSina'
	            },
	            sinaList: {
	            	method: 'post',
	            	url: '../mobile/sina/initList'
	            },
	            changeSinaType: {
	            	method: 'get',
	            	url: '../mobile/sina/changeFirstPageType/:type'
	            },
	            processSinaBlogImg: {
	            	method: 'post',
	            	url: '../mobile/sina/processSinaBlogImg'
	            }
	        };

	        var obj = $resource(url, {}, actions);

	        return obj;
		
}]);