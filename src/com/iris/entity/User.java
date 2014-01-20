package com.iris.entity;

import java.util.List;

public class User {
	
	private String userName;
	private String passWd;
	private Dog dog;
	private List<Cat> cat;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassWd() {
		return passWd;
	}
	public void setPassWd(String passWd) {
		this.passWd = passWd;
	}
	public List<Cat> getCat() {
		return cat;
	}
	public void setCat(List<Cat> cat) {
		this.cat = cat;
	}
	public Dog getDog() {
		return dog;
	}
	public void setDog(Dog dog) {
		this.dog = dog;
	}
	

}
