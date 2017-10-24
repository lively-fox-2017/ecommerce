const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  namaProduct: String,
  harga: Number,
  gambar: String,
  quantity: Number
})

const product = mongoose.model('product', productSchema)

module.exports = product
