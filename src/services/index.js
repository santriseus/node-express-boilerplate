const newUrlService = require('./url-service');
module.exports = function({dependencies, options}) {
  const {repositories: {urlRepository}, validation, urlEncoder, errors} = dependencies;
  const {urlPath} = options;
  dependencies.logger.debug('Creating services.');
  return {
    urlService: newUrlService({dependencies: {urlRepository, validation, urlEncoder, errors}, options: {urlPath}}),
  };
};
