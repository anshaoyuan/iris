package com.iris.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.constant.KeyWord;
import com.exception.RestException;
import com.iris.entity.Blog;
import com.iris.entity.BlogComment;
import com.iris.repository.BlogCommentDao;
import com.iris.repository.BlogDao;

@Service
@Transactional
public class BlogCommentService {
	
	@Autowired
	private BlogCommentDao blogCommentDao;
	
	@Autowired
	private BlogDao blogDao;


	
	@Autowired
	private HelpService helpService;
	
	public Long saveBlogComment(BlogComment blogComment){
		Blog blog = blogDao.findOne(blogComment.getBlogId());
		
		if(null == blog){
			throw new RestException("文章不存在");
		}
		//setParentCommentUserLink(blogComment);
		//评论默认都是来自web
		Map<String,String> map = helpService.processHtmlContentToText(blogComment.getCommentHtml(),
				KeyWord.STREAMCOMEFROM_WEB, null);
		blogComment.setCommentHtml(map.get("content"));
		blogComment.setCommentText(map.get("text"));
		blogComment.setDelFlag(KeyWord.UN_DEL_STATUS);
		blogComment.setCreateDate(new Date());
		blogCommentDao.save(blogComment);
		//totalService.addIntegralForBlogComment(blogComment,KeyWord.ACTION_TYPE_CREATE);
		/*

		if(!blog.getIsSignup().equals(KeyWord.YES)){
			addMessage(blogComment.getUserId(),blog.getCreateBy(),RemindKey.DES_MYSELF_COMMENTBLOG,
					blogComment.getBlogId(),RemindKey.DES_MYSELF_COMMENTBLOG_CODE);
		}
		
		if(null != blogComment.getParentId()){
			BlogComment parentComment = blogCommentDao.findOne(blogComment.getParentId());
			if(!blog.getIsSignup().equals(KeyWord.YES)){
				addMessage(blogComment.getUserId(),parentComment.getUserId(),
					RemindKey.DES_MYSELF_COMMENT_COMMENT,blogComment.getBlogId(),RemindKey.DES_MYSELF_COMMENT_COMMENT_CODE);
			}

		}
		*/
		return blogComment.getId();
	}
/*
	private void setParentCommentUserLink(BlogComment blogComment) {
		if(blogComment.getParentId()!= null){
			BlogComment parentComment = blogCommentDao.findOne(blogComment.getParentId());
			String aLink = "<small class='text-muted'>"
					+ MessageSourceHelper
							.GetMessages("app.service.BlogCommentService.reply")
					+ "<a href='#/me/" + parentComment.getUserId() + "'>"
					+ parentComment.getUserName() + "</a></small><br>";
			blogComment.setCommentHtml(aLink+blogComment.getCommentHtml());
		}
	}
	*/
	public void deleteBlogComment(Long commentId){
		BlogComment blogComment = blogCommentDao.findOne(commentId);
		setCommentDelStatus(blogComment);
	}

	public void deleteBlogComment(Long commentId,Long deleteUserId){
		BlogComment blogComment = blogCommentDao.findOne(commentId);
		if(!blogComment.getUserId().equals(deleteUserId)){
			throw new RestException("非法删除");
		}
		setCommentDelStatus(blogComment);
	}

	private void setCommentDelStatus(BlogComment blogComment) {
		blogComment.setDelFlag(KeyWord.DEL_STATUS);
		blogCommentDao.save(blogComment);
		//totalService.addIntegralForBlogComment(blogComment,KeyWord.ACTION_TYPE_DELETE);
	}
	
	public List<BlogComment> queryCommentsByBlogId(Long blogId){
		return blogCommentDao.findByBlogIdAndDelFlag(blogId,KeyWord.UN_DEL_STATUS);
	}
	
/*
	private void addMessage(Long sendId,Long receiverId,String messageType,Long refId,Integer subclass){
		Remind remind = new Remind();
		remind.setSendId(sendId);
		remind.setReceiverId(receiverId);
		remind.setLinkHtml(ButtonService.getWebPath(KeyWord.BLOG_SHOW) + refId);
		remind.setDescription(messageType);
		remind.setType(RemindKey.TYPE_MYSELF);
		remind.setRefId(refId);
		remind.setSubclass(subclass);
		remindService.addRemind(remind);
	}
	*/
	public BlogComment findOne(Long commentId){
		return blogCommentDao.findOne(commentId);
	}
}
