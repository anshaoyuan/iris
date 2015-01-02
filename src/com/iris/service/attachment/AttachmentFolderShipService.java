package com.iris.service.attachment;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iris.entity.AttachmentFolderShip;
import com.iris.repository.attachment.AttachmentFolderShipDao;
import com.iris.service.BaseService;

/**
 * 
 * @author head-master
 *
 */
@Service
@Transactional
public class AttachmentFolderShipService extends BaseService{

	@Autowired
	AttachmentFolderShipDao shipDao;
	@Autowired
	private static Logger logger = LoggerFactory.getLogger(AttachmentFolderShipService.class);
	
	/**
	 * 保存文件与文件夹的关系
	 * @param ship
	 * @return
	 */
	public Long saveAttachmentFolderShip(AttachmentFolderShip ship){
		AttachmentFolderShip attachmentFolderShip = shipDao.findShipByAttachIdFolderId(ship.getAttachmentId(),ship.getFolderId());
		if(null != attachmentFolderShip){
			logger.error("文件夹不存在");
			return attachmentFolderShip.getId();
		}
		shipDao.save(ship);
		return ship.getId();
	}
	
	/**
	 * 根据关系id删除关系
	 * @param id
	 */
	public void delete(Long id) {
		shipDao.delete(id);
		
	}

	/**
	 * 根据关系id查询关系
	 * @param id
	 * @return
	 */
	public AttachmentFolderShip findById(Long id) {
		return shipDao.findOne(id);
	}
	
	/**
	 * 根据文件夹id查询出文件夹下的文件
	 * @param folderId
	 * @return
	 */
	public List<AttachmentFolderShip> findAttachmentByFolderId(long folderId){
		return shipDao.findAttachmentByFolderId(folderId);
	}
	
	/**
	 * 根据附件id删除关系
	 * @param attachmentId
	 */
	public void deleteShipByAttachId(long attachmentId){
		shipDao.deleteShipByAttachId(attachmentId);
	}
	
	/**
	 * 根据附件id和文件夹id查找关系数据
	 * @param attachment
	 * @param folder
	 * @return
	 */
	public AttachmentFolderShip findShipByAttachmentIdAndFolderId(long attachId, long folderId){
		return shipDao.findShipByAttachIdFolderId(attachId, folderId);
	}

}
