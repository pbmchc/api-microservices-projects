import { CHARS } from '../constants/constants.js';

export function shortenUrl(ordinal) {
  let result = ordinal;
  const charCodes = [];

  while (result > 0) {
    const { length } = CHARS;

    charCodes.unshift(result % length);
    result = Math.floor(result / length);
  }

  return charCodes.map((code) => CHARS[code]).join('');
}
