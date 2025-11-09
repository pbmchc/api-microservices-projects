import { validationResult } from 'express-validator';

import * as userRepository from '../repositories/userRepository.js';
import { toHttpError, toValidationError } from '../utils/errors.js';

export async function addUser(req, res, next) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return next({ errors: errors.map((err) => toValidationError(err)) });
  }

  try {
    const {
      body: { username },
    } = req;
    const result = await userRepository.createUser(username);

    return res.json(result);
  } catch (err) {
    return next(toHttpError(err));
  }
}
