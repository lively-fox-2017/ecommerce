const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ecommerce')

let schema = new mongoose.Schema({
  idproduct:[{type:mongoose.Schema.Types.ObjectId, ref: 'products'}],
  idmember:[{type:mongoose.Schema.Types.ObjectId, ref: 'users'}],
})

var carts = mongoose.model('carts', schema)

module.exports = carts
