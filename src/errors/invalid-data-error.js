const {GenericErrorWithStatus} = require('./generic-errors');

module.exports = class InvalidDataError extends GenericErrorWithStatus {
  constructor(message, options) {
    super(message, 'ERR_INVALID_DATA', 400, options);
    this.name = this.constructor.name;
  }
};
