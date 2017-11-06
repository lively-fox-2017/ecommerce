const model = require('../models/index');

class TransactionCtrl {
  static readAll(req, res, next){
    model.Transaction.readAll().then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  static readOne(req, res, next){
    model.Transaction.readOne(req.params.id).then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  static create(req, res, next){
    model.Transaction.create(req.body).then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  // static update(req, res, next){
  //   model.Product.update(req.body).then((data)=>{
  //     res.status(200).send(data);
  //   }).catch((err)=>{
  //     res.status(500).send(err);
  //   })
  // }
  // static delete(req, res, next){
  //   model.Product.delete(req.params.id).then((data)=>{
  //     res.status(200).send(data);
  //   }).catch((err)=>{
  //     res.status(500).send(err);
  //   })
  // }
}

module.exports = TransactionCtrl;
