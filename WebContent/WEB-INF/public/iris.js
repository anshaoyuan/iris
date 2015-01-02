'use strict';
// Source: source/module/REST.js
'use strict';

/**
 * @overview REST Adaptor 定义文件
 * @version
 * @copyright iris.org © 2015
 */

/**
 *
 * @module vsREST
 * @type {*|module}
 * @requires ngResource
 * @example <caption>请按照下面的方式获取消息模块的实例，不要创建全局变量引用</caption>
 * angular.module('vsREST');
 */
angular.module('vsREST', ['ngResource']);

// Source: source/module/app.js
/**
 * @overview 核心模块定义文件
 * @version 0.1.0
 * @copyright iris.org © 2015
 */

/**
 * 核心模块，同时也是应用在页面的入口。 为什么是 `vs`？
 *
 * 遵循 Angular 的管理，采用短前缀来避免可能存在的命名冲突。AngularJS 采用的短前缀是
 * `ng`，我们使用 `vs`，代表 _visionet sloth_ 这两个单词。
 *
 * @module vsApp
 * @type {*|module}
 * @requires vs.angular.patch
 * @requires ngRoute
 * @requires ngAnimate
 * @requires ui.bootstrap
 * @requires vsFilter
 * @requires vsService
 * @requires vsDirective
 * @example <caption>在页面上这样初始化</caption>
 * &lt;html ng-app="vsApp"&gt;
 *     ...
 * &lt;/html&gt;
 */
angular.module('vsApp', [
    'vs.angular.patch',
    //        'ngRoute',
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ui.bootstrap',
    'vsFilter',
    'vsService',
    'vsDirective',
    'vsController',
    'ui.utils'
])

    .config(['$stateProvider','$locationProvider', '$urlRouterProvider','$httpProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider,$httpProvider) { 'use strict';
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/otherwise');
        $httpProvider.interceptors.push('sessionInterceptorFactory');

        $stateProvider
            // Messages
            // .state('default', {
            //   url : '',
            //   templateUrl: 'template/message/index.html'
            // })
            //  .state('index', {
            //   url : '/',
            //  templateUrl: 'template/message/index.html'
            // })
            /*.state('message', {
                url: '/messages',
                templateUrl: 'template/message/index.html'
            })
            .state('message.detail', {
                url: '/:id',
                views: {
                    'index-detail': {
                        controller: 'messageDetailController',
                        templateUrl: 'template/message/message_detail.html'
                    }
                }
            })
            .state('message.session', {
                url: '/:titleId/:id',
                views: {
                    'index-detail': {
                        controller: 'messageDetailController',
                        templateUrl: 'template/message/message_detail.html'
                    }
                }
            })
            .state('message.notice_detail', {
                url: '/notice/:id',
                views: {
                    'index-detail': {
                        controller: 'messageDetailController',
                        templateUrl: 'template/message/message_detail.html'
                    }
                }
            })
            .state('new', {
                url: '/new?type',
                templateUrl: 'template/message/new.html',
                controller: 'pubMessageController'
            })
*/
            // Users
            .state('signup', {
                url: '/signup',
                templateUrl: 'template/signup.html'
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'template/signin.html'
            })
            /*
            .state('me_uid', {
                url: '/me/:uid',
                templateUrl: 'template/user/me.html'
            })
            .state('updateUserImg', {
                url: '/updateUserImg',
                templateUrl: 'template/user/updateUserImg.html',
                controller: 'userImgController'
            })
            .state('users', {
                url: '/users?type&page',
                templateUrl: 'template/user/index.html',
                controller: 'usersController'
            })
            .state('users_edit', {
                url: '/users/edit',
                templateUrl: 'template/user/edit.html',
                controller: 'userEditController'
            })

            // Groups
            .state('groups', {
                url: '/groups',
                templateUrl: 'template/group/index.html',
                controller: 'teamListController'
            })
            .state('groups_new', {
                url: '/groups/new',
                templateUrl: 'template/group/new.html',
                controller: 'teamNewController'
            })
            .state('groups_update_id', {
                url: '/groups/update/:id',
                templateUrl: 'template/group/update.html',
                controller: 'teamUpdateController'
            })
            .state('groups_show_id', {
                url: '/groups/show/:id',
                templateUrl: 'template/group/show.html',
                controller: 'teamDetailController'
            })
*/
            // Articles
            .state('articles', {
                url: '/articles?pageNumber',
                templateUrl: 'template/article/index.html',
                controller: 'blogListController'
            })
            .state('articles_show_id', {
                url: '/articles/show/:id',
                templateUrl: 'template/article/show.html',
                controller: 'blogDetailController'
            })
            .state('articles_new', {
                url: '/articles/new',
                templateUrl: 'template/article/new.html',
                controller: 'blogEditController'
            })
            .state('articles_drafts', {
                url: '/articles/drafts?pageNumber',
                templateUrl: 'template/article/index.html',
                controller: 'blogListController'
            })
            .state('articles_update_id', {
                url: '/articles/update/:id',
                templateUrl: 'template/article/new.html',
                controller: 'blogEditController'
            })
/*
            //Question
            .state('questions', {
                url: '/questions',
                templateUrl: 'template/question/index.html',
                controller: 'questionsController'
            })
            .state('questions_new', {
                url: '/questions/new',
                templateUrl: 'template/question/new.html',
                controller: 'questionController'
            })
            .state('questions_update_id', {
                url: '/questions/update/:id',
                templateUrl: 'template/question/new.html',
                controller: 'questionController'
            })
            // .when('/questions/drafts', {
            //     templateUrl: 'template/question/index.html',
            //     controller: 'questionsController'
            // })
            .state('questions_show_id', {
                url: '/questions/show/:id',
                templateUrl: 'template/question/show.html',
                controller: 'questionDetailController'
            })

            // Photos & Documents
            .state('pics', {
                url: '/pics?type&teamid',
                templateUrl: 'template/pics/folder.html',
                controller: 'imageFolderController'
            })
            .state('docs', {
                url: '/docs?type&teamid',
                templateUrl: 'template/docs/folder.html',
                controller: 'documentController'
            })

            // Search
            .state('search', {
                url: '/search?s&nav&page&createBy',
                templateUrl: 'template/search/index.html',
                controller: 'searchController'
            })
            // Notification
            .state('remind', {
                url: '/remind',
                templateUrl: 'template/notification/index.html',
                controller: 'remindController'
            })
            //third account
            //sina
            .state('sinaIndex', {
                url: '/sinaIndex',
                templateUrl: 'template/user/sinaIndex.html',
                controller: 'sinaController'
            })
            //rss
            .state('rssIndex', {
                url: '/rssIndex',
                templateUrl: 'template/user/rss.html',
                controller: 'rssController'
            })
            .state('store', {
                url: '/store?type&page',
                templateUrl: 'template/store/store.html',
                controller: 'storeController'
            })
            // Event
            .state('events', {
              url: '/events?pageNumber',
              templateUrl: 'template/events/index.html',
              controller: 'eventListController'
            })
            .state('events_new', {
              url: '/events/new',
              templateUrl: 'template/events/new.html',
              controller: 'eventsNewController'
            })
            .state('events_update_id', {
                url: '/events/update/:id',
                templateUrl: 'template/events/new.html',
                controller: 'eventsNewController'
            })
            .state('events_show_program', {
              url: '/events/show/:id',
              templateUrl: 'template/events/program.html',
              controller: 'signupProjectController'
            })
            */
            .state('otherwise', {
                url: '/otherwise',
                template: '<strong>错误：</strong>请检查 <code>route</code> 路径' +
                    '定义以及 <code>template</code> 或 <code>templateUrl</code>'
            });

    }])

  .run(['$rootScope','$location',function($rootScope,$location){ 'use strict';
    $rootScope.sysPath = window.sysPath;
    var publicIndex = $location.$$absUrl.indexOf('/public/index.html');
    if(publicIndex !== -1){
      var url = $location.$$absUrl.substring(0,publicIndex);
      if(url.indexOf('https://') !== -1){
        url = url.substr(url.indexOf('https://') + 8);
      }else{
        url = url.substr(url.indexOf('http://') + 7);
      }
      if(url.lastIndexOf('/') === -1){
        $rootScope.sysPath = '';
      }else{
        $rootScope.sysPath = url.substr(url.lastIndexOf('/')) || '';
      }
    }
  }])

    // TODO: provide documentation
    .value('navMenuOpen', false)

    // TODO: provide documentation
    .value('chatter', 'false')
    .value('sessionInvalidWhiteList',[
        'weblogin',
        'logoutCas',
        'register',
        'register/validateCode',
        'register/forgotpw',
        'register/resetpw',
        'register/deptList'
    ]);

// Source: source/module/app_prop.js
angular.module('vsApp')

	.constant('chatDomain','http://six4.org/node');
// Source: source/module/controller.js
'use strict';

/**
 * @overview Controller 定义文件
 * @version
 * @copyright iris.org © 2015
 */

/**
 *
 * @module vsController
 * @type {*|module}
 * @requires vsFilter
 * @requires vsService
 * @example <caption>请按照下面的方式获取消息模块的实例，不要创建全局变量引用</caption>
 * angular.module('vsController');
 */
angular.module('vsController', ['vsFilter', 'vsService']);

// Source: source/module/directive.js
'use strict';

/**
 * @overview Directive 定义文件
 * @version
 * @copyright iris.org © 2015
 */

/**
 *
 * @module vsDirective
 * @type {*|module}
 * @requires vsFilter
 * @requires vsService
 * @example <caption>请按照下面的方式获取消息模块的实例，不要创建全局变量引用</caption>
 * angular.module('vsDirective');
 */
angular.module('vsDirective', ['vsFilter', 'vsService']);

// Source: source/module/filter.js
'use strict';

/**
 * @overview Filter 定义文件
 * @version
 * @copyright iris.org © 2015
 */

/**
 *
 * @module vsFilter
 * @type {*|module}
 * @example <caption>请按照下面的方式获取消息模块的实例，不要创建全局变量引用</caption>
 * angular.module('vsFilter');
 */
angular.module('vsFilter', []);

// Source: source/module/service.js
'use strict';

/**
 * @overview Service 定义文件
 * @version
 * @copyright iris.org © 2015
 */

/**
 *
 * @module vsService
 * @type {*|module}
 * @requires vsREST
 * @example <caption>请按照下面的方式获取消息模块的实例，不要创建全局变量引用</caption>
 * angular.module('vsService');
 */
angular.module('vsService', ['vsREST']);

// Source: source/common/vs-angular-patch/vs-angular-patch.js
'use strict';

