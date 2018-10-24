const winston = require('../utils/logging');
module.exports = () => {
  return (request, response, next) => {
    if(request.auth === undefined || request.auth.isAdmin === false) {
      winston.info('The user is not logged in or is not an admin');
      response.status(401).json('Unauthorised!');
    }
    next();
  }
}
