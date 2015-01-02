package com.iris.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.google.common.collect.Lists;
import com.utils.JsonDateSerializer;
import com.utils.PageInfo;
import com.utils.UploadUtil;

/**
 * 
 * @author head-master
 *
 */

@Entity
@Table(name="s_image_folder")
public class ImageFolder extends IdEntity {

	private String folderName;
	private String folderType;
	private String remark;
	private String isDefault;
	
	private Long createBy;
	private Long teamId;
	
	private Date createDate;
	
	private List<Image> imageList = Lists.newArrayList();

	private Long orgId;
	
	private String coverImgeUrl;
	
	public String getCoverImgeUrl() {
		return coverImgeUrl;
	}
	
	public void setCoverImgeUrl(String coverImgeUrl) {
		this.coverImgeUrl = coverImgeUrl;
	}
	
	@Transient
	public String getImageFolderCover(){
		return UploadUtil.GetDownloadPath() + coverImgeUrl;
	}

	//分页信息
	private PageInfo pageInfo;

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public String getFolderType() {
		return folderType;
	}

	public void setFolderType(String folderType) {
		this.folderType = folderType;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(String isDefault) {
		this.isDefault = isDefault;
	}

	public Long getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Long createBy) {
		this.createBy = createBy;
	}



	public Long getTeamId() {
		return teamId;
	}

	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}
	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	
	
	@Transient
	public PageInfo getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}

	@ManyToMany(cascade={CascadeType.MERGE},fetch = FetchType.EAGER)
	@JoinTable(name = "s_image_folder_ship", joinColumns = { @JoinColumn(name = "folder_id") }, inverseJoinColumns = { @JoinColumn(name = "image_id") })
	@Fetch(FetchMode.SUBSELECT)
	@OrderBy("id DESC")
	public List<Image> getImageList() {
		return imageList;
	}

	public void setImageList(List<Image> imageList) {
		this.imageList = imageList;
	}
	
}