var patchMod = angular.module('vs.angular.patch', []);
patchMod.directive('input', function () {
    return {
        priority: 1000,
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attr, ctrl) {
            if (attr.type === 'checkbox' && ctrl && attr.value) {
                ctrl.$parsers = [];
                ctrl.$parsers.push(parserFn);

                ctrl.$formatters = [];
                ctrl.$formatters.push(formatterFn);
            }

            function formatterFn(val) {
                if (angular.isString(val)) {
                    return val === attr.value;
                } else if (angular.isArray(val)) {
                    for (var i = 0; i < val.length; i++) {
                        if (val[i] === attr.value) {
                            return true;
                        }
                    }
                    return false;
                }
            }

            function parserFn(val) {
                if (angular.isString(ctrl.$modelValue)) {
                    if (ctrl.$modelValue === '') {
                        return val ? attr.value : '';
                    }
                    return val ?
                        (attr.value !== ctrl.$modelValue ? [ctrl.$modelValue, attr.value] : ctrl.$modelValue) :
                        (attr.value === ctrl.$modelValue ? '' : ctrl.$modelValue);
                } else if (angular.isArray(ctrl.$modelValue)) {
                    var $$modelValue = ctrl.$modelValue.slice(0);

                    if ($$modelValue.length === 0) {
                        if (val) {
                            $$modelValue.push(attr.value);
                        }
                        return $$modelValue;
                    }

                    var existsBool = false;
                    for (var i = 0; i < $$modelValue.length; i++) {
                        if ($$modelValue[i] === attr.value) {
                            if (val) {
                                existsBool = true;
                                break;
                            } else {
                                $$modelValue.splice(i, 1);
                            }
                        }
                    }

                    if (val && !existsBool) {
                        $$modelValue.push(attr.value);
                    }

                    return $$modelValue;
                }
                return val;
            }
        }
    };
});

patchMod.directive('input', function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attr, ctrl) {
            if (ctrl && attr.type === 'number') {
                ctrl.$viewChangeListeners.push(function () {
                    ctrl.$setValidity(null, !!ctrl.$viewValue);
                });
            }
        }
    };
});

// Source: source/filter/dataRenderFilter.js
'use strict';
/**
 * @classdesc 根据id来查找[{id : ,value : }]中对应的value
 *
 *
 * @constructs dataRenderFilter
 * @example
 * color | dataRenderFilter:colorMap
 * 例如：color:1  colorMap:[{id : 1,value : '红色'}，{id : 2,value : '绿色'}，{id : 3,value : '蓝色'}...]
 * 最终的值为 '红色'
 */
angular.module('vsFilter')
    .filter('dataRenderFilter', [function () {

        return function (data, label, select, array) {
            var labelValue = 'value';
            var selectValue = 'id';

            if (angular.isArray(label)) {
                array = label;
                label = labelValue;
                select = selectValue;
            }

            var viewValue = '';

            for (var i = 0; i < array.length; i++) {
                if (!angular.isArray(data)) {
                    if (array[i][select] === data) {
                        return array[i][label];
                    }
                } else {
                    for (var j = 0; j < data.length; j++) {
                        if (array[i][select] === data[j]) {
                            viewValue += (',' + array[i][label]);
                        }
                    }
                }
            }
            return viewValue.length ? viewValue.substr(1) : '';
        };
    }]);

// Source: source/filter/omitFilter.js
angular.module('vsFilter').filter('omitFilter',
		function(){
		return function(str,length,dots){
			if(str && angular.isNumber(str.length) && str.length > length){
				str = str.slice(0,length) + (dots ? dots : "....");
			}
			return str;
		}
	
});

// Source: source/filter/timeFilter.js
'use strict';
/**
 * @classdesc 实现时间的友好输出，具体格式为:n秒前，n分钟前，n小时前，n天前，超过30天的为：yyyy-MM-dd HH:mm:ss
 *
 *
 * @constructs timeFilter
 * @example
 * createDate | timeFilter
 * 例如：color:1  colorMap:[{id : 1,value : '红色'}，{id : 2,value : '绿色'}，{id : 3,value : '蓝色'}...]
 * 最终的值为 '红色'
 */
angular.module('vsFilter')
    .filter('timeFilter', ['$filter', function ($filter) {

    var dateFormat = $filter('date');

    return function (time) {
        if(!time) return;

        var timeStr,currDate = new Date(),targetDate = new Date(time);
        var currTime = currDate.getTime();
        var dValue = currTime - time;

        if ((dValue = parseInt(dValue / 1000)) < 60) {
            timeStr = "刚刚";
        } else if ((dValue = parseInt(dValue / 60)) < 60) {
            timeStr = dValue + "分钟前";
        } else if ((dValue = parseInt(dValue / 60)) < 24) {
            timeStr = dValue + "小时前";
        } else if ((dValue = parseInt(dValue / 24)) < 4) {
            timeStr = dValue + "天前";
        } else if(currDate.getFullYear() == targetDate.getFullYear()){
            timeStr = dateFormat(time, 'MM月dd日 HH:mm');
        }else {
            timeStr = dateFormat(time, 'yyyy年MM月dd日 HH:mm');
        }
        return timeStr;
    };
}]);

// Source: source/service/REST/blogCommentRESTFactory.js
angular.module('vsREST').factory('blogCommentRESTFactory',['$resource',function($resource){
	var url = '../blogComment/comments/:blogId';
	var actions = {
			create : {
				url : '../blogComment/create',
				method : 'post'
			},
			deleteComment:{
				url : '../blogComment/delete/:id',
				method : 'get'
			},
			comments : {
				url : '../blogComment/comments/:blogId',
				method : 'get',
				isArray : true
			}
	};
	var comment = $resource(url,{},actions);
	return comment;
}]);
// Source: source/service/REST/blogRESTFactory.js
angular.module('vsREST').factory('blogRESTFactory',['$resource',function($resource){
	var url = '../blog/:blogId';
    var actions = {
    	create : {
    		url : '../blog/create',
    		method : 'post'
    	},
        list : {
            method : 'get'
        },
        blogs: {
        	url: "../blog/blogs",
        	method :'post'
        },
        update : {
        	method : 'post',
        	url : '../blog/update'
        },
        initUserBlog : {
        	method : 'post',
        	url :'../blog/blogs'
        },
        hotBlogs : {
        	method : 'get',
        	url : '../blog/hotBlog/:pageNumber',
        	isArray :true
        },
        deleteBlog : {
        	method : 'get',
        	url : '../blog/delete/:id'
        },
        blogMention : {
        	method : 'get',
        	url : '../blog/mentionBlog/:id'
        }
    };
    
    var blog = $resource(url,{},actions);
    
    return blog;
}]);
// Source: source/service/REST/documentRestFactory.js
'use strict'

angular.module('vsREST')

.factory('documentRestFactory', ['$resource', function($resource){
	var url = '../mobile/document/showFolder/:folderId';
	var actions = {
		folderList : {
			url : '../mobile/document/folderList',
			method : 'get'
		},
		delFolder : {
			url : '../mobile/document/delFolder/:folderId',
			method : 'get'
		},
		addFolder : {
			url : '../mobile/document/addFolder',
			method : 'post'
		},
		updateFolder : {
			url : '../mobile/document/updateFolder',
			method : 'post'
		},
		initFileList: {
			url : '../mobile/document/fileList/:folderId',
			method : 'get',
			isArray : true
		},
		delFile : {
			url : '../mobile/document/delFile/:folderId/:fileId',
			method : 'get'
		},
		updateFolderCover : {
			url : '../mobile/document/updateFolderCover/:folderId',
			method : 'get'
		},
		findTeamFolders:{
			url : '../mobile/document/findTeamFolders/:teamId',
			method : 'get'
		},
		downloadFile:{
			url : '../mobile/download/attach/downloadFile/:fileId',
			method : 'get'
		}
	}
	
	var obj = $resource(url,{},actions);
    
    return obj;
	
}]);
// Source: source/service/REST/eventsRESTFactory.js
angular.module('vsREST').factory('eventsRESTFactory',['$resource',function($resource){
	var url = '../mobile/signup/findProject/:blogId';
    var actions = {
    	create : {
    		url : '../mobile/signup/addSignupProject',
    		method : 'post'
    	},
        projetList : {
            method : 'get'
        },
        update : {
        	method : 'post',
        	url : '../mobile/signup/updateSignupProject'
        },
        deleteProject : {
        	method : 'get',
        	url : '../mobile/signup/deleteProject/:id'
        },
        signupProject : {
        	method : 'post',
        	url : '../mobile/signup/signupProject'
        },
        queryAllSignList : {
        	method : 'get',
        	url : '../mobile/signup/signupListForCreator/:pid'
        },
        querySignList : {
        	method : 'get',
        	url : '../mobile/signup/signupListForUser/:pid'
        },
        queryDetailProject : {
        	method : 'get',
        	url : '../mobile/signup/projectDetail/:pid'
        }
    };
    
    var events = $resource(url,{},actions);
    
    return events;
}]);
// Source: source/service/REST/imageRESTFactory.js
'use strict'

angular.module('vsREST')

.factory('imageRESTFactory', ['$resource', function($resource){
	var url = '../mobile/webUser/show/:userId';
	var actions = {
			myfolder : {
				method : 'get',
				url : '../mobile/imageFolder/myfolder/:userId'
			},
			sysFolder: {
				method : 'post',
				url : '../mobile/imageFolder/queryfolder'
			},
			imageList: {
				method : 'get',
				url : '../mobile/imageFolder/findImageFolderById/:folderId'
			},
			delImage: {
				url : '../mobile/imageFolder/deleteImage',
				method : 'post',
			},
			showImageFolder : {
				url : '../mobile/imageFolder/findImageFolderById/:folderId',
				method : 'get',
			},
			updateImageFolder : {
				url : '../mobile/imageFolder/updateImageFolder',
				method : 'post'
			},
			delImageFolder : {
				url : '../mobile/imageFolder/deleteImageFolder/:folderId',
				method : 'get',
			},
			addFolder : {
				url : '../mobile/imageFolder/addImageFolder',
				method : 'post'
			},
			updateImageFolderCover : {
				url : '../mobile/imageFolder/updateImageFolderCover/:folderId',
				method : 'get'
			},
			findImageById : {
				url : '../mobile/imageFolder/findImageById/:imageId',
				method : 'get'
			},
			findTeamImageFolder: {
				url : '../mobile/imageFolder/findTeamImageFolder/:teamId',
				method : 'get'
			}
	};
	
	var obj = $resource(url,{},actions);
    
    return obj;
	
}]);
// Source: source/service/REST/rssRESTFactory.js
'use strict'

angular.module('vsREST')

.factory('rssRESTFactory', ['$resource', function($resource){
	var url = '';
	
	var actions = {
		rssList : {
			url : '../mobile/rss/rssList',
	        method : 'get',
	        isArray:true
	    },
	    validateRss : {
	    	url : '../mobile/rss/checkRss',
	        method : 'post'
	    },
	    addRss : {
	    	url : '../mobile/rss/addRss',
	        method : 'post'
	    },
	    viewRss : {
	    	url : '../mobile/rss/viewRss',
	        method : 'post',
	        isArray:true
	    },
	    delRss : {
	    	url : '../mobile/rss/delRss',
	        method : 'post'
	    }
	}
	
	var obj = $resource(url, {}, actions);
	
	return obj;
}]);
// Source: source/service/REST/welcomeRESTFactory.js
angular.module('vsREST').factory('welcomeRESTFactory',['$resource',function($resource){
    var actions = {
        login : {
            url : '../weblogin',
            method : 'post'
        },
	    signup : {
		    url : '../register',
		    method : 'post'
	    },
	    getValidateCode : {
		    url : '../register/validateCode',
		    method : 'get'
	    },
	    sendValidateCodeToForget : {
		    url : '../register/forgotpw',
		    method : 'get'
	    },
	    resetpw : {
			url : '../register/resetpw',
		    method : 'post'
		},
        depList : {
            url : '../register/deptList',
            method : 'get',
            isArray : true
        }
    };

	var signin = $resource('/',{},actions);
	
	return signin;
}]);
// Source: source/service/alertBoxFactory.js
'use strict';
/**
 * @classdesc 弹出层效果
 *
 *
 * @constructs alertBoxFactory
 * @example
 * function(alertBoxFactory){
 *     $http({...}).success(function(){}).error(function(){
 *      alertBoxFactory('删除失败',{width : 200,textAlign: 'center',height : 30,waitTime : 2,type : 'success|info|warn|error'})
 *     });
 * }
 */
