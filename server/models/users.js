var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/yoyoi');
mongoose.connect('mongodb://user:puser@ds229435.mlab.com:29435/ecomlive');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  memberid:String,
  address:String,
  zipcode: String,
  admin:Boolean,
  phone:String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
