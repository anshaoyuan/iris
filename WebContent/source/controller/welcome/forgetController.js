angular.module('vsController').controller('forgetController',
	['$scope', 'welcomeRESTFactory', 'alertBoxFactory', '$interval',
		function ($scope, welcomeRESTFactory, alertBoxFactory, $interval) {

			$scope.sub = function () {
				if (!validate()) return;

				$scope.submitting = true;
				welcomeRESTFactory.resetpw({
					loginName: $scope.loginName,
					plainPassword: $scope.plainPassword,
					validateCode: $scope.validateCode
				}, function (data) {
					$scope.submitting = false;
					if (data && data.code != 10000) {
						alertBoxFactory(data.msg, {width: 300, textAlign: 'center'});
					} else {
						alertBoxFactory('成功修改密码!', {width: 220, textAlign: 'center', type: 'success'});
						setTimeout(function () {
							window.location.href = '../login';
						}, 2000)
					}
				}, function () {
					$scope.submitting = false;
					alertBoxFactory('网络异常!', {width: 250, textAlign: 'center'});
				});
			}
			var sendValidateCodeTimer;
			$scope.getValidateCode = function () {
				if ($scope.forgetForm.loginName.$error.required) {
					alertBoxFactory('请输入手机号!', {width: 250, textAlign: 'center'});
					return;
				}

				if ($scope.forgetForm.loginName.$error.pattern) {
					alertBoxFactory('手机号只能为数字!', {width: 250, textAlign: 'center'});
					return;
				}

				$scope.sendValidateCode = true;
				var validateCodeText = $scope.validateCodeText;
				$scope.validateCodeText = '发送中...';

				welcomeRESTFactory.sendValidateCodeToForget({
					loginName: $scope.loginName
				}, function (data) {
					$scope.validateCodeText = validateCodeText;

					if (data && data.code != 10000) {
						alertBoxFactory(data.msg, {width: 600, textAlign: 'center'});
						$scope.sendValidateCode = false;
					} else {
						alertBoxFactory('发送成功!', {width: 220, textAlign: 'center', type: 'success'});
						validateCodeTime();
					}
				}, function () {
					alertBoxFactory('网络异常!', {width: 250, textAlign: 'center'});
					$scope.sendValidateCode = false;
					$scope.validateCodeText = validateCodeText;
				});
			}

			function validateCodeTime() {
				var validateCodeTick = 30;
				var validateCodeText = $scope.validateCodeText;
				sendValidateCodeTimer = $interval(function () {
					validateCodeTick--;
					$scope.validateCodeText = validateCodeTick + '秒后可重发';
					if (validateCodeTick == 0) {
						$interval.cancel(sendValidateCodeTimer);
						$scope.sendValidateCode = false;
						$scope.validateCodeText = validateCodeText;
					}
				}, 1000, 30);
				$scope.sendValidateCode = true;
			}

			function validate() {
				if ($scope.forgetForm.loginName.$error.required) {
					$scope.validInfo = '请输入手机号!';
					return false;
				}

				if ($scope.forgetForm.loginName.$error.pattern) {
					$scope.validInfo = '手机号只能为数字!';
					return false;
				}

				if ($scope.forgetForm.validateCode.$error.required) {
					$scope.validInfo = '请输入验证码!';
					return false;
				}

				if ($scope.forgetForm.validateCode.$error.pattern) {
					$scope.validInfo = '验证码长度必须是6位!';
					return false;
				}

				if ($scope.forgetForm.plainPassword.$error.required) {
					$scope.validInfo = '请输入密码!';
					return false;
				}

				if ($scope.forgetForm.plainPassword.$error.pattern) {
					$scope.validInfo = '密码长度必须在6-20位之间!';
					return false;
				}

				if ($scope.plainPassword != $scope.repassword) {
					$scope.validInfo = '两次输入的密码必须一致!';
					return false;
				}

				$scope.validInfo = '';
				return true;
			}
		}]);