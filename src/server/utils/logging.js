const winston = require('winston');
const config = require('../config/config');

winston.level = (config.logging) ? 'debug' : '';

module.exports = winston;
