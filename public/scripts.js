

$('.url-submit').on('click', (e) => {
  e.preventDefault();
  console.log("hello");
});

$('.folder-submit').on('click', (e) => {
  fetchBookmarks();
  console.log("hello");
});

function fetchBookmarks () {
  axios.get('/api/folders')
  .then((response) => {
    debugger
    console.log(response);
    // $('.folder-display').append(response.);
  })
  .catch(function(error) {
  console.log('Error receiving bookmarks')
})
}
