const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ecommerce')

let schema = new mongoose.Schema({
  username:'string',
  password:'string',
  email:'string',
  role: 'string'
})

var users = mongoose.model('users', schema)

module.exports = users
