const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const URL = `mongodb://admin:${process.env.PASSDB}@ecommerce-lively-fox-shard-00-00-8xdqv.mongodb.net:27017,ecommerce-lively-fox-shard-00-01-8xdqv.mongodb.net:27017,ecommerce-lively-fox-shard-00-02-8xdqv.mongodb.net:27017/learning-ecommerce?ssl=true&replicaSet=ecommerce-lively-fox-shard-0&authSource=admin`
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
