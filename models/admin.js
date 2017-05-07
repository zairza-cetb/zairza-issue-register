var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  admin: String,
  password: String
},{collection : 'admin'});

var admin = mongoose.model('Admin', adminSchema);

module.exports = admin;
