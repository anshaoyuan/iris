'use strict';

/**
 * @overview 核心控制器定义文件
 * @version 0.1.0
 * @copyright iris.org © 2015
 */

angular.module('vsApp')

    .controller('vsRootController',

    /**
     * @classdesc 全局控制器，是整个应用作用域的顶级父容器
     * @constructs vsRootController
     * @param $rootScope
     *
     * @example <caption>在页面上这样初始化</caption>
     * &lt;html ng-app="vsApp" ng-controller="vsRootController as root"&gt;
     *     ...
     * &lt;/html&gt;
     */
    ['$cookies','$rootScope','chatDomain','remindFactory','$http',function ($cookies,$rootScope,chatDomain,remindFactory,$http) {
    	window.setInterval(function(){
			remindFactory();
		}, 60000);
    	
    	var nsid = $cookies.nsid;
    	if(nsid){
    		nsid = nsid.replace(/("|')/g,'');
    	}
    	//聊天服务器的websocket
	    if(nsid){
//		    var socket = $rootScope.socket = io.connect(chatDomain,{hash : 'nsid=' + nsid});
	    	
	    	$http.get(chatDomain + '/api/historySession;nsid=' + nsid).success(function(data){
	    		console.log(data);
	    	}).error(function(err){
	    		console.error(err);
	    	});

//		    socket.on('whisper',function(data){
//			    alert('whisper data:' + JSON.stringify(data));
//		    });
//
//		    socket.on('broadcast',function(data){
//			    alert('broadcast data:' + JSON.stringify(data));
//		    });
//
//		    socket.on('groupChat',function(data){
//			    alert('groupChat data:' + JSON.stringify(data));
//		    });
//
//		    socket.on('refresh-group',function(data){
//			    alert('refresh-group : ' + data);
//		    });
	    }
    }]);