/* jshint indent: 4, maxlen: false, eqeqeq: false */
/* global sysPath: false */

requirejs.config({
    baseUrl: sysPath + '/assets/js'
});

require(['config'], function () {
    'use strict';

    require(['jquery'], function ($) {

        // 为了 RequireJS 能够监听 pageinit 及其之前的页面事件，禁用 jqm 的自动初始化
        $(document).on('mobileinit', function () {
            $.mobile.autoInitializePage = false;
        });

        require(['cmcc', 'json3', 'template', 'syntax', 'jquery.mobile', 'jquery.cookie', 'jquery.serializeJSON', 'jquery.fileupload'], function (cmcc, JSON, t) {

            // 渲染群组树型列表
            $(document).on('pagecreate', '#initPage', function () {
                require(
                    ['text!../tpl/mobile/group_tree.tpl'], function (rawTpl) {
                        $.getJSON(sysPath + '/mobile/team/queryAllTeam', function (rawData) {
                            var data = cmcc.Group.reGroupList(rawData);
                            var html = t.compile(rawTpl)(data);
                            $('#grpTree').html(html).trigger('create');
                        });
                    });
            });

            /*
             // 手动初始化 jqm，再次之前的事件监听一定要放在这句之前！
             $.mobile.initializePage();
             // 整个 body 在 DOM 载入前是 hidden 的，jqm 初始化之后显示，可防止短暂的样式丢失
             $('body').css({'visibility': 'visible'});
             */


            // 我的相册列表
            $('#ownList').on('pagebeforeshow', function () {
                localStorage['folderType'] = 3;
                localStorage['target'] = '#ownList';

                require(['text!../tpl/mobile/album_list.tpl'], function (rawTpl) {
                    $.getJSON(sysPath + '/mobile/imageFolder/myfolder', function (rawData) {
                        var data = cmcc.Photo.getMyAlbum(rawData);
                        var html = t.compile(rawTpl)(data);
                        $('#ownAlbumList').html(html).listview('refresh');
                    });
                });
            })
                // 写入当前相册的 ID 到 localStorage 以方便存取
                .on('click', 'a[href="#photoList"]', function () {
                    localStorage['folderId'] = $(this).jqmData('id');
                });


            // 公共相册列表
            $('#pubList').on('pagebeforeshow', function () {
                localStorage['folderType'] = 1;
                localStorage['target'] = '#pubList';

                require(['text!../tpl/mobile/album_list.tpl'], function (rawTpl) {
                    $.ajax(sysPath + '/mobile/imageFolder/queryfolder', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({ 'folderType': localStorage['folderType'] }),
                        type: 'post',
                        success: function (rawData) {
                            var html = t.compile(rawTpl)(rawData);
                            $('#pubAlbumList').html(html).listview('refresh');
                        }
                    });
                });
            })
                // 写入当前相册的 ID 到 localStorage 以方便存取
                .on('click', 'a[href="#photoList"]', function () {
                    localStorage['folderId'] = $(this).jqmData('id');
                });


            // 从群组树导航至群组相册列表
            $('#grpTree').on('click', 'a[href=#grpList]', function (e) {
                e.preventDefault();
                localStorage['teamId'] = $(this).jqmData('id');
                localStorage['folderType'] = 2;
                localStorage['target'] = '#grpList';

                $.mobile.navigate(this.href);
            });


            // 群组相册列表
            $('#grpList').on('pagebeforeshow', function () {
                require(['text!../tpl/mobile/album_list.tpl'], function (rawTpl) {
                    $.ajax(sysPath + '/mobile/imageFolder/queryfolder', {
                        contentType: 'application/json; charset=utf-8',
                        data: JSON.stringify({"teamId": localStorage['teamId']}),
                        type: 'post',
                        success: function (rawData) {
                            var html = t.compile(rawTpl)(rawData);
                            $('#grpAlbumList').html(html).listview('refresh');
                        }
                    });
                });
            })
                // 写入当前相册的 ID 到 localStorage 以方便存取
                .on('click', 'a[href="#photoList"]', function () {
                    localStorage['folderId'] = $(this).jqmData('id');
                });


            // 打开创建相册的对话框
            /*
             $('.btn-create').on('click', function (e) {
             e.preventDefault();
             $.mobile.changePage(this.href, {
             transition: 'slide', role: 'page'
             });
             });
             */

            // 处理创建相册表单的提交
            $('#newAlbumForm').on('submit', function (e) {
                var formData = $(this).serializeJSON();
                formData.folderType = localStorage.folderType;

                if (formData.folderType == 2) {
                    formData.teamId = localStorage.teamId;
                }

                e.preventDefault();

                $.ajax(sysPath + '/mobile/imageFolder/addImageFolder', {
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(formData),
                    type: 'post',
                    success: function () {
                        $.mobile.navigate(localStorage['target']);
                    }
                });
            });


            // 打开上传相片的对话框
            /*
             $('.btn-upload').on('click', function (e) {
             e.preventDefault();
             $.mobile.changePage(this.href, {
             transition: 'slide', role: 'page'
             });
             });
             */


            $('#newPhoto')
                // 清空表单 & 激活相片上传选择
                .on('pagebeforeshow', function () {
                    $('.upload-finish').addClass('hide');
                    $(this).find('#newPhotoForm')[0].reset();
                })

                // 联动激活相片选择对话框
                /*
                 .on('click', 'button[type=button]', function () {
                 $('#newPhotoInput').trigger('click');
                 })
                 */

                // 处理上传
                .on('pageshow', function () {
                    var uploadInput = $('#uploadFile');
                    var uploadStart = $('.upload-start', '#newPhoto');
                    var uploadFinish = $('.upload-finish', '#newPhoto');

                    uploadInput.fileupload({
                        url: [sysPath, '/upload/userImg;jsessionid=', $.cookie('JSESSIONID')].join(''),
                        dataType: 'json',
                        type: 'post',
                        sequentialUploads: true,
                        start: function () {
                            uploadStart.removeClass('hide');
                            uploadFinish.addClass('hide');
                        },
                        done: function (event, data) {
                            data.jqXHR.success(bindingImageToFolder);
                        },
                        stop: function () {
                            uploadStart.addClass('hide');
                            uploadFinish.removeClass('hide');
                        }
                    });

                    // 处理上传图片和目标相册的关联关系
                    function bindingImageToFolder(rawData) {
                        $.ajax(sysPath + '/mobile/imageFolder/addImage', {
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({ folderId: localStorage['folderId'], imageId: rawData.id }),
                            type: 'post'
                        });
                    }
                });

            $('#photoList')
                .on('pagecreate', function () {
                    var jsonAPI = [sysPath, '/mobile/imageFolder/findImageFolderById/', localStorage['folderId']].join('');

                    require(['text!../tpl/mobile/photo_list.tpl'], function (rawTpl) {
                        $.getJSON(jsonAPI, function (rawData) {
                            rawData.imageFolder.urlPrefix = sysPath + '/';
                            var html = t.compile(rawTpl)(rawData.imageFolder);
                            $('#photoList').page().find('ul.photo-list').html(html);
                        });
                    });
                })
                .on('pageinit', function () {

                });
        });
    });
});


