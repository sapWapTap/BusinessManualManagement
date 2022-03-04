package com.example.accessingdatapostgres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//ユーザーの検索、削除、保存用クラス
@Service
public class DocService {

	@Autowired
	private DocRepository docRepository;
	
	public List<Doc> searchAll(){
//		for (Doc val : docRepository.findAll()) {
//			System.out.println(val.getName());		
//		}
		return docRepository.findAll();
	}

	public Doc searchOne(Long id){
//		Doc test = docRepository.findById(2L).get();
//		System.out.println(test.getName());
		return docRepository.getById(id);
	}

	public Doc getById(Long id){
		return docRepository.getById(id);
	}

	public void delete(Long id) {
		docRepository.deleteById(id);
	}

	public void save(Doc doc) {
		docRepository.save(doc);
	}

}
