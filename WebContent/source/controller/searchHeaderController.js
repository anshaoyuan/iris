angular.module('vsController').controller('searchHeaderController',
	['$scope', '$location', '$state', function ($scope, $location, $state) {
		$scope.searchInput = '';
		if ($location.search().s && $location.search().s !== true) {
			$scope.searchInput = $location.search().s;
		}

		$scope.search = function () {
			if ($scope.searchInput.length <= 0) return;
			var params = {
				page: 1,
				s: $scope.searchInput
			}

			if ($location.search().nav && $location.search().nav !== true) {
				params.nav = $location.search().nav;
			}

			$location.url('/search?s=' + params.s + '&page=1' + (params.nav ? '&nav=' + params.nav : ''));
//			$state.go('search', para ms,{reload : true});
			
		};
	}]);