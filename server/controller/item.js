const item = require('../models/item');
const jwt = require('jsonwebtoken');

class Item {
  static list(req,res,next){
    // let idUser = jwt.verify(req.params.token, process.env.APPSECRET);
    item.find({
    })
    .then(rows=>{
      res.status(200).json(rows);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static add(req,res,next){
    // console.log('masukkk');
    // let idUser = jwt.verify(req.body.token, process.env.APPSECRET);
    // console.log('body====',req.body);
    item.create({
      category:req.body.category,
      productId:req.body.productId,
      productName:req.body.productName,
      price:req.body.price,
      quantity:req.body.quantity,
      discount:req.body.discount,
      imageUrl:req.body.imageUrl,
      summary:req.body.summary,
    })
    .then(rows=>{
      res.status(200).json(rows);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static findById(req,res,next){
    console.log('here');
    // let idUser = jwt.verify(req.body.token, process.env.APPSECRET);
    item.findOne({
      _id:req.params.id
    })
    .then(rows=>{
      res.status(200).json({
        "message":"data finded",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static edit(req,res,next){
    // console.log();
    // let idUser = jwt.verify(req.body.token, process.env.APPSECRET);
    item.findOneAndUpdate({
      _id:req.params.id
    },{
      category:req.body.category,
      productId:req.body.productId,
      productName:req.body.productName,
      price:req.body.price,
      quantity:req.body.quantity,
      discount:req.body.discount,
      imageUrl:req.body.imageUrl,
      summary:req.body.summary,
    })
    .then(rows=>{
      res.status(200).json({
        "message":"updating data succesfull",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static delete(req,res,next){
    // console.log('masuk sini');
    item.findOneAndRemove({_id:req.params.id})
    .then(rows=>{
      // console.log('masukk setelah remove');
      res.status(200).json({
        "message":"deleteting data succesfull",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
}

module.exports = Item
