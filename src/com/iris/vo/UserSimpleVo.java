package com.iris.vo;

import com.utils.UploadUtil;


public class UserSimpleVo extends BaseVo{

	public UserSimpleVo(){
		
	}
	
	public UserSimpleVo(Long id){
		this.id = id;
	}
	
	private String aliasName;
	private Long orgId;
	private String title;
	private String imageUrl;
	private Long phoneNumber;
	private Integer viewPhone; 

	public String getAliasName() {
		return aliasName;
	}

	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}

	public Long getOrgId() {
		return orgId;
	}

	public void setOrgId(Long orgId) {
		this.orgId = orgId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImageUrl() {
		if(imageUrl==null){
			return null;
		}
		return UploadUtil.GetDownloadPath() + imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	public Integer getViewPhone() {
		return viewPhone;
	}

	public void setViewPhone(Integer viewPhone) {
		this.viewPhone = viewPhone;
	}

	@Override
	public boolean equals(Object obj) {
		if( null== obj||!( obj instanceof UserSimpleVo)){
			return false;
		}
		UserSimpleVo user = (UserSimpleVo)obj;
		if(user.getId()==null){
			return false;
		}
		return user.getId().equals(this.id);
	}

}
