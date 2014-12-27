package com.iris.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.Mention;

public interface MentionDao extends PagingAndSortingRepository<Mention, Long>, JpaSpecificationExecutor<Mention>  {
	Mention getByRefIdAndUserIdAndRefType(Long refId,Long userId,Integer refType);
	
}
