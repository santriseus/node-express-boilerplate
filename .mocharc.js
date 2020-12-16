process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require("chai").use(require("chai-as-promised"));
module.exports = {
  'exit': true,
  'bail': true,
  'recursive': true,
  'timeout': 60000,
  'require': ['chai/register-assert', 'chai/register-expect', 'chai/register-should']
};
