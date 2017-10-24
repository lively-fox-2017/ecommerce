const model = require('../models/index');

class CustomerCtrl {
  static readAll(req, res, next){
    model.Customer.readAll().then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  static readOne(req, res, next){
    model.Customer.readOne(req.params.id).then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  static create(req, res, next){
    model.Customer.create(req.body).then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  static register(req, res, next){
    model.Customer.register(req.body).then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
  static login(req, res, next){
    model.Customer.login(req.body.email, req.body.password).then((data)=>{
      res.status(200).send(data);
    }).catch((err)=>{
      res.status(500).send(err);
    })
  }
}

module.exports = CustomerCtrl;
