package com.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.iris.entity.User_;



public class UserValidator_ implements Validator{

	@Override
	public boolean supports(Class<?> arg0) {
		return User_.class.equals(arg0);
	}

	@Override
	public void validate(Object arg0, Errors e) {
		ValidationUtils.rejectIfEmpty(e, "userName", "test");
		
	}

}
