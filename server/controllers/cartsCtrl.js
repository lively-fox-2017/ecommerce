const models = require('../models/carts');

class CartsCtrl {

  static validate(req, res, next){
    models.validate(req, res, next)
  }

  static getCarts(req, res){
    models.getCarts(req, res)
  }

  static addCart(req, res){
    models.addCart(req, res)
  }

}
module.exports = CartsCtrl;
