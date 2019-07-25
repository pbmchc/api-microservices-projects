'use strict';

const exerciseRepository = require('../repositories/exerciseRepository');
const errorHandler = require('../utils/errorHandler');
const { validationResult } = require('express-validator');

function addExercise(req, res, next) {
    const { body } = req;
    const { errors: [err] } = validationResult(req);

    if (err) {
        return next(errorHandler.prepareErrorPayload(err.msg));
    }

    exerciseRepository.createExercise(body, (err, result) => {
        if (err) {
            return next(errorHandler.prepareErrorPayload(err.msg));
        }

        res.json(result);
    });
}

exports.addExercise = addExercise;