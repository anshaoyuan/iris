'use strict';
/**
 * @classdesc 确认弹出框,比如页面上有个删除链接<a>删除</a>或者<input type="button" value="删除">
 * 当点击这个元素的时候活在该元素上弹出确认层，类似window.alert('...'),
 *
 *
 * @constructs confirmDirective
 * @example
 * &lt;a confirm-directive title="确认删除吗?" ok-text="删除" cancel-text="取消"
 * width="200" ok-fn="ok(config,attr)" cancel-fn="cancel(config,attr)"&gt;删除&lt;/a&gt;
 *  其中，ok-fn="ok(config,attr)" cancel-fn="cancel(config,attr)"
 *  ok，cancel为作用域中的一个函数接收到的参数为config,attr
 * 或者
 * &lt;a confirm-directive="delUserConfig" &gt;删除&lt;/a&gt;
 * delUserConfig 为作用域中的一个值
 * delUserConfig ： {title : '...',okFn : function({config: scope.config, attr: attr}){}
 * ,cancelFn : function({config: scope.config, attr: attr}){}}
 */
angular.module('vsDirective').directive('confirmDirective',
    ['domService', 'utilService', function (domService, utilService) {
        var defaultConfig = {
            okText: '确定',
            cancelText: '取消',
            title: '标题',
            okFn: angular.noop,
            cancelFn: angular.noop,
            width: 160
        };
        var popupPanelHtml = '<div style="width:$width$px;z-index:100;border-radius:4px;margin:0px;overflow: hidden;position: relative;"></div>';
        // todo: 处理背景图片解析路径
        var popupBodyHtml = '<div style="padding:3px;background:url(/img/layer_bg.png);position: relative;"><div style="line-height:25px;padding:8px;background-color:white;"><div style="margin-bottom:4px;text-align: center;">$title$</div><div style="text-align: center;"><span class="btn btn-success btn-sm popup-ok">$okText$</span>&nbsp;&nbsp;<span class="btn btn-default btn-sm popup-cancel">$cancelText$</span></div></div></div>';

        return {
            scope: {
                config: '=?confirmDirective',
                okText: '@',
                cancelText: '@',
                title: '@',
                okFn: '&',
                cancelFn: '&',
                width: '@'
            },
            link: linkFn
        };
        function linkFn(scope, element, attr) {
            if (!angular.isObject(scope.config)) scope.config = {};
            var _config = utilService.extend(scope, scope.config, defaultConfig);
	        angular.extend( scope.config,_config);

            element.on('click', function () {
                if (element.data('popup')) return;
                else element.data('popup', true);

                var pos = domService.position(element[0]);
                var popupPanelEle = angular.element(popupPanelHtml.replace('$width$', scope.config.width));
                var popupBodyEle = angular.element(popupBodyHtml.replace('$title$', scope.config.title)
                    .replace('$okText$', scope.config.okText)
                    .replace('$cancelText$', scope.config.cancelText));
                popupPanelEle.append(popupBodyEle);
                document.body.appendChild(popupPanelEle[0]);

                var popupEleHeight = parseInt(popupPanelEle.css('height'));
                var elementWidth = parseInt(element.css('width'));

                popupPanelEle.css({position: 'absolute', top: (pos.top - popupEleHeight) + 'px', left: pos.left - Math.abs(scope.config.width - elementWidth) / 2 + 'px'});
                popupBodyEle.remove();

                popupBodyEle = angular.element(popupBodyHtml.replace('$title$', scope.config.title)
                    .replace('$okText$', scope.config.okText)
                    .replace('$cancelText$', scope.config.cancelText)
                ).css('top', popupEleHeight + 'px');
                popupPanelEle.append(popupBodyEle);
                popupBodyEle.animate({top: '0px'}, 'fast');

                popupBodyEle.find('.popup-ok').on('click', function () {
                    popupBodyEle.animate({top: popupEleHeight + 'px'}, 'fast', null, function () {
                        removeEle();
                        scope.config.okFn({config: scope.config, attr: attr});
                    });
                });

                popupBodyEle.find('.popup-cancel').on('click', function () {
                    popupBodyEle.animate({top: popupEleHeight + 'px'}, 'fast', null, function () {
                        removeEle();
                        scope.config.cancelFn({config: scope.config, attr: attr});
                    });
                });

                function removeEle() {
                    popupPanelEle.remove();
                    element.data('popup', false);
                }
            });

        }
    }]);
