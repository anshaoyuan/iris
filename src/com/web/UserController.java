package com.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid; 
import org.springframework.web.bind.annotation.RequestMapping;

import com.iris.entity.User;
import com.iris.entity.User_;
import com.validator.UserValidator;
import com.validator.UserValidator_;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@InitBinder("user")
	public void initBinder(WebDataBinder binder){
		binder.setValidator(new UserValidator());  
	}
	@InitBinder("user_")
	public void initBinder_(WebDataBinder binder1){
		binder1.setValidator(new UserValidator_());  
	}

	@RequestMapping(value = "/addUser", method=RequestMethod.POST)
	//如果需要验证值，一定要加@Valid
	//@ModelAttribute("user")的value需要跟前面@InitBinder("user")相匹配，这样才能指定走哪一个验证
	//@ModelAttribute如果不指明value，那么它默认就是参数类型的隐式值，比如@ModelAttribute User user等价于@ModelAttribute("user") User user
	public String addUser(@Valid @ModelAttribute User user,BindingResult br ,Model model){
		
		if(br.hasErrors()){
			System.out.println(br);
		}
		return "success";
	}
	
	@RequestMapping(value="/addUser_",method = RequestMethod.POST)
	//@ModelAttribute("user_") user_ 是指定使用@InitBinder("user_")验证器
	public String addUser_(@RequestBody @Valid @ModelAttribute("user_") User_ user,BindingResult br,Model model){
		if(br.hasErrors()){
			System.out.println(br);
		}
		return "success";
	}
	
	//params="param=2" 请url里需要有param=2这个值，如:/map/param/param=2才能进这个方法，只有/map/param不能到达
	//params="param!=2" param=2时不能为进来，其他的可以
	//params="!param" 请求中不能有名为param 参数
	//@RequestParam("param1")用户取请求中param1的值
	//@ResponseBody 注释为返回值，一般用于ajax
	@RequestMapping(value="/map/param",method = RequestMethod.GET,params="param!=1")
	public @ResponseBody String getParam(@RequestParam("param1") String param){
		System.out.println(param);
		return "test";
	}
	@RequestMapping(value="/test",method = RequestMethod.POST)
	//getParams(String userName,String passWd) 等价于getParams(@RequestParam("userName") 
	//String userName,@RequestParam("passWd" )String passWd)
	//一个方法里的参数前如果没有加@RequestParam,相当于是默认加了一个
	public @ResponseBody String getParams(String userName,String passWd){
		System.out.println(userName);
		System.out.println(passWd);
		return "test";
	}
	
	//produces=MediaType.APPLICATION_JSON_VALUE 返回User为json格式
	@RequestMapping(value="/getUser",method = RequestMethod.POST)
	public @ResponseBody User getUser(@RequestBody User user1){
		
		User user = new User();
		user.setPassWd("111");
		user.setUserName("test");
		return user;
	}
	//consumes=MediaType.APPLICATION_JSON_VALUE 请求 格式为：Content-Type:application/json
	@RequestMapping(value="/mapping/produces", method=RequestMethod.GET, consumes=MediaType.APPLICATION_JSON_VALUE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody User byProducesJson() {//返回JavaBean的json数据
		User user = new User();
		user.setPassWd("111");
		user.setUserName("test");
		return user;
	}
	
	@RequestMapping("/{id}")
	//@PathVariable的value值 与{id}相匹配
	public String getId(@PathVariable(value="id") String id){
		return id;
	}
	
	@RequestMapping("/{id}/{pid}")
	public @ResponseBody String getId_P(@PathVariable(value="id") String id,@PathVariable(value="pid") String pid){
		return id;
	}
	
	//produces=MediaType.APPLICATION_JSON_VALUE 返回User为json格式
	@RequestMapping(value="/stream",method = RequestMethod.POST)
	public @ResponseBody User getUser(@RequestBody String body){
		User user = new User();
		user.setPassWd("111");
		user.setUserName("test");
		return user;
	}
	
	@RequestMapping(value="entity",method = RequestMethod.POST)
	//HttpEntity.getbody可以拿到请求参数，.getHeaders()能拿到cookie，牛掰
	public @ResponseBody String getEntity(HttpEntity<String> entity){
		System.out.println(entity.getHeaders());
		
		return entity.getBody();
		
	}
	
	@RequestMapping(value="/String",method=RequestMethod.POST)
	public @ResponseBody String testString(@RequestBody String str){
		return str;
	}
}
