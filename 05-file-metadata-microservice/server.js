import cors from 'cors';
import express from 'express';

import * as fileController from './controllers/fileController.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile('views/index.html', { root: import.meta.dirname });
});

app.post('/api/fileanalyse', fileController.uploadFile, fileController.extractFileMetadata);

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
