const {GenericErrorWithStatus} = require('./generic-errors');

module.exports = class InternalServerError extends GenericErrorWithStatus {
  constructor(message, options) {
    super(message, 'ERR_INTERNAL_SERVER', 500, options);
    this.name = this.constructor.name;
  }
};