angular.module('vsService').factory('alertBoxFactory', [function () {
    var width = 600, top = 50, waitTime = 4, type = 'warn';
    var typeColor = {
        success: { bgColor: '#dff0d8', fontColor: '#3c763d' },
        info: { bgColor: '#d9edf7', fontColor: '#31708f' },
        warn: { bgColor: '#fcf8e3', fontColor: '#8a6d3b' },
        error: { bgColor: '#f2dede', fontColor: '#a94442' }
    };
    var panelHtml = '<div style="position: fixed;overflow: hidden;z-index:102"></div>';
    var bodyHtml = '<div style="position: relative;padding:30px;"></div>';
    var contentHtml = '<div style="border-radius: 3px;box-shadow:0px 0px 30px 1px gray;line-height: 30px;padding:10px 35px 10px 30px"></div>';
    var closeBtnHtml = '<span style="top:40px;position : absolute;right:50px;cursor:pointer;font-weight: bold;"  type="button">x</span>';
    return function (content, config) {
        if (!angular.isObject(config)) {
            config = {};
        }
        fetchConfig(config);

        var panelEle, panelEleHeight, bodyEle, contentEle, closeBtn;

        panelEle = angular.element(panelHtml);
        panelEle.css({top: config.top + 'px', width: config.width + 'px', left: (document.body.clientWidth - config.width) / 2 + 'px'});
        bodyEle = angular.element(bodyHtml);
        panelEle.append(bodyEle);
        contentEle = angular.element(contentHtml);
        bodyEle.append(contentEle);
        document.body.appendChild(panelEle[0]);
        panelEleHeight = parseInt(panelEle.css('height'));
        bodyEle.remove();

        bodyEle = angular.element(bodyHtml).css('top', panelEleHeight + 30 + 'px');
        contentEle = angular.element(contentHtml);
        contentEle.css({textAlign: config.textAlign, backgroundColor: typeColor[config.type].bgColor, color: typeColor[config.type].fontColor});
        bodyEle.append(contentEle);
        panelEle.append(bodyEle);

        if (angular.isFunction(config.close)) {
            contentEle.append(angular.element('<span></span>').text(content));
            closeBtn = angular.element(closeBtnHtml);
            closeBtn.on('click', remove);
            contentEle.append(closeBtn);
        } else {
            contentEle.text(content);
            setTimeout(remove, config.waitTime * 1000);
        }

        bodyEle.animate({top: '0px'}, 'fast');

        function remove() {
            bodyEle.animate({top: panelEleHeight + 30 + 'px'}, 'fast', null, function () {
                panelEle.remove();
                if (angular.isFunction(config.close)) config.close(config);
            });
        }
    };

    function fetchConfig(config) {
        if (!angular.isNumber(config.width)) config.width = width;
        if (!angular.isNumber(config.top)) config.top = top;
        if (!angular.isNumber(config.waitTime)) config.waitTime = waitTime;
        if (!angular.isString(config.type)) config.type = type;
    }

}]);

// Source: source/service/confirmBoxFactory.js
'use strict';
/**
 * @classdesc 确认弹出层效果
 *
 *
 * @constructs confirmBoxFactory
 * @example
 * function(confirmBoxFactory){
 *     $http({...}).success(function(){}).error(function(){
 *      confirmBoxFactory('确定删除吗?',{width : 200,top : 200,type : 'success|info|warn|error',okFn : noop,cancelFn : noop})
 *     });
 * }
 */
angular.module('vsService').factory('confirmBoxFactory', [function () {
	var width = 600, top = 50, type = 'warn',okText = '确定',cancelText = '取消';
	var typeColor = {
		success: { bgColor: '#dff0d8', fontColor: '#3c763d' },
		info: { bgColor: '#d9edf7', fontColor: '#31708f' },
		warn: { bgColor: '#fcf8e3', fontColor: '#8a6d3b' },
		error: { bgColor: '#f2dede', fontColor: '#a94442' }
	};
	var panelHtml = '<div style="position: fixed;overflow: hidden;z-index:102"></div>';
	var bodyHtml = '<div style="position: relative;padding:30px;"></div>';
	var contentHtml = '<div style="border-radius: 3px;box-shadow:0px 0px 30px 1px gray;line-height: 30px;padding:10px 35px 10px 30px">'+
		'<div class="text-center">' +
		'<div>$content$</div>' +
		'<span class="btn btn-success btn-sm popup-ok">$okText$</span>&nbsp;&nbsp;<span class="btn btn-default btn-sm popup-cancel">$cancelText$</span>' +
		'</div></div>';

	return function (content, config) {
		if (!angular.isObject(config)) {
			config = {};
		}
		fetchConfig(config);

		var panelEle, panelEleHeight, bodyEle, contentEle, closeBtn,_contentHtml;

		_contentHtml = contentHtml.replace('$content$',content)
			.replace('$okText$',config.okText)
			.replace('$cancelText$',config.cancelText);

		panelEle = angular.element(panelHtml);
		panelEle.css({top: config.top + 'px', width: config.width + 'px', left: (document.body.clientWidth - config.width) / 2 + 'px'});
		bodyEle = angular.element(bodyHtml);
		panelEle.append(bodyEle);
		contentEle = angular.element(_contentHtml);
		bodyEle.append(contentEle);
		document.body.appendChild(panelEle[0]);
		panelEleHeight = parseInt(panelEle.css('height'));
		bodyEle.remove();

		bodyEle = angular.element(bodyHtml).css('top', panelEleHeight + 30 + 'px');
		contentEle = angular.element(_contentHtml);
		contentEle.css({backgroundColor: typeColor[config.type].bgColor, color: typeColor[config.type].fontColor});
		bodyEle.append(contentEle);
		panelEle.append(bodyEle);

		contentEle.find('.popup-ok,.popup-cancel').click(function(){
			if(angular.element(this).hasClass('popup-ok')){
				config.okFn();
			}else if(angular.element(this).hasClass('popup-cancel')){
				config.cancelFn();
			}
			remove();
		});

		bodyEle.animate({top: '0px'}, 'fast');

		function remove() {
			bodyEle.animate({top: panelEleHeight + 30 + 'px'}, 'fast', null, function () {
				panelEle.remove();
				if (angular.isFunction(config.close)) config.close(config);
			});
		}
	};

	function fetchConfig(config) {
		if (!angular.isString(config.okText)) config.okText = okText;
		if (!angular.isString(config.cancelText)) config.cancelText = cancelText;
		if (!angular.isNumber(config.width)) config.width = width;
		if (!angular.isNumber(config.top)) config.top = top;
		if (!angular.isString(config.type)) config.type = type;
		if (!angular.isFunction(config.okFn)) config.okFn = angular.noop;
		if (!angular.isFunction(config.cancelFn)) config.cancelFn = angular.noop;
	}

}]);

// Source: source/service/domService.js
'use strict';

angular.module('vsService')
    .service('domService', ['$window', function (window) {
        var position, scrollPos, d, e, f, g, h;

        this.position = function (element) {
            if (element === document.body) {
                return !1;
            }
            if (element.parentNode === null) {
                return !1;
            }
            if (element.style.display === "none") {
                return !1;
            }

            if (element.getBoundingClientRect) {
                position = element.getBoundingClientRect();
                scrollPos = this.scrollPos();
                e = element.ownerDocument.body;
                f = element.ownerDocument.documentElement;
                g = f.clientTop || e.clientTop || 0;
                h = f.clientLeft || e.clientLeft || 0;
                return {
                    left: parseInt(position.left + scrollPos.left - h, 10) || 0,
                    top: parseInt(position.top + scrollPos.top - g, 10) || 0
                };
            } else {
                d = [element.offsetLeft, element.offsetTop];
                e = element.offsetParent;
                while (e) {
                    d[0] += e.offsetLeft;
                    d[1] += e.offsetTop;
                    e = e.offsetParent;
                }
            }
            return {
                left: parseInt(d[0], 10),
                top: parseInt(d[1], 10)
            };
        };

        this.scrollPos = function (element) {
            element = element || document;
            var b = element.documentElement, c = element.body;
            return {
                top: Math.max(window.pageYOffset || 0, b.scrollTop, c.scrollTop),
                left: Math.max(window.pageXOffset || 0, b.scrollLeft, c.scrollLeft)
            };
        };
    }]);

// Source: source/service/dynamicImgSrcFactory.js
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
// Source: source/service/sessionInterceptorFactory.js
angular.module('vsService').factory('sessionInterceptorFactory',['alertBoxFactory','sessionInvalidWhiteList',function(alertBoxFactory,sessionInvalidWhiteList){
	var showPanel = false;

	function fn(value){

		if(angular.isArray(sessionInvalidWhiteList)){
			for(var i = 0;i < sessionInvalidWhiteList.length;i++){
				if(value.config.url.indexOf(sessionInvalidWhiteList[i]) != -1){
					return value;
				}
			}
		}

		if(value.headers('sessionInvalid') && !showPanel){
			showPanel = true;
			alertBoxFactory('当前网页会话已失效，5秒后自动跳转到登陆页!',{
				width : 420,
				textAlign : 'center'
			});
			setTimeout(function(){
				window.location.href = '../public/signin.html';
			},5000);
		}
		return value;
	}

	return {
		response : fn
	}
}]);
// Source: source/service/utilService.js
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

// Source: source/directive/cardDirective.js
'use strict';
/**
 * @classdesc 卡片效果类似新浪微博中，鼠标移到用户头像时出现的包含用户信息的卡片层
 *
 *
 * @constructs cardDirective
 * @example
 * &lt;div card-directive width="200" event="mouseenter|click"
 * direction="top|bottom|left|right" template="用户信息..." templateUrl="public/template/userInfo.html"
 * controller="userCardInfoController"&gt;&lt;/div&gt;
 * 或者
 * &lt;div card-directive="userCardInfo" &gt;&lt;/div&gt;
 * userCardInfo为当前作用域中的一个值
 * userCardInfo = {width : 200,event : 'click',controller : 'userCardInfoController',...}
 */
