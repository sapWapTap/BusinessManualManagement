
//追加したHtml要素情報を#htmlElementTableに追加する

//DBに格納する要素（HtmlElementクラス）のフィールド名を並べておく
const elementFieldName = ["id","tagName","idName","className","text","clientRectTop","chapterLevel","docId","color", "delFlag"]; //できればサーバからもってきたいが、受け渡し方法が分からん。。

let parts;

$('#addHtmlElementBtn').on('click', () => 	{
	addHtmlElementList()
})


function addHtmlElementList(parts){
	
	//DBに格納する要素（HtmlElementクラス）のフィールド数をセットする
	const numOfCol = elementFieldName.length;
	
	//現在の要素数を取得する（Thymeleafでセットしておく）
	let valElementCount = $('#elementCount').text();
	
	//TRタグ生成
	const trTag = $('<tr>',{
	});
	
	//TDタグと保存用のtextareaタグを生成（列数（フィールド数）の分だけ作成）
	const tdTag = [];
	const textAreaTag = [];
	for (i=0; i<numOfCol; i++){
		tdTag[i] = $('<td>',{
			name : "htmlElementList[" + valElementCount + "]." + elementFieldName[i],
		});
	    textAreaTag[i] =  $('<textarea>',{
			name : "htmlElementList[" + valElementCount + "]." + elementFieldName[i],
			rows : "1",
		})
	}
	
	//生成したHTML要素を表に保存する
	$('#htmlElementTable').append(trTag);
	for (i=0; i<numOfCol; i++){
		trTag.append(tdTag[i]);
		tdTag[i].append(textAreaTag[i]);
		if (parts != null){
			t = textAreaTag[i];
			t.id = parts.id;
			if (elementFieldName[i] == "id") {t.val(partsNo);}
			if (elementFieldName[i] == "tagName") {t.val(parts.children[1].tagName);}
			if (elementFieldName[i] == "idName") {t.val(parts.id);}
			if (elementFieldName[i] == "className") {t.text(parts.className);}
			if (elementFieldName[i] == "text") {t.text(parts.firstElementChild.text);}
			if (elementFieldName[i] == "clientRectTop") {t.text(parts.getBoundingClientRect().top);}
			if (elementFieldName[i] == "chapterLevel") {t.text(1);}
			if (elementFieldName[i] == "docId") {t.text($('LABEL#docId').text());}
			if (elementFieldName[i] == "color") {t.text(parts.firstElementChild.color);}
		}
	}

	console.log("$('LABEL#docId').text():", $('LABEL#docId').text());

	//{id:func(t),id:func(t)}
	
	valElementCount++;
	$('#elementCount').text(valElementCount);
	
	partsNo++;

	//今回割り振った番号を返す（最後に+1しているので-1して渡す）
	return valElementCount - 1;

}

	


