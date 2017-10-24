var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yoyoi');
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
