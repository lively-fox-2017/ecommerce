var idvalidator = require('mongoose-id-validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/commaterialize');
// mongoose.Promise = global.Promise;
var transactionSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  productlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
  totalHarga: {
    type: String,
    required: true
  },
  transaction_date: {
    type: Date,
    required: true
  }
});

transactionSchema.plugin(idvalidator)

var Transaction = mongoose.model('Transaction', transactionSchema);

class Model {
  static readAll() {
    return new Promise((resolve, reject) => {
      Transaction.find({}).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject) => {
      Transaction.findOne({
        "_id": id
      }).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static create(insert) {
    return new Promise((resolve, reject) => {
      Transaction.create({
        customer:insert.customer_id,
        productlist:insert.productlist,
        totalHarga:insert.totalHarga,
        transaction_date:Date.now()
      }).then((data) => {
        var obj = {
          message: 'Insert Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = Model;
