
package com.utils;

import java.util.List;


public class Validator {

	public static boolean equals(String s1, String s2) {
		if ((s1 == null) && (s2 == null)) {
			return true;
		}
		else if ((s1 == null) || (s2 == null)) {
			return false;
		}
		else {
			return s1.equals(s2);
		}
	}

	public static boolean isAddress(String address) {
		if (isNull(address)) {
			return false;
		}

		String[] tokens = address.split("@");

		if (tokens.length != 2) {
			return false;
		}

		for (int i = 0; i < tokens.length; i++) {
			char[] c = tokens[i].toCharArray();

			for (int j = 0; j < c.length; j++) {
				if (Character.isWhitespace(c[j])) {
					return false;
				}
			}
		}

		return true;
	}

	public static boolean isChar(char c) {
		return Character.isLetter(c);
	}

	public static boolean isChar(String s) {
		if (isNull(s)) {
			return false;
		}

		char[] c = s.toCharArray();

		for (int i = 0; i < c.length; i++) {
			if (!isChar(c[i])) {
				return false;
			}
		}

		return true;
	}

	public static boolean isDigit(char c) {
		int x = c;

		if ((x >= 48) && (x <= 57)) {
			return true;
		}

		return false;
	}

	public static boolean isDigit(String s) {
		if (isNull(s)) {
			return false;
		}

		char[] c = s.toCharArray();

		for (int i = 0; i < c.length; i++) {
			if (!isDigit(c[i])) {
				return false;
			}
		}

		return true;
	}

	public static boolean isHex(String s) {
		if (isNull(s)) {
			return false;
		}

		return true;
	}

	public static boolean isHTML(String s) {
		if (isNull(s)) {
			return false;
		}

		if (((s.indexOf("<html>") != -1) || (s.indexOf("<HTML>") != -1)) &&
			((s.indexOf("</html>") != -1) || (s.indexOf("</HTML>") != -1))) {

			return true;
		}

		return false;
	}
	
	public static boolean isDate(String str){
		if(isNull(str))
			return false;
		
		if(str.length() < 18)
			return false;
		
		if(!isNumber(str.replaceAll(":", "")))
			return false;
		
		return true;
	}

	public static boolean isDate(int month, int day, int year) {
		return isGregorianDate(month, day, year);
	}

	public static boolean isGregorianDate(int month, int day, int year) {
		if ((month < 0) || (month > 11)) {
			return false;
		}

		int[] months = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

		if (month == 1) {
			int febMax = 28;

			if (((year % 4) == 0) && ((year % 100) != 0) ||
				((year % 400) == 0)) {

				febMax = 29;
			}

			if ((day < 1) || (day > febMax)) {
				return false;
			}
		}
		else if ((day < 1) || (day > months[month])) {
			return false;
		}

		return true;
	}

	public static boolean isJulianDate(int month, int day, int year) {
		if ((month < 0) || (month > 11)) {
			return false;
		}

		int[] months = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

		if (month == 1) {
			int febMax = 28;

			if ((year % 4) == 0) {
				febMax = 29;
			}

			if ((day < 1) || (day > febMax)) {
				return false;
			}
		}
		else if ((day < 1) || (day > months[month])) {
			return false;
		}

		return true;
	}

	public static boolean isEmailAddressSpecialChar(char c) {

		// LEP-1445

		for (int i = 0; i < _EMAIL_ADDRESS_SPECIAL_CHAR.length; i++) {
			if (c == _EMAIL_ADDRESS_SPECIAL_CHAR[i]) {
				return true;
			}
		}

		return false;
	}

	/**
	 * @deprecated Use <code>isEmailAddress</code>.
	 */
//	public static boolean isValidEmailAddress(String ea) {
//		return isEmailAddress(ea);
//	}

	public static boolean isName(String name) {
		if (isNull(name)) {
			return false;
		}

		char[] c = name.trim().toCharArray();

		for (int i = 0; i < c.length; i++) {
			if (((!isChar(c[i])) &&
				(!Character.isWhitespace(c[i]))) ||
					(c[i] == ',')) {

				return false;
			}
		}

		return true;
	}

	public static boolean isNumber(String number) {
		if (isNull(number)) {
			return false;
		}

		char[] c = number.toCharArray();

		for (int i = 0; i < c.length; i++) {
			if (!isDigit(c[i])) {
				return false;
			}
		}

		return true;
	}

	public static boolean isNull(Object obj) {
		if (obj instanceof Long) {
			return isNull((Long)obj);
		}
		else if (obj instanceof String) {
			return isNull((String)obj);
		}
		else if (obj == null) {
			return true;
		}
		else {
			return false;
		}
	}

	public static boolean isNull(Long l) {
		if ((l == null) || l.longValue() == 0) {
			return true;
		}
		else {
			return false;
		}
	}

	public static boolean isNull(String s) {
		if (s == null) {
			return true;
		}

		s = s.trim();

		if (s.equals("")) {
			return true;
		}

		return false;
	}

	public static boolean isNull(Object[] array) {
		if ((array == null) || (array.length == 0)) {
			return true;
		}
		else {
			return false;
		}
	}

	public static boolean isNotNull(Object obj) {
		return !isNull(obj);
	}

	public static boolean isNotNull(Long l) {
		return !isNull(l);
	}

	public static boolean isNotNull(String s) {
		return !isNull(s);
	}

	public static boolean isNotNull(Object[] array) {
		return !isNull(array);
	}

	public static boolean isPassword(String password) {
		if (isNull(password)) {
			return false;
		}

		if (password.length() < 4) {
			return false;
		}

		char[] c = password.toCharArray();

		for (int i = 0; i < c.length; i++) {
			if ((!isChar(c[i])) &&
				(!isDigit(c[i]))) {

				return false;
			}
		}

		return true;
	}

	public static boolean isVariableTerm(String s) {
		if (s.startsWith("[$") && s.endsWith("$]")) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public static boolean isValidEmailAddress(String email) {
		return email.matches("[\\w\\.\\-]+@([\\w\\-]+\\.)+[\\w\\-]+");
	}
	
	public static boolean isValidEmailAddress(List<String> emails) {
		for(String mail: emails){
			if(!isValidEmailAddress(mail)){
				return false;
			}
		}
		return true;
	}

	private static char[] _EMAIL_ADDRESS_SPECIAL_CHAR = new char[] {
		'.', '!', '#', '$', '%', '&', '\'', '*', '+', '-', '/', '=', '?', '^',
		'_', '`', '{', '|', '}', '~'
	};

}