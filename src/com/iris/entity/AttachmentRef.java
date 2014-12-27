package com.iris.entity;

import javax.persistence.Entity;
import javax.persistence.Table;



/**
 * 附件与资源关系
 * @author head-master
 *
 */

@Entity
@Table(name="s_attachment_ref")
public class AttachmentRef extends IdEntity{
	
	private Long refId;
	private Long attachmentId;
	private String refType;
	
	public Long getRefId() {
		return refId;
	}
	public void setRefId(Long refId) {
		this.refId = refId;
	}
	public Long getAttachmentId() {
		return attachmentId;
	}
	public void setAttachmentId(Long attachmentId) {
		this.attachmentId = attachmentId;
	}
	public String getRefType() {
		return refType;
	}
	public void setRefType(String refType) {
		this.refType = refType;
	}
	
	

}
