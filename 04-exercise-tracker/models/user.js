'use strict';

const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: {
        type: String,
        default: nanoid()
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;