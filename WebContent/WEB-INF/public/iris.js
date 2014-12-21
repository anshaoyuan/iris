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
            .state('message', {
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

            // Users
            .state('signup', {
                url: '/signup',
                templateUrl: 'template/signup.html'
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'template/signin.html'
            })
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

	.constant('chatDomain','http://tzh.anji.com/node');
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

// Source: source/service/REST/answerRESTFactory.js
angular.module('vsREST').factory('answerRESTFactory',['$resource',function($resource){
	var url = '../mobile/answer/answer/:questionId';
	var actions = {
			create : {
				url : '../mobile/answer/create',
				method : 'post'
			},
			deleteAnswer:{
				url : '../mobile/answer/delete/:id',
				method : 'get'
			},
			answers : {
				url : '../mobile/answer/answer/:questionId',
				method : 'get',
				isArray : true
			},
			solutionQuestion : {
				url : '../mobile/answer/solutionQuestion/:answerId',
				method : 'get'
			},
			metionAnswer : {
				url : '../mobile/answer/mentionAnswer/:id',
				method : 'get'
			}
	};
	var answer = $resource(url,{},actions);
	return answer;
}]);
// Source: source/service/REST/blogCommentRESTFactory.js
angular.module('vsREST').factory('blogCommentRESTFactory',['$resource',function($resource){
	var url = '../mobile/blogComment/comments/:blogId';
	var actions = {
			create : {
				url : '../mobile/blogComment/create',
				method : 'post'
			},
			deleteComment:{
				url : '../mobile/blogComment/delete/:id',
				method : 'get'
			},
			comments : {
				url : '../mobile/blogComment/comments/:blogId',
				method : 'get',
				isArray : true
			}
	};
	var comment = $resource(url,{},actions);
	return comment;
}]);
// Source: source/service/REST/blogRESTFactory.js
angular.module('vsREST').factory('blogRESTFactory',['$resource',function($resource){
	var url = '../mobile/blog/:blogId';
    var actions = {
    	create : {
    		url : '../mobile/blog/create',
    		method : 'post'
    	},
        list : {
            method : 'get'
        },
        blogs: {
        	url: "../mobile/blog/blogs",
        	method :'post'
        },
        update : {
        	method : 'post',
        	url : '../mobile/blog/update'
        },
        initUserBlog : {
        	method : 'post',
        	url :'../mobile/blog/blogs'
        },
        hotBlogs : {
        	method : 'get',
        	url : '../mobile/blog/hotBlog/:pageNumber',
        	isArray :true
        },
        deleteBlog : {
        	method : 'get',
        	url : '../mobile/blog/delete/:id'
        },
        blogMention : {
        	method : 'get',
        	url : '../mobile/blog/mentionBlog/:id'
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
// Source: source/service/REST/lotteryRESTFactory.js
angular.module('vsREST').factory('lotteryRESTFactory',['$resource',function($resource){
	var url = '../mobile/lottery/:id';

	var actions = {
		lottery : {
			method : 'get'
		}
	}

	var lottery = $resource(url,{},actions);

	return lottery;
}]);
// Source: source/service/REST/messageRESTFactory.js
angular.module('vsREST').factory('messageRESTFactory',['$resource',function($resource){
    var url = '../mobile/stream/:id';

    var actions = {
        all : {
            url : '../mobile/search/stream/all',
            method : 'post',
            isArray : true
        },
	    toMyself : {
		    url : '../mobile/search/stream/toMyself/:type',
		    method : 'post'
	    },
	    toMe : {
		    url : '../mobile/search/stream/toMe/:type',
		    method : 'post'
	    },
	    fromMe : {
		    url : '../mobile/search/stream/fromMe/:type',
		    method : 'post'
	    },
	    myTeam : {
		    url : '../mobile/search/stream/myTeam/:type',
		    method : 'post'
	    },
	    draft : {
		    url : '../mobile/search/stream/draft',
		    method : 'post',
		    isArray : true
	    },
	    publish : {
		    url : '../mobile/stream/new',
		    method : 'post'
	    },
	    del : {
		    url : '../mobile/stream/delete/:id',
		    method : 'get'
	    },
	    setRead : {
		    url : '../mobile/stream/isRead/:id',
		    method : 'get'
	    },
	    search : {
		    url : '../mobile/search/stream/list',
		    method : 'post'
	    },
	    session : {
		    url : '../mobile/stream/returnList/:titleId/:id',
		    method : 'get',
		    isArray : true
	    }
    };

    var message = $resource(url,{},actions);

    return message;
}]);

// Source: source/service/REST/noticeRESTFactory.js
'use strict'

angular.module('vsREST')

.factory('noticeRestFactory', ['$resource', function($resource){
	var url = '';
	var actions = {
		noticeList : {
			url : '../mobile/notice/list',
			method : 'get',
			isArray : true
		}
	};
	
	var obj = $resource(url,{},actions);
    
    return obj;
	
}]);
// Source: source/service/REST/questionRESTFactory.js
angular.module('vsREST').factory('questionRESTFactory',['$resource', function($resource){
	var url = '../mobile/question/questionOne/:id';
    var actions = {
    	create : {
    		url : '../mobile/question/create',
    		method : 'post'
    	},
        list : {
        	url : '../mobile/question/question',
            method : 'post'
        },
        update : {
        	method : 'post',
        	url : '../mobile/question/update'
        },
        hotList : {
        	method : 'post',
        	url : '../mobile/question/hotQuestion',
        },
        unAnswerList : {
        	method : 'post',
        	url : '../mobile/question/unAnswerQuestion',
        },
        questionMention : {
        	method : 'get',
        	url : '../mobile/question/mentionQuestion/:id'
        },
        deleteQ : {
        	method : 'get',
        	url : '../mobile/question/delete/:id'
        },
        askQuestion : {
        	method : 'post',
        	url : '../mobile/question/askUser'
        }
    };
   
    var questions = $resource(url,{},actions);
    
    return questions;
}]);
// Source: source/service/REST/relationshipRESTFactory.js
angular.module('vsREST').factory('relationshipRESTFactory',['$resource', function($resource){
	var url = '../mobile/relation/getAllRelationByMe';
    var actions = {
    		addRelation : {
    		url : '../mobile/relation/addRelation/:otherUserId',
    		method : 'get'
    	},
    	cancelRelation : {
        	url : '../mobile/relation/cancelRelation/:otherUserId',
            method : 'get'
        },
        getAllRelationByOtherUser : {
        	method : 'get',
        	url : '../mobile/relation/getAllRelationByOtherUser'
        },
        findOnlyRelationship : {
        	method : 'get',
        	url : '../mobile/relation/findOnlyRelationship/:otherUserId'
        }
    };
   
    var relationByMe = $resource(url,{},actions);
    return relationByMe;
}]);
// Source: source/service/REST/remindRESTFactory.js
'use strict'

angular.module('vsREST')

.factory('remindRESTFactory', ['$resource','$cookies','chatDomain', function($resource,$cookies,chatDomain){
	var url = '';
	
	var actions = {
		allRemindCount : {
			url : '../mobile/remind/allRemindCount',
	        method : 'get'
	    },
	    myselfRemind : {
	    	url : '../mobile/remind/getMyselfRemindList',
	    	method : 'post'
	    },
	    commissionOrDeliverRemind : {
	    	url : '../mobile/remind/commissionOrDeliverRemind',
	    	method : 'post'
	    },
	    managerRemind : {
	    	url : '../mobile/remind/managerRemind',
	    	method : 'post'
	    },
	    teamRemind : {
	    	url : '../mobile/remind/getTeamRemindList',
	    	method : 'post'
	    },
	    setOneTypeMessageWasReaded : {
	    	url : '../mobile/remind/setOneMessageWasRead/:type',
	    	method : 'get'
	    },
	    setAllMessagesWereRead : {
	    	url : '../mobile/remind/setAllMessagesWereRead',
	    	method : 'get'
	    },
	    setOneRemindHasReaded : {
	    	url : '../mobile/remind/setOneRemindHasReaded/:id',
	    	method : 'get'
	    }
	    
	};
	var obj = $resource(url, {}, actions);
	
	return obj;
}])
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
// Source: source/service/REST/scheduleRESTFactory.js
angular.module('vsREST').factory('scheduleRESTFactory',['$resource',function($resource){
	var url = '../mobile/schedule/reply';

	var actions = {
	   reply : {
		   method : 'post'
	   }
	}

	var schedule = $resource(url,{},actions);

	return schedule;
}]);
// Source: source/service/REST/searchRESTFactory.js
angular.module('vsREST').factory('searchRESTFactory',['$resource', function($resource){
	var url = '../searchengine/query';
    var actions = {
        list : {
        	url : '../searchengine/query',
            method : 'post'
        }
    };
   
    var list = $resource(url,{},actions);
    
    return list;
}]);
// Source: source/service/REST/sinaRESTFactory.js
'use strict';

angular.module('vsController')

	.factory('sinaRESTFactory', ['$resource', function ($resource) {
	
		var url = '';
		
		var actions = {
	            validateSina: {
	            	method: 'get',
	            	url: '../mobile/sina/validateSina'
	            },
	            sinaList: {
	            	method: 'post',
	            	url: '../mobile/sina/initList'
	            },
	            changeSinaType: {
	            	method: 'get',
	            	url: '../mobile/sina/changeFirstPageType/:type'
	            },
	            processSinaBlogImg: {
	            	method: 'post',
	            	url: '../mobile/sina/processSinaBlogImg'
	            }
	        };

	        var obj = $resource(url, {}, actions);

	        return obj;
		
}]);
// Source: source/service/REST/storeRESTFactory.js
angular.module('vsREST').factory('storeRESTFactory',['$resource',function($resource){
	var url = '../mobile/store/delete/:refType/:refId';
    var actions = {
    	create : {
    		url : '../mobile/store/create',
    		method : 'post'
    	},
        blogs: {
        	url: "../mobile/store/blogs",
        	method :'post'
        },
        questions : {
        	method : 'post',
        	url : '../mobile/store/questions'
        },
        deleteStore : {
        	method : 'get',
        	url :'../mobile/store/delete/:refType/:refId'
        }
    };
    
    var store = $resource(url,{},actions);
    
    return store;
}]);
// Source: source/service/REST/tagRESTFactory.js
angular.module('vsREST').factory('tagRESTFactory',['$resource',function($resource){
	var url = '../mobile/tag';
	var actions = {
		addForMessage : {
			url : '../mobile/tag/add/:messageId/:tagId',
			method : 'get'
		},
		removeForMessage : {
			url : '../mobile/tag/delete/:messageId/:tagId',
			method : 'get'
		}
	};

	var tag = $resource(url,{},actions);

	return tag;
}]);
// Source: source/service/REST/teamRESTFactory.js
angular.module('vsREST').factory('teamRESTFactory',['$resource',function($resource){
	var url = '../mobile/team/findTeamDetail/:id';
    var actions = {
    	create : {
    		url : '../mobile/team/addteam',
    		method : 'post'
    	},
        list : {
        	url : '../mobile/team/findTeams',
            method : 'post'
        },
        myTeams : {
        	url : '../mobile/team/findUserTeams',
        	method : 'post'
        },
        allTeams : {
        	url : '../mobile/team/getAllTeamForWeb',
        	method : 'post'
        },
        update : {
        	method : 'post',
        	url : '../mobile/team/updateTeamInfo'
        },
        deleteTeam : {
        	url : '../mobile/team/deleteTeam/:id',
        	method : 'get'
        },
        addMember : {
        	url : '../mobile/team/addMember',
        	method : 'post'
        },
        updateTeamcreater : {
        	url : '../mobile/team/updateTeamcreater',
        	method : 'post'
        },
        queryTeamMembers : {
        	url : '../mobile/team/queryTeamMembers/:id',
        	method : 'get'
        },
        deleteMember : {
        	url : '../mobile/team/deleteMember',
        	method : 'post'
        },
        findRelealseTeam : {
        	url : '../mobile/team/findRelealseTeam',
        	method : 'get'
        },
        checkTeamName : {
        	url : "../mobile/team/checkTeamNameIsExist",
        	method : 'post'
        }
    };
    
    var team = $resource(url,{},actions);
    
    return team;
}]);
// Source: source/service/REST/userRESTFactory.js
'use strict';

angular.module('vsREST')

    .factory('userRESTFactory', ['$resource', function ($resource) {
        var url = '../mobile/webUser/show/:userId';
        var actions = {
            list: {
                url: '../mobile/webUser/userList',
                method: 'post',
                isArray : true
            },
            listByPage: {
            	url: '../mobile/webUser/userLists',//带分页
            	method: 'post'
            },
            userContacts: {
                method: 'post',
                url: '../mobile/webUser/userList'
            },
            updateUser: {
                method: 'post',
                url: '../mobile/webUser/updateUser'
            },
            getAttentionList: {
            	method: 'get',
            	url: '../mobile/webUser/getAttentionList',
            	isArray: true
            },
            validateUserName: {
                method: 'post',
                url: '../mobile/webUser/validateUserName'
            },
            updateUserImg : {
	    	 method : 'post',
	    	 url : '../mobile/webUser/updateUserImg'
	     	},
            findUserOrTeamByNameAndEmail: {
                method: 'post',
                url: '../mobile/account/user/findUser',
                isArray: true
            },
            findUserByNameAndEmail: {
                method: 'get',
                url: '../mobile/account/user/findAllUser/:searchKey',
                isArray: true
            },
            updatePwd: {
            	method: 'post',
            	url: '../mobile/account/user/updateSelfPasswd'
            },
            findUsersByIntegral: {
            	method: 'get',
            	url: '../mobile/webUser/findUsersByIntegral',
            	isArray: true
            },
            getAttentionListByPage: {
            	method: 'post',
            	url: '../mobile/webUser/getAttentionListByPage'
            },
            saveNickname: {
            	method: 'get',
            	url: '../mobile/webUser/saveNickname/:nickid/:nickname'
            },
            connectTest: {
            	method: 'post',
            	url: '../email/connectTest'
            },
            saveAccount: {
            	method: 'post',
            	url: '../email/saveAccount'
            },
            getEmailAccount: {
            	method: 'get',
            	url: '../email/getEmailAccount'
            }
        };

        var obj = $resource(url, {}, actions);

        return obj;

    }]);


// Source: source/service/REST/voteRESTFactory.js
angular.module('vsREST').factory('voteRESTFactory',['$resource',function($resource){
	var url = '../mobile/vote/reply';

	var actions = {
		reply : {
			method : 'post'
		}
	}

	var vote = $resource(url,{},actions);

	return vote;
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
// Source: source/service/eventService.js
'use strict';

angular.module('vsService').service('eventService',['alertBoxFactory',function(alertBoxFactory){

	function checkProject(project,index){
		if(!project.projectName){
			alertBoxFactory("第 "+index+" 项项目名称不能为空",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}
		if(project.projectDesc&&project.projectDesc.length>200){
			alertBoxFactory("第 "+index+" 项报名描述不能超过200",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}
		if(!project.startDate){
			alertBoxFactory("第 "+index+" 项报名开始时间非法",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}
		if(!project.endDate){
			alertBoxFactory("第 "+index+" 项报名结束时间非法",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}

		if(project.startDate > project.endDate){
			alertBoxFactory("第 "+index+" 项报名开始时间不能大于结束时间",{textAlign : 'center',width: 600,waitTime:2});
			return;
		}
		if(!project.imageId){
			alertBoxFactory("第 "+index+" 项未上传图片",{textAlign : 'center',width: 400,waitTime:2});
			return false;
		}
		return true;
	}
	
	this.checkAllProject = function(list){
		var subProject = [];
		for(var i = 0;i < list.length; i++){
			var project = list[i];
			var valid = checkProject(project,i+1);
			if(valid){
				var isShow = project.isShow==true?1:0;
				subProject.push({
					id:project.id,
					projectName:project.projectName,
					startDate:project.startDate,
					endDate:project.endDate,
					isShow:isShow,
					imageId: project.imageId,
					projectDesc: project.projectDesc
				});
			}else{
				return false;
			}
		}
		return subProject;
	};
	
}]);
// Source: source/service/remindFactory.js
'use strict';

angular.module('vsService').factory('remindFactory',['$rootScope', 'remindRESTFactory', function($rootScope, remindRESTFactory){
	
	return function(){
		remindRESTFactory.allRemindCount(function(data){
			$rootScope.totalRemindCount = parseInt(data.allRemindCount);
		});
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
				window.location.href = '../login';
			},5000);
		}
		return value;
	}

	return {
		response : fn
	}
}]);
// Source: source/service/storeService.js
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

// Source: source/controller/RssController.js
'use strict';

angular.module('vsController')

.controller('rssController', ['$scope', 'rssRESTFactory', 'alertBoxFactory', 'blogRESTFactory', function($scope, rssRESTFactory, alertBoxFactory, blogRESTFactory){
	
	$scope.initRssList = function(){
		rssRESTFactory.rssList({}, function(data){
			$scope.rssArray = data;
		});
	}
	
	$scope.initRssList();
	
	$scope.rssModel = {
		rssName : '',
		rssUrl : ''
	}
	
	$scope.btnFlag = false;
	
	$scope.addRss = function(){
		if($scope.rssModel.rssName != '' && $scope.rssModel.rssUrl != ''){
			$scope.btnFlag = true;
			//验证RSS
			rssRESTFactory.validateRss({
				"rssName" : $scope.rssModel.rssName,
				"rssUrl" : $scope.rssModel.rssUrl
			}, function(data){
				if(data.valid == '0'){
					//验证通过
					$scope.addRssValidFlag = true;
					addRssDetail();
				}else if(data.valid == '1'){
					$scope.addRssValidFlag = false;
					alertBoxFactory('rss地址无效!',{textAlign : 'center',width: 300});
				}else if(data.valid == '2'){
					$scope.addRssValidFlag = false;
					alertBoxFactory('rss名称已经存在!',{textAlign : 'center',width: 300});
				}
			});
		}else{
			alertBoxFactory('填写的信息不完整',{textAlign : 'center',width: 300});
		}
	}
	
	function addRssDetail(){
		rssRESTFactory.addRss({
			"rssName" : $scope.rssModel.rssName,
			"rssUrl" : $scope.rssModel.rssUrl
		}, function(data){
			if(data.code == '10000') {
				$scope.rssModel = {};
				$scope.initRssList();
			}else{
				alertBoxFactory(data.msg,{textAlign : 'center',width: 300});
				$scope.btnFlag = false;
			}
		});
	}
	
	$scope.viewRss = function(rssName){
		rssRESTFactory.viewRss({
			"rssName" : rssName
		},function(data){
			$scope.rssDetailList = data;
		});
	}
	
	$scope.delRss = function(config, attr){
		var rssName = attr.rssname;
		rssRESTFactory.delRss({
			"rssName" : rssName
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('操作成功!',{textAlign : 'center',width: 300});
				$scope.initRssList();
			}
		});
	}
	
	$scope.shareRss = function(blog){
		
		blogRESTFactory.create({
			"titleName":blog.titleName,
			"streamContent":blog.streamContent,
			"streamComefrom":3,
			"isDraft":0,
			"imgList":[]
		}, function(data){
			if(data.blogId != undefined && data.blogId > 0){
				alertBoxFactory('分享成功!',{textAlign : 'center',width: 300});
			}
		});
		
	}
	
}]);
// Source: source/controller/blogController.js
'use strict';
angular.module('vsController').controller('blogListController',['$scope','blogRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory','$state','noticeRestFactory',
                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory,$state,noticeRestFactory){
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
	function initNoticeList(){
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
	loadHotBlog();

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
                                                                  '$location','$sce','userRESTFactory','blogCommentRESTFactory',
                                                                  '$cookies','utilService','storeService','eventsRESTFactory',
                                                                function($scope,blogRESTFactory,alertBoxFactory,$location,$sce,userRESTFactory,
                                                                		commentRESTFactory,$cookies,utilService,storeService,eventsRESTFactory){
		
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
				$scope.mentions = utilService.getMentions(data.mentionList);
				$scope.isSignup = data.isSignup;
				$scope.fileList = data.fileList;
				if($scope.isSignup == 1){
					eventsRESTFactory.projetList(
							{"blogId":$scope.blogId},
					function(data){
						$scope.projects = data.list;
					});
				}else{
					loadHotBlog();
				}
				loadComment($scope.blogId);
				loadUser($scope.createBy);
			});
			
		}
		
		$scope.downloadFile = function(fileId){
			window.location.href='../mobile/download/attach/downloadFile/'+fileId;
//			documentRestFactory.downloadFile({"fileId": fileId}, function(data){});
		}
		
		function loadUser(userId){
			userRESTFactory.get({
				"userId":userId
				
			},function(data){
				$scope.createName = data.userNickname;
				$scope.createImg = data.userImgUrl;
				$scope.createTitle = data.title;
				
			});
			
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
		
}]);

// Source: source/controller/documentController.js
'use strict'

angular.module('vsREST')

.controller('documentController', ['$scope', 'documentRestFactory', 'alertBoxFactory', '$cookies', '$stateParams', '$state', function($scope, documentRestFactory, alertBoxFactory, $cookies, $stateParams, $state){
	
	var type = $stateParams.type;
	$scope.teamid = $stateParams.teamid;
	
	if(type == 1){
		$scope.currTab = 'm';
	}else if(type == 2){
		$scope.currTab = 'p';
	}else if(type == 3){
		$scope.currTab = 't';
	}
	
	function showMyFolderFn(){
		$scope.showMyFolder = true;
		$scope.showSystemFolder = false;
		$scope.showTeamFolder = false;
		$scope.showCreateButton=true;
		publicModule();
		
	}
	function showPublicFolderFn(){
		$scope.showMyFolder = false;
		$scope.showSystemFolder = true;
		$scope.showTeamFolder = false;
		$scope.showCreateButton=false;
		publicModule();
	}
	function showTeamFolderFn(){
		$scope.showMyFolder = false;
		$scope.showSystemFolder = true;
		$scope.showTeamFolder = true;
		$scope.showCreateButton=false;
		publicModule();
	}
	
	function publicModule(){
		$scope.showUploadButton= false;
		$scope.showCreateFolderDiv = false;
		$scope.showUpdateFolderDiv = false;
		$scope.showFileList = false;
		$scope.addFolderBtnFlag = false;
		$scope.updateFolderBtnFlag =false;
	}
	
	$scope.showCreateDiv = function(){
		$scope.showCreateFolderDiv = true;
	}
	
	$scope.initMyFolderList = function(){
		showMyFolderFn();
		$scope.currFolderType = 'my';
		documentRestFactory.folderList({}, function(data){
			$scope.myFolders = data.userFolder;
//			$scope.systemFolders = data.adminFoler;
			
		})
	}
	
//	$scope.initMyFolderList();
	
	$scope.initSystemFolders = function(){
		$scope.currFolderType = 'system';
		showPublicFolderFn();
		documentRestFactory.folderList({}, function(data){
//			$scope.myFolders = data.userFolder;
			$scope.systemFolders = data.adminFoler;
			
		})
	}
	
	$scope.teamTabVisible = false;
	
	$scope.initTeamFolders = function(){
		showTeamFolderFn();
		documentRestFactory.findTeamFolders({
			"teamId" : $scope.teamid
		}, function(data){
			if(data.code == '10000'){
				var teamFolderList = new Array();
				teamFolderList.push(data.attachmentFolderVo);
				$scope.teamFolder = teamFolderList;
				$scope.isManager = data.isManager;
				$scope.teamTabVisible = true;
			}else{
				alertBoxFactory(data.msg, {textAlign : 'center',width: 440});
				$state.go('docs', {"type" : 1}, {reload : true});
				$scope.teamTabVisible = false;
			}
		});
	}
	
	$scope.delFolder = function(config,attr){
		documentRestFactory.delFolder({"folderId" : attr.folderid}, function(data) {
			if(data.code == '10000') {
				reflashFolderList();
				alertBoxFactory('删除成功!',{textAlign : 'center',width: 200});
				return;
			}
		})
	}
	
	$scope.addFolder = {};
	
	$scope.addFolder = function(){
		
		if($scope.addFolder.folderName == undefined || $scope.addFolder.folderName.trim().length == ''){
			alertBoxFactory('文件夹名称不能为空!',{textAlign : 'center',width: 300});
			return;
		}
		$scope.addFolderBtnFlag = true;
		documentRestFactory.addFolder({
			"folderName" : $scope.addFolder.folderName,
			"remark" : $scope.addFolder.remark
		}, function(data){
			if(data.code == '10000') {
				alertBoxFactory('添加成功!',{textAlign : 'center',width: 200});
				reflashFolderList();
			}else{
				$scope.addFolderBtnFlag = false;
				alertBoxFactory(data.msg,{textAlign : 'center',width: 200});
			}
		});
	}
	
	$scope.showFolder = function(folderId) {
		documentRestFactory.get({
			"folderId" : folderId
		}, function(data){
			$scope.folder = {
				id : data.id,
				folderName : data.folderName,
				remark : data.remark
			};
			$scope.showUpdateFolderDiv = true;
		});
	}
	
	$scope.folderUpdate = function(){
		if($scope.folder.folderName.trim() == ''){
			alertBoxFactory('文件夹名称不能为空!',{textAlign : 'center',width: 200});
			return;
		}
		$scope.updateFolderBtnFlag = true;
		documentRestFactory.updateFolder({
			"id" : $scope.folder.id,
			"folderName" : $scope.folder.folderName,
			"remark" : $scope.folder.remark
		}, function(data){
			if(data.code == '10000'){
				reflashFolderList();
			}else{
				$scope.updateFolderBtnFlag = false;
				alertBoxFactory(data.msg,{textAlign : 'center',width: 200});
			}
		})
	}
	
	$scope.initFileList = function(folderId){
		documentRestFactory.initFileList({"folderId" : folderId}, function(data){
			$scope.currFolderId = folderId;
			$scope.fileList = data;
			$scope.showFileList = true;
			if($scope.currFolderType == 'my'){
				$scope.showUploadButton = true;
			}else{
				$scope.showUploadButton = false;
			}
			$scope.showMyFolder = false;
			$scope.showCreateButton = false;
			$scope.showCreateFolderDiv = false;
			$scope.showUpdateFolderDiv = false;
			$scope.showSystemFolder = false;
			$scope.showTeamFolder = false;
			$scope.showDelBtn = $scope.currFolderType == 'my' ? true : false;
		});
	}
	
	$scope.delFile = function(config,attr){
		var folderId = $scope.currFolderId;
		var fileId = attr.fileid;
		documentRestFactory.delFile({
			"folderId" : folderId,
			"fileId" : fileId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('删除成功!',{textAlign : 'center',width: 200});
				for(var i=0; i< $scope.fileList.length; i++){
					var file = $scope.fileList[i];
					if(file.id == fileId){
						$scope.fileList.splice(i, 1);
						break;
					}
				}
				updateCover();
			}
		});
	}
	
	function reflashFolderList(){
		$scope.initMyFolderList();
		if($scope.showSystemFolder){
			$scope.initSystemFolders();
		}
	}
	

	$scope.fileUpload = {
		swf: '../public/image/uploadify.swf',
		fileObjName: 'fileUpload',
		uploader: '../uploadDocument',
		multi: false,
		fileTypeDesc : '请选择文件:*.DOC;*.XLS;*.PPT;*.TXT;*.DOCX;*.XLSX;*.PPTX',
		fileTypeExts : '*.DOC;*.XLS;*.PPT;*.TXT;*.DOCX;*.XLSX;*.PPTX',
		fileSizeLimit : '20MB',
		buttonClass : 'btn btn-default',
		width : 100,
		height : 33,
		buttonText: '上传附件',
		onUploadSuccess: function (file, data, response) {
			$scope.initFileList($scope.currFolderId);
		},
		onUploadStart : function(file) {
			$('#fileUpload').uploadify("settings",
					"formData", {
				'folderId' : $scope.currFolderId
			})
		}
	}
	
	function updateCover(){
		//更新封面
		documentRestFactory.updateFolderCover({"folderId" : $scope.currFolderId}, function(data) {});
	}
	
	if(type == 1){
		// 我的文件夹
		$scope.initMyFolderList();
	} else if(type == 2){
		//公共文件夹
		$scope.initSystemFolders();
	} else if(type == 3){
		//群组文件夹
		$scope.initTeamFolders();
	}
	
	$scope.changeTab = function (type) {
		$scope.searchSurfix = '';
		if(type == 1){
			//我的相册
			$state.go('docs', {"type" : 1}, {reload : true});
		}else if(type == 2){
			//公共相册
			$state.go('docs', {"type" : 2}, {reload : true});
		}else if(type == 3){
			//群组相册
			$state.go('docs', {"type" : 3, "teamid" : $scope.teamid}, {reload : true});
		}
	};
	
	$scope.downloadFile = function(fileId){
		window.location.href='../mobile/download/attach/downloadFile/'+fileId;
//		documentRestFactory.downloadFile({"fileId": fileId}, function(data){});
	}

}]);
// Source: source/controller/eventsController.js
'use strict';
angular.module('vsController').controller('eventsNewController',['eventService','$scope','eventsRESTFactory','alertBoxFactory',
                                                                 '$location','imageRESTFactory','$cookies','blogRESTFactory',
                                                                 function(eventService,$scope,eventsRESTFactory,alertBoxFactory,
                                                                		 $location,imageRESTFactory,$cookies,blogRESTFactory){
//	$scope.richTextConfig = {
//			file : false
//	};
	
	$scope.fileList = [];
	
	var uploadConfig = {
			swf: 'image/uploadify.swf',
			fileObjName: 'fileUpload',
			uploader: '../upload/stream;jsessionid=' + $cookies.sid,
			multi: false,
			fileTypeDesc : '请选择图片文件',
			fileTypeExts : '*.jpg;*.png;*.jpeg;*.bmp;*.gif;',
			fileSizeLimit : '5MB',
			buttonClass: 'btn btn-default',
			width: 80,
			height: 34,
			buttonText: '附加图片',
			onUploadSuccess: function (file, data, response,attr) {
				data = JSON.parse(data);
				var voteOptionIndex = attr.id.replace('voteUpload-','');
				$scope.projects.projectList[voteOptionIndex].imageUrl = data.filePath.replace(/^\/[^\/]+/,'');
				$scope.projects.projectList[voteOptionIndex].imageUri = $scope.sysPath + data.filePath;
				$scope.projects.projectList[voteOptionIndex].imageId = data.id;
				$scope.$digest();
			}
	};
	$scope.projects = {
			projectList : []
	};
	function addProject(){
		$scope.projects.projectList.push({
			projectName : '',
			projectDesc : '',
			isShow : true,
			uploadConfig : _.clone(uploadConfig)
		});
	}
	
	$scope.addProject = addProject;
	$scope.blogId = null;
	if($location.absUrl().indexOf("/update") > 0){
		$scope.blogId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	}else{
		addProject();
	}
	$scope.showWaringInfo = false;
	$scope.submited = false;


	$scope.eventSub = function(){
		$scope.submited = true;
		$scope.showWaringInfo = false;
		if(!$scope.blogTitle||$scope.newEvent.title.$invalid){
			$scope.errorMsg = "标题不能为空且长度不能大于40个字符!";
			$scope.showWaringInfo = true;
			return;
		}
		if(!$scope.blogContent){
			$scope.errorMsg = "正文不能为空!";
			$scope.showWaringInfo = true;
			return ;
		}
		if($scope.blogContent.indexOf("<img src")<0){
			$scope.errorMsg = "你未给活动上传图片!";
			$scope.showWaringInfo = true;
			return ;
		}
		
		var subProject = eventService.checkAllProject($scope.projects.projectList);
		if(!subProject){
			return;
		}
		if(!$scope.showWaringInfo){
			var subFileList = [];
			
			for(var i=0;i<$scope.fileList.length;i++){
				subFileList.push({id : $scope.fileList[i].id});
			}
			if($scope.blogId){
				eventsRESTFactory.update({
					id		  : $scope.blogId,
					titleName : $scope.blogTitle,
					streamContent : $scope.blogContent,
					streamComefrom : 0,
					isDraft : 0,
					projects:subProject,
					fileList : subFileList
					
				},function(data){
					if(data.code==10000){
						alertBoxFactory('修改成功',{textAlign : 'center',width: 200,waitTime:2});
						$location.path('events');
					}else{
						alertBoxFactory('修改失败',{textAlign : 'center',width: 200,waitTime:2});
					}
					
				});
			}else{
				eventsRESTFactory.create({
					titleName : $scope.blogTitle,
					streamContent : $scope.blogContent,
					streamComefrom : 0,
					isDraft : 0,
					projects:subProject,
					fileList : subFileList
										
				},function(data){
					alertBoxFactory('发表成功',{textAlign : 'center',width: 200,waitTime:2});
					$location.path('events');
				},function(data){
					alertBoxFactory('发表失败',{textAlign : 'center',width: 200,waitTime:2});
				});
			}
			
		}
		
	};
	$scope.deleteProject = function(index,pid){
		if(pid){
			eventsRESTFactory.deleteProject({
				id:pid
			},function(data){
				if(data.code!=10000){
					alertBoxFactory('删除项目失败',{textAlign : 'center',width: 200,waitTime:2});
					return;
				}else{
					$scope.projects.projectList.splice(index,1);
				}
			});
		}else{
			$scope.projects.projectList.splice(index,1);
		}
		
		
	};
	function getBlogInfoById(){
		if($scope.blogId ){
			blogRESTFactory.get({
				"blogId" : $scope.blogId
			},function(data){
				$scope.blogTitle = data.titleName;
				$scope.blogContent = '^' + data.streamContent;
				$scope.fileList = data.fileList;
			});
			eventsRESTFactory.projetList(
					{"blogId":$scope.blogId},
			function(data){
				for(var i = 0; i< data.list.length; i++ ){
					var project = data.list[i];
					var isShow = project.isShow ==1? true : false ;
					$scope.projects.projectList.push({
						projectName : project.projectName,
						isShow : isShow,
						startDate : project.startDate,
						endDate : project.endDate,
						id : project.id,
						imageUrl :  project.minImageUrl,
						imageUri :  project.minImageUrl,
						imageId : project.imageId,
						projectDesc:project.projectDesc,
						uploadConfig : _.clone(uploadConfig)
					});
				}
			});
		}else{
			if(!$scope.blogId){
				$scope.blogContent = '^';
			}
		}
	}
	getBlogInfoById();
}]);

// Source: source/controller/imageFolderController.js
'use strict';

angular.module('vsREST')

.controller('imageFolderController', ['$scope', 'imageRESTFactory', 'alertBoxFactory', '$cookies', '$state','$stateParams', '$location', 
                                      function($scope, imageRESTFactory, alertBoxFactory, $cookies, $state, $stateParams, $location){
	
	var uid = $cookies.userId;
	
	var type = $stateParams.type;
	$scope.teamid = $stateParams.teamid == undefined ? 0 : $stateParams.teamid;
	
	$scope.itemsPerPage = 10;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	
	if(type == 1){
		$scope.currTab = 'm';
	}else if(type == 2){
		$scope.currTab = 'p';
	}else if(type == 3){
		$scope.currTab = 't';
	}
	
	function showMyFolderFn(){
		$scope.showMyFolderAndBtn = true;
		$scope.showSystemFolder = false;
		$scope.showTeamImageFolder = false;
		$scope.showCreateButton=true;
		publicModule();
	}
	
	function showPublicFolderFn(){
		$scope.showMyFolderAndBtn = false;
		$scope.showSystemFolder = true;
		$scope.showTeamImageFolder = false;
		$scope.showCreateButton=false;
		publicModule();
	}
	
	function publicModule(){
		$scope.showUploadButton= false;
		$scope.showCreateFolderDiv = false;
		$scope.showUpdateFolderDiv = false;
		$scope.showFileList = false;
		$scope.addFolderBtnFlag =false;
		$scope.updateFolderBtnFlag =false;
	}
	
	function initMyFolders() {
		showMyFolderFn();
		imageRESTFactory.myfolder({"userId" : uid}, 
			function(data){
			$scope.myFolders = data.folders;
		});
	}
	
	$scope.showCreateDiv = function(){
		$scope.showCreateFolderDiv = true;
	};

	function initSystemFolders() {
		showPublicFolderFn();
		imageRESTFactory.sysFolder({"folderType":"1"}, 
			function(data){
			$scope.systemFolders = data.folders;
		});
	}
	
	function showTeamImageFolderFn(){
		$scope.showMyFolderAndBtn = false;
		$scope.showSystemFolder = false;
		$scope.showTeamImageFolder = true;
		publicModule();
	}
	
	$scope.teamTabVisible = false;
	
	function initTeamImageFolder() {
		showTeamImageFolderFn();
		imageRESTFactory.findTeamImageFolder({
			"teamId" : $scope.teamid
		}, function(data){
			if(data.code == '10000'){
				var teamFolderList = new Array();
				teamFolderList.push(data.imageFolderVo);
				$scope.teamImageFolder = teamFolderList;
				$scope.isManager = data.isManager;
				$scope.teamTabVisible = true;
			}else{
				alertBoxFactory(data.msg, {textAlign : 'center',width: 440});
				$state.go('pics', {"type" : 1}, {reload : true});
				$scope.teamTabVisible = false;
			}
		});
	}
	
	$scope.changeTab = function (type) {
		if(type == 1){
			//我的相册
			$state.go('pics', {"type" : 1}, {reload : true});
		}else if(type == 2){
			//公共相册
			$state.go('pics', {"type" : 2}, {reload : true});
		}else if(type == 3){
			//群组相册
			$state.go('pics', {"type" : 3, "teamid" : $scope.teamid}, {reload : true});
		}
	};
	
	$scope.initImageList = function(folderId){
		imageRESTFactory.imageList({"folderId" : folderId}, function(data){
			$scope.currFolderId = data.imageFolder.id;
			$scope.imageList = data.imageFolder.imageList;
			if($scope.currTab == 'm'){
				$scope.showUploadButton = true;
			}else{
				$scope.showUploadButton = false;
			}
			$scope.showFileList = true;
			$scope.showMyFolderAndBtn = false;
			$scope.showSystemFolder = false;
			$scope.showCreateButton = false;
			$scope.showTeamImageFolder = false;
			$scope.showCreateFolderDiv = false;
			$scope.showUpdateFolderDiv = false;
			$scope.showDelBtn = ($scope.currTab == 'm') ? true : false;
		});
	};
	
	$scope.delImg = function(config, attr){
		var imageId= attr.imageid;
		var folderId = attr.folderid;
		imageRESTFactory.delImage({
			"folderId" : folderId,
			"imageId" : imageId
		}, function(data){
			if(data.code == '10000'){
				for(var i=0; i< $scope.imageList.length; i++){
					var image = $scope.imageList[i];
					if(image.id == imageId){
						$scope.imageList.splice(i, 1);
						break;
					}
				}
				alertBoxFactory('删除成功!',{textAlign : 'center',width: 200});
				updateCover();
			}
		});
	};
	
	$scope.showImageFolder = function(folderId) {
		imageRESTFactory.showImageFolder({
			"folderId" : folderId
		}, function(data){
			$scope.imageFolder = {
				id : data.imageFolder.id,
				folderName : data.imageFolder.folderName
			};
			
			$scope.showUpdateFolderDiv = true;
		});
	};
	
	$scope.imageFolderUpdate = function(){
		if($scope.imageFolder.folderName.trim() == ''){
			alertBoxFactory('相册名称不能为空!',{textAlign : 'center',width: 200});
			return;
		}
		$scope.updateFolderBtnFlag = true;
		imageRESTFactory.updateImageFolder({
			"id" : $scope.imageFolder.id,
			"folderName" : $scope.imageFolder.folderName
		}, function(data){
			if(data.code == '10000'){
				$scope.updateFolderBtnFlag = false;
				alertBoxFactory('更新成功!',{textAlign : 'center',width: 200});
				reflashImageFolder();
			}else{
				$scope.updateFolderBtnFlag = false;
				alertBoxFactory('更新失败,请联系管理员!',{textAlign : 'center',width: 200});
			}
		});
	};
	
	$scope.delImageFolder = function(config,attr) {
		imageRESTFactory.delImageFolder({"folderId" : attr.folderid}, function(data){
			if(data.code== '10000') {
				alertBoxFactory('删除成功!',{textAlign : 'center',width: 200});
				reflashImageFolder();
			}
		});
	};
	
	function reflashImageFolder(){
		if($scope.showMyFolderAndBtn){
			initMyFolders();
		}else{
			initSystemFolders();
		}
	}
	
	$scope.addFolder = function(){
		
		if($scope.addFolder.folderName == undefined || $scope.addFolder.folderName.trim().length == ''){
			alertBoxFactory('相册名称不能为空!',{textAlign : 'center',width: 300});
			return;
		}
		$scope.addFolderBtnFlag = true;
		imageRESTFactory.addFolder({
			"folderName" : $scope.addFolder.folderName,
			"folderType" : "3"
		}, function(data){
			if(data.code == '10000') {
				alertBoxFactory('添加成功!',{textAlign : 'center',width: 200});
				reflashImageFolder();
			}else{
				$scope.addFolderBtnFlag = false;
				alertBoxFactory(data.msg,{textAlign : 'center',width: 200});
			}
		});
	};
	
	$scope.fileUpload = {
            swf: '../public/image/uploadify.swf',
            fileObjName: 'fileUpload',
            uploader: '../ajaxupload',
            multi: false,
            fileTypeDesc : '请选择图片文件',
            fileTypeExts : '*.BMP;*.JPEG;*.JPG;*.GIF;*.PNG',
            fileSizeLimit : '5MB',
            buttonClass : 'btn btn-default',
            width : 100,
            height : 33,
            buttonText: '上传图片',
            onUploadSuccess: function (file, data, response) {
            	$scope.initImageList($scope.currFolderId);
            },
			onUploadStart : function(file) {
				$('#fileUpload').uploadify("settings",
					"formData", {
						'folderId' : $scope.currFolderId
				});
			}
	};
	
	function updateCover(){
		//更新相册封面
    	imageRESTFactory.updateImageFolderCover({"folderId" : $scope.currFolderId}, function(data) {});
	}
	
	$scope.shareImage = function(image) {
		var url = '/articles/new?pid=' + image.id;
		$location.url(url);
//		$state.go(url, {}, {reload : true});
	};
	
	$scope.transImage = function(image) {
		var url = '/new?photo=' + image.absoluteImagePath + '&photoid=' + image.id;
		$location.url(url);
//		$state.go(url, {}, {reload : true});
	};
	
	if(type == 1){
		//个人相册
		initMyFolders();
	} else if(type == 2) {
		//系统相册
		initSystemFolders();
	} else if(type == 3){
		//群组相册
		initTeamImageFolder();
	}
	
}])



;
// Source: source/controller/message/messageDetailController.js
angular.module('vsController')
    .controller('messageDetailController',
        ['$scope', 'messageRESTFactory', 'alertBoxFactory', '$sce', '$cookies','$rootScope','tagRESTFactory','scheduleRESTFactory','voteRESTFactory','$stateParams','$state','dynamicImgSrcFactory','lotteryRESTFactory','$timeout',
            function ($scope, messageRESTFactory, alertBoxFactory, $sce, $cookies,$rootScope,tagRESTFactory,scheduleRESTFactory,voteRESTFactory,$stateParams,$state,dynamicImgSrcFactory,lotteryRESTFactory,$timeout) {
	            var prevMoreMsgList = [],nextMoreMsgList = [];
	            $scope.loadOver = false;
	            $scope.showEditBtn = false;
	            $scope.showNotice = false;
	            $scope.loading = false;
	            $scope.msgList = [];

	            loadDetail($stateParams.titleId,$stateParams.id);

	            $scope.delMessageConfig = {
		            title : '确定删除该消息吗？',
		            okFn : function(data){
			            var id = data.attr.messageId;
			            messageRESTFactory.del({id : id},function(data){
				            if(data && data.code != 10000){
					            alertBoxFactory('删除失败!',{width : 220,textAlign: 'center'});
				            }else{
					            alertBoxFactory('删除成功!',{width : 220,type : 'success',textAlign: 'center'});
					            for(var i = 0;i < $scope.msgList.length;i++){
						            if($scope.msgList[i].id == id){
							            $scope.msgList.splice(i,1);
						            }
					            }

                                if($scope.msgList.length == 0){
					                $scope.loadOver = false;
                                }
					            $rootScope.$broadcast('message.del',id);
				            }
			            },function(){
				            alertBoxFactory('网络异常!',{width : 220,textAlign: 'center'});
			            });
		            }
	            }

	            $scope.switchStar = function(message){
		        	var action = !!message.starTag ? 'removeForMessage' : 'addForMessage';
		            tagRESTFactory[action]({
			            messageId : message.id,
			            tagId : 1
		            },function(data){
			            if(data && data.code != 10000){
				            alertBoxFactory('操作失败!',{width : 200,textAlign : 'center'});
			            }else{
				            var alertInfo = !!message.starTag ? '成功取消星标!' : '成功添加星标!'
				            alertBoxFactory(alertInfo,{width : 300,textAlign : 'center',type : 'success'});
				            message.starTag = !message.starTag;
			            }
		            },function(){
			            alertBoxFactory('网络异常!',{width : 200,textAlign : 'center'});
		            });
	            }

	            $scope.msgExtend = function(message,$event){
		            if($event && $event.target && $event.target){
			            var target = angular.element($event.target);
			            if(target.attr('href')  || target.attr('only-click-self')){
				            return;
			            }
		            }

		            if(message.p_extend){
				            message.msgClass = 'item card';
			            }else{
				            message.msgClass = 'item';
			            }

			            message.p_extend = !message.p_extend;
	            }

	            $scope.msgExtendMore = function(type){
		            var spliceIndex,iterator;
		            if(type == 'next'){
			            iterator = nextMoreMsgList;
			            spliceIndex = $scope.msgList.length - 2;
		            }else if(type == 'prev'){
			            iterator = prevMoreMsgList;
			            spliceIndex = 1;
		            }
		            $scope.msgList.splice(spliceIndex,1);
		            for(var i = iterator.length - 1;i >= 0;i--){
			            $scope.msgList.splice(spliceIndex,0,iterator[i]);
		            }
	            }

	            function loadDetail(titleId,id){
		            var action,paramData;
		            if(angular.isDefined(titleId)){
			            action = 'session';
			            paramData = {titleId : titleId,id :id};
		            }else{
			            action = 'get';
			            paramData = {id :id};
		            }

		            $scope.loadOver = false;
		            $scope.loading = true;

		            messageRESTFactory[action](paramData, function (data) {
			            if(data.code && data.code != 10000){
				            alertBoxFactory(data.msg,{width : 240,textAlign: 'center'});
				            $scope.loadOver = true;
				            $scope.loading = false;
				            return;
			            }

			            initMsgList(data,id);

			            $scope.loadOver = true;
			            $scope.loading = false;
		            }, function (data) {
			            alertBoxFactory('网络异常!',{width : 240,textAlign: 'center'});
			            $scope.loadOver = true;
			            $scope.loading = false;
		            });
	            }

                function fetchReceiver(msg, currUserId) {
                    var toReceiver = [], ccReceiver = [], bcReceiver = [], isReceiver = false;

	                if(msg.sendAllPeople == 1){
		                msg.p_toReceiver = [];
		                msg.p_ccReceiver = [];
		                msg.p_bcReceiver = [];
		                msg.p_toReceiver.push({
			                receiverName : '所有人'
		                });
		                return;
	                }

                    for (var i = 0; i < msg.streamReadShipList.length; i++) {
                        var receiver = msg.streamReadShipList[i];

                        if (receiver.ccType.toLowerCase() == 't') {
                            toReceiver.push(receiver);
                        } else if (receiver.ccType.toLowerCase() == 'c') {
                            ccReceiver.push(receiver);
                        } else if (receiver.ccType.toLowerCase() == 'b') {
                            bcReceiver.push(receiver);
                        }
                    }

	                fetchCustomReceiver(msg.allReceiverMails,toReceiver);
	                fetchCustomReceiver(msg.allCcReceiverMails,ccReceiver);
	                fetchCustomReceiver(msg.allBccReceiverMails,bcReceiver);

                    msg.p_toReceiver = toReceiver;
                    msg.p_ccReceiver = ccReceiver;

                    if (msg.createBy == currUserId) {
                        msg.p_bcReceiver = bcReceiver;
                    }

                }

	            function fetchCustomReceiver(emailStr,receivers){
		            if(!angular.isString(emailStr) || emailStr.length <= 0){
			            return;
		            }
		            var emailStrArr = emailStr.split(';');

		            for(var i = 0;i < emailStrArr.length;i++){
			            if (emailStrArr[i].length <= 0) {
				            return;
			            }

			            var isExists = false;

			            for(var j = 0;j < receivers.length;j++){
				            var receiver = receivers[j];
				            if(angular.isNumber(receiver.id) && receiver.receiverEmail == emailStrArr[i]){
					            isExists = true;
					            break;
				            }
			            }

			            if(!isExists){
				            receivers.push({
					            receiverEmail : emailStrArr[i],
					            receiverName : emailStrArr[i]
				            });
			            }

		            }
	            }

	            function initScheduleInfo(msg){
		            var schedule = msg.schedule;
		            schedule.showUserStats = false;
		            schedule.disabledScheduleBtn = $cookies.userId == msg.createBy;
		            var scheduleUserList = schedule.scheduleUserList ? schedule.scheduleUserList : [];

		            var maybeList = [],attendList = [],absentList = [];
		            for(var i = 0;i < scheduleUserList.length;i++){
			            var user = scheduleUserList[i];
			            if(user.reply == 1){
				            if(user.userId == $cookies.userId) schedule.reply = 1;
				            attendList.push(user);
			            }else if(user.reply == 2){
				            if(user.userId == $cookies.userId) schedule.reply = 2;
				            absentList.push(user);
			            }else if(user.reply == 3){
				            if(user.userId == $cookies.userId) schedule.reply = 3;
				            maybeList.push(user);
			            }
		            }

		            schedule.attendList = attendList;
		            schedule.absentList = absentList;
		            schedule.maybeList = maybeList;

		            schedule.changeStats = function(reply){
			            var oldReply = schedule.reply;
			            schedule.disabledScheduleBtn = true;
			            schedule.replyLoading = reply;

			            scheduleRESTFactory.reply({
				            id : msg.schedule.id,
				            reply : reply
			            },function(data){
					        schedule.disabledScheduleBtn = false;
				            schedule.replyLoading = 0;

				            if(data && data.code != 10000){
					            alertBoxFactory(data.msg,{width : 400,textAlign: 'center'});
				            }else{
					            schedule.reply = reply;
					            scheduleUserStatsChange(reply,oldReply);
				            }
			            },function(){
				            alertBoxFactory('网络异常!',{width : 220,textAlign: 'center'});
				            schedule.disabledScheduleBtn = false;
				            schedule.replyLoading = 0;
			            });
		            }

		            function scheduleUserStatsChange(newReply,oldReply){
			            if(newReply == oldReply) return;
			            if(oldReply){
				            var oldList = getUserListByReply(oldReply);
				            var newList = getUserListByReply(newReply);
				            var scheduleUserStats ;
				            for(var i = 0;i < oldList.length;i++){
					            if(oldList[i].userId == $cookies.userId){
						            scheduleUserStats = oldList[i];
						            oldList.splice(i,1);
						            break;
					            }
				            }
				            if(scheduleUserStats) newList.push(scheduleUserStats);
			            }else{
				            var newList = getUserListByReply(newReply);
				            newList.push({userName : $cookies.loginUserName,userId : $cookies.loginUserId});
			            }
		            }

		            function getUserListByReply(reply){
			            if(reply == 1) return schedule.attendList;
			            if(reply == 2) return schedule.absentList;
			            if(reply == 3) return schedule.maybeList;
		            }
	            }

	            function initVoteInfo(msg){
		            var vote = msg.vote;
			        vote.showMember = msg.createBy == $cookies.userId;

		            if(vote.voted){

		            }else{
			            if(msg.createBy == $cookies.userId){
				            vote.voted = true;
				            return;
			            }

			            if(vote.voteType == 1) vote.selectVoteOption = [];
		            }

		            showVoteOptionDetail(vote.voteOptionList);

		            vote.vote = function(){
			            vote.isSubmit = true;
			            var selectVoteOptionArr = angular.isArray(vote.selectVoteOption) ? vote.selectVoteOption : [vote.selectVoteOption];
			            voteRESTFactory.reply({
				            id : vote.id,
				            voteOpionIdArr : selectVoteOptionArr,
				            anonymity : vote.anonymity
			            },function(data){
				            vote.isSubmit = false;
				            if(data && data.code && data.code != 10000){
					            alertBoxFactory(data.msg,{width : 300,textAlign:'center'});
				            }else{
					            vote.voted = true;
					            vote.voteTotal += selectVoteOptionArr.length;
					            vote.voteOptionList = data.voteOptionList;
					            showVoteOptionDetail(data.voteOptionList);
				            }
			            },function(){
				            alertBoxFactory('网络异常!',{width : 220,textAlign: 'center'});
				            vote.isSubmit = false;
			            });
		            }

		            function showVoteOptionDetail(list){
			            for(var i = 0;i < list.length;i++){
				        	if(msg.createBy == $cookies.userId || list[i].downloadImageUri){
						        list[i].showDetailBtn = true;
					        }
			            }
		            }
	            }

	            function initLotteryInfo(msg){
		            var lottery = msg.lotteryVo;

		            showLotteryOptionDetail(lottery.lotteryOptionVoList,lottery.lotteryOptionId);

		            if(!lottery.finished && lottery.expired){
			            lottery.resultDes = '很遗憾抽奖活动已结束!';
		            }

		            lottery.lottery = function(){
			            if(lottery.over) return;

			            lottery.isSubmit = true;
			            lotteryRESTFactory.lottery({id : lottery.id},function(data){
				            lottery.isSubmit = false;
				            if(data && data.code && data.code != 10000){
					            alertBoxFactory(data.msg,{width : 300,textAlign:'center'});
				            }else{
					            lottery.run = lottery.over = true;
					            $timeout(function(){
						            lottery.run = false;
						            alertBoxFactory('恭喜你，获得了 ' + data.content,{width : 300,textAlign:'center'});
					            },(Math.random(5) + 2) * 1000);
				            }
			            },function(){
				            alertBoxFactory('网络异常!',{width : 220,textAlign: 'center'});
				            lottery.isSubmit = false;
			            });
		            }

		            function showLotteryOptionDetail(list,selectOptionId){
			            for(var i = 0;i < list.length;i++){
				            if(msg.createBy == $cookies.userId || list[i].downloadImageUri){
					            list[i].showDetailBtn = true;
				            }
				            if(list[i].id == selectOptionId){
				                lottery.resultDes = '你获得了 ' + list[i].content;
				            }
			            }
		            }
	            }

	            function initMsgList(data,id){
		            if(angular.isArray(data)){
			            var prevMoreCount = 0,nextMoreCount = 0,msgIndex = null;
//			            data.reverse();
			            for(var j = 0;j < data.length;j++){
				            data[j].p_extend = false;
				            data[j].msgClass = 'item card';
				            initMessage(data[j]);
				            if(data[j].id == id){
					            msgIndex = j;
					            data[j].msgClass = 'item';
					            data[j].p_extend = true;
				            }else if(j > 0 && j < data.length - 1){
								if(msgIndex == null){
									prevMoreCount++;
								}else{
									nextMoreCount++;
								}
				            }
			            }
			            $scope.msgList = data;
			            $scope.showMessageList = true;

			            if(prevMoreCount > 3){
				        	prevMoreMsgList = data.splice(1,prevMoreCount,{moreType : 'prev',moreCount : prevMoreCount,msgClass : 'item card'});
			            }
			            if(nextMoreCount > 3){
				            if(prevMoreMsgList.length){
					            nextMoreMsgList = data.splice(3,nextMoreCount,{moreType : 'next',moreCount : nextMoreCount,msgClass : 'item card'});
				            }else{
				                nextMoreMsgList = data.splice(msgIndex + 1,nextMoreCount,{moreType : 'next',moreCount : nextMoreCount,msgClass : 'item card'});
				            }
			            }
		            }else{
			            data.p_extend = true;
			            data.msgClass = 'item';
			            initMessage(data);
			            $scope.msgList = [data];
			            $scope.showMessageList = false;
		            }
	            }

	            function initMessage(message){
		            fetchReceiver(message, $cookies.userId);
//				        data.streamContent = dynamicImgSrcFactory(data.streamContent);
		            message.p_streamContentSce = $sce.trustAsHtml(message.streamContent);

		            if(message.annexation && message.annexation.indexOf('C') != -1){
			            initVoteInfo(message);
		            }else if(message.annexation && message.annexation.indexOf('B') != -1){
			            initScheduleInfo(message);
		            }else if(message.annexation && message.annexation.indexOf('E') != -1){
			            initLotteryInfo(message);
		            }

		            message.showEditBtn = $cookies.userId == message.createBy;

		            if(message.unreader == 1){
		                messageRESTFactory.setRead({id : message.id});
		            }
	            }

            }]);
// Source: source/controller/message/messageListController.js
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

// Source: source/controller/message/pubMessageController.js
angular.module('vsController')
	.controller('pubMessageController',
		['$scope', '$location', 'userRESTFactory', 'messageRESTFactory', 'alertBoxFactory', '$cookies','$filter','questionRESTFactory','blogRESTFactory','confirmBoxFactory',
			function ($scope, $location, userRESTFactory, messageRESTFactory, alertBoxFactory, $cookies,$filter,questionRESTFactory,blogRESTFactory,confirmBoxFactory) {
				var voteUploadConfig = {
					swf: 'image/uploadify.swf',
					fileObjName: 'fileUpload',
					uploader: '../upload/stream;jsessionid=' + $cookies.sid,
					multi: false,
					fileTypeDesc : '请选择图片文件',
					fileTypeExts : '*.jpg;*.png;*.jpeg;*.bmp;*.gif;',
					fileSizeLimit : '5MB',
					buttonClass: 'btn btn-default',
					width: 80,
					height: 34,
					buttonText: '附加图片',
					onUploadSuccess: function (file, data, response,attr) {
						data = JSON.parse(data);
						var voteOptionIndex = attr.id.replace('voteUpload-','');
						$scope.vote.voteOptionList[voteOptionIndex].imageUrl = data.filePath.replace(/^\/[^\/]+/,'');
						$scope.vote.voteOptionList[voteOptionIndex].imageUri = $scope.sysPath + data.filePath;
						$scope.$digest();
					}
				}

				var lotteryUploadConfig = {
					swf: 'image/uploadify.swf',
					fileObjName: 'fileUpload',
					uploader: '../upload/stream;jsessionid=' + $cookies.sid,
					multi: false,
					fileTypeDesc : '请选择图片文件',
					fileTypeExts : '*.jpg;*.png;*.jpeg;*.bmp;*.gif;',
					fileSizeLimit : '5MB',
					buttonClass: 'btn btn-default',
					width: 80,
					height: 34,
					buttonText: '附加图片',
					onUploadSuccess: function (file, data, response,attr) {
						data = JSON.parse(data);
						var lotteryOptionIndex = attr.id.replace('lotteryUpload-','');
						$scope.lottery.lotteryOptionList[lotteryOptionIndex].imageUrl = data.filePath.replace(/^\/[^\/]+/,'');
						$scope.lottery.lotteryOptionList[lotteryOptionIndex].imageUri = $scope.sysPath + data.filePath;
						$scope.$digest();
					}
				}

				$scope.sendEmail = $scope.editMessage = $scope.isSubmit = $scope.sendSubmit = $scope.draftSubmit = false;

				$scope.vote = {
					voteType : 1,
					voteOptionList : []
				};
				$scope.addVoteOption = addVoteOption;
				addVoteOption();
				addVoteOption();

				$scope.schedule = {date : new Date(),time : new Date()};

				$scope.lottery = {
					ed : new Date(),
					lotteryOptionList : []
				}
				$scope.addLotteryOption = addLotteryOption;
				addLotteryOption();
				addLotteryOption();

				$scope.annexation = '';

				$scope.$$postDigestQueue.push(function(){
					setTimeout(function(){
						$scope.$apply(function(){
							$scope.newMessage.isHidden  = true;
						});
					},0);
				});

				//如果是传递id则认为是草稿或消息的编辑操作，然后根据id加载信息并在页面上显示这些信息
				var loadId = null,message_title_id = null,sendAllPeople = false;
				var message_id = $location.search().id;
				var message_pid = $location.search().pid;
				var message_rid = $location.search().rid;
				if(message_id && message_id !== true){
					loadId = message_id;
				}else if(message_pid && message_pid !== true){
					loadId = message_pid;
				}else if(message_rid && message_rid !== true){
					loadId = message_rid;
				}

				$scope.titleName = '发消息';
				if (loadId) {
					messageRESTFactory.get({id: loadId}, function (data) {
						if (data.code && data.code != 10000) {
							alertBoxFactory('加载信息失败!', {width: 240, textAlign: 'center'});
						} else {
							if (message_id && message_id !== true) {
								$scope.annexationDisabled = true;
								if (data.streamType == 'M') {
//									initMessage(data);
									alertBoxFactory('该消息已发布不能修改!', {width: 300, textAlign: 'center'});
									return;
								} else if (data.streamType == 'D') {
									initDraft(data);
								}
							} else if (message_rid && message_rid !== true) {
								initReply(data);
							} else if (message_pid && message_pid !== true) {
								initForward(data);
							}
						}
					}, function () {
						alertBoxFactory('网络异常!', {width: 240, textAlign: 'center'});
					});
				} else if($location.search().qid !== true && $location.search().qid){
					questionRESTFactory.get({id : $location.search().qid},function(data){
						if (data.code && data.code != 10000) {
							alertBoxFactory('加载信息失败!', {width: 240, textAlign: 'center'});
						} else {
							$scope.content = '^' + data.questionContent;
						}
					},function(){
						alertBoxFactory('网络异常!', {width: 240, textAlign: 'center'});
					});
				} else if($location.search().bid !== true && $location.search().bid) {
					blogRESTFactory.get({blogId : $location.search().bid},function(data){
						if (data.code && data.code != 10000) {
							alertBoxFactory('加载信息失败!', {width: 240, textAlign: 'center'});
						} else {
							$scope.content = '^' + data.streamContent;
						}
					},function(){
						alertBoxFactory('网络异常!', {width: 240, textAlign: 'center'});
					});
				} else if($location.search().touid !== true && $location.search().touid){
					var uid = $location.search().touid;
					var uname = $location.search().touname;
					var uemail = $location.search().touemail;

					$scope.p_toReceivers = [{
						id : 0,
						receiverId : uid,
						receiverName : uname,
						receiverType : 'U',
						ccType : 'T',
//						name : uname + (uemail ? '<' + uemail + '>' : ''),
						name : uname,
						email : uemail,
						selected : true
					}];
					$scope.content = '^';
				}else if($location.search().totid !== true && $location.search().totid){
					var tid = $location.search().totid;
					var tname = $location.search().totname;
					var temail = $location.search().totemail;

					$scope.p_toReceivers = [{
						id : 0,
						receiverId : tid,
						receiverName : tname,
						receiverType : 'S',
						ccType : 'T',
//						name : tname + (temail ? '<' + temail + '>' : ''),
						name : tname,
						email : temail,
						selected : true
					}];
					$scope.content = '^';
				}else if($location.search().photo !== true && $location.search().photo){
					var photoid = $location.search().photoid;
					var photo = $location.search().photo;
					var imgHtml = '<img src="'+ photo +'" style="max-width:100%;" data-img-id="'+ photoid +'">';
					$scope.content = '^' + imgHtml;
					$scope.imgList = $scope.imgList || [];
					$scope.imgList.push({id : photoid,name : 'photo',maxUrl : photo});
				}else if($location.search().type && $location.search().type !== true){
					var typeObj = {voting : '发投票',agenda : '发邀请',lottery: '发奖品'};
					var type = $location.search().type;

					$scope.titleName = typeObj[type];
					$scope.hideAnnexationSwitchBtn = true;
					$scope.annexation = type;
					$scope.content = '^';
				}else{
					$scope.hideAnnexationPanel = true;
					$scope.content = '^';
				}
				//根据关键字查询系统中存在的用户或群组信息
				var searchTimeout;
				$scope.searchReceiver = function (key, mark) {
					if(searchTimeout){
						clearTimeout(searchTimeout);
					}

					searchTimeout = setTimeout(searchReceiverFn(key,mark),500);
				}

				$scope.subForm = function (type) {
					var subFormObj = initSubFormObj();
					subFormObj.streamType = type == 'message' ? 'M' : 'D';

					if(!formValid(subFormObj,type)) return;

					$scope.isSubmit = true;
					$scope.sendSubmit = type == 'message';
					$scope.draftSubmit = type != 'message';
					messageRESTFactory.publish(subFormObj, function (data) {
						$scope.isSubmit = $scope.sendSubmit = $scope.draftSubmit = false;
						if (data && data.code && data.code != 10000) {
							alertBoxFactory(data.msg, {width: 300, textAlign: 'center'});
						} else {
							var successWord = type == 'message' ? '发送成功!' : '暂存成功!';
							alertBoxFactory(successWord, {type: 'success', textAlign: 'center', waitTime: 2, width: 200});
							setTimeout(function () {
								$scope.$apply(function () {
									$location.search({});
									$location.path('/messages');
								});
							}, 2000);
						}
					}, function () {
						$scope.isSubmit = $scope.sendSubmit = $scope.draftSubmit = false;
						alertBoxFactory('网络异常!', {width: 200, textAlign: 'center'});
					});
				}

				$scope.$watch('sendEmail', function (newVal, oldVal) {
					if (oldVal === true && newVal === false) {
						removeCustomReceiverInput($scope.p_toReceivers);
						removeCustomReceiverInput($scope.p_ccReceivers);
						removeCustomReceiverInput($scope.p_bcReceivers);
					}
				});

				function addVoteOption() {
					$scope.vote.voteOptionList.push({
						content : '',
						uploadConfig : _.clone(voteUploadConfig)
					});
				}

				function addLotteryOption() {
					$scope.lottery.lotteryOptionList.push({
						content : '',
						numberPeople : 1,
						uploadConfig : _.clone(lotteryUploadConfig)
					});
				}

				function searchReceiverFn(key, mark){
					return function(){
						userRESTFactory.findUserOrTeamByNameAndEmail({condition : key}, function (data) {
							var selectedList = fetchReceiverForSelect($scope[mark + 'Receivers']);
							for (var i = 0; i < data.length; i++) {
								if (data[i].id == $cookies.userId) {
									continue;
								}

								if(data[i].userType == 'U'){
									data[i].style = 'background-image:none;background-color:lightgoldenrodyellow';
								}else if(data[i].userType == 'S'){
									data[i].style = 'background-image:none;background-color:lightblue';
								}

//							data[i].name = data[i].email ? data[i].userName + '<' + data[i].email + '>' : data[i].userName;
								data[i].name = data[i].userName;
								selectedList.push(data[i]);
							}
							$scope[mark + 'Receivers'] = selectedList;
						});
					}
				}

				function formValid(subFormObj,type){
					var receiverCount = 0;
					receiverCount += fetchReceiver($scope.p_toReceivers, subFormObj.streamReadShipList, 'T', subFormObj);
					receiverCount += fetchReceiver($scope.p_ccReceivers, subFormObj.streamReadShipList, 'C', subFormObj);
					receiverCount += fetchReceiver($scope.p_bcReceivers, subFormObj.streamReadShipList, 'B', subFormObj);

					if($scope.newMessageForm.subject.$error.maxlength){
						alertBoxFactory('标题长度不能超过100个字符!', {width: 350, textAlign: 'center'});
						return false;
					}
					if (!$scope.subject || $scope.subject.length <= 0) {
						alertBoxFactory('标题不能为空!', {width: 240, textAlign: 'center'});
						return false;
					}
					if (!$scope.content || $scope.content.length <= 0) {
						alertBoxFactory('内容不能为空!', {width: 240, textAlign: 'center'});
						return false;
					}

					if($scope.annexation == 'voting'){
						for(var i = 0;i < $scope.vote.voteOptionList.length;i++){
						 	var voteOption = $scope.vote.voteOptionList[i];
							if(voteOption.content.length <= 0 && !voteOption.imageUrl){
								alertBoxFactory('投票项内容和图片不能同时为空!', {width: 400, textAlign: 'center'});
								return false;
							}
							delete voteOption.selected;
							delete voteOption.downloadImageUri;
							delete voteOption.uploadConfig;
							delete voteOption.imageUri;
						}
						subFormObj.vote = $scope.vote;
					}else if($scope.annexation == 'agenda'){
						subFormObj.schedule = {
							place : $scope.schedule.place
						};
						subFormObj.schedule.startTimeFmt = $filter('date')($scope.schedule.date,'yyyy-MM-dd')
							+ ' ' + $filter('date')($scope.schedule.time,'HH:mm:ss');
					}else if($scope.annexation == 'lottery'){
						$scope.lottery.endDate = $filter('date')($scope.lottery.ed,'yyyy-MM-dd');
						for(var i = 0;i < $scope.lottery.lotteryOptionList.length;i++){
							var lotteryOption = $scope.lottery.lotteryOptionList[i];
							if(lotteryOption.content.length <= 0){
								alertBoxFactory('奖项名称不能为空!', {width: 300, textAlign: 'center'});
								return false;
							}
							if(!lotteryOption.numberPeople){
								alertBoxFactory('请正确填写获奖名额!', {width: 300, textAlign: 'center'});
								return false;
							}
							delete lotteryOption.uploadConfig;
							delete lotteryOption.imageUri;
						}
						subFormObj.lottery = _.clone($scope.lottery);
						delete subFormObj.lottery.ed;
					}

					//非编辑操作需要收件人，标题，内容
					if (type == 'message') {
						if (receiverCount <= 0 && !sendAllPeople) {
//							alertBoxFactory('收件人不能为空!', {width: 240, textAlign: 'center'});
							confirmBoxFactory('如果收件人为空，则默认发送给所有人，您确定要这样做吗?',{
								width : 390,
								okFn : function(){
									sendAllPeople = true;
									$scope.subForm(type);
								}
							});
							return;
						}
					}

					return true;
				}

				function initSubFormObj(){
					var obj = {
						titleName: $scope.subject,
						streamContent: $scope.content,
						streamComefrom: 0,
						allReceiverMails: '',
						allCcReceiverMails: '',
						allBccReceiverMails: '',
						attaList: $scope.fileList,
						imgList: $scope.imgList,
						streamReadShipList: [],
						sendAllPeople : sendAllPeople ? 1 : 0
					};

					if(message_id && message_id !== true){
						obj.id = message_id;
					}else if(message_pid && message_pid !== true){
						obj.parentId = message_pid;
					}else if(message_rid && message_rid !== true){
						obj.returnId = message_rid;
						obj.titleId = message_title_id;
					}

					return obj;
				}

				function removeCustomReceiverInput(receivers) {
					for (var i = 0; i < receivers.length; i++) {
						if (!receivers[i].id) {
							receivers.splice(i, 1);
							i--;
						}
					}
				}

				function fetchReceiver(receivers, container, type, subFormObj) {
					var count = 0;
					for (var i = 0; i < receivers.length; i++) {
						var receiver = receivers[i];
						if (receiver.selected) {
							count++;
							var isSysUser = angular.isNumber(receiver.id);

							if (isSysUser) {
								var r = {
									receiverId: receiver.receiverId ? receiver.receiverId : receiver.id,
									receiverName: receiver.receiverName ? receiver.receiverName : receiver.userName,
									receiverType: receiver.receiverType ? receiver.receiverType : receiver.userType,
									ccType: receiver.ccType ? receiver.ccType : type
								};
								container.push(r);
							}

							if ($scope.sendEmail) {
								if(isSysUser && !receiver.email) continue;

								if (type == 'T') {
									subFormObj.allReceiverMails += (isSysUser ? (receiver.email ? receiver.email : '') : receiver.name) + ';';
								} else if (type == 'C') {
									subFormObj.allCcReceiverMails += (isSysUser ? (receiver.email ? receiver.email : '') : receiver.name) + ';';
								} else if (type == 'B') {
									subFormObj.allBccReceiverMails += (isSysUser ? (receiver.email ? receiver.email : '') : receiver.name) + ';';
								}
							}
						}
					}
					return count;
				}

				function initMessage(msg) {
					initReceiver(msg);
					initFile(msg);
					$scope.editMessage = true;
					$scope.receiverRead = true;
					$scope.subject = msg.titleName;
					$scope.content = '^' + msg.streamContent;
				}

				function initDraft(msg) {
					initReceiver(msg);
					initFile(msg);
					$scope.subject = msg.titleName;
					$scope.content = '^' + msg.streamContent;
					initVote(msg);
					initSchedule(msg);
				}

				function initVote(msg){
					if(msg && msg.vote){
						$scope.vote = msg.vote;
						var voteOptionList = msg.vote.voteOptionList;
						for(var i = 0;i < voteOptionList.length;i++){
							voteOptionList[i].uploadConfig = _.clone(voteUploadConfig);
						}
						$scope.annexation = 'voting';
					}
				}

				function initSchedule(msg){
					if(msg && msg.schedule){
						$scope.schedule = {
							id : msg.schedule.id,
							place : msg.schedule.place,
							date : new Date(msg.schedule.startTimestamp),
							time : new Date(msg.schedule.startTimestamp)
						}
						$scope.annexation = 'agenda';
					}
				}

				function initReply(msg) {
					message_title_id = msg.titleId;
					initReceiver(msg);
					$scope.p_bcReceivers.length = 0;
					if ($location.search().allReply != 'true') {
						$scope.p_ccReceivers.length = 0;
						$scope.p_toReceivers.length = 0;
					}
					$scope.p_toReceivers.push({
						id : 0,
						ccType: 'T',
//						name: msg.userNickname + (msg.createByEmail ? '<' + msg.createByEmail + '>' : ''),
						name : msg.userNickname,
						receiverName: msg.userNickname,
						receiverEmail: msg.createByEmail,
						receiverId: msg.createBy,
						receiverType: 'U',
						selected: true
					});
					$scope.subject = 'Re:' + msg.titleName;
					$scope.content = '^^<br><br><br><hr>' + initOriginalStreamContent(msg);
					if(msg.annexation && msg.annexation.indexOf('C') != -1){
						initContentForVote(msg);
					}else if(msg.annexation && msg.annexation.indexOf('B') != -1){
						initContentForSchedule(msg);
					}
				}

				function initForward(msg) {
					initFile(msg);
					$scope.subject = 'Fw:' + msg.titleName;
					$scope.content = '^^<br><br><br><hr>' + initOriginalStreamContent(msg);
					if(msg.annexation && msg.annexation.indexOf('C') != -1){
						initContentForVote(msg);
					}else if(msg.annexation && msg.annexation.indexOf('B') != -1){
						initContentForSchedule(msg);
					}
				}

                function initOriginalStreamContent(msg){
                    var header = '';
                    header += '<br>发件人:' + msg.createByName;
                    header += '<br>收件人:';

                    for(var i = 0;i < msg.streamReadShipList.length;i++){
                        var readShip = msg.streamReadShipList[i];
                        if(readShip.ccType == 'T'){
                            header += readShip.receiverName + (readShip.receiverType == 'S' ? '-群组' : '') + (readShip.receiverEmail ? '<' + readShip.receiverEmail + '>' : '') + '&nbsp;&nbsp;';
                        }
                    }

                    header += '<br>抄送:';

                    for(var i = 0;i < msg.streamReadShipList.length;i++){
                        var readShip = msg.streamReadShipList[i];
                        if(readShip.ccType == 'C'){
                            header += readShip.receiverName + (readShip.receiverType == 'S' ? '-群组' : '') + (readShip.receiverEmail ? '<' + readShip.receiverEmail + '>' : '') + '&nbsp;&nbsp;';
                        }
                    }

                    header += '<br>发送日期:' + msg.createDate;

                    header += '<br>标题:' + msg.titleName;

                    return header + '<br><br>' + msg.streamContent;
                }

				function initContentForVote(msg){
					var voteTotal = msg.vote.voteTotal;
					var voteContent = '<br><br><span style="font-size:16px;font-weight: bold;">投票信息:</span>';

					var voteOptionList = msg.vote.voteOptionList;
					var appLocation = $location.absUrl().substring(0,$location.absUrl().indexOf('public'));
					for(var i = 0;i < voteOptionList.length;i++){
						var voteOption = voteOptionList[i];
						var votePercent = parseInt((voteOption.count / voteTotal) * 1000) / 10;
						voteContent += '<br>&nbsp;'+ (i + 1) + '.&nbsp;' + voteOption.content;
						if(voteOption.downloadImageUri){
							voteContent += '<br><img src="'+ appLocation + voteOption.downloadImageUri +'" style="height:120px">';
						}
						voteContent += '<br>投票详情:' + ((voteOption.voter && voteOption.voter.length > 0) ? voteOption.voter : '') +
							'&nbsp;&nbsp;('+ (voteOption.count > 0 ? voteOption : 0) + '&nbsp;票&nbsp;/&nbsp;' +
							 + (votePercent > 0 ? votePercent : 0) + '%)';
					}

					voteContent += '<br>总投票数:&nbsp;' + (voteTotal > 0 ? voteTotal : 0);

					$scope.content += voteContent;
				}

				function initContentForSchedule(msg){
					var schedule = msg.schedule;
					var scheduleUserList = schedule.scheduleUserList ? schedule.scheduleUserList : [];
					var scheduleContent = '<br><br><span style="font-size:16px;font-weight: bold;">邀请信息:</span>';

					scheduleContent += '<br>开始时间:&nbsp;' + schedule.startTime ;
					scheduleContent += '<br>地点:&nbsp;' + (schedule.place ? schedule.place : '未知');

					var maybeList = [],attendList = [],absentList = [];
					for(var i = 0;i < scheduleUserList.length;i++){
						var user = scheduleUserList[i];
						if(user.reply == 1){
							attendList.push(user);
						}else if(user.reply == 2){
							absentList.push(user);
						}else if(user.reply == 3){
							maybeList.push(user);
						}
					}

					scheduleContent += '<br>确认参加:&nbsp;&nbsp;';
					for(var i = 0;i < attendList.length;i++){
						scheduleContent += attendList[i].userName + ' ';
					}

					scheduleContent += '<br>不能参加:&nbsp;&nbsp;';
					for(var i = 0;i < absentList.length;i++){
						scheduleContent += absentList[i].userName + ' ';
					}

					scheduleContent += '<br>暂时待定:&nbsp;&nbsp;';
					for(var i = 0;i < maybeList.length;i++){
						scheduleContent += maybeList[i].userName + ' ';
					}

					$scope.content += scheduleContent;
				}

				function initFile(msg) {
					$scope.fileList = [];
					if (angular.isArray(msg.attaList)) {
						for (var i = 0; i < msg.attaList.length; i++) {
							$scope.fileList.push({
								id: msg.attaList[i].id,
								resourceName: msg.attaList[i].resourceName
							});
						}
					}
					$scope.imgList = [];
					if (angular.isArray(msg.imgList)) {
						for (var i = 0; i < msg.imgList.length; i++) {
							$scope.imgList.push[{
								id: msg.imgList[i].id
							}];
						}
					}
				}

				function initReceiver(msg) {
					var p_toReceivers = [];
					var p_bcReceivers = [];
					var p_ccReceivers = [];

					if (msg.streamReadShipList && angular.isArray(msg.streamReadShipList)) {
						for (var i = 0; i < msg.streamReadShipList.length; i++) {
							var receiver = msg.streamReadShipList[i];
							if (receiver.receiverId == $cookies.userId) {
								continue;
							}
							receiver.selected = true;
//							receiver.name = receiver.receiverName + (receiver.receiverEmail ? '<' + receiver.receiverEmail + '>' : '');
							receiver.name = receiver.receiverName;
							if (receiver.ccType.toUpperCase() == 'T') {
								p_toReceivers.push(receiver);
							} else if (receiver.ccType.toUpperCase() == 'B') {
								p_bcReceivers.push(receiver);
							} else if (receiver.ccType.toUpperCase() == 'C') {
								p_ccReceivers.push(receiver);
							}
						}
					}

					fetchCustomReceiver(msg.allReceiverMails, p_toReceivers);
					fetchCustomReceiver(msg.allCcReceiverMails, p_ccReceivers);
					fetchCustomReceiver(msg.allBccReceiverMails, p_bcReceivers);

					$scope.p_toReceivers = p_toReceivers;
					$scope.p_bcReceivers = p_bcReceivers;
					$scope.p_ccReceivers = p_ccReceivers;
				}

				function fetchCustomReceiver(emailStr, receivers) {
					if(!angular.isString(emailStr) || emailStr.length <= 0){
						return;
					}

					var emailStrArr = emailStr.split(';');
					for (var i = 0; i < emailStrArr.length; i++) {
						if (emailStrArr[i].length <= 0) {
							return;
						}

						var isExists = false;

						for(var i = 0;i < receivers.length;i++){
							var receiver = receivers[i];
							if(angular.isNumber(receiver.id) && receiver.email == emailStrArr[i]){
								isExists = true;
								break;
							}
						}

						if(!isExists){
							receivers.push({
								selected: true,
								name: emailStrArr[i]
							});
						}
					}

				}

				function fetchReceiverForSelect(list) {
					var result = [];
					if (list && list.length) {
						for (var i = 0; i < list.length; i++) {
							if (list[i].selected) {
								result.push(list[i]);
							}
						}
					}
					return result;
				}

			}]);

// Source: source/controller/notificationController.js
'use strict';

angular.module('vsController')

.controller('notificationController', ['$scope', 'remindRESTFactory', function($scope, remindRESTFactory){
	
	$scope.getAllRemindCount = function(){
		remindRESTFactory.allRemindCount({}, function(data){
			$scope.totalRemindCount = data.allRemindCount;
		});
	}
	
	$scope.getAllRemindCount();
	
}]);
// Source: source/controller/questionController.js
'use strict';
angular.module('vsController').controller('questionController',['$scope','questionRESTFactory','alertBoxFactory','$location',
                                                                function($scope,questionRESTFactory,alertBoxFactory,$location){
	
	//-----------------------------新增或者编辑
	$scope.richTextConfig = {
			file : false
	};
	$scope.submited = false;
	$scope.questionId = null;//获取questionId
	if($location.absUrl().indexOf("/update") > 0){
		$scope.questionId  = $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	}
	 //提交
	$scope.questionSub = function(type){
		$scope.submited = true;
		if($scope.newQuestionForm.$valid){
			if($scope.questionId){
				questionRESTFactory.update({
					id : $scope.questionId,
					titleName : $scope.questionTitle,
					questionContent : $scope.questionContent,
					questionComefrom:'0',
					isDraft:type
				},function(data){
					showInfo(data,type);
				});
			}else{
				questionRESTFactory.create({
					titleName : $scope.questionTitle,
					questionContent : $scope.questionContent,
					questionComefrom:'0',
					isDraft:type
					},function(data){
						showInfo(data,type);
					},function(data){
						alertBoxFactory('发布问答失败',{textAlign : 'center',width: 300,waitTime:1});
				});
			}
			
		}
	};
	function showInfo(data,type){
		if(data.questionId){
			if(type == 1){
				alertBoxFactory('草稿保存成功',{textAlign : 'center',width: 300,waitTime:1});
				$scope.questionId = data.questionId;
			}else{
				alertBoxFactory('发表成功',{textAlign : 'center',width: 200,waitTime:1});
				$scope.questionId = null;
				$location.path('questions');
			}
		}else if(data.msg){
			alertBoxFactory(data.msg,{textAlign : 'center',width: 300,waitTime:1});
		}else{
			alertBoxFactory('发表失败',{textAlign : 'center',width: 200,waitTime:1});
		}
	}
	
	//进行获取单个问答的详细信息
		function getQuestionById(){
			//如果$scope.questionId 不为空的话，问答可进行编辑
			if($scope.questionId!=null){
				questionRESTFactory.get({
					"id" : $scope.questionId
				},function(data){
					$scope.questionTitle = data.titleName;
					$scope.questionContent = '^'+data.questionContent;
				});
			}else{
				$scope.questionContent = '^';
			}
		}
		getQuestionById();
	
}]);

// Source: source/controller/questionDetailController.js
'use strict';
angular.module('vsController').controller('questionDetailController',['$scope','questionRESTFactory','alertBoxFactory',
                                                                  '$location','$sce','userRESTFactory',"answerRESTFactory",'$cookies','utilService','storeService',
                                                                function($scope,questionRESTFactory,alertBoxFactory,$location,$sce,userRESTFactory,answerRESTFactory,$cookies,utilService,storeService){
		$scope.richTextConfig = {
			file : false
		};
		$scope.currUser = $cookies.userId;//记录是否是当前用户
		$scope.questionId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);//获取问答的id
		//用来判断赞的处理是否完成
		$scope.clickMentionValue = false;
		//加载问答详情
		function getQuestionById(){
			if($scope.questionId == null){
				return ;
			}
			questionRESTFactory.get({
				"id" : $scope.questionId
			},function(data){
				if(!data.titleName){
					alertBoxFactory('问答已不存在',{textAlign : 'center',width: 300,waitTime:1});
					$location.path('questions');
					
					return ;
				}
				$scope.questionTitle = data.titleName;
				$scope.questionContent =  $sce.trustAsHtml(data.questionContent);
				$scope.questionPraiseCount = data.praiseCount;
				$scope.questionCreateDate = data.createDate;
				$scope.mentionId = data.mentionId ==null ? false : true;
				$scope.isOwner = data.createBy == $scope.currUser ? 1 : 0;
				$scope.createBy = data.createBy;
				$scope.hasStore = data.hasStore;
				$scope.mentions = utilService.getMentions(data.mentionList);
				loadAnswer($scope.questionId);
				loadUser($scope.createBy);
			});
			
		};
		$scope.solution = true;
		//单个问答的回答列表
		function loadAnswer(questionId){
			answerRESTFactory.answers({
				"questionId" : questionId
			},function(data){
				$scope.solution = $scope.isOwner == 1 ? true : false;
				$scope.answerLength = data.length;
				for(var i=0;i<data.length;i++){
					var answer = data[i];
					if(answer.isSolution == 1){
						$scope.solution = false;
						data.splice(i,1);
						data.unshift(answer);
					}
				}
				$scope.answers = data;
			});
			
		};
		$scope.solutionQuestion = function(answerId){
			answerRESTFactory.solutionQuestion({
				"answerId" : answerId
			},function(data){
				if(data.code == "10000"){
					alertBoxFactory('标记为已解决问答',{textAlign : 'center',width: 300,waitTime:1});
					$scope.solution = false;
					for(var i = 0 ; i < $scope.answers.length ; i++){
						var answer = $scope.answers[i];
						if($scope.answers[i].id == answerId){
							$scope.answers[i].isSolution = true;
							$scope.answers.splice(i,1);
							$scope.answers.unshift(answer);
						}
					}
				}else{
					alertBoxFactory('标记问答失败',{textAlign : 'center',width: 300,waitTime:1});
				}
			});
		};
		//进行加载作者信息
		function loadUser(userId){
			userRESTFactory.get({
				"userId":userId
				
			},function(data){
				$scope.createName = data.userNickname;
				$scope.createImg = data.userImgUrl;
				$scope.createTitle = data.title;
				
			});
			
		};
		//热门问答加载
		function loadHotQuestion(){
			questionRESTFactory.hotList({
				"pageInfo":{
					"pageNumber":1,
					"pageSize":5
				}
			},function (data){
				var lengthNum = data.content.length;
				for(var i=0;i<lengthNum;i++){
					if(data.content[i].id == $scope.questionId){
						lengthNum = lengthNum-1;
						data.content.splice(i,1);
					}
				}
				$scope.hotQuestionLength = lengthNum;
				$scope.hotQuestions = data.content;
				
			});
		};
		getQuestionById();
		loadHotQuestion();
	//---------------------------------------------------------------------
		$scope.store = function(){
			storeService.store(2,$scope.questionId,$scope.hasStore,function(){
				if($scope.hasStore==0){
					$scope.hasStore = 1;
					alertBoxFactory('收藏成功',{textAlign : 'center',width: 300,waitTime:2});
				}else{
					$scope.hasStore = 0;
					alertBoxFactory('取消收藏成功',{textAlign : 'center',width: 300,waitTime:2});
				}
			});
		};
		
		//进行点赞问答
		$scope.clickMention = function(){
			$scope.clickMentionValue = true;
			questionRESTFactory.questionMention({
				"id" : $scope.questionId
			},function(data){
				if(data.id!=null){
					alertBoxFactory('点赞成功',{textAlign : 'center',width: 300,waitTime:1});
					$scope.questionPraiseCount = $scope.questionPraiseCount+1;
					$scope.mentionId = true;
				}else{
					alertBoxFactory('取消赞。',{textAlign : 'center',width: 300,waitTime:1});
					$scope.questionPraiseCount = $scope.questionPraiseCount-1;
					$scope.mentionId = false;
				}
				$scope.clickMentionValue = false;
			});
		};
		
		//进行点赞回答
		$scope.clickMentionAnswer = function(answerId){
			answerRESTFactory.metionAnswer({
				"id" : answerId
			},function(data){
				if(data.id!=null){
					alertBoxFactory('点赞回答成功',{textAlign : 'center',width: 300,waitTime:1});
					for(var i = 0 ; i < $scope.answers.length ; i++){
						if($scope.answers[i].id == answerId){
							$scope.answers[i].mentionId = 1;
							$scope.answers[i].praiseCount = $scope.answers[i].praiseCount+1;
						}
					}
				}else{
					alertBoxFactory('取消回答赞。',{textAlign : 'center',width: 300,waitTime:1});
					for(var i = 0 ; i < $scope.answers.length ; i++){
						if($scope.answers[i].id == answerId){
							$scope.answers[i].mentionId = null;
							$scope.answers[i].praiseCount = $scope.answers[i].praiseCount-1;
						}
					}
				}
			});
		};
		
		//进行编辑
		$scope.editQuestion = function(){
			$location.path('questions/update/'+$scope.questionId);
		};
		
		//进行删除问答
		$scope.deleteQuestion = function(){
			questionRESTFactory.deleteQ({
				"id" : $scope.questionId
			},function(data){
				if(data.code == "10000"){
					alertBoxFactory('删除问答成功',{textAlign : 'center',width: 200,waitTime:1});
					$scope.questionId = null;
					$location.path('questions');
				}else{
					alertBoxFactory('删除问答失败',{textAlign : 'center',width: 300,waitTime:1});
				}
			});
		};
		
		//---------------------------------------------追加回答的操作，父级赋值
		
		$scope.answerParentId; 
		$scope.showAnswerForm = function(answer){
			for(var i = 0 ; i < $scope.answers.length ; i++){
				if($scope.answers[i] != answer){
					$scope.answers[i].subFormShow = false;
				}
			}
			if(!answer.subFormShow){
				$scope.answerParentId = answer.id;
			}
			answer.subFormShow = !answer.subFormShow;
		};
		$scope.answerContent1 = '^';
		$scope.answerHtml2 = '^';
		//添加回答操作
		$scope.answerSub = function(type,html){
			if(!html){
				return;
			}
			//直接回答
			if(type == 1){
				answerRESTFactory.create({
					"questionId":$scope.questionId,
					"answerHtml":html
				},function(data){
					if(data.id){
						$scope.answers.push(data);
						$scope.answerContent1_value = '';
						$scope.answerLength = $scope.answerLength + 1;
						alertBoxFactory('回答成功',{textAlign : 'center',width: 200,waitTime:1});
					}else{
						alertBoxFactory('回答失败',{textAlign : 'center',width: 200,waitTime:1});
					}
				});
			}else{
				//进行追加回答，传值父级的id
				answerRESTFactory.create({
					"questionId":$scope.questionId,
					"parentId":$scope.answerParentId,
					"answerHtml":html
				},function(data){
					if(data.id){
						for(var i = 0 ; i < $scope.answers.length ; i++){
							$scope.answers[i].subFormShow = false;
						}
						$scope.answers.push(data);
						$scope.answerHtml2_value = '';
						$scope.answerLength = $scope.answerLength + 1;
						alertBoxFactory('回答成功',{textAlign : 'center',width: 200,waitTime:1});
					}else{
						alertBoxFactory('回答失败',{textAlign : 'center',width: 200,waitTime:1});
					}
				});
			}
		};
		
		//删除回答
		$scope.deleteAnswer = function(config,attr){
			answerRESTFactory.deleteAnswer({
				"id":attr.answerid
			},function(data){
				if(data.code = "10000"){
					alertBoxFactory('删除回答成功',{textAlign : 'center',width: 300,waitTime:1});
					for(var i =0 ;i <$scope.answers.length; i++){
						if($scope.answers[i].id == attr.answerid){
							if($scope.answers[i].isSolution==1){
								$scope.solution = true;//删除已解决的回答，进行显示”解决问答“
							}
							$scope.answers.splice(i,1);
							break;
						}
					}
					$scope.answerLength = $scope.answerLength - 1;
				}else{
					alertBoxFactory('删除回答失败',{textAlign : 'center',width: 300,waitTime:1});
				}
			});
		};
		


		$scope.searchReceiver = function (key) {
			userRESTFactory.findUserByNameAndEmail({searchKey : key},function(data){
	            var selectedList = getSelect($scope.newToList);
	            for (var i = 0; i < data.length; i++) {
	            	if (data[i].id != $cookies.userId) {
						data[i].name = data[i].userName;
						selectedList.push(data[i]);
					}
	            }
	            $scope.newToList = selectedList;
	        });
	    };
	    function getSelect(list) {
	    	var result = [];
			if (list && list.length) {
				for (var i = 0; i < list.length; i++) {
					if (list[i].selected) {
						result.push(list[i]);
					}
				}
			}
			return result;
	    };
	    
		//邀请人作答
		$scope.askQuestion = function(users){
			var users = "";
			var list = $scope.newToList;
			if(list.length <= 0){
				alertBoxFactory('请邀请人作答',{textAlign : 'center',width: 300,waitTime:1});
				return ;
			}else{
				//把对象拼接成字符串
				for(var i=0;i<list.length;i++){
					if(i==list.length-1){
						users += list[i].id;
					}else{
						users += list[i].id+",";
					}
				}
				questionRESTFactory.askQuestion({
					"id":$scope.questionId,
					"askUsers":users
				},function(data){
					if(data.code == "10000"){
						$scope.newToList = [] ;
						alertBoxFactory('邀请作答成功',{textAlign : 'center',width: 300,waitTime:1});
					}else{
						alertBoxFactory('邀请作答问答失败',{textAlign : 'center',width: 300,waitTime:1});
					}
				});
			}
		};
		
		
		
}]);

// Source: source/controller/questionsController.js
'use strict';
//------------------------------草稿列表或者发表问答的列表
angular.module('vsController').controller('questionsController',['$scope','questionRESTFactory','alertBoxFactory','userRESTFactory','$location','$cookies',
                                                                function($scope,questionRESTFactory,alertBoxFactory,userRESTFactory,$location,$cookies){
	$scope.currUser = $cookies.userId;//记录是否是当前用户
	$scope.title = $location.search().type ? $location.search().type : "最新问题";
	//进行判断是发表的问答还是草稿的列表	
	var questionType = "0";
    if($location.absUrl().indexOf("/drafts") > 0){
    	questionType = "1";
    }
	//------------------------
	$scope.questionList =[];
	$scope.questionShow = true;
	$scope.currentPage = $location.search().pageNumber ? $location.search().pageNumber : 1;//默认显示页码
	$scope.itemsPerPage = 10;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	$scope.hotQuestionShow = true;
	$scope.myQuestionShow = true;
   
	$scope.getQuestions = function(currentPage){
		if($scope.title == "最新问题"){
			questionRESTFactory.list({
				"isDraft" : questionType,
				"pageInfo":{
					"pageNumber":currentPage,
					"pageSize":$scope.itemsPerPage
				}
			},function(data){
				$scope.questionList=[];
				$scope.totalItems = data.totalElements;
			    $scope.questionList = data.content;
			    $location.search("pageNumber",currentPage);
			    $location.search("type","最新问题");
			    $scope.currentPage = currentPage;
		    });
		}else if($scope.title == "最热问题"){
			questionRESTFactory.hotList({
				"pageInfo":{
					"pageNumber":currentPage,
					"pageSize":$scope.itemsPerPage
				}
			},function (data){
				$scope.questionList = data.content;
				$scope.totalItems = data.totalElements;
				$location.search("pageNumber",currentPage);
				$location.search("type","最热问题");
				$scope.currentPage = currentPage;
			});
		}else if($scope.title == "我的问答"){
			questionRESTFactory.list({
				"isDraft" : questionType,
				"createBy":$scope.currUser,
				"pageInfo":{
					"pageNumber":currentPage,
					"pageSize":$scope.itemsPerPage
				}
			},function(data){
				$scope.questionList = data.content;
				$scope.totalItems = data.totalElements;
				$location.search("pageNumber",currentPage);
				$location.search("type","我的问答");
				$scope.currentPage = currentPage;
		    });
		}else{
			questionRESTFactory.unAnswerList({
				"pageInfo":{
					"pageNumber":currentPage,
					"pageSize":$scope.itemsPerPage
				}
			},function (data){
				$scope.questionList = data.content;
				$scope.totalItems = data.totalElements;
				$location.search("pageNumber",currentPage);
				$location.search("type","未答问题");
				$scope.currentPage = currentPage;
			});
		}
	};
	
	  $scope.clickHotMenu = function(){
		$scope.title = "最热问题";
		$scope.getQuestions(1);
	};
	  $scope.clickNewMenu = function (){
		$scope.title = "最新问题";
		$scope.getQuestions(1);
	};
	$scope.clickUnMenu = function (){
		$scope.title = "未答问题";
		$scope.getQuestions(1);
	};
	$scope.clickMyMenu = function (){
		$scope.title = "我的问答";
		$scope.getQuestions(1);
	};
	
	//热门问答加载
	function loadHotQuestion(){
		questionRESTFactory.hotList({
			"pageInfo":{
				"pageNumber":1,
				"pageSize":5
			}
		},function (data){
			if(data.content.length<=0){
				$scope.hotQuestionShow = false;
			}
			$scope.hotQuestions = data.content;
			
		});
	};
	
	//我的问答加载
	function MyQuestion(){
		questionRESTFactory.list({
			"isDraft" : questionType,
			"createBy":$scope.currUser,
			"pageInfo":{
				"pageNumber":1,
				"pageSize":5
			}
		},function(data){
			if(data.content.length<=0){
				$scope.myQuestionShow = false;
			}
		    $scope.myQuestions = data.content;
	    });
	};
	
	//第一次加载列表
	$scope.getQuestions($scope.currentPage);
	loadHotQuestion();
	MyQuestion();
	
	
}]);

// Source: source/controller/remindController.js
'use strict';

angular.module('vsController')

.controller('remindController', ['$scope', 'remindRESTFactory', '$cookies','$location','$rootScope', 'alertBoxFactory', '$state', function($scope, remindRESTFactory, $cookies,$location,$rootScope,alertBoxFactory, $state){
	
//	$scope.getAllRemindCount = function(){
//		remindRESTFactory.allRemindCount({}, function(data){
//			$scope.totalRemindCount = data.allRemindCount;
//		});
//	}
//	
//	$scope.getAllRemindCount();
	
	var requestFlag = 0;
	
//	window.setInterval(function(){
//		$scope.getAllRemind();
//	}, 60000);
	
	
	
	$scope.myRemindCount = 0;//我的提醒数量
	$scope.teamRemindCount = 0;//群组提醒数量
	
	$scope.getAllRemind = function(){
		remindRESTFactory.allRemindCount({}, function(data){
			$scope.allRemind = data;
			$scope.myRemindCount = data.MYSELF;
			$scope.teamRemindCount = data.TEAM;
			$rootScope.totalRemindCount = parseInt(data.allRemindCount);
		}, function(error){
			console.log(error);
		});
	};
	
	$scope.getAllRemind();
	
	$scope.currPage = 1;
	
	var defaultPageSize = 10;
	
	$scope.isNotEnd = true;
	
	$scope.currRemindType = 1;
	
	$scope.showPage = true;
	
	$scope.changeTag = function(type){
		$scope.currPage = 1;
		if(type==1){
			$scope.currRemindType = 1;
			$scope.getMyselfRemind();
		}else if(type == 2){
			$scope.currRemindType = 2;
			$scope.getTeamRemind();
		}
		$scope.isNotEnd = true;
	}
	
	$scope.getMyselfRemind = function(){
		remindRESTFactory.myselfRemind({
			"page": $scope.currPage,
			"pageSize":defaultPageSize
		}, function(data){
			$scope.remindList = data.content;
			
			if($scope.currPage == 1 && data.content.length < 10){
				$scope.showPage = false;
			}else{
				$scope.showPage = true;
			}
			processPageEnd(data.totalElements);
		});
	}
	
	function processPageEnd(total){
		if($scope.remindList == undefined 
				|| $scope.remindList.length < 10
				|| $scope.remindList.length == 0){
			$scope.isNotEnd = false;
		}
		var currTotalVal = ($scope.currPage - 1) * defaultPageSize + $scope.remindList.length;
		if(currTotalVal == total){
			$scope.isNotEnd = false;
		}else{
			$scope.isNotEnd = true;
		}
	}
	
	$scope.getMyselfRemind();
	
	$scope.getTeamRemind = function(){
		remindRESTFactory.teamRemind({
			"page": $scope.currPage,
			"pageSize":"10"
		}, function(data){
			$scope.remindList = data.content;
			
			if($scope.currPage == 1 && data.content.length < 10){
				$scope.showPage = false;
			}else{
				$scope.showPage = true;
			}
			
			processPageEnd(data.totalElements);
		});
	}

	$scope.showDetail = function(id, url, msgStatus){
		
		var currCount = 0;
		if($scope.currRemindType == 1){
			currCount = $scope.myRemindCount;
		}else if($scope.currRemindType == 2){
			currCount = $scope.teamRemindCount;
		}
		
		var finalUrl = url.replace(/^#/,'');
		
		if(currCount > 0){
			remindRESTFactory.setOneRemindHasReaded({
				"id" : id
			}, function(data){
				if(data.code == '10000') {
					if(msgStatus == 1){
						$rootScope.totalRemindCount -- ;
					}
//					$state.go(finalUrl, {}, {reload : true});
					$location.url(finalUrl);
				}
			});
		}else{
			$location.url(finalUrl);
//			$state.go(finalUrl, {}, {reload : true});
		}
	}
	
	$scope.nextPage = function(){
		$scope.currPage ++ ;
		if($scope.currRemindType == 1){
			$scope.getMyselfRemind();
		}else if($scope.currRemindType == 2){
			$scope.getTeamRemind();
		}
	}
	
	$scope.previewPage = function(){
		$scope.currPage -- ;
		if($scope.currRemindType == 1){
			$scope.getMyselfRemind();
		}else if($scope.currRemindType == 2){
			$scope.getTeamRemind();
		}
		$scope.isNotEnd = true;
	}
	
	$scope.setRemindHasReaded = function(){
		remindRESTFactory.setOneTypeMessageWasReaded({
			"type" : $scope.currRemindType
		}, function(data){
			if(data.code == '10000') {
				alertBoxFactory('设置成功!',{textAlign : 'center',width: 200});
				if($scope.currRemindType == 1){
					$rootScope.totalRemindCount = $rootScope.totalRemindCount - $scope.myRemindCount;
					$scope.myRemindCount = 0;
					$scope.getMyselfRemind();
				}else if($scope.currRemindType == 2) {
					$rootScope.totalRemindCount = $rootScope.totalRemindCount - $scope.teamRemindCount;
					$scope.teamRemindCount = 0;
					$scope.getTeamRemind();
				}
			}
		});
	}
	
}]);
// Source: source/controller/searchController.js
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

// Source: source/controller/searchHeaderController.js
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

	
// Source: source/controller/sinaController.js
'use strict';

angular.module('vsController').controller('sinaController', 
			['$scope', 'sinaRESTFactory', 'alertBoxFactory', 'blogRESTFactory', 
			 function($scope, sinaRESTFactory, alertBoxFactory, blogRESTFactory){
	
	$scope.pageNum = 1;
	
	function initSinaList(){
		sinaRESTFactory.sinaList({
			'pageNum' : $scope.pageNum
		}, function(data){
			$scope.blogArray = data.streamList;
			$scope.optionSelectedValue = data.sinaType;
		});
	}
	//首次加载
	initSinaList();
	
	//下一页
	$scope.nextPage = function(){
		$scope.pageNum ++ ;
		initSinaList();
	}
	
	//上一页
	$scope.previewPage = function(){
		if($scope.pageNum != 1){
			$scope.pageNum --;
		}
		initSinaList();
	}
	
	//切换类型
	$scope.sinaType='';
	$scope.changeSinaType = function(){
		console.log($scope.sinaType);
		sinaRESTFactory.changeSinaType({'type' : $scope.sinaType}, function(data){
			if(data.code == '10000'){
				$scope.pageNum = 1;
				initSinaList();
			}
		});
	}
	
	$scope.shareBlogFlag = false;
	
	$scope.shareSina = function(blog){
		$scope.shareBlogFlag = true;
		if(blog.originalPic == null || blog.originalPic == ''){
			shareBlog(blog, []);
		}else{
			sinaRESTFactory.processSinaBlogImg({
				"originalPic": blog.originalPic
			}, function(data){
				if(data.id != undefined){
					var imageIdList = new Array({"id" : data.id});
					shareBlog(blog, imageIdList);
				}
			});
		}
		$scope.shareBlogFlag = false;
//		blogRESTFactory.create({
//			"titleName":blog.titleName,
//			"streamContent":blog.streamContent,
//			"streamComefrom":7,
//			"isDraft":0,
//			"imgList":[]
//		}, function(data){
//			if(data.blogId != undefined && data.blogId > 0){
//				alertBoxFactory('分享成功!',{textAlign : 'center',width: 300});
//			}
//		});
		
	}
	
	function shareBlog(blog, imageList){
		blogRESTFactory.create({
			"titleName":blog.titleName,
			"streamContent":blog.content,
			"streamComefrom":7,
			"isDraft":0,
			"imgList":imageList
		}, function(data){
			if(data.blogId != undefined && data.blogId > 0){
				alertBoxFactory('分享成功!',{textAlign : 'center',width: 300});
			}
		});
	}
	
	$scope.unbind = function(){
		window.location.href='../mobile/sina/unbind';
	}
}]);
// Source: source/controller/storeController.js
'use strict';
angular.module('vsController').controller('storeController',['$scope','storeRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory','$state',
                                                                function($scope,storeRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory,$state){

	$scope.currNav = $location.search().type;
	$scope.page = $location.search().page ?  $location.search().page : 1;
	$scope.itemsPerpage = 10 ;

	$scope.load = function(type,page){
		if(type=='blog'){
			storeRESTFactory.blogs({
				"pageInfo":{
					"pageNumber":page,
					"pageSize":$scope.itemsPerpage
				}
			},function(data){
				$scope.totalItems = data.totalElements;
				$scope.blogArray = data.content;
				$scope.currentPage = page;
			});
		}else{
			storeRESTFactory.questions({
				"pageInfo":{
					"pageNumber":page,
					"pageSize":$scope.itemsPerpage
				}
			},function(data){
				$scope.totalItems = data.totalElements;
				$scope.questionList = data.content;
				$scope.currentPage = page;
			});
		}
	};
	$scope.load($scope.currNav,$scope.page);
	$scope.switchNav = function (nav) {
		$state.go('store',{
			type : nav,
			page : 1
		});
	};
	
	$scope.paging = function(){
		$state.go('store',{
			type : $scope.currNav,
			page : $scope.currentPage
		});
	};
	
	
}]);
// Source: source/controller/teamControler.js
'use strict';
angular.module('vsController').controller('teamListController',['$scope','teamRESTFactory','alertBoxFactory','$location','$cookies',
                                                                function($scope,teamRESTFactory,alertBoxFactory,$location,$cookies){
		
		// all 查询全部群组 my 查询我的群组
		$scope.queryType = "all";
		$scope.currUser = $cookies.userId;
		$scope.currentPage = 1;
		$scope.pageSize = 15;
		$scope.teamSearchName = "";
		$scope.loadAllTeam = function(currentPage,search){
			if(search){
				if($scope.teamSearchName==""){
					 return false;
				}
				teamRESTFactory.list({
					  "pageInfo":{
						    "pageNumber":currentPage,
						    "pageSize":$scope.pageSize
						  },
						  "userList":null,
						  "userVoList":null,
						  "teamName" : $scope.teamSearchName
				},function(data){
					$scope.pushData(data);
				});
			}else if($scope.queryType == "all"){
				$scope.teamSearchName = "";
				$scope.queryType = "all" ;
				teamRESTFactory.allTeams({
					  "pageInfo":{
						    "pageNumber":currentPage,
						    "pageSize":$scope.pageSize
						  },
						  "userList":null,
						  "userVoList":null,
						  "teamName" : $scope.teamSearchName == "" ? null : $scope.teamSearchName
				},function(data){
					$scope.pushData(data);
				});
			
			}else{
				$scope.teamSearchName = "";
				teamRESTFactory.myTeams({
					"pageInfo":{
					    "pageNumber":currentPage,
					    "pageSize":$scope.pageSize
					  }
				},function(data){
					$scope.pushData(data);
				});
			}
			
		};
		$scope.pushData = function(data){
			$scope.totalItems = data.totalElements,
			$scope.teams = data.content;
		};
		$scope.loadAllTeam($scope.currentPage);
		$scope.changeType = function(type){
			$scope.queryType = type;
			$scope.currentPage = 1;
			$scope.loadAllTeam($scope.currentPage);
		};
		$scope.joinTeam = function(team){
			teamRESTFactory.addMember({
				"userId" : $cookies.userId,
				"teamId" : team.id
			},function(data){
				if(data.code == "10000"){
					team.isTeamMember = 1;
					alertBoxFactory('加入成功',{textAlign : 'center',width: 200});
				}else{
					alertBoxFactory('加入失败',{textAlign : 'center',width: 200});
				}
			});
		};
		
		$scope.quitTeam = function(team){
			
			teamRESTFactory.deleteMember({
				"userId" : $cookies.userId,
				"teamId" : team.id
			},function(data){
				if(data.code == "10000"){
					team.isTeamMember=0;
					alertBoxFactory('退出成功',{textAlign : 'center',width: 200});
				}else{
					alertBoxFactory('退出失败',{textAlign : 'center',width: 200});
				}
				
			});
		};
		
		$scope.todetail = function(team){
			if(team.isTeamMember==0 && team.isOpen == 0){
				alertBoxFactory('你无权限查询该群组',{textAlign : 'center',width: 400});
			}else if(team.createId == $scope.currUser){
				$location.path('groups/update/'+team.id);
			}else{
				$location.path('groups/show/'+team.id);
			}
		};
		
		$scope.toUpdate = function(team){
			$location.path('groups/update/'+team.id);
		};
			
}]);
angular.module('vsController').controller('teamDetailController',['$scope','teamRESTFactory','alertBoxFactory','$location','$cookies',
                                                                function($scope,teamRESTFactory,alertBoxFactory,$location,$cookies){
	$scope.teamId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	$scope.loadTeamInfo = function(){
		teamRESTFactory.queryTeamMembers({
			"id" : $scope.teamId
		},function(data){
			if(data.code == "10000"){
				$scope.loadTeamDetail();
				$scope.userList = data.userList;
			}else{
				alertBoxFactory('非法查询',{textAlign : 'center',width: 200});
				$location.path('groups');
			}
		});
	 	
		
	};
	$scope.loadTeamDetail = function(){
		teamRESTFactory.get({
			"id" : $scope.teamId 
		},function(data){
			if(data.code == "10000"){
				$scope.team = data.teamVo;
			}else{
				alertBoxFactory('加载群组信息失败',{textAlign : 'center',width: 400});
			}
		});
	};
	$scope.loadTeamInfo();
	
}]);

angular.module('vsController').controller('teamUpdateController',['$scope','teamRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory',
                                                                function($scope,teamRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory){
	
	
	$scope.teamId =  $location.absUrl().substring($location.absUrl().lastIndexOf("/")+1);
	$scope.dataObj = {selectUsers : []};
  	$scope.submited = false;
  	$scope.checkName = false;
	$scope.loadTeamInfo = function(){
		teamRESTFactory.queryTeamMembers({
			"id" : $scope.teamId
		},function(data){
			if(data.code == "10000"){
				$scope.loadTeamDetail();
				var teamMemberIdArr = [];
				for(var i= 0;i <data.userList.length;i++ ){
					teamMemberIdArr.push({"id" : data.userList[i].id,"userName":data.userList[i].aliasName});
				}
				$scope.dataObj.selectUsers = teamMemberIdArr;
			}else{
				alertBoxFactory('非法查询',{textAlign : 'center',width: 200});
				$location.path('groups');
			}
		});
	 	
		
	};
	//加载群组信息
	$scope.loadTeamDetail = function(){
		teamRESTFactory.get({
			"id" : $scope.teamId 
		},function(data){
			if(data.code == "10000"){
				if(data.teamVo.createId!=$cookies.userId){
					alertBoxFactory('非法访问',{textAlign : 'center',width: 400});
					$location.path('groups');
					return;
				}
				$scope.team = data.teamVo;
				$scope.oldTeamName = data.teamVo.teamName;
			}else{
				alertBoxFactory('加载群组信息失败',{textAlign : 'center',width: 400});
			}
		});
	};
	$scope.loadTeamInfo();
  	$scope.loadAllUser = function(){
  		userRESTFactory.list({},function(data){
  			$scope.dataObj.allUsers = data;
  		});
  	};
  	$scope.loadFollow = function(){
  		userRESTFactory.getAttentionList({},function(data){
  			$scope.dataObj.followusers = data;
  			$scope.dataObj.users = data;
  		});
  	};
  	$scope.loadFollow();
  	$scope.loadAllUser();
	//修改群组信息
	$scope.updateTeamInfo = function(){
		$scope.submited = true;
		if($scope.newTeamForm.$valid){
  			teamRESTFactory.checkTeamName({
  				"newName":$scope.team.teamName,
  				"oldName":$scope.oldTeamName
  			},function(data){
  				if(data.code == "10000"){
  					$scope.submitInfo();
  				}else{
  					$scope.checkName= true;
  				}
  			});
  		}
	};
	
	$scope.submitInfo = function(){

		var arr =[];
		for(var i =0 ;i <$scope.dataObj.selectUsers.length;i++){
  			arr.push({id : $scope.dataObj.selectUsers[i].id});
  		}
		if($scope.custCreator && $scope.custCreator.id){
			$scope.team.createId = $scope.custCreator.id;
		}
		teamRESTFactory.update({
			"id" :$scope.team.id,
			"createId":$scope.team.createId,
			"teamName" :$scope.team.teamName,
			"isOpen" :$scope.team.isOpen,
			"isWrite" :$scope.team.isWrite,
			"userList":arr
		},function(data){
			if(data.code == "10000"){
				alertBoxFactory('修改成功',{textAlign : 'center',width: 200});
				$location.path('groups');
			}else{
				alertBoxFactory('修改失败',{textAlign : 'center',width: 200});
			}
		});
	
	};
  	$scope.changeCheckNameBeTrue = function(){
  		$scope.checkName = false;
  	};
  	$scope.changeIsOpen = function(value){
  		$scope.team.isOpen = value;
  	};
	$scope.searchReceiver = function(key,mark){
		var selectedList = getSelect($scope[mark + 'List']);
		for(var i = 0 ;i<$scope.dataObj.users.length;i++){
			var user = $scope.dataObj.users[i];
			if(user.userName.indexOf(key)!=-1){
				selectedList.push({id:user.id,name:user.userName});
			}
		}
		$scope[mark + 'List'] = selectedList;
		$scope.$digest();
	};
	function getSelect(list) {
        var result = [];
        if (list && list.length) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].selected) {
                    result.push(list[i]);
                }
            }
        }
        return result;
    };
    $scope.dismiss = function(config,attr){
    	
    	teamRESTFactory.deleteTeam({
    		"id":$scope.team.id
    	},function(data){
    		if(data.code =="10000"){
    			alertBoxFactory('解散成功',{textAlign : 'center',width: 200});
  				$location.path('groups');
    		}else{
    			alertBoxFactory('解散失败',{textAlign : 'center',width: 200});
  			
    		}
    	});
    };
    $scope.add = function(user){
  		var mark = false;
  		var selectUser = $scope.dataObj.selectUsers;
  		for(var i =0 ;i < selectUser.length; i++){
  			if(selectUser[i].id == user.id){
  				mark = true;
  			}
  		}
  		if(!mark){
  			$scope.dataObj.selectUsers.push(user);
  		}
  		console.log(user.id);
  	};
  	
  	$scope.deleteUser = function(user,index){
  		$scope.dataObj.selectUsers.splice(index,1);
  	};
  	
  	$scope.discribe = "我关注的用户";
  	$scope.searchAllUser = function(){
		
  		if(!$scope.searchUser){
  			$scope.dataObj.users = $scope.dataObj.followusers;
  			$scope.discribe = "我关注的用户";
  		}else{
  			$scope.discribe = "搜索到的用户";
  			$scope.dataObj.users =[];
  			for(var i =0 ; i< $scope.dataObj.allUsers.length;i++){
  				if($scope.dataObj.allUsers[i].userName.indexOf($scope.searchUser)!=-1){
  					$scope.dataObj.users.push($scope.dataObj.allUsers[i]);
  				}
  			}
  			
  		}
  	};
}]);

angular.module('vsController').controller('teamNewController',['$scope','teamRESTFactory','alertBoxFactory','$location','$cookies','userRESTFactory',
                                                                  function($scope,teamRESTFactory,alertBoxFactory,$location,$cookies,userRESTFactory){
	$scope.dataObj = {selectUsers : []};
	var arr =[];
	
  	$scope.loadAllUser = function(){
  		userRESTFactory.list({},function(data){
  			$scope.dataObj.allUsers = data;
  		});
  	};
  	$scope.loadFollow = function(){
  		userRESTFactory.getAttentionList({},function(data){
  			$scope.dataObj.followusers = data;
  			$scope.dataObj.users = data;
  		});
  	};
  	$scope.team = {};
  	$scope.team.isOpen=0;
  	$scope.team.isWrite = 0;
  	$scope.loadAllUser();
  	$scope.loadFollow();
  	$scope.submited = false;
  	$scope.checkName = false;
  	$scope.newTeamInfo = function(){
  		$scope.submited = true;
  		if($scope.newTeamForm.$valid){
  			teamRESTFactory.checkTeamName({
  				"newName":$scope.team.teamName,
  				"oldName":""
  			},function(data){
  				if(data.code == "10000"){
  					$scope.submitInfo();
  				}else{
  					$scope.checkName= true;
  				}
  			});
  		}
  	};
  	$scope.changeCheckNameBeTrue = function(){
  		$scope.checkName = false;
  	};
  	$scope.changeIsOpen = function(value){
  		$scope.team.isOpen = value;
  	};
  	
  	$scope.submitInfo = function(){

			for(var i =0 ;i <$scope.dataObj.selectUsers.length;i++){
	  			arr.push({id : $scope.dataObj.selectUsers[i].id});
	  		}
	  		teamRESTFactory.create({
	  			"teamName" :$scope.team.teamName,
	  			"isOpen" :$scope.team.isOpen,
	  			"isWrite" :$scope.team.isWrite,
	  			"userList" : arr
	  		},function(data){
	  			if(data.code == "10000"){
	  				alertBoxFactory('创建成功',{textAlign : 'center',width: 200});
	  				$location.path('groups');
	  			}else{
	  				alertBoxFactory('创建失败',{textAlign : 'center',width: 200});
	  			}
	  		});
  	};
  	
  	$scope.add = function(user){
  		var mark = false;
  		var selectUser = $scope.dataObj.selectUsers;
  		for(var i =0 ;i < selectUser.length; i++){
  			if(selectUser[i].id == user.id){
  				mark = true;
  			}
  		}
  		if(!mark){
  			$scope.dataObj.selectUsers.push(user);
  		}
  		console.log(user.id);
  	};
  	
  	$scope.deleteUser = function(user,index){
  		$scope.dataObj.selectUsers.splice(index,1);
  	};
  	$scope.discribe = "我关注的用户";
  	$scope.searchAllUser = function(){
		
  		if(!$scope.searchUser){
  			$scope.dataObj.users = $scope.dataObj.followusers;
  			$scope.discribe = "我关注的用户";
  		}else{
  			$scope.discribe = "搜索到的用户";
  			$scope.dataObj.users =[];
  			for(var i =0 ; i< $scope.dataObj.allUsers.length;i++){
  				if($scope.dataObj.allUsers[i].userName.indexOf($scope.searchUser)!=-1){
  					$scope.dataObj.users.push($scope.dataObj.allUsers[i]);
  				}
  			}
  			
  		}
  	};
  }]);

// Source: source/controller/userEditController.js
'use strict';

angular.module('vsController').controller('userEditController', ['$scope', 'userRESTFactory', 'alertBoxFactory', '$state', '$filter', function($scope, userRESTFactory, alertBoxFactory, $state, $filter){
	
	$scope.user={
			userName:''
	};
	
	userRESTFactory.get({userId : 0}, function(data) {
		$scope.user=data;
		$scope.deptList=data.deptList;
	});
	
	$scope.infoBtnDisabled = false;
	$scope.pwdBtnDisabled = false;
	
	$scope.subMark = false;
	$scope.userSub = function(){
		$scope.subMark = true;
		if($scope.userUpdateForm.$valid && $scope.userValidFlag){
			$scope.infoBtnDisabled = true;
			var birthday = '';
			if($scope.user.birthdayFormat != undefined && $scope.user.birthdayFormat != ''){
				birthday = $filter('date')($scope.user.birthdayFormat,'yyyy-MM-dd');
			}
			
			userRESTFactory.updateUser({
				"id" : $scope.user.id,
				"signature" : $scope.user.signature,
				"qq" : $scope.user.qq,
				"phoneNumber" : $scope.user.phoneNumber,
				"gender" : $scope.user.gender,
				"birthday" : birthday,
				"userName" : $scope.user.userName,
				"title" : $scope.user.title,
				"email" : $scope.user.email,
				"address" : $scope.user.address,
				"viewPhone" : $scope.user.viewPhone,
				"departmentId" : $scope.user.departmentId,
				"trueName" : $scope.user.trueName
			}, function(data){
				if(data.code == '10000'){
					$state.go('me_uid', {uid : 0}, {reload : true});
//					window.location.href="#/me/0";
				}
			});
		}
	}
	
	$scope.$watch('user.userName', function(){
		if($scope.user.userName.length < 2 || $scope.user.userName.length > 10){
			$scope.userUpdateForm.userName.$invalid=true;
			return;
		}
		
		userRESTFactory.validateUserName({
			"userName" : $scope.user.userName
		},function(data){
			if(data.result == 'false'){
				$scope.userValidFlag = false;
			}else{
				$scope.userValidFlag = true;
			}
		});
	});
	
	$scope.validPhone = function(){
		return {
			test : function(val){
				if(val == ''){
					return true;
				}
				var p1 = /^1((3\d)|(4[57])|(5[01256789])|(8\d))\d{8}$/;
				var result = p1.test(val);
				return result;
			}
		}
	}
	
	$scope.currTabType = '1';
	
	$scope.showEditUserInfoFn = function(){
		$scope.showEdit = true;
		$scope.showPwd = false;
		$scope.showBindEmail = false;
		$scope.currTabType = '1';
//		$scope.infoClass='active';
//		$scope.pwdClass='';
	}
	
	$scope.showUpdateUserPwdFn = function(){
		$scope.showEdit = false;
		$scope.showPwd = true;
		$scope.showBindEmail = false;
		$scope.currTabType = '2';
//		$scope.infoClass='';
//		$scope.pwdClass='active';
	}
	
	$scope.showBindMailFn = function(){
		$scope.showEdit = false;
		$scope.showPwd = false;
		$scope.showBindEmail = true;
		$scope.currTabType = '3';
		$scope.getEmailAccount();
	}
	
	$scope.showEditUserInfoFn();
	
	$scope.updateUserPwd = function(){
		if($scope.user.oldPwd == undefined
		|| $scope.user.newPwd == undefined
		|| $scope.user.repeatNewPwd == undefined
		|| $scope.user.oldPwd == ''
		|| $scope.user.newPwd == ''	
		|| $scope.user.repeatNewPwd == ''
		){
			alertBoxFactory('提交信息不完整!',{textAlign : 'center',width: 300});
			return;
		}
		
		if($scope.user.newPwd != $scope.user.repeatNewPwd){
			alertBoxFactory('2次密码不一致!',{textAlign : 'center',width: 300});
			return;
		}
		
		$scope.pwdBtnDisabled = true;
		
		userRESTFactory.updatePwd({
			"password" : $scope.user.oldPwd,
			"plainPassword" : $scope.user.newPwd,
			"id" : $scope.user.id
		}, function(data){
			if(data.code == '10000'){
				$state.go('me_uid', {uid : 0}, {reload : true});
//				window.location.href="#/me/0";
			}else{
				alertBoxFactory(data.msg,{textAlign : 'center',width: 350});
				$scope.pwdBtnDisabled = false;
			}
		});
	}
	
	$scope.mailValid = false;
	$scope.mailTestFlag = false;
	$scope.mailTestFn = function(){
		
		if(!validateMailInfo()){
			alertBoxFactory('请提交完整的邮箱资料!',{textAlign : 'center',width: 350});
			return;
		}
		
		$scope.mailTestFlag = true;
		userRESTFactory.connectTest({
			'id' : $scope.mailModel.id,
			'smtpHost' : $scope.mailModel.smtpHost,
			'smtpPort' : $scope.mailModel.smtpPort,
			'imapHost' : $scope.mailModel.imapHost,
			'imapPort' : $scope.mailModel.imapPort,
			'email' : $scope.mailModel.email,
			'password' : $scope.mailModel.password
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('验证成功!',{textAlign : 'center',width: 350});
				$scope.mailValid = true;
			}else{
				alertBoxFactory(data.msg,{textAlign : 'center',width: 350});
				$scope.mailTestFlag = false;
				$scope.mailValid = false;
			}
		});
	}
	
	$scope.mailSaveFlag = false;
	
	$scope.mailSaveFn = function(){
		
		if(!validateMailInfo()){
			alertBoxFactory('请提交完整的邮箱资料!',{textAlign : 'center',width: 350});
			return;
		}
		
		if(!$scope.mailValid){
			alertBoxFactory('请先验证邮箱服务!',{textAlign : 'center',width: 350});
			return;
		}
		$scope.mailSaveFlag = true;
		userRESTFactory.saveAccount({
			'id' : $scope.mailModel.id,
			'smtpHost' : $scope.mailModel.smtpHost,
			'smtpPort' : $scope.mailModel.smtpPort,
			'imapHost' : $scope.mailModel.imapHost,
			'imapPort' : $scope.mailModel.imapPort,
			'email' : $scope.mailModel.email,
			'password' : $scope.mailModel.password
		}, function(data) {
			if(data.code == '10000'){
				alertBoxFactory('保存成功!',{textAlign : 'center',width: 350});
				
				$state.go('users_edit', {}, {reload : true});
			}else{
				alertBoxFactory(data.msg,{textAlign : 'center',width: 350});
				$scope.mailSaveFlag = false;
			}
		});
	}
	
	function validateMailInfo(){
		if($scope.mailModel == undefined
		|| $scope.mailModel.smtpHost == ''
		|| $scope.mailModel.smtpPort == ''	
		|| $scope.mailModel.imapHost == ''	
		|| $scope.mailModel.imapPort == ''	
		|| $scope.mailModel.email == ''	
		|| $scope.mailModel.password == ''	
		){
			return false;
		}
		return true;
	}
	
	$scope.getEmailAccount = function(){
		userRESTFactory.getEmailAccount({}, function(data){
			$scope.mailModel = data;
		});
	}
	
}])
// Source: source/controller/userImgController.js
'use strict';

angular.module('vsController')

.controller('userImgController', ['$scope', 'userRESTFactory', 'alertBoxFactory', '$state', 
                                  function($scope, userRESTFactory, alertBoxFactory, $state){
	$scope.afterUpload = false;
	
	$scope.fileUpload = {
        swf: '../public/image/uploadify.swf',
        fileObjName: 'fileUpload',
        uploader: '../uploadUserImg',
        multi: false,
        fileTypeDesc : '请选择图片文件',
        fileTypeExts : '*.BMP;*.JPEG;*.JPG;*.GIF;*.PNG',
        fileSizeLimit : '1MB',
        buttonClass : 'btn btn-default',
        width : 100,
        height : 33,
        buttonText: '上传头像',
        onUploadSuccess: function (file, data, response) {
        	var imgArray = data.split(';');
        	$scope.userImg = '..'+imgArray[0];
        	$scope.userImage = imgArray[1];
        	var lastSlashIndex = $scope.userImg.lastIndexOf('.');
        	$scope.userHeadImgFileType = $scope.userImg.substring(lastSlashIndex +1);
        	$scope.afterUpload = true;
        	$scope.$digest();
        }
    }
	
	$scope.userImgOption = {};
	
	$scope.updateImageFlag = false;
	
	$scope.saveUserImg = function(){
		$scope.updateImageFlag = true;
		userRESTFactory.updateUserImg({
			'x' : $scope.userImgOption.x,
			'y' : $scope.userImgOption.y,
			'w' : $scope.userImgOption.w,
			'h' : $scope.userImgOption.h,
			'filePath' : $scope.userImg,
			'fileType' : $scope.userHeadImgFileType,
			'userImage' : $scope.userImage
		}, function(data){
			if(data.code=='10000') {
				alertBoxFactory('更新成功',{textAlign : 'center',width: 200});
				$state.go('me_uid', {uid : 0}, {reload : true});
//				window.location.href="#/me/0";
			}else{
				$scope.updateImageFlag = false;
			}
		});
	}
	
	
}]);
// Source: source/controller/userViewController.js
'use strict';

angular.module('vsController')

	.controller('userViewController', ['$scope', 'userRESTFactory','blogRESTFactory', 'questionRESTFactory','$cookies', '$location', 'relationshipRESTFactory', 'alertBoxFactory', '$state','$stateParams', 'sinaRESTFactory',
	                          function($scope, userRESTFactory, blogRESTFactory, questionRESTFactory, $cookies, $location, relationshipRESTFactory, alertBoxFactory, $state,$stateParams, sinaRESTFactory){
//	var urlPath = $location.$$absUrl;
//	var lastSlashIndex = urlPath.lastIndexOf("/");
	var uid = $stateParams.uid;
	
	$scope.sinaValid = false;
	$scope.editNickNameFlag = true;
	
//	questionRESTFactory.list({
//		"createBy":uid == 0? $cookies.userId : uid
//	}, function(data){
//		$scope.questionCount = data.totalElements;
//	});
	
	//用户个人资料
	userRESTFactory.get({userId: uid}, function(data) {
		$scope.user=data;
		var isCurrU = data.id == $cookies.userId;
		$scope.isCurrUser=isCurrU;
		if(!isCurrU){
			//非当前用户
			relationshipRESTFactory.findOnlyRelationship({
				"otherUserId" : uid
			}, function(data){
				if(data.id != undefined){
					$scope.hasAtt = true;
				}else{
					$scope.hasAtt = false;
				}
			})
		}
	});
	
	$scope.currentPage = 1;//默认显示页码
	$scope.itemsPerPage = 5;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	
	$scope.initUserBlog = function (currentPage){
		blogRESTFactory.initUserBlog({
			"createBy":uid == 0? $cookies.userId : uid,
			"isDraft" : 0,
			"pageInfo":{
			"pageNumber":currentPage,
			"pageSize":$scope.itemsPerPage
			}
		}, function(data){
			$scope.userBlog = data.content;
			$scope.totalItems = data.totalElements;
			$scope.currentPage = currentPage;
		});
	}
	
	//分享列表
	$scope.initUserBlog($scope.currentPage);
	
	$scope.currentQuestionPage = 1;//默认显示页码
	
	$scope.initQuetionList = function(currentPage){
		//问答列表
		questionRESTFactory.list({
			"createBy":uid == 0? $cookies.userId : uid,
			"pageInfo":{
			"pageNumber":currentPage,
			"pageSize": $scope.itemsPerPage
			}
		},function(data){
			$scope.userQuestions = data.content;
			$scope.questionTotalItems = data.totalElements;
			$scope.currentQuestionPage = currentPage;
		});
	}
	
	$scope.initQuetionList($scope.currentQuestionPage);
	
	
	//验证新浪
	sinaRESTFactory.validateSina({}, function(data){
		if(data.isBind == '1'){
			$scope.sinaValid = true;
		}
	});
	
	//跳转到用户编辑页面
	$scope.editUser=function(){
		$state.go('users_edit', {}, {reload : true});
//		window.location.href='#/users/edit';
	}
	
	//跳转到头像编辑页
	$scope.updateUserImg=function(){
		$state.go('updateUserImg', {}, {reload : true});
//		window.location.href='#/updateUserImg';
	}
	
	$scope.bindSina = function(){
//		$state.go('/mobile/sina/toBindPage', {}, {reload : true});
//		$location.url('/mobile/sina/toBindPage');
		window.location.href='../mobile/sina/toBindPage';
	}
	
	$scope.toSinaPage = function(){
		$state.go('sinaIndex', {}, {reload : true});
//		window.location.href="#/sinaIndex";
	}
	
	$scope.showAllBlog = function(){
		var params = {
			createBy : (uid == 0? $cookies.userId : uid),
			nav : "BLOG"
		}
		
		$state.go('search', params, {reload : true});
//		window.location.href="#/search?nav=BLOG&s=*&createBy=" + (uid == 0? $cookies.userId : uid);
	}
	
	$scope.showAllQuestion = function(){
		var params = {
			createBy : (uid == 0? $cookies.userId : uid),
			nav : "QUESTION"
		}
		$state.go('search', params, {reload : true});
//		window.location.href="#/search?nav=QUESTION&s=*&createBy=" + (uid == 0? $cookies.userId : uid);
	}
	
	$scope.viewRss = function(){
		$state.go('rssIndex', {}, {reload : true});
//		window.location.href="#/rssIndex";
	}
	
	$scope.sendMsg = function(){
		$location.url("/new?touid=" +$scope.user.id+ "&touname="+$scope.user.userName+"&touemail=" + $scope.user.email);
//		window.location.href="#/new?touid=" +$scope.user.id+ "&touname="+$scope.user.userName+"&touemail=" + $scope.user.email;
	}
	
	$scope.attention = function(otherUserId){
		relationshipRESTFactory.addRelation({
			"otherUserId" : otherUserId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('关注成功!',{textAlign : 'center',width: 200});
				$scope.hasAtt = true;
			}
		});
	}
	
	$scope.cancel = function(otherUserId) {
		relationshipRESTFactory.cancelRelation({
			"otherUserId" : otherUserId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('取消成功!',{textAlign : 'center',width: 200});
				$scope.hasAtt = false;
			}
		});
	}
	
	$scope.watchImageFolder = function(uid){
		$location.url("/pics/" + uid);
	}
	
	$scope.saveNickName = function(uid){
		
		if($scope.user.userNickname.trim() == ''){
			alertBoxFactory('昵称不能为空!',{textAlign : 'center',width: 200});
			return;
		}
		
		userRESTFactory.saveNickname({
			"nickid" : uid,
			"nickname" : $scope.user.userNickname
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('修改成功!',{textAlign : 'center',width: 200});
				$scope.editNickNameFlag = true;
			}
		});
	}
}])

