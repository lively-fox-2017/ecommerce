const transaction = require('../models/transaction');
const jwt = require('jsonwebtoken');
const lzero = require('../helper/lzero')
class Transaction {
  static list(req,res,next){
    // let idUser = jwt.verify(req.params.token, process.env.APPSECRET);
    transaction.find({
    })
    // .populate('item')
    .then(rows=>{
      res.status(200).json(rows);
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static add(req,res,next){
    // console.log(req.body);
    let customer=req.body[0];
    let detil=req.body[1];
    transaction.findOne()
    .sort('-transactionId')
    .then(rows=>{
      let urut=1;
      // console.log(rows);
      if (rows!=null) {
        urut=Number(rows.transactionId)+1
      }
      // console.log('jangkir',urut);
      let transId=lzero(urut,'0',5);
      // res.status(200).json(transId);
      transaction.create({
        transactionId:transId,
        cName:customer.cName,
        cAddres:customer.cName,
        cPhone:customer.cPhone,
        cEmail:customer.cEmail,
        detil:detil
      })
      .then(trancation=>{
        res.status(200).json(trancation);
      })
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static findById(req,res,next){
    // let idUser = jwt.verify(req.body.token, process.env.APPSECRET);
    transaction.findOne({
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
    transaction.findOneAndUpdate({
      _id:req.params.id
    },{
      tranctionId:req.body.tranctionId,
      productId:req.body.productId,
      productName:req.body.productName,
      price:req.body.price,
      quantity:req.body.quantity,
      discount:req.body.discount,
      imageUrl:req.body.imageUrl,
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
    transaction.findOneAndRemove({_id:req.params.id})
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

module.exports = Transaction

// let promiseTransaction=cart.map(item=>{
//   return new Promise(function(resolve,reject){
//     console.log('ini item==',item);
//     transactionDetil.create({
//       transactionId:'001',
//       productId:item.productId,
//       productName:item.productName,
//       price:item.price,
//       quantity:item.quantity,
//       discount:item.discount,
//       imageUrl:item.imageUrl,
//
//     })
//     .then(transaction=>{
//       // console.log('masuk');
//       resolve(transaction)
//     })
//     .catch(err=>{
//       reject(err);
//     })
//   })
// })
// Promise.all(promiseTransaction)
// .then(transactionDetil=>{
//   console.log('here');
//   // let transaction={transaction:transaction,transactionDetil:transactionDetil}
//   res.status(200).json(transactionDetil);
// })
// .catch(err=>{
//   res.status(400).json(err)
// })
// // .then(transaction=>{
// //   res.status(200).json(transaction);
// })
