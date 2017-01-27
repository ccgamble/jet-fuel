function addFolder(data) {
	$('.dropdown-folder').append(`<option id=${data.id}>${data.title}</option>`)

	$('.folder-display').append(`<a href="www.localhost:3000/api/folders/${data.id}">${data.title}</a><br/>`)
}

$('.url-submit').on('click', (e) => {
});

$('.folder-submit').on('click', (e) => {
	e.preventDefault();
	$.ajax({
		url: '/api/folders',
		type: 'post',
		data: {
			folder: $('.folder-input').val()
		},
		success : addFolder
	})
});

function fetchFolders () {
  axios.get('/api/folders')
  .then((response) => {
    debugger
    console.log(response);
    // $('.folder-display').append(response.);
  })
  .catch(function(error) {
  console.log('Error receiving folders')
})
}
