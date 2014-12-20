require(['config'], function() {
    "use strict";
    require(['domready', 'bootstrap', 'module/header'], function() {
        require(['module/chat']);
    	//require(['module/chat'],function(){});
    });

    require([ 'template', 'text!../tpl/portal.tpl', 'jquery', 'syntax', 'module/header' ], function(template, raw) {
    	
    	var type = $('#message_index_type').val();
    	if(type == undefined || type==''){
    		type = 2;
    	}
    	
		loadStreamByType(type, 1);

        $('body').on('click', '.portalItem', function () {
		/*
		$('body').undelegate('.portalItem', 'click');
		$('body').delegate('.portalItem', 'click', function(){
		*/
			$('.portalItem').removeClass('active');
			$(this).addClass('active');

			var type=$(this).attr('data-type');

			changeTab(type, 1);
		});
	});

    function changeTab(type, currPage){
    	
    	$('.portalList').hide();
		$('#portalList'+type).show();

		if($('#portalList'+type).html() == ''){
			loadStreamByType(type, currPage);
		}
    }

	function loadStreamByType(type, currPage){
		
		$('.portalItem').removeClass('active');
    	$($('.portalItem')).each(function(i, v){
    		if($(this).data('type')==type){
    			$(this).addClass('active');
    		}
    	})

		$('.portalList').hide();
		$('#portalList'+type).show();

		var url = sysPath + '/mobile/search/stream/';
		if(type==1){
			url += 'all';
		}else if(type==2){
			url += 'top';
		}else if(type==3){
			url += 'fromMe';
		}else if(type==4){
			url += 'toMe';
		}else if(type==5){
			url = sysPath + $('#fromUrl').val();
		}else if(type==6){
			url = sysPath + '/mobile/notice/list';
		}else if(type==7){
			url = sysPath + '/mobile/search/stream/suggest';
		}

		require(['text!../tpl/portal.tpl', 'jquery', 'syntax', 'module/header' ], function(raw) {
			var jsonData={
				pageNumber : currPage,
				pageSize : 10
			}
			$.ajax(url, {
				contentType : 'application/json; charset=utf-8',
				type : 'POST',
				data : JSON.stringify(jsonData),
				success : function(data) {
					$('#portalMore'+type).remove();
					if(data && data.length > 0){
						if(type==6){
						//公告
						require(['text!../tpl/noticeList.tpl'], function(notice){
							var datas = {
								noticeList : data,
								baseUrl : sysPath
							}
							var render = template.compile(notice);
							var html = render(datas);
							$('#portalList'+type).append(html);
							
							currPage = currPage+1;
							
							var moreBtnHtml = '<a id="portalMore'+type+'" href="javascript:void(0);" class="btn btn-block btn-link lxj-moreStroe-but" data-loading-text="正在载入..." rel="tooltip" data-original-title="载入更多...">更多...</a>';
							$('#portalList'+type).append(moreBtnHtml);
							
							$('body').undelegate('#portalMore'+type, 'click');
							$('body').delegate('#portalMore'+type, 'click', function(){
								loadStreamByType(type, currPage);
							});
						});
					}else{
						//其他
						var datas = {
							streamList : data,
							baseUrl : sysPath,
							type: type
						}
						var render = template.compile(raw);
						var html = render(datas);
						$('#portalList'+type).append(html);
						
						if(data == undefined || data == '' || data.length == jsonData.pageSize){
							currPage = currPage+1;
							
							var moreBtnHtml = '<a id="portalMore'+type+'" href="javascript:void(0);" class="btn btn-block btn-link lxj-moreStroe-but" data-loading-text="正在载入..." rel="tooltip" data-original-title="载入更多...">更多...</a>';
							$('#portalList'+type).append(moreBtnHtml);
							
							$('body').undelegate('#portalMore'+type, 'click');
							$('body').delegate('#portalMore'+type, 'click', function(){
								loadStreamByType(type, currPage);
							});
						}
						
						
						//赞
						$('body').undelegate('.stream_praise', 'click');
						$('body').delegate('.stream_praise', 'click', function(){
							var streamId = $(this).data('streamid');
							streamPraise(streamId, $(this));
						});
						
						}
					}else{
						if($('#portalList'+type).html() == ''){
							$('#portalList'+type).append('<li class="article-item clearfix stream-item"><p class="text-center lead">暂无内容!</p></li>');
						}
					}
				}
			});
		});
		
		if(type==1 && $('#topCarousel').length == 0){
			require([ 'template', 'text!../tpl/notice.tpl', 'jquery', 'syntax', 'module/header' ], function(template, rawTpl) {
		        var render,
		            html,
		            finalData = {};

		    	$.ajax(sysPath + '/mobile/notice/top5Notices/1', {
					contentType : 'application/json; charset=utf-8',
					type : 'GET',
					data : {},
					success : function(data) {
						finalData.data = data;

		                $.getJSON(sysPath + '/mobile/webUser/currMonthBirthUsers', function (rawData) {
		                    $.each(rawData, function (idx, ele) {
		                        finalData.data.push(ele);
		                    });

		                    render = template.compile(rawTpl);
		                    html = render(finalData);
		                    $('#portalList1').prepend(html);
		                });
					}
		        });
		    	
		    	$('body').undelegate('.noticeDetail', 'click');
		    	$('body').delegate('.noticeDetail', 'click', function(){
		    		loadStreamByType(6, 1);
		    	});
			});
		}
	}

	function streamPraise(streamId, element){
		var jdata = {
			"refId" : streamId,
		    "refType": 1
		};
		$.ajax(sysPath + '/mobile/praise', {
			contentType : 'application/json; charset=utf-8',
			type : 'POST',
			data : JSON.stringify(jdata),
			success : function(data) {
				if(data && data.code == '10000'){
					var currCount = $(element).find('small').html();
					$(element).find('small').html(parseInt(currCount) + 1);
				}else{
					var obj = $.parseJSON(data);
					showMsg(obj.msg);
				}
			}});
	}

	function showMsg(message){
		require([ 'jquery-msg', 'jquery', 'syntax', 'module/header' ], function(msg) {
			msg({content: message});
		})
	}

//	function initComment(streamId, type){
//			if($('#commentList_'+type+'_'+streamId).html() == ''){
//				require([ 'text!../tpl/comment.tpl' ,'jquery-msg', 'jquery', 'syntax', 'module/header' ], function(raw, msg) {
//					var jdata = {
//							rootId:streamId,
//							pageInfo : {
//								pageSize : 1000
//							}
//					};
//					$.ajax(sysPath + '/mobile/comment/findByStream', {
//						contentType : 'application/json; charset=utf-8',
//						type : 'POST',
//						data : JSON.stringify(jdata),
//						success : function(data) {
//							console.log(data);
//							var m = getMap();
//							for(var i=0; i<data.length; i++){
//								m.put(data[i].id, data[i]);
//							}
//							for(var i=0; i<data.length; i++){
//								var comment = data[i];
//								var nd = wrapParentComments(comment.refHistoryId, m);
//
//								var parentCommentStr = nd.htmlStr;
//								comment.parentCommentStr = parentCommentStr;
//								comment.floor = nd.floor == undefined?1 : nd.floor;
//							}
//							var datas = {
//									commentList : data,
//									baseUrl : sysPath
//							}
//							var render = template.compile(raw);
//							var html = render(datas);
//
//							$('#commentList_'+type+'_'+streamId).append(html);
//
//							$('body').undelegate('.comment-praise', 'click');
//							$('body').delegate('.comment-praise', 'click', function(){
//								var element = $(this);
//								var commentid = $(this).data('commentid');
//								
//								var jdata={
//										refId : commentid,
//										refType : 3
//								}
//								$.ajax(sysPath + '/mobile/praise', {
//									contentType : 'application/json; charset=utf-8',
//									type : 'POST',
//									data : JSON.stringify(jdata),
//									success : function(data) {
//										var currCount = $(element).find('small').html();
//										$(element).find('small').html(parseInt(currCount) + 1);
//									}
//								});
//							});
//						}
//					});
//				})
//			}else{
//				$('#commentList_'+type+'_'+streamId).toggle();
//			}
//	}

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
			str += '</a><div class="media-body"><div class="media-meta">';
			str += '<div class="date pull-left"><small>'+comment.createDate+'</small></div>';
			str += '<div class="floor pull-right"><small>#'+floorindex+'</small></div>';
			str += '</div>';
			str += comment.content;
			str += '</div><div class="media-footer">';
			str += '<ul class="inline pull-right">';
			str += '<li><a href="javascript:void(0);" data-commentid='+comment.id+' class="btn btn-link btn-small comment-praise"><i class="fa fa-thumbs-o-up fa-fw"></i>赞 <small>'+comment.praiseCount+'</small></a></li>';
			str += '<li><a href="javascript:void(0);" data-commentid='+comment.id+' class="btn btn-link btn-small comment-comment"><i class="fa fa-comments-o fa-fw"></i>评论 <small>123</small></a></li>';
//			str += '<li><a href="javascript:void(0);" data-commentid='+comment.id+' class="btn btn-link btn-small comment-share"><i class="fa fa-retweet fa-fw"></i>分享 <small>123</small></a></li>';
			str += '</ul></div>';
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
	 require(['rightbar', 'bootstrap', 'syntax'], function (rightbar) {
        rightbar.weather();
        rightbar.stock();
        rightbar.announce();
    });
});
