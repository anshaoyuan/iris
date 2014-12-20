'use strict';
/**
 * @classdesc 类似图片广告，实现了滑入划出效果
 *
 *
 * @constructs imgSlideDirective
 * @example
 * &lt;img-slide-directive width="650" height="100" direction="h|v" speed="4" list="adImgList"&gt;&lt;/img-slide-directive&gt;
 * adImgList为作用域中的数组变量类似['/img/1.png','img/2.png',...]
 */
angular.module('vsDirective').directive('imgSlideDirective',
    ['$window', '$log', 'utilService', function (window, log, utilService) {
        var defaultConfig = {
            list: [],
            width: 650,
            height: 100,
            speed: 4,
            direction: 'h'
        };

        return {
            restrict: 'E',
            scope: {
                list: '=',
                width: '@',
                height: '@',
                speed: '@',
                direction: '@'
            },
            template: '<div style="overflow: hidden;position: relative"><a href=""></a></div>',
            replace: true,
            link: linkFn
        };
        function linkFn(scope, element, attr) {
        	var loaded = false;
            if (!angular.isObject(scope.config)) scope.config = {};
            var _config = utilService.extend(scope, scope.config, defaultConfig);
	        angular.extend( scope.config,_config);

            var navSize = 10, timePollFn, isAnimate, currImg;
            var imgTag = '<img style="position: absolute;width:' + scope.config.width + 'px;height:' + scope.config.height + 'px;">';
            var navTag = '<div class="pull-left" style="text-align:center;margin:0px;padding:0px;width:' + (navSize * 2) + 'px;height:' + (navSize * 2) + 'px;cursor:pointer;"></span>';
            var navPanelTag = '<div class="clearfix" style="position: relative;z-index: 100;margin:0px;padding:0px;"></div>';
            var list = null;
            var speed = scope.config.speed * 1000;

            var position = scope.config.direction == 'h' ? 'left' : 'top';
            var positionNum = position == 'left' ? scope.config.width : -scope.config.height;
            var navPanel = null;
            
            scope.$watch('list',function(newVal){
            	if(!loaded && newVal && newVal.length > 0){
            		loaded = true;
                    list = scope.config.list = newVal;
            		run();
            	}
            });
            
            function run(){
                var linkElement = element.children('a');

                linkElement.on('click',function(event){
                    if(angular.element(event.target).is('div')){
                        event.preventDefault();
                    }
                });

            	element[0].style.width = scope.config.width + 'px';
            	element[0].style.height = scope.config.height + 'px';
                linkElement.append(angular.element(imgTag).css(position, '0px').css((position == 'left' ? 'top' : 'left'), '0px').attr('src', list[0].src));
                linkElement.append(angular.element(imgTag).css(position, positionNum + 'px').css((position == 'left' ? 'top' : 'left'), '0px').attr('src', list[1].src));
            	
            	navPanel = angular.element(navPanelTag);
            	navPanel.css('top', scope.config.height - (navSize * 2) - 5 + 'px');
            	navPanel.css('left', scope.config.width - (list.length * (navSize * 2)) - 5 + 'px');
            	angular.forEach(list, function (val, index) {
            		var nav = angular.element(navTag);
            		nav.text(index + 1);
            		nav.data('index', index);
            		nav.on('click', navClickFn);
            		navPanel.append(nav);
            	});
                linkElement.append(navPanel);
            	
            	pollFn();
            }

            function navClickFn() {
                if (!isAnimate) {
                    if (timePollFn) window.clearTimeout(timePollFn);
                    currImg = angular.element(this).data('index');
                    element.find('img:eq(1)').attr('src', list[currImg].src);
                    pollFn();
                }
            }

            function pollFn() {
                var linkElement = element.children('a');

                if (currImg !== undefined) {
                    var animateProp = {};
                    animateProp[position] = '0px';
                    isAnimate = true;
                    navPanel.children().css({'color': 'black', 'border': ''});
                    navPanel.children(':eq(' + currImg + ')').css({'color': 'red', 'border': 'solid 1px gray'});
                    angular.element(element.find('img:eq(1)')).animate(animateProp, 600, null, function () {
                        isAnimate = false;
                        var imgEle = angular.element(element.find('img:eq(0)'));
                        imgEle.css(position, positionNum + "px").attr('src', list[currImg].src);
                        imgEle.remove();
                        linkElement.append(imgEle);
                    });
                } else {
                    currImg = 0;
                }

                linkElement.attr('href',list[currImg].href);

                (++currImg >= list.length) && (currImg = 0);
                timePollFn = window.setTimeout(pollFn, speed);
            }
        }
    }]);

