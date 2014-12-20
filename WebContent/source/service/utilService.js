'use strict';

angular.module('vsService').service('utilService', [function () {

    this.extend = function (firstObj, secondObj, defaultObj, obj) {
        var resultObj = angular.isObject(obj) ? obj : {};

        for (var key in defaultObj) {
            if (firstObj && firstObj[key]) {
                resultObj[key] = firstObj[key];
            }
	        if (secondObj && secondObj[key]) {
                resultObj[key] = secondObj[key];
            }
	        if(!resultObj[key]){
                resultObj[key] = defaultObj[key];
            }
        }

        if (!angular.isObject(obj)) {
            return resultObj;
        }
    };
    
    this.getMentions = function(list){
    	var mentionStr = "";
    	for(var i=0;i<list.length;i++){
    		mentionStr = mentionStr + list[i].aliasName+",";
    	}
    	if(mentionStr!=""){
    		mentionStr = mentionStr.slice(0,mentionStr.length-1);
    		mentionStr=mentionStr+" 赞过";
    	}
    	return mentionStr;
    };
}]);
