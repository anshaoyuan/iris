package com.iris.service.image;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.persistence.DynamicSpecifications;
import org.springside.modules.persistence.SearchFilter;
import org.springside.modules.persistence.SearchFilter.Operator;

import com.constant.KeyWord;
import com.exception.RestException;
import com.google.common.collect.Lists;
import com.iris.entity.Image;
import com.iris.entity.ImageFolder;
import com.iris.repository.image.ImageDao;
import com.iris.repository.image.ImageFolderDao;
import com.iris.service.BaseService;
import com.utils.ImageUtil;
import com.utils.PageInfo;
import com.utils.SearchFilterUtil;
import com.utils.UploadUtil;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;
import com.utils.string.StringPool;

@Service
@Transactional
public class ImageFolderService extends BaseService{

	@Autowired
	private ImageFolderDao folderDao;



	@Autowired
	private ImageDao imageDao;
	

	/**
	 * 保存相册
	 * @param folder
	 * @return
	 */
	public Long saveFolder(ImageFolder folder) {

		if (folder.getIsDefault().equals(KeyWord.DEFALUT_IMAGE_FOLDER_TYPE)) {
			checkDefaultIsExists(folder);
		}
		folderDao.save(folder);
		return folder.getId();
	}

	/**
	 * 修改相册(不能修改与图片的关系)
	 * @param folder
	 */
	public void updateFolder(ImageFolder folder){
		ImageFolder imageFolder = folderDao.findOne(folder.getId());
		imageFolder.setFolderName(folder.getFolderName());
		imageFolder.setRemark(folder.getRemark());
		folderDao.save(imageFolder);
	}
	/**
	 * 根据id查询相册 
	 */
	public ImageFolder findById(Long folderId){
		ImageFolder imageFolder = folderDao.findOne(folderId);
		return imageFolder;
	}
	/**
	 * 根据id查询照片
	 * @author 李晓健
	 * @date 2013年12月31日 下午5:08:29
	 * @param imageId
	 * @return
	 */
	public Image findImageById(Long imageId){
		Image image= imageDao.findOne(imageId);
		return image;
	}
	/**
	 * 删除相册
	 * @param folderId
	 */
	public void deleteFolder(Long folderId) {
//		ImageFolder imageFolder = folderDao.findOne(folderId);
//		if(KeyWord.DEFALUT_IMAGE_FOLDER_TYPE.equals(imageFolder.getIsDefault())){
//			throw new RestException(MessageSourceHelper.GetMessages("app.service.business.image.ImageFolderService.deny.delete"));
//		}
		folderDao.delete(folderId);
	}

	/**
	 * 根据类型查询默认相册 type=1,id可以为空， type=2,id为群组id type=3,id为用户id
	 * 
	 * @param id
	 * @param type
	 * @return
	 */
	public ImageFolder getDefaultFolderByIdType(Long id, String type) {
		if (type.equals(KeyWord.USER_DEFAULT_FOLDER)) {
			return getUserDefaultImageFolder(id);
		} else if (type.equals(KeyWord.TEAM_DEFAULT_FOLDER)) {
			//return getTeamDefaultImageFolder(id);
			return null;
		} else {
			return getSystemDefaultImageFolder();
		}
	}
/*
	private ImageFolder getTeamDefaultImageFolder(Long id) {
		ImageFolder imageFolder = folderDao.findTeamDefaultFolder(id);
		if (null == imageFolder) {
			imageFolder = createTeamDefaultFolder(id);
		}
		return imageFolder;
	}*/

	private ImageFolder getUserDefaultImageFolder(Long id) {
		ImageFolder imageFolder = folderDao.findUserDefaultFolder(id);
		if (null == imageFolder) {
			imageFolder = createUserDefaultFolder(id);
		}
		return imageFolder;
	}
	
	private ImageFolder getSystemDefaultImageFolder(){
		ImageFolder imageFolder = folderDao.findSystemDefaultFolder();
		if(null == imageFolder){
			imageFolder = createSystemDefaultFolder();
		}
		return imageFolder;
		
	}

	/**
	 * 根据条件查询相册（名称，teamId,用户id,相册类型）
	 * 
	 * @param folder
	 * @return
	 */
/*	public List<ImageFolder> searchFolderByCondition(ImageFolder folder) {
		return folderDao.findAll(ImageFolderSearchSpecs
				.searchImageFolderByCondition(folder));
	}*/

	/**
	 * 创建用户黙认相册
	 * 
	 * @param userId
	 */
	public ImageFolder createUserDefaultFolder(Long userId) {
		ImageFolder imageFolder = new ImageFolder();
		imageFolder.setCreateBy(userId);
		imageFolder.setCreateDate(new Date());
		//imageFolder.setFolderName(KeyWord.DEFAULT_IMAGE_FOLDER);
		imageFolder.setFolderName("用户默认相册");
		imageFolder.setFolderType(KeyWord.USER_DEFAULT_FOLDER);
		imageFolder.setIsDefault(KeyWord.DEFALUT_IMAGE_FOLDER_TYPE);
		this.saveFolder(imageFolder);
		return imageFolder;

	}

