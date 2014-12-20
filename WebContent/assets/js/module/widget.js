(function (global) {
    'use strict';

    define([
        'jquery',
        'cmcc',
        'template',
        'bootstrap',
        'syntax'
    ], function ($, cmcc, template) {

        var
        // Save the Tomcat container prefix as a local variable
            SysPath = global.sysPath || '',
            TplFolder = '/assets/tpl/',
            TplAffix = '.tpl',

        // Constructor
            Widget = function (options) {
                // 外包容器
                this.$container = options.container || $('#sidebar');
                // 类型
                this.widgetType = options.widgetType;
                // 名字（汉语）
                this.widgetName = Widget.fn.translate(options.widgetType);
                // ID
                this.widgetId = 'w' + Widget.fn.capitalizeFirstChar(options.widgetType);
                // 内含容器
                this.$innerEl = $('.widget-body', '#' + this.widgetId);
                // 内涵容器的模板
                this.innerTpl = [SysPath, TplFolder, options.widgetType, TplAffix].join('');
                // 幻灯片间隔
                this.interval = options.interval || 5000;
            };


        Widget.fn = Widget.prototype = {

            // 初始化方法
            init: function () {
                this.createWidget();
            },

            // 基础模板文件路径
            wrapper: [SysPath + TplFolder, 'widget', TplAffix].join(''),

            // 汉化 Widget 的名称
            translate: function (rawName) {
                switch (rawName) {
                    case 'announce':
                        return '公告';
                        break;
                    case 'stock':
                        return '股票';
                        break;
                    case 'weather':
                        return '天气';
                        break;
                    default:
                        return '助手';
                }
            },

            /*
             * 返回用于 HTML 的 ID 后缀（首字母大写）如果不要大写的版本
             * 就直接用 this.widgetType
             */
            capitalizeFirstChar: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },

            // 在 DOM 中创建 Widget
            createWidget: function () {
                require(['text!' + this.wrapper], function (tpl) {
                    var render = template.compile(tpl),
                        html = render(this);

                    this.$container.append(html);
                    this.$innerEl = $('.widget-body', '#' + this.widgetId);
                    this.buildInnerBy(this.widgetType);
                }.bind(this))
            },

            // 根据类型返回 API Endpoint
            getAPIEndpoint: {
                announce: function () {
                    return SysPath + '/mobile/notice/top5Notices/' + 1;
                },
                stock: function () {
                    return SysPath + '/mobile/shares/findSharesDetail';
                },
                weather: function () {
                    return SysPath + '/mobile/findWeather';
                }
            },

            // 填充 Widget 的内容
            buildInnerBy: function (type) {
                void function () {
                    var // Cache instance object
                        self = this,

                        // Get API Endpoint
                        endPoint = self.getAPIEndpoint[type](),

                        // Fetch API data by type and save as a deferred object
                        xhrObject = $.getJSON(endPoint),

                        buildTemplate = function (rawData) {
                            require(['text!' + self.innerTpl], function (tpl) {
                                var render = template.compile(tpl),
                                    html = render({list: rawData, path: SysPath});

                                self.$innerEl.html(html).find('.carousel').carousel({
                                    interval: self.interval
                                })
                            })
                        },

                        addStock = function () {
                            self.$innerEl
                                .on('click', '.btn-add-stock', function () {
                                    $(this).hide();
                                    $('#addStockForm').show();
                                })
                                .on('click', '.btn-cancle', function () {
                                    self.$innerEl.find('.btn-add-stock').show();
                                    $('#addStockForm').hide();
                                })
                                .on('submit', '#addStockForm', function (e) {
                                    var $form = $(this);
                                    e.preventDefault();

                                    $.ajax(SysPath + '/mobile/shares/addShares', {
                                        contentType: 'application/json; charset=utf-8',
                                        data: JSON.stringify($form.serializeJSON()),
                                        type: 'post',
                                        success: function (data) {
                                        }
                                    })
                                })
                        };

                    xhrObject.done(buildTemplate, addStock)
                }.bind(this)(type)
            }
        };
        return Widget;
    })
})(this);