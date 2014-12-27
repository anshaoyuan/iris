package com.iris.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.iris.entity.Blog;

public interface BlogDao extends PagingAndSortingRepository<Blog, Long>, JpaSpecificationExecutor<Blog>  {

	@Query("from Blog where createBy = :userId and orgId = :orgId and isDraft=1 and isSignup=0")
	List<Blog> findDrafts(@Param("userId") Long userId,@Param("orgId") Long orgId);
	
/*	@Query("select b from Blog b ,IntegralTotal i where i.refId = b.id and "
			+ "i.objType=2 and b.delFlag = 0 and b.isDraft=0 and b.isSignup=0 and b.orgId=:orgId order by i.integralTotal desc")
	List<Blog> findHopBlog(@Param("orgId") Long orgId,Pageable page);*/
	
	@Query("select b,(select m.id from Mention m where m.userId=:queryUserId and m.refType=4 and m.refId = b.id and m.delFlag=0), " +
			"'1' from Blog b "
			+ " where b.id = :blogId and b.delFlag = 0 ")
	Object[] findBlogVoById(@Param("blogId") Long blogId,@Param("queryUserId") Long queryUserId);

	/*@Modifying
	@Query(value="update Blog set createName = ?2,updateDate=?3  where createBy=?1")
	void updateCreateByByCreateId(Long createBy,
			 String createName,Date updateDate);
*/
	@Query("select count(b.id) from Blog b where b.createBy =?1 and b.isDraft = 0 and b.delFlag = 0 and b.isSignup=0")
	int getBlogCountByUserId(Long userId);


}