'use strict';
angular.module('vsController').controller('teamListController',['$scope','teamRESTFactory','alertBoxFactory','$location','$cookies',
                                                                function($scope,teamRESTFactory,alertBoxFactory,$location,$cookies){
		
		// all 查询全部群组 my 查询我的群组
		$scope.queryType = "all";
		$scope.currUser = $cookies.userId;
		$scope.currentPage = 1;
		$scope.pageSize = 15;
		$scope.teamSearchName = "";
		$scope.loadAllTeam = function(currentPage,search){
			if(search){
				if($scope.teamSearchName==""){
					 return false;
				}
				teamRESTFactory.list({
					  "pageInfo":{
						    "pageNumber":currentPage,
						    "pageSize":$scope.pageSize
						  },
						  "userList":null,
						  "userVoList":null,
						  "teamName" : $scope.teamSearchName
				},function(data){
					$scope.pushData(data);
				});
			}else if($scope.queryType == "all"){
				$scope.teamSearchName = "";
				$scope.queryType = "all" ;
				teamRESTFactory.allTeams({
					  "pageInfo":{
						    "pageNumber":currentPage,
						    "pageSize":$scope.pageSize
						  },
						  "userList":null,
						  "userVoList":null,
						  "teamName" : $scope.teamSearchName == "" ? null : $scope.teamSearchName
				},function(data){
					$scope.pushData(data);
				});
			
			}else{
				$scope.teamSearchName = "";
				teamRESTFactory.myTeams({
					"pageInfo":{
					    "pageNumber":currentPage,
					    "pageSize":$scope.pageSize
					  }
				},function(data){
					$scope.pushData(data);
				});
			}
			
		};
		$scope.pushData = function(data){
			$scope.totalItems = data.totalElements,
			$scope.teams = data.content;
		};
		$scope.loadAllTeam($scope.currentPage);
		$scope.changeType = function(type){
			$scope.queryType = type;
			$scope.currentPage = 1;
			$scope.loadAllTeam($scope.currentPage);
		};
		$scope.joinTeam = function(team){
			teamRESTFactory.addMember({
				"userId" : $cookies.userId,
				"teamId" : team.id
			},function(data){
				if(data.code == "10000"){
					team.isTeamMember = 1;
					alertBoxFactory('加入成功',{textAlign : 'center',width: 200});
				}else{
					alertBoxFactory('加入失败',{textAlign : 'center',width: 200});
				}
			});
		};
		
		$scope.quitTeam = function(team){
			
			teamRESTFactory.deleteMember({
				"userId" : $cookies.userId,
				"teamId" : team.id
			},function(data){
				if(data.code == "10000"){
					team.isTeamMember=0;
					alertBoxFactory('退出成功',{textAlign : 'center',width: 200});
				}else{
					alertBoxFactory('退出失败',{textAlign : 'center',width: 200});
				}
				
			});
		};
		
		$scope.todetail = function(team){
			if(team.isTeamMember==0 && team.isOpen == 0){
				alertBoxFactory('你无权限查询该群组',{textAlign : 'center',width: 400});
			}else if(team.createId == $scope.currUser){
				$location.path('groups/update/'+team.id);
			}else{
				$location.path('groups/show/'+team.id);
			}
		};
		
		$scope.toUpdate = function(team){
			$location.path('groups/update/'+team.id);
		};
			
}]);
angular.module('vsController').controller('teamDetailController',['$scope','teamRESTFactory','alertBoxFactory','$location','$cookies',
                                                                function($scope,teamRESTFactory,alertBoxFactory,$location,$cookies){
	$scope.teamId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	$scope.loadTeamInfo = function(){
		teamRESTFactory.queryTeamMembers({
			"id" : $scope.teamId
		},function(data){
			if(data.code == "10000"){
				$scope.loadTeamDetail();
				$scope.userList = data.userList;
			}else{
				alertBoxFactory('非法查询',{textAlign : 'center',width: 200});
				$location.path('groups');
			}
		});
	 	
		
	};
	$scope.loadTeamDetail = function(){
		teamRESTFactory.get({
			"id" : $scope.teamId 
		},function(data){
			if(data.code == "10000"){
				$scope.team = data.teamVo;
			}else{
				alertBoxFactory('加载群组信息失败',{textAlign : 'center',width: 400});
			}
		});
	};
	$scope.loadTeamInfo();
	
}]);

