'use strict';

const urlRepository = require('../repositories/urlRepository.js');

const URL_GENERATION_ERROR = 'Error while generating URL';
const URL_DECODE_ERROR = 'Could not decode given URL';
const URL_NOT_FOUND = 'URL Not Found';

function generateUrl({ error, sourceUrl }, res) {
  if (error) {
    return res.json({ error });
  }
  
  urlRepository.generateUrl(sourceUrl, (err, result) => {
    if (err) {
      return res.json({ error: URL_GENERATION_ERROR });
    }
    
    const { original_url, short_url } = result;
    
    res.json({ original_url, short_url });
  });
}

function decodeUrl({ params: { link } }, res) {
  urlRepository.findByShortenedLink(link, (err, result) => {
    if (err) {
      return res.json({ error: URL_DECODE_ERROR });
    }
    
    if (!result) {
      return res.status(404).send(URL_NOT_FOUND);
    }
    
    res.redirect(result.original_url);
  });
}

exports.generateUrl = generateUrl;
exports.decodeUrl = decodeUrl;