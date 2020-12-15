const {serializeError} = require('serialize-error');
module.exports = function newErrorMiddleware(errors, logger) {
  function wrapError(err, req) {
    if (err.status) {
      return err;
    } else {
      return new errors.InternalServerError(`Internal server error occurred at ${req.method} ${req.path}`,
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
  return function handleError(err, req, res, next) {
    const wrappedError = wrapError(err, req);
    const msg = {
      type: 'request',
      data: {error: err, method: req.method, path: req.path},
    };
    if (err.status && err.status > 399 && err.status < 500) {
      logger.info(msg, 'Client error: ' + err.message);
    } else {
      logger.error(msg, 'Server error: '+ err.message);
    }

    res.status(wrappedError.status).json({error: serializeError(sanitizeError(wrappedError))});
  };
};
