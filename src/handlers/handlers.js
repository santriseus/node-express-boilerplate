const config = require('config');
const {urlHandler} = require('src/handlers/dependencies')({options: config});

module.exports.createUrl = async function(event) {
  return urlHandler.createUrl(event);
};

module.exports.getLongUrl = async function(event) {
  return urlHandler.getLongUrl(event);
};