angular.module('vsDirective').directive('cardDirective',
    ['domService', 'utilService', '$compile', '$http',

        function (domService, utilService, $compile, $http) {
            var defaultConfig = {
                width: 190,
                event: 'mouseenter',
                direction: 'right',
                template: '#',
                templateUrl: '#',
                controller: '#'
            };
            var panelHtml = '<div style="z-index:100;border-radius:4px;position:absolute;overflow: hidden;width:$width$px"></div>';
            // todo: 处理背景图片的解析路径
            var bodyHtml = '<div style="display:none;padding:3px;background:url();"></div>';
            var contentHtml = '<div style="padding:10px 20px;background-color: #ffffff;text-align: center;"><div class="p_loading">加载中...</div><div class="p_arrow"></div></div>';

            return {
                scope: {
                    config: '=?cardDirective',
                    width: '@',
                    event: '@',
                    template: '@',
                    templateUrl: '@',
                    controller: '@',
                    direction: '@'
                },
                link: linkFn
            };

            function linkFn(scope, element, attr) {
                if (!angular.isObject(scope.config)) scope.config = {};
                var _config = utilService.extend(scope, scope.config, defaultConfig);
	            angular.extend( scope.config,_config);

                element.on(scope.config.event, eventListener);

                function eventListener() {
                    if (element.data('isShow')) return;
                    else element.data('isShow', true);

                    var elementPosition = domService.position(element[0]);

                    var panelEle = angular.element(panelHtml.replace('$width$', scope.config.width));
                    var bodyEle = angular.element(bodyHtml);
                    var contentEle = angular.element(contentHtml);
                    bodyEle.append(contentEle);
                    panelEle.append(bodyEle);
                    document.body.appendChild(panelEle[0]);

                    var panelEleHeight = parseInt(panelEle.css('height'));
                    var panelElePosition = getPosition(
                        {top: elementPosition.top, left: elementPosition.left, width: parseInt(element.css('width')), height: parseInt(element.css('height'))},
                        {top: 0, left: 0, width: parseInt(panelEle.css('width')), height: parseInt(panelEle.css('height'))},
                        scope.config.direction
                    );
                    panelEle.css({top: panelElePosition.top + 'px', left: panelElePosition.left + 'px'});
                    bodyEle.fadeIn('fast');

                    panelEle.one('mouseenter', function () {
                        panelEle.data('enter', true);
                    });
                    panelEle.one('mouseleave', function () {
                        panelEle.data('enter', false);
                        removeFn();
                    });
                    element.one('mouseleave', removeFn);

                    if (scope.config.template && scope.config.template != '#') {
                        compileContent();
                    } else {
                        loadContent();
                    }

                    function loadContent() {
                        $http({url: scope.config.templateUrl, method: 'get'}).success(function (data) {
                            scope.config.template = data;
                            compileContent();
                        });
                    }

                    function compileContent() {
                        contentEle.children('.p_loading').remove();
                        contentEle.append(angular.element(scope.config.template));
                        contentEle.attr('ng-controller', scope.config.controller);
                        $compile(contentEle)(angular.extend(scope, {config: scope.config, attr: attr}));
                        try {
                            scope.$digest();
                        } catch (e) {
                        }
                    }

                    function removeFn(event) {
                        window.setTimeout(function () {
                            if (!panelEle.data('enter')) {
                                bodyEle.fadeOut('fast', null, function () {
                                    panelEle.remove();
                                    element.data('isShow', false);
                                });
                            }
                        }, 100);
                    }
                }

                function getPosition(dist, tag, direction) {
                    if (direction == 'top') {
                        return {top: dist.top - tag.height + tag.top - 3, left: dist.left + tag.left};
                    } else if (direction == 'left') {
                        return {top: dist.top + tag.top, left: dist.left - tag.width + tag.left - 3};
                    } else if (direction == 'right') {
                        return {top: dist.top + tag.top, left: dist.left + dist.width + tag.left + 3};
                    } else if (direction == 'bottom') {
                        return {top: dist.top + dist.height + tag.top + 3, left: dist.left + tag.left};
                    } else {
                        return {top: 0, left: 0};
                    }
                }

            }
        }]);

// Source: source/directive/chosenDirective.js
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
// Source: source/directive/confirmDirective.js
'use strict';
/**
 * @classdesc 确认弹出框,比如页面上有个删除链接<a>删除</a>或者<input type="button" value="删除">
 * 当点击这个元素的时候活在该元素上弹出确认层，类似window.alert('...'),
 *
 *
 * @constructs confirmDirective
 * @example
 * &lt;a confirm-directive title="确认删除吗?" ok-text="删除" cancel-text="取消"
 * width="200" ok-fn="ok(config,attr)" cancel-fn="cancel(config,attr)"&gt;删除&lt;/a&gt;
 *  其中，ok-fn="ok(config,attr)" cancel-fn="cancel(config,attr)"
 *  ok，cancel为作用域中的一个函数接收到的参数为config,attr
 * 或者
 * &lt;a confirm-directive="delUserConfig" &gt;删除&lt;/a&gt;
 * delUserConfig 为作用域中的一个值
 * delUserConfig ： {title : '...',okFn : function({config: scope.config, attr: attr}){}
 * ,cancelFn : function({config: scope.config, attr: attr}){}}
 */
angular.module('vsDirective').directive('confirmDirective',
    ['domService', 'utilService', function (domService, utilService) {
        var defaultConfig = {
            okText: '确定',
            cancelText: '取消',
            title: '标题',
            okFn: angular.noop,
            cancelFn: angular.noop,
            width: 160
        };
        var popupPanelHtml = '<div style="width:$width$px;z-index:100;border-radius:4px;margin:0px;overflow: hidden;position: relative;"></div>';
        // todo: 处理背景图片解析路径
        var popupBodyHtml = '<div style="padding:3px;background:url(/img/layer_bg.png);position: relative;"><div style="line-height:25px;padding:8px;background-color:white;"><div style="margin-bottom:4px;text-align: center;">$title$</div><div style="text-align: center;"><span class="btn btn-success btn-sm popup-ok">$okText$</span>&nbsp;&nbsp;<span class="btn btn-default btn-sm popup-cancel">$cancelText$</span></div></div></div>';

        return {
            scope: {
                config: '=?confirmDirective',
                okText: '@',
                cancelText: '@',
                title: '@',
                okFn: '&',
                cancelFn: '&',
                width: '@'
            },
            link: linkFn
        };
        function linkFn(scope, element, attr) {
            if (!angular.isObject(scope.config)) scope.config = {};
            var _config = utilService.extend(scope, scope.config, defaultConfig);
	        angular.extend( scope.config,_config);

            element.on('click', function () {
                if (element.data('popup')) return;
                else element.data('popup', true);

                var pos = domService.position(element[0]);
                var popupPanelEle = angular.element(popupPanelHtml.replace('$width$', scope.config.width));
                var popupBodyEle = angular.element(popupBodyHtml.replace('$title$', scope.config.title)
                    .replace('$okText$', scope.config.okText)
                    .replace('$cancelText$', scope.config.cancelText));
                popupPanelEle.append(popupBodyEle);
                document.body.appendChild(popupPanelEle[0]);

                var popupEleHeight = parseInt(popupPanelEle.css('height'));
                var elementWidth = parseInt(element.css('width'));

                popupPanelEle.css({position: 'absolute', top: (pos.top - popupEleHeight) + 'px', left: pos.left - Math.abs(scope.config.width - elementWidth) / 2 + 'px'});
                popupBodyEle.remove();

                popupBodyEle = angular.element(popupBodyHtml.replace('$title$', scope.config.title)
                    .replace('$okText$', scope.config.okText)
                    .replace('$cancelText$', scope.config.cancelText)
                ).css('top', popupEleHeight + 'px');
                popupPanelEle.append(popupBodyEle);
                popupBodyEle.animate({top: '0px'}, 'fast');

                popupBodyEle.find('.popup-ok').on('click', function () {
                    popupBodyEle.animate({top: popupEleHeight + 'px'}, 'fast', null, function () {
                        removeEle();
                        scope.config.okFn({config: scope.config, attr: attr});
                    });
                });

                popupBodyEle.find('.popup-cancel').on('click', function () {
                    popupBodyEle.animate({top: popupEleHeight + 'px'}, 'fast', null, function () {
                        removeEle();
                        scope.config.cancelFn({config: scope.config, attr: attr});
                    });
                });

                function removeEle() {
                    popupPanelEle.remove();
                    element.data('popup', false);
                }
            });

        }
    }]);

// Source: source/directive/imgFadeDirective.js
'use strict';
/**
 * @classdesc 类似图片广告，实现了淡入淡出效果
 *
 *
 * @constructs imgFadeDirective
 * @example
 * &lt;img-slide-directive width="650" height="100" speed="4" list="adImgList"&gt;&lt;/img-slide-directive&gt;
 * adImgList为作用域中的数组变量类似['/img/1.png','img/2.png',...]
 */
angular.module('vsDirective').directive('imgFadeDirective',
    ['$window', '$log', 'utilService', function (window, log, utilService) {
        var defaultConfig = {
            list: [],
            width: 200,
            height: 70,
            speed: 4
        };

        return {
            restrict: 'E',
            scope: {
                list: '=',
                width: '@',
                height: '@',
                speed: '@'
            },
            template: '<div style="overflow: hidden;position: relative"></div>',
            replace: true,
            link: linkFn
        };
        function linkFn(scope, element, attr) {
            if (!angular.isObject(scope.config)) scope.config = {};
            var _config = utilService.extend(scope, scope.config, defaultConfig);
	        angular.extend( scope.config,_config);
            if (!scope.config.list || scope.config.list.length < 1) {
                return log.error('list must gt 2');
            }

            var navSize = 10, timePollFn, isAnimate, currImg;
            var imgTag = '<img style="position: absolute;top:0px;left:0px;width:' + scope.config.width + 'px;height:' + scope.config.height + 'px;">';
            var navTag = '<div class="pull-left" style="text-align:center;margin:0px;padding:0px;width:' + (navSize * 2) + 'px;height:' + (navSize * 2) + 'px;cursor:pointer;"></span>';
            var navPanelTag = '<div class="clearfix" style="position: relative;z-index: 100;margin:0px;padding:0px;"></div>';
            var list = scope.config.list;
            var speed = scope.config.speed * 1000;

            element[0].style.width = scope.config.width + 'px';
            element[0].style.height = scope.config.height + 'px';
            element.append(angular.element(imgTag).attr('src', list[0]));
            element.append(angular.element(imgTag).hide().attr('src', list[1]));

            var navPanel = angular.element(navPanelTag);
            navPanel.css('top', scope.config.height - (navSize * 2) - 5 + 'px');
            navPanel.css('left', scope.config.width - (list.length * (navSize * 2)) - 5 + 'px');
            angular.forEach(list, function (val, index) {
                var nav = angular.element(navTag);
                nav.text(index + 1);
                nav.data('index', index);
                nav.on('click', navClickFn);
                navPanel.append(nav);
            });
            element.append(navPanel);

            pollFn();

            function navClickFn() {
                if (!isAnimate) {
                    if (timePollFn) window.clearTimeout(timePollFn);
                    currImg = angular.element(this).data('index');
                    element.children('img:eq(1)').attr('src', list[currImg]);
                    pollFn();
                }
            }

            function pollFn() {
                if (currImg !== undefined) {
                    isAnimate = true;

                    navPanel.children().css({'color': 'black', 'border': ''});
                    navPanel.children(':eq(' + currImg + ')').css({'color': 'red', 'border': 'solid 1px gray'});
                    angular.element(element.children('img:eq(1)')).fadeIn("slow", function () {
                        isAnimate = false;
                        var imgEle = angular.element(element.children('img:eq(0)'));
                        imgEle.hide().attr('src', list[currImg]);
                        imgEle.remove();
                        element.append(imgEle);
                    });
                } else {
                    currImg = 0;
                }

                (++currImg >= list.length) && (currImg = 0);
                timePollFn = window.setTimeout(pollFn, speed);
            }
        }
    }]);


