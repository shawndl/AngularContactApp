const winston = require('../utils/logging');
const User = require('../api/users/userModel');
module.exports = () => {
  return (request, response, next) => {
    winston.info('Checking email address!');
    User.findOne({email: request.body.email}, function(errors, doc) {
      if(errors) {
       return response.status(500).json('Internal error')
      }
      if(doc) {
        return response.status(422).json('Error, this email has already been taken');
      }
      next();
    });
  }
}
