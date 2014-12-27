package com.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Properties;

/**
 * 文件处理工具类(文件采用UTF-8编码)
 * @author visionet
 */
public class FileUtil {

	/**
	 * 文件夹复制
	 * @param sourceDirName 源文件夹地址
	 * @param destinationDirName 目的文件夹地址
	 */
	public static void copyDirectory(
		String sourceDirName, String destinationDirName) {

		getFile().copyDirectory(sourceDirName, destinationDirName);
	}

	/**
	 * 文件夹复制
	 * @param source 源文件夹
	 * @param destination 目的文件夹
	 */
	public static void copyDirectory(File source, File destination) {
		getFile().copyDirectory(source, destination);
	}

	/**
	 * 文件复制
	 * @param source 源文件地址
	 * @param destination 目的文件地址
	 */
	public static void copyFile(String source, String destination) {
		getFile().copyFile(source, destination);
	}

	/**
	 * 文件复制
	 * @param source 源文件地址
	 * @param destination 目的文件地址
	 * @param lazy 预先对两个文件内容进行判断是否相同
	 */
	public static void copyFile(
		String source, String destination, boolean lazy) {

		getFile().copyFile(source, destination, lazy);
	}

	/**
	 * 文件复制
	 * @param source 源文件
	 * @param destination 目的文件
	 */
	public static void copyFile(File source, File destination) {
		getFile().copyFile(source, destination);
	}

	/**
	 * 文件复制
	 * @param source 源文件
	 * @param destination 目的文件
	 * @param lazy 预先对两个文件内容进行判断是否相同
	 */
	public static void copyFile(File source, File destination, boolean lazy) {
		getFile().copyFile(source, destination, lazy);
	}

	/**
	 * 创建一个临时文件
	 * @return java.io.File
	 */
	public static File createTempFile() {
		return getFile().createTempFile();
	}

	/**
	 * 创建一个指定后缀名的临时文件
	 * @param extension 文件后缀名
	 * @return java.io.file
	 */
	public static File createTempFile(String extension) {
		return getFile().createTempFile(extension);
	}

	/**
	 * 产生一个临时文件名
	 * @return 文件名
	 */
	public static String createTempFileName() {
		return getFile().createTempFileName();
	}

	/**
	 * 产生一个指定后缀名的临时文件名
	 * @param extension 文件后缀名
	 * @return 文件名
	 */
	public static String createTempFileName(String extension) {
		return getFile().createTempFileName(extension);
	}

	/**
	 * 对文件名进行安全编码(非法字符将被替换)
	 * @param fileName 文件名
	 * @return 安全的文件名
	 */
	public static String decodeSafeFileName(String fileName) {
		return getFile().decodeSafeFileName(fileName);
	}

	/**
	 * 删除文件
	 * @param file 文件绝对路径
	 * @return 是否成功
	 */
	public static boolean delete(String file) {
		return getFile().delete(file);
	}

	/**
	 * 删除文件
	 * @param file 文件
	 * @return 是否成功
	 */
	public static boolean delete(File file) {
		return getFile().delete(file);
	}

	/**
	 * 删除文件夹
	 * @param directory 文件夹全路径
	 */
	public static void deltree(String directory) {
		getFile().deltree(directory);
	}

	/**
	 * 删除文件夹
	 * @param directory 文件夹
	 */
	public static void deltree(File directory) {
		getFile().deltree(directory);
	}

	/**
	 * 对文件名进行安全解码(还原回原来文件名)
	 * @param fileName 文件名
	 * @return 解码后的文件名
	 */
	public static String encodeSafeFileName(String fileName) {
		return getFile().encodeSafeFileName(fileName);
	}

	/**
	 * 查看文件是否存在
	 * @param fileName 绝对路径文件名
	 * @return 存在
	 */
	public static boolean exists(String fileName) {
		return getFile().exists(fileName);
	}

	/**
	 * 查看文件是否存在
	 * @param file 文件
	 * @return 存在
	 */
	public static boolean exists(File file) {
		return getFile().exists(file);
	}

