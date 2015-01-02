package com.iris.repository.image;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.ImageFolder;

public interface ImageFolderDao extends PagingAndSortingRepository<ImageFolder, Long>, JpaSpecificationExecutor<ImageFolder>  {

	@Query(value="from ImageFolder where isDefault=1 and folderType= 3 and createBy= ?1")
	ImageFolder findUserDefaultFolder(Long id);
	
	@Query(value="from ImageFolder where isDefault=1 and folderType= 2 and teamId= ?1")
	ImageFolder findTeamDefaultFolder(Long teamId);

	@Query(value="from ImageFolder where isDefault=1 and folderType= 1")
	ImageFolder findSystemDefaultFolder();

	@Query(value="from ImageFolder where id = ?1")
	ImageFolder findImageFolderByFolderId(Long imageFolderId);
}
