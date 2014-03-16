package com.iris.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="t_user")
public class Account extends IdEntity{

	private String loginName;
	
	private String passwd;
	
	private Integer isLock;

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public Integer getIsLock() {
		return isLock;
	}

	public void setIsLock(Integer isLock) {
		this.isLock = isLock;
	}
	
	
}
