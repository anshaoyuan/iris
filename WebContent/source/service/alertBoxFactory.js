'use strict';
/**
 * @classdesc 弹出层效果
 *
 *
 * @constructs alertBoxFactory
 * @example
 * function(alertBoxFactory){
 *     $http({...}).success(function(){}).error(function(){
 *      alertBoxFactory('删除失败',{width : 200,textAlign: 'center',height : 30,waitTime : 2,type : 'success|info|warn|error'})
 *     });
 * }
 */
angular.module('vsService').factory('alertBoxFactory', [function () {
    var width = 600, top = 50, waitTime = 4, type = 'warn';
    var typeColor = {
        success: { bgColor: '#dff0d8', fontColor: '#3c763d' },
        info: { bgColor: '#d9edf7', fontColor: '#31708f' },
        warn: { bgColor: '#fcf8e3', fontColor: '#8a6d3b' },
        error: { bgColor: '#f2dede', fontColor: '#a94442' }
    };
    var panelHtml = '<div style="position: fixed;overflow: hidden;z-index:102"></div>';
    var bodyHtml = '<div style="position: relative;padding:30px;"></div>';
    var contentHtml = '<div style="border-radius: 3px;box-shadow:0px 0px 30px 1px gray;line-height: 30px;padding:10px 35px 10px 30px"></div>';
    var closeBtnHtml = '<span style="top:40px;position : absolute;right:50px;cursor:pointer;font-weight: bold;"  type="button">x</span>';
    return function (content, config) {
        if (!angular.isObject(config)) {
            config = {};
        }
        fetchConfig(config);

        var panelEle, panelEleHeight, bodyEle, contentEle, closeBtn;

        panelEle = angular.element(panelHtml);
        panelEle.css({top: config.top + 'px', width: config.width + 'px', left: (document.body.clientWidth - config.width) / 2 + 'px'});
        bodyEle = angular.element(bodyHtml);
        panelEle.append(bodyEle);
        contentEle = angular.element(contentHtml);
        bodyEle.append(contentEle);
        document.body.appendChild(panelEle[0]);
        panelEleHeight = parseInt(panelEle.css('height'));
        bodyEle.remove();

        bodyEle = angular.element(bodyHtml).css('top', panelEleHeight + 30 + 'px');
        contentEle = angular.element(contentHtml);
        contentEle.css({textAlign: config.textAlign, backgroundColor: typeColor[config.type].bgColor, color: typeColor[config.type].fontColor});
        bodyEle.append(contentEle);
        panelEle.append(bodyEle);

        if (angular.isFunction(config.close)) {
            contentEle.append(angular.element('<span></span>').text(content));
            closeBtn = angular.element(closeBtnHtml);
            closeBtn.on('click', remove);
            contentEle.append(closeBtn);
        } else {
            contentEle.text(content);
            setTimeout(remove, config.waitTime * 1000);
        }

        bodyEle.animate({top: '0px'}, 'fast');

        function remove() {
            bodyEle.animate({top: panelEleHeight + 30 + 'px'}, 'fast', null, function () {
                panelEle.remove();
                if (angular.isFunction(config.close)) config.close(config);
            });
        }
    };

    function fetchConfig(config) {
        if (!angular.isNumber(config.width)) config.width = width;
        if (!angular.isNumber(config.top)) config.top = top;
        if (!angular.isNumber(config.waitTime)) config.waitTime = waitTime;
        if (!angular.isString(config.type)) config.type = type;
    }

}]);
