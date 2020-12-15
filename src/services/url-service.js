const newUrlServiceSchemas = require('./url-service-schemas');
module.exports = function newUrlService({dependencies, options}) {
  const {urlRepository, urlEncoder, errors, validation: {validate, Joi}} = dependencies;
  const {urlPath} = options;
  const {addNewUrlSchemas, getFullUrlSchemas} = newUrlServiceSchemas(Joi);
  return {
    createUrl: validate(async function createUrl(input) {
      const {longUrl} = input;
      const next = await urlRepository.getNextCount();
      const code = urlEncoder.encode(next);
      await urlRepository.createUrl(code, longUrl);
      const shortUrl = urlPath + code;
      return {code, longUrl, shortUrl};
    }, addNewUrlSchemas),
    getLongUrl: validate(async function getLongUrl(input) {
      const {code} = input;
      const shortUrl = urlPath + code;
      const longUrl = await urlRepository.getUrl(code);
      if (!longUrl) {
        throw new errors.UrlNotFoundError(`Url was not found for link "${shortUrl}"`);
      }
      return {longUrl, code, shortUrl};
    }, getFullUrlSchemas),
  };
};
