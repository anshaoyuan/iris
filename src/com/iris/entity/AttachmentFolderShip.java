package com.iris.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

/**
 * 文件与文档的关系
 * @author head-master
 *
 */

@Entity
@Table(name="s_attachment_folder_ship")
public class AttachmentFolderShip extends IdEntity{

	private long attachmentId;
	private long folderId;
	private long userId;
	
	private Date createDate;
	private String attachmentName;

	public long getAttachmentId() {
		return attachmentId;
	}

	public void setAttachmentId(long attachmentId) {
		this.attachmentId = attachmentId;
	}

	public long getFolderId() {
		return folderId;
	}

	public void setFolderId(long folderId) {
		this.folderId = folderId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	@Formula("(select a.resource_name from s_attachment a where a.id = attachment_id)")
	public String getAttachmentName() {
		return attachmentName;
	}

	public void setAttachmentName(String attachmentName) {
		this.attachmentName = attachmentName;
	}
	
	
}
