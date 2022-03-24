//(function(){

//とりあえず一意にするための部品番号
var partsNo = 90000;

//要素の取得
var elements = document.getElementsByClassName("drag-and-drop");

//要素内のクリックされた位置を取得するグローバル（のような）変数
var x;
var y;

//元のoffsetLeftを保存する変数
//var orgOffsetLeft;

//元がオリジナル（部品エリアからのドラッグ）であることを示すフラグ
var orgFlag = false;


//move時のイベントリスナーを複数回つけるのを防ぐフラグ
//mousemoveの初回のみリスナーをつけるように最後に実行されたイベントを保持する
var prevEvent;

//ドラッグアンドドロップによる要素の配置を行う

//マウスが要素内で押されたとき、又はタッチされたとき発火
for(var i = 0; i < elements.length; i++) {
	elements[i].addEventListener("mousedown", mdown, false);
	elements[i].addEventListener("touchstart", mdown, false);
}

//マウスが押された際の関数
function mdown(e) {


	console.log("mousedown");
	
	//console.log("this:",this);

	//console.log("pageX",e.pageX);
	//console.log("pageY:",e.pageY);
	//console.log("offsetLeft:",this.offsetLeft); 
	//console.log("offsetTop:",this.offsetTop);
	//console.log("window.pageXOffset:",window.pageXOffset);
	//console.log("window.pageYOffset:",window.pageYOffset);
	//console.log("this.parentNode.scrollLeft:",this.parentNode.scrollLeft);
	//console.log("this.parentNode.scrollTop:",this.parentNode.scrollTop);
	//console.log("RectTop:",this.getBoundingClientRect().top);
	//console.log("RectLeft:",this.getBoundingClientRect().left);
	//console.log( $(e.target).hasClass('editSwitch') )
	
	//divタグに対してのみ発火させる（テキストボックスにテキスト入れようとした際にクリックしても反応しては困る）
	//2022.03.02 ドラッグBTNにのみ発火に変更（実際にはeditSwitchクラスを持つDIV）
	if (e.target.tagName === 'DIV' && $(e.target).hasClass('moveForDrag') ){
		
		let drag = this; //部品div内の操作divをクリックしても、thisになるのは部品divの方。
		orgFlag = false;
		
		// 部品エリアから選択した際には持っていく前に複製してを残す（この残した方をオリジナルとして扱う）
		if (drag.classList.contains('original')) {

			//元がオリジナル（部品エリアからのドラッグ）であることを示すフラグ
			orgFlag = true;
			
			var cloneElement = drag.cloneNode(true);
			
			// 複製した要素の属性を編集
			cloneElement.classList.add("original");
			
			// 複製したHTML要素をページに挿入
			drag.after(cloneElement);

			//リスナーも追加する
			cloneElement.addEventListener("mousedown", mdown, false);
			cloneElement.addEventListener("touchstart", mdown, false);
			
			//部品エリアで貼ってあったラベルをはがす
			//console.log(this.children[0]);
			drag.children[0].remove();
			
			//部品エリアでおいていた仮drag hereを外す
			//console.log(this.children[0]);
			drag.children[0].remove();
			
			//（持っていく側へ）操作ボタンとイベントリスナーを追加する
			console.log("drag:)", drag);
			addContorolbutton($(drag), "");

			//持っていく方を「複製」として扱う
			drag.classList.remove("original");
			drag.classList.add("clone");
		
		}

		//元のoffsetLeftを保存しておき、ドロップ時に反映する
		//orgOffsetLeft = drag.offsetLeft;

		//絶対位置にする
		drag.style.position = "absolute";
		//console.log(this.style.position);
		//マウスカーソルの左下に移動。マージン分、ドラッグ位置からずれるので修正）
		drag.style.marginLeft = 0;
		drag.style.marginTop = 0;

		//クラス名に .drag を追加
		drag.classList.add("drag");

		//console.log(this);

		//タッチデイベントとマウスのイベントの差異を吸収
		if(e.type === "mousedown") {
			var event = e;
		} else {
			var event = e.changedTouches[0];
		}

		//複数回動かすとなぜかmousedown直後の初期位置がずれるので、カーソル直下へ設定する
		//マウスカーソル位置とDIV内スクロール量（実質は文章作成エリアのみ）を加減算
		let hoseiY = event.pageY + drag.parentNode.scrollTop;
		let hoseiX = event.pageX + drag.parentNode.scrollLeft;
		//文章作成エリアDIV（スクロール付きでFixed）からのドラッグ（orgFlag = false）の場合には、全体スクロールの量（window.pageYOffset）の影響を受けるので、加減算
		if (orgFlag === false) {
			hoseiY = hoseiY - window.pageYOffset;
			hoseiX = hoseiX - window.pageXOffset;
			//console.log("clone");
		}
		//カーソル直下へ
		drag.style.top = hoseiY + "px";
		drag.style.left = hoseiX + "px";

		//要素内の相対座標を取得（カーソル座標：pageX、親要素からの位置：offserLeft、親要素のスクロール量：this.parentNode.scrollLeft）
		//console.log(this.parentNode.scrollTop);
		//x = event.pageX + drag.parentNode.scrollLeft;
		//y = event.pageY + drag.parentNode.scrollTop;
		//文章作成エリアDIV（スクロール付きでFixed）からのドラッグ（orgFlag = false）の場合には、全体スクロールの量（window.pageYOffset）の影響を受けるので、加減算
		//if (orgFlag === false) {
		//	y -= window.pageYOffset;
		//	x -= window.pageXOffset;
		//	console.log("clone");
		//}
		// ⇒ move時に計算することにした


		//console.log("document.body.scrollTop:",document.body.scrollTop);

		prevEvent = "mousedown";
		
		//ムーブイベントにコールバック
		document.body.addEventListener("mousemove", mmove, false);
		document.body.addEventListener("touchmove", mmove, false);
		
	}

	//mousemoveの初回のみリスナーをつけるように最後に実行されたイベントを保持する
	prevEvent = "mousedown";

}

