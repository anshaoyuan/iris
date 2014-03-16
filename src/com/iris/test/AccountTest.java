package com.iris.test;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springside.modules.test.spring.SpringTransactionalTestCase;

import com.iris.entity.Account;
import com.iris.repository.AccountDao;
import com.iris.service.AccountService;

@ContextConfiguration(locations = { "/applicationContext.xml" })
public class AccountTest extends SpringTransactionalTestCase{
	
	@Autowired
	private AccountService accountService;
	
	@Test
	public void testFind(){
		Account account = new Account();
		account.setLoginName("tanzq");
		account.setPasswd("123");;
		accountService.findAccount(account);
	}

}
