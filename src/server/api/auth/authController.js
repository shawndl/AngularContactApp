const signToken = require('./auth').signToken;
const winston = require('../../utils/logging');

/**
 * checks the user_.id from the verify user middleware
 * then creates a token and sends it back to the client
 * @param request
 * @param response
 * @param next
 */
exports.signIn = (request, response, next) => {
  winston.info('In the controller creating a sign in token');

  const token = signToken(request.auth._id);
  response.json({token: token});

};
