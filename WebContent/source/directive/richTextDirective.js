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
