require(['config'], function () {
    'use strict';

    // 以下是做静态 HTML 页面时模拟 sysPath 的变量，不要用在产品里

    window.sysPath = (typeof window.sysPath === "undefined")
        ? ''
        : window.sysPath;

    require(['domready', 'json3', 'jquery.serializeJSON', 'bootstrap', 'fotorama'], function () {

        /**
         `photos` 对象用来保存相册上的各种组件
         */
        var photos = {
            /**
             创建新相册的按钮

             @property newFolderBtn
             @type jQuery
             */
            newFolderBtn: $('#newFolderBtn'),

            /**
             创建新相册的表单

             @property newFolderForm
             @type jQuery
             */
            newFolderForm: $('#newFolderForm'),

            /**
             页面中的提示 div（初始化时默认隐藏）

             @property alertInPage
             @type jQuery
             */
            alertInPage: $('div.alert-success', 'div.wrapper').first(),

            /**
             新建表单中的提示 div（初始化时默认隐藏）

             @property alertInForm
             @type jQuery
             */
            alertInNewForm: $('div.alert-error', '#newFolderForm').first()
        };

        /**
         创建我的相册
         */
        photos.newFolderForm.on('submit', function (e) {
            var formData = $(this).serializeJSON();

            e.preventDefault();

            photos.processNewSubmit(formData);
        });

        /**
         新建表单验证处理

         @method processNewSubmit
         @param {Object} formData 已经解析为 JSON 对象的表单数据
         */
        photos.processNewSubmit = function (formData) {
            if (formData.folderName === '') {
                photos.alertInNewForm.show()
            } else {
                photos.submitNewFloder(formData);
            }
        };

        /**
         提交新建相册的表单

         @method submitNewFodler
         @param {Object} formData 已经解析为 JSON 对象的表单数据
         */
        photos.submitNewFloder = function (formData) {
            $.ajax(sysPath + '/mobile/imageFolder/addImageFolder', {
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(formData),
                type: 'post',
                success: function (data) {
                    if (data.code === '10000') {
                        photos.newFolderForm.modal('hide');
                        photos.alertInPage.show();
                    } else {
                        console.error(data.code + ': ' + data.msg);
                    }
                }
            })
        };
    });
});