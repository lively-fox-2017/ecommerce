const Cart = require('../models/carts')

class Cartx {

  static findCarts(req,res){
    Cart.find({})
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static createCarts(req,res){
    let newCarts = Cart({
      "nama_item": req.body.nama_item,
      "harga":req.body.harga,
      "jumlah":req.body.jumlah,
      "img": req.body.img
    })
    newCarts.save()
    .then(data=>{
      console.log('sebelum dikirim ', data)
      res.send({
        "Message": "Data Berhasil di Tambah",
        "nama_item": req.body.nama_item,
        "harga":req.body.harga,
        "jumlah":req.body.jumlah,
        "img": req.body.img
       });
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static deleteCarts(req,res){
    Cart.findOneAndRemove({_id: req.params.id})
    .then(data=>{
      res.send({
        "message": "Data Berhasil di Delete!",
        data: req.params.id
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static findCartsById(req,res){
    Cart.findOne({_id: req.params.id})
    .then(data=>{
      res.send({
        "Message": "Data Carts Ketemu !",
        data: data
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static updateCarts(req,res){
    Cart.findByIdAndUpdate({_id: req.params.id}, {
      "nama_item": req.body.nama_item,
      "harga":req.body.harga,
      "jumlah":req.body.jumlah,
      "img": req.body.img
    })
    .then(data=>{
      res.send({
        "message": "Data Berhasil di Update!",
        "nama_item": req.body.nama_item,
        "harga":req.body.harga,
        "img": req.body.img
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

}



module.exports = Cartx
