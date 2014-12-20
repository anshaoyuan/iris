require(['config'], function () {
    'use strict';


    require(['bootstrap', 'chosen'], processNews);

    function processNews() {

        void function () {
            var newsButton = $('#newsButton'), newsForm = $('#newsForm');

            newsButton.click(function () { newsForm.collapse('toggle') });

            newsForm
                .on('show',
                    { button: newsButton, text: '收起\n', iconDir: 'up' },
                    flipButtonState)
                .on('hide',
                    { button: newsButton, text: '展开\n', iconDir: 'down' },
                    flipButtonState)
                .collapse('hide');

            function flipButtonState(event) {
                var button = event.data.button,
                    buttonText = event.data.text,
                    className = 'icon-chevron-' + event.data.iconDir,
                    icon = $('<li>', { 'class': className });

                button.text(buttonText).append(icon)
            }


            newsForm.children('#newsTo').chosen();
        }()
    }
});
