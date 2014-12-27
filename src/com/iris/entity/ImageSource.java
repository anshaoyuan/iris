package com.iris.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name="s_image_source")
public class ImageSource extends IdEntity{
	
	private static final long serialVersionUID = 2742472057600679306L;
	private Long imageId;
	private Long sourceId;
	private Integer sourceType;
	private Long createId;
	private Date createDate;
	private Long orgId;
	private String sortDisc;
	public Long getImageId() {
		return imageId;
	}
	public void setImageId(Long imageId) {
		this.imageId = imageId;
	}
	public Long getSourceId() {
		return sourceId;
	}
	public void setSourceId(Long sourceId) {
		this.sourceId = sourceId;
	}
	public Integer getSourceType() {
		return sourceType;
	}
	public void setSourceType(Integer sourceType) {
		this.sourceType = sourceType;
	}
	public Long getCreateId() {
		return createId;
	}
	public void setCreateId(Long createId) {
		this.createId = createId;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public String getSortDisc() {
		return sortDisc;
	}
	public void setSortDisc(String sortDisc) {
		this.sortDisc = sortDisc;
	}
	
	
}
