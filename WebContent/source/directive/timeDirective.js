'use strict';
/**
 * @classdesc 通过调用timeFilter来实现时间的动态更新，间隔为一分钟
 *
 *
 * @constructs timeDirective
 * @example
 * &lt;span time-directive value="1393852258408"&gt;&lt;/span&gt;
 */
angular.module('vsDirective').directive('timeDirective',
    ['$filter', '$timeout', function ($filter, $timeout) {
        function schedule(element, attrs) {
            element.text($filter('timeFilter')(attrs.value));
            $timeout(function () {
                schedule(element, attrs);
            }, 60000);
        }

        return function ($scope, element, attr) {
            schedule(element, attr);
        };
    }]);
