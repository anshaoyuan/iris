package com.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegxUtil {
 
	public static final String IMG_REGX = "<img.*src\\s*=\\s*(.*?)[^>]*?>";
	
	public static final String IMG_SRC = "src=\"?'?(.*?)(\"|'|>|\\s+)";
	
	public static final String IMG_WIDTH = "data-img-width=\"\\d+\"";
	
	public static final String IMG_HEIGHT = "data-img-heigth=\"\\d+\"";
	
	public static final String IMG_WIDTH_VALUE = "\\d+";
	
	 public static List<String> getImgStr(String htmlStr){   
         Pattern p_image;   
         Matcher m_image;   
         List<String> pics = new ArrayList<String>();
         p_image = Pattern.compile 
                 (IMG_REGX,Pattern.CASE_INSENSITIVE);   
        m_image = p_image.matcher(htmlStr); 
        while(m_image.find()){  
            Matcher m  = Pattern.compile(IMG_SRC).matcher(m_image.group());
             while(m.find()){
                 pics.add(m.group(1));
                 break;
             }
             break;
       }   
       return pics;   
     }
	 
	public static List<Map<String, String>> getImgWidthAndHeight(String htmlStr){
		Pattern p_image = Pattern.compile 
                (IMG_REGX,Pattern.CASE_INSENSITIVE);
		Matcher m_image = p_image.matcher(htmlStr);
		List<Map<String,String>> list =new ArrayList<Map<String,String>>();
		while(m_image.find()){
			Map<String, String> map = new HashMap<String, String>();
			Matcher width = Pattern.compile(IMG_WIDTH).matcher(m_image.group());
			while(width.find()){
				Matcher widthValue = Pattern.compile(IMG_WIDTH_VALUE).matcher(width.group());
				while(widthValue.find()){
					map.put("width", widthValue.group());
					break;
				}
				break;
			}
			Matcher height = Pattern.compile(IMG_HEIGHT).matcher(m_image.group());
			while(height.find()){
				Matcher heightValue = Pattern.compile(IMG_WIDTH_VALUE).matcher(height.group());
				while(heightValue.find()){
					map.put("height", heightValue.group());
					break;
				}
				break;
			}
			
			list.add(map);
			
			break;
		}
		return list;
	}
	 
	public static void main(String[] args) {

		String testString = "<p><img src='http://ww4.sinaimg.cn/bmiddle/a.jpg'  data-img-width=\"550\" data-img-heigth=\"275\" style='max-width: 300px'/><p><img src='http://ww4.sinaimg.cn/bmiddle/6a815515tw1eefcqfzhkhj20c80det9r.jpg'  data-img-width=\"1\" data-img-heigth=\"2\"  style='max-width: 300px'/>";
		//regxImg(testString);
		getImgStr(testString);
		getImgWidthAndHeight(testString);
		
	}
}
