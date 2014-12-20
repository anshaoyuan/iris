/* global PATH: false */
/* jshint indent: 4, maxlen: false, eqeqeq: false */

void function (global, module) {
    "use strict";

    var prefix = location.pathname.split('/')[1];

    if (prefix === 'assets') {
        global.PATH = location.origin;
    } else {
        global.PATH = location.origin + '/' + prefix;
    }

    requirejs.config({
        baseUrl: PATH + '/assets/js'
    });

    require(['config'], function () {

        require(['json3', 'cmcc', 'jquery'], function (JSON, cmcc, $) {

            $(document).on('mobileinit', function () {
                $.extend($.mobile, {
                    autoInitializePage: false,
                    defaultDialogTransition: 'pop',
                    defaultPageTransition: 'slide',
                    pageLoadErrorMessage: '页面载入错误',
                    pageLoadErrorMessageTheme: 'a'
                });
                $.mobile.page.prototype.options.addBackBtn = true;
                $.mobile.page.prototype.options.backBtnText = '返回';
                $.mobile.loader.prototype.options.text = "正在加载中……";
                $.mobile.loader.prototype.options.textVisible = true;
            });

            require([
                'template',
                'syntax',
                'jquery.mobile',
                'jquery.cookie',
                'jquery.serializeJSON',
                'jquery.fileupload'
            ], function (template) {
                module(PATH, JSON, cmcc, $, template);
            });

        });

    });

}(this, function (PATH, JSON, cmcc, $, t) {
    "use strict";

    $.ajaxSetup({
        contentType: 'application/json; charset=utf-8'
    });

    var Photo = {
        folderType: { public: 1, group: 2, user: 3 },
        $initPage: $('#initPage'),
        $grpTree: $('#grpTree'),
        $pubList: $('#pubList'),
        $grpList: $('#grpList'),
        $ownList: $('#ownList'),
        $photoList: $('#photoList'),
        $photoView: $('#photoView'),
        $newFolder: $('#newFolder'),
        $newForm: $('#newFolderForm'),
        $uploadPhoto: $('#uploadPhoto'),
        $uploadNote: $('.upload-note'),
        $uploadInput: $('#uploadFile'),
        $writeComment: $('#writeComment'),
        $commentForm: $('#commentForm')
    };

    Photo.getGroupTree = function () {
        var templatePath = 'text!../tpl/mobile/group_tree.tpl';
        var APIEndpoint = PATH + '/mobile/team/queryAllTeam';

        require([templatePath], function (rawTpl) {

            $.getJSON(APIEndpoint, function (rawData) {
                var data = cmcc.Group.reGroupList(rawData);
                var html = t.compile(rawTpl)(data);
                Photo.$grpTree.html(html).trigger('create');
            });

        });
    };

    Photo.bindGroupTree = function () {
        Photo.$grpTree.on('click', 'a', function () {
            localStorage['teamId'] = $(this).jqmData('id');
            localStorage['title'] = this.innerText;
            localStorage['folderType'] = Photo.folderType.group;
        });
    };

    Photo.getPublicFolder = function () {
        var templatePath = 'text!../tpl/mobile/album_list.tpl';
        var APIEndpoint = PATH + '/mobile/imageFolder/queryfolder';

        localStorage['folderType'] = Photo.folderType.public;

        require([templatePath], function (rawTpl) {

            var xhr = $.ajax(APIEndpoint, {
                data: JSON.stringify({
                    'folderType': localStorage['folderType']
                }),
                type: 'post'
            });

            xhr.done(function (rawData) {
                var container = Photo.$pubList.find('#pubFolderList');
                container.html(t.compile(rawTpl)(rawData)).listview('refresh');
            });

        });
    };

    Photo.getGroupFolder = function () {
        var templatePath = 'text!../tpl/mobile/album_list.tpl';
        var APIEndpoint = PATH + '/mobile/imageFolder/queryfolder';

        require([templatePath], function (rawTpl) {

            var xhr = $.ajax(APIEndpoint, {
                data: JSON.stringify({ "teamId": localStorage['teamId'] }),
                type: 'post'
            });

            xhr.done(function (rawData) {
                var container = Photo.$grpList.find('#grpFolderList');
                container.html(t.compile(rawTpl)(rawData)).listview('refresh');
                Photo.$grpList.find('.ui-title').text(localStorage['title']);
            });

        });
    };

    Photo.getOwnFolder = function () {
        var templatePath = 'text!../tpl/mobile/album_list.tpl';
        var APIEndpoint = PATH + '/mobile/imageFolder/myfolder';

        localStorage['folderType'] = Photo.folderType.user;

        require([templatePath], function (rawTpl) {

            $.getJSON(APIEndpoint, function (rawData) {
                var container = Photo.$ownList.find('#ownFolderList');
                var data = cmcc.Photo.getMyAlbum(rawData);
                container.html(t.compile(rawTpl)(data)).listview('refresh');
            });

        });
    };

    Photo.bindFolder = function () {
        $(this).on('click', 'a[href="#photoList"]', function () {
            localStorage['folderId'] = $(this).jqmData('id');
        });
    };

    Photo.getPhotoList = function () {
        var templatePath = 'text!../tpl/mobile/photo_list.tpl';
        var APIEndpoint = PATH + '/mobile/imageFolder/findImageFolderById/';

        require([templatePath], function (rawTpl) {

            var xhr = $.getJSON(APIEndpoint + localStorage['folderId']);
            xhr.done(function (rawData) {
                rawData.imageFolder.urlPrefix = PATH + '/';
                var photos = t.compile(rawTpl)(rawData.imageFolder);
                Photo.$photoList.page().find('ul.photo-list').html(photos);
            });

        });

    };

    Photo.saveImageInfo = function (e) {
        e.preventDefault();
        localStorage['imagePath'] = $(this).jqmData('path');
        localStorage['imageId'] = $(this).jqmData('imageid');
        $.mobile.navigate(this.href);
    };

    Photo.showImageWithComments = function () {
        var imagePath = localStorage['imagePath'];
        var imageId = localStorage['imageId'];
        var imageBox = $('.image-box', Photo.$photoView);
        var templatePath = 'text!../tpl/mobile/comment_list.tpl';
        var APIEndpoint = PATH + '/mobile/imageFolder/imageById/';

        imageBox.html($('<img>', { 'src': imagePath }));

        require([templatePath], function (rawTpl) {

            $.getJSON(APIEndpoint + imageId, function (rawData) {
                var container = Photo.$photoView.find('#commentList');
                var comments = t.compile(rawTpl)(rawData.image);
                container.html(comments).listview('refresh');

                var title = rawData.image.commentCount + ' 条评论';
                Photo.$photoView.find('h2').text(title);

                localStorage['imageOwnId'] = rawData.image.createId;
            });

        });
    };

    Photo.createFolder = function (e) {
        var APIEndpoint = PATH + '/mobile/imageFolder/addImageFolder';
        var formData = $(this).serializeJSON();

        formData.folderType = localStorage.folderType;
        if (formData.folderType == 2) {
            formData.teamId = localStorage.teamId;
        }

        e.preventDefault();

        $.ajax(APIEndpoint, {
            data: JSON.stringify(formData),
            type: 'post',
            success: function (rawData) {
                if (rawData.code === '10000') {
                    setTimeout(function () {
                        Photo.$newFolder.dialog('close');
                    }, 1000);
                }
            }
        });
    };

    Photo.uploadPhoto = function () {
        var requestURL = [
            PATH,
            '/upload/userImg;jsessionid=',
            $.cookie('JSESSIONID')
        ].join('');

        Photo.$uploadInput.fileupload({
            url: requestURL,
            dataType: 'json',
            type: 'post',
            sequentialUploads: true,
            start: function () {
                Photo.$uploadNote.text('正在上传中，请稍后').fadeIn(300);
            },
            done: function (event, data) {
                data.jqXHR.success(Photo.bindingImageWithFolder);
            },
            stop: function () {
                Photo.$uploadNote.fadeOut(300);
                setTimeout(function () {
                    Photo.$uploadPhoto.dialog('close');
                }, 1000);
            }
        });
    };

    Photo.bindingImageWithFolder = function (rawData) {
        $.ajax(PATH + '/mobile/imageFolder/addImage', {
            data: JSON.stringify({
                folderId: localStorage['folderId'],
                imageId: rawData.id
            }),
            type: 'post'
        });
    };

    Photo.postComment = function (e) {
        var APIEndpoint = PATH + '/mobile/imageFolder/addImageComment';
        var formData = $(this).serializeJSON();
        formData.imageId = localStorage['imageId'];
        formData.imageOwnId = localStorage['imageOwnId'];

        e.preventDefault();

        $.ajax(APIEndpoint, {
            data: JSON.stringify(formData),
            type: 'post',
            success: function () {
                setTimeout(function () {
                    Photo.$writeComment.dialog('close');
                }, 1000);
            }
        });
    };


    Photo.$initPage.on('pagebeforecreate', Photo.getGroupTree);
    Photo.$grpTree.on('panelcreate', Photo.bindGroupTree);

    Photo.$pubList.on({
        'pagebeforeshow': Photo.getPublicFolder,
        'pageshow': Photo.bindFolder
    });

    Photo.$grpList.on({
        'pagebeforeshow': Photo.getGroupFolder,
        'pageshow': Photo.bindFolder
    });

    Photo.$ownList.on({
        'pagebeforeshow': Photo.getOwnFolder,
        'pageshow': Photo.bindFolder
    });

    Photo.$photoList
        .on('pagebeforeshow', Photo.getPhotoList)
        .on('click', '.photo-list a', Photo.saveImageInfo);

    Photo.$photoView.on('pagebeforeshow', Photo.showImageWithComments);

    Photo.$newForm.on('submit', Photo.createFolder);

    Photo.$uploadPhoto.on({
        'pagebeforeshow': function () { Photo.$uploadNote.hide(); },
        'pageshow': Photo.uploadPhoto
    });

    Photo.$commentForm.on('submit', Photo.postComment);

    $.mobile.initializePage();
    $('body').css({'visibility': 'visible'});

});