const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

// data structure for a contact
const contactSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  emails: [
    {
      email: String,
      emailType: String
    }
  ],
  phones: [
    {
      phone: String,
      phoneType: String
    }
  ],
});

contactSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('contact', contactSchema);
