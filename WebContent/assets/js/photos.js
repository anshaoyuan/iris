require(['config'], function() {
	'use strict';

	// 以下是做静态 HTML 页面时模拟 sysPath 的变量，不要用在产品里

	// window.sysPath = (typeof window.sysPath === "undefined")
	// ? ''
	// : window.sysPath;

	require(['template','domready','syntax','fotorama'], function(template) {
		// 跳转到系统相册
		$('body').on('click','a.toSystemImageFolderLink', function() {
			folderListinit(1);
		});
		$('body').on('click','a.backToImageFolderList', function() {
			var type=$(this).data('foldertype');
			folderListinit(type);
		});
		function folderListinit(foldertype) {
			require(['text!../tpl/imageFolderList.html!strip'], function(raw) {
				$.ajax(	sysPath + '/mobile/imageFolder/myfolder/' + foldertype, {
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					type : 'get',
					success : function(rawdata) {
						var data = {
							folderList : rawdata.folders,
							sysPath : sysPath
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
						}
					}
				});
			});
		}
		// 显示相册里的相片
		$('body').on('click','a.myImageFolderNav',function() {
			var me = $(this);
			var folderId = me.data('folderid');
			findImageFolderById(folderId, me.data('path'));
		});
		function findImageFolderById(folderId, folderPath) {
			$.ajax(	sysPath + '/mobile/imageFolder/findImageFolderById/'+ folderId, {
				contentType : 'application/json; charset=utf-8',
				dataType : 'json',
				type : 'get',
				success : function(res) {
					var data = {
						'imageList' : res.imageFolder.imageList,
						'folderPath' : folderPath,
						'folderId' : folderId,
						'userId' : res.userId,
						'sysPath' : sysPath
					};
					require(['text!../tpl/imageList.html'], function( raw) {
						var render = template.compile(raw);
						var html = render(data);
						$('#myImageFolderListDiv').html(html);
					});
				}
			});
		}

			/**
			 * `photos` 对象用来保存相册上的各种组件
			 */
			// var photos = {
			/**
			 * 创建新相册的按钮
			 * 
			 * @property newFolderBtn
			 * @type jQuery
			 */
			// newFolderBtn: $('#newFolderBtn'),
			/**
			 * 创建新相册的表单
			 * 
			 * @property newFolderForm
			 * @type jQuery
			 */
			// newFolderForm: $('#newFolderForm'),
			/**
			 * 页面中的提示 div（初始化时默认隐藏）
			 * 
			 * @property alertInPage
			 * @type jQuery
			 */
			// alertInPage: $('div.alert-success', 'div.wrapper').first(),
			/**
			 * 新建表单中的提示 div（初始化时默认隐藏）
			 * 
			 * @property alertInForm
			 * @type jQuery
			 */
			// alertInNewForm: $('div.alert-error', '#newFolderForm').first()
			// };
			/**
			 * 创建我的相册
			 */
			// photos.newFolderForm.on('submit', function (e) {
			// var formData = $(this).serializeJSON();
			//
			// e.preventDefault();
			//
			// photos.processNewSubmit(formData);
			// });
			/**
			 * 新建表单验证处理
			 * 
			 * @method processNewSubmit
			 * @param {Object}
			 *            formData 已经解析为 JSON 对象的表单数据
			 */
			// photos.processNewSubmit = function (formData) {
			// if (formData.folderName === '') {
			// photos.alertInNewForm.show()
			// } else {
			// photos.submitNewFloder(formData);
			// }
			// };
			/**
			 * 提交新建相册的表单
			 * 
			 * @method submitNewFodler
			 * @param {Object}
			 *            formData 已经解析为 JSON 对象的表单数据
			 */
			// photos.submitNewFloder = function (formData) {
			// $.ajax(sysPath + '/mobile/imageFolder/addImageFolder', {
			// contentType: 'application/json; charset=utf-8',
			// data: JSON.stringify(formData),
			// type: 'post',
			// success: function (data) {
			// if (data.code === '10000') {
			// photos.newFolderForm.modal('hide');
			// photos.alertInPage.show();
			// } else {
			// console.error(data.code + ': ' + data.msg);
			// }
			// }
			// })
			// };
	});
});