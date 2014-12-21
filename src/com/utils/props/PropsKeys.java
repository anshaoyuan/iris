
package com.utils.props;

public class PropsKeys {
	
	public static final String SEARCHER_SOLR_URL = "searcher.solr.url";
	
	public static final String SMS_HTTP_URL = "sms.http.url";
	public static final String SMS_HTTP_ACCOUNT = "sms.http.account";
	public static final String SMS_HTTP_PASSWD = "sms.http.passwd";
	
	public static final String LOCAL_TEST_URL = "local.test.url";
	
	public static final String SSO_CAS_SERVER_URL = "sso.casServerUrl";
	
	public static final String SSO_CAS_SERVICE = "sso.casService";
	
	public static final String AUDIT_LOG_ENABLED = "audit.log.enabled";
	
	public static final String SEND_MOBILEMSG_ENABLED = "send.mobilemsg.enabled";
	
	public static final String SYSTEM_ERROR_LOG_ENABLED = "system.error.log.enabled";
	
	public static final String THREAD_POOL_TASK_EXECUTOR = "thread.pool.task.executor";
	
	public static final String THREAD_POOL_TASK_EXECUTOR_CONCURRENCY_LIMIT = "thread.pool.task.executor.concurrency.limit";
	
	public static final String DEFAULT_QUEUE_SIZE = "default.queue.size";
	public static final String DEFAULT_DAEMON_DELAY = "default.daemon.delay.milliscond";
	public static final String DEFAULT_KEEP_ALIVE_SECONDS = "default.keep.alive.seconds";
	
	//大池子
	public static final String LARGE_CORE_POOL_SIZE = "large.thread.pool.task.executor.core.pool.size";
	public static final String LARGE_MAX_POOL_SIZE = "large.thread.pool.task.executor.max.pool.size";
	public static final String LARGE_QUEUE_CAPACITY = "large.thread.pool.task.executor.queue.capacity";
	
	//小池子
	public static final String SMALL_CORE_POOL_SIZE = "small.thread.pool.task.executor.core.pool.size";
	public static final String SMALL_MAX_POOL_SIZE = "small.thread.pool.task.executor.max.pool.size";
	public static final String SMALL_QUEUE_CAPACITY = "small.thread.pool.task.executor.queue.capacity";
	
	
	public static final String REDIS_HOST = "redis.host";
	public static final String REDIS_PORT = "redis.port";
	public static final String REDIS_TIMEOUT = "redis.timeout";
	public static final String REDIS_KEY = "redis.key";
	
	public static final String MONGODB_NAME_HOST = "mongodb.name.host";
	
	public static final String MOBILE_ALL_TEXT_ENCRYPTION = "mobile.all.text.encryption";
	
	public static final String MOBILE_TEXT_ENCRYPTION_PRIVATE_KEY = "mobile.text.encryption.private.key";
	
	public static final String MOBILE_TEXT_ENCRYPTION_TYPE = "mobile.text.encryption.type";
	
	public static final String MOBILE_TEXT_ENCRYPTION_KEY_SIZE = "mobile.text.encryption.key.size";
	
	public static final String PASSWORDS_ENCRYPTION_ALGORITHM = "passwords.encryption.algorithm";
	
	public static final String PASSWORDS_DIGEST_ENCODING = "passwords.digest.encoding";
	
	public static final String MOBILE_AUTHENTIC_TYPE = "mobile.authentic.type";
	
	public static final String UPLOAD_FILE_ROOT_PATH ="upload.file.root.path";
	
	public static final String UPLOAD_FILE_DOWNLOAD_PATH ="upload.file.download.path";
	
	public static final String EMAIL_UPLOAD_FILE_ROOT_PATH = "email.upload.file.root.path";
	
	public static final String EMAIL_UPLOAD_FILE_DOWNLOAD_PATH = "email.upload.file.download.path";
	
	public static final String MOBILE_CLIENT_DOWNLOAD_ANDRIOD ="mobile.client.download.andriod";
	
	public static final String MOBILE_CLIENT_DOWNLOAD_IOS ="mobile.client.download.ios";
	
