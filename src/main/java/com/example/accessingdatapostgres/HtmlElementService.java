package com.example.accessingdatapostgres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

//HTML要素の検索、削除、保存用クラス
@Service
public class HtmlElementService {

	@Autowired
	private HtmlElementRepository htmlElementRepository;
	
	public List<HtmlElement> searchAll(){
	//	for (HtmlElement val : htmlElementRepository.findAll()) {
	//		System.out.println(val.getTagName());		
	//	}
		return htmlElementRepository.findAll(Sort.by("clientRectTop"));
	}

	public List<HtmlElement> findByDocId(Long docId){
		return htmlElementRepository.findByDocIdOrderByClientRectTop(docId);
	}

	public List<HtmlElement> searchByText(String searchWord){
		return htmlElementRepository.searchByText(searchWord);
	}

	public HtmlElement searchOne(Long id){
		return htmlElementRepository.getById(id);
	}

	public void delete(Long id) {
		htmlElementRepository.deleteById(id);
	}

	public void save(HtmlElement htmlElement) {
		htmlElementRepository.save(htmlElement);
	}

}
