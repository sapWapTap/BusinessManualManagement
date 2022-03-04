


function addTinyMCE(){

  //適用すると以下の二つの問題がある
  //・テキストエリアを隠してもTinyMCEが表示されてしまう
  //・htmlElementListテーブル側にフォント色の変更などを反映できない
  //var tinyMceSelector = 'textarea[id^="htmlElementList["]:not([class*="displayNone"])';
  //そのため、わざと下記で対象にならないようにしている
  var tinyMceSelector = 'textarea[id^="XXXXXXXX"]:not([class*="displayNone"])';
  //console.log($(tinyMceSelector));

  tinymce.init({
  	language: 'ja', // 言語 = 日本語
      selector: tinyMceSelector,
      plugins: 'link lists media code',
      toolbar: 'alignleft aligncenter alignright alignjustify | formatselect | bullist numlist | outdent indent | link code',
      toolbar_mode: 'floating',
      tinycomments_author: 'Brian Carey',
      branding: false, // クレジットの削除
  });

  console.log("add tinyMCE");
}

