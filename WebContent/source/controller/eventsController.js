'use strict';
angular.module('vsController').controller('eventsNewController',['eventService','$scope','eventsRESTFactory','alertBoxFactory',
                                                                 '$location','imageRESTFactory','$cookies','blogRESTFactory',
                                                                 function(eventService,$scope,eventsRESTFactory,alertBoxFactory,
                                                                		 $location,imageRESTFactory,$cookies,blogRESTFactory){
//	$scope.richTextConfig = {
//			file : false
//	};
	
	$scope.fileList = [];
	
	var uploadConfig = {
			swf: 'image/uploadify.swf',
			fileObjName: 'fileUpload',
			uploader: '../upload/stream;jsessionid=' + $cookies.sid,
			multi: false,
			fileTypeDesc : '请选择图片文件',
			fileTypeExts : '*.jpg;*.png;*.jpeg;*.bmp;*.gif;',
			fileSizeLimit : '5MB',
			buttonClass: 'btn btn-default',
			width: 80,
			height: 34,
			buttonText: '附加图片',
			onUploadSuccess: function (file, data, response,attr) {
				data = JSON.parse(data);
				var voteOptionIndex = attr.id.replace('voteUpload-','');
				$scope.projects.projectList[voteOptionIndex].imageUrl = data.filePath.replace(/^\/[^\/]+/,'');
				$scope.projects.projectList[voteOptionIndex].imageUri = $scope.sysPath + data.filePath;
				$scope.projects.projectList[voteOptionIndex].imageId = data.id;
				$scope.$digest();
			}
	};
	$scope.projects = {
			projectList : []
	};
	function addProject(){
		$scope.projects.projectList.push({
			projectName : '',
			projectDesc : '',
			isShow : true,
			uploadConfig : _.clone(uploadConfig)
		});
	}
	
	$scope.addProject = addProject;
	$scope.blogId = null;
	if($location.absUrl().indexOf("/update") > 0){
		$scope.blogId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	}else{
		addProject();
	}
	$scope.showWaringInfo = false;
	$scope.submited = false;


	$scope.eventSub = function(){
		$scope.submited = true;
		$scope.showWaringInfo = false;
		if(!$scope.blogTitle||$scope.newEvent.title.$invalid){
			$scope.errorMsg = "标题不能为空且长度不能大于40个字符!";
			$scope.showWaringInfo = true;
			return;
		}
		if(!$scope.blogContent){
			$scope.errorMsg = "正文不能为空!";
			$scope.showWaringInfo = true;
			return ;
		}
		if($scope.blogContent.indexOf("<img src")<0){
			$scope.errorMsg = "你未给活动上传图片!";
			$scope.showWaringInfo = true;
			return ;
		}
		
		var subProject = eventService.checkAllProject($scope.projects.projectList);
		if(!subProject){
			return;
		}
		if(!$scope.showWaringInfo){
			var subFileList = [];
			
			for(var i=0;i<$scope.fileList.length;i++){
				subFileList.push({id : $scope.fileList[i].id});
			}
			if($scope.blogId){
				eventsRESTFactory.update({
					id		  : $scope.blogId,
					titleName : $scope.blogTitle,
					streamContent : $scope.blogContent,
					streamComefrom : 0,
					isDraft : 0,
					projects:subProject,
					fileList : subFileList
					
				},function(data){
					if(data.code==10000){
						alertBoxFactory('修改成功',{textAlign : 'center',width: 200,waitTime:2});
						$location.path('events');
					}else{
						alertBoxFactory('修改失败',{textAlign : 'center',width: 200,waitTime:2});
					}
					
				});
			}else{
				eventsRESTFactory.create({
					titleName : $scope.blogTitle,
					streamContent : $scope.blogContent,
					streamComefrom : 0,
					isDraft : 0,
					projects:subProject,
					fileList : subFileList
										
				},function(data){
					alertBoxFactory('发表成功',{textAlign : 'center',width: 200,waitTime:2});
					$location.path('events');
				},function(data){
					alertBoxFactory('发表失败',{textAlign : 'center',width: 200,waitTime:2});
				});
			}
			
		}
		
	};
	$scope.deleteProject = function(index,pid){
		if(pid){
			eventsRESTFactory.deleteProject({
				id:pid
			},function(data){
				if(data.code!=10000){
					alertBoxFactory('删除项目失败',{textAlign : 'center',width: 200,waitTime:2});
					return;
				}else{
					$scope.projects.projectList.splice(index,1);
				}
			});
		}else{
			$scope.projects.projectList.splice(index,1);
		}
		
		
	};
	function getBlogInfoById(){
		if($scope.blogId ){
			blogRESTFactory.get({
				"blogId" : $scope.blogId
			},function(data){
				$scope.blogTitle = data.titleName;
				$scope.blogContent = '^' + data.streamContent;
				$scope.fileList = data.fileList;
			});
			eventsRESTFactory.projetList(
					{"blogId":$scope.blogId},
			function(data){
				for(var i = 0; i< data.list.length; i++ ){
					var project = data.list[i];
					var isShow = project.isShow ==1? true : false ;
					$scope.projects.projectList.push({
						projectName : project.projectName,
						isShow : isShow,
						startDate : project.startDate,
						endDate : project.endDate,
						id : project.id,
						imageUrl :  project.minImageUrl,
						imageUri :  project.minImageUrl,
						imageId : project.imageId,
						projectDesc:project.projectDesc,
						uploadConfig : _.clone(uploadConfig)
					});
				}
			});
		}else{
			if(!$scope.blogId){
				$scope.blogContent = '^';
			}
		}
	}
	getBlogInfoById();
}]);
