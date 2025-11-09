import { body } from 'express-validator';

import { toValidationErrorMessage } from '../utils/errors.js';

const INVALID_FIELD_VALUE_ERROR = 'Invalid field value';
const MISSING_REQUIRED_FIELD_ERROR = 'Missing required field';

export const createExerciseValidationChain = () => {
  return [
    body(['userId', 'description', 'duration'])
      .not()
      .isEmpty()
      .withMessage((_, { path }) => toValidationErrorMessage(path, MISSING_REQUIRED_FIELD_ERROR)),
    body('duration')
      .isInt({ gt: 0 })
      .withMessage((_, { path }) => toValidationErrorMessage(path, INVALID_FIELD_VALUE_ERROR)),
    body('date')
      .optional({ checkFalsy: true })
      .isISO8601()
      .withMessage((_, { path }) => toValidationErrorMessage(path, INVALID_FIELD_VALUE_ERROR)),
  ];
};
