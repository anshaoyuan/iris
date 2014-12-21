package com.utils.annotation;

import java.io.IOException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;


public class JsonDateSerializerAnno extends JsonSerializer<String> {

	private static final SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	private DateFormat anno;

	@Override
	public void serialize(String date, JsonGenerator gen,
			SerializerProvider provider) throws IOException,
			JsonProcessingException {

		
			if(anno!=null){
				if(anno.format().equals("yyyy-MM-dd")){
					gen.writeString(dateFormat.format(date));
				}else{
					gen.writeString(date+"yyyy-mm-dd");
				}
			}

	}


	public void setAnno(DateFormat anno) {
		this.anno = anno;
	}
	

}