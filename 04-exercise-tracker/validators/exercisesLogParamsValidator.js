import { query } from 'express-validator';

import { toValidationErrorMessage } from '../utils/errors.js';

const INVALID_PARAM_ERROR = 'Invalid query param';
const MISSING_REQUIRED_PARAM_ERROR = 'Missing required query param';

export const createExercisesLogParamsValidationChain = () => {
  return [
    query('userId')
      .not()
      .isEmpty()
      .withMessage((_, { path }) => toValidationErrorMessage(path, MISSING_REQUIRED_PARAM_ERROR)),
    query(['from', 'to'])
      .optional({ checkFalsy: true })
      .isISO8601()
      .withMessage((_, { path }) => toValidationErrorMessage(path, INVALID_PARAM_ERROR)),
    query('limit')
      .optional({ checkFalsy: true })
      .isInt({ gt: 0 })
      .withMessage((_, { path }) => toValidationErrorMessage(path, INVALID_PARAM_ERROR)),
  ];
};
