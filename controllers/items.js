const Item = require('../models/items')
class Itemx {

  static findItems(req,res){
    Item.find({})
    .then(data=>{
      res.send(data)
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static createItems(req,res){
    let newItems = Item({
      "nama_item": req.body.nama_item,
      "category":req.body.category,
      "harga":req.body.harga,
      "jumlah":req.body.jumlah,
      "img": req.body.img,
    })
    newItems.save()
    .then(data=>{
      console.log('sebelum dikirim ', data)
      res.send({
        "Message": "Data Berhasil di Tambah",
        "nama_item": req.body.nama_item,
        "category":req.body.category,
        "harga":req.body.harga,
        "jumlah":req.body.jumlah,
        "img": req.body.img,
       });
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static deleteItems(req,res){
    Item.findOneAndRemove({_id: req.params.id})
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

  static findItemsById(req,res){
    Item.findOne({_id: req.params.id})
    .then(data=>{
      res.send({
        "Message": "Data Items Ketemu !",
        data: data
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static updateItems(req,res){
    Item.findByIdAndUpdate({_id: req.params.id}, {
      "nama_item": req.body.nama_item,
      "category":req.body.category,
      "harga":req.body.harga,
      "jumlah":req.body.jumlah,
      "img": req.body.img
    })
    .then(data=>{
      res.send({
        "message": "Data Berhasil di Update!",
        "nama_item": req.body.nama_item,
        "category":req.body.category,
        "harga":req.body.harga,
        "jumlah":req.body.jumlah,
        "img": req.body.img
      })
    })
    .catch(err=>{
      res.send(err)
    })
  }

}



module.exports = Itemx
