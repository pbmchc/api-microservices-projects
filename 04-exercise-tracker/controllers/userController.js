'use strict';

const userRepository = require('../repositories/userRepository');
const errorHandler = require('../utils/errorHandler');
const { validationResult } = require('express-validator');

function addUser(req, res, next) {
    const { body: { username } } = req;
    const { errors: [err] } = validationResult(req);

    if (err) {
        return next(errorHandler.prepareErrorPayload(err.msg));
    }

    userRepository.createUser(username, (err, result) => {
        if (err) {
            return next(errorHandler.prepareErrorPayload(err.msg));
        }

        res.json(result);
    });
}

exports.addUser = addUser;