package com.constant;

public class BusinessStatus {
	// success
	public static final String OK = "10000";
	// error
	public static final String ERROR = "10001";
	// 长度限制
	public static final String LENGTH_LIMIT = "10002";
	// 个数限制
	public static final String SIZE_LIMIT = "10003";
	// 违规操作
	public static final String ILLEGAL = "10004";
	// 禁止访问
	public static final String ACCESSDENIED = "10005";
	// 资源不存在
	public static final String NOTFIND = "10006";
	// 非空限制
	public static final String REQUIRE = "10007";
	//名称重复
	public static final String NAMEREPEAT = "10008";
	//参数错误
	public static final String PARAMETERERROR = "10009";
	
	//Admin禁止访问
	public static final String ADMINDENY = "10010";
	//普通用户禁止访问
	public static final String USERDENY = "10011";
	
	//收藏已经存在
	public static final String STOREEXSIST = "10012";
}
