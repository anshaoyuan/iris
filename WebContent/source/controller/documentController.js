'use strict'

angular.module('vsREST')

.controller('documentController', ['$scope', 'documentRestFactory', 'alertBoxFactory', '$cookies', '$stateParams', '$state', function($scope, documentRestFactory, alertBoxFactory, $cookies, $stateParams, $state){
	
	var type = $stateParams.type;
	$scope.teamid = $stateParams.teamid;
	
	if(type == 1){
		$scope.currTab = 'm';
	}else if(type == 2){
		$scope.currTab = 'p';
	}else if(type == 3){
		$scope.currTab = 't';
	}
	
	function showMyFolderFn(){
		$scope.showMyFolder = true;
		$scope.showSystemFolder = false;
		$scope.showTeamFolder = false;
		$scope.showCreateButton=true;
		publicModule();
		
	}
	function showPublicFolderFn(){
		$scope.showMyFolder = false;
		$scope.showSystemFolder = true;
		$scope.showTeamFolder = false;
		$scope.showCreateButton=false;
		publicModule();
	}
	function showTeamFolderFn(){
		$scope.showMyFolder = false;
		$scope.showSystemFolder = true;
		$scope.showTeamFolder = true;
		$scope.showCreateButton=false;
		publicModule();
	}
	
	function publicModule(){
		$scope.showUploadButton= false;
		$scope.showCreateFolderDiv = false;
		$scope.showUpdateFolderDiv = false;
		$scope.showFileList = false;
		$scope.addFolderBtnFlag = false;
		$scope.updateFolderBtnFlag =false;
	}
	
	$scope.showCreateDiv = function(){
		$scope.showCreateFolderDiv = true;
	}
	
	$scope.initMyFolderList = function(){
		showMyFolderFn();
		$scope.currFolderType = 'my';
		documentRestFactory.folderList({}, function(data){
			$scope.myFolders = data.userFolder;
//			$scope.systemFolders = data.adminFoler;
			
		})
	}
	
//	$scope.initMyFolderList();
	
	$scope.initSystemFolders = function(){
		$scope.currFolderType = 'system';
		showPublicFolderFn();
		documentRestFactory.folderList({}, function(data){
//			$scope.myFolders = data.userFolder;
			$scope.systemFolders = data.adminFoler;
			
		})
	}
	
	$scope.teamTabVisible = false;
	
	$scope.initTeamFolders = function(){
		showTeamFolderFn();
		documentRestFactory.findTeamFolders({
			"teamId" : $scope.teamid
		}, function(data){
			if(data.code == '10000'){
				var teamFolderList = new Array();
				teamFolderList.push(data.attachmentFolderVo);
				$scope.teamFolder = teamFolderList;
				$scope.isManager = data.isManager;
				$scope.teamTabVisible = true;
			}else{
				alertBoxFactory(data.msg, {textAlign : 'center',width: 440});
				$state.go('docs', {"type" : 1}, {reload : true});
				$scope.teamTabVisible = false;
			}
		});
	}
	
	$scope.delFolder = function(config,attr){
		documentRestFactory.delFolder({"folderId" : attr.folderid}, function(data) {
			if(data.code == '10000') {
				reflashFolderList();
				alertBoxFactory('删除成功!',{textAlign : 'center',width: 200});
				return;
			}
		})
	}
	
	$scope.addFolder = {};
	
	$scope.addFolder = function(){
		
		if($scope.addFolder.folderName == undefined || $scope.addFolder.folderName.trim().length == ''){
			alertBoxFactory('文件夹名称不能为空!',{textAlign : 'center',width: 300});
			return;
		}
		$scope.addFolderBtnFlag = true;
		documentRestFactory.addFolder({
			"folderName" : $scope.addFolder.folderName,
			"remark" : $scope.addFolder.remark
		}, function(data){
			if(data.code == '10000') {
				alertBoxFactory('添加成功!',{textAlign : 'center',width: 200});
				reflashFolderList();
			}else{
				$scope.addFolderBtnFlag = false;
				alertBoxFactory(data.msg,{textAlign : 'center',width: 200});
			}
		});
	}
	
	$scope.showFolder = function(folderId) {
		documentRestFactory.get({
			"folderId" : folderId
		}, function(data){
			$scope.folder = {
				id : data.id,
				folderName : data.folderName,
				remark : data.remark
			};
			$scope.showUpdateFolderDiv = true;
		});
	}
	
	$scope.folderUpdate = function(){
		if($scope.folder.folderName.trim() == ''){
			alertBoxFactory('文件夹名称不能为空!',{textAlign : 'center',width: 200});
			return;
		}
		$scope.updateFolderBtnFlag = true;
		documentRestFactory.updateFolder({
			"id" : $scope.folder.id,
			"folderName" : $scope.folder.folderName,
			"remark" : $scope.folder.remark
		}, function(data){
			if(data.code == '10000'){
				reflashFolderList();
			}else{
				$scope.updateFolderBtnFlag = false;
				alertBoxFactory(data.msg,{textAlign : 'center',width: 200});
			}
		})
	}
	
	$scope.initFileList = function(folderId){
		documentRestFactory.initFileList({"folderId" : folderId}, function(data){
			$scope.currFolderId = folderId;
			$scope.fileList = data;
			$scope.showFileList = true;
			if($scope.currFolderType == 'my'){
				$scope.showUploadButton = true;
			}else{
				$scope.showUploadButton = false;
			}
			$scope.showMyFolder = false;
			$scope.showCreateButton = false;
			$scope.showCreateFolderDiv = false;
			$scope.showUpdateFolderDiv = false;
			$scope.showSystemFolder = false;
			$scope.showTeamFolder = false;
			$scope.showDelBtn = $scope.currFolderType == 'my' ? true : false;
		});
	}
	
	$scope.delFile = function(config,attr){
		var folderId = $scope.currFolderId;
		var fileId = attr.fileid;
		documentRestFactory.delFile({
			"folderId" : folderId,
			"fileId" : fileId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('删除成功!',{textAlign : 'center',width: 200});
				for(var i=0; i< $scope.fileList.length; i++){
					var file = $scope.fileList[i];
					if(file.id == fileId){
						$scope.fileList.splice(i, 1);
						break;
					}
				}
				updateCover();
			}
		});
	}
	
	function reflashFolderList(){
		$scope.initMyFolderList();
		if($scope.showSystemFolder){
			$scope.initSystemFolders();
		}
	}
	

	$scope.fileUpload = {
		swf: '../public/image/uploadify.swf',
		fileObjName: 'fileUpload',
		uploader: '../uploadDocument',
		multi: false,
		fileTypeDesc : '请选择文件:*.DOC;*.XLS;*.PPT;*.TXT;*.DOCX;*.XLSX;*.PPTX',
		fileTypeExts : '*.DOC;*.XLS;*.PPT;*.TXT;*.DOCX;*.XLSX;*.PPTX',
		fileSizeLimit : '20MB',
		buttonClass : 'btn btn-default',
		width : 100,
		height : 33,
		buttonText: '上传附件',
		onUploadSuccess: function (file, data, response) {
			$scope.initFileList($scope.currFolderId);
		},
		onUploadStart : function(file) {
			$('#fileUpload').uploadify("settings",
					"formData", {
				'folderId' : $scope.currFolderId
			})
		}
	}
	
	function updateCover(){
		//更新封面
		documentRestFactory.updateFolderCover({"folderId" : $scope.currFolderId}, function(data) {});
	}
	
	if(type == 1){
		// 我的文件夹
		$scope.initMyFolderList();
	} else if(type == 2){
		//公共文件夹
		$scope.initSystemFolders();
	} else if(type == 3){
		//群组文件夹
		$scope.initTeamFolders();
	}
	
	$scope.changeTab = function (type) {
		$scope.searchSurfix = '';
		if(type == 1){
			//我的相册
			$state.go('docs', {"type" : 1}, {reload : true});
		}else if(type == 2){
			//公共相册
			$state.go('docs', {"type" : 2}, {reload : true});
		}else if(type == 3){
			//群组相册
			$state.go('docs', {"type" : 3, "teamid" : $scope.teamid}, {reload : true});
		}
	};
	
	$scope.downloadFile = function(fileId){
		window.location.href='../mobile/download/attach/downloadFile/'+fileId;
//		documentRestFactory.downloadFile({"fileId": fileId}, function(data){});
	}

}]);