'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const urlValidator = require('./utils/validator.js');
const urlController = require('./controllers/urlController.js');
const app = express();

mongoose.connect(
  process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: 'false' }));

app.get('/', function (_, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', urlValidator, urlController.generateUrl);

app.get('/api/shorturl/:link', urlController.decodeUrl);

app.listen(PORT, function () {
  console.log(`Node listening on port ${PORT}`);
});