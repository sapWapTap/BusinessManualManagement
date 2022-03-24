package com.example.accessingdatapostgres;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
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
class TestController {

  MockMvc mockMvc;

  @Autowired WebApplicationContext webApplicationContext;
  @Autowired LogFilter logFilter;

  @MockBean DocService docService;    // ExternalServiceは外部アクセスがあるのでMock化する
  @MockBean HtmlElementService htmlElementService;    // ExternalServiceは外部アクセスがあるのでMock化する

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


  // コントローラーのテスト
  @Test
  public void testRestContloroller() throws Exception {

    List<HtmlElement> htmlElementList = new ArrayList<HtmlElement>();
	htmlElementList.add(new HtmlElement(1L, "testTag", "testIdN", "testClass", "testText", 100D, 1, "testColor", 1L, false));
	htmlElementList.add(new HtmlElement(2L, "testTag2", "testIdN2", "testClass2", "testText2", 200D, 2, "testColor", 2L, false));

	// サービス部分はmock
    when(htmlElementService.searchByText("test")).thenReturn(htmlElementList);
    // request
    MvcResult mvcResult =
        mockMvc
            .perform(get("/searchHtmlElement?searchWord=test"))
            .andExpect(status().isOk())
            .andReturn();

    // verify (モックがどんな引数で何回呼ばれるハズなのかをテストする。多かったり少なかったり、引数が違う場合はテスト失敗になる) 
    verify(htmlElementService, times(1)).searchByText("test");
  }
  
}