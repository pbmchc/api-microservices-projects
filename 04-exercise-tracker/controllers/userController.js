'use strict';

const userRepository = require('../repositories/userRepository');
const errorHandler = require('../utils/errorHandler');

function addUser(req, res, next) {
    const { err, username } = req;

    if (err) {
        next(errorHandler.prepareErrorPayload(err.message));
    }

    userRepository.createUser(username, (err, result) => {
        if (err) {
            const { message } = err;

            next(errorHandler.prepareErrorPayload(message));
        }

        res.json(result);
    });
}

exports.addUser = addUser;