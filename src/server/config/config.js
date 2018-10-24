require('dotenv').config('../.env');
const _ = require('lodash');

// default config object

let config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT_SECRET
  }
}

// checks if the node env file is set
// if env is not set the default is development
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
// sets the config.env
config.env = process.env.NODE_ENV;
config.front_end = process.env.FRONT_END || 'http://localhost:4200';

// database configurations
config.db = {
  options: {
    useMongoClient: true
  }
};

config.paginate = {
  limit: 20,
  offset: 1
};

let envConfig;
try {
  envConfig = require('./' + config.env)
  // if required returned something
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig)
