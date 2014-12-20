'use strict';

angular.module('vsService').service('storeService', ['storeRESTFactory',function (storeRESTFactory) {
	
	this.store = function(refType,refId,action,call){
		if(action==0){
			storeRESTFactory.create({
				"refType":refType,
				"refId":refId
			},function(data){
				if(data.code == "10000"){
					call();
				}
				
			});
		}else{
			storeRESTFactory.deleteStore({
				"refType":refType,
				"refId":refId
			},function(data){
				if(data.code == "10000"){
					call();
				}
			});
		}
		
	};
	
}]);
