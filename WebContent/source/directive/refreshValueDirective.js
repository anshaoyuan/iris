angular.module('vsDirective').directive('refreshValueDirective',[function(){
	return {
		require : 'ngModel',
		link : function($scope,$element,$attr,ctrl){
			ctrl.refreshValue = function(){
				$element.trigger('change');
			}
		}
	}
}]);