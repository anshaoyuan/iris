package com.utils;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.springside.modules.persistence.SearchFilter;
import org.springside.modules.persistence.SearchFilter.Operator;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
public class SearchFilterUtil {
	
	public enum OperatorUtil{
		EQ, LIKE, GT, LT, GTE, LTE,NEQ
	}

	public String fieldName;
	public Object value;
	public OperatorUtil operator;
	
	//Entity中永远不拼入where的字段
	private static List<String> filterNames = Lists.newArrayList("class","userImgUrl","dateFmt","readable","sendSMS","queryName");
	
	public SearchFilterUtil(String fieldName, OperatorUtil operator, Object value) {
		this.fieldName = fieldName;
		this.value = value;
		this.operator = operator;
	}


	/** 
     * 将一个 JavaBean 对象转化为一个  Map 
     * @param bean 要转化的JavaBean 对象 
     * @return 转化出来的  Map 对象 
     * @throws IntrospectionException 如果分析类属性失败 
     * @throws IllegalAccessException 如果实例化 JavaBean 失败 
     * @throws InvocationTargetException 如果调用属性的 setter 方法失败 
     */
    public static Map<String, Object> convertBean(Object bean)  
            throws IntrospectionException, IllegalAccessException, InvocationTargetException {
        Class type = bean.getClass();  
        Map<String, Object> returnMap = new HashMap<String, Object>();  
        BeanInfo beanInfo = Introspector.getBeanInfo(type);  
  
        PropertyDescriptor[] propertyDescriptors =  beanInfo.getPropertyDescriptors();  
        for (int i = 0; i< propertyDescriptors.length; i++) {  
            PropertyDescriptor descriptor = propertyDescriptors[i];
            String propertyName = descriptor.getName();
            if(filterNames.contains(propertyName)) continue;
            if(descriptor.getWriteMethod()==null) continue;
            
            Method readMethod = descriptor.getReadMethod();  
            if(readMethod!=null){
                Object result = readMethod.invoke(bean, new Object[0]);
                if (result != null) {
                	if(result instanceof PageInfo){
                		continue;
                	}
                	if(result instanceof Collection && ((Collection) result).isEmpty()){
                		continue;
                	}
                	if(result instanceof Map && ((Collection) result).isEmpty()){
                		continue;
                	}
                    returnMap.put(propertyName, result);  
                }
            }
            
        }  
        return returnMap;  
    }
    
	/**
	 * copy original到target<br>
	 * 调用original的get方法和target的set方法<br>
	 * original会覆盖target（不包括null），但target原先的数据不会先清空（即target特有的字段，覆盖后其值仍然存在）。
	 * @param target
	 * @param original
	 */
	public static void copyBeans(Object target, Object original) throws Exception {
        Class type = original.getClass();  
        BeanInfo beanInfo = Introspector.getBeanInfo(type);  
  
        PropertyDescriptor[] propertyDescriptors =  beanInfo.getPropertyDescriptors();  
        for (int i = 0; i< propertyDescriptors.length; i++) {  
            PropertyDescriptor descriptor = propertyDescriptors[i];  
            String propertyName = descriptor.getName();
           
            if (!propertyName.equals("class")) {
                Method readMethod = descriptor.getReadMethod();  
                if(readMethod!=null){
	                Object result = readMethod.invoke(original, new Object[0]);
	                if (result != null) {
	                	if(result instanceof Collection && ((Collection) result).isEmpty()){
	                		continue;
	                	}
	                	if(result instanceof Map && ((Collection) result).isEmpty()){
	                		continue;
	                	}
	                	Method writeMethod = descriptor.getWriteMethod();
	                	if( writeMethod != null){  
	                		writeMethod.invoke(target,result);
	                    }
	                }
                }
            }  
        }  
        
    }
	
   
    

	/**
	 * searchParams中key的格式为OPERATOR_FIELDNAME
	 */
	public static Map<String, SearchFilterUtil> parseUtil(Map<String, Object> searchParams) throws Exception{
		Map<String, SearchFilterUtil> filters = Maps.newHashMap();

		for (Entry<String, Object> entry : searchParams.entrySet()) {
			// 过滤掉空值
			String key = entry.getKey();
			Object value = entry.getValue();
			if (value == null || StringUtils.isBlank(value.toString())) {
				continue;
			}

			// 拆分operator与filedAttribute
			String[] names = StringUtils.split(key, "_");
			String filedName = null;
			OperatorUtil operator = null;
			if (names.length == 1) {
				filedName = names[0];
				operator = OperatorUtil.valueOf("EQ");
			}else if (names.length == 2) {
				filedName = names[1];
				operator = OperatorUtil.valueOf(names[0]);
			}else{
				throw new IllegalArgumentException(key + " is not a valid search filter name");
			}
			
			if(filedName.endsWith("Date") && value instanceof String){
				if(names[0].equals("LT")){
					value= DateUtil.seekDate(DateUtil.convertDate(value.toString()),1);
				}else{
					value= DateUtil.convertDate(value.toString());
				}					
			}

			// 创建searchFilter
			SearchFilterUtil filter = new SearchFilterUtil(filedName, operator, value);
			filters.put(key, filter);
		}

		return filters;
	}
	
	public static Map<String, SearchFilter> parse(Map<String, Object> searchParams) throws Exception{
		Map<String, SearchFilter> filters = Maps.newHashMap();
		if(searchParams!=null){
			for (Entry<String, Object> entry : searchParams.entrySet()) {
				// 过滤掉空值
				String key = entry.getKey();
				Object value = entry.getValue();
				if (value == null || StringUtils.isBlank(value.toString())) {
					continue;
				}
	
				// 拆分operator与filedAttribute
				String[] names = StringUtils.split(key, "_");
				String filedName = null;
				Operator operator = null;
				if (names.length == 1) {
					filedName = names[0];
					operator = Operator.valueOf("EQ");
				}else if (names.length == 2) {
					filedName = names[1];
					operator = Operator.valueOf(names[0]);
				}else{
					throw new IllegalArgumentException(key + " is not a valid search filter name");
				}
				
				if(filedName.toLowerCase().endsWith("date") && value instanceof String){
					if(names[0].equals("LT")){
						value= DateUtil.seekDate(DateUtil.convertDate(value.toString()),1);
					}else{
						value= DateUtil.convertDate(value.toString());
					}
					
				}
	
				// 创建searchFilter
				SearchFilter filter = new SearchFilter(filedName, operator, value);
				filters.put(key, filter);
			}
		}

		return filters;
	}
		
	
	
}