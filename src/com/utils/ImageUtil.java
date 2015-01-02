package com.utils;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;

import com.google.common.collect.Lists;
import com.utils.props.PropsKeys;
import com.utils.props.PropsUtil;

public class ImageUtil {
	public static void zoom(String sourcePath,String destPath,Integer height,Integer width,Double zoom) throws IOException{
		File sourceFile = new File(sourcePath);
		BufferedImage bsrc = null;  
		
        bsrc = ImageIO.read(sourceFile);
        
        int srcWidth = bsrc.getWidth();
        int srcHeight = bsrc.getHeight();
        double srcZoom = (double)srcWidth/srcHeight;
        
        int destWidth = -1,destHeight = -1;
		
		if(height != null && width == null){
			destHeight = height;
			destWidth = (int)(srcZoom * height);
		}else if(height == null && width != null){
			destWidth = width;
			destHeight = (int)(width / srcZoom);
		}else if(height != null && width != null){
			destHeight = height;
			destWidth = width;
		}else if(zoom != null){
			destHeight = (int)(srcHeight * zoom);
			destWidth = (int)(srcWidth * zoom);
		}
		
		AffineTransform transform = new AffineTransform();
		transform.setToScale((double)destWidth/srcWidth,(double)destHeight/srcHeight);
		AffineTransformOp ato = new AffineTransformOp(transform,null);
		BufferedImage bsmall = new BufferedImage(destWidth,destHeight,BufferedImage.TYPE_3BYTE_BGR);
		ato.filter(bsrc,bsmall);
		
		String type = FileUtil.getExtension(sourcePath);
		if(type == null || type.length() == 0){
			type = "jpeg";
		}
		
		ImageIO.write(bsmall, type , new File(destPath));
	}
	
	public static String saveImgByPoint(int x, int y, int w, int h, String filePath, String fileType) throws Exception {
		BufferedImage bi = ImageIO.read(new File(filePath));

		BufferedImage out = null;
		if (w > 0 && h > 0 && bi.getWidth() >= w && bi.getHeight() >= h) {
			out = bi.getSubimage(x, y, w, h);
		} else {
			out = bi.getSubimage(0, 0, bi.getWidth(), bi.getHeight());
		}
		
		out = resizeImage(out, BufferedImage.TYPE_INT_RGB, 150, 150);
		
		String[] destPathArr = UploadUtil.GetCreatePathWithSuffix(filePath,null);
		
		String fileFinalPath = destPathArr[0];
		
		ImageIO.write(out, fileType, new File(fileFinalPath));
		
		return destPathArr[1];
	}
	
	// 对图片大小进行缩放处理
	public static BufferedImage resizeImage(BufferedImage originalImage, int type,
			int width, int height) {
		if (width < 300 && height < 300) {
			BufferedImage resizedImage = new BufferedImage(width, height, type);
			Graphics2D g = resizedImage.createGraphics();
			g.drawImage(originalImage, 0, 0, width, height, null);
			g.dispose();
			return resizedImage;
		}

		BufferedImage resizedImage = new BufferedImage(width, height, type);
		Graphics2D g = resizedImage.createGraphics();

		g.drawImage(originalImage, 0, 0, width, height, null);
		g.dispose();

		return resizedImage;
	}
	
	public static void losslessCut(String sourcePath,String destPath,Integer size) throws IOException{
		File sourceFile = new File(sourcePath);
		
		BufferedImage bsrc = ImageIO.read(sourceFile);
        int srcWidth = bsrc.getWidth();
        int srcHeight = bsrc.getHeight();
        
        if(srcWidth > size && srcHeight > size){
        	if(srcWidth < srcHeight){
        		zoom(sourcePath, destPath, null, size, null);
        	}else if(srcWidth > srcHeight){
        		zoom(sourcePath, destPath, size, null, null);
        	}else{
        		zoom(sourcePath, destPath, size, size, null);
        		return;
        	}
        }else{
        	FileUtil.copyFile(sourceFile, new File(destPath));
        }
        
        cutSquareImgMiddle(size, destPath,destPath);
        
        if(srcWidth < size || srcHeight < size){
        	zoom(destPath, destPath, size, size, null);
        }
	}

