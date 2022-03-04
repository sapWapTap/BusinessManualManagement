//配置時に自動調整
$('.editArea textarea').each(function(i, elem){
  	let lineHeight = parseInt(getComputedStyle(elem).lineHeight);
	let lines = (elem.value + '\n').match(/\n/g).length;
	elem.style.height = parseInt(lineHeight * lines * 1.2) + "px";
});


//入力後に自動調整するイベントリスナー追加
$(function() {
  var $textarea = $('textarea');
  var lineHeight = parseInt($textarea.css('lineHeight'));
  $textarea.on('input', function(e) {
    var lines = ($(this).val() + '\n').match(/\n/g).length;
    $(this).height(lineHeight * lines * 1.2);
  });
});


