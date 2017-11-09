const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ecommerce')

let schema = new mongoose.Schema({
  linkimage:'string',
  namaproduct:'string',
  deskripsi:'string',
  harga: 'number'
})

var products = mongoose.model('products', schema)

module.exports = products
