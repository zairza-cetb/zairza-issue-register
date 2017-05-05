var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  name: String,
  password: String
});

var User = mongoose.model('Admin', adminSchema);

module.exports = Admin;