	/**
	 * 创建群组默认相册
	 * 
	 * @param teamId
	 * @return
	 */
	/*public ImageFolder createTeamDefaultFolder(Long teamId) {
		Team team = teamDao.findOne(teamId);
		ImageFolder imageFolder = new ImageFolder();
		imageFolder.setCreateBy(team.getCreateId());
		imageFolder.setCreateDate(new Date());
		imageFolder.setFolderName(KeyWord.DEFALUT_TEAM_IMAGE_FOLDER);
		imageFolder.setFolderType(KeyWord.TEAM_DEFAULT_FOLDER);
		imageFolder.setIsDefault(KeyWord.DEFALUT_IMAGE_FOLDER_TYPE);
		imageFolder.setTeamId(teamId);
		this.saveFolder(imageFolder);
		// folderDao.save(imageFolder);
		return imageFolder;
	}*/
	
	/**
	 * 创建系统默认相册
	 * 
	 * @param teamId
	 * @return
	 */
	public ImageFolder createSystemDefaultFolder() {

		ImageFolder imageFolder = new ImageFolder();
		imageFolder.setCreateBy(1l);
		imageFolder.setCreateDate(new Date());
		//imageFolder.setFolderName(KeyWord.DEFALUT_SYSTEM_IMAGE_FOLDER);
		imageFolder.setFolderName("系统默认相册");
		imageFolder.setFolderType(KeyWord.SYSTEM_DEFAULT_FOLDER);
		imageFolder.setIsDefault(KeyWord.DEFALUT_IMAGE_FOLDER_TYPE);
		this.saveFolder(imageFolder);
		// folderDao.save(imageFolder);
		return imageFolder;
	}
	/**
	 * 验证系统相册是否存在
	 * @param folder
	 */
	private void checkDefaultIsExists(ImageFolder folder) {
		if (folder.getFolderType().equals(KeyWord.USER_DEFAULT_FOLDER)) {
			ImageFolder defultFolder = folderDao.findUserDefaultFolder(folder.getCreateBy());
			if (null != defultFolder) {
				//throw new RestException(MessageSourceHelper.GetMessages("app.service.business.image.ImageFolderService.user.photo.exist"));
				throw new RestException("个人默认相册不存在");
				
			}
		} else if (folder.getFolderType().equals(
				KeyWord.TEAM_DEFAULT_FOLDER)) {
			ImageFolder defultFolder = folderDao.findTeamDefaultFolder(folder.getTeamId());
			if (null != defultFolder) {
				//throw new RestException(MessageSourceHelper.GetMessages("app.service.business.image.ImageFolderService.team.photo.exist"));
				throw new RestException("群组默认相册不存在");
				
			}
		} else {
			ImageFolder defaultSystemFolder = folderDao.findSystemDefaultFolder();
			if (null != defaultSystemFolder) {
				//throw new RestException(MessageSourceHelper.GetMessages("app.service.business.image.ImageFolderService.default.photo.exist"));
				throw new RestException("系统默认相册存在");
				
			}
		}
	}

	/**
	 * 添加图片到相册
	 * @param folderId
	 * @param imageId
	 */
	public void addImage(Long folderId, Long imageId) throws Exception {
		ImageFolder imageFolder = folderDao.findOne(folderId);
		saveImageToFolder(imageId, imageFolder);
	}
	
	/**
	 * 添加图片到系统相册
	 * @param imageId
	 */
	public void copyImageToSystemFolder(Long imageId){
		ImageFolder imageFolder = this.getDefaultFolderByIdType(null, KeyWord.SYSTEM_DEFAULT_FOLDER);
		saveImageToFolder(imageId, imageFolder);
	}

	private void saveImageToFolder(Long imageId, ImageFolder imageFolder) {
		Image image =imageDao.findOne(imageId);
		List<Image> list = imageFolder.getImageList();
		if(!list.contains(image)){
			list.add(image);
		}else{
			return;
		}
		folderDao.save(imageFolder);
	}
	
	public void deleteImage(Long folderId,Long imageId){
		ImageFolder imageFolder = folderDao.findOne(folderId);
		Image image =imageDao.findOne(imageId);
		List<Image> list = imageFolder.getImageList();
		if(list.contains(image)){
			list.remove(image);
		}
		folderDao.save(imageFolder);
	}
	/**
	 * 批量添加图片对相册
	 * @param folderId
	 * @param imageIds
	 */
	public void addImages(Long folderId,String imageIds) throws Exception {
		ImageFolder imageFolder = folderDao.findOne(folderId);
		List<Image> list = imageFolder.getImageList();
		String[] ids = imageIds.split(",");
		for (String imageId : ids) {
			Image image =imageDao.findOne(Long.valueOf(imageId));
			if(null!=image && !list.contains(image)){
				list.add(image);
			}
		}
		folderDao.save(imageFolder);
		//更新封面
		updateFolderCover(imageFolder.getId());
	}
	
