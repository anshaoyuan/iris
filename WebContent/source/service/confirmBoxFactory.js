'use strict';
/**
 * @classdesc 确认弹出层效果
 *
 *
 * @constructs confirmBoxFactory
 * @example
 * function(confirmBoxFactory){
 *     $http({...}).success(function(){}).error(function(){
 *      confirmBoxFactory('确定删除吗?',{width : 200,top : 200,type : 'success|info|warn|error',okFn : noop,cancelFn : noop})
 *     });
 * }
 */
angular.module('vsService').factory('confirmBoxFactory', [function () {
	var width = 600, top = 50, type = 'warn',okText = '确定',cancelText = '取消';
	var typeColor = {
		success: { bgColor: '#dff0d8', fontColor: '#3c763d' },
		info: { bgColor: '#d9edf7', fontColor: '#31708f' },
		warn: { bgColor: '#fcf8e3', fontColor: '#8a6d3b' },
		error: { bgColor: '#f2dede', fontColor: '#a94442' }
	};
	var panelHtml = '<div style="position: fixed;overflow: hidden;z-index:102"></div>';
	var bodyHtml = '<div style="position: relative;padding:30px;"></div>';
	var contentHtml = '<div style="border-radius: 3px;box-shadow:0px 0px 30px 1px gray;line-height: 30px;padding:10px 35px 10px 30px">'+
		'<div class="text-center">' +
		'<div>$content$</div>' +
		'<span class="btn btn-success btn-sm popup-ok">$okText$</span>&nbsp;&nbsp;<span class="btn btn-default btn-sm popup-cancel">$cancelText$</span>' +
		'</div></div>';

	return function (content, config) {
		if (!angular.isObject(config)) {
			config = {};
		}
		fetchConfig(config);

		var panelEle, panelEleHeight, bodyEle, contentEle, closeBtn,_contentHtml;

		_contentHtml = contentHtml.replace('$content$',content)
			.replace('$okText$',config.okText)
			.replace('$cancelText$',config.cancelText);

		panelEle = angular.element(panelHtml);
		panelEle.css({top: config.top + 'px', width: config.width + 'px', left: (document.body.clientWidth - config.width) / 2 + 'px'});
		bodyEle = angular.element(bodyHtml);
		panelEle.append(bodyEle);
		contentEle = angular.element(_contentHtml);
		bodyEle.append(contentEle);
		document.body.appendChild(panelEle[0]);
		panelEleHeight = parseInt(panelEle.css('height'));
		bodyEle.remove();

		bodyEle = angular.element(bodyHtml).css('top', panelEleHeight + 30 + 'px');
		contentEle = angular.element(_contentHtml);
		contentEle.css({backgroundColor: typeColor[config.type].bgColor, color: typeColor[config.type].fontColor});
		bodyEle.append(contentEle);
		panelEle.append(bodyEle);

		contentEle.find('.popup-ok,.popup-cancel').click(function(){
			if(angular.element(this).hasClass('popup-ok')){
				config.okFn();
			}else if(angular.element(this).hasClass('popup-cancel')){
				config.cancelFn();
			}
			remove();
		});

		bodyEle.animate({top: '0px'}, 'fast');

		function remove() {
			bodyEle.animate({top: panelEleHeight + 30 + 'px'}, 'fast', null, function () {
				panelEle.remove();
				if (angular.isFunction(config.close)) config.close(config);
			});
		}
	};

	function fetchConfig(config) {
		if (!angular.isString(config.okText)) config.okText = okText;
		if (!angular.isString(config.cancelText)) config.cancelText = cancelText;
		if (!angular.isNumber(config.width)) config.width = width;
		if (!angular.isNumber(config.top)) config.top = top;
		if (!angular.isString(config.type)) config.type = type;
		if (!angular.isFunction(config.okFn)) config.okFn = angular.noop;
		if (!angular.isFunction(config.cancelFn)) config.cancelFn = angular.noop;
	}

}]);
