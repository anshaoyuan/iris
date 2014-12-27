angular.module('vsService').factory('sessionInterceptorFactory',['alertBoxFactory','sessionInvalidWhiteList',function(alertBoxFactory,sessionInvalidWhiteList){
	var showPanel = false;

	function fn(value){

		if(angular.isArray(sessionInvalidWhiteList)){
			for(var i = 0;i < sessionInvalidWhiteList.length;i++){
				if(value.config.url.indexOf(sessionInvalidWhiteList[i]) != -1){
					return value;
				}
			}
		}

		if(value.headers('sessionInvalid') && !showPanel){
			showPanel = true;
			alertBoxFactory('当前网页会话已失效，5秒后自动跳转到登陆页!',{
				width : 420,
				textAlign : 'center'
			});
			setTimeout(function(){
				window.location.href = '../public/signin.html';
			},5000);
		}
		return value;
	}

	return {
		response : fn
	}
}]);