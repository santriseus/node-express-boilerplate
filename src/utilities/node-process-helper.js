module.exports = function newNodeProcessManager({dependencies}) {
  const {process} = dependencies;
  return {
    handleUncaughtException: function(logger) {
      process.on('uncaughtException', function(err) {
        logger.fatal({data: {error: err}});
        console.error('Uncaught Exception:', err);
        process.exit(1);
      });
    },
    handleUnhandledRejection: function(logger) {
      process.on('unhandledRejection', (reason, promise) => {
        logger.error({data: {error: reason}}, 'Unhandled Rejection');
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      });
    },
  };
};
