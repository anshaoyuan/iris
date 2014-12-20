angular.module('vsController').controller('signupController',['$scope','welcomeRESTFactory','alertBoxFactory','$interval',function($scope,welcomeRESTFactory,alertBoxFactory,$interval){
 	var sendValidateCodeTimer;
	$scope.register = {};

    welcomeRESTFactory.depList(function(data){
        $scope.depList = data;
    });

	$scope.signup = function(){
		if(!validate()) return;

		$scope.register.birthday = $scope.signupForm.birthday.$viewValue;
		$scope.register.phoneNumber = $scope.register.loginName;
        $scope.register.departmentId = $scope.register.department.id;
        delete $scope.register.department;
		$scope.submitting = true;

		welcomeRESTFactory.signup($scope.register,function(data){
			$scope.submitting = false;
			if(data && data.code != 10000){
				alertBoxFactory(data.msg,{width : 350,textAlign : 'center'});
			}else{
				alertBoxFactory('注册成功!',{width : 220,textAlign : 'center',type : 'success'});
				setTimeout(function(){
					window.location.href = '../login';
				},2000)
			}
		},function(){
			$scope.submitting = false;
			alertBoxFactory('网络异常!',{width : 250,textAlign : 'center'});
		});
	}

	$scope.getValidateCode = function(){
		if($scope.signupForm.loginName.$error.required){
			alertBoxFactory('请输入手机号!',{width: 250,textAlign: 'center'});
			return ;
		}

		if($scope.signupForm.loginName.$error.pattern){
			alertBoxFactory('手机号只能为数字!',{width: 250,textAlign: 'center'});
			return ;
		}

		$scope.sendValidateCode = true;
		var validateCodeText = $scope.validateCodeText;
		$scope.validateCodeText = '发送中...';

		welcomeRESTFactory.getValidateCode({
			phoneNumber : $scope.register.loginName
		},function(data){
			$scope.validateCodeText = validateCodeText;

			if(data && data.code != 10000){
				alertBoxFactory(data.msg,{width : 300,textAlign : 'center'});
				$scope.sendValidateCode = false;
			}else{
				alertBoxFactory('发送成功!',{width : 220,textAlign : 'center',type : 'success'});
				validateCodeTime();
			}
		},function(){
			alertBoxFactory('网络异常!',{width : 250,textAlign : 'center'});
			$scope.sendValidateCode = false;
			$scope.validateCodeText = validateCodeText;
		});
	}

	function validateCodeTime(){
		var validateCodeTick = 30;
		var validateCodeText = $scope.validateCodeText;
		sendValidateCodeTimer = $interval(function(){
			validateCodeTick--;
			$scope.validateCodeText = validateCodeTick + '秒后可重发';
			if(validateCodeTick == 0){
				$interval.cancel(sendValidateCodeTimer);
				$scope.sendValidateCode = false;
				$scope.validateCodeText = validateCodeText;
			}
		},1000,30);
		$scope.sendValidateCode = true;
	}

	function validate(){
		if($scope.signupForm.loginName.$error.required){
			$scope.validInfo = '请输入手机号!';
			return false;
		}

		if($scope.signupForm.loginName.$error.pattern){
			$scope.validInfo = '手机号只能为数字!';
			return false;
		}

		if($scope.signupForm.plainPassword.$error.required){
			$scope.validInfo = '请输入密码!';
			return false;
		}

		if($scope.signupForm.plainPassword.$error.pattern){
			$scope.validInfo = '密码长度必须在6-20位之间!';
			return false;
		}

		if($scope.register.plainPassword != $scope.repassword){
			$scope.validInfo = '两次输入的密码必须一致!';
			return false;
		}

		if($scope.signupForm.aliasName.$error.required){
			$scope.validInfo = '请输入昵称!';
			return false;
		}

		if($scope.signupForm.aliasName.$error.pattern){
			$scope.validInfo = '昵称长度必须在2-10位之间!';
			return false;
		}

        if($scope.signupForm.trueName.$error.required){
            $scope.validInfo = '请输入真实姓名!';
            return false;
        }

        if($scope.signupForm.trueName.$error.pattern){
            $scope.validInfo = '真实姓名长度必须在2-10位之间!';
            return false;
        }

        if(!_.isObject($scope.register.department)){
            $scope.validInfo = '请选择所属部门!';
            return false;
        }

		if($scope.signupForm.validateCode.$error.required){
			$scope.validInfo = '请输入验证码!';
			return false;
		}

		if($scope.signupForm.validateCode.$error.pattern){
			$scope.validInfo = '验证码长度必须是6位!';
			return false;
		}

		if($scope.signupForm.birthday.$error.pattern){
			$scope.validInfo = '生日格式格式错误，正确格式:1970-09-01!';
			return false;
		}

		if($scope.signupForm.address.$error.maxlength){
			$scope.validInfo = '所在地长度不能超过150个字符!';
			return false;
		}

		if($scope.signupForm.email.$error.email){
			$scope.validInfo = '电子邮件格式错误!';
			return false;
		}

		if($scope.signupForm.email.$error.maxlength){
			$scope.validInfo = '电子邮件长度不能超过150个字符!';
			return false;
		}

		$scope.validInfo = '';
		return true;
	}
}]);