	public static void cutSquareImgMiddle(Integer size, String sourcePath,String destPath) throws IOException {
		File sourceFile = new File(sourcePath);
		BufferedImage sBufImg = ImageIO.read(sourceFile);
        int srcWidth = sBufImg.getWidth();
        int srcHeight = sBufImg.getHeight();
        
        int x,y,width,height;
        
        if(srcWidth > srcHeight && srcWidth > size){
        	x = (srcWidth - size)/2;
        	y = 0;
        	width = size;
        	height = srcHeight > size ? size : srcHeight;
        }else if(srcWidth < srcHeight && srcHeight > size){
        	y = (srcHeight - size)/2;
        	x = 0;
        	height = size;
        	width = srcWidth > size ? size : srcWidth;
        }else{
        	return;
        }
        
        BufferedImage dBufImg = sBufImg.getSubimage(x, y, width, height);
        
        ImageIO.write(dBufImg, "jpeg", new File(destPath));
	}
	
	public static boolean compressPic(String srcFilePath, String descFilePath,float quality) {
		File file = null;
		BufferedImage src = null;
		FileOutputStream out = null;
		ImageWriter imgWrier;
		ImageWriteParam imgWriteParams;

		// 指定写图片的方式为 jpg
		imgWrier = ImageIO.getImageWritersByFormatName("jpg").next();
		imgWriteParams = new javax.imageio.plugins.jpeg.JPEGImageWriteParam(
				null);
		// 要使用压缩，必须指定压缩方式为MODE_EXPLICIT
		imgWriteParams.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
		// 这里指定压缩的程度，参数qality是取值0~1范围内，
		imgWriteParams.setCompressionQuality(quality);
		imgWriteParams.setProgressiveMode(ImageWriteParam.MODE_DISABLED);
		ColorModel colorModel = ColorModel.getRGBdefault();
		// 指定压缩时使用的色彩模式
		imgWriteParams.setDestinationType(new javax.imageio.ImageTypeSpecifier(
				colorModel, colorModel.createCompatibleSampleModel(16, 16)));

		try {
			file = new File(srcFilePath);
			src = ImageIO.read(file);
			out = new FileOutputStream(descFilePath);

			imgWrier.reset();
			// 必须先指定 out值，才能调用write方法, ImageOutputStream可以通过任何 OutputStream构造
			imgWrier.setOutput(ImageIO.createImageOutputStream(out));
			// 调用write方法，就可以向输入流写图片
			imgWrier.write(null, new IIOImage(src, null, null), imgWriteParams);
			out.flush();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			try {
				if(out!=null) out.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return true;
	}
	
	/**
	 * 
	 * 功能：取出fileList中的图片，拼接成一张图片，保存至路径finalPahtName
	 */
	public static String plus(List<String> fileList, String finalPahtName) {
		if(fileList==null){
			fileList = Lists.newArrayList();
		}
		String defaultImg = PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_ROOT_PATH) + "avatar/default_user_icon.jpg";
		try {
			int size = fileList.size();
			if(size < 4){
				for(int i=0;i<4-size;i++){
					fileList.add(defaultImg);
				}
			}
			int widthNew = 0;
			int heightNew = 0;
			List<BufferedImage> images = new ArrayList<BufferedImage>();
			List<Integer> widths = new ArrayList<Integer>();
			List<Integer> heights = new ArrayList<Integer>();
			// 读图 计算宽高 read pictures and calculate the width and height of the
			// final picture
			for (int i = 0; i < fileList.size() && i <=3; i++) {
				File file = new File(fileList.get(i));
				if(!file.exists()){
					file = new File(defaultImg);
				}
				BufferedImage image = ImageIO.read(file);
				images.add(image);
				widths.add(image.getWidth());
				heights.add(image.getHeight());

				widthNew += image.getWidth();
				heightNew += image.getHeight();
			}
			// 创建新图 写像素 creat a new picture and insert into all of the px
			BufferedImage imageNew = new BufferedImage(widthNew/2, heightNew/2,
					BufferedImage.TYPE_INT_RGB);
			// 设置背景 set the background color
			Graphics g = imageNew.getGraphics();
			g.setColor(Color.WHITE);
			g.fillRect(0, 0, widthNew, heightNew);
			int widthTemp = 0;
			int heightTemp = 0;
			for (int i = 0; i < images.size(); i++) {
				// 绘制图片 draw the picture
				imageNew.setRGB(
						widthTemp,
						heightTemp,
						widths.get(i),
						heights.get(i),
						images.get(i).getRGB(0, 0, widths.get(i),
								heights.get(i),
								new int[widths.get(i) * heights.get(i)], 0,
								widths.get(i)),
						0, widths.get(i));
				if(i==0){
					widthTemp = widths.get(i);
				}else if(i==1){
					widthTemp = 0;
					heightTemp = heights.get(i);
				}else if(i==2){
					widthTemp = widths.get(i);
					heightTemp = heights.get(i);
				}
				
			}
			// 保存新图 save the new picture
			File outFile = new File(finalPahtName);
			ImageIO.write(imageNew, "jpg", outFile);
		} catch (Exception e) {
			e.printStackTrace();
			finalPahtName = null;
		}
		return finalPahtName;
	}
	
	/**
	 * 
	 * 功能：取出fileList中的图片，拼接成一张图片，保存至路径finalPahtName
	 */
	public static String plus(List<String> fileList, String finalPahtName,int size) {
		if(fileList==null){
			fileList = Lists.newArrayList();
		}
		
		Graphics g = null;
		String defaultImg = PropsUtil.getProperty(PropsKeys.UPLOAD_FILE_ROOT_PATH) + "avatar/default_user_icon.png";
		
		try {
			BufferedImage imageNew = new BufferedImage(size, size,BufferedImage.TYPE_INT_RGB);
			
			g = imageNew.getGraphics();
			g.setColor(Color.WHITE);
			g.fillRect(0, 0, size, size);
			
			for (int i = 0; i < 4; i++) {
				int d1x = 0,d1y = 0,d2x = size/2,d2y = size/2;
				if(i == 1){
					d1x = size/2;
					d2x = size;
				}else if(i == 2){
					d1y = size/2;
					d2y = size;
				}else if(i == 3){
					d1x = d1y = size/2;
					d2x = d2y = size;
				}
				
				String imagePath = fileList.size() <= i ? defaultImg : fileList.get(i);
				File imageFile = new File(imagePath);
				if(!imageFile.exists()){
					imageFile = new File(defaultImg);
				}
				
				BufferedImage image = ImageIO.read(imageFile);
				int swidth = image.getWidth();
				int sheight = image.getHeight();
				
				g.drawImage(image, d1x, d1y, d2x, d2y, 0, 0, swidth, sheight, null);
			}
			
			File outFile = new File(finalPahtName);
			ImageIO.write(imageNew, "jpg", outFile);
		} catch (Exception e) {
			e.printStackTrace();
			finalPahtName = null;
		}finally{
			if(g != null) g.dispose();
		}
		return finalPahtName;
	}
	
	
	public static void main(String[] args) throws Exception {
//		zoom("E:\\1.jpg","e:\\1_tmp.jpg",400,400,0.5);
//		String filePath = "E:/workspaces/sloth_cmcc/WebContent/2013-11-19/image/69acc94a-715d-4f70-bab2-191868b9bb7b-363-mid";
		//89_73_286_270_197_197
//		System.out.println(saveImgByPoint(89, 73, 197, 197, filePath, "jpg"));;
//		File destFile = new File(destPathArr[0]);
//
//		FileUtil.mkdirs(destFile.getParent());
//
//		FileUtil.copyFile(originfile, destFile);
//		String sourcePath = "E:\\tmp\\b.jpg";
//		String destPath = "E:\\tmp\\c.jpg";
//		losslessCut(sourcePath, destPath, 170);
//		String file = "E:/workspaces/sloth_app/WebContent/uploadFile/2013-12-26/image/254b0dbb-a997-4f37-86c0-e4a560814d7a-188-mid.jpg";
//		String path = saveImgByPoint(77, 34, 230, 230, file, "jpg");
//		System.out.println(path);
		ArrayList<File> fileList = Lists.newArrayList();
		fileList.add(new File("C:/TEMP/sloth2/a1.jpg"));
//		fileList.add(new File("C:/TEMP/sloth2/a5.png"));
//		fileList.add(new File("C:/TEMP/sloth2/a2.jpg"));
//		fileList.add(new File("C:/TEMP/sloth2/a3.jpg"));
//		fileList.add(new File("C:/TEMP/sloth2/a4.jpg"));
		System.out.println(ImageUtil.plus(null,"C:/TEMP/sloth2/xx2.jpg"));
		
	}
}
