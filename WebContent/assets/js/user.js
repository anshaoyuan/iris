require(['config'], function () {
    "use strict";
    
    var letterArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    // 显示所有的用户列表
    require(['text!../tpl/userList.tpl', 'template', 'syntax', 'module/header', 'bootstrap', 'domready'], function (raw, template) {
    	
    	getUserByTeamUserName();
        
        initTeamSelect();
        
        var userList;
        
        function getUserByTeamUserName(){
        	
        	var teamId = $('#currChoosenTeamId').val();
        	
        	var userName = $('#searchUserInp').val().trim();

            var jsonData = '{"userName":"' + userName + '"}';
        	
        	if(teamId == ''){
        		$.ajax(sysPath + '/mobile/webUser/userList', {
        			contentType: 'application/json; charset=utf-8',
        			type: 'post',
        			data:  jsonData,
        			success: function (res) {
        				loadUserList(res);
        			}
        		});
        	}else{
        		$.ajax(sysPath + "/mobile/team/findTeamById/"+teamId, {
                    contentType: 'application/json; charset=utf-8',
                    type: 'GET',
                    data: {},
                    success: function (res) {
                   	 userList = res.team.userList;
                   	 var ul = new Array();
                   	 for(var i=0;i<userList.length;i++){
                   		var ui = userList[i].userInfo;
                   		if(userName != null && userName.length > 0 && ui.firstLetter != null && ui.firstLetter.length>0){
                   			var firstLetterLength = userName.length;
                   			var firstLetter = ui.firstLetter.substring(0, firstLetterLength);
                   			if(firstLetter == userName.toUpperCase()){
                   				ul.push(userList[i].userInfo);
                   			}
                   		}else if(userList[i].roleNames != 'admin' && userList[i].roleNames != 'subadmin'){
                   			ul.push(userList[i].userInfo);
                   		}
                	 }
                   	 loadUserList(ul);
                    }
                });
        	}
        	
        }
        
        function loadUserList(ul){
        	var users = groupUserByFirstLetter(ul);
			
			var datas = {
					userList: users,
					baseUrl: sysPath
			};
			
			var render = template.compile(raw);
			var html = render(datas);
			$('#userList').html(html);
			
			$('body').on('click', '.userDetail', function () {
				window.location.href = sysPath + '/user/toUserDetail/' + $(this).data('userid');
			});
        }
        
        function groupUserByFirstLetter(userList){
        	if(userList.length == 0) {
        		return '';
        	}
        	var userListOrderByFirstLetter = new Array();
        	
        	for(var i=0;i<letterArr.length;i++){
        		var currLetter = letterArr[i];
        		var userListOrderBySingleFirstLetter = new Array();
        		for(var j=0;j<userList.length;j++){
        			var user = userList[j];
        			var firstLetters = user.firstLetter;
        			if(firstLetters == undefined || firstLetters == '' || firstLetters == null){
        				continue;
        			}
        			if(firstLetters!=null && firstLetters !=''){
        				var firstLetter = firstLetters.substring(0,1);
        				if(currLetter == firstLetter){
        					userListOrderBySingleFirstLetter.push(user);
        				}
        				
        			}
        		}
        		var tempList = {firstLetter: currLetter, ul : userListOrderBySingleFirstLetter};
        		userListOrderByFirstLetter.push(tempList);
        	}
        	
        	return userListOrderByFirstLetter;
        }
        
        function initTeamSelect(){
        	var teamId = $('#teamList').val();
        	
        	var jData = {
        		id : teamId	
        	};
        	
        	$.ajax(sysPath + '/mobile/team/searchTeam', {
                contentType: 'application/json; charset=utf-8',
                type: 'post',
                data: JSON.stringify(jData),
                success: function (res) {
                	var teamList = res.teamList;
                	var teamListStr = '<li class="active"><a class="teamListLi" href="javascript:void(0);">所有群组</a></li>';
                	for(var i=0;i<teamList.length; i++){
                		teamListStr += '<li><a data-teamid='+teamList[i].teamId+' class="teamListLi" href="javascript:void(0);">'+teamList[i].teamName+'</a></li>';  
                	}
                	$("#teamList").html(teamListStr);
                	
                	$('body').undelegate('.teamListLi', 'click');
                	$('body').delegate('.teamListLi', 'click', function(){
                		$('#teamList > li').removeClass('active');
                		$(this).parent().addClass('active');
                		$('#currChoosenTeamId').val($(this).data('teamid'));
                		getUserByTeamUserName();
                	})
                }
            });
        	 
             
//        	$('body').undelegate('#teamList', 'change');
//        	$('body').delegate('#teamList', 'change', function(){
//        		var teamId = $(this).val();
//        		if(teamId == '') {
//        			getUserByTeamUserName();
//        			return ;
//        		}
//    		 $.ajax(sysPath + "/mobile/team/findTeamById/"+teamId, {
//                 contentType: 'application/json; charset=utf-8',
//                 type: 'GET',
//                 data: {},
//                 success: function (res) {
//                	 userList = res.team.userList;
//                 }
//             });
//                 
//        	});
        }
        
        $('body').on('click', '#searchUserBtn', function () {
        	getUserByTeamUserName();
        });
         $('body').on('keydown', '#searchUserInp', function () {
             if (event.keyCode == 13) {
            	 getUserByTeamUserName();
             }
        });
    });
});