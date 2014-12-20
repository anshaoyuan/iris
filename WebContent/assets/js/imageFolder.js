require(['config'], function() {
	"use strict";
	function showMsg(config){
		require([ 'jquery-msg'], function(msg) {
			msg(config);
		})
	}
	function folderListinit(foldertype) {
        require(['text!../tpl/imageFolderList.html!strip'], function (raw) {
            $.ajax(sysPath + '/mobile/imageFolder/myfolder/' + foldertype, {
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'get',
                cache : false,
                success: function (rawdata) {
                    var data = {
                        folderList: rawdata.folders,
                        sysPath: sysPath
                    };
                    var render = template.compile(raw);
                    var html = render(data);
                    $('#myImageFolderListDiv').html(html);
                    if (3 === foldertype) {
                        $('.imageFoldernav_system').removeClass('active');
                        $('.imageFoldernav_mine').addClass('active');
                        $('.imagefolderTypeSapn').html('我的相册');
                        $('#newFolderBtn').removeClass('hide');
                    } else if (1 === foldertype) {
                        $('.imageFoldernav_mine').removeClass('active');
                        $('.imageFoldernav_system').addClass('active');
                        $('.imagefolderTypeSapn').html('系统相册');
                        $('#newFolderBtn').addClass('hide');
                        $('.action').remove();
                    }
                }
            });
        });
	}
	// 显示我的相册
	require(['template', 'syntax', 'bootstrap'], function(
			template) {
		folderListinit(3);
		
		//跳转到我的相册
		$('body').undelegate('a.toMineImageFolderLink', 'click');
		$('body').delegate('a.toMineImageFolderLink', 'click', function(){
			folderListinit(3);
			$('#imageFolderType').val(3);
		});
		
		//跳转到系统相册
		$('body').undelegate('a.toSystemImageFolderLink', 'click');
		$('body').delegate('a.toSystemImageFolderLink', 'click', function(){
			folderListinit(1);
			$('#imageFolderType').val(1);
		});
		
		// 提交创建相册信息
		$('body').undelegate('a.saveImageFolderBtn', 'click');
		$('body').delegate('a.saveImageFolderBtn', 'click', function() {
					var modal = $('#newFolderForm');
					var folderName = $('.createImageFolderName', modal).val();
					//var remark = $('.createImageFolderRemark', modal).val();
					var foldertype = $('.folderType',modal).val();
					var dataobj = {
							folderName : folderName,
							folderType : foldertype
						}
					var mydata = JSON.stringify(dataobj);
					$.ajax(sysPath + '/mobile/imageFolder/addImageFolder', {
								contentType : 'application/json; charset=utf-8',
								dataType : 'json',
								type : 'post',
								cache : false,
								data : mydata,
								success : function(res) {
									if ('10000' === res.code) {
										folderListinit(3);
										modal.modal('hide');
									}
								}
							});
				});
		// 显示相册里的相片
		$('body').undelegate('a.myImageFolderNav', 'click');
		$('body').delegate('a.myImageFolderNav', 'click', function() {
					var me = $(this);
					var folderId = me.data('folderid');
					var folderTyoe=me.data('foldertype');
					findImageFolderById(folderId, me.data('path'));
		});
		function findImageFolderById(folderId, folderPath) {
			require(['text!../tpl/imageList.html'], function( raw) {
				$.ajax(	sysPath + '/mobile/imageFolder/findImageFolderById/'
								+ folderId, {
							contentType : 'application/json; charset=utf-8',
							dataType : 'json',
							type : 'get',
							cache : false,
							success : function(res) {
								var data = {
									'folderName' :res.imageFolder.folderName,
									'imageList' : res.imageFolder.imageList,
									'folderPath' : folderPath,
									'folderId' : folderId,
									'userId' : res.userId,
									'sysPath' : sysPath
								};
								var render = template.compile(raw);
								var html = render(data);
								document.getElementById('myImageFolderListDiv').innerHTML=html;
							}
					})
			});
		}
//		// 返回相册列表
//		$('body').undelegate('a.backToImagefolderList', 'click');
//		$('body').delegate('a.backToImagefolderList', 'click', function() {
//					folderListinit();
//				});
		// 上传照片
		$('body').undelegate('a.showUploadImageDivBtn', 'click');
		$('body').delegate('a.showUploadImageDivBtn', 'click', function() {
			var me = $(this);
			var folderId = me.data('folderid');
			var folderPath = me.data('path');
			var modal = $('#uploadImageModal');
			require(['uploadify'], function() {
						$("#uploadify").uploadify({
							'swf' : sysPath
									+ '/assets/js/jquery.uploadify/uploadify.swf',
							'uploader' : sysPath + '/ajaxupload;jsessionid='
									+ $('#sessionId').val(),
							'fileTypeDesc' : '格式:BMP,JPEG,JPG,GIF,PNG', // 描述
							'fileTypeExts' : '*.BMP;*.JPEG;*.JPG;*.GIF;*.PNG', // 文件类型
							'buttonText' : '选择照片', // 按钮名称
							'removeCompleted' : true,
							'fileSizeLimit' : '40MB',
							'auto' : true,
							'onUploadSuccess' : function(file, data, response) {
								console.log(data);
							},
							'onUploadStart' : function(file) {
								$('#uploadify').uploadify("settings",
										"formData", {
											'folderId' : folderId
										})
							},
							'onQueueComplete' : function(queueData) {
								findImageFolderById(folderId, folderPath);
								modal.modal('hide');
							}
						});
						modal.modal('show');
					});

		});
		// 上传提交
//		$('body').undelegate('button.imageUploadSumitBtn', 'click');
//		$('body').delegate('button.imageUploadSumitBtn', 'click', function() {
//			$('#uploadify').uploadify('upload', '*');
//		});
		
		// 显示修改相册层
		$('body').undelegate('a.updateImageFolderLink', 'click');
		$('body').delegate('a.updateImageFolderLink', 'click', function() {
			var modal = $('#updateImageFolderModal');
			var folderId = $(this).data('folderid');
			$.ajax(	sysPath + '/mobile/imageFolder/findImageFolderById/'
							+ folderId, {
						contentType : 'application/json; charset=utf-8',
						type : 'get',
						dataType : 'json',
						cache : false,
						success : function(res) {
							var folder = res.imageFolder;
							$('.updateImageFolderName', modal)
									.val(folder.folderName);
							$('.imageFolderId', modal).val(folderId);
							modal.modal('show');
						}
					});
		});
		// 提交修改相册信息
		$('body').undelegate('a.saveUpdataImageFolderBtn', 'click');
		$('body').delegate('a.saveUpdataImageFolderBtn', 'click', function() {
					var modal = $('#updateImageFolderModal');
					var folderId = $('.imageFolderId', modal).val();
					var folderName = $('.updateImageFolderName', modal).val();
					var fdata = {
						id : folderId,
						folderName : folderName
					};
					var mydata = JSON.stringify(fdata);
					$.ajax(sysPath + '/mobile/imageFolder/updateImageFolder', {
								contentType : 'application/json; charset=utf-8',
								type : 'post',
								dataType : 'json',
								cache : false,
								data : mydata,
								success : function(res) {
									var config={};
									if ('10000' === res.code) {
										$('folderName_'+folderId).html(folderName);
										config.content='修改成功,请刷新页面查看最新数据';
									} else {
										config.content=res.msg;
									};
									showMsg(config);
									modal.modal('hide');
								}
							});
				});
		// 删除相册
		$('body').undelegate('a.deleteImageFolderLink', 'click');
		$('body').delegate('a.deleteImageFolderLink', 'click', function() {
				var imageFolderId=$(this).data('folderid');	
				showMsg({
					content : '您确定要删除该相册吗？',
					confirm : true,
					cancel:true,
					clickOk : deleteImageFolder
				});
				function deleteImageFolder(){
					$.ajax(	sysPath + '/mobile/imageFolder/deleteImageFolder/'
							+ imageFolderId, {
						contentType : 'application/json; charset=utf-8',
						type : 'get',
						cache : false,
						dataType : 'json',
						success : function(res) {
							if ('10000' === res.code) {
								$('#imageFolderList_' + imageFolderId).remove();
							} else {
								showMsg({
									content : res.msg,
									confirm : false,
									cancel:true
								});
							}
						}
					});
				};
		});
//		$('body').undelegate('a.seeBigImageLink', 'click');
//		$('body').delegate('a.seeBigImageLink', 'click', function() {
//			var folderId=$(this).data('folderid');
//			require(['domready','fotorama'], function () {
//				$.ajax(	sysPath + '/mobile/imageFolder/findImageFolderById/'
//							+ folderId, {
//						contentType : 'application/json; charset=utf-8',
//						type : 'get',
//						dataType : 'json',
//						success : function(res) {
//							var odata={
//								imageFolder : res.imageFolder,
//								baseUrl : sysPath
//							};
//							require(['text!../tpl/imageSideShow.html'], function( raw) {
//								var render = template.compile(raw);
//								var html = render(odata);
//								$('#myImageFolderListDiv').html(html);
//							});
//						}
//					});
//			});
//		});
		// 删除照片
		$('body').undelegate('a.deleteImageBtn', 'click');
		$('body').delegate('a.deleteImageBtn', 'click', function() {
					var me = $(this);
					var imageId = me.data('imageid');
					var folderId = me.data('folderid');
					var fdata = {
						folderId : folderId,
						imageId : imageId
					};
					var mydata = JSON.stringify(fdata);
					showMsg({
						content : '您确定要该图片吗？',
						confirm : true,
						cancel:true,
						clickOk : function(){
							$.ajax(sysPath + '/mobile/imageFolder/deleteImage', {
								contentType : 'application/json; charset=utf-8',
								type : 'post',
								cache : false,
								dataType : 'json',
								data : mydata,
								success : function(res) {
									if ('10000' === res.code) {
										$('#image_' + imageId).remove();
									} else {
										showMsg({
											content : res.msg,
											confirm : false,
											cancel:true
										});
									}
								}
							});
						}
					});
				});
		// 赞照片
		$('body').undelegate('a.praiseImageBtn', 'click');
		$('body').delegate('a.praiseImageBtn', 'click', function() {
					var me = $(this);
					var refOwnId = me.data('ownerid');
					var refId = me.data('imageid');
					var cdata = {
						refOwnId : refOwnId,
						refId : refId
					};
					var mydata = JSON.stringify(cdata);
					$.ajax(sysPath + '/mobile/imageFolder/addImageMention', {
								contentType : 'application/json; charset=utf-8',
								type : 'post',
								cache : false,
								dataType : 'json',
								data : mydata,
								success : function(res) {
									var config={
										confirm : false,
										cancel:false
									};
									if ('10000' === res.code) {
										config.content='赞图片成功';
										var contspan = $('.imagepraiseCount_'+refId);
										contspan.html(contspan.html()-1+2);
									} else {
										config.content=res.msg;
									}
									showMsg(config);
								}
							});
				});
		// 显示添加评论照片层
		$('body').on('click','a.commentImageBtn', function() {
					var me = $(this);
					var modal = $('#addImageCommentModal');
					$('.imageId', modal).val(me.data('imageid'));
					$('.imageOwnerId', modal).val(me.data('ownerid'));
					modal.modal('show');
				});
		// 提交照片评论层
		$('body').undelegate('a.addImageCommentSumitBtn', 'click');
		$('body').delegate('a.addImageCommentSumitBtn', 'click', function() {
			var me = $(this);
			var modal = $('#addImageCommentModal');
			var imageId = $('.imageId', modal).val();
			var imageOwnId = $('.imageOwnerId', modal).val();
			var commentContent = $('.imageComment', modal).val();
			var cdata = {
				imageId : imageId,
				imageOwnId : imageOwnId,
				commentContent : commentContent
			};
			var mydata = JSON.stringify(cdata);
			$.ajax(sysPath + '/mobile/imageFolder/addImageComment', {
				contentType : 'application/json; charset=utf-8',
				type : 'post',
				cache : false,
				dataType : 'json',
				data : mydata,
				success : function(res) {
					var comment = res.commnet;
					var html = '<li class="imageComment_' + comment.id + '">';
					html += '<p><b>' + comment.userName + ':</b> '
							+ comment.commentContent + '</p>';
					html += '<span>' + comment.createDate + '</span>';
					html += '<a class="btn deleteImageCommentBtn" data-imageid="'
							+ imageId
							+ '" data-commentid="'
							+ comment.id
							+ '">删除</a><hr/></li>';
					$('.imageCommentList_' + imageId).prepend(html);
					modal.modal('hide');
				}
			});
		});
		// 删除照片的评论确认层
		$('body').undelegate('a.deleteImageCommentBtn', 'click');
		$('body').delegate('a.deleteImageCommentBtn', 'click', function() {
					var modal = $('#deleteImageCommentModal');
					var me = $(this);
					$('.imageId', modal).val(me.data('imageid'));
					$('.imageCommentId', modal).val(me.data('commentid'));
					modal.modal('show');
				});
		// 删除照片的评论
		$('body').undelegate('a.deleteImageCommentSumitBtn', 'click');
		$('body').delegate('a.deleteImageCommentSumitBtn', 'click', function() {
					var me = $(this);
					var modal = $('#deleteImageCommentModal');
					var id = $('.imageCommentId', modal).val();
					var imageId = $('.imageId', modal).val();
					var cdata = {
						id : id,
						imageId : imageId
					};
					var mydata = JSON.stringify(cdata);
					$.ajax(sysPath + '/mobile/imageFolder/deleteImageComment',
							{
								contentType : 'application/json; charset=utf-8',
								type : 'post',
								dataType : 'json',
								cache : false,
								data : mydata,
								success : function(res) {
									if ('10000' === res.code) {
										$('.imageComment_' + id).remove();
									} else {
										showMsg({
											content : res.msg
										});
									}
									modal.modal('hide');
								}
							});
				});
		$('body').on('mouseover','a.praiseImageBtn',function(){
			var me=$(this);
			var title=me.attr('title');
			if('赞:加载中...'===title){
				var imageId=me.data('imageid');
				$.ajax(sysPath + '/mobile/imageFolder/queryPraise/'+imageId, {
					contentType : 'application/json; charset=utf-8',
					type : 'get',
					cache : false,
					dataType : 'json',
					success : function(res) {
						var ti='';
						var userInfos=res.userInfos;
						if(userInfos.length<1){
							ti+='赞';
						}else{
							ti+='赞:';
							for(var i=0;i<userInfos.length;i++){
								if(i!=userInfos.length-1){
									ti+=userInfos[i].userName+',';
								}else{
									ti+=userInfos[i].userName
								}
							}
						}
						me.attr('title',ti);
					}
				});
			}
			
		});
		// 添加到默认相册
		$('body').undelegate('a.toDefaultImageBtn', 'click');
		$('body').delegate('a.toDefaultImageBtn', 'click', function() {
					var me = $(this);
					var imageId = me.data('imageid');
					$.ajax(sysPath + '/mobile/imageFolder/addImageToSystem', {
								contentType : 'application/json; charset=utf-8',
								type : 'post',
								cache : false,
								dataType : 'json',
								data : '{"imageId":' + imageId + '}',
								success : function(res) {
									var config={};
									if ('10000' === res.code) {
										config.content='添加成功';
									} else {
										config.content=res.msg;
									}
									showMsg(config);
								}
							});
				});
	});
});