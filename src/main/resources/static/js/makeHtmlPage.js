
//最初の部品は配置済みのdivTopにする
let prevParts = $('#divTop');
//部品情報格納用の配列
let partsInfo =[];
let divParts;
let innerParts;
let partsName;

//console.log("HTMLタグを生成する");

//elementListTableの各行を元にHTMLタグを生成する
//テーブルの各行を取得する
$('#elementListTable tbody tr').each(function(i, tr){
	//console.log("tr", tr.childElementCount);
	//if (i==10) {alert("10")};
	//console.log("i:",i);

	//その行の各列（セル：td）を取得する（最後の列は削除ボタンなので外す：-1）
	for (j=0; j<tr.childElementCount-1; j++){
		//セル（td）を取得する
		let td = tr.children[j];
		//セル内のtextareaからHTML情報を取り出す
		let htmlElementInfo = td.children[0];
		//配列を作成する
		partsInfo.push(htmlElementInfo.value);
	}
	
	//tableの各列（id，tagName,,,,）のテキストエリアの「.id」や「.tagName」を除いたもの（htmlElementList[X]）を配置部品のnameにする
	partsName = tr.children[0].children[0].name.split('.')[0];//children[0]でTDタグ、もう一つchildren[0]でTEXTAREAタグ

	//取り出した部品情報を元にdivタグを作成する
	divParts = $('<div>',{
		id : partsInfo[0],
		class : partsInfo[3].replace('border', '' ) + " H" + partsInfo[6], //borderクラスが入っていた場合は除外する
		name : partsName, //tableのtext欄のドットより前（htmlElementList[X]）と同じNAMEを入れる
		//text : "追加パーツ",
	})
	
	//削除フラグが立っている場合は表示しない（削除フラグはTEXTAREAに記載したため、文字列・・・）	
	if (partsInfo[9] == "true") {
		divParts.addClass('displayNone');
	}

	//divPartsはdivタグそのものではなく、divタグを含む構造体？
	//console.log(divParts);
	
	
	
	//取り出した部品情報を元にdivタグ内のタグを作成する（タグの種類は[1]に入っている）
	if (partsInfo[1] === "INPUT"){
		innerParts1 = $('<H' + partsInfo[6] + '>',{
			id : partsName,
			name : partsName, //tableのtext欄のドットより前（htmlElementList[X]）と同じNAMEを入れる
			text : partsInfo[4],
		});
		innerParts2 = $('<INPUT>',{
			id : partsName,
			name : partsName, //tableのtext欄のドットより前（htmlElementList[X]）と同じNAMEを入れる
			value : partsInfo[4],
			class : 'displayNone',
		});
	} else if (partsInfo[1] === "TEXTAREA"){
		innerParts1 = $('<p>',{
			id : partsName,
			name : partsName, //tableのtext欄のドットより前（htmlElementList[X]）と同じNAMEを入れる
			text : partsInfo[4],
		});
		innerParts2 = $('<TEXTAREA>',{
			id : partsName,
			name : partsName, //tableのtext欄のドットより前（htmlElementList[X]）と同じNAMEを入れる
			text : partsInfo[4],
			class : 'displayNone',
		});
	} else if (partsInfo[1] === "IMG"){
		innerParts1 = $('<IMG>',{
			id : partsName,
			name : partsName, //tableのtext欄のドットより前（htmlElementList[X]）と同じNAMEを入れる
			src : partsInfo[4],
		});
		innerParts2 = $('<IMG>',{
			id : partsName,
			name : partsName, //tableのtext欄のドットより前（htmlElementList[X]）と同じNAMEを入れる
			src : partsInfo[4],
			class : 'displayNone',
		});
	} else {
		alert("想定外のタグを初期作成しようとしています。とりあえず<P>で");
		innerParts1 = $('<p>',{
			id : partsName,
			name : partsName, //tableのtext欄と同じNAMEを入れる
			text : partsInfo[4],
		});
		innerParts2 = $('<p>',{
			id : partsName,
			name : partsName, //tableのtext欄と同じNAMEを入れる
			text : partsInfo[4],
		});
	}

	//editAreaに部品を追加する
	prevParts.after(divParts);
	divParts.append(innerParts1);
	divParts.append(innerParts2);
	
	//edito/viewの切替、ChapterLevelの変更などの操作ボタンを付ける
	addContorolbutton(divParts, "displayNone");
	
	//追加した要素の中身（テキスト）が変わった際にはhtmlElementListテーブルの値も変更するイベントリスナーの追加
	//部品DIV（親）を渡して関数内で子（INPUTなど）にリスナーを付ける
	//ただし引数はjQuery形式ではなくオブジェクトなので[0]を付ける
	addChangeAction(divParts[0]);

	//部品情報格納用の配列をクリアする
	partsInfo =[];
	
	prevParts = divParts;
})

//各部品のTOP位置をすべて再取得
reGetPotion();

//TinyMCEを適用する
//const selector = "div#editArea textarea";
//addTinyMCE(selector);

//TinyMCEを非表示にする ⇒できない
//console.log("tox-tinymce:",$('div[class*="tox-tinymce"]')[0]);
//$('div[class*="tox-tinymce"]').css('display', 'none');



