package com.iris.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iris.entity.Account;
import com.iris.repository.AccountDao;

@Service
@Transactional
public class AccountService {
	
	@Autowired
	private AccountDao accountDao;
	
	public Account findAccount(Account account){
		return accountDao.findByLoginNamePasswd(account.getLoginName(),account.getPasswd());
	}

}
