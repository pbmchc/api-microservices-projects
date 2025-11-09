import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import { HTTP_ERROR_CODES } from './constants/httpErrorCodes.js';
import * as exerciseController from './controllers/exerciseController.js';
import * as userController from './controllers/userController.js';
import { createExercisesLogParamsValidationChain } from './validators/exercisesLogParamsValidator.js';
import { createExerciseValidationChain } from './validators/exerciseValidator.js';
import { createUserValidationChain } from './validators/userValidator.js';

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB);

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.sendFile('views/index.html', { root: import.meta.dirname });
});

app.get(
  '/api/exercise/log',
  createExercisesLogParamsValidationChain(),
  exerciseController.getExercisesLog
);
app.post('/api/exercise/add', createExerciseValidationChain(), exerciseController.addExercise);
app.post('/api/exercise/new-user', createUserValidationChain(), userController.addUser);

app.use((_req, res, _next) => {
  res.status(HTTP_ERROR_CODES.NOT_FOUND).type('txt').send('Not Found');
});

app.use((err, _req, res, _next) => {
  let errCode, errMessage;

  if (err.errors) {
    errCode = HTTP_ERROR_CODES.BAD_REQUEST;
    errMessage = err.errors[Object.keys(err.errors)[0]].message;
  } else {
    errCode = err.status || HTTP_ERROR_CODES.INTERNAL_SERVER_ERROR;
    errMessage = err.message || 'Internal Server Error';
  }

  res.status(errCode).type('txt').send(errMessage);
});

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
