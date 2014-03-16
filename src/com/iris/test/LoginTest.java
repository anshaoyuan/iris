package com.iris.test;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springside.modules.test.spring.SpringTransactionalTestCase;

import com.iris.entity.Account;
import com.iris.repository.AccountDao;
import com.iris.service.AccountService;

@ContextConfiguration(locations = { "/applicationContext.xml" })
public class LoginTest extends SpringTransactionalTestCase{
	
	
	@Test
	public void testFind(){
		UsernamePasswordToken token = new UsernamePasswordToken();
	    token.setUsername("aaa");  
	    token.setPassword("aaa".toCharArray());  
		SecurityUtils.getSubject().login(token);
	}

}
