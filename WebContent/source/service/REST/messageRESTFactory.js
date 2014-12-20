angular.module('vsREST').factory('messageRESTFactory',['$resource',function($resource){
    var url = '../mobile/stream/:id';

    var actions = {
        all : {
            url : '../mobile/search/stream/all',
            method : 'post',
            isArray : true
        },
	    toMyself : {
		    url : '../mobile/search/stream/toMyself/:type',
		    method : 'post'
	    },
	    toMe : {
		    url : '../mobile/search/stream/toMe/:type',
		    method : 'post'
	    },
	    fromMe : {
		    url : '../mobile/search/stream/fromMe/:type',
		    method : 'post'
	    },
	    myTeam : {
		    url : '../mobile/search/stream/myTeam/:type',
		    method : 'post'
	    },
	    draft : {
		    url : '../mobile/search/stream/draft',
		    method : 'post',
		    isArray : true
	    },
	    publish : {
		    url : '../mobile/stream/new',
		    method : 'post'
	    },
	    del : {
		    url : '../mobile/stream/delete/:id',
		    method : 'get'
	    },
	    setRead : {
		    url : '../mobile/stream/isRead/:id',
		    method : 'get'
	    },
	    search : {
		    url : '../mobile/search/stream/list',
		    method : 'post'
	    },
	    session : {
		    url : '../mobile/stream/returnList/:titleId/:id',
		    method : 'get',
		    isArray : true
	    }
    };

    var message = $resource(url,{},actions);

    return message;
}]);
