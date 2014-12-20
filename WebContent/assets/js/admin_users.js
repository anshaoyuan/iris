require(['config'], function () {

    require(['domready', 'bootstrap'], function () {

        // 切换操作菜单状态
        $('#userTable').on('click', 'tr.user-list-item', function () {
            $(this).next().fadeToggle(200);
        });

        // 绑定秘书操作
        var binding = {
            modal: $('#bindingModal'),
            buttons: $('.btn-binding', '.user-list-action')
        };

        binding.buttons.on('click', function () {
            binding.modal.modal();
        });
        /*
         * 创建/编辑表单
         */

        // 联动触发隐藏的头像上传按钮
        var avatar = {
            uploader: $('#avatarUpload'),
            button: $('#avatarButton')
        };

        avatar.button.on('click', function () {
            avatar.uploader.trigger('click');
        });

    });

});
