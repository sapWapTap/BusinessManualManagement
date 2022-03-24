package com.example.accessingdatapostgres;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/rest")
public class FileRestController {

	@Autowired
	private FileService fileService;

	@GetMapping("/get")
	public List<String> getImageBase64(@RequestParam(value = "id", defaultValue = "1") Long id) {

		FileDB imageFile = fileService.getById(id);
		byte[] bytes = imageFile.getData();
		String imageString = Base64.getEncoder().encodeToString(bytes);
		//List化しないとajaxで受け取れない？
		List<String> imageStrings = new ArrayList<String>();
		imageStrings.add(imageString);
		
		//System.out.println("restApiDone");
		
		return imageStrings;
	}

	@PostMapping("/upload")
	public String uploadFile(@RequestParam("file") MultipartFile file, Model m) {
		System.out.println("upload");
		try {
			System.out.println("ｔｒｙ");

			FileDB savedFile = fileService.store(file);
			String fileId = savedFile.getId().toString();
			System.out.println("success");
		
			return fileId;

		} catch (Exception e) {
			//message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			//m.addAttribute("message", message);
			System.out.println("failure");

			return "failure";

		}
	}

}
