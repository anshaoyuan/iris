package com.utils.json;

import java.util.List;

import org.springframework.beans.factory.InitializingBean;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

public class JacksonObjectMapper  extends ObjectMapper
implements InitializingBean{

	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String modelName;
	  private String version;
	  private List<JacksonSerializer> serializers;

	  public String getModelName()
	  {
	    return this.modelName;
	  }

	  public void setModelName(String modelName)
	  {
	    this.modelName = modelName;
	  }

	  public String getVersion()
	  {
	    return this.version;
	  }

	  public void setVersion(String version)
	  {
	    this.version = version;
	  }

	  public void setSerializers(List<JacksonSerializer> serializers)
	  {
	    this.serializers = serializers;
	  }

	  public void afterPropertiesSet()
	    throws Exception
	  {
	    String[] vers = this.version.split("\\.");
	    SimpleModule module = new SimpleModule(this.modelName, new Version(Integer.parseInt(vers[0]), Integer.parseInt(vers[1]), Integer.parseInt(vers[2]), "", null, null));

	    if (this.serializers != null) {
	      for (JacksonSerializer serializer : this.serializers) {
	        try {
	          module.addSerializer(Class.forName(serializer.getType()), serializer.getSerializer());
	        }
	        catch (ClassNotFoundException e) {
	          e.printStackTrace();
	        }
	      }
	    }
	    super.registerModule(module);
	  }

}
