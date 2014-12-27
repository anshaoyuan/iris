package com.iris.repository.attachment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.AttachmentFolder;

public interface AttachmentFolderDao extends PagingAndSortingRepository<AttachmentFolder, Long>, JpaSpecificationExecutor<AttachmentFolder>  {

	@Query(value="from AttachmentFolder where userId = ?1 and isDefault=1 and teamId is null and delFlag = 0")
	AttachmentFolder findDefaultFolderByUserId(long userId);
	
	@Query(value="from AttachmentFolder where userId = ?1 and delFlag = 0 and teamId is null")
	List<AttachmentFolder> findFolderByUserId(long userId);
	
	@Query(value="from AttachmentFolder where teamId = ?1 and isDefault=1 and delFlag = 0")
	AttachmentFolder findDefalutFolderByTeamId(Long teamId);
}