	/**
	 * 批量删除相册
	 * @param folderId
	 * @param imageIds
	 */
	public void deleteImages(Long folderId,String imageIds){
		ImageFolder imageFolder = folderDao.findOne(folderId);
		List<Image> list = imageFolder.getImageList();
		String[] ids = imageIds.split(",");
		for (String imageId : ids) {
			Image image =imageDao.findOne(Long.valueOf(imageId));
			if(list.contains(image)){
				list.remove(image);
			}
		}
		folderDao.save(imageFolder);

	}
	
	
	/**
	 * 校验该folderId是否系统相册
	 * @param folderId
	 * @return
	 */
	public boolean checkSystemFolderId(Long folderId) {
		ImageFolder imageFolder = this.findById(folderId);
		if(imageFolder!=null && imageFolder.getFolderType().equals(KeyWord.IMAGE_FOLDER_TYPE_SYSTEM)){
			return true;
		}else{
			return false;
		}
		
	}
	
	/**
	 * 相册分页查询
	 * 不包含imageList的映射
	 * @param ImageFolderQuery
	 * @return
	 * @throws Exception
	 */
	public Page<ImageFolder> searchImageFolder(ImageFolder ImageFolderQuery) throws Exception{
		PageInfo pageinfo = ImageFolderQuery.getPageInfo();
		if(pageinfo==null){
			pageinfo = new PageInfo();
		}
		ImageFolderQuery.setImageList(null);
		Map<String, Object> searchParams = SearchFilterUtil.convertBean(ImageFolderQuery);
		String folderName = (String)searchParams.get("folderName");
		if(folderName!=null&&!folderName.isEmpty()){
			searchParams.remove("folderName");
			searchParams.put(Operator.LIKE + StringPool.UNDERLINE + "folderName", folderName);
		}
		String remark = (String)searchParams.get("remark");
		if(remark!=null&&!remark.isEmpty()){
			searchParams.remove("remark");
			searchParams.put(Operator.LIKE + StringPool.UNDERLINE + "remark", remark);
		}
		Map<String, SearchFilter> filters = SearchFilterUtil.parse(searchParams);
		Specification<ImageFolder> spec = DynamicSpecifications.bySearchFilter(filters.values(), ImageFolder.class);
		PageRequest pageRequest = buildPageRequest(pageinfo.getPageNumber(), pageinfo.getPageSize(), pageinfo.getSortColumn());		
		Page<ImageFolder> page= folderDao.findAll(spec,pageRequest);

		return page;
	}

	public void updateFolderCover(Long imageFolderId) throws Exception {
		ImageFolder imageFolder = folderDao.findImageFolderByFolderId(imageFolderId);
		int i=0;
		List<String> fileList = Lists.newArrayList();
		for(Image image : imageFolder.getImageList()){
			if(i > 4) break;
			fileList.add(PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_ROOT_PATH) + image.getMinUrl());
//			fileList.add(PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + image.getMinUrl());
			i++;
		}
		
		if(fileList.size() < 4){
			//图片不足4张,补充空白图片
			for(int j=fileList.size(); j<4; j ++){
				String defaultPictureUrl = PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_ROOT_PATH) + "avatar/default_picture.jpg";
				fileList.add(defaultPictureUrl);
			}
		}
		
		String[] ctxPath = UploadUtil.GetCreatePathWithSuffix(imageFolder.getFolderName()+"_img.jpg",null);
		ImageUtil.plus(fileList,ctxPath[0]);
		
		imageFolder.setCoverImgeUrl(ctxPath[1]);
		
		updateFolder(imageFolder);		
	}
	/*
	public Map<String, Object> findImageFolderByTeamId(Long teamId, Long currUserId) throws Exception {
		//判断群组是否在存在
		Team team = teamService.findTeamByTeamId(teamId);
		if(team == null){
			throw new Exception(MessageSourceHelper.GetMessages("app.service.business.attachment.AttachmentFolderService.team.notexist"));
		}
		
		//判断用户是否为群组用户
		boolean isTeamUser = teamService.isTeamUser(teamId, currUserId);
		if(!isTeamUser){
			throw new Exception(MessageSourceHelper.GetMessages("app.service.business.image.ImageFolderService.deny.invite"));
		}
		//判断用户是否为该群组的管理员
		boolean isTeamManager = team.getCreateId().longValue() == currUserId.longValue();
		
		ImageFolder defaultImageFoler = getDefaultFolderByIdType(teamId, "2");
		ImageFolderVo imageFolderVo = BeanMapper.map(defaultImageFoler, ImageFolderVo.class);
		Map<String, Object> result = Maps.newHashMap();
		result.put(MobileKey.CODE, BusinessStatus.OK);
		result.put("imageFolderVo", imageFolderVo);
		result.put("isManager", isTeamManager ? "1" : "0");
		return result;
	}
*/
	public void moveImage(Long imageId, Long oldFolderId, Long newFolderId) throws Exception {
		deleteImage(oldFolderId, imageId);
		addImage(newFolderId, imageId);
		
	}
}
