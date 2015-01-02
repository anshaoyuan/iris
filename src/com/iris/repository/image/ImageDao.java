package com.iris.repository.image;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.Image;

public interface ImageDao extends PagingAndSortingRepository<Image, Long>, JpaSpecificationExecutor<Image>  {
	
	
}
