package com.example.accessingdatapostgres;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path="/") // This means URL's start with / (after Application path)
public class RestTypeController {

	@Autowired // This means to get the bean called userRepository
	private HtmlElementService htmlElementService;

	@Autowired // This means to get the bean called userRepository
	private DocService docService;

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/searchHtmlElement")
	public List<HtmlElement> searchHtmlElement(@RequestParam(value = "searchWord", defaultValue = "xxxx") String searchWord) {

		//System.out.println(searchWord);
		List<HtmlElement> htmlElementList = htmlElementService.searchByText(searchWord);
		//System.out.println(htmlElementList);
		//for (HtmlElement elem : htmlElementList) {
		//	System.out.println(elem.getId());
		//}
		
		return htmlElementList;
	}

	@GetMapping("/searchDoc")
	public List<Doc> searchDoc(@RequestParam(value = "docId") Long docId) {

		System.out.println("rect2");
		System.out.println(docId);
		Doc doc = docService.getById(docId);
		List<Doc> docList = new ArrayList<Doc>();
		docList.add(doc);
		//for (Doc value : docList) {
		//	System.out.println(value.getDocName());
		//}
		
		return docList;
	}

	
}