angular.module('vsController').controller('teamUpdateController',['$scope','teamRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory',
                                                                function($scope,teamRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory){
	
	
	$scope.teamId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	$scope.dataObj = {selectUsers : []};
  	$scope.submited = false;
  	$scope.checkName = false;
	$scope.loadTeamInfo = function(){
		teamRESTFactory.queryTeamMembers({
			"id" : $scope.teamId
		},function(data){
			if(data.code == "10000"){
				$scope.loadTeamDetail();
				var teamMemberIdArr = [];
				for(var i= 0;i <data.userList.length;i++ ){
					teamMemberIdArr.push({"id" : data.userList[i].id,"userName":data.userList[i].aliasName});
				}
				$scope.dataObj.selectUsers = teamMemberIdArr;
			}else{
				alertBoxFactory('非法查询',{textAlign : 'center',width: 200});
				$location.path('groups');
			}
		});
	 	
		
	};
	//加载群组信息
	$scope.loadTeamDetail = function(){
		teamRESTFactory.get({
			"id" : $scope.teamId 
		},function(data){
			if(data.code == "10000"){
				if(data.teamVo.createId!=$cookies.userId){
					alertBoxFactory('非法访问',{textAlign : 'center',width: 400});
					$location.path('groups');
					return;
				}
				$scope.team = data.teamVo;
				$scope.oldTeamName = data.teamVo.teamName;
			}else{
				alertBoxFactory('加载群组信息失败',{textAlign : 'center',width: 400});
			}
		});
	};
	$scope.loadTeamInfo();
  	$scope.loadAllUser = function(){
  		userRESTFactory.list({},function(data){
  			$scope.dataObj.allUsers = data;
  		});
  	};
  	$scope.loadFollow = function(){
  		userRESTFactory.getAttentionList({},function(data){
  			$scope.dataObj.followusers = data;
  			$scope.dataObj.users = data;
  		});
  	};
  	$scope.loadFollow();
  	$scope.loadAllUser();
	//修改群组信息
	$scope.updateTeamInfo = function(){
		$scope.submited = true;
		if($scope.newTeamForm.$valid){
  			teamRESTFactory.checkTeamName({
  				"newName":$scope.team.teamName,
  				"oldName":$scope.oldTeamName
  			},function(data){
  				if(data.code == "10000"){
  					$scope.submitInfo();
  				}else{
  					$scope.checkName= true;
  				}
  			});
  		}
	};
	
	$scope.submitInfo = function(){

		var arr =[];
		for(var i =0 ;i <$scope.dataObj.selectUsers.length;i++){
  			arr.push({id : $scope.dataObj.selectUsers[i].id});
  		}
		if($scope.custCreator && $scope.custCreator.id){
			$scope.team.createId = $scope.custCreator.id;
		}
		teamRESTFactory.update({
			"id" :$scope.team.id,
			"createId":$scope.team.createId,
			"teamName" :$scope.team.teamName,
			"isOpen" :$scope.team.isOpen,
			"isWrite" :$scope.team.isWrite,
			"userList":arr
		},function(data){
			if(data.code == "10000"){
				alertBoxFactory('修改成功',{textAlign : 'center',width: 200});
				$location.path('groups');
			}else{
				alertBoxFactory('修改失败',{textAlign : 'center',width: 200});
			}
		});
	
	};
  	$scope.changeCheckNameBeTrue = function(){
  		$scope.checkName = false;
  	};
  	$scope.changeIsOpen = function(value){
  		$scope.team.isOpen = value;
  	};
	$scope.searchReceiver = function(key,mark){
		var selectedList = getSelect($scope[mark + 'List']);
		for(var i = 0 ;i<$scope.dataObj.users.length;i++){
			var user = $scope.dataObj.users[i];
			if(user.userName.indexOf(key)!=-1){
				selectedList.push({id:user.id,name:user.userName});
			}
		}
		$scope[mark + 'List'] = selectedList;
		$scope.$digest();
	};
	function getSelect(list) {
        var result = [];
        if (list && list.length) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].selected) {
                    result.push(list[i]);
                }
            }
        }
        return result;
    };
    $scope.dismiss = function(config,attr){
    	
    	teamRESTFactory.deleteTeam({
    		"id":$scope.team.id
    	},function(data){
    		if(data.code =="10000"){
    			alertBoxFactory('解散成功',{textAlign : 'center',width: 200});
  				$location.path('groups');
    		}else{
    			alertBoxFactory('解散失败',{textAlign : 'center',width: 200});
  			
    		}
    	});
    };
    $scope.add = function(user){
  		var mark = false;
  		var selectUser = $scope.dataObj.selectUsers;
  		for(var i =0 ;i < selectUser.length; i++){
  			if(selectUser[i].id == user.id){
  				mark = true;
  			}
  		}
  		if(!mark){
  			$scope.dataObj.selectUsers.push(user);
  		}
  		console.log(user.id);
  	};
  	
  	$scope.deleteUser = function(user,index){
  		$scope.dataObj.selectUsers.splice(index,1);
  	};
  	
  	$scope.discribe = "我关注的用户";
  	$scope.searchAllUser = function(){
		
  		if(!$scope.searchUser){
  			$scope.dataObj.users = $scope.dataObj.followusers;
  			$scope.discribe = "我关注的用户";
  		}else{
  			$scope.discribe = "搜索到的用户";
  			$scope.dataObj.users =[];
  			for(var i =0 ; i< $scope.dataObj.allUsers.length;i++){
  				if($scope.dataObj.allUsers[i].userName.indexOf($scope.searchUser)!=-1){
  					$scope.dataObj.users.push($scope.dataObj.allUsers[i]);
  				}
  			}
  			
  		}
  	};
}]);