	/**
	 * 通过一个文件流和文件名来提取文本
	 * @param  文件流
	 * @param  文件名或者扩展名
	 * @return 如果是支持的格式提取出文本，如果不支持则运回""
	 */
	public static String extractText(InputStream is, String fileName) {
		return getFile().extractText(is, fileName);
	}

	/**
	 * 取得文件绝对路径
	 * @param file 文件
	 * @return 文件绝对路径
	 */
	public static String getAbsolutePath(File file) {
		return getFile().getAbsolutePath(file);
	}

	/**
	 * 读取文件二进制流
	 * @param file 文件
	 * @return 二进制内容
	 * @throws IOException
	 */
	public static byte[] getBytes(File file) throws IOException {
		return getFile().getBytes(file);
	}

	/**
	 * 读取二进制流
	 * @param is 二进制流
	 * @return 二进制内容
	 * @throws IOException
	 */
	public static byte[] getBytes(InputStream is) throws IOException {
		return getFile().getBytes(is);
	}

	/**
	 * 读取二进制流
	 * @param is 二进制流
	 * @param bufferSize 缓冲区大小
	 * @return 二进制内容
	 * @throws IOException
	 */
	public static byte[] getBytes(InputStream is, int bufferSize)
		throws IOException {

		return getFile().getBytes(is);
	}

	/**
	 * 取得文件后缀名
	 * @param fileName 文件名
	 * @return 后缀名
	 */
	public static String getExtension(String fileName) {
		return getFile().getExtension(fileName);
	}

	public static com.utils.File getFile() {
		return _file;
	}

	/**
	 * 取得文件路径
	 * @param fullFileName 文件绝对路径名称
	 * @return 文件路径
	 */
	public static String getPath(String fullFileName) {
		return getFile().getPath(fullFileName);
	}

	/**
	 * 取得文件名称
	 * @param fullFileName 文件绝对路径名称
	 * @return 相对名称
	 */
	public static String getShortFileName(String fullFileName) {
		return getFile().getShortFileName(fullFileName);
	}

	/**
	 * 查看文件是否是ASCII文件（即文本文件）
	 * @param file 文件
	 * @return 是否ASCII文件
	 * @throws IOException
	 */
//	public static boolean isAscii(File file) throws IOException {
//		return getFile().isAscii(file);
//	}

	/**
	 * 返回文件夹下子文件夹
	 * @param fileName 文件夹绝路径
	 * @return 文件夹数组
	 */
	public static String[] listDirs(String fileName) {
		return getFile().listDirs(fileName);
	}

	/**
	 * 返回文件夹下子文件夹
	 * @param file 文件夹
	 * @return 文件夹数组
	 */
	public static String[] listDirs(File file) {
		return getFile().listDirs(file);
	}

	/**
	 * 返回文件夹下子文件
	 * @param fileName 文件绝对路径
	 * @return 文件数组
	 */
	public static String[] listFiles(String fileName) {
		return getFile().listFiles(fileName);
	}

	/**
	 * 返回文件夹下子文件
	 * @param file 文件夹
	 * @return 文件数组
	 */
	public static String[] listFiles(File file) {
		return getFile().listFiles(file);
	}

	/**
	 * 创建文件夹
	 * @param pathName 文件夹路径
	 */
	public static void mkdirs(String pathName) {
		getFile().mkdirs(pathName);
	}

	/**
	 * 移动文件
	 * @param sourceFileName 源文件绝对路径
	 * @param destinationFileName 绝对文件路径
	 * @return 成功，源文件不存在返回false
	 */
	public static boolean move(
		String sourceFileName, String destinationFileName) {

		return getFile().move(sourceFileName, destinationFileName);
	}

	/**
	 * 移动文件
	 * @param source 源文件
	 * @param destination 目标文件
	 * @return 成功，源文件不存在返回false
	 */
	public static boolean move(File source, File destination) {
		return getFile().move(source, destination);
	}

