var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  name: String,
  password: String
});

var admin = mongoose.model('Admin', adminSchema);

module.exports = admin;
