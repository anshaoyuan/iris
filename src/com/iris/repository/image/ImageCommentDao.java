package com.iris.repository.image;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.ImageComment;

public interface ImageCommentDao  extends PagingAndSortingRepository<ImageComment, Long>, JpaSpecificationExecutor<ImageComment>  {

}
