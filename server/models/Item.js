const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: String,
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  imageURL: String,
  price: {
    type: Number,
    required: [true, 'Price is required']
  }
});

module.exports = mongoose.model('Item', itemSchema);
