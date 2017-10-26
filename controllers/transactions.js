const mongoose = require('mongoose');
const Models = require('../models/all-models');
const jwt = require('jsonwebtoken');

let result = {message:'Gagal', data:{}}

class Controller{
  static new(req, res, next){
    let usrId = ''
    try {
      let token = jwt.verify(req.body.JWTtoken, process.env.JWTtoken);
      usrId=token.id
      //res.send(token)
    } catch (e) {
      result.data=e
      res.send(result)
    }

    let items = req.body.items.length ? req.body.items : [req.body.items];
    let total = req.body.total;

    Models.Transaction.create({
      user:usrId,
      items,
      total
    })
    .then(response=>{
      result.message='Berhasil'
      res.send(result)
    }).catch(err=>{
      res.data=err;
      res.send(result)
    })
  }

  static getAll(req, res, next){
    Models.Transaction.find()
    .then(response=>{
      res.send(response)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static getCostumerTransaction(req, res, next){
    let result = {message:'gagal', data:{}}
    let usrId = '';
    try {
      let token = jwt.verify(req.body.JWTtoken, process.env.JWTtoken);
      console.log(token);
      usrId=token.id
      //res.send(token)
    } catch (e) {
      console.log(e);
      result.data=e
      res.send(result)
    }

    Models.Transaction.find({user:mongoose.mongo.ObjectId(usrId)})
    .then(response=>{
      result.message="Berhasil"
      result.data = response
      res.send(result)
    })
    .catch(err=>{
      result.data = err
      res.send(result)
    })
  }
}

module.exports = Controller;
