'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const urlController = require('./controllers/urlController.js');
const urlValidator = require('./utils/validator.js');

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB);

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/shorturl/new', urlValidator, urlController.generateUrl);

app.get('/api/shorturl/:link', urlController.decodeUrl);

app.listen(PORT, () => {
  console.log(`Node listening on port ${PORT}`);
});
