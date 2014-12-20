require(['config'], function () {
    "use strict";
    
    require(['template','jquery-msg','jquery','syntax','module/header', 'bootstrap', 'wdatePicker', 'jquery.validate', 'domready'], function (template, msg) {
    	$(document).ready(function(){
    		// 手机号码验证
    		jQuery.validator.addMethod("mobile", function(value, element) {
    		var length = value.length;
    		return this.optional(element) || (length == 11 /*&& /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(value)*/);
    		}, "手机号码格式错误!");
    		
    		jQuery.validator.addMethod("phoneNumberValidate", function(value, element) {  
    			var result=false;
    			$.ajax(sysPath+'/account/user/checkPhoneNumber', {
    	            contentType: 'application/json; charset=utf-8',
    	            async : false,
    	            type: 'get',
    	            data: {
    	            	"oldPhoneNumber":$('#oldPhoneNumber').val(),
    	            	"phoneNumber":$('#phoneNumber').val()
    	            },
    	            success: function (res) {
    	            	if(res == 'true'){
    	            		result=true;
    	            	}
    	            }
    	        });
    			return this.optional(element) || result;  
    	    }, "该号码已经存在!");  
    		
    		//为inputForm注册validate函数 password passwordConfirmation
    		$("#inputForm").validate({
    			submitHandler: function(form){
    				$('#btn_updateUser').html('<i class="fa fa-check fa-fw"></i>提交中....')
    				$('#btn_updateUser').attr('disabled','true');
    				form.submit();
    			},    			
    			rules: {
    				userName: {
    					required: true
    				},
    				phoneNumber:{
    					required: true,
    					mobile : true,
    					phoneNumberValidate: true
    				},
    				roomPhone : {
    					digits : true
    				},
    				workPhone : {
    					mobile : true
    				},
    				email: {
    				    email: true
    			   }
    			},
    			messages: {
    				userName: "必填项!"
    			},
    			phoneNumber:{
    				required:"必填项!"
    				
    			}
    		});
    	});
    	
    	validateKp();
    	
    	function validateKp(){
    		$.ajax(sysPath+'/mobile/kp/validateKp', {
                contentType: 'application/json; charset=utf-8',
                async : false,
                type: 'GET',
                data: {},
                success: function (res) {
                	var url = '';
                	if(res.result == '1'){
                		$('#kpbtn').html('查看我的金山快盘');
                		url = sysPath+'/mobile/kp/toList';
					}else{
						$('#kpbtn').html('绑定金山快盘');
						url = sysPath+'/mobile/kp/toBindPage';
					}
                	$('body').undelegate('#kpbtn', 'click');
                	$('body').delegate('#kpbtn', 'click', function(){
                		window.location.href=url;
                	});
    			}
    		});
    	}
    	
    	$('body').undelegate('#changePwdBtn', 'click');
        $('body').delegate('#changePwdBtn', 'click', function(){
        	var oldPassword = $('#oldPassword').val();
        	var password = $('#password').val();
        	var rpassword = $('#rpassword').val();
        	if(oldPassword == '' || password == '' || rpassword==''){
        		msg({content:'提交信息部完整!'})
        		return;
        	}
        	if(password != rpassword){
        		msg({content:'2次密码不一致!'})
        		return;
        	}
        	if(password.length < 6){
        		msg({content:'密码长度过短,至少6位!'})
        		return;
        	}
        	var jdata = {
        		id : $('#id').val(),
        		password : oldPassword,
        		plainPassword : password
        	};
        	$('#myModal').modal('hide');
        	$.ajax(sysPath+'/mobile/account/user/updateSelfPasswd2', {
                contentType: 'application/json; charset=utf-8',
                type: 'post',
                data: JSON.stringify(jdata),
                success: function (res) {
                	if(res.code == '10000'){
                		msg({content: '修改成功!'});
					}else{
						var jr = $.parseJSON(res);
						msg({content: jr.msg});
						$('#oldPassword').val('');
			        	$('#password').val('');
			        	$('#rpassword').val('');
					}
    			}
    		});
        });
        
        $('body').delegate('#defaultTeam', 'change', function(){
			var id = $(this).val();
			if(id != ''){
				$.ajax(sysPath+'/mobile/team/findTeamClassTitle/'+id, {
		            contentType: 'application/json; charset=utf-8',
		            type: 'get',
		            success: function (res) {
		            	if(res.classTitle != undefined){
	            			$('#classTitle').html("<option value=''>请选择...</option>");  
		            		for (var key in res.classTitle)	{
		            			$('#classTitle').append("<option value='"+key+"'>"+key+"</option>");  
		            		}	            		
		            	}
		            }
		        });
			}else{
				$('#classTitle').html("<option value=''>请选择...</option>");  
			}
		})
    });
    
});