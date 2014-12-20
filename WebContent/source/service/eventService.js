'use strict';

angular.module('vsService').service('eventService',['alertBoxFactory',function(alertBoxFactory){

	function checkProject(project,index){
		if(!project.projectName){
			alertBoxFactory("第 "+index+" 项项目名称不能为空",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}
		if(project.projectDesc&&project.projectDesc.length>200){
			alertBoxFactory("第 "+index+" 项报名描述不能超过200",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}
		if(!project.startDate){
			alertBoxFactory("第 "+index+" 项报名开始时间非法",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}
		if(!project.endDate){
			alertBoxFactory("第 "+index+" 项报名结束时间非法",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}

		if(project.startDate > project.endDate){
			alertBoxFactory("第 "+index+" 项报名开始时间不能大于结束时间",{textAlign : 'center',width: 600,waitTime:2});
			return;
		}
		if(!project.imageId){
			alertBoxFactory("第 "+index+" 项未上传图片",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}
		return true;
	}
	
	this.checkAllProject = function(list){
		var subProject = [];
		for(var i = 0;i < list.length; i++){
			var project = list[i];
			var valid = checkProject(project,i+1);
			if(valid){
				var isShow = project.isShow==true?1:0;
				subProject.push({
					id:project.id,
					projectName:project.projectName,
					startDate:project.startDate,
					endDate:project.endDate,
					isShow:isShow,
					imageId: project.imageId,
					projectDesc: project.projectDesc
				});
			}else{
				return false;
			}
		}
		return subProject;
	};
	
}]);