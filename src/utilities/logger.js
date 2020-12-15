const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const {serializeError} = require('serialize-error');
module.exports = function newLogger({options}) {
  const streams = [];
  if (options.pretty) {
    const prettyStdOut = new PrettyStream();
    prettyStdOut.pipe(process.stdout);
    streams.push( {
      level: options.level,
      type: 'raw',
      stream: prettyStdOut,
    });
  } else {
    streams.push( {
      level: options.level,
      type: 'stream',
      stream: process.stdout,
    });
  }
  const serializers = bunyan.stdSerializers;
  serializers.data = dataFieldSerializer;

  const logger = bunyan.createLogger({
    name: options.name,
    streams,
    serializers,
  });

  logger.on('error', function(err) {
    console.error(err);
  });

  return logger;
};

function dataFieldSerializer(data) {
  const serialized = {...data};
  if (data.error) {
    serialized.error = serializeError(data.error);
  }
  return serialized;
}
