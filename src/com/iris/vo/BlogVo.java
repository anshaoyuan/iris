package com.iris.vo;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.iris.entity.Attachment;
import com.utils.JsonDateSerializer;
import com.utils.PageInfo;
import com.utils.RegxUtil;

public class BlogVo extends BaseVo{

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
	private PageInfo pageInfo;
	private String userImgUrl;
	private Long mentionId;
	private Integer isSignup;

	/*---------额外字段-----------------*/
	
	private Date startDate;
	private Date endDate;
	private Integer commentCount;
	private String picture="";

	private String queryName;
	private List<Long> userIdList;
	private Integer hasStore;
	private String pictureWidth ;
	private String pictureHeight;
	
	private List<Attachment> fileList;
	
	public List<Attachment> getFileList() {
		return fileList;
	}
	public void setFileList(List<Attachment> fileList) {
		this.fileList = fileList;
	}
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
		if(streamContent!=null){
			List<String> list = RegxUtil.getImgStr(streamContent);
			if(list.size()>0){
				picture = list.get(0);
			}
			/*
			List<Map<String,String>> listWidth = RegxUtil.getImgWidthAndHeight(streamContent);
			if(listWidth.size()>0){
				Map<String, String> map = listWidth.get(0);
				pictureWidth= map.get("width");
				pictureHeight = map.get("height");
			}*/
		}
		
		
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
	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	@JsonSerialize(using = JsonDateSerializer.class)
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
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
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
	public PageInfo getPageInfo() {
		return pageInfo;
	}
	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}
	public String getUserImgUrl() {
		return userImgUrl;
	}
	public void setUserImgUrl(String userImgUrl) {
		this.userImgUrl = userImgUrl;
	}

	public Long getMentionId() {
		return mentionId;
	}
	public void setMentionId(Long mentionId) {
		this.mentionId = mentionId;
	}
	public Integer getCommentCount() {
		return commentCount;
	}
	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}


	public String getQueryName() {
		return queryName;
	}
	public void setQueryName(String queryName) {
		this.queryName = queryName;
	}
	
	
	public List<Long> getUserIdList() {
		return userIdList;
	}
	public void setUserIdList(List<Long> userIdList) {
		this.userIdList = userIdList;
	}

	public Integer getHasStore() {
		return hasStore;
	}
	public void setHasStore(Integer hasStore) {
		this.hasStore = hasStore;
	}
	public Integer getIsSignup() {
		return isSignup;
	}
	public void setIsSignup(Integer isSignup) {
		this.isSignup = isSignup;
	}
	public String getPictureWidth() {
		return pictureWidth;
	}
	public void setPictureWidth(String pictureWidth) {
		this.pictureWidth = pictureWidth;
	}
	public String getPictureHeight() {
		return pictureHeight;
	}
	public void setPictureHeight(String pictureHeight) {
		this.pictureHeight = pictureHeight;
	}

	
	
	
}
