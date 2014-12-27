package com.iris.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springside.modules.mapper.BeanMapper;
import org.springside.modules.persistence.DynamicSpecifications;
import org.springside.modules.persistence.SearchFilter;
import org.springside.modules.persistence.SearchFilter.Operator;

import com.constant.KeyWord;
import com.exception.RestException;
import com.iris.entity.Attachment;
import com.iris.entity.AttachmentRef;
import com.iris.entity.Blog;
import com.iris.entity.Image;
import com.iris.entity.ImageSource;
import com.iris.entity.Mention;
import com.iris.repository.BlogDao;
import com.iris.repository.ImageSourceDao;
import com.iris.repository.attachment.AttachmentDao;
import com.iris.repository.attachment.AttachmentRefDao;
import com.iris.vo.BlogVo;
import com.utils.PageInfo;
import com.utils.SearchFilterUtil;





@Service
public class BlogService extends BaseService{
	
	@Autowired
	BlogDao blogDao;
	

	@Autowired
	MentionService mentionService;
	@Autowired
	HelpService helpService;
	@Autowired
	ImageSourceDao imageSourceDao;
	/*
	@Autowired
	private UserInfoService userInfoService;*/
	

	@Autowired
	private AttachmentRefDao attachmentRefDao;
	@Autowired
	private AttachmentDao attachmentDao;
	
	private final String DATAIMGID = "data-img-id";
	
	public Long saveBlog(Blog blog){
		setHtmlToText(blog);
		blog.setCreateDate(new Date());
		blog.setDelFlag(KeyWord.UN_DEL_STATUS);
		blog.setPraiseCount(KeyWord.DEFAULT_VALUE_ZORE);

		blogDao.save(blog);
		saveBlogImageSource(blog);
		processBlogAttachment(blog);
		return blog.getId();
	}

	private void processBlogAttachment(Blog blog) {
		//清除原先的记录
		List<AttachmentRef> list = attachmentRefDao.getAttachmentRefByRefIdAndType(blog.getId(), KeyWord.ATTACHMENT_TYPE_BLOG);
		if(list != null && list.size() > 0){
			for(AttachmentRef arf : list){
				attachmentRefDao.delete(arf);
			}
		}
		if(blog.getFileList() == null || blog.getFileList().size() == 0){
			return;
		}
		
		//重新建立关系
		for(Attachment attachment : blog.getFileList()){
			AttachmentRef ar = new AttachmentRef();
			ar.setAttachmentId(Long.valueOf(attachment.getId()));
			ar.setRefId(blog.getId());
			
			ar.setRefType(KeyWord.ATTACHMENT_TYPE_BLOG);
			attachmentRefDao.save(ar);
		}
		
//		Document doc = Jsoup.parseBodyFragment(blog.getStreamContent());
//		Elements elements = doc.body().getElementsByTag("a");
//		if(elements.size() <= 0) return ;
//		for (int i = 0; i< elements.size(); i++) {
//			Element element = elements.get(i);
//			String fileId = element.attr("data-fileid");
//			if(fileId != null && fileId.length() > 0){
//				AttachmentRef ar = new AttachmentRef();
//				ar.setAttachmentId(Long.valueOf(fileId));
//				ar.setRefId(blog.getId());
//				ar.setRefType(KeyWord.ATTACHMENT_TYPE_BLOG);
//				attachmentRefDao.save(ar);
//			}
//		}

	}
	
