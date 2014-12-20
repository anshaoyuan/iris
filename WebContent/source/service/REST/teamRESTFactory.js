angular.module('vsREST').factory('teamRESTFactory',['$resource',function($resource){
	var url = '../mobile/team/findTeamDetail/:id';
    var actions = {
    	create : {
    		url : '../mobile/team/addteam',
    		method : 'post'
    	},
        list : {
        	url : '../mobile/team/findTeams',
            method : 'post'
        },
        myTeams : {
        	url : '../mobile/team/findUserTeams',
        	method : 'post'
        },
        allTeams : {
        	url : '../mobile/team/getAllTeamForWeb',
        	method : 'post'
        },
        update : {
        	method : 'post',
        	url : '../mobile/team/updateTeamInfo'
        },
        deleteTeam : {
        	url : '../mobile/team/deleteTeam/:id',
        	method : 'get'
        },
        addMember : {
        	url : '../mobile/team/addMember',
        	method : 'post'
        },
        updateTeamcreater : {
        	url : '../mobile/team/updateTeamcreater',
        	method : 'post'
        },
        queryTeamMembers : {
        	url : '../mobile/team/queryTeamMembers/:id',
        	method : 'get'
        },
        deleteMember : {
        	url : '../mobile/team/deleteMember',
        	method : 'post'
        },
        findRelealseTeam : {
        	url : '../mobile/team/findRelealseTeam',
        	method : 'get'
        },
        checkTeamName : {
        	url : "../mobile/team/checkTeamNameIsExist",
        	method : 'post'
        }
    };
    
    var team = $resource(url,{},actions);
    
    return team;
}]);