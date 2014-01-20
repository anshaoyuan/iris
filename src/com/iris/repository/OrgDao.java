package com.iris.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.iris.entity.Org;


public interface OrgDao extends PagingAndSortingRepository<Org, Long>, JpaSpecificationExecutor<Org>  {

}
