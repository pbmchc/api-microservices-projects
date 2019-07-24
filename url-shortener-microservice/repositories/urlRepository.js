'use strict';

const Url = require('../models/url.js');
const converter = require('../utils/converter.js');

function generateUrl(link, done) {
  findByFullLink(
    link,
    (err, result) => {
      if (err) {
        return done(err);
      }

      if (result) {
        return done(null, result);
      }

      findLastUrl((err, [lastUrl]) => {
        if (err) {
          return done(err);
        }

        _createNewUrl(link, lastUrl, done);
      });
    }
  );
}

function findByShortenedLink(link, done) {
  Url.findOne({ short_url: link }, (err, result) => {
    if (err) {
      return done(err);
    }

    done(null, result);
  });
}

function findByFullLink(link, done) {
  Url.findOne({ original_url: link }, (err, result) => {
    if (err) {
      return done(err);
    }

    done(null, result);
  });
}

function findLastUrl(done) {
  Url
    .find()
    .sort('-ordinal')
    .limit(1)
    .select('ordinal')
    .exec((err, result) => {
      if (err) {
        return done(err);
      }

      done(null, result);
    });
}

function _createNewUrl(link, lastUrl, done) {
  const ordinal = lastUrl ? lastUrl.ordinal + 1 : 1;
  const url = new Url({
    original_url: link,
    short_url: converter.shortenUrl(ordinal),
    ordinal
  });

  url.save((err, result) => {
    if (err) {
      return done(err);
    }

    done(null, result);
  });
}

exports.generateUrl = generateUrl;
exports.findByShortenedLink = findByShortenedLink;