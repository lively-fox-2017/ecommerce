const moment = require('moment')
const mongoose = require('mongoose')
// const url = "mongodb://admin:admin@localhost:27017/belitopikuy" // with mongoDB role authenticate
const url = "mongodb://admin:admin@ds231725.mlab.com:31725/belitopikuy"
const helper = require('../helper/helper')
// mongoose.connect(url, helper.mongoAuth)
mongoose.connect(url)
const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  }],
  quantity: {
    type: Array,
    required: true
  },
  checkout_date: Date,
  totalprice: Number
})

const transactionModel = mongoose.model('Transaction', schema)

module.exports = transactionModel