// Source: source/directive/imgSlideDirective.js
'use strict';
/**
 * @classdesc 类似图片广告，实现了滑入划出效果
 *
 *
 * @constructs imgSlideDirective
 * @example
 * &lt;img-slide-directive width="650" height="100" direction="h|v" speed="4" list="adImgList"&gt;&lt;/img-slide-directive&gt;
 * adImgList为作用域中的数组变量类似['/img/1.png','img/2.png',...]
 */
angular.module('vsDirective').directive('imgSlideDirective',
    ['$window', '$log', 'utilService', function (window, log, utilService) {
        var defaultConfig = {
            list: [],
            width: 650,
            height: 100,
            speed: 4,
            direction: 'h'
        };

        return {
            restrict: 'E',
            scope: {
                list: '=',
                width: '@',
                height: '@',
                speed: '@',
                direction: '@'
            },
            template: '<div style="overflow: hidden;position: relative"><a href=""></a></div>',
            replace: true,
            link: linkFn
        };
        function linkFn(scope, element, attr) {
        	var loaded = false;
            if (!angular.isObject(scope.config)) scope.config = {};
            var _config = utilService.extend(scope, scope.config, defaultConfig);
	        angular.extend( scope.config,_config);

            var navSize = 10, timePollFn, isAnimate, currImg;
            var imgTag = '<img style="position: absolute;width:' + scope.config.width + 'px;height:' + scope.config.height + 'px;">';
            var navTag = '<div class="pull-left" style="text-align:center;margin:0px;padding:0px;width:' + (navSize * 2) + 'px;height:' + (navSize * 2) + 'px;cursor:pointer;"></span>';
            var navPanelTag = '<div class="clearfix" style="position: relative;z-index: 100;margin:0px;padding:0px;"></div>';
            var list = null;
            var speed = scope.config.speed * 1000;

            var position = scope.config.direction == 'h' ? 'left' : 'top';
            var positionNum = position == 'left' ? scope.config.width : -scope.config.height;
            var navPanel = null;
            
            scope.$watch('list',function(newVal){
            	if(!loaded && newVal && newVal.length > 0){
            		loaded = true;
                    list = scope.config.list = newVal;
            		run();
            	}
            });
            
            function run(){
                var linkElement = element.children('a');

                linkElement.on('click',function(event){
                    if(angular.element(event.target).is('div')){
                        event.preventDefault();
                    }
                });

            	element[0].style.width = scope.config.width + 'px';
            	element[0].style.height = scope.config.height + 'px';
                linkElement.append(angular.element(imgTag).css(position, '0px').css((position == 'left' ? 'top' : 'left'), '0px').attr('src', list[0].src));
                linkElement.append(angular.element(imgTag).css(position, positionNum + 'px').css((position == 'left' ? 'top' : 'left'), '0px').attr('src', list[1].src));
            	
            	navPanel = angular.element(navPanelTag);
            	navPanel.css('top', scope.config.height - (navSize * 2) - 5 + 'px');
            	navPanel.css('left', scope.config.width - (list.length * (navSize * 2)) - 5 + 'px');
            	angular.forEach(list, function (val, index) {
            		var nav = angular.element(navTag);
            		nav.text(index + 1);
            		nav.data('index', index);
            		nav.on('click', navClickFn);
            		navPanel.append(nav);
            	});
                linkElement.append(navPanel);
            	
            	pollFn();
            }

            function navClickFn() {
                if (!isAnimate) {
                    if (timePollFn) window.clearTimeout(timePollFn);
                    currImg = angular.element(this).data('index');
                    element.find('img:eq(1)').attr('src', list[currImg].src);
                    pollFn();
                }
            }

            function pollFn() {
                var linkElement = element.children('a');

                if (currImg !== undefined) {
                    var animateProp = {};
                    animateProp[position] = '0px';
                    isAnimate = true;
                    navPanel.children().css({'color': 'black', 'border': ''});
                    navPanel.children(':eq(' + currImg + ')').css({'color': 'red', 'border': 'solid 1px gray'});
                    angular.element(element.find('img:eq(1)')).animate(animateProp, 600, null, function () {
                        isAnimate = false;
                        var imgEle = angular.element(element.find('img:eq(0)'));
                        imgEle.css(position, positionNum + "px").attr('src', list[currImg].src);
                        imgEle.remove();
                        linkElement.append(imgEle);
                    });
                } else {
                    currImg = 0;
                }

                linkElement.attr('href',list[currImg].href);

                (++currImg >= list.length) && (currImg = 0);
                timePollFn = window.setTimeout(pollFn, speed);
            }
        }
    }]);


// Source: source/directive/jcropDirective.js
angular.module('vsDirective').directive('jcropDirective',[function(){
    return {
        restrict : 'E',
        priority : 1000,
        template : '<table><tr><td><img class="jcrop-src"></td><td><div class="jcrop-preview-pane"><div class="jcrop-preview-container"><img class="jcrop-dist"></div></div></td></tr></table>',
        replace : true,
        scope : {
            src : '=',
            option : '='
        },
        link : function($scope,$element,attr){
            var boundx,boundy;
            var $preview = $element.find('img.jcrop-dist');
            var $img = $element.find('img.jcrop-src');

            var $previewContainer = $element.find('.jcrop-preview-pane .jcrop-preview-container');
            var xsize = $previewContainer.width();
            var ysize = $previewContainer.height();

            $scope.$watch('src',function(newVal,oldVal){
                if(newVal){
                    $img.attr('src',newVal);
                    $preview.attr('src',newVal);
                }
            });

            $img.on('load',function(){
	            var tempImg = new Image();
	            tempImg.src = $img.attr('src');
	            tempImg.onload = function () {
		            $img.width(tempImg.width);
		            $img.height(tempImg.height);

	                $img.next().remove();
	                $img.data('Jcrop',null);
	                $img.Jcrop({
	                    onSelect : updatePreview,
	                    onChange : updatePreview,
	                    aspectRatio : xsize / ysize
	                },function(){
	                    var bounds = this.getBounds();
	                    boundx = bounds[0];
	                    boundy = bounds[1];
	                });
	            }
            });

            function updatePreview(c){
                if(parseInt(c.w) > 0){
                    $scope.option.h = c.h;
                    $scope.option.w = c.w;
                    $scope.option.x = c.x;
                    $scope.option.x2 = c.x2;
                    $scope.option.y = c.y;
                    $scope.option.y2 = c.y2;
                    var rx = xsize / c.w;
                    var ry = ysize / c.h;

                    $preview.css({
                        width : Math.round(rx * boundx) + "px",
                        height : Math.round(ry * boundy) + "px",
                        marginLeft : "-" + Math.round(rx * c.x) + "px",
                        marginTop : "-" + Math.round(ry * c.y) + "px"
                    });

                };
            };
        }
    };
}]);
// Source: source/directive/patch/autofocus.js
angular.module('vsDirective').directive('autofocus',[function(){
	return {
		compile : function($element,attr){
			if(attr.autofocus == 'true' || attr.autofocus == ''){
                setTimeout(function () {
                    $element.focus();
                }, 100);
			}
		}
	}
}]);

// Source: source/directive/refreshValueDirective.js
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
// Source: source/directive/richTextDirective.js
'use strict';

angular.module('vsDirective').directive('richTextDirective', ['$cookies','$compile',function ($cookies,$compile) {
    return {
        link: function ($scope, $element,attr) {
	        var init = false;
	        var defaultConfig = {
		        color: true,
		        size: 'default',
		        stylesheets: ['common/vendor.css']
	        }

	        $scope.$watch(attr['richTextWriter'],function(newVal,oldVal){
		        if(angular.isString(newVal)){
			        $element.parent().find('iframe').contents().find('body').html(newVal);
			        $scope[attr['richTextWriter']] = true;
		        }
	        });

            $scope.$watch(attr['richTextDirective'],function(newVal,oldVal){
                if(newVal && newVal.indexOf('^') == 0 && !init){
	                init = true;
                    //防止wysihtml的editor还没生效
	                setTimeout(function(){
		                if(newVal.indexOf('^^') == 0){
			                $element.data('wysihtml5').editor.currentView.element.focus(false);
						    caretBookmark = $element.data('wysihtml5').editor.composer.selection.getBookmark();
		                    $element.wysihtml5('setValue',newVal.substr(2));
				            $element.data('wysihtml5').editor.composer.selection.setBookmark(caretBookmark);
				            caretBookmark = null;
		                }else{
			                $element.wysihtml5('setValue',newVal.substr(1));
		                }
				        //实现定向数据更新
				        setInterval(function(){
					        $scope[attr['richTextDirective']] = $element.val();
				        },300);
                    },500);
                }
            });

            $element.wysihtml5(angular.extend(defaultConfig,$scope[attr.config]));
            
            $element.parent().find('iframe').attr('id','richTextIframe');

            var caretBookmark;

            $element.prev().attr('id', 'richTextImageQueueID');

            $element.prev().find('a[data-wysihtml5-command=insertImage]').uploadify({
                swf: 'image/uploadify.swf',
                fileObjName: 'fileUpload',
                uploader: '../upload/stream;jsessionid=' + $cookies.sid,
                multi: false,
                fileTypeDesc : '请选择图片文件',
                fileTypeExts : '*.jpg;*.png;*.jpeg;*.bmp;*.gif;',
                fileSizeLimit : '5MB',
                buttonClass: 'bicon bicon-picture btn btn-default',
                width: 40,
                height: 34,
                queueID: 'richTextImageQueueID',
                buttonText: ' ',
                onDialogOpen: function () {
                    $element.data('wysihtml5').editor.currentView.element.focus(false);
                    caretBookmark = $element.data('wysihtml5').editor.composer.selection.getBookmark();
                },
                onDialogClose: function () {
                    $element.data('wysihtml5').editor.currentView.element.focus();
                },
                onUploadSuccess: function (file, data, response) {
                    data = JSON.parse(data);
                    $element.data('wysihtml5').editor.currentView.element.focus();
                    if (caretBookmark) {
                        $element.data('wysihtml5').editor.composer.selection.setBookmark(caretBookmark);
                        caretBookmark = null;
                    }
                    $element.data('wysihtml5').editor.composer.commands.exec("insertImage",{
		                    src : data.domain + data.filePath,
		                    title : data.fileName,
		                    style : 'max-width:100%;',
	                        'data-img-id' : data.id,
	                        'data-img-width':data.width,
	                        'data-img-heigth':data.height
	                });

	                if(!angular.isArray($scope[attr.imgList])){
		                $scope[attr.imgList] = [];
	                }

	                $scope[attr.imgList].push({id : data.id,name : data.fileName,maxUrl : data.filePath});
	                $scope.$digest();
                }
            });

            $element.prev().find('#richTextFile').uploadify({
                swf: 'image/uploadify.swf',
                fileObjName: 'fileUpload',
                uploader: '../upload/stream;jsessionid=' + $cookies.sid,
                multi: false,
                fileTypeDesc : '请选择文件',
                fileTypeExts : '*.doc;*.docx;*.txt;*.pdf;*.ppt;*.pptx;*.xls;*.xlsx;*.zip;*.rar;*.apk;*.app;*.ipa;*.7z',
                fileSizeLimit : '200MB',
                buttonClass: 'bicon bicon-file btn btn-default',
                width: 40,
                height: 34,
                queueID: 'richTextImageQueueID',
                buttonText: ' ',
                onUploadSuccess: function (file, data, response) {
                    data = JSON.parse(data);
                    if(!angular.isArray($scope[attr.fileList])){
                        $scope[attr.fileList] = [];
                    }

                    $scope[attr.fileList].push({id : data.id,resourceName : data.fileName,resourceUrl : data.filePath});
                    $scope.$digest();
                }
            });

            $scope._richTextRemoveFile = function(index){
                $scope[attr.fileList].splice(index,1);
            };

            var fileListEle = angular.element('<ul class="nav nav-pills">'+
                '<li style="padding:5px 15px 5px 5px;" ng-repeat="file in '+ attr.fileList +'">'+
                '<span ng-cloak >{{file.resourceName}}</span>&nbsp;'+
                '<span class="bicon bicon-remove" ng-click="_richTextRemoveFile($index)" style="cursor:pointer;">'+
                '</span></li></ul>');
            $element.before(fileListEle);
            $compile(fileListEle)($scope);
        }
    };
}]);

