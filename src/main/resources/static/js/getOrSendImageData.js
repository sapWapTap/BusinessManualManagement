var getImageDataUrl = '../rest/get?id='; //続けてDocIdを指定する
var uploadImageDataUrl = '../rest/upload'; 

var token = $("meta[name='_csrf']").attr("content");
var header = "X-CSRF-TOKEN";

console.log("token:",token);
console.log("header:",header);

$(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader(header, token);  
});


$('#loadBtn').on('click', () => {

	const id = 1;

	
	//imageデータ（base64String）を取得するajax
	const processB = async function() {
		
		$.ajax({
			url:getImageDataUrl + id,
			dataType:"json",
		}).done(data => {
			$.each(data, (i, value) => {
				$('IMG#restTestImg').attr('src','data:image/png;base64,' + value);
			})
		})

	}


	const processAll = async function() {
		//await Promise.all([processA() processC()])  //ここには複数のプロセスを書け、全部終わったら次に進む、とできる
		//await processA() //単純に順番に処理する場合はこの通り
		//console.log("Aend");
		await processB()
		//console.log("Bend");
	}



	processAll();

})


$('#uploadTestBtn').on('click', (e) => {

	const processA = async function(event) {

	   //stop submit the form, we will post it manually.
		event.preventDefault();

	   //Get form
		var form = $('#fileUploadForm')[0]; //■

	   //Create an FormData object
		var data = new FormData(form);

	   //If you want to add an extra field for the FormData
		//data.append("CustomField", "This is some extra data, testing");

	   //disabled the submit button
		$("#btnSubmit").prop("disabled", true);

		$.ajax({
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
				$("#btnSubmit").prop("disabled", false);

			},
			error: function (e) {

				$("#result").text(e.responseText);
				console.log("ERROR : ", e);
				$("#btnSubmit").prop("disabled", false);

			}
		})
	}

	const processAll = async function(e) {
		//await Promise.all([processA() processC()])  //ここには複数のプロセスを書け、全部終わったら次に進む、とできる
		await processA(e) //単純に順番に処理する場合はこの通り
		//console.log("Aend");
		//await processB()
		//console.log("Bend");
	}



	processAll(e);


	
})


$('#uploadBtn').on('click', (e) => {
	
	uploadAndGetImageData(e);  //controllSwitch.jsへ移動

})


