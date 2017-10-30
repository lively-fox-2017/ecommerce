const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect(process.env.MONGO_URL);

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  zipcode: {
    type: String,
    required: [true, 'Zipcode is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
});

// Middlewares
customerSchema.pre('save', function (next) {

  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();

});

module.exports = mongoose.model('Customer', customerSchema);
