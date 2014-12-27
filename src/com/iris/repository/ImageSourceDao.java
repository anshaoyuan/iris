package com.iris.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.ImageSource;

public interface ImageSourceDao  extends PagingAndSortingRepository<ImageSource, Long>,JpaSpecificationExecutor<ImageSource>{

	@Modifying
	@Query("delete from ImageSource where sourceType = ?1 and sourceId= ?2")
	void deleteBySource(Integer sourceType,Long sourceId);
}
