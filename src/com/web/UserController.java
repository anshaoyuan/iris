package com.web;

import org.springframework.stereotype.Controller;
//import org.springframework.validation.annotation.Validated;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid; 
import org.springframework.web.bind.annotation.RequestMapping;

import com.entity.User;
import com.entity.User_;
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
	public String addUser_(@Valid @ModelAttribute("user_") User_ user_,BindingResult br,Model model){
		if(br.hasErrors()){
			System.out.println(br);
		}
		return "success";
	}
}
