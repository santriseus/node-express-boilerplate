const config = require('config');
const {app, logger} = require('./dependencies')({options: config});
app.listen(config.server.port, function() {
  logger.info({type: 'global'}, 'Server listening on port ' + config.server.port);
});
