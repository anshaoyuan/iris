require(['config'], function () {
    "use strict";

    require(['jquery'], function () {

        require(['template', 'syntax'], function (template) {

            // 主菜单
            require(['text!../tpl/header_nav.tpl'], function (raw) {
                var data = {};
                data.menu = [
                    { name: "首页", uri: sysPath + "/mobile/index/" },
                    { name: "发布", uri: sysPath + "/mobile/stream/topub/new"},
                    { name: "通讯录", uri: sysPath + "/user/toUserList" },
                    { name: "群组", uri: sysPath + "/mobile/team/list/" },
                    { name: "相册", uri: sysPath + "/mobile/imageFolder/toMyImageFolder" },
                    { name: "文档", uri: sysPath + "/mobile/document/toList" },
                    { name: "提醒", uri: sysPath + "/mobile/remind/toList" },
                    { name: "聊天", uri: sysPath + "/mobile/chat/toChatHistory"}
                ];

                var render = template.compile(raw);
                var html = render(data);
                $("#headerNav").html(html)
                    .find('a').filter(function () {
                        return this.href === location.href
                    }).parent().addClass('active')
            });

            // 当前用户
            require(['text!../tpl/header_user.tpl'], function (raw) {
                $.getJSON(sysPath + '/mobile/getUser', function (rawData) {
                    var data = {
                        name: rawData.aliasName,
                        secretaryId: rawData.secId,
                        sysPath: sysPath
                    };
                    var render = template.compile(raw);
                    var html = render(data);
                    $('#userNav').html(html);
                })
            });

            // 提醒总数
            $.getJSON(sysPath + '/mobile/remind/allRemindCount', function (rawData) {
                var count = rawData.allRemindCount;
                var placeholder = $('#reminder').find('a').text(count);
                var className = (placeholder.text() === '0') ? 'nothing' : 'anything';
                placeholder.attr('class', className);
            })
        })
    })
});
