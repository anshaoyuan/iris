/* jshint indent: 4 */
define("config", function () {
    "use strict";

    requirejs.config({
        /*
         * packages 是包管理模式，其规则如下：
         * 1. name 指向包所在的路径
         * 2. main 指向包得入口文件（省略后缀 .js）
         * 比如 name: "bootstrap" 指向的是 ./bootstrap/ 目录
         * 而 main: "bootstrap" 则是 ./bootstrap/bootstrap.js 文件
         *
         * 另外，package 还可以引用路径下的其他文件，比如：
         * require(["jquery.validate/messages_zh"]) 指的是
         * ./jquery.validate/messages_zh.js 文件
         */
        packages: [
            {
                name: "module",
                main: "main"
            },
            {
                name: "jquery",
                main: "jquery"
            },
            {
                name: "jquery.mobile",
                main: "jquery.mobile"
            },
            {
                name: "jquery.validate",
                main: "jquery.validate"
            },
            {
                name: "jquery.serializeJSON",
                main: "jquery.serializeJSON"
            },
            {
                name: "jquery.cookie",
                main: "jquery.cookie"
            },
            {
                name: "json3",
                main: "json3.min"
            },
            {
                name: "bootstrap",
                main: "bootstrap"
            },
            {
                name: "moment",
                main: "moment"
            },
            {
                name: "chosen",
                main: "chosen.jquery"
            },
            {
                name: "photoswipe",
                main: "code.photoswipe.jquery"
            },
            {
                name: "jquery.uploadify",
                main: "jquery.uploadify"
            },
            {
                name: "banner",
                main: "banner"
            },
            {
                name: "wdatePicker",
                main: "WdatePicker"
            },
            {
                name: "jcrop",
                main: "js/jquery.Jcrop"
            },
            {
                name: "fileupload",
                main: "ajaxfileupload"
            },
            {
                name: "fotorama",
                main: "fotorama"
            },
            {
                name: "jquery.fileupload",
                main: "js/jquery.fileupload"
            },
            {
                name: "jquery.xChosen",
                main: "jquery.xChosen"
            }
        ],
        /*
         * paths 指定 module 的引用位置，该位置可以是文件路径、包、URI
         * shim 为没有封装成 module 的 js 文件指定依赖
         *
         * 1. "validate" 指向汉化文件
         * 2. 汉化文件依赖 "jquery.validate"
         * 3. "jquery.validate" 依赖 "jquery"
         *
         * 所以，在用 jquery.validate 插件的时候只需要：require(["validate"])
         * 即可，require.js 会自动解析所有的依赖，不用手动依赖 jquery.validate
         */
        paths: {
            "text": "module/text",
            "domready": "module/domReady",
            "mobile.init": "mobile/init",
            "cmcc": "module/cmcc.util",
            "template": "art/template",
            "syntax": "art/template-syntax",
            "validate": "jquery.validate/messages_zh",
            "klass": "photoswipe/lib/klass.min",
            "uploadify": "jquery.uploadify/jquery.uploadify",
            "banner": "banner/js/adam-banner",
            "cookie": "plug-in/jquery.cookie",
            "fileupload": "plug-in/ajaxfileupload",
            "wysihtml5": "plug-in/wysihtml5/bootstrap-wysihtml5",
            "bootstrap-uploadify": "plug-in/bootstrap-uploadify",
            "validationEngine": "plug-in/validationEngine/validationEngine",
            "jquery-chosen": "plug-in/jquery-chosen/jquery-chosen",
            "jquery-msg": "plug-in/jquery-msg/jquery.msg",
            "datatimepicker": "plug-in/datetimepicker/bootstrap-datetimepicker",
            "jquery.ui.widget": "jquery.fileupload/js/vendor/jquery.ui.widget",
            "iframe-transport": "jquery.fileupload/js/jquery.iframe-transport"
        },
        shim: {
            "syntax": ["template"],
            "jquery.validate": ["jquery"],
            "jquery.serializeJSON": ["jquery"],
            "jquery.cookie": ["jquery"],
            "validate": ["jquery.validate"],
            "bootstrap": ["jquery"],
            "chosen": ["bootstrap"],
            "photoswipe": ["klass"],
            "uploadify": ["jquery"],
            "banner": ["jquery"],
            "wdatePicker": ["jquery"],
            "jcrop": ["jquery"],
            "fileupload": ["jquery"],
            "bootstrap-uploadify": ["plug-in/swfobject", "validationEngine"],
            "jquery-chosen": ["jquery"],
            "jquery-msg": ["jquery"],
            "datatimepicker": ["jquery"],
            "fotorama": ["jquery"],
            "jquery.fileupload": ["jquery.ui.widget", "iframe-transport"],
            "wysihtml5": [
                "jquery",
                "bootstrap",
                "plug-in/face/jquery.sinaEmotion",
                "plug-in/bootstrap-uploadify"
            ]
        }
    });
});
