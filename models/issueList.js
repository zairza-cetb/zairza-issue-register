var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
  issued_by: String,
  returned_by: {type: String,default: issued_by},
  quantity: Number,
  is_returned: {type: Boolean,default: false},
  issue_date: {type: Date,default: Date.now},
  return_date: Date
});

var User = mongoose.model('Admin', adminSchema);

module.exports = Admin;
