var mongoose = require('mongoose');
var Schema = mongoose.schema;

var userSchema = new Schema({
  name: String,
  phone: String,
  password: String,
  taken: {
    item: String,
    quantity: Number
    date: Date,
    is_verified: Boolean,
    is_returned: Boolean,
    is_return_verified: Boolean
  };
  {collection: 'users'}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
