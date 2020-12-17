const Joi = require('joi');
const AWS = require('aws-sdk');
// Errors
const errors = require('./errors');
// Utilities
const newLogger = require('./utilities/logger');
const newValidation = require('./utilities/validation');
const newNodeProcessHelper = require('./utilities/node-process-helper');
const newUrlEncoder = require('./utilities/url-encoder');
// AWS
const newDynamoDBDocumentClient = require('./aws/dynamo-db-document-client');
const newDynamoDB = require('./aws/dynamo-db');
// Repositories
const newUrlRepository = require('./repositories/url-repository');
// Services
const newUrlService = require('./services/url-service');
// App
const newApp = require('./express-app');

module.exports = function newDependencies({options}) {
  const validation = newValidation({dependencies: {Joi, errors}});
  const logger = newLogger({options: {name: 'api', ...options.logging}});
  const nodeProcessHelper = newNodeProcessHelper({dependencies: {process}});
  const urlEncoder = newUrlEncoder();
  nodeProcessHelper.handleUncaughtException(logger);
  nodeProcessHelper.handleUnhandledRejection(logger);

  const dynamoDBDocumentClient = newDynamoDBDocumentClient({
    dependencies: {AWS},
    options: options.aws.dynamoDB,
  });

  const dynamoDB = newDynamoDB({
    dependencies: {AWS},
    options: options.aws.dynamoDB,
  });

  const urlRepository = newUrlRepository({
    dependencies: {dynamoDBDocumentClient},
    options: {tableName: options.database.tableNames.url},
  });
  const urlService = newUrlService({dependencies: {urlRepository, validation, urlEncoder, errors}, options: {urlPath: options.services.urlPath}});
  const app = newApp({dependencies: {urlService, logger, errors}, options: options.express});
  return {validation, logger, urlEncoder, dynamoDBDocumentClient, dynamoDB, urlRepository, urlService, app};
};
