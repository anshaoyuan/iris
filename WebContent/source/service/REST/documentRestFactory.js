'use strict'

angular.module('vsREST')

.factory('documentRestFactory', ['$resource', function($resource){
	var url = '../mobile/document/showFolder/:folderId';
	var actions = {
		folderList : {
			url : '../mobile/document/folderList',
			method : 'get'
		},
		delFolder : {
			url : '../mobile/document/delFolder/:folderId',
			method : 'get'
		},
		addFolder : {
			url : '../mobile/document/addFolder',
			method : 'post'
		},
		updateFolder : {
			url : '../mobile/document/updateFolder',
			method : 'post'
		},
		initFileList: {
			url : '../mobile/document/fileList/:folderId',
			method : 'get',
			isArray : true
		},
		delFile : {
			url : '../mobile/document/delFile/:folderId/:fileId',
			method : 'get'
		},
		updateFolderCover : {
			url : '../mobile/document/updateFolderCover/:folderId',
			method : 'get'
		},
		findTeamFolders:{
			url : '../mobile/document/findTeamFolders/:teamId',
			method : 'get'
		},
		downloadFile:{
			url : '../mobile/download/attach/downloadFile/:fileId',
			method : 'get'
		}
	}
	
	var obj = $resource(url,{},actions);
    
    return obj;
	
}]);