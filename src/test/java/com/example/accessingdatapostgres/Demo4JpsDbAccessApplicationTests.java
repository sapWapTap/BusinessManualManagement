package com.example.accessingdatapostgres;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = { "spring.ldap.embedded.port=0" })
class Demo4JpsDbAccessApplicationTests {

	@Test
	void contextLoads() {
	}

}
