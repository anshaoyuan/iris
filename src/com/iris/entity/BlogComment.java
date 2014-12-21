package com.iris.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.utils.JsonDateSerializer;

import core.entity.BaseEntity;

@Entity
@Table(name="s_blog_comment")
public class BlogComment extends BaseEntity<Long>{
	
	private Long blogId;
	private String commentText;
	private String commentHtml;
	private String userName;
	private Long userId;
	private Long parentId;
	private Date createDate;
	private Date deleteDate;
	private Integer delFlag;
	
	private Long orgId;
	
	
	public Long getBlogId() {
		return blogId;
	}
	public void setBlogId(Long blogId) {
		this.blogId = blogId;
	}
	public String getCommentText() {
		return commentText;
	}
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}
	public String getCommentHtml() {
		return commentHtml;
	}
	public void setCommentHtml(String commentHtml) {
		this.commentHtml = commentHtml;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getDeleteDate() {
		return deleteDate;
	}
	public void setDeleteDate(Date deleteDate) {
		this.deleteDate = deleteDate;
	}
	public Integer getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	
	@Transient
	public String getUserImgUrl() {	//用户头像url
	//	return UserInfoService.getUserImgUrl(this.userId);
		return null;
	}
	
}
