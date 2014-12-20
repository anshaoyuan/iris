require([ 'config' ], function() {
	"use strict";

	require([ 'template', 'text!../tpl/folderList.tpl','jquery-msg', 'jquery', 'syntax', 'module/header', 'bootstrap' ], function(template, raw, msg) {
		
		var type = $('#type').val();
		
		initFolders(type);
		
		function initFolders(type){
			$.ajax(sysPath + '/mobile/document/folderList', {
				contentType : 'application/json; charset=utf-8',
				type : 'get',
				data : {},
				success : function(data) {
					var folderList;
					var isAdmin = false;
					if(type == 1){
						//我的文件夹
						folderList = data.userFolder;
					}else{
						//系统文件夹
						folderList = data.adminFoler;
						isAdmin = true;
					}
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
					
					bindEventFolderDetail();
				}
			});
			$('.doLi').removeClass('active');
			$('.nav'+type).addClass('active');
		}
		
		$('body').undelegate('.documentNav','click');
		$('body').delegate('.documentNav','click', function(){
			var type = $(this).data('type');
			$('.doLi').removeClass('active');
			$(this).parent().addClass('active');
			
			$('.folderViewBlock').hide();
			$('#foldersBlock'+type).show();
			if($('#folderList1').html() == '' && type == 1) {
				initFolders(1);
			}else if(type == 2){
				initSystemFolders(type);
			}
		});
		
		function initSystemFolders(type){
			if($('#folderList'+type).html() == ''){
				initFolders(type);
			}
		}
		
		$('body').undelegate('#createFolderBtn','click');
		$('body').delegate('#createFolderBtn','click', function(){
			var folderName=$('#folderName').val();
			
			if(folderName == '' || folderName.trim().length == 0){
				msg({content: '文件夹名称不能为空!'});
				return;
			}else if(folderName.length > 10){
				msg({content: '文件夹名称不能超过10个字符!'});
				return;
			}
			
			$('#createFolderBtn').addClass('disabled');
			
			var remark = $('#remark').val();
			var jsonData = '{"folderName":"'+folderName.trim()+'", "remark":"'+remark+'"}';
			$.ajax({
				url : sysPath + '/mobile/document/addFolder',
				contentType : 'application/json',
				dataType:"json",
				type:"post",
				data : jsonData,
				success : function(data) {
					if(data.code=='10000'){
						setInterval(function(){
							window.location.reload();
						}, 3000);
					}
				}
			});
			
		});
		
		function bindEventFolderDetail(){
			
			$('body').undelegate('.folderDetail', 'click');
	    	$('body').delegate('.folderDetail', 'click',function() {
	    		var folderId = $(this).attr('data');
	    		var fileListUrl = sysPath+'/mobile/document/fileList/'+folderId;
				$(this).bind('click', function(){
					var folderId = $(this).attr('data');
					var idf = $(this).attr('data_isDefault');
					var iaF = $(this).attr('data_isAdminFolder')
					$('#folderId').val(folderId);
					$('#isAdminFolder').val(iaF);
					
					initFileList(folderId, iaF);
				});
	    	});
	    	
	    	
	    	$('body').undelegate('.modifyFolder', 'click');
	    	$('body').delegate('.modifyFolder', 'click',function() {
	    		var folderId = $(this).data('folerid');
	    		var url = sysPath+'/mobile/document/showFolder/'+folderId;
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
							url = sysPath+'/mobile/document/updateFolder';
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
			
	    	$('body').undelegate('.delFolder', 'click');
	    	$('body').delegate('.delFolder', 'click',function() {
	    		var foldelElement = $(this);
	    		msg({
					content : '您确定要删除吗？',
					cancel : true,
					confirm : true,
					clickOk : function(){
						var folderId = $(foldelElement).data('folerid');
						$.ajax({
							url : sysPath+'/mobile/document/delFolder/'+folderId,
							contentType : 'application/json',
							dataType:"json",
							type:"GET",
							data : {},
							success : function(data) {
								if(data.code=="10000"){
									msg({content:'删除成功!'});
									$('#folder_'+folderId).hide();
								}
							}
						});
					}
				});
	    		
//				if(confirm('确定要删除该文件夹吗?')){
//					var folderId = $(this).attr('data');
//					$('#folderId').val(folderId);
//					$.ajax({
//						url : sysPath+'/mobile/document/delFolder/'+folderId,
//						contentType : 'application/json',
//						dataType:"json",
//						type:"GET",
//						data : {},
//						success : function(data) {
//							if(data.code=="10000"){
//								alert('删除成功!');
//								window.location.reload();
//							}
//						}
//					});
//				}
			});
			
		}
	});
	
	
	
});