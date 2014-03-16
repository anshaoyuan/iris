angular.module('hello',[]);

var app = angular.module('hello').run(function(tan){
	//alert("haha:"+tan);
	
});

app.value('tan','sb');

app.controller('helloCtrl2',function($scope,$http){
	$scope.getData = function(){
		$http({url:'http://localhost:8080/iris/user/mapping/produces',
			method:'post'}).success(function(data){
				alert(data);
			});
	}
});
app.controller('tanzq',function($scope,$compile){
	$scope.user = {
		name:"小王",
		alais:"王波",
		gender:"mafale",
		age:18,
		education:"xx",
		hobby:{sport:true,travel:false},
		homePage:"www.baidu.com",
		email:"wangbo@wbd.com",
		describe:"我是来酱油的"
	};
	$scope.subMark=false;
	
	$scope.sub = function(){
		$scope.subMark = true;
		if($scope.userForm.$valid){
			alert("tess");
		}
	}
	$scope.title = "吃饭";
	$scope.imgs=["test.jpg","aa.jpg"];
	$scope.$watch('title',function(newVal,oldVal,scope){
		console.log('title change');
	});
	
});

app.filter('f1',function(){
	return function(str,num){
		var words = str.split(/\b\s/);
		var resultStr = '';
		var i = 0;
		angular.forEach(words,function(str){
			i++;
			if(i <= num){
				resultStr += str.charAt(0);
			}
			
		});
		return resultStr;
	}
	
});
app.directive('myModel',function(){
	return {
		restrict : 'A',
		link :function(scope,element,attr){
			scope.$watch(attr['myModel'],function(newVal){
				element[0].value = newVal;
			});
			
			element.on('keyup',function(){
				scope.$apply(function(){
					scope[attr['myModel']] = element[0].value;
					
				});
				
			});
		}
	}
});


app.directive('imagePanel',function(){
	return {
		restrict :'E',
		template : '<img>',
		replace : true,
		scope :{'imgList':'='},
		link :function(scope,element,attr){
			var i = 0;
			setInterval(function(){
				element[0].src = scope.imgList[i];
				i++;
				if(i== scope.imgList.length){
					i = 0;
				}
			},1000);
		}
	}
});
