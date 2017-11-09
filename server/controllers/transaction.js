const transaction = require('../models/transaction.js')
const mongoose = require('mongoose')
/*
## Catatn Pribadi:
** Dikarenakan yang dapat menginput Produk hanya Admin Web, jadi input dibuat sederhana saja.
*/
const addTransaction = (req,res) => {
  transaction.create({
    idmember:req.body.idmember,
    date:req.body.date,
    produk: [
      {
        idproduct: req.body.idproduct,
        jumlahitem: req.body.jumlahitem
      }
    ]
    // idproduct:req.body.idproduct,
    // idmember:req.body.idmember,
    // jumlahitem:req.body.jumlahitem,
    // date:req.body.date
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
// ============================================================
const getTransaction = (req,res) => {
  transaction.find().populate('idmember','username').populate('produk.idproduct')
  .then((data)=>{
    res.send(data)
  })
}
// ============================================================
const deleteTransaction = (req,res) => {
  console.log(req.params);
  transaction.remove({
    _id:req.params.id
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
module.exports = {
  addTransaction,
  getTransaction,
  deleteTransaction
}