/*
 require(['photoswipe'], function (Code) {
 // 照片列表 / 照片浏览 / 幻灯片
 $('#photoList').on({
 // 页面载入前填充照片列表
 pagebeforeshow: function () {
 var jsonAPI = [
 sysPath,
 '/mobile/imageFolder/findImageFolderById/',
 localStorage['folderId']
 ].join('');

 require(['text!../tpl/mobile/photo_list.tpl'], function (rawTpl) {
 $.getJSON(jsonAPI, function (rawData) {
 rawData.imageFolder.urlPrefix = sysPath + '/';
 var html = t.compile(rawTpl)(rawData.imageFolder);

 $('#photoList')
 .page()
 .find('ul.photo-list').html(html);
 });
 });
 },

 pageshow: function (e) {
 // 全屏浏览插件
 var currentPage = $(e.target),
 options = {
 captionAndToolbarHide: false,
 captionAndToolbarAutoHideDelay: 3000,
 slideshowDelay: 2000
 },
 photoList = $('ul.photo-list a', e.target);

 if (photoList.length !== 0) {
 photoList.photoSwipe(
 options, currentPage.attr('id')
 );
 }
 },

 // 页面跳转后释放全屏预览插件
 pagehide: function (e) {
 var currentPage = $(e.target),
 pwInstance = Code.PhotoSwipe.getInstance(
 currentPage.attr('id')
 );

 if (typeof pwInstance !== 'undefined' &&
 pwInstance !== null) {
 Code.PhotoSwipe.detatch(pwInstance);
 }
 }
 });
 });
 */
