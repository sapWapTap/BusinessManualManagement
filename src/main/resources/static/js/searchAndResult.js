//const htmlElementViewUrl = 'http://localhost:8080/editHtmlElementList';
const htmlElementViewUrl = './editHtmlElementList';
//const htmlElementSerarchUrl = 'http://localhost:8080/searchHtmlElement?searchWord='; //続けてキーワードを指定する
const htmlElementSerarchUrl = './searchHtmlElement?searchWord='; //続けてキーワードを指定する
//const docSearchUrl = 'http://localhost:8080/searchDoc?docId='; //続けてDocIdを指定する
const docSearchUrl = './searchDoc?docId='; //続けてDocIdを指定する

$('#searchBtn').on('click', () => {
	
	let prevDocId = 0;
	let docIdList = [];

	//①htmlElementを取得するajax
	const processA = async function() {
		await $.ajax({
			url:htmlElementSerarchUrl + $('#searchWord').val(),
			dataType:"json",
		}).done(data => {
	
			console.log("Adata:", data);
	
			$('#searchResultArea').empty();
	
			$.each(data, (i, value) => {
	
				const id = value.id;
				const docId = value.docId;
				const text = escapeHtml(value.text);
				var docName = "";
	
				if (prevDocId != docId) {
	
					const provTitle = `<a id=a${docId} href=${docId}><li id=li${docId} >${docId}</li></a>`;
					$('#searchResultArea').append(provTitle);
					docIdList.push(docId);
				}
	
				const textElements = `<ul><a href=${htmlElementViewUrl}/${docId}#${id}><li>${text}</li></a></ul>`;
				$('#searchResultArea').append(textElements);
				prevDocId = docId;
			})

			console.log("Bdata:", data[0]);
			$('.container').append(data[0]);

		})
	}

	//②docNameを取得するajax （①完了後に実行する）
	const processB = async function() {
		docIdList.forEach(function(docId, index) {
			
			$.ajax({
				url:docSearchUrl + docId,
				dataType:"json",
			}).done(data => {
				$.each(data, (i, value) => {
					docName = value.docName;
					$(`a#a${docId}`).attr("href", `${htmlElementViewUrl}/${docId}`);
					$(`li#li${docId}`).text(docName);
					
					//const titleElements = `<a href=${id}><li>${docName}</li></a>`;
					//$('#searchResultArea').append(titleElements);
				})
			})

			
		});
	}

	const processAll = async function() {
		//await Promise.all([processA() processC()])  //ここには複数のプロセスを書け、全部終わったら次に進む、とできる
		await processA() //単純に順番に処理する場合はこの通り
		console.log("Aend");
		await processB()
		console.log("Bend");
	}

	processAll();

})
