const { check } = require('express-validator/check');
const { winston } = require('../../utils/logging');

module.exports = () => {
  return (request, response, next) => {
    request.check('email')
      .notEmpty()
      .withMessage('Please enter an email address')
      .isEmail()
      .withMessage('This is not a valid email');

    request.check('password').notEmpty()
      .withMessage('Please enter a password');

    const errors = request.validationErrors();
    if (errors) {
      return response.status(422).json(errors);
    }
    return next();
  }
}
