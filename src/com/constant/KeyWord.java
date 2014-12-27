package com.constant;



public interface KeyWord {
	
	/*---------------- 相册 ---------------------*/

	//系统相册
	public static final String IMAGE_FOLDER_TYPE_SYSTEM="1";
	//群组相册
	public static final String IMAGE_FOLDER_TYPE_TEAM="2";
	//用户相册
	public static final String IMAGE_FOLDER_TYPE_USER="3";
	//头像
	public static final String IMAGE_FOLDER_TYPE_HEADSHOT ="4";
	
	//默认相册
	public static final String DEFALUT_IMAGE_FOLDER_TYPE="1";
	//非默认相册
	public static final String UNDEFAULT_IMAGE_FOLDER_TYPE="0";
	
	//消息类型的附件
	public static final String ATTACHMENT_TYPE_STREAM="S";
	//博客分享
	public static final String ATTACHMENT_TYPE_BLOG="B";
	//问答
	public static final String ATTACHMENT_TYPE_QUESTION="Q";
	
	//本地上传附件类型
	public static final String LOCAL_ATTACHMENT="1";
	
	//网盘附件类型
	public static final String INTERNET_ATTACHMENT = "2";
	
	//默认文件夹类型
	public static final String DEFAULT_DOC_FOLDER_TYPE="1";
	
	//非默认文件夹类型
	public static final String NOT_DEFAULT_DOC_FOLDER_TYPE = "0";
	
	//默认父文件夹id
	public static final long DEFAULT_PARENT_ID = 0;
	
	//删除状态
	public static final int DEL_STATUS = 1;
	
	//非删除状态
	public static final int UN_DEL_STATUS = 0;
	
	/*---------------- 消息---------------------*/
	public static final int SEND_ALL_PEOPLE_Y = 1;
	public static final int SEND_ALL_PEOPLE_N = 0;
	
	//类型：M-正文；D-草稿；A-提交审批
	public static final String STREAM_TYPE_MAIN = "M";
	public static final String STREAM_TYPE_DRAFT = "D";
	public static final String STREAM_TYPE_APPROVE = "A";
	
	//操作标示, 被回复:R，被转发:F
	public static final String STREAM_ACTION_RETURN = "R";
	public static final String STREAM_ACTION_FORWARD = "F";
	
	//消息来源 : 0-web ;1-ios,2-android; 3-RSS; 4-Email; 5-微博 ; 6-微信; 
	public static final int STREAMCOMEFROM_WEB = 0;
	public static final int STREAMCOMEFROM_IOS = 1;
	public static final int STREAMCOMEFROM_ANDROID = 2;
	public static final int STREAMCOMEFROM_RSS = 3;
	public static final int STREAMCOMEFROM_EMAIL = 4;
	public static final int STREAMCOMEFROM_WEIBO = 5;
	public static final int STREAMCOMEFROM_WEIXIN = 6;
	public static final int STREAMCOMEFROM_WEIXIN_REPLY = 8; //微信回复
	public static final int STREAMCOMEFROM_SINA = 7;
	public static final int STREAMCOMEFROM_HELPDESK = 9;
	

	//消息附件物
	public static final String ANNEXATION_ATTACHMENT = "A";
	public static final String ANNEXATION_SCHEDULE = "B";
	public static final String ANNEXATION_VOTE = "C";
	public static final String ANNEXATION_IMAGE = "D";
	public static final String ANNEXATION_TAG = "T";
	public static final String ANNEXATION_LOTTERY = "E";
	
	//投票类型
	public static final int VOTE_TYPE_RADIO = 0;
	public static final int VOTE_TYPE_CHECKBOX = 1;
	
	public static final int YES = 1;
	public static final int NO = 0;
	
	public static final String Y = "Y";
	public static final String N = "N";
	
	public static final String STREAM_STAR = "star";
	
	//约会应答

	public static final int SCHEDULE_REPLY_OK = 1;

	public static final int SCHEDULE_REPLY_NO = 2;
	public static final int SCHEDULE_REPLY_MAYBE = 3;
	
	
	/*---------------- 赞类型---------------------*/
	//消息
	public static final int MENTION_STREAM = 1;
	//图片
	public static final int MENTION_IMAGE = 2;
	//评论
	public static final int MENTION_COMMENT = 3;
	//分享（贴子）
	public static final int MENTION_BLOG = 4;
	//问答
	public static final int MENTION_QA = 5;
	//问答回复
	public static final int MENTION_QA_ANSWER = 6;
	
	//消息接收者类型
	public static final String RECEIVERTYPE_TEAM = "S";
	public static final String RECEIVERTYPE_USER = "U";
	
