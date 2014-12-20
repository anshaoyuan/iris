require(['config'], function() {
	'use strict';
	function showMsg(config){
		require([ 'jquery-msg'], function(msg) {
			msg(config);
		})
	}
	require(['template', 'domready', 'syntax','wysihtml5'], function(template) {
		createHtml5Input();
		//提交评论
		$('body').on('click', 'a.addCommentSubmitbtn', function() {
			var me = $(this);
			var imageId = $('#commentImageId').val();
			var imageOwnId = $('#commentImageOwnId').val();
			var commentContent = $('.commentContent').val();
			var cdata = {
				imageId : imageId,
				imageOwnId : imageOwnId,
				commentContent : commentContent
			};
			var mydata = JSON.stringify(cdata);
			$.ajax(sysPath + '/console/imageFolder/addImageComment', {
				contentType : 'application/json; charset=utf-8',
				type : 'post',
				dataType : 'json',
				data : mydata,
				success : function(res) {
					var comment = res.commnet;
					if(comment){
						showMsg({'content':'评论成功'});
						createHtml5Input();
						getImageComment(imageId);
					}
				}
			});
		});
	function getImageComment(imageId){
		$.ajax(sysPath + '/console/imageFolder/imageById/'+imageId, {
			contentType : 'application/json; charset=utf-8',
			type : 'get',
			dataType : 'json',
			success : function(res) {
				if(res.image){
					var data={
						commentList : res.image.imageList
					};
					require(['text!../tpl/imageComment.html'], function( raw) {
						var render = template.compile(raw);
						var html = render(data);
						$('#imageCommentListDiv').html(html);
					});
				}
			}
		});
	}
	//生成富文本框
	function createHtml5Input(){
		var str='<div class="addcommentInputDiv span8 offset2">';
		str+='评论内容：';
		str+='<textarea id="descripe" class="commentContent" rows="5" name="descripe" style="width: 100%;"> </textarea>';
		str+='<br> <a class="comment-face">表情</a>';
		str+='<input type="hidden" class="refId">';
		str+='<input type="hidden" class="refType">';
		str+='<input type="hidden" class="rootId">';
		str+='<a class="btn btn-primary addCommentSubmitbtn pull-right">添加评论</a>';
		str+='</div>';
		$('#imageCommentInputDiv').html(str);
		dealWithHtml5();
	};
	// 处理富文本框
	function dealWithHtml5() {
		$('.commentContent').wysihtml5({
			'html' : false,
			'font-styles' : false,
			'emphasis' : false,
			'lists' : false,
			'image' : false,
			'color' : false,
			'upload' : false,
			'link' : false,
			'id' : 'pubhtml5'
		});
		$('.comment-face').SinaEmotion($('.comment-face'), {
			todo : function(s, uSinaEmotionsHt) {
				var t = s;
				var src = '';
				if (typeof(s) != "undefined") {
					var sArr = s.match(/\[.*?\]/g);
					for (var i = 0; i < sArr.length; i++) {
						if (uSinaEmotionsHt.containsKey(sArr[i])) {
							var reStr = "<img face-literal='"
								+ sArr[i]
								+ "' src=\""
								+ uSinaEmotionsHt.get(sArr[i])
								+ "\" height=\"22\" width=\"22\" />";
							src = uSinaEmotionsHt.get(sArr[i]);
							s = s.replace(sArr[i], reStr);
						}
					}
				}
				$('.commentContent').wysihtml5('setValue', s);
			}
		});
	};
	});
});