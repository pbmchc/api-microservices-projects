'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');

const exerciseController = require('./controllers/exerciseController');
const exerciseValidator = require('./validators/exerciseValidator');
const userController = require('./controllers/userController');
const userValidator = require('./validators/userValidator');

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.get('/', (_, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

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
  return next({ status: 404, message: 'not found' });
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

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});