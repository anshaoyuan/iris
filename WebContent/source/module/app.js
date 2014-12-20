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
