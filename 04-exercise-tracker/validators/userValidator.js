import { body } from 'express-validator';

const INVALID_USERNAME_ERROR = 'Invalid username';

export const createUserValidationChain = () => {
  return [body('username').not().isEmpty().withMessage(INVALID_USERNAME_ERROR)];
};
