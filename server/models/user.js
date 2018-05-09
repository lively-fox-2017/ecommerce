const mongoose = require('mongoose')

let schema = new mongoose.Schema({
  username:'string',
  password:'string',
  email:'string',
  role: 'string'
})

var usersecommerce = mongoose.model('usersecommerce', schema)

module.exports = usersecommerce
