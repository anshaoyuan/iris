package com.utils.annotation;

import java.util.Date;

public class Test {

	@DateFormat(format="yyyy-MM-dd")
	private String currDate;

	public String getCurrDate() {
		return currDate;
	}

	public void setCurrDate(String currDate) {
		this.currDate = currDate;
	}
	
}
