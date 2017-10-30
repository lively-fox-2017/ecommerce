const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer ID is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  itemList: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  total: {
    type: Number,
    required: [true, 'Total Price is required']
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
