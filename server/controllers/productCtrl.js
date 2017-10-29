const Product = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;

class ProductCtrl {
  static getProducts(req, res, next) {
    Product.find()
      .then((values) => {
        res.status(200).json(values);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

  static getProductbyCategory(req, res, next) {
    Product.find({
        category: req.params.category
      })
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

  static addProduct(req, res, next) {
    let newProduct = new Product(req.body);
    newProduct.save()
      .then((inserted) => {
        res.status(201).json(inserted);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

  static updateProduct(req, res, next) {
    Product.findOneAndUpdate({
        _id: new ObjectId(req.params.productId)
      }, req.body)
      .then((updated) => {
        res.status(200).json(updated);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

  static deleteProduct(req, res, next) {
    Product.deleteOne({
        _id: new ObjectId(req.params.productId)
      }).exec()
      .then((value) => {
        res.status(200).json(value);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }
}

module.exports = ProductCtrl;
