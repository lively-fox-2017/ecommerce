const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
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

module.exports = mongoose.model('Customer', customerSchema);
