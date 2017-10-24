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
      "id": req.body.id,
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
        "id": req.body.id,
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

  static updateItems(req,res){
    Item.findByIdAndUpdate({_id: req.params.id}, {
      "id": req.body.id,
      "nama_item": req.body.nama_item,
      "category":req.body.category,
      "harga":req.body.harga,
      "jumlah":req.body.jumlah,
      "img": req.body.img
    })
    .then(data=>{
      res.send({
        "message": "Data Berhasil di Update!",
        "id": req.body.id,
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
