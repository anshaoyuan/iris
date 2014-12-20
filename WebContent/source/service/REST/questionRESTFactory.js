angular.module('vsREST').factory('questionRESTFactory',['$resource', function($resource){
	var url = '../mobile/question/questionOne/:id';
    var actions = {
    	create : {
    		url : '../mobile/question/create',
    		method : 'post'
    	},
        list : {
        	url : '../mobile/question/question',
            method : 'post'
        },
        update : {
        	method : 'post',
        	url : '../mobile/question/update'
        },
        hotList : {
        	method : 'post',
        	url : '../mobile/question/hotQuestion',
        },
        unAnswerList : {
        	method : 'post',
        	url : '../mobile/question/unAnswerQuestion',
        },
        questionMention : {
        	method : 'get',
        	url : '../mobile/question/mentionQuestion/:id'
        },
        deleteQ : {
        	method : 'get',
        	url : '../mobile/question/delete/:id'
        },
        askQuestion : {
        	method : 'post',
        	url : '../mobile/question/askUser'
        }
    };
   
    var questions = $resource(url,{},actions);
    
    return questions;
}]);