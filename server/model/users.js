const mongoose = require('mongoose')
const url = "mongodb://admin:admin@localhost:27017/belitopikuy" // with mongoDB role authenticate
const helper = require('../helper/helper')
mongoose.connect(url, helper.mongoAuth)
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: Number
})

const userModel = mongoose.model('User', schema)

module.exports = userModel
