
//追加した要素の中身が変わった際にはhtmlElementListテーブルの値も変更するイベントリスナーの追加
function addChangeAction(div) {
	
	//console.log("リスナー追加対象：:",div);
	
	//divの中身がテキスト関係である場合のみ処理する
	if (div.children[1].tagName === "INPUT"
		|| div.children[1].tagName === "TEXTAREA"){
		let textbox = div.children[1];
		//以下でsaveText()と書くと関数の結果を渡してしまう（即時実行されて、リスナーとして機能しない）ので注意
		textbox.addEventListener("change", saveText, false);
		//console.log("addChangeListener0");
	} else if (div.children[1].tagName === "IMG"){
		//なにもしない。
	} else if (div.children[2].tagName === "INPUT"
		|| div.children[2].tagName === "TEXTAREA"){
		let textbox = div.children[2];
		textbox.addEventListener("change", saveText, false);
		//console.log("addChangeListener1");
	} else if (div.children[2].tagName === "IMG"){
		//なにもしない。
	}
}

//フォーカスが外れた時にhtmElementListテーブルに中身を保存する
function saveText(e){

	//console.log("kick change", e.target, e.target.value, e.target.name)
	let queryText = "#htmlElementTable tr td textarea[name=\"" + e.target.name + ".text\"]";
	//console.log("queryText:",queryText);
	//console.log("name:",$(queryText)[0].name);
	$(queryText)[0].value = e.target.value;

}

