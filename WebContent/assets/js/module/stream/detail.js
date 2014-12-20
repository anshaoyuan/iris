requirejs.config({baseUrl : sysPath + '/assets/js'});
require(['config'], function() {
	function showMsg(config){
		require([ 'jquery-msg'], function(msg) {
			msg(config);
		})
	};
	require(['template', 'text!../tpl/stream_detail.html','jquery-msg','bootstrap',
					'syntax','plug-in/lightbox/lightbox','wysihtml5'], function(template, streamTpl,msg) {
		var localEle = {
				voteEle : '.stream-vote',
				voteTotalCount : '.stream-vote .vote-total-count',
				voteOptionList : '.stream-vote .vote-option-list',
				voteResultEle : '.stream-vote-result',
				voteHandler : '.stream-vote .vote-handler',
				voteAnonymity : '.stream-vote .vote-anonymity-ckb'
		};
				$(document).ready(function() {
					var streamId = $('#post-id').val();
					if (streamId && streamId.length) {
						loadStream(streamId);
					}

					$(document).on('click', '.schedule-choice-btn', function() {
						var that = $(this);
						$.ajax({
									url : sysPath + '/mobile/schedule/reply',
									type : 'post',
									dataType : 'json',
									contentType : 'application/json',
									data : JSON.stringify({
												id : that.parent().attr("data-scheduleId"),
												reply : that.attr('data-mark')
											}),
									success : function(data) {
										if (data.code != '10000') {
											msg({content : data.msg});
										} else {
											msg({content : '操作成功!'});
										}
									}
								})
					});

					$(document).on('click', '#transmit-btn', function() {
						var streamId = $(this).attr('stream-id');
						location.href = sysPath + "/mobile/stream/totransmit/"
								+ streamId;
					});
					
					$(document).on('click','.feed-btn',function(event){
						event.preventDefault();
						var that = $(this);
						$.ajax({
							url : sysPath + '/mobile/praise',
							type : 'post',
							dataType : 'json',
							contentType : 'application/json',
							data : JSON.stringify({
										refId : that.attr('data-streamId'),
										refType : 1
									}),
							success : function(data) {
								if (data.code != '10000') {
									msg({content : data.msg});
								} else {
									that.find('.praiseCount').text(parseInt(that.attr('data-feedCount')) + 1);
								}
							}
						});
					});
					
					$(document).on('click','.transferWork',function(){
						var that = $(this);
						$.ajax({
							url : sysPath + '/mobile/stream/transferWork/' + that.attr('data-streamId'),
							type : 'get',
							dataType : 'json',
							contentType : 'application/json',
							success : function(data) {
								if (data.code != '10000') {
									msg({content : data.msg});
								} else {
									msg({content : '提醒发送成功!'});
								}
							}
						});
					});
					//给博文加评论
					$(document).on('click', '.stream_comment', function (){
						var me=$(this);
						var parentDiv=me.parent().parent().parent();
						var div=$('div.addCommentDivInput',parentDiv);
						if(div.html() != ''){
							$('.addCommentDivInput').html('');
						}else{
							var html=createAddCommentDiv();
							$('div.addCommentDivInput',parentDiv).html(html);
							dealWithHtml5();
							$('.refId',parentDiv).val(streamId);
							$('.refType',parentDiv).val(1);
							$('.rootId',parentDiv).val(streamId);
						}
					});
					
					//添加评论
					$('body').undelegate('a.addCommentSubmitbtn', 'click');
					$('body').delegate('a.addCommentSubmitbtn', 'click',function() {
						var parentDiv=$(this).parent();
						var content=$('.commentContent',parentDiv).wysihtml5('getValue');
						var rootId= $('.rootId',parentDiv).val();
						if(!content){
							showMsg({
								content : '评论内容不能为空'
							});
							return;
						}
						var odata={
							content : content,
							refId : $('.refId',parentDiv).val(),
							refType : $('.refType',parentDiv).val(),
							rootId : rootId
						}
						$.ajax(sysPath + '/mobile/comment', {
	                        contentType: 'application/json; charset=utf-8',
	                        data: JSON.stringify(odata),
	                        type: 'post',
	                        dataType : 'json',
	                        success: function (rawData) {
	                           var config={cancel : false};
	                           if(rawData.code=='10000'){
		                           config.content='评论成功';
		                           var countDiv=$('.stream_comment_count_'+rootId);
		                           countDiv.html(countDiv.html()-1+2);
		                           $('.addCommentDivInput').html('');
		                           initComment(rootId);
	                           }else{
	                           	   config.content=rawData.msg;
	                           }
	                           showMsg(config);
	                        }
	                    });
					});
					
					$(document).on('click','.del-btn',function(){
						var that = $(this);
						
						msg({content : '确定删除该消息吗?',confirm : true,cancel : true,clickOk: function(){
							$.ajax({
								url : sysPath + '/mobile/stream/del/' + that.attr('data-streamId'),
								type : 'get',
								dataType : 'json',
								contentType : 'application/json',
								success : function(data) {
									if (data.code != '10000') {
										msg({content : data.msg});
									} else {
										msg({content : '删除成功!'});
										setTimeout(function(){
			        						window.location.href = sysPath + '/mobile/index';
			        					},2000);
									}
								}
							});
						}});
						
					});
				});
				//处理富文本框
				function dealWithHtml5(){
					$('.commentContent').wysihtml5({
			    			'html' : false,
			    			'font-styles' : false,
			    			'emphasis' : false,
			    			'lists' : false,
			    			'image' : false,
			    			'color' : false,
			    			'upload' : false,
			    			'link' : false,
			    			'id':'pubhtml5'
			    		});
			    		$('.comment-face').SinaEmotion($('.comment-face'),{
							 todo:function(s,uSinaEmotionsHt){
	                			 var t=s;
	                			 var src='';
	                				if(typeof (s) != "undefined") {
	                					var sArr = s.match(/\[.*?\]/g);
	                					for(var i = 0; i < sArr.length; i++){
	                						if(uSinaEmotionsHt.containsKey(sArr[i])) {
	                							var reStr = "<img face-literal='"+ sArr[i] +"' src=\"" + uSinaEmotionsHt.get(sArr[i]) + "\" height=\"22\" width=\"22\" />";
	                							src=uSinaEmotionsHt.get(sArr[i]);
	                							s = s.replace(sArr[i], reStr);
	                						}
	                					}
	                				}
	                			$('.commentContent').wysihtml5('setValue',s);	
	                		 }
						});
				};
				function loadStream(id) {
					$.ajax({
						url : sysPath + '/mobile/stream/' + id,
						type : 'get',
						dataType : 'json',
						success : function(data) {
							var receiverList = data.toSource
									? processReceiver(data)
									: null;
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
							$('#post-body').html(streamHtml);
							
							warpImg();
							
							if(data.vote){
								initVote(data.vote);
							}
							
							//展开评论
							initComment(id);
						}
					});
				}
				
				function warpImg(){
					$.each($('#post-body').find('img[img-max]'),function(i,o){
					    $(o).wrap('<a href="'+$(o).attr('img-max')+'" rel="lightbox"></a>');
					});
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
						bindVoteBtn(vote);
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
									liHtml += '<li>'+ v +'</li>'
								});
								$(localEle.voteResultEle).find('.vote-option-voters:eq(' + index +')').html(liHtml);
							});
						}
					}
				}
				
				function bindVoteBtn(vote){
					$(localEle.voteHandler).on('click','button',function(){
						var anonymity = $(localEle.voteAnonymity).attr('checked') == 'checked' ? 1 : 0;
						
						var voteOpionIdArr = [];
						
						$(localEle.voteOptionList + ' input[name=vote-choice]').each(function(index,val){
							if($(this).attr('checked') == 'checked'){
								voteOpionIdArr.push($(this).val());
							}
						});
						
						if(voteOpionIdArr.length == 0){
							msg({content : '请先选择投票项!'});
							return;
						}
						
						var postData = {
								id : vote.id,
								voteOpionIdArr : voteOpionIdArr,
								anonymity : anonymity
						}
						
						$.ajax({
							"url" : sysPath + "/mobile/vote/reply",
							"dataType" : "json",
							"type" : "post",
							"contentType" : 'application/json',
							"data" : JSON.stringify(postData),
							"success" : function(data){
								if(data.code){
									msg({content : data.msg});
								}else{
									data.voteTotal += voteOpionIdArr.length;
									data.numberPeople += 1;
									processVoteOption(data);
									processVoteResult(data);
								}
							}
						});
					});
				}
				
				function initComment(streamId){
						require([ 'text!../tpl/comment.tpl' ,'jquery-msg', 'jquery', 'syntax', 'module/header' ], function(raw, msg) {
							var jdata = {
									rootId:streamId,
									pageInfo : {
										pageSize : 1000
									}
							};
							$.ajax(sysPath + '/mobile/comment/findByStream', {
								contentType : 'application/json; charset=utf-8',
								type : 'POST',
								data : JSON.stringify(jdata),
								success : function(data) {
									var m = getMap();
									for(var i=0; i<data.length; i++){
										m.put(data[i].id, data[i]);
									}
									for(var i=0; i<data.length; i++){
										var comment = data[i];
										var nd = wrapParentComments(comment.refHistoryId, m);

										var parentCommentStr = nd.htmlStr;
										comment.parentCommentStr = parentCommentStr;
										comment.floor = nd.floor;
									}
									var datas = {
											commentList : data,
											baseUrl : sysPath,
											streamId : streamId
									}
									var render = template.compile(raw);
									var html = render(datas);

									$('#commentList_'+streamId).html(html);

									$('body').undelegate('.comment-praise', 'click');
									$('body').delegate('.comment-praise', 'click', function(){
										var element = $(this);
										var commentid = $(this).data('commentid');
										
										var jdata={
												refId : commentid,
												refType : 3
										}
										$.ajax(sysPath + '/mobile/praise', {
											contentType : 'application/json; charset=utf-8',
											type : 'POST',
											data : JSON.stringify(jdata),
											dataType : 'json',
											success : function(data) {
												if('10000'==data.code){
													var currCount = $(element).find('small').html();
													$(element).find('small').html(parseInt(currCount) + 1);
												}else{
													showMsg({
														content : data.msg
													});
												}
											}
										});
									});
								}
							});
						})
				}
				
				$('body').on('click','a.comment-comment',function(){
					var me=$(this);
					var commentId=me.data('commentid');
					var streamId=me.data('streamid');
					var parentDiv = me.parent().parent().parent().parent();
					var div=$('div.addCommentDivInput',parentDiv);
					if(div.html() != ''){
						$('.addCommentDivInput').html('');
					}else{
						var html=createAddCommentDiv();
						$('div.addCommentDivInput',parentDiv).html(html);
						$('.refId',parentDiv).val(commentId);
						$('.refType',parentDiv).val(2);
						$('.rootId',parentDiv).val(streamId);
						dealWithHtml5();
					}
				});

				//处理父评论
				function wrapParentComments(commentHistoryId, map, floorindex){

					if(commentHistoryId == null){ return '';}
					if(floorindex == undefined){
						floorindex = 1;
					}
					var coIndex = commentHistoryId.lastIndexOf(',');
					var currCommentId = '';
					var otherCommentIds =  '';
					if(coIndex != -1){
						currCommentId = commentHistoryId.substring(coIndex+1);
						otherCommentIds =  commentHistoryId.substring(0, coIndex);
					}else{
						currCommentId = commentHistoryId;
					}
					var comment = map.get(currCommentId);
					var str = '<div class="media comments">';
					str += '<div class="media-body-wrapper">';

					if(comment == undefined || comment == null){
						//当前评论id
						if(otherCommentIds != null && otherCommentIds != '') {
							var nd = wrapParentComments(otherCommentIds, map, floorindex)
							str += nd.htmlStr;
							floorindex = nd.floor;
						}
						str += '该评论已被删除!';
						str += '<div class="floor pull-right"><small>#'+floorindex+'</small></div>';
					}else{
						//当前评论id
						if(otherCommentIds != null && otherCommentIds != '') {
							var nd = wrapParentComments(otherCommentIds, map, floorindex)
							str += nd.htmlStr;
							floorindex = nd.floor;
						}
						str += '<a class="pull-left" href="#">';
						str += '<img class="media-object" src="'+sysPath+'/'+comment.userImgUrl+'" alt="'+comment.createByName+'">';
						str += comment.createByName;
						str += '</a><div class="media-body1"><div class="media-meta">';
						str += '<div class="date pull-left"><small>'+comment.createDate+'</small></div>';
						str += '<div class="floor pull-right"><small>#'+floorindex+'</small></div>';
						str += '</div>';
						str += comment.content;
						str += '</div><div class="media-footer">';
						str += '<ul class="inline pull-right">';
						str += '<li><a href="javascript:void(0);" data-commentid='+comment.id+' class="btn btn-link btn-small comment-praise"><i class="fa fa-thumbs-o-up fa-fw"></i>赞 <small>'+comment.praiseCount+'</small></a></li>';
						str += '<li><a href="javascript:void(0);" data-commentid='+comment.id+' data-streamid='+comment.rootId+' class="btn btn-link btn-small comment-comment"><i class="fa fa-comments-o fa-fw"></i>评论 </a></li>';
						str += '</ul></div><div class="addCommentDivInput"></div>';
					}
					str += '</div>';
					str += '</div>';
					var data = {
						htmlStr : str,
						floor : floorindex + 1
					}
					return data;

				}

				//定义简单Map
				function getMap() {//初始化map_,给map_对象增加方法，使map_像Map
			         var map_ = new Object();
			         map_.put = function(key, value) {
			             map_[key+'_'] = value;
			         };
			         map_.get = function(key) {
			             return map_[key+'_'];
			         };
			         map_.remove = function(key) {
			             delete map_[key+'_'];
			         };
			         map_.keyset = function() {
			             var ret = "";
			             for(var p in map_) {
			                 if(typeof p == 'string' && p.substring(p.length-1) == "_") {
			                     ret += ",";
			                     ret += p.substring(0,p.length-1);
			                 }
			             }
			             if(ret == "") {
			                 return ret.split(",");
			             } else {
			                 return ret.substring(1).split(",");
			             }
			         };
			         return map_;
				}
			});
	//创建评论输入框
	function createAddCommentDiv(){
		$('.addCommentDivInput').html('');
		var div='<div class="addcommentInputDiv span6">';
		div+='评论内容：<textarea id="descripe" class="commentContent" rows="5" name="descripe" style="width:100%;"></textarea><br>';
		div+='<a class="comment-face">表情</a>'
		div+='<input type="hidden" class="refId">';
		div+='<input type="hidden" class="refType">';
		div+='<input type="hidden" class="rootId">';
		div+='</div>';
		div+='<a class="btn btn-primary addCommentSubmitbtn pull-right">添加评论</a>';
		return div;
	}
    require(['rightbar', 'bootstrap', 'syntax'], function (rightbar) {
        rightbar.weather();
        rightbar.stock();
        rightbar.announce();
    });
});