// Source: source/directive/timeDirective.js
'use strict';
/**
 * @classdesc 通过调用timeFilter来实现时间的动态更新，间隔为一分钟
 *
 *
 * @constructs timeDirective
 * @example
 * &lt;span time-directive value="1393852258408"&gt;&lt;/span&gt;
 */
angular.module('vsDirective').directive('timeDirective',
    ['$filter', '$timeout', function ($filter, $timeout) {
        function schedule(element, attrs) {
            element.text($filter('timeFilter')(attrs.value));
            $timeout(function () {
                schedule(element, attrs);
            }, 60000);
        }

        return function ($scope, element, attr) {
            schedule(element, attr);
        };
    }]);

// Source: source/directive/uploadifyDirective.js
angular.module('vsDirective').directive('uploadifyDirective',[function(){
    return {
        scope : {
            config : '=uploadifyDirective'
        },
        link : function($scope,$element,attr){
            setTimeout(function(){
	            if($scope.config.onUploadSuccess){
		            var _onUploadSuccess = $scope.config.onUploadSuccess;
		            $scope.config.onUploadSuccess = function(file, data, response){
			            _onUploadSuccess(file, data, response,attr);
		            }
	            }
	            $element.uploadify($scope.config);
            },100);
        }
    }
}]);
// Source: source/directive/vsSmartCaretDirective.js
'use strict';

/**
 * @overview 核心指令定义文件
 * @version 0.1.0
 * @copyright iris.org © 2015
 */

angular.module('vsDirective')
    .directive('vsSmartCaret', function () {

        /**
         * @classdesc 插入一个 `span` 标签，其样式依赖于 [Font Awesome](http://fontawesome.io/)，
         * 可显示四方向的箭头，能基于自定义条件判断并触发自定义动作来交换预先指定的两个方向
         *
         * 自定义条件可双向绑定外部作用域属性，但请小心：__如果两个 `vn-smart-caret` 绑定
         * 同一个外部作用域属性，则会导致它们的行为同步__，这未必是你预期的行为
         *
         * @constructs vsSmartCaretDirective
         * @example
         * &lt;vs-smart-caret vs-careta="left"
         *                 vs-caretb="down"
         *                 vs-action="click"
         *                 vs-baseon="ctrl.property"&gt;&lt;/vs-smart-caret&gt;
         */
        return {
            /**
             * 限制为仅元素
             *
             * @inner
             * @readonly
             * @property {string}
             * @default 'E'
             * @memberof vsSmartCaretDirective
             */
            restrict: 'E',
            /**
             * 开启模板替换
             *
             * @inner
             * @readonly
             * @property {boolean}
             * @default true
             * @memberof vsSmartCaretDirective
             */
            replace: true,
            link: _linkFn,
            /**
             * 指令的作用域
             *
             * @inner
             * @readonly
             * @enum {string}
             * @memberof vsSmartCaretDirective
             */
            scope: {
                careta: '@vsCareta',
                caretb: '@vsCaretb',
                action: '@vsAction',
                baseon: '=vsBaseon'
            },
            template: '<span class="fa fa-fw fa-caret-{{ careta }}"></span>'
        };

        function _linkFn(scope, element, attrs) {
            var caret = angular.element(element),
                careta = 'fa-caret-' + scope.careta,
                caretb = 'fa-caret-' + scope.caretb;

            element.on(attrs['vsAction'], function () {
                scope.$apply(scope.baseon = !scope.baseon);
                if (scope.baseon) {
                    caret.addClass(careta).removeClass(caretb);
                } else {
                    caret.addClass(caretb).removeClass(careta);
                }
            });
        }
    });

