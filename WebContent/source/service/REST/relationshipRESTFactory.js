angular.module('vsREST').factory('relationshipRESTFactory',['$resource', function($resource){
	var url = '../mobile/relation/getAllRelationByMe';
    var actions = {
    		addRelation : {
    		url : '../mobile/relation/addRelation/:otherUserId',
    		method : 'get'
    	},
    	cancelRelation : {
        	url : '../mobile/relation/cancelRelation/:otherUserId',
            method : 'get'
        },
        getAllRelationByOtherUser : {
        	method : 'get',
        	url : '../mobile/relation/getAllRelationByOtherUser'
        },
        findOnlyRelationship : {
        	method : 'get',
        	url : '../mobile/relation/findOnlyRelationship/:otherUserId'
        }
    };
   
    var relationByMe = $resource(url,{},actions);
    return relationByMe;
}]);