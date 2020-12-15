const config = require('config');
const sinon = require('sinon');
const constants = require('./constants');
const request = require('supertest');
const AWS = require('aws-sdk');
if (config.aws.useDummyCredentials) {
  AWS.config = new AWS.Config({
    accessKeyId: 'AKID', secretAccessKey: 'SECRET', region: 'us-east-1',
  });
}
const dependencies = require('../../src/dependencies')({options: config});
const dataHelper = require('./data')({dependencies: {aws: dependencies.aws}});

module.exports = {
  ...dependencies,
  dataHelper,
  config,
  sinon,
  constants,
  request: config.testing.testApiWithRootUrl ? request(config.testing.rootUrlToTestApi): request(dependencies.app),
};
