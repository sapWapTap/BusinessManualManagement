
var mouseOnId = "none";

function getMouseOnId(){
	console.log('enter');
	if( event.target.classList.contains('isParts') == true ){
		mouseOnId = event.target.id;
		$('#mouseOnId').text(mouseOnId);
	}
}

function clearMouseOnId(){
	console.log('leave');
	if( event.target.classList.contains('isParts') == true ){
		mouseOnId = "";
		$('#mouseOnId').text(mouseOnId);
	}
}
