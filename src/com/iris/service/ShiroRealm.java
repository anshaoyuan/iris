package com.iris.service;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import com.iris.entity.Account;
import com.iris.util.ParamKey;

public class ShiroRealm extends AuthorizingRealm{
	
	@Autowired
	protected AccountService accountService;

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		String username = (String) principals.fromRealm(getName()).iterator().next();
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		return info;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		Account loginAccount = new Account();
		loginAccount.setLoginName(token.getUsername());
		loginAccount.setPasswd(new String(token.getPassword()));
		Account account = accountService.findAccount(loginAccount);
		if(account == null){
			return null;
		}
		if(!account.getIsLock().equals(ParamKey.UN_LOCKED)){
			throw new DisabledAccountException();
		}
		return new SimpleAuthenticationInfo(account, account.getPasswd(), getName());
	}
	
	

}
