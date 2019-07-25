'use strict';

const User = require('../models/user.js');

const DUPLICATE_ENTRY_ERROR_CODE = 11000;
const DUPLICATE_ENTRY_ERROR_MESSAGE = 'Username already taken';
const DEFAULT_ERROR_MESSAGE = 'Error while saving user';

function createUser(username, done) {
    const user = new User({ username });

    user.save((err, result) => {
        if (err) {
            const { code } = err;
            const msg = code === DUPLICATE_ENTRY_ERROR_CODE
                ? DUPLICATE_ENTRY_ERROR_MESSAGE
                : DEFAULT_ERROR_MESSAGE;

            return done({ msg });
        }

        const { _id, username } = result;

        done(null, { _id, username });
    });
}

exports.createUser = createUser;