/**
 * 天气预报
 */
require(['config'], function () {
	"use strict";
	require(['jquery','module/header'], function () {
		$('body').undelegate('a#togetweather', 'click');
		$('body').delegate('a#togetweather', 'click', function() {
			$.ajax({
				url : sysPath+'/mobile/findWeather',
				processData : true,
				dataType : "json",
				type : 'get',
				success : function(data) {
					console.log(data);
					var str='';
					var days=data.dayList;
					for(var i=0;i<days.length;i++){
						var day=days[i];
						str+='<tr>';
						str+='<td rowspan="2">'+day.date+'</td>';
						str+='<td>白天</td>';
						str+='<td><img src="'+sysPath+'/'+day.img1+'"></td>';
						str+='<td>'+day.img_title1+'</td>';
						str+='<td>高温 '+day.hightemp+'</td>';
						str+='<td rowspan="2">'+day.wind+'</td>';
						str+='<td rowspan="2">'+day.fl+'</td>';
						str+='</tr><tr>';
						str+='<td>夜间</td>';
						str+='<td><img src="'+sysPath+'/'+day.img2+'"></td>';
						str+='<td>'+day.img_title2+'</td>';
						str+='<td>低温 '+day.lowtemp+'</td>';
						str+='</tr>';
					}
					$('#weathertbody').html(str);
				}
			});
		})
	})
})