	private void setHtmlToText(Blog blog) {
		Map<String, String> map = helpService.processHtmlContentToText(blog.getStreamContent(), 
				blog.getStreamComefrom(), blog.getImgList(), blog.getFileList());
		blog.setStreamContent(map.get("content"));
		blog.setStreamText(map.get("text"));
	}
	/**
	 * 设置分享与图片的关系
	 * @param blog
	 */
	private void saveBlogImageSource(Blog blog){
		if(blog.getImgList()==null || blog.getImgList().size() == 0){
			return ;
		}
		Date currDate = new Date();
		if(blog.getStreamComefrom().equals(KeyWord.STREAMCOMEFROM_WEB)){
			Document doc = Jsoup.parseBodyFragment(blog.getStreamContent());
			Elements elements = doc.body().getElementsByTag("img");
			if(elements.size() <= 0) return ;
			for (int i = 0; i< elements.size(); i++) {
				Element element = elements.get(i);
				String imgId = element.attr(DATAIMGID);
				if(imgId != null && imgId.length() > 0){
					ImageSource imageSource = setImageSourceInfo(blog, currDate);
					imageSource.setImageId(Long.valueOf(imgId));
					imageSourceDao.save(imageSource);
				}
			}
		}else{
			for (Image image : blog.getImgList()) {
				ImageSource imageSource = setImageSourceInfo(blog, currDate);
				imageSource.setImageId(image.getId());
				imageSourceDao.save(imageSource);
			}
		}
		
	}

	private ImageSource setImageSourceInfo(Blog blog, Date currDate) {
		ImageSource imageSource = new ImageSource();
		imageSource.setCreateId(blog.getCreateBy());
		imageSource.setCreateDate(currDate);
		imageSource.setOrgId(blog.getOrgId());
		imageSource.setSortDisc(blog.getStreamText());
		imageSource.setSourceId(blog.getId());
		imageSource.setSourceType(KeyWord.IMAGE_SOURCE_BLOG);
		return imageSource;
	}
	
	public void delete(Long blogId){
		Blog blog = blogDao.findOne(blogId);
		setBlogDelStatus(blog);
	}
	
	public void delete(Long blogId,Long deleteUserId){
		Blog blog = blogDao.findOne(blogId);
		if(!blog.getCreateBy().equals(deleteUserId)){
			throw new RestException("非法删除");
		}
		setBlogDelStatus(blog);
	}

	private void setBlogDelStatus(Blog blog) {
		blog.setDelFlag(KeyWord.DEL_STATUS);
		blogDao.save(blog);
	
	}
	
	public Blog updateBlog(Blog blog){
		setHtmlToText(blog);
		Blog oldBlog = findOne(blog.getId());
		oldBlog.setUpdateDate(new Date());
		oldBlog.setIsDraft(blog.getIsDraft());
		oldBlog.setStreamContent(blog.getStreamContent());
		oldBlog.setStreamText(blog.getStreamText());
		oldBlog.setTitleName(blog.getTitleName());
		oldBlog.setUpdateBy(blog.getUpdateBy());
		oldBlog.setUpdateName(blog.getUpdateName());
		blogDao.save(oldBlog);
		processBlogAttachment(blog);
		return oldBlog;
	}
	
	public Page<Blog> queryBlog(Map<String, Object> searchParams,PageInfo pageInfo) throws Exception{
		if(pageInfo == null){
			pageInfo = new PageInfo();
		}
		
		Map<String, SearchFilter> filters = SearchFilterUtil.parse(searchParams);

		if(filters.get("id")!=null){
			filters.put("id", new SearchFilter("id", Operator.LT, filters.get("id").value));
		}
		if(filters.get("streamContent")!=null){
			filters.put("streamContent", new SearchFilter("streamContent", Operator.LIKE, filters.get("streamContent").value));
		}
		filters.put("delFlag", new SearchFilter("delFlag", Operator.EQ, KeyWord.UN_DEL_STATUS));
		Specification<Blog> spec = DynamicSpecifications.bySearchFilter(filters.values(), Blog.class);
		
		PageRequest pageRequest = buildPageRequest(pageInfo.getPageNumber(), pageInfo.getPageSize(),pageInfo.getSortColumn());
		
		return blogDao.findAll(spec, pageRequest);
	}
	
