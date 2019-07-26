'use strict';

const User = require('../models/user');
const Exercise = require('../models/exercise');

const DATE_BOUNDARIES = { FROM: 0, TO: 1 };
const MISSING_USER_ERROR_MESSAGE = 'User does not exist';
const SAVING_EXERCISE_ERROR_MESSAGE = 'Error while saving exercise';
const FETCHING_EXERCISES_ERROR_MESSAGE = 'Error while fetching exercises';

function createExercise(exercise, done) {
    const { date, ...part } = exercise;
    const newExercise = new Exercise(date ? exercise : part);

    User.findById(exercise.userId, (err, result) => {
        if (err || !result) {
            return done({
                msg: err
                    ? SAVING_EXERCISE_ERROR_MESSAGE
                    : MISSING_USER_ERROR_MESSAGE
            });
        }

        newExercise.save((err, result) => {
            if (err) {
                return done({ msg: SAVING_EXERCISE_ERROR_MESSAGE });
            }

            done(null, _mapExercise(result));
        });
    });
}

function getExercises(params, done) {
    const { userId, from, to, limit } = params;
    const conditions = { userId };

    _assignDateBoundaries(conditions, from, to);

    const query = Exercise.find(conditions);

    if (limit) {
        query.limit(parseInt(limit, 10));
    }

    query.exec((err, result) => {
        if (err) {
            return done({ msg: FETCHING_EXERCISES_ERROR_MESSAGE });
        }

        done(null, result.map(_mapExercise));
    })
}

function _assignDateBoundaries(conditions, ...dates) {
    dates.forEach((date, index) => {
        if (date) {
            conditions.date = {
                ...conditions.date,
                [index === DATE_BOUNDARIES.FROM ? '$gt' : '$lt']: date
            };
        }
    });
}

function _mapExercise(exercise) {
    const { id, description, duration, date } = exercise;

    return {
        id,
        description,
        duration,
        date
    };
}

exports.createExercise = createExercise;
exports.getExercises = getExercises;