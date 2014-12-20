require(['config'], function () {
    "use strict";
    
    function getUserDetail(userId, currUserId){
    	var url=sysPath+'/mobile/webUser/show';
    	if(userId != null && userId != ''){
    		url+='/'+userId;
    	}else{
    		url+='/0';
    	}
    	require(['text!../tpl/userDetail.tpl', 'bootstrap'], function (raw) {
        	$.ajax(url, {
                contentType: 'application/json; charset=utf-8',
                type: 'get',
                success: function (res) {
                	var user = res.user;
                	var groupName = initGroupNumber(user.groupNumber);
                	var clubTitleName = initClubTitle(user.clubTitle);
                	var datas = {
    						baseUrl : sysPath,
    						u : user,
    						currUserId: currUserId,
    						hasBindKp: res.result,
    						groupName : groupName,
    						clubTitleName : clubTitleName
    				}
    				var render = template.compile(raw);
                    var html = render(datas);
                    $('#userDetail').html(html);	
    			}
    		});
    	});
    }
    
    function initClubTitle(clubTitle){
    	if(clubTitle == null || clubTitle == ''){
    		return '无';
    	}
    	
    	var clubTitleName = '';
    	switch(clubTitle){
    	case "1":
    		clubTitleName='主任';
    		break;
    	case "2":
    		clubTitleName='文体协会会长';
    		break;
    	case "3":
    		clubTitleName='书画协会会长';
    		break;
    	case "4":
    		clubTitleName='通讯协会会长';
    		break;
    	case "5":
    		clubTitleName='文体协会理事';
    		break;
    	case "6":
    		clubTitleName='体育协会理事';
    		break;
    	case "7":
    		clubTitleName='书画协会理事';
    		break;
    	case "8":
    		clubTitleName='通讯协会理事';
    		break;
    	}
    	return clubTitleName;
    }
    
    function initClassTitle(classTitle){
    	if(classTitle == null || classTitle == ''){
    		return '无';
    	}
    	
    	var classTitleName = '';
    	
    	switch(classTitle){
    	case "1":
    		classTitleName='书记';
    		break;
    	case "2":
    		classTitleName='副书记';
    		break;
    	case "3":
    		classTitleName='中组部联络员';
    		break;
    	case "4":
    		classTitleName='学习委员';
    		break;
    	case "5":
    		classTitleName='文体委员';
    		break;
    	case "6":
    		classTitleName='生活委员';
    		break;
    	case "7":
    		classTitleName='学习委员助理1';
    		break;
    	case "8":
    		classTitleName='学习委员助理2';
    		break;
    	case "9":
    		classTitleName='文体委员助理1';
    		break;
    	case "10":
    		classTitleName='文体委员助理2';
    		break;
    	case "11":
    		classTitleName='生活委员助理1';
    		break;
    	case "12":
    		classTitleName='生活委员助理2';
    		break;
    	case "13":
    		classTitleName='安全员';
    		break;
    	case "14":
    		classTitleName='一组组长';
    		break;
    	case "15":
    		classTitleName='一组副组长';
    		break;
    	case "16":
    		classTitleName='二组组长';
    		break;
    	case "17":
    		classTitleName='二组副组长';
    		break;
    	case "18":
    		classTitleName='三组组长';
    		break;
    	case "19":
    		classTitleName='三组副组长';
    		break;
    	case "20":
    		classTitleName='四组组长';
    		break;
    	case "21":
    		classTitleName='四组副组长';
    		break;
    	}
    	return classTitleName;
    }
    
    function initGroupNumber(groupNumber){
    	if(groupNumber == null || groupNumber == ''){
    		return '无';
    	}
    	var groupName='';
    	switch(groupNumber){
    	case "1":
    		groupName='第一组';
    		break;
    	case "2":
    		groupName='第二组';
    		break;
    	case "3":
    		groupName='第三组';
    		break;
    	case "4":
    		groupName='第四组';
    		break;
    	}
    	return groupName;
    }
    require(['template','jquery','syntax','module/header', 'bootstrap'], function (template) {
    	
    	getUserDetail($('#userId').val(), $('#currUserId').val());
    });
    
});