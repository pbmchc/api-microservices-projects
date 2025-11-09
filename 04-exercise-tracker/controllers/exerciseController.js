import { validationResult } from 'express-validator';

import * as exerciseRepository from '../repositories/exerciseRepository.js';
import { toHttpError, toValidationError } from '../utils/errors.js';

export async function addExercise(req, res, next) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return next({ errors: errors.map((err) => toValidationError(err)) });
  }

  try {
    const { body } = req;
    const result = await exerciseRepository.createExercise(body);

    return res.json(result);
  } catch (err) {
    return next(toHttpError(err));
  }
}

export async function getExercisesLog(req, res, next) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return next({ errors: errors.map((err) => toValidationError(err)) });
  }

  try {
    const { query } = req;
    const result = await exerciseRepository.getExercises(query);

    return res.json(result);
  } catch {
    return next(toHttpError(err));
  }
}
