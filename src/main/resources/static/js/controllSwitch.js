
//コントロール系ボタンと部品エリアの表示/非表示を切り替える
$('#disableEditSwitchBtn').on('click', () => {
	//console.log('click');
	if ($('#diapEditMode').text() === 'V'){
		//右上のE/V表示切替（開発用）
		$('#diapEditMode').text('E');
		//各部品の操作ボタン表示切替
		$('.controlDiv').removeClass('displayNone');
		//各部品の枠線の表示切替
		$('.controlDiv').parent().addClass('border');
		//部品エリアの表示切替
		$('.partsArea').removeClass('displayNone');
		//編集エリアの幅切替
		$('.editArea').removeClass('width100');
		$('.editArea').addClass('width80');
	} else if ($('#diapEditMode').text() === 'E') {
		//右上のE/V表示切替（開発用）
		$('#diapEditMode').text('V');
		//各部品の操作ボタン表示切替
		$('.controlDiv').addClass('displayNone');
		//各部品の枠線の表示切替
		$('.controlDiv').parent().removeClass('border');
		//部品エリアの表示切替
		$('.partsArea').addClass('displayNone');
		//編集エリアの幅切替
		$('.editArea').removeClass('width80');
		$('.editArea').addClass('width100');
	} else {
		alert('controllSwitch.js : E/V以外がdiapEditModeにセットされています');
	}
});

//コントロール系のボタンを追加する
function addContorolbutton(div, dispNone){

	//console.log(div);
	
	//コントロール系のボタンを格納するdivを作成
	let controlDiv = $('<div>', {
		id : "controlDiv",
		class : "controlDiv " + dispNone,
	})
	div.prepend(controlDiv[0]);
	
	//編集⇔参照の切替ボタン
	let editSwitch = $('<button>', {
		id : "editBtn",
		text : "edit/view",
		class : "btn btn-outline-secondary  btn-sm editSwitch",
	})
	editSwitch[0].addEventListener("click", switchEV, false);
	controlDiv.append(editSwitch[0]);

	//chapterLevelのUpボタン
	let levelUpSwitch = $('<button>', {
		text : "UpLeft",
		class : "btn btn-outline-secondary  btn-sm editSwitch",
	})
	levelUpSwitch[0].addEventListener("click", changeChapterLevelUp, false);
	controlDiv.append(levelUpSwitch[0]);

	//chapterLevelのDownボタン
	let levelDownSwitch = $('<button>', {
		text : "DownRight",
		class : "btn btn-outline-secondary  btn-sm editSwitch",
	})
	levelDownSwitch[0].addEventListener("click", changeChapterLevelDown, false);
	controlDiv.append(levelDownSwitch[0]);

	//画像アップロードフォーム
	let fileUploadSwitch = $('<form>', {
		id : "fileUploadForm",
		method : "POST",
		enctype : "multipart/form-data"
	})
	let fileUploadInput = $('<input>', {
		type : "file",
		name : "file",
		id : "file",
		text : "SELECT",
		class : "btn btn-outline-secondary  btn-sm editSwitch displayNone",
	})
	let fileUploadInputInsteadBtn = $('<button>', {
		type : "button",
		id : "fileInstead",
		text : "Change",
		class : "btn btn-outline-secondary  btn-sm editSwitch",
	})
	let fileUploadBtn = $('<button>', {
		type : "submit",
		id : "uploadBtn",
		text : "SET",
		class : "btn btn-outline-secondary  btn-sm editSwitch displayNone",
	})
	fileUploadInput[0].addEventListener("change", insteadClickFileUpload, false);
	fileUploadInputInsteadBtn[0].addEventListener("click", insteadClickFileInput, false);
	fileUploadBtn[0].addEventListener("click", uploadAndGetImageData, false);
	fileUploadSwitch.append(fileUploadInput[0]);
	fileUploadSwitch.append(fileUploadInputInsteadBtn[0]);
	fileUploadSwitch.append(fileUploadBtn[0]);
	controlDiv.append(fileUploadSwitch[0]);
	/*
	*/

	//ドラッグスペースボタン
	let dragSpace = $('<div>', {
		text : "Drag here",
		class : "btn btn-outline-secondary  btn-sm editSwitch moveForDrag",
		width : "20%",
	})
	controlDiv.append(dragSpace[0]);

	//削除ボタン
	let delSwitch = $('<button>', {
		text : "Del",
		class : "btn btn-outline-danger  btn-sm editSwitch",
	})
	delSwitch[0].addEventListener("click", deleteFlagEnable, false);
	controlDiv.append(delSwitch[0]);

	//ページ内リンクタグ
	//⇒不要。<a>を入れるのはリンク元の場合。リンク先は各タグのidを使用するため、特別な記述はいらない。HTML5で変わったらしい。。。
	//let inPageLink = $('<a>', {
	//	name : div.attr('id')
	//})
	//controlDiv.append(inPageLink[0]);


}

