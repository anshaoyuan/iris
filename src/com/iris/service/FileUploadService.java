package com.iris.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.constant.KeyWord;
import com.iris.entity.Attachment;
import com.iris.entity.Image;
import com.iris.entity.ImageFolder;
import com.iris.repository.image.ImageDao;
import com.iris.repository.image.ImageFolderDao;
import com.iris.service.attachment.AttachmentFolderService;
import com.iris.service.attachment.AttachmentHelpService;
import com.iris.service.image.ImageFolderService;
import com.utils.FileUtil;
import com.utils.ImageUtil;
import com.utils.UploadUtil;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;
@Service
@Transactional
public class FileUploadService extends BaseService{
	@Autowired
	private AttachmentHelpService attachmentHelpService;
	@Autowired
	private AttachmentFolderService attachmentFolderService;
	@Autowired
	private ImageFolderService imageFolderService;
	@Autowired
	ImageFolderDao imageFolderDao;
	@Autowired
	ImageDao imageDao;
	
	private static final long IMAGEMOBILEMAXSIZE = 1024 * 1024 * 2;
	
	public void processUpload(String sign, Map<String, String> map) throws Exception {
		if ("chat,stream,fileUp,document,userImg,mail".contains(sign) || sign.contains("document")||sign.startsWith("forderId_")) {
			File originfile = new File(map.get("absolutePath"));
			String type = FileUtil.getExtension(map.get("fileName")).toLowerCase();

			if (PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_TYPE_DOCUMENT).contains(type)) {
				String[] destPathArr = UploadUtil.GetCreatePathWithSuffix(map.get("fileName"),null);
				File destFile = new File(destPathArr[0]);

				FileUtil.copyFile(originfile, destFile);
				
				if(sign.equals("mail")){
					Attachment attachment = new Attachment();
					attachment.setResourceName(map.get("fileName"));
					attachment.setResourceUrl(destPathArr[1]);
					attachment.setSize(destFile.length());
					attachment.setUrlType(KeyWord.LOCAL_ATTACHMENT);
					attachment.setUserId(Long.parseLong(map.get("userId")));
					
					attachmentHelpService.getAttachmentService().saveAttachment(attachment);
					map.put("id", attachment.getId().toString());
				}else{
					Long folderId = null;
					if(sign.contains("document")){
						folderId = Long.valueOf(sign.substring(8));
					}
					
					Long id = attachmentHelpService.saveFile(destFile,
							Long.parseLong(map.get("userId")), folderId,
							map.get("fileName"), destPathArr[1]);
					map.put("id", id.toString());
					//更新封面
					if(folderId != null){
						attachmentFolderService.updateCover(folderId);
					}
				}
				
				map.put("filePath",PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + destPathArr[1]);
			} else if (PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_TYPE_IMG).contains(type)) {
				String[] destPathArr = UploadUtil.GetCreatePathWithSuffix(map.get("fileName"),null);
				File destFile = new File(destPathArr[0]);
				FileUtil.copyFile(originfile, destFile);
				
				Image image = new Image();
				
				File sourceFile = new File(destFile.getAbsolutePath());
				BufferedImage bsrc = null;  
				bsrc = ImageIO.read(sourceFile);
				image.setWidth(bsrc.getWidth());
				image.setHeight(bsrc.getHeight());
				
				int midWidth = Integer.parseInt(PropsUtil.getProperty(PropsKeys.UPLOAD_IMG_SIZE_MID_WIDTH));
				int minWidth = Integer.parseInt(PropsUtil.getProperty(PropsKeys.UPLOAD_IMG_SIZE_MIN_WIDTH));
				int mobileWidth = Integer.parseInt(PropsUtil.getProperty(PropsKeys.UPLOAD_IMG_SIZE_MOBILE_WIDTH));
				
				String mobilePath = destFile.getParent() + File.separatorChar + FileUtil.appendMark(destFile.getName(),"-mobile");
				if(bsrc.getWidth() > mobileWidth){
					ImageUtil.zoom(destFile.getAbsolutePath(), mobilePath, null, mobileWidth, null);
					ImageUtil.compressPic(mobilePath, mobilePath,(float)0.5);
					image.setMobileUrl(FileUtil.appendMark(destPathArr[1],"-mobile"));
				}else if(sourceFile.length() > IMAGEMOBILEMAXSIZE){
					ImageUtil.compressPic(destFile.getAbsolutePath(),mobilePath,(float)0.5);
					image.setMobileUrl(FileUtil.appendMark(destPathArr[1],"-mobile"));
				}else{
					image.setMobileUrl(destPathArr[1]);
				}
				
				ImageUtil.zoom(destFile.getAbsolutePath(), destFile.getParent() + File.separatorChar + FileUtil.appendMark(destFile.getName(),"-mid") , null, midWidth, null);
				ImageUtil.losslessCut(destFile.getAbsolutePath(), destFile.getParent() + File.separatorChar + FileUtil.appendMark(destFile.getName(),"-min"), minWidth);

				image.setSize(sourceFile.length());
				image.setType(type);
				image.setMaxUrl(destPathArr[1]);
				image.setMidUrl(FileUtil.appendMark(destPathArr[1],"-mid"));
				image.setMinUrl(FileUtil.appendMark(destPathArr[1],"-min"));
				image.setCreateId(Long.parseLong(map.get("userId")));
				image.setName(map.get("fileName"));
				image.setOrgId(Long.parseLong(map.get("orgId")));
				imageDao.save(image);
				map.put("width", image.getWidth()+"");
				map.put("height", image.getHeight()+"");
				
				map.put("id", image.getId().toString());
				
				
				ImageFolder imageFolder = null;
				if(sign.startsWith("forderId_")){
					Long folderId = Long.parseLong(sign.replace("forderId_", ""));
					imageFolder = imageFolderService.findById(folderId);
				}else if(!sign.equals("mail")){
					if(StringUtils.isNotBlank(map.get("folderId"))){
						imageFolder = imageFolderService.findById(Long.parseLong(map.get("folderId")));
					}else if("1".equals(map.get("isAdmin"))){
						imageFolder = imageFolderService.getDefaultFolderByIdType(null, "1");
					}else{
						imageFolder = imageFolderService.getDefaultFolderByIdType(Long.parseLong(map.get("userId")), "3");
					}
				}
				
				String forAdmin = map.get("forAdmin");
				if(null != imageFolder && StringUtils.isBlank(forAdmin)){
					imageFolder.getImageList().add(image);
					imageFolderDao.save(imageFolder);
					//更新封面
					imageFolderService.updateFolderCover(imageFolder.getId());
				}
				map.put("filePath",PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + image.getMaxUrl());
				map.put("filePath-mid", PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + image.getMidUrl());
				map.put("filePath-min", PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + image.getMinUrl());
				//前端显示用
				map.put("filePathMid", PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + image.getMidUrl());
				map.put("imagePath", image.getMidUrl());
			}
		}
	}
}
