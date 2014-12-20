'use strict'

angular.module('vsREST')

.factory('imageRESTFactory', ['$resource', function($resource){
	var url = '../mobile/webUser/show/:userId';
	var actions = {
			myfolder : {
				method : 'get',
				url : '../mobile/imageFolder/myfolder/:userId'
			},
			sysFolder: {
				method : 'post',
				url : '../mobile/imageFolder/queryfolder'
			},
			imageList: {
				method : 'get',
				url : '../mobile/imageFolder/findImageFolderById/:folderId'
			},
			delImage: {
				url : '../mobile/imageFolder/deleteImage',
				method : 'post',
			},
			showImageFolder : {
				url : '../mobile/imageFolder/findImageFolderById/:folderId',
				method : 'get',
			},
			updateImageFolder : {
				url : '../mobile/imageFolder/updateImageFolder',
				method : 'post'
			},
			delImageFolder : {
				url : '../mobile/imageFolder/deleteImageFolder/:folderId',
				method : 'get',
			},
			addFolder : {
				url : '../mobile/imageFolder/addImageFolder',
				method : 'post'
			},
			updateImageFolderCover : {
				url : '../mobile/imageFolder/updateImageFolderCover/:folderId',
				method : 'get'
			},
			findImageById : {
				url : '../mobile/imageFolder/findImageById/:imageId',
				method : 'get'
			},
			findTeamImageFolder: {
				url : '../mobile/imageFolder/findTeamImageFolder/:teamId',
				method : 'get'
			}
	};
	
	var obj = $resource(url,{},actions);
    
    return obj;
	
}]);