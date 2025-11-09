import { Exercise } from '../models/exercise.js';
import { CustomError, CUSTOM_ERROR_TYPES } from '../utils/errors.js';
import * as userRepository from './userRepository.js';

const EXERCISE_SAVE_ERROR = 'Error while saving exercise';
const EXERCISES_GET_ERROR = 'Error while getting exercises';
const USER_NOT_FOUND_ERROR = 'User does not exist';

function toExercise(result) {
  const { id, description, duration, date } = result;
  return { id, description, duration, date };
}

export async function createExercise(input) {
  const { date, ...part } = input;
  const exercise = new Exercise(date ? input : part);

  try {
    const { userId } = input;
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new CustomError(USER_NOT_FOUND_ERROR, CUSTOM_ERROR_TYPES.NOT_FOUND);
    }

    const result = await exercise.save();
    return toExercise(result);
  } catch (err) {
    if (err instanceof CustomError) throw err;
    throw new CustomError(EXERCISE_SAVE_ERROR);
  }
}

export async function getExercises(params) {
  const { userId, from, to, limit } = params;

  const conditions = { userId };
  if (from || to) {
    conditions.date = {
      ...(from ? { $gte: from } : {}),
      ...(to ? { $lte: to } : {}),
    };
  }

  const query = Exercise.find(conditions);
  if (limit) {
    query.limit(parseInt(limit, 10));
  }

  try {
    const results = await query.exec();
    return results.map((result) => toExercise(result));
  } catch {
    throw new CustomError(EXERCISES_GET_ERROR);
  }
}
