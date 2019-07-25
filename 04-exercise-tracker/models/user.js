'use strict';

const shortid = require('shortid');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate()
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