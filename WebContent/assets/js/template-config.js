var app = angular.module('consoleApp', []);

app.config(function(){
	console.log('---config---');
});

app.controller('menuCtrl', function($scope,$http) {
	
	$scope.getData = function(){
		$http({ url:sysPath+'/console/menu/header',method:'get'}).success(function(data){
			$scope.menus= data;
		}).error(function(){
			console.log('error!');
		});
	};	
	
	$scope.getData();

});

app.controller('templateConsoleCtrl', function($scope,$http) {
	$scope.deleteTemplate = function(templateId) {
		$http({ url:sysPath+'/console/template/deleteTemplate/' + templateId,method:'get'}).success(function(data){
			alert('删除成功!');
			
			window.location.reload();
		}).error(function(){
			console.log('error!');
		});
	};

});


