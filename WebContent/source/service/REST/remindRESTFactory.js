'use strict'

angular.module('vsREST')

.factory('remindRESTFactory', ['$resource','$cookies','chatDomain', function($resource,$cookies,chatDomain){
	var url = '';
	
	var actions = {
		allRemindCount : {
			url : '../mobile/remind/allRemindCount',
	        method : 'get'
	    },
	    myselfRemind : {
	    	url : '../mobile/remind/getMyselfRemindList',
	    	method : 'post'
	    },
	    commissionOrDeliverRemind : {
	    	url : '../mobile/remind/commissionOrDeliverRemind',
	    	method : 'post'
	    },
	    managerRemind : {
	    	url : '../mobile/remind/managerRemind',
	    	method : 'post'
	    },
	    teamRemind : {
	    	url : '../mobile/remind/getTeamRemindList',
	    	method : 'post'
	    },
	    setOneTypeMessageWasReaded : {
	    	url : '../mobile/remind/setOneMessageWasRead/:type',
	    	method : 'get'
	    },
	    setAllMessagesWereRead : {
	    	url : '../mobile/remind/setAllMessagesWereRead',
	    	method : 'get'
	    },
	    setOneRemindHasReaded : {
	    	url : '../mobile/remind/setOneRemindHasReaded/:id',
	    	method : 'get'
	    }
	    
	};
	var obj = $resource(url, {}, actions);
	
	return obj;
}])