package com.iris.repository.attachment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.AttachmentRef;

public interface AttachmentRefDao extends PagingAndSortingRepository<AttachmentRef, Long>, JpaSpecificationExecutor<AttachmentRef>  {
	@Modifying
	@Query("delete from AttachmentRef where refId = ?1")
	void deleteByRefId(Long refId);
	
	@Modifying
	@Query("delete from AttachmentRef where refId = ?2 and attachmentId = ?1")
	void deleteByAttachIdRef(Long attachId, Long refId);
	
	@Query("select a from AttachmentRef a where a.refId = ?1 and a.refType=?2")
	List<AttachmentRef> getAttachmentRefByRefIdAndType(Long refId, String refType);

}
