package com.iris.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.iris.service.UserInfoService;

@Entity
@Table(name = "s_mention")
public class Mention extends IdEntity {

	private static final long serialVersionUID = 8604876834564318089L;

	private Long refId;
	private Integer refType;
	private Long refOwnId;
	private Date createDate;
	private Long userId;
	private String userName;
	private Long realHandler;
	private Long orgId;
	private Integer delFlag=0;
	
	public Long getRefId() {
		return refId;
	}
	public void setRefId(Long refId) {
		this.refId = refId;
	}
	public Integer getRefType() {
		return refType;
	}
	public void setRefType(Integer refType) {
		this.refType = refType;
	}
	public Long getRefOwnId() {
		return refOwnId;
	}
	public void setRefOwnId(Long refOwnId) {
		this.refOwnId = refOwnId;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	@Transient
	public String getUserName() {
		return UserInfoService.getUserName(userId);
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	@Transient
	public Long getRealHandler() {
		return realHandler;
	}
	public void setRealHandler(Long realHandler) {
		this.realHandler = realHandler;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public Integer getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	
	
}
