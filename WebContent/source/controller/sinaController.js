'use strict';

angular.module('vsController').controller('sinaController', 
			['$scope', 'sinaRESTFactory', 'alertBoxFactory', 'blogRESTFactory', 
			 function($scope, sinaRESTFactory, alertBoxFactory, blogRESTFactory){
	
	$scope.pageNum = 1;
	
	function initSinaList(){
		sinaRESTFactory.sinaList({
			'pageNum' : $scope.pageNum
		}, function(data){
			$scope.blogArray = data.streamList;
			$scope.optionSelectedValue = data.sinaType;
		});
	}
	//首次加载
	initSinaList();
	
	//下一页
	$scope.nextPage = function(){
		$scope.pageNum ++ ;
		initSinaList();
	}
	
	//上一页
	$scope.previewPage = function(){
		if($scope.pageNum != 1){
			$scope.pageNum --;
		}
		initSinaList();
	}
	
	//切换类型
	$scope.sinaType='';
	$scope.changeSinaType = function(){
		console.log($scope.sinaType);
		sinaRESTFactory.changeSinaType({'type' : $scope.sinaType}, function(data){
			if(data.code == '10000'){
				$scope.pageNum = 1;
				initSinaList();
			}
		});
	}
	
	$scope.shareBlogFlag = false;
	
	$scope.shareSina = function(blog){
		$scope.shareBlogFlag = true;
		if(blog.originalPic == null || blog.originalPic == ''){
			shareBlog(blog, []);
		}else{
			sinaRESTFactory.processSinaBlogImg({
				"originalPic": blog.originalPic
			}, function(data){
				if(data.id != undefined){
					var imageIdList = new Array({"id" : data.id});
					shareBlog(blog, imageIdList);
				}
			});
		}
		$scope.shareBlogFlag = false;
//		blogRESTFactory.create({
//			"titleName":blog.titleName,
//			"streamContent":blog.streamContent,
//			"streamComefrom":7,
//			"isDraft":0,
//			"imgList":[]
//		}, function(data){
//			if(data.blogId != undefined && data.blogId > 0){
//				alertBoxFactory('分享成功!',{textAlign : 'center',width: 300});
//			}
//		});
		
	}
	
	function shareBlog(blog, imageList){
		blogRESTFactory.create({
			"titleName":blog.titleName,
			"streamContent":blog.content,
			"streamComefrom":7,
			"isDraft":0,
			"imgList":imageList
		}, function(data){
			if(data.blogId != undefined && data.blogId > 0){
				alertBoxFactory('分享成功!',{textAlign : 'center',width: 300});
			}
		});
	}
	
	$scope.unbind = function(){
		window.location.href='../mobile/sina/unbind';
	}
}]);