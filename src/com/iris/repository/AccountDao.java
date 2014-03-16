package com.iris.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.iris.entity.Account;

public interface AccountDao  extends PagingAndSortingRepository<Account, Long>, JpaSpecificationExecutor<Account> {

	@Query("from Account where loginName = :loginName and passwd = :passwd and isLock=0")
	Account findByLoginNamePasswd(@Param("loginName")String loginName,@Param("passwd")String passwd);

}
