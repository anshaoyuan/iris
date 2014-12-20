require(['config'], function() {
	"use strict";
	function showMsg(config){
		require([ 'jquery-msg'], function(msg) {
			msg(config);
		})
	}
	require(['template', 'syntax', 'bootstrap'], function(template) {
		/**
		 * 相册的操作
		 */
		//显示系统相册
		folderListinit();
        //添加相册
        $('body').on('click','a.saveImageFolderBtn',function() {
			var modal = $('#newFolderForm');
			var folderName = $('.createImageFolderName', modal).val();
			if(!folderName){
				showMsg({content:'相册名称不能为空'});
				return;
			}
			var dataobj = {
				folderName : folderName
			}
			var mydata = JSON.stringify(dataobj);
			$.ajax(sysPath + '/console/imageFolder/addImageFolder', {
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				type : 'post',
				data : mydata,
				success : function(res) {
					if ('10000' === res.code) {
						showMsg({content:'创建成功'});
						folderListinit();
						modal.modal('hide');
					}
				}
			});
		});
		//删除相册
		$('body').on('click','a.deleteImageFolderLink', function() {
				var imageFolderId=$(this).data('folderid');	
				showMsg({
					content : '您确定要删除该相册吗？',
					confirm : true,
					cancel:true,
					clickOk : deleteImageFolder
				});
				function deleteImageFolder(){
					$.ajax(	sysPath + '/console/imageFolder/deleteImageFolder/'
							+ imageFolderId, {
						contentType : 'application/json; charset=utf-8',
						type : 'get',
						dataType : 'json',
						success : function(res) {
							var config={
								confirm : false,
								cancel:false
							};
							if ('10000' === res.code) {
								config.content='删除成功';
								$('#imageFolderList_' + imageFolderId).remove();
							} else {
								config.content=res.msg;
							}
							showMsg(config);
						}
					});
				};
		});
		//显示修改相册层
		$('body').on('click','a.updateImageFolderLink', function() {
			var modal = $('#updateImageFolderModal');
			var folderId = $(this).data('folderid');
			$.ajax(	sysPath + '/console/imageFolder/findImageFolderById/' + folderId, {
				contentType : 'application/json; charset=utf-8',
				type : 'get',
				dataType : 'json',
				success : function(res) {
					var folder = res.imageFolder;
					$('.updateImageFolderName', modal).val(folder.folderName);
					$('.imageFolderId', modal).val(folderId);
					modal.modal('show');
				}
			});
		});
		//提交修改相册
		$('body').on('click','a.saveUpdataImageFolderBtn', function() {
			var modal = $('#updateImageFolderModal');
			var folderId = $('.imageFolderId', modal).val();
			var folderName = $('.updateImageFolderName', modal).val();
			var fdata = {
				id : folderId,
				folderName : folderName
			};
			var mydata = JSON.stringify(fdata);
			$.ajax(sysPath + '/console/imageFolder/updateImageFolder', {
				contentType : 'application/json; charset=utf-8',
				type : 'post',
				dataType : 'json',
				data : mydata,
				success : function(res) {
					var config={};
					if ('10000' === res.code) {
						$('folderName_'+folderId).html(folderName);
						config.content='修改成功';
						folderListinit();
					} else {
						config.content=res.msg;
					};
					showMsg(config);
					modal.modal('hide');
				}
			});
		});
		//显示相册里的照片
		$('body').on('click','a.myImageFolderNav', function() {
			var me = $(this);
			var folderId = me.data('folderid');
			findImageFolderById(folderId, me.data('path'));
		});
		//返回相册列表
		$('body').on('click','a.backToImageFolderList', function() {
			folderListinit();
		});
		//加载系统相册
		function folderListinit(){
			require(['text!../tpl/imageFolderList.html!strip'], function (raw) {
				var odata={
						folderType : 1
					}
		        $.ajax(sysPath + '/console/imageFolder/queryfolder', {
		        	contentType: 'application/json; charset=utf-8',
		        	dataType: 'json',
		        	data : JSON.stringify(odata),
		        	type: 'post',
		        	success: function (rawdata) {
			            var data = {
			            	folderList: rawdata.content,
			            	sysPath: sysPath
			            };
			            var render = template.compile(raw);
			            var html = render(data);
			            $('#myImageFolderListDiv').html(html);
			            $('.imagefolderTypeSapn').html('系统相册');
		            }
		    	});
			});
		};
		//显示相册里的照片
		function findImageFolderById(folderId, folderPath) {
			$.ajax(	sysPath + '/console/imageFolder/findImageFolderById/' + folderId, {
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				type : 'get',
				success : function(res) {
					var data = {
						'imageList' : res.imageFolder.imageList,
						'folderPath' : folderPath,
						'folderId' : folderId,
						'userId' : res.userId,
						'sysPath' : sysPath,
						'folderName':res.imageFolder.folderName
					};
					require(['text!../tpl/consoleImageList.html'], function( raw) {
						var render = template.compile(raw);
						var html = render(data);
						$('#myImageFolderListDiv').html(html);
						$('.showUploadImageDivBtn').before('<a class="btn pull-right backToImageFolderList" >返回相册列表</a>');
					});
				}
			});
		};
		
	/**
	 * 照片的操作
	 */
		//上传照片
		$('body').on('click','a.showUploadImageDivBtn', 'click', function() {
			var me = $(this);
			var folderId = me.data('folderid');
			var folderPath = me.data('path');
			var modal = $('#uploadImageModal');
			require(['uploadify'], function() {
				$("#uploadify").uploadify({
					'swf' : sysPath+ '/assets/js/jquery.uploadify/uploadify.swf',
					'uploader' : sysPath + '/ajaxupload;jsessionid=' + $('#sessionId').val(),
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
						$('#uploadify').uploadify("settings", "formData", {
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
		//删除照片
		$('body').on('click','a.deleteImageBtn', function() {
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
					$.ajax(sysPath + '/console/imageFolder/deleteImage', {
						contentType : 'application/json; charset=utf-8',
						type : 'post',
						dataType : 'json',
						data : mydata,
						success : function(res) {
							var config={
								confirm : false,
								cancel:false
							};
							if ('10000' === res.code) {
								config.content='删除成功';
								$('#image_' + imageId).remove();
							} else {
								config.content=res.msg;
							}
							showMsg(config);
						}
					});
				}
			});
		});
	});
});