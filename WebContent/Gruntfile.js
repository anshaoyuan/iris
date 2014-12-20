var fs = require('fs'),
	_ = require('underscore');

var config = require('./iris.conf.json');
/*
if(fs.existsSync(__dirname + '/iris.conf.test.json')){
	config = require('./iris.conf.test.json');
}

if(fs.existsSync(__dirname + '/iris.conf.local.json')){
	config = require('./iris.conf.local.json');
}*/

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        config: config,

        jade: {
            compile: {
                expand: true,
                cwd: '<%= config.path.source %>',
                src: ['**/*.jade', '!**/_*.jade'],
                dest: '<%= config.path.public %>',
                ext: '.html',
                options: {
                    data: {
                        env: '<%= config.env %>',
                        sysPath: '<%= config.sysPath %>'
                    },
                    namespace: '<%= config.namespace %>'
                }
            }
        },

        sass: {
            options: {
                trace: true,
                lineNumbers: true,
                style: 'expanded',
                loadPath: '<%= config.vendor.bootstrap.load %>'
            },
            bootstrap: {
                src: '<%= config.vendor.bootstrap.sass %>',
                dest: '<%= config.path.public %>common/bootstrap.css'
            },
            iris: {
                expand: true,
                cwd: '<%= config.path.source %>',
                src: ['**/*.scss', '!**/_*.scss'],
                dest: '<%= config.path.public %>',
                ext: '.css'
            }
        },

        copy: {
            font: {
                expand: true,
                src: [
                    '<%= config.vendor.bootstrap.base %>fonts/bootstrap/*',
                    '<%= config.path.vendor %>font-awesome/font/*'
                ],
                dest: '<%= config.path.public %>common/font/',
                flatten: true
            },
            image: {
                expand: true,
                cwd: '<%= config.path.source %>/image',
                src: '**/*.{gif,jpeg,jpg,png,swf}',
                dest: '<%= config.path.public %>/image'
            },
            ie: {
                expand: true,
                cwd: '<%= config.path.source %>',
                src: '*.js',
                dest: '<%= config.path.public %>'
            }
        },

        concat: {
            options: {
                banner: '\'use strict\';\n',
                stripBanners: true
            },
            plugin_css: {
                options: { banner: '@charset "UTF-8";' },
                src: '<%= config.vendor.plugin_css %>',
                dest: '<%= config.path.public %>common/vendor.css'
            },
            plugin_js: {
                src: '<%= config.vendor.plugin_js %>',
                dest: '<%= config.path.public %>common/vendor.js'
            },
            angular: {
                src: '<%= config.vendor.angular %>',
                dest: '<%= config.path.public %>common/angular.js'
            },
            iris: {
                src: '<%= config.path.iris %>',
                dest: '<%= config.path.public %>iris.js',
                options: {
                    process: function (src, path) {
                        return '// Source: ' + path + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                }
            }
        },

        jsdoc: {
            doc: {
                src: ['<%= config.path.source %>'],
                dest: '<%= config.path.doc %>',
                options: { configure: "jsdoc.config.json" }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            view: {
                files: ['<%= config.path.source %>**/*.jade'],
                tasks: ['view']
            },
            image: {
                files: ['<%= config.path.source %>**/*.{gif,jpeg,jpg,png,swf}'],
                tasks: ['copy:image']
            },
            ie: {
                files: '<%= config.path.source %>/*.js',
                tasks: ['copy:ie']
            },
            style_bootstrap: {
                files: ['<%= config.vendor.bootstrap.base %>**/*.scss'],
                tasks: ['style:bootstrap']
            },
            style_plugin: {
                files: '<%= config.vendor.plugin_css %>',
                taskt: ['concat:plugin_css']
            },
            style_iris: {
                files: ['<%= config.path.source %>**/*.scss'],
                tasks: ['style:<%= config.name %>']
            },
            script_angular: {
                files: '<%= config.vendor.angular %>',
                tasks: ['concat:angular']
            },
            script_plugin: {
                files: '<%= config.vendor.plugin_js %>',
                tasks: ['concat:plugin_js']
            },
            script_iris: {
                files: '<%= config.path.iris %>',
                tasks: ['concat:iris']
            }
        },

        connect: {
            server: {
                options: {
                    port: 1234,
                    open: {
                        appName: '<%= config.browser %>'
                    },
                    livereload: true
                }
            },
            doc: {
                options: {
                    base: 'doc/',
                    port: 1235,
                    open: true,
                    keepalive: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    /**
          * 模版编译，通过传递 `env` 环境变量向模版传递不同的 `data`
          *
          * @global
          * @method grunt view
          * @param {string} env - 环境变量的名称
          * @default 'dev'
          * @example
          * // 开发环境，模版引未合并压缩的静态资源（默认）
          * grunt view
          *
          * // 发布环境，模版引经合并压缩的静态资源
          * grunt view:pub
          */
    grunt.registerTask('view', function (env) {
        if (env) {
            grunt.config.set('config.env', env);
            grunt.config.set('jade.compile.options.pretty', false);
        }
        grunt.config.set('jade.compile.options.pretty', true);
        grunt.task.run('jade:compile');
    });

    /**
          * 样式编译，env 决定是否压缩及文件后缀时间戳，task 指定子任务
          *
          * @global
          * @method grunt style
          * @param {string} task - 子任务的名称
          * @param {string} env - 环境变量的名称
          * @default 'dev'
          * @example
          * // 编译 Twitter Bootstrap，不压缩
          * grunt styel:bootstrap
          *
          * // 编译 Twitter Bootstrap，带压缩
          * grunt style:bootstrap:pub
          */
    grunt.registerTask('style', function (task, env) {
        var dest = grunt.template.process(
            '<%= config.path.public %>common/' + task + '.css'
        );
        if (env) {
            grunt.config.set('sass.' + task + '.dest', dest);
            grunt.config.set('sass.options.lineNumbers', false);
            grunt.config.set('sass.options.style', 'compressed');
        }
        grunt.task.run('sass:' + task);
    });

    /**
          * 本地 web 服务器，可以根据参数自动打开本地浏览器
     *
          * @global
     * @method grunt server
     * @param {string} browser
     * @default 'Google Chrome'
     * @example
     * // 默认使用 Google Chrome 启动
     * grunt server
     *
     * // 改用 Mozilla Firefox 启动
     * grunt server:firefox
          */
    grunt.registerTask('server', function (browser) {
        if (browser) {
            grunt.config.set('config.browser', browser);
        }
        grunt.task.run('connect:server');
    });

    grunt.registerTask('nolivereload', function () {
       grunt.config.set('watch.options.livereload', false);
        grunt.task.run('watch');
    });

    grunt.registerTask('routine', [
        'view',
        'style:bootstrap', 'concat:plugin_css', 'style:iris',
        'copy:font', 'copy:image', 'copy:ie',
        'concat:plugin_js', 'concat:angular', 'concat:iris'
    ]);

    grunt.registerTask('default', ['routine', 'nolivereload']);
    grunt.registerTask('run', ['routine', 'server', 'watch']);

    grunt.registerTask('build-product',function(env){
        var config = require('./iris.conf.json');
        grunt.config.set('concat.iris.src',config.path.iris);
        grunt.config.set('concat.iris.dest',config.path.public + 'build-temp/iris.js');
        grunt.task.run('concat:iris');
    });
    //CI 构建时使用
    grunt.registerTask('build',['routine','build-product']);
};
