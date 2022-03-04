package com.example.accessingdatapostgres;


import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Data;


@Data
@Component

public class HtmlElementListDto {

    private List<HtmlElement> htmlElementList;

	public List<HtmlElement> getHtmlElementList() {
		return this.htmlElementList;
	}
	public void setHtmlElementList(List<HtmlElement> htmlElementList) {
		this.htmlElementList = htmlElementList;	
	}

}
