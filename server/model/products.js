const mongoose = require('mongoose')
// const url = "mongodb://admin:admin@localhost:27017/belitopikuy" // with mongoDB role authenticate
const url = "mongodb://admin:admin@ds231725.mlab.com:31725/belitopikuy"
const helper = require('../helper/helper')
// mongoose.connect(url, helper.mongoAuth)
mongoose.connect(url)
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: String,
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  info: String
})

const productModel = mongoose.model('Product', schema)

module.exports = productModel
