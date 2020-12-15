const newUrlController = require('./url-controller');
module.exports = function newControllers({dependencies}) {
  const {services: {urlService}, logger} = dependencies;
  logger.debug('Creating controllers.');
  return {
    urlController: newUrlController({dependencies: {urlService}}),
  };
};
