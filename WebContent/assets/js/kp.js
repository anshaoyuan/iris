require([ 'config' ], function() {
	"use strict";
	
	require(['text!../tpl/kp.tpl', 'template', 'jquery', 'syntax', 'module/header', 'bootstrap'], function(raw) {
		kpList("/");
		
		function kpList(path) {
			var jsonData = {
				path: path
			};

			$.ajax({
				url : sysPath + '/mobile/kp/metaData',
				contentType : 'application/json',
				dataType:"json",
				type:"post",
				data :  JSON.stringify(jsonData),
				success : function(data) {
					 var datas = {
							wholePathList : data.wholePathList,
							metaList : data.metaList,
							dataFlag : data.hasData,
							baseUrl : sysPath
					}
					var render = template.compile(raw);
					var html = render(datas);
					$('#kpInfo').html(html);
					
					$('body').undelegate('.loadingkpMenu', 'click');
					$('body').delegate('.loadingkpMenu', 'click', function(){
						var wholeCurrentPath = $(this).parent().parent().data('wholecurrentpath');
						var fileName = $(this).parent().parent().data('filename');
						getShareFileUrl(wholeCurrentPath+'/'+fileName, $(this).next());
					});
					
					var alist=$('a',$('#kpInfo'));
					
					$.each(alist, function(i,val){ 
						var me=$(val);
						var css = me.attr("class");
						if(css!=undefined){
							var wholeCurrentPath = $(val).attr('data-wholeCurrentPath');
							if(me.hasClass('t_folder')){
								me.bind('click', function(){
									var currPath = wholeCurrentPath + '/' + me.html();
									kpList(currPath);
								});
							}else if(me.hasClass('t_index')){
								me.bind('click', function(){
									var currPath = $(this).attr('data-wholePath');
									kpList(currPath);
								});
							}else if(me.hasClass('file_url_detail')){
								me.bind('click', function(){
									var wholeCurrentPath = $(this).parent().data('wholecurrentpath');
									var fileName = $(this).parent().data('filename');
									var url = getShareFileUrl(wholeCurrentPath+'/'+fileName);
								});
							}else if(me.hasClass('share_file')){
								me.bind('click', function(){
									var wholeCurrentPath = $(this).parent().data('wholecurrentpath');
									var fileName = $(this).parent().data('filename');
									showShareFileUrl(wholeCurrentPath+'/'+fileName);
								});
							}
							$('#kp_back').attr('data-currPath', me.attr('data-parentPath'));
						}
					});  
				}
			});
		}
		
		function showShareFileUrl(filePath) {
			$.ajax({
				url : sysPath + '/mobile/kp/getFileUrl',
				contentType : 'application/json',
				dataType:"json",
				type:"post",
				data :  JSON.stringify({filePath : filePath}),
				success : function(data) {
				}
			});
		}
		
		function getShareFileUrl(filePath, element){
			$.ajax({
				url : sysPath + '/mobile/kp/getFileUrl',
				async : false,
				contentType : 'application/json',
				dataType:"json",
				type:"post",
				data :  JSON.stringify({filePath : filePath}),
				success : function(data) {
					var fileUrl = data.shareUrl;
					var str = '<li><p class="text-center"><small><a data-fileurl='+fileUrl+' class="shareFile" href="javascript:void(0);">分享</a> | <a href="'+fileUrl+'" target="_blank">下载</a></p></small></li>';
					$(element).html(str);
					$('body').undelegate('.shareFile', 'click');
					$('body').delegate('.shareFile', 'click', function(){
						var url = $(this).data('fileurl');
						$('#wholeCurrentPath').val(url);
//						window.location.href=sysPath+'/mobile/kp/shareFile/1';
						 $("form").first().attr("action",sysPath+'/mobile/kp/shareFile').submit();
					});
				}
			});
		}
	});
	
});