;
// Source: source/controller/usersController.js
'use strict';

angular.module('vsController')

.controller('usersController', ['$scope', 'userRESTFactory', 'relationshipRESTFactory', 'alertBoxFactory', '$cookies', '$state','$stateParams', 
                                function($scope, userRESTFactory, relationshipRESTFactory, alertBoxFactory, $cookies, $state, $stateParams){
	
	$scope.currentPage = 1;//默认显示页码
	$scope.itemsPerPage = 10;//每页显示的条数
	$scope.maxSize = 10; //最大显示页码个数
	
	$scope.currUserId = $cookies.userId;
	
	$scope.showAllUser = true;
	$scope.showFollowUser = false;
	
	$scope.initListType = $stateParams.type;
	
	var currPage = $stateParams.page;
	
	$scope.searchUserVal='';
	
	$scope.initUserList = function (){
		$scope.tabType = 'my';
		$scope.showAllUser = true;
		$scope.showFollowUser = false;
		userRESTFactory.listByPage({ 
			"userName" : $scope.searchUserVal,
			"firstLetter" : $scope.searchUserVal, 
			"pageInfo":{
				"pageNumber": currPage,
				"pageSize":$scope.itemsPerPage
			 }	
		}, function(data){
			$scope.totalItems = data.totalElements;
			var list = data.content;
			processRelationship(list);
			$scope.userList = list;
			$scope.currentPage = currPage;
		})
	}
	
	function processRelationship(userlist){
		relationshipRESTFactory.get({}, function(data){
			
			var rList = data.relations;
			
			for(var j=0; j<userlist.length; j++){
				var user = userlist[j];
				for(var i=0; i<rList.length; i++){
					var robj = rList[i];
					if(user.id == robj.otherUserId){
						user.isAttention = true;
						break;
					}
				}
			}
		})
	}
	
	$scope.changeListType = function(type, page){
		$scope.searchUserVal = '';
		if(type == '0'){
			//关注列表
			$state.go('users', {"type" : 0, "page" : page}, {reload : true});
		}else if(type == '1'){
			//所有用户列表
			$state.go('users', {"type" : 1, "page" : page}, {reload : true});
		}else if(type == '2'){
			//积分用户列表
			$state.go('users', {"type" : 2, "page" : page}, {reload : true});
		}
	}
	
	
	$scope.goToPage = function(page) {
		$scope.changeListType(1, page);
	}
	
	$scope.attention = function(otherUserId){
		relationshipRESTFactory.addRelation({
			"otherUserId" : otherUserId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('关注成功!',{textAlign : 'center',width: 200});
				changeRelationship(otherUserId, true);
			}
		});
	}
	
	function changeRelationship(uid, flag){
		for(var i=0; i<$scope.userList.length; i++){
			var u = $scope.userList[i];
			if(u.id == uid) {
				u.isAttention = flag;
				break;
			}
		}
	}
	
	
	$scope.cancel = function(otherUserId) {
		relationshipRESTFactory.cancelRelation({
			"otherUserId" : otherUserId
		}, function(data){
			if(data.code == '10000'){
				alertBoxFactory('取消成功!',{textAlign : 'center',width: 200});
				if($scope.tabType == 'att') {
					$scope.initMyAttentionList();
				}else{
					changeRelationship(otherUserId, false);
				}
			}
		});
	}
	
	$scope.followCurrentPage = 1;//默认显示页码
	$scope.followItemsPerPage = 10;//每页显示的条数
	$scope.followMaxSize = 10; //最大显示页码个数
	
	$scope.initMyAttentionList = function(){
		$scope.tabType = 'att';
		$scope.showAllUser = false;
		$scope.showFollowUser = true;
		userRESTFactory.getAttentionListByPage({
			"userName" : $scope.searchUserVal,
			"pageInfo":{
				"pageNumber": currPage,
				"pageSize":$scope.followItemsPerPage
			 }	
		}, function(data){
			
			var ulist = data.content;
			$scope.folloTtotalItems = data.totalElements;
			for(var i=0; i<ulist.length; i++){
				var user = ulist[i];
				user.isAttention = true;
			}
			$scope.userList = ulist;
			$scope.followCurrentPage = currPage;
		});
	}
	
	$scope.goToFollowPage = function(currPage) {
		$scope.changeListType(0, currPage);
	}
	
	
	
	$scope.initUsersByIntegral = function(){
		$scope.tabType = 'integral';
		$scope.showAllUser = false;
		$scope.showFollowUser = false;
		userRESTFactory.findUsersByIntegral({}, function(data){
			var list = data;
			processRelationship(list);
			$scope.userList = list;
		})
	}
	
	function initTypeUserList(initListType) {
		if(initListType == 0){
			//关注列表
			$scope.initMyAttentionList();
		}else if(initListType == 1){
			//全部用户
			$scope.initUserList();
		}else if(initListType == 2){
			//积分排行
			$scope.initUsersByIntegral();
		}
	}
	
	$scope.searchUser = function(){
		currPage = 1;
		initTypeUserList($scope.initListType);
	}
	
	initTypeUserList($scope.initListType);
	
}]);

function updateUserImageController($scope, $modal) {

    $scope.open = function () {

        var modalInstance = $modal.open({
            templateUrl: 'updateUserImage.html',
            controller: ModalInstanceController
        });

    };
}

function ModalInstanceController($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

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
                window.location.href = '../index' ;
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