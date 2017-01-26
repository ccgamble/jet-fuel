var express = require('express');
var bodyParser = require('body-parser');
const app = express();
const path = require('path');
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.envPORT || 3000);

app.locals.folders = [
  {
    0: 'folder one'
  },
  {
    1: 'folder two'
  }
]
app.locals.urls = [
  {
    folderId: '1',
    url: 'www.google.com',
		shorturl: 0,
    date: Date.now(),
    clickCount: 0
  }
]

app.get('/', (request, response) => {
});

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders);
});

app.post('/api/folders', (request, response) => {
	const { folderName } = request.body;
	const folderID = md5(folderName);

  app.locals.folders[folderID] = folderName;
  console.log(folderID, folderName);
  response.json({ folderID, folderName})
});

app.get('/api/folders/:folderID', (request, response) => {
  const {folderID} = request.params;
  const folder = app.locals.folders[folderID]

  if(!folder){
    response.sendStatus(404);
  }
  response.json({folder})
});

app.post('/api/folders/:folderID', (request, response) => {
	const {folderID} = request.params;
	const { url } = request.body;
	const urlId = md5(url);

	app.locals.urls[urlId] = {
		folderID,
		url,
		shorturl: urlId,
		date: Date.now(),
		clickCount: 0
	}
	response.json(app.locals.urls)
});

app.get('/api/folders/:folderid/:shorturl', (request, response) => {
  const {folderid, shorturl} = request.params
  const url = app.locals.urls[shorturl]

  response.json(url)
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
