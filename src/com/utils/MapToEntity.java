package com.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;

public class MapToEntity {
	
	public void mapToEntity() throws Exception{
		String url ="userName>aaa=aaa&passWd=111&userName>aaa=222";
		String[] pairs = StringUtils.tokenizeToStringArray(url, "&");
		Map<String, Object> result = new HashMap<String, Object>();
		for(String pair: pairs){
			int idx = pair.indexOf('=');
			if(idx == -1){
				result.put(URLDecoder.decode(pair,"UTF-8"),null);
			}else{
				String name = URLDecoder.decode(pair.substring(0, idx), "UTF-8");
				String value = URLDecoder.decode(pair.substring(idx + 1), "UTF-8");
				int split_index = name.indexOf('>');
				if(split_index!=-1){
					String second_entity = URLDecoder.decode(name.substring(0, split_index), "UTF-8");
					String second_entity_propertie = URLDecoder.decode(name.substring(split_index + 1), "UTF-8");
					Map<String, String> second_result = new HashMap<String, String>();
					second_result.put(second_entity_propertie, value);
					List<Object> list = null;
					if(result.containsKey(second_entity)){
						list = (List<Object>) result.get(second_entity);
					}else{
						list = new ArrayList<Object>();
					}
					list.add(second_result);
					result.put(second_entity,list);
					
				}else{
					result.put(name, value);
				}
			}
		}
	
		//Map<String, String> map = result.toSingleValueMap();
		String json = JSONObject.toJSONString(result);
		System.out.println(json);
	}
	
	public void test() throws Exception{

		String url ="userName.aaa=aaa&passWd=111&userName.aaa=222";
		String[] pairs = StringUtils.tokenizeToStringArray(url, "&");
		MultiValueMap<String, Object> result = new LinkedMultiValueMap<String, Object>();
		for(String pair: pairs){
			int idx = pair.indexOf('=');
			if(idx == -1){
				result.add(URLDecoder.decode(pair,"UTF-8"),null);
			}else{
				String name = URLDecoder.decode(pair.substring(0, idx), "UTF-8");
				String value = URLDecoder.decode(pair.substring(idx + 1), "UTF-8");
				int split_index = name.indexOf('.');
				if(split_index!=-1){
					String second_entity = URLDecoder.decode(name.substring(0, split_index), "UTF-8");
					String second_entity_propertie = URLDecoder.decode(name.substring(split_index + 1), "UTF-8");
					MultiValueMap<String, String> second_result = new LinkedMultiValueMap<String, String>();
					second_result.add(second_entity_propertie, value);
					result.add(second_entity,second_result);
					
				}else{
					result.add(name, value);
				}
				
			}
		}
		Map<String, Object> map = result.toSingleValueMap();
		String json = JSONObject.toJSONString(map);
		System.out.println(json);
	
	}
	
	public static void main(String[] args) {
		MapToEntity mapToEntity = new MapToEntity();
		try {
			mapToEntity.mapToEntity();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
