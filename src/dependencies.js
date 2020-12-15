const Joi = require('joi');
const newLogger = require('./utilities/logger');
const newValidation = require('./utilities/validation');
const errors = require('./errors');
const newNodeProcessHelper = require('./utilities/node-process-helper');
const newUrlEncoder = require('./utilities/url-encoder');
const newRepositories = require('./repositories');
const newAWS = require('./aws');
const newServices = require('./services');
const newApp = require('./express-app');

module.exports = function newDependencies({options}) {
  const validation = newValidation({dependencies: {Joi, errors}});
  const logger = newLogger({options: {name: 'api', ...options.logging}});
  const nodeProcessHelper = newNodeProcessHelper({dependencies: {process}});
  const urlEncoder = newUrlEncoder();
  nodeProcessHelper.handleUncaughtException(logger);
  nodeProcessHelper.handleUnhandledRejection(logger);
  const aws = newAWS({dependencies: {logger}, options: options.aws});
  const repositories = newRepositories({dependencies: {aws, logger}, options: options.database});
  const services = newServices({dependencies: {repositories, validation, logger, urlEncoder, errors}, options: options.services});
  const app = newApp({dependencies: {services, logger, errors}, options: options.express});
  return {validation, logger, aws, repositories, services, app};
};
