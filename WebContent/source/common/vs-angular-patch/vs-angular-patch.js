'use strict';

var patchMod = angular.module('vs.angular.patch', []);
patchMod.directive('input', function () {
    return {
        priority: 1000,
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attr, ctrl) {
            if (attr.type === 'checkbox' && ctrl && attr.value) {
                ctrl.$parsers = [];
                ctrl.$parsers.push(parserFn);

                ctrl.$formatters = [];
                ctrl.$formatters.push(formatterFn);
            }

            function formatterFn(val) {
                if (angular.isString(val)) {
                    return val === attr.value;
                } else if (angular.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        if (val[i] === attr.value) {
                            return true;
                        }
                    }
                    return false;
                }
            }

            function parserFn(val) {
                if (angular.isString(ctrl.$modelValue)) {
                    if (ctrl.$modelValue === '') {
                        return val ? attr.value : '';
                    }
                    return val ?
                        (attr.value !== ctrl.$modelValue ? [ctrl.$modelValue, attr.value] : ctrl.$modelValue) :
                        (attr.value === ctrl.$modelValue ? '' : ctrl.$modelValue);
                } else if (angular.isArray(ctrl.$modelValue)) {
                    var $$modelValue = ctrl.$modelValue.slice(0);

                    if ($$modelValue.length === 0) {
                        if (val) {
                            $$modelValue.push(attr.value);
                        }
                        return $$modelValue;
                    }

                    var existsBool = false;
                    for (var i = 0; i < $$modelValue.length; i++) {
                        if ($$modelValue[i] === attr.value) {
                            if (val) {
                                existsBool = true;
                                break;
                            } else {
                                $$modelValue.splice(i, 1);
                            }
                        }
                    }

                    if (val && !existsBool) {
                        $$modelValue.push(attr.value);
                    }

                    return $$modelValue;
                }
                return val;
            }
        }
    };
});

patchMod.directive('input', function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attr, ctrl) {
            if (ctrl && attr.type === 'number') {
                ctrl.$viewChangeListeners.push(function () {
                    ctrl.$setValidity(null, !!ctrl.$viewValue);
                });
            }
        }
    };
});
