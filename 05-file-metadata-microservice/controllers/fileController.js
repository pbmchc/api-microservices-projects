'use strict';

function extractFileMetadata(req, res) {
    const { file: { originalname, size } } = req;
    const metadata = {
        name: originalname,
        sizeInBytes: size
    };

    res.json(metadata);
}

exports.extractFileMetadata = extractFileMetadata;