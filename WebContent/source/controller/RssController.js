'use strict';

angular.module('vsController')

.controller('rssController', ['$scope', 'rssRESTFactory', 'alertBoxFactory', 'blogRESTFactory', function($scope, rssRESTFactory, alertBoxFactory, blogRESTFactory){
	
	$scope.initRssList = function(){
		rssRESTFactory.rssList({}, function(data){
			$scope.rssArray = data;
		});
	}
	
	$scope.initRssList();
	
	$scope.rssModel = {
		rssName : '',
		rssUrl : ''
	}
	
	$scope.btnFlag = false;
	
	$scope.addRss = function(){
		if($scope.rssModel.rssName != '' && $scope.rssModel.rssUrl != ''){
			$scope.btnFlag = true;
			//验证RSS
			rssRESTFactory.validateRss({
				"rssName" : $scope.rssModel.rssName,
				"rssUrl" : $scope.rssModel.rssUrl
			}, function(data){
				if(data.valid == '0'){
					//验证通过
					$scope.addRssValidFlag = true;
					addRssDetail();
				}else if(data.valid == '1'){
					$scope.addRssValidFlag = false;
					alertBoxFactory('rss地址无效!',{textAlign : 'center',width: 300});
				}else if(data.valid == '2'){
					$scope.addRssValidFlag = false;
					alertBoxFactory('rss名称已经存在!',{textAlign : 'center',width: 300});
				}
			});
		}else{
			alertBoxFactory('填写的信息不完整',{textAlign : 'center',width: 300});
		}
	}
	
	function addRssDetail(){
		rssRESTFactory.addRss({
			"rssName" : $scope.rssModel.rssName,
			"rssUrl" : $scope.rssModel.rssUrl
		}, function(data){
			if(data.code == '10000') {
				$scope.rssModel = {};
				$scope.initRssList();
			}else{
				alertBoxFactory(data.msg,{textAlign : 'center',width: 300});
				$scope.btnFlag = false;
			}
		});
	}
	
	$scope.viewRss = function(rssName){
		rssRESTFactory.viewRss({
			"rssName" : rssName
		},function(data){
			$scope.rssDetailList = data;
		});
	}
	
	$scope.delRss = function(config, attr){
		var rssName = attr.rssname;
		rssRESTFactory.delRss({
			"rssName" : rssName
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('操作成功!',{textAlign : 'center',width: 300});
				$scope.initRssList();
			}
		});
	}
	
	$scope.shareRss = function(blog){
		
		blogRESTFactory.create({
			"titleName":blog.titleName,
			"streamContent":blog.streamContent,
			"streamComefrom":3,
			"isDraft":0,
			"imgList":[]
		}, function(data){
			if(data.blogId != undefined && data.blogId > 0){
				alertBoxFactory('分享成功!',{textAlign : 'center',width: 300});
			}
		});
		
	}
	
}]);