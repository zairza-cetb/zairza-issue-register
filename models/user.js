var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  phone: String,
  password: String,
  taken: Array
},{collection: 'users'});

var User = mongoose.model('User', userSchema);

module.exports = User;
