'use strict';

requirejs.config({
    baseUrl: sysPath + '/assets/js'
});

require(['config'], function () {

    require(['jquery'], function ($) {

        // 为了 RequireJS 能够监听 pageinit 及其之前的页面事件，禁用 jqm 的自动初始化
        $(document).on('mobileinit', function () {
            $.mobile.autoInitializePage = false;
        });

        require(['cmcc',
                 'json3',
                 'template',
                 'syntax',
                 'jquery.mobile',
                 'jquery.cookie',
                 'jquery.serializeJSON',
                 'jquery.fileupload'], function (cmcc, JSON, t) {


            // 渲染群组树型列表
            /*$(document).on('pagecreate', '#initPage', function () {
             require(['text!../tpl/mobile/group_tree.tpl'], function (rawTpl) {
             $.getJSON(sysPath + '/mobile/team/queryAllTeam', function (rawData) {
             var data = cmcc.Group.reGroupList(rawData);
             var html = t.compile(rawTpl)(data);
             $('#grpTree').html(html).trigger('create');
             });
             });
             });*/


            // 手动初始化 jqm，再次之前的事件监听一定要放在这句之前！
            $.mobile.initializePage();
            // 整个 body 在 DOM 载入前是 hidden 的，jqm 初始化之后显示，可防止短暂的样式丢失
            $('body').css({'visibility': 'visible'});


            // 我的文档列表
            $('#ownList').on('pagebeforeshow', function () {
                localStorage['folderType'] = 3;
                localStorage['target'] = '#ownList';

                require(['text!../tpl/mobile/folder_list.tpl'], function (rawTpl) {
                    $.getJSON(sysPath + '/mobile/document/folderList', function (rawData) {
                        rawData.type = 'own';
                        var html = t.compile(rawTpl)(rawData);
                        $('#ownAlbumList').html(html).listview('refresh');
                    });
                });
            })
                // 写入当前文档的 ID 到 localStorage 以方便存取
                .on('vclick', 'a[href="#docList"]', function () {
                    localStorage['folderId'] = $(this).jqmData('id');
                });


            // 公共文档列表
            $('#pubList').on('pagebeforeshow', function () {
                localStorage['folderType'] = 1;
                localStorage['target'] = '#pubList';

                require(['text!../tpl/mobile/folder_list.tpl'], function (rawTpl) {
                    $.getJSON(sysPath + '/mobile/document/folderList', function (rawData) {
                        var html = t.compile(rawTpl)(rawData);
                        $('#pubAlbumList').html(html).listview('refresh');
                    });
                });
            })
                // 写入当前文档的 ID 到 localStorage 以方便存取
                .on('vclick', 'a[href="#docList"]', function () {
                    localStorage['folderId'] = $(this).jqmData('id');
                });


            // 从群组树导航至群组文档列表
            /*$('#grpTree').on('vclick', 'a[href=#grpList]', function (e) {
             e.preventDefault();
             localStorage['teamId'] = $(this).jqmData('id');
             localStorage['folderType'] = 2;
             localStorage['target'] = '#grpList';

             $.mobile.navigate(this.href);
             });*/


            // 群组文档列表
            /*$('#grpList').on('pagebeforeshow', function () {
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
             // 写入当前文件夹的 ID 到 localStorage 以方便存取
             .on('vclick', 'a[href="#photoList"]', function () {
             localStorage['folderId'] = $(this).jqmData('id');
             });*/


            // 打开创建文档的对话框
            $('.btn-create').on('vclick', function (e) {
                e.preventDefault();
                $.mobile.changePage(this.href, {
                    transition: 'pop', role: 'dialog'
                });
            });


            // 表单显示前重置
            $('#newAlbum').on('pagebeforeshow', function () {
                $(this).find('#newAlbumForm')[0].reset();
            });


            // 处理创建文件夹表单的提交
            $('#newAlbumForm').on('submit', function (e) {
                var formData = $(this).serializeJSON();
                e.preventDefault();

                $.ajax(sysPath + '/mobile/document/addFolder', {
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(formData),
                    type: 'post',
                    success: function () {
                        $.mobile.navigate(localStorage['target']);
                    }
                });
            });


            // 文档列表
            $('#docList').on('pagebeforeshow', function () {
                require(['text!../tpl/mobile/doc_list.tpl'], function (rawTpl) {
                    var jsonAPI = [
                        sysPath,
                        '/mobile/document/fileList/',
                        localStorage['folderId']
                    ].join('');

                    $.getJSON(jsonAPI, function (rawData) {
                        var data = { docList: rawData, baseUrl:sysPath };
                        var html = t.compile(rawTpl)(data);
                        $('#docList').page()
                            .find('ul.doc-list').html(html).listview('refresh');
                        console.log(data, html);
                    });
                });
            });


            // 打开上传相片的对话框
            $('.btn-upload').on('vclick', function (e) {
                e.preventDefault();
                $.mobile.changePage(this.href, {
                    transition: 'pop', role: 'dialog'
                });
            });


            $('#newPhoto')
                // 清空表单 & 激活相片上传选择
                .on('pagebeforeshow', function () {
                    $('.upload-finish').addClass('hide');
                    $(this).find('#newPhotoForm')[0].reset();
                })

                // 联动激活相片选择对话框
                .on('click', 'button[type=button]', function () {
                    $('#newPhotoInput').trigger('click');
                })

                // 处理上传
                .on('pageshow', function () {
                    var uploadInput = $('#newPhotoInput');
                    var uploadStart = $('.upload-start', '#newPhoto');
                    var uploadFinish = $('.upload-finish', '#newPhoto');

                    uploadInput.fileupload({
                        url: [sysPath,
                              '/upload/userImg;jsessionid=',
                              $.cookie('JSESSIONID')].join(''),
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

                    // 处理上传文档和目标文件夹的关联关系
                    function bindingImageToFolder(rawData) {
                        $.ajax(sysPath + '/mobile/imageFolder/addImage', {
                            contentType: 'application/json; charset=utf-8',
                            data: JSON.stringify({
                                folderId: localStorage['folderId'],
                                imageId: rawData.id
                            }),
                            type: 'post'
                        });
                    }
                });
        });
    });
});
