import { Url } from '../models/url.js';
import * as converter from '../utils/converter.js';

async function createNewUrl(link, lastUrl) {
  const ordinal = lastUrl ? lastUrl.ordinal + 1 : 1;
  const url = new Url({
    original_url: link,
    short_url: converter.shortenUrl(ordinal),
    ordinal,
  });

  return url.save();
}

async function findByFullLink(link) {
  return Url.findOne({ original_url: link });
}

async function findLastUrl() {
  const [lastUrl] = await Url.find().sort('-ordinal').limit(1).select('ordinal').exec();
  return lastUrl;
}

export async function findByShortenedLink(link) {
  return Url.findOne({ short_url: link });
}

export async function generateUrl(link) {
  const existingUrl = await findByFullLink(link);
  if (existingUrl) {
    return existingUrl;
  }

  const lastUrl = await findLastUrl();
  return createNewUrl(link, lastUrl);
}