	/**
	 * 读取文件
	 * @param fileName 文件绝对路径
	 * @return 文件内容
	 * @throws IOException
	 */
	public static String read(String fileName) throws IOException {
		return getFile().read(fileName);
	}

	/**
	 * 读取文件
	 * @param file 文件
	 * @return 文件内容
	 * @throws IOException
	 */
	public static String read(File file) throws IOException {
		return getFile().read(file);
	}

	/**
	 * 读取文件
	 * @param file 文件
	 * @param raw 处理换行符
	 * @return 文件内容
	 * @throws IOException
	 */
	public static String read(File file, boolean raw) throws IOException {
		return getFile().read(file, raw);
	}
	
	/**
	 * 从文本指定位置开始读
	 * @param file 文件
	 * @param offset 启始位置
	 * @param length 读取长度
	 * @return
	 * @throws IOException
	 */
	public static String read(File file, int offset, int length)throws IOException{
		return getFile().read(file, offset, length);
	}
	
	/**
	 * 从输入流指定位置开始读
	 * @param is 输入流
	 * @param offset 启始位置
	 * @param length 读取长度
	 * @return
	 * @throws IOException
	 */
	public static byte[] read(InputStream is, int offset, int length)throws IOException{
		return getFile().read(is, offset, length);
	}

	/**
	 * 将文件名中"\"改为"/"
	 * @param fileName
	 * @return 修改后的文件名
	 */
	public static String replaceSeparator(String fileName) {
		return getFile().replaceSeparator(fileName);
	}

	/**
	 * 对文件按文件名进行排序（所有文件夹排在文件前面）
	 * @param files 文件数组
	 * @return 排序后的文件数组
	 */
	public static File[] sortFiles(File[] files) {
		return getFile().sortFiles(files);
	}

	/**
	 * 剥去文件后缀名
	 * @param fileName
	 * @return
	 */
	public static String stripExtension(String fileName) {
		return getFile().stripExtension(fileName);
	}

	/**
	 * 读取文件每一行
	 * @param reader 文件流
	 * @return 每一行内容
	 */
	public static List<String> toList(Reader reader) {
		return getFile().toList(reader);
	}

	/**
	 * 读取文件每一行
	 * @param fileName 文件绝对路径
	 * @return 每一行内容
	 */
	public static List<String> toList(String fileName) {
		return getFile().toList(fileName);
	}

	/**
	 * 读取Properties文件
	 * @param fis 文件流
	 * @return
	 */
	public static Properties toProperties(FileInputStream fis) {
		return getFile().toProperties(fis);
	}

