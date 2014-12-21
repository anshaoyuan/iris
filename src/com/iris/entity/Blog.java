package com.iris.entity;


import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Formula;



@Entity
@Table(name="s_blog")
public class Blog extends IdEntity{
	private static final long serialVersionUID = -4623635639301765156L;
	
	private String titleName;
	private String streamContent;
	private String streamText;
	private Integer streamComefrom;
	private Long orgId;
	private Date createDate;
	private Date updateDate;
	private Long updateBy;
	private Long createBy;
	private String createName;
	private String updateName;
	private Integer praiseCount;
	private Integer delFlag;
	private Integer isDraft;
	private Integer isSignup;
	
	private List<Image> imgList;
	private List<Attachment> fileList;
	private Integer commentCount;
	
	public String getTitleName() {
		return titleName;
	}
	public void setTitleName(String titleName) {
		this.titleName = titleName;
	}
	public String getStreamContent() {
		return streamContent;
	}
	public void setStreamContent(String streamContent) {
		this.streamContent = streamContent;
	}
	public String getStreamText() {
		return streamText;
	}
	public void setStreamText(String streamText) {
		this.streamText = streamText;
	}
	public Integer getStreamComefrom() {
		return streamComefrom;
	}
	public void setStreamComefrom(Integer streamComefrom) {
		this.streamComefrom = streamComefrom;
	}
	public Long getOrgId() {
		return orgId;
	}
	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public Long getUpdateBy() {
		return updateBy;
	}
	public void setUpdateBy(Long updateBy) {
		this.updateBy = updateBy;
	}
	public Long getCreateBy() {
		return createBy;
	}
	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}
	public Integer getDelFlag() {
		return delFlag;
	}
	public void setDelFlag(Integer delFlag) {
		this.delFlag = delFlag;
	}
	
	public String getCreateName() {
		return createName;
	}
	public void setCreateName(String createName) {
		this.createName = createName;
	}
	public String getUpdateName() {
		return updateName;
	}
	public void setUpdateName(String updateName) {
		this.updateName = updateName;
	}
	public Integer getPraiseCount() {
		return praiseCount;
	}
	public void setPraiseCount(Integer praiseCount) {
		this.praiseCount = praiseCount;
	}
	public Integer getIsDraft() {
		return isDraft;
	}
	public void setIsDraft(Integer isDraft) {
		this.isDraft = isDraft;
	}
	@Transient
	public List<Attachment> getFileList() {
		return fileList;
	}
	public void setFileList(List<Attachment> fileList) {
		this.fileList = fileList;
	}
	@Transient
	public List<Image> getImgList() {
		return imgList;
	}
	public void setImgList(List<Image> imgList) {
		this.imgList = imgList;
	}
	
	@Transient
	public String getUserImgUrl() {	//用户头像url
		return null;
		//return UserInfoService.getUserImgUrl(this.createBy);
	}
	@Formula("(select count(1) from s_blog_comment sc where sc.blog_id= id and sc.del_flag = 0)")
	public Integer getCommentCount() {
		return commentCount;
	}
	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}
	public Integer getIsSignup() {
		return isSignup;
	}
	public void setIsSignup(Integer isSignup) {
		this.isSignup = isSignup;
	}

	

}


