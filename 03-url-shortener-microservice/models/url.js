import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UrlSchema = new Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
  ordinal: {
    type: Number,
    required: true,
  },
});
export const Url = mongoose.model('Url', UrlSchema);