//マウスカーソルが動いたときに発火
function mmove(e) {
	
	isFirstMove = true;

	console.log("mousemove",
			//"pageX",e.pageX,
			//"pageY",e.pageY,
			//"offsetLeft",this.offsetLeft, 
			//"offsetTop",this.offsetTop,
			//"RectTop",this.getBoundingClientRect().top,
			//"RectLeft",this.getBoundingClientRect().left
	);

	//ドラッグしている要素を取得
	var drag = document.getElementsByClassName("drag")[0];

	//同様にマウスとタッチの差異を吸収
	if(e.type === "mousemove") {
		var event = e;
	} else {
		var event = e.changedTouches[0];
	}

	//フリックしたときに画面を動かさないようにデフォルト動作を抑制
	e.preventDefault();

	//マウスが動いた場所に要素を動かす
	//drag.style.top = event.pageY - y + "px";
	//drag.style.left = event.pageX - x + "px";
	//⇒ divエリアのスクロールと全体スクロール量を反映した

	//要素内の相対座標を取得（カーソル座標：pageX、親要素からの位置：offserLeft、親要素のスクロール量：this.parentNode.scrollLeft）
	//console.log(this.parentNode.scrollTop);
	x = event.pageX + drag.parentNode.scrollLeft;
	y = event.pageY + drag.parentNode.scrollTop;
	//文章作成エリアDIV（スクロール付きでFixed）からのドラッグ（orgFlag = false）の場合には、全体スクロールの量（window.pageYOffset）の影響を受けるので、加減算
	if (orgFlag === false) {
		y -= window.pageYOffset;
		x -= window.pageXOffset;
		//console.log("clone2");
	}
	drag.style.top = y + "px";
	drag.style.left = x + "px";
	
	//move中にイベントリスナーをつけるのは一回だけ（マウスダウン直後の初回のみ）
	if (prevEvent === "mousedown") {
		//console.log("addMouseupEventListen");
		//マウスボタンが離されたとき、またはカーソルが外れたとき発火
		drag.addEventListener("mouseup", mup, false);
		document.body.addEventListener("mouseleave", mup, false);
		drag.addEventListener("touchend", mup, false);
		document.body.addEventListener("touchleave", mup, false);
		isFirstMove = false;
	}

	//mousemoveの初回のみリスナーをつけるように最後に実行されたイベントを保持する
	prevEvent = "mousemove";

}

