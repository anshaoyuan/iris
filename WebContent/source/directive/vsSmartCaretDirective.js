'use strict';

/**
 * @overview 核心指令定义文件
 * @version 0.1.0
 * @copyright iris.org © 2015
 */

angular.module('vsDirective')
    .directive('vsSmartCaret', function () {

        /**
         * @classdesc 插入一个 `span` 标签，其样式依赖于 [Font Awesome](http://fontawesome.io/)，
         * 可显示四方向的箭头，能基于自定义条件判断并触发自定义动作来交换预先指定的两个方向
         *
         * 自定义条件可双向绑定外部作用域属性，但请小心：__如果两个 `vn-smart-caret` 绑定
         * 同一个外部作用域属性，则会导致它们的行为同步__，这未必是你预期的行为
         *
         * @constructs vsSmartCaretDirective
         * @example
         * &lt;vs-smart-caret vs-careta="left"
         *                 vs-caretb="down"
         *                 vs-action="click"
         *                 vs-baseon="ctrl.property"&gt;&lt;/vs-smart-caret&gt;
         */
        return {
            /**
             * 限制为仅元素
             *
             * @inner
             * @readonly
             * @property {string}
             * @default 'E'
             * @memberof vsSmartCaretDirective
             */
            restrict: 'E',
            /**
             * 开启模板替换
             *
             * @inner
             * @readonly
             * @property {boolean}
             * @default true
             * @memberof vsSmartCaretDirective
             */
            replace: true,
            link: _linkFn,
            /**
             * 指令的作用域
             *
             * @inner
             * @readonly
             * @enum {string}
             * @memberof vsSmartCaretDirective
             */
            scope: {
                careta: '@vsCareta',
                caretb: '@vsCaretb',
                action: '@vsAction',
                baseon: '=vsBaseon'
            },
            template: '<span class="fa fa-fw fa-caret-{{ careta }}"></span>'
        };

        function _linkFn(scope, element, attrs) {
            var caret = angular.element(element),
                careta = 'fa-caret-' + scope.careta,
                caretb = 'fa-caret-' + scope.caretb;

            element.on(attrs['vsAction'], function () {
                scope.$apply(scope.baseon = !scope.baseon);
                if (scope.baseon) {
                    caret.addClass(careta).removeClass(caretb);
                } else {
                    caret.addClass(caretb).removeClass(careta);
                }
            });
        }
    });
