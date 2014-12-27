package com.iris.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iris.entity.Mention;
import com.iris.repository.MentionDao;

@Service
@Transactional
public class MentionService extends BaseService{
	

	@Autowired
	private MentionDao mentionDao;

	
	


	
	/**
	 * 添加赞方法
	 * @param mention
	 * @return
	 */
	public Long saveMention(Mention mention){
		mentionDao.save(mention);
		return mention.getId();
		
	}
	/**
	 * 根据类型，用户id，资源id查询赞
	 * @param mention
	 * @return
	 */
	public Mention findMentionByTypeUserId(Mention mention){
		return  mentionDao.getByRefIdAndUserIdAndRefType(mention.getRefId(), mention.getUserId(),mention.getRefType());
	}

	
	public void deleteMention(Long id){
		mentionDao.delete(id);
	}
}
