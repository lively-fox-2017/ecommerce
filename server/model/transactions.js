const moment = require('moment')
const mongoose = require('mongoose')
const url = "mongodb://admin:admin@localhost:27017/belitopikuy" // with mongoDB role authenticate
const helper = require('../helper/helper')
mongoose.connect(url, helper.mongoAuth)
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
  checkout_date: Date,
  totalprice: Number
})

const transactionModel = mongoose.model('Transaction', schema)

module.exports = transactionModel
