const {serializeError} = require('serialize-error');
class GenericError extends Error {
  constructor(message, code, options = {}) {
    super(message);
    for (const [key, value] of Object.entries(options)) {
      this[key] = value;
    }
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
    if (this.innerError && this.innerError.stack) {
      this.stack = this.innerError.stack + '\n--- End of inner error stack trace ---\n' + this.stack;
    }
  }
  toJSON() {
    return JSON.stringify(serializeError(this));
  }
}

class GenericErrorWithStatus extends GenericError {
  constructor(message, code, status, options) {
    super(message, code, options);
    this.name = this.constructor.name;
    this.status = status;
  }
}

module.exports = {GenericError, GenericErrorWithStatus};
