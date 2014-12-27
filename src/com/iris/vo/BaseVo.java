package com.iris.vo;

import java.io.Serializable;

import com.utils.PageInfo;

public abstract class BaseVo implements Serializable{
	protected static final long serialVersionUID = -1373760761780840081L;

	protected Long id;
	//分页信息
	private com.utils.PageInfo pageInfo;
		
		
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	public PageInfo getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}
	
	
}
