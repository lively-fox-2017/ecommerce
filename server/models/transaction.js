const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ecommerce')

let schema = new mongoose.Schema({
  idmember:[{type:mongoose.Schema.Types.ObjectId, ref: 'users'}],
  date: Date,
  produk: [
    {idproduct: [{type:mongoose.Schema.Types.ObjectId, ref: 'products'}],
    jumlahitem: ['string']}
  ]
  // idproduct:[{type:mongoose.Schema.Types.ObjectId, ref: 'products'}],
  // idmember:[{type:mongoose.Schema.Types.ObjectId, ref: 'users'}],
  // jumlahitem: Number,
  // date: Date
})

var transactions = mongoose.model('transactions', schema)

module.exports = transactions
