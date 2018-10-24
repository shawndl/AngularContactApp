let bodyParser = require('body-parser');
let morgan = require('morgan');
const cors = require('cors');
const validator = require('express-validator');
const User = require('./../api/users/userModel');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(validator({
    customValidators: {
      isEmailTaken(email) {
        return new Promise((resolve, reject) => {
          User.findOne({email: email}, (error, user) => {
            if (error) return;
            if(user === null) {
              resolve();
            } else {
              reject();
            }
          });
        });
      }
    }
  }));
}
