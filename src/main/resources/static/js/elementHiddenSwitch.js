
//#elementListTableテーブルの表示／非表示切替
$('#hiddenSwitchBtn').on('click', () => {
	let element = $('#elementListTable');
	//console.log(element.css('display'));
	if (element.hasClass('displayNone')){
		element.removeClass('displayNone');
	} else {
		element.addClass('displayNone');
	};
})
