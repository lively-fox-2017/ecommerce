const Product = require('../models/product')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  create: (req, res) => {
    console.log('berhasil masuk router')
    let admin = jwt.verify(req.headers.token, process.env.SECRET, (err) => {
      let product = new Product({
        namaProduct: req.body.namaProduct,
        harga: req.body.harga,
        gambar: req.body.gambar,
        quantity: 0
      })
      console.log(product, 'ber hasil di tambah');
      product.save((err, dataProduct) => {
        if (err) {
          res.send(err)
        }
        else {
          res.send({
            msg: 'data product berhasil di tambah',
            dataProduct: dataProduct
          })
        }
      })
    })
  },
  all: (req, res) => {
    Product.find((err, dataProduct) => {
      if (err) {
        res.send(err)
      }
      else {
        res.send(dataProduct)
      }
    })
  },
  update: (req, res) => {
    Product.findOneAndUpdate({
      _id: ObjectId(req.params.id)
    }, {
      namaProduct: req.body.namaProduct,
      harga: req.body.harga,
      gambar: req.body.gambar,
      quantity: 0
    }, (err, dataProduct) => {
      if (err) {
        res.send(err)
      }
      else {
        res.send(dataProduct)
      }
    })
  },
  remove: (req, res) => {
    console.log(req.params.id, '<-------------');
    Product.remove({ _id:req.params.id}, (err, dataProduct) => {
      if (err) {
        res.send(err)
      }
      else {
        res.send(dataProduct)
      }
    })
  }
}
