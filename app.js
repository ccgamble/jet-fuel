const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5');
const moment = require('moment');
const shortid = require('shortid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.envPORT || 3000);

app.locals.folders = []
app.locals.urls = []

app.get('/', (request, response) => {
});

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders);
});

app.get('/api/urls', (request, response) => {
	response.json(app.locals.urls)
})

app.get('/api/folders/:folderID', (request, response) => {
	const {folderID} = request.params;
	const folder = app.locals.folders[folderID]

	if(!folder){
		response.sendStatus(404);
	}
	response.json({folder})
});

app.post('/api/folders', (request, response) => {
  const { folder } = request.body
  const id = md5(folder)
	const folder_object = {folder_title: folder, id: id}

	if(!folder) {
		response.status(422).send('No folder provided');
	}

  app.locals.folders.push(folder_object)
  response.status(201).json(folder_object)
});

app.post('/api/urls', (request, response) => {

	const { url, folder_id } = request.body
	const id = md5(url)
	const short_url = 'http://' + shortid.generate()
	const created_at = moment()
	const url_object = {
		id : id,
		folder_id: folder_id,
		original_url: url,
		short_url: short_url,
		created_at: created_at
	}

	if(!url) {
		response.status(422).send('No url provided in the input field.')
	}

	app.locals.urls.push(url_object)
	response.status(201).json(url_object)

})

app.listen(3000, () => {
  console.log('listening');
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry, trouble finding that!')
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