//ある部品の編集モード(Edit)と参照モード(View)を切り替える。参照モードでは<p>や<h1>を生成して<input>を隠す。
function switchEV(event){
	
	//ボタンの上位はボタンを格納しているdiv、その上が部品一式のdiv
	let parent = event.target.parentNode.parentNode;
	//console.log("parent:",parent);
	let brothers = parent.children;
	//console.log("brothers1:",brothers[0]);
	//console.log(brothers[0]);
	if (brothers[1].tagName ==="INPUT"){
		$(brothers[1]).addClass('displayNone');
		//章題のレベルを持ってくる
		let queryText = 'textarea[name="' + brothers[1].name + '.chapterLevel"]';
		//console.log("bro:",brothers[0].name);
		//console.log("que:",queryText);
		let level = $(queryText).val(); 
		//console.log("H1?:",level);
		label = $('<h' + level + '>' ,{
			id : brothers[1].name,
			name : brothers[1].name, 
			text : brothers[1].value,
		});
		//console.log("brothers[0]:",brothers[0]);
		//console.log("label[0]:",label[0]);
		brothers[1].before(label[0]);
	} else if (brothers[1].tagName ==="TEXTAREA"){
		$(brothers[1]).addClass('displayNone');
		label = $('<p>',{
			id : brothers[1].name,
			name : brothers[1].name, 
			text : brothers[1].value,
		});
		//console.log("brothers[0]:",brothers[0]);
		//console.log("label[0]:",label[0]);
		brothers[1].before(label[0]);
	} else if (brothers[1].tagName ==="H1"
				|| brothers[1].tagName ==="H2"
				|| brothers[1].tagName ==="H3"
				|| brothers[1].tagName ==="H4"
				|| brothers[1].tagName ==="H5"
				|| brothers[1].tagName ==="H6"
				|| brothers[1].tagName ==="H7"
				){
		$(brothers[2]).removeClass('displayNone');
		$(brothers[1]).remove();
	} else if (brothers[1].tagName ==="P"){
		$(brothers[2]).removeClass('displayNone');
		$(brothers[1]).remove();
		//TinyMCEを適用する
		addTinyMCE();
	} else {
		alert("controllSwitch.js:想定外のタグ名が入っています！");
	}


	
}

//chapterLevelを切り替えて、<HX>タグを変更する
function changeChapterLevelDown(event){
	let parent = event.target.parentNode.parentNode; //部品DIVを取得
	let brothers = parent.children;
	let queryText = 'textarea[name="' + parent.getAttribute('name') + '.chapterLevel"]';
	console.log("queryText:",queryText);
	let chapterLevel = $(queryText).val();
	if (chapterLevel != 7){
		changeChapterLevel(brothers[1], chapterLevel, queryText, "DOWN")
	}
		
}

//chapterLevelを切り替えて、<HX>タグを変更する
function changeChapterLevelUp(event){
	let parent = event.target.parentNode.parentNode; //部品DIVを取得
	let brothers = parent.children;
	let queryText = 'textarea[name="' + parent.getAttribute('name') + '.chapterLevel"]';
	console.log("queryText:",queryText);
	let chapterLevel = $(queryText).val();
	if (chapterLevel != 1){
		changeChapterLevel(brothers[1], chapterLevel, queryText, "UP")
	}
}

