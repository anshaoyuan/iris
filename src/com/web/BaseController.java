package com.web;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springside.modules.mapper.JsonMapper;

import com.constant.BusinessStatus;
import com.constant.MobileKey;
import com.exception.RestException;
import com.iris.entity.Account;
import com.utils.PageInfo;

@Component
public class BaseController {
	

	public static final int PAGE_SIZE = 10;
	
	protected JsonMapper mapper = new JsonMapper();
	
	public static Map<String,String> GetSuccMap(){
		Map<String,String> map = new HashMap<String,String>();
		map.put(MobileKey.CODE, BusinessStatus.OK);
		return map;
	}
	/*
	public static void setLocale(String locale) {
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
		if(user==null) return;
		user.locale = locale;
		DefaultLocale = null;
	}
	
	public static String getLocale() {
		if(DefaultLocale!=null){
			return DefaultLocale;
		}
		if(SecurityUtils.getSubject()==null) return null;
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
		if(user==null) return null;
		return user.locale;
	}
	*/
	public static Long getCurrentOrgId() {
		return 1l;
		//TODO　后期优化组织
		/*Account user = (Account) SecurityUtils.getSubject().getPrincipal();
		if(user==null) return null;
		if(hasRole(SysConstants.ADMIN)){
			return SysConstants.COMMON_ORG_ID;
		}else{
			return user.orgId;
		}*/
		
	}
	
	public static String getCurrentOrgName() {
		/*ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
		return user.orgName;*/
		return null;
	}

	

	public static Long getLoginUserId() {
		Account user = (Account) SecurityUtils.getSubject().getPrincipal();
		if(user==null) return -1l;
		
		return user.getId();
	}
	

	
	
	/**
	 * 取出Shiro中的当前用户显示姓名.
	 * 当前用户为秘书且代理功能打开时，返回领导id
	 */
	public static String getLoginUserName() {
		Account user = (Account)SecurityUtils.getSubject().getPrincipal();
		if(user==null) return "anonymity";
		
		return user.getLoginName();
	}
	

	
	

	/**
	 * 判断当前用户是否有某些角色.
	 * @param roles
	 * @return
	 */
	public static boolean hasRole(String role){
		return SecurityUtils.getSubject().hasRole(role);
	}
	
	/**
	 * 判断当前用户是否有某些角色.
	 * @param roles
	 * @return
	 */
	public static boolean hasRole(List<String> roles){
		boolean[] result = SecurityUtils.getSubject().hasRoles(roles);
		for(boolean role : result){
			if(role){
				return true;
			}
		}
		return false;
	}
	

	
	/**
	 * 判断当前用户是否有某些权限.
	 * @param permission
	 * @return
	 */
	public static boolean hasPermission(String permission){
		return SecurityUtils.getSubject().isPermitted(permission);
	}
	



	/*
	public static String getCurrentRole(){
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
		if(user==null) return null;
		return user.getRoleNames();
	}
	
	public static String getUserImgUrl(){
		ShiroUser user = (ShiroUser) SecurityUtils.getSubject().getPrincipal();
		if(user==null) return null;
		return user.getUserImgUrl();
	}
	*/
	protected void writer(HttpServletResponse res,String obj) throws Exception {
		res.setCharacterEncoding("UTF-8"); 
		PrintWriter pw=null;
		try {
			pw = res.getWriter();
			pw.print(obj);
		} catch (Exception e) {
			throw e;
		}finally{
			if(null!=pw){
				pw.flush();
				pw.close();
			}
		}
	} 

	public static void throwException(String code,String msg) {
		Map<String,String> result = new HashMap<String,String>();
		result.put("code", code);
		result.put("msg", msg);
		throw new RestException(result);
	}
	
	public static void throwException(Map<String,String> result) {
		result.put(BusinessStatus.ERROR,"表单参数校验失败!");

		throw new RestException(result);
	}
	
	
	protected static <T> Page<T> GetPageByList(PageInfo pageInfo,List<T> volist,Class<T> destinationClass){
		if(volist == null || pageInfo == null){
			return null;
		}
		
		if(volist.isEmpty()){
			return new PageImpl<T>(volist, new PageRequest(
					pageInfo.getCurrentPageNumber(), 0, new Sort(
							pageInfo.getSortType(), pageInfo.getSortColumn())),
					0);
		}else{
			return new PageImpl<T>(volist, new PageRequest(
					pageInfo.getCurrentPageNumber(), pageInfo.getPageSize(), new Sort(
							pageInfo.getSortType(), pageInfo.getSortColumn())),
					pageInfo.getTotalCount());
		}
		
	}
	
	protected static <T> Page<T> GetPageByList(Page<?> page,List<T> volist,Class<T> destinationClass){
		return new PageImpl<T>(volist, new PageRequest(page.getNumber(),
				page.getSize(), page.getSort()), page.getTotalElements());
	}
	
}
