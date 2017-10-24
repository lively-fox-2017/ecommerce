const mongoose = require('mongoose')

const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

var customerSchema =  new Schema({
              name: String,
              memberid: String,
              address: String,
              zipcode: String,
              phone: String
             })

var Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer
