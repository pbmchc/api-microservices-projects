'use strict';

const { query } = require('express-validator');
const { createErrorMessage } = require('../utils/errorHandler');

const MISSING_REQUIRED_PARAM_ERROR = 'Missing required param'
const INVALID_PARAM_ERROR = 'Invalid query param';

module.exports = [
    query('userId')
        .not()
        .isEmpty()
        .withMessage(
            (_, { path }) =>
                createErrorMessage(MISSING_REQUIRED_PARAM_ERROR, path)
        ),
    query(['from', 'to'])
        .optional({
            checkFalsy: true
        })
        .isISO8601()
        .withMessage(
            (_, { path }) =>
                createErrorMessage(INVALID_PARAM_ERROR, path)
        ),
    query('limit')
        .optional({
            checkFalsy: true
        })
        .isInt({ gt: 0 })
        .withMessage(
            (_, { path }) =>
                createErrorMessage(INVALID_PARAM_ERROR, path)
        )
];