//マウスボタンが上がったら発火
function mup(e) {

	console.log("mouseup/mouseleave",
			//"pageX",e.pageX,
			//"pageY",e.pageY,
			//"offsetLeft",this.offsetLeft, 
			//"offsetTop",this.offsetTop,
			//"RectTop",this.getBoundingClientRect().top,
			//"RectLeft",this.getBoundingClientRect().left
	);

	var drag = document.getElementsByClassName("drag")[0];

	//ムーブベントハンドラの消去
	document.body.removeEventListener("mousemove", mmove, false);
	document.body.removeEventListener("mouseleave", mup, false);
	drag.removeEventListener("mouseup", mup, false);
	document.body.removeEventListener("touchmove", mmove, false);
	document.body.removeEventListener("touchleave", mup, false);
	drag.removeEventListener("touchend", mup, false);

	//クラス名に .isParts を追加
	drag.classList.add("isParts");
	
	//ドラッグしてきた部品の位置
	let dClientRectTop = drag.getBoundingClientRect().top ; //- drag.parentNode.scrollTop
	
	//eachで回す際にひとつ前のelemを保存する変数。初期値は編集エリア最上部のDIV（「ここから」のDIV）。
	let prevElement = $('div#divTop');

	//編集エリアの全部品オブジェクトの位置を取得してドロップした位置のDIVの下に配置する
	let eClientRectTop;
	$('div.editArea div[class*="isParts"]').each(function(i, elem){
		//他の部品の位置と比較し、直上の部品のIDを取得
		eClientRectTop = elem.getBoundingClientRect().top
		//console.log(eClientRectTop);
		//ひとつ前の要素の下に追加
		if (eClientRectTop > dClientRectTop){
			console.log("この下に追加：", elem.id);
			prevElement.after(drag);
			return false;
		}
		prevElement = elem;
	})
	
	//positionを相対位置に戻す
	drag.style.position = "static";
	//console.log(drag.style.position);

	//static（スタイルタグ） ⇒ マウスダウン ⇒ absolute化（スタイル属性） ⇒ ムーブ(スタイル属性top,left) ⇒ ドロップ ⇒ static によりStyleタグではなくStyle属性に値が入るので、クリアする
	//console.log(drag.style);
	drag.style.postion = null;
	drag.style.marginLeft = null;
	drag.style.marginTop = null;
	drag.style.top = null;
	drag.style.left = null;
	
	//console.log("orgOffsetLeft",orgOffsetLeft);
	//console.log("drag.style.marginLeft:",drag.style.marginLeft);

	//クラス名 .drag を消す
	drag.classList.remove("drag");
	
	//仮id（このページ内でとりあえず一意になるID）を採番する
	drag.id = partsNo;

	//部品エリアからのドロップであれば、elementListTableに要素を追加し、thymeleafでつけられた配列番号に+1した配列番号を返してもらう
	if (orgFlag === true) {

		retElementCount = addHtmlElementList(drag);
		console.log("retElementCount", retElementCount);

		//retElementCountを元にnameを設定する（保存用テーブルとname（のドットより前）と合わせる）
		//drag.name = "htmlElementList[" + retElementCount + "]"; //これだとNameがセットされない・・・。
		drag.setAttribute('name', "htmlElementList[" + retElementCount + "]");
		drag.children[1].name = "htmlElementList[" + retElementCount + "]"; //でもこっちはセットされる・・・。
		console.log("drag.name:", drag.name);
		console.log("drag:", drag);

		//inputやTEXTAREAのidもnameと同じにする（要素.getAttribute('name');を知らんかったので）
		//drag.children[1].id = "htmlElementList[" + retElementCount + "]";

		//追加した要素の中身が変わった際にはhtmlElementListテーブルの値も変更するイベントリスナーの追加
		addChangeAction(drag);
		//初期マージンレフト（.H1）を設定
		$(drag).addClass("H1");

	}

	//mousemoveの初回のみリスナーをつけるように最後に実行されたイベントを保持する
	prevEvent = "mouseup/leave";
	
	//各部品のTOP位置をすべて再取得してテーブルへ格納
	reGetPotion();
		
	//tinyMCEを適用する
	//selector = "div#editArea textarea";
	//addTinyMCE(selector);

	
	//正常終了確認用
	//console.log("end");


}

//})()

