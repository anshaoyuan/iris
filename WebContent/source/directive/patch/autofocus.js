angular.module('vsDirective').directive('autofocus',[function(){
	return {
		compile : function($element,attr){
			if(attr.autofocus == 'true' || attr.autofocus == ''){
                setTimeout(function () {
                    $element.focus();
                }, 100);
			}
		}
	}
}]);
