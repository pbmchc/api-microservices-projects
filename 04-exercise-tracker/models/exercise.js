import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
export const Exercise = mongoose.model('Exercise', ExerciseSchema);
