package com.iris.service.attachment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iris.entity.AttachmentRef;
import com.iris.repository.attachment.AttachmentRefDao;

@Service
@Transactional
public class AttachmentRefService {
	
	@Autowired
	AttachmentRefDao attachmentRefDao;
	
	/**
	 * 保存附件与资源的关系
	 * @param attachmentRef
	 * @return
	 */
	public Long saveAttachmentRef(AttachmentRef attachmentRef){
		this.attachmentRefDao.save(attachmentRef);
		return attachmentRef.getId();
	}
	
	/**
	 * 根据资源id删除 
	 * @param refId
	 */
	public void deleteAttachmentRef(Long refId){
		this.attachmentRefDao.deleteByRefId(refId);
	}

	/**
	 * 根据附件 id与资源id删除
	 * @param attachId
	 * @param refId
	 */
	public void deleteAttachmentByAttachIdRef(Long attachId,Long refId){
		this.attachmentRefDao.deleteByAttachIdRef(attachId,refId);
	}
}
