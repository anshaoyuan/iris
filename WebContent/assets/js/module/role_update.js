define(function(require,exports,module){
	require("styles/role.css");
	var role_tpl = require("template/role.tpl");
	var template = require("js/basic/template");
	
	exports.initRole = function (selector,data){
		var roleHtml = template('role-list',role_tpl)(data);
		$(selector).append(roleHtml);
		//$("#needDel").remove();
	}
	exports.initCheckBoxSelect = function (){
		$(".selectAll").on("click",function(e){
			e.preventDefault();
			setCheckBox(true);
		})
		$(".unSelect").on("click",function(e){
			e.preventDefault();
			setCheckBox(false);
		})
	}
	exports.fullDate = function(role){
		if(!role || role.permissions.length < 1){
			return;
		}
		var permissions = role.permissions.split(",");
		for(var i =0; i < permissions.length; i ++){
			var id = permissions[i].replace(":","_");
			if(permissions[i]!="" && $("#"+id) ){
				$("#"+id).attr("checked",true)
			}
		}
		
	}
	
	var setCheckBox = function(isChecked){
		//alert($("input[type=checkbox]").length);
		$("input[type=checkbox]").each(function(index,element){
			//alert(1);
			$(element).attr("checked",isChecked);
		})
	}
})