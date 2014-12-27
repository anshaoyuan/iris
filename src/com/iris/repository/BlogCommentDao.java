package com.iris.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.BlogComment;

public interface BlogCommentDao extends PagingAndSortingRepository<BlogComment, Long>,JpaSpecificationExecutor<BlogComment>{

	List<BlogComment> findByBlogIdAndDelFlag(Long blogId,Integer delFlag);

}
