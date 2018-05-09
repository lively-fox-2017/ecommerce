const mongoose = require('mongoose')

let schema = new mongoose.Schema({
  linkimage:'string',
  namaproduct:'string',
  deskripsi:'string',
  harga: 'number'
})

var productsecommerce = mongoose.model('productsecommerce', schema)

module.exports = productsecommerce
