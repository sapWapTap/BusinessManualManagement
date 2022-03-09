package com.example.accessingdatapostgres;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path="/") // This means URL's start with / (after Application path)
public class MainController {

	
	//Herokuでとりあえず「/」開こうとするので、仮作成---------------------------------------------------------------------------------------
	@GetMapping("/")
	public String indexPage() {
		return "index";
	}
	
	//Users関係（現在使用無し）---------------------------------------------------------------------------------------
	
	@Autowired // This means to get the bean called userRepository
			   // Which is auto-generated by Spring, we will use it to handle the data
	private UserService userService;
	
	//一覧表示ページへのマッピング（全ユーザー一覧をList形式で取得して表示）
	@GetMapping("/list")
	public String dispList(Model model) {
		List<Users> userList = userService.searchAll();
//		for (Users val : userList) {
//			System.out.println(val.getName());
//		}
		model.addAttribute("attUserlist", userList);
		return "list";
	}
	
	//ユーザー情報表示ページへのマッピング（パスバリアブルでidを受け取って対象のユーザー情報をもとに表示画面を開く）
	@GetMapping("/one/{id}")
	public String dispOne(@PathVariable Long id,Model model) {
		Users user = userService.searchOne(id);
		model.addAttribute("attUserOne", user);
		return "one";
	}

	//ユーザー情報更新画面へのマッピング（パスバリアブルでidを受け取って対象のユーザー情報をもとに編集画面を開く）
	@GetMapping("/edit/{id}")
	public String editOne(@PathVariable Long id,Model model) {
		Users user = userService.searchOne(id);
		model.addAttribute("attUserOne", user);
		return "edit";
	}
	
	//ユーザー新規登録画面へのマッピング（空のユーザー情報をもとに登録画面を開く）
	@GetMapping("/edit")
	public String editNew(Model model) {
		Users user = new Users();
		model.addAttribute("attUserOne", user);
		return "edit";
	}
	
	//更新・登録実行ページへのマッピング（モデルアトリビュートでユーザー情報を受け取って保存用メソッドを実行する）
	@PostMapping("/updateResult")
	public String updateOne(@ModelAttribute Users user,Model model) {
		userService.save(user);
		//model.addAttribute("attUserOne", user);
		return "updateResult";
	}
	
	//削除実行ページへのマッピング（パスバリアブルでidを受け取って削除用メソッドを実行する）
	@PostMapping("/deleteResult/{id}")
	public String deleteOne(@PathVariable Long id,Model model) {
		userService.delete(id);
		//model.addAttribute("attUserOne", user);
		return "deleteResult";
	}


	//Doc関係---------------------------------------------------------------------------------------

	@Autowired
	private DocService docService;
	@Autowired
	private DocListDto docListDto;

	@ModelAttribute
    DocListDto setDocFormDto() {  //■■■■■public抜けてる？
        return new DocListDto();
    }

	//一覧表示ページへのマッピング（全タグ一覧をList形式で取得して表示）
	@GetMapping("/viewDocList")
	public String viewDocList(Model model) {
		List<Doc> docList = docService.searchAll();
		//for (Doc val : DocList) {
		//	System.out.println(val.getDocmentName());
		//}
		model.addAttribute("docList", docList);
		return "viewDocList";
	}
	
	//新規作成用編集ページ（引数idを持たない）
	@GetMapping("/editDoc")
	public String newDoc(Model model) {
		Doc doc = new Doc();
		model.addAttribute("doc", doc);
		return "editDoc";
	}
	
	//更新用編集ページ（引数idを持つ）
	@GetMapping("/editDoc/{id}")
	public String editDoc(@PathVariable Long id, Model model) {
		Doc doc = docService.searchOne(id);
		model.addAttribute("doc", doc);
		return "editDoc";
	}
	

	//更新・登録実行ページへのマッピング（モデルアトリビュートでDOC要素情報を受け取って保存用メソッドを実行する）
	@PostMapping("/updateDocResult")
	public String updateDocResult(@ModelAttribute Doc doc,Model model) {
		docService.save(doc);
		return "updateDocResult";
	}
	

//HtmlElement関係---------------------------------------------------------------------------------------
	
	@Autowired
	private HtmlElementService htmlElementService;
	@Autowired
	private HtmlElementListDto htmlElementListDto;

	@ModelAttribute
    HtmlElementListDto setFormDto() {
        return new HtmlElementListDto();
    }

