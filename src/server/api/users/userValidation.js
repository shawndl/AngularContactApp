const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const winston = require('../../utils/logging');
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

    request.check('phone')
      .notEmpty()
      .withMessage('Please enter a phone number')
      .matches('^[1-90]+$')
      .withMessage('This is not a valid phone number');

    request.check('password').notEmpty()
      .withMessage('Please enter a password')
      .isLength({min: 6})
      .withMessage('Your password must be at least 6 characters long')
      .matches('^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z1-90!@#$%^&*]+$')
      .withMessage('Your password must contain a number, a lowercase letter, and an uppercase letter');

    request.check('passwordConfirm').notEmpty()
      .withMessage('Please confirm the password')
      .equals(request.body.password)
      .withMessage('Your password and confirm password do not match');

    winston.info('validating user');
    winston.info(request.validationErrors());

    const errors = request.validationErrors();
    if (errors) {
      return response.status(422).json(errors);
    }
    return next();
  }
}
