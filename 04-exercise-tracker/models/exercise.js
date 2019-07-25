'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const exerciseSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;