	//消息接收抄送类型
	public static final String CC_TYPE_TO = "T";
	public static final String CC_TYPE_CC = "C";
	public static final String CC_TYPE_BCC = "B";
	
	public static final Integer STREAM_IS_ADMIN_Y = 1;
	public static final Integer STREAM_IS_ADMIN_N = 0;
	
	/*---------------- 评论 ---------------------*/
	//评论的类型
	public static final int COMMENTTYPE_STREAM = 1;
	//消息评论的评论
	public static final int COMMENTTYPE_COMMENTOFSTREAM = 2;
	
	//给分享的评论
	public static final int COMMENTTYPE_SHARE = 3;
	
	//给分享评论的评论
	public static final int COMMENTTYPE_COMMENTFORSHARE = 4;
	
	//不可见
	public static final int SEC_INVISIBLE_Y = 1;
	//可见
	public static final int SEC_INVISIBLE_N = 0;
	//用户头像类型相册
	public static final String USER_HEADIMG_FOLDER= "4";
	//用户类型的相册
	public static final String USER_DEFAULT_FOLDER= "3";
	//群组类型的相册
	public static final String TEAM_DEFAULT_FOLDER= "2";
	//系统类型的相册
	public static final String SYSTEM_DEFAULT_FOLDER= "1";

	//私聊内容类型
	public static final Integer CHAT_CONTENT_TYPE_IMG = 1;
	public static final Integer CHAT_CONTENT_TYPE_FILE = 2;
	public static final Integer CHAT_CONTENT_TYPE_TEXT = 0;
	
	//消息已读/未读
	public static final String message_read = "0";
	public static final String message_unread = "1";
	
	public static final String NEW_TEMAP_TYPE = "0";
	public static final String NOTICE_TEMP_TYPE = "1";
	
	//公告类型
	public final static String NOTICE_TYPE_CODE = "NOTICE_TYPE";
	public final static int NOTICE_TYPE_NOTICE = 1;//公告
	public final static int NOTICE_TYPE_HOLIDAY = 2;//节假日
	public final static int NOTICE_TYPE_MEMORIALDAY = 3;//纪念日
	public final static int NOTICE_TYPE_NEWS = 4;//新闻
	
	//性别（男）
	public static final int GENDER_MALE = 1;
	//性别(女)
	public static final int GENDER_FAMALE = 0;
	
	//用户是否公开手机
	public static final int USER_VIEW_PHONE_VISIBLE = 1;
	public static final int USER_VIEW_PHONE_HIDE = 0;
	
	//男头像id
	public static final Long GENDER_MALE_IMAGE_ID = 2l;
	
	//女头像 id
	public static final Long GENDER_FEMALE_IMAGE_ID = 1l;
	
	//第三方接入类型
	public static final int THIRDACCOUNT_TYPE_KP = 1;//金山快盘
	public static final int THIRDACCOUNT_TYPE_SINA = 2;//新浪
	public static final int THIRDACCOUNT_TYPE_TENCENT = 3;//腾讯
	public static final int THIRDACCOUNT_TYPE_VDISK = 4;//微盘
	public static final int THIRDACCOUNT_TYPE_RSS = 5;//RSS
	public static final int THIRDACCOUNT_TYPE_EVERNOTE = 6;//印象笔记
	public static final int THIRDACCOUNT_TYPE_WEIXIN = 7;//微信
	public static final int THIRDACCOUNT_TYPE_WEIXIN_BIND = 8;//微信(捆绑用)
	
	//微信
	public static final int PUBLIC_WEIXIN_FW = 1;//微信服务号
	public static final int PUBLIC_WEIXIN_DY = 2;//微信订阅号
	
	// 金山快盘对象
	public static final String JSKP = "JSKP";
	
	
	//公告-普通公告
	public static final int NOTICE_NORMAL = 1;
	//公告-节假日
	public static final int NOTICE_HOLIDAY = 2;
	//公告-纪念日
	public static final int NOTICE_MEMORIAL = 3;
	
//	public static final String STREAM_DETAIL_LINK = "/mobile/stream/detail/";
	//接收消息
	public static final Short RECEIVE_MESSAGE = 1; 
	//不接收消息
	public static final Short NOT_RECEIVE_MESSAGE = 0; 
	
	/*---------------- Mobile ---------------------*/
	
	public static final String ANDRIOD_CLIENT = "andriod";
	public static final String IOS_CLIENT = "iso";
	
	/*---------------- 标签 ---------------------*/
	public static final String TAG_TYPE_TEAM = "T";		//群组
	public static final String TAG_TYPE_USER = "U";		//用户
	public static final String TAG_TYPE_STREAM = "S";	//消息
	public static final String TAG_TYPE_ITEM = "I";		//标签系列
	public static final String TAG_TYPE_BLOG = "B";		//博客分享
	