	/**
	 * 读取Properties文件
	 * @param fileName 文件绝对路径
	 * @return
	 */
	public static Properties toProperties(String fileName) {
		return getFile().toProperties(fileName);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param fileName 文件绝对路径
	 * @param s 字符内容
	 * @throws IOException
	 */
	public static void write(String fileName, String s) throws IOException {
		getFile().write(fileName, s);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param fileName 文件绝对路径
	 * @param s 字符内容
	 * @param lazy 判断文件内容与字符串是否相同
	 * @throws IOException
	 */
	public static void write(String fileName, String s, boolean lazy)
		throws IOException {

		getFile().write(fileName, s, lazy);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param pathName 文件路径
	 * @param fileName 文件名
	 * @param s 字符内容
	 * @throws IOException
	 */
	public static void write(
			String fileName, String s, boolean lazy, boolean append)
		throws IOException {

		getFile().write(fileName, s, lazy, append);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param pathName 文件路径
	 * @param fileName 文件名
	 * @param s 字符内容
	 * @throws IOException
	 */
	public static void write(String pathName, String fileName, String s)
		throws IOException {

		getFile().write(pathName, fileName, s);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param pathName 文件路径
	 * @param fileName 文件名
	 * @param s 字符内容
	 * @param lazy 判断文件内容与字符串是否相同
	 * @throws IOException
	 */
	public static void write(
			String pathName, String fileName, String s, boolean lazy)
		throws IOException {

		getFile().write(pathName, fileName, s, lazy);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param pathName 文件路径
	 * @param fileName 文件名
	 * @param s 字符内容
	 * @param lazy 判断文件内容与字符串是否相同
	 * @param append 在文件后面增加内容
	 * @throws IOException
	 */
	public static void write(
			String pathName, String fileName, String s, boolean lazy,
			boolean append)
		throws IOException {

		getFile().write(pathName, fileName, s, lazy, append);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param file 目的文件
	 * @param s 字符内容
	 * @throws IOException
	 */
	public static void write(File file, String s) throws IOException {
		getFile().write(file, s);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param file 目的文件
	 * @param s 字符内容
	 * @param lazy 判断文件内容与字符串是否相同
	 * @throws IOException
	 */
	public static void write(File file, String s, boolean lazy)
		throws IOException {

		getFile().write(file, s, lazy);
	}

	/**
	 * 将字符串写入文件中(存在写冲突问题)
	 * @param file 目的文件
	 * @param s 字符内容
	 * @param lazy 判断文件内容与字符串是否相同
	 * @param append 在文件后面增加内容
	 * @throws IOException
	 */
	public static void write(File file, String s, boolean lazy, boolean append)
		throws IOException {

		getFile().write(file, s, lazy, append);
	}

	/**
	 * 写文件(存在写冲突)
	 * @param fileName 文件绝对路径
	 * @param bytes 二进制内容
	 * @throws IOException
	 */
	public static void write(String fileName, byte[] bytes) throws IOException {
		getFile().write(fileName, bytes);
	}

	/**
	 * 写文件(存在写冲突)
	 * @param file 文件
	 * @param bytes 二进制内容
	 * @throws IOException
	 */
	public static void write(File file, byte[] bytes) throws IOException {
		getFile().write(file, bytes);
	}

	/**
	 * 写文件(存在冲突)
	 * @param file 文件
	 * @param bytes 二进制内容
	 * @param offset 启始位
	 * @param length 长度
	 * @throws IOException
	 */
	public static void write(File file, byte[] bytes, int offset, int length)
		throws IOException {

		getFile().write(file, bytes, offset, length);
	}

	/**
	 * 同步写文件
	 * @param fileName 文件绝对路径
	 * @param is 文件流
	 * @throws IOException
	 */
	public static void write(String fileName, InputStream is)
		throws IOException {

		getFile().write(fileName, is);
	}

	/**
	 * 同步写文件
	 * @param file 目的文件
	 * @param is 文件流
	 * @throws IOException
	 */
	public static void write(File file, InputStream is) throws IOException {
		getFile().write(file, is);
	}
	
	/**
	 * 取得文件MIME类型
	 * @param fileName 文件名
	 * @return MIME类型
	 */
	public static String getContentType(String fileName){
		return getFile().getContentType(fileName);
	}
	
	public static void write(java.io.File file, InputStream is, int off) throws IOException{
		getFile().write(file, is, off);
	}

	public void setFile(com.utils.File file) {
		_file = file;
	}

	private static com.utils.File _file = FileImpl.getInstance();
	
	public static String appendMark(String fileName,String mark){
		String type = fileName.replaceAll("^[^.]*\\.", "");
		String name = fileName.replaceAll("\\." + type, "");
		return name + mark + "." + type;
	}
	
	public static void download(String urlString, String savePath)
			throws Exception {
		// 构造URL
		URL url = new URL(urlString);
		// 打开连接
		URLConnection con = url.openConnection();
		// 设置请求超时为5s
		con.setConnectTimeout(15 * 1000);
		// 输入流
		InputStream is = con.getInputStream();

		// 1K的数据缓冲
		byte[] bs = new byte[1024];
		// 读取到的数据长度
		int len;
		// 输出的文件流
		OutputStream os = new FileOutputStream(new File(savePath));
		// 开始读取
		while ((len = is.read(bs)) != -1) {
			os.write(bs, 0, len);
		}
		// 完毕，关闭所有链接
		os.close();
		is.close();
	} 

}