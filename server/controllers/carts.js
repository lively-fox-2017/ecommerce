const models = require('../models/carts');

class Carts {
  static findAll(req, res){
    models.getCarts((err, carts)=>{
      if(err){
        res.send(err)
      }
      res.json(carts)
    })
  }

  static create(req, res){
    models.addCart(req.body, (err, carts)=>{
      if (err) {
        res.send(err)
      }
      res.send('Sukses add carts')
    })
  }

  static update(req, res){
    models.updateCart(req.params, req.body, (err, carts)=>{
      if (err) {
        res.send(err)
      }
      res.send('Sukses update carts')
    })
  }

  static delete(req, res){
    models.deleteCart(req.params, (err, carts)=>{
      if (err) {
        res.send(err)
      }
      res.send('Success Delete From Carts')
    })
  }


}
module.exports = Carts;
