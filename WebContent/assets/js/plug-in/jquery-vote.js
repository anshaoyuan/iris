require([],function(){
	//显示发起投票面板的函数
//	var msg=require('plug-in/util/jquery.msg');
	
	function _publish(voteData){
		var backDiv = $($.vote.html["backDiv"]);
		backDiv.appendTo(document.body);

		var voteDiv = $($.vote.html["voteDiv"]);
		voteDiv.appendTo(document.body);
		voteDiv[0].scrollIntoView();
		document.body.scrollTop = (parseInt(document.body.scrollTop) - 50) + "px";
		$.vote.voteDiv = voteDiv;

		var titleDiv = $($.vote.html["titleDiv"]);
		titleDiv.text("发起投票");
		voteDiv.append(titleDiv);

		var closeDiv = $($.vote.html["closeDiv"]);
		titleDiv.append(closeDiv);
		closeDiv.click(function(){
			backDiv.remove();
			voteDiv.remove();
		});

		var voteBody = $($.vote.html["voteBody"]);
		voteDiv.append(voteBody);

		var themeDiv = $($.vote.html["themeDiv"]);
		voteBody.append(themeDiv);

		var theme = $($.vote.html["theme"]);
		themeDiv.append(theme);
		if(voteData.theme){
			theme.val(voteData.theme);
		}
		
		var desDiv = $($.vote.html["desDiv"]);
		voteBody.append(desDiv);
		
		var des = $($.vote.html["des"]);
		desDiv.append(des);
		if(voteData.des){
			des.val(voteData.des);
		}

		var optionsDiv = $($.vote.html["optionsDiv"]);
		voteBody.append(optionsDiv);

		var optionsOl = $($.vote.html["optionsOl"]);
		optionsDiv.append(optionsOl);

		optionsOl.append($($.vote.html["option-li"]).append($.vote.html["option-input"]));
		optionsOl.append($($.vote.html["option-li"]).append($.vote.html["option-input"]));

		var addOptionDiv = $($.vote.html["add-optionDiv"]);
		voteBody.append(addOptionDiv);

		var addOptionLink = $($.vote.html["addOptionLink"]);
		addOptionDiv.append(addOptionLink);
		addOptionLink.click(function(){
			var li = _addOption(optionsOl);

			li.css("fontSize",$.vote.defaults.optionFontSize);
			
			li.children("span").click(function(){
				addOptionDiv.show();
				li.remove();
			});

			if(optionsOl.children().length >= $.vote.defaults.itemMaxSize){
				addOptionDiv.hide();
			}
		});

		var publishDiv = $($.vote.html["publishDiv"]);
		voteBody.append(publishDiv);

		var publishBtn = $($.vote.html["publishBtn"]);
		publishDiv.append(publishBtn);

		publishBtn.click(function(){
			if(!voteData.publishCallBack){
				throw new Error("未指定回调函数!");
			}
			var data = _getPublishData();
			if(data || data != null){
				voteData.publishCallBack(data);	
			}
			
		});

		var optionsTypeOne = $("<input type='radio' style='margin-top:0px;vertical-align:text-top' name='vote-options-type' checked='checked' value='one'>");
		publishDiv.append($("<span style='padding-top:5px'><label style='cursor:pointer;float: left;padding: 5px'>单选</label></span>").prepend(optionsTypeOne));
		var optionsTypeMore = $("<input type='radio' style='margin-top:0px;vertical-align:text-top' name='vote-options-type' value='more'>");
		publishDiv.append($("<span style='padding-top:5px'><label style='cursor:pointer;float: left;padding: 5px'>多选</label></splan").prepend(optionsTypeMore));
		
	}
	//获取将要发布的投票信息数据对象
	function _getPublishData(){
		var voteData = {};
		var theme = $.vote.voteDiv.find("input[name=vote-theme]");
		var des = $.vote.voteDiv.find("textarea[name=vote-des]");
		if($.trim(theme.val()) == ""){
			theme[0].focus();
			setTimeout(function(){theme.css("backgroundColor","red")},300);
			setTimeout(function(){theme.css("backgroundColor","white")},600);
			setTimeout(function(){theme.css("backgroundColor","red")},900);
			setTimeout(function(){theme.css("backgroundColor","white")},1200);
			setTimeout(function(){theme.css("backgroundColor","red")},1500);
			setTimeout(function(){theme.css("backgroundColor","white")},1800);
			return null;
		}else if($.trim(des.val()) == ""){
			des[0].focus();
			setTimeout(function(){des.css("backgroundColor","red")},300);
			setTimeout(function(){des.css("backgroundColor","white")},600);
			setTimeout(function(){des.css("backgroundColor","red")},900);
			setTimeout(function(){des.css("backgroundColor","white")},1200);
			setTimeout(function(){des.css("backgroundColor","red")},1500);
			setTimeout(function(){des.css("backgroundColor","white")},1800);
			return null;
		}else if($.trim(theme.val()).length > $.vote.defaults.themeMaxSize){
			new msg({content : "投票主题最多" + $.vote.defaults.themeMaxSize + "个字符"});
			return null;
		}else{
			voteData.theme = $.trim(theme.val());
		}

		voteData.options = [];
		$.vote.voteDiv.find("ol input[name=vote-option-input]").each(function(i,val){
			val = $(val);
			if($.trim(val.val()).length > $.vote.defaults.optionMaxSize){
				new msg({content : "投票项最多" + $.vote.defaults.optionMaxSize + "个字符"});
				return null;
			}else if($.trim(val.val()) != "" ){
				voteData.options[voteData.options.length] = {"title":$.trim(val.val())};
			}
		});
		if(voteData.options.length < 2){
			new msg({content : "请至少填写两项!"});
			return null;
		}

		if($.vote.voteDiv.find("input[name=vote-options-type][value=one]").attr("checked")){
			voteData.optionsType = "0";
		}else{
			voteData.optionsType = "1";
		}
		
		voteData.des = $.vote.voteDiv.find("textarea[name=vote-des]").val();

		return voteData;
	}

	//新增投票项
	function _addOption($ol){
		var li = $($.vote.html["option-li"]);
		$ol.append(li);

		var input = $($.vote.html["option-input"]);
		li.append(input);

		var close = $("<span style='cursor:pointer;'> X </span>");
		li.append(close);

		return li;
	}




	//显示投票操作面板的函数
	function _show(voteData){
		if(!voteData.options || !voteData.theme ){
			throw new Error("投票数据不完整!");
		}

		if(voteData.options.length < 1 || $.trim(voteData.theme) === ""){
			throw new Error("投票数据非法!");
		}

		var votePannel = $($.vote.html["s-votePannel"]);

		if(voteData.showTheme){
			var themeDiv = $($.vote.html["s-themeDiv"]);
			themeDiv.text(voteData.theme);
			votePannel.append(themeDiv);
		}

		var optionsDiv = $($.vote.html["s-optionsDiv"]);
		votePannel.append(optionsDiv);

		var optionsUl = $($.vote.html["s-optionsUl"]);
		optionsDiv.append(optionsUl);

		var voteType = voteData.optionsType && voteData.optionsType == "1" ? "checkbox" : "radio";
		for(var i in voteData.options){
			var val = voteData.options[i];
			var li = $($.vote.html["s-li"]);
			optionsUl.append(li);
			
			if(voteData.creator){
				li.attr('title',voteData.options[i].voter);
			}
			
			if(!val.selected){
				li.bind("mouseenter" , function(event){
						var target = $(event.target);
						if(target.is("li")){
							target.css("backgroundColor",$.vote.defaults.mouseoverColor);
						}else{
							if(target.parent().is("li")){
								target.parent().css("backgroundColor",$.vote.defaults.mouseoverColor);
							}else{
								target.parent().parent().css("backgroundColor",$.vote.defaults.mouseoverColor);
							}
						}
				});
				li.bind("mouseleave" , function(event){
						var target = $(event.target);
						if(target.is("li")){
							target.css("backgroundColor","transparent");
						}
				});
			}
			
			li.html("<input type='"+voteType+"' name='vote-option-"+voteData.id+"' style='margin:-2px 5px 0px 8px;'>"+val.title);
			li.css("fontSize",$.vote.defaults.optionFontSize);

			if(voteData.isVoted){
				var input = li.find("input").attr("disabled","disabled");
				if(val.selected){
					input.attr("checked","checked");
					li.css("backgroundColor",$.vote.defaults.votedColor);
				}
			}else{
				li.bind("click" , function(event){
					var ele = $(event.target).find("input");
					ele.attr("checked",ele.attr("checked") === "checked"?null:"checked");
				});
			}

			var vote_result_span = $($.vote.html["s-voteResultSpan"]);
			li.append(vote_result_span);

			var color = $.vote.defaults.color[(i % $.vote.defaults.color.length)];
			var post = $("<span name='s' style='display:none;'>&nbsp;</span>");
			post.css("backgroundColor",color);
			vote_result_span.append(post);

			var result = $("<span name='n' style='display:none;margin-left:5px;'>50%</span>");
			vote_result_span.append(result);

		}
	
		var publishDiv = $($.vote.html["publishDiv"]);
		votePannel.append(publishDiv);

		var publishBtn = $("<input class='btn' style='padding:3px 5px;' type='button' name='btn' value='投票'>");
		publishDiv.append(publishBtn);
		if(voteData.disable){
			publishBtn.attr("disabled","disabled");
			publishBtn.val("已投票");
		}else{
			publishBtn.data("dq-data",voteData);
			publishBtn.after($('<label>匿名投票<input type="checkbox" class="anonymity"></label>'));
			publishBtn.click(function(){
				var voteData = $(this).data("dq-data");
				var bool = _updateVoteData(voteData);
				if(!bool){
					new msg({content : '请选择!'});
				}else{
					voteData.anonymity = $(this).parent().find('.anonymity').attr('checked') == 'checked'?1:0;
					voteData.voteCallBack(voteData);	
				}
			});
		}
		
		voteData.voteDiv = votePannel;

		if(voteData.isVoted){
			setTimeout(function(){_showResult(voteData)},500);
		}
	}

	function _updateVoteData(voteData){
		var liArr = voteData.voteDiv.find("ul li input[name=vote-option-"+voteData.id+"]");
		var bool = 0;
		liArr.each(function(i,val){
			voteData.options[i].selected = val.checked;
			if(val.checked){bool++;}
		});
		bool = bool > 0 ? true : false;
		return bool;
	}



	function _showResult(voteData){
		var voteCountPannels = voteData.voteDiv.find("ul li span[name=vote-result-span]");
		var total = 0;
		for(var i in voteData.options){
			total += voteData.options[i].count;
		}

		var voteBtn = voteData.voteDiv.find("input[name=btn]");
		voteBtn.attr("disabled","disabled");
		voteBtn.attr("value","已投票");
		voteBtn.parent().append("<span style='margin-left:10px;'>(已有"+ voteData.total +"人参与投票)</span>");
		
		voteBtn.parent().find('label').remove();
		if(voteData.creator){
			voteBtn.remove();
		}
		
		if(voteData.isObserved){
			voteBtn.hide();
		}
		
		

		voteCountPannels.each(function(i,val){
			var span = $(val);
			var parent = span.parent();
			parent.find("input").attr("disabled","disabled");
			parent.unbind("click");
			if(voteData.options[i].selected){
				parent.css("backgroundColor",$.vote.defaults.votedColor);
				parent.unbind();
			}

			var post = span.find("span[name=s]");
			var result = span.find("span[name=n]");

			if(total > 0){
				var perc = ((voteData.options[i].count / total)*100).toFixed(2);
				result.text(perc+"%" + "(" + voteData.options[i].count +")");
			}else{
				result.text("0.00%(0)");
			}

			var width = parseInt($.vote.defaults.resultWidth * perc / 100) + "px";
			post.css("width","1px").show().animate({"width":width},"normal",function(){result.show(1000)});
		});
	}


	//投票函数
	$.vote = function(voteData){
		if(!voteData){
			throw new Error("未指定参数");
		}

		if(!voteData.view){
			throw new Error("缺少view属性");
		}

		if(voteData.view === "publish"){
			_publish(voteData);
		}else if(voteData.view === "show"){
			_show(voteData);
		}else if(voteData.view === "result"){
			if(!voteData.voteDiv) throw new Error("缺少页面元素");
			_showResult(voteData);
		}else{
			throw new Error("view属性非法!");
		}

	}
	//默认值
	$.vote.defaults = {
		"itemMaxSize" : 10,
		"color" : ["#ff9900","#ffff00","#00ff99","#00ffff","#0000ff","#ff0000","#00ff00"],
		"mouseoverColor" : "rgba(0,255,100,0.3)",
		"votedColor" : "rgba(225,100,100,0.3)",
		"optionFontSize" : "12px",
		"resultWidth" : "100",
		"themeMaxSize" : "30",
		"optionMaxSize" : "20"
	};
	//投票面板主要元素字符串集合
	$.vote.html = {
		"backDiv" : "<div style='z-index:10000;position:fixed;top:0px;left:0px;background-color:rgba(0,0,0,0.4);width:100%;height:100%;font-size:14px;color:gray;'></div>",
			
		"voteDiv" : "<div style='z-index:10001;over-flow:visible;position:absolute;top:100px;left:50%;paddin:0px;margin:0px 0px 0px -200px;background-color:#ffffff;width:400px;min-height:280px;border:5px solid rgba(225,225,225,0.5);'></div>",
		"votePannel" : "<div style='over-flow:visible;background-color:#ffffff;width:400px;min-height:220px;border:5px solid rgba(225,225,225,0.5);'></div>",
		"option-input" : "<input name='vote-option-input' style='border:rgba(225,225,225,0.8) 1px solid;width:320px;height:25px;'>",
		"option-li" : "<li style='margin:0px 0px 0px 30px;padding:0px;list-style-type:decimal;' name='vote-option-li'></li>",
		"add-optionDiv" : "<div style='line-height:35px;'></div>",
		"publishDiv" : "<div style='line-height:35px;padding-top:10px;'></div>",
		"publishBtn" : "<input style='float:right;margin-right:30px;padding:3px 5px;cursor:pointer;' type='button' value='发起'>",
		"titleDiv" : "<div style='background-color:rgba(200,200,200,0.4);height:35px;line-height:35px;padding-right:4px;padding-left:4px;'></div>",
		"closeDiv" : "<div style='float:right;padding:0px 3px;cursor:pointer;'> X </div>",
		"voteBody" : "<div style='padding:10px;margin:0px;'></div>",
		"themeDiv" : "<div style='line-height:35px;'>投票主题:内容最多"+ $.vote.defaults.themeMaxSize +"字<br></div>",
		"theme" : "<input name='vote-theme' style='border:rgba(225,225,225,0.8) 1px solid;width:350px;height:25px;'>",
		"optionsDiv" : "<div style='line-height:35px;'>投票选项:最多"+ $.vote.defaults.itemMaxSize +"项<br></div>",
		"optionsOl" : "<ol style='margin:0px;padding:0px;'></ol>",
		"addOptionLink" : "<span style='cursor:pointer;'>添加选项</span>",
		
		"desDiv" : "<div style='line-height:35px;'>投票描述:<br></div>",
		"des" : "<textarea name='vote-des' style='border:rgba(225,225,225,0.8) 1px solid;width:350px;height:50px;'></textarea>",

		"s-votePannel" : "<div style='border-width:0px;width:480px;'></div>",
		"s-themeDiv" : "<div style='font-size:18px;font-weight:bold;text-align:center;line-height:25px;max-height:30px;'></div>",
		"s-optionsDiv" : "<div style='line-height:35px;'></div>",
		"s-optionsUl" : "<ul style='margin:0px;padding:0px;list-style-type:none;'></ul>",
		"s-li" : "<li style='line-height:35px;cursor:pointer;position:relative;width:600px;'></li>",
		"s-voteResultSpan" : "<span name='vote-result-span' style='position:absolute;right:0px;width:200px;line-height:18px;margin-top:8px;'></span>"
	};
	//投票数据类型描述函数
	$.vote.voteDataModel = function(){
		var str =  "id               :  唯一标示符(数字)\n";
			str += "theme            :  主题(字符类型)\n";
			str += "options          :  投票项数组元素类型为{id:'选项唯一标示',title:'选项标题',count:'得票数',selected:'是否选中'}\n";
			str += "optionsType      :  投票类型,0单选,1多选\n";
			str += "optionsMaxSize   :  最大选项数(数字)\n";
			str += "view             :  视图模式,publish发布,show展示\n";
			str += "disable          :  是否禁用发布按钮,只在view为show时有效(布尔类型)\n";
			str += "publishCallBack  :  点击发布按钮时调用的回调函数,参数为该插件所提供封装了投票信息的数据类型(函数)\n";
			str += "voteCallBack     :  点击投票时调用的回调函数,参数为该插件所提供封装了投票信息的数据类型(函数)\n";
			str += "isVoted          :  是否投过票";
			str += "total            :  总共投票数";
			str += "showTheme        :  是否显示投票主题"
		return str;
	}
});