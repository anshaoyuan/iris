'use strict';
/**
 * @classdesc 实现时间的友好输出，具体格式为:n秒前，n分钟前，n小时前，n天前，超过30天的为：yyyy-MM-dd HH:mm:ss
 *
 *
 * @constructs timeFilter
 * @example
 * createDate | timeFilter
 * 例如：color:1  colorMap:[{id : 1,value : '红色'}，{id : 2,value : '绿色'}，{id : 3,value : '蓝色'}...]
 * 最终的值为 '红色'
 */
angular.module('vsFilter')
    .filter('timeFilter', ['$filter', function ($filter) {

    var dateFormat = $filter('date');

    return function (time) {
        if(!time) return;

        var timeStr,currDate = new Date(),targetDate = new Date(time);
        var currTime = currDate.getTime();
        var dValue = currTime - time;

        if ((dValue = parseInt(dValue / 1000)) < 60) {
            timeStr = "刚刚";
        } else if ((dValue = parseInt(dValue / 60)) < 60) {
            timeStr = dValue + "分钟前";
        } else if ((dValue = parseInt(dValue / 60)) < 24) {
            timeStr = dValue + "小时前";
        } else if ((dValue = parseInt(dValue / 24)) < 4) {
            timeStr = dValue + "天前";
        } else if(currDate.getFullYear() == targetDate.getFullYear()){
            timeStr = dateFormat(time, 'MM月dd日 HH:mm');
        }else {
            timeStr = dateFormat(time, 'yyyy年MM月dd日 HH:mm');
        }
        return timeStr;
    };
}]);
