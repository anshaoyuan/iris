'use strict';

angular.module('vsService')
    .service('domService', ['$window', function (window) {
        var position, scrollPos, d, e, f, g, h;

        this.position = function (element) {
            if (element === document.body) {
                return !1;
            }
            if (element.parentNode === null) {
                return !1;
            }
            if (element.style.display === "none") {
                return !1;
            }

            if (element.getBoundingClientRect) {
                position = element.getBoundingClientRect();
                scrollPos = this.scrollPos();
                e = element.ownerDocument.body;
                f = element.ownerDocument.documentElement;
                g = f.clientTop || e.clientTop || 0;
                h = f.clientLeft || e.clientLeft || 0;
                return {
                    left: parseInt(position.left + scrollPos.left - h, 10) || 0,
                    top: parseInt(position.top + scrollPos.top - g, 10) || 0
                };
            } else {
                d = [element.offsetLeft, element.offsetTop];
                e = element.offsetParent;
                while (e) {
                    d[0] += e.offsetLeft;
                    d[1] += e.offsetTop;
                    e = e.offsetParent;
                }
            }
            return {
                left: parseInt(d[0], 10),
                top: parseInt(d[1], 10)
            };
        };

        this.scrollPos = function (element) {
            element = element || document;
            var b = element.documentElement, c = element.body;
            return {
                top: Math.max(window.pageYOffset || 0, b.scrollTop, c.scrollTop),
                left: Math.max(window.pageXOffset || 0, b.scrollLeft, c.scrollLeft)
            };
        };
    }]);
