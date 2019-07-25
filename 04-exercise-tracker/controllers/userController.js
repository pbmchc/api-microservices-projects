'use strict';

const userRepository = require('../repositories/userRepository');

const METHOD_SIGNATURE_KEY = 'ADD_USER';

function addUser(req, res, next) {
    const { err, username } = req;

    if (err) {
        next(_prepareErrorMessage(err.message));
    }

    userRepository.createUser(username, (err, result) => {
        if (err) {
            const { message } = err;

            next(_prepareErrorMessage(message));
        }

        res.json(result);
    });
}

function _prepareErrorMessage(message, key = METHOD_SIGNATURE_KEY) {
    return {
        errors: { [key]: { message } }
    };
}

exports.addUser = addUser;