/**
 * 股票代码
 */
require(['config'], function () {
	"use strict";
	require(['template','syntax','bootstrap', 'module/header'], function (template) {
		//如果查看了股票信息 ，就定时更新股票信息
		setInterval(function(){
			var sharesTable=$('#sharesDetaitab');
			if(sharesTable.html()){
				getSharesDetail();
			}
		},10000);
		// 显示添加股票信息弹出层
		$('body').undelegate('a.addSharesBtn', 'click');
		$('body').delegate('a.addSharesBtn', 'click',function() {
			var modal=$('#addSharesModal');
			modal.modal('show');
		});
		// 验证添加股票代码
		$('body').undelegate('a.checkaddSharesMsgBtn', 'click');
		$('body').delegate('a.checkaddSharesMsgBtn', 'click',function() {
			var modal=$('#addSharesModal');
			var sharesCodes=$('.addSharesCoses',modal).val();
			if(sharesCodes!='' &&　sharesCodes!=null){
				$('.addSharesSubmitBtnback',modal).removeClass('addSharesSubmitBtn').addClass('disabled').html('正在验证股票代码...');
				checkSharesCodes(sharesCodes,modal);
			}
		});
		function checkSharesCodes(sharesCodes,modal){
			$.ajax(sysPath + '/mobile/shares/checkSharesCodes/'+sharesCodes, {
                contentType: 'application/json; charset=utf-8',
                dataType : 'json',
                type: 'get',
                success: function (rawdata) {
                	if(rawdata.code){
                		$('.checkMsg',modal).html('您输入的股票信息为：'+rawdata.msg);
                		var id=modal.attr('id');
                		if(id==='addSharesModal'){
                			$('.addSharesSubmitBtnback',modal).addClass('addSharesSubmitBtn').removeClass('disabled').html('提交');
                		}else if(id==='updataSharesModal'){
                			$('.updateSharesSubmitBtnback',modal).addClass('updateSharesSubmitBtn').removeClass('disabled').html('提交');
                		}
                	}else{
                		$('.checkMsg',modal).html('您添加的股票信息为：'+rawdata.msg+'<br>有些股票代码无效，请修改！');
                	}
                	$('.alert',modal).addClass('in');
                }
            });
		}
		// 提交添加股票信息
		$('body').undelegate('a.addSharesSubmitBtn', 'click');
		$('body').delegate('a.addSharesSubmitBtn', 'click',function() {
			var modal=$('#addSharesModal');
			var sharesCodes=$('.addSharesCoses',modal).val();
			if(sharesCodes != '' && sharesCodes != null){
				$.ajax(sysPath + '/mobile/shares/addShares', {
	                contentType: 'application/json; charset=utf-8',
	                dataType : 'json',
	                type: 'post',
	                data:'{"sharesCodes":"'+sharesCodes+'"}',
	                success: function (rawdata) {
	                	$('.addSharesCoses',modal).val('');
	                	$('.checkMsg',modal).html('');
	                	if(rawdata.code==='10000'){
	                		alert("添加成功");
	                		modal.modal('hide');
	                	}else{
	                		alert(rawdata.msg);
	                	}
	                }
	            });
			}else{
				alert('请输入股票代码');
			}
		});
		// 显示修改股票信息
		$('body').undelegate('a.updataSharesBtn', 'click');
		$('body').delegate('a.updataSharesBtn', 'click',function() {
			var modal=$('#updataSharesModal');
			$.ajax(sysPath + '/mobile/shares/findSharesByUserId', {
                contentType: 'application/json; charset=utf-8',
                dataType : 'json',
                type: 'get',
                success: function (rawdata) {
                	if(rawdata.shares != null){
                		var sharesCodes=rawdata.shares.sharesCodes;
                		$('.updateSharesCoses',modal).val(sharesCodes);
                		modal.modal('show');
                	}else{
                		alert('您还没有添加股票信息！');
                	}
                }
            });
		});
		// 验证修改股票代码
		$('body').undelegate('a.checkupdateSharesMsgBtn', 'click');
		$('body').delegate('a.checkupdateSharesMsgBtn', 'click',function() {
			var modal=$('#updataSharesModal');
			var sharesCodes=$('.updateSharesCoses',modal).val();
			if(sharesCodes!='' &&　sharesCodes!=null){
				$('.updateSharesSubmitBtnback',modal).removeClass('updateSharesSubmitBtn').addClass('disabled').html('正在验证股票代码...');
				checkSharesCodes(sharesCodes,modal);
			}
		});
		
		// 提交修改股票代码
		$('body').undelegate('a.updateSharesSubmitBtn', 'click');
		$('body').delegate('a.updateSharesSubmitBtn', 'click',function() {
			var modal=$('#updataSharesModal');
			var sharesCodes=$('.updateSharesCoses',modal).val();
			if(sharesCodes!='' &&　sharesCodes!=null){
				$.ajax(sysPath + '/mobile/shares/updateShares', {
	                contentType: 'application/json; charset=utf-8',
	                dataType : 'json',
	                type: 'post',
	                data:'{"sharesCodes":"'+sharesCodes+'"}',
	                success: function (rawdata) {
	                	if(rawdata.code==='10000'){
	                		alert("修改成功");
	                		modal.modal('hide');
	                	}else{
	                		alert(rawdata.msg);
	                	}
	                }
	            });
			}else{
				alert('股票代码不能为空！');
			}
		});
		$('body').undelegate('a.deleteDetailBtn', 'click');
		$('body').delegate('a.deleteDetailBtn', 'click',function() {
			var modal=$('#delteSharesModal');
			modal.modal('show');
		});
		$('body').undelegate('a.deleteSharesSubmitBtn', 'click');
		$('body').delegate('a.deleteSharesSubmitBtn', 'click',function() {
			var modal=$('#delteSharesModal');
			$.ajax(sysPath + '/mobile/shares/deleteShares', {
                contentType: 'application/json; charset=utf-8',
                dataType : 'json',
                type: 'get',
                success: function (rawdata) {
                	if(rawdata.code==='10000'){
                		alert("删除成功");
                		modal.modal('hide');
                	}else{
                		alert(rawdata.msg);
                	}
                }
            });
		});
		$('body').undelegate('a.getSharesDetailBtn', 'click');
		$('body').delegate('a.getSharesDetailBtn', 'click',function() {
			getSharesDetail();
		});
		function getSharesDetail(){
			require(['text!../tpl/shares.html!strip'], function (raw) {
				$.ajax(sysPath + '/mobile/shares/findSharesDetail', {
	                contentType: 'application/json; charset=utf-8',
	                dataType : 'json',
	                type: 'get',
	                success: function (rawdata) { 
	                	var sdata={
	                		voList:rawdata.voList
	                	};
	           			var render = template.compile(raw);
	                	var html = render(sdata);
	                	$('#sharesDetailDiv').html(html);
	                }
	            });
			});
		};
	});
});