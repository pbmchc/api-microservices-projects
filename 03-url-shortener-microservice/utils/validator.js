import dns from 'node:dns';

const INVALID_URL_ERROR = 'Invalid URL';
const PROTOCOL_REGEX = /https?:\/\//;
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;

function extractHost(url) {
  const [_, subdomain] = url.match(URL_REGEX);
  const withoutSubdomain = subdomain ? url.replace(subdomain, '') : url;
  const withoutProtocol = withoutSubdomain.replace(PROTOCOL_REGEX, '');
  const [host] = withoutProtocol.split('/');

  return host;
}

export function validateUrl(req, _res, next) {
  const {
    body: { url },
  } = req;
  const isValidUrl = URL_REGEX.test(url);

  if (isValidUrl) {
    const host = extractHost(url);

    dns.lookup(host, (err) => {
      if (err) {
        req.error = INVALID_URL_ERROR;
      }

      req.sourceUrl = url;
      next();
    });
  } else {
    req.error = INVALID_URL_ERROR;
    next();
  }
}