angular.module('vsController').controller('teamNewController',['$scope','teamRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory',
                                                                  function($scope,teamRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory){
	$scope.dataObj = {selectUsers : []};
	var arr =[];
	
  	$scope.loadAllUser = function(){
  		userRESTFactory.list({},function(data){
  			$scope.dataObj.allUsers = data;
  		});
  	};
  	$scope.loadFollow = function(){
  		userRESTFactory.getAttentionList({},function(data){
  			$scope.dataObj.followusers = data;
  			$scope.dataObj.users = data;
  		});
  	};
  	$scope.team = {};
  	$scope.team.isOpen=0;
  	$scope.team.isWrite = 0;
  	$scope.loadAllUser();
  	$scope.loadFollow();
  	$scope.submited = false;
  	$scope.checkName = false;
  	$scope.newTeamInfo = function(){
  		$scope.submited = true;
  		if($scope.newTeamForm.$valid){
  			teamRESTFactory.checkTeamName({
  				"newName":$scope.team.teamName,
  				"oldName":""
  			},function(data){
  				if(data.code == "10000"){
  					$scope.submitInfo();
  				}else{
  					$scope.checkName= true;
  				}
  			});
  		}
  	};
  	$scope.changeCheckNameBeTrue = function(){
  		$scope.checkName = false;
  	};
  	$scope.changeIsOpen = function(value){
  		$scope.team.isOpen = value;
  	};
  	
  	$scope.submitInfo = function(){

			for(var i =0 ;i <$scope.dataObj.selectUsers.length;i++){
	  			arr.push({id : $scope.dataObj.selectUsers[i].id});
	  		}
	  		teamRESTFactory.create({
	  			"teamName" :$scope.team.teamName,
	  			"isOpen" :$scope.team.isOpen,
	  			"isWrite" :$scope.team.isWrite,
	  			"userList" : arr
	  		},function(data){
	  			if(data.code == "10000"){
	  				alertBoxFactory('创建成功',{textAlign : 'center',width: 200});
	  				$location.path('groups');
	  			}else{
	  				alertBoxFactory('创建失败',{textAlign : 'center',width: 200});
	  			}
	  		});
  	};
  	
  	$scope.add = function(user){
  		var mark = false;
  		var selectUser = $scope.dataObj.selectUsers;
  		for(var i =0 ;i < selectUser.length; i++){
  			if(selectUser[i].id == user.id){
  				mark = true;
  			}
  		}
  		if(!mark){
  			$scope.dataObj.selectUsers.push(user);
  		}
  		console.log(user.id);
  	};
  	
  	$scope.deleteUser = function(user,index){
  		$scope.dataObj.selectUsers.splice(index,1);
  	};
  	$scope.discribe = "我关注的用户";
  	$scope.searchAllUser = function(){
		
  		if(!$scope.searchUser){
  			$scope.dataObj.users = $scope.dataObj.followusers;
  			$scope.discribe = "我关注的用户";
  		}else{
  			$scope.discribe = "搜索到的用户";
  			$scope.dataObj.users =[];
  			for(var i =0 ; i< $scope.dataObj.allUsers.length;i++){
  				if($scope.dataObj.allUsers[i].userName.indexOf($scope.searchUser)!=-1){
  					$scope.dataObj.users.push($scope.dataObj.allUsers[i]);
  				}
  			}
  			
  		}
  	};
  }]);
