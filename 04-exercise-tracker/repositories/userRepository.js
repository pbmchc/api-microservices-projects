import { MongoError } from 'mongodb';

import { User } from '../models/user.js';
import { CustomError, CUSTOM_ERROR_TYPES } from '../utils/errors.js';

const DUPLICATE_ENTRY_ERROR_CODE = 11000;
const DUPLICATE_ENTRY_ERROR = 'Username already taken';
const USER_SAVE_ERROR = 'Error while saving user';

function toUser(result) {
  const { _id, username } = result;
  return { _id, username };
}

export async function createUser(username) {
  const user = new User({ username });

  try {
    const result = await user.save();
    return toUser(result);
  } catch (err) {
    if (err instanceof MongoError) {
      const { code } = err;
      if (code === DUPLICATE_ENTRY_ERROR_CODE) {
        throw new CustomError(DUPLICATE_ENTRY_ERROR, CUSTOM_ERROR_TYPES.DUPLICATE_ENTRY);
      }
    }

    throw new CustomError(USER_SAVE_ERROR);
  }
}

export async function findUserById(userId) {
  return User.findById(userId);
}
