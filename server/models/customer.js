const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  nama: String,
  alamat: String,
  jenisKelamin: String,
  codePos: String
})

const customer = mongoose.model('customer', customerSchema)

module.exports = customer
