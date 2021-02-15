const {serializeError} = require('serialize-error');
module.exports = function newErrorHandler({dependencies}) {
  const {errors, logger} = dependencies;
  function wrapError(err, event) {
    if (err.status) {
      return err;
    } else {
      return new errors.InternalServerError(`Internal server error occurred at ${event.http.method} ${event.http.path}`,
          {innerError: err});
    }
  }
  function sanitizeError(err) {
    if (err.stack) {
      delete err.stack;
    }
    if (err.innerError) {
      delete err.innerError;
    }
    return err;
  }
  return function handleError(err, event) {
    const wrappedError = wrapError(err, event);
    const msg = {
      type: 'request',
      data: {error: err, method: event.http.method, path: event.http.path},
    };
    if (err.status && err.status > 399 && err.status < 500) {
      logger.info(msg, 'Client error: ' + err.message);
    } else {
      logger.error(msg, 'Server error: '+ err.message);
    }
    return {
      statusCode: wrappedError.status,
      body: JSON.stringify({error: serializeError(sanitizeError(wrappedError))}),
    };
  };
};
