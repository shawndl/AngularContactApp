const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const User = require('./userModel');

module.exports = () => {
  return (request, response, next) => {
    request.check('firstName', 'Please enter a first name').notEmpty();
    request.check('lastName', 'Please enter a first name').notEmpty();
    request.check('email')
      .notEmpty()
      .withMessage('Please enter an email address')
      .isEmail()
      .withMessage('This is not a valid email address');

    request.check('email')
      .isEmailTaken(request.email)
      .withMessage('This email has already been taken');


    request.check('phone')
      .notEmpty()
      .withMessage('Please enter a phone number')
      .matches('^[1-90]+$')
      .withMessage('This is not a valid phone number');

    const errors = request.validationErrors();
    if (errors) {
      return response.status(422).json(errors);
    }
    return next();
  }
}
