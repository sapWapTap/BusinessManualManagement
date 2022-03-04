package com.example.accessingdatapostgres;


import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Data;


@Data
@Component

public class DocListDto {

    private List<Doc> docList;

	public List<Doc> getDocList() {
		return this.docList;
	}
	public void setDocList(List<Doc> docList) {
		this.docList = docList;	
	}

}
