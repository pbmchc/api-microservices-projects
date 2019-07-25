'use strict';

const { body } = require('express-validator');
const { createErrorMessage } = require('../utils/errorHandler');

const MISSING_REQUIRED_FIELD_ERROR = 'Missing required field';
const INVALID_FIELD_VALUE_ERROR = 'Invalid field value';

module.exports = [
    body(['userId', 'description', 'duration'])
        .not()
        .isEmpty()
        .withMessage(
            (_, { path }) =>
                createErrorMessage(MISSING_REQUIRED_FIELD_ERROR, path)
        ),
    body('duration')
        .isInt({ gt: 0 })
        .withMessage(
            (_, { path }) =>
                createErrorMessage(INVALID_FIELD_VALUE_ERROR, path)
        ),
    body('date')
        .optional({
            checkFalsy: true
        })
        .isISO8601()
        .withMessage(
            (_, { path }) =>
                createErrorMessage(INVALID_FIELD_VALUE_ERROR, path)
        )
];