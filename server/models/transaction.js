const mongoose = require('mongoose')

let schema = new mongoose.Schema({
  idmember:[{type:mongoose.Schema.Types.ObjectId, ref: 'usersecommerce'}],
  date: Date,
  produk: [
    {idproduct: [{type:mongoose.Schema.Types.ObjectId, ref: 'productsecommerce'}],
    jumlahitem: ['string']}
  ]
  // idproduct:[{type:mongoose.Schema.Types.ObjectId, ref: 'products'}],
  // idmember:[{type:mongoose.Schema.Types.ObjectId, ref: 'users'}],
  // jumlahitem: Number,
  // date: Date
})

var transactionsecommerce = mongoose.model('transactionsecommerce', schema)

module.exports = transactionsecommerce
