package com.iris.service.attachment;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.constant.KeyWord;
import com.iris.entity.Attachment;
import com.iris.entity.AttachmentFolderShip;
import com.iris.service.BaseService;
@Service

public class AttachmentHelpService extends BaseService{
	
	@Autowired
	private AttachmentFolderService folderService;
	@Autowired
	private AttachmentFolderShipService shipService;
	
	@Autowired
	AttachmentService attachmentService;
	
	public AttachmentFolderService getFolderService() {
		return folderService;
	}


	public AttachmentFolderShipService getShipService() {
		return shipService;
	}

	public AttachmentService getAttachmentService() {
		return attachmentService;
	}


	/**
	 * 保存文件到我的默认文件夹下
	 * @param attachment
	 * @return
	 */
	public long saveAttachment(Attachment attachment) {
		Long defaultFolderId = folderService.getDefaultFolder(attachment.getUserId());
		return this.saveAttachment(attachment, defaultFolderId);
	}
	
	/**
	 * 将附件保存到指定文件夹下
	 * @param attachment
	 * @param folderId
	 * @return
	 */
	public long saveAttachment(Attachment attachment,long folderId){
		attachmentService.saveAttachment(attachment);
		AttachmentFolderShip ship = new AttachmentFolderShip();
		ship.setAttachmentId(attachment.getId());
		ship.setFolderId(folderId);
		ship.setUserId(attachment.getUserId());
		shipService.saveAttachmentFolderShip(ship);
		return attachment.getId();
	}
	
	/**
	 * 根据关系从文件夹中删除附件
	 * @param shipId
	 */
	public void deleteAttachment(Long shipId,Long userId){
		AttachmentFolderShip ship = shipService.findById(shipId);
		Attachment attachment = attachmentService.findAttachmentById(ship.getAttachmentId());
		//如果是附件创建者删除，则将文件的所有关系全部删除，并且除文件
		if(attachment.getUserId().equals(userId)){
			this.deleteAttachmentShipByAttachmentId(attachment.getId());
		}else{
			//否则只是删除一条关系
			shipService.delete(shipId);
		}
		
	}
	
	/**
	 * 根据附件id删除该附件及该附件的所有关系
	 * @param attachmentId
	 */
	public void deleteAttachmentShipByAttachmentId(long attachmentId){
		shipService.deleteShipByAttachId(attachmentId);
		attachmentService.deleteById(attachmentId);
	}
	
	/**
	 * 根据文件保存到附件表,并建产文件夹关系
	 * @param file 
	 * @param userId 上传者id
	 * @param folderId 可以为空，则保存到默认文件夹
	 * @return
	 */
	public long saveFile(File file,long userId,Long folderId,String OriginalFilename,String filePath){
		Attachment attachment = new Attachment();
		attachment.setResourceName(OriginalFilename);
		attachment.setResourceUrl(filePath);
		attachment.setSize(file.length());
		attachment.setUrlType(KeyWord.LOCAL_ATTACHMENT);
		attachment.setUserId(userId);
		if(null==folderId){
			this.saveAttachment(attachment);
		}else{
			this.saveAttachment(attachment, folderId);
		}
		
		return attachment.getId();
	}


	public void moveFile(Long fileId, Long oldFolderId, Long newFolderId, Long userId) {
		AttachmentFolderShip ship = getShipService().findShipByAttachmentIdAndFolderId(fileId, oldFolderId);
		ship.setFolderId(newFolderId);
		shipService.saveAttachmentFolderShip(ship);
	}
	
	
	
}
