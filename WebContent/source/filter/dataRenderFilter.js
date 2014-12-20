'use strict';
/**
 * @classdesc 根据id来查找[{id : ,value : }]中对应的value
 *
 *
 * @constructs dataRenderFilter
 * @example
 * color | dataRenderFilter:colorMap
 * 例如：color:1  colorMap:[{id : 1,value : '红色'}，{id : 2,value : '绿色'}，{id : 3,value : '蓝色'}...]
 * 最终的值为 '红色'
 */
angular.module('vsFilter')
    .filter('dataRenderFilter', [function () {

        return function (data, label, select, array) {
            var labelValue = 'value';
            var selectValue = 'id';

            if (angular.isArray(label)) {
                array = label;
                label = labelValue;
                select = selectValue;
            }

            var viewValue = '';

            for (var i = 0; i < array.length; i++) {
                if (!angular.isArray(data)) {
                    if (array[i][select] === data) {
                        return array[i][label];
                    }
                } else {
                    for (var j = 0; j < data.length; j++) {
                        if (array[i][select] === data[j]) {
                            viewValue += (',' + array[i][label]);
                        }
                    }
                }
            }
            return viewValue.length ? viewValue.substr(1) : '';
        };
    }]);
