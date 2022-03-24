package com.example.accessingdatapostgres;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.example.accessingdatapostgres.filter.LogFilter;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest(properties = { "spring.ldap.embedded.port=0" })
@EnableWebMvc
@Slf4j
class TestConAndSev {

  MockMvc mockMvc;



  @Autowired WebApplicationContext webApplicationContext;
  @Autowired LogFilter logFilter;

  //@MockBean DocService docService;    // ExternalServiceは外部アクセスがあるのでMock化する
  //@MockBean HtmlElementService htmlElementService;    // ExternalServiceは外部アクセスがあるのでMock化する

  @BeforeEach
  void beforeEach() {
    MockitoAnnotations.initMocks(this);
    mockMvc =
        MockMvcBuilders.webAppContextSetup(webApplicationContext)
            .addFilter(logFilter, "/*")
            .build();
  }

  @AfterEach
  void afterEach() {}


  //コントローラー ＋ サービスのテスト
  @Test
  public void testDocService() throws Exception {

	  MvcResult mvcResult =
			  mockMvc
	          .perform(get("/searchDoc?docId=263"))
	          .andExpect(status().isOk())
	          .andExpect(jsonPath("$.[0].id").value("263"))
	          .andExpect(jsonPath("$.[0].docName").value("test manual"))
	          .andExpect(jsonPath("$.[0].note").value("test"))
	          .andReturn();
	
	  log.info("searchDoc response : {}", mvcResult.getResponse().getContentAsString());

  }
  @Test
  //testHtmlElementService関係のテスト（とりあえずsearchByTextメソッドのみ）
  public void testHtmlElementService() throws Exception {

	MvcResult mvcResult =
	  mockMvc
	        .perform(get("/searchHtmlElement?searchWord=CSS"))
	        .andExpect(status().isOk())
	        .andExpect(jsonPath("$.[0].id").value("209"))
	        .andExpect(jsonPath("$.[0].color").value(""))
	        .andExpect(jsonPath("$.[0].tagName").value("INPUT"))
	        .andExpect(jsonPath("$.[0].text").value("CSS カウンターの使用"))
	        .andExpect(jsonPath("$.[0].className").value("drag-and-drop clone isParts"))
	        .andExpect(jsonPath("$.[0].idName").value("90000"))
	        .andExpect(jsonPath("$.[0].chapterLevel").value("1"))
	        .andExpect(jsonPath("$.[0].clientRectTop").value("286.0"))
	        .andExpect(jsonPath("$.[0].docId").value("208"))
	        .andExpect(jsonPath("$.[0].delFlag").value(false))
	        .andReturn();
	log.info("searchByText response : {}", mvcResult.getResponse().getContentAsString());

  }

  //サービスのみのテストを作成するべき？

  
  //コントローラー ＋ サービスのテスト（決まった型が返ってくることを確認するテスト・・・だが、objectMapperデシリアライズできないとエラーになる）
  /*
  @Test
  public void testDocService2() throws Exception {
	  

	  String responseJsonString = mockMvc.perform(get("/searchDoc?docId=263"))
	          .andExpect(status().isOk())
	          .andReturn().getResponse().getContentAsString(); // レスポンスボディを文字列として取得
	
	  ObjectMapper objectMapper = new ObjectMapper();
	
	  // JacksoでJavaオブジェクトへ変換
	  System.out.println("responseJsonString:" + responseJsonString);
	  DocList responseJson = objectMapper.readValue(responseJsonString, DocList.class);
	
	  // 期待結果をJavaオブジェクトで作成
	  DocList expected = new DocList(new ArrayList<>());
	
	  // 比較
	  assertThat(responseJson).isEqualTo(expected);
	  
  }
  */
  
}