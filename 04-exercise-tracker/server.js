'use strict';

require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const exerciseController = require('./controllers/exerciseController');
const exerciseParamsValidator = require('./validators/exerciseParamsValidator');
const exerciseValidator = require('./validators/exerciseValidator');
const userController = require('./controllers/userController');
const userValidator = require('./validators/userValidator');

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.DB);

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get(
  '/api/exercise/log',
  exerciseParamsValidator,
  exerciseController.getExercises
)

app.post(
  '/api/exercise/add',
  exerciseValidator,
  exerciseController.addExercise
);

app.post(
  '/api/exercise/new-user',
  userValidator,
  userController.addUser
);

app.use((req, res, next) => {
  return next({ status: 404, message: 'Not Found' });
});

app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    errCode = 400;
    const keys = Object.keys(err.errors);

    errMessage = err.errors[keys[0]].message;
  } else {
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }

  res.status(errCode).type('txt')
    .send(errMessage);
});

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
