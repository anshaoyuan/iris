angular.module('vsController').controller('messageListController',
	['$scope', 'alertBoxFactory', 'messageRESTFactory', '$rootScope','$state','$stateParams','$location',
		function ($scope, alertBoxFactory, messageRESTFactory, $rootScope,$state,$stateParams,$location) {
	var msgMaxCount = 10,currSelectedMsgId,isFirstLoad = true,isInitLoad = true,msgQueryKeywords;
	$scope.msgList = [],$scope.msgList.number = 1, $scope.loadOver = false,$scope.loadError = false;

	$scope.msgSearch = msgQueryKeywords = $location.$$search.q;

	initDropdownToggle();
	loadMsgList();

	$scope.loadMsgList = loadMsgList;

	$scope.showDetail = function (message) {
		resetList(message);
		message.unreader = 0;
		$state.go('message.session',{titleId : message.titleId,id : message.id});
	}

	$scope.$on('message.del',function(evt,data){
		for(var i = 0;i < $scope.msgList.length;i++){
			if($scope.msgList[i].id == data){
				$scope.msgList.splice(i,1);
				break;
			}
		}
	});

	$scope.searchMsg = function(){
		if($scope.msgSearch){
			var msgSearch = $scope.msgSearch;
			resetData();
			$scope.msgSearch = msgSearch;
			msgQueryKeywords = $scope.msgSearch;
			loadMsgList();
		}
	}

	$scope.$watch('msgSearch',function(newVal,oldVal){
		if(oldVal && newVal == ''){
			resetData();
			loadMsgList();
		}
	});

	function initDropdownToggle() {
		$scope.menuList = [
			{name: '我的所有消息', action: 'toMe'},
			{name: '我的私人消息', action: 'toMyself'},
			{name: '我的群组消息', action: 'myTeam'},
			{name: '我发送的消息', action: 'fromMe'}
//			{name: '我保存的草稿', action : 'draft'}
		];

		$scope.currMenu = $scope.menuList[0];

		$scope.selectMenu = function (index) {
			if(angular.isNumber(index)){
				$scope.currMenu = $scope.menuList[index];
				delete $scope.currMenu.type;
				resetData();
			}else{
				resetData();
				$scope.currMenu.type = index == 'voting' ? 'C' : 'B';
				$scope.selectAnnexation = index;
			}

			loadMsgList();
		}
	}

	function resetData(){
		isFirstLoad = true;
		$scope.msgSearch = '';
		$scope.msgList = [];
		$scope.loadOver = false;
		$scope.msgListLoading = false;
		$scope.loadError = false;
		$scope.selectAnnexation = '';
		msgQueryKeywords = '';
        $scope.msgList.number = 1;
	}

	function loadMsgList() {
		$scope.msgListLoading = true;
		$scope.loadError = false;

		var params = {},currAction,pageInfo = {pageNumber : $scope.msgList.number,pageSize : msgMaxCount};
		if(msgQueryKeywords){
			$scope.showSearchInput = false;
			currAction = 'search';
			params.pageInfo = pageInfo;
			params.queryName = msgQueryKeywords;
		}else{
			currAction = $scope.currMenu.action;
			params = pageInfo;
		}

		messageRESTFactory[currAction]({type : $scope.currMenu.type},params,function (data) {
			$scope.msgListLoading = false;
			if(!data.content){
                $scope.loadError = true;
                alertBoxFactory('加载失败!',{width : 230,textAlign : 'center'});
                return;
            }

            var result = data.content;

			if (angular.isArray(result) && result.length > 0) {
				initBgColor(result);
				fetchMyTeam(result);
				if(isFirstLoad){
					isFirstLoad = false;
					initOpen(result);
				}
				$scope.msgList = result;
                $scope.msgList.totalElements = data.totalElements;
                $scope.msgList.size = msgMaxCount;
                $scope.msgList.number = data.number;
			}

			$scope.loadOver = true;
		},function () {
			$scope.msgListLoading = false;
			$scope.loadError = true;
			alertBoxFactory('网络异常!',{width : 230,textAlign : 'center'});
		});
	}

	function initBgColor(list){
		if(!angular.isArray(list)) return;

		for(var i = 0;i < list.length;i++){
			if(list[i].unreader == 1){
				list[i].bgColor = '#ADD8E6';
			}
		}
	}

	function clearSelectedBgColor(){
		if(!angular.isArray($scope.msgList)) return;

		for(var i = 0;i < $scope.msgList.length;i++){
			if($scope.msgList[i].id == currSelectedMsgId){
				$scope.msgList[i].bgColor = '';
				break;
			}
		}
	}

	function initOpen(list){
		if($stateParams.id && isInitLoad){
			isInitLoad = false;
			return;
		}
		isInitLoad = false;

		for(var i = 0;i < list.length;i++){
			if(list[i].unreader == 1){
				$scope.showDetail(list[i]);
				return;
			}
		}

		$scope.showDetail(list[0]);
	}

	function fetchMyTeam(list){
		if(!angular.isArray(list)) return;
		for(var i = 0;i < list.length;i++){
			var msg = list[i];
			if(!angular.isArray(msg.streamReadShipList)) continue;

			var shipList = [];
			for(var j = 0;j < msg.streamReadShipList.length;j++){
				var ship = msg.streamReadShipList[j];
				if(ship.myTeam == 'Y'){
					if(shipList.length < 3){
						shipList.push(ship);
					}else{
						break;
					}
				}
			}

			if(shipList.length > 0) msg.shipList = shipList;
		}
	}

	function resetList(message){
		clearSelectedBgColor();
		message.bgColor = '#CDAF95';
		currSelectedMsgId = message.id;
	}
}]);
