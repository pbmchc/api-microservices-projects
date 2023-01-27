'use strict';

const cors = require('cors');
const express = require('express');

const fileController = require('./controllers/fileController');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use('/public', express.static('public'));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post(
  '/api/fileanalyse',
  fileController.uploadFile,
  fileController.extractFileMetadata
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
