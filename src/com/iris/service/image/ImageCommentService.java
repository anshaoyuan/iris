package com.iris.service.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iris.entity.Image;
import com.iris.entity.ImageComment;
import com.iris.repository.image.ImageCommentDao;
import com.iris.repository.image.ImageDao;

@Service
@Transactional
public class ImageCommentService {
	
	@Autowired
	ImageDao imageDao;
	
	@Autowired
	ImageCommentDao imageCommentDao;
	

	/**
	 * 保存图片评论
	 * @param imageComment
	 * @return 
	 */
	@Transactional(readOnly = false)
	public ImageComment saveImageComment(ImageComment imageComment){
		Image image = imageDao.findOne(imageComment.getImageId());
		imageComment.setImageOwnId(image.getCreateId());
		ImageComment comment = imageCommentDao.save(imageComment);
		//addMessage(comment,image.getMaxUri());
		image.setCommentCount(image.getCommentCount()+1);
		imageDao.save(image);
		return comment;
	}
	
	/**
	 * 删除评论
	 * @param imageComment
	 */
	@Transactional(readOnly = false)
	public void deleteImageComment(ImageComment imageComment){
		Image image = imageDao.findOne(imageComment.getImageId());
		imageCommentDao.delete(imageComment);
		image.setCommentCount(image.getCommentCount()-1);
		imageDao.save(image);
		
	}
	/*
	private void addMessage(ImageComment comment,String url){
		Remind remind = new Remind();
		remind.setReceiverId(comment.getImageOwnId());
		remind.setSendId(comment.getUserId());
		remind.setType(RemindKey.TYPE_MYSELF);
		remind.setDescription(RemindKey.DES_MYSELF_COMMENTIMAGE);
		remind.setSubclass(RemindKey.DES_MYSELF_COMMENTIMAGE_CODE);
		remind.setRefId(comment.getImageId());
		remind.setLinkHtml(url);
		remindService.addRemind(remind);
	}
*/
}
