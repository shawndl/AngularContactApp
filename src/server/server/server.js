const express = require('express');
const app = express();
const api = require('../api/api');
const winston = require('../utils/logging');
const config = require('../config/config');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');

winston.info('DB URL: ');
winston.log(config.db);

require('mongoose').connect(config.db.url, config.db.options);
// Set up middle the global middleware
require('../middleware/appMiddleware')(app);

// add custom middleware
app.use('/api', api);
// app.use('/auth', auth);

// set up global error handling
app.use(function(error, request, response, next) {
  // if error thrown from jwt validation check
  if (error.name === 'UnauthorizedError') {
    response.status(401).send('Invalid token');
    return;
  }

  winston.log(error.stack);
  response.status(500).send('Unable to perform the requested function at this time');
});

// serve static files to the public directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = app;
