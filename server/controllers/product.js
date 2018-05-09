const product = require('../models/product.js')
const mongoose = require('mongoose')
/*
## Catatn Pribadi:
** Dikarenakan yang dapat menginput Produk hanya Admin Web, jadi input dibuat sederhana saja.
*/
const addProduct = (req,res) => {
  product.create({
    linkimage:req.body.linkimage,
    namaproduct:req.body.namaproduct,
    deskripsi:req.body.deskripsi,
    harga:req.body.harga
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
// ============================================================
const getProduct = (req,res) => {
  product.find().then((data)=>{
    res.send(data)
  })
}

const deleteProduct = (req,res) => {
  // console.log(req.params);
  product.remove({
    _id:req.params.id
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}

module.exports = {
  addProduct,
  getProduct,
  deleteProduct
}
