const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const URL = 'mongodb://localhost:27017/learning-ecommerce'
mongoose.Promise = global.Promise;
mongoose.connect(URL);

let transactionSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orders: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    qty: {
      type: Number
    }
  }],
  transactionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
