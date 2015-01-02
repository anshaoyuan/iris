package com.iris.service.attachment;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iris.entity.Attachment;
import com.iris.repository.attachment.AttachmentDao;
import com.iris.service.BaseService;


@Service
@Transactional
public class AttachmentService  extends BaseService{
	
	
	@Autowired
	private AttachmentDao attachmentDao;
	
	private static Logger _log = LoggerFactory.getLogger(AttachmentService.class);
	/**
	 * 保存附件
	 * @param attachment
	 * @return
	 */
	public long saveAttachment(Attachment attachment){
		attachmentDao.save(attachment);
		return attachment.getId();
		
	}

	/**
	 * 删除附件
	 * @param id
	 */
	public void deleteById(Long id) {
		attachmentDao.delete(id);
	}
	
	/**
	 * 根据附件id查询附件
	 * @param attachmentId
	 * @return
	 */
	public Attachment findAttachmentById(Long attachmentId){
		return attachmentDao.findOne(attachmentId);
	}
	
	public List<Attachment> findAttachmentByFolderId(Long folderId){
		return attachmentDao.findAttachmentByFolderId(folderId);
	}

	/**
	 * 根据引用类型和引用id查询
	 * @param refId
	 * @param refType
	 * @return
	 */

	public List<Attachment> findAttachmentByRefIdRefType(Long refId,String refType){
		return attachmentDao.findAttachmentByRefIdRefType(refId,refType);
	}


}