	//一覧表示ページへのマッピング（全タグ一覧をList形式で取得して表示）
	@GetMapping("/viewHtmlElementList")
	public String viewHtmlElementList(Model model) {
		List<HtmlElement> htmlElementList = htmlElementService.searchAll();
		//for (HtmlElement val : htmlElementList) {
		//	System.out.println(val.getTagName());
		//}
		model.addAttribute("htmlElementList", htmlElementList);
		return "viewHtmlElementList";
	}
	
	//一覧編集ページへのマッピング（全タグ一覧をList形式で取得して編集）
	@GetMapping("/editHtmlElementList")
	public String editHtmlElementList(Model model) {
		List<HtmlElement> htmlElementList = htmlElementService.searchAll();
		//model.addAttribute("htmlElementList", htmlElementList);
		htmlElementListDto.setHtmlElementList(htmlElementList);
		model.addAttribute("htmlElementListDto", htmlElementListDto);
		return "editHtmlElementList";
	}

	//一覧編集ページへのマッピング（ドキュメントID指定版）
	@GetMapping("/editHtmlElementList/{docId}")
	public String editHtmlElementList(@PathVariable Long docId, Model model) {
		//List<HtmlElement> htmlElementList = htmlElementService.searchAll();
		List<HtmlElement> htmlElementList = htmlElementService.findByDocId(docId);
		//for (HtmlElement val : htmlElementList) {
		//	System.out.println(val.getClientRectTop());
		//}
		htmlElementListDto.setHtmlElementList(htmlElementList);
		model.addAttribute("htmlElementListDto", htmlElementListDto);
		return "editHtmlElementList";
	}

	//一括更新実行ページへのマッピング（モデルアトリビュートでHTML要素情報を受け取って保存用メソッドを実行する）
	@PostMapping("/updateHtmlElementListResult")
	public String updateHtmlElementList(@ModelAttribute HtmlElementListDto htmlElementListDto,Model model) {
		for (HtmlElement htmlElement : htmlElementListDto.getHtmlElementList()) {
			htmlElementService.save(htmlElement);
		}
		return "updateHtmlElementListResult";
	}
	
	//HTML要素 表示ページへのマッピング（パスバリアブルでidを受け取って対象の表示画面を開く）
	@GetMapping("/viewHtmlElement/{id}")
	public String viewHtmlElement(@PathVariable Long id,Model model) {
		HtmlElement htmlElement = htmlElementService.searchOne(id);
		model.addAttribute("htmlElement", htmlElement);
		return "viewHtmlElement";
	}

	//HTML要素 更新画面へのマッピング（パスバリアブルでidを受け取って対象の編集画面を開く）
	@GetMapping("/editHtmlElement/{id}")
	public String elementEditor(@PathVariable Long id,Model model) {
		HtmlElement htmlElement = htmlElementService.searchOne(id);
		model.addAttribute("htmlElement", htmlElement);
		return "editHtmlElement";
	}
	
	//HTML要素 新規登録画面へのマッピング（空のhtmlElementをもとに登録画面を開く）
	@GetMapping("/editHtmlElement")
	public String getHtmlElements(Model model) {
		HtmlElement htmlElement = new HtmlElement();
		model.addAttribute("htmlElement", htmlElement);
		return "editHtmlElement";
	}
	
	//更新・登録実行ページへのマッピング（モデルアトリビュートでHTML要素情報を受け取って保存用メソッドを実行する）
	@PostMapping("/updateHtmlElementResult")
	public String updateHtmlElement(@ModelAttribute HtmlElement htmlElement,Model model) {
		//System.out.println(htmlElement.getTagName());
		htmlElementService.save(htmlElement);
		return "updateHtmlElementResult";
	}
	
	//削除実行ページへのマッピング（パスバリアブルでidを受け取って削除用メソッドを実行する）
	@PostMapping("/deleteHtmlElementResult/{id}")
	public String deleteHtmlElementResult(@PathVariable Long id,Model model) {
		htmlElementService.delete(id);
		return "deleteHtmlElementResult";
	}


	//検索関係@ManyToOne使用---------------------------------------------------------------------------------
	/*
	@PostMapping("/viewSearchResults")
	public String viewSearchResults(@RequestParam String searchWord, Model model) {

		System.out.println("searchWord:");
		System.out.println(searchWord);
		List<HtmlElement> htmlElementList = htmlElementService.searchByText(searchWord);
		System.out.println(htmlElementList);
		System.out.println(htmlElementList.getClass());
		for (HtmlElement elem : htmlElementList) {
			System.out.println(elem.getId());
			System.out.println(elem.getDoc().getDocName());
		}
		model.addAttribute("htmlElementList", htmlElementList);
		
		return "viewSearchResults";
	}
	*/

}

