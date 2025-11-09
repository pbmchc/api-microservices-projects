import * as urlRepository from '../repositories/urlRepository.js';

const URL_DECODE_ERROR = 'Could not decode given URL';
const URL_GENERATION_ERROR = 'Error while generating URL';
const URL_NOT_FOUND = 'URL Not Found';

export async function decodeUrl({ params: { link } }, res) {
  try {
    const result = await urlRepository.findByShortenedLink(link);
    if (!result) {
      return res.status(404).send(URL_NOT_FOUND);
    }

    const { original_url } = result;
    return res.redirect(original_url);
  } catch (err) {
    return res.json({ error: URL_DECODE_ERROR });
  }
}

export async function generateUrl({ error, sourceUrl }, res) {
  if (error) {
    return res.json({ error });
  }

  try {
    const { original_url, short_url } = await urlRepository.generateUrl(sourceUrl);
    return res.json({ original_url, short_url });
  } catch (err) {
    return res.json({ error: URL_GENERATION_ERROR });
  }
}
