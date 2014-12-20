angular.module('vsFilter').filter('omitFilter',
		function(){
		return function(str,length,dots){
			if(str && angular.isNumber(str.length) && str.length > length){
				str = str.slice(0,length) + (dots ? dots : "....");
			}
			return str;
		}
	
});
