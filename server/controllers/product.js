const model = require('../models/index');

class CustomerCtrl {
  static readAll(req, res, next){
    model.Product.readAll().then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  static readOne(req, res, next){
    model.Product.readOne(req.params.id).then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  static create(req, res, next){
    model.Product.create(req.body).then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
}

module.exports = CustomerCtrl;
