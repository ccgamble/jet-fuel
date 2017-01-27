function addFolder(data) {
	$('.dropdown-folder').append(`<option id=${data.id}>${data.title}</option>`)

	$('.folder-display').append(`<a href="www.localhost:3000/api/folders/${data.id}">${data.title}</a><br/>`)
}

function addURL(data) {
	$('.url-display').append(`<a href="http://${data.original_url}" target='_blank'>${data.short_url}</a><br/>`)
}

$('.url-submit').on('click', (e) => {
	e.preventDefault();
	$.ajax({
		url: '/api/urls',
		type: 'post',
		data: {
			url: $('.url-input').val(),
			folder_id: ($('option:selected')[0].id)
		},
		success: addURL
	})
});

$('.folder-submit').on('click', (e) => {
	e.preventDefault();
	$.ajax({
		url: '/api/folders',
		type: 'post',
		data: {
			folder: $('.folder-input').val()
		},
		success: addFolder
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
