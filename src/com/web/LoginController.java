package com.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {
	@RequestMapping(value = "/weblogin", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> weblogin(@RequestBody Map<String,String> mapUser,HttpServletResponse response) throws Exception {
		String username = mapUser.get("username");
		try{
			
			UsernamePasswordToken token = new UsernamePasswordToken();
		    token.setUsername(username);  
		    token.setPassword(mapUser.get("password").toCharArray());  
			SecurityUtils.getSubject().login(token);

		}catch(Exception e){
			throw new Exception("登录失败");
			
		}
		Map<String, String> map = new HashMap<String, String>();
		map.put("code", "10000");
		return new ResponseEntity<Map<String,String>>(map,HttpStatus.OK);
	}
	
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public String login(){
		return "redirect:/public/signin.html";
	}
	
	@RequestMapping("/index")
	public String index(){
		 return "redirect:/public/index.html#/articles";
	}

}
