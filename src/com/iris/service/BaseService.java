package com.iris.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springside.modules.mapper.JsonMapper;

import com.exception.RestException;



public abstract class BaseService {
	
	protected JsonMapper mapper = new JsonMapper();
	
	/**
	 * 创建分页请求.
	 */
	protected PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType) {
		Sort sort = null;
		if ("auto".equals(sortType)||"id".equals(sortType)) {
			sort = new Sort(Direction.DESC, "id");
		} else if(sortType!=null) {
			sort = new Sort(Direction.ASC, sortType);
		}

		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	
	protected PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType,String directionStr) {
		Direction direction = Direction.DESC;
		if(directionStr!=null&&"asc".equals(directionStr.toLowerCase())){
			direction = Direction.ASC;
		}
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(direction, "id");
		} else if(sortType!=null) {
			sort = new Sort(direction, sortType);
		}

		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	
	protected PageRequest buildPageRequest(int pageNumber, int pagzSize, String sortType,Direction direction) {
		
		Sort sort = null;
		if ("auto".equals(sortType)) {
			sort = new Sort(direction, "id");
		} else if(sortType!=null) {
			sort = new Sort(direction, sortType);
		}

		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}
	
	protected PageRequest buildPageRequest(int pageNumber, int pagzSize, List<Order> orders) {
		Sort sort = new Sort(orders);
	
		return new PageRequest(pageNumber - 1, pagzSize, sort);
	}

	protected static void throwException(String code,String msg){
		Map<String,String> response = new HashMap<String,String>();
		response.put("code", code);
		response.put("msg", msg);
		throw new RestException(response);
	}
}
