package com.iris.service.attachment;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.constant.KeyWord;
import com.google.common.collect.Lists;
import com.iris.entity.Attachment;
import com.iris.entity.AttachmentFolder;
import com.iris.repository.attachment.AttachmentDao;
import com.iris.repository.attachment.AttachmentFolderDao;
import com.iris.service.BaseService;
import com.utils.UploadUtil;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;

@Service
@Transactional
public class AttachmentFolderService extends BaseService {

	@Autowired
	AttachmentFolderDao dao;

	
//	@Resource
//	private UserInfoDaoPlus userInfoDaoPlus;

	@Autowired
	private AttachmentDao attachmentDao;
//	@Autowired
//	private TeamService teamService;
	
	/**
	 * 根据用户id创建用户的默认文档文件夹并返回默认文件夹的id 如果默认文档文件夹已经创建了，不会重新创建，一个用户只有一个默认
	 * 
	 * @param userId
	 * @return
	 */
	public Long getDefaultFolder(long userId) {
		AttachmentFolder folder = dao.findDefaultFolderByUserId(userId);
		if (folder == null) {
			
			folder = new AttachmentFolder();
			folder.setFolderName("系统默认文件夹");
			folder.setIsDefault(KeyWord.DEFAULT_DOC_FOLDER_TYPE);
			folder.setParentId(KeyWord.DEFAULT_PARENT_ID);
			folder.setDelFlag(KeyWord.UN_DEL_STATUS);
			folder.setUserId(userId);
			//folder.setOrgId(user.getOrgId());
			folder.setOrgId(1l);
			dao.save(folder);
		}
		return folder.getId();
	}

	/**
	 * 获取群组默认文件夹
	 * 
	 * @param teamId
	 * @return
	 */
/*	public Long getTeamDefaultFolder(Long teamId) {
		AttachmentFolder folder = dao.findDefalutFolderByTeamId(teamId);
		if (folder == null) {
			Team team = teamDao.findOne(teamId);
			folder = new AttachmentFolder();
			folder.setFolderName(KeyWord.TEAM_DEFAULT_DOC_FOLDER);
			folder.setIsDefault(KeyWord.DEFAULT_DOC_FOLDER_TYPE);
			folder.setParentId(KeyWord.DEFAULT_PARENT_ID);
			folder.setDelFlag(KeyWord.UN_DEL_STATUS);
			folder.setUserId(team.getCreateId());
			folder.setTeamId(team.getId());
			folder.setOrgId(team.getOrgId());
			dao.save(folder);
		}
		return folder.getId();
	}*/

	/**
	 * 创建普通文件夹
	 * 
	 * @param folder
	 * @return
	 */
	public Long saveFolder(AttachmentFolder folder) {
		if (folder.getIsDefault() != null
				&& folder.getIsDefault()
						.equals(KeyWord.DEFAULT_DOC_FOLDER_TYPE)) {
			throw new RuntimeException("创建文件夹失败");
		}
		folder.setCoverImgeUrl("/avatar/default_file.jpg");
		dao.save(folder);
		return folder.getId();
	}

	/**
	 * 修改文件夹信息
	 * 
	 * @param folder
	 */
	public void updateFolder(AttachmentFolder folder) {
		folder.setUpdateDate(new Date());
		dao.save(folder);
	}

	/**
	 * 根据文件夹id来删除，逻辑删除
	 * 
	 * @param folderId
	 */
	public void deleteFolder(long folderId) {
		AttachmentFolder folder = this.findFolderById(folderId);
		if (folder.getIsDefault().equals(KeyWord.DEFAULT_DOC_FOLDER_TYPE)) {
			throw new RuntimeException("删除失败");
		}
		folder.setDelFlag(KeyWord.DEL_STATUS);
		updateFolder(folder);
	}

	/**
	 * 根据文件夹id查询文件夹信息
	 * 
	 * @param folderId
	 * @return
	 */
	public AttachmentFolder findFolderById(long folderId) {
		return dao.findOne(folderId);
	}

	/**
	 * 根据用户id查询文件夹列表
	 * 
	 * @param userId
	 * @return
	 */
	public List<AttachmentFolder> getFolderListByUserId(long userId) {
		return dao.findFolderByUserId(userId);
	}

	/**
	 * 物理删除文件夹
	 * 
	 * @param folderId
	 */
	@Deprecated
	public void delete(long folderId) {
		dao.delete(folderId);
	}

	public void updateCover(Long folderId) throws Exception {

		AttachmentFolder attachmentFolder = dao.findOne(folderId);

		List<String> fileImageList = Lists.newArrayList();

		List<Attachment> attachmentList = attachmentDao.findAttachmentByFolderId(folderId);

		int i = 0;

		for (Attachment at : attachmentList) {
			if (i > 4)
				break;
			fileImageList.add(PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_ROOT_PATH) + "avatar/" + at.getFileType() + ".jpg");
//			fileImageList.add(PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_DOWNLOAD_PATH) + "/avatar/" + at.getFileType() + ".jpg");
			i++;
		}

		if (fileImageList.size() < 4) {
			// 图片不足4张,补充空白图片
			for (int j = fileImageList.size(); j < 4; j++) {
				String defaultPictureUrl = PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_ROOT_PATH) + "avatar/default_file.jpg";
				fileImageList.add(defaultPictureUrl);
			}
		}

		String[] ctxPath = UploadUtil.GetCreatePathWithSuffix(attachmentFolder.getFolderName() + "_file.jpg", null);
		
		com.utils.ImageUtil.plus(fileImageList, ctxPath[0]);

		attachmentFolder.setCoverImgeUrl(ctxPath[1]);

		updateFolder(attachmentFolder);
	}

	/*
	public Map<String, Object> findTeamFolders(Long teamId, Long currentUserId)
			throws Exception {
		// 判断群组是否在存在
		Team team = teamService.findTeamByTeamId(teamId);
		if (team == null) {
			throw new Exception(MessageSourceHelper.GetMessages("app.service.business.attachment.AttachmentFolderService.team.notexist"));
		}

		// 判断用户是否为群组用户
		boolean isTeamUser = teamService.isTeamUser(teamId, currentUserId);
		if (!isTeamUser) {
			throw new Exception(MessageSourceHelper.GetMessages("app.service.business.attachment.AttachmentFolderService.deny.visit"));
		}
		// 判断用户是否为该群组的管理员
		boolean isTeamManager = team.getCreateId().longValue() == currentUserId.longValue();
		
		Long folderId = getTeamDefaultFolder(teamId);
		
		AttachmentFolder folder = findFolderById(folderId);
		
		AttachmentFolderVo vo = BeanMapper.map(folder, AttachmentFolderVo.class);
		
		Map<String, Object> result = Maps.newHashMap();
		result.put(MobileKey.CODE, BusinessStatus.OK);
		result.put("attachmentFolderVo", vo);
		result.put("isManager", isTeamManager ? "1" : "0");
		return result;
	}*/

}
