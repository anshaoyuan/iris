require([ 'config' ], function() {
	"use strict";

	require([ 'template', 'text!../tpl/adminFolderList.tpl','jquery-msg', 'jquery', 'syntax', 'bootstrap' ], function(template, raw, msg) {
		
		initFolders(2);
		
		function initFolders(type){
			$.ajax(sysPath + '/console/document/folderList', {
				contentType : 'application/json; charset=utf-8',
				type : 'get',
				data : {},
				success : function(data) {
					var folderList;
					var isAdmin = true;
					//系统文件夹
					folderList = data.adminFoler;
					var datas = {
						userFolder : folderList,
						baseUrl : sysPath,
						isAdmin : isAdmin
					}
					var render = template.compile(raw);
					var html = render(datas);
					$('#folderList'+type).html(html);
					$('.folderViewBlock').hide();
					$('#foldersBlock'+type).show();
					
//					bindEventFolderDetail();
				}
			});
		}
		
		$('body').undelegate('.modifyFolder', 'click');
    	$('body').delegate('.modifyFolder', 'click',function() {
    		var folderId = $(this).data('folerid');
    		var url = sysPath+'/console/document/showFolder/'+folderId;
    		$.ajax({
				url : url,
				contentType : 'application/json',
				dataType:"json",
				type:"GET",
				data : {},
				success : function(data) {
					$('#upFolderId').val(data.id);
					$('#upFolderName').val(data.folderName);
					$('#upRemark').val(data.remark);
					
					$('#folderDetail').modal('show');
					
					$('body').undelegate('#modifyFolderBtn', 'click');
					$('body').delegate('#modifyFolderBtn', 'click',function() {
						url = sysPath+'/console/document/updateFolder';
						if($('#upFolderName').val() == '' || $('#upFolderName').val().trim().length==0){
							msg({content:'文件夹名称不能为空!'});
							return;
						}
						var jsonData = {
							id:$('#upFolderId').val(),
							folderName:$('#upFolderName').val(),
							remark:$('#upRemark').val()
						}
						var mydata= JSON.stringify(jsonData);
						$.ajax({
							url : url,
							contentType : 'application/json',
							dataType:"json",
							type:"POST",
							data : mydata,
							success : function(data) {
								if(data.code=='10000'){
									window.location.reload();
								}
							}
						});
						
					})
				}
			});
    	});
	});
})