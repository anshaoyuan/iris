'use strict';
angular.module('vsController').controller('searchController',
	['$scope', 'searchRESTFactory', 'alertBoxFactory', '$location','$state','$sce',
		function ($scope, searchRESTFactory, alertBoxFactory, $location,$state,$sce) {
			$scope.currNav = 'BLOG';
			$scope.currentPage = 1;
			$scope.itemsPerPage = 10;//每页显示的条数
			$scope.maxSize = 10; //最大显示页码个数
			$scope.loading = true;
			$scope.createBy = "";

			var searchText = '*';
			if ($location.search().s && $location.search().s !== true) {
				searchText = $location.search().s;
			}

			if ($location.search().nav && $location.search().nav !== true) {
				$scope.currNav = $location.search().nav;
			}

			if ($location.search().page && $location.search().page !== true) {
				$scope.currentPage = $location.search().page;
			}

			if ($location.search().createBy && $location.search().createBy !== true) {
				$scope.createBy = $location.search().createBy;
			}
			getLists($scope.currNav, searchText, $scope.currentPage,$scope.createBy);

			$scope.switchNav = function (nav) {
					$state.go('search',{
						nav : nav,
						page : 1,
						s : searchText
					});
			};

			$scope.paging = function () {
				if($scope.createBy==""){
					$state.go('search',{
						nav : $scope.currNav,
						page : $scope.currentPage,
						s : searchText
					});
				}else{
					$state.go('search',{
						nav : $scope.currNav,
						page : $scope.currentPage,
						s : searchText,
						createBy : $scope.createBy
					});
				}
				
			};
			
			$scope.gotoDetail = function(type,id){
				if(type =='STREAM'){
					$state.go('message.detail',{id:id},{inherit:true});
				}else if(type=='QUESTION'){
					$state.go('questions_show_id',{id:id},{inherit:true});
				}else{
					$state.go('articles_show_id',{id:id},{inherit:true} );
				}
			};

			function getLists(type, searchText, page,createBy) {
				var start = (page - 1) * $scope.itemsPerPage;
				searchRESTFactory.list({
					"select": searchText ? searchText : '*',
					"createBy":"["+createBy+"]"	,	
					"module": type,
					"start": start,
					"rows": $scope.itemsPerPage
				}, function (data) {
					$scope.loading = false;
					$scope.currentPage = page;
					$scope.showList = data.response.docs;
					$scope.highLists = data.highlighting;
					$scope.lists = [];
					for(var i =0 ; i < $scope.showList.length; i++){
						var obj = $scope.showList[i];
						if($scope.highLists[obj.id]){
							var high = $scope.highLists[obj.id];
							if(high.ss_stream_text){
								obj.ss_stream_text = $sce.trustAsHtml(high.ss_stream_text[0]);
							}
							if(high.ss_title_name){
								obj.ss_title_name = $sce.trustAsHtml(high.ss_title_name[0]);
							}
							
						}
						$scope.lists.push(obj);
					}
					
					$scope.totalItems = data.response.numFound;
				}, function(){
					alertBoxFactory('网络异常!',{textAlign : 'center',width : 220});
					$scope.loading = false;
				});
			};

		}]);
