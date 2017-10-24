const mongoose = require('mongoose')
const url = "mongodb://admin:admin@localhost:27017/belitopikuy" // with mongoDB role authenticate
const helper = require('../helper/helper')
mongoose.connect(url, helper.mongoAuth)
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
})

const productModel = mongoose.model('Product', schema)

module.exports = productModel
