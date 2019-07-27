'use strict';

const express = require('express');
const cors = require('cors');

const fileController = require('./controllers/fileController');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (_, res) => res.sendFile(process.cwd() + '/views/index.html'));

app.post(
  '/api/fileanalyse',
  fileController.uploadFile,
  fileController.extractFileMetadata
);

app.listen(process.env.PORT || 3000, function () {
  console.log('Server is listening ...');
});