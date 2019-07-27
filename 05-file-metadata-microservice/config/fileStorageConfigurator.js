'use strict';

const multer = require('multer');
const path = require('path');

const UPLOAD_FIELD_NAME = 'upfile';
const UPLOAD_PATH = './public/uploads';
const UPLOAD_MAX_SIZE = 1000000;

function initializeFileStorage() {
    const storage = multer.diskStorage({
        destination: UPLOAD_PATH,
        filename: (_, { originalname }, callback) =>
            callback(null, _generateFileName(originalname))
    });

    return multer({
        storage,
        limits: { fileSize: UPLOAD_MAX_SIZE }
    }).single(UPLOAD_FIELD_NAME);
}

function _generateFileName(originalName) {
    return `${originalName}-${Date.now()}${path.extname(originalName)}`;
}

exports.initializeFileStorage = initializeFileStorage;