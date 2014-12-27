package com.iris.repository.attachment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.Attachment;



public interface AttachmentDao extends PagingAndSortingRepository<Attachment, Long>, JpaSpecificationExecutor<Attachment>  {

	@Query("select a from Attachment a,AttachmentRef b where a.id = b.attachmentId and  b.refId= ?1 and b.refType = ?2")
	List<Attachment> findAttachmentByRefIdRefType(Long refId, String refType);
	
	@Query(value="select a from Attachment a ,AttachmentFolder f, AttachmentFolderShip s  where a.id = s.attachmentId and f.id=s.folderId and f.id = ?1")
	List<Attachment> findAttachmentByFolderId(long folderId);
	
}
