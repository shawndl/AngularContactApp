const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt });
const User = require('../users/userModel');
const winston = require('../../utils/logging');

/**
 * if the token is on the query string it will put it on the header
 * then check if the token if valid
 * @return {Function}
 */
exports.decodeToken = () => {
  return function(request, response, next) {
    winston.info('checking token');
    checkToken(request, response, next);
  }
};

/**
 * searches the database for the user assigned to the jws token
 * if none if found it returns a 401
 * if a user is found then it creates a request.auth object
 * request.auth represents the logged in user
 * @return {Function}
 */
exports.getFreshUser = () => {
  return function(request, response, next) {
    winston.info('setting user');
    User.findById(request.user._id)
      .then(function(user) {
        // if there is no user return a 401
        winston.info('searching for user');
        if (!user) {
          winston.info('No user found');
          return response.status(401).send('Unauthorized');
        }
        // request.auth is the logged in user
        request.auth = user;
        winston.info('auth is set');
        next();
      }, function(error) {
        next(error);
      });
  }
};

/**
 * verifies if the users email and password
 * @return {Function}
 */
exports.verifyUser = function() {
  return function(request, response, next) {
    const email = request.body.email;
    const password = request.body.password;
    const errorMessage = 'We could not verify your user name or password';
    winston.info('Searching for a user');
    // look user up in the DB so we can check if the passwords match for the email
    User.findOne({email: email})
      .then(function(user) {
        if (!user) {
          winston.info('A user could not be found');
          return response.status(401).send(errorMessage);
        }
          winston.info('Found a user');
        // authenticate the password
        if (!user.authenticate(password)) {
          winston.info('The password did not watch the user');
          return response.status(401).send(errorMessage);
        }
        // if authenticated create a request.user object
        winston.info('A user matches the password');
        request.auth = user;
        next();
      },
        function(error) {
        winston.info('Error out in the verify user function');
        next(error);
      });
  };
};

/**
 * util method to sign tokens on signup
 */
exports.signToken = (id) => {
  winston.info('Preparing the sign in token with');
  return jwt.sign(
    {_id: id},
    config.secrets.jwt,
    {expiresIn: config.expireTime}
  );
};