// Source: source/controller/blogController.js
'use strict';
//angular.module('vsController').controller('blogListController',['$scope','blogRESTFactory','alertBoxFactory','$location','$cookies','$state','noticeRestFactory',
//                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$cookies,$state,noticeRestFactory){
angular.module('vsController').controller('blogListController',['$scope','blogRESTFactory','alertBoxFactory','$location','$cookies','$state',
                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$cookies,$state){	
	
	$scope.blogArray = [];
	//blog's max id
	$scope.blogShow = true;
	$scope.currentPage = 1;//默认显示页码
	$scope.itemsPerPage = 10;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	
	var listType = "0";//分享
	if($location.path().indexOf("/drafts") > 0){
		listType = "1";
	}
	if ($location.search().pageNumber && $location.search().pageNumber !== true) {
		$scope.currentPage = $location.search().pageNumber;
	}
		
	//第一次加载列表
	getBlog($scope.currentPage);
		
	$scope.paging = function () {
		var state = listType == '0' ? 'articles' : 'articles_drafts';
		$state.go(state,{
			pageNumber : $scope.currentPage
		});
	};
	
	function getBlog(page){
		blogRESTFactory.blogs({
			"isDraft" : listType,
			"pageInfo":{
				"pageNumber":page,
				"pageSize":$scope.itemsPerPage
			}
		},function(data){
			$scope.totalItems = data.totalElements;
			$scope.blogArray = data.content;
			$scope.currentPage = page;
		});
	};
		
//	$scope.myInterval = 1000;
/*	function initNoticeList(){
		noticeRestFactory.noticeList({},function(data){
			$scope.noticeList = [];
			for(var i=0; i< data.length; i++){
				$scope.noticeList.push({ 
					src: '..' + data[i].imageUri,
					href: '#/articles/show/' + data[i].blogId
					});
			}
		});
	}	
	initNoticeList();	
	*/
	$scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
    var newWidth = 600 + slides.length;
    slides.push('http://placekitten.com/' + newWidth + '/300');
    };
   for (var i=0; i<4; i++) {
     $scope.addSlide();
   }
	
	function loadHotBlog(){
		blogRESTFactory.hotBlogs({
			"pageNumber" : 1
		},function (data){
			var lengthNum = data.length;
			for(var i=0;i<data.length;i++){
				if(data[i].id == $scope.blogId){
					lengthNum = data.length-1;
					data.splice(i,1);
				}
			}
			$scope.hotBlogLength = lengthNum;
			$scope.hotBlogs = data;
			
		});
	}
	//loadHotBlog();

	$scope.currId = $cookies.userId;
	$scope.currName = decodeURI($cookies.userName);
	$scope.currImg = $cookies.userImgUrl;


}]);
angular.module('vsController').controller('blogEditController',['$scope','blogRESTFactory','alertBoxFactory','$location','imageRESTFactory',
                                                            function($scope,blogRESTFactory,alertBoxFactory,$location,imageRESTFactory){
		$scope.richTextConfig = {
				file : false
		};
		$scope.submited = false;
		$scope.contentValid = false;
		$scope.blogId = null;
		$scope.pid =$location.search().pid;
		if($location.absUrl().indexOf("/update") > 0){
			$scope.blogId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
		}
		
		$scope.blogSub = function(type){
			$scope.submited = true;
			if(!$scope.blogContent){
				$scope.contentValid = true;
			}else{
				$scope.contentValid = false;
			}
			if($scope.newArticleForm.$valid&&!$scope.contentValid){
				//$scope.blogId不为空做修改操作
				if($scope.blogId){
					blogRESTFactory.update({
						id : $scope.blogId,
						titleName : $scope.blogTitle,
						streamContent : $scope.blogContent,
						streamComefrom:'0',
						isDraft:type
					},function(data){
						showInfo(data,type);
					});
				}else{
					//$scope.blogId 为空做新增操作
					blogRESTFactory.create({
						titleName : $scope.blogTitle,
						streamContent : $scope.blogContent,
						streamComefrom:'0',
						isDraft:type
						},function(data){
							showInfo(data,type);
						},function(data){
							alertBoxFactory('发表失败',{textAlign : 'center',width: 200,waitTime:2});
					});
				}
				
			}
		};
		
		//发表分享（或草稿）时的提示信息
		function showInfo(data,type){
			if(data.blogId){
				if(type==1){
					alertBoxFactory('草稿保存成功',{textAlign : 'center',width: 300,waitTime:2});
					$scope.blogId = data.blogId;
				}else{
					alertBoxFactory('发表成功',{textAlign : 'center',width: 200,waitTime:2});
					$scope.blogId = null;
					$location.path('articles');
				}
			}else if(data.msg){
				alertBoxFactory(data.msg,{textAlign : 'center',width: 300,waitTime:2});
			}else{
				alertBoxFactory('发表失败',{textAlign : 'center',width: 200,waitTime:2});
			}
	
		}
		
		function getBlogInfoById(){
			if($scope.blogId ){
				blogRESTFactory.get({
					"blogId" : $scope.blogId
				},function(data){
					$scope.blogTitle = data.titleName;
					$scope.blogContent = '^' + data.streamContent;
				});
			}else{
				if(!$scope.blogId && !$scope.pid){
					$scope.blogContent = '^';
				}
			}
		}
		$scope.getImageInfo = function(){
			if($scope.pid){
				imageRESTFactory.findImageById({
					"imageId":$scope.pid
				},function(data){
					$scope.blogContent = '^<img src="' + data.absoluteImagePath+'">';
				});
			}else{
				if(!$scope.blogId){
					if(!$scope.blogContent){
						$scope.blogContent = '^';
					}
				}
			}
		};
		getBlogInfoById();
		$scope.getImageInfo();
		//$scope.blogContent = '^' + 'data.absoluteImagePath';
	
}]);
angular.module('vsController').controller('blogDetailController',['$scope','blogRESTFactory','alertBoxFactory',
                                                                  '$location','$sce','blogCommentRESTFactory',
                                                                  '$cookies','utilService','eventsRESTFactory',
                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$sce,
                                                                		commentRESTFactory,$cookies,utilService,eventsRESTFactory){
		
		$scope.currUser = $cookies.userId;
		$scope.blogId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
		$scope.commentHtml1="";
		$scope.showBlogFlag = false;
		
		//用来判断赞的处理是否完成
		$scope.clickMentionValue = false;
		function getBlogInfoById(){
			
			if($scope.blogId == null){
				return ;
			}
			
			$scope.showBlogFlag = true;
			
			blogRESTFactory.get({
				"blogId" : $scope.blogId
			},function(data){
				if(!data.titleName){
					alertBoxFactory('该记录已不存在',{textAlign : 'center',width: 300,waitTime:2});
					$location.path('articles');
					return ;
				}
				
				$scope.blogTitle = data.titleName;
				$scope.blogContent =  $sce.trustAsHtml(data.streamContent);
				$scope.blogPraiseCount = data.praiseCount;
				$scope.blogCreateDate = data.createDate;
				$scope.isOwner = data.createBy == $scope.currUser ? 1 : 0;
				$scope.mentionId = data.mentionId ==null ? false : true;
				$scope.createBy = data.createBy;
				$scope.hasStore = data.hasStore;
				//$scope.mentions = utilService.getMentions(data.mentionList);
				$scope.isSignup = data.isSignup;
				$scope.fileList = data.fileList;
				/*
				if($scope.isSignup == 1){
					eventsRESTFactory.projetList(
							{"blogId":$scope.blogId},
					function(data){
						$scope.projects = data.list;
					});
				}else{
					loadHotBlog();
				}*/
				loadComment($scope.blogId);
				//loadUser($scope.createBy);
			});
			
		}
		
		$scope.downloadFile = function(fileId){
			window.location.href='../mobile/download/attach/downloadFile/'+fileId;
//			documentRestFactory.downloadFile({"fileId": fileId}, function(data){});
		}
		/*
		function loadUser(userId){
			userRESTFactory.get({
				"userId":userId
				
			},function(data){
				$scope.createName = data.userNickname;
				$scope.createImg = data.userImgUrl;
				$scope.createTitle = data.title;
				
			});
			
		}*/
		function loadUser(userId){
			
				$scope.createName = "test";
				$scope.createImg ="test"
				$scope.createTitle = "test";
			
		}
		function loadHotBlog(){
			blogRESTFactory.hotBlogs({
				"pageNumber" : 1
			},function (data){
				var lengthNum = data.length;
				for(var i=0;i<data.length;i++){
					if(data[i].id == $scope.blogId){
						lengthNum = data.length-1;
						data.splice(i,1);
					}
				}
				$scope.hotBlogLength = lengthNum;
				$scope.hotBlogs = data;
				
			});
		}
		function loadComment(blogId){
			commentRESTFactory.comments({
				"blogId" : blogId
			},function(data){
				$scope.commentLength = data.length;
				
				$scope.comments = data;
			});
			
		}
		getBlogInfoById();
		
		$scope.subComment = function(type,html){
			if(!html){
				return;
			}
			//直接回复
			if(type == 1){
				commentRESTFactory.create({
					"blogId":$scope.blogId,
					"commentHtml":$scope.commentHtml1
				},function(data){
					if(data.id){
						data.userNickname = data.userName;
						$scope.comments.push(data);
						$scope.commentHtml1 = "";
						$scope.commentLength = $scope.commentLength + 1;
						alertBoxFactory('评论成功',{textAlign : 'center',width: 200,waitTime:2});
					}else{
						alertBoxFactory('评论失败',{textAlign : 'center',width: 200,waitTime:2});
					}
				});
			}else{
				commentRESTFactory.create({
					"blogId":$scope.blogId,
					"parentId":$scope.commentSubParentId,
					"commentHtml":html
				},function(data){
					if(data.id){
						for(var i = 0 ; i < $scope.comments.length ; i++){
							$scope.comments[i].subFormShow = false;
						}
						data.userNickname = data.userName;
						$scope.comments.push(data);
						html = "";
						$scope.commentLength = $scope.commentLength + 1;
						alertBoxFactory('评论成功',{textAlign : 'center',width: 200,waitTime:2});
					}else{
						alertBoxFactory('评论失败',{textAlign : 'center',width: 200,waitTime:2});
					}
				});
			}
			
		};
		
		$scope.deleteComment = function(config,attr){
			commentRESTFactory.deleteComment({
				"id":attr.commentid
			},function(data){
				if(data.code = "10000"){
					alertBoxFactory('删除评论成功',{textAlign : 'center',width: 300,waitTime:2});
					for(var i =0 ;i <$scope.comments.length; i++){
						if($scope.comments[i].id == attr.commentid){
							$scope.comments.splice(i,1);
							break;
						}
					}
					$scope.commentLength = $scope.commentLength - 1;
				}else{
					alertBoxFactory('删除评论失败',{textAlign : 'center',width: 300,waitTime:2});
				}
			});
		};
		
		$scope.deleteBlog = function(config,attr){
			blogRESTFactory.deleteBlog({
				"id":$scope.blogId
			},function(data){
				if(data.code == "10000"){
					if($scope.isSignup == 1){
						alertBoxFactory('删除活动成功',{textAlign : 'center',width: 300,waitTime:2});
						$location.path('events');
					}else{
						alertBoxFactory('删除分享成功',{textAlign : 'center',width: 300,waitTime:2});
						$location.path('articles');
					}
					
				}else{
					alertBoxFactory('删除分享失败',{textAlign : 'center',width: 300,waitTime:2});
				}
				
			});
		};
		
		$scope.to_update = function(){
			if($scope.isSignup==0){
				$location.path('articles/update/'+$scope.blogId);
			}else{
				$location.path('events/update/'+$scope.blogId);
			}
		};
		$scope.commentSubParentId; 
		$scope.showCommentForm = function(comment){
			for(var i = 0 ; i < $scope.comments.length ; i++){
				if($scope.comments[i] != comment){
					$scope.comments[i].subFormShow = false;
				}
			}
			
			if(!comment.subFormShow){
				$scope.commentSubParentId = comment.id;
			}
			
			comment.subFormShow = !comment.subFormShow;
		};

		$scope.clickMention = function(){
			$scope.clickMentionValue = true;
			blogRESTFactory.blogMention({
				"id" : $scope.blogId
			},function(data){
				if(data.id){
					alertBoxFactory('点赞成功',{textAlign : 'center',width: 300,waitTime:2});
					$scope.blogPraiseCount = $scope.blogPraiseCount + 1;
					$scope.mentionId = true;
					
				}else{
					alertBoxFactory('取消赞成功',{textAlign : 'center',width: 300,waitTime:2});
					$scope.blogPraiseCount = $scope.blogPraiseCount -1;
					$scope.mentionId = false;
				}
				$scope.clickMentionValue = false;
			});
		};
		/*
		$scope.store = function(){
			storeService.store(1,$scope.blogId,$scope.hasStore,function(){
				if($scope.hasStore==0){
					$scope.hasStore = 1;
					alertBoxFactory('收藏成功',{textAlign : 'center',width: 300,waitTime:2});
				}else{
					$scope.hasStore = 0;
					alertBoxFactory('取消收藏成功',{textAlign : 'center',width: 300,waitTime:2});
				}
			});
		};
		
		$scope.showProjectDetail = function(id){
			$location.path('events/show/'+id);
		};
		*/
}]);

// Source: source/controller/signupController.js
'use strict';
angular.module('vsController').controller('eventListController',['$scope','blogRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory','$state',
                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory,$state){

	$scope.itemsPerPage = 3;
	$scope.currentPage = 1;
	$scope.maxSize = 10;
	if ($location.search().pageNumber && $location.search().pageNumber !== true) {
		$scope.currentPage = $location.search().pageNumber;
	}
	function getBlog(page){
		blogRESTFactory.blogs({
			"isSignup":1,
			"pageInfo":{
				"pageNumber":page,
				"pageSize":$scope.itemsPerPage
			}
		},function(data){
			$scope.totalItems = data.totalElements;
			$scope.blogArray = data.content;
			$scope.currentPage = page;
		});
	};
	//第一次加载列表
	getBlog($scope.currentPage);
	$scope.paging = function(){
		$state.go('events',{pageNumber:$scope.currentPage});
	};
	
	function loadNewEvent(){
		blogRESTFactory.blogs({
			"isSignup":1,
			"pageInfo":{
				"pageNumber":1,
				"pageSize":10
			}
		},function(data){
			$scope.newEvents = data.content;
		});
	}
	loadNewEvent();
	
}]);

angular.module('vsController').controller('signupProjectController',['eventService','$scope','eventsRESTFactory','alertBoxFactory',
                                                                 '$location','imageRESTFactory','$cookies',
                                                                 function(eventService,$scope,eventsRESTFactory,alertBoxFactory,
                                                                		 $location,imageRESTFactory,$cookies){
	
	$scope.signList = [];
	$scope.isSignUp = false;
	$scope.pid =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	$scope.getProjectDetail = function(){
		eventsRESTFactory.queryDetailProject({pid:$scope.pid},function(data){
			if(data.code != 10000){
				alertBoxFactory('查询项目详情失败',{textAlign : 'center',width: 400,waitTime:2});
				$location.path('events');
			}else{
				$scope.signList = data.signList;
				$scope.project = data.project;
				$scope.isSignUp = data.project.isSignUp ==1 ? true:false;
				
				if(data.project.createId == $cookies.userId){
					$scope.isCreate = true;
				}else{
					$scope.isCreate = false;
				}
				$scope.isShow = $scope.signList.length>0 && ($scope.isCreate || ( $scope.project.isShow==1 && $scope.isSignUp));
			}
		});
	};

	$scope.getProjectDetail();
	$scope.submited = false;
	$scope.signUpSub = function(){
		$scope.submited = false;
		if(!this.realName || this.realName.length > 10){
			$scope.errorMsg = "真实姓名不能为空或长度不能超过10!";
			$scope.submited = true;
			return ;
		}
		var regMobile = /^1[3|4|5|8][0-9]\d{8}$/;
		if(!regMobile.test(this.phoneNumber)){
			$scope.errorMsg = "电话号码输入有误，请输入正确的手机号码!";
			$scope.submited = true;
			return ;
		}
		if(!this.orgInfo || this.orgInfo.length>30){
			$scope.errorMsg = "所属单位不能为空或长度不能超过30!";
			$scope.submited = true;
			return ;
		}
		if(!this.title || this.title.length>30){
			$scope.errorMsg = "职位名称不能为空或长度不能超过30!";
			$scope.submited = true;
			return ;
		}
		var realName = this.realName;
		var phoneNumber = this.phoneNumber;
		var orgInfo = this.orgInfo;
		var title = this.title;
		eventsRESTFactory.signupProject({
			  "pId":this.pid,
			  "realName":this.realName,
			  "phoneNumber":this.phoneNumber,
			  "orgInfo":this.orgInfo,
			  "title":this.title
		},function(data){
			if(data.code==10000){
				$scope.isSignUp = true;
				alertBoxFactory('报名成功',{textAlign : 'center',width: 400,waitTime:2});
				var newArray = [];
				newArray.push(
						{
							realName : realName,
							phoneNumber : phoneNumber,
							orgInfo : orgInfo,
							title : title
						}
				);
				$scope.isSignUp= true;
				
				$scope.signList = newArray.concat($scope.signList);
				$scope.isShow =$scope.isCreate || ( $scope.project.isShow==1 && $scope.isSignUp);
			}else{
				alertBoxFactory('报名失败',{textAlign : 'center',width: 400,waitTime:2});
			}
		});
	};
	
}]);

	
// Source: source/controller/vsRootController.js
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
    ['$cookies','$rootScope','$http',function ($cookies,$rootScope,$http) {
    	
    	/*
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
	    }*/
    }]);
