var idvalidator = require('mongoose-id-validator');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@cluster0-shard-00-00-jlkah.mongodb.net:27017,cluster0-shard-00-01-jlkah.mongodb.net:27017,cluster0-shard-00-02-jlkah.mongodb.net:27017/commaterialize?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
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
      Transaction.find({}).populate('customer').populate('productlist').then((data) => {
        console.log(data);
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
    // verify a token symmetric
    jwt.verify(insert.customer_id, process.env.JWT_KEY, function(err, decoded) {
      insert.customer_id = decoded._id
    });
    return new Promise((resolve, reject) => {
      console.log(insert.totalHarga)
      console.log(insert)
      Transaction.create({
        customer: insert.customer_id,
        productlist: insert.productlist,
        totalHarga: insert.totalHarga,
        transaction_date: Date.now()
      }).then((data) => {
        console.log('data')
        var obj = {
          message: 'Insert Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        console.log('ada error')
        console.log(err);
        reject(err)
      })
    })
  }
}

module.exports = Model;
