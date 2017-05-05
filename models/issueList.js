var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
  item: String,
  issued_by: String,
  phone: String,
  returned_by: String,
  quantity: Number,
  is_returned: {type: Boolean,default: false},
  issue_date: {type: Date,default: Date.now},
  return_date: Date,
  issue_verified_by: String,
  return_verified_by: String
},{ collection:'issuelist'});

var issueRegister = mongoose.model('issueRegister', issueSchema);

module.exports = issueRegister;
