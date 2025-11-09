import path from 'node:path';

import multer from 'multer';

const UPLOAD_FIELD_NAME = 'upfile';
const UPLOAD_PATH = './public/uploads';
const UPLOAD_MAX_SIZE = 1000000;

function generateFileName(originalName) {
  return `${originalName}-${Date.now()}${path.extname(originalName)}`;
}

export function initializeFileStorage() {
  const storage = multer.diskStorage({
    destination: UPLOAD_PATH,
    filename: (_, { originalname }, callback) => callback(null, generateFileName(originalname)),
  });

  return multer({
    limits: { fileSize: UPLOAD_MAX_SIZE },
    storage,
  }).single(UPLOAD_FIELD_NAME);
}
