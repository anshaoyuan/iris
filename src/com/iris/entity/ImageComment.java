package com.iris.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.utils.JsonDateSerializer;

import core.entity.BaseEntity;

@Entity
@Table(name="s_image_comment")
public class ImageComment extends BaseEntity<Long> {

	private Long userId;
	private Long imageOwnId;
	private String commentContent;
	private Date createDate;
	private Long imageId;
	private String userName;
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getImageOwnId() {
		return imageOwnId;
	}
	public void setImageOwnId(Long imageOwnId) {
		this.imageOwnId = imageOwnId;
	}
	public String getCommentContent() {
		return commentContent;
	}
	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}
	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Long getImageId() {
		return imageId;
	}
	public void setImageId(Long imageId) {
		this.imageId = imageId;
	}
	
	@Formula("(select u.login_name from t_user u where u.id = user_id)")
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
	
	
	
}
