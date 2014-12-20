require(['config'], function () {
    "use strict";
    
    require(['text!../tpl/updateUser.tpl', 'jquery-msg','template', 'jcrop', 'bootstrap', 'uploadify'], function (raw, msg, template) {
    	
    	$("#uploadify").uploadify({
			'swf' : sysPath
					+ '/assets/js/jquery.uploadify/uploadify.swf',
			'uploader' : sysPath + '/uploadUserImg;jsessionid='
					+ $('#sessionId').val(),
			'fileTypeDesc' : '格式:BMP,JPEG,JPG,GIF,PNG', // 描述
			'fileTypeExts' : '*.BMP;*.JPEG;*.JPG;*.GIF;*.PNG', // 文件类型
			'buttonText' : '选择照片', // 按钮名称
			'removeCompleted' : true,
			'fileSizeLimit' : '40MB',
			'dataType': "json",
			'auto' : true,
			'onUploadSuccess' : function(file, data, response) {
				var jData = data.split(';');
				if(jData.length > 1){
					
					$('#target').attr('src', sysPath+'/'+jData[0]);
					$('#target_preview').attr('src', sysPath+'/'+jData[0]);
					$('#headDiv').show();
					
					$('#userImage').val(jData[1]);
					
					var jcrop_api,
			        boundx,
			        boundy,

			        // Grab some information about the preview pane
			        $preview = $('#preview-pane'),
			        $pcnt = $('#preview-pane .preview-container'),
			        $pimg = $('#preview-pane .preview-container img'),

			        xsize = $pcnt.width(),
			        ysize = $pcnt.height();
			    
				    $('#target').Jcrop({
				      onChange: function(c){
				    	  if (parseInt(c.w) > 0) {
								var rx = xsize / c.w;
								var ry = ysize / c.h;

								$pimg.css({
									width : Math.round(rx * boundx) + 'px',
									height : Math.round(ry * boundy) + 'px',
									marginLeft : '-' + Math.round(rx * c.x) + 'px',
									marginTop : '-' + Math.round(ry * c.y) + 'px'
								});
							}
				      },
				      onSelect: function(c){
				    		if (parseInt(c.w) > 0) {
								var rx = xsize / c.w;
								var ry = ysize / c.h;

								$pimg.css({
									width : Math.round(rx * boundx) + 'px',
									height : Math.round(ry * boundy) + 'px',
									marginLeft : '-' + Math.round(rx * c.x) + 'px',
									marginTop : '-' + Math.round(ry * c.y) + 'px'
								});
								$('body').undelegate('#saveImgBtn', 'click');
								$('body').delegate('#saveImgBtn', 'click', function(){
									var jsonData={
											x:c.x,
											y:c.y,
											x2:c.x2,
											y2:c.y2,
											w :c.w,
											h :c.h,
											filePath:jData[0],
											fileType:$('#userImgType').val(),
											userImage : $('#userImage').val()
									};
									var mydata= JSON.stringify(jsonData);
									var url = sysPath + "/mobile/webUser/updateUserImg";
									$.ajax(url, {
						                contentType: 'application/json; charset=utf-8',
						                type: 'post',
						                data: mydata,
						                success: function (res) {
						                	if(res.code == '10000'){
						                		msg({content: '上传成功!'});
						                		setInterval(function(){
						                			window.location.href = sysPath + '/mobile/webUser/toUserDetail';
						                		}, 2000)
						                		
											}
						    			}
						    		});
								});
							}
				      },
				      aspectRatio: xsize / ysize
				    },function(){
				      // Use the API to get the real image size
				      var bounds = this.getBounds();
				      boundx = bounds[0];
				      boundy = bounds[1];
				      // Store the API in the jcrop_api variable
				      jcrop_api = this;

				      // Move the preview into the jcrop container for css positioning
				      $preview.appendTo(jcrop_api.ui.holder);
				    });
				}
			
			},
			'onUploadStart' : function(file) {
				var fileType = file.type.substring(1);
				$('#userImgType').val(fileType);
				$('#userHeadImg').remove();
				require(['text!../tpl/userImg.tpl'], function (userHeadImg) {
					var datas={};
					var render = template.compile(userHeadImg);
                    var html = render(datas);
					$('#headDiv').html(html);
				});
			},
			'onQueueComplete' : function(queueData) {
				
			}
		});
    	
    });
    
});