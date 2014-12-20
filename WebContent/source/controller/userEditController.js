'use strict';

angular.module('vsController').controller('userEditController', ['$scope', 'userRESTFactory', 'alertBoxFactory', '$state', '$filter', function($scope, userRESTFactory, alertBoxFactory, $state, $filter){
	
	$scope.user={
			userName:''
	};
	
	userRESTFactory.get({userId : 0}, function(data) {
		$scope.user=data;
		$scope.deptList=data.deptList;
	});
	
	$scope.infoBtnDisabled = false;
	$scope.pwdBtnDisabled = false;
	
	$scope.subMark = false;
	$scope.userSub = function(){
		$scope.subMark = true;
		if($scope.userUpdateForm.$valid && $scope.userValidFlag){
			$scope.infoBtnDisabled = true;
			var birthday = '';
			if($scope.user.birthdayFormat != undefined && $scope.user.birthdayFormat != ''){
				birthday = $filter('date')($scope.user.birthdayFormat,'yyyy-MM-dd');
			}
			
			userRESTFactory.updateUser({
				"id" : $scope.user.id,
				"signature" : $scope.user.signature,
				"qq" : $scope.user.qq,
				"phoneNumber" : $scope.user.phoneNumber,
				"gender" : $scope.user.gender,
				"birthday" : birthday,
				"userName" : $scope.user.userName,
				"title" : $scope.user.title,
				"email" : $scope.user.email,
				"address" : $scope.user.address,
				"viewPhone" : $scope.user.viewPhone,
				"departmentId" : $scope.user.departmentId,
				"trueName" : $scope.user.trueName
			}, function(data){
				if(data.code == '10000'){
					$state.go('me_uid', {uid : 0}, {reload : true});
//					window.location.href="#/me/0";
				}
			});
		}
	}
	
	$scope.$watch('user.userName', function(){
		if($scope.user.userName.length < 2 || $scope.user.userName.length > 10){
			$scope.userUpdateForm.userName.$invalid=true;
			return;
		}
		
		userRESTFactory.validateUserName({
			"userName" : $scope.user.userName
		},function(data){
			if(data.result == 'false'){
				$scope.userValidFlag = false;
			}else{
				$scope.userValidFlag = true;
			}
		});
	});
	
	$scope.validPhone = function(){
		return {
			test : function(val){
				if(val == ''){
					return true;
				}
				var p1 = /^1((3\d)|(4[57])|(5[01256789])|(8\d))\d{8}$/;
				var result = p1.test(val);
				return result;
			}
		}
	}
	
	$scope.currTabType = '1';
	
	$scope.showEditUserInfoFn = function(){
		$scope.showEdit = true;
		$scope.showPwd = false;
		$scope.showBindEmail = false;
		$scope.currTabType = '1';
//		$scope.infoClass='active';
//		$scope.pwdClass='';
	}
	
	$scope.showUpdateUserPwdFn = function(){
		$scope.showEdit = false;
		$scope.showPwd = true;
		$scope.showBindEmail = false;
		$scope.currTabType = '2';
//		$scope.infoClass='';
//		$scope.pwdClass='active';
	}
	
	$scope.showBindMailFn = function(){
		$scope.showEdit = false;
		$scope.showPwd = false;
		$scope.showBindEmail = true;
		$scope.currTabType = '3';
		$scope.getEmailAccount();
	}
	
	$scope.showEditUserInfoFn();
	
	$scope.updateUserPwd = function(){
		if($scope.user.oldPwd == undefined
		|| $scope.user.newPwd == undefined
		|| $scope.user.repeatNewPwd == undefined
		|| $scope.user.oldPwd == ''
		|| $scope.user.newPwd == ''	
		|| $scope.user.repeatNewPwd == ''
		){
			alertBoxFactory('提交信息不完整!',{textAlign : 'center',width: 300});
			return;
		}
		
		if($scope.user.newPwd != $scope.user.repeatNewPwd){
			alertBoxFactory('2次密码不一致!',{textAlign : 'center',width: 300});
			return;
		}
		
		$scope.pwdBtnDisabled = true;
		
		userRESTFactory.updatePwd({
			"password" : $scope.user.oldPwd,
			"plainPassword" : $scope.user.newPwd,
			"id" : $scope.user.id
		}, function(data){
			if(data.code == '10000'){
				$state.go('me_uid', {uid : 0}, {reload : true});
//				window.location.href="#/me/0";
			}else{
				alertBoxFactory(data.msg,{textAlign : 'center',width: 350});
				$scope.pwdBtnDisabled = false;
			}
		});
	}
	
	$scope.mailValid = false;
	$scope.mailTestFlag = false;
	$scope.mailTestFn = function(){
		
		if(!validateMailInfo()){
			alertBoxFactory('请提交完整的邮箱资料!',{textAlign : 'center',width: 350});
			return;
		}
		
		$scope.mailTestFlag = true;
		userRESTFactory.connectTest({
			'id' : $scope.mailModel.id,
			'smtpHost' : $scope.mailModel.smtpHost,
			'smtpPort' : $scope.mailModel.smtpPort,
			'imapHost' : $scope.mailModel.imapHost,
			'imapPort' : $scope.mailModel.imapPort,
			'email' : $scope.mailModel.email,
			'password' : $scope.mailModel.password
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('验证成功!',{textAlign : 'center',width: 350});
				$scope.mailValid = true;
			}else{
				alertBoxFactory(data.msg,{textAlign : 'center',width: 350});
				$scope.mailTestFlag = false;
				$scope.mailValid = false;
			}
		});
	}
	
	$scope.mailSaveFlag = false;
	
	$scope.mailSaveFn = function(){
		
		if(!validateMailInfo()){
			alertBoxFactory('请提交完整的邮箱资料!',{textAlign : 'center',width: 350});
			return;
		}
		
		if(!$scope.mailValid){
			alertBoxFactory('请先验证邮箱服务!',{textAlign : 'center',width: 350});
			return;
		}
		$scope.mailSaveFlag = true;
		userRESTFactory.saveAccount({
			'id' : $scope.mailModel.id,
			'smtpHost' : $scope.mailModel.smtpHost,
			'smtpPort' : $scope.mailModel.smtpPort,
			'imapHost' : $scope.mailModel.imapHost,
			'imapPort' : $scope.mailModel.imapPort,
			'email' : $scope.mailModel.email,
			'password' : $scope.mailModel.password
		}, function(data) {
			if(data.code == '10000'){
				alertBoxFactory('保存成功!',{textAlign : 'center',width: 350});
				
				$state.go('users_edit', {}, {reload : true});
			}else{
				alertBoxFactory(data.msg,{textAlign : 'center',width: 350});
				$scope.mailSaveFlag = false;
			}
		});
	}
	
	function validateMailInfo(){
		if($scope.mailModel == undefined
		|| $scope.mailModel.smtpHost == ''
		|| $scope.mailModel.smtpPort == ''	
		|| $scope.mailModel.imapHost == ''	
		|| $scope.mailModel.imapPort == ''	
		|| $scope.mailModel.email == ''	
		|| $scope.mailModel.password == ''	
		){
			return false;
		}
		return true;
	}
	
	$scope.getEmailAccount = function(){
		userRESTFactory.getEmailAccount({}, function(data){
			$scope.mailModel = data;
		});
	}
	
}])