	public Page<Blog> queryBlog(BlogVo blogVo,PageInfo pageInfo) throws Exception{
		Map<String, Object> searchParams = SearchFilterUtil.convertBean(blogVo);
		return queryBlog(searchParams, pageInfo);
	}
/*	
	public List<Blog> queryHotBlog(Long orgId,PageInfo pageInfo){
		return blogDao.findHopBlog(orgId, pageInfo.getPageRequestInfo());
	}*/
/*
	public Page<Blog> fuzzyQueryBlog(BlogVo vo){
		PageInfo pageInfo = vo.getPageInfo();
		if(pageInfo == null){
			pageInfo = new PageInfo();
		}
		if(vo.getQueryName()!=null&&!vo.getQueryName().isEmpty()){
			List<UserInfo> list = userInfoService.findByUserNameFuzzy(vo.getQueryName(), vo.getOrgId());
			if(list!=null&&!list.isEmpty()){
				List<Long> userIds = new ArrayList<Long>();
				for(UserInfo ui:list){
					userIds.add(ui.getId());
				}
				vo.setUserIdList(userIds);
			}
		}
		
		return blogDao.findAll(BlogSearchSpecs.searchBlogByCondition(vo),pageInfo.getPageRequestInfo());
	}
	*/
	public Long saveBlogMention(Mention mention){
		mention.setCreateDate(new Date());
		mention.setRefType(KeyWord.MENTION_BLOG);
		Mention oldMention = mentionService.findMentionByTypeUserId(mention);
		Blog blog = blogDao.findOne(mention.getRefId());
		
		if(null != oldMention ){
			if(oldMention.getDelFlag().equals(KeyWord.UN_DEL_STATUS)){
				setMentionStatus(oldMention, blog,-1,KeyWord.DEL_STATUS);
				return null;
			}else{
				setMentionStatus(oldMention, blog,1,KeyWord.UN_DEL_STATUS);
				mention.setId(oldMention.getId());
				return oldMention.getId();
			}

		}else{
			blog.setPraiseCount(blog.getPraiseCount()+1);
			blogDao.save(blog);
			mention.setRefOwnId(blog.getCreateBy());
			
			mentionService.saveMention(mention);
			/*if(!blog.getIsSignup().equals(KeyWord.YES)){
				addMessage(mention,RemindKey.DES_MYSELF_MENTIONBLOG_CODE);
			}
			*/
			return mention.getId();
		}
		
	}

	private void setMentionStatus(Mention oldMention, Blog blog,int type,int status) {
		oldMention.setDelFlag(status);
		mentionService.saveMention(oldMention);
		blog.setPraiseCount(blog.getPraiseCount()+type);
		blogDao.save(blog);
		
	}
	
/*	private void addMessage(Mention mention,Integer subclass){
		
		Remind remind = remindService.buildNewRemind(mention);
		remind.setLinkHtml(ButtonService.getWebPath(KeyWord.BLOG_SHOW) + mention.getRefId());
		remind.setDescription(RemindKey.DES_MYSELF_MENTIONBLOG);
		remind.setType(RemindKey.TYPE_MYSELF);
		remind.setSubclass(subclass);
		remind.setRefId(mention.getRefId());
		remindService.addRemind(remind);
		
	}*/
	
	public Blog findOne(Long id){
		return blogDao.findOne(id);
	}
	
	public BlogVo findBlogVoById(Long id,Long queryUserId){
		try {
			Object[] obj = blogDao.findBlogVoById(id,queryUserId);
		//	Object[] obj = (Object[])objTemp[0];
			Blog blog = (Blog) obj[0];
			BlogVo vo =BeanMapper.map(blog, BlogVo.class);
			
			if(obj[1]!=null){
				vo.setMentionId(Long.valueOf(obj[1].toString()));
			}
			if(obj[2]!=null){
				vo.setHasStore(KeyWord.YES);
			}else{
				vo.setHasStore(KeyWord.NO);
			}
			//查询附件
			List<Attachment> fileList = attachmentDao.findAttachmentByRefIdRefType(vo.getId(), KeyWord.ATTACHMENT_TYPE_BLOG);
			vo.setFileList(fileList);
			return vo;
		} catch (Exception e) {
			
			throw new RestException("查询数据失败");
		}
		
	}

	public List<Blog> queryDrafts(Long userId, Long orgId) {
		return blogDao.findDrafts(userId,orgId);
	}
	
}