	//积分对象类型 
	public static final String INTEGRAL_USER = "1";//用户
	public static final String INTEGRAL_BLOG = "2";//分享（贴子）
	public static final String INTEGRAL_QA = "3"; //问答
	public static final String INTEGRAL_QA_COMMENT = "4";//回答
	
	//积分项类型 
	//1:分享 2：评论 3： 赞 ,4：问答 5：问答回复
	public static final String INTEGRAL_TYPE_BLOG = "1";//用户发布一条分享加分类型
	public static final String INTEGRAL_TYPE_COMMENT = "2";//用户分布评论，对应分享加分类型
	public static final String INTEGRAL_TYPE_PRAISE = "3";//用户赞后，分享加分类型
	public static final String INTEGRAL_TYPE_QA = "4";//用户发布一条问答加分类型
	public static final String INTEGRAL_TYPE_QA_COMMENT = "5";//用户发布一条回答，问答加分类型
	public static final String INTEGRAL_TYPE_COMMENT_USER = "6";//用户发布一条评论，用户加分类型
	public static final String INTEGRAL_TYPE_QA_COMMENT_USER = "7";//用户发布一条问答回答，用户加分类型 
	public static final String INTEGRAL_TYPE_QA_SLOVE = "8"; //问答回答被原作者标识为已经解决来，回答的用户加分类型

	
	//新增为正
	public static final int ACTION_TYPE_CREATE = 1;
	//删除为负
	public static final int ACTION_TYPE_DELETE = -1;
	//允许用户从手机端登陆
	public static final short ALLOW_LOGIN_FROM_MOBILE = 1;
	public static final short NOT_ALLOW_LOGIN_FROM_MOBILE = 0;
	
	
	public static final int DEFAULT_VALUE_ZORE = 0;
	
	public static final int DRAFT_VALUE = 1;
	
	public static final int UN_DRAFT_VALUE = 0;
	
	public static final int IS_OWNER_YES = 1;
	
	public static final int IS_OWNER_NO = 0;
	
	/*---------------- Team ---------------------*/
	
	public static final long TEAM_HELPDESK_ID = 1;
	
	public static final int TEAM_OPEN_STATUS = 1;
	
	//0-仅群内可发;1-所有人可发
	public static final int TEAM_WRITE_YES = 1;
	public static final int TEAM_WRITE_NO = 0;
	
	public static final int TEAM_UN_OPEN_STATUS = 0;
	
	public static final int TEAM_MEMBER_STATUS = 1;
	
	public static final int UN_TEAM_MEMBER_STATUS = 0;
	
	/*---------------- Remind ---------------------*/
	
	public static final Integer REMIND_TYPE_USER = 1;
	public static final Integer REMIND_TYPE_TEAM = 2;
	
	public static final Long TEAM_CREATER_SHOW = 28L;
	public static final Long TEAM_USER_SHOW = 29L;
	public static final Long STREAM_DETAIL = 38L;
	public static final Long BLOG_SHOW = 51L;
	public static final Long COMMENT_SHOW = 60L;
	public static final Long QUESTION_SHOW = 118L;
	
	/*------------------Register-----------------*/
	public static final String REGISTER_TYPE_USER = "U";//普通用户注册
	public static final String REGISTER_TYPE_ADMIN = "A";//管理员添加
	public static final String REGISTER_TYPE_REGISTER = "R";//已激活
	
	/*------------------weixin-----------------*/
	public static final int WEIXIN_FW = 1;
	public static final int WEIXIN_DY = 2;
	//未解决
	public static final int UNSOLUTION = 0;
	public static final int SOLUTION = 1;
	

	
	/*------------------Meeting-----------------*/
	public static final String MEETING_STATUS_HOLDING = "H";//会议举行中
	public static final String MEETING_STATUS_CLOSED = "C";//会议结束
	

	/*-----------------图片来源类型----------------*/
	public static final int IMAGE_SOURCE_BLOG = 1;
	public static final int IMAGE_SOURCE_QUESTION = 2;
	public static final int IMAGE_SOURCE_ANSWER = 3;
	public static final int IMAGE_SOURCE_STREAM = 4;
	
	/*----------------blog 类型 --------------*/
	public static final int IS_SINGUP=1;
	public static final int IS_NOT_SINGUP =0 ;
	
	/*-----活动状态------*/
	public static final int PROJECT_STATUS_END = 1 ;
	public static final int PROJECT_STATUS_UNSTART = 2 ;
	public static final int PROJECT_STATUS_STARTING = 3 ;
	
	//系统语言
	public static final String SYSTEM_LANGUAGE_ZH = "zh";
	

	
}

