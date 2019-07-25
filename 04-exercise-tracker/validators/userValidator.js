'use strict';

const { body } = require('express-validator');

const INVALID_USERNAME_ERROR = 'Invalid username';

module.exports = [
    body('username')
        .not()
        .isEmpty()
        .withMessage(INVALID_USERNAME_ERROR)
];