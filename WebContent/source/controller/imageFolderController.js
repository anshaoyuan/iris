'use strict';

angular.module('vsREST')

.controller('imageFolderController', ['$scope', 'imageRESTFactory', 'alertBoxFactory', '$cookies', '$state','$stateParams', '$location', 
                                      function($scope, imageRESTFactory, alertBoxFactory, $cookies, $state, $stateParams, $location){
	
	var uid = $cookies.userId;
	
	var type = $stateParams.type;
	$scope.teamid = $stateParams.teamid == undefined ? 0 : $stateParams.teamid;
	
	$scope.itemsPerPage = 10;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	
	if(type == 1){
		$scope.currTab = 'm';
	}else if(type == 2){
		$scope.currTab = 'p';
	}else if(type == 3){
		$scope.currTab = 't';
	}
	
	function showMyFolderFn(){
		$scope.showMyFolderAndBtn = true;
		$scope.showSystemFolder = false;
		$scope.showTeamImageFolder = false;
		$scope.showCreateButton=true;
		publicModule();
	}
	
	function showPublicFolderFn(){
		$scope.showMyFolderAndBtn = false;
		$scope.showSystemFolder = true;
		$scope.showTeamImageFolder = false;
		$scope.showCreateButton=false;
		publicModule();
	}
	
	function publicModule(){
		$scope.showUploadButton= false;
		$scope.showCreateFolderDiv = false;
		$scope.showUpdateFolderDiv = false;
		$scope.showFileList = false;
		$scope.addFolderBtnFlag =false;
		$scope.updateFolderBtnFlag =false;
	}
	
	function initMyFolders() {
		showMyFolderFn();
		imageRESTFactory.myfolder({"userId" : uid}, 
			function(data){
			$scope.myFolders = data.folders;
		});
	}
	
	$scope.showCreateDiv = function(){
		$scope.showCreateFolderDiv = true;
	};

	function initSystemFolders() {
		showPublicFolderFn();
		imageRESTFactory.sysFolder({"folderType":"1"}, 
			function(data){
			$scope.systemFolders = data.folders;
		});
	}
	
	function showTeamImageFolderFn(){
		$scope.showMyFolderAndBtn = false;
		$scope.showSystemFolder = false;
		$scope.showTeamImageFolder = true;
		publicModule();
	}
	
	$scope.teamTabVisible = false;
	
	function initTeamImageFolder() {
		showTeamImageFolderFn();
		imageRESTFactory.findTeamImageFolder({
			"teamId" : $scope.teamid
		}, function(data){
			if(data.code == '10000'){
				var teamFolderList = new Array();
				teamFolderList.push(data.imageFolderVo);
				$scope.teamImageFolder = teamFolderList;
				$scope.isManager = data.isManager;
				$scope.teamTabVisible = true;
			}else{
				alertBoxFactory(data.msg, {textAlign : 'center',width: 440});
				$state.go('pics', {"type" : 1}, {reload : true});
				$scope.teamTabVisible = false;
			}
		});
	}
	
	$scope.changeTab = function (type) {
		if(type == 1){
			//我的相册
			$state.go('pics', {"type" : 1}, {reload : true});
		}else if(type == 2){
			//公共相册
			$state.go('pics', {"type" : 2}, {reload : true});
		}else if(type == 3){
			//群组相册
			$state.go('pics', {"type" : 3, "teamid" : $scope.teamid}, {reload : true});
		}
	};
	
	$scope.initImageList = function(folderId){
		imageRESTFactory.imageList({"folderId" : folderId}, function(data){
			$scope.currFolderId = data.imageFolder.id;
			$scope.imageList = data.imageFolder.imageList;
			if($scope.currTab == 'm'){
				$scope.showUploadButton = true;
			}else{
				$scope.showUploadButton = false;
			}
			$scope.showFileList = true;
			$scope.showMyFolderAndBtn = false;
			$scope.showSystemFolder = false;
			$scope.showCreateButton = false;
			$scope.showTeamImageFolder = false;
			$scope.showCreateFolderDiv = false;
			$scope.showUpdateFolderDiv = false;
			$scope.showDelBtn = ($scope.currTab == 'm') ? true : false;
		});
	};
	
	$scope.delImg = function(config, attr){
		var imageId= attr.imageid;
		var folderId = attr.folderid;
		imageRESTFactory.delImage({
			"folderId" : folderId,
			"imageId" : imageId
		}, function(data){
			if(data.code == '10000'){
				for(var i=0; i< $scope.imageList.length; i++){
					var image = $scope.imageList[i];
					if(image.id == imageId){
						$scope.imageList.splice(i, 1);
						break;
					}
				}
				alertBoxFactory('删除成功!',{textAlign : 'center',width: 200});
				updateCover();
			}
		});
	};
	
	$scope.showImageFolder = function(folderId) {
		imageRESTFactory.showImageFolder({
			"folderId" : folderId
		}, function(data){
			$scope.imageFolder = {
				id : data.imageFolder.id,
				folderName : data.imageFolder.folderName
			};
			
			$scope.showUpdateFolderDiv = true;
		});
	};
	
	$scope.imageFolderUpdate = function(){
		if($scope.imageFolder.folderName.trim() == ''){
			alertBoxFactory('相册名称不能为空!',{textAlign : 'center',width: 200});
			return;
		}
		$scope.updateFolderBtnFlag = true;
		imageRESTFactory.updateImageFolder({
			"id" : $scope.imageFolder.id,
			"folderName" : $scope.imageFolder.folderName
		}, function(data){
			if(data.code == '10000'){
				$scope.updateFolderBtnFlag = false;
				alertBoxFactory('更新成功!',{textAlign : 'center',width: 200});
				reflashImageFolder();
			}else{
				$scope.updateFolderBtnFlag = false;
				alertBoxFactory('更新失败,请联系管理员!',{textAlign : 'center',width: 200});
			}
		});
	};
	
	$scope.delImageFolder = function(config,attr) {
		imageRESTFactory.delImageFolder({"folderId" : attr.folderid}, function(data){
			if(data.code== '10000') {
				alertBoxFactory('删除成功!',{textAlign : 'center',width: 200});
				reflashImageFolder();
			}
		});
	};
	
	function reflashImageFolder(){
		if($scope.showMyFolderAndBtn){
			initMyFolders();
		}else{
			initSystemFolders();
		}
	}
	
	$scope.addFolder = function(){
		
		if($scope.addFolder.folderName == undefined || $scope.addFolder.folderName.trim().length == ''){
			alertBoxFactory('相册名称不能为空!',{textAlign : 'center',width: 300});
			return;
		}
		$scope.addFolderBtnFlag = true;
		imageRESTFactory.addFolder({
			"folderName" : $scope.addFolder.folderName,
			"folderType" : "3"
		}, function(data){
			if(data.code == '10000') {
				alertBoxFactory('添加成功!',{textAlign : 'center',width: 200});
				reflashImageFolder();
			}else{
				$scope.addFolderBtnFlag = false;
				alertBoxFactory(data.msg,{textAlign : 'center',width: 200});
			}
		});
	};
	
	$scope.fileUpload = {
            swf: '../public/image/uploadify.swf',
            fileObjName: 'fileUpload',
            uploader: '../ajaxupload',
            multi: false,
            fileTypeDesc : '请选择图片文件',
            fileTypeExts : '*.BMP;*.JPEG;*.JPG;*.GIF;*.PNG',
            fileSizeLimit : '5MB',
            buttonClass : 'btn btn-default',
            width : 100,
            height : 33,
            buttonText: '上传图片',
            onUploadSuccess: function (file, data, response) {
            	$scope.initImageList($scope.currFolderId);
            },
			onUploadStart : function(file) {
				$('#fileUpload').uploadify("settings",
					"formData", {
						'folderId' : $scope.currFolderId
				});
			}
	};
	
	function updateCover(){
		//更新相册封面
    	imageRESTFactory.updateImageFolderCover({"folderId" : $scope.currFolderId}, function(data) {});
	}
	
	$scope.shareImage = function(image) {
		var url = '/articles/new?pid=' + image.id;
		$location.url(url);
//		$state.go(url, {}, {reload : true});
	};
	
	$scope.transImage = function(image) {
		var url = '/new?photo=' + image.absoluteImagePath + '&photoid=' + image.id;
		$location.url(url);
//		$state.go(url, {}, {reload : true});
	};
	
	if(type == 1){
		//个人相册
		initMyFolders();
	} else if(type == 2) {
		//系统相册
		initSystemFolders();
	} else if(type == 3){
		//群组相册
		initTeamImageFolder();
	}
	
}])



;