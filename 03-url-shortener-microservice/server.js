'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlValidator = require('./utils/validator.js');
const urlController = require('./controllers/urlController.js');

const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: 'false' }));

app.get('/', function (_, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', urlValidator, urlController.generateUrl);

app.get('/api/shorturl/:link', urlController.decodeUrl);

app.listen(port, function () {
  console.log('Node.js listening ...');
});