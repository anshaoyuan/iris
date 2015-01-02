package com.iris.service.image;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.exception.RestException;
import com.iris.entity.Image;
import com.iris.entity.Mention;
import com.iris.repository.image.ImageDao;
import com.iris.service.MentionService;
import com.utils.FileUtil;
import com.utils.ImageUtil;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;
import com.utils.string.StringPool;

@Service
@Transactional
public class ImageService {
	
	private static Logger logger = LoggerFactory.getLogger(ImageService.class);
	
	@Autowired
	private ImageDao imageDao;
	
	@Autowired
	private MentionService mentionService;
	

	
	public Long saveImage(Image image){
		imageDao.save(image);
		return image.getId();
	}
	
	public void deleteImage(Long imageId){
		imageDao.delete(imageId);
	}
	
	public Image findImage(Long imageId){
		return imageDao.findOne(imageId);
	}
	
	public String[] saveImageWithMidMin(Image image) throws RestException {
		int midWidth = Integer.parseInt(PropsUtil.getProperty(PropsKeys.UPLOAD_IMG_SIZE_MID_WIDTH));
		int minWidth = Integer.parseInt(PropsUtil.getProperty(PropsKeys.UPLOAD_IMG_SIZE_MIN_WIDTH));
		
		String path = PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_ROOT_PATH);
		File destFile = new File(path + StringPool.FORWARD_SLASH + image.getMaxUrl());
		try {
			ImageUtil.zoom(destFile.getAbsolutePath(), destFile.getParent() + File.separatorChar + FileUtil.appendMark(destFile.getName(),"-mid") , null, midWidth, null);
			ImageUtil.losslessCut(destFile.getAbsolutePath(), destFile.getParent() + File.separatorChar + FileUtil.appendMark(destFile.getName(),"-min"), minWidth);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			throw new RestException(e.toString());
		}
		
		image.setMidUrl(FileUtil.appendMark(image.getMaxUrl(),"-mid"));
		image.setMinUrl(FileUtil.appendMark(image.getMaxUrl(),"-min"));
		
		imageDao.save(image);
		
		String[] temp = new String[3];
		temp[0] = image.getId().toString();
		temp[1] = image.getMinUrl();
		temp[2] = image.getMidUrl();
		
		return temp;
	}
	
	/**
	 * 给图片添加赞
	 * UserId
	 * 
	 * RefId
	 * 设置上面三个参数
	 * @param mention
	 * @return
	 */
/*这个方法不要调用，逻辑已经全变了，如果要
 * 实现图片赞功能，一个用户只能赞一次，取消赞重赞时不能生成提醒
 * 	@Transactional(readOnly=false)
	public Long saveImageMention(Mention mention){
		mention.setCreateDate(new Date());
		mention.setRefType(KeyWord.MENTION_IMAGE);
		if(null!= mentionService.findMentionByTypeUserId(mention)){
			throw new RestException("你已经赞过该图片");
		}
		
		try {
			Image image = imageDao.findOne(mention.getRefId());
			image.setPraiseCount(image.getPraiseCount()+1);
			imageDao.save(image);
			mention.setRefOwnId(image.getCreateId());
			mentionService.saveMention(mention);
			addMessage(mention,image.getMaxUri());
			return mention.getId();
		} catch (Exception e) {
			throw new RestException("添加赞失败");
		}
	}
	*/
/*	private void addMessage(Mention mention,String url){
		Remind remind = remindService.buildNewRemind(mention);
		remind.setLinkHtml(url);
		remind.setDescription(RemindKey.DES_MYSELF_PRAISEIMAGE);
		remind.setType(RemindKey.TYPE_MYSELF);
		remindService.addRemind(remind);
		
	}*/
}
