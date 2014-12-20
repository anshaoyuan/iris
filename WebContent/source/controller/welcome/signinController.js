angular.module('vsController')
    .controller('signController',
        ['$scope','welcomeRESTFactory','alertBoxFactory','$cookies',
            function($scope,welcomeRESTFactory,alertBoxFactory,$cookies){
	$scope.isSubmit = false;
	$scope.password = '';
    $scope.remember = true;

    if($cookies.lastLoginName){
        $scope.username = $cookies.lastLoginName;
    }

    $scope.login = function(){
	    $scope.signinForm.username.refreshValue();
	    $scope.signinForm.password.refreshValue();

        if($scope.signinForm.$invalid){
            if($scope.signinForm.username.$error.required){
	            alertBoxFactory('登录名不能为空!',{width:300,textAlign : 'center'});
            }else if($scope.signinForm.password.$error.required){
	            alertBoxFactory('密码不能为空!',{width:300,textAlign : 'center'});
            }
            return;
        }

	    $scope.isSubmit = true;
        welcomeRESTFactory.login({
            username : $scope.username,
            password : $scope.password
        },function(result){
	        $scope.isSubmit = false;
			if(result && result.code == '10000'){
                if($scope.remember){
                    $cookies.lastLoginName = $scope.username;
                }
                window.location.href = 'mobile/index' ;
			}else{
				alertBoxFactory(result.msg,{width : 400,textAlign: 'center'});
			}
		},function(){
	        alertBoxFactory('网络异常!',{width : 230,textAlign: 'center'});
	        $scope.isSubmit = false;
        });
	}

}]);
    
