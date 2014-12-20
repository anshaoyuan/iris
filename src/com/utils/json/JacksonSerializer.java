package com.utils.json;

import com.fasterxml.jackson.databind.JsonSerializer;

public class JacksonSerializer {
	  private String type;
	  private JsonSerializer serializer;

	  public String getType()
	  {
	    return type;
	  }
	  public void setType(String type) {
	    this.type = type;
	  }
	  public JsonSerializer getSerializer() {
	    return this.serializer;
	  }
	  public void setSerializer(JsonSerializer serializer) {
	    this.serializer = serializer;
	  }
}
