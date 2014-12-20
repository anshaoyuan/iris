'use strict';

angular.module('vsController')

.controller('userImgController', ['$scope', 'userRESTFactory', 'alertBoxFactory', '$state', 
                                  function($scope, userRESTFactory, alertBoxFactory, $state){
	$scope.afterUpload = false;
	
	$scope.fileUpload = {
        swf: '../public/image/uploadify.swf',
        fileObjName: 'fileUpload',
        uploader: '../uploadUserImg',
        multi: false,
        fileTypeDesc : '请选择图片文件',
        fileTypeExts : '*.BMP;*.JPEG;*.JPG;*.GIF;*.PNG',
        fileSizeLimit : '1MB',
        buttonClass : 'btn btn-default',
        width : 100,
        height : 33,
        buttonText: '上传头像',
        onUploadSuccess: function (file, data, response) {
        	var imgArray = data.split(';');
        	$scope.userImg = '..'+imgArray[0];
        	$scope.userImage = imgArray[1];
        	var lastSlashIndex = $scope.userImg.lastIndexOf('.');
        	$scope.userHeadImgFileType = $scope.userImg.substring(lastSlashIndex +1);
        	$scope.afterUpload = true;
        	$scope.$digest();
        }
    }
	
	$scope.userImgOption = {};
	
	$scope.updateImageFlag = false;
	
	$scope.saveUserImg = function(){
		$scope.updateImageFlag = true;
		userRESTFactory.updateUserImg({
			'x' : $scope.userImgOption.x,
			'y' : $scope.userImgOption.y,
			'w' : $scope.userImgOption.w,
			'h' : $scope.userImgOption.h,
			'filePath' : $scope.userImg,
			'fileType' : $scope.userHeadImgFileType,
			'userImage' : $scope.userImage
		}, function(data){
			if(data.code=='10000') {
				alertBoxFactory('更新成功',{textAlign : 'center',width: 200});
				$state.go('me_uid', {uid : 0}, {reload : true});
//				window.location.href="#/me/0";
			}else{
				$scope.updateImageFlag = false;
			}
		});
	}
	
	
}]);