const serverless = require('serverless-http');
const config = require('config');
const {app} = require('./dependencies')({options: config});
module.exports.handler = serverless(app);