// Source: source/controller/welcome/forgetController.js
angular.module('vsController').controller('forgetController',
	['$scope', 'welcomeRESTFactory', 'alertBoxFactory', '$interval',
		function ($scope, welcomeRESTFactory, alertBoxFactory, $interval) {

			$scope.sub = function () {
				if (!validate()) return;

				$scope.submitting = true;
				welcomeRESTFactory.resetpw({
					loginName: $scope.loginName,
					plainPassword: $scope.plainPassword,
					validateCode: $scope.validateCode
				}, function (data) {
					$scope.submitting = false;
					if (data && data.code != 10000) {
						alertBoxFactory(data.msg, {width: 300, textAlign: 'center'});
					} else {
						alertBoxFactory('成功修改密码!', {width: 220, textAlign: 'center', type: 'success'});
						setTimeout(function () {
							window.location.href = '../login';
						}, 2000)
					}
				}, function () {
					$scope.submitting = false;
					alertBoxFactory('网络异常!', {width: 250, textAlign: 'center'});
				});
			}
			var sendValidateCodeTimer;
			$scope.getValidateCode = function () {
				if ($scope.forgetForm.loginName.$error.required) {
					alertBoxFactory('请输入手机号!', {width: 250, textAlign: 'center'});
					return;
				}

				if ($scope.forgetForm.loginName.$error.pattern) {
					alertBoxFactory('手机号只能为数字!', {width: 250, textAlign: 'center'});
					return;
				}

				$scope.sendValidateCode = true;
				var validateCodeText = $scope.validateCodeText;
				$scope.validateCodeText = '发送中...';

				welcomeRESTFactory.sendValidateCodeToForget({
					loginName: $scope.loginName
				}, function (data) {
					$scope.validateCodeText = validateCodeText;

					if (data && data.code != 10000) {
						alertBoxFactory(data.msg, {width: 600, textAlign: 'center'});
						$scope.sendValidateCode = false;
					} else {
						alertBoxFactory('发送成功!', {width: 220, textAlign: 'center', type: 'success'});
						validateCodeTime();
					}
				}, function () {
					alertBoxFactory('网络异常!', {width: 250, textAlign: 'center'});
					$scope.sendValidateCode = false;
					$scope.validateCodeText = validateCodeText;
				});
			}

			function validateCodeTime() {
				var validateCodeTick = 30;
				var validateCodeText = $scope.validateCodeText;
				sendValidateCodeTimer = $interval(function () {
					validateCodeTick--;
					$scope.validateCodeText = validateCodeTick + '秒后可重发';
					if (validateCodeTick == 0) {
						$interval.cancel(sendValidateCodeTimer);
						$scope.sendValidateCode = false;
						$scope.validateCodeText = validateCodeText;
					}
				}, 1000, 30);
				$scope.sendValidateCode = true;
			}

			function validate() {
				if ($scope.forgetForm.loginName.$error.required) {
					$scope.validInfo = '请输入手机号!';
					return false;
				}

				if ($scope.forgetForm.loginName.$error.pattern) {
					$scope.validInfo = '手机号只能为数字!';
					return false;
				}

				if ($scope.forgetForm.validateCode.$error.required) {
					$scope.validInfo = '请输入验证码!';
					return false;
				}

				if ($scope.forgetForm.validateCode.$error.pattern) {
					$scope.validInfo = '验证码长度必须是6位!';
					return false;
				}

				if ($scope.forgetForm.plainPassword.$error.required) {
					$scope.validInfo = '请输入密码!';
					return false;
				}

				if ($scope.forgetForm.plainPassword.$error.pattern) {
					$scope.validInfo = '密码长度必须在6-20位之间!';
					return false;
				}

				if ($scope.plainPassword != $scope.repassword) {
					$scope.validInfo = '两次输入的密码必须一致!';
					return false;
				}

				$scope.validInfo = '';
				return true;
			}
		}]);
// Source: source/controller/welcome/signinController.js
angular.module('vsController')
    .controller('signController',
        ['$scope','welcomeRESTFactory','alertBoxFactory','$cookies',
            function($scope,welcomeRESTFactory,alertBoxFactory,$cookies){
	$scope.isSubmit = false;
	$scope.password = '';
    $scope.remember = true;

    if($cookies.lastLoginName){
        $scope.username = $cookies.lastLoginName;
    }

    $scope.login = function(){
	    $scope.signinForm.username.refreshValue();
	    $scope.signinForm.password.refreshValue();

        if($scope.signinForm.$invalid){
            if($scope.signinForm.username.$error.required){
	            alertBoxFactory('登录名不能为空!',{width:300,textAlign : 'center'});
            }else if($scope.signinForm.password.$error.required){
	            alertBoxFactory('密码不能为空!',{width:300,textAlign : 'center'});
            }
            return;
        }

	    $scope.isSubmit = true;
        welcomeRESTFactory.login({
            username : $scope.username,
            password : $scope.password
        },function(result){
	        $scope.isSubmit = false;
			if(result && result.code == '10000'){
                if($scope.remember){
                    $cookies.lastLoginName = $scope.username;
                }
                window.location.href = '../public/index.html#/articles' ;
			}else{
				alertBoxFactory(result.msg,{width : 400,textAlign: 'center'});
			}
		},function(){
	        alertBoxFactory('网络异常!',{width : 230,textAlign: 'center'});
	        $scope.isSubmit = false;
        });
	}

}]);
    

// Source: source/controller/welcome/signupController.js
angular.module('vsController').controller('signupController',['$scope','welcomeRESTFactory','alertBoxFactory','$interval',function($scope,welcomeRESTFactory,alertBoxFactory,$interval){
 	var sendValidateCodeTimer;
	$scope.register = {};

    welcomeRESTFactory.depList(function(data){
        $scope.depList = data;
    });

	$scope.signup = function(){
		if(!validate()) return;

		$scope.register.birthday = $scope.signupForm.birthday.$viewValue;
		$scope.register.phoneNumber = $scope.register.loginName;
        $scope.register.departmentId = $scope.register.department.id;
        delete $scope.register.department;
		$scope.submitting = true;

		welcomeRESTFactory.signup($scope.register,function(data){
			$scope.submitting = false;
			if(data && data.code != 10000){
				alertBoxFactory(data.msg,{width : 350,textAlign : 'center'});
			}else{
				alertBoxFactory('注册成功!',{width : 220,textAlign : 'center',type : 'success'});
				setTimeout(function(){
					window.location.href = '../login';
				},2000)
			}
		},function(){
			$scope.submitting = false;
			alertBoxFactory('网络异常!',{width : 250,textAlign : 'center'});
		});
	}

	$scope.getValidateCode = function(){
		if($scope.signupForm.loginName.$error.required){
			alertBoxFactory('请输入手机号!',{width: 250,textAlign: 'center'});
			return ;
		}

		if($scope.signupForm.loginName.$error.pattern){
			alertBoxFactory('手机号只能为数字!',{width: 250,textAlign: 'center'});
			return ;
		}

		$scope.sendValidateCode = true;
		var validateCodeText = $scope.validateCodeText;
		$scope.validateCodeText = '发送中...';

		welcomeRESTFactory.getValidateCode({
			phoneNumber : $scope.register.loginName
		},function(data){
			$scope.validateCodeText = validateCodeText;

			if(data && data.code != 10000){
				alertBoxFactory(data.msg,{width : 300,textAlign : 'center'});
				$scope.sendValidateCode = false;
			}else{
				alertBoxFactory('发送成功!',{width : 220,textAlign : 'center',type : 'success'});
				validateCodeTime();
			}
		},function(){
			alertBoxFactory('网络异常!',{width : 250,textAlign : 'center'});
			$scope.sendValidateCode = false;
			$scope.validateCodeText = validateCodeText;
		});
	}

	function validateCodeTime(){
		var validateCodeTick = 30;
		var validateCodeText = $scope.validateCodeText;
		sendValidateCodeTimer = $interval(function(){
			validateCodeTick--;
			$scope.validateCodeText = validateCodeTick + '秒后可重发';
			if(validateCodeTick == 0){
				$interval.cancel(sendValidateCodeTimer);
				$scope.sendValidateCode = false;
				$scope.validateCodeText = validateCodeText;
			}
		},1000,30);
		$scope.sendValidateCode = true;
	}

	function validate(){
		if($scope.signupForm.loginName.$error.required){
			$scope.validInfo = '请输入手机号!';
			return false;
		}

		if($scope.signupForm.loginName.$error.pattern){
			$scope.validInfo = '手机号只能为数字!';
			return false;
		}

		if($scope.signupForm.plainPassword.$error.required){
			$scope.validInfo = '请输入密码!';
			return false;
		}

		if($scope.signupForm.plainPassword.$error.pattern){
			$scope.validInfo = '密码长度必须在6-20位之间!';
			return false;
		}

		if($scope.register.plainPassword != $scope.repassword){
			$scope.validInfo = '两次输入的密码必须一致!';
			return false;
		}

		if($scope.signupForm.aliasName.$error.required){
			$scope.validInfo = '请输入昵称!';
			return false;
		}

		if($scope.signupForm.aliasName.$error.pattern){
			$scope.validInfo = '昵称长度必须在2-10位之间!';
			return false;
		}

        if($scope.signupForm.trueName.$error.required){
            $scope.validInfo = '请输入真实姓名!';
            return false;
        }

        if($scope.signupForm.trueName.$error.pattern){
            $scope.validInfo = '真实姓名长度必须在2-10位之间!';
            return false;
        }

        if(!_.isObject($scope.register.department)){
            $scope.validInfo = '请选择所属部门!';
            return false;
        }

		if($scope.signupForm.validateCode.$error.required){
			$scope.validInfo = '请输入验证码!';
			return false;
		}

		if($scope.signupForm.validateCode.$error.pattern){
			$scope.validInfo = '验证码长度必须是6位!';
			return false;
		}

		if($scope.signupForm.birthday.$error.pattern){
			$scope.validInfo = '生日格式格式错误，正确格式:1970-09-01!';
			return false;
		}

		if($scope.signupForm.address.$error.maxlength){
			$scope.validInfo = '所在地长度不能超过150个字符!';
			return false;
		}

		if($scope.signupForm.email.$error.email){
			$scope.validInfo = '电子邮件格式错误!';
			return false;
		}

		if($scope.signupForm.email.$error.maxlength){
			$scope.validInfo = '电子邮件长度不能超过150个字符!';
			return false;
		}

		$scope.validInfo = '';
		return true;
	}
}]);