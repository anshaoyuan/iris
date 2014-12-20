'use strict';
angular.module('vsController').controller('blogListController',['$scope','blogRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory','$state','noticeRestFactory',
                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory,$state,noticeRestFactory){
	$scope.blogArray = [];
	//blog's max id
	$scope.blogShow = true;
	$scope.currentPage = 1;//默认显示页码
	$scope.itemsPerPage = 10;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	
	var listType = "0";//分享
	if($location.path().indexOf("/drafts") > 0){
		listType = "1";
	}
	if ($location.search().pageNumber && $location.search().pageNumber !== true) {
		$scope.currentPage = $location.search().pageNumber;
	}
		
	//第一次加载列表
	getBlog($scope.currentPage);
		
	$scope.paging = function () {
		var state = listType == '0' ? 'articles' : 'articles_drafts';
		$state.go(state,{
			pageNumber : $scope.currentPage
		});
	};
	
	function getBlog(page){
		blogRESTFactory.blogs({
			"isDraft" : listType,
			"pageInfo":{
				"pageNumber":page,
				"pageSize":$scope.itemsPerPage
			}
		},function(data){
			$scope.totalItems = data.totalElements;
			$scope.blogArray = data.content;
			$scope.currentPage = page;
		});
	};
		
//	$scope.myInterval = 1000;
	function initNoticeList(){
		noticeRestFactory.noticeList({},function(data){
			$scope.noticeList = [];
			for(var i=0; i< data.length; i++){
				$scope.noticeList.push({ 
					src: '..' + data[i].imageUri,
					href: '#/articles/show/' + data[i].blogId
					});
			}
		});
	}	
	initNoticeList();	
	
	$scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
    var newWidth = 600 + slides.length;
    slides.push('http://placekitten.com/' + newWidth + '/300');
    };
   for (var i=0; i<4; i++) {
     $scope.addSlide();
   }
	
	function loadHotBlog(){
		blogRESTFactory.hotBlogs({
			"pageNumber" : 1
		},function (data){
			var lengthNum = data.length;
			for(var i=0;i<data.length;i++){
				if(data[i].id == $scope.blogId){
					lengthNum = data.length-1;
					data.splice(i,1);
				}
			}
			$scope.hotBlogLength = lengthNum;
			$scope.hotBlogs = data;
			
		});
	}
	loadHotBlog();

	$scope.currId = $cookies.userId;
	$scope.currName = decodeURI($cookies.userName);
	$scope.currImg = $cookies.userImgUrl;


}]);
angular.module('vsController').controller('blogEditController',['$scope','blogRESTFactory','alertBoxFactory','$location','imageRESTFactory',
                                                            function($scope,blogRESTFactory,alertBoxFactory,$location,imageRESTFactory){
		$scope.richTextConfig = {
				file : false
		};
		$scope.submited = false;
		$scope.contentValid = false;
		$scope.blogId = null;
		$scope.pid =$location.search().pid;
		if($location.absUrl().indexOf("/update") > 0){
			$scope.blogId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
		}
		
		$scope.blogSub = function(type){
			$scope.submited = true;
			if(!$scope.blogContent){
				$scope.contentValid = true;
			}else{
				$scope.contentValid = false;
			}
			if($scope.newArticleForm.$valid&&!$scope.contentValid){
				//$scope.blogId不为空做修改操作
				if($scope.blogId){
					blogRESTFactory.update({
						id : $scope.blogId,
						titleName : $scope.blogTitle,
						streamContent : $scope.blogContent,
						streamComefrom:'0',
						isDraft:type
					},function(data){
						showInfo(data,type);
					});
				}else{
					//$scope.blogId 为空做新增操作
					blogRESTFactory.create({
						titleName : $scope.blogTitle,
						streamContent : $scope.blogContent,
						streamComefrom:'0',
						isDraft:type
						},function(data){
							showInfo(data,type);
						},function(data){
							alertBoxFactory('发表失败',{textAlign : 'center',width: 200,waitTime:2});
					});
				}
				
			}
		};
		
		//发表分享（或草稿）时的提示信息
		function showInfo(data,type){
			if(data.blogId){
				if(type==1){
					alertBoxFactory('草稿保存成功',{textAlign : 'center',width: 300,waitTime:2});
					$scope.blogId = data.blogId;
				}else{
					alertBoxFactory('发表成功',{textAlign : 'center',width: 200,waitTime:2});
					$scope.blogId = null;
					$location.path('articles');
				}
			}else if(data.msg){
				alertBoxFactory(data.msg,{textAlign : 'center',width: 300,waitTime:2});
			}else{
				alertBoxFactory('发表失败',{textAlign : 'center',width: 200,waitTime:2});
			}
	
		}
		
		function getBlogInfoById(){
			if($scope.blogId ){
				blogRESTFactory.get({
					"blogId" : $scope.blogId
				},function(data){
					$scope.blogTitle = data.titleName;
					$scope.blogContent = '^' + data.streamContent;
				});
			}else{
				if(!$scope.blogId && !$scope.pid){
					$scope.blogContent = '^';
				}
			}
		}
		$scope.getImageInfo = function(){
			if($scope.pid){
				imageRESTFactory.findImageById({
					"imageId":$scope.pid
				},function(data){
					$scope.blogContent = '^<img src="' + data.absoluteImagePath+'">';
				});
			}else{
				if(!$scope.blogId){
					if(!$scope.blogContent){
						$scope.blogContent = '^';
					}
				}
			}
		};
		getBlogInfoById();
		$scope.getImageInfo();
		//$scope.blogContent = '^' + 'data.absoluteImagePath';
	
}]);
angular.module('vsController').controller('blogDetailController',['$scope','blogRESTFactory','alertBoxFactory',
                                                                  '$location','$sce','userRESTFactory','blogCommentRESTFactory',
                                                                  '$cookies','utilService','storeService','eventsRESTFactory',
                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$sce,userRESTFactory,
                                                                		commentRESTFactory,$cookies,utilService,storeService,eventsRESTFactory){
		
		$scope.currUser = $cookies.userId;
		$scope.blogId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
		$scope.commentHtml1="";
		$scope.showBlogFlag = false;
		
		//用来判断赞的处理是否完成
		$scope.clickMentionValue = false;
		function getBlogInfoById(){
			
			if($scope.blogId == null){
				return ;
			}
			
			$scope.showBlogFlag = true;
			
			blogRESTFactory.get({
				"blogId" : $scope.blogId
			},function(data){
				if(!data.titleName){
					alertBoxFactory('该记录已不存在',{textAlign : 'center',width: 300,waitTime:2});
					$location.path('articles');
					return ;
				}
				
				$scope.blogTitle = data.titleName;
				$scope.blogContent =  $sce.trustAsHtml(data.streamContent);
				$scope.blogPraiseCount = data.praiseCount;
				$scope.blogCreateDate = data.createDate;
				$scope.isOwner = data.createBy == $scope.currUser ? 1 : 0;
				$scope.mentionId = data.mentionId ==null ? false : true;
				$scope.createBy = data.createBy;
				$scope.hasStore = data.hasStore;
				$scope.mentions = utilService.getMentions(data.mentionList);
				$scope.isSignup = data.isSignup;
				$scope.fileList = data.fileList;
				if($scope.isSignup == 1){
					eventsRESTFactory.projetList(
							{"blogId":$scope.blogId},
					function(data){
						$scope.projects = data.list;
					});
				}else{
					loadHotBlog();
				}
				loadComment($scope.blogId);
				loadUser($scope.createBy);
			});
			
		}
		
		$scope.downloadFile = function(fileId){
			window.location.href='../mobile/download/attach/downloadFile/'+fileId;
//			documentRestFactory.downloadFile({"fileId": fileId}, function(data){});
		}
		
		function loadUser(userId){
			userRESTFactory.get({
				"userId":userId
				
			},function(data){
				$scope.createName = data.userNickname;
				$scope.createImg = data.userImgUrl;
				$scope.createTitle = data.title;
				
			});
			
		}
		function loadHotBlog(){
			blogRESTFactory.hotBlogs({
				"pageNumber" : 1
			},function (data){
				var lengthNum = data.length;
				for(var i=0;i<data.length;i++){
					if(data[i].id == $scope.blogId){
						lengthNum = data.length-1;
						data.splice(i,1);
					}
				}
				$scope.hotBlogLength = lengthNum;
				$scope.hotBlogs = data;
				
			});
		}
		function loadComment(blogId){
			commentRESTFactory.comments({
				"blogId" : blogId
			},function(data){
				$scope.commentLength = data.length;
				
				$scope.comments = data;
			});
			
		}
		getBlogInfoById();
		
		$scope.subComment = function(type,html){
			if(!html){
				return;
			}
			//直接回复
			if(type == 1){
				commentRESTFactory.create({
					"blogId":$scope.blogId,
					"commentHtml":$scope.commentHtml1
				},function(data){
					if(data.id){
						data.userNickname = data.userName;
						$scope.comments.push(data);
						$scope.commentHtml1 = "";
						$scope.commentLength = $scope.commentLength + 1;
						alertBoxFactory('评论成功',{textAlign : 'center',width: 200,waitTime:2});
					}else{
						alertBoxFactory('评论失败',{textAlign : 'center',width: 200,waitTime:2});
					}
				});
			}else{
				commentRESTFactory.create({
					"blogId":$scope.blogId,
					"parentId":$scope.commentSubParentId,
					"commentHtml":html
				},function(data){
					if(data.id){
						for(var i = 0 ; i < $scope.comments.length ; i++){
							$scope.comments[i].subFormShow = false;
						}
						data.userNickname = data.userName;
						$scope.comments.push(data);
						html = "";
						$scope.commentLength = $scope.commentLength + 1;
						alertBoxFactory('评论成功',{textAlign : 'center',width: 200,waitTime:2});
					}else{
						alertBoxFactory('评论失败',{textAlign : 'center',width: 200,waitTime:2});
					}
				});
			}
			
		};
		
		$scope.deleteComment = function(config,attr){
			commentRESTFactory.deleteComment({
				"id":attr.commentid
			},function(data){
				if(data.code = "10000"){
					alertBoxFactory('删除评论成功',{textAlign : 'center',width: 300,waitTime:2});
					for(var i =0 ;i <$scope.comments.length; i++){
						if($scope.comments[i].id == attr.commentid){
							$scope.comments.splice(i,1);
							break;
						}
					}
					$scope.commentLength = $scope.commentLength - 1;
				}else{
					alertBoxFactory('删除评论失败',{textAlign : 'center',width: 300,waitTime:2});
				}
			});
		};
		
		$scope.deleteBlog = function(config,attr){
			blogRESTFactory.deleteBlog({
				"id":$scope.blogId
			},function(data){
				if(data.code == "10000"){
					if($scope.isSignup == 1){
						alertBoxFactory('删除活动成功',{textAlign : 'center',width: 300,waitTime:2});
						$location.path('events');
					}else{
						alertBoxFactory('删除分享成功',{textAlign : 'center',width: 300,waitTime:2});
						$location.path('articles');
					}
					
				}else{
					alertBoxFactory('删除分享失败',{textAlign : 'center',width: 300,waitTime:2});
				}
				
			});
		};
		
		$scope.to_update = function(){
			if($scope.isSignup==0){
				$location.path('articles/update/'+$scope.blogId);
			}else{
				$location.path('events/update/'+$scope.blogId);
			}
		};
		$scope.commentSubParentId; 
		$scope.showCommentForm = function(comment){
			for(var i = 0 ; i < $scope.comments.length ; i++){
				if($scope.comments[i] != comment){
					$scope.comments[i].subFormShow = false;
				}
			}
			
			if(!comment.subFormShow){
				$scope.commentSubParentId = comment.id;
			}
			
			comment.subFormShow = !comment.subFormShow;
		};

		$scope.clickMention = function(){
			$scope.clickMentionValue = true;
			blogRESTFactory.blogMention({
				"id" : $scope.blogId
			},function(data){
				if(data.id){
					alertBoxFactory('点赞成功',{textAlign : 'center',width: 300,waitTime:2});
					$scope.blogPraiseCount = $scope.blogPraiseCount + 1;
					$scope.mentionId = true;
					
				}else{
					alertBoxFactory('取消赞成功',{textAlign : 'center',width: 300,waitTime:2});
					$scope.blogPraiseCount = $scope.blogPraiseCount -1;
					$scope.mentionId = false;
				}
				$scope.clickMentionValue = false;
			});
		};
		
		$scope.store = function(){
			storeService.store(1,$scope.blogId,$scope.hasStore,function(){
				if($scope.hasStore==0){
					$scope.hasStore = 1;
					alertBoxFactory('收藏成功',{textAlign : 'center',width: 300,waitTime:2});
				}else{
					$scope.hasStore = 0;
					alertBoxFactory('取消收藏成功',{textAlign : 'center',width: 300,waitTime:2});
				}
			});
		};
		
		$scope.showProjectDetail = function(id){
			$location.path('events/show/'+id);
		};
		
}]);
