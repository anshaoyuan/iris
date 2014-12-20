require(['config'], function () {
    'use strict';


    // 登录表单 by yufan
    require(['domready', 'json3', 'jquery.serializeJSON', 'validate'], function (dom, JSON) {
        $.validator.setDefaults({
            debug: true,
            errorClass: 'text-error'
        });

        $('#loginForm').validate({
            rules: { username: 'required', password: 'required' },
            messages: {
                username: '请填写 11 位手机号码',
                password: '请填写密码'
            },
            submitHandler: function (form) {
                $.ajax({
                    contentType: 'application/json',
                    data: JSON.stringify($(form).serializeJSON()),
                    url: $(form).attr('action'),
                    type: $(form).attr('method')
                })
                    .done(function (data) {
                        if (typeof data === 'string') {
                            data = $.parseJSON(data);
                        }

                        if (data.code === "10001") {
                            require(['template', 'text!../tpl/error_msg.tpl', 'syntax'], function (template, raw) {
                                var render = template.compile(raw);
                                var html = render(data);
                                var wrapper = $('#alert');

                                if (wrapper.length === 0) {
                                    $(html).insertBefore(form);
                                } else {
                                    wrapper.remove();
                                    $(html).insertBefore(form);
                                }
                            });
                        } else {
                            window.location.replace(sysPath + '/mobile/index');
                        }
                    }
                )
            }
        })
    });


    // 联系管理员 by yufan
    require(['domready', 'bootstrap'], function () {
        require(['template', 'text!../tpl/admin_info.tpl', 'syntax'], function (template, raw) {
            require(['cmcc'], function (cmcc) {
                $('#loginForm').on("click", '#callServiceBtn', {
                    target: '#callService'
                }, function (e) {
                    $.get(sysPath + '/help/admininfo', function (data) {
                        var render = template.compile(raw);
                        var html = render(data);
                        $("#callService").find("dl").html(html);
                    });
                    cmcc.Util.triggerModal(e);
                })
            })
        })
    })
});
