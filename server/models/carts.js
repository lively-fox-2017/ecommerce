const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = new Schema({
  customers:{
    type: Schema.Types.ObjectId, ref: 'Customer'
  },
  total:{
    type: Number
  },
  count:{
    type: Number
  },
  itemlist:[{
    type: Schema.Types.ObjectId, ref: 'items'
  }]

})

var Carts = mongoose.model('Carts', cartSchema);

class Cart {
  static getCarts(callback) {
    Carts.find()
    .populate("customers")
    .populate("itemlist")
    .exec(callback);
  };

  static addCart(body, callback) {

    var carts_data = {
      "customers": body.customers,
      "total": body.total,
      "count": body.count,
      "itemlist": body.itemlist
    }
    Carts.create(carts_data, callback);
  };

  static updateCart(params, body, callback) {
    var id = {
      _id : params.id
    }
    var carts_data = {
      "customers": body.customers,
      "total": body.total,
      "count": body.count,
      "itemlist": body.itemlist
    }
    Carts.findByIdAndUpdate(id, carts_data, callback);
  };

  static deleteCart(params, callback){
    var id = {
      _id : params.id
    }
    Carts.deleteOne(id, callback)
  }
}


module.exports = Cart;
