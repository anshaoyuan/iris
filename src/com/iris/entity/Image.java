package com.iris.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;


import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.common.collect.Lists;
import com.utils.JsonDateSerializer;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;

import core.entity.BaseEntity;
/**
 * 图片
 * @author head-master
 *
 */

@Entity
@Table(name="s_image")
public class Image extends BaseEntity<Long> {

	private String name;
	private String type;
	private Integer width;
	private Integer height;
	private Integer commentCount;
	private Integer praiseCount;
	
//	private Long streamId;
	
	private Long createId;
	private Date createDate;
	
	private String minUrl;
	private String midUrl;
	private String maxUrl;
	private String remark;
	private String mobileUrl;
	private Long size;
	private Long orgId;
	

	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getWidth() {
		return width;
	}
	public void setWidth(Integer width) {
		this.width = width;
	}
	public Integer getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public Integer getCommentCount() {
		return commentCount==null ? 0 : commentCount;
	}
	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}
	public Integer getPraiseCount() {
		return praiseCount == null ? 0 : praiseCount;
	}
	public void setPraiseCount(Integer praiseCount) {
		this.praiseCount = praiseCount;
	}
	public Long getCreateId() {
		return createId;
	}
	public void setCreateId(Long createId) {
		this.createId = createId;
	}
	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getMinUrl() {
		return minUrl;
	}
	@Transient
	public String getMinUri(){
		return PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + minUrl;
	}
	public void setMinUrl(String minUrl) {
		this.minUrl = minUrl;
	}
	public String getMidUrl() {
		return midUrl;
	}
	@Transient
	public String getMidUri(){
		return PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + midUrl;
	}
	public void setMidUrl(String midUrl) {
		this.midUrl = midUrl;
	}
	public String getMaxUrl() {
		return maxUrl;
	}
	@Transient
	public String getMaxUri(){
		return PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + maxUrl;
	}
	public void setMaxUrl(String maxUrl) {
		this.maxUrl = maxUrl;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Override
	public boolean equals(Object obj) {
		if( null== obj||!( obj instanceof Image)){
			return false;
		}
		Image image = (Image)obj;
		if(image.getId()==null){
			return false;
		}
		return image.getId().equals(this.id);
	}
	@Transient
	public String getMobileUri(){
		return PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + mobileUrl;
	}
	public String getMobileUrl() {
		return mobileUrl;
	}
	public void setMobileUrl(String mobileUrl) {
		this.mobileUrl = mobileUrl;
	}
	public Long getSize() {
		return size;
	}
	public void setSize(Long size) {
		this.size = size;
	}

	
	@Transient
	public String getAbsoluteImagePath() {
		if(StringUtils.isBlank(midUrl)){
			return "";
		}
		return PropsUtil.getProperty("service.domain") + PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + midUrl;
	}
}
