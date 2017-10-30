const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const addCartSchema = new Schema({
  namaProduct: String,
  harga: Number,
  gambar: String,
  quantity: Number
})

const addCart = mongoose.model('tambahCart', addCartSchema)

module.exports = addCart
