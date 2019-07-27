'use strict';

const multer = require('multer');
const path = require('path');

const UPLOAD_FIELD_NAME = 'upfile';
const UPLOAD_PATH = './public/uploads';

function initializeFileStorage() {
    const storage = multer.diskStorage({
        destination: UPLOAD_PATH,
        filename: (_, file, callback) =>
            callback(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`)
    });

    return multer({ storage }).single(UPLOAD_FIELD_NAME);
}

exports.initializeFileStorage = initializeFileStorage;