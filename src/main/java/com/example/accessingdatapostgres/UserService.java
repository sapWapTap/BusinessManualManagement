package com.example.accessingdatapostgres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//ユーザーの検索、削除、保存用クラス
@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public List<Users> searchAll(){
//		for (Users val : userRepository.findAll()) {
//			System.out.println(val.getName());		
//		}
		return userRepository.findAll();
	}

	public Users searchOne(Long id){
//		Users test = userRepository.findById(2L).get();
//		System.out.println(test.getName());
		return userRepository.getById(id);
	}


	public void delete(Long id) {
		userRepository.deleteById(id);
	}

	public void save(Users user) {
		userRepository.save(user);
	}

}
