define(function() {
	// 加载
	require(['bootstrap', 'syntax']);
	function showMsg(config){
		require([ 'jquery-msg'], function(msg) {
			msg(config);
		})
	}
	var weather = function() {
		require(['text!../tpl/weather.html!strip'], function(raw) {
					$.ajax(sysPath + '/mobile/findWeather', {
								contentType : 'application/json; charset=utf-8',
								dataType : 'json',
								type : 'get',
								success : function(rawdata) {
									var date = new Date();
									var hour = date.getHours();
									var dateType = 'day';
									// 区别白天和晚上
									if (6 < hour && hour < 18) {
										dateType = 'day';
									} else {
										dateType = 'night';
									}
									var data = {
										weathers : rawdata,
										baseUrl : sysPath,
										dateType : dateType
									};
									var render = template.compile(raw);
									var html = render(data);
									$('#weatherCarousel').html(html);
								}
							});
				});
		$('body').undelegate('button#changeCitysForWeather', 'click');
		$('body').delegate('button#changeCitysForWeather', 'click', function() {
			var cityName = $('#inputLocation').val();
			if (!cityName) {
				showMsg({
					content : '请输入城市名称'
				});
				return;
			};
			var odata = {
				city : cityName
			};
			require(['text!../tpl/weather.html!strip'], function(raw) {
						$.ajax(sysPath + '/mobile/changeCity', {
									contentType : 'application/json; charset=utf-8',
									dataType : 'json',
									type : 'post',
									data : JSON.stringify(odata),
									success : function(rawdata) {
										var date = new Date();
										var hour = date.getHours();
										var dateType = 'day';
										// 区别白天和晚上
										if (6 < hour && hour < 18) {
											dateType = 'day';
										} else {
											dateType = 'night';
										}
										var data = {
											weathers : rawdata,
											baseUrl : sysPath,
											dateType : dateType
										};
										var render = template.compile(raw);
										var html = render(data);
										$('#weatherCarousel').html(html);
									}
								});
					});

		});
	};
	var announce = function() {
		// 获取本月过生日的
		require(['text!../tpl/announce.html!strip'], function(raw) {
					$.ajax(sysPath + '/mobile/notice/top5NoticesAndBirhday/2', {
								contentType : 'application/json; charset=utf-8',
								dataType : 'json',
								type : 'get',
								success : function(rawdata) {
									var sdata = {
										voList : rawdata.userList,
										noList : rawdata.noticeList,
										baseUrl : sysPath
									};
									var render = template.compile(raw);
									var html = render(sdata);
									$('#anniversCarousel').html(html);
								}
							});
				});
	};
	var stock = function() {
		getSharesDetail();
		// 提交添加股票信息
		$('body').undelegate('a.addSharesSubmitBtn', 'click');
		$('body').delegate('a.addSharesSubmitBtn', 'click', function() {
					var sharesCodes = $('#inputStockCode').val();
					if (sharesCodes != '' && sharesCodes != null) {
						$.ajax(sysPath + '/mobile/shares/addShares', {
									contentType : 'application/json; charset=utf-8',
									dataType : 'json',
									type : 'post',
									data : '{"sharesCodes":"' + sharesCodes
											+ '"}',
									success : function(rawdata) {
										var config={};
										if (rawdata.code === '10000') {
											getSharesDetail();
											config.content='添加成功';
										} else {
											config.content=rawdata.msg;
										}
										showMsg(config);
									}
								});
					} else {
						showMsg({
							content:'请输入股票代码'
						});
					}
				});
		$('a.showDeleteStockBtn').toggle(
		  function () {
		    var lab=$('.deleteStockBut');
			if(lab.hasClass('hide')){
				lab.removeClass('hide');
			};
		  },
		  function () {
		    var lab=$('.deleteStockBut');
			if(!lab.hasClass('hide')){
				lab.addClass('hide');
			};
		  }
		);
		$('body').undelegate('button.deleteStockBut', 'click');
		$('body').delegate('button.deleteStockBut', 'click', function() {
			var me= $(this);
			var id=me.data('id');
			showMsg({
				content : '您确定要删除该股票信息吗？',
				confirm : true,
				cancel:true,
				clickOk : deleteShares
			});
			function deleteShares(){
				
				$.ajax(sysPath + '/mobile/shares/deleteShares/'+id, {
					contentType : 'application/json; charset=utf-8',
					dataType : 'json',
					type : 'get',
					success : function(res) {
						if('10000' == res.code){
							showMsg({
								content : '删除成功！'
							});
							me.parent().parent().remove();
						}else{
							showMsg({
								content : res.msg
							});
						}
					}
				});
			}
		});
		
		function getSharesDetail() {
			require(['text!../tpl/stock.html!strip'], function(raw) {
						$.ajax(sysPath + '/mobile/shares/findSharesDetail', {
									contentType : 'application/json; charset=utf-8',
									dataType : 'json',
									type : 'get',
									success : function(rawdata) {
										var sdata = {
											voList : rawdata.voList
										};
										var render = template.compile(raw);
										var html = render(sdata);
										$('#sharesDetailDiv').html(html);
									}
								});
					});
		}
	};
	return {
		weather : weather,
		announce : announce,
		stock : stock
	};
});
