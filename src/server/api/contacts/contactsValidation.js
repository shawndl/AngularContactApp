const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


module.exports = () => {
  return (request, response, next) => {
    request.check('firstName', 'Please enter your first name').notEmpty();
    request.check('lastName', 'Please enter your first name').notEmpty();

    request.checkBody({
      'emails.*.email': {
        notEmpty: {
          errorMessage: 'Please enter an email address'
        },
        isEmail: {
          errorMessage: 'This email address is not valid'
        }
      },
      'emails.*.emailType': {
        notEmpty: {
          errorMessage: 'Please select the type of email'
        }
      }
    });

    request.check({
      'phones.*.phone': {
        notEmpty: {
          errorMessage: 'Please enter a phone number'
        },
        matches: {
          options: ['^[1-90]+$'],
          errorMessage: 'This phone number is not valid'
        }
      },
      'phones.*.phoneType': {
        notEmpty: {
          errorMessage: 'Please select the type of phone number'
        }
      }
    });

    request.check({
      'phones.*.phoneType': {
        notEmpty: {
          errorMessage: 'Please select the type of phone number'
        }
      }
    });

    const errors = request.validationErrors();
    if (errors) {
      return response.status(422).json(errors);
    }
    return next();
  }
}
