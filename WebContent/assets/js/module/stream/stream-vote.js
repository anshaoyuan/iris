define(function(){
	var titleId;
	
	//显示投票详情
	function showVote(el,vote){
		var options = [];
		
		if(vote.voteOptionList){
			for(var i = 0;i < vote.voteOptionList.length ;i++){
				var voteOption = vote.voteOptionList[i];
				var option = {"id" : voteOption.id , "title" : voteOption.content ,"count" : voteOption.count ,"selected" : voteOption.selected?1:0,"voter" : voteOption.voter};
				options[i] = option;
			}
		}
		
		var voteData = {
				"view" : "show",
				"id" : vote.id,
				"options" : options,
				"theme" : '投票标题',
				"optionsType" : vote.voteType,
				"voteCallBack" : voteCallBack,
				"isVoted" : vote.voted?1:0,
				"total" : vote.numberPeople,
				"showTheme" : false,
				"creator" : $userId == vote.createBy
		};
		
//		if(o.isOrgStream){
//			voteDate.isVoted = true;
//			voteDate.isObserved = true;
//		}
		
		$.vote(voteData);
		
		voteData.voteDiv.appendTo(el);
	}
	
	//投票之后的回调函数
	function voteCallBack(data){
		var parOptions = [];
		for(var i = 0; i < data.options.length;i++){
			if(data.options[i].selected){
				parOptions.push(data.options[i].id);
			}
		}

		var postData = {
				id : data.id,
				voteOpionIdArr : parOptions,
				anonymity : data.anonymity
		}
		
		$.ajax({
			"url" : sysPath + "/mobile/vote/reply",
			"dataType" : "json",
			"type" : "post",
			"contentType" : 'application/json',
			"data" : JSON.stringify(postData),
			"success" : function(resultData){
				if(resultData.code){
					alert(resultData.msg);
					return;
				}
				
				var options = [];
				if(resultData.voteOptionList){
					for(var i = 0;i < resultData.voteOptionList.length ;i++){
						var voteOption = resultData.voteOptionList[i];
						var option = {"voter" : voteOption.voter,"id" : voteOption.id , "title" : voteOption.content ,"count" : voteOption.count ,"selected" : voteOption.selected};
						options[i] = option;
					}
				}
				
				var voteShowData = {
						id : resultData.id,
						options : options,
						theme : '投票标题',
						optionsType : resultData.voteType,
						total : resultData.numberPeople,
						"showTheme" : false
				};
				
				voteShowData.view = "result";
				voteShowData.voteDiv = data.voteDiv;
				$.vote(voteShowData); 
			}
		});
	}
	
	return showVote;
});