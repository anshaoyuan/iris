package com.utils.annotation;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;


public class JsonDateSerializerAnno extends JsonSerializer<String> {

	private DateFormat anno;

	@Override
	public void serialize(String date, JsonGenerator gen,
			SerializerProvider provider) throws IOException,
			JsonProcessingException {

		
			if(anno!=null){
				if(anno.format().equals("yyyy-MM-dd")){
					gen.writeString(date+"yyyy-mm-dd");
				}else{
					gen.writeString(date+"yyyy-mm-ddjjjjjjj");
				}
			}

	}


	public void setAnno(DateFormat anno) {
		this.anno = anno;
	}
	

}