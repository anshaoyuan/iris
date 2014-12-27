package com.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springside.modules.mapper.BeanMapper;

import com.constant.KeyWord;
import com.iris.entity.Blog;
import com.iris.entity.Mention;
import com.iris.service.BlogService;
import com.iris.vo.BlogVo;

@Controller
@RequestMapping(value = "/blog")
public class BlogController extends BaseController{

	@Autowired
	private BlogService blogService;
//	
//	@Autowired
//	private MentionService mService;
//	

	
	@RequestMapping(value = "/blogs" ,method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> queryBlogs(@RequestBody BlogVo blogVo) throws Exception{
		blogVo.setOrgId(BaseController.getCurrentOrgId());
		//当时草稿状态的情况下，进行查询作者为本人的草稿列表
		if(blogVo.getIsDraft() != null && blogVo.getIsDraft().intValue() == KeyWord.DRAFT_VALUE){
			blogVo.setCreateBy(BaseController.getLoginUserId());
		}
		
		blogVo.setDelFlag(KeyWord.UN_DEL_STATUS);//查询非删除状态
		if(blogVo.getIsSignup()==null) {
			blogVo.setIsSignup(KeyWord.NO);
		}
		Page<Blog> page = blogService.queryBlog(blogVo, blogVo.getPageInfo());
		List<BlogVo> listVo = BeanMapper.mapList(page.getContent(),BlogVo.class);
		return new ResponseEntity<Page<BlogVo>>(GetPageByList(page,listVo, BlogVo.class),HttpStatus.OK);
	}
	
	/*
	
	@RequestMapping(value = "/fuzzyBlogs" ,method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> fuzzyQueryBlog(@RequestBody BlogVo blogVo) throws Exception{
		blogVo.setOrgId(BaseController.getCurrentOrgId());
		blogVo.setDelFlag(KeyWord.UN_DEL_STATUS);//查询非删除状态
		Page<Blog> page = blogService.fuzzyQueryBlog(blogVo);
		List<BlogVo> listVo = BeanMapper.mapList(page.getContent(),BlogVo.class);
		return new ResponseEntity<Page<BlogVo>>(GetPageByList(page,listVo, BlogVo.class),HttpStatus.OK);
	}
	
	*/
	
	@RequestMapping(value = "/create",method= RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> addBlog(@RequestBody Blog blog){
		
		blog.setCreateBy(BaseController.getLoginUserId());
		blog.setOrgId(BaseController.getCurrentOrgId());
		blog.setCreateName(BaseController.getLoginUserName());
		blog.setIsSignup(KeyWord.NO);
		blogService.saveBlog(blog);
		return getBlogId(blog);
	}
	
	@RequestMapping(value = "/update",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> updateBlog(@RequestBody Blog blog){
		blog.setUpdateBy(BaseController.getLoginUserId());
		blog.setUpdateName(BaseController.getLoginUserName());
		blogService.updateBlog(blog);
		return getBlogId(blog);
	}

	private ResponseEntity<?> getBlogId(Blog blog) {
		Map<String ,Long> map = new HashMap<String, Long>();
		map.put("blogId", blog.getId());
		return new ResponseEntity<Map<String ,Long>>(map,HttpStatus.OK);
	}
	@RequestMapping(value ="delete/{id}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> deleteBlog(@PathVariable Long id){
		blogService.delete(id);
		return new ResponseEntity<Map<String,String>>(GetSuccMap(),HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> detail(@PathVariable Long id){
		BlogVo blogVo = blogService.findBlogVoById(id,BaseController.getLoginUserId());
		//List<UserSimpleVo> mentionList = mService.findUserInfoByRefIdAndRefType(id, KeyWord.MENTION_BLOG);
		//blogVo.setMentionList(mentionList);
		//BeanConvertMap.setBlogOwner(blogVo, BaseController.getCurrentUserId());
		return new ResponseEntity<BlogVo>(blogVo,HttpStatus.OK);
	}
	
	@RequestMapping(value="/drafts",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> queryDrafts(){
		List<Blog> blogs = blogService.queryDrafts(BaseController.getLoginUserId(),
				BaseController.getCurrentOrgId());
		
		List<BlogVo> list = BeanMapper.mapList(blogs, BlogVo.class);
		return new ResponseEntity<List<BlogVo>>(list,HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/mentionBlog/{id}" , method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> mentionBlogs(@PathVariable Long id){
		Mention mention = new Mention();
		mention.setRefId(id);
		mention.setUserId(BaseController.getLoginUserId());
		mention.setOrgId(BaseController.getCurrentOrgId());
		blogService.saveBlogMention(mention);
		return new ResponseEntity<Mention>(mention,HttpStatus.OK);
		
	}
	/*
	@RequestMapping(value="/hotBlog/{pageNumber}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> queryHotBlogs(@PathVariable Integer pageNumber){
		
		PageInfo pageInfo = new PageInfo(pageNumber, 10, Direction.DESC);
		
		List<Blog> list = blogService.queryHotBlog(BaseController.getCurrentOrgId(), pageInfo);
		
		return new ResponseEntity<List<Blog>>(list,HttpStatus.OK);
	}
	*/
	
}
