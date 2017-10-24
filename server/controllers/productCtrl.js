const Product = require('../models/product');
class ProductCtrl {
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
}

module.exports = ProductCtrl;
