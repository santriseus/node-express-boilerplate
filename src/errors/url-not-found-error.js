const {GenericErrorWithStatus} = require('./generic-errors');

module.exports = class UrlNotFoundError extends GenericErrorWithStatus {
  constructor(message, options) {
    super(message, 'ERR_URL_NOT_FOUND', 404, options);
    this.name = this.constructor.name;
  }
};
