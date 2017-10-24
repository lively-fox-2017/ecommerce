const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String,
  role: String
})

const admin = mongoose.model('admin', adminSchema)

module.exports = admin
