package com.example.accessingdatapostgres;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.example.accessingdatapostgres.filter.LogFilter;

import lombok.extern.slf4j.Slf4j;

//@SpringBootTest
@SpringBootTest(properties = { "spring.ldap.embedded.port=0" })
@EnableWebMvc
@Slf4j
class TestService {

	MockMvc mockMvc;

	@Autowired WebApplicationContext webApplicationContext;
	@Autowired LogFilter logFilter;
	
	@Autowired
	private DocService docService;
	@Autowired
	private HtmlElementService htmlElementService;
		
	@BeforeEach
	void beforeEach() {
		/*
		MockitoAnnotations.initMocks(this);
		mockMvc =
				MockMvcBuilders.webAppContextSetup(webApplicationContext)
						.addFilter(logFilter, "/*")
						.build();
		*/
	}

	@AfterEach
	void afterEach() {}

	/*
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
	*/

	//Docサービスのテスト
	@Test
	public void testDSearchAll() throws Exception {
		
		Doc compData = new Doc(263L, "test manual", "test");
		List<Doc> data = docService.searchAll();

		assertThat(data)
			.isNotEmpty()
			.contains(compData);
	}

	//HtmlElementサービスのテスト
	@Test
	public void testHSearchAll() throws Exception {

		HtmlElement compData = new HtmlElement(1L, "INPUT", "90000", "drag-and-drop clone isParts", "test", 286D, 1, "", 207L, true);
		List<HtmlElement> data = htmlElementService.searchAll();
		
		assertThat(data)
			.isNotEmpty()
			.contains(compData);
	}

	
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
