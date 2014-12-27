package com.utils;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	public static final String YMD1 = "yyyy-MM-dd";
    public static final String YMD2 = "dd/MM/yy";
    public static final String YMD3 = "yyyyMMdd";
    public static final String YMD4 = "ddMMyyyy";
    public static final String YMD5 = "yyyy-MM";
    public static final String YMD6 = "HH";
    public static final String YMD_FULL = "yyyy-MM-dd HH:mm:ss";
    public static final String NUMBER_INT = "###";
    public static final String NUMBER_FLOAT = "####.##";
    
    
    /**
	* Convert date type from String to Date
	* @param temp Sample:2005-10-12
	* @return Date
	*/
    public static String convertToString(Date date,String format) {
    	SimpleDateFormat sdf=new SimpleDateFormat(format);
    	return sdf.format(date);
    }
    
    public static String convertToString(Date date) {
		return convertToString(date,YMD_FULL);
	}
    
    public static Date seekDate(Date date,int dayNum) {
		return  new Date(date.getTime() + (long)(dayNum*86400000));
	}
    
    public static Date trimDate(Date date) {
    	date.setHours(0);
    	date.setMinutes(0);
    	date.setSeconds(0);
    	return date;
	}
    
    public static Date getCurrentDate() {
    	return new Date();
    }
    
    public static DateFormat getCnDateFormat(String pattern){
		return new SimpleDateFormat(pattern);
	}
    
    public static Date convertFromString(String date,String format) throws Exception{
		if(date==null) return null;
		if(format == null) format = YMD_FULL;
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.parse(date);
	}
    
    public static Date convertFromString(String date) throws Exception{
    	return convertFromString(date, null);
    }
    public static Date convertDate(String date) throws Exception{
    	return convertFromString(date, YMD1);
    }
    public static Date convertDateMutip(String date) throws Exception{
    	if(null == date) return null;
    	if(date.length() > 10){
    		return convertFromString(date);
    	}else{
    		return convertDate(date);
    	}
    }
    
	public static double normalMultiply(Double value1,Double value2)throws Exception{
		BigDecimal b1 = new BigDecimal(value1.toString());		
		BigDecimal b2 = new BigDecimal(value2.toString());
		return b1.multiply(b2).doubleValue();
	}
	
	public static double normalAdd(Double value1,Double value2)throws Exception{
		BigDecimal b1 = new BigDecimal(value1.toString());		
		BigDecimal b2 = new BigDecimal(value2.toString());
		return b1.add(b2).doubleValue();
	}
	

}
