'use strict';

angular.module('vsREST')

    .factory('userRESTFactory', ['$resource', function ($resource) {
        var url = '../mobile/webUser/show/:userId';
        var actions = {
            list: {
                url: '../mobile/webUser/userList',
                method: 'post',
                isArray : true
            },
            listByPage: {
            	url: '../mobile/webUser/userLists',//带分页
            	method: 'post'
            },
            userContacts: {
                method: 'post',
                url: '../mobile/webUser/userList'
            },
            updateUser: {
                method: 'post',
                url: '../mobile/webUser/updateUser'
            },
            getAttentionList: {
            	method: 'get',
            	url: '../mobile/webUser/getAttentionList',
            	isArray: true
            },
            validateUserName: {
                method: 'post',
                url: '../mobile/webUser/validateUserName'
            },
            updateUserImg : {
	    	 method : 'post',
	    	 url : '../mobile/webUser/updateUserImg'
	     	},
            findUserOrTeamByNameAndEmail: {
                method: 'post',
                url: '../mobile/account/user/findUser',
                isArray: true
            },
            findUserByNameAndEmail: {
                method: 'get',
                url: '../mobile/account/user/findAllUser/:searchKey',
                isArray: true
            },
            updatePwd: {
            	method: 'post',
            	url: '../mobile/account/user/updateSelfPasswd'
            },
            findUsersByIntegral: {
            	method: 'get',
            	url: '../mobile/webUser/findUsersByIntegral',
            	isArray: true
            },
            getAttentionListByPage: {
            	method: 'post',
            	url: '../mobile/webUser/getAttentionListByPage'
            },
            saveNickname: {
            	method: 'get',
            	url: '../mobile/webUser/saveNickname/:nickid/:nickname'
            },
            connectTest: {
            	method: 'post',
            	url: '../email/connectTest'
            },
            saveAccount: {
            	method: 'post',
            	url: '../email/saveAccount'
            },
            getEmailAccount: {
            	method: 'get',
            	url: '../email/getEmailAccount'
            }
        };

        var obj = $resource(url, {}, actions);

        return obj;

    }]);

