import { initializeFileStorage } from '../config/fileStorageConfigurator.js';
import { HTTP_ERROR_CODES } from '../constants/httpErrorCodes.js';

const MISSING_FILE_ERROR = 'No file to analyze';

const upload = initializeFileStorage();
export function uploadFile(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      const { code, message } = err;
      req.err = { code, message };
    }

    next();
  });
}

export function extractFileMetadata(req, res) {
  const { err, file } = req;
  if (err || !file) {
    return res.status(HTTP_ERROR_CODES.BAD_REQUEST).json(err ?? { message: MISSING_FILE_ERROR });
  }

  const { originalname, size } = file;
  const metadata = { name: originalname, sizeInBytes: size };

  res.json(metadata);
}