	public static final String MOBILE_CLIENT_UPLOAD_ANDRIOD ="mobile.client.upload.andriod";
	public static final String MOBILE_CLIENT_UPLOAD_IOS ="mobile.client.upload.ios";
	public static final String MOBILE_CLIENT_UPLOAD_IOS_PLIST ="mobile.client.upload.ios.plist";
	
	public static final String DEFAULT_THREAD_COUNT ="default.thread.count";
	
	public static final String UPLOAD_FILE_TYPE_IMG = "upload.file.type.img";
	
	public static final String UPLOAD_FILE_TYPE_DOCUMENT = "upload.file.type.document";
	
	public static final String EMAIL_UPLOAD_FILE_DOCUMENT_SIZE = "email.upload.file.document.size";
	
	public static final String EMAIL_UPLOAD_FILE_IMG_SIZE = "email.upload.file.img.size";
	
	public static final String UPLOAD_IMG_SIZE_MOBILE_WIDTH = "upload.img.size.mobile.width";
	
	public static final String UPLOAD_IMG_SIZE_MID_WIDTH = "upload.img.size.mid.width";
	
	public static final String UPLOAD_IMG_SIZE_MIN_WIDTH = "upload.img.size.min.width";
	
	public static final String MOBILESEND_APPKEY = "mobileSend.appkey";
	
	public static final String MOBILESEND_MASTERSECERT = "mobileSend.mastersecert";
	
	public static final String SERVICE_DOMAIN = "service.domain";
	
	public static final String HTTP_PROXYHOST = "http.proxyHost";
	public static final String HTTP_PROXYPORT = "http.proxyPort";
	
	public static final String WEATHER_IMG_PATH = "weather.imgpath";
	
//	public static final String MAIL_SMTP_USER = "mail.smtp.user";
//	public static final String MAIL_SMTP_PASSWORD = "mail.smtp.password";
//	public static final String MAIL_SMTP_HOST = "mail.smtp.host";
	
	public static final String CMCC_APPID = "cmcc.appid";
	public static final String CMCC_APPPWD = "cmcc.apppwd";
	public static final String CMCC_XCODE = "cmcc.xcode";
	public static final String CMCC_MASAPIPORT = "cmcc.masapiport";
	public static final String CMCC_MASIP = "cmcc.masip";
	public static final String CMCC_PRENUM = "cmcc.prenum";
	public static final String YUN_UID = "yun.uid";
	public static final String YUN_PWD = "yun.pwd";
	public static final String YUN_BASEURL = "yun.baseurl";
	public static final String CMCC_FILE_PATH = "cmcc.file.path";
	
	public static final String WEATHER_ENABLED = "weather.enabled";
	
	public static final String SMS_DOWNLOAD_MOBILE_CLIENT_IOS = "sms.download.mobile.client.ios";
	public static final String SMS_DOWNLOAD_MOBILE_CLIENT_ANDROID = "sms.download.mobile.client.android";
	
	public static final String LOGO_PATH ="logo.path";
	
//	public static final String EMAIL_SERVER_BIN_PATH = "email.server.bin.path";
	
	public static final String MONGODB_POOL_HOST = "mongodb.pool.host";
	public static final String MONGODB_POOL_PORT = "mongodb.pool.port";
	public static final String MONGODB_POOL_POOLSIZE = "mongodb.pool.poolSize";
	public static final String MONGODB_POOL_BLOCKSIZE = "mongodb.pool.blockSize";
	
	
	public static final String MAIL_IMAP_LOCALPORT = "mail.imap.localport";
	public static final String MAIL_SMTP_LOCALPORT = "mail.smtp.localport";
	
	public static final String NODE_CHAT_DOMAIN = "node.chat.domain";
	public static final String NODE_CHAT_SYNC_DISENABLE = "node.chat.sync.disenable";
	
	public static final String NODE_CHAT_APPKEY = "node.chat.appKey";
	public static final String NODE_CHAT_MASTERSECRET = "node.chat.masterSecret";
	
	public static final String OPEN_REGISTRATION = "open.registration";
	
	public static final String DEFAULT_LOCALE = "default.locale";
}
