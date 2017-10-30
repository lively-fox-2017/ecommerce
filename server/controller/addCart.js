const AddCart = require('../models/addCart')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  all: (req, res) => {
    AddCart.find((err, dataCart) => {
      if (err) {
        res.send(err)
      } else {
        res.send(dataCart)
      }
    })
  },
  create: (req, res) => {
    let addCart = new AddCart({
      namaProduct: req.body.namaProduct,
      harga: req.body.harga,
      gambar: req.body.gambar,
      quantity: 1
    })
    addCart.save((err, dataCart) => {
      if (err) {
        res.send(err)
      } else {
        res.send(dataCart)
      }
    })
  },
  remove: (req, res) => {
    AddCart.remove({ _id: req.params.id}, (err, dataCart) => {
      if (err) {
        res.send(err)
      } else {
        res.send(dataCart)
      }
    })
  }
}
