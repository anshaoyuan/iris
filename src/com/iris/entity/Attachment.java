package com.iris.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.utils.JsonDateSerializer;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;
import com.utils.string.StringPool;

import core.entity.BaseEntity;

/**
 * 附件
 * @author head-master
 *
 */

@Entity
@Table(name="s_attachment")
public class Attachment extends BaseEntity<Long> {

	private String resourceName;
	private String resourceUrl;

	private Long size;		//byte
	private String urlType;

	private Long userId;
	
	private Date createDate;
	
	private Long orgId;
	
	private String htmlPath;
	
	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}
	
	@Transient
	public String getFileType(){
		String defalutType = "default_file";
		if(StringUtils.isNotBlank(resourceName)){
			int dtIndex = resourceName.lastIndexOf(StringPool.PERIOD);
			String fileType = resourceName.substring(dtIndex + 1);
			if(!fileType.equals("doc") && !fileType.equals("docx")
			&& !fileType.equals("txt")	 && !fileType.equals("xls")	
			&& !fileType.equals("zip")	 && !fileType.equals("xlsx")	
			&& !fileType.equals("ppt")	 && !fileType.equals("pptx")	
			&& !fileType.equals("pdf")
			){
				return defalutType;
			}
			return fileType;
		}
		return defalutType;
	}

	@Transient
	public String getShortName(){
		if(StringUtils.isNotBlank(resourceName) && resourceName.length() > 10){
			return resourceName.substring(0, 10) + "...";
		}
		return resourceName;
	}
	
	public String getHtmlPath() {
		return htmlPath;
	}

	public void setHtmlPath(String htmlPath) {
		this.htmlPath = htmlPath;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resouceName) {
		this.resourceName = resouceName;
	}

	public String getResourceUrl() {
		return resourceUrl;
	}
	@Transient
	public String getResourceUri(){
		return PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + resourceUrl;
	}

	public void setResourceUrl(String resouceUrl) {
		this.resourceUrl = resouceUrl;
	}



	public Long getSize() {
		//TODO 这里需要将字节转换成 kb 或者 M 
		return size;
	}

	public void setSize(Long size) {
		this.size = size;
	}

	public String getUrlType() {
		return urlType;
	}

	public void setUrlType(String urlType) {
		this.urlType = urlType;
	}


	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}


	
}
