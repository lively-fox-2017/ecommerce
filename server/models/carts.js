const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')

let cartSchema = new Schema({
  customers:{
    type: Schema.Types.ObjectId, ref: 'Customer'
  },
  items:[
    {type: Schema.Types.ObjectId, ref: 'Items'}
  ],
  subtotal:{
    type: Number
  }
})

var Carts = mongoose.model('Carts', cartSchema);

class CartModel {

  static validate(req, res, next){
    var token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, 'kode rahasia', function (err, decoded) {
        if(err){
          return res.json({success: false, message: 'Problem With Token'})
        }else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      return res.status(403).send({
        message: 'Access Denied!'
      })
    }
  }

  static getCarts(req, res) {
    Carts.find()
    .populate("customers")
    .populate("items")
    .exec().then((dataCarts) => {
      res.status(200).json({dataCarts})
    }).catch((err) => {
      res.status(400).send(err)
    })
  };

  static addCart(req, res) {
    var carts_data = new Carts(req.body)
    carts_data.save().then((dataCarts) => {
      res.status(200).json({dataCarts})
    }).catch((err) => {
      res.status(400).send(err)
    })
  }


}


module.exports = CartModel;
