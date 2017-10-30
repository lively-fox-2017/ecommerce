let mongoose = require('mongoose')
let Schema = mongoose.Schema 
let ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost/dbecommerce');
var usersSchema = new Schema({
	username: String,
	password: String,
	salt: String,
	role: String
})
var Users = mongoose.model('Users', usersSchema);
module.exports = Users