//chapterLevelを切り替えて、<HX>タグを変更する
function changeChapterLevel(element, chapterLevel, queryText, upOrDown) {

	let nextLevel; //変更後のchapterLevelを格納する
	
	//Down/Upに合わせて加減算
	if (upOrDown === "DOWN") {
		nextLevel = parseInt(chapterLevel) + 1;
	} else if (upOrDown === "UP") {
		nextLevel = parseInt(chapterLevel) - 1;
	} else {
		nextLevel = parseInt(chapterLevel)
	}
	//elementTableの値を変更
	$(queryText).val(nextLevel);

	//<HX>タグを入れ替え
	if (element.tagName === 'H1'
		|| element.tagName === 'H2'
		|| element.tagName === 'H3'
		|| element.tagName === 'H4'
		|| element.tagName === 'H5'
		|| element.tagName === 'H6'
		|| element.tagName === 'H7'
		) {
		let changeTag = $('<h' + nextLevel + '>' ,{
			id : element.id,
			name : element.name, 
			text : element.textContent,
		});
		element.after(changeTag[0]);
		element.remove();

		//以下の処理用にelementを入れ替え
		element = changeTag[0];
	}
	
	//DIVタグのmarginLeftを変更（クラスの入れ替え）
	//親（DIVタグ）を取得する
	let div = element.parentNode;
	console.log("element:",element);
	console.log("div:",div);
	//.H1から.H7までのクラスを持っている場合は削除
	for (i=1; i<8; i++){
		removeClassName = 'H' + i;
		if ($(div).hasClass(removeClassName)) {
			$(div).removeClass(removeClassName);
			console.log("removeClassName:",removeClassName);
		}
	}
	//新しいクラスを追加
	className = 'H' + nextLevel;
	$(div).addClass(className);
	
}


function insteadClickFileInput(event){

		console.log("event.target.previousElementSibling：", event.target.previousElementSibling);
		event.target.previousElementSibling.click();

}

function insteadClickFileUpload(event){

		console.log("event.target.nextElementSibling.nextElementSibling：", event.target.nextElementSibling.nextElementSibling);
		event.target.nextElementSibling.nextElementSibling.click();

}


function uploadAndGetImageData(e){
	
	//ファイルをフォーム形式で曹宇審するajax（CSRF対策付き）
	const processA = async function(event) {
		
		console.log("realAstart");

	   //stop submit the form, we will post it manually.
		event.preventDefault();

	   //Get form
		//var form = $('#fileUploadForm')[0]; 
		var form = event.target.parentNode;

	   //Create an FormData object
		var data = new FormData(form);

	   //If you want to add an extra field for the FormData
		//data.append("CustomField", "This is some extra data, testing");

	   //disabled the submit button
		$("#uploadBtn").prop("disabled", true);

		await $.ajax({
			type: "POST",
			enctype: 'multipart/form-data',
			url: uploadImageDataUrl,
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 10000,
			success: function (data) {
				$("#result").text(data);
				console.log("SUCCESS : ", data);
				$("#uploadBtn").prop("disabled", false);
				//console.log(e.target.parentNode.parentNode.parentNode.children[1]);
				e.target.parentNode.parentNode.parentNode.children[1].src = data;
				console.log("realAend");
			},
			error: function (e) {
				$("#result").text(e.responseText);
				console.log("ERROR : ", e);
				$("#uploadBtn").prop("disabled", false);
			}
		})
		
	}	
	
	
	//imageデータ（base64String）を取得するajax
	const processB = async function(event) {
		console.log("realBstart");

		//プロセスAでsrcに画像ファイルのFileDBのidをセットしてある。		
		var id = e.target.parentNode.parentNode.parentNode.children[1].getAttribute("src");

		//htmElementListテーブルのtext欄にFileDBのidをセット
		//console.log("e.target.parentNode.parentNode.parentNode.getAttribute(name):",e.target.parentNode.parentNode.parentNode.getAttribute("name"));
		let queryText = "#htmlElementTable tr td textarea[name=\"" + e.target.parentNode.parentNode.parentNode.getAttribute("name") + ".text\"]";
		//console.log("queryText:",queryText);
		//console.log("name:",$(queryText)[0].name);
		$(queryText)[0].value = id;

		$.ajax({
			url:getImageDataUrl + id,
			dataType:"json",
		}).done(data => {
			$.each(data, (i, value) => {
				e.target.parentNode.parentNode.parentNode.children[1].src = 'data:image/png;base64,' + value;
			})
			console.log("realBend");
		})

		console.log("realBend");
	}


	const processAll = async function(e) {
		//await Promise.all([processA() processC()])  //ここには複数のプロセスを書け、全部終わったら次に進む、とできる
		await processA(e) //単純に順番に処理する場合はこの通り
		console.log("Aend");
		await processB(e)
		console.log("Bend");
	}



	processAll(e);

}



function deleteFlagEnable(event) {
	
	//elementTableの対象セルの値を更新する
	let parent = event.target.parentNode.parentNode; //部品DIV(削除ボタンの親々DIV)を取得
	//elementTableの対象のセルを指定するクエリ―
	let queryText = 'textarea[name="' + parent.getAttribute('name') + '.delFlag"]';
	//elementTableの値を変更
	$(queryText).val(true);
	
	//部品DIVを非表示にする
	$(parent).addClass('displayNone');
}

