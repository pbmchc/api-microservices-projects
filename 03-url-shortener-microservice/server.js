import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import * as urlController from './controllers/urlController.js';
import * as validator from './utils/validator.js';

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB);

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.sendFile('views/index.html', { root: import.meta.dirname });
});

app.get('/api/shorturl/:link', urlController.decodeUrl);
app.post('/api/shorturl/new', validator.validateUrl, urlController.generateUrl);

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
