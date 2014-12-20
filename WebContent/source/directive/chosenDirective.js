//select(chosen-directive="p_cc",search-callback="searchReceiver",search-list="p_ccReceivers",custom-input="sendEmail",multiple,data-placeholder='  ')
angular.module('vsDirective').directive('chosenDirective', ['$parse', function ($parse) {
    return {
        link: function($scope, $element, attr) {
	        var chosenConfig = {
		        show_no_results_text : false,
		        search_contains : true
	        }
	        if(attr.width){
		        chosenConfig.width = attr.width + 'px';
	        }

	        $scope.$$postDigestQueue.push(function(){
	            $element.chosen(chosenConfig);
	        });

	        if(!$scope[attr.searchList]){
		        $scope[attr.searchList] = [];
	        }
	        var chosenUpdatedTimeout = setTimeout(function () {
		        $element.trigger("chosen:updated.chosen");
		        chosenUpdatedTimeout = undefined;
	        }, 100);
	        $scope.$watch(attr.searchList,function(newVal,oldVal){
		        if (angular.isArray(newVal)) {
			        if(chosenUpdatedTimeout) clearTimeout(chosenUpdatedTimeout);
			        chosenUpdatedTimeout = setTimeout(function () {
				        $element.trigger("chosen:updated.chosen");
				        chosenUpdatedTimeout = undefined;
			        }, 100);
		        }
	        });
	        $scope.$watchCollection(attr.searchList, function (newVal, oldVal) {
		        if (angular.isArray(newVal)) {
			        if(chosenUpdatedTimeout) clearTimeout(chosenUpdatedTimeout);
			        chosenUpdatedTimeout = setTimeout(function () {
				        $element.trigger("chosen:updated.chosen");
				        chosenUpdatedTimeout = undefined;
			        }, 100);
		        }
	        });

	        $element.on('chosen:add', function (evt, data) {
		        var index = angular.element(data.target).attr('data-option-array-index');
		        $scope[attr.searchList][index].selected = true;
	        });

	        $element.on('chosen:remove', function (evt, data) {
		        var index = angular.element(data.target).attr('data-option-array-index');
		        $scope[attr.searchList][index].selected = false;
	        });

	        $element.on('chosen:search.blur', function (evt,data) {
		        var val = data.target.val();
		        if (val && val.trim() && $scope[attr.customInput]) {
			        $scope[attr.searchList].push({name: val, selected: true});
			        $scope.$digest();
		        }
	        });

	        $element.on('chosen:search.input', function (evt, data) {
		        var inputVal = $(data.target).val().trim();
		        var getter = $parse(attr.searchCallback + '(key,mark)');
		        getter($scope, {key: inputVal, mark: attr.chosenDirective});
	        });

        }
    };
}]);