requirejs.config({baseUrl : sysPath + '/assets/js'});
require(['config'], function() {
	require(['template', 'text!../tpl/admin_stream_detail.html','bootstrap','syntax'], function(template, streamTpl) {
		
		var localEle = {
				voteEle : '.stream-vote',
				voteTotalCount : '.stream-vote .vote-total-count',
				voteOptionList : '.stream-vote .vote-option-list',
				voteResultEle : '.stream-vote-result',
				voteHandler : '.stream-vote .vote-handler',
				voteAnonymity : '.stream-vote .vote-anonymity-ckb'
		};
		
		$(document).ready(function() {
			var streamId = $('#stream-id').val();
			if (streamId && streamId.length) {
				loadStream(streamId);
			}
		});
		
		function loadStream(id) {
			$.ajax({
				url : sysPath + '/console/stream/' + id,
				type : 'get',
				dataType : 'json',
				success : function(data) {
					var receiverList = data.toSource
					? processReceiver(data) : null;
					
					if (data.schedule) {
						var schedule = processSchedule(data.schedule);
						$.extend(data.schedule, schedule);
					}
					
					if(data.praisePeople && data.praisePeople.indexOf(',') == 0){
						data.praisePeople = data.praisePeople.substr(1);
					}
					
					$.extend(data, {
						$userId : $userId,
						sysPath : sysPath,
						$roleName : $('#login_role_name').val(),
						receiverList : receiverList
					});
					var render = template.compile(streamTpl);
					var streamHtml = render(data);
					
//					$('#stream-title').text(data.streamTitle);
//					$('#stream-content').html(data.streamContent);
//					$('#stream-sender').append($('<b>发件人：</b>')).append($('<span>' + data.createByName + '</span>'));
//					
//					$('#stream-receiver').append($('<b>收件人：</b>'));
//					
//					$('#stream-createDate').append($('<b>发表日期：</b>')).append($('<span>' + data.createDate + '</span>'));
//					
//					if(receiverList && receiverList.length){
//						for(var i = 0;i < receiverList.length;i++){
//							if(i == 0){
//								$('#stream-receiver').append($('<span>'+ receiverList[i].name +'</span>'));
//							}else{
//								$('#stream-receiver').append($('<span>&nbsp;&nbsp;'+ receiverList[i].name +'</span>'));
//							}
//						}
//					}else{
//						$('#stream-receiver').append($('<span>全部人</span>'));
//					}
					
					$('#post-body').html(streamHtml);
					
					if(data.vote){
						initVote(data.vote);
					}
					
				}
			});
		}
		
		function processSchedule(schedule) {
			var maybe = [];
			var attend = [];
			var sitOut = [];
			var currUser;
			if (schedule.scheduleUserList) {
				for (var i = 0; i < schedule.scheduleUserList.length; i++) {
					var user = schedule.scheduleUserList[i];
					if (user.reply == '1') {
						attend.push(user);
					} else if (user.reply == '2') {
						sitOut.push(user);
					} else if (user.reply == '3') {
						maybe.push(user);
					}

					if (user.userId == $userId) {
						currUser = user;
					}
				}
			}

			return {
				maybe : maybe,
				attend : attend,
				sitOut : sitOut,
				currUser : currUser
			};
		}
		
		function initVote(vote){
			processVoteOption(vote);
			processVoteResult(vote);
		}
		
		function processVoteOption(vote){
			if($userId == vote.createBy || vote.voted){
				$(localEle.voteTotalCount).text('已有' + vote.numberPeople + '人参与投票').removeClass('hide');
				$(localEle.voteHandler).addClass('hide');
				
				$(localEle.voteOptionList + ' input[name=vote-choice]').attr('disabled',true);
				$.each(vote.voteOptionList,function(index,val){
					if(val.selected){
						$(localEle.voteOptionList + ' input[name=vote-choice]:eq(' + index + ")").attr('checked',true);
					}
				});
			}else{
				$(localEle.voteHandler).removeClass('hide');
			}
		}
		
		function processVoteResult(vote){
			if($userId == vote.createBy || vote.voted){
				$(localEle.voteResultEle).removeClass('hide');
				
				$.each(vote.voteOptionList,function(index,val){
					var percent = parseInt((val.count / vote.voteTotal) * 1000) / 10;
					$(localEle.voteResultEle).find('.vote-option-progress-bar:eq(' + index + ')')
						.attr('title',val.count + '/' + percent + '%')
						.css('width',percent + '%');
				});
				
				if($userId == vote.createBy){
					$(localEle.voteResultEle).find('.vote-option-voter-btn').removeClass('hide');
					
					$.each(vote.voteOptionList,function(index,val){
						if(!val.voter){
							return;
						}
						var liHtml = '';
						$.each(val.voter.split('#'),function(i,v){
							liHtml += '<li>'+ v +'</li>';
						});
						$(localEle.voteResultEle).find('.vote-option-voters:eq(' + index +')').html(liHtml);
					});
				}
			}
		}
				
		function processReceiver(data) {
			var receiverList = data.toSource.split(',');
			var receivers = [];
			for (var i = 0; i < receiverList.length; i++) {
				var receiver = receiverList[i].split('=');
				var type = receiver[0].indexOf('!') == 0
				? 'team'
						: 'user';
				var name = receiver[1];
				name = type == 'user' ? name : '#' + name
						+ '#';
				var url = type == 'user' ? sysPath + '/user/toUserDetail/' + receiver[0] : sysPath + '/mobile/team/list';
				receivers.push({
					name : name,
					url : url
				});
			}
			return receivers;
		}
	});
});
