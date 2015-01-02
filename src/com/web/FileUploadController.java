package com.web;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.constant.BusinessStatus;
import com.constant.MobileKey;
import com.iris.service.FileUploadService;
import com.iris.service.UserInfoService;
import com.iris.service.attachment.AttachmentHelpService;
import com.utils.UploadUtil;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;

@Controller
public class FileUploadController extends BaseController{
	private static Logger logger = LoggerFactory.getLogger(FileUploadController.class);
	private final static String ID_LIST = "IDLIST";
	private final static String PATH_LIST = "PATHLIST";

	@Autowired
	private AttachmentHelpService attachmentHelpService;

	@Autowired
	private FileUploadService fileUploadService;

	@RequestMapping(value = "toFileUpload")
	public String toFileUpload() {
		return "/business/fileUpload/fileUpload";
	}

	/**
	 * form上传 支持多文件上传
	 * 
	 * @author 李晓健
	 * @date 2013年10月31日 下午3:47:10
	 * @param name
	 * @param file
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/formUpload", method = RequestMethod.POST)
	public String formUpload(HttpServletRequest request, Long folderId) throws Exception {
		fileUpload(request, folderId);
		return "business/upload/upload";
	}

	/**
	 * jquery上传 支持多文件上传
	 * 
	 * @author 李晓健
	 * @date 2013年10月31日 下午3:46:57
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/ajaxupload", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> ajaxUpload(HttpServletRequest request,
			Long folderId) throws Exception {
		Map<String, Object> uploadInfoMap = fileUpload(request, folderId);
		List<Long> idList = (List<Long>) uploadInfoMap.get(ID_LIST);
		String ids = "";
		for (Long long1 : idList) {
			ids += "," + long1.longValue();
		}
		
		return new ResponseEntity<String>(ids.replaceFirst(",", ""),
				HttpStatus.OK);
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/ajaxUserImgUpload", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> ajaxUserImgUpload(HttpServletRequest request,
			Long folderId) throws Exception {
		Map<String, Object> uploadInfoMap = fileUpload(request, folderId);
		List<String> pathList = (List<String>) uploadInfoMap.get(PATH_LIST);
		return new ResponseEntity<String>(pathList.get(0), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/uploadUserImg", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> ajaxUploadUserImg(HttpServletRequest request,
			Long folderId) throws Exception {
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
		Map<String, String> result = null;
		for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
			MultipartFile mf = entity.getValue();
			result = processUpload("userImg", mf, "1");
		}
		String imageUrl = result.get("filePathMid") + ";" + result.get("imagePath") + ";" + result.get("id");
		return new ResponseEntity<String>(imageUrl, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/uploadDocument", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> uploadDocument(HttpServletRequest request,
			Long folderId) throws Exception {
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
//		Map<String, String> result = null;
		String documentSign = "document" + folderId;
		for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
			MultipartFile mf = entity.getValue();
			/*result = */
			processUpload(documentSign, mf);
		}
		
		return new ResponseEntity<String>("10000", HttpStatus.OK);
	}

	/**
	 * 文件上传的处理
	 * 
	 * @author 李晓健
	 * @date 2013年11月1日 上午10:29:40
	 * @param request
	 * @throws Exception 
	 */
	private Map<String, Object> fileUpload(HttpServletRequest request,
			Long folderId) throws Exception {
		Map<String, Object> uploadInfoList = new HashMap<String, Object>();
		List<Long> idList = new ArrayList<Long>();
		List<String> pathList = new ArrayList<String>();
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
		String fileName = null;
		//Long userId = LoginRestController.getCurrentUserId();
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("userId", BaseController.getLoginUserId().toString());
		
		//resultMap.put("isAdmin",BaseController.hasRole(SysConstants.ADMIN) ? "1" : "0");
		for (Map.Entry<String, MultipartFile> entity : fileMap.entrySet()) {
			// 上传文件名
			MultipartFile mf = entity.getValue();
			fileName = mf.getOriginalFilename();
			String[] tempPathArr = com.utils.UploadUtil.GetCreatePathWithSuffix(fileName,null);;
			String newFilePath = tempPathArr[0];
			File uploadFile = new File(newFilePath);
			// 保存文件路径
			pathList.add(newFilePath);
			try {
				FileCopyUtils.copy(mf.getBytes(), uploadFile);
			} catch (IOException e) {
				logger.error("上传失败", e);
				// e.printStackTrace();
			}
			resultMap.put("fileName", fileName);
			resultMap.put("filePath", tempPathArr[1]);
			resultMap.put("absolutePath", newFilePath);
			resultMap.put("folderId", folderId+"");
			resultMap.put("orgId", BaseController.getCurrentOrgId().toString());
			fileUploadService.processUpload("fileUp", resultMap);
			idList.add(Long.parseLong(resultMap.get("id")));
		}
		uploadInfoList.put(ID_LIST, idList);
		uploadInfoList.put(PATH_LIST, pathList);
		return uploadInfoList;
	}
	
	@RequestMapping(value = "/upload/{sign}", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> upload(@PathVariable("sign") String sign,
			@RequestParam("fileUpload") CommonsMultipartFile file)
			throws Exception {
		Map<String, String> resultMap = processUpload(sign, file);
		return new ResponseEntity<String>(mapper.toJson(resultMap), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/chatUpload", method = RequestMethod.POST)
	@ResponseBody
	public void chatUpload(@RequestParam("fileUpload") CommonsMultipartFile file,HttpServletResponse response)
			throws Exception {
		Map<String, String> resultMap = processUpload("chat", file);
		writer(response, mapper.toJson(resultMap));
	}
	
	private Map<String, String> processUpload(String sign, MultipartFile file, String forAdmin) throws Exception {
		Map<String, String> resultMap = new HashMap<String, String>();
		if(StringUtils.isNotBlank(forAdmin)) {
			//后台管理员上传用户头像时,不需要保存到系统相册,故在此做标示
			resultMap.put("forAdmin", forAdmin);
		}

		resultMap.put("userId", BaseController.getLoginUserId().toString());
		
		//resultMap.put("isAdmin",isAdmin() ? "1" : "0");
		resultMap.put("isAdmin", "1" );
		String fileName = URLDecoder.decode(file.getOriginalFilename(), "UTF-8");

		String[] tempPathArr = UploadUtil.GetCreatePathWithSuffix(fileName,UploadUtil.DEFAULT);

		String absolutePath = tempPathArr[0];
		String relativePath = tempPathArr[1];
		String destName = tempPathArr[2];

		File tempFile = new File(absolutePath);
		file.transferTo(tempFile);

		resultMap.put("destName", destName);
		resultMap.put("fileName", fileName);
		resultMap.put("filePath", relativePath);
		resultMap.put("absolutePath", absolutePath);
		resultMap.put("orgId",BaseController.getCurrentOrgId().toString());

		fileUploadService.processUpload(sign, resultMap);

		resultMap.remove("absolutePath");
		resultMap.remove("userId");
		resultMap.put(MobileKey.CODE, BusinessStatus.OK);
		resultMap.put("domain", PropsUtil.getProperty(PropsKeys.SERVICE_DOMAIN));
		
		return resultMap;
	
	}
	
	
	private Map<String, String> processUpload(String sign, MultipartFile file) throws Exception {
		return processUpload(sign, file,null);
	}

	@RequestMapping(value = "/app-upload", method = RequestMethod.POST)
	@ResponseBody
	public void appUpload(@RequestParam("fileUpload") CommonsMultipartFile file,HttpServletResponse response)throws Exception {
		String path = PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_ROOT_PATH);
		String sourceFileName = file.getOriginalFilename();
		String type = sourceFileName.substring(sourceFileName.lastIndexOf(".") + 1);
		String relativePath = null;
		
		if(type.equals("ipa")){
			relativePath = PropsUtil.getProperty(PropsKeys.MOBILE_CLIENT_UPLOAD_IOS);
		}else if(type.equals("apk")){
			relativePath = PropsUtil.getProperty(PropsKeys.MOBILE_CLIENT_UPLOAD_ANDRIOD);
		}else{
			Map<String,String> result = new HashMap<String,String>();
			result.put("code", BusinessStatus.ILLEGAL);
			result.put("msg", "类型错误");
			writer(response, mapper.toJson(result));
		}
		
		File appFile = new File(path + File.separatorChar + relativePath);
		
		appFile.getParentFile().mkdirs();
		
		appFile.delete();
		
		file.transferTo(appFile);
		
		writer(response, mapper.toJson(GetSuccMap()));
		
	}
	
}
