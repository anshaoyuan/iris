package com.iris.test;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springside.modules.test.spring.SpringTransactionalTestCase;

import com.iris.repository.OrgDao;

@ContextConfiguration(locations = { "/applicationContext.xml" })
public class OrgTest extends SpringTransactionalTestCase{
	
	@Autowired
	private OrgDao orgDao;
	
	@Test
	public void testFind(){
		orgDao.findAll();
	}

}
