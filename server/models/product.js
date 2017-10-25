var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect('mongodb://admin:admin@ds231205.mlab.com:31205/commaterialize');
// mongoose.Promise = global.Promise;
var productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

var Product = mongoose.model('Product', productSchema);

class Model {
  static readAll() {
    return new Promise((resolve, reject) => {
      Product.find({}).then((data) => {
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    return new Promise((resolve, reject) => {
      Product.findOne({
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
      Product.create({
        name: insert.name,
        price: insert.price,
        description: insert.description,
        imageUrl: insert.imageUrl,
        category:insert.category
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
  static update(update){
    return new Promise((resolve, reject) => {
      Product.findOneAndUpdate({"_id":update._id},{
        name: update.name,
        price: update.price,
        description: update.description,
        imageUrl: update.imageUrl,
        category: update.category
      }).then((data) => {
        var obj = {
          message: 'Update Success',
          data: data
        }
        resolve(obj)
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static delete(id){
    return new Promise((resolve, reject) => {
      Product.findOneAndRemove({
        "_id":id
      }).then((data) => {
        var obj = {
          message: 'Delete Success',
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
