const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');
const winston = require('../../utils/logging');

/**
 * data structure for a user
 */
let userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    require: false,
    default: false
  }
});

/**
 * before a new user is created the password must be hashed
 */
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = this.encryptPassword(this.password);
  next();
});

/**
 * user methods
 */
userSchema.methods = {
  /**
   * does the password match
   * @param plainTextPassword
   * @return boolean
   */
  authenticate: function(plainTextPassword) {
    winston.info('Checking the password');
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  /**
   * hash the passwords if there is a password
   * @return {string}
   */
  encryptPassword: (plainTextPassword) => {
    winston.info('encrypting password: ');
    if (!plainTextPassword) {
      return ''
    }
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPassword, salt);
  },

  toJson: () => {
    var obj = this.toObject()
    delete obj.password;
    return obj;
  }
};

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('user', userSchema);
