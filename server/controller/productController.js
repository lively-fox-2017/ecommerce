const Product = require('../model/products')
const helper = require('../helper/helper')
const image = require('../helper/images')

module.exports = {
  findAll: (req, res) => {
    Product.find().sort('name').then((rowsProduct) => {
      res.json({
        message: "Tampil Semua Data Product",
        data: rowsProduct
      })
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  findOne: (req, res) => {
    Product.findOne({_id: req.params.id}).then((rowProduct) => {
      if (rowProduct) {
        res.json({
          message: "Tampil Satu Data Product",
          data: rowProduct
        })
      } else {
        res.json({
          message: "Maaf Id tersebut tidak ada"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  insert: (req, res) => {
    Product(helper.dataProduct(req.body, req.file)).save().then((rowProductInserted) => {
      res.json({
        message: "Berhasil Memasukan Data",
        data: rowProductInserted
      })
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  update: (req, res) => {
    Product.update({_id: req.params.id}, {$set: helper.dataProduct(req.body)}).then((rowUpdateProduct) => {
      if (rowUpdateProduct.n != 0) {
        res.json({
          message: "Berhasil Update",
          data: rowUpdateProduct
        })
      } else {
        res.json({
          message: "Data tidak ditemukan"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  delete: (req, res) => {
    // console.log(req.body.imgName);
    Product.remove({_id: req.params.id}).then((rowDeleteProduct) => {
      if (rowDeleteProduct.result.n != 0) {
        image.deleteFile(req.body.imgName)
        res.json({
          message: "Berhasil Hapus",
          data: rowDeleteProduct
        })
      } else {
        res.json({
          message: "Maaf Id tersebut tidak ada"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  }
}
