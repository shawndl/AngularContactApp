// Entry point for the server

// setup configuration and the server
const config = require('./config/config');
const app = require('./server/server');

// winston is a plugin for logging messages
const winston = require('./utils/logging');

app.listen(config.port);
winston.info('listening on http://localhost:' + config.port);

