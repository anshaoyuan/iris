package com.iris.repository.attachment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.AttachmentFolderShip;

public interface AttachmentFolderShipDao extends PagingAndSortingRepository<AttachmentFolderShip, Long>, JpaSpecificationExecutor<AttachmentFolderShip>  {
	@Query(value="from AttachmentFolderShip where attachmentId = ?1 and folderId= ?2")
	AttachmentFolderShip findShipByAttachIdFolderId(long attachId,long folderId);

	@Query(value="from AttachmentFolderShip where folderId = ?1")
	List<AttachmentFolderShip> findAttachmentByFolderId(long folderId);
	
	@Modifying
	@Query(value="delete from s_attachment_folder_ship where attachment_id = ?1",nativeQuery=true)
	void deleteShipByAttachId(long attachmentId);

}
