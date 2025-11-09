import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  _id: {
    type: String,
    default: nanoid(),
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});
export const User = mongoose.model('User', UserSchema);
