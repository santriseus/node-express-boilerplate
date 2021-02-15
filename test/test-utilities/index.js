const config = require('config');
const sinon = require('sinon');
const constants = require('./constants');
const AWS = require('aws-sdk');
if (config.aws.useDummyCredentials) {
  AWS.config = new AWS.Config({
    accessKeyId: 'AKID', secretAccessKey: 'SECRET', region: 'us-east-1',
  });
}
const dependencies = require('../../src/handlers/dependencies')({options: config});
const dataHelper = require('./data')({dependencies});

module.exports = {
  ...dependencies,
  dataHelper,
  config,
  sinon,
  constants
};
