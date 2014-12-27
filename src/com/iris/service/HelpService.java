package com.iris.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.constant.KeyWord;
import com.iris.entity.Attachment;
import com.iris.entity.Image;
import com.iris.repository.ImageDao;
import com.iris.repository.attachment.AttachmentDao;
import com.utils.StringUtil;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;


@Service
@Transactional
public class HelpService {
	@Autowired
	ImageDao imageDao;
	@Autowired
	AttachmentDao attachmentDao;
	private static Logger logger = LoggerFactory.getLogger(HelpService.class);
	
	public Map<String,String> processHtmlContentToText(String content,int comeFrom,List<Image> imageList, List<Attachment> fileList) {
		StringUtil.CheckIllegalCharacter(content);
		
		content = content.replaceAll("\n", "<br>");
		Map<String, String> map = new HashMap<String, String>();
		map.put("content", content);
		if(content!=null && !content.isEmpty()){
			Document doc = Jsoup.parseBodyFragment(content);
			boolean isMobile = comeFrom ==KeyWord.STREAMCOMEFROM_IOS ||
					comeFrom == KeyWord.STREAMCOMEFROM_ANDROID || 
					comeFrom == KeyWord.STREAMCOMEFROM_SINA;
			if(isMobile && imageList!= null && imageList.size() > 0){
				content = appendImgForStreamContent(content,imageList,doc);
//				map.put("content",appendImgForStreamContent(content,imageList,doc));
			}
			//处理附件
//			if(fileList != null && fileList.size() > 0){
//				content = appendFileUrlToStreamContent(content, fileList, doc);
//			}
			map.put("content", content);
			map.put("text", doc.text());
		}
		
		return map;
	}
	
	
	private String appendFileUrlToStreamContent(String content, List<Attachment> fileList, Document doc) {
		Element rootEle = doc.body().appendElement("br").appendElement("ul");
		rootEle.addClass("nav").addClass("nav-pills");
		for(Attachment file : fileList){
			Attachment attachment = attachmentDao.findOne(file.getId());
			Element subEle = rootEle.appendElement("li").appendElement("a");
//			subEle.appendElement("a");
			subEle.attr("data-fileid", attachment.getId()+"");
			subEle.attr("href", PropsUtil.getProperty(PropsKeys.SERVICE_DOMAIN) + attachment.getResourceUri());
			subEle.attr("title", "click here to download this file");
			subEle.addClass("");
			subEle.html(attachment.getResourceName());
		}
		return doc.body().toString();
	}


	public Map<String,String> processHtmlContentToText(String content,int comeFrom,List<Image> imageList) {
		return processHtmlContentToText(content, comeFrom, imageList, null);
	}
	
	private String appendImgForStreamContent(String content,List<Image> imageList, Document doc) {
		for (int i = 0; i < imageList.size(); i++) {
			Image img = imageList.get(i);
			img = imageDao.findOne(img.getId());
			if(img != null){
				doc.body().appendElement("br");
				Element ele = doc.body().appendElement("img");
				ele.attr("data-img-id", img.getId().toString());
				ele.attr("src", PropsUtil.getProperty(PropsKeys.SERVICE_DOMAIN) + img.getMidUri());
				ele.attr("img-max",PropsUtil.getProperty(PropsKeys.SERVICE_DOMAIN) + img.getMaxUri());
				ele.attr("style","max-width:500px");
			}else{
				logger.warn("图片为空");
			}
		}
		return doc.body().html();
	
	}

}
