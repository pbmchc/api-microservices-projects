'use strict';

const fileStorageConfigurator = require('../config/fileStorageConfigurator');
const { BAD_REQUEST } = require('../constants/httpErrorCodes');

const MISSING_FILE_ERROR_MESSAGE = 'No file selected';

const upload = fileStorageConfigurator.initializeFileStorage();

function uploadFile(req, res, next) {
    upload(req, res, err => {
        if (err) {
            const { code, message } = err;
            req.err = { code, message };
        }

        next();
    });
}

function extractFileMetadata(req, res) {
    const { err, file } = req;

    if (err || !file) {
        return res.status(BAD_REQUEST)
            .json(err || { message: MISSING_FILE_ERROR_MESSAGE });
    }

    const { originalname, size } = file;
    const metadata = {
        name: originalname,
        sizeInBytes: size
    };

    res.json(metadata);
}

exports.extractFileMetadata = extractFileMetadata;
exports.uploadFile = uploadFile;