const url = 'https://api.github.com/search/repositories?q='; //続けてキーワードを指定する
//full_nameプロパティがリポジトリ名、html_urlプロパティがリポジトリのURLを示す

$('#getGitHubApiBtn').on('click', () => {
	$.ajax({
		url:url + $('#target').val(),
		dataType:"json",
	}).done(data => {
		console.log(data);
		$('#githubQueryAddArea').empty();
		$.each(data.items, (index, value) => {
			const elements = `<a href=${value.html_url}><li>${value.full_name}</li></a>`;
			$('#githubQueryAddArea').append(elements);
		})
	})
})
