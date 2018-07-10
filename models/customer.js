var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name: String,
    password: String,
    email: String
})

module.exports = mongoose.model('Customer', CustomerSchema)