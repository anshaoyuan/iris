package com.iris.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.utils.JsonDateSerializer;
import com.utils.UploadUtil;

/**
 * 文档文件夹
 * @author head-master
 *
 */

@Entity
@Table(name="s_attachment_folder")
public class AttachmentFolder extends IdEntity {

	private String folderName;
	private String remark;
	private String isDefault;
	//默认没有删除
	private int delFlag;
	
	private Long userId;
	private Long parentId;
	
	private Long orgId;
	
	private Long teamId;
	private Date createDate;
	private Date updateDate;
	
	private String coverImgeUrl;
	
	@Transient
	public String getFolderCoverUrl(){
		return UploadUtil.GetDownloadPath() + coverImgeUrl;
	}
	public String getCoverImgeUrl() {
		return coverImgeUrl;
	}

	public void setCoverImgeUrl(String coverImgeUrl) {
		this.coverImgeUrl = coverImgeUrl;
	}

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
	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public int getDelFlag() {
		return delFlag;
	}

	public void setDelFlag(int delFlag) {
		this.delFlag = delFlag;
	}

}
