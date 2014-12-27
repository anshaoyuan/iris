package com.utils;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;


public class PageInfo {
	private int pageNumber;
	private int pageSize;
	private Direction sortType = Direction.DESC;
	private String sortTypeStr = "DESC";
	//默认根据id排序
	private String sortColumn = "id";
	
	private int totalCount;
	private PageRequest pageRequest ;
	
	private List<Order> orders;
	
	
	public PageInfo(){
		
	}
	public PageInfo(int pageNumber,int pageSize,Direction sortType){
		this.pageNumber = pageNumber;
		this.pageSize   = pageSize;
		this.sortType   = sortType;
	}
	public PageInfo(int pageNumber,int pageSize,String sortColumn,Direction sortType){
		this.pageNumber = pageNumber;
		this.pageSize   = pageSize;
		this.sortType   = sortType;
		this.sortColumn   = sortColumn;
	}
	public int getPageNumber() {
		return pageNumber==0?1:pageNumber;
	}
	public PageInfo setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
		return this;
	}
	public int getPageSize() {
		return pageSize==0?10:pageSize;
	}
	public PageInfo setPageSize(int pageSize) {
		this.pageSize = pageSize;
		return this;
	}

	public Direction getSortType() {
		return sortType;
	}
	public PageInfo setSortType(Direction sortType) {
		this.sortType = sortType;
		return this;
	}
	public String getSortColumn() {
		return sortColumn;
	}
	public PageInfo setSortColumn(String sortColumn) {
		this.sortColumn = sortColumn;
		return this;
	}
	
	public PageRequest getPageRequestInfo(){
		if(Validator.isNotNull(sortColumn)){
			if ("auto".equals(sortColumn)) {
				sortColumn = "id";
			}
			Sort sort = new Sort(sortType,sortColumn);
			pageRequest = new PageRequest(pageNumber -1 , pageSize, sort);
		}else{
			pageRequest = new PageRequest(pageNumber -1 , pageSize);
		}
		return pageRequest;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public String getSortTypeStr() {
		return sortTypeStr;
	}
	public void setSortTypeStr(String sortTypeStr) {
		this.sortTypeStr = sortTypeStr;
	}
	public List<Order> getOrders() {
		return orders;
	}
	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public int getCurrentPageNumber() {
		return (this.getPageNumber()-1) * this.getPageSize();
	}
	
	
}
