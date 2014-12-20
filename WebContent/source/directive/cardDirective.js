'use strict';
/**
 * @classdesc 卡片效果类似新浪微博中，鼠标移到用户头像时出现的包含用户信息的卡片层
 *
 *
 * @constructs cardDirective
 * @example
 * &lt;div card-directive width="200" event="mouseenter|click"
 * direction="top|bottom|left|right" template="用户信息..." templateUrl="public/template/userInfo.html"
 * controller="userCardInfoController"&gt;&lt;/div&gt;
 * 或者
 * &lt;div card-directive="userCardInfo" &gt;&lt;/div&gt;
 * userCardInfo为当前作用域中的一个值
 * userCardInfo = {width : 200,event : 'click',controller : 'userCardInfoController',...}
 */
angular.module('vsDirective').directive('cardDirective',
    ['domService', 'utilService', '$compile', '$http',

        function (domService, utilService, $compile, $http) {
            var defaultConfig = {
                width: 190,
                event: 'mouseenter',
                direction: 'right',
                template: '#',
                templateUrl: '#',
                controller: '#'
            };
            var panelHtml = '<div style="z-index:100;border-radius:4px;position:absolute;overflow: hidden;width:$width$px"></div>';
            // todo: 处理背景图片的解析路径
            var bodyHtml = '<div style="display:none;padding:3px;background:url();"></div>';
            var contentHtml = '<div style="padding:10px 20px;background-color: #ffffff;text-align: center;"><div class="p_loading">加载中...</div><div class="p_arrow"></div></div>';

            return {
                scope: {
                    config: '=?cardDirective',
                    width: '@',
                    event: '@',
                    template: '@',
                    templateUrl: '@',
                    controller: '@',
                    direction: '@'
                },
                link: linkFn
            };

            function linkFn(scope, element, attr) {
                if (!angular.isObject(scope.config)) scope.config = {};
                var _config = utilService.extend(scope, scope.config, defaultConfig);
	            angular.extend( scope.config,_config);

                element.on(scope.config.event, eventListener);

                function eventListener() {
                    if (element.data('isShow')) return;
                    else element.data('isShow', true);

                    var elementPosition = domService.position(element[0]);

                    var panelEle = angular.element(panelHtml.replace('$width$', scope.config.width));
                    var bodyEle = angular.element(bodyHtml);
                    var contentEle = angular.element(contentHtml);
                    bodyEle.append(contentEle);
                    panelEle.append(bodyEle);
                    document.body.appendChild(panelEle[0]);

                    var panelEleHeight = parseInt(panelEle.css('height'));
                    var panelElePosition = getPosition(
                        {top: elementPosition.top, left: elementPosition.left, width: parseInt(element.css('width')), height: parseInt(element.css('height'))},
                        {top: 0, left: 0, width: parseInt(panelEle.css('width')), height: parseInt(panelEle.css('height'))},
                        scope.config.direction
                    );
                    panelEle.css({top: panelElePosition.top + 'px', left: panelElePosition.left + 'px'});
                    bodyEle.fadeIn('fast');

                    panelEle.one('mouseenter', function () {
                        panelEle.data('enter', true);
                    });
                    panelEle.one('mouseleave', function () {
                        panelEle.data('enter', false);
                        removeFn();
                    });
                    element.one('mouseleave', removeFn);

                    if (scope.config.template && scope.config.template != '#') {
                        compileContent();
                    } else {
                        loadContent();
                    }

                    function loadContent() {
                        $http({url: scope.config.templateUrl, method: 'get'}).success(function (data) {
                            scope.config.template = data;
                            compileContent();
                        });
                    }

                    function compileContent() {
                        contentEle.children('.p_loading').remove();
                        contentEle.append(angular.element(scope.config.template));
                        contentEle.attr('ng-controller', scope.config.controller);
                        $compile(contentEle)(angular.extend(scope, {config: scope.config, attr: attr}));
                        try {
                            scope.$digest();
                        } catch (e) {
                        }
                    }

                    function removeFn(event) {
                        window.setTimeout(function () {
                            if (!panelEle.data('enter')) {
                                bodyEle.fadeOut('fast', null, function () {
                                    panelEle.remove();
                                    element.data('isShow', false);
                                });
                            }
                        }, 100);
                    }
                }

                function getPosition(dist, tag, direction) {
                    if (direction == 'top') {
                        return {top: dist.top - tag.height + tag.top - 3, left: dist.left + tag.left};
                    } else if (direction == 'left') {
                        return {top: dist.top + tag.top, left: dist.left - tag.width + tag.left - 3};
                    } else if (direction == 'right') {
                        return {top: dist.top + tag.top, left: dist.left + dist.width + tag.left + 3};
                    } else if (direction == 'bottom') {
                        return {top: dist.top + dist.height + tag.top + 3, left: dist.left + tag.left};
                    } else {
                        return {top: 0, left: 0};
                    }
                }

            }
        }]);
