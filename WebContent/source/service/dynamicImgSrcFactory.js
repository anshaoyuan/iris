angular.module('vsService').factory('dynamicImgSrcFactory',['$location',function($location){
	return function(content){
		var urlPrefix = $location.protocol() + '://' + $location.host() + ($location.port() ? ':' + $location.port() : '');
		var ele = $('<div></div>').html(content);
		var imgEles = ele.find('img');
		imgEles.each(function(){
			var src = this.src;
			src = src.substr(src.indexOf('downloadFile'));
			src = urlPrefix + '/' + src;
			this.src = src;
		});
		return ele.html();
	}
}]);