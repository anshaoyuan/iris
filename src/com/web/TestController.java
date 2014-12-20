package com.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.utils.annotation.Test;
@Controller
@RequestMapping("/test")
public class TestController {

	@RequestMapping("/getTest")
	@ResponseBody
	public Test findTest(){
		Test t = new Test();
		t.setCurrDate("test");
		return t;
	}
}
