package com.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.iris.entity.BlogComment;
import com.iris.service.BlogCommentService;
import com.iris.vo.BlogCommentVo;

@Controller
@RequestMapping("/blogComment")
public class BlogCommentController extends BaseController{

	@Autowired
	private BlogCommentService blogCommentService;
	
	@RequestMapping(value = "/create",method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> addBlogComment(@RequestBody BlogComment blogComment){
		blogComment.setOrgId(BaseController.getCurrentOrgId());
		blogComment.setUserName(BaseController.getLoginUserName());
		blogComment.setUserId(BaseController.getLoginUserId());
		blogCommentService.saveBlogComment(blogComment);
		return new ResponseEntity<BlogComment>(blogComment
				,HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/comments/{blogId}",method=RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> queryBlogComment(@PathVariable Long blogId){
		List<BlogComment> list = blogCommentService.queryCommentsByBlogId(blogId);
		return new ResponseEntity<List<BlogCommentVo>>(BeanMapper.mapList(list, BlogCommentVo.class),HttpStatus.OK);
		
	}
	
	@RequestMapping(value="/delete/{id}",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<?> deleteBlogComment(@PathVariable Long id){
		blogCommentService.deleteBlogComment(id,BaseController.getLoginUserId());
		return new ResponseEntity<Map<String,String>>(GetSuccMap(),HttpStatus.OK);
		
	}
	
}
