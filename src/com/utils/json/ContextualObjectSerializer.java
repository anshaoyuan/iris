package com.utils.json;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.List;

import org.apache.commons.beanutils.PropertyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.ContextualSerializer;
import com.utils.annotation.DateFormat;
import com.utils.annotation.JsonDateSerializerAnno;

public class ContextualObjectSerializer extends JsonSerializer<String>
implements ContextualSerializer{
	Logger log = LoggerFactory.getLogger(ContextualObjectSerializer.class);
	private List<AnnotationSerializerConfig> config;

	  public void setConfig(List<AnnotationSerializerConfig> config) {
	    this.config = config;
	  }

	@Override
	public JsonSerializer<String> createContextual(SerializerProvider prov, BeanProperty property) throws JsonMappingException {
		try
	    {
	      for (AnnotationSerializerConfig conf : this.config)
	      {
	        Class annoClass = Class.forName(conf.getAnnotation());
	        Object anno = property.getAnnotation(annoClass);
	        if (anno != null) {
	          Class serializerClass = Class.forName(conf.getSerializer());
	          Object serInst = serializerClass.newInstance();
	          PropertyUtils.setProperty(serInst, "anno", anno);
	          return (JsonSerializer)serInst;
	        }
	      }
			
			JsonDateSerializerAnno date = new JsonDateSerializerAnno();
			//date.setAnno(new DateFormat);
	    } catch (Exception e) {
	    	log.error("输出出误：beanproperty==>"+property);
	    //  e.printStackTrace();
	    }
		return new SimpleStringSerializer();

	}


	public void serialize(String value, JsonGenerator jgen, SerializerProvider provider)
		    throws IOException, JsonProcessingException
		  {
		    jgen.writeString(value.toString());
		  }

}
