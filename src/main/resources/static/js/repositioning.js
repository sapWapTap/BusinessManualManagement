
function reGetPotion() {
	
	//編集エリアの全部品オブジェクトの位置を取得
	$('div.editArea div[class*="isParts"]').each(function(i, elem){

		//Divでしめした「ここから」「ここまで」は除く
		if (elem.id !== "divTop" && elem.id !== "divBottom") {

			//console.log("repositionOgjName:", elem.getAttribute('name'));
						
			//位置を取得
			let eClientRectTop = elem.getBoundingClientRect().top;
			let partsName = elem.getAttribute('name');
	
			//htmlElementTableの対応セルに保存
			let queryText = "#htmlElementTable tr td textarea[name=\"" + partsName + ".clientRectTop\"]";
			//console.log("queryText:",queryText);
			$(queryText)[0].value = eClientRectTop;
	
		}

	})

}
