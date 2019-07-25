'use strict';

const User = require('../models/user');
const Exercise = require('../models/exercise');

const MISSING_USER_ERROR_MESSAGE = 'User does not exist';
const DEFAULT_ERROR_MESSAGE = 'Error while saving exercise';

function createExercise(exercise, done) {
    const { date, ...part } = exercise;
    const newExercise = new Exercise(date ? exercise : part);

    User.findById(exercise.userId, (err, _) => {
        if (err) {
            return done({ msg: MISSING_USER_ERROR_MESSAGE });
        }

        newExercise.save((err, result) => {
            if (err) {
                return done({ msg: DEFAULT_ERROR_MESSAGE });
            }

            const { userId, description, duration, date } = result;

            done(null, { userId, description, duration, date });
        });
    });
}

exports.createExercise = createExercise;