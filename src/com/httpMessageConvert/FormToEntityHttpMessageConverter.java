package com.httpMessageConvert;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.type.TypeFactory;
import org.codehaus.jackson.type.JavaType;
import org.json.simple.JSONObject;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.AbstractHttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.util.Assert;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;

public class FormToEntityHttpMessageConverter extends
		AbstractHttpMessageConverter<Object> {
	public static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
	private boolean prefixJson = false;
	
	private Boolean prettyPrint;

	public FormToEntityHttpMessageConverter(){
		
		super(new MediaType("application", "x-www-form-urlencoded", DEFAULT_CHARSET));
	}
	
	/**
	 * Set the {@code ObjectMapper} for this view. If not set, a default
	 * {@link ObjectMapper#ObjectMapper() ObjectMapper} is used.
	 * <p>Setting a custom-configured {@code ObjectMapper} is one way to take further control of the JSON
	 * serialization process. For example, an extended {@link org.codehaus.jackson.map.SerializerFactory}
	 * can be configured that provides custom serializers for specific types. The other option for refining
	 * the serialization process is to use Jackson's provided annotations on the types to be serialized,
	 * in which case a custom-configured ObjectMapper is unnecessary.
	 */
	public void setObjectMapper(ObjectMapper objectMapper) {
		Assert.notNull(objectMapper, "ObjectMapper must not be null");
		this.objectMapper = objectMapper;
		configurePrettyPrint();
	}

	private void configurePrettyPrint() {
		if (this.prettyPrint != null) {
			this.objectMapper.configure(SerializationConfig.Feature.INDENT_OUTPUT, this.prettyPrint);
		}
	}

	/**
	 * Return the underlying {@code ObjectMapper} for this view.
	 */
	public ObjectMapper getObjectMapper() {
		return this.objectMapper;
	}

	/**
	 * Indicate whether the JSON output by this view should be prefixed with "{} &&". Default is false.
	 * <p>Prefixing the JSON string in this manner is used to help prevent JSON Hijacking.
	 * The prefix renders the string syntactically invalid as a script so that it cannot be hijacked.
	 * This prefix does not affect the evaluation of JSON, but if JSON validation is performed on the
	 * string, the prefix would need to be ignored.
	 */
	public void setPrefixJson(boolean prefixJson) {
		this.prefixJson = prefixJson;
	}

	/**
	 * Whether to use the {@link org.codehaus.jackson.impl.DefaultPrettyPrinter} when writing JSON.
	 * This is a shortcut for setting up an {@code ObjectMapper} as follows:
	 * <pre>
	 * ObjectMapper mapper = new ObjectMapper();
	 * mapper.configure(SerializationConfig.Feature.INDENT_OUTPUT, true);
	 * converter.setObjectMapper(mapper);
	 * </pre>
	 * <p>The default value is {@code false}.
	 */
	public void setPrettyPrint(boolean prettyPrint) {
		this.prettyPrint = prettyPrint;
		configurePrettyPrint();
	}
	@Override
	public boolean canWrite(Class<?> clazz, MediaType mediaType) {
		return (this.objectMapper.canSerialize(clazz) && mediaType!=null && canWrite(mediaType));
	}
	@Override
	public boolean canRead(Class<?> clazz, MediaType mediaType) {
		return canRead(clazz, null, mediaType);
	}

	public boolean canRead(Type type, Class<?> contextClass, MediaType mediaType) {
		JavaType javaType = getJavaType(type, contextClass);
		return (this.objectMapper.canDeserialize(javaType) && mediaType!=null &&  canRead(mediaType));
	}
	/**
	 * Return the Jackson {@link JavaType} for the specified type and context class.
	 * <p>The default implementation returns {@link TypeFactory#type(java.lang.reflect.Type)}
	 * or {@code TypeFactory.type(type, TypeFactory.type(contextClass))},
	 * but this can be overridden in subclasses, to allow for custom generic collection handling.
	 * For instance:
	 * <pre class="code">
	 * protected JavaType getJavaType(Type type) {
	 *   if (type instanceof Class && List.class.isAssignableFrom((Class)type)) {
	 *     return TypeFactory.collectionType(ArrayList.class, MyBean.class);
	 *   } else {
	 *     return super.getJavaType(type);
	 *   }
	 * }
	 * </pre>
	 * @param type the type to return the java type for
	 * @param contextClass a context class for the target type, for example a class
	 * in which the target type appears in a method signature, can be {@code null}
	 * @return the java type
	 */
	protected JavaType getJavaType(Type type, Class<?> contextClass) {
		return (contextClass != null) ?
			TypeFactory.type(type, TypeFactory.type(contextClass)) :
			TypeFactory.type(type);
	}
	
	
	
	@Override
	protected Object readInternal(Class<? extends Object> clazz, HttpInputMessage inputMessage)
			throws IOException, HttpMessageNotReadableException {
		MediaType contentType = inputMessage.getHeaders().getContentType();
		Charset charset = contentType.getCharSet() != null ? contentType.getCharSet() : DEFAULT_CHARSET;
		String body = StreamUtils.copyToString(inputMessage.getBody(), charset);

		String[] pairs = StringUtils.tokenizeToStringArray(body, "&");
		MultiValueMap<String, String> result = new LinkedMultiValueMap<String, String>(pairs.length);
		for (String pair : pairs) {
			int idx = pair.indexOf('=');
			if (idx == -1) {
				result.add(URLDecoder.decode(pair, charset.name()), null);
			}
			else {
				String name = URLDecoder.decode(pair.substring(0, idx), charset.name());
				String value = URLDecoder.decode(pair.substring(idx + 1), charset.name());
				result.add(name, value);
			}
		}
	
		Map<String, String> map = result.toSingleValueMap();
		String json = JSONObject.toJSONString(map);
		JavaType javaType = getJavaType(clazz, null);
		//TODO 中文存在乱码，需要处理
		return readJavaType(javaType,json);
	}
	
	private Object readJavaType(JavaType javaType, String requestParam) {
		try {
			return this.objectMapper.readValue(requestParam, javaType);
		}
		catch (IOException ex) {
			throw new HttpMessageNotReadableException("Could not read JSON: " + ex.getMessage(), ex);
		}
	}


	@Override
	protected boolean supports(Class<?> clazz) {
		// should not be called, since we override canRead/Write instead
		throw new UnsupportedOperationException();
	}

	@Override
	protected void writeInternal(Object object, HttpOutputMessage outputMessage)
			throws IOException, HttpMessageNotWritableException {
		
		//TODO 在canWrite 配制一个新的数据格式通过，这个格式是在controller 中指定，如produces = MediaType.APPLICATION_XHTML_XML_VALUE
		//在这个方法里写对应的实现
	}
	
}
